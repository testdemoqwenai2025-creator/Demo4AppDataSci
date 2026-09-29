(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,811149,e=>{"use strict";var t=e.i(843476),a=e.i(522016),i=e.i(271645),r=e.i(846932),s=e.i(862824),n=e.i(342046),o=e.i(921371),l=e.i(580296),d=e.i(716675),c=e.i(59938),m=e.i(158960),p=e.i(366140),u=e.i(901752),h=e.i(487486),f=e.i(332017),g=e.i(461189),x=e.i(966992),y=e.i(658041),b=e.i(828579),v=e.i(21218),_=e.i(283086),w=e.i(227516),j=e.i(691385),M=e.i(178583),N=e.i(25652),S=e.i(618393),L=e.i(455711);let k=[{label:"Origin",value:"Databricks 2018",hint:"Created by Databricks to standardise ML lifecycle management — tracking, registry, recipes, deployments",deltaTone:"flat"},{label:"Adoption",value:"10M+ installs",hint:"Most-installed ML lifecycle tool — used by every major enterprise ML team",deltaTone:"up"},{label:"Components",value:"4 (Tracking+Registry+Recipes+Deploy)",hint:"Tracking (experiments), Registry (models), Recipes (training templates), Deployments (serving)",deltaTone:"flat"},{label:"Model stages",value:"4 (None/Staging/Production/Archived)",hint:"Versioned lifecycle: develop → stage → deploy → archive with full audit trail",deltaTone:"up"}],D=`# ============================================================
# MLflow Mathematical Foundations — Bias-Variance, AUC-ROC, Bayesian HPO
# ============================================================

import math
import random

# --- 1. Bias-Variance Decomposition ---
# E[(y - f_hat(x))^2] = Bias^2[f_hat] + Var[f_hat] + sigma^2
# Where:
#   Bias^2 = (E[f_hat(x)] - f(x))^2  (systematic deviation from true function)
#   Var     = E[(f_hat(x) - E[f_hat(x)])^2]  (sensitivity to training data)
#   sigma^2 = irreducible noise  (E[epsilon^2])

def bias_variance_decomposition(n_train=50, n_trials=100, true_func=None, sigma=0.3):
    """Decompose MSE into bias\xb2 + variance + noise."""
    if true_func is None:
        true_func = lambda x: math.sin(x)

    bias_sq_sum = 0
    var_sum = 0
    predictions = {x: [] for x in [i * 0.1 for i in range(100)]}

    for _ in range(n_trials):
        # Train on random sample
        X_train = [random.uniform(0, 10) for _ in range(n_train)]
        y_train = [true_func(x) + random.gauss(0, sigma) for x in X_train]

        # Simple model: polynomial degree 1 (high bias, low variance)
        # vs degree 15 (low bias, high variance)
        for x_test in predictions:
            # Predict (simplified: nearest neighbor average)
            k = 3
            dists = sorted(zip(X_train, y_train), key=lambda p: abs(p[0] - x_test))[:k]
            pred = sum(y for _, y in dists) / k
            predictions[x_test].append(pred)

    for x, preds in predictions.items():
        mean_pred = sum(preds) / len(preds)
        bias_sq = (mean_pred - true_func(x)) ** 2
        variance = sum((p - mean_pred) ** 2 for p in preds) / len(preds)
        bias_sq_sum += bias_sq
        var_sum += variance

    n = len(predictions)
    bias = math.sqrt(bias_sq_sum / n)
    var = var_sum / n
    return bias, var, sigma ** 2

bias, var, noise = bias_variance_decomposition()
print("=== Bias-Variance Decomposition ===")
print(f"  Bias (systematic error):   {bias:.4f}")
print(f"  Variance (data sensitivity): {var:.4f}")
print(f"  Noise (irreducible):       {noise:.4f}")
print(f"  Total MSE = {bias**2:.4f} + {var:.4f} + {noise:.4f} = {bias**2 + var + noise:.4f}")
print()

# --- 2. AUC-ROC ---
# TPR = TP / (TP + FN)  (True Positive Rate / Recall / Sensitivity)
# FPR = FP / (FP + TN)  (False Positive Rate / 1 - Specificity)
# AUC = integral_0^1 TPR(FPR) d(FPR)  (area under ROC curve)
# AUC = 0.5 = random, AUC = 1.0 = perfect, AUC < 0.5 = worse than random

def compute_auc_roc(y_true, y_scores):
    """Compute AUC-ROC via the trapezoidal rule."""
    # Sort by score (descending)
    pairs = sorted(zip(y_scores, y_true), reverse=True)
    n_pos = sum(1 for _, y in pairs if y == 1)
    n_neg = len(pairs) - n_pos
    if n_pos == 0 or n_neg == 0:
        return 0.5  # undefined

    # Count ROC curve points
    tp = fp = 0
    prev_tpr = prev_fpr = 0.0
    auc = 0.0
    prev_score = float('inf')
    for score, y in pairs:
        if score != prev_score:
            tpr = tp / n_pos
            fpr = fp / n_neg
            auc += (fpr - prev_fpr) * (tpr + prev_tpr) / 2  # trapezoidal
            prev_tpr, prev_fpr = tpr, fpr
            prev_score = score
        if y == 1:
            tp += 1
        else:
            fp += 1

    tpr = tp / n_pos
    fpr = fp / n_neg
    auc += (fpr - prev_fpr) * (tpr + prev_tpr) / 2  # final trapezoid
    return auc

random.seed(42)
y_true = [random.choices([0, 1], weights=[70, 30])[0] for _ in range(200)]
y_scores = [random.uniform(0, 1) + (0.3 if y == 1 else 0) for y in y_true]
auc = compute_auc_roc(y_true, y_scores)
print(f"=== AUC-ROC ===")
print(f"  AUC = {auc:.4f}  (1.0 = perfect, 0.5 = random)")
print(f"  Interpretation: {'good' if auc > 0.7 else 'fair' if auc > 0.6 else 'poor'} classifier")
print()

# --- 3. Bayesian Hyperparameter Optimization ---
# Surrogate model: Gaussian Process p(f|D) where D = {(x_i, f(x_i))}
# Acquisition function: Expected Improvement
#   EI(x) = E[max(f(x) - f*, 0)]
#         = (mu(x) - f*) * Phi(Z) + sigma(x) * phi(Z)
#   where Z = (mu(x) - f*) / sigma(x)
#         Phi = standard normal CDF, phi = standard normal PDF
#         f* = best observed value so far

def expected_improvement(mu, sigma, f_best, xi=0.01):
    """Compute Expected Improvement for Bayesian HPO."""
    if sigma <= 0:
        return 0.0
    z = (mu - f_best - xi) / sigma
    # Normal CDF (via erf) and PDF
    phi_z = math.exp(-0.5 * z * z) / math.sqrt(2 * math.pi)  # PDF
    Phi_z = 0.5 * (1 + math.erf(z / math.sqrt(2)))  # CDF
    ei = (mu - f_best - xi) * Phi_z + sigma * phi_z
    return max(ei, 0)

print(f"=== Bayesian HPO — Expected Improvement ===")
print(f"  EI(x) = (mu - f* - xi) * Phi(Z) + sigma * phi(Z)")
print(f"  where Z = (mu - f*) / sigma")
print(f"  f* = best observed, xi = exploration bonus")
print()
for mu, sigma in [(0.8, 0.1), (0.5, 0.3), (0.3, 0.5), (0.9, 0.02)]:
    ei = expected_improvement(mu, sigma, f_best=0.85)
    print(f"  mu={mu:.1f}, sigma={sigma:.1f} -> EI={ei:.4f} {'(explore)' if ei > 0.05 else '(exploit)'})")
print()
print("High sigma + low mu = high EI (exploration)")
print("High mu + low sigma = low EI (exploitation)")
print("This is how MLflow + Hyperopt pick the next hyperparameter trial.")`,T=`# ============================================================
# MLflow Experiment Tracking Simulation — in-browser (Pyodide)
# Track 5 model variants, compare metrics, pick best
# ============================================================

import math
import random

class MLflowRun:
    """Simulate an MLflow run — metrics, params, artifacts."""
    def __init__(self, run_id, model_name, params, metrics):
        self.run_id = run_id
        self.model_name = model_name
        self.params = params  # dict of hyperparams
        self.metrics = metrics  # dict of metrics (auc, f1, etc.)
        self.status = "FINISHED"

class MLflowExperiment:
    """Simulate an MLflow experiment — collection of runs."""
    def __init__(self, name):
        self.name = name
        self.runs = []
        self.next_run_id = 0

    def log_run(self, model_name, params, metrics):
        run = MLflowRun(self.next_run_id, model_name, params, metrics)
        self.runs.append(run)
        self.next_run_id += 1
        print(f"  Run {run.run_id}: {model_name} | "
              f"params={params} | "
              f"auc={metrics.get('auc', 'N/A'):.4f} | "
              f"f1={metrics.get('f1', 'N/A'):.4f}")
        return run

    def best_run(self, metric="auc"):
        return max(self.runs, key=lambda r: r.metrics.get(metric, 0))

    def search_runs(self, filter_fn=None):
        if filter_fn:
            return [r for r in self.runs if filter_fn(r)]
        return self.runs

# --- Simulate 5 model variants for genomics variant calling ---
print("=== MLflow Experiment: genomics_variant_calling ===")
print()
exp = MLflowExperiment("genomics_variant_calling")

random.seed(42)
models = [
    ("GATK_HaplotypeCaller", {"min_confidence": 10, "stand_call_conf": 30}, {"auc": 0.92, "f1": 0.88, "precision": 0.90, "recall": 0.86}),
    ("DeepVariant", {"model_type": "cnn", "batch_size": 512}, {"auc": 0.95, "f1": 0.92, "precision": 0.94, "recall": 0.90}),
    ("Strelka2", {"min_qscore": 20, "min_depth": 10}, {"auc": 0.89, "f1": 0.85, "precision": 0.91, "recall": 0.80}),
    ("VarDict", {"min_allele_freq": 0.05, "max_mm": 3}, {"auc": 0.87, "f1": 0.82, "precision": 0.88, "recall": 0.77}),
    ("FreeBayes", {"min_alt_count": 3, "min_freq": 0.2}, {"auc": 0.85, "f1": 0.80, "precision": 0.86, "recall": 0.75}),
]

for name, params, metrics in models:
    exp.log_run(name, params, metrics)

print()
best = exp.best_run("auc")
print(f"Best run: Run {best.run_id} ({best.model_name}) — AUC={best.metrics['auc']:.4f}")
print()

# --- Model Registry simulation ---
print("=== MLflow Model Registry ===")
stages = ["None", "Staging", "Production", "Archived"]
print(f"  Registered model: genomics_variant_caller")
print(f"  Version 1: GATK_HaplotypeCaller   -> Archived (AUC=0.92)")
print(f"  Version 2: DeepVariant             -> Production (AUC=0.95) <-- current best")
print(f"  Version 3: Strelka2                -> Staging (AUC=0.89, under review)")
print()
print("  Transition: Version 2 None -> Staging -> Production")
print("  Audit: who approved, when, for what reason")
print()

# --- Bias-variance check across model versions ---
print("=== Bias-Variance Analysis Across Versions ===")
print(f"  {'Model':<25} | {'Bias':>8} | {'Variance':>9} | {'AUC':>6}")
print("-" * 55)
for name, params, metrics in models:
    # Estimate bias and variance from precision/recall
    bias = 1 - metrics["precision"]  # high precision = low bias
    var = 1 - metrics["recall"]  # high recall = low variance
    print(f"  {name:<25} | {bias:>8.2f} | {var:>9.2f} | {metrics['auc']:>6.2f}")
print()
print("DeepVariant has lowest bias (precision=0.94) AND lowest variance (recall=0.90)")
print("→ Best generalization — chosen for Production stage in Model Registry")`;function A(){let[e,a]=(0,i.useState)("tracking"),s={tracking:{label:"MLflow Tracking",desc:"Log experiments: runs, metrics, params, artifacts, models. Backend store: file/SQL/REST.",level:0},registry:{label:"Model Registry",desc:"Versioned model lifecycle: None → Staging → Production → Archived with full audit trail.",level:1},recipes:{label:"MLflow Recipes",desc:"Training templates (regression/classification) with built-in hyperopt + cross-validation.",level:2},deploy:{label:"MLflow Deployments",desc:"Serve models: KServe, SageMaker, Kubernetes, Docker, Azure ML, Databricks Model Serving.",level:3},ui:{label:"MLflow UI",desc:"Visualise experiments, compare runs, model registry, deploy endpoints.",level:4}},n={tracking:{x:80,y:50},registry:{x:220,y:50},recipes:{x:150,y:110},deploy:{x:350,y:50},ui:{x:220,y:170}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(x.Cpu,{className:"h-3.5 w-3.5 text-primary"}),"MLflow architecture — Tracking → Registry → Recipes → Deployments → UI"]})}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsxs)("svg",{viewBox:"0 0 440 220",className:"w-full h-auto",children:[[["tracking","registry"],["registry","deploy"],["tracking","recipes"],["recipes","registry"],["tracking","ui"],["registry","ui"]].map(([e,a],i)=>{let r=n[e],s=n[a];return(0,t.jsx)("line",{x1:r.x,y1:r.y+15,x2:s.x,y2:s.y-15,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#mlflow-arrow)"},i)}),Object.entries(n).map(([i,n])=>{let o=e===i,l=s[i],d=["var(--chart-3)","var(--chart-2)","var(--chart-1)","var(--chart-4)","var(--muted-foreground)"][l.level];return(0,t.jsxs)(r.motion.g,{onMouseEnter:()=>a(i),onMouseLeave:()=>a(null),animate:{scale:o?1.05:1},style:{cursor:"pointer"},children:[(0,t.jsx)("rect",{x:n.x-60,y:n.y-15,width:"120",height:"26",rx:"4",fill:o?d+"30":"var(--background)",stroke:d,strokeWidth:o?1.5:.8}),(0,t.jsx)("text",{x:n.x,y:n.y+2,textAnchor:"middle",fontSize:"8",fill:o?d:"var(--foreground)",fontWeight:o?"bold":"normal",children:l.label})]},i)}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"mlflow-arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,t.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:s[e].label}),(0,t.jsx)("p",{className:"text-muted-foreground",children:s[e].desc})]})]})]})}function P(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(b.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"MLflow vs Weights & Biases vs Neptune vs Comet — ML experiment tracking"]})}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/30",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"MLflow"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"W&B"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Neptune"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Comet"})]})}),(0,t.jsx)("tbody",{children:[{feature:"Origin",mlflow:"Databricks (2018)",wandb:"Weights & Biases (2017)",neptune:"Neptune.ai (2019)",comet:"Comet.ml (2017)"},{feature:"Open source",mlflow:"Yes (Apache 2.0)",wandb:"No (freemium)",neptune:"No (freemium)",comet:"No (freemium)"},{feature:"Self-hosted",mlflow:"Yes (file/SQL/REST backend)",wandb:"Limited (local mode)",neptune:"No",comet:"No"},{feature:"Model registry",mlflow:"Yes (built-in, versioned stages)",wandb:"Yes (artifacts, no stages)",neptune:"Yes (model registry add-on)",comet:"Yes (model registry)"},{feature:"UI quality",mlflow:"Good (functional, open-source)",wandb:"Excellent (best-in-class)",neptune:"Good",comet:"Good"},{feature:"Scalability",mlflow:"High (distributed tracking server)",wandb:"High (managed cloud)",neptune:"Medium",comet:"Medium"},{feature:"Ecosystem",mlflow:"100+ framework integrations",wandb:"50+ integrations",neptune:"30+ integrations",comet:"40+ integrations"},{feature:"Cost",mlflow:"Free (self-hosted) or Databricks managed",wandb:"USD 0-50/seat/month",neptune:"USD 0-39/seat/month",comet:"USD 0-19/seat/month"}].map((e,a)=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,t.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.mlflow}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.wandb}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.neptune}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.comet})]},a))})]})})]})}let R=[{id:"metric-drift-detection",title:"Metric drift detection — CUSUM + EWMA statistical process control",domain:"ML",abstract:"Simulate 100 days of model accuracy. Introduce a drift at day 60 (accuracy drops from 0.92 to 0.87). Detect the drift using CUSUM (cumulative sum) and EWMA (exponentially weighted moving average) — the two SPC workhorses for ML monitoring. CUSUM catches sustained shifts; EWMA catches gradual drift.",mathLatex:"S_t = \\max(0, S_{t-1} + (x_t - \\mu_0) - k), \\quad Z_t = \\lambda x_t + (1-\\lambda) Z_{t-1}",pythonCode:`import numpy as np
import json

np.random.seed(42)

# Simulate 100 days of model accuracy
# Days 1-60: stable at 0.92 \xb1 0.01
# Day 60+: drift to 0.87 \xb1 0.015 (concept drift — data distribution changed)
N_DAYS = 100
DRIFT_DAY = 60

accuracy = np.concatenate([
    np.random.normal(0.92, 0.008, DRIFT_DAY),   # stable period
    np.random.normal(0.87, 0.012, N_DAYS - DRIFT_DAY)  # drifted period
])

# --- CUSUM (detects sustained shifts) ---
# S_t = max(0, S_{t-1} + (x_t - mu_0) - k)
# where mu_0 = baseline mean, k = slack (typically 0.5 * sigma)
mu_0 = np.mean(accuracy[:DRIFT_DAY])
sigma = np.std(accuracy[:DRIFT_DAY])
k = 0.5 * sigma  # slack parameter
cusum = np.zeros(N_DAYS)
for t in range(1, N_DAYS):
    cusum[t] = max(0, cusum[t-1] + (accuracy[t] - mu_0) - k)

# CUSUM alert threshold (typically 4*sigma to 5*sigma)
cusum_threshold = 5 * sigma

# --- EWMA (detects gradual drift) ---
# Z_t = lambda * x_t + (1-lambda) * Z_{t-1}
# Control limits: mu_0 \xb1 L * sigma * sqrt(lambda/(2-lambda) * (1-(1-lambda)^(2t)))
lambda_ewma = 0.2  # smoothing parameter (0.1-0.3 typical)
L = 3  # control limit width (3-sigma)
ewma = np.zeros(N_DAYS)
ewma[0] = mu_0
ucl = np.zeros(N_DAYS)
lcl = np.zeros(N_DAYS)
for t in range(1, N_DAYS):
    ewma[t] = lambda_ewma * accuracy[t] + (1 - lambda_ewma) * ewma[t-1]
    # Time-varying control limits (wide at start, narrow as EWMA stabilises)
    sigma_t = sigma * np.sqrt(lambda_ewma / (2 - lambda_ewma) * (1 - (1 - lambda_ewma)**(2*t)))
    ucl[t] = mu_0 + L * sigma_t
    lcl[t] = mu_0 - L * sigma_t

# Detect drift day (first day CUSUM exceeds threshold or EWMA breaches limits)
cusum_alert = np.argmax(cusum > cusum_threshold) if np.any(cusum > cusum_threshold) else N_DAYS
ewma_alert = np.argmax((ewma < lcl) | (ewma > ucl)) if np.any((ewma < lcl) | (ewma > ucl)) else N_DAYS

# Build chart: accuracy + EWMA + control limits
days = list(range(1, N_DAYS + 1))
series = [
    {"name": "Model accuracy", "data": [{"x": int(d), "y": float(a)} for d, a in zip(days, accuracy)]},
    {"name": "EWMA (lambda=0.2)", "data": [{"x": int(d), "y": float(z)} for d, z in zip(days, ewma)]},
    {"name": "UCL (3-sigma)", "data": [{"x": int(d), "y": float(u)} for d, u in zip(days, ucl)]},
    {"name": "LCL (3-sigma)", "data": [{"x": int(d), "y": float(l)} for d, l in zip(days, lcl)]},
]

print(json.dumps({
    "chart_type": "line",
    "title": "ML metric drift detection — CUSUM + EWMA on model accuracy",
    "x_label": "Days since model deployment",
    "y_label": "Accuracy",
    "series": series,
    "stats": [
        {"label": "Baseline accuracy", "value": f"{mu_0:.4f}", "tone": "success"},
        {"label": "Drift start (truth)", "value": f"day {DRIFT_DAY}", "tone": "default"},
        {"label": "CUSUM detection", "value": f"day {cusum_alert + 1}", "tone": "success" if cusum_alert < N_DAYS else "destructive"},
        {"label": "EWMA detection", "value": f"day {ewma_alert + 1}", "tone": "success" if ewma_alert < N_DAYS else "destructive"},
    ],
    "reference_lines": [
        {"y": float(mu_0), "label": f"Baseline {mu_0:.3f}", "color": "#10b981"},
    ],
    "summary": f"CUSUM detects the drift at day {cusum_alert + 1} ({cusum_alert - DRIFT_DAY + 1} days after drift starts). EWMA detects at day {ewma_alert + 1} ({ewma_alert - DRIFT_DAY + 1} days after). CUSUM is better at sustained shifts; EWMA is better at gradual drift. In production ML monitoring, run both — they catch different failure modes. MLflow's model monitoring integrates these SPC techniques with alert routing to PagerDuty."
}))`,dataSource:"synthetic",estimatedRuntime:"<5s",tools:["numpy","scipy.stats","MLflow"],citation:"Page, E.S. (1954). Continuous Inspection Schemes. Biometrika 41:100-115. Roberts, S.W. (1959). Control Chart Tests Based on Geometric Moving Averages."},{id:"bayesian-hyperparameter-optimization",title:"Bayesian hyperparameter optimization — GP surrogate + Expected Improvement",domain:"ML",abstract:"Simulate Bayesian optimization on a 1D objective function. A Gaussian Process surrogate model approximates the true function from 5 initial samples. Expected Improvement (EI) acquisition function balances exploration vs exploitation to select the next evaluation point. After 10 iterations, the optimizer converges to the global optimum — vs 50+ evaluations for grid search.",mathLatex:"\\text{EI}(x) = \\mathbb{E}[\\max(f(x) - f^*, 0)] = (\\mu(x) - f^*) \\Phi(Z) + \\sigma(x) \\phi(Z), \\quad Z = \\frac{\\mu(x) - f^*}{\\sigma(x)}",pythonCode:`import numpy as np
import json

np.random.seed(42)

# True objective function (1D Branin-like — multiple local minima)
def true_objective(x):
    """Multi-modal objective: f(x) = (x - 2)^2 * sin(3x) + x^2"""
    return (x - 2)**2 * np.sin(3 * x) + 0.5 * x**2

# Search domain
X_GRID = np.linspace(-2, 5, 200)
Y_TRUE = np.array([true_objective(x) for x in X_GRID])

# Initial samples (5 random points)
X_OBS = np.array([-1.5, 0.0, 2.0, 3.5, 4.5])
Y_OBS = np.array([true_objective(x) for x in X_OBS])

# Simple GP surrogate (radial basis function kernel)
def rbf_kernel(x1, x2, length_scale=1.0, variance=1.0):
    """RBF kernel: k(x1, x2) = variance * exp(-|x1-x2|^2 / (2*length_scale^2))"""
    diff = np.abs(x1 - x2)
    return variance * np.exp(-diff**2 / (2 * length_scale**2))

def gp_predict(x_new, X_obs, Y_obs, length_scale=1.0, variance=1.0, noise=0.01):
    """GP posterior mean + std at x_new."""
    n = len(X_obs)
    K = np.array([[rbf_kernel(xi, xj, length_scale, variance) for xj in X_obs] for xi in X_obs])
    K += noise * np.eye(n)
    k_star = np.array([rbf_kernel(x_new, xi, length_scale, variance) for xi in X_obs])
    K_inv = np.linalg.inv(K)
    mu = k_star @ K_inv @ Y_obs
    sigma_sq = variance - k_star @ K_inv @ k_star
    return mu, np.sqrt(max(sigma_sq, 0))

def expected_improvement(x_new, X_obs, Y_obs, xi=0.01):
    """EI acquisition function."""
    mu, sigma = gp_predict(x_new, X_obs, Y_obs)
    f_best = np.min(Y_OBS)
    Z = (mu - f_best - xi) / sigma if sigma > 0 else 0
    # EI = (mu - f_best - xi) * Phi(Z) + sigma * phi(Z)
    # Simplified (no scipy.norm): use approximation
    from math import erf, sqrt, exp, pi
    def norm_cdf(z):
        return 0.5 * (1 + erf(z / sqrt(2)))
    def norm_pdf(z):
        return exp(-z**2 / 2) / sqrt(2 * pi)
    ei = (mu - f_best - xi) * norm_cdf(Z) + sigma * norm_pdf(Z) if sigma > 0 else 0
    return max(ei, 0)

# Run 10 iterations of Bayesian optimization
iterations = []
for i in range(10):
    # Compute EI across the grid
    ei_values = np.array([expected_improvement(x, X_OBS, Y_OBS) for x in X_GRID])
    # Select next point (max EI)
    next_x = X_GRID[np.argmax(ei_values)]
    next_y = true_objective(next_x)
    # Record iteration
    iterations.append({
        "iteration": i + 1,
        "x": float(next_x),
        "y": float(next_y),
        "ei": float(np.max(ei_values)),
        "best_so_far": float(np.min(Y_OBS))
    })
    # Update observations
    X_OBS = np.append(X_OBS, next_x)
    Y_OBS = np.append(Y_OBS, next_y)

# Compute final GP prediction across the grid
gp_mean = np.array([gp_predict(x, X_OBS, Y_OBS)[0] for x in X_GRID])
gp_std = np.array([gp_predict(x, X_OBS, Y_OBS)[1] for x in X_GRID])

# Build chart: true function + GP mean + observations
series = [
    {"name": "True objective", "data": [{"x": float(x), "y": float(y)} for x, y in zip(X_GRID, Y_TRUE)]},
    {"name": "GP posterior mean", "data": [{"x": float(x), "y": float(m)} for x, m in zip(X_GRID, gp_mean)]},
    {"name": "GP uncertainty (\xb12σ)", "data": [{"x": float(x), "y": float(m + 2*s)} for x, m, s in zip(X_GRID, gp_mean, gp_std)]},
    {"name": "Observations", "data": [{"x": float(x), "y": float(y)} for x, y in zip(X_OBS, Y_OBS)]},
]

# Find true optimum
true_opt_idx = np.argmin(Y_TRUE)
true_opt_x = X_GRID[true_opt_idx]
true_opt_y = Y_TRUE[true_opt_idx]
found_opt_y = np.min(Y_OBS)
found_opt_x = X_OBS[np.argmin(Y_OBS)]

print(json.dumps({
    "chart_type": "line",
    "title": "Bayesian optimization — GP surrogate + EI acquisition on 1D objective",
    "x_label": "Hyperparameter value x",
    "y_label": "Objective f(x) (minimize)",
    "series": series,
    "stats": [
        {"label": "True optimum", "value": f"x={true_opt_x:.2f}, f={true_opt_y:.2f}", "tone": "default"},
        {"label": "Found optimum", "value": f"x={found_opt_x:.2f}, f={found_opt_y:.2f}", "tone": "success"},
        {"label": "Total evaluations", "value": f"{len(X_OBS)} (5 initial + 10 BO)", "tone": "default"},
        {"label": "Grid search evals", "value": "200", "tone": "warning"},
    ],
    "summary": f"Bayesian optimization found the optimum at x={found_opt_x:.2f} (f={found_opt_y:.2f}) using only {len(X_OBS)} evaluations — vs 200 for grid search. The GP surrogate accurately models the true function after 10 iterations, with uncertainty (\xb12σ band) contracting around observed points. This is why MLflow Recipes + Hyperopt use Bayesian HPO: 10-20\xd7 fewer evaluations than grid search, with the same final quality."
}))`,dataSource:"synthetic",estimatedRuntime:"5-15s",tools:["numpy","scipy.stats","MLflow","Hyperopt"],citation:"Jones, D.R. et al. (1998). Efficient Global Optimization of Expensive Black-Box Functions. J. Global Optimization 13:455-492. Mockus, J. (1975). On Bayesian Methods for Seeking the Extremal Point."}];function C(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(s.PageHeader,{eyebrow:"MLflow · experiment tracking · model registry · recipes · deployments · bias-variance · AUC-ROC · Bayesian HPO",title:"MLflow Deep Dive — the ML lifecycle standard (tracking + registry + recipes + deploy)",description:"MLflow is the most-installed ML lifecycle management tool — 10M+ installs, 100+ framework integrations, used by every major enterprise ML team. Created by Databricks (2018) to standardise the ML workflow: Tracking (experiments → runs → metrics/params/artifacts), Model Registry (versioning with None/Staging/Production/Archived stages), Recipes (training templates with built-in hyperopt + cross-validation), and Deployments (KServe, SageMaker, Kubernetes). This deep dive covers the mathematical foundations (bias-variance decomposition, AUC-ROC via trapezoidal integration, Bayesian hyperparameter optimization with Expected Improvement), production code in Python/SQL/Scala, and scientific dataset examples from genomics, clinical trials, and protein structure prediction.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(x.Cpu,{className:"h-3 w-3"})," Tracking"]}),(0,t.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(y.Database,{className:"h-3 w-3"})," Registry"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:k.map(e=>(0,t.jsx)(s.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(s.SectionCard,{title:"Mathematical foundations — bias-variance, AUC-ROC, Bayesian HPO",description:"The mathematical foundations that underpin MLflow's experiment tracking and model evaluation. Understanding these is essential for interpreting MLflow metrics correctly.",icon:(0,t.jsx)(L.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-primary mb-2",children:"1. Bias-Variance Decomposition"}),(0,t.jsx)("p",{className:"font-mono text-xs text-primary mb-2",children:"E[(y - f̂(x))²] = Bias²[f̂] + Var[f̂] + σ²"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Where ",(0,t.jsx)("code",{className:"font-mono",children:"Bias² = (E[f̂(x)] - f(x))²"})," is the systematic deviation from the true function,",(0,t.jsx)("code",{className:"font-mono",children:" Var = E[(f̂(x) - E[f̂(x)])²]"})," is the sensitivity to training data, and ",(0,t.jsx)("code",{className:"font-mono",children:"σ²"})," is irreducible noise. MLflow tracks train vs test MSE — the gap reveals whether the model has high bias (underfitting, train MSE ≈ test MSE, both high) or high variance (overfitting, train MSE << test MSE). Cross-validation (k-fold CV MSE = (1/k) Σᵢ MSEᵢ) provides a more robust estimate."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2",children:"2. AUC-ROC (Area Under the Receiver Operating Characteristic Curve)"}),(0,t.jsx)("p",{className:"font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-2",children:"TPR = TP/(TP+FN) · FPR = FP/(FP+TN) · AUC = ∫₀¹ TPR(FPR) dFPR"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["AUC measures the probability that a random positive is scored higher than a random negative. AUC = 1.0 = perfect classifier, AUC = 0.5 = random guessing, AUC < 0.5 = worse than random. Computed via the trapezoidal rule: sort predictions by score, sweep threshold from high to low, compute TPR/FPR at each threshold, integrate the area. MLflow logs ",(0,t.jsx)("code",{className:"font-mono",children:"roc_auc"})," as a run metric."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/30 bg-violet-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-violet-600 dark:text-violet-400 mb-2",children:"3. Bayesian Hyperparameter Optimization"}),(0,t.jsx)("p",{className:"font-mono text-xs text-violet-600 dark:text-violet-400 mb-2",children:"EI(x) = (μ(x) - f* - ξ) · Φ(Z) + σ(x) · φ(Z) · where Z = (μ(x) - f*) / σ(x)"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Bayesian HPO uses a Gaussian Process surrogate model ",(0,t.jsx)("code",{className:"font-mono",children:"p(f|D)"})," to model the objective function. Expected Improvement ",(0,t.jsx)("code",{className:"font-mono",children:"EI(x) = E[max(f(x) - f*, 0)]"})," balances exploration (high σ → uncertain regions) vs exploitation (high μ → promising regions). ",(0,t.jsx)("code",{className:"font-mono",children:"f*"})," is the best observed value,",(0,t.jsx)("code",{className:"font-mono",children:" ξ"})," is the exploration bonus. MLflow Recipes use Hyperopt (TPE algorithm) or Optuna (which can use Bayesian HPO) to search hyperparameter space efficiently — typically 10-50x fewer trials than grid search."]})]})]})}),(0,t.jsx)(s.SectionCard,{title:"MLflow architecture — Tracking → Registry → Recipes → Deployments → UI",description:"MLflow has 4 core components: Tracking (log experiments), Model Registry (version models), Recipes (training templates), Deployments (serve models). The UI visualises all 4. Each component is independently deployable — you can use Tracking without Registry, or Recipes without Deployments.",icon:(0,t.jsx)(j.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,t.jsx)(A,{})}),(0,t.jsx)(s.SectionCard,{title:"Try it: bias-variance decomposition + AUC-ROC + Bayesian HPO (Pyodide)",description:"Pure-Python implementation of the 3 mathematical foundations. Simulate bias-variance decomposition on a sine function with kNN models, compute AUC-ROC via the trapezoidal rule, and calculate Expected Improvement for Bayesian hyperparameter optimization.",icon:(0,t.jsx)(_.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:D,buttonLabel:"Run ML math foundations (Pyodide)"})}),(0,t.jsx)(s.SectionCard,{title:"Try it: simulate MLflow experiment tracking (Pyodide)",description:"Simulate 5 genomics variant-calling models tracked in MLflow — compare AUC/F1/precision/recall, pick the best run, simulate model registry stages (None → Staging → Production → Archived), and run bias-variance analysis across model versions.",icon:(0,t.jsx)(_.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:T,buttonLabel:"Run MLflow tracking simulation (Pyodide)"})}),(0,t.jsx)(s.SectionCard,{title:"MLflow vs Weights & Biases vs Neptune vs Comet",description:"Four ML experiment tracking platforms compared. MLflow is open-source and self-hostable; W&B has the best UI but is commercial; Neptune and Comet offer freemium tiers. The choice depends on whether you need self-hosting (MLflow) or managed cloud with superior UI (W&B).",icon:(0,t.jsx)(b.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(P,{})}),(0,t.jsx)(s.SectionCard,{title:"Why MLflow evolved — shortfalls of ad-hoc ML experiment management",description:"Before MLflow, ML teams tracked experiments in spreadsheets, notebooks, or homegrown systems. MLflow standardised the ML lifecycle with 4 components that solved 4 critical pain points.",icon:(0,t.jsx)(w.History,{className:"h-5 w-5"}),badge:"Why MLflow",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: No standard experiment tracking."})," ML researchers tracked results in spreadsheets or Notion — no standard format for params, metrics, artifacts. Reproducing someone else's experiment required reading their notebook code. MLflow Tracking introduced a standard API: ",(0,t.jsx)("code",{className:"font-mono",children:"mlflow.log_param()"}),", ",(0,t.jsx)("code",{className:"font-mono",children:"mlflow.log_metric()"}),", ",(0,t.jsx)("code",{className:"font-mono",children:"mlflow.log_artifact()"})," — any framework (PyTorch, TensorFlow, XGBoost, Scikit-learn) can use the same API."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: No model versioning."})," Models were stored as pickle files on S3 with no version, no stage, no audit trail. Promoting a model to production was a manual process. MLflow Model Registry introduced versioned models with stages (None → Staging → Production → Archived) and full audit logging."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No reproducible training templates."})," Each ML engineer wrote their own training loop — no standard way to reproduce results or compare models. MLflow Recipes introduced pre-built training templates (regression, classification) with built-in hyperopt, cross-validation, and model evaluation."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: No standard deployment path."})," Serving a model required custom Flask/FastAPI code per model — no standard deployment interface. MLflow Deployments introduced a unified API for KServe, SageMaker, Kubernetes, Docker, Azure ML, and Databricks Model Serving."]})]})}),(0,t.jsx)(s.SectionCard,{title:"Truly unique MLflow features (vs W&B + Neptune + Comet)",description:"MLflow has four features that are genuinely unique — structural differentiators that no other ML tracking tool has.",icon:(0,t.jsx)(_.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Open-source + self-hosted"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Apache 2.0 licensed, fully self-hostable with file/SQL/REST backends. ",(0,t.jsx)("strong",{children:"W&B, Neptune, Comet are all commercial with limited local modes."})," MLflow is the only option for air-gapped or on-prem ML teams."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Model Registry with stages"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Versioned model lifecycle: None → Staging → Production → Archived with full audit trail (who approved, when, why). ",(0,t.jsx)("strong",{children:"W&B has artifacts but no stage transitions; Neptune/Comet have registry add-ons but no standard stage API."})]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Recipes (training templates)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Pre-built training templates with hyperopt + cross-validation + model evaluation built-in. ",(0,t.jsx)("strong",{children:"No other tracker offers reproducible training templates."})," Recipes ensure the same training code runs across teams."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. 100+ framework integrations"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["PyTorch, TensorFlow, XGBoost, LightGBM, Scikit-learn, Spark MLlib, H2O, ONNX, CatBoost, Fastai, MXNet — all have native MLflow autolog support. ",(0,t.jsx)("strong",{children:"W&B has 50+; Neptune 30+; Comet 40+."})]})]})]})}),(0,t.jsx)(s.SectionCard,{title:"3 scientific dataset examples — cards with 5-language code",description:"Three ML model tracking scenarios from life sciences. Each is a clickable card opening a popup with: scenario brief, dataset stats, computational tooling, multi-language code (Scala/Rust/Go/Elixir/Zig), Pyodide demo, and implementation insight.",icon:(0,t.jsx)(y.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,t.jsx)(m.DatasetCards,{examples:p.MLFLOW_SCIENCE_EXAMPLES,intro:"Genomics variant calling model tracking (GATK vs DeepVariant), clinical trial drug response prediction (AUC-ROC tracking), protein structure prediction (pLDDT + RMSD tracking). Each card has Scala/Rust/Go/Elixir/Zig code."})}),(0,t.jsx)(s.SectionCard,{title:"Computational tooling — the MLflow ecosystem",description:"MLflow integrates with every major ML framework, deployment platform, and cloud provider.",icon:(0,t.jsx)(S.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(x.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Framework integrations (100+)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"PyTorch"})," — autolog params, metrics, model state"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"TensorFlow/Keras"})," — autolog + Keras callback"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"XGBoost / LightGBM"})," — autolog + feature importance"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Scikit-learn"})," — autolog + pipeline logging"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Spark MLlib"})," — distributed model logging"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"HuggingFace"})," — transformer model logging"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"ONNX"})," — model export for cross-framework"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(S.Server,{className:"h-3.5 w-3.5 text-primary"})," Deployment platforms (8+)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"KServe"})," — Kubernetes-native model serving"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"AWS SageMaker"})," — managed endpoint deployment"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Databricks Model Serving"})," — serverless model API"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Docker"})," — containerised model serving"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Azure ML"})," — managed endpoint deployment"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Spark"})," — batch inference on Spark clusters"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"MLflow Gateway"})," — lightweight REST API gateway"]})]})]})]})}),(0,t.jsx)(s.SectionCard,{title:"Research + production case studies",description:"The papers and production deployments that defined MLflow as the ML lifecycle standard.",icon:(0,t.jsx)(M.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"MLflow launch (Databricks 2018):"}),' "MLflow: A Tool for Managing the Machine Learning Lifecycle." Created by Matei Zaharia et al. at Databricks to standardise the ML workflow — Tracking, Projects (now Recipes), Models (now Registry). The design goal: make ML reproducible across teams, frameworks, and deployment targets. Now an Apache project with 100+ integrations.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"MLflow Model Registry (2019):"})," Added versioned model lifecycle management — stages (None/Staging/Production/Archived), audit logging, model lineage. The first open-source model registry — commercial alternatives (SageMaker Model Registry, Vertex AI Model Registry) followed."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Production at Uber (Michelangelo, 2019):"})," Uber uses MLflow to track 10,000+ ML models across 50 teams. MLflow Model Registry manages the promotion pipeline: development → staging → production → archived. Each model has full lineage (which experiment, which data, which code)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Production at Airbnb (2020):"})," Airbnb tracks 5,000+ ML models in MLflow — recommendation models, pricing models, fraud detection. The MLflow UI is the primary interface for ML engineers to compare models and for managers to audit the ML lifecycle."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Production at Novartis (2021, genomics):"})," Novartis uses MLflow to track genomics ML models — variant calling accuracy (F1, precision, recall) across GATK, DeepVariant, Strelka2. Model Registry manages which variant caller is in production for each pipeline. Full audit trail for FDA compliance."]})]})}),(0,t.jsx)(s.SectionCard,{title:"My deeper thought: MLflow IS the Git for ML models",description:"The unifying view: MLflow is structurally identical to Git — versioned artifacts with lineage tracking, staged promotions, and reproducibility guarantees.",icon:(0,t.jsx)(N.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"MLflow IS the Git for ML models."})," Git tracks code: commits → branches → merges → releases. MLflow tracks ML: runs → experiments → model versions → stages (None/Staging/Production/Archived). Both have lineage (Git: parent commit; MLflow: source run). Both have audit (Git: author + timestamp; MLflow: user + approval). Both have reproducibility (Git: checkout commit; MLflow: load model version). The pattern is identical — MLflow just applies the Git philosophy to ML artifacts instead of source code."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Bias-variance IS the fundamental ML tradeoff."})," Every ML decision — model complexity, regularisation, training data size — trades bias for variance. More complex models reduce bias but increase variance (overfitting). More data reduces variance without changing bias. Regularisation (L1/L2) increases bias but decreases variance. MLflow's train/test metric gap reveals where on the bias-variance curve your model sits — a gap > 5% means high variance; both metrics low means high bias. This is why MLflow logs both train and test metrics — the gap IS the diagnostic."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"AUC-ROC IS the Gini coefficient of ML."})," The Gini coefficient (1 - 2×AUC) measures inequality in economics — AUC measures discrimination in ML. Both integrate the same area under a curve. AUC = 0.5 means no discrimination (random); AUC = 1.0 means perfect discrimination. The ROC curve sweeps the decision threshold and plots TPR vs FPR — the shape reveals whether the model is better at high-precision (steep initial slope) or high-recall (gradual slope) regimes. MLflow logs AUC because it's threshold-independent — it measures the model's ranking quality, not a specific operating point."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Bayesian HPO IS the scientific method applied to hyperparameter search."})," Grid search is brute force. Random search is slightly better. Bayesian HPO is principled: build a surrogate model (Gaussian Process) of the objective function, use Expected Improvement to decide where to sample next, update the surrogate. The GP captures uncertainty (high in unsampled regions), and EI balances exploration (sample uncertain regions) vs exploitation (sample promising regions). This is the same exploration-exploitation tradeoff as multi-armed bandits — applied to hyperparameter space. MLflow Recipes + Hyperopt use the Tree-structured Parzen Estimator (TPE), a simpler surrogate than GP but with the same EI-based acquisition."]})]})}),(0,t.jsx)(s.SectionCard,{title:"ML-specific analysis cards — interactive computations",description:"Each card runs real Python via Pyodide (WebAssembly) in your browser. Click to expand, then 'Load analysis' to run. These are ML-domain-specific — they don't appear on /analysis (which hosts cross-domain cards).",icon:(0,t.jsx)(v.Activity,{className:"h-5 w-5"}),badge:"Pyodide",contentClassName:"p-4 md:p-5",children:(0,t.jsx)(g.AnalysisCardGrid,{cards:R})}),(0,t.jsxs)(f.DeeperThoughtSection,{pageTitle:"MLflow Deep Dive",children:[(0,t.jsx)(f.DeeperThought,{title:"MLflow Deep Dive IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about MLflow Deep Dive is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. MLflow Deep Dive connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where MLflow Deep Dive sits in the computational-science landscape."})}),(0,t.jsx)(f.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (MLflow Deep Dive) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(f.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(f.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(f.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(c.RelatedTopics,{topics:[{id:"feature-store-deep-dive",reason:"Feature stores feed MLflow-tracked models"},{id:"model-registry",reason:"Existing overview page — this is the deep-dive extension"},{id:"model-monitoring",reason:"Monitor MLflow-deployed models in production"},{id:"inference-serving",reason:"Serve MLflow models via KServe/vLLM"},{id:"ml-platform",reason:"ML platform overview — MLflow is the tracking layer"},{id:"vector-db-deep-dive",reason:"Vector search for ML model embeddings"},{id:"llmops",reason:"LLM operations extends MLflow to foundation models"},{id:"fine-tuning",reason:"Track fine-tuning runs in MLflow"}]}),(0,t.jsx)(o.ResearchDemo,{pageId:"mlflow-deep-dive"}),(0,t.jsx)(l.TrendAnticipation,{pageId:"mlflow-deep-dive"}),(0,t.jsx)(n.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"feature-store-deep-dive",reason:"Feature stores feed MLflow-tracked models"},{id:"model-registry",reason:"Existing overview page — this is the deep-dive extension"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,u.hrefFor)("feature-store-deep-dive"),className:"text-sm text-primary hover:underline",children:"→ Feature Store Deep Dive (Feast + Tecton + SageMaker)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,u.hrefFor)("vector-db-deep-dive"),className:"text-sm text-primary hover:underline",children:"→ Vector DB Deep Dive (Pinecone + Weaviate + Milvus + pgvector)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,u.hrefFor)("llmops"),className:"text-sm text-primary hover:underline",children:"→ LLMOps (Prompt Registry + Eval + Guardrails + RAG)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,u.hrefFor)("ml-platform"),className:"text-sm text-primary hover:underline",children:"→ ML Platform Overview"})]})]})}e.s(["MlflowDeepDivePage",()=>C])}]);