(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,516143,e=>{"use strict";var t=e.i(843476),a=e.i(271645),r=e.i(522016),s=e.i(862824),i=e.i(716675),n=e.i(194058),l=e.i(342046),o=e.i(332017),d=e.i(206075),c=e.i(901752),m=e.i(487486),p=e.i(519455);let u={python:`# Python version is generated dynamically by buildTrainCode()
# in ml-playground.tsx based on the reader's hyperparameter choices.
# It's the primary version — runs in-browser via Pyodide + scikit-learn.
# See the "Train BDT" button output above for the actual Python code.
# Key libraries: numpy (arrays), scikit-learn (GradientBoostingClassifier),
# scipy.stats (evaluation), json (output for AnalysisChart).`,r:`# R — gradient boosting via gbm + caret packages
# R is the lingua franca of statistics. The gbm package (Ridgeway 2007)
# is the canonical BDT implementation; caret provides a uniform interface.

library(gbm)
library(caret)
library(pROC)
library(jsonlite)

set.seed(42)

# Generate synthetic data (LHC jet tagging — quark vs gluon)
n_sig <- 3000; n_bg <- 3000
X_sig <- matrix(rnorm(n_sig * 8, mean = 0), nrow = n_sig) +
         matrix(rep(c(0.8, 0.4, -0.2, 0.6, 0.3, -0.1, 0.5, -0.3), n_sig),
                nrow = n_sig, byrow = TRUE)
X_bg  <- matrix(rnorm(n_bg * 8, mean = 0),  nrow = n_bg)  +
         matrix(rep(c(-0.5, -0.3, 0.4, -0.4, -0.2, 0.2, -0.3, 0.2), n_bg),
                nrow = n_bg, byrow = TRUE)
X <- rbind(X_sig, X_bg)
y <- c(rep(1, n_sig), rep(0, n_bg))

# Train/test split (70/30)
idx <- sample(seq_along(y))
n_train <- as.integer(0.7 * length(y))
train_idx <- idx[1:n_train]
test_idx  <- idx[(n_train + 1):length(y)]

# Train BDT via gbm
# Hyperparameters (matching the Python version):
#   n.trees = 100, interaction.depth = 3, shrinkage = 0.1
t0 <- Sys.time()
model <- gbm(y ~ ., data = data.frame(X[train_idx,], y = y[train_idx]),
             distribution = "bernoulli",
             n.trees = 100, interaction.depth = 3, shrinkage = 0.1,
             bag.fraction = 0.8, verbose = FALSE)
train_time <- as.numeric(difftime(Sys.time(), t0, units = "secs"))

# Predict + ROC
y_score <- predict(model, newdata = data.frame(X[test_idx,]),
                   n.trees = 100, type = "response")
roc_obj <- roc(y[test_idx], y_score, quiet = TRUE)
auc_val <- as.numeric(auc(roc_obj))

# Confusion matrix at threshold = 0.5
y_pred <- as.integer(y_score > 0.5)
cm <- table(Actual = y[test_idx], Predicted = y_pred)
TP <- cm["1", "1"]; TN <- cm["0", "0"]
FP <- cm["0", "1"]; FN <- cm["1", "0"]
precision <- TP / (TP + FP)
recall    <- TP / (TP + FN)
f1        <- 2 * precision * recall / (precision + recall)

cat(sprintf("AUC = %.4f\\n", auc_val))
cat(sprintf("Precision = %.4f, Recall = %.4f, F1 = %.4f\\n",
           precision, recall, f1))
cat(sprintf("Training time: %.2fs\\n", train_time))

# Feature importance
imp <- summary.gbm(model, plotit = FALSE)
print(imp[order(-imp$rel.inf), ])

# Key insight: gbm's interaction.depth parameter is the same as scikit-learn's
# max_depth. R statisticians prefer caret::train() for hyperparameter tuning
# via cross-validation; Python users prefer GridSearchCV. Same math, different
# ergonomics. R's formula interface (y ~ .) is more concise than Python's
# explicit X/y split — a 30-year tradition from S/R.`,scala:`// Scala — Spark MLlib GBTClassifier for distributed ML
// Scala + Spark is the production stack at scale: LinkedIn, Netflix, Uber.
// The same BDT runs on a laptop (Pyodide) or a 1000-node cluster (Spark).

import org.apache.spark.ml.Pipeline
import org.apache.spark.ml.classification.GBTClassifier
import org.apache.spark.ml.evaluation.{BinaryClassificationEvaluator, MulticlassClassificationEvaluator}
import org.apache.spark.ml.feature.{VectorAssembler, StringIndexer}
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

val spark = SparkSession.builder().appName("ML Playground BDT").master("local[*]").getOrCreate()
import spark.implicits._

// Generate synthetic data (LHC jet tagging — quark vs gluon)
val nSig = 3000; val nBg = 3000
val sigDF = spark.range(nSig).select(
  randn() + 0.8 as "f0", randn() + 0.4 as "f1", randn() - 0.2 as "f2",
  randn() + 0.6 as "f3", randn() + 0.3 as "f4", randn() - 0.1 as "f5",
  randn() + 0.5 as "f6", randn() - 0.3 as "f7", lit(1.0) as "label"
)
val bgDF = spark.range(nBg).select(
  randn() - 0.5 as "f0", randn() - 0.3 as "f1", randn() + 0.4 as "f2",
  randn() - 0.4 as "f3", randn() - 0.2 as "f4", randn() + 0.2 as "f5",
  randn() - 0.3 as "f6", randn() + 0.2 as "f7", lit(0.0) as "label"
)
val data = sigDF.union(bgDF)

// Assemble features into a single vector column (Spark MLlib convention)
val assembler = new VectorAssembler()
  .setInputCols(Array("f0","f1","f2","f3","f4","f5","f6","f7"))
  .setOutputCol("features")

val labelIndexer = new StringIndexer().setInputCol("label").setOutputCol("indexedLabel")

// Train GBTClassifier — Spark's gradient-boosted trees
// Hyperparameters matching the Python version:
//   maxIter = 100 (n_estimators), maxDepth = 3, stepSize = 0.1 (learning_rate)
val gbt = new GBTClassifier()
  .setLabelCol("indexedLabel")
  .setFeaturesCol("features")
  .setMaxIter(100)
  .setMaxDepth(3)
  .setStepSize(0.1)
  .setSubsamplingRate(0.8)

val pipeline = new Pipeline().setStages(Array(assembler, labelIndexer, gbt))

// Train/test split (70/30)
val Array(train, test) = data.randomSplit(Array(0.7, 0.3), seed = 42L)

val t0 = System.nanoTime()
val model = pipeline.fit(train)
val trainTime = (System.nanoTime() - t0) / 1e9

// Predict + evaluate
val predictions = model.transform(test)
val binaryEval = new BinaryClassificationEvaluator()
  .setLabelCol("indexedLabel")
  .setRawPredictionCol("rawPrediction")
val auc = binaryEval.evaluate(predictions)

val multiEval = new MulticlassClassificationEvaluator()
  .setLabelCol("indexedLabel")
  .setPredictionCol("prediction")
  .setMetricName("f1")
val f1 = multiEval.evaluate(predictions)

println(f"AUC = $auc%.4f")
println(f"F1  = $f1%.4f")
println(f"Training time: $trainTime%.2fs")

// Feature importance
val gbtModel = model.stages(2).asInstanceOf[org.apache.spark.ml.classification.GBTClassificationModel]
gbtModel.featureImportances.toArray.zipWithIndex
  .sortBy(-_._1).foreach { case (imp, i) => println(f"feature_$i%d: $imp%.4f") }

// Key insight: Spark's GBTClassifier is mathematically identical to
// scikit-learn's GradientBoostingClassifier. The difference is distributed
// vs single-node. Same hyperparameters (maxIter = n_estimators, maxDepth =
// max_depth, stepSize = learning_rate). Spark adds subsamplingRate (= 0.8,
// matching Python's subsample=0.8). The practicing DS who knows Pyodide
// also knows Spark — only the syntax changes, not the math.`,sql:`-- SQL — BigQuery ML for in-warehouse ML
-- BigQuery ML trains models directly inside the data warehouse — no data
-- movement, no separate ML server. The DBA's preferred way to do ML.

-- Step 1: Create the training table (synthetic LHC jet tagging data)
-- In production, this would be a real table partitioned by event_date
CREATE OR REPLACE TABLE ml_playground.lhc_jets (
  tau21 FLOAT64, tau32 FLOAT64, jet_mass FLOAT64, pt FLOAT64,
  delta_r_12 FLOAT64, delta_r_23 FLOAT64, ecf FLOAT64, b_tag FLOAT64,
  label INT64  -- 1 = quark jet (signal), 0 = gluon jet (background)
) AS
SELECT
  randn() + 0.8 AS tau21, randn() + 0.4 AS tau32,
  randn() - 0.2 AS jet_mass, randn() + 0.6 AS pt,
  randn() + 0.3 AS delta_r_12, randn() - 0.1 AS delta_r_23,
  randn() + 0.5 AS ecf, randn() - 0.3 AS b_tag,
  1 AS label
FROM UNNEST(GENERATE_ARRAY(1, 3000))
UNION ALL
SELECT
  randn() - 0.5 AS tau21, randn() - 0.3 AS tau32,
  randn() + 0.4 AS jet_mass, randn() - 0.4 AS pt,
  randn() - 0.2 AS delta_r_12, randn() + 0.2 AS delta_r_23,
  randn() - 0.3 AS ecf, randn() + 0.2 AS b_tag,
  0 AS label
FROM UNNEST(GENERATE_ARRAY(1, 3000));

-- Step 2: Train a boosted-tree classifier
-- Hyperparameters matching the Python version:
--   num_boost_round = 100 (n_estimators), max_depth = 3, learn_rate = 0.1
CREATE OR REPLACE MODEL ml_playground.bdt_lhc_jets
OPTIONS(
  model_type = 'BOOSTED_TREE_CLASSIFIER',
  num_boost_round = 100,
  max_depth = 3,
  learn_rate = 0.1,
  subsample = 0.8,             -- matches Python subsample=0.8
  input_label_cols = ['label'],
  data_split_method = 'AUTO_SPLIT',
  data_split_eval_fraction = 0.3,  -- 30% test set
  data_split_method = 'AUTO_SPLIT'
) AS
SELECT * FROM ml_playground.lhc_jets;

-- Step 3: Evaluate the model — ROC AUC + confusion matrix
SELECT
  *
FROM
  ML.EVALUATE(MODEL ml_playground.bdt_lhc_jets,
              (SELECT * FROM ml_playground.lhc_jets));

-- Step 4: Predict on the test set (threshold = 0.5 by default)
SELECT
  label AS actual,
  predicted_label AS predicted,
  predicted_label_probs[OFFSET(1)] AS prob_signal
FROM
  ML.PREDICT(MODEL ml_playground.bdt_lhc_jets,
             (SELECT * FROM ml_playground.lhc_jets))
LIMIT 100;

-- Step 5: Feature importance (BigQuery ML exposes this automatically)
SELECT
  *
FROM
  ML.FEATURE_IMPORTANCE(MODEL ml_playground.bdt_lhc_jets)
ORDER BY importance_weight DESC;

-- Key insight: BigQuery ML's BOOSTED_TREE_CLASSIFIER is the same algorithm
-- as scikit-learn's GradientBoostingClassifier — same hyperparameters, same
-- math, same output. The difference is WHERE it runs: scikit-learn on a
-- laptop, BigQuery on Google's warehouse (with 1000s of CPUs in parallel).
-- AUC, ROC, confusion matrix — all identical. The SQL is verbose but the
-- practicing DS who can read scikit-learn can read this.`,julia:`# Julia — MLJ.jl for machine learning
# Julia is the language of numerical computing — MATLAB speed with Python syntax.
# MLJ.jl (Machine Learning in Julia) is the unified ML ecosystem.

using MLJ
using MLJBase
using StableRNGs
using Statistics
using Printf

# Generate synthetic data (LHC jet tagging — quark vs gluon)
rng = StableRNG(42)
n_sig = 3000; n_bg = 3000
n_features = 8

X_sig = randn(rng, n_sig, n_features) .+ [0.8 0.4 -0.2 0.6 0.3 -0.1 0.5 -0.3]
X_bg  = randn(rng, n_bg,  n_features) .+ [-0.5 -0.3 0.4 -0.4 -0.2 0.2 -0.3 0.2]
X = vcat(X_sig, X_bg)
y = vcat(ones(n_sig), zeros(n_bg))

# Train/test split (70/30)
n = length(y)
idx = randperm(rng, n)
n_train = floor(Int, 0.7n)
train_idx = idx[1:n_train]
test_idx  = idx[n_train+1:end]

# Load the GradientBoostingClassifier from MLJ (scikit-learn interface)
# Hyperparameters matching the Python version:
#   n_estimators = 100, max_depth = 3, learning_rate = 0.1
BDT = @load GradientBoostingClassifier pkg=ScikitLearn verbosity=0
model = BDT(n_estimators = 100,
            max_depth = 3,
            learning_rate = 0.1,
            subsample = 0.8,
            random_state = 42)

# Wrap in a machine (MLJ's term for a fitted model + data)
mach = machine(model, X, y)

# Train + time
t0 = time()
fit!(mach, rows = train_idx, verbosity = 0)
train_time = time() - t0

# Predict + ROC
y_score = MLJ.predict(mach, X[test_idx, :])  # returns probability of class 1
y_pred  = mode.(y_score)  # hard prediction at threshold 0.5

# AUC via trapz integration of ROC curve
fpr, tpr, _ = roc(y[test_idx], pdf.(y_score, 1))
auc_val = trapz(fpr, tpr)

# Confusion matrix
TP = sum((y[test_idx] .== 1) .& (y_pred .== 1))
TN = sum((y[test_idx] .== 0) .& (y_pred .== 0))
FP = sum((y[test_idx] .== 0) .& (y_pred .== 1))
FN = sum((y[test_idx] .== 1) .& (y_pred .== 0))
precision = TP / (TP + FP)
recall    = TP / (TP + FN)
f1        = 2 * precision * recall / (precision + recall)

@printf("AUC = %.4f\\n", auc_val)
@printf("Precision = %.4f, Recall = %.4f, F1 = %.4f\\n", precision, recall, f1)
@printf("Training time: %.2fs\\n", train_time)

# Feature importance (via permutation importance — Julia idiom)
fi = feature_importance(mach, X[test_idx, :], y[test_idx])
println("Feature importance:")
for (name, imp) in sort(fi, by = x -> -x[2])
    println("  $name: $(round(imp, digits=4))")
end

# Key insight: Julia's MLJ.jl is a unified interface that wraps scikit-learn
# (via PyCall.jl), XGBoost.jl, and pure-Julia implementations under one API.
# The @load macro handles package installation automatically. Julia's
# multiple dispatch means the SAME fit!() call works for any model —
# unlike Python where each library has its own .fit() signature. Speed:
# Julia compiles to native code, so the second call to fit!() is ~10x
# faster than the first (JIT warmup). Python+Pyodide can't match this.`};var h=e.i(455711),g=e.i(966992),f=e.i(283086),x=e.i(286536),b=e.i(972520),y=e.i(39312),v=e.i(620278),_=e.i(852008),j=e.i(431343),T=e.i(367240),N=e.i(842009),C=e.i(635408),w=e.i(971005),w=w,A=e.i(16737),S=e.i(934686),S=S,k=e.i(356909),L=e.i(341240),F=e.i(878357),P=e.i(758472),E=e.i(716400);let R=[{id:"lhc",name:"LHC Jet Tagging (quark vs gluon)",description:"8 jet substructure features. Signal: quark jets. Background: gluon jets. AUC target: >0.82.",nFeatures:8,featureNames:["τ21","τ32","Jet mass","pT","ΔR(12)","ΔR(23)","ECF","b-tag"],accent:"oklch(0.65 0.18 250)"},{id:"genomics",name:"Genomics Variant Calling (pathogenic vs benign)",description:"10 variant annotation features. Signal: pathogenic. Background: benign. AUC target: >0.90.",nFeatures:10,featureNames:["Conservation","MAF","SIFT","PolyPhen","CADD","GERP","PhyloP","PhastCons","REVEL","MutTaster"],accent:"oklch(0.65 0.18 140)"},{id:"finance",name:"Finance Fraud Detection (fraud vs legitimate)",description:"12 transaction features. Signal: fraud. Background: legitimate. AUC target: >0.85. 1:1000 class imbalance in production.",nFeatures:12,featureNames:["Amount","Time","Merchant_risk","Card_freq","Distance","Velocity","Device_new","IP_mismatch","Tx_count_1h","Failed_attempts","Avg_dev","Behavior"],accent:"oklch(0.65 0.18 30)"}],D=[{id:"conservative",label:"Conservative",description:"50 trees, depth 2, lr 0.05. Fast, low-overfit baseline.",icon:function(e){return(0,t.jsx)(_.Layers,{className:e.className})},values:{nEstimators:50,maxDepth:2,learningRate:.05},color:"oklch(0.65 0.15 220)"},{id:"sweet-spot",label:"Sweet Spot",description:"100 trees, depth 3, lr 0.1. Standard BDT config (recommended).",icon:v.Target,values:{nEstimators:100,maxDepth:3,learningRate:.1},color:"oklch(0.65 0.18 145)"},{id:"aggressive",label:"Aggressive",description:"300 trees, depth 5, lr 0.05. Slow but high AUC.",icon:y.Zap,values:{nEstimators:300,maxDepth:5,learningRate:.05},color:"oklch(0.65 0.20 30)"},{id:"overfit",label:"Overfit Demo",description:"500 trees, depth 10, lr 0.3. Train AUC ≈ 1.0, test AUC collapses.",icon:C.TrendingDown,values:{nEstimators:500,maxDepth:10,learningRate:.3},color:"oklch(0.65 0.20 0)"}];function B({latex:e}){let a;try{a=E.default.renderToString(e,{throwOnError:!1,displayMode:!0})}catch{a=`<code class="font-mono text-xs">${e.replace(/</g,"&lt;")}</code>`}return(0,t.jsx)("div",{className:"text-sm overflow-x-auto py-1",dangerouslySetInnerHTML:{__html:a}})}function M({label:e,value:a,min:r,max:s,step:i,onChange:n,description:l}){return(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsx)("label",{className:"text-[11px] font-medium",children:e}),(0,t.jsx)("span",{className:"text-[11px] font-mono font-bold text-primary",children:a})]}),(0,t.jsx)("input",{type:"range",min:r,max:s,step:i,value:a,onChange:e=>n(parseFloat(e.target.value)),className:"w-full h-2 rounded-lg appearance-none cursor-pointer bg-muted accent-primary"}),(0,t.jsx)("p",{className:"text-[9px] text-muted-foreground",children:l})]})}let U="ml_playground_saved_runs";function O(){try{let e=localStorage.getItem(U);return e?JSON.parse(e):[]}catch{return[]}}let I=[{id:"mathematics",label:"Mathematics of BDT",icon:w.default},{id:"controls",label:"Hyperparameter Controls",icon:g.Cpu},{id:"train",label:"Train & Evaluate",icon:j.Play},{id:"tradeoffs",label:"Tradeoff Hints",icon:L.Lightbulb},{id:"why",label:"Why this matters",icon:f.Sparkles},{id:"thoughts",label:"My Deeper Thoughts",icon:h.Brain},{id:"journey",label:"Cross-Domain Journey",icon:N.Award}],H=[{label:"Model type",value:"BDT (XGBoost-style)",hint:"GradientBoostingClassifier from scikit-learn. Runs in-browser via Pyodide + micropip.",deltaTone:"up"},{label:"Datasets",value:"3",hint:"LHC jets (8 features), genomics variants (10 features), finance fraud (12 features). Switch between them.",deltaTone:"up"},{label:"Hyperparameters",value:"4 adjustable + 4 presets",hint:"n_estimators, max_depth, learning_rate, feature selection. Plus 1-click presets: Conservative / Sweet / Aggressive / Overfit.",deltaTone:"up"},{label:"Output charts",value:"4 per run",hint:"ROC (train vs test), Feature importance, Confusion matrix, Loss curve (train vs test). All interactive (Recharts).",deltaTone:"up"}];function X(){let[e,y]=(0,a.useState)("lhc"),[v,_]=(0,a.useState)(100),[C,E]=(0,a.useState)(3),[X,G]=(0,a.useState)(.1),[$,J]=(0,a.useState)(Array(8).fill(!0)),[q,z]=(0,a.useState)(null),[V,Q]=(0,a.useState)(null),[W,Y]=(0,a.useState)(!1),[K,Z]=(0,a.useState)([]),[ee,et]=(0,a.useState)(!1),[ea,er]=(0,a.useState)("hide"),es=R.find(t=>t.id===e),ei=(0,a.useMemo)(()=>(function(e){let{dataset:t,nEstimators:a,maxDepth:r,learningRate:s,selectedFeatures:i}=e,n=R.find(e=>e.id===t),l=i.map((e,t)=>e?t:-1).filter(e=>e>=0),o=`[${l.join(", ")}]`,d=l.length,c=l.map(e=>n.featureNames[e]),m={lhc:`X_sig = np.random.randn(3000, 8) + np.array([0.8, 0.4, -0.2, 0.6, 0.3, -0.1, 0.5, -0.3])
X_bg = np.random.randn(3000, 8) + np.array([-0.5, -0.3, 0.4, -0.4, -0.2, 0.2, -0.3, 0.2])`,genomics:`X_sig = np.random.randn(3000, 10) + np.array([1.2, -0.8, 0.6, 0.9, -0.5, 0.7, -0.3, 0.4, 0.5, -0.6])
X_bg = np.random.randn(3000, 10) + np.array([-0.4, 0.3, -0.2, -0.3, 0.2, -0.3, 0.1, -0.2, -0.2, 0.2])`,finance:`X_sig = np.random.randn(3000, 12) + np.array([1.5, 0.8, -0.6, 1.2, 0.9, -0.4, 0.7, -0.3, 0.5, 0.8, -0.5, 0.6])
X_bg = np.random.randn(3000, 12) + np.array([-0.3, -0.2, 0.1, -0.2, -0.2, 0.1, -0.1, 0.1, -0.1, -0.2, 0.1, -0.1])`};return`# ML Playground — Interactive BDT Training
# Hyperparameters (reader-adjusted):
#   n_estimators = ${a}
#   max_depth = ${r}
#   learning_rate = ${s}
#   dataset = ${n.name}
#   features = ${d} of ${n.nFeatures} selected

import numpy as np, json, time
np.random.seed(42)

# Generate synthetic data
${m[t]}
X = np.vstack([X_sig, X_bg])
y = np.concatenate([np.ones(3000), np.zeros(3000)])

# Select features
X = X[:, ${o}]

# Train/test split (70/30)
idx = np.random.permutation(len(y))
n_train = int(0.7 * len(y))
X_train, X_test = X[idx[:n_train]], X[idx[n_train:]]
y_train, y_test = y[idx[:n_train]], y[idx[n_train:]]

# Train BDT
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import roc_curve, auc, confusion_matrix

t0 = time.time()
model = GradientBoostingClassifier(
    n_estimators=${a},
    max_depth=${r},
    learning_rate=${s},
    random_state=42,
    subsample=0.8,
)
model.fit(X_train, y_train)
train_time = time.time() - t0

# Evaluate
y_score = model.predict_proba(X_test)[:, 1]
y_train_score = model.predict_proba(X_train)[:, 1]
fpr, tpr, _ = roc_curve(y_test, y_score)
fpr_tr, tpr_tr, _ = roc_curve(y_train, y_train_score)
auc_val = auc(fpr, tpr)
auc_tr = auc(fpr_tr, tpr_tr)
y_pred = model.predict(X_test)
cm = confusion_matrix(y_test, y_pred)
tn, fp, fn, tp = cm.ravel()
precision = tp / (tp + fp) if (tp + fp) > 0 else 0
recall = tp / (tp + fn) if (tp + fn) > 0 else 0
f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0

# Loss curve (binomial deviance) — train and test
loss = model.train_score_.tolist()
# Approximate test loss using staged_predict_proba
test_loss = []
for s_pred in model.staged_predict_proba(X_test):
    # Binomial deviance: -mean(y*log(p) + (1-y)*log(1-p))
    p = np.clip(s_pred[:, 1], 1e-15, 1 - 1e-15)
    test_loss.append(float(-np.mean(y_test * np.log(p) + (1 - y_test) * np.log(1 - p))))

# Feature importance
imp = model.feature_importances_.tolist()
feat_names = ${JSON.stringify(c)}
imp_pairs = sorted(zip(feat_names, imp), key=lambda x: -x[1])

# ============================
# Chart 1: ROC curve (test + train)
# ============================
roc_chart = {
    "chart_type": "line",
    "title": "ROC Curve — Test vs Train (" + f"AUC={auc_val:.4f}" + ")",
    "x_label": "False positive rate",
    "y_label": "True positive rate",
    "series": [
        {"name": f"Test (AUC={auc_val:.4f})", "data": [{"x": float(f), "y": float(t)} for f, t in zip(fpr, tpr)]},
        {"name": f"Train (AUC={auc_tr:.4f})", "data": [{"x": float(f), "y": float(t)} for f, t in zip(fpr_tr, tpr_tr)], "dashed": True},
    ],
    "stats": [
        {"label": "Test AUC", "value": f"{auc_val:.4f}", "tone": "success" if auc_val > 0.85 else "warning"},
        {"label": "Train AUC", "value": f"{auc_tr:.4f}", "tone": "default"},
        {"label": "Overfit gap", "value": f"{auc_tr - auc_val:+.4f}", "tone": "danger" if (auc_tr - auc_val) > 0.05 else "default"},
        {"label": "Training time", "value": f"{train_time:.2f}s", "tone": "default"},
        {"label": "n_estimators", "value": str(${a}), "tone": "default"},
        {"label": "max_depth", "value": str(${r}), "tone": "default"},
        {"label": "learning_rate", "value": str(${s}), "tone": "default"},
    ],
    "reference_lines": [{"y": 0, "label": "Random (AUC=0.5)", "color": "#94a3b8"}, {"diagonal": True, "label": "", "color": "#94a3b8"}],
    "summary": f"BDT with ${a} trees, depth ${r}, lr ${s}. Test AUC={auc_val:.4f}, Train AUC={auc_tr:.4f}. The gap (Train-Test) is the OVERFITTING signal — gap>0.05 means the model is memorising noise. Compare the two curves: if they diverge at high TPR, you've overfit. Training took {train_time:.2f}s in your browser."
}

# ============================
# Chart 2: Feature importance (sorted bar)
# ============================
imp_chart = {
    "chart_type": "bar",
    "title": "Feature Importance — which features drive the BDT?",
    "x_label": "Feature",
    "y_label": "Importance (sum=1.0)",
    "series": [{"name": "Importance", "data": [{"x": n, "y": float(v)} for n, v in imp_pairs]}],
    "stats": [
        {"label": "Top feature", "value": imp_pairs[0][0], "tone": "success"},
        {"label": "Top importance", "value": f"{imp_pairs[0][1]:.3f}", "tone": "default"},
        {"label": "Top-3 cumulative", "value": f"{sum(v for _, v in imp_pairs[:3]):.2%}", "tone": "default"},
        {"label": "Features used", "value": str(${d}), "tone": "default"},
    ],
    "summary": f"The BDT's feature_importances_ attribute shows how much each feature contributed. Top-3 features carry {sum(v for _, v in imp_pairs[:3]):.0%} of total importance — the Pareto principle in ML. In production you'd drop the bottom 30% of features and retrain: simpler model, ~same AUC."
}

# ============================
# Chart 3: Confusion matrix (heatmap-style bar)
# ============================
cm_chart = {
    "chart_type": "bar",
    "title": "Confusion Matrix (test set, threshold=0.5)",
    "x_label": "Cell",
    "y_label": "Count",
    "series": [{"name": "Confusion", "data": [
        {"x": "TP (signal, predicted signal)", "y": int(tp)},
        {"x": "TN (bg, predicted bg)", "y": int(tn)},
        {"x": "FP (bg, predicted signal)", "y": int(fp)},
        {"x": "FN (signal, predicted bg)", "y": int(fn)},
    ]}],
    "stats": [
        {"label": "Precision", "value": f"{precision:.4f}", "tone": "success" if precision > 0.8 else "warning"},
        {"label": "Recall (TPR)", "value": f"{recall:.4f}", "tone": "success" if recall > 0.8 else "warning"},
        {"label": "F1 score", "value": f"{f1:.4f}", "tone": "default"},
        {"label": "Test size", "value": f"{len(y_test)}", "tone": "default"},
    ],
    "summary": f"At the default 0.5 threshold: TP={tp}, TN={tn}, FP={fp}, FN={fn}. Precision={precision:.2%} (of all predicted signal, how many were real). Recall={recall:.2%} (of all real signal, how many you caught). For LHC, recall is more important than precision (you don't want to lose Higgs events). For fraud, precision matters (false positives cost customer trust)."
}

# ============================
# Chart 4: Loss curve (train vs test)
# ============================
loss_chart = {
    "chart_type": "line",
    "title": "Loss Curve — binomial deviance per tree",
    "x_label": "Iteration (tree #)",
    "y_label": "Binomial deviance",
    "series": [
        {"name": "Train loss", "data": [{"x": i, "y": float(l)} for i, l in enumerate(loss)]},
        {"name": "Test loss", "data": [{"x": i, "y": float(l)} for i, l in enumerate(test_loss)], "dashed": True},
    ],
    "stats": [
        {"label": "Final train loss", "value": f"{loss[-1]:.4f}", "tone": "default"},
        {"label": "Final test loss", "value": f"{test_loss[-1]:.4f}", "tone": "default"},
        {"label": "Min test loss", "value": f"{min(test_loss):.4f} @ iter {test_loss.index(min(test_loss))}", "tone": "success"},
        {"label": "Overfitting?", "value": "Yes" if test_loss[-1] > min(test_loss) * 1.05 else "No", "tone": "danger" if test_loss[-1] > min(test_loss) * 1.05 else "success"},
    ],
    "summary": f"Train loss decreases monotonically (boosting always fits residuals). Test loss decreases THEN FLATLINES (or rises) — the inflection point is the optimal number of trees. Past that, you're adding trees that memorise noise. If min_test_loss << final_test_loss, you should use early stopping (or reduce n_estimators)."
}

# Emit ALL FOUR charts as a single JSON array — the page parses and shows each
print(json.dumps([
    roc_chart,
    imp_chart,
    cm_chart,
    loss_chart,
]))`})({dataset:e,nEstimators:v,maxDepth:C,learningRate:X,selectedFeatures:$}),[e,v,C,X,$]);(0,a.useEffect)(()=>{Z(O())},[]);let en=e=>{_(e.values.nEstimators),E(e.values.maxDepth),G(e.values.learningRate)},el=q?parseFloat(q[0]?.stats?.find(e=>"Test AUC"===e.label)?.value??"0"):null;return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(s.PageHeader,{eyebrow:"Phase 6 — Interactive ML training in-browser",title:"ML Playground — Train Your Own BDT",description:"Adjust hyperparameters via sliders, select features, choose a dataset, and click Train. The BDT (Gradient Boosting Decision Tree) runs in-browser via Pyodide + scikit-learn. FOUR charts update per run: ROC curve (train vs test), Feature importance, Confusion matrix, Loss curve. Every slider reveals a tradeoff — more trees = better AUC but slower; deeper trees = more capacity but overfitting. Use the 1-click presets (Conservative / Sweet Spot / Aggressive / Overfit Demo) to feel the tradeoffs in seconds.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(h.Brain,{className:"h-3 w-3"})," scikit-learn"]}),(0,t.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(g.Cpu,{className:"h-3 w-3"})," Pyodide"]}),(0,t.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(f.Sparkles,{className:"h-3 w-3"})," Interactive"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:H.map(e=>(0,t.jsx)(s.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsxs)("div",{className:"rounded-lg border border-border/60 bg-muted/20 p-3",children:[(0,t.jsxs)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(F.ListTree,{className:"h-3 w-3"})," Page map — where each section is attached"]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:I.map(e=>{let a=e.icon;return(0,t.jsxs)("a",{href:`#${e.id}`,className:"inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded border border-border/60 bg-background hover:bg-primary/10 hover:border-primary/40 transition-colors",children:[(0,t.jsx)(a,{className:"h-3 w-3 text-primary"}),(0,t.jsx)("span",{children:e.label})]},e.id)})})]}),(0,t.jsx)("div",{id:"mathematics",className:"scroll-mt-20",children:(0,t.jsx)(s.SectionCard,{title:"Mathematics of BDT — what the sliders actually control",description:"Gradient Boosting builds an additive model F_M(x) = Σ ν · h_m(x) by sequentially fitting each tree h_m to the negative gradient of the loss. Every slider here maps to a term in these equations.",icon:(0,t.jsx)(w.default,{className:"h-5 w-5"}),badge:"LaTeX",badgeVariant:"outline",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/40 bg-muted/20 p-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"1. Additive model (the boosting update rule)"}),(0,t.jsx)(B,{latex:"F_m(x) = F_{m-1}(x) + \\nu \\cdot h_m(x)"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1",children:"ν = learning_rate slider (0.01–1.0). h_m = the m-th decision tree. Each tree corrects the residual error of the ensemble so far. Smaller ν → need more trees (m_max = n_estimators slider)."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/40 bg-muted/20 p-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"2. Binomial deviance loss (what we minimise)"}),(0,t.jsx)(B,{latex:"L(y, F) = \\log\\!\\bigl(1 + e^{-2yF}\\bigr), \\quad y \\in \\{-1, +1\\}"}),(0,t.jsxs)("p",{className:"text-[10px] text-muted-foreground mt-1",children:["Equivalent to logistic-regression log-loss. The negative gradient (pseudo-residual) is ",(0,t.jsx)("span",{className:"font-mono",children:"r_m = 2y / (1 + e^(2yF))"})," — each tree fits this residual."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/40 bg-muted/20 p-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"3. Tree depth = interaction order"}),(0,t.jsx)(B,{latex:"h_m(x) = \\text{CART}(x;\\, \\text{depth} = d)"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1",children:"max_depth = d slider. A depth-3 tree can express 3-way feature interactions (e.g. “high pT AND low τ21 AND high b-tag”). Depth 1 = pure additive model (like logistic regression). Depth 10 = can memorise training noise."})]})]}),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/40 bg-muted/20 p-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"4. ROC curve & AUC"}),(0,t.jsx)(B,{latex:"\\text{AUC} = \\int_0^1 \\text{TPR}(\\text{FPR}^{-1}(t))\\, dt"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1",children:"TPR = TP / (TP + FN); FPR = FP / (FP + TN). AUC = probability that the model ranks a random signal higher than a random background. AUC = 0.5 = random; AUC = 1.0 = perfect."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/40 bg-muted/20 p-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"5. Confusion matrix → precision / recall / F1"}),(0,t.jsx)(B,{latex:"\\text{Precision} = \\frac{TP}{TP + FP}, \\quad \\text{Recall} = \\frac{TP}{TP + FN}"}),(0,t.jsx)(B,{latex:"F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1",children:"Threshold = 0.5 by default. For LHC you tune for HIGH recall (don't miss Higgs). For fraud detection you tune for HIGH precision (don't freeze customer cards)."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-primary mb-1",children:"Slider → math mapping (cheat sheet)"}),(0,t.jsxs)("ul",{className:"text-[11px] text-muted-foreground space-y-0.5 font-mono",children:[(0,t.jsx)("li",{children:"n_estimators → m (number of boosting rounds)"}),(0,t.jsx)("li",{children:"max_depth → d (interaction order in each tree)"}),(0,t.jsx)("li",{children:"learning_rate → ν (shrinkage on each tree)"}),(0,t.jsx)("li",{children:"feature selection → which x_i are visible to the CART splits"})]})]})]})]})})}),(0,t.jsx)("div",{id:"controls",className:"scroll-mt-20",children:(0,t.jsxs)(s.SectionCard,{title:"Hyperparameter Control Panel",description:"Adjust the sliders and feature selection, apply a preset, or roll random values. Then click Train below.",icon:(0,t.jsx)(g.Cpu,{className:"h-5 w-5"}),children:[(0,t.jsxs)("div",{className:"mb-4 space-y-2",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"1-click presets — each tells a story"}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-2",children:D.map(e=>{let a=e.icon,r=v===e.values.nEstimators&&C===e.values.maxDepth&&X===e.values.learningRate;return(0,t.jsxs)("button",{type:"button",onClick:()=>en(e),className:`rounded-md border p-2 text-left transition-all ${r?"border-primary bg-primary/10 shadow-sm":"border-border/60 bg-background hover:bg-muted/40"}`,style:r?{borderLeftWidth:3,borderLeftColor:e.color}:void 0,children:[(0,t.jsxs)("div",{className:"flex items-center gap-1.5 mb-0.5",children:[(0,t.jsx)(a,{className:"h-3.5 w-3.5",style:{color:e.color}}),(0,t.jsx)("span",{className:"text-[11px] font-semibold",children:e.label})]}),(0,t.jsx)("p",{className:"text-[9px] text-muted-foreground leading-tight",children:e.description})]},e.id)})}),(0,t.jsxs)("div",{className:"flex gap-2 mt-2",children:[(0,t.jsxs)(p.Button,{variant:"outline",size:"sm",onClick:()=>{let e=(e,t,a)=>{let r=Math.floor((t-e)/a)+1;return e+Math.floor(Math.random()*r)*a};_(e(10,500,10)),E(e(1,10,1)),G(parseFloat(e(.01,1,.01).toFixed(2)))},className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(A.Dice5,{className:"h-3 w-3"})," Roll random hyperparameters"]}),K.length>0&&(0,t.jsxs)(p.Button,{variant:"outline",size:"sm",onClick:()=>et(!ee),className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(S.default,{className:"h-3 w-3"})," Saved runs (",K.length,")"]})]}),ee&&K.length>0&&(0,t.jsx)("div",{className:"rounded-md border border-border/40 bg-muted/20 p-2 mt-2 space-y-1",children:K.map((e,a)=>(0,t.jsxs)("button",{type:"button",onClick:()=>{y(e.dataset),J(Array(R.find(t=>t.id===e.dataset).nFeatures).fill(!0)),_(e.nEstimators),E(e.maxDepth),G(e.learningRate),et(!1)},className:"w-full text-left text-[10px] font-mono px-2 py-1 rounded hover:bg-muted/60 flex justify-between gap-2",children:[(0,t.jsxs)("span",{children:[(0,t.jsxs)("span",{className:"text-muted-foreground",children:["[",new Date(e.ts).toLocaleString(),"]"]})," ",(0,t.jsx)("span",{className:"text-primary",children:e.dataset})," ",(0,t.jsxs)("span",{className:"text-muted-foreground",children:["n=",e.nEstimators," d=",e.maxDepth," lr=",e.learningRate]})]}),(0,t.jsxs)("span",{className:"text-emerald-600 dark:text-emerald-400",children:["AUC=",e.auc.toFixed(4)]})]},a))})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-6",children:[(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("label",{className:"text-[11px] font-medium",children:"Dataset"}),(0,t.jsx)("select",{value:e,onChange:e=>{var t;let a;return t=e.target.value,a=R.find(e=>e.id===t),void(y(t),J(Array(a.nFeatures).fill(!0)),z(null),Y(!1),Q(null))},className:"w-full h-8 text-[12px] rounded border border-border/60 bg-background px-2 cursor-pointer",children:R.map(e=>(0,t.jsx)("option",{value:e.id,children:e.name},e.id))}),(0,t.jsx)("p",{className:"text-[9px] text-muted-foreground",children:es.description})]}),(0,t.jsx)(M,{label:"n_estimators (number of trees)",value:v,min:10,max:500,step:10,onChange:_,description:"More trees = better AUC but slower training + overfitting risk at high values."}),(0,t.jsx)(M,{label:"max_depth (tree depth)",value:C,min:1,max:10,step:1,onChange:E,description:"Deeper trees = more capacity but overfitting. Depth 3 is the sweet spot for most datasets."}),(0,t.jsx)(M,{label:"learning_rate (shrinkage ν)",value:X,min:.01,max:1,step:.01,onChange:G,description:"Higher = faster convergence but less stable. 0.1 is standard; 0.01 needs more trees."}),(0,t.jsxs)(p.Button,{variant:"outline",size:"sm",onClick:()=>{_(100),E(3),G(.1),J(Array(es.nFeatures).fill(!0)),z(null),Y(!1),Q(null)},className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(T.RotateCcw,{className:"h-3 w-3"})," Reset to defaults"]})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsxs)("label",{className:"text-[11px] font-medium",children:["Feature Selection (",$.filter(Boolean).length,"/",es.nFeatures," selected)"]}),(0,t.jsx)("p",{className:"text-[9px] text-muted-foreground mb-2",children:"Uncheck features to see how AUC changes. Fewer features = simpler model but maybe lower AUC."}),(0,t.jsx)("div",{className:"grid grid-cols-2 gap-1.5",children:es.featureNames.map((e,a)=>(0,t.jsxs)("label",{className:"flex items-center gap-1.5 text-[10px] cursor-pointer rounded border border-border/40 px-2 py-1 hover:bg-muted/30",children:[(0,t.jsx)("input",{type:"checkbox",checked:$[a]??!1,onChange:e=>{let t=[...$];t[a]=e.target.checked,J(t)},className:"h-3 w-3 accent-primary"}),(0,t.jsx)("span",{className:"font-mono",children:e})]},a))})]})]})]})}),(0,t.jsx)("div",{id:"train",className:"scroll-mt-20",children:(0,t.jsxs)(s.SectionCard,{title:"Train and Evaluate — 4 charts per run",description:"Click Train to run the BDT with your hyperparameters. Four charts update: ROC (train vs test), Feature importance, Confusion matrix, Loss curve (train vs test).",icon:(0,t.jsx)(j.Play,{className:"h-5 w-5"}),badge:W?"Trained":"Not trained",badgeVariant:W?"default":"outline",contentClassName:"p-4 md:p-5 space-y-4",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/40 bg-muted/20 p-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2",children:"Current configuration"}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-5 gap-2 text-[11px]",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"Dataset:"})," ",(0,t.jsx)("span",{className:"font-mono font-medium",children:es.name.split("(")[0].trim()})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"n_estimators:"})," ",(0,t.jsx)("span",{className:"font-mono font-bold text-primary",children:v})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"max_depth:"})," ",(0,t.jsx)("span",{className:"font-mono font-bold text-primary",children:C})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"learning_rate:"})," ",(0,t.jsx)("span",{className:"font-mono font-bold text-primary",children:X})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"features:"})," ",(0,t.jsxs)("span",{className:"font-mono font-bold text-primary",children:[$.filter(Boolean).length,"/",es.nFeatures]})]})]})]}),W&&null!==V&&null!==el&&(0,t.jsxs)("div",{className:`rounded-md border p-2 flex items-center justify-between text-[11px] ${el>V?"border-emerald-500/40 bg-emerald-500/10":el<V?"border-rose-500/40 bg-rose-500/10":"border-border/40 bg-muted/30"}`,children:[(0,t.jsxs)("span",{className:"flex items-center gap-1.5",children:[(0,t.jsx)(S.default,{className:"h-3.5 w-3.5"}),(0,t.jsxs)("span",{className:"text-muted-foreground",children:["Previous AUC: ",(0,t.jsx)("span",{className:"font-mono font-bold",children:V.toFixed(4)})]}),(0,t.jsx)(b.ArrowRight,{className:"h-3 w-3 text-muted-foreground"}),(0,t.jsxs)("span",{className:"text-muted-foreground",children:["Current AUC: ",(0,t.jsx)("span",{className:"font-mono font-bold",children:el.toFixed(4)})]})]}),(0,t.jsx)("span",{className:"font-mono font-bold",children:el>V?`+${(el-V).toFixed(4)}`:el<V?`${(el-V).toFixed(4)}`:"±0"})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsxs)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(x.Eye,{className:"h-3 w-3"})," Click to train the BDT (scikit-learn via Pyodide)"]}),(0,t.jsx)(i.PyodideRunner,{code:ei,buttonLabel:"Train BDT",onOutput:e=>{try{let t=e.indexOf("["),a=e.lastIndexOf("]");if(t>=0&&a>t){let r=JSON.parse(e.substring(t,a+1));if(Array.isArray(r)&&4===r.length){if(q){let e=q[0],t=e?.stats?.find(e=>"Test AUC"===e.label)?.value??"0";Q(parseFloat(t))}z(r),Y(!0)}}}catch{}},hideTextOutput:!!q,compact:!0}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mt-2",children:[(0,t.jsxs)("label",{className:"text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1",children:[(0,t.jsx)(P.Code,{className:"h-3 w-3"})," Code:"]}),(0,t.jsxs)("select",{value:ea,onChange:e=>er(e.target.value),className:"h-7 text-[11px] rounded border border-border/60 bg-background px-2 cursor-pointer",title:"Select a language to view the BDT training code",children:[(0,t.jsx)("option",{value:"hide",children:"Hide code"}),(0,t.jsx)("option",{value:"python",children:"Python (runnable via Pyodide)"}),(0,t.jsx)("option",{value:"r",children:"R — gbm + caret (statistician)"}),(0,t.jsx)("option",{value:"scala",children:"Scala — Spark MLlib (data engineer)"}),(0,t.jsx)("option",{value:"sql",children:"SQL — BigQuery ML (DBA)"}),(0,t.jsx)("option",{value:"julia",children:"Julia — MLJ.jl (numerical computing)"})]})]}),"hide"!==ea&&(0,t.jsx)("pre",{className:"text-[10px] font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-auto bg-background/60 rounded p-2 border border-border/40 mt-2",children:"python"===ea?ei:u[ea]??u.python})]}),W&&(0,t.jsxs)(p.Button,{variant:"outline",size:"sm",onClick:()=>{if(!q)return;let t=q[0],a=t?.stats?.find(e=>"Test AUC"===e.label)?.value??"0",r=t?.stats?.find(e=>"Training time"===e.label)?.value??"0s";var s={ts:Date.now(),dataset:e,nEstimators:v,maxDepth:C,learningRate:X,nFeatures:$.filter(Boolean).length,auc:parseFloat(a),trainTime:parseFloat(r)};let i=O();i.unshift(s);let n=i.slice(0,8);try{localStorage.setItem(U,JSON.stringify(n))}catch{}Z(O())},className:"h-7 text-[11px] gap-1.5",children:[(0,t.jsx)(k.Save,{className:"h-3 w-3"})," Save this run (localStorage)"]}),q&&4===q.length?(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)(n.AnalysisChart,{data:q[0],accent:es.accent,sourceCode:ei,multiLangCode:u}),(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4",children:[(0,t.jsx)(n.AnalysisChart,{data:q[1],accent:"oklch(0.65 0.18 145)",sourceCode:ei,multiLangCode:u}),(0,t.jsx)(n.AnalysisChart,{data:q[2],accent:"oklch(0.65 0.18 30)",sourceCode:ei,multiLangCode:u})]}),(0,t.jsx)(n.AnalysisChart,{data:q[3],accent:"oklch(0.65 0.18 280)",sourceCode:ei,multiLangCode:u})]}):(0,t.jsxs)("div",{className:"rounded-md border border-dashed border-border/40 p-8 text-center",children:[(0,t.jsx)(h.Brain,{className:"h-8 w-8 text-muted-foreground/40 mx-auto mb-2"}),(0,t.jsx)("p",{className:"text-sm text-muted-foreground/70",children:"Click “Train BDT” to see the four charts: ROC (train vs test), Feature importance, Confusion matrix, and Loss curve."}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground/50 mt-1",children:"First run takes ~5s longer (scikit-learn install via micropip). Subsequent runs are instant."})]})]})}),(0,t.jsx)("div",{id:"tradeoffs",className:"scroll-mt-20",children:W&&(0,t.jsx)(s.SectionCard,{title:"Tradeoff hints — what to try next",description:"Each hint below changes ONE slider at a time so you can isolate the effect on AUC and training time.",icon:(0,t.jsx)(L.Lightbulb,{className:"h-5 w-5"}),badge:"3 experiments",badgeVariant:"outline",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-3",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>en(D[2]),className:"rounded-md border border-blue-500/30 bg-blue-500/5 p-3 text-left hover:bg-blue-500/10 transition-colors",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-1",children:"Try: Aggressive"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground",children:"Increase n_estimators to 300, depth to 5. AUC should improve — but training time triples. At some point (>500 trees), AUC plateaus and you're just wasting compute."}),(0,t.jsx)("p",{className:"text-[10px] text-blue-700 dark:text-blue-400 mt-2 font-medium",children:"→ Click to apply"})]}),(0,t.jsxs)("button",{type:"button",onClick:()=>en(D[3]),className:"rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-left hover:bg-amber-500/10 transition-colors",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1",children:"Try: Overfit Demo"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground",children:"Set depth=10, n=500, lr=0.3. Train AUC will hit ~1.0 — but test AUC collapses. The gap between train and test AUC IS the overfitting signal. Watch the loss curve diverge."}),(0,t.jsx)("p",{className:"text-[10px] text-amber-700 dark:text-amber-400 mt-2 font-medium",children:"→ Click to apply"})]}),(0,t.jsxs)("button",{type:"button",onClick:()=>{let e=Math.ceil(es.nFeatures/2);J(Array(es.nFeatures).fill(!1).map((t,a)=>a<e))},className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3 text-left hover:bg-emerald-500/10 transition-colors",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1",children:"Try: Half the features"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground",children:"Uncheck half the features. AUC drops — but not as much as you'd think. The top 3 features carry 80% of the signal. Feature engineering IS pruning."}),(0,t.jsx)("p",{className:"text-[10px] text-emerald-700 dark:text-emerald-400 mt-2 font-medium",children:"→ Click to apply"})]})]})})}),(0,t.jsx)("div",{id:"why",className:"scroll-mt-20",children:(0,t.jsx)(s.SectionCard,{title:"Why this matters — training vs inference",description:"Every other card on the platform runs pre-written code (inference). This page lets you TRAIN the model — and feel the tradeoffs.",icon:(0,t.jsx)(f.Sparkles,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"prose prose-sm dark:prose-invert max-w-none space-y-3",children:[(0,t.jsxs)("p",{className:"text-sm text-muted-foreground leading-relaxed",children:["A reader who sees a pre-trained BDT ROC curve (AUC=0.82) learns a"," ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"fact"}),". A reader who TRAINS that BDT themselves — adjusting tree depth from 3 to 5, watching AUC go from 0.78 to 0.85 but training time from 2s to 8s — learns a"," ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"tradeoff"}),". The tradeoff IS the data science. The playground makes tradeoffs visceral."]}),(0,t.jsx)("p",{className:"text-sm text-muted-foreground leading-relaxed",children:(0,t.jsx)("strong",{className:"text-foreground/80",children:"Every slider reveals a tradeoff:"})}),(0,t.jsxs)("ul",{className:"text-sm text-muted-foreground space-y-0.5 ml-4 list-disc",children:[(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"n_estimators:"})," more trees → better AUC but slower training + overfitting plateau"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"max_depth:"})," deeper trees → more capacity but overfitting (train AUC > test AUC)"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"learning_rate:"})," higher → faster convergence but noisier (less stable)"]}),(0,t.jsxs)("li",{children:[(0,t.jsx)("strong",{children:"feature selection:"})," fewer features → simpler model, lower AUC, but more interpretable"]})]}),(0,t.jsxs)("p",{className:"text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The BDT → CNN → GNN evolution:"})," The BDT here (engineered features, AUC~0.82) is the baseline. On the LHC page, the CNN (jet images, AUC~0.89) and GNN (particle graphs, AUC~0.93) improve by capturing spatial structure. But the BDT is always the starting point — fast, interpretable, and good enough for a first analysis. The practicing DS knows: try the simple model first."]})]})})}),(0,t.jsx)("div",{id:"thoughts",className:"scroll-mt-20",children:(0,t.jsxs)(o.DeeperThoughtSection,{pageTitle:"ML Playground",children:[(0,t.jsx)(o.DeeperThought,{title:"The bias-variance tradeoff IS the slider you can feel",connectedTo:"Phase 8: living-equations cards",children:(0,t.jsx)("p",{className:"text-xs",children:"In a textbook, “bias-variance tradeoff” is a U-curve drawn once and forgotten. Here it's the depth slider. Depth=1 = high bias (underfits), depth=10 = high variance (overfits). The minimum on the U-curve is dataset-dependent — that's why no textbook can tell you “use depth 3” with a straight face. You tune it. The playground makes the U-curve something you can FEEL by watching the train-test AUC gap open and close as you drag the slider."})}),(0,t.jsx)(o.DeeperThought,{title:"Loss curves lie — until you draw the test one too",connectedTo:"Phase 1: architecture",children:(0,t.jsxs)("p",{className:"text-xs",children:["Every ML tutorial shows a training loss curve going down. That curve ALWAYS goes down — boosting fits residuals, residuals shrink, loss decreases. The curve carries no information by itself. The INFORMATIVE curve is the test loss, plotted alongside. It goes down, then flatlines, then rises. The inflection point is the optimal number of trees — past it, you're memorising noise. Without the test curve, you cannot see overfitting. This is why we plot both — and why scikit-learn's",(0,t.jsx)("span",{className:"font-mono",children:" staged_predict_proba"})," is the most underused method in the library."]})}),(0,t.jsx)(o.DeeperThought,{title:"Feature importance is the Pareto principle made visible",connectedTo:"Elegant Code: SVD, attention",children:(0,t.jsxs)("p",{className:"text-xs",children:["The feature-importance chart almost always shows the top 3 features carrying 70–80% of the total importance. This is the Pareto principle (80/20 rule) appearing in ML — and it's the reason feature selection works at all. The corollary: the bottom 30% of features contribute almost nothing. In production you'd drop them and retrain: simpler model, ~same AUC, faster inference, lower memory. The BDT's",(0,t.jsx)("span",{className:"font-mono",children:" feature_importances_"})," attribute is the cheapest feature-engineering signal you'll ever get — and it's free after every training run."]})}),(0,t.jsx)(o.DeeperThought,{title:"Precision vs recall is the ethics of thresholding",connectedTo:"LHC + finance + insurance pages",children:(0,t.jsx)("p",{className:"text-xs",children:"The default threshold of 0.5 is a convention, not a law. For LHC (signal = Higgs), recall matters more than precision — you don't want to lose a Nobel prize because the threshold was too high. For fraud detection, precision matters more — false positives freeze customer cards and erode trust. For insurance claims, the right threshold depends on the cost of investigation vs the cost of payout. The AUC is threshold-independent (that's its strength); the confusion matrix IS threshold-dependent (that's its strength). You need both. Thresholding is where ML meets business logic — and where data scientists earn their salary."})}),(0,t.jsx)(o.DeeperThought,{title:"BDT → CNN → GNN is the universal ML evolution",connectedTo:"LHC data analysis page + molecular modelling",children:(0,t.jsx)("p",{className:"text-xs",children:"On the LHC page, the BDT (engineered features, AUC~0.82) is the baseline. The CNN (jet images, AUC~0.89) captures 2D spatial structure. The GNN (particle graphs, AUC~0.93) captures the irregular topology of particle decay. The same progression appears in protein folding (sequence → contact map → graph), in fraud (transaction features → user session graph → bipartite user-merchant graph). The pattern: engineer features → let the model learn spatial features → let the model learn graph structure. Each step adds ~5–10 AUC points. Each step also adds 10–100× compute. The playground is step 1 of that ladder — and the ladder never ends."})}),(0,t.jsx)(o.DeeperThought,{title:"Every hyperparameter is a bet on the data",connectedTo:"Causal inference page",children:(0,t.jsx)("p",{className:"text-xs",children:"n_estimators=100 says “I believe 100 rounds of boosting will saturate the signal”. max_depth=3 says “I believe 3-way interactions are the ceiling of useful structure”. learning_rate=0.1 says “I believe the signal is strong enough that 10% of each tree's correction is safe to add”. None of these are right a priori — they're educated bets. The practicing data scientist tunes not because the defaults are wrong, but because every dataset has its own structure. The playground is the place where these bets become evidence in seconds, not hours."})})]})}),(0,t.jsx)("div",{id:"journey",className:"scroll-mt-20",children:(0,t.jsx)(s.SectionCard,{title:"Cross-Domain Journey Tracker — Gamification",description:"Your exploration progress across the platform's math cousins. The ML Playground now contributes to a new 'ML Trainer' badge. Climate Analyst badge added — visit the climate-science page to unlock.",icon:(0,t.jsx)(N.Award,{className:"h-5 w-5"}),badge:"Phase 4 + Climate",badgeVariant:"outline",children:(0,t.jsx)(d.JourneyTracker,{})})}),(0,t.jsx)(l.NextSteps,{relatedPages:[{id:"lhc-data-analysis",reason:"LHC page has 15 analysis cards — see where the BDT fits in the full pipeline"},{id:"analytics-outputs",reason:"29 visualization cards — the chart infrastructure used here"},{id:"elegant-code",reason:"29 equation cards + 5 DS workflow methodology cards"},{id:"dashboard",reason:"Live multi-source dashboard + journey tracker"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(r.default,{href:(0,c.hrefFor)("home"),className:"text-sm text-primary hover:underline",children:"→ Return to overview"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,c.hrefFor)("lhc-data-analysis"),className:"text-sm text-primary hover:underline",children:"→ LHC Data Analysis"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,c.hrefFor)("analytics-outputs"),className:"text-sm text-primary hover:underline",children:"→ Analytics Outputs"})]})]})}e.s(["MLPlaygroundPage",()=>X],516143)}]);