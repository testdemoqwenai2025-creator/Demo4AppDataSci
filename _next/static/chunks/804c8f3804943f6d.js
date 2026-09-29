(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,466321,e=>{"use strict";var t=e.i(843476),s=e.i(271645),i=e.i(846932),a=e.i(522016),n=e.i(862824),r=e.i(342046),o=e.i(921371),d=e.i(580296),l=e.i(122836),c=e.i(716675),m=e.i(901752),h=e.i(487486),p=e.i(332017),f=e.i(39312),u=e.i(25652),x=e.i(868054),_=e.i(455711),g=e.i(966992),b=e.i(21218),v=e.i(309778),y=e.i(283086);let w=[{label:"Forward kernel",value:"q(x_t|x_0) = N(√ᾱ_t·x_0, (1-ᾱ_t)I)",hint:"Closed-form Gaussian noise injection",deltaTone:"flat"},{label:"Training loss",value:"‖ε - ε_θ(x_t, t)‖²",hint:"Predict noise, not the image (simplified DDPM)",deltaTone:"flat"},{label:"Score connection",value:"s_θ = -ε_θ / √(1-ᾱ_t)",hint:"Noise-prediction ⇔ score function",deltaTone:"flat"},{label:"Sampling steps",value:"10-50 (DDIM)",hint:"vs 1000 (DDPM). Non-Markovian skip",deltaTone:"flat"}];function N(){let[e,a]=(0,s.useState)(0);(0,s.useEffect)(()=>{let e=setInterval(()=>a(e=>(e+1)%12),600);return()=>clearInterval(e)},[]);let n=e>=6,r=n?11-e:e;return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("style",{children:`
        .diff-3d { perspective: 900px; }
        .diff-stage { transform: rotateX(15deg); transform-style: preserve-3d; }
      `}),(0,t.jsxs)("p",{className:"text-sm font-semibold mb-3 flex items-center gap-2",children:[(0,t.jsx)(v.Waves,{className:"h-4 w-4 text-primary"}),n?"Reverse diffusion (sampling)":"Forward diffusion (noise injection)",(0,t.jsxs)("span",{className:"text-[10px] font-mono text-muted-foreground ml-auto",children:["t = ",r,"/5"]})]}),(0,t.jsx)("div",{className:"diff-3d",children:(0,t.jsxs)("div",{className:"diff-stage",children:[(0,t.jsx)("div",{className:"flex justify-center items-center gap-1.5 mb-4",children:[0,1,2,3,4,5].map(e=>{let s=e===r,a=n?5-e:e,o=a/8;return(0,t.jsxs)(i.motion.div,{animate:{scale:s?1.25:1,boxShadow:s?"0 0 0 2px oklch(0.55 0.16 165 / 0.8), 0 8px 16px oklch(0.55 0.16 165 / 0.3)":"0 0 0 1px oklch(0.7 0 0 / 0.2)"},className:"relative w-12 h-12 rounded-md overflow-hidden border border-border/60",children:[(0,t.jsx)("div",{className:"absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold",style:{opacity:1-a/8,color:"oklch(0.4 0.15 200)"},children:"x₀"}),(0,t.jsx)("div",{className:"absolute inset-0",style:{background:`repeating-conic-gradient(
                        from 0deg at 50% 50%,
                        oklch(0.5 0.15 30 / ${o}) 0deg,
                        oklch(0.7 0 0 / ${o}) 5deg,
                        oklch(0.4 0.2 280 / ${o}) 10deg,
                        oklch(0.7 0 0 / ${o}) 15deg
                      )`}}),(0,t.jsxs)("div",{className:"absolute bottom-0 left-0 right-0 text-[8px] text-center bg-background/80 font-mono",children:["t=",e]})]},e)})}),(0,t.jsxs)("div",{className:"flex justify-center items-end gap-2",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-1 items-center",children:[(0,t.jsx)(i.motion.div,{animate:{opacity:n?.3:1},className:"w-14 h-8 rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-[9px] font-mono",children:"Conv↓"}),(0,t.jsx)(i.motion.div,{animate:{opacity:n?.3:1},className:"w-10 h-7 rounded bg-primary/15 border border-primary/30 flex items-center justify-center text-[8px] font-mono",children:"↓"}),(0,t.jsx)(i.motion.div,{animate:{opacity:n?.3:1},className:"w-8 h-6 rounded bg-primary/10 border border-primary/20 flex items-center justify-center text-[8px] font-mono",children:"↓"})]}),(0,t.jsxs)("svg",{width:"40",height:"100",className:"text-primary/60",children:[(0,t.jsx)(i.motion.line,{x1:"0",y1:"5",x2:"40",y2:"5",stroke:"var(--chart-2)",strokeWidth:"1",strokeDasharray:"2 2",animate:{opacity:n?1:.4}}),(0,t.jsx)(i.motion.line,{x1:"0",y1:"30",x2:"40",y2:"30",stroke:"var(--chart-3)",strokeWidth:"1",strokeDasharray:"2 2",animate:{opacity:n?1:.4}})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1 items-center",children:[(0,t.jsx)(i.motion.div,{animate:{scale:1},className:"w-8 h-6 rounded bg-amber-500/30 border border-amber-500/60 flex items-center justify-center text-[8px] font-mono",children:"mid"}),(0,t.jsx)("div",{className:"text-[8px] text-muted-foreground font-mono",children:"256d"})]}),(0,t.jsxs)("svg",{width:"40",height:"100",className:"text-primary/60",children:[(0,t.jsx)(i.motion.line,{x1:"0",y1:"30",x2:"40",y2:"30",stroke:"var(--chart-3)",strokeWidth:"1",strokeDasharray:"2 2",animate:{opacity:n?1:.4}}),(0,t.jsx)(i.motion.line,{x1:"0",y1:"5",x2:"40",y2:"5",stroke:"var(--chart-2)",strokeWidth:"1",strokeDasharray:"2 2",animate:{opacity:n?1:.4}})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1 items-center",children:[(0,t.jsx)(i.motion.div,{animate:{opacity:n?1:.3},className:"w-8 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[8px] font-mono",children:"↑"}),(0,t.jsx)(i.motion.div,{animate:{opacity:n?1:.3},className:"w-10 h-7 rounded bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[8px] font-mono",children:"↑"}),(0,t.jsx)(i.motion.div,{animate:{opacity:n?1:.3},className:"w-14 h-8 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[9px] font-mono",children:"Conv↑"})]})]}),(0,t.jsx)("div",{className:"flex justify-center mt-3",children:(0,t.jsx)(i.motion.div,{animate:{backgroundColor:e%2==0?"oklch(0.6 0.15 75 / 0.4)":"oklch(0.6 0.15 75 / 0.2)"},className:"px-3 py-1 rounded-full border border-amber-500/40 text-[10px] font-mono",children:"t-embedding → all blocks"})})]})}),(0,t.jsxs)("p",{className:"text-[10px] text-muted-foreground text-center mt-3",children:["Forward (top, t=0→5): noise injected via ",(0,t.jsx)("span",{className:"font-mono",children:"q(x_t|x_0) = √ᾱ_t·x_0 + √(1-ᾱ_t)·ε"}),". Reverse (top, t=5→0): U-Net predicts ε_θ(x_t, t), then x_",r-1," = (x_t - β_t/√(1-ᾱ_t) · ε_θ) / √ᾱ_t + σ_t·z."]})]})}let j=`# DDPM Forward Diffusion + Noise Schedules (Pyodide)
# Implements the closed-form forward kernel and 3 noise schedules

import math, random

# ============================================================
# Noise schedules: beta_t = how much noise to add at step t
# ============================================================

def linear_schedule(T, beta_start=1e-4, beta_end=0.02):
    "Original DDPM (Ho et al. 2020): linear in beta_t"
    return [beta_start + (beta_end - beta_start) * t / T for t in range(T)]

def cosine_schedule(T, s=0.008):
    "Nichol & Dhariwal 2021: cosine — better at low resolutions"
    f_t = [math.cos(((t / T + s) / (1 + s)) * math.pi / 2) ** 2 for t in range(T + 1)]
    alphas = [f_t[t] / f_t[t-1] if t > 0 else 1.0 for t in range(T + 1)]
    return [1.0 - alphas[t] for t in range(T)]

def quadratic_schedule(T, beta_max=0.02):
    "Quadratic growth — slower start, faster end"
    return [0.001 + (beta_max - 0.001) * (t / T) ** 2 for t in range(T)]

# Compute cumulative alpha_bar_t = prod_{s<=t} (1 - beta_s)
def compute_alpha_bar(betas):
    "ᾱ_t = prod_{s=0..t} (1 - beta_s) — cumulative noise variance"
    alpha_bar = [1.0]
    for b in betas:
        alpha_bar.append(alpha_bar[-1] * (1 - b))
    return alpha_bar

# ============================================================
# Forward kernel: q(x_t | x_0) = N(sqrt(alpha_bar_t) * x_0, (1 - alpha_bar_t) * I)
# ============================================================

def q_sample(x_0, t, alpha_bar_t, noise=None):
    "Sample x_t from the forward process (closed-form, no Markov chain needed)"
    if noise is None:
        noise = [random.gauss(0, 1) for _ in x_0]
    return [
        math.sqrt(alpha_bar_t) * x_0[i] + math.sqrt(1 - alpha_bar_t) * noise[i]
        for i in range(len(x_0))
    ]

# ============================================================
# Demo: 1D "image" of length 4, T = 20 steps
# ============================================================
random.seed(42)
T = 20
x_0 = [1.0, 0.5, -0.3, 0.8]  # synthetic "image"

print("=" * 60)
print("DDPM Forward Diffusion + Noise Schedules")
print("=" * 60)

for schedule_name, schedule_fn in [
    ("Linear",   linear_schedule),
    ("Cosine",   cosine_schedule),
    ("Quadratic", quadratic_schedule),
]:
    betas = schedule_fn(T)
    alpha_bars = compute_alpha_bar(betas)
    print(f"\\n--- {schedule_name} schedule ---")
    print(f"  beta_0 = {betas[0]:.5f}, beta_T = {betas[-1]:.5f}")
    print(f"  alpha_bar_T = {alpha_bars[T]:.5f} (should approach 0 — pure noise)")

    # Sample x_t at t = 0, 5, 10, 15, 20
    print(f"  Forward samples (showing x_t):")
    for t in [0, 5, 10, 15, 20]:
        random.seed(42)  # same noise for fair comparison
        x_t = q_sample(x_0, t, alpha_bars[t])
        ab = alpha_bars[t]
        snr = ab / (1 - ab) if ab < 1 else float('inf')  # signal-to-noise ratio
        print(f"    t={t:2d}: x_t = [{', '.join(f'{v:+.3f}' for v in x_t)}]  ᾱ={ab:.4f}  SNR={snr:.2f}")

print(f"\\n{'=' * 60}")
print("KEY OBSERVATIONS:")
print("  - Cosine schedule destroys signal FASTER early (good for low-res)")
print("  - Linear schedule destroys signal LINEARLY (original DDPM)")
print("  - Quadratic destroys signal SLOWLY early, FAST late")
print("  - At t=T, ᾱ ≈ 0 → x_T ≈ pure noise (no signal)")
print("  - The U-Net learns to REVERSE this process: x_T → x_0")
print("=" * 60)`,D=`# Reverse Diffusion + Langevin Sampling (Pyodide)
# Shows score-based sampling: x_{t-1} = x_t + (eps/2) * score(x_t) + sqrt(eps) * z

import math, random

# ============================================================
# Score function: s(x) = grad_x log p(x)
# For a Gaussian mixture, this has a closed form.
# ============================================================

def gaussian_pdf(x, mu, sigma):
    return (1 / (sigma * math.sqrt(2 * math.pi))) * math.exp(-0.5 * ((x - mu) / sigma) ** 2)

def score_gmm(x, mus, sigmas, weights):
    "Score of a Gaussian mixture: sum of component scores weighted by posterior"
    # P(c|x) ∝ w_c * N(x | mu_c, sigma_c)
    posteriors = [weights[c] * gaussian_pdf(x, mus[c], sigmas[c]) for c in range(len(mus))]
    Z = sum(posteriors)
    if Z == 0:
        return 0
    # Score of GMM = sum_c P(c|x) * score of component c
    # score of N(mu, sigma) at x = -(x - mu) / sigma^2
    score = 0
    for c in range(len(mus)):
        p_c = posteriors[c] / Z
        score_c = -(x - mus[c]) / (sigmas[c] ** 2)
        score += p_c * score_c
    return score

# ============================================================
# Annealed Langevin Dynamics — discrete version of reverse SDE
# x_{t+1} = x_t + (eps/2) * s(x_t) + sqrt(eps) * z
# Annealed: eps decreases over time (like sigma schedule)
# ============================================================

def langevin_sample(score_fn, n_steps=200, eps_start=1.0, eps_end=0.01, x_init=None):
    "Annealed Langevin dynamics — samples from p(x) given its score function"
    if x_init is None:
        x = random.gauss(0, 1)  # start from random
    else:
        x = x_init
    samples = [x]
    for t in range(n_steps):
        # Annealing: eps decreases linearly
        eps = eps_start * (eps_end / eps_start) ** (t / n_steps)
        # Langevin update
        s = score_fn(x)
        x = x + (eps / 2) * s + math.sqrt(eps) * random.gauss(0, 1)
        samples.append(x)
    return samples

# Target distribution: Gaussian mixture with modes at -3 and +3
mus = [-3.0, 3.0]
sigmas = [0.5, 0.5]
weights = [0.5, 0.5]

def score_fn(x):
    return score_gmm(x, mus, sigmas, weights)

print("=" * 60)
print("Reverse Diffusion via Langevin Dynamics")
print("=" * 60)

print(f"\\nTarget: GMM with modes at {mus}, σ={sigmas[0]}")
print(f"  True score: -(x - mu_c) / sigma^2 weighted by posterior")

# Run multiple chains
random.seed(42)
all_samples = []
for chain in range(5):
    samples = langevin_sample(score_fn, n_steps=300, eps_start=2.0, eps_end=0.001)
    all_samples.append(samples)
    print(f"  Chain {chain+1}: x_0={samples[0]:+.2f} → x_T={samples[-1]:+.2f}")

# Final samples cluster around the modes (-3, +3)
final_samples = [s[-1] for s in all_samples]
print(f"\\nFinal samples: {[f'{x:+.2f}' for x in final_samples]}")
print(f"  (Should be near \xb13 — the modes)")

# Show how the score function looks
print(f"\\n{'=' * 60}")
print("SCORE FUNCTION LANDSCAPE:")
print("  x | score(x) | direction")
for x in [-5, -3, -1, 0, 1, 3, 5]:
    s = score_fn(x)
    direction = "→ (right)" if s > 0 else "← (left)"
    print(f"  {x:+d} | {s:+.3f}  | {direction}")

print(f"\\n  At x=-3 (mode): score ≈ 0 (no gradient at the mode)")
print(f"  At x=-1 (between modes): score ≈ 0 (saddle — unstable!)")
print(f"  At x=+5 (right tail): score negative (push back to mode)")
print(f"\\n  This is EXACTLY what the U-Net learns in DDPM:")
print(f"    s_θ(x, t) = -ε_θ(x, t) / sqrt(1 - alpha_bar_t)")
print(f"  The noise prediction ε_θ IS the score function (up to scaling).")
print("=" * 60)`,T=`import torch
import torch.nn as nn
import torch.nn.functional as F
import math

# ============================================================
# U-Net — the workhorse architecture of diffusion models
# ============================================================

class SinusoidalTimeEmbedding(nn.Module):
    """Sinusoidal positional embedding for the timestep t.
    Same form as in the Transformer page (#32):
        PE(t, 2i) = sin(t / 10000^(2i/d))
        PE(t, 2i+1) = cos(t / 10000^(2i/d))
    """
    def __init__(self, dim):
        super().__init__()
        self.dim = dim
    
    def forward(self, t):
        # t: (B,) integer timesteps
        half = self.dim // 2
        freqs = torch.exp(-math.log(10000) * torch.arange(half) / half).to(t.device)
        args = t[:, None].float() * freqs[None, :]  # (B, half)
        emb = torch.cat([torch.sin(args), torch.cos(args)], dim=-1)  # (B, dim)
        return emb

class ConvBlock(nn.Module):
    """Conv → GroupNorm → SiLU → Conv → GroupNorm → SiLU.
    Time embedding injected via a linear projection added to the norm.
    """
    def __init__(self, in_ch, out_ch, time_dim):
        super().__init__()
        self.conv1 = nn.Conv2d(in_ch, out_ch, 3, padding=1)
        self.norm1 = nn.GroupNorm(8, out_ch)
        self.conv2 = nn.Conv2d(out_ch, out_ch, 3, padding=1)
        self.norm2 = nn.GroupNorm(8, out_ch)
        # Time embedding → channel-wise modulation
        self.time_mlp = nn.Sequential(
            nn.SiLU(),
            nn.Linear(time_dim, out_ch),
        )
        # Residual skip if channels differ
        self.skip = nn.Conv2d(in_ch, out_ch, 1) if in_ch != out_ch else nn.Identity()
    
    def forward(self, x, t_emb):
        h = self.conv1(x)
        h = self.norm1(h)
        h = F.silu(h)
        # Inject time embedding
        t = self.time_mlp(t_emb)  # (B, out_ch)
        h = h + t[:, :, None, None]  # broadcast over H, W
        h = self.conv2(h)
        h = self.norm2(h)
        h = F.silu(h)
        return h + self.skip(x)

class DownBlock(nn.Module):
    """ConvBlock → ConvBlock → MaxPool (downsample by 2)."""
    def __init__(self, in_ch, out_ch, time_dim):
        super().__init__()
        self.block1 = ConvBlock(in_ch, out_ch, time_dim)
        self.block2 = ConvBlock(out_ch, out_ch, time_dim)
        self.down = nn.MaxPool2d(2)
    
    def forward(self, x, t_emb):
        h = self.block1(x, t_emb)
        h = self.block2(h, t_emb)
        return self.down(h), h  # return pre-pool for skip connection

class UpBlock(nn.Module):
    """Upsample → ConvBlock(skip + up) → ConvBlock."""
    def __init__(self, in_ch, out_ch, time_dim):
        super().__init__()
        self.up = nn.Upsample(scale_factor=2, mode='bilinear', align_corners=True)
        self.block1 = ConvBlock(in_ch + out_ch, out_ch, time_dim)  # concat skip
        self.block2 = ConvBlock(out_ch, out_ch, time_dim)
    
    def forward(self, x, skip, t_emb):
        x = self.up(x)
        # Pad if sizes don't match
        diffY = skip.size(2) - x.size(2)
        diffX = skip.size(3) - x.size(3)
        x = F.pad(x, [diffX // 2, diffX - diffX // 2,
                      diffY // 2, diffY - diffY // 2])
        # Concat skip connection (the U in U-Net)
        x = torch.cat([x, skip], dim=1)
        x = self.block1(x, t_emb)
        x = self.block2(x, t_emb)
        return x

class UNet(nn.Module):
    """U-Net for DDPM noise prediction.
    
    Input:  (B, C, H, W) image + (B,) timestep
    Output: (B, C, H, W) predicted noise ε_θ
    
    Architecture (for 64\xd764 input):
        down1: 3→64, 64\xd764
        down2: 64→128, 32\xd732
        down3: 128→256, 16\xd716
        down4: 256→512, 8\xd78 (bottleneck)
        up1:   512→256, 16\xd716 (skip from down3)
        up2:   256→128, 32\xd732 (skip from down2)
        up3:   128→64, 64\xd764 (skip from down1)
        final: 64→3, 64\xd764
    """
    def __init__(self, in_channels=3, base_ch=64, time_dim=256):
        super().__init__()
        self.time_embed = SinusoidalTimeEmbedding(time_dim)
        self.time_mlp = nn.Sequential(
            nn.Linear(time_dim, time_dim * 4),
            nn.SiLU(),
            nn.Linear(time_dim * 4, time_dim),
        )
        # Encoder
        self.down1 = DownBlock(in_channels, base_ch, time_dim)
        self.down2 = DownBlock(base_ch, base_ch * 2, time_dim)
        self.down3 = DownBlock(base_ch * 2, base_ch * 4, time_dim)
        self.down4 = DownBlock(base_ch * 4, base_ch * 4, time_dim)
        # Bottleneck
        self.bot1 = ConvBlock(base_ch * 4, base_ch * 4, time_dim)
        self.bot2 = ConvBlock(base_ch * 4, base_ch * 4, time_dim)
        # Decoder (mirror of encoder, with skip connections)
        self.up1 = UpBlock(base_ch * 4, base_ch * 4, time_dim)
        self.up2 = UpBlock(base_ch * 4, base_ch * 2, time_dim)
        self.up3 = UpBlock(base_ch * 2, base_ch, time_dim)
        self.up4 = UpBlock(base_ch, base_ch, time_dim)
        # Output
        self.out = nn.Conv2d(base_ch, in_channels, 1)
    
    def forward(self, x, t):
        # Time embedding
        t_emb = self.time_embed(t)  # (B, time_dim)
        t_emb = self.time_mlp(t_emb)
        # Encoder
        x1, skip1 = self.down1(x, t_emb)  # 64ch, 32\xd732
        x2, skip2 = self.down2(x1, t_emb)  # 128ch, 16\xd716
        x3, skip3 = self.down3(x2, t_emb)  # 256ch, 8\xd78
        x4, skip4 = self.down4(x3, t_emb)  # 256ch, 4\xd74
        # Bottleneck
        x = self.bot1(x4, t_emb)
        x = self.bot2(x, t_emb)
        # Decoder with skip connections
        x = self.up1(x, skip4, t_emb)  # 256ch, 8\xd78
        x = self.up2(x, skip3, t_emb)  # 128ch, 16\xd716
        x = self.up3(x, skip2, t_emb)  # 64ch, 32\xd732
        x = self.up4(x, skip1, t_emb)  # 64ch, 64\xd764
        return self.out(x)  # (B, in_channels, H, W) — predicted noise

# ============================================================
# DDPM: forward process, training, and sampling
# ============================================================

class DDPM:
    """Denoising Diffusion Probabilistic Model (Ho et al. 2020).
    
    Forward (closed-form):
        q(x_t | x_0) = N(sqrt(alpha_bar_t) * x_0, (1 - alpha_bar_t) * I)
    
    Reverse (learned):
        p_theta(x_{t-1} | x_t) = N(mu_theta(x_t, t), sigma_theta^2 * I)
    
    Training objective (simplified):
        L = E[ ||eps - eps_theta(sqrt(alpha_bar_t) * x_0 + sqrt(1-alpha_bar_t) * eps, t)||^2 ]
    
    Sampling:
        x_{t-1} = (1/sqrt(alpha_t)) * (x_t - (beta_t/sqrt(1-alpha_bar_t)) * eps_theta(x_t, t))
                  + sigma_t * z   where z ~ N(0, I)
    """
    def __init__(self, T=1000, beta_start=1e-4, beta_end=0.02, device='cpu'):
        self.T = T
        # Linear schedule
        self.betas = torch.linspace(beta_start, beta_end, T, device=device)
        self.alphas = 1 - self.betas
        self.alpha_bars = torch.cumprod(self.alphas, dim=0)
        # Precompute constants for sampling
        self.sqrt_alpha_bars = torch.sqrt(self.alpha_bars)
        self.sqrt_one_minus_alpha_bars = torch.sqrt(1 - self.alpha_bars)
        self.sqrt_alphas = torch.sqrt(self.alphas)
        # Posterior variance (for sampling)
        self.posterior_var = self.betas * (1 - torch.cat([torch.tensor([1.0]), self.alpha_bars[:-1]])) / (1 - self.alpha_bars)
    
    def q_sample(self, x_0, t, noise=None):
        """Forward: sample x_t given x_0 (closed-form, no Markov chain)."""
        if noise is None:
            noise = torch.randn_like(x_0)
        return (
            self.sqrt_alpha_bars[t][:, None, None, None] * x_0
            + self.sqrt_one_minus_alpha_bars[t][:, None, None, None] * noise
        ), noise
    
    def train_step(self, model, x_0, optimizer):
        """One DDPM training step. Samples random t, predicts noise, MSE loss."""
        B = x_0.shape[0]
        t = torch.randint(0, self.T, (B,), device=x_0.device)
        x_t, noise = self.q_sample(x_0, t)
        # Predict noise
        noise_pred = model(x_t, t)
        # Simplified loss: ||eps - eps_theta||^2
        loss = F.mse_loss(noise, noise_pred)
        # Backprop
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        return loss.item()
    
    def sample(self, model, shape, device='cpu'):
        """Reverse process: x_T -> x_0 via 1000 denoising steps (slow!)."""
        model.eval()
        with torch.no_grad():
            x = torch.randn(shape, device=device)  # x_T ~ N(0, I)
            for t in reversed(range(self.T)):
                t_batch = torch.full((shape[0],), t, device=device, dtype=torch.long)
                eps_pred = model(x, t_batch)
                # Reverse update
                mean = (1 / self.sqrt_alphas[t]) * (
                    x - (self.betas[t] / self.sqrt_one_minus_alpha_bars[t]) * eps_pred
                )
                if t > 0:
                    noise = torch.randn_like(x)
                    x = mean + torch.sqrt(self.posterior_var[t]) * noise
                else:
                    x = mean
            return x  # x_0 — the generated sample

# ============================================================
# DDIM: 10-50x faster sampling (deterministic + non-Markovian)
# ============================================================

class DDIM:
    """Denoising Diffusion Implicit Models (Song et al. 2021).
    
    Key insight: reverse process doesn't need to be Markovian.
    Skip most timesteps — sample in 10-50 steps instead of 1000.
    
    Update rule:
        x_{t-1} = sqrt(alpha_bar_{t-1}) * pred_x0 + sqrt(1 - alpha_bar_{t-1}) * eps_pred
    where pred_x0 = (x_t - sqrt(1 - alpha_bar_t) * eps_pred) / sqrt(alpha_bar_t)
    """
    def __init__(self, ddpm):
        self.ddpm = ddpm
    
    def sample(self, model, shape, n_steps=50, eta=0.0, device='cpu'):
        """DDIM sampling. n_steps << T (e.g. 50 vs 1000).
        eta=0: deterministic (DDIM). eta=1: stochastic (DDPM)."""
        # Subsequence of timesteps (evenly spaced)
        timesteps = list(range(0, self.ddpm.T, self.ddpm.T // n_steps))
        timesteps = list(reversed(timesteps))
        
        model.eval()
        with torch.no_grad():
            x = torch.randn(shape, device=device)
            for i, t in enumerate(timesteps):
                t_batch = torch.full((shape[0],), t, device=device, dtype=torch.long)
                eps_pred = model(x, t_batch)
                # Predict x_0 from x_t and eps
                pred_x0 = (x - self.ddpm.sqrt_one_minus_alpha_bars[t] * eps_pred) / self.ddpm.sqrt_alpha_bars[t]
                if i < len(timesteps) - 1:
                    t_prev = timesteps[i + 1]
                    alpha_bar_prev = self.ddpm.alpha_bars[t_prev]
                else:
                    alpha_bar_prev = torch.tensor(1.0, device=device)
                # DDIM update
                x = torch.sqrt(alpha_bar_prev) * pred_x0 + torch.sqrt(1 - alpha_bar_prev) * eps_pred
                if eta > 0:
                    # Stochastic DDIM
                    sigma = eta * torch.sqrt(
                        (1 - alpha_bar_prev) / (1 - self.ddpm.alpha_bars[t]) * (1 - self.ddpm.alpha_bars[t] / alpha_bar_prev)
                    )
                    x = x + sigma * torch.randn_like(x)
            return x

# ============================================================
# Classifier-free guidance — conditional generation
# ============================================================

def classifier_free_guidance(model, x, t, cond, uncond, w=7.5):
    """Classifier-free guidance (Ho & Salimans 2021).
    
    eps = eps_theta(x, t, uncond) + w * (eps_theta(x, t, cond) - eps_theta(x, t, uncond))
    
    w=0: no guidance (just conditional)
    w=1: standard conditional generation
    w>1: extrapolate away from unconditional → sharper, more class-aligned samples
    w=15: too much → artifacts
    """
    eps_uncond = model(x, t, uncond)
    eps_cond = model(x, t, cond)
    return eps_uncond + w * (eps_cond - eps_uncond)

# Sanity check
if __name__ == "__main__":
    model = UNet(in_channels=3, base_ch=64)
    n_params = sum(p.numel() for p in model.parameters())
    print(f"U-Net parameters: {n_params:,} ({n_params / 1e6:.1f}M)")
    
    x = torch.randn(2, 3, 64, 64)
    t = torch.randint(0, 1000, (2,))
    eps = model(x, t)
    print(f"Input: {tuple(x.shape)} → Output: {tuple(eps.shape)}")
    
    ddpm = DDPM(T=1000)
    print(f"DDPM: T={ddpm.T}, alpha_bar_T={ddpm.alpha_bars[-1]:.6f}")
    print(f"  (should be ≈ 0 — pure noise at t=T)")`;function k(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(n.PageHeader,{eyebrow:"Diffusion Models · DDPM → DDIM → SDE",title:"Diffusion Models — From Forward Noise to Reverse Sampling",description:"The math behind generative diffusion: the closed-form forward kernel q(x_t|x_0) = N(√ᾱ_t·x_0, (1-ᾱ_t)I), the simplified DDPM training loss ‖ε - ε_θ(x_t, t)‖², the score-matching connection s_θ = -ε_θ/√(1-ᾱ_t), and the continuous-time SDE formulation. With low-level PyTorch implementations of U-Net (with time-embedding injection + skip connections), DDPM trainer, DDIM sampler (10-50× faster), and classifier-free guidance. Code-oriented, mathematical, scientific.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(v.Waves,{className:"h-3 w-3"})," DDPM + DDIM"]}),(0,t.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(f.Zap,{className:"h-3 w-3"})," Pyodide"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:w.map(e=>(0,t.jsx)(n.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(n.SectionCard,{title:"Diffusion in motion — forward noise injection, reverse U-Net denoising",description:"Top row: 6 noise levels from clean image (t=0) to pure noise (t=5). Forward diffusion adds noise via q(x_t|x_0). Reverse diffusion trains a U-Net (bottom diagram) to predict the noise ε_θ at each step, then subtracts it. The U-Net is symmetric — encoder (left) + bottleneck (middle) + decoder (right) — with skip connections (dashed) that preserve spatial detail lost in the bottleneck.",icon:(0,t.jsx)(v.Waves,{className:"h-5 w-5"}),badge:"3D animation",children:(0,t.jsx)(N,{})}),(0,t.jsx)(n.SectionCard,{title:"Forward diffusion — the closed-form kernel",description:"The forward process destroys an image by injecting Gaussian noise over T steps. The beautiful fact: q(x_t|x_0) has a closed form — no need to actually run the Markov chain. Just one Gaussian sample. The cumulative product ᾱ_t = ∏(1-β_s) controls how much signal remains at each step.",icon:(0,t.jsx)(_.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"q(x_t | x_0) = N(√ᾱ_t · x_0, (1 - ᾱ_t) · I)"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Equivalently: x_t = √ᾱ_t · x_0 + √(1 - ᾱ_t) · ε where ε ~ N(0, I)"})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"Notation:"}),(0,t.jsxs)("ul",{className:"text-xs space-y-1 ml-3",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{className:"font-mono text-primary",children:"β_t"}),' — variance of noise added at step t (the "noise schedule")']}),(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{className:"font-mono text-primary",children:"α_t = 1 - β_t"})," — signal retention at step t"]}),(0,t.jsxs)("li",{children:[(0,t.jsxs)("span",{className:"font-mono text-primary",children:["ᾱ_t = ∏",(0,t.jsx)("sub",{children:"s=1"}),(0,t.jsx)("sup",{children:"t"})," α_s"]})," — cumulative signal retention (the key quantity)"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("span",{className:"font-mono text-primary",children:"SNR(t) = ᾱ_t / (1 - ᾱ_t)"})," — signal-to-noise ratio at step t"]})]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"Why this matters:"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"The closed-form kernel means we can sample x_t directly from x_0 in O(1) — no Markov chain needed. This makes training parallel: each minibatch samples random (x_0, t) pairs, computes x_t in closed form, and the U-Net learns to predict ε from x_t. Without this, training would require sequential noise injection over 1000 steps per sample — infeasible."})]})]})}),(0,t.jsx)(n.SectionCard,{title:"Try it: Forward diffusion + 3 noise schedules (Pyodide)",description:"Implements the closed-form q_sample function and 3 noise schedules: linear (original DDPM, Ho 2020), cosine (Nichol & Dhariwal 2021, better for low-res), quadratic (slower early, faster late). Samples x_t at t = 0, 5, 10, 15, 20 and shows signal-to-noise ratio. The cosine schedule destroys signal faster early — this is why Stable Diffusion uses it.",icon:(0,t.jsx)(x.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(c.PyodideRunner,{code:j,buttonLabel:"Run forward diffusion (Pyodide)"})}),(0,t.jsx)(n.SectionCard,{title:"Reverse diffusion — what the U-Net learns",description:"The reverse process p_θ(x_{t-1}|x_t) is what the U-Net approximates. The simplified DDPM training objective is mathematically equivalent to the variational lower bound, but trains 1000× faster: instead of predicting the mean of a Gaussian, just predict the noise ε. The U-Net takes (x_t, t) → ε_θ, and the reverse update rule subtracts the predicted noise.",icon:(0,t.jsx)(_.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsxs)("p",{className:"font-mono text-sm text-primary",children:["L",(0,t.jsx)("sub",{children:"simple"})," = E",(0,t.jsx)("sub",{children:"x_0, ε, t"})," [ ‖ε - ε_θ(√ᾱ_t · x_0 + √(1-ᾱ_t) · ε, t)‖² ]"]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"The simplified DDPM loss — predict the noise, not the image. MSE on noise predictions."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"Reverse sampling step (DDPM):"}),(0,t.jsxs)("p",{className:"font-mono text-sm ml-2",children:["x_","{t-1}"," = (1/√α_t) · (x_t - (β_t/√(1-ᾱ_t)) · ε_θ(x_t, t)) + σ_t · z"]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground ml-2 mt-1",children:["where z ~ N(0, I) and σ_t = √(β_t · (1-ᾱ_","{t-1}",")/(1-ᾱ_t))"]})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"Why predict noise?"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"Predicting the mean μ_θ directly is unstable — small mean errors compound over 1000 steps. Predicting ε is bounded (it's noise, mean 0, var 1) and the gradient is well-conditioned. The two formulations are mathematically equivalent but noise-prediction trains 10× more stably."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-amber-600 dark:text-amber-400 mb-1",children:"DDIM trick"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"DDPM requires 1000 sequential steps (Markovian). DDIM (Song et al. 2021) drops the Markov assumption — sample any subset of timesteps, in any order. 10-50 steps typical. Deterministic when η=0 (same noise → same image). Quality barely drops vs 1000-step DDPM."})]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"The score-matching connection — ε_θ IS the score function",description:"The deep unification: the noise predictor ε_θ(x, t) is (up to scaling) the score function s_θ(x, t) = ∇_x log p_t(x) of the noised distribution. This connects DDPM to score-based generative models (Song & Ermon 2019) and the continuous-time SDE formulation.",icon:(0,t.jsx)(_.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"s_θ(x, t) = -ε_θ(x, t) / √(1 - ᾱ_t)"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Noise-prediction and score-matching are the same thing, just different parameterisations."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"The continuous-time SDE:"}),(0,t.jsxs)("p",{className:"font-mono text-sm ml-2",children:["dx = -½β_t · x · dt + √β_t · dw   ",(0,t.jsx)("span",{className:"text-muted-foreground",children:"(forward SDE)"})]}),(0,t.jsxs)("p",{className:"font-mono text-sm ml-2",children:["dx = [-½β_t · x - β_t · ∇log p_t(x)] dt + √β_t · dw̄   ",(0,t.jsx)("span",{className:"text-muted-foreground",children:"(reverse SDE)"})]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground ml-2 mt-1",children:"w is Brownian motion forward; w̄ is reverse-time Brownian. The score ∇log p_t(x) is approximated by s_θ = -ε_θ/√(1-ᾱ_t)."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"Langevin dynamics — discrete score-based sampling:"}),(0,t.jsxs)("p",{className:"font-mono text-sm ml-2",children:["x_","{t+1}"," = x_t + (ε/2) · s_θ(x_t, t) + √ε · z"]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground ml-2 mt-1",children:"z ~ N(0, I). With annealed ε (decreasing), this samples from p(x). The U-Net in DDPM and the score network in Langevin sampling are the same model."})]})]})}),(0,t.jsx)(n.SectionCard,{title:"Try it: Reverse diffusion via Langevin dynamics (Pyodide)",description:"Implements the score function for a 2-mode Gaussian mixture (closed form), then runs annealed Langevin dynamics to sample. Multiple chains start from random points and converge to the modes (±3). Shows the score landscape — at mode centers the score is 0 (gradient zero), between modes the score is also 0 (unstable saddle). This is EXACTLY what the U-Net learns to approximate.",icon:(0,t.jsx)(x.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(c.PyodideRunner,{code:D,buttonLabel:"Run Langevin sampling (Pyodide)"})}),(0,t.jsx)(n.SectionCard,{title:"Classifier-free guidance — conditional generation",description:"How to steer diffusion: train the U-Net to be conditional (take a class label or text embedding), then at sample time extrapolate away from the unconditional output. This is the trick behind DALL-E 2, Stable Diffusion, and Imagen — no separate classifier needed.",icon:(0,t.jsx)(y.Sparkles,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"ε̃ = ε_θ(x, t, ∅) + w · (ε_θ(x, t, c) - ε_θ(x, t, ∅))"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Unconditional prediction + scaled deviation from conditional. w=0: pure unconditional. w=1: pure conditional. w=7.5: typical (sharpens class alignment). w=15+: artifacts."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"w = 0"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"Unconditional — diversity high, no class control. Use for unconditional generation."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"w = 7.5"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"Standard. Sharp samples, aligned with prompt. Default in Stable Diffusion."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"w → ∞"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"Mode collapse — every sample converges to the mode of the conditional. Less diversity, more artifacts."})]})]}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"Training trick: 10% of the time, drop the conditional input (replace with ∅). This way the same U-Net learns both ε_θ(x, t, c) and ε_θ(x, t, ∅) — one model, two behaviours, no extra parameters."})]})}),(0,t.jsx)(n.SectionCard,{title:"Low-level PyTorch — U-Net, DDPM trainer, DDIM sampler, classifier-free guidance",description:"The actual production code. Sinusoidal time embedding (same form as Transformer positional encoding). ConvBlock with time embedding injected via channel-wise modulation. DownBlock/UpBlock with skip connections (the U in U-Net). Full DDPM class with q_sample + train_step + sample. DDIM class with 10-50× faster sampling. Classifier-free guidance function.",icon:(0,t.jsx)(g.Cpu,{className:"h-5 w-5"}),badge:"low-level",children:(0,t.jsx)(l.CodeBlock,{language:"python",filename:"diffusion_models.py",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355],code:T})}),(0,t.jsx)(n.SectionCard,{title:"Platform connection — synthetic data → pgvector → RAG",description:"The diffusion pipeline connects to the rest of the platform: ADR-026's ViT embeds generated images into pgvector (ADR-022), making synthetic data queryable. The semantic layer (ADR-024) can request 'generate a synthetic dashboard for Q3 revenue' and the conditional diffusion produces it. No real customer data touched — GDPR-safe synthetic test environments.",icon:(0,t.jsx)(b.Activity,{className:"h-5 w-5"}),children:(0,t.jsx)(l.CodeBlock,{language:"text",filename:"diffusion_platform.txt",code:`┌──────────────────────────────────────────────────────────────────────┐
│  DIFFUSION → PLATFORM INTEGRATION                                         │
│                                                                            │
│  [Text prompt]                                                            │
│       ↓                                                                    │
│  [CLIP text encoder (ADR-026 vision tower)] → 768-dim text embedding     │
│       ↓                                                                    │
│  [Conditional DDPM U-Net + LoRA (ADR-023)] → 50-step DDIM sample         │
│       ↓                                                                    │
│  [Generated image, e.g. synthetic Q3 revenue dashboard]                  │
│       ↓                                                                    │
│  [ViT image encoder (ADR-026)] → 768-dim image embedding                  │
│       ↓                                                                    │
│  [pgvector HNSW index (ADR-022)] → queryable synthetic data               │
│       ↓                                                                    │
│  [RAG retrieval (comp-sci-materials pipeline)]                            │
│       ↓                                                                    │
│  "Show me synthetic dashboards where UK revenue > \xa32M" → top-k results   │
│                                                                            │
│  STACK CONSISTENCY:                                                       │
│  - All U-Nets, ViTs, CLIP encoders use the SAME matmul + Conv2d primitives│
│  - LoRA adapters work for diffusion U-Nets just like for LLMs             │
│  - Same A100 GPUs, same tensor cores, same PyTorch stack                 │
│  - pgvector stores BOTH text and image embeddings in one index           │
│                                                                            │
│  GDPR IMPLICATION:                                                        │
│  - Synthetic test data: no PII, no real customers, no consent issues    │
│  - Test environments: full coverage without copying production data      │
│  - Anonymisation: train diffusion on real data, generate synthetic,      │
│    discard real — only the learned distribution is preserved              │
└──────────────────────────────────────────────────────────────────────────┘`})}),(0,t.jsx)(n.SectionCard,{title:"My deeper thought: diffusion IS thermodynamic reverse",description:"The forward diffusion process is the Boltzmann equation — heat dissipation, entropy increase, the second law of thermodynamics. The reverse process is its time-reversal: decreasing entropy, creating order from disorder. This is not a metaphor; it's the same mathematics. Diffusion models are doing thermodynamics.",icon:(0,t.jsx)(u.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:["The forward SDE ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"dx = -½β_t · x · dt + √β_t · dw"})," is the Langevin equation from statistical mechanics (Paul Langevin, 1908), originally formulated to describe Brownian motion of a particle in a fluid. The β_t coefficient is the friction (energy dissipation rate); √β_t · dw is the random force from fluid molecules. The same equation describes: (a) a particle reaching thermal equilibrium with its environment, (b) a signal decaying into noise, (c) the diffusion of a chemical through a solvent, (d) a hot cup of coffee cooling to room temperature. The forward diffusion process destroys an image the same way coffee cools — by entropic decay to the maximum-entropy state (pure Gaussian noise)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The reverse SDE is therefore thermodynamic time-reversal"}),' — running the second law backward, creating order from disorder. This is mathematically well-defined (Anderson 1982, "Reverse-time diffusion equation") but physically forbidden (you cannot unmix coffee from milk). What makes it computable is that we have the exact gradient field ∇log p_t(x) — given by the score network s_θ = -ε_θ/√(1-ᾱ_t). The U-Net learns the "arrow of time" in reverse — given any noise, it computes the trajectory back to the most likely source image. This is why diffusion models work: they exploit the same mathematical structure that governs thermodynamics, but run the equations in the direction physics forbids.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"This connects to the platform's deeper trajectory"}),': ADR-019\'s bandit (the recommendation engine) is a 1-step Markov decision process. The LLM (gen-ai-patterns page #34) is a T-step autoregressive process. The diffusion model is a T-step stochastic process. The RL agent (rl-agentic page #30) is an infinite-horizon discounted Markov process. All four are stochastic dynamical systems with learnable parameters — they share the same mathematical skeleton, the same gradient-based optimisation, the same backprop infrastructure. The "score function" of a diffusion model and the "policy gradient" of an RL agent are duals: both are ∇log p(action | state). The platform\'s GenAI stack IS a stack of stochastic dynamical systems, each running on the same PyTorch/cuDNN matmul backend, each leveraging the same ADR-022 pgvector storage, each fine-tunable via ADR-023 LoRA. The unification is mathematical, not just operational.']})]})}),(0,t.jsxs)(p.DeeperThoughtSection,{pageTitle:"Diffusion Models",children:[(0,t.jsx)(p.DeeperThought,{title:"Diffusion Models IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Diffusion Models is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Diffusion Models connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Diffusion Models sits in the computational-science landscape."})}),(0,t.jsx)(p.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Diffusion Models) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(p.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(p.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(p.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(o.ResearchDemo,{pageId:"diffusion-models"}),(0,t.jsx)(d.TrendAnticipation,{pageId:"diffusion-models"}),(0,t.jsx)(r.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"computer-vision",reason:"Continue to computer vision — see also from this page"},{id:"transformer",reason:"Continue to transformer — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,m.hrefFor)("computer-vision"),className:"text-sm text-primary hover:underline",children:"→ Computer Vision (ViT for encoding generated images)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,m.hrefFor)("transformer"),className:"text-sm text-primary hover:underline",children:"→ Transformer (time embedding = positional encoding)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,m.hrefFor)("fine-tuning"),className:"text-sm text-primary hover:underline",children:"→ Fine-Tuning (LoRA for diffusion U-Nets)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,m.hrefFor)("vector-db"),className:"text-sm text-primary hover:underline",children:"→ Vector DB (pgvector for synthetic data)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,m.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ ADR-027 (DDPM adoption)"})]})]})}e.s(["DiffusionModelsPage",()=>k])}]);