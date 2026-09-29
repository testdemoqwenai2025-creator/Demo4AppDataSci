(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,634515,e=>{"use strict";var t=e.i(843476),r=e.i(271645),a=e.i(522016),s=e.i(862824),i=e.i(342046),o=e.i(901752),n=e.i(487486),l=e.i(732576),c=e.i(846932),d=e.i(88653),m=e.i(515288),u=e.i(122836),h=e.i(716675),p=e.i(664659),f=e.i(997625),g=e.i(966992),x=e.i(21218),b=e.i(217923),y=e.i(254360),v=e.i(283086);function T({latex:a}){let s=(0,r.useRef)(null),[i,o]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let t=!1;if(s.current&&!i)return e.A(839484).then(e=>{if(t||!s.current)return;let r=e.default??e;try{r.render(a,s.current,{throwOnError:!1,displayMode:!1}),o(!0)}catch{s.current&&(s.current.textContent=a),o(!0)}}).catch(()=>{s.current&&(s.current.textContent=a),o(!0)}),()=>{t=!0}},[a,i]),(0,t.jsx)("span",{ref:s,className:"text-sm"})}function N({label:e,icon:a,hint:s,children:i}){let[o,n]=(0,r.useState)(!1);return(0,t.jsxs)("div",{className:"pt-2",children:[(0,t.jsxs)("button",{onClick:()=>n(!o),className:`group flex items-center gap-2 w-full text-left rounded-md border transition-colors ${o?"border-primary/30 bg-primary/5":"border-border/40 hover:border-primary/40 hover:bg-primary/3"} px-3 py-2`,"aria-expanded":o,children:[a,(0,t.jsx)("span",{className:`text-xs font-medium ${o?"text-primary":"text-muted-foreground group-hover:text-foreground"} transition-colors`,children:o?e.replace("Show","Hide"):e}),s&&!o&&(0,t.jsx)("span",{className:"text-[10px] text-muted-foreground/70 ml-1 hidden sm:inline",children:s}),(0,t.jsx)(p.ChevronDown,{className:`h-3.5 w-3.5 ml-auto transition-transform ${o?"rotate-180":""} ${o?"text-primary":"text-muted-foreground"}`})]}),(0,t.jsx)(d.AnimatePresence,{initial:!1,children:o&&(0,t.jsx)(c.motion.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.2},className:"overflow-hidden",children:(0,t.jsx)("div",{className:"pt-2 pb-1",children:i})})})]})}function w({spec:e}){let[a,s]=(0,r.useState)(!1),[i,o]=(0,r.useState)(0),[l,w]=(0,r.useState)(null),[_,S]=(0,r.useState)(!1),k=e.accent??"oklch(0.65 0.16 250)";return(0,t.jsxs)(m.Card,{className:"overflow-hidden border-border/60 transition-shadow hover:shadow-md",style:{borderLeftWidth:4,borderLeftColor:k},children:[(0,t.jsx)(m.CardHeader,{className:"pb-3 cursor-pointer",onClick:()=>s(!a),children:(0,t.jsxs)("div",{className:"flex items-start gap-3",children:[(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("div",{className:"flex items-center gap-1.5 flex-wrap mb-1",children:e.domains.map((e,r)=>(0,t.jsx)(n.Badge,{variant:"outline",className:"text-[9px] gap-0.5 font-mono px-1.5 py-0",style:{color:k,borderColor:k},children:e},r))}),(0,t.jsx)(m.CardTitle,{className:"text-sm leading-tight",children:e.title}),(0,t.jsx)(m.CardDescription,{className:"text-[11px] mt-1 font-mono",children:e.subtitle})]}),(0,t.jsx)(p.ChevronDown,{className:`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${a?"rotate-180":""}`})]})}),(0,t.jsx)(d.AnimatePresence,{initial:!1,children:a&&(0,t.jsx)(c.motion.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.25},className:"overflow-hidden",children:(0,t.jsxs)(m.CardContent,{className:"pt-0 pb-3 space-y-1",children:[e.mathLatex&&(0,t.jsxs)("div",{className:"pt-2 pb-1",children:[(0,t.jsxs)("div",{className:"flex items-baseline gap-2 flex-wrap rounded-md bg-muted/30 px-3 py-1.5",children:[(0,t.jsx)(y.Sigma,{className:"h-3.5 w-3.5 text-primary/60 shrink-0"}),(0,t.jsx)(T,{latex:e.mathLatex})]}),e.mathExplanation&&(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground leading-relaxed mt-1.5",children:e.mathExplanation})]}),e.codeTabs&&e.codeTabs.length>0&&(0,t.jsxs)(N,{label:"Show code",icon:(0,t.jsx)(f.Code2,{className:"h-3.5 w-3.5 text-primary/60"}),hint:`click to view ${e.codeTabs.length} languages →`,children:[(0,t.jsx)("div",{className:"flex gap-1 mb-2",children:e.codeTabs.map((e,r)=>(0,t.jsx)("button",{onClick:()=>o(r),className:`text-[10px] px-2 py-0.5 rounded font-mono transition-colors ${i===r?"bg-primary/10 text-primary font-semibold":"bg-muted/40 text-muted-foreground hover:bg-muted"}`,children:e.lang},r))}),e.codeTabs[i]&&(0,t.jsx)(u.CodeBlock,{code:e.codeTabs[i].code,language:e.codeTabs[i].lang.toLowerCase(),filename:e.codeTabs[i].filename})]}),e.tools&&e.tools.length>0&&(0,t.jsxs)(N,{label:"Show tools",icon:(0,t.jsx)(g.Cpu,{className:"h-3.5 w-3.5 text-primary/60"}),hint:`${e.tools.length} tools compared →`,children:[(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-1.5",children:e.tools.map((e,r)=>(0,t.jsxs)("div",{className:"rounded border border-border/40 p-2 bg-muted/20",children:[(0,t.jsx)("p",{className:"text-[11px] font-semibold",children:e.name}),(0,t.jsx)("p",{className:"text-[9px] font-mono text-primary mt-0.5",children:e.functionCall}),e.notes&&(0,t.jsx)("p",{className:"text-[9px] text-muted-foreground mt-0.5",children:e.notes})]},r))}),e.toolsInsight&&(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground italic mt-2",children:e.toolsInsight})]}),e.runnableCode&&(0,t.jsxs)(N,{label:"Show analysis",icon:(0,t.jsx)(x.Activity,{className:"h-3.5 w-3.5 text-primary/60"}),hint:"click to run interactive analysis in browser →",children:[(0,t.jsx)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 mb-2",children:(0,t.jsx)(h.PyodideRunner,{code:e.runnableCode,preamble:e.runnablePreamble,buttonLabel:"Run analysis in browser",onOutput:e=>{S(!0);try{let t=e.trim().split("\n").filter(e=>e.startsWith("{")||e.startsWith("[")).join("");w(JSON.parse(t))}catch{}},compact:!0})}),_&&e.outcomes&&e.outcomes.length>0&&(0,t.jsxs)(c.motion.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.2},children:[(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-2 mt-2",children:e.outcomes.map((e,r)=>(0,t.jsxs)("div",{className:"rounded-md border border-border/40 p-2 bg-muted/20",children:[(0,t.jsx)("p",{className:"text-[9px] uppercase tracking-wider text-muted-foreground",children:e.science}),(0,t.jsx)("p",{className:"text-[11px] font-semibold mt-0.5",children:e.sector}),(0,t.jsx)("p",{className:"text-base font-bold font-mono mt-1",style:{color:k},children:e.value}),e.error&&(0,t.jsxs)("p",{className:"text-[9px] text-muted-foreground mt-0.5",children:["±",e.error]}),(0,t.jsx)("p",{className:"text-[9px] text-muted-foreground mt-1 leading-snug",children:e.description})]},r))}),e.analysisInsight&&(0,t.jsx)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5 mt-2",children:(0,t.jsxs)("p",{className:"text-[11px] text-foreground/80 leading-relaxed",children:[(0,t.jsx)(v.Sparkles,{className:"h-3 w-3 inline mr-1 text-primary"}),e.analysisInsight]})})]}),!_&&(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground/70 italic mt-1",children:'↑ Click "Run analysis in browser" to see charts, stats, and cross-domain outcomes'})]}),e.hasChart&&l&&(0,t.jsx)(N,{label:"Show visualization",icon:(0,t.jsx)(b.BarChart3,{className:"h-3.5 w-3.5 text-primary/60"}),children:(0,t.jsxs)("div",{className:"rounded-md border border-border/40 bg-muted/20 p-3",children:[(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mb-2",children:"Analysis output (JSON — Recharts rendering coming next):"}),(0,t.jsx)("pre",{className:"text-[9px] font-mono max-h-40 overflow-auto",children:JSON.stringify(l,null,2).substring(0,800)})]})}),(0,t.jsx)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-2.5 mt-2",children:(0,t.jsxs)("p",{className:"text-[11px] text-foreground/90 leading-relaxed",children:[(0,t.jsx)("strong",{children:"Elegance IS the intersection:"})," ",e.insight]})}),e.citations&&e.citations.length>0&&(0,t.jsx)("div",{className:"pt-1.5 border-t border-border/30 mt-2",children:e.citations.map((e,r)=>(0,t.jsx)("p",{className:"text-[9px] text-muted-foreground italic mt-0.5",children:e},r))})]})})})]})}let _={id:"hyperloglog-concept",title:"HyperLogLog — the universal counter",subtitle:"E = α_m m² (Σ 2^(-M_j))^(-1)",domains:["Data Engineering","Genomics","Network Security"],accent:"oklch(0.65 0.18 280)",toolBadges:["HyperLogLog","Snowflake","Jellyfish","Redis"],mathLatex:"E = \\alpha_m \\, m^2 \\left( \\sum_{j=1}^{m} 2^{-M_j} \\right)^{-1}, \\qquad \\text{RE} \\approx \\frac{1.04}{\\sqrt{m}}",mathExplanation:`The HyperLogLog estimator takes the maximum leading-zero count M_j observed across m registers and computes the harmonic mean of 2^(-M_j) values. The bias-corrected constant α_m and small-range correction (linear counting when E < 2.5m) together give a relative error of 1.04/√m. With m = 2^14 = 16,384 registers (12 KB memory), the error is ~0.81% — independent of the true cardinality, from 1 to 10^10.`,codeTabs:[{lang:"Python",filename:"hyperloglog.py",code:`# HyperLogLog — probabilistic cardinality estimation
# Free: OSS (MIT). Pure Python, no numpy needed.
# Reference: Flajolet et al. (2007)

M_BITS = 14  # 2^14 = 16,384 registers → 12 KB memory
M = 1 << M_BITS
ALPHA = 0.7213 / (1 + 1.079 / M)  # bias correction

def hll_add(registers, item):
    """Add an item to the HLL sketch (in place)."""
    h = hash(item) & 0xFFFFFFFF  # 32-bit hash
    idx = h >> (32 - M_BITS)     # top M_BITS → register index
    w = (h << M_BITS) & 0xFFFFFFFF
    # Count leading zeros + 1 in the remaining bits
    rank = (32 - M_BITS) - (w.bit_length() - 1) if w > 0 else (32 - M_BITS) + 1
    if rank > registers[idx]:
        registers[idx] = rank

def hll_estimate(registers):
    """Estimate cardinality from the register array."""
    m = len(registers)
    Z = 1.0 / sum(2.0 ** (-r) for r in registers)
    E = ALPHA * m * m * Z
    # Small-range correction (linear counting)
    V = sum(1 for r in registers if r == 0)
    if E < 2.5 * m and V > 0:
        E = m * __import__('math').log(m / V)
    return int(round(E))`},{lang:"Rust",filename:"hyperloglog.rs",code:`// HyperLogLog — Rust implementation for zero-copy streaming
// Free: OSS (Apache-2.0). cargo add ahash
use ahash::AHasher;
use std::hash::Hasher;

const M_BITS: u32 = 14;
const M: usize = 1 << M_BITS;
const ALPHA: f64 = 0.7213 / (1.0 + 1.079 / M as f64);

struct HyperLogLog {
    registers: [u8; M],
}

impl HyperLogLog {
    fn add<T: AsRef<[u8]>>(&mut self, item: T) {
        let mut hasher = AHasher::default();
        hasher.write(item.as_ref());
        let h = hasher.finish() as u32;
        let idx = (h >> (32 - M_BITS)) as usize;
        let w = (h << M_BITS) & 0xFFFFFFFF;
        let rank = if w > 0 {
            (32 - M_BITS) - w.leading_zeros() + 1
        } else { (32 - M_BITS) + 1 };
        if rank > self.registers[idx] {
            self.registers[idx] = rank;
        }
    }

    fn estimate(&self) -> u64 {
        let z: f64 = self.registers.iter()
            .map(|&r| 2.0_f64.powi(-(r as i32)))
            .sum::<f64>().recip();
        let e = ALPHA * (M * M) as f64 * z;
        let v = self.registers.iter().filter(|&&r| r == 0).count();
        (if e < 2.5 * M as f64 && v > 0 {
            (M as f64) * ((M as f64) / v as f64).ln()
        } else { e }).round() as u64
    }

    fn merge(&mut self, other: &HyperLogLog) {
        for i in 0..M {
            self.registers[i] = self.registers[i].max(other.registers[i]);
        }
    }
}`}],tools:[{name:"Snowflake",functionCall:"APPROX_COUNT_DISTINCT(user_id)",notes:"Built-in HLL — 12 KB per group"},{name:"Apache Spark",functionCall:"approx_count_distinct(col)",notes:"PySpark + Delta Lake"},{name:"Redis",functionCall:"PFCOUNT key",notes:"Real-time streaming cardinality"},{name:"Jellyfish",functionCall:"jellyfish count",notes:"Genome k-mer counting (bioinformatics)"},{name:"Google BigQuery",functionCall:"APPROX_COUNT_DISTINCT()",notes:"HLL++ (Google's variant)"},{name:"ClickHouse",functionCall:"uniq() / uniqHLL12()",notes:"Column-store HLL"}],toolsInsight:"Snowflake's APPROX_COUNT_DISTINCT IS Spark's approx_count_distinct IS Redis's PFCOUNT — all three call the same hash→bucket→max-zeros→harmonic-mean algorithm internally. The function name changes; the math doesn't.",runnableCode:`# Interactive HLL demo — run in browser via Pyodide
import random, math, json

random.seed(42)
M_BITS = 14
M = 1 << M_BITS
ALPHA = 0.7213 / (1 + 1.079 / M)

def hll_add(registers, item):
    h = hash(item) & 0xFFFFFFFF
    idx = h >> (32 - M_BITS)
    w = (h << M_BITS) & 0xFFFFFFFF
    rank = (32 - M_BITS) - (w.bit_length() - 1) if w > 0 else (32 - M_BITS) + 1
    if rank > registers[idx]:
        registers[idx] = rank

def hll_estimate(registers):
    m = len(registers)
    Z = 1.0 / sum(2.0 ** (-r) for r in registers)
    E = ALPHA * m * m * Z
    V = sum(1 for r in registers if r == 0)
    if E < 2.5 * m and V > 0:
        E = m * math.log(m / V)
    return int(round(E))

# Simulate: 1M unique users
N_TRUE = 1_000_000
registers = [0] * M
for i in range(N_TRUE):
    hll_add(registers, f"user_{i}")

estimate = hll_estimate(registers)
rel_error = abs(estimate - N_TRUE) / N_TRUE * 100
memory_bytes = len(registers)
exact_memory_mb = N_TRUE * 40 / 1024 / 1024

# Build stats for the outcome tiles
print(json.dumps({
    "true_cardinality": N_TRUE,
    "hll_estimate": estimate,
    "relative_error": round(rel_error, 2),
    "hll_memory_kb": round(memory_bytes / 1024, 1),
    "exact_memory_mb": round(exact_memory_mb, 0),
    "compression_ratio": int(exact_memory_mb * 1024 / memory_bytes),
    "domains": [
        {"name": "Data Engineering", "scale": "10B events/day", "tool": "Snowflake APPROX_COUNT_DISTINCT"},
        {"name": "Genomics", "scale": "3B k-mers/genome", "tool": "Jellyfish"},
        {"name": "Network Security", "scale": "50M IPs/DDoS", "tool": "Redis PFCOUNT"}
    ]
}))`,outcomes:[{science:"Data Engineering",sector:"Snowflake / Spark — 10B Kafka events/day",value:"12 KB vs 400 GB",error:"0.81%",description:"COUNT(DISTINCT user_id) at 10B scale. HLL sketch is mergeable across Spark nodes — take the max of each register pair for distributed counting."},{science:"Genomics",sector:"1000-Genomes chr-1 — 3B unique k-mers",value:"12 KB vs 90 GB",error:"0.81%",description:"Jellyfish and BCALM2 use HLL internally for k-mer counting at genome scale. The same hash→bucket→max-zeros counts DNA sequences."},{science:"Network Security",sector:"DDoS monitor — 50M unique source IPs",value:"12 KB vs 200 MB",error:"1.3%",description:"Redis PFCOUNT uses HLL for real-time cardinality. Memory is BOUNDED — no matter how many IPs arrive, the sketch stays at 12 KB per time window."}],analysisInsight:"The hash function doesn't know whether the input is a user ID, a DNA sequence, or an IP address — it maps all three to a uniform distribution, and the max leading-zero count encodes the cardinality. HLL achieves 33 million × memory compression with <1% error.",hasChart:!0,insight:"HyperLogLog IS the universal counter. A data engineer counting 10B unique user_ids (Snowflake APPROX_COUNT_DISTINCT), a bioinformatician counting 3B unique k-mers (Jellyfish), and a security analyst counting 50M unique source IPs (Redis PFCOUNT) all run the SAME algorithm: hash → bucket → max leading zeros → harmonic mean. Three sciences, one sketch, 33M× compression.",citations:["Flajolet, P. et al. (2007). HyperLogLog: the analysis of a near-optimal cardinality estimation algorithm. Analysis of Algorithms, 127–146.","Marçais, G. & Kingsford, C. (2011). A fast, lock-free approach for efficient parallel counting of occurrences of k-mers. Bioinformatics 27(6):764–770.","Heule, S. et al. (2013). HyperLogLog in Practice. EDBT/ICDT."]};var S=e.i(332017),k=e.i(658041),j=e.i(39312),L=e.i(852008),C=e.i(794827),I=e.i(955716),B=e.i(640524),M=e.i(581418),F=e.i(828579),O=e.i(635408),D=e.i(485362),D=D;let P=[{label:"Streaming ingestion throughput",value:"1.2M events/s",hint:"PySpark + cloudFiles + Delta on a 50-node i3.2xlarge cluster",deltaTone:"flat"},{label:"HLL memory footprint",value:"12 KB",hint:"0.5% relative error @ 2^14 registers — vs 8 GB for COUNT(DISTINCT) at 1B rows",deltaTone:"down"},{label:"Delta Z-Order scan reduction",value:"85%",hint:"On (customer_id, event_ts) — 1 TB scan → 150 GB scan",deltaTone:"down"},{label:"Small-file count after OPTIMIZE",value:"12 files",hint:"Was 18,400 — auto-compact triggered every 60 min when 50+ small files accumulate",deltaTone:"down"}],E=`# ============================================================
# HPC-Medallion Ingest — PySpark + Delta Lake streaming
# Free: OSS (Apache-2.0). pip install pyspark delta-spark.
# Cluster: 50x i3.2xlarge (8 vCPU, 61GB RAM, 7.6TB NVMe SSD)
# ============================================================
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, expr

spark = SparkSession.builder \\
    .appName("HPC-Medallion-Ingest") \\
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \\
    .config("spark.databricks.delta.optimize.maxFileSize", "134217728") \\
    .getOrCreate()

# Streaming ingestion with schema enforcement and liquid clustering optimization
streaming_df = spark.readStream \\
    .format("cloudFiles") \\
    .option("cloudFiles.format", "parquet") \\
    .load("s3a://bronze-raw-events/")

query = streaming_df.writeStream \\
    .format("delta") \\
    .outputMode("append") \\
    .option("checkpointLocation", "s3a://checkpoints/silver-events/") \\
    .trigger(processingTime='10 seconds') \\
    .start("s3a://silver-conformed-events/")
`,A=`This is the canonical Bronze → Silver streaming ingestion pattern
at the heart of the platform's HPC layer. The SparkSession config
sets the max Delta file size to 128 MB (134217728 bytes) — the
sweet spot for columnar scan parallelism on i3.2xlarge NVMe. The
cloudFiles format auto-detects new Parquet files in the Bronze
S3 prefix; the writeStream to Silver Delta uses checkpointing
for exactly-once semantics even across cluster restarts.`,H=`# ============================================================
# HyperLogLog — probabilistic cardinality estimation
# Free: OSS (MIT). Pure Python + numpy. ~50 lines.
# Reference: Flajolet et al. (2007) "HyperLogLog: the analysis
# of a near-optimal cardinality estimation algorithm"
# ============================================================
import numpy as np
import json

# HLL with m=2^14 registers → ~0.5% relative error
M_BITS = 14
M = 1 << M_BITS  # 16384 registers
ALPHA = 0.7213 / (1 + 1.079 / M)  # bias-corrected constant

def hll_add(registers, item):
    """Add an item to the HLL sketch (in place)."""
    h = hash(item) & 0xFFFFFFFF  # 32-bit hash
    # Top M_BITS bits → register index
    idx = h >> (32 - M_BITS)
    # Remaining bits → count leading zeros + 1
    w = (h << M_BITS) & 0xFFFFFFFF
    rank = (32 - M_BITS) - (w.bit_length() - 1) if w > 0 else (32 - M_BITS) + 1
    if rank > registers[idx]:
        registers[idx] = rank

def hll_estimate(registers):
    """Estimate cardinality from the register array."""
    m = len(registers)
    Z = 1.0 / sum(2.0 ** (-r) for r in registers)
    E = ALPHA * m * m * Z
    # Small-range correction (when E < 2.5m)
    V = sum(1 for r in registers if r == 0)
    if E < 2.5 * m and V > 0:
        E = m * np.log(m / V)
    return int(round(E))

# Simulate: 1M unique user IDs
np.random.seed(42)
N_TRUE = 1_000_000
true_users = [f"user_{i}" for i in range(N_TRUE)]
registers = np.zeros(M, dtype=np.uint8)
for u in true_users:
    hll_add(registers, u)

estimate = hll_estimate(registers)
rel_error = abs(estimate - N_TRUE) / N_TRUE * 100
memory_bytes = registers.nbytes

# Build chart: error vs number of registers (m)
# Show how HLL trades memory for accuracy
ms = [1 << b for b in range(4, 17)]  # 16 to 65536 registers
errors = []
for m_test in ms:
    # Theoretical relative error: 1.04 / sqrt(m)
    errors.append(1.04 / np.sqrt(m_test) * 100)

print(json.dumps({
    "chart_type": "line",
    "title": "HLL relative error vs number of registers (theoretical 1.04/√m)",
    "x_label": "Number of registers m (log scale)",
    "y_label": "Relative error (%)",
    "series": [{
        "name": "HLL error bound",
        "data": [{"x": int(m), "y": float(e)} for m, e in zip(ms, errors)]
    }],
    "stats": [
        {"label": "True cardinality", "value": f"{N_TRUE:,}", "tone": "default"},
        {"label": "HLL estimate", "value": f"{estimate:,}", "tone": "success" if rel_error < 1 else "warning"},
        {"label": "Relative error", "value": f"{rel_error:.2f}%", "tone": "success" if rel_error < 1 else "warning"},
        {"label": "Memory used", "value": f"{memory_bytes / 1024:.1f} KB", "tone": "success"},
    ],
    "reference_lines": [
        {"y": 0.5, "label": "0.5% target (m=16384)", "color": "#10b981"},
        {"y": 5.0, "label": "5% (m=512)", "color": "#f59e0b"}
    ],
    "summary": f"HLL estimates {N_TRUE:,} unique users as {estimate:,} ({rel_error:.2f}% error) using only {memory_bytes / 1024:.1f} KB of memory. The equivalent COUNT(DISTINCT) operation would require materialising 1M hashes in memory (~40 MB). HLL is ~300\xd7 more memory-efficient — this is why every modern data warehouse (Snowflake, BigQuery, Spark, ClickHouse) uses HLL for approximate COUNT(DISTINCT) at scale."
}))`,R=`HyperLogLog is the algorithm that makes massive-scale COUNT(DISTINCT)
tractable. The math: given m registers, the estimator is
E = α_m \xb7 m\xb2 \xb7 (Σ 2^(-M_j))^(-1) where M_j is the max leading-zero
count seen by register j. The relative error is 1.04/√m — so 16,384
registers (12 KB memory) gives ~0.81% error on any cardinality from
1 to 10^10. Run the demo: it estimates 1M unique users to within
~1% using 12 KB. The same operation with COUNT(DISTINCT) would need
40 MB of working memory (1M \xd7 40-byte hash).`,q=`# ============================================================
# HLL on LIVE aircraft data — OpenSky Network API
# Free: https://opensky-network.org/api/states/all (no auth, CORS-enabled)
# Returns all aircraft currently airborne worldwide (~10,000 at any moment)
# ============================================================
import json
from pyodide.http import pyfetch  # Pyodide's fetch wrapper

async def fetch_live_aircraft():
    """Fetch all currently-airborne aircraft from OpenSky Network."""
    url = "https://opensky-network.org/api/states/all"
    try:
        resp = await pyfetch(url)
        data = await resp.json()
        if "states" not in data or data["states"] is None:
            raise ValueError("No states in response")
        return data["states"]
    except Exception as e:
        print(f"Live API failed ({e}). Falling back to synthetic data.")
        return None

def hll_estimate_from_items(items):
    """Run HLL on a list of item IDs — returns estimated unique count."""
    M_BITS = 14
    M = 1 << M_BITS
    ALPHA = 0.7213 / (1 + 1.079 / M)
    registers = [0] * M

    for item in items:
        h = hash(str(item)) & 0xFFFFFFFF
        idx = h >> (32 - M_BITS)
        w = (h << M_BITS) & 0xFFFFFFFF
        rank = (32 - M_BITS) - (w.bit_length() - 1) if w > 0 else (32 - M_BITS) + 1
        if rank > registers[idx]:
            registers[idx] = rank

    m = len(registers)
    Z = 1.0 / sum(2.0 ** (-r) for r in registers)
    E = ALPHA * m * m * Z
    V = sum(1 for r in registers if r == 0)
    if E < 2.5 * m and V > 0:
        E = m * __import__('math').log(m / V)
    return int(round(E)), len(items), registers

# Try live data first
states = await fetch_live_aircraft()

if states is not None:
    # OpenSky returns: [icao24, callsign, origin_country, time_position,
    #   last_contact, longitude, latitude, baro_altitude, on_ground, velocity, ...]
    # We use icao24 (unique transponder ID) as the HLL input.
    aircraft_ids = [s[0] for s in states if s[0]]
    origin_countries = [s[2] for s in states if s[2]]

    est_aircraft, actual_aircraft, _ = hll_estimate_from_items(aircraft_ids)
    est_countries, actual_countries, _ = hll_estimate_from_items(origin_countries)

    rel_error = abs(est_aircraft - actual_aircraft) / max(actual_aircraft, 1) * 100

    # Count by country (top 10)
    from collections import Counter
    country_counts = Counter(origin_countries)
    top_countries = country_counts.most_common(10)

    series = [{
        "name": "Aircraft by country (top 10)",
        "data": [{"x": c, "y": n} for c, n in top_countries]
    }]

    print(json.dumps({
        "chart_type": "bar",
        "title": f"Live aircraft count by country — {actual_aircraft} aircraft airborne now",
        "x_label": "Origin country",
        "y_label": "Aircraft count",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "OpenSky Network (LIVE)", "tone": "success"},
            {"label": "Actual aircraft", "value": f"{actual_aircraft:,}", "tone": "default"},
            {"label": "HLL estimate", "value": f"{est_aircraft:,}", "tone": "success" if rel_error < 5 else "warning"},
            {"label": "Rel. error", "value": f"{rel_error:.1f}%", "tone": "success" if rel_error < 5 else "warning"},
            {"label": "Unique countries", "value": f"{actual_countries}", "tone": "default"},
            {"label": "HLL memory", "value": "12 KB (16,384 registers)", "tone": "success"},
        ],
        "summary": f"LIVE data from OpenSky Network: {actual_aircraft} aircraft currently airborne across {actual_countries} countries. HLL estimates {est_aircraft} unique aircraft ({rel_error:.1f}% error) using only 12 KB of memory — vs {actual_aircraft * 40 / 1024 / 1024:.1f} MB for exact COUNT(DISTINCT). This is the same HLL algorithm running in every modern data warehouse, applied to real-world air traffic data in your browser."
    }))
else:
    # Fall back to synthetic
    import numpy as np
    np.random.seed(42)
    N_TRUE = 1_000_000
    true_users = [f"user_{i}" for i in range(N_TRUE)]
    est, actual, _ = hll_estimate_from_items(true_users)
    rel_error = abs(est - actual) / actual * 100
    print(json.dumps({
        "chart_type": "line",
        "title": "HLL error vs registers (synthetic fallback)",
        "x_label": "Number of registers m",
        "y_label": "Relative error (%)",
        "series": [{"name": "HLL error bound", "data": [{"x": 1 << b, "y": 1.04 / (1 << b)**0.5 * 100} for b in range(4, 17)]}],
        "stats": [
            {"label": "Data source", "value": "SYNTHETIC (live API failed)", "tone": "warning"},
            {"label": "True cardinality", "value": f"{actual:,}", "tone": "default"},
            {"label": "HLL estimate", "value": f"{est:,}", "tone": "success"},
            {"label": "Rel. error", "value": f"{rel_error:.2f}%", "tone": "success"},
        ],
        "summary": "OpenSky API was unreachable (likely CORS or rate-limit). Fell back to synthetic data: 1M unique users estimated via HLL with 12 KB memory."
    }))
`,Z=`-- ============================================================
-- Delta Lake Z-Ordering — multi-dimensional data clustering
-- Free: OSS (Apache-2.0). Runs on Databricks, EMR, Synapse.
-- Reference: Databricks blog (2020) "Z-Ordering in Delta Lake"
-- ============================================================

-- BEFORE: 18,400 files, 1 TB scan for a typical filter
-- Customer queries "last 7 days for customer_id = 'cust_12345'"
-- SCAN: 1,000,000 MB read, 12 min on a 50-node cluster

-- Step 1: Run OPTIMIZE with ZORDER BY on the columns
--         most commonly filtered together in WHERE clauses.
--         Z-Order interleaves the bits of multiple columns so
--         that rows with similar values in ALL columns end up
--         in the same file → column-pruning + file-skipping.

OPTIMIZE silver_conformed_events
WHERE event_date >= '2025-01-01'
ZORDER BY (customer_id, event_ts);

-- Step 2: Verify with DESCRIBE HISTORY — file count drops,
--         data-skipping stats improve, query latency falls.

-- AFTER: 1,200 files, 150 GB scan for the same filter
-- SCAN: 150,000 MB read (85% reduction), 1.8 min on the same cluster

-- Trade-off: Z-ORDER rewrite cost
--   - Initial OPTIMIZE: 35 min on 50 nodes (1 TB rewrite)
--   - Subsequent incremental: ~3 min per hour via AUTO COMPACTION
--   - Worth it: 12-min query → 1.8-min query = 6.7\xd7 speedup
--   - Break-even after ~100 queries

-- Databricks Liquid Clustering (newer, better than Z-Order):
-- ALTER TABLE silver_conformed_events
-- CLUSTER BY (customer_id, event_ts);
-- Liquid clustering is incremental — no OPTIMIZE needed, ever.
`,U=`Z-Ordering is Delta Lake's answer to the "I have 18,000 files and
my WHERE clause needs to scan all of them" problem. It interleaves
the bits of multiple columns so that rows with similar values in
all of them land in the same physical file. The result: file-skipping
via column statistics (min/max) becomes much more effective — a
typical filter "customer_id = X AND event_ts > Y" reduces the scan
from 1 TB to 150 GB. That's an 85% reduction in I/O, which translates
directly to a 6-7\xd7 query speedup. The trade-off is the rewrite cost:
~35 minutes for an initial Z-Order on 1 TB, but only ~3 min per hour
for incremental maintenance via AUTO COMPACTION. The newer
Liquid Clustering removes the OPTIMIZE step entirely — the table
self-organises as data is written.`,z=`-- ============================================================
-- The small-file problem — and how to fix it
-- Free: OSS (Apache-2.0). Apache Spark + Delta Lake.
-- ============================================================

-- The problem: streaming ingestion creates thousands of small
-- files (one per micro-batch). At 1 file/second, you get 86,400
-- files/day. The Spark driver must list and open each one for
-- every query → driver OOM + 100\xd7 scan overhead.

-- Symptom: DESCRIBE DETAIL shows 18,400 files for a 1 TB table.
-- Each file is ~50 MB but contains only ~5 MB of useful data
-- (the rest is Parquet row-group padding + Delta log overhead).

-- Fix 1: Auto Compaction (Databricks runtime 9.1+)
--       Runs after every writeStream commit, in the background.
--       Triggers when small-file count > 50 OR total size < 1 GB.

ALTER TABLE silver_conformed_events SET TBLPROPERTIES (
  'delta.autoOptimize.optimizeWrite' = 'true',     -- write-time compaction
  'delta.autoOptimize.autoCompact'    = 'true',     -- post-write compaction
  'delta.deletedFileRetentionDuration' = 'interval 7 days',
  'delta.logRetentionDuration' = 'interval 30 days'
);

-- Fix 2: Scheduled OPTIMIZE every 60 minutes
--       For OSS Delta (no Databricks auto-compact).

-- In Airflow DAG:
-- spark.sql("OPTIMIZE silver_conformed_events ZORDER BY (customer_id, event_ts)")

-- Fix 3: Tuning writeStream micro-batch size
--       Larger micro-batches = fewer, larger files.

# In the PySpark writeStream:
query = streaming_df.writeStream \\
    .format("delta") \\
    .option("checkpointLocation", "s3a://checkpoints/silver-events/") \\
    .option("maxFilesPerTrigger", "100") \\        # process 100 files per micro-batch
    .option("triggerAvailableNow", "true") \\       # process all available, then stop
    .trigger(processingTime='60 seconds') \\         # 60s batches → ~100MB files
    .start("s3a://silver-conformed-events/")

-- Fix 4: Tune the target file size to match the cluster.
--       Rule of thumb: 1 file per core per partition.
--       i3.2xlarge (8 vCPU) → 8 files per partition → 128 MB target.

spark.conf.set("spark.databricks.delta.optimize.maxFileSize", "134217728")  -- 128 MB

-- BEFORE: 18,400 files \xd7 50 KB avg = 920 MB wasted on metadata
-- AFTER: 12 files \xd7 128 MB = 1.5 GB, all useful data
-- Query latency: 12 min → 1.8 min (same as Z-Order card)
`,K=`The small-file problem is the #1 performance killer for streaming
ingestion on Delta Lake. Each micro-batch creates a small file;
at 1-second trigger intervals, you accumulate ~86,400 files/day.
The Spark driver must list and open every file at query time —
the listing alone takes 30+ seconds for 18,400 files, and the
random reads destroy any benefit from column-pruning.

The fix is layered: (1) Auto Compaction runs after every
writeStream commit, in the background — Databricks runtime 9.1+
does this transparently. (2) Scheduled OPTIMIZE runs every 60 min
for OSS Delta. (3) Larger micro-batch intervals (60s instead of
10s) produce larger files naturally. (4) The maxFileSize config
targets the cluster's parallelism (128 MB for i3.2xlarge).

The before/after is dramatic: 18,400 files → 12 files. Same
1.5 GB of data, but query latency drops from 12 min to 1.8 min.
That's the same speedup as Z-Ordering — and they compose:
Z-Order for filter selectivity, Auto Compaction for file count.`;function G({latex:a}){let s=(0,r.useRef)(null),[i,o]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{let t=!1;if(s.current&&!i)return e.A(839484).then(e=>{if(t||!s.current)return;let r=e.default??e;try{r.render(a,s.current,{throwOnError:!1,displayMode:!0}),o(!0)}catch{s.current&&(s.current.textContent=a),o(!0)}}).catch(()=>{s.current&&(s.current.textContent=a),o(!0)}),()=>{t=!0}},[a,i]),(0,t.jsx)("div",{ref:s,className:"text-base overflow-x-auto py-2"})}function V(){let[e,c]=(0,r.useState)(null);return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(s.PageHeader,{eyebrow:"Core Big Data & Platform Infrastructure · Ingestion, Lakehouse & Columnar",title:"Big Data Ingestion — HLL, Delta Z-Ordering, small-file mitigation",description:"At exabyte scale, traditional COUNT(DISTINCT) aggregates become memory bottlenecks and naive streaming writes create thousands of small files that destroy query performance. This page covers the three mathematical + engineering foundations that make HPC ingestion tractable: HyperLogLog probabilistic counting, Delta Lake Z-Ordering for column pruning, and Auto Compaction for the small-file problem.",right:(0,t.jsxs)("div",{className:"flex gap-2 flex-wrap",children:[(0,t.jsxs)(n.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(k.Database,{className:"h-3 w-3"})," PySpark"]}),(0,t.jsxs)(n.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(F.Boxes,{className:"h-3 w-3"})," Delta Lake"]}),(0,t.jsxs)(n.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(g.Cpu,{className:"h-3 w-3"})," HPC"]}),(0,t.jsxs)(n.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(C.Gauge,{className:"h-3 w-3"})," 1.2M ev/s"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:P.map(e=>(0,t.jsx)(s.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsxs)(s.SectionCard,{title:"Mathematical foundation — HyperLogLog cardinality estimation",description:"The probabilistic counting algorithm that powers every modern data warehouse's approximate COUNT(DISTINCT). At 0.5% error with 12 KB of memory, it's ~300× more memory-efficient than exact counting.",icon:(0,t.jsx)(x.Activity,{className:"h-5 w-5"}),badge:"HLL",children:[(0,t.jsxs)("p",{className:"text-sm text-muted-foreground leading-relaxed mb-3",children:["The HyperLogLog estimator takes the maximum leading-zero count ",(0,t.jsx)("code",{className:"font-mono",children:"M_j"})," observed across ",(0,t.jsx)("code",{className:"font-mono",children:"m"})," registers and computes:"]}),(0,t.jsx)("div",{className:"rounded-md border border-border/40 bg-muted/20 p-4",children:(0,t.jsx)(G,{latex:"E = \\\\alpha_m \\\\, m^2 \\\\left( \\\\sum_{j=1}^{m} 2^{-M_j} \\\\right)^{-1}, \\\\qquad \\\\text{RE} \\\\approx \\\\frac{1.04}{\\\\sqrt{m}}"})}),(0,t.jsxs)("p",{className:"text-sm text-muted-foreground leading-relaxed mt-3",children:["The bias-corrected constant ",(0,t.jsx)("code",{className:"font-mono",children:"α_m = 0.7213 / (1 + 1.079/m)"})," and the small-range correction (linear counting when ",(0,t.jsx)("code",{className:"font-mono",children:"E < 2.5m"}),") together give a relative error of ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"1.04 / √m"}),". With m = 2^14 = 16,384 registers (12 KB memory), the error is ~0.81% — independent of the true cardinality, from 1 to 10^10. This is why every modern data warehouse (Snowflake, BigQuery, Spark, ClickHouse) uses HLL internally for ",(0,t.jsx)("code",{className:"font-mono",children:"APPROX_COUNT_DISTINCT"}),"."]})]}),(0,t.jsxs)(s.SectionCard,{title:"Big Data Ingestion Cards — 4 sibling patterns",description:"Each card follows the same structure: code + explainer + optional interactive demo. Together they cover the full HPC ingestion stack — streaming writes, cardinality estimation, query optimisation, and file management.",icon:(0,t.jsx)(L.Layers,{className:"h-5 w-5"}),contentClassName:"p-4 md:p-5 space-y-4",children:[(0,t.jsx)(l.CodeCard,{defaultCollapsed:!0,title:"1. PySpark Streaming Ingestion with Delta Lake",description:"The canonical Bronze → Silver streaming write. Auto-loader detects new Parquet files in S3; writeStream to Delta with checkpointing for exactly-once semantics. Max file size 128 MB tuned for i3.2xlarge NVMe.",icon:(0,t.jsx)(j.Zap,{className:"h-5 w-5"}),badge:"PySpark",code:E,language:"python",filename:"hpc_medallion_ingest.py",highlight:[10,11,12,13],explainer:A}),(0,t.jsx)(l.CodeCard,{defaultCollapsed:!0,title:"2. HyperLogLog — probabilistic cardinality estimation",description:"Estimate 1M unique users with 12 KB of memory. The interactive demo below runs in your browser via Pyodide — the chart shows how HLL trades memory for accuracy.",icon:(0,t.jsx)(x.Activity,{className:"h-5 w-5"}),badge:"Python · Interactive",code:H.split("# Simulate: 1M unique user IDs")[0],language:"python",filename:"hyperloglog.py",explainer:R,runnableCode:H,liveDataCode:q,liveDataSource:"OpenSky",onOutput:e=>{try{let t=e.trim().split("\n").filter(e=>e.startsWith("{")).join("");c(JSON.parse(t))}catch{c(null)}}}),(0,t.jsx)(l.CodeCard,{defaultCollapsed:!0,title:"3. Delta Lake Z-Ordering — multi-dimensional clustering",description:"OPTIMIZE with ZORDER BY interleaves the bits of multiple columns so rows with similar values land in the same file. File-skipping via min/max stats reduces typical queries from 1 TB scan to 150 GB — an 85% reduction.",icon:(0,t.jsx)(I.GitBranch,{className:"h-5 w-5"}),badge:"SQL · Delta Lake",code:Z,language:"sql",filename:"zorder_optimize.sql",highlight:[12,13,14,15],explainer:U}),(0,t.jsx)(l.CodeCard,{defaultCollapsed:!0,title:"4. The small-file problem + Auto Compaction",description:"Streaming ingestion creates thousands of small files (1/sec = 86,400/day). The driver must list+open each one per query. Auto Compaction + scheduled OPTIMIZE + tuned micro-batch sizes convert 18,400 files into 12.",icon:(0,t.jsx)(D.default,{className:"h-5 w-5"}),badge:"SQL · PySpark",code:z,language:"sql",filename:"small_file_fix.sql",highlight:[15,16,17,18,19,20,21],explainer:K})]}),e&&(0,t.jsx)(s.SectionCard,{title:"HLL interactive output",description:"Result of running Card 2 in your browser. The chart shows the theoretical error bound 1.04/√m vs the number of registers.",icon:(0,t.jsx)(O.TrendingDown,{className:"h-5 w-5"}),children:(0,t.jsx)(W,{data:e})}),(0,t.jsx)(s.SectionCard,{title:"The full HPC ingestion stack",description:"From S3 raw to Delta Silver — the 7 layers that compose the platform's big-data ingestion pipeline.",icon:(0,t.jsx)(B.Workflow,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)(k.Database,{className:"h-4 w-4 text-primary mb-1.5"}),(0,t.jsx)("p",{className:"font-semibold text-xs",children:"1. Source — S3 Bronze raw"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1 leading-relaxed",children:"Parquet files land in s3://bronze-raw-events/ every 5 min from Kafka Connect S3 sink. ~1.2M events/sec across 50 partitions."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)(j.Zap,{className:"h-4 w-4 text-primary mb-1.5"}),(0,t.jsx)("p",{className:"font-semibold text-xs",children:"2. Auto-loader (cloudFiles)"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1 leading-relaxed",children:"Spark auto-loader uses S3 event notifications + file-listing to detect new files. Incremental file-listing cache via _delta_log checkpointing."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)(M.ShieldCheck,{className:"h-4 w-4 text-primary mb-1.5"}),(0,t.jsx)("p",{className:"font-semibold text-xs",children:"3. Schema enforcement"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1 leading-relaxed",children:"Bronze schema is mutable; Silver enforces via mergeSchema=false. New columns rejected → branch + PR for review."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)(F.Boxes,{className:"h-4 w-4 text-primary mb-1.5"}),(0,t.jsx)("p",{className:"font-semibold text-xs",children:"4. Delta writeStream"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1 leading-relaxed",children:"Exactly-once via checkpointing at s3://checkpoints/. Micro-batch every 10s → ~100 MB files. Idempotent across cluster restarts."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)(I.GitBranch,{className:"h-4 w-4 text-primary mb-1.5"}),(0,t.jsx)("p",{className:"font-semibold text-xs",children:"5. Z-Order + Liquid Cluster"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1 leading-relaxed",children:"CLUSTER BY (customer_id, event_ts) — incremental, no OPTIMIZE call needed. 85% scan reduction on typical filters."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)(D.default,{className:"h-4 w-4 text-primary mb-1.5"}),(0,t.jsx)("p",{className:"font-semibold text-xs",children:"6. Auto Compaction"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1 leading-relaxed",children:"Background OPTIMIZE every 60 min when small-file count > 50. 18,400 files → 12. Query latency: 12 min → 1.8 min."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)(x.Activity,{className:"h-4 w-4 text-primary mb-1.5"}),(0,t.jsx)("p",{className:"font-semibold text-xs",children:"7. HLL materialised view"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1 leading-relaxed",children:"Daily count of unique users via APPROX_COUNT_DISTINCT — 12 KB HLL sketch instead of 40 MB hash materialisation."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)(g.Cpu,{className:"h-4 w-4 text-primary mb-1.5"}),(0,t.jsx)("p",{className:"font-semibold text-xs",children:"8. Cluster sizing"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1 leading-relaxed",children:"50× i3.2xlarge (8 vCPU, 61 GB RAM, 7.6 TB NVMe each). Autoscale 10→100 nodes on backlog. $22/hour on-demand, $5.50/hour spot."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/20",children:[(0,t.jsx)(C.Gauge,{className:"h-4 w-4 text-primary mb-1.5"}),(0,t.jsx)("p",{className:"font-semibold text-xs",children:"9. Observability"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1 leading-relaxed",children:"Spark UI + Delta Live Tables event log → Datadog dashboards. Lag alert at 5 min; throughput anomaly via MAD on 1-min window."})]})]})}),(0,t.jsx)(s.SectionCard,{title:"Connections across the platform",description:"How big data ingestion connects to the rest of the platform.",icon:(0,t.jsx)(L.Layers,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-sm",children:[(0,t.jsxs)(a.default,{href:(0,o.hrefFor)("databricks"),className:"rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("p",{className:"font-semibold",children:"→ Databricks Lakehouse"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"Hosts the Delta Lake tables and runs the PySpark clusters that power this ingestion."})]}),(0,t.jsxs)(a.default,{href:(0,o.hrefFor)("delta-lake"),className:"rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("p",{className:"font-semibold",children:"→ Delta Lake"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"The storage format underneath Z-Ordering, Auto Compaction, and the checkpointing that gives exactly-once semantics."})]}),(0,t.jsxs)(a.default,{href:(0,o.hrefFor)("kafka"),className:"rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("p",{className:"font-semibold",children:"→ Apache Kafka"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"Upstream of the S3 Bronze — Kafka Connect S3 sink writes the Parquet files that auto-loader picks up."})]}),(0,t.jsxs)(a.default,{href:(0,o.hrefFor)("iceberg"),className:"rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("p",{className:"font-semibold",children:"→ Apache Iceberg"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"Alternative table format with similar Z-Order (sort order) + compaction features. The pattern generalises."})]}),(0,t.jsxs)(a.default,{href:(0,o.hrefFor)("spark-streaming"),className:"rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("p",{className:"font-semibold",children:"→ Spark Streaming"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"The readStream/writeStream APIs in depth — micro-batch vs continuous, watermarks, windowing."})]}),(0,t.jsxs)(a.default,{href:(0,o.hrefFor)("orchestration"),className:"rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("p",{className:"font-semibold",children:"→ Orchestration"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"Airflow DAGs that schedule the OPTIMIZE runs, the HLL materialised view refresh, and the small-file alerting."})]})]})}),(0,t.jsx)(s.SectionCard,{title:"Concept Card — HyperLogLog (5-layer pattern)",description:"The platform's signature content pattern: mathematical foundation → code implementation → computational tools → analysis with Pyodide → visualization. Click the card to expand all 5 layers.",icon:(0,t.jsx)(L.Layers,{className:"h-5 w-5"}),badge:"5-layer pattern",contentClassName:"p-4 md:p-5",children:(0,t.jsx)(w,{spec:_})}),(0,t.jsx)(s.SectionCard,{title:"Related Elegant Code — HyperLogLog walks across disciplines",description:"The HLL algorithm on this page also counts unique k-mers in genomics and unique source IPs in network security. One sketch, three sciences.",icon:(0,t.jsx)(v.Sparkles,{className:"h-5 w-5"}),badge:"Cross-domain",children:(0,t.jsx)("div",{className:"grid md:grid-cols-1 gap-3",children:(0,t.jsxs)(a.default,{href:(0,o.hrefFor)("elegant-code"),className:"group flex items-start gap-3 rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary",children:"21"}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-medium group-hover:text-primary transition-colors",children:"HyperLogLog — the universal counter"}),(0,t.jsx)("p",{className:"text-[10px] font-mono text-muted-foreground mt-0.5",children:"E = α_m m² (Σ 2^(-M_j))^(-1)"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1 leading-relaxed",children:"COUNT(DISTINCT user_id) in Snowflake/Spark, unique k-mers in Jellyfish (genome assembler), unique source IPs in Redis PFCOUNT (DDoS monitor) — all run the SAME hash→bucket→max-zeros→harmonic-mean algorithm. 12 KB vs 400 GB for exact counting."})]})]})})}),(0,t.jsxs)(S.DeeperThoughtSection,{pageTitle:"Big Data Ingestion",children:[(0,t.jsx)(S.DeeperThought,{title:"Probabilistic data structures are the unsung heroes of big data",connectedTo:"HLL + Bloom filter + Count-Min Sketch",children:(0,t.jsx)("p",{children:"HLL is one of three probabilistic data structures that make modern big-data tractable. The other two: Bloom filters (membership testing — 'have I seen this before?' in 1 MB instead of the full hash set) and Count-Min Sketch (frequency estimation — 'how many times have I seen X?' in O(1) with bounded error). All three trade a small, bounded error for an enormous reduction in memory. The math behind all three is the same: hash the input N times, look at the bits, take a statistic (max leading zeros for HLL, all-1s for Bloom, min count for CMS). The platform's investment in HLL here is the entry point to the broader pattern — once you accept ~0.5% error, the entire big-data cost curve drops by 100×."})}),(0,t.jsx)(S.DeeperThought,{title:"Z-Ordering is geometric space-filling curves in disguise",connectedTo:"Z-order curve + Morton encoding",children:(0,t.jsx)("p",{children:"Z-Ordering sounds like an Apache-specific feature, but it's actually a 60-year-old idea: the Morton encoding (1966) maps multi-dimensional points to a single integer by interleaving their bits. The resulting order has the property that points close in multi-D space tend to be close in 1-D space — which means files written in Z-Order have localised values per file. The min/max stats per file then allow file-skipping. The math is beautiful: a space-filling curve, originally invented for geographic databases in the 1960s, becomes the foundation of cloud data-warehouse query optimisation in 2020. Liquid Clustering is just Z-Order made incremental — the same geometric insight, now applied on every write instead of via a separate OPTIMIZE call."})}),(0,t.jsx)(S.DeeperThought,{title:"The small-file problem is the streaming equivalent of write-amplification",connectedTo:"LSM-trees + compaction",children:(0,t.jsx)("p",{children:"In LSM-tree key-value stores (Cassandra, RocksDB, LevelDB), writes go to a memtable, which flushes to disk as an SSTable. Without compaction, you accumulate thousands of small SSTables. The same pattern applies to Delta: micro-batch writes create small Parquet files, and without OPTIMIZE, they accumulate. The fix is the same: background compaction that merges small files into larger ones. The trade-off is write-amplification (each row is written ~3× on average: once to Bronze, once to Silver, once during compaction). This is why Delta on spinning disk is slow but Delta on NVMe (i3.2xlarge) is fast — NVMe absorbs the write-amplification without latency penalty. The platform chose NVMe clusters precisely because of this trade-off."})}),(0,t.jsx)(S.DeeperThought,{title:"HPC + data platform convergence is the architectural shift of the 2020s",connectedTo:"Databricks + HPC + Lakehouse",children:(0,t.jsx)("p",{children:"Ten years ago, HPC (high-performance computing) and data engineering were separate worlds. HPC ran scientific simulations on MPI clusters; data engineering ran ETL on Hadoop. The convergence is driven by three things: (1) GPU + NVMe clusters work for both workloads (CUDA for ML, NVMe for columnar scans); (2) the workloads have similar patterns (large matrix ops, embarrassingly parallel batch processing); (3) the tools have converged (Spark unifies batch + streaming + ML; Delta unifies storage for both). The platform's ingestion page embodies this: PySpark (a data tool) running on i3.2xlarge (an HPC instance type), using HyperLogLog (an algorithm from database theory), feeding into Delta Lake (a storage format designed for both analytics + ML). The collision is the architecture."})})]}),(0,t.jsx)(i.NextSteps,{relatedPages:[{id:"databricks",reason:"Hosts the Delta tables + PySpark clusters"},{id:"delta-lake",reason:"Storage format underneath Z-Order + Auto Compaction"},{id:"iceberg",reason:"Alternative table format — same patterns apply"},{id:"spark-streaming",reason:"The readStream/writeStream APIs in depth"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,o.hrefFor)("home"),className:"text-sm text-primary hover:underline",children:"→ Return to overview"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,o.hrefFor)("databricks"),className:"text-sm text-primary hover:underline",children:"→ Databricks Lakehouse"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,o.hrefFor)("delta-lake"),className:"text-sm text-primary hover:underline",children:"→ Delta Lake"})]})]})}function W({data:e}){return e&&e.series?(0,t.jsxs)("div",{className:"space-y-3",children:[e.stats&&e.stats.length>0&&(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-2",children:e.stats.map((e,r)=>(0,t.jsxs)("div",{className:`rounded border p-2 bg-background/60 ${"success"===e.tone?"border-emerald-500/40":"warning"===e.tone?"border-amber-500/40":"destructive"===e.tone?"border-rose-500/40":"border-border/40"}`,children:[(0,t.jsx)("p",{className:"text-[9px] uppercase tracking-wider text-muted-foreground",children:e.label}),(0,t.jsx)("p",{className:`text-sm font-semibold font-mono mt-0.5 ${"success"===e.tone?"text-emerald-600 dark:text-emerald-400":"warning"===e.tone?"text-amber-600 dark:text-amber-400":"destructive"===e.tone?"text-rose-600 dark:text-rose-400":""}`,children:e.value})]},r))}),e.summary&&(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed rounded border border-border/40 bg-muted/20 p-2",children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Interpretation:"})," ",e.summary]})]}):(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:'No chart data yet — click "Run analysis in browser" on Card 2.'})}e.s(["BigDataIngestionPage",()=>V],634515)}]);