(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,120211,e=>{"use strict";var t=e.i(843476),a=e.i(522016),r=e.i(271645),i=e.i(862824),s=e.i(342046),o=e.i(921371),n=e.i(580296),l=e.i(122836),d=e.i(716675),c=e.i(59938),h=e.i(158960),m=e.i(741500),u=e.i(901752),p=e.i(487486),f=e.i(332017),g=e.i(658041),b=e.i(828579),x=e.i(21218),y=e.i(691385),w=e.i(227516),_=e.i(178583),v=e.i(25652),S=e.i(283086),T=e.i(966992),j=e.i(618393),C=e.i(727927);let k=`-- ============================================================
-- Apache Hudi — Uber-origin open table format for incremental/UPSERT
--   COW (Copy On Write) — sync merges, slower writes, fast reads
--   MOR (Merge On Read) — async merges, fast writes, snapshot reads
-- ============================================================

-- Create a COW Hudi table (sync-merge on every write)
CREATE TABLE hudi.orders_cow (
  order_id        BIGINT,
  customer_id     BIGINT,
  order_ts        TIMESTAMP,
  ship_country    STRING,
  amount_usd      DECIMAL(18, 4),
  currency        STRING,
  is_deleted      BOOLEAN,
  PRIMARY KEY (order_id) NOT ENFORCED
) USING HUDI
PARTITIONED BY (date(order_ts))
TBLPROPERTIES (
  'hoodie.table.type'              = 'COPY_ON_WRITE',
  'hoodie.datasource.write.precombine.field' = 'order_ts',
  'hoodie.datasource.write.recordkey.field'   = 'order_id',
  'hoodie.datasource.write.partitionpath.field' = 'order_ts',
  'hoodie.cleaner.commits.retained' = '10',       -- keep last 10 commits
  'hoodie.cleaner.commits.retained.max.commits' = '20',
  'hoodie.parquet.compression.codec' = 'zstd',
  'hoodie.compact.inline' = 'false'  -- async compaction (run via Airflow)
);

-- Create an MOR Hudi table (log-structured writes, async merges)
CREATE TABLE hudi.orders_mor (
  order_id        BIGINT,
  customer_id     BIGINT,
  order_ts        TIMESTAMP,
  ship_country    STRING,
  amount_usd      DECIMAL(18, 4),
  currency        STRING,
  is_deleted      BOOLEAN,
  PRIMARY KEY (order_id) NOT ENFORCED
) USING HUDI
PARTITIONED BY (date(order_ts))
TBLPROPERTIES (
  'hoodie.table.type'              = 'MERGE_ON_READ',
  'hoodie.datasource.write.precombine.field' = 'order_ts',
  'hoodie.datasource.write.recordkey.field'   = 'order_id',
  'hoodie.compact.inline'           = 'false',  -- async compaction
  'hoodie.compact.inline.max.delta.commits' = '5',  -- compact every 5 deltas
  'hoodie.parquet.compression.codec' = 'zstd',
  'hoodie.logfile.format'           = 'hoodie_log',
  'hoodie.logfile.max.size'          = '67108864'  -- 64 MB log files
);

-- Time travel — read as-of a specific commit (instant)
SELECT * FROM hudi.orders_cow
  FOR SYSTEM_TIME AS OF '20240901100000000';
-- Hudi 'instants' are millisecond timestamps: YYYYMMDDHHMMSSSSS

-- Incremental query — read changes since a specific commit
SELECT * FROM hudi.orders_cow
  FOR SYSTEM_TIME FROM '20240901100000000' TO '20240902100000000';
-- Returns ONLY the rows changed in that window — perfect for CDC downstream

-- Point-in-time query — combine with WHERE for partition pruning
SELECT order_id, customer_id, amount_usd, ship_country
FROM hudi.orders_mor FOR SYSTEM_TIME AS OF '20240901100000000'
WHERE order_ts >= '2024-09-01' AND ship_country = 'UK';

-- MERGE INTO — works on both COW and MOR
MERGE INTO hudi.orders_cow AS t
USING staging.orders_stream AS s
ON t.order_id = s.order_id
WHEN MATCHED AND s.op = 'DELETE' THEN DELETE
WHEN MATCHED AND s.op = 'UPDATE' THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;

-- Run compaction manually on MOR table (run hourly via Airflow)
CALL run_compaction('hudi', 'orders_mor', '2024-09-01');`,R=`# ============================================================
# Hudi — PySpark streaming upsert from Kafka CDC
# ============================================================

from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

spark = SparkSession.builder \\
    .appName("hudi-cdc-pipeline") \\
    .config("spark.jars.packages",
            "org.apache.hudi:hudi-spark3.5-bundle_2.12:0.14.0") \\
    .config("spark.sql.extensions",
            "org.apache.spark.sql.hudi.HoodieSparkSessionExtension") \\
    .config("spark.sql.catalog.hudi",
            "org.apache.spark.sql.hudi.HoodieCatalog") \\
    .config("spark.sql.catalog.hudi.warehouse",
            "s3://moderndatascieng-hudi") \\
    .config("hoodie.datasource.write.hive_style_partitioning", "true") \\
    .getOrCreate()

# --- Source: Kafka CDC stream (Debezium format) ---
kafka_cdc = (spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", "kafka:9092")
    .option("subscribe", "orders.cdc")
    .option("startingOffsets", "earliest")
    .load()
)

# Parse Debezium payload — op: c=create, u=update, d=delete
parsed = (kafka_cdc
    .selectExpr("CAST(value AS STRING) AS json_str")
    .selectExpr("json_str", "topic", "partition", "offset", "timestamp")
    # Debezium envelope: { before: {...}, after: {...}, op: 'c|u|d' }
    .select(
        from_json(col("json_str"),
                  schema="before STRUCT<order_id: BIGINT, customer_id: BIGINT, "
                         "order_ts: TIMESTAMP, ship_country: STRING, "
                         "amount_usd: DECIMAL(18,4), currency: STRING>, "
                         "after STRUCT<order_id: BIGINT, customer_id: BIGINT, "
                         "order_ts: TIMESTAMP, ship_country: STRING, "
                         "amount_usd: DECIMAL(18,4), currency: STRING>, "
                         "op STRING").alias("payload"),
        col("timestamp").alias("kafka_ts"),
    )
    .selectExpr(
        "payload.op",
        "CASE WHEN payload.op = 'd' THEN payload.before ELSE payload.after END AS row",
        "kafka_ts",
    )
    .select("op", "row.*", "kafka_ts")
)

# --- Sink: Hudi MOR table (incremental upserts) ---
# Hudi auto-generates _hoodie_record_key, _hoodie_partition_path, _hoodie_commit_time
hudi_write = (parsed.writeStream
    .format("hudi")
    .option("hoodie.table.name", "orders_mor")
    .option("hoodie.table.type", "MERGE_ON_READ")
    .option("hoodie.datasource.write.recordkey.field", "order_id")
    .option("hoodie.datasource.write.partitionpath.field", "order_ts")
    .option("hoodie.datasource.write.precombine.field", "order_ts")
    .option("hoodie.datasource.write.operation", "upsert")
    .option("hoodie.datasource.write.hive_style_partitioning", "true")
    .option("hoodie.cleaner.commits.retained", "10")
    .option("hoodie.compact.inline", "false")
    .option("hoodie.compact.inline.max.delta.commits", "5")  # compact after 5 deltas
    .option("checkpointLocation", "/checkpoint/hudi-orders")
    .outputMode("append")
    .trigger(processingTime="30 seconds")  # micro-batch
    .toTable("hudi.orders_mor"))

# --- Read-optimized + snapshot queries ---
# 'read_optimized' — read base Parquet only (fast, ignores delta logs)
spark.read.format("hudi") \\
    .option("hoodie.datasource.read.type", "read_optimized") \\
    .load("s3://moderndatascieng-hudi/orders_mor") \\
    .createOrReplaceTempView("orders_mor_ro")

# 'snapshot' — read base Parquet + delta logs (latest state, slower)
spark.read.format("hudi") \\
    .option("hoodie.datasource.read.type", "snapshot") \\
    .load("s3://moderndatascieng-hudi/orders_mor") \\
    .createOrReplaceTempView("orders_mor_snap")

# Incremental query — get only NEW changes since the last read
spark.read.format("hudi") \\
    .option("hoodie.datasource.query.type", "incremental") \\
    .option("hoodie.datasource.read.begin.instanttime", "20240901100000000") \\
    .option("hoodie.datasource.read.end.instanttime", "20240902100000000") \\
    .load("s3://moderndatascieng-hudi/orders_mor") \\
    .createOrReplaceTempView("orders_mor_inc")
spark.sql("SELECT * FROM orders_mor_inc WHERE ship_country = 'UK'").show()`,O=`-- ============================================================
-- Flink + Hudi — streaming CDC upserts (Flink as the engine)
-- Hudi's Flink connector is the recommended streaming-CDC path
-- ============================================================

-- Source: Kafka CDC topic (Debezium MySQL → Kafka)
CREATE TABLE kafka.orders_cdc (
  order_id        BIGINT,
  customer_id     BIGINT,
  order_ts        TIMESTAMP(3),
  ship_country    STRING,
  amount_usd      DECIMAL(18, 4),
  currency        STRING,
  op              STRING,
  PRIMARY KEY (order_id) NOT ENFORCED
) WITH (
  'connector'                      = 'kafka',
  'topic'                            = 'orders.cdc',
  'properties.bootstrap.servers'    = 'kafka:9092',
  'format'                           = 'debezium-json',
  'scan.startup.mode'                = 'earliest-offset'
);

-- Sink: Hudi MOR table (Flink handles the delta log + async compaction)
CREATE TABLE hudi.orders_mor (
  order_id        BIGINT,
  customer_id     BIGINT,
  order_ts        TIMESTAMP(3),
  ship_country    STRING,
  amount_usd      DECIMAL(18, 4),
  currency        STRING,
  is_deleted      BOOLEAN,
  PRIMARY KEY (order_id) NOT ENFORCED
) PARTITIONED BY (dt STRING) WITH (
  'connector'                        = 'hudi',
  'path'                             = 's3://moderndatascieng-hudi/orders_mor',
  'hoodie.table.type'                = 'MERGE_ON_READ',
  'hoodie.datasource.write.recordkey.field' = 'order_id',
  'hoodie.datasource.write.partitionpath.field' = 'dt',
  'hoodie.datasource.write.precombine.field' = 'order_ts',
  'hoodie.datasource.write.hive_style_partitioning' = 'true',
  'hoodie.cleaner.commits.retained' = '10',
  'hoodie.compact.inline' = 'false',
  'hoodie.compact.inline.max.delta.commits' = '5'
);

-- Streaming INSERT INTO with upsert semantics
INSERT INTO hudi.orders_mor
SELECT
  order_id, customer_id, order_ts, ship_country, amount_usd, currency,
  op = 'DELETE' AS is_deleted,
  DATE_FORMAT(order_ts, 'yyyy-MM-dd') AS dt
FROM kafka.orders_cdc;

-- Compaction job (run hourly via Airflow Flink SQL Gateway)
-- Compacts 5 delta log files into 1 base Parquet file
CALL compact('hudi', 'orders_mor', 'dt=2024-09-01');`,N=`# ============================================================
# Hudi MOR simulation — in-browser COW vs MOR comparison
# Build a synthetic Hudi table with both COW and MOR semantics:
#   1. Append-only writes (MOR — fast, deltas accumulate)
#   2. Sync-merge writes (COW — slow, base Parquet rewritten)
#   3. Compare write latency + read latency
#   4. Run async compaction on MOR — merge deltas into base
# ============================================================

import time
import random

class HudiBaseFile:
    """A Parquet 'base file' on S3 — contains merged rows."""
    def __init__(self, path, n_rows):
        self.path = path
        self.n_rows = n_rows
        self.created_at_commit = None
    def __repr__(self):
        return f"BaseFile({self.path}, rows={self.n_rows})"

class HudiLogFile:
    """A Hudi log file — contains un-merged delta updates."""
    def __init__(self, path, n_changes):
        self.path = path
        self.n_changes = n_changes  # insert/update/delete events
        self.created_at_commit = None
    def __repr__(self):
        return f"LogFile({self.path}, changes={self.n_changes})"

class HudiInstant:
    """A commit instant — timestamp + state (REQUESTED|INFLIGHT|COMPLETED)."""
    next_id = [0]
    @classmethod
    def new_id(cls):
        cls.next_id[0] += 1
        return f"202409011000{cls.next_id[0]:05d}"
    def __init__(self, action, state='COMPLETED'):
        self.timestamp = HudiInstant.new_id()
        self.action = action  # commit | deltacommit | compaction | clean
        self.state = state

class HudiCOWTable:
    """Copy On Write — every write rewrites the base Parquet file."""
    def __init__(self, name, partition_path):
        self.name = name
        self.partition_path = partition_path
        self.timeline = []  # list of HudiInstant
        self.base_files = {}  # partition -> [BaseFile]
        self.write_count = 0
        self.total_write_ms = 0
        self.read_count = 0
        self.total_read_ms = 0
    def upsert(self, partition, n_changes):
        """COW upsert: read old base + apply deltas + write new base."""
        start = time.time()
        # Simulate: read old base (10ms per 1k rows), apply deltas (5ms), write new (10ms)
        old_base = self.base_files.get(partition, [])
        old_n = sum(f.n_rows for f in old_base) if old_base else 0
        time.sleep(0.001 * (old_n / 1000 + n_changes / 200 + 1))  # simulate I/O
        # Write new base file with merged rows
        new_base = HudiBaseFile(f"s3://hudi/{self.name}/{partition}/base-{self.write_count}.parquet",
                                 old_n + n_changes)
        new_base.created_at_commit = HudiInstant.new_id()
        self.base_files[partition] = [new_base]
        elapsed = (time.time() - start) * 1000
        self.write_count += 1
        self.total_write_ms += elapsed
        self.timeline.append(HudiInstant('commit'))
        return elapsed
    def read(self, partition):
        """COW read: just read the base Parquet (fast)."""
        start = time.time()
        base = self.base_files.get(partition, [])
        n = sum(f.n_rows for f in base) if base else 0
        time.sleep(0.001 * (n / 5000 + 0.5))  # Parquet scan
        elapsed = (time.time() - start) * 1000
        self.read_count += 1
        self.total_read_ms += elapsed
        return n, elapsed
    def compact(self, partition):
        """COW has nothing to compact — already merged."""
        return 0

class HudiMORTable:
    """Merge On Read — writes append to log files; reads merge base + logs."""
    def __init__(self, name, partition_path):
        self.name = name
        self.partition_path = partition_path
        self.timeline = []
        self.base_files = {}  # partition -> [BaseFile]
        self.log_files = {}   # partition -> [LogFile]
        self.write_count = 0
        self.total_write_ms = 0
        self.read_count = 0
        self.total_read_ms = 0
        self.compact_count = 0
    def upsert(self, partition, n_changes):
        """MOR upsert: append to a delta log file (FAST)."""
        start = time.time()
        # Simulate: just append to log (1ms per 1k changes)
        time.sleep(0.001 * (n_changes / 1000 + 0.2))
        log = HudiLogFile(f"s3://hudi/{self.name}/{partition}/.deltas/log-{self.write_count}.hoodie",
                          n_changes)
        log.created_at_commit = HudiInstant.new_id()
        if partition not in self.log_files:
            self.log_files[partition] = []
        self.log_files[partition].append(log)
        elapsed = (time.time() - start) * 1000
        self.write_count += 1
        self.total_write_ms += elapsed
        self.timeline.append(HudiInstant('deltacommit'))
        return elapsed
    def read(self, partition):
        """MOR snapshot read: read base + merge delta logs (slow)."""
        start = time.time()
        base = self.base_files.get(partition, [])
        logs = self.log_files.get(partition, [])
        base_n = sum(f.n_rows for f in base) if base else 0
        log_n = sum(f.n_changes for f in logs) if logs else 0
        # Simulate: read base (fast) + merge logs (slow)
        time.sleep(0.001 * (base_n / 5000 + log_n / 1000 + 0.5))
        elapsed = (time.time() - start) * 1000
        self.read_count += 1
        self.total_read_ms += elapsed
        return base_n + log_n, elapsed
    def compact(self, partition):
        """Compact: merge delta logs into a new base file."""
        if partition not in self.log_files or not self.log_files[partition]:
            return 0
        logs = self.log_files[partition]
        base = self.base_files.get(partition, [])
        old_n = sum(f.n_rows for f in base) if base else 0
        new_changes = sum(l.n_changes for l in logs)
        new_base = HudiBaseFile(f"s3://hudi/{self.name}/{partition}/base-c{self.compact_count}.parquet",
                                 old_n + new_changes)
        new_base.created_at_commit = HudiInstant.new_id()
        self.base_files[partition] = [new_base]
        self.log_files[partition] = []  # deltas merged
        self.timeline.append(HudiInstant('compaction'))
        self.compact_count += 1
        return 1

# --- Build identical COW and MOR tables, run identical workload ---
random.seed(42)
cow_table = HudiCOWTable("orders_cow", "dt")
mor_table = HudiMORTable("orders_mor", "dt")

print("=== Hudi COW vs MOR — 10 upserts per partition ===")
print(f"{'Write #':<8} | {'COW ms':<8} | {'MOR ms':<8} | {'COW files':<10} | {'MOR base+logs'}")
for i in range(10):
    n = random.randint(100, 1000)
    cow_ms = cow_table.upsert("dt=2024-09-01", n)
    mor_ms = mor_table.upsert("dt=2024-09-01", n)
    cow_files = len(cow_table.base_files.get("dt=2024-09-01", []))
    mor_base = len(mor_table.base_files.get("dt=2024-09-01", []))
    mor_logs = len(mor_table.log_files.get("dt=2024-09-01", []))
    print(f"{i+1:<8} | {cow_ms:>5.2f}ms | {mor_ms:>5.2f}ms | {cow_files:<10} | {mor_base}b+{mor_logs}l")

print()
print("=== Read latency (snapshot reads) ===")
for i in range(3):
    _, cow_ms = cow_table.read("dt=2024-09-01")
    _, mor_ms = mor_table.read("dt=2024-09-01")
    print(f"  Read {i+1}: COW={cow_ms:.2f}ms  MOR={mor_ms:.2f}ms")

print()
print("=== Compaction on MOR — merge deltas into new base ===")
mor_table.compact("dt=2024-09-01")
print(f"  After compaction: base_files={len(mor_table.base_files['dt=2024-09-01'])}, "
      f"log_files={len(mor_table.log_files['dt=2024-09-01'])}")

print()
print("=== Post-compaction read latency ===")
_, mor_ms = mor_table.read("dt=2024-09-01")
print(f"  MOR read after compaction: {mor_ms:.2f}ms (faster — no logs to merge)")

print()
print("=== Summary stats ===")
print(f"  COW writes: {cow_table.write_count} total, avg {cow_table.total_write_ms/cow_table.write_count:.2f}ms")
print(f"  MOR writes: {mor_table.write_count} total, avg {mor_table.total_write_ms/mor_table.write_count:.2f}ms")
print(f"  COW reads:  {cow_table.read_count} total, avg {cow_table.total_read_ms/cow_table.read_count:.2f}ms")
print(f"  MOR reads:  {mor_table.read_count} total, avg {mor_table.total_read_ms/mor_table.read_count:.2f}ms")
print()
print("Key insight: MOR writes are ~5x faster than COW (no rewrite),")
print("but MOR reads are slower until compaction. Compaction trades")
print("CPU now for faster reads later — run hourly via Airflow.")`;function E(){let[e,a]=(0,r.useState)("mor");return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsxs)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60 flex items-center justify-between",children:[(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(g.Database,{className:"h-3.5 w-3.5 text-primary"}),"Hudi COW vs MOR — write and read paths compared"]}),(0,t.jsxs)("div",{className:"flex gap-1.5",children:[(0,t.jsx)("button",{onClick:()=>a("cow"),className:`px-2 py-0.5 rounded text-[10px] font-semibold ${"cow"===e?"bg-primary text-primary-foreground":"bg-muted/40 text-muted-foreground"}`,children:"COW"}),(0,t.jsx)("button",{onClick:()=>a("mor"),className:`px-2 py-0.5 rounded text-[10px] font-semibold ${"mor"===e?"bg-primary text-primary-foreground":"bg-muted/40 text-muted-foreground"}`,children:"MOR"})]})]}),(0,t.jsx)("div",{className:"p-3",children:(0,t.jsxs)("svg",{viewBox:"0 0 400 220",className:"w-full h-auto",children:[(0,t.jsx)("text",{x:"20",y:"20",fontSize:"9",fill:"var(--foreground)",fontWeight:"bold",children:"cow"===e?"Copy On Write (COW)":"Merge On Read (MOR)"}),"cow"===e?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("text",{x:"20",y:"50",fontSize:"8",fill:"var(--chart-1)",children:"WRITE (slow)"}),(0,t.jsx)("rect",{x:"40",y:"65",width:"80",height:"22",rx:"3",fill:"var(--chart-3)20",stroke:"var(--chart-3)",strokeWidth:"0.8"}),(0,t.jsx)("text",{x:"80",y:"80",textAnchor:"middle",fontSize:"7",fill:"var(--chart-3)",children:"Old Base"}),(0,t.jsx)("line",{x1:"125",y1:"76",x2:"160",y2:"76",stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#hudi-arrow)"}),(0,t.jsx)("text",{x:"143",y:"73",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"merge"}),(0,t.jsx)("rect",{x:"165",y:"65",width:"80",height:"22",rx:"3",fill:"var(--chart-1)30",stroke:"var(--chart-1)",strokeWidth:"1"}),(0,t.jsx)("text",{x:"205",y:"80",textAnchor:"middle",fontSize:"7",fill:"var(--chart-1)",fontWeight:"bold",children:"New Base"}),(0,t.jsx)("text",{x:"20",y:"115",fontSize:"8",fill:"var(--muted-foreground)",children:"→ rewrites entire Parquet file"}),(0,t.jsx)("text",{x:"20",y:"140",fontSize:"8",fill:"var(--chart-2)",children:"READ (fast)"}),(0,t.jsx)("rect",{x:"80",y:"155",width:"80",height:"22",rx:"3",fill:"var(--chart-3)20",stroke:"var(--chart-3)",strokeWidth:"0.8"}),(0,t.jsx)("text",{x:"120",y:"170",textAnchor:"middle",fontSize:"7",fill:"var(--chart-3)",children:"Base Parquet"}),(0,t.jsx)("line",{x1:"165",y1:"166",x2:"200",y2:"166",stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#hudi-arrow)"}),(0,t.jsx)("rect",{x:"205",y:"155",width:"80",height:"22",rx:"3",fill:"var(--chart-2)30",stroke:"var(--chart-2)",strokeWidth:"1"}),(0,t.jsx)("text",{x:"245",y:"170",textAnchor:"middle",fontSize:"7",fill:"var(--chart-2)",fontWeight:"bold",children:"Result"}),(0,t.jsx)("text",{x:"20",y:"205",fontSize:"8",fill:"var(--muted-foreground)",children:"→ single Parquet read, no merging"})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("text",{x:"20",y:"50",fontSize:"8",fill:"var(--chart-1)",children:"WRITE (fast)"}),(0,t.jsx)("rect",{x:"40",y:"65",width:"80",height:"22",rx:"3",fill:"var(--chart-4)30",stroke:"var(--chart-4)",strokeWidth:"1"}),(0,t.jsx)("text",{x:"80",y:"80",textAnchor:"middle",fontSize:"7",fill:"var(--chart-4)",fontWeight:"bold",children:"Delta Log"}),(0,t.jsx)("line",{x1:"125",y1:"76",x2:"160",y2:"76",stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#hudi-arrow)"}),(0,t.jsx)("text",{x:"143",y:"73",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"append"}),(0,t.jsx)("rect",{x:"165",y:"65",width:"80",height:"22",rx:"3",fill:"var(--chart-4)30",stroke:"var(--chart-4)",strokeWidth:"1"}),(0,t.jsx)("text",{x:"205",y:"80",textAnchor:"middle",fontSize:"7",fill:"var(--chart-4)",fontWeight:"bold",children:"Delta Log"}),(0,t.jsx)("text",{x:"20",y:"115",fontSize:"8",fill:"var(--muted-foreground)",children:"→ no base rewrite, ~5x faster than COW"}),(0,t.jsx)("text",{x:"20",y:"140",fontSize:"8",fill:"var(--chart-2)",children:"READ (snapshot — slow)"}),(0,t.jsx)("rect",{x:"40",y:"155",width:"80",height:"22",rx:"3",fill:"var(--chart-3)20",stroke:"var(--chart-3)",strokeWidth:"0.8"}),(0,t.jsx)("text",{x:"80",y:"170",textAnchor:"middle",fontSize:"7",fill:"var(--chart-3)",children:"Base Parquet"}),(0,t.jsx)("rect",{x:"40",y:"185",width:"80",height:"22",rx:"3",fill:"var(--chart-4)30",stroke:"var(--chart-4)",strokeWidth:"0.8"}),(0,t.jsx)("text",{x:"80",y:"200",textAnchor:"middle",fontSize:"7",fill:"var(--chart-4)",children:"Delta Logs"}),(0,t.jsx)("line",{x1:"125",y1:"176",x2:"180",y2:"176",stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#hudi-arrow)"}),(0,t.jsx)("text",{x:"150",y:"173",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"merge"}),(0,t.jsx)("rect",{x:"185",y:"155",width:"80",height:"22",rx:"3",fill:"var(--chart-2)30",stroke:"var(--chart-2)",strokeWidth:"1"}),(0,t.jsx)("text",{x:"225",y:"170",textAnchor:"middle",fontSize:"7",fill:"var(--chart-2)",fontWeight:"bold",children:"Snapshot"}),(0,t.jsx)("text",{x:"20",y:"215",fontSize:"8",fill:"var(--muted-foreground)",children:"→ compaction merges logs into base (hourly)"})]}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"hudi-arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]})}),(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/30 border-t border-border/60",children:(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"COW rewrites the entire base Parquet on every upsert (slow writes, fast reads). MOR appends to delta logs (fast writes); reads merge base + logs on-the-fly (slow reads until compaction). Compaction (hourly Airflow) merges logs into a new base file."})})]})}function M(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(b.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Hudi vs Iceberg vs Delta — Hudi's UPSERT-first differentiation"]})}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/30",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Hudi"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Iceberg"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Delta"})]})}),(0,t.jsx)("tbody",{children:[{feature:"Origin",hudi:"Uber (2016)",iceberg:"Netflix (2017)",delta:"Databricks (2017)"},{feature:"Table types",hudi:"COW + MOR (2 types)",iceberg:"Append-only (v2 has row deletes)",delta:"Append-only (MERGE uses row deletes)"},{feature:"UPSERT performance",hudi:"Best — designed for it",iceberg:"Good (v2 row deletes)",delta:"Good (MERGE)"},{feature:"Write path",hudi:"COW: sync merge; MOR: log append",iceberg:"Append",delta:"Append + delete file"},{feature:"Read path",hudi:"COW: read base; MOR: merge base+logs",iceberg:"Read manifests → Parquet",delta:"Read WAL → Parquet"},{feature:"Compaction",hudi:"Native (async, scheduled)",iceberg:"Manual (rewrite_data_files)",delta:"OPTIMIZE (manual) + Liquid Clustering (auto)"},{feature:"CDC ingestion",hudi:"Native (designed for it)",iceberg:"Via Flink/Spark",delta:"Via CDF"},{feature:"Time travel",hudi:"Instant time",iceberg:"Snapshot ID / timestamp",delta:"VERSION AS OF N"},{feature:"Schema evolution",hudi:"Full (column IDs)",iceberg:"Full (column IDs)",delta:"Full (column IDs since v3)"},{feature:"Catalog options",hudi:"Hive, Glue, REST",iceberg:"REST, Glue, Hive, Nessie, Unity",delta:"Unity, Hive, S3"},{feature:"Best fit",hudi:"Streaming CDC",iceberg:"General-purpose lakehouse",delta:"Databricks ecosystem"},{feature:"Adoption",hudi:"Uber, Walmart, ByteDance",iceberg:"Netflix, Apple, Stripe",delta:"All Databricks customers"}].map((e,a)=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,t.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.hudi}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.iceberg}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.delta})]},a))})]})})]})}let H=[{label:"Origin",value:"Uber 2016",hint:"Uber engineering built Hudi to handle petabytes of CDC from MySQL → S3 — the 'data lakehouse CDC' problem",deltaTone:"flat"},{label:"Table types",value:"2 (COW + MOR)",hint:"Copy On Write (sync merges, slow writes, fast reads) vs Merge On Read (log appends, fast writes, slow reads)",deltaTone:"flat"},{label:"Production scale",value:"PB-scale",hint:"Uber trip data, ByteDance video events, Walmart inventory — all CDC-heavy workloads where MOR shines",deltaTone:"up"},{label:"Differentiator",value:"UPSERT-first",hint:"Hudi is the only format designed ground-up for incremental upserts — the others bolted it on later",deltaTone:"up"}];function D(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(i.PageHeader,{eyebrow:"Apache Hudi · Uber-origin · COW vs MOR · incremental UPSERT · CDC ingestion",title:"Apache Hudi — the UPSERT-first open table format",description:"Hudi is Uber's open-source table format for incremental/UPSERT workloads on S3/ADLS/GCS. Born 2016 at Uber to handle petabytes of trip-data CDC from MySQL → S3, it pioneered two table types: Copy On Write (COW — sync merges on every write, slow writes, fast reads) and Merge On Read (MOR — log appends on writes, async compaction merges logs into base, fast writes, slow reads until compaction). Hudi's killer feature vs Iceberg/Delta is that UPSERT is the primary operation — not an afterthought. Native CDC ingestion via Flink/Spark streaming Debezium, async compaction via Airflow, point-in-time + incremental queries for CDC downstream. Production at Uber, Walmart, ByteDance, and any team with CDC-heavy workloads where Iceberg/Delta feel like 'append-first' formats.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(g.Database,{className:"h-3 w-3"})," COW + MOR"]}),(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(w.History,{className:"h-3 w-3"})," Incremental"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:H.map(e=>(0,t.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(i.SectionCard,{title:"COW vs MOR — write and read paths compared",description:"Hudi's two table types solve different write-vs-read tradeoffs. COW (Copy On Write) rewrites the entire base Parquet file on every upsert — slow writes (O(n) per write), but reads are fast (single Parquet scan). MOR (Merge On Read) appends to delta log files on every write — fast writes (O(1) per write), but reads must merge base + delta logs (slower until compaction). Compaction runs hourly via Airflow, merging deltas into a new base file. Choose COW for read-heavy workloads (analytics dashboards); choose MOR for write-heavy CDC ingestion (operational data).",icon:(0,t.jsx)(y.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,t.jsx)(E,{})}),(0,t.jsx)(i.SectionCard,{title:"Hudi Spark SQL — create COW + MOR tables, time-travel, MERGE",description:"Spark 3.5 + Hudi 0.14 supports both table types with full SQL. Create with USING HUDI + TBLPROPERTIES, set PRIMARY KEY for upserts, time travel via FOR SYSTEM_TIME AS OF 'instant' (Hudi uses millisecond-precision instant timestamps), incremental queries via FOR SYSTEM_TIME FROM 'instant' TO 'instant' (returns only rows changed in that window — perfect for CDC downstream). MERGE INTO works on both COW and MOR tables.",icon:(0,t.jsx)(g.Database,{className:"h-5 w-5"}),badge:"Spark SQL",children:(0,t.jsx)(l.CodeBlock,{code:k,language:"sql",filename:"hudi_spark.sql",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,50,51,55,56,57,62,63,64,65,66,67,68,69,70,71,72,73,74,75]})}),(0,t.jsx)(i.SectionCard,{title:"PySpark streaming — Kafka CDC → Hudi MOR",description:"Production CDC pattern: Debezium captures MySQL changes → Kafka topic → PySpark structured streaming → Hudi MOR table. Debezium envelope has { before, after, op: 'c|u|d' } — the PySpark job parses it, sets is_deleted = (op='DELETE'), and upserts into the Hudi MOR table. Async compaction runs hourly (controlled by hoodie.compact.inline.max.delta.commits). The streaming job is checkpointed — exactly-once semantics via Flink-like 2PC.",icon:(0,t.jsx)(x.Activity,{className:"h-5 w-5"}),badge:"PySpark",children:(0,t.jsx)(l.CodeBlock,{code:R,language:"python",filename:"hudi_pyspark.py",highlight:[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87]})}),(0,t.jsx)(i.SectionCard,{title:"Flink + Hudi — recommended streaming CDC path",description:"Hudi's Flink connector is the production-recommended path for streaming CDC ingestion (vs PySpark structured streaming). Flink's checkpoint + 2PC guarantees exactly-once delivery from Kafka → Hudi. The Flink job uses INSERT INTO with implicit upsert semantics (Hudi auto-detects the recordkey + partitionpath from the table config). Compaction runs as a separate CALL compact() SQL statement via Flink SQL Gateway + Airflow scheduler.",icon:(0,t.jsx)(w.History,{className:"h-5 w-5"}),badge:"Flink SQL",children:(0,t.jsx)(l.CodeBlock,{code:O,language:"sql",filename:"hudi_flink.sql",highlight:[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56]})}),(0,t.jsx)(i.SectionCard,{title:"Try it: simulate Hudi COW vs MOR in your browser (Pyodide)",description:"Pure-Python simulation of both Hudi table types — build identical COW and MOR tables, run identical upsert workloads, measure write latency + read latency + compaction effects. See for yourself the ~5x write speedup of MOR (no base rewrite) and the slower MOR snapshot reads until compaction runs.",icon:(0,t.jsx)(S.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:N,buttonLabel:"Run Hudi COW vs MOR simulation (Pyodide)"})}),(0,t.jsx)(i.SectionCard,{title:"Hudi vs Iceberg vs Delta — Hudi's UPSERT-first differentiation",description:"Three sibling formats with different design priorities. Hudi is the UPSERT-first specialist — designed ground-up for incremental upserts, with native CDC ingestion, native compaction, and incremental queries. Iceberg (Netflix) emphasises hidden partitioning + vendor-neutral catalogs. Delta (Databricks) is the most widely-deployed due to ecosystem. For pure append-only analytics, Iceberg/Delta win on simplicity; for CDC-heavy workloads (operational data, GDPR right-to-be-forgotten, PII updates), Hudi wins on UPSERT performance.",icon:(0,t.jsx)(b.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(M,{})}),(0,t.jsx)(i.SectionCard,{title:"Why Hudi evolved — shortfalls of Hive on append-only S3",description:"Uber launched Hudi in 2017 (open-sourced 2018) to fix the catastrophic write-amplification that Hive-on-S3 imposed on CDC-heavy workloads — every update meant a full partition rewrite. Hudi brought LSM-tree-style log-structured writes to S3, enabling upserts without rewrites.",icon:(0,t.jsx)(w.History,{className:"h-5 w-5"}),badge:"Why Hudi",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Every CDC update = full partition rewrite."})," Hive partitioned data by date and treated each partition as immutable — updating one customer record on a 1 TB daily partition required rewriting the entire 1 TB. Uber's ",(0,t.jsx)("code",{className:"font-mono",children:"users"})," table updates every login, every order, every address change — millions of daily updates against multi-TB partitions. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Hudi MOR writes append-only delta-log files (no rewrite); reads merge on demand. Write amplification drops from 10⁶× to ~1×."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: No incremental query primitive."}),' Hive had no notion of "give me rows changed since timestamp X" — pipelines consuming CDC had to either re-scan the full table or maintain their own offset tracking. ',(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Hudi exposes ",(0,t.jsx)("code",{className:"font-mono",children:"FOR SYSTEM_TIME FROM '...' TO '...'"})," as a first-class query — downstream consumers fetch only changed rows since their last checkpoint."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No async compaction."})," Hive required manual ",(0,t.jsx)("code",{className:"font-mono",children:"ALTER TABLE ... CONCATENATE"})," to merge small files — a synchronous, blocking operation. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Hudi runs compaction as an asynchronous background service — delta-log files fold into base Parquet without blocking writers or readers. The LSM-tree discipline on S3 was Hudi's structural innovation."]})]})}),(0,t.jsx)(i.SectionCard,{title:"Truly unique Hudi features (vs Iceberg + Delta)",description:"Four Hudi capabilities that no other open table format has matched — they reflect Uber's CDC-native DNA. Hudi is the only format with an on-S3 LSM-tree, native incremental query syntax, and native CDC ingestion.",icon:(0,t.jsx)(S.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. MOR LSM-tree on S3"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Merge-on-Read tables write append-only delta logs, then merge with base Parquet on read — writes never block, reads can choose snapshot vs read-optimized. ",(0,t.jsx)("strong",{children:"Iceberg + Delta both require full file rewrite for upserts."})," The only LSM-on-S3 of the three."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Incremental queries"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:[(0,t.jsx)("code",{children:"FOR SYSTEM_TIME FROM '...' TO '...'"})," returns only rows changed in the window — a first-class SQL syntax. ",(0,t.jsx)("strong",{children:"Iceberg has incremental via snapshot diff; Delta has CDF (similar but log-based)."})," Hudi's is the cleanest syntax."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Native CDC ingestion"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Hudi's ",(0,t.jsx)("code",{children:"deltaStreamer"})," ingests MySQL binlog/Postgres WAL/Kafka natively, applies schema evolution, and writes upserts to MOR tables in one tool. ",(0,t.jsx)("strong",{children:"Iceberg + Delta both require external Flink/Spark pipelines."})," No other format ships a CDC ingest tool."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Async compaction"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Background service folds delta-log files into base Parquet without blocking writers or readers — Hudi's compaction runs on a schedule (e.g. every 5 commits) without coordination. ",(0,t.jsxs)("strong",{children:["Iceberg + Delta ",(0,t.jsx)("code",{children:"OPTIMIZE"})," are synchronous; readers see partial state during."]})]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"3 large-dataset examples — cards with 5-language code popups",description:"Three production-style Hudi scenarios (MOR upsert on CDC stream, incremental pull, async compaction tuning). Each is a clickable card opening a lazy popup with: scenario brief, dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,t.jsx)(g.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,t.jsx)(h.DatasetCards,{examples:m.HUDI_EXAMPLES,intro:"Production-style CDC upsert + incremental query + compaction scenarios on Apache Hudi. Each card has Scala/Rust/Go/Elixir/Zig code with Hudi-specific primitives (MOR tables, delta-log files, FOR SYSTEM_TIME incremental queries, async compaction)."})}),(0,t.jsx)(i.SectionCard,{title:"Computational tooling — the Hudi ecosystem",description:"Hudi's ecosystem is Uber-flavored: Spark-primary, Flink for streaming CDC, deltaStreamer as the native ingest tool. Compute (6+ engines) and catalog (HMS-primary, with Unity + Glue as federated options).",icon:(0,t.jsx)(j.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(T.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute engines (6+)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Spark 3.5+ (hudi-spark)"})," — primary write engine, PySpark/Scala/SQL"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Flink 1.18+ (hudi-flink)"})," — streaming CDC ingestion + exactly-once sinks"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Hoodie FlinkStreamer"})," — Kafka → Hudi MOR table, native CDC pipeline"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Trino 425+ (Hudi connector)"})," — federated SQL reads (snapshot + read-optimized)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Presto 0.285+ (Hudi connector)"})," — federated SQL reads on MOR + COW"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Hive 3.1+ (hudi-hive)"})," — legacy Hive reads on Hudi tables"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Impala"})," — Cloudera cluster reads on Hudi"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"DuckDB (community extension)"})," — laptop-scale Hudi reads (experimental)"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(C.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Ingest + catalogs (5)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Hoodie DeltaStreamer"})," — native CDC ingest from MySQL binlog/Postgres WAL/Kafka"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Hive Metastore"})," — primary catalog (Hudi is Hive-origin)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"AWS Glue Data Catalog"})," — Hudi tables on S3 registered into Glue"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Databricks Unity Catalog"})," — Hudi tables on Databricks via HMS shim"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Confluent Kafka Connect (Hudi Sink)"})," — managed CDC pipeline into Hudi MOR"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Debezium + Hudi"})," — open-source CDC: binlog → Kafka → DeltaStreamer"]})]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Research + production case studies",description:"The Uber engineering blogs are the foundational references for Hudi; the Walmart and ByteDance cases show Hudi's deployment at scale beyond Uber.",icon:(0,t.jsx)(_.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Uber Engineering origin (Vinoth Chandar et al., 2016):"})," \"Incremental Processing on Petabyte-Scale Data at Uber with Apache Hudi.\" Uber's trip data, fares, and surge pricing lived in MySQL; they needed to sync it to S3 for analytics. Batch-INSERT-ONLY Hive tables were too slow — every CDC update required rewriting the entire partition. Hudi introduced the UPSERT-first design: COW for sync merges, MOR for fast log appends + async compaction. The .hoodie/ timeline of instants (millisecond-precision timestamps) is Hudi's analog to Iceberg's snapshot_id and Delta's version N."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Walmart Production Case (Walmart Eng 2020):"})," Inventory and order data from 11k+ stores, all CDC from PostgreSQL. Migrated from Hive-on-EMR (every update required full partition rewrite) to Hudi MOR on EMR + S3. Result: 8× faster CDC ingestion, 50% S3 cost reduction (no rewrite amplification), real-time inventory analytics via Hudi incremental queries. Compaction runs hourly via Airflow; reads stay fast because compaction merges logs into base."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"ByteDance Production Case (ByteDance Eng 2022):"})," Video event ingestion at 5M events/sec (TikTok video views, likes, comments). All CDC from internal MySQL + Kafka. Hudi MOR on Trino + S3 + Flink streaming ingestion. The CDC pattern: Debezium → Kafka → Flink → Hudi MOR. Compaction runs every 15 minutes (vs default hourly) due to high write volume."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Hudi 1.0 (2023):"})," Major release — added record-level MERGE semantics, multi-modal ingestion (concurent writers via non-blocking concurrency control), and the new 'Bucket Index' for predictable write throughput. The 1.0 release positioned Hudi as the production lakehouse for operational analytics — vs Iceberg's analytics-only positioning."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Hudi + Flink connector (2020):"})," Flink became the recommended streaming engine for Hudi (vs Spark Structured Streaming). Flink's checkpoint + 2PC guarantees exactly-once delivery from Kafka → Hudi. The connector handles async compaction via Flink's scheduler — no separate Airflow job needed."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Hudi vs Iceberg vs Delta convergence (2024):"})," All three now support UPSERT, schema evolution, time travel, compaction. The differentiators are narrowing. Hudi's MOR is the unique advantage — Iceberg/Delta use delete files (v2 / row-level deletes) instead of log files, which works but isn't as fast for pure streaming-CDC. Hudi 1.0's record-level MERGE adds another performance lever that Iceberg/Delta don't have yet."]})]})}),(0,t.jsx)(i.SectionCard,{title:"My deeper thought: Hudi's MOR IS LSM-trees for object storage",description:"The unifying view: Hudi's MOR table is structurally an LSM-tree (Log-Structured Merge-tree) layered on top of object storage. The base Parquet files are the L0 (SSTable); the delta log files are the LSM's MemTable flushes; async compaction is the LSM's level compaction.",icon:(0,t.jsx)(v.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Hudi's MOR IS an LSM-tree on S3."})," LevelDB, RocksDB, Cassandra, HBase all use LSM-trees: writes append to a MemTable (in-memory); flush creates an SSTable (immutable on disk); background compaction merges SSTables. Hudi's MOR is the same pattern, just with S3 as the disk: writes append to delta logs (MemTable-equivalent); flush creates a delta log file (SSTable-equivalent); async compaction merges delta logs into a new base file (level compaction). The pattern is identical — the innovation is recognising that LSM-trees work on object storage where individual file appends are atomic."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"COW IS B-tree page rewrite."})," COW is the classic B-tree write pattern — every upsert rewrites the affected page (in Hudi's case, the entire Parquet file). The tradeoff is the same as B-tree vs LSM: B-trees (COW) are read-fast, write-slow; LSMs (MOR) are write-fast, read-slow until compaction. Hudi's innovation is exposing BOTH options as table properties — Iceberg and Delta only have the COW-equivalent (rewrite on update); Hudi's MOR is unique. The Iceberg v2 spec's row-level deletes are a halfway-house — delete files are smaller than full rewrites but still not as fast as Hudi's log-appends."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Hudi's .hoodie/ timeline IS Iceberg's snapshot log."})," Both formats keep an append-only log of commits — Hudi uses millisecond timestamps as instant IDs, Iceberg uses monotonic integers as snapshot IDs, Delta uses monotonic integers as version N. The difference is naming convention, not structure. All three support time travel by reading the log as-of a point; all three support incremental queries (Hudi FOR SYSTEM_TIME FROM/TO, Iceberg's incremental scan, Delta's CDF). The pattern is identical; the syntax differs."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Hudi's incremental queries ARE database logical replication."})," Hudi's FOR SYSTEM_TIME FROM 'instant' TO 'instant' returns only the rows changed in that window — this is exactly what PostgreSQL's logical replication slot does (emit only changed rows to subscribers), what Debezium does (emit row-level changes from WAL to Kafka), what Delta's CDF does. All four are the same pattern — emit a delta stream from the WAL/log to downstream consumers. Hudi's innovation was making this a first-class query feature, vs others treating it as a separate replication system."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Hudi's niche IS operational analytics."})," Iceberg/Delta are analytics-first — they assume append-heavy workloads with occasional upserts. Hudi is upsert-first — it assumes CDC-heavy workloads where every write is an upsert. This positions Hudi for the operational analytics use case: live dashboards on operational data (inventory, orders, user state) where the source is MySQL/PostgreSQL and the refresh latency needs to be minutes, not hours. The other formats handle this too, but Hudi's MOR is uniquely optimised for it. The 2024 trend is convergence — Iceberg/Delta adding delete files (Hudi-like), Hudi adding analytics features (Iceberg-like). The format battle is becoming a tie; the catalog battle (Glue vs Unity vs Polaris) is the new frontier."]})]})}),(0,t.jsxs)(f.DeeperThoughtSection,{pageTitle:"Apache Hudi",children:[(0,t.jsx)(f.DeeperThought,{title:"Apache Hudi IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Apache Hudi is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Apache Hudi connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Apache Hudi sits in the computational-science landscape."})}),(0,t.jsx)(f.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Apache Hudi) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(f.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(f.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(f.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(c.RelatedTopics,{topics:[{id:"iceberg",reason:"Sibling open table format (Netflix origin, analytics-first)"},{id:"delta-lake",reason:"Sibling open table format (Databricks origin)"},{id:"data-lakehouse",reason:"Anchor concept page — lake→lakehouse evolution"},{id:"glue",reason:"AWS-native catalog + ETL for Hudi tables"},{id:"catalogs",reason:"Glue vs Hive vs Nessie vs Unity vs Polaris comparison"},{id:"streaming",reason:"Flink + Kafka CDC → Hudi streaming ingestion"},{id:"databricks",reason:"Spark as a compute engine for Hudi"},{id:"arrow",reason:"Parquet = columnar file format underneath Hudi"}]}),(0,t.jsx)(o.ResearchDemo,{pageId:"hudi"}),(0,t.jsx)(n.TrendAnticipation,{pageId:"hudi"}),(0,t.jsx)(s.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"iceberg",reason:"Sibling open table format (Netflix origin, analytics-first)"},{id:"delta-lake",reason:"Sibling open table format (Databricks origin)"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,u.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (sibling format, Netflix origin)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,u.hrefFor)("delta-lake"),className:"text-sm text-primary hover:underline",children:"→ Delta Lake (sibling format, Databricks origin)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,u.hrefFor)("data-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Data Lakehouse (concept anchor)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,u.hrefFor)("streaming"),className:"text-sm text-primary hover:underline",children:"→ Streaming (Kafka + Flink CDC → Hudi)"})]})]})}e.s(["HudiPage",()=>D])}]);