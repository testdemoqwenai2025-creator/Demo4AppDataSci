(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,10264,e=>{"use strict";var t=e.i(843476),a=e.i(522016),r=e.i(271645),s=e.i(846932),i=e.i(862824),o=e.i(342046),l=e.i(921371),n=e.i(580296),d=e.i(122836),c=e.i(716675),m=e.i(59938),u=e.i(158960),h=e.i(741500),p=e.i(901752),f=e.i(487486),g=e.i(332017),b=e.i(828579),x=e.i(852008),v=e.i(658041),y=e.i(227516),D=e.i(21218),_=e.i(691385),k=e.i(178583),w=e.i(25652),j=e.i(283086),S=e.i(966992),C=e.i(618393),N=e.i(727927);let T=`-- ============================================================
-- Delta Lake — Databricks open table format
--   _delta_log/ — JSON transaction log + Parquet checkpoint
--   ACID, time travel, CDF, Z-Order, Liquid Clustering
-- ============================================================

-- Create a Delta table (default in Databricks 9+)
CREATE TABLE delta.orders_fct (
  order_id        BIGINT,
  customer_id     BIGINT,
  order_ts        TIMESTAMP,
  ship_country    STRING,
  amount_usd      DECIMAL(18, 4),
  currency        STRING,
  is_deleted      BOOLEAN
)
USING DELTA
PARTITIONED BY (date(order_ts))
TBLPROPERTIES (
  'delta.enableChangeDataFeed' = 'true',     -- emit change events for downstream
  'delta.deletedFileRetentionDuration' = 'interval 30 days',
  'delta.logRetentionDuration'       = 'interval 90 days',
  'delta.dataSkippingNumIndexedCols'  = '32',  -- stats for data skipping
  'delta.feature.liquidClustering'    = 'supported'  -- Liquid Clustering (2024)
);

-- Time travel — read as-of a specific version or timestamp
SELECT * FROM delta.orders_fct VERSION AS OF 42;
SELECT * FROM delta.orders_fct TIMESTAMP AS OF '2024-09-01 10:00:00';

-- Describe history — see all commits, operations, users
DESCRIBE HISTORY delta.orders_fct
  ORDER BY timestamp DESC LIMIT 10;
-- Output columns: version, timestamp, operation, operationParameters,
--                  operationMetrics (numOutputRows, numTargetRows, ...),
--                  userMetadata, engineInfo

-- Vacuum — physical delete old data files no longer referenced
-- Keeps only files used in the last 168h (default) — reduces S3 cost
VACUUM delta.orders_fct RETAIN 168 HOURS DRY RUN;
VACUUM delta.orders_fct RETAIN 168 HOURS;  -- actual delete

-- OPTIMIZE + Z-Order — compact small files + co-locate data by columns
-- Z-Order lays out data so WHERE clauses on multiple columns hit fewer files
OPTIMIZE delta.orders_fct
  ZORDER BY (ship_country, customer_id);

-- Liquid Clustering (2024+) — replaces Z-Order
-- Background, incremental, multi-column — no full-table rewrite
ALTER TABLE delta.orders_fct
  CLUSTER BY (ship_country, customer_id);
-- Clustering happens automatically on writes — no OPTIMIZE needed

-- MERGE INTO — upsert with full SQL semantics
MERGE INTO delta.orders_fct AS t
USING staging.orders_stream AS s
ON t.order_id = s.order_id
WHEN MATCHED AND s.op = 'DELETE' THEN DELETE
WHEN MATCHED AND s.op = 'UPDATE' THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;

-- Change Data Feed (CDF) — read row-level changes for downstream CDC
SELECT * FROM table_changes('delta.orders_fct', 42, 50);
-- Output: _change_type (insert/update_preimage/update_postimage/delete),
--         _commit_version, _commit_timestamp, ... + all table columns`,E=`# ============================================================
# Delta Lake — Python (delta-rs, no JVM needed)
#   pip install deltalake
# ============================================================

from deltalake import DeltaTable, write_deltalake
import pyarrow as pa
import pyarrow.compute as pc
from datetime import datetime, timezone

# --- Write a batch to Delta (creates _delta_log/ on S3) ---
arrow_table = pa.table({
    "order_id":      pa.array([1, 2, 3, 4, 5], pa.int64()),
    "customer_id":   pa.array([101, 102, 103, 104, 105], pa.int64()),
    "order_ts":      pa.array(
        ["2024-09-01 10:00", "2024-09-01 11:00", "2024-09-02 09:30",
         "2024-09-03 14:20", "2024-09-03 18:45"],
        pa.timestamp("us"),
    ),
    "ship_country":  ["UK", "EU", "US", "UK", "EU"],
    "amount_usd":    pa.array([125.50, 89.99, 250.00, 45.00, 310.75],
                              pa.decimal128(18, 4)),
    "currency":      ["GBP", "EUR", "USD", "GBP", "EUR"],
    "is_deleted":    [False] * 5,
})

# Append — Delta writes new Parquet data file + JSON transaction log entry
write_deltalake(
    table_or_uri="s3://moderndatascieng-delta/orders_fct",
    data=arrow_table,
    mode="append",
    partition_by=["order_ts"],  # partition by date (uses day transform)
    storage_options={
        "aws_access_key_id":     os.environ["AWS_ACCESS_KEY_ID"],
        "aws_secret_access_key": os.environ["AWS_SECRET_ACCESS_KEY"],
        "region":                "eu-west-1",
    },
    configuration={
        "delta.enableChangeDataFeed": "true",
        "delta.dataSkippingNumIndexedCols": "32",
    },
)

# --- Load the Delta table (transaction log + checkpoints) ---
dt = DeltaTable(
    "s3://moderndatascieng-delta/orders_fct",
    storage_options={...},
)

# Get the latest version
print(f"Current version: {dt.version()}")
print(f"Schema: {dt.schema().json()}")

# Time-travel read — load as-of version 5
dt_v5 = DeltaTable(
    "s3://moderndatascieng-delta/orders_fct",
    storage_options={...},
    version=5,
)
arrow_v5 = dt_v5.to_pyarrow_table()
print(f"Version 5 had {arrow_v5.num_rows} rows")

# Time-travel as-of timestamp
dt_asof = DeltaTable(
    "s3://moderndatascieng-delta/orders_fct",
    storage_options={...},
    min_timestamp=datetime(2024, 9, 1, 12, 0, 0, tzinfo=timezone.utc),
)

# --- Optimize — compact small files (uses delta-rs optimizer) ---
dt.optimize.compact(
    partition_filters=[("order_ts", "=", "2024-09-01")],
)
# Files in that partition merged into ~1 GB target files

# --- Vacuum — delete old files beyond retention ---
dt.vacuum(retention_hours=168, dry_run=True)
# Lists files that would be deleted; no S3 writes

# --- Read CDF (Change Data Feed) — row-level changes ---
cdf = dt.load_cdf(
    starting_version=5,
    ending_version=10,
)
for chunk in cdf:
    print(f"Chunk: {chunk.num_rows} changes — types: {chunk['_change_type'].to_pylist()}")

# --- Transaction log inspection ---
log = dt.log_queue()  # generator of Delta JSON entries
for entry in log:
    print(f"v{entry['version']}: {entry['metaData']['operation']} "
          f"by {entry['metaData']['userName']}")`,A=`-- ============================================================
-- Flink + Delta Lake — exactly-once streaming writes
-- Uses Flink's DeltaSink with 2-phase commit on checkpoint
-- ============================================================

-- Source: Kafka topic with CDC events (Debezium)
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
  'connector'           = 'kafka',
  'topic'                = 'orders.cdc',
  'properties.bootstrap.servers' = 'kafka:9092',
  'format'               = 'debezium-json',
  'scan.startup.mode'    = 'earliest-offset'
);

-- Sink: Delta table (exactly-once via 2PC on checkpoint)
CREATE TABLE delta.orders_fct (
  order_id        BIGINT,
  customer_id     BIGINT,
  order_ts        TIMESTAMP(3),
  ship_country    STRING,
  amount_usd      DECIMAL(18, 4),
  currency        STRING,
  is_deleted      BOOLEAN,
  PRIMARY KEY (order_id) NOT ENFORCED
) WITH (
  'connector'                      = 'delta',
  'table-path'                     = 's3://moderndatascieng-delta/orders_fct',
  'mode'                           = 'upsert',  -- MERGE instead of append
  'write.parquet.compression'      = 'zstd',
  'delta.enableChangeDataFeed'     = 'true',
  'delta.appendOnly'               = 'false'
);

-- CDC → Delta MERGE pipeline (exactly-once via checkpoint commits)
INSERT INTO delta.orders_fct
SELECT
  order_id, customer_id, order_ts, ship_country, amount_usd, currency,
  op = 'DELETE' AS is_deleted
FROM kafka.orders_cdc;

-- Hourly OPTIMIZE — compaction (run via Airflow)
-- CALL sys.run_optimize('s3://moderndatascieng-delta/orders_fct')`;function I(){let[e,a]=(0,r.useState)("commit_3"),i={commit_1:{label:"v1: CREATE TABLE",desc:"First commit — initial metadata, no data files",level:0},commit_2:{label:"v2: INSERT 5 rows",desc:"Append — added 1 Parquet file (file-001.parquet)",level:1},commit_3:{label:"v3: MERGE (CDC)",desc:"Upsert — added file-002.parquet + delete-delta-001.parquet",level:2},commit_4:{label:"v4: OPTIMIZE",desc:"Compaction — added file-003.parquet (merged), removed file-001, file-002",level:3},checkpoint:{label:"Checkpoint (Parquet)",desc:"_delta_log/00000000000000000003.checkpoint.parquet — full snapshot at v3",level:4},data_1:{label:"file-001.parquet",desc:"Initial 5 rows (committed at v2, removed at v4)",level:5},data_2:{label:"file-002.parquet",desc:"CDC upsert rows (committed at v3, removed at v4)",level:5},data_3:{label:"file-003.parquet",desc:"Compacted 5k rows (committed at v4 — current)",level:5}},o={commit_1:{x:80,y:30},commit_2:{x:160,y:70},commit_3:{x:240,y:110},commit_4:{x:320,y:150},checkpoint:{x:80,y:150},data_1:{x:100,y:200},data_2:{x:220,y:200},data_3:{x:340,y:200}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(y.History,{className:"h-3.5 w-3.5 text-primary"}),"Delta _delta_log/ — JSON commit log + Parquet checkpoint + data files"]})}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsxs)("svg",{viewBox:"0 0 420 240",className:"w-full h-auto",children:[[["commit_1","commit_2"],["commit_2","commit_3"],["commit_3","commit_4"],["commit_3","checkpoint"],["commit_2","data_1"],["commit_3","data_2"],["commit_4","data_3"]].map(([e,a],r)=>{let s=o[e],i=o[a];return(0,t.jsx)("line",{x1:s.x,y1:s.y+12,x2:i.x,y2:i.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#delta-arrow)"},r)}),Object.entries(o).map(([r,o])=>{let l=e===r,n=i[r],d=4===n.level?"var(--chart-3)":5===n.level?"var(--chart-4)":0===n.level?"var(--chart-2)":"var(--chart-1)";return(0,t.jsxs)(s.motion.g,{onMouseEnter:()=>a(r),onMouseLeave:()=>a(null),animate:{scale:l?1.05:1},style:{cursor:"pointer"},children:[(0,t.jsx)("rect",{x:o.x-55,y:o.y-10,width:"110",height:"22",rx:"3",fill:l?d+"30":"var(--background)",stroke:d,strokeWidth:l?1.5:.8}),(0,t.jsx)("text",{x:o.x,y:o.y+4,textAnchor:"middle",fontSize:"7",fill:l?d:"var(--foreground)",fontWeight:l?"bold":"normal",children:n.label})]},r)}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"delta-arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,t.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:i[e].label}),(0,t.jsx)("p",{className:"text-muted-foreground",children:i[e].desc})]}),!e&&(0,t.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node — Delta's _delta_log/ is structurally a write-ahead log with periodic Parquet checkpoints (same pattern as PostgreSQL's WAL)."})]})]})}let L=`# ============================================================
# Delta Transaction Log replay — in-browser simulation
# Build a synthetic Delta table from scratch:
#   1. Create _delta_log/ JSON entries
#   2. Replay the log to materialise the current table state
#   3. Time-travel read as-of any version
#   4. Vacuum old files beyond retention
# ============================================================

import json
import random
from collections import defaultdict

class ParquetDataFile:
    def __init__(self, path, n_rows, stats):
        self.path = path
        self.n_rows = n_rows
        self.stats = stats  # {col: {min, max, null_count}}
        self.added_at_version = None
        self.removed_at_version = None
    def __repr__(self):
        return f"Parquet({self.path}, rows={self.n_rows})"

class DeltaLog:
    """The _delta_log/ folder — JSON entries per commit + Parquet checkpoints."""
    def __init__(self, table_path):
        self.table_path = table_path
        self.commits = []  # list of {version, timestamp, operation, add: [], remove: []}
        self.next_version = 0

    def commit(self, operation, add_files=None, remove_files=None, metadata=None):
        version = self.next_version
        self.next_version += 1
        commit = {
            'version': version,
            'timestamp': 1234567890 + version * 60,
            'operation': operation,
            'add': add_files or [],
            'remove': remove_files or [],
            'metadata': metadata or {},
        }
        self.commits.append(commit)
        # Track which files were added/removed at this version
        for f in commit['add']:
            f.added_at_version = version
        for f in commit['remove']:
            f.removed_at_version = version
        print(f"[Delta] v{version}: {operation} "
              f"(+{len(commit['add'])} files, -{len(commit['remove'])} files)")
        return version

    def replay_to(self, version):
        """Walk the log from v0 to 'version' to materialise current files."""
        active_files = set()
        for v in range(version + 1):
            commit = self.commits[v]
            for f in commit['remove']:
                active_files.discard(f)
            for f in commit['add']:
                active_files.add(f)
        return active_files

    def current_files(self):
        return self.replay_to(self.next_version - 1)

    def checkpoint(self, at_version):
        """Write a Parquet checkpoint — full snapshot of metadata at version."""
        # In real Delta: writes _delta_log/<version>.checkpoint.parquet
        # Reader can skip JSON entries up to <version> by reading checkpoint
        active = self.replay_to(at_version)
        print(f"[Delta] Checkpoint at v{at_version}: {len(active)} active files")
        return {'version': at_version, 'active_files': active}

class DeltaTable:
    """A Delta table — combines _delta_log/ + Parquet data files."""
    def __init__(self, path):
        self.path = path
        self.log = DeltaLog(path)

    def create(self, schema, partition_cols):
        return self.log.commit('CREATE TABLE', metadata={
            'schema': schema, 'partition_cols': partition_cols
        })

    def insert(self, files):
        return self.log.commit('INSERT', add_files=files)

    def merge_upsert(self, new_files, deleted_files):
        return self.log.commit('MERGE', add_files=new_files,
                                remove_files=deleted_files)

    def optimize(self, files_to_merge, new_file):
        return self.log.commit('OPTIMIZE',
            add_files=[new_file], remove_files=files_to_merge)

    def vacuum(self, retain_versions=5):
        """Physical delete files no longer referenced in last N versions."""
        # A file is safe to delete if it was removed BEFORE current_version - retain_versions
        # AND no reader could be using it.
        cutoff_version = self.log.next_version - retain_versions
        deleted = []
        for v in range(cutoff_version):
            for f in self.log.commits[v]['add']:
                if f.removed_at_version is not None and \\
                   f.removed_at_version < cutoff_version:
                    deleted.append(f)
        print(f"[Delta] VACUUM (retain {retain_versions} versions): "
              f"{len(deleted)} files eligible for S3 delete")
        return deleted

    def time_travel(self, version):
        """Read the table as-of a specific version."""
        return self.log.replay_to(version)

# --- Build a synthetic Delta table ---
random.seed(42)
table = DeltaTable("s3://moderndatascieng-delta/orders_fct")

# v0: CREATE TABLE
table.create(
    schema={'order_id': 'BIGINT', 'order_ts': 'TIMESTAMP', 'amount': 'DECIMAL'},
    partition_cols=['date(order_ts)']
)

# v1: INSERT 3 files
files_v1 = []
for i in range(3):
    files_v1.append(ParquetDataFile(
        path=f"s3://bucket/data/file-{i}.parquet",
        n_rows=random.randint(1000, 5000),
        stats={'order_ts': {'min': f'2024-09-0{i+1}', 'max': f'2024-09-0{i+1}'}}
    ))
table.insert(files_v1)

# v2: MERGE (CDC upsert — 1 new file added, 1 old file removed)
new_file = ParquetDataFile(
    path="s3://bucket/data/file-cdc-001.parquet",
    n_rows=2000,
    stats={'order_ts': {'min': '2024-09-01', 'max': '2024-09-04'}}
)
table.merge_upsert(new_files=[new_file], deleted_files=[files_v1[0]])

# v3: OPTIMIZE — compact 2 small files into 1
merged_file = ParquetDataFile(
    path="s3://bucket/data/file-opt-001.parquet",
    n_rows=sum([f.n_rows for f in [files_v1[1], files_v1[2], new_file]]),
    stats={'order_ts': {'min': '2024-09-02', 'max': '2024-09-04'}}
)
table.optimize(files_to_merge=[files_v1[1], files_v1[2], new_file],
                new_file=merged_file)

print()
print("=== Transaction log replay ===")
print(f"  Total commits: {len(table.log.commits)}")
print(f"  Current version: {table.log.next_version - 1}")
current_files = table.current_files()
print(f"  Current active files: {len(current_files)}")
print(f"  Total rows: {sum(f.n_rows for f in current_files):,}")

print()
print("=== Time travel — read as-of version 1 (before MERGE) ===")
v1_files = table.time_travel(1)
print(f"  v1 active files: {len(v1_files)}")
print(f"  v1 total rows: {sum(f.n_rows for f in v1_files):,}")
for f in sorted(v1_files, key=lambda x: x.path):
    print(f"    {f.path}  rows={f.n_rows}")

print()
print("=== Vacuum — physical delete files beyond 5 versions ===")
table.vacuum(retain_versions=5)

print()
print("=== Checkpoint — periodic snapshot ===")
table.log.checkpoint(at_version=table.log.next_version - 1)

print()
print("Key insight: Delta's _delta_log/ is structurally a write-ahead log.")
print("Each commit is a JSON entry: add/remove file ops + metadata.")
print("Parquet checkpoints compact the log periodically (like PostgreSQL WAL segments).")`;function R(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(b.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Delta Lake vs Iceberg vs Hudi — three sibling open table formats"]})}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/30",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Delta Lake"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Iceberg"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Hudi"})]})}),(0,t.jsx)("tbody",{children:[{feature:"Origin",delta:"Databricks (2017)",iceberg:"Netflix (2017)",hudi:"Uber (2016)"},{feature:"File format",delta:"Parquet only",iceberg:"Parquet, ORC, Avro",hudi:"Parquet, ORC"},{feature:"Transaction log",delta:"JSON + Parquet checkpoint",iceberg:"metadata.json + Avro manifests",hudi:".hoodie/ timeline (instants)"},{feature:"Time travel",delta:"VERSION AS OF N",iceberg:"VERSION AS OF N",hudi:"Instant time"},{feature:"Schema evolution",delta:"Full (column IDs since v3)",iceberg:"Full (column IDs)",hudi:"Full"},{feature:"Compaction",delta:"OPTIMIZE (manual) + Liquid Clustering (auto)",iceberg:"rewrite_data_files (manual)",hudi:"Native hoodie compact"},{feature:"Z-Order / clustering",delta:"Z-Order + Liquid Clustering (2024)",iceberg:"Sort Order + Z-Order (2023)",hudi:"Clustering keys (2023)"},{feature:"Change Data Feed",delta:"CDF (first-class)",iceberg:"Incremental scan (v2)",hudi:"Native change-logs"},{feature:"Catalog",delta:"Unity, Hive, S3",iceberg:"REST, Glue, Hive, Nessie, Unity",hudi:"Hive, Glue, REST"},{feature:"Compute engines",delta:"Spark, Flink, delta-rs, Trino, Presto, DuckDB",iceberg:"Spark, Trino, Flink, DuckDB, Athena, Snowflake, Impala",hudi:"Spark, Flink, Trino, Hive"},{feature:"Best fit",delta:"Databricks ecosystem",iceberg:"General-purpose lakehouse",hudi:"Streaming CDC"},{feature:"Adoption",delta:"All Databricks customers",iceberg:"Netflix, Apple, Stripe",hudi:"Uber, Walmart, ByteDance"}].map((e,a)=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,t.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.delta}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.iceberg}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.hudi})]},a))})]})})]})}let P=[{label:"Origin",value:"Databricks 2017",hint:"Born at Databricks (formerly TACHYON project) to bring ACID to S3-based Spark data lakes",deltaTone:"flat"},{label:"Production scale",value:"EB-scale",hint:"Every Databricks customer — Uber, Netflix, Airbnb, JPMorgan, Shopify, countless enterprises",deltaTone:"up"},{label:"Transaction log",value:"JSON + Parquet checkpoint",hint:"_delta_log/ holds JSON commit entries + periodic Parquet checkpoints — structurally a WAL",deltaTone:"flat"},{label:"Compute engines",value:"6+",hint:"Spark (Databricks) · Flink · Trino · Presto · DuckDB · delta-rs (pure Python)",deltaTone:"up"}];function O(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(i.PageHeader,{eyebrow:"Delta Lake · Databricks open format · ACID on S3 · transaction log · time travel · CDF · Liquid Clustering",title:"Delta Lake — the open table format that started the lakehouse movement",description:"Delta Lake is Databricks' open-source table format that gives ACID transactions to S3/ADLS/GCS object storage. Born 2017 at Databricks (then called TACHYON), it pioneered the lakehouse pattern — the same Parquet files you'd put on S3 for a Hadoop-style data lake, now wrapped with a transaction log (_delta_log/) that adds atomic commits, time travel, schema evolution, MERGE INTO upserts, Change Data Feed (CDF), Z-Order data skipping, and Liquid Clustering (2024). Delta is the most widely-deployed open table format because every Databricks customer uses it by default. Outside Databricks, delta-rs (pure Rust/Python implementation) and Trino/Presto/DuckDB connectors extend Delta to non-Databricks stacks. Apache Iceberg is the sibling format (Netflix origin, vendor-neutral) — converging on feature parity.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(f.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(x.Layers,{className:"h-3 w-3"})," Delta v3"]}),(0,t.jsxs)(f.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(y.History,{className:"h-3 w-3"})," Time travel"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:P.map(e=>(0,t.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(i.SectionCard,{title:"Transaction log — _delta_log/ is a write-ahead log",description:"Delta's transaction log is structurally identical to a database's WAL. Each commit is a JSON entry in _delta_log/0000000000000000000N.json, recording add/remove file operations + commit metadata. Periodic Parquet checkpoints (every ~10 commits by default) compact the log so readers don't have to replay every JSON entry. VACUUM physically deletes old data files beyond retention (default 7 days); OPTIMIZE compacts small files into ~1 GB targets; Z-Order co-locates data for multi-column WHERE clauses; Liquid Clustering (2024) replaces Z-Order with incremental, automatic clustering.",icon:(0,t.jsx)(_.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,t.jsx)(I,{})}),(0,t.jsx)(i.SectionCard,{title:"Delta SQL — create, time-travel, MERGE, OPTIMIZE, VACUUM, CDF",description:"Databricks SQL/Delta covers the full lifecycle: create a Delta table (USING DELTA) with CDF + Liquid Clustering enabled, time travel (VERSION AS OF N / TIMESTAMP AS OF), DESCRIBE HISTORY to see commit metadata, VACUUM to physically delete old files, OPTIMIZE ZORDER BY for multi-column data skipping, ALTER TABLE CLUSTER BY for Liquid Clustering (2024, replaces Z-Order), MERGE INTO for upserts, table_changes() to read Change Data Feed.",icon:(0,t.jsx)(v.Database,{className:"h-5 w-5"}),badge:"Delta SQL",children:(0,t.jsx)(d.CodeBlock,{code:T,language:"sql",filename:"delta_lake.sql",highlight:[12,13,14,15,16,17,18,19,20,21,22,25,26,29,30,33,34,39,40,43,44,47,48,53,54,62,63,64,65]})}),(0,t.jsx)(i.SectionCard,{title:"delta-rs — pure-Python/Rust client (no JVM, no Databricks)",description:"delta-rs is the open-source Rust implementation of the Delta Lake protocol, exposed via Python bindings (pip install deltalake). Lets you read/write Delta tables from Python without spinning up a Databricks or Spark cluster. Perfect for: lightweight ETL jobs, notebook analytics on production Delta tables, CI/CD pipelines that inspect lake data, ad-hoc analytics on laptops. Same protocol as Databricks — fully interchangeable.",icon:(0,t.jsx)(S.Cpu,{className:"h-5 w-5"}),badge:"delta-rs",children:(0,t.jsx)(d.CodeBlock,{code:E,language:"python",filename:"delta_rs.py",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,51,52,53,54,55,56,57,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79]})}),(0,t.jsx)(i.SectionCard,{title:"Flink + Delta — exactly-once streaming CDC writes",description:"Flink's DeltaSink implements two-phase commit on Flink checkpoint, making Delta writes exactly-once. Combined with Debezium CDC source on Kafka, this is the standard CDC-to-lake pipeline in the Databricks ecosystem. mode='upsert' triggers Delta MERGE instead of append — perfect for incremental upserts of operational data.",icon:(0,t.jsx)(D.Activity,{className:"h-5 w-5"}),badge:"Flink SQL",children:(0,t.jsx)(d.CodeBlock,{code:A,language:"sql",filename:"delta_flink.sql",highlight:[18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]})}),(0,t.jsx)(i.SectionCard,{title:"Try it: replay a Delta transaction log in your browser (Pyodide)",description:"Pure-Python simulation of Delta's _delta_log/ — build a synthetic Delta table from scratch: CREATE TABLE → INSERT → MERGE upsert → OPTIMIZE compaction → checkpoint → time-travel read → VACUUM old files. See exactly how the WAL pattern works for object-storage Parquet files.",icon:(0,t.jsx)(j.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(c.PyodideRunner,{code:L,buttonLabel:"Run Delta log replay (Pyodide)"})}),(0,t.jsx)(i.SectionCard,{title:"Delta vs Iceberg vs Hudi — three sibling open table formats",description:"Three formats, all born 2016-2017 to fix Hive's lack of ACID on object storage. Delta (Databricks origin) emphasises Spark-first integration and Databricks ecosystem. Iceberg (Netflix origin) emphasises vendor-neutral catalogs and hidden partitioning. Hudi (Uber origin) is the upsert-first specialist for CDC-heavy workloads. The three are converging on feature parity (Liquid Clustering vs Iceberg Sort Order vs Hudi Clustering Keys); the choice is increasingly driven by ecosystem fit.",icon:(0,t.jsx)(b.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(R,{})}),(0,t.jsx)(i.SectionCard,{title:"Why Delta evolved — shortfalls of Hive-on-S3 (Era 2)",description:"Databricks launched Delta Lake in 2017 (open-sourced 2019) to fix three critical shortfalls of Hive-on-S3 that broke analytical workloads on cloud object storage. Delta layered an ACID transaction log over Parquet files, the same primitive Iceberg and Hudi chose independently.",icon:(0,t.jsx)(y.History,{className:"h-5 w-5"}),badge:"Why Delta",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: No ACID on S3."})," Hive-on-S3 had no atomic commit — concurrent writers clobbered each other, appends were visible mid-write, and an interrupted job left torn Parquet files visible to readers. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Delta's ",(0,t.jsx)("code",{className:"font-mono",children:"_delta_log/"})," JSON commit log uses compare-and-swap on the latest version file; only one writer wins, others retry. Atomic multi-file commits make S3 look transactional."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: Slow MERGE for upserts."})," Hive required rewriting the entire partition for a single-row CDC update — updating one customer record on a 1 TB partition meant rewriting 1 TB. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Delta MERGE does row-level predicate pushdown — only affected Parquet files are rewritten, the rest are untouched. MERGE on a 10-row update to a 10 TB table rewrites only a few files."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: Schema drift broke downstream."})," Hive bound schema to Parquet file footers — adding a column with a different type silently broke readers. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Delta stores schema in the transaction log with explicit IDs; ",(0,t.jsx)("code",{className:"font-mono",children:"ALTER TABLE"})," is metadata-only, old readers see the old schema, new readers see the new one. Add/drop/rename columns without rewriting data."]})]})}),(0,t.jsx)(i.SectionCard,{title:"Truly unique Delta features (vs Iceberg + Hudi)",description:"Four Delta capabilities that no other open table format has matched — they reflect Databricks' Spark-native + research-heavy DNA. Delta is the only format with a pure-Rust client, a multidim clustering primitive, and a streaming CDF.",icon:(0,t.jsx)(j.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Liquid Clustering (2023)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Multi-dimensional adaptive clustering — re-cluster only the affected stripes on write, no ",(0,t.jsx)("code",{children:"OPTIMIZE"})," job needed. ",(0,t.jsx)("strong",{children:"Iceberg Sort Order is single-dim; Hudi Clustering Keys are static."})," Liquid replaced Z-Order as the default Databricks layout."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. CDF (Change Data Feed)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Built-in CDC stream — ",(0,t.jsx)("code",{children:"table_changes()"})," returns inserted/updated/deleted rows as a streaming source. ",(0,t.jsx)("strong",{children:"Iceberg + Hudi both rely on extra config or incremental queries."})," CDF is the only native CDC-from-table feature among the three."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Z-Order multidim"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Z-Order interleaves multiple high-cardinality columns (e.g. user_id, event_ts) into a single sort key — range queries on any Z-ordered column skip most files. ",(0,t.jsx)("strong",{children:"Iceberg Sort Order is one column; Hudi has no multidim primitive."})," Superseded by Liquid Clustering but still widely deployed."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. delta-rs (pure Rust)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Pure-Rust implementation — write Delta tables from Python, Rust, JS without a JVM or Spark. ",(0,t.jsx)("strong",{children:"Iceberg has pyiceberg + Rust bindings; Hudi has hudi-rs."})," delta-rs is the most mature, used by Polars, Daft, LanceDB natively."]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"3 large-dataset examples — cards with 5-language code popups",description:"Three production-style Delta scenarios (MERGE upsert, Liquid Clustering, CDF streaming). Each is a clickable card opening a lazy popup with: scenario brief, dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,t.jsx)(v.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,t.jsx)(u.DatasetCards,{examples:h.DELTA_EXAMPLES,intro:"Production-style ACID upsert + Liquid Clustering + CDF streaming scenarios on Delta Lake. Each card has Scala/Rust/Go/Elixir/Zig code with Delta-specific primitives (MERGE, CDF, Z-Order, delta-rs)."})}),(0,t.jsx)(i.SectionCard,{title:"Computational tooling — the Delta ecosystem",description:"Delta's ecosystem is Spark-centric but delta-rs has opened it to non-JVM engines. Compute (8+ engines) and catalog (1 native + 3 federated) — Databricks Unity is the canonical catalog, but Delta tables on S3/ADLS/GCS can be queried by any engine that reads the _delta_log.",icon:(0,t.jsx)(C.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(S.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute engines (8+)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Spark 3.5+ (delta-spark)"})," — primary write engine, PySpark/Scala/SQL/R"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"delta-rs (Python/Rust)"})," — pure-Rust writer, no JVM (used by Polars/Daft/LanceDB)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Flink (delta-connector)"})," — streaming CDC ingestion + exactly-once sinks"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Trino 425+ (Delta connector)"})," — federated SQL reads"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Presto / Starrocks / Apache Doris"})," — lakehouse reads via Delta connector"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Athena / Glue"})," — AWS-managed reads on Delta tables on S3"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Beam"})," — batch + streaming pipelines writing Delta"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"DuckDB (delta extension)"})," — laptop-scale analytics (community)"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(N.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Catalogs + integrations (5)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Databricks Unity Catalog"})," — native Delta catalog, column-level RBAC, lineage"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Hive Metastore"})," — legacy path (self-hosted, DDL-driven)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"AWS Glue Data Catalog"})," — Delta tables on S3 registered into Glue"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Snowflake (external Delta)"})," — Snowflake reads external Delta on S3/ADLS"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Polars / Daft / LanceDB"})," — pure-Rust readers via delta-rs, no cluster"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Kafka + Delta (Delta Sink connector)"})," — exactly-once CDC ingest from Kafka"]})]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Research + production case studies",description:"The Armbrust 2020 lakehouse paper is the academic foundation; the Databricks + Uber + Airbnb engineering blogs document production scale.",icon:(0,t.jsx)(k.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Armbrust et al. 2020 (CIDR):"})," \"Lakehouse: A New Generation of Open Platforms that Make Data-Pluralism the Norm.\" The foundational academic paper, written by Databricks founders. Argued that the data lake + warehouse split was a historical accident — open table formats (Delta, Iceberg, Hudi) could give lakes the ACID + SQL + schema semantics of warehouses, while keeping cheap S3 storage. Delta is the format that this paper is built around — and the paper is what makes 'lakehouse' a category."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Apache Delta Lake origin (Databricks 2017, Apache 2019):"})," Databricks created Delta internally (codename TACHYON) to fix their customers' pain with Hive on S3 — no ACID, slow MERGE, schema evolution broke queries. Open-sourced 2019, joined Apache Foundation 2023 (still in incubation). Delta's killer feature was CDF (Change Data Feed) — emits row-level changes for downstream CDC consumers, avoiding the need for separate Kafka topics."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Liquid Clustering (Databricks 2023):"})," Replaces Z-Order with incremental, automatic, multi-column clustering. Z-Order requires a full-table OPTIMIZE rewrite; Liquid Clustering happens automatically on every write — new files are clustered incrementally. Major perf win for tables with multi-dimensional WHERE clauses (e.g. ",(0,t.jsx)("code",{className:"font-mono",children:"WHERE ship_country='UK' AND order_ts >= current_date - 7"}),")."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"delta-rs (2022):"})," Pure Rust implementation of Delta protocol — no JVM, no Databricks. Used by Polars, DuckDB, Flink, Trino to read/write Delta tables natively. Made Delta accessible outside Databricks; before delta-rs, Delta was effectively Databricks-only."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Uber Production Case (Uber Eng 2022):"})," Uber uses Delta on top of their internal Petabyte-scale S3-compatible lake. Their production pattern: Debezium CDC from MySQL → Kafka → Flink → Delta (with CDF). CDF replaces their previous Kafka-only CDC pattern; downstream consumers (ML feature stores, real-time analytics) read CDF directly without Kafka."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Airbnb Production Case (Airbnb Eng 2021):"})," Migrated ~5PB of Hive tables to Delta on Databricks. Result: 4× faster MERGE operations, zero-downtime schema evolution (added 100+ columns to production tables without rewriting any Parquet file), 60% S3 cost reduction via VACUUM (default 7-day retention deleted ~40% of historical files)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Databricks Unity Catalog (2021):"})," Centralised governance layer for Delta tables — column-level access control, lineage tracking, audit logs. Replaces the per-table IAM + per-workspace ACL model that Databricks used before. Unity is the catalog that competes with Glue/Nessie/Polaris; the table-format battle (Delta vs Iceberg) is largely won in Databricks' favour inside Databricks accounts."]})]})}),(0,t.jsx)(i.SectionCard,{title:"My deeper thought: Delta's transaction log IS a PostgreSQL WAL",description:"The unifying view: Delta's _delta_log/ is structurally identical to PostgreSQL's pg_wal/ — a write-ahead log with periodic checkpoints. Every Delta commit IS a database transaction; every VACUUM IS a PostgreSQL VACUUM; every OPTIMIZE IS a PostgreSQL ANALYZE.",icon:(0,t.jsx)(w.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Delta's _delta_log/ IS a PostgreSQL WAL."})," PostgreSQL writes WAL segments to pg_wal/ — JSON-like commit records. Delta writes JSON entries to _delta_log/ — same pattern. PostgreSQL checkpoints (write WAL to data files) on a configurable interval; Delta writes Parquet checkpoints every ~10 commits. PostgreSQL VACUUM deletes dead tuples beyond MVCC horizon; Delta VACUUM deletes unreferenced Parquet files beyond retention window. There is nothing exotic here — Delta applied 40-year-old database patterns to object storage. The innovation is choosing to expose them as user-visible features (DESCRIBE HISTORY, VERSION AS OF) instead of internal optimisations."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Z-Order IS multidimensional B-tree on Parquet."})," Z-Order (Morton order) maps multidimensional coordinates to a 1-D sequence while preserving locality — used in PostgreSQL BRIN indexes, MongoDB 2D indexes, and Delta's OPTIMIZE ZORDER BY. The fundamental insight: if WHERE clauses filter on multiple columns, laying out data so that rows with similar (col_a, col_b) values are physically adjacent means a single file scan returns most matches. Z-Order is the multidimensional extension of B-tree sorting — applied to Parquet row groups. Liquid Clustering (2024) replaces it with an online clustering algorithm that doesn't require a full OPTIMIZE rewrite."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Change Data Feed IS logical replication."})," PostgreSQL's logical replication (since v10) emits row-level change events to a WAL slot; downstream consumers (Kafka Connect, Debezium) read the slot. Delta's CDF does the same — emits row-level changes (insert/update_preimage/update_postimage/delete) to a system-readable view. Downstream consumers (Flink jobs, ML feature stores, dashboards) read CDF instead of polling the table. The pattern is identical to logical replication; Delta's innovation is making it a first-class table property ('delta.enableChangeDataFeed' = 'true')."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Liquid Clustering IS online B-tree rebuild."})," Z-Order requires a full-table OPTIMIZE — O(n) cost per compaction. Liquid Clustering (2024) is incremental — new writes go to clustered files automatically, no full rewrite. This is the same pattern as PostgreSQL's online B-tree rebuild (autovacuum processes small portions of the index continuously) vs the old VACUUM FULL (rewrites the entire table in one go). The evolution from Z-Order to Liquid Clustering mirrors the database world's evolution from VACUUM FULL to autovacuum. Same idea, 40 years later, applied to object storage."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Delta IS to Databricks what Unity Catalog IS to Databricks — both lock-in."})," Delta is technically open (Apache), but the best compute engine for Delta is Spark-on-Databricks (Databricks wrote both). Unity Catalog is technically open (Apache), but the best catalog for Delta is Unity-on-Databricks. The two together create a vertical stack that locks customers in. Snowflake's counter-bet (Polaris catalog + Iceberg tables + Snowflake compute) is the explicit open alternative — same stack, different vendor. Iceberg is winning the open-format battle outside Databricks because it's vendor-neutral from day one, while Delta is vendor-neutral only on paper (Databricks owns the reference implementation)."]})]})}),(0,t.jsx)(i.SectionCard,{title:"Related Elegant Code — the math that walks across disciplines",description:"This page's math appears in unexpected places. The Elegant Code cards show the same equation in 3+ sciences — click to explore the collision.",icon:(0,t.jsx)(j.Sparkles,{className:"h-5 w-5"}),badge:"Cross-domain",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-1 gap-3",children:[(0,t.jsxs)(a.default,{href:(0,p.hrefFor)("elegant-code"),className:"group flex items-start gap-3 rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary",children:"22"}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-medium group-hover:text-primary transition-colors",children:"Bloom Filter"}),(0,t.jsx)("p",{className:"text-[10px] font-mono text-muted-foreground mt-0.5",children:"P(fp) = (1 - e^(-kn/m))^k"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1 leading-relaxed",children:"Delta Lake attaches Bloom filters to data files for skip-ahead reads — same algorithm as Chrome Safe Browsing and genome read dedup."})]})]}),(0,t.jsxs)(a.default,{href:(0,p.hrefFor)("elegant-code"),className:"group flex items-start gap-3 rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary",children:"24"}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-medium group-hover:text-primary transition-colors",children:"LSM-Tree Compaction"}),(0,t.jsx)("p",{className:"text-[10px] font-mono text-muted-foreground mt-0.5",children:"WA = (L+1)/L"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1 leading-relaxed",children:"Delta Lake Auto Compaction (18,400→12 files) IS the same merge-sort as RocksDB SSTable compaction. Write amplification 1.25× vs B-tree's 4-10×."})]})]})]})}),(0,t.jsxs)(g.DeeperThoughtSection,{pageTitle:"Delta Lake",children:[(0,t.jsx)(g.DeeperThought,{title:"Delta Lake IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Delta Lake is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Delta Lake connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Delta Lake sits in the computational-science landscape."})}),(0,t.jsx)(g.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Delta Lake) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(g.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(g.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(g.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(m.RelatedTopics,{topics:[{id:"iceberg",reason:"Sibling open table format (Netflix origin, vendor-neutral)"},{id:"hudi",reason:"Sibling open table format (Uber origin, upsert-first)"},{id:"data-lakehouse",reason:"Anchor concept page — lake→lakehouse evolution"},{id:"glue",reason:"AWS-native alternative (Hive catalog + Parquet on S3)"},{id:"catalogs",reason:"Unity vs Glue vs Nessie vs Polaris comparison"},{id:"databricks",reason:"Spark + Delta is the Databricks stack"},{id:"streaming",reason:"Flink CDC → Delta with CDF"},{id:"arrow",reason:"Parquet = columnar file format underneath Delta"}]}),(0,t.jsx)(l.ResearchDemo,{pageId:"delta-lake"}),(0,t.jsx)(n.TrendAnticipation,{pageId:"delta-lake"}),(0,t.jsx)(o.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"iceberg",reason:"Sibling open table format (Netflix origin, vendor-neutral)"},{id:"hudi",reason:"Sibling open table format (Uber origin, upsert-first)"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,p.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (sibling format, Netflix origin)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,p.hrefFor)("hudi"),className:"text-sm text-primary hover:underline",children:"→ Apache Hudi (sibling format, Uber origin)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,p.hrefFor)("data-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Data Lakehouse (concept anchor)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,p.hrefFor)("catalogs"),className:"text-sm text-primary hover:underline",children:"→ Catalogs comparison (Unity vs Glue vs Nessie vs Polaris)"})]})]})}e.s(["DeltaLakePage",()=>O])}]);