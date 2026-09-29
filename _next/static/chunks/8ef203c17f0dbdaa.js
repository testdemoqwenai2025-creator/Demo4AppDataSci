(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var t=e.i(843476),r=e.i(271645),a=e.i(487486),s=e.i(519455),i=e.i(716675),n=e.i(194058),o=e.i(862824),d=e.i(344396),l=e.i(178583),c=e.i(778917),h=e.i(283086),m=e.i(972520),p=e.i(217923),u=e.i(522016),x=e.i(901752);function g({pageId:e}){let r=(0,d.researchForPage)(e);return 0===r.length?null:(0,t.jsxs)(o.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,t.jsx)(l.FileText,{className:"h-5 w-5"}),badge:`${r.length} paper${1===r.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[r.map((e,r)=>(0,t.jsx)(v,{entry:e},r)),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[r.length," paper",1===r.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function v({entry:e}){let[o,d]=(0,r.useState)(!1),[l,g]=(0,r.useState)(null);return(0,t.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,t.jsx)(a.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,t.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,t.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,t.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,t.jsxs)(s.Button,{variant:"outline",size:"sm",onClick:()=>d(!o),className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(h.Sparkles,{className:"h-3 w-3"}),o?"Hide expected code":"Show expected code + visualization"]}),o&&(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(i.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let t=e.indexOf("{"),r=e.lastIndexOf("}");if(t>=0&&r>t){let a=e.substring(t,r+1);g(JSON.parse(a))}}catch{}},hideTextOutput:!!l,compact:!0}),l?(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(p.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,t.jsx)(n.AnalysisChart,{data:l,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,t.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,t.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,t.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,t.jsxs)(u.default,{href:(0,x.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,t.jsx)(m.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>g])},856519,e=>{"use strict";var t=e.i(843476),r=e.i(522016),a=e.i(862824),s=e.i(342046),i=e.i(122836),n=e.i(716675),o=e.i(921371),d=e.i(580296),l=e.i(901752),c=e.i(487486),h=e.i(283086),m=e.i(658041),p=e.i(852008),u=e.i(868054),x=e.i(25652),g=e.i(455711),v=e.i(332017);let f=[{label:"RAG pattern",value:"Query→Embed→Search→LLM",hint:"Retrieve Augmented Generation",deltaTone:"flat"},{label:"Vector DBs",value:"5+",hint:"Pinecone · Weaviate · Qdrant · pgvector · Milvus",deltaTone:"flat"},{label:"Embedding model",value:"text-embedding-3",hint:"OpenAI / Cohere / open-source (BGE)",deltaTone:"flat"},{label:"Platform role",value:"Gold tables",hint:"Your Gold layer becomes the LLM knowledge base",deltaTone:"flat"}],b=[{name:"Pinecone",type:"Managed SaaS",free:"Starter: 1 index, 100k vectors",dims:"Up to 20k dims"},{name:"Weaviate",type:"OSS + managed",free:"100% OSS; cloud free trial",dims:"Any"},{name:"Qdrant",type:"OSS + managed",free:"1GB free on Qdrant Cloud",dims:"Any"},{name:"pgvector",type:"Postgres extension",free:"Free (Postgres + extension)",dims:"Up to 2k"},{name:"Milvus",type:"OSS",free:"100% OSS, self-hostable",dims:"Any"},{name:"Chroma",type:"OSS (embedded)",free:"100% OSS, in-process",dims:"Any"}];function y(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(a.PageHeader,{eyebrow:"GenAI · RAG & LLMs",title:"RAG & LLMs — Gold Tables as Knowledge Base",description:"The platform's Gold tables become an LLM knowledge base via RAG (Retrieval-Augmented Generation). Query → embed → vector search → retrieve context → LLM generates answer. The data engineering stack (Bronze→Silver→Gold + Arrow + Iceberg) IS the RAG infrastructure. This is the convergence of data engineering + AI.",right:(0,t.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(h.Sparkles,{className:"h-3 w-3"})," GenAI"]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:f.map(e=>(0,t.jsx)(a.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(a.SectionCard,{title:"The RAG pipeline — 5 steps",icon:(0,t.jsx)(p.Layers,{className:"h-5 w-5"}),children:(0,t.jsx)(i.CodeBlock,{language:"text",filename:"rag_pipeline.txt",code:`┌─────────────────────────────────────────────────────────────────┐
│  THE RAG PIPELINE — Gold Tables → LLM Knowledge Base            │
│                                                                 │
│  1. EMBED    ─┐                                                  │
│    Gold tables │ → embed each row as a vector (1536 dims)      │
│    (fct_orders, │ → store in vector DB (pgvector / Pinecone)   │
│     dim_customer│                                                │
│     etc.)      ─┘                                                │
│                                                                 │
│  2. QUERY    ─┐                                                  │
│    User asks: │ → embed the question using same model          │
│    "What was  │ → vector: [0.12, -0.34, 0.56, ...]              │
│     UK revenue└─────────────────────────────────────────────────│
│     last Q?"                                                     │
│                                                                 │
│  3. SEARCH   ─┐                                                  │
│    Vector DB  │ → cosine similarity between query + stored      │
│    (pgvector) │ → top-k = 5 most relevant rows                   │
│    cosine sim │ → retrieved: fct_orders row (UK, Q=\xa32.1M)     │
│               └─────────────────────────────────────────────────│
│                                                                 │
│  4. CONTEXT  ─┐                                                  │
│    Retrieved  │ → format as context for the LLM                 │
│    rows +     │ → "Context: UK Q revenue = \xa32.1M, orders=1.2k"│
│    schema     └─────────────────────────────────────────────────│
│                                                                 │
│  5. GENERATE ─┐                                                  │
│    LLM (GPT/  │ → "UK revenue last quarter was \xa32.1M across    │
│    Claude)    │   1,200 orders. This is up 15% from the         │
│               │   previous quarter (\xa31.8M)."                    │
│               └─────────────────────────────────────────────────│
│                                                                 │
│  The Gold tables ARE the knowledge base.                       │
│  The LLM is the reasoning engine.                                │
│  The data platform IS the AI platform.                           │
└─────────────────────────────────────────────────────────────────┘`})}),(0,t.jsx)(a.SectionCard,{title:"Vector databases — the new query layer",icon:(0,t.jsx)(m.Database,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Vector DB"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Type"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Free tier"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Dimensions"})]})}),(0,t.jsx)("tbody",{children:b.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 text-xs font-semibold",children:e.name}),(0,t.jsx)("td",{className:"px-3 py-2 text-[11px] text-muted-foreground",children:e.type}),(0,t.jsx)("td",{className:"px-3 py-2 text-[11px] text-emerald-600 dark:text-emerald-400",children:e.free}),(0,t.jsx)("td",{className:"px-3 py-2 text-[11px] font-mono text-muted-foreground",children:e.dims})]},e.name))})]})})}),(0,t.jsx)(a.SectionCard,{title:"My deeper thought: Gold tables ARE embeddings",icon:(0,t.jsx)(x.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:['The deepest insight in the RAG pattern: your Gold tables don\'t need to be "connected to" an LLM — they need to be ',(0,t.jsx)("strong",{className:"text-foreground/80",children:"embedded into a vector space"}),". Each row in fct_orders becomes a 1536-dimensional vector. The LLM doesn't query your SQL; it queries the vector space. The vector DB is the new query layer — and pgvector means it's ",(0,t.jsx)("em",{children:"inside your existing Postgres"}),"."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The platform's Bronze→Silver→Gold pipeline IS the RAG ingestion pipeline."})," Bronze = raw source data. Silver = conformed/cleaned. Gold = embedded + vectorised + indexed. The same Airflow DAGs that refresh your BI dashboards can refresh your vector index. The same Unity Catalogue that governs PII tags governs which rows are embedded. The same CI/CD that deploys dbt models deploys embedding pipelines. One platform, many modalities."]}),(0,t.jsxs)("p",{children:["The agentic layer (ADR-019's bandit + the DQ triage agent) becomes the ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"intelligent query interface"}),'. Instead of writing SQL, you ask: "What was UK revenue last quarter?" The agent embeds the query, searches the Gold-table vector space, retrieves context, and generates a grounded answer. The data platform becomes a ',(0,t.jsx)("em",{children:"conversation"}),", not a dashboard."]})]})}),(0,t.jsx)(a.SectionCard,{title:"Try it: Vector similarity search (Pyodide)",icon:(0,t.jsx)(u.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(n.PyodideRunner,{code:`# RAG simulation — cosine similarity search in pure Python
# Shows how vector search retrieves relevant rows from a "knowledge base"

import math

def cosine_similarity(v1, v2):
    "Cosine sim = dot(a,b) / (|a| * |b|). 1.0 = identical, 0.0 = orthogonal."
    dot = sum(a * b for a, b in zip(v1, v2))
    mag1 = math.sqrt(sum(a * a for a in v1))
    mag2 = math.sqrt(sum(b * b for b in v2))
    if mag1 == 0 or mag2 == 0:
        return 0.0
    return dot / (mag1 * mag2)

# Simulated embeddings (in production: 1536-dim from text-embedding model)
# Each row in the "Gold table" is embedded as a 6-dim vector
knowledge_base = [
    {"id": "row_1", "text": "UK revenue Q3 = \xa32.1M, 1.2k orders",
     "vector": [0.9, 0.8, 0.7, 0.1, 0.3, 0.2]},
    {"id": "row_2", "text": "EU revenue Q3 = \xa31.8M, 0.9k orders",
     "vector": [0.7, 0.6, 0.8, 0.2, 0.4, 0.3]},
    {"id": "row_3", "text": "NA revenue Q3 = \xa33.2M, 2.1k orders",
     "vector": [0.8, 0.5, 0.6, 0.9, 0.7, 0.4]},
    {"id": "row_4", "text": "VIP customer churn rate = 3.2%",
     "vector": [0.1, 0.2, 0.1, 0.8, 0.9, 0.7]},
    {"id": "row_5", "text": "Returns rate UK = 6.4%, 78 returns",
     "vector": [0.9, 0.7, 0.8, 0.1, 0.2, 0.5]},
]

# User query: "What was UK revenue?"
# Embed using the same model (simulated as a vector)
query = "What was UK revenue last quarter?"
query_vector = [0.92, 0.75, 0.68, 0.05, 0.25, 0.15]

# Vector search — compute cosine similarity against all rows
results = []
for row in knowledge_base:
    sim = cosine_similarity(query_vector, row["vector"])
    results.append((row, sim))

# Sort by similarity (descending) — top-k retrieval
results.sort(key=lambda x: x[1], reverse=True)
top_k = 3

print("=" * 60)
print("RAG Vector Search — Cosine Similarity Retrieval")
print("=" * 60)
print(f"\\nQuery: '{query}'")
print(f"Query vector: {[round(v, 2) for v in query_vector]}")
print(f"\\nSearching {len(knowledge_base)} rows in knowledge base...")

print(f"\\nTop-{top_k} results (cosine similarity):")
for i, (row, sim) in enumerate(results[:top_k]):
    print(f"  {i+1}. [{row['id']}] sim={sim:.4f}")
    print(f"     → {row['text']}")

# Build context for the LLM
context = "\\n".join(f"- {r[0]['text']}" for r in results[:top_k])
print(f"\\n{'=' * 60}")
print("CONTEXT FOR LLM (top-3 retrieved rows):")
print(f"  {context}")
print(f"\\nLLM prompt: 'Based on this data: {context}\\n  Answer: What was UK revenue last quarter?'")
print(f"\\nExpected LLM output: 'UK revenue last quarter was \xa32.1M")
print(f"  across 1,200 orders. Returns rate was 6.4%.'")
print("=" * 60)`,buttonLabel:"Run RAG vector search (Pyodide)"})}),(0,t.jsx)(a.SectionCard,{title:"LangChain — the RAG orchestrator",icon:(0,t.jsx)(g.Brain,{className:"h-5 w-5"}),children:(0,t.jsx)(i.CodeBlock,{language:"python",filename:"rag_pipeline.py",highlight:[5,6,7,8,9,10,13,14,15,18,19,20,21,22,23],code:`from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import PGVector
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

# 1. EMBED — Gold table rows → vectors
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
# Each row in fct_orders/dim_customer → 1536-dim vector

# 2. STORE — vectors in pgvector (inside your existing Postgres)
vectorstore = PGVector(
    connection_string="postgresql://moderndatascieng-db:5432/rag",
    embedding_function=embeddings,
)

# 3. INDEX — ingest Gold table rows as documents
docs = [{"page_content": str(row), "metadata": {"table": "fct_orders"}}
        for row in gold_table_rows]
vectorstore.add_documents(docs)

# 4. RETRIEVE — vector search on user query
retriever = vectorstore.as_retriever(search_kwargs={"k": 5})

# 5. GENERATE — LLM answers grounded in retrieved context
qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(temperature=0),
    chain_type="stuff",
    retriever=retriever,
)

answer = qa_chain.run("What was UK revenue last quarter?")
# → "UK revenue last quarter was \xa32.1M across 1,200 orders."`})}),(0,t.jsxs)(v.DeeperThoughtSection,{pageTitle:"RAG & LLMs",children:[(0,t.jsx)(v.DeeperThought,{title:"RAG & LLMs IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about RAG & LLMs is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. RAG & LLMs connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where RAG & LLMs sits in the computational-science landscape."})}),(0,t.jsx)(v.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (RAG & LLMs) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(v.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(v.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(v.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(o.ResearchDemo,{pageId:"rag-llms"}),(0,t.jsx)(d.TrendAnticipation,{pageId:"rag-llms"}),(0,t.jsx)(s.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"neural-networks",reason:"Continue to neural networks — see also from this page"},{id:"ml-platform",reason:"Continue to ml platform — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(r.default,{href:(0,l.hrefFor)("neural-networks"),className:"text-sm text-primary hover:underline",children:"→ Neural Networks (Transformer architecture)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,l.hrefFor)("ml-platform"),className:"text-sm text-primary hover:underline",children:"→ ML Platform (MLOps lifecycle)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,l.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ See ADR-021 (ONNX) + ADR-020 (MLflow)"})]})]})}e.s(["RagLlmsPage",()=>y])}]);