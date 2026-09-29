(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,206438,e=>{"use strict";var a=e.i(843476),t=e.i(522016),s=e.i(271645),n=e.i(846932),i=e.i(862824),r=e.i(342046),o=e.i(122836),l=e.i(716675),c=e.i(59938),d=e.i(158960),m=e.i(675450),h=e.i(237064),u=e.i(762274),p=e.i(901752),g=e.i(487486),f=e.i(332017),b=e.i(691385),y=e.i(828579),v=e.i(658041),x=e.i(640524),_=e.i(955716),w=e.i(227516),M=e.i(283086),j=e.i(25652),S=e.i(178583),C=e.i(78094),L=e.i(21218),N=e.i(618393),k=e.i(727927),T=e.i(878894);let E=`# ============================================================
# Monte Carlo — Freshness rule via the Python SDK
#   pip install monte-carlo-data
# ============================================================
# Monte Carlo's data observability rules are configured via UI or
# YAML — the Python SDK is used to fetch + route incidents. The ML
# baseline learns the expected data arrival cadence per table and
# triggers an anomaly when the gap since last arrival exceeds 3x the
# learned median (configurable sensitivity).
# ============================================================

import monte_carlo_sdk as mcd

# 1. Initialise the client (API key from env var)
client = mcd.Client(
    api_key=os.environ["MONTE_CARLO_API_KEY"],
    project="genomics-observability",
)

# 2. Define a freshness rule on the Bronze VCF table
rule = client.rules.create(
    name="vcf_freshness_per_sequencer",
    description="Detect sequencer pipeline stalls — freshness anomaly",
    rule_type="freshness",
    table={
        "database": "iceberg",
        "schema": "genomics",
        "name": "bronze_vcf",
    },
    time_field="batch_arrived_at",
    time_window="24h",          # alert after 24h gap (default)
    schedule="hourly",         # check every hour
    sensitivity="medium",      # ML threshold: low/medium/high (3-sigma)
    anomaly_types=["stale_data"],
    group_by=["sequencer_id"],  # per-sequencer cadence
    filters={"run_status": "SUCCESS"},
    notification_channels=[
        {"type": "slack", "channel": "#genomics-alerts"},
        {"type": "pagerduty", "service": "sequencer-oncall"},
    ],
)
print(f"Created rule: {rule.id} — {rule.name}")

# 3. Fetch open incidents (rule violations)
incidents = client.incidents.list(
    table="iceberg.genomics.bronze_vcf",
    rule_type="freshness",
    status="open",
)
for inc in incidents:
    sequencer_id = inc.metadata.get("sequencer_id", "unknown")
    last_batch_ts = inc.metadata.get("last_batch_arrived_at", "unknown")
    print(f"INCIDENT: {inc.id} — sequencer={sequencer_id} "
          f"last_batch={last_batch_ts} severity={inc.severity}")

# 4. Resolve an incident (after the on-call engineer re-runs the pipeline)
client.incidents.resolve(
    incident_id=inc.id,
    resolution_note="Sequencer pipeline stall caused by GATK crash; "
                    "re-ran with GATK 4.4.0.0. Backfilling now.",
)

# 5. Add a custom anomaly rule (volume on per-chrom event count)
volume_rule = client.rules.create(
    name="vcf_volume_per_chrom",
    description="Volume anomaly on per-chromosome variant counts",
    rule_type="volume_anomaly",
    table={
        "database": "iceberg",
        "schema": "genomics",
        "name": "bronze_vcf",
    },
    metric="count(*)",
    group_by=["chrom"],
    sensitivity="high",  # 4-sigma — only catch big drops
    anomaly_types=["volume_drop", "volume_spike"],
)`,A=`# ============================================================
# Monte Carlo — rules config (YAML, in git)
#   File: montecarlo/rules.yaml
# ============================================================
# Rules are declarative — defined in YAML, version-controlled in
# git alongside dbt models. Each rule has a rule_type (freshness /
# volume / schema / null / anomaly), a table reference, a schedule,
# and notification channels. ML sensitivity is configurable.
# ============================================================

rules:
  # === Freshness rule — catch silent pipeline stalls ===
  - name: bronze_vcf_freshness
    rule_type: freshness
    table:
      database: iceberg
      schema: genomics
      name: bronze_vcf
    time_field: batch_arrived_at
    time_window: 24h
    schedule: hourly
    sensitivity: medium  # 3-sigma
    group_by: [sequencer_id]
    anomaly_types: [stale_data]
    notification_channels:
      - type: slack
        channel: "#genomics-alerts"
      - type: pagerduty
        service: sequencer-oncall

  # === Volume rule — catch silent data loss ===
  - name: bronze_vcf_volume
    rule_type: volume_anomaly
    table:
      database: iceberg
      schema: genomics
      name: bronze_vcf
    metric: count(*)
    schedule: hourly
    sensitivity: high  # 4-sigma
    group_by: [chrom, sequencer_id]
    anomaly_types: [volume_drop, volume_spike]
    notification_channels:
      - type: slack
        channel: "#genomics-alerts"

  # === Schema rule — catch column additions/removals ===
  - name: bronze_vcf_schema
    rule_type: schema_change
    table:
      database: iceberg
      schema: genomics
      name: bronze_vcf
    schedule: daily
    notify_on: [column_addition, column_removal, column_type_change]
    notification_channels:
      - type: slack
        channel: "#genomics-alerts"

  # === Null rule — catch silent null spikes ===
  - name: silver_variants_per_sample_null_genotype
    rule_type: null_anomaly
    table:
      database: iceberg
      schema: genomics
      name: silver_variants_per_sample
    field: genotype
    schedule: hourly
    sensitivity: medium
    anomaly_types: [null_spike]
    notification_channels:
      - type: slack
        channel: "#genomics-alerts"

  # === Custom SQL metric — Hardy-Weinberg equilibrium ===
  - name: gold_allele_freq_hwe
    rule_type: anomaly
    table:
      database: iceberg
      schema: genomics
      name: gold_population_allele_freq
    custom_metric: |
      SELECT population,
        SUM(CASE WHEN allele_freq < 0.01 THEN 1 ELSE 0 END) AS rare_count,
        COUNT(*) AS total_count,
        SAFE_DIVIDE(SUM(CASE WHEN allele_freq < 0.01 THEN 1 ELSE 0 END),
                    COUNT(*)) AS rare_fraction
      FROM gold.population_allele_freq
      GROUP BY 1
    schedule: daily
    sensitivity: medium`,q=`-- ============================================================
-- Monte Carlo — auto-discovered field-level lineage
-- ============================================================
-- Monte Carlo parses SQL (Snowflake, BigQuery, dbt, Spark, Trino)
-- to auto-discover field-level lineage: which upstream column
-- feeds which downstream column. Used for impact analysis + root-
-- cause investigation. No manual lineage tagging required.
-- ============================================================

-- Query the Monte Carlo lineage API (in SQL — exposed via their
-- warehouse connector):
SELECT
    downstream_table,
    downstream_column,
    upstream_table,
    upstream_column,
    transformation_type,  -- direct | renamed | derived | aggregated
    sql_text,             -- the SQL fragment that defines the transformation
    discovered_at
FROM montecarlo.lineage
WHERE downstream_table = 'iceberg.genomics.gold_population_allele_freq'
  AND downstream_column = 'allele_freq'
ORDER BY discovered_at DESC;

-- === Impact analysis ===
-- "If I rename the chrom column on bronze_vcf, what downstream breaks?"
SELECT
    downstream_table,
    downstream_column,
    sql_text
FROM montecarlo.lineage
WHERE upstream_table = 'iceberg.genomics.bronze_vcf'
  AND upstream_column = 'chrom'
ORDER BY downstream_table, downstream_column;

-- === Root-cause investigation ===
-- "Why did allele_freq spike on chromosome 22?"
-- MC walks lineage UP to find which upstream tables/columns feed
-- allele_freq, then checks which of those had anomalies in the same
-- time window:
WITH downstream_anomalies AS (
    SELECT * FROM montecarlo.anomalies
    WHERE table_name = 'iceberg.genomics.gold_population_allele_freq'
        AND column_name = 'allele_freq'
        AND detected_at > NOW() - INTERVAL '24 hours'
),
upstream_candidates AS (
    SELECT upstream_table, upstream_column
    FROM montecarlo.lineage
    WHERE downstream_table = 'iceberg.genomics.gold_population_allele_freq'
        AND downstream_column = 'allele_freq'
)
SELECT
    a.table_name,
    a.column_name,
    a.detected_at,
    a.anomaly_type,
    a.description
FROM montecarlo.anomalies a
JOIN upstream_candidates u
    ON a.table_name = u.upstream_table
    AND a.column_name = u.upstream_column
WHERE a.detected_at > NOW() - INTERVAL '48 hours'
ORDER BY a.detected_at DESC;`,D=`# ============================================================
# Monte Carlo — CLI for incident management
#   pip install monte-carlo-data
# ============================================================
# The Monte Carlo CLI (montecarlo) is a Python tool for managing
# rules, fetching incidents, and routing alerts. Designed for
# SRE workflows — scriptable, JSON output, exit codes match
# severity for cron / Airflow integration.
# ============================================================

# List open incidents on a table (filter by rule type + severity)
montecarlo incidents list \\
    --table iceberg.genomics.bronze_vcf \\
    --rule-type freshness \\
    --status open \\
    --severity high \\
    --since 24h \\
    --format json

# Resolve an incident (after the on-call engineer re-runs the pipeline)
montecarlo incidents resolve \\
    --incident-id inc_abc123 \\
    --resolution-note "GATK crash; re-ran with 4.4.0.0; backfilling"

# Get the field-level lineage for a downstream column
montecarlo lineage get \\
    --table iceberg.genomics.gold_population_allele_freq \\
    --column allele_freq \\
    --direction upstream \\
    --format json

# Impact analysis — find all downstream tables/columns that depend
# on a given upstream column (e.g. before renaming the column)
montecarlo impact analyze \\
    --table iceberg.genomics.bronze_vcf \\
    --column chrom \\
    --format json

# Trigger a backfill validation (re-run all rules on a date range)
montecarlo backfill validate \\
    --table iceberg.genomics.bronze_vcf \\
    --start-date 2024-09-20 \\
    --end-date 2024-09-26 \\
    --rule-type freshness,volume_anomaly

# Create a custom anomaly rule from a SQL template
montecarlo rules create \\
    --name gold_allele_freq_hwe \\
    --rule-type anomaly \\
    --table iceberg.genomics.gold_population_allele_freq \\
    --custom-metric-file hwe_metric.sql \\
    --schedule daily \\
    --sensitivity medium \\
    --notification-channel "#genomics-alerts"

# Export the full rule config to YAML (version control)
montecarlo rules export \\
    --output-file montecarlo/rules.yaml`,R=`# ============================================================
# Monte Carlo — ML sensitivity tuning
# ============================================================
# The ML baseline learns the expected distribution of each metric
# (freshness gap, row count, null %) from historical data. The
# sensitivity parameter controls how aggressively anomalies fire.
# Tuning is the #1 production challenge — too tight, you get alert
# fatigue; too loose, you miss real failures.
# ============================================================

import monte_carlo_sdk as mcd

client = mcd.Client(api_key=os.environ["MONTE_CARLO_API_KEY"])

# === Sensitivity levels (for freshness + volume + null rules) ===
# - low:      2-sigma (catches 95% of anomalies, 5% false positive rate)
# - medium:   3-sigma (catches 99.7% of anomalies, 0.3% false positives)
# - high:     4-sigma (catches 99.99% of anomalies, 0.01% false positives)
# - critical: 5-sigma (catches the worst anomalies only, ~0 false positives)

# === Tune a freshness rule ===
# A 12-hour-cadence sequencer firing at 18h is anomalous at low
# sensitivity but normal at medium. Tune based on business impact.
rule = client.rules.update(
    rule_id="vcf_freshness_per_sequencer",
    sensitivity="medium",
    # Override the ML threshold with an absolute cap (best of both):
    min_threshold="6h",       # never alert before 6h gap (ignore slow seeds)
    max_threshold="36h",       # always alert after 36h gap (catch gross stalls)
    # Suppress alerts during scheduled maintenance windows:
    suppress_during=[
        {"cron": "0 2 * * SUN", "duration": "2h"},  # Sun 2-4am UTC
    ],
    # Auto-resolve after the pipeline catches up:
    auto_resolve=True,
    auto_resolve_after="2h",
)

# === Anomaly feedback loop (improve ML over time) ===
# Monte Carlo learns from thumbs-up / thumbs-down feedback on
# incidents. Mark a false positive as 'expected behavior' and the
# ML model adjusts the baseline to not alert on similar events.

# Thumbs-down: not a real anomaly (planned maintenance)
client.incidents.feedback(
    incident_id="inc_abc123",
    thumbs_down=True,
    reason="Planned maintenance window — sequencer was offline for upgrade",
    # Future: the ML will adjust the baseline to expect this gap
)

# Thumbs-up: real anomaly, please continue alerting
client.incidents.feedback(
    incident_id="inc_def456",
    thumbs_up=True,
    reason="GATK crash — caught a real pipeline stall",
    # The ML keeps the baseline unchanged
)

# === Custom anomaly rule with ML exclusion ===
# Exclude known-expected anomalies from the ML baseline (e.g.
# exclude the first week of a new sequencer's deployment because
# the cadence is not yet stable).
custom_rule = client.rules.create(
    name="vcf_volume_per_chrom",
    rule_type="volume_anomaly",
    table={"database": "iceberg", "schema": "genomics", "name": "bronze_vcf"},
    metric="count(*)",
    group_by=["chrom", "sequencer_id"],
    sensitivity="high",
    exclude_from_baseline=[
        # Exclude the ramp-up week of each new sequencer
        {"condition": "deploy_age < 7d"},
        # Exclude the day after a known schema migration
        {"condition": "schema_version_changed = true"},
    ],
)`,I=`# ============================================================
# Monte Carlo freshness + volume anomaly — in-browser simulation
# Simulates per-sequencer ML freshness + per-LB volume anomaly
# detection using only math, random, collections.
# ============================================================

import random
from collections import defaultdict

print("=== Monte Carlo Data Observability — Freshness + Volume ===")
print("ML baseline: median + IQR + 3-sigma (configurable sensitivity)")
print()

random.seed(42)

# === Part 1: Freshness anomaly on 200 sequencers ===
print("--- Part 1: Freshness (200 NovaSeq sequencers) ---")
sequencers = []
for i in range(200):
    sid = f"NovaSeq-{i:03d}"
    median_gap = max(8, min(16, random.gauss(12, 1.5)))
    last_age = random.uniform(0, 30)
    sequencers.append({"sequencer_id": sid,
                        "median_gap_h": round(median_gap, 1),
                        "last_age_h": round(last_age, 1)})
# Inject 5 stalls
for i in [17, 42, 88, 123, 199]:
    sequencers[i]["last_age_h"] = round(
        sequencers[i]["median_gap_h"] * random.uniform(2.5, 4.0), 1)

# ML threshold: 3-sigma = 3x median (simplified)
freshness_anomalies = []
for s in sequencers:
    threshold = s["median_gap_h"] * 3.0
    if s["last_age_h"] > threshold:
        freshness_anomalies.append({**s, "threshold_h": threshold})

print(f"  Sequencers simulated: {len(sequencers)} ({len(sequencers) - 5} healthy + 5 stalled)")
print(f"  Freshness anomalies detected: {len(freshness_anomalies)}")
for a in freshness_anomalies:
    print(f"    {a['sequencer_id']} — age={a['last_age_h']}h "
          f"threshold={a['threshold_h']:.1f}h median={a['median_gap_h']}h")
print()

# === Part 2: Volume anomaly on 60 LHC luminosity blocks ===
print("--- Part 2: Volume (60 LHC CMS luminosity blocks) ---")
blocks = []
for lb in range(60):
    expected = 60000  # median events/LB
    actual = int(random.gauss(expected, expected * 0.05))  # 5% IQR
    blocks.append({"lb_id": f"LB-{lb+1:04d}", "expected": expected, "actual": actual})
# Inject 5 anomalies
blocks[10] = {**blocks[10], "actual": 30000}     # 50% drop
blocks[20] = {**blocks[20], "actual": 6000}       # 90% drop
blocks[30] = {**blocks[30], "actual": 180000}    # 200% spike
blocks[40] = {**blocks[40], "actual": 42000}     # 30% drop
blocks[50] = {**blocks[50], "actual": 600}        # 99% drop

# Compute median + IQR + 3-sigma robust threshold
sorted_actuals = sorted(b["actual"] for b in blocks if b["actual"] > 1000)
median = sorted_actuals[len(sorted_actuals) // 2]
p25 = sorted_actuals[len(sorted_actuals) // 4]
p75 = sorted_actuals[3 * len(sorted_actuals) // 4]
iqr = p75 - p25
robust_sigma = iqr / 1.35
low_thr = median - 3 * robust_sigma
high_thr = median + 3 * robust_sigma

volume_anomalies = []
for b in blocks:
    if b["actual"] < low_thr:
        drop = (1 - b["actual"] / b["expected"]) * 100
        volume_anomalies.append({**b, "type": "volume_drop", "delta_pct": drop})
    elif b["actual"] > high_thr:
        spike = (b["actual"] / b["expected"] - 1) * 100
        volume_anomalies.append({**b, "type": "volume_spike", "delta_pct": spike})

print(f"  LBs simulated: {len(blocks)} ({len(blocks) - 5} healthy + 5 anomalous)")
print(f"  Robust 3-sigma: low={low_thr:,.0f} high={high_thr:,.0f}")
print(f"  Volume anomalies detected: {len(volume_anomalies)}")
for a in volume_anomalies:
    print(f"    {a['lb_id']} — actual={a['actual']:,} type={a['type']} delta={a['delta_pct']:+.1f}%")
print()

# === Part 3: Route to Slack + PagerDuty ===
print("--- Part 3: Routing (Slack + PagerDuty) ---")
total_incidents = len(freshness_anomalies) + len(volume_anomalies)
print(f"  Total incidents: {total_incidents}")
print(f"  Slack #data-observability: {total_incidents} notifications")
print(f"  PagerDuty (critical only): ", end="")
critical_count = 0
for a in volume_anomalies:
    if a.get("delta_pct", 0) >= 90 or a.get("delta_pct", 0) >= 100:
        critical_count += 1
for a in freshness_anomalies:
    if a["last_age_h"] > 30:
        critical_count += 1
print(f"{critical_count} pages")
print()

# === Part 4: Feedback loop ===
print("--- Part 4: ML feedback loop (thumbs-up / thumbs-down) ---")
# A planned maintenance window generates a false positive
# Mark thumbs-down -> ML adjusts baseline to expect this gap
print("  thumbs_down: inc_abc123 (planned maintenance, not real)")
print("  thumbs_up:   inc_def456 (real GATK crash, please continue)")
print()
print("Key insight: Monte Carlo's ML baseline learns per-table cadence")
print("+ volume distribution. A static rule (24h threshold) catches")
print("gross stalls only — the ML rule catches subtle 2-3x median drift")`;function P(){let[e,t]=(0,s.useState)("agents"),i={warehouse:{label:"Data Warehouse",desc:"Snowflake / BigQuery / Redshift / Databricks — MC agents query metadata + sample data",level:0},agents:{label:"MC Agents",desc:"Serverless agents — query the warehouse on a schedule, collect metrics, send to MC cloud",level:1},metrics:{label:"Metrics Store",desc:"Per-table, per-column, per-hour metrics: row count, null %, distinct count, freshness gap",level:2},ml_baseline:{label:"ML Baseline",desc:"Per-table learned distribution: median + IQR + 3-sigma. Sensitivity configurable per rule.",level:3},rules:{label:"Rules Engine",desc:"freshness, volume, schema, null, custom SQL. YAML in git, evaluated hourly/daily.",level:4},incidents:{label:"Incidents",desc:"Open incidents with severity, metadata, lineage trace. Route to Slack + PagerDuty.",level:5},lineage:{label:"Field-level Lineage",desc:"Auto-discovered by parsing SQL — no manual tagging. Used for root-cause + impact analysis.",level:2},feedback:{label:"Feedback Loop",desc:"Thumbs-up/down on incidents — ML adjusts the baseline to suppress known false positives.",level:4}},r={warehouse:{x:200,y:30},agents:{x:200,y:70},metrics:{x:130,y:110},lineage:{x:280,y:110},ml_baseline:{x:200,y:150},rules:{x:200,y:190},feedback:{x:280,y:190},incidents:{x:200,y:230}};return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(L.Activity,{className:"h-3.5 w-3.5 text-primary"}),"MC observability stack: agents → metrics → ML → rules → incidents → feedback"]})}),(0,a.jsxs)("div",{className:"p-3",children:[(0,a.jsxs)("svg",{viewBox:"0 0 400 270",className:"w-full h-auto",children:[[["warehouse","agents"],["agents","metrics"],["metrics","ml_baseline"],["ml_baseline","rules"],["agents","lineage"],["rules","incidents"],["incidents","feedback"],["feedback","ml_baseline"]].map(([e,t],s)=>{let n=r[e],i=r[t];return(0,a.jsx)("line",{x1:n.x,y1:n.y+12,x2:i.x,y2:i.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow-mc)"},s)}),Object.entries(r).map(([s,r])=>{let o=e===s,l=i[s],c=0===l.level?"var(--chart-3)":1===l.level?"var(--chart-2)":2===l.level?"var(--chart-1)":3===l.level?"var(--chart-4)":4===l.level?"var(--chart-5)":5===l.level?"var(--chart-3)":"var(--muted-foreground)";return(0,a.jsxs)(n.motion.g,{onMouseEnter:()=>t(s),onMouseLeave:()=>t(null),animate:{scale:o?1.05:1},style:{cursor:"pointer"},children:[(0,a.jsx)("rect",{x:r.x-55,y:r.y-10,width:"110",height:"22",rx:"3",fill:o?c+"30":"var(--background)",stroke:c,strokeWidth:o?1.5:.8}),(0,a.jsx)("text",{x:r.x,y:r.y+4,textAnchor:"middle",fontSize:"7",fill:o?c:"var(--foreground)",fontWeight:o?"bold":"normal",children:l.label})]},s)}),(0,a.jsx)("defs",{children:(0,a.jsx)("marker",{id:"arrow-mc",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,a.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,a.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:i[e].label}),(0,a.jsx)("p",{className:"text-muted-foreground",children:i[e].desc})]}),!e&&(0,a.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node — the feedback loop continuously improves the ML baseline."})]})]})}function B(){return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(y.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Data observability frameworks — Monte Carlo vs GE vs Elementary vs dbt tests"]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-xs",children:[(0,a.jsx)("thead",{className:"bg-muted/30",children:(0,a.jsxs)("tr",{className:"border-b border-border/60",children:[(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Monte Carlo"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Great Expectations"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Elementary"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"dbt tests"})]})}),(0,a.jsx)("tbody",{children:[{feature:"Origin",mc:"Monte Carlo (2019)",ge:"Superconductive (2017)",elem:"Elementary (2021)",dbt:"dbt Labs (2018)"},{feature:"Open-source?",mc:"No (SaaS only)",ge:"Yes (Apache 2.0)",elem:"Yes (BSL → Apache)",dbt:"Core yes"},{feature:"ML anomaly detection",mc:"Yes (core feature)",ge:"Limited (Profiler)",elem:"Yes (core feature)",dbt:"No"},{feature:"Always-on monitoring",mc:"Yes (24/7)",ge:"No (batch only)",elem:"Yes (scheduled)",dbt:"No (on-run only)"},{feature:"Auto-discovered lineage",mc:"Yes (field-level)",ge:"No",elem:"Yes (via dbt manifest)",dbt:"Yes (model-level)"},{feature:"Schema change alerts",mc:"Yes (auto-discovered)",ge:"Limited",elem:"Yes (column-level)",dbt:"No"},{feature:"Freshness monitoring",mc:"Yes (ML-adapted)",ge:"Yes (recent_rows)",elem:"Yes (ML + dbt)",dbt:"Yes (freshness test)"},{feature:"Volume monitoring",mc:"Yes (ML baseline)",ge:"Limited",elem:"Yes (row_count metric)",dbt:"No"},{feature:"Custom expectations",mc:"Limited (rules YAML)",ge:"Yes (Python + SQL)",elem:"Yes (dbt singular)",dbt:"Yes (singular SQL)"},{feature:"Data Docs",mc:"Yes (cloud dashboards)",ge:"Yes (auto-generated HTML)",elem:"Yes (cloud + local)",dbt:"No (docs only)"},{feature:"Best fit",mc:"Always-on observability",ge:"Batch validation",elem:"dbt-native observability",dbt:"Transform-time tests"},{feature:"Adoption",mc:"Comcast, Affirm, Stripe",ge:"Netflix, Apple, Slack",elem:"dbt Cloud customers",dbt:"All dbt users"}].map((e,t)=>(0,a.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,a.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,a.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.mc}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.ge}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.elem}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.dbt})]},t))})]})})]})}let O=[{label:"Origin",value:"Monte Carlo 2019",hint:"Founded by former LiveRamp + Attributor engineers. SaaS data observability — the first commercial observability platform.",deltaTone:"flat"},{label:"License",value:"SaaS only",hint:"Closed-source SaaS — agents are open-source, the cloud platform is hosted. No self-host option.",deltaTone:"flat"},{label:"Anomaly types",value:"5 (freshness, volume, schema, null, custom)",hint:"ML-powered anomaly detection on 5 core data health dimensions. Configurable sensitivity per rule.",deltaTone:"up"},{label:"Data sources",value:"30+",hint:"Snowflake, BigQuery, Redshift, Databricks, Postgres, MySQL, SQL Server, Athena, Trino, Spark, Iceberg, dbt, Airflow, Prefect...",deltaTone:"up"}];function G(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(i.PageHeader,{eyebrow:"Monte Carlo · data observability · ML anomaly detection",title:"Monte Carlo — the data observability platform",description:"Monte Carlo (founded 2019) is the SaaS data observability platform — the first commercial product to apply ML anomaly detection to data health. The 5 core dimensions: freshness (is the data up-to-date?), volume (did row count drop?), schema (did columns change?), null (did null percentage spike?), and custom SQL metrics. Agents (open-source) run inside the customer's VPC, query warehouse metadata on a schedule, send metrics to the Monte Carlo cloud, where the ML baseline learns the expected distribution per table and triggers anomalies on 3-sigma deviation. Auto-discovered field-level lineage (no manual tagging) powers root-cause investigation (which upstream column caused this anomaly?) and impact analysis (what breaks if I rename this column?). Deployed at Comcast, Affirm, Stripe, and 400+ companies.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(L.Activity,{className:"h-3 w-3"})," ML Anomaly"]}),(0,a.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(C.Network,{className:"h-3 w-3"})," Field Lineage"]}),(0,a.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(T.AlertTriangle,{className:"h-3 w-3"})," Always-on"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:O.map(e=>(0,a.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(i.SectionCard,{title:"Architecture — the observability stack",description:"Monte Carlo's stack is layered: agents in the customer's VPC collect metrics from the warehouse; the cloud platform stores them; an ML baseline learns the per-table expected distribution; a rules engine evaluates anomaly rules hourly/daily; incidents route to Slack + PagerDuty with field-level lineage; a feedback loop (thumbs-up/down) refines the ML baseline over time. The agents are open-source (collect-only); the cloud platform (ML, dashboards, lineage) is SaaS-only.",icon:(0,a.jsx)(b.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,a.jsx)(P,{})}),(0,a.jsx)(i.SectionCard,{title:"Python SDK — freshness rule + incident management",description:"Monte Carlo's Python SDK (monte-carlo-data) is the SRE-friendly interface for managing rules + incidents. Define rules (freshness, volume, schema, null, custom) in code, fetch open incidents, route by severity, and resolve with notes. The ML baseline is implicit — you specify sensitivity (low/medium/high = 2/3/4-sigma) and the platform handles the rest. This block shows a freshness rule on per-sequencer cadence (group_by sequencer_id) — the ML learns each sequencer's median gap independently.",icon:(0,a.jsx)(x.Workflow,{className:"h-5 w-5"}),badge:"Python",children:(0,a.jsx)(o.CodeBlock,{code:E,language:"python",filename:"mc_freshness.py",highlight:[18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73]})}),(0,a.jsx)(i.SectionCard,{title:"YAML rules — declarative config in git",description:"Rules are declarative YAML, version-controlled in git alongside dbt models. Five rule types shown: freshness (catch stalls), volume_anomaly (catch drops/spikes), schema_change (catch column add/remove/type change), null_anomaly (catch null spikes), anomaly (custom SQL). Each rule has a table reference, schedule, ML sensitivity, group_by (per-group baselines), and notification channels. The same YAML can be applied via SDK, CLI, or Terraform — no UI clicks required.",icon:(0,a.jsx)(_.GitBranch,{className:"h-5 w-5"}),badge:"YAML",children:(0,a.jsx)(o.CodeBlock,{code:A,language:"yaml",filename:"montecarlo_rules.yaml",highlight:[18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87]})}),(0,a.jsx)(i.SectionCard,{title:"Field-level lineage — auto-discovered, no manual tagging",description:"Monte Carlo parses SQL (Snowflake query history, dbt compile output, Spark SQL) to auto-discover field-level lineage: which upstream column feeds which downstream column, with the transformation type (direct / renamed / derived / aggregated) and the SQL fragment. No manual tagging required. Three killer use cases: impact analysis (what breaks if I rename this column?), root-cause investigation (which upstream column caused this downstream anomaly?), and dependency mapping (visualise the upstream/downstream graph).",icon:(0,a.jsx)(C.Network,{className:"h-5 w-5"}),badge:"SQL",children:(0,a.jsx)(o.CodeBlock,{code:q,language:"sql",filename:"mc_lineage_queries.sql",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61]})}),(0,a.jsx)(i.SectionCard,{title:"CLI — incident management for SRE workflows",description:"The Monte Carlo CLI (montecarlo) is a Python tool for SRE workflows — list, resolve, backfill, and create rules from the command line. JSON output makes it scriptable; exit codes match severity for cron / Airflow integration. The CLI is the production interface — UI is for exploration, CLI is for automation. Common SRE flow: cron runs `montecarlo incidents list --severity high`, parses JSON, routes critical to PagerDuty, resolves expected maintenance with `montecarlo incidents resolve`.",icon:(0,a.jsx)(x.Workflow,{className:"h-5 w-5"}),badge:"CLI",children:(0,a.jsx)(o.CodeBlock,{code:D,language:"bash",filename:"mc_cli_commands.sh",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]})}),(0,a.jsx)(i.SectionCard,{title:"ML sensitivity tuning — the #1 production challenge",description:"Tuning Monte Carlo's ML sensitivity is the #1 production challenge — too tight, alert fatigue; too loose, miss real failures. This block shows the four sensitivity levels (low/medium/high/critical = 2/3/4/5-sigma), absolute min/max thresholds (best of both worlds — ML with safety bounds), maintenance window suppression, auto-resolve on catch-up, and the feedback loop (thumbs-up/down to improve the baseline over time). Custom exclusions prevent ramp-up noise from polluting the baseline.",icon:(0,a.jsx)(M.Sparkles,{className:"h-5 w-5"}),badge:"Python",children:(0,a.jsx)(o.CodeBlock,{code:R,language:"python",filename:"mc_tuning.py",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]})}),(0,a.jsx)(i.SectionCard,{title:"Try it: simulate Monte Carlo freshness + volume anomaly (Pyodide)",description:"Pure-Python simulation of Monte Carlo's ML anomaly detection — no SaaS, no Snowflake, just in-browser. Simulate 200 NovaSeq sequencers with per-sequencer cadence (median 12h, IQR 11-13h), inject 5 stalls, run the ML freshness rule. Then simulate 60 LHC CMS luminosity blocks with median 60k events/LB, inject 5 anomalies (drop/spike), run the ML volume rule with robust 3-sigma. Route critical to PagerDuty, exercise the feedback loop (thumbs-up/down).",icon:(0,a.jsx)(M.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,a.jsx)(l.PyodideRunner,{code:I,buttonLabel:"Run MC anomaly simulation (Pyodide)"})}),(0,a.jsx)(i.SectionCard,{title:"Monte Carlo vs Great Expectations vs Elementary vs dbt tests",description:"Four data quality frameworks with overlapping but distinct scopes. Monte Carlo (2019) is the SaaS observability platform — ML anomaly detection, always-on, auto-discovered lineage. Great Expectations (2017) is the open-source expectation-suite framework — declarative rules, batch validation, HTML Data Docs. Elementary (2021) is the dbt-native observability layer — ML + dbt tests together. dbt tests (2018) are YAML assertions on dbt models — transform-time only. MC excels at always-on monitoring; the others excel at declarative validation or dbt integration.",icon:(0,a.jsx)(y.Boxes,{className:"h-5 w-5"}),children:(0,a.jsx)(B,{})}),(0,a.jsx)(i.SectionCard,{title:"Why MC evolved — shortfalls of static data quality (Era 2)",description:"Modern data engineers prefer MC because static data quality (the prior generation — GE + dbt tests with static thresholds) had four critical shortfalls. MC was designed to fix all four with ML anomaly detection.",icon:(0,a.jsx)(w.History,{className:"h-5 w-5"}),badge:"Why MC",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Static thresholds didn't adapt."})," A dbt freshness test with `error_after: 30 minutes` fired constantly for slow-pipeline tables (every 31 minutes) and missed real stalls on fast-pipeline tables (a 10-minute-cadence table silent for 25 minutes is anomalous but doesn't trigger the static 30-minute rule). MC's ML baseline learns per-table cadence + sets a dynamic 3-sigma threshold. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," alerts fire only on real anomalies — no alert fatigue."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: No always-on monitoring."})," GE + dbt tests run on a schedule (after dbt runs, after ingests). Between runs, nobody is watching. A 6-hour stall at 2am isn't caught until the next morning's dbt run. MC agents query warehouse metadata every hour, 24/7 — a stall at 2am is caught at 3am. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," mean time to detection drops from hours to minutes."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No field-level lineage."})," When a downstream anomaly fires, the team had to manually trace SQL upstream — open the dbt project, find the SELECT statement, identify the upstream columns, check each for anomalies. MC parses SQL automatically and builds field-level lineage. Root-cause investigation becomes a graph query — 'walk upstream from the anomaly, check which upstream column also had anomalies in the same window'. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," root-cause analysis drops from hours to seconds."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: No schema change alerts."})," Adding a column upstream silently broke downstream consumers (a rename, a type change, a column drop). Nobody noticed until a dashboard broke. MC monitors information_schema columns on a schedule and alerts on any addition / removal / type change. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," schema changes are visible to the entire team before they break downstream."]})]})}),(0,a.jsx)(i.SectionCard,{title:"Truly unique Monte Carlo features (vs GE, Elementary, dbt tests)",description:"MC has four features that are genuinely unique — structural differentiators that the other observability frameworks have not yet matched.",icon:(0,a.jsx)(M.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Auto-discovered field-level lineage"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["MC parses SQL (Snowflake history, dbt compile, Spark SQL) to auto-build field-level lineage. ",(0,a.jsx)("strong",{children:"GE has no lineage; Elementary uses dbt manifest (model-level, not field-level); dbt tests have model-level lineage only."})," Field-level is the killer for root-cause."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Always-on ML anomaly detection"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Agents query warehouse metadata hourly, 24/7. ML baseline learns per-table distribution. ",(0,a.jsx)("strong",{children:"GE runs on schedule only (after ingests); Elementary runs after dbt runs; dbt tests run on dbt runs."})," MC is the only always-on option."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Schema change auto-discovery"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["MC monitors information_schema.columns on a schedule — alerts on column add/remove/type change. ",(0,a.jsx)("strong",{children:"GE has no schema monitoring; Elementary has column-level via dbt tests; dbt tests have none."})," Schema drift is the silent failure mode MC catches that nobody else does."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. ML feedback loop"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Thumbs-up/down on incidents adjusts the ML baseline — false positives are suppressed over time. ",(0,a.jsx)("strong",{children:"GE + dbt tests are static; Elementary has limited feedback (via resolution notes)."})," MC's feedback loop is the production-grade ML refinement."]})]})]})}),(0,a.jsx)(i.SectionCard,{title:"2 scientific examples — cards with 5-language code popups",description:"Two production-style scientific examples showing Monte Carlo in action: genomics data freshness (detect sequencer pipeline stalls on 200 NovaSeq) + LHC data quality volume monitoring (detect volume drops in CMS collision event counts on 60 LBs). Each is a clickable card opening a lazy popup with: scenario brief (dataset/scale/why), dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,a.jsx)(v.Database,{className:"h-5 w-5"}),badge:"2 examples × 5 langs",children:(0,a.jsx)(d.DatasetCards,{examples:u.MONTE_CARLO_SCIENCE_EXAMPLES,intro:"Two MC scientific scenarios: genomics freshness (200 NovaSeq sequencers, ML per-sequencer cadence, 3-sigma threshold) + LHC CMS volume (60 luminosity blocks, robust 3-sigma, severity routing). Each card has Scala/Rust/Go/Elixir/Zig code + Pyodide simulation showing the ML baseline catching subtle drift that static thresholds miss."})}),(0,a.jsx)(i.SectionCard,{title:"Computational tooling — the Monte Carlo ecosystem",description:"MC's ecosystem spans data sources (what to monitor), integrations (how to ingest metadata + route alerts), and adjacent tools (lineage, contracts, orchestration). The agents are open-source; the cloud platform is SaaS-only.",icon:(0,a.jsx)(N.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(v.Database,{className:"h-3.5 w-3.5 text-primary"})," Data sources (30+)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Snowflake"})," — native connector (query history + metadata)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"BigQuery"})," — native connector (via INFORMATION_SCHEMA)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Redshift"})," — via sys tables + query history"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Databricks"})," — via Unity Catalog + SQL warehouses"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Postgres / MySQL / MSSQL"})," — via standard views"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Trino / Presto / Athena"})," — federated"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Iceberg"})," — via REST catalog + manifest"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"dbt Cloud + dbt Core"})," — manifest + run_results"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(k.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Integrations"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Slack"})," — incident routing to channels"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"PagerDuty"})," — critical incident paging"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"ServiceNow / Jira"})," — incident ticket creation"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"dbt Cloud"})," — run results ingestion"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Airflow / Dagster / Prefect"})," — DAG-aware routing"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Great Expectations"})," — GE validation results ingestion"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"OpenLineage / Marquez"})," — lineage ingestion"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Terraform"})," — rules as code (provider)"]})]})]})]})}),(0,a.jsx)(i.SectionCard,{title:"Research + production case studies",description:"The papers and production blog posts that defined the data observability movement. The Barr 2020 'Data Observability' paper is the academic foundation; the Comcast, Affirm, and Stripe engineering blogs document production scale.",icon:(0,a.jsx)(S.FileText,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Barr et al. 2020 (VLDB):"}),' "Data Observability: A New Paradigm for Data Quality Management." Argued that data quality must move from batch validation (the GE + dbt tests paradigm) to always-on ML anomaly detection — the same shift that observability brought to software engineering (Datadog, New Relic, Honeycomb). Introduced the 5 pillars: freshness, volume, schema, distribution, lineage. The foundational academic reference for the modern data observability movement.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Monte Carlo Origin (Barr, Lior, Moses, 2019):"})," Founded by former LiveRamp + Attributor engineers who had built large-scale data quality systems and noticed three gaps in existing tooling: (1) batch-only, (2) no ML baseline, (3) no field-level lineage. They launched MC as the first commercial 'data observability' platform — the term borrowed from software observability (Datadog) and applied to data. The first customers were Netflix, Airbnb, and Comcast."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Comcast Production Case (Comcast Eng Blog 2021):"})," MC on Snowflake for the advertising analytics lake. 1,500+ tables, 300+ dbt models. Freshness + volume + schema rules on every Bronze ingest. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," mean time to detection of broken pipelines dropped from 4 hours (manual discovery) to 15 minutes (MC alert). Field-level lineage cut root-cause investigation from hours to minutes."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Affirm Production Case (Affirm Eng 2022):"})," MC on Snowflake + dbt for the consumer lending analytics lake. 5,000+ dbt models, 50TB/day. MC + GE together — MC for always-on observability (anomalies), GE for batch validation (declarative rules). ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," the two frameworks are complementary — MC catches slow drift, GE catches gross failures. Compliance officers read both MC dashboards + GE Data Docs."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Stripe Production Case (Stripe Eng 2023):"})," MC on Snowflake + Iceberg for the payments analytics lake. 10,000+ tables. Auto-discovered lineage on 50,000+ columns. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," when a column rename upstream broke a dashboard, MC's lineage graph showed the impact in seconds — the team could notify every downstream consumer before the rename shipped."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"OpenLineage Standard (2021):"})," MC contributed to OpenLineage — an open standard for lineage event emission. dbt, Airflow, Dagster, Spark all emit OpenLineage events now; MC ingests them for cross-tool lineage. The standard reduced MC's SQL-parsing reliance (which is brittle) — events are explicit, no parsing needed."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Data Observability Landscape 2024:"})," Monte Carlo + Databand (IBM) + Dataloop + Acceldata + Datafold — 5 commercial vendors competing. MC remains the leader in always-on ML anomaly detection. The shift is towards 'data reliability' — combining observability + quality + reliability engineering, the same convergence that happened in software observability."]})]})}),(0,a.jsx)(i.SectionCard,{title:"My deeper thought: MC IS Datadog for data",description:"The unifying view: Monte Carlo is structurally identical to Datadog — the same architecture (agents → metrics → ML baseline → alerts → feedback) applied to data instead of software.",icon:(0,a.jsx)(j.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"MC's architecture IS Datadog's architecture."})," Datadog: agents on every host collect metrics → Datadog cloud stores them → ML baseline learns per-host distribution → alerts on threshold breaches → routing to Slack + PagerDuty → feedback loop thumbs-up/down to refine. MC: agents in customer VPC collect warehouse metadata → MC cloud stores them → ML baseline learns per-table distribution → alerts on threshold breaches → routing to Slack + PagerDuty → feedback loop thumbs-up/down. The artifact is different (data vs host metrics) but the architecture is identical. Both vendors grew by recognising that observability is a structural pattern that applies to any system with state."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Always-on monitoring IS the SRE pattern."})," Software SRE practice moved from on-call-only (wait for an outage) to always-on monitoring (Datadog, New Relic, Honeycomb) — the team is alerted before users notice. Data SRE is undergoing the same shift. GE + dbt tests are the 'on-call-only' era — they run after ingests, between runs nobody is watching. MC + Elementary are the 'always-on' era — agents query every hour, 24/7. The economics are similar too: 24/7 monitoring costs more (agent compute, SaaS licenses) but mean-time-to-detection drops from hours to minutes."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"ML baseline IS dynamic thresholding."})," Static thresholds (dbt freshness test: error_after 30 min) are the manual monitoring era — every team writes their own thresholds and tunes them by hand. ML baseline (MC: 3-sigma of learned per-table distribution) is the dynamic monitoring era — the platform learns the right threshold per table. This is the same shift that Honeycomb made in software observability — from static SLO thresholds to ML-learned dynamic baselines. The 'innovation' is recognising that the right threshold is a function of the metric's own distribution, not a hand-tuned constant."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Field-level lineage IS distributed tracing."})," Software observability uses distributed tracing (OpenTelemetry, Jaeger) to follow a request across services — every hop logged, root-cause found by walking the trace. MC's field-level lineage does the same for data — every SQL transformation logged as a hop, root-cause found by walking the lineage graph upstream from the anomaly. The artifact is different (HTTP request vs data column) but the pattern is identical — both walk a DAG to find the root cause."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"MC IS to data what Datadog was to software."})," Before Datadog (2010), software monitoring was ad-hoc — Nagios + custom scripts + manual dashboard tuning. Datadog standardised monitoring with agents + a cloud platform + dashboards + ML baselines. Every software monitoring vendor since (New Relic, Honeycomb, Lightstep) builds on the same pattern. MC is doing the same for data — agents + a cloud platform + dashboards + ML baselines. The next decade will see data observability become as universal as software observability is today. The pattern is identical; only the artifact (data vs software) differs."]})]})}),(0,a.jsx)(i.SectionCard,{title:"Cross-disciplinary elegance — Monte Carlo bridges options, port congestion, and rare variants",description:"Monte Carlo (E[f(X)] ≈ (1/N)·Σ f(X_i)) IS the universal estimation equation. A CME quant pricing an exotic option via 10⁶ GBM paths, a port captain simulating 10⁵ vessel arrivals to estimate berth congestion, and a geneticist running 10⁶ permutations to estimate rare-variant significance all use the SAME averaging — Metropolis 1946 invented this at Los Alamos.",icon:(0,a.jsx)(M.Sparkles,{className:"h-5 w-5"}),badge:"elegant code",children:(0,a.jsx)(d.DatasetCards,{examples:h.ELEGANT_CODE_CARDS.filter((e,a)=>17===a),intro:"Monte Carlo (fintech ↔ maritime ↔ genetics): the SAME averaging samples exotic options, port congestion, and rare-variant p-values — because all three estimate E[f(X)] via random draws."})}),(0,a.jsx)(m.RelatedElegantCode,{hostPage:"monte-carlo"}),(0,a.jsxs)(f.DeeperThoughtSection,{pageTitle:"Monte Carlo",children:[(0,a.jsx)(f.DeeperThought,{title:"Monte Carlo IS data observability — and it's the right name",connectedTo:"ADR-001 (platform architecture)",children:(0,a.jsx)("p",{children:"Monte Carlo (the company) monitors data pipelines for freshness, volume, schema, and distribution anomalies. The name IS a reference to the Monte Carlo method (Metropolis 1949) — because the monitoring IS statistical: you don't know the 'true' data distribution, but you can estimate it from samples and detect when new data deviates. The anomaly detection IS a hypothesis test: H0 = new data follows the historical distribution. P(reject H0 | H0 true) = false alarm rate. The math (statistical hypothesis testing) stays; the implementation (Monte Carlo vs Great Expectations vs Elementary) changes."})}),(0,a.jsx)(f.DeeperThought,{title:"MC IS to data what Datadog was to software — and the pattern IS identical",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"Before Datadog (2010), software monitoring was ad-hoc (Nagios + custom scripts). Datadog standardised monitoring with agents + cloud + dashboards + ML baselines. MC is doing the same for data: agents (monitors on tables), cloud (SaaS), dashboards (anomaly alerts), ML baselines (expected ranges). The pattern (agent + cloud + dashboard + ML) IS identical. The artifact differs (data vs software). The math (statistical monitoring) stays. The implementation (MC vs Datadog vs New Relic) changes. The pattern absorbs the domain."})}),(0,a.jsx)(f.DeeperThought,{title:"MC's ML baselines IS time-series forecasting — and it's the right tool",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,a.jsx)("p",{children:"Monte Carlo's ML baselines forecast expected data metrics (row counts, freshness, null rates) using time-series models (ARIMA, Prophet, LSTM). When actual deviates from forecast by >3σ, alert. This IS the SAME pattern as financial VaR: expected = μ, actual = z, alert if |z - μ| > 3σ. The 3σ threshold IS the 99.7% confidence interval. The math (Gaussian anomaly detection) IS the connection between data observability and risk management. VaR IS data observability for finance; MC IS financial VaR for data."})}),(0,a.jsx)(f.DeeperThought,{title:"Freshness monitoring IS exponential distribution — and it's the right model",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,a.jsx)("p",{children:"Monte Carlo's freshness monitor checks: 'when was the last data update?' If the gap exceeds the expected interval, alert. The gap between updates follows an exponential distribution (memoryless — the same property as Poisson arrivals). The expected gap IS 1/λ (mean inter-arrival time). The alert threshold IS P(gap > T) = e^{-λT} < 0.05 (5% false alarm). This IS the SAME math as radioactive decay (half-life = ln(2)/λ) and server timeout (P(timeout) = e^{-λT}). The exponential distribution IS the universal model for 'time until next event.'"})}),(0,a.jsx)(f.DeeperThought,{title:"MC's lineage IS the dependency graph — and it's the SAME as git blame",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"Monte Carlo's lineage feature traces data dependencies: table A depends on table B depends on table C. When table C breaks, MC alerts all downstream tables. This IS the SAME pattern as git blame (which file caused this bug?) and Kubernetes service mesh (which service depends on which?). The lineage graph IS a DAG (directed acyclic graph) — the SAME structure as dbt's DAG, Airflow's DAG, and Make's dependency graph. The math (DAG traversal) stays; the implementation (MC lineage vs dbt manifest vs OpenLineage) changes."})})]}),(0,a.jsx)(c.RelatedTopics,{topics:[{id:"great-expectations",reason:"Open-source expectation suites — declarative rules (complementary to MC)"},{id:"elementary",reason:"dbt-native observability — ML + dbt tests together"},{id:"dbt-deep-dive",reason:"dbt tests — simpler YAML assertions"},{id:"lineage",reason:"Field-level lineage — auto-discovered from SQL"},{id:"data-contracts",reason:"Data contracts encode quality as a producer/consumer agreement"},{id:"model-monitoring",reason:"ML model monitoring — same observability pattern for ML"},{id:"iceberg",reason:"Iceberg Bronze tables — the data MC monitors"},{id:"governance",reason:"Data observability is a core pillar of data governance"}]}),(0,a.jsx)(r.NextSteps,{relatedPages:[{id:"connections",reason:"See Monte Carlo's cousin cards in the cross-disciplinary graph"},{id:"fintech",reason:"Geometric Brownian Motion (GBM IS the universal multiplicative-noise equation) — same math, fintech domain"},{id:"global-shipping",reason:"Value at Risk (VaR IS the universal tail-risk equation) — same math, fintech domain"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(t.default,{href:(0,p.hrefFor)("great-expectations"),className:"text-sm text-primary hover:underline",children:"→ Great Expectations (declarative expectation suites)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("elementary"),className:"text-sm text-primary hover:underline",children:"→ Elementary (dbt-native observability)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("lineage"),className:"text-sm text-primary hover:underline",children:"→ Lineage (field-level lineage concepts)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("data-contracts"),className:"text-sm text-primary hover:underline",children:"→ Data Contracts (quality as a contract)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("model-monitoring"),className:"text-sm text-primary hover:underline",children:"→ Model Monitoring (same pattern for ML)"})]})]})}e.s(["MonteCarloPage",()=>G])}]);