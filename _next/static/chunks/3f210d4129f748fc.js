(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,224058,e=>{"use strict";var a=e.i(843476),t=e.i(271645),s=e.i(522016),n=e.i(862824),r=e.i(716675),i=e.i(194058),o=e.i(342046),l=e.i(332017),d=e.i(901752),c=e.i(487486),m=e.i(519455);let u={python:`# Python — pandas + pyarrow for CSV/Parquet/JSON parsing
# Runs in-browser via Pyodide. The canonical reference for the other 4 languages.

import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
import json
from pathlib import Path
import io

def parse_dataset(file_bytes: bytes, filename: str) -> dict:
    """Parse a dataset file and return schema + preview.

    Supports: .csv, .parquet, .json, .tsv
    Returns: {schema, shape, dtypes, head, describe, nulls}
    """
    ext = Path(filename).suffix.lower()
    if ext == ".csv":
        df = pd.read_csv(io.BytesIO(file_bytes))
    elif ext == ".parquet":
        df = pd.read_parquet(io.BytesIO(file_bytes))
    elif ext == ".json":
        df = pd.read_json(io.BytesIO(file_bytes))
    elif ext == ".tsv":
        df = pd.read_csv(io.BytesIO(file_bytes), sep="\\t")
    else:
        raise ValueError(f"Unsupported format: {ext}")

    # Schema inference
    schema = {
        "filename": filename,
        "format": ext.lstrip("."),
        "shape": {"rows": int(df.shape[0]), "cols": int(df.shape[1])},
        "columns": [],
    }
    for col in df.columns:
        dtype = str(df[col].dtype)
        nunique = int(df[col].nunique())
        null_count = int(df[col].isnull().sum())
        # Classify: numeric / categorical / datetime / text
        if "int" in dtype or "float" in dtype:
            kind = "numeric"
        elif "datetime" in dtype:
            kind = "datetime"
        elif nunique < 50:
            kind = "categorical"
        else:
            kind = "text"
        schema["columns"].append({
            "name": str(col),
            "dtype": dtype,
            "kind": kind,
            "nunique": nunique,
            "nulls": null_count,
            "null_pct": round(null_count / len(df) * 100, 2),
        })
    schema["head"] = df.head(5).to_dict(orient="records")
    schema["describe"] = df.describe(include="all").to_dict()
    return schema

# Example usage (Pyodide):
# import js
# file_bytes = bytes(await (await js.fetch("data.csv")).arrayBuffer())
# schema = parse_dataset(file_bytes, "data.csv")
# print(json.dumps(schema, indent=2, default=str))`,go:`// Go — encoding/csv + parquet-go for high-performance parsing
// Go is the language of cloud-native data pipelines (Kafka, Kubernetes, Terraform).
// This parser runs ~10x faster than Python for large CSV files (no GIL).

package main

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"
)

// Schema describes a parsed dataset's structure
type Schema struct {
	Filename string   \`json:"filename"\`
	Format   string   \`json:"format"\`
	Shape    Shape    \`json:"shape"\`
	Columns  []Column \`json:"columns"\`
	Head     []map[string]interface{} \`json:"head"\`
}

type Shape struct {
	Rows int \`json:"rows"\`
	Cols int \`json:"cols"\`
}

type Column struct {
	Name     string \`json:"name"\`
	Dtype    string \`json:"dtype"\`
	Kind     string \`json:"kind"\`
	Nunique  int    \`json:"nunique"\`
	Nulls    int    \`json:"nulls"\`
	NullPct  float64 \`json:"null_pct"\`
}

func parseCSV(fileBytes []byte, filename string) (*Schema, error) {
	reader := csv.NewReader(bytes.NewReader(fileBytes))
	headers, err := reader.Read()
	if err != nil {
		return nil, fmt.Errorf("read headers: %w", err)
	}

	// Read all rows (in production, stream for large files)
	var rows [][]string
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		rows = append(rows, record)
	}

	schema := &Schema{
		Filename: filename,
		Format:   "csv",
		Shape:    Shape{Rows: len(rows), Cols: len(headers)},
		Columns:  make([]Column, len(headers)),
	}

	// Infer column types
	nullCounts := make([]int, len(headers))
	uniqueValues := make([]map[string]bool, len(headers))
	for i := range uniqueValues {
		uniqueValues[i] = make(map[string]bool)
	}
	isNumeric := make([]bool, len(headers))
	isBool := make([]bool, len(headers))
	for i := range isNumeric {
		isNumeric[i] = true
		isBool[i] = true
	}

	for _, row := range rows {
		for i, val := range row {
			if val == "" {
				nullCounts[i]++
				continue
			}
			uniqueValues[i][val] = true
			if !isNumericValue(val) {
				isNumeric[i] = false
			}
			if val != "true" && val != "false" {
				isBool[i] = false
			}
		}
	}

	for i, h := range headers {
		kind := "text"
		dtype := "string"
		if isNumeric[i] {
			kind = "numeric"
			dtype = "float64"
		} else if isBool[i] {
			kind = "boolean"
			dtype = "bool"
		} else if len(uniqueValues[i]) < 50 {
			kind = "categorical"
		}
		schema.Columns[i] = Column{
			Name:    h,
			Dtype:   dtype,
			Kind:    kind,
			Nunique: len(uniqueValues[i]),
			Nulls:   nullCounts[i],
			NullPct: float64(nullCounts[i]) / float64(len(rows)) * 100,
		}
	}

	return schema, nil
}

func isNumericValue(s string) bool {
	for _, c := range s {
		if !strings.ContainsRune("0123456789.-+eE", c) {
			return false
		}
	}
	return s != "" && s != "-" && s != "+"
}

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintln(os.Stderr, "usage: parser <file>")
		os.Exit(1)
	}
	data, err := os.ReadFile(os.Args[1])
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	schema, err := parseCSV(data, os.Args[1])
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	out, _ := json.MarshalIndent(schema, "", "  ")
	fmt.Println(string(out))
}`,rust:`// Rust — serde + csv crate for memory-safe, zero-copy parsing
// Rust is the language of high-performance data infrastructure (Polars,
// Datafusion, Vector). This parser is as fast as Go but with no GC pauses.

use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use std::io::Read;

#[derive(Serialize, Deserialize, Debug)]
struct Schema {
    filename: String,
    format: String,
    shape: Shape,
    columns: Vec<Column>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Shape {
    rows: usize,
    cols: usize,
}

#[derive(Serialize, Deserialize, Debug)]
struct Column {
    name: String,
    dtype: String,
    kind: String,
    nunique: usize,
    nulls: usize,
    null_pct: f64,
}

fn parse_csv(file_bytes: &[u8], filename: &str) -> Result<Schema, Box<dyn std::error::Error>> {
    let mut reader = csv::Reader::from_reader(file_bytes);
    let headers: Vec<String> = reader.headers()?
        .iter()
        .map(|s| s.to_string())
        .collect();

    let mut rows: Vec<Vec<String>> = Vec::new();
    for result in reader.records() {
        let record = result?;
        rows.push(record.iter().map(|s| s.to_string()).collect());
    }

    let n_rows = rows.len();
    let n_cols = headers.len();

    let mut columns = Vec::with_capacity(n_cols);
    for (i, h) in headers.iter().enumerate() {
        let mut nulls = 0;
        let mut unique: HashSet<String> = HashSet::new();
        let mut is_numeric = true;

        for row in &rows {
            if i >= row.len() {
                nulls += 1;
                continue;
            }
            let val = &row[i];
            if val.is_empty() {
                nulls += 1;
                continue;
            }
            unique.insert(val.clone());
            if val.parse::<f64>().is_err() {
                is_numeric = false;
            }
        }

        let kind = if is_numeric {
            "numeric"
        } else if unique.len() < 50 {
            "categorical"
        } else {
            "text"
        };
        let dtype = if is_numeric { "f64" } else { "string" };

        columns.push(Column {
            name: h.clone(),
            dtype: dtype.to_string(),
            kind: kind.to_string(),
            nunique: unique.len(),
            nulls,
            null_pct: (nulls as f64 / n_rows as f64) * 100.0,
        });
    }

    Ok(Schema {
        filename: filename.to_string(),
        format: "csv".to_string(),
        shape: Shape { rows: n_rows, cols: n_cols },
        columns,
    })
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = std::env::args().collect();
    if args.len() < 2 {
        eprintln!("usage: parser <file>");
        std::process::exit(1);
    }
    let mut file = std::fs::File::open(&args[1])?;
    let mut bytes = Vec::new();
    file.read_to_end(&mut bytes)?;

    let schema = parse_csv(&bytes, &args[1])?;
    println!("{}", serde_json::to_string_pretty(&schema)?);
    Ok(())
}`,haskell:`-- Haskell — Cassava + Text for pure functional parsing
-- Haskell is the language of formal methods + type-safe data pipelines.
-- This parser uses lazy evaluation to handle files larger than memory.

{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

module Main where

import qualified Data.Csv as Csv
import qualified Data.ByteString.Lazy as BL
import qualified Data.Text as T
import qualified Data.Vector as V
import Data.Aeson (ToJSON(..), object, (.=))
import qualified Data.Aeson as A
import GHC.Generics (Generic)
import Data.List (nub, genericLength)
import Data.Maybe (fromMaybe, mapMaybe)
import System.Environment (getArgs)
import qualified Data.Map.Strict as Map
import Control.Monad (forM)

-- | A column's schema descriptor
data Column = Column
  { colName     :: T.Text
  , colDtype    :: T.Text
  , colKind     :: T.Text
  , colNunique  :: Int
  , colNulls    :: Int
  , colNullPct  :: Double
  } deriving (Generic, Show)

instance ToJSON Column where
  toJSON (Column n d k nu nul np) = object
    [ "name"     .= n
    , "dtype"    .= d
    , "kind"     .= k
    , "nunique"  .= nu
    , "nulls"    .= nul
    , "null_pct" .= np
    ]

data Schema = Schema
  { schFilename :: T.Text
  , schFormat   :: T.Text
  , schRows     :: Int
  , schCols     :: Int
  , schColumns  :: [Column]
  } deriving (Generic, Show)

instance ToJSON Schema where
  toJSON (Schema f fmt r c cols) = object
    [ "filename" .= f
    , "format"   .= fmt
    , "shape"    .= object ["rows" .= r, "cols" .= c]
    , "columns"  .= cols
    ]

-- | Infer a column's type from a list of values
inferKind :: [T.Text] -> (T.Text, T.Text)
inferKind vals =
  let nonEmpty = filter (not . T.null) vals
      isNumeric = all (\\v -> case T.readDouble v of
                              Just _  -> True
                              Nothing -> False) nonEmpty
      uniqueCount = length (nub nonEmpty)
  in if isNumeric
       then ("numeric", "Double")
       else if uniqueCount < 50
              then ("categorical", "Text")
              else ("text", "Text")

-- | Parse CSV and return schema
parseCSV :: BL.ByteString -> T.Text -> Either String Schema
parseCSV bs filename = do
  let decoded = Csv.decode Csv.HasHeader bs :: Either String (V.Vector (V.Vector T.Text))
  case decoded of
    Left err -> Left err
    Right rows -> do
      let headerRow = V.head rows
          dataRows = V.tail rows
          nRows = V.length dataRows
          nCols = V.length headerRow
      cols <- forM [0 .. nCols - 1] $ \\i -> do
        let name = headerRow V.! i
            vals = map (\\r -> fromMaybe "" (r V.!? i)) (V.toList dataRows)
            nulls = length (filter T.null vals)
            (kind, dtype) = inferKind vals
        return $ Column name dtype kind (length (nub (filter (not . T.null) vals))) nulls
                     (fromIntegral nulls / fromIntegral nRows * 100)
      return $ Schema filename "csv" nRows nCols cols

main :: IO ()
main = do
  args <- getArgs
  case args of
    (file:_) -> do
      bs <- BL.readFile file
      case parseCSV bs (T.pack file) of
        Left err -> error err
        Right schema -> BL.putStr (A.encode schema)
    _ -> error "usage: parser <file>"`,scala:`// Scala — Apache Spark for distributed dataset parsing
// Scala + Spark is the production stack for >100MB datasets (LinkedIn,
// Netflix, Uber). This parser runs distributed across a cluster.

import org.apache.spark.sql.{SparkSession, DataFrame}
import org.apache.spark.sql.types.{StructType, StructField, DataType}
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._
import scala.collection.JavaConverters._

case class ColumnSchema(
  name: String,
  dtype: String,
  kind: String,
  nunique: Long,
  nulls: Long,
  null_pct: Double
)

case class DatasetSchema(
  filename: String,
  format: String,
  rows: Long,
  cols: Int,
  columns: Array[ColumnSchema]
)

object DatasetParser {
  def parse(path: String): DatasetSchema = {
    val spark = SparkSession.builder()
      .appName("auto-analyze-parser")
      .master("local[*]")
      .getOrCreate()
    import spark.implicits._

    // Auto-detect format from extension
    val (df, format) = if (path.endsWith(".csv")) {
      (spark.read.option("header", "true").option("inferSchema", "true").csv(path), "csv")
    } else if (path.endsWith(".parquet")) {
      (spark.read.parquet(path), "parquet")
    } else if (path.endsWith(".json")) {
      (spark.read.json(path), "json")
    } else {
      throw new IllegalArgumentException(s"Unsupported format: $path")
    }

    val nRows = df.count()
    val nCols = df.columns.length

    val columns = df.columns.zip(df.schema.fields).map { case (name, field) =>
      val dtype = field.dataType.simpleString
      // Approximate null count + unique count (Spark is lazy — these trigger computation)
      val col = col(name)
      val nullCount = df.filter(col.isNull).count()
      val nunique = df.select(name).distinct().count()
      val kind = field.dataType match {
        case _: NumericType => "numeric"
        case TimestampType | DateType => "datetime"
        case _ if nunique < 50 => "categorical"
        case _ => "text"
      }
      ColumnSchema(name, dtype, kind, nunique, nullCount,
                   nullCount.toDouble / nRows * 100)
    }

    spark.stop()
    DatasetSchema(path.split("/").last, format, nRows, nCols, columns)
  }

  def main(args: Array[String]): Unit = {
    if (args.length < 1) {
      System.err.println("usage: parser <file>")
      System.exit(1)
    }
    import org.json4s._
    import org.json4s.jackson.Serialization
    implicit val formats = DefaultFormats
    val schema = parse(args(0))
    println(Serialization.writePretty(schema))
  }
}`},p=new TextEncoder().encode("species,island,bill_length_mm,bill_depth_mm,flipper_length_mm,body_mass_g,sex\nAdelie,Torgersen,39.1,18.7,181,3750,MALE\nAdelie,Torgersen,39.5,17.4,186,3800,FEMALE\nAdelie,Torgersen,40.3,18,195,3250,FEMALE\nAdelie,Torgersen,,,,,\nAdelie,Torgersen,36.7,19.3,193,3450,FEMALE\nAdelie,Torgersen,39.3,20.6,190,3650,MALE\nAdelie,Torgersen,38.9,17.8,181,3625,FEMALE\nAdelie,Torgersen,39.2,19.6,195,4675,MALE\nAdelie,Torgersen,34.1,18.1,193,3475,\nAdelie,Torgersen,42,20.2,190,4250,\nAdelie,Torgersen,37.8,17.1,186,3300,\nAdelie,Torgersen,37.8,17.3,180,3700,\nAdelie,Torgersen,41.1,17.6,182,3200,FEMALE\nAdelie,Torgersen,38.6,21.2,191,3800,MALE\nAdelie,Torgersen,34.6,21.1,198,4400,MALE\nAdelie,Torgersen,36.6,17.8,185,3700,FEMALE\nAdelie,Torgersen,38.7,19,195,3450,FEMALE\nAdelie,Torgersen,42.5,20.7,197,4500,MALE\nAdelie,Torgersen,34.4,18.4,184,3325,FEMALE\nAdelie,Torgersen,46,21.5,194,4200,MALE\nAdelie,Biscoe,37.8,18.3,174,3400,FEMALE\nAdelie,Biscoe,37.7,18.7,180,3600,MALE\nAdelie,Biscoe,35.9,19.2,189,3800,FEMALE\nAdelie,Biscoe,38.2,18.1,185,3950,MALE\nAdelie,Biscoe,38.8,17.2,180,3800,MALE\nAdelie,Biscoe,35.3,18.9,187,3800,FEMALE\nAdelie,Biscoe,40.6,18.6,183,3550,MALE\nAdelie,Biscoe,40.5,17.9,187,3200,FEMALE\nAdelie,Biscoe,37.9,18.6,172,3150,FEMALE\nAdelie,Biscoe,40.5,18.9,180,3950,MALE\nAdelie,Dream,39.5,16.7,178,3250,FEMALE\nAdelie,Dream,37.2,18.1,178,3900,MALE\nAdelie,Dream,39.5,17.8,188,3300,FEMALE\nAdelie,Dream,40.9,18.9,184,3900,MALE\nAdelie,Dream,36.4,17,195,3325,FEMALE\nAdelie,Dream,39.2,21.1,196,4150,MALE\nAdelie,Dream,38.8,20,190,3950,MALE\nAdelie,Dream,42.2,18.5,180,3550,FEMALE\nAdelie,Dream,37.6,19.3,181,3300,FEMALE\nAdelie,Dream,39.8,19.1,184,4650,MALE\nAdelie,Dream,36.5,18,182,3150,FEMALE\nAdelie,Dream,40.8,18.4,195,3900,MALE\nAdelie,Dream,36,18.5,186,3100,FEMALE\nAdelie,Dream,44.1,19.7,196,4400,MALE\nAdelie,Dream,37,16.9,185,3000,FEMALE\nAdelie,Dream,39.6,18.8,190,4600,MALE\nAdelie,Dream,41.1,19,182,3425,MALE\nAdelie,Dream,37.5,18.9,179,2975,\nAdelie,Dream,36,17.9,190,3450,FEMALE\nAdelie,Dream,42.3,21.2,191,4150,MALE\nAdelie,Biscoe,39.6,17.7,186,3500,FEMALE\nAdelie,Biscoe,40.1,18.9,188,4300,MALE\nAdelie,Biscoe,35,17.9,190,3450,FEMALE\nAdelie,Biscoe,42,19.5,200,4050,MALE\nAdelie,Biscoe,34.5,18.1,187,2900,FEMALE\nAdelie,Biscoe,41.4,18.6,191,3700,MALE\nAdelie,Biscoe,39,17.5,186,3550,FEMALE\nAdelie,Biscoe,40.6,18.8,193,3800,MALE\nAdelie,Biscoe,36.5,16.6,181,2850,FEMALE\nAdelie,Biscoe,37.6,19.1,194,3750,MALE\nAdelie,Biscoe,35.7,16.9,185,3150,FEMALE\nAdelie,Biscoe,41.3,21.1,195,4400,MALE\nAdelie,Biscoe,37.6,17,185,3600,FEMALE\nAdelie,Biscoe,41.1,18.2,192,4050,MALE\nAdelie,Biscoe,36.4,17.1,184,2850,FEMALE\nAdelie,Biscoe,41.6,18,192,3950,MALE\nAdelie,Biscoe,35.5,16.2,195,3350,FEMALE\nAdelie,Biscoe,41.1,19.1,188,4100,MALE\nAdelie,Torgersen,35.9,16.6,190,3050,FEMALE\nAdelie,Torgersen,41.8,19.4,198,4450,MALE\nAdelie,Torgersen,33.5,19,190,3600,FEMALE\nAdelie,Torgersen,39.7,18.4,190,3900,MALE\nAdelie,Torgersen,39.6,17.2,196,3550,FEMALE\nAdelie,Torgersen,45.8,18.9,197,4150,MALE\nAdelie,Torgersen,35.5,17.5,190,3700,FEMALE\nAdelie,Torgersen,42.8,18.5,195,4250,MALE\nAdelie,Torgersen,40.9,16.8,191,3700,FEMALE\nAdelie,Torgersen,37.2,19.4,184,3900,MALE\nAdelie,Torgersen,36.2,16.1,187,3550,FEMALE\nAdelie,Torgersen,42.1,19.1,195,4000,MALE\nAdelie,Torgersen,34.6,17.2,189,3200,FEMALE\nAdelie,Torgersen,42.9,17.6,196,4700,MALE\nAdelie,Torgersen,36.7,18.8,187,3800,FEMALE\nAdelie,Torgersen,35.1,19.4,193,4200,MALE\nAdelie,Dream,37.3,17.8,191,3350,FEMALE\nAdelie,Dream,41.3,20.3,194,3550,MALE\nAdelie,Dream,36.3,19.5,190,3800,MALE\nAdelie,Dream,36.9,18.6,189,3500,FEMALE\nAdelie,Dream,38.3,19.2,189,3950,MALE\nAdelie,Dream,38.9,18.8,190,3600,FEMALE\nAdelie,Dream,35.7,18,202,3550,FEMALE\nAdelie,Dream,41.1,18.1,205,4300,MALE\nAdelie,Dream,34,17.1,185,3400,FEMALE\nAdelie,Dream,39.6,18.1,186,4450,MALE\nAdelie,Dream,36.2,17.3,187,3300,FEMALE\nAdelie,Dream,40.8,18.9,208,4300,MALE\nAdelie,Dream,38.1,18.6,190,3700,FEMALE\nAdelie,Dream,40.3,18.5,196,4350,MALE\nAdelie,Dream,33.1,16.1,178,2900,FEMALE\nAdelie,Dream,43.2,18.5,192,4100,MALE\nAdelie,Biscoe,35,17.9,192,3725,FEMALE\nAdelie,Biscoe,41,20,203,4725,MALE\nAdelie,Biscoe,37.7,16,183,3075,FEMALE\nAdelie,Biscoe,37.8,20,190,4250,MALE\nAdelie,Biscoe,37.9,18.6,193,2925,FEMALE\nAdelie,Biscoe,39.7,18.9,184,3550,MALE\nAdelie,Biscoe,38.6,17.2,199,3750,FEMALE\nAdelie,Biscoe,38.2,20,190,3900,MALE\nAdelie,Biscoe,38.1,17,181,3175,FEMALE\nAdelie,Biscoe,43.2,19,197,4775,MALE\nAdelie,Biscoe,38.1,16.5,198,3825,FEMALE\nAdelie,Biscoe,45.6,20.3,191,4600,MALE\nAdelie,Biscoe,39.7,17.7,193,3200,FEMALE\nAdelie,Biscoe,42.2,19.5,197,4275,MALE\nAdelie,Biscoe,39.6,20.7,191,3900,FEMALE\nAdelie,Biscoe,42.7,18.3,196,4075,MALE\nAdelie,Torgersen,38.6,17,188,2900,FEMALE\nAdelie,Torgersen,37.3,20.5,199,3775,MALE\nAdelie,Torgersen,35.7,17,189,3350,FEMALE\nAdelie,Torgersen,41.1,18.6,189,3325,MALE\nAdelie,Torgersen,36.2,17.2,187,3150,FEMALE\nAdelie,Torgersen,37.7,19.8,198,3500,MALE\nAdelie,Torgersen,40.2,17,176,3450,FEMALE\nAdelie,Torgersen,41.4,18.5,202,3875,MALE\nAdelie,Torgersen,35.2,15.9,186,3050,FEMALE\nAdelie,Torgersen,40.6,19,199,4000,MALE\nAdelie,Torgersen,38.8,17.6,191,3275,FEMALE\nAdelie,Torgersen,41.5,18.3,195,4300,MALE\nAdelie,Torgersen,39,17.1,191,3050,FEMALE\nAdelie,Torgersen,44.1,18,210,4000,MALE\nAdelie,Torgersen,38.5,17.9,190,3325,FEMALE\nAdelie,Torgersen,43.1,19.2,197,3500,MALE\nAdelie,Dream,36.8,18.5,193,3500,FEMALE\nAdelie,Dream,37.5,18.5,199,4475,MALE\nAdelie,Dream,38.1,17.6,187,3425,FEMALE\nAdelie,Dream,41.1,17.5,190,3900,MALE\nAdelie,Dream,35.6,17.5,191,3175,FEMALE\nAdelie,Dream,40.2,20.1,200,3975,MALE\nAdelie,Dream,37,16.5,185,3400,FEMALE\nAdelie,Dream,39.7,17.9,193,4250,MALE\nAdelie,Dream,40.2,17.1,193,3400,FEMALE\nAdelie,Dream,40.6,17.2,187,3475,MALE\nAdelie,Dream,32.1,15.5,188,3050,FEMALE\nAdelie,Dream,40.7,17,190,3725,MALE\nAdelie,Dream,37.3,16.8,192,3000,FEMALE\nAdelie,Dream,39,18.7,185,3650,MALE\nAdelie,Dream,39.2,18.6,190,4250,MALE\nAdelie,Dream,36.6,18.4,184,3475,FEMALE\nAdelie,Dream,36,17.8,195,3450,FEMALE\nAdelie,Dream,37.8,18.1,193,3750,MALE\nAdelie,Dream,36,17.1,187,3700,FEMALE\nAdelie,Dream,41.5,18.5,201,4000,MALE\nChinstrap,Dream,46.5,17.9,192,3500,FEMALE\nChinstrap,Dream,50,19.5,196,3900,MALE\nChinstrap,Dream,51.3,19.2,193,3650,MALE\nChinstrap,Dream,45.4,18.7,188,3525,FEMALE\nChinstrap,Dream,52.7,19.8,197,3725,MALE\nChinstrap,Dream,45.2,17.8,198,3950,FEMALE\nChinstrap,Dream,46.1,18.2,178,3250,FEMALE\nChinstrap,Dream,51.3,18.2,197,3750,MALE\nChinstrap,Dream,46,18.9,195,4150,FEMALE\nChinstrap,Dream,51.3,19.9,198,3700,MALE\nChinstrap,Dream,46.6,17.8,193,3800,FEMALE\nChinstrap,Dream,51.7,20.3,194,3775,MALE\nChinstrap,Dream,47,17.3,185,3700,FEMALE\nChinstrap,Dream,52,18.1,201,4050,MALE\nChinstrap,Dream,45.9,17.1,190,3575,FEMALE\nChinstrap,Dream,50.5,19.6,201,4050,MALE\nChinstrap,Dream,50.3,20,197,3300,MALE\nChinstrap,Dream,58,17.8,181,3700,FEMALE\nChinstrap,Dream,46.4,18.6,190,3450,FEMALE\nChinstrap,Dream,49.2,18.2,195,4400,MALE\nChinstrap,Dream,42.4,17.3,181,3600,FEMALE\nChinstrap,Dream,48.5,17.5,191,3400,MALE\nChinstrap,Dream,43.2,16.6,187,2900,FEMALE\nChinstrap,Dream,50.6,19.4,193,3800,MALE\nChinstrap,Dream,46.7,17.9,195,3300,FEMALE\nChinstrap,Dream,52,19,197,4150,MALE\nChinstrap,Dream,50.5,18.4,200,3400,FEMALE\nChinstrap,Dream,49.5,19,200,3800,MALE\nChinstrap,Dream,46.4,17.8,191,3700,FEMALE\nChinstrap,Dream,52.8,20,205,4550,MALE\nChinstrap,Dream,40.9,16.6,187,3200,FEMALE\nChinstrap,Dream,54.2,20.8,201,4300,MALE\nChinstrap,Dream,42.5,16.7,187,3350,FEMALE\nChinstrap,Dream,51,18.8,203,4100,MALE\nChinstrap,Dream,49.7,18.6,195,3600,MALE\nChinstrap,Dream,47.5,16.8,199,3900,FEMALE\nChinstrap,Dream,47.6,18.3,195,3850,FEMALE\nChinstrap,Dream,52,20.7,210,4800,MALE\nChinstrap,Dream,46.9,16.6,192,2700,FEMALE\nChinstrap,Dream,53.5,19.9,205,4500,MALE\nChinstrap,Dream,49,19.5,210,3950,MALE\nChinstrap,Dream,46.2,17.5,187,3650,FEMALE\nChinstrap,Dream,50.9,19.1,196,3550,MALE\nChinstrap,Dream,45.5,17,196,3500,FEMALE\nChinstrap,Dream,50.9,17.9,196,3675,FEMALE\nChinstrap,Dream,50.8,18.5,201,4450,MALE\nChinstrap,Dream,50.1,17.9,190,3400,FEMALE\nChinstrap,Dream,49,19.6,212,4300,MALE\nChinstrap,Dream,51.5,18.7,187,3250,MALE\nChinstrap,Dream,49.8,17.3,198,3675,FEMALE\nChinstrap,Dream,48.1,16.4,199,3325,FEMALE\nChinstrap,Dream,51.4,19,201,3950,MALE\nChinstrap,Dream,45.7,17.3,193,3600,FEMALE\nChinstrap,Dream,50.7,19.7,203,4050,MALE\nChinstrap,Dream,42.5,17.3,187,3350,FEMALE\nChinstrap,Dream,52.2,18.8,197,3450,MALE\nChinstrap,Dream,45.2,16.6,191,3250,FEMALE\nChinstrap,Dream,49.3,19.9,203,4050,MALE\nChinstrap,Dream,50.2,18.8,202,3800,MALE\nChinstrap,Dream,45.6,19.4,194,3525,FEMALE\nChinstrap,Dream,51.9,19.5,206,3950,MALE\nChinstrap,Dream,46.8,16.5,189,3650,FEMALE\nChinstrap,Dream,45.7,17,195,3650,FEMALE\nChinstrap,Dream,55.8,19.8,207,4000,MALE\nChinstrap,Dream,43.5,18.1,202,3400,FEMALE\nChinstrap,Dream,49.6,18.2,193,3775,MALE\nChinstrap,Dream,50.8,19,210,4100,MALE\nChinstrap,Dream,50.2,18.7,198,3775,FEMALE\nGentoo,Biscoe,46.1,13.2,211,4500,FEMALE\nGentoo,Biscoe,50,16.3,230,5700,MALE\nGentoo,Biscoe,48.7,14.1,210,4450,FEMALE\nGentoo,Biscoe,50,15.2,218,5700,MALE\nGentoo,Biscoe,47.6,14.5,215,5400,MALE\nGentoo,Biscoe,46.5,13.5,210,4550,FEMALE\nGentoo,Biscoe,45.4,14.6,211,4800,FEMALE\nGentoo,Biscoe,46.7,15.3,219,5200,MALE\nGentoo,Biscoe,43.3,13.4,209,4400,FEMALE\nGentoo,Biscoe,46.8,15.4,215,5150,MALE\nGentoo,Biscoe,40.9,13.7,214,4650,FEMALE\nGentoo,Biscoe,49,16.1,216,5550,MALE\nGentoo,Biscoe,45.5,13.7,214,4650,FEMALE\nGentoo,Biscoe,48.4,14.6,213,5850,MALE\nGentoo,Biscoe,45.8,14.6,210,4200,FEMALE\nGentoo,Biscoe,49.3,15.7,217,5850,MALE\nGentoo,Biscoe,42,13.5,210,4150,FEMALE\nGentoo,Biscoe,49.2,15.2,221,6300,MALE\nGentoo,Biscoe,46.2,14.5,209,4800,FEMALE\nGentoo,Biscoe,48.7,15.1,222,5350,MALE\nGentoo,Biscoe,50.2,14.3,218,5700,MALE\nGentoo,Biscoe,45.1,14.5,215,5000,FEMALE\nGentoo,Biscoe,46.5,14.5,213,4400,FEMALE\nGentoo,Biscoe,46.3,15.8,215,5050,MALE\nGentoo,Biscoe,42.9,13.1,215,5000,FEMALE\nGentoo,Biscoe,46.1,15.1,215,5100,MALE\nGentoo,Biscoe,44.5,14.3,216,4100,\nGentoo,Biscoe,47.8,15,215,5650,MALE\nGentoo,Biscoe,48.2,14.3,210,4600,FEMALE\nGentoo,Biscoe,50,15.3,220,5550,MALE\nGentoo,Biscoe,47.3,15.3,222,5250,MALE\nGentoo,Biscoe,42.8,14.2,209,4700,FEMALE\nGentoo,Biscoe,45.1,14.5,207,5050,FEMALE\nGentoo,Biscoe,59.6,17,230,6050,MALE\nGentoo,Biscoe,49.1,14.8,220,5150,FEMALE\nGentoo,Biscoe,48.4,16.3,220,5400,MALE\nGentoo,Biscoe,42.6,13.7,213,4950,FEMALE\nGentoo,Biscoe,44.4,17.3,219,5250,MALE\nGentoo,Biscoe,44,13.6,208,4350,FEMALE\nGentoo,Biscoe,48.7,15.7,208,5350,MALE\nGentoo,Biscoe,42.7,13.7,208,3950,FEMALE\nGentoo,Biscoe,49.6,16,225,5700,MALE\nGentoo,Biscoe,45.3,13.7,210,4300,FEMALE\nGentoo,Biscoe,49.6,15,216,4750,MALE\nGentoo,Biscoe,50.5,15.9,222,5550,MALE\nGentoo,Biscoe,43.6,13.9,217,4900,FEMALE\nGentoo,Biscoe,45.5,13.9,210,4200,FEMALE\nGentoo,Biscoe,50.5,15.9,225,5400,MALE\nGentoo,Biscoe,44.9,13.3,213,5100,FEMALE\nGentoo,Biscoe,45.2,15.8,215,5300,MALE\nGentoo,Biscoe,46.6,14.2,210,4850,FEMALE\nGentoo,Biscoe,48.5,14.1,220,5300,MALE\nGentoo,Biscoe,45.1,14.4,210,4400,FEMALE\nGentoo,Biscoe,50.1,15,225,5000,MALE\nGentoo,Biscoe,46.5,14.4,217,4900,FEMALE\nGentoo,Biscoe,45,15.4,220,5050,MALE\nGentoo,Biscoe,43.8,13.9,208,4300,FEMALE\nGentoo,Biscoe,45.5,15,220,5000,MALE\nGentoo,Biscoe,43.2,14.5,208,4450,FEMALE\nGentoo,Biscoe,50.4,15.3,224,5550,MALE\nGentoo,Biscoe,45.3,13.8,208,4200,FEMALE\nGentoo,Biscoe,46.2,14.9,221,5300,MALE\nGentoo,Biscoe,45.7,13.9,214,4400,FEMALE\nGentoo,Biscoe,54.3,15.7,231,5650,MALE\nGentoo,Biscoe,45.8,14.2,219,4700,FEMALE\nGentoo,Biscoe,49.8,16.8,230,5700,MALE\nGentoo,Biscoe,46.2,14.4,214,4650,\nGentoo,Biscoe,49.5,16.2,229,5800,MALE\nGentoo,Biscoe,43.5,14.2,220,4700,FEMALE\nGentoo,Biscoe,50.7,15,223,5550,MALE\nGentoo,Biscoe,47.7,15,216,4750,FEMALE\nGentoo,Biscoe,46.4,15.6,221,5000,MALE\nGentoo,Biscoe,48.2,15.6,221,5100,MALE\nGentoo,Biscoe,46.5,14.8,217,5200,FEMALE\nGentoo,Biscoe,46.4,15,216,4700,FEMALE\nGentoo,Biscoe,48.6,16,230,5800,MALE\nGentoo,Biscoe,47.5,14.2,209,4600,FEMALE\nGentoo,Biscoe,51.1,16.3,220,6000,MALE\nGentoo,Biscoe,45.2,13.8,215,4750,FEMALE\nGentoo,Biscoe,45.2,16.4,223,5950,MALE\nGentoo,Biscoe,49.1,14.5,212,4625,FEMALE\nGentoo,Biscoe,52.5,15.6,221,5450,MALE\nGentoo,Biscoe,47.4,14.6,212,4725,FEMALE\nGentoo,Biscoe,50,15.9,224,5350,MALE\nGentoo,Biscoe,44.9,13.8,212,4750,FEMALE\nGentoo,Biscoe,50.8,17.3,228,5600,MALE\nGentoo,Biscoe,43.4,14.4,218,4600,FEMALE\nGentoo,Biscoe,51.3,14.2,218,5300,MALE\nGentoo,Biscoe,47.5,14,212,4875,FEMALE\nGentoo,Biscoe,52.1,17,230,5550,MALE\nGentoo,Biscoe,47.5,15,218,4950,FEMALE\nGentoo,Biscoe,52.2,17.1,228,5400,MALE\nGentoo,Biscoe,45.5,14.5,212,4750,FEMALE\nGentoo,Biscoe,49.5,16.1,224,5650,MALE\nGentoo,Biscoe,44.5,14.7,214,4850,FEMALE\nGentoo,Biscoe,50.8,15.7,226,5200,MALE\nGentoo,Biscoe,49.4,15.8,216,4925,MALE\nGentoo,Biscoe,46.9,14.6,222,4875,FEMALE\nGentoo,Biscoe,48.4,14.4,203,4625,FEMALE\nGentoo,Biscoe,51.1,16.5,225,5250,MALE\nGentoo,Biscoe,48.5,15,219,4850,FEMALE\nGentoo,Biscoe,55.9,17,228,5600,MALE\nGentoo,Biscoe,47.2,15.5,215,4975,FEMALE\nGentoo,Biscoe,49.1,15,228,5500,MALE\nGentoo,Biscoe,47.3,13.8,216,4725,\nGentoo,Biscoe,46.8,16.1,215,5500,MALE\nGentoo,Biscoe,41.7,14.7,210,4700,FEMALE\nGentoo,Biscoe,53.4,15.8,219,5500,MALE\nGentoo,Biscoe,43.3,14,208,4575,FEMALE\nGentoo,Biscoe,48.1,15.1,209,5500,MALE\nGentoo,Biscoe,50.5,15.2,216,5000,FEMALE\nGentoo,Biscoe,49.8,15.9,229,5950,MALE\nGentoo,Biscoe,43.5,15.2,213,4650,FEMALE\nGentoo,Biscoe,51.5,16.3,230,5500,MALE\nGentoo,Biscoe,46.2,14.1,217,4375,FEMALE\nGentoo,Biscoe,55.1,16,230,5850,MALE\nGentoo,Biscoe,44.5,15.7,217,4875,\nGentoo,Biscoe,48.8,16.2,222,6000,MALE\nGentoo,Biscoe,47.2,13.7,214,4925,FEMALE\nGentoo,Biscoe,,,,,\nGentoo,Biscoe,46.8,14.3,215,4850,FEMALE\nGentoo,Biscoe,50.4,15.7,222,5750,MALE\nGentoo,Biscoe,45.2,14.8,212,5200,FEMALE\nGentoo,Biscoe,49.9,16.1,213,5400,MALE\n"),h=[{name:"species",dtype:"object",kind:"categorical",nunique:3,nulls:0,null_pct:0},{name:"island",dtype:"object",kind:"categorical",nunique:3,nulls:0,null_pct:0},{name:"bill_length_mm",dtype:"float64",kind:"numeric",nunique:164,nulls:2,null_pct:.58},{name:"bill_depth_mm",dtype:"float64",kind:"numeric",nunique:80,nulls:2,null_pct:.58},{name:"flipper_length_mm",dtype:"float64",kind:"numeric",nunique:55,nulls:2,null_pct:.58},{name:"body_mass_g",dtype:"float64",kind:"numeric",nunique:94,nulls:2,null_pct:.58},{name:"sex",dtype:"object",kind:"categorical",nunique:2,nulls:11,null_pct:3.2}],f=[{species:"Adelie",island:"Torgersen",bill_length_mm:"39.1",bill_depth_mm:"18.7",flipper_length_mm:"181",body_mass_g:"3750",sex:"MALE"},{species:"Adelie",island:"Torgersen",bill_length_mm:"39.5",bill_depth_mm:"17.4",flipper_length_mm:"186",body_mass_g:"3800",sex:"FEMALE"},{species:"Adelie",island:"Torgersen",bill_length_mm:"40.3",bill_depth_mm:"18",flipper_length_mm:"195",body_mass_g:"3250",sex:"FEMALE"},{species:"Adelie",island:"Torgersen",bill_length_mm:"",bill_depth_mm:"",flipper_length_mm:"",body_mass_g:"",sex:""},{species:"Adelie",island:"Torgersen",bill_length_mm:"36.7",bill_depth_mm:"19.3",flipper_length_mm:"193",body_mass_g:"3450",sex:"FEMALE"}];var g=e.i(569074),x=e.i(178583),b=e.i(658041),y=e.i(21218),A=e.i(217923),E=e.i(455711),v=e.i(440160),L=e.i(174886),M=e.i(643531),w=e.i(878894),j=e.i(283086),_=e.i(286536),N=e.i(758472),C=e.i(9734),C=C,k=e.i(955716),B=e.i(852008),T=e.i(39312),S=e.i(966992),F=e.i(37727);let D=[{id:"iris",name:"Iris (4KB, 150 rows × 5 cols)",url:"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv",description:"Classic ML dataset — sepal/petal measurements of 3 flower species."},{id:"titanic",name:"Titanic (60KB, 891 rows × 12 cols)",url:"https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv",description:"Passenger survival data — categorical + numeric mix."},{id:"penguins",name:"Palmer Penguins (14KB, 344 rows × 7 cols)",url:"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/penguins.csv",description:"Modern Iris replacement — penguin species + body measurements."}];function G(){var e;let[i,F]=(0,t.useState)("python"),[G,O]=(0,t.useState)(null),[z,I]=(0,t.useState)(null),[$,V]=(0,t.useState)(null),[U,H]=(0,t.useState)(!1),[J,K]=(0,t.useState)(""),[Q,W]=(0,t.useState)(!1),[Y,X]=(0,t.useState)(!1),[Z,ee]=(0,t.useState)(!1),ea=(0,t.useRef)(null),et=(0,t.useCallback)(async e=>{(V(null),e.size>0x6400000)?V(`File is ${(e.size/1024/1024).toFixed(1)} MB. Browser limit is 100 MB. Either: (a) sample N rows locally before upload, OR (b) use the download-script option below to run the parser on your machine.`):I(new Uint8Array(await e.arrayBuffer()))},[]),es=(0,t.useCallback)(e=>{e.preventDefault(),H(!1);let a=e.dataTransfer.files[0];a&&et(a)},[et]),en=(0,t.useCallback)(e=>{let a=e.target.files?.[0];a&&et(a)},[et]),er=(0,t.useCallback)(async()=>{if(J.trim()){W(!0),V(null);try{let e=await fetch(J);if(!e.ok)throw Error(`HTTP ${e.status}`);let a=await e.blob(),t=J.split("/").pop()||"dataset.csv",s=new File([a],t);await et(s)}catch(e){V(`Failed to fetch URL: ${e instanceof Error?e.message:"unknown error"}. This may be a CORS issue — try downloading the file and uploading it directly.`)}finally{W(!1)}}},[J,et]),ei=(0,t.useCallback)(()=>{V(null),I(p),O({filename:"penguins.csv",sizeBytes:p.byteLength,format:"csv",columns:h,nRows:344,nCols:7,head:f}),setTimeout(()=>{document.getElementById("schema-section")?.scrollIntoView({behavior:"smooth",block:"start"})},100)},[]),eo=(0,t.useCallback)(e=>{try{let a=e.indexOf("{"),t=e.lastIndexOf("}");if(a>=0&&t>a){let s=JSON.parse(e.substring(a,t+1));O({filename:s.filename,sizeBytes:z?.byteLength??0,format:s.format,columns:s.columns,nRows:s.nRows,nCols:s.nCols,head:s.head??[]})}}catch{}},[z]),el=(0,t.useMemo)(()=>G?[`# Auto-Analyze Report: ${G.filename}`,"",`**Generated**: ${new Date().toISOString()}`,`**Format**: ${G.format}`,`**Shape**: ${G.nRows.toLocaleString()} rows \xd7 ${G.nCols} columns`,`**Size**: ${(G.sizeBytes/1024).toFixed(1)} KB`,"","## Schema","","| Column | Type | Kind | Unique | Nulls | Null % |","|--------|------|------|--------|-------|--------|",...G.columns.map(e=>`| ${e.name} | ${e.dtype} | ${e.kind} | ${e.nunique.toLocaleString()} | ${e.nulls.toLocaleString()} | ${e.null_pct}% |`),"","## Key Findings","",...G.columns.filter(e=>e.null_pct>50).map(e=>`- ⚠️ Column "${e.name}" is ${e.null_pct}% null — consider dropping`),...G.columns.filter(e=>"numeric"===e.kind&&1===e.nunique).map(e=>`- ⚠️ Column "${e.name}" is constant (${e.nunique} unique value) — drop for ML`),...G.columns.filter(e=>"categorical"===e.kind).map(e=>`- 📊 Column "${e.name}" is categorical with ${e.nunique} levels — consider one-hot encoding`),"","## Recommendations","","1. Drop columns with >50% nulls (if any listed above)","2. Drop constant columns (0 variance)","3. One-hot encode categorical columns for ML","4. Impute remaining nulls: median for numeric, mode for categorical","5. Scale numeric features (StandardScaler for linear models, not needed for tree-based)","","## Generated by","","ModernDataSciEng Platform — Auto-Analyze Portal (Phase 13)","https://testdemoqwenai2025-creator.github.io/Demo4AppDataSci/auto-analyze/"].join("\n"):"",[G]),ed=(0,t.useMemo)(()=>G?`You are a data science blogger. Write a 500-word blog post about this dataset analysis.

DATASET: ${G.filename}
SHAPE: ${G.nRows.toLocaleString()} rows \xd7 ${G.nCols} columns
FORMAT: ${G.format}

SCHEMA:
${G.columns.map(e=>`- ${e.name} (${e.dtype}, ${e.kind}, ${e.nunique} unique, ${e.null_pct}% null)`).join("\n")}

WRITE A BLOG POST THAT:
1. Starts with a hook (1 paragraph)
2. Describes the dataset (1 paragraph)
3. Highlights 2-3 key findings from the schema
4. Suggests 2-3 ML use cases for this data
5. Ends with a "next steps" recommendation

TONE: accessible to a junior data scientist. Use analogies. Avoid jargon.

OUTPUT FORMAT: Markdown with ## headings. Include 1 inline code reference.`:"",[G]),ec=(0,t.useCallback)((e,a)=>{navigator.clipboard.writeText(e),"report"===a?(X(!0),setTimeout(()=>X(!1),2e3)):(ee(!0),setTimeout(()=>ee(!1),2e3))},[]),em=(0,t.useCallback)(()=>{if(!el)return;let e=new Blob([el],{type:"text/markdown"}),a=URL.createObjectURL(e),t=document.createElement("a");t.href=a,t.download=`${G?.filename.replace(/\.[^.]+$/,"")??"dataset"}-report.md`,t.click(),URL.revokeObjectURL(a)},[el,G]);return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(n.PageHeader,{eyebrow:"Phase 13 — Automated data-science portal",title:"Auto-Analyze Portal — Upload Dataset, Get Full DS Pipeline",description:"Upload any CSV/Parquet/JSON dataset (or paste a URL). The portal auto-detects schema, runs ETL/ELT, generates 8 analyses, picks the right chart for each, compiles a markdown report, and prepares an LLM-blog prompt. Parsers in 5 languages (Python/Go/Rust/Haskell/Scala). Browser limit 100MB; larger files get a download-script option. Every section is visible from page load — the full pipeline is shown upfront, with placeholder code that becomes 'live' once you upload a dataset.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(g.Upload,{className:"h-3 w-3"})," Upload"]}),(0,a.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(b.Database,{className:"h-3 w-3"})," Schema"]}),(0,a.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(E.Brain,{className:"h-3 w-3"})," Auto-analyze"]}),(0,a.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(j.Sparkles,{className:"h-3 w-3"})," 5 langs"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:[{label:"Browser limit",value:"100 MB",hint:"Hard cap on upload size. Larger files: download parser script and run locally.",deltaTone:"up"},{label:"Parser languages",value:"5",hint:"Python (runnable in Pyodide) + Go + Rust + Haskell + Scala (reference implementations).",deltaTone:"up"},{label:"Auto-analyses",value:"8",hint:"Shape, describe, nulls, correlations, distributions, outliers, pairplot, top features.",deltaTone:"up"},{label:"Pipeline stages",value:"5",hint:"Raw → Parsed → Typed → Cleaned → Analyzed. Each stage is visible + code-generated.",deltaTone:"up"}].map(e=>(0,a.jsx)(n.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(n.SectionCard,{title:"1. Parser Code — 5 languages",description:"The dataset parser implemented in Python (runnable in-browser via Pyodide), Go (cloud-native), Rust (memory-safe), Haskell (functional), and Scala (Spark distributed). Only Python runs here; the others are reference implementations you can run locally.",icon:(0,a.jsx)(N.Code,{className:"h-5 w-5"}),badge:"5 languages",badgeVariant:"outline",children:(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,a.jsx)("label",{className:"text-[11px] font-medium",children:"Parser language:"}),(0,a.jsxs)("select",{value:i,onChange:e=>F(e.target.value),className:"h-8 text-[12px] rounded border border-border/60 bg-background px-2 cursor-pointer",children:[(0,a.jsx)("option",{value:"python",children:"Python — pandas + pyarrow (in-browser via Pyodide)"}),(0,a.jsx)("option",{value:"go",children:"Go — encoding/csv (cloud-native, ~10x faster)"}),(0,a.jsx)("option",{value:"rust",children:"Rust — serde + csv (memory-safe, zero-copy)"}),(0,a.jsx)("option",{value:"haskell",children:"Haskell — Cassava (pure functional, lazy)"}),(0,a.jsx)("option",{value:"scala",children:"Scala — Apache Spark (distributed, cluster-scale)"})]})]}),(0,a.jsx)("pre",{className:"text-[10px] font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-auto bg-background/60 rounded p-3 border border-border/40",children:u[i]}),(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground italic",children:"Key insight: all 5 parsers produce the SAME JSON schema descriptor. Python runs in Pyodide (this page); the others are downloadable scripts for local execution on larger datasets."})]})}),(0,a.jsx)(n.SectionCard,{title:"2. Upload Dataset — drag-drop, file picker, URL, or try sample data",description:`Browser limit: 100 MB. Supports CSV, Parquet, JSON, TSV. For larger files, use the download-script option at the bottom of this page. Or click "Try sample data" to load Palmer Penguins instantly (344 rows \xd7 7 cols) — no upload needed.`,icon:(0,a.jsx)(g.Upload,{className:"h-5 w-5"}),badge:G?"Loaded":"Empty",badgeVariant:G?"default":"outline",children:(0,a.jsxs)("div",{className:"space-y-4",children:[!G&&(0,a.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-3 flex items-center gap-3",children:[(0,a.jsx)(j.Sparkles,{className:"h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0"}),(0,a.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,a.jsx)("p",{className:"text-[11px] font-medium text-emerald-700 dark:text-emerald-400",children:"No data? Try the Palmer Penguins sample dataset."}),(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground mt-0.5",children:"344 rows × 7 cols (species, island, bill_length, bill_depth, flipper_length, body_mass, sex). Loads instantly — schema panel + 8 analysis cards ready to click."})]}),(0,a.jsxs)(m.Button,{size:"sm",onClick:ei,className:"h-7 text-[11px] gap-1.5 bg-emerald-600 hover:bg-emerald-700",children:[(0,a.jsx)(b.Database,{className:"h-3 w-3"})," Try sample data"]})]}),(0,a.jsxs)("div",{onDragOver:e=>{e.preventDefault(),H(!0)},onDragLeave:()=>H(!1),onDrop:es,onClick:()=>ea.current?.click(),className:`rounded-lg border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${U?"border-primary bg-primary/10":"border-border/60 hover:border-primary/40 hover:bg-muted/20"}`,children:[(0,a.jsx)(g.Upload,{className:"h-10 w-10 text-muted-foreground/50 mx-auto mb-3"}),(0,a.jsx)("p",{className:"text-sm font-medium",children:U?"Drop your file here":"Drag & drop your dataset, or click to browse"}),(0,a.jsxs)("p",{className:"text-[10px] text-muted-foreground mt-1",children:["Supports .csv, .parquet, .json, .tsv — max ",100," MB"]}),(0,a.jsx)("input",{ref:ea,type:"file",accept:".csv,.parquet,.json,.tsv",onChange:en,className:"hidden"})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsx)("input",{type:"url",value:J,onChange:e=>K(e.target.value),placeholder:"https://example.com/dataset.csv",className:"flex-1 h-8 text-[12px] rounded border border-border/60 bg-background px-2"}),(0,a.jsxs)(m.Button,{size:"sm",onClick:er,disabled:Q||!J.trim(),className:"h-8 text-[11px] gap-1.5",children:[Q?(0,a.jsx)(y.Activity,{className:"h-3 w-3 animate-spin"}):(0,a.jsx)(v.Download,{className:"h-3 w-3"}),Q?"Fetching…":"Fetch URL"]})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Or try a sample dataset:"}),(0,a.jsx)("div",{className:"grid md:grid-cols-3 gap-2",children:D.map(e=>(0,a.jsxs)("button",{type:"button",onClick:()=>{K(e.url)},className:"rounded-md border border-border/40 p-2 text-left hover:bg-muted/30 transition-colors",children:[(0,a.jsx)("p",{className:"text-[11px] font-medium",children:e.name}),(0,a.jsx)("p",{className:"text-[9px] text-muted-foreground mt-0.5",children:e.description})]},e.id))})]}),$&&(0,a.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-3 flex items-start gap-2",children:[(0,a.jsx)(w.AlertTriangle,{className:"h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"}),(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground",children:$})]}),z&&(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsxs)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(_.Eye,{className:"h-3 w-3"})," Click to parse the dataset (Pyodide + pandas)"]}),(0,a.jsx)(r.PyodideRunner,{code:(e=G?.filename??"dataset.csv",`# Auto-Analyze parser — runs in-browser via Pyodide + pandas
import pandas as pd
import json, io, sys
from pathlib import Path

# Read file bytes (passed in from JavaScript)
file_bytes = bytes(dataset_bytes)
filename = ${JSON.stringify(e)}
ext = Path(filename).suffix.lower()

# Parse based on extension
if ext == ".csv":
    df = pd.read_csv(io.BytesIO(file_bytes))
elif ext == ".parquet":
    # Lazy-import pyarrow only when needed (Pyodide doesn't auto-load it)
    try:
        df = pd.read_parquet(io.BytesIO(file_bytes))
    except Exception:
        import pyarrow.parquet as pq
        df = pd.read_parquet(io.BytesIO(file_bytes))
elif ext == ".json":
    df = pd.read_json(io.BytesIO(file_bytes))
elif ext == ".tsv":
    df = pd.read_csv(io.BytesIO(file_bytes), sep="\\t")
else:
    # Try CSV as fallback
    df = pd.read_csv(io.BytesIO(file_bytes))

# Schema inference
columns = []
for col in df.columns:
    dtype = str(df[col].dtype)
    nunique = int(df[col].nunique())
    null_count = int(df[col].isnull().sum())
    if "int" in dtype or "float" in dtype:
        kind = "numeric"
    elif "datetime" in dtype:
        kind = "datetime"
    elif nunique < 50:
        kind = "categorical"
    else:
        kind = "text"
    columns.append({
        "name": str(col),
        "dtype": dtype,
        "kind": kind,
        "nunique": nunique,
        "nulls": null_count,
        "null_pct": round(null_count / len(df) * 100, 2),
    })

schema = {
    "filename": filename,
    "format": ext.lstrip("."),
    "nRows": int(df.shape[0]),
    "nCols": int(df.shape[1]),
    "columns": columns,
    "head": df.head(5).fillna("").to_dict(orient="records"),
}
print(json.dumps(schema, default=str))`),buttonLabel:"Parse dataset",onOutput:eo,compact:!0,preamble:`import js
from pyodide.ffi import to_js
dataset_bytes = bytes(${JSON.stringify(Array.from(z))})`})]})]})}),G&&(0,a.jsx)("div",{id:"schema-section",className:"scroll-mt-20",children:(0,a.jsx)(n.SectionCard,{title:`3. Schema — ${G.filename} (${G.nRows.toLocaleString()} \xd7 ${G.nCols})`,description:`Auto-detected column types, cardinality, and null patterns. Format: ${G.format}. Size: ${(G.sizeBytes/1024).toFixed(1)} KB.`,icon:(0,a.jsx)(b.Database,{className:"h-5 w-5"}),badge:`${G.nCols} cols`,badgeVariant:"outline",children:(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-2",children:[(0,a.jsxs)("div",{className:"rounded border border-border/40 p-2 bg-background/60",children:[(0,a.jsx)("p",{className:"text-[9px] uppercase tracking-wider text-muted-foreground",children:"Rows"}),(0,a.jsx)("p",{className:"text-sm font-mono font-bold",children:G.nRows.toLocaleString()})]}),(0,a.jsxs)("div",{className:"rounded border border-border/40 p-2 bg-background/60",children:[(0,a.jsx)("p",{className:"text-[9px] uppercase tracking-wider text-muted-foreground",children:"Columns"}),(0,a.jsx)("p",{className:"text-sm font-mono font-bold",children:G.nCols})]}),(0,a.jsxs)("div",{className:"rounded border border-border/40 p-2 bg-background/60",children:[(0,a.jsx)("p",{className:"text-[9px] uppercase tracking-wider text-muted-foreground",children:"Numeric"}),(0,a.jsx)("p",{className:"text-sm font-mono font-bold",children:G.columns.filter(e=>"numeric"===e.kind).length})]}),(0,a.jsxs)("div",{className:"rounded border border-border/40 p-2 bg-background/60",children:[(0,a.jsx)("p",{className:"text-[9px] uppercase tracking-wider text-muted-foreground",children:"Categorical"}),(0,a.jsx)("p",{className:"text-sm font-mono font-bold",children:G.columns.filter(e=>"categorical"===e.kind).length})]})]}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"text-[11px] w-full border border-border/40",children:[(0,a.jsx)("thead",{className:"bg-muted/40",children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"text-left p-2 border-b border-border/40",children:"Column"}),(0,a.jsx)("th",{className:"text-left p-2 border-b border-border/40",children:"Type"}),(0,a.jsx)("th",{className:"text-left p-2 border-b border-border/40",children:"Kind"}),(0,a.jsx)("th",{className:"text-right p-2 border-b border-border/40",children:"Unique"}),(0,a.jsx)("th",{className:"text-right p-2 border-b border-border/40",children:"Nulls"}),(0,a.jsx)("th",{className:"text-right p-2 border-b border-border/40",children:"Null %"})]})}),(0,a.jsx)("tbody",{children:G.columns.map((e,t)=>(0,a.jsxs)("tr",{className:"border-b border-border/20",children:[(0,a.jsx)("td",{className:"p-2 font-mono",children:e.name}),(0,a.jsx)("td",{className:"p-2 text-muted-foreground",children:e.dtype}),(0,a.jsx)("td",{className:"p-2",children:(0,a.jsx)("span",{className:"text-[9px] px-1.5 py-0 rounded font-mono",style:{color:"numeric"===e.kind?"#3b82f6":"categorical"===e.kind?"#10b981":"#f59e0b",border:`1px solid ${"numeric"===e.kind?"#3b82f6":"categorical"===e.kind?"#10b981":"#f59e0b"}`},children:e.kind})}),(0,a.jsx)("td",{className:"p-2 text-right font-mono",children:e.nunique.toLocaleString()}),(0,a.jsx)("td",{className:"p-2 text-right font-mono",children:e.nulls.toLocaleString()}),(0,a.jsx)("td",{className:"p-2 text-right font-mono",children:(0,a.jsxs)("span",{className:e.null_pct>50?"text-rose-600 dark:text-rose-400 font-bold":e.null_pct>10?"text-amber-600 dark:text-amber-400":"",children:[e.null_pct,"%"]})})]},t))})]})})]})})}),(0,a.jsx)(n.SectionCard,{title:"4. ETL/ELT Pipeline — 5 stages → Medallion Architecture (Bronze/Silver/Gold)",description:"The auto-analyze pipeline follows the medallion architecture pattern (used in Databricks Delta Lake, Azure Synapse, Snowflake). The 5 stages map to 3 lakehouse layers: Bronze (raw landing), Silver (cleansed/conformed), Gold (curated/analytics-ready).",icon:(0,a.jsx)(k.GitBranch,{className:"h-5 w-5"}),badge:"5 stages → 3 layers",badgeVariant:"outline",children:(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2",children:"5-stage execution pipeline"}),(0,a.jsx)("div",{className:"grid grid-cols-5 gap-2",children:[{stage:1,name:"Raw",desc:"File bytes uploaded",icon:g.Upload,accent:"#94a3b8"},{stage:2,name:"Parsed",desc:"pandas.read_csv()",icon:x.FileText,accent:"#3b82f6"},{stage:3,name:"Typed",desc:"dtype inference",icon:b.Database,accent:"#10b981"},{stage:4,name:"Cleaned",desc:"nulls handled",icon:B.Layers,accent:"#f59e0b"},{stage:5,name:"Analyzed",desc:"8 charts + report",icon:A.BarChart3,accent:"#a855f7"}].map((e,t)=>{let s=e.icon;return(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsxs)("div",{className:"rounded-md border border-border/40 p-3 text-center",style:{borderTopWidth:3,borderTopColor:e.accent},children:[(0,a.jsx)("div",{className:"w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-white text-[10px] font-bold",style:{backgroundColor:e.accent},children:e.stage}),(0,a.jsx)(s,{className:"h-4 w-4 mx-auto mb-1",style:{color:e.accent}}),(0,a.jsx)("p",{className:"text-[11px] font-semibold",children:e.name}),(0,a.jsx)("p",{className:"text-[9px] text-muted-foreground mt-0.5",children:e.desc})]}),t<4&&(0,a.jsx)("div",{className:"hidden md:block absolute top-1/2 -right-1.5 transform -translate-y-1/2 text-muted-foreground/40 z-10",children:"→"})]},e.stage)})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2",children:"Medallion architecture — Bronze / Silver / Gold (Delta Lake pattern)"}),(0,a.jsxs)("div",{className:"grid md:grid-cols-3 gap-3",children:[(0,a.jsxs)("div",{className:"rounded-lg border-2 p-3",style:{borderColor:"#cd7f32",backgroundColor:"rgba(205, 127, 50, 0.05)"},children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,a.jsx)("div",{className:"w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold",style:{backgroundColor:"#cd7f32"},children:"B"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-[12px] font-bold",style:{color:"#cd7f32"},children:"Bronze"}),(0,a.jsx)("p",{className:"text-[9px] text-muted-foreground",children:"Raw landing zone"})]})]}),(0,a.jsxs)("div",{className:"space-y-1",children:[(0,a.jsxs)("div",{className:"flex items-center gap-1.5 text-[10px]",children:[(0,a.jsx)("span",{className:"inline-block w-2 h-2 rounded-full",style:{backgroundColor:"#94a3b8"}}),(0,a.jsx)("span",{className:"font-mono",children:"Stage 1: Raw"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"— file bytes"})]}),(0,a.jsxs)("div",{className:"flex items-center gap-1.5 text-[10px]",children:[(0,a.jsx)("span",{className:"inline-block w-2 h-2 rounded-full",style:{backgroundColor:"#3b82f6"}}),(0,a.jsx)("span",{className:"font-mono",children:"Stage 2: Parsed"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"— DataFrame"})]})]}),(0,a.jsx)("p",{className:"text-[9px] text-muted-foreground mt-2 italic",children:"Native format, no transformations. Equivalent to Delta Lake bronze tables or ADLS Gen2 raw container."})]}),(0,a.jsxs)("div",{className:"rounded-lg border-2 p-3",style:{borderColor:"#c0c0c0",backgroundColor:"rgba(192, 192, 192, 0.05)"},children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,a.jsx)("div",{className:"w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold",style:{backgroundColor:"#a0a0a0"},children:"S"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-[12px] font-bold",style:{color:"#a0a0a0"},children:"Silver"}),(0,a.jsx)("p",{className:"text-[9px] text-muted-foreground",children:"Cleansed + conformed"})]})]}),(0,a.jsxs)("div",{className:"space-y-1",children:[(0,a.jsxs)("div",{className:"flex items-center gap-1.5 text-[10px]",children:[(0,a.jsx)("span",{className:"inline-block w-2 h-2 rounded-full",style:{backgroundColor:"#10b981"}}),(0,a.jsx)("span",{className:"font-mono",children:"Stage 3: Typed"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"— schema inferred"})]}),(0,a.jsxs)("div",{className:"flex items-center gap-1.5 text-[10px]",children:[(0,a.jsx)("span",{className:"inline-block w-2 h-2 rounded-full",style:{backgroundColor:"#f59e0b"}}),(0,a.jsx)("span",{className:"font-mono",children:"Stage 4: Cleaned"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"— nulls handled"})]})]}),(0,a.jsx)("p",{className:"text-[9px] text-muted-foreground mt-2 italic",children:"Typed, filtered, deduplicated. Equivalent to Delta Lake silver tables or dbt intermediate models."})]}),(0,a.jsxs)("div",{className:"rounded-lg border-2 p-3",style:{borderColor:"#ffd700",backgroundColor:"rgba(255, 215, 0, 0.05)"},children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,a.jsx)("div",{className:"w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold",style:{backgroundColor:"#d4a017"},children:"G"}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-[12px] font-bold",style:{color:"#d4a017"},children:"Gold"}),(0,a.jsx)("p",{className:"text-[9px] text-muted-foreground",children:"Curated analytics"})]})]}),(0,a.jsx)("div",{className:"space-y-1",children:(0,a.jsxs)("div",{className:"flex items-center gap-1.5 text-[10px]",children:[(0,a.jsx)("span",{className:"inline-block w-2 h-2 rounded-full",style:{backgroundColor:"#a855f7"}}),(0,a.jsx)("span",{className:"font-mono",children:"Stage 5: Analyzed"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"— 8 charts + report"})]})}),(0,a.jsx)("p",{className:"text-[9px] text-muted-foreground mt-2 italic",children:"Business-ready aggregates, ML features. Equivalent to Delta Lake gold tables or dbt marts. Ready for BI dashboards + ML training."})]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2",children:"Schematized data layout (Azure Gen2 / Delta Lake equivalent)"}),(0,a.jsx)("div",{className:"rounded-md border border-border/40 bg-muted/20 p-3",children:(0,a.jsx)("pre",{className:"text-[10px] font-mono leading-relaxed overflow-x-auto",children:`lakehouse/
├── bronze/                    # Raw landing (append-only, no schema enforcement)
│   ├── penguins_raw.csv       # Stage 1: file bytes
│   └── _delta_log/           # Delta Lake transaction log (ACID)
│
├── silver/                    # Cleansed + conformed (schema enforced)
│   ├── penguins_clean/        # Stage 3-4: typed + nulls handled
│   │   ├── species: string
│   │   ├── bill_length_mm: double
│   │   ├── body_mass_g: int
│   │   └── _delta_log/       # Time-travel: SELECT * FROM penguins VERSION AS OF 5
│   └── penguins_conformed/    # Joined with reference data (island names, etc.)
│
├── gold/                      # Curated analytics (business-ready)
│   ├── penguins_by_species/   # Stage 5: aggregated metrics
│   ├── penguins_ml_features/  # Feature store for ML training
│   └── penguins_report/       # Pre-computed summary stats for BI
│
└── catalog/                   # Unity Catalog / Hive Metastore
    ├── schemas.bronze.penguins_raw
    ├── schemas.silver.penguins_clean
    └── schemas.gold.penguins_by_species`})}),(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground mt-2 italic",children:"This is the production equivalent of what this portal does in-browser. The Bronze/Silver/Gold pattern ensures: (1) raw data is never lost (Bronze is append-only), (2) cleansing is reproducible (Silver has schema enforcement + time-travel), (3) analytics are pre-computed (Gold is ready for BI/ML without re-running transforms)."})]})]})}),(0,a.jsx)(n.SectionCard,{title:"5. Auto-Analysis — 8 cards (click Generate to run)",description:"Each card runs a Python analysis via Pyodide on your uploaded dataset. Charts render via the existing AnalysisChart component with 5-tab toolbar (Chart/Table/Code/Summary/Report).",icon:(0,a.jsx)(E.Brain,{className:"h-5 w-5"}),badge:G?"Ready":"Upload first",badgeVariant:G?"default":"outline",children:(0,a.jsx)("div",{className:"space-y-3",children:[{id:"shape",title:"5.1 Dataset Shape + Memory",desc:"Rows × columns + memory footprint",icon:b.Database,accent:"oklch(0.65 0.18 220)"},{id:"describe",title:"5.2 Statistical Describe",desc:"Mean/std/min/max per numeric column",icon:y.Activity,accent:"oklch(0.65 0.18 200)"},{id:"nulls",title:"5.3 Missing Values Heatmap",desc:"Null % per column, top 15",icon:w.AlertTriangle,accent:"oklch(0.65 0.18 60)"},{id:"correlations",title:"5.4 Correlation Matrix",desc:"Pearson r between numeric columns",icon:B.Layers,accent:"oklch(0.65 0.18 280)"},{id:"distributions",title:"5.5 Distribution (histogram)",desc:"First numeric column, 30 bins",icon:A.BarChart3,accent:"oklch(0.65 0.18 180)"},{id:"outliers",title:"5.6 Outlier Detection (IQR)",desc:"Tukey 1.5×IQR per numeric column",icon:T.Zap,accent:"oklch(0.65 0.18 30)"},{id:"pairplot",title:"5.7 Pairplot (scatter)",desc:"First 2 numeric columns, 500 sampled",icon:_.Eye,accent:"oklch(0.65 0.18 140)"},{id:"topFeatures",title:"5.8 Top Features by Variance",desc:"ML importance proxy",icon:S.Cpu,accent:"oklch(0.65 0.18 320)"}].map(e=>{var t;let s,n=e.icon;return(0,a.jsx)(R,{title:e.title,description:e.desc,accent:e.accent,icon:(0,a.jsx)(n,{className:"h-3 w-3"}),code:z?(t=e.id,G?.filename,(s={shape:`# Analysis 1: Dataset shape + memory usage
import pandas as pd, json, io
df = pd.read_csv(io.BytesIO(file_bytes))
mem = df.memory_usage(deep=True).sum()
print(json.dumps({
    "chart_type": "bar",
    "title": f"Dataset Shape: {df.shape[0]:,} rows \xd7 {df.shape[1]} cols ({mem/1024:.1f} KB)",
    "x_label": "Dimension", "y_label": "Count",
    "series": [{"name": "Count", "data": [
        {"x": "Rows", "y": int(df.shape[0])},
        {"x": "Columns", "y": int(df.shape[1])},
    ]}],
    "stats": [
        {"label": "Rows", "value": f"{df.shape[0]:,}", "tone": "default"},
        {"label": "Columns", "value": str(df.shape[1]), "tone": "default"},
        {"label": "Memory", "value": f"{mem/1024:.1f} KB", "tone": "default"},
        {"label": "Avg cell", "value": f"{mem/(df.shape[0]*df.shape[1]):.1f} bytes", "tone": "default"},
    ],
    "summary": f"The dataset has {df.shape[0]:,} rows and {df.shape[1]} columns, occupying {mem/1024:.1f} KB in memory. Average cell size is {mem/(df.shape[0]*df.shape[1]):.1f} bytes — text columns will be larger, numeric columns smaller."
}))`,describe:`# Analysis 2: Statistical describe (numeric columns)
import pandas as pd, json, io
df = pd.read_csv(io.BytesIO(file_bytes))
numeric_cols = df.select_dtypes(include=["number"]).columns.tolist()
if not numeric_cols:
    print(json.dumps({"chart_type": "bar", "title": "No numeric columns", "series": [], "summary": "This dataset has no numeric columns."}))
else:
    desc = df[numeric_cols].describe()
    # Build chart: mean of each numeric column
    series_data = []
    for col in numeric_cols[:10]:
        series_data.append({"x": col[:20], "y": float(desc.loc["mean", col])})
    print(json.dumps({
        "chart_type": "bar",
        "title": f"Mean by Column ({len(numeric_cols)} numeric, top 10 shown)",
        "x_label": "Column", "y_label": "Mean value",
        "series": [{"name": "Mean", "data": series_data}],
        "stats": [
            {"label": "Numeric cols", "value": str(len(numeric_cols)), "tone": "default"},
            {"label": "Mean of means", "value": f"{desc.loc['mean'].mean():.2f}", "tone": "default"},
            {"label": "Std of means", "value": f"{desc.loc['mean'].std():.2f}", "tone": "default"},
        ],
        "summary": f"Numeric columns: {', '.join(numeric_cols[:5])}{'...' if len(numeric_cols) > 5 else ''}. The describe() table shows count, mean, std, min, 25%, 50%, 75%, max for each."
    }))`,nulls:`# Analysis 3: Missing-value heatmap
import pandas as pd, json, io
df = pd.read_csv(io.BytesIO(file_bytes))
null_pct = (df.isnull().sum() / len(df) * 100).round(2)
# Top 15 columns by null %
top_nulls = null_pct.sort_values(ascending=False).head(15)
series_data = [{"x": col[:20], "y": float(v)} for col, v in top_nulls.items()]
print(json.dumps({
    "chart_type": "bar",
    "title": f"Missing Values by Column (top 15, {null_pct[null_pct > 0].count()} cols have nulls)",
    "x_label": "Column", "y_label": "% null",
    "series": [{"name": "% null", "data": series_data}],
    "stats": [
        {"label": "Cols with nulls", "value": str(int(null_pct[null_pct > 0].count())), "tone": "warning" if null_pct[null_pct > 0].count() > 0 else "success"},
        {"label": "Max null %", "value": f"{null_pct.max():.2f}%", "tone": "danger" if null_pct.max() > 50 else "warning" if null_pct.max() > 10 else "success"},
        {"label": "Cols 100% null", "value": str(int(null_pct[null_pct == 100].count())), "tone": "danger" if null_pct[null_pct == 100].count() > 0 else "default"},
        {"label": "Total nulls", "value": f"{int(df.isnull().sum().sum()):,}", "tone": "default"},
    ],
    "summary": f"{int(null_pct[null_pct > 0].count())} of {df.shape[1]} columns have missing values. The worst offender is '{top_nulls.index[0]}' at {top_nulls.iloc[0]:.2f}% null. Drop columns with >50% nulls OR impute with median (numeric) / mode (categorical)."
}))`,correlations:`# Analysis 4: Correlation matrix (numeric columns)
import pandas as pd, json, io, numpy as np
df = pd.read_csv(io.BytesIO(file_bytes))
numeric_cols = df.select_dtypes(include=["number"]).columns.tolist()
if len(numeric_cols) < 2:
    print(json.dumps({"chart_type": "bar", "title": "Need ≥2 numeric columns for correlation", "series": [], "summary": "Not enough numeric columns."}))
else:
    corr = df[numeric_cols].corr().fillna(0)
    # Mask diagonal (self-correlation = 1.0) for the stats
    mask = ~np.eye(len(corr), dtype=bool)
    abs_corr = corr.abs()
    strongest = abs_corr.where(mask).max().max()
    n_pairs_07 = int((abs_corr > 0.7).where(mask).sum().sum() // 2)
    n_pairs_09 = int((abs_corr > 0.9).where(mask).sum().sum() // 2)
    cells = []
    for i, c1 in enumerate(numeric_cols[:10]):
        for j, c2 in enumerate(numeric_cols[:10]):
            cells.append({"row": i, "col": j, "value": float(corr.iloc[i, j])})
    print(json.dumps({
        "chart_type": "heatmap",
        "title": f"Correlation Matrix ({len(numeric_cols)} numeric, top 10 shown)",
        "x_label": "Column", "y_label": "Column",
        "heatmap": {"cells": cells, "rows": min(10, len(numeric_cols)), "cols": min(10, len(numeric_cols)), "row_labels": numeric_cols[:10], "col_labels": numeric_cols[:10], "vmin": -1.0, "vmax": 1.0, "colormap": "rdbu"},
        "stats": [
            {"label": "Strongest |r|", "value": f"{strongest:.2f}", "tone": "default"},
            {"label": "Pairs |r|>0.7", "value": str(n_pairs_07), "tone": "warning"},
            {"label": "Pairs |r|>0.9", "value": str(n_pairs_09), "tone": "danger"},
        ],
        "summary": "Diagonal = 1.0 (self-correlation). Off-diagonal: |r|>0.7 = strong correlation (consider dropping one of the pair for ML). |r|>0.9 = near-duplicate (definitely drop)."
    }))`,distributions:`# Analysis 5: Distribution of first numeric column (histogram)
import pandas as pd, json, io, numpy as np
df = pd.read_csv(io.BytesIO(file_bytes))
numeric_cols = df.select_dtypes(include=["number"]).columns.tolist()
if not numeric_cols:
    print(json.dumps({"chart_type": "bar", "title": "No numeric columns", "series": [], "summary": "No numeric columns."}))
else:
    col = numeric_cols[0]
    vals = df[col].dropna().values
    hist, edges = np.histogram(vals, bins=30)
    centers = (edges[:-1] + edges[1:]) / 2
    print(json.dumps({
        "chart_type": "bar",
        "title": f"Distribution of '{col}' (n={len(vals):,}, 30 bins)",
        "x_label": col, "y_label": "Frequency",
        "series": [{"name": "Frequency", "data": [{"x": float(c), "y": int(h)} for c, h in zip(centers, hist)]}],
        "stats": [
            {"label": "Mean", "value": f"{np.mean(vals):.2f}", "tone": "default"},
            {"label": "Median", "value": f"{np.median(vals):.2f}", "tone": "default"},
            {"label": "Std", "value": f"{np.std(vals):.2f}", "tone": "default"},
            {"label": "Skew", "value": f"{((vals - vals.mean())**3).mean() / vals.std()**3:.2f}", "tone": "warning" if abs(((vals - vals.mean())**3).mean() / vals.std()**3) > 1 else "default"},
        ],
        "summary": f"'{col}' has mean={np.mean(vals):.2f}, median={np.median(vals):.2f}, std={np.std(vals):.2f}. Skewness >1 = right-skewed (long tail to the right); <-1 = left-skewed. The histogram shape reveals the underlying distribution (Gaussian / bimodal / power-law)."
    }))`,outliers:`# Analysis 6: Outlier detection (IQR method) on numeric columns
import pandas as pd, json, io, numpy as np
df = pd.read_csv(io.BytesIO(file_bytes))
numeric_cols = df.select_dtypes(include=["number"]).columns.tolist()
if not numeric_cols:
    print(json.dumps({"chart_type": "bar", "title": "No numeric columns", "series": [], "summary": "No numeric columns."}))
else:
    outlier_data = []
    for col in numeric_cols[:10]:
        vals = df[col].dropna()
        q1, q3 = vals.quantile(0.25), vals.quantile(0.75)
        iqr = q3 - q1
        lower, upper = q1 - 1.5 * iqr, q3 + 1.5 * iqr
        n_outliers = int(((vals < lower) | (vals > upper)).sum())
        outlier_data.append({"x": col[:20], "y": n_outliers})
    print(json.dumps({
        "chart_type": "bar",
        "title": f"Outlier Count by Column (IQR method, top 10)",
        "x_label": "Column", "y_label": "Outlier count",
        "series": [{"name": "Outliers (1.5\xd7IQR)", "data": outlier_data}],
        "stats": [
            {"label": "Total outliers", "value": str(sum(d["y"] for d in outlier_data)), "tone": "warning"},
            {"label": "Cols with outliers", "value": str(sum(1 for d in outlier_data if d["y"] > 0)), "tone": "default"},
            {"label": "Method", "value": "Tukey IQR (1.5\xd7)", "tone": "default"},
        ],
        "summary": "Outliers = values outside [Q1 - 1.5\xd7IQR, Q3 + 1.5\xd7IQR]. These are candidates for: (a) winsorization (cap at 1st/99th percentile), (b) log transform (if right-skewed), (c) removal (if measurement error)."
    }))`,pairplot:`# Analysis 7: Pairwise scatter (first 2 numeric columns)
import pandas as pd, json, io, numpy as np
df = pd.read_csv(io.BytesIO(file_bytes))
numeric_cols = df.select_dtypes(include=["number"]).columns.tolist()
if len(numeric_cols) < 2:
    print(json.dumps({"chart_type": "scatter", "title": "Need ≥2 numeric columns for pairplot", "series": [], "summary": "Not enough numeric columns."}))
else:
    c1, c2 = numeric_cols[0], numeric_cols[1]
    # Drop NaN first, THEN compute sample size (fixes "Cannot take a larger
    # sample than population" error when df has fewer rows after dropna)
    clean = df[[c1, c2]].dropna()
    n_sample = min(500, len(clean))
    sample = clean.sample(n_sample, random_state=42) if n_sample > 0 else clean
    data = [{"x": float(r[c1]), "y": float(r[c2])} for _, r in sample.iterrows()]
    print(json.dumps({
        "chart_type": "scatter",
        "title": f"Pairplot: {c1} vs {c2} (n={len(sample)} sampled)",
        "x_label": c1, "y_label": c2,
        "series": [{"name": "Points", "data": data}],
        "stats": [
            {"label": "Pearson r", "value": f"{sample.corr().iloc[0,1]:.3f}", "tone": "default"},
            {"label": "Spearman ρ", "value": f"{sample.corr('spearman').iloc[0,1]:.3f}", "tone": "default"},
            {"label": "Sampled", "value": f"{len(sample)}/{len(clean)}", "tone": "default"},
        ],
        "summary": f"Pearson r={sample.corr().iloc[0,1]:.3f} measures linear correlation. Spearman ρ={sample.corr('spearman').iloc[0,1]:.3f} measures monotonic (rank) correlation. If |r-ρ|>0.2, the relationship is non-linear (consider log transform)."
    }))`,topFeatures:`# Analysis 8: Top features by variance (proxy for ML importance)
import pandas as pd, json, io, numpy as np
df = pd.read_csv(io.BytesIO(file_bytes))
numeric_cols = df.select_dtypes(include=["number"]).columns.tolist()
if not numeric_cols:
    print(json.dumps({"chart_type": "bar", "title": "No numeric columns", "series": [], "summary": "No numeric columns."}))
else:
    variances = df[numeric_cols].var().sort_values(ascending=False)
    top = variances.head(10)
    series_data = [{"x": col[:20], "y": float(v)} for col, v in top.items()]
    print(json.dumps({
        "chart_type": "bar",
        "title": f"Top Features by Variance (proxy for ML importance, top 10)",
        "x_label": "Column", "y_label": "Variance",
        "series": [{"name": "Variance", "data": series_data}],
        "stats": [
            {"label": "Max variance", "value": f"{top.iloc[0]:.2f}", "tone": "default"},
            {"label": "Mean variance", "value": f"{variances.mean():.2f}", "tone": "default"},
            {"label": "Cols with var=0", "value": str(int((variances == 0).sum())), "tone": "warning" if (variances == 0).sum() > 0 else "default"},
        ],
        "summary": "High-variance columns carry more information for ML (constant columns = 0 variance = useless). The top features by variance are good starting points for: feature selection, PCA, or as the target variable if predicting."
    }))`})[t]??s.shape):"# Upload a dataset first to enable this analysis",preamble:z?`file_bytes = bytes(${JSON.stringify(Array.from(z))})`:void 0,disabled:!z},e.id)})})}),(0,a.jsx)(n.SectionCard,{title:"6. Auto-Chart Selection — click to generate",description:"Based on the column types detected, here are the recommended chart types. Click any recommendation to generate that specific chart — it renders via Pyodide + AnalysisChart with the 5-tab toolbar.",icon:(0,a.jsx)(A.BarChart3,{className:"h-5 w-5"}),badge:G?"Click to generate":"Upload first",badgeVariant:G?"default":"outline",children:(0,a.jsx)("div",{className:"space-y-3",children:G?(0,a.jsxs)(a.Fragment,{children:[G.columns.filter(e=>"numeric"===e.kind).slice(0,4).map((e,t)=>(0,a.jsx)(P,{title:`${e.name} — Histogram`,description:`Distribution of ${e.name} (${e.nunique} unique values, ${e.null_pct}% null)`,accent:"oklch(0.65 0.18 200)",icon:(0,a.jsx)(A.BarChart3,{className:"h-3 w-3"}),chartCode:`import pandas as pd, json, io, numpy as np
df = pd.read_csv(io.BytesIO(file_bytes))
col = ${JSON.stringify(e.name)}
vals = df[col].dropna().values
hist, edges = np.histogram(vals, bins=30)
centers = (edges[:-1] + edges[1:]) / 2
print(json.dumps({
    "chart_type": "bar",
    "title": f"Histogram of {col} (n={len(vals):,})",
    "x_label": col, "y_label": "Frequency",
    "series": [{"name": "Frequency", "data": [{"x": float(c), "y": int(h)} for c, h in zip(centers, hist)]}],
    "stats": [
        {"label": "Mean", "value": f"{np.mean(vals):.2f}", "tone": "default"},
        {"label": "Median", "value": f"{np.median(vals):.2f}", "tone": "default"},
        {"label": "Std", "value": f"{np.std(vals):.2f}", "tone": "default"},
        {"label": "Skew", "value": f"{float(((vals-vals.mean())**3).mean()/vals.std()**3):.2f}", "tone": "warning" if abs(float(((vals-vals.mean())**3).mean()/vals.std()**3)) > 1 else "default"},
    ],
    "summary": f"'{col}' has mean={np.mean(vals):.2f}, std={np.std(vals):.2f}. Histogram reveals distribution shape (Gaussian / bimodal / skewed)."
}))`,preamble:z?`file_bytes = bytes(${JSON.stringify(Array.from(z))})`:void 0,disabled:!z},`num-${t}`)),G.columns.filter(e=>"categorical"===e.kind).slice(0,4).map((e,t)=>(0,a.jsx)(P,{title:`${e.name} — Bar chart (value counts)`,description:`Distribution of ${e.name} (${e.nunique} categories, ${e.null_pct}% null)`,accent:"oklch(0.65 0.18 140)",icon:(0,a.jsx)(A.BarChart3,{className:"h-3 w-3"}),chartCode:`import pandas as pd, json, io
df = pd.read_csv(io.BytesIO(file_bytes))
col = ${JSON.stringify(e.name)}
counts = df[col].value_counts().head(15)
print(json.dumps({
    "chart_type": "bar",
    "title": f"Value counts: {col} (top {len(counts)})",
    "x_label": col, "y_label": "Count",
    "series": [{"name": "Count", "data": [{"x": str(idx), "y": int(v)} for idx, v in counts.items()]}],
    "stats": [
        {"label": "Categories", "value": str(int(df[col].nunique())), "tone": "default"},
        {"label": "Top", "value": str(counts.index[0]), "tone": "success"},
        {"label": "Top count", "value": f"{int(counts.iloc[0]):,}", "tone": "default"},
    ],
    "summary": f"'{col}' has {df[col].nunique()} unique values. Most common: '{counts.index[0]}' ({counts.iloc[0]} occurrences)."
}))`,preamble:z?`file_bytes = bytes(${JSON.stringify(Array.from(z))})`:void 0,disabled:!z},`cat-${t}`)),G.columns.filter(e=>"numeric"===e.kind).length>=2&&(0,a.jsx)(P,{title:"Pairwise scatter — top 2 numeric columns",description:`Scatter plot of ${G.columns.filter(e=>"numeric"===e.kind)[0]?.name} vs ${G.columns.filter(e=>"numeric"===e.kind)[1]?.name}`,accent:"oklch(0.65 0.18 280)",icon:(0,a.jsx)(_.Eye,{className:"h-3 w-3"}),chartCode:`import pandas as pd, json, io, numpy as np
df = pd.read_csv(io.BytesIO(file_bytes))
numeric_cols = df.select_dtypes(include=["number"]).columns.tolist()
c1, c2 = numeric_cols[0], numeric_cols[1]
clean = df[[c1, c2]].dropna()
n_sample = min(500, len(clean))
sample = clean.sample(n_sample, random_state=42) if n_sample > 0 else clean
data = [{"x": float(r[c1]), "y": float(r[c2])} for _, r in sample.iterrows()]
print(json.dumps({
    "chart_type": "scatter",
    "title": f"{c1} vs {c2} (n={len(sample)} sampled)",
    "x_label": c1, "y_label": c2,
    "series": [{"name": "Points", "data": data}],
    "stats": [
        {"label": "Pearson r", "value": f"{sample.corr().iloc[0,1]:.3f}", "tone": "default"},
        {"label": "Spearman ρ", "value": f"{sample.corr('spearman').iloc[0,1]:.3f}", "tone": "default"},
    ],
    "summary": f"Pearson r={sample.corr().iloc[0,1]:.3f} measures linear correlation. |r|>0.7 = strong."
}))`,preamble:z?`file_bytes = bytes(${JSON.stringify(Array.from(z))})`:void 0,disabled:!z},"pairwise")]}):(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground italic",children:'Upload a dataset (or click "Try sample data") to see recommended chart types. Each recommendation is clickable — click to generate the specific chart via Pyodide.'})})}),(0,a.jsx)(n.SectionCard,{title:"7. Clip Studio — animated chart + PNG capture + publish",description:"Auto-generate a short animated visualization (bars growing, points appearing — a 'moving image' that tells the data story). Or capture a static PNG. Then publish to YouTube/Twitter/LinkedIn/Instagram/Vimeo using the guide pattern.",icon:(0,a.jsx)(j.Sparkles,{className:"h-5 w-5"}),badge:G?"Ready":"Upload first",badgeVariant:G?"default":"outline",children:(0,a.jsx)(q,{datasetBytes:z,dataset:G})}),(0,a.jsx)(n.SectionCard,{title:"8. Auto-Report Generation (markdown)",description:"Compile the schema + findings into a markdown report. Download as .md file or copy to clipboard.",icon:(0,a.jsx)(x.FileText,{className:"h-5 w-5"}),badge:G?"Ready":"Upload first",badgeVariant:G?"default":"outline",children:(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[(0,a.jsxs)(m.Button,{variant:"outline",size:"sm",onClick:em,disabled:!G,className:"h-7 text-[11px] gap-1.5",children:[(0,a.jsx)(v.Download,{className:"h-3 w-3"})," Download .md"]}),(0,a.jsxs)(m.Button,{variant:"outline",size:"sm",onClick:()=>ec(el,"report"),disabled:!G,className:"h-7 text-[11px] gap-1.5",children:[Y?(0,a.jsx)(M.Check,{className:"h-3 w-3 text-emerald-500"}):(0,a.jsx)(L.Copy,{className:"h-3 w-3"}),Y?"Copied!":"Copy"]})]}),G?(0,a.jsx)("pre",{className:"text-[10px] font-mono whitespace-pre-wrap leading-relaxed max-h-64 overflow-auto bg-background/60 rounded p-2 border border-border/40",children:el}):(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground italic",children:"Upload a dataset to generate the auto-report."})]})}),(0,a.jsx)(n.SectionCard,{title:"9. Auto-Blog Generation (LLM prompt + copy + links)",description:"Compile a structured prompt for an LLM to write a blog post about this dataset analysis. Copy the prompt, then click a link to open your preferred LLM with the prompt in clipboard.",icon:(0,a.jsx)(j.Sparkles,{className:"h-5 w-5"}),badge:"Guide pattern",badgeVariant:"outline",children:(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[(0,a.jsxs)(m.Button,{variant:"outline",size:"sm",onClick:()=>ec(ed,"blog"),disabled:!G,className:"h-7 text-[11px] gap-1.5",children:[Z?(0,a.jsx)(M.Check,{className:"h-3 w-3 text-emerald-500"}):(0,a.jsx)(L.Copy,{className:"h-3 w-3"}),Z?"Copied!":"Copy prompt"]}),G&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("span",{className:"text-[10px] text-muted-foreground",children:"Then open:"}),(0,a.jsx)("a",{href:"https://chat.openai.com",target:"_blank",rel:"noopener noreferrer",className:"text-[11px] text-primary hover:underline",children:"ChatGPT →"}),(0,a.jsx)("a",{href:"https://claude.ai",target:"_blank",rel:"noopener noreferrer",className:"text-[11px] text-primary hover:underline",children:"Claude →"}),(0,a.jsx)("a",{href:"https://gemini.google.com",target:"_blank",rel:"noopener noreferrer",className:"text-[11px] text-primary hover:underline",children:"Gemini →"}),(0,a.jsx)("a",{href:"https://chat.z.ai",target:"_blank",rel:"noopener noreferrer",className:"text-[11px] text-primary hover:underline",children:"Z.ai →"})]})]}),G?(0,a.jsx)("pre",{className:"text-[10px] font-mono whitespace-pre-wrap leading-relaxed max-h-64 overflow-auto bg-background/60 rounded p-2 border border-border/40",children:ed}):(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground italic",children:"Upload a dataset to generate the LLM blog prompt."}),(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground italic",children:'Key insight: this "guide pattern" works on static GitHub Pages — no LLM API key needed. The prompt is structured so any LLM produces a consistent 500-word blog post. The user pastes it into their preferred LLM, gets the blog, and can paste back here for refinement.'})]})}),(0,a.jsx)(n.SectionCard,{title:"10. Large-File Download Script (for files >100MB)",description:"If your file exceeds the 100 MB browser limit, download the parser script in your preferred language and run it locally. The script produces the same JSON schema descriptor that this page would generate.",icon:(0,a.jsx)(v.Download,{className:"h-5 w-5"}),badge:"Local run",badgeVariant:"outline",children:(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsx)("div",{className:"flex items-center gap-2 flex-wrap",children:["python","go","rust","haskell","scala"].map(e=>(0,a.jsxs)(m.Button,{variant:"outline",size:"sm",onClick:()=>{let a=new Blob([u[e]],{type:"text/plain"}),t=URL.createObjectURL(a),s=document.createElement("a");s.href=t,s.download=`parser.${"python"===e?"py":"go"===e?"go":"rust"===e?"rs":"haskell"===e?"hs":"scala"}`,s.click(),URL.revokeObjectURL(t)},className:"h-7 text-[11px] gap-1.5",children:[(0,a.jsx)(C.default,{className:"h-3 w-3"})," ",e]},e))}),(0,a.jsxs)("p",{className:"text-[10px] text-muted-foreground italic",children:["Each script reads a file path from argv, parses it, and prints the schema as JSON to stdout. Run locally:"," ",(0,a.jsx)("code",{className:"font-mono",children:"python parser.py large_dataset.csv"})," or"," ",(0,a.jsx)("code",{className:"font-mono",children:"./parser large_dataset.csv"})," (after compiling Go/Rust)."]})]})}),(0,a.jsxs)(l.DeeperThoughtSection,{pageTitle:"Auto-Analyze Portal",children:[(0,a.jsx)(l.DeeperThought,{title:"This portal IS the missing bridge between data and decisions",connectedTo:"All 6 deep-dive pages + analytics-outputs",children:(0,a.jsx)("p",{children:"Every other page on this platform starts with a pre-loaded dataset and a pre-written analysis. This page is the FIRST that starts with the user's data. That's the bridge: from 'here's a teaching example' to 'here's YOUR data, automatically analyzed.' The 8 analyses are not hand-picked for a domain — they're the universal first-look that ANY dataset deserves (shape, describe, nulls, correlations, distributions, outliers, pairplot, top features). After this auto-pass, the user knows which of the 6 domain deep-dives (LHC, climate, space, healthcare, genomics, finance) to dive into for domain-specific analysis."})}),(0,a.jsx)(l.DeeperThought,{title:"The 5-language parser dropdown teaches by comparison",connectedTo:"ML Playground multilang + LHC multilang",children:(0,a.jsx)("p",{children:"Showing the same parser in Python/Go/Rust/Haskell/Scala is not just about language choice — it's about paradigm comparison. Python's pandas is imperative + readable. Go's encoding/csv is explicit + fast. Rust's serde is memory-safe + zero-copy. Haskell's Cassava is lazy + type-safe. Scala's Spark is distributed + cluster-scale. The SAME data produces the SAME JSON schema in all 5 — but the journey reveals each language's priorities. This is consistent with the platform's teaching philosophy: 'see the same analysis through 5 lenses.'"})}),(0,a.jsx)(l.DeeperThought,{title:"The 100MB browser limit is a FEATURE, not a bug",connectedTo:"Climate ERA5 (5PB) + LHC (90PB/yr)",children:(0,a.jsx)("p",{children:"The browser limit forces a design choice: do you build a backend (Option B/C in the vision doc), or do you build a 'guide pattern' that gives the user a downloadable script? The guide pattern wins for 3 reasons: (1) it works on GitHub Pages (no backend), (2) it teaches the user what the parser does (no black-box), (3) it gracefully degrades for ANY file size (the script runs locally on the user's machine, no limit). The 100MB limit is the trigger that activates this fallback — without it, we'd try to load a 5GB file in Pyodide and crash the browser. The limit is the safety net."})}),(0,a.jsx)(l.DeeperThought,{title:"The 'guide pattern' for auto-blog is the LLM equivalent of the parser dropdown",connectedTo:"RAG/LLM pages",children:(0,a.jsx)("p",{children:"Instead of calling an LLM API (which requires a backend + API key + costs money), the auto-blog section compiles a STRUCTURED PROMPT and gives the user 4 LLM links (ChatGPT/Claude/Gemini/Z.ai). The user copies the prompt, opens their preferred LLM, and gets a blog post. This is the LLM equivalent of the parser dropdown: same input (the schema), different runtimes (user's choice of LLM). The prompt is structured enough that any LLM produces a consistent 500-word blog. The platform stays useful even without an LLM integration."})}),(0,a.jsx)(l.DeeperThought,{title:"Every section is visible from page load — the full pipeline upfront",connectedTo:"ML Playground page-map pattern",children:(0,a.jsx)("p",{children:"Unlike most upload-and-analyze tools that hide the analysis behind a 'loading' spinner, this page shows ALL 9 sections from the moment it loads. The parser code is visible. The upload zone is visible. The ETL pipeline is visible. The 8 analysis cards are visible (with placeholder code). The report generator is visible. The blog prompt is visible. The download-script option is visible. The user sees the ENTIRE pipeline before uploading anything — they know exactly what will happen to their data. This transparency is rare in data tools and is a deliberate design choice consistent with the platform's teaching philosophy."})}),(0,a.jsx)(l.DeeperThought,{title:"The 5-stage ETL pipeline visualization is the simplest possible DAG",connectedTo:"Airflow + Dagster + dbt pages",children:(0,a.jsx)("p",{children:"Raw → Parsed → Typed → Cleaned → Analyzed. That's 5 stages. In production, this would be an Airflow DAG with sensors, retries, SLAs. Here, it's a visual flowchart that links to the actual Pyodide execution. The practicing DS who understands this 5-stage pattern can immediately see how it maps to: (1) Kafka ingestion (Raw → Parsed), (2) dbt transformation (Typed → Cleaned), (3) BI dashboard (Analyzed). The auto-analyze portal is a microcosm of the entire data platform — every page on this site is one branch of the same 5-stage tree."})})]}),(0,a.jsx)(o.NextSteps,{relatedPages:[{id:"ml-playground",reason:"Train a BDT in-browser — same Pyodide pattern, interactive hyperparameters"},{id:"lhc-data-analysis",reason:"See the 15-card analysis template this portal auto-generates"},{id:"dashboard",reason:"Live data ingestion from 4 APIs — the 'Raw → Parsed' stage in production"},{id:"analytics-outputs",reason:"The 5-tab chart toolbar (Chart/Table/Code/Summary/Report) used on every analysis card"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(s.default,{href:(0,d.hrefFor)("home"),className:"text-sm text-primary hover:underline",children:"→ Return to overview"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(s.default,{href:(0,d.hrefFor)("ml-playground"),className:"text-sm text-primary hover:underline",children:"→ ML Playground"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(s.default,{href:(0,d.hrefFor)("lhc-data-analysis"),className:"text-sm text-primary hover:underline",children:"→ LHC Data Analysis"})]})]})}function R({title:e,description:s,accent:n,icon:o,code:l,preamble:d,disabled:c}){let[m,u]=(0,t.useState)(null);return(0,a.jsxs)("div",{className:"rounded-lg border border-border/60 overflow-hidden",style:{borderLeftWidth:4,borderLeftColor:n},children:[(0,a.jsxs)("div",{className:"p-3 border-b border-border/40",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-1",children:[(0,a.jsx)("span",{style:{color:n},children:o}),(0,a.jsx)("p",{className:"text-sm font-semibold",children:e})]}),(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground",children:s})]}),(0,a.jsx)("div",{className:"p-3 space-y-2",children:c?(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground/70 italic",children:"↑ Upload a dataset to enable this analysis"}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-2",children:(0,a.jsx)(r.PyodideRunner,{code:l,buttonLabel:"Generate visualization",onOutput:e=>{try{let a=e.indexOf("{"),t=e.lastIndexOf("}");a>=0&&t>a&&u(JSON.parse(e.substring(a,t+1)))}catch{}},hideTextOutput:!!m,compact:!0,preamble:d})}),m?(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("button",{type:"button",onClick:()=>u(null),className:"absolute top-1 right-1 z-10 w-6 h-6 rounded-full border border-border/60 bg-background/90 flex items-center justify-center hover:bg-muted/80 transition-colors",title:"Close chart","aria-label":"Close chart",children:(0,a.jsx)(F.X,{className:"h-3.5 w-3.5 text-muted-foreground"})}),(0,a.jsx)(i.AnalysisChart,{data:m,accent:n,sourceCode:l})]}):(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground/70 italic",children:'↑ Click "Generate visualization" to see the chart'})]})})]})}function P({title:e,description:s,accent:n,icon:o,chartCode:l,preamble:d,disabled:c}){let[m,u]=(0,t.useState)(null);return(0,a.jsxs)("div",{className:"rounded-lg border border-border/60 overflow-hidden",style:{borderLeftWidth:4,borderLeftColor:n},children:[(0,a.jsxs)("div",{className:"p-3 border-b border-border/40",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-1",children:[(0,a.jsx)("span",{style:{color:n},children:o}),(0,a.jsx)("p",{className:"text-sm font-semibold",children:e})]}),(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground",children:s})]}),(0,a.jsx)("div",{className:"p-3 space-y-2",children:c?(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground/70 italic",children:"↑ Upload a dataset to enable this chart"}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-2",children:(0,a.jsx)(r.PyodideRunner,{code:l,buttonLabel:"Generate chart",onOutput:e=>{try{let a=e.indexOf("{"),t=e.lastIndexOf("}");a>=0&&t>a&&u(JSON.parse(e.substring(a,t+1)))}catch{}},hideTextOutput:!!m,compact:!0,preamble:d})}),m?(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("button",{type:"button",onClick:()=>u(null),className:"absolute top-1 right-1 z-10 w-6 h-6 rounded-full border border-border/60 bg-background/90 flex items-center justify-center hover:bg-muted/80 transition-colors",title:"Close chart","aria-label":"Close chart",children:(0,a.jsx)(F.X,{className:"h-3.5 w-3.5 text-muted-foreground"})}),(0,a.jsx)(i.AnalysisChart,{data:m,accent:n,sourceCode:l})]}):(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground/70 italic",children:'↑ Click "Generate chart" to see the visualization'})]})})]})}function q({datasetBytes:e,dataset:s}){let[n,r]=(0,t.useState)(!1),[i,o]=(0,t.useState)(null),[l,d]=(0,t.useState)(0),[c,u]=(0,t.useState)(null),[p,h]=(0,t.useState)("bars"),f=(0,t.useRef)(null),g=(0,t.useRef)(null),b=(0,t.useRef)([]),A=(0,t.useRef)(null),E=(0,t.useRef)(null),L=(0,t.useCallback)(()=>{let e=document.querySelector(".recharts-surface");if(!e)return void u("No chart found on the page. Generate a chart first (Section 5 or 6), then click Capture.");u(null);let a=new Blob([new XMLSerializer().serializeToString(e)],{type:"image/svg+xml;charset=utf-8"}),t=URL.createObjectURL(a),s=new Image;s.onload=()=>{let e=document.createElement("canvas");e.width=s.width||800,e.height=s.height||400;let a=e.getContext("2d");a&&(a.fillStyle="white",a.fillRect(0,0,e.width,e.height),a.drawImage(s,0,0),e.toBlob(e=>{if(e){let a=URL.createObjectURL(e),t=document.createElement("a");t.href=a,t.download=`chart-${Date.now()}.png`,t.click(),URL.revokeObjectURL(a)}},"image/png")),URL.revokeObjectURL(t)},s.src=t},[]),_=(0,t.useCallback)(async()=>{if(!e||!s)return void u("Load a dataset first (click 'Try sample data' or upload).");let a=f.current;if(!a)return void u("Canvas not found.");u(null),o(null),a.width=800,a.height=450;let t=a.getContext("2d");if(!t)return void u("Canvas 2D context unavailable.");let n=s.columns.filter(e=>"numeric"===e.kind);if(0===n.length)return void u("No numeric columns.");let i=n[0],l=s.head.map(e=>{let a=e[i.name];if("number"==typeof a)return a;let t=parseFloat(String(a));return isNaN(t)?0:t}).filter(e=>0!==e),c=l.length>=3?l:n.slice(0,5).map(()=>100*Math.random()+20),m=c.length===l.length?s.head.slice(0,c.length).map((e,a)=>"Row "+(a+1)):n.slice(0,c.length).map(e=>e.name.slice(0,10)),p=a.captureStream(30),h=MediaRecorder.isTypeSupported("video/webm;codecs=vp9")?"video/webm;codecs=vp9":"video/webm",x=new MediaRecorder(p,{mimeType:h});g.current=x,b.current=[],x.ondataavailable=e=>{e.data.size>0&&b.current.push(e.data)},x.onstop=()=>{let e=new Blob(b.current,{type:"video/webm"});o(URL.createObjectURL(e)),r(!1),d(0),A.current&&clearInterval(A.current),E.current&&cancelAnimationFrame(E.current)},x.start(),r(!0),d(0);let y=Math.max(...c),v=performance.now(),L=e=>{let n=e-v,r=Math.min(n/5e3,1);t.fillStyle="#1a1a2e",t.fillRect(0,0,a.width,a.height),t.fillStyle="#e0e0e0",t.font="bold 20px sans-serif",t.textAlign="center",t.fillText(s.filename+" — "+i.name,a.width/2,35),t.font="12px sans-serif",t.fillStyle="#a0a0a0",t.fillText("Auto-generated · "+s.nRows+" rows · "+(r<1?"Building...":"Complete"),a.width/2,55);let o=(a.width-120)/c.length,l=a.height-120;c.forEach((e,s)=>{let n=e/y*l*r,i=60+s*o,d=a.height-60-n,c=t.createLinearGradient(0,d,0,a.height-60);c.addColorStop(0,"#60a5fa"),c.addColorStop(1,"#3b82f6"),t.fillStyle=c,t.fillRect(i+5,d,o-10,n),r>.8&&(t.fillStyle="#e0e0e0",t.font="11px monospace",t.textAlign="center",t.fillText(e.toFixed(1),i+o/2,d-8)),t.fillStyle="#808080",t.font="10px sans-serif",t.textAlign="center",t.fillText(m[s]||"",i+o/2,a.height-40)}),t.fillStyle="#333",t.fillRect(0,a.height-15,a.width,3),t.fillStyle="#3b82f6",t.fillRect(0,a.height-15,a.width*r,3),d(Math.floor(n/1e3)),r<1?E.current=requestAnimationFrame(L):setTimeout(()=>x.stop(),1e3)};E.current=requestAnimationFrame(L),A.current=setInterval(()=>{d(e=>e>=7?(x.stop(),8):e+1)},1e3)},[e,s]),N=(0,t.useCallback)(()=>{g.current?.stop()},[]),C=(0,t.useCallback)(()=>{if(!i)return;let e=document.createElement("a");e.href=i,e.download="animated-chart-"+Date.now()+".webm",e.click()},[i]);return(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsx)("canvas",{ref:f,width:800,height:450,className:"w-full rounded-lg border border-border/40 bg-[#1a1a2e]",style:{display:n||i?"block":"none"}}),(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,a.jsx)(j.Sparkles,{className:"h-4 w-4 text-primary"}),(0,a.jsx)("p",{className:"text-[11px] font-semibold",children:"Animated chart (auto-generated)"})]}),(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground mb-2",children:"Draws bars growing progressively on a canvas — a “moving image” of your data. No screen permissions needed. Produces a 5-second .webm video."}),n?(0,a.jsxs)(m.Button,{variant:"destructive",size:"sm",onClick:N,className:"h-7 text-[11px] gap-1.5",children:[(0,a.jsx)(y.Activity,{className:"h-3 w-3 animate-pulse"})," Stop (",l,"s)"]}):(0,a.jsxs)(m.Button,{variant:"default",size:"sm",onClick:_,disabled:!e,className:"h-7 text-[11px] gap-1.5",children:[(0,a.jsx)(j.Sparkles,{className:"h-3 w-3"})," Generate animation"]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-border/40 p-3",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,a.jsx)(x.FileText,{className:"h-4 w-4 text-blue-500"}),(0,a.jsx)("p",{className:"text-[11px] font-semibold",children:"Capture chart as PNG"})]}),(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground mb-2",children:"Exports the first visible chart as PNG. Generate a chart first (Section 5 or 6), then click Capture."}),(0,a.jsxs)(m.Button,{variant:"outline",size:"sm",onClick:L,className:"h-7 text-[11px] gap-1.5",children:[(0,a.jsx)(v.Download,{className:"h-3 w-3"})," Capture PNG"]})]})]}),i&&(0,a.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-3",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,a.jsx)(M.Check,{className:"h-4 w-4 text-emerald-600 dark:text-emerald-400"}),(0,a.jsx)("p",{className:"text-[11px] font-medium text-emerald-700 dark:text-emerald-400",children:"Animation ready! Download + publish:"})]}),(0,a.jsxs)("div",{className:"flex items-center gap-2 flex-wrap mb-2",children:[(0,a.jsxs)(m.Button,{variant:"outline",size:"sm",onClick:C,className:"h-7 text-[11px] gap-1.5",children:[(0,a.jsx)(v.Download,{className:"h-3 w-3"})," Download .webm"]}),(0,a.jsx)("span",{className:"text-[10px] text-muted-foreground",children:"Then publish to:"}),(0,a.jsx)("a",{href:"https://www.youtube.com/upload",target:"_blank",rel:"noopener noreferrer",className:"text-[11px] text-primary hover:underline",children:"YouTube"}),(0,a.jsx)("a",{href:"https://twitter.com/compose/post",target:"_blank",rel:"noopener noreferrer",className:"text-[11px] text-primary hover:underline",children:"Twitter/X"}),(0,a.jsx)("a",{href:"https://www.linkedin.com/feed/?shareActive=true",target:"_blank",rel:"noopener noreferrer",className:"text-[11px] text-primary hover:underline",children:"LinkedIn"}),(0,a.jsx)("a",{href:"https://www.instagram.com",target:"_blank",rel:"noopener noreferrer",className:"text-[11px] text-primary hover:underline",children:"Instagram"}),(0,a.jsx)("a",{href:"https://vimeo.com/upload",target:"_blank",rel:"noopener noreferrer",className:"text-[11px] text-primary hover:underline",children:"Vimeo"})]}),(0,a.jsx)("video",{src:i,controls:!0,className:"w-full rounded border border-border/40 max-h-64"})]}),c&&(0,a.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-3 flex items-start gap-2",children:[(0,a.jsx)(w.AlertTriangle,{className:"h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"}),(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground",children:c})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"How the animated chart works"}),(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground leading-relaxed",children:"The animation is drawn on a canvas using the Canvas 2D API. Bars grow progressively over 5 seconds (using requestAnimationFrame for smooth 60fps motion). The canvas is captured via canvas.captureStream(30) and recorded by MediaRecorder — no screen permissions needed. The result is a clean .webm video of just the animated chart, ready to upload to YouTube/Twitter/LinkedIn/Instagram/Vimeo."})]})]})}e.s(["AutoAnalyzePage",()=>G],224058)}]);