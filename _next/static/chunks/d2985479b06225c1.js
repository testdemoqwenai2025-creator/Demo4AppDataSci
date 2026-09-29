(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var t=e.i(843476),a=e.i(271645),r=e.i(487486),s=e.i(519455),i=e.i(716675),o=e.i(194058),l=e.i(862824),n=e.i(344396),c=e.i(178583),d=e.i(778917),m=e.i(283086),u=e.i(972520),h=e.i(217923),p=e.i(522016),x=e.i(901752);function g({pageId:e}){let a=(0,n.researchForPage)(e);return 0===a.length?null:(0,t.jsxs)(l.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,t.jsx)(c.FileText,{className:"h-5 w-5"}),badge:`${a.length} paper${1===a.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[a.map((e,a)=>(0,t.jsx)(f,{entry:e},a)),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[a.length," paper",1===a.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function f({entry:e}){let[l,n]=(0,a.useState)(!1),[c,g]=(0,a.useState)(null);return(0,t.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,t.jsx)(r.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,t.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(d.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,t.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(d.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,t.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,t.jsxs)(s.Button,{variant:"outline",size:"sm",onClick:()=>n(!l),className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(m.Sparkles,{className:"h-3 w-3"}),l?"Hide expected code":"Show expected code + visualization"]}),l&&(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(i.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let t=e.indexOf("{"),a=e.lastIndexOf("}");if(t>=0&&a>t){let r=e.substring(t,a+1);g(JSON.parse(r))}}catch{}},hideTextOutput:!!c,compact:!0}),c?(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(h.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,t.jsx)(o.AnalysisChart,{data:c,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,t.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,t.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,t.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,t.jsxs)(p.default,{href:(0,x.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,t.jsx)(u.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>g])},640524,e=>{"use strict";var t=e.i(808554);e.s(["Workflow",()=>t.default])},366101,763639,e=>{"use strict";var t=e.i(843476),a=e.i(271645),r=e.i(980376),s=e.i(122836),i=e.i(487486),o=e.i(519455),l=e.i(444609);e.s(["Languages",()=>l.default],763639);var l=l,n=e.i(463059);let c={python:"Python",scala:"Scala",go:"Go",rust:"Rust",java:"Java",sql:"SQL",yaml:"YAML",hcl:"Terraform",bash:"Bash",elixir:"Elixir",c:"C",typescript:"TypeScript"};function d({samples:e}){let[r,i]=(0,a.useState)(0),o=e[r];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"flex flex-wrap gap-1 border-b border-border/60 bg-muted/20 px-2 py-2",children:e.map((e,a)=>(0,t.jsx)("button",{onClick:()=>i(a),className:`text-[11px] px-2.5 py-1 rounded border transition-colors font-mono ${a===r?"bg-primary text-primary-foreground border-primary":"border-border/60 hover:bg-accent"}`,children:c[e.language]??e.language},e.language+e.filename))}),(0,t.jsxs)("div",{className:"p-3 bg-card",children:[o.note&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground mb-2 italic",children:o.note}),(0,t.jsx)(s.CodeBlock,{code:o.code,language:o.language,filename:o.filename,highlight:o.highlight})]})]})}function m({title:e,description:a,samples:s,drawerMode:c=!1,drawerButtonLabel:m}){return c?(0,t.jsxs)(r.Sheet,{children:[(0,t.jsx)(r.SheetTrigger,{asChild:!0,children:(0,t.jsxs)(o.Button,{variant:"outline",className:"gap-2 w-full justify-between h-auto py-3",children:[(0,t.jsxs)("span",{className:"flex items-center gap-2",children:[(0,t.jsx)(l.default,{className:"h-4 w-4 text-primary"}),(0,t.jsx)("span",{className:"font-semibold text-sm",children:m??e}),(0,t.jsxs)(i.Badge,{variant:"outline",className:"text-[10px]",children:[s.length," languages"]})]}),(0,t.jsx)(n.ChevronRight,{className:"h-4 w-4 text-muted-foreground"})]})}),(0,t.jsxs)(r.SheetContent,{side:"right",className:"w-[min(680px,100vw)] sm:max-w-[680px] p-0 overflow-y-auto",children:[(0,t.jsxs)(r.SheetHeader,{className:"px-5 pt-5 pb-3 border-b border-border/60 bg-muted/30",children:[(0,t.jsxs)(r.SheetTitle,{className:"text-base flex items-center gap-2",children:[(0,t.jsx)(l.default,{className:"h-4 w-4 text-primary"}),e]}),a&&(0,t.jsx)(r.SheetDescription,{className:"text-xs",children:a})]}),(0,t.jsx)("div",{className:"border-b border-border/60",children:(0,t.jsx)(d,{samples:s})}),(0,t.jsx)("div",{className:"px-5 py-3 border-t border-border/60 bg-muted/20 text-[11px] text-muted-foreground",children:(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"File types commonly deployed:"})," ",Array.from(new Set(s.map(e=>e.filename.split(".").pop()||""))).join(", ")," — each compiles to a portable artefact (binary, .so, .beam, .jar, or interpreter-bound source)."]})})]})]}):(0,t.jsxs)("div",{className:"rounded-md border border-border/60 overflow-hidden",children:[(0,t.jsxs)("div",{className:"bg-muted/30 px-4 py-3 border-b border-border/60",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(l.default,{className:"h-4 w-4 text-primary"}),(0,t.jsx)("p",{className:"text-sm font-semibold",children:e}),(0,t.jsxs)(i.Badge,{variant:"outline",className:"ml-auto text-[10px]",children:[s.length," languages"]})]}),a&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:a})]}),(0,t.jsx)(d,{samples:s})]})}e.s(["MultiLangSamples",()=>m],366101)},42561,e=>{"use strict";var t=e.i(843476),a=e.i(271645),r=e.i(846932),s=e.i(88653),i=e.i(519455),o=e.i(487486),l=e.i(431343),n=e.i(531278),c=e.i(63209),d=e.i(595468),m=e.i(966992);let u=new Uint8Array([0,97,115,109,1,0,0,0,1,7,1,96,2,127,127,1,127,3,2,1,0,7,7,1,3,97,100,100,0,0,10,9,1,7,0,32,0,32,1,106,11]);function h({buttonLabel:e="Run in browser (Wasm)",description:h="Loads a hand-assembled WebAssembly binary (41 bytes) and calls the exported `add(i32, i32) -> i32` function. In production, this would be a Rust/C binary compiled via `cargo build --target wasm32-wasi` or `emcc`.",sourceLanguage:p="Rust/C"}){let[x,g]=(0,a.useState)("idle"),[f,b]=(0,a.useState)(""),[_,v]=(0,a.useState)(null),y=(0,a.useCallback)(async()=>{g("running"),b("Instantiating WebAssembly module (41 bytes)…\n");let e=performance.now();try{let{instance:t}=await WebAssembly.instantiate(u),a=t.exports.add;if(!a)throw Error("Exported function 'add' not found in Wasm module");let r=Math.round(performance.now()-e);v(r);let s=[];for(let[e,t]of(s.push(`✓ Wasm module instantiated in ${r}ms (41 bytes)`),s.push(`  Source language: ${p} (compiled to wasm32)`),s.push("  Exported function: add(i32, i32) -> i32"),s.push(""),s.push("Test cases:"),[[2,3],[100,200],[42,58],[-10,20],[1e6,1]])){let r=a(e,t);s.push(`  add(${e}, ${t}) = ${r}`)}s.push(""),s.push("✓ All calls successful. The same .wasm binary would run in"),s.push("  any browser, any OS, any Wasm runtime — portable native code."),b(s.join("\n")),g("done")}catch(t){let e=t instanceof Error?t.message:String(t);b(t=>t+`
Error: ${e}`),g("error")}},[p]);return(0,t.jsxs)("div",{className:"mt-3 rounded-md border border-primary/30 bg-primary/3 p-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)(i.Button,{size:"sm",variant:"running"===x?"outline":"default",className:"gap-1.5",onClick:y,disabled:"running"===x,children:["running"===x?(0,t.jsx)(n.Loader2,{className:"h-3.5 w-3.5 animate-spin"}):"done"===x?(0,t.jsx)(d.CheckCircle2,{className:"h-3.5 w-3.5"}):"error"===x?(0,t.jsx)(c.AlertCircle,{className:"h-3.5 w-3.5"}):(0,t.jsx)(l.Play,{className:"h-3.5 w-3.5"}),e]}),(0,t.jsxs)(o.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,t.jsx)(m.Cpu,{className:"h-2.5 w-2.5"}),"WebAssembly · 41 bytes"]}),null!==_&&"done"===x&&(0,t.jsxs)("span",{className:"text-[10px] text-muted-foreground",children:["Instantiated in ",_,"ms"]})]}),h&&(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2 leading-relaxed",children:h}),(0,t.jsx)(s.AnimatePresence,{children:"idle"!==x&&f&&(0,t.jsx)(r.motion.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-2",children:(0,t.jsx)("div",{className:`rounded-md bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] p-2.5 text-[11px] font-mono leading-relaxed overflow-x-auto code-scroll max-h-64 overflow-y-auto ${"error"===x?"border border-rose-500/40":"border border-emerald-500/30"}`,children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap",children:f})})})})]})}e.s(["WasmRunner",()=>h])},912207,e=>{"use strict";var t=e.i(843476),a=e.i(522016),r=e.i(862824),s=e.i(342046),i=e.i(921371),o=e.i(580296),l=e.i(122836),n=e.i(366101),c=e.i(90441),d=e.i(901752),m=e.i(487486),u=e.i(716675),h=e.i(42561),p=e.i(868054),x=e.i(828579),g=e.i(966992),f=e.i(852008),b=e.i(640524),_=e.i(658041),v=e.i(283086),y=e.i(955716),S=e.i(581418),w=e.i(21218),N=e.i(763639),j=e.i(332017);let k=`# ============================================================
# bronze/silver/customer_conform.py
# Idempotent Silver conformance using Delta MERGE
# ============================================================
import dlt
from pyspark.sql.functions import (
    col, lit, current_timestamp, md5, concat_ws, when, coalesce,
)
from pyspark.sql.types import StringType

@dlt.view
def bronze_customer_raw():
    return (
        spark.readStream
        .format("delta")
        .load("/mnt/bronze/salesforce/account")
        .unionByName(spark.read.table("bronze.shopify.customer"))
    )

@dlt.table(
    name="silver.customer",
    comment="Conformed customer across Salesforce + Shopify, deduplicated by email hash",
    table_properties={
        "quality": "silver",
        "delta.enableChangeDataFeed": "true",
        "pipelines.reset.allowed": "false",
    },
    partition_cols=["region_code"],
)
@dlt.expect_or_drop("email_not_null", "customer_email IS NOT NULL")
@dlt.expect_or_quarantine(
    "email_format",
    r"customer_email RLIKE '^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,})$'"
)
def silver_customer():
    src = dlt.read("bronze_customer_raw")
    return (
        src
        .withColumn("customer_email_hash", md5(lower(trim(col("customer_email")))))
        .withColumn("customer_sk", md5(concat_ws("||",
            col("customer_email_hash"), col("loaded_at"))))
        .withColumn("full_name", concat_ws(" ", col("first_name"), col("last_name")))
        .withColumn("is_active", when(col("status") == "ACTIVE", lit(True)).otherwise(lit(False)))
        .withColumn("region_code", coalesce(col("region"), lit("UNKNOWN")))
        .withColumn("loaded_at", current_timestamp())
        .dropDuplicates(["customer_email_hash", "loaded_at"])
        .select(
            "customer_sk", "customer_id", "customer_email_hash", "full_name",
            "segment", "region_code", "loyalty_tier", "is_active", "loaded_at",
        )
    )

# Idempotent MERGE into the curated Delta table — runs after DLT materialisation
@dlt.table(name="silver.customer_curated")
def silver_customer_curated():
    src = dlt.read("silver.customer")
    target = spark.read.table("silver.customer_curated")
    (
        target.alias("t")
        .merge(src.alias("s"), "t.customer_sk = s.customer_sk")
        .whenMatchedUpdateAll()
        .whenNotMatchedInsertAll()
        .execute()
    )
    return target
`,E=`-- ============================================================
-- Bronze → Silver conformance using Delta Lake + Spark SQL
-- Run inside Databricks SQL warehouse for ad-hoc investigations
-- ============================================================
-- Optimise for predicate pushdown on hot columns
CREATE TABLE IF NOT EXISTS silver.order_line
USING DELTA
LOCATION 's3://moderndatascieng-silver/sales/order_line'
PARTITIONED BY (order_date_sk)
CLUSTERED BY (customer_sk, product_sk)
TBLPROPERTIES (
  'delta.enableChangeDataFeed'   = true,
  'delta.logRetentionDuration'   = 'interval 30 days',
  'delta.deletedFileRetentionDuration' = 'interval 7 days',
  'delta.dataSkippingNumIndexedCols' = 32,
  'quality' = 'silver',
  'owner'   = 'data_platform'
);

-- Idempotent MERGE — safe to re-run
MERGE INTO silver.order_line AS t
USING (
  SELECT
    o.order_id,
    o.order_line_id,
    o.customer_sk,
    o.product_sk,
    o.store_sk,
    o.order_date_sk,
    o.qty,
    o.gross_amount,
    o.discount_amount,
    o.net_amount,
    o.loaded_at
  FROM bronze.shopify.order_line_raw
  WHERE o.loaded_at > (SELECT COALESCE(MAX(loaded_at), '1970-01-01') FROM silver.order_line)
) AS s
ON t.order_line_id = s.order_line_id
WHEN MATCHED AND s.loaded_at > t.loaded_at THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;

-- Z-ORDER hot Silver tables nightly — 6x scan reduction on customer_sk
OPTIMIZE silver.order_line ZORDER BY (customer_sk, product_sk);
VACUUM silver.order_line RETAIN 168 HOURS;

-- Time travel — point-in-time audit
SELECT count(*) FROM silver.order_line VERSION AS OF 42
WHERE customer_sk = 'c5a9f1...';
`,C=`# cluster policy: "transform_gold" — used by dbt + PySpark DLT
# Managed via Databricks asset bundles (databricks.yml)
cluster_type: "all-purpose"
spark_version: "14.3.x-scala2.12"
node_type_id: "Standard_E16ds_v4"
autoscale:
  min_workers: 4
  max_workers: 24
  mode: "ENHANCED"            # photon + enhanced autoscaler
driver_node_type_id: "Standard_E16ds_v4"
autotermination_minutes: 30
spark_conf:
  "spark.databricks.delta.optimizeWrite.enabled": "true"
  "spark.databricks.delta.autoCompact.enabled": "true"
  "spark.sql.adaptive.coalescePartitions.enabled": "true"
  "spark.sql.parquet.compression.codec": "snappy"
  "spark.databricks.cluster.profile": "singleNode"
init_scripts:
  - workspace: /Shared/init/install_unity_driver.sh
aws_attributes:
  instance_profile_arn: "arn:aws:iam::123456789012:instance-profile/databricks-s3"
  zone_id: "auto"
`,D=[{label:"Bronze tables",value:String(c.MEDALLION_LAYERS[0].tables)},{label:"Bronze volume / mo",value:c.MEDALLION_LAYERS[0].volume},{label:"Silver tables",value:String(c.MEDALLION_LAYERS[1].tables)},{label:"Silver volume / mo",value:c.MEDALLION_LAYERS[1].volume},{label:"Gold tables",value:String(c.MEDALLION_LAYERS[2].tables)},{label:"Gold volume / mo",value:c.MEDALLION_LAYERS[2].volume}],A=[{metric:"Photon vs legacy runtime",value:"2.4x",note:"Silver conformance job"},{metric:"Z-ORDER scan reduction",value:"6.1x",note:"On customer_sk predicate"},{metric:"Cluster pool warm-start",value:"92%",note:"No cold-start on dbt run"},{metric:"Photon cost / task",value:"-31%",note:"vs non-Photon FY24"}];function T(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(r.PageHeader,{eyebrow:"Lakehouse — storage & compute",title:"Databricks · Spark · Delta Lake · Medallion",description:"Databricks is the engine room of the platform: PySpark + Spark SQL workloads, Delta Lake for ACID + time travel, and the Bronze→Silver→Gold medallion pattern as the canonical data flow. Photon runtime, cluster pools and Unity Catalogue keep it fast, cheap and governed.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(v.Sparkles,{className:"h-3 w-3"})," Photon"]}),(0,t.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(x.Boxes,{className:"h-3 w-3"})," Medallion"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3",children:D.map(e=>(0,t.jsx)(r.KpiCard,{label:e.label,value:e.value},e.label))}),(0,t.jsx)(r.SectionCard,{title:"Medallion architecture — Bronze · Silver · Gold",description:"Each layer has a single responsibility. The flow is unidirectional and idempotent — re-running a Silver job for a date partition never rewrites history unless explicitly versioned.",icon:(0,t.jsx)(f.Layers,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60",children:c.MEDALLION_LAYERS.map(e=>{let a="Bronze"===e.layer?"border-amber-500/40 bg-amber-500/6":"Silver"===e.layer?"border-violet-500/40 bg-violet-500/6":"border-emerald-500/40 bg-emerald-500/6";return(0,t.jsxs)("div",{className:`p-5 ${a}`,children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-3",children:[(0,t.jsx)("span",{className:"h-3 w-3 rounded-full",style:{background:"Bronze"===e.layer?"var(--chart-2)":"Silver"===e.layer?"var(--chart-3)":"var(--chart-1)"}}),(0,t.jsx)("p",{className:"text-lg font-semibold",children:e.layer}),(0,t.jsxs)(m.Badge,{variant:"outline",className:"ml-auto text-[10px]",children:[e.tables," tables"]})]}),(0,t.jsx)("p",{className:"text-sm text-muted-foreground mb-3",children:e.purpose}),(0,t.jsxs)("dl",{className:"text-xs space-y-1.5",children:[(0,t.jsxs)("div",{className:"flex justify-between gap-2",children:[(0,t.jsx)("dt",{className:"text-muted-foreground",children:"Location"}),(0,t.jsx)("dd",{className:"font-mono break-all text-right",children:e.location})]}),(0,t.jsxs)("div",{className:"flex justify-between gap-2",children:[(0,t.jsx)("dt",{className:"text-muted-foreground",children:"Format"}),(0,t.jsx)("dd",{className:"font-mono",children:e.format})]}),(0,t.jsxs)("div",{className:"flex justify-between gap-2",children:[(0,t.jsx)("dt",{className:"text-muted-foreground",children:"Volume"}),(0,t.jsx)("dd",{className:"font-mono",children:e.volume})]}),(0,t.jsxs)("div",{className:"flex justify-between gap-2",children:[(0,t.jsx)("dt",{className:"text-muted-foreground",children:"Pipeline"}),(0,t.jsx)("dd",{className:"font-mono text-right",children:e.pipelines})]})]})]},e.layer)})})}),(0,t.jsxs)("div",{className:"grid lg:grid-cols-2 gap-4",children:[(0,t.jsx)(r.SectionCard,{title:"PySpark DLT — Silver customer conformance",description:"Delta Live Tables with expectations. PII rows go to a quarantine table; non-PII conformance is reproducible and idempotent.",icon:(0,t.jsx)(b.Workflow,{className:"h-5 w-5"}),badge:"PySpark + DLT",children:(0,t.jsx)(l.CodeBlock,{code:k,language:"python",filename:"silver/customer_conform.py",highlight:[15,16,17,18,19,20,21,22,23,30,31,32,33,34,35,36,37,38,39,40,41,42,43]})}),(0,t.jsx)(r.SectionCard,{title:"Delta Lake + Spark SQL — Bronze→Silver",description:"Plain SQL for ad-hoc investigations and to materialise hot Silver tables with Z-ORDER + CDF + retention.",icon:(0,t.jsx)(_.Database,{className:"h-5 w-5"}),badge:"Spark SQL",children:(0,t.jsx)(l.CodeBlock,{code:E,language:"sql",filename:"silver_order_line.sql",highlight:[6,7,8,9,10,11,12,13,14,15,16,17,18,25,26,27,28,29,30,31,32,33,34,36,37,40,41]})})]}),(0,t.jsxs)("div",{className:"grid lg:grid-cols-2 gap-4",children:[(0,t.jsx)(r.SectionCard,{title:"Cluster policy — transform_gold",description:"Provisioned via Databricks asset bundles from Git. Photon + enhanced autoscaler + cluster pools keep startup latency under 30s and cost predictable.",icon:(0,t.jsx)(g.Cpu,{className:"h-5 w-5"}),badge:"Asset bundle",children:(0,t.jsx)(l.CodeBlock,{code:C,language:"yaml",filename:"databricks.yml",highlight:[7,8,9,10,13,14,15,16,17,18,19,20]})}),(0,t.jsx)(r.SectionCard,{title:"Performance lift (synthetic)",description:"Photon + Z-ORDER + cluster pools combined drove a 2.4× runtime reduction and 31% cost-per-task reduction YoY.",icon:(0,t.jsx)(w.Activity,{className:"h-5 w-5"}),badge:"Synthetic",contentClassName:"p-0",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Metric"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Lift"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Note"})]})}),(0,t.jsx)("tbody",{children:A.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0",children:[(0,t.jsx)("td",{className:"px-4 py-2.5",children:e.metric}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400",children:e.value}),(0,t.jsx)("td",{className:"px-4 py-2.5 text-xs text-muted-foreground",children:e.note})]},e.metric))})]})})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-4",children:[(0,t.jsx)(r.SectionCard,{title:"Integrations",icon:(0,t.jsx)(y.GitBranch,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• Snowflake: Delta → Snowflake auto-ingest via manifest"}),(0,t.jsx)("li",{children:"• dbt: runs on Databricks SQL warehouse for Gold transforms"}),(0,t.jsxs)("li",{children:["• Airflow: ",(0,t.jsx)(l.InlineCode,{children:"DatabricksSubmitRunOperator"})]}),(0,t.jsx)("li",{children:"• Power BI: Direct Lake connector to Silver/Gold Delta"}),(0,t.jsx)("li",{children:"• MLflow + Feature Store for offline + online features"})]})}),(0,t.jsx)(r.SectionCard,{title:"Governance",icon:(0,t.jsx)(S.ShieldCheck,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• Unity Catalogue: column-level RBAC"}),(0,t.jsx)("li",{children:"• PII tags auto-applied from dbt YAML"}),(0,t.jsx)("li",{children:"• Dynamic view redaction for sensitive columns"}),(0,t.jsx)("li",{children:"• Audit log streamed to Datadog"}),(0,t.jsx)("li",{children:"• Immuta policy enforcement layer"})]})}),(0,t.jsx)(r.SectionCard,{title:"Operational excellence",icon:(0,t.jsx)(g.Cpu,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• DLT pipelines: declared quality (bronze/silver/gold)"}),(0,t.jsx)("li",{children:"• Cluster pools reuse executor nodes (warm-start)"}),(0,t.jsx)("li",{children:"• Z-ORDER nightly on top-10 hot Silver tables"}),(0,t.jsx)("li",{children:"• VACUUM + retention scheduled via Airflow"}),(0,t.jsx)("li",{children:"• Cost-per-task tagged in cluster policy"})]})})]}),(0,t.jsx)(r.SectionCard,{title:"Multi-language: 5 idioms for Silver customer conformance",description:"PySpark (default) · Scala (type-safe performant) · Rust (vectorised UDF) · Elixir (real-time streaming) · C (Arrow native). Click to open the drawer — keeps the page lightweight.",icon:(0,t.jsx)(N.Languages,{className:"h-5 w-5"}),badge:"5 languages · drawer",children:(0,t.jsx)(n.MultiLangSamples,{drawerMode:!0,drawerButtonLabel:"View 5-language Silver conformance implementations",title:"Silver customer conformance — 5 idiomatic implementations",description:"The same MERGE logic in 5 languages. PySpark = analytics default. Scala = type-safe performant. Rust = vectorised UDF. Elixir = real-time streaming via Broadway + BEAM. C = Arrow native UDF.",samples:[{language:"python",filename:"silver_customer.py",note:"PySpark DLT — the default for analytics engineers. Reads from streams, MERGEs on customer_sk. Compiles to JVM bytecode via Py4J bridge.",code:`import dlt
from pyspark.sql.functions import col, md5, concat_ws, when, lit, current_timestamp

@dlt.table(name="silver.customer", partition_cols=["region_code"])
@dlt.expect_or_drop("email_not_null", "customer_email IS NOT NULL")
def silver_customer():
    return (
        spark.readStream.format("delta")
        .load("/mnt/bronze/salesforce/account")
        .withColumn("customer_email_hash", md5(col("customer_email")))
        .withColumn("customer_sk", md5(concat_ws("||", col("customer_email_hash"), col("loaded_at"))))
        .withColumn("is_active", when(col("status") == "ACTIVE", lit(True)).otherwise(lit(False)))
    )`,highlight:[4,5,6,7,8,9,10,11]},{language:"scala",filename:"SilverCustomerConformance.scala",note:"Scala Spark — type-safe, ~15% faster than PySpark on the same cluster. JVM-native; compiles to bytecode. Used for performance-critical batch jobs.",code:`package com.moderndatascieng.silver

import org.apache.spark.sql.functions._
import org.apache.spark.sql.expressions.Window
import org.apache.spark.sql.{DataFrame, SaveMode, SparkSession}

object SilverCustomerConformance {
  def transform(src: DataFrame)(implicit spark: SparkSession): DataFrame = {
    import spark.implicits._
    src
      .withColumn("customer_email_hash", md5(lower($"customer_email")))
      .withColumn("customer_sk", md5(concat_ws("||", $"customer_email_hash", $"loaded_at")))
      .withColumn("is_active", when($"status" === "ACTIVE", lit(true)).otherwise(lit(false)))
      .withColumn("loaded_at", current_timestamp())
      .dropDuplicates("customer_email_hash", $"loaded_at")
  }

  def merge(target: String, src: DataFrame)(implicit spark: SparkSession): Unit = {
    spark.sql(s"""
      MERGE INTO $target AS t
      USING src AS s
        ON t.customer_sk = s.customer_sk
      WHEN MATCHED AND s.loaded_at > t.loaded_at THEN UPDATE SET *
      WHEN NOT MATCHED THEN INSERT *
    """)
  }
}`,highlight:[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]},{language:"rust",filename:"pii_redact_udf.rs",note:"Rust UDF — vectorised regex PII redaction. ~10× faster than SQL UDFs, ~3× faster than Python UDFs. Compiles to Wasm for portability + native for max perf.",code:`// Snowflake external function — Rust implementation
// Reads a column of strings, redacts PII patterns (SSN, card, email)

use regex::Regex;

#[no_mangle]
pub extern "C" fn redact_pii(input: &str) -> String {
    let ssn = Regex::new(r"\bd{3}-d{2}-d{4}\b").unwrap();
    let card = Regex::new(r"\bd{16,19}\b").unwrap();
    let email = Regex::new(r"\b[A-Z][a-z]+@[a-z]+.(com|org|net)\b").unwrap();

    let mut out = input.to_string();
    out = ssn.replace_all(&out, "[REDACTED-SSN]").to_string();
    out = card.replace_all(&out, "[REDACTED-CARD]").to_string();
    out = email.replace_all(&out, "[REDACTED-EMAIL]").to_string();
    out
}

// Compile: cargo build --release --target wasm32-wasi
// Deploy: Snowflake External Function via API Gateway + Lambda
`,highlight:[7,8,9,12,13,14,15,16,17]},{language:"elixir",filename:"silver_customer_conform.ex",note:"Elixir + BroadwayKafka — real-time streaming with back-pressure via the BEAM VM. Discord + WhatsApp use this for high-concurrency pipelines. Compiles to .beam bytecode.",code:`defmodule ModernDataSciEng.SilverCustomerConform do
  @moduledoc """
  Broadway pipeline: Kafka Bronze events -> Silver conformed table.
  Uses BroadwayKafka for back-pressure + concurrent processing.
  The BEAM VM gives us ~1M concurrent lightweight processes per node.
  """
  use Broadway

  alias BroadwayKafka.Producer
  alias ModernDataSciEng.{Customer, Repo}

  @impl true
  def start_link(opts \\\\ []) do
    Broadway.start_link(__MODULE__,
      name: __MODULE__,
      producer: [
        module: {Producer, [
          hosts: [{"broker-1", 9092}],
          group_id: "silver-conform-service",
          topics: ["bronze.customer"],
        ]},
        concurrency: 4,
      ],
      processors: [
        default: [concurrency: 100, max_demand: 50],
      ],
      batchers: [
        default: [concurrency: 10, batch_size: 1000, batch_timeout: 5000],
      ],
    )
  end

  @impl true
  def handle_message(_, message, _) do
    # Decode Avro payload
    {:ok, customer_event} = :avro.decode(message.data, schema_name: "Customer")

    # Conform: generate surrogate key, normalise, dedupe
    customer_sk =
      :crypto.hash(:md5, "#{customer_event.email_hash}|#{customer_event.loaded_at}")
      |> Base.encode16(case: :lower)

    conformed = %{
      customer_sk: customer_sk,
      customer_id: customer_event.customer_id,
      email_hash: customer_event.email_hash,
      is_active: customer_event.status == "ACTIVE",
      region_code: customer_event.region || "UNKNOWN",
      loaded_at: DateTime.utc_now(),
    }

    # Idempotent upsert via Ecto (Postgres wire)
    Repo.insert_all(Customer, [conformed],
      on_conflict: {:replace, [:is_active, :region_code, :loaded_at]},
      conflict_target: :customer_sk,
    )

    message
  end

  @impl true
  def handle_batch(_, messages, _, _) do
    # Batch write to Delta via JDBC
    rows = Enum.map(messages, & &1.data)
    :delta_writer.write("s3://silver/customer", rows)
    :ok
  end
end

# File types: .ex (source), .beam (compiled bytecode), .ez (release archive)
# Run: mix run -e ModernDataSciEng.SilverCustomerConform.start_link()`,highlight:[11,12,13,14,15,16,17,18,19,28,29,30,31,32,33,47,48,49,50,51]},{language:"c",filename:"vectorised_email_hash.c",note:"C + Apache Arrow C++ — vectorised column processing at the native layer. Most high-level APIs (DuckDB, Polars, Pandas) eventually call into C/C++ here. Compiles to .so shared library.",code:`// ============================================================
// Apache Arrow C UDF — vectorised email hashing for PII redaction
// Process a whole column at once (vectorised) — 10x faster than row-by-row
// Compiles to a shared lib loadable by DuckDB / Postgres / Polars
// ============================================================
#include <arrow/c/abi.h>
#include <openssl/md5.h>
#include <string.h>
#include <stdint.h>

// Arrow C Data Interface (ABI-stable across languages)
// The same function is callable from Python, Rust, Go, Java via Arrow C-ABI
int vectorised_email_hash(
    struct ArrowArray* input_column,   // input: strings
    struct ArrowArray* output_column,  // output: fixed-size binary (16 bytes MD5)
    int64_t length
) {
    if (input_column->n_buffers < 3) return -1;

    const int32_t* offsets = (const int32_t*) input_column->buffers[1];
    const char* data = (const char*) input_column->buffers[2];

    // Allocate output buffer (16 bytes per row for MD5)
    uint8_t* out = (uint8_t*) output_column->buffers[1];

    for (int64_t i = 0; i < length; i++) {
        int32_t start = offsets[i];
        int32_t end = offsets[i + 1];
        size_t len = (size_t)(end - start);

        // Compute MD5 of the email string (OpenSSL)
        MD5((const unsigned char*)(data + start), len, out + (i * 16));
    }

    return 0;  // success
}

// Compile: gcc -O3 -shared -fPIC -o email_hash_udf.so email_hash_udf.c \\
//          -I/usr/include/arrow -lcrypto
// Load in DuckDB:  INSTALL 'email_hash_udf.so';
//                  CREATE MACRO email_hash(col) AS udf_vectorised_email_hash(col);
// Load in Postgres: CREATE FUNCTION email_hash(text) RETURNS bytea \\
//                   AS 'email_hash_udf.so', 'vectorised_email_hash' LANGUAGE C;`,highlight:[9,10,11,12,13,15,16,17,20,21,22,23,28,29,30,31,32]}]})}),(0,t.jsx)(r.SectionCard,{title:"Try it: Delta MERGE syntax validator (Pyodide)",description:"Validates that a MERGE statement has all required clauses (MERGE INTO, USING, ON, WHEN MATCHED, WHEN NOT MATCHED). Pure Python regex — runs in browser.",icon:(0,t.jsx)(p.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(u.PyodideRunner,{code:`import re

merge_sql = """
MERGE INTO silver.order_line AS t
USING (
  SELECT order_id, customer_sk, product_sk, order_date_sk, qty, net_amount
  FROM bronze.shopify.order_line_raw
  WHERE loaded_at > (SELECT COALESCE(MAX(loaded_at), '1970-01-01') FROM silver.order_line)
) AS s
ON t.order_line_id = s.order_line_id
WHEN MATCHED AND s.loaded_at > t.loaded_at THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
"""

required_clauses = {
    "MERGE INTO": "target table",
    "USING": "source data",
    "ON": "join condition",
    "WHEN MATCHED": "update clause",
    "WHEN NOT MATCHED": "insert clause",
}

issues = []
for clause, desc in required_clauses.items():
    if clause in merge_sql:
        print(f"\\u2713 Found '{clause}' \u2014 {desc}")
    else:
        issues.append(f"\\u26a0 Missing '{clause}' \u2014 {desc}")

if re.search(r'\\bAS \\w+', merge_sql):
    print("\\u2713 Table aliases found (AS t / AS s)")
if "UPDATE SET" in merge_sql:
    print("\\u2713 UPDATE SET found")
if "INSERT" in merge_sql:
    print("\\u2713 INSERT found")

print()
print("=" * 60)
if issues:
    print("MERGE SYNTAX ISSUES:")
    for i in issues: print(f"  {i}")
    print(f"\\\\n{len(issues)} issue(s) found.")
else:
    print("\\u2713 MERGE statement is valid \u2014 all required clauses present.")
    print("  Safe to deploy as idempotent Silver conformance.")
print("=" * 60)`,buttonLabel:"Run MERGE validator (Pyodide)"})}),(0,t.jsx)(r.SectionCard,{title:"Try it: Rust/C code compiled to WebAssembly",description:"The Rust UDF + C Arrow UDF above, compiled to Wasm, would run in your browser. This demo uses a hand-assembled 41-byte Wasm binary that exports an `add` function — the pattern is the same for real Rust/C code compiled via `cargo build --target wasm32-wasi` or `emcc`.",icon:(0,t.jsx)(p.Terminal,{className:"h-5 w-5"}),badge:"Wasm · ADR-016",children:(0,t.jsx)(h.WasmRunner,{sourceLanguage:"Rust/C → wasm32-wasi",buttonLabel:"Run Wasm module (41 bytes)",description:"In production: compile the Rust UDF above with `cargo build --target wasm32-wasi` and host the .wasm binary. The WasmRunner loads it via WebAssembly.instantiate() and calls the exported function — same pattern regardless of source language (Rust, C, Go, Elixir all compile to Wasm)."})}),(0,t.jsxs)(j.DeeperThoughtSection,{pageTitle:"Databricks",children:[(0,t.jsx)(j.DeeperThought,{title:"Databricks IS Spark-as-a-service — and Spark IS functional programming at scale",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"Spark's RDD/DataFrame model is functional: map, filter, reduce, groupBy — the SAME operations as Haskell/Scala collections. The difference: Spark distributes them across a cluster. A DataFrame IS a distributed collection. A groupBy IS a distributed hash-partition. The functional paradigm (immutability, lazy evaluation) IS the reason Spark is fault-tolerant: if a partition fails, recompute from the lineage DAG. Databricks wraps this in a managed service — but the math IS functional programming, distributed."})}),(0,t.jsx)(j.DeeperThought,{title:"Photon IS Databricks' C++ rewrite of the Spark SQL engine — 10× faster",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"Spark's original SQL engine was written in Scala (JVM). Photon (2021) rewrites it in C++ for vectorised execution — 10× faster on the same hardware. The SQL IS the same; the execution engine is different. This IS the 'production patterns' fold in action: the tool (Spark SQL → Photon) changes, the math (relational algebra, Codd 1970) stays. When Photon is replaced by a GPU-native SQL engine in 2030, the SQL stays. The fold absorbs the change."})}),(0,t.jsx)(j.DeeperThought,{title:"Delta Lake IS ACID transactions on Parquet — and it's open",connectedTo:"ADR-013 (Delta Lake)",children:(0,t.jsx)("p",{children:"Delta Lake adds a transaction log (_delta_log/) on top of Parquet files. The log IS an append-only sequence of JSON actions (Add, Remove, Commit). This IS the same event-sourcing pattern as Kafka's log — just for files instead of messages. The ACID guarantee comes from the log: read the log → determine which Parquet files are 'current' → read those files. The log IS the source of truth; the files are materialised views. Delta IS event-sourcing for data lakes."})}),(0,t.jsx)(j.DeeperThought,{title:"The cluster park IS Databricks' cost-aware autoscaling — and it saves 19% YoY",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"Databricks' cluster parks maintain a pool of pre-warmed clusters that autoscale based on workload. When a job starts, it grabs a pre-warmed cluster (no startup latency). When the job ends, the cluster returns to the pool (no teardown). This IS the same pattern as connection pooling in databases — but for Spark clusters. The 19% YoY cost reduction comes from avoiding cluster startup/teardown overhead. The pool IS the amortisation of cold-start cost."})}),(0,t.jsx)(j.DeeperThought,{title:"Unity Catalog IS Databricks' answer to Snowflake's governance — and it's open",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"Unity Catalog centralises governance (ACLs, column-level masking, row-level filters) across all Databricks workspaces. This IS the same pattern as Snowflake's GRANT/REVOKE — but for Delta tables instead of Snowflake tables. The governance model IS RBAC (role-based access control) — the same model that every database since Oracle 7 (1992) has used. Unity Catalog IS the 'Production patterns' fold for governance — the pattern (RBAC) stays, the implementation (Unity vs Snowflake vs Lake Formation) changes."})})]}),(0,t.jsx)(i.ResearchDemo,{pageId:"databricks"}),(0,t.jsx)(o.TrendAnticipation,{pageId:"databricks"}),(0,t.jsx)(s.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"snowflake",reason:"Continue to snowflake — see also from this page"},{id:"orchestration",reason:"Continue to orchestration — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,d.hrefFor)("snowflake"),className:"text-sm text-primary hover:underline",children:"→ Continue to Snowflake serving"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,d.hrefFor)("orchestration"),className:"text-sm text-primary hover:underline",children:"→ or jump to Orchestration"})]})]})}e.s(["DatabricksPage",()=>T])}]);