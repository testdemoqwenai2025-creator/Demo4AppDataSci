(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var t=e.i(843476),s=e.i(271645),r=e.i(487486),a=e.i(519455),i=e.i(716675),o=e.i(194058),n=e.i(862824),l=e.i(344396),d=e.i(178583),c=e.i(778917),u=e.i(283086),p=e.i(972520),h=e.i(217923),x=e.i(522016),m=e.i(901752);function g({pageId:e}){let s=(0,l.researchForPage)(e);return 0===s.length?null:(0,t.jsxs)(n.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,t.jsx)(d.FileText,{className:"h-5 w-5"}),badge:`${s.length} paper${1===s.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[s.map((e,s)=>(0,t.jsx)(E,{entry:e},s)),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[s.length," paper",1===s.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function E({entry:e}){let[n,l]=(0,s.useState)(!1),[d,g]=(0,s.useState)(null);return(0,t.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,t.jsx)(r.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,t.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,t.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,t.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,t.jsxs)(a.Button,{variant:"outline",size:"sm",onClick:()=>l(!n),className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(u.Sparkles,{className:"h-3 w-3"}),n?"Hide expected code":"Show expected code + visualization"]}),n&&(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(i.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let t=e.indexOf("{"),s=e.lastIndexOf("}");if(t>=0&&s>t){let r=e.substring(t,s+1);g(JSON.parse(r))}}catch{}},hideTextOutput:!!d,compact:!0}),d?(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(h.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,t.jsx)(o.AnalysisChart,{data:d,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,t.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,t.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,t.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,t.jsxs)(x.default,{href:(0,m.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,t.jsx)(p.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>g])},618393,e=>{"use strict";var t=e.i(953651);e.s(["Server",()=>t.default])},834161,e=>{"use strict";var t=e.i(181692);e.s(["Key",()=>t.default])},1525,e=>{"use strict";var t=e.i(843476),s=e.i(522016),r=e.i(342046),a=e.i(921371),i=e.i(580296),o=e.i(862824),n=e.i(122836),l=e.i(90441),d=e.i(901752),c=e.i(487486),u=e.i(716675),p=e.i(868054),h=e.i(658041),x=e.i(966992),m=e.i(581418),g=e.i(618393),E=e.i(852008),S=e.i(39312),T=e.i(834161),R=e.i(332017);let f=`-- ============================================================
-- Snowflake warehouse sizing matrix (managed by Terraform)
-- File: terraform/snowflake/warehouses.tf
-- ============================================================
CREATE WAREHOUSE IF NOT EXISTS WH_DBT_TRANSFORM
  WAREHOUSE_SIZE       = 'MEDIUM'
  AUTO_SUSPEND         = 30          -- seconds idle → auto-suspend
  AUTO_RESUME          = TRUE
  INITIALLY_SUSPENDED  = TRUE
  MIN_CLUSTER_COUNT    = 1
  MAX_CLUSTER_COUNT    = 8           -- multi-cluster autoscale
  SCALING_POLICY       = 'STANDARD'
  COMMENT             = 'dbt model materialisation — Bronze→Gold transforms';

CREATE WAREHOUSE IF NOT EXISTS WH_REPORTING
  WAREHOUSE_SIZE       = 'LARGE'
  AUTO_SUSPEND         = 60
  AUTO_RESUME          = TRUE
  MIN_CLUSTER_COUNT    = 1
  MAX_CLUSTER_COUNT    = 10
  SCALING_POLICY       = 'ECONOMY'   -- cost-aware BI
  COMMENT             = 'Tableau extract refresh + scheduled BI';

-- Resource monitor — cap monthly credit burn
CREATE RESOURCE MONITOR IF NOT EXISTS RM_PLATFORM
  WITH CREDIT QUOTA 12000
  FREQUENCY = MONTHLY
  START_TIMESTAMP = IMMEDIATELY
  NOTIFY USERS = (DATA_PLATFORM@MODERNDATASCIENG.COM)
  TRIGGERS
    ON 80 PERCENT DO NOTIFY
    ON 90 PERCENT DO SUSPEND
    ON 95 PERCENT DO SUSPEND_IMMEDIATE;
`,N=`-- ============================================================
-- Role hierarchy (principle of least privilege)
-- ============================================================
CREATE ROLE IF NOT EXISTS TRANSFORMER;
CREATE ROLE IF NOT EXISTS REPORTER;
CREATE ROLE IF NOT EXISTS PII_READER;
CREATE ROLE IF NOT EXISTS MARKETING_READER_UK;

GRANT ROLE TRANSFORMER       TO ROLE SYSADMIN;
GRANT ROLE REPORTER          TO ROLE SYSADMIN;
GRANT ROLE PII_READER        TO ROLE SECURITYADMIN;
GRANT ROLE MARKETING_READER_UK TO ROLE REPORTER;

-- Application service users (SCIM-provisioned from Azure AD)
CREATE USER IF NOT EXISTS DBT_SVC
  TYPE = SERVICE
  DEFAULT_WAREHOUSE = WH_DBT_TRANSFORM
  DEFAULT_ROLE      = TRANSFORMER
  MUST_CHANGE_PASSWORD = FALSE;

-- Granular grants (managed via Terraform / schemachange)
GRANT USAGE ON WAREHOUSE WH_DBT_TRANSFORM        TO ROLE TRANSFORMER;
GRANT USAGE ON DATABASE NORTHWind_PROD          TO ROLE TRANSFORMER;
GRANT USAGE ON SCHEMA  ANALYTICS.GOLD            TO ROLE REPORTER;
GRANT SELECT  ON ALL TABLES IN SCHEMA ANALYTICS.GOLD TO ROLE REPORTER;

-- Row-level security via context function
CREATE OR REPLACE ROW ACCESS POLICY region_rls
  AS (region_code VARCHAR) RETURNS BOOLEAN
  CURRENT_ROLE() IN ('SYSADMIN','PII_READER')
  OR region_code = CURRENT_REGION();

APPLY ROW ACCESS POLICY region_rls
  ON ANALYTICS.GOLD.DIM_CUSTOMER (region_code);
`,A=`-- ============================================================
-- Gold serving view — fct_orders enriched for BI consumption
-- Materialised as a SECURE VIEW in ANALYTICS.GOLD
-- ============================================================
CREATE OR REPLACE SECURE VIEW ANALYTICS.GOLD.FCT_ORDERS_SERVING
AS
SELECT
  o.order_id,
  o.order_ts,
  d.calendar_date                           AS order_date,
  d.fiscal_year,
  d.fiscal_quarter,
  c.customer_sk,
  c.customer_segment,
  c.region_code,
  p.product_sk,
  p.product_category,
  p.product_subcategory,
  s.store_sk,
  s.channel,
  o.order_qty,
  o.order_gross_amount,
  o.order_discount_amount,
  o.order_net_amount,
  o.order_currency,
  fx.gbp_rate,
  o.order_net_amount * fx.gbp_rate          AS order_net_amount_gbp
FROM ANALYTICS.GOLD.FCT_ORDERS        o
JOIN ANALYTICS.GOLD.DIM_CUSTOMER       c  ON c.customer_sk  = o.customer_sk
JOIN ANALYTICS.GOLD.DIM_PRODUCT        p  ON p.product_sk   = o.product_sk
JOIN ANALYTICS.GOLD.DIM_STORE          s  ON s.store_sk     = o.store_sk
JOIN ANALYTICS.GOLD.DIM_DATE            d  ON d.date_sk      = o.order_date_sk
LEFT JOIN ANALYTICS.GOLD.DIM_FX_RATE   fx ON fx.currency    = o.order_currency
                                        AND fx.effective_date = d.calendar_date
WHERE o.is_deleted = FALSE;

-- Cluster keys on the underlying table for BI performance
ALTER TABLE ANALYTICS.GOLD.FCT_ORDERS
  CLUSTER BY (order_date_sk, customer_sk);

-- Search optimisation for point lookups (customer service)
ALTER TABLE ANALYTICS.GOLD.FCT_ORDERS
  ADD SEARCH OPTIMIZATION ON (order_id, customer_sk);

-- Tag for governance — consumed by Unity Catalogue + Tableau
ALTER TABLE ANALYTICS.GOLD.FCT_ORDERS
  SET TAG governance.criticality = 'gold',
           governance.owner     = 'data_platform',
           governance.sla_minutes = 9;
`,O=[{metric:"P95 query latency (BI)",value:"1.4s",baseline:"4.2s",note:"Cluster keys + search opt"},{metric:"Concurrent BI users (peak)",value:"212",baseline:"60",note:"Multi-cluster 1→10"},{metric:"Credit burn / TB scanned",value:"0.42",baseline:"0.71",note:"−19% YoY (FinOps)"},{metric:"Auto-suspend hit rate",value:"94%",baseline:"n/a",note:"30s suspend on transform WH"}];function j(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(o.PageHeader,{eyebrow:"Serving warehouse",title:"Snowflake & SQL — governed serving layer",description:"Snowflake sits between Databricks Lakehouse and the BI / reverse-ETL consumers. It is sized for concurrency, secured with row-level + column-level policies, and instrumented end-to-end with resource monitors and tags.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(S.Zap,{className:"h-3 w-3"})," Multi-cluster"]}),(0,t.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(T.Key,{className:"h-3 w-3"})," RLS + column masking"]})]})}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:[(0,t.jsx)(o.KpiCard,{label:"Warehouses",value:"5",hint:"WH_ANALYTICS → WH_GOLD_SERVING"}),(0,t.jsx)(o.KpiCard,{label:"P95 BI latency",value:"1.4s",delta:"-67%",deltaTone:"up",hint:"vs FY24 baseline"}),(0,t.jsx)(o.KpiCard,{label:"Concurrent users peak",value:"212",delta:"+253%",deltaTone:"up",hint:"Black Friday peak"}),(0,t.jsx)(o.KpiCard,{label:"Credits / TB",value:"0.42",delta:"-19%",deltaTone:"up",hint:"FinOps optimisation"})]}),(0,t.jsx)(o.SectionCard,{title:"Warehouse sizing matrix",description:"Every warehouse is provisioned via Terraform and right-sized for its workload pattern. Multi-cluster autoscale handles concurrency spikes; auto-suspend caps idle cost.",icon:(0,t.jsx)(x.Cpu,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Warehouse"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Size"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Autoscale"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Suspend"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Cost / mo"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Purpose"})]})}),(0,t.jsx)("tbody",{children:l.SNOWFLAKE_WAREHOUSES.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0",children:[(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs font-semibold",children:e.name}),(0,t.jsx)("td",{className:"px-4 py-2.5",children:e.size}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono",children:e.autoscale}),(0,t.jsx)("td",{className:"px-4 py-2.5",children:e.suspends}),(0,t.jsx)("td",{className:"px-4 py-2.5 tabular-nums",children:e.monthly}),(0,t.jsx)("td",{className:"px-4 py-2.5 text-muted-foreground",children:e.purpose})]},e.name))})]})})}),(0,t.jsxs)("div",{className:"grid lg:grid-cols-2 gap-4",children:[(0,t.jsx)(o.SectionCard,{title:"Warehouse DDL (Terraform-managed)",description:"Provisioned via terraform/snowflake/warehouses.tf — never edited by hand.",icon:(0,t.jsx)(g.Server,{className:"h-5 w-5"}),badge:"HCL",children:(0,t.jsx)(n.CodeBlock,{code:f,language:"sql",filename:"warehouses.sql",highlight:[5,6,7,8,9,10,23,24,25,26,27,28]})}),(0,t.jsx)(o.SectionCard,{title:"Performance lift (synthetic)",description:"Before/after on key BI workloads after cluster keys + search optimisation.",icon:(0,t.jsx)(S.Zap,{className:"h-5 w-5"}),badge:"Synthetic",contentClassName:"p-0",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Metric"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"After"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Before"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Note"})]})}),(0,t.jsx)("tbody",{children:O.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0",children:[(0,t.jsx)("td",{className:"px-4 py-2.5",children:e.metric}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400",children:e.value}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-muted-foreground",children:e.baseline}),(0,t.jsx)("td",{className:"px-4 py-2.5 text-[11px] text-muted-foreground",children:e.note})]},e.metric))})]})})]}),(0,t.jsx)(o.SectionCard,{title:"RBAC hierarchy & grants",description:"Snowflake roles are SCIM-provisioned from Azure AD. Principle of least privilege + dynamic RLS via `current_region()` keeps market-scoped data scoped.",icon:(0,t.jsx)(m.ShieldCheck,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsxs)("div",{className:"grid lg:grid-cols-2 gap-0",children:[(0,t.jsx)("div",{className:"border-r border-border/60",children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Role"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Grants"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Type"})]})}),(0,t.jsx)("tbody",{children:l.SNOWFLAKE_RBAC.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0",children:[(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs font-semibold align-top",children:e.role}),(0,t.jsx)("td",{className:"px-4 py-2.5 text-xs align-top text-muted-foreground",children:e.grants}),(0,t.jsx)("td",{className:"px-4 py-2.5 align-top",children:(0,t.jsx)(c.Badge,{variant:"outline",className:"text-[10px]",children:e.type})})]},e.role))})]})})}),(0,t.jsx)("div",{children:(0,t.jsx)(n.CodeBlock,{code:N,language:"sql",filename:"rbac.sql",highlight:[6,7,8,9,22,23,24,25,32,33,34,35,36]})})]})}),(0,t.jsxs)(o.SectionCard,{title:"Gold serving view — fct_orders_serving",description:"The single, governed, BI-facing definition of an order. Every Tableau dashboard and Hightouch sync reads from this view — there is no second copy.",icon:(0,t.jsx)(h.Database,{className:"h-5 w-5"}),children:[(0,t.jsx)(n.CodeBlock,{code:A,language:"sql",filename:"fct_orders_serving.sql",highlight:[10,11,12,13,14,15,16,17,30,31,35,36,37,38,39,40,41]}),(0,t.jsxs)("div",{className:"mt-4 grid md:grid-cols-3 gap-3 text-sm",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"Cluster keys"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"CLUSTER BY (order_date_sk, customer_sk) — 92% of queries hit the leading cluster key."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"Search optimisation"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"Point lookups on order_id / customer_sk for customer service: 4.2s → 0.4s."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"Governance tags"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"SECURE VIEW + criticality=gold + owner=data_platform — consumed by Unity Catalogue."})]})]})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4",children:[(0,t.jsx)(o.SectionCard,{title:"Integration with the wider platform",icon:(0,t.jsx)(E.Layers,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-2 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)(n.InlineCode,{children:"Databricks → Snowflake"}),": Delta-to-Snowflake auto-ingest via Snowpipe streaming + manifest files."]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)(n.InlineCode,{children:"dbt"}),": runs materialisation on WH_DBT_TRANSFORM with slim CI selection."]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)(n.InlineCode,{children:"Tableau"}),": live queries on SECURE VIEWS with embedded Snowflake service user."]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)(n.InlineCode,{children:"Hightouch"}),": SQL models executed on WH_GOLD_SERVING; sync schedules aligned with dbt run."]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)(n.InlineCode,{children:"Reverse ETL API"}),": Snowflake External Functions for low-latency lookups."]})]})}),(0,t.jsx)(o.SectionCard,{title:"Operational excellence",icon:(0,t.jsx)(m.ShieldCheck,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-2 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• Resource monitor caps monthly credit burn at 12k credits (platform-wide)."}),(0,t.jsx)("li",{children:"• Query history piped to Datadog → slowest queries auto-flagged for review."}),(0,t.jsx)("li",{children:"• Account usage views audited weekly; orphaned roles reclaimed."}),(0,t.jsx)("li",{children:"• Time-travel 90 days, failover to reader account in DR region."}),(0,t.jsx)("li",{children:"• Snowflake secure data sharing for partner analytics (no copy, no egress)."})]})})]}),(0,t.jsx)(o.SectionCard,{title:"Try it: RBAC grant validator (Pyodide)",description:"Validates that every role has the expected privileges, flags unexpected grants. Pure Python stdlib — runs in your browser via Pyodide. First click loads ~10MB runtime.",icon:(0,t.jsx)(p.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(u.PyodideRunner,{code:`# Snowflake RBAC grant validator
# Simulates SHOW GRANTS output + validates against expected role/privilege matrix

grants = [
    {"role": "TRANSFORMER", "privilege": "USAGE",       "object": "WH_DBT_TRANSFORM",        "grantee": "DATA_ENGINEERS"},
    {"role": "TRANSFORMER", "privilege": "CREATE TABLE","object": "ANALYTICS.GOLD",         "grantee": "DATA_ENGINEERS"},
    {"role": "REPORTER",    "privilege": "SELECT",       "object": "ANALYTICS.GOLD",         "grantee": "ANALYSTS"},
    {"role": "PII_READER", "privilege": "SELECT",       "object": "ANALYTICS.GOLD.DIM_CUSTOMER", "grantee": "COMPLIANCE"},
    {"role": "MARKETING_READER_UK", "privilege": "SELECT", "object": "ANALYTICS.GOLD.FCT_ORDERS", "grantee": "MKT_ANALYSTS_UK"},
]

expected = {
    "TRANSFORMER": ["USAGE", "CREATE TABLE"],
    "REPORTER":    ["SELECT"],
    "PII_READER":  ["SELECT"],
}

issues = []
for role, expected_privs in expected.items():
    role_grants = [g for g in grants if g["role"] == role]
    actual_privs = set(g["privilege"] for g in role_grants)
    missing = set(expected_privs) - actual_privs
    if missing:
        issues.append(f"⚠ {role}: missing privileges {missing}")
    else:
        print(f"✓ {role}: all expected privileges present ({len(actual_privs)})")

for g in grants:
    if g["role"] not in expected:
        issues.append(f"⚠ Unexpected role '{g["role"]}' with {g["privilege"]} on {g["object"]}")

print()
print("=" * 60)
if issues:
    print("AUDIT ISSUES:")
    for issue in issues:
        print(f"  {issue}")
    print(f"
{len(issues)} issue(s) found.")
else:
    print("✓ All grants validated — no issues found.")
print("=" * 60)`,buttonLabel:"Run RBAC validator (Pyodide)"})}),(0,t.jsxs)(R.DeeperThoughtSection,{pageTitle:"Snowflake",children:[(0,t.jsx)(R.DeeperThought,{title:"Snowflake IS the cloud-native data warehouse — and it's APD, not shared-nothing",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"Traditional data warehouses (Teradata, Oracle Exadata) use shared-nothing architecture (each node has its own disk + CPU). Snowflake separates compute from storage: S3 for storage, elastic warehouses for compute. This IS the APD (Asymmetric Processing Domain) model — storage is cheap and shared, compute is expensive and elastic. The separation IS the insight: you don't need to co-locate data with compute if the network is fast enough (AWS's 25 Gbps ENIs). Snowflake IS the cloud-native answer to 'how do you scale a database in the cloud?'"})}),(0,t.jsx)(R.DeeperThought,{title:"The auto-suspend IS Snowflake's cost killer — and it's the right default",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"Snowflake warehouses auto-suspend after 1-60 seconds of inactivity (default 60s). This means: no queries → no compute cost. The warehouse IS literally turned off. This IS the right default for a cloud-native system where compute is billed per-second. The auto-suspend IS the 'Production patterns' fold — the pattern (elastically scale to zero) stays, the implementation (Snowflake vs Databricks serverless vs BigQuery) changes. The 19% cost reduction YoY comes from auto-suspend + auto-resume on demand."})}),(0,t.jsx)(R.DeeperThought,{title:"Snowflake's virtual warehouses ARE Kubernetes pods — just for SQL",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"A Snowflake warehouse IS a pool of compute resources (EC2 instances) that executes SQL queries. When the query arrives, Snowflake assigns it to available workers. When the query finishes, the workers return to the pool. This IS the SAME pattern as Kubernetes: pods are the compute unit, queries are the jobs, the warehouse IS the node pool. The only difference: Kubernetes runs containers, Snowflake runs SQL. The orchestration pattern is identical."})}),(0,t.jsx)(R.DeeperThought,{title:"Snowflake's search optimization IS a B-tree on steroids — and it's column-specific",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"Snowflake's Search Optimization Service builds persistent data structures (bloom filters + micro-partitions) on column values. When a query has a WHERE clause, the service prunes micro-partitions that can't contain matching rows — like a B-tree but at the partition level. This IS the SAME pruning that Delta Lake's Z-ORDER does — but maintained continuously (not on-demand). The pattern (data skipping via metadata) stays; the implementation (Snowflake SOS vs Delta Z-ORDER vs BigQuery clustering) changes."})}),(0,t.jsx)(R.DeeperThought,{title:"Snowflake's time travel IS copy-on-write for databases — and it's free",connectedTo:"ADR-013 (Delta Lake)",children:(0,t.jsx)("p",{children:"Snowflake's Time Travel (query historical data as of a past timestamp) works because S3 is immutable — every UPDATE creates a new micro-partition, and the old one is kept for the retention period. This IS copy-on-write (COW) — the SAME pattern that BTRFS, ZFS, and Git use. The old data ISN'T copied — the new data is written to a new location, and the old location is preserved. Time Travel IS COW for databases. The 90-day retention is free because the cost is just S3 storage (cheap). The math (COW) stays; the application (filesystem vs database vs version control) changes."})})]}),(0,t.jsx)(a.ResearchDemo,{pageId:"snowflake"}),(0,t.jsx)(i.TrendAnticipation,{pageId:"snowflake"}),(0,t.jsx)(r.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"dbt",reason:"Continue to dbt — see also from this page"},{id:"tableau",reason:"Continue to tableau — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(s.default,{href:(0,d.hrefFor)("dbt"),className:"text-sm text-primary hover:underline",children:"→ Continue to dbt & dimensional modelling"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,d.hrefFor)("tableau"),className:"text-sm text-primary hover:underline",children:"→ or jump to Tableau & analytics"})]})]})}e.s(["SnowflakePage",()=>j])}]);