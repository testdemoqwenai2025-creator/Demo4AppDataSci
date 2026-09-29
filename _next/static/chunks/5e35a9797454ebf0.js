(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var r=e.i(843476),a=e.i(271645),t=e.i(487486),o=e.i(519455),s=e.i(716675),n=e.i(194058),i=e.i(862824),l=e.i(344396),c=e.i(178583),d=e.i(778917),m=e.i(283086),u=e.i(972520),h=e.i(217923),p=e.i(522016),g=e.i(901752);function x({pageId:e}){let a=(0,l.researchForPage)(e);return 0===a.length?null:(0,r.jsxs)(i.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,r.jsx)(c.FileText,{className:"h-5 w-5"}),badge:`${a.length} paper${1===a.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[a.map((e,a)=>(0,r.jsx)(f,{entry:e},a)),(0,r.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[a.length," paper",1===a.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function f({entry:e}){let[i,l]=(0,a.useState)(!1),[c,x]=(0,a.useState)(null);return(0,r.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,r.jsxs)("div",{className:"space-y-1",children:[(0,r.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,r.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,r.jsx)(t.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,r.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,r.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,r.jsx)(d.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,r.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,r.jsx)(d.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,r.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,r.jsxs)(o.Button,{variant:"outline",size:"sm",onClick:()=>l(!i),className:"h-7 text-[11px] gap-1.5",children:[(0,r.jsx)(m.Sparkles,{className:"h-3 w-3"}),i?"Hide expected code":"Show expected code + visualization"]}),i&&(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsx)(s.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let r=e.indexOf("{"),a=e.lastIndexOf("}");if(r>=0&&a>r){let t=e.substring(r,a+1);x(JSON.parse(t))}}catch{}},hideTextOutput:!!c,compact:!0}),c?(0,r.jsxs)("div",{className:"space-y-2",children:[(0,r.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,r.jsx)(h.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,r.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,r.jsx)(n.AnalysisChart,{data:c,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,r.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,r.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,r.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,r.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,r.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,r.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,r.jsxs)(p.default,{href:(0,g.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,r.jsx)(u.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>x])},366101,763639,e=>{"use strict";var r=e.i(843476),a=e.i(271645),t=e.i(980376),o=e.i(122836),s=e.i(487486),n=e.i(519455),i=e.i(444609);e.s(["Languages",()=>i.default],763639);var i=i,l=e.i(463059);let c={python:"Python",scala:"Scala",go:"Go",rust:"Rust",java:"Java",sql:"SQL",yaml:"YAML",hcl:"Terraform",bash:"Bash",elixir:"Elixir",c:"C",typescript:"TypeScript"};function d({samples:e}){let[t,s]=(0,a.useState)(0),n=e[t];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"flex flex-wrap gap-1 border-b border-border/60 bg-muted/20 px-2 py-2",children:e.map((e,a)=>(0,r.jsx)("button",{onClick:()=>s(a),className:`text-[11px] px-2.5 py-1 rounded border transition-colors font-mono ${a===t?"bg-primary text-primary-foreground border-primary":"border-border/60 hover:bg-accent"}`,children:c[e.language]??e.language},e.language+e.filename))}),(0,r.jsxs)("div",{className:"p-3 bg-card",children:[n.note&&(0,r.jsx)("p",{className:"text-xs text-muted-foreground mb-2 italic",children:n.note}),(0,r.jsx)(o.CodeBlock,{code:n.code,language:n.language,filename:n.filename,highlight:n.highlight})]})]})}function m({title:e,description:a,samples:o,drawerMode:c=!1,drawerButtonLabel:m}){return c?(0,r.jsxs)(t.Sheet,{children:[(0,r.jsx)(t.SheetTrigger,{asChild:!0,children:(0,r.jsxs)(n.Button,{variant:"outline",className:"gap-2 w-full justify-between h-auto py-3",children:[(0,r.jsxs)("span",{className:"flex items-center gap-2",children:[(0,r.jsx)(i.default,{className:"h-4 w-4 text-primary"}),(0,r.jsx)("span",{className:"font-semibold text-sm",children:m??e}),(0,r.jsxs)(s.Badge,{variant:"outline",className:"text-[10px]",children:[o.length," languages"]})]}),(0,r.jsx)(l.ChevronRight,{className:"h-4 w-4 text-muted-foreground"})]})}),(0,r.jsxs)(t.SheetContent,{side:"right",className:"w-[min(680px,100vw)] sm:max-w-[680px] p-0 overflow-y-auto",children:[(0,r.jsxs)(t.SheetHeader,{className:"px-5 pt-5 pb-3 border-b border-border/60 bg-muted/30",children:[(0,r.jsxs)(t.SheetTitle,{className:"text-base flex items-center gap-2",children:[(0,r.jsx)(i.default,{className:"h-4 w-4 text-primary"}),e]}),a&&(0,r.jsx)(t.SheetDescription,{className:"text-xs",children:a})]}),(0,r.jsx)("div",{className:"border-b border-border/60",children:(0,r.jsx)(d,{samples:o})}),(0,r.jsx)("div",{className:"px-5 py-3 border-t border-border/60 bg-muted/20 text-[11px] text-muted-foreground",children:(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"File types commonly deployed:"})," ",Array.from(new Set(o.map(e=>e.filename.split(".").pop()||""))).join(", ")," — each compiles to a portable artefact (binary, .so, .beam, .jar, or interpreter-bound source)."]})})]})]}):(0,r.jsxs)("div",{className:"rounded-md border border-border/60 overflow-hidden",children:[(0,r.jsxs)("div",{className:"bg-muted/30 px-4 py-3 border-b border-border/60",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsx)(i.default,{className:"h-4 w-4 text-primary"}),(0,r.jsx)("p",{className:"text-sm font-semibold",children:e}),(0,r.jsxs)(s.Badge,{variant:"outline",className:"ml-auto text-[10px]",children:[o.length," languages"]})]}),a&&(0,r.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:a})]}),(0,r.jsx)(d,{samples:o})]})}e.s(["MultiLangSamples",()=>m],366101)},42561,e=>{"use strict";var r=e.i(843476),a=e.i(271645),t=e.i(846932),o=e.i(88653),s=e.i(519455),n=e.i(487486),i=e.i(431343),l=e.i(531278),c=e.i(63209),d=e.i(595468),m=e.i(966992);let u=new Uint8Array([0,97,115,109,1,0,0,0,1,7,1,96,2,127,127,1,127,3,2,1,0,7,7,1,3,97,100,100,0,0,10,9,1,7,0,32,0,32,1,106,11]);function h({buttonLabel:e="Run in browser (Wasm)",description:h="Loads a hand-assembled WebAssembly binary (41 bytes) and calls the exported `add(i32, i32) -> i32` function. In production, this would be a Rust/C binary compiled via `cargo build --target wasm32-wasi` or `emcc`.",sourceLanguage:p="Rust/C"}){let[g,x]=(0,a.useState)("idle"),[f,w]=(0,a.useState)(""),[y,b]=(0,a.useState)(null),v=(0,a.useCallback)(async()=>{x("running"),w("Instantiating WebAssembly module (41 bytes)…\n");let e=performance.now();try{let{instance:r}=await WebAssembly.instantiate(u),a=r.exports.add;if(!a)throw Error("Exported function 'add' not found in Wasm module");let t=Math.round(performance.now()-e);b(t);let o=[];for(let[e,r]of(o.push(`✓ Wasm module instantiated in ${t}ms (41 bytes)`),o.push(`  Source language: ${p} (compiled to wasm32)`),o.push("  Exported function: add(i32, i32) -> i32"),o.push(""),o.push("Test cases:"),[[2,3],[100,200],[42,58],[-10,20],[1e6,1]])){let t=a(e,r);o.push(`  add(${e}, ${r}) = ${t}`)}o.push(""),o.push("✓ All calls successful. The same .wasm binary would run in"),o.push("  any browser, any OS, any Wasm runtime — portable native code."),w(o.join("\n")),x("done")}catch(r){let e=r instanceof Error?r.message:String(r);w(r=>r+`
Error: ${e}`),x("error")}},[p]);return(0,r.jsxs)("div",{className:"mt-3 rounded-md border border-primary/30 bg-primary/3 p-3",children:[(0,r.jsxs)("div",{className:"flex items-center gap-2",children:[(0,r.jsxs)(s.Button,{size:"sm",variant:"running"===g?"outline":"default",className:"gap-1.5",onClick:v,disabled:"running"===g,children:["running"===g?(0,r.jsx)(l.Loader2,{className:"h-3.5 w-3.5 animate-spin"}):"done"===g?(0,r.jsx)(d.CheckCircle2,{className:"h-3.5 w-3.5"}):"error"===g?(0,r.jsx)(c.AlertCircle,{className:"h-3.5 w-3.5"}):(0,r.jsx)(i.Play,{className:"h-3.5 w-3.5"}),e]}),(0,r.jsxs)(n.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,r.jsx)(m.Cpu,{className:"h-2.5 w-2.5"}),"WebAssembly · 41 bytes"]}),null!==y&&"done"===g&&(0,r.jsxs)("span",{className:"text-[10px] text-muted-foreground",children:["Instantiated in ",y,"ms"]})]}),h&&(0,r.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2 leading-relaxed",children:h}),(0,r.jsx)(o.AnimatePresence,{children:"idle"!==g&&f&&(0,r.jsx)(t.motion.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-2",children:(0,r.jsx)("div",{className:`rounded-md bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] p-2.5 text-[11px] font-mono leading-relaxed overflow-x-auto code-scroll max-h-64 overflow-y-auto ${"error"===g?"border border-rose-500/40":"border border-emerald-500/30"}`,children:(0,r.jsx)("pre",{className:"whitespace-pre-wrap",children:f})})})})]})}e.s(["WasmRunner",()=>h])},167089,e=>{"use strict";var r=e.i(843476),a=e.i(522016),t=e.i(862824),o=e.i(342046),s=e.i(921371),n=e.i(580296),i=e.i(122836),l=e.i(366101),c=e.i(42561),d=e.i(901752),m=e.i(487486),u=e.i(332017),h=e.i(852008),p=e.i(39312),g=e.i(763639),x=e.i(25652),f=e.i(868054),w=e.i(658041),y=e.i(21218);let b=[{label:"Languages with Arrow bindings",value:"12+",hint:"Python, Rust, Go, C, C++, Java, JS, R, Ruby, .NET, MATLAB, Julia",deltaTone:"flat"},{label:"Zero-copy transfer overhead",value:"0ms",hint:"Same memory, different engines — no serialisation",deltaTone:"flat"},{label:"In-memory vs Parquet (on-disk)",value:"IPC ↔ Parquet",hint:"Arrow = in-memory columnar; Parquet = on-disk columnar",deltaTone:"flat"},{label:"Arrow Flight throughput",value:"10× gRPC",hint:"Columnar binary protocol for data transfer",deltaTone:"flat"}],v=`# ============================================================
# Apache Arrow (pyarrow) — zero-copy columnar data exchange
# Free: OSS (Apache 2.0). pip install pyarrow. ~30MB.
# ============================================================
import pyarrow as pa
import pyarrow.parquet as pq
import pyarrow.compute as pc

# Create an Arrow Table (columnar in-memory)
table = pa.table({
    "order_id":   ["ord_1", "ord_2", "ord_3", "ord_4"],
    "customer_id": ["cust_1", "cust_2", "cust_1", "cust_3"],
    "order_total": [42.50, 128.00, 15.99, 999.00],
    "region_code": ["UK", "EU", "UK", "NA"],
})

# Columnar operations — vectorised, zero-copy
total_revenue = pc.sum(table["order_total"]).as_py()
print(f"Total revenue: \xa3{total_revenue:.2f}")

# Filter — predicate pushdown (no row-by-row scan)
uk_orders = table.filter(pc.equal(table["region_code"], "UK"))
print(f"UK orders: {uk_orders.num_rows} rows, \xa3{pc.sum(uk_orders['order_total']).as_py():.2f}")

# Group by — Arrow Acero (in-memory compute engine)
grouped = table.group_by("customer_id").aggregate([
    ("order_total", "sum"),
    ("order_id", "count"),
])
print(f"\\nRevenue by customer:\\n{grouped}")

# Zero-copy to Parquet (Arrow → Parquet = same columnar layout, just disk format)
pq.write_table(table, "orders.parquet", compression="zstd")
print(f"\\nWrote {table.num_rows} rows to orders.parquet (Arrow → Parquet, zero-copy)")

# Zero-copy from DuckDB (DuckDB returns Arrow directly)
# import duckdb
# result = duckdb.sql("SELECT * FROM orders").arrow()  # Arrow Table, zero-copy
`,A=`// ============================================================
// Apache Arrow (arrow-rs) — Rust bindings for columnar data
// Free: OSS (Apache 2.0). cargo add arrow. ~5MB binary.
// ============================================================
use arrow::array::{Int32Array, StringArray, Float64Array};
use arrow::record_batch::RecordBatch;
use arrow::compute::sum;

fn main() {
    // Create Arrow arrays (columnar, zero-copy across FFI)
    let order_ids = StringArray::from(vec!["ord_1", "ord_2", "ord_3", "ord_4"]);
    let totals = Float64Array::from(vec![42.50, 128.00, 15.99, 999.00]);
    let regions = StringArray::from(vec!["UK", "EU", "UK", "NA"]);

    // Group into a RecordBatch (Arrow's table-like structure)
    let batch = RecordBatch::try_from_iter(vec![
        ("order_id", Box::new(order_ids) as Box<dyn arrow::array::Array>),
        ("order_total", Box::new(totals)),
        ("region_code", Box::new(regions)),
    ]).unwrap();

    println!("Schema: {:?}", batch.schema());
    println!("Rows: {}", batch.num_rows());
    println!("Columns: {}", batch.num_columns());

    // Vectorised compute — sum the order_total column
    let totals: &Float64Array = batch.column(1).as_any().downcast_ref().unwrap();
    let total = sum(totals).unwrap_or(0.0);
    println!("Total revenue: \xa3{:.2}", total);

    // Zero-copy handoff to Python via Arrow C Data Interface
    // (the same RecordBatch can be read by pyarrow without copying)
    let c_array = arrow::ffi::FFI_ArrowArray::empty();
    // ... export via Arrow C ABI (ABI-stable across all 12+ languages)
}

// Compile: cargo build --release
// The resulting binary uses Arrow's columnar format end-to-end.
// Same data structure readable by Python (pyarrow), Go, C, Java, JS.
`,j=`// ============================================================
// Apache Arrow (arrow-go) — Go bindings for columnar data
// Free: OSS (Apache 2.0). go get github.com/apache/arrow/go/v17.
// ============================================================
package main

import (
	"fmt"
	"github.com/apache/arrow/go/v17/arrow"
	"github.com/apache/arrow/go/v17/arrow/array"
	"github.com/apache/arrow/go/v17/arrow/memory"
)

func main() {
	alloc := memory.NewGoAllocator()

	// Create Arrow arrays (columnar, zero-copy)
	orderIDs := arrow.BinaryFromStrings(alloc, []string{"ord_1", "ord_2", "ord_3", "ord_4"})
	defer orderIDs.Release()

	totals := array.NewFloat64(alloc, []float64{42.50, 128.00, 15.99, 999.00})
	defer totals.Release()

	regions := arrow.BinaryFromStrings(alloc, []string{"UK", "EU", "UK", "NA"})
	defer regions.Release()

	// Build a Record (Arrow's table-like structure)
	schema := arrow.NewSchema([]arrow.Field{
		{Name: "order_id", Type: arrow.BinaryTypes.String},
		{Name: "order_total", Type: arrow.PrimitiveTypes.Float64},
		{Name: "region_code", Type: arrow.BinaryTypes.String},
	}, nil)

	cols := []arrow.Column{
		{Field: schema.Field(0), Data: array.NewDataArray(orderIDs, alloc)},
		{Field: schema.Field(1), Data: array.NewDataArray(totals, alloc)},
		{Field: schema.Field(2), Data: array.NewDataArray(regions, alloc)},
	}

	rec := array.NewRecord(schema, cols, 4)
	defer rec.Release()

	fmt.Printf("Schema: %v\\n", rec.Schema())
	fmt.Printf("Rows: %d, Columns: %d\\n", rec.NumRows(), rec.NumCols())

	// Vectorised sum
	var total float64
	for i := 0; i < int(rec.NumRows()); i++ {
		total += rec.Column(1).(*array.Float64).Value(i)
	}
	fmt.Printf("Total revenue: \xa3%.2f\\n", total)

	// Zero-copy to Parquet via arrow.parquet
	// Zero-copy to Python via Arrow C Data Interface
}

// Compile: go build -o arrow_demo
// Binary: ~35MB (Arrow runtime embedded)
`,N=`// ============================================================
// Apache Arrow C Data Interface — ABI-stable across ALL languages
// Free: OSS (Apache 2.0). #include <arrow/c/abi.h>
// ============================================================
// This is THE contract that makes Arrow universal.
// The same struct layout is used by Python, Rust, Go, Java, JS, R.
// A function written in C can be called from any Arrow-aware language
// without recompilation — zero-copy, ABI-stable.

#include <arrow/c/abi.h>
#include <stdint.h>
#include <string.h>

// ArrowArray = the columnar data layout (offsets + buffers + null bitmap)
// ArrowSchema = the metadata (field names, types, nested structure)
// Both are passed by pointer across the FFI boundary — no copying.

// Example: a C function that processes an Arrow string column
// callable from Python, Rust, Go, Java — same binary, no recompilation
int count_non_null_strings(
    struct ArrowArray* column,     // the data (passed by pointer)
    int64_t length,
    int64_t* result
) {
    if (column->n_buffers < 3) return -1;  // string columns have 3 buffers

    // Null bitmap buffer (buffer 0)
    const uint8_t* validity = (const uint8_t*) column->buffers[0];

    // Offsets buffer (buffer 1) — int32 per row
    const int32_t* offsets = (const int32_t*) column->buffers[1];

    // Data buffer (buffer 2) — the actual bytes
    const char* data = (const char*) column->buffers[2];

    int64_t count = 0;
    for (int64_t i = 0; i < length; i++) {
        // Check null bitmap (bit i in validity buffer)
        int is_valid = (validity == NULL) || ((validity[i / 8] >> (i % 8)) & 1);
        if (is_valid) {
            int32_t str_len = offsets[i + 1] - offsets[i];
            if (str_len > 0) count++;
        }
    }

    *result = count;
    return 0;  // success
}

// Compile: gcc -O3 -shared -fPIC -o arrow_count.so arrow_count.c
// Load from Python:  import ctypes; lib = ctypes.CDLL("arrow_count.so")
//                     lib.count_non_null_strings(col._ptr, len(col), byref(result))
// Load from Rust:    use libloading; let lib = libloading::Library::new("arrow_count.so")?;
// Load from Go:      Load via cgo or plugin package
// Same .so, same struct layout, zero-copy, all languages.`,S=[{aspect:"What it is",arrow:"In-memory columnar format",parquet:"On-disk columnar format"},{aspect:"Lifecycle",arrow:"Transient (compute)",parquet:"Persistent (storage)"},{aspect:"Compression",arrow:"None (fastest compute)",parquet:"Snappy/Zstd/LZ4 (storage-efficient)"},{aspect:"Zero-copy",arrow:"Native (pointer-pass)",parquet:"Needs decompression to Arrow"},{aspect:"Used by",arrow:"DuckDB, Polars, Pandas 2.0, Spark, Flink",parquet:"Same engines (for I/O)"},{aspect:"Transfer protocol",arrow:"Arrow Flight (gRPC + columnar)",parquet:"File transfer (S3, HDFS)"},{aspect:"Best for",arrow:"In-process + IPC",parquet:"Long-term storage + transport"}];function C(){return(0,r.jsxs)("div",{className:"space-y-8",children:[(0,r.jsx)(t.PageHeader,{eyebrow:"Columnar · the lingua franca",title:"Apache Arrow — the HTTP of data",description:"Arrow is the zero-copy columnar in-memory format that makes DuckDB, Polars, Pandas, Spark, and Flink interchangeable. The Arrow C Data Interface is an ABI-stable contract — the same function written in C can be called from Python, Rust, Go, Java without recompilation. Arrow Flight is the gRPC-based columnar transfer protocol that's 10× faster than traditional row-based APIs.",right:(0,r.jsxs)("div",{className:"flex gap-2",children:[(0,r.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,r.jsx)(p.Zap,{className:"h-3 w-3"})," Zero-copy"]}),(0,r.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,r.jsx)(h.Layers,{className:"h-3 w-3"})," ABI-stable"]})]})}),(0,r.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:b.map(e=>(0,r.jsx)(t.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,r.jsx)(t.SectionCard,{title:"My deeper thought: Arrow is the HTTP of data",description:"HTTP made the web universal by being boring, standard, and good enough. Arrow is doing the same for data.",icon:(0,r.jsx)(x.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,r.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,r.jsx)("p",{children:"Before HTTP, every application had its own protocol — FTP, Gopher, SMTP, custom TCP. The web was a mess of incompatible formats. HTTP fixed this by being boring: a simple request-response model, text headers, standardised methods. Not the fastest protocol, not the most feature-rich — but universal. Every browser, every server, every language speaks it. That universality is why the web won."}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Arrow is the HTTP of data."})," Before Arrow, every data system had its own in-memory format — Spark had Tungsten, Pandas had NumPy arrays, DuckDB had its own vector format, Postgres had its row format. Converting between them was expensive (serialise → deserialise → serialise again). Arrow fixed this by being boring: a standardised columnar layout, ABI-stable across languages, zero-copy between engines. Not the only format — Parquet is for storage, Avro is for streaming — but the ",(0,r.jsx)("em",{children:"universal in-memory contract"}),"."]}),(0,r.jsxs)("p",{children:["The implication: ",(0,r.jsx)("strong",{className:"text-foreground/80",children:"the engine is interchangeable; the format is sticky."})," Pick DuckDB for SQL ergonomics today, switch to Polars for Rust performance tomorrow, switch to Pandas for ecosystem — same Arrow data, zero conversion cost. This is why DuckDB's ",(0,r.jsx)(i.InlineCode,{children:".df()"})," call is free: it doesn't serialise to pandas' row format; it hands pandas a pointer to the Arrow buffer. The whole stack is columnar end-to-end."]}),(0,r.jsxs)("p",{children:["The next move, when WASI matures, is that Arrow + Wasm run ",(0,r.jsx)("strong",{className:"text-foreground/80",children:"in the browser"}),". Big data in your browser tab. The laptop-scale pattern meets the universal format — and the boundary between “big data” and “small data” disappears entirely."]})]})}),(0,r.jsx)(t.SectionCard,{title:"Multi-language: Arrow in Python, Rust, Go, C",description:"Same columnar data, 4 languages, zero-copy between them. The C Data Interface makes them all interoperable. Click to open the drawer.",icon:(0,r.jsx)(g.Languages,{className:"h-5 w-5"}),badge:"5 languages · drawer",children:(0,r.jsx)(l.MultiLangSamples,{drawerMode:!0,drawerButtonLabel:"View 5-language Arrow implementations",title:"Apache Arrow — 4 idiomatic implementations",description:"Python (pyarrow) · Rust (arrow-rs) · Go (arrow-go) · C (Arrow C Data Interface). The same RecordBatch is readable by all 4 without copying.",samples:[{language:"python",filename:"arrow_demo.py",note:"pyarrow — the most mature Arrow binding. Create tables, vectorised compute, zero-copy to/from Parquet + DuckDB. File types: .py (source), interpreted.",code:v,highlight:[8,9,10,11,12,13,15,16,18,19,22,23,28,29]},{language:"rust",filename:"arrow_demo.rs",note:"arrow-rs — Rust-native Arrow. Zero-copy RecordBatch, vectorised compute, FFI export to Python via C Data Interface. File types: .rs → binary.",code:A,highlight:[8,9,10,11,14,15,16,17,18,19,25,26,27,31]},{language:"go",filename:"arrow_demo.go",note:"arrow-go — Go-native Arrow. Same columnar format, same zero-copy. File types: .go → binary.",code:j,highlight:[12,13,14,16,17,18,21,22,23,24,25,26,27,28,40,41]},{language:"c",filename:"arrow_c_interface.c",note:"Arrow C Data Interface — THE ABI-stable contract. Same struct layout used by ALL 12+ languages. A C function callable from Python/Rust/Go/Java without recompilation. File types: .c → .so shared library.",code:N,highlight:[10,11,12,13,15,16,17,18,20,21,23,24,25,30,31,32,33,34,35,36,37,38,39,40,41,42]}]})}),(0,r.jsx)(t.SectionCard,{title:"Try it: WebAssembly execution (Rust/C → Wasm)",description:"The C code above, compiled to Wasm, would run in your browser. This demo uses a hand-assembled 41-byte Wasm module (exports `add(i32, i32) -> i32`). In production: cargo build --target wasm32-wasi (Rust) or emcc (C/C++).",icon:(0,r.jsx)(f.Terminal,{className:"h-5 w-5"}),badge:"Wasm",children:(0,r.jsx)(c.WasmRunner,{sourceLanguage:"Rust/C → wasm32-wasi",buttonLabel:"Run Wasm module (41 bytes)",description:"Hand-assembled WebAssembly binary. In production: compile the Rust/C code above with `cargo build --target wasm32-wasi` or `emcc -o module.wasm module.c`, then host the .wasm binary alongside the page. The WasmRunner loads it via WebAssembly.instantiate() and calls the exported function."})}),(0,r.jsx)(t.SectionCard,{title:"Arrow vs Parquet — in-memory vs on-disk",description:"Both are columnar. Arrow is for compute (in-memory); Parquet is for storage (on-disk). They convert to each other with zero overhead (same columnar layout, different disk format).",icon:(0,r.jsx)(w.Database,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"w-full text-sm",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,r.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Aspect"}),(0,r.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Arrow"}),(0,r.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Parquet"})]})}),(0,r.jsx)("tbody",{children:S.map(e=>(0,r.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,r.jsx)("td",{className:"px-3 py-2 text-xs font-semibold",children:e.aspect}),(0,r.jsx)("td",{className:"px-3 py-2 text-[11px] text-foreground/80",children:e.arrow}),(0,r.jsx)("td",{className:"px-3 py-2 text-[11px] text-muted-foreground",children:e.parquet})]},e.aspect))})]})})}),(0,r.jsx)(t.SectionCard,{title:"Arrow Flight — the 10× faster data transfer protocol",description:"gRPC + columnar binary = 10× throughput vs row-based APIs. Used by Dremio, InfluxDB 3.0, Voltron Data for high-volume data serving.",icon:(0,r.jsx)(y.Activity,{className:"h-5 w-5"}),children:(0,r.jsx)(i.CodeBlock,{language:"python",filename:"arrow_flight_demo.py",code:`# Arrow Flight — columnar data transfer over gRPC
# 10x faster than REST/JSON for bulk data transfer
import pyarrow.flight as fl

# Client: connect to a Flight server (e.g., Dremio, InfluxDB 3.0)
client = fl.connect("grpc://flight-server:9615")

# Send a SQL query — response comes back as Arrow RecordBatch stream
# (columnar binary, not JSON rows — zero deserialisation overhead)
reader = client.do_get(fl.CommandDescriptor(
    "SELECT * FROM moderndatascieng.sales.fct_orders WHERE order_ts > now() - interval '1 day'"
))

# Receive Arrow RecordBatches — already in columnar format
# No JSON parsing, no row-to-column conversion, zero-copy to pandas
total_rows = 0
for batch in reader:
    total_rows += batch.data.num_rows
    # batch.data is an Arrow RecordBatch — hand to DuckDB/Polars/Pandas instantly

print(f"Received {total_rows} rows via Arrow Flight (columnar binary, 10x faster than REST)")`,highlight:[5,6,9,10,11,12,16,17,18,20]})}),(0,r.jsxs)(u.DeeperThoughtSection,{pageTitle:"Arrow",children:[(0,r.jsx)(u.DeeperThought,{title:"Arrow IS the columnar memory format — and it's the universal data interchange",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,r.jsx)("p",{children:"Apache Arrow's columnar format IS the lingua franca of data engineering. Every modern analytics engine (Spark, Databricks, Snowflake, DuckDB, Pandas) reads/writes Arrow in-memory. The columnar layout (values stored contiguously per column, not per row) enables vectorized SIMD execution — 10x faster than row-oriented processing. Arrow IS to data what UTF-8 is to text: a universal interchange format that eliminates serialization overhead between systems."})}),(0,r.jsx)(u.DeeperThought,{title:"Arrow's zero-copy IPC IS the end of serialization",connectedTo:"ADR-001 (platform architecture)",children:(0,r.jsx)("p",{children:"Arrow's Inter-Process Communication (IPC) protocol enables zero-copy data transfer between processes. If Spark writes Arrow data to shared memory, DuckDB can read it without deserialization — no CPU spent on copying or parsing. This IS the same principle as memory-mapped files (mmap) — the data IS the message. The serialization tax (JSON → parse → object → serialize → parse) IS eliminated. Arrow IS the post-serialization era."})}),(0,r.jsx)(u.DeeperThought,{title:"Arrow Flight IS gRPC for data — and it's the right transport",connectedTo:"ADR-050 (fold-section architecture)",children:(0,r.jsx)("p",{children:"Arrow Flight uses gRPC (HTTP/2 + Protocol Buffers) for columnar data transport. Unlike ODBC/JDBC (which add 3-5x overhead from row-oriented wire format + deserialization), Flight streams Arrow batches directly — zero-copy from sender to receiver. The 10Gbps+ throughput IS because the wire format IS the in-memory format. Arrow Flight IS to data what HTTP/2 is to web — a transport that doesn't tax the payload."})}),(0,r.jsx)(u.DeeperThought,{title:"Arrow's C++ kernel IS the universal compute engine",connectedTo:"ADR-034 (ESM-2 + AlphaFold2)",children:(0,r.jsx)("p",{children:"Arrow's C++ kernel (Gandiva, compute functions, expression evaluation) is shared across all Arrow-compatible engines (Acero in Spark, DuckDB's execution engine, Polars' Rust bindings). When you call df.filter() in Pandas, Polars, or DuckDB — the SAME C++ code runs. The kernel IS the universal compute engine. Python/R/Java are just bindings. The math (columnar scan + predicate pushdown + vectorized execution) stays; the language binding changes."})}),(0,r.jsx)(u.DeeperThought,{title:"Arrow IS to data what NumPy is to ML — the universal array format",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,r.jsx)("p",{children:"NumPy defined the N-dimensional array (ndarray) as the universal data structure for ML. Arrow defines the columnar table (RecordBatch) as the universal data structure for analytics. Both are: (1) memory-contiguous, (2) language-agnostic, (3) zero-copy, (4) SIMD-vectorized. NumPy IS for tensors; Arrow IS for tables. The pattern (define the in-memory format → every tool adopts it → zero-copy between tools) IS the same. Arrow IS NumPy for data engineering."})})]}),(0,r.jsx)(s.ResearchDemo,{pageId:"arrow"}),(0,r.jsx)(n.TrendAnticipation,{pageId:"arrow"}),(0,r.jsx)(o.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"duckdb",reason:"Continue to duckdb — see also from this page"},{id:"modern-big-data",reason:"Continue to modern big data — see also from this page"}]}),(0,r.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,r.jsx)(a.default,{href:(0,d.hrefFor)("duckdb"),className:"text-sm text-primary hover:underline",children:"→ DuckDB (Arrow-native OLAP)"}),(0,r.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,r.jsx)(a.default,{href:(0,d.hrefFor)("modern-big-data"),className:"text-sm text-primary hover:underline",children:"→ Modern Big Data Stack"}),(0,r.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,r.jsx)(a.default,{href:(0,d.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ See ADR-016 (Wasm as universal runtime)"})]})]})}e.s(["ArrowPage",()=>C])}]);