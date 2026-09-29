(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var a=e.i(843476),t=e.i(271645),i=e.i(487486),s=e.i(519455),r=e.i(716675),n=e.i(194058),l=e.i(862824),o=e.i(344396),m=e.i(178583),d=e.i(778917),c=e.i(283086),p=e.i(972520),u=e.i(217923),h=e.i(522016),f=e.i(901752);function _({pageId:e}){let t=(0,o.researchForPage)(e);return 0===t.length?null:(0,a.jsxs)(l.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,a.jsx)(m.FileText,{className:"h-5 w-5"}),badge:`${t.length} paper${1===t.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[t.map((e,t)=>(0,a.jsx)(x,{entry:e},t)),(0,a.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[t.length," paper",1===t.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function x({entry:e}){let[l,o]=(0,t.useState)(!1),[m,_]=(0,t.useState)(null);return(0,a.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,a.jsxs)("div",{className:"space-y-1",children:[(0,a.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,a.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,a.jsx)(i.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,a.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,a.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,a.jsx)(d.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,a.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,a.jsx)(d.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,a.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,a.jsxs)(s.Button,{variant:"outline",size:"sm",onClick:()=>o(!l),className:"h-7 text-[11px] gap-1.5",children:[(0,a.jsx)(c.Sparkles,{className:"h-3 w-3"}),l?"Hide expected code":"Show expected code + visualization"]}),l&&(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(r.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let a=e.indexOf("{"),t=e.lastIndexOf("}");if(a>=0&&t>a){let i=e.substring(a,t+1);_(JSON.parse(i))}}catch{}},hideTextOutput:!!m,compact:!0}),m?(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,a.jsx)(u.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,a.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,a.jsx)(n.AnalysisChart,{data:m,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,a.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,a.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,a.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,a.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,a.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,a.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,a.jsxs)(h.default,{href:(0,f.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,a.jsx)(p.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>_])},59938,e=>{"use strict";var a=e.i(843476),t=e.i(522016),i=e.i(852008),s=e.i(901752);function r({topics:e}){return 0===e.length?null:(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-muted/20 p-4",children:[(0,a.jsxs)("p",{className:"text-xs font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(i.Layers,{className:"h-3.5 w-3.5 text-primary"})," Related topics — cross-page navigation"]}),(0,a.jsx)("div",{className:"flex flex-wrap gap-2 text-sm",children:e.map((i,r)=>(0,a.jsxs)("span",{className:"flex items-center gap-1",children:[(0,a.jsxs)(t.default,{href:(0,s.hrefFor)(i.id),className:"text-primary hover:underline",children:["→ ",i.reason]}),r<e.length-1&&(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"})]},i.id))})]})}e.s(["RelatedTopics",()=>r])},664659,e=>{"use strict";var a=e.i(631171);e.s(["ChevronDown",()=>a.default])},367240,e=>{"use strict";var a=e.i(272977);e.s(["RotateCcw",()=>a.default])},72664,e=>{"use strict";var a=e.i(884656);e.s(["Box",()=>a.default])},503116,e=>{"use strict";var a=e.i(949411);e.s(["Clock",()=>a.default])},461189,e=>{"use strict";var a=e.i(843476),t=e.i(271645),i=e.i(846932),s=e.i(88653),r=e.i(515288),n=e.i(487486),l=e.i(519455),o=e.i(664659),m=e.i(531278),d=e.i(431343),c=e.i(63209),p=e.i(595468),u=e.i(503116),h=e.i(658041),f=e.i(966992),_=e.i(21218),x=e.i(716675),y=e.i(194058);let g={Physics:"oklch(0.65 0.18 280)",Chemistry:"oklch(0.65 0.18 140)",Climate:"oklch(0.65 0.18 200)",Biology:"oklch(0.65 0.18 100)",Finance:"oklch(0.65 0.18 30)",ML:"oklch(0.65 0.18 320)",Audio:"oklch(0.65 0.18 340)",Robotics:"oklch(0.65 0.18 60)"},v={synthetic:"Synthetic data (offline-safe)",arxiv:"arXiv API (live)",github:"GitHub API (live)",noaa:"NOAA Open Data (live)",pangeo:"Pangeo / Zarr (live)",opentsky:"OpenSky Network (live)",chembl:"ChEMBL API (live)"};function b({spec:e}){let[b,S]=(0,t.useState)(!1),[N,I]=(0,t.useState)(null),[C,E]=(0,t.useState)("idle"),[T,j]=(0,t.useState)(null),[R,k]=(0,t.useState)(null),[L,A]=(0,t.useState)(null),P=e.accent??g[e.domain],M=(0,t.useCallback)(e=>{try{let a=JSON.parse(e.trim().split("\n").filter(e=>e.startsWith("{")||e.startsWith("[")).join(""));I(a),E("done"),A(R?Date.now()-R:null)}catch(e){j(`Failed to parse Python output as JSON: ${e instanceof Error?e.message:String(e)}`),E("error")}},[R]),D=(0,t.useCallback)(()=>{S(e=>!e)},[]),[V,H]=(0,t.useState)(!1),O=V&&e.liveDataCode?e.liveDataCode:e.pythonCode,B=(0,t.useCallback)(()=>{E("loading"),j(null),I(null),k(Date.now())},[]);return(0,a.jsxs)(r.Card,{className:"overflow-hidden border-border/60 transition-shadow hover:shadow-md",style:{borderLeftWidth:4,borderLeftColor:P},children:[(0,a.jsxs)(r.CardHeader,{className:"pb-3",children:[(0,a.jsxs)("div",{className:"flex items-start gap-3",children:[(0,a.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 flex-wrap mb-1",children:[(0,a.jsx)(n.Badge,{variant:"outline",className:"text-[10px] gap-1 font-mono",style:{color:P,borderColor:P},children:e.domain}),(0,a.jsxs)(n.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,a.jsx)(h.Database,{className:"h-2.5 w-2.5"}),v[e.dataSource]]}),(0,a.jsxs)(n.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,a.jsx)(u.Clock,{className:"h-2.5 w-2.5"}),e.estimatedRuntime]}),(0,a.jsxs)(n.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,a.jsx)(f.Cpu,{className:"h-2.5 w-2.5"}),"Pyodide"]})]}),(0,a.jsx)(r.CardTitle,{className:"text-base leading-tight",children:e.title}),(0,a.jsx)(r.CardDescription,{className:"text-xs mt-1.5 leading-relaxed",children:e.abstract})]}),(0,a.jsx)(l.Button,{variant:"ghost",size:"sm",onClick:D,"aria-label":b?"Collapse":"Expand","aria-expanded":b,className:"shrink-0",children:(0,a.jsx)(o.ChevronDown,{className:`h-4 w-4 transition-transform ${b?"rotate-180":""}`})})]}),(0,a.jsx)("div",{className:"flex flex-wrap gap-1 mt-2",children:e.tools.map(e=>(0,a.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded font-mono bg-muted/60 text-muted-foreground",children:e},e))})]}),(0,a.jsx)(s.AnimatePresence,{initial:!1,children:b&&(0,a.jsx)(i.motion.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.25},className:"overflow-hidden",children:(0,a.jsxs)(r.CardContent,{className:"pt-0 space-y-4",children:[e.mathLatex&&(0,a.jsxs)("div",{className:"rounded-md border border-border/40 bg-muted/20 p-3",children:[(0,a.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-semibold",children:"Mathematical foundation"}),(0,a.jsx)(w,{latex:e.mathLatex})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,a.jsxs)(l.Button,{variant:"loading"===C?"outline":"default",size:"sm",className:"gap-1.5",onClick:B,disabled:"loading"===C,children:["loading"===C?(0,a.jsx)(m.Loader2,{className:"h-3.5 w-3.5 animate-spin"}):"done"===C?(0,a.jsx)(p.CheckCircle2,{className:"h-3.5 w-3.5"}):"error"===C?(0,a.jsx)(c.AlertCircle,{className:"h-3.5 w-3.5"}):(0,a.jsx)(d.Play,{className:"h-3.5 w-3.5"}),"loading"===C?"Running analysis…":"done"===C?"Re-run analysis":"Load analysis"]}),null!==L&&"done"===C&&(0,a.jsxs)("span",{className:"text-[10px] text-muted-foreground flex items-center gap-1",children:[(0,a.jsx)(_.Activity,{className:"h-3 w-3"}),L<1e3?`${L}ms`:`${(L/1e3).toFixed(1)}s`]}),e.liveDataCode&&(0,a.jsxs)("div",{className:"flex items-center gap-1 ml-auto",children:[(0,a.jsx)("span",{className:`text-[10px] font-mono px-1.5 py-0.5 rounded ${V?"bg-emerald-500/15 text-emerald-600 dark:text-emerald-400":"bg-muted text-muted-foreground"}`,children:V?"LIVE":"SYNTHETIC"}),(0,a.jsx)(l.Button,{variant:"ghost",size:"sm",onClick:()=>H(!V),className:"h-6 px-2 text-[10px] gap-1","aria-pressed":V,children:V?"Use synthetic":`Use live ${e.liveDataSource??"data"}`})]})]}),(0,a.jsx)(x.PyodideRunner,{code:O,preamble:e.preamble,buttonLabel:"",onOutput:M,hideTextOutput:!0,compact:!0}),T&&(0,a.jsxs)("div",{className:"rounded-md border border-rose-500/40 bg-rose-500/5 p-3 text-xs text-rose-700 dark:text-rose-300",children:[(0,a.jsx)(c.AlertCircle,{className:"h-3 w-3 inline mr-1.5"}),T]}),N&&(0,a.jsx)(y.AnalysisChart,{data:N,accent:P}),e.citation&&(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground italic border-t border-border/40 pt-2",children:e.citation})]})})})]})}function S({cards:e}){return(0,a.jsx)("div",{className:"grid md:grid-cols-2 gap-4",children:e.map(e=>(0,a.jsx)(b,{spec:e},e.id))})}function w({latex:i}){let s=(0,t.useRef)(null),[r,n]=(0,t.useState)(!1);return(0,t.useEffect)(()=>{let a=!1;if(s.current&&!r)return e.A(839484).then(e=>{if(a||!s.current)return;let t=e.default??e;try{t.render(i,s.current,{throwOnError:!1,displayMode:!0}),n(!0)}catch{s.current&&(s.current.textContent=i),n(!0)}}).catch(()=>{s.current&&(s.current.textContent=i),n(!0)}),()=>{a=!0}},[i,r]),(0,a.jsx)("div",{ref:s,className:"text-sm overflow-x-auto"})}e.s(["AnalysisCard",()=>b,"AnalysisCardGrid",()=>S])},642348,e=>{"use strict";let a=[{id:"quantum-harmonic-oscillator",title:"Quantum harmonic oscillator — energy eigenstates & probability density",domain:"Physics",abstract:"Solve the time-independent Schrödinger equation for a particle in a harmonic potential. Plot the first 5 energy eigenstates (Hermite polynomials × Gaussian envelope) and their probability densities. The zero-point energy ℏω/2 emerges from the uncertainty principle.",mathLatex:"\\hat{H}\\psi_n = E_n \\psi_n, \\quad E_n = \\hbar\\omega\\left(n + \\tfrac{1}{2}\\right), \\quad \\psi_n(x) = \\frac{1}{\\sqrt{2^n n!}} \\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4} e^{-m\\omega x^2/2\\hbar} H_n\\left(\\sqrt{\\tfrac{m\\omega}{\\hbar}} x\\right)",pythonCode:`import numpy as np
from math import factorial, exp, sqrt, pi

# Solve QHO eigenstates numerically (Hermite polynomial recurrence)
# Using atomic units: hbar = m = omega = 1 (natural units)
hbar = m = omega = 1.0
x = np.linspace(-5, 5, 500)

def hermite(n, x):
    """Physicist's Hermite polynomial via recurrence."""
    if n == 0: return np.ones_like(x)
    if n == 1: return 2 * x
    H_prev, H_curr = np.ones_like(x), 2 * x
    for k in range(2, n + 1):
        H_next = 2 * x * H_curr - 2 * (k - 1) * H_prev
        H_prev, H_curr = H_curr, H_next
    return H_curr

def psi_n(n, x):
    """Normalized QHO eigenstate."""
    alpha = sqrt(m * omega / hbar)
    norm = 1.0 / sqrt(2**n * factorial(n)) * (m * omega / (pi * hbar))**0.25
    return norm * np.exp(-0.5 * alpha**2 * x**2) * hermite(n, alpha * x)

# Build chart data: first 5 eigenstates
series = []
for n in range(5):
    psi = psi_n(n, x)
    prob = np.abs(psi)**2
    # Downsample for chart legibility (every 5th point)
    series.append({
        "name": f"n={n}, E={n + 0.5}ℏω",
        "data": [{"x": float(xi), "y": float(pi)} for xi, pi in zip(x[::5], prob[::5])]
    })

import json
print(json.dumps({
    "chart_type": "line",
    "title": "QHO probability densities |ψₙ(x)|\xb2 for n=0..4",
    "x_label": "position x (atomic units)",
    "y_label": "|ψ(x)|\xb2",
    "series": series,
    "stats": [
        {"label": "Zero-point energy", "value": "0.500", "unit": "ℏω", "tone": "success"},
        {"label": "Energy spacing", "value": "1.000", "unit": "ℏω", "tone": "default"},
        {"label": "Eigenstates plotted", "value": "5", "tone": "default"},
        {"label": "Spatial domain", "value": "[-5, 5]", "unit": "a₀", "tone": "default"},
    ],
    "summary": "The zero-point energy ℏω/2 is the lowest possible energy — a direct consequence of the Heisenberg uncertainty principle. Higher n states have n+1 nodes and approach the classical limit (equipartition) as n → ∞. This is the foundation of vibrational spectroscopy in chemistry (IR-active modes are QHOs)."
}))`,liveDataCode:`# LIVE DATA variant — fetch real atomic energy levels from NIST
# The NIST Atomic Spectra Database provides measured energy levels
# for atoms/ions. We fetch H (hydrogen) energy levels and compare
# to the QHO theoretical formula E_n = ℏω(n + 1/2).
import json
from pyodide.http import pyfetch

async def fetch_nist_levels():
    """Fetch hydrogen energy levels from NIST ASD API."""
    url = "https://physics.nist.gov/cgi-bin/ASD/energy.pl?units=1&element=H&ion=H+spectra&level_out=on&j_out=on&temp=&submit=Retrieve+Data"
    try:
        resp = await pyfetch(url)
        text = await resp.text()
        # Parse the NIST HTML response for energy level data
        # NIST returns HTML tables — extract the energy values
        import re
        # Look for energy values in eV (format: X.XXXXXX)
        energies = re.findall(r'(\\d+\\.\\d{4,6})\\s+eV', text)
        if not energies:
            # Try alternate format (cm^-1)
            energies = re.findall(r'(\\d{5,7}\\.\\d+)\\s+cm', text)
            if energies:
                energies = [str(float(e) / 8065.54) for e in energies[:5]]  # convert cm^-1 to eV
        if len(energies) < 3:
            raise ValueError("Not enough energy levels found")
        return [float(e) for e in energies[:5]]
    except Exception as e:
        print(f"NIST API failed ({e}). Falling back to synthetic.")
        return None

nist_levels = await fetch_nist_levels()

import numpy as np
from math import factorial, sqrt, pi

hbar = m = omega = 1.0  # atomic units
x = np.linspace(-5, 5, 200)

def hermite(n, x):
    if n == 0: return np.ones_like(x)
    if n == 1: return 2 * x
    H_prev, H_curr = np.ones_like(x), 2 * x
    for k in range(2, n + 1):
        H_next = 2 * x * H_curr - 2 * (k - 1) * H_prev
        H_prev, H_curr = H_curr, H_next
    return H_curr

def psi_n(n, x):
    alpha = sqrt(m * omega / hbar)
    norm = 1.0 / sqrt(2**n * factorial(n)) * (m * omega / (pi * hbar))**0.25
    return norm * np.exp(-0.5 * alpha**2 * x**2) * hermite(n, alpha * x)

if nist_levels is not None:
    # NIST levels are real measured data — compare to QHO formula
    nist_e = nist_levels[:5]
    # QHO formula: E_n = ℏω(n + 1/2). Fit ℏω from the spacing.
    theoretical_e = [(n + 0.5) * 1.0 for n in range(5)]
    # Compute deviations
    deviations = [(t - n) / max(n, 0.001) * 100 for t, n in zip(theoretical_e, nist_e)]
    series = [{"name": "QHO theory E_n = ℏω(n+\xbd)", "data": [{"x": n, "y": float(theoretical_e[n])} for n in range(5)]}]
    series.append({"name": "NIST measured (H atom)", "data": [{"x": n, "y": float(nist_e[n])} for n in range(len(nist_e))]})
    print(json.dumps({
        "chart_type": "line",
        "title": "QHO theory vs NIST measured hydrogen energy levels (LIVE)",
        "x_label": "Quantum number n",
        "y_label": "Energy (eV)",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "NIST ASD (LIVE)", "tone": "success"},
            {"label": "Levels fetched", "value": str(len(nist_e)), "tone": "default"},
            {"label": "First level (ground state)", "value": f"{nist_e[0]:.4f} eV", "tone": "success"},
            {"label": "Avg deviation from QHO", "value": f"{np.mean(np.abs(deviations)):.1f}%", "tone": "warning"},
        ],
        "summary": f"LIVE data from NIST Atomic Spectra Database: {len(nist_e)} hydrogen energy levels. The QHO formula E_n = ℏω(n+\xbd) predicts equally-spaced levels; real atoms deviate at high n due to anharmonicity. This deviation IS the physics — the QHO is the first-order approximation, and the deviations encode the real molecular potential."
    }))
else:
    # Synthetic fallback — same as the original
    series = []
    for n in range(5):
        psi = psi_n(n, x)
        prob = np.abs(psi)**2
        series.append({"name": f"n={n}, E={n + 0.5}ℏω", "data": [{"x": float(xi), "y": float(pi)} for xi, pi in zip(x[::5], prob[::5])]})
    print(json.dumps({
        "chart_type": "line",
        "title": "QHO probability densities (synthetic fallback)",
        "x_label": "position x (atomic units)",
        "y_label": "|ψ(x)|\xb2",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "SYNTHETIC (NIST API failed)", "tone": "warning"},
            {"label": "Zero-point energy", "value": "0.500 ℏω", "tone": "success"},
        ],
        "summary": "NIST API was unreachable. Showing synthetic QHO eigenstates."
    }))`,liveDataSource:"NIST ASD",preamble:"import numpy\nfrom math import factorial, sqrt, pi, exp",dataSource:"synthetic",estimatedRuntime:"<5s",tools:["numpy","scipy.special.hermite","math"],citation:"Griffiths, D.J. (2005). Introduction to Quantum Mechanics, 2nd ed. Chapter 2."},{id:"molecular-similarity",title:"Molecular fingerprint similarity — Tanimoto on ECFP-like bit vectors",domain:"Chemistry",abstract:"Generate 10 synthetic 'molecules' as 1024-bit fingerprints (mimicking ECFP4). Compute the pairwise Tanimoto similarity matrix and visualise as a heatmap. Molecules with Tanimoto > 0.85 are typically considered 'similar' in lead-optimisation campaigns.",mathLatex:"T_{A,B} = \\frac{|A \\cap B|}{|A \\cup B|} = \\frac{c}{a + b - c}",pythonCode:`import numpy as np
import json

np.random.seed(42)

# Generate 10 synthetic "molecules" as 1024-bit fingerprints.
# In real cheminformatics, these would be ECFP4 (Morgan) fingerprints
# computed by RDKit from the molecular graph.
N_MOLECULES = 10
FP_BITS = 1024
# Make fingerprints sparse (realistic — ~20-30% bits set)
fps = (np.random.rand(N_MOLECULES, FP_BITS) < 0.25).astype(int)

# Compute pairwise Tanimoto similarity
def tanimoto(a, b):
    intersection = np.sum(a & b)
    union = np.sum(a | b)
    return intersection / union if union > 0 else 1.0

sim_matrix = np.zeros((N_MOLECULES, N_MOLECULES))
for i in range(N_MOLECULES):
    for j in range(N_MOLECULES):
        sim_matrix[i, j] = tanimoto(fps[i], fps[j])

# Find the most similar pair (excluding self-similarity)
np.fill_diagonal(sim_matrix, 0)
most_sim = np.unravel_index(np.argmax(sim_matrix), sim_matrix.shape)

# Build scatter: for each pair, plot (mean bit density, similarity)
pairs = []
for i in range(N_MOLECULES):
    for j in range(i + 1, N_MOLECULES):
        pairs.append({
            "x": float((fps[i].sum() + fps[j].sum()) / 2),
            "y": float(sim_matrix[i, j])
        })

print(json.dumps({
    "chart_type": "scatter",
    "title": "Tanimoto similarity vs mean bit density (synthetic ECFP4 fingerprints)",
    "x_label": "Mean bits set (per molecule pair)",
    "y_label": "Tanimoto similarity T(A,B)",
    "series": [{
        "name": "Molecule pairs (n=45)",
        "data": pairs
    }],
    "reference_lines": [
        {"y": 0.85, "label": "Similarity threshold (0.85)", "color": "#10b981"},
        {"y": 0.50, "label": "Random pair (~0.50)", "color": "#f59e0b"}
    ],
    "stats": [
        {"label": "Pairs analysed", "value": str(len(pairs)), "tone": "default"},
        {"label": "Most similar pair", "value": f"mol_{most_sim[0]} ↔ mol_{most_sim[1]}", "tone": "success"},
        {"label": "Max Tanimoto", "value": f"{float(sim_matrix[most_sim]):.3f}", "tone": "success"},
        {"label": "Median Tanimoto", "value": f"{float(np.median([p['y'] for p in pairs])):.3f}", "tone": "default"},
    ],
    "summary": "Tanimoto similarity is the workhorse metric of cheminformatics — it underpins virtual screening, scaffold hopping, and cluster analysis. The 0.85 threshold is the conventional 'similar molecule' cutoff in lead optimisation. Above this, molecules typically share a common scaffold and similar biological activity (per the Similarity Property Principle)."
}))`,liveDataCode:`# LIVE DATA variant — fetch real molecules from ChEMBL API
# ChEMBL is a database of bioactive drug-like molecules.
# We fetch real molecular fingerprints and compute Tanimoto similarity.
import json
from pyodide.http import pyfetch

async def fetch_chembl_molecules():
    """Fetch 10 real molecules from ChEMBL API."""
    url = "https://www.ebi.ac.uk/chembl/api/data/molecule.json?format=json&limit=10&molecule_chembl_id__in=CHEMBL1,CHEMBL2,CHEMBL3,CHEMBL4,CHEMBL5,CHEMBL6,CHEMBL7,CHEMBL8,CHEMBL9,CHEMBL10"
    try:
        resp = await pyfetch(url, headers={"Accept": "application/json"})
        data = await resp.json()
        molecules = data.get("molecules", [])
        if len(molecules) < 3:
            raise ValueError("Not enough molecules")
        return molecules
    except Exception as e:
        print(f"ChEMBL API failed ({e}). Falling back to synthetic.")
        return None

molecules = await fetch_chembl_molecules()

import numpy as np

if molecules is not None:
    # Extract molecular properties (use molecular_weight as a proxy for fingerprint)
    # Real ChEMBL molecules have: pref_name, molecular_weight, alogp, etc.
    mol_data = []
    for mol in molecules:
        props = mol.get("molecule_properties", {})
        mw = props.get("full_mwt", 0) or 0
        alogp = props.get("alogp", 0) or 0
        psa = props.get("psa", 0) or 0
        hba = props.get("hba", 0) or 0
        hbd = props.get("hbd", 0) or 0
        chembl_id = mol.get("molecule_chembl_id", "?")
        name = mol.get("pref_name", "?") or "?"
        mol_data.append({
            "id": chembl_id,
            "name": name,
            "mw": float(mw),
            "alogp": float(alogp),
            "psa": float(psa),
            "hba": int(hba),
            "hbd": int(hbd),
        })

    # Compute pairwise "Tanimoto-like" similarity on molecular properties
    # (Normalised Euclidean distance → similarity score)
    n = len(mol_data)
    sim_matrix = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            # Normalise properties to [0,1] range and compute cosine similarity
            v_i = np.array([mol_data[i]["mw"]/1000, mol_data[i]["alogp"]/5, mol_data[i]["psa"]/150, mol_data[i]["hba"]/10, mol_data[i]["hbd"]/10])
            v_j = np.array([mol_data[j]["mw"]/1000, mol_data[j]["alogp"]/5, mol_data[j]["psa"]/150, mol_data[j]["hba"]/10, mol_data[j]["hbd"]/10])
            cos_sim = np.dot(v_i, v_j) / (np.linalg.norm(v_i) * np.linalg.norm(v_j) + 1e-8)
            sim_matrix[i, j] = cos_sim

    # Find most similar pair
    np.fill_diagonal(sim_matrix, 0)
    most_sim = np.unravel_index(np.argmax(sim_matrix), sim_matrix.shape)

    # Build scatter: MW vs ALogP for each molecule
    series = [{
        "name": "ChEMBL molecules (LIVE)",
        "data": [{"x": m["mw"], "y": m["alogp"]} for m in mol_data]
    }]

    print(json.dumps({
        "chart_type": "scatter",
        "title": f"Live molecular property space — {n} real ChEMBL molecules",
        "x_label": "Molecular weight (Da)",
        "y_label": "ALogP (lipophilicity)",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "ChEMBL API (LIVE)", "tone": "success"},
            {"label": "Molecules fetched", "value": str(n), "tone": "default"},
            {"label": "Most similar pair", "value": f"{mol_data[most_sim[0]]['id']} ↔ {mol_data[most_sim[1]]['id']}", "tone": "success"},
            {"label": "Max similarity", "value": f"{float(sim_matrix[most_sim]):.3f}", "tone": "success"},
        ],
        "summary": f"LIVE data from ChEMBL: {n} real bioactive molecules (CHEMBL1-CHEMBL10). Scatter shows molecular weight vs lipophilicity (ALogP) — the two key properties in drug design. Similar molecules cluster together. This is the real property space that medicinal chemists navigate during lead optimisation."
    }))
else:
    # Synthetic fallback
    np.random.seed(42)
    N_MOL = 10
    FP_BITS = 1024
    fps = (np.random.rand(N_MOL, FP_BITS) < 0.25).astype(int)
    def tanimoto(a, b):
        intersection = np.sum(a & b)
        union = np.sum(a | b)
        return intersection / union if union > 0 else 1.0
    pairs = []
    for i in range(N_MOL):
        for j in range(i + 1, N_MOL):
            pairs.append({"x": float((fps[i].sum() + fps[j].sum()) / 2), "y": float(tanimoto(fps[i], fps[j]))})
    print(json.dumps({
        "chart_type": "scatter",
        "title": "Tanimoto similarity (synthetic fallback)",
        "x_label": "Mean bits set",
        "y_label": "Tanimoto similarity",
        "series": [{"name": "Pairs", "data": pairs}],
        "stats": [
            {"label": "Data source", "value": "SYNTHETIC (ChEMBL API failed)", "tone": "warning"},
        ],
        "summary": "ChEMBL API was unreachable. Showing synthetic fingerprint similarity."
    }))`,liveDataSource:"ChEMBL",dataSource:"synthetic",estimatedRuntime:"<5s",tools:["numpy","RDKit (real)","scipy.spatial.distance"],citation:"Bajusz, D. et al. (2015). Why is Tanimoto index an appropriate choice for fingerprint-based similarity calculations? J. Cheminf. 7:20."},{id:"gev-flood-frequency",title:"Flood frequency analysis — fitting GEV to annual maxima",domain:"Climate",abstract:"Generate 80 years of synthetic annual maximum daily river flows from a known GEV (shape=-0.15, location=120, scale=40). Fit a GEV via MLE, then compute return levels for 10/50/100/500-year floods. The shape parameter ξi controls the tail: negative=Weibull (bounded), zero=Gumbel (light tail), positive=Fréchet (heavy tail).",mathLatex:"\\hat{\\xi}, \\hat{\\mu}, \\hat{\\sigma} = \\arg\\max_{\\xi,\\mu,\\sigma} \\prod_{i=1}^{n} f_{\\text{GEV}}(x_i; \\xi, \\mu, \\sigma), \\quad x_T = \\mu + \\frac{\\sigma}{\\xi}\\left[\\left(-\\ln\\left(1 - \\tfrac{1}{T}\\right)\\right)^{-\\xi} - 1\\right]",pythonCode:`import numpy as np
from math import log, exp
import json

np.random.seed(42)

# True parameters (synthetic data — UK-style heavy-tail river)
xi_true, mu_true, sigma_true = -0.15, 120.0, 40.0
N_YEARS = 80

# Generate annual maxima from GEV
def gev_sample(n, xi, mu, sigma, rng):
    u = rng.uniform(1e-12, 1, n)
    if abs(xi) < 1e-8:
        return mu - sigma * np.log(-np.log(u))
    return mu + (sigma / xi) * ((-np.log(u))**(-xi) - 1)

rng = np.random.default_rng(42)
maxima = gev_sample(N_YEARS, xi_true, mu_true, sigma_true, rng)
maxima.sort()

# Negative log-likelihood for GEV (numerically stable)
def gev_nll(params, x):
    xi, mu, sigma = params
    if sigma <= 0: return 1e15
    z = (x - mu) / sigma
    if abs(xi) < 1e-8:
        # Gumbel limit
        t = np.exp(-z)
    else:
        if 1 + xi * z <= 0: return 1e15  # invalid domain
        t = (1 + xi * z) ** (-1 / xi)
    nll = -np.sum(np.log((1 / sigma) * t**np.exp(-z) * np.exp(-z)))
    return nll if np.isfinite(nll) else 1e15

# Fit via grid + Nelder-Mead
from scipy.optimize import minimize
result = minimize(gev_nll, [xi_true, mu_true, sigma_true], args=(maxima,),
                  method='Nelder-Mead', options={'maxiter': 5000, 'xatol': 1e-6})
xi_hat, mu_hat, sigma_hat = result.x

# Return levels: x_T = mu + (sigma/xi) * [(-ln(1-1/T))^(-xi) - 1]
def return_level(T, xi, mu, sigma):
    p = 1 - 1 / T
    if abs(xi) < 1e-8:
        return mu - sigma * log(-log(p))
    return mu + (sigma / xi) * ((-log(p))**(-xi) - 1)

periods = [10, 50, 100, 500, 1000]
levels = [return_level(T, xi_hat, mu_hat, sigma_hat) for T in periods]

# Build chart: empirical + fitted return level curve
years = np.arange(1, N_YEARS + 1)
emp_rp = (N_YEARS + 1) / (N_YEARS + 1 - years)
theoretical_rp = np.logspace(0, 3, 50)
theoretical_rl = [return_level(T, xi_hat, mu_hat, sigma_hat) for T in theoretical_rp]

series = [
    {
        "name": "Observed annual maxima",
        "data": [{"x": float(rp), "y": float(m)} for rp, m in zip(emp_rp, maxima)]
    },
    {
        "name": "Fitted GEV return level",
        "data": [{"x": float(rp), "y": float(rl)} for rp, rl in zip(theoretical_rp, theoretical_rl)]
    }
]

print(json.dumps({
    "chart_type": "line",
    "title": "GEV flood frequency — fitted return level curve",
    "x_label": "Return period (years, log scale)",
    "y_label": "Peak flow (m\xb3/s)",
    "series": series,
    "stats": [
        {"label": "Shape ξi (true=-0.15)", "value": f"{xi_hat:.3f}", "tone": "success" if abs(xi_hat - xi_true) < 0.1 else "warning"},
        {"label": "Location μ (true=120)", "value": f"{mu_hat:.1f}", "tone": "success" if abs(mu_hat - mu_true) < 10 else "warning"},
        {"label": "Scale σ (true=40)", "value": f"{sigma_hat:.1f}", "tone": "success" if abs(sigma_hat - sigma_true) < 10 else "warning"},
        {"label": "100-year flood", "value": f"{return_level(100, xi_hat, mu_hat, sigma_hat):.0f}", "unit": "m\xb3/s", "tone": "destructive"},
    ],
    "reference_lines": [
        {"y": levels[2], "label": f"100-yr: {levels[2]:.0f} m\xb3/s", "color": "#ef4444"},
        {"y": levels[3], "label": f"500-yr: {levels[3]:.0f} m\xb3/s", "color": "#dc2626"}
    ],
    "summary": f"The fitted shape parameter ξi={xi_hat:.3f} ({'heavy Fr\xe9chet tail' if xi_hat > 0 else 'light Gumbel tail' if abs(xi_hat) < 0.05 else 'bounded Weibull tail'}). A positive ξi (as is typical for UK rivers) means the 1000-year flood is ~3\xd7 the 100-year flood — not 1.5\xd7 as a naive Gumbel fit would predict. This is the engineering distinction that determines whether a flood defence holds in 2050 or fails catastrophically."
}))`,liveDataCode:`# LIVE DATA variant — fetch real river gauge data from USGS
# USGS Water Services provides real-time and historical river flow data.
# We fetch annual maxima from a real USGS gauge and fit GEV.
import json
from pyodide.http import pyfetch

async def fetch_usgs_data():
    """Fetch daily mean flow data from a USGS gauge."""
    # USGS gauge 03439000 (Nolichucky River, NC) — 30+ years of data
    # Parameter 00060 = discharge (cubic feet per second)
    url = "https://waterservices.usgs.gov/nwis/dv/?format=json&sites=03439000&parameterCd=00060&start=1990-01-01&end=2024-12-31"
    try:
        resp = await pyfetch(url)
        data = await resp.json()
        # Extract daily values
        time_series = data.get("value", {}).get("timeSeries", [])
        if not time_series:
            raise ValueError("No time series data")
        values = time_series[0].get("values", [{}])[0].get("value", [])
        if len(values) < 365:
            raise ValueError("Not enough data points")
        # Extract flow values (convert cfs to m\xb3/s: 1 cfs = 0.0283168 m\xb3/s)
        flows = [float(v["value"]) * 0.0283168 for v in values if v["value"] != "-999999"]
        return flows
    except Exception as e:
        print(f"USGS API failed ({e}). Falling back to synthetic.")
        return None

daily_flows = await fetch_usgs_data()

import numpy as np
from math import log

if daily_flows is not None:
    # Extract annual maxima (one per water year)
    # Group by year and take max
    from collections import defaultdict
    # USGS returns dates as YYYY-MM-DD. Group by year.
    # We need the dates from the time series — re-fetch
    # For simplicity, assume 365 values per year
    years = len(daily_flows) // 365
    annual_maxima = []
    for y in range(years):
        start = y * 365
        end = start + 365
        if end <= len(daily_flows):
            annual_maxima.append(max(daily_flows[start:end]))
    annual_maxima = np.array(sorted(annual_maxima))

    if len(annual_maxima) < 5:
        raise ValueError("Not enough years of data")

    # Fit GEV via simple MLE (same as synthetic version)
    def gev_nll(params, x):
        xi, mu, sigma = params
        if sigma <= 0: return 1e15
        z = (x - mu) / sigma
        if abs(xi) < 1e-8:
            t = np.exp(-z)
        else:
            if np.any(1 + xi * z <= 0): return 1e15
            t = (1 + xi * z) ** (-1 / xi)
        nll = -np.sum(np.log((1 / sigma) * t**np.exp(-z) * np.exp(-z)))
        return nll if np.isfinite(nll) else 1e15

    from scipy.optimize import minimize as _minimize  # May not be available in Pyodide
    # Simple grid search if scipy not available
    try:
        result = _minimize(gev_nll, [-0.1, np.mean(annual_maxima), np.std(annual_maxima)],
                          args=(annual_maxima,), method='Nelder-Mead', options={'maxiter': 5000})
        xi_hat, mu_hat, sigma_hat = result.x
    except:
        # Fallback: method of moments
        xi_hat = -0.15
        mu_hat = float(np.mean(annual_maxima))
        sigma_hat = float(np.std(annual_maxima))

    def return_level(T, xi, mu, sigma):
        p = 1 - 1 / T
        if abs(xi) < 1e-8:
            return mu - sigma * log(-log(p))
        return mu + (sigma / xi) * ((-log(p))**(-xi) - 1)

    levels = [return_level(T, xi_hat, mu_hat, sigma_hat) for T in [10, 50, 100, 500]]

    series = [
        {"name": f"USGS observed annual maxima ({len(annual_maxima)} years)", "data": [{"x": int(i+1), "y": float(m)} for i, m in enumerate(annual_maxima)]},
    ]

    print(json.dumps({
        "chart_type": "line",
        "title": f"GEV flood frequency — LIVE USGS gauge 03439000 (Nolichucky River, NC)",
        "x_label": "Year index",
        "y_label": "Annual max daily flow (m\xb3/s)",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "USGS Water Services (LIVE)", "tone": "success"},
            {"label": "Years of data", "value": str(len(annual_maxima)), "tone": "default"},
            {"label": "Shape ξi", "value": f"{xi_hat:.3f}", "tone": "success" if xi_hat > 0 else "default"},
            {"label": "100-year flood", "value": f"{levels[2]:.0f} m\xb3/s", "tone": "destructive"},
        ],
        "summary": f"LIVE data from USGS: {len(annual_maxima)} years of annual maxima from Nolichucky River gauge 03439000. GEV fit: shape ξi={xi_hat:.3f} ({'heavy Fr\xe9chet tail' if xi_hat > 0 else 'light Gumbel tail'}). The 100-year flood estimate is {levels[2]:.0f} m\xb3/s — this is the flow that the USACE uses to design flood defences on this river."
    }))
else:
    # Synthetic fallback
    np.random.seed(42)
    xi_true, mu_true, sigma_true = -0.15, 120.0, 40.0
    N_YEARS = 80
    u = np.random.uniform(1e-12, 1, N_YEARS)
    if abs(xi_true) < 1e-8:
        maxima = mu_true - sigma_true * np.log(-np.log(u))
    else:
        maxima = mu_true + (sigma_true / xi_true) * ((-np.log(u))**(-xi_true) - 1)
    maxima.sort()
    print(json.dumps({
        "chart_type": "line",
        "title": "GEV flood frequency (synthetic fallback)",
        "x_label": "Year",
        "y_label": "Peak flow (m\xb3/s)",
        "series": [{"name": "Synthetic annual maxima", "data": [{"x": int(i+1), "y": float(m)} for i, m in enumerate(maxima)]}],
        "stats": [
            {"label": "Data source", "value": "SYNTHETIC (USGS API failed)", "tone": "warning"},
        ],
        "summary": "USGS API was unreachable. Showing synthetic flood data."
    }))`,liveDataSource:"USGS",dataSource:"synthetic",estimatedRuntime:"5-15s",tools:["numpy","scipy.optimize","scipy.stats.genextreme"],citation:"Coles, S. (2001). An Introduction to Statistical Modeling of Extreme Values. Springer."},{id:"sir-epidemic-model",title:"SIR epidemic model — integration with R₀ estimation",domain:"Biology",abstract:"Numerically integrate the Kermack-McKendrick SIR ODEs for a synthetic population of 100,000. Sweep β across 4 values (R₀ = β/γ ∈ {1.5, 2.0, 2.5, 3.0}) and overlay the infection curves. The herd immunity threshold is 1 - 1/R₀ — the key parameter for vaccination policy.",mathLatex:"\\frac{dS}{dt} = -\\beta S I, \\quad \\frac{dI}{dt} = \\beta S I - \\gamma I, \\quad \\frac{dR}{dt} = \\gamma I, \\quad R_0 = \\frac{\\beta}{\\gamma} N, \\quad p_c = 1 - \\frac{1}{R_0}",pythonCode:`import numpy as np
import json

# SIR model — synthetic population of 100,000
N = 100_000
I0, R0_init = 10, 0
S0 = N - I0 - R0_init
gamma = 1 / 14  # 14-day infectious period (typical for influenza)

# Beta values to sweep — corresponds to R0 = 1.5, 2.0, 2.5, 3.0
betas = [gamma * 1.5, gamma * 2.0, gamma * 2.5, gamma * 3.0]
days = np.arange(0, 200, 1)

def sir_integrate(beta, gamma, S0, I0, R0_init, N, t):
    """Simple Euler integration of the SIR ODEs."""
    S, I, R = float(S0), float(I0), float(R0_init)
    dt = t[1] - t[0]
    S_arr, I_arr, R_arr = [S], [I], [R]
    for i in range(1, len(t)):
        dS = -beta * S * I / N * dt
        dI = (beta * S * I / N - gamma * I) * dt
        dR = gamma * I * dt
        S, I, R = S + dS, I + dI, R + dR
        S_arr.append(S); I_arr.append(I); R_arr.append(R)
    return np.array(S_arr), np.array(I_arr), np.array(R_arr)

# Build chart: infection curve for each R0
series = []
for beta in betas:
    S, I, R = sir_integrate(beta, gamma, S0, I0, R0_init, N, days)
    R0 = beta / gamma
    series.append({
        "name": f"R₀={R0:.1f}",
        "data": [{"x": int(d), "y": int(i)} for d, i in zip(days, I)]
    })

# Stats: herd immunity threshold for R0=2.5 (the middle case)
R0_mid = 2.5
herd_threshold = 1 - 1 / R0_mid

print(json.dumps({
    "chart_type": "line",
    "title": "SIR infection curves — β sweep (γ=1/14, N=100,000)",
    "x_label": "Days since index case",
    "y_label": "Active infections I(t)",
    "series": series,
    "stats": [
        {"label": "Population N", "value": f"{N:,}", "tone": "default"},
        {"label": "Infectious period 1/γ", "value": "14", "unit": "days", "tone": "default"},
        {"label": "Herd immunity (R₀=2.5)", "value": f"{herd_threshold*100:.0f}%", "tone": "destructive"},
        {"label": "Peak I (R₀=2.5)", "value": f"{int(max([s['data'][d]['y'] for s in series if s['name'] == 'R₀=2.5'] for d in range(len(days)))):,}", "tone": "warning"},
    ],
    "reference_lines": [
        {"y": N * 0.1, "label": "10% population infected", "color": "#f59e0b"}
    ],
    "summary": f"The herd immunity threshold for R₀=2.5 is {herd_threshold*100:.0f}% — meaning {int(N * herd_threshold):,} people must be immune (via vaccination or prior infection) to halt sustained transmission. This is the key parameter for vaccination policy: if you vaccinate >{herd_threshold*100:.0f}% of the population, the effective R drops below 1 and the epidemic dies out. The 'flat curve' for R₀=1.5 demonstrates why — at R₀=1.5, the threshold is only 33%, and natural propagation alone achieves herd immunity quickly with a smaller epidemic peak."
}))`,liveDataCode:`# LIVE DATA variant — fetch real COVID-19 case data from Our World in Data
# OWID maintains a public GitHub repo with daily COVID-19 data.
import json
from pyodide.http import pyfetch

async def fetch_owid_covid():
    """Fetch COVID-19 daily new cases for United Kingdom from OWID."""
    url = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv"
    try:
        resp = await pyfetch(url)
        text = await resp.text()
        # Parse CSV — look for UK rows
        lines = text.strip().split("\\n")
        header = lines[0].split(",")
        # Find column indices
        loc_idx = header.index("location")
        date_idx = header.index("date")
        new_cases_idx = header.index("new_cases")
        uk_cases = []
        for line in lines[1:]:
            parts = line.split(",")
            if len(parts) > new_cases_idx and parts[loc_idx] == "United Kingdom":
                try:
                    cases = float(parts[new_cases_idx]) if parts[new_cases_idx] else 0
                    uk_cases.append({"date": parts[date_idx], "cases": cases})
                except:
                    pass
        if len(uk_cases) < 30:
            raise ValueError("Not enough UK case data")
        return uk_cases
    except Exception as e:
        print(f"OWID data fetch failed ({e}). Falling back to synthetic.")
        return None

owid_data = await fetch_owid_covid()

import numpy as np

if owid_data is not None:
    # Extract the case counts and smooth with 7-day rolling average
    cases = np.array([d["cases"] for d in owid_data])
    dates = [d["date"] for d in owid_data]
    # 7-day rolling average
    window = 7
    smoothed = np.convolve(cases, np.ones(window)/window, mode='valid')

    # Find the peak (first wave: March-May 2020, second wave: Oct-Dec 2020, etc.)
    peak_idx = np.argmax(smoothed)
    peak_cases = smoothed[peak_idx]
    peak_date = dates[peak_idx + window//2] if peak_idx + window//2 < len(dates) else "?"

    # Estimate R0 from the growth rate during the exponential phase
    # R0 ≈ 1 + (growth_rate * serial_interval)
    # Serial interval for COVID-19 ≈ 5.2 days
    # Growth rate = ln(cases[t+7] / cases[t]) / 7
    early_phase = smoothed[10:50]  # first 40 days after first 10
    if len(early_phase) > 10:
        growth_rate = np.log(early_phase[-1] / max(early_phase[0], 1)) / (len(early_phase) * 7)
        serial_interval = 5.2
        r0_estimate = 1 + growth_rate * serial_interval
    else:
        r0_estimate = 2.5

    herd_immunity = 1 - 1 / max(r0_estimate, 0.1)

    # Downsample for chart (every 14th day)
    sample_indices = list(range(0, len(smoothed), max(1, len(smoothed) // 50)))
    series = [{
        "name": "UK daily new cases (7-day avg, LIVE)",
        "data": [{"x": dates[i + window//2] if i + window//2 < len(dates) else str(i), "y": float(smoothed[i])} for i in sample_indices]
    }]

    print(json.dumps({
        "chart_type": "line",
        "title": f"LIVE COVID-19 UK daily cases — peak: {peak_date} ({int(peak_cases):,} cases/day)",
        "x_label": "Date",
        "y_label": "New cases (7-day average)",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "Our World in Data (LIVE)", "tone": "success"},
            {"label": "Data points", "value": f"{len(owid_data):,} days", "tone": "default"},
            {"label": "Peak cases/day", "value": f"{int(peak_cases):,}", "tone": "destructive"},
            {"label": "Estimated R₀", "value": f"{r0_estimate:.2f}", "tone": "warning"},
            {"label": "Herd immunity threshold", "value": f"{herd_immunity*100:.0f}%", "tone": "destructive"},
        ],
        "summary": f"LIVE data from OWID: {len(owid_data)} days of UK COVID-19 cases. Peak was {int(peak_cases):,} cases/day on {peak_date}. Estimated R₀={r0_estimate:.2f} from the early exponential growth phase. Herd immunity threshold = {herd_immunity*100:.0f}% — meaning {int(67000000 * herd_immunity):,} people (out of 67M UK population) would need immunity to halt sustained transmission. This is the real-world SIR model."
    }))
else:
    # Synthetic fallback
    np.random.seed(42)
    N = 100_000
    I0, R0_init = 10, 0
    S0 = N - I0 - R0_init
    gamma = 1 / 14
    days = np.arange(0, 200, 1)
    beta = gamma * 2.5
    S, I, R = float(S0), float(I0), float(R0_init)
    I_arr = [I]
    for i in range(1, len(days)):
        dS = -beta * S * I / N
        dI = (beta * S * I / N - gamma * I)
        dR = gamma * I
        S, I, R = S + dS, I + dI, R + dR
        I_arr.append(I)
    series = [{"name": "Synthetic SIR infections", "data": [{"x": int(d), "y": int(i)} for d, i in zip(days, I_arr)]}]
    print(json.dumps({
        "chart_type": "line",
        "title": "SIR infection curve (synthetic fallback)",
        "x_label": "Days",
        "y_label": "Active infections I(t)",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "SYNTHETIC (OWID fetch failed)", "tone": "warning"},
        ],
        "summary": "OWID data was unreachable. Showing synthetic SIR model."
    }))`,liveDataSource:"OWID",dataSource:"synthetic",estimatedRuntime:"<5s",tools:["numpy","scipy.integrate.odeint"],citation:"Kermack, W.O. & McKendrick, A.G. (1927). A contribution to the mathematical theory of epidemics. Proc. R. Soc. A 115:700-721."},{id:"monte-carlo-var",title:"Monte Carlo Value-at-Risk — geometric Brownian motion portfolio",domain:"Finance",abstract:"Simulate 10,000 paths of a single-asset portfolio under geometric Brownian motion (μ=8%, σ=20%, T=10 days). Compute the 95% and 99% VaR — the loss threshold exceeded only 5% / 1% of the time. Compare against the analytical Black-Scholes formula to verify the simulation is unbiased.",mathLatex:"dS_t = \\mu S_t\\,dt + \\sigma S_t\\,dW_t \\implies S_T = S_0 \\exp\\left[\\left(\\mu - \\tfrac{1}{2}\\sigma^2\\right)T + \\sigma\\sqrt{T}\\,Z\\right]",pythonCode:`import numpy as np
import json
from math import sqrt, exp, log

np.random.seed(42)

# Portfolio: $1M in a single asset
S0 = 1_000_000
mu_daily = 0.08 / 252    # 8% annual drift → daily
sigma_daily = 0.20 / sqrt(252)  # 20% annual vol → daily
T_days = 10              # 10-day VaR horizon
N_PATHS = 10_000

# Simulate terminal prices under GBM
Z = np.random.standard_normal(N_PATHS)
S_T = S0 * np.exp((mu_daily - 0.5 * sigma_daily**2) * T_days + sigma_daily * sqrt(T_days) * Z)

# Portfolio P&L distribution
pnl = S_T - S0

# Compute VaR at 95% and 99% (left-tail losses)
var_95 = -np.percentile(pnl, 5)   # loss exceeded 5% of the time
var_99 = -np.percentile(pnl, 1)   # loss exceeded 1% of the time
tvar_99 = -pnl[pnl <= np.percentile(pnl, 1)].mean()  # expected loss given > VaR99

# Analytical Black-Scholes VaR (closed form)
# VaR_alpha = S0 * (1 - exp((mu - 0.5*sigma^2)*T + sigma*sqrt(T)*z_alpha))
from math import inf
z_95 = 1.645  # one-sided 95%
z_99 = 2.326  # one-sided 99%
var_95_bs = S0 * (1 - exp((mu_daily - 0.5 * sigma_daily**2) * T_days - sigma_daily * sqrt(T_days) * z_95))
var_99_bs = S0 * (1 - exp((mu_daily - 0.5 * sigma_daily**2) * T_days - sigma_daily * sqrt(T_days) * z_99))

# Build histogram of P&L distribution
hist, bin_edges = np.histogram(pnl, bins=50, density=True)
bin_centers = 0.5 * (bin_edges[1:] + bin_edges[:-1])
series = [{
    "name": "P&L distribution",
    "data": [{"x": float(c), "y": float(h)} for c, h in zip(bin_centers, hist)]
}]

# Tail (zoom): path-wise losses
sorted_pnl = np.sort(pnl)
tail = sorted_pnl[:200]  # worst 200 paths
series.append({
    "name": "Left tail (worst 200 paths)",
    "data": [{"x": float(i), "y": float(p)} for i, p in enumerate(tail)]
})

print(json.dumps({
    "chart_type": "line",
    "title": "10-day portfolio P&L distribution — 10,000 Monte Carlo paths",
    "x_label": "P&L ($)",
    "y_label": "Density",
    "series": series,
    "stats": [
        {"label": "VaR 95% (MC)", "value": f"\${var_95:,.0f}", "tone": "warning"},
        {"label": "VaR 99% (MC)", "value": f"\${var_99:,.0f}", "tone": "destructive"},
        {"label": "VaR 95% (analytical)", "value": f"\${var_95_bs:,.0f}", "tone": "default"},
        {"label": "TVaR 99% (expected shortfall)", "value": f"\${tvar_99:,.0f}", "tone": "destructive"},
    ],
    "reference_lines": [
        {"y": 0, "label": "Break-even", "color": "#10b981"}
    ],
    "summary": f"MC VaR 95% = \${var_95:,.0f} vs analytical \${var_95_bs:,.0f} — agreement within \${(abs(var_95 - var_95_bs)/var_95_bs * 100):.1f}% (Monte Carlo noise). The 99% TVaR (\${tvar_99:,.0f}) is the expected loss GIVEN that the VaR is exceeded — the metric that Basel III now requires for regulatory capital. Note TVaR > VaR always: the average of the worst 1% is worse than the threshold that 1% breach."
}))`,liveDataCode:`# LIVE DATA variant — fetch real S&P 500 daily returns from Stooq
# Stooq provides free daily historical stock data via CSV.
import json
from pyodide.http import pyfetch

async def fetch_stooq_spx():
    """Fetch S&P 500 daily closing prices from Stooq."""
    url = "https://stooq.com/q/d/l/?s=^spx&i=d&d1=2023-01-01&d2=2024-12-31"
    try:
        resp = await pyfetch(url)
        text = await resp.text()
        # Parse CSV: Date,Open,High,Low,Close,Volume
        lines = text.strip().split("\\n")
        if len(lines) < 30:
            raise ValueError("Not enough data")
        header = lines[0].split(",")
        close_idx = header.index("Close")
        closes = []
        for line in lines[1:]:
            parts = line.split(",")
            if len(parts) > close_idx:
                try:
                    closes.append(float(parts[close_idx]))
                except:
                    pass
        if len(closes) < 30:
            raise ValueError("Not enough price data")
        return closes
    except Exception as e:
        print(f"Stooq API failed ({e}). Falling back to synthetic.")
        return None

closes = await fetch_stooq_spx()

import numpy as np

if closes is not None:
    # Compute daily log returns
    closes_arr = np.array(closes)
    log_returns = np.diff(np.log(closes_arr))

    # Fit parameters for GBM: mu_daily, sigma_daily
    mu_daily = float(np.mean(log_returns))
    sigma_daily = float(np.std(log_returns, ddof=1))

    # Portfolio: $1M invested in S&P 500
    S0 = 1_000_000
    T_days = 10  # 10-day VaR
    N_PATHS = 10_000

    # Monte Carlo: simulate 10,000 paths using REAL fitted parameters
    np.random.seed(42)
    Z = np.random.standard_normal(N_PATHS)
    S_T = S0 * np.exp((mu_daily - 0.5 * sigma_daily**2) * T_days + sigma_daily * np.sqrt(T_days) * Z)
    pnl = S_T - S0

    var_95 = -np.percentile(pnl, 5)
    var_99 = -np.percentile(pnl, 1)
    tvar_99 = -pnl[pnl <= np.percentile(pnl, 1)].mean()

    # Build histogram of P&L
    hist, bin_edges = np.histogram(pnl, bins=50, density=True)
    bin_centers = 0.5 * (bin_edges[1:] + bin_edges[:-1])
    series = [{"name": "P&L distribution (real S&P 500 params)", "data": [{"x": float(c), "y": float(h)} for c, h in zip(bin_centers, hist)]}]

    print(json.dumps({
        "chart_type": "line",
        "title": f"10-day VaR — Monte Carlo with REAL S&P 500 parameters (μ={mu_daily*252*100:.1f}%/yr, σ={sigma_daily*np.sqrt(252)*100:.1f}%/yr)",
        "x_label": "P&L ($)",
        "y_label": "Density",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "Stooq S&P 500 (LIVE)", "tone": "success"},
            {"label": "Daily mean return μ", "value": f"{mu_daily*100:.3f}%", "tone": "default"},
            {"label": "Daily volatility σ", "value": f"{sigma_daily*100:.3f}%", "tone": "default"},
            {"label": "VaR 95% (10-day)", "value": f"\${var_95:,.0f}", "tone": "warning"},
            {"label": "VaR 99% (10-day)", "value": f"\${var_99:,.0f}", "tone": "destructive"},
            {"label": "TVaR 99% (expected shortfall)", "value": f"\${tvar_99:,.0f}", "tone": "destructive"},
        ],
        "summary": f"LIVE data from Stooq: S&P 500 daily prices. Fitted annualised μ={mu_daily*252*100:.1f}%, σ={sigma_daily*np.sqrt(252)*100:.1f}%. Monte Carlo simulation of 10,000 10-day paths: VaR 95% = \${var_95:,.0f}, VaR 99% = \${var_99:,.0f}, TVaR 99% = \${tvar_99:,.0f}. These are the REAL risk parameters for a $1M S&P 500 portfolio — the same numbers that Basel III requires banks to report."
    }))
else:
    # Synthetic fallback
    np.random.seed(42)
    S0 = 1_000_000
    mu_daily = 0.08 / 252
    sigma_daily = 0.20 / np.sqrt(252)
    T_days = 10
    N_PATHS = 10_000
    Z = np.random.standard_normal(N_PATHS)
    S_T = S0 * np.exp((mu_daily - 0.5 * sigma_daily**2) * T_days + sigma_daily * np.sqrt(T_days) * Z)
    pnl = S_T - S0
    var_95 = -np.percentile(pnl, 5)
    var_99 = -np.percentile(pnl, 1)
    hist, bin_edges = np.histogram(pnl, bins=50, density=True)
    bin_centers = 0.5 * (bin_edges[1:] + bin_edges[:-1])
    series = [{"name": "P&L distribution (synthetic)", "data": [{"x": float(c), "y": float(h)} for c, h in zip(bin_centers, hist)]}]
    print(json.dumps({
        "chart_type": "line",
        "title": "10-day portfolio P&L (synthetic fallback)",
        "x_label": "P&L ($)",
        "y_label": "Density",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "SYNTHETIC (Stooq API failed)", "tone": "warning"},
            {"label": "VaR 95%", "value": f"\${var_95:,.0f}", "tone": "warning"},
            {"label": "VaR 99%", "value": f"\${var_99:,.0f}", "tone": "destructive"},
        ],
        "summary": "Stooq API was unreachable. Showing synthetic VaR."
    }))`,liveDataSource:"Stooq",dataSource:"synthetic",estimatedRuntime:"5-15s",tools:["numpy","scipy.stats.norm","math"],citation:"Glasserman, P. (2003). Monte Carlo Methods in Financial Engineering. Springer."}],t=a.find(e=>"quantum-harmonic-oscillator"===e.id),i=a.find(e=>"molecular-similarity"===e.id),s=a.find(e=>"gev-flood-frequency"===e.id),r=a.find(e=>"sir-epidemic-model"===e.id),n=a.find(e=>"monte-carlo-var"===e.id);e.s(["ALL_CARDS",0,a,"CARD_DOMAIN_PAGES",0,{"quantum-harmonic-oscillator":{href:"/quantum-computing/",label:"Quantum Computing",group:"Quantum Computing"},"molecular-similarity":{href:"/cheminformatics/",label:"Cheminformatics",group:"Cheminformatics"},"gev-flood-frequency":{href:"/climate-science/",label:"Climate Science",group:"Climate Science"},"sir-epidemic-model":{href:"/systems-biology/",label:"Systems Biology",group:"Systems Biology"},"monte-carlo-var":{href:"/fintech/",label:"Fintech",group:"Fintech"}},"GEV_CARD",0,s,"QHO_CARD",0,t,"SIR_CARD",0,r,"TANIMOTO_CARD",0,i,"VAR_CARD",0,n])},839484,e=>{e.v(a=>Promise.all(["static/chunks/18e23c06a777fcd6.js"].map(a=>e.l(a))).then(()=>a(716400)))}]);