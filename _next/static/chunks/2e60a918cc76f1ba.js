(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var t=e.i(843476),a=e.i(271645),r=e.i(487486),s=e.i(519455),o=e.i(716675),i=e.i(194058),n=e.i(862824),d=e.i(344396),c=e.i(178583),l=e.i(778917),p=e.i(283086),h=e.i(972520),m=e.i(217923),u=e.i(522016),x=e.i(901752);function g({pageId:e}){let a=(0,d.researchForPage)(e);return 0===a.length?null:(0,t.jsxs)(n.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,t.jsx)(c.FileText,{className:"h-5 w-5"}),badge:`${a.length} paper${1===a.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[a.map((e,a)=>(0,t.jsx)(v,{entry:e},a)),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[a.length," paper",1===a.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function v({entry:e}){let[n,d]=(0,a.useState)(!1),[c,g]=(0,a.useState)(null);return(0,t.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,t.jsx)(r.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,t.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(l.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,t.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(l.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,t.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,t.jsxs)(s.Button,{variant:"outline",size:"sm",onClick:()=>d(!n),className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(p.Sparkles,{className:"h-3 w-3"}),n?"Hide expected code":"Show expected code + visualization"]}),n&&(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(o.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let t=e.indexOf("{"),a=e.lastIndexOf("}");if(t>=0&&a>t){let r=e.substring(t,a+1);g(JSON.parse(r))}}catch{}},hideTextOutput:!!c,compact:!0}),c?(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(m.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,t.jsx)(i.AnalysisChart,{data:c,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,t.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,t.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,t.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,t.jsxs)(u.default,{href:(0,x.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,t.jsx)(h.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>g])},727927,e=>{"use strict";var t=e.i(651617);e.s(["Cloud",()=>t.default])},523741,e=>{"use strict";var t=e.i(843476),a=e.i(522016),r=e.i(862824),s=e.i(342046),o=e.i(921371),i=e.i(580296),n=e.i(122836),d=e.i(716675),c=e.i(901752),l=e.i(487486),p=e.i(658041),h=e.i(868054),m=e.i(727927),u=e.i(332017);let x=[{label:"Default (ADR-022)",value:"pgvector",hint:"Inside Postgres — zero new infra",deltaTone:"flat"},{label:"Search latency",value:"< 10ms",hint:"HNSW index on 1M vectors",deltaTone:"flat"},{label:"Scale threshold",value:"100M",hint:"Above: switch to Pinecone/Weaviate",deltaTone:"flat"},{label:"Distance metric",value:"Cosine",hint:"Also: L2 (Euclidean), inner product",deltaTone:"flat"}],g=[{name:"pgvector",type:"Postgres ext",free:"100% OSS (PostgreSQL License)",pros:"Zero new infra, SQL-native, ACID",cons:"Not for >100M vectors"},{name:"Pinecone",type:"Managed SaaS",free:"Starter: 1 index, 100k vectors",pros:"Fully managed, auto-scaling",cons:"External dependency, cost at scale"},{name:"Weaviate",type:"OSS + managed",free:"100% OSS; cloud free trial",pros:"GraphQL + REST, modules ecosystem",cons:"Separate service to operate"},{name:"Qdrant",type:"OSS (Rust)",free:"1GB free on Cloud",pros:"Rust-native, fastest filter+search",cons:"Smaller ecosystem"},{name:"Chroma",type:"OSS (embedded)",free:"100% OSS, in-process",pros:"Easiest setup, Python-native",cons:"Not for production scale"},{name:"Milvus",type:"OSS (Go/C++)",free:"100% OSS, self-hostable",pros:"Scales to billions of vectors",cons:"Complex to operate, heavy"}];function v(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(r.PageHeader,{eyebrow:"GenAI · vector databases",title:"Vector Databases — pgvector vs Pinecone vs Weaviate vs Qdrant",description:"Where do RAG embeddings live? ADR-022 chose pgvector — vectors inside your existing Postgres, SQL-native, zero new infrastructure. Pinecone/Weaviate/Qdrant reserved for >100M vector scale. Here's the full comparison + a Pyodide demo showing how vector operations work.",right:(0,t.jsxs)(l.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(p.Database,{className:"h-3 w-3"})," ADR-022"]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:x.map(e=>(0,t.jsx)(r.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(r.SectionCard,{title:"pgvector — SQL-native vector search",icon:(0,t.jsx)(p.Database,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)(n.CodeBlock,{language:"sql",filename:"pgvector_demo.sql",highlight:[4,5,6,7,8,11,12,13,14,15,18,19,20],code:`-- pgvector: vectors inside Postgres (ADR-022)

-- 1. Enable extension + create table with vector column
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE gold_embeddings (
    id          TEXT PRIMARY KEY,
    table_name  TEXT NOT NULL,
    row_data    JSONB NOT NULL,
    embedding   vector(1536)  -- 1536-dim from text-embedding model
);

-- 2. Create HNSW index for sub-10ms cosine similarity search
CREATE INDEX ON gold_embeddings
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

-- 3. Vector search — cosine similarity, top-5
--    The <=> operator = cosine distance (1 - similarity)
SELECT id, table_name, row_data,
       1 - (embedding <=> '[0.12, -0.34, ...]'::vector) AS similarity
FROM gold_embeddings
ORDER BY embedding <=> '[0.12, -0.34, ...]'::vector
LIMIT 5;

-- 4. Filtered vector search — combine SQL filters + vector search
SELECT id, row_data
FROM gold_embeddings
WHERE table_name = 'fct_orders'
  AND row_data->>'region_code' = 'UK'
ORDER BY embedding <=> $query_vector
LIMIT 5;

-- 5. Hybrid search — full-text + vector (BM25 + cosine)
SELECT id, ts_rank(to_tsvector(row_data::text), plainto_tsquery($query)) AS text_rank,
       1 - (embedding <=> $query_vector) AS vec_sim
FROM gold_embeddings
ORDER BY (text_rank * 0.3 + vec_sim * 0.7) DESC
LIMIT 5;`})}),(0,t.jsx)(r.SectionCard,{title:"Vector DB comparison",icon:(0,t.jsx)(m.Cloud,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase text-muted-foreground",children:"DB"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase text-muted-foreground",children:"Type"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase text-muted-foreground",children:"Free tier"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase text-muted-foreground",children:"Pros"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase text-muted-foreground",children:"Cons"})]})}),(0,t.jsx)("tbody",{children:g.map(e=>(0,t.jsxs)("tr",{className:`border-b border-border/40 last:border-0 ${"pgvector"===e.name?"bg-primary/5":""}`,children:[(0,t.jsx)("td",{className:"px-3 py-2 text-xs font-semibold",children:e.name}),(0,t.jsx)("td",{className:"px-3 py-2 text-[11px] text-muted-foreground",children:e.type}),(0,t.jsx)("td",{className:"px-3 py-2 text-[11px] text-emerald-600 dark:text-emerald-400",children:e.free}),(0,t.jsx)("td",{className:"px-3 py-2 text-[11px] text-foreground/80",children:e.pros}),(0,t.jsx)("td",{className:"px-3 py-2 text-[11px] text-muted-foreground",children:e.cons})]},e.name))})]})})}),(0,t.jsx)(r.SectionCard,{title:"Try it: Vector operations (Pyodide)",icon:(0,t.jsx)(h.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:`# Vector operations — the math behind vector search
# Shows cosine similarity, L2 distance, dot product, HNSW concept

import math

def cosine_sim(v1, v2):
    dot = sum(a*b for a,b in zip(v1,v2))
    mag1 = math.sqrt(sum(a*a for a in v1))
    mag2 = math.sqrt(sum(b*b for b in v2))
    return dot / (mag1 * mag2) if mag1 and mag2 else 0

def l2_distance(v1, v2):
    return math.sqrt(sum((a-b)**2 for a,b in zip(v1,v2)))

def dot_product(v1, v2):
    return sum(a*b for a,b in zip(v1,v2))

# Simulate a vector index with 5 documents
docs = [
    {"id": "doc_1", "text": "UK revenue Q3 = \xa32.1M",  "vec": [0.9, 0.8, 0.7, 0.1, 0.3]},
    {"id": "doc_2", "text": "EU revenue Q3 = \xa31.8M",  "vec": [0.7, 0.6, 0.8, 0.2, 0.4]},
    {"id": "doc_3", "text": "NA returns rate = 6.4%", "vec": [0.1, 0.2, 0.1, 0.9, 0.8]},
    {"id": "doc_4", "text": "VIP churn = 3.2%",      "vec": [0.2, 0.1, 0.3, 0.8, 0.9]},
    {"id": "doc_5", "text": "UK orders = 1.2k",       "vec": [0.85, 0.75, 0.65, 0.15, 0.25]},
]

query = [0.92, 0.78, 0.72, 0.05, 0.28]

print("=" * 60)
print("Vector DB Operations — Distance Metrics Comparison")
print("=" * 60)
print(f"\\nQuery vector: {[round(v,2) for v in query]}")
print(f"\\n{'Doc':<8} {'Cosine':<10} {'L2 dist':<10} {'Dot':<10} {'Text'}")
print("-" * 60)

results = []
for doc in docs:
    cs = cosine_sim(query, doc["vec"])
    l2 = l2_distance(query, doc["vec"])
    dp = dot_product(query, doc["vec"])
    results.append((doc, cs, l2, dp))
    print(f"  {doc['id']:<6} {cs:<10.4f} {l2:<10.4f} {dp:<10.4f} {doc['text']}")

# Top-3 by cosine similarity (what pgvector does)
results.sort(key=lambda x: x[1], reverse=True)
print(f"\\n{'=' * 60}")
print("Top-3 by cosine similarity (pgvector <=> operator):")
for i, (doc, cs, l2, dp) in enumerate(results[:3]):
    print(f"  {i+1}. {doc['id']} sim={cs:.4f} → {doc['text']}")

# HNSW concept
print(f"\\n{'=' * 60}")
print("HNSW Index concept:")
print("  - Hierarchical Navigable Small World graph")
print("  - Builds multi-layer graph for fast approximate search")
print("  - O(log N) search vs O(N) brute force")
print("  - Trade-off: approximate (recall ~98%) vs exact (100%)")
print(f"  - For 1M vectors: brute force ~1000ms, HNSW ~8ms")
print("=" * 60)`,buttonLabel:"Run vector operations (Pyodide)"})}),(0,t.jsxs)(u.DeeperThoughtSection,{pageTitle:"Vector Databases",children:[(0,t.jsx)(u.DeeperThought,{title:"Vector Databases IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Vector Databases is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Vector Databases connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Vector Databases sits in the computational-science landscape."})}),(0,t.jsx)(u.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Vector Databases) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(u.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(u.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(u.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(o.ResearchDemo,{pageId:"vector-db"}),(0,t.jsx)(i.TrendAnticipation,{pageId:"vector-db"}),(0,t.jsx)(s.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"rag-llms",reason:"Continue to rag llms — see also from this page"},{id:"knowledge",reason:"Continue to knowledge — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,c.hrefFor)("rag-llms"),className:"text-sm text-primary hover:underline",children:"→ RAG & LLMs"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,c.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ ADR-022 (pgvector)"})]})]})}e.s(["VectorDbPage",()=>v])}]);