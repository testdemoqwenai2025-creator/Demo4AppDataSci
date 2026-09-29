(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var t=e.i(843476),r=e.i(271645),n=e.i(487486),a=e.i(519455),s=e.i(716675),i=e.i(194058),o=e.i(862824),d=e.i(344396),l=e.i(178583),c=e.i(778917),h=e.i(283086),p=e.i(972520),m=e.i(217923),u=e.i(522016),x=e.i(901752);function f({pageId:e}){let r=(0,d.researchForPage)(e);return 0===r.length?null:(0,t.jsxs)(o.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,t.jsx)(l.FileText,{className:"h-5 w-5"}),badge:`${r.length} paper${1===r.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[r.map((e,r)=>(0,t.jsx)(g,{entry:e},r)),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[r.length," paper",1===r.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function g({entry:e}){let[o,d]=(0,r.useState)(!1),[l,f]=(0,r.useState)(null);return(0,t.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,t.jsx)(n.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,t.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,t.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,t.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,t.jsxs)(a.Button,{variant:"outline",size:"sm",onClick:()=>d(!o),className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(h.Sparkles,{className:"h-3 w-3"}),o?"Hide expected code":"Show expected code + visualization"]}),o&&(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(s.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let t=e.indexOf("{"),r=e.lastIndexOf("}");if(t>=0&&r>t){let n=e.substring(t,r+1);f(JSON.parse(n))}}catch{}},hideTextOutput:!!l,compact:!0}),l?(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(m.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,t.jsx)(i.AnalysisChart,{data:l,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,t.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,t.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,t.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,t.jsxs)(u.default,{href:(0,x.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,t.jsx)(p.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>f])},381475,e=>{"use strict";var t=e.i(843476),r=e.i(271645),n=e.i(846932),a=e.i(522016),s=e.i(862824),i=e.i(342046),o=e.i(122836),d=e.i(716675),l=e.i(921371),c=e.i(580296),h=e.i(901752),p=e.i(487486),m=e.i(332017),u=e.i(78094),x=e.i(852008),f=e.i(39312),g=e.i(25652),v=e.i(868054),j=e.i(455711),y=e.i(966992);let b=[{label:"Attention heads",value:"12-96",hint:"BERT-base: 12, GPT-3 175B: 96",deltaTone:"flat"},{label:"Context window",value:"4k-128k",hint:"GPT-4: 128k tokens, Claude: 200k",deltaTone:"flat"},{label:"Key equation",value:"softmax(QK^T/√d)V",hint:"The attention formula",deltaTone:"flat"},{label:"Params (GPT-3)",value:"175B",hint:"96 layers × 96 heads × 12288 dim",deltaTone:"flat"}];function w(){let[e,a]=(0,r.useState)(0);(0,r.useEffect)(()=>{let e=setInterval(()=>a(e=>(e+1)%4),1e3);return()=>clearInterval(e)},[]);let s=["The","cat","sat","on","the","mat"],i=["var(--chart-2)","var(--chart-1)","var(--chart-3)","var(--chart-4)","var(--chart-5)","var(--chart-1)"];return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("style",{children:`
        .attn-3d { perspective: 600px; }
        .attn-card { transform: rotateX(10deg); transform-style: preserve-3d; }
      `}),(0,t.jsx)("div",{className:"attn-3d",children:(0,t.jsxs)("div",{className:"attn-card",children:[(0,t.jsx)("div",{className:"flex justify-center gap-1 mb-3",children:s.map((r,a)=>(0,t.jsx)(n.motion.div,{animate:{scale:0===e&&2===a?1.3:1,backgroundColor:0===e&&2===a?"var(--primary)":"var(--muted)",color:0===e&&2===a?"var(--primary-foreground)":"var(--muted-foreground)"},className:"rounded px-2 py-1 text-xs font-mono",children:r},a))}),(0,t.jsxs)("svg",{viewBox:"0 0 300 80",className:"w-full h-20",children:[s.map((r,a)=>(0,t.jsx)(n.motion.line,{x1:150,y1:5,x2:25+50*a,y2:70,stroke:e>=1?i[a]:"transparent",strokeWidth:e>=2?2===a?3:1.5:.5,opacity:e>=1?2===a?.9:.4:0,initial:{pathLength:0},animate:{pathLength:+(e>=1)},transition:{delay:.05*a}},a)),s.map((r,a)=>(0,t.jsx)(n.motion.text,{x:25+50*a,y:78,textAnchor:"middle",fontSize:7,fill:"var(--muted-foreground)",initial:{opacity:0},animate:{opacity:+(e>=3)},children:[.05,.15,.05,.5,.05,.2][a]},`w-${a}`))]})]})}),(0,t.jsx)("div",{className:"flex justify-center gap-2 mt-2",children:["1. Query","2. Score (Q·K)","3. Softmax","4. Weight V"].map((r,n)=>(0,t.jsx)("div",{className:`text-[10px] px-2 py-0.5 rounded ${e===n?"bg-primary text-primary-foreground":"text-muted-foreground"}`,children:r},r))}),(0,t.jsxs)("p",{className:"text-[10px] text-muted-foreground text-center mt-2",children:['Self-attention: "sat" attends to all tokens. Q="sat", K=all tokens. Scores = Q·K',(0,t.jsx)("sup",{children:"T"}),"/√d. Softmax → weights. Output = Σ(weight × V)."]})]})}function T(){let[e,a]=(0,r.useState)(0);return(0,r.useEffect)(()=>{let e=setInterval(()=>a(e=>(e+1)%8),400);return()=>clearInterval(e)},[]),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("p",{className:"text-sm font-semibold mb-2",children:"Positional Encoding — sinusoidal"}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"mx-auto",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{className:"text-[10px] text-muted-foreground px-2 py-1",children:"pos\\d"}),Array.from({length:8},(e,r)=>(0,t.jsx)("th",{className:"text-[10px] text-muted-foreground px-1",children:r},r))]})}),(0,t.jsx)("tbody",{children:Array.from({length:6},(r,a)=>(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"text-[10px] font-mono text-muted-foreground px-2 py-1",children:a}),Array.from({length:8},(r,s)=>{let i,o,d=(i=1/Math.pow(1e4,2*Math.floor(s/2)/8),s%2==0?Math.sin(a*i):Math.cos(a*i)),l=s===e;return(0,t.jsx)("td",{className:"p-0.5",children:(0,t.jsx)(n.motion.div,{animate:{backgroundColor:(o=(d+1)/2)>.7?"oklch(0.55 0.16 165 / 0.8)":o>.4?"oklch(0.70 0.15 75 / 0.5)":"oklch(0.7 0 0 / 0.15)",scale:l?1.2:1,boxShadow:l?"0 0 8px oklch(0.55 0.16 165 / 0.5)":"none"},className:"h-8 w-10 rounded flex items-center justify-center text-[9px] font-mono text-white",children:d.toFixed(2)})},s)})]},a))})]})}),(0,t.jsxs)("p",{className:"text-[10px] text-muted-foreground text-center mt-2",children:["PE(pos, 2i) = sin(pos / 10000",(0,t.jsx)("sup",{children:"2i/d"}),"), PE(pos, 2i+1) = cos(pos / 10000",(0,t.jsx)("sup",{children:"2i/d"}),"). Each position gets a unique encoding — the model learns relative positions from these."]})]})}function k(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsxs)("svg",{viewBox:"0 0 400 200",className:"w-full h-auto",children:[(0,t.jsx)("text",{x:"20",y:"100",fill:"var(--foreground)",fontSize:10,fontWeight:600,children:"Input"}),(0,t.jsx)("text",{x:"20",y:"112",fill:"var(--muted-foreground)",fontSize:8,children:"(seq, d_model)"}),(0,t.jsx)("line",{x1:"55",y1:"100",x2:"90",y2:"50",stroke:"var(--chart-2)",strokeWidth:1}),(0,t.jsx)("line",{x1:"55",y1:"100",x2:"90",y2:"100",stroke:"var(--chart-3)",strokeWidth:1}),(0,t.jsx)("line",{x1:"55",y1:"100",x2:"90",y2:"150",stroke:"var(--chart-4)",strokeWidth:1}),(0,t.jsx)("text",{x:"75",y:"42",fill:"var(--chart-2)",fontSize:9,children:"Q"}),(0,t.jsx)("text",{x:"75",y:"95",fill:"var(--chart-3)",fontSize:9,children:"K"}),(0,t.jsx)("text",{x:"75",y:"165",fill:"var(--chart-4)",fontSize:9,children:"V"}),[0,1,2,3].map(e=>{let r=30+40*e;return(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:"110",y:r,width:"60",height:"25",rx:"3",fill:`oklch(0.55 0.16 ${165+30*e} / 0.15)`,stroke:`oklch(0.55 0.16 ${165+30*e} / 0.4)`,strokeWidth:1}),(0,t.jsxs)("text",{x:"140",y:r+16,fill:"var(--foreground)",fontSize:8,textAnchor:"middle",fontWeight:600,children:["Head ",e+1]}),(0,t.jsxs)("text",{x:"140",y:r+24,fill:"var(--muted-foreground)",fontSize:6,textAnchor:"middle",children:["d_k=","·"]}),(0,t.jsx)("line",{x1:"55",y1:"50",x2:"110",y2:r+12,stroke:"var(--chart-2)",strokeWidth:.5,opacity:.3}),(0,t.jsx)("line",{x1:"55",y1:"100",x2:"110",y2:r+12,stroke:"var(--chart-3)",strokeWidth:.5,opacity:.3}),(0,t.jsx)("line",{x1:"55",y1:"150",x2:"110",y2:r+12,stroke:"var(--chart-4)",strokeWidth:.5,opacity:.3})]},e)}),(0,t.jsx)("line",{x1:"170",y1:"100",x2:"210",y2:"100",stroke:"var(--muted-foreground)",strokeWidth:1}),(0,t.jsx)("text",{x:"190",y:"92",fill:"var(--muted-foreground)",fontSize:7,textAnchor:"middle",children:"concat"}),(0,t.jsx)("rect",{x:"210",y:"85",width:"50",height:"30",rx:"3",fill:"var(--primary)",opacity:.15,stroke:"var(--primary)",strokeWidth:1}),(0,t.jsx)("text",{x:"235",y:"100",fill:"var(--primary)",fontSize:9,textAnchor:"middle",fontWeight:600,children:"W_O"}),(0,t.jsx)("text",{x:"235",y:"110",fill:"var(--primary)",fontSize:6,textAnchor:"middle",children:"Linear"}),(0,t.jsx)("line",{x1:"260",y1:"100",x2:"310",y2:"100",stroke:"var(--muted-foreground)",strokeWidth:1}),(0,t.jsx)("text",{x:"330",y:"100",fill:"var(--foreground)",fontSize:10,fontWeight:600,children:"Output"}),(0,t.jsx)("text",{x:"330",y:"112",fill:"var(--muted-foreground)",fontSize:8,children:"(seq, d_model)"})]}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground text-center mt-2",children:"Multi-head attention: h parallel attention heads, each with learned Q/K/V projections. Concatenate + linear (W_O) → output. h=12 (BERT), h=96 (GPT-3)."})]})}let N=`# Self-Attention computation in pure Python
# Shows the 4 steps: Q, K, V → scores → softmax → weighted sum

import math

def softmax(vec):
    exps = [math.exp(v) for v in vec]
    total = sum(exps)
    return [e / total for e in exps]

# Synthetic Q, K, V for 3 tokens (4-dim each)
# In a real Transformer: Q = x @ W_Q, K = x @ W_K, V = x @ W_V
Q = [[1.0, 0.5, -0.3, 0.8],   # token "The"
     [0.2, 0.9, 0.4, -0.1],   # token "cat"
     [-0.5, 0.3, 1.2, 0.6]]    # token "sat"

K = [[1.0, 0.5, -0.3, 0.8],
     [0.2, 0.9, 0.4, -0.1],
     [-0.5, 0.3, 1.2, 0.6]]

V = [[0.1, 0.9, 0.3, 0.7],
     [0.8, 0.2, 0.5, 0.1],
     [0.3, 0.6, 0.9, 0.4]]

d_k = len(Q[0])  # dimension of keys = 4

print("=" * 60)
print("Self-Attention Computation")
print("=" * 60)
print(f"\\nTokens: 3, Dimension: {d_k}")

# Step 1: Compute scores = Q @ K^T / sqrt(d_k)
print("\\n--- Step 1: Attention Scores (Q . K^T / sqrt(d_k)) ---")
scores = []
for i in range(3):
    row = []
    for j in range(3):
        dot = sum(Q[i][d] * K[j][d] for d in range(d_k))
        row.append(dot / math.sqrt(d_k))
    scores.append(row)
    
for i in range(3):
    print(f"  Token {i}: scores = {[f'{s:.3f}' for s in scores[i]]}")

# Step 2: Softmax normalisation
print("\\n--- Step 2: Softmax (normalise to probabilities) ---")
attn_weights = [softmax(scores[i]) for i in range(3)]
for i in range(3):
    print(f"  Token {i}: weights = {[f'{w:.3f}' for w in attn_weights[i]]}")

# Step 3: Weighted sum of values
print("\\n--- Step 3: Weighted sum (attention @ V) ---")
output = []
for i in range(3):
    out = [0.0] * d_k
    for j in range(3):
        for d in range(d_k):
            out[d] += attn_weights[i][j] * V[j][d]
    output.append(out)

for i in range(3):
    print(f"  Token {i}: output = {[f'{v:.3f}' for v in output[i]]}")

print(f"\\n{'=' * 60}")
print("RESULT: Self-Attention(Q, K, V) = softmax(Q\xb7K^T/√d_k) \xb7 V")
print(f"\\nKey insight: each token's output is a weighted average of ALL")
print(f"tokens' values, weighted by how much it 'attends' to each.")
print(f"\\nThis is the core of the Transformer — no recurrence, no")
print(f"convolution, just attention. The model LEARNS Q/K/V weights.")
print("=" * 60)`,_=`# Positional Encoding — sinusoidal (from "Attention Is All You Need")
import math

def positional_encoding(seq_len, d_model):
    "PE(pos, 2i) = sin(pos/10000^(2i/d)), PE(pos, 2i+1) = cos(pos/10000^(2i/d))"
    pe = []
    for pos in range(seq_len):
        row = []
        for i in range(d_model):
            freq = 1 / math.pow(10000, 2 * (i // 2) / d_model)
            if i % 2 == 0:
                row.append(math.sin(pos * freq))
            else:
                row.append(math.cos(pos * freq))
        pe.append(row)
    return pe

# Generate PE for 6 positions \xd7 8 dimensions
pe = positional_encoding(6, 8)

print("=" * 60)
print("Positional Encoding — Sinusoidal")
print("=" * 60)
print(f"\\nPositions: 6, Dimensions: 8")
print(f"\\n{'Pos':>4}", end="")
for d in range(8):
    print(f"  d{d:02d}", end="")
print()

for pos in range(6):
    print(f"{pos:>4}", end="")
    for d in range(8):
        print(f" {pe[pos][d]:>5.2f}", end="")
    print()

# Show that relative positions are learnable
print(f"\\n{'=' * 60}")
print("KEY PROPERTY: dot product of PEs encodes RELATIVE position")
print()

# Dot product of PE(pos=0) and PE(pos=k) for k=0..5
for k in range(6):
    dot = sum(pe[0][d] * pe[k][d] for d in range(8))
    print(f"  PE(0) . PE({k}) = {dot:+.4f}  (closer positions → higher dot product)")

print(f"\\nThe sinusoidal encoding lets the model learn relative positions")
print(f"via linear projections of PE — no recurrence needed.")
print("=" * 60)`;function S(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(s.PageHeader,{eyebrow:"Transformer · deep architecture",title:"Transformer Architecture Deep Dive",description:"The architecture behind GPT, BERT, Claude, and every modern LLM. Animated self-attention mechanism, sinusoidal positional encoding heatmap, multi-head attention diagram, and Pyodide demos computing real attention scores + positional encodings. With low-level PyTorch code showing exactly how MultiheadAttention is implemented.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(u.Network,{className:"h-3 w-3"})," 3D animated"]}),(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(f.Zap,{className:"h-3 w-3"})," Pyodide"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:b.map(e=>(0,t.jsx)(s.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(s.SectionCard,{title:"3D Animation: Self-Attention Mechanism",description:"Watch 'sat' attend to all other tokens. 4-step cycle: Query → Score (Q·K) → Softmax → Weight V. The attention weights determine how much each token contributes to the output.",icon:(0,t.jsx)(u.Network,{className:"h-5 w-5"}),badge:"3D animated",children:(0,t.jsx)(w,{})}),(0,t.jsxs)(s.SectionCard,{title:"The equation that changed AI",description:"'Attention Is All You Need' (2017). One equation that replaced recurrence + convolution with pure attention.",icon:(0,t.jsx)(j.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:[(0,t.jsx)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-4 text-center",children:(0,t.jsxs)("p",{className:"font-mono text-lg text-primary",children:["Attention(Q, K, V) = softmax(Q · K",(0,t.jsx)("sup",{children:"T"})," / √d",(0,t.jsx)("sub",{children:"k"}),") · V"]})}),(0,t.jsxs)("div",{className:"mt-3 grid md:grid-cols-4 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2",children:[(0,t.jsx)("p",{className:"font-semibold",children:"Q (Query)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:'"What am I looking for?" — x @ W_Q'})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2",children:[(0,t.jsx)("p",{className:"font-semibold",children:"K (Key)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:'"What do I contain?" — x @ W_K'})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2",children:[(0,t.jsx)("p",{className:"font-semibold",children:"V (Value)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:'"What do I contribute?" — x @ W_V'})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2",children:[(0,t.jsxs)("p",{className:"font-semibold",children:["√d",(0,t.jsx)("sub",{children:"k"})]}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"Scaling factor — prevents softmax saturation in high dimensions"})]})]})]}),(0,t.jsx)(s.SectionCard,{title:"Try it: Self-attention computation (Pyodide)",description:"Computes real attention scores, softmax weights, and weighted value sums on 3 synthetic tokens. The 4-step computation that powers every Transformer. Pure Python — no PyTorch, no NumPy.",icon:(0,t.jsx)(v.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:N,buttonLabel:"Run attention computation (Pyodide)"})}),(0,t.jsx)(s.SectionCard,{title:"Animation: Positional Encoding Heatmap",description:"Sinusoidal positional encoding gives each position a unique signature. The model learns relative positions from these encodings. Watch the dimension highlight cycle through.",icon:(0,t.jsx)(x.Layers,{className:"h-5 w-5"}),badge:"animated",children:(0,t.jsx)(T,{})}),(0,t.jsx)(s.SectionCard,{title:"Try it: Positional encoding computation (Pyodide)",description:"Generates the full sinusoidal PE matrix (6 positions × 8 dimensions) and shows that dot products encode relative position.",icon:(0,t.jsx)(v.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:_,buttonLabel:"Run positional encoding (Pyodide)"})}),(0,t.jsx)(s.SectionCard,{title:"Multi-Head Attention Diagram",description:"h parallel attention heads, each with learned Q/K/V projections. Concatenate + linear (W_O) → output. h=12 (BERT-base), h=96 (GPT-3 175B).",icon:(0,t.jsx)(u.Network,{className:"h-5 w-5"}),children:(0,t.jsx)(k,{})}),(0,t.jsx)(s.SectionCard,{title:"Low-level code: MultiheadAttention in PyTorch",description:"The actual implementation. Every nn.MultiheadAttention in PyTorch is built on this pattern. Q/K/V projections, scaled dot-product, softmax, weighted sum.",icon:(0,t.jsx)(y.Cpu,{className:"h-5 w-5"}),badge:"low-level",children:(0,t.jsx)(o.CodeBlock,{language:"python",filename:"multihead_attention.py",highlight:[8,9,10,13,14,15,16,19,20,21,22,23,24,25,26,29,30,31,32,33],code:`import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model=512, n_heads=8):
        super().__init__()
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads  # dimension per head
        
        # Learnable projections
        self.W_q = nn.Linear(d_model, d_model)  # query projection
        self.W_k = nn.Linear(d_model, d_model)  # key projection
        self.W_v = nn.Linear(d_model, d_model)  # value projection
        self.W_o = nn.Linear(d_model, d_model)  # output projection
    
    def forward(self, x, mask=None):
        batch, seq_len, _ = x.shape
        
        # Project to Q, K, V
        Q = self.W_q(x)  # (batch, seq, d_model)
        K = self.W_k(x)
        V = self.W_v(x)
        
        # Reshape to (batch, n_heads, seq, d_k)
        Q = Q.view(batch, seq_len, self.n_heads, self.d_k).transpose(1, 2)
        K = K.view(batch, seq_len, self.n_heads, self.d_k).transpose(1, 2)
        V = V.view(batch, seq_len, self.n_heads, self.d_k).transpose(1, 2)
        
        # Scaled dot-product attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        attn = F.softmax(scores, dim=-1)  # (batch, heads, seq, seq)
        
        # Weighted sum of values
        output = torch.matmul(attn, V)  # (batch, heads, seq, d_k)
        
        # Concatenate heads + output projection
        output = output.transpose(1, 2).contiguous().view(batch, seq_len, self.d_model)
        return self.W_o(output)  # (batch, seq, d_model)

# Usage
attn = MultiHeadAttention(d_model=512, n_heads=8)
x = torch.randn(1, 10, 512)  # batch=1, seq=10, dim=512
out = attn(x)  # → (1, 10, 512)
print(f"Input:  {x.shape}")
print(f"Output: {out.shape}")
print(f"Params: {sum(p.numel() for p in attn.parameters()):,}")`})}),(0,t.jsx)(s.SectionCard,{title:"The full Transformer block",description:"One layer of a Transformer: multi-head attention + add&norm + feed-forward + add&norm. Stacked N times (N=6 for base, N=96 for GPT-3).",icon:(0,t.jsx)(x.Layers,{className:"h-5 w-5"}),children:(0,t.jsx)(o.CodeBlock,{language:"text",filename:"transformer_block.txt",code:`┌──────────────────────────────────────────────────────────┐
│  TRANSFORMER BLOCK (repeated N times)                     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Multi-Head Self-Attention                         │ │
│  │  Q = x @ W_Q, K = x @ W_K, V = x @ W_V             │ │
│  │  Attention = softmax(Q\xb7K^T/√d_k)\xb7V                 │ │
│  │  Output = concat(heads) @ W_O                       │ │
│  └────────────────────────────────────────────────────┘ │
│  ↓ + residual (x)                                        │
│  ↓ LayerNorm                                            │
│  ↓                                                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Feed-Forward Network (2-layer MLP)               │ │
│  │  FFN(x) = max(0, x\xb7W_1 + b_1) \xb7 W_2 + b_2          │ │
│  │  d_model → d_ff (4\xd7) → d_model                      │ │
│  │  Activation: ReLU (original) or GELU (GPT/BERT)    │ │
│  └────────────────────────────────────────────────────┘ │
│  ↓ + residual                                           │
│  ↓ LayerNorm                                            │
│  ↓                                                      │
│  → output to next block (same shape: seq \xd7 d_model)      │
└──────────────────────────────────────────────────────────┘

GPT-3 175B: 96 blocks \xd7 96 heads \xd7 d_model=12288 \xd7 d_ff=49152
= 175,000,000,000 parameters`})}),(0,t.jsx)(s.SectionCard,{title:"My deeper thought: attention IS content-addressable memory",description:"The deepest way to understand attention: it's content-addressable memory. Each token asks 'who has information relevant to me?' and retrieves it.",icon:(0,t.jsx)(g.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:['The standard explanation of attention is "tokens look at each other." But the deeper truth is: ',(0,t.jsx)("strong",{className:"text-foreground/80",children:"attention is a content-addressable memory system"}),'. Q is the query ("what do I need?"), K is the index ("what do I have?"), V is the content ("what do I contribute?"). The dot product Q·K measures similarity — how relevant is each memory to the query. Softmax normalises to a probability distribution over memories. The weighted sum of V is the retrieved content.']}),(0,t.jsxs)("p",{children:["This connects directly to the platform's RAG architecture (ADR-022): ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"RAG IS attention over an external knowledge base"}),". The user's question is Q. The Gold table embeddings are K+V. Cosine similarity is the dot product Q·K. The top-k retrieved rows are the attention weights. The LLM's context window is the weighted sum of V. RAG is attention, just with the K+V stored in pgvector instead of in the model's parameters."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The unified semantic layer (ADR-024)"})," is the final convergence: MetricFlow entities define what the K+V vectors contain (the schema). RAG (pgvector) provides the retrieval mechanism. LoRA (ADR-023) adapts the Q/K/V projections to the platform's domain. The user asks \"what was UK revenue?\" → the LoRA-adapted Q projection embeds the question → pgvector retrieves the matching Gold table rows (K·V) → the LLM generates a grounded answer. Attention IS retrieval. RAG IS attention. The platform IS the Transformer's external memory."]}),(0,t.jsxs)("p",{children:["The multi-head mechanism is the model's way of attending to ",(0,t.jsx)("em",{children:"different aspects"}),' simultaneously — one head might attend to "revenue" (the number), another to "UK" (the region), another to "Q3" (the time). Each head is a different "perspective" on the same data. The multi-head attention diagram on this page shows how h parallel heads each compute their own attention, then concatenate into the final output. In the RAG analogy: each head is a different search query against the vector DB — "revenue AND UK AND Q3" vs "customers AND VIP AND churn" — each retrieving different rows, all combined into the final answer.']})]})}),(0,t.jsxs)(m.DeeperThoughtSection,{pageTitle:"Transformer Architecture Deep Dive",children:[(0,t.jsx)(m.DeeperThought,{title:"Transformer Architecture Deep Dive IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Transformer Architecture Deep Dive is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Transformer Architecture Deep Dive connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Transformer Architecture Deep Dive sits in the computational-science landscape."})}),(0,t.jsx)(m.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Transformer Architecture Deep Dive) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(m.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(m.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(m.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(l.ResearchDemo,{pageId:"transformer"}),(0,t.jsx)(c.TrendAnticipation,{pageId:"transformer"}),(0,t.jsx)(i.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"neural-networks",reason:"Continue to neural networks — see also from this page"},{id:"fine-tuning",reason:"Continue to fine tuning — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,h.hrefFor)("neural-networks"),className:"text-sm text-primary hover:underline",children:"→ Neural Networks (activation functions + backprop)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("fine-tuning"),className:"text-sm text-primary hover:underline",children:"→ LLM Fine-Tuning (LoRA + DPO)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("rag-llms"),className:"text-sm text-primary hover:underline",children:"→ RAG & LLMs (attention IS retrieval)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ ADR-024 (semantic layer)"})]})]})}e.s(["TransformerPage",()=>S])}]);