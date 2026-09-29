(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var t=e.i(843476),a=e.i(271645),r=e.i(487486),s=e.i(519455),i=e.i(716675),o=e.i(194058),n=e.i(862824),d=e.i(344396),l=e.i(178583),c=e.i(778917),m=e.i(283086),p=e.i(972520),h=e.i(217923),u=e.i(522016),g=e.i(901752);function x({pageId:e}){let a=(0,d.researchForPage)(e);return 0===a.length?null:(0,t.jsxs)(n.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,t.jsx)(l.FileText,{className:"h-5 w-5"}),badge:`${a.length} paper${1===a.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[a.map((e,a)=>(0,t.jsx)(f,{entry:e},a)),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[a.length," paper",1===a.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function f({entry:e}){let[n,d]=(0,a.useState)(!1),[l,x]=(0,a.useState)(null);return(0,t.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,t.jsx)(r.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,t.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,t.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,t.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,t.jsxs)(s.Button,{variant:"outline",size:"sm",onClick:()=>d(!n),className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(m.Sparkles,{className:"h-3 w-3"}),n?"Hide expected code":"Show expected code + visualization"]}),n&&(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(i.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let t=e.indexOf("{"),a=e.lastIndexOf("}");if(t>=0&&a>t){let r=e.substring(t,a+1);x(JSON.parse(r))}}catch{}},hideTextOutput:!!l,compact:!0}),l?(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(h.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,t.jsx)(o.AnalysisChart,{data:l,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,t.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,t.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,t.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,t.jsxs)(u.default,{href:(0,g.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,t.jsx)(p.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>x])},735872,e=>{"use strict";var t=e.i(843476),a=e.i(271645),r=e.i(846932),s=e.i(522016),i=e.i(862824),o=e.i(342046),n=e.i(921371),d=e.i(580296),l=e.i(122836),c=e.i(716675),m=e.i(901752),p=e.i(487486),h=e.i(332017),u=e.i(966992),g=e.i(39312),x=e.i(25652),f=e.i(868054),b=e.i(455711),P=e.i(21218),y=e.i(78094),_=e.i(828579);let v=[{label:"Memory per GPU (DDP)",value:"16·B GB",hint:"Full replica — params + grads + optim states",deltaTone:"flat"},{label:"Memory per GPU (FSDP)",value:"16·B/P GB",hint:"Sharded — P× less memory per GPU",deltaTone:"flat"},{label:"AllReduce cost",value:"2·B·P·log₂P bytes",hint:"Ring AllReduce per step (DDP)",deltaTone:"flat"},{label:"FSDP comm cost",value:"4·B bytes/layer",hint:"AllGather + ReduceScatter (pipelined)",deltaTone:"flat"}];function w(){let[e,s]=(0,a.useState)(0);(0,a.useEffect)(()=>{let e=setInterval(()=>s(e=>(e+1)%8),800);return()=>clearInterval(e)},[]);let i=Array.from({length:8},(e,t)=>t),o=e<4?"reduce-scatter":"all-gather",n=e%4;return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("style",{children:`
        .ar-3d { perspective: 700px; }
        .ar-stage { transform: rotateX(20deg); transform-style: preserve-3d; }
      `}),(0,t.jsxs)("p",{className:"text-sm font-semibold mb-3 flex items-center gap-2",children:[(0,t.jsx)(y.Network,{className:"h-4 w-4 text-primary"}),"Ring AllReduce — 8 GPUs, two phases",(0,t.jsxs)("span",{className:"text-[10px] font-mono text-muted-foreground ml-auto",children:["step ",e+1,"/8 · ",o]})]}),(0,t.jsx)("div",{className:"ar-3d",children:(0,t.jsx)("div",{className:"ar-stage flex justify-center",children:(0,t.jsxs)("svg",{width:"240",height:"240",viewBox:"0 0 240 240",children:[i.map((e,a)=>{let s=a/8*2*Math.PI-Math.PI/2,i=(a+1)%8/8*2*Math.PI-Math.PI/2,d=120+80*Math.cos(s),l=120+80*Math.sin(s),c=120+80*Math.cos(i),m=120+80*Math.sin(i),p="reduce-scatter"===o?a===n:a===(n+4)%8;return(0,t.jsx)(r.motion.line,{x1:d,y1:l,x2:c,y2:m,stroke:p?"var(--chart-2)":"var(--border)",strokeWidth:p?2.5:1,animate:{opacity:p?1:.4}},`link-${a}`)}),i.map((e,a)=>{let s=a/8*2*Math.PI-Math.PI/2,i=120+80*Math.cos(s),d=120+80*Math.sin(s),l="reduce-scatter"===o&&(a===n||a===(n+1)%8)||"all-gather"===o&&(a===(n+4)%8||a===(n+5)%8);return(0,t.jsxs)(r.motion.g,{children:[(0,t.jsx)(r.motion.circle,{cx:i,cy:d,r:14,fill:l?"var(--primary)":"var(--muted)",animate:{scale:l?1.2:1}}),(0,t.jsx)("text",{x:i,y:d+4,textAnchor:"middle",fontSize:10,fill:"var(--background)",fontWeight:"bold",children:e})]},`gpu-${e}`)}),i.map((e,a)=>{let s=a/8*2*Math.PI-Math.PI/2,i=120+55*Math.cos(s),d=120+55*Math.sin(s),l="reduce-scatter"===o?`c${e}->c${(e+1)%8}`:`c${e}+`;return(0,t.jsx)(r.motion.text,{x:i,y:d,textAnchor:"middle",fontSize:7,fill:"var(--muted-foreground)",initial:{opacity:0},animate:{opacity:"reduce-scatter"===o&&a===n||"all-gather"===o&&a===(n+4)%8?1:.3},children:l},`chunk-${e}`)})]})})}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2 mt-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"Phase 1: Reduce-Scatter (steps 1-4)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"Each GPU sends a chunk to its neighbour and receives a chunk from the previous neighbour. After log₂(P) steps, each GPU has the fully-reduced chunk for one partition."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/40 bg-violet-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-violet-600 dark:text-violet-400 mb-1",children:"Phase 2: All-Gather (steps 5-8)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"Each GPU propagates its reduced partition around the ring. After log₂(P) more steps, every GPU has the fully-reduced gradient."})]})]}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground text-center mt-3",children:"Total comm cost: 2·(P-1)·(B/P) = 2·B·(P-1)/P per GPU. Bandwidth-optimal — each GPU sends/receives 2·(P-1)/P chunks, asymptotically 2·B bytes regardless of P."})]})}function N(){return(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)("p",{className:"text-sm text-muted-foreground",children:"Memory breakdown for a 1B-parameter model in FP32 + Adam optimiser (states = 2× params) + activations. All values in GB. A100 has 80GB."}),(0,t.jsx)("div",{className:"space-y-2.5",children:[{name:"Single GPU (no shard)",params:16,grads:16,optim:32,activations:8,total:72,color:"var(--chart-5)",note:"1B model needs 72GB — exceeds 80GB A100"},{name:"DDP (P=8, replicate)",params:16,grads:16,optim:32,activations:1,total:65,color:"var(--chart-2)",note:"Same per-GPU — only batch is split. 65GB on each A100"},{name:"ZeRO-2 (P=8, shard grads+optim)",params:16,grads:2,optim:4,activations:1,total:23,color:"var(--chart-3)",note:"Params still replicated. 23GB per GPU"},{name:"FSDP / ZeRO-3 (P=8, shard all)",params:2,grads:2,optim:4,activations:1,total:9,color:"var(--chart-4)",note:"Everything sharded. 9GB per GPU — fits a 8B model on 8× A100"}].map(e=>(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex justify-between text-xs",children:[(0,t.jsx)("span",{className:"font-mono font-semibold",children:e.name}),(0,t.jsxs)("span",{className:"font-mono text-muted-foreground",children:[e.total," GB"]})]}),(0,t.jsxs)("div",{className:"flex h-6 rounded-md overflow-hidden border border-border/60",children:[(0,t.jsx)(r.motion.div,{initial:{width:0},animate:{width:`${e.params/80*100}%`},transition:{duration:.5},style:{backgroundColor:"oklch(0.55 0.20 250 / 0.6)"},className:"flex items-center justify-center text-[9px] font-mono",title:`Params: ${e.params}GB`,children:e.params}),(0,t.jsx)(r.motion.div,{initial:{width:0},animate:{width:`${e.grads/80*100}%`},transition:{duration:.5,delay:.1},style:{backgroundColor:"oklch(0.55 0.20 75 / 0.6)"},className:"flex items-center justify-center text-[9px] font-mono",title:`Grads: ${e.grads}GB`,children:e.grads}),(0,t.jsx)(r.motion.div,{initial:{width:0},animate:{width:`${e.optim/80*100}%`},transition:{duration:.5,delay:.2},style:{backgroundColor:"oklch(0.55 0.20 145 / 0.6)"},className:"flex items-center justify-center text-[9px] font-mono",title:`Optim states: ${e.optim}GB`,children:e.optim}),(0,t.jsx)(r.motion.div,{initial:{width:0},animate:{width:`${e.activations/80*100}%`},transition:{duration:.5,delay:.3},style:{backgroundColor:"oklch(0.55 0.20 30 / 0.6)"},className:"flex items-center justify-center text-[9px] font-mono",title:`Activations: ${e.activations}GB`,children:e.activations})]}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground",children:e.note})]},e.name))}),(0,t.jsxs)("div",{className:"flex gap-3 text-[10px] text-muted-foreground flex-wrap",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded",style:{backgroundColor:"oklch(0.55 0.20 250 / 0.6)"}}),"Params"]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded",style:{backgroundColor:"oklch(0.55 0.20 75 / 0.6)"}}),"Gradients"]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded",style:{backgroundColor:"oklch(0.55 0.20 145 / 0.6)"}}),"Optim states"]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded",style:{backgroundColor:"oklch(0.55 0.20 30 / 0.6)"}}),"Activations"]})]})]})}let j=`# Ring AllReduce + DDP vs FSDP memory math (Pyodide)
# Shows the actual algorithm + memory computation

import math

# ============================================================
# Ring AllReduce — the algorithm
# ============================================================
# For P GPUs, each holding a tensor of size N:
# Phase 1: Reduce-Scatter (P-1 steps)
#   At step k, GPU i sends chunk[(i-k) mod P] to GPU (i+1) mod P
#   GPU (i+1) receives and ADDS it to its chunk[(i-k) mod P]
# Phase 2: All-Gather (P-1 steps)
#   At step k, GPU i sends chunk[(i-k+1) mod P] to GPU (i+1) mod P
#   GPU (i+1) overwrites its chunk with the received value
# Total: 2(P-1) steps, each transfers N/P bytes per GPU
# Bandwidth-optimal: total bytes per GPU = 2N(P-1)/P ≈ 2N for large P

def ring_allreduce_simulation(P=8, N=1_000_000):
    "Simulate Ring AllReduce on P GPUs, each with N-element tensor."
    print(f"Ring AllReduce: P={P} GPUs, N={N:,} elements per GPU")
    print(f"  Per-step transfer: {N//P:,} elements (= N/P)")
    print(f"  Phase 1 (Reduce-Scatter): {P-1} steps")
    print(f"  Phase 2 (All-Gather):     {P-1} steps")
    print(f"  Total steps:              {2*(P-1)}")
    print(f"  Total bytes per GPU:      {2*(P-1)*N//P:,} = 2N(P-1)/P")
    print(f"  Asymptotic limit (P→∞):   ~2N (bandwidth-optimal)")
    print(f"  Compare to naive All2All:  P*N = {P*N:,} bytes per GPU (P\xd7 more!)")

print("=" * 60)
print("Ring AllReduce Simulation")
print("=" * 60)
ring_allreduce_simulation(P=8, N=10_000_000)

# ============================================================
# Memory math: DDP vs ZeRO-2 vs FSDP
# ============================================================
def memory_breakdown(B_params, P_gpus, precision='fp32', optim_states=2):
    """
    B_params: billions of parameters
    P_gpus: number of GPUs
    precision: 'fp32' (4 bytes), 'bf16' (2 bytes), 'int8' (1 byte)
    optim_states: 2 for Adam (momentum + variance)
    """
    bytes_per = {'fp32': 4, 'bf16': 2, 'int8': 1}[precision]
    bytes_per_param = bytes_per
    bytes_per_grad = bytes_per  # same as params
    bytes_per_optim = bytes_per * optim_states  # FP32 states always
    
    # Params in GB
    param_gb = B_params * bytes_per_param  # 4 bytes \xd7 B billion = 4B GB
    grad_gb = B_params * bytes_per_grad
    optim_gb = B_params * bytes_per_optim
    # Activations (rough): batch * seq_len * hidden_dim * num_layers
    # For transformer: 12 layers, hidden 768, batch 32, seq 512
    act_gb = 32 * 512 * 768 * 12 * bytes_per / 1e9  # ~0.15 GB per layer
    
    print(f"\\n{'=' * 60}")
    print(f"Memory for {B_params}B-param model, P={P_gpus} GPUs, {precision}")
    print(f"{'=' * 60}")
    
    # DDP: replicate everywhere
    ddp_per_gpu = param_gb + grad_gb + optim_gb + act_gb
    print(f"\\nDDP (replicate):")
    print(f"  Params:  {param_gb:.2f} GB")
    print(f"  Grads:   {grad_gb:.2f} GB")
    print(f"  Optim:   {optim_gb:.2f} GB (Adam: 2x params in FP32)")
    print(f"  Activs:  {act_gb:.2f} GB")
    print(f"  Total:   {ddp_per_gpu:.2f} GB per GPU  ({'fits A100 80GB' if ddp_per_gpu < 80 else 'EXCEEDS A100 80GB'})")
    
    # ZeRO-2: shard grads + optim
    zero2_per_gpu = param_gb + (grad_gb + optim_gb) / P_gpus + act_gb
    print(f"\\nZeRO-2 (shard grads+optim):")
    print(f"  Params:  {param_gb:.2f} GB (still replicated)")
    print(f"  Sharded: {(grad_gb + optim_gb) / P_gpus:.2f} GB (grads+optim)/P")
    print(f"  Activs:  {act_gb:.2f} GB")
    print(f"  Total:   {zero2_per_gpu:.2f} GB per GPU  ({P_gpus}\xd7 shard savings: {(grad_gb + optim_gb) / P_gpus:.2f})")
    
    # FSDP / ZeRO-3: shard everything
    fsdp_per_gpu = (param_gb + grad_gb + optim_gb) / P_gpus + act_gb
    print(f"\\nFSDP / ZeRO-3 (shard all):")
    print(f"  Sharded: {(param_gb + grad_gb + optim_gb) / P_gpus:.2f} GB (everything)/P")
    print(f"  Activs:  {act_gb:.2f} GB")
    print(f"  Total:   {fsdp_per_gpu:.2f} GB per GPU  ({P_gpus}\xd7 savings: {(param_gb + grad_gb + optim_gb) / P_gpus:.2f})")
    
    print(f"\\nMax model size on {P_gpus}\xd7A100 80GB:")
    max_b_ddp = 80 * P_gpus / (bytes_per * (1 + 1 + optim_states) + act_gb / 1)
    max_b_fsdp = 80 * P_gpus / (bytes_per * (1 + 1 + optim_states) + act_gb * P_gpus)
    print(f"  DDP:  {max_b_ddp:.1f}B params total")
    print(f"  FSDP: {max_b_fsdp:.1f}B params total  ({max_b_fsdp / max_b_ddp:.1f}\xd7 larger)")

# Test cases
memory_breakdown(B_params=1, P_gpus=8, precision='fp32')   # 1B model on 8 GPUs
memory_breakdown(B_params=7, P_gpus=8, precision='bf16')   # 7B Llama on 8 GPUs
memory_breakdown(B_params=70, P_gpus=64, precision='bf16')  # 70B Llama on 64 GPUs

print(f"\\n{'=' * 60}")
print("KEY TAKEAWAYS:")
print("  - DDP: each GPU has the FULL model → limits at ~B params per 80GB A100")
print("  - FSDP: each GPU has B/P params → scales linearly with P")
print("  - For 70B Llama: needs 64\xd7 A100 (DDP impossible, FSDP works)")
print("  - Mixed precision (BF16) doubles throughput + halves memory")
print("  - Adam optim states (FP32) are 2x params — the silent memory killer")
print("=" * 60)`,k=`import torch
import torch.nn as nn
import torch.distributed as dist
import torch.distributed.fsdp as fsdp
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
from torch.distributed.fsdp import MixedPrecision, ShardingStrategy
from torch.distributed.fsdp.wrap import size_based_auto_wrap
import functools

# ============================================================
# Setup: initialise the process group
# ============================================================

def setup_distributed(rank, world_size, port=29500):
    """Initialise torch.distributed for multi-GPU training.
    
    Typical launch: torchrun --nproc_per_node=8 train.py
    This sets RANK, WORLD_SIZE, MASTER_ADDR, MASTER_PORT env vars.
    """
    import os
    os.environ.setdefault("MASTER_ADDR", "localhost")
    os.environ.setdefault("MASTER_PORT", str(port))
    
    # Backend: nccl for GPU (fastest), gloo for CPU
    backend = "nccl" if torch.cuda.is_available() else "gloo"
    dist.init_process_group(backend, rank=rank, world_size=world_size)
    
    # Each process pins to its GPU
    if torch.cuda.is_available():
        torch.cuda.set_device(rank)
    print(f"[rank {rank}] Initialised with backend={backend}, world_size={world_size}")

def cleanup():
    dist.destroy_process_group()

# ============================================================
# DDP: DistributedDataParallel — the baseline
# ============================================================

def train_ddp(rank, world_size):
    """DDP training: replicate model on every GPU, split batch.
    
    Memory: 16\xb7B GB per GPU (full replica)
    Comm: AllReduce gradients every step (ring algorithm)
    """
    setup_distributed(rank, world_size)
    
    # 1. Model — IDENTICAL copy on every GPU (DDP replicates)
    model = BigTransformerModel(num_params=1_000_000_000).cuda()
    model = nn.parallel.DistributedDataParallel(
        model,
        device_ids=[rank],
    )
    
    # 2. Sampler — MUST use DistributedSampler to split the dataset
    dataset = load_dataset()
    sampler = torch.utils.data.distributed.DistributedSampler(
        dataset,
        num_replicas=world_size,
        rank=rank,
        shuffle=True,
    )
    loader = torch.utils.data.DataLoader(
        dataset, sampler=sampler, batch_size=32, num_workers=4,
    )
    
    optim = torch.optim.AdamW(model.parameters(), lr=1e-4)
    
    for epoch in range(10):
        sampler.set_epoch(epoch)  # CRITICAL: shuffles differently each epoch
        for batch in loader:
            # Each GPU processes a different 32-sample batch
            x, y = batch
            x, y = x.cuda(), y.cuda()
            
            # Forward
            loss = model(x, y)
            loss.backward()  # DDP hooks fire here → AllReduce grads
            
            # Gradients are now AVERAGED across all GPUs (DDP does this)
            optim.step()
            optim.zero_grad()
    
    cleanup()

# ============================================================
# FSDP: Fully Sharded Data Parallel — for big models
# ============================================================

def train_fsdp(rank, world_size):
    """FSDP training: shard parameters + gradients + optimiser states.
    
    Memory: 16\xb7B/P GB per GPU (sharded)
    Comm: AllGather (forward) + ReduceScatter (backward) per layer
    """
    setup_distributed(rank, world_size)
    
    # 1. Model — same code, but will be sharded by FSDP
    model = BigTransformerModel(num_params=70_000_000_000).cuda()
    
    # 2. Mixed precision — BF16 compute, FP32 master weights
    bf16_policy = MixedPrecision(
        param_dtype=torch.bfloat16,    # params in BF16 (2 bytes)
        reduce_dtype=torch.bfloat16,  # gradient reduction in BF16
        buffer_dtype=torch.bfloat16, # buffers in BF16
    )
    
    # 3. Auto-wrap: small layers aren't worth sharding (overhead > savings)
    # Wrap any layer with >= 100M params
    auto_wrap_policy = functools.partial(
        size_based_auto_wrap,
        min_num_params=100_000_000,
    )
    
    # 4. FSDP wrap — this is where the magic happens
    model = FSDP(
        model,
        sharding_strategy=ShardingStrategy.FULL_SHARD,  # ZeRO-3
        mixed_precision=bf16_policy,
        auto_wrap_policy=auto_wrap_policy,
        device_id=rank,
        # Activation checkpointing — trade 30% compute for 4x memory
        activation_checkpoint=True,
        # CPU offload — KEEP OFF (too slow for production)
        cpu_offload=None,
    )
    
    # 5. Distributed sampler — same as DDP
    dataset = load_dataset()
    sampler = torch.utils.data.distributed.DistributedSampler(
        dataset, num_replicas=world_size, rank=rank, shuffle=True,
    )
    loader = torch.utils.data.DataLoader(
        dataset, sampler=sampler, batch_size=2, num_workers=4,
    )
    
    # 6. Optimiser — FSDP shards the optimiser states automatically
    optim = torch.optim.AdamW(model.parameters(), lr=1e-5)
    
    for epoch in range(3):
        sampler.set_epoch(epoch)
        for batch in loader:
            x, y = batch
            x, y = x.cuda(), y.cuda()
            
            # Forward — FSDP allgathers params per layer (transparent)
            loss = model(x, y)
            
            # Backward — FSDP reduce-scatters grads per layer (transparent)
            loss.backward()
            
            # Step — FSDP updates only the local shard (FP32 master)
            optim.step()
            optim.zero_grad()
    
    cleanup()

# ============================================================
# Gradient accumulation — fake a bigger batch
# ============================================================

def train_with_accumulation(model, loader, optim, accum_steps=8):
    """Simulate batch_size * accum_steps effective batch size.
    
    Memory: only batch_size fits (small)
    Math: gradients accumulate over accum_steps minibatches before step
    
    Loss scaling: divide loss by accum_steps so summed grads == single-step grads.
    """
    optim.zero_grad()
    for i, batch in enumerate(loader):
        x, y = batch
        x, y = x.cuda(), y.cuda()
        
        # Forward + backward — grads ACCUMULATE (not zeroed)
        loss = model(x, y) / accum_steps  # scale to keep mean
        loss.backward()
        
        # Step every accum_steps minibatches
        if (i + 1) % accum_steps == 0:
            # Communicate grads (DDP) or shards (FSDP) here
            # Then step
            optim.step()
            optim.zero_grad()

# ============================================================
# Checkpointing — save/load sharded state
# ============================================================

def save_fsdp_checkpoint(model, path, rank):
    """FSDP checkpoint — save only the LOCAL shard, not the full model.
    
    Each rank saves its own shard to disk. To restore, load all shards
    and let FSDP allgather them.
    """
    # The state dict is SHARDED — only contains this rank's params
    state = model.state_dict()
    torch.save({
        'rank': rank,
        'state': state,
    }, f"{path}.rank{rank}.pt")

def load_fsdp_checkpoint(model, path, rank, world_size):
    """Load FSDP checkpoint — each rank loads its own shard."""
    state = torch.load(f"{path}.rank{rank}.pt")
    model.load_state_dict(state['state'])

# ============================================================
# Activation checkpointing — trade compute for memory
# ============================================================

class CheckpointedTransformerBlock(nn.Module):
    """Wraps a transformer block with activation checkpointing.
    
    Normal: store activations from forward, use them in backward.
    Checkpointed: do NOT store activations. Recompute them in backward.
    
    Memory savings: O(L) activations stored vs O(1) — for 96-layer model,
    96x reduction in activation memory.
    
    Compute cost: ~30% slower (forward runs twice).
    """
    def __init__(self, block):
        super().__init__()
        self.block = block
    
    def forward(self, x, *args):
        # torch.utils.checkpoint.checkpoint recomputes activations in backward
        return torch.utils.checkpoint.checkpoint(
            self.block, x, *args,
            use_reentrant=False,  # PyTorch 2.0+ recommended
        )

# Sanity check
if __name__ == "__main__":
    # Single-GPU smoke test
    import torch.nn.functional as F
    model = nn.Sequential(
        nn.Linear(768, 768),
        nn.ReLU(),
        nn.Linear(768, 768),
    )
    x = torch.randn(32, 768)
    y = model(x)
    print(f"Test model: {sum(p.numel() for p in model.parameters()):,} params")
    print(f"  Input: {tuple(x.shape)} -> Output: {tuple(y.shape)}")
    
    # Memory math for various model sizes
    for B in [1, 7, 70, 175]:
        bytes_per_param = 4  # FP32
        param_gb = B * bytes_per_param
        grad_gb = B * bytes_per_param
        optim_gb = B * bytes_per_param * 2  # Adam
        total = param_gb + grad_gb + optim_gb
        print(f"\\n{B}B model (FP32 + Adam):")
        print(f"  Params: {param_gb} GB")
        print(f"  Grads:  {grad_gb} GB")
        print(f"  Optim:  {optim_gb} GB")
        print(f"  Total:  {total} GB  ({'fits A100 80GB' if total < 80 else 'EXCEEDS A100 — needs FSDP'})")
        if total > 80:
            P = (total + 79) // 80
            print(f"  Needs {P}x A100 with FSDP (shard: {total/P:.1f} GB per GPU)")`;function G(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(i.PageHeader,{eyebrow:"Distributed Training · DDP → FSDP → ZeRO",title:"Distributed Training — From DDP to FSDP (ZeRO-3)",description:"The math behind multi-GPU training: Ring AllReduce (bandwidth-optimal gradient sync), the ZeRO sharding progression (DP → ZeRO-1 → ZeRO-2 → ZeRO-3), memory breakdown (params + grads + optim states + activations), and communication cost analysis. With low-level PyTorch implementations of DDP, FSDP with mixed precision + activation checkpointing, gradient accumulation, and sharded checkpointing. Code-oriented, mathematical, scientific.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(y.Network,{className:"h-3 w-3"})," DDP + FSDP"]}),(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(g.Zap,{className:"h-3 w-3"})," Pyodide"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:v.map(e=>(0,t.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(i.SectionCard,{title:"Ring AllReduce — bandwidth-optimal gradient synchronisation",description:"8 GPUs arranged in a ring. Phase 1 (reduce-scatter, steps 1-4): each GPU sends a chunk to its neighbour and adds the received chunk to its own. After log₂P steps, each GPU has the fully-reduced chunk for one partition. Phase 2 (all-gather, steps 5-8): propagate the reduced partitions around the ring. Total comm: 2·(P-1)·(B/P) ≈ 2B per GPU — asymptotically independent of P.",icon:(0,t.jsx)(y.Network,{className:"h-5 w-5"}),badge:"3D animation",children:(0,t.jsx)(w,{})}),(0,t.jsx)(i.SectionCard,{title:"AllReduce math — why Ring is bandwidth-optimal",description:"AllReduce aggregates gradients from all P GPUs. Naive approach (All2All): every GPU sends to every other — P²(P-1) messages, P·N bytes per GPU. Ring approach: P-1 sequential transfers per phase × 2 phases, N/P bytes each → 2N(P-1)/P per GPU, asymptotically 2N. The Ring is bandwidth-optimal: no algorithm can do better than 2N bytes total per GPU.",icon:(0,t.jsx)(b.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"Bytes_per_GPU = 2·N·(P-1)/P  →  2·N  (as P → ∞)"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"N = total gradient bytes, P = GPU count. Bandwidth-optimal: O(N), not O(N·P)."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-rose-500/40 bg-rose-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-rose-600 dark:text-rose-400 mb-1",children:"Naive All2All"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"Bytes/GPU = N·(P-1) ≈ N·P"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Scales linearly with P — quickly saturates interconnect."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"Ring AllReduce"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"Bytes/GPU = 2N·(P-1)/P → 2N"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Independent of P (asymptotically). Saturates only interconnect bandwidth, not nodes."})]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"Latency vs Bandwidth:"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground",children:["Ring takes 2·(P-1) sequential steps. Each step has latency ",(0,t.jsx)("span",{className:"font-mono",children:"α"})," (e.g. 10μs) + bandwidth cost ",(0,t.jsx)("span",{className:"font-mono",children:"N/P / B"})," (e.g. N/P at 900GB/s NVLink). Total: ",(0,t.jsx)("span",{className:"font-mono",children:"2(P-1)·α + 2N(P-1)/(P·B)"}),". For small N, latency dominates (P matters less). For large N, bandwidth dominates (P is irrelevant asymptotically). This is why GPT-3 (175B) trains fine on 10,000 GPUs — bandwidth-bound, not latency-bound."]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Memory breakdown — DDP vs ZeRO-2 vs FSDP (ZeRO-3)",description:"For a 1B-parameter model in FP32 + Adam optimiser: params (16GB) + grads (16GB) + optim states (32GB) + activations (8GB) = 72GB on a single GPU. DDP replicates everything → 65GB per GPU (limited activations). ZeRO-2 shards grads + optim → 23GB per GPU. FSDP shards everything → 9GB per GPU. The chart shows how each ZeRO stage reduces per-GPU memory.",icon:(0,t.jsx)(_.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(N,{})}),(0,t.jsx)(i.SectionCard,{title:"The ZeRO sharding progression",description:"ZeRO (Zero Redundancy Optimiser) progressively shards the three things that take memory: parameters (ZeRO-1), gradients (ZeRO-2), and parameters too (ZeRO-3 = FSDP). Each stage reduces per-GPU memory by a factor of P, at the cost of 2× more communication per stage.",icon:(0,t.jsx)(b.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"Memory_per_GPU = (P + G + O + A) / shard_factor"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"P = params, G = grads, O = optim states (2·P for Adam), A = activations. shard_factor = 1 (DDP), P/2 (ZeRO-2, shard G+O), P (FSDP, shard P+G+O)."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"Three stages, three trade-offs:"}),(0,t.jsxs)("ul",{className:"text-xs space-y-1.5 ml-3",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"DDP"})," — shard nothing. Memory = P+G+O+A per GPU. Communication = 1 AllReduce (2N bandwidth-optimal). Use for <1B params."]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"ZeRO-1"})," — shard optimiser states only. Memory = P+G+O/P+A. Comm = AllReduce + reduce-scatter on optim. Use for 1-2B params."]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"ZeRO-2"})," — shard optim + grads. Memory = P+(G+O)/P+A. Comm = AllReduce (grads now sharded). Use for 2-7B params."]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"FSDP / ZeRO-3"})," — shard everything. Memory = (P+G+O)/P+A. Comm = AllGather (params, before forward) + ReduceScatter (grads, after backward). Use for 7B+ params."]})]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2",children:"The progression: each stage gives another P× memory savings on a different tensor, at the cost of one more collective per layer. The 4× memory savings per stage roughly equals the 2× communication increase — the trade-off is roughly balanced."})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Try it: Ring AllReduce simulation + memory math (Pyodide)",description:"Implements the Ring AllReduce algorithm step-by-step (P-1 reduce-scatter + P-1 all-gather) and computes the memory breakdown for DDP, ZeRO-2, FSDP at 1B/7B/70B model scales. Shows the actual comm cost and per-GPU memory for each model size — answers 'can I train a 70B Llama on 8× A100?' (No — needs 64).",icon:(0,t.jsx)(f.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(c.PyodideRunner,{code:j,buttonLabel:"Run distributed math (Pyodide)"})}),(0,t.jsx)(i.SectionCard,{title:"Two memory tricks — mixed precision + activation checkpointing",description:"BF16 mixed precision halves the parameter + gradient memory (4 bytes → 2 bytes per param). Activation checkpointing trades 30% more compute for 4× activation memory (don't store activations from forward, recompute them in backward). Both compound multiplicatively with FSDP sharding.",icon:(0,t.jsx)(u.Cpu,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1.5",children:"BF16 Mixed Precision"}),(0,t.jsx)("p",{className:"font-mono text-xs",children:"compute in BF16, master weights in FP32"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1.5",children:"Params: 4 → 2 bytes (2× save). Grads: 4 → 2 bytes (2× save). Optim states stay FP32 (numerical stability for Adam moments). Net: ~2× memory savings + 2× throughput (tensor cores love BF16)."}),(0,t.jsx)("p",{className:"font-mono text-[10px] mt-1.5 text-muted-foreground",children:"Range: BF16 ≈ FP32 (8 exp bits). vs FP16 (5 exp bits) — overflows less."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-amber-600 dark:text-amber-400 mb-1.5",children:"Activation Checkpointing"}),(0,t.jsx)("p",{className:"font-mono text-xs",children:"discard activations, recompute in backward"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1.5",children:"Memory: O(L) activations stored → O(√L) with sqrt checkpointing. For 96-layer GPT-3: 96× reduction. Compute: +30% (forward runs twice for the recomputed layers). Net: 4× memory savings at 30% slower."}),(0,t.jsx)("p",{className:"font-mono text-[10px] mt-1.5 text-muted-foreground",children:"torch.utils.checkpoint.checkpoint(layer, x, use_reentrant=False)"})]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"Compounded savings for 70B Llama on 64× A100 80GB:"}),(0,t.jsx)("p",{className:"font-mono text-xs ml-2",children:"FP32 + Adam + no AC: 70·(4+4+8) = 1120GB / 64 GPUs = 17.5GB per layer-batch (too much)"}),(0,t.jsx)("p",{className:"font-mono text-xs ml-2",children:"BF16 + Adam + AC: 70·(2+2+8)/64 + 0.1 = ~1.3GB per layer-batch ✓ fits"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground ml-2 mt-1",children:"Without both tricks, 70B Llama training is impossible on any hardware today. The combination of FSDP + BF16 + AC is what made GPT-4 and Claude 3 trainable."})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Low-level PyTorch — DDP, FSDP with mixed precision + checkpointing, gradient accumulation, sharded save/load",description:"The actual production code. setup_distributed() initialises the process group with NCCL backend. train_ddp() shows DDP with DistributedSampler (CRITICAL: set_epoch shuffles differently each epoch). train_fsdp() shows FSDP with FULL_SHARD strategy, BF16 mixed precision, size-based auto-wrap (shard layers > 100M params), activation checkpointing enabled. Plus gradient accumulation (fake bigger batches) and sharded checkpoint save/load.",icon:(0,t.jsx)(u.Cpu,{className:"h-5 w-5"}),badge:"low-level",children:(0,t.jsx)(l.CodeBlock,{language:"python",filename:"distributed_train.py",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280],code:k})}),(0,t.jsx)(i.SectionCard,{title:"Hardware implications — NVLink, InfiniBand, and the bandwidth bottleneck",description:"FSDP lives or dies on interconnect bandwidth. NVLink (intra-node, 900GB/s) is 100× faster than Ethernet (inter-node, ~9GB/s). This is why 8× A100 in one DGX node trains far faster than 8× A100 across 8 nodes — the inter-node allgather dominates. The roofline shows when FSDP is compute-bound vs comm-bound.",icon:(0,t.jsx)(P.Activity,{className:"h-5 w-5"}),children:(0,t.jsx)(l.CodeBlock,{language:"text",filename:"distributed_hardware.txt",code:`┌────────────────────────────────────────────────────────────────────┐
│  INTERCONNECT BANDWIDTH (typical)                                    │
│                                                                       │
│  Intra-node:                                                         │
│    NVLink 4.0 (H100):      900 GB/s  (per GPU, bidirectional)        │
│    NVLink 3.0 (A100):      600 GB/s                                  │
│    PCIe 5.0:               64  GB/s                                  │
│                                                                       │
│  Inter-node:                                                         │
│    InfiniBand HDR:         25  GB/s  (per node)                      │
│    InfiniBand NDR:         50  GB/s  (H100 clusters)                │
│    Ethernet (RoCE):        12.5 GB/s  (100 GbE)                      │
│                                                                       │
│  RATIO: intra-node is 36x faster than inter-node (NVLink vs IB HDR)   │
│                                                                       │
│  FSDP COMM COST (per layer, per step):                              │
│    AllGather (params):   2\xb7B_layer  bytes  (BF16)                   │
│    ReduceScatter (grads): 2\xb7B_layer  bytes  (BF16)                   │
│    Total per layer:       4\xb7B_layer  bytes                           │
│                                                                       │
│  For 70B Llama (1024 layers \xd7 70M params each):                    │
│    Per step: 4 \xb7 1024 \xb7 70M \xb7 2 = 573 GB per GPU                    │
│    At 900 GB/s NVLink:    0.64 ms (compute-bound)                   │
│    At 25 GB/s IB HDR:     23 ms (comm-bound — 36\xd7 slower)           │
│                                                                       │
│  INSIGHT:                                                            │
│    - 8\xd7 A100 in one node: NVLink → fast, near-linear scaling        │
│    - 64\xd7 A100 across 8 nodes: IB HDR → 36\xd7 slower per step          │
│    - This is why "8 GPUs in a node" is the unit of DL training       │
│    - Pipeline + Tensor Parallel help, but add complexity             │
│                                                                       │
│  ROOFLINE:                                                           │
│    Compute: 2\xb7B_params\xb7FLOPS_per_param (matmul etc)                 │
│    Comm:    4\xb7B_params bytes (per step, full forward+backward)      │
│    Ridge:   ~50 FLOP/byte (similar to attention, see /comp-sci)     │
│    Below ridge: comm-bound (large models, slow interconnect)         │
│    Above ridge: compute-bound (small models, fast interconnect)      │
└──────────────────────────────────────────────────────────────────────┘`})}),(0,t.jsx)(i.SectionCard,{title:"My deeper thought: distributed training IS a MapReduce",description:"FSDP is structurally identical to a Spark shuffle: each worker processes its own data (forward), then synchronises state (AllReduce/AllGather), then repeats. The ML engineer and the data engineer are running the same distributed system — they just call it different names.",icon:(0,t.jsx)(x.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:["The structural isomorphism between distributed training and distributed data processing is exact, not metaphorical. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"DDP is MapReduce"}),": each GPU (mapper) computes gradients on a minibatch (its shard of the dataset), then AllReduce (the shuffle) aggregates gradients across all GPUs, then each GPU updates its local copy of the model (the reducer). The DistributedSampler is the partitioner — it ensures each GPU sees a different shard of the dataset, exactly like Spark's partitionBy. The set_epoch() call is the same as re-shuffling a Spark RDD before each iteration."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"FSDP is a column-partitioned distributed join."})," Instead of replicating the model (full copy on every GPU), FSDP partitions the model's parameters across GPUs — each GPU holds a column-shard of every weight matrix. To compute the forward pass, FSDP must AllGather the parameters for the layer being computed (a broadcast join in Spark terms). To compute the backward pass, FSDP ReduceScatters the gradients (an aggregateByKey). The duality is exact: FSDP = column-partitioned broadcast join + aggregateByKey, applied per layer per training step. The ZeRO-3 paper even cites the Spark-style implementation as inspiration."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"This unifies the platform's trajectory:"})," the Medallion architecture (Bronze→Silver→Gold) is the data pipeline equivalent of the Forward→Backward→Update training loop. Bronze (raw) = input minibatch. Silver (conformed) = forward activations. Gold (dimensional) = updated model weights. The orchestrator (Airflow/Dagster) schedules DAGs across nodes; the trainer (torchrun) schedules forward/backward across GPUs. Both use the same collective communication primitives (broadcast, reduce, scatter, gather) and the same fault-tolerance patterns (checkpointing, idempotent retries). ADR-002 (Medallion) and ADR-028 (FSDP) are dual architectures on dual substrates — same math, different domains. The platform's data engineers and ML engineers are running the same distributed system; they should share the same observability stack (ADR-029 will document this)."]})]})}),(0,t.jsxs)(h.DeeperThoughtSection,{pageTitle:"Distributed Training",children:[(0,t.jsx)(h.DeeperThought,{title:"Distributed Training IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Distributed Training is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Distributed Training connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Distributed Training sits in the computational-science landscape."})}),(0,t.jsx)(h.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Distributed Training) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(h.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(h.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(h.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(n.ResearchDemo,{pageId:"distributed-training"}),(0,t.jsx)(d.TrendAnticipation,{pageId:"distributed-training"}),(0,t.jsx)(o.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"comp-sci-materials",reason:"Continue to comp sci materials — see also from this page"},{id:"fine-tuning",reason:"Continue to fine tuning — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(s.default,{href:(0,m.hrefFor)("comp-sci-materials"),className:"text-sm text-primary hover:underline",children:"→ Comp Sci & Materials (the hardware)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,m.hrefFor)("fine-tuning"),className:"text-sm text-primary hover:underline",children:"→ Fine-Tuning (LoRA — when you don't need full-param training)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,m.hrefFor)("transformer"),className:"text-sm text-primary hover:underline",children:"→ Transformer (what we're training)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,m.hrefFor)("databricks"),className:"text-sm text-primary hover:underline",children:"→ Databricks (distributed data — same patterns)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,m.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ ADR-028 (FSDP adoption)"})]})]})}e.s(["DistributedTrainingPage",()=>G])}]);