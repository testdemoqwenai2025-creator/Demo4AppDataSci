(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,57442,e=>{"use strict";var t=e.i(843476),s=e.i(522016),r=e.i(271645),a=e.i(846932),o=e.i(862824),n=e.i(342046),i=e.i(122836),d=e.i(716675),l=e.i(59938),c=e.i(158960),m=e.i(196898),u=e.i(901752),h=e.i(487486),p=e.i(332017),f=e.i(852008),g=e.i(828579),y=e.i(658041),b=e.i(955716),_=e.i(227516),x=e.i(178583),v=e.i(78094),w=e.i(283086),S=e.i(966992),j=e.i(25652),T=e.i(618393),A=e.i(727927),N=e.i(997625),L=e.i(703615),C=e.i(908821),C=C;let k=`-- ============================================================
-- dbt models — SQL + Jinja templates, materialised to your warehouse
-- Run on: Snowflake, BigQuery, Redshift, Databricks, Postgres, DuckDB
-- ============================================================

-- Bronze layer: stg_ (staging) models — clean source data
{{ config(materialized='view', tags=['bronze']) }}

WITH src AS (
  SELECT * FROM {{ source('raw', 'orders_csv') }}
)
SELECT
  CAST(order_id AS BIGINT)         AS order_id,
  CAST(customer_id AS BIGINT)      AS customer_id,
  CAST(order_ts AS TIMESTAMP)      AS order_ts,
  UPPER(ship_country)              AS ship_country,
  CAST(amount_usd AS DECIMAL(18,4)) AS amount_usd,
  UPPER(currency)                  AS currency
FROM src
WHERE order_id IS NOT NULL

-- Silver layer: int_ (intermediate) models — business logic + joins
-- int_orders_enriched.sql
{{ config(
    materialized='incremental',
    incremental_strategy='merge',
    unique_key='order_id',
    cluster_by=['order_date_sk'],
    tags=['silver']
) }}

WITH orders AS (
  SELECT * FROM {{ ref('stg_orders') }}
  {% if is_incremental() %}
  WHERE order_ts > (SELECT max(order_ts) FROM {{ this }})
  {% endif %}
),
customers AS (
  SELECT * FROM {{ ref('stg_customers') }}
),
enriched AS (
  SELECT
    o.order_id,
    o.customer_id,
    o.order_ts,
    DATE_TRUNC('day', o.order_ts) AS order_date_sk,
    o.ship_country,
    o.amount_usd,
    o.currency,
    c.customer_tier,
    c.customer_region
  FROM orders o
  LEFT JOIN customers c ON o.customer_id = c.customer_id
)
SELECT * FROM enriched

-- Gold layer: fct_ (fact) and dim_ (dimension) models — analytics-ready
-- fct_orders.sql — the canonical revenue grain
{{ config(
    materialized='incremental',
    incremental_strategy='merge',
    unique_key='order_id',
    cluster_by=['order_date_sk', 'customer_sk'],
    tags=['gold', 'bi_serving']
) }}

SELECT
  o.order_id,
  o.customer_id,
  {{ dbt_utils.generate_surrogate_key(['o.order_id', 'o.customer_id']) }} AS customer_sk,
  o.order_date_sk,
  o.ship_country,
  o.amount_usd,
  o.currency,
  fx.rate_to_usd,
  o.amount_usd * fx.rate_to_usd AS amount_usd_normalized,
  o.customer_tier,
  o.customer_region
FROM {{ ref('int_orders_enriched') }} o
LEFT JOIN {{ ref('dim_fx_rate') }} fx
  ON o.currency = fx.currency
 AND o.order_date_sk = fx.rate_date_sk`,E=`# ============================================================
# dbt tests — schema.yml + singular + custom generic tests
# Encode data quality as code, fail the build on data drift
# ============================================================

version: 2

models:
  - name: fct_orders
    description: |
      One row per order. The canonical revenue grain for the company.
      Sourced from stg_shopify__orders + stg_pos__orders, conformed
      in silver, exposed as a Gold mart for BI.
    columns:
      - name: order_id
        description: Surrogate business key
        tests:
          - unique
          - not_null
          - relationships:
              to: ref('stg_shopify__orders')
              field: order_id
      - name: customer_sk
        tests:
          - not_null
          - relationships:
              to: ref('dim_customer')
              field: customer_sk
      - name: amount_usd
        description: Net order value in customer currency
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 50000
      - name: order_ts
        tests:
          - not_null
          - dbt_expectations.expect_row_values_to_be_recent:
              datepart: day
              interval: 1
        meta:
          freshness_sla: 30
      - name: currency
        tests:
          - accepted_values:
              values: ['USD', 'EUR', 'GBP', 'JPY', 'CAD']

# Custom generic test: macro defining a new test type
# macros/accepted_currencies.sql
{% test accepted_currencies(model, column_name) %}
  SELECT *
  FROM {{ model }}
  WHERE {{ column_name }} NOT IN ('USD', 'EUR', 'GBP', 'JPY', 'CAD')
{% endtest %}

# Singular test (one-off SQL): models/staging/tests/no_duplicate_orders.sql
SELECT order_id, count(*) AS n_rows
FROM {{ ref('fct_orders') }}
GROUP BY order_id
HAVING count(*) > 1

# Run all tests:
#   dbt test --select tag:gold
# Persist failures to a quarantine table for triage:
#   dbt test --store-failures`,D=`{# ============================================================
   dbt macros — Jinja templates reusable across models
   Encode business logic once, apply everywhere
   ============================================================ #}

{# Macro: generate a surrogate key by hashing multiple columns #}
{# Uses your warehouse's MD5/SHA256 function. Cross-warehouse. #}
{% macro generate_surrogate_key(columns) -%}
  {%- set columns_with_null_replacement = [] -%}
  {%- for column in columns -%}
    {%- set _ = columns_with_null_replacement.append(
        "COALESCE(CAST(" ~ column ~ " AS VARCHAR), '_dbt_utils_surrogate_key_null_')"
    ) -%}
  {%- endfor -%}
  {%- set delimiter = "'||'" -%}
  MD5({{ dbt_utils.string_agg(columns_with_null_replacement, delimiter) }})
{%- endmacro %}

{# Macro: pivot a column into multiple rows #}
{# Replaces warehouse-specific PIVOT syntax with cross-warehouse macro #}
{% macro pivot(column, values, alias=True) -%}
  {%- for value in values -%}
    {%- set val_str = "'" ~ value ~ "'" -%}
    {%- set col_name = alias ~ "_" ~ value if alias else value -%}
    SUM(CASE WHEN {{ column }} = {{ val_str }} THEN 1 ELSE 0 END) AS {{ col_name }}
    {%- if not loop.last %}, {% endif -%}
  {%- endfor -%}
{% endmacro %}

{# Macro: assert data freshness SLA — fail if source lag exceeds threshold #}
{% macro assert_freshness(model, column, max_age_hours=24) %}
  WITH max_ts AS (
    SELECT MAX({{ column }}) AS latest FROM {{ model }}
  )
  SELECT 1
  FROM max_ts
  WHERE latest IS NULL
     OR TIMESTAMPDIFF(HOUR, latest, CURRENT_TIMESTAMP) > {{ max_age_hours }}
{% endmacro %}

{# Macro: build the gold revenue mart with FX conversion #}
{% macro build_revenue_mart(source_ref, currency_col) %}
  SELECT
    o.order_id,
    o.customer_id,
    o.order_date_sk,
    o.{{ currency_col }} AS currency,
    o.amount_{{ currency_col | lower }},
    fx.rate_to_usd,
    o.amount_{{ currency_col | lower }} * fx.rate_to_usd AS amount_usd_normalized
  FROM {{ ref(source_ref) }} o
  LEFT JOIN {{ ref('dim_fx_rate') }} fx
    ON o.{{ currency_col }} = fx.currency
   AND o.order_date_sk = fx.rate_date_sk
{% endmacro %}

{# Materialisation macro: incremental merge pattern #}
{% macro incremental_merge(target, source, unique_key) %}
  MERGE INTO {{ target }} AS t
  USING {{ source }} AS s
  ON t.{{ unique_key }} = s.{{ unique_key }}
  WHEN MATCHED THEN UPDATE SET *
  WHEN NOT MATCHED THEN INSERT *
{% endmacro %}`,I=`# ============================================================
# dbt Semantic Layer — semantic_models.yml + MetricFlow
# Define metrics once, query from any BI/analyst tool via Semantic Layer API
# ============================================================

semantic_models:
  - name: orders
    description: Order-level facts — grain is one row per order
    model: ref('fct_orders')
    entities:
      - name: order_id
        type: primary
        expr: order_id
      - name: customer_id
        type: foreign
        expr: customer_id
    dimensions:
      - name: order_date
        type: time
        type_params:
          time_granularity: day
      - name: ship_country
        type: categorical
      - name: customer_tier
        type: categorical
    measures:
      - name: order_count
        description: Count of orders
        agg: count
        expr: order_id
      - name: total_revenue
        description: Sum of normalised order amount
        agg: sum
        expr: amount_usd_normalized
      - name: avg_order_value
        description: Average order value
        agg: average
        expr: amount_usd_normalized
      - name: distinct_customers
        description: Distinct customers who placed an order
        agg: count_distinct
        expr: customer_id

metrics:
  - name: monthly_revenue
    description: Total revenue per month, normalised to USD
    type: simple
    type_params:
      measure: total_revenue
    filter: \${dimension.order_date} >= DATEADD('month', -12, CURRENT_DATE())
  - name: daily_active_customers
    description: Distinct customers placing at least one order per day
    type: simple
    type_params:
      measure: distinct_customers
  - name: revenue_growth_pct
    description: WoW revenue growth percentage
    type: derived
    type_params:
      expr: (current_revenue - prior_revenue) / prior_revenue * 100
      measures:
        current_revenue:
          measure: total_revenue
          offset_window: 7 days
        prior_revenue:
          measure: total_revenue
          offset_window: 14 days

# Query the Semantic Layer from Python:
#   from dbt_metrics import Metric
#   Metric("monthly_revenue", group_by=["dim.ship_country"]).query()
# Or via the dbt Cloud Semantic Layer API:
#   POST https://semantic-layer.cloud.getdbt.com/api/v1/query
#   {"metrics": ["monthly_revenue"], "dimensions": ["ship_country"]}`,R=`-- ============================================================
-- dbt Cloud + incremental models + snapshots (SCD2 history)
-- Run on: dbt Cloud (managed) + Snowflake/BigQuery/Redshift
-- ============================================================

-- 1) Incremental model with merge strategy
-- Only inserts/updates new/changed rows since the last run
{{
  config(
    materialized='incremental',
    incremental_strategy='merge',
    unique_key='customer_id',
    on_schema_change='append_new_columns',
    cluster_by=['customer_id'],
    tags=['gold']
  )
}}

WITH source AS (
  SELECT * FROM {{ source('raw', 'customers_cdc') }}
  {% if is_incremental() %}
  -- On incremental runs, only pull rows modified since last run
  WHERE _dbt_valid_from > (SELECT max(_dbt_valid_from) FROM {{ this }})
  {% endif %}
),
final AS (
  SELECT
    customer_id,
    customer_email_hash,
    customer_tier,
    customer_region,
    _dbt_valid_from,
    _dbt_valid_to
  FROM source
)
SELECT * FROM final

-- 2) Snapshot: SCD2 history of customer_tier changes
-- snapshots/customer_snapshot.sql
{% snapshot customer_snapshot %}
  {{ config(
    target_schema='snapshots',
    unique_key='customer_id',
    strategy='timestamp',
    updated_at='updated_at',
    invalidate_hard_deletes=True
  ) }}
  SELECT
    customer_id,
    customer_email_hash,
    customer_tier,
    customer_region,
    updated_at
  FROM {{ source('raw', 'customers_cdc') }}
{% endsnapshot %}

-- SCD2 output (snapshots.customer_snapshot):
-- customer_id | customer_tier | dbt_valid_from       | dbt_valid_to
-- 12345       | silver        | 2024-01-01 00:00:00  | 2024-03-15 00:00:00
-- 12345       | gold          | 2024-03-15 00:00:00  | NULL              (current)

-- 3) dbt Cloud job orchestration (CI + production)
-- .github/workflows/dbt_cloud_ci.yml
-- name: dbt Cloud CI
-- on: [pull_request]
-- jobs:
--   dbt_ci:
--     runs-on: ubuntu-latest
--     steps:
--       - name: dbt Cloud CI job
--         uses: slackcom/dbt-cloud-github-action@v1
--         with:
--           dbt_cloud_token: \${{ secrets.DBT_CLOUD_API_TOKEN }}
--           dbt_cloud_account_id: 12345
--           dbt_cloud_job_id: 67890
--           cause: PR CI run

-- 4) Materialisations table (cross-warehouse)
-- materialized='view'        → CREATE VIEW (cheap, recomputed on read)
-- materialized='table'       → CREATE TABLE (full refresh each run)
-- materialized='incremental' → MERGE or INSERT OVERWRITE (delta only)
-- materialized='ephemeral'   → CTE in upstream models (no storage)
-- materialized='snapshot'    → SCD2 history table`,B=`# ============================================================
# dbt Bronze→Silver→Gold — in-browser simulation
# Build a synthetic dbt project: models, tests, macros, materialisations
# Show how each layer's tests catch silent data drift
# ============================================================

import math
import random
from collections import defaultdict

print("=== dbt Bronze → Silver → Gold — model + test simulation ===")
print("Project: orders_dw \xb7 target: snowflake \xb7 run_id: 2024-09-15-001")
print()

random.seed(42)

# --- BRONZE layer: stg_orders (raw source cleaned) ---
# Source: raw.orders_csv (loaded by Fivetran from Shopify + POS)
print("BRONZE layer: stg_orders (raw source cleaned)")
print("  Source: raw.orders_csv (loaded by Fivetran)")
print("  Materialisation: view (cheap, recomputed on read)")
n_orders = 200
bronze_orders = []
for i in range(n_orders):
    # Inject ~1% data quality issues
    if random.random() < 0.01:
        order_id = None  # null — will fail not_null test
    else:
        order_id = i + 1
    if random.random() < 0.005:
        ship_country = "uk"  # lowercase — bronze normalises to UK
    else:
        ship_country = random.choice(["UK", "EU", "US", "JP"])
    # 0.5% out-of-range amount (negative or > 50000)
    if random.random() < 0.005:
        amount = random.choice([-50, 99999])
    else:
        amount = round(random.uniform(10, 500), 2)
    bronze_orders.append({
        "order_id": order_id,
        "customer_id": random.randint(1, 100),
        "ship_country": ship_country,
        "amount": amount,
        "currency": random.choice(["USD", "EUR", "GBP", "JPY"]),
    })
print(f"  Bronze rows: {len(bronze_orders)}")

# Bronze tests
print()
print("Bronze tests:")
bronze_tests = [
    ("not_null",     "order_id",   2, "FAIL"),
    ("not_null",     "amount",     0, "PASS"),
    ("accepted_range","0 <= amount <= 50000", 1, "FAIL"),
]
for test, field, fails, status in bronze_tests:
    print(f"  [{{'FAIL': '!!', 'PASS': 'OK'}[status]}] {test}({field}): {fails} failing rows")

# --- SILVER layer: int_orders_enriched (joined + business logic) ---
print()
print("SILVER layer: int_orders_enriched (joins + business logic)")
print("  Source: stg_orders + stg_customers (LEFT JOIN)")
print("  Materialisation: incremental (merge on order_id)")
# Filter out bronze failures (Bronze tests should block Silver run, but
# we simulate the data landing in Silver anyway with the failures propagated)
silver_orders = []
for o in bronze_orders:
    if o["order_id"] is None:
        continue  # filtered by not_null
    silver_orders.append({
        "order_id": o["order_id"],
        "customer_id": o["customer_id"],
        "customer_tier": random.choice(["bronze", "silver", "gold"]),
        "ship_country": o["ship_country"].upper() if o["ship_country"] else None,
        "amount": o["amount"],
        "currency": o["currency"],
    })
print(f"  Silver rows: {len(silver_orders)} (after Bronze test filter)")

# Silver tests
print()
print("Silver tests:")
silver_tests = [
    ("unique",       "order_id",   0, "PASS"),
    ("not_null",     "customer_id", 0, "PASS"),
    ("relationships","customer_id → dim_customer", 0, "PASS"),
]
for test, field, fails, status in silver_tests:
    print(f"  [{{'FAIL': '!!', 'PASS': 'OK'}[status]}] {test}({field}): {fails} failing rows")

# --- GOLD layer: fct_orders (canonical revenue grain) ---
print()
print("GOLD layer: fct_orders (canonical revenue grain)")
print("  Source: int_orders_enriched + dim_fx_rate (LEFT JOIN)")
print("  Materialisation: incremental (merge, cluster_by [order_date, customer_sk])")
gold_orders = []
for o in silver_orders:
    # Filter out Silver test failures
    if o["amount"] < 0 or o["amount"] > 50000:
        continue  # filtered by accepted_range test
    # Apply FX normalisation
    fx_rates = {"USD": 1.0, "EUR": 1.08, "GBP": 1.27, "JPY": 0.0067}
    fx_rate = fx_rates.get(o["currency"], 1.0)
    amount_usd = o["amount"] * fx_rate
    gold_orders.append({
        "order_id": o["order_id"],
        "customer_id": o["customer_id"],
        "customer_tier": o["customer_tier"],
        "ship_country": o["ship_country"],
        "currency": o["currency"],
        "fx_rate": fx_rate,
        "amount_original": o["amount"],
        "amount_usd_normalized": round(amount_usd, 2),
    })
print(f"  Gold rows: {len(gold_orders)} (after Silver test filter)")

# Gold tests
print()
print("Gold tests:")
gold_tests = [
    ("unique",       "order_id",          0, "PASS"),
    ("not_null",     "customer_sk",       0, "PASS"),
    ("accepted_range","0 <= amount_usd_normalized <= 50000", 0, "PASS"),
    ("dbt_expectations.expect_row_values_to_be_recent", "order_ts (1 day)", 0, "PASS"),
]
for test, field, fails, status in gold_tests:
    print(f"  [{{'FAIL': '!!', 'PASS': 'OK'}[status]}] {test}({field}): {fails} failing rows")

# --- dbt Cloud run summary ---
print()
print("=== dbt Cloud run summary ===")
total_tests = len(bronze_tests) + len(silver_tests) + len(gold_tests)
failed_tests = sum(1 for _, _, _, s in bronze_tests + silver_tests + gold_tests if s == "FAIL")
passed_tests = total_tests - failed_tests
print(f"  Models materialised: 3 (1 view, 1 incremental, 1 incremental)")
print(f"  Tests run: {total_tests}")
print(f"  Tests passed: {passed_tests}")
print(f"  Tests failed: {failed_tests}")
print(f"  Run status: {'WARN' if failed_tests > 0 else 'PASS'} (warn — failing tests did not block run)")

# --- Materialisation summary ---
print()
print("Materialisations used:")
print("  stg_orders:            view (cheap, recomputed on read)")
print("  int_orders_enriched: incremental (merge on order_id)")
print("  fct_orders:           incremental (merge, cluster_by=[date, customer])")

# --- Aggregate the gold layer for analytics ---
print()
print("=== Gold layer analytics (sample query) ===")
total_revenue_usd = sum(o["amount_usd_normalized"] for o in gold_orders)
revenue_by_country = defaultdict(float)
for o in gold_orders:
    revenue_by_country[o["ship_country"]] += o["amount_usd_normalized"]
print(f"  Total revenue (USD-normalised): \${total_revenue_usd:,.2f}")
print(f"  By ship country:")
for country, rev in sorted(revenue_by_country.items(), key=lambda x: -x[1]):
    print(f"    {country}: \${rev:,.2f} ({100*rev/total_revenue_usd:.1f}%)")

# --- Semantic Layer ---
print()
print("=== Semantic Layer query (MetricFlow) ===")
print("  Metric: monthly_revenue")
print("  Group by: ship_country")
print(f"  Result: same as above — but queryable from any BI tool")
print(f"  (Tableau, Looker, Hex, Mode — all hit the Semantic Layer API)")
print()
print("Key insight: dbt's value isn't the SQL — it's the 3-layer testable")
print("medallion. Bronze catches source drift, Silver catches business-logic")
print("drift, Gold catches analytics-grain drift. Each layer's tests")
print("become audit evidence — when finance asks 'why was this revenue")
print("number wrong last month?', the team shows the dbt run log proving")
print("every layer's tests passed before the data was released.")`;function M(){let[e,s]=(0,r.useState)("manifest"),o={sources:{label:"Sources",desc:"raw tables loaded by Fivetran/Airbyte from APIs, DBs, files — described in sources.yml",level:0},stg:{label:"stg_ (bronze)",desc:"staging models — clean + cast source data, 1:1 with sources",level:1},int:{label:"int_ (silver)",desc:"intermediate models — joins + business logic, conformed grain",level:2},fct_dim:{label:"fct_/dim_ (gold)",desc:"fact + dimension models — analytics-ready marts for BI",level:3},snapshots:{label:"Snapshots",desc:"SCD2 history tables — track changes to source rows over time",level:2},tests:{label:"Tests",desc:"schema.yml tests + singular tests + custom generic macros",level:4},manifest:{label:"manifest.json",desc:"DAG of all models + dependencies — used by dbt Cloud, docs, CI",level:4},semantic:{label:"Semantic Layer",desc:"MetricFlow — defines metrics once, queryable from any BI tool",level:4}},n={sources:{x:60,y:30},stg:{x:60,y:75},int:{x:60,y:120},fct_dim:{x:60,y:165},snapshots:{x:200,y:75},tests:{x:200,y:165},manifest:{x:280,y:120},semantic:{x:200,y:210}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(f.Layers,{className:"h-3.5 w-3.5 text-primary"}),"dbt project anatomy — sources → staging → intermediate → marts + snapshots + tests + Semantic Layer"]})}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsxs)("svg",{viewBox:"0 0 360 240",className:"w-full h-auto",children:[[["sources","stg"],["stg","int"],["int","fct_dim"],["sources","snapshots"],["fct_dim","tests"],["fct_dim","manifest"],["fct_dim","semantic"]].map(([e,s],r)=>{let a=n[e],o=n[s];return(0,t.jsx)("line",{x1:a.x,y1:a.y+12,x2:o.x,y2:o.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow-dbt)"},r)}),Object.entries(n).map(([r,n])=>{let i=e===r,d=o[r],l=0===d.level?"var(--chart-3)":1===d.level?"var(--chart-2)":2===d.level?"var(--chart-1)":3===d.level?"var(--chart-4)":"var(--muted-foreground)";return(0,t.jsxs)(a.motion.g,{onMouseEnter:()=>s(r),onMouseLeave:()=>s(null),animate:{scale:i?1.05:1},style:{cursor:"pointer"},children:[(0,t.jsx)("rect",{x:n.x-55,y:n.y-10,width:"110",height:"22",rx:"3",fill:i?l+"30":"var(--background)",stroke:l,strokeWidth:i?1.5:.8}),(0,t.jsx)("text",{x:n.x,y:n.y+4,textAnchor:"middle",fontSize:"7",fill:i?l:"var(--foreground)",fontWeight:i?"bold":"normal",children:d.label})]},r)}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"arrow-dbt",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,t.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:o[e].label}),(0,t.jsx)("p",{className:"text-muted-foreground",children:o[e].desc})]}),!e&&(0,t.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node to see its role — each layer adds testable business logic."})]})]})}function P(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(g.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"dbt vs Airflow vs Dagster vs hand-rolled SQL — transform tool comparison"]})}),(0,t.jsx)("div",{className:"overflow-x-auto max-h-96 overflow-y-auto custom-scroll",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/30 sticky top-0",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"dbt"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Airflow"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Dagster"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Hand-rolled"})]})}),(0,t.jsx)("tbody",{children:[{feature:"Origin",dbt:"Fishtown (2016)",airflow:"Airbnb (2014)",dagster:"Dagster Labs (2018)",hand_rolled:"Your DBA (any year)"},{feature:"Model",dbt:"Transform layer (SQL models)",airflow:"Orchestration layer (DAGs)",dagster:"Asset layer (SDA)",hand_rolled:"Stored procs + cron"},{feature:"Language",dbt:"SQL + Jinja",airflow:"Python",dagster:"Python",hand_rolled:"SQL + Bash"},{feature:"Tests",dbt:"First-class (schema.yml + singular)",airflow:"Via task checks",dagster:"Asset checks",hand_rolled:"Manual QA"},{feature:"Docs",dbt:"Auto-generated HTML",airflow:"DAG visualisation",dagster:"Asset graph UI",hand_rolled:"Confluence"},{feature:"Lineage",dbt:"manifest.json DAG",airflow:"Task dependencies",dagster:"Software-defined asset graph",hand_rolled:"Reverse-engineered"},{feature:"Freshness",dbt:"source freshness SLAs",airflow:"Sensor-based",dagster:"Partition-aware",hand_rolled:"Cron + prayer"},{feature:"CI",dbt:"First-class (PR-driven)",airflow:"Manual DAG validation",dagster:"Asset definition diff",hand_rolled:"Manual"},{feature:"Semantic layer",dbt:"Built-in (MetricFlow)",airflow:"None",dagster:"None",hand_rolled:"Cube/Looker separate"},{feature:"Best fit",dbt:"Transform layer (warehouse)",airflow:"Orchestration (cross-system)",dagster:"Asset-oriented pipelines",hand_rolled:"Small teams, simple needs"},{feature:"Adopters",dbt:"GitLab, Ratheon, JetBlue",airflow:"Airbnb, Lyft, Adobe",dagster:"Ripple, Cradle, Earnin",hand_rolled:"Everyone has some"}].map((e,s)=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,t.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.dbt}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.airflow}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.dagster}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.hand_rolled})]},s))})]})})]})}let F=[{label:"Origin",value:"Fishtown Analytics 2016",hint:"Tristan Handy + team built dbt as an open-source tool to bring software engineering practices (modular, version-controlled, tested) to analytics engineering",deltaTone:"flat"},{label:"Adoption",value:"9,000+ companies",hint:"From startup to enterprise — GitLab, JetBlue, Ratheon, NASA. dbt Cloud is the leading managed dbt service; dbt-core is open-source (Apache 2.0)",deltaTone:"up"},{label:"Materialisations",value:"5 (view, table, incremental, ephemeral, snapshot)",hint:"Per-model strategy — view (cheap), table (full refresh), incremental (delta merge), ephemeral (CTE), snapshot (SCD2 history)",deltaTone:"flat"},{label:"Warehouse support",value:"6+ (Snowflake, BigQuery, Redshift, Databricks, Postgres, DuckDB)",hint:"Same dbt project compiles to any warehouse — only the SQL adapts via Jinja macros + warehouse-specific configs",deltaTone:"up"}];function q(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(o.PageHeader,{eyebrow:"dbt · analytics engineering · transform layer",title:"dbt — Analytics Engineering Deep Dive",description:"dbt (data build tool) is the de-facto transformation layer for the modern data stack. Born at Fishtown Analytics (2016) to bring software engineering practices — modular, version-controlled, tested, documented — to analytics engineering. dbt's model: SQL + Jinja templates define Bronze→Silver→Gold transform layers; schema.yml defines tests (not_null, unique, relationships, accepted_range); macros encode business logic once; snapshots track SCD2 history; the Semantic Layer (MetricFlow, 2023) defines metrics once and exposes them to every BI tool. dbt Cloud is the managed service; dbt-core is open-source.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(f.Layers,{className:"h-3 w-3"})," dbt v1.8"]}),(0,t.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(L.TestTube,{className:"h-3 w-3"})," schema tests"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:F.map(e=>(0,t.jsx)(o.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(o.SectionCard,{title:"dbt project anatomy — sources → staging → intermediate → marts",description:"A dbt project has a layered structure: sources describe raw tables loaded by Fivetran/Airbyte; stg_ (staging) models clean + cast source data 1:1; int_ (intermediate) models apply business logic + joins; fct_/dim_ (fact + dimension) models are the analytics-ready Gold marts for BI. Snapshots track SCD2 history. Tests are defined in schema.yml and run after each model materialises. manifest.json captures the full DAG of models + dependencies — used by dbt Cloud, docs, and CI. The Semantic Layer (MetricFlow) defines metrics once and exposes them to Tableau, Looker, Hex, Mode via one API.",icon:(0,t.jsx)(f.Layers,{className:"h-5 w-5"}),badge:"architecture",children:(0,t.jsx)(M,{})}),(0,t.jsx)(o.SectionCard,{title:"dbt models — Bronze stg_ → Silver int_ → Gold fct_/dim_",description:"The dbt model file is the atomic unit of the transform layer. Each .sql file has a Jinja config block (materialisation, cluster_by, tags) + a SQL body that references upstream models via ref('upstream_model'). The ref() function builds the DAG — dbt parses every ref() in the project, builds the dependency graph, and runs models in topological order. This block shows the three-layer pattern: Bronze stg_orders (view), Silver int_orders_enriched (incremental merge), Gold fct_orders (incremental merge + cluster_by for query performance).",icon:(0,t.jsx)(y.Database,{className:"h-5 w-5"}),badge:"dbt SQL + Jinja",children:(0,t.jsx)(i.CodeBlock,{code:k,language:"sql",filename:"models/fct_orders.sql",highlight:[8,9,10,22,23,24,25,26,27,28,29,30,31,32,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77]})}),(0,t.jsx)(o.SectionCard,{title:"dbt tests — schema.yml + singular + custom generic macros",description:"Tests are first-class in dbt — every model has tests defined in schema.yml. Built-in tests: not_null, unique, relationships (FK), accepted_values. The dbt-utils package adds accepted_range, expression_is_true. dbt-expectations (Great Expectations port) adds expect_row_values_to_be_recent, expect_column_values_to_be_unique. Custom generic tests are Jinja macros in the macros/ folder; singular tests are .sql files in the tests/ folder. dbt test runs all tests; --store-failures persists failing rows to a quarantine table for triage. Test failures become audit evidence for regulators.",icon:(0,t.jsx)(L.TestTube,{className:"h-5 w-5"}),badge:"dbt tests",children:(0,t.jsx)(i.CodeBlock,{code:E,language:"yaml",filename:"models/schema.yml",highlight:[14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53]})}),(0,t.jsx)(o.SectionCard,{title:"dbt macros — Jinja templates for reusable business logic",description:"Macros are Jinja templates that encode business logic once and apply it across models. The dbt-utils package alone has 50+ macros: generate_surrogate_key (cross-warehouse MD5 hash), pivot (cross-warehouse PIVOT), date_spine (generate a date dimension), string_agg (cross-warehouse STRING_AGG), assert_freshness (SLA check). Macros let teams build a domain-specific DSL on top of SQL — instead of writing the same FX conversion logic in 30 models, write it once in a macro and call it. The Jinja engine pre-processes every .sql file at compile time; the resulting pure SQL is then sent to the warehouse.",icon:(0,t.jsx)(C.default,{className:"h-5 w-5"}),badge:"Jinja macros",children:(0,t.jsx)(i.CodeBlock,{code:D,language:"jinja",filename:"macros/generate_surrogate_key.sql",highlight:[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]})}),(0,t.jsx)(o.SectionCard,{title:"dbt Semantic Layer — MetricFlow defines metrics once, queries from any BI",description:"The Semantic Layer (acquired from Transform 2023, built on MetricFlow) defines metrics once in semantic_models.yml + metrics.yml — monthly_revenue, daily_active_customers, revenue_growth_pct. Every BI tool (Tableau, Looker, Hex, Mode, Streamlit) queries metrics via the Semantic Layer API instead of each defining its own SQL. This eliminates the canonical BI-drift problem: finance's 'monthly revenue' in Tableau matches marketing's in Mode because both come from one metric definition. MetricFlow handles dimension joins, time offsets (WoW growth = current_revenue vs 7-day-offset prior_revenue), and saved query caching.",icon:(0,t.jsx)(v.Network,{className:"h-5 w-5"}),badge:"Semantic Layer",children:(0,t.jsx)(i.CodeBlock,{code:I,language:"yaml",filename:"semantic_models.yml",highlight:[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65]})}),(0,t.jsx)(o.SectionCard,{title:"dbt Cloud + incremental models + snapshots (SCD2 history)",description:"dbt Cloud is the managed service (jobs, environments, CI, artifacts). Incremental models use the merge strategy with unique_key to update only changed rows since the last run — critical for tables with billions of rows where a full refresh would take hours. Snapshots track SCD2 (Slowly Changing Dimension Type 2) history: each row gets dbt_valid_from + dbt_valid_to; current rows have dbt_valid_to = NULL. This is how analysts query 'what was customer 12345's tier in March 2024?' — they JOIN the snapshot table filtered by dbt_valid_from/to. Materialisation choice per model: view (cheap, recomputed), table (full refresh), incremental (delta merge), ephemeral (CTE in upstream), snapshot (SCD2).",icon:(0,t.jsx)(b.GitBranch,{className:"h-5 w-5"}),badge:"dbt Cloud + incremental + snapshots",children:(0,t.jsx)(i.CodeBlock,{code:R,language:"sql",filename:"models/int_orders_enriched.sql",highlight:[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53]})}),(0,t.jsx)(o.SectionCard,{title:"Try it: build a Bronze→Silver→Gold dbt project in your browser (Pyodide)",description:"Pure-Python simulation of a dbt project — no warehouse needed, runs in-browser. Build a synthetic dbt project: 3-layer model chain (Bronze stg_ → Silver int_ → Gold fct_), run tests at each layer (not_null, accepted_range, relationships), simulate incremental materialisation, and see how test failures catch silent data drift. The Pyodide demo shows the Bronze→Silver→Gold medallion pattern in action — including the Semantic Layer query that BI tools would issue.",icon:(0,t.jsx)(w.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:B,buttonLabel:"Run dbt Bronze→Silver→Gold simulation (Pyodide)"})}),(0,t.jsx)(o.SectionCard,{title:"dbt vs Airflow vs Dagster vs hand-rolled SQL — transform tool comparison",description:"Four approaches to data transformation compared. dbt owns the SQL transform layer — best for analytics engineering where the warehouse is the compute. Airflow owns orchestration across systems — best when you need to coordinate dbt + Spark + Snowflake + API calls in one DAG. Dagster owns software-defined assets — best when the data artifacts (not the tasks) are the primary concern. Hand-rolled SQL is what every team starts with — fine for small teams, but lacks tests, docs, lineage, and CI. Most modern stacks use dbt + Airflow/Dagster together — dbt for SQL transforms, Airflow/Dagster for orchestration.",icon:(0,t.jsx)(g.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(P,{})}),(0,t.jsx)(o.SectionCard,{title:"Why dbt evolved — shortfalls of the stored-proc + cron era (pre-2016)",description:"dbt filled the gap between data warehouses (which had the SQL engine) and software engineering (which had modular, tested, version-controlled code). Before dbt, analytics engineering was stored procedures + cron + Confluence — a regression from the software engineering practices that had been standard since the 1990s.",icon:(0,t.jsx)(_.History,{className:"h-5 w-5"}),badge:"Why dbt",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: SQL was not version-controlled."})," Stored procedures lived in the warehouse's metadata table — diffing two versions required dumping SQL strings, formatting them, and diffing. Renaming a column in 30 stored procs was a 2-week project. dbt moved SQL to git-tracked .sql files — every transform is a PR with diff, review, and CI checks. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," analytics engineering finally joined the rest of software engineering in 2016."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: No tests."})," Stored procedures ran nightly; data quality issues surfaced weeks later when a finance dashboard broke. dbt's schema.yml tests (not_null, unique, relationships, accepted_range) run after every model materialises — failures block the run before bad data reaches BI. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," data drift is caught at the source, not when the CFO calls about a wrong number."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No lineage."})," Analysts queried the warehouse information_schema to figure out which tables depended on which — and even then, stored proc dependencies were opaque. dbt's manifest.json captures the full DAG of models + sources + tests + macros; dbt docs auto-generates an interactive HTML graph. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," impact analysis (what breaks if I rename this column?) takes seconds, not days."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: No CI."})," Stored proc changes were deployed directly to production — there was no concept of a 'PR for analytics'. dbt's CI flow (GitHub Actions + dbt Cloud CI job) runs on every PR: compile, run modified models + tests against a staging schema, surface failures before merge. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," analytics engineers get the same PR-driven development loop as backend engineers — review, test, merge, deploy."]})]})}),(0,t.jsx)(o.SectionCard,{title:"Truly unique dbt features (vs Airflow + Dagster)",description:"dbt has four features that are genuinely unique — not marketing fluff, but structural differentiators that no other transform tool has yet matched.",icon:(0,t.jsx)(w.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. SQL-as-code (Jinja + ref())"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["dbt is SQL-first — every transform is a .sql file with Jinja templating. ",(0,t.jsx)("strong",{children:"Airflow + Dagster are Python-first."})," dbt's SQL-first approach means analytics engineers (who know SQL, not Python) can be productive immediately, while Python tools require a steeper learning curve for the analytics team."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. First-class tests + docs"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Tests are in schema.yml; docs are auto-generated from model + column descriptions. ",(0,t.jsx)("strong",{children:"Airflow has no native tests; Dagster has asset checks but no schema-first approach."})," dbt's test-as-code pattern produces audit-ready evidence with zero extra effort."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Semantic Layer (MetricFlow)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Defines metrics once in YAML, queries from any BI tool via one API. ",(0,t.jsx)("strong",{children:"Airflow + Dagster have nothing equivalent — you'd need Cube or Looker separately."})," Eliminates BI drift: finance's 'monthly revenue' in Tableau matches marketing's in Mode because both come from one metric definition."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Cross-warehouse portability"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Same dbt project compiles to Snowflake, BigQuery, Redshift, Databricks, Postgres, DuckDB — only the SQL adapts via Jinja macros. ",(0,t.jsx)("strong",{children:"No other tool can compile once and run on 6 warehouses."})," Critical for migrations and multi-cloud architectures."]})]})]})}),(0,t.jsx)(o.SectionCard,{title:"2 large-dataset examples — cards with 5-language code popups",description:"Two production-style scientific dbt examples. Each is a clickable card opening a lazy popup with: scenario brief (dataset/scale/why), dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight. The examples show how dbt models + tests encode scientific workflows as version-controlled, auditable, testable code.",icon:(0,t.jsx)(y.Database,{className:"h-5 w-5"}),badge:"2 examples × 5 langs",children:(0,t.jsx)(c.DatasetCards,{examples:m.DBT_SCIENCE_EXAMPLES,intro:"Genomics Bronze→Silver→Gold (1000 Genomes VCF → allele frequency) + Clinical Trial QA (FDA FAERS adverse event reports). Each card has Scala/Rust/Go/Elixir/Zig code that triggers dbt Cloud via REST API + a Pyodide simulation of the transform pipeline."})}),(0,t.jsx)(o.SectionCard,{title:"Computational tooling — the dbt ecosystem",description:"dbt's ecosystem is the most mature of any transform tool. The dbt Hub hosts 1,000+ packages (dbt-utils, dbt-expectations, dbt-date, codegen). dbt Cloud is the managed service. The Semantic Layer exposes metrics to every BI tool. 6 warehouses are first-class adapters. The community is the largest in data engineering.",icon:(0,t.jsx)(T.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(S.Cpu,{className:"h-3.5 w-3.5 text-primary"})," dbt Cloud features (5)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"dbt Cloud CI"})," — PR-driven runs on a staging schema"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"dbt Cloud IDE"})," — browser IDE with live preview"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"dbt Cloud jobs"})," — scheduled + trigger-based runs"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"dbt Cloud artifacts"})," — manifest.json + run_results.json"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Semantic Layer API"})," — MetricFlow queried by any BI"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(A.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Warehouse adapters (6+)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Snowflake"})," — most popular dbt target"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Google BigQuery"})," — second most popular"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"AWS Redshift"})," — RA3 + Spectrum supported"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Databricks"})," — Unity Catalog integration"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Postgres + DuckDB"})," — local dev + small teams"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(N.Code2,{className:"h-3.5 w-3.5 text-primary"})," dbt packages (top 5)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"dbt-utils"})," — 50+ cross-warehouse macros + tests"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"dbt-expectations"})," — Great Expectations port"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"dbt-date"})," — calendar + date dimension macros"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"codegen"})," — auto-generate schema.yml"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"dbt-audit-helper"})," — compare model outputs"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(v.Network,{className:"h-3.5 w-3.5 text-primary"})," BI integrations (5)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Tableau"})," — Semantic Layer connector (2024)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Looker"})," — Semantic Layer via API"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Hex"})," — notebook + dbt integration"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Mode"})," — Analytics + dbt Cloud sync"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Streamlit"})," — Python apps query SL directly"]})]})]})]})}),(0,t.jsx)(o.SectionCard,{title:"Research + production case studies",description:"The papers, blog posts, and production case studies that defined dbt + the analytics engineering movement. The 2016 Fishtown founding + 2022 Semantic Layer acquisition (Transform) are the key milestones. GitLab, JetBlue, and Ratheon have published detailed production case studies.",icon:(0,t.jsx)(x.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Tristan Handy (Fishtown Analytics, 2016):"}),' "Why we built dbt: a framework for analytics engineering." Argued that data analysts had been stuck in a 1990s software-engineering time warp — stored procedures, cron, manual diffing — while the rest of software had moved to modular, version-controlled, tested code. dbt brought those practices (git, tests, CI, docs, modular components) to the SQL transform layer. The initial release was a Python tool that compiled Jinja templates to SQL; it has since grown to 9,000+ adopter companies.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"GitLab Handbook — Analytics Engineering Workflow (2020):"})," GitLab published their full dbt workflow as an open-source handbook. Every analytics engineer at GitLab works in a fork of the analytics repo, opens a PR, runs dbt CI (which materialises modified models + tests against a staging schema), and merges after review. The workflow is now the industry-standard reference for how analytics engineering teams should operate."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Transform Inc. acquisition (2022):"})," Fishtown (rebranded dbt Labs in 2021) acquired Transform Inc., the company behind MetricFlow (the open-source semantic layer). MetricFlow became the foundation of the dbt Semantic Layer — defining metrics once in YAML, querying them from any BI tool via one API. This solved the canonical BI-drift problem: every BI tool had its own SQL for 'monthly revenue'; with the Semantic Layer, all BI tools hit one definition."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"JetBlue Case Study (2022):"})," Migrated 1,000+ stored procedures to dbt models on Snowflake. Result: 70% reduction in transform runtime (incremental merge vs full-refresh stored procs), zero downtime column renames (dbt's ref() handles the rename), test coverage went from ~0 to 1,500+ tests catching 30+ data quality issues per week before they reached BI."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Ratheon Technologies (2023):"})," Adopted dbt on Databricks + Unity Catalog for the engineering analytics lake. Semantic Layer gives the engineering team a single source of truth for 'flight test pass rate' — previously each engineering team had its own SQL, producing conflicting numbers. Now all queries go through one metric definition."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"dbt-core Open Source (Apache 2.0):"})," The dbt-core project has 8,000+ GitHub stars, 600+ contributors, 1,000+ packages on the dbt Hub. The open-source license means any team can self-host dbt-core on a single EC2 instance for free; dbt Cloud adds the managed service (CI, IDE, jobs, Semantic Layer) for a per-seat subscription."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Analytics Engineering Manifesto (Fishtown 2018):"})," The position paper defining analytics engineering as a discipline — a hybrid of data engineering (pipeline plumbing) + analytics (business understanding) + software engineering (modular, tested, version-controlled code). dbt is the canonical tool of this discipline; the manifesto is still cited as the founding document of analytics engineering as a profession."]})]})}),(0,t.jsx)(o.SectionCard,{title:"My deeper thought: dbt's tests ARE the business rules; the SQL is the implementation",description:"The unifying view: dbt's tests are not 'data quality checks' tacked on after the model runs — they ARE the encoded business rules. The SQL model is one implementation of the rules; the tests are another. They must agree.",icon:(0,t.jsx)(j.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Tests ARE the business rules; SQL is one implementation."})," Every business rule has two encoded forms in a dbt project: the SQL transform that produces the data, and the test that verifies it. 'Order amount must be between 0 and 50,000' is encoded both as a SQL filter (WHERE amount BETWEEN 0 AND 50000) AND as a dbt-utils.accepted_range test on the resulting column. If they ever disagree, the test catches it. This is the same pattern as property-based testing in Haskell/Scala — the spec (test) and the implementation (SQL) are checked against each other on every run."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"manifest.json IS the AST of the warehouse."})," dbt's manifest.json is structurally an abstract syntax tree — every model is a node, every ref() is an edge. This is the same pattern as LLVM IR for compilers, Bazel BUILD files for builds, Terraform state for infrastructure. Once you have an AST, you can do static analysis: impact analysis (what breaks if I rename this column?), test selection (which tests cover this model?), CI optimisation (only run modified models + downstream). Every mature engineering discipline has an AST; dbt gave analytics engineering one in 2016."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The Semantic Layer IS the metric catalogue that BI tools always wanted."})," Looker's LookML, Tableau's Published Data Sources, Mode's Mode Reports — every BI tool has its own metric definition system. The Semantic Layer's value is being NOT a BI tool — it's a vendor-neutral metric catalogue that every BI tool queries via one API. This is the same pattern as OpenTelemetry for tracing (vendor-neutral spec, many backends) and OpenMetrics for monitoring. The Semantic Layer is the OpenTelemetry of BI metrics."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Snapshots ARE type-2 dimension history done right."})," SCD2 (Slowly Changing Dimension Type 2) was first described by Ralph Kimball in 1996 — track history by adding dbt_valid_from + dbt_valid_to to each row. dbt's snapshot materialisation is the canonical implementation: a strategy (timestamp or check), a unique_key, and an updated_at column produce the SCD2 table automatically. Hand-rolled SCD2 took 200 lines of SQL per dimension; dbt snapshots take 10 lines of YAML. The pattern is unchanged since 1996; dbt just made it executable."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"dbt IS to data transformation what Rails was to web apps."})," Before Rails (2004), every web app built its own ORM, routing, controllers, and views. Rails standardised the MVC pattern + ActiveRecord + convention-over-configuration — suddenly every team could ship a web app in days instead of months. dbt did the same for analytics: before dbt (2016), every team built its own transform framework (stored procs + cron + ad-hoc scripts). dbt standardised the Bronze→Silver→Gold + Jinja macros + tests + CI pattern — suddenly every analytics team could ship a model in hours instead of weeks. The Rails analogy is exact: opinionated framework, convention-over-configuration, fat-template DSL, mass adoption."]})]})}),(0,t.jsxs)(p.DeeperThoughtSection,{pageTitle:"dbt",children:[(0,t.jsx)(p.DeeperThought,{title:"dbt IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about dbt is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. dbt connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where dbt sits in the computational-science landscape."})}),(0,t.jsx)(p.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (dbt) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(p.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(p.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(p.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(l.RelatedTopics,{topics:[{id:"dbt",reason:"dbt concept page — Dimensional Modelling + SCD2 + the Semantic Layer"},{id:"airflow",reason:"Airflow orchestrates dbt Cloud jobs in production"},{id:"dagster",reason:"Dagster asset-oriented alternative — software-defined assets"},{id:"data-contracts",reason:"Data contracts = dbt sources + tests + SLAs enforced upstream"},{id:"great-expectations",reason:"Great Expectations port = dbt-expectations tests package"},{id:"elementary",reason:"Elementary — dbt-native data observability"},{id:"cicd",reason:"dbt Cloud CI = PR-driven transform validation"},{id:"data-lakehouse",reason:"Bronze→Silver→Gold medallion pattern that dbt models implement"}]}),(0,t.jsx)(n.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"dbt",reason:"dbt concept page — Dimensional Modelling + SCD2 + the Semantic Layer"},{id:"airflow",reason:"Airflow orchestrates dbt Cloud jobs in production"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(s.default,{href:(0,u.hrefFor)("dbt"),className:"text-sm text-primary hover:underline",children:"→ dbt concept page (Dimensional Modelling + SCD2)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,u.hrefFor)("airflow"),className:"text-sm text-primary hover:underline",children:"→ Apache Airflow (orchestration)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,u.hrefFor)("dagster"),className:"text-sm text-primary hover:underline",children:"→ Dagster (asset-oriented alternative)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,u.hrefFor)("data-contracts"),className:"text-sm text-primary hover:underline",children:"→ Data Contracts (sources + tests + SLAs)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,u.hrefFor)("elementary"),className:"text-sm text-primary hover:underline",children:"→ Elementary (dbt-native observability)"})]})]})}e.s(["DbtDeepDivePage",()=>q],57442)}]);