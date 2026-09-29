(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,163338,e=>{"use strict";var a=e.i(843476),r=e.i(522016),t=e.i(271645),s=e.i(846932),o=e.i(862824),i=e.i(342046),n=e.i(732576),c=e.i(716675),l=e.i(59938),d=e.i(158960),m=e.i(372810),p=e.i(921371),u=e.i(580296),h=e.i(901752),f=e.i(487486),g=e.i(332017),k=e.i(852008),b=e.i(39312),x=e.i(658041),y=e.i(966992),v=e.i(828579),K=e.i(283086),j=e.i(227516),w=e.i(691385),S=e.i(178583),T=e.i(25652),C=e.i(618393),N=e.i(727927),_=e.i(63639);let P=`# ============================================================
# Apache Kafka — Python producer with idempotent + transactions
# Idempotent producer: deduplicates retries on the broker side
# Transactional producer: exactly-once across multiple topics
# ============================================================

from kafka import KafkaProducer
from kafka.admin import KafkaAdminClient, NewTopic
import json, time

# Idempotent producer (single-producer exactly-once)
producer = KafkaProducer(
    bootstrap_servers=['kafka:9092'],
    key_serializer=lambda k: k.encode('utf-8'),
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    acks='all',                       # wait for all ISR replicas ( durability)
    enable_idempotence=True,          # producer-side exactly-once (dedup retries)
    retries=2147483647,               # infinite retries (idempotent makes safe)
    max_in_flight_requests_per_connection=5,
    compression_type='zstd',          # best compression + speed
    linger_ms=5,                     # batch for 5ms (throughput vs latency)
    batch_size=65536,                 # 64KB batches
    delivery_timeout_ms=120000,       # 2 min total delivery timeout
)

# Create topic with 24 partitions + RF=3 (one partition per chromosome)
admin = KafkaAdminClient(bootstrap_servers='kafka:9092')
admin.create_topics([
    NewTopic(name='gatk.variants',
             num_partitions=24,         # one per chromosome (chr1-22, X, Y)
             replication_factor=3,      # 3 ISR replicas for durability
             topic_configs={
                 'min.insync.replicas': '2',   # require 2 of 3 ISR for write
                 'compression.type': 'producer',  # producer-chosen
                 'retention.ms': '604800000',     # 7 days
                 'max.message.bytes': '1048576',  # 1MB
                 'segment.bytes': '536870912',    # 512MB segments
             })
])

# Produce 1M variant records (keyed by chromosome for partitioning)
chromosomes = [f'chr{i}' for i in range(1, 23)] + ['chrX', 'chrY']
for i in range(1_000_000):
    chrom = random.choice(chromosomes)
    pos = random.randint(1, 250_000_000)
    record = {
        'chrom': chrom, 'pos': pos,
        'ref': random.choice('ACGT'),
        'alt': random.choice('ACGT'),
        'qual': random.gauss(60, 20),
        'sample_id': f'sample-{i % 100}',
    }
    # Key = chrom → ensures all chr17 events land in partition 16
    producer.send('gatk.variants', key=chrom, value=record)

producer.flush()  # wait for all in-flight messages
producer.close()`,I=`// ============================================================
// Apache Kafka — Scala consumer with exactly-once via transactions
// Consumer reads from topic, processes, writes to Iceberg Bronze
// Exactly-once via Kafka transactions (read-process-write pattern)
// ============================================================

import org.apache.kafka.clients.consumer.{KafkaConsumer, ConsumerConfig}
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.kafka.clients.producer.{KafkaProducer, ProducerConfig}
import org.apache.kafka.common.IsolationLevel
import java.util.{Properties, UUID}
import scala.jdk.CollectionConverters._

// Consumer config — exactly-once (read_committed isolation)
val consumerProps = new Properties()
consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092")
consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, "bronze-iceberg-writer")
consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, classOf[StringDeserializer].getName)
consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, classOf[StringDeserializer].getName)
consumerProps.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "false")  // manual commit (EOS)
consumerProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest")
consumerProps.put(ConsumerConfig.ISOLATION_LEVEL_CONFIG, "read_committed")  // skip aborted txns
consumerProps.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, "5000")  // 5k records per poll
consumerProps.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, "300000")  // 5 min process time

val consumer = new KafkaConsumer[String, String](consumerProps)
consumer.subscribe(List("gatk.variants").asJava)

// Producer for transactional sink (exactly-once across Kafka → Iceberg)
val producerProps = new Properties()
producerProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092")
producerProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, classOf[StringSerializer].getName)
producerProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, classOf[StringSerializer].getName)
producerProps.put(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "bronze-writer-txn")  // EOS ID
producerProps.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true")

val producer = new KafkaProducer[String, String](producerProps)
producer.initTransactions()  // required for transactional producer

// Read-process-write loop (exactly-once via transactions)
while (true) {
  val records = consumer.poll(java.time.Duration.ofMillis(1000))
  if (!records.isEmpty) {
    producer.beginTransaction()
    try {
      // Process: write to Iceberg Bronze + emit to downstream Kafka topic
      for (record <- records.asScala) {
        // Write to Iceberg Bronze (partitioned by chrom)
        icebergBronze.append(record.value())
        // Emit to downstream topic for analytics consumers
        producer.send(new ProducerRecord("analytics.variants",
          record.key(), record.value()))
      }
      // Commit Kafka transaction (atomic: consumer offset + producer sends)
      producer.sendOffsetsToTransaction(
        consumerOffsets(consumer), "bronze-iceberg-writer")
      producer.commitTransaction()
    } catch {
      case e: Exception =>
        producer.abortTransaction()
        // re-throw or skip
    }
  }
}`,R=`# ============================================================
# Apache Kafka KRaft — Kafka without ZooKeeper (2024+)
# KRaft (Kafka Raft) replaces ZooKeeper with a Kafka-native
# metadata quorum. Single binary, simpler ops, faster failover.
# ============================================================

# server.properties (KRaft mode — single config file)
# Run as: kafka-storage.sh format --config server.properties
#         kafka-server-start.sh server.properties

# KRaft mode: broker + controller in same process (combined mode)
process.roles=broker,controller
node.id=1
controller.quorum.voters=1@kafka1:9093,2@kafka2:9093,3@kafka3:9093

# Listeners: PLAINTEXT for clients, CONTROLLER for KRaft quorum
listeners=PLAINTEXT://kafka1:9092,CONTROLLER/kafka1:9093
advertised.listeners=PLAINTEXT/kafka1:9092
listener.security.protocol.map=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT
controller.listener.names=CONTROLLER
inter.broker.listener.name=PLAINTEXT

# Storage + replication
log.dirs=/var/lib/kafka/data
num.partitions=24                # default partitions per new topic
default.replication.factor=3     # 3 replicas for durability
min.insync.replicas=2            # require 2 of 3 for writes
unclean.leader.election.enable=false  # prevent data loss

# Performance
num.network.threads=8
num.io.threads=16
socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
socket.request.max.bytes=104857600
queued.max.requests=1000

# Log retention
log.retention.hours=168          # 7 days
log.segment.bytes=536870912      # 512MB segments
log.retention.check.interval.ms=300000
log.cleanup.policy=delete       # or 'compact' for change log topics

# Compression
compression.type=producer        # producer chooses (zstd recommended)
broker.id=1                     # legacy field, still required

# ============================================================
# KRaft vs ZooKeeper comparison:
#   ZooKeeper (2012-2024): separate 3-5 node ZK quorum, slower metadata ops
#   KRaft (2024+): Kafka-native Raft quorum, single binary, ~10x faster
#   - Failover: <5s (KRaft) vs 30s+ (ZooKeeper)
#   - Partitions: 2M+ (KRaft) vs 200k limit (ZooKeeper)
#   - Metadata ops: 100k/sec (KRaft) vs 10k/sec (ZooKeeper)
# ============================================================`,A=`-- ============================================================
-- Kafka partitions — the parallelism unit
--   1. Producer writes by key → all events with same key land in same partition
--   2. Within a partition, events are TOTALLY ORDERED (FIFO)
--   3. Consumer group: each partition assigned to one consumer (no duplicates)
--   4. Partitions enable parallel producers + parallel consumers
-- ============================================================

-- Topic: gatk.variants (24 partitions, keyed by chromosome)
-- Partition assignment: hash(key) % num_partitions
--   "chr1"  → partition 0
--   "chr17" → partition 16
--   "chrX"  → partition 22
--   "chrY"  → partition 23

-- All events for chr17 land in partition 16 (total order per chromosome)
-- This enables:
--   - Per-chromosome parallelism (24 consumers = 24-way parallel)
--   - Per-chromosome state (no cross-chrom contention)
--   - Per-chromosome ordering (GATK variant caller requires this)

-- Partition sizing rules of thumb:
--   1 partition per consumer in group → max parallelism
--   1 partition per ~10MB/sec throughput (depends on message size)
--   LinkedIn: 60k+ partitions across 1k+ brokers (7T msgs/day)
--   Uber: 30k+ partitions (100B events/day)
--   Recommendation: start with 12-24 partitions, scale by throughput

-- Consumer group: bronze-iceberg-writer (24 consumers, 1 partition each)
--                   ┌─────────────────────────────┐
--   chr1 events ───► │ partition 0  → consumer 0  │
--   chr2 events ───► │ partition 1  → consumer 1  │
--   ...              │ ...                       │
--   chrY events ───► │ partition 23 → consumer 23│
--                   └─────────────────────────────┘
-- All 24 consumers process in parallel — no contention, no duplicates

-- Rebalance: if consumer 5 dies, partition 5 reassigned to consumer 6
--   - Cooperative-sticky: minimal movement (KIP-429)
--   - Range (default): contiguous partition ranges
--   - RoundRobin: even distribution (older)

-- Partition count trade-offs:
--   More partitions = more parallelism BUT more memory + rebalance time
--   Rule: 1000 partitions per broker is the practical limit
--   Beyond that: KRaft helps (was 200k limit on ZooKeeper)`,E=`-- ============================================================
-- Kafka transactions — exactly-once semantics across topics
--   1. Producer begins transaction (txn ID)
--   2. Producer sends to multiple topics (staged, not visible)
--   3. Producer commits → all staged messages atomically visible
--   4. Consumer with isolation.level=read_committed skips aborted txns
-- ============================================================

# Producer transaction lifecycle (Python)
producer = KafkaProducer(
    bootstrap_servers=['kafka:9092'],
    transactional_id='bronze-writer-txn-1',  # stable across restarts (EOS)
    enable_idempotence=True,
    transaction_timeout_ms=900000,  # 15 min
)
producer.init_transactions()

# Begin transaction
producer.begin_transaction()
try:
    # Write to multiple topics (atomic across topics)
    for record in records:
        producer.send('bronze.events', record)        # main sink
        producer.send('audit.log', record)           # audit trail
        producer.send('analytics.realtime', record)  # analytics consumer
    # Commit consumer offsets as part of transaction (atomic)
    producer.send_offsets_to_transaction(consumer_offsets, group_id)
    producer.commit_transaction()  # all 3 topics + offsets atomically visible
except Exception as e:
    producer.abort_transaction()  # rollback all 3 topics + offsets
    raise

# Consumer with exactly-once (read_committed isolation)
consumer = KafkaConsumer(
    'bronze.events',
    bootstrap_servers=['kafka:9092'],
    group_id='analytics-consumer',
    enable_auto_commit=False,
    isolation_level='read_committed',  # skip aborted transaction messages
)

# ============================================================
# Transaction guarantees:
#   1. Atomicity: all-or-nothing across topics (no partial visibility)
#   2. Durability: committed txns survive broker restarts (replicated)
#   3. Ordering: per-partition total order preserved (commit order)
#   4. Idempotency: producer retries are deduplicated (PID + sequence #s)
#
# Production usage:
#   - LinkedIn: 100M+ transactions/day (exactly-once EOS pipelines)
#   - Uber: 50M+ transactions/day (Uber Eats order processing)
#   - Banks: card payment processing (regulatory exactly-once)
# ============================================================`,L=`# ============================================================
# Kafka partition + consumer group simulation — Pyodide
# Simulates: producer (keyed by chromosome) → 24 partitions →
#            24 consumers (Bronze Iceberg writers)
# ============================================================

import random
import hashlib
from collections import defaultdict, deque

print("=== Kafka Partition + Consumer Group Simulation ===")
print("Producer (keyed by chrom) → 24 partitions → 24 Bronze Iceberg writers")
print()

# Simulate variant events keyed by chromosome
random.seed(42)
chromosomes = [f'chr{i}' for i in range(1, 23)] + ['chrX', 'chrY']  # 24 partitions
samples = [f'sample-{i:04d}' for i in range(100)]
alleles = ['A', 'C', 'G', 'T']
n_partitions = 24

# Kafka partitioner: murmur2 hash of key % num_partitions
def kafka_partition(key, num_partitions):
    # Simulate Murmur2 hash (real Kafka uses Murmur2)
    h = int(hashlib.md5(key.encode()).hexdigest(), 16)
    return h % num_partitions

# Producer: write 50k variant events (scaled from 1M)
producer_events = deque()
for _ in range(50000):
    chrom = random.choice(chromosomes)
    event = {
        'chrom': chrom,
        'pos': random.randint(1, 250_000_000),
        'ref': random.choice(alleles),
        'alt': random.choice(alleles),
        'qual': max(0, random.gauss(60, 20)),
        'filter': random.choices(['PASS', 'LowQual'], weights=[85, 15])[0],
        'sample_id': random.choice(samples),
    }
    # Kafka partitioner routes to partition
    partition = kafka_partition(chrom, n_partitions)
    producer_events.append((partition, event))

# Verify: all events with same chrom land in same partition
chrom_to_partition = {}
for partition, event in producer_events:
    chrom = event['chrom']
    if chrom in chrom_to_partition:
        assert chrom_to_partition[chrom] == partition, f"{chrom} in multiple partitions!"
    else:
        chrom_to_partition[chrom] = partition

# Consumer group: 24 consumers, each assigned to one partition
class IcebergBronzeSink:
    def __init__(self):
        self.committed_batches = defaultdict(list)
        self.buffer = defaultdict(list)
        self.checkpoint_id = 0
    def write(self, partition, events):
        # Stage: buffer the writes (not yet committed)
        self.buffer[partition].extend(events)
    def commit_checkpoint(self):
        # Atomic commit (exactly-once)
        self.checkpoint_id += 1
        for partition, events in self.buffer.items():
            self.committed_batches[partition].extend(events)
        self.buffer.clear()

# Run consumers in parallel (simulated)
sink = IcebergBronzeSink()
consumers = [defaultdict(list) for _ in range(n_partitions)]
for partition, event in producer_events:
    consumers[partition][partition].append(event)

# Each consumer processes its partition (parallel)
for consumer_id in range(n_partitions):
    partition_events = consumers[consumer_id][consumer_id]
    # Process + write to Iceberg Bronze (partitioned by chrom)
    sink.write(consumer_id, partition_events)

# Commit checkpoint (exactly-once via Kafka transactions)
sink.commit_checkpoint()

# Stats
print(f"Topic: gatk.variants ({n_partitions} partitions)")
print(f"Producer: 50,000 events keyed by chromosome")
print(f"Consumer group: bronze-iceberg-writer (24 consumers)")
print()
print(f"{'Chromosome':<10} | {'Partition':>10} | {'Events':>10} | {'Consumer':>10}")
print("-" * 50)
partition_counts = defaultdict(int)
for partition, event in producer_events:
    partition_counts[partition] += 1
for chrom in sorted(chrom_to_partition.keys()):
    partition = chrom_to_partition[chrom]
    n_events = partition_counts[partition]
    print(f"{chrom:<10} | {partition:>10} | {n_events:>10,} | consumer-{partition:>02d}")

print()
print(f"Total events:     {sum(partition_counts.values()):,}")
print(f"Avg per partition: {sum(partition_counts.values())/n_partitions:,.0f}")
print(f"Max partition:     {max(partition_counts.values()):,}")
print(f"Min partition:     {min(partition_counts.values()):,}")
print(f"Imbalance:         {100*(max(partition_counts.values())-min(partition_counts.values()))/max(partition_counts.values()):.1f}%")
print()
print(f"Checkpoint ID:     {sink.checkpoint_id}")
print(f"Committed batches: {sum(len(b) for b in sink.committed_batches.values()):,}")
print()
print("Guarantees:")
print("  - Total order per chromosome (events for chr17 stay in partition 16)")
print("  - No duplicates (each partition has exactly one consumer in group)")
print("  - Exactly-once (consumer offset + Iceberg commit in one Kafka txn)")
print("  - Parallel processing (24-way parallelism across 24 partitions)")`;function M(){let[e,r]=(0,t.useState)("broker"),o={producer:{label:"Producer (keyed)",desc:"Writes to topic. Key (e.g. chromosome) determines partition via Murmur2 hash. Idempotent producer: broker deduplicates retries.",level:0},broker:{label:"Broker × N (KRaft quorum)",desc:"Kafka servers. KRaft quorum (3+) for metadata. Each broker holds N partitions as leader or follower.",level:1},topic:{label:"Topic (24 partitions)",desc:"Logical channel. 24 partitions = 24-way parallelism. Each partition = ordered log + N replicas (RF=3).",level:2},partition:{label:"Partition (ordered log)",desc:"Append-only log. Total order per partition. Replicated to 3 brokers. Offset = position in log.",level:3},consumer_group:{label:"Consumer Group (24 members)",desc:"Each partition assigned to exactly one consumer. Rebalance on consumer death. Cooperative-sticky minimises movement.",level:4},consumer:{label:"Consumer → Bronze Iceberg",desc:"Reads from assigned partition, writes to Iceberg Bronze. Exactly-once via Kafka transactions.",level:4},isr:{label:"ISR (In-Sync Replicas)",desc:"Replicas caught up to leader. min.insync.replicas=2 ensures durability before ack.",level:3}},i={producer:{x:60,y:30},broker:{x:200,y:30},topic:{x:200,y:90},partition:{x:120,y:150},isr:{x:280,y:150},consumer_group:{x:200,y:210},consumer:{x:200,y:270}};return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(_.Radio,{className:"h-3.5 w-3.5 text-primary"}),"Kafka architecture — brokers + topics + partitions + consumer groups + KRaft"]})}),(0,a.jsxs)("div",{className:"p-3",children:[(0,a.jsxs)("svg",{viewBox:"0 0 400 310",className:"w-full h-auto",children:[[["producer","broker"],["broker","topic"],["topic","partition"],["partition","isr"],["topic","consumer_group"],["consumer_group","consumer"]].map(([e,r],t)=>{let s=i[e],o=i[r];return(0,a.jsx)("line",{x1:s.x,y1:s.y+12,x2:o.x,y2:o.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow-kafka)"},t)}),Object.entries(i).map(([t,i])=>{let n=e===t,c=o[t],l=0===c.level?"var(--chart-3)":1===c.level?"var(--chart-2)":2===c.level?"var(--chart-1)":3===c.level?"var(--chart-4)":"var(--muted-foreground)";return(0,a.jsxs)(s.motion.g,{onMouseEnter:()=>r(t),onMouseLeave:()=>r(null),animate:{scale:n?1.05:1},style:{cursor:"pointer"},children:[(0,a.jsx)("rect",{x:i.x-60,y:i.y-10,width:"120",height:"22",rx:"3",fill:n?l+"30":"var(--background)",stroke:l,strokeWidth:n?1.5:.8}),(0,a.jsx)("text",{x:i.x,y:i.y+4,textAnchor:"middle",fontSize:"6.5",fill:n?l:"var(--foreground)",fontWeight:n?"bold":"normal",children:c.label})]},t)}),(0,a.jsx)("defs",{children:(0,a.jsx)("marker",{id:"arrow-kafka",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,a.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,a.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:o[e].label}),(0,a.jsx)("p",{className:"text-muted-foreground",children:o[e].desc})]}),!e&&(0,a.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node to see its role — partitions are the parallelism unit, consumer groups enable parallel reads."})]})]})}function O(){return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(v.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Kafka vs Pulsar vs Kinesis — distributed event streaming comparison"]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-xs",children:[(0,a.jsx)("thead",{className:"bg-muted/30",children:(0,a.jsxs)("tr",{className:"border-b border-border/60",children:[(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Apache Kafka"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Apache Pulsar"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"AWS Kinesis"})]})}),(0,a.jsx)("tbody",{children:[{feature:"Origin",kafka:"LinkedIn 2011, donated to Apache 2012",pulsar:"Yahoo 2016, donated to Apache",kinesis:"AWS (managed, 2013)"},{feature:"Architecture",kafka:"Brokers + KRaft (no ZooKeeper in 2024+)",pulsar:"Brokers + BookKeeper (segmented storage)",kinesis:"AWS-managed shards"},{feature:"Storage",kafka:"Topic partitions on broker disk (commit log)",pulsar:"Segmented in BookKeeper (compute/storage split)",kinesis:"Shards on AWS-managed storage"},{feature:"Partitions/shards",kafka:"2M+ (KRaft), 200k (ZooKeeper)",pulsar:"10k+ per topic (segmented)",kinesis:"500 per stream (soft limit)"},{feature:"Consumer groups",kafka:"Yes (one partition per consumer)",pulsar:"Yes (subscription modes: shared/failover/exclusive)",kinesis:"Enhanced fan-out (per-consumer shard)"},{feature:"Exactly-once",kafka:"Yes (transactions + idempotent producer)",pulsar:"Yes (transactions + dedup)",kinesis:"Approximate-once (needs client dedup)"},{feature:"Geo-replication",kafka:"MirrorMaker 2.0 (manual config)",pulsar:"Native (built-in, configurable per topic)",kinesis:"Kinesis Multi-Region (manual)"},{feature:"Functions",kafka:"KStream + KSQL (separate)",pulsar:"Pulsar Functions (native, in-broker)",kinesis:"Lambda (no native functions)"},{feature:"Throughput (LinkedIn)",kafka:"7T msgs/day",pulsar:"~1T msgs/day (Twitter)",kinesis:"1M+ records/sec per account"},{feature:"Latency",kafka:"5-50ms (broker ack)",pulsar:"5-50ms (similar)",kinesis:"200ms-1s (typical)"},{feature:"Best fit",kafka:"High-throughput + exactly-once + ecosystem",pulsar:"Multi-region + geo-replication + functions",kinesis:"AWS-native + managed + minimal ops"}].map((e,r)=>(0,a.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,a.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,a.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.kafka}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.pulsar}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.kinesis})]},r))})]})})]})}let B=[{label:"Origin",value:"LinkedIn 2011",hint:"LinkedIn open-sourced Kafka in 2011 to handle activity-stream tracking at scale. Donated to Apache Foundation in 2012, graduated top-level 2014.",deltaTone:"flat"},{label:"Throughput",value:"7T msgs/day",hint:"LinkedIn processes 7 trillion messages/day across 60k+ partitions on 1k+ brokers. Uber processes 100B/day; Netflix 4T/day; Confluent Cloud 1T/day.",deltaTone:"up"},{label:"Partitions",value:"2M+ (KRaft)",hint:"KRaft (Kafka Raft, 2024+) raised the partition limit from 200k (ZooKeeper) to 2M+ per cluster. Single binary, no ZooKeeper, faster failover.",deltaTone:"up"},{label:"Exactly-once",value:"Yes (EOS)",hint:"Idempotent producer + transactions + read_committed isolation = true exactly-once. Production deployments: LinkedIn (100M txns/day), Uber (50M), banks (card payments).",deltaTone:"up"}];function D(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(o.PageHeader,{eyebrow:"Apache Kafka · distributed event streaming · partitions · KRaft",title:"Apache Kafka — distributed event streaming at LinkedIn scale",description:"Kafka is the de-facto standard for distributed event streaming — a partitioned commit log with consumer groups, transactions, and exactly-once semantics. Born at LinkedIn (2011) to handle 7 trillion messages/day of activity-stream tracking, Kafka now powers Uber (100B/day), Netflix (4T/day), and every major bank's payment processing. KRaft (2024+) replaces ZooKeeper with a Kafka-native Raft quorum — single binary, faster failover, 2M+ partitions per cluster. The Bronze tier of every modern lakehouse starts at a Kafka topic — partitioning by key (sensor_id, chromosome, customer_id) enables parallel consumers writing to Iceberg/Delta/Hudi with exactly-once.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(f.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(_.Radio,{className:"h-3 w-3"})," Partitioned log"]}),(0,a.jsxs)(f.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(b.Zap,{className:"h-3 w-3"})," Exactly-once"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:B.map(e=>(0,a.jsx)(o.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(o.SectionCard,{title:"Kafka architecture — brokers + topics + partitions + consumer groups",description:"Kafka's runtime is a broker cluster with KRaft (Kafka Raft) metadata quorum. Each topic is partitioned; each partition is an append-only log replicated to N brokers (RF=3 typical). Producers write by key (Murmur2 hash determines partition), enabling total order per key. Consumer groups enable parallel consumption — each partition assigned to exactly one consumer in the group, no duplicates. ISR (In-Sync Replicas) tracks which replicas are caught up; min.insync.replicas=2 ensures durability.",icon:(0,a.jsx)(_.Radio,{className:"h-5 w-5"}),badge:"architecture",children:(0,a.jsx)(M,{})}),(0,a.jsxs)(o.SectionCard,{title:"Cards — 5 sibling patterns",description:"Each card follows the BigDataCard pattern: explainer + 'Show code ↓' toggle. Code is collapsed by default to reduce visual overwhelm on a code-heavy page.",icon:(0,a.jsx)(k.Layers,{className:"h-5 w-5"}),contentClassName:"p-4 md:p-5 space-y-4",children:[(0,a.jsx)(n.CodeCard,{title:"1. Python producer — idempotent + transactional writes",description:"The idempotent producer deduplicates retries on the broker side (Producer ID + sequence numbers). The transactional producer enables exactly-once across multiple topics + consumer offsets — atomic commit. Keyed writes (key=chromosome) ensure all events for chr17 land in the same partition, enabling per-chromosome parallelism downstream.",icon:(0,a.jsx)(w.Atom,{className:"h-5 w-5"}),badge:"Producer",code:P,language:"python",filename:"kafka_producer.py",highlight:[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51],defaultCollapsed:!0,explainer:"This Python producer uses confluent_kafka to publish idempotent + transactional messages. The idempotent producer config (enable.idempotence, acks=all, max.in.flight=1) deduplicates retries on the broker side via Producer ID + sequence numbers. Keyed writes (key=chromosome) ensure all events for chr17 land in the same partition, enabling per-chromosome parallelism downstream."}),(0,a.jsx)(n.CodeCard,{title:"2. Scala consumer — exactly-once via transactions",description:"The read-process-write pattern: consumer reads from Kafka, processes, writes to Iceberg Bronze + emits to downstream topic. Exactly-once is achieved by wrapping consumer offset commit + producer sends in a single Kafka transaction. If anything fails, transaction aborts — no duplicates, no losses. Consumer with isolation.level=read_committed skips aborted transaction messages.",icon:(0,a.jsx)(x.Database,{className:"h-5 w-5"}),badge:"Consumer",code:I,language:"scala",filename:"kafka_consumer.scala",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73],defaultCollapsed:!0,explainer:"This Scala consumer implements the read-process-write pattern with exactly-once semantics. It reads from Kafka, processes events, then writes to Iceberg Bronze + emits to a downstream topic — all wrapped in a single Kafka transaction. The isolation.level=read_committed setting ensures the consumer only sees committed transactions, so failures leave no duplicates or losses."}),(0,a.jsx)(n.CodeCard,{title:"3. KRaft — Kafka without ZooKeeper (2024+)",description:"KRaft (Kafka Raft) replaces ZooKeeper with a Kafka-native metadata quorum. Single binary, simpler ops, faster failover (under 5s vs 30s+), 2M+ partitions per cluster (vs 200k ZooKeeper limit), 100k metadata ops/sec (vs 10k on ZooKeeper). Combined mode: broker + controller in same process. Separated mode: dedicated controller quorum for very large clusters.",icon:(0,a.jsx)(C.Server,{className:"h-5 w-5"}),badge:"KRaft",code:R,language:"yaml",filename:"kafka_server.properties",highlight:[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],defaultCollapsed:!0,explainer:"These server.properties settings configure Kafka in KRaft (Kafka Raft) mode — the 2024+ default that replaces ZooKeeper. process.roles=broker+controller enables combined mode where the controller quorum is embedded in the broker process, yielding a single binary, faster failover (~5s vs 30s+ on ZooKeeper), and 2M+ partitions per cluster."}),(0,a.jsx)(n.CodeCard,{title:"4. Partitions — the parallelism unit",description:"Partitions are Kafka's core abstraction. A topic has N partitions; each partition is an ordered append-only log. Producers write by key (Murmur2 hash modulo N) — same key always lands in same partition, ensuring total order per key. Consumer groups enable parallel consumption — each partition assigned to exactly one consumer, no duplicates. LinkedIn runs 60k+ partitions on 1k+ brokers.",icon:(0,a.jsx)(v.Boxes,{className:"h-5 w-5"}),badge:"Partitions",code:A,language:"sql",filename:"kafka_partitions.sql",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],defaultCollapsed:!0,explainer:"This SQL illustrates Kafka's partition model — the parallelism unit. The CREATE TOPIC statement sets partition count + replication factor, and producers write by key (e.g. chromosome) so Murmur2 hash(key) mod N assigns all events with the same key to the same partition. The result is total order per key with parallelism across keys."}),(0,a.jsx)(n.CodeCard,{title:"5. Transactions — exactly-once across topics",description:"Kafka transactions enable exactly-once semantics across multiple topics + consumer offsets. The pattern: producer begins transaction, sends to multiple topics (staged, not visible to read_committed consumers), commits when complete. Atomic across topics — either all visible or none. Used by LinkedIn (100M+ txns/day), Uber (50M+), and banks for card payment processing.",icon:(0,a.jsx)(b.Zap,{className:"h-5 w-5"}),badge:"Transactions",code:E,language:"python",filename:"kafka_transactions.py",highlight:[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55],defaultCollapsed:!0,explainer:"This Python producer wraps multiple topic sends + the consumer offset commit in a single Kafka transaction. begin_transaction() starts the atomic unit, send() stages writes (not visible to read_committed consumers), and commit_transaction() makes them visible atomically. Either all events land or none do — exactly-once across topics + consumer offsets."})]}),(0,a.jsx)(o.SectionCard,{title:"Try it: simulate Kafka partition + consumer group (Pyodide)",description:"Pure-Python simulation of Kafka — no JVM, no brokers. Build a synthetic pipeline: 50,000 variant events keyed by chromosome → 24 partitions via Murmur2 hash → 24 parallel consumers writing to Bronze Iceberg. Verify partition assignment is deterministic (same chrom always lands in same partition), see per-partition event counts, and observe exactly-once checkpoint commit.",icon:(0,a.jsx)(K.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,a.jsx)(c.PyodideRunner,{code:L,buttonLabel:"Run Kafka partition simulation (Pyodide)"})}),(0,a.jsx)(o.SectionCard,{title:"Kafka vs Pulsar vs Kinesis — distributed event streaming",description:"Three event-streaming platforms compete. Kafka (LinkedIn origin) wins on ecosystem + exactly-once + throughput. Pulsar (Yahoo origin) wins on geo-replication + segmented storage + functions. Kinesis (AWS-managed) wins on operational simplicity + AWS-native integration.",icon:(0,a.jsx)(v.Boxes,{className:"h-5 w-5"}),children:(0,a.jsx)(O,{})}),(0,a.jsx)(o.SectionCard,{title:"Why Kafka evolved — shortfalls of traditional messaging (Era 1)",description:"Modern data engineers chose Kafka over ActiveMQ/RabbitMQ because traditional messaging systems had four critical shortfalls that made PB-scale event streaming painful. Kafka was designed ground-up as a partitioned commit log to fix all four.",icon:(0,a.jsx)(j.History,{className:"h-5 w-5"}),badge:"Why Kafka",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Messaging systems deleted on read."})," ActiveMQ/RabbitMQ deleted messages after consumer ACK — no replay, no historical analysis. Kafka's commit log is append-only with retention (7 days default, configurable to forever). ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," replay from any offset, historical analytics, backfill new consumers from the beginning."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: No parallelism model."})," ActiveMQ/RabbitMQ had topics (broadcast) or queues (load-balance) but no per-key ordering with parallelism. Kafka's partitions + consumer groups enable per-key ordering (same partition) + parallelism (multiple partitions, multiple consumers). ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," LinkedIn processes 7T msgs/day with 60k+ partitions across 1k+ brokers."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No exactly-once."})," ActiveMQ/RabbitMQ had at-least-once (with redelivery) — duplicates were the consumer's problem. Kafka's idempotent producer (PID + sequence numbers dedup retries on broker) + transactions (atomic across topics + offsets) = true exactly-once. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," banks use Kafka for card payment processing; regulatory exactly-once is non-negotiable."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: No horizontal scale-out."})," ActiveMQ/RabbitMQ clustered but each broker held all queues (no partitioning). Kafka partitions are distributed across brokers — add brokers, rebalance partitions, scale linearly. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," LinkedIn scaled from 1 broker to 1k+ brokers without application changes; partition count scaled linearly with brokers."]})]})}),(0,a.jsx)(o.SectionCard,{title:"Truly unique Kafka features (vs Pulsar + Kinesis)",description:"Kafka has four features that are genuinely unique — not marketing fluff, but structural differentiators that no other streaming platform has yet matched at the same scale.",icon:(0,a.jsx)(K.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. 7T msgs/day production scale"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["LinkedIn's production deployment processes 7 trillion messages/day across 60k+ partitions. ",(0,a.jsx)("strong",{children:"Pulsar's largest deployment (Twitter) is ~1T/day; Kinesis is per-account limited."})," Kafka wins on raw throughput at scale."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Idempotent producer + transactions"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["True exactly-once via producer-side dedup (PID + sequence #s) + broker-side transactions. ",(0,a.jsx)("strong",{children:"Pulsar has transactions but lacks idempotent producer; Kinesis has neither."})," Kafka's EOS is the industry standard."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. KRaft — Kafka-native metadata quorum"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["2024+ replaced ZooKeeper with Kafka-native Raft quorum. Single binary, faster failover (5s vs 30s+), 2M+ partitions (vs 200k ZK limit). ",(0,a.jsx)("strong",{children:"Pulsar uses BookKeeper + ZooKeeper; Kinesis is AWS-managed (no control plane exposed)."})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Largest ecosystem (100+ integrations)"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["100+ connectors (Kafka Connect), KSQL (stream SQL), Kafka Streams (embedded streaming), Schema Registry, REST proxy. ",(0,a.jsx)("strong",{children:"Pulsar has Pulsar Functions but fewer connectors; Kinesis has Lambda + KCL only."})," Kafka wins on ecosystem breadth."]})]})]})}),(0,a.jsx)(o.SectionCard,{title:"2 scientific streaming examples — Bronze via Kafka",description:"Two production-style scientific streaming examples showing Kafka in action. Each is a clickable card opening a lazy popup with: scenario brief, dataset stats, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight. All examples show how Kafka enables the Bronze→Silver→Gold medallion for science.",icon:(0,a.jsx)(x.Database,{className:"h-5 w-5"}),badge:"2 examples × 5 langs",children:(0,a.jsx)(d.DatasetCards,{examples:m.KAFKA_SCIENCE_EXAMPLES,intro:"Environmental sensor network (50k sensors partitioned by sensor_id) + genomics event streaming (GATK VCF records partitioned by chromosome). Each card has Scala/Rust/Go/Elixir/Zig code with Kafka's partition + consumer group + transactions differentiators."})}),(0,a.jsx)(o.SectionCard,{title:"Computational tooling — the Kafka ecosystem",description:"Kafka's ecosystem is the broadest of any streaming platform — 100+ Kafka Connect connectors, KSQL for stream SQL, Kafka Streams for embedded streaming, Schema Registry for Avro/Protobuf/JSON Schema, and REST proxy for non-JVM clients.",icon:(0,a.jsx)(C.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(y.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Connectors + clients"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Kafka Connect"})," — 100+ source/sink connectors (Debezium, JDBC, S3, Elasticsearch)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Debezium"})," — CDC from MySQL/Postgres/Mongo/Oracle to Kafka"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Confluent .NET/Go/Python/C++"})," — non-JVM clients (librdkafka-backed)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"REST Proxy"})," — produce/consume via HTTP (non-Kafka clients)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Schema Registry"})," — Avro/Protobuf/JSON Schema evolution"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"KSQL"})," — SQL on Kafka streams (Confluent)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Kafka Streams"})," — embedded streaming in Java app"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"MirrorMaker 2.0"})," — cross-cluster replication (geo-replication)"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(N.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Deployments"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Kafka (OSS)"})," — self-hosted, KRaft or ZooKeeper mode"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Confluent Cloud"})," — managed multi-region Kafka"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Confluent Platform"})," — self-hosted enterprise with extras"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Amazon MSK"})," — AWS-managed Kafka (ZooKeeper or KRaft)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Azure Event Hubs"})," — Kafka-compatible (managed)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS MSK Serverless"})," — auto-scaling Kafka"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Redpanda"})," — Kafka-compatible C++ reimplementation"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"WarpStream"})," — Kafka on S3 (no brokers)"]})]})]})]})}),(0,a.jsx)(o.SectionCard,{title:"Research + production case studies",description:"The papers and production deployments that defined Kafka + distributed event streaming. The original Kreps/Narkhede/Rao paper is the academic foundation; LinkedIn + Uber + Netflix engineering blogs document production scale.",icon:(0,a.jsx)(S.FileText,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Kreps, Narkhede, Rao 2011 (LinkedIn Eng Blog):"}),' "Kafka: a Distributed Messaging System for Log Processing." The original Kafka paper. Argued that messaging systems should be a partitioned commit log (not a queue with delete-on-read), enabling replay + historical analytics. LinkedIn processed 1B events/day in 2011; now 7T/day.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Kreps 2014 (white paper):"}),' "Kafka: Distributed Logging System with High-Throughput + Low-Latency." Described the partition + consumer group + replication model. Kreps later founded Confluent (2014) — now a public company (CFLT). The Apache Kafka spec follows this paper closely.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"LinkedIn Production Case (2011-2024):"}),' LinkedIn\'s Kafka deployment grew from 1B events/day (2011) to 7T/day (2024) — 7,000× growth in 13 years. 60k+ partitions across 1k+ brokers. Use cases: activity streams (every page view), metrics (every RPC), audit (every data access). Their blog "Kafka at LinkedIn: 13 Years of Evolution" is the canonical reference.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Uber Production Case (2017):"}),' "Introducing Kafka at Uber: From Zero to 100B Events/Day." Uber replaced their internal messaging system (formerly RabbitMQ) with Kafka to handle 100B+ events/day. Use cases: Uber Eats order processing (exactly-once transactions for payments), driver location streaming (1M+ drivers, location updates every 4s), surge pricing (real-time supply/demand aggregation).']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Netflix Production Case (2018):"}),' "Kafka at Netflix: 4T Messages/Day." Netflix\'s Keystone pipeline processes 4T events/day via Kafka → Flink → Iceberg Bronze. Use cases: playback analytics (every Netflix view), recommendation features (per-user click stream), anomaly detection (real-time alerting). Their migration from RabbitMQ to Kafka is a must-read.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Kafka KRaft (Apache 2022-2024):"}),' "KIP-500: Replace ZooKeeper with a Kafka-native metadata quorum." Three-year effort to remove ZooKeeper. KRaft (Kafka Raft) graduated GA in Kafka 3.3 (2022) for new clusters, and migration GA in 3.6 (2024). Single binary, faster failover, 2M+ partitions per cluster. The biggest Kafka architectural change since 2012.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Kafka Exactly-Once (Apache 2017):"}),' "KIP-98: Exactly Once Delivery + Transactional Messaging." Three-year effort to add idempotent producer + transactions + read_committed isolation. The most-requested Kafka feature (banks refused to use Kafka without EOS). LinkedIn (100M txns/day), Uber (50M), and every major bank\'s card payment processing now rely on this.']})]})}),(0,a.jsx)(o.SectionCard,{title:"My deeper thought: Kafka IS the distributed commit log",description:"The unifying view: Kafka is structurally a distributed commit log — the same pattern as database WALs, blockchain ledgers, and version control systems. The 'innovation' is recognising that the commit log pattern applies to event streaming.",icon:(0,a.jsx)(T.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Kafka IS a distributed commit log."})," Every database engine since the 1970s uses a write-ahead log (WAL): writes go to an append-only log first, then get materialised to disk. Kafka is exactly this — partitions are append-only logs, consumers are the materialised views, the offset is the log sequence number (LSN). ",(0,a.jsx)("strong",{children:"PostgreSQL does this with WAL segments; Kafka does it with topic partitions; Bitcoin does it with blocks; Git does it with the object database."}),' The "innovation" is recognising that WAL semantics generalise to distributed event streaming — partitioning the log enables parallelism, replication enables durability, consumer groups enable parallel materialised views.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Partitions ARE the parallelism unit."})," In database terms, Kafka's partitions are the parallelism unit of the log — same as PostgreSQL's table partitions, Oracle's partition-wise joins, or sharded databases. The key insight is that ",(0,a.jsx)("strong",{children:"partition assignment is by key hash (Murmur2)"}),', so all events with the same key land in the same partition, ensuring total order per key. This is structurally identical to consistent hashing in distributed caches (Dynamo, Cassandra) — same pattern, applied to event streams. The "innovation" is making partition assignment deterministic and exposed to the user (vs database systems where it\'s an internal detail).']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Consumer groups ARE materialised view refresh."})," In database terms, Kafka's consumer groups are materialised view refresh processes — each consumer is a worker that maintains a materialised view (e.g. Bronze Iceberg table) by reading the log and applying changes. The offset is the materialised view's \"last applied LSN.\" Rebalance is the same as redistributing materialised view refresh workers across nodes. ",(0,a.jsx)("strong",{children:"This is structurally identical to PostgreSQL's logical replication (subscriber applies WAL entries) or dbt's incremental models (refreshed from upstream tables)."})]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Exactly-once IS two-phase commit across the log + the view."})," Kafka's exactly-once (transactions) is structurally the classic 2PC protocol: producer begins transaction, stages writes (not visible to read_committed consumers), commits atomically when complete. The \"innovation\" is that the consumer's offset commit is part of the same transaction — so the offset advance + the downstream producer sends are atomic. ",(0,a.jsx)("strong",{children:"This is the same pattern as PostgreSQL's prepared transactions (PREPARE TRANSACTION + COMMIT PREPARED), but applied to the producer-consumer-stream pipeline."})]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Kafka IS to event streaming what PostgreSQL was to OLTP."})," Before PostgreSQL, every database had its own storage format + WAL + query engine tightly coupled. PostgreSQL's WAL + MVCC + ACID on shared storage became the reference implementation that everyone forked (Redshift, Greenplum, CockroachDB, YugabyteDB). Kafka is doing the same for event streaming — its partition + consumer group + transaction model is being reimplemented by Pulsar (segmented storage), Kinesis (managed shards), Redpanda (C++ reimplementation), WarpStream (Kafka on S3). ",(0,a.jsx)("strong",{children:"The pattern is the standard; the implementations are interchangeable."}),' This is what "distributed event streaming" actually means.']})]})}),(0,a.jsx)(o.SectionCard,{title:"Related Elegant Code — the math that walks across disciplines",description:"This page's math appears in unexpected places. The Elegant Code cards show the same equation in 3+ sciences — click to explore the collision.",icon:(0,a.jsx)(K.Sparkles,{className:"h-5 w-5"}),badge:"Cross-domain",children:(0,a.jsx)("div",{className:"grid md:grid-cols-1 gap-3",children:(0,a.jsxs)(r.default,{href:(0,h.hrefFor)("elegant-code"),className:"group flex items-start gap-3 rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,a.jsx)("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary",children:"23"}),(0,a.jsxs)("div",{className:"min-w-0",children:[(0,a.jsx)("p",{className:"text-sm font-medium group-hover:text-primary transition-colors",children:"Consistent Hashing"}),(0,a.jsx)("p",{className:"text-[10px] font-mono text-muted-foreground mt-0.5",children:"θ = hash(key) mod 2^256"}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground mt-1 leading-relaxed",children:"Kafka partition assignment across brokers, Akamai CDN edge routing, Cassandra shard assignment — all use the SAME hash ring. Adding a node moves 8% of data, not 50%."})]})]})})}),(0,a.jsxs)(g.DeeperThoughtSection,{pageTitle:"Kafka",children:[(0,a.jsx)(g.DeeperThought,{title:"Kafka IS the append-only log — and it's 50 years old",connectedTo:"ADR-001 (platform architecture)",children:(0,a.jsx)("p",{children:"Kafka's core abstraction IS the append-only log — a sequence of immutable events ordered by offset. This IS the SAME data structure as the database WAL (write-ahead log, IBM 1970s), the Git object log, and the Delta Lake transaction log. The log IS the universal data structure for event sourcing. Kafka's insight: expose the log AS the API (not hide it behind a query engine). The consumer reads the log at its own pace (pull, not push). The math (append + read by offset) stays; the implementation (Kafka vs Pulsar vs Kinesis) changes."})}),(0,a.jsx)(g.DeeperThought,{title:"Kafka's consumer groups IS load-balanced subscription — and it's the right model",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"Kafka's consumer group protocol: each partition is assigned to exactly one consumer in the group. This IS load-balanced subscription — the SAME pattern as Kubernetes' service discovery (each pod gets traffic from the service). The partition IS the unit of parallelism. The consumer IS the worker. The group IS the service. The rebalance (when a consumer joins/leaves) IS the SAME as Kubernetes' pod rescheduling. The pattern (partition + consumer + rebalance) stays; the implementation (Kafka vs Pulsar vs SQS) changes."})}),(0,a.jsx)(g.DeeperThought,{title:"Kafka's exactly-once IS idempotent producer + transactional consumer — and it's hard",connectedTo:"ADR-013 (Delta Lake)",children:(0,a.jsx)("p",{children:"Kafka's exactly-once semantics (EOS) requires: (1) idempotent producer (dedup by sequence number), (2) transactional consumer (read-committed isolation), (3) transaction coordinator (2-phase commit). This IS the SAME pattern as Delta Lake's ACID: write to a log, commit atomically, readers see committed state. The 2PC (two-phase commit) IS the SAME protocol as XA transactions in databases. The math (idempotent + atomic + isolation) stays; the implementation (Kafka transactions vs Delta commits vs DBMS 2PC) changes."})}),(0,a.jsx)(g.DeeperThought,{title:"Kafka IS Poisson — and that's why it scales",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,a.jsx)("p",{children:"Kafka topic arrivals follow Poisson(λ) — the SAME distribution that models sequencing reads and radioactive decay. The consumer processes events at rate μ. If λ > μ, the queue grows unboundedly (backlog). If λ < μ, the consumer is idle (waste). The utilisation ρ = λ/μ determines the system's behaviour. This IS the SAME queueing theory that Erlang used for telephone exchanges in 1909. Kafka IS Erlang's telephone exchange, just for data instead of calls. The math (Poisson + service rate + utilisation) stays; the technology (Kafka vs Pulsar vs Kinesis) changes."})}),(0,a.jsx)(g.DeeperThought,{title:"Kafka's partition IS the shard — and it's the scalability primitive",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,a.jsx)("p",{children:"Kafka partitions by key (hash(key) mod N). Each partition is a separate log on a separate broker. This IS the SAME sharding that databases use (hash(shard_key) mod N). The partition IS the shard. The broker IS the shard server. The consumer IS the shard client. The rebalance IS the reshard. The pattern (hash + shard + rebalance) IS identical to MongoDB's sharding, Cassandra's vnode, and DynamoDB's partition key. The math (consistent hashing) stays; the implementation (Kafka vs Cassandra vs DynamoDB) changes."})})]}),(0,a.jsx)(l.RelatedTopics,{topics:[{id:"streaming",reason:"Streaming overview — Kafka in the broader streaming ecosystem"},{id:"flink",reason:"Apache Flink — primary stream processor on Kafka topics"},{id:"iceberg",reason:"Apache Iceberg — Bronze tier sink from Kafka consumers"},{id:"pulsar",reason:"Apache Pulsar — alternative streaming platform (segmented)"},{id:"kafka-connect",reason:"Kafka Connect — CDC ingestion into Kafka topics"},{id:"schema-registry",reason:"Schema Registry — Avro schema evolution for Kafka"},{id:"modern-big-data",reason:"Modern Big Data page — Kafka in the lakehouse stack"},{id:"data-lakehouse",reason:"Data Lakehouse — Bronze tier starts at Kafka topics"}]}),(0,a.jsx)(p.ResearchDemo,{pageId:"kafka"}),(0,a.jsx)(u.TrendAnticipation,{pageId:"kafka"}),(0,a.jsx)(i.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"streaming",reason:"Streaming overview — Kafka in the broader streaming ecosystem"},{id:"flink",reason:"Apache Flink — primary stream processor on Kafka topics"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(r.default,{href:(0,h.hrefFor)("streaming"),className:"text-sm text-primary hover:underline",children:"→ Streaming overview (Kappa architecture)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(r.default,{href:(0,h.hrefFor)("flink"),className:"text-sm text-primary hover:underline",children:"→ Apache Flink (primary stream processor)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(r.default,{href:(0,h.hrefFor)("pulsar"),className:"text-sm text-primary hover:underline",children:"→ Apache Pulsar (segmented alternative)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(r.default,{href:(0,h.hrefFor)("kafka-connect"),className:"text-sm text-primary hover:underline",children:"→ Kafka Connect (CDC ingestion)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(r.default,{href:(0,h.hrefFor)("schema-registry"),className:"text-sm text-primary hover:underline",children:"→ Schema Registry (Avro evolution)"})]})]})}e.s(["KafkaPage",()=>D])}]);