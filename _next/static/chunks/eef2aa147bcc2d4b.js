(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,203027,e=>{"use strict";var r=e.i(843476),a=e.i(522016),s=e.i(271645),t=e.i(846932),o=e.i(862824),i=e.i(342046),n=e.i(921371),l=e.i(580296),c=e.i(122836),d=e.i(716675),u=e.i(59938),m=e.i(158960),g=e.i(51030),h=e.i(901752),p=e.i(487486),f=e.i(332017),y=e.i(852008),b=e.i(828579),x=e.i(658041),_=e.i(640524),B=e.i(39312),T=e.i(227516),S=e.i(691385),v=e.i(178583),E=e.i(283086),w=e.i(966992),C=e.i(25652),I=e.i(618393),k=e.i(727927);let j=`-- ============================================================
-- Google BigQuery — serverless cloud data warehouse
-- Standard SQL, ANSI-compliant, columnar storage with Capacitor
-- ============================================================

-- Create a partitioned + clustered table (BigQuery's analog of
-- Iceberg partition + sort-key, but serverless + managed)
CREATE OR REPLACE TABLE moderndatascieng.orders_fct (
  order_id        INT64,
  customer_id     INT64,
  order_ts        TIMESTAMP,
  ship_country    STRING,
  amount_usd      NUMERIC(18, 4),
  currency        STRING,
  is_deleted      BOOLEAN
)
PARTITION BY DATE(order_ts)               -- ingest-time partitioning
CLUSTER BY order_id, ship_country;        -- re-sort within partition

-- Hidden partitioning (analogous to Iceberg): queries on
-- DATE(order_ts) prune to relevant partitions automatically.
SELECT
  order_id,
  ship_country,
  SUM(amount_usd) AS daily_revenue,
  COUNT(*) AS n_orders
FROM moderndatascieng.orders_fct
WHERE order_ts >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
  AND ship_country IN ('UK', 'EU')
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC
LIMIT 100;

-- Time travel — query as of 3 days ago (free up to 7 days)
SELECT * FROM moderndatascieng.orders_fct
  FOR SYSTEM_TIME AS OF TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 3 DAY);

-- Schema evolution — add column without rewriting data files
ALTER TABLE moderndatascieng.orders_fct ADD COLUMN discount_code STRING;

-- MERGE INTO — upsert pattern (transactional, serverless)
MERGE INTO moderndatascieng.orders_fct AS t
USING staging.orders_stream AS s
ON t.order_id = s.order_id
WHEN MATCHED AND s.op = 'DELETE' THEN DELETE
WHEN MATCHED AND s.op = 'UPDATE' THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;

-- Free-tier (1 TB scanned/month, 10 GB stored/month, 1 TB/query slot)
-- Usage billing: USD 5 per TB scanned (on-demand)`,N=`-- ============================================================
-- BigQuery BI Engine — in-memory columnar cache for sub-second dashboards
-- Accelerates Looker/Tableau/Metabase dashboards without pre-aggregation
-- ============================================================

-- Create a BI Engine reservation (in-memory cache, ~1 GB minimum)
--   Region: US/EU;  Max reservation: 250 GB per project
--   Cache hit ratio > 95% = 10x faster than on-demand scans
CREATE RESERVATION
  admin-project.region_us.bi_reservation
  AS BI Reservation
  OPTIONS(size_gb = 100);

-- Pin specific tables to BI Engine (priority over auto-cache)
ALTER TABLE moderndatascieng.orders_fct
  SET OPTIONS (
    biproxy = 'orders_fct_bi',
    description = 'Pinned to BI Engine for sub-second Looker dashboards'
  );

-- Query automatically uses BI Engine cache when available
-- (no syntax change — transparent acceleration)
SELECT
  DATE(order_ts) AS order_date,
  ship_country,
  SUM(amount_usd) AS daily_revenue
FROM moderndatascieng.orders_fct
WHERE order_ts >= '2024-09-01'
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC;

-- Materialised views — pre-aggregate on write
CREATE MATERIALIZED VIEW moderndatascieng.orders_daily_mv
  CLUSTER BY order_date
  AS SELECT
    DATE(order_ts) AS order_date,
    ship_country,
    SUM(amount_usd) AS daily_revenue,
    COUNT(*)        AS n_orders
  FROM moderndatascieng.orders_fct
  GROUP BY 1, 2;

-- Query the materialised view — only partitions with new data are
-- recomputed; rest served from the cached materialised state.
SELECT * FROM moderndatascieng.orders_daily_mv
  WHERE order_date >= '2024-09-01'
  ORDER BY 1 DESC;

-- Smart incremental refresh — only refresh partitions with new data
-- (analogous to Iceberg's incremental manifest, but serverless)
CALL BQ.REFRESH_MATERIALIZED_VIEW(
  'moderndatascieng', 'orders_daily_mv',
  partition_date_start => '2024-09-01');`,A=`# ============================================================
# google-cloud-bigquery — Python client for BigQuery
#   pip install google-cloud-bigquery[pandas,pyarrow]
# ============================================================

from google.cloud import bigquery
from google.cloud import bigquery_storage
import pandas as pd

# Auth via Application Default Credentials
#   gcloud auth application-default login
client = bigquery.Client(project="moderndatascieng")

# --- DDL: create partitioned + clustered table ---
client.query("""
CREATE TABLE moderndatascieng.orders_fct (
  order_id     INT64,
  customer_id  INT64,
  order_ts     TIMESTAMP,
  ship_country STRING,
  amount_usd   NUMERIC(18, 4),
  currency     STRING
)
PARTITION BY DATE(order_ts)
CLUSTER BY order_id, ship_country
""").result()

# --- Stream inserts (no batch needed — fully serverless) ---
errors = client.insert_rows_json(
    "moderndatascieng.orders_fct",
    [
        {"order_id": 1, "customer_id": 101, "order_ts": "2024-09-01T10:00:00",
         "ship_country": "UK", "amount_usd": "125.50", "currency": "GBP"},
        {"order_id": 2, "customer_id": 102, "order_ts": "2024-09-01T11:00:00",
         "ship_country": "EU", "amount_usd": "89.99",  "currency": "EUR"},
    ],
)
if errors:
    raise RuntimeError(f"Insert failed: {errors}")

# --- Query via standard SQL ---
df = client.query("""
SELECT ship_country, SUM(amount_usd) AS revenue
FROM moderndatascieng.orders_fct
WHERE order_ts >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
GROUP BY ship_country
ORDER BY revenue DESC
""").to_dataframe()
print(df.head())

# --- High-throughput read via BigQuery Storage API (arrow batches) ---
bqs = bigquery_storage.BigQueryReadClient()
session = bqs.create_read_session(
    bigquery_storage.ReadSession(
        table="projects/moderndatascieng/datasets/moderndatascieng/tables/orders_fct",
        data_format=bigquery_storage.DataFormat.ARROW,
        read_options=bigquery_storage.ReadSession.TableReadOptions(
            arrow_serialization_options=\\
                bigquery_storage.ArrowSerializationOptions(),
        ),
    ),
    parent=f"projects/moderndatascieng",
    max_stream_count=4,  # 4 parallel streams
)
# Read Arrow batches in parallel — 10x faster than REST for large tables
stream = session.streams[0]
reader = bqs.read_rows(stream.name)
for batch in reader.rows().pages:
    arrow_batch = batch.to_arrow()
    print(f"Read {arrow_batch.num_rows} rows")`,R=`-- ============================================================
-- BigLake + Iceberg on BigQuery — open table format on GCS
-- Lets BigQuery + Spark + Trino + DuckDB read the same Iceberg
-- tables via the BigLake external catalog (no copy into BigQuery).
-- ============================================================

-- 1. Create a BigLake external table pointing to an Iceberg table on GCS
--    (the table metadata lives in Iceberg REST catalog on GCS)
CREATE EXTERNAL TABLE moderndatascieng.iceberg_orders_fct
WITH CONNECTION projects/moderndatascieng/locations/us/connections/iceberg_conn
OPTIONS (
  format = 'ICEBERG',
  uris = ['gs://moderndatascieng-iceberg/warehouse/orders_fct/'],
  table_type = 'ICEBERG',
  metadata_cache_mode = 'AUTOMATIC'  -- caches manifest + file list
);

-- Query Iceberg data on GCS as if it were a native BigQuery table
-- (transparent — same SQL, same time-travel, same clustering)
SELECT
  ship_country,
  SUM(amount_usd) AS revenue,
  COUNT(*)        AS n_orders
FROM moderndatascieng.iceberg_orders_fct
WHERE order_ts >= '2024-09-01'
  AND ship_country IN ('UK', 'EU')
GROUP BY 1
ORDER BY 2 DESC;

-- Time travel on Iceberg via BigQuery (snapshot isolation)
SELECT * FROM moderndatascieng.iceberg_orders_fct
  FOR SYSTEM_TIME AS OF TIMESTAMP '2024-09-01 10:00:00';

-- 2. Create an Iceberg table directly from BigQuery (write to GCS)
--    BigLake-managed Iceberg table — vendor-neutral storage
CREATE TABLE moderndatascieng.orders_iceberg_native (
  order_id INT64, customer_id INT64, order_ts TIMESTAMP,
  ship_country STRING, amount_usd NUMERIC(18, 4)
)
WITH PARTITION CLUSTER (
  clustering_columns = ['ship_country'],
  partition_column = 'order_ts_day'
)
WITH CONNECTION projects/moderndatascieng/locations/us/connections/iceberg_conn
OPTIONS (
  storage_format = 'ICEBERG',
  table_format = 'ICEBERG',
  target_catalog = 'moderndatascieng-catalog'
);

-- 3. Cross-engine read from Spark / Trino / DuckDB on the same
--    Iceberg table — vendor-neutral storage layer.
--    Spark:   spark.sql.catalog.biglake \\
--             org.apache.iceberg.spark.BigLakeCatalog
--    Trino:   iceberg.biglake-catalog.type=biglake
--    DuckDB:  ATTACH 'biglake_catalog' AS b (TYPE iceberg, URI 'https://...')`,L=`-- ============================================================
-- BigQuery ML — train + serve ML models directly in BigQuery
-- No need to export data to a separate ML platform — train + predict in SQL
-- ============================================================

-- Train a logistic regression model for customer churn
-- BigQuery ML handles feature preprocessing + training + serving
CREATE OR REPLACE MODEL moderndatascieng.churn_logistic
OPTIONS (
  model_type = 'LOGISTIC_REG',
  input_label_cols = ['churned'],
  data_split_method = 'AUTO_SPLIT',
  data_split_eval_fraction = 0.2,
  l1_reg = 0.1,
  l2_reg = 0.1,
  max_iterations = 50
) AS
SELECT
  c.customer_id,
  c.country,
  c.signup_days,
  COUNT(DISTINCT o.order_id)        AS total_orders,
  SUM(o.amount_usd)                  AS total_spent,
  AVG(o.amount_usd)                  AS avg_order_value,
  COUNT(DISTINCT o.order_ts)         AS active_days,
  IF(MAX(o.order_ts) < TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 90 DAY),
     1, 0)                          AS churned
FROM moderndatascieng.customers c
LEFT JOIN moderndatascieng.orders_fct o USING (customer_id)
GROUP BY 1, 2, 3
HAVING c.signup_days > 30;

-- Evaluate the model — confusion matrix + AUC
SELECT * FROM ML.EVALUATE(MODEL moderndatascieng.churn_logistic);
SELECT * FROM ML.CONFUSION_MATRIX(MODEL moderndatascieng.churn_logistic);

-- Predict on new customers — same SQL, runs in seconds
SELECT
  customer_id,
  predicted_churned,
  predicted_proba
FROM ML.PREDICT(MODEL moderndatascieng.churn_logistic,
  TABLE moderndatascieng.new_customers)
ORDER BY predicted_proba DESC
LIMIT 1000;

-- Train a boosted-tree classifier (XGBoost) for higher accuracy
CREATE OR REPLACE MODEL moderndatascieng.churn_xgb
OPTIONS (
  model_type = 'BOOSTED_TREE_CLASSIFIER',
  booster_type = 'GBTREE',
  num_parallel_tree = 50,
  max_tree_depth = 6,
  learn_rate = 0.1,
  early_stop = TRUE,
  min_rel_progress = 0.01
) AS SELECT * FROM moderndatascieng.churn_training_data;

-- Export the model to Cloud Storage for serving outside BigQuery
EXPORT MODEL moderndatascieng.churn_xgb
  OPTIONS (URI = 'gs://moderndatascieng-ml/xgb.tar.gz');`,M=`# ============================================================
# BigQuery columnar storage simulation — in browser (Pyodide)
#   1. Build synthetic Capacitor columnar blocks (per-column)
#   2. Clustered column scan — fetch only needed columns
#   3. Partition prune + cluster prune (column blocks)
#   4. Time travel — read previous snapshot
#   5. Materialised view — pre-aggregate
# ============================================================

import math
import random
from collections import defaultdict

print("=== BigQuery columnar storage (Capacitor) simulation ===")
print("Architecture: query -> BI Engine cache -> Capacitor columnar blocks")
print()

random.seed(42)

# --- 1. Simulate BigQuery columnar storage ---
# Each column stored as a "column block" with min/max stats + bitmap filter
class ColumnarBlock:
    def __init__(self, name, values, dtype):
        self.name = name
        self.values = values
        self.dtype = dtype
        # Column block stats — for pruning
        self.min_val = min(values) if values else None
        self.max_val = max(values) if values else None
        self.n_rows = len(values)
        # Compressed size (simulated LZ4 + Run-Length + Delta)
        self.compressed_bytes = self._estimate_compression()

    def _estimate_compression(self):
        # BigQuery achieves ~10:1 compression on typical columns
        raw = self.n_rows * (8 if self.dtype in ('INT64', 'FLOAT64', 'TIMESTAMP') else 16)
        return raw // 10

    def __repr__(self):
        return f"Column({self.name}, rows={self.n_rows}, " \\
               f"min={self.min_val}, max={self.max_val}, " \\
               f"comp={self.compressed_bytes}B)"

class BigQueryTable:
    def __init__(self, name, partitions):
        self.name = name
        self.partitions = partitions  # dict: partition_date -> list[ColumnarBlock]

    def scan(self, columns, date_filter=None):
        """Columnar scan — fetch only selected columns, prune by date."""
        bytes_scanned = 0
        rows_read = 0
        for p_date, blocks in self.partitions.items():
            # Partition prune by date
            if date_filter and p_date not in date_filter:
                continue
            for col_name in columns:
                block = next(b for b in blocks if b.name == col_name)
                bytes_scanned += block.compressed_bytes
                rows_read += block.n_rows
        return bytes_scanned, rows_read

    def column_scan_stats(self):
        return {
            col_name: sum(b.compressed_bytes for p in self.partitions.values()
                          for b in p if b.name == col_name)
            for col_name in {b.name for p in self.partitions.values() for b in p}
        }

# --- 2. Build a synthetic BigQuery orders_fct table ---
# 5 partitions (1 day each), 5 columns, 1000 rows/partition
n_days = 5
n_rows_per_partition = 1000

partitions = {}
for day in range(n_days):
    p_date = f"2024-09-0{day+1}"
    order_ids = list(range(day*n_rows_per_partition+1, (day+1)*n_rows_per_partition+1))
    customer_ids = [random.randint(1, 1000) for _ in range(n_rows_per_partition)]
    order_ts = [int((day+1) * 86400 + random.randint(0, 86400)) for _ in range(n_rows_per_partition)]
    amounts = [round(random.uniform(10, 500), 2) for _ in range(n_rows_per_partition)]
    countries = [random.choice(['UK', 'EU', 'US', 'JP']) for _ in range(n_rows_per_partition)]

    partitions[p_date] = [
        ColumnarBlock("order_id", order_ids, 'INT64'),
        ColumnarBlock("customer_id", customer_ids, 'INT64'),
        ColumnarBlock("order_ts", order_ts, 'TIMESTAMP'),
        ColumnarBlock("amount_usd", amounts, 'FLOAT64'),
        ColumnarBlock("ship_country", countries, 'STRING'),
    ]

table = BigQueryTable("moderndatascieng.orders_fct", partitions)

# --- 3. Full table scan vs. columnar prune + partition prune ---
print("--- 3. Full table scan vs. columnar prune ---")
full_bytes, full_rows = table.scan(['order_id', 'customer_id', 'order_ts',
                                     'amount_usd', 'ship_country'])
print(f"  Full table scan:        {full_bytes:,} bytes  ({full_rows:,} rows)")

# Query: SELECT ship_country, SUM(amount_usd) FROM orders_fct
#         WHERE order_ts >= '2024-09-03'
# Only 3 columns, only 3 partitions (days 3-5) scanned
selected_cols = ['ship_country', 'amount_usd']
date_filter = {d for d in partitions if d >= '2024-09-03'}
pruned_bytes, pruned_rows = table.scan(selected_cols, date_filter)
print(f"  Columnar+partition prune: {pruned_bytes:,} bytes  ({pruned_rows:,} rows)")
print(f"  Bytes saved:              {100*(1-pruned_bytes/full_bytes):.1f}%")
print(f"  Cost saved:               USD {5 * (full_bytes - pruned_bytes) / 1e12:.6f}"
      f" (at USD 5/TB on-demand)")
print()

# Per-column compressed size (Capacitor compression stats)
print("--- Column block compression stats ---")
col_stats = table.column_scan_stats()
for col, sz in sorted(col_stats.items(), key=lambda x: -x[1]):
    print(f"  {col:<14} {sz:>6,} bytes")
print(f"  Total:           {sum(col_stats.values()):>6,} bytes")
print()

# --- 4. BI Engine cache simulation ---
print("--- 4. BI Engine cache (in-memory columnar cache) ---")
# BI Engine caches hot data in memory; subsequent queries hit the cache
# (10x faster than on-demand, transparent to the user)
bi_cache_hit = random.uniform(0.95, 0.99)
print(f"  Cache hit ratio:          {100*bi_cache_hit:.1f}%")
print(f"  Cold read (Capacitor):    ~{random.uniform(0.8, 1.5):.1f}s for 1GB scan")
print(f"  Warm read (BI Engine):    ~{0.8 / 10:.2f}s (10x faster)")
print()

# --- 5. Materialised view pre-aggregation ---
print("--- 5. Materialised view (pre-aggregated) ---")
mv_bytes = sum(b.compressed_bytes for p in list(partitions.values())[2:]
               for b in p if b.name in ('ship_country', 'amount_usd'))
mv_rows = sum(b.n_rows for p in list(partitions.values())[2:]
              for b in p if b.name == 'ship_country')
print(f"  MV size (3 days):         {mv_bytes:,} bytes  ({mv_rows:,} rows)")
print(f"  MV vs raw query bytes:    {100 * mv_bytes / pruned_bytes:.1f}% of raw")
print(f"  MV refresh:               only partitions with new data are recomputed")
print()

print("=== BigQuery architecture summary ===")
print("Storage:    Capacitor columnar blocks on Colossus (Google FS)")
print("Cache:      BI Engine (in-memory, sub-second dashboard queries)")
print("Compute:    Dremel query engine (columnar + tree-of-servers)")
print("Catalog:    BigLake (Iceberg-on-GCS) + native BigQuery tables")
print("Pricing:    USD 5/TB scanned on-demand, or flat-rate slots")
print("Free tier:  1 TB scanned + 10 GB stored per month")`;function Q(){let[e,a]=(0,s.useState)("dremel"),o={client:{label:"Client (SQL/REST)",desc:"Web UI · bq CLI · Python/Java/R SDK · Looker/Tableau via JDBC",level:0},dremel:{label:"Dremel query engine",desc:"Tree-of-servers: 1 root + 100s of mixed workers, dispatched per-shard, columnar execution",level:1},bi_engine:{label:"BI Engine cache",desc:"In-memory columnar cache (10x faster than on-demand, transparent to user)",level:2},capacitor:{label:"Capacitor columnar storage",desc:"Per-column blocks on Colossus FS — min/max stats for pruning, ~10:1 compression",level:3},biglake:{label:"BigLake/Iceberg on GCS",desc:"External tables on GCS in Iceberg format — vendor-neutral storage layer",level:3},colossus:{label:"Colossus (Google FS)",desc:"Google's distributed file system — Capacitor + BigLake data physically live here",level:4}},i={client:{x:200,y:30},dremel:{x:200,y:80},bi_engine:{x:80,y:140},capacitor:{x:200,y:140},biglake:{x:320,y:140},colossus:{x:200,y:200}};return(0,r.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,r.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,r.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,r.jsx)(S.Atom,{className:"h-3.5 w-3.5 text-primary"}),"BigQuery architecture — client → Dremel engine → BI Engine cache → Capacitor columnar → Colossus"]})}),(0,r.jsxs)("div",{className:"p-3",children:[(0,r.jsxs)("svg",{viewBox:"0 0 400 240",className:"w-full h-auto",children:[[["client","dremel"],["dremel","bi_engine"],["dremel","capacitor"],["dremel","biglake"],["capacitor","colossus"],["biglake","colossus"]].map(([e,a],s)=>{let t=i[e],o=i[a];return(0,r.jsx)("line",{x1:t.x,y1:t.y+12,x2:o.x,y2:o.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow)"},s)}),Object.entries(i).map(([s,i])=>{let n=e===s,l=o[s],c=0===l.level?"var(--chart-3)":1===l.level?"var(--chart-2)":2===l.level?"var(--chart-5)":3===l.level?"var(--chart-1)":"var(--muted-foreground)";return(0,r.jsxs)(t.motion.g,{onMouseEnter:()=>a(s),onMouseLeave:()=>a(null),animate:{scale:n?1.05:1},style:{cursor:"pointer"},children:[(0,r.jsx)("rect",{x:i.x-60,y:i.y-12,width:"120",height:"24",rx:"3",fill:n?c+"30":"var(--background)",stroke:c,strokeWidth:n?1.5:.8}),(0,r.jsx)("text",{x:i.x,y:i.y+4,textAnchor:"middle",fontSize:"7.5",fill:n?c:"var(--foreground)",fontWeight:n?"bold":"normal",children:l.label})]},s)}),(0,r.jsx)("defs",{children:(0,r.jsx)("marker",{id:"arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,r.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,r.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,r.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:o[e].label}),(0,r.jsx)("p",{className:"text-muted-foreground",children:o[e].desc})]}),!e&&(0,r.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node to see its role — Dremel dispatches query fragments to workers that read column blocks in parallel."})]})]})}function D(){return(0,r.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,r.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,r.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,r.jsx)(b.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"BigQuery vs Redshift vs Snowflake vs ClickHouse — 4 cloud warehouses compared"]})}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"w-full text-xs",children:[(0,r.jsx)("thead",{className:"bg-muted/30",children:(0,r.jsxs)("tr",{className:"border-b border-border/60",children:[(0,r.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,r.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"BigQuery"}),(0,r.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Redshift"}),(0,r.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Snowflake"}),(0,r.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"ClickHouse"})]})}),(0,r.jsx)("tbody",{children:[{feature:"Origin",bigquery:"Google (Dremel paper 2010)",redshift:"Amazon (ParAccel acquire 2012)",snowflake:"Microsoft/Snowflake (2014)",clickhouse:"Yandex (2016 open-source)"},{feature:"Architecture",bigquery:"Serverless, tree-of-servers",redshift:"Cluster-based, sliced nodes",snowflake:"Cloud-native, multi-cluster",clickhouse:"Self-hosted, sharded"},{feature:"Storage format",bigquery:"Capacitor (columnar)",redshift:"Columnar + RLE + AZ64",snowflake:"Cloud-managed columnar",clickhouse:"MergeTree (columnar)"},{feature:"Partitioning",bigquery:"PARTITION BY (ingest date)",redshift:"SORTKEY + DISTKEY",snowflake:"Micro-partitions",clickhouse:"PARTITION BY (any expr)"},{feature:"Clustered columns",bigquery:"CLUSTER BY (cols)",redshift:"SORTKEY on cols",snowflake:"Automatic clustering",clickhouse:"ORDER BY (cols)"},{feature:"Time travel",bigquery:"7 days free, 30 paid",redshift:"0 (no native)",snowflake:"90 days",clickhouse:"Via snapshots (manual)"},{feature:"Materialised views",bigquery:"Yes (auto-refresh)",redshift:"Yes (late 2020)",snowflake:"Yes (auto-refresh)",clickhouse:"Yes (incremental)"},{feature:"ML in-warehouse",bigquery:"BigQuery ML (XGBoost, ARIMA)",redshift:"Redshift ML (SageMaker)",snowflake:"Snowpark ML",clickhouse:"Limited (no native)"},{feature:"Free tier",bigquery:"1 TB/month scanned",redshift:"No (free trial only)",snowflake:"USD 400 credit (limited)",clickhouse:"Open-source self-host"},{feature:"Best fit",bigquery:"GCP shops, ad-hoc analytics",redshift:"AWS shops, predictable workloads",snowflake:"Multi-cloud, semi-structured",clickhouse:"Real-time, high-QPS OLAP"},{feature:"Notable adopters",bigquery:"Twitter, Spotify, BBVA",redshift:"Lyft, Nasdaq, Pfizer",snowflake:"Adobe, Capital One, DoorDash",clickhouse:"Cloudflare, Bloomberg, Uber"}].map((e,a)=>(0,r.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,r.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,r.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.bigquery}),(0,r.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.redshift}),(0,r.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.snowflake}),(0,r.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.clickhouse})]},a))})]})})]})}let P=[{label:"Origin",value:"Google Dremel 2010",hint:"Born from Google's internal Dremel paper — the first columnar serverless warehouse; BigQuery launched 2010 GA",deltaTone:"flat"},{label:"Free tier",value:"1 TB/month scanned",hint:"Plus 10 GB stored + 1 TB query slot/month — covers most academic + small-team analytics workloads at no cost",deltaTone:"up"},{label:"Production scale",value:"100 PB+",hint:"Spotify, Twitter, BBVA, Wayfair run PB-scale production warehouses on BigQuery; sub-second queries via BI Engine",deltaTone:"up"},{label:"Pricing",value:"USD 5/TB scanned",hint:"On-demand pricing per TB scanned — or flat-rate slots (100 / 500 / 1500 slots) for predictable workloads",deltaTone:"flat"}];function O(){return(0,r.jsxs)("div",{className:"space-y-8",children:[(0,r.jsx)(o.PageHeader,{eyebrow:"Google BigQuery · serverless cloud warehouse · Dremel origin",title:"Google BigQuery — serverless cloud data warehouse with columnar storage + BI Engine",description:"BigQuery is Google Cloud's fully-managed serverless data warehouse — no clusters to provision, no shards to manage, no ops team required. Born from the 2010 Dremel paper ('Dremel: Interactive Analysis of Web-Scale Datasets'), BigQuery stores data in Capacitor columnar blocks on Colossus (Google's distributed FS), accelerates hot queries via BI Engine in-memory cache, and serves ad-hoc SQL queries at 100s of petabytes. Free tier (1 TB scanned/month) covers most academic + small-team analytics. BigLake (Iceberg on GCS) makes BigQuery a first-class Iceberg reader — same tables readable from Spark, Trino, DuckDB. BigQuery ML trains logistic regression, XGBoost, and ARIMA models directly in SQL — no data export to a separate ML platform.",right:(0,r.jsxs)("div",{className:"flex gap-2",children:[(0,r.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,r.jsx)(y.Layers,{className:"h-3 w-3"})," Dremel"]}),(0,r.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,r.jsx)(S.Atom,{className:"h-3 w-3"})," Capacitor"]}),(0,r.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,r.jsx)(k.Cloud,{className:"h-3 w-3"})," BigLake"]})]})}),(0,r.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:P.map(e=>(0,r.jsx)(o.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,r.jsx)(o.SectionCard,{title:"Architecture — Dremel query engine + Capacitor columnar + BI Engine + BigLake",description:"BigQuery's architecture is a tree-of-servers: a single root Dremel server receives the SQL query, parses it into a query plan, and dispatches fragments to 100s of mixed worker servers. Each worker reads columnar blocks from Capacitor (the storage layer on Colossus), applies column + partition pruning, and streams results back through the tree. BI Engine is an in-memory columnar cache that sits in front of Capacitor for hot tables — 10x faster than on-demand, transparent to the user. BigLake exposes Iceberg tables on GCS as external BigQuery tables — vendor-neutral storage layer with warehouse-grade query.",icon:(0,r.jsx)(S.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,r.jsx)(Q,{})}),(0,r.jsx)(o.SectionCard,{title:"BigQuery SQL — partitioned + clustered tables, time travel, schema evolution, MERGE",description:"BigQuery's analog of Iceberg partition + sort-key is the PARTITION BY + CLUSTER BY combination. PARTITION BY DATE(order_ts) creates ingest-time partitions (1 partition per day). CLUSTER BY order_id, ship_country re-sorts rows within each partition for column-block pruning. Queries on WHERE order_ts >= current_date() - 7 hit only the relevant date partitions automatically. Time travel (FOR SYSTEM_TIME AS OF) gives 7 days free (30 days on paid). MERGE INTO for upserts is transactional and serverless.",icon:(0,r.jsx)(x.Database,{className:"h-5 w-5"}),badge:"BigQuery SQL",children:(0,r.jsx)(c.CodeBlock,{code:j,language:"sql",filename:"bigquery_create.sql",highlight:[12,13,14,19,20,21,22,23,24,25,26,28,29,32,33,36,37,38,39,40,41,42,43]})}),(0,r.jsx)(o.SectionCard,{title:"BI Engine + Materialised Views — sub-second dashboard acceleration",description:"BI Engine is BigQuery's in-memory columnar cache — pin hot tables and Looker/Tableau dashboards return in under 1 second instead of 10+ seconds. Cache hit ratio above 95% gives 10x speedup transparently (no SQL changes). Materialised views pre-aggregate on write — only partitions with new data are recomputed on refresh, rest served from cached state. Together they make BigQuery dashboards feel as fast as a pre-aggregated Redis cache, while still supporting full SQL on the raw data.",icon:(0,r.jsx)(B.Zap,{className:"h-5 w-5"}),badge:"BI Engine",children:(0,r.jsx)(c.CodeBlock,{code:N,language:"sql",filename:"bigquery_bi_engine.sql",highlight:[7,8,9,14,15,16,17,18,19,32,33,34,35,36,37,38,39,40,41,42,49,50,51,52,53,54]})}),(0,r.jsx)(o.SectionCard,{title:"Python client — DDL, streaming inserts, query to DataFrame, Storage API",description:"The google-cloud-bigquery Python client is the primary programmatic interface — DDL via client.query(), streaming inserts via insert_rows_json(), and queries returning Pandas DataFrames directly. The BigQuery Storage API (separate client) is 10x faster for large reads — it returns Arrow batches over multiple parallel streams, used by Looker, dbt, and most third-party BI tools.",icon:(0,r.jsx)(_.Workflow,{className:"h-5 w-5"}),badge:"Python",children:(0,r.jsx)(c.CodeBlock,{code:A,language:"python",filename:"bigquery_client.py",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,35,36,37,38,39,40,41,42,43,44,45,60,61,62,63,64,65]})}),(0,r.jsx)(o.SectionCard,{title:"BigLake + Iceberg on BigQuery — vendor-neutral storage on GCS",description:"BigLake lets BigQuery expose Iceberg tables on GCS as external tables — same SQL, same time travel, same clustering. Critically, the same Iceberg tables are readable from Spark, Trino, DuckDB, Flink, Snowflake (via Polaris catalog) — no copy into BigQuery-managed storage. This makes BigQuery a first-class Iceberg reader, alongside the other 8+ engines. BigLake-managed Iceberg tables (CREATE TABLE ... OPTIONS storage_format='ICEBERG') let BigQuery write Iceberg too — fully vendor-neutral storage layer with warehouse-grade query.",icon:(0,r.jsx)(k.Cloud,{className:"h-5 w-5"}),badge:"BigLake",children:(0,r.jsx)(c.CodeBlock,{code:R,language:"sql",filename:"biglake_iceberg.sql",highlight:[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43]})}),(0,r.jsx)(o.SectionCard,{title:"BigQuery ML — train + serve models directly in SQL",description:"BigQuery ML trains ML models directly on warehouse data — no need to export to a separate ML platform. Model types include logistic regression, XGBoost (BOOSTED_TREE_CLASSIFIER), K-means clustering, ARIMA time-series forecasting, deep neural networks (DNN), and AutoML Tables. Feature preprocessing, training, evaluation, and prediction all happen in SQL — a single CREATE MODEL trains, ML.PREDICT serves. The model can be exported to Cloud Storage for serving outside BigQuery (e.g. Vertex AI).",icon:(0,r.jsx)(w.Cpu,{className:"h-5 w-5"}),badge:"BQ ML",children:(0,r.jsx)(c.CodeBlock,{code:L,language:"sql",filename:"bigquery_ml.sql",highlight:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,33,34,35,38,39,40,41,42,43,44,45,48,49,50,51,52,53,54,55,56,57,59,60,61]})}),(0,r.jsx)(o.SectionCard,{title:"Try it: simulate BigQuery columnar storage in your browser (Pyodide)",description:"Pure-Python simulation of BigQuery's Capacitor columnar storage — no JVM, no GCS, just in-browser. Build a synthetic BigQuery table from scratch: 5 partitions × 5 columnar blocks each, with min/max stats for pruning. Compare a full-table scan vs. columnar + partition pruning (SELECT ship_country, SUM(amount_usd) WHERE order_ts >= ... only scans 3 columns × 3 partitions). See per-column compression stats, BI Engine cache hit ratio simulation, and materialised view pre-aggregation.",icon:(0,r.jsx)(E.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,r.jsx)(d.PyodideRunner,{code:M,buttonLabel:"Run BigQuery columnar simulation (Pyodide)"})}),(0,r.jsx)(o.SectionCard,{title:"BigQuery vs Redshift vs Snowflake vs ClickHouse — 4 cloud warehouses compared",description:"The four cloud warehouses represent four distinct architectural choices. BigQuery (Google) is fully serverless with the strongest free tier. Redshift (AWS) is cluster-based with the most mature sort/distribution keys. Snowflake (multi-cloud) abstracts clusters away into virtual warehouses. ClickHouse is open-source self-hosted, optimised for high-QPS real-time OLAP. The choice is increasingly about cloud provider fit (GCP vs AWS vs multi-cloud) and workload pattern (ad-hoc vs predictable vs real-time).",icon:(0,r.jsx)(b.Boxes,{className:"h-5 w-5"}),children:(0,r.jsx)(D,{})}),(0,r.jsx)(o.SectionCard,{title:"Why BigQuery evolved — shortfalls of on-prem Hadoop + Hive (Era 2)",description:"BigQuery was born from Google's internal Dremel project (2010 paper) which solved four critical shortfalls of the on-prem Hadoop + Hive era that made PB-scale ad-hoc analytics painful.",icon:(0,r.jsx)(T.History,{className:"h-5 w-5"}),badge:"Why BigQuery",children:(0,r.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Provisioning clusters was slow + expensive."})," On-prem Hadoop required buying racks, racking them, configuring HDFS, sizing for peak. BigQuery's serverless model means no clusters to provision — queries spin up 100s of workers in seconds, billed per TB scanned. ",(0,r.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," no idle-cluster cost, no capacity planning, no ops team for the warehouse."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: Hive SQL was slow."})," Hive-on-MapReduce took minutes for queries that should take seconds (MapReduce overhead per stage). Dremel's columnar execution + tree-of-servers dispatch gave 100x speedup — interactive SQL on PB-scale data became possible. ",(0,r.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," the same query that took 30 minutes on Hive takes 3 seconds on BigQuery."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No free tier for ad-hoc analytics."})," On-prem Hadoop clusters cost USD 1M+ to set up; only enterprises could afford analytics on big data. BigQuery's free tier (1 TB scanned/month) lets any student or researcher run real analytics on PB-scale public datasets (NOAA MODIS, 1000 Genomes, NYC Taxi) for free. ",(0,r.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," democratised big-data analytics — Google hosts these public datasets specifically to enable this."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: Storage + compute were tightly coupled."})," Hadoop clusters stored + computed on the same nodes — scaling storage required scaling compute. BigQuery's Colossus-backed Capacitor decouples storage (cheap, durable, infinitely scalable) from Dremel workers (compute, ephemeral, spun up per query). ",(0,r.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," pay only for what you scan; store 100PB at USD 20/TB/month, query 1TB at USD 5."]})]})}),(0,r.jsx)(o.SectionCard,{title:"Truly unique BigQuery features (vs Redshift + Snowflake + ClickHouse)",description:"BigQuery has four features that are genuinely unique — structural differentiators no other cloud warehouse has yet matched at the same scale or with the same economics.",icon:(0,r.jsx)(E.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,r.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,r.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,r.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. True serverless pricing"}),(0,r.jsxs)("p",{className:"text-muted-foreground",children:["Per-TB scanned pricing means no cluster to provision or manage. ",(0,r.jsx)("strong",{children:"Redshift + Snowflake both require sizing virtual warehouses."})," BigQuery's on-demand model is pay-per-scan with no idle cost."]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,r.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Free tier (1 TB/month)"}),(0,r.jsxs)("p",{className:"text-muted-foreground",children:["BigQuery's free tier covers most academic queries on public datasets. ",(0,r.jsx)("strong",{children:"Redshift has no free tier; Snowflake offers USD 400 one-time credit."})," Makes BigQuery the de-facto academic analytics warehouse."]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,r.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. BigQuery ML (in-warehouse training)"}),(0,r.jsxs)("p",{className:"text-muted-foreground",children:["Train XGBoost + ARIMA + DNN directly on warehouse data — no export to separate ML platform. ",(0,r.jsx)("strong",{children:"Redshift ML delegates to SageMaker; Snowflake Snowpark is newer."})," BigQuery ML has the deepest in-warehouse ML."]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,r.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Public datasets + BigLake"}),(0,r.jsxs)("p",{className:"text-muted-foreground",children:["Google hosts 200+ public datasets (NOAA, 1000 Genomes, NYC Taxi, Wikipedia) as BigQuery tables. ",(0,r.jsx)("strong",{children:"No other warehouse has equivalent hosted public data."})," BigLake makes Iceberg on GCS first-class — vendor-neutral storage."]})]})]})}),(0,r.jsx)(o.SectionCard,{title:"2 scientific dataset examples — cards with 5-language code popups",description:"Two scientific BigQuery use cases: (1) genomics on BigQuery — 1000 Genomes allele frequency queries on 100TB of variant data, sub-15-second response; (2) NASA Earth Data on BigQuery — MODIS satellite imagery analytics on 500TB. Each is a clickable card with: scenario brief (dataset/scale/why), dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,r.jsx)(x.Database,{className:"h-5 w-5"}),badge:"2 examples × 5 langs",children:(0,r.jsx)(m.DatasetCards,{examples:g.BIGQUERY_SCIENCE_EXAMPLES,intro:"BigQuery scientific use cases: genomics on BigQuery public 1000 Genomes dataset (~100TB) + NASA Earth MODIS satellite imagery (~500TB). Each example has Scala/Rust/Go/Elixir/Zig code with the unique BigQuery differentiator (columnar + clustering + BigLake)."})}),(0,r.jsx)(o.SectionCard,{title:"Computational tooling — BigQuery ecosystem",description:"BigQuery's compute ecosystem is the broadest of any cloud warehouse — BigQuery ML, BI Engine, BigLake, BigQuery Studio (notebooks), and 100+ third-party integrations via JDBC/ODBC. Google's investment in open-data public datasets + BigLake/Iceberg vendor-neutral storage gives BigQuery a unique position: warehouse-grade query with lake-grade openness.",icon:(0,r.jsx)(I.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,r.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,r.jsx)(w.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute + ML"]}),(0,r.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"Dremel engine"})," — tree-of-servers, columnar execution"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"BI Engine"})," — in-memory cache (10x faster dashboards)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"BigQuery ML"})," — logistic reg, XGBoost, ARIMA, DNN, AutoML"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"BigQuery Studio"})," — notebooks (PySpark + Python + SQL)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"BigQuery GIS"})," — geography types + ST_ functions"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"BigQuery vector search"})," — ANN search (2024)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"BigQuery omni"})," — multi-cloud (AWS + Azure) analytics"]})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,r.jsx)(k.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Storage + Catalog"]}),(0,r.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"Capacitor"})," — columnar storage on Colossus FS"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"BigLake"})," — Iceberg/Delta on GCS (vendor-neutral)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"Public datasets"})," — 200+ hosted (NOAA, 1000G, NYC Taxi)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"BigLake external tables"})," — read Iceberg/Delta/Hive"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"BigLake managed tables"})," — write Iceberg from BQ"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"BigLake Storage API"})," — Arrow streams for fast reads"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"BigLake Connection API"})," — Cloud SQL + Spanner federated"]})]})]})]})}),(0,r.jsx)(o.SectionCard,{title:"Research + production case studies",description:"The papers and production blog posts that defined BigQuery + the cloud-warehouse movement. The 2010 Dremel paper is the academic foundation; the Google + Spotify + Twitter engineering blogs document production scale.",icon:(0,r.jsx)(v.FileText,{className:"h-5 w-5"}),children:(0,r.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Melnik et al. 2010 (SIGMOD):"}),' "Dremel: Interactive Analysis of Web-Scale Datasets." Google\'s foundational paper introducing columnar storage + tree-of-servers execution for interactive SQL on PB-scale data. Key insight: column-oriented storage across distributed FS (Colossus) + multi-level execution tree (root + intermediate + leaf servers) gave 100x speedup over MapReduce for ad-hoc queries. BigQuery is the commercialisation of Dremel — launched GA in 2010.']}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Capacitor + BigQuery Storage (Google 2014-2018):"})," Google's internal engineering blogs documented the evolution from original Dremel columnar format to Capacitor — a new columnar file format with ~10:1 compression (LZ4 + Run-Length + Delta), min/max column statistics for pruning, and lazy materialisation. Capacitor is to BigQuery what Parquet is to Iceberg — the underlying columnar storage format, optimised for the cloud."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Spotify Production Case (Google Cloud Next 2019):"})," Migrated 1.5 PB of analytics data from on-prem Hadoop + Hive to BigQuery. Result: 10x faster ad-hoc queries, 60% lower cost (per-TB vs cluster), zero ops team for the warehouse. Log ingestion via Pub/Sub → BigQuery streaming insert (1M events/sec sustained)."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Twitter Production Case (2016):"})," Twitter uses BigQuery for ad-hoc analytics on tweet engagement data. Twitter's analytics team published that BigQuery reduced query latency from 30 minutes (Hive-on-MapReduce) to 3 seconds — a 600x improvement, enabling interactive analytics on 500TB+ of daily tweet data."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"BigLake + Iceberg (Google 2022-2024):"})," Google's BigLake announcement made Iceberg + Delta tables on GCS first-class BigQuery citizens — same SQL, same time travel, same performance, with vendor-neutral storage. Snowflake's Polaris catalog (2024) + Tabular's REST catalog (acquired by Snowflake 2024) make the same Iceberg tables readable from Snowflake, Spark, Trino, DuckDB. BigLake is Google's strategic play to win the open-format catalog battle."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"BigQuery ML (Google 2018+):"}),' Google introduced BigQuery ML in 2018 with the slogan "Train ML models in SQL without leaving the warehouse." Key insight: 80% of ML use cases (logistic regression, XGBoost, ARIMA, K-means) can be trained directly on warehouse data — no need to export to a separate platform. BQ ML democratised ML by removing the data-movement bottleneck.']}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"BI Engine (Google 2017):"})," Google introduced BI Engine as an in-memory columnar cache for Looker/Tableau dashboards. Key insight: 95% of dashboard queries hit the same hot tables — caching columnar blocks in memory gives 10x speedup transparently (no SQL changes). BI Engine made BigQuery dashboards feel as fast as pre-aggregated Redis caches."]})]})}),(0,r.jsx)(o.SectionCard,{title:"My deeper thought: BigQuery is columnar + MapReduce + Druid in one",description:"The unifying view: BigQuery's architecture is structurally a columnar OLAP engine (Capacitor) layered on a distributed file system (Colossus), wrapped in a tree-of-servers execution model (Dremel) that's effectively MapReduce-without-the-shuffle, fronted by an in-memory columnar cache (BI Engine) that mirrors Druid's segment cache.",icon:(0,r.jsx)(C.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,r.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"BigQuery IS columnar + tree-of-servers, not a single innovation."}),' Dremel\'s "innovation" in 2010 was assembling three existing patterns into one product: (1) columnar storage (Sybase IQ had it in the 1990s), (2) tree-of-servers execution (Volcano query processor + map-side combine), (3) distributed file system (Google File System, 2003). Each was well-known individually; the innovation was combining them into a fully-managed service. This is why BigQuery launched in 2010 — the underlying patterns matured around 2005-2010.']}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Serverless IS decoupling storage from compute."}),' Traditional databases (Oracle, PostgreSQL, MySQL) couple storage + compute on the same node — scaling storage requires scaling compute. BigQuery\'s Colossus-backed Capacitor decouples: storage on Colossus (cheap, durable, infinitely scalable, USD 20/TB/month), compute on Dremel workers (ephemeral, spun up per query, USD 5/TB scanned). The "innovation" is choosing to bill separately for each. Snowflake + Redshift Spectrum followed this pattern; Iceberg + S3 + Spark is the open-source equivalent.']}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"BI Engine IS Druid's segment cache, but managed."})," Druid (2011, Metamarkets open-source) pioneered in-memory columnar caching for sub-second dashboards — each segment (partition) is replicated in memory, queries hit the cache. BigQuery's BI Engine is structurally the same: columnar blocks cached in memory, transparent acceleration. The difference: BigQuery manages the cache; Druid requires self-hosting. ",(0,r.jsx)("code",{className:"font-mono",children:"Cache hit ratio above 95%"})," = 10x speedup in both."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Per-TB pricing IS the cloud-native version of CPU-seconds billing."})," Traditional cluster pricing (Redshift, on-prem Hadoop) bills by node-hour — you pay even when idle. BigQuery's per-TB-scanned pricing is structurally the same as serverless function CPU-seconds billing (AWS Lambda, Google Cloud Functions): pay only for the work done. The \"innovation\" is choosing to bill per byte scanned (a proxy for CPU work) rather than per node-hour. Snowflake's credit-based model (per-compute-second) is a hybrid — closer to BigQuery's spirit than Redshift's cluster model."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"BigLake IS BigQuery's strategic concession to the lakehouse."})," By 2022, Iceberg + Delta had become the dominant open-format choice for serious lakehouse workloads. Google's BigLake made Iceberg-on-GCS first-class BigQuery storage — read Iceberg as if it were native, write Iceberg from BigQuery SQL. This is structurally the same pattern as Snowflake Polaris (2024) — vendors are conceding that the catalog + table format are open, and competing on the query engine + cache layer. BigQuery's free tier + BigLake + BI Engine is Google's strategic position: warehouse-grade query with lake-grade openness."]})]})}),(0,r.jsxs)(f.DeeperThoughtSection,{pageTitle:"Google BigQuery",children:[(0,r.jsx)(f.DeeperThought,{title:"Google BigQuery IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,r.jsx)("p",{children:"This page about Google BigQuery is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Google BigQuery connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Google BigQuery sits in the computational-science landscape."})}),(0,r.jsx)(f.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,r.jsx)("p",{children:"In a decade, the specific tools on this page (Google BigQuery) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,r.jsx)(f.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,r.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,r.jsx)(f.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,r.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,r.jsx)(f.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,r.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,r.jsx)(u.RelatedTopics,{topics:[{id:"redshift",reason:"Sibling cloud warehouse (AWS)"},{id:"clickhouse",reason:"Self-hosted OLAP (open-source)"},{id:"snowflake-polaris",reason:"Sibling cloud warehouse + open catalog"},{id:"iceberg",reason:"BigLake = Iceberg on GCS"},{id:"data-lakehouse",reason:"Anchor concept — lake→lakehouse"},{id:"catalogs",reason:"BigLake + REST catalog comparison"},{id:"databricks",reason:"BigQuery vs Databricks + Unity"},{id:"tableau",reason:"BI Engine accelerates Looker/Tableau dashboards"}]}),(0,r.jsx)(n.ResearchDemo,{pageId:"bigquery"}),(0,r.jsx)(l.TrendAnticipation,{pageId:"bigquery"}),(0,r.jsx)(i.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"redshift",reason:"Sibling cloud warehouse (AWS)"},{id:"clickhouse",reason:"Self-hosted OLAP (open-source)"}]}),(0,r.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,r.jsx)(a.default,{href:(0,h.hrefFor)("redshift"),className:"text-sm text-primary hover:underline",children:"→ AWS Redshift (sibling warehouse, cluster-based)"}),(0,r.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,r.jsx)(a.default,{href:(0,h.hrefFor)("clickhouse"),className:"text-sm text-primary hover:underline",children:"→ ClickHouse (open-source OLAP at extreme scale)"}),(0,r.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,r.jsx)(a.default,{href:(0,h.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (BigLake on GCS)"}),(0,r.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,r.jsx)(a.default,{href:(0,h.hrefFor)("snowflake-polaris"),className:"text-sm text-primary hover:underline",children:"→ Snowflake Polaris (sibling open catalog)"}),(0,r.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,r.jsx)(a.default,{href:(0,h.hrefFor)("data-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Data Lakehouse (concept anchor page)"})]})]})}e.s(["BigQueryPage",()=>O])}]);