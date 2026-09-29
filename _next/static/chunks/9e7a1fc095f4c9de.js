(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var t=e.i(843476),r=e.i(271645),i=e.i(487486),a=e.i(519455),n=e.i(716675),s=e.i(194058),o=e.i(862824),d=e.i(344396),l=e.i(178583),c=e.i(778917),p=e.i(283086),h=e.i(972520),u=e.i(217923),m=e.i(522016),f=e.i(901752);function g({pageId:e}){let r=(0,d.researchForPage)(e);return 0===r.length?null:(0,t.jsxs)(o.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,t.jsx)(l.FileText,{className:"h-5 w-5"}),badge:`${r.length} paper${1===r.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[r.map((e,r)=>(0,t.jsx)(x,{entry:e},r)),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[r.length," paper",1===r.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function x({entry:e}){let[o,d]=(0,r.useState)(!1),[l,g]=(0,r.useState)(null);return(0,t.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,t.jsx)(i.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,t.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,t.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,t.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,t.jsxs)(a.Button,{variant:"outline",size:"sm",onClick:()=>d(!o),className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(p.Sparkles,{className:"h-3 w-3"}),o?"Hide expected code":"Show expected code + visualization"]}),o&&(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(n.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let t=e.indexOf("{"),r=e.lastIndexOf("}");if(t>=0&&r>t){let i=e.substring(t,r+1);g(JSON.parse(i))}}catch{}},hideTextOutput:!!l,compact:!0}),l?(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(u.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,t.jsx)(s.AnalysisChart,{data:l,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,t.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,t.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,t.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,t.jsxs)(m.default,{href:(0,f.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,t.jsx)(h.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>g])},870078,e=>{"use strict";var t=e.i(843476),r=e.i(522016),i=e.i(862824),a=e.i(342046),n=e.i(921371),s=e.i(580296),o=e.i(122836),d=e.i(716675),l=e.i(901752),c=e.i(487486),p=e.i(21218),h=e.i(852008),u=e.i(581418),m=e.i(868054),f=e.i(332017);let g=[{label:"Drift types",value:"3",hint:"Data drift · Concept drift · Prediction drift",deltaTone:"flat"},{label:"Detection tool",value:"Evidently",hint:"OSS, statistical tests, drift reports",deltaTone:"flat"},{label:"Retraining trigger",value:"Auto",hint:"PSI > 0.2 → trigger CI/CD retraining pipeline",deltaTone:"flat"},{label:"Monitoring latency",value:"Real-time",hint:"Live dashboards via Datadog + Evidently",deltaTone:"flat"}];function x(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(i.PageHeader,{eyebrow:"MLOps · monitoring",title:"Model Monitoring — Drift Detection",description:"Models degrade in production. Data drift (input distribution changes), concept drift (the relationship between input and output changes), and prediction drift (output distribution changes) all signal that a model needs retraining. Evidently (OSS) + NannyML detect drift automatically; retraining triggers fire via CI/CD.",right:(0,t.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(p.Activity,{className:"h-3 w-3"})," Evidently"]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:g.map(e=>(0,t.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(i.SectionCard,{title:"The 3 types of drift",icon:(0,t.jsx)(h.Layers,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1",children:"Data Drift"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"Input feature distribution changes. E.g. average customer LTV shifts from £1,200 to £1,800 after a marketing campaign targets higher-value segments. The model was trained on £1,200 — it's now out of calibration."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-rose-500/40 bg-rose-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-rose-600 dark:text-rose-400 mb-1",children:"Concept Drift"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"The relationship between input and output changes. E.g. COVID shifted buying patterns — models trained on pre-COVID data predicted poorly. The world changed; the model didn't."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/40 bg-violet-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-violet-600 dark:text-violet-400 mb-1",children:"Prediction Drift"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"Output distribution changes. E.g. a churn model that used to predict 10% churn rate now predicts 25%. Either the model degraded or the population shifted. Either way: investigate."})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Evidently — drift detection (OSS)",icon:(0,t.jsx)(u.ShieldCheck,{className:"h-5 w-5"}),children:(0,t.jsx)(o.CodeBlock,{language:"python",filename:"drift_monitor.py",highlight:[5,6,7,8,9,10,13,14,15,18,19,20],code:`import pandas as pd
from evidently.report import Report
from evidently.metric_preset import DataDriftPreset, TargetDriftPreset

# Reference (training data) + Current (production data)
reference = pd.read_parquet("s3://gold/ml/features_train_v3.parquet")
current   = pd.read_parquet("s3://gold/ml/features_current.parquet")

# Generate drift report — statistical tests (KS, PSI, Wasserstein)
report = Report(metrics=[
    DataDriftPreset(),     # input feature drift
    TargetDriftPreset(),   # output/prediction drift
])
report.run(reference_data=reference, current_data=current)
report.save_html("drift_report.html")

# PSI (Population Stability Index) — the key metric
# PSI < 0.1: no drift. 0.1-0.2: minor. > 0.2: significant drift
# PSI > 0.2 → trigger retraining via CI/CD (GitHub Actions)

# Automated retraining trigger
if psi_score > 0.2:
    # Trigger Airflow DAG → retrain on latest data
    airflow.trigger_dag("retrain_revenue_predictor",
        conf={"reason": f"PSI={psi_score:.3f} > 0.2"})`})}),(0,t.jsx)(i.SectionCard,{title:"Try it: Drift detection simulation (Pyodide)",icon:(0,t.jsx)(m.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:`# Drift detection — PSI (Population Stability Index) simulation
# Shows how to detect when production data has drifted from training data

import math

def compute_psi(reference, current, buckets=10):
    "PSI < 0.1 = stable, 0.1-0.2 = minor drift, > 0.2 = significant"
    # Bin reference into buckets
    edges = [min(reference)] + [
        reference[int(len(reference) * i / buckets)] for i in range(1, buckets)
    ] + [max(reference) + 1]
    
    ref_counts = [0] * buckets
    cur_counts = [0] * buckets
    for v in reference:
        for i in range(buckets):
            if edges[i] <= v < edges[i+1]:
                ref_counts[i] += 1; break
    for v in current:
        for i in range(buckets):
            if edges[i] <= v < edges[i+1]:
                cur_counts[i] += 1; break
    
    # Normalise to proportions
    ref_prop = [max(c / len(reference), 0.001) for c in ref_counts]
    cur_prop = [max(c / len(current), 0.001) for c in cur_counts]
    
    # PSI = sum((cur - ref) * ln(cur/ref))
    psi = sum((c - r) * math.log(c / r) for r, c in zip(ref_prop, cur_prop))
    return psi

# Training data (reference) — customer LTV ~ \xa31,200 mean
import random
random.seed(42)
reference = [random.gauss(1200, 300) for _ in range(1000)]

# Scenario 1: no drift (similar distribution)
current_stable = [random.gauss(1210, 305) for _ in range(500)]

# Scenario 2: significant drift (mean shifted to \xa31,800)
current_drifted = [random.gauss(1800, 400) for _ in range(500)]

psi_stable = compute_psi(reference, current_stable)
psi_drifted = compute_psi(reference, current_drifted)

print("=" * 60)
print("Model Monitoring — Drift Detection (PSI)")
print("=" * 60)
print(f"\\nReference (training): mean=\xa3{sum(reference)/len(reference):.0f}, n={len(reference)}")
print(f"Current (stable):    mean=\xa3{sum(current_stable)/len(current_stable):.0f}, n={len(current_stable)}")
print(f"Current (drifted):   mean=\xa3{sum(current_drifted)/len(current_drifted):.0f}, n={len(current_drifted)}")

print(f"\\n{'=' * 60}")
print("PSI SCORES:")
print(f"  Stable scenario:  PSI = {psi_stable:.4f}  → {'✓ No drift' if psi_stable < 0.1 else '⚠ Minor drift' if psi_stable < 0.2 else '✗ SIGNIFICANT DRIFT'}")
print(f"  Drifted scenario: PSI = {psi_drifted:.4f} → {'✓ No drift' if psi_drifted < 0.1 else '⚠ Minor drift' if psi_drifted < 0.2 else '✗ SIGNIFICANT DRIFT — RETRAIN!'}")

print(f"\\n{'=' * 60}")
print("RETRAINING TRIGGER:")
if psi_drifted > 0.2:
    print("  ✗ PSI > 0.2 → triggering Airflow DAG 'retrain_revenue_predictor'")
    print("  → dbt build --select state:modified+ (re-compute features)")
    print("  → MLflow: start_run → train → log_metric → register")
    print("  → MLflow: transition to Staging → A/B test → Production")
else:
    print("  ✓ PSI < 0.2 → no retraining needed. Model is stable.")
print("=" * 60)`,buttonLabel:"Run drift detection (Pyodide)"})}),(0,t.jsxs)(f.DeeperThoughtSection,{pageTitle:"Model Monitoring",children:[(0,t.jsx)(f.DeeperThought,{title:"Model Monitoring IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Model Monitoring is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Model Monitoring connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Model Monitoring sits in the computational-science landscape."})}),(0,t.jsx)(f.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Model Monitoring) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(f.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(f.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(f.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(n.ResearchDemo,{pageId:"model-monitoring"}),(0,t.jsx)(s.TrendAnticipation,{pageId:"model-monitoring"}),(0,t.jsx)(a.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"model-registry",reason:"Continue to model registry — see also from this page"},{id:"ml-platform",reason:"Continue to ml platform — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(r.default,{href:(0,l.hrefFor)("model-registry"),className:"text-sm text-primary hover:underline",children:"→ Model Registry"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,l.hrefFor)("ml-platform"),className:"text-sm text-primary hover:underline",children:"→ ML Platform"})]})]})}e.s(["ModelMonitoringPage",()=>x])}]);