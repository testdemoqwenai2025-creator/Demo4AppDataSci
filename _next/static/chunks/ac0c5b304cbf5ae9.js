(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,402595,e=>{"use strict";var t=e.i(843476),a=e.i(522016),r=e.i(271645),s=e.i(846932),i=e.i(862824),n=e.i(342046),o=e.i(921371),c=e.i(580296),l=e.i(732576),d=e.i(716675),m=e.i(59938),p=e.i(158960),u=e.i(372810),h=e.i(901752),g=e.i(487486),f=e.i(332017),S=e.i(852008),k=e.i(39312),b=e.i(658041),x=e.i(21218),w=e.i(966992),y=e.i(828579),v=e.i(283086),_=e.i(227516),j=e.i(691385),T=e.i(178583),N=e.i(25652),A=e.i(618393),D=e.i(727927);let I=`# ============================================================
# Spark Structured Streaming — PySpark micro-batch pipeline
# Reads from Kafka, processes in 5-minute micro-batches,
# writes to Bronze Iceberg. Simpler semantics than Flink.
# ============================================================

from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col, from_json, schema_of_json, window,
    avg, max as max_, count, sum as sum_,
    current_timestamp, expr
)
from pyspark.sql.types import (
    StructType, StructField, StringType, DoubleType,
    LongType, TimestampType, IntegerType
)

spark = SparkSession.builder \\
    .config("spark.sql.catalog.iceberg", "org.apache.iceberg.spark.SparkCatalog") \\
    .config("spark.sql.catalog.iceberg.warehouse", "s3://oeis-iceberg/") \\
    .getOrCreate()

# Source: Kafka topic with new OEIS submissions (JSON)
oeis_schema = StructType([
    StructField("seq_id", StringType()),
    StructField("terms", ArrayType(LongType())),
    StructField("author", StringType()),
    StructField("submitted_ts", TimestampType()),
    StructField("keywords", ArrayType(StringType())),
])

raw_stream = (spark
    .readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", "kafka:9092")
    .option("subscribe", "oeis.submissions")
    .option("startingOffsets", "earliest")
    .option("failOnDataLoss", "false")  # tolerate 24h+ gap
    .load()
)

# Parse JSON + apply watermark (drop late submissions > 1h)
parsed = (raw_stream
    .selectExpr("CAST(value AS STRING) as json")
    .select(from_json(col("json"), oeis_schema).alias("data"))
    .select("data.*")
    .withWatermark("submitted_ts", "1 hour")  # late tolerance
)

# Define UDF: compute sequence growth rate (linear regression on log terms)
from pyspark.sql.functions import udf
import math

@udf(DoubleType())
def compute_growth_rate(terms):
    if not terms or len(terms) < 5:
        return 0.0
    log_terms = [math.log(max(1, t)) for t in terms]
    n = len(log_terms)
    sum_x = sum(range(1, n + 1))
    sum_y = sum(log_terms)
    sum_xy = sum((i + 1) * log_terms[i] for i in range(n))
    sum_x2 = sum((i + 1) ** 2 for i in range(n))
    denom = n * sum_x2 - sum_x * sum_x
    return (n * sum_xy - sum_x * sum_y) / denom if denom != 0 else 0.0

# Enrich: compute sequence properties
enriched = (parsed
    .withColumn("n_terms", expr("size(terms)"))
    .withColumn("growth_rate", compute_growth_rate(col("terms")))
    .withColumn("is_exponential", col("growth_rate") > 0.5)
    .withColumn("is_polynomial", (col("growth_rate") > 0) & (col("growth_rate") < 0.5))
)

# Sink: Bronze Iceberg (micro-batch every 5 minutes, Append mode)
query = (enriched
    .writeStream
    .format("iceberg")
    .outputMode("append")  # append only — no updates (simpler)
    .trigger(processingTime="5 minutes")  # micro-batch cadence
    .option("checkpointLocation", "s3://cp/oeis-bronze/")
    .toTable("iceberg.bronze.oeis_sequences")
)

query.awaitTermination()`,E=`-- ============================================================
-- Spark Structured Streaming — Continuous mode (low-latency)
-- Continuous mode (experimental): one record at a time, ~1ms latency
-- vs micro-batch's 100ms+. Limited source/sink support.
-- ============================================================

-- Continuous mode is suitable for low-latency use cases where the
-- ~100ms micro-batch overhead is unacceptable. Trade-off:
--   - Micro-batch: simpler, better throughput, supports most ops
--   - Continuous: lower latency (~1ms), limited ops, smaller batches

-- Enable continuous processing (Scala/Java only — PySpark not supported)
SET 'spark.sql.streaming.continuous.enabled' = 'true';
SET 'spark.sql.streaming.continuous.executorRateLimit' = '1000';  -- 1k records/sec per executor

-- Continuous mode requires a ContinuousExecution source
-- Supported sources: Kafka (rate), rate (synthetic)
-- Unsupported sources: file (parquet/csv), socket

-- Continuous Kafka source (rate-limited to 1000 records/sec)
CREATE TABLE kafka.sensors_continuous (
  sensor_id STRING,
  metric STRING,
  value DOUBLE,
  event_ts TIMESTAMP(3),
  WATERMARK FOR event_ts AS event_ts - INTERVAL '5' SECOND
) WITH (
  'connector' = 'kafka',
  'topic' = 'sensors.airnow',
  'properties.bootstrap.servers' = 'kafka:9092',
  'format' = 'avro',
  -- Continuous mode flag (one record at a time, ~1ms latency)
  'scan.continuous.mode' = 'continuous',
  'options.rate.limit' = '1000'  -- 1k records/sec per partition
);

-- Continuous mode query (very low latency — ~1ms end-to-end)
INSERT INTO iceberg.bronze.sensor_continuous
SELECT sensor_id, metric, value, event_ts
FROM kafka.sensors_continuous
WHERE value > 50.0;  -- high readings only

-- When to use Continuous vs Micro-batch:
-- Continuous mode (1ms latency):
--   - Real-time alerting (fraud, anomalies, IoT)
--   - Interactive dashboards (sub-second update)
--   - Limited transform support (no complex stateful ops)
--
-- Micro-batch mode (100ms+ latency):
--   - Default for most pipelines (simpler, better throughput)
--   - Stateful ops (group-by, joins, windows)
--   - Most source/sink combinations supported
--   - Better fault tolerance (checkpoint on batch boundary)

-- Continuous mode limitations (Spark 3.5):
--   - Source: Kafka (rate), rate (synthetic) only
--   - Sink: Kafka, console, memory (no Iceberg sink yet)
--   - Stateful ops: limited (no mapGroupsWithState in continuous)
--   - Watermark: supported but coarser-grained`,C=`// ============================================================
// Spark Structured Streaming — stateful operations
//   1. mapGroupsWithState — keyed stateful processing
//   2. flatMapGroupsWithState — keyed stateful with multiple outputs
//   3. Group-by + aggregation — implicit state per group
// ============================================================

import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.sql.streaming.{OutputMode, Trigger, GroupState, GroupStateTimeout}
import org.apache.spark.sql.expressions.{_scala}
import org.apache.spark.sql.catalyst.encoders.row

case class SensorReading(
  sensor_id: String, metric: String, value: Double,
  region: String, event_ts: java.sql.Timestamp
)

case class SensorState(
  var n_readings: Long,
  var sum_value: Double,
  var last_value: Double,
  var anomaly_count: Long
)

// Stateful function: per-sensor running stats + anomaly detection
def sensorStateUpdater(
  sensor_id: String,
  readings: Iterator[SensorReading],
  state: GroupState[SensorState]
): Iterator[(String, Double, Long, Boolean)] = {
  // Get or init state (per sensor_id)
  var s = state.getOption.getOrElse(SensorState(0L, 0.0, 0.0, 0L))
  var is_anomaly = false

  // Process each reading in the group
  for (r <- readings) {
    val mean = if (s.n_readings > 0) s.sum_value / s.n_readings else 0.0
    val sigma = math.sqrt(math.max(0.0, (s.last_value - mean) * (s.last_value - mean)))

    // Anomaly: value > 3 sigma from running mean
    if (s.n_readings > 100 && math.abs(r.value - mean) > 3 * sigma) {
      is_anomaly = true
      s.anomaly_count += 1
    }

    s.n_readings += 1
    s.sum_value += r.value
    s.last_value = r.value
  }

  // Update state (stored in RocksDB — checkpointed)
  state.update(s)

  // Emit: (sensor_id, last_value, n_readings, is_anomaly)
  Seq((sensor_id, s.last_value, s.n_readings, is_anomaly)).iterator
}

// Apply stateful function
val spark = SparkSession.builder().getOrCreate()
val stream = spark.readStream.format("kafka")
  .option("kafka.bootstrap.servers", "kafka:9092")
  .option("subscribe", "sensors.airnow")
  .load()
  .select(from_json(col("value").cast("string"), sensorSchema).as("data"))
  .select("data.*")
  .withWatermark("event_ts", "1 minute")  // late tolerance

// Stateful aggregation (per sensor_id, with timeout)
val stateful = stream
  .groupByKey(_.sensor_id)
  .mapGroupsWithState[SensorState, (String, Double, Long, Boolean)](
    // Timeout config (state expires after 24h of inactivity)
    GroupStateTimeout.Timeout("24 hours")
  )(sensorStateUpdater)

// Sink: anomalies to alert topic, all readings to Bronze Iceberg
val alerts = stateful.filter(_._4)  // is_anomaly == true
val allReadings = stateful

alerts.writeStream.format("kafka")
  .option("topic", "alerts.sensor_anomalies")
  .trigger(Trigger.ProcessingTime("1 minute"))
  .outputMode(OutputMode.Update())  // emit only changed states
  .start()

allReadings.writeStream.format("iceberg")
  .toTable("iceberg.bronze.sensor_stateful")
  .trigger(Trigger.ProcessingTime("5 minutes"))
  .outputMode(OutputMode.Append())
  .start()`,R=`-- ============================================================
-- Spark Structured Streaming — Output modes
--   1. Append (default): emit only new rows (after watermark + window close)
--   2. Update: emit only changed rows (every batch)
--   3. Complete: emit full result table (every batch — expensive)
-- ============================================================

-- Append mode (default):
--   - Emits only NEW rows (after watermark + window close)
--   - Best for: append-only sinks (Iceberg Bronze)
--   - Latency: high (waits for watermark to advance past window end)
--   - State: bounded (only active windows)
INSERT INTO iceberg.bronze.sensor_1min_append
SELECT
  sensor_id, metric,
  window_start, window_end,
  avg(value) as avg_value, count(*) as n_readings
FROM kafka.sensors
GROUP BY
  sensor_id, metric,
  TUMBLE(event_ts, INTERVAL '1' MINUTE)
-- Wait for window to close (watermark past window_end) before emit

-- Update mode:
--   - Emits only CHANGED rows (every batch)
--   - Best for: real-time dashboards (show running aggregates)
--   - Latency: low (every batch emits changes immediately)
--   - State: unbounded (all active groups)
INSERT INTO kafka.dashboards.sensor_running
SELECT
  sensor_id, metric,
  window_start, window_end,
  avg(value) as avg_value, count(*) as n_readings
FROM kafka.sensors
GROUP BY
  sensor_id, metric,
  TUMBLE(event_ts, INTERVAL '1' MINUTE)
-- Emit immediately on every batch (no wait for window close)

-- Complete mode:
--   - Emits FULL result table (every batch — expensive)
--   - Best for: top-K queries (small result set)
--   - Latency: high (recomputes full result every batch)
--   - State: unbounded (full history per group)
INSERT INTO kafka.dashboards.top_sensors
SELECT sensor_id, sum(value) as total
FROM kafka.sensors
GROUP BY sensor_id
ORDER BY total DESC
LIMIT 100  -- top 100 sensors
-- Re-emit full top-100 every batch (changes shown as updates)

-- Output mode + sink compatibility:
-- +-----------+---------+---------+-----------+-------+---------+
-- | Sink      | Append  | Update  | Complete  | Iceberg | Kafka  |
-- +-----------+---------+---------+-----------+--------+--------+
-- | Iceberg   |  Yes    |  No*    |   No      | (any)  |  Yes   |
-- | Kafka     |  Yes    |  Yes    |   Yes     |  -     | (any)  |
-- | Console   |  Yes    |  Yes    |   Yes     |  -     |  -     |
-- | Memory    |  Yes    |  Yes    |   Yes     |  -     |  -     |
-- +-----------+---------+---------+-----------+--------+--------+
-- * Update mode requires MERGE INTO sink support (Iceberg v2)`,L=`-- ============================================================
-- Spark Structured Streaming — Watermarks + windowing
--   Watermark: max event_ts seen minus tolerance
--   Window: tumbling, sliding, session
-- ============================================================

-- Source with watermark (drop events > 5 minutes late)
CREATE TABLE kafka.sensors (
  sensor_id STRING,
  metric STRING,
  value DOUBLE,
  event_ts TIMESTAMP(3),
  -- Watermark: tolerate 5 minutes of out-of-order events
  WATERMARK FOR event_ts AS event_ts - INTERVAL '5' MINUTES
) WITH (
  'connector' = 'kafka',
  'topic' = 'sensors.airnow',
  'properties.bootstrap.servers' = 'kafka:9092',
  'format' = 'avro'
);

-- Tumbling window: 1-minute non-overlapping windows
SELECT
  sensor_id, metric,
  TUMBLE_START(event_ts, INTERVAL '1' MINUTE) as window_start,
  TUMBLE_END(event_ts, INTERVAL '1' MINUTE) as window_end,
  avg(value) as avg_value,
  count(*) as n_readings
FROM kafka.sensors
GROUP BY
  sensor_id, metric,
  TUMBLE(event_ts, INTERVAL '1' MINUTE);
-- Emits to sink when watermark passes window_end (Append mode)

-- Sliding window: 10-minute windows hopping every 5 minutes
SELECT
  sensor_id, metric,
  HOP_START(event_ts, INTERVAL '5' MINUTE, INTERVAL '10' MINUTE) as win_start,
  HOP_END(event_ts, INTERVAL '5' MINUTE, INTERVAL '10' MINUTE) as win_end,
  avg(value) as sliding_avg
FROM kafka.sensors
GROUP BY
  sensor_id, metric,
  HOP(event_ts, INTERVAL '5' MINUTE, INTERVAL '10' MINUTE);
-- Overlapping windows — same event can be in 2 windows

-- Session window: dynamic windows by gap (Spark 3.4+)
SELECT
  sensor_id, metric,
  SESSION_START(event_ts, INTERVAL '30' MINUTE) as session_start,
  SESSION_END(event_ts, INTERVAL '30' MINUTE) as session_end,
  count(*) as n_events_in_session
FROM kafka.sensors
GROUP BY
  sensor_id, metric,
  SESSION(event_ts, INTERVAL '30' MINUTE);
-- Dynamic windows — close when gap > 30 minutes between events

-- Late events: routed via withWatermark + allowed lateness
-- By default, late events (older than watermark) are dropped
-- Use flatMapGroupsWithState to capture late events to a side output

-- Watermark semantics:
--   1. Watermark = max(event_ts seen) - tolerance
--   2. Monotonically increasing (never goes backwards)
--   3. Window emits to sink when watermark > window_end
--   4. Late events (event_ts < watermark) dropped or side-output
--   5. State TTL: state for old windows expires (cleanup)`,B=`# ============================================================
# Spark Structured Streaming micro-batch simulation — Pyodide
# Simulates: Kafka source → Spark micro-batch (5-min) → Bronze Iceberg
# Shows micro-batch cadence vs continuous mode trade-off
# ============================================================

import random
from collections import defaultdict, deque

print("=== Spark Structured Streaming Micro-batch Simulation ===")
print("Kafka source → 5-minute micro-batch → Bronze Iceberg (Append mode)")
print()

# Simulate Kafka topic with sensor events (5 minutes of data)
random.seed(42)
n_sensors = 100
metrics = ['pm25', 'o3', 'temp', 'humidity']

# Generate 5000 events spread across 5 minutes (1k events/min)
all_events = []
for ts in range(300):  # 5 minutes = 300 seconds
    for _ in range(16):  # 16 events/sec
        event = {
            'sensor_id': f'sensor-{random.randint(1, n_sensors):03d}',
            'metric': random.choice(metrics),
            'value': max(0, random.gauss(15, 10)),
            'event_ts': ts,  # seconds since stream start
        }
        all_events.append(event)

# Spark micro-batch: process every 1 minute (60s of data per batch)
# (Real Spark: 5-minute batches — using 1 minute for demo clarity)
batch_interval = 60  # 1 minute per batch
checkpoint_id = 0
bronze_committed = []
state = defaultdict(lambda: {'count': 0, 'sum': 0.0})  # per-(sensor, metric) state

# Watermark tracker (tolerance 5 seconds)
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
    def is_late(self, event_ts):
        return event_ts < self.watermark()

watermark = WatermarkTracker(tolerance=5)

# Run 5 micro-batches (1 minute each)
for batch_idx in range(5):
    batch_start = batch_idx * batch_interval
    batch_end = batch_start + batch_interval

    # Filter events for this batch
    batch_events = [e for e in all_events if batch_start <= e['event_ts'] < batch_end]

    # Update watermark with batch events
    for e in batch_events:
        watermark.update(e['event_ts'])
        if watermark.is_late(e['event_ts']):
            pass  # would be dropped in real Spark

    # Stateful aggregation: per (sensor_id, metric) running stats
    for e in batch_events:
        key = (e['sensor_id'], e['metric'])
        state[key]['count'] += 1
        state[key]['sum'] += e['value']

    # Compute window aggregates (1-minute tumbling windows)
    window_aggs = defaultdict(lambda: {'count': 0, 'sum': 0.0})
    for e in batch_events:
        window_id = e['event_ts'] // 60
        key = (e['sensor_id'], e['metric'], window_id)
        window_aggs[key]['count'] += 1
        window_aggs[key]['sum'] += e['value']

    # Append mode: emit only closed windows (watermark > window_end)
    closed_windows = []
    for (sensor_id, metric, window_id), stats in window_aggs.items():
        window_end = (window_id + 1) * 60
        if watermark.watermark() > window_end:
            closed_windows.append({
                'sensor_id': sensor_id,
                'metric': metric,
                'window_id': window_id,
                'avg_value': stats['sum'] / stats['count'],
                'n_readings': stats['count'],
            })

    # Commit batch (atomic — checkpoint)
    checkpoint_id += 1
    bronze_committed.extend(closed_windows)

    print(f"Batch {batch_idx + 1}:")
    print(f"  Events processed: {len(batch_events):,}")
    print(f"  Watermark:        {watermark.watermark()}s")
    print(f"  Closed windows:   {len(closed_windows)}")
    print(f"  Bronze committed: {len(closed_windows)} rows (Append mode)")
    print()

print(f"=== Summary ===")
print(f"Total events:              {len(all_events):,}")
print(f"Micro-batches:             {checkpoint_id} (every 60s)")
print(f"Bronze committed:          {len(bronze_committed):,} rows")
print(f"State entries:             {len(state)} (per sensor+metric)")
print(f"Watermark tolerance:       5 seconds")
print()
print(f"{'Mode':<15} | {'Latency':>10} | {'Throughput':>14} | {'Stateful ops':>15}")
print("-" * 65)
print(f"{'Micro-batch':<15} | {'100ms+':>10} | {'high':>14} | {'full support':>15}")
print(f"{'Continuous':<15} | {'~1ms':>10} | {'lower':>14} | {'limited':>15}")
print()
print("Micro-batch mode advantages:")
print("  - Simpler semantics (batch boundary = checkpoint)")
print("  - Better throughput (batched I/O)")
print("  - Full stateful op support (mapGroupsWithState, joins)")
print("  - Most source/sink combinations supported")
print()
print("Continuous mode advantages:")
print("  - Lower latency (~1ms vs 100ms+)")
print("  - Real-time alerting use cases")
print("  - Trade-off: limited ops, smaller batches")
print()
print("Output modes:")
print("  - Append (default): wait for window close, then emit (high latency)")
print("  - Update: emit immediately on every batch (low latency, dashboards)")
print("  - Complete: re-emit full result every batch (small result sets, top-K)")`;function M(){let[e,a]=(0,r.useState)("driver"),i={driver:{label:"Driver (query orchestrator)",desc:"Runs the streaming query logic. Tracks watermark, schedules micro-batches, manages checkpoints to S3/HDFS.",level:0},executor:{label:"Executor × N (workers)",desc:"JVM workers. Hold state in RocksDB. Run micro-batch tasks in parallel (Spark partitions).",level:1},source:{label:"Source (Kafka/file/rate)",desc:"Kafka source: reads from offsets stored in checkpoint. File source: watches directory. Rate: synthetic.",level:2},micro_batch:{label:"Micro-batch (1-N sec)",desc:"Process events between batch boundaries. Each batch is a mini-Spark job with a checkpoint boundary.",level:3},stateful_op:{label:"Stateful operator (RocksDB)",desc:"mapGroupsWithState, groupBy aggregation. State stored per-key in RocksDB on executor. Checkpointed.",level:3},watermark:{label:"Watermark (event-time)",desc:"max(event_ts seen) - tolerance. Determines when windows close + emit to sink (Append mode).",level:4},sink:{label:"Sink (Iceberg/Kafka)",desc:"Bronze Iceberg sink (Append mode, atomic per batch). Kafka sink (Update mode for real-time dashboards).",level:4},checkpoint:{label:"Checkpoint (S3/HDFS)",desc:"Driver writes checkpoint metadata + state snapshot. Recovery: restart from last checkpoint (no dupes).",level:4}},n={driver:{x:200,y:30},checkpoint:{x:60,y:30},executor:{x:200,y:90},source:{x:60,y:150},micro_batch:{x:200,y:150},stateful_op:{x:340,y:150},watermark:{x:60,y:210},sink:{x:340,y:210}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(x.Activity,{className:"h-3.5 w-3.5 text-primary"}),"Spark Streaming architecture — micro-batch on Spark DAG + RocksDB state"]})}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsxs)("svg",{viewBox:"0 0 400 250",className:"w-full h-auto",children:[[["driver","executor"],["executor","source"],["executor","micro_batch"],["micro_batch","stateful_op"],["stateful_op","watermark"],["stateful_op","sink"],["driver","checkpoint"],["checkpoint","stateful_op"]].map(([e,a],r)=>{let s=n[e],i=n[a];return(0,t.jsx)("line",{x1:s.x,y1:s.y+12,x2:i.x,y2:i.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow-spark-streaming)"},r)}),Object.entries(n).map(([r,n])=>{let o=e===r,c=i[r],l=0===c.level?"var(--chart-3)":1===c.level?"var(--chart-2)":2===c.level?"var(--chart-1)":3===c.level?"var(--chart-4)":"var(--muted-foreground)";return(0,t.jsxs)(s.motion.g,{onMouseEnter:()=>a(r),onMouseLeave:()=>a(null),animate:{scale:o?1.05:1},style:{cursor:"pointer"},children:[(0,t.jsx)("rect",{x:n.x-60,y:n.y-10,width:"120",height:"22",rx:"3",fill:o?l+"30":"var(--background)",stroke:l,strokeWidth:o?1.5:.8}),(0,t.jsx)("text",{x:n.x,y:n.y+4,textAnchor:"middle",fontSize:"6.5",fill:o?l:"var(--foreground)",fontWeight:o?"bold":"normal",children:c.label})]},r)}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"arrow-spark-streaming",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,t.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:i[e].label}),(0,t.jsx)("p",{className:"text-muted-foreground",children:i[e].desc})]}),!e&&(0,t.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node to see its role — micro-batch is the default; continuous mode is the experimental low-latency alternative."})]})]})}function P(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(y.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Spark Streaming vs Flink vs Kafka Streams — micro-batch vs true streaming"]})}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/30",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Spark Structured Streaming"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Apache Flink"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Kafka Streams"})]})}),(0,t.jsx)("tbody",{children:[{feature:"Origin",spark:"UC Berkeley AMPLab 2013",flink:"Berlin Univ 2009",kstreams:"LinkedIn 2016"},{feature:"Processing model",spark:"Micro-batch (X-sec batches, default)",flink:"True streaming (one event at a time)",kstreams:"True streaming (per-record)"},{feature:"Latency",spark:"100ms-seconds (batch-bound)",flink:"Sub-millisecond",kstreams:"Sub-millisecond"},{feature:"Continuous mode",spark:"Yes (experimental, ~1ms)",flink:"Native (always continuous)",kstreams:"Native"},{feature:"State backends",spark:"RocksDB only",flink:"HashMap + RocksDB",kstreams:"RocksDB (per-store)"},{feature:"Exactly-once",spark:"Yes (write-ahead logs per batch)",flink:"Yes (2-phase commit on checkpoint)",kstreams:"Yes (transactions + EOS)"},{feature:"Event-time watermarks",spark:"Via withWatermark()",flink:"Native, configurable per-source",kstreams:"Via punctuations (limited)"},{feature:"Stateful ops",spark:"mapGroupsWithState + flatMapGroupsWithState",flink:"ProcessFunction (full control)",kstreams:"Transformer + state stores"},{feature:"Output modes",spark:"Append / Update / Complete",flink:"Append / Update / Retract",kstreams:"Append only"},{feature:"Window types",spark:"Tumbling / Sliding / Session",flink:"Tumbling / Sliding / Session / Global",kstreams:"Tumbling / Hopping / Session"},{feature:"Best fit",spark:"Batch + streaming unified (simpler)",flink:"Low-latency + complex state + CEP",kstreams:"Microservices needing streaming"}].map((e,a)=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,t.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.spark}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.flink}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.kstreams})]},a))})]})})]})}let F=[{label:"Origin",value:"Berkeley AMPLab 2013",hint:"Spark Streaming (DStream API) shipped 2013; restructured to Structured Streaming in Spark 2.0 (2016) with unified batch + streaming API.",deltaTone:"flat"},{label:"Processing model",value:"Micro-batch (default)",hint:"Default: X-second micro-batches (100ms+ latency, simpler semantics). Continuous mode (experimental): ~1ms latency, limited ops.",deltaTone:"up"},{label:"Adoption",value:"All Databricks customers",hint:"Spark is the dominant batch engine; Structured Streaming inherits Spark's reach. Used by Netflix (4T/day), Uber (100B events/day), all Databricks customers.",deltaTone:"up"},{label:"Unified batch+stream",value:"Same DataFrame API",hint:"Batch + streaming use the same DataFrame/SQL API — write once, switch between batch and streaming by changing read vs readStream. Major DX advantage over Flink.",deltaTone:"up"}];function U(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(i.PageHeader,{eyebrow:"Spark Structured Streaming · micro-batch · continuous · watermarks",title:"Spark Structured Streaming — micro-batch + continuous streaming",description:"Spark Structured Streaming (since Spark 2.0, 2016) is the streaming layer of Apache Spark — built on the same DataFrame API as batch Spark, so the same code runs as batch (read) or streaming (readStream). Default processing model is micro-batch (X-second batches, 100ms+ latency, simpler semantics, full stateful op support); Continuous mode (experimental, ~1ms latency) is the low-latency alternative for real-time alerting. Spark wins on developer experience: unified batch+streaming, batch ecosystem, simpler operational model. Loses to Flink on pure streaming latency + CEP complexity. Used by Netflix (4T/day), Uber (100B events/day), and every Databricks customer.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(x.Activity,{className:"h-3 w-3"})," Micro-batch"]}),(0,t.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(k.Zap,{className:"h-3 w-3"})," Continuous"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:F.map(e=>(0,t.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(i.SectionCard,{title:"Spark Streaming architecture — micro-batch on Spark DAG",description:"Spark Structured Streaming runs on the Spark runtime — Driver orchestrates the streaming query as a series of micro-batch Spark jobs. Each batch: read from Kafka offsets, process in parallel Spark partitions, write to sink, checkpoint state to S3/HDFS. Stateful operators (mapGroupsWithState, groupBy) store per-key state in RocksDB on executors. Checkpoint boundary = atomic commit.",icon:(0,t.jsx)(x.Activity,{className:"h-5 w-5"}),badge:"architecture",children:(0,t.jsx)(M,{})}),(0,t.jsxs)(i.SectionCard,{title:"Cards — 5 sibling patterns",description:"Each card follows the BigDataCard pattern: explainer + 'Show code ↓' toggle. Code is collapsed by default to reduce visual overwhelm on a code-heavy page.",icon:(0,t.jsx)(S.Layers,{className:"h-5 w-5"}),contentClassName:"p-4 md:p-5 space-y-4",children:[(0,t.jsx)(l.CodeCard,{title:"1. PySpark pipeline — Kafka source → Iceberg Bronze sink",description:"The canonical Structured Streaming pipeline: Kafka source → JSON parsing → watermark + stateful enrichment (UDF for sequence growth rate) → Bronze Iceberg sink in Append mode with 5-minute micro-batch trigger. Same DataFrame API works for both batch (read) and streaming (readStream) — major DX advantage.",icon:(0,t.jsx)(j.Atom,{className:"h-5 w-5"}),badge:"PySpark",code:I,language:"python",filename:"spark_streaming_pyspark.py",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94],defaultCollapsed:!0,explainer:"This PySpark pipeline is the canonical Structured Streaming example: Kafka source → JSON parsing → watermark + stateful enrichment (UDF for sequence growth rate) → Bronze Iceberg sink in Append mode with a 5-minute micro-batch trigger. The same DataFrame API works for both batch (read) and streaming (readStream) — a major DX advantage."}),(0,t.jsx)(l.CodeCard,{title:"2. Continuous mode — experimental low-latency (~1ms)",description:"Continuous mode (Spark 3.0+) is the low-latency alternative to micro-batch — processes one record at a time, achieving ~1ms latency (vs micro-batch's 100ms+). Trade-off: limited source/sink support (Kafka + rate sources only, no Iceberg sink yet), limited stateful ops (no mapGroupsWithState). Use cases: real-time alerting, interactive dashboards.",icon:(0,t.jsx)(k.Zap,{className:"h-5 w-5"}),badge:"Continuous mode",code:E,language:"sql",filename:"spark_continuous_mode.sql",highlight:[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55],defaultCollapsed:!0,explainer:"This SQL configures Spark's Continuous mode (Spark 3.0+) — the low-latency alternative to micro-batch that processes one record at a time for ~1ms latency (vs micro-batch's 100ms+). Trade-off: limited source/sink support (Kafka + rate sources only, no Iceberg sink yet) and limited stateful ops (no mapGroupsWithState)."}),(0,t.jsx)(l.CodeCard,{title:"3. Stateful operations — mapGroupsWithState + RocksDB",description:"Spark's stateful operators (mapGroupsWithState, flatMapGroupsWithState) allow per-key stateful processing with state stored in RocksDB on executors. State is checkpointed on batch boundary (atomic). Use cases: per-sensor anomaly detection (running mean + 3 sigma), session windows, per-key enrichment with external data.",icon:(0,t.jsx)(b.Database,{className:"h-5 w-5"}),badge:"Stateful ops",code:C,language:"scala",filename:"spark_stateful_ops.scala",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82],defaultCollapsed:!0,explainer:"This Scala code shows Spark's stateful operators (mapGroupsWithState, flatMapGroupsWithState) which allow per-key stateful processing with state stored in RocksDB on executors. State is checkpointed on batch boundary (atomic). Use cases: per-sensor anomaly detection (running mean + 3 sigma), session windows, per-key enrichment with external data."}),(0,t.jsx)(l.CodeCard,{title:"4. Output modes — Append / Update / Complete",description:"Spark Structured Streaming has three output modes. Append (default): emit only new rows after window close (high latency, simple). Update: emit changed rows every batch (low latency, dashboards). Complete: re-emit full result every batch (expensive, top-K queries). Choice depends on sink + use case.",icon:(0,t.jsx)(y.Boxes,{className:"h-5 w-5"}),badge:"Output modes",code:R,language:"sql",filename:"spark_output_modes.sql",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],defaultCollapsed:!0,explainer:"This SQL shows Spark Structured Streaming's three output modes. Append (default) emits only new rows after window close (high latency, simple). Update emits changed rows every batch (low latency, dashboards). Complete re-emits the full result every batch (expensive, top-K queries). Choice depends on sink + use case."}),(0,t.jsx)(l.CodeCard,{title:"5. Watermarks + windowing — tumbling / sliding / session",description:"Spark's watermark (max event_ts seen - tolerance) determines when windows close and emit to sink (Append mode). Three window types: tumbling (non-overlapping 1-min), sliding (10-min hopping every 5-min, overlapping), session (dynamic windows by 30-min gap, Spark 3.4+). Late events (older than watermark) are dropped or routed to side output.",icon:(0,t.jsx)(j.Atom,{className:"h-5 w-5"}),badge:"Watermarks",code:L,language:"sql",filename:"spark_watermarks.sql",highlight:[12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54],defaultCollapsed:!0,explainer:"This SQL shows Spark's watermark + windowing model. The watermark (max event_ts seen - tolerance) determines when windows close and emit to the sink in Append mode. Three window types are illustrated: tumbling (non-overlapping 1-min), sliding (10-min hopping every 5-min, overlapping), and session (dynamic windows by 30-min gap, Spark 3.4+)."})]}),(0,t.jsx)(i.SectionCard,{title:"Try it: simulate Spark micro-batch (Pyodide)",description:"Pure-Python simulation of Spark Structured Streaming — no JVM, no cluster. Build a synthetic pipeline: 5000 sensor events spread across 5 minutes, process in 5 1-minute micro-batches, track watermark with 5-second tolerance, commit closed windows to Bronze Iceberg in Append mode. See how micro-batch cadence affects latency + throughput.",icon:(0,t.jsx)(v.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:B,buttonLabel:"Run Spark micro-batch simulation (Pyodide)"})}),(0,t.jsx)(i.SectionCard,{title:"Spark Streaming vs Flink vs Kafka Streams — micro-batch vs true streaming",description:"Three streaming engines with different design philosophies. Spark Structured Streaming (micro-batch) wins on unified batch+streaming + simpler semantics. Flink (true streaming) wins on low latency + CEP + complex state. Kafka Streams (embedded) wins on microservices needing streaming.",icon:(0,t.jsx)(y.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(P,{})}),(0,t.jsx)(i.SectionCard,{title:"Why Spark Streaming evolved — shortfalls of DStream API (Era 1)",description:"Spark Structured Streaming (2.0, 2016) replaced the older DStream (Discretized Stream) API. The DStream API had four critical shortfalls that made production streaming painful. Structured Streaming fixed all four by unifying with the batch DataFrame API.",icon:(0,t.jsx)(_.History,{className:"h-5 w-5"}),badge:"Why Structured Streaming",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: DStream API was low-level (RDD-based)."})," The original Spark Streaming (DStream) operated on RDDs (Resilient Distributed Datasets) — required Java/Scala boilerplate, no SQL, no DataFrame. Structured Streaming unified with the batch DataFrame API: same SQL/DataFrame code runs as batch (read) or streaming (readStream). ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," 10× less code, single codebase for batch + streaming."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: DStream had no event-time semantics."})," DStream windows aligned to processing time (wall-clock), not event time. Out-of-order events (common in Kafka) landed in wrong windows. Structured Streaming added event-time watermarks (max event_ts seen - tolerance) following the Google Dataflow model. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," accurate analytics on real-world Kafka topics where events arrive out-of-order."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: DStream had no stateful operations beyond updateStateByKey."})," DStream's updateStateByKey was the only stateful op — untyped, no TTL, no incremental checkpoints. Structured Streaming added mapGroupsWithState + flatMapGroupsWithState: typed state, TTL, timeout, RocksDB-backed with incremental checkpoints. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," complex stateful patterns (anomaly detection, session windows, enrichment joins) became first-class."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: DStream had no exactly-once semantics."})," DStream was at-least-once (with redelivery) — duplicates were the consumer's problem. Structured Streaming added exactly-once via write-ahead logs per batch (checkpoint boundary = atomic commit). ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," production deployments to Bronze Iceberg/Delta with no duplicates — same guarantee as Flink."]})]})}),(0,t.jsx)(i.SectionCard,{title:"Truly unique Spark Streaming features (vs Flink + Kafka Streams)",description:"Spark Structured Streaming has four features that are genuinely unique — not marketing fluff, but structural differentiators that no other streaming engine has yet matched.",icon:(0,t.jsx)(v.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Unified batch + streaming"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Same DataFrame/SQL API for batch (read) and streaming (readStream). ",(0,t.jsx)("strong",{children:"Flink has separate DataStream API (streaming) + DataSet API (batch); Kafka Streams is streaming-only."})," Spark wins on DX + code reuse."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Continuous mode (low-latency)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Experimental continuous mode achieves ~1ms latency — bridges the gap with Flink. ",(0,t.jsx)("strong",{children:"Flink is always continuous (lower latency); Kafka Streams is per-record."})," Spark offers both modes via the same API."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Session windows (Spark 3.4+)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Dynamic windows by gap (e.g. 30-min idle closes session). ",(0,t.jsx)("strong",{children:"Flink has session windows; Kafka Streams has them too."})," Spark's implementation is most ergonomic via DataFrame API."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Output modes (3)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Append / Update / Complete modes — choose per sink + use case. ",(0,t.jsx)("strong",{children:"Flink has Append + Update + Retract; Kafka Streams is Append-only."})," Spark wins on output flexibility."]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"1 scientific streaming example — Bronze via Spark Structured Streaming",description:"One production-style scientific streaming example showing Spark Structured Streaming in action. Each is a clickable card opening a lazy popup with: scenario brief, dataset stats, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight. Shows how micro-batch streaming enables the Bronze→Silver→Gold medallion for science.",icon:(0,t.jsx)(b.Database,{className:"h-5 w-5"}),badge:"1 example × 5 langs",children:(0,t.jsx)(p.DatasetCards,{examples:u.SPARK_STREAMING_SCIENCE_EXAMPLES,intro:"OEIS sequence property computation (370k+ sequences, 5-20 new submissions/day) via Spark micro-batch. Each card has Scala/Rust/Go/Elixir/Zig code with Spark's micro-batch + watermark + stateful ops differentiators."})}),(0,t.jsx)(i.SectionCard,{title:"Computational tooling — the Spark Streaming ecosystem",description:"Spark Structured Streaming inherits Spark's full ecosystem — connectors (Kafka, file, JDBC), sinks (Iceberg, Delta, Kafka, console), and libraries (ML, GraphX, SQL). All Databricks-managed customers get Structured Streaming as part of Databricks.",icon:(0,t.jsx)(A.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(w.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Sources + sinks"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Kafka source"})," — primary (offsets in checkpoint, EOS)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"File source"})," — watches directory for new files"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Rate source"})," — synthetic for testing"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Iceberg sink"})," — Bronze/Silver/Gold (Append mode, atomic per batch)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Delta sink"})," — Databricks ecosystem (CDF for CDC)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Kafka sink"})," — Update mode for real-time dashboards"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Console/Memory sink"})," — for testing"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"foreachBatch sink"})," — custom batched writer"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(D.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Libraries + deployments"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Spark SQL"})," — DataFrame/SQL API (shared with batch)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"MLlib"})," — online scoring of ML models"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Structured Streaming + ML"})," — streaming inference"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"foreachBatch + foreach"})," — custom sinks"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Standalone"})," — cluster on bare metal / VMs"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Kubernetes"})," — Spark K8s operator"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Databricks"})," — managed + Photon + Delta + Unity"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Amazon EMR"})," — managed Spark on AWS"]})]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Research + production case studies",description:"The papers and production deployments that defined Spark Structured Streaming. The Armbrust 2018 paper is the academic foundation; Netflix + Uber + Databricks engineering blogs document production scale.",icon:(0,t.jsx)(T.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Armbrust et al. 2018 (SIGMOD):"}),' "Structured Streaming: A Declarative API for Real-Time Applications in Apache Spark." The academic paper for Structured Streaming. Argued that streaming should use the same DataFrame API as batch (unified semantics) — only differ in read vs readStream. Source = unbounded table; sink = bounded table; watermark + window handle event-time semantics. The foundational reference for the unified batch+streaming thesis.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Zaharia et al. 2012 (USENIX NSDI):"}),' "Discretized Streams: Fault-Tolerant Streaming Computation at Scale." The original Spark Streaming paper (DStream API). Argued for micro-batch model as a simpler alternative to per-record processing — leverage Spark\'s RDD semantics, batched I/O for throughput, simpler fault tolerance. DStream was replaced by Structured Streaming in Spark 2.0 (2016), but the micro-batch model remains.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Netflix Production Case (2018):"}),' "Structured Streaming at Netflix: 4T Messages/Day." Netflix\'s Keystone pipeline processes 4T events/day via Kafka → Spark Structured Streaming → Iceberg Bronze. Use cases: playback analytics, recommendation features, anomaly detection. Their migration from DStream to Structured Streaming reduced code by 70% (unified DataFrame API).']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Uber Production Case (2019):"}),' "Apache Spark Structured Streaming at Uber: 100B+ Events/Day." Uber uses Structured Streaming for real-time ETL (Kafka → Iceberg Bronze), surge pricing (per-region aggregations), and fraud detection (with mapGroupsWithState for per-account state). Their blog post "Migrating from Flink to Spark Structured Streaming" documents the simpler operational model + unified batch+streaming benefits.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Databricks Production Case (2020+):"}),' "Delta + Structured Streaming: A Lakehouse Built for Streaming." Databricks ships Structured Streaming as part of every Databricks workspace. Delta sink supports CDC via Change Data Feed (CDF), enabling Bronze → Silver → Gold streaming pipelines. Used by all Databricks customers for streaming Bronze writes.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Spark Continuous Processing (Apache 2018-2023):"}),' "Continuous Processing: Low-Latency Streaming with Structured Streaming." Spark 3.0 introduced continuous mode (experimental) for sub-1ms latency. Source support is limited (Kafka + rate only); stateful op support is limited (no mapGroupsWithState). The goal is to bridge the gap with Flink without rewriting the API.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Spark 3.5 + Session Windows (Apache 2023):"}),' "Session Window Functions in Structured Streaming." Added SESSION() function for dynamic windows by gap. Use case: web sessionization (30-min idle closes session), IoT grouping (gap-based aggregation). Brings Spark\'s window support to parity with Flink.']})]})}),(0,t.jsx)(i.SectionCard,{title:"My deeper thought: Spark Structured Streaming IS the unified batch+streaming thesis",description:"The unifying view: Spark Structured Streaming is the production implementation of the unified batch+streaming thesis — the same DataFrame/SQL API for both, only differing in source boundedness. The 'innovation' is recognising that streaming is just unbounded batch.",icon:(0,t.jsx)(N.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Spark Structured Streaming IS unbounded batch."})," The unified batch+streaming thesis (Armbrust 2018): a batch is a bounded table; a stream is an unbounded table. Same DataFrame API reads both (read vs readStream). ",(0,t.jsx)("strong",{children:'This is structurally identical to the Lambda architecture\'s "batch + speed" layers'}),' — but unified into one API rather than two separate codebases. The "innovation" is recognising that streaming is just unbounded batch + watermark + windowing — no separate streaming API needed. Flink\'s DataStream + DataSet split looks like an evolutionary dead end by comparison.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Micro-batch IS mini-batch processing."})," Spark's micro-batch (X-second batches) is structurally identical to mini-batch gradient descent in ML — process N records, then commit. The trade-off: latency vs throughput. Micro-batch gives 100ms+ latency but high throughput (batched I/O, simpler fault tolerance). Continuous mode (Spark 3.0+) is structurally stochastic gradient descent (one record at a time, ~1ms latency, lower throughput). ",(0,t.jsx)("strong",{children:"This is the same pattern as SGD vs mini-batch in ML — Spark offers both via the same API."})]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Output modes IS materialised view refresh strategies."})," Spark's three output modes (Append / Update / Complete) are structurally three materialised view refresh strategies. Append = incremental refresh (only new rows). Update = upsert refresh (only changed rows). Complete = full refresh (re-emit full result). ",(0,t.jsx)("strong",{children:"This is structurally identical to PostgreSQL materialised view refresh modes (CONCURRENTLY, REFRESH FULL)."}),' The "innovation" is exposing refresh strategy as a first-class DataFrame property, not an internal detail.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Stateful operators ARE state stores (RocksDB-backed)."})," Spark's mapGroupsWithState + flatMapGroupsWithState are structurally RocksDB-backed state stores — same as Kafka Streams' state stores, Flink's RocksDB state backend. Per-key state in RocksDB on executor; checkpointed on batch boundary; TTL for auto-expiry. ",(0,t.jsx)("strong",{children:"This is structurally identical to all other streaming engines' stateful operators — the pattern is the same, only the API differs."})," Spark's API is more ergonomic (typed Scala case classes); Flink's API is lower-level (ProcessFunction)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Spark Streaming IS to batch+streaming what PostgreSQL was to OLTP."})," Before PostgreSQL, every database had its own storage format + WAL + query engine tightly coupled. PostgreSQL's WAL + MVCC + ACID on shared storage became the reference implementation that everyone forked (Redshift, Greenplum, CockroachDB). Spark Structured Streaming is doing the same for unified batch+streaming — its DataFrame API + watermark + stateful ops pattern is being reimplemented by Flink (DataStream unified with Table API), Kafka Streams (KSQL unified with streams), and Beam (unified runner). ",(0,t.jsx)("strong",{children:"The pattern is the standard; the implementations are converging."}),' This is what "unified batch+streaming" actually means.']})]})}),(0,t.jsx)(i.SectionCard,{title:"Related Elegant Code — the math that walks across disciplines",description:"This page's math appears in unexpected places. The Elegant Code cards show the same equation in 3+ sciences — click to explore the collision.",icon:(0,t.jsx)(v.Sparkles,{className:"h-5 w-5"}),badge:"Cross-domain",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-1 gap-3",children:[(0,t.jsxs)(a.default,{href:(0,h.hrefFor)("elegant-code"),className:"group flex items-start gap-3 rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary",children:"25"}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-medium group-hover:text-primary transition-colors",children:"Count-Min Sketch"}),(0,t.jsx)("p",{className:"text-[10px] font-mono text-muted-foreground mt-0.5",children:"ê_i = min_j count[j][h_j(i)]"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1 leading-relaxed",children:"Spark Structured Streaming top-K, genome k-mer frequency counting, network heavy-hitter detection — all use the SAME d×w matrix. 20 KB vs 80 GB."})]})]}),(0,t.jsxs)(a.default,{href:(0,h.hrefFor)("elegant-code"),className:"group flex items-start gap-3 rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary",children:"26"}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-medium group-hover:text-primary transition-colors",children:"Reservoir Sampling"}),(0,t.jsx)("p",{className:"text-[10px] font-mono text-muted-foreground mt-0.5",children:"P(item_i in sample) = k/N"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1 leading-relaxed",children:"Kafka stream event sampling, A/B test cohort selection, GWAS variant subsampling — all use the SAME k/N replace-probability. O(k) memory."})]})]})]})}),(0,t.jsxs)(f.DeeperThoughtSection,{pageTitle:"Spark Structured Streaming",children:[(0,t.jsx)(f.DeeperThought,{title:"Spark Structured Streaming IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Spark Structured Streaming is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Spark Structured Streaming connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Spark Structured Streaming sits in the computational-science landscape."})}),(0,t.jsx)(f.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Spark Structured Streaming) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(f.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(f.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(f.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(m.RelatedTopics,{topics:[{id:"streaming",reason:"Streaming overview — Spark Streaming in the broader ecosystem"},{id:"flink",reason:"Apache Flink — sibling streaming engine (true streaming)"},{id:"kafka",reason:"Apache Kafka — primary source for Spark Structured Streaming"},{id:"iceberg",reason:"Apache Iceberg — Bronze tier sink from Structured Streaming"},{id:"databricks",reason:"Databricks — managed Spark Streaming + Delta sink"},{id:"databricks-lakehouse",reason:"Databricks Lakehouse — production streaming patterns"},{id:"modern-big-data",reason:"Modern Big Data — Spark Streaming in the lakehouse stack"},{id:"data-lakehouse",reason:"Data Lakehouse — Bronze tier via Structured Streaming"}]}),(0,t.jsx)(o.ResearchDemo,{pageId:"spark-streaming"}),(0,t.jsx)(c.TrendAnticipation,{pageId:"spark-streaming"}),(0,t.jsx)(n.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"streaming",reason:"Streaming overview — Spark Streaming in the broader ecosystem"},{id:"flink",reason:"Apache Flink — sibling streaming engine (true streaming)"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,h.hrefFor)("streaming"),className:"text-sm text-primary hover:underline",children:"→ Streaming overview (Kappa architecture)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("flink"),className:"text-sm text-primary hover:underline",children:"→ Apache Flink (sibling, true streaming)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("kafka"),className:"text-sm text-primary hover:underline",children:"→ Apache Kafka (primary source)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (Bronze tier sink)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("databricks"),className:"text-sm text-primary hover:underline",children:"→ Databricks (managed Spark Streaming)"})]})]})}e.s(["SparkStreamingPage",()=>U])}]);