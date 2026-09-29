(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(487486),r=e.i(519455),i=e.i(716675),n=e.i(194058),l=e.i(862824),o=e.i(344396),d=e.i(178583),c=e.i(778917),h=e.i(283086),u=e.i(972520),p=e.i(217923),m=e.i(522016),x=e.i(901752);function g({pageId:e}){let a=(0,o.researchForPage)(e);return 0===a.length?null:(0,t.jsxs)(l.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,t.jsx)(d.FileText,{className:"h-5 w-5"}),badge:`${a.length} paper${1===a.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[a.map((e,a)=>(0,t.jsx)(f,{entry:e},a)),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[a.length," paper",1===a.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function f({entry:e}){let[l,o]=(0,a.useState)(!1),[d,g]=(0,a.useState)(null);return(0,t.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,t.jsx)(s.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,t.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,t.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,t.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,t.jsxs)(r.Button,{variant:"outline",size:"sm",onClick:()=>o(!l),className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(h.Sparkles,{className:"h-3 w-3"}),l?"Hide expected code":"Show expected code + visualization"]}),l&&(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(i.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let t=e.indexOf("{"),a=e.lastIndexOf("}");if(t>=0&&a>t){let s=e.substring(t,a+1);g(JSON.parse(s))}}catch{}},hideTextOutput:!!d,compact:!0}),d?(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(p.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,t.jsx)(n.AnalysisChart,{data:d,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,t.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,t.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,t.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,t.jsxs)(m.default,{href:(0,x.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,t.jsx)(u.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>g])},878894,e=>{"use strict";var t=e.i(582458);e.s(["AlertTriangle",()=>t.default])},270756,e=>{"use strict";var t=e.i(517302);e.s(["Lock",()=>t.default])},794827,e=>{"use strict";var t=e.i(251485);e.s(["Gauge",()=>t.default])},834161,e=>{"use strict";var t=e.i(181692);e.s(["Key",()=>t.default])},327534,e=>{"use strict";var t=e.i(843476),a=e.i(522016),s=e.i(342046),r=e.i(921371),i=e.i(580296),n=e.i(862824),l=e.i(122836),o=e.i(90441),d=e.i(901752),c=e.i(487486),h=e.i(716675),u=e.i(868054),p=e.i(332017),m=e.i(581418),x=e.i(21218),g=e.i(834161),f=e.i(878894),v=e.i(794827),y=e.i(270756),b=e.i(78094),j=e.i(955716);let _=`-- ============================================================
-- Unity Catalogue — apply PII tags + RBAC
-- Managed via Terraform / schemachange
-- ============================================================
CREATE CATALOG IF NOT EXISTS moderndatascieng_govern;

-- Tag-based PII classification (consumed by BI + Hightouch + ML)
CREATE TAG IF NOT EXISTS pii;
CREATE TAG IF NOT EXISTS pii.email;
CREATE TAG IF NOT EXISTS pii.phone;
CREATE TAG IF NOT EXISTS pii.finance;

-- Apply tags to columns
ALTER TABLE catalog.moderndatascieng_gold.sales.dim_customer
  ALTER COLUMN customer_email_hash SET TAG ('pii' = 'true', 'pii.email' = 'true');

ALTER TABLE catalog.moderndatascieng_gold.sales.fct_orders
  ALTER COLUMN order_net_amount_gbp SET TAG ('pii.finance' = 'true');

-- Dynamic view redaction for sensitive columns
CREATE OR REPLACE VIEW catalog.moderndatascieng_gold.sales.dim_customer_masked AS
SELECT
  customer_sk,
  customer_id,
  CASE
    WHEN is_member('PII_READER') THEN customer_email_hash
    ELSE CONCAT(LEFT(customer_email_hash, 6), '****')          -- masked for non-PII roles
  END AS customer_email_hash,
  full_name,
  segment,
  region_code,
  loyalty_tier,
  is_active
FROM catalog.moderndatascieng_gold.sales.dim_customer;

-- Grant access — group-scoped, role-inherited
GRANT USE CATALOG  ON CATALOG moderndatascieng_gold              TO GROUP analysts_uk;
GRANT USE SCHEMA   ON SCHEMA moderndatascieng_gold.sales          TO GROUP analysts_uk;
GRANT SELECT       ON VIEW  dim_customer_masked           TO GROUP analysts_uk;

-- Audit log to Datadog via S3 event log
CREATE EXTERNAL LOCATION IF NOT EXISTS bronze_raw
  URL 's3://moderndatascieng-bronze/'
  WITH (CREDENTIAL \`azure_service_principal\`);
`,N=`# OpenLineage event — emitted by dbt on every run
# Picked up by Marquez + Monte Carlo for end-to-end lineage
apiVersion: openlineage.io/v1
event:
  eventType: COMPLETE
  runId: "run-7c2f1a9c-..."
  job:
    namespace: moderndatascieng
    name: dbt.fct_orders
    facets:
      sql:
        query: "SELECT * FROM silver_orders JOIN dim_customer ..."
      dataSource:
        name: snowflake
        uri: moderndatascieng_prod
  inputs:
    - namespace: moderndatascieng
      name: catalog.moderndatascieng_silver.sales.silver_orders
      facets:
        schema:
          fields: [{name: order_id, type: varchar}, {name: customer_sk, type: varchar}]
  outputs:
    - namespace: moderndatascieng
      name: catalog.moderndatascieng_gold.sales.fct_orders
      facets:
        schema:
          fields: [{name: order_id, type: varchar}, {name: order_total, type: number}]
        dataQuality:
          rowCount: 11823049
          metrics:
            - name: not_null_order_id
              passed: true
            - name: unique_order_id
              passed: true
`,T=`# Monte Carlo monitor — freshness + volume + schema drift
monitors:
  - name: fct_orders_freshness
    type: freshness
    table: catalog.moderndatascieng_gold.sales.fct_orders
    rule: less_than
    threshold_minutes: 30
    severity: critical
    notification: pagerduty:data-platform

  - name: silver_customer_volume_anomaly
    type: volume
    table: catalog.moderndatascieng_silver.sales.silver_customer
    rule: relative_change
    baseline: 7day_rolling_avg
    threshold_pct: -25          # > 25% drop → alert
    severity: warning
    notification: slack:#data-platform

  - name: dim_product_schema_drift
    type: schema
    table: catalog.moderndatascieng_gold.sales.dim_product
    rule: any_change
    severity: info
    notification: github:schema-registry-pr

  - name: fct_orders_dq_breach
    type: custom_sql
    sql: "SELECT count(*) FROM fct_orders WHERE order_total < 0"
    rule: greater_than
    threshold: 0
    severity: critical
    notification: pagerduty:data-platform
`;function w(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(n.PageHeader,{eyebrow:"Governance · DQ · Lineage · Observability",title:"Unity Catalogue + Monte Carlo + OpenLineage",description:"The platform treats governance as a first-class engineering concern, not a compliance afterthought. Unity Catalogue provides column-level RBAC + PII tagging; Monte Carlo detects freshness / volume / schema anomalies; OpenLineage ties it all together end-to-end.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(m.ShieldCheck,{className:"h-3 w-3"})," SOC2 · GDPR"]}),(0,t.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(y.Lock,{className:"h-3 w-3"})," PII tagged"]})]})}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:[(0,t.jsx)(n.KpiCard,{label:"Trust score",value:"98.4 / 100",delta:"+4.2pts",deltaTone:"up",hint:"DQ + observability"}),(0,t.jsx)(n.KpiCard,{label:"DQ rules",value:"1,184",delta:"8.4 / model",deltaTone:"up",hint:"dbt + GE"}),(0,t.jsx)(n.KpiCard,{label:"PII columns tagged",value:"2,140",delta:"100% coverage",deltaTone:"up",hint:"Unity Catalogue"}),(0,t.jsx)(n.KpiCard,{label:"Anomalies caught (30d)",value:"11",hint:"auto-quarantined"})]}),(0,t.jsx)(n.SectionCard,{title:"Unity Catalogue — RBAC grants",description:"Every catalog grant is Terraform-managed. Group membership syncs from Azure AD via SCIM.",icon:(0,t.jsx)(g.Key,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Principal"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Object"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Grants"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Type"})]})}),(0,t.jsx)("tbody",{children:o.UNITY_GRANTS.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0",children:[(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs",children:e.principal}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs",children:e.object}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs",children:e.grants}),(0,t.jsx)("td",{className:"px-4 py-2.5",children:(0,t.jsx)(c.Badge,{variant:"outline",className:"text-[10px]",children:e.type})})]},e.principal+e.object))})]})})}),(0,t.jsx)(n.SectionCard,{title:"Unity Catalogue — PII tags + dynamic view redaction",description:"PII is tagged, then surfaced via a `_masked` view that conditionally reveals columns based on the current role. The same tags drive Hightouch masking and Tableau access.",icon:(0,t.jsx)(m.ShieldCheck,{className:"h-5 w-5"}),children:(0,t.jsx)(l.CodeBlock,{code:_,language:"sql",filename:"unity_catalog.sql",highlight:[8,9,10,11,14,15,20,21,22,23,24,25,26,27,28,38,39]})}),(0,t.jsx)(n.SectionCard,{title:"Data quality rules — fct_orders + dim_customer",description:"Rules span not_null, unique, relationships, accepted_range, freshness, regex and business-rule checks. CI fails the PR if any new model has zero tests.",icon:(0,t.jsx)(v.Gauge,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Table"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Rule"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Severity"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Coverage"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Result"})]})}),(0,t.jsx)("tbody",{children:o.DQ_RULES.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0",children:[(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs",children:e.table}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs",children:e.rule}),(0,t.jsx)("td",{className:"px-4 py-2.5",children:(0,t.jsx)(c.Badge,{variant:"error"===e.severity?"default":"outline",className:(e.severity,"gap-1 text-[10px]"),children:e.severity})}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs",children:e.coverage}),(0,t.jsx)("td",{className:"px-4 py-2.5",children:(0,t.jsx)(c.Badge,{variant:"Pass"===e.result?"default":"destructive",className:"text-[10px] gap-1",children:e.result})})]},e.rule))})]})})}),(0,t.jsx)(n.SectionCard,{title:"Observability signals (last 24h — synthetic)",description:"Freshness breaches, schema drift, volume anomalies and DQ breaches flow into Datadog. Critical signals auto-quarantine the affected table and page on-call.",icon:(0,t.jsx)(x.Activity,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"divide-y divide-border/60",children:o.OBSERVABILITY.map(e=>(0,t.jsx)("div",{className:"px-4 py-3",children:(0,t.jsxs)("div",{className:"flex items-start gap-3",children:[(0,t.jsx)("div",{className:["mt-1 h-2 w-2 rounded-full shrink-0","critical"===e.severity?"bg-rose-500":"warning"===e.severity?"bg-amber-500":"bg-emerald-500"].join(" ")}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-medium",children:e.signal}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground mt-0.5",children:[(0,t.jsx)("span",{className:"font-mono",children:e.layer})," · ",e.detected," → ",(0,t.jsx)("span",{className:"font-medium",children:e.action})]})]}),(0,t.jsx)(c.Badge,{variant:"outline",className:"text-[10px]",children:e.severity})]})},e.signal))})}),(0,t.jsx)(n.SectionCard,{title:"OpenLineage event (emitted by dbt on every run)",description:"Lineage is captured at the column level. Every dbt run, Airflow task, and Spark job emits a lineage event consumed by Marquez + Monte Carlo.",icon:(0,t.jsx)(b.Network,{className:"h-5 w-5"}),children:(0,t.jsx)(l.CodeBlock,{code:N,language:"yaml",filename:"openlineage_event.yml",highlight:[10,11,12,13,14,17,18,19,23,24,25,26,27]})}),(0,t.jsx)(n.SectionCard,{title:"Monte Carlo monitors (YAML-defined)",description:"Monitors are versioned in Git, applied via Terraform. Severity → notification routing is declared, not coded.",icon:(0,t.jsx)(f.AlertTriangle,{className:"h-5 w-5"}),children:(0,t.jsx)(l.CodeBlock,{code:T,language:"yaml",filename:"monitors.yml",highlight:[5,6,7,8,9,10,14,15,16,17,18,23,24,25,26,27,28]})}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-4",children:[(0,t.jsx)(n.SectionCard,{title:"Access & security",icon:(0,t.jsx)(y.Lock,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• SSO via Azure AD → SCIM into Snowflake + Databricks"}),(0,t.jsx)("li",{children:"• MFA enforced for all human users"}),(0,t.jsx)("li",{children:"• Service users via OIDC + workload identity (no shared secrets)"}),(0,t.jsx)("li",{children:"• Immuta for policy-as-code masking rules"}),(0,t.jsx)("li",{children:"• All access audited, logs to Datadog 90d"})]})}),(0,t.jsx)(n.SectionCard,{title:"Lineage",icon:(0,t.jsx)(j.GitBranch,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• OpenLineage events from dbt, Airflow, Spark, Fivetran"}),(0,t.jsx)("li",{children:"• Column-level lineage graph in Marquez UI"}),(0,t.jsx)("li",{children:'• "Who broke this dashboard?" investigation in seconds'}),(0,t.jsx)("li",{children:"• Impact analysis: which Gold tables depend on this Bronze?"}),(0,t.jsx)("li",{children:"• Reverse-ETL lineage: which Tableau sheet drove which Hightouch sync?"})]})}),(0,t.jsx)(n.SectionCard,{title:"Audit & compliance",icon:(0,t.jsx)(m.ShieldCheck,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• SOC2 Type II attested; quarterly access review"}),(0,t.jsx)("li",{children:"• GDPR: right-to-erasure handled via Delta DELETE + VACUUM"}),(0,t.jsx)("li",{children:"• PII data retention: 24 months for customers, 7 years for finance"}),(0,t.jsx)("li",{children:"• DPIA template per new dataset"}),(0,t.jsx)("li",{children:"• Annual external pen-test of the platform"})]})})]}),(0,t.jsx)(n.SectionCard,{title:"Try it: DQ rules validator (Pyodide)",description:"Validates data quality rules against expected patterns + severity + coverage. Pure Python stdlib — runs in browser.",icon:(0,t.jsx)(u.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(h.PyodideRunner,{code:`dq_rules = [
    {"table": "fct_orders", "rule": "not_null(order_id)", "severity": "error", "coverage": "100%"},
    {"table": "fct_orders", "rule": "unique(order_id)", "severity": "error", "coverage": "100%"},
    {"table": "fct_orders", "rule": "accepted_range(order_total > 0)", "severity": "warn", "coverage": "99.98%"},
    {"table": "fct_orders", "rule": "freshness < 30m", "severity": "error", "coverage": "100%"},
    {"table": "dim_customer", "rule": "unique(customer_sk)", "severity": "error", "coverage": "100%"},
    {"table": "dim_customer", "rule": "not_null(email) where is_active", "severity": "error", "coverage": "99.4%"},
]

expected_patterns = {
    "fct_orders": ["not_null", "unique", "accepted_range", "freshness"],
    "dim_customer": ["unique", "not_null"],
}

valid_severities = ["error", "warn", "info"]
known_patterns = ["not_null", "unique", "accepted_range", "freshness", "relationships", "regex"]

issues = []
for rule in dq_rules:
    if rule["severity"] not in valid_severities:
        issues.append(f"\\u26a0 {rule[\u0027table\u0027]}: invalid severity '{rule[\u0027severity\u0027]}'")
    if not rule["coverage"].endswith("%"):
        issues.append(f"\\u26a0 {rule[\u0027table\u0027]}: coverage must end with %")
    pattern_found = any(p in rule["rule"] for p in known_patterns)
    if not pattern_found:
        issues.append(f"\\u26a0 {rule[\u0027table\u0027]}: unknown rule pattern in '{rule[\u0027rule\u0027]}'")

for table, patterns in expected_patterns.items():
    table_rules = [r for r in dq_rules if r["table"] == table]
    found = []
    for r in table_rules:
        for p in patterns:
            if p in r["rule"]: found.append(p)
    missing = set(patterns) - set(found)
    if missing:
        issues.append(f"\\u26a0 {table}: missing expected patterns: {missing}")
    else:
        print(f"\\u2713 {table}: all {len(patterns)} expected patterns present ({len(table_rules)} rules)")

print()
print("=" * 60)
if issues:
    print("DQ RULES VALIDATION ISSUES:")
    for i in issues: print(f"  {i}")
    print(f"\\\\n{len(issues)} issue(s) found.")
else:
    print(f"\\u2713 All {len(dq_rules)} DQ rules validated.")
print("=" * 60)`,buttonLabel:"Run DQ validator (Pyodide)"})}),(0,t.jsxs)(p.DeeperThoughtSection,{pageTitle:"Data Governance & Observability",children:[(0,t.jsx)(p.DeeperThought,{title:"Data Governance & Observability IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Data Governance & Observability is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Data Governance & Observability connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Data Governance & Observability sits in the computational-science landscape."})}),(0,t.jsx)(p.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Data Governance & Observability) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(p.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(p.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(p.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(r.ResearchDemo,{pageId:"governance"}),(0,t.jsx)(i.TrendAnticipation,{pageId:"governance"}),(0,t.jsx)(s.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"cicd",reason:"Continue to cicd — see also from this page"},{id:"home",reason:"Continue to home — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,d.hrefFor)("cicd"),className:"text-sm text-primary hover:underline",children:"→ Continue to CI/CD & DevOps"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,d.hrefFor)("home"),className:"text-sm text-primary hover:underline",children:"→ Back to overview"})]})]})}e.s(["GovernancePage",()=>w])}]);