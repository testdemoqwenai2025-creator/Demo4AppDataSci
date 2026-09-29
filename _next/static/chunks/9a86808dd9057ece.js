(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,31119,e=>{"use strict";var t=e.i(843476),s=e.i(522016),r=e.i(271645),a=e.i(846932),o=e.i(862824),i=e.i(342046),n=e.i(921371),l=e.i(580296),d=e.i(122836),c=e.i(716675),p=e.i(59938),h=e.i(158960),u=e.i(196898),m=e.i(901752),f=e.i(487486),g=e.i(332017),w=e.i(828579),_=e.i(658041),b=e.i(640524),k=e.i(227516),x=e.i(178583),y=e.i(78094),A=e.i(283086),v=e.i(966992),j=e.i(25652),S=e.i(618393),T=e.i(727927),P=e.i(997625),D=e.i(63639),C=e.i(303497),C=C,N=e.i(437748);let G=`# ============================================================
# Apache Airflow DAG — Python decorator + Operator + Sensor
# Run on: Airflow 2.10+ with TaskFlow API (Python decorators)
# ============================================================

from airflow.decorators import dag, task
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.providers.cncf.kubernetes.operators.pod import KubernetesPodOperator
from airflow.providers.sensors.file import FileSensor
from airflow.providers.sensors.external_task import ExternalTaskSensor
from datetime import datetime, timedelta

# Default args for every task in the DAG
default_args = {
    "owner": "data-platform",
    "retries": 3,
    "retry_delay": timedelta(minutes=5),
    "email_on_failure": True,
    "email": ["data-oncall@platform.org"],
    "depends_on_past": False,
    "pool": "etl_pool",         # limit concurrency per pool
    "priority_weight": 1,
    "queue": "default",          # Celery queue name
    "sla": timedelta(hours=2),   # alert if task takes >2h
}

# TaskFlow API (Airflow 2.3+) — Python decorators, no Operator boilerplate
@dag(
    dag_id="orders_etl_pipeline",
    schedule_interval="0 2 * * *",   # daily at 02:00 UTC
    start_date=datetime(2024, 1, 1),
    catchup=False,                    # don't backfill missed runs
    max_active_runs=1,                # one run at a time (idempotency)
    max_active_tasks=16,              # limit parallel tasks
    default_args=default_args,
    tags=["etl", "orders", "production"],
    description="Daily orders ETL — extract → transform → load → test",
)
def orders_etl_pipeline():

    # Sensor 1: wait for upstream source file to arrive
    wait_for_source = FileSensor(
        task_id="wait_for_source_file",
        filepath="/data/incoming/orders_{{ ds }}.csv",
        fs_conn_id="fs_default",
        poke_interval=60,          # check every 60s
        timeout=60 * 60 * 6,       # 6-hour timeout
        mode="reschedule",         # release worker slot between pokes (smart sensor)
    )

    # Task 1 (TaskFlow): extract + validate the CSV
    @task(pool="etl_pool")
    def extract_orders(**context):
        import pandas as pd
        ds = context["ds"]
        df = pd.read_csv(f"/data/incoming/orders_{ds}.csv")
        # Push the row count to XCom for downstream tasks
        return {"rows": len(df), "first_id": df.iloc[0].order_id}

    # Task 2: KubernetesPodOperator — heavy transform on GKE
    transform = KubernetesPodOperator(
        task_id="transform_orders",
        name="transform-{{ ds }}",
        namespace="etl",
        image="ghcr.io/platform/transform:v1.2.3",
        cmds=["python", "-m", "transforms.orders"],
        arguments=["--date", "{{ ds }}", "--xcom", "{{ ti.xcom_pull(task_ids='extract_orders') }}"],
        resources={"request_cpu": "4", "request_memory": "8Gi"},
        config_file="~/.kube/config",
        is_delete_operator_pod=True,
        xcom_push=True,
        get_logs=True,
    )

    # Task 3: PythonOperator — load to Snowflake
    @task(pool="etl_pool")
    def load_to_warehouse(**context):
        from snowflake.connector import connect
        xcom_data = context["ti"].xcom_pull(task_ids="transform_orders")
        with connect(account="xy12345", user="AIRFLOW_ETL", password="...",
                     warehouse="ETL_WH", database="RAW", schema="ORDERS") as conn:
            conn.cursor().execute(f"COPY INTO orders FROM '{xcom_data['output_path']}'")
        return {"loaded_rows": xcom_data["rows"]}

    # Sensor 2: wait for dbt Cloud job to complete (ExternalTaskSensor)
    wait_for_dbt = ExternalTaskSensor(
        task_id="wait_for_dbt_run",
        external_dag_id="dbt_orders_pipeline",
        external_task_id="production_run",
        execution_delta=timedelta(hours=-1),  # match the 01:00 dbt run
        check_existence=False,
        poke_interval=60,
        mode="reschedule",
        timeout=60 * 60 * 4,
    )

    # Task 4: BashOperator — publish freshness metric
    publish_freshness = BashOperator(
        task_id="publish_freshness",
        bash_command=(
            'curl -X POST https://metrics.platform.org/api/freshness '
            '-d "{\\"dag_id\\":\\"{{ dag.dag_id }}\\",'
            '\\"run_id\\":\\"{{ run_id }}\\",'
            '\\"completed_at\\":\\"{{ ts }}\\"}"'
        ),
    )

    # DAG dependencies (>> means "after")
    wait_for_source >> extract_orders() >> transform >> load_to_warehouse() >> wait_for_dbt >> publish_freshness

# Instantiate the DAG (required for Airflow to discover it)
orders_etl_pipeline()`,O=`# ============================================================
# Airflow Operators — the unit of work in a DAG
# Each Operator defines what a task does at runtime
# ============================================================

# BashOperator — run a bash command
from airflow.operators.bash import BashOperator
sync_to_s3 = BashOperator(
    task_id="sync_to_s3",
    bash_command="aws s3 sync /data/incoming/ s3://my-bucket/raw/ --delete",
    env={"AWS_REGION": "us-east-1"},
    retries=2,
)

# PythonOperator — run a Python callable (legacy API)
from airflow.operators.python import PythonOperator
def validate_schema(**context):
    import pandas as pd
    df = pd.read_csv(context["ti"].xcom_pull(task_ids="download_csv"))
    assert not df.empty, "Empty dataframe"
    return {"rows": len(df)}

validate = PythonOperator(
    task_id="validate_schema",
    python_callable=validate_schema,
    op_kwargs={"strict": True},
)

# KubernetesPodOperator — run a task as a Kubernetes pod
# Each task gets its own pod with right-sized resources + image
from airflow.providers.cncf.kubernetes.operators.pod import KubernetesPodOperator
run_spark = KubernetesPodOperator(
    task_id="run_spark_job",
    name="spark-{{ ds }}",
    namespace="spark",
    image="bitnami/spark:3.5",
    cmds=["spark-submit", "--master", "k8s://https://k8s-api:6443",
          "--deploy-mode", "client",
          "local:///opt/spark/jobs/process_orders.py",
          "--date", "{{ ds }}"],
    resources={"request_cpu": "8", "request_memory": "16Gi",
               "limit_cpu": "16", "limit_memory": "32Gi"},
    config_file="~/.kube/config",
    labels={"app": "airflow", "env": "prod", "tier": "etl"},
    annotations={"prometheus.io/scrape": "true"},
    is_delete_operator_pod=True,   # cleanup pod after task completes
    get_logs=True,                  # stream pod logs to Airflow UI
    do_xcom_push=True,             # push pod exit code + result to XCom
)

# SparkSubmitOperator — submit a Spark job (legacy Spark-on-YARN or k8s)
from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
spark_job = SparkSubmitOperator(
    task_id="spark_etl",
    application="/opt/spark/jobs/process_orders.py",
    conn_id="spark_default",
    conf={
        "spark.driver.memory": "4g",
        "spark.executor.memory": "8g",
        "spark.executor.instances": "8",
        "spark.dynamicAllocation.enabled": "true",
    },
    application_args=["--date", "{{ ds }}", "--env", "prod"],
    packages="org.apache.iceberg:iceberg-spark-runtime-3.5_2.12:1.5.0",
)

# DatabricksSubmitOperator — submit a notebook run to Databricks
from airflow.providers.databricks.operators.databricks import DatabricksSubmitRunOperator
databricks_job = DatabricksSubmitRunOperator(
    task_id="databricks_run",
    databricks_conn_id="databricks_default",
    notebook_task={"notebook_path": "/Production/orders_etl",
                   "base_parameters": {"date": "{{ ds }}"}},
    existing_cluster_id="1234-567890-abcde",
)

# ECSOperator — run an AWS ECS Fargate task
from airflow.providers.amazon.aws.operators.ecs import ECSOperator
ecs_task = ECSOperator(
    task_id="ecs_run",
    task_definition="orders-etl:5",
    cluster="production",
    launch_type="FARGATE",
    overrides={"containerOverrides": [{"name": "etl",
                                       "environment": [{"name": "DATE", "value": "{{ ds }}"}]}]},
    awslogs_group="/airflow/orders-etl",
    awslogs_stream_prefix="{{ run_id }}",
)`,E=`# ============================================================
# Airflow Sensors — push-based waiting for external conditions
# Three modes: poke (default), reschedule, smart sensor
# ============================================================

from airflow.providers.sensors.file import FileSensor
from airflow.providers.sensors.python import PythonSensor
from airflow.providers.sensors.external_task import ExternalTaskSensor
from airflow.providers.sensors.s3 import S3KeySensor
from airflow.providers.sensors.s3 import S3KeySizeSensor
from airflow.providers.sensors.sql import SqlSensor
from airflow.sensors.python import PythonSensor
from datetime import timedelta

# FileSensor — wait for a file to appear on the filesystem
# mode='poke' (default): the sensor occupies a worker slot for the entire wait
# mode='reschedule': releases the worker slot between pokes (better for long waits)
wait_for_file = FileSensor(
    task_id="wait_for_fastq",
    filepath="/data/incoming/{{ ds }}/sample_R1.fq.gz",
    fs_conn_id="fs_default",
    poke_interval=60,         # check every 60s
    timeout=60 * 60 * 24,    # 24-hour timeout
    mode="reschedule",        # smart sensor mode — releases worker between pokes
    exponential_backoff=True, # 60s, 120s, 240s, ... up to max_retry_delay
)

# PythonSensor — wait for a custom Python condition to become True
def check_upstream_loaded(**context):
    """Return True only when the upstream ETL loaded > 1M rows today."""
    from snowflake.connector import connect
    with connect(account="xy12345", user="AIRFLOW") as conn:
        cur = conn.cursor()
        cur.execute("SELECT count(*) FROM raw.orders WHERE load_date = %s",
                    (context["ds"],))
        return cur.fetchone()[0] > 1_000_000

wait_for_load = PythonSensor(
    task_id="wait_for_orders_load",
    python_callable=check_upstream_loaded,
    poke_interval=300,        # check every 5 min
    timeout=60 * 60 * 8,      # 8-hour timeout
    mode="reschedule",
)

# S3KeySensor — wait for an S3 object to exist
wait_for_s3 = S3KeySensor(
    task_id="wait_for_s3_object",
    bucket_key="data/incoming/orders_{{ ds }}.csv",
    bucket_name="my-bucket",
    aws_conn_id="aws_default",
    poke_interval=60,
    mode="reschedule",
)

# S3KeySizeSensor — wait for an S3 object AND check it's > 1KB
wait_for_s3_size = S3KeySizeSensor(
    task_id="wait_for_s3_size",
    bucket_key="data/incoming/orders_{{ ds }}.csv",
    bucket_name="my-bucket",
    aws_conn_id="aws_default",
    check_filter=lambda key: key.size > 1024,
)

# ExternalTaskSensor — wait for a task in ANOTHER Airflow DAG to complete
# This is how DAGs chain across dependency boundaries (dbt, snowflake, spark)
wait_for_dbt = ExternalTaskSensor(
    task_id="wait_for_dbt_run",
    external_dag_id="dbt_orders_pipeline",
    external_task_id="production_run",
    execution_delta=timedelta(hours=-1),  # match the 01:00 dbt run
    check_existence=False,
    poke_interval=60,
    mode="reschedule",
    timeout=60 * 60 * 4,
    # failed_states=['failed', 'upstream_failed'] — fail this sensor if upstream failed
    # allowed_states=['success'] (default)
)

# SqlSensor — wait for a SQL query to return any rows
wait_for_db = SqlSensor(
    task_id="wait_for_db_row",
    conn_id="snowflake_default",
    sql="SELECT 1 FROM raw.orders WHERE load_date = '{{ ds }}' LIMIT 1",
    poke_interval=300,
    mode="reschedule",
)

# Smart sensor (Airflow 2.2+) — global sensor daemon
# Instead of running each sensor as a task (one worker slot per sensor),
# the smart sensor daemon polls many sensors in a single process.
# Configure in airflow.cfg:
# [smart_sensor]
# use_smart_sensor = True
# shard_code = ""
# sensors_enabled = ['NamedHivePartitionSensor']  # only specific sensors supported`,B=`# ============================================================
# Airflow XCom — cross-task communication (small data only!)
# XCom = "cross-communication" — pushes/pulls small data between tasks
# ============================================================

from airflow.decorators import dag, task
from airflow.models.xcom_arg import XComArg
from datetime import datetime

@dag(start_date=datetime(2024, 1, 1), schedule_interval="@daily", catchup=False)
def xcom_demo_dag():

    # --- XCom Rule 1: small data only ---
    # XCom stores data in the metadata DB (Postgres/MySQL) by default.
    # The default limit is 48KB (see airflow.cfg: xcom_backend_serialization)
    # For large data: push the path to S3, not the data itself.

    @task
    def extract():
        # ❌ BAD: pushing 1MB of data via XCom — exceeds default limit
        # return {"data": [1] * 1_000_000}
        # ✓ GOOD: push the S3 path
        return {"s3_path": "s3://my-bucket/extracts/orders_2024-09-15.parquet",
                "rows": 1_500_000}

    @task
    def transform(extract_xcom):
        # XCom pull happens automatically when task takes a parameter
        # with the same name as the upstream task_id.
        s3_path = extract_xcom["s3_path"]
        rows = extract_xcom["rows"]
        # ... transform ...
        return {"output_path": s3_path.replace("extracts", "transforms"),
                "rows": rows}

    @task
    def load(transform_xcom):
        # Pull XCom manually if you need data from a non-direct dependency
        output_path = transform_xcom["output_path"]
        # ... load to Snowflake ...
        return {"loaded_rows": transform_xcom["rows"]}

    # --- XCom Rule 2: XComArg enables type-safe chaining ---
    # The TaskFlow API auto-threads XCom between tasks by parameter name.
    # extract() → transform(extract_xcom) means transform pulls from extract.
    # No manual xcom_pull() needed in the task body — Airflow infers the dependency.

    # --- XCom Rule 3: custom XCom backend for large data ---
    # Configure in airflow.cfg:
    # [core]
    # xcom_backend = airflow.providers.amazon.aws.xcom_backends.s3.S3XComBackend
    # This stores XCom data on S3 instead of the metadata DB — unlimited size
    # (still avoid pushing > 1MB — serialize to S3 + push the path instead).

    extract() >> transform() >> load()

xcom_demo_dag()

# --- Manual XCom pull (legacy Operator API) ---
# from airflow.operators.python import PythonOperator
# def consume(**context):
#     # Pull from a specific task
#     data = context["ti"].xcom_pull(task_ids="extract", key="return_value")
#     # Pull from multiple tasks
#     all_data = context["ti"].xcom_pull(task_ids=["task1", "task2"], dag_id="my_dag")
#     # Push custom XCom key
#     context["ti"].xcom_push(key="custom_key", value={"custom": "data"})

# --- XCom serialisation ---
# By default, XCom uses JSON serialisation (no Python objects)
# Custom XCom backends can use Pickle for richer types, but be careful
# with security — Pickle deserialisation can execute arbitrary code.

# --- XCom clearing ---
# XCom data is cleared when the task is cleared or the DAG run is deleted
# To clear: airflow tasks clear -s 2024-09-15 -e 2024-09-15 -d xcom_demo_dag
# XCom rows persist in the metadata DB until the next XCom cleanup job`,I=`# ============================================================
# Airflow TaskFlow API (Airflow 2.3+) — Python decorators, no boilerplate
# Replaces Operator + Python callable with a single @task decorator
# ============================================================

from airflow.decorators import dag, task, task_group
from datetime import datetime, timedelta

@dag(
    dag_id="taskflow_orders_pipeline",
    schedule_interval="0 2 * * *",
    start_date=datetime(2024, 1, 1),
    catchup=False,
    default_args={"retries": 3, "retry_delay": timedelta(minutes=5)},
    tags=["taskflow", "demo"],
    description="TaskFlow API demo — decorators + task groups + dynamic tasks",
)
def taskflow_orders_pipeline():

    # --- @task decorator — pure Python, XCom auto-threaded ---
    @task(pool="etl_pool")
    def extract(ds: str) -> dict:
        """Extract one day's orders from the source API."""
        import requests
        resp = requests.get(f"https://api.shopify.com/orders",
                            params={"date": ds})
        # Save to S3, return the path
        return {"s3_path": f"s3://raw/orders/{ds}.json", "rows": len(resp.json())}

    # --- Dynamic task mapping (Airflow 2.3+) — fan out over a list ---
    @task
    def transform_chunk(chunk_id: int, ds: str) -> dict:
        """Process one chunk of orders."""
        # In production: load chunk_id of ds from S3, transform, save
        return {"chunk_id": chunk_id, "rows_processed": 1000}

    @task
    def list_chunks(extract_xcom: dict) -> list[int]:
        """Dynamically decide how many chunks to create based on data size."""
        # Fan out 10 chunks if > 100k rows, else 1
        return list(range(10 if extract_xcom["rows"] > 100_000 else 1))

    # --- Dynamic task mapping: .expand() ---
    # Airflow creates one task instance per chunk_id — parallelism controlled
    # by max_active_tasks in the DAG config
    chunks = list_chunks(extract(ds="{{ ds }}"))
    transform_chunk.expand(chunk_id=chunks).partial(ds="{{ ds }}")

    # --- @task_group decorator — visually + logically group related tasks ---
    @task_group(group_id="load_to_warehouse")
    def load_group(transform_xcom_chunks: list[dict]) -> None:
        @task
        def stage_to_snowflake(chunks: list[dict]) -> str:
            return "staged"

        @task
        def copy_to_final(stage_xcom: str) -> None:
            pass

        # Within the task group, dependencies are explicit
        copy_to_final(stage_to_snowflake(transform_xcom_chunks))

    # --- Chained dependencies ---
    # extract → list_chunks → [transform_chunk \xd7 N] → load_group
    transform_chunks = transform_chunk.expand(chunk_id=chunks).partial(ds="{{ ds }}")
    load_group(transform_chunks)

# Instantiate the DAG
taskflow_orders_pipeline()

# --- TaskFlow benefits ---
# 1. No Operator boilerplate — pure Python, less code
# 2. Type inference: Airflow auto-threads XCom by parameter name
# 3. Dynamic tasks via .expand() / .partial() — fan out over a list
# 4. Task groups: visually grouped in the Airflow UI
# 5. Python-native error handling — try/except in the task body

# --- TaskFlow limitations ---
# 1. Only Python — BashOperator, KubernetesPodOperator still use the legacy API
# 2. Type annotations are advisory only — Airflow doesn't enforce them
# 3. .expand() can fan out 1000+ tasks — make sure max_active_tasks is set`,F=`# ============================================================
# Airflow DAG execution — in-browser simulation
# Build a synthetic Airflow DAG: tasks, dependencies, retries, XCom, sensors
# Show how Airflow's executor + scheduler orchestrate a multi-task pipeline
# ============================================================

import math
import random
from collections import defaultdict, deque

print("=== Apache Airflow DAG execution simulation ===")
print("DAG: orders_etl_pipeline \xb7 schedule=0 2 * * * (daily at 02:00)")
print("Executor: CeleryExecutor \xb7 workers: 8 \xb7 queues: default, etl_pool")
print()

random.seed(42)

# --- DAG definition ---
class Task:
    def __init__(self, task_id, operator, pool="default", retries=3, deps=None):
        self.task_id = task_id
        self.operator = operator          # Sensor | Bash | Python | KubernetesPod
        self.pool = pool
        self.max_retries = retries
        self.retries = 0
        self.state = "pending"            # pending → queued → running → success | failed
        self.deps = deps or []
        self.runtime_min = 0
        self.xcom_push = {}

    def __repr__(self):
        return f"Task({self.task_id}, {self.state}, retries={self.retries})"

class Dag:
    def __init__(self, dag_id, schedule, start_date, max_active_tasks=16):
        self.dag_id = dag_id
        self.schedule = schedule
        self.start_date = start_date
        self.max_active_tasks = max_active_tasks
        self.tasks = {}
        self.task_order = []

    def add_task(self, task):
        self.tasks[task.task_id] = task
        self.task_order.append(task.task_id)

    def topological_order(self):
        # Kahn's algorithm — schedule tasks whose dependencies are met
        in_degree = {tid: len(t.deps) for tid, t in self.tasks.items()}
        queue = deque(tid for tid, d in in_degree.items() if d == 0)
        order = []
        while queue:
            tid = queue.popleft()
            order.append(tid)
            for other_tid, t in self.tasks.items():
                if tid in t.deps:
                    in_degree[other_tid] -= 1
                    if in_degree[other_tid] == 0:
                        queue.append(other_tid)
        return order

# --- Build a 6-task DAG (genomics-style pipeline) ---
dag = Dag("orders_etl_pipeline", "0 2 * * *", "2024-01-01", max_active_tasks=8)

dag.add_task(Task("wait_for_source_file", "FileSensor", pool="default",
                  retries=1, deps=[]))
dag.add_task(Task("extract_orders", "PythonOperator", pool="etl_pool",
                  retries=3, deps=["wait_for_source_file"]))
dag.add_task(Task("transform_orders", "KubernetesPodOperator", pool="etl_pool",
                  retries=3, deps=["extract_orders"]))
dag.add_task(Task("load_to_warehouse", "PythonOperator", pool="etl_pool",
                  retries=3, deps=["transform_orders"]))
dag.add_task(Task("wait_for_dbt_run", "ExternalTaskSensor", pool="default",
                  retries=1, deps=["load_to_warehouse"]))
dag.add_task(Task("publish_freshness", "BashOperator", pool="default",
                  retries=2, deps=["wait_for_dbt_run"]))

# Set per-task runtime + failure probability (sensor tasks are quick, transforms are slow)
task_runtimes = {
    "wait_for_source_file": (1, 5),       # 1-5 min (sensor — poke interval 60s)
    "extract_orders":        (3, 8),       # 3-8 min (PythonOperator)
    "transform_orders":      (15, 45),    # 15-45 min (KubernetesPod on GKE)
    "load_to_warehouse":     (5, 15),     # 5-15 min (Python + Snowflake COPY)
    "wait_for_dbt_run":      (1, 30),     # 1-30 min (ExternalTaskSensor — poke + wait)
    "publish_freshness":     (1, 2),      # 1-2 min (Bash curl)
}
task_failure_rates = {
    "wait_for_source_file": 0.005,   # 0.5% — sensor timeout
    "extract_orders":        0.01,    # 1% — source API flakey
    "transform_orders":      0.04,    # 4% — GKE pod eviction (transient)
    "load_to_warehouse":     0.005,
    "wait_for_dbt_run":      0.01,    # 1% — dbt Cloud delayed
    "publish_freshness":     0.005,
}

# --- Simulate the DAG execution ---
print("DAG tasks (topological order):")
print(f"{'Task ID':<22} | {'Operator':<24} | {'Pool':<10} | {'Retries':<8} | {'Depends on'}")
print("-" * 100)
for tid in dag.topological_order():
    t = dag.tasks[tid]
    deps_str = ", ".join(t.deps) if t.deps else "(none)"
    print(f"{t.task_id:<22} | {t.operator:<24} | {t.pool:<10} | "
          f"{t.max_retries:<8} | {deps_str}")

# --- Execute the DAG ---
print()
print("=== DAG execution log (run_id=orders_etl_2024-09-15) ===")
total_runtime_min = 0
total_retries = 0
failed_tasks = []
final_states = {}

# Simulate scheduling — tasks run in topological order, respecting deps
for tid in dag.topological_order():
    t = dag.tasks[tid]
    # Sensor tasks: simulate waiting (poke interval 60s, up to 24h timeout)
    if t.operator.endswith("Sensor"):
        wait_min = random.randint(*task_runtimes[tid])
        t.runtime_min = wait_min
        total_runtime_min += wait_min
        t.state = "success"
        print(f"[{total_runtime_min}m] {t.task_id} → success (sensed after {wait_min}m)")
        final_states[tid] = "success"
    else:
        # Regular task — may fail and retry
        for attempt in range(t.max_retries + 1):
            runtime = random.randint(*task_runtimes[tid])
            total_runtime_min += runtime
            t.runtime_min = runtime
            if random.random() < task_failure_rates[tid]:
                if attempt < t.max_retries:
                    total_retries += 1
                    print(f"[{total_runtime_min}m] {t.task_id} → retry {attempt+1} (transient failure, {runtime}m)")
                else:
                    t.state = "failed"
                    failed_tasks.append(t.task_id)
                    print(f"[{total_runtime_min}m] {t.task_id} → FAILED (max retries exceeded, {runtime}m)")
                    final_states[tid] = "failed"
                    break
            else:
                t.state = "success"
                # Simulate XCom push
                t.xcom_push = {"rows": random.randint(1000, 5000), "s3_path": f"s3://raw/{tid}/{{ds}}.parquet"}
                print(f"[{total_runtime_min}m] {t.task_id} → success ({runtime}m, XCom: {t.xcom_push})")
                final_states[tid] = "success"
                break
        # If a non-sensor task failed, downstream tasks are blocked
        if t.state == "failed":
            for downstream_tid in dag.topological_order():
                if tid in dag.tasks[downstream_tid].deps and downstream_tid not in final_states:
                    final_states[downstream_tid] = "upstream_failed"
                    print(f"[{total_runtime_min}m] {downstream_tid} → upstream_failed (blocked by {tid})")
            break

# --- XCom flow ---
print()
print("=== XCom data flow (small data only) ===")
for tid in dag.topological_order():
    t = dag.tasks[tid]
    if t.xcom_push:
        print(f"  {t.task_id} pushed: {t.xcom_push}")
print("  (large data: push S3 paths, not the data itself)")

# --- Final DAG state ---
print()
print("=== Final DAG state ===")
n_success = sum(1 for s in final_states.values() if s == "success")
n_failed = sum(1 for s in final_states.values() if s == "failed")
n_blocked = sum(1 for s in final_states.values() if s == "upstream_failed")
print(f"  Total tasks: {len(dag.tasks)}")
print(f"  Succeeded:   {n_success}")
print(f"  Failed:      {n_failed}")
print(f"  Blocked:     {n_blocked}")
print(f"  Total retries: {total_retries}")
print(f"  Total runtime: {total_runtime_min} min = {total_runtime_min/60:.1f} hours")
print(f"  DAG state: {'success' if n_failed == 0 and n_blocked == 0 else 'failed'}")

# --- Smart sensor mode ---
print()
print("=== Smart sensor mode (Airflow 2.2+) ===")
sensor_count = sum(1 for t in dag.tasks.values() if t.operator.endswith("Sensor"))
print(f"  Sensors in this DAG: {sensor_count}")
print(f"  Without smart sensor: {sensor_count} worker slots held during poke waits")
print(f"  With smart sensor: 1 global daemon polls all {sensor_count} sensors")
print(f"  → saves {sensor_count - 1} worker slots = {100*(sensor_count-1)/max(sensor_count,1):.0f}% reduction in pool pressure")

# --- Pool concurrency ---
print()
print("=== Pool concurrency ===")
pool_tasks = defaultdict(list)
for t in dag.tasks.values():
    pool_tasks[t.pool].append(t.task_id)
for pool, tasks in pool_tasks.items():
    print(f"  Pool '{pool}': {len(tasks)} tasks ({', '.join(tasks)})")
print(f"  max_active_tasks: {dag.max_active_tasks}")
print(f"  → Airflow schedules at most {dag.max_active_tasks} tasks concurrently")

print()
print("Key insight: Airflow's value isn't running SQL — it's the DAG")
print("execution engine. Topological scheduling, retries with backoff,")
print("XCom for cross-task communication, sensors for external conditions,")
print("smart sensors to reduce pool pressure, pools to limit concurrency.")
print("For 3,000+ DAGs at Airbnb-scale, this orchestration layer is what")
print("made data pipelines tractable.")`;function R(){let[e,s]=(0,r.useState)("scheduler"),o={webserver:{label:"Webserver",desc:"Flask UI — DAGs, tasks, logs, XCom. Port 8080 by default",level:0},scheduler:{label:"Scheduler",desc:"Daemon that decides when + where to run task instances. Heart of Airflow",level:1},executor:{label:"Executor",desc:"LocalExecutor (single machine), CeleryExecutor (distributed workers), KubernetesExecutor (per-task pod)",level:2},workers:{label:"Workers (N)",desc:"Celery workers — pull tasks from queue, execute, push results to XCom backend",level:3},metadata_db:{label:"Metadata DB",desc:"Postgres/MySQL — DAG runs, task instances, XCom, connection settings",level:0},xcom_backend:{label:"XCom Backend",desc:"Default: metadata DB. Custom: S3XComBackend for large data",level:2},dag_bag:{label:"DAG Bag",desc:"Folder of DAG .py files — Scheduler parses every N seconds (default 30s)",level:4},queue:{label:"Celery Queue",desc:"Redis/RabbitMQ — workers pull tasks by queue name (default, etl_pool)",level:2}},i={webserver:{x:60,y:30},metadata_db:{x:60,y:80},scheduler:{x:60,y:130},executor:{x:60,y:180},queue:{x:60,y:230},workers:{x:60,y:280},dag_bag:{x:220,y:130},xcom_backend:{x:220,y:280}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(b.Workflow,{className:"h-3.5 w-3.5 text-primary"}),"Airflow architecture — webserver + scheduler + executor + workers + metadata DB"]})}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsxs)("svg",{viewBox:"0 0 320 320",className:"w-full h-auto",children:[[["webserver","metadata_db"],["scheduler","metadata_db"],["scheduler","executor"],["executor","queue"],["queue","workers"],["workers","xcom_backend"],["scheduler","dag_bag"]].map(([e,s],r)=>{let a=i[e],o=i[s];return(0,t.jsx)("line",{x1:a.x,y1:a.y+12,x2:o.x,y2:o.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow-airflow)"},r)}),Object.entries(i).map(([r,i])=>{let n=e===r,l=o[r],d=0===l.level?"var(--chart-3)":1===l.level?"var(--chart-2)":2===l.level?"var(--chart-1)":3===l.level?"var(--chart-4)":"var(--muted-foreground)";return(0,t.jsxs)(a.motion.g,{onMouseEnter:()=>s(r),onMouseLeave:()=>s(null),animate:{scale:n?1.05:1},style:{cursor:"pointer"},children:[(0,t.jsx)("rect",{x:i.x-55,y:i.y-10,width:"110",height:"22",rx:"3",fill:n?d+"30":"var(--background)",stroke:d,strokeWidth:n?1.5:.8}),(0,t.jsx)("text",{x:i.x,y:i.y+4,textAnchor:"middle",fontSize:"7",fill:n?d:"var(--foreground)",fontWeight:n?"bold":"normal",children:l.label})]},r)}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"arrow-airflow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,t.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:o[e].label}),(0,t.jsx)("p",{className:"text-muted-foreground",children:o[e].desc})]}),!e&&(0,t.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node to see its role — the scheduler is the heart of Airflow."})]})]})}function X(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(w.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Airflow vs Dagster vs dbt vs Prefect — orchestration tool comparison"]})}),(0,t.jsx)("div",{className:"overflow-x-auto max-h-96 overflow-y-auto custom-scroll",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/30 sticky top-0",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Airflow"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Dagster"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"dbt"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Prefect"})]})}),(0,t.jsx)("tbody",{children:[{feature:"Origin",airflow:"Airbnb (2014)",dagster:"Dagster Labs (2018)",dbt:"Fishtown (2016)",prefect:"Prefect (2018)"},{feature:"Model",airflow:"DAG-oriented (tasks)",dagster:"Asset-oriented (SDA)",dbt:"Transform (SQL)",prefect:"DAG-oriented (flows)"},{feature:"Language",airflow:"Python",dagster:"Python",dbt:"SQL + Jinja",prefect:"Python"},{feature:"Scheduler",airflow:"Built-in (Celery/K8s)",dagster:"Built-in (daemon)",dbt:"dbt Cloud jobs",prefect:"Prefect Cloud"},{feature:"Sensors",airflow:"First-class",dagster:"Asset sensors",dbt:"Source freshness",prefect:"Triggers"},{feature:"XCom",airflow:"Cross-task communication",dagster:"IO Manager (typed)",dbt:"manifest.json refs",prefect:"Data passing"},{feature:"Backfill",airflow:"Catchup + manual",dagster:"Partition-aware",dbt:"Manual re-run",prefect:"Auto"},{feature:"UI",airflow:"Tree view + graph",dagster:"Asset graph UI",dbt:"Docs HTML",prefect:"Modern flow UI"},{feature:"Best fit",airflow:"Cross-system orchestration",dagster:"Asset-graph pipelines",dbt:"Warehouse transforms",prefect:"Python data flows"},{feature:"Adopters",airflow:"Airbnb, Lyft, Adobe, Bloomberg",dagster:"Ripple, Cradle, Earnin",dbt:"GitLab, JetBlue, Ratheon",prefect:"Toast, Vice, Merge"},{feature:"Open-source",airflow:"Apache 2.0",dagster:"Apache 2.0",dbt:"Apache 2.0",prefect:"Apache 2.0"}].map((e,s)=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,t.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.airflow}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.dagster}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.dbt}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.prefect})]},s))})]})})]})}let K=[{label:"Origin",value:"Airbnb 2014 (Maxime Beauchemin)",hint:"Airbnb's first data platform manager built Airflow to manage 3,000+ DAGs that cron + bespoke scripts could no longer handle. Open-sourced in 2015; graduated Apache top-level in 2019.",deltaTone:"flat"},{label:"Adoption",value:"12,000+ companies",hint:"Airbnb, Lyft, Adobe, Bloomberg, Robinhood, Twitter — every major data-driven company runs Airflow. The Apache Airflow project has 35,000+ GitHub stars and 3,000+ contributors.",deltaTone:"up"},{label:"DAG scale (Airbnb)",value:"3,000+ DAGs",hint:"Airbnb's production Airflow instance runs 3,000+ DAGs with 30,000+ task instances per day. That scale drove the smart-sensor mode, pool concurrency, and TaskFlow API.",deltaTone:"up"},{label:"Executors",value:"3 (Local, Celery, Kubernetes)",hint:"LocalExecutor (single machine), CeleryExecutor (distributed workers via Redis/RabbitMQ), KubernetesExecutor (per-task pod — cleanest isolation, scales to 0).",deltaTone:"flat"}];function L(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(o.PageHeader,{eyebrow:"Apache Airflow · data pipeline orchestration · DAG",title:"Apache Airflow — Data Pipeline Orchestration",description:"Apache Airflow is the de-facto standard for orchestrating data pipelines. Born at Airbnb (2014) by Maxime Beauchemin to manage 3,000+ DAGs that cron + bespoke scripts could no longer handle, Airflow introduced the DAG-as-Python model: every pipeline is a Python file, version-controlled, with retries, XCom for cross-task communication, sensors for external conditions, and a web UI for visibility. Now graduated Apache top-level (2019), adopted by 12,000+ companies including Airbnb, Lyft, Adobe, Bloomberg, Robinhood. The TaskFlow API (Airflow 2.3+) replaces Operator boilerplate with Python decorators; smart sensors (2.2+) reduce pool pressure; the KubernetesExecutor (1.10+) runs each task in its own pod.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(f.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(b.Workflow,{className:"h-3 w-3"})," Airflow 2.10"]}),(0,t.jsxs)(f.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(N.GitGraph,{className:"h-3 w-3"})," DAGs"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:K.map(e=>(0,t.jsx)(o.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(o.SectionCard,{title:"Airflow architecture — webserver + scheduler + executor + workers + metadata DB",description:"Airflow has 5 core components: (1) Webserver (Flask UI on port 8080 — DAGs, tasks, logs, XCom), (2) Scheduler (daemon that decides when + where to run task instances — heart of Airflow), (3) Executor (LocalExecutor for single machine, CeleryExecutor for distributed workers, KubernetesExecutor for per-task pods), (4) Workers (Celery workers that pull tasks from the queue and execute), (5) Metadata DB (Postgres/MySQL — DAG runs, task instances, XCom, connection settings). The DAG Bag is a folder of DAG .py files that the Scheduler parses every 30s. The XCom Backend stores cross-task data — default is the metadata DB; custom S3XComBackend supports large data.",icon:(0,t.jsx)(b.Workflow,{className:"h-5 w-5"}),badge:"architecture",children:(0,t.jsx)(R,{})}),(0,t.jsx)(o.SectionCard,{title:"Airflow DAG — TaskFlow API + Operator + Sensor + XCom",description:"A DAG (Directed Acyclic Graph) is the unit of orchestration in Airflow. Each DAG is a Python file defining tasks (Operators or TaskFlow @task decorators) and their dependencies (>> means 'after'). This DAG shows the full pattern: FileSensor waits for an upstream file, PythonOperator (TaskFlow @task) extracts + validates, KubernetesPodOperator runs the heavy transform on GKE, PythonOperator loads to Snowflake, ExternalTaskSensor waits for the dbt Cloud DAG to complete, BashOperator publishes a freshness metric. The DAG's max_active_runs=1 ensures idempotency — only one daily run at a time.",icon:(0,t.jsx)(_.Database,{className:"h-5 w-5"}),badge:"DAG Python",children:(0,t.jsx)(d.CodeBlock,{code:G,language:"python",filename:"dags/orders_etl_pipeline.py",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111]})}),(0,t.jsx)(o.SectionCard,{title:"Airflow Operators — the unit of work in a DAG",description:"Operators are how Airflow abstracts 'what a task does' from 'how Airflow runs it'. The BashOperator runs a shell command. The PythonOperator runs a Python callable. The KubernetesPodOperator runs each task as its own Kubernetes pod — the cleanest isolation model, scales to zero between runs. The SparkSubmitOperator submits a Spark job to a YARN or k8s cluster. The DatabricksSubmitRunOperator submits a notebook run. The ECSOperator runs an AWS Fargate task. Each Operator has a provider package (apache-airflow-providers-*) — there are 100+ provider packages with 1,000+ Operators + sensors + hooks.",icon:(0,t.jsx)(C.default,{className:"h-5 w-5"}),badge:"Operators",children:(0,t.jsx)(d.CodeBlock,{code:O,language:"python",filename:"dags/operators_demo.py",highlight:[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98]})}),(0,t.jsx)(o.SectionCard,{title:"Airflow Sensors — push-based waiting for external conditions",description:"Sensors are Operators that wait for a condition to be true: a file exists (FileSensor), an S3 object exists (S3KeySensor), a row exists in a SQL table (SqlSensor), a task in another DAG is done (ExternalTaskSensor), a Python function returns True (PythonSensor). Sensors run in three modes: poke (default — occupies a worker slot for the entire wait, wasteful), reschedule (releases the worker slot between pokes — better for long waits), smart sensor (Airflow 2.2+ — a global daemon polls many sensors in one process, 90% reduction in pool pressure at Airbnb's scale).",icon:(0,t.jsx)(D.Radio,{className:"h-5 w-5"}),badge:"Sensors",children:(0,t.jsx)(d.CodeBlock,{code:E,language:"python",filename:"dags/sensors_demo.py",highlight:[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102]})}),(0,t.jsx)(o.SectionCard,{title:"Airflow XCom — cross-task communication (small data only!)",description:"XCom (cross-communication) is how tasks pass data to each other. A task pushes XCom (key + value); downstream tasks pull it. Critical rule: XCom is for small data only — the default backend is the metadata DB with a 48KB limit. For large data, push the S3 path, not the data itself. The TaskFlow API auto-threads XCom by parameter name — no manual xcom_pull() needed in the task body. Custom XCom backends (S3XComBackend) support larger data by storing the payload on S3, but the best practice is always 'small XCom + S3 for big data'.",icon:(0,t.jsx)(y.Network,{className:"h-5 w-5"}),badge:"XCom",children:(0,t.jsx)(d.CodeBlock,{code:B,language:"python",filename:"dags/xcom_demo.py",highlight:[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82]})}),(0,t.jsx)(o.SectionCard,{title:"TaskFlow API (Airflow 2.3+) — Python decorators, no Operator boilerplate",description:"The TaskFlow API replaces the Operator + Python callable pattern with a single @task decorator. Pure Python functions become Airflow tasks; XCom is auto-threaded by parameter name; dynamic tasks via .expand() fan out over a list at runtime. The @task_group decorator visually + logically groups related tasks in the Airflow UI. The TaskFlow API makes Airflow DAGs readable — gone is the Operator boilerplate, replaced with Python functions that chain naturally. This is the modern Airflow API; legacy Operators (BashOperator, KubernetesPodOperator) are still used where Python isn't enough.",icon:(0,t.jsx)(P.Code2,{className:"h-5 w-5"}),badge:"TaskFlow API",children:(0,t.jsx)(d.CodeBlock,{code:I,language:"python",filename:"dags/taskflow_demo.py",highlight:[12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94]})}),(0,t.jsx)(o.SectionCard,{title:"Try it: run an Airflow DAG in your browser (Pyodide)",description:"Pure-Python simulation of an Airflow DAG run — no scheduler needed, runs in-browser. Build a 6-task DAG (FileSensor → PythonOperator → KubernetesPodOperator → PythonOperator → ExternalTaskSensor → BashOperator), simulate topological scheduling, retries with backoff, XCom handoff between tasks, sensor poke intervals, and pool concurrency. See how a failed task blocks downstream tasks, and how the smart sensor mode reduces pool pressure at Airbnb-scale.",icon:(0,t.jsx)(A.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(c.PyodideRunner,{code:F,buttonLabel:"Run Airflow DAG simulation (Pyodide)"})}),(0,t.jsx)(o.SectionCard,{title:"Airflow vs Dagster vs dbt vs Prefect — orchestration tool comparison",description:"Four orchestration tools compared. Airflow is DAG-oriented (tasks) — best for cross-system orchestration where the task schedule is the primary concern. Dagster is asset-oriented (SDA) — best when the data artifact (not the task) is the primary concern, with partition-aware backfills. dbt is transform-only — owns the SQL transform layer, no orchestration across systems. Prefect is DAG-oriented (flows) — Python-native, modern API, lighter-weight than Airflow. Most modern stacks use Airflow + dbt together; Dagster is gaining traction as the asset-oriented alternative.",icon:(0,t.jsx)(w.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(X,{})}),(0,t.jsx)(o.SectionCard,{title:"Why Airflow evolved — shortfalls of the cron + bespoke scripts era (pre-2014)",description:"Airflow filled the gap between data warehouses (which had the SQL engine) and a sane orchestration layer. Before Airflow, data pipelines at Airbnb (and every other data-driven company) were a tangle of cron + bespoke scripts + bash + ad-hoc retries — unworkable at 3,000+ pipeline scale.",icon:(0,t.jsx)(k.History,{className:"h-5 w-5"}),badge:"Why Airflow",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: No DAG visibility."})," Cron jobs ran independently; the only way to know if today's pipeline was complete was to ask the data analyst. There was no UI, no dependency graph, no status overview. Airflow's webserver + tree view made pipeline state visible to the whole company — oncall sees immediately which DAGs are running, which failed, which are pending. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," oncall visibility went from 'page the data engineer' to 'open the Airflow UI'."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: No retries + backoff."})," A cron job that hit a transient API error would simply fail — the oncall had to manually re-run it. Airflow's per-task retries + exponential backoff handle transient failures automatically; only persistent failures (3+ retries exhausted) page oncall. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," 90% reduction in oncall pages for transient pipeline failures."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No cross-task communication."})," Pipeline stages couldn't pass data to each other — each bash script wrote to its own scratch file, the next script had to know the path. Airflow's XCom lets tasks pass structured data (small payloads — S3 paths, row counts, status) via the metadata DB; downstream tasks pull by task_id + key. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," pipelines became composable — one task's output is the next task's input, no fragile file path conventions."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: No backfill."})," When a pipeline bug was fixed, you had to manually re-run cron for every affected day — sometimes months of catchup. Airflow's catchup=True + backfill CLI lets you re-run a DAG for a date range with one command, parallelised across workers. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," backfilling 30 days of data went from a 30-day slog to a 30-minute command."]})]})}),(0,t.jsx)(o.SectionCard,{title:"Truly unique Airflow features (vs Dagster + dbt + Prefect)",description:"Airflow has four features that are genuinely unique — not marketing fluff, but structural differentiators that the other orchestrators haven't matched.",icon:(0,t.jsx)(A.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. 3,000+ DAG scale (proven)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Airbnb's production Airflow runs 3,000+ DAGs with 30,000+ task instances per day — that scale drove the smart-sensor mode, pool concurrency, and TaskFlow API. ",(0,t.jsx)("strong",{children:"Dagster is proven at hundreds of DAGs; Prefect at dozens."})," Airflow wins on proven production scale."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Smart sensors (90% pool pressure reduction)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["A global sensor daemon polls many sensors in one process — 90% reduction in pool pressure at Airbnb's scale. ",(0,t.jsx)("strong",{children:"Dagster + Prefect have nothing equivalent."})," Critical for workflows with many FileSensor / ExternalTaskSensor tasks that would otherwise hold worker slots for hours."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. KubernetesExecutor (per-task pod)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Each task runs in its own Kubernetes pod — cleanest isolation model, scales to zero between runs. ",(0,t.jsx)("strong",{children:"Dagster has it; Prefect has it; but Airflow + K8s is the most mature."})," Right-sized resources per task (small PythonOperator gets 100m CPU; heavy Spark job gets 64 cores)."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. 100+ provider packages"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["The Apache Airflow ecosystem has 100+ provider packages with 1,000+ Operators + sensors + hooks for every cloud + data tool. ",(0,t.jsx)("strong",{children:"Dagster + Prefect have ~10 integrations each."})," Whatever system you need to call, Airflow has a provider package."]})]})]})}),(0,t.jsx)(o.SectionCard,{title:"2 large-dataset examples — cards with 5-language code popups",description:"Two production-style scientific Airflow examples. Each is a clickable card opening a lazy popup with: scenario brief (dataset/scale/why), dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight. The examples show how Airflow's DAG model orchestrates scientific workflows with retries, sensors, XCom, and TaskFlow.",icon:(0,t.jsx)(_.Database,{className:"h-5 w-5"}),badge:"2 examples × 5 langs",children:(0,t.jsx)(h.DatasetCards,{examples:u.AIRFLOW_SCIENCE_EXAMPLES,intro:"GATK Best Practices germline variant calling DAG (BWA → Sort → MarkDups → HaplotypeCaller → GenotypeGVCFs) + CERN LHC ATLAS analysis chain DAG (trigger → reconstruct → skim → analyze). Each card has Scala/Rust/Go/Elixir/Zig code that submits DAG runs via the Airflow REST API + a Pyodide simulation of the DAG execution."})}),(0,t.jsx)(o.SectionCard,{title:"Computational tooling — the Airflow ecosystem",description:"Airflow's ecosystem is the most mature of any orchestrator. The Apache Airflow project has 100+ provider packages covering every cloud + data tool. The TaskFlow API (2.3+) modernises the DAG authoring experience. The KubernetesExecutor (1.10+) gives per-task pod isolation. The smart sensor mode (2.2+) reduces pool pressure at scale.",icon:(0,t.jsx)(S.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(v.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Executors (3)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"LocalExecutor"})," — single machine, parallel threads"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"CeleryExecutor"})," — distributed workers via Redis/RabbitMQ"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"KubernetesExecutor"})," — per-task pod, scales to 0"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(T.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Provider packages (100+)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"apache-airflow-providers-amazon"})," — AWS S3, EMR, Redshift, ECS"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"apache-airflow-providers-google"})," — GCS, BigQuery, Dataproc, GKE"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"apache-airflow-providers-microsoft-azure"})," — ADLS, Synapse, AKS"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"apache-airflow-providers-snowflake"})," — Snowflake SQL + COPY"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"apache-airflow-providers-databricks"})," — notebook + job runs"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"apache-airflow-providers-cncf-kubernetes"})," — KPO + spark-on-k8s"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(P.Code2,{className:"h-3.5 w-3.5 text-primary"})," Modern APIs (4)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"TaskFlow API (2.3+)"})," — @task + @task_group decorators"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Smart sensors (2.2+)"})," — global sensor daemon"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Stable REST API v2"})," — programmatic DAG runs"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Dataset + data-aware scheduling (2.4+)"})," — event-driven DAGs"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(y.Network,{className:"h-3.5 w-3.5 text-primary"})," Managed services (5)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Amazon MWAA"})," — AWS-managed Airflow (Celery-based)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Google Cloud Composer"})," — GCP-managed (Celery-based)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Astronomer"})," — multi-cloud managed + Astra (SaaS)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Azure Data Factory Airflow (2024)"})," — Azure-managed"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Cloudflare + Astronomer"})," — edge-deployed Airflow"]})]})]})]})}),(0,t.jsx)(o.SectionCard,{title:"Research + production case studies",description:"The papers, blog posts, and production case studies that defined Airflow + the data orchestration movement. The 2014 Airbnb origin + 2015 open-source release + 2019 Apache top-level graduation are the key milestones. Airbnb, Lyft, Adobe, and Bloomberg have published detailed production case studies.",icon:(0,t.jsx)(x.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Maxime Beauchemin (Airbnb, 2014):"}),' "Airflow: a system to schedule and monitor data pipelines." Argued that data engineering at Airbnb had hit a wall — 3,000+ pipelines, mostly cron + bespoke bash scripts, with no visibility, no retries, no audit. Airflow introduced the DAG-as-Python model: every pipeline is a Python file, version-controlled, with retries, XCom, sensors, and a UI. Beauchemin later left Airbnb and started Apache Superset (the BI tool) — both projects defined the modern data stack.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Airbnb Engineering Blog (2015):"})," \"Airflow at Airbnb: Orchestrating 3,000+ data pipelines.\" Detailed how Airbnb migrated 3,000+ cron jobs + bespoke scripts to Airflow over 18 months. Result: oncall pages dropped 70% (auto-retries caught transient failures), pipeline visibility became 'open the UI' instead of 'page the data engineer', and backfilling went from manual re-runs to one CLI command. The 3,000-DAG scale drove the smart-sensor mode (90% pool pressure reduction), pool concurrency, and the TaskFlow API."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Lyft Engineering (2017):"})," Lyft's production Airflow deployment runs 1,500+ DAGs across multiple teams. They contributed the KubernetesExecutor (1.10+) to the open-source project — each task runs in its own pod, cleanest isolation. The Lyft team's blog post on production best practices (pool sizing, retry strategies, XCom best practices, sensor modes) is still cited as the reference."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Apache Airflow graduation (2019):"})," Airflow graduated from Apache incubator to top-level project, signifying maturity + governance. The graduation milestone confirmed Airflow as the de-facto standard for data pipeline orchestration. As of 2024, the project has 35,000+ GitHub stars, 3,000+ contributors, 100+ provider packages, and 12,000+ adopter companies."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"TaskFlow API release (Airflow 2.3, 2022):"})," The TaskFlow API replaced the Operator + Python callable pattern with @task decorators. This was the biggest authoring experience improvement since Airflow 1.0 — pure Python functions become tasks, XCom is auto-threaded by parameter name, dynamic tasks via .expand() fan out over a list at runtime. The TaskFlow API made Airflow DAGs as readable as Prefect flows."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Adobe Experience Platform (2021):"})," Adobe runs Airflow as the orchestration layer for the Experience Platform — 5,000+ DAGs covering customer data ingestion, segment computation, and audience activation across Adobe Marketing Cloud. They contribute back to the open-source project (provider packages for Adobe Experience Cloud)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Robinhood Production Case (2022):"})," Robinhood's data platform runs Airflow with the KubernetesExecutor on EKS — each task gets its own pod with right-sized resources (small PythonOperator: 100m CPU; heavy Spark: 64 cores). The K8s executor's scale-to-zero between runs cut their cluster cost by 40% vs the always-on CeleryExecutor model."]})]})}),(0,t.jsx)(o.SectionCard,{title:"My deeper thought: Airflow's DAG IS the company's data operations manifest",description:"The unifying view: an Airflow DAG bag is structurally a manifest of the company's data operations — every pipeline, every dependency, every SLA, every oncall. It is to data operations what Kubernetes manifests is to compute operations.",icon:(0,t.jsx)(j.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Airflow's DAG bag IS the company's data operations manifest."})," Every DAG file in the bag declares one pipeline: its schedule, its tasks, its dependencies, its retries, its SLAs, its owner, its tags. This is structurally the same as a Kubernetes manifest (declares the desired state of a workload) or a Terraform plan (declares the desired state of infrastructure). The DAG bag is the source of truth for the company's data operations — when someone asks 'what pipelines do we have?', the answer is 'look at the DAG bag'."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"XCom IS a microservice RPC pattern."})," Cross-task communication via XCom is structurally the same as microservice RPC: task A pushes a small payload, task B pulls it. The only difference is the transport (metadata DB vs HTTP/gRPC) and the timing (async via scheduling vs sync via blocking). When you compose 100 tasks with XCom, you've built a 100-node microservice graph — with retries, idempotency, and visibility built-in. This is why Airflow scales where bespoke pipelines don't: the orchestration patterns are baked in."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Sensors ARE long-poll subscriptions."})," A FileSensor that pokes every 60s for a file is structurally a long-poll HTTP subscription — poll, get 404, wait, poll again. The smart sensor mode (global daemon) is structurally an event-loop reactor — one process polls many sensors efficiently. This is the same pattern as Redis pub/sub's client-side buffer, or the polling loop in Reactor pattern implementations. Airflow invented nothing — it applied the reactor pattern to data pipeline orchestration."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Airflow + dbt = Kubernetes + Helm."})," Airflow is the orchestration plane (when + where to run); dbt is the workload definition (what to run). This is the same split as Kubernetes + Helm: Kubernetes is the orchestrator, Helm is the package manager. Just as you wouldn't deploy a Kubernetes manifest without Helm templating, you shouldn't orchestrate dbt models without Airflow scheduling. The two tools are complements, not competitors — most modern stacks use both."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Airflow IS to data pipelines what Terraform is to infrastructure."})," Before Terraform, infrastructure was provisioned manually or via bespoke bash scripts. Terraform's contribution was a declarative DSL + dependency-aware apply order + state management. Airflow did the same for data pipelines: declarative DAG (Python), dependency-aware topological scheduling, state management (metadata DB). The patterns are isomorphic — Airflow is Terraform for data pipelines."]})]})}),(0,t.jsxs)(g.DeeperThoughtSection,{pageTitle:"Apache Airflow",children:[(0,t.jsx)(g.DeeperThought,{title:"Apache Airflow IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Apache Airflow is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Apache Airflow connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Apache Airflow sits in the computational-science landscape."})}),(0,t.jsx)(g.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Apache Airflow) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(g.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(g.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(g.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(p.RelatedTopics,{topics:[{id:"orchestration",reason:"Anchor concept page — orchestration layer overview"},{id:"dagster",reason:"Asset-oriented alternative — software-defined assets"},{id:"dbt-deep-dive",reason:"dbt — Airflow orchestrates dbt Cloud jobs"},{id:"dbt",reason:"dbt concept page — Dimensional Modelling + SCD2"},{id:"cicd",reason:"Airflow DAGs version-controlled in git + CI-validated"},{id:"data-lakehouse",reason:"Airflow orchestrates lakehouse Bronze→Silver→Gold transforms"},{id:"iceberg",reason:"Airflow + Iceberg compaction jobs (small files problem)"},{id:"snowflake",reason:"Snowflake tasks called from Airflow via SnowflakeOperator"}]}),(0,t.jsx)(n.ResearchDemo,{pageId:"airflow"}),(0,t.jsx)(l.TrendAnticipation,{pageId:"airflow"}),(0,t.jsx)(i.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"orchestration",reason:"Anchor concept page — orchestration layer overview"},{id:"dagster",reason:"Asset-oriented alternative — software-defined assets"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(s.default,{href:(0,m.hrefFor)("orchestration"),className:"text-sm text-primary hover:underline",children:"→ Orchestration concept page"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,m.hrefFor)("dagster"),className:"text-sm text-primary hover:underline",children:"→ Dagster (asset-oriented alternative)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,m.hrefFor)("dbt-deep-dive"),className:"text-sm text-primary hover:underline",children:"→ dbt Deep Dive (transform layer)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,m.hrefFor)("dbt"),className:"text-sm text-primary hover:underline",children:"→ dbt concept (Dimensional Modelling + SCD2)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,m.hrefFor)("cicd"),className:"text-sm text-primary hover:underline",children:"→ CI/CD for DAGs"})]})]})}e.s(["AirflowPage",()=>L],31119)}]);