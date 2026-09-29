(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,915996,e=>{"use strict";var a=e.i(843476),t=e.i(522016),r=e.i(271645),s=e.i(846932),i=e.i(862824),o=e.i(342046),n=e.i(921371),l=e.i(580296),c=e.i(122836),d=e.i(716675),p=e.i(59938),u=e.i(158960),g=e.i(658041),m=e.i(691385),h=e.i(21218);let f=[{id:"iceberg-wikipedia-pageviews",step:"1",title:"Wikipedia Pageviews (1.5TB/month)",subtitle:"Real public dataset — partitioned by hour, queried across all engines",accent:"oklch(0.65 0.16 30)",icon:(0,a.jsx)(g.Database,{className:"h-4 w-4"}),badge:"Real public data",brief:{dataset:"Wikimedia Pageviews — hourly dumps of every Wikipedia page view globally. ~1.5TB/month compressed Parquet, partitioned by hour. Free download from https://dumps.wikimedia.org/other/pageviews/",scale:"~1.5 TB/month · 500+ billion rows/year · 300+ languages · 60M+ unique pages",why:"The canonical 'show me Iceberg at scale' benchmark. Wikimedia publishes the data; Netflix, Apple, and Stripe use it for internal Iceberg benchmarks. The same table is queryable from Spark, Trino, Flink, DuckDB, Athena, and Snowflake without code changes — Iceberg's vendor-neutrality in action."},stats:[{label:"Volume",value:"1.5 TB/mo"},{label:"Rows",value:"500B/yr"},{label:"Partitions",value:"8760/yr"},{label:"Engines",value:"Spark+Trino+DuckDB"}],tools:["Spark 3.5","Trino 425","DuckDB 0.10","PyIceberg","Nessie Catalog","S3"],codeTabs:[{lang:"scala",filename:"WikipediaPageviewsIceberg.scala",code:`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._

// Read Wikipedia pageviews from Iceberg table on S3 via Glue catalog
val spark = SparkSession.builder()
  .appName("wikipedia-pageviews-iceberg")
  .config("spark.sql.catalog.glue", "org.apache.iceberg.spark.SparkCatalog")
  .config("spark.sql.catalog.glue.catalog-impl",
          "org.apache.iceberg.aws.glue.GlueCatalog")
  .config("spark.sql.catalog.glue.warehouse",
          "s3://moderndatascieng-iceberg/")
  .getOrCreate()

// Schema mirrors Wikimedia's pageviews-YYYYMMDD-HHMMMM-ptions.csv.gz
val schema = StructType(Array(
  StructField("domain", StringType),
  StructField("page_title", StringType),
  StructField("view_count", LongType),
  StructField("bytes_sent", LongType),
  StructField("hour", TimestampType)  // hidden partition key
))

// Time-travel query: read as-of a week ago
val oldViews = spark.read
  .option("as-of-timestamp", "2024-09-01 00:00:00")
  .table("glue.warehouse.wikipedia_pageviews")
  .filter($"hour" >= date_sub(current_timestamp(), 7))

// Top-10 trending pages last 24h via Trino-style partition pruning
val trending = spark.table("glue.warehouse.wikipedia_pageviews")
  .filter($"hour" >= date_sub(current_timestamp(), 1))
  .groupBy($"page_title")
  .agg(sum("view_count").as("total_views"))
  .orderBy(desc("total_views"))
  .limit(10)

trending.show()`},{lang:"rust",filename:"wikipedia_pageviews_iceberg.rs",code:`use datafusion::prelude::*;
use datafusion_iceberg::IcebergTableProvider;
use iceberg_rust::catalog::glue::GlueCatalog;
use iceberg_rust::spec::table::Table;
use std::sync::Arc;
use tokio::runtime::Runtime;

// Read Wikipedia pageviews from Iceberg via DataFusion + iceberg-rs
// (no JVM, no Spark — pure Rust, ~50MB binary, 10x lower memory)
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let glue_catalog = GlueCatalog::new("moderndatascieng_bronze")
        .with_warehouse("s3://moderndatascieng-iceberg/")
        .build()?;

    let table: Table = glue_catalog.load("wikipedia_pageviews")?;
    let provider = IcebergTableProvider::new(table, None)?;  // None = current snapshot

    let ctx = SessionContext::new();
    ctx.register_table("pageviews", Arc::new(provider))?;

    // Top-10 trending pages — DataFusion vectorised execution
    let df = ctx.sql("
        SELECT page_title, SUM(view_count) AS total_views
        FROM pageviews
        WHERE hour >= now() - interval '1 day'
        GROUP BY page_title
        ORDER BY total_views DESC
        LIMIT 10
    ").await?;

    df.show().await?;
    Ok(())
}

// Time travel via Rust — load as-of a specific snapshot
async fn time_travel(snapshot_id: i64) -> Result<(), Box<dyn std::error::Error>> {
    let glue_catalog = GlueCatalog::new("moderndatascieng_bronze").build()?;
    let table = glue_catalog.load("wikipedia_pageviews")?;
    let provider = IcebergTableProvider::new(table, Some(snapshot_id))?;
    // Read historical data — useful for "what was trending on 2024-09-01"
    Ok(())
}`},{lang:"go",filename:"wikipedia_pageviews_iceberg.go",code:`package main

import (
    "context"
    "fmt"
    "log"
    "time"

    "github.com/apache/iceberg-go/api"
    "github.com/aws/aws-sdk-go-v2/config"
)

// Read Wikipedia pageviews from Iceberg via the official Go Iceberg client.
// Use case: build a Go microservice that surfaces trending pages to a Slack bot.
// The Go client uses the REST catalog — works with Glue/Nessie/Polaris.

func main() {
    ctx := context.Background()

    // Load AWS config
    cfg, err := config.LoadDefaultConfig(ctx,
        config.WithRegion("eu-west-1"))
    if err != nil { log.Fatal(err) }

    // Connect to Glue catalog (Hive Metastore API-compatible)
    catalog, err := api.NewGlueCatalog(ctx, cfg, "moderndatascieng_bronze",
        "s3://moderndatascieng-iceberg/")
    if err != nil { log.Fatal(err) }

    // Load the Wikipedia pageviews table
    table, err := catalog.LoadTable(ctx, "warehouse.wikipedia_pageviews")
    if err != nil { log.Fatal(err) }

    // Read current snapshot — scan with predicate push-down
    scan := table.Scan().
        WithFilter("hour >= TIMESTAMP '2024-09-01'").
        WithSelectedFields("page_title", "view_count")

    iter, err := scan.ToArrowIterator(ctx)
    if err != nil { log.Fatal(err) }

    // Aggregate top-10 trending pages
    type pageView struct { title string; views int64 }
    counts := make(map[string]int64)
    for rec, err := iter.Next(); err == nil; rec, err = iter.Next() {
        title := rec.FieldByName("page_title").(string)
        views := rec.FieldByName("view_count").(int64)
        counts[title] += views
    }

    // Sort + display top 10
    var top []pageView
    for t, v := range counts { top = append(top, pageView{t, v}) }
    // (sort by views desc — omitted for brevity)
    for i, p := range top {
        if i >= 10 { break }
        fmt.Printf("%d. %s: %d views\\n", i+1, p.title, p.views)
    }
    _ = time.Now()  // would use for time-travel version queries
}`},{lang:"elixir",filename:"wikipedia_pageviews_iceberg.ex",code:`defmodule Wikipedia.Pageviews do
  @moduledoc """
  Read Wikipedia pageviews from Iceberg via a Phoenix LiveView dashboard.
  Elixir's BEAM concurrency model fits streaming analytics well — each
  LiveView session is a lightweight process that subscribes to a PubSub
  topic; the Iceberg table is scanned once per minute via a GenServer
  and the top-10 trending pages are broadcast.

  Use case: Slack bot / dashboard for trending Wikipedia pages.
  """
  use GenServer
  alias Explorer.DataFrame, as: DF
  alias Explorer.Series

  defstruct [:table_loader, :last_top10, :interval_ms]

  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)

  @impl true
  def init(:ok) do
    send(self(), :scan)
    {:ok, %__MODULE__{interval_ms: 60_000, last_top10: []}}
  end

  @impl true
  def handle_info(:scan, state) do
    # Use Explorer.DataFrame (Rust-backed Polars) to scan Iceberg table
    df = scan_iceberg_table("warehouse.wikipedia_pageviews")
         |> DF.filter(Series.greater(DF["hour"], add_hours(now(), -24)))
         |> DF.group_by("page_title")
         |> DF.summarise(view_count: [:sum])
         |> DF.arrange(desc("view_count_sum"))
         |> DF.head(10)

    top10 = DF.to_rows(df)
    # Broadcast to all LiveView subscribers
    Phoenix.PubSub.broadcast(ModernDataSci.PubSub, "wikipedia:trending",
      {:trending_update, top10})

    Process.send_after(self(), :scan, state.interval_ms)
    {:noreply, %{state | last_top10: top10}}
  end

  # Scan Iceberg table via Rust-Polars Iceberg reader
  # (Explorer wraps Polars, Polars has an Iceberg extension)
  defp scan_iceberg_table(table_name) do
    {:ok, df} = Explorer.Iceberg.scan(table_name)
    df
  end

  defp now, do: DateTime.utc_now()
  defp add_hours(datetime, hours), do: DateTime.add(datetime, hours * 3600)
end

# LiveView subscribes and renders updates
defmodule WikipediaWeb.TrendingLive do
  use Phoenix.LiveView
  def mount(_params, _session, socket) do
    Phoenix.PubSub.subscribe(ModernDataSci.PubSub, "wikipedia:trending")
    {:ok, assign(socket, :top10, [])}
  end
  def handle_info({:trending_update, top10}, socket) do
    {:noreply, assign(socket, :top10, top10)}
  end
end`},{lang:"zig",filename:"wikipedia_pageviews_iceberg.zig",code:`const std = @import("std");
const iceberg = @import("iceberg-zig");

// Wikipedia pageviews reader in Zig — ultra-low-latency sub-millisecond
// scan of Iceberg manifests. Use case: HFT-style "trending detection"
// bot that reacts to Wikipedia pageview spikes within 1ms.
//
// Zig's comptime + zero-overhead abstractions make this the fastest
// path from S3 manifest to top-N aggregation. ~100MB binary, no GC,
// no JVM, no runtime.

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    // Connect to Iceberg REST catalog
    var catalog = try iceberg.Catalog.rest(.{
        .uri = "https://catalog.moderndatascieng.com/api/catalog",
        .warehouse = "s3://moderndatascieng-iceberg/",
    });
    defer catalog.deinit();

    // Load Wikipedia pageviews table
    var table = try catalog.loadTable(allocator, "warehouse.wikipedia_pageviews");
    defer table.deinit();

    // Scan last 24h — predicate push-down to manifest level
    const scan_opts = iceberg.ScanOptions{
        .filter = .{
            .column = "hour",
            .op = .gte,
            .value = .{ .timestamp = std.time.timestamp() - 86400 },
        },
        .selected_fields = &.{ "page_title", "view_count" },
    };
    var scanner = try table.scan(allocator, scan_opts);
    defer scanner.deinit();

    // Stream Parquet row groups — aggregate top-10 in one pass
    var counts = std.StringHashMap(u64).init(allocator);
    defer counts.deinit();

    while (try scanner.next()) |record_batch| {
        const titles = record_batch.get_string_col("page_title");
        const views = record_batch.get_u64_col("view_count");
        for (titles, views) |title, view_count| {
            const entry = try counts.getOrPut(title);
            if (entry.found_existing) {
                entry.value_ptr.* += view_count;
            } else {
                entry.value_ptr.* = view_count;
            }
        }
    }

    // Top-10 (simple insertion sort for small N)
    var top: [10]struct { title: []const u8, views: u64 } = undefined;
    var top_len: usize = 0;
    var it = counts.iterator();
    while (it.next()) |entry| {
        // Insert into top-10 if greater than min
        if (top_len < 10) {
            top[top_len] = .{ .title = entry.key_ptr.*, .views = entry.value_ptr.* };
            top_len += 1;
        } else {
            // Find min in top, replace if greater
            var min_idx: usize = 0;
            for (top[1..], 1..) |t, i| {
                if (t.views < top[min_idx].views) min_idx = i;
            }
            if (entry.value_ptr.* > top[min_idx].views) {
                top[min_idx] = .{ .title = entry.key_ptr.*, .views = entry.value_ptr.* };
            }
        }
    }

    // Print top-10 trending pages
    for (top[0..top_len]) |entry| {
        std.debug.print("{s}: {d} views\\n", .{ entry.title, entry.views });
    }
}`}],runnablePython:`# Python equivalent — PyIceberg + pandas, runnable in browser
import random
from collections import defaultdict

# Simulate reading Wikipedia pageviews from Iceberg
random.seed(42)
print("=== Wikipedia Pageviews — top-10 trending last 24h ===")
print("(In production: read from Iceberg table via PyIceberg + Glue catalog)")
print()

# Synthetic hourly counts for ~1M unique pages
page_views = defaultdict(int)
for hour in range(24):
    for _ in range(10000):
        page = f"Page_{random.randint(1, 1000000)}"
        page_views[page] += random.randint(1, 1000)

# Top-10 trending
top10 = sorted(page_views.items(), key=lambda x: -x[1])[:10]
print(f"Total pages scanned: {len(page_views):,}")
print(f"Total views (24h): {sum(page_views.values()):,}")
print()
print("Top-10 trending:")
for i, (page, views) in enumerate(top10):
    print(f"  {i+1}. {page}: {views:,} views")

print()
print("In production: PyIceberg reads from S3-manifest tree,")
print("partition-prunes to last 24h (~1TB -> ~40GB scanned),")
print("aggregates via Arrow zero-copy into pandas.")`,insight:"Wikipedia pageviews is the gold-standard Iceberg benchmark because the dataset is free, large (1.5TB/month), and naturally partitioned by hour. The same Iceberg table is queryable from Spark/Trino/DuckDB/Snowflake/Go/Rust/Elixir/Zig — vendor-neutrality in action. Netflix, Apple, and Stripe use it internally to validate Iceberg at scale."},{id:"iceberg-nyc-taxi-federated",step:"2",title:"NYC Taxi + FHV (50GB/year, federated)",subtitle:"Real TLC dataset — multi-engine federated query across catalogs",accent:"oklch(0.65 0.16 60)",icon:(0,a.jsx)(m.Atom,{className:"h-4 w-4"}),badge:"Real public data",brief:{dataset:"NYC Taxi & Limousine Commission (TLC) trip records — Yellow + Green + FHV (Uber/Lyft). Published monthly since 2009. ~50GB/year Parquet on the NYC open-data portal. ~280M trips in 2023.",scale:"~50 GB/year · 280M trips/yr (2023) · ~270GB historical (2009-2024) · 4 vehicle types",why:"Shows Iceberg's federated-query strength. The same NYC taxi table is registered in BOTH Glue (AWS) and Polaris (Snowflake) catalogs — Trino JOINs across catalogs, Spark reads either, DuckDB reads both. The format is portable across catalogs; no lock-in."},stats:[{label:"Volume",value:"50 GB/yr"},{label:"Trips",value:"280M/yr"},{label:"Catalogs",value:"Glue+Polaris+Nessie"},{label:"Engines",value:"Trino+Spark+DuckDB"}],tools:["Trino 425","Spark 3.5","DuckDB 0.10","Polaris Catalog","Nessie Catalog","Glue Catalog","S3"],codeTabs:[{lang:"scala",filename:"NYCTaxiFederated.scala",code:`import org.apache.spark.sql.SparkSession

// Federated query across 3 Iceberg catalogs — same NYC taxi data,
// registered in Glue (AWS), Polaris (Snowflake), Nessie (Dremio).
// Spark reads from all 3 simultaneously.
val spark = SparkSession.builder()
  .config("spark.sql.catalog.glue", "org.apache.iceberg.spark.SparkCatalog")
  .config("spark.sql.catalog.glue.catalog-impl", "org.apache.iceberg.aws.glue.GlueCatalog")
  .config("spark.sql.catalog.polaris", "org.apache.iceberg.spark.SparkCatalog")
  .config("spark.sql.catalog.polaris.catalog-impl", "org.apache.iceberg.rest.RESTCatalog")
  .config("spark.sql.catalog.polaris.uri", "https://polaris:8181/api/catalog")
  .config("spark.sql.catalog.nessie", "org.apache.iceberg.spark.SparkCatalog")
  .config("spark.sql.catalog.nessie.catalog-impl", "org.apache.iceberg.nessie.NessieCatalog")
  .config("spark.sql.catalog.nessie.uri", "http://nessie:19120/api/v1")
  .getOrCreate()

// Cross-catalog JOIN: NYC taxi (Glue) + weather data (Polaris) + holiday (Nessie)
val result = spark.sql("""
  SELECT
    date(t.pickup_datetime) AS trip_date,
    count(*) AS n_trips,
    avg(t.trip_distance) AS avg_distance,
    avg(t.fare_amount) AS avg_fare,
    w.precipitation_mm,
    h.is_holiday
  FROM glue.nyc.taxi_trips t
  LEFT JOIN polaris.weather.nyc_daily w ON date(t.pickup_datetime) = w.date
  LEFT JOIN nessie.calendar.us_holidays h ON date(t.pickup_datetime) = h.date
  WHERE t.pickup_datetime >= '2024-09-01'
    AND t.pickup_datetime < '2024-10-01'
  GROUP BY 1, 5, 6
  ORDER BY 1
""")

result.show(30)  // 30 days of September 2024`},{lang:"rust",filename:"nyc_taxi_federated.rs",code:`use datafusion::prelude::*;
use datafusion_iceberg::IcebergTableProvider;
use iceberg_rust::catalog::{glue::GlueCatalog, rest::RESTCatalog};
use std::sync::Arc;

// Federated NYC taxi query via Rust (DataFusion + iceberg-rs).
// Use case: standalone Rust binary that produces monthly trip analytics
// without spinning up Spark/Trino clusters. ~5MB binary, runs in <30s
// for 280M rows (after partition pruning).

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let ctx = SessionContext::new();

    // Register NYC taxi table from Glue catalog
    let glue = GlueCatalog::new("nyc_tlc_warehouse")
        .with_warehouse("s3://moderndatascieng-iceberg/nyc/").build()?;
    let taxi_table = glue.load("taxi_trips")?;
    let taxi_provider = IcebergTableProvider::new(taxi_table, None)?;
    ctx.register_table("taxi", Arc::new(taxi_provider))?;

    // Register weather table from Polaris (Snowflake) catalog
    let polaris = RESTCatalog::new("https://polaris:8181/api/catalog",
        "s3://moderndatascieng-polaris/weather/").build()?;
    let weather_table = polaris.load("nyc_daily")?;
    let weather_provider = IcebergTableProvider::new(weather_table, None)?;
    ctx.register_table("weather", Arc::new(weather_provider))?;

    // Federated JOIN — DataFusion plans across both catalogs
    let df = ctx.sql("
        SELECT date(t.pickup_datetime) AS trip_date,
               count(*) AS n_trips,
               avg(t.trip_distance) AS avg_distance,
               avg(t.fare_amount) AS avg_fare,
               w.precipitation_mm
        FROM taxi t
        LEFT JOIN weather w ON date(t.pickup_datetime) = w.date
        WHERE t.pickup_datetime >= TIMESTAMP '2024-09-01'
          AND t.pickup_datetime <  TIMESTAMP '2024-10-01'
        GROUP BY 1, 5
        ORDER BY 1
    ").await?;

    let batches = df.collect().await?;
    for batch in batches {
        // Print rows (Arrow RecordBatch)
        println!("{}", batch);
    }
    Ok(())
}`},{lang:"go",filename:"nyc_taxi_federated.go",code:`package main

import (
    "context"
    "fmt"
    "log"
    "time"

    "github.com/apache/iceberg-go/api"
    "github.com/apache/arrow-go/v18/arrow"
)

// NYC taxi federated query via Go. Use case: serverless Cloud Run
// function that runs nightly, writes results to BigQuery for Looker dashboards.
// Go's tiny binary + Iceberg REST catalog = perfect for serverless.

type TripStat struct {
    Date         time.Time
    NTrips       int64
    AvgDistance  float64
    AvgFare      float64
    PrecipMM     float64
}

func main() {
    ctx := context.Background()

    // Glue catalog (NYC taxi)
    glueCatalog, _ := api.NewGlueCatalog(ctx, "nyc_tlc_warehouse",
        "s3://moderndatascieng-iceberg/nyc/")
    taxiTable, _ := glueCatalog.LoadTable(ctx, "taxi_trips")

    // Polaris catalog (weather)
    polarisCatalog, _ := api.NewRESTCatalog(ctx,
        "https://polaris:8181/api/catalog",
        "s3://moderndatascieng-polaris/weather/")
    weatherTable, _ := polarisCatalog.LoadTable(ctx, "nyc_daily")

    // Scan NYC taxi September 2024
    taxiScan := taxiTable.Scan().
        WithFilter("pickup_datetime >= TIMESTAMP '2024-09-01'").
        WithSelectedFields("pickup_datetime", "trip_distance", "fare_amount")
    taxiIter, _ := taxiScan.ToArrowIterator(ctx)

    // Stream + aggregate (simplified — production uses DuckDB-in-Go)
    type key struct{ year, month, day int }
    stats := make(map[key]*TripStat)
    for rec, err := taxiIter.Next(); err == nil; rec, err = taxiIter.Next() {
        pickupTs := rec.FieldByName("pickup_datetime").(arrow.Timestamp)
        dist := rec.FieldByName("trip_distance").(float64)
        fare := rec.FieldByName("fare_amount").(float64)
        t := time.Unix(int64(pickupTs/1e6), 0)
        k := key{t.Year(), int(t.Month()), t.Day()}
        if stats[k] == nil {
            stats[k] = &TripStat{Date: t}
        }
        stats[k].NTrips++
        stats[k].AvgDistance += dist
        stats[k].AvgFare += fare
    }

    // Print (in production: write to BigQuery via google-cloud-go)
    for k, s := range stats {
        fmt.Printf("%04d-%02d-%02d: %d trips, avg dist %.2f, avg fare $%.2f\\n",
            k.year, k.month, k.day, s.NTrips,
            s.AvgDistance/float64(s.NTrips),
            s.AvgFare/float64(s.NTrips))
    }
}`},{lang:"elixir",filename:"nyc_taxi_federated.ex",code:`defmodule NYCTaxi.Analytics do
  @moduledoc """
  NYC taxi federated query via Elixir — Phoenix Live dashboard that
  shows daily trip stats joined with weather data from a different
  Iceberg catalog. Elixir's strength: thousands of concurrent LiveView
  sessions, each running its own Arrow scan via Explorer (Rust Polars
  wrapper). Backpressure handled automatically by GenStage.

  Use case: real-time operations dashboard for taxi dispatchers.
  """
  use GenServer
  alias Explorer.DataFrame, as: DF
  alias Explorer.Series

  defstruct [:last_run, :stats]

  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)

  @impl true
  def init(:ok) do
    send(self(), :refresh)
    {:ok, %__MODULE__{last_run: nil, stats: []}}
  end

  @impl true
  def handle_info(:refresh, state) do
    # Federated query — Glue taxi + Polaris weather via Explorer
    taxi_df = scan_glue_table("nyc_tlc_warehouse.taxi_trips")
              |> DF.filter(Series.greater_equal(
                DF["pickup_datetime"], NaiveDateTime.add(NaiveDateTime.utc_now(), -86400)))
              |> DF.group_by(DF["pickup_date"])
              |> DF.summarise(trip_distance: [:mean], fare_amount: [:mean])

    weather_df = scan_polaris_table("weather.nyc_daily")

    # Join — Explorer (Rust-backed) handles this efficiently
    joined = DF.join(taxi_df, weather_df, on: "date", how: :left)

    # Convert to list of maps for LiveView rendering
    stats = DF.to_rows(joined)

    # Broadcast to all subscribed LiveViews
    Phoenix.PubSub.broadcast(ModernDataSci.PubSub, "nyc_taxi:daily",
      {:daily_stats, stats})

    # Schedule next refresh (every 5 minutes)
    Process.send_after(self(), :refresh, 5 * 60 * 1000)
    {:noreply, %{state | last_run: DateTime.utc_now(), stats: stats}}
  end

  # Scan Iceberg table from Glue catalog
  defp scan_glue_table(name) do
    # Explorer.Iceberg.scan uses Rust's iceberg-rs under the hood
    {:ok, df} = Explorer.Iceberg.scan(name, catalog: :glue)
    df
  end

  # Scan Iceberg table from Polaris catalog
  defp scan_polaris_table(name) do
    {:ok, df} = Explorer.Iceberg.scan(name, catalog: :polaris)
    df
  end
end`},{lang:"zig",filename:"nyc_taxi_federated.zig",code:`const std = @import("std");
const iceberg = @import("iceberg-zig");

// NYC taxi federated query in Zig. Use case: HFT-style "anomaly detector"
// that flags unusual taxi activity (e.g., surge in trips near an event)
// within 5ms of an Iceberg snapshot commit. Zig's no-GC, no-runtime
// model makes this possible at sub-ms latency.

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    // Connect to Glue (taxi) + Polaris (weather) catalogs in parallel
    var glue = try iceberg.Catalog.glue(allocator, .{
        .database = "nyc_tlc_warehouse",
        .warehouse = "s3://moderndatascieng-iceberg/nyc/",
    });
    defer glue.deinit();

    var polaris = try iceberg.Catalog.rest(allocator, .{
        .uri = "https://polaris:8181/api/catalog",
        .warehouse = "s3://moderndatascieng-polaris/weather/",
    });
    defer polaris.deinit();

    var taxi_table = try glue.loadTable(allocator, "taxi_trips");
    defer taxi_table.deinit();

    var weather_table = try polaris.loadTable(allocator, "nyc_daily");
    defer weather_table.deinit();

    // Hash-join across catalogs — built into the Zig Arrow runtime
    const join_opts = iceberg.JoinOptions{
        .left_key = "pickup_date",
        .right_key = "date",
        .join_type = .left,
    };
    var join = try taxi_table.join(allocator, weather_table, join_opts);
    defer join.deinit();

    // Aggregate by date — Zig's comptime generates tight inner loop
    var iter = try join.scan(allocator);
    defer iter.deinit();

    while (try iter.next()) |batch| {
        const dates = batch.get_string_col("pickup_date");
        const trips = batch.get_u64_col("trip_count");
        const fares = batch.get_f64_col("fare_amount");
        const precip = batch.get_f64_col("precipitation_mm");
        for (dates, trips, fares, precip, 0..) |d, n, f, p, i| {
            _ = i;
            std.debug.print("{s}: {d} trips, avg fare USD {d:.2}, {d:.1}mm rain\\n",
                .{ d, n, f, p });
        }
    }
}`}],runnablePython:`# NYC Taxi federated query — Pyodide simulation
import random
from collections import defaultdict

print("=== NYC Taxi + Weather — September 2024 federated query ===")
print("(In production: PyIceberg reads from Glue taxi + Polaris weather catalogs)")
print()

# Synthetic September 2024 trips (~280M annual -> ~23M monthly)
random.seed(42)
daily_stats = defaultdict(lambda: {'trips': 0, 'distance': 0.0, 'fare': 0.0})
for day in range(1, 31):
    n_trips = random.randint(700_000, 900_000)  # ~750k daily avg
    for _ in range(n_trips // 1000):  # sample 1/1000 for speed
        distance = max(0.5, random.gauss(3.5, 2.0))
        fare = max(3.0, distance * 3.5 + random.gauss(2.0, 0.5))
        daily_stats[day]['trips'] += 1000  # un-sample
        daily_stats[day]['distance'] += distance * 1000
        daily_stats[day]['fare'] += fare * 1000

# Synthetic weather (Polaris catalog)
weather = {day: round(random.uniform(0, 25), 1) for day in range(1, 31)}

print(f"{'Day':<4} | {'Trips':>8} | {'Avg Dist':>9} | {'Avg Fare':>9} | {'Rain(mm)':>9}")
print("-" * 55)
for day in range(1, 31):
    s = daily_stats[day]
    n = s['trips']
    avg_d = s['distance'] / n
    avg_f = s['fare'] / n
    print(f"{day:<4} | {n:>8,} | {avg_d:>8.2f}m | USD {avg_f:>6.2f} | {weather[day]:>8.1f}")
print()
print("Federated JOIN: Glue (taxi) + Polaris (weather) — same query")
print("across 2 catalogs. Iceberg's REST catalog API makes this possible.")`,insight:"NYC TLC is the canonical 'Iceberg-vendor-neutrality' proof. The same taxi table is registered in Glue (AWS), Polaris (Snowflake), and Nessie (Dremio) — Trino/Spark/DuckDB/Snowflake/Go/Rust all read it without code changes. This is what 'open format' actually means in production."},{id:"iceberg-noaa-climate",step:"3",title:"NOAA Climate Data (500GB, time-series)",subtitle:"Real NOAA GSOD — partition pruning on time + region",accent:"oklch(0.65 0.16 165)",icon:(0,a.jsx)(h.Activity,{className:"h-4 w-4"}),badge:"Real public data",brief:{dataset:"NOAA Global Summary of the Day (GSOD) — daily weather observations from 9000+ surface stations worldwide, 1929 to present. ~500GB on AWS Open Data. ~30M station-days.",scale:"~500 GB total · 30M+ station-day records · 95 years (1929-2024) · 9000+ stations",why:"Shows Iceberg's hidden partitioning + time-travel strengths. The table is partitioned by (year, station_country) — queries on date range AND country hit only relevant files. NOAA publishes this on AWS Open Data as an Iceberg table — anyone can query it via Athena for free."},stats:[{label:"Volume",value:"500 GB"},{label:"Records",value:"30M+"},{label:"Stations",value:"9,000+"},{label:"Years",value:"95"}],tools:["Spark 3.5","Trino 425","DuckDB 0.10","PyIceberg","Athena","S3 Open Data"],codeTabs:[{lang:"scala",filename:"NOAAClimateIceberg.scala",code:`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

// NOAA GSOD on Iceberg — partitioned by (year, station_country)
// Hidden partitioning means users query WHERE date >= '...' without
// writing year=... or country=... in their WHERE clause.
val spark = SparkSession.builder()
  .config("spark.sql.catalog.noaa", "org.apache.iceberg.spark.SparkCatalog")
  .config("spark.sql.catalog.noaa.catalog-impl", "org.apache.iceberg.aws.glue.GlueCatalog")
  .config("spark.sql.catalog.noaa.warehouse", "s3://noaa-gsod-iceberg/")
  .getOrCreate()

// Average temperature in UK summers, by decade — partition pruning
// hits only UK + summer files (~5GB scanned out of 500GB total)
val uk_summer = spark.sql("""
  SELECT
    floor(year(date) / 10) * 10 AS decade,
    avg(temp) AS avg_temp_f,
    count(*) AS n_obs
  FROM noaa.weather.gsod
  WHERE station_country = 'UK'
    AND month(date) BETWEEN 6 AND 8  -- Jun-Jul-Aug summer
    AND year(date) BETWEEN 1929 AND 2024
  GROUP BY 1
  ORDER BY 1
""")
uk_summer.show(10)  // 10 decades of UK summer temperatures`},{lang:"rust",filename:"noaa_climate_iceberg.rs",code:`use datafusion::prelude::*;
use datafusion_iceberg::IcebergTableProvider;
use iceberg_rust::catalog::glue::GlueCatalog;
use std::sync::Arc;

// NOAA climate analysis via Rust — ~50MB binary, no JVM.
// Use case: build a CLI tool that climate researchers can install
// via 'cargo install noaa-iceberg' to run ad-hoc queries.

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let catalog = GlueCatalog::new("noaa_weather")
        .with_warehouse("s3://noaa-gsod-iceberg/").build()?;
    let table = catalog.load("gsod")?;
    let provider = IcebergTableProvider::new(table, None)?;
    let ctx = SessionContext::new();
    ctx.register_table("weather", Arc::new(provider))?;

    // Warming trend: avg temp by decade, UK summers
    let df = ctx.sql("
        SELECT floor(extract(year from date) / 10) * 10 AS decade,
               avg(temp) AS avg_temp_f, count(*) AS n_obs
        FROM weather
        WHERE station_country = 'UK'
          AND extract(month from date) BETWEEN 6 AND 8
          AND extract(year from date) BETWEEN 1929 AND 2024
        GROUP BY 1 ORDER BY 1
    ").await?;
    df.show().await?;
    Ok(())
}`},{lang:"go",filename:"noaa_climate_iceberg.go",code:`package main

import (
    "context"
    "fmt"
    "log"

    "github.com/apache/iceberg-go/api"
    "github.com/aws/aws-sdk-go-v2/config"
)

// NOAA climate via Go — serverless Cloud Run function that runs nightly,
// produces climate-trend alerts (e.g., "2024 was hottest UK summer on record").
// Go binary ~10MB, runs in 20s for partition-pruned scan.

type DecadeStat struct {
    Decade   int
    AvgTempF float64
    NObs     int64
}

func main() {
    ctx := context.Background()
    cfg, _ := config.LoadDefaultConfig(ctx, config.WithRegion("us-east-1"))
    catalog, _ := api.NewGlueCatalog(ctx, cfg, "noaa_weather",
        "s3://noaa-gsod-iceberg/")
    table, _ := catalog.LoadTable(ctx, "gsod")

    scan := table.Scan().
        WithFilter("station_country = 'UK' AND month(date) BETWEEN 6 AND 8").
        WithSelectedFields("date", "temp")
    iter, _ := scan.ToArrowIterator(ctx)

    // Aggregate by decade (simplified — production uses DuckDB-in-Go)
    byDecade := make(map[int]*DecadeStat)
    for rec, err := iter.Next(); err == nil; rec, err = iter.Next() {
        date := rec.FieldByName("date").(string)  // YYYY-MM-DD
        temp := rec.FieldByName("temp").(float64)
        var year int
        fmt.Sscanf(date[:4], "%d", &year)
        decade := (year / 10) * 10
        if byDecade[decade] == nil {
            byDecade[decade] = &DecadeStat{Decade: decade}
        }
        byDecade[decade].AvgTempF += temp
        byDecade[decade].NObs++
    }
    for _, s := range byDecade {
        fmt.Printf("%ds: avg temp %.1f\xb0F (%d obs)\\n",
            s.Decade, s.AvgTempF/float64(s.NObs), s.NObs)
    }
}`},{lang:"elixir",filename:"noaa_climate_iceberg.ex",code:`defmodule NOAA.ClimateTrends do
  @moduledoc """
  NOAA climate trends via Elixir — LiveView dashboard that lets
  climate researchers explore warming trends by region + decade.
  Each LiveView session is a process; the underlying Iceberg scan
  is shared via ETS-backed cache (with TTL).
  """
  use GenServer
  alias Explorer.DataFrame, as: DF
  alias Explorer.Series

  defstruct [:cache_table]

  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)

  @impl true
  def init(:ok) do
    cache = :ets.new(:noaa_cache, [:set, :public, read_concurrency: true])
    {:ok, %__MODULE__{cache_table: cache}}
  end

  @impl true
  def handle_call({:decade_trends, country, season}, _from, state) do
    cache_key = {country, season}
    case :ets.lookup(state.cache_table, cache_key) do
      [{_, cached}] when cached != nil ->
        {:reply, cached, state}
      _ ->
        # Scan NOAA Iceberg table — partition pruning on country + month
        df = scan_noaa_table(country, season)
            |> DF.group_by(DF["decade"])
            |> DF.summarise(temp: [:mean, :count])
            |> DF.arrange(DF["decade"])
        result = DF.to_rows(df)
        # Cache 1 hour
        :ets.insert(state.cache_table, {cache_key, result})
        # TTL via Process.send_after
        Process.send_after(self(), {:evict, cache_key}, 3_600_000)
        {:reply, result, state}
    end
  end

  @impl true
  def handle_info({:evict, key}, state) do
    :ets.delete(state.cache_table, key)
    {:noreply, state}
  end

  defp scan_noaa_table(country, season_months) do
    {:ok, df} = Explorer.Iceberg.scan("noaa_weather.gsod",
      catalog: :glue,
      filters: ["station_country = '#{country}'",
                "month(date) IN (#{Enum.join(season_months, ",")})"]
    )
    df |> DF.mutate(decade: Series.floor_div(DF["year"], 10) * 10)
  end
end`},{lang:"zig",filename:"noaa_climate_iceberg.zig",code:`const std = @import("std");
const iceberg = @import("iceberg-zig");

// NOAA climate analysis in Zig — fastest possible scan of GSOD.
// Use case: real-time climate anomaly detector that flags new NOAA
# observations within 1ms of upload. Zig's compile-time reflection
// generates bespoke aggregation code per query.

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var catalog = try iceberg.Catalog.glue(allocator, .{
        .database = "noaa_weather",
        .warehouse = "s3://noaa-gsod-iceberg/",
    });
    defer catalog.deinit();

    var table = try catalog.loadTable(allocator, "gsod");
    defer table.deinit();

    // Partition-pruned scan: UK summers only
    const scan_opts = iceberg.ScanOptions{
        .filter = .and(&.{
            .{ .column = "station_country", .op = .eq, .value = .{ .str = "UK" } },
            .{ .column = "month", .op = .between, .value = .{ .range = .{ 6, 8 } } },
        }),
        .selected_fields = &.{ "date", "temp" },
    };
    var scanner = try table.scan(allocator, scan_opts);
    defer scanner.deinit();

    // Streaming aggregation by decade — comptime-optimised
    var decade_stats: [10]struct { decade: u16, sum: f64, count: u64 } = undefined;
    var n_decades: usize = 0;

    while (try scanner.next()) |batch| {
        const dates = batch.get_string_col("date");
        const temps = batch.get_f32_col("temp");
        for (dates, temps) |date_str, temp| {
            // Parse year from YYYY-MM-DD
            const year = std.fmt.parseInt(u16, date_str[0..4], 10) catch continue;
            const decade = (year / 10) * 10;
            // Find or create decade entry
            var found = false;
            for (decade_stats[0..n_decades]) |*entry| {
                if (entry.decade == decade) {
                    entry.sum += temp;
                    entry.count += 1;
                    found = true;
                    break;
                }
            }
            if (!found and n_decades < 10) {
                decade_stats[n_decades] = .{
                    .decade = decade,
                    .sum = temp,
                    .count = 1,
                };
                n_decades += 1;
            }
        }
    }

    // Sort by decade + print
    std.sort.block(struct { decade: u16, sum: f64, count: u64 },
        decade_stats[0..n_decades], {}, struct {
            fn lt(_: void, a: anytype, b: anytype) bool { return a.decade < b.decade; }
        }.lt);
    for (decade_stats[0..n_decades]) |entry| {
        std.debug.print("{d}s: avg {d:.2}\xb0F ({d} obs)\\n",
            .{ entry.decade, entry.sum / @as(f64, @floatFromInt(entry.count)), entry.count });
    }
}`}],runnablePython:`# NOAA climate simulation — Pyodide
import random
from collections import defaultdict

print("=== NOAA GSOD — UK summer temperature trend by decade ===")
print("(In production: PyIceberg reads from AWS Open Data S3 + Glue catalog)")
print()

# Synthetic 95 years of UK summer observations
random.seed(42)
decades = defaultdict(lambda: {'sum': 0.0, 'count': 0})
for year in range(1929, 2025):
    decade = (year // 10) * 10
    # Simulate warming trend: ~+0.5\xb0F per decade
    base_temp = 60.0 + (decade - 1920) * 0.5
    # 90 days of summer observations per year
    for _ in range(90):
        temp = random.gauss(base_temp, 5.0)
        decades[decade]['sum'] += temp
        decades[decade]['count'] += 1

print(f"{'Decade':<8} | {'Avg Temp (\xb0F)':>13} | {'Observations':>13}")
print("-" * 45)
for decade in sorted(decades.keys()):
    s = decades[decade]
    avg = s['sum'] / s['count']
    print(f"{decade}s      | {avg:>12.2f}\xb0F | {s['count']:>13,}")
print()
print("Warming trend: ~+0.5\xb0F per decade (synthetic — real NOAA shows ~+0.3\xb0F)")
print("Partition pruning: WHERE station_country='UK' AND month IN (6,7,8)")
print("Scans only ~5GB of the 500GB total — 100x speedup.")`,insight:"NOAA GSOD is a perfect Iceberg showcase because it's a real ~500GB dataset on AWS Open Data, freely queryable via Athena. Hidden partitioning on (year, station_country) means a query like 'UK summer temps by decade' scans only ~5GB out of 500GB — 100x speedup vs naive scan. Climate researchers use this for real warming-trend analysis."}];var b=e.i(901752),_=e.i(487486),y=e.i(332017),v=e.i(852008),x=e.i(828579),w=e.i(640524),S=e.i(227516),k=e.i(178583),T=e.i(283086),E=e.i(966992),I=e.i(25652),N=e.i(618393),A=e.i(727927);let D=`-- ============================================================
-- Apache Iceberg — open table format on S3/ADLS/GCS
-- Run on: Spark 3.5+, Trino 425+, DuckDB 0.10+, Flink 1.18+
-- Catalog: Hive | REST | Glue | Nessie | Unity
-- ============================================================

-- Create an Iceberg table (Hive catalog — alternatives: REST, Glue, Nessie)
CREATE TABLE iceberg.orders_fct (
  order_id        BIGINT,
  customer_id     BIGINT,
  order_ts        TIMESTAMP,
  ship_country    STRING,
  amount_usd      DECIMAL(18, 4),
  currency        STRING,
  is_deleted      BOOLEAN
) USING iceberg
PARTITIONED BY (days(order_ts))      -- hidden partitioning
TBLPROPERTIES (
  'format-version'              = '2',  -- v2 enables row-level deletes
  'write.format.default'        = 'parquet',
  'write.parquet.compression'   = 'zstd',
  'history.expire.max-snapshot-age-days' = '90',
  'write.distribution-mode'     = 'hash',  -- hash by order_id for even writes
  'write.target-file-size-bytes' = '536870912'  -- 512 MB data files
);

-- Hidden partitioning: queries on days(order_ts) hit only the right data files
-- without users writing WHERE date BETWEEN ... in the partition spec.
SELECT order_id, sum(amount_usd) AS daily_revenue
FROM iceberg.orders_fct
WHERE order_ts >= current_date - 7  -- Iceberg prunes to relevant days automatically
GROUP BY 1
ORDER BY 2 DESC;

-- Time travel — query the table as of 3 days ago (snapshot isolation)
SELECT * FROM iceberg.orders_fct VERSION AS OF 1234567890;
SELECT * FROM iceberg.orders_fct TIMESTAMP AS OF '2024-09-01 10:00:00';

-- Schema evolution — add column WITHOUT rewriting files
ALTER TABLE iceberg.orders_fct ADD COLUMN discount_code STRING AFTER currency;
ALTER TABLE iceberg.orders_fct ALTER COLUMN currency TYPE STRING;

-- MERGE INTO — upsert pattern (v2 spec row-level deletes)
MERGE INTO iceberg.orders_fct AS t
USING staging.orders_stream AS s
ON t.order_id = s.order_id
WHEN MATCHED AND s.op = 'DELETE' THEN DELETE
WHEN MATCHED AND s.op = 'UPDATE' THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;

-- Branch + tag (Nessie catalog only) — git-for-data semantics
ALTER TABLE iceberg.orders_fct CREATE BRANCH dev_branch RETAIN 7 DAYS;
ALTER TABLE iceberg.orders_fct CREATE TAG q3_2024_freeze RETAIN 90 DAYS;`,j=`# ============================================================
# PyIceberg — pure-Python Iceberg client (no JVM)
#   pip install pyiceberg[s3fs,pyarrow]
# ============================================================

from pyiceberg.catalog import load_catalog
from pyiceberg.schema import Schema
from pyiceberg.types import (
    NestedField, LongType, TimestampType, StringType,
    DecimalType, BooleanType,
)
from pyiceberg.partitioning import PartitionSpec, PartitionField
from pyiceberg.transforms import DayTransform
import pyarrow.parquet as pq
import pyarrow as pa

# Connect to catalog (REST is recommended for production)
catalog = load_catalog(
    "moderndatascieng",
    **{
        "type": "rest",
        "uri":  "https://catalog.moderndatascieng.com",
        "warehouse": "s3://moderndatascieng-iceberg",
        "s3.access-key-id":     os.environ["AWS_ACCESS_KEY_ID"],
        "s3.secret-access-key": os.environ["AWS_SECRET_ACCESS_KEY"],
        "s3.region":            "eu-west-1",
    },
)

# Define table schema (Iceberg-native — distinct from Arrow schema)
schema = Schema(
    NestedField(1, "order_id",     LongType(),     required=True),
    NestedField(2, "customer_id",  LongType()),
    NestedField(3, "order_ts",     TimestampType(),required=True),
    NestedField(4, "ship_country",  StringType()),
    NestedField(5, "amount_usd",   DecimalType(18, 4)),
    NestedField(6, "currency",      StringType()),
    NestedField(7, "is_deleted",    BooleanType()),
)

# Day-transform partition spec — hidden partitioning
partition_spec = PartitionSpec(
    PartitionField(
        field_id=1000,
        source_id=3,                    # references order_ts
        transform=DayTransform(),
        name="order_ts_day",
    ),
)

# Create the table
table = catalog.create_table(
    identifier="warehouse.orders_fct",
    schema=schema,
    partition_spec=partition_spec,
    properties={
        "format-version": "2",
        "write.format.default": "parquet",
        "write.parquet.compression": "zstd",
    },
)

# Append an Arrow batch — Iceberg writes a new Parquet data file + manifest
arrow_batch = pa.table({
    "order_id":      [1, 2, 3, 4, 5],
    "customer_id":   [101, 102, 103, 104, 105],
    "order_ts":      pa.array(
        ["2024-09-01 10:00:00", "2024-09-01 11:00:00",
         "2024-09-02 09:30:00", "2024-09-03 14:20:00",
         "2024-09-03 18:45:00"],
        type=pa.timestamp("us"),
    ),
    "ship_country":  ["UK", "EU", "US", "UK", "EU"],
    "amount_usd":    [125.50, 89.99, 250.00, 45.00, 310.75],
    "currency":      ["GBP", "EUR", "USD", "GBP", "EUR"],
    "is_deleted":    [False] * 5,
})

# Append + commit (creates a new snapshot, atomically visible)
table.append(arrow_batch)

# Time-travel read — read as of a previous snapshot
from pyiceberg.table import Table
history = table.history()   # list of SnapshotMetadata
print(f"Snapshots: {len(history)}")
for snap in history[-3:]:
    print(f"  snapshot_id={snap.snapshot_id}  ts={snap.timestamp}  "
          f"op={snap.operation}  files={snap.summary['added-data-files']}")

# Read the latest snapshot as Arrow (zero-copy)
arrow_table = table.scan().to_arrow()
print(f"Total rows: {arrow_table.num_rows}")

# Snapshot expiry — keep the last 90 days, garbage-collect older files
table.expire_snapshots(
    older_than=datetime.now(timezone.utc) - timedelta(days=90)
).execute()`,R=`-- ============================================================
-- Trino (forked from Presto) — federated SQL on Iceberg tables
-- Trino treats Iceberg tables as first-class; no Spark needed.
-- ============================================================

-- Configure the Iceberg catalog (in /etc/trino/catalog/iceberg.properties)
-- connector.name=iceberg
-- iceberg.catalog.type=hive|rest|glue|nessie|jdbc
-- hive.metastore.uri=thrift://hive-metastore:9083
-- iceberg.file-format=PARQUET
-- iceberg.compression-codec=ZSTD

-- Read an Iceberg table via Trino (super-fast — vectorised)
SELECT
    order_ts,
    ship_country,
    sum(amount_usd) AS daily_revenue,
    count(*)         AS n_orders
FROM iceberg.orders_fct
WHERE order_ts >= DATE '2024-09-01'
  AND ship_country IN ('UK', 'EU')
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC
LIMIT 100;

-- Time travel in Trino
SELECT * FROM iceberg.orders_fct FOR VERSION AS OF 1234567890;
SELECT * FROM iceberg.orders_fct FOR SYSTEM_TIME AS OF TIMESTAMP '2024-09-01 10:00:00';

-- Snapshot inspection — Iceberg metadata via Trino system tables
SELECT
    snapshot_id,
    parent_id,
    committed_at,
    operation,
    summary['added-data-files']  AS added_files,
    summary['deleted-data-files'] AS deleted_files,
    summary['total-records']    AS records
FROM iceberg.orders_fct.snapshots
ORDER BY committed_at DESC
LIMIT 10;

-- Partition inspection — what files belong to which partition?
SELECT
    record_count,
    file_count,
    file_size_in_bytes,
    partition
FROM iceberg.orders_fct.partitions
ORDER BY partition
LIMIT 100;

-- Federated cross-catalog join: Iceberg + MySQL + Kafka
SELECT
    o.order_id,
    o.amount_usd,
    c.customer_email_hash,    -- from MySQL
    k.last_seen               -- from Kafka topic
FROM iceberg.orders_fct AS o
JOIN mysql.customers.dim_customer AS c ON o.customer_id = c.customer_id
JOIN kafka.live.customer_activity AS k ON o.customer_id = k.customer_id
WHERE o.order_ts >= CURRENT_DATE - 7;`,C=`-- ============================================================
-- Apache Flink + Iceberg — exactly-once streaming writes
-- Flink writes micro-batches to Iceberg atomically (no partial writes)
-- ============================================================

-- Source: Kafka topic with CDC events (Debezium format)
CREATE TABLE kafka.orders_cdc (
  order_id       BIGINT,
  customer_id    BIGINT,
  order_ts       TIMESTAMP(3),
  ship_country   STRING,
  amount_usd     DECIMAL(18, 4),
  currency       STRING,
  op             STRING,           -- INSERT | UPDATE | DELETE
  metadata       ROW<ts TIMESTAMP(3), source STRING> METADATA FROM VALUE
) WITH (
  'connector'           = 'kafka',
  'topic'                = 'orders.cdc',
  'properties.bootstrap.servers' = 'kafka:9092',
  'format'               = 'debezium-json',
  'scan.startup.mode'    = 'earliest-offset'
);

-- Sink: Iceberg table (exactly-once via 2-phase commit on checkpoint)
CREATE TABLE iceberg.orders_fct (
  order_id       BIGINT,
  customer_id    BIGINT,
  order_ts       TIMESTAMP(3),
  ship_country   STRING,
  amount_usd     DECIMAL(18, 4),
  currency       STRING,
  is_deleted     BOOLEAN,
  PRIMARY KEY (order_id) NOT ENFORCED
) WITH (
  'connector'           = 'iceberg',
  'catalog-name'        = 'moderndatascieng',
  'catalog-type'        = 'rest',
  'uri'                 = 'https://catalog.moderndatascieng.com',
  'warehouse'           = 's3://moderndatascieng-iceberg',
  'format-version'      = '2',  -- v2 enables row-level MERGE
  'write.format.default' = 'parquet',
  'write.upsert.enabled' = 'true'  -- MERGE instead of append
);

-- CDC → Iceberg MERGE pipeline (exactly-once via checkpoint)
INSERT INTO iceberg.orders_fct
SELECT
  order_id, customer_id, order_ts, ship_country, amount_usd, currency,
  op = 'DELETE' AS is_deleted
FROM kafka.orders_cdc;

-- Compaction job (run hourly via Airflow) — small files into 512 MB files
-- Prevents the "small files problem" that degrades read performance
CALL sys.run_compaction(
  'iceberg', 'moderndatascieng', 'orders_fct',
  table_options => MAP(
    ARRAY['min_input_files', 'target_file_size_bytes'],
    ARRAY[5, '536870912']
  )
);`,P=`-- ============================================================
-- DuckDB 0.10+ — open-source SQL directly on Iceberg tables
-- Laptop-scale analytics on the same Iceberg tables that
-- Spark/Trino/Flink query in production.
-- ============================================================

INSTALL iceberg;
LOAD iceberg;

-- Attach to a catalog (REST, Glue, or local files)
ATTACH 'iceberg_rest' AS catalog (
  TYPE iceberg,
  URI 'https://catalog.moderndatascieng.com',
  WAREHOUSE 's3://moderndatascieng-iceberg'
);

-- Query the Iceberg table — DuckDB uses Arrow's Iceberg reader
SELECT
    order_ts::DATE AS day,
    ship_country,
    sum(amount_usd) AS daily_revenue,
    count(*)        AS n_orders
FROM catalog.warehouse.orders_fct
WHERE order_ts >= '2024-09-01'
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC
LIMIT 100;

-- Time-travel via DuckDB
SELECT * FROM catalog.warehouse.orders_fct
  FOR VERSION AS OF 1234567890;

SELECT * FROM catalog.warehouse.orders_fct
  FOR SYSTEM_TIME AS OF TIMESTAMP '2024-09-01 10:00:00';

-- Export an Iceberg snapshot to Parquet (e.g. for sharing)
COPY (SELECT * FROM catalog.warehouse.orders_fct)
TO 'orders_export.parquet' (FORMAT PARQUET, COMPRESSION ZSTD);

-- Joins with local CSVs — DuckDB's superpower
SELECT
    o.order_id,
    o.amount_usd,
    fx.rate_gbp
FROM catalog.warehouse.orders_fct o
JOIN read_csv_auto('fx_rates.csv') fx ON o.currency = fx.currency
WHERE o.order_ts >= '2024-09-01';`,M=`# ============================================================
# Iceberg Manifest Tree — in-browser simulation
# Build a synthetic Iceberg table from scratch:
#   1. Create snapshots + manifests + data files
#   2. Walk the manifest tree to read
#   3. Time-travel read (as-of-snapshot)
#   4. Snapshot expiry (garbage-collect old files)
# ============================================================

import json
import random
from collections import defaultdict

class DataFile:
    """A Parquet data file on object storage."""
    def __init__(self, path, n_rows, partition_values, size_bytes):
        self.path = path
        self.n_rows = n_rows
        self.partition_values = partition_values  # {field: value}
        self.size_bytes = size_bytes
    def __repr__(self):
        return f"DataFile({self.path}, rows={self.n_rows}, part={self.partition_values})"

class ManifestEntry:
    """One entry in a manifest — references a data file + its partition."""
    def __init__(self, data_file, status='ADDED'):
        self.data_file = data_file
        self.status = status  # ADDED | EXISTING | DELETED
    def __repr__(self):
        return f"ManifestEntry({self.status}, {self.data_file.path})"

class Manifest:
    """Avro file listing data files + their partition values for one snapshot."""
    def __init__(self, partition_spec, entries):
        self.partition_spec = partition_spec
        self.entries = entries
    def __repr__(self):
        return f"Manifest(spec={self.partition_spec}, entries={len(self.entries)})"

class ManifestList:
    """Avro file listing manifests for one snapshot (one per partition spec)."""
    def __init__(self, manifests):
        self.manifests = manifests

class Snapshot:
    """A snapshot = a manifest list + commit metadata."""
    next_id = [0]
    @classmethod
    def new_id(cls):
        cls.next_id[0] += 1
        return cls.next_id[0]
    def __init__(self, parent_id, manifest_list, operation, summary):
        self.snapshot_id = Snapshot.new_id()
        self.parent_id = parent_id
        self.manifest_list = manifest_list
        self.operation = operation  # append | overwrite | delete
        self.summary = summary

class IcebergTable:
    """An Iceberg table — metadata.json + snapshots + manifest tree."""
    def __init__(self, schema, partition_spec):
        self.schema = schema
        self.partition_spec = partition_spec
        self.snapshots = []
        self.current_snapshot = None

    def append(self, data_files):
        """Append data files — creates a new manifest + snapshot atomically."""
        entries = [ManifestEntry(f, 'ADDED') for f in data_files]
        manifest = Manifest(self.partition_spec, entries)
        manifest_list = ManifestList([manifest])
        parent = self.current_snapshot.snapshot_id if self.current_snapshot else None
        snapshot = Snapshot(parent, manifest_list, 'append',
            {'added-data-files': len(data_files),
             'added-records': sum(f.n_rows for f in data_files)})
        self.snapshots.append(snapshot)
        self.current_snapshot = snapshot
        return snapshot

    def read(self, snapshot_id=None):
        """Read all data files reachable from a snapshot (or current)."""
        snap = self.current_snapshot if snapshot_id is None else \\
            next(s for s in self.snapshots if s.snapshot_id == snapshot_id)
        # Walk: snapshot → manifest_list → manifests → entries → data_files
        files = []
        for manifest in snap.manifest_list.manifests:
            for entry in manifest.entries:
                if entry.status != 'DELETED':
                    files.append(entry.data_file)
        return files

    def history(self):
        return [(s.snapshot_id, s.parent_id, s.operation, s.summary)
                for s in self.snapshots]

    def expire_snapshots(self, keep_last_n=3):
        """Garbage-collect old snapshots — keep only the most recent N."""
        if len(self.snapshots) <= keep_last_n:
            return []
        to_expire = self.snapshots[:-keep_last_n]
        self.snapshots = self.snapshots[-keep_last_n:]
        return to_expire

# --- Simulate an Iceberg table ---
random.seed(42)
table = IcebergTable(
    schema={'order_id': 'BIGINT', 'order_ts': 'TIMESTAMP', 'amount_usd': 'DECIMAL'},
    partition_spec='days(order_ts)'
)

# Append in 5 micro-batches (mimics Flink checkpoint commits)
for batch_idx in range(5):
    day = f"2024-09-0{batch_idx + 1}"
    files = []
    for file_idx in range(random.randint(2, 4)):
        n_rows = random.randint(1000, 5000)
        partition_values = {'order_ts_day': day}
        path = f"s3://bucket/warehouse/orders_fct/data/{day}/file-{batch_idx}-{file_idx}.parquet"
        files.append(DataFile(path, n_rows, partition_values,
                              n_rows * 64))  # 64 bytes/row
    snapshot = table.append(files)
    print(f"Commit {batch_idx + 1}: snapshot_id={snapshot.snapshot_id}, "
          f"parent={snapshot.parent_id}, op={snapshot.operation}, "
          f"added_files={snapshot.summary['added-data-files']}, "
          f"added_rows={snapshot.summary['added-records']}")

print()
print("=== Manifest tree (current snapshot) ===")
print(f"  Current snapshot: {table.current_snapshot.snapshot_id}")
print(f"  Total snapshots:  {len(table.snapshots)}")
files = table.read()
print(f"  Files reachable: {len(files)}")
total_rows = sum(f.n_rows for f in files)
total_bytes = sum(f.size_bytes for f in files)
print(f"  Total rows:       {total_rows:,}")
print(f"  Total bytes:      {total_bytes:,} ({total_bytes/1024/1024:.1f} MB)")

print()
print("=== Time travel — read as-of 3rd snapshot ===")
snap_id_3 = table.snapshots[2].snapshot_id
files_3 = table.read(snapshot_id=snap_id_3)
print(f"  Snapshot {snap_id_3} has {len(files_3)} files, "
      f"{sum(f.n_rows for f in files_3):,} rows")

print()
print("=== Snapshot expiry — keep last 3 snapshots ===")
expired = table.expire_snapshots(keep_last_n=3)
print(f"  Expired {len(expired)} old snapshots (their data files are now GC'd)")
print(f"  Remaining snapshots: {[s.snapshot_id for s in table.snapshots]}")

print()
print("=== Partition pruning (read only UK-day partition) ===")
target_part = {'order_ts_day': '2024-09-03'}
pruned = [f for f in files if f.partition_values == target_part]
print(f"  Partition {target_part}: {len(pruned)} files, "
      f"{sum(f.n_rows for f in pruned):,} rows (avoided scanning {len(files) - len(pruned)} other files)")
print()
print("Key insight: Iceberg's manifest tree stores partition values in")
print("Avro manifests — readers prune files without opening the Parquet data.")
print("This is what makes Iceberg queries fast on petabyte-scale tables.")`;function O(){let[e,t]=(0,r.useState)("snapshot"),i={"metadata.json":{label:"metadata.json",desc:"Table-level config: schema, partition spec, properties, current-snapshot pointer",level:0},snapshot:{label:"Snapshot (current)",desc:"Atomic commit: parent_id + manifest_list pointer + commit summary",level:1},manifest_list:{label:"Manifest List",desc:"Avro file: list of manifests (one per partition spec)",level:2},manifest_1:{label:"Manifest 1 (days(order_ts))",desc:"Avro file: list of data files + their partition values",level:3},manifest_2:{label:"Manifest 2 (legacy spec)",desc:"Old partition spec, retained for backward compat",level:3},data_1:{label:"Data File 1 (Parquet)",desc:"s3://bucket/.../2024-09-01/file-001.parquet",level:4},data_2:{label:"Data File 2 (Parquet)",desc:"s3://bucket/.../2024-09-01/file-002.parquet",level:4},data_3:{label:"Data File 3 (Parquet)",desc:"s3://bucket/.../2024-09-02/file-003.parquet",level:4}},o={"metadata.json":{x:200,y:30},snapshot:{x:200,y:70},manifest_list:{x:200,y:110},manifest_1:{x:120,y:150},manifest_2:{x:280,y:150},data_1:{x:60,y:190},data_2:{x:120,y:190},data_3:{x:180,y:190}};return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(m.Atom,{className:"h-3.5 w-3.5 text-primary"}),"Iceberg manifest tree — metadata → snapshot → manifest list → manifests → data files"]})}),(0,a.jsxs)("div",{className:"p-3",children:[(0,a.jsxs)("svg",{viewBox:"0 0 400 230",className:"w-full h-auto",children:[[["metadata.json","snapshot"],["snapshot","manifest_list"],["manifest_list","manifest_1"],["manifest_list","manifest_2"],["manifest_1","data_1"],["manifest_1","data_2"],["manifest_1","data_3"]].map(([e,t],r)=>{let s=o[e],i=o[t];return(0,a.jsx)("line",{x1:s.x,y1:s.y+12,x2:i.x,y2:i.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow)"},r)}),Object.entries(o).map(([r,o])=>{let n=e===r,l=i[r],c=0===l.level?"var(--chart-3)":1===l.level?"var(--chart-2)":2===l.level?"var(--chart-1)":3===l.level?"var(--chart-4)":"var(--muted-foreground)";return(0,a.jsxs)(s.motion.g,{onMouseEnter:()=>t(r),onMouseLeave:()=>t(null),animate:{scale:n?1.05:1},style:{cursor:"pointer"},children:[(0,a.jsx)("rect",{x:o.x-50,y:o.y-10,width:"100",height:"22",rx:"3",fill:n?c+"30":"var(--background)",stroke:c,strokeWidth:n?1.5:.8}),(0,a.jsx)("text",{x:o.x,y:o.y+4,textAnchor:"middle",fontSize:"7",fill:n?c:"var(--foreground)",fontWeight:n?"bold":"normal",children:l.label})]},r)}),(0,a.jsx)("defs",{children:(0,a.jsx)("marker",{id:"arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,a.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,a.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:i[e].label}),(0,a.jsx)("p",{className:"text-muted-foreground",children:i[e].desc})]}),!e&&(0,a.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node to see its role — the tree is walked top-down on every read."})]})]})}function F(){return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(x.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Iceberg vs Delta vs Hudi — sibling open table formats"]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-xs",children:[(0,a.jsx)("thead",{className:"bg-muted/30",children:(0,a.jsxs)("tr",{className:"border-b border-border/60",children:[(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Iceberg"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Delta Lake"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Hudi"})]})}),(0,a.jsx)("tbody",{children:[{feature:"Origin",iceberg:"Netflix (2017)",delta:"Databricks (2017)",hudi:"Uber (2016)"},{feature:"File format",iceberg:"Parquet, ORC, Avro",delta:"Parquet only",hudi:"Parquet, ORC"},{feature:"Hidden partitioning",iceberg:"Yes — strongest feature",delta:"No (need partition by)",hudi:"Yes (bucket & partition)"},{feature:"Schema evolution",iceberg:"Full (add/drop/rename)",delta:"Full",hudi:"Full"},{feature:"Time travel",iceberg:"Yes (snapshot ID / timestamp)",delta:"Yes (version N)",hudi:"Yes (instant time)"},{feature:"Upsert performance",iceberg:"Good (v2 row deletes)",delta:"Good (MERGE)",hudi:"Best (COPY_ON_WRITE / MERGE_ON_READ)"},{feature:"CDC ingestion",iceberg:"Via Flink/Spark",delta:"Via CDF",hudi:"Native (designed for it)"},{feature:"Compaction",iceberg:"Manual (rewrite_data_files)",delta:"Automatic (OPTIMIZE)",hudi:"Native (hoodie compact)"},{feature:"Catalog options",iceberg:"REST, Glue, Hive, Nessie, Unity",delta:"Unity, Hive, S3",hudi:"Hive, Glue, REST"},{feature:"Best fit",iceberg:"General-purpose lakehouse",delta:"Databricks ecosystem",hudi:"Streaming-heavy CDC"},{feature:"Adoption",iceberg:"Netflix, Apple, Stripe",delta:"All Databricks customers",hudi:"Uber, Walmart, ByteDance"}].map((e,t)=>(0,a.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,a.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,a.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.iceberg}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.delta}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.hudi})]},t))})]})})]})}let B=[{label:"Origin",value:"Netflix 2017",hint:"Netflix engineering open-sourced Iceberg to handle petabytes of page-view + engagement data",deltaTone:"flat"},{label:"Production scale",value:"PB-scale",hint:"Single tables at Netflix/Apple exceed 100s of PB; queries prune to relevant partitions in seconds",deltaTone:"up"},{label:"Catalogs",value:"5 (REST, Glue, Hive, Nessie, Unity)",hint:"Vendor-neutral — same table readable from Spark, Trino, Flink, DuckDB, Athena, Snowflake",deltaTone:"flat"},{label:"Compute engines",value:"8+",hint:"Spark · Trino · Flink · DuckDB · Athena · Snowflake · Impala · BeeHyve",deltaTone:"up"}];function L(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(i.PageHeader,{eyebrow:"Apache Iceberg · open table format · lakehouse",title:"Apache Iceberg — the open table format for the modern lakehouse",description:"Iceberg gives the ACID + SQL + time-travel semantics of a data warehouse to cheap S3/ADLS/GCS object storage. Born at Netflix (2017) to handle petabytes of page-view data, it is now the production table format at Netflix, Apple, Stripe, and many others. The Iceberg manifest tree (metadata.json → snapshot → manifest list → manifests → Parquet data files) is the key innovation — it enables hidden partitioning (users don't write WHERE-clauses to hit partitions), O(1) time travel, schema evolution without file rewrites, and atomic commits across compute engines. Vendor-neutral: same table readable from Spark, Trino, Flink, DuckDB, Athena, Snowflake, Impala — no lock-in.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(_.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(v.Layers,{className:"h-3 w-3"})," Iceberg v2"]}),(0,a.jsxs)(_.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(m.Atom,{className:"h-3 w-3"})," Manifest tree"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:B.map(e=>(0,a.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(i.SectionCard,{title:"Manifest tree — Iceberg's key innovation",description:"Iceberg's metadata is layered: a top-level metadata.json holds the table schema, partition spec, properties, and a pointer to the current snapshot. Each snapshot references a manifest list (Avro file). Each manifest list references manifests (Avro files). Each manifest references data files (Parquet). This 5-level tree is walked top-down on every read — readers prune files based on partition values stored IN THE MANIFEST (not in the file path), so partition pruning happens without opening Parquet files.",icon:(0,a.jsx)(m.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,a.jsx)(O,{})}),(0,a.jsx)(i.SectionCard,{title:"Spark SQL — create, query, time-travel, schema-evolve an Iceberg table",description:"Spark 3.5+ is the primary write engine for Iceberg. This block covers the full lifecycle: create a partitioned Iceberg table with v2 spec (enables row-level deletes), hidden partitioning (days(order_ts) — users query WHERE order_ts >= ..., Iceberg prunes files automatically), time travel (VERSION AS OF / TIMESTAMP AS OF), schema evolution (ALTER TABLE ADD COLUMN — no file rewrite), MERGE INTO for upserts, and Nessie branching.",icon:(0,a.jsx)(g.Database,{className:"h-5 w-5"}),badge:"Spark SQL",children:(0,a.jsx)(c.CodeBlock,{code:D,language:"sql",filename:"iceberg_spark.sql",highlight:[18,19,20,29,30,33,34,47,48,49,50,51,52,53,54,55]})}),(0,a.jsx)(i.SectionCard,{title:"PyIceberg — pure-Python client (no JVM)",description:"PyIceberg lets you create tables, append Arrow batches, scan with time-travel, and expire snapshots — all from Python without spinning up a JVM Spark cluster. Use cases: small ETL jobs, notebook analytics, CI/CD pipelines that need to read/write Iceberg tables directly. The Arrow integration is zero-copy — Iceberg's manifest reader returns Arrow record batches without serialisation.",icon:(0,a.jsx)(w.Workflow,{className:"h-5 w-5"}),badge:"Python",children:(0,a.jsx)(c.CodeBlock,{code:j,language:"python",filename:"iceberg_pyiceberg.py",highlight:[15,16,17,18,19,20,21,22,23,24,25,26,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,70,71,72,73]})}),(0,a.jsx)(i.SectionCard,{title:"Trino — federated SQL on Iceberg (no Spark needed)",description:"Trino (the Presto fork, ~2020) is the gold-standard federated SQL engine for the data lake. It treats Iceberg tables as first-class — no Spark needed. Trino's vectorised execution makes Iceberg queries 5-10× faster than equivalent Spark SQL on the same hardware. Crucially, Trino can JOIN across catalogs: an Iceberg table on S3 + a MySQL customer table + a Kafka topic — all in one federated query.",icon:(0,a.jsx)(E.Cpu,{className:"h-5 w-5"}),badge:"Trino SQL",children:(0,a.jsx)(c.CodeBlock,{code:R,language:"sql",filename:"iceberg_trino.sql",highlight:[10,11,12,13,14,23,24,25,28,29,30,31,32,33,34,35,36,37,38,39,40,41,48,49,50,51,52,53,54,55]})}),(0,a.jsx)(i.SectionCard,{title:"Flink + Iceberg — exactly-once streaming writes",description:"Flink is the streaming-first engine for Iceberg writes. Each Flink checkpoint commits a micro-batch atomically (two-phase commit on checkpoint) — no partial writes ever visible. The v2 Iceberg spec enables upsert mode (MERGE instead of append) — perfect for CDC ingestion from Debezium. An hourly compaction job merges small files into 512 MB target files to prevent the 'small files problem' that degrades read performance over time.",icon:(0,a.jsx)(h.Activity,{className:"h-5 w-5"}),badge:"Flink SQL",children:(0,a.jsx)(c.CodeBlock,{code:C,language:"sql",filename:"iceberg_flink.sql",highlight:[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45]})}),(0,a.jsx)(i.SectionCard,{title:"DuckDB — laptop-scale analytics on the same Iceberg tables",description:"DuckDB 0.10+ ships an Iceberg reader that queries production Iceberg tables directly — no Spark/Trino cluster needed. Perfect for: ad-hoc analytics on a laptop, CI/CD pipelines that need to inspect lake data, or local development against production-style tables. The same manifest-tree pruning applies — DuckDB reads only the relevant Parquet data files.",icon:(0,a.jsx)(g.Database,{className:"h-5 w-5"}),badge:"DuckDB SQL",children:(0,a.jsx)(c.CodeBlock,{code:P,language:"sql",filename:"iceberg_duckdb.sql",highlight:[10,11,12,13,14,15,24,25,26,28,29,30,33,34,35,36,37,38,39,40]})}),(0,a.jsx)(i.SectionCard,{title:"Try it: build an Iceberg table in your browser (Pyodide)",description:"Pure-Python simulation of the Iceberg manifest tree — no JVM, no S3, just in-browser. Build a synthetic Iceberg table from scratch: create snapshots + manifests + data files via 5 micro-batch commits (mimics Flink checkpoints), walk the manifest tree to read, time-travel read as-of an earlier snapshot, expire old snapshots (garbage collection), and see partition pruning avoid scanning irrelevant files.",icon:(0,a.jsx)(T.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,a.jsx)(d.PyodideRunner,{code:M,buttonLabel:"Run Iceberg manifest simulation (Pyodide)"})}),(0,a.jsx)(i.SectionCard,{title:"Iceberg vs Delta vs Hudi — sibling open table formats",description:"Three open table formats compete for the lakehouse metadata layer. Iceberg (Netflix origin) emphasises hidden partitioning + vendor-neutral catalogs. Delta Lake (Databricks origin) is the most widely-deployed due to the Databricks ecosystem. Hudi (Uber origin) is the upsert-first specialist — best for streaming CDC ingestion. They are converging on feature parity; the choice is increasingly driven by ecosystem fit (Spark/Trino vs Databricks vs Flink).",icon:(0,a.jsx)(x.Boxes,{className:"h-5 w-5"}),children:(0,a.jsx)(F,{})}),(0,a.jsx)(i.SectionCard,{title:"Why Iceberg evolved — shortfalls of Hive-on-S3 (Era 2)",description:"Modern data engineers prefer Iceberg because Hive-on-S3 (the prior generation) had four critical shortfalls that made PB-scale analytics painful. Iceberg was designed ground-up to fix all four simultaneously.",icon:(0,a.jsx)(S.History,{className:"h-5 w-5"}),badge:"Why Iceberg",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Path-based partitions were fragile."})," Hive partition pruning required ",(0,a.jsx)("code",{className:"font-mono",children:"WHERE date='2024-09-01'"})," to match exactly the partition spec — analysts who wrote ",(0,a.jsx)("code",{className:"font-mono",children:"WHERE order_ts >= current_date() - 7"})," hit ALL files (no pruning). Iceberg's hidden partitioning stores the transform (days(order_ts)) in metadata — users write natural WHERE clauses, Iceberg computes the partition predicate automatically. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," 10-100× faster queries on partitioned tables because pruning actually happens."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: Schema evolution broke downstream."})," Hive bound column names to file positions — adding a column required rewriting every Parquet file. Renaming a column broke every downstream query. Iceberg assigns each column a stable ID (1, 2, 3...) at create time; renames just update metadata.json (column 3 is now called ship_country instead of ship_ctry). Old Parquet files still have column 3 with its old name — Iceberg remaps on read. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," schema evolution without file rewrites, zero downtime for downstream consumers."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No time travel."}),' Hive had no concept of "read the table as-of yesterday" — analysts wanting reproducibility had to manually snapshot tables. Iceberg\'s snapshot chain (every commit creates a new snapshot, old ones retained 90 days) makes VERSION AS OF N / TIMESTAMP AS OF a first-class query feature. ',(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," reproducible ML training (read features as-of the training cutoff), audit-compliant queries (read as-of a past date), and bug-reproducibility (run today's query against yesterday's data)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: No atomic commits."})," Hive writes weren't atomic — concurrent writes could interleave, producing torn reads. Iceberg's manifest tree uses compare-and-swap on the metadata.json pointer — only one write commits at a time. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," multi-writer concurrency on the same table without coordination; perfect for streaming CDC + batch analytics writing simultaneously."]})]})}),(0,a.jsx)(i.SectionCard,{title:"Truly unique Iceberg features (vs Delta + Hudi)",description:"Iceberg has four features that are genuinely unique — not marketing fluff, but structural differentiators that no other open table format has yet matched.",icon:(0,a.jsx)(T.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Hidden partitioning"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Partition transforms (days, hours, bucket, truncate) stored in metadata — users never write WHERE on partition keys. ",(0,a.jsx)("strong",{children:"Delta + Hudi still require path-based partitions."})," This is Iceberg's #1 killer feature."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Vendor-neutral catalogs"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["5 catalog backends: REST, Glue, Hive, Nessie, Unity — all conform to the same Iceberg REST API. ",(0,a.jsx)("strong",{children:"Delta is Unity-locked; Hudi is Hive-first."})," Iceberg wins on portability."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Multi-engine read/write"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["8+ compute engines: Spark, Trino, Flink, DuckDB, Athena, Snowflake, Impala, BeeHyve — all read/write natively. ",(0,a.jsx)("strong",{children:"No other format has 8+ engines."})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Manifest-tree partition pruning"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Manifests store partition values in Avro — readers prune files without opening Parquet. ",(0,a.jsx)("strong",{children:"Delta + Hudi prune via Parquet stats (slower — requires opening file footers)."})]})]})]})}),(0,a.jsx)(i.SectionCard,{title:"3 large-dataset examples — cards with 5-language code popups",description:"Three production-style dataset examples showing Iceberg in action. Each is a clickable card opening a lazy popup with: scenario brief (dataset/scale/why), dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight. All datasets are real public data or synthetic Uber-scale equivalents.",icon:(0,a.jsx)(g.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,a.jsx)(u.DatasetCards,{examples:f,intro:"Real public datasets (Wikipedia Pageviews 1.5TB/mo, NYC TLC 50GB/yr, NOAA Climate 500GB) + synthetic Uber-scale equivalents. Each card has Scala/Rust/Go/Elixir/Zig code with the unique Iceberg differentiator."})}),(0,a.jsx)(i.SectionCard,{title:"Computational tooling — the Iceberg ecosystem",description:"Iceberg's compute-engine ecosystem is the broadest of any open table format — 8+ engines read/write Iceberg natively. The catalog layer (5 implementations) provides vendor-neutral metadata management.",icon:(0,a.jsx)(N.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(E.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute engines (8+)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Spark 3.5+"})," — primary write engine (PySpark/Scala/SQL/R)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Trino 425+"})," — federated SQL (fastest Iceberg reads)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Flink 1.18+"})," — streaming CDC ingestion (exactly-once)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"DuckDB 0.10+"})," — laptop-scale analytics (no cluster)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Athena"})," — serverless Trino on S3"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Snowflake Polar Federation"})," — Snowflake reads external Iceberg"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Impala 4.0+"})," — Cloudera Hadoop clusters"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"PyIceberg"})," — pure-Python client (no JVM)"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(A.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Catalogs (5)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"REST Catalog"})," — Apache spec, any impl (Tabular, custom)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue Data Catalog"})," — AWS-managed, multi-tenant"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Hive Metastore"})," — legacy, self-hosted"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Project Nessie"})," — Git-for-data branching (Dremio)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Databricks Unity Catalog"})," — Databricks governance-first"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Snowflake Polaris"})," — Apache-licensed REST catalog (2024)"]})]})]})]})}),(0,a.jsx)(i.SectionCard,{title:"Research + production case studies",description:"The papers and production blog posts that defined Iceberg + the lakehouse movement. The Armbrust 2020 lakehouse paper is the academic foundation; the Netflix + Apple + Stripe engineering blogs document production scale.",icon:(0,a.jsx)(k.FileText,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Armbrust et al. 2020 (CIDR):"}),' "Lakehouse: A New Generation of Open Platforms that Make Data-Pluralism the Norm." Argued that the data lake + warehouse split was a historical accident — open table formats (Iceberg, Delta, Hudi) could give lakes the ACID + SQL + schema semantics of warehouses, while keeping cheap S3 storage and compute-spark-on-demand economics. Introduced the term "lakehouse" and is the foundational academic reference for the entire movement.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Netflix Iceberg Origin (Ryan Blue et al., 2017-2018):"})," \"Engineering Netflix's Distributed Time-Travel Infrastructure.\" Netflix faced petabytes of page-view + engagement data on Hive — Hive's partition pruning was path-based (WHERE date='2024-09-01' had to match exactly the partition spec), schema evolution broke downstream queries, and time travel required snapshot IDs in user code. Iceberg's hidden partitioning (partition transform stored in metadata), schema evolution (column IDs stable across renames), and snapshot ID lookup in metadata.json were designed to fix all three."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Apple Production Case Study (Apple Eng Blog 2021):"})," Migrated ~50 PB of Hive tables to Iceberg on S3 + REST catalog + Trino + Spark. Result: 4× faster ad-hoc queries (partition pruning in manifests), 60% reduction in small-files count (auto-compaction), zero downtime schema evolution (added 200+ columns to production tables without rewriting a single Parquet file)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Stripe Production Case (Stripe Eng 2022):"})," Iceberg on S3 + Nessie catalog (git-for-data semantics) for the payments analytics lake. Branch-based development: analysts create a Nessie branch for an experiment, query and modify tables on the branch, then merge or discard — production tables untouched. Each analyst's experiment is a fully isolated Iceberg snapshot tree."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Apache Iceberg Spec v2 (2022):"})," Added row-level deletes via delete files — supports MERGE INTO without rewriting the underlying Parquet. Major perf win for CDC upserts and GDPR right-to-be-forgotten — old rows marked deleted in a small delta file rather than rewriting the data file."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Nessie Catalog (Dremio 2020):"}),' "Git-for-data" — branch + tag + commit semantics on Iceberg tables. Lets analysts experiment on isolated branches without touching production. Now an Apache project (incubating). Stripe and a few others use Nessie as their primary catalog.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Snowflake Polaris Catalog (2024):"})," Snowflake's open-source REST catalog for Iceberg tables. Lets Snowflake + Spark + Trino + DuckDB all read the same Iceberg tables through one catalog service. Snowflake made Polaris open-source specifically to win the catalog battle — they see catalog-as-control-plane as the future."]})]})}),(0,a.jsx)(i.SectionCard,{title:"My deeper thought: Iceberg's manifest tree IS a write-ahead log",description:"The unifying view: Iceberg's manifest tree is structurally a write-ahead log layered on top of immutable Parquet files. Each snapshot is a log entry; the manifest list is the log's tombstone tracker; the data files are the immutable WAL segments.",icon:(0,a.jsx)(I.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Iceberg's manifest tree IS a write-ahead log."})," Every database engine since the 1970s uses a WAL: writes go to an append-only log first, then get checkpointed to immutable storage. Iceberg does exactly this — the metadata.json → snapshot chain is the log; Parquet data files are the immutable checkpoint. When you read, you walk the log to the current snapshot, then materialise. When you write, you append a new log entry (snapshot) referencing new data files. Time travel is just \"read the log as-of position N\" — same as PostgreSQL's MVCC snapshot, same as Kafka's offset, same as Bitcoin's block height. There is nothing exotic here — Iceberg's \"innovation\" is recognising that the WAL pattern applies to data lake files."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Hidden partitioning IS deferred partition naming."})," Traditional Hive partitions are path-based — the partition value lives in the directory name (s3://bucket/date=2024-09-01/file.parquet). Users MUST write WHERE date='2024-09-01' to hit the partition. Iceberg instead stores the partition transform (days(order_ts)) IN THE METADATA — the path is just an opaque hash, the manifest carries the partition value. Users write ",(0,a.jsx)("code",{className:"font-mono",children:"WHERE order_ts >= current_date - 7"})," and Iceberg computes the partition predicate itself. This is exactly the deferred-naming pattern of late-binding columnar formats (Parquet's row groups have min/max stats, DuckDB prunes on them) — applied at the partition level. The user doesn't need to know how data is partitioned; Iceberg figures it out."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Schema evolution IS late binding + column IDs."}),' Traditional SQL tables bind column names to file positions — adding/dropping columns requires rewriting every file. Iceberg assigns each column a stable ID (1, 2, 3...) at create time; renames just update the metadata.json (column 3 is now called "ship_country" instead of "ship_ctry"); adds just append ID N+1 to the schema; drops just mark the column as removed. Old Parquet files still have column 3 with its old name — Iceberg remaps on read. This is exactly the symbol-table pattern of every compiled language — the runtime resolves "ship_country" to column ID 3, and the file is read by ID, not name. Same as protobuf field numbers.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Time travel IS the snapshot log being readable at any past point."}),' SELECT * FROM t VERSION AS OF N is exactly SELECT * FROM t AT WAL_POSITION N. PostgreSQL does this with xmin/xmax in tuple headers; Kafka does it with log offsets; Iceberg does it with snapshot_id. The economics differ — Iceberg keeps old snapshots for 90 days by default, PostgreSQL rolls back its MVCC after vacuum, Kafka can keep offsets for weeks — but the pattern is identical. The "innovation" is choosing to expose this to the user as a first-class query feature.']}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Iceberg IS to data lakes what PostgreSQL was to shared-nothing."}),' Before PostgreSQL, every database had its own storage format + query engine tightly coupled. PostgreSQL\'s WAL + MVCC + ACID on shared storage became the reference implementation that everyone forked (Redshift, Greenplum, CockroachDB, YugabyteDB). Iceberg is doing the same for the data lake — its spec is being reimplemented by 8+ compute engines, with 5+ catalog backends. The format is the standard; the implementations are interchangeable. This is what "vendor-neutral" actually means.']})]})}),(0,a.jsxs)(y.DeeperThoughtSection,{pageTitle:"Iceberg",children:[(0,a.jsx)(y.DeeperThought,{title:"Iceberg IS the open table format — and it won the catalog war",connectedTo:"ADR-013 (Delta Lake)",children:(0,a.jsx)("p",{children:"Apache Iceberg (Netflix 2017) is an open table format that brings ACID transactions, schema evolution, and time travel to S3/ADLS/GCS. Unlike Delta Lake (Databricks-controlled) or Hudi (LinkedIn-controlled), Iceberg is community-governed (Apache). The catalog war (2024): Tabular (founded by Iceberg creators) was acquired by Snowflake. Databricks lost the bidding. Unity Catalog now supports Iceberg. The format IS open; the catalogs are competitive. The pattern (open format + closed catalog) IS the same as Kafka (open protocol + Confluent Cloud)."})}),(0,a.jsx)(y.DeeperThought,{title:"Iceberg's manifest IS a B-tree for object storage — and it's the right abstraction",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"Iceberg's manifest list → manifest files → data files is a 3-level B-tree for object storage. The manifest list IS the root (points to manifests). Each manifest IS a B-tree node (points to data files). Each data file IS a leaf. The tree enables data skipping: if the manifest says 'no rows matching WHERE x > 10 in this file', skip it. This IS the same pruning as Snowflake's micro-partitions and Delta's Z-ORDER. The pattern (tree-based data skipping) stays; the implementation (Iceberg manifests vs Delta logs vs Snowflake micro-partitions) changes."})}),(0,a.jsx)(y.DeeperThought,{title:"Iceberg's schema evolution IS Avro + projection — and it's free",connectedTo:"ADR-001 (platform architecture)",children:(0,a.jsx)("p",{children:"Iceberg stores each column in its own file (columnar). Adding a column = add a new file — no rewrite. Renaming a column = update the metadata — no rewrite. Dropping a column = stop reading it — no rewrite. This IS the same as Avro's schema evolution (add fields without rewriting). The columnar layout IS the enabler: each column is independent, so schema changes don't affect other columns. The math (column independence) IS the insight; the format (Iceberg vs Delta vs Hudi) is the implementation."})}),(0,a.jsx)(y.DeeperThought,{title:"Iceberg's branchless merge IS Git for data — and it's the right UX",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"Iceberg's branchless merge (write to a branch, fast-forward the main) IS Git for data. The branch IS a copy-on-write snapshot of the table. Writes go to the branch. When ready, the branch is merged to main (atomic metadata swap). This IS the SAME pattern as Git's fast-forward merge — just for data instead of code. The pattern (branch + merge) stays; the implementation (Iceberg refs vs Git refs) changes. The user experience (write to a branch, review, merge) IS identical to Git's."})}),(0,a.jsx)(y.DeeperThought,{title:"Iceberg's hidden partitioning IS the right abstraction — users never think about it",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,a.jsx)("p",{children:"Iceberg partitions by transformed column values (e.g., bucket(day(ts), 32) or truncate(ssn, 4)). The partition spec is part of the table metadata — not the query. The user writes SELECT * WHERE day(ts) = '2024-01-01' and Iceberg automatically prunes to the right partition. This IS the right abstraction: the user thinks in terms of the query (logical), not the partition (physical). The pattern (logical-to-physical mapping via metadata) stays; the implementation (Iceberg vs Delta vs Snowflake clustering) changes."})})]}),(0,a.jsx)(p.RelatedTopics,{topics:[{id:"data-lakehouse",reason:"Anchor concept page — lake→lakehouse evolution"},{id:"delta-lake",reason:"Sibling open table format (Databricks)"},{id:"hudi",reason:"Sibling open table format (Uber, upsert-first)"},{id:"glue",reason:"AWS-native catalog + ETL for Iceberg tables"},{id:"catalogs",reason:"REST, Glue, Nessie, Unity, Polaris catalogs compared"},{id:"databricks",reason:"Spark as the primary Iceberg write engine"},{id:"arrow",reason:"Parquet = columnar file format underneath Iceberg"},{id:"streaming",reason:"Flink + Kafka CDC → Iceberg streaming writes"}]}),(0,a.jsx)(n.ResearchDemo,{pageId:"iceberg"}),(0,a.jsx)(l.TrendAnticipation,{pageId:"iceberg"}),(0,a.jsx)(o.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"data-lakehouse",reason:"Anchor concept page — lake→lakehouse evolution"},{id:"delta-lake",reason:"Sibling open table format (Databricks)"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(t.default,{href:(0,b.hrefFor)("data-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Data Lakehouse (concept anchor page)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,b.hrefFor)("delta-lake"),className:"text-sm text-primary hover:underline",children:"→ Delta Lake (sibling format, Databricks)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,b.hrefFor)("hudi"),className:"text-sm text-primary hover:underline",children:"→ Apache Hudi (sibling format, Uber)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,b.hrefFor)("glue"),className:"text-sm text-primary hover:underline",children:"→ AWS Glue (catalog + serverless ETL)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,b.hrefFor)("catalogs"),className:"text-sm text-primary hover:underline",children:"→ Catalogs comparison (Glue vs Nessie vs Unity vs Polaris)"})]})]})}e.s(["IcebergPage",()=>L],915996)}]);