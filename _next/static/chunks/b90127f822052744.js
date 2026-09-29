(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,205521,e=>{"use strict";var t=e.i(843476),r=e.i(522016),a=e.i(862824),s=e.i(342046),n=e.i(122836),i=e.i(732576),o=e.i(90441),l=e.i(271645),d=e.i(846932),c=e.i(88653),p=e.i(487486),m=e.i(519455),u=e.i(37727),h=e.i(691385),x=e.i(39312),f=e.i(283086),g=e.i(966992),y=e.i(21218),b=e.i(658041),v=e.i(431343),j=e.i(367240),w=e.i(384783),w=w,_=e.i(178583),S=e.i(778917),N=e.i(794827),k=e.i(852008),T=e.i(25652),E=e.i(716675),A=e.i(901752);function C({open:e,onClose:r,title:a,subtitle:s,accent:n,icon:i,children:o}){return(0,l.useEffect)(()=>{if(!e)return;let t=e=>{"Escape"===e.key&&r()};return window.addEventListener("keydown",t),document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",t),document.body.style.overflow=""}},[e,r]),(0,t.jsx)(c.AnimatePresence,{children:e&&(0,t.jsxs)(d.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 md:p-6 overflow-y-auto",onClick:r,children:[(0,t.jsx)("button",{type:"button",onClick:r,className:"absolute top-3 right-3 z-30 p-2 rounded-full bg-background/90 border border-border hover:bg-accent transition-colors","aria-label":"Close",children:(0,t.jsx)(u.X,{className:"h-5 w-5"})}),(0,t.jsxs)("div",{className:"absolute top-3 left-3 z-30 px-3 py-1.5 rounded-full bg-background/90 border border-border flex items-center gap-2 text-xs font-semibold",children:[(0,t.jsx)("span",{style:{color:n},children:i}),(0,t.jsx)("span",{style:{color:n},children:a}),s&&(0,t.jsxs)("span",{className:"text-muted-foreground font-normal hidden md:inline",children:["· ",s]})]}),(0,t.jsxs)(d.motion.div,{initial:{scale:.95,opacity:0,y:20},animate:{scale:1,opacity:1,y:0},exit:{scale:.95,opacity:0,y:20},transition:{duration:.25},className:"relative w-full max-w-4xl my-8 rounded-xl border border-border bg-background shadow-2xl overflow-hidden",onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"border-b border-border/40 bg-muted/20 px-4 md:px-6 py-3 flex items-center gap-3",children:[(0,t.jsx)("div",{className:"flex items-center justify-center w-9 h-9 rounded-lg shrink-0",style:{backgroundColor:n+"20"},children:i}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-base font-bold leading-tight",style:{color:n},children:a}),s&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground font-mono",children:s})]})]}),(0,t.jsx)("div",{className:"p-4 md:p-6 max-h-[80vh] overflow-y-auto",children:o})]})]})})}function L({intent:e,math:r,insight:a,accent:s}){return(0,t.jsxs)("div",{className:"mt-4 space-y-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-muted/30 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5",children:"Design intent"}),(0,t.jsx)("p",{className:"text-foreground/80 leading-relaxed",children:e})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5",children:"Math foundation"}),(0,t.jsx)("p",{className:"font-mono text-[11px] text-primary leading-relaxed",children:r})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-0.5",children:"Implementation insight"}),(0,t.jsx)("p",{className:"text-emerald-700 dark:text-emerald-400 leading-relaxed",children:a})]})]})}function R(){let[e,r]=(0,l.useState)(0);(0,l.useEffect)(()=>{let e=setInterval(()=>r(e=>(e+1)%6),1500);return()=>clearInterval(e)},[]);let a=[{name:"Detector",rate:"40 TB/s",desc:"100M+ channels at 40 MHz"},{name:"L1 Trigger",rate:"100 GB/s",desc:"FPGA hardware, 3 µs latency"},{name:"HLT",rate:"1 GB/s",desc:"Software farm, ~100 kHz kept"},{name:"Readout",rate:"500 MB/s",desc:"Zero-suppress + compress"},{name:"EOS Storage",rate:"1 PB/yr",desc:"CERN EOS, XRootD protocol"},{name:"WLCG Grid",rate:"250 sites",desc:"Distributed to 60+ countries"}];return(0,t.jsx)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:(0,t.jsxs)("svg",{viewBox:"0 0 500 200",className:"w-full h-auto",children:[a.map((r,s)=>{let n=30+80*s,i=s===e;return(0,t.jsxs)(d.motion.g,{animate:{opacity:i?1:.4},transition:{duration:.3},children:[s<a.length-1&&(0,t.jsx)(d.motion.line,{x1:n+55,y1:"100",x2:n+75,y2:"100",stroke:i?"oklch(0.75 0.16 250)":"oklch(0.55 0.05 250 / 0.3)",strokeWidth:i?2:1,markerEnd:"url(#arrow)"}),(0,t.jsx)(d.motion.rect,{x:n,y:"60",width:"55",height:"50",rx:"4",fill:i?"oklch(0.65 0.16 250 / 0.3)":"oklch(0.55 0.05 250 / 0.1)",stroke:i?"oklch(0.75 0.16 250)":"oklch(0.55 0.05 250)",strokeWidth:i?1.5:.8,animate:{scale:i?1.05:1},style:{transformOrigin:`${n+27.5}px 85px`}}),(0,t.jsx)("text",{x:n+27.5,y:"82",textAnchor:"middle",fontSize:"8",fill:i?"oklch(0.85 0.16 250)":"oklch(0.55 0.05 250)",fontWeight:"bold",children:r.name}),(0,t.jsx)("text",{x:n+27.5,y:"92",textAnchor:"middle",fontSize:"7",fill:i?"oklch(0.75 0.10 250)":"oklch(0.45 0.05 250)",children:r.rate}),i&&(0,t.jsx)(d.motion.circle,{cx:n+27.5,cy:"125",r:"3",fill:"oklch(0.85 0.16 250)",animate:{cx:[n+5,n+50,n+5]},transition:{duration:1.5,repeat:1/0}})]},s)}),(0,t.jsxs)("text",{x:"250",y:"160",textAnchor:"middle",fontSize:"9",fill:"oklch(0.75 0.16 250)",fontWeight:"bold",children:[a[e].name,": ",a[e].desc]}),(0,t.jsxs)("text",{x:"250",y:"175",textAnchor:"middle",fontSize:"8",fill:"oklch(0.55 0.05 250)",children:["Data rate: ",a[e].rate]}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"oklch(0.55 0.05 250 / 0.5)"})})})]})})}function P(){let[e,r]=(0,l.useState)("binary"),[a,s]=(0,l.useState)([]);return(0,l.useEffect)(()=>{s([])},[e]),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2",children:[(0,t.jsxs)("button",{type:"button",onClick:()=>r("binary"),className:`h-10 rounded-md border text-xs font-semibold transition-all ${"binary"===e?"bg-primary text-primary-foreground border-primary":"bg-card border-border hover:border-primary hover:bg-accent"}`,children:[(0,t.jsx)(w.default,{className:"h-3 w-3 inline mr-1.5"})," Real binary data (hex dump)"]}),(0,t.jsxs)("button",{type:"button",onClick:()=>r("synthetic"),className:`h-10 rounded-md border text-xs font-semibold transition-all ${"synthetic"===e?"bg-amber-600 text-white border-amber-600":"bg-card border-border hover:border-amber-500"}`,children:[(0,t.jsx)(_.FileText,{className:"h-3 w-3 inline mr-1.5"})," Synthetic data (structured)"]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2",children:"binary"===e?"CMS raw event binary (RD5 format — 80 bytes/event)":"Synthetic CMS events (Python-generated, structured)"}),(0,t.jsx)("pre",{className:"text-[10px] font-mono text-foreground/80 leading-relaxed overflow-x-auto whitespace-pre-wrap",children:"binary"===e?(()=>{let e=[];for(let t=0;t<8;t++){let r=(1+t).toString(16).padStart(8,"0"),a=(2549*t%4096).toString(16).padStart(8,"0"),s=(Date.now()+25*t).toString(16).padStart(16,"0"),n=(42+t).toString(16).padStart(8,"0"),i="30".padStart(8,"0"),o=[];for(let e=0;e<3;e++){let r=Math.floor(50+(Math.random()-.5)*20),a=(e+3*t).toString(16).padStart(8,"0");o.push(a+r.toString(16).padStart(8,"0"))}e.push(`${r} ${a} ${s} ${n} ${i} 00000000`),e.push(`  ${o.join(" ")}`)}return e.join("\n")})():(()=>{let e=[];e.push("event_id | bunch_crossing | timestamp | lumi_block | channels"),e.push("---------|----------------|-----------|-----------|---------");for(let t=0;t<6;t++){let r=1+t,a=2549*t%4096,s=new Date(Date.now()+25*t).toISOString().slice(11,19),n=42+t,i=Array.from({length:3},(e,r)=>{let a=(50+(Math.random()-.5)*20).toFixed(1),s=r+3*t;return`ch${s}=${a}GeV`}).join(", ");e.push(`${r.toString().padStart(8)} | ${a.toString().padStart(14)} | ${s} | ${n.toString().padStart(9)} | ${i}`)}return e.join("\n")})()})]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground",children:"binary"===e?"Real binary: CMS detectors output raw binary via VME/FPGA front-ends. Each event is a 32-byte header (event_id, bunch_crossing, timestamp, lumi_block, payload_length) followed by channel energy readings. Parsed at wire speed by zero-copy Rust code.":"Synthetic: Python generates structured events with channel energies (Gaussian ~50 GeV mean). Used for pipeline testing, Monte Carlo studies, and CI/CD validation — same code path as real data."})]})}let D=`import struct
import numpy as np

# LHC data reduction pipeline (Python/PySpark simulation)
# CMS detector: 100M+ channels at 40 MHz → 40 TB/s raw

def generate_cms_event(n_channels=1000):
    """Generate synthetic CMS event data."""
    channels = np.random.normal(50, 10, n_channels)  # GeV
    channel_ids = np.arange(n_channels, dtype=np.uint16)
    timestamps = np.full(n_channels, np.random.randint(0, 2**32), dtype=np.uint32)
    return np.stack([channels, channel_ids, timestamps], axis=1)

def zero_suppression(event, threshold=10.0):
    """Zero suppression — keep only channels above threshold."""
    mask = event[:, 0] > threshold
    return event[mask]

def compress_event(event):
    """Simulate compression (zstd level 3 — typical 3x for CMS data)."""
    raw_size = event.nbytes
    compressed_size = raw_size // 3
    return compressed_size, raw_size

# Simulate pipeline
n_events = 1000
raw_data = [generate_cms_event() for _ in range(n_events)]
raw_total = sum(e.nbytes for e in raw_data)

# Stage 1: Zero suppression
filtered = [zero_suppression(e) for e in raw_data]
filtered_total = sum(e.nbytes for e in filtered)

# Stage 2: Compression
compressed = [compress_event(e) for e in filtered]
compressed_total = sum(c[0] for c in compressed)

print("=== LHC Data Reduction Pipeline ===")
print(f"Raw data:        {raw_total:>12,} bytes ({raw_total/1e6:.1f} MB)")
print(f"After zero-supp: {filtered_total:>12,} bytes ({filtered_total/1e6:.1f} MB)  [{filtered_total/raw_total*100:.1f}% of raw]")
print(f"After compress:  {compressed_total:>12,} bytes ({compressed_total/1e6:.1f} MB)  [{compressed_total/raw_total*100:.1f}% of raw]")
print(f"Reduction:       {raw_total/compressed_total:.1f}x")
print()
reduction = raw_total / compressed_total
print(f"At LHC scale: 40 TB/s raw -> {40e12 / reduction / 1e9:.1f} GB/s after pipeline")
print(f"Annual storage: {40e12 / reduction * 3.15e7 / 1e15:.2f} PB/year")`,M=`use memmap2::Mmap;
use std::fs::File;
use std::error::Error;

// CMS Raw Data Format (RD5) — zero-copy binary parser
// 40 MHz crossing rate, ~2 MB/event = 80 GB/s per detector half
// Memory-mapped I/O for zero-copy parsing at wire speed

#[repr(C, packed)]
struct EventHeader {
    event_id: u64,        // 8 bytes — unique event identifier
    bunch_crossing: u32,  // 4 bytes — BX number (0-4095)
    timestamp: u64,       // 8 bytes — nanosecond timestamp
    lumi_block: u32,      // 4 bytes — luminosity block number
    payload_len: u32,     // 4 bytes — detector data length
    reserved: u32,        // 4 bytes — alignment padding
    // Total: 32 bytes
}

struct CMSEvent<'a> {
    header: &'a EventHeader,
    detector_data: &'a [u8],  // zero-copy slice into mmap
}

fn parse_cms_raw(path: &str) -> Result<Vec<CMSEvent>, Box<dyn Error>> {
    let file = File::open(path)?;
    let mmap = unsafe { Mmap::map(&file)? };
    let bytes = &mmap[..];

    let mut events = Vec::new();
    let mut offset = 0;

    while offset + 32 <= bytes.len() {
        // Zero-copy: just reference the mmap'd bytes
        let header: &EventHeader = unsafe {
            &*(bytes[offset..].as_ptr() as *const EventHeader)
        };

        let payload_end = offset + 32 + header.payload_len as usize;
        if payload_end > bytes.len() { break; }

        let detector_data = &bytes[offset + 32..payload_end];

        events.push(CMSEvent { header, detector_data });
        offset = payload_end;
    }

    Ok(events)  // All slices point into the mmap — zero copy
}

// SIMD-optimized energy extraction (8 channels at once)
#[cfg(target_arch = "x86_64")]
fn extract_energies_simd(data: &[u8]) -> Vec<f32> {
    use std::arch::x86_64::*;
    let floats: Vec<f32> = data.chunks_exact(4)
        .map(|c| f32::from_le_bytes(c.try_into().unwrap()))
        .collect();
    // Process 8 floats at once with AVX2
    floats.chunks_exact(8)
        .map(|chunk| {
            let v = unsafe { _mm256_loadu_ps(chunk.as_ptr()) };
            let mut result = [0.0f32; 8];
            unsafe { _mm256_storeu_ps(result.as_mut_ptr(), v); }
            result
        })
        .flatten()
        .collect()
}`,I=`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.streaming.Trigger
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._

// Real-time CMS event stream processing via Kafka + Spark Structured Streaming
// HLT outputs ~100 kHz events → aggregate luminosity + trigger rates

val spark = SparkSession.builder()
  .appName("CMS-LHC-Streaming")
  .config("spark.sql.streaming.checkpointLocation", "/checkpoint/cms")
  .getOrCreate()

// Schema for CMS HLT events (JSON-encoded from HLT farm)
val eventSchema = StructType(Array(
  StructField("event_id", LongType, false),
  StructField("bunch_crossing", IntegerType, false),
  StructField("timestamp", TimestampType, false),
  StructField("lumi_block", IntegerType, false),
  StructField("trigger_type", StringType, false),
  StructField("energy", DoubleType, false),
  StructField("missing_et", DoubleType, false),
  StructField("jets", ArrayType(StructType(Array(
    StructField("pt", DoubleType),
    StructField("eta", DoubleType),
    StructField("phi", DoubleType)
  ))),
  StructField("met", DoubleType, false)
))

// Read from CMS Kafka cluster at CERN
val events = spark.readStream
  .format("kafka")
  .option("kafka.bootstrap.servers", "cms-kafka.cern.ch:9092")
  .option("subscribe", "cms-hlt-events")
  .option("startingOffsets", "latest")
  .option("failOnDataLoss", "false")
  .load()

// Parse + filter (physics trigger selection)
val parsed = events
  .select(from_json(col("value").cast("string"), eventSchema)
    .as("event"))
  .select("event.*")
  .filter($"energy" > 50.0 && $"met" > 20.0)  // physics threshold

// Aggregate: luminosity + trigger rates per 10-second window
val aggregated = parsed
  .withWatermark("timestamp", "30 seconds")
  .groupBy(
    window($"timestamp", "10 seconds"),
    $"trigger_type"
  )
  .agg(
    count("*").as("event_count"),
    avg("energy").as("avg_energy"),
    sum("energy").as("total_energy"),
    approx_count_distinct("event_id").as("unique_events")
  )

// Write to CERN EOS storage (Parquet, partitioned by date)
val query = aggregated.writeStream
  .outputMode("append")
  .trigger(Trigger.ProcessingTime("5 seconds"))
  .format("parquet")
  .option("path", "/eos/cms/store/streaming/aggregated")
  .option("checkpointLocation", "/checkpoint/cms-agg")
  .partitionBy("trigger_type")
  .start()

query.awaitTermination()`,B=`defmodule CMS.EventPipeline do
  @moduledoc """
  Real-time CMS event processing using GenStage + Flow.
  
  100 kHz HLT event rate with backpressure handling via GenStage demand.
  Pipeline stages: Readout → ZeroSuppress → Compress → Store
  
  Each stage runs concurrently with Flow.map/2 (1 stage = 1 OTP process).
  Backpressure is automatic: downstream demands upstream only when ready.
  """
  
  use GenStage
  
  def start_link(opts) do
    GenStage.start_link(__MODULE__, :ok, opts)
  end
  
  # --- Producer: reads from CMS readout system ---
  def init(:ok) do
    {:producer, %{demand: 0, queue: :queue.new()}}
  end
  
  def handle_demand(demand, state) when demand > 0 do
    # Fetch events from CMS readout (FEE — Front-End Electronics)
    events = CMS.Readout.fetch_events(demand)
    {:noreply, events, %{state | demand: state.demand - length(events)}}
  end
  
  # --- ProducerConsumer: zero-suppression filter ---
  def handle_events(events, _from, _state) do
    # Keep only channels above energy threshold (10 GeV)
    filtered = Enum.filter(events, fn e ->
      e.energy > 10.0  # GeV threshold
    end)
    # ~80% of channels are noise — big reduction
    {:noreply, filtered}
  end
  
  # --- Consumer: writes compressed events to EOS storage ---
  def handle_events(events, _from, _state) do
    # Batch write to CERN EOS (XRootD protocol)
    :ok = CMS.EOS.write_batch(events, "/eos/cms/store/raw")
    {:noreply, [], :ok}
  end
end

# Build the pipeline with backpressure
# Producer → ProducerConsumer → Consumer (demand-driven)
{:ok, readout}  = CMS.EventPipeline.start_link(name: :readout)
{:ok, filter}   = CMS.EventPipeline.start_link(name: :filter)
{:ok, compress} = CMS.EventPipeline.start_link(name: :compress)
{:ok, storage}  = CMS.EventPipeline.start_link(name: :storage)

# Wire the pipeline — demand flows upstream (right to left)
GenStage.sync_subscribe(filter,   to: readout,  max_demand: 1000)
GenStage.sync_subscribe(compress, to: filter,   max_demand: 500)
GenStage.sync_subscribe(storage,  to: compress,  max_demand: 100)

# Backpressure: if storage slows down (EOS write latency),
# demand drops → compress slows → filter slows → readout slows.
# The pipeline NEVER overflows — GenStage handles it automatically.`,z=`import struct
import numpy as np

# Python equivalent of the Rust zero-copy binary parser
# Parses CMS RD5 format binary data (simulated)

def generate_cms_binary(n_events=10):
    """Generate synthetic CMS RD5 binary data."""
    data = b''
    for i in range(n_events):
        event_id = i + 1
        bx = (i * 2549) % 4096
        timestamp = 1000000 + i * 25
        lumi_block = 42 + i
        n_channels = 3
        payload_len = n_channels * 8
        header = struct.pack('<QIqIII', event_id, bx, timestamp, lumi_block, payload_len, 0)
        payload = b''
        for c in range(n_channels):
            channel_id = c + i * 3
            energy = 50.0 + (np.random.random() - 0.5) * 20
            payload += struct.pack('<If', channel_id, energy)
        data += header + payload
    return data

def parse_cms_binary(data):
    """Parse CMS RD5 binary data (Python equiv of Rust zero-copy)."""
    events = []
    offset = 0
    while offset + 32 <= len(data):
        event_id, bx, timestamp, lumi_block, payload_len, _ = struct.unpack_from('<QIqIII', data, offset)
        n_channels = payload_len // 8
        energies = []
        for c in range(n_channels):
            ch_offset = offset + 32 + c * 8
            channel_id, energy = struct.unpack_from('<If', data, ch_offset)
            energies.append((channel_id, round(energy, 1)))
        events.append({
            'event_id': event_id,
            'bx': bx,
            'lumi_block': lumi_block,
            'energies': energies,
        })
        offset += 32 + payload_len
    return events

binary_data = generate_cms_binary(10)
print(f"Generated {len(binary_data)} bytes of CMS RD5 binary data")
print(f"({len(binary_data) // 80} events x 80 bytes each)")
print()

events = parse_cms_binary(binary_data)
print(f"Parsed {len(events)} events:")
for e in events:
    energy_strs = [f"ch{ch}={en:.1f}GeV" for ch, en in e['energies']]
    print(f"  Event #{e['event_id']} | BX={e['bx']} | Lumi={e['lumi_block']} | {', '.join(energy_strs)}")
print()
print("Rust advantage: zero-copy (mmap), SIMD (8 floats/cycle), ~80 GB/s/core")
print("Python: struct.unpack + numpy, ~100 MB/s (1000x slower but same logic)")`,H=`import numpy as np
np.random.seed(42)

# Python equivalent of the Scala Spark Structured Streaming code
# Simulates: CMS HLT events -> filter -> aggregate -> EOS storage
# In production: runs on Apache Spark cluster at CERN

print("=== PySpark Structured Streaming (CMS HLT events) ===")
print()
print("Production code (runs on Spark cluster at CERN):")
print("  events = spark.readStream.format('kafka') ")
print("    .option('subscribe', 'cms-hlt-events').load()")
print("  parsed = events.select(from_json(...)).filter(...)")
print("  agg = parsed.withWatermark('timestamp', '30s') ")
print("    .groupBy(window('timestamp', '10s')).agg(count('*'), avg('energy'))")
print("  query = agg.writeStream.format('parquet').trigger('5s').start()")
print()

# Simulate the streaming aggregation in browser
n_events = 1000
energies = np.random.exponential(50, n_events)
met_values = np.random.exponential(20, n_events)
trigger_types = np.random.choice(['single_muon', 'double_muon', 'jet', 'met'], n_events)

# Filter: energy > 50 GeV, MET > 20 GeV
mask = (energies > 50) & (met_values > 20)
selected = mask.sum()

print(f"=== Simulated stream (1000 events, ~10 ms of HLT data) ===")
print(f"  Input rate: 100 kHz (CMS HLT output)")
print(f"  Total events in window: {n_events}")
print(f"  After filter (E>50 GeV, MET>20 GeV): {selected} events ({selected/n_events*100:.1f}%)")
print(f"  Average energy: {energies[mask].mean():.1f} GeV")
print(f"  Total energy in window: {energies[mask].sum():.0f} GeV")
print()

# Aggregate by trigger type (like groupBy in Spark)
for t in ['single_muon', 'double_muon', 'jet', 'met']:
    t_mask = mask & (trigger_types == t)
    n = t_mask.sum()
    if n > 0:
        avg_e = energies[t_mask].mean()
        print(f"  {t:>15}: {n:>4} events, avg E={avg_e:.1f} GeV")
    else:
        print(f"  {t:>15}: {n:>4} events")
print()
print("Spark advantage: distributed across cluster, fault-tolerant, checkpointed")
print("Python: single-node, but same aggregation logic (groupBy + agg)")`,G=`import queue
import threading
import time
import random

# Python equivalent of the Elixir GenStage backpressure pipeline
# Pipeline: Readout -> ZeroSuppress -> Compress -> Store
# Elixir: automatic backpressure via demand signaling
# Python: manual backpressure via bounded Queue

class PipelineStage(threading.Thread):
    def __init__(self, name, input_q, output_q, fn):
        super().__init__(daemon=True)
        self.name = name
        self.input_q = input_q
        self.output_q = output_q
        self.fn = fn
        self.processed = 0
    
    def run(self):
        while True:
            item = self.input_q.get()
            if item is None: break
            result = self.fn(item)
            if result is not None:
                self.output_q.put(result)
            self.processed += 1

# Bounded queues = backpressure (like GenStage max_demand)
q1 = queue.Queue(maxsize=100)
q2 = queue.Queue(maxsize=50)
q3 = queue.Queue(maxsize=20)

def readout(n):
    return {'id': n, 'channels': [random.gauss(50, 10) for _ in range(10)]}

def zero_suppress(event):
    event['channels'] = [c for c in event['channels'] if c > 10.0]
    return event

def compress(event):
    event['compressed'] = True
    return event

def store(event):
    return None

# Start stages
s2 = PipelineStage("ZeroSuppress", q1, q2, zero_suppress)
s3 = PipelineStage("Compress", q2, q3, compress)
s4 = PipelineStage("Storage", q3, None, store)
s2.start(); s3.start(); s4.start()

print("=== GenStage-equivalent pipeline (Python) ===")
print("Pipeline: Readout -> ZeroSuppress(max=100) -> Compress(max=50) -> Storage(max=20)")
print()

n = 500
start = time.time()
for i in range(n):
    q1.put(readout(i))

q1.put(None)
s2.join(timeout=5)
q2.put(None)
s3.join(timeout=5)
q3.put(None)
s4.join(timeout=5)
elapsed = time.time() - start

print(f"Events processed: {n}")
print(f"Zero-suppress: {s2.processed} | Compress: {s3.processed} | Storage: {s4.processed}")
print(f"Time: {elapsed:.2f}s ({n/elapsed:.0f} events/sec)")
print()
print("Backpressure: bounded queues (maxsize) prevent overflow.")
print("If storage slows -> q3 fills -> compress blocks -> q2 fills ->")
print("zero-suppress blocks -> q1 fills -> readout blocks.")
print()
print("Elixir advantage: backpressure is AUTOMATIC (built into GenStage)")
print("Python: must manually use bounded queues + blocking put/get")`,O=`from collections import defaultdict

print("=== ETL Pipeline (Data Warehouse) ===")
print()

sources = {
    "Shopify": [
        {"order_id": 1001, "email": "alice@example.com", "amount": 125.50, "currency": "USD"},
        {"order_id": 1002, "email": "bob@example.com", "amount": 89.99, "currency": "USD"},
        {"order_id": 1003, "email": "alice@example.com", "amount": 250.00, "currency": "EUR"},
        {"order_id": 1004, "email": "carol@example.com", "amount": 45.00, "currency": "GBP"},
    ],
    "Stripe": [
        {"payment_id": "PAY001", "order_id": 1001, "amount": 125.50, "status": "paid", "fee": 3.56},
        {"payment_id": "PAY002", "order_id": 1002, "amount": 89.99, "status": "paid", "fee": 2.55},
        {"payment_id": "PAY003", "order_id": 1003, "amount": 250.00, "status": "paid", "fee": 7.10},
    ],
}

print("=== EXTRACT ===")
total_rows = sum(len(rows) for rows in sources.values())
for source, rows in sources.items():
    print("  " + source + ": " + str(len(rows)) + " rows extracted")
print("  Total: " + str(total_rows) + " rows from " + str(len(sources)) + " sources")
print()

print("=== TRANSFORM ===")
fx_rate = {"USD": 1.0, "EUR": 1.09, "GBP": 1.27}
orders = sources["Shopify"]
for o in orders:
    o["amount_usd"] = round(o["amount"] * fx_rate.get(o["currency"], 1.0), 2)
    print("  Normalize: order " + str(o["order_id"]) + " " + str(o["amount"]) + " " + o["currency"] + " -> $ " + str(o["amount_usd"]) + " USD")

payments = sources["Stripe"]
enriched = []
for o in orders:
    payment = next((p for p in payments if p["order_id"] == o["order_id"]), None)
    if payment:
        enriched.append({
            "order_id": o["order_id"],
            "email": o["email"],
            "amount_usd": o["amount_usd"],
            "payment_status": payment["status"],
            "fee": payment["fee"],
            "net_amount": round(o["amount_usd"] - payment["fee"], 2),
        })
print("  Join: " + str(len(enriched)) + "/" + str(len(orders)) + " orders matched with payments")

customer_agg = defaultdict(lambda: {"orders": 0, "revenue": 0.0, "fees": 0.0})
for e in enriched:
    customer_agg[e["email"]]["orders"] += 1
    customer_agg[e["email"]]["revenue"] += e["net_amount"]
    customer_agg[e["email"]]["fees"] += e["fee"]

print("  Aggregate: " + str(len(customer_agg)) + " unique customers")
for email, agg in customer_agg.items():
    print("    " + email + ": " + str(agg["orders"]) + " orders, $ " + str(round(agg["revenue"], 2)) + " net, $ " + str(round(agg["fees"], 2)) + " fees")

print()
print("=== DATA QUALITY CHECKS ===")
checks = [
    ("No null emails", all(e["email"] for e in enriched)),
    ("All amounts positive", all(e["amount_usd"] > 0 for e in enriched)),
    ("Payment status is paid", all(e["payment_status"] == "paid" for e in enriched)),
    ("Net revenue > 0", all(e["net_amount"] > 0 for e in enriched)),
    ("No duplicate order IDs", len(set(e["order_id"] for e in enriched)) == len(enriched)),
]
all_pass = True
for check_name, passed in checks:
    status = "PASS" if passed else "FAIL"
    if not passed: all_pass = False
    print("  [" + status + "] " + check_name)
print("  Overall: " + ("ALL PASS" if all_pass else "SOME FAILED"))

print()
print("=== LOAD ===")
print("  Target: Snowflake (data_warehouse.gold.customer_aggregations)")
print("  Rows loaded: " + str(len(customer_agg)))
print("  Load method: MERGE (upsert on email)")
print()
print("ETL complete: " + str(total_rows) + " source rows -> " + str(len(enriched)) + " enriched -> " + str(len(customer_agg)) + " aggregated -> warehouse")
print()
print("=== ETL vs ELT ===")
print("  ETL (this card): Transform BEFORE load -> warehouse-ready data")
print("  ELT (Fivetran):  Load RAW first -> transform IN the warehouse")
print("  ELT advantage:   warehouse compute is cheaper than ETL server")
print("  ETL advantage:   warehouse stays clean (no raw data)")
print("  LHC pipeline:     ETL pattern (trigger+zero-suppress = transform, EOS = load)")
print("  Same pattern, different domain, different scale")`,F=`print("=== ELT Approach (Modern Lakehouse Architecture) ===")
print()
print("Pattern: Extract -> Load RAW -> Transform IN warehouse")
print("vs ETL:  Extract -> Transform -> Load (transform BEFORE load)")
print()
print("=== Step 1: EXTRACT + LOAD raw binary to object storage ===")
print("# DAQ captures raw binary (zero preprocessing)")
print("# Stream directly to S3/GCS/Ceph as immutable binary blobs")
print()
raw_blobs = [
    {"key": "s3://cms-daq/2024/run3/bucket_0001.bin", "size_bytes": 1048576, "events": 12500},
    {"key": "s3://cms-daq/2024/run3/bucket_0002.bin", "size_bytes": 1048576, "events": 12480},
    {"key": "s3://cms-daq/2024/run3/bucket_0003.bin", "size_bytes": 1048576, "events": 12510},
]
total_bytes = sum(b["size_bytes"] for b in raw_blobs)
total_events = sum(b["events"] for b in raw_blobs)
print("Loaded " + str(len(raw_blobs)) + " binary blobs to S3:")
for b in raw_blobs:
    print("  " + b["key"] + " (" + str(b["size_bytes"]) + " bytes, " + str(b["events"]) + " events)")
print("  Total: " + str(total_bytes) + " bytes (" + str(round(total_bytes / 1048576, 1)) + " MB), " + str(total_events) + " events")
print("  Zero preprocessing - raw binary stored as-is (immutable)")
print()
print("=== Step 2: Register external table in Snowflake ===")
print("-- Snowflake reads S3 directly via external stage (zero-copy)")
print("CREATE OR REPLACE STAGE cms_daq_stage")
print("  URL = 's3://cms-daq/2024/run3/'")
print("  STORAGE_INTEGRATION = s3_read_integration;")
print()
print("CREATE OR REPLACE EXTERNAL TABLE cms_raw_events (")
print("  event_id VARCHAR AS (value:event_id::VARCHAR),")
print("  bunch_crossing INT AS (value:bx::INT),")
print("  timestamp TIMESTAMP AS (value:ts::TIMESTAMP),")
print("  energy FLOAT AS (value:energy::FLOAT),")
print("  met FLOAT AS (value:met::FLOAT)")
print(")")
print("  WITH LOCATION = @cms_daq_stage")
print("  FILE_FORMAT = (TYPE = PARQUET)")
print("  AUTO_REFRESH = TRUE;")
print()
print("-- External table: zero-copy, no data duplication")
print("-- Snowflake reads S3 files on every query")
print()
print("=== Step 3: Transform IN the warehouse (SQL UDFs) ===")
print("-- Create a SQL UDF to parse raw binary fields")
print("CREATE OR REPLACE FUNCTION parse_cms_event(raw_bytes BINARY)")
print("  RETURNS TABLE (event_id BIGINT, bx INT, energy FLOAT)")
print("  LANGUAGE PYTHON RUNTIME_VERSION = '3.8'")
print("  HANDLER = 'parse_event'")
print("  AS $$")
print("import struct")
print("def parse_event(raw_bytes):")
print("    events = []")
print("    offset = 0")
print("    while offset + 32 <= len(raw_bytes):")
print("        eid, bx, ts, lb, plen, _ = struct.unpack_from(raw_bytes, offset)")
print("        energy = struct.unpack_from(raw_bytes, offset + 32)[0]")
print("        events.append((eid, bx, energy))")
print("        offset += 32 + plen")
print("    return events")
print("$$;")
print()
print("-- Query external table + UDF (in-warehouse transform)")
print("SELECT event_id, bunch_crossing, energy, met,")
print("  CASE WHEN energy > 50 AND met > 20 THEN 'physics' ELSE 'noise' END AS class")
print("FROM cms_raw_events")
print("WHERE energy > 50 AND met > 20")
print("LIMIT 100;")
print()
print("=== Step 4: Populate production analytics table ===")
print("CREATE OR REPLACE TABLE gold.physics_events AS")
print("SELECT event_id, bunch_crossing, timestamp, energy, met,")
print("  energy + met AS total_energy,")
print("  DATE_TRUNC('hour', timestamp) AS hour_bucket")
print("FROM cms_raw_events")
print("WHERE energy > 50 AND met > 20;")
print()
import random
random.seed(42)
selected = sum(1 for _ in range(total_events) if random.random() > 0.95)
print("=== Results ===")
print("  Raw blobs in S3: " + str(len(raw_blobs)) + " files, " + str(total_events) + " events")
print("  External table: zero-copy read from S3")
print("  After SQL transform: " + str(selected) + " events pass selection")
print("  Reduction: " + str(round(total_events / max(selected, 1), 1)) + "x")
print()
print("=== ELT vs ETL ===")
print("  ELT: Extract -> Load RAW to S3 -> Transform IN Snowflake")
print("  ETL: Extract -> Transform on ETL server -> Load to warehouse")
print("  ELT advantage: raw data preserved, warehouse compute elastic")
print("  ELT advantage: external tables = no data duplication")
print("  ELT advantage: SQL UDFs run distributed across warehouse nodes")
print("  ELT advantage: replayable (re-process raw data anytime)")
print("  Modern pattern: ELT + materialized views for hot tables")`,q=[{id:"python",step:"1",title:"Python — LHC data reduction pipeline",subtitle:"PySpark / Dask — zero-suppress + compress",accent:"oklch(0.55 0.16 30)",icon:(0,t.jsx)(y.Activity,{className:"h-4 w-4"}),language:"python",code:D,runnable:!0,mathExpr:"Raw 40 TB/s → zero-suppress (80% reduction) → compress (3x) → ~3.3 GB/s → 1 PB/yr",intent:"Simulate the full CMS data reduction pipeline: raw 1000-channel events → zero-suppression → zstd compression. Run in browser via Pyodide to see the actual data reduction ratios.",insight:"Python/PySpark is the analysis language for LHC physicists — used for skim production, histogram filling, and ML inference. The CMS Open Data Portal ships ~4 PB of real collision data in this format. The same pipeline runs at CERN's Tier-0 (T0_CH_CERN) computing center."},{id:"rust",step:"2",title:"Rust — zero-copy binary parser",subtitle:"memmap2 + SIMD — wire-speed parsing",accent:"oklch(0.55 0.16 250)",icon:(0,t.jsx)(g.Cpu,{className:"h-4 w-4"}),language:"rust",code:M,runnable:!1,pythonCode:z,mathExpr:"Throughput: ~80 GB/s per core (zero-copy mmap + AVX2 SIMD) · 32B header + N×4B channels per event",intent:"Parse CMS raw binary event format (RD5) at wire speed using memory-mapped I/O (zero-copy) and AVX2 SIMD for energy extraction. No allocation — all slices point into the mmap.",insight:"CERN's new DAQ (Data Acquisition) system for HL-LHC (2029+) is evaluating Rust for the high-throughput readout path. Current C++ code achieves ~40 GB/s per node; Rust with mmap + SIMD matches this with safer memory semantics. The zero-copy pattern is identical to what Apache Arrow uses for columnar IPC."},{id:"scala",step:"3",title:"Scala — Spark Structured Streaming",subtitle:"Kafka + Spark — real-time HLT aggregation",accent:"oklch(0.55 0.16 165)",icon:(0,t.jsx)(b.Database,{className:"h-4 w-4"}),language:"scala",code:I,runnable:!1,pythonCode:H,mathExpr:"Throughput: 100 kHz events → 10s windows → 1 row/window · watermark 30s · checkpoint to EOS",intent:"Process real-time CMS HLT events via Kafka + Spark Structured Streaming. Aggregate luminosity + trigger rates in 10-second windows with watermark-based late-event handling.",insight:"CMS and ATLAS use Apache Spark (Scala) for their physics analysis workflows (Spark-root). The Structured Streaming pipeline shown here is the same pattern used for online monitoring at the CMS control room — real-time dashboards showing trigger rates, luminosity, and data quality."},{id:"elixir",step:"4",title:"Elixir — GenStage event pipeline",subtitle:"Backpressure + Flow — 100 kHz event processing",accent:"oklch(0.55 0.16 320)",icon:(0,t.jsx)(h.Atom,{className:"h-4 w-4"}),language:"elixir",code:B,runnable:!1,pythonCode:G,mathExpr:"max_demand: 1000→500→100 (stages scale down) · backpressure automatic · 1 OTP process per stage",intent:"Build a concurrent event-processing pipeline with GenStage + Flow. Each stage (readout → filter → compress → store) runs as an OTP process with automatic backpressure — the pipeline never overflows.",insight:"Elixir/Erlang's GenStage is the only framework that handles backpressure natively (via demand signaling). CERN's DAQ team evaluated Erlang for DAQ control plane monitoring (not data path — that stays in C++) because of its fault tolerance and hot code-swapping. The pattern shown here mirrors how CMS DAQ handles rate fluctuations during beam intensity ramps."},{id:"etl",step:"5",title:"ETL (Data Warehouse) — Extract → Transform → Load",subtitle:"Classic ETL: source APIs → normalize/join/validate → warehouse",accent:"oklch(0.55 0.16 60)",icon:(0,t.jsx)(b.Database,{className:"h-4 w-4"}),language:"python",code:O,runnable:!0,mathExpr:"Extract (source APIs) → Transform (normalize, join, aggregate, validate) → Load (warehouse MERGE)",intent:"Classic ETL pipeline: extract from Shopify + Stripe, transform (currency normalization, referential join, customer aggregation, Great Expectations validation), load to Snowflake warehouse. This is the Fivetran pattern at business scale — same skeleton as the LHC pipeline but business domain.",insight:"ETL vs ELT: ETL transforms BEFORE loading (warehouse era — 2000s). ELT loads FIRST then transforms in the warehouse (modern — Snowflake/BigQuery). The LHC pipeline IS ETL (trigger+zero-suppress = transform, EOS = load). Same pattern, different domain (business vs physics), different scale (3.1B rows/month vs 40 TB/s)."},{id:"elt-lakehouse",step:"6",title:"ELT (Modern Lakehouse) — Extract → Load RAW → Transform IN warehouse",subtitle:"S3/GCS external tables → Snowflake SQL UDFs → analytics",accent:"oklch(0.55 0.16 200)",icon:(0,t.jsx)(b.Database,{className:"h-4 w-4"}),language:"python",code:F,runnable:!0,mathExpr:"Extract (DAQ) → Load (S3 immutable blobs) → Transform (warehouse SQL UDFs) → Materialized views",intent:"Modern ELT pattern: load raw binary directly to S3 (zero preprocessing), register as Snowflake external table (zero-copy, no data moved), transform via SQL UDFs running distributed across warehouse nodes. Same LHC data, different architecture than ETL.",insight:"ELT vs ETL: ELT loads RAW first, transforms IN the warehouse (Snowflake/BigQuery/Delta Lake). ETL transforms BEFORE loading. The LHC pipeline can be EITHER — current CMS is ETL (trigger+zero-suppress before storage), but HL-LHC is moving toward ELT (raw to S3 + in-warehouse transforms). Same physics data, different compute architecture."}];function V(){let[e,r]=(0,l.useState)(30),[a,s]=(0,l.useState)(20),[n,i]=(0,l.useState)(2),[o,c]=(0,l.useState)(!1),[p,u]=(0,l.useState)([]),[h,x]=(0,l.useState)(0),[f,g]=(0,l.useState)(0),b=(0,l.useRef)(0);(0,l.useEffect)(()=>{if(!o)return;let t=setInterval(()=>{let t={id:b.current++,nJets:Math.floor(8*Math.random())+1,leadingPt:20+80*Math.random(),met:60*Math.random()};u(e=>{let r=[...e,t];return r.length>200?r.slice(-200):r}),x(e=>e+1),t.nJets>=n&&t.leadingPt>e&&t.met>a&&g(e=>e+1)},25);return()=>clearInterval(t)},[o,n,e,a]);let j=o?p:(()=>{let e=[];for(let t=0;t<200;t++)e.push({id:t,nJets:Math.floor(8*Math.random())+1,leadingPt:20+80*Math.random(),met:60*Math.random()});return e})(),w=j.filter(t=>t.nJets>=n&&t.leadingPt>e&&t.met>a),_=o?h>0?f/h*100:0:w.length/j.length*100,S=_/100*4e4;return(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)(m.Button,{size:"sm",variant:o?"destructive":"default",onClick:()=>{o||(u([]),x(0),g(0),b.current=0),c(!o)},className:"w-full gap-1.5",children:o?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(y.Activity,{className:"h-3.5 w-3.5 animate-pulse"})," Stop live stream (40 Hz)"]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.Play,{className:"h-3.5 w-3.5"})," Start live stream (40 Hz)"]})}),(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsxs)("div",{className:"flex justify-between text-[11px]",children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"Leading jet pT threshold"}),(0,t.jsxs)("span",{className:"font-mono font-semibold text-primary",children:[e," GeV"]})]}),(0,t.jsx)("input",{type:"range",min:10,max:100,step:1,value:e,onChange:e=>r(+e.target.value),className:"w-full h-1.5 cursor-pointer appearance-none rounded-full bg-muted",style:{accentColor:"oklch(0.55 0.16 250)"}})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsxs)("div",{className:"flex justify-between text-[11px]",children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"Missing ET threshold"}),(0,t.jsxs)("span",{className:"font-mono font-semibold text-primary",children:[a," GeV"]})]}),(0,t.jsx)("input",{type:"range",min:0,max:60,step:1,value:a,onChange:e=>s(+e.target.value),className:"w-full h-1.5 cursor-pointer appearance-none rounded-full bg-muted",style:{accentColor:"oklch(0.55 0.16 250)"}})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsxs)("div",{className:"flex justify-between text-[11px]",children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"Min jet count"}),(0,t.jsxs)("span",{className:"font-mono font-semibold text-primary",children:[n," jets"]})]}),(0,t.jsx)("input",{type:"range",min:1,max:6,step:1,value:n,onChange:e=>i(+e.target.value),className:"w-full h-1.5 cursor-pointer appearance-none rounded-full bg-muted",style:{accentColor:"oklch(0.55 0.16 250)"}})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsxs)("p",{className:"font-mono text-sm text-primary",children:["40 MHz × ",_.toFixed(1),"% = ",S.toFixed(0)," Hz output"]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:o?`${f}/${h} events passed trigger (live)`:`${w.length}/${j.length} events pass trigger cuts`}),o&&(0,t.jsx)("p",{className:"text-[10px] text-emerald-600 mt-1",children:"● LIVE — streaming at 40 Hz (simulated CMS beam crossing rate)"})]})]}),(0,t.jsx)("div",{className:"rounded-md border border-border/60 bg-card p-3",children:(0,t.jsxs)("svg",{viewBox:"0 0 280 280",className:"w-full h-auto",children:[j.slice(-200).map((r,s)=>{let i=Math.floor(s/20),o=r.nJets>=n&&r.leadingPt>e&&r.met>a;return(0,t.jsx)(d.motion.circle,{cx:20+s%20*12,cy:20+12*i,r:"3",fill:o?"oklch(0.65 0.16 165)":"oklch(0.55 0.05 250 / 0.2)",animate:{fill:o?"oklch(0.65 0.16 165)":"oklch(0.55 0.05 250 / 0.2)"},transition:{duration:.2}},r.id)}),(0,t.jsx)("text",{x:"140",y:"270",textAnchor:"middle",fontSize:"8",fill:"oklch(0.55 0.05 250)",children:o?"live event stream (40 Hz)":"static events — click Start to stream"})]})})]})}function U(){let[e,r]=(0,l.useState)(null),[a,s]=(0,l.useState)(null);return(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(m.Button,{size:"sm",variant:"default",onClick:()=>{let e=performance.now(),t=new ArrayBuffer(560),a=new DataView(t),n=0;for(let e=0;e<10;e++){a.setBigUint64(n,BigInt(e+1),!0),n+=8,a.setUint32(n,2549*e%4096,!0),n+=4,a.setBigInt64(n,BigInt(Date.now()+25*e),!0),n+=8,a.setUint32(n,42+e,!0),n+=4,a.setUint32(n,24,!0),n+=4,a.setUint32(n,0,!0),n+=4;for(let t=0;t<3;t++)a.setUint32(n,t+3*e,!0),n+=4,a.setFloat32(n,50+(Math.random()-.5)*20,!0),n+=4}let i=[],o=0;for(;o+32<=t.byteLength;){let e=Number(a.getBigUint64(o,!0));o+=8;let t=a.getUint32(o,!0);o+=4;let r=Number(a.getBigInt64(o,!0));o+=8;let s=a.getUint32(o,!0);o+=4;let n=a.getUint32(o,!0);o+=8;let l=[];for(let e=0;e<n/8;e++){let e=a.getUint32(o,!0);o+=4;let t=a.getFloat32(o,!0);o+=4,l.push({ch:e,e:Math.round(10*t)/10})}i.push({eventId:e,bx:t,ts:r,lb:s,energies:l})}let l=performance.now()-e;r(i),s({bytesParsed:560,eventsParsed:i.length,parseTimeMs:Math.round(1e3*l)/1e3})},className:"gap-1.5",children:[(0,t.jsx)(w.default,{className:"h-3.5 w-3.5"})," Parse CMS RD5 binary (DataView)"]}),e&&(0,t.jsxs)(m.Button,{size:"sm",variant:"outline",onClick:()=>{r(null),s(null)},className:"gap-1.5",children:[(0,t.jsx)(j.RotateCcw,{className:"h-3.5 w-3.5"})," Clear"]})]}),!e&&(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-muted/20 p-3 text-xs text-muted-foreground",children:["Click “Parse CMS RD5 binary” to parse raw CMS event data using JavaScript ",(0,t.jsx)("code",{className:"font-mono",children:"DataView"}),"(the JS equivalent of Rust's ",(0,t.jsx)("code",{className:"font-mono",children:"memmap2 + struct.unpack"}),"). Allocates a raw ",(0,t.jsx)("code",{className:"font-mono",children:"ArrayBuffer"}),", writes binary event headers + channel energies, then parses them back using zero-copy ",(0,t.jsx)("code",{className:"font-mono",children:"DataView"})," reads — same logic as the Rust parser, but in the browser. In production, Rust+WASM would run ~1000x faster."]}),a&&(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2 text-[11px] text-emerald-700 dark:text-emerald-300",children:["Parsed ",a.bytesParsed," bytes (",a.eventsParsed," events) in ",a.parseTimeMs,"ms"," → ","throughput: ",a.bytesParsed>0?(a.bytesParsed/(a.parseTimeMs/1e3)/1e6).toFixed(1):"0"," MB/s"," (JS DataView equivalent of Rust zero-copy parser)"]}),e&&(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-3 space-y-2",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Parsed events (DataView zero-copy reads from ArrayBuffer)"}),e.map((e,r)=>(0,t.jsxs)("div",{className:"border-l-2 border-primary/30 pl-3 space-y-0.5",children:[(0,t.jsxs)("p",{className:"font-mono text-[11px] font-semibold text-primary",children:["Event #",e.eventId," | BX: ",e.bx," | Lumi block: ",e.lb]}),(0,t.jsxs)("p",{className:"font-mono text-[10px] text-muted-foreground",children:["Timestamp: ",e.ts," | Header: 32 bytes | Payload: 24 bytes"]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2 pl-2",children:e.energies.map((e,r)=>(0,t.jsxs)("span",{className:"font-mono text-[10px] bg-muted/40 px-1.5 py-0.5 rounded text-foreground/80",children:["ch",e.ch," = ",e.e," GeV"]},r))})]},r))]})]})}function W(){let[e,a]=(0,l.useState)(null),s=e?q.find(t=>t.id===e):null;return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-3 text-center",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Raw data rate"}),(0,t.jsx)("p",{className:"font-mono text-base font-bold text-primary",children:"40 TB/s"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"per detector (CMS/ATLAS)"})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-3 text-center",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Detector channels"}),(0,t.jsx)("p",{className:"font-mono text-base font-bold text-primary",children:"100M+"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"per experiment"})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-3 text-center",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"Annual storage"}),(0,t.jsx)("p",{className:"font-mono text-base font-bold text-primary",children:"1 PB/yr"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"after trigger + compression"})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-3 text-center",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground",children:"WLCG sites"}),(0,t.jsx)("p",{className:"font-mono text-base font-bold text-primary",children:"250+"}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"in 60+ countries"})]})]}),(0,t.jsx)(R,{}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsxs)("p",{className:"text-sm font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(w.default,{className:"h-4 w-4 text-primary"})," Data format: real binary vs synthetic"]}),(0,t.jsx)(P,{})]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5 flex-wrap",children:[(0,t.jsx)(x.Zap,{className:"h-3 w-3 text-amber-500"}),"Click any card to open a lazy popup with the full code example — Python is Pyodide-runnable (in browser), Rust/Scala/Elixir are syntax-highlighted.",(0,t.jsx)("span",{className:"text-[10px]",children:"Modal content only mounts on click."})]}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:q.map(e=>(0,t.jsx)(d.motion.button,{type:"button",onClick:()=>a(e.id),className:"relative rounded-xl overflow-hidden border border-border/60 hover:border-primary/60 hover:shadow-lg transition-all bg-gradient-to-br from-card to-muted/30 group",whileHover:{y:-4},whileTap:{scale:.98},"aria-label":`Open code: ${e.title}`,children:(0,t.jsxs)("div",{className:"p-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,t.jsx)("div",{className:"flex items-center justify-center w-8 h-8 rounded-lg shrink-0",style:{backgroundColor:e.accent+"20"},children:e.icon}),(0,t.jsx)(p.Badge,{variant:"outline",className:"text-[10px]",style:{color:e.accent},children:e.language.toUpperCase()})]}),(0,t.jsx)("p",{className:"text-xs font-semibold leading-tight",style:{color:e.accent},children:e.title}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1 font-mono",children:e.subtitle}),(0,t.jsx)("div",{className:"mt-2 flex items-center gap-1.5",children:e.runnable?(0,t.jsxs)(p.Badge,{className:"text-[9px] gap-0.5",children:[(0,t.jsx)(v.Play,{className:"h-2 w-2"})," Pyodide"]}):(0,t.jsx)(p.Badge,{variant:"secondary",className:"text-[9px]",children:"syntax only"})})]})},e.id))}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-4 space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(S.ExternalLink,{className:"h-4 w-4 text-amber-600"}),(0,t.jsx)("p",{className:"text-sm font-semibold text-amber-700 dark:text-amber-300",children:"CMS Open Data — 4 PB of real collision data at opendata.cern.ch"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-2",children:[(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"Years"}),(0,t.jsx)("p",{className:"font-mono font-bold",children:"2010-2012"})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-2",children:[(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"Total size"}),(0,t.jsx)("p",{className:"font-mono font-bold",children:"~4 PB"})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-2",children:[(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"Format"}),(0,t.jsx)("p",{className:"font-mono font-bold",children:"ROOT/AOD"})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-2",children:[(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground",children:"Events"}),(0,t.jsx)("p",{className:"font-mono font-bold",children:"~10 billion"})]})]}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("a",{href:"https://opendata.cern.ch",target:"_blank",rel:"noopener noreferrer",children:(0,t.jsxs)(m.Button,{size:"sm",variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(S.ExternalLink,{className:"h-3 w-3"})," Open opendata.cern.ch"]})}),(0,t.jsx)("a",{href:"https://opendata.cern.ch/record/8000",target:"_blank",rel:"noopener noreferrer",children:(0,t.jsxs)(m.Button,{size:"sm",variant:"ghost",className:"gap-1.5",children:[(0,t.jsx)(_.FileText,{className:"h-3 w-3"})," MiniAOD sample"]})})]}),(0,t.jsx)(E.PyodideRunner,{buttonLabel:"Run CMS Open Data analysis (Pyodide)",code:`import numpy as np

# CMS Open Data analysis simulation
# In production: use uproot to read ROOT files from opendata.cern.ch
# Here: simulate the AOD -> MiniAOD -> skim -> histogram pipeline

print("=== CMS Open Data Analysis Pipeline ===")
print()
print("Real pipeline (at CERN):")
print("  1. AOD (Analysis Object Data) — ~1 MB/event, full detector info")
print("  2. MiniAOD — ~50 kB/event, physics objects only (jets, muons, electrons)")
print("  3. NanoAOD — ~2 kB/event, flat ntuple for analysis")
print("  4. Skim — selected events only (e.g. H->bb candidates)")
print()

# Simulate event selection (Higgs -> bb analysis)
n_total = 100000  # 100k MiniAOD events
np.random.seed(42)

# Each event has: n_jets, jet_pt[], jet_eta[], missing_et
n_jets = np.random.poisson(5, n_total)  # ~5 jets per event on average
jet_pts = [np.random.exponential(40, n) for n in n_jets]  # pT ~ Exp(40 GeV)
missing_ets = np.random.exponential(20, n_total)  # MET ~ Exp(20 GeV)

# Selection: >= 2 jets with pT > 30 GeV, MET > 20 GeV
selected = 0
for i in range(n_total):
    if n_jets[i] >= 2:
        pts = sorted(jet_pts[i], reverse=True)
        if pts[0] > 30 and pts[1] > 30 and missing_ets[i] > 20:
            selected += 1

print(f"MiniAOD events: {n_total:,}")
print(f"After selection (>= 2 jets pT>30, MET>20): {selected:,} ({selected/n_total*100:.1f}%)")
print(f"Reduction: {n_total/selected:.1f}x")
print()
print("At full CMS scale:")
print(f"  10 billion MiniAOD events -> {int(10e9 * selected/n_total):,} selected")
print(f"  = {10e9 * selected/n_total * 50e3 / 1e15:.2f} PB of skimmed data")
print(f"  (from {10e9 * 50e3 / 1e15:.1f} PB MiniAOD)")
print()
print("=== Cross-references ===")
print("  NanoAOD format = Apache Arrow-compatible flat ntuples")
print("  uproot library = reads ROOT files without CERN ROOT framework")
print("  Dask-awkward = parallel NanoAOD analysis on WLCG grid")
print("  Same patterns as the platform's Bronze->Silver->Gold medallion!")


print()
print("=== Data reduction at each stage ===")
stages = [("AOD", 1000), ("MiniAOD", 50), ("NanoAOD", 2), ("Skim", 0.2)]
for i in range(len(stages)-1):
    name1, size1 = stages[i]
    name2, size2 = stages[i+1]
    ratio = size1 / size2
    print(f"  {name1} -> {name2}: {size1} kB -> {size2} kB ({ratio:.0f}x reduction)")`})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-4 space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(T.TrendingUp,{className:"h-4 w-4 text-primary"}),(0,t.jsx)("p",{className:"text-sm font-semibold text-primary",children:"HL-LHC (2029+) — 10x more data, new challenges"})]}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/40",children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{className:"text-left p-2 font-semibold",children:"Parameter"}),(0,t.jsx)("th",{className:"text-right p-2 font-semibold",children:"Run 2 (2015-18)"}),(0,t.jsx)("th",{className:"text-right p-2 font-semibold",children:"Run 3 (2022-26)"}),(0,t.jsx)("th",{className:"text-right p-2 font-semibold",children:"HL-LHC (2029+)"})]})}),(0,t.jsxs)("tbody",{className:"divide-y divide-border/40",children:[(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"p-2 font-medium",children:"Luminosity"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono",children:"150 fb⁻¹"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono",children:"300 fb⁻¹"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono text-primary font-bold",children:"3000 fb⁻¹"})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"p-2 font-medium",children:"Data stored"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono",children:"50 PB"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono",children:"100 PB"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono text-primary font-bold",children:"1000 PB (1 EB)"})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"p-2 font-medium",children:"Pileup (interactions/BX)"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono",children:"~40"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono",children:"~55"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono text-primary font-bold",children:"~200"})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"p-2 font-medium",children:"HLT technology"}),(0,t.jsx)("td",{className:"p-2 text-right",children:"CPU farm"}),(0,t.jsx)("td",{className:"p-2 text-right",children:"CPU + GPU"}),(0,t.jsx)("td",{className:"p-2 text-right text-primary font-bold",children:"GPU + AI trigger"})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"p-2 font-medium",children:"L1 Trigger"}),(0,t.jsx)("td",{className:"p-2 text-right",children:"FPGA, 3 us"}),(0,t.jsx)("td",{className:"p-2 text-right",children:"FPGA, 3 us"}),(0,t.jsx)("td",{className:"p-2 text-right text-primary font-bold",children:"FPGA + ML, 1 us"})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"p-2 font-medium",children:"WLCG sites"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono",children:"~250"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono",children:"~250"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono text-primary font-bold",children:"~300 (cloud)"})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:"p-2 font-medium",children:"Raw rate"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono",children:"40 TB/s"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono",children:"40 TB/s"}),(0,t.jsx)("td",{className:"p-2 text-right font-mono text-primary font-bold",children:"~80 TB/s"})]})]})]})}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:["HL-LHC will produce ",(0,t.jsx)("strong",{children:"10x more data"})," with ",(0,t.jsx)("strong",{children:"5x more pileup"})," (overlapping collisions per bunch crossing). The HLT will use ",(0,t.jsx)("strong",{children:"GPU acceleration"})," and ",(0,t.jsx)("strong",{children:"AI-assisted trigger"})," (Graph Neural Networks for pileup mitigation). This is why CERN is evaluating Rust for the new DAQ readout and investing in heterogeneous computing (CPU+GPU+FPGA)."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-muted/20 p-4",children:[(0,t.jsxs)("p",{className:"text-xs font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(k.Layers,{className:"h-3.5 w-3.5 text-primary"})," Cross-references — LHC ingestion connects to the entire platform"]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2 text-sm",children:[(0,t.jsx)(r.default,{href:(0,A.hrefFor)("streaming"),className:"text-primary hover:underline",children:"→ Streaming (Kafka + Flink for real-time event streams)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,A.hrefFor)("databricks"),className:"text-primary hover:underline",children:"→ Databricks (Spark for physics analysis & skim production)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsxs)(r.default,{href:(0,A.hrefFor)("quantum-computing"),className:"text-primary hover:underline",children:["→ Quantum Computing (LHC jet substructure τ",(0,t.jsx)("sub",{children:"N"}),")"]}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,A.hrefFor)("space-science"),className:"text-primary hover:underline",children:"→ Space Science (JWST/LIGO raw data ingestion at smaller scale)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,A.hrefFor)("orchestration"),className:"text-primary hover:underline",children:"→ Orchestration (Airflow DAGs for skim production)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,A.hrefFor)("arrow"),className:"text-primary hover:underline",children:"→ Arrow (NanoAOD = flat ntuples, Arrow-compatible)"})]}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-2",children:"The LHC ingestion pipeline uses the SAME patterns as the platform's commercial ELT (Fivetran): source → trigger/filter → zero-suppress → compress → store → distribute. The only difference is scale (40 TB/s vs 3.1 B rows/month) and domain (physics vs business)."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4 space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(N.Gauge,{className:"h-4 w-4 text-primary"}),(0,t.jsx)("p",{className:"text-sm font-semibold text-primary",children:"L1 Trigger simulator — 40 MHz → ~1 kHz"})]}),(0,t.jsx)(V,{})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4 space-y-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(w.default,{className:"h-4 w-4 text-primary"}),(0,t.jsx)("p",{className:"text-sm font-semibold text-primary",children:"Binary parser demo — parse CMS RD5 format in browser"})]}),(0,t.jsx)(U,{})]}),(0,t.jsx)(C,{open:!!s,onClose:()=>a(null),title:s?.title??"",subtitle:s?.subtitle,accent:s?.accent??"oklch(0.55 0.16 250)",icon:s?.icon??(0,t.jsx)(g.Cpu,{className:"h-4 w-4"}),children:s&&(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Math foundation"}),(0,t.jsx)("p",{className:"font-mono text-xs text-primary leading-relaxed",children:s.mathExpr})]}),(0,t.jsx)(n.CodeBlock,{language:s.language,filename:`lhc_${s.id}.${"rust"===s.language?"rs":"scala"===s.language?"scala":"elixir"===s.language?"ex":"py"}`,code:s.code}),s.runnable&&(0,t.jsxs)("div",{className:"mt-3 rounded-md border border-amber-500/40 bg-amber-500/5 p-3",children:[(0,t.jsxs)("p",{className:"text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-1",children:[(0,t.jsx)(f.Sparkles,{className:"h-3 w-3"})," Python code — run in browser (Pyodide)"]}),(0,t.jsx)(E.PyodideRunner,{buttonLabel:`Run ${s.language} code (Pyodide)`,code:s.code})]}),!s.runnable&&s.pythonCode&&(0,t.jsxs)("div",{className:"mt-3 rounded-md border border-amber-500/40 bg-amber-500/5 p-3",children:[(0,t.jsxs)("p",{className:"text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-1",children:[(0,t.jsx)(f.Sparkles,{className:"h-3 w-3"})," Python equivalent — run in browser (Pyodide)"]}),(0,t.jsx)(E.PyodideRunner,{buttonLabel:"Run Python equivalent (Pyodide)",code:s.pythonCode})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2",children:"Data format preview"}),(0,t.jsx)(P,{})]}),(0,t.jsx)(L,{intent:s.intent,math:s.mathExpr,insight:s.insight,accent:s.accent})]})})]})}var $=e.i(59938),Q=e.i(915505),K=e.i(828579),Y=e.i(640524),X=e.i(581418),Z=e.i(16715);function J({open:e,onClose:r,title:a,subtitle:s,accent:n,icon:i,children:o}){return(0,l.useEffect)(()=>{if(!e)return;let t=e=>{"Escape"===e.key&&r()};return window.addEventListener("keydown",t),document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",t),document.body.style.overflow=""}},[e,r]),(0,t.jsx)(c.AnimatePresence,{children:e&&(0,t.jsxs)(d.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 md:p-6 overflow-y-auto",onClick:r,children:[(0,t.jsx)("button",{type:"button",onClick:r,className:"absolute top-3 right-3 z-30 p-2 rounded-full bg-background/90 border border-border hover:bg-accent","aria-label":"Close",children:(0,t.jsx)(u.X,{className:"h-5 w-5"})}),(0,t.jsxs)("div",{className:"absolute top-3 left-3 z-30 px-3 py-1.5 rounded-full bg-background/90 border border-border flex items-center gap-2 text-xs font-semibold",children:[(0,t.jsx)("span",{style:{color:n},children:i}),(0,t.jsx)("span",{style:{color:n},children:a})]}),(0,t.jsxs)(d.motion.div,{initial:{scale:.95,opacity:0,y:20},animate:{scale:1,opacity:1,y:0},exit:{scale:.95,opacity:0,y:20},transition:{duration:.25},className:"relative w-full max-w-3xl my-8 rounded-xl border border-border bg-background shadow-2xl overflow-hidden",onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"border-b border-border/40 bg-muted/20 px-4 md:px-6 py-3 flex items-center gap-3",children:[(0,t.jsx)("div",{className:"flex items-center justify-center w-9 h-9 rounded-lg shrink-0",style:{backgroundColor:n+"20"},children:i}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-base font-bold leading-tight",style:{color:n},children:a}),s&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground font-mono",children:s})]})]}),(0,t.jsx)("div",{className:"p-4 md:p-6 max-h-[80vh] overflow-y-auto",children:o})]})]})})}let ee=["Bronze = append-only raw","Silver = conformed + deduped","Gold = business marts","SCD2: valid_from + valid_to","MERGE ON business_key","dbt test --select state:modified","Fivetran → S3 → Snowflake","Hightouch ← Snowflake → SF","ELT: load raw → transform in WH","ETL: transform → load clean","CDC: Debezium → Kafka → Bronze","schema drift → PR → review","Great Expectations: expect_column_to_exist","Airflow: backfill --from 2024-01-01","Parquet → Arrow → DuckDB","Delta Lake: time travel","Iceberg: snapshot isolation","reverse-ETL: Gold → CRM","CHANGELOG: type 1/2/3","data contract: avro + schema registry","Watermark: event_time + 30s","Checkpoint: /opt/airflow/dag_runs","upsert: merge_type=upsert","partition by date_trunc('day', ts)","VACUUM table RETAIN 168 HOURS"];function et(){let e=ee.map((e,t)=>({text:e,x:53*t%95,y:37*t%90,delay:1.7*t%14,duration:14+t%7,size:10+3*t%5}));return(0,t.jsxs)("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[(0,t.jsx)("style",{children:".ig-bg-float { position: absolute; font-family: ui-monospace, monospace; color: oklch(0.65 0.15 250 / 0.12); pointer-events: none; white-space: nowrap; font-size: 11px; animation: ig-bg-drift linear infinite; } @keyframes ig-bg-drift { from { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { transform: translateY(-180px); opacity: 0; } }"}),e.map((e,r)=>(0,t.jsx)("div",{className:"ig-bg-float",style:{left:`${e.x}%`,bottom:`${e.y-50}%`,animationDelay:`${e.delay}s`,animationDuration:`${e.duration}s`,fontSize:`${e.size}px`},children:e.text},r))]})}function er({value:e,onChange:r}){return(0,t.jsxs)("div",{className:"flex flex-wrap gap-1.5 items-center justify-center bg-muted/30 rounded-md p-1.5 border border-border/40",children:[(0,t.jsxs)("span",{className:"text-[10px] text-muted-foreground px-1 flex items-center gap-1",children:[(0,t.jsx)(k.Layers,{className:"h-3 w-3"})," Scope:"]}),[{d:3,l:"3D",h:"simplest"},{d:4,l:"4D",h:"standard"},{d:5,l:"5D",h:"full"},{d:99,l:"N-D",h:"extreme"}].map(a=>(0,t.jsx)("button",{type:"button",onClick:()=>r(a.d),className:`text-[10px] px-2 py-1 rounded transition-colors ${e===a.d?"bg-primary text-primary-foreground font-semibold":"hover:bg-accent text-foreground/70"}`,title:a.h,children:a.l},a.d))]})}let ea=[{id:"medallion",title:"Medallion architecture",subtitle:"Bronze → Silver → Gold",accent:"oklch(0.55 0.16 30)",icon:(0,t.jsx)(k.Layers,{className:"h-4 w-4"}),component:function({dim:e}){let r=3===e?1:4===e?2:5===e?3:4,a=["Bronze (raw)","Silver (conformed)","Gold (marts)","Platinum (ML features)"],s=["oklch(0.65 0.16 30)","oklch(0.65 0.16 165)","oklch(0.65 0.16 60)","oklch(0.65 0.16 320)"];return(0,t.jsxs)("svg",{viewBox:"0 0 360 280",className:"w-full h-auto",children:[[0,1,2,3].slice(0,r).map(e=>{let n=40+50*e,i=200+(3-e)*30;return(0,t.jsxs)(d.motion.g,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2*e},children:[(0,t.jsx)("rect",{x:(360-i)/2,y:n,width:i,height:"40",rx:"4",fill:s[e]+"30",stroke:s[e],strokeWidth:"1.5"}),(0,t.jsx)("text",{x:180,y:n+25,textAnchor:"middle",fontSize:"11",fill:s[e],fontWeight:"bold",children:a[e]}),e<r-1&&(0,t.jsx)("line",{x1:180,y1:n+40,x2:180,y2:n+50,stroke:s[e],strokeWidth:"1",markerEnd:"url(#ig-arrow)"})]},e)}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"ig-arrow",markerWidth:"6",markerHeight:"6",refX:"3",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"oklch(0.55 0.05 250)"})})}),(0,t.jsxs)("text",{x:"180",y:"265",textAnchor:"middle",fontSize:"9",fill:"oklch(0.55 0.05 250)",children:[r," layers — ",3===e?"Bronze only":4===e?"Bronze→Silver":5===e?"Bronze→Silver→Gold":"Full medallion + ML"]})]})},caption:"Bronze = append-only raw, Silver = conformed + deduped, Gold = business marts. The medallion pattern separates concerns: raw data is never modified, transforms are idempotent MERGE operations."},{id:"kafka",title:"Kafka streaming",subtitle:"Producer → Topics → Consumer",accent:"oklch(0.55 0.16 250)",icon:(0,t.jsx)(y.Activity,{className:"h-4 w-4"}),component:function({dim:e}){let[r,a]=(0,l.useState)(0);(0,l.useEffect)(()=>{let e=setInterval(()=>a(e=>(e+.1)%(2*Math.PI)),50);return()=>clearInterval(e)},[]);let s=3===e?1:4===e?2:5===e?3:5;return(0,t.jsxs)("svg",{viewBox:"0 0 360 280",className:"w-full h-auto",children:[(0,t.jsx)("rect",{x:"20",y:"120",width:"60",height:"40",rx:"4",fill:"oklch(0.65 0.16 250 / 0.3)",stroke:"oklch(0.65 0.16 250)",strokeWidth:"1.5"}),(0,t.jsx)("text",{x:"50",y:"145",textAnchor:"middle",fontSize:"9",fill:"oklch(0.65 0.16 250)",fontWeight:"bold",children:"Producer"}),Array.from({length:s}).map((e,a)=>{let s=120+45*a;return(0,t.jsxs)(d.motion.g,{children:[(0,t.jsx)("rect",{x:s,y:"100",width:"35",height:"80",rx:"3",fill:"oklch(0.65 0.16 165 / 0.2)",stroke:"oklch(0.65 0.16 165)",strokeWidth:"1"}),(0,t.jsxs)("text",{x:s+17.5,y:"95",textAnchor:"middle",fontSize:"7",fill:"oklch(0.65 0.16 165)",children:["T",a]}),(0,t.jsx)("line",{x1:"80",y1:"140",x2:s,y2:"140",stroke:"oklch(0.55 0.05 250 / 0.4)",strokeWidth:"0.8"}),(0,t.jsx)(d.motion.circle,{cx:80+r/(2*Math.PI)*(s-80),cy:"140",r:"2",fill:"oklch(0.75 0.16 250)",animate:{cx:[80,s]},transition:{duration:2,repeat:1/0,delay:.3*a}})]},a)}),(0,t.jsx)("rect",{x:"290",y:"120",width:"60",height:"40",rx:"4",fill:"oklch(0.65 0.16 60 / 0.3)",stroke:"oklch(0.65 0.16 60)",strokeWidth:"1.5"}),(0,t.jsx)("text",{x:"320",y:"145",textAnchor:"middle",fontSize:"9",fill:"oklch(0.65 0.16 60)",fontWeight:"bold",children:"Consumer"}),(0,t.jsxs)("text",{x:"180",y:"265",textAnchor:"middle",fontSize:"9",fill:"oklch(0.55 0.05 250)",children:[s," Kafka topic",s>1?"s":""," — ",3===e?"single topic":4===e?"2 topics":5===e?"3 topics":"5 topics (full)"]})]})},caption:"Kafka is the nervous system: producers write events to topics, consumers read at their own pace. Topics are partitioned for parallelism, replicated for durability. 7T msgs/day at LinkedIn scale."},{id:"airflow",title:"Airflow DAG",subtitle:"Task dependencies + retries",accent:"oklch(0.55 0.16 165)",icon:(0,t.jsx)(g.Cpu,{className:"h-4 w-4"}),component:function({dim:e}){let r=3===e?3:4===e?5:5===e?7:10,[a,s]=(0,l.useState)(0);return(0,l.useEffect)(()=>{let e=setInterval(()=>s(e=>(e+1)%r),800);return()=>clearInterval(e)},[r]),(0,t.jsxs)("svg",{viewBox:"0 0 360 280",className:"w-full h-auto",children:[Array.from({length:r}).map((e,s)=>{let n=Math.floor(s/4),i=s%4,o=60+70*i,l=60+60*n,c=s===a;return(0,t.jsxs)(d.motion.g,{animate:{opacity:c?1:.4},children:[(0,t.jsx)("rect",{x:o,y:l,width:"50",height:"30",rx:"3",fill:c?"oklch(0.65 0.16 165 / 0.4)":"oklch(0.55 0.05 250 / 0.1)",stroke:c?"oklch(0.75 0.16 165)":"oklch(0.55 0.05 250)",strokeWidth:c?1.5:.8}),(0,t.jsxs)("text",{x:o+25,y:l+20,textAnchor:"middle",fontSize:"8",fill:c?"oklch(0.85 0.16 165)":"oklch(0.55 0.05 250)",fontWeight:"bold",children:["T",s]}),i<3&&s+1<r&&(0,t.jsx)("line",{x1:o+50,y1:l+15,x2:o+70,y2:l+15,stroke:"oklch(0.55 0.05 250 / 0.3)",strokeWidth:"0.8"})]},s)}),(0,t.jsxs)("text",{x:"180",y:"265",textAnchor:"middle",fontSize:"9",fill:"oklch(0.55 0.05 250)",children:[r," tasks in DAG — ",3===e?"minimal":4===e?"Bronze→Silver":5===e?"Bronze→Gold":"full pipeline"]})]})},caption:"DAGs model pipeline dependencies: Task A → Task B → Task C. Airflow handles retries, SLAs, backfilling. 3,000+ DAGs at Airbnb."},{id:"snowflake",title:"Snowflake external tables",subtitle:"S3 → external table → views",accent:"oklch(0.55 0.16 60)",icon:(0,t.jsx)(b.Database,{className:"h-4 w-4"}),component:function({dim:e}){let r=3===e?1:4===e?2:5===e?3:4;return(0,t.jsxs)("svg",{viewBox:"0 0 360 280",className:"w-full h-auto",children:[(0,t.jsx)("rect",{x:"30",y:"120",width:"80",height:"40",rx:"4",fill:"oklch(0.65 0.16 60 / 0.3)",stroke:"oklch(0.65 0.16 60)",strokeWidth:"1.5"}),(0,t.jsx)("text",{x:"70",y:"145",textAnchor:"middle",fontSize:"9",fill:"oklch(0.65 0.16 60)",fontWeight:"bold",children:"S3 Bucket"}),Array.from({length:r}).map((e,r)=>{let a=160+55*r;return(0,t.jsxs)(d.motion.g,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2*r},children:[(0,t.jsx)("rect",{x:a,y:60+30*r,width:"80",height:"40",rx:"4",fill:"oklch(0.65 0.16 250 / 0.2)",stroke:"oklch(0.65 0.16 250)",strokeWidth:"1"}),(0,t.jsx)("text",{x:a+40,y:85+30*r,textAnchor:"middle",fontSize:"7",fill:"oklch(0.65 0.16 250)",children:"Layer "+(r+1)}),(0,t.jsx)("line",{x1:"110",y1:"140",x2:a,y2:80+30*r,stroke:"oklch(0.55 0.05 250 / 0.3)",strokeWidth:"0.8",strokeDasharray:"2 1"})]},r)}),(0,t.jsxs)("text",{x:"180",y:"265",textAnchor:"middle",fontSize:"9",fill:"oklch(0.55 0.05 250)",children:[r," warehouse layer",r>1?"s":""," — external table + ",3===e?"1 view":4===e?"2 views":5===e?"3 views":"full analytics stack"]})]})},caption:"ELT pattern: load raw to S3, register as external table in Snowflake (zero-copy), transform via SQL views. No data duplication — warehouse reads S3 directly."}],es={scd2:`print("=== SCD2 (Slowly Changing Dimension Type 2) ===")
print()
print("Problem: customer changes their address.")
print("  Type 1: overwrite (lose history)")
print("  Type 2: insert new row, keep old (preserve history)")
print("  Type 3: add new column (limited history)")
print()

# Simulate SCD2 merge
customers = [
    {"business_key": "C001", "name": "Alice", "city": "London", "valid_from": "2024-01-01", "valid_to": None, "is_current": True},
]

new_record = {"business_key": "C001", "name": "Alice", "city": "Paris", "valid_from": "2024-06-01"}

print("Before merge:")
for c in customers:
    print("  " + str(c))

# SCD2 merge logic
for c in customers:
    if c["business_key"] == new_record["business_key"] and c["is_current"]:
        c["valid_to"] = new_record["valid_from"]
        c["is_current"] = False

new_record["valid_to"] = None
new_record["is_current"] = True
customers.append(new_record)

print()
print("After SCD2 merge:")
for c in customers:
    status = "CURRENT" if c["is_current"] else "HISTORICAL"
    print("  " + c["name"] + " | " + c["city"] + " | " + c["valid_from"] + " to " + str(c["valid_to"]) + " | " + status)`,drift:`import json

print("=== Schema Drift Handling ===")
print()

# Simulate Fivetran detecting a new column
old_schema = {"id": "INT", "email": "VARCHAR", "amount": "DECIMAL"}
new_schema = {"id": "INT", "email": "VARCHAR", "amount": "DECIMAL", "phone": "VARCHAR", "tier": "VARCHAR"}

added = set(new_schema.keys()) - set(old_schema.keys())
removed = set(old_schema.keys()) - set(new_schema.keys())
changed_types = {k for k in (set(old_schema.keys()) & set(new_schema.keys())) if old_schema[k] != new_schema[k]}

print("Old schema: " + str(old_schema))
print("New schema: " + str(new_schema))
print()
print("Added columns: " + str(added) if added else "Added columns: none")
print("Removed columns: " + str(removed) if removed else "Removed columns: none")
print("Type changes: " + str(changed_types) if changed_types else "Type changes: none")
print()
print("Auto-response (Fivetran + dbt):")
print("  1. Fivetran auto-adds new columns to Bronze (append-only)")
print("  2. Schema registry PR auto-created for review")
print("  3. Great Expectations runs on new column")
print("  4. PR approved by data_platform owner (CODEOWNERS)")
print("  5. Silver/Gold schemas updated in next dbt run")
print("  6. Old columns retained with __deprecated suffix for 90 days")`,retl:`print("=== Reverse-ETL (Hightouch pattern) ===")
print()
print("Standard ETL: source -> warehouse")
print("Reverse-ETL:   warehouse -> destination (CRM, ads, email)")
print()

# Simulate reverse-ETL sync
gold_table = [
    {"customer_id": 1, "email": "alice@example.com", "ltv": 1250, "segment": "VIP"},
    {"customer_id": 2, "email": "bob@example.com", "ltv": 350, "segment": "Standard"},
    {"customer_id": 3, "email": "carol@example.com", "ltv": 890, "segment": "Gold"},
]

# Hightouch audience: VIP customers with LTV > 1000
audience = [c for c in gold_table if c["segment"] == "VIP" and c["ltv"] > 1000]

print("Gold table (warehouse):")
for c in gold_table:
    print("  " + c["email"] + " | LTV=" + str(c["ltv"]) + " | " + c["segment"])
print()
print("Hightouch audience (VIP + LTV>1000):")
for c in audience:
    print("  " + c["email"] + " -> synced to Salesforce + Klaviyo")
print()
print("Sync destinations:")
print("  Salesforce: update Account.tier = 'VIP'")
print("  Klaviyo: add to 'VIP Customers' list")
print("  Meta: create Custom Audience for VIP lookalike")
print("  Slack: #vip-alerts notification")`,elt:`print("=== ELT vs ETL Comparison ===")
print()
print("ETL (Extract-Transform-Load):")
print("  1. Extract: read from source API")
print("  2. Transform: clean, join, validate on ETL server")
print("  3. Load: write clean data to warehouse")
print("  Data in WH: clean, ready for analytics")
print("  Advantage: warehouse stays clean")
print("  Disadvantage: ETL server is a bottleneck + cost")
print()
print("ELT (Extract-Load-Transform):")
print("  1. Extract: read from source API")
print("  2. Load: write RAW to object storage (S3/GCS)")
print("  3. Transform: SQL/UDFs IN the warehouse")
print("  Data in WH: raw + external tables + views")
print("  Advantage: elastic warehouse compute, raw preserved")
print("  Disadvantage: storage cost (but S3 is $23/TB/month)")
print()
print("Modern pattern: ELT + materialized views")
print("  - Raw data in S3 (cheap, immutable)")
print("  - External tables in Snowflake (zero-copy)")
print("  - Materialized views for hot queries (pre-computed)")
print("  - Best of both: raw + fast")`},en=[{id:"scd2",step:"1",title:"SCD2 — preserving history",subtitle:"valid_from + valid_to + is_current",accent:"oklch(0.55 0.16 30)"},{id:"drift",step:"2",title:"Schema drift handling",subtitle:"Fivetran auto-detect → PR → review",accent:"oklch(0.55 0.16 250)"},{id:"retl",step:"3",title:"Reverse-ETL (Hightouch)",subtitle:"warehouse → CRM/ads/email",accent:"oklch(0.55 0.16 165)"},{id:"elt",step:"4",title:"ELT vs ETL comparison",subtitle:"load raw → transform in WH",accent:"oklch(0.55 0.16 60)"}],ei=[{id:"throughput",title:"Throughput calculator",subtitle:"sources × rows/sec → TB/month",accent:"oklch(0.55 0.16 250)",icon:(0,t.jsx)(y.Activity,{className:"h-4 w-4"}),component:function(){let[e,r]=(0,l.useState)(14),[a,s]=(0,l.useState)(1e4),n=e*a,i=86400*n*30,o=500*i/1e12;return(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsxs)("div",{className:"flex justify-between text-[11px]",children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"Source systems"}),(0,t.jsx)("span",{className:"font-mono text-primary",children:e})]}),(0,t.jsx)("input",{type:"range",min:1,max:50,step:1,value:e,onChange:e=>r(+e.target.value),className:"w-full h-1.5 cursor-pointer appearance-none rounded-full bg-muted",style:{accentColor:"oklch(0.55 0.16 250)"}})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsxs)("div",{className:"flex justify-between text-[11px]",children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"Rows/sec per source"}),(0,t.jsx)("span",{className:"font-mono text-primary",children:a.toLocaleString()})]}),(0,t.jsx)("input",{type:"range",min:100,max:1e5,step:100,value:a,onChange:e=>s(+e.target.value),className:"w-full h-1.5 cursor-pointer appearance-none rounded-full bg-muted",style:{accentColor:"oklch(0.55 0.16 250)"}})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsxs)("p",{className:"font-mono text-sm text-primary",children:[n.toLocaleString()," rows/sec total"]}),(0,t.jsxs)("p",{className:"font-mono text-xs text-muted-foreground mt-1",children:[i.toLocaleString()," rows/month"]}),(0,t.jsxs)("p",{className:"font-mono text-xs text-muted-foreground",children:[o.toFixed(1)," TB/month (at ~500 B/row)"]})]})]})}},{id:"latency",title:"Latency calculator",subtitle:"batch size vs streaming",accent:"oklch(0.55 0.16 165)",icon:(0,t.jsx)(x.Zap,{className:"h-4 w-4"}),component:function(){let[e,r]=(0,l.useState)(1e3),[a,s]=(0,l.useState)(500),n=e+a;return(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsxs)("div",{className:"flex justify-between text-[11px]",children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"Batch size (rows)"}),(0,t.jsx)("span",{className:"font-mono text-primary",children:e})]}),(0,t.jsx)("input",{type:"range",min:100,max:1e4,step:100,value:e,onChange:e=>r(+e.target.value),className:"w-full h-1.5 cursor-pointer appearance-none rounded-full bg-muted",style:{accentColor:"oklch(0.55 0.16 165)"}})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsxs)("div",{className:"flex justify-between text-[11px]",children:[(0,t.jsx)("span",{className:"text-muted-foreground",children:"Processing time (ms)"}),(0,t.jsxs)("span",{className:"font-mono text-primary",children:[a," ms"]})]}),(0,t.jsx)("input",{type:"range",min:10,max:5e3,step:10,value:a,onChange:e=>s(+e.target.value),className:"w-full h-1.5 cursor-pointer appearance-none rounded-full bg-muted",style:{accentColor:"oklch(0.55 0.16 165)"}})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsxs)("p",{className:"font-mono text-sm text-primary",children:["End-to-end latency: ",n," ms (",(n/1e3).toFixed(2),"s)"]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground mt-1",children:["Batch: ",e," rows in ",a,"ms = ",(e/(a/1e3)).toFixed(0)," rows/sec"]}),(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground",children:["Streaming: ~",Math.round(a/2),"ms (if micro-batch=1)"]})]})]})}}];function eo(){let e,[r,a]=(0,l.useState)(3),[s,i]=(0,l.useState)(null),[o,c]=(0,l.useState)(null),[m,u]=(0,l.useState)(null),h=s?ea.find(e=>e.id===s):null,g=o?en.find(e=>e.id===o):null,y=m?ei.find(e=>e.id===m):null;return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"text-sm font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(f.Sparkles,{className:"h-4 w-4 text-primary"})," Layer 1: 3D concept gallery — click to expand (lazy popup)"]}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:ea.map(e=>{let a=e.component;return(0,t.jsxs)(d.motion.button,{type:"button",onClick:()=>i(e.id),className:"relative rounded-xl overflow-hidden border border-border/60 hover:border-primary/60 hover:shadow-lg transition-all bg-gradient-to-br from-card to-muted/30 group",whileHover:{y:-4},whileTap:{scale:.98},"aria-label":`Open: ${e.title}`,children:[(0,t.jsxs)("div",{className:"relative w-full bg-gradient-to-br from-muted/40 to-card",style:{aspectRatio:"9 / 12",maxHeight:200},children:[(0,t.jsx)("div",{className:"absolute inset-0 p-2",children:(0,t.jsx)(a,{dim:r})}),(0,t.jsx)("div",{className:"absolute top-2 left-2 z-10",children:(0,t.jsxs)(p.Badge,{variant:"secondary",className:"text-[10px] h-5 px-1.5",style:{backgroundColor:e.accent+"20",color:e.accent},children:[e.icon," 3D"]})})]}),(0,t.jsxs)("div",{className:"p-2 border-t border-border/40",children:[(0,t.jsx)("p",{className:"text-xs font-semibold",style:{color:e.accent},children:e.title}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground font-mono",children:e.subtitle})]})]},e.id)})}),(0,t.jsx)("div",{className:"mt-2",children:(0,t.jsx)(er,{value:r,onChange:a})})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"text-sm font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(f.Sparkles,{className:"h-4 w-4 text-primary"})," Layer 2: Concept shorts — Pyodide-runnable code + recent patterns"]}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:en.map(e=>(0,t.jsx)(d.motion.button,{type:"button",onClick:()=>c(e.id),className:"relative rounded-xl overflow-hidden border border-border/60 hover:border-primary/60 hover:shadow-lg transition-all bg-gradient-to-br from-card to-muted/30 group",whileHover:{y:-4},whileTap:{scale:.98},"aria-label":`Open: ${e.title}`,children:(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsxs)(p.Badge,{variant:"secondary",className:"text-[10px] mb-1",style:{backgroundColor:e.accent+"20",color:e.accent},children:["SHORT ",e.step]}),(0,t.jsx)("p",{className:"text-xs font-semibold",style:{color:e.accent},children:e.title}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground font-mono mt-0.5",children:e.subtitle}),(0,t.jsxs)(p.Badge,{className:"text-[9px] mt-1 gap-0.5",children:[(0,t.jsx)(v.Play,{className:"h-2 w-2"})," Pyodide"]})]})},e.id))})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"text-sm font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(f.Sparkles,{className:"h-4 w-4 text-primary"})," Layer 3: Interactive visuals — sliders + live calculation"]}),(0,t.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:ei.map(e=>{let r=e.component;return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsxs)("p",{className:"text-sm font-semibold mb-2 flex items-center gap-1.5",style:{color:e.accent},children:[e.icon," ",e.title]}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground font-mono mb-3",children:e.subtitle}),(0,t.jsx)(r,{})]},e.id)})})]}),(0,t.jsx)(J,{open:!!h,onClose:()=>i(null),title:h?.title??"",subtitle:h?.subtitle,accent:h?.accent??"oklch(0.55 0.16 250)",icon:h?.icon??(0,t.jsx)(k.Layers,{className:"h-4 w-4"}),children:h&&(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"relative bg-gradient-to-br from-background to-muted/30 p-4 rounded-lg overflow-hidden",children:[(0,t.jsx)(et,{}),(0,t.jsx)("div",{className:"relative z-10",children:(0,t.jsx)(h.component,{dim:r})})]}),(0,t.jsx)(er,{value:r,onChange:a}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:h.caption})]})}),(0,t.jsx)(J,{open:!!g,onClose:()=>c(null),title:g?.title??"",subtitle:g?.subtitle,accent:g?.accent??"oklch(0.55 0.16 250)",icon:(0,t.jsx)(f.Sparkles,{className:"h-4 w-4"}),children:g&&(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)(n.CodeBlock,{language:"python",filename:`${g.id}.py`,code:es[g.id]}),(0,t.jsx)(E.PyodideRunner,{buttonLabel:"Run code (Pyodide)",code:es[g.id]})]})}),(0,t.jsx)(J,{open:!!y,onClose:()=>u(null),title:y?.title??"",subtitle:y?.subtitle,accent:y?.accent??"oklch(0.55 0.16 250)",icon:y?.icon??(0,t.jsx)(x.Zap,{className:"h-4 w-4"}),children:y&&(e=y.component,(0,t.jsx)(e,{}))})]})}var el=e.i(332017);let ed=`# ============================================================
# Programmatic source onboarding via Fivetran REST API
# Triggered by Airflow when a new source appears in the catalog
# ============================================================
import requests, os

FIVETRAN_API = "https://api.fivetran.com/v1"
HEADERS = {"Authorization": f"Bearer {os.environ['FIVETRAN_API_KEY']}"}
GROUP_ID   = "moderndatascieng_bronze"

def create_connector(system: str, service: str, config: dict) -> str:
    """Create a Fivetran connector inside the Bronze group."""
    payload = {
        "group_id": GROUP_ID,
        "service": service,                    # 'shopify', 'salesforce', ...
        "trust_certificates": True,
        "run_setup_tests": True,
        "config": config,
    }
    r = requests.post(f"{FIVETRAN_API}/connectors", json=payload, headers=HEADERS)
    r.raise_for_status()
    connector_id = r.json()["data"]["id"]
    # Sync frequency: 15min for transactional, 1hr for marketing, 6hr for ERP
    sync_freq = {"transactional": 15, "marketing": 60, "erp": 360}[service]
    requests.patch(
        f"{FIVETRAN_API}/connectors/{connector_id}",
        json={"sync_frequency": sync_freq, "schedule_type": "automated"},
        headers=HEADERS,
    )
    return connector_id

# Example: new Shopify Plus store onboarded in minutes
shopify_cfg = {
    "domain": "moderndatascieng-eu.myshopify.com",
    "api_key": "{REDACTED}",
    "sync_mode": "Incremental via Shopify webhook",
}
connector = create_connector("Shopify Plus EU", "shopify", shopify_cfg)
print(f"Bronze connector live: {connector}")
`,ec=`-- ============================================================
-- Hightouch SQL model — VIP audience (top 5% by LTV)
-- Executed on Snowflake WH_GOLD_SERVING every hour
-- Sync target: Salesforce CRM (Account team outreach)
-- ============================================================
WITH customer_ltv AS (
  SELECT
    c.customer_sk,
    c.customer_id,
    c.full_name,
    c.customer_email_hash,
    c.region_code,
    c.loyalty_tier,
    SUM(o.order_net_amount_gbp) AS ltv_gbp,
    COUNT(DISTINCT o.order_id)   AS orders_12m
  FROM ANALYTICS.GOLD.DIM_CUSTOMER   c
  JOIN ANALYTICS.GOLD.FCT_ORDERS_SERVING o
    ON o.customer_sk = c.customer_sk
  WHERE o.order_ts >= DATEADD('month', -12, CURRENT_TIMESTAMP())
    AND o.is_deleted = FALSE
    AND c.is_active  = TRUE
  GROUP BY 1,2,3,4,5,6
),

ranked AS (
  SELECT
    *,
    PERCENT_RANK() OVER (ORDER BY ltv_gbp DESC) AS ltv_pct
  FROM customer_ltv
)

SELECT
  customer_id   AS salesforce_account_id,
  full_name     AS vip_label,
  customer_email_hash AS email_hash,
  ltv_gbp       AS vip_lifetime_value_gbp,
  orders_12m    AS vip_orders_12m,
  loyalty_tier  AS vip_loyalty_tier
FROM ranked
WHERE ltv_pct <= 0.05            -- top 5% by LTV
  AND ltv_gbp  >= 1000           -- minimum threshold
  AND region_code IN ('UK','EU','NA')   -- RLS context-aware
`,ep=`# hightouch-sync.yml — declarative sync definition
sync:
  name: vip_loyalty_top_5_percent
  description: Hourly sync to Salesforce for account team outreach
  source:
    model: vip_loyalty_top_5_percent
    warehouse: WH_GOLD_SERVING
    database: MODERNDATASCIENG_PROD
    schema: GOLD
  destination:
    type: salesforce
    object: Account
    upsert_key: salesforce_account_id
    mapping:
      - source: vip_label
        target: Name
      - source: vip_lifetime_value_gbp
        target: VIP_LTV_GBP__c
      - source: vip_loyalty_tier
        target: Loyalty_Tier__c
  schedule:
    type: hourly
    cron: "0 * * * *"
    tz: Europe/London
  notifications:
    on_failure: pagerduty:data-platform
    on_success: slack:#data-platform
  governance:
    pii_columns: [customer_email_hash]
    masking: hash
    audit_log: true
    owner: data_platform
`;function em(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(a.PageHeader,{eyebrow:"Ingestion & activation",title:"Fivetran (ELT) + Hightouch (reverse-ETL)",description:"Fivetran ingests 14 source systems (3.1B rows / month) into Bronze with schema-on-read CDC. Hightouch pushes governed audiences back into Salesforce, Klaviyo, Meta Ads and HubSpot — every audience is a SQL model on Snowflake, versioned in Git, PII-tagged and audit-logged.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(y.Activity,{className:"h-3 w-3"})," 14 sources"]}),(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(Z.RefreshCw,{className:"h-3 w-3"})," 5 audiences"]})]})}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:[(0,t.jsx)(a.KpiCard,{label:"Source systems",value:"14",delta:"onboarded in 6 months",deltaTone:"up",hint:"ELT"}),(0,t.jsx)(a.KpiCard,{label:"Rows / month",value:"3.1B",delta:"+22% YoY",deltaTone:"up",hint:"Bronze ingest"}),(0,t.jsx)(a.KpiCard,{label:"Median freshness",value:"9 min",delta:"−37% vs FY24",deltaTone:"up",hint:"Bronze→Gold SLA"}),(0,t.jsx)(a.KpiCard,{label:"Reverse-ETL audiences",value:"5",delta:"+3 in pipeline",deltaTone:"up",hint:"Activated segments"})]}),(0,t.jsx)(a.SectionCard,{title:"Fivetran — source connectors",description:"Every source is provisioned via Terraform / API. Schema drift auto-PRs to a schema registry repo. Bronze is append-only, schema-on-read.",icon:(0,t.jsx)(K.Boxes,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"overflow-x-auto max-h-96 overflow-y-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{className:"sticky top-0 bg-muted/60 backdrop-blur",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Source"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Type"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Volume / mo"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Method"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Freshness"})]})}),(0,t.jsx)("tbody",{children:o.SOURCE_SYSTEMS.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/30",children:[(0,t.jsx)("td",{className:"px-4 py-2.5 font-medium",children:e.name}),(0,t.jsx)("td",{className:"px-4 py-2.5 text-muted-foreground",children:e.type}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs tabular-nums",children:e.records}),(0,t.jsx)("td",{className:"px-4 py-2.5",children:(0,t.jsx)(p.Badge,{variant:"outline",className:"text-[10px]",children:e.method})}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs",children:e.freshness})]},e.name))})]})})}),(0,t.jsxs)(a.SectionCard,{title:"Ingestion cards — 3 sibling patterns",description:"Each card follows the BigDataCard pattern: explainer + optional interactive demo + 'Show code ↓' toggle. Code is collapsed by default to reduce visual overwhelm.",icon:(0,t.jsx)(k.Layers,{className:"h-5 w-5"}),contentClassName:"p-4 md:p-5 space-y-4",children:[(0,t.jsx)(i.CodeCard,{title:"1. Fivetran API — programmatic source onboarding",description:"New sources are onboarded in minutes via Terraform + Fivetran REST API, with sync frequency set per source class (transactional 15min, marketing 1hr, ERP 6hr).",icon:(0,t.jsx)(Q.ArrowLeftRight,{className:"h-5 w-5"}),badge:"Python",code:ed,language:"python",filename:"fivetran_onboard.py",highlight:[14,15,16,17,18,19,20,21,26,27,28,29,30],defaultCollapsed:!0,explainer:`Fivetran's REST API allows programmatic source onboarding. The create_connector() function POSTs a payload with group_id, service name (e.g. 'shopify'), and config (domain, API key). After creation, a PATCH sets the sync frequency based on the source class — transactional sources sync every 15 min, marketing every 1 hr, ERP every 6 hr. This means new sources can be onboarded in minutes via a Terraform module, without manual UI clicks. The schema drift auto-PR workflow ensures Bronze schema changes are reviewed before they hit Silver/Gold.`}),(0,t.jsx)(i.CodeCard,{title:"2. Hightouch — VIP audience SQL model",description:"Audiences are SQL models in Snowflake, version-controlled in Git. Every sync upserts by a stable business key (e.g. salesforce_account_id). PII is auto-masked.",icon:(0,t.jsx)(b.Database,{className:"h-5 w-5"}),badge:"SQL",code:ec,language:"sql",filename:"vip_loyalty.sql",highlight:[18,19,20,21,22,23,24,25,31,38,39,40,41,42,43],defaultCollapsed:!0,explainer:`This SQL model defines the VIP audience: customers in the top 5% by LTV (lifetime value), with ≥\xa31,000 LTV and ≥1 order in the last 12 months. The PERCENT_RANK() window function computes the LTV percentile, and the WHERE clause filters to the top 5%. The result is upserted into Salesforce via Hightouch, using salesforce_account_id as the upsert key. PII columns (customer_email_hash) are auto-masked by the governance layer before sync.`}),(0,t.jsx)(i.CodeCard,{title:"3. Hightouch sync definition (declarative YAML)",description:"Every sync is defined as a YAML file in Git. PII columns are auto-masked; failures page on-call; success posts to Slack. Schedule is hourly via cron.",icon:(0,t.jsx)(Z.RefreshCw,{className:"h-5 w-5"}),badge:"YAML",code:ep,language:"yaml",filename:"syncs/vip_loyalty.yml",highlight:[3,4,12,13,14,15,22,23,24,28,29,30,31,32],defaultCollapsed:!0,explainer:'This YAML file defines the Hightouch sync declaratively. The source is the vip_loyalty_top_5_percent SQL model on Snowflake WH_GOLD_SERVING. The destination is Salesforce Account object, upserting by salesforce_account_id. The mapping section translates model columns to Salesforce fields. The schedule is hourly via cron "0 * * * *" in Europe/London timezone. Governance: customer_email_hash is PII, masked with hash, audit-logged, owned by data_platform team. On failure: PagerDuty alert. On success: Slack notification.'})]}),(0,t.jsx)(a.SectionCard,{title:"Reverse-ETL activations (Hightouch)",description:"Each activation has an owner, a PII classification and an SLA. Sync cadence is matched to the upstream dbt run so audiences are never stale.",icon:(0,t.jsx)(Y.Workflow,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Audience"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Destination"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Records"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Cadence"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Purpose"})]})}),(0,t.jsx)("tbody",{children:o.REVERSE_ETL_AUDIENCES.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0",children:[(0,t.jsx)("td",{className:"px-4 py-2.5 font-medium",children:e.audience}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs",children:e.destination}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs tabular-nums",children:e.records}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs",children:e.cadence}),(0,t.jsx)("td",{className:"px-4 py-2.5 text-muted-foreground",children:e.purpose})]},e.audience))})]})})}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-4",children:[(0,t.jsx)(a.SectionCard,{title:"Freshness SLA",icon:(0,t.jsx)(x.Zap,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• Transactional (Shopify, Stripe): ",(0,t.jsx)(n.InlineCode,{children:"15 min"})]}),(0,t.jsxs)("li",{children:["• Marketing (Klaviyo, Meta): ",(0,t.jsx)(n.InlineCode,{children:"1 hr"})]}),(0,t.jsxs)("li",{children:["• ERP / HRIS (NetSuite, Workday): ",(0,t.jsx)(n.InlineCode,{children:"6 hr"})]}),(0,t.jsxs)("li",{children:["• Behavioural (Snowplow): ",(0,t.jsx)(n.InlineCode,{children:"5 min"})," streaming"]}),(0,t.jsx)("li",{children:"• SLA breach → auto-backfill via Fivetran API"})]})}),(0,t.jsx)(a.SectionCard,{title:"Schema drift handling",icon:(0,t.jsx)(Y.Workflow,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• Fivetran `ALTER TABLE` events trigger schema registry PR"}),(0,t.jsx)("li",{children:"• Bronze schema is mutable; Silver / Gold are locked"}),(0,t.jsx)("li",{children:"• PR runs Great Expectations on new column"}),(0,t.jsx)("li",{children:"• Approver = data_platform owner in CODEOWNERS"}),(0,t.jsx)("li",{children:"• Old columns retained with `__deprecated` suffix for 90 days"})]})}),(0,t.jsx)(a.SectionCard,{title:"Governance",icon:(0,t.jsx)(X.ShieldCheck,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• Every audience has owner + DPO classification"}),(0,t.jsx)("li",{children:"• PII columns auto-masked (hash, truncate, K-anonymity)"}),(0,t.jsx)("li",{children:"• Salesforce sync writes to a `__ht_` prefixed field set"}),(0,t.jsx)("li",{children:"• Audit log: who approved, when, target record count"}),(0,t.jsx)("li",{children:"• Opt-out registry synced daily from Zendesk → Hightouch"})]})})]}),(0,t.jsx)(a.SectionCard,{title:"Ingestion concept gallery — 3-layer interactive architecture",description:"Layer 1: 3D animated concept gallery (medallion, Kafka, Airflow DAG, Snowflake external tables) with n-D scope toggle + floating math/code background. Layer 2: Concept shorts with Pyodide-runnable Python (SCD2, schema drift, reverse-ETL, ELT vs ETL). Layer 3: Interactive calculators (throughput, latency). All in browser popups — lazy evaluation.",icon:(0,t.jsx)(h.Atom,{className:"h-5 w-5"}),badge:"3-layer gallery",children:(0,t.jsx)(eo,{})}),(0,t.jsx)(a.SectionCard,{title:"LHC extreme-scale ingestion — CMS/ATLAS at CERN",description:"Second example: the world's most extreme data ingestion pipeline. CMS and ATLAS at CERN's Large Hadron Collider generate 40 TB/s of raw data from 100M+ detector channels at 40 MHz crossing rate. A multi-stage trigger pipeline (L1 FPGA → HLT software farm → readout → EOS storage → WLCG grid) reduces this to 1 PB/year stored. Code examples in Python (Pyodide-runnable), Rust (zero-copy binary parser with SIMD), Scala (Spark Structured Streaming + Kafka), and Elixir (GenStage backpressure pipeline). Toggle between real binary data (hex dump of CMS RD5 format) and synthetic data (Python-generated event data). All in browser popups — lazy evaluation concept.",icon:(0,t.jsx)(h.Atom,{className:"h-5 w-5"}),badge:"LHC scenario",children:(0,t.jsx)(W,{})}),(0,t.jsxs)(el.DeeperThoughtSection,{pageTitle:"Fivetran & Hightouch",children:[(0,t.jsx)(el.DeeperThought,{title:"Fivetran & Hightouch IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Fivetran & Hightouch is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Fivetran & Hightouch connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Fivetran & Hightouch sits in the computational-science landscape."})}),(0,t.jsx)(el.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Fivetran & Hightouch) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(el.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(el.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(el.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)($.RelatedTopics,{topics:[{id:"streaming",reason:"Kafka for real-time CDC"},{id:"databricks",reason:"Spark for transforms"},{id:"orchestration",reason:"Airflow DAGs for pipeline"},{id:"snowflake",reason:"Warehouse for ELT load"},{id:"arrow",reason:"Columnar format for zero-copy"},{id:"patterns",reason:"Medallion + SCD2 patterns"}]}),(0,t.jsx)(s.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"streaming",reason:"Kafka for real-time CDC"},{id:"databricks",reason:"Spark for transforms"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(r.default,{href:(0,A.hrefFor)("orchestration"),className:"text-sm text-primary hover:underline",children:"→ Continue to Orchestration"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,A.hrefFor)("tableau"),className:"text-sm text-primary hover:underline",children:"→ Back to Tableau"})]})]})}e.s(["FivetranHightouchPage",()=>em],205521)}]);