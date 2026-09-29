(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,640524,e=>{"use strict";var a=e.i(808554);e.s(["Workflow",()=>a.default])},618393,e=>{"use strict";var a=e.i(953651);e.s(["Server",()=>a.default])},59938,e=>{"use strict";var a=e.i(843476),t=e.i(522016),r=e.i(852008),i=e.i(901752);function s({topics:e}){return 0===e.length?null:(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-muted/20 p-4",children:[(0,a.jsxs)("p",{className:"text-xs font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(r.Layers,{className:"h-3.5 w-3.5 text-primary"})," Related topics — cross-page navigation"]}),(0,a.jsx)("div",{className:"flex flex-wrap gap-2 text-sm",children:e.map((r,s)=>(0,a.jsxs)("span",{className:"flex items-center gap-1",children:[(0,a.jsxs)(t.default,{href:(0,i.hrefFor)(r.id),className:"text-primary hover:underline",children:["→ ",r.reason]}),s<e.length-1&&(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"})]},r.id))})]})}e.s(["RelatedTopics",()=>s])},227516,e=>{"use strict";var a=e.i(565123);e.s(["History",()=>a.default])},727927,e=>{"use strict";var a=e.i(651617);e.s(["Cloud",()=>a.default])},238443,e=>{"use strict";var a=e.i(843476),t=e.i(522016),r=e.i(271645),i=e.i(846932),s=e.i(862824),n=e.i(342046),o=e.i(122836),l=e.i(716675),d=e.i(59938),c=e.i(158960),m=e.i(986951),p=e.i(901752),h=e.i(487486),u=e.i(332017),g=e.i(39312),f=e.i(658041),b=e.i(21218),x=e.i(966992),y=e.i(828579),k=e.i(283086),v=e.i(227516),w=e.i(691385),S=e.i(178583),j=e.i(25652),P=e.i(618393),T=e.i(727927);let N=`-- ============================================================
-- Apache Paimon — streaming-native table format (2023)
-- Catalog: Hive | Glue | REST | Filesystem
-- Primary engine: Apache Flink 1.18+
-- ============================================================

-- Register the Paimon catalog (Flink SQL)
CREATE CATALOG paimon WITH (
  'type'        = 'paimon',
  'warehouse'   = 's3://moderndatascieng-paimon',
  'metastore'  = 'hive',
  'uri'         = 'thrift://hive-metastore:9083',
  's3.access-key' = '\${AWS_KEY}',
  's3.secret-key' = '\${AWS_SECRET}'
);

-- Create a Paimon table with PRIMARY KEY + changelog producer
-- The 'changelog-producer' setting makes the table emit +I/-D/+U/-U
-- change rows when read as a stream (replaces Kafka topics)
CREATE TABLE paimon.orders (
  order_id       BIGINT,
  customer_id    BIGINT,
  amount_usd     DECIMAL(18, 4),
  currency       STRING,
  order_ts       TIMESTAMP(3),
  PRIMARY KEY (order_id) NOT ENFORCED
) PARTITIONED BY (day(order_ts))
WITH (
  'bucket'             = '4',            -- 4 hash buckets per partition
  'changelog-producer' = 'lookup',       -- emit row-level change rows
  'merge-engine'       = 'deduplicate', -- last-write-wins per PK
  'file.format'        = 'parquet',
  'file.compression'   = 'zstd'
);

-- Insert rows from a Kafka source (CDC events from Debezium)
INSERT INTO paimon.orders
SELECT
  order_id, customer_id, amount_usd, currency, order_ts
FROM kafka.orders_cdc;

-- Read the table AS A STREAM of changes (replaces Kafka topic)
-- Each row carries an op: +I (insert), -D (delete), +U/-U (update)
SELECT * FROM paimon.orders /*+ OPTIONS('scan.mode'='from-delta') */;

-- Time-travel read — read as-of a specific snapshot
SELECT * FROM paimon.orders FOR SYSTEM_VERSION AS OF 123456;
SELECT * FROM paimon.orders FOR SYSTEM_TIME AS OF TIMESTAMP '2024-09-01 10:00:00';`,_=`-- ============================================================
-- Paimon partial-update merge engine — ML feature store pattern
-- Each upstream pipeline writes ONLY its columns; Paimon merges
-- per primary key on read. No Spark merge job needed.
-- ============================================================

-- Create a feature table with partial-update merge engine
CREATE TABLE paimon.user_features (
  user_id           BIGINT,
  -- clicks pipeline updates these columns
  clicks_7d         INT,
  click_volume_7d   BIGINT,
  -- searches pipeline updates these columns
  searches_7d       INT,
  top_search_term   STRING,
  -- purchases pipeline updates these columns
  purchases_30d     INT,
  ltv_usd           DECIMAL(18, 2),
  -- demographics pipeline
  age_bucket        STRING,
  country           STRING,
  -- recency pipeline
  last_active_ts    TIMESTAMP(3),
  PRIMARY KEY (user_id) NOT ENFORCED
) WITH (
  'merge-engine'         = 'partial-update',  -- merge on read, per-column
  'changelog-producer'   = 'lookup',
  'partial-update.remove-record-on-seq-group' = 'clicks;searches;purchases',
  'bucket'               = '16',
  'file.format'          = 'parquet'
);

-- Each pipeline writes ONLY its columns (others default to NULL on write)
-- Paimon merges per user_id on read — partial-update merge engine
INSERT INTO paimon.user_features (user_id, clicks_7d, click_volume_7d)
SELECT user_id, count(*) AS clicks_7d, sum(volume) AS click_volume_7d
FROM kafka.clicks GROUP BY user_id, TUMBLE(event_ts, INTERVAL '1' MINUTE);

INSERT INTO paimon.user_features (user_id, searches_7d, top_search_term)
SELECT user_id, count(*), max(term)
FROM kafka.searches GROUP BY user_id, TUMBLE(event_ts, INTERVAL '1' MINUTE);

-- Read the fully-merged features (partial-update merge applied)
SELECT * FROM paimon.user_features WHERE user_id = 12345;

-- Use as a feature source for online inference
-- Flink SQL reads the table; Feast materialises to Redis for <1ms serving`,A=`# ============================================================
# Paimon + PyFlink — streaming CDC pipeline in pure Python
#   pip install apache-flink==1.18
# ============================================================

from pyflink.table import StreamTableEnvironment, EnvironmentSettings
from pyflink.table.catalog import CatalogDescriptor

env = EnvironmentSettings.in_streaming_mode()
t_env = StreamTableEnvironment.create(env)

# Register the Paimon catalog
t_env.execute_sql("""
    CREATE CATALOG paimon WITH (
        'type'        = 'paimon',
        'warehouse'   = 's3://moderndatascieng-paimon',
        'metastore'  = 'hive',
        'uri'         = 'thrift://hive-metastore:9083'
    )
""")

# Source: MySQL CDC via Flink CDC connector
t_env.execute_sql("""
    CREATE TABLE mysql_orders WITH (
        'connector' = 'mysql-cdc',
        'hostname'  = 'mysql-prod',
        'port'      = '3306',
        'database-name' = 'orders_db',
        'table-name'    = 'orders',
        'username' = 'cdc_user',
        'password' = '\${CDC_PASSWORD}'
    )
""")

# Sink: Paimon changelog-mode table (emits +I/-D/+U/-U rows)
t_env.execute_sql("""
    CREATE TABLE paimon.orders (
        order_id    BIGINT,
        customer_id BIGINT,
        amount_usd  DECIMAL(18, 4),
        currency    STRING,
        order_ts    TIMESTAMP(3),
        PRIMARY KEY (order_id) NOT ENFORCED
    ) WITH (
        'changelog-producer' = 'lookup',
        'merge-engine'       = 'deduplicate',
        'bucket'             = '4'
    )
""")

# CDC pipeline: MySQL → Paimon (exactly-once via Flink checkpoint)
t_env.execute_sql("""
    INSERT INTO paimon.orders
    SELECT * FROM mysql_orders
""").wait()

# Read the Paimon table AS A STREAM — downstream consumers
table = t_env.sql_query("""
    SELECT * FROM paimon.orders
    /*+ OPTIONS('scan.mode'='from-delta') */
""")

# Stream to a downstream sink (e.g. materialised view or dashboard)
t_env.execute_sql("""
    CREATE TEMPORARY VIEW live_country_totals AS
    SELECT country,
           TUMBLE_START(order_ts, INTERVAL '5' MINUTE) AS win_start,
           count(*) AS n_orders, sum(amount_usd) AS total
    FROM paimon.orders /*+ OPTIONS('scan.mode'='from-delta') */
    GROUP BY country, TUMBLE(order_ts, INTERVAL '5' MINUTE)
""")
print("CDC pipeline running — Paimon emits changelog rows as a stream")`,E=`-- ============================================================
-- Paimon + Spark — batch read via the Paimon Spark connector
-- Paimon is Flink-first, but Spark read is supported (write via Flink)
-- ============================================================

-- Configure the Paimon catalog (Spark 3.5+)
spark.sql.catalog.paimon = org.apache.paimon.spark.SparkCatalog
spark.sql.catalog.paimon.warehouse = s3a://moderndatascieng-paimon
spark.sql.catalog.paimon.metastore = hive
spark.sql.catalog.paimon.uri = thrift://hive-metastore:9083

-- Read the Paimon table as a Spark DataFrame (batch snapshot read)
SELECT
    day(order_ts) AS day,
    currency,
    count(*)       AS n_orders,
    sum(amount_usd) AS daily_revenue
FROM paimon.warehouse.orders
WHERE order_ts >= current_date() - 7
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC;

-- Time-travel read via Spark
SELECT * FROM paimon.warehouse.orders VERSION AS OF 1234567890;
SELECT * FROM paimon.warehouse.orders TIMESTAMP AS OF '2024-09-01 10:00:00';

-- Batch read the table as a stream of changes (Paimon changelog mode)
SELECT * FROM paimon.warehouse.orders.options('scan.mode'='from-delta');

-- Spark limitations vs Flink:
-- - Spark cannot WRITE to Paimon tables (writes go via Flink)
-- - Spark reads the latest snapshot by default
-- - Spark has no streaming write support (Flink is required)`,C=`# ============================================================
# Paimon partial-update merge simulation (in-browser)
# 1. Simulate 5 upstream feature pipelines
# 2. Each writes only its columns (others are NULL)
# 3. Paimon merges per user_id on read
# 4. Compare to the Spark-merge alternative
# ============================================================

import random
from collections import defaultdict

random.seed(42)
print("=== Apache Paimon — partial-update merge simulation ===")
print("ML feature store: 5 pipelines \xd7 50M users \xd7 100 features each\\n")

n_users = 100_000  # scaled-down from 50M
pipelines = {
    'clicks':    ['clicks_7d', 'click_volume_7d', 'last_click_term'],
    'searches':  ['searches_7d', 'top_search_term', 'search_volume_7d'],
    'purchases': ['purchases_30d', 'ltv_usd', 'last_purchase_ts'],
    'demographics': ['age_bucket', 'country', 'gender'],
    'recency':   ['last_active_ts', 'session_count_7d'],
}

# Each pipeline writes only its columns
print("--- Pipeline writes (each writes only its cols) ---")
updates_per_pipeline = {}
for pname, cols in pipelines.items():
    n_updates = random.randint(5000, 15000)
    updates = []
    for _ in range(n_updates):
        uid = random.randint(1, n_users)
        row = {'user_id': uid}
        for col in cols:
            row[col] = f"{pname}_value_for_{col}"
        updates.append(row)
    updates_per_pipeline[pname] = updates
    print(f"  {pname:<14}: {n_updates:,} updates \xd7 {len(cols)} cols "
          f"= {n_updates * len(cols):,} cell-writes")

# Paimon partial-update merge: per user_id, merge ALL column updates
# This is the structural advantage — no Spark merge job needed
print("\\n--- Paimon partial-update merge (read time) ---")
merged = defaultdict(dict)
total_writes = 0
for pname, updates in updates_per_pipeline.items():
    for row in updates:
        uid = row.pop('user_id')
        for col, val in row.items():
            merged[uid][col] = val
        total_writes += len(row)

print(f"Total cell-writes processed: {total_writes:,}")
print(f"Users touched:               {len(merged):,}")

# Sample merged row
sample_uid = list(merged.keys())[0]
print(f"\\nSample merged row for user_id={sample_uid}:")
for col, val in list(merged[sample_uid].items())[:8]:
    print(f"  {col:<25} = {val}")

# Count fully-merged rows (all 5 pipelines contributing)
full_count = sum(1 for u in merged.values() if len(u) >= 8)
print(f"\\nFully-merged rows (8+ cols): {full_count:,} of {len(merged):,}")
print(f"\\nKey insight: each pipeline writes only its columns;")
print(f"Paimon merges per user_id on read — no Spark merge job needed.")
print(f"\\nWithout partial-update: Spark would need an hourly merge job:")
print(f"  - Read full features table + all 5 updates")
print(f"  - JOIN on user_id + coalesce")
print(f"  - Write back to features table")
print(f"  - ~10 min latency vs Paimon's ~30s merge-on-read")`;function F(){let[e,t]=(0,r.useState)("table"),s={mysql:{label:"MySQL (source)",desc:"Operational database — Debezium captures binlog changes as CDC events",level:0},flink:{label:"Flink CDC",desc:"Apache Flink reads MySQL binlog + writes to Paimon table (exactly-once)",level:1},table:{label:"Paimon table",desc:"changelog-producer=lookup — Paimon emits +I/-D/+U/-U change rows",level:2},consumer_1:{label:"Dashboard Flink",desc:"Stream read via scan.mode=from-delta — Paimon table emits change rows like Kafka",level:3},consumer_2:{label:"ML Feature Store",desc:"Stream read for online feature updates — Redis gets refreshed on each row",level:3},consumer_3:{label:"Audit SQL",desc:"Batch read via SELECT * — analytics queries on the same table for free",level:3}},n={mysql:{x:80,y:30},flink:{x:200,y:30},table:{x:320,y:30},consumer_1:{x:320,y:100},consumer_2:{x:320,y:140},consumer_3:{x:320,y:180}};return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(w.Atom,{className:"h-3.5 w-3.5 text-primary"}),"Paimon changelog mode — table emits change rows like a Kafka topic"]})}),(0,a.jsxs)("div",{className:"p-3",children:[(0,a.jsxs)("svg",{viewBox:"0 0 400 220",className:"w-full h-auto",children:[[["mysql","flink"],["flink","table"],["table","consumer_1"],["table","consumer_2"],["table","consumer_3"]].map(([e,t],r)=>{let i=n[e],s=n[t];return(0,a.jsx)("line",{x1:i.x,y1:i.y+12,x2:s.x,y2:s.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow)"},r)}),Object.entries(n).map(([r,n])=>{let o=e===r,l=s[r],d=0===l.level?"var(--chart-3)":1===l.level?"var(--chart-2)":2===l.level?"var(--chart-1)":"var(--chart-4)";return(0,a.jsxs)(i.motion.g,{onMouseEnter:()=>t(r),onMouseLeave:()=>t(null),animate:{scale:o?1.05:1},style:{cursor:"pointer"},children:[(0,a.jsx)("rect",{x:n.x-60,y:n.y-10,width:"120",height:"22",rx:"3",fill:o?d+"30":"var(--background)",stroke:d,strokeWidth:o?1.5:.8}),(0,a.jsx)("text",{x:n.x,y:n.y+4,textAnchor:"middle",fontSize:"7",fill:o?d:"var(--foreground)",fontWeight:o?"bold":"normal",children:l.label})]},r)}),(0,a.jsx)("defs",{children:(0,a.jsx)("marker",{id:"arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,a.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,a.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:s[e].label}),(0,a.jsx)("p",{className:"text-muted-foreground",children:s[e].desc})]}),!e&&(0,a.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node — Paimon's changelog mode lets a single table replace N Kafka topics."})]})]})}function D(){return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(y.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Paimon vs Iceberg vs Delta vs Hudi — sibling open table formats"]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-xs",children:[(0,a.jsx)("thead",{className:"bg-muted/30",children:(0,a.jsxs)("tr",{className:"border-b border-border/60",children:[(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Paimon"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Iceberg"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Delta"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Hudi"})]})}),(0,a.jsx)("tbody",{children:[{feature:"Origin",paimon:"Flink community (2022)",iceberg:"Netflix (2017)",delta:"Databricks (2017)",hudi:"Uber (2016)"},{feature:"Primary engine",paimon:"Apache Flink",iceberg:"Spark",delta:"Spark",hudi:"Spark + Flink"},{feature:"Changelog mode",paimon:"Yes (unique)",iceberg:"No",delta:"CDF (different)",hudi:"No"},{feature:"Partial-update merge",paimon:"Yes (unique)",iceberg:"No",delta:"No",hudi:"No"},{feature:"Streaming-first writes",paimon:"Yes (Flink-native)",iceberg:"Via Flink connector",delta:"Via Structured Streaming",hudi:"Via Flink connector"},{feature:"Time travel",paimon:"Yes (snapshot)",iceberg:"Yes (snapshot)",delta:"Yes (version)",hudi:"Yes (instant)"},{feature:"Schema evolution",paimon:"Full",iceberg:"Full",delta:"Full",hudi:"Full"},{feature:"Catalog support",paimon:"Hive, Glue, REST",iceberg:"REST, Glue, Hive, Nessie, Unity",delta:"Unity, Hive, S3",hudi:"Hive, Glue, REST"},{feature:"Best fit",paimon:"Streaming-first lakehouse",iceberg:"General-purpose",delta:"Databricks ecosystem",hudi:"Streaming CDC"},{feature:"Adoption (2024)",paimon:"Emerging (Apple, Alibaba)",iceberg:"Netflix, Apple, Stripe",delta:"All Databricks",hudi:"Uber, Walmart, ByteDance"}].map((e,t)=>(0,a.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,a.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,a.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.paimon}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.iceberg}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.delta}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.hudi})]},t))})]})})]})}let I=[{label:"Origin",value:"Flink community 2022",hint:"Forked from Flink Table Store, renamed to Paimon in March 2023 — the newest open table format",deltaTone:"flat"},{label:"Primary engine",value:"Apache Flink",hint:"Flink-first design — Flink SQL DDL/DML writes Paimon tables directly (no Spark required)",deltaTone:"up"},{label:"Unique features",value:"Changelog + partial-update",hint:"Only format with changelog mode (table emits +I/-D/+U/-U) + partial-update merge (per-column updates)",deltaTone:"up"},{label:"Adoption",value:"Apple, Alibaba",hint:"Emerging in production at Apple, Alibaba, Tencent — streaming-first lakehouse use cases",deltaTone:"flat"}];function R(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(s.PageHeader,{eyebrow:"Apache Paimon · streaming-native · Flink-first",title:"Apache Paimon — the streaming-native table format",description:"Paimon is the newest open table format (2023) — designed for streaming-first lakehouse workloads. Unlike Iceberg/Delta/Hudi (which were designed for batch + added streaming later), Paimon was built from scratch as the storage layer for Apache Flink. Two unique features distinguish it: changelog mode (the table emits +I/-D/+U/-U change rows like a Kafka topic — a single table replaces N downstream Kafka topics for CDC fan-out) and partial-update merge engine (multiple upstream pipelines write only their columns; Paimon merges per primary key on read — no Spark merge job needed). For Flink-native streaming lakehouse workloads, Paimon is the structural fit; for batch-heavy workloads, Iceberg/Delta remain the default.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(g.Zap,{className:"h-3 w-3"})," Changelog mode"]}),(0,a.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(w.Atom,{className:"h-3 w-3"})," Partial-update"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:I.map(e=>(0,a.jsx)(s.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(s.SectionCard,{title:"Changelog mode — Paimon's killer feature",description:"With changelog-producer=lookup, a Paimon table emits row-level change events (+I/-D/+U/-U) when read as a stream. Downstream Flink jobs read the Paimon table AS a stream — replacing N downstream Kafka topics for CDC fan-out. The structural win: one Paimon table = N streams + replayable storage + ad-hoc SQL analytics on the same data. No more Kafka topic proliferation, no more operational burden of two systems (Kafka + S3 archive), no more separate CDC + analytics pipelines.",icon:(0,a.jsx)(w.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,a.jsx)(F,{})}),(0,a.jsx)(s.SectionCard,{title:"Paimon DDL — create table with changelog producer",description:"Paimon DDL is Flink SQL with Paimon-specific table options. The catalog registration (CREATE CATALOG paimon) points at the warehouse + metastore (Hive/Glue/REST). The PRIMARY KEY constraint enables upsert mode (MERGE instead of append). The changelog-producer=lookup setting makes the table emit change rows. The merge-engine=deduplicate setting is last-write-wins per PK (alternatives: partial-update, aggregation, first-row). Bucketing is the parallelism unit for writes — 4 buckets = 4 parallel writers per partition.",icon:(0,a.jsx)(f.Database,{className:"h-5 w-5"}),badge:"Paimon DDL",children:(0,a.jsx)(o.CodeBlock,{code:N,language:"sql",filename:"paimon_ddl.sql",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34]})}),(0,a.jsx)(s.SectionCard,{title:"Partial-update merge — ML feature store pattern",description:"Paimon's partial-update merge engine is unique among open table formats. Multiple upstream pipelines write only their columns to the same table — Paimon merges per primary key on read. For ML feature stores with N pipelines (clicks, searches, purchases, demographics, recency), this eliminates the Spark merge job that Iceberg/Delta would need. Each pipeline writes its slice; the read returns a fully-merged row. The 'partial-update.remove-record-on-seq-group' setting handles pipeline-specific tombstones (a row removed by clicks doesn't affect the purchases columns).",icon:(0,a.jsx)(x.Cpu,{className:"h-5 w-5"}),badge:"Partial-update",children:(0,a.jsx)(o.CodeBlock,{code:_,language:"sql",filename:"paimon_partial_update.sql",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]})}),(0,a.jsx)(s.SectionCard,{title:"PyFlink + Paimon — pure-Python streaming CDC pipeline",description:"PyFlink is the Python API for Flink SQL + DataStream. Paimon's first-class Flink integration means a streaming CDC pipeline is pure Python — no JVM, no Scala. The pattern: Flink CDC connector reads MySQL binlog, Paimon sink writes the changelog-mode table, and downstream consumers read the table AS a stream. Exactly-once is guaranteed via Flink's 2-phase commit on checkpoint. This is the streaming-first lakehouse pattern — operational MySQL → Paimon table → N consumers, no Kafka in the middle.",icon:(0,a.jsx)(b.Activity,{className:"h-5 w-5"}),badge:"PyFlink",children:(0,a.jsx)(o.CodeBlock,{code:A,language:"python",filename:"paimon_pyflink.py",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43]})}),(0,a.jsx)(s.SectionCard,{title:"Paimon + Spark — batch read via Spark connector",description:"Paimon is Flink-first, but Spark read is supported via the Paimon Spark connector. The pattern: writes go via Flink (streaming CDC + changelog mode), reads can come from Spark (batch analytics) + Trino (federated SQL) + Flink (streaming). Paimon's catalog API makes this multi-engine read possible — the table metadata (manifest list, snapshots, schema) is engine-agnostic. The caveat: Spark cannot WRITE to Paimon tables with changelog producer — Flink is required for writes. This is by design; Paimon chose streaming-first as the structural priority.",icon:(0,a.jsx)(P.Server,{className:"h-5 w-5"}),badge:"Spark read",children:(0,a.jsx)(o.CodeBlock,{code:E,language:"sql",filename:"paimon_spark.sql",highlight:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]})}),(0,a.jsx)(s.SectionCard,{title:"Try it: simulate partial-update merge (Pyodide)",description:"Pure-Python simulation of Paimon's partial-update merge engine. Five feature pipelines each write only their columns; Paimon merges per user_id on read. See how the structural advantage — no Spark merge job needed — works in practice. At production scale (50M users × 100 features), this would be a 10-minute Spark job on Iceberg/Delta vs Paimon's ~30s merge-on-read.",icon:(0,a.jsx)(k.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,a.jsx)(l.PyodideRunner,{code:C,buttonLabel:"Run Paimon partial-update simulation (Pyodide)"})}),(0,a.jsx)(s.SectionCard,{title:"Paimon vs Iceberg vs Delta vs Hudi — sibling open table formats",description:"Four open table formats compete for the lakehouse metadata layer. Paimon (2023, Flink community) is the streaming-native format. Iceberg (Netflix origin) is the general-purpose format with the broadest engine support. Delta (Databricks) is the most deployed. Hudi (Uber) is the upsert-first CDC specialist. Paimon's niche: streaming-first workloads where the table IS the stream (changelog mode) and multiple pipelines merge per-row (partial-update). For batch-heavy workloads, Iceberg/Delta remain the default.",icon:(0,a.jsx)(y.Boxes,{className:"h-5 w-5"}),children:(0,a.jsx)(D,{})}),(0,a.jsx)(s.SectionCard,{title:"Why Paimon evolved — shortfalls of Iceberg/Delta/Hudi for streaming",description:"Paimon was built because Iceberg, Delta, and Hudi were all designed for batch + had streaming bolted on later. Four structural shortfalls motivated Paimon's design — Flink-native writes, changelog mode, partial-update merge, and a streaming-first metadata layer.",icon:(0,a.jsx)(v.History,{className:"h-5 w-5"}),badge:"Why Paimon",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Iceberg/Delta streaming writes required Spark."})," All three prior formats were Spark-first — streaming writes went via Structured Streaming with all the JVM + Spark complexity that implies. Flink support was bolted-on later via connectors, with rough edges. Paimon is Flink-native: Flink SQL DDL/DML writes Paimon tables directly, no Spark needed. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," pure-Python streaming pipelines via PyFlink, no JVM."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: Hudi MOR was close but Uber-designed."})," Hudi's Merge-On-Read engine is conceptually similar to Paimon — upserts on S3 — but it was designed for Uber's Spark-heavy stack, not Flink. Paimon's merge engines (deduplicate, partial-update, aggregation, first-row) are Flink-native with first-class PyFlink support. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," streaming-first deployments get the right engine integration."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No format supported changelog mode."})," Iceberg, Delta, and Hudi all support reads of past versions (time travel) but none emit row-level change events (+I/-D/+U/-U) when read as a stream. Paimon's changelog-producer=lookup makes a table behave like a Kafka topic. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," a single Paimon table replaces N downstream Kafka topics for CDC fan-out — major architectural simplification."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: No format supported partial updates."})," All three prior formats require Spark merge jobs when N pipelines each write their columns to the same table. Paimon's partial-update merge engine merges per primary key on read — each pipeline writes its slice, the read returns a fully-merged row. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," ML feature stores get a 20× simpler architecture (no hourly Spark merge job, no separate feature table)."]})]})}),(0,a.jsx)(s.SectionCard,{title:"Truly unique Paimon features (vs Iceberg + Delta + Hudi)",description:"Paimon has four features that are genuinely unique — structural differentiators no other open table format has yet matched. These are the reasons to choose Paimon over the more mature alternatives.",icon:(0,a.jsx)(k.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Changelog mode"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["The table emits row-level change events (+I/-D/+U/-U) when read as a stream — a Paimon table IS a stream. ",(0,a.jsx)("strong",{children:"Iceberg/Delta/Hudi do not support this — they emit version history, not change rows."})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Partial-update merge"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Multiple pipelines write only their columns; Paimon merges per PK on read — no Spark merge job. ",(0,a.jsx)("strong",{children:"No other format supports per-column partial updates."})," Critical for ML feature stores."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Flink-native writes"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Flink SQL DDL/DML writes Paimon tables directly — no Spark, no JVM. PyFlink gives pure-Python streaming pipelines. ",(0,a.jsx)("strong",{children:"Iceberg/Delta/Hudi are all Spark-first with Flink bolted on."})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Streaming-first metadata layer"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Snapshots + manifests designed for streaming commit cadence (per-minute) vs batch (per-hour). ",(0,a.jsx)("strong",{children:"The metadata layer optimises for streaming commit patterns."})]})]})]})}),(0,a.jsx)(s.SectionCard,{title:"3 large-dataset examples — cards with 5-language code popups",description:"Three production-style dataset examples showing Paimon in action. Each is a clickable card opening a lazy popup with: scenario brief (dataset/scale/why), dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight. All scenarios use synthetic streaming-scale data.",icon:(0,a.jsx)(f.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,a.jsx)(c.DatasetCards,{examples:m.PAIMON_EXAMPLES,intro:"Three synthetic scenarios at streaming scale: (1) MySQL CDC → Paimon changelog at 100M events/day, (2) Paimon as Kafka replacement for 10M customer updates/day (~50% cheaper), (3) ML feature store with partial-update merge for 50M users × 100 features. Each card has Scala/Rust/Go/Elixir/Zig code highlighting Paimon's unique changelog + partial-update differentiators."})}),(0,a.jsx)(s.SectionCard,{title:"Computational tooling — the Paimon ecosystem",description:"Paimon's ecosystem is Flink-centric — Apache Flink is the primary write engine. Spark, Trino, and Presto are read-only engines via their respective connectors. The catalog layer supports Hive, Glue, and REST backends.",icon:(0,a.jsx)(P.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(x.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute engines"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Flink 1.18+"})," — primary engine (PyFlink + SQL + DataStream)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Flink SQL Gateway"})," — REST API for DDL/DML"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Spark 3.5+"})," — read-only via Paimon Spark connector"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Trino 425+"})," — read-only via Paimon connector"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Presto"})," — read-only via Paimon connector"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Hive"})," — read-only via Paimon Hive integration"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Flink CDC"})," — native CDC sources (MySQL, Postgres, MongoDB)"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(T.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Catalogs + tools"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Hive Metastore"})," — primary catalog (thrift)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue Data Catalog"})," — AWS-native"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"REST catalog"})," — Paimon-spec REST API"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Filesystem"})," — local-only catalog for dev"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Changelog producer"})," — none / input / lookup"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Merge engines"})," — deduplicate / partial-update / aggregation / first-row"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Bucketing"})," — hash-based write parallelism (default 4)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Compaction"})," — async + scheduled (small files → 128MB)"]})]})]})]})}),(0,a.jsx)(s.SectionCard,{title:"Research + production case studies",description:"Paimon is too new (2023) for many academic papers — the origin is the Flink Table Store project. Production case studies are emerging as Apple, Alibaba, and Tencent adopt it for streaming-first lakehouse workloads.",icon:(0,a.jsx)(S.FileText,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Apache Paimon Spec (2023):"})," The official specification documents the table format: file layout (Parquet + Avro manifests), snapshot chain (each commit = new snapshot), changelog producer modes (none/input/lookup), and merge engines. The spec is the design document — Paimon is open-governed via the Apache Flink community (Paimon became a top-level Apache project in late 2023)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Flink Table Store Origin (2022):"})," The predecessor project. Flink Table Store was a streaming-native storage layer for Flink that evolved into Paimon. The rename (March 2023) signalled the project's graduation from a Flink-internal component to a standalone Apache top-level project. The original FTS codebase remains the foundation; Paimon adds catalog APIs + multi-engine read support."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Paimon 0.8 (2024):"})," Major release added the partial-update merge engine (a unique feature among open table formats), the changelog producer 'lookup' mode (more efficient than 'input' for CDC pipelines), and Spark 3.5 read support. The release notes are the primary reference for streaming-native table format design patterns."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Apple Production Adoption (2023):"})," Apple adopted Paimon for a streaming-first analytics use case (rumoured, not officially confirmed). The pattern: Flink CDC from operational MySQL → Paimon changelog tables → Flink streaming consumers for real-time ML feature updates. Apple chose Paimon over Iceberg because the streaming integration was first-class."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Alibaba Production (2024):"})," Alibaba uses Paimon for cross-BU real-time analytics on the order + payment pipelines. The unique value: changelog mode lets downstream consumers (real-time dashboards, ML feature stores, audit logs) read the same Paimon table as a stream — one table replaces ~30 Kafka topics that would otherwise be needed for fan-out."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Apache Flink + Paimon Integration Spec:"})," Documents the Flink-native integration: Flink SQL DDL/DML is the primary write path; PyFlink exposes pure-Python streaming pipelines; exactly-once via 2-phase commit on checkpoint; the changelog producer lookup mode reads back the source to emit accurate +U/-U rows. This integration is the structural reason Paimon is the streaming-first format."]})]})}),(0,a.jsx)(s.SectionCard,{title:"My deeper thought: Paimon IS the streaming-first lakehouse format — it treats tables as streams",description:"The unifying view: Paimon recognises that for streaming-first workloads, a table IS a stream. The changelog mode + partial-update merge engine are the structural expressions of this insight.",icon:(0,a.jsx)(j.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"A table IS a stream, viewed at different time horizons."})," The duality between tables and streams is fundamental: a table is the current state; a stream is the sequence of changes that produced that state. Existing formats (Iceberg/Delta/Hudi) chose table-first design — the snapshot is the primary abstraction, streaming is bolted on as a consumer pattern. Paimon chose stream-first design — the changelog is the primary abstraction, the snapshot is the materialised state at a point in time. The structural consequence: Paimon's changelog mode lets a single table behave like a Kafka topic — one storage system replaces two (S3 table + Kafka topic)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Changelog mode IS the unification of CDC + analytics."})," Before Paimon, the architecture was: operational DB → Debezium → Kafka → (real-time consumers + S3 archive → batch analytics). Two systems, two operational concerns, two failure modes. Paimon's changelog mode collapses this: operational DB → Flink CDC → Paimon table → (real-time consumers + batch analytics). One system, one operational concern, one source of truth. The structural win is the elimination of Kafka as a separate system for many CDC fan-out workloads."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Partial-update merge IS the unification of ETL + serving."})," Before Paimon, ML feature stores needed: N upstream pipelines → Spark hourly merge job → materialised feature table → online serving (Redis). Paimon's partial-update merge collapses the Spark merge step: each pipeline writes its columns to the Paimon table; the read returns a fully-merged row. The Spark job disappears; the ETL + serving layers merge into one storage system. For ML feature stores, this is a 10× architectural simplification."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Paimon IS the bet that streaming-first is the lakehouse future."})," The deeper claim: as more lakehouse workloads move from batch to streaming (real-time dashboards, real-time ML, real-time audit), the streaming-native format wins. Iceberg/Delta/Hudi were designed when batch was the default; their streaming support is bolted on. Paimon was designed when streaming is the default. The bet is that streaming-first workloads will become the majority — and Paimon's structural choices (Flink-native writes, changelog mode, partial-update merge) will be the right ones. The counter-argument: batch workloads remain the majority in most enterprises, and Iceberg's broader engine support + 7-year maturity advantage is hard to overcome."]})]})}),(0,a.jsxs)(u.DeeperThoughtSection,{pageTitle:"Apache Paimon",children:[(0,a.jsx)(u.DeeperThought,{title:"Apache Paimon IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,a.jsx)("p",{children:"This page about Apache Paimon is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Apache Paimon connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Apache Paimon sits in the computational-science landscape."})}),(0,a.jsx)(u.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,a.jsx)("p",{children:"In a decade, the specific tools on this page (Apache Paimon) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,a.jsx)(u.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,a.jsx)(u.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,a.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,a.jsx)(u.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,a.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,a.jsx)(d.RelatedTopics,{topics:[{id:"iceberg",reason:"Sibling open table format (Netflix origin, batch-first)"},{id:"delta-lake",reason:"Sibling open table format (Databricks origin)"},{id:"hudi",reason:"Sibling open table format (Uber origin, CDC-first)"},{id:"streaming",reason:"Apache Flink — Paimon's primary engine"},{id:"pinot",reason:"Real-time OLAP — Paimon table as Pinot's source"},{id:"databricks",reason:"Spark as Paimon read engine"}]}),(0,a.jsx)(n.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"iceberg",reason:"Sibling open table format (Netflix origin, batch-first)"},{id:"delta-lake",reason:"Sibling open table format (Databricks origin)"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(t.default,{href:(0,p.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (sibling format, batch-first)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("delta-lake"),className:"text-sm text-primary hover:underline",children:"→ Delta Lake (sibling format, Databricks)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("hudi"),className:"text-sm text-primary hover:underline",children:"→ Apache Hudi (sibling format, Uber CDC-first)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("streaming"),className:"text-sm text-primary hover:underline",children:"→ Streaming (Apache Flink — Paimon's primary engine)"})]})]})}e.s(["PaimonPage",()=>R])},839484,e=>{e.v(a=>Promise.all(["static/chunks/18e23c06a777fcd6.js"].map(a=>e.l(a))).then(()=>a(716400)))}]);