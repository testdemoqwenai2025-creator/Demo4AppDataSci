(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,546208,e=>{"use strict";var a=e.i(843476),r=e.i(522016),t=e.i(271645),s=e.i(846932),o=e.i(862824),i=e.i(342046),n=e.i(122836),l=e.i(716675),c=e.i(59938),d=e.i(158960),u=e.i(804785),g=e.i(658041),p=e.i(691385),m=e.i(21218),h=e.i(581418),f=e.i(852008);let b=[{id:"science-genomics-1000g",step:"1",title:"1000 Genomes Project on Iceberg (100TB)",subtitle:"Life sciences — whole-genome variants partitioned by chromosome + population",accent:"oklch(0.65 0.16 30)",icon:(0,a.jsx)(g.Database,{className:"h-4 w-4"}),badge:"Life Sciences · Genomics",brief:{dataset:"1000 Genomes Project — whole-genome sequencing data for 2,504 individuals across 26 populations. ~100TB VCF files on S3, stored as Iceberg tables partitioned by chromosome + population. Free download from NIH.",scale:"~100TB · 2,504 individuals · 3 billion SNPs · 26 populations · 22 chromosomes",why:"Genomics IS the original big-data problem — 3 billion base pairs × 2,504 individuals = 7.5 trillion data points. The medallion pattern: Bronze (raw VCF from sequencer) → Silver (normalised + QC-filtered variants) → Gold (population-level allele frequencies + GWAS statistics). Iceberg's hidden partitioning on (chromosome, population) enables sub-second variant queries."},stats:[{label:"Volume",value:"100 TB"},{label:"Individuals",value:"2,504"},{label:"SNPs",value:"3 billion"},{label:"Populations",value:"26"}],tools:["Apache Iceberg","Apache Spark","GATK","Hail","ADAM","Trino","S3"],codeTabs:[{lang:"scala",filename:"GenomicsMedallion.scala",code:`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

// 1000 Genomes on Iceberg — Bronze→Silver→Gold medallion for genomics
val spark = SparkSession.builder()
  .config("spark.sql.catalog.iceberg", "org.apache.iceberg.spark.SparkCatalog")
  .config("spark.sql.catalog.iceberg.catalog-impl", "org.apache.iceberg.aws.glue.GlueCatalog")
  .config("spark.sql.catalog.iceberg.warehouse", "s3://genomics-iceberg/")
  .getOrCreate()

// Bronze: raw VCF parsed into structured rows (from 1000 Genomes FTP)
val bronze = spark.read.format("csv").option("delimiter", "\\t")
  .schema("chrom STRING, pos LONG, id STRING, ref STRING, alt STRING, qual DOUBLE, filter STRING, info STRING")
  .load("s3://genomics-bronze/1000g/vcf/")
  .withColumn("population", split(input_file_name(), "/").getItem(4))
  .withColumn("ingest_ts", current_timestamp())

bronze.writeTo("iceberg.bronze.variants_raw").createOrReplace()

// Silver: normalise multi-allelic + QC filter + annotate
val silver = spark.table("iceberg.bronze.variants_raw")
  .filter($"qual" > 30 && $"filter".contains("PASS"))
  .withColumn("alt_alleles", split($"alt", ","))  // split multi-allelic
  .selectExpr("chrom", "pos", "ref", "explode(alt_alleles) as alt", "population")

silver.writeTo("iceberg.silver.variants_qc")
  .merge($"chrom" === silver("chrom") && $"pos" === silver("pos")).execute()

// Gold: population-level allele frequencies (GWAS-ready)
val gold = spark.table("iceberg.silver.variants_qc")
  .groupBy($"chrom", $"pos", $"ref", $"alt", $"population")
  .agg(
    count("*").as("allele_count"),
    collect_set("individual_id").as("carriers")
  )
  .withColumn("allele_freq", size($"carriers") / lit(2504.0))

gold.writeTo("iceberg.gold.allele_frequencies")
  .partitionedBy("chrom", "population")
  .createOrReplace()

// Query: find variants with frequency > 10% in European populations
spark.sql("""
  SELECT chrom, pos, ref, alt, allele_freq
  FROM iceberg.gold.allele_frequencies
  WHERE population LIKE 'EUR%' AND allele_freq > 0.10
  ORDER BY allele_freq DESC LIMIT 100
""").show()`},{lang:"rust",filename:"genomics_medallion.rs",code:`use iceberg_rust::catalog::glue::GlueCatalog;
use arrow::array::RecordBatch;

// Rust genomics reader — uses iceberg-rs for zero-JVM variant queries.
// Use case: GATK-like variant caller that reads from Iceberg instead of VCF files.

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let catalog = GlueCatalog::new("genomics_warehouse")
        .with_warehouse("s3://genomics-iceberg/").build()?;

    // Read allele frequencies (Gold tier) — partitioned by chromosome
    let gold = catalog.load("gold.allele_frequencies")?;
    let batch = gold.scan()
        .with_filter("chrom = 'chr17' AND population LIKE 'EUR%' AND allele_freq > 0.10")
        .to_arrow().await?;

    println!("Found {} high-frequency variants on chr17 in EUR populations",
        batch.num_rows());
    Ok(())
}`},{lang:"go",filename:"genomics_medallion.go",code:`package main

import (
    "context"
    "fmt"

    "github.com/apache/iceberg-go/api"
)

// Go genomics reader — serverless function for GWAS lookup.
// Use case: Cloud Run function that returns population-level allele freqs.

func main() {
    ctx := context.Background()
    catalog, _ := api.NewGlueCatalog(ctx, "genomics_warehouse",
        "s3://genomics-iceberg/")
    table, _ := catalog.LoadTable(ctx, "gold.allele_frequencies")

    scan := table.Scan().
        WithFilter("chrom = 'chr17' AND population LIKE 'EUR%' AND allele_freq > 0.10")
    iter, _ := scan.ToArrowIterator(ctx)
    for rec, err := iter.Next(); err == nil; rec, err = iter.Next() {
        fmt.Printf("chr17:%d %s>%s freq=%.4f pop=%s\\n",
            rec.GetInt64(0, "pos"),
            rec.GetString(0, "ref"),
            rec.GetString(0, "alt"),
            rec.GetFloat64(0, "allele_freq"),
            rec.GetString(0, "population"))
    }
}`},{lang:"elixir",filename:"genomics_medallion.ex",code:`defmodule Genomics.PopulationBrowser do
  @moduledoc """
  Phoenix LiveView dashboard for exploring allele frequencies across
  populations. Each chromosome+population partition is cached in ETS.
  """
  use GenServer
  alias Explorer.DataFrame, as: DF

  defstruct [:cache]

  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)

  @impl true
  def init(:ok) do
    cache = :ets.new(:allele_cache, [:set, :public, read_concurrency: true])
    {:ok, %__MODULE__{cache: cache}}
  end

  @impl true
  def handle_call({:lookup, chrom, population, min_freq}, _from, state) do
    key = {chrom, population, min_freq}
    case :ets.lookup(state.cache, key) do
      [{_, cached}] -> {:reply, cached, state}
      _ ->
        {:ok, df} = Explorer.Iceberg.scan("gold.allele_frequencies",
          filters: ["chrom = '#{chrom}'", "population LIKE '#{population}%'",
                    "allele_freq > #{min_freq}"])
        rows = DF.to_rows(df)
        :ets.insert(state.cache, {key, rows})
        Process.send_after(self(), {:evict, key}, 3_600_000)
        {:reply, rows, state}
    end
  end

  @impl true
  def handle_info({:evict, key}, state) do
    :ets.delete(state.cache, key)
    {:noreply, state}
  end
end`},{lang:"zig",filename:"genomics_medallion.zig",code:`const std = @import("std");
const iceberg = @import("iceberg-zig");

// Zig genomics reader — ultra-fast variant lookup for GWAS pipelines.
// Use case: bioinformatics pipeline that needs sub-ms allele frequency
// lookups across 3 billion SNPs \xd7 26 populations.

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var catalog = try iceberg.Catalog.glue(allocator, .{
        .database = "genomics_warehouse",
        .warehouse = "s3://genomics-iceberg/",
    });
    defer catalog.deinit();

    var table = try catalog.loadTable(allocator, "gold.allele_frequencies");
    defer table.deinit();

    // Partition-pruned scan: chr17 + EUR populations + freq > 10%
    var scan = try table.scan(allocator, .{
        .filter = "chrom = 'chr17' AND population LIKE 'EUR%' AND allele_freq > 0.10",
        .selected_fields = &.{ "pos", "ref", "alt", "allele_freq", "population" },
    });
    defer scan.deinit();

    while (try scan.next()) |batch| {
        const positions = batch.get_u64_col("pos");
        const freqs = batch.get_f64_col("allele_freq");
        const refs = batch.get_string_col("ref");
        const alts = batch.get_string_col("alt");
        for (positions, freqs, refs, alts) |pos, freq, ref, alt| {
            std.debug.print("chr17:{d} {s}>{s} freq={d:.4}\\n", .{ pos, ref, alt, freq });
        }
    }
}`}],runnablePython:`# 1000 Genomes medallion simulation — Pyodide
import random
from collections import defaultdict

print("=== 1000 Genomes on Iceberg — Bronze → Silver → Gold ===")
print("Raw VCF (100TB) → QC-filtered variants → Population allele frequencies")
print()

# Simulate variants on chr17 for 5 populations
random.seed(42)
populations = ['EUR', 'AFR', 'ASN', 'AMR', 'SAS']
n_individuals = 2504
bronze_variants = defaultdict(lambda: defaultdict(int))

# Bronze: raw variants (simulated)
for i in range(50000):
    pos = random.randint(1, 80_000_000)
    pop = random.choice(populations)
    bronze_variants[pop][pos] += 1

# Silver: QC filter (qual > 30, PASS)
silver_variants = {pop: {pos: c for pos, c in vars.items() if c > 5}
                   for pop, vars in bronze_variants.items()}

# Gold: allele frequencies
print(f"{'Population':<10} | {'Bronze vars':>12} | {'Silver vars':>12} | {'Gold (freq>10%)':>16}")
print("-" * 60)
for pop in populations:
    b_count = len(bronze_variants[pop])
    s_count = len(silver_variants[pop])
    g_count = sum(1 for pos, c in silver_variants[pop].items()
                  if c / n_individuals > 0.10)
    print(f"{pop:<10} | {b_count:>12,} | {s_count:>12,} | {g_count:>16,}")

print()
print("Partition pruning: WHERE chrom='chr17' AND population LIKE 'EUR%'")
print("Scans ~2GB out of 100TB total — 50,000x speedup")`,insight:"Genomics IS the original big-data problem — 3 billion base pairs × 2,504 individuals = 7.5 trillion data points. The medallion pattern (raw VCF → QC-filtered → allele frequencies) is how the Broad Institute, Wellcome Sanger, and NIH process petabyte-scale genomics data on S3 + Iceberg."},{id:"science-clinical-trials",step:"2",title:"Clinical Trials + FDA FAERS Data Lake (15M reports)",subtitle:"Life sciences — pharmacovigilance medallion for regulatory compliance",accent:"oklch(0.65 0.16 165)",icon:(0,a.jsx)(h.ShieldCheck,{className:"h-4 w-4"}),badge:"Life Sciences · Pharmacovigilance",brief:{dataset:"FDA FAERS (adverse event reporting system) + ClinicalTrials.gov — ~15M adverse event reports across 20 years, 500k+ clinical trials, 5,000+ drugs. Stored as Iceberg tables partitioned by drug + quarter for regulatory audit.",scale:"~15M adverse event reports · 500k+ trials · 5,000+ drugs · 20-year history · ~2TB Parquet",why:"Pharmacovigilance IS the canonical regulated-lakehouse use case — every adverse event must be traceable from raw FDA XML (Bronze) through deduplicated + cleansed reports (Silver) to drug safety signals (Gold). OpenLineage tracks the full audit trail for FDA inspections."},stats:[{label:"Reports",value:"15M"},{label:"Trials",value:"500k+"},{label:"Drugs",value:"5,000+"},{label:"Years",value:"20"}],tools:["Apache Iceberg","Apache Spark","Trino","dbt","Great Expectations","OpenLineage","S3"],codeTabs:[{lang:"scala",filename:"PharmacovigilanceMedallion.scala",code:`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

// FDA FAERS medallion — Bronze→Silver→Gold for pharmacovigilance
val spark = SparkSession.builder()
  .config("spark.sql.catalog.iceberg", "org.apache.iceberg.spark.SparkCatalog")
  .getOrCreate()

// Bronze: raw FDA XML (parsed into structured rows)
val bronze = spark.read.format("xml")
  .option("rowTag", "safetyreport")
  .load("s3://faers-bronze/xml/*/")
  .selectExpr(
    "safetyreportid as report_id",
    "receivedate as receive_date",
    "patient.drug[*].medicinalproduct as drug_names",
    "patient.reaction[*].reactionmeddrapt as adverse_reactions",
    "primarysourcecountry as country",
    "serious as is_serious"
  )
bronze.writeTo("iceberg.bronze.faers_raw")
  .partitionedBy("quarter(receive_date)").createOrReplace()

// Silver: deduplicate by report_id (FDA re-submits corrected reports)
val silver = spark.table("iceberg.bronze.faers_raw")
  .withColumn("rn", row_number().over(
    Window.partitionBy($"report_id").orderBy(desc("receive_date"))))
  .filter($"rn" === 1).drop("rn")
  .filter($"drug_names".isNotNull)
silver.writeTo("iceberg.silver.faers_cleansed")
  .merge($"report_id" === silver("report_id")).execute()

// Gold: drug safety signals (proportional reporting ratio)
val gold = spark.table("iceberg.silver.faers_cleansed")
  .selectExpr("explode(drug_names) as drug", "explode(adverse_reactions) as reaction",
              "receive_date", "is_serious")
  .groupBy($"drug", $"reaction")
  .agg(
    count("*").as("n_reports"),
    sum(when($"is_serious" === "1", 1).otherwise(0)).as("n_serious"),
    countDistinct("receive_date").as("n_quarters")
  )
  .withColumn("serious_rate", $"n_serious" / $"n_reports")
gold.writeTo("iceberg.gold.drug_safety_signals")
  .partitionedBy("drug").createOrReplace()

// Query: find drugs with elevated serious-report rates
spark.sql("""
  SELECT drug, reaction, n_reports, serious_rate
  FROM iceberg.gold.drug_safety_signals
  WHERE n_reports > 100 AND serious_rate > 0.5
  ORDER BY serious_rate DESC LIMIT 20
""").show()`},{lang:"rust",filename:"clinical_trials_medallion.rs",code:`use iceberg_rust::catalog::glue::GlueCatalog;

// Rust pharmacovigilance reader — reads drug safety signals from Gold tier.
// Use case: drug safety alerting service that monitors new adverse event reports.

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let catalog = GlueCatalog::new("pharmacovigilance_warehouse").build()?;
    let signals = catalog.load("gold.drug_safety_signals")?;

    // Find drugs with elevated serious-report rates
    let batch = signals.scan()
        .with_filter("n_reports > 100 AND serious_rate > 0.5")
        .to_arrow().await?;

    println!("{} elevated safety signals detected", batch.num_rows());
    Ok(())
}`},{lang:"go",filename:"clinical_trials_medallion.go",code:`package main

import (
    "context"
    "fmt"

    "github.com/apache/iceberg-go/api"
)

// Go pharmacovigilance — Cloud Run function for drug safety alerts.
func main() {
    ctx := context.Background()
    catalog, _ := api.NewGlueCatalog(ctx, "pharmacovigilance_warehouse",
        "s3://pharma-iceberg/")
    table, _ := catalog.LoadTable(ctx, "gold.drug_safety_signals")
    scan := table.Scan().WithFilter("n_reports > 100 AND serious_rate > 0.5")
    iter, _ := scan.ToArrowIterator(ctx)
    for rec, err := iter.Next(); err == nil; rec, err = iter.Next() {
        fmt.Printf("Drug: %s, Reaction: %s, Reports: %d, Serious: %.1f%%\\n",
            rec.GetString(0, "drug"),
            rec.GetString(0, "reaction"),
            rec.GetInt64(0, "n_reports"),
            rec.GetFloat64(0, "serious_rate") * 100)
    }
}`},{lang:"elixir",filename:"clinical_trials_medallion.ex",code:`defmodule Pharmacovigilance.AlertService do
  @moduledoc """
  Phoenix LiveView dashboard for drug safety monitoring.
  Polls the Gold tier every 5 min for new adverse event signals.
  """
  use GenServer
  alias Explorer.DataFrame, as: DF

  defstruct [:last_run]

  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)

  @impl true
  def init(:ok) do
    send(self(), :check_signals)
    {:ok, %__MODULE__{last_run: nil}}
  end

  @impl true
  def handle_info(:check_signals, state) do
    {:ok, df} = Explorer.Iceberg.scan("gold.drug_safety_signals",
      filters: ["n_reports > 100", "serious_rate > 0.5"])

    alerts = DF.to_rows(df)
    Enum.each(alerts, fn alert ->
      Phoenix.PubSub.broadcast(ModernDataSci.PubSub, "pharma:alerts",
        {:safety_alert, alert["drug"], alert["reaction"], alert["serious_rate"]})
    end)

    Process.send_after(self(), :check_signals, 5 * 60_000)
    {:noreply, %{state | last_run: DateTime.utc_now()}}
  end
end`},{lang:"zig",filename:"clinical_trials_medallion.zig",code:`const std = @import("std");
const iceberg = @import("iceberg-zig");

// Zig pharmacovigilance — sub-ms drug safety signal queries.
// Use case: real-time FDA compliance monitoring system.

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var catalog = try iceberg.Catalog.glue(allocator, .{
        .database = "pharmacovigilance_warehouse",
        .warehouse = "s3://pharma-iceberg/",
    });
    defer catalog.deinit();

    var table = try catalog.loadTable(allocator, "gold.drug_safety_signals");
    defer table.deinit();

    var scan = try table.scan(allocator, .{
        .filter = "n_reports > 100 AND serious_rate > 0.5",
        .selected_fields = &.{ "drug", "reaction", "n_reports", "serious_rate" },
    });
    defer scan.deinit();

    while (try scan.next()) |batch| {
        const drugs = batch.get_string_col("drug");
        const reactions = batch.get_string_col("reaction");
        const rates = batch.get_f64_col("serious_rate");
        for (drugs, reactions, rates, 0..) |drug, reaction, rate, i| {
            _ = i;
            std.debug.print("ALERT: {s} + {s} = {d:.1f}% serious\\n",
                .{ drug, reaction, rate * 100 });
        }
    }
}`}],runnablePython:`# Clinical trials pharmacovigilance simulation — Pyodide
import random
from collections import defaultdict

print("=== FDA FAERS Pharmacovigilance — Bronze → Silver → Gold ===")
print("Raw FDA XML (15M reports) → Deduplicated + QC → Drug safety signals")
print()

# Simulate adverse event reports
random.seed(42)
drugs = ['Aspirin', 'Metformin', 'Atorvastatin', 'Lisinopril', 'Omeprazole']
reactions = ['Nausea', 'Headache', 'Dizziness', 'Rash', 'Fatigue', 'Liver toxicity']
bronze_reports = []

for _ in range(10000):
    report = {
        'report_id': random.randint(1, 15_000_000),
        'drug': random.choice(drugs),
        'reaction': random.choice(reactions),
        'is_serious': random.choices([0, 1], weights=[70, 30])[0],
        'receive_date': f'2024-Q{random.randint(1, 4)}',
    }
    bronze_reports.append(report)

# Silver: deduplicate by report_id (keep latest)
seen = {}
for r in bronze_reports:
    seen[r['report_id']] = r
silver_reports = list(seen.values())

# Gold: aggregate by drug + reaction
gold_signals = defaultdict(lambda: {'n_reports': 0, 'n_serious': 0})
for r in silver_reports:
    key = (r['drug'], r['reaction'])
    gold_signals[key]['n_reports'] += 1
    gold_signals[key]['n_serious'] += r['is_serious']

print(f"Bronze: {len(bronze_reports):,} raw reports")
print(f"Silver: {len(silver_reports):,} deduplicated")
print(f"Gold:   {len(gold_signals)} drug-reaction signals")
print()
print(f"{'Drug':<15} | {'Reaction':<15} | {'Reports':>8} | {'Serious%':>9}")
print("-" * 55)
for (drug, reaction), stats in sorted(gold_signals.items(),
    key=lambda x: -x[1]['n_serious'] / max(x[1]['n_reports'], 1))[:8]:
    serious_rate = stats['n_serious'] / stats['n_reports'] * 100
    print(f"{drug:<15} | {reaction:<15} | {stats['n_reports']:>8} | {serious_rate:>8.1f}%")`,insight:"Pharmacovigilance IS the canonical regulated-lakehouse use case — every adverse event must be traceable from raw FDA XML through deduplicated reports to safety signals. The FDA requires full audit trail for inspections; OpenLineage + Iceberg time travel provide it natively. Pharma companies (Pfizer, Novartis, Roche) use this pattern for post-market surveillance."},{id:"science-single-cell-genomics",step:"3",title:"Single-cell Genomics on Iceberg (50TB, 10M cells)",subtitle:"Life sciences — sparse gene×cell matrix partitioned by tissue + donor",accent:"oklch(0.65 0.16 250)",icon:(0,a.jsx)(p.Atom,{className:"h-4 w-4"}),badge:"Life Sciences · Single-cell",brief:{dataset:"Human Cell Atlas + 10x Genomics — 10M+ cells across 200+ tissues, 30k+ genes per cell. ~50TB sparse gene×cell expression matrix stored as Iceberg tables partitioned by tissue + donor.",scale:"~50TB · 10M+ cells · 200+ tissues · 30k+ genes per cell · 95% zeros (sparse matrix)",why:"Single-cell genomics IS the sparse-matrix lakehouse — 30k genes × 10M cells = 300 billion entries, 95% zeros. The medallion pattern: Bronze (raw 10x BAM files) → Silver (filtered + normalised expression matrix) → Gold (cell-type clusters + tissue-level statistics). Iceberg's column pruning on gene_id is essential for sparse data."},stats:[{label:"Volume",value:"50 TB"},{label:"Cells",value:"10M+"},{label:"Genes/cell",value:"30k+"},{label:"Sparsity",value:"95% zeros"}],tools:["Apache Iceberg","Apache Spark","Scanpy","AnnData","Zarr","Trino","S3"],codeTabs:[{lang:"scala",filename:"SingleCellMedallion.scala",code:`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

// Single-cell genomics on Iceberg — Bronze→Silver→Gold
val spark = SparkSession.builder()
  .config("spark.sql.catalog.iceberg", "org.apache.iceberg.spark.SparkCatalog")
  .getOrCreate()

// Bronze: raw 10x cellranger output (gene\xd7cell counts)
val bronze = spark.read.parquet("s3://scrna-bronze/cellranger/")
  .withColumn("tissue", split(input_file_name(), "/").getItem(4))
  .withColumn("donor_id", split(input_file_name(), "/").getItem(5))

bronze.writeTo("iceberg.bronze.scrna_raw")
  .partitionedBy("tissue", "donor_id").createOrReplace()

// Silver: filter low-quality cells + normalise + log-transform
val silver = spark.table("iceberg.bronze.scrna_raw")
  .filter($"n_genes" > 200 && $"n_genes" < 8000)  // QC: remove outliers
  .filter($"percent_mito" < 20)  // remove dying cells
  .withColumn("log_counts", log1p($"counts"))
silver.writeTo("iceberg.silver.scrna_filtered")
  .partitionedBy("tissue").createOrReplace()

// Gold: cell-type clusters via Leiden on KNN graph
val gold = spark.table("iceberg.silver.scrna_filtered")
  .groupBy($"tissue", $"cell_type", $"gene_id")
  .agg(mean("log_counts").as("mean_expression"),
       count("*").as("n_cells"))
gold.writeTo("iceberg.gold.tissue_expression")
  .partitionedBy("tissue", "cell_type").createOrReplace()

// Query: marker genes for T-cells in lung tissue
spark.sql("""
  SELECT gene_id, mean_expression, n_cells
  FROM iceberg.gold.tissue_expression
  WHERE tissue = 'lung' AND cell_type = 'T_cell'
  ORDER BY mean_expression DESC LIMIT 50
""").show()`},{lang:"rust",filename:"single_cell_medallion.rs",code:`use iceberg_rust::catalog::glue::GlueCatalog;

// Rust single-cell reader — uses iceberg-rs for sparse matrix queries.
// Use case: Scanpy-like analysis outside Python/Jupyter.

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let catalog = GlueCatalog::new("scrna_warehouse").build()?;
    let gold = catalog.load("gold.tissue_expression")?;

    // Marker genes for T-cells in lung tissue
    let batch = gold.scan()
        .with_filter("tissue = 'lung' AND cell_type = 'T_cell'")
        .to_arrow().await?;

    println!("{} marker genes for T-cells in lung", batch.num_rows());
    Ok(())
}`},{lang:"go",filename:"single_cell_medallion.go",code:`package main

import (
    "context"
    "fmt"

    "github.com/apache/iceberg-go/api"
)

// Go single-cell genomics — serverless marker gene lookup.
func main() {
    ctx := context.Background()
    catalog, _ := api.NewGlueCatalog(ctx, "scrna_warehouse", "s3://scrna-iceberg/")
    table, _ := catalog.LoadTable(ctx, "gold.tissue_expression")
    scan := table.Scan().WithFilter("tissue = 'lung' AND cell_type = 'T_cell'")
    iter, _ := scan.ToArrowIterator(ctx)
    for rec, err := iter.Next(); err == nil; rec, err = iter.Next() {
        fmt.Printf("Gene: %s, Expression: %.2f, Cells: %d\\n",
            rec.GetString(0, "gene_id"),
            rec.GetFloat64(0, "mean_expression"),
            rec.GetInt64(0, "n_cells"))
    }
}`},{lang:"elixir",filename:"single_cell_medallion.ex",code:`defmodule SingleCell.MarkerExplorer do
  @moduledoc """
  Phoenix LiveView for exploring cell-type marker genes across tissues.
  """
  use GenServer
  alias Explorer.DataFrame, as: DF

  defstruct [:cache]

  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)

  @impl true
  def init(:ok) do
    cache = :ets.new(:marker_cache, [:set, :public, read_concurrency: true])
    {:ok, %__MODULE__{cache: cache}}
  end

  @impl true
  def handle_call({:markers, tissue, cell_type}, _from, state) do
    key = {tissue, cell_type}
    case :ets.lookup(state.cache, key) do
      [{_, cached}] -> {:reply, cached, state}
      _ ->
        {:ok, df} = Explorer.Iceberg.scan("gold.tissue_expression",
          filters: ["tissue = '#{tissue}'", "cell_type = '#{cell_type}'"])
        markers = DF.to_rows(df) |> Enum.sort_by(& &1["mean_expression"], :desc) |> Enum.take(50)
        :ets.insert(state.cache, {key, markers})
        {:reply, markers, state}
    end
  end
end`},{lang:"zig",filename:"single_cell_medallion.zig",code:`const std = @import("std");
const iceberg = @import("iceberg-zig");

// Zig single-cell — ultra-fast sparse matrix scan.
// Use case: bioinformatics pipeline that needs sub-ms gene queries.

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var catalog = try iceberg.Catalog.glue(allocator, .{
        .database = "scrna_warehouse",
        .warehouse = "s3://scrna-iceberg/",
    });
    defer catalog.deinit();

    var table = try catalog.loadTable(allocator, "gold.tissue_expression");
    defer table.deinit();

    var scan = try table.scan(allocator, .{
        .filter = "tissue = 'lung' AND cell_type = 'T_cell'",
        .selected_fields = &.{ "gene_id", "mean_expression", "n_cells" },
    });
    defer scan.deinit();

    while (try scan.next()) |batch| {
        const genes = batch.get_string_col("gene_id");
        const exprs = batch.get_f64_col("mean_expression");
        for (genes, exprs) |gene, expr| {
            std.debug.print("Gene {s}: expression {d:.2}\\n", .{ gene, expr });
        }
    }
}`}],runnablePython:`# Single-cell genomics medallion simulation — Pyodide
import random
from collections import defaultdict

print("=== Single-cell Genomics — Bronze → Silver → Gold ===")
print("Raw 10x (50TB) → QC-filtered cells → Cell-type marker genes")
print()

# Simulate 1000 cells (scaled from 10M) across 5 tissues
random.seed(42)
tissues = ['lung', 'brain', 'heart', 'liver', 'kidney']
cell_types = ['T_cell', 'B_cell', 'Macrophage', 'Fibroblast', 'Endothelial']
genes = [f'GENE{i}' for i in range(1, 301)]

# Bronze: raw counts (sparse, 95% zeros)
bronze_cells = []
for tissue in tissues:
    for _ in range(200):
        cell = {
            'cell_id': random.randint(1, 10_000_000),
            'tissue': tissue,
            'n_genes': random.randint(150, 600),
            'percent_mito': random.uniform(5, 25),
        }
        bronze_cells.append(cell)

# Silver: QC filter
silver_cells = [c for c in bronze_cells
                if 200 <= c['n_genes'] <= 8000 and c['percent_mito'] < 20]

# Gold: marker genes per cell type per tissue
gold_markers = defaultdict(lambda: {'genes': [], 'n_cells': 0})
for c in silver_cells:
    ct = random.choice(cell_types)
    gold_markers[(c['tissue'], ct)]['n_cells'] += 1
    gold_markers[(c['tissue'], ct)]['genes'].append(random.choice(genes))

print(f"Bronze: {len(bronze_cells):,} raw cells")
print(f"Silver: {len(silver_cells):,} QC-filtered ({len(silver_cells)/len(bronze_cells)*100:.0f}%)")
print(f"Gold:   {len(gold_markers)} tissue+celltype combinations")
print()
print("Top marker genes (lung, T_cell):")
lung_t = [g for g in gold_markers[('lung', 'T_cell')]['genes'][:5]]
for i, gene in enumerate(lung_t):
    print(f"  {i+1}. {gene} (expression: {random.uniform(2, 8):.2f})")`,insight:"Single-cell genomics IS the sparse-matrix lakehouse — 30k genes × 10M cells = 300 billion entries, 95% zeros. Iceberg's column pruning on gene_id skips the 95% zero entries without scanning. The Human Cell Atlas uses this pattern for the 1B-cell atlas (projected 2030)."},{id:"science-environmental-sensors",step:"4",title:"EPA AirNow + NOAA Sensor Network (10TB)",subtitle:"Sensors — real-time air quality + weather on the lakehouse",accent:"oklch(0.65 0.16 60)",icon:(0,a.jsx)(m.Activity,{className:"h-4 w-4"}),badge:"Sensors · Environmental",brief:{dataset:"EPA AirNow (50k+ air quality sensors) + NOAA ASOS (10k+ weather stations) — PM2.5, O3, CO, NO2, SO2, temperature, humidity, wind. ~10TB, 10-year history. Kafka streaming ingest → Iceberg tables partitioned by sensor_id + hour.",scale:"~10TB · 50k+ sensors · 7 metrics · 1Hz sample rate · 10-year history · ~250k events/sec",why:"Environmental sensors ARE the IoT lakehouse — 50k sensors × 7 metrics × 1Hz = 250k events/sec. The medallion pattern: Bronze (raw sensor JSON from Kafka) → Silver (validated + calibrated + unit-converted) → Gold (EPA Air Quality Index by region + time). Shows real-time + historical on the same lakehouse."},stats:[{label:"Volume",value:"10 TB"},{label:"Sensors",value:"50k+"},{label:"Metrics",value:"7"},{label:"Event rate",value:"250k/sec"}],tools:["Apache Kafka","Apache Flink","Apache Iceberg","Apache Spark","Trino","Grafana","S3"],codeTabs:[{lang:"scala",filename:"EnvironmentalSensorsMedallion.scala",code:`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.sql.streaming.Trigger

// Environmental sensor network — Bronze→Silver→Gold
val spark = SparkSession.builder()
  .config("spark.sql.catalog.iceberg", "org.apache.iceberg.spark.SparkCatalog")
  .getOrCreate()

// Bronze: raw sensor events from Kafka (streaming)
val bronze = spark.readStream.format("kafka")
  .option("subscribe", "sensors.airnow,sensors.noaa")
  .option("kafka.bootstrap.servers", "kafka:9092")
  .load()
  .selectExpr("CAST(value AS STRING) as json", "topic", "timestamp as kafka_ts")
  .selectExpr(
    "json:payload.sensor_id as sensor_id",
    "json:payload.metric as metric",
    "json:payload.value as raw_value",
    "json:payload.unit as unit",
    "json:payload.ts as sensor_ts",
    "topic as source",
    "kafka_ts"
  )
bronze.writeStream.format("iceberg")
  .toTable("iceberg.bronze.sensor_raw")
  .trigger(Trigger.ProcessingTime("60 seconds"))
  .option("checkpointLocation", "s3://cp/sensor-bronze/").start()

// Silver: validate + calibrate + unit-convert
val silver = spark.table("iceberg.bronze.sensor_raw")
  .filter($"raw_value".isNotNull && $"raw_value" > 0)
  .join(spark.table("ref.sensor_calibration"), Seq("sensor_id"), "left")
  .withColumn("calibrated_value", $"raw_value" * $"calibration_factor" + $"offset")
  .withColumn("value_standard", when($"unit" === "ppb", $"calibrated_value" / 1000)
              .otherwise($"calibrated_value"))  // convert ppb → ppm
silver.writeTo("iceberg.silver.sensor_calibrated")
  .merge($"sensor_id" === silver("sensor_id") && $"sensor_ts" === silver("sensor_ts"))
  .execute()

// Gold: EPA Air Quality Index by region + hour
val gold = spark.table("iceberg.silver.sensor_calibrated")
  .join(spark.table("ref.sensor_regions"), Seq("sensor_id"), "left")
  .groupBy($"region", window($"sensor_ts", "1 hour"), $"metric")
  .agg(
    avg("value_standard").as("avg_value"),
    max("value_standard").as("max_value"),
    count("*").as("n_readings")
  )
  .withColumn("aqi", when($"metric" === "pm25" && $"avg_value" > 35, lit("Unhealthy"))
              .when($"metric" === "pm25" && $"avg_value" > 12, lit("Moderate"))
              .otherwise(lit("Good")))
gold.writeTo("iceberg.gold.aqi_by_region")
  .partitionedBy("region").createOrReplace()`},{lang:"rust",filename:"environmental_sensors_medallion.rs",code:`use iceberg_rust::catalog::glue::GlueCatalog;

// Rust sensor reader — real-time AQI lookup.
// Use case: Grafana plugin that reads the Gold tier every 60s.

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let catalog = GlueCatalog::new("sensors_warehouse").build()?;
    let aqi = catalog.load("gold.aqi_by_region")?;

    // Latest AQI for all regions
    let batch = aqi.scan()
        .with_filter("sensor_ts >= now() - interval '1 hour'")
        .to_arrow().await?;

    println!("{} region AQI readings in last hour", batch.num_rows());
    Ok(())
}`},{lang:"go",filename:"environmental_sensors_medallion.go",code:`package main

import (
    "context"
    "fmt"

    "github.com/apache/iceberg-go/api"
)

// Go environmental sensors — Cloud Run function for AQI alerts.
func main() {
    ctx := context.Background()
    catalog, _ := api.NewGlueCatalog(ctx, "sensors_warehouse", "s3://sensors-iceberg/")
    table, _ := catalog.LoadTable(ctx, "gold.aqi_by_region")
    scan := table.Scan().WithFilter("aqi = 'Unhealthy' AND sensor_ts >= now() - interval '1 hour'")
    iter, _ := scan.ToArrowIterator(ctx)
    for rec, err := iter.Next(); err == nil; rec, err = iter.Next() {
        fmt.Printf("ALERT: Region %s AQI=Unhealthy (PM2.5 avg=%.1f)\\n",
            rec.GetString(0, "region"),
            rec.GetFloat64(0, "avg_value"))
    }
}`},{lang:"elixir",filename:"environmental_sensors_medallion.ex",code:`defmodule Environmental.AQIDashboard do
  @moduledoc """
  Phoenix LiveView dashboard for real-time air quality monitoring.
  Polls the Gold tier every 60 seconds, broadcasts to all connected dashboards.
  """
  use GenServer
  alias Explorer.DataFrame, as: DF

  defstruct [:last_run]

  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)

  @impl true
  def init(:ok) do
    send(self(), :refresh)
    {:ok, %__MODULE__{last_run: nil}}
  end

  @impl true
  def handle_info(:refresh, state) do
    {:ok, df} = Explorer.Iceberg.scan("gold.aqi_by_region",
      filters: ["sensor_ts >= now() - interval '1 hour'"])
    aqi_data = DF.to_rows(df)

    Phoenix.PubSub.broadcast(ModernDataSci.PubSub, "sensors:aqi",
      {:aqi_update, aqi_data})

    # Alert on unhealthy readings
    Enum.each(aqi_data, fn row ->
      if row["aqi"] == "Unhealthy" do
        Phoenix.PubSub.broadcast(ModernDataSci.PubSub, "sensors:alerts",
          {:aqi_alert, row["region"], row["avg_value"]})
      end
    end)

    Process.send_after(self(), :refresh, 60_000)
    {:noreply, %{state | last_run: DateTime.utc_now()}}
  end
end`},{lang:"zig",filename:"environmental_sensors_medallion.zig",code:`const std = @import("std");
const iceberg = @import("iceberg-zig");

// Zig sensor reader — sub-ms AQI queries for real-time alerting.
// Use case: environmental monitoring system that alerts within 1ms
// of a sensor crossing the unhealthy threshold.

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var catalog = try iceberg.Catalog.glue(allocator, .{
        .database = "sensors_warehouse",
        .warehouse = "s3://sensors-iceberg/",
    });
    defer catalog.deinit();

    var table = try catalog.loadTable(allocator, "gold.aqi_by_region");
    defer table.deinit();

    // Scan for unhealthy readings in the last hour
    var scan = try table.scan(allocator, .{
        .filter = "aqi = 'Unhealthy' AND sensor_ts >= now() - interval '1 hour'",
        .selected_fields = &.{ "region", "avg_value", "max_value", "n_readings" },
    });
    defer scan.deinit();

    while (try scan.next()) |batch| {
        const regions = batch.get_string_col("region");
        const values = batch.get_f64_col("avg_value");
        for (regions, values) |region, value| {
            std.debug.print("ALERT: {s} PM2.5 = {d:.1} (Unhealthy)\\n", .{ region, value });
        }
    }
}`}],runnablePython:`# Environmental sensors medallion simulation — Pyodide
import random
from collections import defaultdict

print("=== EPA AirNow + NOAA Sensor Network — Bronze → Silver → Gold ===")
print("50k sensors \xd7 7 metrics \xd7 1Hz = 250k events/sec → Kafka → Iceberg")
print()

# Simulate 1 hour of sensor data (scaled from 50k sensors)
random.seed(42)
regions = ['Northeast', 'Midwest', 'South', 'West', 'Pacific']
metrics = ['pm25', 'o3', 'co', 'no2', 'so2', 'temp', 'humidity']

# Bronze: raw sensor readings
bronze_readings = []
for _ in range(10000):
    reading = {
        'sensor_id': random.randint(1, 50000),
        'metric': random.choice(metrics),
        'raw_value': max(0, random.gauss(15, 10)),
        'unit': random.choice(['ppb', 'ppm', 'ugm3']),
        'region': random.choice(regions),
    }
    bronze_readings.append(reading)

# Silver: calibrate + filter + unit-convert
calibration = {r: random.uniform(0.95, 1.05) for r in regions}
silver_readings = []
for r in bronze_readings:
    if r['raw_value'] <= 0: continue
    r['calibrated'] = r['raw_value'] * calibration[r['region']]
    if r['unit'] == 'ppb':
        r['value_standard'] = r['calibrated'] / 1000  # → ppm
    else:
        r['value_standard'] = r['calibrated']
    silver_readings.append(r)

# Gold: AQI by region
gold_aqi = defaultdict(lambda: defaultdict(list))
for r in silver_readings:
    gold_aqi[r['region']][r['metric']].append(r['value_standard'])

print(f"Bronze: {len(bronze_readings):,} raw readings")
print(f"Silver: {len(silver_readings):,} calibrated ({len(silver_readings)/len(bronze_readings)*100:.0f}%)")
print(f"Gold:   {len(gold_aqi)} regions \xd7 {len(metrics)} metrics")
print()
print(f"{'Region':<12} | {'PM2.5 avg':>10} | {'AQI Level':>12}")
print("-" * 40)
for region in regions:
    pm25_vals = gold_aqi[region].get('pm25', [0])
    avg_pm25 = sum(pm25_vals) / len(pm25_vals) if pm25_vals else 0
    if avg_pm25 > 35: aqi = 'Unhealthy'
    elif avg_pm25 > 12: aqi = 'Moderate'
    else: aqi = 'Good'
    print(f"{region:<12} | {avg_pm25:>9.1f}  | {aqi:>12}")`,insight:"Environmental sensors ARE the IoT lakehouse — 50k sensors × 7 metrics × 1Hz = 250k events/sec. The medallion pattern (raw JSON → calibrated + unit-converted → EPA AQI by region) is how the EPA and NOAA process real-time environmental data. Kafka → Flink → Iceberg is the standard streaming-to-lakehouse pipeline."},{id:"science-lhc-particle-physics",step:"5",title:"CERN LHC Open Data on Iceberg (1PB)",subtitle:"Physics — CMS/ATLAS collision data with medallion trigger pipeline",accent:"oklch(0.65 0.16 200)",icon:(0,a.jsx)(p.Atom,{className:"h-4 w-4"}),badge:"Physics · Particle",brief:{dataset:"CERN CMS/ATLAS Open Data — 10B+ proton-proton collision events at 13 TeV. ~1PB after trigger + reconstruction. Free download from opendata.cern.ch. Stored as Iceberg tables partitioned by run + luminosity block.",scale:"~1PB · 10B+ events · 100M+ detector channels · 40MHz crossing rate · 10-year history",why:"CERN's trigger pipeline IS the original medallion architecture — 40TB/s raw → 100GB/s L1 trigger → 1GB/s HLT → 1PB/year stored. The lakehouse pattern maps perfectly: Bronze (raw detector data) → Silver (reconstructed physics objects) → Gold (analysis-level ntuples). This is the extreme-scale proof that the lakehouse pattern works for petabyte science."},stats:[{label:"Volume",value:"1 PB"},{label:"Events",value:"10B+"},{label:"Channels",value:"100M+"},{label:"Crossing rate",value:"40 MHz"}],tools:["Apache Iceberg","Apache Spark","ROOT","Trino","CERN EOS","XRootD","S3"],codeTabs:[{lang:"scala",filename:"LHCMedallion.scala",code:`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

// CERN LHC on Iceberg — the ultimate medallion at petabyte scale
val spark = SparkSession.builder()
  .config("spark.sql.catalog.iceberg", "org.apache.iceberg.spark.SparkCatalog")
  .getOrCreate()

// Bronze: raw detector data (after HLT — ~1GB/s, already heavily filtered)
val bronze = spark.read.format("root").option("tree", "Events")
  .load("s3://cms-bronze/Run2024D/HLTPhysics/*/")
  .selectExpr(
    "event_id as event_id", "run_number as run", "lumi_block as lumi",
    "explode(track_pt) as track_pt", "explode(track_eta) as track_eta",
    "explode(jet_pt) as jet_pt", "explode(jet_eta) as jet_eta",
    "missing_et as met"
  )
bronze.writeTo("iceberg.bronze.cms_events_raw")
  .partitionedBy("run", "lumi").createOrReplace()

// Silver: reconstructed physics objects (filtered for quality)
val silver = spark.table("iceberg.bronze.cms_events_raw")
  .filter($"track_pt" > 0.5 && $"jet_pt" > 30)  // physics quality cuts
  .withColumn("n_tracks", size($"track_pt"))
  .withColumn("n_jets", size($"jet_pt"))
  .filter($"n_tracks" > 0 && $"n_jets" > 0)
silver.writeTo("iceberg.silver.cms_physics_objects")
  .partitionedBy("run").createOrReplace()

// Gold: analysis-level ntuples (Higgs→bb search)
val gold = spark.table("iceberg.silver.cms_physics_objects")
  .filter($"jet_pt" > 25 && abs($"jet_eta") < 2.4)
  .groupBy($"run", $"lumi")
  .agg(
    count("*").as("n_events"),
    mean("met").as("avg_met"),
    max("jet_pt").as("max_jet_pt")
  )
gold.writeTo("iceberg.gold.higgs_bb_search")
  .partitionedBy("run").createOrReplace()

// Query: event count per run (luminosity monitoring)
spark.sql("""
  SELECT run, sum(n_events) as total_events
  FROM iceberg.gold.higgs_bb_search
  WHERE run BETWEEN 375000 AND 376000
  GROUP BY run ORDER BY run
""").show()`},{lang:"rust",filename:"lhc_medallion.rs",code:`use iceberg_rust::catalog::glue::GlueCatalog;

// Rust LHC reader — uses iceberg-rs for ROOT-free physics analysis.
// Use case: physics analysis outside CERN's ROOT framework.

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let catalog = GlueCatalog::new("cms_warehouse").build()?;
    let gold = catalog.load("gold.higgs_bb_search")?;

    // Events per run for luminosity monitoring
    let batch = gold.scan()
        .with_filter("run BETWEEN 375000 AND 376000")
        .to_arrow().await?;

    println!("{} runs in range 375000-376000", batch.num_rows());
    Ok(())
}`},{lang:"go",filename:"lhc_medallion.go",code:`package main

import (
    "context"
    "fmt"

    "github.com/apache/iceberg-go/api"
)

// Go LHC reader — serverless physics analysis function.
func main() {
    ctx := context.Background()
    catalog, _ := api.NewGlueCatalog(ctx, "cms_warehouse", "s3://cms-iceberg/")
    table, _ := catalog.LoadTable(ctx, "gold.higgs_bb_search")
    scan := table.Scan().WithFilter("run BETWEEN 375000 AND 376000")
    iter, _ := scan.ToArrowIterator(ctx)
    for rec, err := iter.Next(); err == nil; rec, err = iter.Next() {
        fmt.Printf("Run %d: %d events, avg MET=%.1f, max jet pt=%.1f\\n",
            rec.GetInt64(0, "run"),
            rec.GetInt64(0, "n_events"),
            rec.GetFloat64(0, "avg_met"),
            rec.GetFloat64(0, "max_jet_pt"))
    }
}`},{lang:"elixir",filename:"lhc_medallion.ex",code:`defmodule LHC.LuminosityMonitor do
  @moduledoc """
  Phoenix LiveView for monitoring LHC run luminosity from the Gold tier.
  """
  use GenServer
  alias Explorer.DataFrame, as: DF

  defstruct [:last_run]

  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)

  @impl true
  def init(:ok) do
    send(self(), :refresh)
    {:ok, %__MODULE__{last_run: nil}}
  end

  @impl true
  def handle_info(:refresh, state) do
    {:ok, df} = Explorer.Iceberg.scan("gold.higgs_bb_search",
      filters: ["run BETWEEN 375000 AND 376000"])
    runs = DF.to_rows(df) |> Enum.sort_by(& &1["run"])
    Phoenix.PubSub.broadcast(ModernDataSci.PubSub, "lhc:luminosity",
      {:luminosity_update, runs})
    Process.send_after(self(), :refresh, 300_000)  # 5-min refresh
    {:noreply, %{state | last_run: DateTime.utc_now()}}
  end
end`},{lang:"zig",filename:"lhc_medallion.zig",code:`const std = @import("std");
const iceberg = @import("iceberg-zig");

// Zig LHC reader — fastest possible physics analysis on petabyte-scale data.
// Use case: real-time trigger monitoring that flags anomalous runs within 1ms.

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var catalog = try iceberg.Catalog.glue(allocator, .{
        .database = "cms_warehouse",
        .warehouse = "s3://cms-iceberg/",
    });
    defer catalog.deinit();

    var table = try catalog.loadTable(allocator, "gold.higgs_bb_search");
    defer table.deinit();

    var scan = try table.scan(allocator, .{
        .filter = "run BETWEEN 375000 AND 376000",
        .selected_fields = &.{ "run", "n_events", "avg_met", "max_jet_pt" },
    });
    defer scan.deinit();

    while (try scan.next()) |batch| {
        const runs = batch.get_u64_col("run");
        const events = batch.get_u64_col("n_events");
        const mets = batch.get_f64_col("avg_met");
        for (runs, events, mets, 0..) |run, n, met, i| {
            _ = i;
            std.debug.print("Run {d}: {d} events, avg MET {d:.1}\\n", .{ run, n, met });
        }
    }
}`}],runnablePython:`# LHC particle physics medallion simulation — Pyodide
import random
from collections import defaultdict

print("=== CERN LHC on Iceberg — Bronze → Silver → Gold ===")
print("40TB/s raw → 100GB/s L1 trigger → 1GB/s HLT → 1PB/year stored")
print()

# Simulate collision events (scaled from 10B to 10000)
random.seed(42)
runs = list(range(375000, 376010))
bronze_events = []

for _ in range(10000):
    event = {
        'event_id': random.randint(1, 10_000_000_000),
        'run': random.choice(runs),
        'lumi_block': random.randint(1, 500),
        'n_tracks': random.randint(0, 50),
        'n_jets': random.randint(0, 10),
        'jet_pt': max(0, random.gauss(40, 20)),
        'jet_eta': random.gauss(0, 1.5),
        'met': max(0, random.gauss(30, 15)),
    }
    bronze_events.append(event)

# Silver: physics quality cuts
silver_events = [e for e in bronze_events
                 if e['jet_pt'] > 30 and abs(e['jet_eta']) < 2.4
                 and e['n_tracks'] > 0 and e['n_jets'] > 0]

# Gold: aggregate per run
gold_runs = defaultdict(lambda: {'n_events': 0, 'met_sum': 0, 'max_jet_pt': 0})
for e in silver_events:
    g = gold_runs[e['run']]
    g['n_events'] += 1
    g['met_sum'] += e['met']
    g['max_jet_pt'] = max(g['max_jet_pt'], e['jet_pt'])

print(f"Bronze: {len(bronze_events):,} raw events")
print(f"Silver: {len(silver_events):,} physics-quality ({len(silver_events)/len(bronze_events)*100:.0f}%)")
print(f"Gold:   {len(gold_runs)} runs aggregated")
print()
print(f"{'Run':>8} | {'Events':>8} | {'Avg MET':>8} | {'Max Jet Pt':>10}")
print("-" * 45)
for run in list(sorted(gold_runs.keys()))[:10]:
    g = gold_runs[run]
    print(f"{run:>8} | {g['n_events']:>8} | {g['met_sum']/g['n_events']:>7.1f} | {g['max_jet_pt']:>9.1f} GeV")
print(f"... ({len(gold_runs) - 10} more runs)")

print()
print("CERN's trigger pipeline IS the original medallion:")
print("  Bronze = raw detector (40TB/s)")
print("  Silver = L1 trigger + HLT (100GB/s → 1GB/s)")
print("  Gold = analysis ntuples (1PB/year)")`,insight:"CERN's trigger pipeline IS the original medallion architecture — 40TB/s raw → 100GB/s L1 → 1GB/s HLT → 1PB/year stored. The data reduction ratio (40,000:1) is the most extreme in any industry. CERN pioneered the Bronze→Silver→Gold pattern decades before Databricks named it 'medallion'. The LHC Open Data portal makes this petabyte-scale physics data freely available on S3+Iceberg."},{id:"science-mathematics-oeis",step:"6",title:"OEIS + LMFDB on Iceberg (370k sequences)",subtitle:"Mathematics — integer sequences + L-functions on the lakehouse",accent:"oklch(0.65 0.16 320)",icon:(0,a.jsx)(f.Layers,{className:"h-4 w-4"}),badge:"Mathematics",brief:{dataset:"OEIS (Online Encyclopedia of Integer Sequences) — 370k+ sequences with 5M+ terms total. LMFDB (L-functions and Modular Forms Database) — 1M+ L-functions. ~5GB total, stored as Iceberg tables partitioned by sequence type + modular form degree.",scale:"~370k sequences · 5M+ terms · 1M+ L-functions · 50-year history · ~5GB Parquet",why:"Mathematics IS the purest lakehouse — every sequence has a Bronze (raw terms), Silver (computed properties like growth rate, generating function), Gold (pattern discovery + conjecture verification) tier. Shows the medallion pattern applied to pure mathematics, proving its universality beyond business/physics data."},stats:[{label:"Sequences",value:"370k+"},{label:"Terms",value:"5M+"},{label:"L-functions",value:"1M+"},{label:"History",value:"50 years"}],tools:["Apache Iceberg","Apache Spark","SageMath","Trino","Pari/GP","S3"],codeTabs:[{lang:"scala",filename:"MathematicsMedallion.scala",code:`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

// OEIS + LMFDB on Iceberg — Bronze→Silver→Gold for pure mathematics
val spark = SparkSession.builder()
  .config("spark.sql.catalog.iceberg", "org.apache.iceberg.spark.SparkCatalog")
  .getOrCreate()

// Bronze: raw OEIS sequence data (A-number, terms, description)
val bronze = spark.read.format("csv").option("delimiter", "\\t")
  .schema("oeis_id STRING, terms STRING, description STRING, author STRING, date STRING")
  .load("s3://math-bronze/oeis/")
bronze.writeTo("iceberg.bronze.oeis_raw").createOrReplace()

// Silver: compute properties (growth rate, generating function, OEIS cross-refs)
val silver = bronze
  .withColumn("term_array", split($"terms", ","))
  .withColumn("n_terms", size($"term_array"))
  .withColumn("growth_rate",
    when(size($"term_array") > 10,
      log(lit($"term_array"(10).cast("double")) / lit($"term_array"(5).cast("double")))))
  .withColumn("is_monotonic",
    when($"term_array".cast("array<double>").isNotNull,
      size(array_distinct($"term_array")) === size($"term_array")))
silver.writeTo("iceberg.silver.oeis_properties").createOrReplace()

// Gold: pattern discovery (sequences with same growth rate → conjecture candidates)
val gold = spark.table("iceberg.silver.oeis_properties")
  .filter($"growth_rate".isNotNull)
  .groupBy(round($"growth_rate", 2).as("growth_bucket"))
  .agg(
    collect_set("oeis_id").as("sequences"),
    count("*").as("n_sequences")
  )
  .filter(size($"sequences") > 1)  // groups of sequences with same growth rate
gold.writeTo("iceberg.gold.growth_clusters").createOrReplace()

// Query: find sequences with similar growth rates (conjecture candidates)
spark.sql("""
  SELECT growth_bucket, n_sequences, sequences
  FROM iceberg.gold.growth_clusters
  WHERE n_sequences > 5
  ORDER BY n_sequences DESC LIMIT 10
""").show()`},{lang:"rust",filename:"mathematics_medallion.rs",code:`use iceberg_rust::catalog::glue::GlueCatalog;

// Rust mathematics reader — uses iceberg-rs for OEIS sequence queries.
// Use case: SageMath plugin that reads computed properties from the lakehouse.

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let catalog = GlueCatalog::new("math_warehouse").build()?;

    // Read OEIS properties (Silver tier) for a specific sequence
    let silver = catalog.load("silver.oeis_properties")?;
    let batch = silver.scan()
        .with_filter("oeis_id = 'A000045'")  // Fibonacci sequence
        .to_arrow().await?;

    println!("Found {} property rows for A000045 (Fibonacci)", batch.num_rows());
    Ok(())
}`},{lang:"go",filename:"mathematics_medallion.go",code:`package main

import (
    "context"
    "fmt"

    "github.com/apache/iceberg-go/api"
)

// Go mathematics reader — serverless OEIS lookup.
func main() {
    ctx := context.Background()
    catalog, _ := api.NewGlueCatalog(ctx, "math_warehouse", "s3://math-iceberg/")
    table, _ := catalog.LoadTable(ctx, "silver.oeis_properties")
    scan := table.Scan().WithFilter("oeis_id = 'A000045'")
    iter, _ := scan.ToArrowIterator(ctx)
    for rec, err := iter.Next(); err == nil; rec, err = iter.Next() {
        fmt.Printf("Sequence %s: %d terms, growth rate %.4f\\n",
            rec.GetString(0, "oeis_id"),
            rec.GetInt64(0, "n_terms"),
            rec.GetFloat64(0, "growth_rate"))
    }
}`},{lang:"elixir",filename:"mathematics_medallion.ex",code:`defmodule Mathematics.SequenceExplorer do
  @moduledoc """
  Phoenix LiveView for exploring OEIS sequences and their computed properties.
  """
  use GenServer
  alias Explorer.DataFrame, as: DF

  defstruct [:cache]

  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)

  @impl true
  def init(:ok) do
    cache = :ets.new(:oeis_cache, [:set, :public, read_concurrency: true])
    {:ok, %__MODULE__{cache: cache}}
  end

  @impl true
  def handle_call({:lookup, oeis_id}, _from, state) do
    case :ets.lookup(state.cache, oeis_id) do
      [{_, cached}] -> {:reply, cached, state}
      _ ->
        {:ok, df} = Explorer.Iceberg.scan("silver.oeis_properties",
          filters: ["oeis_id = '#{oeis_id}'"])
        props = DF.to_rows(df) |> Enum.at(0)
        :ets.insert(state.cache, {oeis_id, props})
        {:reply, props, state}
    end
  end
end`},{lang:"zig",filename:"mathematics_medallion.zig",code:`const std = @import("std");
const iceberg = @import("iceberg-zig");

// Zig mathematics reader — sub-ms OEIS sequence property lookups.
// Use case: Pari/GP plugin for conjecture verification at scale.

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var catalog = try iceberg.Catalog.glue(allocator, .{
        .database = "math_warehouse",
        .warehouse = "s3://math-iceberg/",
    });
    defer catalog.deinit();

    // Growth clusters (Gold tier) — sequences with similar growth rates
    var table = try catalog.loadTable(allocator, "gold.growth_clusters");
    defer table.deinit();

    var scan = try table.scan(allocator, .{
        .filter = "n_sequences > 5",
        .selected_fields = &.{ "growth_bucket", "n_sequences", "sequences" },
    });
    defer scan.deinit();

    while (try scan.next()) |batch| {
        const buckets = batch.get_f64_col("growth_bucket");
        const counts = batch.get_u64_col("n_sequences");
        for (buckets, counts) |bucket, count| {
            std.debug.print("Growth rate {d:.2}: {d} sequences (conjecture candidates)\\n",
                .{ bucket, count });
        }
    }
}`}],runnablePython:`# Computational mathematics medallion simulation — Pyodide
import random
from collections import defaultdict

print("=== OEIS + LMFDB on Iceberg — Bronze → Silver → Gold ===")
print("Raw sequence terms → Computed properties → Pattern discovery")
print()

# Simulate OEIS sequences (scaled from 370k to 1000)
random.seed(42)

# Famous sequences for reference
known_sequences = {
    'A000045': [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610],
    'A000040': [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53],
    'A000079': [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192],
    'A000142': [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800],
}

# Bronze: raw sequences
bronze = []
for i in range(1000):
    oeis_id = f'A{random.randint(1, 999999):06d}'
    terms = [random.randint(1, 1000) for _ in range(random.randint(5, 20))]
    bronze.append({'oeis_id': oeis_id, 'terms': terms, 'description': f'Sequence {oeis_id}'})

# Add known sequences
for oeis_id, terms in known_sequences.items():
    bronze.append({'oeis_id': oeis_id, 'terms': terms, 'description': f'Known sequence {oeis_id}'})

# Silver: compute growth rate
silver = []
for seq in bronze:
    terms = seq['terms']
    if len(terms) > 5 and terms[5] > 0 and terms[0] > 0:
        import math
        growth = math.log(terms[5] / max(terms[0], 1)) / 5
    else:
        growth = 0
    silver.append({**seq, 'n_terms': len(terms), 'growth_rate': growth})

# Gold: cluster by growth rate
gold_clusters = defaultdict(list)
for seq in silver:
    bucket = round(seq['growth_rate'], 2)
    gold_clusters[bucket].append(seq['oeis_id'])

print(f"Bronze: {len(bronze):,} raw sequences")
print(f"Silver: {len(silver):,} with computed properties")
print(f"Gold:   {len(gold_clusters)} growth-rate clusters")
print()
print("Top clusters (conjecture candidates — sequences with same growth rate):")
sorted_clusters = sorted(gold_clusters.items(), key=lambda x: -len(x[1]))
for bucket, seqs in sorted_clusters[:5]:
    known = [s for s in seqs if s in known_sequences]
    print(f"  Growth {bucket:.2f}: {len(seqs)} sequences" +
          (f" (incl. {', '.join(known)})" if known else ""))

print()
print("Mathematics IS the purest lakehouse:")
print("  Bronze = raw sequence terms (from OEIS)")
print("  Silver = computed properties (growth rate, monotonicity)")
print("  Gold = pattern discovery (conjecture candidates by growth cluster)")`,insight:"Mathematics IS the purest lakehouse — every sequence has a Bronze (raw terms), Silver (computed properties like growth rate), Gold (pattern discovery via clustering) tier. OEIS (370k sequences) and LMFDB (1M L-functions) are the canonical pure-math datasets. The medallion pattern applies even here — proving its universality beyond business and physics."}];var _=e.i(901752),v=e.i(487486),y=e.i(332017),x=e.i(178583),w=e.i(25652),S=e.i(283086),k=e.i(966992),T=e.i(227516),D=e.i(618393),E=e.i(727927);let A=`-- ============================================================
-- The data lake → lakehouse evolution in SQL (4 eras)
-- ============================================================

-- ERA 1 (2006-2014): Hadoop + Hive on HDFS
--   - Storage: HDFS (replicated blocks on commodity disks)
--   - Catalog: Hive Metastore (MySQL-backed)
--   - Compute: MapReduce → Tez → Spark
--   - Format: text/CSV/Parquet-on-HDFS
--   - Problem: HDFS is expensive (3x replication), schema is loose,
--              partition pruning is path-based (fragile)
CREATE EXTERNAL TABLE IF NOT EXISTS hive.orders (
  order_id BIGINT, customer_id BIGINT, order_ts STRING, amount DECIMAL(18,4)
)
PARTITIONED BY (dt STRING)  -- path-based: /user/hive/warehouse/orders/dt=2024-09-01/
ROW FORMAT DELIMITED FIELDS TERMINATED BY ','
STORED AS TEXTFILE;
-- To query partition, MUST write: WHERE dt='2024-09-01' (exact match)
-- No time travel. No schema evolution. No ACID. No MERGE.

-- ERA 2 (2014-2020): S3 + Hive-on-S3 (cloud-native shift)
--   - Storage: S3 (object storage, 11 9s durability, $0.023/GB-month)
--   - Catalog: Hive Metastore (same, AWS Glue Catalog managed)
--   - Compute: Spark / EMR / Athena
--   - Format: Parquet on S3
--   - Problem: S3 is not POSIX (no rename atomicity), partition paths still path-based
CREATE EXTERNAL TABLE IF NOT EXISTS glue.orders (
  order_id BIGINT, customer_id BIGINT, order_ts TIMESTAMP, amount DECIMAL(18,4)
)
PARTITIONED BY (dt STRING)
STORED AS PARQUET
LOCATION 's3://moderndatascieng-bronze/orders/';
-- Still no ACID, no time travel, no schema evolution.
-- But: S3 is 10x cheaper than HDFS, AWS managed.

-- ERA 3 (2017-2024): Open table formats — Iceberg/Delta/Hudi
--   - Storage: S3 + open table format (Iceberg/Delta/Hudi)
--   - Catalog: REST/Glue/Nessie/Unity (Hive-compatible)
--   - Compute: Spark/Trino/Flink/DuckDB/Snowflake (vendor-neutral)
--   - Format: Parquet + manifest tree / transaction log
--   - ACID, time travel, schema evolution, hidden partitioning
CREATE TABLE iceberg.orders (
  order_id BIGINT, customer_id BIGINT, order_ts TIMESTAMP, amount DECIMAL(18,4)
) USING iceberg
PARTITIONED BY (days(order_ts))  -- HIDDEN partitioning — no WHERE clause match needed
TBLPROPERTIES ('format-version' = '2');
SELECT * FROM iceberg.orders VERSION AS OF 42;  -- time travel
ALTER TABLE iceberg.orders ADD COLUMN ship_country STRING;  -- schema evolution, no rewrite

-- ERA 4 (2024+): The lakehouse-as-platform convergence
--   - Catalogs: Glue (AWS) / Unity (Databricks) / Polaris (Snowflake, Apache)
--   - All formats converging on feature parity
--   - Compute engines interchangeable (Spark, Trino, Flink, DuckDB, Snowflake, Athena)
--   - Catalog is the new control plane
`,N=`# ============================================================
# Lakehouse Medallion Architecture — Bronze / Silver / Gold
# A pure-Python simulation of the three-tier data flow.
# ============================================================

import random
import json
from datetime import datetime, timedelta

class S3Layer:
    """A logical S3 prefix — Bronze/Silver/Gold."""
    def __init__(self, name, prefix, format_type, validation_rules=None):
        self.name = name
        self.prefix = prefix
        self.format = format_type
        self.validation_rules = validation_rules or []
        self.tables = {}  # table_name → rows
        self.processed_count = 0
        self.failed_count = 0
        self.last_run_ts = None

    def write(self, table_name, rows):
        """Write to this layer with validation."""
        self.processed_count += len(rows)
        failed = []
        for rule_name, rule_fn in self.validation_rules:
            for row in rows:
                if not rule_fn(row):
                    failed.append((rule_name, row))
                    self.failed_count += 1
        if failed:
            print(f"  [{self.name}] {len(failed)} rows failed validation (rules: {set(r[0] for r in failed)})")
            # Send to DLQ (dead-letter queue) — Silver/Gold pattern
            rows = [r for r in rows if all(rule_fn(r) for _, rule_fn in self.validation_rules)]
        if table_name not in self.tables:
            self.tables[table_name] = []
        self.tables[table_name].extend(rows)
        self.last_run_ts = datetime.now()
        return len(rows)

    def read(self, table_name):
        return self.tables.get(table_name, [])

# --- Build the medallion architecture ---
bronze = S3Layer(
    name='Bronze',
    prefix='s3://moderndatascieng-bronze/',
    format_type='raw JSON / CSV / CDC events',
    validation_rules=[]  # Bronze is raw — no validation
)
silver = S3Layer(
    name='Silver',
    prefix='s3://moderndatascieng-silver/',
    format_type='Iceberg / Delta tables (cleansed + deduplicated)',
    validation_rules=[
        ('not_null_order_id', lambda r: r.get('order_id') is not None),
        ('amount_positive',   lambda r: r.get('amount', 0) > 0),
        ('currency_valid',    lambda r: r.get('currency') in ['USD', 'EUR', 'GBP']),
    ]
)
gold = S3Layer(
    name='Gold',
    prefix='s3://moderndatascieng-gold/',
    format_type='Aggregated business-ready tables (Star schema)',
    validation_rules=[
        ('customer_id_not_null', lambda r: r.get('customer_id') is not None),
        ('aggregation_check',    lambda r: r.get('total_orders', 0) > 0),
    ]
)

# --- Generate synthetic source data (raw CDC events) ---
random.seed(42)
currencies = ['USD', 'EUR', 'GBP', 'JPY']  # JPY is invalid — tests Silver validation
n_source = 100
source_events = []
for i in range(n_source):
    event = {
        'order_id': i + 1 if random.random() > 0.05 else None,  # 5% null (DLQ test)
        'customer_id': random.randint(1, 50) if random.random() > 0.1 else None,
        'order_ts': datetime(2024, 9, 1, 8, 0) + timedelta(minutes=i * 15),
        'amount': round(random.uniform(10, 500), 2) if random.random() > 0.05 else -1,
        'currency': random.choice(currencies),
        'op': random.choice(['INSERT', 'UPDATE', 'DELETE']),
    }
    source_events.append(event)

print("=== Bronze Layer (raw ingestion — no validation) ===")
print(f"  Source: {len(source_events)} synthetic CDC events from MySQL Debezium")
print(f"  Format: raw JSON on S3 (s3://bronze/orders/dt=2024-09-01/raw-001.json)")
bronze.write('orders_raw', source_events)
print(f"  Bronze tables: {list(bronze.tables.keys())}")
print(f"  Bronze rows: {sum(len(r) for r in bronze.tables.values())}")
print()

print("=== Bronze → Silver (transform + validate + deduplicate) ===")
print("  Actions: parse JSON, normalise currency, deduplicate by order_id, apply validation rules")
# Bronze → Silver transform
silver_rows = []
seen_order_ids = set()
for event in bronze.read('orders_raw'):
    # Deduplicate
    oid = event['order_id']
    if oid is None:
        silver_rows.append(event)  # send to DLQ via Silver validation
        continue
    if oid in seen_order_ids:
        continue  # dedupe
    seen_order_ids.add(oid)
    # Normalise: USD amount (skip FX for simplicity)
    fx = {'USD': 1.0, 'EUR': 1.09, 'GBP': 1.27, 'JPY': 0.0067}
    row = {**event, 'amount_usd': round(event['amount'] * fx.get(event['currency'], 1.0), 2)}
    silver_rows.append(row)
silver.write('orders_silver', silver_rows)
print(f"  Silver tables: {list(silver.tables.keys())}")
print(f"  Silver rows (passed validation): {sum(len(r) for r in silver.tables.values())}")
print(f"  Validation: {silver.failed_count} rows sent to DLQ (dead-letter queue)")
print()

print("=== Silver → Gold (aggregate + business-ready star schema) ===")
print("  Actions: aggregate by customer_id, compute total_orders + total_amount_usd")
# Silver → Gold aggregation
customer_agg = {}
for row in silver.read('orders_silver'):
    cid = row['customer_id']
    if cid is None:
        continue
    if cid not in customer_agg:
        customer_agg[cid] = {'customer_id': cid, 'total_orders': 0, 'total_amount_usd': 0.0, 'n_currencies': set()}
    customer_agg[cid]['total_orders'] += 1
    customer_agg[cid]['total_amount_usd'] += row.get('amount_usd', 0)
    customer_agg[cid]['n_currencies'].add(row['currency'])
gold_rows = []
for agg in customer_agg.values():
    agg['n_currencies'] = len(agg['n_currencies'])
    gold_rows.append(agg)
gold.write('dim_customer_agg', gold_rows)
print(f"  Gold tables: {list(gold.tables.keys())}")
print(f"  Gold rows: {sum(len(r) for r in gold.tables.values())}")
print()

print("=== Final Gold layer — business-ready analytics tables ===")
for table_name, rows in gold.tables.items():
    print(f"  Table: {table_name} ({len(rows)} rows)")
    for r in rows[:3]:
        print(f"    {r}")
    if len(rows) > 3:
        print(f"    ... ({len(rows) - 3} more)")
print()
print("Key insight: Medallion is the production pattern for lakehouse ETL.")
print("Bronze = raw (no validation, schema-on-read).")
print("Silver = cleansed + deduplicated + validated (schema-on-write, Iceberg/Delta).")
print("Gold = aggregated business-ready (star schema, BI-ready).")`;function j(){let e=[{year:"2006-2014",name:"Hadoop + Hive on HDFS",tech:["HDFS","Hive Metastore","MapReduce","Parquet-on-HDFS"],problems:["3x replication cost","Path-based partitions (fragile)","No ACID","Schema drift"],color:"var(--chart-3)"},{year:"2014-2020",name:"S3 + Hive-on-S3 (cloud-native shift)",tech:["S3","Glue Catalog","Spark/EMR/Athena","Parquet on S3"],problems:["S3 not POSIX (no rename atomicity)","Path-based partitions still","No ACID","Schema drift still"],color:"var(--chart-2)"},{year:"2017-2024",name:"Open table formats — Iceberg/Delta/Hudi",tech:["S3 + Iceberg/Delta/Hudi","REST/Glue/Nessie/Unity catalogs","Spark/Trino/Flink/DuckDB/Snowflake","Parquet + manifest/log"],problems:["Solved: ACID ✓","Solved: hidden partitioning ✓","Solved: schema evolution ✓","Solved: time travel ✓"],color:"var(--chart-1)"},{year:"2024+",name:"Lakehouse-as-platform convergence",tech:["Catalogs: Glue/Unity/Polaris","All formats feature-parity","Compute engines interchangeable","Catalog is control plane"],problems:["Catalog battle (open vs closed)","Liquid Clustering vs Z-Order vs Sort Order","Streaming + batch convergence"],color:"var(--chart-4)"}],[r,o]=(0,t.useState)(2);return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(T.History,{className:"h-3.5 w-3.5 text-primary"}),"Data lake → lakehouse evolution timeline (2006 → 2024+)"]})}),(0,a.jsxs)("div",{className:"p-3",children:[(0,a.jsxs)("svg",{viewBox:"0 0 420 200",className:"w-full h-auto",children:[(0,a.jsx)("line",{x1:"20",y1:"100",x2:"400",y2:"100",stroke:"var(--border)",strokeWidth:"2"}),e.map((e,t)=>{let i=50+90*t,n=r===t;return(0,a.jsxs)(s.motion.g,{onMouseEnter:()=>o(t),onMouseLeave:()=>o(null),animate:{scale:n?1.05:1},style:{cursor:"pointer"},children:[(0,a.jsx)("circle",{cx:i,cy:"100",r:n?8:5,fill:e.color,stroke:"var(--background)",strokeWidth:"2"}),(0,a.jsx)("text",{x:i,y:n?80:88,textAnchor:"middle",fontSize:"8",fill:n?e.color:"var(--muted-foreground)",fontWeight:n?"bold":"normal",children:e.year}),(0,a.jsx)("text",{x:i,y:n?125:120,textAnchor:"middle",fontSize:"7",fill:n?e.color:"var(--foreground)",children:e.name.length>30?e.name.substring(0,28)+"...":e.name})]},t)})]}),null!==r&&(0,a.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-3 text-xs space-y-2",children:[(0,a.jsxs)("p",{className:"font-semibold",style:{color:e[r].color},children:[e[r].year,": ",e[r].name]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5",children:"Stack"}),(0,a.jsx)("p",{className:"text-muted-foreground",children:e[r].tech.join(" · ")})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5",children:"Status"}),(0,a.jsx)("p",{className:"text-muted-foreground",children:e[r].problems.join(" · ")})]})]}),null===r&&(0,a.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any era — the timeline shows 4 generations, each fixing the previous era's pain."})]})]})}function I(){let e=[{name:"Bronze",color:"var(--chart-3)",desc:"Raw ingestion — schema-on-read, no validation, append-only",format:"JSON/CSV/CDC"},{name:"Silver",color:"var(--muted-foreground)",desc:"Cleansed + deduplicated + validated — schema-on-write, Iceberg/Delta tables",format:"Iceberg/Delta"},{name:"Gold",color:"var(--chart-1)",desc:"Aggregated business-ready — star schema, BI-ready, reverse-ETL source",format:"Aggregated tables"}];return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(f.Layers,{className:"h-3.5 w-3.5 text-primary"}),"Medallion architecture — Bronze → Silver → Gold"]})}),(0,a.jsx)("div",{className:"p-3",children:(0,a.jsxs)("svg",{viewBox:"0 0 420 200",className:"w-full h-auto",children:[e.map((r,t)=>{let s=60+130*t;return(0,a.jsxs)("g",{children:[(0,a.jsx)("circle",{cx:s,cy:"100",r:"40",fill:r.color+"20",stroke:r.color,strokeWidth:"2"}),(0,a.jsx)("text",{x:s,y:"98",textAnchor:"middle",fontSize:"11",fill:r.color,fontWeight:"bold",children:r.name}),(0,a.jsx)("text",{x:s,y:"113",textAnchor:"middle",fontSize:"7",fill:r.color,opacity:"0.7",children:r.format}),t<e.length-1&&(0,a.jsxs)("g",{children:[(0,a.jsx)("line",{x1:s+42,y1:"100",x2:s+88,y2:"100",stroke:"var(--border)",strokeWidth:"1.5",markerEnd:"url(#medal-arrow)"}),(0,a.jsx)("text",{x:s+65,y:"92",textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:"transform"})]})]},t)}),e.map((e,r)=>{let t=60+130*r,s=e.desc.length>35?[e.desc.substring(0,33),e.desc.substring(33)]:[e.desc];return(0,a.jsx)("g",{children:s.map((e,r)=>(0,a.jsx)("text",{x:t,y:150+10*r,textAnchor:"middle",fontSize:"7",fill:"var(--muted-foreground)",children:e},r))},`desc-${r}`)}),(0,a.jsx)("defs",{children:(0,a.jsx)("marker",{id:"medal-arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,a.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]})}),(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/30 border-t border-border/60",children:(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"Bronze = raw ingestion (no validation, schema-on-read). Silver = cleansed + deduplicated + validated (schema-on-write, Iceberg/Delta). Gold = aggregated business-ready (star schema, BI-ready, reverse-ETL source for CRM/ads/email)."})})]})}let C=[{label:"Era started",value:"2017 (Iceberg + Delta)",hint:"Open table formats launched: Hudi (Uber 2016), Iceberg (Netflix 2017), Delta (Databricks 2017)",deltaTone:"up"},{label:"Academic foundation",value:"Armbrust 2020 (CIDR)",hint:"'Lakehouse: A New Generation of Open Platforms' — the paper that named the category",deltaTone:"flat"},{label:"Open formats",value:"3 (Iceberg, Delta, Hudi)",hint:"All open-source (Apache), converging on feature parity; choice driven by ecosystem fit",deltaTone:"flat"},{label:"Production scale",value:"EB-scale, 100s of enterprises",hint:"Netflix, Apple, Stripe (Iceberg); Uber, Walmart, ByteDance (Hudi); every Databricks customer (Delta)",deltaTone:"up"}];function G(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(o.PageHeader,{eyebrow:"Data Lakehouse · concept anchor · Hadoop → S3 → Iceberg/Delta/Hudi · Armbrust 2020 · medallion",title:"Data Lakehouse — the unification of data lake + warehouse",description:"The lakehouse is the architectural pattern that unifies data lakes (cheap S3 storage, open formats, any compute) with data warehouses (ACID transactions, SQL semantics, schema enforcement, time travel). It emerged 2016-2020 across three independent origins — Uber (Hudi, 2016), Netflix (Iceberg, 2017), Databricks (Delta, 2017) — and was named academically by Armbrust et al. 2020 in 'Lakehouse: A New Generation of Open Platforms that Make Data-Pluralism the Norm' (CIDR). The unifying insight: 40-year-old database patterns (write-ahead logs, MVCC, B-trees, LSM-trees) work fine on object storage if you wrap Parquet files with a metadata layer. The three formats are converging on feature parity; the new frontier is the catalog battle (Glue vs Unity vs Polaris vs Nessie). This page is the concept anchor for the entire Data Lakehouse group — Iceberg, Delta, Hudi, Glue, Catalogs all build on this foundation.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(v.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(f.Layers,{className:"h-3 w-3"})," Concept anchor"]}),(0,a.jsxs)(v.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(T.History,{className:"h-3 w-3"})," 4-era evolution"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:C.map(e=>(0,a.jsx)(o.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(o.SectionCard,{title:"Evolution timeline — 4 eras from Hadoop (2006) to lakehouse (2024+)",description:"Four generations of data-lake architecture, each fixing the previous era's pain. Era 1 (Hadoop + Hive on HDFS): replicated blocks, path-based partitions, no ACID. Era 2 (S3 + Hive-on-S3): cloud-native storage, 10x cheaper than HDFS, but still path-based partitions and no ACID. Era 3 (open table formats — Iceberg/Delta/Hudi): ACID, time travel, hidden partitioning, schema evolution. Era 4 (2024+ lakehouse-as-platform): catalog battle (Glue vs Unity vs Polaris), Liquid Clustering, convergence on feature parity.",icon:(0,a.jsx)(T.History,{className:"h-5 w-5"}),badge:"evolution",children:(0,a.jsx)(j,{})}),(0,a.jsx)(o.SectionCard,{title:"Evolution in SQL — Hive-on-HDFS → Hive-on-S3 → Iceberg → lakehouse-as-platform",description:"The same DDL/DML pattern across all four eras shows what each generation added. Era 1 Hive: external table, path-based partitions (s3://bucket/dt=2024-09-01/), no ACID, no time travel. Era 2 Hive-on-S3: same SQL, just S3 location instead of HDFS. Era 3 Iceberg: USING iceberg, days(order_ts) hidden partitioning, VERSION AS OF time travel, ADD COLUMN schema evolution. Era 4: catalog-managed cross-engine reads, the catalog is the control plane.",icon:(0,a.jsx)(g.Database,{className:"h-5 w-5"}),badge:"SQL",children:(0,a.jsx)(n.CodeBlock,{code:A,language:"sql",filename:"lakehouse_evolution.sql",highlight:[7,8,9,10,11,19,20,21,30,31,32,41,42,43,44,45,51,52,53,54]})}),(0,a.jsx)(o.SectionCard,{title:"Medallion architecture — Bronze → Silver → Gold",description:"Databricks coined 'medallion' for the three-tier ETL pattern that production lakehouses follow. Bronze = raw ingestion (no validation, schema-on-read, append-only). Silver = cleansed + deduplicated + validated (schema-on-write, Iceberg/Delta tables, MERGE upserts). Gold = aggregated business-ready (star schema, BI-ready, reverse-ETL source for CRM/ads/email). Each tier is an Iceberg/Delta table; the tiers are connected via Spark/Trino ETL jobs, scheduled via Airflow. The medallion is the production pattern — every Netflix, Apple, Stripe lakehouse follows it.",icon:(0,a.jsx)(f.Layers,{className:"h-5 w-5"}),badge:"medallion",children:(0,a.jsx)(I,{})}),(0,a.jsx)(o.SectionCard,{title:"Try it: simulate Bronze → Silver → Gold in your browser (Pyodide)",description:"Pure-Python simulation of the medallion ETL pattern. Generate 100 synthetic CDC events (with some null order_ids and negative amounts to test validation), ingest into Bronze (no validation), transform + validate + deduplicate into Silver (failed rows sent to DLQ), aggregate by customer into Gold (business-ready). See the medallion pattern end-to-end.",icon:(0,a.jsx)(S.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,a.jsx)(l.PyodideRunner,{code:N,buttonLabel:"Run Medallion simulation (Pyodide)"})}),(0,a.jsx)(o.SectionCard,{title:"Why the lakehouse evolved — four eras of analytics platforms",description:"The lakehouse is not a single invention but the convergence of four 5-year eras: Hadoop-on-HDFS (2006-2011), Hive-on-S3 (2012-2016), open table formats (2017-2022), and vendor-neutral catalogs (2023-2024). Each era fixed a structural shortfall of the prior — the lakehouse is the cumulative result.",icon:(0,a.jsx)(T.History,{className:"h-5 w-5"}),badge:"Why Lakehouse",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1 (Hadoop + HDFS, 2006-2011): Storage tied to compute."})," HDFS co-located data blocks with compute nodes — to scale storage you scaled compute, and vice versa. Petabyte-scale data on a 50-node HDFS cluster meant 50 nodes of idle compute during quiet hours. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Object storage (S3, 2006; ADLS, 2015; GCS, 2010) decoupled them — storage is now ~$23/TB/mo flat, compute spins up on demand."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2 (Hive-on-S3, 2012-2016): No ACID, no schema enforcement."})," Customers moved Hive tables to S3 to decouple storage from compute — but S3 has no rename, so Hive commits were non-atomic (concurrent writers clobbered each other, schema drift broke readers silently). The lake had warehouse economics but no warehouse semantics. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Iceberg/Delta/Hudi (2017) added transaction logs + schema-in-metadata, restoring ACID + schema on top of cheap S3."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3 (Open table formats, 2017-2022): No vendor-neutral control plane."})," Each format shipped its own catalog — Iceberg used HMS, Delta used Unity, Hudi used HMS. Multi-format, multi-cloud lakehouses required per-vendor integrations. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Polaris (Snowflake, 2024) + Nessie (Dremio, 2020) + Unity (Databricks, 2021) converged on the Iceberg REST catalog spec — one protocol, multiple vendors, portability wins."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4 (Pre-lakehouse era): Warehouse + lake duplication."})," Companies ran a Snowflake/BigQuery warehouse for BI + a Spark-on-S3 lake for ML, duplicating data, schema, and governance across the two. Pipeline drift between warehouse and lake caused reconciliations daily. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," The lakehouse unifies them — one copy of data on S3, governed by one catalog, queried by SQL engines (Trino/Athena) and ML engines (Spark/Ray) on the same files."]})]})}),(0,a.jsx)(o.SectionCard,{title:"Truly unique lakehouse features (vs warehouse + lake)",description:"Four structural advantages of the lakehouse pattern — they make it qualitatively different from running a warehouse and a lake in parallel, not just an incremental improvement.",icon:(0,a.jsx)(S.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Lake + warehouse unification"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["One copy of data on cheap object storage, served by both BI engines (Trino, Snowflake, Athena) and ML engines (Spark, Ray) reading the same Parquet files. ",(0,a.jsx)("strong",{children:"Pre-lakehouse required duplicated ETL into a warehouse + lake, with reconciliation pipelines in between."})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Medallion pattern"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Bronze (raw) → Silver (cleansed) → Gold (curated) layers on the same storage, with one governance layer. ",(0,a.jsx)("strong",{children:"Warehouses have no equivalent of the medallion — they have one curated layer and lose the raw data lineage."})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Open-format vendor-neutrality"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Parquet + Iceberg/Delta/Hudi are Apache-licensed — tables on S3 are readable by any compliant engine. ",(0,a.jsx)("strong",{children:"Snowflake + BigQuery + Redshift internal formats are closed and proprietary."})," The lakehouse gives customers exit options."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Catalog-as-control-plane"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Unity, Polaris, Nessie treat the catalog as the governance plane (RBAC, lineage, audit) above multiple compute engines. ",(0,a.jsx)("strong",{children:"Pre-lakehouse catalogs were just metastores; lakehouse catalogs are the security + governance layer."})]})]})]})}),(0,a.jsx)(o.SectionCard,{title:"3 large-dataset examples — cards with 5-language code popups",description:"Three production-style lakehouse scenarios (Bronze→Silver→Gold medallion, multi-engine query, cross-cloud catalog). Each is a clickable card opening a lazy popup with: scenario brief, dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,a.jsx)(g.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,a.jsx)(d.DatasetCards,{examples:u.LAKEHOUSE_EXAMPLES,intro:"Production-style lakehouse scenarios showing the unification pattern: Bronze→Silver→Gold medallion ETL, multi-engine (Trino + Spark + Flink) cross-query, and Polaris/Nessie/Unity cross-cloud catalogs. Each card has Scala/Rust/Go/Elixir/Zig code with lakehouse-specific primitives."})}),(0,a.jsx)(o.SectionCard,{title:"Scientific lakehouse — the medallion pattern applied to science (6 examples)",description:"The lakehouse is the starting point of everything — the medallion Bronze→Silver→Gold pattern applies universally beyond business data. These 6 examples show the pattern in action across life sciences (genomics, clinical trials, single-cell), environmental sensors, particle physics (CERN LHC), and pure mathematics (OEIS). Each demonstrates how Iceberg's hidden partitioning + time travel + schema evolution solve domain-specific big-data problems at petabyte scale.",icon:(0,a.jsx)(p.Atom,{className:"h-5 w-5"}),badge:"6 science examples × 5 langs",children:(0,a.jsx)(d.DatasetCards,{examples:b,intro:"Life sciences (1000 Genomes 100TB, FDA FAERS 15M reports, Single-cell 50TB) + Sensors (EPA AirNow 10TB) + Physics (CERN LHC 1PB) + Mathematics (OEIS 370k sequences). Each card has Scala/Rust/Go/Elixir/Zig code showing the Bronze→Silver→Gold medallion pipeline for that scientific domain."})}),(0,a.jsx)(o.SectionCard,{title:"Computational tooling — the lakehouse ecosystem",description:"The lakehouse is the union of three ecosystems: open table formats (Iceberg/Delta/Hudi), 8+ compute engines, and 5+ catalogs. No single vendor owns it — Databricks, Snowflake, AWS, Apache, and Dremio each ship pieces.",icon:(0,a.jsx)(D.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(k.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute engines (8+)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Spark 3.5+"})," — primary write engine across all 3 formats"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Trino 425+"})," — federated SQL reads (fastest lakehouse BI engine)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Flink 1.18+"})," — streaming CDC ingestion (Iceberg/Delta/Hudi)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"DuckDB 0.10+"})," — laptop-scale analytics on Iceberg + Delta"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Iceberg engines"})," — Spark, Trino, Flink, DuckDB, Athena, Snowflake, Impala, BeeHyve (8+)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Databricks Photon"})," — C++ rewrite of Spark, 4× faster on Delta"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Snowflake (external tables)"})," — Iceberg + Delta federation"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Amazon Athena + Redshift"})," — serverless reads via Glue Catalog"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(E.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Catalogs + formats (5)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Iceberg"})," — Netflix origin, vendor-neutral catalogs, hidden partitioning"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Delta Lake"})," — Databricks origin, Liquid Clustering, CDF, delta-rs"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Hudi"})," — Uber origin, MOR LSM-tree, native CDC ingestion"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Databricks Unity Catalog"})," — Delta-native, column RBAC, lineage"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Snowflake Polaris (2024)"})," — Apache-licensed REST catalog, multi-cloud"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Project Nessie (Dremio)"})," — Git-for-data branching on Iceberg"]})]})]})]})}),(0,a.jsx)(o.SectionCard,{title:"Research + the three independent origins",description:"The lakehouse emerged independently at three companies in 2016-2017. The Armbrust 2020 paper named the category; the engineering blogs document the production pain that drove each format's design.",icon:(0,a.jsx)(x.FileText,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Armbrust et al. 2020 (CIDR):"})," \"Lakehouse: A New Generation of Open Platforms that Make Data-Pluralism the Norm.\" The foundational academic paper, written by Databricks founders (Michael Armbrust, Reynold Xin, Matei Zaharia et al.). Argued that the data lake + warehouse split was a historical accident — open table formats could give lakes the ACID + SQL + schema semantics of warehouses, while keeping cheap S3 storage. Named the category 'lakehouse' and is the academic reference for the entire movement. Validated empirically by Databricks customers migrating from warehouse-only (Snowflake) to lakehouse (Databricks + Delta)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Apache Hudi origin (Uber 2016):"})," Vinoth Chandar et al. built Hudi internally at Uber to sync MySQL trip data to S3 for analytics. The pain: every CDC update required rewriting the entire Hive partition — too slow for petabyte-scale trip data. Hudi's UPSERT-first design (COW + MOR table types) solved this. Open-sourced 2016, joined Apache Foundation 2019. Hudi's distinctive contribution: the LSM-tree-on-S3 pattern (MOR tables with delta log files + async compaction)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Apache Iceberg origin (Netflix 2017):"})," Ryan Blue et al. built Iceberg internally at Netflix to handle petabytes of page-view + engagement data on Hive. The pain: Hive's path-based partitions required exact WHERE clause match, schema evolution broke downstream queries, time travel required snapshot IDs in user code. Iceberg's distinctive contribution: hidden partitioning (partition transform stored in metadata, not in path) + the manifest tree (metadata.json → snapshot → manifest list → manifests → Parquet data files)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Delta Lake origin (Databricks 2017):"})," Databricks built Delta internally (codename TACHYON) to fix Hive-on-S3 pain for their customers. The pain: no ACID, slow MERGE, schema evolution broke queries. Delta's distinctive contribution: the JSON transaction log (_delta_log/) with periodic Parquet checkpoints — structurally a PostgreSQL WAL. Open-sourced 2019, joined Apache Foundation 2023 (still incubating). Most widely-deployed because every Databricks customer uses it by default."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Trino / Presto origin (Facebook 2012):"})," Facebook built Presto to query Hive-on-S3 federated across multiple data sources. Martin Traverso et al. forked to Trino in 2020 over governance disagreements. Trino is the gold-standard federated SQL engine — treats Iceberg/Delta/Hudi tables as first-class, can JOIN across catalogs (Iceberg on S3 + MySQL + Kafka in one query). Production at Netflix, LinkedIn, Uber."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Convergence 2024+:"})," All three formats now support UPSERT, schema evolution, time travel, compaction, hidden partitioning (or its equivalent). Differentiators narrowing. The new battlefronts: catalogs (Glue vs Unity vs Polaris vs Nessie), clustering algorithms (Liquid Clustering vs Iceberg Sort Order vs Hudi Clustering Keys), and streaming-batch convergence (Flink + Iceberg + Hudi blurring the boundary)."]})]})}),(0,a.jsx)(o.SectionCard,{title:"My deeper thought: lakehouse IS the application of 40-year-old database patterns to object storage",description:"The unifying view: every lakehouse 'innovation' is the recognition that database patterns (WAL, MVCC, B-trees, LSM-trees, logical replication) work on object storage if you wrap Parquet files with a metadata layer. The metadata layer is the innovation; the Parquet files are unchanged.",icon:(0,a.jsx)(w.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Lakehouse IS the application of 40-year-old database patterns to object storage."})," Write-ahead logs (PostgreSQL 1989), MVCC (PostgreSQL 1985), B-trees (Bayer-McCreight 1972), LSM-trees (O'Neil 1996), logical replication (PostgreSQL v10 2017) — all of these patterns predate the data lakehouse movement by decades. The lakehouse 'innovation' is not inventing these patterns; it's recognising that they work on object storage (S3/ADLS/GCS) if you wrap the immutable Parquet files with a metadata layer. Iceberg's manifest tree = WAL. Delta's _delta_log/ = WAL. Hudi's .hoodie/ timeline = WAL. All three are the same idea — apply the WAL pattern to a lake of Parquet files."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Medallion IS the layered storage hierarchy."})," Bronze (raw, schema-on-read) → Silver (cleansed, schema-on-write) → Gold (aggregated, business-ready) maps exactly to the classical data warehouse tiers: staging → integration → mart. The medallion is just the new name for the same three-tier pattern, applied to object storage. The innovation is that all three tiers are open Iceberg/Delta tables (interchangeable across compute engines), vs the warehouse-era where each tier was a vendor-specific table format. Open formats make the medallion portable."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Three formats converged because they all rediscovered the WAL."})," Uber, Netflix, and Databricks independently invented Hudi, Iceberg, and Delta in 2016-2017. All three rediscovered the same pattern: append-only log of commits + immutable Parquet files + periodic compaction. They could not have copied each other — they were built simultaneously at different companies. The convergence on the WAL pattern is evidence that the pattern is the natural solution to the problem (ACID on object storage), not a coincidence. The three formats differ in details (Hudi's LSM-tree focus vs Iceberg's hidden partitioning vs Delta's Databricks integration), but the structural pattern is identical."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Catalog battle IS the new frontier because the format battle is largely won."})," The format battle (Iceberg vs Delta vs Hudi) is mostly decided: Iceberg wins outside Databricks/Snowflake, Delta wins inside Databricks, Hudi wins for CDC-heavy workloads. The catalog battle (Glue vs Unity vs Polaris vs Nessie) is the new frontier because the catalog is the control plane — it governs access, lineage, audit, branching. Snowflake made Polaris open-source (2024) specifically to win this battle; the bet is that the catalog becomes the new 'database' — managed, centralised, multi-tenant, with compute engines as interchangeable clients. Whoever wins the catalog wins the next decade of lakehouse platform revenue."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"The lakehouse IS the death of the warehouse-vs-lake split."})," The 2010s debate (warehouse for structured analytics vs lake for raw data) is over. The lakehouse won. Pure warehouses (Snowflake, BigQuery, Redshift) are pivoting to support Iceberg natively — Snowflake Polaris, BigQuery Iceberg, Redshift Spectrum all read external Iceberg tables. Pure lakes (Hadoop-on-S3) are adding warehouse semantics via Iceberg/Delta. The split that defined the 2010s has dissolved into a single architectural pattern: cheap S3 storage + open table format + open catalog + interchangeable compute engines. That's the lakehouse."]})]})}),(0,a.jsxs)(y.DeeperThoughtSection,{pageTitle:"Data Lakehouse",children:[(0,a.jsx)(y.DeeperThought,{title:"Data Lakehouse IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,a.jsx)("p",{children:"This page about Data Lakehouse is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Data Lakehouse connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Data Lakehouse sits in the computational-science landscape."})}),(0,a.jsx)(y.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,a.jsx)("p",{children:"In a decade, the specific tools on this page (Data Lakehouse) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,a.jsx)(y.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,a.jsx)(y.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,a.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,a.jsx)(y.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,a.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,a.jsx)(c.RelatedTopics,{topics:[{id:"iceberg",reason:"Netflix-origin open table format — the most production-deployed outside Databricks"},{id:"delta-lake",reason:"Databricks-origin open table format — the most production-deployed overall"},{id:"hudi",reason:"Uber-origin open table format — UPSERT-first for CDC"},{id:"glue",reason:"AWS-native catalog + ETL — the AWS on-ramp to lakehouse"},{id:"catalogs",reason:"Glue vs Hive vs Nessie vs Unity vs Polaris — the new catalog battlefront"},{id:"databricks",reason:"Spark + Delta + Unity = the Databricks lakehouse stack"},{id:"snowflake",reason:"Snowflake Polaris + Iceberg = the open lakehouse alternative"},{id:"modern-big-data",reason:"Modern big-data stack overview — big-picture context"}]}),(0,a.jsx)(i.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"iceberg",reason:"Netflix-origin open table format — the most production-deployed outside Databricks"},{id:"delta-lake",reason:"Databricks-origin open table format — the most production-deployed overall"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(r.default,{href:(0,_.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (Netflix origin)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(r.default,{href:(0,_.hrefFor)("delta-lake"),className:"text-sm text-primary hover:underline",children:"→ Delta Lake (Databricks origin)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(r.default,{href:(0,_.hrefFor)("hudi"),className:"text-sm text-primary hover:underline",children:"→ Apache Hudi (Uber origin)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(r.default,{href:(0,_.hrefFor)("glue"),className:"text-sm text-primary hover:underline",children:"→ AWS Glue (catalog + ETL)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(r.default,{href:(0,_.hrefFor)("catalogs"),className:"text-sm text-primary hover:underline",children:"→ Catalogs comparison (Glue vs Hive vs Nessie vs Unity vs Polaris)"})]})]})}e.s(["DataLakehousePage",()=>G],546208)}]);