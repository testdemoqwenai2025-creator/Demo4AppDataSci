(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,780088,e=>{"use strict";var t=e.i(843476),a=e.i(522016),s=e.i(271645),i=e.i(846932),n=e.i(862824),r=e.i(342046),o=e.i(921371),l=e.i(580296),d=e.i(122836),c=e.i(716675),m=e.i(59938),p=e.i(158960),h=e.i(717284),u=e.i(901752),g=e.i(487486),v=e.i(332017),f=e.i(966992),w=e.i(658041),S=e.i(828579),x=e.i(21218),b=e.i(283086),_=e.i(227516),k=e.i(691385),y=e.i(178583),T=e.i(25652),E=e.i(618393),j=e.i(455711),N=e.i(63639);let L=[{label:"Origin",value:"Flink SQL + Materialize 2018+",hint:"Flink SQL brought SQL to streaming (table is a stream, a stream is a table); Materialize brought differential dataflow to SQL materialized views; RisingWave (2022) added streaming mat views on Hummock storage",deltaTone:"flat"},{label:"Engines",value:"4 (Flink SQL + Spark SS SQL + Materialize + RisingWave)",hint:"Flink SQL (stream-table duality, temporal joins), Spark Structured Streaming SQL (event-time + watermarks), Materialize (differential dataflow), RisingWave (streaming mat views on Hummock)",deltaTone:"flat"},{label:"Windows",value:"3 (TUMBLE + HOP + SESSION)",hint:"TUMBLE: fixed-size non-overlapping [t, t+size). HOP: sliding overlapping [t, t+size) advancing by step. SESSION: gap-based — merge sessions where gap ≤ inactivity_gap",deltaTone:"up"},{label:"Latency",value:"t_event ≠ t_process",hint:"Event-time = when the event occurred. Processing-time = when the engine sees it. Watermark = max_seen(t_event) - allowed_lateness handles the gap (reordering, late arrivals)",deltaTone:"flat"}],A=`# ============================================================
# Streaming SQL Mathematical Foundations — Event Time, Watermark, Windows
# ============================================================

import math
import random
from collections import defaultdict

# --- 1. Event Time vs Processing Time ---
# t_event  = when the event occurred (recorded in the event payload)
# t_process = when the streaming engine received it
# latency  = t_process - t_event  (always >= 0 — events cannot arrive before they happen)
#
# Sources of latency:
#   - Network delay (e.g. lane multiplexing in sequencer reorders ~30s)
#   - Batching (e.g. Parquet writers flush every 64MB)
#   - Source clock skew (e.g. IoT sensors with drifting clocks)
#   - Backpressure (e.g. engine falling behind on a burst)

def simulate_event_time_vs_processing(n=200, mean_latency=5.0, jitter=15.0):
    """Generate events with realistic latency."""
    events = []
    for i in range(n):
        t_event = i * 1.0  # 1 event per second
        # Latency: log-normal (heavy tail — some events arrive very late)
        lat = random.lognormvariate(math.log(mean_latency), 0.5)
        # Add jitter (network reordering)
        lat += random.uniform(-jitter, jitter)
        lat = max(0.1, lat)
        t_process = t_event + lat
        events.append((t_event, t_process, lat))
    return events

random.seed(42)
events = simulate_event_time_vs_processing()
mean_lat = sum(e[2] for e in events) / len(events)
p99_lat = sorted(e[2] for e in events)[int(0.99 * len(events))]
max_lat = max(e[2] for e in events)
print("=== Event Time vs Processing Time ===")
print(f"  t_event  = when event occurred (recorded in payload)")
print(f"  t_process = when engine saw it (wall clock)")
print(f"  latency = t_process - t_event (always >= 0)")
print(f"  Simulated: mean latency = {mean_lat:.2f}s, p99 = {p99_lat:.2f}s, max = {max_lat:.2f}s")
print(f"  Latency distribution: heavy-tailed (log-normal + uniform jitter)")
print()

# --- 2. Watermark ---
# W(t) = max_seen(t_event) - allowed_lateness
# The watermark is a monotonically increasing estimate of "we will not see
# events older than W(t)". When the engine's clock reaches W(t), it
# finalises all windows with end <= W(t).
#
# Allowed lateness: the engine tolerates events arriving up to allowed_lateness
# after the watermark. Events arriving later are dropped (or routed to a side output / DLQ).

def compute_watermark(events, allowed_lateness=10.0):
    """Track the watermark as events arrive."""
    max_seen = -float('inf')
    watermark_history = []
    for t_event, t_process, _ in events:
        if t_event > max_seen:
            max_seen = t_event
        watermark = max_seen - allowed_lateness
        watermark_history.append((t_process, watermark, max_seen))
    return watermark_history

# Test different allowed_lateness values
print("=== Watermark: W(t) = max_seen(t_event) - allowed_lateness ===")
for lateness in [5.0, 10.0, 30.0, 60.0]:
    wm_hist = compute_watermark(events, allowed_lateness=lateness)
    # Count: how many events arrive after the watermark has passed (late)?
    final_wm = wm_hist[-1][1]
    n_late = sum(1 for t_event, t_process, _ in events if t_process > final_wm + lateness)
    print(f"  allowed_lateness={lateness:>4.0f}s: final watermark = {final_wm:>6.1f}, late events = {n_late}/{len(events)}")
print("  Higher allowed_lateness = fewer late events but more latency for windows.")
print()

# --- 3. TUMBLE Window: fixed-size non-overlapping [t, t+size) ---
def tumble_assign(t_event, size=60.0):
    """Return the [start, end) window for an event."""
    start = (t_event // size) * size
    return (start, start + size)

print("=== TUMBLE Window: [t, t+size), non-overlapping ===")
print("  Formula: window_start = floor(t_event / size) * size")
print("  window_end = window_start + size")
size = 60.0
for t in [5.0, 30.0, 59.9, 60.0, 90.0, 119.9, 120.0]:
    start, end = tumble_assign(t, size)
    print(f"  t_event={t:>6.1f} -> window [{start:>6.1f}, {end:>6.1f})")
print("  Non-overlapping: each event falls in exactly one window.")
print("  Use case: per-minute aggregates (per-LB collision rate, per-min variant quality).")
print()

# --- 4. HOP Window: sliding overlapping, advancing by step ---
def hop_assign(t_event, size=60.0, step=10.0):
    """Return all [start, end) windows an event belongs to."""
    windows = []
    # Earliest window start that contains t_event: floor((t - size) / step) * step
    earliest_start = ((t_event - size) // step) * step
    s = earliest_start
    while s <= t_event:
        if s <= t_event < s + size:
            windows.append((s, s + size))
        s += step
    return windows

print("=== HOP Window: [t, t+size) advancing by step (overlapping) ===")
print("  An event falls in ceil(size/step) windows")
hop_size = 60.0
hop_step = 10.0
t = 65.0
windows = hop_assign(t, hop_size, hop_step)
print(f"  t_event={t}, size={hop_size}, step={hop_step}: {len(windows)} windows")
for s, e in windows[:5]:
    print(f"    [{s}, {e})")
print(f"  Use case: rolling 60s stats updated every 10s (real-time dashboards).")
print()

# --- 5. SESSION Window: gap-based, merge where gap <= inactivity_gap ---
def session_assign(events_sorted, gap=30.0):
    """Group events into sessions where consecutive gaps <= inactivity_gap."""
    sessions = []
    if not events_sorted:
        return sessions
    current_session = [events_sorted[0]]
    for prev, curr in zip(events_sorted, events_sorted[1:]):
        if curr - prev <= gap:
            current_session.append(curr)
        else:
            sessions.append((current_session[0], current_session[-1], len(current_session)))
            current_session = [curr]
    sessions.append((current_session[0], current_session[-1], len(current_session)))
    return sessions

sorted_events = sorted([e[0] for e in events[:50]])
sessions = session_assign(sorted_events, gap=5.0)
print("=== SESSION Window: gap <= inactivity_gap (merge) ===")
print(f"  Formula: merge events where gap(prev, curr) <= inactivity_gap")
print(f"  50 events with inactivity_gap=5s -> {len(sessions)} sessions")
for s, e, n in sessions[:5]:
    print(f"    session [{s:.1f}, {e:.1f}] duration={e-s:.1f}s with {n} events")
print("  Use case: user sessions, sequencer activity bursts (idle gaps close sessions).")`,M=`# ============================================================
# Streaming SQL Windowing Simulation — Flink-style (Pyodide)
# Simulate TUMBLE + HOP + SESSION windows on variant stream
# ============================================================

import math
import random
from collections import defaultdict

# Simulate streaming variant calls with event-time + processing-time
random.seed(42)
n_events = 200
events = []
for i in range(n_events):
    t_event = i * 0.5  # event every 0.5s
    lat = random.lognormvariate(math.log(2.0), 0.6)  # 2s mean latency, heavy tail
    lat = max(0.1, lat)
    t_process = t_event + lat
    sequencer = random.choice(["NovaSeq-001", "NovaSeq-042", "NovaSeq-117"])
    qual = random.uniform(20, 60)
    events.append((t_event, t_process, sequencer, qual))

# Sort by processing time (realistic arrival order)
events_proc = sorted(events, key=lambda e: e[1])

print("=== Streaming Variant Events (200 events, 3 sequencers) ===")
print(f"  Event rate: ~2 events/s \xb7 mean latency: 2s \xb7 heavy-tail (log-normal)")
print(f"  Watermark: W(t) = max_seen(t_event) - 60s")
print()

# --- TUMBLE 30s windows: per-window variant quality per sequencer ---
print("=== TUMBLE Window (30s, non-overlapping) ===")
tumble_windows = defaultdict(lambda: defaultdict(list))
for t_event, t_process, seq, qual in events:
    start = (t_event // 30) * 30
    tumble_windows[(int(start), int(start+30))][seq].append(qual)

print(f"{'Window':>14} | {'Sequencer':<14} | {'N':>5} | {'Avg QUAL':>9}")
print("-" * 55)
for (s, e), seqs in sorted(tumble_windows.items())[:6]:
    for seq, quals in seqs.items():
        print(f"[{s:>3}, {e:>3})s | {seq:<14} | {len(quals):>5} | {sum(quals)/len(quals):>9.2f}")
print()

# --- HOP 60s windows, step 15s: overlapping ---
print("=== HOP Window (60s, step 15s, overlapping) ===")
hop_windows = defaultdict(lambda: defaultdict(int))
for t_event, t_process, seq, qual in events:
    earliest_start = ((t_event - 60) // 15) * 15
    s = earliest_start
    while s <= t_event:
        if s <= t_event < s + 60:
            hop_windows[(int(s), int(s+60))][seq] += 1
        s += 15

n_windows_per_event = 60 / 15  # 4 windows
print(f"  Each event falls in ceil(60/15)={int(n_windows_per_event)} windows")
print(f"  Total HOP windows: {len(hop_windows)}")
for (s, e), seqs in sorted(hop_windows.items())[:3]:
    total = sum(seqs.values())
    print(f"  Window [{s}, {e})s: {total} events")
print()

# --- SESSION 5s gap: merge by inactivity ---
print("=== SESSION Window (inactivity_gap=5s) ===")
all_event_times = sorted([e[0] for e in events])
sessions = []
current_session = [all_event_times[0]]
for prev, curr in zip(all_event_times, all_event_times[1:]):
    if curr - prev <= 5.0:
        current_session.append(curr)
    else:
        sessions.append(current_session)
        current_session = [curr]
sessions.append(current_session)

print(f"  200 events with inactivity_gap=5s -> {len(sessions)} sessions")
print(f"  Session durations: {[round(s[-1]-s[0], 1) for s in sessions[:5]]}...")
print()

# --- Watermark: how many events are "late" (dropped)? ---
print("=== Watermark: late event count at various allowed_lateness ===")
for lateness in [1.0, 5.0, 30.0, 60.0]:
    max_seen = -float('inf')
    n_late = 0
    for t_event, t_process, _, _ in events_proc:
        if t_event > max_seen:
            max_seen = t_event
        wm = max_seen - lateness
        # Event is "late" if its t_event < current watermark
        if t_event < wm:
            n_late += 1
    print(f"  allowed_lateness={lateness:>5.1f}s: {n_late}/{n_events} events dropped ({100*n_late/n_events:.1f}%)")`;function R(){let[e,a]=(0,s.useState)("sources"),n={sources:{label:"Stream Sources",desc:"Kafka topics, Pulsar, Kinesis, IoT sensors. Events carry event-time (when they happened).",level:0},engine:{label:"Streaming SQL Engine",desc:"Flink SQL / Spark SS / Materialize / RisingWave. Parses SQL, builds DAG, executes with event-time semantics.",level:1},watermark:{label:"Watermark Generator",desc:"W(t) = max_seen(t_event) - allowed_lateness. Monotonically increasing estimate of progress. Triggers window finalisation.",level:2},windows:{label:"Windows (TUMBLE/HOP/SESSION)",desc:"TUMBLE: non-overlapping fixed-size. HOP: sliding overlapping. SESSION: gap-based merge. Each emits results when watermark passes window end.",level:3},sinks:{label:"Sinks (mat views / Kafka / DB)",desc:"Materialized views, Kafka topics, JDBC sinks. Updates are incremental (differential dataflow) for sub-second latency.",level:4}},r={sources:{x:70,y:50},engine:{x:200,y:50},watermark:{x:330,y:50},windows:{x:330,y:130},sinks:{x:200,y:130}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(N.Radio,{className:"h-3.5 w-3.5 text-primary"}),"Streaming SQL architecture — Sources → Engine → Watermark → Windows → Sinks"]})}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsxs)("svg",{viewBox:"0 0 400 200",className:"w-full h-auto",children:[[["sources","engine"],["engine","watermark"],["watermark","windows"],["windows","sinks"],["engine","sinks"]].map(([e,a],s)=>{let i=r[e],n=r[a];return(0,t.jsx)("line",{x1:i.x,y1:i.y+15,x2:n.x,y2:n.y-15,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#ssql-arrow)"},s)}),Object.entries(r).map(([s,r])=>{let o=e===s,l=n[s],d=["var(--chart-3)","var(--chart-2)","var(--chart-1)","var(--chart-4)","var(--muted-foreground)"][l.level];return(0,t.jsxs)(i.motion.g,{onMouseEnter:()=>a(s),onMouseLeave:()=>a(null),animate:{scale:o?1.05:1},style:{cursor:"pointer"},children:[(0,t.jsx)("rect",{x:r.x-60,y:r.y-15,width:"120",height:"26",rx:"4",fill:o?d+"30":"var(--background)",stroke:d,strokeWidth:o?1.5:.8}),(0,t.jsx)("text",{x:r.x,y:r.y+2,textAnchor:"middle",fontSize:"7.5",fill:o?d:"var(--foreground)",fontWeight:o?"bold":"normal",children:l.label})]},s)}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"ssql-arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,t.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:n[e].label}),(0,t.jsx)("p",{className:"text-muted-foreground",children:n[e].desc})]})]})]})}function I(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(S.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Flink SQL vs Spark SS SQL vs Materialize vs RisingWave — 6 features"]})}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/30",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Flink SQL"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Spark SS SQL"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Materialize"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"RisingWave"})]})}),(0,t.jsx)("tbody",{children:[{feature:"Origin",flink:"Apache Flink (2014+ SQL 2018)",spark:"Spark Structured Streaming (Spark 2.0 2016)",materialize:"Materialize Inc (2018)",risingwave:"RisingWave Labs (2022)"},{feature:"Architecture",flink:"Distributed dataflow (JobManager/TaskManager)",spark:"Micro-batch (Spark engine)",materialize:"Differential dataflow (single-binary)",risingwave:"Streaming mat views on Hummock storage"},{feature:"Latency",flink:"~100ms (true streaming)",spark:"~100ms-100s (micro-batch)",materialize:"Sub-second (incremental)",risingwave:"Sub-second (streaming mat views)"},{feature:"SQL dialect",flink:"ANSI SQL + Table API + match_recognize (CEP)",spark:"ANSI SQL + MERGE INTO",materialize:"PostgreSQL-wire + mat views",risingwave:"PostgreSQL-wire + streaming mat views"},{feature:"Window types",flink:"TUMBLE + HOP + SESSION + CEP",spark:"TUMBLE + HOP + SESSION (window functions)",materialize:"Implicit via SELECT+GROUP BY",risingwave:"TUMBLE + HOP + SESSION"},{feature:"State backend",flink:"RocksDB / heap (incremental checkpoints)",spark:"RocksDB (state store v2)",materialize:"Differential dataflow timelines",risingwave:"Hummock (S3-backed LSM-tree)"}].map((e,a)=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,t.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.flink}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.spark}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.materialize}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.risingwave})]},a))})]})})]})}function O(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(n.PageHeader,{eyebrow:"Streaming SQL · Flink SQL · Spark Structured Streaming · Materialize · RisingWave · event time · watermarks · TUMBLE/HOP/SESSION",title:"Streaming SQL Deep Dive — Flink SQL + Spark SS + Materialize + RisingWave",description:"Streaming SQL brings declarative SQL to unbounded data streams. Four engines dominate: (1) Flink SQL — the stream-table duality ('a table is a stream, a stream is a table'), temporal joins (FOR SYSTEM_TIME AS OF), windowing (TUMBLE/HOP/SESSION), and MATCH_RECOGNIZE for complex event processing; (2) Spark Structured Streaming SQL — event-time + watermarks + MERGE INTO for change-data-capture; (3) Materialize — differential dataflow for incremental view maintenance, where a streaming materialized view recomputes only the changed rows on every input; (4) RisingWave — streaming materialized views on Hummock storage, PostgreSQL-wire compatible. This deep dive covers the mathematical foundations (event time vs processing time, watermark formula W(t) = max_seen(t_event) - allowed_lateness, the three window types), production SQL code, and scientific dataset examples from real-time genomics and LHC online monitoring.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(x.Activity,{className:"h-3 w-3"})," Event-time"]}),(0,t.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(w.Database,{className:"h-3 w-3"})," Materialized views"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:L.map(e=>(0,t.jsx)(n.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(n.SectionCard,{title:"Mathematical foundations — event time, watermark, windows",description:"The mathematical foundations of streaming SQL. Event time separates 'when' from 'when seen', watermarks estimate progress despite reordering, the three window types aggregate bounded views of unbounded streams.",icon:(0,t.jsx)(j.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-primary mb-2",children:"1. Event Time vs Processing Time"}),(0,t.jsx)("p",{className:"font-mono text-xs text-primary mb-2",children:"latency = t_process - t_event (always ≥ 0)"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:[(0,t.jsx)("code",{className:"font-mono",children:"t_event"})," is when the event occurred (recorded in the event payload, immutable).",(0,t.jsx)("code",{className:"font-mono",children:" t_process"})," is when the streaming engine received it (wall clock, mutable). The gap is the ",(0,t.jsx)("strong",{children:"latency"}),": always non-negative (events cannot arrive before they happen), heavy-tailed (most events are fast, a few are very late). Sources: network delay (lane multiplexing reorders ~30s), batching (Parquet flushes every 64MB), source clock skew (IoT sensors drift), backpressure (engine falls behind on burst). Processing-time semantics give low latency but non-deterministic results (replays differ); event-time semantics give deterministic results but require watermarks to bound waiting. Flink, Spark, Materialize, RisingWave all default to event-time."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2",children:"2. Watermark"}),(0,t.jsx)("p",{className:"font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-2",children:"W(t) = max_seen(t_event) - allowed_lateness"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["The watermark is a monotonically increasing estimate of ",(0,t.jsx)("em",{children:"progress"}),": ",(0,t.jsx)("em",{children:'"we will not see events older than W(t)"'}),". It is computed as the maximum event-time seen so far, minus an ",(0,t.jsx)("code",{className:"font-mono",children:"allowed_lateness"})," tolerance. When the watermark passes a window's end, the window finalises and emits its result. Events arriving after the watermark has passed their window are ",(0,t.jsx)("strong",{children:"late"})," — either dropped or routed to a side output / dead-letter queue. Setting ",(0,t.jsx)("code",{className:"font-mono",children:"allowed_lateness"})," is a trade-off: higher = fewer late events but more window latency (windows wait longer to finalise); lower = more late events but faster window emission. Typical values: 60s for genomics (lane multiplexing), 5min for IoT (network jitter), 1 day for batch-upstream systems. Flink supports punctuated watermarks (event carries the watermark) and periodic watermarks (engine computes from a sample of events)."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/30 bg-violet-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-violet-600 dark:text-violet-400 mb-2",children:"3. TUMBLE Window"}),(0,t.jsx)("p",{className:"font-mono text-xs text-violet-600 dark:text-violet-400 mb-2",children:"window = [floor(t_event / size) × size, floor(t_event / size) × size + size)"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Fixed-size non-overlapping windows: each event falls in exactly one window. The window start is computed as",(0,t.jsx)("code",{className:"font-mono",children:" floor(t_event / size) × size"}),", the end is ",(0,t.jsx)("code",{className:"font-mono",children:"start + size"}),".",(0,t.jsx)("code",{className:"font-mono",children:"TUMBLE(event_time, INTERVAL '1' MINUTE)"})," gives 1-minute windows aligned to minute boundaries. Use case: per-minute aggregates (per-LB collision rate, per-min variant quality stats). Windows are deterministic for a given size, independent of arrival order. Emission: when the watermark passes the window end."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/30 bg-amber-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2",children:"4. HOP Window (Sliding)"}),(0,t.jsx)("p",{className:"font-mono text-xs text-amber-600 dark:text-amber-400 mb-2",children:"[t, t + size) advancing by step — each event falls in ceil(size / step) windows"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Sliding overlapping windows: an event belongs to multiple windows. The hop step determines how often a new window starts; the hop size determines window length. Each event falls in ",(0,t.jsx)("code",{className:"font-mono",children:"ceil(size / step)"})," windows.",(0,t.jsx)("code",{className:"font-mono",children:"HOP(event_time, INTERVAL '10' SECOND, INTERVAL '1' MINUTE)"})," = 1-minute windows starting every 10s. Use case: rolling 60s dashboards updated every 10s. Cost: ",(0,t.jsx)("code",{className:"font-mono",children:"O(events × ceil(size/step))"})," — more state than TUMBLE. Often combined with ",(0,t.jsx)("code",{className:"font-mono",children:"HAVING COUNT(*) > threshold"})," for alerting."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-rose-500/30 bg-rose-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-rose-600 dark:text-rose-400 mb-2",children:"5. SESSION Window (Gap-based)"}),(0,t.jsx)("p",{className:"font-mono text-xs text-rose-600 dark:text-rose-400 mb-2",children:"merge events where gap(prev, curr) ≤ inactivity_gap"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Session windows are dynamically-sized: a new session starts when the gap between two consecutive events exceeds",(0,t.jsx)("code",{className:"font-mono",children:" inactivity_gap"}),". Events within the gap merge into one session.",(0,t.jsx)("code",{className:"font-mono",children:"SESSION(event_time, INTERVAL '5' MINUTE)"})," groups user clicks into sessions separated by 5+ minute idle gaps. Use case: user sessions (web analytics), sequencer activity bursts (idle gaps close sessions), IoT sensor activity cycles. Sessions are non-deterministic in size (depend on data) — different from TUMBLE/HOP which have fixed boundaries. State cost: O(sessions × avg session size) — can grow unbounded; requires eviction policy."]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"Streaming SQL architecture — Sources → Engine → Watermark → Windows → Sinks",description:"The 4 engines share a common architecture: stream sources (Kafka/Pulsar) → SQL engine (Flink/Spark/Materialize/RisingWave) → watermark generator → window operators → sinks (materialized views, Kafka topics, JDBC). The differences are in state backend, latency model, and SQL dialect.",icon:(0,t.jsx)(k.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,t.jsx)(R,{})}),(0,t.jsx)(n.SectionCard,{title:"Try it: event-time + watermark + 3 window types (Pyodide)",description:"Pure-Python implementation of the 5 mathematical foundations. Simulate 200 events with heavy-tail latency, compute watermarks at different allowed_lateness, assign TUMBLE/HOP/SESSION windows, and count late events.",icon:(0,t.jsx)(b.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(c.PyodideRunner,{code:A,buttonLabel:"Run streaming SQL math foundations (Pyodide)"})}),(0,t.jsx)(n.SectionCard,{title:"Try it: simulate Flink SQL windowing on a variant stream (Pyodide)",description:"Simulate 200 streaming variant calls across 3 sequencers. Apply TUMBLE 30s windows for per-window aggregates, HOP 60s/step 15s overlapping windows for rolling stats, SESSION 5s-gap windows for burst detection, and measure watermark late-drop rates at various allowed_lateness.",icon:(0,t.jsx)(b.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(c.PyodideRunner,{code:M,buttonLabel:"Run Flink windowing simulation (Pyodide)"})}),(0,t.jsx)(n.SectionCard,{title:"Production SQL — Flink + Spark + Materialize + RisingWave",description:"Four SQL code blocks: (1) Flink SQL TUMBLE + temporal join, (2) Spark Structured Streaming watermark + MERGE INTO, (3) Materialize streaming mat view + anomaly view, (4) RisingWave TUMBLE + SESSION + Hummock storage.",icon:(0,t.jsx)(f.Cpu,{className:"h-5 w-5"}),badge:"4 code blocks",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)(d.CodeBlock,{language:"sql",filename:"flink_tumble_temporal_join.sql",code:`-- Flink SQL: stream-table duality + temporal join + TUMBLE window
-- Stream-table duality: a Table is a Stream (changelog), a Stream is a Table (snapshot)

-- (1) Source table: variant stream from Kafka, with event-time + watermark
CREATE TABLE variant_stream (
  chrom        STRING,
  pos          BIGINT,
  ref_allele   STRING,
  alt_allele   STRING,
  qual         DOUBLE,
  sequencer_id STRING,
  event_time   TIMESTAMP(3),
  -- Watermark: tolerate 60s out-of-order (lane multiplexing)
  WATERMARK FOR event_time AS event_time - INTERVAL '60' SECOND
) WITH (
  'connector' = 'kafka',
  'topic'     = 'variants',
  'properties.bootstrap.servers' = 'kafka:9092',
  'format'     = 'json'
);

-- (2) Reference table: VCF truth set (changelog = type 'versioned')
CREATE TABLE vcf_reference (
  chrom STRING, pos BIGINT, ref_allele STRING, alt_allele STRING,
  clinical_significance STRING,
  PRIMARY KEY (chrom, pos) NOT ENFORCED
) WITH ('connector' = 'jdbc', 'url' = 'jdbc:postgresql://vcf-ref/db');

-- (3) Temporal join: enrich variants with clinical sig as-of event time
CREATE VIEW variant_enriched AS
SELECT v.chrom, v.pos, v.qual, v.sequencer_id, v.event_time,
       r.clinical_significance
FROM variant_stream v
LEFT JOIN vcf_reference FOR SYSTEM_TIME AS OF v.event_time AS r
  ON v.chrom = r.chrom AND v.pos = r.pos;

-- (4) TUMBLE 1-min window: per-sequencer aggregates (with watermark trigger)
INSERT INTO variant_metrics
SELECT
  sequencer_id,
  TUMBLE_START(event_time, INTERVAL '1' MINUTE) AS w_start,
  TUMBLE_END(event_time, INTERVAL '1' MINUTE)   AS w_end,
  COUNT(*)                                       AS n_variants,
  AVG(qual)                                      AS avg_qual,
  COUNT(*) FILTER (WHERE qual < 30)              AS low_qual_n
FROM variant_stream
GROUP BY sequencer_id, TUMBLE(event_time, INTERVAL '1' MINUTE);`}),(0,t.jsx)(d.CodeBlock,{language:"sql",filename:"spark_structured_streaming.sql",code:`-- Spark Structured Streaming SQL: watermark + MERGE INTO (CDC)

-- (1) Source: Kafka variant stream with watermark (event-time)
CREATE TABLE variant_stream
USING kafka
OPTIONS (
  kafka.bootstrap.servers 'kafka:9092',
  subscribe 'variants',
  failOnDataLoss false
) PARTITIONED BY (chrom STRING);

-- Add event_time + watermark (60s lateness tolerance)
CREATE OR REPLACE TEMP VIEW variant_v
AS SELECT
  chrom, pos, ref_allele, alt_allele, qual,
  sequencer_id,
  CAST(timestamp AS TIMESTAMP) AS event_time,
  current_watermark() AS wm
FROM variant_stream
-- Watermark defined in Structured Streaming Python:
--   .withWatermark('event_time', '60 seconds')

-- (2) Aggregation: TUMBLE-style per-minute stats via window()
CREATE OR REPLACE TEMP VIEW per_min_stats AS
SELECT
  window(event_time, '1 minute') AS w,
  sequencer_id,
  count(*) AS n, avg(qual) AS avg_q
FROM variant_v
GROUP BY window(event_time, '1 minute'), sequencer_id;

-- (3) MERGE INTO: change-data-capture into Delta target (idempotent upsert)
MERGE INTO delta.variants AS target
USING variant_stream AS src
ON target.chrom = src.chrom AND target.pos = src.pos
  AND target.alt_allele = src.alt_allele
WHEN MATCHED AND src.qual > target.qual THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;

-- (4) Late data: Spark supports drop (default), or 'update' (re-emit) modes`}),(0,t.jsx)(d.CodeBlock,{language:"sql",filename:"materialize_streaming_views.sql",code:`-- Materialize: differential dataflow + incremental view maintenance
-- Every CREATE MATERIALIZED VIEW maintains only the changed rows on each input.

-- (1) Source: Kafka topic via Materialize source
CREATE SOURCE variant_source
FROM KAFKA BROKER 'kafka:9092' TOPIC 'variants'
KEY FORMAT TEXT VALUE FORMAT JSON;

-- (2) Materialized view: per-sequencer per-minute aggregates
-- This view is INCREMENTALLY maintained — when 1 row changes in the source,
-- only the affected output rows are recomputed (differential dataflow).
CREATE MATERIALIZED VIEW per_min_variant_stats AS
SELECT
  sequencer_id,
  date_trunc('minute', event_time) AS w_start,
  count(*)                          AS n_variants,
  avg(qual::float)                  AS avg_qual,
  count(*) FILTER (WHERE qual::float < 30) AS low_qual_n
FROM variant_source
GROUP BY sequencer_id, date_trunc('minute', event_time);

-- (3) Anomaly view: rate exceeds 3-sigma (triggered on every input update)
CREATE MATERIALIZED VIEW variant_anomalies AS
SELECT sequencer_id, w_start, n_variants
FROM per_min_variant_stats
WHERE n_variants > 50000 OR low_qual_n > 1000;

-- (4) Subscribe: push incremental updates to downstream consumers
-- SUBSCRIBE TO (SELECT * FROM variant_anomalies) AS json;`}),(0,t.jsx)(d.CodeBlock,{language:"sql",filename:"risingwave_tumble_session.sql",code:`-- RisingWave: streaming mat views on Hummock storage (S3-backed LSM-tree)
-- PostgreSQL-wire compatible — works with psql, JDBC, etc.

-- (1) Source: Kafka variant stream
CREATE SOURCE variant_stream (
  chrom TEXT, pos BIGINT, ref_allele TEXT, alt_allele TEXT,
  qual DOUBLE PRECISION, sequencer_id TEXT,
  event_time TIMESTAMPTZ
) WITH (
  connector = 'kafka',
  topic = 'variants',
  properties.bootstrap.server = 'kafka:9092',
  format = 'json'
) WATERMARK FOR event_time AS event_time - INTERVAL '60 seconds';

-- (2) TUMBLE 1-min: per-sequencer per-minute aggregates
CREATE MATERIALIZED VIEW tumble_per_min AS
SELECT
  sequencer_id,
  window_start, window_end,
  count(*) AS n, avg(qual) AS avg_qual
FROM TUMBLE(variant_stream, event_time, INTERVAL '1 minute')
GROUP BY sequencer_id, window_start, window_end;

-- (3) SESSION 5-min gap: per-sequencer activity bursts
CREATE MATERIALIZED VIEW session_bursts AS
SELECT
  sequencer_id,
  window_start, window_end,
  count(*) AS n_events
FROM SESSION(variant_stream, event_time, INTERVAL '5 minutes')
GROUP BY sequencer_id, window_start, window_end;

-- (4) HOP 1-hour sliding by 5-min: rolling hourly stats
CREATE MATERIALIZED VIEW hop_hourly AS
SELECT
  sequencer_id,
  window_start, window_end,
  count(*) AS n
FROM HOP(variant_stream, event_time, INTERVAL '5 minutes', INTERVAL '1 hour')
GROUP BY sequencer_id, window_start, window_end;

-- Hummock storage: state is checkpointed to S3, recovery is fast.`})]})}),(0,t.jsx)(n.SectionCard,{title:"Flink SQL vs Spark SS SQL vs Materialize vs RisingWave",description:"Four streaming SQL engines compared across 6 features. Flink is true streaming with the lowest latency; Spark is micro-batch (better with existing Spark stacks); Materialize pioneered differential dataflow; RisingWave adds streaming mat views on Hummock storage.",icon:(0,t.jsx)(S.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(I,{})}),(0,t.jsx)(n.SectionCard,{title:"Why Streaming SQL evolved — shortfalls of imperative streaming",description:"Before SQL came to streaming, you wrote Kafka consumer code in Java/Scala/Python — manual partition assignment, manual offset commit, manual state, manual window logic. SQL removed 4 categories of boilerplate.",icon:(0,t.jsx)(_.History,{className:"h-5 w-5"}),badge:"Why SQL",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Manual windowing logic."})," Every streaming app had bespoke window code — TUMBLE/HOP/SESSION implemented in imperative Java/Scala. SQL removes this: ",(0,t.jsx)("code",{className:"font-mono",children:"TUMBLE(event_time, INTERVAL '1' MINUTE)"})," is a declarative one-liner. The engine handles the watermarks, late data, eviction. This drops ~500 lines of windowing code per job."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: Manual state management."})," Stateful streaming requires checkpointing to disk (RocksDB), recovery on failure, incremental checkpoints. SQL engines handle this via the engine — Flink's checkpoint barrier, Materialize's differential dataflow timelines, RisingWave's Hummock LSM-tree. Application code is stateless SQL."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No standard SQL dialect for streams."})," Before Flink SQL, every streaming tool had its own DSL (Spark DStream, Kafka Streams DSL, Akka Streams). SQL brings composability — the same query runs in any ANSI SQL engine. Materialize and RisingWave both expose PostgreSQL-wire, so psql and BI tools work out of the box."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: No incremental view maintenance."})," Traditional materialized views recompute the full table on refresh — useless for streaming. Materialize's differential dataflow (Frank McSherry, 2013) introduced the formalism: only the changed rows are recomputed. ",(0,t.jsx)("code",{className:"font-mono",children:"O(changes)"})," per input, not ",(0,t.jsx)("code",{className:"font-mono",children:"O(full scan)"}),". This is the algorithmic breakthrough that makes SQL-on-streams tractable."]})]})}),(0,t.jsx)(n.SectionCard,{title:"Truly unique Streaming SQL features",description:"Four features that are genuinely unique to streaming SQL — structural differentiators that batch SQL cannot match.",icon:(0,t.jsx)(b.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Stream-table duality (Flink)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["A Table is a Stream (changelog of INSERT/UPDATE/DELETE), a Stream is a Table (snapshot). ",(0,t.jsx)("strong",{children:"The same SQL query runs as a batch job (bounded) or a streaming job (unbounded)."})," No code change between dev and prod."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Temporal joins (FOR SYSTEM_TIME AS OF)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["JOIN a stream against a slowly-changing dimension ",(0,t.jsx)("em",{children:"as of the event's event-time"}),". ",(0,t.jsx)("strong",{children:"Batch SQL cannot do this — it only sees the latest dimension snapshot."})," Critical for point-in-time correctness in ML feature engineering."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Differential dataflow (Materialize)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Materialized views maintained incrementally — only changed rows recomputed per input. ",(0,t.jsx)("strong",{children:"Batch SQL recomputes the full table on refresh."})," Differential dataflow gives O(changes) per input, not O(full scan) — sub-second updates on multi-billion-row views."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. MATCH_RECOGNIZE (Flink CEP)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Pattern matching over streams — ",(0,t.jsx)("code",{className:"font-mono",children:"PATTERN (A+ B)"}),' finds "A happens one or more times then B". ',(0,t.jsx)("strong",{children:"Batch SQL has no temporal pattern primitive — you'd need a separate CEP library."})," Critical for fraud (A: login, B: transfer within 5min) and IoT (A: temp rising, B: alarm)."]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"2 scientific dataset examples — cards with 5-language code",description:"Two streaming SQL deployment scenarios from life sciences and physics. Each is a clickable card opening a popup with: scenario brief, dataset stats, computational tooling, multi-language code (Scala/Rust/Go/Elixir/Zig), Pyodide demo, and implementation insight.",icon:(0,t.jsx)(w.Database,{className:"h-5 w-5"}),badge:"2 examples × 5 langs",children:(0,t.jsx)(p.DatasetCards,{examples:h.STREAMING_SQL_SCIENCE_EXAMPLES,intro:"Real-time genomics variant streaming via Flink SQL TUMBLE windows (5k variants/sec, 200 NovaSeq, 60s watermark) + LHC online monitoring via Materialize differential dataflow (40M events/sec, per-LB collision rate, sub-second mat view updates)."})}),(0,t.jsx)(n.SectionCard,{title:"Computational tooling — the streaming SQL ecosystem",description:"Streaming SQL integrates with Kafka (sources), JDBC (sinks), and BI tools (via PostgreSQL-wire).",icon:(0,t.jsx)(E.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(x.Activity,{className:"h-3.5 w-3.5 text-primary"})," Stream sources"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Kafka"})," — the de-facto stream source (5M msgs/sec/partition)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apache Pulsar"})," — geo-replicated streaming (Yahoo)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"AWS Kinesis"})," — managed Kafka-compatible"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Azure Event Hubs"})," — managed Kafka-compatible"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Redpanda"})," — Kafka-compatible on Rust/WAL"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"NATS JetStream"})," — lightweight streaming"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(w.Database,{className:"h-3.5 w-3.5 text-primary"})," Sinks + integrations"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Materialized views"})," — incremental maintenance (sub-sec)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Kafka topics"})," — pipeline to next consumer"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"JDBC sinks"})," — Postgres, MySQL, ClickHouse"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Iceberg / Delta"})," — lakehouse sinks"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"PostgreSQL-wire"})," — BI tools (Metabase, Superset, Tableau)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"OpenLineage"})," — streaming lineage tracking"]})]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"Research + production case studies",description:"The papers and production deployments that defined streaming SQL.",icon:(0,t.jsx)(y.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Akidau et al. 2015 (The Dataflow Model):"})," Google's paper \"The Dataflow Model: A Stream Processing Approach to Correctness and Clarity\" formalised event-time + watermarks + windows + triggers + accumulators. The math here (watermark = max_seen(t_event) - allowed_lateness) is directly from this paper. Flink's SQL implements this model faithfully."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"McSherry et al. 2013 (Differential Dataflow):"}),' Frank McSherry\'s paper "Differential Dataflow" introduced the formalism that powers Materialize. The key insight: maintain a representation of changes (a "difference") rather than the full state, then recompose incrementally. This is O(changes) per input update, not O(full scan) — sub-second view updates on billion-row datasets.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Flink SQL 1.7+ (2018):"}),' Apache Flink added SQL support in 1.1 (2016), matured in 1.7 (2018). The stream-table duality — "a Table is a Stream, a Stream is a Table" — is Flink\'s signature. Temporal joins (FOR SYSTEM_TIME AS OF) and MATCH_RECOGNIZE (CEP) came in 1.7+ and 1.8+. Now used by Netflix, Uber, Alibaba, ByteDance for real-time analytics.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Materialize production (2020+):"})," Materialize Inc's commercial offering of differential dataflow as a PostgreSQL-wire streaming SQL engine. Used by Stripe (fraud detection), Cloudflare (real-time observability), and Capital One (real-time risk). Differential dataflow gives sub-second materialised view updates on multi-billion-row Kafka topics."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"RisingWave production (2023+):"})," RisingWave Labs (founded 2022) shipped a streaming SQL engine with Hummock storage (S3-backed LSM-tree). Used by Ant Group (real-time fintech analytics) and Mercedes-Benz (connected car telemetry). State is checkpointed to S3, recovery is fast — a key differentiator vs Flink's RocksDB."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Spark Structured Streaming production (2016+):"})," Spark 2.0 (2016) introduced Structured Streaming with event-time + watermarks + the same SQL API as Spark SQL. MERGE INTO (CDC) came in Spark 3.0 (2020). Used by Netflix (recommendations), Uber (fraud), and Pinterest (real-time analytics). Lower engineering cost than Flink if you already have Spark."]})]})}),(0,t.jsx)(n.SectionCard,{title:"My deeper thought: Streaming SQL IS the unification of streams and tables",description:"The unifying view: stream-table duality is the most important idea in modern data engineering. The same SQL runs on bounded and unbounded data — the engine picks the execution model.",icon:(0,t.jsx)(T.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Stream-table duality IS the end of the Lambda architecture."}),' The Lambda architecture (Marz 2011) ran two pipelines: batch (Hadoop, daily) for correctness and speed (Storm, sub-second) for freshness. They had to be reconciled. Flink\'s stream-table duality — "a Table is a Stream (changelog), a Stream is a Table (snapshot)" — means the SAME SQL runs as a batch job or a streaming job. The Lambda reconciliation problem disappears: one engine, one SQL, one set of semantics. Kappa architecture (Kreps 2014) is the operational expression of duality.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Watermarks ARE the streaming analogue of transaction boundaries."}),' In a batch database, a transaction commits all rows atomically — you see all-or-nothing. In a streaming system, you can\'t wait for the "end of the stream" (it\'s infinite). The watermark is the streaming analogue: it declares "the data up to time W(t) is now complete — finalise windows with end ≤ W(t)". Just like a transaction\'s COMMIT, a watermark passing a window end is the trigger for emitting a result. This is why watermarks must be monotonic — non-monotonic watermarks would violate the streaming equivalent of ACID.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Differential dataflow IS the algorithmic foundation of streaming mat views."})," Traditional materialised views recompute the full table on refresh — useless for streaming (you'd refresh forever). Differential dataflow (McSherry) maintains a representation of ",(0,t.jsx)("em",{children:"changes"})," rather than state, and propagates those changes through the query DAG. The math: a view V = SELECT ... FROM source is a function V(source); differential dataflow computes V(source + δ) - V(source) incrementally, where δ is the change. This is the streaming analogue of Newton's method (compute the next approximation from the previous + derivative). It's why Materialize and RisingWave give sub-second updates on billion-row views."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Window types ARE projections of an unbounded stream onto bounded views."}),' The three windows are three ways to slice an unbounded stream into bounded windows. TUMBLE: disjoint partition (like an SQL GROUP BY on the time bucket). HOP: overlapping partition (like a sliding-window pandas .rolling). SESSION: dynamic partition (data-driven, like clustering on the gap). The choice depends on the question — TUMBLE for "per-minute", HOP for "rolling 60s as of now", SESSION for "activity bursts". All three finalise on the watermark — they\'re bounded views projected from an unbounded stream. SQL makes this projection declarative.']})]})}),(0,t.jsx)(n.SectionCard,{title:"Related Elegant Code — the math that walks across disciplines",description:"This page's math appears in unexpected places. The Elegant Code cards show the same equation in 3+ sciences — click to explore the collision.",icon:(0,t.jsx)(b.Sparkles,{className:"h-5 w-5"}),badge:"Cross-domain",children:(0,t.jsx)("div",{className:"grid md:grid-cols-1 gap-3",children:(0,t.jsxs)(a.default,{href:(0,u.hrefFor)("elegant-code"),className:"group flex items-start gap-3 rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary",children:"26"}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-medium group-hover:text-primary transition-colors",children:"Reservoir Sampling"}),(0,t.jsx)("p",{className:"text-[10px] font-mono text-muted-foreground mt-0.5",children:"P(item_i in sample) = k/N"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1 leading-relaxed",children:"Streaming SQL TABLESAMPLE uses reservoir sampling for uniform row selection from unbounded streams — same algorithm as Kafka stream sampling and GWAS subsampling."})]})]})})}),(0,t.jsxs)(v.DeeperThoughtSection,{pageTitle:"Streaming SQL",children:[(0,t.jsx)(v.DeeperThought,{title:"Streaming SQL IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Streaming SQL is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Streaming SQL connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Streaming SQL sits in the computational-science landscape."})}),(0,t.jsx)(v.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Streaming SQL) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(v.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(v.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(v.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(m.RelatedTopics,{topics:[{id:"flink",reason:"Apache Flink — the underlying runtime for Flink SQL"},{id:"spark-streaming",reason:"Spark Structured Streaming — the underlying runtime"},{id:"streaming",reason:"Real-time streaming overview — Kafka, Flink, Pulsar"},{id:"kafka",reason:"Kafka — the de-facto stream source for streaming SQL"},{id:"data-mesh-deep-dive",reason:"Streaming data products use SQL materialised views"},{id:"data-contracts-deep-dive",reason:"Contracts enforce schemas on stream sources"},{id:"clickhouse",reason:"ClickHouse for sub-second OLAP on streaming sinks"},{id:"iceberg",reason:"Iceberg as the lakehouse sink for streaming pipelines"}]}),(0,t.jsx)(o.ResearchDemo,{pageId:"streaming-sql"}),(0,t.jsx)(l.TrendAnticipation,{pageId:"streaming-sql"}),(0,t.jsx)(r.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"flink",reason:"Apache Flink — the underlying runtime for Flink SQL"},{id:"spark-streaming",reason:"Spark Structured Streaming — the underlying runtime"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,u.hrefFor)("flink"),className:"text-sm text-primary hover:underline",children:"→ Apache Flink (the engine behind Flink SQL)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,u.hrefFor)("spark-streaming"),className:"text-sm text-primary hover:underline",children:"→ Spark Structured Streaming"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,u.hrefFor)("data-mesh-deep-dive"),className:"text-sm text-primary hover:underline",children:"→ Data Mesh Deep Dive (data products + federated governance)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,u.hrefFor)("streaming"),className:"text-sm text-primary hover:underline",children:"→ Real-time Streaming Overview"})]})]})}e.s(["StreamingSqlPage",()=>O])}]);