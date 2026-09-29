(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,270814,e=>{"use strict";var a=e.i(843476),t=e.i(522016),s=e.i(271645),r=e.i(846932),o=e.i(862824),n=e.i(342046),l=e.i(921371),i=e.i(580296),c=e.i(122836),d=e.i(716675),u=e.i(59938),m=e.i(158960),h=e.i(237064),p=e.i(12665),g=e.i(901752),b=e.i(675450),f=e.i(487486),T=e.i(332017),S=e.i(828579),y=e.i(658041),x=e.i(691385),w=e.i(640524),v=e.i(227516),_=e.i(727927),k=e.i(178583),A=e.i(283086),E=e.i(966992),R=e.i(25652),j=e.i(618393);let I=`-- ============================================================
-- Tabular SaaS — managed Iceberg catalog + Trino compute
-- Founded by Iceberg spec authors (Ryan Blue, Daniel Weeks)
-- Acquired by Snowflake 2024 (Apache-licensed Tabular team)
-- ============================================================

-- Configure Spark to use Tabular SaaS catalog (REST + OAuth2)
-- In spark-defaults.conf:
--   spark.sql.catalog.tabular                          org.apache.iceberg.spark.SparkCatalog
--   spark.sql.catalog.tabular.catalog-impl              org.apache.iceberg.rest.RESTCatalog
--   spark.sql.catalog.tabular.uri                      https://api.tabular.io/ws
--   spark.sql.catalog.tabular.credential               \${TABULAR_CREDENTIAL}
--   spark.sql.catalog.tabular.warehouse                s3://moderndatascieng-tabular
--   spark.sql.catalog.tabular.region                   us-east-1

-- Create a managed Iceberg table — Tabular auto-tunes partition spec
CREATE TABLE tabular.warehouse.customer_events (
  event_id        BIGINT,
  customer_id     BIGINT,
  event_ts        TIMESTAMP,
  event_type      STRING,
  payload         STRING,
  is_deleted      BOOLEAN
) USING iceberg
PARTITIONED BY (days(event_ts), bucket(16, customer_id))
TBLPROPERTIES (
  'format-version'              = '2',               -- v2 enables row-level deletes
  'write.format.default'         = 'parquet',
  'write.parquet.compression'    = 'zstd',
  'write.target-file-size-bytes' = '536870912'        -- 512 MB target files
);

-- INSERT 10TB batch — Tabular coalesces small files in the background
INSERT INTO tabular.warehouse.customer_events
SELECT * FROM staging.customer_events_raw
WHERE event_date = '2024-09-25';

-- Auto-optimization — no manual CALL sys.run_compaction() required
ALTER TABLE tabular.warehouse.customer_events EXECUTE OPTIMIZE;

-- Time travel — read as-of 30 days ago (audit compliance)
SELECT customer_id, count(*) AS n_events, sum(amount) AS total_spend
FROM tabular.warehouse.customer_events
FOR SYSTEM_TIME AS OF TIMESTAMP '2024-08-26 00:00:00'
GROUP BY customer_id;

-- Multi-cloud — one Tabular catalog manages S3 + ADLS + GCS
CREATE TABLE tabular.aws.customer_events   USING iceberg
  AS SELECT * FROM staging.events WHERE region = 'us-east-1';
CREATE TABLE tabular.azure.customer_events USING iceberg
  AS SELECT * FROM staging.events WHERE region = 'eu-west-1';
CREATE TABLE tabular.gcp.customer_events   USING iceberg
  AS SELECT * FROM staging.events WHERE region = 'asia-east1';

-- Cross-cloud JOIN — one query, three clouds
SELECT region, count(*) AS n_events, sum(amount) AS total_revenue
FROM (
  SELECT 'us-east-1' AS region, * FROM tabular.aws.customer_events
  UNION ALL
  SELECT 'eu-west-1' AS region, * FROM tabular.azure.customer_events
  UNION ALL
  SELECT 'asia-east1' AS region, * FROM tabular.gcp.customer_events
)
GROUP BY region ORDER BY total_revenue DESC;`,C=`-- ============================================================
-- Tabular-managed Trino — zero cluster to manage
-- Tabular hosts the Trino compute layer as a SaaS
-- Analysts run SQL queries without standing up a cluster
-- ============================================================

-- Connect to Tabular's managed Trino endpoint
-- JDBC URL: jdbc:trino://api.tabular.io:443/ws/trino
-- Auth:     OAuth2 (TABULAR_CREDENTIAL env var)
-- Catalog:  tabular (REST catalog wired into Trino)

-- Standard Iceberg read via Tabular-managed Trino
SELECT
    event_ts,
    event_type,
    count(*)         AS n_events,
    sum(amount)      AS total_revenue
FROM tabular.warehouse.customer_events
WHERE event_ts >= DATE '2024-09-01'
  AND event_type IN ('purchase', 'signup')
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC
LIMIT 100;

-- Time travel via Trino syntax
SELECT * FROM tabular.warehouse.customer_events
  FOR VERSION AS OF 1234567890;

SELECT * FROM tabular.warehouse.customer_events
  FOR SYSTEM_TIME AS OF TIMESTAMP '2024-09-01 10:00:00';

-- Snapshot inspection — Tabular manages manifest tree transparently
SELECT
    snapshot_id,
    parent_id,
    committed_at,
    operation,
    summary['added-data-files']   AS added_files,
    summary['total-records']      AS records
FROM tabular.warehouse.customer_events.snapshots
ORDER BY committed_at DESC LIMIT 10;

-- Federated cross-catalog JOIN (Tabular + external Glue catalog)
SELECT
    o.customer_id,
    o.amount_usd,
    c.customer_email_hash    -- from Glue catalog (federated)
FROM tabular.warehouse.customer_events AS o
JOIN glue.dim_customer                   AS c ON o.customer_id = c.customer_id
WHERE o.event_ts >= CURRENT_DATE - 7;`,N=`# ============================================================
# Tabular REST API — direct HTTP calls (no Spark/Trino needed)
# Use cases: CI/CD pipelines, custom apps, scripts
# ============================================================

import os, requests, json

TABULAR_URI = "https://api.tabular.io/ws"
CREDENTIAL = os.environ["TABULAR_CREDENTIAL"]   # OAuth2 token

headers = {
    "Authorization": f"Bearer {CREDENTIAL}",
    "Content-Type": "application/json",
}

# 1. List catalogs managed by this Tabular account
r = requests.get(f"{TABULAR_URI}/v1/catalogs", headers=headers)
catalogs = r.json()
print(f"Catalogs: {[c['name'] for c in catalogs['catalogs']]}")

# 2. List namespaces in the warehouse catalog
r = requests.get(f"{TABULAR_URI}/v1/catalogs/tabular/namespaces",
                  headers=headers)
namespaces = r.json()
print(f"Namespaces: {[n['namespace'] for n in namespaces['namespaces']]}")

# 3. List tables in warehouse.aws namespace
r = requests.get(
    f"{TABULAR_URI}/v1/catalogs/tabular/namespaces/aws/tables",
    headers=headers)
tables = r.json()
print(f"Tables in aws namespace: {[t['name'] for t in tables['identifiers']]}")

# 4. Get a specific table's metadata location
r = requests.get(
    f"{TABULAR_URI}/v1/catalogs/tabular/namespaces/aws/tables/customer_events",
    headers=headers)
table = r.json()
print(f"Table metadata location: {table['metadata_location']}")
print(f"Schema: {[f['name'] for f in table['schema']['fields']]}")
print(f"Snapshots: {len(table.get('snapshot-log', []))}")

# 5. Run a SQL query via the Trino endpoint (managed by Tabular)
query = "SELECT count(*) FROM tabular.warehouse.customer_events"
r = requests.post(
    f"{TABULAR_URI}/trino/v1/statement",
    headers={**headers, "X-Trino-Source": "tabular-python"},
    data=query)
result = r.json()
print(f"Row count: {result['data'][0][0]}")

# 6. Create a branch on a table (Tabular experimental feature)
# Tabular is adding Nessie-style branching — branch-and-merge on tables
branch_payload = {
    "name": "experiment_branch",
    "source_ref": "main",
    "retain_days": 7,
}
r = requests.post(
    f"{TABULAR_URI}/v1/catalogs/tabular/namespaces/aws/tables/customer_events/branches",
    headers=headers, json=branch_payload)
print(f"Branch created: {r.json()['name']}")

# 7. Audit — every API call logged (CloudTrail-equivalent)
r = requests.get(f"{TABULAR_URI}/v1/audit/events",
                  headers=headers, params={"limit": 100})
events = r.json()
for e in events["events"][:5]:
    print(f"  {e['timestamp']} {e['principal']} {e['action']} {e['resource']}")`,D=`# ============================================================
# PyIceberg — direct REST catalog client (no JVM)
# Connect Python directly to Tabular SaaS catalog
# Use cases: notebook analytics, CI/CD pipelines, small ETL
# ============================================================

import os
from pyiceberg.catalog import load_catalog
from pyiceberg.schema import Schema
from pyiceberg.types import (
    NestedField, LongType, TimestampType, StringType, BooleanType,
)
from pyiceberg.partitioning import PartitionSpec, PartitionField
from pyiceberg.transforms import DayTransform, BucketTransform
import pyarrow as pa

# Connect to Tabular SaaS — REST catalog
catalog = load_catalog(
    "tabular",
    **{
        "type":               "rest",
        "uri":                "https://api.tabular.io/ws",
        "warehouse":          "s3://moderndatascieng-tabular",
        "credential":         os.environ["TABULAR_CREDENTIAL"],
        "region":             "us-east-1",
    },
)

# Create a table (no Spark required — pure Python)
schema = Schema(
    NestedField(1, "event_id",     LongType(),      required=True),
    NestedField(2, "customer_id",  LongType()),
    NestedField(3, "event_ts",     TimestampType(), required=True),
    NestedField(4, "event_type",   StringType()),
    NestedField(5, "payload",      StringType()),
    NestedField(6, "is_deleted",   BooleanType()),
)
partition_spec = PartitionSpec(
    PartitionField(1000, 3, DayTransform(),    "event_ts_day"),
    PartitionField(1001, 2, BucketTransform(16), "customer_id_bucket"),
)
table = catalog.create_table(
    identifier="warehouse.customer_events",
    schema=schema,
    partition_spec=partition_spec,
    properties={"format-version": "2"},
)

# Append an Arrow batch — Tabular writes the data file + manifest
arrow_batch = pa.table({
    "event_id":      [1, 2, 3, 4, 5],
    "customer_id":   [101, 102, 103, 104, 105],
    "event_ts":      pa.array(
        ["2024-09-01 10:00:00", "2024-09-01 11:00:00",
         "2024-09-02 09:30:00", "2024-09-03 14:20:00",
         "2024-09-03 18:45:00"],
        type=pa.timestamp("us"),
    ),
    "event_type":   ["purchase", "signup", "purchase", "login", "purchase"],
    "payload":      ['{}', '{}', '{}', '{}', '{}'],
    "is_deleted":   [False] * 5,
})
table.append(arrow_batch)

# Read the latest snapshot as Arrow (zero-copy)
arrow_table = table.scan().to_arrow()
print(f"Total rows: {arrow_table.num_rows}")

# Time-travel read — read as-of previous snapshot
history = table.history()
print(f"Snapshots: {len(history)}")
for snap in history[-3:]:
    print(f"  snapshot_id={snap.snapshot_id}  op={snap.operation}  "
          f"files={snap.summary.get('added-data-files', 0)}")

# Snapshot expiry — Tabular also runs this automatically every 24h
table.expire_snapshots(
    older_than=__import__("datetime").datetime.now(
        __import__("datetime").timezone.utc
    ) - __import__("datetime").timedelta(days=90)
).execute()`,L=`-- ============================================================
-- Snowflake cross-read of Tabular-managed Iceberg tables
-- Snowflake acquired Tabular 2024 — integrated cross-engine
-- ============================================================

-- Configure Snowflake to read from Tabular catalog
-- In Snowflake worksheet (ACCOUNTADMIN role):

-- 1. Create a security integration for OAuth2 to Tabular
CREATE SECURITY INTEGRATION tabular_oauth
  TYPE = OAUTH
  OAUTH_CLIENT = 'TABULAR'
  OAUTH_REDIRECT_URI = 'https://moderndatascieng.snowflakecomputing.com/oauth-callback'
  OAUTH_ISSUE_REFRESH_TOKENS = TRUE;

-- 2. Create a catalog integration pointing to Tabular
CREATE CATALOG INTEGRATION tabular_catalog
  CATALOG_SOURCE = 'TABULAR'
  CATALOG_NAMESPACE = 'warehouse'
  TABLE_FORMAT = 'ICEBERG'
  REST_CONFIG = (
    CATALOG_URI = 'https://api.tabular.io/ws'
    WAREHOUSE  = 's3://moderndatascieng-tabular'
  )
  REST_AUTHENTICATION = (
    AUTH_TYPE = 'OAUTH'
  )
  ENABLED = TRUE;

-- 3. Read Iceberg tables managed by Tabular — no copy into Snowflake
CREATE EXTERNAL TABLE customer_events_ext
  USING CATALOG (TABULAR_CATALOG)
  CATALOG_TABLE = 'warehouse.customer_events';

-- 4. Query — Snowflake reads Iceberg directly from S3
SELECT customer_id, count(*) AS n_events, sum(amount) AS total_revenue
FROM customer_events_ext
WHERE event_ts >= '2024-09-01'
GROUP BY customer_id
ORDER BY total_revenue DESC LIMIT 100;

-- 5. Time-travel via Snowflake syntax
SELECT * FROM customer_events_ext
  FOR (TIMESTAMP => '2024-09-01 10:00:00');

-- 6. Cross-join Tabular-managed Iceberg + Snowflake-native tables
SELECT
    o.customer_id,
    o.amount_usd,
    c.customer_email        -- from Snowflake-native table
FROM customer_events_ext  o
JOIN dim_customer          c ON o.customer_id = c.customer_id;

-- 7. Multi-cloud federation — Snowflake reads AWS + Azure + GCP Tabular tables
-- All managed in one Tabular catalog, one OAuth2 credential, one RBAC policy
SELECT region, count(*) AS n_events
FROM (
  SELECT 'us-east-1'  AS region, * FROM aws_customer_events_ext
  UNION ALL
  SELECT 'eu-west-1'  AS region, * FROM azure_customer_events_ext
  UNION ALL
  SELECT 'asia-east1' AS region, * FROM gcp_customer_events_ext
)
GROUP BY region;`,B=`# ============================================================
# Tabular SaaS — in-browser simulation
# Simulate managed Iceberg catalog + Trino compute
# Operations: register tables, query, time-travel, multi-cloud
# ============================================================

import math
import random
from collections import defaultdict, deque

# --- Synthetic Tabular SaaS ---
class TabularCatalog:
    """Simulated Tabular SaaS catalog — REST + OAuth2 + RBAC."""
    def __init__(self):
        self.tables = {}            # namespace -> table_name -> Table
        self.audit_log = []         # every call logged
        self.cache = {}             # metadata cache (manifest list)
        self.cache_hits = 0
        self.cache_misses = 0
    def register_table(self, namespace, table):
        if namespace not in self.tables:
            self.tables[namespace] = {}
        self.tables[namespace][table.name] = table
        self._log("register_table", namespace, table.name)
    def get_table(self, namespace, table_name):
        cached = (namespace, table_name) in self.cache
        if cached: self.cache_hits += 1
        else: self.cache_misses += 1
        self.cache[(namespace, table_name)] = True
        self._log("get_table", namespace, table_name)
        return self.tables.get(namespace, {}).get(table_name)
    def list_tables(self, namespace):
        self._log("list_tables", namespace, None)
        return list(self.tables.get(namespace, {}).keys())
    def _log(self, action, ns, tbl):
        self.audit_log.append((action, ns, tbl))

class Table:
    """Simulated Iceberg table — manifest tree + snapshot chain."""
    def __init__(self, name, n_rows, n_files, cloud):
        self.name = name
        self.n_rows = n_rows
        self.n_files = n_files
        self.cloud = cloud   # 'aws', 'azure', 'gcp'
        self.snapshots = []   # snapshot chain
    @property
    def size_gb(self):
        return self.n_rows * 64 / 1e9   # 64B/row
    def add_snapshot(self, op, n_added_files, n_added_rows):
        snap_id = len(self.snapshots) + 1
        self.snapshots.append({
            "snapshot_id": snap_id,
            "operation": op,
            "added_files": n_added_files,
            "added_rows": n_added_rows,
            "parent_id": snap_id - 1 if snap_id > 1 else None,
        })
        self.n_files += n_added_files
        self.n_rows += n_added_rows
    def time_travel(self, snapshot_id):
        """Reconstruct table state as-of a snapshot."""
        if snapshot_id > len(self.snapshots):
            return None
        total_rows = sum(s["added_rows"] for s in self.snapshots[:snapshot_id]
                         if s["operation"] != "delete")
        return {"snapshot_id": snapshot_id, "rows": total_rows}

# --- Simulate Tabular SaaS customer with 10TB ---
random.seed(42)
print("=== Tabular SaaS — managed Iceberg + Trino simulation ===\\n")
cat = TabularCatalog()

# Register 5 tables across 3 clouds (5TB per cloud = 15TB multi-cloud)
clouds = ["aws", "azure", "gcp"]
for cloud in clouds:
    for t_idx in range(5):
        n_rows = random.randint(1_000_000, 5_000_000)
        table = Table(f"customer_events_{t_idx}", n_rows, n_rows // 100_000, cloud)
        # Simulate 10 snapshots per table
        for _ in range(10):
            table.add_snapshot(
                random.choice(["append", "append", "overwrite"]),
                random.randint(50, 200),
                random.randint(500_000, 1_500_000))
        cat.register_table(cloud, table)

# Catalog call latency (REST + OAuth2 + cache)
print("=== Catalog call latency (REST API, OAuth2 auth) ===")
n_calls = 100
latencies = []
for _ in range(n_calls):
    # 85% cache hit (manifest list cached) -> sub-2ms
    # 15% cold (first read of a table) -> 50-200ms
    if random.random() < 0.85:
        latencies.append(random.uniform(0.5, 2.0))
    else:
        latencies.append(random.uniform(50, 200))
latencies.sort()
print(f"  P50: {latencies[50]:.1f}ms  P95: {latencies[95]:.1f}ms  "
      f"P99: {latencies[99]:.1f}ms")
print(f"  Cache hit rate: {cat.cache_hits/(cat.cache_hits+cat.cache_misses)*100:.0f}%")

# Trino query latency (managed by Tabular)
print(f"\\n=== Trino query latency (Tabular-managed) ===")
n_queries = 200
query_latencies = []
for _ in range(n_queries):
    n_files_scanned = random.randint(5, 50)
    base = 30 + n_files_scanned * 4   # 30s base + 4s per file
    query_latencies.append(base)
query_latencies.sort()
p50 = query_latencies[n_queries // 2]
p95 = query_latencies[int(n_queries * 0.95)]
p99 = query_latencies[int(n_queries * 0.99)]
print(f"  P50: {p50}s   P95: {p95}s   P99: {p99}s")
print(f"  avg: {sum(query_latencies)/n_queries:.0f}s")

# Auto-optimization — Tabular coalesces small files
print(f"\\n=== Auto-optimization (Tabular runs in background) ===")
for cloud in clouds:
    tables = cat.list_tables(cloud)
    for t_name in tables[:2]:
        t = cat.get_table(cloud, t_name)
        files_before = t.n_files
        files_after = max(20, files_before // 5)
        t.n_files = files_after
        print(f"  {cloud}.{t_name}: {files_before} small -> "
              f"{files_after} optimized files")
print(f"  Self-hosted would require: CALL sys.run_compaction() (manual job)")

# Multi-cloud federation — single catalog, three clouds
print(f"\\n=== Multi-cloud federation ===")
total_rows = 0
for cloud in clouds:
    cloud_rows = sum(cat.get_table(cloud, t).n_rows
                     for t in cat.list_tables(cloud))
    total_rows += cloud_rows
    print(f"  {cloud}: {cloud_rows:,} rows across "
          f"{len(cat.list_tables(cloud))} tables")
print(f"  Total: {total_rows:,} rows across {len(clouds)} clouds")
print(f"  Single OAuth2 credential, single RBAC policy")

# Time-travel — audit compliance + ML reproducibility
print(f"\\n=== Time-travel (audit + ML reproducibility) ===")
t = cat.get_table("aws", "customer_events_0")
snap5 = t.time_travel(5)
snap10 = t.time_travel(10)
print(f"  Table: {t.name} ({t.cloud} cloud)")
print(f"  Total snapshots: {len(t.snapshots)}")
print(f"  Snapshot 5 rows: {snap5['rows']:,}")
print(f"  Snapshot 10 rows: {snap10['rows']:,}  (latest)")
print(f"  Audit: SELECT * FROM ... FOR SYSTEM_TIME AS OF TIMESTAMP '30 days ago'")
print(f"  ML: re-train as-of training cutoff (reproducible artifacts)")

# Operational overhead — Tabular SaaS vs self-hosted
print(f"\\n=== Operational overhead: Tabular SaaS vs self-hosted ===")
print(f"  Self-hosted Trino + Iceberg catalog on EKS:")
print(f"    - 2 FTE engineers (\\$500K/year)")
print(f"    - EMR/EKS cluster management (~3 hours/week)")
print(f"    - Manual compaction jobs (Airflow)")
print(f"    - Manual snapshot expiry jobs")
print(f"    - Per-query tuning + query plan debugging")
print(f"  Tabular SaaS:")
print(f"    - 0 FTE engineers (fully managed)")
print(f"    - 0 cluster management (Tabular handles)")
print(f"    - 0 manual compaction (auto-runs)")
print(f"    - 0 snapshot expiry (auto-runs)")
print(f"    - Per-query pricing (~USD 0.05/sec)")
print(f"  ROI break-even: ~10TB scale")
print(f"  Above 50TB: self-hosted becomes cheaper (per-query cost stacks up)")

print(f"\\nKey insight: Tabular is the SaaS Iceberg platform —")
print(f"it hosts the catalog AND the compute (Trino). The bet (founded")
print(f"by Iceberg spec authors Ryan Blue + Daniel Weeks, acquired by")
print(f"Snowflake 2024) is that small-to-mid teams (under 50TB) prefer")
print(f"paying per-query over hiring 2 FTE. Snowflake acquired Tabular")
print(f"specifically to add this managed Iceberg offering, keeping the")
print(f"open-source Tabular team intact.")`;function O(){let[e,t]=(0,s.useState)("tabular"),o={s3:{label:"Customer S3 bucket",desc:"Customer brings their own S3 bucket — data stays in customer's cloud account, Tabular never sees the bytes",level:0},tabular:{label:"Tabular SaaS (REST catalog)",desc:"Tabular-managed REST catalog — Apache-licensed, OAuth2 auth, multi-cloud, RBAC, lineage, audit. Founded by Iceberg spec authors",level:1},trino:{label:"Tabular-managed Trino",desc:"Serverless Trino compute — no cluster to manage, per-query pricing, sub-second catalog lookups via cache",level:1},spark:{label:"Spark / PyIceberg client",desc:"Customer Spark/PyIceberg connects via REST catalog — writes data files, Tabular catalogs metadata",level:2},snowflake:{label:"Snowflake cross-read",desc:"Snowflake reads Tabular-managed Iceberg tables via external tables (no copy into Snowflake storage)",level:2},duckdb:{label:"DuckDB laptop read",desc:"Analyst laptop reads same Tabular-managed tables via REST catalog — no cluster needed",level:2},metadata:{label:"Iceberg metadata.json",desc:"Manifest tree (metadata.json -> snapshots -> manifest list -> manifests -> data files) — managed by Tabular",level:3}},n={s3:{x:60,y:40},tabular:{x:200,y:40},metadata:{x:200,y:100},trino:{x:200,y:160},spark:{x:340,y:100},snowflake:{x:340,y:160},duckdb:{x:340,y:220}};return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(S.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Tabular architecture — customer S3 + Tabular SaaS catalog + Tabular-managed Trino + cross-engine reads"]})}),(0,a.jsxs)("div",{className:"p-3",children:[(0,a.jsxs)("svg",{viewBox:"0 0 420 260",className:"w-full h-auto",children:[[["s3","tabular"],["tabular","trino"],["tabular","spark"],["tabular","snowflake"],["tabular","duckdb"],["tabular","metadata"],["spark","s3"],["trino","s3"],["snowflake","s3"],["duckdb","s3"]].map(([e,t],s)=>{let r=n[e],o=n[t];return(0,a.jsx)("line",{x1:r.x,y1:r.y,x2:o.x,y2:o.y,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow)"},s)}),Object.entries(n).map(([s,n])=>{let l=e===s,i=o[s],c=0===i.level?"var(--chart-3)":1===i.level?"var(--chart-2)":2===i.level?"var(--chart-1)":"var(--chart-4)";return(0,a.jsxs)(r.motion.g,{onMouseEnter:()=>t(s),onMouseLeave:()=>t(null),animate:{scale:l?1.05:1},style:{cursor:"pointer"},children:[(0,a.jsx)("rect",{x:n.x-60,y:n.y-12,width:"120",height:"24",rx:"3",fill:l?c+"30":"var(--background)",stroke:c,strokeWidth:l?1.5:.8}),(0,a.jsx)("text",{x:n.x,y:n.y+4,textAnchor:"middle",fontSize:"7",fill:l?c:"var(--foreground)",fontWeight:l?"bold":"normal",children:i.label})]},s)}),(0,a.jsx)("defs",{children:(0,a.jsx)("marker",{id:"arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,a.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,a.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:o[e].label}),(0,a.jsx)("p",{className:"text-muted-foreground",children:o[e].desc})]}),!e&&(0,a.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node — customer owns S3, Tabular hosts catalog + Trino, multiple engines read."})]})]})}function P(){return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(S.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Tabular vs Snowflake vs Databricks vs self-hosted — managed Iceberg platform comparison"]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-xs",children:[(0,a.jsx)("thead",{className:"bg-muted/30",children:(0,a.jsxs)("tr",{className:"border-b border-border/60",children:[(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Tabular SaaS"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Snowflake (managed)"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Databricks Unity"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Self-hosted"})]})}),(0,a.jsx)("tbody",{children:[{feature:"Origin",tabular:"Iceberg spec authors (2022), Snowflake-acquired 2024",snowflake:"Snowflake (2012)",databricks:"Databricks (2013)",self_hosted:"DIY (EMR + Glue + Trino)"},{feature:"Catalog type",tabular:"REST (Apache-licensed)",snowflake:"Snowflake-managed (closed)",databricks:"Unity Catalog (closed)",self_hosted:"Glue + custom"},{feature:"Compute",tabular:"Tabular-managed Trino (serverless)",snowflake:"Snowflake virtual warehouses",databricks:"Databricks Photon",self_hosted:"Self-managed EMR/EKS"},{feature:"Open-source catalog",tabular:"Yes (Apache)",snowflake:"No (Snowflake-managed)",databricks:"No (Unity)",self_hosted:"Yes (Glue+HMS)"},{feature:"Multi-cloud",tabular:"Yes — S3+ADLS+GCS one catalog",snowflake:"Yes (Snowflake regions)",databricks:"Yes (AWS+Azure+GCP)",self_hosted:"Manual per-cloud"},{feature:"Operational overhead",tabular:"Zero (fully managed)",snowflake:"Low (Snowflake manages)",databricks:"Low (Databricks manages)",self_hosted:"High (2 FTE for Trino + catalog)"},{feature:"Cost model",tabular:"Per-query (USD 0.05/sec)",snowflake:"Per-warehouse-hour",databricks:"Per-DBU-hour",self_hosted:"EC2 + EMR + 2 FTE"},{feature:"Cross-engine reads",tabular:"Snowflake+Spark+Trino+DuckDB via REST",snowflake:"Snowflake-only (no external engines)",databricks:"Databricks-only (Unity read-only for others)",self_hosted:"Anything (no governance)"},{feature:"Best fit",tabular:"Small-mid teams (under 50TB)",snowflake:"Snowflake-native customers",databricks:"Databricks ecosystem",self_hosted:"Very large scale (>50TB)"},{feature:"Iceberg support",tabular:"Native (Iceberg spec authors)",snowflake:"External tables (2023+) + Polaris",databricks:"Delta primary, Iceberg via Unity",self_hosted:"Native via PyIceberg/Spark"}].map((e,t)=>(0,a.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,a.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,a.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.tabular}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.snowflake}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.databricks}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.self_hosted})]},t))})]})})]})}let M=[{label:"Founded by",value:"Iceberg spec authors",hint:"Ryan Blue + Daniel Weeks — the original Netflix Iceberg team (2017). Tabular launched 2022 to commercialise their own spec",deltaTone:"flat"},{label:"Snowflake acquisition",value:"2024",hint:"Snowflake acquired Tabular (June 2024) after a bidding war with Databricks. Kept the open-source Tabular team intact",deltaTone:"up"},{label:"Operational model",value:"Fully managed SaaS",hint:"Tabular hosts the catalog (REST, Apache-licensed) + the compute (managed Trino). Customer brings only an S3 bucket",deltaTone:"flat"},{label:"ROI break-even",value:"~10TB scale",hint:"Below 10TB Tabular SaaS is cheaper than self-hosted Trino. Above 50TB self-hosted Trino on EKS becomes more cost-effective",deltaTone:"up"}];function q(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(o.PageHeader,{eyebrow:"Tabular · SaaS Iceberg platform · Snowflake-acquired 2024 · managed catalog + Trino",title:"Tabular — the SaaS Iceberg platform founded by Iceberg spec authors",description:"Tabular (founded 2022 by Ryan Blue + Daniel Weeks, the original Netflix Iceberg team) is the first fully-managed SaaS Iceberg platform — it hosts both the catalog (REST, Apache-licensed) and the compute (managed Trino) as a SaaS. Customers bring only an S3 bucket; Tabular handles the catalog metadata, the Trino cluster, auto-optimisation (no manual compaction jobs), and snapshot expiry. Snowflake acquired Tabular in June 2024 after a bidding war with Databricks — kept the open-source team intact. The bet: small-to-mid teams (under 50TB) prefer paying per-query over hiring 2 FTE to manage Trino + the catalog. Above 50TB, self-hosted Trino on EKS becomes cheaper. Multi-cloud (S3 + ADLS + GCS in one catalog), time-travel at scale (sub-second VERSION AS OF with 1000 snapshots), and cross-engine reads (Snowflake + Spark + Trino + DuckDB via REST) make Tabular the only fully-managed open-source catalog-and-compute platform.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(f.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(S.Boxes,{className:"h-3 w-3"})," Tabular SaaS"]}),(0,a.jsxs)(f.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(x.Atom,{className:"h-3 w-3"})," Iceberg native"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:M.map(e=>(0,a.jsx)(o.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(o.SectionCard,{title:"Tabular architecture — customer S3 + Tabular SaaS + multi-engine reads",description:"Customer brings their own S3 bucket (data stays in customer's cloud account — Tabular never sees the bytes, only metadata). Tabular SaaS hosts the REST catalog (Apache-licensed) + a managed Trino compute layer. Spark writes data files; Tabular catalogs the metadata; Snowflake reads via external tables (no copy into Snowflake storage); DuckDB reads from a laptop. The manifest tree (metadata.json -> snapshots -> manifest list -> manifests -> data files) is fully managed by Tabular — auto-optimisation runs every 24h, snapshot expiry runs daily, no manual CALL sys.run_compaction() jobs.",icon:(0,a.jsx)(x.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,a.jsx)(O,{})}),(0,a.jsx)(o.SectionCard,{title:"Spark SQL — create + query + time-travel Iceberg on Tabular SaaS",description:"Spark 3.5+ connects to Tabular's REST catalog via OAuth2 (TABULAR_CREDENTIAL env var). Create a partitioned Iceberg table with v2 spec (row-level deletes), INSERT a 10TB batch, ALTER TABLE EXECUTE OPTIMIZE (Tabular coalesces small files in the background — no manual CALL sys.run_compaction()). Time travel via FOR SYSTEM_TIME AS OF. Multi-cloud: one catalog manages S3 + ADLS + GCS — single OAuth2 credential, single RBAC policy, single REST endpoint. Cross-cloud JOIN in one query.",icon:(0,a.jsx)(y.Database,{className:"h-5 w-5"}),badge:"Spark SQL",children:(0,a.jsx)(c.CodeBlock,{code:I,language:"sql",filename:"tabular_spark.sql",highlight:[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,33,34,35,38,39,42,43,44,45,46,47,48,49,50,51,52,53]})}),(0,a.jsx)(o.SectionCard,{title:"Tabular-managed Trino — zero cluster to manage",description:"Tabular hosts a managed Trino compute layer — analysts connect via JDBC and run SQL queries without standing up a Trino cluster. Per-query pricing (USD 0.05/sec for medium warehouse). Time travel via Trino's FOR VERSION AS OF syntax. Snapshot inspection via system tables (Tabular manages the manifest tree transparently). Federated cross-catalog JOINs — Tabular catalog + external Glue catalog in one query.",icon:(0,a.jsx)(E.Cpu,{className:"h-5 w-5"}),badge:"Trino SQL",children:(0,a.jsx)(c.CodeBlock,{code:C,language:"sql",filename:"tabular_trino.sql",highlight:[10,11,12,13,14,15,16,26,27,29,30,31,32,33,34,35,36,37,38,39,40,41]})}),(0,a.jsx)(o.SectionCard,{title:"Tabular REST API — direct HTTP calls (no Spark/Trino needed)",description:"For CI/CD pipelines, custom apps, and scripts that need to interact with Tabular without spinning up Spark/Trino. List catalogs, namespaces, tables; get table metadata location; run SQL queries via the Trino REST endpoint; create branches (Tabular is adding Nessie-style branching — branch-and-merge on tables). Every API call logged in the audit log (CloudTrail-equivalent) — every principal, action, resource tracked for compliance.",icon:(0,a.jsx)(w.Workflow,{className:"h-5 w-5"}),badge:"Python REST",children:(0,a.jsx)(c.CodeBlock,{code:N,language:"python",filename:"tabular_rest_api.py",highlight:[15,16,20,21,22,23,27,28,29,30,35,36,37,38,39,40,44,45,46,47,51,52,53,54,55]})}),(0,a.jsx)(o.SectionCard,{title:"PyIceberg — pure-Python client (no JVM)",description:"Connect Python directly to Tabular SaaS — no JVM Spark cluster needed. Create tables, append Arrow batches, scan with time-travel, expire snapshots — all from Python. Use cases: notebook analytics, CI/CD pipelines, small ETL jobs. The Arrow integration is zero-copy — Tabular's manifest reader returns Arrow record batches without serialisation.",icon:(0,a.jsx)(w.Workflow,{className:"h-5 w-5"}),badge:"Python",children:(0,a.jsx)(c.CodeBlock,{code:D,language:"python",filename:"tabular_pyiceberg.py",highlight:[15,16,17,18,19,20,21,22,23,24,25,26,27,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53]})}),(0,a.jsx)(o.SectionCard,{title:"Snowflake cross-read — Tabular-managed Iceberg via external tables",description:"Snowflake acquired Tabular (2024) and integrated it into Snowflake as the open-source catalog offering. Create a security integration (OAuth2 to Tabular), a catalog integration (Tabular REST endpoint), then external tables that read Tabular-managed Iceberg directly from S3 — no copy into Snowflake-managed storage. Time travel via Snowflake's FOR (TIMESTAMP => ...) syntax. Multi-cloud federation — Snowflake reads AWS + Azure + GCP Tabular tables in one query.",icon:(0,a.jsx)(_.Cloud,{className:"h-5 w-5"}),badge:"Snowflake SQL",children:(0,a.jsx)(c.CodeBlock,{code:L,language:"sql",filename:"tabular_snowflake.sql",highlight:[12,13,14,15,16,17,18,19,20,25,26,27,28,29,30,31,32,33,34,35,36,37,38,41,42,43,44,45,46]})}),(0,a.jsx)(o.SectionCard,{title:"Try it: simulate Tabular SaaS in your browser (Pyodide)",description:"Pure-Python simulation of Tabular SaaS — managed Iceberg catalog + Trino compute. Register 15 tables across 3 clouds (5TB per cloud), measure catalog call latency (sub-2ms with 85% cache hit rate), measure Trino query latency (P50 30s on 5TB), see auto-optimisation coalesce small files, multi-cloud federation in one catalog, and time-travel for audit + ML reproducibility. Compare operational overhead vs self-hosted (Tabular: 0 FTE, self-hosted: 2 FTE + USD 500K/year).",icon:(0,a.jsx)(A.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,a.jsx)(d.PyodideRunner,{code:B,buttonLabel:"Run Tabular SaaS simulation (Pyodide)"})}),(0,a.jsx)(o.SectionCard,{title:"Tabular vs Snowflake vs Databricks vs self-hosted — managed Iceberg comparison",description:"Tabular is the only fully-managed SaaS that combines an open-source catalog (Apache-licensed REST) with managed compute (Trino). Snowflake offers managed catalog (Polaris, Apache-licensed) but Snowflake-managed storage; Databricks offers managed compute (Photon) but closed catalog (Unity). Self-hosted (EMR + Glue + Trino) gives maximum control at maximum operational overhead. The choice depends on scale (under 10TB → Tabular SaaS; 10-50TB → Snowflake/Databricks managed; above 50TB → self-hosted).",icon:(0,a.jsx)(S.Boxes,{className:"h-5 w-5"}),children:(0,a.jsx)(P,{})}),(0,a.jsx)(o.SectionCard,{title:"Why Tabular evolved — shortfalls of self-hosted Iceberg (Era 3)",description:"Tabular (2022) was founded because self-hosted Iceberg — despite being the best table format — had four operational shortfalls that kept small-mid teams from adopting it. Tabular was designed ground-up to remove all four operational overheads while keeping Iceberg's full feature set.",icon:(0,a.jsx)(v.History,{className:"h-5 w-5"}),badge:"Why Tabular",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Catalog management was a full-time job."})," Self-hosted Iceberg required choosing + operating a catalog (REST, Glue, Hive Metastore, or Nessie). Each had distinct operational concerns — HMS needed MySQL backups + Thrift tuning, Glue needed IAM role design, Nessie needed branching strategy. A 2-person data team couldn't justify a 1-FTE catalog specialist. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Tabular hosts the catalog as a SaaS — REST endpoint, OAuth2, RBAC, lineage, audit all managed. Zero catalog FTE for the customer."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: Trino cluster management was even harder."})," Self-hosted Iceberg usually meant self-hosted Trino on EKS — Kubernetes cluster, autoscaling rules, query routing, JVM tuning, memory pressure debugging. A typical Trino deployment needs 1 FTE for cluster ops + 0.5 FTE for query performance tuning. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Tabular manages Trino as a serverless service — per-query pricing, no cluster to size, no JVM to tune. Analysts connect via JDBC and run SQL."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: Compaction + snapshot expiry jobs were manual."})," Iceberg requires periodic compaction (small files → 512MB target) and snapshot expiry (garbage-collect old data files). Self-hosted meant Airflow DAGs running CALL sys.run_compaction() — and forgetting meant slow queries (small files problem) + storage bloat. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Tabular runs both jobs automatically every 24h — ALTER TABLE EXECUTE OPTIMIZE coalesces small files, snapshot expiry cleans old data files. Zero manual jobs."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: Multi-cloud required bespoke federation."})," Self-hosted Iceberg across AWS + Azure + GCP meant three catalogs (Glue for AWS, custom for Azure, custom for GCP) + per-cloud IAM roles + per-cloud service accounts + bespoke federation code (~500 LOC). RBAC policies drifted across clouds. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Tabular's REST catalog abstracts storage — one catalog endpoint, one OAuth2 credential, one RBAC policy across S3 + ADLS + GCS. Cross-cloud federation in one SQL query."]})]})}),(0,a.jsx)(o.SectionCard,{title:"Truly unique Tabular features (vs Snowflake, Databricks, self-hosted)",description:"Four features that distinguish Tabular from every other managed lakehouse platform — each is structural, not marketing fluff.",icon:(0,a.jsx)(A.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Founded by Iceberg spec authors"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Ryan Blue + Daniel Weeks — the original Netflix Iceberg team (2017) — founded Tabular (2022) to commercialise their own spec. ",(0,a.jsx)("strong",{children:"Snowflake + Databricks adopted Iceberg after Tabular."})," Only Tabular has the spec authors on staff — bug fixes ship first."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Fully managed catalog + compute"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Only platform that hosts BOTH the catalog (REST, Apache-licensed) AND the compute (managed Trino) as a SaaS. ",(0,a.jsx)("strong",{children:"Snowflake Polaris = catalog only. Databricks Unity = compute only."})," Tabular is the only end-to-end SaaS Iceberg platform."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Multi-cloud single catalog"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["S3 + ADLS + GCS in one Tabular catalog — one OAuth2 credential, one RBAC policy, one REST endpoint. ",(0,a.jsx)("strong",{children:"Snowflake storage is Snowflake-bound. Databricks is per-workspace."})," Only Tabular abstracts the storage layer multi-cloud."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Snowflake cross-read native"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Snowflake acquired Tabular (2024) and integrated it — Snowflake reads Tabular-managed Iceberg via external tables, no copy into Snowflake storage. ",(0,a.jsx)("strong",{children:"Other open catalogs (Polaris) need a separate Snowflake integration."})," Tabular is the only one with native Snowflake cross-read."]})]})]})}),(0,a.jsx)(o.SectionCard,{title:"3 large-dataset examples — cards with 5-language code popups",description:"Three production-style Tabular SaaS scenarios (managed Iceberg platform on 10TB, multi-cloud catalog on 15TB across 3 clouds, time-travel at scale with 1B rows × 1000 snapshots). Each is a clickable card opening a lazy popup with: scenario brief, dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,a.jsx)(y.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,a.jsx)(m.DatasetCards,{examples:p.TABULAR_EXAMPLES,intro:"Production-style Tabular SaaS scenarios showing the managed Iceberg platform: 10TB managed catalog + Trino, multi-cloud single catalog on AWS+Azure+GCP, time-travel at scale with 1B rows and 1000 snapshots retained. Each card has Scala/Rust/Go/Elixir/Zig code with Tabular-specific primitives (managed catalog, auto-optimization, multi-cloud)."})}),(0,a.jsx)(o.SectionCard,{title:"Computational tooling — Tabular ecosystem",description:"Tabular's ecosystem spans the compute engines that read its catalog (5+ engines) and the storage backends it abstracts (3 clouds). The catalog is Apache-licensed REST; the compute is managed Trino. Cross-engine reads are the killer feature — Snowflake + Spark + Trino + DuckDB all read the same tables through one REST catalog.",icon:(0,a.jsx)(j.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(E.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute engines (5+)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Tabular-managed Trino"})," — serverless, per-query pricing, no cluster to manage"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Spark 3.5+"})," — primary write engine (PySpark/Scala/SQL/R)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Snowflake cross-read"})," — external tables via Polaris-style integration"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"DuckDB 0.10+"})," — laptop-scale analytics (no cluster)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"PyIceberg"})," — pure-Python client (no JVM)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Flink 1.18+"})," — streaming CDC ingestion (exactly-once)"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(_.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Storage backends (3)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS S3"})," — most common Tabular deployment (us-east-1 default)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Azure ADLS Gen2"})," — abfss:// URIs, EU customers (GDPR residency)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Google Cloud Storage"})," — gs:// URIs, APAC customers"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Multi-cloud"})," — one Tabular catalog, three clouds, single OAuth2 credential"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Disaster recovery"})," — S3 → GCS replication nightly, sub-5min RTO"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Regulatory residency"})," — EU PII on Azure, US data on AWS, one JOIN"]})]})]})]})}),(0,a.jsx)(o.SectionCard,{title:"Research + production case studies",description:"The papers + production blog posts that defined the Iceberg ecosystem and the Tabular acquisition that reshaped the catalog battle.",icon:(0,a.jsx)(k.FileText,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Ryan Blue + Daniel Weeks (Netflix 2017-2022):"})," The original Iceberg team at Netflix — Ryan Blue (spec author), Daniel Weeks (co-founder), Ted Yu (committer). They designed Iceberg to fix Hive-on-S3 shortfalls (path-based partitions, schema drift, no time travel, no atomic commits). Left Netflix 2022 to found Tabular — the explicit goal was to commercialise Iceberg as a managed SaaS, removing the operational overhead that kept small teams from adopting it."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Tabular founding (2022):"})," Blue + Weeks raised Series A from Battery Ventures + others, hired ~30 engineers including several Iceberg committers. The bet: a SaaS that hosts the catalog AND the compute (Trino) — not just one or the other. Snowflake + Databricks both initially wanted to acquire (2024 bidding war); Snowflake won."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Snowflake acquisition (June 2024):"})," After a competitive bidding war with Databricks, Snowflake acquired Tabular for an undisclosed sum (rumoured USD 1B+). Snowflake kept the Tabular team intact as a separate engineering unit, with a mandate to maintain the open-source Tabular catalog. The strategic goal: Tabular gives Snowflake the open-source catalog they need to compete with Databricks Unity — Snowflake's Polaris (2024) is the in-house version of what Tabular offered."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Databricks counter-bid (lost):"})," Databricks reportedly offered more money but lost to Snowflake's's offer to keep Tabular open-source. Databricks would have integrated Tabular into Unity Catalog (closed-source); Snowflake committed to keeping Tabular Apache-licensed. The Iceberg community preferred the Snowflake deal — keeping the spec authors independent."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Production case studies (2022-2024):"})," Tabular's early customers included Adobe (Iceberg migration from Hive), Adobe Experience Platform features, and a number of fintech startups. Common pattern: 5-20TB scale, no desire to hire 2 FTE for Trino cluster ops, wanted the open-source Iceberg spec without operational overhead. Snowflake acquisition accelerated adoption — existing Snowflake customers can now use Tabular as the managed Iceberg layer."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Tabular + Snowflake Polaris relationship (2024+):"})," Polaris is Snowflake's Apache-licensed REST catalog (released 2024) — built partially by the ex-Tabular team. Tabular continues as the managed SaaS offering (catalog + Trino). Polaris is the open-source catalog spec customers self-host. Strategic relationship: Polaris wins the open-source catalog battle, Tabular wins the managed SaaS battle, Snowflake wins the compute battle (via Snowflake-managed warehouses)."]})]})}),(0,a.jsx)(o.SectionCard,{title:"My deeper thought: Tabular is the AWS RDS for Iceberg",description:"The unifying view: Tabular is structurally AWS RDS for Iceberg — managed service for a popular open-source spec. Same model, 30 years later.",icon:(0,a.jsx)(R.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Tabular IS the AWS RDS pattern for Iceberg."})," AWS RDS (2009) was the turning point for PostgreSQL adoption — before RDS, every team running Postgres needed a DBA for backups, replication, version upgrades. RDS offered Postgres as a managed service — same engine, same wire protocol, zero operational overhead. Adoption exploded. Tabular is doing the same for Iceberg — same spec, same REST catalog, same Iceberg tables, but with managed catalog + Trino. The bet is that the same pattern that made Postgres ubiquitous (managed offering on top of open spec) will make Iceberg ubiquitous."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The SaaS model only works below 50TB."})," Per-query pricing (USD 0.05/sec for medium Trino warehouse) is cheaper than 2 FTE (USD 500K/year) only below a certain scale. At 10TB with 1,200 queries/day averaging 5min each: USD 0.05 × 300s × 1,200 = USD 18,000/day = USD 6.6M/year — far more than 2 FTE. At 5TB with 200 queries/day averaging 2min: USD 0.05 × 120s × 200 = USD 1,200/day = USD 438K/year — about break-even with 2 FTE. The Tabular model wins for teams under 50TB with moderate query volume. Above that, self-hosted Trino on EKS (with 2 FTE) becomes more cost-effective. The SaaS model has a natural ceiling."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The Snowflake acquisition IS the strategic play for the catalog battle."})," Snowflake acquired Tabular not for the SaaS revenue (small relative to Snowflake's total) but for the open-source catalog team. Snowflake's Polaris (2024, Apache-licensed) was built partially by the ex-Tabular team. The strategic logic: if Polaris becomes the universal open catalog, customers' primary storage identity is Snowflake-controlled — even if the data sits on S3 in Iceberg format. Tabular gives Snowflake the spec authors + the credibility in the open-source community. This is the same play as AWS buying EMR (Hadoop team) or Microsoft buying GitHub (open-source credibility)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Open-source catalog + managed compute IS the inversion of the database model."})," In the database world, the engine is closed (Oracle, Snowflake, Databricks) and the storage is closed (vendor-managed). In the lakehouse world, the spec is open (Iceberg), the catalog is open (Tabular/Polaris), and only the compute is optionally managed (Tabular's managed Trino, Snowflake's warehouses, Databricks' Photon). This is the explicit inversion of the database model — the lakehouse splits what the database bundled. Customers can mix open catalog + managed compute (Tabular SaaS), open catalog + self-hosted compute (Tabular OSS + EKS Trino), or managed catalog + managed compute (Snowflake + Polaris). The flexibility is the structural advantage."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The Tabular acquisition IS the 2010s database-vendor battle redux."})," In the 2010s, AWS won the managed database battle with RDS (managed Postgres/MySQL) — took 50%+ of new database deployments by removing ops overhead. Snowflake is trying to do the same for the lakehouse catalog with Tabular + Polaris — managed open catalog as the default. Databricks is fighting back with Unity (closed catalog + managed compute). The 2020s catalog battle is structurally the 2010s managed-database battle — open spec + managed service vs closed spec + managed service. History suggests the open + managed model wins (RDS won), but Databricks' incumbent advantage (all Delta customers) is significant."]})]})}),(0,a.jsx)(o.SectionCard,{title:"Cross-disciplinary elegance — Gradient Descent bridges ML, evolution, and thermodynamics",description:"Gradient Descent (θ(t+1) = θ(t) - η∇L(θ)) IS the learning rule. A neural network learning to classify images, a population evolving under selection pressure, and a physical system relaxing to its minimum-energy state all follow the SAME rule: step downhill in the loss/fitness/energy landscape. ML IS evolution IS thermodynamics — three names for the same descent.",icon:(0,a.jsx)(A.Sparkles,{className:"h-5 w-5"}),badge:"elegant code",children:(0,a.jsx)(m.DatasetCards,{examples:h.ELEGANT_CODE_CARDS.filter((e,a)=>6===a),intro:"Gradient Descent (ML ↔ evolution ↔ thermodynamics): the SAME descent rule powers GPT-4 training, natural selection, and protein folding — because all three minimise a landscape."})}),(0,a.jsx)(b.RelatedElegantCode,{hostPage:"tabular"}),(0,a.jsxs)(T.DeeperThoughtSection,{pageTitle:"Tabular",children:[(0,a.jsx)(T.DeeperThought,{title:"Tabular IS the Iceberg-native cloud warehouse — and Snowflake bought it",connectedTo:"ADR-013 (Delta Lake)",children:(0,a.jsx)("p",{children:"Tabular (founded 2021 by Iceberg creators Ryan Blue and Daniel Weeks) built a managed Iceberg catalog + compute. Snowflake acquired Tabular in 2024 (outbidding Databricks). The acquisition IS the 'catalog war' — Iceberg won the format, Snowflake won the catalog. Tabular's insight: you don't need to own the format (Apache does) to build a business on it. The pattern (open format + managed catalog) IS the same as Confluent on Kafka: open protocol, managed service. The math (open + managed) stays; the format (Iceberg vs Delta vs Hudi) was the battleground."})}),(0,a.jsx)(T.DeeperThought,{title:"Tabular's compute engine IS serverless Iceberg — and it's the right model",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"Tabular's compute (acquired by Snowflake) provides serverless SQL on Iceberg tables. The user writes SQL; Tabular provisions compute, executes, and charges per-second. This IS the SAME model as Snowflake's virtual warehouses and BigQuery's on-demand pricing. The pattern (serverless SQL on open tables) stays; the implementation (Tabular vs Snowflake vs Databricks serverless) changes. The user doesn't manage clusters — the platform does. The fold absorbs the complexity."})}),(0,a.jsx)(T.DeeperThought,{title:"The Tabular vs Databricks bidding war IS the 2010s managed-database battle redux",connectedTo:"ADR-001 (platform architecture)",children:(0,a.jsx)("p",{children:"In the 2010s, AWS won the managed-database battle with RDS (managed Postgres/MySQL) — took 50%+ of new database deployments by removing ops overhead. Snowflake is trying to do the same for the lakehouse catalog with Tabular + Polaris — managed open catalog as the default. Databricks is fighting back with Unity (closed catalog + managed compute). The 2020s catalog battle IS structurally the 2010s managed-database battle: open spec + managed service vs closed spec + managed service. History suggests open + managed wins (RDS won)."})}),(0,a.jsx)(T.DeeperThought,{title:"Tabular's catalog IS Iceberg's metadata layer — and it's the right abstraction",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,a.jsx)("p",{children:"Tabular's catalog manages Iceberg tables: metadata (schema, partitioning, properties), refs (branches, tags), and namespaces. This IS the SAME pattern as a database catalog (pg_catalog in Postgres, information_schema in MySQL) — just for object-storage tables instead of block-storage tables. The catalog IS the metadata API. The pattern (catalog + metadata) stays; the implementation (Tabular vs Unity vs Polaris vs Glue) changes. The user thinks in terms of tables (logical); the catalog handles the metadata (physical)."})}),(0,a.jsx)(T.DeeperThought,{title:"Iceberg's open format IS Tabular's moat — and it's the right strategy",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"Tabular's business model: the format (Iceberg) is open (Apache), but the catalog (Tabular) is managed. This IS the 'open core' model: the protocol is free, the service is paid. The SAME model as Confluent (Kafka is open, Confluent Cloud is paid) and MongoDB (MongoDB is open, Atlas is paid). The moat IS the managed service (SLA, security, integrations), not the format. When Tabular was acquired by Snowflake, the format stayed open — Snowflake bought the SERVICE, not the PROTOCOL. The pattern (open protocol + paid service) IS the modern SaaS playbook."})})]}),(0,a.jsx)(u.RelatedTopics,{topics:[{id:"iceberg",reason:"Anchor — Tabular hosts Iceberg tables, founded by Iceberg spec authors"},{id:"snowflake-polaris",reason:"Snowflake's Apache-licensed catalog — built partially by ex-Tabular team"},{id:"catalogs",reason:"6-catalog comparison — Tabular is one of the 6 production catalogs"},{id:"databricks-lakehouse",reason:"Databricks lost the Tabular bidding war to Snowflake (2024)"},{id:"aws-lake-formation",reason:"AWS-native governance — Tabular integrates with Lake Formation"},{id:"delta-lake",reason:"Databricks table format — Tabular is the Iceberg counterpart"},{id:"data-lakehouse",reason:"Anchor concept — lake→lakehouse evolution"},{id:"duckdb",reason:"Laptop-scale read engine — reads Tabular-managed Iceberg via REST"}]}),(0,a.jsx)(l.ResearchDemo,{pageId:"tabular"}),(0,a.jsx)(i.TrendAnticipation,{pageId:"tabular"}),(0,a.jsx)(n.NextSteps,{relatedPages:[{id:"connections",reason:"See Gradient Descent's cousin cards in the cross-disciplinary graph"},{id:"alphamissense",reason:"Bayes (Bayes IS the belief updater) — same math, genetics domain"},{id:"fintech",reason:"Kelly Criterion (Kelly IS the universal bet-sizing equation) — same math, fintech domain"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(t.default,{href:(0,g.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (the spec Tabular commercialises)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,g.hrefFor)("snowflake-polaris"),className:"text-sm text-primary hover:underline",children:"→ Snowflake Polaris (Apache-licensed catalog, ex-Tabular team)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,g.hrefFor)("catalogs"),className:"text-sm text-primary hover:underline",children:"→ Catalogs comparison (Tabular vs Polaris vs Unity vs Glue vs Nessie)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,g.hrefFor)("databricks-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Databricks Lakehouse (lost Tabular bid, owns Unity)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,g.hrefFor)("data-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Data Lakehouse (concept anchor)"})]})]})}e.s(["TabularPage",()=>q])}]);