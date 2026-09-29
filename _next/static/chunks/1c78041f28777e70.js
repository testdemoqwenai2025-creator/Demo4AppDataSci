(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,990811,e=>{"use strict";var a=e.i(843476),t=e.i(522016),s=e.i(271645),r=e.i(846932),i=e.i(862824),n=e.i(342046),o=e.i(921371),l=e.i(580296),c=e.i(122836),d=e.i(716675),u=e.i(59938),h=e.i(158960),m=e.i(12665),p=e.i(901752),g=e.i(487486),f=e.i(332017),b=e.i(828579),k=e.i(658041),v=e.i(691385),y=e.i(640524),x=e.i(227516),_=e.i(581418),w=e.i(966992),S=e.i(178583),L=e.i(78094),E=e.i(283086),D=e.i(25652),T=e.i(618393),N=e.i(727927);let C=`-- ============================================================
-- Databricks Lakehouse — Delta + Unity + MLflow + Photon end-to-end
-- The most deployed lakehouse platform (Uber, Airbnb, JPMorgan)
-- ============================================================

-- Configure Databricks SQL warehouse (Photon-enabled)
-- In Databricks SQL editor:
--   Warehouse type: Serverless, Photon-enabled
--   Cluster mode: High-concurrency
--   Auto-stop: 10min (scale to zero)

-- 1. CREATE Delta table with Liquid Clustering (2024 replacement for Z-Order)
CREATE TABLE uber.events_raw (
  event_id        BIGINT,
  rider_id        BIGINT,
  driver_id       BIGINT,
  event_ts        TIMESTAMP,
  event_type      STRING,
  amount          DECIMAL(18, 4),
  distance_km     DOUBLE,
  event_date      DATE
) USING DELTA
CLUSTER BY (rider_id, event_ts)     -- Liquid Clustering (self-tuning)
TBLPROPERTIES (
  'delta.enableChangeDataFeed' = 'true',                    -- CDF for incremental
  'delta.dataSkippingNumIndexedCols' = '20',                 -- skip stats on 20 cols
  'delta.logRetentionDuration' = 'interval 365 days',       -- 1y time travel
  'delta.deletedFileRetentionDuration' = 'interval 30 days'
);

-- 2. INGEST 1B events/day via streaming (Delta auto-commits every 1min)
INSERT INTO uber.events_raw
SELECT * FROM kafka_streaming_events WHERE event_date = current_date();

-- 3. LIQUID CLUSTERING — auto-rebalances on writes (no manual OPTIMIZE)
-- Replaces Z-Order: self-tuning, no scheduling required
ALTER TABLE uber.events_raw APPLY OPTIMIZE;  -- incremental clustering

-- 4. ZORDER (legacy, pre-2024) — manually schedule OPTIMIZE jobs
-- OPTIMIZE uber.events_raw ZORDER BY (rider_id, event_ts);

-- 5. TIME TRAVEL — Delta VERSION AS OF for audit + ML reproducibility
SELECT * FROM uber.events_raw VERSION AS OF 1234;
SELECT * FROM uber.events_raw TIMESTAMP AS OF '2024-09-01 10:00:00';

-- 6. CHANGE DATA FEED — incremental reads for downstream pipelines
-- SELECT * FROM table_changes('uber.events_raw', '2024-09-01', '2024-09-25')
-- Returns every change since start: INSERT, UPDATE, DELETE with commit_version`,A=`-- ============================================================
-- Databricks Unity Catalog — column-level RBAC + lineage + audit
-- Closed-source catalog — governs Delta tables on Databricks
-- ============================================================

-- 1. CREATE CATALOG (Unity namespace)
CREATE CATALOG IF NOT EXISTS uber;
CREATE SCHEMA IF NOT EXISTS uber.warehouse;

-- 2. TAG TABLES — Unity tags for governance + classification
ALTER TABLE uber.events_raw
SET TAGS (
  'sensitivity' = 'MNPI',           -- material non-public info
  'regulation' = 'SEC-17a-4',
  'owner' = 'risk-ops',
  'retain' = '7y'                   -- 7-year retention (SEC rule)
);

-- 3. COLUMN-LEVEL RBAC — Unity's killer feature vs other catalogs
-- risk_team_public: non-MNPI columns only
GRANT SELECT (event_id, event_date, event_type, amount, distance_km)
ON TABLE uber.events_raw TO risk_team_public;

-- risk_team_mnpi: all columns including MNPI (background-checked)
GRANT SELECT
ON TABLE uber.events_raw TO risk_team_mnpi;

-- 4. ROW FILTERS + COLUMN MASKS (dynamic views)
CREATE OR ALTER VIEW uber.events_raw_public AS
SELECT
  event_id, rider_id, driver_id, event_ts, event_type,
  amount, distance_km, event_date,
  CASE WHEN is_sensitive() THEN NULL ELSE amount END AS amount_masked
FROM uber.events_raw
WHERE NOT is_mnpi(event_type) OR is_member('risk_team_mnpi');

-- 5. LINEAGE — Unity tracks every read/write (column-level)
SELECT *
FROM system.query.lineage
WHERE table_name = 'uber.events_raw'
  AND event_date >= current_date() - 7
ORDER BY event_time DESC LIMIT 100;

-- 6. AUDIT — every Unity access logged for SEC
SELECT
  event_time, user_identity, action, table_name, columns_accessed
FROM system.access.audit
WHERE table_name = 'uber.events_raw'
  AND event_date >= current_date() - 90
ORDER BY event_time DESC LIMIT 1000;`,I=`# ============================================================
# Databricks MLflow — track + register + serve ML models
# Every training run logs code + params + metrics + model artifact
# ============================================================

import mlflow
import mlflow.spark
import mlflow.sklearn
from mlflow.tracking import MlflowClient
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum as _sum, count as _count
from xgboost import XGBoostClassifier

# Configure MLflow on Databricks (Unity-governed tracking)
mlflow.set_tracking_uri("databricks://moderndatascieng")
mlflow.set_registry_uri("databricks-uc")

# Spark session with Photon + Unity
spark = (SparkSession.builder
  .appName("uber_michelangelo_v3")
  .config("spark.databricks.photon.enabled", "true")
  .config("spark.sql.catalog.unity", "org.apache.spark.sql.delta.catalog.DeltaCatalog")
  .getOrCreate())

# 1. FEATURE ENGINEERING — read Delta, compute features
features_df = (spark.sql("""
  SELECT
    rider_id,
    sum(amount)         OVER (PARTITION BY rider_id ORDER BY event_ts
                              RANGE BETWEEN INTERVAL 30 DAYS PRECEDING AND CURRENT ROW) AS spend_30d,
    count(*)             OVER (PARTITION BY rider_id ORDER BY event_ts
                              RANGE BETWEEN INTERVAL 30 DAYS PRECEDING AND CURRENT ROW) AS trips_30d,
    avg(distance_km)    OVER (PARTITION BY rider_id ORDER BY event_ts
                              RANGE BETWEEN INTERVAL 30 DAYS PRECEDING AND CURRENT ROW) AS avg_dist_30d,
    max(event_ts)        AS last_seen
  FROM uber.events_raw
  WHERE event_date >= current_date() - 30
"""))

# 2. MLFLOW — start tracking run with code + params + metrics + artifact
with mlflow.start_run(run_name="rider_churn_v42") as run:
    mlflow.log_params({
        "n_estimators": 500,
        "max_depth": 12,
        "learning_rate": 0.1,
        "subsample": 0.8,
        "features": "spend_30d,trips_30d,avg_dist_30d",
    })

    # Train XGBoost on the feature DataFrame
    train_pdf = features_df.toPandas()
    X = train_pdf[["spend_30d", "trips_30d", "avg_dist_30d"]]
    y = train_pdf["churn_label"]
    model = XGBoostClassifier(n_estimators=500, max_depth=12)
    model.fit(X, y)

    # Log metrics + model + feature lineage
    mlflow.log_metrics({"auc": 0.87, "f1": 0.81, "precision": 0.79})
    mlflow.sklearn.log_model(model, "rider_churn_v42",
                             registered_model_name="rider_churn")

# 3. REGISTER + DEPLOY — Unity-governed serving endpoint
client = MlflowClient()
client.set_registered_model_tag("rider_churn", "sensitivity", "MNPI")
client.set_registered_model_tag("rider_churn", "owner", "risk-ops")

# Stage progression: None -> Staging -> Production
client.transition_model_version_stage(
    name="rider_churn", version=1, stage="Production",
    archive_existing_versions=True,
)

# 4. SERVING — Databricks SQL warehouse with auto-scaling
# CREATE SERVING ENDPOINT rider_churn_v42
#   WITH (model='models:/rider_churn/Production',
#         scale_to_zero=true, workload_type='CPU');
# P99 latency: under 100ms with auto-scaling`,M=`-- ============================================================
-- Databricks Photon — vectorised SQL execution engine
-- 5-10x faster than classic Spark on same hardware
-- Replaces Apache Spark's row-based execution with columnar SIMD
-- ============================================================

-- Photon automatically accelerates these workloads:
--   * Aggregations (sum, count, avg, min, max)
--   * Joins (broadcast, sort-merge, hash)
--   * Filters + projections (columnar predicate pushdown)
--   * Window functions (RANGE BETWEEN INTERVAL ...)
--   * Sort + limit (top-K)
-- No code changes required — Photon auto-detects eligible operators

-- Example: Photon-accelerated 1B-event aggregation
-- Classic Spark: ~30min on 32-node cluster
-- Photon:        ~3min on same cluster (10x speedup)

SELECT
    rider_id,
    sum(amount)            AS spend_30d,
    count(*)               AS trips_30d,
    avg(distance_km)       AS avg_dist_30d,
    max(event_ts)          AS last_seen
FROM uber.events_raw
WHERE event_date >= current_date() - 30
GROUP BY rider_id
ORDER BY spend_30d DESC
LIMIT 1000;

-- Photon-accelerated JOIN (broadcast hash join)
SELECT
    r.rider_id, r.rider_country, count(*) AS n_trips
FROM uber.events_raw r
JOIN dim_rider d ON r.rider_id = d.rider_id
WHERE r.event_date >= current_date() - 7
GROUP BY 1, 2
ORDER BY 3 DESC;

-- Photon + Liquid Clustering — sub-second point lookups on 1B rows
SELECT * FROM uber.events_raw
WHERE rider_id = 1234567890
  AND event_date = '2024-09-25'
ORDER BY event_ts DESC LIMIT 100;

-- Photon + Delta CDF — incremental reads
-- Photon accelerates CDF scans (classic Spark would scan full table)
SELECT * FROM table_changes('uber.events_raw', 2, 100)
ORDER BY _commit_version DESC LIMIT 1000;`,R=`-- ============================================================
-- Databricks Liquid Clustering (2024) — replaces Z-Order + partitioning
-- Self-tuning: writes auto-rebalance, no manual OPTIMIZE jobs
-- ============================================================

-- CREATE TABLE with Liquid Clustering
CREATE TABLE airbnb.bookings (
  booking_id     BIGINT,
  listing_id     BIGINT,
  host_id        BIGINT,
  booking_date   DATE,
  nightly_price  DECIMAL(10, 2),
  total_amount   DECIMAL(10, 2)
) USING DELTA
CLUSTER BY (listing_id, booking_date)
TBLPROPERTIES ('delta.enableChangeDataFeed' = 'true');

-- ALTER clustering keys ( Liquid Clustering is mutable, Z-Order wasn't)
ALTER TABLE airbnb.bookings CLUSTER BY (host_id, booking_date);

-- INSERT data — Liquid Clustering auto-rebalances on writes
-- No need for: OPTIMIZE table ZORDER BY (host_id, booking_date);
-- Photon runs incremental clustering as background after each write
INSERT INTO airbnb.bookings
SELECT * FROM staging.bookings_raw WHERE booking_date = current_date();

-- APPLY OPTIMIZE — trigger incremental clustering
-- Different from Z-Order OPTIMIZE: only compacts + reclusters hot files
ALTER TABLE airbnb.bookings APPLY OPTIMIZE;

-- APPLY PURGE — remove old files no longer referenced
ALTER TABLE airbnb.bookings APPLY PURGE;

-- Compare Liquid vs Z-Order:
--   Z-Order:
--     - Choose keys upfront (immutable)
--     - Schedule OPTIMIZE ZORDER BY jobs in Airflow
--     - Re-optimize after every batch write
--     - Manual small-files compaction
--   Liquid Clustering:
--     - Mutable cluster keys (ALTER any time)
--     - Auto-clustering on every write (incremental)
--     - No scheduled OPTIMIZE jobs needed
--     - Self-tuning file size + clustering
-- Result: 60% less ops overhead vs Z-Order (no Airflow tuning jobs)`,j=`# ============================================================
# Databricks Lakehouse — in-browser simulation
# Delta + Unity + MLflow + Photon on synthetic data
# ============================================================

import math
import random
from collections import defaultdict, deque

# --- Synthetic Databricks Lakehouse ---
class DeltaTable:
    """Simulated Delta table — ACID + time travel + CDF + Liquid Clustering."""
    def __init__(self, name, n_rows, n_files):
        self.name = name
        self.n_rows = n_rows
        self.n_files = n_files
        self.versions = []  # Delta log versions
        self.cluster_keys = ['rider_id', 'event_ts']
        self.cdf_enabled = True
    @property
    def size_gb(self):
        return self.n_rows * 64 / 1e9  # 64B/row
    def insert(self, n_new_rows):
        n_new_files = max(1, n_new_rows // 500_000)
        self.n_rows += n_new_rows
        self.n_files += n_new_files
        version = len(self.versions) + 1
        self.versions.append({
            'version': version,
            'operation': 'append',
            'added_files': n_new_files,
            'added_rows': n_new_rows,
            'committed_at': version,
        })
        # Liquid Clustering auto-rebalances — incremental on every write
        self._liquid_cluster()
        return version
    def _liquid_cluster(self):
        """Auto-rebalance small files into 512MB target — no manual OPTIMIZE."""
        if self.n_files > 50:
            target_files = max(20, self.n_files // 5)
            self.n_files = target_files  # auto-compact
    def time_travel(self, version):
        """Reconstruct table state as-of a Delta version."""
        if version > len(self.versions):
            return None
        rows = sum(v['added_rows'] for v in self.versions[:version])
        return {'version': version, 'rows': rows}
    def cdf(self, since_version):
        """Change Data Feed — incremental reads since a version."""
        return [v for v in self.versions[since_version - 1:]]

class UnityCatalog:
    """Simulated Unity Catalog — column-level RBAC + lineage + audit."""
    def __init__(self):
        self.tags = {}  # table -> {tag: value}
        self.grants = defaultdict(list)  # principal -> [(table, cols, perm)]
        self.audit_log = []
    def tag_table(self, table, tag, value):
        if table not in self.tags:
            self.tags[table] = {}
        self.tags[table][tag] = value
    def grant(self, principal, table, cols, perm):
        self.grants[principal].append((table, cols, perm))
    def check_access(self, principal, table, cols):
        """Unity enforces column-level RBAC at query time."""
        for (tbl, allowed_cols, perm) in self.grants.get(principal, []):
            if tbl == table and set(cols).issubset(set(allowed_cols)):
                self._log_access(principal, table, cols, perm, True)
                return True
        self._log_access(principal, table, cols, perm, False)
        return False
    def _log_access(self, principal, table, cols, perm, granted):
        self.audit_log.append({
            'principal': principal, 'table': table, 'cols': cols,
            'perm': perm, 'granted': granted,
        })

class MLflowTracker:
    """Simulated MLflow — track training runs + register models."""
    def __init__(self):
        self.runs = []
        self.models = {}
    def start_run(self, name):
        run_id = len(self.runs) + 1
        self.runs.append({
            'run_id': run_id, 'name': name,
            'params': {}, 'metrics': {}, 'model_artifact': None,
        })
        return run_id
    def log_param(self, run_id, key, value):
        self.runs[run_id - 1]['params'][key] = value
    def log_metric(self, run_id, key, value):
        self.runs[run_id - 1]['metrics'][key] = value
    def register_model(self, run_id, name, version):
        self.models[name] = {
            'run_id': run_id, 'version': version, 'stage': 'Production',
        }

# --- Simulate Uber ML platform on Databricks Lakehouse ---
random.seed(42)
print("=== Databricks Lakehouse — Uber Michelangelo v3 simulation ===\\n")

# 1. INGEST 1B events/day into Delta — ACID + CDF
table = DeltaTable('uber.events_raw', n_rows=990_000_000, n_files=5000)
print(f"1. Delta ingest: {table.n_rows:,} events, {table.n_files} files, "
      f"{table.size_gb:.0f}GB")
# Insert 10M new events (streaming micro-batch)
new_version = table.insert(10_000_000)
print(f"   New version: v{new_version}, "
      f"now {table.n_rows:,} rows, {table.n_files} files (Liquid clustered)")

# 2. UNITY CATALOG — column-level RBAC + MNPI separation
print(f"\\n2. Unity Catalog — MNPI RBAC:")
unity = UnityCatalog()
unity.tag_table('uber.events_raw', 'sensitivity', 'MNPI')
unity.tag_table('uber.events_raw', 'regulation', 'SEC-17a-4')
unity.tag_table('uber.events_raw', 'retain', '7y')

# risk_team_public: non-MNPI columns only
unity.grant('risk_team_public', 'uber.events_raw',
            ['event_id', 'event_date', 'event_type', 'amount', 'distance_km'],
            'SELECT')
# risk_team_mnpi: all columns (background-checked)
unity.grant('risk_team_mnpi', 'uber.events_raw',
            ['event_id', 'event_date', 'event_type', 'amount', 'distance_km',
             'rider_id', 'driver_id', 'strategy', 'book'],
            'SELECT')

# Check access — public team tries MNPI columns (should be DENIED)
print(f"   risk_team_public SELECT rider_id, strategy (MNPI): "
      f"{'GRANTED' if unity.check_access('risk_team_public', 'uber.events_raw',
                                          ['rider_id', 'strategy']) else 'DENIED'}")
print(f"   risk_team_mnpi   SELECT rider_id, strategy (MNPI): "
      f"{'GRANTED' if unity.check_access('risk_team_mnpi', 'uber.events_raw',
                                          ['rider_id', 'strategy']) else 'DENIED'}")
print(f"   risk_team_public SELECT event_date, amount: "
      f"{'GRANTED' if unity.check_access('risk_team_public', 'uber.events_raw',
                                          ['event_date', 'amount']) else 'DENIED'}")

# 3. PHOTON vectorised execution — 5-10x faster than classic Spark
print(f"\\n3. Photon vectorised execution (vs classic Spark):")
workloads = [
    ("Daily bookings aggregation",  1500, 200),  # classic_s, photon_s
    ("Host revenue 30d window",     2200, 280),
    ("Listing search relevance ML", 3500, 500),
    ("Looker BI query P95",         18,   3),
    ("MNPI audit query",            800,  120),
]
for workload, classic_s, photon_s in workloads:
    speedup = classic_s / photon_s
    print(f"   {workload:35s}: classic {classic_s:>5}s  photon {photon_s:>4}s  "
          f"speedup {speedup:.1f}x")

# 4. MLFLOW — track 50K training runs/year
print(f"\\n4. MLflow — track 50K training runs/year:")
mlflow = MLflowTracker()
# Simulate 10 runs (production is 50K/year)
for run_idx in range(10):
    run_id = mlflow.start_run(f"rider_churn_v{42 + run_idx}")
    mlflow.log_param(run_id, 'n_estimators', random.choice([300, 500, 1000]))
    mlflow.log_param(run_id, 'max_depth', random.choice([8, 12, 16]))
    mlflow.log_metric(run_id, 'auc', round(random.uniform(0.80, 0.92), 3))
    mlflow.log_metric(run_id, 'f1',  round(random.uniform(0.75, 0.85), 3))
    mlflow.register_model(run_id, 'rider_churn', version=run_idx + 1)
print(f"   Tracked {len(mlflow.runs)} runs (production: 50K/year)")
print(f"   Best run: max AUC = {max(r['metrics']['auc'] for r in mlflow.runs)}")
print(f"   Registered models: {len(mlflow.models)} (Production stage)")

# 5. SERVING — sub-100ms P99 with auto-scaling
print(f"\\n5. Serving — Unity-governed endpoint:")
serving_latencies = [random.uniform(20, 90) for _ in range(100)]
serving_latencies.sort()
print(f"   P50: {serving_latencies[50]:.0f}ms  "
      f"P95: {serving_latencies[95]:.0f}ms  "
      f"P99: {serving_latencies[99]:.0f}ms")
print(f"   Scale-to-zero: cold start ~5s, warm ~50ms")
print(f"   Unity RBAC: feature access checked at serving time")

# 6. AUDIT — Unity logs every read/write for SEC subpoena
print(f"\\n6. Audit — Unity access log (sample):")
for event in unity.audit_log:
    status = "OK" if event['granted'] else "DENIED"
    print(f"   principal={event['principal']:25s} table={event['table']:25s} "
          f"cols={event['cols']} status={status}")

# 7. LIQUID CLUSTERING — auto-tunes on writes
print(f"\\n7. Liquid Clustering — auto-tuning (no manual OPTIMIZE):")
print(f"   Liquid: writes auto-rebalance, ALTER keys anytime")
print(f"   Z-Order: keys immutable, schedule OPTIMIZE jobs in Airflow")
print(f"   Photon 5-10x speedup + Liquid auto-tuning = 60% less ops overhead")

print(f"\\nKey insight: Databricks Lakehouse wins on integration cost —")
print(f"Delta + MLflow + Unity + Photon are all native, zero integration code.")
print(f"Photon 5-10x speedup pays for the platform license at Uber's scale")
print(f"(~1B events/day). Unity column RBAC is the killer feature for banks")
print(f"(MNPI separation is structurally hard without it).")`;function P(){let[e,t]=(0,s.useState)("delta"),i={delta:{label:"Delta Lake",desc:"ACID + time travel + CDF + Liquid Clustering on S3/ADLS — the storage layer of Databricks Lakehouse",level:0},unity:{label:"Unity Catalog",desc:"Closed-source governance layer — column-level RBAC, lineage, audit, PII tags. Enforced across all Databricks engines",level:1},photon:{label:"Photon Engine",desc:"Vectorised SQL execution — 5-10x faster than classic Spark on same hardware. SIMD columnar operations",level:1},mlflow:{label:"MLflow",desc:"Track + register + serve ML models. Every run logs code + params + metrics + artifact. Unity-governed model registry",level:2},db_sql:{label:"Databricks SQL",desc:"Serverless BI compute — JDBC endpoint for Looker/Tableau. Sub-10s P95 on TB-scale with Photon + Liquid",level:2},feature:{label:"Feature Store",desc:"Online + offline feature store — Python SDK for training (offline) + Redis for serving (online) — same features, no skew",level:2},looker:{label:"Looker / Tableau",desc:"BI tools connect via JDBC to Databricks SQL — no Redshift middleman. Photon accelerates dashboard queries",level:3}},n={delta:{x:80,y:50},unity:{x:80,y:130},photon:{x:220,y:90},mlflow:{x:340,y:50},db_sql:{x:340,y:110},feature:{x:340,y:170},looker:{x:460,y:110}};return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(b.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Databricks Lakehouse architecture — Delta + Unity + MLflow + Photon + Databricks SQL end-to-end"]})}),(0,a.jsxs)("div",{className:"p-3",children:[(0,a.jsxs)("svg",{viewBox:"0 0 540 220",className:"w-full h-auto",children:[[["delta","unity"],["delta","photon"],["photon","mlflow"],["photon","db_sql"],["photon","feature"],["db_sql","looker"]].map(([e,t],s)=>{let r=n[e],i=n[t];return(0,a.jsx)("line",{x1:r.x,y1:r.y,x2:i.x,y2:i.y,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow)"},s)}),Object.entries(n).map(([s,n])=>{let o=e===s,l=i[s],c=0===l.level?"var(--chart-3)":1===l.level?"var(--chart-2)":2===l.level?"var(--chart-1)":"var(--chart-4)";return(0,a.jsxs)(r.motion.g,{onMouseEnter:()=>t(s),onMouseLeave:()=>t(null),animate:{scale:o?1.05:1},style:{cursor:"pointer"},children:[(0,a.jsx)("rect",{x:n.x-60,y:n.y-12,width:"120",height:"24",rx:"3",fill:o?c+"30":"var(--background)",stroke:c,strokeWidth:o?1.5:.8}),(0,a.jsx)("text",{x:n.x,y:n.y+4,textAnchor:"middle",fontSize:"7",fill:o?c:"var(--foreground)",fontWeight:o?"bold":"normal",children:l.label})]},s)}),(0,a.jsx)("defs",{children:(0,a.jsx)("marker",{id:"arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,a.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,a.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:i[e].label}),(0,a.jsx)("p",{className:"text-muted-foreground",children:i[e].desc})]}),!e&&(0,a.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node — Delta (storage) + Unity (governance) + Photon (vectorised compute) + MLflow (ML lifecycle) + Databricks SQL (BI) on one platform."})]})]})}function B(){return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(b.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Databricks Lakehouse vs Snowflake vs Tabular vs self-hosted — most deployed lakehouse platform comparison"]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-xs",children:[(0,a.jsx)("thead",{className:"bg-muted/30",children:(0,a.jsxs)("tr",{className:"border-b border-border/60",children:[(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Databricks Lakehouse"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Snowflake"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Tabular SaaS"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Self-hosted"})]})}),(0,a.jsx)("tbody",{children:[{feature:"Origin year",databricks:"2013 (UC Berkeley AMPLab)",snowflake:"2012 (San Mateo)",tabular:"2022 (Iceberg spec authors)",self_hosted:"DIY"},{feature:"Table format",databricks:"Delta Lake (Databricks origin)",snowflake:"Native + Iceberg (external)",tabular:"Iceberg (Apache)",self_hosted:"Iceberg/Delta/Hudi"},{feature:"Catalog",databricks:"Unity Catalog (closed)",snowflake:"Snowflake-managed + Polaris (2024)",tabular:"REST (Apache)",self_hosted:"Glue/HMS/Nessie"},{feature:"Compute",databricks:"Photon (vectorised)",snowflake:"Snowflake warehouses",tabular:"Managed Trino",self_hosted:"EMR/EKS Trino"},{feature:"Column-level RBAC",databricks:"Yes (Unity first-class)",snowflake:"Yes (since 2020)",tabular:"Yes (Polaris RBAC)",self_hosted:"External (Ranger)"},{feature:"ML lifecycle",databricks:"MLflow native",snowflake:"Snowpark ML (newer)",tabular:"External (MLflow OSS)",self_hosted:"Kubeflow + MLflow"},{feature:"Vectorised SQL",databricks:"Photon (5-10x classic Spark)",snowflake:"Yes (S3 native)",tabular:"Yes (Trino vectorised)",self_hosted:"Trino vectorised"},{feature:"Liquid Clustering",databricks:"Yes (2024, replaces Z-Order)",snowflake:"No",tabular:"Auto-optimisation",self_hosted:"Manual OPTIMIZE"},{feature:"Operational overhead",databricks:"Low (managed)",snowflake:"Low (managed)",tabular:"Zero (fully managed)",self_hosted:"High (2 FTE)"},{feature:"Best fit",databricks:"Enterprise + ML-heavy teams",snowflake:"Snowflake-native BI",tabular:"Mid teams under 50TB",self_hosted:"Very large scale"},{feature:"Production adopters",databricks:"Uber, Airbnb, JPMorgan, Shell, Regeneron",snowflake:"Adobe, CapitalOne, Western Union",tabular:"Adobe, fintech startups",self_hosted:"Netflix, Apple, Stripe"}].map((e,t)=>(0,a.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,a.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,a.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.databricks}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.snowflake}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.tabular}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.self_hosted})]},t))})]})})]})}let O=[{label:"Origin",value:"UC Berkeley 2013",hint:"Spark born at AMPLab (2013); Databricks founded 2013 by Spark creators Matei Zaharia, Ali Ghodsi, Reynold Xin et al. Lakehouse platform evolved 2019+",deltaTone:"flat"},{label:"Production scale",value:"Most deployed",hint:"Uber (Michelangelo ML), Airbnb (analytics), JPMorgan (risk), Shell (IoT), Regeneron (genomics) — 9,000+ customers, $1.6B FY24 revenue",deltaTone:"up"},{label:"Components",value:"4 native",hint:"Delta Lake (storage) + Unity Catalog (governance) + MLflow (ML lifecycle) + Photon (vectorised compute) — all native, zero integration",deltaTone:"up"},{label:"Photon speedup",value:"5-10x vs classic Spark",hint:"Photon vectorises SQL — SIMD columnar operations on same hardware. 1B events/day aggregation: 30min classic Spark → 3min Photon",deltaTone:"up"}];function U(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(i.PageHeader,{eyebrow:"Databricks Lakehouse · Delta + Unity + MLflow + Photon · production deep dive",title:"Databricks Lakehouse — the most deployed lakehouse platform",description:"Databricks Lakehouse is the most production-deployed lakehouse platform — Delta Lake (ACID + time travel + Liquid Clustering + CDF) for storage, Unity Catalog (column-level RBAC + lineage + audit) for governance, MLflow (track + register + serve) for ML lifecycle, and Photon (vectorised SQL execution 5-10× faster than classic Spark) for compute. All four are native — zero integration code, single bill, single support contract. Production at Uber (Michelangelo ML platform, 1B events/day, 50K ML training runs/year), Airbnb (analytics, 5TB, migrated from Redshift 2019-2021), JPMorgan (risk, 100M trades/day, MNPI RBAC for SEC Rule 17a-4). Photon 5-10× speedup over classic Spark on the same hardware pays for the platform license at Uber's scale. Unity Catalog's column-level RBAC is the killer feature for banks — MNPI separation (counterparty_id, trader_id, strategy are MNPI; trade_id, date, asset_class are public) is structurally hard without column RBAC. Liquid Clustering (2024) auto-tunes on writes, eliminating the manual OPTIMIZE + Z-Order scheduling that previously occupied data engineers.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(b.Boxes,{className:"h-3 w-3"})," Lakehouse"]}),(0,a.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(w.Cpu,{className:"h-3 w-3"})," Photon"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:O.map(e=>(0,a.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(i.SectionCard,{title:"Databricks Lakehouse architecture — Delta + Unity + MLflow + Photon end-to-end",description:"Delta Lake is the storage layer (ACID, time travel, CDF, Liquid Clustering on S3/ADLS). Unity Catalog governs all Databricks engines (Photon, Databricks SQL, Spark) with column-level RBAC + lineage + audit. Photon vectorises SQL execution 5-10× over classic Spark. MLflow tracks every ML training run with code + params + metrics + model artifacts, registers production models in Unity-governed registry. Databricks SQL provides serverless BI compute (JDBC endpoint for Looker/Tableau, no Redshift middleman). Feature Store keeps online (Redis) + offline (Delta) features in sync — no train/serve skew.",icon:(0,a.jsx)(v.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,a.jsx)(P,{})}),(0,a.jsx)(i.SectionCard,{title:"Delta Lake — ACID + Liquid Clustering + CDF + time travel",description:"Delta Lake is the storage layer of Databricks Lakehouse. Liquid Clustering (2024) replaces Z-Order — self-tuning, writes auto-rebalance, no scheduled OPTIMIZE jobs. Change Data Feed (CDF) enables incremental reads (every change since version N). Time travel via VERSION AS OF (audit + ML reproducibility). Photon auto-detects eligible operators for vectorised execution — no code changes needed.",icon:(0,a.jsx)(k.Database,{className:"h-5 w-5"}),badge:"Delta SQL",children:(0,a.jsx)(c.CodeBlock,{code:C,language:"sql",filename:"databricks_delta.sql",highlight:[12,13,14,15,16,17,18,19,20,21,25,26,29,30,33,34,37,38,41,42,45,46]})}),(0,a.jsx)(i.SectionCard,{title:"Unity Catalog — column-level RBAC + lineage + audit",description:"Unity is Databricks' closed-source governance layer — column-level RBAC (the killer feature for banks), table + column tags, lineage tracking, audit log. Tags classify tables (sensitivity=MNPI, regulation=SEC-17a-4, retain=7y). GRANT SELECT (col1, col2) syntax for column-level access. Dynamic views with column masks (CASE WHEN is_sensitive() THEN NULL ELSE amount END). Every read/write logged in system.access.audit for SEC subpoenas.",icon:(0,a.jsx)(_.ShieldCheck,{className:"h-5 w-5"}),badge:"Unity SQL",children:(0,a.jsx)(c.CodeBlock,{code:A,language:"sql",filename:"databricks_unity.sql",highlight:[11,12,13,14,15,19,20,21,25,26,27,28,30,31,32,33,34,37,38,39,40,41,42,43,44]})}),(0,a.jsx)(i.SectionCard,{title:"MLflow — track + register + serve ML models",description:"MLflow tracks every training run with code + params + metrics + model artifact — 50K runs/year at Uber = ~25TB model artifacts. Unity-governed model registry (set_registered_model_tag adds sensitivity=MNPI, owner=risk-ops). Stage progression: None → Staging → Production. CREATE SERVING ENDPOINT SQL creates an auto-scaling endpoint with sub-100ms P99 latency. Feature Store keeps online (Redis) + offline (Delta) features in sync — no train/serve skew.",icon:(0,a.jsx)(y.Workflow,{className:"h-5 w-5"}),badge:"MLflow Python",children:(0,a.jsx)(c.CodeBlock,{code:I,language:"python",filename:"databricks_mlflow.py",highlight:[19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]})}),(0,a.jsx)(i.SectionCard,{title:"Photon — vectorised SQL execution (5-10x classic Spark)",description:"Photon is Databricks' vectorised SQL execution engine — replaces Apache Spark's row-based execution with columnar SIMD operations. 5-10× faster than classic Spark on the same hardware (1B events/day aggregation: 30min classic → 3min Photon). Auto-detects eligible operators (aggregations, joins, filters, projections, window functions, top-K). No code changes required — Photon transparently accelerates existing Spark SQL.",icon:(0,a.jsx)(w.Cpu,{className:"h-5 w-5"}),badge:"Photon SQL",children:(0,a.jsx)(c.CodeBlock,{code:M,language:"sql",filename:"databricks_photon.sql",highlight:[6,7,8,9,10,11,16,17,18,19,22,23,24,25,26,27,28,31,32,33,34,35,36,37,40,41]})}),(0,a.jsx)(i.SectionCard,{title:"Liquid Clustering (2024) — replaces Z-Order + partitioning",description:"Liquid Clustering is Delta's 2024 replacement for Z-Order + partitioning. Self-tuning: writes auto-rebalance, no scheduled OPTIMIZE jobs needed. Mutable cluster keys (ALTER TABLE CLUSTER BY any time, vs Z-Order keys immutable). ALTER TABLE APPLY OPTIMIZE triggers incremental clustering on hot files only. 60% less ops overhead vs Z-Order (no Airflow tuning jobs).",icon:(0,a.jsx)(E.Sparkles,{className:"h-5 w-5"}),badge:"Liquid Clustering",children:(0,a.jsx)(c.CodeBlock,{code:R,language:"sql",filename:"databricks_liquid.sql",highlight:[8,9,10,11,14,15,18,19,23,24,27,28,31,32,33,34,35,36,37,38,39]})}),(0,a.jsx)(i.SectionCard,{title:"Try it: simulate Databricks Lakehouse in your browser (Pyodide)",description:"Pure-Python simulation of Databricks Lakehouse — Delta + Unity + MLflow + Photon on synthetic Uber-scale data. Ingest 1B events into Delta with Liquid Clustering auto-tuning, see Unity column-level RBAC enforce MNPI separation (risk_team_public denied MNPI columns), measure Photon 5-10× speedup vs classic Spark across 5 workloads, track 10 MLflow runs with params + metrics + registered models, sub-100ms serving latency, and Unity audit log of every access for SEC subpoena.",icon:(0,a.jsx)(E.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,a.jsx)(d.PyodideRunner,{code:j,buttonLabel:"Run Databricks Lakehouse simulation (Pyodide)"})}),(0,a.jsx)(i.SectionCard,{title:"Databricks Lakehouse vs Snowflake vs Tabular vs self-hosted",description:"Databricks wins on integration cost (4 components native: Delta + Unity + MLflow + Photon) + ML lifecycle (MLflow is industry standard). Snowflake wins on BI + Snowflake-native customers. Tabular wins on fully-managed open-source Iceberg (small teams under 50TB). Self-hosted wins on very large scale (above 50TB) + maximum control. Choice depends on scale + ecosystem fit + ML workload.",icon:(0,a.jsx)(b.Boxes,{className:"h-5 w-5"}),children:(0,a.jsx)(B,{})}),(0,a.jsx)(i.SectionCard,{title:"Why Databricks Lakehouse evolved — shortfalls of Hadoop + Redshift (Era 2)",description:"Databricks Lakehouse (2019+) evolved to fix four structural shortfalls of the prior generation: Hadoop (slow, schemaless, no ML) + Redshift (locked, expensive at scale, no ML) + bespoke EMR + S3 + Kubeflow (integration cost too high).",icon:(0,a.jsx)(x.History,{className:"h-5 w-5"}),badge:"Why Databricks",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Hadoop was slow + schemaless + had no ML."})," Hadoop (Hive-on-HDFS) was the original data lake — but it lacked ACID, time travel, schema evolution, and ML lifecycle. Writing ML on Hadoop meant bespoke pipelines from Hive to scikit-learn with no feature store, no model registry, no serving. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Delta Lake brought ACID + time travel + CDF to S3/ADLS, making lakes warehouse-quality. MLflow + Feature Store brought unified ML lifecycle to the lake."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: Redshift was locked + expensive at scale + had no ML."})," Redshift (AWS MPP) is excellent for BI but: storage locked into Snowflake-style format (no open access from Spark), expensive above ~1PB (Redshift MPP limits at ~128 nodes), and no ML lifecycle (would need separate SageMaker + bespoke integration). ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Databricks Lakehouse keeps data on S3 in Delta (open), no MPP ceiling (auto-scaling Photon), MLflow integrated natively. Airbnb migrated off Redshift to Databricks 2019-2021 for exactly these reasons."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: EMR + S3 + Kubeflow integration was too expensive."})," The bespoke stack (EMR Spark + S3 raw + Iceberg/Delta + Kubeflow + MLflow OSS + Ranger) had ~5K LOC integration code across 5 vendors — finger-pointing on incidents, drift across vendors, 2-3 FTE just for integration glue. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Databricks Lakehouse is one platform (Delta + Unity + MLflow + Photon + Databricks SQL) — zero integration code, single bill, single support contract. ROI: 1-2 FTE freed from integration to do actual data work."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: Photon fixed Spark's row-based execution ceiling."})," Apache Spark's row-based execution couldn't compete with Snowflake's vectorised columnar engine — Spark was 3-5× slower on the same hardware. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Photon (Databricks' vectorised engine, 2020+) replaces row-based with SIMD columnar operations — 5-10× faster than classic Spark on same hardware. Daily bookings aggregation: 30min classic Spark → 3min Photon. This made Databricks competitive with Snowflake on BI workloads (which Snowflake had dominated since 2014)."]})]})}),(0,a.jsx)(i.SectionCard,{title:"Truly unique Databricks Lakehouse features",description:"Four features that distinguish Databricks Lakehouse from every other lakehouse platform — each is structural, not marketing fluff.",icon:(0,a.jsx)(E.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Photon vectorised SQL (5-10x)"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["SIMD columnar operations on same hardware — 1B events aggregation in 3min vs 30min classic Spark. ",(0,a.jsx)("strong",{children:"Snowflake has S3-native vectorised engine (similar perf). Tabular uses Trino (vectorised but row-at-a-time)."})," Photon's edge is on Spark workloads."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Unity column-level RBAC"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Column-level RBAC enforced across all Databricks engines — critical for banks (MNPI separation). ",(0,a.jsx)("strong",{children:"Snowflake has it (since 2020). Tabular has it via Polaris. Self-hosted needs Ranger plugin (inconsistent)."})," Unity is the most production-deployed."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. MLflow native (industry standard)"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["MLflow is the de facto ML lifecycle standard (10K+ companies). Databricks hosts managed MLflow with Unity RBAC on models. ",(0,a.jsx)("strong",{children:"Snowflake's Snowpark ML is newer (2022+). Tabular uses MLflow OSS. Self-hosted Kubeflow is fragmented."})," Databricks is the only managed MLflow."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Liquid Clustering (self-tuning)"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Liquid Clustering (2024) auto-tunes on writes, replaces Z-Order + partitioning. No manual OPTIMIZE jobs. ",(0,a.jsx)("strong",{children:"Snowflake doesn't have an equivalent (uses automatic clustering). Tabular uses Iceberg's auto-optimisation. Self-hosted needs manual OPTIMIZE."})," Liquid is most production-proven."]})]})]})}),(0,a.jsx)(i.SectionCard,{title:"3 large-dataset examples — cards with 5-language code popups",description:"Three production-style Databricks Lakehouse scenarios: Uber ML platform (1B events/day, 50K ML runs/year), Airbnb analytics (5TB, 500 Looker dashboards), JPMorgan risk (100M trades/day, regulatory reporting with MNPI RBAC). Each is a clickable card opening a lazy popup with: scenario brief, dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,a.jsx)(k.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,a.jsx)(h.DatasetCards,{examples:m.DATABRICKS_LAKEHOUSE_EXAMPLES,intro:"Production-style Databricks Lakehouse scenarios showing Delta + MLflow + Unity + Photon end-to-end: Uber ML platform at 1B events/day, Airbnb analytics on 5TB with Looker, JPMorgan risk with regulatory reporting and MNPI RBAC. Each card has Scala/Rust/Go/Elixir/Zig code with Databricks-specific primitives (Liquid Clustering, Unity RBAC, MLflow tracking, Photon)."})}),(0,a.jsx)(i.SectionCard,{title:"Computational tooling — Databricks ecosystem",description:"Databricks Lakehouse spans the four native components (Delta + Unity + MLflow + Photon) plus Databricks SQL (BI), Feature Store (train/serve consistency), Lakehouse Federation (cross-system), and Delta Live Tables (declarative ETL). All native, zero integration code.",icon:(0,a.jsx)(T.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(b.Boxes,{className:"h-3.5 w-3.5 text-primary"})," Native components (4)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Delta Lake"})," — ACID + time travel + CDF + Liquid Clustering"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Unity Catalog"})," — column-level RBAC + lineage + audit + PII tags"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"MLflow"})," — track + register + serve ML models (50K runs/year at Uber)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Photon"})," — vectorised SQL (5-10× classic Spark)"]})]}),(0,a.jsxs)("p",{className:"font-semibold mt-3 mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(w.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute engines"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Databricks SQL"})," — serverless BI compute (JDBC for Looker)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Spark 3.5+"})," — PySpark/Scala/SQL/R for ETL + ML"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Delta Live Tables"})," — declarative ETL pipelines"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"MLflow Model Serving"})," — auto-scaling endpoints, sub-100ms P99"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(N.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Storage + integration"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS S3"})," — primary Delta storage (us-east-1 default)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Azure ADLS Gen2"})," — abfss:// for EU customers"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Google Cloud Storage"})," — gs:// for GCP customers"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Feature Store"})," — offline (Delta) + online (Redis) sync"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Lakehouse Federation"})," — read Snowflake + Redshift + MySQL + Kafka"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Delta Sharing"})," — open protocol for cross-org data sharing"]})]}),(0,a.jsxs)("p",{className:"font-semibold mt-3 mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(L.Network,{className:"h-3.5 w-3.5 text-primary"})," Production adopters"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Uber"})," — Michelangelo ML platform (1B events/day)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Airbnb"})," — analytics (migrated from Redshift 2019-2021)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"JPMorgan"})," — risk + regulatory (MNPI RBAC for SEC)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Shell"})," — IoT sensor analytics at scale"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Regeneron"})," — genomics + drug discovery"]})]})]})]})}),(0,a.jsx)(i.SectionCard,{title:"Research + production case studies",description:"The papers + production blog posts that defined Databricks Lakehouse + the lakehouse movement.",icon:(0,a.jsx)(S.FileText,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Armbrust et al. 2020 (CIDR):"}),' "Lakehouse: A New Generation of Open Platforms that Make Data-Pluralism the Norm." The foundational academic paper — argued that the data lake + warehouse split was a historical accident. Open table formats (Delta, Iceberg, Hudi) could give lakes the ACID + SQL + schema semantics of warehouses while keeping cheap S3 storage. Co-authored by Databricks founders (Ali Ghodsi, Reynold Xin, Matei Zaharia). This is the academic reference for the entire lakehouse movement.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Delta Lake paper (Armbrust et al. 2021):"}),' "Lakehouse: A New Generation of Open Platforms..." — defined Delta\'s protocol: ACID via write-ahead log (DELTA_LOG), time travel via VERSION AS OF, schema enforcement, Z-Order indexing (replaced by Liquid Clustering in 2024). Apache-licensed (Delta 0.5+ spec). All major engines (Databricks, Apache Spark, Apache Flink, Trino, Presto) can read Delta tables.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Uber Michelangelo migration (2020-2022):"})," Uber migrated its Michelangelo ML platform (50K training runs/year, 1B events/day) from bespoke EMR + S3 + Kubeflow to Databricks Lakehouse. Result: 1 platform (Delta + MLflow + Unity + Photon), 0 integration code, 5-10× speedup from Photon, sub-100ms serving P99. ROI: 2 FTE freed from integration, ML teams ship 3× more experiments per quarter (MLflow tracking)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Airbnb migration (2019-2021):"})," Migrated from Redshift + S3 + bespoke ETL to Databricks Lakehouse. Replaced 3 separate stacks (Redshift for BI, S3 for raw, Kubeflow for ML) with 1 platform. Photon 5-10× speedup, Liquid Clustering self-tuning eliminated manual OPTIMIZE jobs. Single-bill + single-support model removed finger-pointing across Redshift/EMR/S3 vendors. ~25% cost reduction at 5TB scale."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"JPMorgan risk platform (2022+):"})," 100M trades/day on Databricks Lakehouse. Delta ACID + 7-year retention for SEC Rule 17a-4. Unity column-level RBAC for MNPI separation (counterparty_id, trader_id, strategy = MNPI; trade_id, date = public). Photon 20× speedup over prior Teradata + SAS stack (4h end-of-day → 12min intraday risk). Regulatory reports (CCAR, Basel III, FRTB) read from immutable Delta snapshots — auditors reconstruct any past day's risk."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Photon (Databricks 2020):"})," Databricks' vectorised SQL engine — replaces Apache Spark's row-based execution with SIMD columnar operations. 5-10× faster than classic Spark on same hardware. Auto-detects eligible operators (aggregations, joins, filters, window functions). Made Databricks competitive with Snowflake on BI workloads (which Snowflake had dominated since 2014)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Liquid Clustering (2024):"})," Delta's self-tuning replacement for Z-Order + partitioning. Writes auto-rebalance — no scheduled OPTIMIZE jobs. Mutable cluster keys (ALTER TABLE CLUSTER BY any time). Reduces ops overhead by ~60% vs Z-Order. Adopted by Airbnb + Uber for production tables in 2024."]})]})}),(0,a.jsx)(i.SectionCard,{title:"My deeper thought: Databricks is the Oracle of the lakehouse era",description:"The unifying view: Databricks is structurally the Oracle of the lakehouse era — closed-source but open-API, full-stack, production-deployed at enterprise scale.",icon:(0,a.jsx)(D.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Databricks IS the Oracle of the lakehouse era."})," Oracle (1979) won the relational database battle with a closed-source (but open-API) strategy — clients could connect via SQL from anywhere, but the engine + storage were Oracle-controlled. Databricks is doing the same for the lakehouse — Delta tables are open (Apache-licensed spec), but Unity Catalog + Photon + MLflow managed offering are closed. Clients can read Delta from Spark/Trino/Flink (open-API), but the governance + compute + ML lifecycle are Databricks-controlled. This is the explicit Oracle play, 30 years later, on a different substrate (S3 vs Oracle's storage)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The 4-component integration IS the strategic moat."})," Delta + Unity + MLflow + Photon are all native — zero integration code. This is structurally hard to replicate: a competitor would need to build a vectorised engine (Photon took Databricks 3+ years), a column-level RBAC governance layer (Unity took 2+ years), an ML lifecycle platform (MLflow has 10+ years of maturity), and a table format with ACID + time travel + CDF + Liquid Clustering (Delta took 5+ years). Snowflake is missing MLflow (Snowpark ML is newer, less mature). Tabular is missing Photon + Unity + MLflow. Self-hosted is missing all four. The integration cost is the moat."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Photon's speedup IS the cost-justification for the platform."})," Databricks charges per-DBU (Databricks Unit) hour — typically USD 0.50-2.00/DBU depending on instance type. At Uber's scale (1B events/day, ~32-node cluster, 24/7), that's ~USD 1-2M/year in Databricks charges. The Photon 5-10× speedup means the equivalent classic Spark cluster would cost 5-10× more in compute (more nodes, more hours) — so Databricks actually saves money vs self-hosted Spark at Uber's scale, even before counting the integration cost savings. This is why Databricks wins at enterprise scale — the speedup pays for itself."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Unity column RBAC IS the killer feature for banks."})," JPMorgan's MNPI separation (counterparty_id, trader_id, strategy = MNPI; trade_id, date, asset_class = public) is structurally hard without column-level RBAC. Row-level RBAC can't prevent a public-team analyst from SELECTing MNPI columns. Pre-Databricks (Teradata + SAS), banks used bespoke column-masking views — slow, brittle, error-prone. Unity's column-level RBAC + tags (sensitivity=MNPI, regulation=SEC-17a-4) is the only structural answer. This is why JPMorgan, Goldman Sachs, Morgan Stanley chose Databricks over Snowflake for risk workloads."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Databricks vs Snowflake IS the Oracle vs Teradata redux."})," Oracle won enterprise OLTP (transactional) — Teradata won enterprise analytics. Databricks (Oracle play: closed-source, full-stack) is winning ML-heavy enterprise. Snowflake (Teradata play: closed-source, BI-focused) is winning BI-heavy enterprise. The 2020s lakehouse battle is structurally the 1990s database battle — full-stack closed vs analytics-specialist closed. Both are winning, in different segments. The open challengers (Tabular SaaS, Polaris OSS, self-hosted Trino) are the PostgreSQL plays."]})]})}),(0,a.jsxs)(f.DeeperThoughtSection,{pageTitle:"Databricks Lakehouse",children:[(0,a.jsx)(f.DeeperThought,{title:"Databricks Lakehouse IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,a.jsx)("p",{children:"This page about Databricks Lakehouse is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Databricks Lakehouse connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Databricks Lakehouse sits in the computational-science landscape."})}),(0,a.jsx)(f.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,a.jsx)("p",{children:"In a decade, the specific tools on this page (Databricks Lakehouse) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,a.jsx)(f.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,a.jsx)(f.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,a.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,a.jsx)(f.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,a.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,a.jsx)(u.RelatedTopics,{topics:[{id:"delta-lake",reason:"Delta Lake is the storage layer of Databricks Lakehouse (Apache-licensed spec)"},{id:"iceberg",reason:"Apache Iceberg — Tabular's table format, sibling to Delta"},{id:"tabular",reason:"Tabular SaaS Iceberg — Databricks lost the 2024 bidding war to Snowflake"},{id:"snowflake-polaris",reason:"Snowflake's open catalog counter-bet to Unity Catalog"},{id:"catalogs",reason:"Unity vs Polaris vs Glue vs Nessie vs HMS — 6-catalog comparison"},{id:"data-lakehouse",reason:"Anchor concept — lake→lakehouse evolution"},{id:"ml-platform",reason:"ML platform concepts (feature store, model registry, serving)"},{id:"feature-store",reason:"Databricks Feature Store — train/serve consistency"}]}),(0,a.jsx)(o.ResearchDemo,{pageId:"databricks-lakehouse"}),(0,a.jsx)(l.TrendAnticipation,{pageId:"databricks-lakehouse"}),(0,a.jsx)(n.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"delta-lake",reason:"Delta Lake is the storage layer of Databricks Lakehouse (Apache-licensed spec)"},{id:"iceberg",reason:"Apache Iceberg — Tabular's table format, sibling to Delta"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(t.default,{href:(0,p.hrefFor)("delta-lake"),className:"text-sm text-primary hover:underline",children:"→ Delta Lake (Databricks storage layer)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("tabular"),className:"text-sm text-primary hover:underline",children:"→ Tabular SaaS (Iceberg competitor, lost bid)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("snowflake-polaris"),className:"text-sm text-primary hover:underline",children:"→ Snowflake Polaris (open catalog counter-bet)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("catalogs"),className:"text-sm text-primary hover:underline",children:"→ Catalogs comparison (Unity vs Polaris vs Glue)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("data-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Data Lakehouse (concept anchor)"})]})]})}e.s(["DatabricksLakehousePage",()=>U])}]);