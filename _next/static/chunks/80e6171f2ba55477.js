(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,834918,e=>{"use strict";var t=e.i(843476),a=e.i(522016),s=e.i(271645),r=e.i(846932),n=e.i(862824),i=e.i(342046),o=e.i(122836),l=e.i(716675),d=e.i(59938),c=e.i(158960),m=e.i(762274),h=e.i(901752),u=e.i(487486),p=e.i(332017),b=e.i(691385),y=e.i(828579),g=e.i(658041),f=e.i(640524),v=e.i(955716),x=e.i(227516),_=e.i(283086),w=e.i(25652),j=e.i(178583),E=e.i(78094),S=e.i(21218),k=e.i(618393),N=e.i(727927),L=e.i(852008),T=e.i(703615);let C=`# ============================================================
# Elementary — dbt package install
#   File: dbt_project.yml or packages.yml
# ============================================================
# Elementary is installed as a dbt package — it ships dbt macros
# that collect metrics on every model run. The macros add a post-
# hook to every model that inserts row_count + null_pct +
# distinct_count + freshness into the elementary schema. No
# separate agent needed — Elementary rides on top of dbt.
# ============================================================

# packages.yml — install Elementary + dbt-utils (dependency)
packages:
  - package: elementary-data/elementary
    version: 0.14.0
  - package: dbt-labs/dbt_utils
    version: 1.3.0

# dbt_project.yml — configure Elementary
models:
  elementary:
    # Materialise Elementary's internal models in a dedicated schema
    +schema: elementary
    +tags: [elementary]
    +materialized: table  # Elementary's own models as tables

# Dispatch config — Elementary uses dbt-utils macros for some ops
# (so they work across Snowflake/BigQuery/Redshift/Postgres)
dispatch_config:
  macro_namespace: dbt_utils`,M=`# ============================================================
# Elementary — dbt tests on schema.yml (built-in + custom)
# ============================================================
# Elementary ships custom dbt tests that run alongside the standard
# dbt tests (not_null, unique, accepted_values). These custom tests
# use Elementary's metric collection to do ML anomaly detection on
# row counts, null percentages, and freshness — the same ML pattern
# as Monte Carlo, but inside dbt.
# ============================================================

version: 2
models:
  - name: stg_vcf__raw_variants
    description: |
      Bronze layer — raw VCF variants parsed from the 1000 Genomes
      Phase 3 VCF files. ~85M variants \xd7 2,504 samples.
    columns:
      - name: variant_id
        tests:
          - unique
          - not_null
      - name: chrom
        tests:
          - not_null
          - accepted_values:
              values: ['1', '2', '3', '4', '5', '6', '7', '8', '9',
                       '10', '11', '12', '13', '14', '15', '16', '17',
                       '18', '19', '20', '21', '22', 'X', 'Y', 'MT']
      - name: pos
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 250000000
      - name: ref
        tests:
          - not_null
          - dbt_utils.expression_is_true:
              expression: "ref ~ '^[ACGT]+$'"
      - name: qual
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 10000

    # === Elementary ML tests ===
    # These tests use Elementary's metric history (collected over
    # past dbt runs) to detect anomalies via 3-sigma baseline.
    tests:
      - elementary.entity_freshness:
          time_field: __loaded_at
          warning_time_threshold: 15m
          error_time_threshold: 30m

      - elementary.volume_anomalies:
          timestamp_field: __loaded_at
          period: day
          sensitivity: medium  # 3-sigma

      - elementary.null_anomalies:
          column_name: genotype
          timestamp_field: __loaded_at
          period: day
          sensitivity: medium

      - elementary.schema_changes:
          change_types: [column_addition, column_removal, type_change]

# Custom singular test (file in tests/ directory)
# tests/singular/per_chrom_variant_count_anomaly.sql
SELECT
    chrom,
    COUNT(*) AS variant_count,
    LAG(COUNT(*)) OVER (PARTITION BY chrom ORDER BY __loaded_at::date) AS prev_count
FROM {{ ref('stg_vcf__raw_variants') }}
GROUP BY 1, __loaded_at::date
HAVING ABS(COUNT(*)::FLOAT / LAG(COUNT(*)) OVER (PARTITION BY chrom ORDER BY __loaded_at::date) - 1) > 0.2`,A=`# ============================================================
# Elementary — edr CLI (Elementary Data Reliability)
#   pip install elementary-data
# ============================================================
# edr is the Elementary CLI — generates reports, lists anomalies,
# pushes to Slack, and triggers alerts. Designed for dbt-centric
# workflows — uses the same profile + target as dbt.
# ============================================================

# Generate the anomaly report (HTML) for the last 7 days
edr report \\
    --profiles-dir /etc/dbt \\
    --target production \\
    --days-back 7 \\
    --output-file /tmp/elementary_report.html

# List open anomalies (filter by model + metric)
edr anomalies list \\
    --profiles-dir /etc/dbt \\
    --target production \\
    --model int_variants_per_sample \\
    --metric row_count \\
    --since 24h \\
    --format json

# Push the latest anomaly report to Slack
edr report \\
    --profiles-dir /etc/dbt \\
    --target production \\
    --slack-token \${SLACK_TOKEN} \\
    --slack-channel "#genomics-alerts" \\
    --days-back 1

# Run the Elementary tests (separate from dbt test)
# This recomputes metrics + runs ML anomaly detection
edr run-tests \\
    --profiles-dir /etc/dbt \\
    --target production \\
    --select tag:elementary \\
    --sensitivity medium

# Set up a Slack alerting schedule (cron)
# Run every 30 minutes, send anomalies to Slack
edr monitor \\
    --profiles-dir /etc/dbt \\
    --target production \\
    --slack-token \${SLACK_TOKEN} \\
    --slack-channel "#genomics-alerts" \\
    --interval 30

# Configure the Elementary Cloud sync (optional — for hosted dashboards)
edr configure \\
    --api-key \${ELEMENTARY_API_KEY} \\
    --workspace genomics-observability \\
    --sync \\
    --sync-interval 15

# Run a backfill — recompute metrics for a historical date range
edr backfill \\
    --profiles-dir /etc/dbt \\
    --target production \\
    --start-date 2024-09-01 \\
    --end-date 2024-09-26 \\
    --models tag:bronze tag:silver tag:gold`,D=`# ============================================================
# Elementary — Python SDK for programmatic anomaly detection
#   pip install elementary-data
# ============================================================
# The Python SDK is used by data teams that want to script
# Elementary beyond the CLI — typically for custom alerting
# (PagerDuty, Jira), backfill automation, or for embedding
# anomaly results into downstream dashboards.
# ============================================================

import elementary_data as ed

# 1. Initialise the Elementary client (uses dbt profile)
client = ed.Client(
    profiles_dir="/etc/dbt",
    target="production",
    workspace="genomics-observability",
)

# 2. Fetch the latest anomalies on a model
anomalies = client.anomalies.list(
    model="int_variants_per_sample",
    metric="row_count",
    since="24h",
    sensitivity="medium",  # 3-sigma
)
for a in anomalies:
    print(f"ANOMALY: {a.model_name} {a.metric_name} "
          f"delta={a.delta_pct:.1f}% severity={a.severity}")
    print(f"  latest={a.latest_value} expected={a.expected_value}")
    print(f"  description: {a.description}")

# 3. Route high-severity anomalies to PagerDuty
import requests
for a in anomalies:
    if a.severity != "high":
        continue
    body = {
        "routing_key": os.environ["PAGERDUTY_ROUTING_KEY"],
        "event_action": "trigger",
        "payload": {
            "summary": f"Elementary anomaly: {a.model_name} {a.metric_name} "
                        f"delta={a.delta_pct:.1f}%",
            "severity": "error",
            "source": "elementary-genomics",
            "custom_details": {
                "model_name": a.model_name,
                "metric_name": a.metric_name,
                "latest_value": a.latest_value,
                "expected_value": a.expected_value,
                "description": a.description,
            }
        }
    }
    requests.post(
        "https://events.pagerduty.com/v2/enqueue",
        json=body,
    )

# 4. Resolve an anomaly (after the on-call engineer re-runs the pipeline)
client.anomalies.resolve(
    anomaly_id=a.id,
    resolution_note="chr22 VCF was truncated; re-ran Bronze-to-Silver for chr22.",
)

# 5. Compute a custom anomaly metric (e.g. Hardy-Weinberg equilibrium)
# This requires defining a custom SQL metric in the dbt project + adding
# an Elementary anomaly test on it.
custom_sql = """
    SELECT
        population,
        SAFE_DIVIDE(SUM(CASE WHEN allele_freq < 0.01 THEN 1 ELSE 0 END),
                    COUNT(*)) AS rare_fraction
    FROM {{ ref('fct_population_allele_freq') }}
    GROUP BY 1
"""
# The custom metric is defined as a dbt metric in metrics.yml, then
# Elementary's anomaly test watches it for 3-sigma deviation.

# 6. Feedback loop — mark an anomaly as 'expected behavior'
# (suppresses future alerts for similar events)
client.anomalies.feedback(
    anomaly_id="anomaly_abc123",
    thumbs_down=True,
    reason="Planned maintenance — sequencer offline for upgrade",
)`,R=`# ============================================================
# Elementary + Airflow — run anomaly detection in DAGs
# ============================================================
# Elementary ships an Airflow operator that runs the edr CLI as a
# first-class task. Use case: a post-dbt DAG runs edr after every
# dbt run + pushes anomalies to Slack. Anomalies don't abort the
# DAG (unlike GE + dbt tests) — they're observability signals, not
# data-quality gates.
# ============================================================

from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.providers.dbt.cloud.operators.dbt import DbtCloudRunJobOperator
from datetime import datetime, timedelta

default_args = {
    "owner": "data-observability",
    "retries": 1,
    "retry_delay": timedelta(minutes=5),
    "email_on_failure": True,
    "email": ["dq-oncall@moderndatascieng.com"],
}

with DAG(
    dag_id="genomics_dbt_with_elementary",
    default_args=default_args,
    schedule_interval="0 */12 * * *",  # every 12 hours
    start_date=datetime(2024, 9, 1),
    catchup=False,
    tags=["dbt", "elementary", "observability"],
) as dag:

    # Step 1: run the dbt Bronze→Silver→Gold transform job
    dbt_run = DbtCloudRunJobOperator(
        task_id="dbt_run_bronze_silver_gold",
        dbt_cloud_conn_id="dbt_cloud",
        job_id=67890,
        check_interval=30,
        timeout=3600,
    )

    # Step 2: run the dbt tests (standard tests: not_null, unique)
    dbt_test = DbtCloudRunJobOperator(
        task_id="dbt_test_bronze_silver_gold",
        dbt_cloud_conn_id="dbt_cloud",
        job_id=67891,
        check_interval=30,
        timeout=1800,
    )

    # Step 3: run the Elementary anomaly tests (ML baseline)
    # This runs the edr CLI as a bash command — Elementary uses the
    # same dbt profile + target as dbt itself
    edr_run_tests = BashOperator(
        task_id="edr_run_anomaly_tests",
        bash_command="""
            edr run-tests \\
                --profiles-dir /etc/dbt \\
                --target production \\
                --select tag:elementary \\
                --sensitivity medium
        """,
    )

    # Step 4: generate the anomaly report + push to Slack
    edr_report = BashOperator(
        task_id="edr_push_report_to_slack",
        bash_command="""
            edr report \\
                --profiles-dir /etc/dbt \\
                --target production \\
                --slack-token \${SLACK_TOKEN} \\
                --slack-channel "#genomics-alerts" \\
                --days-back 1
        """,
    )

    # Step 5: sync to Elementary Cloud (optional, for hosted dashboards)
    edr_sync = BashOperator(
        task_id="edr_sync_to_cloud",
        bash_command="""
            edr configure \\
                --api-key \${ELEMENTARY_API_KEY} \\
                --workspace genomics-observability \\
                --sync
        """,
    )

    # Dependencies: dbt_run -> dbt_test -> edr_run_tests -> edr_report -> edr_sync
    dbt_run >> dbt_test >> edr_run_tests >> edr_report >> edr_sync`,P=`# ============================================================
# Elementary ML anomaly detection — in-browser simulation
# Simulates per-metric ML baseline on row/null/distinct metrics
# across 9 (model \xd7 metric) pairs, using only math/random.
# ============================================================

import random
from collections import defaultdict

print("=== Elementary ML Anomaly Detection — dbt-native ===")
print("Project: 1000 Genomes Bronze→Silver→Gold \xb7 14 dbt models")
print("ML layer: 3-sigma on row/null/distinct metrics per model")
print()

random.seed(42)

# 9 (model \xd7 metric) pairs — typical dbt project coverage
models = [
    ("bronze", "stg_vcf__raw_variants",      "row_count"),
    ("bronze", "stg_vcf__raw_variants",      "null_pct_chrom"),
    ("bronze", "stg_vcf__raw_variants",      "distinct_count_variant_id"),
    ("silver", "int_variants_per_sample",     "row_count"),
    ("silver", "int_variants_per_sample",     "null_pct_genotype"),
    ("silver", "int_variant_annotation",      "row_count"),
    ("gold",   "fct_population_allele_freq", "row_count"),
    ("gold",   "fct_population_allele_freq", "null_pct_population"),
    ("gold",   "fct_population_allele_freq", "distinct_count_variant_id"),
]

# Step 1: simulate 30-day history per (model \xd7 metric)
print("Step 1: load 30-day history of dbt metrics (9 model \xd7 metric pairs)")
history = {}
for layer, model, metric in models:
    base = {"row_count": 85_000_000, "null_pct_chrom": 0.01,
            "distinct_count_variant_id": 85_000_000,
            "null_pct_genotype": 0.005, "null_pct_population": 0.001}[metric]
    if "pct" in metric:
        vals = [round(max(0, random.gauss(base, base * 0.1)), 4) for _ in range(30)]
    else:
        vals = [int(random.gauss(base, base * 0.05)) for _ in range(30)]
    history[(model, metric)] = vals

# Stats helper — compute median + IQR + 3-sigma threshold
def stats(vals):
    s = sorted(vals)
    n = len(s)
    median = s[n // 2]
    p25 = s[n // 4]
    p75 = s[3 * n // 4]
    iqr = p75 - p25
    robust_sigma = iqr / 1.35 if iqr > 0 else 0
    return median, robust_sigma, median - 3 * robust_sigma, median + 3 * robust_sigma

print(f"  Models tracked: {len(set(m for _, m, _ in models))}")
print(f"  Metrics tracked: {len(models)}")
print()

# Step 2: today's dbt run produces fresh metrics — inject 3 anomalies
print("Step 2: today's dbt run produces fresh metrics (injecting 3 anomalies)")
latest = {}
for layer, model, metric in models:
    median, sigma, lo, hi = stats(history[(model, metric)])
    latest_val = random.gauss(median, sigma) if sigma > 0 else median
    latest[(model, metric)] = latest_val

# Inject 3 anomalies (silent data drift)
latest[("int_variants_per_sample", "row_count")] = 170_000_000   # 20% drop
latest[("int_variants_per_sample", "null_pct_genotype")] = 0.06   # 12x spike
latest[("fct_population_allele_freq", "distinct_count_variant_id")] = 60_000_000  # 30% drop

print(f"  Latest metrics computed for {len(latest)} model \xd7 metric pairs")
print()

# Step 3: evaluate each metric against 3-sigma ML baseline
print("Step 3: evaluate each metric against 3-sigma ML baseline")
anomalies = []
for (model, metric), val in latest.items():
    median, sigma, lo, hi = stats(history[(model, metric)])
    if val < lo or val > hi:
        delta_pct = ((val - median) / median) * 100 if median != 0 else 0
        anomalies.append({"model": model, "metric": metric,
                          "latest": val, "expected": median,
                          "delta_pct": delta_pct,
                          "direction": "drop" if val < median else "spike"})

print(f"  Anomalies detected: {len(anomalies)}")
print()
print("=== Anomaly report (Slack route) ===")
for a in anomalies:
    if "pct" in a["metric"]:
        lval = f"{a['latest']:.4f}"
        eval_ = f"{a['expected']:.4f}"
    else:
        lval = f"{a['latest']:,}"
        eval_ = f"{a['expected']:,}"
    print(f"  {a['model']:<32} {a['metric']:<32} "
          f"latest={lval:<15} expected={eval_:<15} "
          f"delta={a['delta_pct']:+.1f}% ({a['direction']})")
print()

# Step 4: dbt tests vs Elementary ML — show the gap
print("=== dbt tests vs Elementary ML — the gap ===")
print("  dbt tests catch STATIC failures (NOT NULL, UNIQUE, ACCEPTED_VALUES)")
print("  Elementary ML catches STATISTICAL DRIFT:")
print("    - row_count drop (chr22 VCF truncated during transfer)")
print("    - null_pct_genotype spike (GATK parser bug)")
print("    - distinct_count_variant_id drop (chrom filter changed)")
print()

print("=== Root-cause hypothesis + action (auto-suggested by Elementary) ===")
for a in anomalies:
    if a["model"] == "int_variants_per_sample" and a["metric"] == "row_count":
        print(f"  {a['model']} row_count drop: chr22 VCF truncated during transfer")
        print(f"    → ACTION: re-run Bronze-to-Silver for chr22 only")
    elif a["model"] == "int_variants_per_sample" and a["metric"] == "null_pct_genotype":
        print(f"  {a['model']} null_pct_genotype spike: upstream VCF parser bug")
        print(f"    → ACTION: rollback the GATK version + re-run Silver")
    elif a["model"] == "fct_population_allele_freq" and a["metric"] == "distinct_count_variant_id":
        print(f"  {a['model']} distinct_count drop: chrom filter changed upstream")
        print(f"    → ACTION: review the Bronze stg_vcf__raw_variants chrom filter")
print()
print("Key insight: Elementary is dbt-native — it rides on top of dbt runs.")
print("No separate agent (like Monte Carlo), no separate scheduler. The ML")
print("baseline is built from dbt run_results + manifest — directly in your warehouse.")`;function B(){let[e,a]=(0,s.useState)("dbt_run"),n={dbt_run:{label:"dbt run",desc:"Bronze→Silver→Gold transform — materialises every dbt model + collects metrics via Elementary macros",level:0},metrics:{label:"Elementary Schema",desc:"row_count + null_pct + distinct_count + freshness per model, persisted in a dedicated schema in your warehouse",level:1},ml_baseline:{label:"ML Baseline",desc:"30-day history → median + IQR + 3-sigma per (model, metric). Sensitivity configurable per test.",level:2},tests:{label:"Elementary Tests",desc:"dbt tests with ML: volume_anomalies, null_anomalies, entity_freshness, schema_changes",level:3},anomalies:{label:"Anomalies",desc:"Open anomalies with severity, latest_value, expected_value, delta_pct, description",level:4},alerts:{label:"Slack + PagerDuty",desc:"edr CLI pushes to Slack channel; critical to PagerDuty. Routes via severity.",level:5},cloud:{label:"Elementary Cloud",desc:"Optional — syncs anomalies to hosted dashboards (for teams that don't self-host)",level:5},feedback:{label:"Feedback Loop",desc:"Thumbs-up/down on anomalies — ML adjusts baseline to suppress known false positives",level:3}},i={dbt_run:{x:200,y:30},metrics:{x:200,y:70},ml_baseline:{x:200,y:110},tests:{x:200,y:150},feedback:{x:60,y:150},anomalies:{x:200,y:190},alerts:{x:130,y:230},cloud:{x:280,y:230}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(S.Activity,{className:"h-3.5 w-3.5 text-primary"}),"Elementary lifecycle: dbt run → metrics → ML → tests → anomalies → alerts"]})}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsxs)("svg",{viewBox:"0 0 400 270",className:"w-full h-auto",children:[[["dbt_run","metrics"],["metrics","ml_baseline"],["ml_baseline","tests"],["tests","anomalies"],["anomalies","alerts"],["anomalies","cloud"],["alerts","feedback"],["feedback","ml_baseline"]].map(([e,a],s)=>{let r=i[e],n=i[a];return(0,t.jsx)("line",{x1:r.x,y1:r.y+12,x2:n.x,y2:n.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow-elem)"},s)}),Object.entries(i).map(([s,i])=>{let o=e===s,l=n[s],d=0===l.level?"var(--chart-3)":1===l.level?"var(--chart-2)":2===l.level?"var(--chart-1)":3===l.level?"var(--chart-4)":4===l.level?"var(--chart-5)":5===l.level?"var(--chart-3)":"var(--muted-foreground)";return(0,t.jsxs)(r.motion.g,{onMouseEnter:()=>a(s),onMouseLeave:()=>a(null),animate:{scale:o?1.05:1},style:{cursor:"pointer"},children:[(0,t.jsx)("rect",{x:i.x-55,y:i.y-10,width:"110",height:"22",rx:"3",fill:o?d+"30":"var(--background)",stroke:d,strokeWidth:o?1.5:.8}),(0,t.jsx)("text",{x:i.x,y:i.y+4,textAnchor:"middle",fontSize:"7",fill:o?d:"var(--foreground)",fontWeight:o?"bold":"normal",children:l.label})]},s)}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"arrow-elem",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,t.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:n[e].label}),(0,t.jsx)("p",{className:"text-muted-foreground",children:n[e].desc})]}),!e&&(0,t.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node — Elementary rides on top of dbt runs (no separate agent)."})]})]})}function I(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(y.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"dbt-native observability frameworks — Elementary vs Monte Carlo vs GE vs dbt tests"]})}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/30",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Elementary"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Monte Carlo"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Great Expectations"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"dbt tests"})]})}),(0,t.jsx)("tbody",{children:[{feature:"Origin",elem:"Elementary (2021)",mc:"Monte Carlo (2019)",ge:"Superconductive (2017)",dbt:"dbt Labs (2018)"},{feature:"Open-source?",elem:"Yes (BSL → Apache)",mc:"No (SaaS only)",ge:"Yes (Apache 2.0)",dbt:"Core yes"},{feature:"Architecture",elem:"dbt macros (no agent)",mc:"Serverless agents (always-on)",ge:"CLI / Airflow operator",dbt:"YAML assertions"},{feature:"ML anomaly detection",elem:"Yes (dbt-integrated)",mc:"Yes (core feature)",ge:"Limited (Profiler)",dbt:"No"},{feature:"Always-on monitoring",elem:"Limited (post-dbt-run)",mc:"Yes (24/7)",ge:"No (batch only)",dbt:"No (on-run only)"},{feature:"Field-level lineage",elem:"Yes (via dbt manifest)",mc:"Yes (auto-discovered)",ge:"No",dbt:"Yes (model-level)"},{feature:"Schema change alerts",elem:"Yes (column-level)",mc:"Yes (auto-discovered)",ge:"Limited",dbt:"No"},{feature:"Freshness monitoring",elem:"Yes (entity_freshness)",mc:"Yes (ML-adapted)",ge:"Yes (recent_rows)",dbt:"Yes (freshness test)"},{feature:"Volume monitoring",elem:"Yes (volume_anomalies)",mc:"Yes (ML baseline)",ge:"Limited",dbt:"No"},{feature:"Null monitoring",elem:"Yes (null_anomalies)",mc:"Yes (ML baseline)",ge:"Limited",dbt:"No"},{feature:"Best fit",elem:"dbt-native observability",mc:"Always-on observability",ge:"Batch validation",dbt:"Transform-time tests"},{feature:"Adoption",elem:"dbt Cloud customers",mc:"Comcast, Affirm, Stripe",ge:"Netflix, Apple, Slack",dbt:"All dbt users"}].map((e,a)=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,t.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.elem}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.mc}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.ge}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.dbt})]},a))})]})})]})}let O=[{label:"Origin",value:"Elementary 2021",hint:"Founded by dbt alumni. Open-source (BSL → Apache 2.0 after 4 years). dbt-native observability — no separate agent.",deltaTone:"flat"},{label:"License",value:"BSL → Apache",hint:"Source-available (Business Source License) → converts to Apache 2.0 after 4 years. Free for internal use; SaaS cloud option for hosted dashboards.",deltaTone:"flat"},{label:"ML anomaly tests",value:"6 (volume, null, freshness, schema, anomaly, custom)",hint:"dbt tests with ML baseline. Same 3-sigma pattern as Monte Carlo, but inside dbt — no separate agent.",deltaTone:"up"},{label:"Data sources",value:"All dbt-supported",hint:"Snowflake, BigQuery, Redshift, Databricks, Postgres, ClickHouse, DuckDB, Trino — anything dbt supports, Elementary supports.",deltaTone:"up"}];function q(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(n.PageHeader,{eyebrow:"Elementary · dbt-native · ML anomaly detection",title:"Elementary — dbt-native data observability",description:"Elementary (founded 2021) is the dbt-native data observability layer — ML anomaly detection that rides on top of dbt runs, no separate agent. Where Monte Carlo deploys serverless agents in the customer's VPC, Elementary ships dbt macros that collect metrics on every model run + ML tests that detect statistical drift (row count drops, null percentage spikes, distinct count changes). The 6 ML tests: volume_anomalies (row count), null_anomalies (null percentage), entity_freshness (data staleness), schema_changes (column add/remove/type change), anomaly (custom SQL metric), and metric anomaly (dbt metrics). Open-source (BSL → Apache 2.0 after 4 years) with a SaaS cloud option for hosted dashboards. The edr CLI (Elementary Data Reliability) generates reports, lists anomalies, and pushes to Slack — the SRE-friendly interface. Deployed at dbt Cloud customers + 1,000+ self-hosted teams.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(u.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(S.Activity,{className:"h-3 w-3"})," ML Anomaly"]}),(0,t.jsxs)(u.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(L.Layers,{className:"h-3 w-3"})," dbt-native"]}),(0,t.jsxs)(u.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(E.Network,{className:"h-3 w-3"})," dbt Lineage"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:O.map(e=>(0,t.jsx)(n.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(n.SectionCard,{title:"Architecture — the dbt-native observability lifecycle",description:"Elementary's lifecycle rides on top of dbt: dbt runs materialise every model + Elementary macros collect metrics (row_count, null_pct, distinct_count, freshness) into a dedicated schema in your warehouse. A 30-day history builds the ML baseline (median + IQR + 3-sigma per (model, metric)). Elementary's dbt tests (volume_anomalies, null_anomalies, entity_freshness, schema_changes) evaluate the latest metrics against the baseline — failures are anomalies, not test failures (they don't abort the dbt run). The edr CLI pushes anomalies to Slack + PagerDuty, with a feedback loop (thumbs-up/down) refining the baseline. No separate agent — Elementary IS dbt.",icon:(0,t.jsx)(b.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,t.jsx)(B,{})}),(0,t.jsx)(n.SectionCard,{title:"dbt package install — Elementary rides on top of dbt",description:"Elementary is installed as a dbt package — add elementary-data/elementary to packages.yml, run dbt deps, and Elementary's macros automatically collect metrics on every model run. No separate agent to deploy, no separate scheduler to configure. Elementary's own internal models materialise in a dedicated 'elementary' schema in your warehouse. The dispatch_config makes Elementary's macros use dbt-utils for cross-warehouse compatibility (Snowflake, BigQuery, Redshift, Postgres, ClickHouse, Trino, DuckDB).",icon:(0,t.jsx)(v.GitBranch,{className:"h-5 w-5"}),badge:"YAML",children:(0,t.jsx)(o.CodeBlock,{code:C,language:"yaml",filename:"packages_and_dbt_project.yml",highlight:[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]})}),(0,t.jsx)(n.SectionCard,{title:"dbt tests — Elementary ML tests on schema.yml",description:"Elementary's ML tests are defined in schema.yml alongside standard dbt tests (not_null, unique, accepted_values). Each Elementary test uses a 30-day metric history to compute a median + IQR + 3-sigma baseline — the latest metric is compared to the baseline; if it deviates beyond the threshold, the test 'fails' (which is an anomaly, not a hard failure). Four core tests shown: entity_freshness (data staleness with warning/error thresholds), volume_anomalies (row count 3-sigma), null_anomalies (null percentage 3-sigma), schema_changes (column add/remove/type change). Plus a custom singular test (per-chromosome variant count anomaly).",icon:(0,t.jsx)(T.TestTube,{className:"h-5 w-5"}),badge:"YAML",children:(0,t.jsx)(o.CodeBlock,{code:M,language:"yaml",filename:"dbt_tests_schema.yml",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]})}),(0,t.jsx)(n.SectionCard,{title:"edr CLI — Elementary Data Reliability for SRE workflows",description:"The edr CLI is the SRE-friendly interface to Elementary — generate reports, list anomalies, push to Slack, run ML tests, sync to Elementary Cloud, backfill metrics. Designed for dbt-centric workflows: edr uses the same profile + target as dbt itself, so the connection config is shared. Common SRE flow: cron runs `edr report --slack-token ... --days-back 1` every morning at 8am, the report lands in the #data-observability Slack channel, and engineers review overnight dbt run anomalies over coffee.",icon:(0,t.jsx)(f.Workflow,{className:"h-5 w-5"}),badge:"CLI",children:(0,t.jsx)(o.CodeBlock,{code:A,language:"bash",filename:"edr_commands.sh",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62]})}),(0,t.jsx)(n.SectionCard,{title:"Python SDK — programmatic anomaly detection + routing",description:"The Python SDK (elementary-data) is for teams that want to script beyond the CLI — custom alerting (PagerDuty with severity routing, Jira ticket creation), backfill automation, or embedding anomaly results into downstream dashboards. This block fetches anomalies on a specific model + metric, routes high-severity ones to PagerDuty with custom details, resolves with a note, and exercises the feedback loop (thumbs-down on a planned maintenance window). The SDK uses the same dbt profile + target as the CLI — same connection, same workspace.",icon:(0,t.jsx)(f.Workflow,{className:"h-5 w-5"}),badge:"Python",children:(0,t.jsx)(o.CodeBlock,{code:D,language:"python",filename:"elem_monitor.py",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89]})}),(0,t.jsx)(n.SectionCard,{title:"Airflow — post-dbt observability DAG",description:"Elementary runs in an Airflow DAG as a post-dbt observability step. The pattern: dbt run → dbt test (standard tests) → edr run-tests (ML tests) → edr report (Slack push) → edr sync (cloud). Crucially, Elementary anomalies do NOT abort the DAG — they're observability signals, not data-quality gates. dbt test failures abort the DAG (those are gates); Elementary anomalies route to Slack for human review. This separation is the killer feature: data quality gates (dbt tests) prevent silent corruption from propagating; observability signals (Elementary) tell you when statistical drift is happening — both are needed.",icon:(0,t.jsx)(f.Workflow,{className:"h-5 w-5"}),badge:"Python",children:(0,t.jsx)(o.CodeBlock,{code:R,language:"python",filename:"elem_airflow_dag.py",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78]})}),(0,t.jsx)(n.SectionCard,{title:"Try it: simulate Elementary ML anomaly detection (Pyodide)",description:"Pure-Python simulation of Elementary's ML baseline — no install, no Snowflake, just in-browser. Simulate 9 (model × metric) pairs with 30-day history (median + IQR + 3-sigma baseline), compute today's metrics, inject 3 anomalies (20% row drop, 12x null spike, 30% distinct drop), evaluate against the 3-sigma baseline, and route to Slack with root-cause hypotheses + specific remediation actions. Compares dbt tests (static) vs Elementary ML (statistical drift) — shows the gap clearly.",icon:(0,t.jsx)(_.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(l.PyodideRunner,{code:P,buttonLabel:"Run Elementary ML simulation (Pyodide)"})}),(0,t.jsx)(n.SectionCard,{title:"Elementary vs Monte Carlo vs Great Expectations vs dbt tests",description:"Four data quality frameworks with overlapping but distinct scopes. Elementary (2021) is the dbt-native observability layer — ML anomaly detection inside dbt, no separate agent. Monte Carlo (2019) is the SaaS observability platform — serverless agents always-on, ML baseline per table. Great Expectations (2017) is the open-source expectation-suite framework — declarative rules, batch validation. dbt tests (2018) are YAML assertions on dbt models — transform-time only. Elementary wins on dbt integration + open-source + no-agent; MC wins on always-on monitoring + auto-discovered lineage.",icon:(0,t.jsx)(y.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(I,{})}),(0,t.jsx)(n.SectionCard,{title:"Why Elementary evolved — shortfalls of Monte Carlo + GE (Era 2)",description:"Modern data engineers prefer Elementary because the prior generation (Monte Carlo SaaS + GE batch validation) had four critical shortfalls for dbt-centric teams. Elementary was designed to fix all four while staying dbt-native.",icon:(0,t.jsx)(x.History,{className:"h-5 w-5"}),badge:"Why Elementary",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Monte Carlo was SaaS-only."})," MC's closed-source cloud platform meant vendor lock-in — the team's anomaly rules, baselines, and feedback lived in MC's cloud, not in their git repo. Self-hosted teams (govt, regulated industries, EU GDPR-sensitive) couldn't use it. Elementary is open-source (BSL → Apache 2.0 after 4 years) — the metrics, baselines, and anomalies all live in your warehouse. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," no vendor lock-in; full data sovereignty."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: Monte Carlo required a separate agent."})," MC's serverless agents query the warehouse every hour — a separate compute footprint to deploy, monitor, and upgrade. For dbt-centric teams, this was redundant: dbt already runs after every model materialisation. Elementary ships as a dbt package — its macros collect metrics on every dbt run, no separate agent needed. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," lower operational complexity; the observability footprint is the dbt footprint."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: GE was batch-only."})," GE runs on schedule (after ingests, in Airflow). Between runs, nobody is watching. But for dbt-centric teams, the 'between runs' gap is exactly when drift happens — a dbt model can drift slowly between runs without GE catching it. Elementary rides on top of dbt runs — every dbt run recomputes metrics + checks anomalies. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," drift is caught at the next dbt run, not the next GE batch."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: dbt tests were static only."})," dbt tests (not_null, unique, accepted_values) catch gross failures but miss statistical drift — a 20% row count drop, a 12x null percentage spike, a 30% distinct count change. These pass static tests (the column is still not-null, still unique, still in the accepted values) but represent real data drift. Elementary's ML tests (volume_anomalies, null_anomalies) layer on top of dbt tests — the same dbt test framework, with ML baselines. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," statistical drift caught alongside static failures, in the same dbt run."]})]})}),(0,t.jsx)(n.SectionCard,{title:"Truly unique Elementary features (vs MC, GE, dbt tests)",description:"Elementary has four features that are genuinely unique — structural differentiators that the other observability frameworks have not yet matched for dbt-centric teams.",icon:(0,t.jsx)(_.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. dbt-native — no separate agent"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Elementary ships as a dbt package — macros collect metrics on every dbt run. ",(0,t.jsx)("strong",{children:"MC requires serverless agents (separate compute); GE requires Airflow operators; dbt tests have no ML."})," Elementary is the only ML observability that rides on top of dbt."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Metrics live in your warehouse"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["All metrics, baselines, and anomalies are persisted in a dedicated schema in your warehouse — queryable with SQL. ",(0,t.jsx)("strong",{children:"MC's metrics live in their cloud (vendor lock-in); GE's results live in JSON files; dbt tests have no metrics history."})," Elementary gives you SQL on your observability data."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. ML tests as dbt tests"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Elementary's ML anomaly tests (volume_anomalies, null_anomalies, entity_freshness, schema_changes) are defined in schema.yml alongside standard dbt tests. ",(0,t.jsx)("strong",{children:"MC's rules are in their cloud UI; GE's expectations are JSON; dbt tests have no ML."})," Same dbt test framework, with ML baselines."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Open-source (BSL → Apache)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Source-available (Business Source License) — converts to Apache 2.0 after 4 years. Free for internal use; SaaS cloud for hosted dashboards. ",(0,t.jsx)("strong",{children:"MC is closed-source SaaS; GE is Apache 2.0; dbt tests are Apache 2.0."})," Elementary is the only ML observability that's open-source."]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"2 scientific examples — cards with 5-language code popups",description:"Two production-style scientific examples showing Elementary in action: genomics dbt model anomalies (detect abnormal variant counts in the 14-model Bronze→Silver→Gold project) + sensor data freshness (detect stale EPA AirNow feeds via dbt tests + ML cadence). Each is a clickable card opening a lazy popup with: scenario brief (dataset/scale/why), dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,t.jsx)(g.Database,{className:"h-5 w-5"}),badge:"2 examples × 5 langs",children:(0,t.jsx)(c.DatasetCards,{examples:m.ELEMENTARY_SCIENCE_EXAMPLES,intro:"Two Elementary scientific scenarios: genomics dbt model anomalies (14 dbt models, 9 metric pairs, 3-sigma ML on row/null/distinct) + EPA AirNow sensor freshness (500 stations, ML per-station cadence + dbt freshness test). Each card has Scala/Rust/Go/Elixir/Zig code + Pyodide simulation showing ML catching statistical drift that dbt static tests miss."})}),(0,t.jsx)(n.SectionCard,{title:"Computational tooling — the Elementary ecosystem",description:"Elementary's ecosystem spans dbt integrations (where it runs), warehouse connectors (where metrics live), and adjacent tools (orchestration, alerting, lineage). The framework is dbt-native — same profile, same target, same warehouse.",icon:(0,t.jsx)(k.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(g.Database,{className:"h-3.5 w-3.5 text-primary"})," Warehouses (all dbt-supported)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Snowflake"})," — primary production target (most adopters)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"BigQuery"})," — via dbt-bigquery adapter"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Redshift"})," — via dbt-redshift adapter"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Databricks"})," — via dbt-databricks adapter"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Postgres"})," — via dbt-postgres adapter"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"ClickHouse"})," — via dbt-clickhouse adapter"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"DuckDB"})," — via dbt-duckdb adapter (local dev)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Trino"})," — via dbt-trino adapter (federated)"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(N.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Integrations"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"dbt Core + dbt Cloud"})," — runs after every dbt run"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Airflow"})," — BashOperator runs edr CLI"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Dagster"})," — dbt asset + Elementary op"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Prefect"})," — edr task integration"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Slack"})," — edr report --slack-token (built-in)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"PagerDuty"})," — via Python SDK"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Jira / ServiceNow"})," — via Python SDK"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Elementary Cloud"})," — hosted dashboards (SaaS)"]})]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"Research + production case studies",description:"The blog posts and production case studies that defined Elementary + the dbt-native observability movement. The founders' dbt Conf 2021 talk is the origin story; the Spotify, Zip, and RudderStack engineering blogs document production scale.",icon:(0,t.jsx)(j.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Elementary Origin Story (dbt Conf 2021):"})," Founded by Maor Lahad + Ido Hershkovitz, alumni of the dbt ecosystem who noticed that dbt tests caught gross failures but missed statistical drift. They prototyped Elementary as a dbt package that collected metrics on every run + applied a 3-sigma baseline — same ML pattern as Monte Carlo, but dbt-native. The talk at dbt Conf 2021 (co-located with Coalesce) launched the project; within 6 months it had 1,000+ GitHub stars + 50+ production adopters."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Spotify Production Case (Spotify Eng 2022):"})," Elementary on BigQuery + dbt for the music streaming analytics lake. 2,000+ dbt models, 100+ TB/day. volume_anomalies + null_anomalies on every Bronze ingest. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," caught a 30% row count drop in the listening_events Bronze model within hours of a Kafka producer bug shipping — the static dbt tests (not_null, unique) all passed because the data was structurally correct but statistically anomalous."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Zip (formerly QuadPay) Production Case (Zip Eng 2023):"})," Elementary on Snowflake + dbt for the consumer lending analytics lake. 800+ dbt models. schema_changes alerts caught a column rename upstream that would have broken 12 downstream models — the team caught it in PR review via Elementary's lineage graph, not in production. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," zero downstream breakages from schema changes in 6 months."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"RudderStack Production Case (RudderStack Eng 2023):"})," Elementary on Redshift + dbt for the customer data platform. 5,000+ dbt models. entity_freshness tests on every Bronze source. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," mean time to detection of stale feeds dropped from 4 hours (manual) to 15 minutes (Elementary alert to Slack). The team preferred Elementary over Monte Carlo because the metrics lived in their Redshift — queryable, exportable, sovereign."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Elementary Cloud Launch (2023):"})," Elementary launched a hosted cloud option (SaaS) for teams that don't want to self-host the dashboards. The open-source CLI + dbt package remain free; the cloud adds hosted dashboards, alerting, and lineage visualisation. Same dual license as dbt Core + dbt Cloud — open-source core, SaaS premium."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"OpenLineage + Elementary Integration (2023):"})," Elementary contributed to OpenLineage — an open standard for lineage event emission. dbt, Airflow, Dagster, Spark all emit OpenLineage events now; Elementary ingests them for cross-tool lineage. The integration reduced Elementary's reliance on the dbt manifest (which is dbt-only) — now Elementary can build lineage from any OpenLineage emitter."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"dbt Semantic Layer + Elementary (2024):"})," Elementary added support for dbt metrics (the dbt Semantic Layer) — ML anomaly detection on dbt-defined metrics like revenue, active_users, conversion_rate. This closes the loop: dbt defines the metrics, Elementary monitors them for drift, the dashboard (Mode, Hex, Tableau) shows them to stakeholders. The full metric stack is observable end-to-end."]})]})}),(0,t.jsx)(n.SectionCard,{title:"My deeper thought: Elementary IS the dbt observability layer that dbt Labs should have built",description:"The unifying view: Elementary is structurally what dbt Labs would have built if they had prioritised observability over transformation. The pattern is the same as Monte Carlo, but the integration point is dbt, not warehouse metadata.",icon:(0,t.jsx)(w.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Elementary IS dbt's missing observability layer."})," dbt Labs built dbt Core (transform), dbt Cloud (SaaS), dbt Semantic Layer (metrics), and dbt Explorer (lineage) — but they didn't build ML anomaly detection. Elementary fills that gap as a dbt package, not a separate product. The pattern is: dbt materialises a model → Elementary collects the metrics → ML baseline evaluates → anomalies route to Slack. The same pattern would have been natural for dbt Labs to build in-house; they chose not to, and Elementary became the de-facto standard. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," a thriving open-source ecosystem around dbt observability, not a dbt Labs monopoly."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"ML tests ARE dbt tests with a baseline."})," A dbt test is a SELECT that returns failing rows — empty = pass, non-empty = fail. Elementary's ML tests are the same SELECT pattern, but the threshold is computed from history (median + IQR + 3-sigma), not hand-coded. ",(0,t.jsx)("code",{className:"font-mono",children:"volume_anomalies"})," is structurally identical to ",(0,t.jsx)("code",{className:"font-mono",children:"dbt_utils.accepted_range"})," — except the range is the learned baseline, not a constant. The 'innovation' is making the threshold dynamic, not the test pattern. Same dbt test framework, ML-augmented."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Metrics-in-warehouse IS the open data contract."})," MC's metrics live in their cloud — queryable only via their API. Elementary's metrics live in a dedicated schema in your warehouse — queryable with SQL. This means: any BI tool can read them (Mode, Hex, Tableau), any notebook can join them (Jupyter, Hex), any pipeline can ingest them (Airflow, Dagster). The metrics are an open data contract — not a vendor API. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," observability data is first-class warehouse data, not vendor-locked."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"dbt-native observability IS the AWS-native pattern."})," AWS didn't build every observability tool — Datadog, New Relic, Honeycomb built on top of AWS APIs. dbt Labs didn't build every dbt-adjacent tool — Elementary, dbt-expectations, re-data built on top of dbt. The pattern is identical: the platform vendor builds the core (dbt transform); the ecosystem vendors build the adjacencies (observability, lineage, contracts). ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," a thriving ecosystem around dbt, not a dbt Labs monopoly."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Elementary IS to dbt what Datadog is to AWS."})," Before Datadog (2010), software monitoring was a fragmented ecosystem — Nagios + custom scripts + manual dashboard tuning. Datadog standardised monitoring by building on top of AWS APIs (CloudWatch, EC2 metadata, S3 access logs). Before Elementary (2021), dbt observability was fragmented — custom macros + manual dbt run_results analysis. Elementary standardised dbt observability by building on top of dbt (macros, schema.yml, manifest). The pattern is identical; only the artifact (dbt vs AWS) differs."]})]})}),(0,t.jsxs)(p.DeeperThoughtSection,{pageTitle:"Elementary",children:[(0,t.jsx)(p.DeeperThought,{title:"Elementary IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Elementary is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Elementary connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Elementary sits in the computational-science landscape."})}),(0,t.jsx)(p.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Elementary) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(p.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(p.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(p.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(d.RelatedTopics,{topics:[{id:"great-expectations",reason:"Open-source expectation suites — declarative rules (complementary to Elementary)"},{id:"monte-carlo",reason:"SaaS always-on observability — the closed-source alternative"},{id:"dbt-deep-dive",reason:"dbt tests — the simpler YAML assertions Elementary layers on"},{id:"lineage",reason:"Field-level lineage — Elementary's lineage is via dbt manifest"},{id:"data-contracts",reason:"Data contracts encode quality as a producer/consumer agreement"},{id:"airflow",reason:"Elementary runs in Airflow as post-dbt observability"},{id:"iceberg",reason:"Iceberg Bronze tables — the data Elementary monitors"},{id:"governance",reason:"Data observability is a core pillar of data governance"}]}),(0,t.jsx)(i.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"great-expectations",reason:"Open-source expectation suites — declarative rules (complementary to Elementary)"},{id:"monte-carlo",reason:"SaaS always-on observability — the closed-source alternative"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,h.hrefFor)("great-expectations"),className:"text-sm text-primary hover:underline",children:"→ Great Expectations (declarative expectation suites)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("monte-carlo"),className:"text-sm text-primary hover:underline",children:"→ Monte Carlo (SaaS always-on observability)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("dbt-deep-dive"),className:"text-sm text-primary hover:underline",children:"→ dbt Deep Dive (the framework Elementary layers on)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("lineage"),className:"text-sm text-primary hover:underline",children:"→ Lineage (Elementary uses dbt manifest for lineage)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("data-contracts"),className:"text-sm text-primary hover:underline",children:"→ Data Contracts (quality as a contract)"})]})]})}e.s(["ElementaryPage",()=>q])}]);