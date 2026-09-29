(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var r=e.i(843476),t=e.i(271645),s=e.i(487486),a=e.i(519455),o=e.i(716675),i=e.i(194058),n=e.i(862824),d=e.i(344396),c=e.i(178583),l=e.i(778917),u=e.i(283086),h=e.i(972520),m=e.i(217923),p=e.i(522016),g=e.i(901752);function x({pageId:e}){let t=(0,d.researchForPage)(e);return 0===t.length?null:(0,r.jsxs)(n.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,r.jsx)(c.FileText,{className:"h-5 w-5"}),badge:`${t.length} paper${1===t.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[t.map((e,t)=>(0,r.jsx)(b,{entry:e},t)),(0,r.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[t.length," paper",1===t.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function b({entry:e}){let[n,d]=(0,t.useState)(!1),[c,x]=(0,t.useState)(null);return(0,r.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,r.jsxs)("div",{className:"space-y-1",children:[(0,r.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,r.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,r.jsx)(s.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,r.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,r.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,r.jsx)(l.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,r.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,r.jsx)(l.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,r.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,r.jsxs)(a.Button,{variant:"outline",size:"sm",onClick:()=>d(!n),className:"h-7 text-[11px] gap-1.5",children:[(0,r.jsx)(u.Sparkles,{className:"h-3 w-3"}),n?"Hide expected code":"Show expected code + visualization"]}),n&&(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)(o.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let r=e.indexOf("{"),t=e.lastIndexOf("}");if(r>=0&&t>r){let s=e.substring(r,t+1);x(JSON.parse(s))}}catch{}},hideTextOutput:!!c,compact:!0}),c?(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,r.jsx)(m.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,r.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,r.jsx)(i.AnalysisChart,{data:c,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,r.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,r.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,r.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,r.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,r.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,r.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,r.jsxs)(p.default,{href:(0,g.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,r.jsx)(h.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>x])},618393,e=>{"use strict";var r=e.i(953651);e.s(["Server",()=>r.default])},727927,e=>{"use strict";var r=e.i(651617);e.s(["Cloud",()=>r.default])},366101,763639,e=>{"use strict";var r=e.i(843476),t=e.i(271645),s=e.i(980376),a=e.i(122836),o=e.i(487486),i=e.i(519455),n=e.i(444609);e.s(["Languages",()=>n.default],763639);var n=n,d=e.i(463059);let c={python:"Python",scala:"Scala",go:"Go",rust:"Rust",java:"Java",sql:"SQL",yaml:"YAML",hcl:"Terraform",bash:"Bash",elixir:"Elixir",c:"C",typescript:"TypeScript"};function l({samples:e}){let[s,o]=(0,t.useState)(0),i=e[s];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"flex flex-wrap gap-1 border-b border-border/60 bg-muted/20 px-2 py-2",children:e.map((e,t)=>(0,r.jsx)("button",{onClick:()=>o(t),className:`text-[11px] px-2.5 py-1 rounded border transition-colors font-mono ${t===s?"bg-primary text-primary-foreground border-primary":"border-border/60 hover:bg-accent"}`,children:c[e.language]??e.language},e.language+e.filename))}),(0,r.jsxs)("div",{className:"p-3 bg-card",children:[i.note&&(0,r.jsx)("p",{className:"text-xs text-muted-foreground mb-2 italic",children:i.note}),(0,r.jsx)(a.CodeBlock,{code:i.code,language:i.language,filename:i.filename,highlight:i.highlight})]})]})}function u({title:e,description:t,samples:a,drawerMode:c=!1,drawerButtonLabel:u}){return c?(0,r.jsxs)(s.Sheet,{children:[(0,r.jsx)(s.SheetTrigger,{asChild:!0,children:(0,r.jsxs)(i.Button,{variant:"outline",className:"gap-2 w-full justify-between h-auto py-3",children:[(0,r.jsxs)("span",{className:"flex items-center gap-2",children:[(0,r.jsx)(n.default,{className:"h-4 w-4 text-primary"}),(0,r.jsx)("span",{className:"font-semibold text-sm",children:u??e}),(0,r.jsxs)(o.Badge,{variant:"outline",className:"text-[10px]",children:[a.length," languages"]})]}),(0,r.jsx)(d.ChevronRight,{className:"h-4 w-4 text-muted-foreground"})]})}),(0,r.jsxs)(s.SheetContent,{side:"right",className:"w-[min(680px,100vw)] sm:max-w-[680px] p-0 overflow-y-auto",children:[(0,r.jsxs)(s.SheetHeader,{className:"px-5 pt-5 pb-3 border-b border-border/60 bg-muted/30",children:[(0,r.jsxs)(s.SheetTitle,{className:"text-base flex items-center gap-2",children:[(0,r.jsx)(n.default,{className:"h-4 w-4 text-primary"}),e]}),t&&(0,r.jsx)(s.SheetDescription,{className:"text-xs",children:t})]}),(0,r.jsx)("div",{className:"border-b border-border/60",children:(0,r.jsx)(l,{samples:a})}),(0,r.jsx)("div",{className:"px-5 py-3 border-t border-border/60 bg-muted/20 text-[11px] text-muted-foreground",children:(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"File types commonly deployed:"})," ",Array.from(new Set(a.map(e=>e.filename.split(".").pop()||""))).join(", ")," — each compiles to a portable artefact (binary, .so, .beam, .jar, or interpreter-bound source)."]})})]})]}):(0,r.jsxs)("div",{className:"rounded-md border border-border/60 overflow-hidden",children:[(0,r.jsxs)("div",{className:"bg-muted/30 px-4 py-3 border-b border-border/60",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)(n.default,{className:"h-4 w-4 text-primary"}),(0,r.jsx)("p",{className:"text-sm font-semibold",children:e}),(0,r.jsxs)(o.Badge,{variant:"outline",className:"ml-auto text-[10px]",children:[a.length," languages"]})]}),t&&(0,r.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:t})]}),(0,r.jsx)(l,{samples:a})]})}e.s(["MultiLangSamples",()=>u],366101)},629142,e=>{"use strict";var r=e.i(843476),t=e.i(522016),s=e.i(862824),a=e.i(342046),o=e.i(921371),i=e.i(580296),n=e.i(122836),d=e.i(366101),c=e.i(716675),l=e.i(901752),u=e.i(487486),h=e.i(332017),m=e.i(658041),p=e.i(852008),g=e.i(39312),x=e.i(618393),b=e.i(727927),f=e.i(763639),y=e.i(25652),v=e.i(828579),w=e.i(955716),k=e.i(868054),j=e.i(431343);let D=`# ============================================================
# DuckDB + Python — the "just open a Parquet file" pattern
# Free: OSS (MIT). pip install duckdb. ~30MB binary.
# ============================================================
import duckdb
import pandas as pd

# Connect — in-process, no server. Single file or in-memory.
con = duckdb.connect("moderndatascieng.duckdb")  # file
# con = duckdb.connect()  # in-memory (zero persistence)

# Query a Parquet file directly — no COPY, no load
df = con.sql("""
    SELECT region_code,
           date_trunc('day', order_ts) AS day,
           count(*)                    AS orders,
           sum(order_total)            AS revenue
    FROM read_parquet('s3://moderndatascieng-bronze/shopify/orders/*.parquet')
    WHERE order_ts >= CURRENT_DATE - INTERVAL 7 DAY
    GROUP BY 1, 2
    ORDER BY revenue DESC
""").df()  # .df() → pandas DataFrame via Arrow zero-copy

# DuckDB writes Arrow; pandas receives Arrow; no row-by-row serialisation.
# The .df() call is ~100x faster than going through CSV.

# Streaming aggregations with SQL — DuckDB is single-process but uses
# all CPU cores via morsel-driven parallelism
con.sql("""
    CREATE OR REPLACE TABLE silver.customer AS
    SELECT
      customer_id,
      md5(email || '|' || loaded_at)              AS customer_sk,
      COALESCE(region, 'UNKNOWN')                  AS region_code,
      status = 'ACTIVE'                            AS is_active,
      CURRENT_TIMESTAMP                            AS loaded_at
    FROM read_parquet('s3://moderndatascieng-bronze/sfdc/account/*.parquet')
""")

# Type-safe via pyarrow extension types
print(con.sql("SELECT count(*) FROM silver.customer").fetchone()[0])
`,S=`-- ============================================================
-- DuckDB SQL — analytical SQL on any file, no server
-- Extensions: httpfs (S3/HTTPS), parquet, json, excel, icu, tpch, tpcds
-- ============================================================

-- Install + load the httpfs extension to query S3 / HTTPS directly
INSTALL httpfs; LOAD httpfs;
SET s3_region = 'eu-west-1';
SET s3_access_key_id = 'AKIA...';
SET s3_secret_access_key = '...';

-- Query 100s of Parquet files on S3 without copying them locally
-- DuckDB pushes predicates into the Parquet reader (skips row groups)
CREATE VIEW bronze_orders AS
  SELECT * FROM read_parquet('s3://moderndatascieng-bronze/shopify/orders/*.parquet');

-- Tumbling window aggregation — 10x faster than Postgres on a single node
SELECT
  date_trunc('day', order_ts) AS day,
  count(*)                     AS orders,
  sum(order_total)             AS revenue
FROM bronze_orders
WHERE order_ts >= CURRENT_DATE - INTERVAL 7 DAY
GROUP BY 1
ORDER BY day DESC;

-- Native Apache Arrow support — read Parquet without deserialising
-- to row-format. Zero-copy handoff to pandas / polars / R / Python.
COPY (SELECT * FROM bronze_orders WHERE region_code = 'UK')
TO '/tmp/uk_orders.parquet' (FORMAT 'parquet', COMPRESSION 'zstd');

-- Connect to MotherDuck (managed DuckDB) — same SQL, no ops
-- ATTACH 'md:moderndatascieng?attach=true' AS motherduck (READ_ONLY);

-- JSON ingestion — DuckDB reads JSON natively (no jq needed)
SELECT
  json_extract_string(payload, '$.order_id')      AS order_id,
  json_extract(payload, '$.order_total')::double  AS total,
  json_extract_string(payload, '$.customer.id')   AS customer_id
FROM read_json_auto('s3://bucket/events/*.jsonl');

-- Iceberg tables via the iceberg extension (cross-format reads)
INSTALL iceberg; LOAD iceberg;
ATTACH 's3://moderndatascieng-iceberg/catalog' AS ice (TYPE iceberg);
SELECT * FROM ice.sales.fct_orders WHERE order_ts > now() - INTERVAL '1 day';
`,N=`// ============================================================
// DuckDB + Rust — embed DuckDB as a Rust crate for native binaries
// Free: OSS (MIT). cargo add duckdb. ~30MB binary.
// ============================================================
use duckdb::{Connection, Result};
use arrow::array::RecordBatch;

fn silver_conform(conn: &Connection) -> Result<()> {
    // Run SQL via the embedded DuckDB engine — no IPC, zero-copy Arrow
    let mut stmt = conn.prepare("""
        SELECT
          customer_id,
          md5(email || '|' || loaded_at)              AS customer_sk,
          COALESCE(region, 'UNKNOWN')                  AS region_code,
          status = 'ACTIVE'                            AS is_active,
          CURRENT_TIMESTAMP                            AS loaded_at
        FROM read_parquet('s3://moderndatascieng-bronze/sfdc/account/*.parquet')
    """)?;

    // Get Arrow RecordBatch — zero-copy from DuckDB's columnar format
    let batches = stmt.query_arrow(())?;
    for batch in batches {
        // batch: &RecordBatch — Arrow columnar, no row-by-row conversion
        let customer_ids = batch
            .column(0)
            .as_string::<i32>();
        for cid in customer_ids {
            println!("customer_id: {}", cid);
        }
    }
    Ok(())
}

fn main() -> Result<()> {
    let conn = Connection::open_in_memory()?;
    conn.execute_batch("INSTALL httpfs; LOAD httpfs;")?;
    silver_conform(&conn)?;
    Ok(())
}

// Compile: cargo build --release
// Binary:  ~30MB (DuckDB embedded + Arrow runtime)
// Performance: ~10x faster than equivalent Postgres query
`,_=`// ============================================================
// DuckDB + Go — embed DuckDB as a Go module
// Free: OSS (MIT). go get github.com/marcboeker/go-duckdb
// ============================================================
package main

import (
        "database/sql"
        "fmt"
        "log"

        _ "github.com/marcboeker/go-duckdb"
)

func silverConform(db *sql.DB) error {
        // Run SQL — DuckDB pushes S3 reads through libcurl, predicate pushdown to Parquet
        rows, err := db.Query(\`
                SELECT
                  customer_id,
                  md5(email || '|' || loaded_at)              AS customer_sk,
                  COALESCE(region, 'UNKNOWN')                  AS region_code,
                  status = 'ACTIVE'                            AS is_active
                FROM read_parquet('s3://moderndatascieng-bronze/sfdc/account/*.parquet')
        \`)
        if err != nil {
                return err
        }
        defer rows.Close()

        for rows.Next() {
                var id, sk, region string
                var active bool
                if err := rows.Scan(&id, &sk, &region, &active); err != nil {
                        return err
                }
                fmt.Printf("customer_id=%s sk=%s region=%s active=%v\\n", id, sk, region, active)
        }
        return rows.Err()
}

func main() {
        // In-process DuckDB — no server, no IPC overhead
        db, err := sql.Open("duckdb", "?entrypoint=duckdb_open_ext")
        if err != nil {
                log.Fatal(err)
        }
        defer db.Close()

        if _, err := db.Exec("INSTALL httpfs; LOAD httpfs;"); err != nil {
                log.Fatal(err)
        }
        if err := silverConform(db); err != nil {
                log.Fatal(err)
        }
}

// Compile: go build -o silver_conform
// Binary:  ~35MB (DuckDB embedded + libcurl for S3)
// Performance: ~10x faster than equivalent Postgres query
`,T=[{label:"Single-node perf vs Postgres",value:"10×",hint:"OLAP workloads (columnar vs row)",deltaTone:"flat"},{label:"Binary size",value:"~30MB",hint:"Embedded, no server",deltaTone:"flat"},{label:"File formats read",value:"Parquet, CSV, JSON, Arrow, Excel",hint:"Native, no COPY",deltaTone:"flat"},{label:"License",value:"MIT (OSS)",hint:"Free forever, including commercial",deltaTone:"flat"}],A=[{title:"Notebook analytics",desc:"Open a 5GB Parquet file in Jupyter, query it with SQL, get a pandas DataFrame back via Arrow zero-copy. No cluster, no server, no wait.",icon:"Boxes"},{title:"CI tests for dbt models",desc:"Run dbt build on a sample of data in CI — DuckDB is the local execution engine. No Snowflake credits burned for tests.",icon:"GitBranch"},{title:"Edge processing",desc:"Embed DuckDB in a Rust/Go binary running on edge nodes (IoT, store-edge). Process sensor data locally, ship aggregates upstream.",icon:"Server"},{title:"MotherDuck — managed DuckDB",desc:"Same SQL, no ops. MotherDuck hosts the DuckDB engine + storage; you query from any client. Free trial; production is metered.",icon:"Cloud"}],B=[{aspect:"Architecture",duckdb:"In-process (embedded library)",postgres:"Server + client protocol",spark:"Cluster (driver + executors)"},{aspect:"Best for",duckdb:"OLAP on files < 1TB",postgres:"OLTP, transactional",spark:"OLAP at petabyte scale"},{aspect:"Setup time",duckdb:"30 seconds (pip install)",postgres:"5 minutes (server)",spark:"1 hour (cluster)"},{aspect:"Cost",duckdb:"Free (MIT OSS)",postgres:"Free (OSS) or managed ($)",spark:"Free (OSS) or Databricks ($$$)"},{aspect:"Single-node perf",duckdb:"~10× Postgres, ~3× Spark-on-1-node",postgres:"Baseline",spark:"Slower on small data (overhead)"},{aspect:"Concurrency",duckdb:"Single-writer, multi-reader",postgres:"Multi-writer, MVCC",spark:"Multi-writer (via table locks)"},{aspect:"When to skip",duckdb:"Petabyte scale; high-concurrency writes",postgres:"OLAP-heavy queries (slow on row format)",spark:"Single-node workloads (overhead dominates)"}];function C(){return(0,r.jsxs)("div",{className:"space-y-8",children:[(0,r.jsx)(s.PageHeader,{eyebrow:"Databases · in-process OLAP",title:"DuckDB — Laptop-scale Big Data",description:"The most disruptive piece of the modern data stack. DuckDB is an in-process analytical SQL engine — embed it in Python, Rust, Go, Node, R, or just use the CLI. No server, no cluster, no ops. Read Parquet / CSV / JSON / Arrow / Iceberg directly. ~30MB binary, ~10× faster than Postgres on a single node, 100% OSS (MIT).",right:(0,r.jsxs)("div",{className:"flex gap-2",children:[(0,r.jsxs)(u.Badge,{variant:"outline",className:"gap-1.5",children:[(0,r.jsx)(g.Zap,{className:"h-3 w-3"})," 10× Postgres"]}),(0,r.jsxs)(u.Badge,{variant:"outline",className:"gap-1.5",children:[(0,r.jsx)(b.Cloud,{className:"h-3 w-3"})," ~30MB binary"]})]})}),(0,r.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:T.map(e=>(0,r.jsx)(s.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,r.jsx)(s.SectionCard,{title:"My deeper thought: laptop-scale big data is the new normal",description:"DuckDB is rewriting the assumption that analytical SQL needs a server. This changes where decisions get made — and who makes them.",icon:(0,r.jsx)(y.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,r.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,r.jsx)("p",{children:'Ten years ago, "big data" meant: Hadoop cluster, ops team, dedicated warehouse team. Analytical SQL was a server-side service — you asked the warehouse, the warehouse answered. The cost of asking was high enough that you batched your questions. Self-service analytics meant "request access to a tableau dashboard that someone else built".'}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"DuckDB is the inversion of this assumption."}),' Your laptop is now a credible analytical engine. A 5GB Parquet file is no longer "big data" — it\'s "data". A 50GB dataset fits on your SSD and queries in seconds. The cost of asking a question dropped from "open a ticket" to "type SQL in a notebook". Self-service analytics becomes actual self-service — anyone with Python + DuckDB can query, no infra required.']}),(0,r.jsxs)("p",{children:["The implication: ",(0,r.jsx)("strong",{className:"text-foreground/80",children:"more decisions get made locally."}),' Analysts prototype in DuckDB before promoting to Snowflake. CI tests run DuckDB on data samples instead of burning warehouse credits. Edge nodes (stores, IoT) run DuckDB to pre-aggregate before shipping upstream. The boundary between "big data" and "small data" has shifted — and the platform architecture has to follow.']}),(0,r.jsxs)("p",{children:["The next move, when DuckDB hits 1TB single-node performance (it's close), is that ",(0,r.jsx)("strong",{className:"text-foreground/80",children:"most analytics workloads won't need a warehouse at all"}),". Snowflake + BigQuery become the cold-storage + cross-team-shared-query layer; DuckDB becomes the hot analytical layer. MotherDuck is the bridge — managed DuckDB when you need shared access."]})]})}),(0,r.jsx)(s.SectionCard,{title:"Multi-language: embed DuckDB in Python, SQL, Rust, Go",description:"Same Silver conformance logic in 4 idioms. Python = analyst default. SQL = CLI / IDE. Rust = native binary. Go = ops tooling. Click to open the drawer.",icon:(0,r.jsx)(f.Languages,{className:"h-5 w-5"}),badge:"4 languages · drawer",children:(0,r.jsx)(d.MultiLangSamples,{drawerMode:!0,drawerButtonLabel:"View 4-language DuckDB embed implementations",title:"DuckDB embedded — 4 idiomatic implementations",description:"Same Silver conformance logic in 4 languages. Each embeds DuckDB as a library — no IPC, zero-copy Arrow handoff. File types: .py / .sql / .rs / .go → ~30MB binary or interpreted.",samples:[{language:"python",filename:"duckdb_silver.py",note:"DuckDB + Python — the analyst default. pip install duckdb. Read Parquet from S3, query with SQL, get a pandas DataFrame via Arrow zero-copy. File types: .py (source), interpreted.",code:D,highlight:[6,7,10,11,12,13,14,15,16,17,18,19,21,22,23]},{language:"sql",filename:"duckdb_conform.sql",note:"DuckDB SQL — runs via CLI or any IDE that speaks Postgres-wire. INSTALL/LOAD extensions for httpfs (S3), iceberg, json, excel. File types: .sql (source), interpreted by DuckDB engine.",code:S,highlight:[7,8,9,11,12,13,14,22,23,24,28,29,30,35,36,37,41,42,43]},{language:"rust",filename:"duckdb_rust.rs",note:"DuckDB + Rust — embed DuckDB as a Rust crate. Zero-copy Arrow RecordBatch handoff (no row-by-row). ~30MB binary. For edge processing + native binaries. File types: .rs (source) → ~30MB binary.",code:N,highlight:[9,10,11,12,13,14,15,16,17,18,19,20,21,32,33,34,35,36]},{language:"go",filename:"duckdb_go.go",note:"DuckDB + Go — embed DuckDB as a Go module. Single static binary ~35MB (incl. libcurl for S3). For ops tooling + edge binaries. File types: .go (source) → ~35MB binary.",code:_,highlight:[13,14,15,16,17,18,19,20,21,22,23,24,25,41,42,43,44,45,46]}]})}),(0,r.jsx)(s.SectionCard,{title:"Where DuckDB wins — the four primary use cases",description:"DuckDB isn't a replacement for warehouses — it's a new tier in the architecture. Here's where it shines.",icon:(0,r.jsx)(v.Boxes,{className:"h-5 w-5"}),children:(0,r.jsx)("div",{className:"grid md:grid-cols-2 gap-3",children:A.map(e=>{let t="Boxes"===e.icon?v.Boxes:"GitBranch"===e.icon?w.GitBranch:"Server"===e.icon?x.Server:b.Cloud;return(0,r.jsxs)("div",{className:"rounded-md border border-border/60 p-4 hover:border-primary/40 transition-colors",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,r.jsx)(t,{className:"h-4 w-4 text-primary"}),(0,r.jsx)("p",{className:"text-sm font-semibold",children:e.title})]}),(0,r.jsx)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:e.desc})]},e.title)})})}),(0,r.jsx)(s.SectionCard,{title:"DuckDB vs Postgres vs Spark — when to pick which",description:"Each tool has a sweet spot. Use this matrix to pick the right engine for the job, not the one your team happens to know.",icon:(0,r.jsx)(p.Layers,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"w-full text-sm",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,r.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Aspect"}),(0,r.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"DuckDB"}),(0,r.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Postgres"}),(0,r.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Spark"})]})}),(0,r.jsx)("tbody",{children:B.map(e=>(0,r.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,r.jsx)("td",{className:"px-3 py-2 text-xs font-semibold align-top",children:e.aspect}),(0,r.jsx)("td",{className:"px-3 py-2 text-[11px] text-foreground/80 align-top",children:e.duckdb}),(0,r.jsx)("td",{className:"px-3 py-2 text-[11px] text-muted-foreground align-top",children:e.postgres}),(0,r.jsx)("td",{className:"px-3 py-2 text-[11px] text-muted-foreground align-top",children:e.spark})]},e.aspect))})]})})}),(0,r.jsxs)(s.SectionCard,{title:"File formats DuckDB reads natively",description:"The 'just open a file' pattern is real because DuckDB speaks the formats directly — no COPY, no LOAD, no ingest pipeline.",icon:(0,r.jsx)(m.Database,{className:"h-5 w-5"}),children:[(0,r.jsxs)("div",{className:"grid md:grid-cols-3 gap-3 text-xs",children:[(0,r.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-3",children:[(0,r.jsx)("p",{className:"font-semibold text-sm mb-2 text-emerald-600 dark:text-emerald-400",children:"Columnar (native)"}),(0,r.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,r.jsxs)("li",{children:["• ",(0,r.jsx)(n.InlineCode,{children:"Parquet"})," — primary; predicate pushdown"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)(n.InlineCode,{children:"Arrow IPC"})," (.arrow / .feather) — zero-copy"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)(n.InlineCode,{children:"ORC"})," — Hive native"]})]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-3",children:[(0,r.jsx)("p",{className:"font-semibold text-sm mb-2 text-amber-600 dark:text-amber-400",children:"Text (auto-detected)"}),(0,r.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,r.jsxs)("li",{children:["• ",(0,r.jsx)(n.InlineCode,{children:"CSV / TSV"})," — auto-schema inference"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)(n.InlineCode,{children:"JSON"})," (.jsonl / .ndjson) — native"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)(n.InlineCode,{children:"Excel"})," (.xlsx) — via extension"]})]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-violet-500/40 bg-violet-500/5 p-3",children:[(0,r.jsx)("p",{className:"font-semibold text-sm mb-2 text-violet-600 dark:text-violet-400",children:"Lakehouse (via extension)"}),(0,r.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,r.jsxs)("li",{children:["• ",(0,r.jsx)(n.InlineCode,{children:"Iceberg"})," — vendor-neutral open format"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)(n.InlineCode,{children:"Delta Lake"})," — Databricks native"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)(n.InlineCode,{children:"SQLite"})," — ATTACH existing .sqlite"]})]})]})]}),(0,r.jsx)("div",{className:"mt-3 rounded-md border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground",children:(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Wire formats:"})," S3 / HTTPS via httpfs extension. Local files via ",(0,r.jsx)("code",{className:"font-mono",children:"read_parquet('/path/to/file.parquet')"}),". MotherDuck via ",(0,r.jsx)("code",{className:"font-mono",children:"ATTACH 'md:<db>'"}),". Postgres-wire for IDEs (",(0,r.jsx)("code",{className:"font-mono",children:"psql"}),", DataGrip, DBeaver)."]})})]}),(0,r.jsx)(s.SectionCard,{title:"My deeper thought: Arrow is the lingua franca, DuckDB is the SQL layer",description:"DuckDB is fast because it speaks Arrow natively. That's the deeper story.",icon:(0,r.jsx)(y.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,r.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,r.jsx)("p",{children:"DuckDB's headline speed (10× Postgres) isn't magic — it's the consequence of speaking Apache Arrow natively. Postgres stores rows; analytical queries scan columns; the conversion cost dominates. DuckDB stores + processes in Arrow columnar format from start to finish: the Parquet reader produces Arrow, the SQL engine operates on Arrow, the Python/R/Go/Rust bindings receive Arrow. No row-to-column conversion anywhere."}),(0,r.jsxs)("p",{children:["This is why ",(0,r.jsx)("strong",{className:"text-foreground/80",children:"the .df() call in Python is free"}),": DuckDB doesn't serialise to pandas' row format — it hands pandas a pointer to the Arrow buffer. Pandas 2.0+ reads Arrow natively. The whole stack is columnar end-to-end."]}),(0,r.jsxs)("p",{children:["The implication: ",(0,r.jsx)("strong",{className:"text-foreground/80",children:"Arrow is the lingua franca, not DuckDB."})," If your data is in Arrow format (Parquet is just Arrow-on-disk), any Arrow-aware engine can read it efficiently — DuckDB, Polars, Pandas 2.0, DataFusion, Acero (C++), even Rust's ",(0,r.jsx)(n.InlineCode,{children:"arrow-rs"}),". The engine is interchangeable; the format is sticky. Pick DuckDB for the SQL ergonomics; switch to Polars for the Rust perf; switch to Pandas for ecosystem — same data, zero conversion cost."]}),(0,r.jsxs)("p",{children:["The next move, when WebAssembly System Interface (WASI) matures, is that DuckDB + Arrow compile to Wasm and run ",(0,r.jsx)("strong",{className:"text-foreground/80",children:"in the browser"}),". Big data in your browser tab. That's the endgame of the laptop-scale pattern — the laptop is everywhere the browser is."]})]})}),(0,r.jsxs)(s.SectionCard,{title:"Try DuckDB in 30 seconds",description:"The fastest way to understand DuckDB is to use it. No signup, no install (if you have Python).",icon:(0,r.jsx)(g.Zap,{className:"h-5 w-5"}),children:[(0,r.jsx)(n.CodeBlock,{language:"bash",filename:"try-duckdb.sh",code:`# Install
pip install duckdb

# Or: brew install duckdb  (CLI)
# Or: cargo add duckdb     (Rust)
# Or: go get github.com/marcboeker/go-duckdb  (Go)

# Query a remote Parquet file from S3 — no copy, no server
python -c "
import duckdb
print(duckdb.sql('''
  SELECT count(*), sum(trip_distance)
  FROM read_parquet('s3://voltrondata-labs/yellow_tripdata/2024/*.parquet')
''').fetchall())
"

# Or via CLI
duckdb -c "SELECT count(*) FROM read_parquet('data.parquet')"

# Or in a Jupyter notebook
# import duckdb
# duckdb.sql('SELECT * FROM read_parquet(...) LIMIT 5').df()`,highlight:[1,4,6,11,17,18]}),(0,r.jsxs)("div",{className:"mt-4 rounded-md border border-primary/30 bg-primary/3 p-4",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,r.jsx)(k.Terminal,{className:"h-4 w-4 text-primary"}),(0,r.jsx)("p",{className:"text-sm font-semibold",children:"Try it in your browser — no install"}),(0,r.jsxs)(u.Badge,{variant:"outline",className:"text-[10px] gap-1 ml-auto",children:[(0,r.jsx)(j.Play,{className:"h-2.5 w-2.5"})," Pyodide (Python in Wasm)"]})]}),(0,r.jsxs)("p",{className:"text-[11px] text-muted-foreground mb-3 leading-relaxed",children:["This is a simplified version of the Silver conformance logic — pure Python (stdlib only), runs in the browser via Pyodide. Click ",(0,r.jsx)("strong",{children:"Run in browser"})," — the first click loads the ~10MB Pyodide runtime from CDN (~3-5s); subsequent runs are instant. The full DuckDB SQL above needs a real DuckDB binary; this demo shows the same logic in pure Python."]}),(0,r.jsx)(n.CodeBlock,{language:"python",filename:"duckdb_silver_demo.py",code:`# Pure-Python demo of Silver customer conformance logic
# Same logic as the PySpark sample — minus the Spark dependency.
# Runs in Pyodide (browser) using only stdlib.

import hashlib
import json
from datetime import datetime

# Synthetic Bronze data (in production: read from Kafka/Delta)
bronze_customers = [
    {"customer_id": "cust_1", "email": "alice@moderndatascieng.io", "status": "ACTIVE",   "region": "UK"},
    {"customer_id": "cust_2", "email": "bob@moderndatascieng.io",   "status": "ACTIVE",   "region": "EU"},
    {"customer_id": "cust_3", "email": "carol@moderndatascieng.io", "status": "INACTIVE", "region": None},
    {"customer_id": "cust_4", "email": "dave@moderndatascieng.io",  "status": "ACTIVE",   "region": "NA"},
]

# Silver conformance — generate surrogate keys, normalise, mask PII
loaded_at = datetime.utcnow().isoformat()
silver = []
for src in bronze_customers:
    email_hash = hashlib.md5(src["email"].lower().encode()).hexdigest()
    customer_sk = hashlib.md5(f"{email_hash}|{loaded_at}".encode()).hexdigest()[:16]
    silver.append({
        "customer_sk":  customer_sk,
        "customer_id":  src["customer_id"],
        "email_hash":   email_hash,
        "is_active":    src["status"] == "ACTIVE",
        "region_code":  src["region"] or "UNKNOWN",  # COALESCE
        "loaded_at":    loaded_at,
    })

# Print the conformed Silver table
print("=" * 78)
print("Silver.customer (conformed from Bronze)")
print("=" * 78)
print(f"{'customer_sk':<18} {'customer_id':<12} {'email_hash':<34} {'active':<8} {'region'}")
print("-" * 78)
for row in silver:
    print(f"{row['customer_sk']:<18} {row['customer_id']:<12} {row['email_hash']:<34} {str(row['is_active']):<8} {row['region_code']}")

print(f"\\nProcessed {len(silver)} customer rows. {sum(1 for r in silver if r['is_active'])} active.")
print(f"PII (email) redacted to MD5 hash: {silver[0]['email_hash'][:16]}...")
`}),(0,r.jsx)(c.PyodideRunner,{code:`import hashlib
import json
from datetime import datetime

bronze_customers = [
    {"customer_id": "cust_1", "email": "alice@moderndatascieng.io", "status": "ACTIVE",   "region": "UK"},
    {"customer_id": "cust_2", "email": "bob@moderndatascieng.io",   "status": "ACTIVE",   "region": "EU"},
    {"customer_id": "cust_3", "email": "carol@moderndatascieng.io", "status": "INACTIVE", "region": None},
    {"customer_id": "cust_4", "email": "dave@moderndatascieng.io",  "status": "ACTIVE",   "region": "NA"},
]

loaded_at = datetime.utcnow().isoformat()
silver = []
for src in bronze_customers:
    email_hash = hashlib.md5(src["email"].lower().encode()).hexdigest()
    customer_sk = hashlib.md5(f"{email_hash}|{loaded_at}".encode()).hexdigest()[:16]
    silver.append({
        "customer_sk":  customer_sk,
        "customer_id":  src["customer_id"],
        "email_hash":   email_hash,
        "is_active":    src["status"] == "ACTIVE",
        "region_code":  src["region"] or "UNKNOWN",
        "loaded_at":    loaded_at,
    })

print("=" * 78)
print("Silver.customer (conformed from Bronze)")
print("=" * 78)
print(f"{'customer_sk':<18} {'customer_id':<12} {'email_hash':<34} {'active':<8} {'region'}")
print("-" * 78)
for row in silver:
    print(f"{row['customer_sk']:<18} {row['customer_id']:<12} {row['email_hash']:<34} {str(row['is_active']):<8} {row['region_code']}")

print(f"\\nProcessed {len(silver)} customer rows. {sum(1 for r in silver if r['is_active'])} active.")
print(f"PII (email) redacted to MD5 hash: {silver[0]['email_hash'][:16]}...")`,buttonLabel:"Run in browser (Pyodide)"})]})]}),(0,r.jsxs)(h.DeeperThoughtSection,{pageTitle:"DuckDB",children:[(0,r.jsx)(h.DeeperThought,{title:"DuckDB IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,r.jsx)("p",{children:"This page about DuckDB is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. DuckDB connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where DuckDB sits in the computational-science landscape."})}),(0,r.jsx)(h.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,r.jsx)("p",{children:"In a decade, the specific tools on this page (DuckDB) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,r.jsx)(h.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,r.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,r.jsx)(h.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,r.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,r.jsx)(h.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,r.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,r.jsx)(o.ResearchDemo,{pageId:"duckdb"}),(0,r.jsx)(i.TrendAnticipation,{pageId:"duckdb"}),(0,r.jsx)(a.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"modern-big-data",reason:"Continue to modern big data — see also from this page"},{id:"databricks",reason:"Continue to databricks — see also from this page"}]}),(0,r.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,r.jsx)(t.default,{href:(0,l.hrefFor)("modern-big-data"),className:"text-sm text-primary hover:underline",children:"→ Continue to Modern Big Data Stack"}),(0,r.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,r.jsx)(t.default,{href:(0,l.hrefFor)("databricks"),className:"text-sm text-primary hover:underline",children:"→ Compare with Databricks Lakehouse"}),(0,r.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,r.jsx)(t.default,{href:(0,l.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ See ADR-013 (Iceberg as primary format)"})]})]})}e.s(["DuckdbPage",()=>C])}]);