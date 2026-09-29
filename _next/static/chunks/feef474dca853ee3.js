(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var t=e.i(843476),s=e.i(271645),r=e.i(487486),a=e.i(519455),i=e.i(716675),n=e.i(194058),o=e.i(862824),d=e.i(344396),l=e.i(178583),c=e.i(778917),m=e.i(283086),u=e.i(972520),h=e.i(217923),p=e.i(522016),g=e.i(901752);function x({pageId:e}){let s=(0,d.researchForPage)(e);return 0===s.length?null:(0,t.jsxs)(o.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,t.jsx)(l.FileText,{className:"h-5 w-5"}),badge:`${s.length} paper${1===s.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[s.map((e,s)=>(0,t.jsx)(f,{entry:e},s)),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[s.length," paper",1===s.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function f({entry:e}){let[o,d]=(0,s.useState)(!1),[l,x]=(0,s.useState)(null);return(0,t.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,t.jsx)(r.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,t.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,t.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,t.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,t.jsxs)(a.Button,{variant:"outline",size:"sm",onClick:()=>d(!o),className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(m.Sparkles,{className:"h-3 w-3"}),o?"Hide expected code":"Show expected code + visualization"]}),o&&(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(i.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let t=e.indexOf("{"),s=e.lastIndexOf("}");if(t>=0&&s>t){let r=e.substring(t,s+1);x(JSON.parse(r))}}catch{}},hideTextOutput:!!l,compact:!0}),l?(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(h.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,t.jsx)(n.AnalysisChart,{data:l,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,t.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,t.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,t.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,t.jsxs)(p.default,{href:(0,g.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,t.jsx)(u.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>x])},640524,e=>{"use strict";var t=e.i(808554);e.s(["Workflow",()=>t.default])},703615,e=>{"use strict";var t=e.i(469205);e.s(["TestTube",()=>t.default])},109964,e=>{"use strict";var t=e.i(93393);e.s(["GitCommit",()=>t.default])},644237,e=>{"use strict";var t=e.i(843476),s=e.i(522016),r=e.i(342046),a=e.i(862824),i=e.i(122836),n=e.i(921371),o=e.i(580296),d=e.i(90441),l=e.i(901752),c=e.i(487486),m=e.i(955716),u=e.i(852008),h=e.i(703615),p=e.i(178583),g=e.i(640524),x=e.i(658041),f=e.i(217923),b=e.i(109964),_=e.i(332017),y=e.i(509694),v=e.i(475225),j=e.i(872526),S=e.i(785183),w=e.i(93230),C=e.i(731195),T=e.i(234239),N=e.i(322787);let k=`version: 2

models:
  - name: fct_orders
    description: |
      One row per order placed by a customer. The canonical
      revenue grain for the whole company. Sourced from
      stg_shopify__orders + stg_pos__orders, conformed in
      silver_orders, exposed as a Gold mart.
    columns:
      - name: order_id
        description: Surrogate business key
        tests:
          - not_null
          - unique
          - relationships:
              to: ref('stg_shopify__orders')
              field: order_id
      - name: customer_sk
        tests:
          - not_null
          - relationships:
              to: ref('dim_customer')
              field: customer_sk
      - name: order_total
        description: Net order value in customer currency
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 50000
      - name: order_ts
        tests:
          - not_null
          - dbt_expectations.expect_row_values_to_be_recent:
              datepart: day
              interval: 1
        meta:
          freshness_sla: 30
      - name: region_code
        meta:
          pii: false
          rls_context: current_region
    meta:
      owner: data_platform
      sla_minutes: 9
      gold_tier: true
    config:
      materialized: incremental
      incremental_strategy: merge
      unique_key: order_id
      cluster_by: [order_date_sk, customer_sk]
      tags: [gold, bi_serving]
`,E=`-- ============================================================
-- dim_customer.sql — SCD2 snapshot via dbt snapshots
-- ============================================================
{{ config(
    materialized = 'incremental',
    incremental_strategy = 'merge',
    unique_key = 'customer_sk',
    cluster_by = ['customer_id', 'valid_from'],
    tags = ['gold','dim','scd2']
) }}

WITH src AS (
  SELECT * FROM {{ ref('silver_customer') }}
),

changes AS (
  -- detect attributes that should trigger SCD2 history
  SELECT
    customer_id,
    customer_email_hash,
    full_name,
    segment,
    region_code,
    loyalty_tier,
    is_active,
    loaded_at
  FROM src
  {% if is_incremental() %}
  WHERE loaded_at > (SELECT MAX(valid_from) FROM {{ this }})
  {% endif %}
),

ranked AS (
  SELECT
    changes.*,
    LAG(segment)        OVER (PARTITION BY customer_id ORDER BY loaded_at) AS prev_segment,
    LAG(loyalty_tier)  OVER (PARTITION BY customer_id ORDER BY loaded_at) AS prev_tier
  FROM changes
),

scd2 AS (
  SELECT
    {{ dbt_utils.generate_surrogate_key(['customer_id','loaded_at']) }} AS customer_sk,
    customer_id,
    customer_email_hash,
    full_name,
    segment,
    region_code,
    loyalty_tier,
    is_active,
    loaded_at AS valid_from,
    LEAD(loaded_at) OVER (
      PARTITION BY customer_id ORDER BY loaded_at
    ) AS valid_to
  FROM ranked
  WHERE COALESCE(segment,'')      <> COALESCE(prev_segment,'')
     OR COALESCE(loyalty_tier,'') <> COALESCE(prev_tier,'')
)

SELECT * FROM scd2
`,I=`version: 2

semantic_models:
  - name: orders
    model: ref('fct_orders')
    description: Order revenue grain

    entities:
      - name: order
        type: primary
        expr: order_id
      - name: customer
        type: foreign
        expr: customer_sk
      - name: store
        type: foreign
        expr: store_sk

    dimensions:
      - name: order_date
        type: time
        type_params:
          time_granularity: day
      - name: fiscal_quarter
        type: categorical
        expr: fiscal_quarter
      - name: region_code
        type: categorical
        type_params:
          primary: true  # drives Tableau RLS context

    measures:
      - name: revenue_gbp
        agg: sum
        expr: order_net_amount_gbp
        create_metric: true
      - name: order_count
        agg: count_distinct
        expr: order_id
      - name: avg_order_value
        agg: average
        expr: order_net_amount_gbp

metrics:
  - name: revenue_gbp
    label: Revenue (GBP)
    description: Total net revenue in GBP
    type: simple
    type_params:
      measure: revenue_gbp
    default_layer: bicep

  - name: repeat_purchase_rate
    label: Repeat purchase rate
    type: derived
    type_params:
      expr: SAFE_DIVIDE(repeat_customers, total_customers)
      measures:
        repeat_customers:
          aggregate: count_distinct
          filter: "order_rank > 1"
`,R=`# .github/workflows/dbt-ci.yml
name: dbt CI (slim + state-aware)
on:
  pull_request:
    paths: ["transform/dbt/**"]
permissions:
  id-token: write
  contents: read

jobs:
  dbt_ci:
    runs-on: ubuntu-latest
    env:
      DBT_PROFILES_DIR: transform/dbt
      DBT_STATE_BUCKET: s3://moderndatascieng-dbt-state
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Configure AWS OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/gha-dbt
          aws-region: eu-west-1

      - name: Setup Python
        uses: actions/setup-python@v5
        with: { python-version: '3.11' }

      - name: Install dbt + deps
        run: |
          pip install dbt-snowflake==1.7.0 dbt-metricflow
          cd transform/dbt && dbt deps

      - name: Pull previous state artefact (slim CI)
        run: aws s3 cp \${DBT_STATE_BUCKET}/manifest.json ./target/manifest.json

      - name: dbt build (modified + downstream)
        run: |
          cd transform/dbt
          dbt build \\
            --target dev \\
            --state ./target \\
            --select state:modified+ \\
            --defer --state ./target

      - name: dbt test
        if: always()
        run: cd transform/dbt && dbt test --select state:modified+

      - name: Generate docs + upload manifest
        if: always()
        run: |
          cd transform/dbt
          dbt docs generate
          aws s3 cp target/manifest.json \${DBT_STATE_BUCKET}/manifest.json
`,A=d.DBT_LAYERS.map(e=>({layer:e.layer,count:e.count,fill:e.colour})),D=`                    ┌─────────────┐
                    │  sources     │  (14 systems)
                    │  shopify \xb7 sfdc \xb7 netsuite \xb7 snowplow \xb7 ...
                    └──────┬───────┘
                           │
                  ┌────────▼────────┐
                  │   staging (92)   │   type-cast, renamed, lightly cleaned
                  └────────┬────────┘
                           │
                  ┌────────▼────────┐
                  │ intermediate (78) │   joins, conformance, dedup
                  └────────┬────────┘
                           │
                ┌──────────┴───────────┐
                ▼                      ▼
        ┌──────────────┐       ┌──────────────┐
        │  marts (96)   │       │ snapshots(12)│  ← SCD2 customer / product
        │ fct_orders     │       └──────────────┘
        │ dim_customer   │
        │ fct_returns    │
        │ fct_inventory  │
        └──────┬────────┘
               │
       ┌───────▼─────────┐
       │  serving (46)   │   BI views, semantic entities
       │ fct_orders_serving
       │ dim_customer_serving
       └──────┬──────────┘
              │
       ┌──────▼─────────┐
       │ exposures (38) │   Tableau dashboards + Hightouch syncs
       └────────────────┘
`;function B(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(a.PageHeader,{eyebrow:"Transformation layer",title:"dbt & dimensional modelling",description:"The dbt project is the heart of the platform's single-source-of-truth promise. 312 models across staging → intermediate → marts → serving, with 1,184 tests, SCD2 snapshots, a MetricFlow semantic layer, slim CI and full docs.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(b.GitCommit,{className:"h-3 w-3"})," Slim CI"]}),(0,t.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(g.Workflow,{className:"h-3 w-3"})," SCD2"]})]})}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3",children:[(0,t.jsx)(a.KpiCard,{label:"Models",value:String(d.DBT_PROJECT.models),hint:"staging→serving"}),(0,t.jsx)(a.KpiCard,{label:"Tests",value:String(d.DBT_PROJECT.tests),hint:"8.4 per model avg"}),(0,t.jsx)(a.KpiCard,{label:"Sources",value:String(d.DBT_PROJECT.sources),hint:"14 systems"}),(0,t.jsx)(a.KpiCard,{label:"Snapshots",value:String(d.DBT_PROJECT.snapshots),hint:"SCD2 history"}),(0,t.jsx)(a.KpiCard,{label:"Macros",value:String(d.DBT_PROJECT.macros),hint:"reusable logic"}),(0,t.jsx)(a.KpiCard,{label:"Exposures",value:String(d.DBT_PROJECT.exposures),hint:"BI + rETL"}),(0,t.jsx)(a.KpiCard,{label:"Docs coverage",value:d.DBT_PROJECT.docsCoverage,hint:"auto-generated"}),(0,t.jsx)(a.KpiCard,{label:"CI runtime",value:d.DBT_PROJECT.ciMinutesPerRun,hint:"slim + state-aware"})]}),(0,t.jsxs)("div",{className:"grid lg:grid-cols-2 gap-4",children:[(0,t.jsx)(a.SectionCard,{title:"Model breakdown by layer",description:"Each layer has one responsibility. Models are prohibited from skipping layers (enforced by a CI lint rule).",icon:(0,t.jsx)(u.Layers,{className:"h-5 w-5"}),children:(0,t.jsx)("div",{className:"h-56",children:(0,t.jsx)(C.ResponsiveContainer,{width:"100%",height:"100%",children:(0,t.jsxs)(y.BarChart,{data:A,layout:"vertical",margin:{top:5,right:20,left:30,bottom:5},children:[(0,t.jsx)(j.CartesianGrid,{strokeDasharray:"3 3",stroke:"oklch(0.85 0 0 / 0.3)"}),(0,t.jsx)(S.XAxis,{type:"number",tick:{fontSize:11},stroke:"oklch(0.5 0 0)"}),(0,t.jsx)(w.YAxis,{type:"category",dataKey:"layer",tick:{fontSize:11},stroke:"oklch(0.5 0 0)",width:80}),(0,t.jsx)(T.Tooltip,{cursor:{fill:"oklch(0.85 0 0 / 0.1)"},contentStyle:{background:"var(--popover)",border:"1px solid var(--border)",borderRadius:6,fontSize:12}}),(0,t.jsx)(v.Bar,{dataKey:"count",radius:[0,4,4,0],children:A.map((e,s)=>(0,t.jsx)(N.Cell,{fill:e.fill},s))})]})})})}),(0,t.jsx)(a.SectionCard,{title:"Lineage DAG",description:"Sources flow up to exposures. dbt docs renders an interactive graph; the structure below is the canonical shape.",icon:(0,t.jsx)(m.GitBranch,{className:"h-5 w-5"}),children:(0,t.jsx)(i.CodeBlock,{code:D,language:"text",filename:"lineage.txt"})})]}),(0,t.jsx)(a.SectionCard,{title:"Layer responsibilities",description:"Hard conventions enforced via CI lint rules + CODEOWNERS per folder.",icon:(0,t.jsx)(g.Workflow,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border/60",children:d.DBT_LAYERS.map(e=>(0,t.jsxs)("div",{className:"p-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("span",{className:"h-2.5 w-2.5 rounded-sm",style:{background:e.colour}}),(0,t.jsx)("p",{className:"font-mono text-sm font-semibold",children:e.layer}),(0,t.jsxs)(c.Badge,{variant:"outline",className:"ml-auto text-[10px]",children:[e.count," models"]})]}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-2",children:e.desc})]},e.layer))})}),(0,t.jsxs)("div",{className:"grid lg:grid-cols-2 gap-4",children:[(0,t.jsx)(a.SectionCard,{title:"dim_customer — SCD2 snapshot strategy",description:"Customer segment and loyalty tier changes trigger a new dimension row. Surrogate key generated via `dbt_utils.generate_surrogate_key` so downstream facts stay point-in-time correct.",icon:(0,t.jsx)(x.Database,{className:"h-5 w-5"}),children:(0,t.jsx)(i.CodeBlock,{code:E,language:"sql",filename:"dim_customer.sql",highlight:[12,13,14,15,16,17,30,31,32,33,34,35,36,37,38,39]})}),(0,t.jsx)(a.SectionCard,{title:"fct_orders — model + tests (YAML)",description:"Every model has a YAML entry: not_null + unique + relationships + freshness + RLS context. CI fails the PR if a model has zero tests.",icon:(0,t.jsx)(h.TestTube,{className:"h-5 w-5"}),children:(0,t.jsx)(i.CodeBlock,{code:k,language:"yaml",filename:"models/marts/fct_orders.yml",highlight:[9,10,11,12,13,14,15,16,17,18,19,20,21,26,27,28,29]})})]}),(0,t.jsxs)(a.SectionCard,{title:"Semantic layer (MetricFlow)",description:"Measures, dimensions, entities and derived metrics are defined once in YAML. Both Tableau and Hightouch read from this layer — no parallel metric definitions can drift.",icon:(0,t.jsx)(f.BarChart3,{className:"h-5 w-5"}),children:[(0,t.jsx)(i.CodeBlock,{code:I,language:"yaml",filename:"semantic_models/orders.yml",highlight:[7,8,9,10,11,12,13,14,22,23,24,25,26,27,33,34,35,36,37,38]}),(0,t.jsxs)("div",{className:"mt-4 grid md:grid-cols-3 gap-3 text-sm",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"Entities"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"Primary / foreign key graph enables joins across marts without hand-written SQL."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"Measures"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"Aggregations are computed once at the grain of the underlying fact table."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"Derived metrics"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"Repeat purchase rate, AOV growth etc. — composed in YAML, not in BI tools."})]})]})]}),(0,t.jsx)(a.SectionCard,{title:"dbt slim CI workflow (GitHub Actions)",description:"State-aware `dbt build --select state:modified+` runs only changed models and downstream. Cuts CI runtime from 14m to ~4m on a typical PR.",icon:(0,t.jsx)(b.GitCommit,{className:"h-5 w-5"}),children:(0,t.jsx)(i.CodeBlock,{code:R,language:"yaml",filename:".github/workflows/dbt-ci.yml",highlight:[14,15,16,17,38,39,40,41,42,43,44]})}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-4",children:[(0,t.jsx)(a.SectionCard,{title:"dbt docs",icon:(0,t.jsx)(p.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• Auto-generated site: docs.moderndatascieng.data"}),(0,t.jsx)("li",{children:"• 94% model description coverage"}),(0,t.jsx)("li",{children:"• Search by column, metric, source"}),(0,t.jsx)("li",{children:"• Stakeholder-facing pages per exposure"})]})}),(0,t.jsx)(a.SectionCard,{title:"Testing strategy",icon:(0,t.jsx)(h.TestTube,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• 1,184 tests, 8.4 per model average"}),(0,t.jsx)("li",{children:"• Generic tests: not_null, unique, relationships"}),(0,t.jsx)("li",{children:"• dbt_utils + dbt_expectations packages"}),(0,t.jsx)("li",{children:"• Custom SQL-based tests for business rules"})]})}),(0,t.jsx)(a.SectionCard,{title:"Promotion flow",icon:(0,t.jsx)(b.GitCommit,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)(i.InlineCode,{children:"dev"})," → slim CI on PR"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)(i.InlineCode,{children:"staging"})," → full run nightly"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)(i.InlineCode,{children:"prod"})," → manual approval + dbt build --target prod"]}),(0,t.jsx)("li",{children:"• Manifest uploaded to S3 for state-aware next run"})]})})]}),(0,t.jsxs)(_.DeeperThoughtSection,{pageTitle:"Dbt",children:[(0,t.jsx)(_.DeeperThought,{title:"dbt IS the transformation layer — and it's SQL all the way down",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"dbt doesn't invent a new language — it uses SQL. The .sql files ARE the transformation logic. The YAML files ARE the tests. The manifest.json IS the lineage. dbt IS the answer to 'how do you version-control your data transformations?' — by making them SQL files in a Git repo. The pattern (SQL + tests + lineage in Git) IS the same as application code (Python + tests + CI in Git). dbt IS Git for data transformations."})}),(0,t.jsx)(_.DeeperThought,{title:"dbt tests ARE assertions — and they prevent the 'wrong data' bug",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"dbt tests (not_null, unique, accepted_values, relationships) ARE assertions about data quality. They're the data equivalent of unit tests in software. A not_null test on user_id IS like a type check: if user_id is null, the test fails, the pipeline stops. This prevents the 'wrong data in the dashboard' bug that costs data teams 20% of their time. The pattern (assertions + CI) IS the same as software testing — just for data instead of code."})}),(0,t.jsx)(_.DeeperThought,{title:"The Medallion architecture (Bronze→Silver→Gold) IS progressive disclosure for data",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"The Medallion pattern (Bronze = raw, Silver = cleaned, Gold = business-aligned) IS the fold pattern applied to data. Bronze IS the 'brief' — raw data, immediately available. Silver IS the 'production patterns' — cleaned, conformed, tested. Gold IS the 'deeper thought' — business-aligned marts that serve specific use cases. Each layer adds value without rewriting the previous. Progressive disclosure for data = Medallion for code."})}),(0,t.jsx)(_.DeeperThought,{title:"dbt's ref() function IS the dependency graph — same as Make",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"dbt's ref('model_name') resolves at compile time to the actual table/view name — and it tracks dependencies. If model B refs model A, dbt knows to run A before B. This IS the SAME pattern as Make's dependency resolution (Makefile: target depends on source). The DAG (directed acyclic graph) of dbt models IS a Makefile for data. The math (topological sort) IS the same. dbt IS Make for SQL."})}),(0,t.jsx)(_.DeeperThought,{title:"dbt + Great Expectations IS typed data — and types win",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"dbt tests + Great Expectations suites ARE the type system for data. A column with not_null + unique + accepted_values IS a typed column. A column without tests IS an untyped column (any value accepted). The typed vs untyped debate IS the SAME as TypeScript vs JavaScript: types catch errors early, enable better tooling, and prevent the 'wrong format' bug. dbt + GE IS TypeScript for data pipelines."})})]}),(0,t.jsx)(n.ResearchDemo,{pageId:"dbt"}),(0,t.jsx)(o.TrendAnticipation,{pageId:"dbt"}),(0,t.jsx)(r.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"tableau",reason:"Continue to tableau — see also from this page"},{id:"orchestration",reason:"Continue to orchestration — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(s.default,{href:(0,l.hrefFor)("tableau"),className:"text-sm text-primary hover:underline",children:"→ Continue to Tableau & analytics"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,l.hrefFor)("orchestration"),className:"text-sm text-primary hover:underline",children:"→ or jump to Orchestration"})]})]})}e.s(["DbtPage",()=>B])}]);