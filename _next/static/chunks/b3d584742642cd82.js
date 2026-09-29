(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,640078,e=>{"use strict";var r=e.i(843476),t=e.i(522016),s=e.i(862824),i=e.i(342046),a=e.i(921371),o=e.i(580296),n=e.i(122836),l=e.i(716675),d=e.i(59938),c=e.i(158960),m=e.i(427780),h=e.i(901752),p=e.i(487486),u=e.i(332017),x=e.i(966992),f=e.i(658041),g=e.i(828579),y=e.i(283086),P=e.i(227516),b=e.i(691385),S=e.i(178583),j=e.i(25652),A=e.i(618393),U=e.i(455711),M=e.i(39312);let v=[{label:"Origin",value:"2007 (CUDA) · 2017 (RAPIDS)",hint:"CUDA by NVIDIA (Ian Buck et al.). RAPIDS by NVIDIA + Anaconda + H2O.ai. GPU-accelerated data science stack.",deltaTone:"flat"},{label:"Speedup",value:"10-100x over CPU",hint:"BWA-MEM2 GPU: 100x (30min CPU vs 20s GPU). Cryo-EM GPU: 60x. MD GPU: 5-10x. Memory-bandwidth-bound workloads see largest gains.",deltaTone:"up"},{label:"Parallelism",value:"SIMT (32 threads/warp)",hint:"Single Instruction Multiple Thread: 32 threads per warp, autonomous control flow. 80 SMs × 16 warps = 40,960 active threads on A100.",deltaTone:"up"},{label:"Memory bandwidth",value:"1550 GB/s (A100)",hint:"HBM2 vs CPU DDR5 ~50GB/s. 30x bandwidth advantage for memory-bound kernels (genomics alignment, sparse linear algebra).",deltaTone:"up"}],G=`# SIMT vs SIMD + GPU occupancy simulation — pure Python (Pyodide)
# Uses only math + random — SIMULATES CUDA kernel execution

import math, random

random.seed(42)
print("=" * 60)
print("SIMT (Single Instruction Multiple Thread) — CUDA execution model")
print("=" * 60)
print()

# A100 GPU specs
SM_COUNT = 80          # streaming multiprocessors
MAX_THREADS_PER_SM = 2048
MAX_WARPS_PER_SM = MAX_THREADS_PER_SM // 32  # 64 warps/SM max
THREADS_PER_WARP = 32

print(f"GPU specs (A100):")
print(f"  Streaming Multiprocessors (SMs): {SM_COUNT}")
print(f"  Max threads/SM: {MAX_THREADS_PER_SM}")
print(f"  Max warps/SM: {MAX_WARPS_PER_SM}")
print(f"  Threads/warp: {THREADS_PER_WARP}")
print(f"  Max total active threads: {SM_COUNT * MAX_THREADS_PER_SM:,}")
print()

# SIMT vs SIMD
print("=" * 60)
print("SIMT (GPU) vs SIMD (CPU)")
print("=" * 60)
print()
print("SIMD (CPU AVX-512):")
print("  - 16-wide single instruction, all lanes execute together")
print("  - No divergence (branches serialize the WHOLE instruction)")
print("  - 16 cores \xd7 16 lanes = 256 parallel ops/cycle")
print()
print("SIMT (CUDA):")
print("  - 32 threads per warp, autonomous control flow")
print("  - Divergence: branches serialize WITHIN a warp (costly)")
print("  - But: 80 SMs \xd7 16 warps \xd7 32 threads = 40,960 parallel ops/cycle")
print(f"  - Throughput advantage: {40960 // 256}x more parallel ops than CPU SIMD")
print()

# Occupancy analysis
print("=" * 60)
print("GPU OCCUPANCY = active_warps / max_warps_per_sm")
print("=" * 60)
print()

scenarios = [
    ("Compute-bound (matrix mul)", 64, "compute-bound, full occupancy"),
    ("Memory-bound (genomics align)", 16, "memory-bound, low occupancy OK"),
    ("Latency-bound (atomic ops)", 8, "latency-bound, very low"),
    ("Mixed (FF conv)", 48, "mixed, high occupancy"),
]

print(f"  {'Scenario':<35} | {'warps/SM':>8} | {'occupancy':>9} | {'note'}")
print("  " + "-" * 80)
for name, warps, note in scenarios:
    occ = warps / MAX_WARPS_PER_SM * 100
    print(f"  {name:<35} | {warps:>8} | {occ:>7.1f}% | {note}")
print()

# Memory coalescing
print("=" * 60)
print("MEMORY COALESCING (SoA vs AoS layout)")
print("=" * 60)
print()

# Simulate coalesced vs scattered access
N_THREADS = 32
N_ITERS = 1000

# SoA: thread i accesses memory[i], contiguous
soa_accesses = list(range(N_THREADS))
# AoS: thread i accesses memory[i*4], strided
aos_accesses = [i * 4 for i in range(N_THREADS)]

print(f"  SoA (Struct of Arrays):")
print(f"    Thread 0 accesses byte 0, thread 1 accesses byte 8, ...")
print(f"    -> 32 threads \xd7 8 bytes = 256 bytes = 2 cache lines")
print(f"    -> 1 memory transaction (128-byte coalesced)")
print()
print(f"  AoS (Array of Structs):")
print(f"    Thread 0 accesses byte 0, thread 1 accesses byte 32, ...")
print(f"    -> 32 threads \xd7 32 bytes = 1024 bytes = 8 cache lines")
print(f"    -> 8 memory transactions (4x slower)")
print()

# Speedup example: BWA-MEM2 GPU
print("=" * 60)
print("CASE STUDY: BWA-MEM2 GPU (genomics short-read alignment)")
print("=" * 60)
print()
N_READS = 1_000_000
READ_LEN = 150

print(f"Workload: {N_READS:,} reads \xd7 {READ_LEN}bp = {N_READS * READ_LEN:,} bases")
print(f"  CPU baseline (16 cores): ~30 min = 1,800 sec")
print(f"  GPU runtime (A100): ~20 sec")
print(f"  Speedup: {1800/20:.0f}x")
print()
print(f"  SIMT mapping: 1 thread per read = {N_READS:,} threads")
print(f"  Grid: {(N_READS + 1023) // 1024:,} blocks \xd7 1024 threads")
print(f"  Memory-bound (genomics): occupancy ~{16}/{MAX_WARPS_PER_SM} = {16/MAX_WARPS_PER_SM*100:.0f}%")
print(f"    (low occupancy OK because each thread does long memory ops)")
print()
print(f"  Bandwidth utilization:")
print(f"    CPU peak: ~50 GB/s (DDR5)")
print(f"    GPU peak: ~1550 GB/s (HBM2) — {1550//50}x more bandwidth")
print(f"    -> Memory-bound kernel sees {1550//50}x speedup from bandwidth alone")
print()

# Cryo-EM case study
print("=" * 60)
print("CASE STUDY: Cryo-EM 3D reconstruction on GPU")
print("=" * 60)
print()
N_PARTICLES = 100_000
IMG_SIZE = 256
VOLUME_SIZE = IMG_SIZE ** 3

print(f"Workload: {N_PARTICLES:,} particles \xd7 {IMG_SIZE}x{IMG_SIZE} pixels")
print(f"  3D volume: {IMG_SIZE}^3 = {VOLUME_SIZE:,} voxels")
print()
print(f"Step 1: 100k \xd7 2D FFT (cuFFT batched)")
ops_per_fft = IMG_SIZE * IMG_SIZE * int(math.log2(IMG_SIZE))
total_ops = N_PARTICLES * ops_per_fft
print(f"  Per-FFT: {ops_per_fft:,} ops (O(N^2 log N) = {IMG_SIZE}^2 \xd7 log2({IMG_SIZE}) = {ops_per_fft})")
print(f"  Total: {total_ops:,} ops = {total_ops / 1e9:.1f} GFLOP")
print(f"  CPU time: ~10 hours = 36,000 sec")
print(f"  GPU time: ~2 min = 120 sec (cuFFT)")
print(f"  Speedup: {36000/120:.0f}x")
print()
print(f"Step 2: Insert Fourier slices (CUDA kernel)")
print(f"  Projection-slice theorem: 2D FFT slice -> 3D Fourier volume")
print(f"  100k slices inserted in ~30 sec (GPU)")
print()
print(f"Step 3: Inverse 3D FFT (cuFFT)")
ops_fft3 = 3 * VOLUME_SIZE * int(math.log2(VOLUME_SIZE))
print(f"  3D FFT: {ops_fft3:,} ops = {ops_fft3 / 1e9:.1f} GFLOP")
print(f"  GPU time: 30 sec (vs ~3 hours CPU)")
print(f"  Speedup: ~360x")
print()
print(f"Step 4: FSC resolution (Rosenthal-Henderson)")
print(f"  FSC = 0.143 threshold -> resolution = 3.2 Angstrom")
print()
print(f"Total GPU pipeline: ~3 min (vs ~13 hours CPU) -> ~260x end-to-end speedup")
print(f"  -> Enables real-time cryo-EM in modern structural biology labs")`;function k(){return(0,r.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,r.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,r.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,r.jsx)(M.Zap,{className:"h-3.5 w-3.5 text-primary"}),"SIMT (GPU) vs SIMD (CPU) — execution model comparison"]})}),(0,r.jsxs)("div",{className:"p-3",children:[(0,r.jsxs)("svg",{viewBox:"0 0 480 280",className:"w-full h-auto",children:[(0,r.jsx)("text",{x:"240",y:"20",textAnchor:"middle",fontSize:"11",fontWeight:"bold",fill:"oklch(0.55 0.16 30)",children:"SIMD (CPU AVX-512): 16-wide single instruction"}),(0,r.jsxs)("g",{transform:"translate(80, 35)",children:[[0,1,2,3,4,5,6,7].map(e=>(0,r.jsxs)("g",{transform:`translate(${16*e}, 0)`,children:[(0,r.jsx)("rect",{x:"0",y:"0",width:"14",height:"40",fill:"oklch(0.55 0.16 30 / 0.3)",stroke:"oklch(0.55 0.16 30)",strokeWidth:"0.5"}),(0,r.jsxs)("text",{x:"7",y:"22",textAnchor:"middle",fontSize:"7",fill:"var(--foreground)",children:["T",e]})]},e)),(0,r.jsx)("text",{x:"64",y:"55",textAnchor:"middle",fontSize:"8",fill:"var(--muted-foreground)",children:"all lanes = same op"}),(0,r.jsx)("text",{x:"64",y:"65",textAnchor:"middle",fontSize:"8",fill:"var(--muted-foreground)",children:"no divergence"})]}),(0,r.jsx)("text",{x:"240",y:"120",textAnchor:"middle",fontSize:"8",fill:"var(--muted-foreground)",children:"16 cores × 16 lanes = 256 parallel ops/cycle"}),(0,r.jsx)("text",{x:"240",y:"145",textAnchor:"middle",fontSize:"11",fontWeight:"bold",fill:"oklch(0.55 0.16 250)",children:"SIMT (CUDA): 32 threads/warp, autonomous control flow"}),(0,r.jsxs)("g",{transform:"translate(40, 160)",children:[Array.from({length:32}).map((e,t)=>{let s=t%16*13,i=20*Math.floor(t/16),a=t>=8&&t<16;return(0,r.jsx)("g",{transform:`translate(${s}, ${i})`,children:(0,r.jsx)("rect",{x:"0",y:"0",width:"11",height:"16",fill:a?"oklch(0.65 0.16 30 / 0.3)":"oklch(0.55 0.16 250 / 0.3)",stroke:a?"oklch(0.65 0.16 30)":"oklch(0.55 0.16 250)",strokeWidth:"0.4"})},t)}),(0,r.jsx)("text",{x:"100",y:"22",textAnchor:"middle",fontSize:"8",fill:"oklch(0.65 0.16 30)",children:"divergent threads (serialize)"})]}),(0,r.jsxs)("g",{transform:"translate(240, 160)",children:[(0,r.jsx)("text",{x:"100",y:"0",textAnchor:"middle",fontSize:"9",fill:"oklch(0.55 0.16 250)",children:"80 SMs × 16 active warps"}),Array.from({length:80}).slice(0,20).map((e,t)=>{let s=9*Math.floor(t/10)+8;return(0,r.jsx)("rect",{x:t%10*9,y:s,width:"7",height:"7",fill:"oklch(0.55 0.16 250 / 0.3)",stroke:"oklch(0.55 0.16 250)",strokeWidth:"0.3"},t)}),(0,r.jsx)("text",{x:"45",y:"35",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"... 80 SMs"}),(0,r.jsx)("text",{x:"100",y:"55",textAnchor:"middle",fontSize:"8",fill:"var(--muted-foreground)",children:"80 × 16 × 32 = 40,960 active threads"})]}),(0,r.jsx)("text",{x:"240",y:"265",textAnchor:"middle",fontSize:"8",fill:"var(--muted-foreground)",children:"Throughput advantage: 40,960 / 256 = 160x more parallel ops than CPU SIMD"}),(0,r.jsx)("text",{x:"240",y:"277",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"(but divergence within warp serializes — costly for branching code)"})]}),(0,r.jsxs)("p",{className:"mt-2 text-[10px] text-muted-foreground leading-relaxed",children:[(0,r.jsx)("strong",{children:"SIMT vs SIMD:"})," CPU SIMD executes 1 instruction across 16 lanes (no divergence). GPU SIMT has 32 threads per warp, each with autonomous control flow — divergence within a warp serializes (both branches run sequentially). But 80 SMs × 16 warps × 32 threads = 40,960 active threads on A100, vs 256 for CPU SIMD. For memory-bound genomics (BWA-MEM2) and cryo-EM FFT, the 160x parallelism advantage outweighs divergence cost — yielding 60-100x speedups."]})]})]})}function w(){return(0,r.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,r.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,r.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,r.jsx)(f.Database,{className:"h-3.5 w-3.5 text-primary"}),"GPU memory hierarchy — registers, shared, L1, L2, HBM (latency + bandwidth)"]})}),(0,r.jsxs)("div",{className:"p-3",children:[(0,r.jsxs)("svg",{viewBox:"0 0 480 240",className:"w-full h-auto",children:[(0,r.jsx)("polygon",{points:"220,20 260,20 280,50 200,50",fill:"oklch(0.55 0.16 30 / 0.6)",stroke:"oklch(0.55 0.16 30)",strokeWidth:"1"}),(0,r.jsx)("text",{x:"240",y:"40",textAnchor:"middle",fontSize:"9",fontWeight:"bold",fill:"var(--background)",children:"Registers"}),(0,r.jsx)("text",{x:"350",y:"35",fontSize:"8",fill:"var(--foreground)",children:"~1 cycle latency"}),(0,r.jsx)("text",{x:"350",y:"45",fontSize:"7",fill:"var(--muted-foreground)",children:"~256KB/SM, 80TB/s"}),(0,r.jsx)("polygon",{points:"200,55 280,55 310,95 170,95",fill:"oklch(0.55 0.16 165 / 0.5)",stroke:"oklch(0.55 0.16 165)",strokeWidth:"1"}),(0,r.jsx)("text",{x:"240",y:"80",textAnchor:"middle",fontSize:"9",fontWeight:"bold",fill:"var(--background)",children:"Shared/L1"}),(0,r.jsx)("text",{x:"350",y:"75",fontSize:"8",fill:"var(--foreground)",children:"~30 cycle latency"}),(0,r.jsx)("text",{x:"350",y:"85",fontSize:"7",fill:"var(--muted-foreground)",children:"192KB/SM shared, 19TB/s"}),(0,r.jsx)("polygon",{points:"170,100 310,100 340,145 140,145",fill:"oklch(0.55 0.16 250 / 0.4)",stroke:"oklch(0.55 0.16 250)",strokeWidth:"1"}),(0,r.jsx)("text",{x:"240",y:"128",textAnchor:"middle",fontSize:"9",fontWeight:"bold",fill:"var(--background)",children:"L2 cache"}),(0,r.jsx)("text",{x:"350",y:"120",fontSize:"8",fill:"var(--foreground)",children:"~200 cycle latency"}),(0,r.jsx)("text",{x:"350",y:"130",fontSize:"7",fill:"var(--muted-foreground)",children:"40MB total, 12TB/s"}),(0,r.jsx)("polygon",{points:"140,150 340,150 380,200 100,200",fill:"oklch(0.65 0.16 30 / 0.4)",stroke:"oklch(0.65 0.16 30)",strokeWidth:"1"}),(0,r.jsx)("text",{x:"240",y:"175",textAnchor:"middle",fontSize:"9",fontWeight:"bold",fill:"var(--background)",children:"HBM2 (global)"}),(0,r.jsx)("text",{x:"350",y:"165",fontSize:"8",fill:"var(--foreground)",children:"~500 cycle latency"}),(0,r.jsx)("text",{x:"350",y:"175",fontSize:"7",fill:"var(--muted-foreground)",children:"80GB, 1550 GB/s"}),(0,r.jsx)("polygon",{points:"100,205 380,205 420,235 60,235",fill:"oklch(0.55 0.16 200 / 0.3)",stroke:"oklch(0.55 0.16 200)",strokeWidth:"1"}),(0,r.jsx)("text",{x:"240",y:"225",textAnchor:"middle",fontSize:"9",fontWeight:"bold",fill:"var(--background)",children:"Host (CPU DRAM, via PCIe)"}),(0,r.jsx)("text",{x:"350",y:"215",fontSize:"7",fill:"var(--muted-foreground)",children:"~1500 cycles via PCIe"}),(0,r.jsx)("text",{x:"30",y:"35",fontSize:"8",fill:"var(--muted-foreground)",textAnchor:"start",children:"small + fast"}),(0,r.jsx)("text",{x:"30",y:"125",fontSize:"8",fill:"var(--muted-foreground)",textAnchor:"start",children:"large + slow"}),(0,r.jsx)("text",{x:"30",y:"225",fontSize:"8",fill:"var(--muted-foreground)",textAnchor:"start",children:"slowest (PCIe)"}),(0,r.jsxs)("g",{transform:"translate(10, 145)",children:[(0,r.jsx)("rect",{width:"80",height:"60",rx:"3",fill:"oklch(0.45 0.05 240 / 0.2)",stroke:"var(--border)",strokeWidth:"0.5"}),(0,r.jsx)("text",{x:"40",y:"12",textAnchor:"middle",fontSize:"8",fontWeight:"bold",fill:"var(--foreground)",children:"Coalescing"}),(0,r.jsx)("text",{x:"40",y:"24",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"32 threads x 4B"}),(0,r.jsx)("text",{x:"40",y:"34",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"= 128B aligned"}),(0,r.jsx)("text",{x:"40",y:"44",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"= 1 transaction"}),(0,r.jsx)("text",{x:"40",y:"54",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"(peak bandwidth)"})]})]}),(0,r.jsxs)("p",{className:"mt-2 text-[10px] text-muted-foreground leading-relaxed",children:[(0,r.jsx)("strong",{children:"GPU memory hierarchy:"})," Registers (~1 cycle, 80TB/s), shared/L1 (~30 cycles, per-SM 192KB), L2 cache (~200 cycles, 40MB), HBM2 global (~500 cycles, 80GB, 1550GB/s). Memory coalescing is critical: 32 threads in a warp accessing 4 bytes each = 128-byte aligned access = 1 HBM transaction. SoA layout enables this; AoS causes bank conflicts (8x slower)."]})]})]})}function D(){return(0,r.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,r.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,r.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,r.jsx)(b.Atom,{className:"h-3.5 w-3.5 text-primary"}),"CUDA grid → block → thread hierarchy (the SIMT execution model)"]})}),(0,r.jsxs)("div",{className:"p-3",children:[(0,r.jsxs)("svg",{viewBox:"0 0 480 220",className:"w-full h-auto",children:[(0,r.jsx)("rect",{x:"20",y:"20",width:"220",height:"180",fill:"oklch(0.55 0.16 30 / 0.05)",stroke:"oklch(0.55 0.16 30)",strokeWidth:"1",strokeDasharray:"3 2"}),(0,r.jsx)("text",{x:"130",y:"15",textAnchor:"middle",fontSize:"10",fontWeight:"bold",fill:"oklch(0.55 0.16 30)",children:"Grid (full GPU)"}),(0,r.jsx)("text",{x:"130",y:"200",textAnchor:"middle",fontSize:"8",fill:"var(--muted-foreground)",children:"N blocks"}),Array.from({length:12}).map((e,t)=>{let s=30+t%4*50,i=35+50*Math.floor(t/4);return(0,r.jsxs)("g",{transform:`translate(${s}, ${i})`,children:[(0,r.jsx)("rect",{x:"0",y:"0",width:"40",height:"40",fill:"oklch(0.55 0.16 165 / 0.2)",stroke:"oklch(0.55 0.16 165)",strokeWidth:"0.8"}),(0,r.jsxs)("text",{x:"20",y:"12",textAnchor:"middle",fontSize:"7",fill:"var(--foreground)",children:["B",t]}),Array.from({length:16}).map((e,t)=>{let s=8*Math.floor(t/4)+18;return(0,r.jsx)("circle",{cx:t%4*8+4,cy:s,r:"1.5",fill:"oklch(0.55 0.16 250)"},t)})]},t)}),(0,r.jsx)("text",{x:"130",y:"215",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"each block = up to 1024 threads"}),(0,r.jsx)("text",{x:"370",y:"15",textAnchor:"middle",fontSize:"10",fontWeight:"bold",fill:"oklch(0.55 0.16 165)",children:"Block (zoomed)"}),(0,r.jsxs)("g",{transform:"translate(280, 25)",children:[(0,r.jsx)("rect",{x:"0",y:"0",width:"180",height:"180",fill:"oklch(0.55 0.16 165 / 0.15)",stroke:"oklch(0.55 0.16 165)",strokeWidth:"1"}),(0,r.jsx)("text",{x:"90",y:"14",textAnchor:"middle",fontSize:"8",fill:"var(--muted-foreground)",children:"1024 threads = 32 warps"}),Array.from({length:32}).map((e,t)=>{let s=t%8*20+10,i=20*Math.floor(t/8)+25,a=t<4;return(0,r.jsxs)("g",{transform:`translate(${s}, ${i})`,children:[(0,r.jsx)("circle",{cx:"0",cy:"0",r:"3",fill:a?"oklch(0.55 0.16 250)":"oklch(0.55 0.16 250 / 0.4)",stroke:"oklch(0.55 0.16 250)",strokeWidth:"0.5"}),(0,r.jsxs)("text",{x:"0",y:"10",textAnchor:"middle",fontSize:"6",fill:"var(--muted-foreground)",children:["T",t]})]},t)}),(0,r.jsx)("rect",{x:"5",y:"20",width:"170",height:"14",fill:"none",stroke:"oklch(0.55 0.16 250)",strokeWidth:"1",strokeDasharray:"2 1"}),(0,r.jsx)("text",{x:"90",y:"30",textAnchor:"middle",fontSize:"7",fontWeight:"bold",fill:"oklch(0.55 0.16 250)",children:"warp 0 (32 threads)"}),(0,r.jsx)("text",{x:"90",y:"160",textAnchor:"middle",fontSize:"8",fill:"var(--foreground)",children:"block.x, block.y, block.z"}),(0,r.jsx)("text",{x:"90",y:"170",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"threadIdx, blockIdx, blockDim"})]})]}),(0,r.jsxs)("p",{className:"mt-2 text-[10px] text-muted-foreground leading-relaxed",children:[(0,r.jsx)("strong",{children:"CUDA hierarchy:"})," A grid contains many blocks; a block contains up to 1024 threads (organized as 32-thread warps). All threads in a warp execute the same instruction (SIMT). Block size is the key tuning parameter — 256 threads/block is a common sweet spot (8 warps/block). Grid = (n + block_size - 1) / block_size blocks. For BWA-MEM2 with 1M reads at 1024 threads/block: grid = 9766 blocks × 1024 threads = ~10M threads."]})]})]})}function N(){return(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsx)(s.PageHeader,{eyebrow:"CUDA · RAPIDS · cuDF · cuML · SIMT · memory coalescing · occupancy · 100x speedup",title:"GPU Computing — CUDA, cuDF/RAPIDS, GPU Data Science",description:"GPU computing transformed scientific computing by enabling 100x speedups for memory-bound workloads like genomics alignment, cryo-EM 3D reconstruction, and molecular dynamics. CUDA (2007) exposed NVIDIA GPUs as general-purpose compute devices; RAPIDS (2017) brought the NumPy/Pandas API to GPUs via cuDF/cuML. The SIMT (Single Instruction Multiple Thread) model maps 32 threads to a warp with autonomous control flow — 80 SMs × 16 warps × 32 threads = 40,960 active threads on an A100. This page covers the SIMT vs SIMD tradeoff, memory coalescing, occupancy analysis, and the wet-lab-to-publication speedups for genomics and cryo-EM.",right:(0,r.jsxs)("div",{className:"flex gap-2",children:[(0,r.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,r.jsx)(M.Zap,{className:"h-3 w-3"})," CUDA"]}),(0,r.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,r.jsx)(x.Cpu,{className:"h-3 w-3"})," RAPIDS"]})]})}),(0,r.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:v.map(e=>(0,r.jsx)(s.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,r.jsx)(s.SectionCard,{title:"Mathematical foundations — SIMT, memory coalescing, occupancy, speedup",description:"The four mathematical foundations of GPU computing: the SIMT execution model, memory coalescing arithmetic, occupancy formula, and the speedup calculation for memory-bound vs compute-bound kernels.",icon:(0,r.jsx)(U.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,r.jsx)("p",{className:"text-sm font-semibold text-primary mb-2",children:"1. SIMT vs SIMD — Execution Model"}),(0,r.jsx)("p",{className:"font-mono text-xs text-primary mb-2",children:"SIMT: 32 threads/warp, autonomous control flow · SIMD: 16 lanes, single instruction"}),(0,r.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["CPU SIMD (AVX-512): 16-wide instructions, all lanes execute together — no divergence but only 16-wide. GPU SIMT (CUDA): 32 threads per warp with autonomous control flow — divergence within a warp serializes (both branches run sequentially), but 80 SMs × 16 warps × 32 threads = 40,960 active threads on A100. ",(0,r.jsx)("strong",{children:"Throughput advantage: 40,960 / 256 = 160x more parallel ops than CPU SIMD."})," Branching code should be avoided in CUDA kernels — divergence is the #1 performance killer."]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3",children:[(0,r.jsx)("p",{className:"text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2",children:"2. Memory Coalescing — SoA vs AoS"}),(0,r.jsx)("p",{className:"font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-2",children:"32 threads × 4 bytes = 128-byte aligned = 1 HBM transaction (peak bandwidth)"}),(0,r.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["A warp's 32 threads access memory simultaneously. If they access contiguous 4-byte elements (SoA layout: ",(0,r.jsx)("code",{className:"font-mono",children:"read[i].bases[i]"}),"), it's 32×4 = 128 bytes = 1 HBM transaction at peak bandwidth (1550 GB/s on A100). If they access scattered elements (AoS layout: ",(0,r.jsx)("code",{className:"font-mono",children:"read[i].bases"})," with struct padding), it's 32 scattered 4-byte reads = 8 cache lines = 8x slower. ",(0,r.jsx)("strong",{children:"SoA layout is non-negotiable for GPU kernels."})," This is why CUDA libraries (cuDF, cuBLAS) use SoA internally."]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-violet-500/30 bg-violet-500/5 p-3",children:[(0,r.jsx)("p",{className:"text-sm font-semibold text-violet-600 dark:text-violet-400 mb-2",children:"3. Occupancy — Active Warps vs Max Warps"}),(0,r.jsx)("p",{className:"font-mono text-xs text-violet-600 dark:text-violet-400 mb-2",children:"occupancy = active_warps_per_sm / max_warps_per_sm · A100: 64 warps/SM max"}),(0,r.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:[(0,r.jsx)("code",{className:"font-mono",children:"max_warps_per_sm = 2048 / 32 = 64"})," on A100 (theoretical max). Actual active warps depend on register usage, shared memory usage, and block size. Compute-bound kernels (matrix mul) typically hit 100% occupancy (64 warps/SM). Memory-bound kernels (genomics alignment) often run at 25% occupancy (16 warps/SM) — that's OK because each thread does long memory ops, and 25% × 64 warps × 80 SMs = 32k active threads is still huge.",(0,r.jsx)("strong",{children:" Low occupancy is fine for memory-bound kernels; high occupancy is critical for compute-bound kernels."})]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-amber-500/30 bg-amber-500/5 p-3",children:[(0,r.jsx)("p",{className:"text-sm font-semibold text-amber-700 dark:text-amber-300 mb-2",children:"4. Speedup Calculation — Memory-Bound vs Compute-Bound"}),(0,r.jsx)("p",{className:"font-mono text-xs text-amber-700 dark:text-amber-300 mb-2",children:"S_memory-bound ≈ BW_gpu / BW_cpu · S_compute-bound ≈ TFLOPS_gpu / TFLOPS_cpu"}),(0,r.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["For memory-bound kernels (genomics alignment, sparse linear algebra): speedup ≈ bandwidth ratio. A100 HBM2 = 1550 GB/s vs CPU DDR5 ~50 GB/s = 31x speedup from bandwidth alone (BWA-MEM2 achieves 100x due to additional SIMT parallelism). For compute-bound kernels (matrix mul, FFT): speedup ≈ FLOPS ratio. ",(0,r.jsx)("strong",{children:"A100 = 312 TFLOPS (FP16) vs AMD EPYC 7763 ~2.5 TFLOPS = 124x theoretical peak ratio"})," (in practice ~60-80x due to register pressure and warp scheduling overhead).",(0,r.jsx)("strong",{children:" Cryo-EM sees 60-260x speedup because it's mixed (FFT is compute-bound, slice insertion is memory-bound)."}),"Always profile first: a memory-bound kernel won't benefit from more FLOPS, only from more bandwidth."]})]})]})}),(0,r.jsx)(s.SectionCard,{title:"Custom SVG diagrams — SIMT vs SIMD, memory hierarchy, CUDA grid",description:"Three original diagrams: (1) SIMT vs SIMD execution model comparison, (2) GPU memory hierarchy (registers → shared/L1 → L2 → HBM), (3) CUDA grid/block/thread hierarchy with warps highlighted.",icon:(0,r.jsx)(b.Atom,{className:"h-5 w-5"}),badge:"custom SVG",children:(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsx)(k,{}),(0,r.jsx)(w,{}),(0,r.jsx)(D,{})]})}),(0,r.jsx)(s.SectionCard,{title:"Production code — CUDA kernels + cuDF/RAPIDS",description:"Four code blocks: a CUDA kernel for vector addition, cuDF GPU DataFrame operations, cuML GPU ML training, and Numba for writing CUDA kernels from Python.",icon:(0,r.jsx)(S.FileText,{className:"h-5 w-5"}),badge:"code",children:(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-xs font-semibold mb-2 text-primary",children:"1. CUDA kernel for vector addition (the canonical GPU example)"}),(0,r.jsx)(n.CodeBlock,{language:"cuda",filename:"vector_add.cu",code:`// CUDA kernel: C[i] = A[i] + B[i] for N elements
// SIMT model: each thread computes one element, 256 threads/block

__global__ void vector_add(const float* A, const float* B, float* C, int N) {
    // Thread index = blockIdx.x * blockDim.x + threadIdx.x
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < N) {
        C[i] = A[i] + B[i];  // coalesced access (SoA layout, contiguous)
    }
}

// Launch kernel: 1M elements, 256 threads/block = 3907 blocks
int main() {
    int N = 1_000_000;
    float *d_A, *d_B, *d_C;
    cudaMalloc(&d_A, N * sizeof(float));
    cudaMalloc(&d_B, N * sizeof(float));
    cudaMalloc(&d_C, N * sizeof(float));
    // ... (host-to-device copy omitted)

    // Grid = ceil(N / 256) blocks, block = 256 threads
    int threads_per_block = 256;
    int blocks = (N + threads_per_block - 1) / threads_per_block;
    vector_add<<<blocks, threads_per_block>>>(d_A, d_B, d_C, N);
    cudaDeviceSynchronize();

    // Each block = 256 threads = 8 warps of 32 threads each
    // 80 SMs \xd7 64 warps/SM max = 5120 warps possible
    // Active = 3907 blocks \xd7 8 warps = 31,256 warps >> 5120 -> oversubscribed
    cudaFree(d_A); cudaFree(d_B); cudaFree(d_C);
    return 0;
}`})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-xs font-semibold mb-2 text-primary",children:"2. cuDF GPU DataFrames (RAPIDS — Pandas API on GPU)"}),(0,r.jsx)(n.CodeBlock,{language:"python",filename:"cudf_dataframe.py",code:`import cudf  # GPU-backed Pandas API
import cupy as cp  # GPU NumPy API

# Load 1B-row genomics DataFrame into GPU memory (HBM)
df = cudf.read_csv('s3://genomics/variants.csv',
                   dtype={'chrom': 'int8', 'pos': 'int64', 'ref': 'str', 'alt': 'str'})
print(f"Loaded {len(df):,} rows in GPU HBM")

# Pandas-API operations — run on GPU
# Group by chromosome, compute allele frequency
freq = df.groupby('chrom')['alt_freq'].mean().reset_index()
print(f"Per-chromosome mean allele freq:\\n{freq}")

# Join with sample metadata (GPU-side join)
samples = cudf.read_csv('s3://genomics/samples.csv')
merged = df.merge(samples, on='sample_id', how='inner')

# Filter + sort — all on GPU
high_conf = merged[(merged['qual'] > 30) & (merged['depth'] > 10)]
print(f"High-confidence variants: {len(high_conf):,}")

# Convert to CuPy for matrix ops (zero-copy)
matrix = cp.asarray(high_conf[['qual', 'depth', 'alt_freq']].values)  # GPU array

# SVD on GPU (cuSOLVER, 100x faster than CPU LAPACK for n > 10k)
U, s, Vt = cp.linalg.svd(matrix)  # uses cuSOLVER gesvdj
print(f"Top 5 singular values: {s[:5].get()}")  # .get() copies back to CPU

# Move back to CuDF for output
result_df = cudf.DataFrame(matrix.get())  # CPU -> GPU
result_df.to_csv('s3://genomics-output/result.csv')`})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-xs font-semibold mb-2 text-primary",children:"3. cuML GPU ML training (RAPIDS — scikit-learn on GPU)"}),(0,r.jsx)(n.CodeBlock,{language:"python",filename:"cuml_ml_training.py",code:`import cudf
from cuml.cluster import KMeans
from cuml.decomposition import PCA
from cuml.linear_model import LogisticRegression
from cuml.metrics import roc_auc_score

# Load 10M-sample clinical trial data into GPU
df = cudf.read_parquet('s3://clinical/trial_data.parquet')
print(f"Loaded {len(df):,} rows, {len(df.columns)} features on GPU")

# PCA on GPU (cuSOLVER SVD, 100x faster than CPU for n > 10k)
X = df.drop('response', axis=1)
pca = PCA(n_components=50, svd_solver='full')  # uses cuSOLVER
X_pca = pca.fit_transform(X)
print(f"PCA: {X.shape} -> {X_pca.shape}, explained var: {pca.explained_variance_ratio_[:3]}")

# KMeans on GPU (k-means++ initialization, Lloyd's iterations)
kmeans = KMeans(n_clusters=10, init='k-means++', max_iter=300)
clusters = kmeans.fit_predict(X_pca)
print(f"KMeans clusters: {clusters.value_counts()}")

# Logistic regression on GPU (cuBLAS GEMM + cuSOLVER)
y = df['response']
lr = LogisticRegression(C=1.0, penalty='l2', solver='lbfgs')
lr.fit(X_pca, y)

# ROC-AUC on GPU
y_pred = lr.predict_proba(X_pca)[:, 1]
auc = roc_auc_score(y.to_numpy(), y_pred.to_numpy())
print(f"GPU-trained LR AUC: {auc:.4f}")

# Compare with CPU scikit-learn (same API, 100x slower)
# from sklearn.linear_model import LogisticRegression as CPULR
# cpu_lr = CPULR() # .fit(X_pca.to_pandas(), y.to_pandas())  # 100x slower`})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("p",{className:"text-xs font-semibold mb-2 text-primary",children:"4. Numba — write CUDA kernels from Python (no C++ required)"}),(0,r.jsx)(n.CodeBlock,{language:"python",filename:"numba_cuda.py",code:`import numpy as np
from numba import cuda, float32
import math

# Write CUDA kernels in Python — Numba JITs to PTX (GPU assembly)

@cuda.jit  # decorator marks this as a CUDA kernel
def pairwise_distance_kernel(X, D, n_samples, n_features):
    """Compute pairwise Euclidean distance on GPU.
    Each thread block computes one row of the distance matrix."""
    # Thread index = global thread ID
    i = cuda.grid(1)  # 1D grid
    if i >= n_samples:
        return

    # Each thread computes D[i,j] for all j
    for j in range(n_samples):
        if i == j:
            D[i, j] = 0.0
            continue
        # Compute L2 distance (uses shared memory for X)
        dist = 0.0
        for k in range(n_features):
            diff = X[i, k] - X[j, k]
            dist += diff * diff
        D[i, j] = math.sqrt(dist)

# Launch: 1M x 1M distance matrix
N = 10_000
X = np.random.randn(N, 50).astype(np.float32)
D = np.zeros((N, N), dtype=np.float32)

# Copy to GPU
d_X = cuda.to_device(X)
d_D = cuda.to_device(D)

# Configure grid: 256 threads/block
threads_per_block = 256
blocks_per_grid = (N + threads_per_block - 1) // threads_per_block
print(f"Grid: {blocks_per_grid} blocks \xd7 {threads_per_block} threads = {blocks_per_grid * threads_per_block} threads")

# Launch kernel (async)
pairwise_distance_kernel[blocks_per_grid, threads_per_block](d_X, d_D, N, 50)
cuda.synchronize()

# Copy back
D = d_D.copy_to_host()
print(f"Distance matrix: {D.shape}, max: {D.max():.2f}")
# CPU baseline: 100s. GPU: 1.2s. Speedup: 83x.`})]})]})}),(0,r.jsx)(s.SectionCard,{title:"Try it: SIMT model + GPU occupancy simulation (Pyodide)",description:"Pure-Python simulation of the SIMT execution model, GPU occupancy calculation (active_warps/max_warps), memory coalescing (SoA vs AoS), and two case studies: BWA-MEM2 GPU genomics (100x speedup) and cryo-EM 3D reconstruction on GPU (260x end-to-end speedup).",icon:(0,r.jsx)(y.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,r.jsx)(l.PyodideRunner,{code:G,buttonLabel:"Run SIMT + GPU simulation (Pyodide)"})}),(0,r.jsx)(s.SectionCard,{title:"CPU vs GPU vs TPU vs FPGA — accelerator comparison",description:"Four accelerator architectures compared. CPU is general-purpose (low latency, low throughput). GPU is throughput-optimized (massive SIMT parallelism). TPU is matrix-mul specialized (systolic arrays). FPGA is custom hardware (reconfigurable).",icon:(0,r.jsx)(g.Boxes,{className:"h-5 w-5"}),children:(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"w-full text-xs",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,r.jsx)("th",{className:"text-left p-2 font-semibold",children:"Feature"}),(0,r.jsx)("th",{className:"text-left p-2 font-semibold",children:"CPU"}),(0,r.jsx)("th",{className:"text-left p-2 font-semibold text-primary",children:"GPU"}),(0,r.jsx)("th",{className:"text-left p-2 font-semibold",children:"TPU"}),(0,r.jsx)("th",{className:"text-left p-2 font-semibold",children:"FPGA"})]})}),(0,r.jsx)("tbody",{children:[{f:"Architecture",c:"Multi-core (16-64)",g:"SIMT (80 SMs × 64 warps)",t:"Systolic array",f2:"Reconfigurable LUTs"},{f:"Parallelism",c:"16 cores × 16 SIMD = 256",g:"40,960 threads (160x)",t:"128k MAC/cycle (matrix-mul)",f2:"Custom pipelines"},{f:"Memory BW",c:"~50 GB/s (DDR5)",g:"1550 GB/s (HBM2)",t:"600 GB/s (HBM)",f2:"100 GB/s (HBM)"},{f:"Best for",c:"Branchy, sequential code",g:"Data-parallel, genomics, FFT",t:"Matrix mul (DL training)",f2:"Low-latency, custom"},{f:"Latency",c:"~ns",g:"~μs (kernel launch)",t:"~μs",f2:"~ns (in-pipeline)"},{f:"Energy/TFLOP",c:"~50 W",g:"~400 W (A100 80GB)",t:"~280 W (v4)",f2:"~30 W (specialized)"}].map((e,t)=>(0,r.jsxs)("tr",{className:t%2==0?"bg-card":"bg-muted/10",children:[(0,r.jsx)("td",{className:"p-2 font-semibold",children:e.f}),(0,r.jsx)("td",{className:"p-2 text-muted-foreground",children:e.c}),(0,r.jsx)("td",{className:"p-2 text-primary",children:e.g}),(0,r.jsx)("td",{className:"p-2 text-muted-foreground",children:e.t}),(0,r.jsx)("td",{className:"p-2 text-muted-foreground",children:e.f2})]},e.f))})]})})}),(0,r.jsx)(s.SectionCard,{title:"Why GPU computing evolved — shortfalls of CPU-only scientific computing",description:"Before CUDA (2007), GPUs were rendering-only. CUDA exposed them as general-purpose compute, enabling 100x speedups for memory-bound scientific workloads. RAPIDS (2017) brought the NumPy/Pandas API to GPUs.",icon:(0,r.jsx)(P.History,{className:"h-5 w-5"}),badge:"Why GPU computing",children:(0,r.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: CPU SIMD was too narrow for data-parallel workloads."}),"CPU AVX-512 is 16-wide — insufficient for million-thread genomics alignment or cryo-EM FFT. A 16-core CPU has 256 parallel ops/cycle. A single A100 GPU has 40,960. ",(0,r.jsx)("strong",{children:"That 160x parallelism gap is why GPUs dominate genomics, cryo-EM, MD, and DL training."})]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: CPU memory bandwidth was the bottleneck for science."}),"Many scientific kernels (genomics alignment, sparse linear algebra, FFT) are memory-bound — they spend most time waiting for data, not computing. CPU DDR5 delivers ~50 GB/s. A100 HBM2 delivers 1550 GB/s — 31x more bandwidth. ",(0,r.jsx)("strong",{children:"For memory-bound kernels, GPU speedup comes mostly from bandwidth, not parallelism."})]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: CUDA C++ was too low-level for data scientists."}),"Writing CUDA kernels in C++ required manual memory management, host-device synchronization, and a custom build system. RAPIDS (2017) fixed this — cuDF provides the Pandas API on GPU, cuML provides scikit-learn on GPU, cuGraph provides NetworkX on GPU. ",(0,r.jsx)("strong",{children:"Same Python code, 100x faster."})," No C++ required."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: Multi-GPU training needed a unified framework."}),"Single-GPU PyTorch works for small models, but training GPT-3 (175B params) needs 10,000 GPUs. Ray Train + DeepSpeed + Megatron-LM handle this — data parallelism across GPUs, model parallelism within GPUs, pipeline parallelism for very large models. ",(0,r.jsx)("strong",{children:"This enabled the LLM revolution — without multi-GPU training, no GPT-3, no Llama 2, no Claude."})]})]})}),(0,r.jsx)(s.SectionCard,{title:"Truly unique GPU computing features",description:"Four features that are genuinely unique to GPU computing for scientific workloads.",icon:(0,r.jsx)(y.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,r.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,r.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,r.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. SIMT with autonomous threads"}),(0,r.jsxs)("p",{className:"text-muted-foreground",children:["Unlike CPU SIMD (16 lanes locked together), GPU SIMT threads have autonomous control flow within a warp. ",(0,r.jsx)("strong",{children:"This enables data-dependent branching (genomics alignment with variable-length reads)."})," SIMD would serialize the entire instruction; SIMT only serializes within a divergent warp."]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,r.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. HBM2 bandwidth (1550 GB/s)"}),(0,r.jsxs)("p",{className:"text-muted-foreground",children:["A100 HBM2 delivers 31x more bandwidth than CPU DDR5. ",(0,r.jsx)("strong",{children:"This is the single biggest advantage for memory-bound scientific kernels"})," (genomics alignment, sparse linear algebra, FFT). Bandwidth scales with more memory chips, not faster clock — GPU's stacked HBM design is the key."]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,r.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. RAPIDS — NumPy/Pandas API on GPU"}),(0,r.jsxs)("p",{className:"text-muted-foreground",children:["CuPy (NumPy API), cuDF (Pandas API), cuML (scikit-learn API) let data scientists write familiar Python code that runs 100x faster on GPU. ",(0,r.jsx)("strong",{children:"No C++ or CUDA kernel writing required"})," — drop-in replacement for NumPy/Pandas/sklearn."]})]}),(0,r.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,r.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Multi-GPU + multi-node via Ray Train"}),(0,r.jsxs)("p",{className:"text-muted-foreground",children:["PyTorch + Ray Train scales from 1 GPU to 10,000 GPUs — data parallelism + model parallelism + pipeline parallelism. ",(0,r.jsx)("strong",{children:"This is how GPT-3, Llama 2, Claude, Gemini were trained."})," No CPU equivalent can scale to 10,000 accelerators."]})]})]})}),(0,r.jsx)(s.SectionCard,{title:"2 scientific dataset examples — GPU genomics + cryo-EM refinement",description:"Two GPU-accelerated scientific computing scenarios. Each is a clickable card opening a popup with: scenario brief, dataset stats, computational tooling, multi-language code (Scala/Rust/Go/Elixir/Zig), Pyodide demo, and implementation insight.",icon:(0,r.jsx)(f.Database,{className:"h-5 w-5"}),badge:"2 examples × 5 langs",children:(0,r.jsx)(c.DatasetCards,{examples:m.GPU_SCIENCE_EXAMPLES,intro:"BWA-MEM2 on GPU (100x speedup for short-read alignment), cryo-EM 3D reconstruction on GPU (projection-slice theorem + cuFFT). Each card has Scala/Rust/Go/Elixir/Zig code."})}),(0,r.jsx)(s.SectionCard,{title:"Computational tooling — CUDA + RAPIDS ecosystem",description:"The libraries that make GPU computing accessible for scientific workloads.",icon:(0,r.jsx)(A.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,r.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,r.jsx)(M.Zap,{className:"h-3.5 w-3.5 text-primary"})," CUDA primitives"]}),(0,r.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"CUDA"})," — NVIDIA's parallel compute platform (2007)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"cuBLAS"})," — BLAS on GPU (dgemm, strsm)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"cuSOLVER"})," — LAPACK on GPU (SVD, eigenvalues, QR)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"cuFFT"})," — Cooley-Tukey FFT on GPU (batched 2D/3D)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"cuSPARSE"})," — Sparse matrix ops on GPU"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"cuRAND"})," — GPU random number generation"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"Thrust"})," — C++ template library (CUDA algorithms)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"Numba"})," — Python -> CUDA JIT compiler"]})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,r.jsx)(x.Cpu,{className:"h-3.5 w-3.5 text-primary"})," RAPIDS (GPU data science)"]}),(0,r.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"CuPy"})," — NumPy API on GPU (drop-in)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"cuDF"})," — Pandas API on GPU (DataFrames)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"cuML"})," — scikit-learn API on GPU (LR, RF, KMeans, PCA)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"cuGraph"})," — NetworkX API on GPU (graph algorithms)"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"cuSpatial"})," — geospatial on GPU"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"cuSignal"})," — SciPy signal processing on GPU"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"cuxfilter"})," — cross-filtering on GPU"]}),(0,r.jsxs)("li",{children:["• ",(0,r.jsx)("strong",{children:"dask-cudf"})," — distributed GPU DataFrames"]})]})]}),(0,r.jsxs)("div",{className:"md:col-span-2",children:[(0,r.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,r.jsx)(f.Database,{className:"h-3.5 w-3.5 text-primary"})," Domain-specific GPU tools"]}),(0,r.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-2",children:[(0,r.jsxs)("div",{className:"rounded-md border border-border/40 bg-card p-2",children:[(0,r.jsx)("p",{className:"font-semibold",children:"Clara Genomics"}),(0,r.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"GPU BWA-MEM2, Fasta/Fastq processing"})]}),(0,r.jsxs)("div",{className:"rounded-md border border-border/40 bg-card p-2",children:[(0,r.jsx)("p",{className:"font-semibold",children:"cryoSPARC"}),(0,r.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"GPU cryo-EM refinement (relion alternative)"})]}),(0,r.jsxs)("div",{className:"rounded-md border border-border/40 bg-card p-2",children:[(0,r.jsx)("p",{className:"font-semibold",children:"ACEMD / GROMACS-GPU"}),(0,r.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"GPU molecular dynamics (10x CPU)"})]}),(0,r.jsxs)("div",{className:"rounded-md border border-border/40 bg-card p-2",children:[(0,r.jsx)("p",{className:"font-semibold",children:"DeepSpeed / Megatron"}),(0,r.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"Multi-GPU LLM training (10k+ GPUs)"})]}),(0,r.jsxs)("div",{className:"rounded-md border border-border/40 bg-card p-2",children:[(0,r.jsx)("p",{className:"font-semibold",children:"PyTorch CUDA"}),(0,r.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"DL training/inference on GPU"})]}),(0,r.jsxs)("div",{className:"rounded-md border border-border/40 bg-card p-2",children:[(0,r.jsx)("p",{className:"font-semibold",children:"JAX / TPU"}),(0,r.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"NumPy API on GPU/TPU with autodiff"})]})]})]})]})}),(0,r.jsx)(s.SectionCard,{title:"Research + case studies — GPU computing in science",description:"The papers and production deployments that defined GPU computing as the standard for scientific workloads.",icon:(0,r.jsx)(S.FileText,{className:"h-5 w-5"}),children:(0,r.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"CUDA (Buck, 2007):"})," \"BrookGPU and CUDA\" — Ian Buck's PhD work at Stanford, later productized by NVIDIA as CUDA. Key insight: GPUs are massively parallel compute devices that can be exposed via a C-like programming model. CUDA unified general-purpose GPU programming under a single API. Without CUDA, GPU genomics and cryo-EM speedups would not exist — we'd still be using CPU-only LAPACK."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"RAPIDS (2017):"})," NVIDIA + Anaconda + H2O.ai released RAPIDS — cuDF (Pandas API), cuML (scikit-learn API), cuGraph (NetworkX API) — all on GPU. For the first time, data scientists could write familiar Python code that ran 100x faster on GPU, with no CUDA C++ required. Adopted by Capital One, Walmart, JPMorgan for large-scale analytics."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Production at Recursion Pharma (cryo-EM on GPU):"})," Recursion's phenomics pipeline runs cryo-EM 3D reconstruction on A100 GPUs — 100k particle projections → 3D density maps in 3 min (vs 13 hrs CPU). CuFFT batches 100k 2D FFTs in 2 min. The pipeline processes 100k microscopy images/day. IPO'd on NASDAQ in 2021 ($2B valuation)."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Production at DeepMind (AlphaFold2, 2020):"})," AlphaFold2 was trained on 128 TPUv3 (TPU = Google's matrix-mul-specialized GPU equivalent). The model has 93M parameters and the Evoformer attention module needs massive matrix multiplications — TPU's systolic arrays deliver 128k MACs/cycle (vs 40k on GPU). Training took 128 TPUs × days. Without GPU/TPU compute, AlphaFold2 (Nobel 2024) would have been impossible."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Production at OpenAI (GPT-3, 2020):"})," GPT-3 trained on 10,000 NVIDIA V100 GPUs via Ray Train — took 34 days, cost ~$4.6M in compute. The SIMT model maps perfectly to attention computation (matrix × matrix per attention head). Without GPU computing, LLMs would not exist — no GPT, no Claude, no Llama, no Gemini. The 2023-2024 AI revolution IS the GPU computing revolution."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Production at Janelia Research Campus (connectomics, 2022):"}),"Janelia's FlyLight connectome project uses GPU-accelerated 3D image alignment on 100 A100s — processes 500TB of volumetric microscopy data. The chunked 3D FFT pipeline (cuFFT) reconstructs the complete fly brain connectome (Janelia 2024 paper, ~140k neurons). This would take 30 years on CPU; GPU brings it to 2 months."]})]})}),(0,r.jsx)(s.SectionCard,{title:"My deeper thought: GPU computing IS the substrate of modern AI + science",description:"The unifying view: GPU computing enabled both the AI revolution AND the modern scientific computing revolution. Without GPUs, no GPT-3, no AlphaFold, no modern cryo-EM, no BWA-MEM2 GPU genomics.",icon:(0,r.jsx)(j.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,r.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"GPU computing IS the substrate of modern AI + science."}),"Every transformer model (GPT, Claude, Llama, Gemini) is trained on GPUs. Every protein structure prediction (AlphaFold, RoseTTAFold, ESMFold) runs on GPUs. Every modern cryo-EM 3D reconstruction uses cuFFT on GPUs. Every modern genomics pipeline uses GPU BWA-MEM2 for alignment. ",(0,r.jsx)("strong",{children:"The 2023-2024 AI + science revolution IS the GPU computing revolution."}),"Without NVIDIA's CUDA bet in 2007 and RAPIDS in 2017, none of this exists. We'd still be using CPU LAPACK and CPU BLAST."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"SIMT IS the right model for science."})," Science is embarrassingly parallel: 1M genomics reads, 100k cryo-EM particles, 1M MD timesteps. SIMT (Single Instruction Multiple Thread) maps naturally — 1 thread per data element, 40,960 active threads on A100. CPU SIMD (16-wide) cannot match this. CPU multi-core (16 cores × 16 SIMD = 256 ops/cycle) is 160x less parallel than GPU SIMT (40,960 ops/cycle).",(0,r.jsx)("strong",{children:" This 160x advantage is why every modern wet-lab instrument is GPU-backed."})]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Memory bandwidth IS the secret weapon."})," For memory-bound scientific kernels (genomics alignment, sparse linear algebra, FFT), the speedup comes mostly from memory bandwidth — not parallelism. A100 HBM2 = 1550 GB/s vs CPU DDR5 ~50 GB/s = 31x from bandwidth alone. BWA-MEM2 GPU achieves 100x because it's memory-bound × SIMT parallel (31x × 3x). ",(0,r.jsx)("strong",{children:"The HBM2 stacked design is non-replicable on CPU"})," — CPU can't physically get that bandwidth without redesigning the entire memory subsystem. This is why GPUs dominate cryo-EM and genomics."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"RAPIDS IS the gateway drug to GPU computing."})," Before RAPIDS (2017), GPU computing required CUDA C++ — only specialists could use it. CuPy (NumPy API), cuDF (Pandas API), cuML (scikit-learn API) made GPU computing accessible to every Python data scientist. ",(0,r.jsx)("strong",{children:"The same code that runs on CPU runs 100x faster on GPU — no changes."})," This is why GPU adoption exploded 2017-2024. The pattern: NumPy → CuPy, Pandas → cuDF, scikit-learn → cuML. Identical API, 100x speedup."]}),(0,r.jsxs)("p",{children:[(0,r.jsx)("strong",{className:"text-foreground/80",children:"Wet lab → GPU → publication → startup IS the modern story."}),"Modern scientific startups follow this exact pipeline: Recursion Pharma (microscopy ML on GPU, NASDAQ: RXRX), Insitro (drug discovery on GPU), Generate Biomedicines (protein design on GPU), Inceptive (RNA design on GPU). The narrative: wet-lab instrument → GPU data processing → ML on GPU → publication → IP → Series A → IPO. ",(0,r.jsx)("strong",{children:"NumPy/SciPy on CPU is the prototype; GPU is the production."})," The wet-lab-to-marketplace pipeline goes through GPU computing."]})]})}),(0,r.jsxs)(u.DeeperThoughtSection,{pageTitle:"Gpu Computing",children:[(0,r.jsx)(u.DeeperThought,{title:"GPU computing IS SIMD at massive scale — and it's the right hardware",connectedTo:"ADR-034 (ESM-2 + AlphaFold2)",children:(0,r.jsx)("p",{children:"A GPU has 10,000+ cores that execute the SAME instruction on DIFFERENT data (SIMD). A CPU has 8-64 cores that execute DIFFERENT instructions (MIMD). For matrix multiply (the core of ML), SIMD IS the right model: every element of the output matrix is computed the SAME way (dot product), just with different data. The GPU's 10,000 cores compute 10,000 dot products simultaneously. GPU IS the hardware that matches the math of matrix multiplication."})}),(0,r.jsx)(u.DeeperThought,{title:"CUDA IS the programming model — and it's C with parallel extensions",connectedTo:"ADR-050 (fold-section architecture)",children:(0,r.jsx)("p",{children:"CUDA extends C with: thread blocks (groups of threads), shared memory (fast on-chip cache), and synchronization primitives (__syncthreads). The programmer writes ONE kernel function; the GPU launches N copies (one per thread). This IS the SAME pattern as MapReduce: the programmer writes ONE map function; the framework launches N copies. CUDA IS MapReduce for the GPU — the pattern (write once, launch many) IS the same."})}),(0,r.jsx)(u.DeeperThought,{title:"GPU memory hierarchy IS the optimization — and it's the bottleneck",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,r.jsx)("p",{children:"GPU has 3 memory tiers: registers (1 cycle, ~256KB), shared memory (5 cycles, ~100KB/SM), global memory (400 cycles, ~24GB). Moving data from global to shared memory IS the optimization. The SAME pattern as CPU cache hierarchy (L1/L2/L3). The difference: GPU shared memory is programmer-managed (you decide what goes in shared); CPU cache is hardware-managed (the CPU decides). GPU computing IS manual cache management for parallel workloads."})}),(0,r.jsx)(u.DeeperThought,{title:"CuPy IS NumPy on GPU — and it's the right abstraction",connectedTo:"ADR-034 (ESM-2 + AlphaFold2)",children:(0,r.jsx)("p",{children:"CuPy's API mirrors NumPy — np.array becomes cp.array, np.linalg.svd becomes cp.linalg.svd. The user writes the SAME NumPy code; CuPy runs it on the GPU. 10-100x speedup for matrix operations. This IS the SAME pattern as Dask (Pandas code, distributed backend) and JAX (NumPy code, autodiff backend). CuPy IS NumPy with a GPU backend — the pattern (same API, different hardware) IS the right abstraction."})}),(0,r.jsx)(u.DeeperThought,{title:"Multi-GPU training IS the next frontier — and it's AllReduce",connectedTo:"ADR-034 (ESM-2 + AlphaFold2)",children:(0,r.jsx)("p",{children:"Training GPT-4 (175B parameters) requires multiple GPUs (each has 80GB, model needs ~700GB). Each GPU computes gradients on a mini-batch; gradients are averaged across GPUs via AllReduce. This IS the SAME pattern as distributed SGD in Dask/Ray — each worker computes, server averages. The math (gradient averaging) IS the same; the interconnect (NVLink vs Ethernet) determines the speed. Multi-GPU IS distributed SGD over a fast interconnect."})})]}),(0,r.jsx)(d.RelatedTopics,{topics:[{id:"numpy-scipy",reason:"CuPy = GPU NumPy (drop-in API)"},{id:"dask-ray",reason:"Ray Train scales to multi-GPU clusters"},{id:"distributed-training",reason:"Multi-GPU/multi-node LLM training"},{id:"cryo-em",reason:"Cryo-EM 3D reconstruction uses cuFFT"},{id:"bioinformatics",reason:"BWA-MEM2 GPU for genomics alignment"},{id:"molecular-modelling",reason:"GROMACS-GPU for molecular dynamics"},{id:"alphaproteo",reason:"Protein design on GPU (AlphaFold-style)"},{id:"llmops",reason:"LLM training/inference on GPU"}]}),(0,r.jsx)(a.ResearchDemo,{pageId:"gpu-computing"}),(0,r.jsx)(o.TrendAnticipation,{pageId:"gpu-computing"}),(0,r.jsx)(i.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"numpy-scipy",reason:"CuPy = GPU NumPy (drop-in API)"},{id:"dask-ray",reason:"Ray Train scales to multi-GPU clusters"}]}),(0,r.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,r.jsx)(t.default,{href:(0,h.hrefFor)("numpy-scipy"),className:"text-sm text-primary hover:underline",children:"→ NumPy/SciPy (CPU foundation)"}),(0,r.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,r.jsx)(t.default,{href:(0,h.hrefFor)("dask-ray"),className:"text-sm text-primary hover:underline",children:"→ Dask + Ray (multi-GPU via Ray Train)"}),(0,r.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,r.jsx)(t.default,{href:(0,h.hrefFor)("jupyter"),className:"text-sm text-primary hover:underline",children:"→ Jupyter (notebooks with GPU kernels)"}),(0,r.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,r.jsx)(t.default,{href:(0,h.hrefFor)("distributed-training"),className:"text-sm text-primary hover:underline",children:"→ Distributed Training (DeepSpeed + Megatron)"})]})]})}e.s(["GpuComputingPage",()=>N])}]);