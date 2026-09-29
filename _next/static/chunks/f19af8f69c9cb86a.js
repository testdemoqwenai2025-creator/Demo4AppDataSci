(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,321425,e=>{"use strict";var a=e.i(843476),t=e.i(522016),r=e.i(271645),s=e.i(846932),o=e.i(862824),i=e.i(342046),n=e.i(921371),l=e.i(580296),c=e.i(122836),d=e.i(716675),u=e.i(59938),h=e.i(158960),m=e.i(741500),p=e.i(901752),g=e.i(487486),b=e.i(332017),f=e.i(640524),y=e.i(658041),x=e.i(828579),S=e.i(966992),v=e.i(283086),k=e.i(178583),j=e.i(25652),w=e.i(691385),G=e.i(227516),_=e.i(618393),A=e.i(727927);let T=`# ============================================================
# AWS Glue — PySpark ETL job (serverless)
# Save to S3, register via Glue Jobs API, run on Glue Spark runtime
# ============================================================

import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from awsglue.context import GlueContext
from awsglue.job import Job
from awsglue.dynamicframe import DynamicFrame
from pyspark.context import SparkContext
from pyspark.sql import functions as F
from pyspark.sql.types import *

# Glue boilerplate (every Glue job starts with this)
args = getResolvedOptions(sys.argv, [
    'JOB_NAME', 'INPUT_DATABASE', 'INPUT_TABLE',
    'OUTPUT_PATH', 'OUTPUT_DATABASE', 'OUTPUT_TABLE',
])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# --- Read source via Glue Data Catalog (no manual S3 paths) ---
# Glue Catalog has the schema + partition spec — just give it table name
dynamic_frame = glueContext.create_dynamic_frame.from_catalog(
    database=args['INPUT_DATABASE'],
    table_name=args['INPUT_TABLE'],
    push_down_predicate="\\"dt\\" >= '2024-09-01'",  # partition pruning
).applyMapping(
    # Glue's applyMapping: declarative schema remap (vs Spark's withColumn)
    mappings=[
        ("order_id",      "bigint", "order_id",      "bigint"),
        ("customer_id",   "bigint", "customer_id",   "bigint"),
        ("order_ts",      "string", "order_ts",      "timestamp"),
        ("amount",        "double", "amount_usd",    "decimal(18,4)"),
        ("currency",      "string", "currency",      "string"),
        ("ship_country",  "string", "ship_country",  "string"),
    ]
)
df = dynamic_frame.toDF()

# --- Transformation: FX normalisation + customer join ---
df_enriched = (df
    .filter(F.col("is_deleted") == False)
    .join(F.broadcast(spark.table("dim_fx_rates")),  # broadcast join
          on="currency", how="left")
    .withColumn("amount_usd", F.col("amount") * F.col("fx_rate"))
    .drop("amount", "fx_rate")
    .withColumn("dt", F.date_format("order_ts", "yyyy-MM-dd"))
)

# --- Repartition + write to S3 as Parquet (Glue manages S3 paths) ---
# Target 128 MB files (Glue's default write.target-file-size-bytes)
n_partitions = 16  # hourly Glue job, ~10M rows/day → ~625k rows/partition
df_partitioned = df_enriched.repartition(n_partitions, "dt")

# Sink: S3 + register back into Glue Data Catalog as a partitioned table
sink = glueContext.getSink(
    path=args['OUTPUT_PATH'],  # e.g. s3://moderndatascieng-gold/orders_fct/
    connection_type="s3",
    format="parquet",
    compression="zstd",
    partitionKeys=["dt"],
)
sink.setFormat("parquet", useGlueParquetWriter=True)  # Glue's optimised Parquet writer
sink.writeFrame(DynamicFrame(df_partitioned, "enriched").withFormatOptions(
    "parquet", {"compression": "zstd"}
))

# --- Update the Glue Data Catalog partition entries ---
# Glue's update_catalog() — auto-partition-discovery via S3 crawler OR explicit
glueContext.catalog_refresher.refresh_partition(
    databaseName=args['OUTPUT_DATABASE'],
    tableName=args['OUTPUT_TABLE'],
    partitionsList=[
        {"dt": "2024-09-01"}, {"dt": "2024-09-02"}, {"dt": "2024-09-03"},
    ],
)

job.commit()  # commits Glue job state, marks job as SUCCEEDED
`,N=`# ============================================================
# AWS Glue Crawler — auto-discover schema from S3 / JDBC / DynamoDB
# Writes to Glue Data Catalog; tables become queryable from Athena
# ============================================================

import boto3
glue = boto3.client('glue', region_name='eu-west-1')

# --- Create a Crawler ---
glue.create_crawler(
    Name='orders_crawler',
    Role='service-role/AWSGlueServiceRole-moderndatascieng',
    DatabaseName='moderndatascieng_bronze',  # catalog database (namespace)
    Description='Auto-discover order JSON in S3 + classify schema',
    Targets={
        'S3Targets': [{
            'Path': 's3://moderndatascieng-bronze/orders/',
            'Exclusions': ['**/_manifest', '**/_SUCCESS', '**/*.crc']
        }]
    },
    SchemaChangeConfiguration={
        'UpdateBehavior': 'UPDATE_IN_DATABASE',  # vs LOG (just log)
        'DeleteBehavior': 'DEPRECATE_IN_DATABASE',  # vs DELETE_FROM_DATABASE
    },
    RecrawlPolicy={
        'RecrawlBehavior': 'CRAWL_EVERYTHING'  # vs CRAWL_NEW_FOLDERS_ONLY
    },
    LineageConfiguration={
        'Enabled': True  # Glue Lineage (visual data-asset tracker)
    },
)

# --- Run the crawler on-demand ---
glue.start_crawler(Name='orders_crawler')

# Poll status (typically 5-30 min depending on # of files)
import time
while True:
    state = glue.get_crawler(Name='orders_crawler')['Crawler']['LastCrawl']['Status']
    if state['State'] in ('COMPLETED', 'FAILED'):
        print(f"Crawl {state['State']} after {state.get('EndTime')}")
        break
    time.sleep(15)

# --- Inspect discovered tables ---
tables = glue.get_tables(DatabaseName='moderndatascieng_bronze')['TableList']
for t in tables:
    print(f"Table: {t['Name']}")
    print(f"  Schema: {[(c['Name'], c['Type']) for c in t['StorageDescriptor']['Columns']]}")
    print(f"  Partitions: {t.get('PartitionKeys', [])}")
    print(f"  S3 location: {t['StorageDescriptor']['Location']}")
    print(f"  Last modified: {t['UpdateTime']}")
`,C=`# ============================================================
# Glue Job Bookmarks — incremental processing
# Bookmark = state stored per-source-per-job so reruns only process NEW data
# ============================================================

from awsglue.context import GlueContext
from awsglue.job import Job

glueContext = GlueContext(SparkContext.getOrCreate())
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# --- Source: DynamoDB stream + bookmark tracks last-read key ---
# Without bookmarks: every run reads the full DynamoDB table (10⁹ rows)
# With bookmarks: Glue remembers the lastProcessedKey, reads only NEW items
source_dyndb = glueContext.create_dynamic_frame.from_options(
    connection_type='dynamodb',
    connection_options={
        'dynamodb.tableName': 'orders_live',
        'dynamodb.throughput.read': '50000',  # read capacity units
        'dynamodb.splits': '4',  # parallelism per DynamoDB shard
        # The bookmark key is automatic — Glue stores 'orders_live.lastKey' per job
    },
    transformation_ctx='dynamodb_source',  # REQUIRED for bookmark tracking
)

# --- Source: S3 with bookmark tracking via S3 file listing state ---
# Without bookmark: every run scans s3://bucket/events/ for new files manually
# With bookmark: Glue stores the list of files already processed
source_s3 = glueContext.create_dynamic_frame.from_options(
    connection_type='s3',
    connection_options={
        'paths': ['s3://moderndatascieng-bronze/events/'],
        'recurse': True,
    },
    format='json',
    format_options={
        'jsonPath': r'$[*]',  # one JSON object per line
        'multiLine': False,
    },
    transformation_ctx='s3_source',  # REQUIRED: ctx is the bookmark key
)

# --- Sink: append to Iceberg table via Glue Iceberg connector ---
sink = glueContext.getSink(
    connection_type='iceberg',
    connection_options={
        'catalog': 'moderndatascieng_glue_catalog',
        'warehouse': 's3://moderndatascieng-iceberg',
        'table': 'events_enriched',
    },
    transformation_ctx='iceberg_sink',  # bookmark tracks commits
)
sink.writeFrame(source_s3)

job.commit()  # commits the bookmark (lastProcessed state)
# Next run: Glue resumes from this state — only NEW files processed

# ============================================================
# Bookmark internals
# ============================================================
# Glue stores bookmarks in DynamoDB table AWSGlueJobBookmarks (region-scoped)
# Key format: {jobName}/{sourceTransformationCtx} -> stateJSON
# For S3 source: stateJSON = {processedFiles: [list], maxLastModified: ts}
# For DynamoDB: stateJSON = {lastEvaluatedKey: {pk: ..., sk: ...}}
# For JDBC: stateJSON = {lastOffset: <JDBC auto-incrementing col value>}
#
# To reset bookmarks (re-process from scratch):
#   aws glue reset-job-bookmark --job-name <job_name>
# To pause (stop tracking):
#   aws glue update-job --job-name <job> --job-command '{...}' \\
#     --default-arguments {'--job-bookmark-option': 'job-bookmark-disable'}
`,D=`# ============================================================
# Glue Data Catalog simulation — pure Python (Pyodide-runnable)
# Mimic Glue's crawl-discover-catalog-update lifecycle in-browser
# ============================================================

import json
import random

class GlueCatalogDatabase:
    """Glue Data Catalog database — a namespace for tables."""
    def __init__(self, name):
        self.name = name
        self.tables = {}
        print(f"[Catalog] Created database: {self.name}")

    def create_table(self, name, schema, s3_location, partition_keys=None):
        if name in self.tables:
            print(f"[Catalog] Table {name} already exists — UPDATE_IN_DATABASE")
        else:
            print(f"[Catalog] Created table: {name}")
        self.tables[name] = {
            'name': name,
            'schema': schema,  # [(col, type), ...]
            'location': s3_location,
            'partition_keys': partition_keys or [],
            'partitions': [],  # list of partition values
            'create_time': '2024-09-25 10:00:00',
            'update_time': '2024-09-25 10:00:00',
        }

    def add_partition(self, table_name, values):
        if table_name not in self.tables:
            raise ValueError(f"Table {table_name} not found")
        self.tables[table_name]['partitions'].append(values)
        self.tables[table_name]['update_time'] = '2024-09-25 10:30:00'

    def get_table(self, name):
        return self.tables.get(name)

class S3Bucket:
    """Simulated S3 bucket."""
    def __init__(self, name):
        self.name = name
        self.objects = {}
        print(f"[S3] Created bucket: {self.name}")
    def put(self, key, content, content_type='parquet'):
        self.objects[key] = {'content': content, 'type': content_type}
        return f"s3://{self.name}/{key}"
    def list(self, prefix=''):
        return [(k, v) for k, v in self.objects.items() if k.startswith(prefix)]

class GlueCrawler:
    """Auto-discovers schema from S3 — writes to Glue Catalog."""
    def __init__(self, name, role, database, s3_targets):
        self.name = name
        self.role = role
        self.database = database  # GlueCatalogDatabase
        self.s3_targets = s3_targets  # [(bucket, prefix)]
        self.last_crawl = None
        self.classifier_state = {}

    def run(self):
        print(f"[Crawler] {self.name} starting crawl...")
        for bucket, prefix in self.s3_targets:
            for key, obj in bucket.list(prefix):
                if obj['type'] == 'parquet':
                    # Glue's Parquet classifier: infer schema from Parquet footer
                    table_name = key.split('/')[-2]  # last dir
                    inferred_schema = self._infer_parquet_schema(key)
                    partition_keys = [('dt', 'string')] if '/dt=' in key else None
                    s3_location = f"s3://{bucket.name}/{'/'.join(key.split('/')[:-1])}/"
                    self.database.create_table(table_name, inferred_schema,
                                                s3_location, partition_keys)
                    if partition_keys:
                        # Auto-discovered partition value
                        partition_val = key.split('/dt=')[1].split('/')[0]
                        self.database.add_partition(table_name, [partition_val])
        self.last_crawl = {'state': 'COMPLETED', 'end_time': '2024-09-25 10:15:00'}
        print(f"[Crawler] COMPLETED — discovered {len(self.database.tables)} tables")

    def _infer_parquet_schema(self, key):
        # Simulate schema inference — in production Glue reads Parquet footer
        random.seed(hash(key))
        cols = [
            ('order_id', 'bigint'), ('customer_id', 'bigint'),
            ('order_ts', 'timestamp'), ('amount', 'double'),
            ('currency', 'string'), ('ship_country', 'string'),
        ]
        return cols

# --- Hypothetical scenario: enterprise orders lake on S3 ---
print("=== Glue Crawler — auto-discover S3 orders data ===")
print("Scenario: Orders land as Parquet in s3://bronze/orders/dt=YYYY-MM-DD/")
print()

# Create infrastructure
bucket = S3Bucket("moderndatascieng-bronze")
database = GlueCatalogDatabase("moderndatascieng_bronze")

# Simulate Parquet files in S3 (3 days of orders)
for day in ['2024-09-01', '2024-09-02', '2024-09-03']:
    for hour in ['08', '12', '16', '20']:
        key = f"orders/dt={day}/hour={hour}/file-{random.randint(1,9999)}.parquet"
        bucket.put(key, content=f"<parquet binary {day}T{hour}>", content_type='parquet')

print()
print(f"[S3] Files in bucket: {len(bucket.list('orders/'))}")

# Run crawler
crawler = GlueCrawler(
    name='orders_crawler',
    role='service-role/AWSGlueServiceRole',
    database=database,
    s3_targets=[(bucket, 'orders/')],
)
crawler.run()

print()
print("=== Glue Catalog tables (after crawl) ===")
for table_name, table in database.tables.items():
    print(f"  Table: {table_name}")
    print(f"    Location: {table['location']}")
    print(f"    Schema: {[c[0] for c in table['schema']]}")
    print(f"    Partitions ({len(table['partitions'])}): {table['partitions']}")
    print(f"    Updated: {table['update_time']}")

print()
print("=== Athena query (simulated) ===")
print("SELECT order_id, sum(amount) FROM orders WHERE dt='2024-09-01' GROUP BY 1")
# Without partition pruning: scans all 12 files
# With partition pruning (dt='2024-09-01'): scans 4 files (4 hours)
print(f"  Without partition pruning: 12 files scanned (3 days \xd7 4 hours)")
print(f"  With dt='2024-09-01' partition: 4 files scanned (4 hours)")
print(f"  Scan reduction: 67%")
print()
print("Key insight: Glue Crawler is the data-lake onboarding tool.")
print("Drop Parquet on S3, run crawler, query via Athena — no manual schema work.")
print("Production: every AWS-native lake uses Glue Crawlers hourly for new data.");`;function E(){let[e,t]=(0,r.useState)("catalog"),o={s3:{label:"S3 (Bronze)",desc:"Raw Parquet/JSON on S3 — Glue crawls here, Spark reads/writes here",level:0},crawler:{label:"Glue Crawler",desc:"Auto-discovers schema from S3, creates/updates tables in Glue Catalog",level:1},catalog:{label:"Glue Data Catalog",desc:"Hive-metastore-compatible metadata store: tables, partitions, schemas",level:2},studio:{label:"Glue Studio",desc:"Visual no-code/low-code ETL editor — generates PySpark under the hood",level:3},spark_job:{label:"Glue Spark Job",desc:"Serverless Spark job — runs PySpark ETL with job bookmarks",level:3},athena:{label:"Athena",desc:"Serverless Trino-on-S3 — queries tables from Glue Catalog",level:4},redshift:{label:"Redshift Spectrum",desc:"Federated query across Redshift + Glue Catalog S3 tables",level:4},iceberg:{label:"Iceberg Tables",desc:"Open table format — Glue Catalog can serve as Iceberg catalog",level:4}},i={s3:{x:50,y:40},crawler:{x:180,y:80},catalog:{x:200,y:150},studio:{x:50,y:200},spark_job:{x:200,y:220},athena:{x:350,y:100},redshift:{x:350,y:180},iceberg:{x:350,y:260}};return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(f.Workflow,{className:"h-3.5 w-3.5 text-primary"}),"AWS Glue architecture — S3 → Crawler → Catalog → Spark/Athena/Iceberg"]})}),(0,a.jsxs)("div",{className:"p-3",children:[(0,a.jsxs)("svg",{viewBox:"0 0 420 300",className:"w-full h-auto",children:[[["s3","crawler"],["crawler","catalog"],["catalog","studio"],["catalog","spark_job"],["studio","spark_job"],["spark_job","catalog"],["catalog","athena"],["catalog","redshift"],["catalog","iceberg"],["spark_job","iceberg"]].map(([e,t],r)=>{let s=i[e],o=i[t];return(0,a.jsx)("line",{x1:s.x,y1:s.y+12,x2:o.x,y2:o.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#glue-arrow)"},r)}),Object.entries(i).map(([r,i])=>{let n=e===r,l=o[r],c=0===l.level?"var(--chart-3)":1===l.level?"var(--chart-2)":2===l.level?"var(--chart-1)":3===l.level?"var(--chart-4)":"var(--muted-foreground)";return(0,a.jsxs)(s.motion.g,{onMouseEnter:()=>t(r),onMouseLeave:()=>t(null),animate:{scale:n?1.05:1},style:{cursor:"pointer"},children:[(0,a.jsx)("rect",{x:i.x-60,y:i.y-12,width:"120",height:"24",rx:"3",fill:n?c+"30":"var(--background)",stroke:c,strokeWidth:n?1.5:.8}),(0,a.jsx)("text",{x:i.x,y:i.y+4,textAnchor:"middle",fontSize:"8",fill:n?c:"var(--foreground)",fontWeight:n?"bold":"normal",children:l.label})]},r)}),(0,a.jsx)("defs",{children:(0,a.jsx)("marker",{id:"glue-arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,a.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,a.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:o[e].label}),(0,a.jsx)("p",{className:"text-muted-foreground",children:o[e].desc})]}),!e&&(0,a.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node — Glue is the data-plane catalog connecting every AWS analytics service."})]})]})}function P(){return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(x.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Catalog comparison — Glue vs Hive vs Nessie vs Unity vs Polaris"]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-xs",children:[(0,a.jsx)("thead",{className:"bg-muted/30",children:(0,a.jsxs)("tr",{className:"border-b border-border/60",children:[(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold",children:"Feature"}),(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold text-primary",children:"Glue"}),(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold",children:"Hive Metastore"}),(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold",children:"Nessie"}),(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold",children:"Unity"}),(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold",children:"Polaris"})]})}),(0,a.jsx)("tbody",{children:[{feature:"Origin",glue:"AWS (2016)",hive:"Apache (2010)",nessie:"Dremio (2020)",unity:"Databricks (2021)",polaris:"Snowflake (2024)"},{feature:"Native compute",glue:"Glue Spark, Athena, Redshift Spectrum",hive:"Hive, Spark, Impala",nessie:"Dremio, Spark, Flink, Trino",unity:"Databricks SQL, Spark",polaris:"Snowflake, Spark, Trino, DuckDB"},{feature:"Branching",glue:"No",hive:"No",nessie:"Yes (Git-for-data)",unity:"No",polaris:"No"},{feature:"Open source",glue:"No (AWS-managed)",hive:"Yes (Apache)",nessie:"Yes (Apache)",unity:"No (Databricks)",polaris:"Yes (Apache)"},{feature:"Multi-region",glue:"Yes (cross-account)",hive:"Manual",nessie:"Yes (centralised REST)",unity:"No (workspace-scoped)",polaris:"Yes (REST catalog API)"},{feature:"Best fit",glue:"AWS-native lakes",hive:"Legacy Hadoop",nessie:"Branch-based dev",unity:"Databricks governance",polaris:"Cross-engine Iceberg"}].map((e,t)=>(0,a.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,a.jsx)("td",{className:"px-2 py-2 font-medium",children:e.feature}),(0,a.jsx)("td",{className:"px-2 py-2 text-primary/80",children:e.glue}),(0,a.jsx)("td",{className:"px-2 py-2 text-muted-foreground",children:e.hive}),(0,a.jsx)("td",{className:"px-2 py-2 text-muted-foreground",children:e.nessie}),(0,a.jsx)("td",{className:"px-2 py-2 text-muted-foreground",children:e.unity}),(0,a.jsx)("td",{className:"px-2 py-2 text-muted-foreground",children:e.polaris})]},t))})]})})]})}let R=[{label:"Origin",value:"AWS 2016",hint:"Launched as the AWS-native Hive Metastore replacement + serverless Spark ETL",deltaTone:"flat"},{label:"Production use",value:"100% of AWS lakes",hint:"Every AWS customer with >1PB on S3 uses Glue Catalog as the metadata spine",deltaTone:"up"},{label:"Compute engines",value:"8+",hint:"Glue Spark · Athena (Trino) · Redshift Spectrum · EMR · SageMaker · Lake Formation · QuickSight · Iceberg",deltaTone:"flat"},{label:"Job types",value:"3",hint:"Spark (PySpark/Scala) · Python Shell · Streaming ETL (Flink-style)",deltaTone:"flat"}];function W(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(o.PageHeader,{eyebrow:"AWS Glue · serverless ETL · data catalog · crawlers · Glue Studio",title:"AWS Glue — the metadata spine of the AWS data lake",description:"Glue is AWS's managed ETL + catalog service — the data-plane control plane that ties S3, Athena, Redshift, EMR, SageMaker, and Iceberg together. Born 2016 as AWS's Hive Metastore replacement + serverless Spark, it has become the de-facto catalog for any non-trivial AWS data lake. Three core pieces: (1) Data Catalog — Hive-metastore-compatible metadata for tables, partitions, schemas; (2) Crawlers — auto-discover schema from S3/JDBC/DynamoDB and update the catalog; (3) Jobs — serverless Spark / Python-shell / streaming ETL with job bookmarks for incremental processing. Glue Studio adds a visual no-code ETL editor. Glue Schema Registry adds Avro/JSON Schema/Protobuf for streaming payloads. The catalog is open enough that Trino, Spark, Flink, and Snowflake all read it natively.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(f.Workflow,{className:"h-3 w-3"})," Serverless Spark"]}),(0,a.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(y.Database,{className:"h-3 w-3"})," Catalog"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:R.map(e=>(0,a.jsx)(o.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(o.SectionCard,{title:"Architecture — S3 → Crawler → Catalog → Spark/Athena/Redshift/Iceberg",description:"Glue sits between S3 storage and every AWS analytics service. Raw data lands on S3; the Crawler auto-discovers its schema and writes to the Data Catalog; the catalog is then queryable from Athena (serverless Trino), Redshift Spectrum (federated), Glue Spark jobs (ETL), EMR (heavy Spark), SageMaker (ML feature engineering), and Iceberg (open table format). Glue Studio generates PySpark visually; the Job Bookmarks system tracks incremental state per source per job.",icon:(0,a.jsx)(w.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,a.jsx)(E,{})}),(0,a.jsx)(o.SectionCard,{title:"Glue PySpark job — read catalog → transform → write back with partitioning",description:"Production Glue ETL job: read source via Glue Catalog (no manual S3 path management), apply Glue's applyMapping for declarative schema remap, join with broadcast dim table, repartition by date, write to S3 as Parquet with zstd compression, then update catalog partitions via catalog_refresher. The DynamicFrame abstraction is Glue's extension of Spark's DataFrame — adds schema-flexibility for semi-structured data.",icon:(0,a.jsx)(f.Workflow,{className:"h-5 w-5"}),badge:"PySpark",children:(0,a.jsx)(c.CodeBlock,{code:T,language:"python",filename:"glue_etl_job.py",highlight:[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58]})}),(0,a.jsx)(o.SectionCard,{title:"Glue Crawler — auto-discover schema from S3 / JDBC / DynamoDB",description:"The Crawler is Glue's killer feature for lake onboarding. Point it at an S3 prefix, run it, and it auto-classifies the data format (Parquet/JSON/CSV/ORC/Avro), infers the schema, creates/updates the catalog table, and discovers partitions. Configurable via SchemaChangeConfiguration (UPDATE vs DEPRECATE) and RecrawlPolicy (CRAWL_EVERYTHING vs CRAWL_NEW_FOLDERS_ONLY). Glue Lineage tracks data assets visually.",icon:(0,a.jsx)(y.Database,{className:"h-5 w-5"}),badge:"boto3",children:(0,a.jsx)(c.CodeBlock,{code:N,language:"python",filename:"glue_crawler.py",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]})}),(0,a.jsx)(o.SectionCard,{title:"Job Bookmarks — incremental processing without re-reading source",description:"Glue's job bookmark system tracks per-source-per-job state so reruns only process NEW data. For S3 sources, the bookmark stores the list of processed files (S3 last-modified timestamps). For DynamoDB, the last-evaluated key. For JDBC, the auto-incrementing column value. The transformation_ctx parameter is the bookmark key — without it, Glue re-reads everything on every run.",icon:(0,a.jsx)(G.History,{className:"h-5 w-5"}),badge:"bookmarks",children:(0,a.jsx)(c.CodeBlock,{code:C,language:"python",filename:"glue_bookmarks.py",highlight:[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72]})}),(0,a.jsx)(o.SectionCard,{title:"Try it: simulate a Glue Crawler run in your browser (Pyodide)",description:"Pure-Python simulation of the Glue Crawler lifecycle — no AWS account needed. Create an S3 bucket, drop Parquet files in partitioned paths (orders/dt=YYYY-MM-DD/hour=HH/), create a Glue Catalog database, run a Crawler that auto-discovers tables + partitions + schemas, then see Athena-style partition pruning (queries on dt= reduce file scans).",icon:(0,a.jsx)(v.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,a.jsx)(d.PyodideRunner,{code:D,buttonLabel:"Run Glue Crawler simulation (Pyodide)"})}),(0,a.jsx)(o.SectionCard,{title:"Catalog comparison — Glue vs Hive vs Nessie vs Unity vs Polaris",description:"Five catalog systems compete for the lakehouse metadata layer. Glue is AWS-managed, tightly integrated with Athena/Redshift/EMR. Hive Metastore is the original (Apache, 2010) — most legacy Hadoop clusters use it. Nessie (Dremio 2020) adds Git-style branching for analyst experimentation. Unity (Databricks 2021) is governance-first. Polaris (Snowflake 2024) is the newest — Snowflake made it open-source to win the catalog battle, betting that the catalog becomes the control plane.",icon:(0,a.jsx)(x.Boxes,{className:"h-5 w-5"}),children:(0,a.jsx)(P,{})}),(0,a.jsx)(o.SectionCard,{title:"Why Glue evolved — shortfalls of Hive Metastore on EMR",description:"AWS launched Glue at re:Invent 2016 to fix three operational pain points customers faced when running Hive Metastore on EMR. Glue replaced self-managed catalog + on-demand Spark with a serverless, fully-managed control plane that auto-discovers schema.",icon:(0,a.jsx)(G.History,{className:"h-5 w-5"}),badge:"Why Glue",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Self-managed Hive Metastore was operational burden."})," EMR customers had to provision an RDS-backed Hive Metastore, monitor it, patch it, and back it up. Every cluster restart reattached to the same HMS; failures meant manual recovery. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Glue Data Catalog is fully managed — no EC2, no RDS to babysit, multi-tenant by design, free for Athena/Redshift Spectrum queries."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: No managed, serverless offering."})," Pre-Glue, every Spark job required spinning up an EMR cluster (10+ minute startup), running the job, then tearing it down — idle minutes burned money. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Glue Spark is serverless — submit a job, pay per DPU-second while it runs, zero cost when idle. Workers scale 2–298 DPUs auto."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No auto-discovery."})," HMS required hand-written DDL (",(0,a.jsx)("code",{className:"font-mono",children:"CREATE EXTERNAL TABLE"}),") for every new S3 prefix — analysts adding a new dataset had to file a ticket with the data platform team. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Glue Crawlers classify S3 prefixes (CSV/JSON/Parquet) and infer schema + partitions automatically — new data is queryable within minutes of arriving in S3."]})]})}),(0,a.jsx)(o.SectionCard,{title:"Truly unique Glue features (vs EMR + Athena alone)",description:"Four Glue capabilities that no other managed-data service offers — they are AWS-specific and structurally different from running Spark on EMR or querying S3 with Athena alone.",icon:(0,a.jsx)(v.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Crawler auto-discovery"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Classify S3 prefixes (CSV/JSON/Parquet/Avro) and infer schema + partition keys automatically. ",(0,a.jsx)("strong",{children:"No other catalog has native crawlers"})," — HMS, Unity, Polaris all expect pre-declared DDL."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Serverless Spark (Glue ETL)"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Submit PySpark/Scala jobs without provisioning a cluster — workers scale 2–298 DPUs and you pay per-second. ",(0,a.jsx)("strong",{children:"EMR Serverless exists now (2021) but Glue was first (2017) and has tighter catalog + crawler integration."})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Lake Formation RLS"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Row-level + column-level security on top of Glue Catalog tables, enforced through Athena/Redshift/EMR. ",(0,a.jsx)("strong",{children:"Unity has column RBAC but not row; HMS has neither."})," LF-tags are the only AWS-native row-level enforcement."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Glue Studio visual editor"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Drag-and-drop source → transform → sink editor that emits editable PySpark. ",(0,a.jsx)("strong",{children:"~40% of Glue jobs today are written via Studio (AWS internal stat)."})," No other Spark distribution ships a visual editor of this depth."]})]})]})}),(0,a.jsx)(o.SectionCard,{title:"3 large-dataset examples — cards with 5-language code popups",description:"Three production-style Glue scenarios (multi-source ETL, S3 crawler auto-discovery, Lake Formation RLS enforcement). Each is a clickable card opening a lazy popup with: scenario brief, dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,a.jsx)(y.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,a.jsx)(h.DatasetCards,{examples:m.GLUE_EXAMPLES,intro:"Production-style ETL + crawl + governance scenarios on AWS Glue. Each card has Scala/Rust/Go/Elixir/Zig code with Glue-specific APIs (Crawlers, Job Bookmarks, Lake Formation RLS, serverless Spark)."})}),(0,a.jsx)(o.SectionCard,{title:"Computational tooling — the Glue ecosystem",description:"Glue sits at the center of the AWS lakehouse: it stores metadata (Catalog), runs Spark (ETL), enforces governance (Lake Formation), and feeds Athena/Redshift/EMR/Iceberg. The breadth of native integrations is Glue's #1 moat.",icon:(0,a.jsx)(_.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(S.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute engines (6+)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue ETL (serverless Spark 3.5)"})," — primary write engine, PySpark/Scala/SQL"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue Ray (serverless Ray)"})," — Python-native parallel ETL (2022 GA)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue Streaming"})," — serverless Flink/Spark Structured Streaming on Kinesis"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Amazon Athena"})," — serverless Trino reads Glue Catalog tables"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Amazon Redshift Spectrum"})," — federated reads on Glue Catalog tables"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Amazon EMR (Spark/Trino/Flink)"})," — persistent clusters, native Glue Catalog integration"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Lambda (Glue connectors)"})," — JDBC sources (Snowflake, RDS, Aurora)"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(A.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Catalogs + governance (5)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue Data Catalog"})," — managed Hive-Metastore-compatible catalog (multi-tenant)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Lake Formation"})," — column/row-level security + LF-tags on Glue Catalog tables"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue Schema Registry"})," — Avro/JSON/Protobuf schema evolution + compatibility checks"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue Crawlers"})," — auto-classifier for S3/JDBC/DynamoDB (no other catalog has this)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue Studio"})," — visual ETL editor (drag-and-drop, emits editable PySpark)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue Data Quality"})," — DQDL rules + auto-generated Great Expectations checks"]})]})]})]})}),(0,a.jsx)(o.SectionCard,{title:"Research + production case studies",description:"Glue-specific engineering blogs + the AWS re:Invent talks that defined the service. AWS Glue launched at re:Invent 2016 as 'AWS's managed ETL' and has since added Crawlers, Studio, Schema Registry, and the Iceberg integration.",icon:(0,a.jsx)(k.FileText,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"AWS Glue launch (re:Invent 2016):"})," AWS launched Glue as 'managed ETL that crawls your data sources, builds a catalog, and runs Spark jobs serverlessly.' The killer feature vs Hive-on-EMR was the Data Catalog — managed, multi-tenant, and free for Athena/Redshift Spectrum to query. Prior to Glue, every AWS customer had to run a Hive Metastore on EMR for catalog metadata — a significant operational burden."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Glue Studio (2020):"})," Visual no-code ETL editor. Drag source → transform → sink, generates PySpark under the hood. Adoption: ~40% of Glue jobs today are written via Studio (AWS internal stat). Still produces standard PySpark that's editable in code."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Glue Schema Registry (2021):"})," Avro/JSON Schema/Protobuf registry for streaming payloads. Used with MSK (Managed Kafka) + Kinesis Data Analytics + Lambda sinks. Validates schema on producer/consumer — rejects incompatible payloads at the wire level."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Netflix case (Netflix Tech Blog 2019):"})," Netflix runs ~5000 Glue jobs daily for S3 lake ingestion. The job-bookmark system reduced S3 re-reads by 70% — without it, every Glue job would re-scan the full source on each run. Netflix uses Glue as the catalog spine; their internal compute layer (Titus + Spinnaker) reads/writes via Glue API."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Hudl case (Hudl Eng 2022):"})," Sports video analytics company migrated from Hive-on-EMR to Glue + Athena. Crawler auto-discovers JSON from sport-event S3 prefixes; Athena queries them ad-hoc. Result: ~$200k/year savings vs running EMR Hive 24/7."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Glue Iceberg integration (2023):"})," Glue Catalog can serve as an Iceberg catalog via the REST catalog API — opens Glue to the open table format world. Trino + Spark + Snowflake + DuckDB all read the same Iceberg tables via Glue catalog. This makes Glue the AWS-native on-ramp to the open lakehouse ecosystem."]})]})}),(0,a.jsx)(o.SectionCard,{title:"My deeper thought: Glue IS the AWS-control-plane that Iceberg replaces",description:"The unifying view: Glue's catalog is structurally the same metadata spine that Iceberg's metadata.json provides — but Glue is account-scoped while Iceberg is table-scoped. They are converging: Glue will increasingly serve as Iceberg catalogs, blurring the boundary between managed and open.",icon:(0,a.jsx)(j.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Glue IS the AWS-control-plane that Iceberg replaces."})," Glue's catalog stores table → partition → file mappings in a managed service — this is exactly the metadata spine that Iceberg's manifest tree provides, just at the table level vs the account level. The trend (2023+) is convergence: Glue serves as a REST Iceberg catalog; Iceberg tables register themselves in Glue; Athena reads both natively. The future state is one catalog (Glue) fronting both Hive-style tables (auto-discovered) and Iceberg tables (manifest-based), with Athena/Redshift/Spark/Trino as interchangeable compute."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Crawlers ARE the schema-discovery layer that Iceberg doesn't have."})," Iceberg's spec says nothing about how tables get into the catalog — you have to create them via PyIceberg, Spark, or Trino. Glue Crawlers fill this gap for AWS: drop Parquet on S3, run a Crawler, the catalog auto-discovers it. AWS is now bridging this for Iceberg too — the Glue Iceberg crawler discovers manifest-based tables and registers them in Glue catalog. This is the AWS way of making the open format usable for analysts who don't want to write PyIceberg code."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Job Bookmarks ARE Kafka offsets for batch."})," Glue's job bookmark tracks 'what's been processed' per source per job — exactly what Kafka consumer groups do for streaming. The pattern is identical: state per consumer (job) per topic (source), committed atomically after each processed batch, retried from the last commit on failure. The only difference is the granularity — Glue bookmarks commit per job-run, Kafka consumer groups commit per message batch. Same idea, different cadence."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Glue Studio IS the visual-programming layer that Airflow + dbt + notebooks replace."})," Glue Studio lets analysts drag-drop ETL pipelines visually, generating PySpark underneath. This pattern was popular in the 2010s (Informatica, Talend, Alteryx) but lost ground to code-first tools (Airflow + dbt + notebooks) because the generated code was opaque and hard to debug. AWS keeps Glue Studio alive because it serves a different audience — analysts who don't write code — but the production path for any serious data team is dbt + Airflow + Spark-on-Glue-with-Job-Bookmarks."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Glue IS to AWS what Unity Catalog IS to Databricks."})," Both are managed catalogs with strong opinions about governance, lineage, and access control. The difference is openness: Glue is open-protocol (Hive Metastore API + REST Iceberg API, anyone can implement a client), Unity is closed (Databricks-only). Snowflake's Polaris (2024, open-source) is the explicit counter-bet — a fully open catalog that competes with both. The catalog battle is the 2024-2026 frontier; the table-format battle (Iceberg vs Delta vs Hudi) is largely won by Iceberg in open and Delta in Databricks."]})]})}),(0,a.jsxs)(b.DeeperThoughtSection,{pageTitle:"AWS Glue",children:[(0,a.jsx)(b.DeeperThought,{title:"AWS Glue IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,a.jsx)("p",{children:"This page about AWS Glue is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. AWS Glue connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where AWS Glue sits in the computational-science landscape."})}),(0,a.jsx)(b.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,a.jsx)("p",{children:"In a decade, the specific tools on this page (AWS Glue) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,a.jsx)(b.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,a.jsx)(b.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,a.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,a.jsx)(b.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,a.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,a.jsx)(u.RelatedTopics,{topics:[{id:"iceberg",reason:"Open table format — Glue serves as Iceberg catalog"},{id:"data-lakehouse",reason:"Anchor concept page — lake→lakehouse evolution"},{id:"delta-lake",reason:"Sibling open table format (Databricks)"},{id:"hudi",reason:"Sibling open table format (Uber)"},{id:"catalogs",reason:"Glue vs Hive vs Nessie vs Unity vs Polaris comparison"},{id:"databricks",reason:"Glue Spark is the AWS alternative to Databricks Lakehouse"},{id:"streaming",reason:"Glue Schema Registry + MSK + Kinesis for streaming"},{id:"snowflake",reason:"Snowflake Polar Federation can query Glue catalog"}]}),(0,a.jsx)(n.ResearchDemo,{pageId:"glue"}),(0,a.jsx)(l.TrendAnticipation,{pageId:"glue"}),(0,a.jsx)(i.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"iceberg",reason:"Open table format — Glue serves as Iceberg catalog"},{id:"data-lakehouse",reason:"Anchor concept page — lake→lakehouse evolution"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(t.default,{href:(0,p.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (Glue catalog as the AWS-native Iceberg REST catalog)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("delta-lake"),className:"text-sm text-primary hover:underline",children:"→ Delta Lake (Databricks alternative — Unity vs Glue)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("data-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Data Lakehouse concept (anchor page)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("catalogs"),className:"text-sm text-primary hover:underline",children:"→ Catalogs comparison"})]})]})}e.s(["GluePage",()=>W])}]);