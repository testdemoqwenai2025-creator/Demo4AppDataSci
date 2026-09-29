(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,456165,e=>{"use strict";var a=e.i(843476),t=e.i(522016),s=e.i(271645),r=e.i(846932),o=e.i(862824),n=e.i(342046),i=e.i(122836),l=e.i(716675),c=e.i(59938),d=e.i(158960),h=e.i(804785),g=e.i(901752),m=e.i(487486),u=e.i(332017),p=e.i(78094),f=e.i(658041),b=e.i(828579),y=e.i(691385),x=e.i(227516),S=e.i(581418),v=e.i(178583),w=e.i(25652),k=e.i(283086),T=e.i(966992),j=e.i(618393),_=e.i(727927);let N=`# ============================================================
# Snowflake Polaris Catalog — Apache-licensed REST catalog
# Configures Iceberg to use Polaris as its catalog service
# ============================================================

# Polaris catalog server config (polaris-server.yml)
server:
  port: 8181
  host: 0.0.0.0
  base_path: /api/catalog  # Iceberg REST catalog endpoint

# Storage credentials (cross-cloud: AWS + GCP + Azure)
storage:
  - name: aws-moderndatascieng
    type: S3
    role_arn: arn:aws:iam::123456789012:role/polaris-iceberg
    region: eu-west-1
  - name: gcp-moderndatascieng
    type: GCS
    project: moderndatascieng-prod
    service_account: polaris@moderndatascieng-prod.iam.gserviceaccount.com
  - name: azure-moderndatascieng
    type: AZURE
    tenant_id: abc-123
    storage_account: moderndatasciengprod

# Catalog namespaces (multi-tenant)
catalog:
  namespaces:
    - name: warehouse
      storage: aws-moderndatascieng
      location: s3://moderndatascieng-iceberg
    - name: ml_features
      storage: gcp-moderndatascieng
      location: gs://moderndatascieng-ml-iceberg
    - name: finance
      storage: azure-moderndatascieng
      location: abfss://finance@moderndatasciengprod.dfs.core.windows.net/

# Auth (OAuth2 — all clients must authenticate)
auth:
  type: oauth2
  issuer: https://auth.moderndatascieng.com
  client_id: polaris-iceberg
  scope: catalog_read_write

# Access control (RBAC + grants)
access:
  principals:
    - name: spark-emr-prod
      type: SERVICE
      grants: ["warehouse:USE_CATALOG", "warehouse:USE_NAMESPACE",
               "warehouse.orders_fct:SELECT", "ml_features:*:SELECT"]
    - name: trino-athena
      type: SERVICE
      grants: ["warehouse:USE_CATALOG", "warehouse:USE_NAMESPACE",
               "warehouse.orders_fct:SELECT", "warehouse.dim_customer:SELECT"]
    - name: duckdb-analysts
      type: GROUP
      grants: ["warehouse.orders_fct:SELECT"]
  roles:
    - name: reader
      grants: ["warehouse:USE_CATALOG", "warehouse:USE_NAMESPACE", "*:SELECT"]
    - name: writer
      grants: ["reader", "*:INSERT", "*:UPDATE", "*:DELETE"]

# Lineage + audit (every catalog call logged)
governance:
  lineage: true
  audit_log:
    destination: s3://moderndatascieng-audit/polaris/
    format: parquet
    partition_by: [date]
`,A=`# ============================================================
# Spark SQL — multi-catalog Iceberg reads (Glue + Nessie + Polaris)
# Join across catalogs in one federated query
# ============================================================

# Configure multiple catalogs in spark-defaults.conf
# spark.sql.catalog.glue_catalog    org.apache.iceberg.spark.SparkCatalog
# spark.sql.catalog.glue_catalog.catalog-impl org.apache.iceberg.aws.glue.GlueCatalog
# spark.sql.catalog.glue_catalog.warehouse s3://moderndatascieng-glue-iceberg/
#
# spark.sql.catalog.nessie_catalog  org.apache.iceberg.spark.SparkCatalog
# spark.sql.catalog.nessie_catalog.catalog-impl org.apache.iceberg.nessie.NessieCatalog
# spark.sql.catalog.nessie_catalog.uri http://nessie:19120/api/v1
# spark.sql.catalog.nessie_catalog.ref main
# spark.sql.catalog.nessie_catalog.warehouse s3://moderndatascieng-nessie/
#
# spark.sql.catalog.polaris_catalog org.apache.iceberg.spark.SparkCatalog
# spark.sql.catalog.polaris_catalog.catalog-impl org.apache.iceberg.rest.RESTCatalog
# spark.sql.catalog.polaris_catalog.uri https://polaris:8181/api/catalog
# spark.sql.catalog.polaris_catalog.warehouse s3://moderndatascieng-polaris/
# spark.sql.catalog.polaris_catalog.credential.mode PRIVILEGED

# Cross-catalog JOIN — read from 3 catalogs in one query
SELECT
    o.order_id,
    o.amount_usd,
    c.customer_email_hash,
    f.feature_value
FROM glue_catalog.warehouse.orders_fct        AS o
JOIN polaris_catalog.warehouse.dim_customer    AS c ON o.customer_id = c.customer_id
JOIN nessie_catalog.ml.features_user_activity  AS f ON o.customer_id = f.user_id
WHERE o.order_ts >= current_date - 7;

# Read from a Nessie branch (isolated experiment)
SELECT * FROM nessie_catalog.warehouse.orders_fct@dev_branch
WHERE ship_country = 'UK';

# Merge Nessie branch into main after experiment
ALTER nessie_catalog MERGE BRANCH dev_branch INTO main;

# Compare Polaris vs Glue catalog tables (table exists in both)
SELECT
    (SELECT count(*) FROM glue_catalog.warehouse.orders_fct) AS glue_rows,
    (SELECT count(*) FROM polaris_catalog.warehouse.orders_fct) AS polaris_rows,
    glue_rows = polaris_rows AS in_sync;`,C=`# ============================================================
# Project Nessie — Git-for-data semantics on Iceberg tables
# Branch + tag + commit semantics on tables, not just commits
# ============================================================

# Create a Nessie branch for an analytics experiment
nessie branch create experiment_br from main
# Now: SELECT * FROM warehouse.orders_fct@experiment_br — isolated view

# Modify tables on the branch (doesn't affect main)
INSERT INTO warehouse.orders_fct@experiment_br VALUES (...);
ALTER TABLE warehouse.orders_fct@experiment_br ADD COLUMN discount_code STRING;

# Other analysts work on main — they see the original state
SELECT * FROM warehouse.orders_fct;  # main branch, untouched
SELECT count(*) FROM warehouse.orders_fct@experiment_br
UNION ALL
SELECT count(*) FROM warehouse.orders_fct;
# Returns 1005 (experiment has 5 more rows) + 1000 (main unchanged)

# Diff between branches (Git-style)
nessie diff main experiment_br
# Output: tables changed, files added/removed per table, schemas evolved

# Tag a snapshot for reproducibility (immutable)
nessie tag create q3_2024_freeze from main
# Read as-of tag forever (Q3 2024 data locked for audit)
SELECT * FROM warehouse.orders_fct@q3_2024_freeze;

# Cherry-pick a single table change between branches
nessie cherry-pick warehouse.orders_fct@experiment_br INTO main
# Merges just the orders_fct changes (not other tables on the branch)

# Garbage-collect orphaned commits (after merge)
nessie gc --retain-hours 168
# Deletes unreferenced manifest files older than 7 days
# Production: run daily via Airflow`,E=`# ============================================================
# Catalog comparison simulation — in browser
# Simulate 6 catalogs (Glue, Hive, Nessie, Unity, Polaris, REST)
# registering + querying the same Iceberg table.
# ============================================================

import time
import random
from dataclasses import dataclass, field

@dataclass
class CatalogEntry:
    """One catalog entry — table_name → metadata_location."""
    table_name: str
    metadata_location: str
    last_updated: float
    properties: dict = field(default_factory=dict)

class Catalog:
    """Abstract catalog — all 6 implementations conform to this interface."""
    def __init__(self, name, features):
        self.name = name
        self.features = features  # set of supported features
        self.entries = {}  # catalog_namespace -> {table_name -> CatalogEntry}
        self.latency_ms = 0
        self.call_count = 0
    def register_table(self, namespace, table_name, metadata_location, properties=None):
        start = time.time()
        if namespace not in self.entries:
            self.entries[namespace] = {}
        self.entries[namespace][table_name] = CatalogEntry(
            table_name=table_name,
            metadata_location=metadata_location,
            last_updated=time.time(),
            properties=properties or {},
        )
        # Simulate catalog API latency (varies by catalog)
        time.sleep(self.features.get('latency_per_call_ms', 5) / 1000)
        self.latency_ms += (time.time() - start) * 1000
        self.call_count += 1
    def get_table(self, namespace, table_name):
        start = time.time()
        entry = self.entries.get(namespace, {}).get(table_name)
        time.sleep(self.features.get('latency_per_call_ms', 5) / 1000)
        self.latency_ms += (time.time() - start) * 1000
        self.call_count += 1
        return entry
    def list_tables(self, namespace):
        return list(self.entries.get(namespace, {}).keys())
    def __repr__(self):
        return f"Catalog({self.name}, features={self.features})"

# --- 6 catalogs: Glue, Hive, Nessie, Unity, Polaris, REST ---
catalogs = {
    'glue': Catalog('AWS Glue', {
        'vendor': 'AWS-managed',
        'open_source': False,
        'branching': False,
        'multi_region': True,
        'latency_per_call_ms': 12,  # AWS API Gateway adds latency
    }),
    'hive': Catalog('Hive Metastore', {
        'vendor': 'Apache (2010)',
        'open_source': True,
        'branching': False,
        'multi_region': False,
        'latency_per_call_ms': 8,  # direct MySQL-backed
    }),
    'nessie': Catalog('Nessie', {
        'vendor': 'Dremio (2020)',
        'open_source': True,
        'branching': True,
        'multi_region': True,
        'latency_per_call_ms': 6,
    }),
    'unity': Catalog('Unity Catalog', {
        'vendor': 'Databricks (2021)',
        'open_source': False,
        'branching': False,
        'multi_region': False,
        'latency_per_call_ms': 15,  # workspace-scoped
    }),
    'polaris': Catalog('Polaris', {
        'vendor': 'Snowflake (2024)',
        'open_source': True,
        'branching': False,
        'multi_region': True,
        'latency_per_call_ms': 10,
    }),
    'rest': Catalog('Iceberg REST Catalog', {
        'vendor': 'Apache (spec, any impl)',
        'open_source': True,
        'branching': False,
        'multi_region': True,
        'latency_per_call_ms': 4,  # lightweight REST
    }),
}

# --- Register the same Iceberg table in all 6 catalogs ---
print("=== Register Iceberg table in 6 catalogs ===")
namespace = 'warehouse'
table_name = 'orders_fct'
metadata_loc = 's3://moderndatascieng-iceberg/warehouse/orders_fct/metadata/v3.metadata.json'

for name, cat in catalogs.items():
    cat.register_table(namespace, table_name, metadata_loc,
                        properties={'format': 'iceberg-v2', 'n_files': 42})

print()
print("=== Query latency comparison — 100 get_table() calls per catalog ===")
for name, cat in catalogs.items():
    cat.latency_ms = 0
    cat.call_count = 0
    for _ in range(100):
        cat.get_table(namespace, table_name)
    avg_ms = cat.latency_ms / cat.call_count
    print(f"  {cat.name:20s}: avg {avg_ms:.2f}ms per call (100 calls total: {cat.latency_ms:.0f}ms)")

print()
print("=== Feature matrix ===")
print(f"{'Catalog':<22} | {'Vendor':<22} | {'Open':<5} | {'Branch':<7} | {'Multi-region'}")
print("-" * 90)
for name, cat in catalogs.items():
    f = cat.features
    print(f"{cat.name:<22} | {f['vendor']:<22} | {'✓' if f['open_source'] else '✗':<5} | "
          f"{'✓' if f['branching'] else '✗':<7} | {'✓' if f['multi_region'] else '✗'}")

print()
print("=== Branching demo (Nessie only) ===")
print("Scenario: analyst creates branch 'experiment_br', modifies table,")
print("         main stays untouched, branches can be merged like Git")
print()
print("  nessie branch create experiment_br from main")
print("  INSERT INTO warehouse.orders_fct@experiment_br VALUES (...)")
print("  -- main is untouched — other analysts see original state")
print("  nessie diff main experiment_br")
print("  -- shows: +1 row in experiment_br vs main")
print("  nessie cherry-pick warehouse.orders_fct@experiment_br INTO main")
print("  -- merges just this table's changes from experiment_br to main")

print()
print("Key insight: catalogs are the metadata layer — they all conform")
print("to the same interface (list_tables, get_table, register_table).")
print("Differences are in features (branching, multi-region), governance")
print("(RBAC, lineage, audit), and deployment (managed vs self-hosted).")
print("Snowflake's Polaris (2024, Apache-licensed) is the explicit")
print("counter-bet to Databricks' Unity Catalog — making the catalog")
print("open-source to win the next decade of lakehouse platform revenue.");`;function P(){let[e,t]=(0,s.useState)("polaris"),o={glue:{name:"Glue Catalog",vendor:"AWS (managed)",open:!1,branch:!1,multi:!0,color:"var(--chart-3)"},hive:{name:"Hive Metastore",vendor:"Apache (self-hosted)",open:!0,branch:!1,multi:!1,color:"var(--muted-foreground)"},nessie:{name:"Nessie",vendor:"Dremio → Apache",open:!0,branch:!0,multi:!0,color:"var(--chart-2)"},unity:{name:"Unity Catalog",vendor:"Databricks (managed)",open:!1,branch:!1,multi:!1,color:"var(--chart-1)"},polaris:{name:"Polaris Catalog",vendor:"Snowflake → Apache",open:!0,branch:!1,multi:!0,color:"var(--chart-4)"},rest:{name:"REST Catalog",vendor:"Apache (spec)",open:!0,branch:!1,multi:!0,color:"var(--chart-3)"}},n={glue:{x:80,y:60},hive:{x:180,y:30},nessie:{x:280,y:60},unity:{x:80,y:130},polaris:{x:180,y:160},rest:{x:280,y:130}};return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(p.Network,{className:"h-3.5 w-3.5 text-primary"}),"6 catalogs competing for the lakehouse metadata layer"]})}),(0,a.jsxs)("div",{className:"p-3",children:[(0,a.jsxs)("svg",{viewBox:"0 0 380 200",className:"w-full h-auto",children:[(0,a.jsx)("text",{x:"190",y:"195",textAnchor:"middle",fontSize:"8",fill:"var(--muted-foreground)",children:"Compute engines (Spark / Trino / Flink / DuckDB / Snowflake / Athena)"}),Object.entries(n).map(([s,n])=>{let i=o[s],l=e===s;return(0,a.jsxs)(r.motion.g,{onMouseEnter:()=>t(s),onMouseLeave:()=>t(null),animate:{scale:l?1.05:1},style:{cursor:"pointer"},children:[(0,a.jsx)("rect",{x:n.x-50,y:n.y-12,width:"100",height:"24",rx:"3",fill:l?i.color+"30":"var(--background)",stroke:i.color,strokeWidth:l?1.5:.8}),(0,a.jsx)("text",{x:n.x,y:n.y+4,textAnchor:"middle",fontSize:"8",fill:l?i.color:"var(--foreground)",fontWeight:l?"bold":"normal",children:i.name})]},s)}),Object.entries(n).map(([t,s])=>(0,a.jsx)("line",{x1:s.x,y1:s.y+12,x2:s.x,y2:"185",stroke:e===t?o[t].color:"var(--border)",strokeWidth:e===t?1.5:.5,strokeDasharray:"2,2",opacity:e===t?.8:.3},t))]}),e&&(0,a.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,a.jsx)("p",{className:"font-semibold",style:{color:o[e].color},children:o[e].name}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Vendor: ",o[e].vendor," · Open-source: ",o[e].open?"Yes":"No"," · Branching: ",o[e].branch?"Yes (Git-for-data)":"No"," · Multi-region: ",o[e].multi?"Yes":"No"]})]}),!e&&(0,a.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any catalog — all 6 conform to the same interface (list/get/register table); differences are in features, governance, and deployment model."})]})]})}function R(){return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(b.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"6 catalogs compared — 15 features across the metadata-layer battlefront"]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-xs",children:[(0,a.jsx)("thead",{className:"bg-muted/30",children:(0,a.jsxs)("tr",{className:"border-b border-border/60",children:[(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold",children:"Feature"}),(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold",children:"Glue"}),(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold",children:"Hive MS"}),(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold text-primary",children:"Nessie"}),(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold",children:"Unity"}),(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold text-primary",children:"Polaris"}),(0,a.jsx)("th",{className:"text-left px-2 py-2 font-semibold",children:"REST"})]})}),(0,a.jsx)("tbody",{children:[{feature:"Origin year",glue:"2016 (AWS)",hive:"2010 (Apache)",nessie:"2020 (Dremio)",unity:"2021 (Databricks)",polaris:"2024 (Snowflake)",rest:"2022 (Apache spec)"},{feature:"Vendor",glue:"AWS",hive:"Apache",nessie:"Dremio→Apache",unity:"Databricks",polaris:"Snowflake→Apache",rest:"Apache spec"},{feature:"Open-source",glue:"No (managed)",hive:"Yes (Apache)",nessie:"Yes (Apache)",unity:"No (Databricks)",polaris:"Yes (Apache)",rest:"Yes (spec)"},{feature:"Self-host option",glue:"No",hive:"Yes",nessie:"Yes",unity:"No",polaris:"Yes",rest:"Yes (any impl)"},{feature:"Multi-region",glue:"Yes (cross-account)",hive:"Manual (multi-HMS)",nessie:"Yes (centralised)",unity:"No (workspace)",polaris:"Yes",rest:"Yes"},{feature:"Branching",glue:"No",hive:"No",nessie:"Yes (Git-for-data)",unity:"No",polaris:"No",rest:"No"},{feature:"Tags (immutable)",glue:"No",hive:"No",nessie:"Yes",unity:"No",polaris:"No",rest:"No"},{feature:"RBAC",glue:"Lake Formation",hive:"SQL grants",nessie:"Yes",unity:"Yes (column-level)",polaris:"Yes",rest:"Implementer"},{feature:"Lineage",glue:"Glue Lineage",hive:"External (Atlas)",nessie:"Yes",unity:"Yes (first-class)",polaris:"Yes",rest:"Implementer"},{feature:"Audit log",glue:"CloudTrail",hive:"External",nessie:"Yes",unity:"Yes",polaris:"Yes",rest:"Implementer"},{feature:"Native compute",glue:"Glue Spark, Athena, Redshift Spectrum, EMR",hive:"Hive, Spark, Impala",nessie:"Dremio, Spark, Flink, Trino",unity:"Databricks SQL, Spark",polaris:"Snowflake, Spark, Trino, DuckDB",rest:"Spark, Trino, Flink (any REST client)"},{feature:"Protocol",glue:"Hive Metastore API + REST",hive:"Thrift",nessie:"REST",unity:"REST (Databricks-specific)",polaris:"REST (Iceberg standard)",rest:"REST (Iceberg standard)"},{feature:"Storage",glue:"S3",hive:"HDFS/S3",nessie:"S3/GCS/Azure",unity:"S3/Azure/GCS",polaris:"Multi-cloud",rest:"Multi-cloud"},{feature:"Best fit",glue:"AWS-native lakes",hive:"Legacy Hadoop",nessie:"Branch-based dev",unity:"Databricks governance",polaris:"Cross-engine Iceberg",rest:"Custom impls"},{feature:"Production use",glue:"100% AWS lakes",hive:"Legacy Hadoop",nessie:"Stripe, Adobe",unity:"All Databricks customers",polaris:"Snowflake + 2024 launches",rest:"Tabular, custom impls"}].map((e,t)=>(0,a.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,a.jsx)("td",{className:"px-2 py-2 font-medium",children:e.feature}),(0,a.jsx)("td",{className:"px-2 py-2 text-muted-foreground",children:e.glue}),(0,a.jsx)("td",{className:"px-2 py-2 text-muted-foreground",children:e.hive}),(0,a.jsx)("td",{className:"px-2 py-2 text-primary/80",children:e.nessie}),(0,a.jsx)("td",{className:"px-2 py-2 text-muted-foreground",children:e.unity}),(0,a.jsx)("td",{className:"px-2 py-2 text-primary/80",children:e.polaris}),(0,a.jsx)("td",{className:"px-2 py-2 text-muted-foreground",children:e.rest})]},t))})]})})]})}let D=[{label:"Catalogs in production",value:"6",hint:"Glue (AWS) · Hive Metastore (Apache) · Nessie (Dremio) · Unity (Databricks) · Polaris (Snowflake) · REST (Apache spec)",deltaTone:"flat"},{label:"Open-source",value:"4 of 6",hint:"Hive, Nessie, Polaris, REST are Apache-licensed; Glue + Unity are vendor-managed",deltaTone:"up"},{label:"Branching",value:"Only Nessie",hint:"Git-for-data semantics — branch + tag + commit on tables. Stripe/Adobe production use",deltaTone:"flat"},{label:"Battlefront year",value:"2024+",hint:"Snowflake open-sourced Polaris (2024) explicitly to counter Databricks' Unity Catalog — the catalog is the new control plane",deltaTone:"up"}];function I(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(o.PageHeader,{eyebrow:"Catalogs · Glue vs Hive vs Nessie vs Unity vs Polaris vs REST · metadata layer · control plane",title:"Catalogs — the metadata layer battlefront of the lakehouse",description:"Six catalog systems compete for the lakehouse metadata layer: AWS Glue Data Catalog (managed, AWS-native), Apache Hive Metastore (the original, 2010, self-hosted), Project Nessie (Dremio origin, 2020, Git-for-data semantics with branching), Databricks Unity Catalog (2021, governance-first, Databricks-locked), Snowflake Polaris Catalog (2024, Apache-licensed, Snowflake's open counter-bet to Unity), and Apache Iceberg REST Catalog (the spec — any vendor can implement). All 6 conform to the same interface (list_tables, get_table, register_table) and the same Iceberg REST API protocol — so compute engines (Spark, Trino, Flink, DuckDB, Snowflake, Athena) can swap between them with minimal config. The differences are in features (branching, lineage, audit), governance (column-level RBAC), deployment (managed vs self-hosted), and ecosystem fit. The catalog is the new control plane — whoever wins wins the next decade of lakehouse platform revenue.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(p.Network,{className:"h-3 w-3"})," 6 catalogs"]}),(0,a.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(x.History,{className:"h-3 w-3"})," 2024 battlefront"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:D.map(e=>(0,a.jsx)(o.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(o.SectionCard,{title:"6 catalogs competing for the lakehouse metadata layer",description:"Hover any catalog to see its features. All 6 sit between compute engines (Spark, Trino, Flink, DuckDB, Snowflake, Athena) and storage (S3/ADLS/GCS). They expose the same Iceberg REST API protocol — compute engines can swap between them. The battle is in features (branching, lineage, audit), governance (column-level RBAC), and deployment model (managed vs self-hosted). Snowflake's Polaris (2024, Apache) is the newest entry and is explicitly a counter-bet to Databricks' Unity (2021, closed).",icon:(0,a.jsx)(y.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,a.jsx)(P,{})}),(0,a.jsx)(o.SectionCard,{title:"Snowflake Polaris — Apache-licensed REST catalog config",description:"Polaris is Snowflake's open-source REST catalog (Apache-licensed 2024). Multi-cloud storage (S3 + GCS + Azure in one catalog). OAuth2 authentication for all clients. RBAC with principals (SERVICE for compute engines, GROUP for analysts) + roles (reader, writer). Lineage + audit logging by default. The config below is production-style — minimal changes from Snowflake's reference deployment.",icon:(0,a.jsx)(S.ShieldCheck,{className:"h-5 w-5"}),badge:"Polaris config",children:(0,a.jsx)(i.CodeBlock,{code:N,language:"yaml",filename:"polaris-server.yml",highlight:[7,8,9,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61]})}),(0,a.jsx)(o.SectionCard,{title:"Spark — multi-catalog federated JOIN across Glue + Nessie + Polaris",description:"Spark 3.5+ supports multiple Iceberg catalogs simultaneously. Configure each in spark-defaults.conf (one per catalog-impl), then JOIN across them in one query — e.g. read orders from Glue, customers from Polaris, ML features from Nessie. The branching syntax (table@branch) only works for Nessie — the others don't have branches. ALTER CATALOG MERGE BRANCH is Nessie-specific Git-for-data semantics.",icon:(0,a.jsx)(T.Cpu,{className:"h-5 w-5"}),badge:"Spark SQL",children:(0,a.jsx)(i.CodeBlock,{code:A,language:"sql",filename:"spark_multi_catalog.sql",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,33,34,35,38,39,41,42,43,44,45]})}),(0,a.jsx)(o.SectionCard,{title:"Project Nessie — Git-for-data semantics on Iceberg tables",description:"Nessie is the only catalog that supports branching — analysts can create isolated branches for experiments, modify tables, merge or discard, without touching main. Tags provide immutable snapshots for audit. Cherry-pick lets you merge a single table's changes between branches. This is the 'Git-for-data' pattern that no other catalog supports — Stripe and Adobe production use it for analyst experimentation.",icon:(0,a.jsx)(x.History,{className:"h-5 w-5"}),badge:"Nessie CLI",children:(0,a.jsx)(i.CodeBlock,{code:C,language:"bash",filename:"nessie_branching.sh",highlight:[3,4,7,8,11,12,13,16,17,19,20,21,22,23,25,26,27,28,30,31,32]})}),(0,a.jsx)(o.SectionCard,{title:"Try it: simulate 6 catalogs in your browser (Pyodide)",description:"Pure-Python simulation of all 6 catalogs. Register the same Iceberg table in each, measure query latency (REST is fastest at ~4ms, Unity slowest at ~15ms), see the feature matrix (open-source, branching, multi-region), and run a Nessie branching scenario (branch + modify + diff + cherry-pick + merge).",icon:(0,a.jsx)(k.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,a.jsx)(l.PyodideRunner,{code:E,buttonLabel:"Run 6-catalog comparison simulation (Pyodide)"})}),(0,a.jsx)(o.SectionCard,{title:"Full comparison — 15 features across the 6-catalog battlefront",description:"Every feature side-by-side. The pattern: Glue (AWS-managed, mature, no branching) · Hive Metastore (legacy, self-hosted) · Nessie (only one with branching) · Unity (Databricks-locked, governance-first) · Polaris (Snowflake's 2024 open-source counter-bet, multi-cloud) · REST (Apache spec, any impl). The catalog is the new control plane — whoever wins this battle wins the next decade of lakehouse platform revenue.",icon:(0,a.jsx)(b.Boxes,{className:"h-5 w-5"}),children:(0,a.jsx)(R,{})}),(0,a.jsx)(o.SectionCard,{title:"Why catalogs evolved — shortfalls of Hive Metastore",description:"The Hive Metastore (Apache, 2010) was the lakehouse catalog for a decade — self-hosted, single-region, no branching, no governance. The 2020-2024 catalog wave (Nessie, Unity, Polaris) fixed four structural shortfalls of HMS that broke multi-cloud, multi-tenant, governed lakehouses.",icon:(0,a.jsx)(x.History,{className:"h-5 w-5"}),badge:"Why Catalogs",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Legacy architecture, no cloud-native."})," HMS was designed in 2010 for on-prem Hadoop — it uses a relational backend (MySQL/Postgres) for table metadata and a Thrift API for clients. It has no native multi-cloud support, no S3-aware listing, and no incremental notification (clients must poll). ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Polaris (Snowflake, 2024) is cloud-native: REST API, multi-region, S3/ADLS/GCS abstraction, native event notifications."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: Single-region, no branching."}),' HMS has no concept of "dev branch of the catalog" — analysts experimenting with schema changes had to copy tables, modify the copy, and rewire jobs. Production + dev catalogs were separate HMS instances with no shared lineage. ',(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Nessie (Dremio, 2020) adds Git-style branching to the catalog itself — analysts create branches, experiment, merge or discard, with full audit and rollback."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No governance, no RBAC."})," HMS granted only database + table-level access — no column-level RBAC, no row-level security, no PII tagging. Governance had to be bolted on via Ranger/Atlas plugins, often inconsistent across engines. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Unity (Databricks, 2021) provides column + row-level RBAC, PII tags, lineage, audit — enforced across all Databricks engines (Spark, Photon, SQL, ML) consistently."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: No multi-vendor federation."})," HMS spoke one protocol (Thrift). To query across catalogs (Snowflake + HMS + Glue) required per-vendor connectors with different auth models. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," The Iceberg REST catalog spec (2023) provides a single protocol — Polaris, Tabular, Unity (via shim), Nessie all conform — any Iceberg engine can read from any REST-compliant catalog."]})]})}),(0,a.jsx)(o.SectionCard,{title:"Truly unique catalog features (vs HMS)",description:"Four capabilities that distinguish the 2020-2024 catalog wave from HMS — each catalog owns one of them as its structural differentiator.",icon:(0,a.jsx)(k.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Polaris multi-cloud"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Snowflake's Polaris (2024) is Apache-licensed and cloud-agnostic — same REST API on AWS, Azure, GCP, no vendor lock-in. ",(0,a.jsx)("strong",{children:"HMS is single-region; Unity is Databricks-bound; Glue is AWS-only."})," Polaris is the only multi-cloud open catalog."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Nessie Git-for-data"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Dremio's Nessie (2020) adds branching/merging to the catalog itself — analysts experiment on a branch, merge or discard. ",(0,a.jsx)("strong",{children:"No other catalog has branches; tables are mutable singletons in HMS/Unity/Glue/Polaris."})," Git-for-data is structurally unique."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Unity column-level RBAC"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Databricks Unity (2021) enforces column + row-level RBAC, PII tags, lineage across all Databricks engines consistently. ",(0,a.jsx)("strong",{children:"HMS has database/table-level only; Glue RLS needs Lake Formation; Polaris is just REST."})," Unity is the governance-first catalog."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. REST catalog spec"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["The Iceberg REST catalog spec (2023) is the open protocol — Polaris, Tabular, Nessie, Unity (via shim), custom all conform. ",(0,a.jsx)("strong",{children:"HMS uses Thrift; Glue uses its own JSON API; Unity uses Databricks RPC."})," REST spec wins on interoperability."]})]})]})}),(0,a.jsx)(o.SectionCard,{title:"3 large-dataset examples — cards with 5-language code popups",description:"Three production-style catalog scenarios (Polaris multi-cloud setup, Nessie branch-and-merge, Unity column RBAC enforcement). Each is a clickable card opening a lazy popup with: scenario brief, dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,a.jsx)(f.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,a.jsx)(d.DatasetCards,{examples:h.CATALOG_EXAMPLES,intro:"Production-style catalog scenarios showing the 2020-2024 wave: Polaris multi-cloud setup on AWS+Azure+GCP, Nessie branch-and-merge for analyst experimentation, Unity column + row RBAC enforcement. Each card has Scala/Rust/Go/Elixir/Zig code with catalog-specific primitives."})}),(0,a.jsx)(o.SectionCard,{title:"Computational tooling — the catalog ecosystem",description:"The catalog layer is the control plane of the lakehouse — it decides who can read what, which engines can access which tables, and how governance is enforced. Compute engines (6+) consume catalogs via the REST spec or Thrift; 5 catalog backends offer different trade-offs.",icon:(0,a.jsx)(j.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(T.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute engines (6+)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Spark 3.5+"})," — REST catalog + Glue + HMS + Nessie + Unity clients"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Trino 425+"})," — Iceberg REST, Glue, HMS, Nessie, Unity federated"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Flink 1.18+"})," — REST catalog + HMS for streaming ingest"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"DuckDB 0.10+"})," — REST catalog + Glue + HMS (laptop-scale)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Athena + Redshift"})," — Glue Catalog native, REST catalog via federated query"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Snowflake"})," — Polaris + Glue + Unity federation (external tables)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Databricks Photon"})," — Unity-native, REST catalog via Iceberg connector"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(_.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Catalog backends (5)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Snowflake Polaris (2024)"})," — Apache-licensed REST catalog, multi-cloud, OSS"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Databricks Unity Catalog (2021)"})," — Delta + Iceberg, column RBAC, lineage, audit"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Project Nessie (Dremio 2020)"})," — Git-for-data branching on Iceberg tables"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue Data Catalog (2016)"})," — managed HMS-compatible, multi-tenant"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Hive Metastore (2010)"})," — legacy, self-hosted, Thrift API"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Tabular (acquired by Databricks 2024)"})," — SaaS REST catalog on S3"]})]})]})]})}),(0,a.jsx)(o.SectionCard,{title:"Research + the catalog battlefront",description:"The 2024 catalog battle is the current frontier of lakehouse platform revenue. Snowflake's open-sourcing of Polaris was the strategic move that escalated it.",icon:(0,a.jsx)(v.FileText,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"AWS Glue Data Catalog (2016):"})," Launched at re:Invent 2016 as the AWS-native Hive Metastore replacement. Multi-tenant, free for Athena/Redshift Spectrum queries. Every AWS customer with >1PB on S3 uses Glue Catalog as their metadata spine. Closed-source (AWS-managed), but exposes the standard Hive Metastore API + Iceberg REST API — clients can read it from anywhere."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Apache Hive Metastore (2010):"})," The original catalog — every Hadoop cluster since 2010 ran Hive Metastore on MySQL. Self-hosted, Apache-licensed, no managed offering. Legacy deployments still exist (Cloudera customers, on-prem Hadoop). Being phased out in favour of Glue/Nessie/Polaris as customers move to cloud."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Project Nessie (Dremio 2020, Apache 2022):"}),' "Git-for-data" — branching + tagging + cherry-picking on Iceberg tables. Lets analysts create isolated branches for experiments without touching main. Production at Stripe (payments analytics experimentation), Adobe (Experience Platform feature engineering). The only catalog with branching — a unique feature that has driven adoption among analyst-heavy teams.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Databricks Unity Catalog (2021):"})," Centralised governance layer for Delta tables — column-level access control, lineage tracking, audit logs. Replaces per-workspace IAM. Unity is closed-source (Databricks-only) but exposes Iceberg REST API so external engines can read (read-only). All Databricks customers use Unity — it's the default since DBR 11.3. Strong governance but limited portability."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Snowflake Polaris Catalog (2024, Apache-licensed):"})," Snowflake's strategic counter-bet to Unity. Open-source, Apache-licensed, multi-cloud. Snowflake made it open-source specifically to win the catalog battle — betting that the catalog becomes the control plane and that customers will prefer open over closed. Production at Snowflake (obviously) + Tabular (the Iceberg company Snowflake acquired 2024) + early adopters."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Apache Iceberg REST Catalog (2022 spec):"})," The Iceberg spec's REST catalog API — any vendor can implement. Tabular (pre-Snowflake-acquisition) launched a production REST catalog. AWS Glue implements the REST API (since 2023). Polaris is built on the spec. The REST catalog is the universal protocol — like how ODBC/JDBC standardised database access in the 1990s, the Iceberg REST spec is standardising lakehouse catalog access in the 2020s."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The 2024 catalog battle:"})," Snowflake open-sourcing Polaris (May 2024) was the strategic escalation. Databricks had been winning the catalog battle via Unity (closed but powerful); Snowflake's counter was to make Polaris Apache-licensed, betting that customers will prefer open catalogs over closed. Tabular acquisition (June 2024) gave Snowflake the Iceberg founding team. The bet: if the catalog is open, the format battle (Iceberg vs Delta) becomes less relevant — customers pick catalog first, then format follows. This is the explicit inversion of Databricks' Unity strategy."]})]})}),(0,a.jsx)(o.SectionCard,{title:"My deeper thought: the catalog IS the new database",description:"The unifying view: the catalog is structurally a database — managed schema, multi-tenant, queryable, with access control. The same patterns that made databases the killer platform of the 1980s are now making catalogs the killer platform of the 2020s.",icon:(0,a.jsx)(w.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The catalog IS the new database."})," Pre-1970s, every application had its own bespoke storage — no shared schema, no shared access control. The relational database (Codd 1970) introduced a managed layer with shared schema, SQL access, and transactional guarantees. The same pattern is now happening for the lakehouse: pre-2020s, every Spark/Trino/Flink job had its own table references (bespoke); catalogs (Glue/Unity/Polaris) introduce a managed layer with shared schema, REST access, and access control. The catalog IS the database of the lakehouse era — the metadata is the data, the catalog server is the database engine, the compute engines are the clients. Whoever wins the catalog battle wins the platform revenue."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Branching IS the catalog's killer feature that no warehouse had."})," Traditional databases don't support branching — you can't branch a PostgreSQL database, modify the branch, then merge. Nessie's Git-for-data is the first time this pattern reached the data layer. Why? Because in a database, the storage and the metadata are coupled — branching requires copying the data. In a lakehouse, they're decoupled — the catalog is just metadata, so branching only requires creating new metadata pointers, not copying Parquet files. The decoupling is what makes branching possible. This is why no warehouse has branching and why lakehouse is structurally superior for experimentation."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The catalog IS the control plane because it owns identity."})," In a database, the database server owns table identity (schema.table). In a lakehouse, the catalog owns table identity (catalog.namespace.table). Whoever owns identity owns the control plane — that's why Snowflake made Polaris open-source. The bet is: if Polaris is open and Polaris owns table identity for Snowflake + Spark + Trino + DuckDB customers, then those customers' primary storage identity is Snowflake-controlled. That's the same strategic position Databricks was reaching for with Unity. The catalog battle is the new database-vendor battle."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Open vs closed IS the strategy inversion."})," Databricks made Unity closed (Databricks-only) because they bet customers would buy the full Databricks stack (Unity + Delta + Spark + ML). Snowflake made Polaris open (Apache) because they bet customers would prefer open catalogs and that Polaris would become the universal catalog — with Snowflake as the reference deployment. The two strategies are explicit inversions. The market will decide which wins; my read is that open catalogs win in the long run because compute engines (Spark, Trino, Flink, DuckDB) are themselves open and prefer open catalogs. Databricks' Unity is the strong incumbent; Polaris is the open challenger."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The 2020s catalog battle IS the 1990s database battle redux."})," In the 1990s, Oracle won the database battle with a closed-source (but open-API) strategy — clients could connect via ODBC from anywhere. Microsoft SQL Server and PostgreSQL fought back with open strategies. In the 2020s, Databricks' Unity is the Oracle play (closed-source, open-API); Snowflake's Polaris is the Microsoft/PostgreSQL play (open-source, open-API). The 1990s saw Oracle dominate enterprise but PostgreSQL win the long tail. The 2020s may see Unity dominate Databricks-ecosystem but Polaris/Nessie win the open ecosystem. Same pattern, 30 years later."]})]})}),(0,a.jsxs)(u.DeeperThoughtSection,{pageTitle:"Catalogs",children:[(0,a.jsx)(u.DeeperThought,{title:"Catalogs IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,a.jsx)("p",{children:"This page about Catalogs is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Catalogs connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Catalogs sits in the computational-science landscape."})}),(0,a.jsx)(u.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,a.jsx)("p",{children:"In a decade, the specific tools on this page (Catalogs) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,a.jsx)(u.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,a.jsx)(u.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,a.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,a.jsx)(u.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,a.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,a.jsx)(c.RelatedTopics,{topics:[{id:"iceberg",reason:"Open table format — all 6 catalogs serve Iceberg tables via REST"},{id:"delta-lake",reason:"Databricks table format — Unity Catalog is the catalog for Delta"},{id:"hudi",reason:"Apache Hudi table format — supported by Hive/Glue/Nessie/REST catalogs"},{id:"data-lakehouse",reason:"Anchor concept page — lake→lakehouse evolution"},{id:"glue",reason:"AWS-managed catalog — the most production-deployed catalog today"},{id:"databricks",reason:"Unity Catalog is Databricks' catalog — competes with Polaris"},{id:"snowflake",reason:"Polaris is Snowflake's catalog — competes with Unity"},{id:"modern-big-data",reason:"Big-picture context for the catalog layer"}]}),(0,a.jsx)(n.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"iceberg",reason:"Open table format — all 6 catalogs serve Iceberg tables via REST"},{id:"delta-lake",reason:"Databricks table format — Unity Catalog is the catalog for Delta"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(t.default,{href:(0,g.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (the table format all catalogs serve)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,g.hrefFor)("glue"),className:"text-sm text-primary hover:underline",children:"→ AWS Glue (AWS-managed catalog)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,g.hrefFor)("delta-lake"),className:"text-sm text-primary hover:underline",children:"→ Delta Lake (Databricks format, Unity Catalog)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,g.hrefFor)("data-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Data Lakehouse (concept anchor)"})]})]})}e.s(["CatalogsPage",()=>I])}]);