(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,102163,e=>{"use strict";var a=e.i(843476),t=e.i(271645),s=e.i(522016),i=e.i(862824),n=e.i(342046),r=e.i(716675),o=e.i(194058),l=e.i(332017),c=e.i(901752),d=e.i(487486);let m={python:`# Python — imperative + readable
# Higgs → 4μ invariant mass: m = sqrt(2*pT1*pT2*(cosh(dEta) - cos(dPhi)))
import numpy as np, json
np.random.seed(42)

n_bg = 100000
bg_mass = np.random.exponential(40, n_bg) + 70
n_signal = 300
signal_mass = np.random.normal(125.1, 2.1, n_signal)
all_mass = np.concatenate([bg_mass, signal_mass])

bins = np.linspace(70, 200, 131)
hist, edges = np.histogram(all_mass, bins=bins)
centers = (edges[:-1] + edges[1:]) / 2

# Background fit: exponential from sidebands
sideband = (centers < 115) | (centers > 135)
coeffs = np.polyfit(centers[sideband], np.log(np.maximum(hist, 0.5)), 1)
bg_fit = np.exp(np.polyval(coeffs, centers))

print(json.dumps({
    "chart_type": "line",
    "title": "Invariant Mass m(4μ): Higgs at 125 GeV",
    "x_label": "Mass (GeV)", "y_label": "Events / 1 GeV",
    "series": [
        {"name": "Data", "data": [{"x": float(c), "y": int(h)} for c, h in zip(centers, hist)]},
        {"name": "Background fit", "data": [{"x": float(c), "y": float(b)} for c, b in zip(centers, bg_fit)]},
    ],
    "stats": [
        {"label": "Higgs mass", "value": "125.1 GeV", "tone": "success"},
        {"label": "Significance", "value": "5σ", "tone": "success"},
    ],
    "summary": "The Higgs bump at 125 GeV — 300 signal events in 100K background."
}))`,r:`# R — vectorized + statistical
# Same Higgs → 4μ analysis, R's vectorized operations replace loops
set.seed(42)

n_bg <- 100000
bg_mass <- rexp(n_bg, rate = 1/40) + 70
n_signal <- 300
signal_mass <- rnorm(n_signal, mean = 125.1, sd = 2.1)
all_mass <- c(bg_mass, signal_mass)

# Histogram — R's hist() + cut() is the vectorized approach
bins <- seq(70, 200, by = 1)
hist_data <- hist(all_mass, breaks = bins, plot = FALSE)
centers <- (hist_data$breaks[-1] + hist_data$breaks[-length(hist_data$breaks)]) / 2
counts <- hist_data$counts

# Background fit: exponential via lm() on log scale
# R's lm() + I() is the key insight — formula interface is declarative
sideband <- centers < 115 | centers > 135
fit <- lm(log(pmax(counts, 0.5)) ~ centers, subset = sideband)
bg_fit <- exp(predict(fit, newdata = data.frame(centers = centers)))

# Output as JSON (using jsonlite)
library(jsonlite)
cat(toJSON(list(
  chart_type = "line",
  title = "Invariant Mass m(4μ): Higgs at 125 GeV (R)",
  series = list(
    list(name = "Data", data = lapply(seq_along(centers), function(i)
      list(x = centers[i], y = counts[i]))),
    list(name = "Background fit", data = lapply(seq_along(centers), function(i)
      list(x = centers[i], y = bg_fit[i])))
  ),
  summary = "R's vectorized hist() + lm() replace the Python loop — the statistical thinking is the same."
), auto_unbox = TRUE))
# Key insight: R's pmax() (parallel maximum) and formula interface (y ~ x)
# are the paradigm difference — you think in vectors, not in loops.`,scala:`// Scala — functional + parallel
// Same Higgs analysis using Apache Spark (Scala's native big data framework)
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._

val spark = SparkSession.builder.appName("HiggsAnalysis").getOrCreate()
import spark.implicits._

// Generate data (would read from ROOT file via spark-root in production)
val rng = new scala.util.Random(42)
val bgMass = (1 to 100000).map(_ => rng.exp(40) + 70.0)
val signalMass = (1 to 300).map(_ => rng.nextGaussian() * 2.1 + 125.1)
val allMass = bgMass ++ signalMass

// DataFrame approach — Scala's groupBy + agg is the key insight
val df = allMass.toDF("mass")
val histDF = df
  .withColumn("bin", floor(col("mass") - 70))
  .groupBy("bin")
  .agg(count("*").as("count"))
  .orderBy("bin")

// Background fit: exponential regression on log scale
// Scala's functional pipeline: map → filter → reduce
val sidebandDF = histDF.filter(col("bin") < 45 || col("bin") > 65)
// In production: use Spark MLlib for regression

// Key insight: Scala's groupBy + agg is the declarative pipeline approach.
// You describe WHAT you want (histogram), not HOW to compute it (loop).
// This scales to TB-scale data automatically — same code, more data.`,sql:`-- SQL — declarative + set-based
-- Same Higgs analysis as a SQL query (runs on Snowflake, BigQuery, ClickHouse)
WITH raw_data AS (
    -- Simulate background (exponential) + signal (Gaussian at 125 GeV)
    -- In production: SELECT mass FROM cms_nanoadod.events WHERE n_muons >= 4
    SELECT 70 + -40 * LN(RANDOM()) AS mass, 'bg' AS source FROM generate_series(1, 100000)
    UNION ALL
    SELECT 125.1 + 2.1 * (RANDOM() - 0.5) * 6 AS mass, 'sig' AS source FROM generate_series(1, 300)
),
histogram AS (
    -- SQL's GROUP BY + FLOOR is the key insight — set-based binning
    SELECT
        FLOOR(mass) AS bin_center,
        COUNT(*) AS event_count
    FROM raw_data
    WHERE mass BETWEEN 70 AND 200
    GROUP BY FLOOR(mass)
    ORDER BY bin_center
),
background_fit AS (
    -- Fit exponential to sidebands (mass < 115 OR mass > 135)
    -- SQL's regression is via aggregate functions
    SELECT
        bin_center,
        event_count,
        -- Exponential fit: ln(count) = a + b*mass
        EXP(
            AVG(LOG(GREATEST(event_count, 1))) OVER () +
            (AVG(bin_center * LOG(GREATEST(event_count, 1))) OVER () -
             AVG(bin_center) OVER () * AVG(LOG(GREATEST(event_count, 1))) OVER ()) /
            (AVG(bin_center * bin_center) OVER () - AVG(bin_center) OVER () * AVG(bin_center) OVER ()) *
            (bin_center - AVG(bin_center) OVER ())
        ) AS bg_estimate
    FROM histogram
    QUALIFY bin_center < 115 OR bin_center > 135
)
-- Key insight: SQL's GROUP BY + aggregate is pure relational algebra.
-- You describe the SET you want (histogram bins), not the loop.
-- This runs on petabyte-scale warehouses — same query, more data.`,julia:`# Julia — mathematical + multiple dispatch
# Same Higgs analysis using Julia's mathematical syntax
using Random, Statistics, JSON
Random.seed!(42)

# Julia is 1-indexed — closer to mathematical notation
n_bg = 100_000
bg_mass = randexp(n_bg) .* 40 .+ 70  # vectorized, no loop
n_signal = 300
signal_mass = randn(n_signal) .* 2.1 .+ 125.1
all_mass = vcat(bg_mass, signal_mass)

# Histogram — Julia's fit(Histogram, ...) is the key insight
using StatsBase
h = fit(Histogram, all_mass, 70:1:200)
centers = (h.edges[1][1:end-1] .+ h.edges[1][2:end]) ./ 2
counts = h.weights

# Background fit: exponential regression
# Julia's dot syntax (.+) broadcasts — same as numpy but more explicit
sideband = (centers .< 115) .| (centers .> 135)
# Linear fit on log scale
log_counts = log.(max.(counts, 0.5))
coeffs = [centers[sideband] ones(sum(sideband))] \\ log_counts[sideband]
bg_fit = exp.(coeffs[1] .* centers .+ coeffs[2])

# Output JSON
output = Dict(
    "chart_type" => "line",
    "title" => "Invariant Mass m(4μ): Higgs at 125 GeV (Julia)",
    "series" => [
        Dict("name" => "Data", "data" => [Dict("x" => c, "y" => Int(counts[i]))
            for (i, c) in enumerate(centers)]),
        Dict("name" => "Background fit", "data" => [Dict("x" => c, "y" => bg_fit[i])
            for (i, c) in enumerate(centers)]),
    ],
    "summary" => "Julia's dot syntax (.+) and 1-indexing are closest to math notation."
)
println(JSON.json(output))
# Key insight: Julia's multiple dispatch means the SAME operator (+)
# works differently for Int, Float, Vector, Matrix — the type determines
# the behavior. This is the mathematical approach: types define the algebra.`},u={python:`# Python — imperative, sklearn for BDT, PyTorch for CNN/GNN
import numpy as np, json
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import roc_curve, auc
np.random.seed(42)

# Simulated jet features (N-subjettiness, mass, pT, etc.)
n_signal, n_bg = 5000, 5000
X_sig = np.random.randn(n_signal, 8) + np.array([1, 0.5, -0.3, 0.8, 0.2, -0.1, 0.4, -0.2])
X_bg = np.random.randn(n_bg, 8) + np.array([-0.5, -0.2, 0.6, -0.4, -0.3, 0.1, -0.2, 0.3])
X = np.vstack([X_sig, X_bg])
y = np.concatenate([np.ones(n_signal), np.zeros(n_bg)])

# BDT (XGBoost-style)
bdt = GradientBoostingClassifier(n_estimators=100, max_depth=3)
bdt.fit(X, y)
fpr_bdt, tpr_bdt, _ = roc_curve(y, bdt.predict_proba(X)[:,1])

print(json.dumps({"chart_type":"line","title":"Jet Tagging ROC: BDT vs CNN vs GNN",
    "series":[{"name":"BDT AUC=0.82","data":[{"x":float(f),"y":float(t)} for f,t in zip(fpr_bdt,tpr_bdt)]}],
    "summary":"BDT on engineered features — the baseline. CNN and GNN improve by capturing spatial structure."}))`,r:`# R — vectorized, using caret/ROCR for ML
set.seed(42)
library(caret); library(ROCR)

n_signal <- 5000; n_bg <- 5000
# R's matrix() + rnorm() generates data in one call — no vstack needed
X_sig <- matrix(rnorm(n_signal * 8), ncol = 8) + c(1, 0.5, -0.3, 0.8, 0.2, -0.1, 0.4, -0.2)
X_bg <- matrix(rnorm(n_bg * 8), ncol = 8) + c(-0.5, -0.2, 0.6, -0.4, -0.3, 0.1, -0.2, 0.3)
X <- rbind(X_sig, X_bg)
y <- c(rep(1, n_signal), rep(0, n_bg))

# R's caret::train() is the key insight — unified interface for ALL models
# train(..., method = "gbm") = BDT, method = "rf" = random forest, etc.
df <- data.frame(X, label = factor(y))
model <- train(label ~ ., data = df, method = "gbm", verbose = FALSE,
               trControl = trainControl(method = "none"))

# R's prediction() + performance() from ROCR — statistical thinking
pred <- prediction(predict(model, type = "prob")[,2], y)
perf <- performance(pred, "tpr", "fpr")

# Key insight: R's formula interface (label ~ .) and caret's unified API
# mean you can swap BDT → RF → SVM by changing ONE parameter (method = "gbm").`,scala:`// Scala — Spark MLlib for distributed ML
import org.apache.spark.ml.classification.GBTClassifier
import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.sql.SparkSession
import org.apache.spark.ml.evaluation.BinaryClassificationEvaluator

val spark = SparkSession.builder.appName("JetTagging").getOrCreate()
import spark.implicits._

// Generate data (in production: read from ROOT via spark-root)
val rng = new scala.util.Random(42)
val data = (1 to 10000).map { i =>
    val label = if (i <= 5000) 1.0 else 0.0
    val offset = if (label == 1.0)
        Array(1.0, 0.5, -0.3, 0.8, 0.2, -0.1, 0.4, -0.2)
    else
        Array(-0.5, -0.2, 0.6, -0.4, -0.3, 0.1, -0.2, 0.3)
    val features = (0 until 8).map(j => rng.nextGaussian() + offset(j)).toArray
    (label, features)
}.toDF("label", "rawFeatures")

// Spark MLlib's pipeline: assembler → GBT → evaluator
// Scala's Pipeline API is the key insight — composable stages
val assembler = new VectorAssembler()
    .setInputCols((0 until 8).map(i => s"rawFeatures").toArray)
    .setOutputCol("features")

val gbt = new GBTClassifier()
    .setLabelCol("label")
    .setFeaturesCol("features")
    .setMaxIter(100)
    .setMaxDepth(3)

val evaluator = new BinaryClassificationEvaluator()
    .setMetricName("areaUnderROC")

// Key insight: Spark's Pipeline + Estimator pattern is the functional approach.
// You compose stages (assembler → gbt → evaluator) like a Scala sequence.
// This scales to 1B jets across 100 nodes — same code, more data.`,sql:`-- SQL — BigQuery ML for in-warehouse ML
-- Same jet tagging as a SQL query with BigQuery ML
CREATE OR REPLACE MODEL jet_tagging.bdt_model
OPTIONS(
    model_type = 'BOOSTED_TREE_CLASSIFIER',
    num_trees = 100,
    max_depth = 3,
    input_label_cols = ['label']
) AS
SELECT
    label,
    feature_1, feature_2, feature_3, feature_4,
    feature_5, feature_6, feature_7, feature_8
FROM jet_tagging.training_data;

-- Predict and compute ROC
WITH predictions AS (
    SELECT
        label,
        predicted_label_probs[OFFSET(1)].prob AS score
    FROM ML.PREDICT(MODEL jet_tagging.bdt_model,
        (SELECT * FROM jet_tagging.test_data))
),
roc AS (
    -- SQL's window functions compute ROC curve points
    SELECT
        1 - specificity AS fpr,
        sensitivity AS tpr
    FROM (
        SELECT
            score,
            SUM(CASE WHEN label = 1 THEN 1 ELSE 0 END) OVER (ORDER BY score DESC) /
                NULLIF(SUM(CASE WHEN label = 1 THEN 1 ELSE 0 END) OVER (), 0) AS sensitivity,
            SUM(CASE WHEN label = 0 THEN 1 ELSE 0 END) OVER (ORDER BY score DESC) /
                NULLIF(SUM(CASE WHEN label = 0 THEN 1 ELSE 0 END) OVER (), 0) AS specificity
        FROM predictions
        GROUP BY score, label
    )
)
-- Key insight: SQL's window functions (OVER, PARTITION BY) replace loops.
-- The ROC curve is a set-based computation — GROUP BY score, window for cumulative sums.
-- This trains AND evaluates inside the warehouse — no data movement.`,julia:`# Julia — MLJ.jl for machine learning
using Random, MLJ
Random.seed!(42)

# Julia's type system defines the model — multiple dispatch selects the algorithm
n_signal, n_bg = 5000, 5000
X_sig = randn(n_signal, 8) .+ [1 0.5 -0.3 0.8 0.2 -0.1 0.4 -0.2]
X_bg = randn(n_bg, 8) .+ [-0.5 -0.2 0.6 -0.4 -0.3 0.1 -0.2 0.3]
X = vcat(X_sig, X_bg)
y = vcat(fill(1, n_signal), fill(0, n_bg))

# Julia's MLJ: @load uses multiple dispatch to select the implementation
# The SAME code works for EvoTrees (BDT), Flux (neural net), etc.
EvoTreesClassifier = @load EvoTreesClassifier pkg=EvoTrees
model = EvoTreesClassifier(nrounds=100, max_depth=3)
mach = machine(model, X, categorical(y))
fit!(mach)

# Julia's broadcasting (.>) is the key insight — element-wise without loops
predictions = MLJ.predict(mach, X)
# ROC computation is also a one-liner via MLJ's roc() function

# Key insight: Julia's @load + multiple dispatch means the model TYPE
# determines the implementation. EvoTreesClassifier uses CPU, GPUClassifier
# uses GPU — same code, different dispatch. This is the mathematical approach:
# the type signature defines the behavior.`},p={python:`# Python — imperative time-series
import numpy as np, json
np.random.seed(42)
hours = np.linspace(0, 12, 73)
pileup = 60 * np.exp(-hours / 10) * (1 + 0.05 * np.sin(hours * 3))
l1_rate = 100 * (pileup / 60)
print(json.dumps({"chart_type":"line","title":"LHC Trigger Rates (12-Hour Fill)",
    "series":[{"name":"L1 (kHz)","data":[{"x":float(h),"y":float(r)} for h,r in zip(hours,l1_rate)]},
              {"name":"Pileup","data":[{"x":float(h),"y":float(p)} for h,p in zip(hours,pileup)]}]}))`,r:`# R — vectorized time-series with zoo/xts
set.seed(42)
hours <- seq(0, 12, by = 0.1)
# R's vectorized exp() + sin() — no loop, element-wise by default
pileup <- 60 * exp(-hours / 10) * (1 + 0.05 * sin(hours * 3))
l1_rate <- 100 * (pileup / 60)
# R's zoo() for time-series objects — the statistical approach
library(zoo)
ts_data <- zoo(cbind(l1_rate, pileup), order.by = hours)
# Key insight: R treats time-series as first-class objects —
# plot(), summary(), decompose() all work on zoo/xts directly.`,scala:`// Scala — Spark Structured Streaming for real-time trigger rates
import org.apache.spark.sql.functions._
import org.apache.spark.sql.SparkSession

val spark = SparkSession.builder.appName("TriggerMonitor").getOrCreate()
// In production: read from Kafka topic "trigger_rates"
val rates = spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", "kafka:9092")
    .option("subscribe", "trigger_rates")
    .load()

// Scala's window() + groupBy() for tumbling windows — the functional approach
val windowed = rates
    .withColumn("timestamp", col("timestamp").cast("timestamp"))
    .withWatermark("timestamp", "1 minute")
    .groupBy(window(col("timestamp"), "10 minutes"))
    .agg(avg("l1_rate").as("avg_l1"), avg("pileup").as("avg_pu"))
// Key insight: Spark's window() + withWatermark() handles late data
// and out-of-order events — the streaming paradigm. Same groupBy as batch.`,sql:`-- SQL — time-series aggregation (runs on ClickHouse for real-time)
WITH trigger_events AS (
    -- In production: SELECT timestamp, l1_rate, pileup FROM trigger_log
    SELECT
        toTimestamp('2024-09-28 00:00:00') + INTERVAL value MINUTE AS ts,
        60 * exp(-value / 600) * (1 + 0.05 * sin(value / 10 * 3)) AS pileup,
        100 * (60 * exp(-value / 600) / 60) AS l1_rate
    FROM numbers(0, 720) -- 12 hours \xd7 60 minutes
)
SELECT
    toStartOfTenMinute(ts) AS time_bucket,
    avg(l1_rate) AS avg_l1_khz,
    avg(pileup) AS avg_pileup,
    max(l1_rate) AS peak_l1,
    -- ClickHouse's array functions compute percentiles in SQL
    quantile(0.95)(l1_rate) AS p95_l1
FROM trigger_events
GROUP BY time_bucket
ORDER BY time_bucket;
-- Key insight: SQL's time-bucketing (toStartOfTenMinute) + aggregates
-- compute the time-series in one pass. ClickHouse processes 1B rows/sec.`,julia:`# Julia — mathematical time-series with Dates
using Random, Dates, JSON
Random.seed!(42)

# Julia's range with step — mathematically precise
hours = 0:0.1:12
# Julia's broadcasting (.*) — element-wise without explicit vectorization
pileup = 60 .* exp.(-hours ./ 10) .* (1 .+ 0.05 .* sin.(hours .* 3))
l1_rate = 100 .* (pileup ./ 60)

# Julia's DateTime for real timestamps
timestamps = DateTime(2024, 9, 28, 0, 0, 0) .+ Second.(round.(Int, hours .* 3600))
# Key insight: Julia's dot syntax (.*) is explicit broadcasting —
# the reader sees exactly which operations are element-wise.
# In Python, numpy's * is implicitly vectorized; in Julia, .* is explicit.
# This is the mathematical approach: the notation reflects the operation.`},h={python:"(see RAW_ETA_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy)",r:`# R — vectorized hit generation + hist() for histogram
# R's rpois()/runif() + hist() replace Python's loop over events
set.seed(42)

n_events <- 50000
hits_per_event <- rpois(n_events, lambda = 12)
total_hits <- sum(hits_per_event)

# Sample all hits in one vectorized call (no Python-style concatenation)
eta <- runif(total_hits, min = -2.5, max = 2.5)
# Detector acceptance gaps: beam pipe (|eta|<0.05), service (|eta|-1.5)<0.1
gap_mask <- (abs(eta) < 0.05) | (abs(abs(eta) - 1.5) < 0.1)
eta <- eta[!gap_mask]

# R's hist() returns counts AND breaks — the vectorized idiom
bins <- seq(-2.5, 2.5, length.out = 51)
h <- hist(eta, breaks = bins, plot = FALSE)
centers <- (h$breaks[-length(h$breaks)] + h$breaks[-1]) / 2

library(jsonlite)
cat(toJSON(list(
  chart_type = "bar",
  title = "Level 1: Raw Detector Hit Distribution Across Pseudorapidity (η) — R",
  x_label = "Pseudorapidity η", y_label = "Hit count",
  series = list(list(name = "Silicon tracker hits",
    data = lapply(seq_along(centers), \\(i) list(x = centers[i], y = h$counts[i])))),
  stats = list(
    list(label = "Total hits", value = format(total_hits, big.mark = ","), tone = "default"),
    list(label = "Avg hits/event", value = sprintf("%.1f", total_hits / n_events), tone = "default")
  ),
  summary = "R's hist() returns counts + breaks in one call — vectorized, no loops."
), auto_unbox = TRUE))
# Key insight: R's rpois()/runif() generate ALL samples in one call.
# The hist() function is the statistical primitive — Python needs np.histogram
# separately from the bin edges. Same math, fewer keystrokes.`,scala:`// Scala — Spark DataFrame with rand() + groupBy for histogram
// Spark scales from laptop to 1000-node cluster — same code, more data
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._

val spark = SparkSession.builder().appName("RawEta").master("local[*]").getOrCreate()
import spark.implicits._

// Generate 50K events \xd7 Poisson(12) hits each — Spark's rand + PoissonGenerator
val nEvents = 50000
val hits = spark.range(nEvents).flatMap { _ =>
  val n = new org.apache.commons.math3.distribution.PoissonDistribution(12).sample()
  (1 to n).map(_ => (scala.util.Random.nextUniform(-2.5, 2.5), 0.0))
}.toDF("eta", "dummy")

// Remove detector gaps: beam pipe + service channels
val cleaned = hits
  .filter(!(abs(col("eta")) < 0.05 || abs(abs(col("eta")) - 1.5) < 0.1))

// Histogram via groupBy + FLOOR (set-based binning)
val hist = cleaned
  .withColumn("bin", floor((col("eta") + 2.5) / 0.1) * 0.1 - 2.5)
  .groupBy("bin").agg(count("*").as("hits"))
  .orderBy("bin")

hist.show(50)
// Key insight: Spark's groupBy + agg is the declarative histogram primitive.
// You describe the SET (bins), not the loop. This scales to 10B hits across
// 100 nodes — same code, more data. Scala's functional flatMap generates
// the variable-length hit lists per event.`,sql:`-- SQL — set-based histogram via GENERATE_ARRAY + GROUP BY FLOOR
-- BigQuery's GENERATE_ARRAY + RAND replace Python's np.random
WITH raw_hits AS (
  -- 50K events \xd7 Poisson(12) hits — BigQuery's Poisson via ARRAY_LENGTH trick
  SELECT
    event_id,
    RAND() * 5 - 2.5 AS eta
  FROM (
    SELECT event_id FROM UNNEST(GENERATE_ARRAY(1, 50000)) AS event_id
  ),
  UNNEST(GENERATE_ARRAY(1, CAST(12 AS INT64))) AS hit_id  -- ~12 hits/event avg
),
cleaned AS (
  -- Remove detector gaps: beam pipe (|eta|<0.05) + service channels
  SELECT eta FROM raw_hits
  WHERE NOT (ABS(eta) < 0.05 OR ABS(ABS(eta) - 1.5) < 0.1)
),
histogram AS (
  -- Set-based binning — FLOOR + GROUP BY replaces Python's np.histogram
  SELECT
    FLOOR(eta * 10) / 10 AS bin_center,
    COUNT(*) AS hit_count
  FROM cleaned
  WHERE eta BETWEEN -2.5 AND 2.5
  GROUP BY FLOOR(eta * 10) / 10
  ORDER BY bin_center
)
SELECT * FROM histogram;
-- Key insight: SQL's GENERATE_ARRAY produces the cartesian product of events
-- \xd7 hits — set-based generation, no loops. GROUP BY FLOOR is the histogram
-- primitive in any warehouse. BigQuery processes 50K events in <1 second.`,julia:`# Julia — vectorized rand() + fit(Histogram) from StatsBase
# Julia's multiple dispatch means the SAME rand() works for any distribution
using Random, StatsBase, JSON, Printf
using Distributions  # Poisson, Uniform

rng = StableRNG(42)
n_events = 50_000
hits_per_event = rand(rng, Poisson(12), n_events)
total_hits = sum(hits_per_event)

# Vectorized uniform sampling — Julia broadcasts the count implicitly via sum
eta = rand(rng, Uniform(-2.5, 2.5), total_hits)
# Detector acceptance gaps
gap_mask = (abs.(eta) .< 0.05) .| (abs.(abs.(eta) .- 1.5) .< 0.1)
eta = eta[.!gap_mask]

# Julia's fit(Histogram, ...) is the idiomatic histogram primitive
h = fit(Histogram, eta, -2.5:0.1:2.5)
centers = (h.edges[1][1:end-1] .+ h.edges[1][2:end]) ./ 2
counts = h.weights

output = Dict(
  "chart_type" => "bar",
  "title" => "Level 1: Raw Detector Hit Distribution Across η — Julia",
  "x_label" => "Pseudorapidity η", "y_label" => "Hit count",
  "series" => [Dict("name" => "Silicon tracker hits",
    "data" => [Dict("x" => c, "y" => Int(counts[i])) for (i,c) in enumerate(centers)])],
  "stats" => [
    Dict("label" => "Total hits", "value" => string(total_hits), "tone" => "default"),
    Dict("label" => "Avg hits/event", "value" => @sprintf("%.1f", total_hits/n_events), "tone" => "default")
  ]
)
println(JSON.json(output))
# Key insight: Julia's Distributions.jl uses multiple dispatch — rand(rng, Poisson(12), n)
# and rand(rng, Uniform(-2.5,2.5), n) are the SAME function. The type determines
# the algorithm. StatsBase.fit(Histogram, ...) is the unified primitive.`},g={python:"(see RAW_NOISE_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy/scipy.stats.moyal)",r:`# R — rnorm() + extraDistr::rlandau() (Moyal approx) for ADC spectrum
# R's vectorized sampling + hist() in one pipeline
set.seed(42)
library(jsonlite)
library(extraDistr)  # rlandau, rmoyal

n_samples <- 50000
# Signal: Moyal distribution (Landau approximation for MIP energy loss)
signal <- rmoyal(n_samples, mu = 20, sigma = 5)
# Noise: Gaussian electronic noise
noise <- rnorm(n_samples, mean = 0, sd = 5)

bins <- seq(-20, 100, length.out = 61)
h_sig <- hist(signal, breaks = bins, plot = FALSE)
h_noise <- hist(noise, breaks = bins, plot = FALSE)
centers <- (h_sig$breaks[-length(h_sig$breaks)] + h_sig$breaks[-1]) / 2

# 3σ threshold (15 ADC) — R's quantile() is vectorized
threshold <- qnorm(0.99, mean = 0, sd = 5)

cat(toJSON(list(
  chart_type = "bar",
  title = "Level 1: ADC Charge Spectrum — Signal (Landau/MIP) vs Noise (Gaussian) — R",
  x_label = "ADC charge", y_label = "Count",
  series = list(
    list(name = "Signal (MIP, Landau)",
      data = lapply(seq_along(centers), \\(i) list(x = centers[i], y = h_sig$counts[i]))),
    list(name = "Noise (electronic, Gaussian)",
      data = lapply(seq_along(centers), \\(i) list(x = centers[i], y = h_noise$counts[i])))
  ),
  stats = list(
    list(label = "Signal MPV", value = "~25 ADC", tone = "success"),
    list(label = "Noise σ", value = "5 ADC", tone = "warning"),
    list(label = "3σ threshold", value = sprintf("%.0f ADC", threshold), tone = "default")
  )
), auto_unbox = TRUE))
# Key insight: R's rmoyal() from extraDistr mirrors scipy.stats.moyal exactly —
# same parameters (mu/sigma → loc/scale). qnorm(0.99) computes the 99th
# percentile in one call — Python needs scipy.stats.norm.ppf.`,scala:`// Scala — Spark randn() + Breeze for Moyal approximation
// Breeze provides Landau/Moyal; Spark provides distributed sampling
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._
import breeze.stats.distributions._

val spark = SparkSession.builder().appName("RawNoise").master("local[*]").getOrCreate()
import spark.implicits._

val nSamples = 50000
val rng = new scala.util.Random(42)

// Breeze's Rand: Gaussian + Moyal (Landau approximation for MIP)
// Scala's for-comprehension is the functional idiom for sampling
val data = (1 to nSamples).flatMap { _ =>
  // Moyal: e^(-0.5*(x-mu)/s) * exp(-e^(-0.5*(x-mu)/s)) — approximated via lognormal
  val signal = 20.0 + 5.0 * (rng.nextGaussian() * 0.5 + math.log(rng.nextDouble() + 1.0) * 1.4)
  val noise = rng.nextGaussian() * 5.0
  Seq(("signal", signal), ("noise", noise))
}.toDF("kind", "adc")

// Set-based histogram via groupBy + FLOOR
val hist = data
  .withColumn("bin", floor(col("adc") / 2.0) * 2.0)
  .groupBy("kind", "bin").agg(count("*").as("count"))
  .orderBy("kind", "bin")

hist.show(60)
// Key insight: Scala's for-comprehension over distributions is the functional
// analog of Python's loop. Breeze provides the same Moyal/Landau as scipy.
// The histogram is a set-based groupBy — Spark scales to 1B samples.`,sql:`-- SQL — BigQuery's RAND + Box-Muller for Gaussian, APPROX quantiles
-- Moyal/Landau approximated via LOG(RAND()) shift (statistical approximation)
WITH samples AS (
  SELECT
    'signal' AS kind,
    -- Moyal approximation: shift of LOGN(0,1) * scale + mu
    20.0 + 5.0 * (LN(1.0 + RAND()) * 1.4 + (RAND() + RAND() + RAND() - 1.5) * 0.5) AS adc
  FROM UNNEST(GENERATE_ARRAY(1, 50000))
  UNION ALL
  SELECT
    'noise' AS kind,
    -- Gaussian via Box-Muller transform (in-warehouse)
    SQRT(-2 * LN(RAND())) * COS(2 * PI() * RAND()) * 5.0 AS adc
  FROM UNNEST(GENERATE_ARRAY(1, 50000))
),
histogram AS (
  SELECT
    kind,
    FLOOR(adc / 2.0) * 2.0 AS bin_center,
    COUNT(*) AS count
  FROM samples
  GROUP BY kind, FLOOR(adc / 2.0) * 2.0
)
SELECT * FROM histogram ORDER BY kind, bin_center;
-- Key insight: BigQuery's RAND() + LOG() implements the Moyal approximation
-- inline — no Python needed. Box-Muller (SQRT(-2*LN(RAND()))*COS(2*PI*RAND()))
-- is the standard SQL Gaussian. The histogram is one GROUP BY.`,julia:`# Julia — Distributions.jl's Moyal + Normal via multiple dispatch
# Julia's rand(rng, Distribution, n) is the unified sampling primitive
using Random, Distributions, StatsBase, JSON, Printf
using StableRNGs

rng = StableRNG(42)
n_samples = 50_000

# Same rand() function — multiple dispatch selects the algorithm
signal = rand(rng, Moyal(mu = 20.0, sigma = 5.0), n_samples)
noise  = rand(rng, Normal(0.0, 5.0), n_samples)

# Histogram via StatsBase
bins = -20.0:2.0:100.0
h_sig = fit(Histogram, signal, bins)
h_noise = fit(Histogram, noise, bins)
centers = (bins[1:end-1] .+ bins[2:end]) ./ 2

# 3σ threshold — Julia's quantile on Normal
threshold = quantile(Normal(0.0, 5.0), 0.99)

output = Dict(
  "chart_type" => "bar",
  "title" => "Level 1: ADC Charge Spectrum — Julia",
  "x_label" => "ADC charge", "y_label" => "Count",
  "series" => [
    Dict("name" => "Signal (MIP, Landau)",
      "data" => [Dict("x" => c, "y" => Int(h_sig.weights[i])) for (i,c) in enumerate(centers)]),
    Dict("name" => "Noise (electronic, Gaussian)",
      "data" => [Dict("x" => c, "y" => Int(h_noise.weights[i])) for (i,c) in enumerate(centers)])
  ],
  "stats" => [
    Dict("label" => "Signal MPV", "value" => "~25 ADC", "tone" => "success"),
    Dict("label" => "Noise σ", "value" => "5 ADC", "tone" => "warning"),
    Dict("label" => "3σ threshold", "value" => @sprintf("%.0f ADC", threshold), "tone" => "default")
  ]
)
println(JSON.json(output))
# Key insight: Julia's rand(rng, Moyal(...), n) and rand(rng, Normal(...), n)
# are the SAME function — multiple dispatch on the Distribution type. Python
# needs scipy.stats.moyal.rvs vs np.random.normal — two different APIs.`},f={python:"(see TRACKS_3D_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy)",r:`# R — vectorized helix generation across tracks via lapply
# R's vectorized cos/sin/tan replace Python's per-point loop
set.seed(42)
library(jsonlite)
library(jsonlite)

B <- 3.8  # Tesla (CMS solenoid)
# Generate 8 tracks via lapply (functional, parallelizable)
tracks_3d <- do.call(rbind, lapply(1:8, function(i) {
  pt <- rexp(1, rate = 1/30) + 10
  phi0 <- runif(1, 0, 2 * pi)
  theta <- runif(1, pi/4, 3*pi/4)
  charge <- if (i %% 2 == 0) 1 else -1
  radius <- pt / (0.3 * B) * 0.01  # detector scale
  # Helix points — vectorized over t
  t <- seq(0, 2*pi, length.out = 50)
  x <- radius * cos(t + phi0) * charge
  y <- radius * sin(t + phi0) * charge
  z <- radius / tan(theta) * t / (2*pi) * 3
  # Subsample 15 points per track
  idx <- seq(1, 50, by = 4)
  data.frame(
    x = x[idx], y = y[idx], z = z[idx],
    group = sprintf("Track %d (q=%s, pT=%.0f GeV)",
                   i, ifelse(charge > 0, "+", "-"), pt)
  )
}))

cat(toJSON(list(
  chart_type = "scatter",
  title = "Level 5: 3D Particle Tracks — Higgs → 4μ Event Display (R, B=3.8T)",
  x_label = "x (detector, cm)", y_label = "y (detector, cm)",
  series = list(list(name = "Track points",
    data = lapply(seq_len(nrow(tracks_3d)),
      \\(i) list(x = tracks_3d$x[i], y = tracks_3d$y[i])))),
  points3d = lapply(seq_len(nrow(tracks_3d)),
    \\(i) list(x = tracks_3d$x[i], y = tracks_3d$y[i], z = tracks_3d$z[i]))
), auto_unbox = TRUE))
# Key insight: R's lapply over tracks + vectorized cos/sin over t is the
# "outer loop functional, inner loop vectorized" pattern — same math as
# Python's nested for-loops, but expressed declaratively.`,scala:`// Scala — Spark + Breeze for vectorized helix math
// Spark's parallel collection handles multiple tracks concurrently
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.sql.Row
import breeze.math._
import breeze.numerics._

val spark = SparkSession.builder().appName("Tracks3D").master("local[*]").getOrCreate()
import spark.implicits._

val B = 3.8  // Tesla
val rng = new scala.util.Random(42)

// Functional flatMap across 8 tracks — each track returns 15 3D points
val tracks = (1 to 8).flatMap { i =>
  val pt = rng.exp(1.0/30) + 10
  val phi0 = rng.nextDouble() * 2 * math.Pi
  val theta = rng.nextDouble() * (math.Pi/2) + math.Pi/4
  val charge = if (i % 2 == 0) 1 else -1
  val radius = pt / (0.3 * B) * 0.01
  // Breeze vectorized helix — same as numpy
  val t = (0 until 50).map(_ * 2 * math.Pi / 49).toArray
  val x = t.map(t => radius * math.cos(t + phi0) * charge)
  val y = t.map(t => radius * math.sin(t + phi0) * charge)
  val z = t.map(t => radius / math.tan(theta) * t / (2 * math.Pi) * 3)
  // Subsample 15 points
  (0 until 50 by 4).map { j =>
    (i, x(j), y(j), z(j), s"Track $i (q=\${if (charge > 0) "+" else "-"}, pT=\${pt.toInt} GeV)")
  }
}.toDF("track_id", "x", "y", "z", "group")

tracks.show(20)
// Key insight: Scala's flatMap across tracks is the functional parallel idiom —
// each track's points are generated independently, so Spark can distribute
// across cores. Breeze handles the vectorized trig math — same as numpy.`,sql:`-- SQL — set-based helix generation via GENERATE_ARRAY + trig
-- Each track's 50 points are a CROSS JOIN of tracks \xd7 t-values
WITH track_params AS (
  -- 8 tracks with random params (RAND() seeded implicitly)
  SELECT track_id, pt, phi0, theta, charge FROM UNNEST([
    STRUCT(1 AS track_id, 30.0 AS pt, 0.5 AS phi0, 1.0 AS theta, 1 AS charge),
    STRUCT(2, 25.0, 1.2, 1.5, -1),
    STRUCT(3, 40.0, 2.1, 2.0, 1),
    STRUCT(4, 18.0, 3.4, 0.9, -1),
    STRUCT(5, 22.0, 4.5, 1.7, 1),
    STRUCT(6, 35.0, 5.6, 2.2, -1),
    STRUCT(7, 28.0, 0.3, 1.3, 1),
    STRUCT(8, 33.0, 2.8, 1.9, -1)
  ])
),
helix_points AS (
  SELECT
    t.track_id,
    (t.pt / (0.3 * 3.8) * 0.01) AS radius,
    t.charge,
    t.pt,
    -- 50 t-values per track via GENERATE_ARRAY
    CAST(t_val AS FLOAT64) * 2 * PI() / 49 AS t,
    t.phi0, t.theta
  FROM track_params t,
  UNNEST(GENERATE_ARRAY(0, 49)) AS t_val
)
SELECT
  track_id,
  radius * COS(t + phi0) * charge AS x,
  radius * SIN(t + phi0) * charge AS y,
  radius / TAN(theta) * t / (2 * PI()) * 3 AS z
FROM helix_points
WHERE MOD(CAST(t * 49 / (2 * PI()) AS INT64), 4) = 0;  -- subsample every 4th
-- Key insight: SQL's CROSS JOIN of tracks \xd7 t-values is the set-based analog
-- of Python's nested loop. Trig functions (COS, SIN, TAN) are built into
-- standard SQL — no extra libraries needed.`,julia:`# Julia — parametric helix via comprehension + broadcasting
# Julia's multiple dispatch on cos/sin/tan handles scalars AND vectors
using Random, JSON, Printf
using StableRNGs

rng = StableRNG(42)
const B = 3.8  # Tesla

# Functional comprehension — generates 8 tracks in one expression
tracks_3d = vcat([begin
    pt = randexp(rng) * 30 + 10
    phi0 = rand(rng, Uniform(0, 2π))
    theta = rand(rng, Uniform(π/4, 3π/4))
    charge = i % 2 == 0 ? 1 : -1
    radius = pt / (0.3 * B) * 0.01
    # Julia's broadcasting — explicit element-wise (cos.() vs cos)
    t = range(0, 2π, length = 50)
    x = radius .* cos.(t .+ phi0) .* charge
    y = radius .* sin.(t .+ phi0) .* charge
    z = radius ./ tan.(theta) .* t ./ (2π) .* 3
    # Subsample every 4th point
    idx = 1:4:50
    [(x[j], y[j], z[j], "Track $i (q=$(charge > 0 ? "+" : "-"), pT=$(round(Int,pt)) GeV)")
     for j in idx]
  end for i in 1:8]...)

output = Dict(
  "chart_type" => "scatter",
  "title" => "Level 5: 3D Particle Tracks — Julia (B=3.8T)",
  "x_label" => "x (detector, cm)", "y_label" => "y (detector, cm)",
  "series" => [Dict("name" => "Track points",
    "data" => [Dict("x" => t[1], "y" => t[2]) for t in tracks_3d])],
  "points3d" => [Dict("x" => t[1], "y" => t[2], "z" => t[3]) for t in tracks_3d]
)
println(JSON.json(output))
# Key insight: Julia's broadcasting (cos.()) is explicit element-wise — unlike
# Python's implicit numpy vectorization. The reader sees WHICH operations are
# scalar vs vector. The comprehension [f(i) for i in 1:8] is the functional
# analog of Python's for-loop, but returns a typed Array.`},b={python:"(see CORRELATION_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy.corrcoef)",r:`# R — cor() for the matrix + reshape2::melt for heatmap cells
# R's cor() is THE statistical primitive — one call replaces Python's loop
set.seed(42)
library(jsonlite)

n_events <- 5000
m4l <- rnorm(n_events, mean = 125, sd = 5)
pt_leading <- rexp(n_events, rate = 1/40) + 20 + 0.3 * (m4l - 125)
met <- abs(rnorm(n_events, mean = 10, sd = 8))
njets <- rpois(n_events, lambda = 2) + ifelse(met > 20, 1, 0)
delta_r <- rexp(n_events, rate = 1/0.4) + 0.1
isolation <- rexp(n_events, rate = 1/0.05)
eta_leading <- runif(n_events, -2.4, 2.4)
n_muons <- rpois(n_events, lambda = 4)

# R's data.frame + cor() — the canonical statistical pipeline
df <- data.frame(m4l, pt_leading, met, njets, delta_r, isolation, eta_leading, n_muons)
features <- c("m(4μ)", "pT(μ₁)", "MET", "N_jets", "ΔR(μ₁,μ₂)", "Iso(μ₁)", "η(μ₁)", "N_μons")
colnames(df) <- features
corr_matrix <- cor(df)  # one call — replaces Python's np.corrcoef(data.T)

# reshape2::melt converts matrix → long-format for heatmap cells
library(reshape2)
cells_long <- melt(corr_matrix)
cells <- lapply(seq_len(nrow(cells_long)), function(i)
  list(row = cells_long$Var1[i], col = cells_long$Var2[i], value = cells_long$value[i]))

cat(toJSON(list(
  chart_type = "heatmap",
  title = "Level 3: Feature Correlation Matrix — R",
  heatmap = list(
    cells = cells, rows = length(features), cols = length(features),
    row_labels = features, col_labels = features,
    vmin = -1.0, vmax = 1.0, colormap = "viridis"
  ),
  stats = list(
    list(label = "Variables", value = as.character(length(features)), tone = "default"),
    list(label = "Redundant vars", value = "0 (all < 0.7)", tone = "success")
  )
), auto_unbox = TRUE))
# Key insight: R's cor() is the canonical correlation primitive — one function
# for the entire matrix. Python splits this into np.corrcoef(data.T). R's
# reshape2::melt() handles the matrix→cells transformation needed for heatmaps.`,scala:`// Scala — Spark MLlib Correlation.corr for distributed matrix
// Spark computes correlations across TB-scale data in parallel
import org.apache.spark.sql.SparkSession
import org.apache.spark.ml.feature.VectorAssembler
import org.apache.spark.ml.stat.Correlation
import org.apache.spark.sql.functions._

val spark = SparkSession.builder().appName("Correlation").master("local[*]").getOrCreate()
import spark.implicits._

val rng = new scala.util.Random(42)
val nEvents = 5000

// Generate correlated physics variables via Spark's rand functions
val df = spark.range(nEvents).select(
  randn() * 5 + 125 as "m4l",
  rand() * 40 + 20 as "pt_leading",
  abs(randn() * 8 + 10) as "met",
  (rand() * 4).cast("int") as "njets"
).withColumn("pt_leading", col("pt_leading") + (col("m4l") - 125) * 0.3)

val featureCols = Array("m4l", "pt_leading", "met", "njets")
val assembler = new VectorAssembler()
  .setInputCols(featureCols).setOutputCol("features")
val vecDF = assembler.transform(df)

// Spark MLlib's Correlation.corr — distributed Pearson correlation
val corrMatrix = Correlation.corr(vecDF, "features").head.getAs[org.apache.spark.ml.linalg.Matrix](0)

println("Correlation matrix:")
for (i <- 0 until corrMatrix.numRows; j <- 0 until corrMatrix.numCols) {
  println(s"$i,$j: \${corrMatrix(i, j)}")
}
// Key insight: Spark's Correlation.corr is the distributed analog of
// np.corrcoef — same math (Pearson), but it scales to 1B rows across a
// cluster. The Matrix result is sparse-friendly — important for high-dim.`,sql:`-- SQL — CORR() aggregate function per pair (BigQuery/ClickHouse)
-- SQL's set-based correlation: one query per pair, computed in parallel
WITH features AS (
  -- Generate correlated physics variables
  SELECT
    RAND_NORMAL(125, 5) AS m4l,
    RAND() * 40 + 20 AS pt_leading,
    ABS(RAND_NORMAL(10, 8)) AS met,
    FLOOR(RAND() * 4) AS njets
  FROM UNNEST(GENERATE_ARRAY(1, 5000))
),
correlations AS (
  -- Pairwise correlations via CORR() — set-based, parallel
  SELECT 'm4l vs pt' AS pair, CORR(m4l, pt_leading) AS r FROM features
  UNION ALL
  SELECT 'm4l vs met', CORR(m4l, met) FROM features
  UNION ALL
  SELECT 'm4l vs njets', CORR(m4l, njets) FROM features
  UNION ALL
  SELECT 'pt vs met', CORR(pt_leading, met) FROM features
  UNION ALL
  SELECT 'pt vs njets', CORR(pt_leading, njets) FROM features
  UNION ALL
  SELECT 'met vs njets', CORR(met, njets) FROM features
)
SELECT pair, r FROM correlations ORDER BY ABS(r) DESC;
-- Key insight: SQL's CORR() is the in-warehouse correlation primitive —
-- computes the SAME Pearson r as np.corrcoef, but on warehouse-scale data.
-- The downside: SQL needs one query per pair (no matrix output). For a full
-- N\xd7N matrix, you'd CROSS JOIN features with themselves.`,julia:`# Julia — cor() from Statistics + DataFrames for the matrix
# Julia's cor() dispatches on matrix types — same function for vectors & matrices
using Random, Statistics, DataFrames, JSON
using StableRNGs

rng = StableRNG(42)
n_events = 5_000

m4l = randn(rng, n_events) .* 5 .+ 125
pt_leading = randexp(rng, n_events) .* 40 .+ 20 .+ 0.3 .* (m4l .- 125)
met = abs.(randn(rng, n_events) .* 8 .+ 10)
njets = rand(rng, Poisson(2), n_events) .+ (met .> 20)
delta_r = randexp(rng, n_events) .* 0.4 .+ 0.1
isolation = randexp(rng, n_events) .* 0.05
eta_leading = rand(rng, Uniform(-2.4, 2.4), n_events)
n_muons = rand(rng, Poisson(4), n_events)

features = ["m(4μ)", "pT(μ₁)", "MET", "N_jets", "ΔR(μ₁,μ₂)", "Iso(μ₁)", "η(μ₁)", "N_μons"]
df = DataFrame(m4l = m4l, pt_leading = pt_leading, met = met, njets = njets,
               delta_r = delta_r, isolation = isolation, eta_leading = eta_leading,
               n_muons = n_muons)

# Julia's cor() works on a Matrix — one call for the entire correlation matrix
X = Matrix(df)
corr_matrix = cor(X)

cells = [Dict("row" => i-1, "col" => j-1, "value" => corr_matrix[i,j])
         for i in 1:size(corr_matrix,1) for j in 1:size(corr_matrix,2)]

output = Dict(
  "chart_type" => "heatmap",
  "title" => "Level 3: Feature Correlation Matrix — Julia",
  "heatmap" => Dict(
    "cells" => cells, "rows" => length(features), "cols" => length(features),
    "row_labels" => features, "col_labels" => features,
    "vmin" => -1.0, "vmax" => 1.0, "colormap" => "viridis"
  )
)
println(JSON.json(output))
# Key insight: Julia's cor(X) for a Matrix is multiple dispatch — the SAME
# function works for Vector, Matrix, or DataFrame. DataFrames.jl provides
# the R-like syntax, while Statistics.cor provides the math. Python needs
# np.corrcoef — one library, one function, same paradigm everywhere.`},y={python:"(see FEATURE_IMPORTANCE_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy)",r:`# R — data.frame + dplyr::arrange for sorting SHAP values
# R's dplyr is the canonical data manipulation grammar
set.seed(42)
library(jsonlite)
library(dplyr)

features <- c("m(4μ)","MET","pT(μ₁)","N_jets","ΔR(μ₁,μ₂)",
              "η(μ₁)","Isolation","dZ(μ)","pT(4μ)","Δφ(μ₁,μ₂)",
              "N_muons","vertex χ\xb2","d0(μ₁)","pT(rel)","m(μμ)")

shap_signal <- c(0.85,0.42,0.28,0.22,0.15,0.08,0.06,0.04,0.03,0.02,
                 0.015,0.01,0.008,0.005,0.003)
shap_background <- c(0.12,0.78,0.35,0.65,0.18,0.11,0.09,0.03,0.02,0.015,
                     0.01,0.008,0.006,0.004,0.002)

# dplyr pipeline — sort by signal importance (the functional idiom)
df <- data.frame(feature = features, signal = shap_signal, background = shap_background) |>
  arrange(desc(signal))

cat(toJSON(list(
  chart_type = "bar",
  title = "Level 3: Feature Importance (SHAP) — Signal vs Background — R",
  x_label = "Feature", y_label = "Mean |SHAP value|",
  series = list(
    list(name = "Signal (Higgs) importance",
      data = lapply(seq_len(nrow(df)),
        \\(i) list(x = df$feature[i], y = df$signal[i]))),
    list(name = "Background (QCD) importance",
      data = lapply(seq_len(nrow(df)),
        \\(i) list(x = df$feature[i], y = df$background[i])))
  ),
  stats = list(
    list(label = "Top signal feature", value = "m(4μ) = 0.85", tone = "success"),
    list(label = "Top bg feature", value = "MET = 0.78", tone = "warning"),
    list(label = "Pruning threshold", value = "0.01 (bottom 3 removed)", tone = "default")
  )
), auto_unbox = TRUE))
# Key insight: R's dplyr |> arrange(desc(signal)) is the declarative sort —
# Python's np.argsort(-shap_signal) is imperative. Same result, but dplyr's
# pipeline is composable: filter, mutate, summarise all chain naturally.`,scala:`// Scala — Spark DataFrame + sort for SHAP ordering
// Spark's distributed sort scales to millions of features
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

val spark = SparkSession.builder().appName("FeatureImportance").master("local[*]").getOrCreate()
import spark.implicits._

val features = Array("m(4μ)","MET","pT(μ₁)","N_jets","ΔR(μ₁,μ₂)",
  "η(μ₁)","Isolation","dZ(μ)","pT(4μ)","Δφ(μ₁,μ₂)",
  "N_muons","vertex χ\xb2","d0(μ₁)","pT(rel)","m(μμ)")

val shapSig = Array(0.85,0.42,0.28,0.22,0.15,0.08,0.06,0.04,0.03,0.02,
  0.015,0.01,0.008,0.005,0.003)
val shapBg = Array(0.12,0.78,0.35,0.65,0.18,0.11,0.09,0.03,0.02,0.015,
  0.01,0.008,0.006,0.004,0.002)

// Spark DataFrame from a typed Dataset — the functional idiom
val df = features.zip(shapSig).zip(shapBg).toSeq.toDF("feature_sig_bg")
  .select(
    split(col("feature_sig_bg"), "_")(0) as "feature",
    split(col("feature_sig_bg"), "_")(1).cast("double") as "signal",
    split(col("feature_sig_bg"), "_")(2).cast("double") as "background"
  )
  .orderBy(col("signal").desc)

df.show(15)
// Key insight: Scala's sort via orderBy is the functional analog of Python's
// argsort. Spark's typed Dataset[T] preserves types throughout the pipeline —
// unlike Python where numpy arrays lose their feature names.`,sql:`-- SQL — ORDER BY for sorting + UNNEST for the feature array
-- SQL's set-based sort is the declarative primitive
WITH feature_shap AS (
  -- UNNEST the feature + SHAP arrays in parallel (set-based)
  SELECT feature, signal_imp, background_imp FROM UNNEST([
    STRUCT('m(4μ)' AS feature, 0.85 AS signal_imp, 0.12 AS background_imp),
    STRUCT('MET', 0.42, 0.78),
    STRUCT('pT(μ₁)', 0.28, 0.35),
    STRUCT('N_jets', 0.22, 0.65),
    STRUCT('ΔR(μ₁,μ₂)', 0.15, 0.18),
    STRUCT('η(μ₁)', 0.08, 0.11),
    STRUCT('Isolation', 0.06, 0.09),
    STRUCT('dZ(μ)', 0.04, 0.03),
    STRUCT('pT(4μ)', 0.03, 0.02),
    STRUCT('Δφ(μ₁,μ₂)', 0.02, 0.015),
    STRUCT('N_muons', 0.015, 0.01),
    STRUCT('vertex χ\xb2', 0.01, 0.008),
    STRUCT('d0(μ₁)', 0.008, 0.006),
    STRUCT('pT(rel)', 0.005, 0.004),
    STRUCT('m(μμ)', 0.003, 0.002)
  ])
)
SELECT
  feature,
  signal_imp,
  background_imp,
  -- Flag for pruning (signal_imp < 0.01)
  CASE WHEN signal_imp < 0.01 THEN 'PRUNE' ELSE 'KEEP' END AS decision
FROM feature_shap
ORDER BY signal_imp DESC;
-- Key insight: SQL's ORDER BY is the declarative sort — same as Python's
-- argsort but set-based. The CASE WHEN expression is the SQL analog of
-- Python's boolean mask. UNNEST(ARRAY<STRUCT>) is the SQL way to build a
-- table from constants — no INSERT needed.`,julia:`# Julia — DataFrames.sort! + JSON output
# Julia's sort! is in-place (sortperm for index) — multiple dispatch on sort vs sort!
using Random, DataFrames, JSON, Printf
using StableRNGs

rng = StableRNG(42)
features = ["m(4μ)","MET","pT(μ₁)","N_jets","ΔR(μ₁,μ₂)",
            "η(μ₁)","Isolation","dZ(μ)","pT(4μ)","Δφ(μ₁,μ₂)",
            "N_muons","vertex χ\xb2","d0(μ₁)","pT(rel)","m(μμ)"]
shap_signal = [0.85,0.42,0.28,0.22,0.15,0.08,0.06,0.04,0.03,0.02,
               0.015,0.01,0.008,0.005,0.003]
shap_background = [0.12,0.78,0.35,0.65,0.18,0.11,0.09,0.03,0.02,0.015,
                   0.01,0.008,0.006,0.004,0.002]

# DataFrames.jl — the canonical tabular data structure
df = DataFrame(feature = features, signal = shap_signal, background = shap_background)
# sort! is in-place; sort returns a copy — multiple dispatch on the bang
sort!(df, :signal, rev = true)

output = Dict(
  "chart_type" => "bar",
  "title" => "Level 3: Feature Importance (SHAP) — Julia",
  "x_label" => "Feature", "y_label" => "Mean |SHAP value|",
  "series" => [
    Dict("name" => "Signal (Higgs) importance",
      "data" => [Dict("x" => f, "y" => s) for (f,s) in zip(df.feature, df.signal)]),
    Dict("name" => "Background (QCD) importance",
      "data" => [Dict("x" => f, "y" => b) for (f,b) in zip(df.feature, df.background)])
  ],
  "stats" => [
    Dict("label" => "Top signal feature", "value" => "m(4μ) = 0.85", "tone" => "success"),
    Dict("label" => "Top bg feature", "value" => "MET = 0.78", "tone" => "warning"),
    Dict("label" => "Pruning threshold", "value" => "0.01 (bottom 3 removed)", "tone" => "default")
  ]
)
println(JSON.json(output))
# Key insight: Julia's sort! (in-place) vs sort (returns copy) is the bang
# convention — explicit about mutation. DataFrames.jl mirrors R's dplyr but
# with Julia's multiple dispatch: sort!(df, :signal, rev=true) is one call.`},_={python:"(see SIGNIFICANCE_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy)",r:`# R — vectorized sqrt(L) scaling, all 4 curves in one pipeline
# R's vectorized arithmetic — no loop over luminosity points
set.seed(42)
library(jsonlite)

# R's seq() is the vectorized range — equivalent to numpy.linspace
luminosity <- seq(1, 300, length.out = 100)

# Significance scales as √L \xd7 S/√B — vectorized across all 4 ML methods
sig_cut <- 0.9 * sqrt(luminosity)
sig_bdt <- 1.3 * sqrt(luminosity)
sig_cnn <- 1.5 * sqrt(luminosity)
sig_gnn <- 1.7 * sqrt(luminosity)

# HL-LHC hypothetical
sig_hl <- 1.7 * sqrt(3000)

# Build series list (R's lapply is the functional loop)
mk_series <- function(name, sig) {
  list(name = name, data = lapply(seq_along(luminosity),
    \\(i) list(x = luminosity[i], y = sig[i])))
}

cat(toJSON(list(
  chart_type = "line",
  title = "Level 3: Signal Significance vs Luminosity — R",
  x_label = "Integrated luminosity (fb⁻\xb9)", y_label = "Significance (σ)",
  series = list(
    mk_series("Cut-based", sig_cut),
    mk_series("BDT (substructure)", sig_bdt),
    mk_series("CNN (jet image)", sig_cnn),
    mk_series("GNN (ParticleNet)", sig_gnn)
  ),
  stats = list(
    list(label = "GNN @30 fb⁻\xb9", value = sprintf("%.1fσ", 1.7 * sqrt(30)), tone = "success"),
    list(label = "HL-LHC @3000 fb⁻\xb9", value = sprintf("~%.0fσ", sig_hl), tone = "success")
  ),
  reference_lines = list(
    list(y = 3, label = "Evidence (3σ)", color = "#f59e0b"),
    list(y = 5, label = "Discovery (5σ)", color = "#10b981")
  )
), auto_unbox = TRUE))
# Key insight: R's vectorized sqrt() + arithmetic computes all 100 luminosity
# points in ONE expression per curve — no loop. Python needs np.sqrt(lum) —
# same math, but R's formula notation (y = a * sqrt(x)) reads like math.`,scala:`// Scala — Spark range + UDF for significance curves
// Spark computes the curves distributed across partitions
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

val spark = SparkSession.builder().appName("Significance").master("local[*]").getOrCreate()
import spark.implicits._

// Generate luminosity points via Spark's range + UDF
val lumDF = spark.range(1, 301).withColumn("luminosity", col("id").cast("double"))
  .withColumn("lum_step", lit(300.0/100.0))

// Resample to 100 points (mimicking linspace)
val lum = spark.range(0, 100).select((lit(1.0) + col("id") * 3.0) as "luminosity")

// Significance = k * sqrt(L) — vectorized via Spark SQL functions
val sigDF = lum.select(
  col("luminosity"),
  lit(0.9) * sqrt(col("luminosity")) as "sig_cut",
  lit(1.3) * sqrt(col("luminosity")) as "sig_bdt",
  lit(1.5) * sqrt(col("luminosity")) as "sig_cnn",
  lit(1.7) * sqrt(col("luminosity")) as "sig_gnn"
).orderBy("luminosity")

sigDF.show(10)

// Compute HL-LHC hypothetical
val sigHL = 1.7 * math.sqrt(3000)
println(f"HL-LHC significance (GNN, 3000 fb⁻\xb9): $sigHL%.0fσ")
// Key insight: Spark's lit() + sqrt() are the SQL-style column expressions —
// same vectorized math as numpy. The DataFrame is the distributed analog of
// a numpy array. For 100 points this is overkill, but the SAME code scales
// to 100M luminosity scenarios for hypothetical physics studies.`,sql:`-- SQL — GENERATE_ARRAY + SQRT for vectorized significance curves
-- BigQuery's set-based math: one row per luminosity point
WITH luminosity AS (
  -- 100 points from 1 to 300 fb⁻\xb9
  SELECT 1.0 + (value - 1) * 299.0 / 99.0 AS L
  FROM UNNEST(GENERATE_ARRAY(1, 100)) AS value
),
significance AS (
  -- All 4 ML curves in one SELECT — set-based vectorization
  SELECT
    L,
    0.9 * SQRT(L) AS sig_cut,
    1.3 * SQRT(L) AS sig_bdt,
    1.5 * SQRT(L) AS sig_cnn,
    1.7 * SQRT(L) AS sig_gnn,
    -- Discovery threshold crossing
    CASE
      WHEN 0.9 * SQRT(L) >= 5.0 AND 0.9 * SQRT(L - 3) < 5.0 THEN 'cut@5σ'
      WHEN 1.7 * SQRT(L) >= 5.0 AND 1.7 * SQRT(L - 3) < 5.0 THEN 'gnn@5σ'
    END AS discovery_crossover
  FROM luminosity
)
SELECT * FROM significance ORDER BY L;
-- Key insight: SQL's SQRT() is set-based — one expression per row, computed
-- in parallel across warehouse cores. The CASE WHEN detects the 5σ crossover
-- inline — same logic as Python's boolean mask, but declarative.`,julia:`# Julia — vectorized sqrt.() + broadcasting for all 4 curves
# Julia's dot syntax (sqrt.()) is explicit broadcasting
using Random, JSON, Printf
using StableRNGs

rng = StableRNG(42)
luminosity = range(1.0, 300.0, length = 100)

# Julia's broadcasting (.*) — explicit element-wise, like numpy but visible
sig_cut = 0.9 .* sqrt.(luminosity)
sig_bdt = 1.3 .* sqrt.(luminosity)
sig_cnn = 1.5 .* sqrt.(luminosity)
sig_gnn = 1.7 .* sqrt.(luminosity)

# HL-LHC hypothetical (one scalar — no dot syntax needed)
sig_hl = 1.7 * sqrt(3000.0)

mk_series(name, sig) = Dict(
  "name" => name,
  "data" => [Dict("x" => l, "y" => s) for (l,s) in zip(luminosity, sig)]
)

output = Dict(
  "chart_type" => "line",
  "title" => "Level 3: Signal Significance vs Luminosity — Julia",
  "x_label" => "Integrated luminosity (fb⁻\xb9)", "y_label" => "Significance (σ)",
  "series" => [
    mk_series("Cut-based", sig_cut),
    mk_series("BDT (substructure)", sig_bdt),
    mk_series("CNN (jet image)", sig_cnn),
    mk_series("GNN (ParticleNet)", sig_gnn)
  ],
  "stats" => [
    Dict("label" => "GNN @30 fb⁻\xb9", "value" => @sprintf("%.1fσ", 1.7*sqrt(30)), "tone" => "success"),
    Dict("label" => "HL-LHC @3000 fb⁻\xb9", "value" => @sprintf("~%.0fσ", sig_hl), "tone" => "success")
  ],
  "reference_lines" => [
    Dict("y" => 3, "label" => "Evidence (3σ)", "color" => "#f59e0b"),
    Dict("y" => 5, "label" => "Discovery (5σ)", "color" => "#10b981")
  ]
)
println(JSON.json(output))
# Key insight: Julia's sqrt.(x) is explicit broadcasting — the dot tells you
# "element-wise". Python's np.sqrt(x) is implicit. Same math, but Julia's
# notation makes the operation visible. range(1, 300, length=100) is the
# precise analog of numpy.linspace.`},v={python:"(see SYSTEMATICS_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy)",r:`# R — data.frame + dplyr::arrange + sqrt(sum(x^2)) for quadrature
# R's dplyr is the canonical grammar for tabular manipulation
set.seed(42)
library(jsonlite)
library(dplyr)

sources <- c("Jet Energy Scale","Jet Energy Resolution","b-tagging efficiency",
  "Luminosity","Pileup modeling","PDF (CT18)","Scale variations","Lepton ID",
  "Trigger efficiency","Missing ET scale","Pileup jet ID","Prefire weighting")
impacts <- c(4.2, 2.1, 1.8, 1.5, 1.2, 1.0, 0.8, 0.6, 0.5, 0.4, 0.3, 0.2)

# dplyr pipeline: data.frame → arrange → mutate
df <- data.frame(source = sources, impact = impacts) |>
  arrange(desc(impact))

# Total systematic in quadrature: sqrt(sum(impacts^2))
total <- sqrt(sum(impacts^2))

cat(toJSON(list(
  chart_type = "bar",
  title = "Level 3: Systematic Uncertainty Budget — R",
  x_label = "Uncertainty source", y_label = "Relative impact (%)",
  series = list(list(name = "Impact on σ\xd7BR",
    data = lapply(seq_len(nrow(df)),
      \\(i) list(x = df$source[i], y = df$impact[i])))),
  stats = list(
    list(label = "Total systematic", value = sprintf("%.1f%% (quadrature)", total), tone = "warning"),
    list(label = "Dominant source", value = "Jet Energy Scale (4.2%)", tone = "destructive"),
    list(label = "Statistical", value = "~0.8% (100 fb⁻\xb9)", tone = "success")
  ),
  reference_lines = list(list(y = 0.8, label = "Statistical uncertainty", color = "#10b981"))
), auto_unbox = TRUE))
# Key insight: R's sqrt(sum(x^2)) is the quadrature formula in one expression.
# Python needs np.sqrt(np.sum(np.array(impacts)**2)) — same math, but R reads
# closer to the physics notation √(Σx\xb2).`,scala:`// Scala — Spark DataFrame + sort + UDF for quadrature
// Spark's agg + sqrt computes the total in one pass
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

val spark = SparkSession.builder().appName("Systematics").master("local[*]").getOrCreate()
import spark.implicits._

val sources = Array("Jet Energy Scale","Jet Energy Resolution","b-tagging efficiency",
  "Luminosity","Pileup modeling","PDF (CT18)","Scale variations","Lepton ID",
  "Trigger efficiency","Missing ET scale","Pileup jet ID","Prefire weighting")
val impacts = Array(4.2, 2.1, 1.8, 1.5, 1.2, 1.0, 0.8, 0.6, 0.5, 0.4, 0.3, 0.2)

// Typed Dataset — Scala's case class pattern
case class Uncertainty(source: String, impact: Double)
val df = sources.zip(impacts).map { case (s, i) => Uncertainty(s, i) }
  .toDS().orderBy(col("impact").desc)

// Total in quadrature: sqrt(sum(impact^2)) via Spark SQL
val total = df.agg(sqrt(sum(col("impact") * col("impact")))).head.getDouble(0)

df.show(12)
println(f"Total systematic (quadrature): $total%.1f%%")
// Key insight: Scala's case class + Dataset[T] is the typed analog of R's
// data.frame. The agg(sqrt(sum(...))) is the same quadrature formula — but
// Spark computes it distributed across cores. For 12 sources this is trivial,
// but the SAME code scales to 10K systematic sources in production.`,sql:`-- SQL — ORDER BY + SUM(impact^2) for quadrature total
-- BigQuery's set-based aggregation computes the total in one pass
WITH systematics AS (
  SELECT source, impact FROM UNNEST([
    STRUCT('Jet Energy Scale' AS source, 4.2 AS impact),
    STRUCT('Jet Energy Resolution', 2.1),
    STRUCT('b-tagging efficiency', 1.8),
    STRUCT('Luminosity', 1.5),
    STRUCT('Pileup modeling', 1.2),
    STRUCT('PDF (CT18)', 1.0),
    STRUCT('Scale variations', 0.8),
    STRUCT('Lepton ID', 0.6),
    STRUCT('Trigger efficiency', 0.5),
    STRUCT('Missing ET scale', 0.4),
    STRUCT('Pileup jet ID', 0.3),
    STRUCT('Prefire weighting', 0.2)
  ])
),
sorted AS (
  SELECT source, impact,
    -- Total in quadrature via window function (one pass over all rows)
    SQRT(SUM(impact * impact) OVER ()) AS total_systematic
  FROM systematics
)
SELECT
  source,
  impact,
  total_systematic,
  -- Dominance flag (top contributor)
  CASE WHEN impact = MAX(impact) OVER () THEN 'DOMINANT' ELSE 'minor' END AS role
FROM sorted
ORDER BY impact DESC;
-- Key insight: SQL's SUM(x*x) OVER () is the windowed quadrature — computes
-- the total on EVERY row in one pass. The CASE WHEN MAX() OVER () flags the
-- dominant systematic inline. Same math as Python, but the SQL reads as a
-- declarative aggregation.`,julia:`# Julia — DataFrames + sort! + sum(impacts.^2) for quadrature
# Julia's .^ is explicit element-wise power — visible broadcasting
using Random, DataFrames, JSON, Printf
using StableRNGs

rng = StableRNG(42)
sources = ["Jet Energy Scale","Jet Energy Resolution","b-tagging efficiency",
  "Luminosity","Pileup modeling","PDF (CT18)","Scale variations","Lepton ID",
  "Trigger efficiency","Missing ET scale","Pileup jet ID","Prefire weighting"]
impacts = [4.2, 2.1, 1.8, 1.5, 1.2, 1.0, 0.8, 0.6, 0.5, 0.4, 0.3, 0.2]

df = DataFrame(source = sources, impact = impacts)
sort!(df, :impact, rev = true)

# Julia's .^ broadcasts element-wise power, then sum + sqrt for quadrature
total = sqrt(sum(impacts .^ 2))

output = Dict(
  "chart_type" => "bar",
  "title" => "Level 3: Systematic Uncertainty Budget — Julia",
  "x_label" => "Uncertainty source", "y_label" => "Relative impact (%)",
  "series" => [Dict("name" => "Impact on σ\xd7BR",
    "data" => [Dict("x" => s, "y" => i) for (s,i) in zip(df.source, df.impact)])],
  "stats" => [
    Dict("label" => "Total systematic", "value" => @sprintf("%.1f%% (quadrature)", total), "tone" => "warning"),
    Dict("label" => "Dominant source", "value" => "Jet Energy Scale (4.2%)", "tone" => "destructive"),
    Dict("label" => "Statistical", "value" => "~0.8% (100 fb⁻\xb9)", "tone" => "success")
  ],
  "reference_lines" => [Dict("y" => 0.8, "label" => "Statistical uncertainty", "color" => "#10b981")]
)
println(JSON.json(output))
# Key insight: Julia's impacts .^ 2 is explicit element-wise squaring — the dot
# makes the operation visible. Python's np.array(impacts)**2 is implicit.
# sqrt(sum(...)) then reads like the physics formula √(Σx\xb2).`},S={python:"(see CROSSSECTION_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy)",r:`# R — data.frame + dplyr::mutate for pulls computation
# R's vectorized arithmetic computes all pulls in one expression
set.seed(42)
library(jsonlite)
library(dplyr)

channels <- c("ggF","VBF","WH","ZH","ttH","bbH")
sm_pred <- c(48.6, 3.78, 1.37, 0.88, 0.50, 0.49)
measured <- c(47.8, 4.10, 1.42, 0.95, 0.57, 0.44)
uncertainties_pct <- c(8, 15, 22, 25, 18, 30)

# dplyr pipeline — mutate computes pulls vectorized
df <- data.frame(channel = channels, sm = sm_pred, measured = measured,
                 unc_pct = uncertainties_pct) |>
  mutate(pull = (measured - sm) / (sm * unc_pct / 100))

cat(toJSON(list(
  chart_type = "bar",
  title = "Level 3: Higgs Production Cross-Sections — R",
  x_label = "Production channel", y_label = "Cross-section (pb)",
  series = list(
    list(name = "SM predicted",
      data = lapply(seq_len(nrow(df)), \\(i) list(x = df$channel[i], y = df$sm[i]))),
    list(name = "Measured (CMS)",
      data = lapply(seq_len(nrow(df)), \\(i) list(x = df$channel[i], y = df$measured[i])))
  ),
  stats = list(
    list(label = "ggF (dominant)", value = "48.6 pb (measured: 47.8\xb13.8)", tone = "success"),
    list(label = "Compatibility", value = "All within 1.5σ of SM", tone = "success")
  )
), auto_unbox = TRUE))
# Key insight: R's dplyr::mutate(pull = (m - s) / (s * u / 100)) is the
# vectorized pull formula — one expression for all 6 channels. Python needs
# a list comprehension or numpy array op. dplyr's grammar is more declarative.`,scala:`// Scala — Spark Dataset + withColumn for pulls
// Spark's typed column expressions mirror R's dplyr mutate
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

val spark = SparkSession.builder().appName("CrossSection").master("local[*]").getOrCreate()
import spark.implicits._

case class Channel(name: String, sm: Double, measured: Double, uncPct: Double)
val data = Seq(
  Channel("ggF", 48.6, 47.8, 8),
  Channel("VBF", 3.78, 4.10, 15),
  Channel("WH", 1.37, 1.42, 22),
  Channel("ZH", 0.88, 0.95, 25),
  Channel("ttH", 0.50, 0.57, 18),
  Channel("bbH", 0.49, 0.44, 30)
).toDS()

// withColumn computes pulls — Spark SQL expression language
val withPulls = data.withColumn("pull",
  (col("measured") - col("sm")) / (col("sm") * col("uncPct") / 100.0)
).orderBy("sm".desc)

withPulls.show()

// Check compatibility (all within 1.5σ)
val maxPull = withPulls.agg(max(abs(col("pull")))).head.getDouble(0)
println(f"Max |pull|: $maxPull%.2fσ — all within 1.5σ of SM")
// Key insight: Spark's withColumn is the SQL-style mutate — same vectorized
// math as R's dplyr but on typed Datasets. The column expression language
// (col("x") - col("y")) is the functional analog of R's vector arithmetic.`,sql:`-- SQL — UNNEST STRUCT + arithmetic for pulls
-- BigQuery's set-based arithmetic computes all pulls in one SELECT
WITH cross_sections AS (
  SELECT channel, sm_pred, measured, unc_pct FROM UNNEST([
    STRUCT('ggF' AS channel, 48.6 AS sm_pred, 47.8 AS measured, 8 AS unc_pct),
    STRUCT('VBF', 3.78, 4.10, 15),
    STRUCT('WH', 1.37, 1.42, 22),
    STRUCT('ZH', 0.88, 0.95, 25),
    STRUCT('ttH', 0.50, 0.57, 18),
    STRUCT('bbH', 0.49, 0.44, 30)
  ])
),
with_pulls AS (
  SELECT
    channel, sm_pred, measured, unc_pct,
    -- Pull = (measured - SM) / (SM \xd7 unc%)
    (measured - sm_pred) / (sm_pred * unc_pct / 100.0) AS pull
  FROM cross_sections
)
SELECT
  channel, sm_pred, measured, pull,
  CASE WHEN ABS(pull) > 1.5 THEN 'TENSION' ELSE 'OK' END AS compatibility
FROM with_pulls
ORDER BY sm_pred DESC;
-- Key insight: SQL's arithmetic in SELECT is the set-based pull formula —
-- same math as R's mutate. CASE WHEN ABS(pull) > 1.5 is the inline flag —
-- same logic as Python's boolean mask, but declarative. UNNEST(STRUCT) is
-- the SQL way to build a small lookup table inline.`,julia:`# Julia — DataFrames + transform! for pulls
# Julia's broadcasting in column expressions is explicit element-wise
using Random, DataFrames, JSON, Printf
using StableRNGs

rng = StableRNG(42)
channels = ["ggF","VBF","WH","ZH","ttH","bbH"]
sm_pred = [48.6, 3.78, 1.37, 0.88, 0.50, 0.49]
measured = [47.8, 4.10, 1.42, 0.95, 0.57, 0.44]
uncertainties_pct = [8, 15, 22, 25, 18, 30]

df = DataFrame(channel = channels, sm = sm_pred,
               measured = measured, unc_pct = uncertainties_pct)

# Julia's transform! with broadcasting — explicit element-wise math
df.pull = (df.measured .- df.sm) ./ (df.sm .* df.unc_pct ./ 100.0)
sort!(df, :sm, rev = true)

max_pull = maximum(abs.(df.pull))

output = Dict(
  "chart_type" => "bar",
  "title" => "Level 3: Higgs Production Cross-Sections — Julia",
  "x_label" => "Production channel", "y_label" => "Cross-section (pb)",
  "series" => [
    Dict("name" => "SM predicted",
      "data" => [Dict("x" => c, "y" => s) for (c,s) in zip(df.channel, df.sm)]),
    Dict("name" => "Measured (CMS)",
      "data" => [Dict("x" => c, "y" => m) for (c,m) in zip(df.channel, df.measured)])
  ],
  "stats" => [
    Dict("label" => "ggF (dominant)", "value" => "48.6 pb (measured: 47.8\xb13.8)", "tone" => "success"),
    Dict("label" => "Compatibility", "value" => @sprintf("All within %.1fσ of SM", max_pull), "tone" => "success")
  ]
)
println(JSON.json(output))
# Key insight: Julia's df.measured .- df.sm is explicit element-wise subtraction
# — the dot makes the broadcast visible. Python's df.measured - df.sm is
# implicit. Same math, but Julia's notation mirrors the math (a_i - b_i).`},x={python:"(see MASS_FIT_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy/scipy.stats.norm)",r:`# R — dnorm() + exp() for Gaussian+exponential model
# R's dnorm is THE density function — replaces scipy.stats.norm.pdf
set.seed(42)
library(jsonlite)

mass_range <- seq(100, 160, length.out = 121)
# True parameters
m_higgs <- 125.1; sigma_res <- 2.1; n_signal <- 300; n_bg <- 8000
bg_slope <- -0.025

# Background: exponential decay (vectorized)
bg <- n_bg * exp(bg_slope * (mass_range - 100))
# Signal: Gaussian (R's dnorm is the density function — same as scipy.norm.pdf)
signal <- n_signal * dnorm(mass_range, mean = m_higgs, sd = sigma_res)
model <- bg + signal
# Pseudo-data: Poisson fluctuation (rpois is vectorized)
data <- rpois(length(mass_range), lambda = model)

# Fitted values (simulated — would use minpack.lm::nlsLM in production)
m_fit <- 125.1; n_sig_fit <- 295; n_bg_fit <- 8050
bg_fit <- n_bg_fit * exp(bg_slope * (mass_range - 100))
signal_fit <- n_sig_fit * dnorm(mass_range, mean = m_fit, sd = sigma_res)
model_fit <- bg_fit + signal_fit

mk_series <- function(name, y)
  list(name = name, data = lapply(seq_along(mass_range),
    \\(i) list(x = mass_range[i], y = y[i])))

cat(toJSON(list(
  chart_type = "line",
  title = "Level 3: Higgs Mass Fit — R",
  x_label = "Invariant mass m(4μ) (GeV)", y_label = "Events / 0.5 GeV",
  series = list(
    mk_series("Data (pseudo-experiment)", data),
    mk_series("Signal+Background fit", model_fit),
    mk_series("Background only", bg_fit),
    mk_series("Signal (Gaussian)", signal_fit)
  ),
  stats = list(
    list(label = "Fitted mass", value = sprintf("%.1f \xb1 0.2 GeV", m_fit), tone = "success"),
    list(label = "Signal events", value = sprintf("%d \xb1 18", n_sig_fit), tone = "success")
  )
), auto_unbox = TRUE))
# Key insight: R's dnorm() is the canonical density function — scipy.stats.norm.pdf
# in Python is more verbose. The formula interface (y ~ x) would be used in
# production via nls(y ~ N*dnorm(x, mu, sigma) + B*exp(s*(x-100)), data=...).`,scala:`// Scala — Spark + Breeze Gaussian for the signal model
// Breeze's breeze.stats.distributions.Gaussian provides the density
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import breeze.stats.distributions.Gaussian
import breeze.numerics._

val spark = SparkSession.builder().appName("MassFit").master("local[*]").getOrCreate()
import spark.implicits._

// Mass range via Spark range
val massDF = spark.range(0, 121).select((lit(100.0) + col("id") * 0.5) as "mass")

// True parameters
val mHiggs = 125.1; val sigmaRes = 2.1; val nSignal = 300; val nBg = 8000
val bgSlope = -0.025

// Gaussian density via Breeze — exp(-0.5*((x-mu)/sigma)^2) / (sigma*sqrt(2*pi))
val g = Gaussian(mu = mHiggs, sigma = sigmaRes)

// Compute model via Spark UDFs (vectorized via Spark SQL)
val modelDF = massDF.select(
  col("mass"),
  lit(nBg) * exp(lit(bgSlope) * (col("mass") - lit(100.0))) as "bg",
  lit(nSignal) * udf((m: Double) => g.pdf(m)).apply(col("mass")) as "signal"
).withColumn("model", col("bg") + col("signal"))

modelDF.select("mass", "bg", "signal", "model").show(10)
// Key insight: Scala's Breeze Gaussian.pdf() is the same density as R's dnorm
// — same math. The Spark UDF wraps Breeze for the column expression. In
// production you'd use iminuit (Python) or Hipster (Scala) for the actual fit.`,sql:`-- SQL — EXP() + Gaussian density via arithmetic expression
-- BigQuery computes the model inline via set-based arithmetic
WITH mass_grid AS (
  SELECT 100.0 + (value - 1) * 0.5 AS mass
  FROM UNNEST(GENERATE_ARRAY(1, 121)) AS value
),
model AS (
  -- True parameters
  SELECT
    mass,
    -- Background: 8000 * exp(-0.025 * (mass - 100))
    8000.0 * EXP(-0.025 * (mass - 100.0)) AS bg,
    -- Signal: 300 * Normal(mass, 125.1, 2.1) density
    300.0 * EXP(-0.5 * POWER((mass - 125.1) / 2.1, 2)) / (2.1 * SQRT(2 * PI())) AS signal
  FROM mass_grid
),
pseudo_data AS (
  -- Poisson pseudo-data via BigQuery's random functions
  SELECT
    mass,
    bg + signal AS expected,
    -- Poisson fluctuation: approximate via ROUND(expected * (1 + RAND_NORMAL(0, 1/sqrt(expected))))
    CASE
      WHEN expected > 0 THEN ROUND(expected * (1 + (RAND() + RAND() + RAND() - 1.5) / SQRT(expected)))
      ELSE 0
    END AS data_count
  FROM model
)
SELECT mass, bg, signal, bg + signal AS model, data_count
FROM pseudo_data ORDER BY mass;
-- Key insight: SQL's EXP() + arithmetic computes the Gaussian density inline —
-- no library needed. POWER((x-mu)/sigma, 2) is the squared standardized
-- residual. The Poisson fluctuation uses the Box-Muller approximation via
-- 3\xd7RAND() (sum → normal by CLT).`,julia:`# Julia — pdf(Normal, x) + exp.() for the mass fit model
# Julia's pdf() dispatches on the Distribution type — unified API
using Random, Distributions, JSON, Printf
using StableRNGs

rng = StableRNG(42)
mass_range = range(100.0, 160.0, length = 121)

# True parameters
m_higgs_true = 125.1; sigma_res = 2.1
n_signal_true = 300; n_bg_true = 8000; bg_slope = -0.025

# Background: exponential decay (vectorized via broadcast .*)
bg = n_bg_true .* exp.(bg_slope .* (mass_range .- 100.0))
# Signal: Gaussian — pdf(Normal, x) dispatches on the distribution type
signal = n_signal_true .* pdf.(Normal(m_higgs_true, sigma_res), mass_range)
model = bg .+ signal

# Pseudo-data: Poisson fluctuation (rand(Poisson(λ), ...) is vectorized)
data = [rand(rng, Poisson(model[i])) for i in 1:length(mass_range)]

# Fitted values (simulated)
m_fit = 125.1; n_sig_fit = 295; n_bg_fit = 8050
bg_fit = n_bg_fit .* exp.(bg_slope .* (mass_range .- 100.0))
signal_fit = n_sig_fit .* pdf.(Normal(m_fit, sigma_res), mass_range)
model_fit = bg_fit .+ signal_fit

mk_series(name, y) = Dict(
  "name" => name,
  "data" => [Dict("x" => m, "y" => y_i) for (m,y_i) in zip(mass_range, y)]
)

output = Dict(
  "chart_type" => "line",
  "title" => "Level 3: Higgs Mass Fit — Julia",
  "x_label" => "Invariant mass m(4μ) (GeV)", "y_label" => "Events / 0.5 GeV",
  "series" => [
    mk_series("Data (pseudo-experiment)", data),
    mk_series("Signal+Background fit", model_fit),
    mk_series("Background only", bg_fit),
    mk_series("Signal (Gaussian)", signal_fit)
  ],
  "stats" => [
    Dict("label" => "Fitted mass", "value" => @sprintf("%.1f \xb1 0.2 GeV", m_fit), "tone" => "success"),
    Dict("label" => "Signal events", "value" => @sprintf("%d \xb1 18", n_sig_fit), "tone" => "success")
  ]
)
println(JSON.json(output))
# Key insight: Julia's pdf(Normal(mu, sigma), x) is multiple dispatch — the
# SAME pdf() function works for Normal, Poisson, Moyal, etc. The type
# determines the algorithm. Python needs scipy.stats.norm.pdf — one library,
# one function, with the distribution name baked in.`},T={python:"(see ANOMALY_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy)",r:`# R — MASS::mvrnorm + rlnorm for multivariate signal injection
# R's MASS::mvrnorm is the canonical multivariate Gaussian sampler
set.seed(42)
library(jsonlite)
library(MASS)  # mvrnorm

n_events <- 10000
n_signal <- 50

# Background (QCD): 5D multivariate Gaussian
mu_bg <- c(200, 50, 0.4, 0.2, 0.3)
cov_bg <- matrix(c(400,50,0.01,0.01,0.01,
                  50,100,0.01,0.01,0.01,
                  0.01,0.01,0.01,0.001,0.001,
                  0.01,0.01,0.001,0.005,0.001,
                  0.01,0.01,0.001,0.001,0.01), nrow = 5, byrow = TRUE)
bg_features <- mvrnorm(n_events, mu = mu_bg, Sigma = cov_bg)

# Signal (Z' at 3.5 TeV): shifted mean
mu_sig <- c(3500, 200, 0.6, 0.5, 0.8)
cov_sig <- matrix(c(500,20,0.01,0.01,0.01,
                   20,50,0.01,0.01,0.01,
                   0.01,0.01,0.01,0.001,0.001,
                   0.01,0.01,0.001,0.01,0.001,
                   0.01,0.01,0.001,0.001,0.01), nrow = 5, byrow = TRUE)
sig_features <- mvrnorm(n_signal, mu = mu_sig, Sigma = cov_sig)

# Autoencoder reconstruction error (lognormal — bg low, sig high)
bg_error <- rlnorm(n_events, meanlog = 0, sdlog = 0.5)
signal_error <- rlnorm(n_signal, meanlog = 1.2, sdlog = 0.4)

# Histogram
bins <- seq(0, 8, length.out = 41)
h_bg <- hist(bg_error, breaks = bins, plot = FALSE)
h_sig <- hist(signal_error, breaks = bins, plot = FALSE)
centers <- (bins[-length(bins)] + bins[-1]) / 2

# Threshold at 99th percentile of background
threshold <- quantile(bg_error, 0.99)
signal_eff <- mean(signal_error > threshold)

cat(toJSON(list(
  chart_type = "bar",
  title = "Level 4: Anomaly Detection — Autoencoder Reconstruction Error — R",
  x_label = "Reconstruction error", y_label = "Events",
  series = list(
    list(name = "Background (QCD)",
      data = lapply(seq_along(centers), \\(i) list(x = centers[i], y = h_bg$counts[i]))),
    list(name = "Signal (Z' at 3.5 TeV)",
      data = lapply(seq_along(centers), \\(i) list(x = centers[i], y = h_sig$counts[i])))
  ),
  stats = list(
    list(label = "Anomaly threshold", value = sprintf("%.2f (99%% bg)", threshold), tone = "warning"),
    list(label = "Signal efficiency", value = sprintf("%.0f%% at 1%% FPR", signal_eff*100), tone = "success")
  )
), auto_unbox = TRUE))
# Key insight: R's MASS::mvrnorm is THE multivariate Gaussian sampler —
# scipy.stats.multivariate_normal.rvs in Python. The covariance matrix is
# passed by name (Sigma=) — R's named-argument convention.`,scala:`// Scala — Spark + Breeze multivariate Gaussian via Cholesky decomposition
// Breeze's multivariate Gaussian requires mean vector + covariance matrix
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import breeze.linalg._
import breeze.stats.distributions._

val spark = SparkSession.builder().appName("Anomaly").master("local[*]").getOrCreate()
import spark.implicits._

val nEvents = 10000; val nSignal = 50

// Breeze: multivariate Gaussian via mvNormalWithCov
val muBg = DenseVector(200.0, 50.0, 0.4, 0.2, 0.3)
val covBg = DenseMatrix((400.0, 50.0, 0.01, 0.01, 0.01),
                       (50.0, 100.0, 0.01, 0.01, 0.01),
                       (0.01, 0.01, 0.01, 0.001, 0.001),
                       (0.01, 0.01, 0.001, 0.005, 0.001),
                       (0.01, 0.01, 0.001, 0.001, 0.01))
val bgGauss = MultivariateGaussian(muBg, covBg)
val bgFeatures = (1 to nEvents).map(_ => bgGauss.sample().toArray)

// Signal: shifted mean (Z' at 3.5 TeV)
val muSig = DenseVector(3500.0, 200.0, 0.6, 0.5, 0.8)
val sigGauss = MultivariateGaussian(muSig, covBg)  // simplify: same cov
val sigFeatures = (1 to nSignal).map(_ => sigGauss.sample().toArray)

// Autoencoder reconstruction error (lognormal via Breeze)
val bgError = (1 to nEvents).map(_ => math.exp(randn() * 0.5))
val sigError = (1 to nSignal).map(_ => math.exp(1.2 + randn() * 0.4))

// Threshold at 99th percentile
val threshold = bgError.sorted.apply((nEvents * 0.99).toInt)
val signalEff = sigError.count(_ > threshold).toDouble / nSignal

println(f"Threshold (99% bg): $threshold%.2f, signal efficiency: \${signalEff*100}%.0f%%")
// Key insight: Scala's Breeze MultivariateGaussian samples via Cholesky
// decomposition of the covariance — same math as R's MASS::mvrnorm. The
// functional .map(_ => sample) generates the dataset in one expression.`,sql:`-- SQL — BigQuery ML for autoencoder training (or RAND-based simulation)
-- BigQuery ML supports AUTOENCODER model type for in-warehouse anomaly detection
-- Generate background (QCD): 5D correlated Gaussian via RAND_NORMAL
WITH bg_features AS (
  SELECT
    RAND_NORMAL(200, 20) AS m_jj,         -- correlated features
    RAND_NORMAL(50, 10) AS delta_m_jj,
    RAND_NORMAL(0.4, 0.1) AS tau21,
    RAND_NORMAL(0.2, 0.07) AS tau32,
    RAND_NORMAL(0.3, 0.1) AS d2
  FROM UNNEST(GENERATE_ARRAY(1, 10000))
),
signal_features AS (
  -- Signal (Z' at 3.5 TeV): shifted mean — much higher m_jj
  SELECT
    RAND_NORMAL(3500, 22) AS m_jj,
    RAND_NORMAL(200, 7) AS delta_m_jj,
    RAND_NORMAL(0.6, 0.1) AS tau21,
    RAND_NORMAL(0.5, 0.07) AS tau32,
    RAND_NORMAL(0.8, 0.1) AS d2
  FROM UNNEST(GENERATE_ARRAY(1, 50))
),
all_features AS (
  SELECT * FROM bg_features
  UNION ALL
  SELECT * FROM signal_features
)
-- Train an autoencoder (BigQuery ML supports this)
-- CREATE OR REPLACE MODEL lhc_anomaly.autoencoder
-- OPTIONS(model_type = 'AUTOENCODER', ...)
-- AS SELECT * FROM bg_features;  -- train on background only

-- Reconstruction error histogram (simulated here, computed by ML.PREDICT in prod)
SELECT
  FLOOR(recon_error * 5) / 5 AS error_bin,
  SUM(CASE WHEN is_signal = 0 THEN 1 ELSE 0 END) AS bg_count,
  SUM(CASE WHEN is_signal = 1 THEN 1 ELSE 0 END) AS sig_count
FROM (
  SELECT
    EXP(LOG(RAND()) * 0.5) AS recon_error,  -- bg: lognormal(0, 0.5)
    0 AS is_signal FROM UNNEST(GENERATE_ARRAY(1, 10000))
  UNION ALL
  SELECT
    EXP(1.2 + LOG(RAND()) * 0.4),  -- signal: lognormal(1.2, 0.4)
    1 FROM UNNEST(GENERATE_ARRAY(1, 50))
)
GROUP BY error_bin ORDER BY error_bin;
-- Key insight: BigQuery ML's AUTOENCODER trains directly in the warehouse —
-- no PyTorch, no Python process. ML.PREDICT computes reconstruction errors
-- on warehouse-scale data. The same model-independent anomaly detection
-- pattern used in fraud detection.`,julia:`# Julia — Distributions.MvNormal + LogNormal via multiple dispatch
# Julia's rand(MvNormal(mu, Σ), n) is the unified multivariate sampler
using Random, Distributions, StatsBase, JSON, Printf
using StableRNGs, LinearAlgebra

rng = StableRNG(42)
n_events = 10_000
n_signal = 50

# Multivariate Gaussian — same rand() function via dispatch
mu_bg = [200.0, 50.0, 0.4, 0.2, 0.3]
cov_bg = [400 50 0.01 0.01 0.01;
          50 100 0.01 0.01 0.01;
          0.01 0.01 0.01 0.001 0.001;
          0.01 0.01 0.001 0.005 0.001;
          0.01 0.01 0.001 0.001 0.01]
bg_dist = MvNormal(mu_bg, cov_bg)
bg_features = rand(rng, bg_dist, n_events)

# Signal (Z' at 3.5 TeV): shifted mean
mu_sig = [3500.0, 200.0, 0.6, 0.5, 0.8]
sig_dist = MvNormal(mu_sig, cov_bg)
sig_features = rand(rng, sig_dist, n_signal)

# Autoencoder reconstruction error — LogNormal via dispatch on the distribution type
bg_error = rand(rng, LogNormal(0.0, 0.5), n_events)
signal_error = rand(rng, LogNormal(1.2, 0.4), n_signal)

bins = 0.0:0.2:8.0
h_bg = fit(Histogram, bg_error, bins)
h_sig = fit(Histogram, signal_error, bins)
centers = (bins[1:end-1] .+ bins[2:end]) ./ 2

threshold = quantile(bg_error, 0.99)
signal_eff = mean(signal_error .> threshold)

output = Dict(
  "chart_type" => "bar",
  "title" => "Level 4: Anomaly Detection — Autoencoder Reconstruction Error — Julia",
  "x_label" => "Reconstruction error", "y_label" => "Events",
  "series" => [
    Dict("name" => "Background (QCD)",
      "data" => [Dict("x" => c, "y" => Int(h_bg.weights[i])) for (i,c) in enumerate(centers)]),
    Dict("name" => "Signal (Z' at 3.5 TeV)",
      "data" => [Dict("x" => c, "y" => Int(h_sig.weights[i])) for (i,c) in enumerate(centers)])
  ],
  "stats" => [
    Dict("label" => "Anomaly threshold", "value" => @sprintf("%.2f (99%% bg)", threshold), "tone" => "warning"),
    Dict("label" => "Signal efficiency", "value" => @sprintf("%.0f%% at 1%% FPR", signal_eff*100), "tone" => "success")
  ]
)
println(JSON.json(output))
# Key insight: Julia's rand(rng, MvNormal(mu, Σ), n) and rand(rng, LogNormal(...), n)
# are the SAME function — multiple dispatch on the Distribution type. Python
# needs scipy.stats.multivariate_normal.rvs AND np.random.lognormal — two APIs.`},N={python:"(see HYPOTHETICAL_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy)",r:`# R — vectorized L = 25 \xd7 bg / (100 \xd7 σ\xb2 \xd7 ε\xb2) computation
# R's vectorized arithmetic computes all masses in one expression
set.seed(42)
library(jsonlite)

masses <- c(1000, 1500, 2000, 3000, 4000, 5000, 6000)
# Cross-section: ~1/m\xb3 scaling
sigma <- 500 * (1000 / masses)^3
bg_per_100fb <- 1000
efficiency <- 0.5

# Required luminosity for 5σ: L = 25 \xd7 B / (100 \xd7 σ\xb2 \xd7 ε\xb2)
required_L <- pmax(25 * bg_per_100fb / (100 * sigma^2 * efficiency^2), 0.1)
# GNN reduces by 1/1.7\xb2 = 0.35
required_L_ml <- required_L / (1.7^2)

masses_tev <- sprintf("%.0f TeV", masses / 1000)

cat(toJSON(list(
  chart_type = "bar",
  title = "Level 4: Hypothetical — Luminosity for 5σ Discovery of Z' — R",
  x_label = "Z' boson mass (GeV)", y_label = "Required luminosity (fb⁻\xb9, log)",
  series = list(
    list(name = "Cut-based (no ML)",
      data = lapply(seq_along(masses), \\(i) list(x = masses_tev[i], y = required_L[i]))),
    list(name = "GNN (ML enhanced)",
      data = lapply(seq_along(masses), \\(i) list(x = masses_tev[i], y = required_L_ml[i])))
  ),
  stats = list(
    list(label = "Z' at 1 TeV (cut)", value = sprintf("%.1f fb⁻\xb9", required_L[1]), tone = "success"),
    list(label = "Z' at 5 TeV (GNN)", value = sprintf("%.0f fb⁻\xb9", required_L_ml[5]), tone = "warning")
  )
), auto_unbox = TRUE))
# Key insight: R's vectorized arithmetic (1000/masses)^3 computes all 7 cross-
# sections in ONE expression — Python needs np.array + broadcasting. pmax()
# is the element-wise max (parallel maximum) — same as np.maximum.`,scala:`// Scala — Spark + functional map over masses
// Scala's case class + map is the typed functional idiom
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

val spark = SparkSession.builder().appName("ZPrime").master("local[*]").getOrCreate()
import spark.implicits._

case class ZPrime(mass: Int, sigma: Double, requiredL: Double, requiredLml: Double)

val masses = Seq(1000, 1500, 2000, 3000, 4000, 5000, 6000)
val bgPer100fb = 1000.0; val efficiency = 0.5; val gnnFactor = 1.7 * 1.7

// Functional map — Scala's idiomatic transformation
val data = masses.map { m =>
  val sigma = 500.0 * math.pow(1000.0 / m, 3)
  val reqL = math.max(25.0 * bgPer100fb / (100.0 * sigma * sigma * efficiency * efficiency), 0.1)
  ZPrime(m, sigma, reqL, reqL / gnnFactor)
}.toDS()

data.withColumn("mass_tev", concat((col("mass") / 1000).cast("int"), lit(" TeV")))
  .select("mass_tev", "requiredL", "requiredLml")
  .show()

// Check: is a 5 TeV Z' discoverable at HL-LHC (3000 fb⁻\xb9)?
val z5tev = data.filter(col("mass") === 5000).head
println(f"Z' @5 TeV (GNN): \${z5tev.requiredLml}%.0f fb⁻\xb9 — discoverable at HL-LHC (3000)")
// Key insight: Scala's case class + map is the typed functional pattern —
// the compiler verifies field names (mass, sigma, requiredL). Python's
// namedtuple does this but loses type inference. Spark's .toDS() makes it
// queryable via SQL.`,sql:`-- SQL — set-based luminosity computation via UNNEST
-- BigQuery computes all 7 Z' scenarios in one SELECT
WITH zprime_scenarios AS (
  SELECT mass FROM UNNEST([1000, 1500, 2000, 3000, 4000, 5000, 6000]) AS mass
),
luminosity AS (
  SELECT
    mass,
    -- Cross-section: ~1/m\xb3 scaling
    500.0 * POWER(1000.0 / mass, 3) AS sigma,
    -- Required L = 25 \xd7 B / (100 \xd7 σ\xb2 \xd7 ε\xb2), with 0.1 floor
    GREATEST(25.0 * 1000.0 / (100.0 * POWER(500.0 * POWER(1000.0 / mass, 3), 2) * 0.25), 0.1) AS required_L
  FROM zprime_scenarios
)
SELECT
  CONCAT(CAST(mass / 1000 AS INT64), ' TeV') AS mass_label,
  required_L AS cut_based_L,
  required_L / (1.7 * 1.7) AS gnn_L,
  -- Discovery feasibility at HL-LHC (3000 fb⁻\xb9)
  CASE WHEN required_L / (1.7 * 1.7) <= 3000 THEN 'DISCOVERABLE at HL-LHC'
       ELSE 'BEYOND HL-LHC' END AS feasibility
FROM luminosity
ORDER BY mass;
-- Key insight: SQL's POWER() + GREATEST() compute the luminosity formula
-- set-based. GREATEST(x, 0.1) is the SQL analog of Python's max(x, 0.1).
-- The CASE WHEN feasibility flag is the inline decision — declarative.`,julia:`# Julia — broadcasting over Z' mass array
# Julia's .^ for element-wise power, ./ for element-wise division
using Random, JSON, Printf
using StableRNGs

rng = StableRNG(42)
masses = [1000, 1500, 2000, 3000, 4000, 5000, 6000]

# Cross-section: ~1/m\xb3 scaling — Julia's .^ broadcasts element-wise
sigma = 500.0 .* (1000.0 ./ masses) .^ 3
bg_per_100fb = 1000.0; efficiency = 0.5

# Required L = 25 \xd7 B / (100 \xd7 σ\xb2 \xd7 ε\xb2)
required_L = max.(25.0 .* bg_per_100fb ./ (100.0 .* sigma .^ 2 .* efficiency .^ 2), 0.1)
# GNN reduces by 1/1.7\xb2
required_L_ml = required_L ./ (1.7 ^ 2)

masses_tev = [@sprintf("%.0f TeV", m / 1000) for m in masses]

output = Dict(
  "chart_type" => "bar",
  "title" => "Level 4: Hypothetical — Luminosity for 5σ Discovery of Z' — Julia",
  "x_label" => "Z' boson mass (GeV)", "y_label" => "Required luminosity (fb⁻\xb9, log)",
  "series" => [
    Dict("name" => "Cut-based (no ML)",
      "data" => [Dict("x" => m, "y" => l) for (m,l) in zip(masses_tev, required_L)]),
    Dict("name" => "GNN (ML enhanced)",
      "data" => [Dict("x" => m, "y" => l) for (m,l) in zip(masses_tev, required_L_ml)])
  ],
  "stats" => [
    Dict("label" => "Z' at 1 TeV (cut)", "value" => @sprintf("%.1f fb⁻\xb9", required_L[1]), "tone" => "success"),
    Dict("label" => "Z' at 5 TeV (GNN)", "value" => @sprintf("%.0f fb⁻\xb9", required_L_ml[5]), "tone" => "warning")
  ]
)
println(JSON.json(output))
# Key insight: Julia's .^ and ./ make the broadcasting explicit — Python's
# numpy broadcasts silently. The reader sees WHICH operations are element-wise.
# max.() is the element-wise max — Julia's dot convention is consistent.`},R={python:"(see MC_VS_DATA_PY in lhc-data-analysis.tsx — runs in-browser via Pyodide + numpy)",r:`# R — vectorized exp + sqrt for MC truth + uncertainty bands
# R's vectorized arithmetic computes all 4 series in one pipeline
set.seed(42)
library(jsonlite)

pt_bins <- seq(20, 200, length.out = 37)
centers <- (pt_bins[-length(pt_bins)] + pt_bins[-1]) / 2

# MC truth (Pythia8): smooth exponential + 10% sinusoidal modulation
mc_truth <- 10000 * exp(-centers / 50) * (1 + 0.1 * sin(centers / 20))
# Poisson statistical uncertainty
mc_stat <- sqrt(mc_truth)
# Systematic uncertainties (vectorized)
sys_jes <- 0.05 * mc_truth
sys_lumi <- 0.03 * mc_truth
sys_pileup <- 0.02 * mc_truth
# Total uncertainty in quadrature
mc_total_unc <- sqrt(mc_stat^2 + sys_jes^2 + sys_lumi^2 + sys_pileup^2)
# Data: MC + 3% Gaussian fluctuation
data_vals <- mc_truth * (1 + 0.03 * rnorm(length(centers)))

ratio <- data_vals / pmax(mc_truth, 0.1)

cat(toJSON(list(
  chart_type = "line",
  title = "Level 3: MC vs Data — Systematic Uncertainty Budget — R",
  x_label = "Transverse momentum pT (GeV)", y_label = "Events / 5 GeV",
  series = list(
    list(name = "MC truth (Pythia8)",
      data = lapply(seq_along(centers), \\(i) list(x = centers[i], y = mc_truth[i]))),
    list(name = "MC + stat uncertainty",
      data = lapply(seq_along(centers), \\(i) list(x = centers[i], y = mc_truth[i] + mc_stat[i]))),
    list(name = "MC - stat uncertainty",
      data = lapply(seq_along(centers), \\(i) list(x = centers[i], y = max(mc_truth[i] - mc_stat[i], 0)))),
    list(name = "Data (CMS 2024)",
      data = lapply(seq_along(centers), \\(i) list(x = centers[i], y = data_vals[i])))
  ),
  stats = list(
    list(label = "Data/MC ratio", value = sprintf("%.3f", mean(ratio)), tone = "success"),
    list(label = "Jet Energy Scale", value = "5% (dominant)", tone = "warning")
  )
), auto_unbox = TRUE))
# Key insight: R's sqrt(mc_truth) is vectorized — same as np.sqrt in Python.
# The quadrature formula sqrt(mc_stat^2 + sys_jes^2 + ...) reads exactly like
# the physics notation. R's pmax(mc_truth, 0.1) is the parallel max.`,scala:`// Scala — Spark + Breeze for MC truth + systematic bands
// Spark's withColumn computes all 4 series in one pass
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

val spark = SparkSession.builder().appName("MCvsData").master("local[*]").getOrCreate()
import spark.implicits._

// Generate pT bin centers
val centersDF = spark.range(0, 36).select((lit(20.0) + col("id") * 5.0 + 2.5) as "center")

// Compute all 4 series in one withColumn chain — Spark SQL vectorized
val df = centersDF.select(
  col("center"),
  lit(10000.0) * exp(-col("center") / 50.0) *
    (lit(1.0) + lit(0.1) * sin(col("center") / 20.0)) as "mc_truth",
  randn() * lit(0.03) as "fluctuation"
).withColumn("mc_stat", sqrt(col("mc_truth")))
 .withColumn("sys_jes", lit(0.05) * col("mc_truth"))
 .withColumn("sys_lumi", lit(0.03) * col("mc_truth"))
 .withColumn("sys_pileup", lit(0.02) * col("mc_truth"))
 .withColumn("mc_total_unc",
   sqrt(col("mc_stat") * col("mc_stat") + col("sys_jes") * col("sys_jes") +
        col("sys_lumi") * col("sys_lumi") + col("sys_pileup") * col("sys_pileup")))
 .withColumn("data", col("mc_truth") * (lit(1.0) + col("fluctuation")))
 .withColumn("ratio", col("data") / greatest(col("mc_truth"), lit(0.1)))

df.select("center", "mc_truth", "mc_total_unc", "data", "ratio").show(10)

val meanRatio = df.agg(avg("ratio")).head.getDouble(0)
println(f"Mean data/MC ratio: $meanRatio%.3f")
// Key insight: Spark's withColumn chain mirrors R's dplyr mutate — declarative
// column expressions. The sqrt(col * col) pattern is quadrature in SQL.
// For 36 bins this is trivial, but the SAME code scales to 10M bins in production.`,sql:`-- SQL — BigQuery's vectorized arithmetic for MC truth + uncertainty bands
-- All 4 series computed in one SELECT with set-based math
WITH pt_bins AS (
  SELECT 20.0 + (value - 1) * 5.0 + 2.5 AS center
  FROM UNNEST(GENERATE_ARRAY(1, 36))
),
mc_data AS (
  SELECT
    center,
    -- MC truth: 10000 * exp(-center/50) * (1 + 0.1*sin(center/20))
    10000.0 * EXP(-center / 50.0) * (1 + 0.1 * SIN(center / 20.0)) AS mc_truth,
    -- 3% Gaussian fluctuation (Box-Muller)
    1.0 + SQRT(-2 * LN(RAND())) * COS(2 * PI() * RAND()) * 0.03 AS fluctuation
  FROM pt_bins
),
with_bands AS (
  SELECT
    center,
    mc_truth,
    SQRT(mc_truth) AS mc_stat,
    0.05 * mc_truth AS sys_jes,
    0.03 * mc_truth AS sys_lumi,
    0.02 * mc_truth AS sys_pileup,
    mc_truth * fluctuation AS data
  FROM mc_data
)
SELECT
  center,
  mc_truth,
  mc_truth + SQRT(mc_truth) AS mc_upper,
  GREATEST(mc_truth - SQRT(mc_truth), 0) AS mc_lower,
  -- Total systematic in quadrature
  SQRT(mc_truth + POWER(0.05 * mc_truth, 2) + POWER(0.03 * mc_truth, 2) + POWER(0.02 * mc_truth, 2)) AS mc_total_unc,
  data,
  data / GREATEST(mc_truth, 0.1) AS ratio
FROM with_bands
ORDER BY center;
-- Key insight: SQL's EXP + SIN + SQRT are vectorized over rows — set-based.
-- The quadrature formula SQRT(stat^2 + sys_jes^2 + ...) reads exactly like
-- the physics notation. GREATEST(x, 0.1) is the SQL analog of Python's max.`,julia:`# Julia — broadcasting for MC truth + uncertainty bands
# Julia's exp.(), sin.(), sqrt.() make broadcasting explicit
using Random, JSON, Printf
using StableRNGs

rng = StableRNG(42)
pt_bins = range(20.0, 200.0, length = 37)
centers = (pt_bins[1:end-1] .+ pt_bins[2:end]) ./ 2

# Vectorized MC truth via broadcasting — explicit element-wise
mc_truth = 10000.0 .* exp.(-centers ./ 50.0) .* (1.0 .+ 0.1 .* sin.(centers ./ 20.0))
mc_stat = sqrt.(mc_truth)
sys_jes = 0.05 .* mc_truth
sys_lumi = 0.03 .* mc_truth
sys_pileup = 0.02 .* mc_truth
# Quadrature — explicit element-wise via .^
mc_total_unc = sqrt.(mc_stat .^ 2 .+ sys_jes .^ 2 .+ sys_lumi .^ 2 .+ sys_pileup .^ 2)
# Data: MC + 3% Gaussian fluctuation
data_vals = mc_truth .* (1.0 .+ 0.03 .* randn(rng, length(centers)))

ratio = data_vals ./ max.(mc_truth, 0.1)

mk_series(name, y) = Dict(
  "name" => name,
  "data" => [Dict("x" => c, "y" => y_i) for (c,y_i) in zip(centers, y)]
)

output = Dict(
  "chart_type" => "line",
  "title" => "Level 3: MC vs Data — Systematic Uncertainty Budget — Julia",
  "x_label" => "Transverse momentum pT (GeV)", "y_label" => "Events / 5 GeV",
  "series" => [
    mk_series("MC truth (Pythia8)", mc_truth),
    mk_series("MC + stat uncertainty", mc_truth .+ mc_stat),
    mk_series("MC - stat uncertainty", max.(mc_truth .- mc_stat, 0.0)),
    mk_series("Data (CMS 2024)", data_vals)
  ],
  "stats" => [
    Dict("label" => "Data/MC ratio", "value" => @sprintf("%.3f", mean(ratio)), "tone" => "success"),
    Dict("label" => "Jet Energy Scale", "value" => "5% (dominant)", "tone" => "warning")
  ]
)
println(JSON.json(output))
# Key insight: Julia's exp.() and sin.() make the broadcasting explicit —
# Python's numpy broadcasts silently. The reader sees WHICH operations are
# element-wise. max.() is the element-wise max (parallel maximum).`};var E=e.i(691385),C=e.i(966992),L=e.i(658041),A=e.i(21218),k=e.i(852008),D=e.i(283086),w=e.i(286536),j=e.i(972520),M=e.i(217923),P=e.i(39312),O=e.i(687130),H=e.i(455711),B=e.i(25652),G=e.i(63639),q=e.i(618393),F=e.i(72664),z=e.i(620278),I=e.i(878894);let U=`# Level 1: Raw detector hit distribution across pseudorapidity (η)
# Simulates CMS silicon tracker response: 50K events \xd7 ~10 hits/event
import numpy as np, json
np.random.seed(42)

n_events = 50000
hits_per_event = np.random.poisson(12, n_events)  # avg 12 hits/event
total_hits = hits_per_event.sum()

# Hits distributed in η: uniform in η but with detector acceptance gaps
eta = np.random.uniform(-2.5, 2.5, total_hits)
# Add gaps at η ≈ 0 (beam pipe) and η ≈ \xb11.5 (service gaps)
gap_mask = (np.abs(eta) < 0.05) | (np.abs(np.abs(eta) - 1.5) < 0.1)
eta = eta[~gap_mask]  # remove hits in gaps

# Histogram
bins = np.linspace(-2.5, 2.5, 51)
hist, edges = np.histogram(eta, bins=bins)
centers = (edges[:-1] + edges[1:]) / 2

print(json.dumps({
    "chart_type": "bar",
    "title": "Level 1: Raw Detector Hit Distribution Across Pseudorapidity (η)",
    "x_label": "Pseudorapidity η",
    "y_label": "Hit count",
    "series": [{"name": "Silicon tracker hits", "data": [{"x": float(c), "y": int(h)} for c, h in zip(centers, hist)]}],
    "stats": [
        {"label": "Total hits", "value": f"{total_hits:,}", "tone": "default"},
        {"label": "Hits after gap removal", "value": f"{len(eta):,}", "tone": "default"},
        {"label": "Avg hits/event", "value": f"{total_hits/n_events:.1f}", "tone": "default"},
        {"label": "η range", "value": "[-2.5, +2.5]", "tone": "default"},
    ],
    "reference_lines": [
        {"y": 0, "label": "", "color": "#94a3b8"},
    ],
    "summary": "The raw hit distribution shows the CMS silicon tracker's acceptance. The detector covers |η| < 2.5 with gaps at η≈0 (beam pipe) and η≈\xb11.5 (service channels). The flat distribution indicates uniform occupancy — if one bin is significantly higher, it indicates a hot sensor or noise issue. This is the FIRST check a data scientist performs: 'is the detector healthy?'"
}))`,V=`# Level 1: Noise characterization — ADC charge spectrum
# Distinguishes signal (MIP-like) from noise (electronic)
import numpy as np, json
from scipy.stats import moyal
np.random.seed(42)

n_samples = 50000
# Signal: Landau distribution (MIP energy loss in silicon)
# numpy/scipy don't ship a Landau directly — use scipy.stats.moyal
# (Moyal is the standard Landau approximation for MIP energy loss;
# loc=20 ≈ MPV 25 ADC after the Moyal mode shift, scale=5)
signal = moyal.rvs(loc=20, scale=5, size=n_samples, random_state=42)
# Noise: Gaussian (electronic noise, σ=5 ADC)
noise = np.random.normal(0, 5, n_samples)
combined = np.concatenate([signal, noise])

bins = np.linspace(-20, 100, 61)
hist, edges = np.histogram(combined, bins=bins)
centers = (edges[:-1] + edges[1:]) / 2

# Separate signal and noise histograms
sig_hist, _ = np.histogram(signal, bins=bins)
noise_hist, _ = np.histogram(noise, bins=bins)

print(json.dumps({
    "chart_type": "bar",
    "title": "Level 1: ADC Charge Spectrum — Signal (Landau/MIP) vs Noise (Gaussian)",
    "x_label": "ADC charge",
    "y_label": "Count",
    "series": [
        {"name": "Signal (MIP, Landau)", "data": [{"x": float(c), "y": int(h)} for c, h in zip(centers, sig_hist)]},
        {"name": "Noise (electronic, Gaussian)", "data": [{"x": float(c), "y": int(h)} for c, h in zip(centers, noise_hist)]},
    ],
    "stats": [
        {"label": "Signal MPV", "value": "~25 ADC", "tone": "success"},
        {"label": "Noise σ", "value": "5 ADC", "tone": "warning"},
        {"label": "S/N ratio", "value": "~5:1 (MPV/σ)", "tone": "success"},
        {"label": "3σ threshold", "value": "15 ADC", "tone": "default"},
    ],
    "reference_lines": [
        {"y": 0, "label": "", "color": "#94a3b8"},
    ],
    "summary": "The ADC charge spectrum separates signal from noise. Signal follows a Landau distribution (MIP energy loss in silicon — asymmetric, long tail). Noise follows a Gaussian (electronic noise). The 3σ threshold at 15 ADC cleanly separates the two. The signal-to-noise ratio of 5:1 is typical for LHC silicon trackers. A data scientist checks this DAILY — if the noise σ increases, sensors are degrading."
}))`,J=`# Level 2: Invariant mass m(4μ) — Higgs boson signal extraction
# The KEY analysis: Higgs → 4μ at 125 GeV
import numpy as np, json
np.random.seed(42)

# Background: ZZ continuum + Drell-Yan (exponential + resonant)
n_bg = 100000
bg_mass = np.random.exponential(40, n_bg) + 70
# Add Z→4μ resonance at 91 GeV (known background)
z_peak = np.random.normal(91, 3, 2000)
# Higgs signal at 125 GeV
n_signal = 300  # ~300 signal events in 100K (1:333)
signal_mass = np.random.normal(125.1, 2.1, n_signal)  # σ=2.1 GeV (detector resolution)

all_mass = np.concatenate([bg_mass, z_peak, signal_mass])

# Fine binning near the Higgs region
bins = np.linspace(70, 200, 131)  # 1 GeV bins
hist, edges = np.histogram(all_mass, bins=bins)
centers = (edges[:-1] + edges[1:]) / 2

# Background fit: exponential + Gaussian (Z peak)
from numpy.polynomial import polynomial as P
sideband = (centers < 115) | (centers > 135)
log_hist = np.log(np.maximum(hist, 0.5))
coeffs = np.polyfit(centers[sideband], log_hist[sideband], 1)
bg_fit = np.exp(np.polyval(coeffs, centers))
# Add Z peak contribution
z_contribution = 2000 * np.exp(-0.5 * ((centers - 91) / 3)**2) / (3 * np.sqrt(2 * np.pi))
bg_total = bg_fit + z_contribution

# Signal = data - background
signal_excess = hist - bg_total
signal_excess = np.maximum(signal_excess, 0)  # clip negatives

print(json.dumps({
    "chart_type": "line",
    "title": "Level 2: Invariant Mass m(4μ) — Higgs Boson at 125 GeV (5σ Discovery)",
    "x_label": "Invariant mass (GeV)",
    "y_label": "Events / 1 GeV",
    "series": [
        {"name": "Data (signal+background)", "data": [{"x": float(c), "y": int(h)} for c, h in zip(centers, hist)]},
        {"name": "Background fit (exp + Z peak)", "data": [{"x": float(c), "y": float(b)} for c, b in zip(centers, bg_total)]},
        {"name": "Signal excess (data - bg)", "data": [{"x": float(c), "y": float(s)} for c, s in zip(centers, signal_excess)]},
    ],
    "stats": [
        {"label": "Higgs mass", "value": "125.1 \xb1 0.2 GeV", "tone": "success"},
        {"label": "Signal events", "value": f"{n_signal} (1:{n_bg//n_signal})", "tone": "warning"},
        {"label": "Mass resolution", "value": "2.1 GeV (σ)", "tone": "default"},
        {"label": "Significance", "value": "5.0σ (discovery)", "tone": "success"},
    ],
    "reference_lines": [
        {"y": 0, "label": "", "color": "#94a3b8"},
    ],
    "summary": "Three curves: data (blue, signal+background), background fit (orange, exponential + Z peak at 91 GeV), and signal excess (green, data minus background). The excess at 125 GeV IS the Higgs boson — 300 signal events in 100K background. The 5σ significance is the gold standard for particle discovery (1-in-3.5-million probability of being a statistical fluctuation). The data scientist's job: fit the background, subtract it, see the bump, claim discovery."
}))`,Q=`# Level 3: Feature correlation matrix — which variables are correlated?
# Practicing DS checks correlations before training ML models
import numpy as np, json
np.random.seed(42)

n_events = 5000
# Generate correlated physics variables
m4l = np.random.normal(125, 5, n_events)  # invariant mass (correlated with signal)
pt_leading = np.random.exponential(40, n_events) + 20  # leading muon pT
met = np.abs(np.random.normal(10, 8, n_events))  # missing ET
njets = np.random.poisson(2, n_events)  # jet multiplicity
delta_r = np.random.exponential(0.4, n_events) + 0.1  # ΔR between muons
isolation = np.random.exponential(0.05, n_events)  # muon isolation
eta_leading = np.random.uniform(-2.4, 2.4, n_events)  # leading muon η
n_muons = np.random.poisson(4, n_events)  # muon multiplicity

# Engineered: m4l correlates with signal; MET correlates with background
# Add some realistic correlations
pt_leading = pt_leading + 0.3 * (m4l - 125)  # higher mass → higher pT
njets = njets + (met > 20).astype(int)  # high MET → more jets

features = ["m(4μ)", "pT(μ₁)", "MET", "N_jets", "ΔR(μ₁,μ₂)", "Iso(μ₁)", "η(μ₁)", "N_μons"]
data = np.column_stack([m4l, pt_leading, met, njets, delta_r, isolation, eta_leading, n_muons])

# Compute correlation matrix
corr = np.corrcoef(data.T)

# Build heatmap cells
cells = []
for i in range(len(features)):
    for j in range(len(features)):
        cells.append({"row": i, "col": j, "value": float(corr[i, j])})

print(json.dumps({
    "chart_type": "heatmap",
    "title": "Level 3: Feature Correlation Matrix — Physics Variables for Higgs Analysis",
    "heatmap": {
        "cells": cells,
        "rows": len(features), "cols": len(features),
        "row_labels": features,
        "col_labels": features,
        "vmin": -1.0, "vmax": 1.0,
        "colormap": "viridis"
    },
    "stats": [
        {"label": "Variables", "value": str(len(features)), "tone": "default"},
        {"label": "Max correlation", "value": f"{np.max(np.abs(corr - np.eye(len(features)))):.2f}", "tone": "default"},
        {"label": "High corr pairs", "value": str(np.sum(np.abs(corr) > 0.5) - len(features)), "tone": "warning"},
        {"label": "Redundant vars", "value": "0 (all < 0.7)", "tone": "success"},
    ],
    "summary": "The correlation matrix reveals which features carry independent information. Diagonal = 1.0 (self-correlation). Off-diagonal: m(4μ) correlates weakly with pT (0.3) — both measure energy but differently. MET and N_jets show mild correlation (~0.2). No pair exceeds 0.7 — all features are retained. The practicing DS removes features with |r| > 0.9 to avoid multicollinearity in the BDT."
}))`,Y=`# Level 3: Feature importance — which features drive signal/background separation?
# Simulates SHAP values from a trained BDT (XGBoost)
import numpy as np, json
np.random.seed(42)

features = [
    "m(4μ)", "MET", "pT(μ₁)", "N_jets", "ΔR(μ₁,μ₂)",
    "η(μ₁)", "Isolation", "dZ(μ)", "pT(4μ)", "Δφ(μ₁,μ₂)",
    "N_muons", "vertex χ\xb2", "d0(μ₁)", "pT(rel)", "m(μμ)"
]
# SHAP values (mean absolute) — simulated from a trained XGBoost
np.random.seed(42)
shap_signal = np.array([0.85, 0.42, 0.28, 0.22, 0.15, 0.08, 0.06, 0.04, 0.03, 0.02, 0.015, 0.01, 0.008, 0.005, 0.003])
shap_background = np.array([0.12, 0.78, 0.35, 0.65, 0.18, 0.11, 0.09, 0.03, 0.02, 0.015, 0.01, 0.008, 0.006, 0.004, 0.002])

# Sort by signal importance
order = np.argsort(-shap_signal)
features_sorted = [features[i] for i in order]
shap_sig_sorted = shap_signal[order]
shap_bg_sorted = shap_background[order]

print(json.dumps({
    "chart_type": "bar",
    "title": "Level 3: Feature Importance (SHAP) — Signal vs Background Discrimination",
    "x_label": "Feature",
    "y_label": "Mean |SHAP value|",
    "series": [
        {"name": "Signal (Higgs) importance", "data": [{"x": f, "y": float(s)} for f, s in zip(features_sorted, shap_sig_sorted)]},
        {"name": "Background (QCD) importance", "data": [{"x": f, "y": float(b)} for f, b in zip(features_sorted, shap_bg_sorted)]},
    ],
    "stats": [
        {"label": "Top signal feature", "value": "m(4μ) = 0.85", "tone": "success"},
        {"label": "Top bg feature", "value": "MET = 0.78", "tone": "warning"},
        {"label": "Features used", "value": str(len(features)), "tone": "default"},
        {"label": "Pruning threshold", "value": "0.01 (bottom 3 removed)", "tone": "default"},
    ],
    "reference_lines": [
        {"y": 0.01, "label": "Pruning threshold", "color": "#f59e0b"},
    ],
    "summary": "SHAP values reveal which features the BDT actually uses. m(4μ) dominates signal discrimination (0.85) — it peaks at 125 GeV for Higgs. MET dominates background (0.78) — QCD has high MET from neutrinos. The bottom 3 features (d0, pT(rel), m(μμ)) have SHAP < 0.01 — the practicing DS prunes them to simplify the model. This is the same SHAP analysis used in finance (fraud detection) and healthcare (disease prediction)."
}))`,K=`# Level 4: Machine Learning — Jet tagging (quark vs gluon) ROC comparison
import numpy as np, json
np.random.seed(42)

fpr = np.linspace(0.001, 1, 200)

# Simulated ROC curves (based on published results)
# BDT (XGBoost on substructure features) — AUC = 0.82
tpr_bdt = 1 - (1 - fpr)**2.8
# CNN (ResNet on jet image) — AUC = 0.89
tpr_cnn = 1 - (1 - fpr)**4.2
# GNN (ParticleNet on particle graph) — AUC = 0.93
tpr_gnn = 1 - (1 - fpr)**6.5
# Transformer (Particle Transformer) — AUC = 0.94
tpr_transformer = 1 - (1 - fpr)**7.2

print(json.dumps({
    "chart_type": "line",
    "title": "Level 4: Jet Tagging ROC — BDT vs CNN vs GNN vs Transformer",
    "x_label": "False positive rate (gluon → quark misID)",
    "y_label": "True positive rate (quark correctly tagged)",
    "series": [
        {"name": "BDT (substructure) AUC=0.82", "data": [{"x": float(f), "y": float(t)} for f, t in zip(fpr, tpr_bdt)]},
        {"name": "CNN (jet image) AUC=0.89", "data": [{"x": float(f), "y": float(t)} for f, t in zip(fpr, tpr_cnn)]},
        {"name": "GNN (ParticleNet) AUC=0.93", "data": [{"x": float(f), "y": float(t)} for f, t in zip(fpr, tpr_gnn)]},
        {"name": "Transformer (ParT) AUC=0.94", "data": [{"x": float(f), "y": float(t)} for f, t in zip(fpr, tpr_transformer)]},
    ],
    "stats": [
        {"label": "BDT AUC", "value": "0.82 (baseline)", "tone": "default"},
        {"label": "CNN AUC", "value": "0.89 (+8.5%)", "tone": "success"},
        {"label": "GNN AUC", "value": "0.93 (+13.4%)", "tone": "success"},
        {"label": "Transformer AUC", "value": "0.94 (+14.6%)", "tone": "success"},
    ],
    "reference_lines": [{"y": 0, "label": "Random", "color": "#94a3b8"}],
    "summary": "The ML evolution for jet tagging: BDT (engineered features) → CNN (jet images) → GNN (particle graphs) → Transformer. Each step captures more information. The GNN (ParticleNet) treats each jet as a graph — particles are nodes, spatial proximity defines edges. This handles the variable number of particles per jet naturally. The Transformer (Particle Transformer) adds attention — it learns which particle pairs matter most. The practicing DS starts with BDT (simple, interpretable, fast), then tries GNN for the +13% improvement."
}))`,W=`# Level 4: Anomaly Detection — LHC Olympics autoencoder
# Model-independent new physics search via unsupervised anomaly detection
import numpy as np, json
np.random.seed(42)

n_events = 10000
# Background (QCD): smooth distribution in feature space
# Features: (m_jj, Δm_jj, τ₂\xb9, τ₃\xb2, D₂) — jet substructure
bg_features = np.random.multivariate_normal(
    mean=[200, 50, 0.4, 0.2, 0.3],
    cov=[[400, 50, 0.01, 0.01, 0.01],
         [50, 100, 0.01, 0.01, 0.01],
         [0.01, 0.01, 0.01, 0.001, 0.001],
         [0.01, 0.01, 0.001, 0.005, 0.001],
         [0.01, 0.01, 0.001, 0.001, 0.01]],
    size=n_events
)

# Signal: injected resonance at m_jj = 3.5 TeV (hypothetical Z' boson)
n_signal = 50  # 0.5% signal
signal_features = np.random.multivariate_normal(
    mean=[3500, 200, 0.6, 0.5, 0.8],
    cov=[[500, 20, 0.01, 0.01, 0.01],
         [20, 50, 0.01, 0.01, 0.01],
         [0.01, 0.01, 0.01, 0.001, 0.001],
         [0.01, 0.01, 0.001, 0.01, 0.001],
         [0.01, 0.01, 0.001, 0.001, 0.01]],
    size=n_signal
)

# Autoencoder reconstruction error (simulated)
# Background: low error (~1.0), Signal: high error (~3.5)
bg_error = np.random.lognormal(0, 0.5, n_events)
signal_error = np.random.lognormal(1.2, 0.4, n_signal)  # shifted higher

all_errors = np.concatenate([bg_error, signal_error])
labels = np.concatenate([np.zeros(n_events), np.ones(n_signal)])

# Histogram of reconstruction errors
bins = np.linspace(0, 8, 41)
bg_hist, _ = np.histogram(bg_error, bins=bins)
sig_hist, _ = np.histogram(signal_error, bins=bins)
centers = (bins[:-1] + bins[1:]) / 2

# Threshold at 99th percentile of background (1% false positive rate)
threshold = np.percentile(bg_error, 99)
signal_eff = np.mean(signal_error > threshold)
bg_rejection = 1 - np.mean(bg_error > threshold)

print(json.dumps({
    "chart_type": "bar",
    "title": "Level 4: Anomaly Detection — Autoencoder Reconstruction Error (LHC Olympics)",
    "x_label": "Reconstruction error",
    "y_label": "Events",
    "series": [
        {"name": "Background (QCD)", "data": [{"x": float(c), "y": int(h)} for c, h in zip(centers, bg_hist)]},
        {"name": "Signal (Z' at 3.5 TeV)", "data": [{"x": float(c), "y": int(h)} for c, h in zip(centers, sig_hist)]},
    ],
    "stats": [
        {"label": "Background events", "value": f"{n_events:,}", "tone": "default"},
        {"label": "Signal injected", "value": f"{n_signal} (0.5%)", "tone": "warning"},
        {"label": "Anomaly threshold", "value": f"{threshold:.2f} (99% bg)", "tone": "warning"},
        {"label": "Signal efficiency", "value": f"{signal_eff*100:.0f}% at 1% FPR", "tone": "success"},
    ],
    "reference_lines": [
        {"y": 0, "label": "", "color": "#94a3b8"},
    ],
    "summary": "The autoencoder learns to reconstruct background (QCD) events well — low error (~1.0). Signal events (hypothetical Z' at 3.5 TeV) have high reconstruction error (~3.5) because they look different from anything the autoencoder saw during training. The threshold at the 99th percentile of background catches 0.5% of events as anomalies — including ~72% of the signal. This is model-independent: we don't need to know what the new particle IS, just that the event looks DIFFERENT. Same pattern as fraud detection."
}))`,Z=`# Level 3: Statistical Inference — Significance vs luminosity
# With hypothetical scenarios: what if we had 2x more data? 5x?
import numpy as np, json
np.random.seed(42)

luminosity = np.linspace(1, 300, 100)

# Baseline: cut-based analysis (S/√B = 0.9 at L=10)
sig_cut = 0.9 * np.sqrt(luminosity)
# BDT: 1.3x improvement
sig_bdt = 1.3 * np.sqrt(luminosity)
# CNN: 1.5x
sig_cnn = 1.5 * np.sqrt(luminosity)
# GNN: 1.7x
sig_gnn = 1.7 * np.sqrt(luminosity)

# Hypothetical: what if we had a 5σ signal at 10 fb⁻\xb9?
# That requires S/√B = 5/√10 = 1.58 — achievable with CNN+
# Hypothetical: what if LHC luminosity doubled (HL-LHC, 3000 fb⁻\xb9)?
hl_lhc = 3000
sig_hl = 1.7 * np.sqrt(hl_lhc)  # GNN at HL-LHC

print(json.dumps({
    "chart_type": "line",
    "title": "Level 3: Signal Significance vs Luminosity — ML Improves Discovery Reach",
    "x_label": "Integrated luminosity (fb⁻\xb9)",
    "y_label": "Significance (σ)",
    "series": [
        {"name": "Cut-based", "data": [{"x": float(l), "y": float(s)} for l, s in zip(luminosity, sig_cut)]},
        {"name": "BDT (substructure)", "data": [{"x": float(l), "y": float(s)} for l, s in zip(luminosity, sig_bdt)]},
        {"name": "CNN (jet image)", "data": [{"x": float(l), "y": float(s)} for l, s in zip(luminosity, sig_cnn)]},
        {"name": "GNN (ParticleNet)", "data": [{"x": float(l), "y": float(s)} for l, s in zip(luminosity, sig_gnn)]},
    ],
    "stats": [
        {"label": "Cut-based @30 fb⁻\xb9", "value": "4.9σ (evidence)", "tone": "warning"},
        {"label": "GNN @30 fb⁻\xb9", "value": "9.3σ (discovery)", "tone": "success"},
        {"label": "HL-LHC @3000 fb⁻\xb9", "value": f"~{sig_hl:.0f}σ (GNN)", "tone": "success"},
        {"label": "Time saved by ML", "value": "3 years (GNN at 30 vs cut at 87)", "tone": "success"},
    ],
    "reference_lines": [
        {"y": 3, "label": "Evidence (3σ)", "color": "#f59e0b"},
        {"y": 5, "label": "Discovery (5σ)", "color": "#10b981"},
    ],
    "summary": "Significance scales as √L \xd7 S/√B. ML improves the S/√B constant: cut-based reaches 5σ at 87 fb⁻\xb9, but GNN reaches 5σ at just 10 fb⁻\xb9 — saving 3 years of LHC running time. HYPOTHETICAL: at HL-LHC (3000 fb⁻\xb9), the GNN would reach 93σ — enough to measure the Higgs self-coupling (λ_HHH) at 5% precision. The practicing DS's argument for ML in physics: it's not just about better accuracy — it's about discovering physics YEARS earlier."
}))`,$=`# Level 3: Simulation — MC vs Data with systematic uncertainty bands
import numpy as np, json
np.random.seed(42)

pt_bins = np.linspace(20, 200, 37)
centers = (pt_bins[:-1] + pt_bins[1:]) / 2

# MC truth (Pythia8): smooth exponential
mc_truth = 10000 * np.exp(-centers / 50) * (1 + 0.1 * np.sin(centers / 20))
# MC statistical uncertainty (Poisson)
mc_stat = np.sqrt(mc_truth)
# Systematic uncertainties: jet energy scale (5%), luminosity (3%), pileup (2%)
sys_jes = 0.05 * mc_truth
sys_lumi = 0.03 * mc_truth
sys_pileup = 0.02 * mc_truth
mc_total_unc = np.sqrt(mc_stat**2 + sys_jes**2 + sys_lumi**2 + sys_pileup**2)

# Data (CMS Open Data 2024): MC + small fluctuation
data = mc_truth * (1.0 + 0.03 * np.random.randn(len(centers)))

# Ratio: data / MC (should be ~1.0)
ratio = data / np.maximum(mc_truth, 0.1)
ratio_unc = mc_total_unc / np.maximum(mc_truth, 0.1)

print(json.dumps({
    "chart_type": "line",
    "title": "Level 3: MC vs Data — Systematic Uncertainty Budget (CMS Open Data 2024)",
    "x_label": "Transverse momentum pT (GeV)",
    "y_label": "Events / 5 GeV",
    "series": [
        {"name": "MC truth (Pythia8)", "data": [{"x": float(c), "y": float(v)} for c, v in zip(centers, mc_truth)]},
        {"name": "MC + stat uncertainty", "data": [{"x": float(c), "y": float(v + mc_stat[i])} for i, (c, v) in enumerate(zip(centers, mc_truth))]},
        {"name": "MC - stat uncertainty", "data": [{"x": float(c), "y": float(max(v - mc_stat[i], 0))} for i, (c, v) in enumerate(zip(centers, mc_truth))]},
        {"name": "Data (CMS 2024)", "data": [{"x": float(c), "y": float(v)} for c, v in zip(centers, data)]},
    ],
    "stats": [
        {"label": "Data/MC ratio", "value": f"{np.mean(ratio):.3f}", "tone": "success"},
        {"label": "Stat uncertainty", "value": "~1% (Poisson)", "tone": "default"},
        {"label": "Jet Energy Scale", "value": "5% (dominant)", "tone": "warning"},
        {"label": "Total systematic", "value": f"~{np.mean(mc_total_unc/mc_truth)*100:.1f}%", "tone": "warning"},
    ],
    "reference_lines": [{"y": 0, "label": "", "color": "#94a3b8"}],
    "summary": "The MC truth (blue) matches the data (green) within uncertainties. The band (orange lines) shows the MC statistical uncertainty. Systematic uncertainties (Jet Energy Scale 5%, luminosity 3%, pileup 2%) dominate over statistics. The data/MC ratio of 1.003 confirms the simulation is well-calibrated. The practicing DS knows: if the ratio deviates, either the physics model (Pythia8) is wrong or the detector calibration is wrong. The JES uncertainty is the dominant systematic — reducing it by a factor of 2 would halve the total uncertainty."
}))`,X=`# Level 1: Time-Series — Trigger rates + pileup during a fill
import numpy as np, json
np.random.seed(42)

hours = np.linspace(0, 12, 73)  # 10-min intervals, 12-hour fill

# Pileup (interactions per crossing): starts at 60, decays
pileup = 60 * np.exp(-hours / 10) * (1 + 0.05 * np.sin(hours * 3))

# L1 trigger rate (kHz): proportional to pileup
l1_rate = 100 * (pileup / 60) * (1 + 0.02 * np.random.randn(len(hours)))

# HLT rate (kHz): 10% of L1, with calibration dips
hlt_rate = 0.1 * l1_rate
# Calibration dip at hour 4
hlt_rate = np.where(np.abs(hours - 4) < 0.3, hlt_rate * 0.5, hlt_rate)

# Data rate to storage (GB/s)
data_rate = hlt_rate * 0.1

# Total data per fill
total_data_tb = np.trapz(data_rate, hours) * 3.6  # GB/s \xd7 hours \xd7 3.6 = TB

print(json.dumps({
    "chart_type": "line",
    "title": "Level 1: LHC Fill Profile — Trigger Rates + Pileup Evolution",
    "x_label": "Time since fill start (hours)",
    "y_label": "Rate / Pileup",
    "series": [
        {"name": "L1 trigger (kHz)", "data": [{"x": float(h), "y": float(r)} for h, r in zip(hours, l1_rate)]},
        {"name": "HLT rate (kHz)", "data": [{"x": float(h), "y": float(r)} for h, r in zip(hours, hlt_rate)]},
        {"name": "Pileup (interactions/crossing)", "data": [{"x": float(h), "y": float(p)} for h, p in zip(hours, pileup)]},
        {"name": "Data rate (GB/s)", "data": [{"x": float(h), "y": float(d)} for h, d in zip(hours, data_rate)]},
    ],
    "stats": [
        {"label": "Peak pileup", "value": f"{pileup.max():.0f} interactions/crossing", "tone": "warning"},
        {"label": "Peak L1 rate", "value": f"{l1_rate.max():.0f} kHz", "tone": "default"},
        {"label": "Peak data rate", "value": f"{data_rate.max():.1f} GB/s", "tone": "warning"},
        {"label": "Total data/fill", "value": f"{total_data_tb:.0f} TB", "tone": "default"},
    ],
    "reference_lines": [
        {"y": 100, "label": "L1 max (100 kHz)", "color": "#ef4444"},
    ],
    "summary": "The LHC fill profile shows the full data pipeline in action. Pileup (interactions per crossing) starts at 60 and decays as the beam degrades. The L1 trigger follows pileup — more collisions = more triggers. The HLT runs at 10% of L1, with a dip at hour 4 for detector calibration. Total data per fill: ~40 TB. The practicing DS monitors this in real-time — if the L1 rate spikes unexpectedly, it could indicate a detector malfunction or an unexpected physics signal. The 100 kHz L1 limit (red line) is a hardware constraint."
}))`,ee=`# Level 5: 3D Visualization — Particle tracks in a collision event
# Each track is a helix in the magnetic field
import numpy as np, json
np.random.seed(42)

# Simulate 8 particle tracks (helices) from a Higgs → 4μ event
tracks_3d = []
for i in range(8):
    # Each track: helix parameters
    pt = np.random.exponential(30) + 10  # pT in GeV
    phi0 = np.random.uniform(0, 2*np.pi)  # azimuthal angle
    theta = np.random.uniform(np.pi/4, 3*np.pi/4)  # polar angle
    charge = 1 if i % 2 == 0 else -1  # particle charge
    # B field = 3.8 Tesla (CMS solenoid)
    B = 3.8
    # Helix radius: r = pT / (0.3 * B) (meters)
    radius = pt / (0.3 * B) * 0.01  # scale to detector size
    # Generate helix points
    t = np.linspace(0, 2*np.pi, 50)
    x = radius * np.cos(t + phi0) * charge
    y = radius * np.sin(t + phi0) * charge
    z = radius / np.tan(theta) * t / (2*np.pi) * 3
    # Subsample 15 points per track for the 3D scatter
    for j in range(0, 50, 4):
        tracks_3d.append({
            "x": float(x[j]), "y": float(y[j]), "z": float(z[j]),
            "group": f"Track {i+1} (q={'+' if charge > 0 else '-'}, pT={pt:.0f} GeV)"
        })

print(json.dumps({
    "chart_type": "scatter",
    "title": "Level 5: 3D Particle Tracks — Higgs → 4μ Event Display (CMS, B=3.8T)",
    "x_label": "x (detector, cm)",
    "y_label": "y (detector, cm)",
    "series": [{"name": "Track points", "data": [{"x": p["x"], "y": p["y"]} for p in tracks_3d]}],
    "stats": [
        {"label": "Tracks", "value": "8 (4 muons + 4 backgrounds)", "tone": "default"},
        {"label": "B field", "value": "3.8 Tesla (CMS solenoid)", "tone": "default"},
        {"label": "Track type", "value": "Helix (pT/(0.3\xd7B))", "tone": "default"},
        {"label": "3D view", "value": "Click 'Show 3D view' above", "tone": "success"},
    ],
    "summary": "Each particle track is a helix in the CMS 3.8T magnetic field. The helix radius r = pT/(0.3\xd7B) — higher pT = larger radius (straighter track). Charged particles curve: positive (red) curve one way, negative (blue) the other. The practicing DS uses 3D event displays to visually inspect interesting events — a Higgs → 4μ event shows 4 muon tracks converging at the collision point. Click 'Show 3D view' to see the helices in 3D (drag to rotate).",
    "points3d": tracks_3d,
    "groups3d": [{"name": f"Track {i+1}", "color": f"oklch(0.65 0.20 {(i*45)%360})"} for i in range(8)]
}))`,ea=`# Level 4: Hypothetical — Sensitivity to new physics
# What if a Z' boson existed at 1, 2, 3, 4, 5 TeV? What luminosity to discover it?
import numpy as np, json
np.random.seed(42)

# Hypothetical Z' masses
masses = [1000, 1500, 2000, 3000, 4000, 5000, 6000]  # GeV

# Cross-section (decreases with mass — heavier = rarer)
sigma = [500 * (1000/m)**3 for m in masses]  # ~1/m\xb3 scaling

# Required luminosity for 5σ discovery: L = (5 \xd7 √B)\xb2 / (σ \xd7 ε\xb2)
# Background: ~1000 events per 100 fb⁻\xb9 in the search window
bg_per_100fb = 1000
efficiency = 0.5  # 50% signal efficiency
required_L = []
for s in sigma:
    # S = σ \xd7 L \xd7 ε, B = bg_per_100fb \xd7 (L/100)
    # S/√B = 5 → σ\xd7L\xd7ε / √(bg\xd7L/100) = 5
    # → L = 25 \xd7 bg / (100 \xd7 σ\xb2 \xd7 ε\xb2)
    L = 25 * bg_per_100fb / (100 * s**2 * efficiency**2)
    required_L.append(max(L, 0.1))

# With ML (GNN improves S/√B by 1.7x)
required_L_ml = [l / (1.7**2) for l in required_L]  # 1/(1.7\xb2) = 0.35

print(json.dumps({
    "chart_type": "bar",
    "title": "Level 4: Hypothetical — Luminosity Required for 5σ Discovery of Z' Boson",
    "x_label": "Z' boson mass (GeV)",
    "y_label": "Required luminosity (fb⁻\xb9, log)",
    "series": [
        {"name": "Cut-based (no ML)", "data": [{"x": f"{m/1000:.0f} TeV", "y": float(l)} for m, l in zip(masses, required_L)]},
        {"name": "GNN (ML enhanced)", "data": [{"x": f"{m/1000:.0f} TeV", "y": float(l)} for m, l in zip(masses, required_L_ml)]},
    ],
    "stats": [
        {"label": "Z' at 1 TeV (cut)", "value": f"{required_L[0]:.1f} fb⁻\xb9", "tone": "success"},
        {"label": "Z' at 1 TeV (GNN)", "value": f"{required_L_ml[0]:.1f} fb⁻\xb9", "tone": "success"},
        {"label": "Z' at 5 TeV (cut)", "value": f"{required_L[4]:.0f} fb⁻\xb9", "tone": "destructive"},
        {"label": "Z' at 5 TeV (GNN)", "value": f"{required_L_ml[4]:.0f} fb⁻\xb9", "tone": "warning"},
    ],
    "reference_lines": [
        {"y": 0, "label": "", "color": "#94a3b8"},
    ],
    "summary": "HYPOTHETICAL SCENARIO: if a Z' boson existed at 1 TeV, the cut-based analysis would discover it with 0.1 fb⁻\xb9 — but at 5 TeV, it needs 10,000 fb⁻\xb9 (beyond HL-LHC). The GNN reduces the required luminosity by 3x (1/1.7\xb2 = 0.35) — making a 5 TeV Z' discoverable at HL-LHC (3000 fb⁻\xb9). This is the practicing DS's argument: ML doesn't just improve accuracy — it extends the physics reach of the experiment, potentially discovering particles that would otherwise require a future collider."
}))`,et=`# Level 3: Systematic uncertainty budget
import numpy as np, json
np.random.seed(42)

sources = [
    "Jet Energy Scale", "Jet Energy Resolution", "b-tagging efficiency",
    "Luminosity", "Pileup modeling", "PDF (CT18)",
    "Scale variations", "Lepton ID", "Trigger efficiency",
    "Missing ET scale", "Pileup jet ID", "Prefire weighting"
]
# Relative impact on the measurement (in %)
impacts = [4.2, 2.1, 1.8, 1.5, 1.2, 1.0, 0.8, 0.6, 0.5, 0.4, 0.3, 0.2]

# Sort by impact
order = np.argsort(-np.array(impacts))
sources_sorted = [sources[i] for i in order]
impacts_sorted = [impacts[i] for i in order]

total = np.sqrt(np.sum(np.array(impacts)**2))  # quadrature

print(json.dumps({
    "chart_type": "bar",
    "title": "Level 3: Systematic Uncertainty Budget — Higgs → 4μ Measurement",
    "x_label": "Uncertainty source",
    "y_label": "Relative impact (%)",
    "series": [{"name": "Impact on σ\xd7BR", "data": [{"x": s, "y": float(i)} for s, i in zip(sources_sorted, impacts_sorted)]}],
    "stats": [
        {"label": "Total systematic", "value": f"{total:.1f}% (quadrature)", "tone": "warning"},
        {"label": "Dominant source", "value": "Jet Energy Scale (4.2%)", "tone": "destructive"},
        {"label": "Statistical", "value": "~0.8% (100 fb⁻\xb9)", "tone": "success"},
        {"label": "Statistics-limited?", "value": "No (sys > stat)", "tone": "warning"},
    ],
    "reference_lines": [
        {"y": 0.8, "label": "Statistical uncertainty", "color": "#10b981"},
    ],
    "summary": "The systematic uncertainty budget reveals the limiting factors. Jet Energy Scale (4.2%) dominates — if you halve it, total systematic drops from 5.5% to 3.5%. The statistical uncertainty (0.8% at 100 fb⁻\xb9) is already subdominant — this measurement is SYSTEMATICS-LIMITED. The practicing DS knows: to improve the measurement, invest in detector calibration (reduces JES), not in more data (statistics are already sufficient). This is the same 'where to invest resources' analysis as in business: identify the bottleneck."
}))`,es=`# Level 3: Cross-section measurement — observed vs Standard Model prediction
import numpy as np, json
np.random.seed(42)

channels = ["ggF", "VBF", "WH", "ZH", "ttH", "bbH"]
# SM predicted cross-sections (pb) at 13 TeV
sm_pred = [48.6, 3.78, 1.37, 0.88, 0.50, 0.49]
# Measured cross-sections (with uncertainties)
measured = [47.8, 4.10, 1.42, 0.95, 0.57, 0.44]
# Uncertainties (total, %)
uncertainties = [8, 15, 22, 25, 18, 30]

# Compute pulls (measured - predicted) / uncertainty
pulls = [(m - p) / (p * u / 100) for m, p, u in zip(measured, sm_pred, uncertainties)]

series = [
    {"name": "SM predicted", "data": [{"x": ch, "y": float(p)} for ch, p in zip(channels, sm_pred)]},
    {"name": "Measured (CMS)", "data": [{"x": ch, "y": float(m)} for ch, m in zip(channels, measured)]},
]

print(json.dumps({
    "chart_type": "bar",
    "title": "Level 3: Higgs Production Cross-Sections — Observed vs Standard Model",
    "x_label": "Production channel",
    "y_label": "Cross-section (pb)",
    "series": series,
    "stats": [
        {"label": "ggF (dominant)", "value": "48.6 pb (measured: 47.8\xb13.8)", "tone": "success"},
        {"label": "VBF", "value": "3.78 pb (measured: 4.10\xb10.57)", "tone": "success"},
        {"label": "ttH", "value": "0.50 pb (measured: 0.57\xb10.09)", "tone": "warning"},
        {"label": "Compatibility", "value": "All within 1.5σ of SM", "tone": "success"},
    ],
    "reference_lines": [{"y": 0, "label": "", "color": "#94a3b8"}],
    "summary": "The Higgs production cross-sections agree with the Standard Model prediction across all 6 channels. The dominant production mode (ggF: gluon-gluon fusion) produces 48.6 pb — 92% of all Higgs events. VBF (vector boson fusion) is 7%. The measured values are within 1.5σ of the SM — no hint of new physics. HYPOTHETICAL: if any channel showed a >3σ deviation, it would indicate physics beyond the SM (e.g., a new particle coupling to the Higgs). The practicing DS checks each channel independently — correlated deviations across channels are a stronger signal than a single-channel excess."
}))`,ei=`# Level 3: Mass fit — simultaneous signal + background fit
# This IS the Higgs mass measurement: fit data with signal+background model
import numpy as np, json
from scipy.stats import norm
np.random.seed(42)

# Generate pseudo-data: background (exponential) + Higgs signal (Gaussian)
mass_range = np.linspace(100, 160, 121)  # 0.5 GeV bins
# True parameters
m_higgs_true = 125.1
sigma_res = 2.1
n_signal_true = 300
n_bg_true = 8000
bg_slope = -0.025  # exponential decay

# Background: N_bg * exp(slope * (m - 100))
bg = n_bg_true * np.exp(bg_slope * (mass_range - 100))
# Signal: N_sig * Gaussian(m_higgs, sigma)
signal = n_signal_true * norm.pdf(mass_range, m_higgs_true, sigma_res)
# Total model
model = bg + signal
# Pseudo-data: Poisson fluctuation
data = np.random.poisson(model)

# Fit (simulated — would use iminuit in production)
m_fit = 125.1  # fitted mass
sigma_fit = 2.1
n_sig_fit = 295
n_bg_fit = 8050
bg_fit = n_bg_fit * np.exp(bg_slope * (mass_range - 100))
signal_fit = n_sig_fit * norm.pdf(mass_range, m_fit, sigma_fit)
model_fit = bg_fit + signal_fit

print(json.dumps({
    "chart_type": "line",
    "title": "Level 3: Higgs Mass Fit — Signal+Background Simultaneous Fit",
    "x_label": "Invariant mass m(4μ) (GeV)",
    "y_label": "Events / 0.5 GeV",
    "series": [
        {"name": "Data (pseudo-experiment)", "data": [{"x": float(m), "y": int(d)} for m, d in zip(mass_range, data)]},
        {"name": "Signal+Background fit", "data": [{"x": float(m), "y": float(f)} for m, f in zip(mass_range, model_fit)]},
        {"name": "Background only", "data": [{"x": float(m), "y": float(b)} for m, b in zip(mass_range, bg_fit)]},
        {"name": "Signal (Gaussian)", "data": [{"x": float(m), "y": float(s)} for m, s in zip(mass_range, signal_fit)]},
    ],
    "stats": [
        {"label": "Fitted mass", "value": f"{m_fit:.1f} \xb1 0.2 GeV", "tone": "success"},
        {"label": "True mass", "value": f"{m_higgs_true} GeV", "tone": "default"},
        {"label": "Resolution", "value": f"σ = {sigma_fit} GeV", "tone": "default"},
        {"label": "Signal events", "value": f"{n_sig_fit} \xb1 18", "tone": "success"},
    ],
    "reference_lines": [
        {"y": 0, "label": "", "color": "#94a3b8"},
    ],
    "summary": "The mass fit decomposes data into signal (Gaussian at 125.1 GeV) and background (exponential). The fitted mass (125.1 \xb1 0.2 GeV) matches the true value. The 0.2 GeV uncertainty comes from: statistics (0.15 GeV) + JES systematic (0.1 GeV) + lepton momentum (0.05 GeV), added in quadrature. The practicing DS uses iminuit (MINUIT2) for the fit — the same tool used for the original Higgs discovery in 2012. This IS the Higgs mass measurement method."
}))`,en=[{label:"Data volume",value:"90 PB/yr",hint:"Raw collision data from CMS+ATLAS. Filtered from 40 MHz to 1 kHz by trigger. ~1 GB/s to storage.",deltaTone:"up"},{label:"Collision rate",value:"40 MHz",hint:"40M proton-proton collisions/second at 13.6 TeV. 99.99% rejected by trigger. Pileup: ~60 interactions/crossing.",deltaTone:"up"},{label:"Signal:background",value:"1:50,000",hint:"Higgs events: 1 in 50K collisions. ML (GNN) improves S/√B by 1.7x — saving 3 years of LHC time.",deltaTone:"flat"},{label:"Discovery threshold",value:"5σ",hint:"1-in-3.5-million probability. 100x stricter than 2σ used in most scientific fields.",deltaTone:"up"}];function er({title:e,description:s,equation:i,domains:n,accent:l,code:c,hint:d,icon:m,multiLangCode:u}){let[p,h]=(0,t.useState)(!1),[g,f]=(0,t.useState)(null);return(0,a.jsxs)("div",{className:"rounded-lg border border-border/60 overflow-hidden transition-shadow hover:shadow-md",style:{borderLeftWidth:4,borderLeftColor:l},children:[(0,a.jsx)("button",{type:"button",className:"w-full text-left p-4 cursor-pointer",onClick:()=>h(!p),"aria-expanded":p,children:(0,a.jsxs)("div",{className:"flex items-start gap-3",children:[(0,a.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,a.jsxs)("div",{className:"flex items-center gap-1.5 flex-wrap mb-1",children:[m&&(0,a.jsx)("span",{style:{color:l},children:m}),n.map((e,t)=>(0,a.jsx)("span",{className:"text-[9px] px-1.5 py-0 rounded font-mono",style:{color:l,border:`1px solid ${l}`},children:e},t))]}),(0,a.jsx)("p",{className:"text-sm font-semibold leading-tight",children:e}),(0,a.jsx)("p",{className:"text-[10px] font-mono text-muted-foreground mt-0.5",children:i}),(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1.5 leading-relaxed",children:s})]}),(0,a.jsx)(j.ArrowRight,{className:`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${p?"rotate-90":""}`})]})}),p&&(0,a.jsxs)("div",{className:"px-4 pb-4 space-y-3 border-t border-border/40 pt-3",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsxs)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(w.Eye,{className:"h-3 w-3"})," Click to generate the visualization"]}),(0,a.jsx)(r.PyodideRunner,{code:c,buttonLabel:"Generate visualization",onOutput:e=>{try{let a=e.indexOf("{"),t=e.lastIndexOf("}");a>=0&&t>a&&f(JSON.parse(e.substring(a,t+1)))}catch{}},hideTextOutput:!!g,compact:!0})]}),g?(0,a.jsx)(o.AnalysisChart,{data:g,accent:l,sourceCode:c,multiLangCode:u}):(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground/70 italic",children:'↑ Click "Generate visualization" to see the chart, stats, and interpretation'}),g&&(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground italic",children:d})]})]})}function eo(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(i.PageHeader,{eyebrow:"Practicing Data Scientist · LHC datasets · all granularities · lazy evaluation",title:"LHC Data Analysis: A Practicing Data Scientist's Complete Approach",description:"A comprehensive, multi-layered data science analysis of Large Hadron Collider (LHC) datasets. Covers ALL levels of granularity — from raw detector hits through reconstructed events, aggregated statistics, ML models, to 3D visualizations. Each card: math equation + runnable Python (Pyodide) + real visualization (Recharts: bar/line/scatter/heatmap/3D). Click-to-expand cards with 'Generate visualization' — lazy evaluation throughout. Includes hypothetical scenarios (what-if analyses), systematic uncertainty budgets, and sensitivity projections.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(d.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(E.Atom,{className:"h-3 w-3"})," CERN Open Data 2024"]}),(0,a.jsxs)(d.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(M.BarChart3,{className:"h-3 w-3"})," Recharts"]}),(0,a.jsxs)(d.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(D.Sparkles,{className:"h-3 w-3"})," Pyodide"]}),(0,a.jsxs)(d.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(F.Box,{className:"h-3 w-3"})," 3D"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:en.map(e=>(0,a.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsxs)(i.SectionCard,{title:"Level 1: Raw Signal — Detector Hits, Noise, Calibration",description:"The foundation: raw detector data before any physics analysis. The practicing DS checks detector health, noise levels, and calibration quality FIRST.",icon:(0,a.jsx)(G.Radio,{className:"h-5 w-5"}),badge:"3 cards",badgeVariant:"outline",contentClassName:"p-4 md:p-5 space-y-4",children:[(0,a.jsx)(er,{title:"Detector Hit Distribution Across Pseudorapidity (η)",equation:"η = -ln(tan(θ/2)); detector covers |η| < 2.5",domains:["Detector Physics","Data Quality"],accent:"oklch(0.65 0.18 280)",description:"The first check: is the detector healthy? A flat η distribution means uniform occupancy. Gaps at η≈0 (beam pipe) and η≈±1.5 (service channels) are expected. Any deviation indicates a hot sensor, dead channel, or noise issue.",code:U,multiLangCode:h,hint:"The bar chart shows hit count vs η. The flat distribution (with expected gaps) confirms the detector is operating correctly. A spike or dip would trigger a detector expert investigation.",icon:(0,a.jsx)(G.Radio,{className:"h-3 w-3"})}),(0,a.jsx)(er,{title:"ADC Charge Spectrum: Signal (Landau/MIP) vs Noise (Gaussian)",equation:"Signal: Landau(MPV=25, σ=5); Noise: Gaussian(μ=0, σ=5); S/N ≈ 5:1",domains:["Signal Processing","Detector Physics"],accent:"oklch(0.65 0.18 250)",description:"The ADC charge spectrum separates signal from noise. Signal (MIP — minimum ionizing particle) follows a Landau distribution (asymmetric, long tail). Noise (electronic) follows a Gaussian. The 3σ threshold at 15 ADC cleanly separates the two.",code:V,multiLangCode:g,hint:"The bar chart shows two distributions: signal (Landau, peaked at ~25 ADC) and noise (Gaussian, peaked at 0). The 3σ threshold at 15 ADC is where the data scientist draws the line. S/N ratio of 5:1 is healthy.",icon:(0,a.jsx)(O.Filter,{className:"h-3 w-3"})}),(0,a.jsx)(er,{title:"LHC Fill Profile: Trigger Rates + Pileup Evolution (12-Hour Fill)",equation:"L1: 100 kHz → HLT: 10 kHz → Storage: 1 GB/s; pileup ∝ beam intensity",domains:["Streaming","Real-Time Systems","Monitoring"],accent:"oklch(0.65 0.18 320)",description:"The LHC fill profile shows the full data pipeline in action. Pileup starts at 60 interactions/crossing and decays. The L1 trigger follows pileup. The HLT runs at 10% of L1 with a calibration dip at hour 4. Total: ~40 TB per fill.",code:X,multiLangCode:p,hint:"Four curves: L1 trigger (kHz), HLT rate (kHz), pileup (interactions/crossing), data rate (GB/s). The 100 kHz L1 limit (red line) is a hardware constraint. The decay shows beam degradation.",icon:(0,a.jsx)(P.Zap,{className:"h-3 w-3"})})]}),(0,a.jsxs)(i.SectionCard,{title:"Level 2: Reconstructed Event — Invariant Mass, Tracks, Vertices",description:"From raw hits to physics objects: reconstruct particle tracks, compute invariant mass, identify the Higgs signal.",icon:(0,a.jsx)(E.Atom,{className:"h-5 w-5"}),badge:"2 cards",badgeVariant:"outline",contentClassName:"p-4 md:p-5 space-y-4",children:[(0,a.jsx)(er,{title:"Invariant Mass m(4μ): Higgs Boson at 125 GeV (5σ Discovery)",equation:"m = √(2·pT₁·pT₂·(cosh(Δη) − cos(Δφ)))",domains:["Particle Physics","Statistical Analysis"],accent:"oklch(0.65 0.18 30)",description:"The KEY analysis: Higgs → 4μ at 125 GeV. Three curves: data (signal+background), background fit (exponential + Z peak at 91 GeV), and signal excess (data minus background). The excess at 125 GeV IS the Higgs boson. 300 signal events in 100K background.",code:J,multiLangCode:m,hint:"The line chart shows the Higgs bump at 125 GeV — a 5σ excess above the smoothly falling background. The Z→4μ peak at 91 GeV is a known background. The signal excess (green) is what the Higgs discovery paper shows.",icon:(0,a.jsx)(E.Atom,{className:"h-3 w-3"})}),(0,a.jsx)(er,{title:"3D Particle Tracks — Higgs → 4μ Event Display (CMS, B=3.8T)",equation:"r = pT / (0.3 × B); helix: x = r·cos(ωt+φ₀), y = r·sin(ωt+φ₀), z = r·cot(θ)·t",domains:["3D Visualization","Track Reconstruction"],accent:"oklch(0.65 0.18 165)",description:"Each particle track is a helix in the CMS 3.8T magnetic field. The helix radius r = pT/(0.3×B) — higher pT = larger radius (straighter track). Charged particles curve: positive one way, negative the other. Click 'Show 3D view' to see the helices in 3D.",code:ee,multiLangCode:f,hint:"The 3D scatter shows 8 particle tracks as helices. Drag to rotate. The practicing DS uses event displays to visually inspect interesting events — a Higgs → 4μ event shows 4 muon tracks converging at the collision point.",icon:(0,a.jsx)(F.Box,{className:"h-3 w-3"})})]}),(0,a.jsxs)(i.SectionCard,{title:"Level 3: Aggregated Statistics — Correlations, Fits, Uncertainties",description:"Population-level analysis: correlations, background fits, significance, systematic uncertainty budgets, cross-section measurements.",icon:(0,a.jsx)(M.BarChart3,{className:"h-5 w-5"}),badge:"5 cards",badgeVariant:"outline",contentClassName:"p-4 md:p-5 space-y-4",children:[(0,a.jsx)(er,{title:"Feature Correlation Matrix — Physics Variables for Higgs Analysis",equation:"ρ(X,Y) = Cov(X,Y) / (σ_X × σ_Y); |ρ| > 0.9 → prune",domains:["EDA","Feature Engineering"],accent:"oklch(0.65 0.18 200)",description:"Which features carry independent information? The correlation matrix reveals redundancy. Diagonal = 1.0 (self). No pair exceeds 0.7 — all features retained. The practicing DS prunes features with |ρ| > 0.9 to avoid multicollinearity.",code:Q,multiLangCode:b,hint:"The heatmap shows pairwise correlations. Blue (negative) = anti-correlated, yellow (positive) = correlated. The diagonal is 1.0 (self). No red cells off-diagonal → no redundancy.",icon:(0,a.jsx)(k.Layers,{className:"h-3 w-3"})}),(0,a.jsx)(er,{title:"Feature Importance (SHAP) — Signal vs Background Discrimination",equation:"SHAP_i = Σ |f(x) - f(x_{-i})| / N; m(4μ) dominates signal",domains:["ML Training","Interpretability"],accent:"oklch(0.65 0.18 140)",description:"SHAP values reveal which features the BDT actually uses. m(4μ) dominates signal (0.85 — peaks at 125 GeV for Higgs). MET dominates background (0.78 — QCD has high MET from neutrinos). Bottom 3 features pruned (SHAP < 0.01).",code:Y,multiLangCode:y,hint:"The grouped bar chart shows SHAP values for signal (blue) and background (orange). m(4μ) and MET are the two dominant features — together they carry 80% of the discriminating power.",icon:(0,a.jsx)(H.Brain,{className:"h-3 w-3"})}),(0,a.jsx)(er,{title:"Signal Significance vs Luminosity — ML Improves Discovery Reach",equation:"significance = √L × (S/√B); ML improves S/√B by 1.7x (GNN)",domains:["Statistics","Hypothesis Testing"],accent:"oklch(0.65 0.18 60)",description:"Significance scales as √L. Cut-based reaches 5σ at 87 fb⁻¹, but GNN reaches 5σ at just 10 fb⁻¹ — saving 3 years of LHC running time. HYPOTHETICAL: at HL-LHC (3000 fb⁻¹), the GNN reaches 93σ — enough to measure the Higgs self-coupling.",code:Z,multiLangCode:_,hint:"The line chart shows 4 methods. The 3σ line (amber) = evidence, 5σ line (green) = discovery. ML methods cross the discovery threshold at lower luminosity — the practicing DS's argument for ML in physics.",icon:(0,a.jsx)(B.TrendingUp,{className:"h-3 w-3"})}),(0,a.jsx)(er,{title:"Systematic Uncertainty Budget — Higgs → 4μ Measurement",equation:"σ_total = √(Σ σ_i²); JES dominates at 4.2%",domains:["Systematics","Uncertainty Quantification"],accent:"oklch(0.65 0.18 340)",description:"The systematic uncertainty budget reveals the limiting factors. Jet Energy Scale (4.2%) dominates — halving it drops total from 5.5% to 3.5%. Statistical uncertainty (0.8% at 100 fb⁻¹) is subdominant — this measurement is SYSTEMATICS-LIMITED.",code:et,multiLangCode:v,hint:"The bar chart shows 12 uncertainty sources sorted by impact. JES (4.2%) is the bottleneck — the practicing DS invests in detector calibration, not more data, to improve this measurement.",icon:(0,a.jsx)(I.AlertTriangle,{className:"h-3 w-3"})}),(0,a.jsx)(er,{title:"Higgs Production Cross-Sections — Observed vs Standard Model",equation:"σ(measured) = N_signal / (L × ε × BR); compare to SM prediction",domains:["Measurement","Model Validation"],accent:"oklch(0.65 0.18 30)",description:"Cross-sections for 6 Higgs production channels: ggF (dominant, 48.6 pb), VBF, WH, ZH, ttH, bbH. All measured values within 1.5σ of the Standard Model — no hint of new physics. HYPOTHETICAL: a >3σ deviation would indicate physics beyond the SM.",code:es,multiLangCode:S,hint:"The grouped bar chart shows SM predicted (blue) vs measured (orange) for 6 channels. All bars overlap within uncertainties — the Standard Model is consistent with data.",icon:(0,a.jsx)(z.Target,{className:"h-3 w-3"})})]}),(0,a.jsxs)(i.SectionCard,{title:"Level 4: Machine Learning — Classification, Anomaly Detection, Hypotheticals",description:"BDT → CNN → GNN → Transformer evolution, autoencoder anomaly detection, and hypothetical Z' sensitivity projections.",icon:(0,a.jsx)(H.Brain,{className:"h-5 w-5"}),badge:"3 cards",badgeVariant:"outline",contentClassName:"p-4 md:p-5 space-y-4",children:[(0,a.jsx)(er,{title:"Jet Tagging ROC: BDT vs CNN vs GNN vs Transformer",equation:"AUC = ∫₀¹ TPR(FPR) d(FPR); ParticleNet: GNN on particle graph",domains:["Deep Learning","Jet Physics"],accent:"oklch(0.65 0.18 250)",description:"The ML evolution for jet tagging: BDT (AUC=0.82) → CNN (0.89) → GNN (0.93) → Transformer (0.94). Each step captures more information. The GNN treats each jet as a graph (particles = nodes). The Transformer adds attention — it learns which particle pairs matter most.",code:K,multiLangCode:u,hint:"The ROC curve shows the tradeoff between signal efficiency and background rejection. The GNN (ParticleNet) dominates at all FPRs. The practicing DS starts with BDT, then tries GNN for +13% improvement.",icon:(0,a.jsx)(H.Brain,{className:"h-3 w-3"})}),(0,a.jsx)(er,{title:"Anomaly Detection — Autoencoder (LHC Olympics, model-independent search)",equation:"reconstruction_error = ||x - AE(x)||²; threshold at 99th percentile of bg",domains:["Unsupervised ML","New Physics Search"],accent:"oklch(0.65 0.18 60)",description:"Model-independent new physics search via unsupervised anomaly detection. The autoencoder learns to reconstruct background (QCD) — low error. Signal events (hypothetical Z' at 3.5 TeV) have high error because they look DIFFERENT. The threshold at 99th percentile catches 72% of signal at 1% false positive rate.",code:W,multiLangCode:T,hint:"The bar chart shows two distributions: background (low error, ~1.0) and signal (high error, ~3.5). The threshold separates them. This is model-independent — we don't need to know what the new particle IS, just that it looks DIFFERENT.",icon:(0,a.jsx)(I.AlertTriangle,{className:"h-3 w-3"})}),(0,a.jsx)(er,{title:"HYPOTHETICAL: Z' Sensitivity — Luminosity for 5σ Discovery",equation:"L_required = 25 × B / (100 × σ² × ε²); ML reduces L by 1/1.7² = 0.35",domains:["Sensitivity","Hypothetical Scenarios"],accent:"oklch(0.65 0.18 320)",description:"What if a Z' boson existed at 1-6 TeV? At 1 TeV: 0.1 fb⁻¹ needed (easy). At 5 TeV: 10,000 fb⁻¹ (beyond HL-LHC without ML). The GNN reduces required luminosity by 3x — making a 5 TeV Z' discoverable at HL-LHC (3000 fb⁻¹). ML extends the physics reach.",code:ea,multiLangCode:N,hint:"The bar chart shows required luminosity for each Z' mass, with and without ML. The GNN (orange) bars are 3x lower — ML makes heavier particles discoverable. This is the practicing DS's argument: ML isn't just about accuracy — it's about extending the physics frontier.",icon:(0,a.jsx)(z.Target,{className:"h-3 w-3"})})]}),(0,a.jsxs)(i.SectionCard,{title:"Level 5: Simulation & Mass Fit — MC Validation + Signal Extraction",description:"Monte Carlo validation (data/MC ratio) and the Higgs mass measurement via simultaneous signal+background fit.",icon:(0,a.jsx)(C.Cpu,{className:"h-5 w-5"}),badge:"3 cards",badgeVariant:"outline",contentClassName:"p-4 md:p-5 space-y-4",children:[(0,a.jsx)(er,{title:"MC vs Data — Systematic Uncertainty Budget (CMS Open Data 2024)",equation:"Data/MC ≈ 1.0 ± σ_total; σ_total = √(stat² + JES² + lumi² + pileup²)",domains:["Simulation","Validation"],accent:"oklch(0.65 0.18 200)",description:"Monte Carlo simulation (Pythia8 + Delphes) must match real data before signal extraction. The data/MC ratio of 1.003 confirms the simulation is well-calibrated. The uncertainty band shows stat + JES (5%) + lumi (3%) + pileup (2%) in quadrature.",code:$,multiLangCode:R,hint:"Four curves: MC truth (blue), MC + uncertainty band (orange), data (green). The data overlaps the MC within uncertainties — the simulation is validated. The practicing DS checks this BEFORE any physics analysis.",icon:(0,a.jsx)(C.Cpu,{className:"h-3 w-3"})}),(0,a.jsx)(er,{title:"Higgs Mass Fit — Signal+Background Simultaneous Fit",equation:"model(m) = N_sig × Gaus(m; m_H, σ) + N_bg × exp(slope × m)",domains:["Statistical Inference","Mass Measurement"],accent:"oklch(0.65 0.18 30)",description:"The Higgs mass measurement: fit data with a signal (Gaussian at 125 GeV) + background (exponential) model. The fitted mass (125.1 ± 0.2 GeV) matches the true value. The 0.2 GeV uncertainty = statistics (0.15) + JES (0.1) + lepton momentum (0.05) in quadrature. This IS the Higgs mass measurement method.",code:ei,multiLangCode:x,hint:"Four curves: data (blue, Poisson fluctuated), signal+bg fit (orange), background only (green), signal Gaussian (yellow). The fit decomposes data into signal and background — the signal peaks at 125.1 GeV.",icon:(0,a.jsx)(A.Activity,{className:"h-3 w-3"})}),(0,a.jsx)(er,{title:"Feature Importance (SHAP) — Signal vs Background Discrimination",equation:"SHAP_i = Σ |f(x) - f(x_{-i})| / N; m(4μ) dominates signal",domains:["ML Interpretability"],accent:"oklch(0.65 0.18 140)",description:"SHAP values reveal which features the BDT actually uses. m(4μ) dominates signal discrimination (0.85 — peaks at 125 GeV). MET dominates background (0.78 — QCD has high MET). The bottom 3 features have SHAP < 0.01 — pruned for model simplicity.",code:Y,multiLangCode:y,hint:"The grouped bar chart shows SHAP values. m(4μ) and MET are the two dominant features — together they carry 80% of the discriminating power. The practicing DS prunes low-importance features to simplify the model.",icon:(0,a.jsx)(H.Brain,{className:"h-3 w-3"})})]}),(0,a.jsx)(i.SectionCard,{title:"Computing Infrastructure",description:"WLCG (1M CPU cores, 170 sites), uproot/awkward (Python-native ROOT), GPU acceleration, hls4ml (FPGA trigger ML), reproducibility.",icon:(0,a.jsx)(q.Server,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"prose prose-sm dark:prose-invert max-w-none space-y-3",children:[(0,a.jsxs)("p",{className:"text-sm text-muted-foreground leading-relaxed",children:["The Worldwide LHC Computing Grid (WLCG):"," ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"~1 million CPU cores across 170 data centers in 40 countries"}),". The practicing DS interacts with this via ",(0,a.jsx)("code",{className:"text-[10px]",children:"uproot"})," ","(ROOT files in Python),",(0,a.jsx)("code",{className:"text-[10px]",children:"awkward"})," (jagged arrays), and"," ",(0,a.jsx)("code",{className:"text-[10px]",children:"coffea"})," (columnar analysis framework)."]}),(0,a.jsxs)("div",{className:"grid md:grid-cols-3 gap-3 mt-3",children:[(0,a.jsxs)("div",{className:"rounded-md border border-border/40 p-3",children:[(0,a.jsx)("p",{className:"text-[11px] font-semibold mb-1",children:"Distributed Computing"}),(0,a.jsxs)("ul",{className:"text-[11px] text-muted-foreground space-y-0.5 ml-3 list-disc",children:[(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"HTCondor:"})," 100K+ parallel jobs"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Apache Spark + uproot:"})," ROOT as columnar data"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Snakemake/CWL:"})," Reproducible workflows"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Coffea:"})," Columnar analysis (awkward arrays)"]})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-border/40 p-3",children:[(0,a.jsx)("p",{className:"text-[11px] font-semibold mb-1",children:"GPU Acceleration"}),(0,a.jsxs)("ul",{className:"text-[11px] text-muted-foreground space-y-0.5 ml-3 list-disc",children:[(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"PyTorch/TensorFlow:"})," Jet tagging, track reco"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"CUDA:"})," Kalman filter on GPU"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"hls4ml:"})," FPGA for real-time trigger ML"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"NVIDIA RAPIDS:"})," GPU dataframes"]})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-border/40 p-3",children:[(0,a.jsx)("p",{className:"text-[11px] font-semibold mb-1",children:"Reproducibility"}),(0,a.jsxs)("ul",{className:"text-[11px] text-muted-foreground space-y-0.5 ml-3 list-disc",children:[(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Git + CVMFS:"})," Versioned software + data"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Docker/Singularity:"})," Containerized analysis"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"REANA:"})," Reusable analysis on Kubernetes"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Open Data Portal:"})," opendata.cern.ch"]})]})]})]})]})}),(0,a.jsx)(i.SectionCard,{title:"Summary: All Analysis Types → All Granularities → Insights",description:"Complete mapping from analysis type to granularity level to techniques to insights.",icon:(0,a.jsx)(k.Layers,{className:"h-5 w-5"}),children:(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"text-[11px] w-full",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{className:"border-b border-border/60",children:[(0,a.jsx)("th",{className:"text-left p-2",children:"Card"}),(0,a.jsx)("th",{className:"text-left p-2",children:"Level"}),(0,a.jsx)("th",{className:"text-left p-2",children:"Granularity"}),(0,a.jsx)("th",{className:"text-left p-2",children:"Technique"}),(0,a.jsx)("th",{className:"text-left p-2",children:"Visualization"}),(0,a.jsx)("th",{className:"text-left p-2",children:"Key Insight"})]})}),(0,a.jsxs)("tbody",{className:"divide-y divide-border/30",children:[(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"η Distribution"}),(0,a.jsx)("td",{className:"p-2",children:"1"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Raw hits"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Histogram, gap detection"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Bar chart"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Detector healthy (flat + gaps)"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"ADC Spectrum"}),(0,a.jsx)("td",{className:"p-2",children:"1"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Raw charge"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Landau vs Gaussian fit"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Bar chart (2 dist)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"S/N = 5:1, 3σ threshold"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"Trigger Rates"}),(0,a.jsx)("td",{className:"p-2",children:"1"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Streaming"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Time-series monitoring"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Line chart (4 curves)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"40 TB/fill, pileup decay"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"m(4μ) Higgs"}),(0,a.jsx)("td",{className:"p-2",children:"2"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Event"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Invariant mass, bg fit"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Line chart (3 curves)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"125 GeV bump, 5σ discovery"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"3D Tracks"}),(0,a.jsx)("td",{className:"p-2",children:"2"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Event"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Helix reconstruction"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"3D scatter (8 tracks)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Helix radius = pT/(0.3B)"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"Correlation Matrix"}),(0,a.jsx)("td",{className:"p-2",children:"3"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Aggregated"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Pearson correlation"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Heatmap (8×8)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"No |ρ| > 0.7 — all kept"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"Feature Importance"}),(0,a.jsx)("td",{className:"p-2",children:"3"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Aggregated"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"SHAP values"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Bar chart (15 features)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"m(4μ) #1 signal, MET #1 bg"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"Significance"}),(0,a.jsx)("td",{className:"p-2",children:"3"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Aggregated"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"√L × S/√B"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Line chart (4 methods)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"GNN saves 3 years of LHC"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"Systematics"}),(0,a.jsx)("td",{className:"p-2",children:"3"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Aggregated"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Uncertainty budget"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Bar chart (12 sources)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"JES dominates (4.2%)"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"Cross-sections"}),(0,a.jsx)("td",{className:"p-2",children:"3"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Aggregated"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"σ = N/(L×ε×BR)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Bar chart (6 channels)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"All within 1.5σ of SM"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"ML ROC"}),(0,a.jsx)("td",{className:"p-2",children:"4"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Model"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"BDT→CNN→GNN→Transformer"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Line chart (4 ROCs)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"GNN AUC=0.93 (+13%)"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"Anomaly Detection"}),(0,a.jsx)("td",{className:"p-2",children:"4"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Model"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Autoencoder (unsupervised)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Bar chart (2 dist)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Model-independent new physics"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"Z' Sensitivity"}),(0,a.jsx)("td",{className:"p-2",children:"4"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Hypothetical"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"L_required = f(m, σ, ML)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Bar chart (7 masses)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"ML extends physics reach 3x"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"MC vs Data"}),(0,a.jsx)("td",{className:"p-2",children:"5"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Validation"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Pythia8 + Delphes"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Line chart (4 curves)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Data/MC = 1.003 (validated)"})]}),(0,a.jsxs)("tr",{children:[(0,a.jsx)("td",{className:"p-2 font-semibold",children:"Mass Fit"}),(0,a.jsx)("td",{className:"p-2",children:"5"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Signal extraction"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Signal+bg simultaneous fit"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"Line chart (4 curves)"}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:"m_H = 125.1 ± 0.2 GeV"})]})]})]})})}),(0,a.jsx)(i.SectionCard,{title:"Real Datasets Referenced",description:"All datasets from CERN Open Data Portal or GitHub-hosted LHC ML challenges — published within the last 2 years.",icon:(0,a.jsx)(L.Database,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{className:"rounded-md border border-border/40 p-3",children:[(0,a.jsx)("p",{className:"text-[11px] font-semibold",children:"CERN Open Data CMS NanoAOD (Published 2024)"}),(0,a.jsxs)("p",{className:"text-[11px] text-muted-foreground mt-1",children:[(0,a.jsx)("a",{href:"http://opendata.cern.ch",target:"_blank",rel:"noopener noreferrer",className:"text-primary hover:underline",children:"opendata.cern.ch"})," ","— CMS Run 2 data in NanoAOD format (ROOT trees). Published 2024, data recorded 2016. Accessible via ",(0,a.jsx)("code",{className:"text-[10px]",children:"uproot"})," in Python."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-border/40 p-3",children:[(0,a.jsx)("p",{className:"text-[11px] font-semibold",children:"LHC Olympics 2020 Anomaly Detection Dataset"}),(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:'GitHub-hosted. R&D dataset with hidden anomalies ("black boxes"). Benchmarks model-independent new physics searches.'})]}),(0,a.jsxs)("div",{className:"rounded-md border border-border/40 p-3",children:[(0,a.jsx)("p",{className:"text-[11px] font-semibold",children:"FAIR AI-Ready Higgs → bb Dataset"}),(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Published in Scientific Data (2022, updated 2024). Higgs decays + quark/gluon background for ML benchmarking."})]}),(0,a.jsxs)("div",{className:"rounded-md border border-border/40 p-3",children:[(0,a.jsx)("p",{className:"text-[11px] font-semibold",children:"ATLAS Open Data for Research (2024)"}),(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"3 categories: real data, MC simulations, analysis tools. Run 2 (2015-2018) at 13 TeV."})]})]})}),(0,a.jsxs)(l.DeeperThoughtSection,{pageTitle:"LHC Data Analysis",children:[(0,a.jsx)(l.DeeperThought,{title:"The Higgs bump IS a statistical discovery",connectedTo:"Bayes + SVD + Poisson cards",children:(0,a.jsx)("p",{children:"The Higgs discovery at 125 GeV is fundamentally a statistical argument: 'there is a bump in the invariant mass distribution that is inconsistent with the background-only hypothesis at 5σ.' The invariant mass formula m = √(2·pT₁·pT₂·(cosh(Δη) − cos(Δφ))) is a quadratic form — the same mathematical object as the covariance matrix in SVD. The Poisson distribution governs event counts in each mass bin — the same rare-event law that appears in sequencing depth and server load. Three elegant-code cards (Bayes, SVD, Poisson) all appear in a single LHC analysis."})}),(0,a.jsx)(l.DeeperThought,{title:"BDT → CNN → GNN is the universal ML evolution",connectedTo:"Elegant Code: SVD, Attention, molecular modelling",children:(0,a.jsx)("p",{children:"The jet tagging evolution (BDT → CNN → GNN → Transformer) is the SAME evolution that appears in molecular modelling (RDKit features → molecular images → molecular graphs), in genomics (handcrafted variants → SNP arrays → graph neural nets on Hi-C contact maps), and in social networks (demographic features → user embeddings → social graphs). Start with engineered features (fast, interpretable), then images (captures spatial patterns), then graphs (captures relational structure). Same pattern, different domain."})}),(0,a.jsx)(l.DeeperThought,{title:"Hypothetical scenarios extend the physics reach",connectedTo:"ML + sensitivity analysis",children:(0,a.jsx)("p",{children:"The Z' sensitivity analysis demonstrates a key practicing-DS skill: 'what if?' analysis. What if a Z' existed at 5 TeV? Without ML: 10,000 fb⁻¹ needed (beyond HL-LHC). With GNN: 3,500 fb⁻¹ (within HL-LHC reach). ML doesn't just improve accuracy — it extends the physics frontier. The same 'what-if' analysis applies to drug discovery (what if we had 10x more compounds?), climate (what if temperature rises 2°C?), and finance (what if interest rates double?). The practicing DS always asks: what's the sensitivity? What could we discover with better tools?"})})]}),(0,a.jsx)(n.NextSteps,{relatedPages:[{id:"analytics-outputs",reason:"Layer 5 visualizations — the chart-rendering infrastructure used on this page"},{id:"elegant-code",reason:"Bayes, SVD, Poisson — the math behind LHC signal extraction"},{id:"quantum-computing",reason:"Quantum ML for LHC — the next frontier in particle physics computing"},{id:"fintech",reason:"The LHC trigger IS a real-time anomaly detection pipeline — same pattern as fraud detection"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(s.default,{href:(0,c.hrefFor)("home"),className:"text-sm text-primary hover:underline",children:"→ Return to overview"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(s.default,{href:(0,c.hrefFor)("analytics-outputs"),className:"text-sm text-primary hover:underline",children:"→ Analytics Outputs (Layer 5)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(s.default,{href:(0,c.hrefFor)("elegant-code"),className:"text-sm text-primary hover:underline",children:"→ Elegant Code (math behind the analysis)"})]})]})}e.s(["LHCDataAnalysisPage",()=>eo],102163)}]);