(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,897187,e=>{"use strict";var a=e.i(843476),s=e.i(522016),t=e.i(271645),o=e.i(846932),r=e.i(862824),n=e.i(342046),i=e.i(921371),l=e.i(580296),c=e.i(122836),d=e.i(716675),u=e.i(59938),g=e.i(158960),p=e.i(12665),h=e.i(901752),m=e.i(487486),f=e.i(332017),S=e.i(727927),b=e.i(658041),T=e.i(691385),k=e.i(227516),w=e.i(581418),x=e.i(966992),y=e.i(178583),A=e.i(283086),E=e.i(25652),v=e.i(618393);let _=`# ============================================================
# Snowflake Polaris — Apache-licensed REST catalog (2024)
# Strategic counter-bet to Databricks' closed Unity Catalog
# Snowflake made it open-source specifically to win the catalog battle
# ============================================================

# Polaris catalog server config (polaris-server.yml)
server:
  port: 8181
  host: 0.0.0.0
  base_path: /api/catalog       # Iceberg REST catalog endpoint

# Storage credentials (multi-cloud: AWS + GCP + Azure)
storage:
  - name: aws-moderndatascieng
    type: S3
    role_arn: arn:aws:iam::123456789012:role/polaris-iceberg
    region: us-east-1
  - name: gcp-moderndatascieng
    type: GCS
    project: moderndatascieng-prod
    service_account: polaris@moderndatascieng-prod.iam.gserviceaccount.com
  - name: azure-moderndatascieng
    type: AZURE
    tenant_id: abc-123
    storage_account: moderndatasciengprod

# Catalog namespaces (multi-tenant) — Polaris can host many orgs
catalog:
  namespaces:
    - name: warehouse
      storage: aws-moderndatascieng
      location: s3://moderndatascieng-polaris/warehouse
    - name: ml_features
      storage: gcp-moderndatascieng
      location: gs://moderndatascieng-polaris-ml/features
    - name: finance
      storage: azure-moderndatascieng
      location: abfss://finance@moderndatasciengprod.dfs.core.windows.net/

# Auth (OAuth2 — all clients must authenticate)
auth:
  type: oauth2
  issuer: https://auth.moderndatascieng.com
  client_id: polaris-iceberg
  scope: catalog_read_write       # PRINCIPAL_ROLE:ALL equivalent

# Access control (RBAC + grants — Snowflake's open RBAC model)
access:
  principals:
    - name: spark-emr-prod
      type: SERVICE
      grants: ["warehouse:USE_CATALOG", "warehouse:USE_NAMESPACE",
               "warehouse.orders_fct:SELECT",
               "warehouse.orders_fct:INSERT",
               "ml_features.*:SELECT"]
    - name: trino-athena
      type: SERVICE
      grants: ["warehouse:USE_CATALOG", "warehouse:USE_NAMESPACE",
               "warehouse.orders_fct:SELECT",
               "warehouse.dim_customer:SELECT"]
    - name: duckdb-analysts
      type: GROUP
      grants: ["warehouse.orders_fct:SELECT"]
    - name: snowflake-reader
      type: SERVICE
      grants: ["warehouse.orders_fct:SELECT",
               "warehouse.dim_customer:SELECT"]
  roles:
    - name: reader
      grants: ["warehouse:USE_CATALOG", "warehouse:USE_NAMESPACE", "*:SELECT"]
    - name: writer
      grants: ["reader", "*:INSERT", "*:UPDATE", "*:DELETE"]

# Lineage + audit (every catalog call logged for compliance)
governance:
  lineage: true
  audit_log:
    destination: s3://moderndatascieng-audit/polaris/
    format: parquet
    partition_by: [date]`,P=`-- ============================================================
-- Spark SQL — multi-engine Iceberg reads via Polaris REST catalog
-- Spark writes, Snowflake/Trino/DuckDB read (one catalog)
-- ============================================================

-- Configure Spark to use Polaris REST catalog (OAuth2 auth)
-- In spark-defaults.conf:
--   spark.sql.catalog.polaris                            org.apache.iceberg.spark.SparkCatalog
--   spark.sql.catalog.polaris.catalog-impl                org.apache.iceberg.rest.RESTCatalog
--   spark.sql.catalog.polaris.uri                        https://polaris.moderndatascieng.com/api/catalog
--   spark.sql.catalog.polaris.credential                 \${POLARIS_CREDENTIAL}
--   spark.sql.catalog.polaris.warehouse                   s3://moderndatascieng-polaris
--   spark.sql.catalog.polaris.scope                       PRINCIPAL_ROLE:ALL

-- Create an Iceberg table — Spark writes, Polaris catalogs metadata
CREATE TABLE polaris.warehouse.orders_fct (
  order_id        BIGINT,
  customer_id     BIGINT,
  order_ts        TIMESTAMP,
  ship_country    STRING,
  amount_usd      DECIMAL(18, 4),
  currency        STRING,
  is_deleted      BOOLEAN
) USING iceberg
PARTITIONED BY (days(order_ts), bucket(16, customer_id))
TBLPROPERTIES (
  'format-version'              = '2',                -- v2 enables row-level deletes
  'write.format.default'         = 'parquet',
  'write.parquet.compression'    = 'zstd',
  'write.target-file-size-bytes' = '536870912'        -- 512 MB target files
);

-- INSERT 5TB batch — Spark commits, Polaris catalogs metadata
INSERT INTO polaris.warehouse.orders_fct
SELECT * FROM staging.orders_raw WHERE order_date = '2024-09-25';

-- Time travel — read as-of 30 days ago (Polaris manages manifest tree)
SELECT customer_id, count(*) AS n_events, sum(amount_usd) AS total_spend
FROM polaris.warehouse.orders_fct
FOR SYSTEM_TIME AS OF TIMESTAMP '2024-08-26 00:00:00'
GROUP BY customer_id;

-- Multi-cloud JOIN — one Polaris catalog manages S3 + ADLS + GCS
SELECT region, count(*) AS n_events, sum(amount) AS total_revenue
FROM (
  SELECT 'us-east-1' AS region, * FROM polaris.aws.customer_events
  UNION ALL
  SELECT 'eu-west-1' AS region, * FROM polaris.azure.customer_events
  UNION ALL
  SELECT 'asia-east1' AS region, * FROM polaris.gcp.customer_events
)
GROUP BY region ORDER BY total_revenue DESC;

-- RBAC — Polaris principal grants apply across all engines
GRANT CATALOG_USAGE ON CATALOG polaris TO ROLE spark_writer;
GRANT SELECT, INSERT ON TABLE polaris.warehouse.orders_fct TO ROLE spark_writer;
GRANT SELECT ON TABLE polaris.warehouse.orders_fct TO ROLE trino_reader;
GRANT SELECT ON TABLE polaris.warehouse.orders_fct TO ROLE snowflake_reader;
GRANT SELECT ON TABLE polaris.warehouse.orders_fct TO ROLE duckdb_reader;`,R=`-- ============================================================
-- Snowflake external Iceberg tables — cross-engine read via Polaris
-- Snowflake reads Iceberg on S3 WITHOUT copying into Snowflake storage
-- ============================================================

-- 1. Create security integration for OAuth2 to Polaris
CREATE SECURITY INTEGRATION polaris_oauth
  TYPE = OAUTH
  OAUTH_CLIENT = 'CUSTOM'
  OAUTH_REDIRECT_URI = 'https://moderndatascieng.snowflakecomputing.com/oauth-callback'
  OAUTH_ISSUE_REFRESH_TOKENS = TRUE;

-- 2. Create a catalog integration pointing to Polaris
CREATE CATALOG INTEGRATION polaris_catalog
  CATALOG_SOURCE = 'POLARIS'                  -- Snowflake's native Polaris integration
  CATALOG_NAMESPACE = 'warehouse'
  TABLE_FORMAT = 'ICEBERG'
  REST_CONFIG = (
    CATALOG_URI = 'https://polaris.moderndatascieng.com/api/catalog'
    WAREHOUSE  = 's3://moderndatascieng-polaris'
  )
  REST_AUTHENTICATION = (
    AUTH_TYPE = 'OAUTH'
    OAUTH_TOKEN_URI = 'https://auth.moderndatascieng.com/oauth/token'
  )
  ENABLED = TRUE;

-- 3. Create an external table — Snowflake reads Iceberg directly from S3
CREATE EXTERNAL TABLE orders_fct_ext
  USING CATALOG (POLARIS_CATALOG)
  CATALOG_TABLE = 'warehouse.orders_fct'
  STORAGE_LOCATION = 's3://moderndatascieng-polaris/warehouse/orders_fct';

-- 4. Query — Snowflake reads Iceberg directly (no copy into Snowflake storage)
SELECT
    customer_id,
    count(*)          AS n_orders,
    sum(amount_usd)  AS total_revenue
FROM orders_fct_ext
WHERE order_ts >= '2024-09-01'
GROUP BY customer_id
ORDER BY total_revenue DESC LIMIT 100;

-- 5. Time travel — Snowflake's FOR syntax on Iceberg snapshots
SELECT * FROM orders_fct_ext
  FOR (TIMESTAMP => '2024-09-01 10:00:00');

-- 6. Cross-join Polaris Iceberg + Snowflake-native tables
SELECT
    o.order_id,
    o.amount_usd,
    c.customer_email           -- from Snowflake-native dim_customer
FROM orders_fct_ext  o
JOIN dim_customer    c ON o.customer_id = c.customer_id;

-- 7. Multi-cloud federation — Snowflake reads AWS + Azure + GCP via Polaris
CREATE EXTERNAL TABLE aws_events_ext
  USING CATALOG (POLARIS_CATALOG) CATALOG_TABLE = 'aws.customer_events';
CREATE EXTERNAL TABLE azure_events_ext
  USING CATALOG (POLARIS_CATALOG) CATALOG_TABLE = 'azure.customer_events';
CREATE EXTERNAL TABLE gcp_events_ext
  USING CATALOG (POLARIS_CATALOG) CATALOG_TABLE = 'gcp.customer_events';

SELECT region, count(*) AS n_events FROM (
  SELECT 'us-east-1'  AS region, * FROM aws_events_ext
  UNION ALL
  SELECT 'eu-west-1'  AS region, * FROM azure_events_ext
  UNION ALL
  SELECT 'asia-east1' AS region, * FROM gcp_events_ext
)
GROUP BY region;`,N=`-- ============================================================
-- Trino + Polaris — federated SQL across Iceberg catalogs
-- Trino reads via Polaris REST catalog (no Spark needed)
-- ============================================================

-- Trino config (config.properties):
--   connector.name=iceberg
--   iceberg.catalog.type=rest
--   iceberg.rest-catalog.uri=https://polaris.moderndatascieng.com/api/catalog
--   iceberg.rest-catalog.credential=POLARIS_CREDENTIAL
--   iceberg.rest-catalog.warehouse=s3://moderndatascieng-polaris
--   iceberg.rest-catalog.scope=PRINCIPAL_ROLE:ALL

-- Read an Iceberg table via Trino + Polaris (super-fast vectorised)
SELECT
    order_ts,
    ship_country,
    sum(amount_usd) AS daily_revenue,
    count(*)         AS n_orders
FROM polaris.warehouse.orders_fct
WHERE order_ts >= DATE '2024-09-01'
  AND ship_country IN ('UK', 'EU')
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC
LIMIT 100;

-- Time travel in Trino via Polaris REST catalog
SELECT * FROM polaris.warehouse.orders_fct
  FOR VERSION AS OF 1234567890;

SELECT * FROM polaris.warehouse.orders_fct
  FOR SYSTEM_TIME AS OF TIMESTAMP '2024-09-01 10:00:00';

-- Snapshot inspection — Polaris metadata via Trino system tables
SELECT
    snapshot_id,
    parent_id,
    committed_at,
    operation,
    summary['added-data-files']   AS added_files,
    summary['deleted-data-files'] AS deleted_files,
    summary['total-records']      AS records
FROM polaris.warehouse.orders_fct.snapshots
ORDER BY committed_at DESC LIMIT 10;

-- Federated cross-catalog JOIN: Polaris + Glue + MySQL + Kafka
SELECT
    o.order_id,
    o.amount_usd,
    c.customer_email_hash,         -- from Glue catalog (federated)
    k.last_seen                    -- from Kafka topic (live CDC)
FROM polaris.warehouse.orders_fct AS o
JOIN glue.dim_customer             AS c ON o.customer_id = c.customer_id
JOIN kafka.live.customer_activity  AS k ON o.customer_id = k.customer_id
WHERE o.order_ts >= CURRENT_DATE - 7;`,C=`-- ============================================================
-- DuckDB + Polaris — laptop-scale analytics on production Iceberg
-- Same REST catalog as Spark/Trino/Snowflake — single RBAC policy
-- ============================================================

-- Install + load the Iceberg extension
INSTALL iceberg;
LOAD iceberg;

-- Attach to Polaris REST catalog (OAuth2 auth, same as production engines)
ATTACH 'polaris_rest' AS polaris (
  TYPE iceberg,
  URI 'https://polaris.moderndatascieng.com/api/catalog',
  WAREHOUSE 's3://moderndatascieng-polaris',
  CREDENTIAL 'POLARIS_CREDENTIAL',
  SCOPE 'PRINCIPAL_ROLE:ALL'
);

-- Query the Polaris-governed Iceberg table — DuckDB uses Arrow's reader
SELECT
    order_ts::DATE AS day,
    ship_country,
    sum(amount_usd) AS daily_revenue,
    count(*)        AS n_orders
FROM polaris.warehouse.orders_fct
WHERE order_ts >= '2024-09-01'
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC
LIMIT 100;

-- Time-travel via DuckDB + Polaris
SELECT * FROM polaris.warehouse.orders_fct
  FOR VERSION AS OF 1234567890;

SELECT * FROM polaris.warehouse.orders_fct
  FOR SYSTEM_TIME AS OF TIMESTAMP '2024-09-01 10:00:00';

-- Export an Iceberg snapshot to Parquet (e.g. for sharing)
COPY (SELECT * FROM polaris.warehouse.orders_fct)
TO 'orders_export.parquet' (FORMAT PARQUET, COMPRESSION ZSTD);

-- JOIN with local CSVs — DuckDB's superpower, on production Iceberg data
SELECT
    o.order_id,
    o.amount_usd,
    fx.rate_gbp                              -- from local CSV
FROM polaris.warehouse.orders_fct o
JOIN read_csv_auto('fx_rates.csv') fx ON o.currency = fx.currency
WHERE o.order_ts >= '2024-09-01';

-- Multi-cloud JOIN via Polaris (one catalog, three clouds)
SELECT region, count(*) AS n_events FROM (
  SELECT 'us-east-1' AS region, * FROM polaris.aws.customer_events
  UNION ALL
  SELECT 'eu-west-1' AS region, * FROM polaris.azure.customer_events
  UNION ALL
  SELECT 'asia-east1' AS region, * FROM polaris.gcp.customer_events
)
GROUP BY region;`,I=`# ============================================================
# Snowflake Polaris — in-browser simulation
# Multi-engine Iceberg REST catalog (Apache-licensed, 2024)
# ============================================================

import math
import random
from collections import defaultdict, deque

# --- Synthetic Polaris REST catalog ---
class PolarisCatalog:
    """Simulated Snowflake Polaris REST catalog (Apache-licensed)."""
    def __init__(self):
        self.tables = {}            # namespace -> table_name -> Table
        self.principals = defaultdict(list)  # role -> [grants]
        self.audit_log = []         # every catalog call logged
        self.cache = {}             # metadata cache
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
    def grant(self, role, namespace, table, perm):
        self.principals[role].append({
            'namespace': namespace, 'table': table, 'perm': perm
        })
    def list_tables(self, namespace):
        self._log("list_tables", namespace, None)
        return list(self.tables.get(namespace, {}).keys())
    def _log(self, action, ns, tbl):
        self.audit_log.append({
            'action': action, 'namespace': ns, 'table': tbl,
            'timestamp': len(self.audit_log) + 1,
        })

class Table:
    """Simulated Iceberg table managed by Polaris."""
    def __init__(self, name, n_rows, n_files, cloud):
        self.name = name
        self.n_rows = n_rows
        self.n_files = n_files
        self.cloud = cloud
        self.snapshots = []
    @property
    def size_gb(self):
        return self.n_rows * 64 / 1e9

# --- Simulate Snowflake Polaris cross-engine lakehouse ---
random.seed(42)
print("=== Snowflake Polaris — Apache-licensed REST catalog (2024) ===\\n")
print("Strategic counter-bet to Databricks' closed Unity Catalog")
print("Multi-cloud (S3+ADLS+GCS), multi-engine (Snowflake+Spark+Trino+DuckDB)\\n")

cat = PolarisCatalog()

# Register 10TB of Iceberg tables across 3 clouds
clouds = ['aws', 'azure', 'gcp']
for cloud in clouds:
    for t_idx in range(3):
        n_rows = random.randint(2_000_000, 5_000_000)
        t = Table(f"customer_events_{t_idx}", n_rows, n_rows // 100_000, cloud)
        cat.register_table(cloud, t)
        # Snapshot chain
        for snap_idx in range(5):
            t.snapshots.append({
                'snapshot_id': snap_idx + 1,
                'op': 'append',
                'rows': random.randint(500_000, 1_500_000),
            })

# 1. Multi-engine catalog call latency (sub-second via REST + cache)
print("=== Catalog call latency (REST API, OAuth2 auth) ===")
n_calls = 100
latencies = []
for _ in range(n_calls):
    if random.random() < 0.85:
        latencies.append(random.uniform(2, 10))   # warm cache
    else:
        latencies.append(random.uniform(50, 200)) # cold
latencies.sort()
print(f"  P50: {latencies[50]:.1f}ms  P95: {latencies[95]:.1f}ms  "
      f"P99: {latencies[99]:.1f}ms")
print(f"  Cache hit rate: {cat.cache_hits/(cat.cache_hits+cat.cache_misses+1)*100:.0f}%")

# 2. RBAC — principal grants across all engines
print(f"\\n=== RBAC — principal grants (one policy, all engines) ===")
grants = [
    ("spark_writer",     "warehouse.orders_fct", "SELECT, INSERT"),
    ("trino_reader",     "warehouse.orders_fct", "SELECT"),
    ("duckdb_reader",    "warehouse.orders_fct", "SELECT"),
    ("snowflake_reader", "warehouse.orders_fct", "SELECT"),
    ("spark_writer",     "ml_features.*",        "SELECT"),
]
for role, table, perm in grants:
    cat.grant(role, "warehouse", table, perm)
    print(f"  GRANT {perm:18s} ON {table:35s} TO ROLE {role}")

# 3. Multi-engine query latency on same 10TB table
print(f"\\n=== Multi-engine query latency (10TB, same Iceberg table) ===")
engines = [
    ("Snowflake (external)", "vectorised + S3-native", 6.5),
    ("Spark (Photon)",       "vectorised SIMD",          8.0),
    ("Trino",                "vectorised + federated",  9.5),
    ("DuckDB",               "laptop, no cluster",     15.0),
]
for engine, arch, avg_lat_s in engines:
    latencies = [random.uniform(avg_lat_s - 1, avg_lat_s + 2) for _ in range(10)]
    avg = sum(latencies) / len(latencies)
    print(f"  {engine:25s} ({arch}): avg {avg:.1f}s")

# 4. Cross-engine snapshot consistency (Iceberg atomicity)
print(f"\\n=== Cross-engine snapshot consistency ===")
t = cat.get_table("aws", "customer_events_0")
print(f"  Table: aws.customer_events_0 ({t.cloud} cloud)")
print(f"  Total snapshots: {len(t.snapshots)}")
print(f"  Latest snapshot: {t.snapshots[-1]}")
print(f"  Spark INSERT commits at T=10:30:00 -> new snapshot")
print(f"  Snowflake query starts at T=10:30:01 -> reads new snapshot")
print(f"  Trino query starts at T=10:30:02 -> reads same snapshot")
print(f"  Drift: 0 (atomic Iceberg snapshot, no torn reads)")

# 5. Audit log — every catalog call logged
print(f"\\n=== Audit log (every catalog call) ===")
print(f"  Total events: {len(cat.audit_log)}")
for event in cat.audit_log[:5]:
    print(f"  ts={event['timestamp']} action={event['action']:20s} "
          f"ns={event['namespace']} tbl={event['table']}")
print(f"  ... ({len(cat.audit_log)-5} more)")

# 6. Storage cost — Polaris external vs Snowflake-managed
print(f"\\n=== Storage cost (10TB, 1 year) ===")
snowflake_managed_cost = 10 * 23 * 12    # USD 23/TB/mo Snowflake-managed
polaris_s3_cost = 10 * 0.023 * 12 * 4   # USD 0.023/TB/mo S3 + Iceberg overhead
print(f"  Snowflake-managed (prior model): USD {snowflake_managed_cost:,.0f}/year")
print(f"  Polaris external + S3:           USD {polaris_s3_cost:,.0f}/year")
print(f"  Savings: USD {snowflake_managed_cost - polaris_s3_cost:,.0f}/year "
      f"({(snowflake_managed_cost-polaris_s3_cost)/snowflake_managed_cost*100:.0f}%)")
print(f"  -> data stays on S3, no copy into Snowflake storage")

# 7. OAuth2 — single credential across all engines
print(f"\\n=== OAuth2 — single credential across all engines ===")
print(f"  ENV: POLARIS_CREDENTIAL (one OAuth2 token)")
print(f"  Token lifetime: 1 hour (auto-refresh)")
print(f"  Scope: PRINCIPAL_ROLE:ALL (all roles assigned to principal)")
print(f"  Applies to: Snowflake + Spark + Trino + DuckDB")
print(f"  No per-engine IAM role to manage")

# Strategic comparison
print(f"\\n=== Strategic comparison: Polaris vs Unity vs Glue ===")
print(f"  Polaris (Snowflake 2024, Apache-licensed, multi-cloud, multi-engine)")
print(f"  Unity  (Databricks 2021, closed, Databricks-bound, single-engine)")
print(f"  Glue   (AWS 2016, AWS-managed, AWS-only, multi-engine)")
print(f"\\nKey insight: Polaris is Snowflake's explicit counter-bet to")
print(f"Databricks Unity. By making it Apache-licensed, Snowflake aims to")
print(f"become the universal catalog — earning compute revenue even on data")
print(f"not in Snowflake-managed storage. Single OAuth2 credential, single")
print(f"RBAC policy, single audit log across all engines. The strategic")
print(f"pivot: customers want open catalogs, Snowflake meets them.")`;function j(){let[e,s]=(0,t.useState)("polaris"),r={s3:{label:"S3 (AWS)",desc:"AWS S3 bucket — Iceberg data files. Customer's bucket, Snowflake never sees the bytes",level:0},adls:{label:"ADLS (Azure)",desc:"Azure ADLS Gen2 — same Polaris catalog manages EU customer data for GDPR residency",level:0},gcs:{label:"GCS (GCP)",desc:"Google Cloud Storage — same Polaris catalog manages APAC customer data",level:0},polaris:{label:"Polaris (Apache REST catalog)",desc:"Snowflake's Apache-licensed REST catalog (2024). Multi-cloud, OAuth2 auth, RBAC, lineage, audit. Counter-bet to Unity",level:1},spark:{label:"Apache Spark",desc:"Primary write engine — REST catalog client, OAuth2 auth, writes Iceberg data files",level:2},snowflake:{label:"Snowflake (external)",desc:"External Iceberg tables — reads Polaris-managed data without copy into Snowflake storage",level:2},trino:{label:"Trino",desc:"Federated SQL via Polaris REST catalog — vectorised execution, cross-catalog JOINs",level:2},duckdb:{label:"DuckDB",desc:"Laptop-scale analytics — same Polaris catalog, no cluster needed",level:2}},n={s3:{x:60,y:30},adls:{x:60,y:90},gcs:{x:60,y:150},polaris:{x:220,y:90},spark:{x:360,y:30},snowflake:{x:360,y:90},trino:{x:360,y:150},duckdb:{x:360,y:210}};return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(S.Cloud,{className:"h-3.5 w-3.5 text-primary"}),"Polaris architecture — multi-cloud storage + multi-engine compute via single Apache-licensed REST catalog"]})}),(0,a.jsxs)("div",{className:"p-3",children:[(0,a.jsxs)("svg",{viewBox:"0 0 440 250",className:"w-full h-auto",children:[[["s3","polaris"],["adls","polaris"],["gcs","polaris"],["polaris","spark"],["polaris","snowflake"],["polaris","trino"],["polaris","duckdb"],["spark","s3"],["snowflake","s3"],["trino","s3"],["duckdb","s3"]].map(([e,s],t)=>{let o=n[e],r=n[s];return(0,a.jsx)("line",{x1:o.x,y1:o.y,x2:r.x,y2:r.y,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow)"},t)}),Object.entries(n).map(([t,n])=>{let i=e===t,l=r[t],c=0===l.level?"var(--chart-3)":1===l.level?"var(--chart-2)":"var(--chart-1)";return(0,a.jsxs)(o.motion.g,{onMouseEnter:()=>s(t),onMouseLeave:()=>s(null),animate:{scale:i?1.05:1},style:{cursor:"pointer"},children:[(0,a.jsx)("rect",{x:n.x-60,y:n.y-12,width:"120",height:"24",rx:"3",fill:i?c+"30":"var(--background)",stroke:c,strokeWidth:i?1.5:.8}),(0,a.jsx)("text",{x:n.x,y:n.y+4,textAnchor:"middle",fontSize:"7",fill:i?c:"var(--foreground)",fontWeight:i?"bold":"normal",children:l.label})]},t)}),(0,a.jsx)("defs",{children:(0,a.jsx)("marker",{id:"arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,a.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,a.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:r[e].label}),(0,a.jsx)("p",{className:"text-muted-foreground",children:r[e].desc})]}),!e&&(0,a.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node — Polaris sits between multi-cloud storage (S3+ADLS+GCS) and multi-engine compute (Spark+Snowflake+Trino+DuckDB)."})]})]})}function O(){return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(S.Cloud,{className:"h-3.5 w-3.5 text-primary"}),"Polaris vs Unity vs Glue vs Nessie — Apache-licensed open catalog battlefront"]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-xs",children:[(0,a.jsx)("thead",{className:"bg-muted/30",children:(0,a.jsxs)("tr",{className:"border-b border-border/60",children:[(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Polaris"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Unity"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Glue"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Nessie"})]})}),(0,a.jsx)("tbody",{children:[{feature:"Origin year",polaris:"2024 (Snowflake)",unity:"2021 (Databricks)",glue:"2016 (AWS)",nessie:"2020 (Dremio)"},{feature:"Vendor",polaris:"Snowflake -> Apache",unity:"Databricks",glue:"AWS",nessie:"Dremio -> Apache"},{feature:"Open-source",polaris:"Yes (Apache)",unity:"No (Databricks)",glue:"No (managed)",nessie:"Yes (Apache)"},{feature:"Self-host option",polaris:"Yes",unity:"No",glue:"No",nessie:"Yes"},{feature:"Multi-cloud",polaris:"Yes (S3+ADLS+GCS)",unity:"Databricks regions only",glue:"AWS only",nessie:"Yes"},{feature:"Branching",polaris:"No (planned)",unity:"No",glue:"No",nessie:"Yes (Git-for-data)"},{feature:"Column-level RBAC",polaris:"Yes (open)",unity:"Yes (closed)",glue:"Via Lake Formation",nessie:"Limited"},{feature:"OAuth2 cross-engine",polaris:"Yes (single credential)",unity:"No (Databricks-only)",glue:"No (AWS IAM)",nessie:"Yes"},{feature:"Native compute",polaris:"Snowflake+Spark+Trino+DuckDB",unity:"Databricks Photon only",glue:"Athena+Redshift+EMR",nessie:"Dremio+Spark+Flink"},{feature:"Snowflake integration",polaris:"Native (external tables)",unity:"Read-only via Iceberg connector",glue:"Via Snowflake Glue integration",nessie:"Via REST connector"},{feature:"Best fit",polaris:"Cross-engine open lakehouse",unity:"Databricks ecosystem",glue:"AWS-only lakes",nessie:"Branch-based dev"},{feature:"Production use",polaris:"Snowflake customers + Tabular team",unity:"All Databricks customers",glue:"100% AWS lakes",nessie:"Stripe, Adobe"}].map((e,s)=>(0,a.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,a.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,a.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.polaris}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.unity}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.glue}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.nessie})]},s))})]})})]})}let L=[{label:"Origin",value:"Snowflake 2024",hint:"Snowflake open-sourced Polaris (May 2024) as the explicit counter-bet to Databricks' closed Unity Catalog — Apache-licensed, multi-cloud, multi-engine",deltaTone:"up"},{label:"Apache-licensed",value:"Yes",hint:"The only Apache-licensed REST catalog built by a major cloud vendor. Snowflake made it open-source specifically to win the catalog battle — betting customers prefer open catalogs",deltaTone:"up"},{label:"Multi-cloud",value:"S3 + ADLS + GCS",hint:"One Polaris catalog manages storage on three cloud providers. Single OAuth2 credential, single RBAC policy, single audit log across clouds",deltaTone:"up"},{label:"Cross-engine reads",value:"4+ engines",hint:"Snowflake (external tables) + Apache Spark + Trino + DuckDB all read the same Iceberg tables via Polaris. Single snapshot — consistent reads, zero drift",deltaTone:"up"}];function D(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(r.PageHeader,{eyebrow:"Snowflake Polaris · Apache-licensed REST catalog · open lakehouse · 2024",title:"Snowflake Polaris — the Apache-licensed REST catalog for the open lakehouse",description:"Snowflake Polaris (released May 2024, Apache-licensed) is Snowflake's strategic counter-bet to Databricks' closed Unity Catalog. By making the catalog open-source, Snowflake aims to become the universal catalog for cross-engine lakehouses — Snowflake + Spark + Trino + DuckDB all read the same Iceberg tables through one REST endpoint, one OAuth2 credential, one RBAC policy. The strategic pivot: customers keep data on S3 in Iceberg format, Snowflake reads via external tables (no copy into Snowflake-managed storage), but Snowflake earns compute revenue on the queries. This is the explicit inversion of Databricks' Unity strategy (closed catalog + Databricks compute) — Snowflake's bet is that customers prefer open catalogs and that Polaris becomes the universal catalog with Snowflake as the reference deployment. Multi-cloud (S3 + ADLS + GCS in one catalog), cross-engine federation (4+ engines, single snapshot, zero drift), and external Iceberg tables (no copy into Snowflake storage — 1000× storage cost savings at 10TB scale).",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(S.Cloud,{className:"h-3 w-3"})," Apache REST"]}),(0,a.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(T.Atom,{className:"h-3 w-3"})," Open lakehouse"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:L.map(e=>(0,a.jsx)(r.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(r.SectionCard,{title:"Polaris architecture — multi-cloud storage + multi-engine compute via single Apache-licensed REST catalog",description:"Polaris sits between multi-cloud storage (S3 + ADLS + GCS) and multi-engine compute (Snowflake external + Apache Spark + Trino + DuckDB). It is the only Apache-licensed REST catalog built by a major cloud vendor — Snowflake made it open-source (May 2024) to win the catalog battle. Multi-cloud: one catalog manages storage on three cloud providers with one OAuth2 credential. Cross-engine reads: 4+ compute engines read the same Iceberg tables through one REST endpoint, single snapshot (zero drift, no torn reads). External Iceberg tables: Snowflake reads via external tables — no copy into Snowflake-managed storage (1000× storage cost savings at 10TB scale).",icon:(0,a.jsx)(T.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,a.jsx)(j,{})}),(0,a.jsx)(r.SectionCard,{title:"Polaris catalog server config — YAML for production deployment",description:"Polaris server config is Apache-licensed — customers can self-host. Multi-cloud storage (S3 + ADLS + GCS in one catalog), multi-tenant namespaces (warehouse, ml_features, finance), OAuth2 authentication for all clients, RBAC with principals (SERVICE for compute engines, GROUP for analysts) + roles (reader, writer). Lineage + audit logging by default — every catalog call logged in Parquet for compliance.",icon:(0,a.jsx)(w.ShieldCheck,{className:"h-5 w-5"}),badge:"Polaris YAML",children:(0,a.jsx)(c.CodeBlock,{code:_,language:"yaml",filename:"polaris-server.yml",highlight:[7,8,9,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,38,39,40,41,42,43,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]})}),(0,a.jsx)(r.SectionCard,{title:"Spark SQL — multi-engine Iceberg reads via Polaris REST catalog",description:"Spark 3.5+ connects to Polaris REST catalog via OAuth2 (POLARIS_CREDENTIAL env var). Create an Iceberg table with v2 spec, INSERT 5TB, time travel via FOR SYSTEM_TIME AS OF, multi-cloud JOIN (one catalog manages S3 + ADLS + GCS), RBAC principal grants (GRANT SELECT ON TABLE TO ROLE) apply across all engines — Snowflake + Trino + DuckDB see the same tables via the same REST endpoint.",icon:(0,a.jsx)(b.Database,{className:"h-5 w-5"}),badge:"Spark SQL",children:(0,a.jsx)(c.CodeBlock,{code:P,language:"sql",filename:"polaris_spark.sql",highlight:[11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55]})}),(0,a.jsx)(r.SectionCard,{title:"Snowflake external Iceberg tables — cross-engine read via Polaris",description:"Snowflake's external Iceberg tables (2023) read Polaris-managed Iceberg directly from S3 — no copy into Snowflake-managed storage. Create a security integration (OAuth2 to Polaris), a catalog integration (Polaris REST endpoint), then external tables. Time travel via Snowflake's FOR (TIMESTAMP => ...) syntax. Cross-join Polaris Iceberg + Snowflake-native tables. Multi-cloud federation — Snowflake reads AWS + Azure + GCP Polaris tables in one query.",icon:(0,a.jsx)(S.Cloud,{className:"h-5 w-5"}),badge:"Snowflake SQL",children:(0,a.jsx)(c.CodeBlock,{code:R,language:"sql",filename:"polaris_snowflake.sql",highlight:[10,11,12,13,14,17,18,19,20,21,22,23,24,25,26,27,31,32,33,34,35,36,37,38,41,42,43,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]})}),(0,a.jsx)(r.SectionCard,{title:"Trino + Polaris — federated SQL across Iceberg catalogs",description:"Trino reads via Polaris REST catalog — no Spark needed. Vectorised execution makes Iceberg queries 5-10× faster than Spark SQL. Time travel via FOR VERSION AS OF / FOR SYSTEM_TIME AS OF. Snapshot inspection via Trino system tables (Polaris manages manifest tree transparently). Federated cross-catalog JOIN — Polaris + Glue + MySQL + Kafka in one query.",icon:(0,a.jsx)(x.Cpu,{className:"h-5 w-5"}),badge:"Trino SQL",children:(0,a.jsx)(c.CodeBlock,{code:N,language:"sql",filename:"polaris_trino.sql",highlight:[8,9,10,11,12,13,16,17,18,19,20,21,22,23,24,25,26,27,28,30,31,32,33,34,35,36,37,38,41,42,43,44,45,46,47,48]})}),(0,a.jsx)(r.SectionCard,{title:"DuckDB + Polaris — laptop-scale analytics on production Iceberg",description:"DuckDB 0.10+ reads Polaris-governed Iceberg tables directly — no Spark/Trino cluster needed. Same REST catalog endpoint, same OAuth2 credential as production engines. Perfect for: ad-hoc analytics on a laptop, CI/CD pipelines that need to inspect lake data, local development against production-style tables. JOINs with local CSVs — DuckDB's superpower on production Iceberg data. Multi-cloud JOIN via Polaris (one catalog, three clouds).",icon:(0,a.jsx)(b.Database,{className:"h-5 w-5"}),badge:"DuckDB SQL",children:(0,a.jsx)(c.CodeBlock,{code:C,language:"sql",filename:"polaris_duckdb.sql",highlight:[8,9,10,11,12,13,14,15,16,17,18,19,20,21,24,25,26,28,29,30,31,32,33,34,35,36,37,38,41,42,43,44,45,46,47,48,49,50,51,52,53]})}),(0,a.jsx)(r.SectionCard,{title:"Try it: simulate Snowflake Polaris in your browser (Pyodide)",description:"Pure-Python simulation of Snowflake Polaris — Apache-licensed REST catalog. Register 9 tables across 3 clouds (10TB total), measure catalog call latency (sub-200ms with 85% cache hit rate), see RBAC principal grants (one policy, all engines), multi-engine query latency (Snowflake + Spark + Trino + DuckDB on same 10TB table), cross-engine snapshot consistency (atomic Iceberg snapshot, zero drift), audit log of every catalog call, storage cost savings (1000× cheaper than Snowflake-managed storage at 10TB).",icon:(0,a.jsx)(A.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,a.jsx)(d.PyodideRunner,{code:I,buttonLabel:"Run Snowflake Polaris simulation (Pyodide)"})}),(0,a.jsx)(r.SectionCard,{title:"Polaris vs Unity vs Glue vs Nessie — Apache-licensed open catalog battlefront",description:"Four catalogs competing for the lakehouse metadata layer. Polaris (Snowflake, 2024, Apache, multi-cloud) is the open challenger. Unity (Databricks, 2021, closed, Databricks-bound) is the strong incumbent. Glue (AWS, 2016, AWS-managed, AWS-only) is the legacy. Nessie (Dremio, 2020, Apache, branching) is the Git-for-data specialist. The battle is between open (Polaris + Nessie) vs closed (Unity) vs managed-cloud (Glue). Snowflake's bet: open catalogs win in the long run because compute engines (Spark, Trino, Flink, DuckDB) are themselves open and prefer open catalogs.",icon:(0,a.jsx)(S.Cloud,{className:"h-5 w-5"}),children:(0,a.jsx)(O,{})}),(0,a.jsx)(r.SectionCard,{title:"Why Polaris evolved — shortfalls of vendor-locked catalogs (Era 3)",description:"Snowflake released Polaris (2024) to fix four structural shortfalls of vendor-locked catalogs (Unity, Glue) that became visible as customers moved to multi-cloud, multi-engine lakehouses. Polaris was designed ground-up to be the open counter-bet.",icon:(0,a.jsx)(k.History,{className:"h-5 w-5"}),badge:"Why Polaris",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Vendor-locked catalogs couldn't span clouds."})," Glue is AWS-only; Unity is Databricks-bound (Databricks regions). Customers with multi-cloud presence (disaster recovery, regulatory residency, avoiding cloud lock-in) needed per-cloud catalogs with bespoke federation glue. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Polaris is multi-cloud native — one catalog manages S3 + ADLS + GCS with one OAuth2 credential, one RBAC policy, one audit log."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: Closed catalogs couldn't serve multi-engine lakehouses."})," Unity governs only Databricks engines (Photon, Databricks SQL, Spark on Databricks). External engines (Trino, DuckDB, Snowflake itself) need bespoke connectors with different auth models. Customers wanting one Iceberg table read by Spark + Trino + DuckDB + Snowflake had to manage 4 separate integrations. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Polaris's REST catalog is the open protocol — any Iceberg engine with a REST client (Spark, Trino, DuckDB, Snowflake) reads via the same catalog endpoint with the same OAuth2 credential."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: Snowflake's 'data must be in Snowflake' was too expensive."})," Pre-2023 Snowflake required COPY INTO from S3 — duplicated storage (S3 raw + Snowflake-managed), Snowflake's storage at USD 23/TB/month vs S3 at USD 0.023/TB/month (1000× more expensive). At 10TB scale: USD 2,760/year savings per TB by keeping data on S3. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," External Iceberg tables + Polaris — Snowflake reads directly from S3 in Iceberg format, no copy into Snowflake-managed storage. Customers pay only compute, not duplicated storage."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: Snowflake was losing customers to Iceberg + open catalogs."})," By 2023, customers (Adobe, Stripe, Netflix) were moving to Iceberg + Glue/Nessie/Tabular for the multi-engine flexibility. Snowflake's options: (a) ignore and lose those customers, (b) acquire an open catalog company, (c) build open-source catalog in-house. They did both (b) and (c) — acquired Tabular (June 2024) and built Polaris (May 2024) with the Tabular team. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Polaris (Apache-licensed) + Tabular SaaS (managed) give Snowflake both the open-source catalog credibility and the managed offering."]})]})}),(0,a.jsx)(r.SectionCard,{title:"Truly unique Polaris features",description:"Four features that distinguish Polaris from every other lakehouse catalog — each is structural, not marketing fluff.",icon:(0,a.jsx)(A.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Apache-licensed by major vendor"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Snowflake is the only major cloud vendor to Apache-license its REST catalog. ",(0,a.jsx)("strong",{children:"Unity is Databricks-closed. Glue is AWS-managed. Polaris is the only open + vendor-backed catalog."})," Credibility comes from the Iceberg spec authors (Tabular team)."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Multi-cloud single catalog"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["One Polaris catalog manages S3 + ADLS + GCS. Single OAuth2 credential, single RBAC policy, single audit log. ",(0,a.jsx)("strong",{children:"Unity is Databricks-bound. Glue is AWS-only. Polaris is the only multi-cloud open catalog."})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Native Snowflake external tables"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Snowflake reads Polaris-managed Iceberg via external tables — no copy into Snowflake storage. ",(0,a.jsx)("strong",{children:"Unity needs Databricks for Snowflake cross-read. Glue needs bespoke integration."})," Polaris has Snowflake integration native (post-Tabular acquisition)."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Cross-engine snapshot consistency"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["4+ engines read same Polaris-governed Iceberg table — atomic snapshot, zero drift, no torn reads. ",(0,a.jsx)("strong",{children:"Spark INSERT at T1 → Snowflake query at T2 reads new snapshot — consistent across engines."})," Structurally impossible with vendor-locked catalogs."]})]})]})}),(0,a.jsx)(r.SectionCard,{title:"3 large-dataset examples — cards with 5-language code popups",description:"Three production-style Snowflake Polaris scenarios: external Iceberg tables on 10TB (cross-engine read), Polaris REST catalog on 5TB (4-engine federation), cross-engine federation on 1TB (Snowflake + Spark + Trino on same Iceberg table). Each is a clickable card opening a lazy popup with: scenario brief, dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,a.jsx)(b.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,a.jsx)(g.DatasetCards,{examples:p.SNOWFLAKE_POLARIS_EXAMPLES,intro:"Production-style Snowflake Polaris scenarios showing the open lakehouse counter-bet: external Iceberg tables on 10TB cross-engine read, Polaris REST catalog with 4 engines on 5TB, cross-engine federation with 3 engines on 1TB Iceberg table. Each card has Scala/Rust/Go/Elixir/Zig code with Polaris-specific primitives (REST catalog, OAuth2, external tables)."})}),(0,a.jsx)(r.SectionCard,{title:"Computational tooling — Polaris ecosystem",description:"Polaris's ecosystem spans 4+ compute engines that read its catalog and 3 cloud storage backends it abstracts. The catalog is Apache-licensed REST; the compute engines are independent. Cross-engine reads via single Polaris endpoint with single OAuth2 credential is the killer feature.",icon:(0,a.jsx)(v.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(x.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute engines (4+)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Snowflake (external tables)"})," — reads Polaris Iceberg directly, no copy"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Spark 3.5+"})," — primary write engine (PySpark/Scala/SQL/R)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Trino 425+"})," — federated SQL via Polaris REST catalog"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"DuckDB 0.10+"})," — laptop-scale analytics (no cluster)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Flink 1.18+"})," — streaming CDC ingestion (exactly-once)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Athena"})," — serverless Trino on S3 via Polaris"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(S.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Storage backends (3)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS S3"})," — primary Polaris deployment (us-east-1)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Azure ADLS Gen2"})," — EU customer PII (GDPR residency)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Google Cloud Storage"})," — APAC customers (local laws)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Multi-cloud single catalog"})," — one Polaris endpoint, three clouds"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"OAuth2 cross-cloud"})," — single credential across providers"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"RBAC + audit"})," — enforced at Polaris server (not per-engine)"]})]}),(0,a.jsxs)("p",{className:"font-semibold mt-3 mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(T.Atom,{className:"h-3.5 w-3.5 text-primary"})," Strategic integrations"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Snowflake external tables"})," — native (post-Tabular acquisition)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Tabular SaaS"})," — managed Polaris offering (Ryan Blue team)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Lake Formation"})," — LF integration with Polaris"]})]})]})]})}),(0,a.jsx)(r.SectionCard,{title:"Research + production case studies",description:"The 2024 Polaris release + Tabular acquisition reshaped the catalog battle — these are the strategic moves + early adopters.",icon:(0,a.jsx)(y.FileText,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Snowflake Polaris release (May 2024):"})," Snowflake open-sourced Polaris at Snowflake Summit 2024 as an Apache-licensed REST catalog. Built by the Tabular team (Ryan Blue, Daniel Weeks — Iceberg spec authors, Snowflake-acquired June 2024). The strategic goal: become the universal catalog for cross-engine lakehouses, earning compute revenue even on data not in Snowflake-managed storage. Explicit counter-bet to Databricks Unity."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Tabular acquisition (June 2024):"})," Snowflake acquired Tabular (Ryan Blue + Daniel Weeks' SaaS Iceberg platform) after a competitive bidding war with Databricks. Both wanted the Iceberg spec authors. Snowflake won by committing to keep Tabular Apache-licensed; Databricks would have integrated Tabular into Unity (closed-source). The Iceberg community preferred the Snowflake deal — keeping the spec authors independent."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Strategic inversion vs Unity:"})," Databricks made Unity closed (Databricks-only) because they bet customers buy the full Databricks stack. Snowflake made Polaris open (Apache) because they bet customers prefer open catalogs. The two strategies are explicit inversions — and the market will decide. My read: open catalogs win in the long run because compute engines (Spark, Trino, Flink, DuckDB) are themselves open and prefer open catalogs."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Snowflake external Iceberg tables (2023):"})," The precursor to Polaris — Snowflake added the ability to read Iceberg tables on S3 via external tables (no copy into Snowflake storage). Initial adoption: customers with existing Iceberg deployments (Adobe, Stripe) who wanted Snowflake compute without duplicating storage. Polaris (2024) generalised this to multi-cloud + multi-engine — Snowflake + Spark + Trino + DuckDB all read same tables."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Early adopters (2024+):"})," Snowflake customers (Adobe, CapitalOne, Western Union) extending their Snowflake investment to open Iceberg lakehouses. The pattern: keep Snowflake for BI workloads, use Polaris + Spark for ML workloads, all on same Iceberg data. Polaris avoids the Snowflake-data-must-be-in-Snowflake lock-in."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Apache Iceberg REST Catalog spec (2022):"})," The Iceberg spec's REST catalog API — any vendor can implement. Tabular (pre-Snowflake acquisition) launched a production REST catalog. AWS Glue implements the REST API (since 2023). Polaris is built on the spec. The REST catalog is the universal protocol — like how ODBC/JDBC standardised database access in the 1990s, the Iceberg REST spec is standardising lakehouse catalog access in the 2020s."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The 2024 catalog battle:"})," Snowflake open-sourcing Polaris (May) + acquiring Tabular (June) were the strategic escalations. Databricks had been winning via Unity (closed but powerful). Snowflake's counter was to make Polaris Apache-licensed, betting customers prefer open catalogs. Tabular acquisition gave Snowflake the Iceberg founding team. The bet: if the catalog is open, the format battle (Iceberg vs Delta) becomes less relevant — customers pick catalog first, format follows."]})]})}),(0,a.jsx)(r.SectionCard,{title:"My deeper thought: Polaris is Snowflake's 'if you can't beat them, open them' play",description:"The unifying view: Snowflake saw they were losing the catalog battle to open catalogs (Glue, Nessie, Tabular). They couldn't compete closed (Unity is closed and Snowflake's old model was also closed). So they made Polaris open — betting the open catalog wins.",icon:(0,a.jsx)(E.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Polaris IS Snowflake's 'if you can't beat them, open them' play."})," By 2023, customers were moving to Iceberg + open catalogs (Glue, Nessie, Tabular) for multi-engine flexibility. Snowflake's closed model ('data must be in Snowflake storage') was losing them deals. Their options: ignore (lose deals), acquire an open catalog company (Tabular), or build open-source in-house. They did both — acquired Tabular (June 2024) for the Iceberg team and built Polaris (May 2024) with them. The strategic pivot: bet that open catalogs win, become the reference deployment, earn compute revenue even on data not in Snowflake storage."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The storage cost inversion IS the strategic unlock."})," Pre-Polaris, Snowflake's storage was USD 23/TB/month — 1000× more expensive than S3 (USD 0.023/TB/month). At 10TB scale that's USD 2,760/year savings per customer. Pre-2023, customers paid it because Snowflake was the only game in town for fast BI. Post-Iceberg (Netflix 2017), customers had an alternative — store on S3 in Iceberg, query from Spark/Trino/DuckDB. Polaris makes this practical: Snowflake reads via external tables (no copy), so customers get Snowflake compute on S3-stored Iceberg. Storage cost drops 1000×, Snowflake keeps compute revenue."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The catalog IS the new control plane because it owns identity."})," In a database, the server owns table identity (schema.table). In a lakehouse, the catalog owns table identity (catalog.namespace.table). Whoever owns identity owns the control plane. Databricks made Unity closed to own identity for Databricks customers. Snowflake made Polaris open to own identity for everyone else — betting that the universal open catalog wins. If Polaris becomes the default, even non-Snowflake customers have Snowflake-controlled table identity. That's the same strategic position Databricks reached for with Unity. The 2024 catalog battle is the new database-vendor battle."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Open vs closed IS the strategy inversion."})," Databricks made Unity closed because they bet customers buy the full Databricks stack (Delta + Unity + Photon + MLflow). Snowflake made Polaris open because they bet customers prefer open catalogs and Polaris becomes universal — with Snowflake as the reference deployment. The two strategies are explicit inversions. The 1990s database battle had Oracle (closed, full-stack) vs PostgreSQL (open, modular). Oracle won enterprise; PostgreSQL won the long tail. The 2020s catalog battle has Unity (closed, full-stack) vs Polaris (open, modular). My read: Unity dominates Databricks ecosystem; Polaris wins the open ecosystem. Same pattern, 30 years later."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The Polaris + Tabular combo IS the AWS RDS + Aurora combo."})," AWS RDS (managed PostgreSQL) won by removing ops overhead for the open-source database. AWS Aurora (managed PostgreSQL-compatible with AWS-only features) won the higher-margin segment. Snowflake is replicating this for the lakehouse: Polaris = open-source catalog (RDS-like, self-hostable), Tabular SaaS = managed offering (Aurora-like, Snowflake-only features). Customers can choose open (Polaris self-hosted) or managed (Tabular SaaS) — both win Snowflake (compute revenue either way). The Polaris + Tabular combo is structurally the RDS + Aurora play, applied to lakehouse catalogs."]})]})}),(0,a.jsxs)(f.DeeperThoughtSection,{pageTitle:"Snowflake Polaris",children:[(0,a.jsx)(f.DeeperThought,{title:"Snowflake Polaris IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,a.jsx)("p",{children:"This page about Snowflake Polaris is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Snowflake Polaris connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Snowflake Polaris sits in the computational-science landscape."})}),(0,a.jsx)(f.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,a.jsx)("p",{children:"In a decade, the specific tools on this page (Snowflake Polaris) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,a.jsx)(f.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,a.jsx)(f.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,a.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,a.jsx)(f.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,a.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,a.jsx)(u.RelatedTopics,{topics:[{id:"tabular",reason:"Tabular SaaS — Snowflake-acquired June 2024, founded by Iceberg spec authors"},{id:"iceberg",reason:"Apache Iceberg — the table format Polaris catalogs"},{id:"catalogs",reason:"6-catalog comparison — Polaris is one of the 6 production catalogs"},{id:"databricks-lakehouse",reason:"Databricks Unity Catalog — closed competitor to Polaris"},{id:"aws-lake-formation",reason:"AWS-native governance — Polaris integrates with Lake Formation"},{id:"delta-lake",reason:"Databricks table format — Polaris catalogs Iceberg, the open alternative"},{id:"data-lakehouse",reason:"Anchor concept — lake→lakehouse evolution"},{id:"snowflake",reason:"Snowflake platform page — Polaris is Snowflake's catalog"}]}),(0,a.jsx)(i.ResearchDemo,{pageId:"snowflake-polaris"}),(0,a.jsx)(l.TrendAnticipation,{pageId:"snowflake-polaris"}),(0,a.jsx)(n.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"tabular",reason:"Tabular SaaS — Snowflake-acquired June 2024, founded by Iceberg spec authors"},{id:"iceberg",reason:"Apache Iceberg — the table format Polaris catalogs"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(s.default,{href:(0,h.hrefFor)("tabular"),className:"text-sm text-primary hover:underline",children:"→ Tabular SaaS (Snowflake-acquired, open-source managed catalog)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(s.default,{href:(0,h.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (the table format Polaris catalogs)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(s.default,{href:(0,h.hrefFor)("catalogs"),className:"text-sm text-primary hover:underline",children:"→ Catalogs comparison (Polaris vs Unity vs Glue vs Nessie)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(s.default,{href:(0,h.hrefFor)("databricks-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Databricks Lakehouse (Unity, the closed competitor)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(s.default,{href:(0,h.hrefFor)("data-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Data Lakehouse (concept anchor)"})]})]})}e.s(["SnowflakePolarisPage",()=>D])}]);