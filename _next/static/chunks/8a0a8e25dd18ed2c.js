(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,182705,e=>{"use strict";var t=e.i(843476),a=e.i(522016),s=e.i(271645),r=e.i(846932),n=e.i(862824),i=e.i(342046),o=e.i(921371),l=e.i(580296),c=e.i(122836),d=e.i(716675),m=e.i(59938),h=e.i(158960),p=e.i(372810),g=e.i(901752),u=e.i(487486),k=e.i(332017),f=e.i(39312),b=e.i(658041),x=e.i(21218),v=e.i(966992),y=e.i(828579),w=e.i(283086),S=e.i(227516),T=e.i(691385),j=e.i(178583),A=e.i(25652),N=e.i(618393),E=e.i(727927),_=e.i(581418);let C=`-- ============================================================
-- Apache Flink — event-time watermarks + windowed aggregation
-- Flink's watermark strategy is the core innovation for out-of-order
-- event processing. Late events are dropped (or routed to side output).
-- ============================================================

-- Source: Kafka topic with sensor events (event_ts is event-time)
CREATE TABLE kafka.sensor_events (
  sensor_id    STRING,
  metric       STRING,
  value        DOUBLE,
  event_ts     TIMESTAMP(3),
  -- Watermark: tolerate 5 seconds of out-of-order events
  WATERMARK FOR event_ts AS event_ts - INTERVAL '5' SECOND
) WITH (
  'connector' = 'kafka',
  'topic' = 'sensors.airnow',
  'properties.bootstrap.servers' = 'kafka:9092',
  'format' = 'avro',
  'scan.startup.mode' = 'latest-offset'
);

-- Tumbling window: aggregate every 1 minute (event-time)
-- Watermark advances when the max event_ts seen minus 5s tolerance
CREATE TABLE iceberg.bronze.sensor_1min AS
SELECT
  sensor_id,
  metric,
  TUMBLE_START(event_ts, INTERVAL '1' MINUTE) AS window_start,
  TUMBLE_END(event_ts, INTERVAL '1' MINUTE)   AS window_end,
  AVG(value) AS avg_value,
  MAX(value) AS max_value,
  COUNT(*)   AS n_readings
FROM kafka.sensor_events
GROUP BY
  sensor_id, metric,
  TUMBLE(event_ts, INTERVAL '1' MINUTE);

-- Sliding window: 10-minute windows hopping every 5 minutes
SELECT
  sensor_id, metric,
  HOP_START(event_ts, INTERVAL '5' MINUTE, INTERVAL '10' MINUTE) AS win_start,
  HOP_END(event_ts, INTERVAL '5' MINUTE, INTERVAL '10' MINUTE)  AS win_end,
  AVG(value) AS sliding_avg
FROM kafka.sensor_events
GROUP BY
  sensor_id, metric,
  HOP(event_ts, INTERVAL '5' MINUTE, INTERVAL '10' MINUTE);

-- Late events: routed to side output (watermark already passed window)
-- These are the events that arrived more than 5s late vs watermark
-- Use case: reprocessing, anomaly detection, or DLQ to Bronze
INSERT INTO iceberg.bronze.late_events
SELECT * FROM kafka.sensor_events
WHERE event_ts < CURRENT_WATERMARK(event_ts) - INTERVAL '5' SECOND;`,F=`-- ============================================================
-- State backends — Flink's stateful operations need a storage backend
--   1. HashMapStateBackend  — in-memory, fast, limited by JVM heap
--   2. EmbeddedRocksDBStateBackend — disk-based, scales to TBs of state
-- ============================================================

-- Configure state backend (in flink-conf.yaml or per-job)
-- state.backend: rocksdb
-- state.backend.rocksdb.localdir: /mnt/ephemeral/rocksdb
-- state.backend.rocksdb.memory.managed: true

-- Stateful job: per-sensor running average (state grows with sensor count)
CREATE TABLE kafka.sensor_events (
  sensor_id STRING, value DOUBLE, event_ts TIMESTAMP(3),
  WATERMARK FOR event_ts AS event_ts - INTERVAL '5' SECOND
) WITH ('connector' = 'kafka', 'topic' = 'sensors.airnow', ...);

-- Per-sensor running aggregation (stateful)
-- Each sensor_id has its own state entry (50k sensors = 50k state entries)
SELECT
  sensor_id,
  AVG(value) OVER (
    PARTITION BY sensor_id
    ORDER BY event_ts
    -- Range unbounded: full history per sensor (RocksDB-backed)
    RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_avg,
  COUNT(*) OVER (
    PARTITION BY sensor_id
    ORDER BY event_ts
    RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_count
FROM kafka.sensor_events;

-- State TTL: auto-expire state entries after 24h of inactivity
-- Prevents state growth from sensors that go offline
SET 'table.exec.state.ttl' = '24 h';

-- State backend comparison:
-- HashMapStateBackend:
--   - In-memory (JVM heap)
--   - ~10x faster than RocksDB
--   - Limited by heap size (typically 32-64 GB per TaskManager)
--   - Best for: small state (< 1 GB), low-latency jobs
--
-- EmbeddedRocksDBStateBackend:
--   - Disk-based (local SSD)
--   - Scales to TBs of state per TaskManager
--   - Slower (~10x vs HashMap) but unbounded
--   - Best for: large state (1 GB to TBs), long-running jobs
--   - Used by: Uber (1 TB state), Netflix (500 GB), Alibaba (10 TB)`,I=`-- ============================================================
-- Exactly-once semantics — Flink's two-phase commit on checkpoint
-- The checkpoint barrier flows through the DAG; when all operators
-- acknowledge, the coordinator commits. Sinks must support 2PC.
-- ============================================================

-- Enable exactly-once checkpointing (in flink-conf.yaml or per-job)
-- execution.checkpointing.interval: 60s
-- execution.checkpointing.mode: EXACTLY_ONCE
-- execution.checkpointing.alignment-timeout: 1 min  (unaligned after 1 min)
-- execution.checkpointing.externalized-checkpoint: RETAIN_ON_CANCELLATION

-- Kafka source with exactly-once (consumer offsets in checkpoint)
CREATE TABLE kafka.orders_cdc (
  order_id BIGINT, customer_id BIGINT, order_ts TIMESTAMP(3),
  op STRING,  -- INSERT | UPDATE | DELETE
  metadata ROW<ts TIMESTAMP(3), source STRING> METADATA FROM VALUE
) WITH (
  'connector' = 'kafka',
  'topic' = 'orders.cdc',
  'properties.bootstrap.servers' = 'kafka:9092',
  'properties.transaction.timeout.ms' = '900000',  -- 15 min for txn
  'format' = 'debezium-json',
  'scan.startup.mode' = 'earliest-offset'
);

-- Iceberg sink with exactly-once (2-phase commit on checkpoint)
CREATE TABLE iceberg.bronze.orders (
  order_id BIGINT, customer_id BIGINT, order_ts TIMESTAMP(3),
  is_deleted BOOLEAN,
  PRIMARY KEY (order_id) NOT ENFORCED
) WITH (
  'connector' = 'iceberg',
  'catalog-name' = 'moderndatascieng',
  'warehouse' = 's3://moderndatascieng-iceberg',
  'format-version' = '2',
  'write.upsert.enabled' = 'true',
  -- Exactly-once: commit on Flink checkpoint boundary
  'sink.commit.policy' = 'checkpoint'
);

-- CDC → Iceberg pipeline (exactly-once via checkpoint)
INSERT INTO iceberg.bronze.orders
SELECT
  order_id, customer_id, order_ts,
  op = 'DELETE' AS is_deleted
FROM kafka.orders_cdc;

-- Why this is exactly-once:
-- 1. Source: Kafka consumer offsets are in Flink's state (not auto-committed)
-- 2. Sink: Iceberg commits micro-batch only when Flink checkpoint succeeds
-- 3. If checkpoint fails → no Iceberg commit, no Kafka offset advance
-- 4. If checkpoint succeeds → Iceberg commit + Kafka offset advance atomically
-- 5. Recovery: replay from last checkpoint (no duplicates, no losses)`,B=`// ============================================================
// Flink CEP — Complex Event Processing for pattern detection
// Pattern API: begin / followedBy / or / not / within / times
// Use cases: fraud detection, IoT anomaly detection, LHC triggers
// ============================================================

import org.apache.flink.cep.CEP
import org.apache.flink.cep.pattern.Pattern
import org.apache.flink.cep.pattern.conditions.SimpleCondition
import org.apache.flink.streaming.api.scala._
import org.apache.flink.streaming.api.windowing.time.Time

case class Transaction(
  txn_id: Long, account_id: Long, amount: Double,
  location: String, ts: Long, merchant: String
)

val env = StreamExecutionEnvironment.getExecutionEnvironment
  .setParallelism(100)
  .enableCheckpointing(60000)  // 60s checkpoint, exactly-once

val txns: KeyedStream[Transaction, Long] = env
  .addSource(new TransactionSource)
  .keyBy(_.account_id)  // group by account

// Fraud pattern: 3 transactions > $500 within 5 minutes
val fraudPattern: Pattern[Transaction, _] = Pattern
  .begin[Transaction]("large_txn")
    .where(new SimpleCondition[Transaction]() {
      override def filter(t: Transaction): Boolean = t.amount > 500.0
    })
    .times(3)  // exactly 3 occurrences
    .within(Time.minutes(5))  // within 5-minute window

// Apply pattern — emits matched sequences as fraud alerts
val fraudAlerts: DataStream[FraudAlert] = CEP.pattern(txns, fraudPattern)
  .select(events => FraudAlert(
    account_id = events.head.account_id,
    n_suspicious_txns = events.length,
    total_amount = events.map(_.amount).sum,
    detection_ts = System.currentTimeMillis()
  ))

// Sink: alert to Kafka topic + write to Bronze Iceberg
fraudAlerts.addSink(new KafkaSink("alerts.fraud"))
fraudAlerts.addSink(new IcebergSink("bronze.fraud_alerts"))

env.execute("fraud-detection-cep")`,R=`// ============================================================
// Flink Dataset API — typed Scala/Java DSL for streaming pipelines
// Lower-level than Table API/SQL; full control over operators
// ============================================================

import org.apache.flink.streaming.api.scala._
import org.apache.flink.streaming.api.windowing.time.Time
import org.apache.flink.streaming.api.functions.ProcessFunction
import org.apache.flink.util.Collector

case class SensorReading(
  sensor_id: String, metric: String, value: Double,
  region: String, ts: Long, quality: Int
)

val env = StreamExecutionEnvironment.getExecutionEnvironment
  .setParallelism(200)
  .enableCheckpointing(30000)
  .setBufferTimeout(100)  // 100ms batching for throughput

// Source: Kafka (sensor events as JSON)
val stream: DataStream[SensorReading] = env
  .addSource(new FlinkKafkaConsumer(
    "sensors.airnow",
    new JSONKeyValueDeserializationSchema,
    kafkaProps
  ))
  .map(_.value)  // extract value from JSON
  .filter(_.quality > 50)  // drop low-quality readings

// Process function — per-event processing with state + timers
val enriched: DataStream[SensorReading] = stream
  .keyBy(_.sensor_id)
  .process(new SensorCalibrator)  // stateful: per-sensor calibration factor

// Window: 1-minute tumbling per region
val hourlyAgg: DataStream[RegionAQI] = enriched
  .keyBy(_.region)
  .timeWindow(Time.minutes(1))
  .aggregate(new AQIAggregator)

// Side output: anomaly stream (value > 3 sigma from rolling mean)
val anomalies: DataStream[SensorAnomaly] = enriched
  .getSideOutput[SensorAnomaly](anomalyTag)

// Sink: Iceberg (Bronze tier — partitioned by region + hour)
hourlyAgg.addSink(new IcebergSink("bronze.aqi_by_region"))
anomalies.addSink(new KafkaSink("alerts.sensor_anomalies"))

env.execute("sensor-pipeline")

// ============================================================
// Flink vs Spark Streaming: Flink is true streaming (one event at a
// time, sub-ms latency); Spark Streaming is micro-batch (X-second
// batches, higher latency, simpler semantics).
// ============================================================`,D=`# ============================================================
# Flink pipeline simulation — watermarks + exactly-once + state
# Simulates a Kafka source, Flink processing, Iceberg Bronze sink
# ============================================================

import random
from collections import defaultdict, deque

print("=== Flink Pipeline Simulation ===")
print("Kafka source → Flink (watermark + state) → Iceberg Bronze sink")
print()

# Simulate Kafka topic with sensor events (some out-of-order)
random.seed(42)
n_sensors = 1000
n_events = 5000

# Generate events with random out-of-order arrival
events = []
for i in range(n_events):
    event = {
        'sensor_id': f'sensor-{random.randint(1, n_sensors):04d}',
        'metric': random.choice(['pm25', 'o3', 'temp']),
        'value': max(0, random.gauss(15, 10)),
        'event_ts': i + random.randint(-3, 0),  # some late
        'kafka_offset': i,
    }
    events.append(event)

# Shuffle arrival order (simulates out-of-order from Kafka)
random.shuffle(events)

# Flink watermark tracker (per-partition max event_ts - 5s tolerance)
class WatermarkTracker:
    def __init__(self, tolerance=5):
        self.tolerance = tolerance
        self.max_event_ts = 0
        self.late_events = 0
    def update(self, event_ts):
        if event_ts > self.max_event_ts:
            self.max_event_ts = event_ts
    def watermark(self):
        return max(0, self.max_event_ts - self.tolerance)
    def is_late(self, event_ts, window_end):
        return event_ts < self.watermark() or event_ts < window_end - self.tolerance

# Flink stateful operator (per-sensor calibration)
class StateBackend:
    def __init__(self):
        self.state = {}  # sensor_id -> rolling stats
    def get_or_init(self, sensor_id):
        if sensor_id not in self.state:
            self.state[sensor_id] = {'count': 0, 'sum': 0.0, 'mean': 0.0}
        return self.state[sensor_id]
    def update(self, sensor_id, value):
        s = self.get_or_init(sensor_id)
        s['count'] += 1
        s['sum'] += value
        s['mean'] = s['sum'] / s['count']
        return s['mean']

# Iceberg Bronze sink (exactly-once via checkpoint)
class IcebergSink:
    def __init__(self, name):
        self.name = name
        self.buffer = []  # buffered writes pending checkpoint
        self.committed = []
        self.checkpoint_id = 0
    def write(self, batch):
        # Stage: buffer the writes (not yet committed)
        self.buffer.extend(batch)
    def checkpoint(self):
        # 2-phase commit: stage -> commit atomically
        self.checkpoint_id += 1
        self.committed.extend(self.buffer)
        committed = self.buffer
        self.buffer = []
        return len(committed)

# Run pipeline
watermark = WatermarkTracker(tolerance=5)
state = StateBackend()
bronze = IcebergSink('bronze.sensor_1min')
late_events = []

# Tumbling window aggregation (1-minute = 60 events in sim time)
window_size = 60
window_buffer = defaultdict(list)  # (sensor, metric) -> list of values
checkpoint_interval = 100  # checkpoint every 100 events

for i, event in enumerate(events):
    ts = event['event_ts']
    watermark.update(ts)

    # Stateful operator: per-sensor rolling mean
    rolling_mean = state.update(event['sensor_id'], event['value'])

    # Window aggregation
    window_id = ts // window_size
    key = (event['sensor_id'], event['metric'], window_id)
    window_buffer[key].append(event['value'])

    # Check for late events (watermark already past window end)
    window_end = (window_id + 1) * window_size
    if watermark.is_late(ts, window_end):
        late_events.append(event)

    # Periodic checkpoint (exactly-once)
    if (i + 1) % checkpoint_interval == 0:
        # Flush closed windows to Iceberg buffer
        closed_windows = [(k, v) for k, v in window_buffer.items()
                          if (k[2] + 1) * window_size <= watermark.watermark()]
        for k, v in closed_windows:
            bronze.write([{
                'sensor_id': k[0], 'metric': k[1],
                'window_id': k[2],
                'avg_value': sum(v) / len(v),
                'n_readings': len(v)
            }])
            del window_buffer[k]
        # Commit checkpoint
        n_committed = bronze.checkpoint()

print(f"Source (Kafka events):        {n_events:,}")
print(f"Out-of-order events:          {sum(1 for e in events if e['event_ts'] < e['kafka_offset']):,}")
print(f"Watermark tolerance:          5 seconds")
print(f"Watermark final position:     {watermark.watermark()}")
print(f"Late events (dropped):        {len(late_events):,} ({100*len(late_events)/n_events:.1f}%)")
print(f"State entries (per-sensor):   {len(state.state)}")
print(f"Bronze committed:             {len(bronze.committed):,}")
print(f"Checkpoints completed:        {bronze.checkpoint_id}")
print()
print(f"State backend: HashMap (in-memory, fast)")
print(f"  Memory: ~{len(state.state) * 64 / 1024:.1f} KB (64 bytes/state entry)")
print(f"  For 50k sensors: ~3.1 MB (fits in JVM heap)")
print(f"  For 1M sensors: ~62 MB (still fits — use RocksDB for >100M)")
print()
print(f"Exactly-once guarantee:")
print(f"  - Source: Kafka offsets in Flink state (not auto-committed)")
print(f"  - Sink: Iceberg commits on checkpoint boundary (2-phase commit)")
print(f"  - Recovery: replay from last checkpoint (no dupes, no losses)")`;function P(){let[e,a]=(0,s.useState)("jobmanager"),n={client:{label:"Client (submit JobGraph)",desc:"Submit Flink JAR + JobGraph to JobManager via REST API or CLI",level:0},jobmanager:{label:"JobManager (coordinator)",desc:"Schedules tasks, coordinates checkpoints, manages state metadata. Single leader + standbys (ZooKeeper/KRaft quorum).",level:1},taskmanager:{label:"TaskManager × N (workers)",desc:"Runs Task Slots (parallelism units). Holds state (RocksDB on local disk). Sends heartbeats + ACKs to JM.",level:2},source:{label:"Source (Kafka/CDC)",desc:"Kafka consumer with offsets in Flink state. Exactly-once via checkpoint-aligned commits.",level:3},operators:{label:"Operators (map/filter/keyBy/window)",desc:"Stateful operators — per-key state in RocksDB. Watermark propagates through DAG.",level:3},sink:{label:"Sink (Iceberg/Kafka)",desc:"Two-phase commit on checkpoint boundary — atomic, exactly-once writes to Bronze tier.",level:3},state:{label:"State Backend (RocksDB)",desc:"Local-disk RocksDB on TaskManager. Checkpointed to S3/HDFS for recovery. Scales to TBs per TM.",level:4},checkpoint:{label:"Checkpoint Coordinator",desc:"JM injects checkpoint barriers; flows through DAG. When all TMs ACK, JM commits state + offsets.",level:4}},i={client:{x:60,y:30},jobmanager:{x:200,y:30},checkpoint:{x:340,y:30},taskmanager:{x:200,y:90},source:{x:60,y:150},operators:{x:200,y:150},sink:{x:340,y:150},state:{x:200,y:210}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(x.Activity,{className:"h-3.5 w-3.5 text-primary"}),"Flink architecture — JobManager + TaskManagers + stateful operators + checkpoint barriers"]})}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsxs)("svg",{viewBox:"0 0 400 250",className:"w-full h-auto",children:[[["client","jobmanager"],["jobmanager","taskmanager"],["taskmanager","source"],["taskmanager","operators"],["taskmanager","sink"],["operators","state"],["jobmanager","checkpoint"],["checkpoint","state"]].map(([e,a],s)=>{let r=i[e],n=i[a];return(0,t.jsx)("line",{x1:r.x,y1:r.y+12,x2:n.x,y2:n.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow-flink)"},s)}),Object.entries(i).map(([s,i])=>{let o=e===s,l=n[s],c=0===l.level?"var(--chart-3)":1===l.level?"var(--chart-2)":2===l.level?"var(--chart-1)":3===l.level?"var(--chart-4)":"var(--muted-foreground)";return(0,t.jsxs)(r.motion.g,{onMouseEnter:()=>a(s),onMouseLeave:()=>a(null),animate:{scale:o?1.05:1},style:{cursor:"pointer"},children:[(0,t.jsx)("rect",{x:i.x-60,y:i.y-10,width:"120",height:"22",rx:"3",fill:o?c+"30":"var(--background)",stroke:c,strokeWidth:o?1.5:.8}),(0,t.jsx)("text",{x:i.x,y:i.y+4,textAnchor:"middle",fontSize:"6.5",fill:o?c:"var(--foreground)",fontWeight:o?"bold":"normal",children:l.label})]},s)}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"arrow-flink",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,t.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:n[e].label}),(0,t.jsx)("p",{className:"text-muted-foreground",children:n[e].desc})]}),!e&&(0,t.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node to see its role — the JobManager coordinates, TaskManagers execute, checkpoint barriers flow through."})]})]})}function M(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(y.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Flink vs Spark Streaming vs Kafka Streams — streaming engine comparison"]})}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/30",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Apache Flink"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Spark Streaming"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Kafka Streams"})]})}),(0,t.jsx)("tbody",{children:[{feature:"Origin",flink:"Berlin Univ (2009), donated to Apache 2014",spark:"UC Berkeley AMPLab (2013)",kstreams:"LinkedIn (2016)"},{feature:"Processing model",flink:"True streaming (one event at a time)",spark:"Micro-batch (X-sec batches)",kstreams:"True streaming (per-record)"},{feature:"Latency",flink:"Sub-millisecond",spark:"100ms-seconds (batch-bound)",kstreams:"Sub-millisecond"},{feature:"State backends",flink:"HashMap + RocksDB (TBs)",spark:"RocksDB only (Structured Streaming)",kstreams:"RocksDB (per-store)"},{feature:"Exactly-once",flink:"Yes (2-phase commit on checkpoint)",spark:"Yes (write-ahead logs per batch)",kstreams:"Yes (transactions + EOS)"},{feature:"Event-time watermarks",flink:"Native, configurable per-source",spark:"Via withWatermark() in Structured Streaming",kstreams:"Via punctuations (limited)"},{feature:"Complex event processing",flink:"Native CEP library (Pattern API)",spark:"Via custom code (no CEP library)",kstreams:"Via custom code + KSQL"},{feature:"Stateful ops",flink:"ProcessFunction (full control)",spark:"mapGroupsWithState",kstreams:"Transformer + state stores"},{feature:"Deployment",flink:"Standalone / K8s / YARN / Mesos",spark:"Standalone / K8s / YARN / Mesos",kstreams:"Embedded in app (no cluster)"},{feature:"Best fit",flink:"Low-latency + complex state + CEP",spark:"Batch + streaming unified (simpler)",kstreams:"Microservices needing streaming"},{feature:"Production users",flink:"Alibaba, Uber, Netflix, AWS",spark:"All Databricks customers, Netflix",kstreams:"LinkedIn (7T msgs/day), New York Times"}].map((e,a)=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,t.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.flink}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.spark}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.kstreams})]},a))})]})})]})}let L=[{label:"Origin",value:"Berlin Univ 2009",hint:"Stratosphere research project at Berlin University of Technology; donated to Apache Foundation in 2014. Born as a true streaming alternative to Spark's micro-batch model.",deltaTone:"flat"},{label:"Throughput",value:"Millions/sec",hint:"Alibaba Double 11: 1.7 billion events/sec processed by Flink on Singles' Day 2024. Uber, Netflix, AWS run production Flink clusters.",deltaTone:"up"},{label:"State size",value:"TB-scale",hint:"RocksDB state backend enables TB-scale state per TaskManager. Alibaba uses 10TB+ state for real-time recommendation; Netflix 500GB for playback analytics.",deltaTone:"up"},{label:"Latency",value:"Sub-ms",hint:"True streaming (one event at a time) vs Spark's micro-batch (X-sec batches). Flink achieves sub-millisecond end-to-end latency with proper tuning.",deltaTone:"up"}];function K(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(n.PageHeader,{eyebrow:"Apache Flink · stream processing · exactly-once · CEP",title:"Apache Flink — true stream processing at scale",description:"Flink is the gold-standard for true (per-event) stream processing — sub-millisecond latency, exactly-once semantics via two-phase commit on checkpoint, petabyte-scale state via RocksDB, and a native Complex Event Processing (CEP) library. Born at Berlin University of Technology (2009) as a research alternative to Spark's micro-batch model, Flink now powers Alibaba's Singles' Day (1.7B events/sec), Uber's real-time ETL, Netflix's playback analytics, and AWS's managed Kinesis Data Analytics. Flink is the streaming engine of choice for Iceberg/Delta/Hudi Bronze-tier writes — its exactly-once guarantees are non-negotiable for clinical genomics, fraud detection, and LHC trigger pipelines.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(u.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(f.Zap,{className:"h-3 w-3"})," Exactly-once"]}),(0,t.jsxs)(u.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(x.Activity,{className:"h-3 w-3"})," True streaming"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:L.map(e=>(0,t.jsx)(n.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(n.SectionCard,{title:"Flink architecture — JobManager + TaskManagers + checkpoint barriers",description:"Flink's runtime is a master-worker architecture. The JobManager (single leader + standbys via ZooKeeper/KRaft) coordinates scheduling, checkpoints, and recovery. TaskManagers (workers) run Task Slots (parallelism units), hold operator state in RocksDB, and ACK checkpoints. Checkpoint barriers flow through the DAG; when all operators ACK, the JobManager commits state + offsets atomically — exactly-once semantics.",icon:(0,t.jsx)(x.Activity,{className:"h-5 w-5"}),badge:"architecture",children:(0,t.jsx)(P,{})}),(0,t.jsx)(n.SectionCard,{title:"Event-time watermarks + windowed aggregation",description:"Watermarks are Flink's mechanism for handling out-of-order events. The watermark is defined as (max event_ts seen - tolerance); events older than the watermark are 'late' and either dropped or routed to side output. This enables event-time processing (windows align to event timestamps, not arrival time) which is essential for accurate analytics when Kafka topics deliver events out-of-order due to producer retries, network jitter, or parallel consumers.",icon:(0,t.jsx)(T.Atom,{className:"h-5 w-5"}),badge:"Flink SQL",children:(0,t.jsx)(c.CodeBlock,{code:C,language:"sql",filename:"flink_watermarks.sql",highlight:[12,13,14,15,16,17,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]})}),(0,t.jsx)(n.SectionCard,{title:"State backends — HashMap (in-memory) vs RocksDB (disk)",description:"Flink's stateful operators (per-key aggregations, joins, CEP) need a storage backend. HashMapStateBackend keeps state in JVM heap (~10× faster than RocksDB) but is bounded by heap size (32-64 GB typical). EmbeddedRocksDBStateBackend stores state on local SSD (scales to TBs per TaskManager) but is ~10× slower. Alibaba uses RocksDB for 10TB+ state on Singles' Day; Netflix uses 500GB for real-time playback analytics.",icon:(0,t.jsx)(b.Database,{className:"h-5 w-5"}),badge:"State",children:(0,t.jsx)(c.CodeBlock,{code:F,language:"sql",filename:"flink_state_backends.sql",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53]})}),(0,t.jsx)(n.SectionCard,{title:"Exactly-once semantics — two-phase commit on checkpoint",description:"Flink's exactly-once guarantee is the gold standard for streaming. The mechanism: (1) Kafka source stores consumer offsets in Flink state (not auto-committed); (2) Iceberg/Kafka sink buffers writes pending checkpoint; (3) checkpoint barrier flows through the DAG; (4) when all operators ACK, the JobManager commits state + offsets + sink writes atomically. If a TaskManager crashes, Flink recovers from the last checkpoint with no duplicates and no losses. This is non-negotiable for clinical genomics (a lost variant = missed BRCA1 mutation) and LHC triggers (a duplicated event = false physics signal).",icon:(0,t.jsx)(_.ShieldCheck,{className:"h-5 w-5"}),badge:"Exactly-once",children:(0,t.jsx)(c.CodeBlock,{code:I,language:"sql",filename:"flink_exactly_once.sql",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57]})}),(0,t.jsx)(n.SectionCard,{title:"Flink CEP — Complex Event Processing for pattern detection",description:"Flink CEP provides a Pattern API for specifying temporal patterns over event streams: begin (start of pattern), followedBy (sequence), or (alternatives), not (absence), times (cardinality), within (time window). Use cases: fraud detection (3 transactions over USD 500 within 5 minutes from one account), IoT anomaly detection (sensor reading outside 3 sigma of rolling mean), and LHC triggers (high-pT muon followed by missing ET within 100 nanoseconds). CEP is what makes Flink the gold standard for streaming pattern matching.",icon:(0,t.jsx)(f.Zap,{className:"h-5 w-5"}),badge:"Flink CEP",children:(0,t.jsx)(c.CodeBlock,{code:B,language:"scala",filename:"flink_cep.scala",highlight:[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43]})}),(0,t.jsx)(n.SectionCard,{title:"Dataset API — typed Scala/Java DSL for full control",description:"The Dataset API is the lower-level typed API (vs Table API/SQL). It gives full control over operators: ProcessFunction for per-event processing with state + timers, keyBy for partitioning, timeWindow for tumbling/sliding windows, and side output for routing late events or anomalies. Use the Dataset API when SQL is too restrictive (e.g. custom stateful logic, async I/O, side outputs).",icon:(0,t.jsx)(v.Cpu,{className:"h-5 w-5"}),badge:"Dataset API",children:(0,t.jsx)(c.CodeBlock,{code:R,language:"scala",filename:"flink_dataset_api.scala",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]})}),(0,t.jsx)(n.SectionCard,{title:"Try it: simulate a Flink pipeline in your browser (Pyodide)",description:"Pure-Python simulation of a Flink pipeline — no JVM, no Kafka, no S3. Build a synthetic pipeline: generate 5,000 sensor events (some out-of-order), track watermarks with 5-second tolerance, run per-sensor stateful aggregation (HashMap state backend), detect late events (watermark already past window end), and commit to an Iceberg Bronze sink via two-phase commit on checkpoint. See exactly-once in action — recovery would replay from the last checkpoint with no duplicates.",icon:(0,t.jsx)(w.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:D,buttonLabel:"Run Flink pipeline simulation (Pyodide)"})}),(0,t.jsx)(n.SectionCard,{title:"Flink vs Spark Streaming vs Kafka Streams — streaming engine comparison",description:"Three streaming engines compete. Flink is true-streaming (sub-ms latency, full CEP, TB-scale state) — best for low-latency + complex state + pattern matching. Spark Structured Streaming is micro-batch (simpler semantics, unified with batch Spark) — best for teams already on Spark. Kafka Streams is embedded in your app (no cluster to manage) — best for microservices needing streaming.",icon:(0,t.jsx)(y.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(M,{})}),(0,t.jsx)(n.SectionCard,{title:"Why Flink evolved — shortfalls of Spark Streaming (Era 2)",description:"Modern data engineers chose Flink over Spark Streaming because Spark's micro-batch model had four critical shortfalls that made true low-latency streaming painful. Flink was designed ground-up as true streaming to fix all four.",icon:(0,t.jsx)(S.History,{className:"h-5 w-5"}),badge:"Why Flink",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Micro-batch latency was too high."})," Spark Streaming (DStream API) processes events in X-second batches — even at 1-second batch interval, end-to-end latency is 1-2 seconds. For real-time fraud detection (sub-100ms required) or LHC triggers (sub-microsecond required), Spark is unusable. Flink's true streaming processes one event at a time, achieving sub-millisecond latency. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," 100-1000× lower latency for latency-sensitive workloads."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: No true event-time semantics."})," Spark Streaming's processing-time windows aligned to wall-clock, not event timestamps. Out-of-order events (common in Kafka) landed in wrong windows. Flink's watermark mechanism (max event_ts seen minus tolerance) is the academic state-of-the-art for out-of-order processing — published in the Google Dataflow paper (Akidau et al. 2015). ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," accurate analytics on real-world Kafka topics where events arrive out-of-order."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: State was an afterthought."})," Spark Streaming's stateful ops (updateStateByKey, mapGroupsWithState) were bolted-on; state grew unbounded, no RocksDB backend, no incremental checkpoints. Flink designed state as a first-class citizen: pluggable backends (HashMap for speed, RocksDB for scale), incremental checkpoints (only delta state uploaded), state TTL for auto-expiry. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Alibaba runs 10TB+ state on Singles' Day; Netflix runs 500GB for playback analytics — neither is possible on Spark."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: Exactly-once was bolted-on."})," Spark Streaming's exactly-once (Structured Streaming) uses write-ahead logs per batch — works but adds 100ms+ per batch. Flink's two-phase commit on checkpoint barrier is a unified mechanism: barrier flows through DAG, all operators ACK, then commit. No per-batch WAL overhead. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," exactly-once at 1.7B events/sec (Alibaba Singles' Day 2024) — Spark cannot match this throughput with exactly-once enabled."]})]})}),(0,t.jsx)(n.SectionCard,{title:"Truly unique Flink features (vs Spark Streaming + Kafka Streams)",description:"Flink has four features that are genuinely unique — not marketing fluff, but structural differentiators that no other streaming engine has yet matched.",icon:(0,t.jsx)(w.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. True streaming (sub-ms latency)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["One event at a time, no batch overhead. ",(0,t.jsx)("strong",{children:"Spark Streaming cannot go below 100ms batch interval; Kafka Streams is comparable but lacks Flink's state management."})," Flink wins on latency-sensitive workloads."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Native CEP library"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Pattern API (begin/followedBy/or/not/times/within) for complex event detection. ",(0,t.jsx)("strong",{children:"Spark + Kafka Streams have no equivalent — you write custom code."})," Used by LHC for trigger pattern matching."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Pluggable state backends"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["HashMap (in-memory, fast) vs RocksDB (disk, TB-scale) — choose per job. ",(0,t.jsx)("strong",{children:"Spark only has RocksDB; Kafka Streams is RocksDB-only."})," Flink scales from 1KB to 10TB+ state per TaskManager."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Two-phase commit on checkpoint"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Unified exactly-once: barrier flows through DAG, all operators ACK, commit atomically. ",(0,t.jsx)("strong",{children:"Spark uses per-batch WALs (slower); Kafka Streams uses transactions (limited to Kafka)."})," Flink's 2PC works across Kafka + Iceberg + Sinks."]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"2 scientific streaming examples — Bronze via Flink",description:"Two production-style scientific streaming examples showing Flink in action. Each is a clickable card opening a lazy popup with: scenario brief (dataset/scale/why), dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight. All examples show how Flink enables the Bronze→Silver→Gold medallion for science.",icon:(0,t.jsx)(b.Database,{className:"h-5 w-5"}),badge:"2 examples × 5 langs",children:(0,t.jsx)(h.DatasetCards,{examples:p.FLINK_SCIENCE_EXAMPLES,intro:"Real-time genomics variant calling (10k variants/sec from Illumina NovaSeq → Bronze Iceberg) + LHC trigger pipeline (40MHz collisions → Flink CEP → Bronze). Each card has Scala/Rust/Go/Elixir/Zig code with Flink's exactly-once + watermark + CEP differentiators."})}),(0,t.jsx)(n.SectionCard,{title:"Computational tooling — the Flink ecosystem",description:"Flink's ecosystem includes connectors to most streaming sources/sinks, libraries for CEP + ML + Gelly (graph), and integrations with all major lakehouse formats (Iceberg/Delta/Hudi). Deployment options range from standalone clusters to Kubernetes to managed cloud services.",icon:(0,t.jsx)(N.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(v.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Connectors (sources + sinks)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Kafka"})," — primary source/sink (exactly-once via transactions)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Iceberg"})," — Bronze/Silver/Gold sink (2PC on checkpoint)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Delta Lake"})," — Delta sink (Databricks ecosystem)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Hudi"})," — Hudi MOR sink (CDC upserts)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Kinesis"})," — AWS Kinesis source/sink"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Pulsar"})," — Pulsar source/sink (streaming-native)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"JDBC"})," — Postgres/MySQL/Oracle sinks (exactly-once via XA)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Cassandra + Elasticsearch"})," — denormalized sinks"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(E.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Libraries + deployments"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Flink CEP"})," — Complex Event Processing (Pattern API)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Flink ML"})," — online learning + model serving"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Gelly"})," — graph processing (PageRank, triangle counting)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Stateful Functions"})," — serverless stateful (event-driven)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Standalone"})," — cluster on bare metal / VMs"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Kubernetes"})," — Native K8s operator (active-passive JM)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Amazon Kinesis Analytics"})," — managed Flink on AWS"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Google Cloud Dataflow"})," — managed Flink (Dataflow runner)"]})]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"Research + production case studies",description:"The papers and production deployments that defined Flink + true streaming. The Google Dataflow paper (Akidau 2015) is the academic foundation; Alibaba + Uber + Netflix engineering blogs document production scale.",icon:(0,t.jsx)(j.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Akidau et al. 2015 (VLDB):"}),' "The Dataflow Model: A Practical Approach to Balancing Correctness, Latency, and Cost in Massive-Scale, Unbounded, Out-of-Order Data Processing." Google\'s paper on event-time processing, watermarks, and windowing. Flink\'s watermark implementation directly follows this paper. Argued that batching is a special case of streaming (the "Kappa architecture" thesis) — directly inspired Jay Kreps\' Kappa architecture essay.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Carbone et al. 2015 (Apache Flink white paper):"})," \"Apache Flink: Stream and Batch Processing in a Single Engine.\" Described Flink's unified DataStream API (streaming + batch as special cases), incremental checkpoints (only delta state uploaded), and asynchronous checkpoint barriers (no alignment for slow operators). The academic foundation for Flink's runtime design."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Alibaba Singles' Day Production Case (2018-2024):"}),' Alibaba migrated its real-time recommendation + fraud detection from Spark Streaming to Flink in 2017. Singles\' Day 2024 processed 1.7 billion events/sec at peak via Flink on 10TB+ state (RocksDB-backed). Their blog post "Apache Flink at Alibaba: 5 Years of Evolution" is the canonical reference for production-scale Flink.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Uber Production Case (2017):"}),' "Introducing Apache Flink at Uber." Replaced their internal streaming framework (formerly Samza-based) with Flink to handle 100B+ events/day. Use cases include real-time ETL (Kafka → Iceberg Bronze), fraud detection (CEP for transaction patterns), and dynamic pricing (per-region aggregations). Their migration blog is a must-read for any team moving from Spark Streaming to Flink.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Netflix Production Case (2020):"}),' "Apache Flink at Netflix: Real-time Playback Analytics." Netflix uses Flink for real-time viewing analytics — 500GB of RocksDB state per TaskManager tracks per-user playback position, buffering events for replay. Sub-second latency from click to dashboard update. Bronze Iceberg sink via exactly-once for downstream batch analytics.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Flink CEP for LHC Triggers (CERN 2023):"})," CERN prototyped Flink CEP for L1 trigger pattern matching — high-pT muon followed by missing ET within 100 nanoseconds. While L1 triggers are still custom hardware (FPGAs), Flink CEP simulates the trigger logic for offline validation and trigger-efficiency studies. Bronze Iceberg stores trigger decisions for physics analysis."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Apache Flink 2.0 (2025):"})," Major release with adaptive batch execution (batches converted from streaming when latency allows), native Kubernetes operator, and the new FLIP-261 Async I/O redesign. Closes the gap with Spark Structured Streaming for hybrid batch+streaming use cases."]})]})}),(0,t.jsx)(n.SectionCard,{title:"My deeper thought: Flink IS the streaming WAL for the lakehouse",description:"The unifying view: Flink's checkpoint barriers are structurally a write-ahead log for the entire streaming DAG. Each checkpoint is a log entry; the state backend is the materialised view; the sink commits are the WAL apply step. Flink's 'innovation' is recognising that database WAL semantics apply to distributed streaming.",icon:(0,t.jsx)(A.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Flink's checkpoint IS a distributed write-ahead log."})," Every database engine since the 1970s uses a WAL: writes go to an append-only log first, then get checkpointed to immutable storage. Flink's checkpoint barriers do exactly this — the barrier flows through the DAG, each operator stages its state, when all ACK, the JobManager commits. The state backend is the materialised view; the checkpoint is the WAL entry; the sink commit is the apply step. ",(0,t.jsx)("strong",{children:"PostgreSQL does this with WAL + MVCC; Kafka does it with log offsets; Flink does it with checkpoint barriers across the DAG."}),' The "innovation" is recognising that WAL semantics generalise to distributed streaming — every operator gets durable, replayable state.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Watermarks ARE monotonic timestamps with bounded slack."})," The Google Dataflow paper formalised watermarks as: ",(0,t.jsx)("code",{className:"font-mono",children:"watermark = max(event_ts seen) - tolerance"}),'. This is structurally identical to multi-version concurrency control (MVCC) in databases — the watermark is the "low-water mark" of events that may still arrive. Events older than the watermark are "late" (analogous to "aborted transactions" in MVCC). The watermark advances monotonically because event_ts advances monotonically (modulo out-of-order tolerance). ',(0,t.jsx)("strong",{children:"This is the same pattern as Bitcoin's median-time-past (MTP) for block timestamps."})]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"State backends ARE materialised views of the event stream."})," In database terms, Flink's stateful operators maintain materialised views of the event stream — per-key running aggregates, joins, CEP matches. The RocksDB state backend IS the materialised view storage; the checkpoint IS the materialised view refresh. This is structurally identical to PostgreSQL's materialised views + refresh, or dbt's incremental models — but applied to unbounded streams. ",(0,t.jsx)("strong",{children:'The "innovation" is incremental checkpointing (only delta state uploaded) — same as PostgreSQL\'s logical replication (only WAL entries sent).'})]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Exactly-once IS two-phase commit (2PC)."})," Flink's exactly-once is structurally the classic 2PC protocol from distributed databases (Gray 1978): (1) coordinator sends PREPARE; (2) participants vote YES/NO; (3) if all YES, coordinator sends COMMIT; (4) participants apply + ACK. Flink's barrier is the PREPARE message; operator ACK is the YES vote; checkpoint commit is the COMMIT message. ",(0,t.jsx)("strong",{children:'The "innovation" is the barrier flowing through the DAG as a control message embedded in the data stream'})," — same as TCP's urgent pointer or RDMA's completion queue entries. Classic 2PC + flow-based control plane."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Flink IS to streaming what PostgreSQL was to OLTP."})," Before PostgreSQL, every database had its own WAL + MVCC + query engine tightly coupled. PostgreSQL's WAL + MVCC + ACID on shared storage became the reference implementation that everyone forked (Redshift, Greenplum, CockroachDB, YugabyteDB). Flink is doing the same for streaming — its DataStream API + checkpoint + state backend pattern is being reimplemented by Kafka Streams (transactions + EOS), Spark Structured Streaming (write-ahead logs), and Pulsar Functions. ",(0,t.jsx)("strong",{children:"The pattern is the standard; the implementations are interchangeable."}),' This is what "true streaming" actually means.']})]})}),(0,t.jsx)(n.SectionCard,{title:"Related Elegant Code — the math that walks across disciplines",description:"This page's math appears in unexpected places. The Elegant Code cards show the same equation in 3+ sciences — click to explore the collision.",icon:(0,t.jsx)(w.Sparkles,{className:"h-5 w-5"}),badge:"Cross-domain",children:(0,t.jsx)("div",{className:"grid md:grid-cols-1 gap-3",children:(0,t.jsxs)(a.default,{href:(0,g.hrefFor)("elegant-code"),className:"group flex items-start gap-3 rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary",children:"25"}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-medium group-hover:text-primary transition-colors",children:"Count-Min Sketch"}),(0,t.jsx)("p",{className:"text-[10px] font-mono text-muted-foreground mt-0.5",children:"ê_i = min_j count[j][h_j(i)]"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1 leading-relaxed",children:"Flink uses Count-Min Sketch for approximate aggregations on unbounded streams — same algorithm as Spark top-K and genome k-mer counting."})]})]})})}),(0,t.jsxs)(k.DeeperThoughtSection,{pageTitle:"Flink",children:[(0,t.jsx)(k.DeeperThought,{title:"Flink IS event-time processing — and it's the right abstraction",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"Flink's event-time processing (using the event's timestamp, not the processing time) IS the correct abstraction for streaming. If a Kafka message was produced at 10:00 but processed at 10:05, the 5-minute delay should NOT affect the computation. Event-time + watermarks handle this correctly: process the event AS IF it arrived at 10:00. Processing-time would produce wrong results when backpressure delays messages. Event-time IS to streaming what ACID is to databases — a correctness guarantee."})}),(0,t.jsx)(k.DeeperThought,{title:"Flink's checkpoint IS Chandy-Lamport distributed snapshots — and it's the right algorithm",connectedTo:"ADR-013 (Delta Lake)",children:(0,t.jsx)("p",{children:"Flink's checkpointing mechanism (barrier injection + async snapshot) IS the Chandy-Lamport distributed snapshot algorithm (1985). The barrier IS the marker that separates pre-snapshot from post-snapshot state. Each operator snapshots its state when it sees the barrier. This gives exactly-once semantics WITHOUT pausing the pipeline. The math (distributed snapshots) IS 40 years old; the implementation (Flink) IS modern. The algorithm stays; the framework evolves."})}),(0,t.jsx)(k.DeeperThought,{title:"Flink's watermark IS the truth about time — and it's a trade-off",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"Watermarks tell Flink: 'I believe all events with timestamp < T have arrived.' This IS a trade-off: high watermark = low latency but risk of late events (wrong results); low watermark = correct results but high latency (old data). The watermark IS the same trade-off as CAP theorem's consistency vs availability — just for time instead of distributed state. Understanding watermarks IS understanding the fundamental tension in stream processing: you can't have both perfect correctness and zero latency."})}),(0,t.jsx)(k.DeeperThought,{title:"Flink state IS a key-value store — and it's the right model",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"Flink's managed state (ValueState, ListState, MapState) IS a key-value store embedded in the operator. The state IS local (no network calls), versioned (checkpointed), and queryable (QueryableState). This IS the SAME pattern as a database's buffer pool: local state for fast access, persisted for durability. The difference: Flink state is per-key (sharded by partition), while a database buffer pool is per-node. The pattern (local state + checkpoint) IS the same."})}),(0,t.jsx)(k.DeeperThought,{title:"Flink vs Spark streaming IS micro-batch vs continuous — and continuous wins for low latency",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"Spark Structured Streaming processes data in micro-batches (collect 100ms of data → process → commit). Flink processes continuously (event-by-event). For latency-sensitive workloads (fraud detection, real-time alerting), continuous processing IS necessary — a 100ms batch delay can miss a fraud event. For throughput-sensitive workloads (ETL, aggregation), micro-batch IS fine. The trade-off (latency vs throughput) IS the same as TCP's Nagle algorithm (small packets = low latency, large packets = high throughput). Flink IS TCP_NODELAY; Spark IS Nagle."})})]}),(0,t.jsx)(m.RelatedTopics,{topics:[{id:"streaming",reason:"Streaming overview — Flink vs Spark Streaming vs Kafka Streams"},{id:"kafka",reason:"Apache Kafka — primary source/sink for Flink pipelines"},{id:"iceberg",reason:"Apache Iceberg — Bronze tier sink (exactly-once via checkpoint)"},{id:"spark-streaming",reason:"Spark Structured Streaming — sibling streaming engine (micro-batch)"},{id:"pulsar",reason:"Apache Pulsar — alternative streaming source for Flink"},{id:"kafka-connect",reason:"Kafka Connect — CDC ingestion feeding Flink"},{id:"schema-registry",reason:"Schema Registry — Avro schema evolution for Flink sources"},{id:"modern-big-data",reason:"Modern Big Data page — Flink in the broader lakehouse stack"}]}),(0,t.jsx)(o.ResearchDemo,{pageId:"flink"}),(0,t.jsx)(l.TrendAnticipation,{pageId:"flink"}),(0,t.jsx)(i.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"streaming",reason:"Streaming overview — Flink vs Spark Streaming vs Kafka Streams"},{id:"kafka",reason:"Apache Kafka — primary source/sink for Flink pipelines"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,g.hrefFor)("streaming"),className:"text-sm text-primary hover:underline",children:"→ Streaming overview (Kappa architecture)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,g.hrefFor)("kafka"),className:"text-sm text-primary hover:underline",children:"→ Apache Kafka (primary source/sink)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,g.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (Bronze tier sink)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,g.hrefFor)("spark-streaming"),className:"text-sm text-primary hover:underline",children:"→ Spark Structured Streaming (sibling)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,g.hrefFor)("pulsar"),className:"text-sm text-primary hover:underline",children:"→ Apache Pulsar (segmented alternative)"})]})]})}e.s(["FlinkPage",()=>K])}]);