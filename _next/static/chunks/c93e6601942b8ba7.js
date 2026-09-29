(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,921371,e=>{"use strict";var t=e.i(843476),r=e.i(271645),a=e.i(487486),s=e.i(519455),i=e.i(716675),n=e.i(194058),o=e.i(862824),l=e.i(344396),d=e.i(178583),c=e.i(778917),m=e.i(283086),p=e.i(972520),h=e.i(217923),u=e.i(522016),g=e.i(901752);function f({pageId:e}){let r=(0,l.researchForPage)(e);return 0===r.length?null:(0,t.jsxs)(o.SectionCard,{title:"Recent research (2023-2025)",description:"Modern papers that extend the math, code, and tools on this page.",icon:(0,t.jsx)(d.FileText,{className:"h-5 w-5"}),badge:`${r.length} paper${1===r.length?"":"s"}`,badgeVariant:"outline",contentClassName:"space-y-4",children:[r.map((e,r)=>(0,t.jsx)(x,{entry:e},r)),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground italic",children:[r.length," paper",1===r.length?"":"s"," mapped to this page. Each shows the key algorithm + expected output (rendered as charts when the code produces JSON). Run the code in-browser via Pyodide."]})]})}function x({entry:e}){let[o,l]=(0,r.useState)(!1),[d,f]=(0,r.useState)(null);return(0,t.jsxs)("div",{className:"rounded-lg border border-border/60 p-4 space-y-3 hover:border-primary/30 transition-colors",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-start justify-between gap-3",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold leading-tight flex-1",children:e.paperTitle}),(0,t.jsx)(a.Badge,{variant:"outline",className:"text-[10px] shrink-0",children:e.venue})]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:[e.authors," · ",e.year]}),e.arxivId&&(0,t.jsxs)("a",{href:`https://arxiv.org/abs/${e.arxivId}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"arXiv:",e.arxivId]}),e.doi&&!e.arxivId&&(0,t.jsxs)("a",{href:`https://doi.org/${e.doi}`,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:[(0,t.jsx)(c.ExternalLink,{className:"h-3 w-3"}),"DOI:",e.doi]})]}),(0,t.jsx)("p",{className:"text-[12px] text-muted-foreground leading-relaxed",children:e.abstract}),(0,t.jsxs)(s.Button,{variant:"outline",size:"sm",onClick:()=>l(!o),className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(m.Sparkles,{className:"h-3 w-3"}),o?"Hide expected code":"Show expected code + visualization"]}),o&&(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)(i.PyodideRunner,{code:e.expectedCode,buttonLabel:"Run in browser",onOutput:e=>{try{let t=e.indexOf("{"),r=e.lastIndexOf("}");if(t>=0&&r>t){let a=e.substring(t,r+1);f(JSON.parse(a))}}catch{}},hideTextOutput:!!d,compact:!0}),d?(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(h.BarChart3,{className:"h-3.5 w-3.5 text-primary"}),(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Visualization (rendered from code output)"})]}),(0,t.jsx)(n.AnalysisChart,{data:d,accent:"oklch(0.65 0.18 250)",sourceCode:e.expectedCode})]}):(0,t.jsxs)("div",{className:"rounded-md border border-primary/20 bg-primary/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Expected output"}),(0,t.jsx)("pre",{className:"text-[11px] font-mono whitespace-pre-wrap leading-relaxed",children:e.expectedOutput})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Key insight"}),(0,t.jsx)("p",{className:"text-[12px] text-foreground/80 leading-relaxed",children:e.keyInsight})]})]}),(0,t.jsxs)(u.default,{href:(0,g.hrefFor)("analytics-outputs"),className:"inline-flex items-center gap-1 text-[11px] text-primary hover:underline",children:["See this math visualized on Analytics Outputs ",(0,t.jsx)(p.ArrowRight,{className:"h-3 w-3"})]})]})}e.s(["ResearchDemo",()=>f])},727927,e=>{"use strict";var t=e.i(651617);e.s(["Cloud",()=>t.default])},366101,763639,e=>{"use strict";var t=e.i(843476),r=e.i(271645),a=e.i(980376),s=e.i(122836),i=e.i(487486),n=e.i(519455),o=e.i(444609);e.s(["Languages",()=>o.default],763639);var o=o,l=e.i(463059);let d={python:"Python",scala:"Scala",go:"Go",rust:"Rust",java:"Java",sql:"SQL",yaml:"YAML",hcl:"Terraform",bash:"Bash",elixir:"Elixir",c:"C",typescript:"TypeScript"};function c({samples:e}){let[a,i]=(0,r.useState)(0),n=e[a];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"flex flex-wrap gap-1 border-b border-border/60 bg-muted/20 px-2 py-2",children:e.map((e,r)=>(0,t.jsx)("button",{onClick:()=>i(r),className:`text-[11px] px-2.5 py-1 rounded border transition-colors font-mono ${r===a?"bg-primary text-primary-foreground border-primary":"border-border/60 hover:bg-accent"}`,children:d[e.language]??e.language},e.language+e.filename))}),(0,t.jsxs)("div",{className:"p-3 bg-card",children:[n.note&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground mb-2 italic",children:n.note}),(0,t.jsx)(s.CodeBlock,{code:n.code,language:n.language,filename:n.filename,highlight:n.highlight})]})]})}function m({title:e,description:r,samples:s,drawerMode:d=!1,drawerButtonLabel:m}){return d?(0,t.jsxs)(a.Sheet,{children:[(0,t.jsx)(a.SheetTrigger,{asChild:!0,children:(0,t.jsxs)(n.Button,{variant:"outline",className:"gap-2 w-full justify-between h-auto py-3",children:[(0,t.jsxs)("span",{className:"flex items-center gap-2",children:[(0,t.jsx)(o.default,{className:"h-4 w-4 text-primary"}),(0,t.jsx)("span",{className:"font-semibold text-sm",children:m??e}),(0,t.jsxs)(i.Badge,{variant:"outline",className:"text-[10px]",children:[s.length," languages"]})]}),(0,t.jsx)(l.ChevronRight,{className:"h-4 w-4 text-muted-foreground"})]})}),(0,t.jsxs)(a.SheetContent,{side:"right",className:"w-[min(680px,100vw)] sm:max-w-[680px] p-0 overflow-y-auto",children:[(0,t.jsxs)(a.SheetHeader,{className:"px-5 pt-5 pb-3 border-b border-border/60 bg-muted/30",children:[(0,t.jsxs)(a.SheetTitle,{className:"text-base flex items-center gap-2",children:[(0,t.jsx)(o.default,{className:"h-4 w-4 text-primary"}),e]}),r&&(0,t.jsx)(a.SheetDescription,{className:"text-xs",children:r})]}),(0,t.jsx)("div",{className:"border-b border-border/60",children:(0,t.jsx)(c,{samples:s})}),(0,t.jsx)("div",{className:"px-5 py-3 border-t border-border/60 bg-muted/20 text-[11px] text-muted-foreground",children:(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"File types commonly deployed:"})," ",Array.from(new Set(s.map(e=>e.filename.split(".").pop()||""))).join(", ")," — each compiles to a portable artefact (binary, .so, .beam, .jar, or interpreter-bound source)."]})})]})]}):(0,t.jsxs)("div",{className:"rounded-md border border-border/60 overflow-hidden",children:[(0,t.jsxs)("div",{className:"bg-muted/30 px-4 py-3 border-b border-border/60",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(o.default,{className:"h-4 w-4 text-primary"}),(0,t.jsx)("p",{className:"text-sm font-semibold",children:e}),(0,t.jsxs)(i.Badge,{variant:"outline",className:"ml-auto text-[10px]",children:[s.length," languages"]})]}),r&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:r})]}),(0,t.jsx)(c,{samples:s})]})}e.s(["MultiLangSamples",()=>m],366101)},561924,e=>{"use strict";var t=e.i(843476),r=e.i(522016),a=e.i(862824),s=e.i(342046),i=e.i(921371),n=e.i(580296),o=e.i(122836),l=e.i(366101),d=e.i(716675),c=e.i(901752),m=e.i(487486),p=e.i(332017),h=e.i(966992),u=e.i(852008),g=e.i(727927),f=e.i(763639),x=e.i(25652),y=e.i(868054),v=e.i(658041),b=e.i(455711);let w=[{label:"ML lifecycle stages",value:"7",hint:"Prep → Features → Train → Eval → Register → Serve → Monitor",deltaTone:"flat"},{label:"Languages for ML code",value:"4+",hint:"Python (scikit-learn) · Rust (candle) · Scala (Spark MLlib) · Go (ONNX)",deltaTone:"flat"},{label:"Experiment tracking",value:"MLflow",hint:"OSS (Apache 2.0), language-agnostic, ADR-020",deltaTone:"flat"},{label:"In-browser training",value:"Pyodide",hint:"Linear regression demo — train + predict in browser",deltaTone:"flat"}],j=[{stage:"1. Data Prep",desc:"Feature engineering on Bronze/Silver data using DuckDB (ADR-014) or Polars (ADR-018)",tools:"DuckDB · Polars · dbt"},{stage:"2. Feature Store",desc:"Online + offline feature serving; consistency between training + serving",tools:"Databricks Feature Store · Feast"},{stage:"3. Training",desc:"Model training — scikit-learn, XGBoost, PyTorch, Spark MLlib",tools:"Python · Scala · Rust · Go"},{stage:"4. Evaluation",desc:"Cross-validation, A/B testing, champion/challenger comparison",tools:"MLflow Metrics · Evidently"},{stage:"5. Registry",desc:"Versioned model registry with stages (None → Staging → Production → Archived)",tools:"MLflow Model Registry"},{stage:"6. Serving",desc:"Batch scoring on Spark; real-time inference via containerised endpoints",tools:"MLflow Models · BentoML · Ray Serve"},{stage:"7. Monitoring",desc:"Drift detection, performance monitoring, retraining triggers",tools:"Evidently · NannyML · Arize"}],N=[{service:"MLflow",free:"100% OSS (Apache 2.0) — self-host tracking server",link:"mlflow.org"},{service:"Databricks Community",free:"Free 1-cluster — MLflow + MLlib + notebooks",link:"databricks.com/learn/community-edition"},{service:"Hugging Face",free:"Free model hub — transformers, datasets, Spaces",link:"huggingface.co"},{service:"Weights & Biases",free:"Free tier — personal projects, 100 GB artifact storage",link:"wandb.ai"},{service:"Feast (Feature Store)",free:"100% OSS — self-hostable feature store",link:"feast.dev"},{service:"Evidently (Monitoring)",free:"100% OSS — drift detection + reports",link:"evidentlyai.com"},{service:"Optuna (HPO)",free:"100% OSS — hyperparameter optimisation",link:"optuna.org"}],_=`# Linear Regression — trained in your browser via Pyodide
# No scikit-learn, no NumPy — pure Python stdlib (math module)
# Shows the core ML loop: initialise → train (gradient descent) → predict → evaluate

import math
import random

# Generate synthetic training data (y = 2x + 1 + noise)
random.seed(42)
X_train = [i * 0.1 for i in range(100)]
y_train = [2.0 * x + 1.0 + random.gauss(0, 0.3) for x in X_train]

# Generate test data
X_test = [i * 0.1 for i in range(100, 120)]
y_test = [2.0 * x + 1.0 + random.gauss(0, 0.3) for x in X_test]

# Linear regression: y = w*x + b
# Train via gradient descent
w = 0.0  # weight (should converge to ~2.0)
b = 0.0  # bias  (should converge to ~1.0)
lr = 0.01  # learning rate
epochs = 200

print("=" * 60)
print("ML Training — Linear Regression (gradient descent)")
print("=" * 60)
print(f"\\nTraining data: {len(X_train)} samples")
print(f"True model: y = 2.0x + 1.0 + noise(σ=0.3)")
print(f"Initial:     w={w:.4f}, b={b:.4f}")
print(f"Hyperparams: lr={lr}, epochs={epochs}")

for epoch in range(epochs):
    # Forward pass
    predictions = [w * x + b for x in X_train]
    errors = [pred - y for pred, y in zip(predictions, y_train)]

    # Gradients
    grad_w = sum(2 * err * x for err, x in zip(errors, X_train)) / len(X_train)
    grad_b = sum(2 * err for err in errors) / len(X_train)

    # Update weights
    w -= lr * grad_w
    b -= lr * grad_b

    # Log every 50 epochs
    if (epoch + 1) % 50 == 0 or epoch == 0:
        mse = sum(e ** 2 for e in errors) / len(errors)
        print(f"  Epoch {epoch+1:>3}: w={w:.4f}, b={b:.4f}, MSE={mse:.6f}")

# Evaluate on test set
test_preds = [w * x + b for x in X_test]
test_mse = sum((p - y) ** 2 for p, y in zip(test_preds, y_test)) / len(y_test)
test_rmse = math.sqrt(test_mse)

print(f"\\n{'=' * 60}")
print("RESULTS — Trained model")
print("=" * 60)
print(f"\\nLearned:    y = {w:.4f}x + {b:.4f}")
print(f"True:       y = 2.0000x + 1.0000")
print(f"Weight error:  {abs(w - 2.0):.4f} ({abs(w - 2.0)/2.0*100:.1f}%)")
print(f"Bias error:    {abs(b - 1.0):.4f} ({abs(b - 1.0)/1.0*100:.1f}%)")
print(f"\\nTest MSE:  {test_mse:.6f}")
print(f"Test RMSE: {test_rmse:.6f}")

# Show predictions
print(f"\\nSample predictions:")
for i in [0, 5, 10, 15]:
    x = X_test[i]
    print(f"  x={x:.1f} → predicted={w*x+b:.4f}, actual={y_test[i]:.4f}, error={abs(w*x+b - y_test[i]):.4f}")

print(f"\\n{'=' * 60}")
print("This model was trained in your browser via Pyodide (Python in Wasm).")
print("In production: log params (lr, epochs) + metrics (MSE, RMSE) to MLflow.")
print("=" * 60)`;function S(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(a.PageHeader,{eyebrow:"Machine Learning · MLOps lifecycle",title:"ML Platform — Train, Track, Register, Serve, Monitor",description:"The ML lifecycle: data prep → feature engineering → training → evaluation → registry → serving → monitoring. MLflow for experiment tracking + model registry (ADR-020). Feature stores for train/serve consistency. Multi-language training code (Python/Rust/Scala/Go). And a Pyodide demo that trains a linear regression model IN YOUR BROWSER — click Run, watch gradient descent converge in real time.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(b.Brain,{className:"h-3 w-3"})," 7 stages"]}),(0,t.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(h.Cpu,{className:"h-3 w-3"})," MLflow"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:w.map(e=>(0,t.jsx)(a.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(a.SectionCard,{title:"The ML lifecycle — 7 stages",description:"Each stage has its own tools, its own ADR, and its own failure modes. The platform's job is to make each stage self-serve.",icon:(0,t.jsx)(u.Layers,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"divide-y divide-border/60",children:j.map((e,r)=>(0,t.jsx)("div",{className:"px-4 py-3 hover:bg-muted/20 transition-colors",children:(0,t.jsxs)("div",{className:"flex items-start gap-3",children:[(0,t.jsx)("span",{className:"flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5",children:r+1}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-semibold",children:e.stage.replace(/^\d+\.\s/,"")}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-0.5",children:e.desc}),(0,t.jsx)("p",{className:"text-[10px] font-mono text-primary/70 mt-1",children:e.tools})]})]})},e.stage))})}),(0,t.jsx)(a.SectionCard,{title:"Try it: Train a linear regression model in your browser (Pyodide)",description:"Pure Python (stdlib only — no scikit-learn, no NumPy). Gradient descent converges to y≈2.0x+1.0 on synthetic data. Real ML happening in your browser tab via WebAssembly. In production: log params + metrics to MLflow (ADR-020).",icon:(0,t.jsx)(y.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:_,buttonLabel:"Train model in browser (Pyodide)"})}),(0,t.jsx)(a.SectionCard,{title:"Multi-language: ML training in Python, Rust, Scala, Go",description:"Same model (linear regression), four languages. Python = scikit-learn default. Rust = candle (Rust ML). Scala = Spark MLlib. Go = ONNX runtime inference. Click to open the drawer.",icon:(0,t.jsx)(f.Languages,{className:"h-5 w-5"}),badge:"4 languages · drawer",children:(0,t.jsx)(l.MultiLangSamples,{drawerMode:!0,drawerButtonLabel:"View 4-language ML training implementations",title:"Linear regression — 4 idiomatic implementations",description:"Python (scikit-learn + MLflow logging) · Rust (candle — Rust-native ML) · Scala (Spark MLlib — distributed) · Go (ONNX runtime — inference).",samples:[{language:"python",filename:"train_lr.py",note:"Python + scikit-learn + MLflow — the default for data scientists. Logs params, metrics, model artifacts to MLflow Tracking. File types: .py (source), interpreted, MLmodel artifact.",code:`import mlflow
import mlflow.sklearn
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np

# Start MLflow run — tracks ALL params + metrics + artifacts
with mlflow.start_run(run_name="lr_revenue_v1"):
    # Log hyperparameters
    mlflow.log_param("model_type", "LinearRegression")
    mlflow.log_param("fit_intercept", True)
    mlflow.log_param("features", ["customer_ltv", "region_code", "segment"])

    # Load features from DuckDB (ADR-014) or Feature Store
    X = np.array([[1200, 1, 0], [850, 2, 1], [3200, 0, 2], [200, 3, 0]])
    y = np.array([5200, 850, 9999, 200])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)

    # Train
    model = LinearRegression(fit_intercept=True)
    model.fit(X_train, y_train)

    # Evaluate
    preds = model.predict(X_test)
    mse = mean_squared_error(y_test, preds)
    rmse = np.sqrt(mse)

    # Log metrics to MLflow
    mlflow.log_metric("mse", mse)
    mlflow.log_metric("rmse", rmse)

    # Log the model itself as an artifact
    mlflow.sklearn.log_model(model, "model")

    print(f"Trained: RMSE={rmse:.2f}")
    print(f"MLflow run: {mlflow.active_run().info.run_id}")
    print(f"Model logged to: mlruns/0/{mlflow.active_run().info.run_id}/artifacts/model")`,highlight:[6,7,8,9,10,11,12,13,19,20,24,25,28,29,30,31,33,34,36]},{language:"rust",filename:"train_lr.rs",note:"Rust + candle — Rust-native ML framework. Memory-safe, no GIL, compiles to single binary. For production inference at scale. File types: .rs → binary.",code:`use candle_core::{Device, Tensor, DType};
use candle_nn::{Linear, Module, VarBuilder, Optimizer, SGD};
use anyhow::Result;

fn train_linear_regression() -> Result<()> {
    let device = Device::Cpu;

    // Synthetic training data (y = 2x + 1 + noise)
    let x_data = vec![0.1_f32, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
    let y_data: Vec<f32> = x_data.iter().map(|x| 2.0 * x + 1.0).collect();

    let x = Tensor::from_slice(&x_data, (10, 1), &device)?;
    let y = Tensor::from_slice(&y_data, (10, 1), &device)?;

    // Initialise model: y = w*x + b
    let vs = VarBuilder::new(ScalarDType::F32, &device);
    let model = Linear::new(1, 1, vs.pp("linear"))?;
    let mut optimizer = SGD::new(0.01);

    // Train via gradient descent
    for epoch in 0..200 {
        let preds = model.forward(&x)?;
        let loss = (preds - &y)?.sqr()?.mean_all()?;
        optimizer.step(&loss)?;
        if epoch % 50 == 0 {
            println!("Epoch {}: loss={:?}", epoch, loss);
        }
    }

    println!("Trained linear regression model (Rust + candle)");
    Ok(())
}

fn main() -> Result<()> { train_linear_regression() }`,highlight:[6,7,9,10,12,14,15,17,19,20,22]},{language:"scala",filename:"TrainLR.scala",note:"Scala + Spark MLlib — distributed training across a cluster. For datasets that don't fit on one machine. File types: .scala → JVM bytecode.",code:`import org.apache.spark.ml.regression.LinearRegression
import org.apache.spark.sql.SparkSession
import org.apache.spark.ml.feature.VectorAssembler

val spark = SparkSession.builder.appName("lr-training").getOrCreate()

// Load features from Delta Lake (ADR-013)
val df = spark.read.format("delta")
  .load("s3://moderndatascieng-gold/ml/features/customer_ltv")

// Assemble features into a vector column
val assembler = new VectorAssembler()
  .setInputCols(Array("customer_ltv", "region_code", "segment"))
  .setOutputCol("features")
val featureDf = assembler.transform(df)

// Train distributed linear regression
val lr = new LinearRegression()
  .setMaxIter(200)
  .setRegParam(0.01)
  .setFeaturesCol("features")
  .setLabelCol("revenue")

val model = lr.fit(featureDf)
println(s"Coefficients: \\\${model.coefficients}")
println(s"Intercept: \\\${model.intercept}")

// Log to MLflow (Scala API)
// mlflow.logParam("maxIter", 200)
// mlflow.logMetric("rmse", model.summary.rootMeanSquaredError)`,highlight:[5,6,9,10,14,15,16,17,18,19,21,22,23]},{language:"go",filename:"infer_onnx.go",note:"Go + ONNX Runtime — load a pre-trained ONNX model, run inference. For real-time serving in Go microservices. File types: .go → binary; .onnx model file.",code:`package main

import (
        "fmt"
        "os"

        "github.com/yalue/onnxruntime"
)

func main() {
        // Initialise ONNX Runtime (loads the shared library)
        onnxruntime.InitializeONNXRuntime()
        defer onnxruntime.CleanupONNXRuntime()

        // Load pre-trained model (exported from scikit-learn via skl2onnx)
        model, err := onnxruntime.NewSession(
                "linear_regression.onnx",
                "input", []int64{1, 3},  // 1 sample, 3 features
                "output", []int64{1, 1}, // 1 prediction
        )
        if err != nil {
                fmt.Fprintf(os.Stderr, "Failed to load model: %v\\n", err)
                os.Exit(1)
        }
        defer model.Destroy()

        // Run inference — single sample [customer_ltv=1200, region=1, segment=0]
        input := []float32{1200.0, 1.0, 0.0}
        output, err := model.Predict(input)
        if err != nil {
                fmt.Fprintf(os.Stderr, "Inference failed: %v\\n", err)
                os.Exit(1)
        }

        fmt.Printf("Input:  %v\\n", input)
        fmt.Printf("Output: predicted revenue = \xa3%.2f\\n", output[0])
        fmt.Println("Model: linear_regression.onnx (ONNX format, language-agnostic)")
}

// Compile: go build -o infer_onnx
// Model exported from Python: python -c "import skl2onnx; skl2onnx.to_onnx(model, 'linear_regression.onnx')"
// Same .onnx model runs in Python, Go, Rust, Java, C++ — universal format.`,highlight:[9,10,14,15,16,17,18,19,26,27,28,29,30,33,34,35]}]})}),(0,t.jsx)(a.SectionCard,{title:"MLflow — experiment tracking + model registry (ADR-020)",description:"Every training run logs params, metrics, artifacts. Every model gets a version + stage. Rollback is a stage transition.",icon:(0,t.jsx)(v.Database,{className:"h-5 w-5"}),children:(0,t.jsx)(o.CodeBlock,{language:"python",filename:"mlflow_lifecycle.py",code:`# MLflow lifecycle — the 4 commands that govern ML

# 1. TRACK — log every training run
with mlflow.start_run(run_name="lr_revenue_v2"):
    mlflow.log_param("model_type", "XGBoost")
    mlflow.log_param("n_estimators", 100)
    mlflow.log_metric("rmse", 12.34)
    mlflow.log_metric("r2", 0.95)
    mlflow.sklearn.log_model(model, "model")

# 2. REGISTER — promote a run to the model registry
client = mlflow.tracking.MlflowClient()
client.create_registered_model("revenue_predictor")
client.create_model_version(
    name="revenue_predictor",
    source=f"runs:/{run_id}/model",
    tags={"framework": "sklearn", "dataset": "fct_orders_v3"},
)

# 3. PROMOTE — move versions through stages
client.transition_model_version_stage(
    name="revenue_predictor",
    version=2,
    stage="Staging",      # None → Staging → Production → Archived
)

# 4. SERVE — load production model for inference
import mlflow.pyfunc
model = mlflow.pyfunc.load_model(
    model_uri="models:/revenue_predictor/Production"
)
predictions = model.predict(new_data)`,highlight:[3,4,5,6,7,8,9,12,13,14,15,20,21,22,23,27,28,29,31,32]})}),(0,t.jsx)(a.SectionCard,{title:"My deeper thought: the lakehouse IS the ML platform",description:"Data platforms and ML platforms are converging. The lakehouse (Bronze→Silver→Gold + Arrow + Iceberg) IS the ML infrastructure — features are Gold tables, training reads from them, serving writes back to them.",icon:(0,t.jsx)(x.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsx)("p",{children:"Five years ago, you needed separate infrastructure for data engineering (Spark + S3 + Hive) and ML (TensorFlow + GPU clusters + model servers). Two platforms, two teams, two governance models, two pipelines. Features were copy-pasted from the data warehouse to the ML feature store — a fragile, drift-prone process."}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The lakehouse convergence eliminates this split."})," Features are Gold tables in Iceberg (ADR-013). Training reads them via DuckDB (ADR-014) or Polars (ADR-018) — same Arrow format, zero-copy. Serving writes predictions back to a new Gold table. The feature store IS the Gold layer; the model registry IS MLflow; the training pipeline IS dbt + Spark. One platform, one governance, one format."]}),(0,t.jsx)("p",{children:"The ML Platform page you're reading is the bridge. It doesn't introduce new infrastructure — it documents how the existing platform's Gold tables, Arrow format, CI/CD pipeline, and governance controls serve the ML lifecycle. The ML platform doesn't need a separate team; it needs the data engineering team to understand the ML lifecycle and serve it."}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The Pyodide demo on this page is the proof."})," The linear regression trains on the same Bronze→Silver→Gold pattern that powers BI dashboards. The gradient descent loop is the same pattern that powers the Thompson sampling bandit (ADR-019). The model registry is the same versioning pattern that powers dbt slim CI (ADR-006). One platform, many uses."]})]})}),(0,t.jsx)(a.SectionCard,{title:"Free tier matrix — ML without a credit card",description:"Most of the ML stack has a serious free tier. Start here.",icon:(0,t.jsx)(g.Cloud,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Service"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Free tier"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground",children:"Link"})]})}),(0,t.jsx)("tbody",{children:N.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 text-xs font-semibold",children:e.service}),(0,t.jsx)("td",{className:"px-3 py-2 text-[11px] text-emerald-600 dark:text-emerald-400",children:e.free}),(0,t.jsx)("td",{className:"px-3 py-2 text-[11px] font-mono text-muted-foreground",children:e.link})]},e.service))})]})})}),(0,t.jsxs)(p.DeeperThoughtSection,{pageTitle:"Machine Learning Platform",children:[(0,t.jsx)(p.DeeperThought,{title:"Machine Learning Platform IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Machine Learning Platform is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Machine Learning Platform connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Machine Learning Platform sits in the computational-science landscape."})}),(0,t.jsx)(p.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Machine Learning Platform) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(p.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(p.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(p.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(i.ResearchDemo,{pageId:"ml-platform"}),(0,t.jsx)(n.TrendAnticipation,{pageId:"ml-platform"}),(0,t.jsx)(s.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"knowledge",reason:"Continue to knowledge — see also from this page"},{id:"polars",reason:"Continue to polars — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(r.default,{href:(0,c.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ See ADR-020 (MLflow) + ADR-019 (bandit as recommendation engine)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,c.hrefFor)("polars"),className:"text-sm text-primary hover:underline",children:"→ Polars vs DuckDB vs Pandas (feature engineering tools)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,c.hrefFor)("databricks"),className:"text-sm text-primary hover:underline",children:"→ Databricks (Feature Store + MLlib native)"})]})]})}e.s(["MlPlatformPage",()=>S])}]);