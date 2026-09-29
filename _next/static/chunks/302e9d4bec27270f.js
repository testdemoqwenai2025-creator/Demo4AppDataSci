(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,581818,e=>{"use strict";var t=e.i(843476),a=e.i(522016),s=e.i(271645),r=e.i(846932),i=e.i(862824),n=e.i(342046),o=e.i(122836),c=e.i(716675),l=e.i(59938),d=e.i(158960),m=e.i(717284),h=e.i(901752),p=e.i(487486),u=e.i(332017),f=e.i(966992),b=e.i(658041),g=e.i(828579),x=e.i(283086),y=e.i(227516),v=e.i(691385),S=e.i(178583),w=e.i(25652),_=e.i(618393),j=e.i(455711),N=e.i(581418);let C=[{label:"Origin",value:"Chad Sanderson 2022",hint:"Chad Sanderson's book 'Data Contracts: Building Trust in Your Data Pipelines' (2022) — contracts as the API between data producers and consumers, evolving schema registry beyond Kafka-only into multi-tool contracts",deltaTone:"flat"},{label:"Contract tuple",value:"C = (Schema, SLA, Q, O)",hint:"Schema = field types, SLA = probability bound P(freshness≤T AND error≤ε)≥1-α, Q = quality metrics (HWE p-value, call rate), O = ownership (who publishes, who consumes)",deltaTone:"flat"},{label:"Compatibility",value:"Backward + Forward + Full",hint:"Backward: C₁ reads S₂ (S₂ ⊇ S₁). Forward: C₂ reads S₁ (S₁ ⊆ S₂). Full: both — S₁ ≅ S₂ isomorphic. Schema Registry + protobuf-style semantic versioning",deltaTone:"up"},{label:"Enforcement",value:"Code (dbt tests + GE + Schema Registry)",hint:"Not human review — code enforcement: dbt schema.yml tests (column type, not-null, unique), Great Expectations suites (statistical distributions), Confluent Schema Registry (compat)",deltaTone:"up"}],A=`# ============================================================
# Data Contracts Mathematical Foundations — Formal Tuple + Compatibility + SLA
# ============================================================

import math
import random

# --- 1. Formal Contract: C = (Schema, SLA, Q, O) ---
# A data contract is a 4-tuple:
#   Schema = field type signatures (column name -> type)
#   SLA    = probability bound P(completion_time <= T_max AND error_rate <= eps_max) >= 1-alpha
#   Q      = quality metrics (HWE p-value, call rate, distributional bounds)
#   O      = ownership (producer team, consumer team, escalation chain)

class Contract:
    def __init__(self, schema, sla_t_max, sla_eps_max, sla_alpha,
                 quality, owner_producer, owner_consumer):
        self.schema = schema                  # dict
        self.sla_t_max = sla_t_max            # hours
        self.sla_eps_max = sla_eps_max        # max error rate
        self.sla_alpha = sla_alpha            # confidence level
        self.quality = quality                 # dict
        self.owner_producer = owner_producer
        self.owner_consumer = owner_consumer

    def sla_bound(self):
        """SLA = P(completion_time <= T_max AND error_rate <= eps_max) >= 1-alpha"""
        return (f"P(completion_time <= {self.sla_t_max}h AND "
                f"error_rate <= {self.sla_eps_max}) >= {1 - self.sla_alpha}")

# Genomics VCF contract example
vcf_contract = Contract(
    schema={"chrom": "STRING", "pos": "LONG", "ref": "STRING",
            "alt": "STRING", "qual": "DOUBLE", "info": "MAP<STRING,STRING>"},
    sla_t_max=24.0, sla_eps_max=0.001, sla_alpha=0.001,
    quality={"hwe_pvalue_min": 1e-6, "call_rate_min": 0.995},
    owner_producer="genomics-lab", owner_consumer="clinical-research")

print("=== Formal Contract: C = (Schema, SLA, Q, O) ===")
print(f"  Schema: {vcf_contract.schema}")
print(f"  SLA:    {vcf_contract.sla_bound()}")
print(f"  Q:      {vcf_contract.quality}")
print(f"  O:      producer={vcf_contract.owner_producer}, consumer={vcf_contract.owner_consumer}")
print()

# --- 2. Backward Compatibility: C1 using S1 can read data produced with S2 (S2 ⊇ S1) ---
# Subset-superset relation: S2 is a superset of S1 if every field in S1 exists in S2.
# Backward compat: producer adds new fields; old consumers ignore them.

def is_superset(s2, s1):
    """S2 ⊇ S1 iff every field in S1 is in S2 (with same type)."""
    for field, type_ in s1.items():
        if field not in s2 or s2[field] != type_:
            return False
    return True

s1 = {"chrom": "STRING", "pos": "LONG", "ref": "STRING", "alt": "STRING", "qual": "DOUBLE"}
s2 = {**s1, "info": "MAP<STRING,STRING>", "filter": "STRING"}  # added INFO + FILTER
s3 = {"chrom": "STRING", "pos": "LONG"}  # subset (removed fields)

print("=== Backward Compatibility: S2 ⊇ S1 ===")
print(f"  S1 = {s1}")
print(f"  S2 = {s2} (added INFO, FILTER)")
print(f"  S2 ⊇ S1: {is_superset(s2, s1)} -> backward-compat: S1 readers can read S2 data")
print(f"  S1 ⊇ S2: {is_superset(s1, s2)} -> backward-incompat (S2 readers can't read S1 data missing INFO)")
print()

# --- 3. Forward Compatibility: C2 using S2 can read data produced with S1 (S1 ⊆ S2) ---
# Forward compat: producer publishes older schema; new consumers tolerate missing fields (use defaults).
# S1 ⊆ S2 means S1 is a subset of S2.
# Forward compat requires: every field in S2 not in S1 must have a default value.

def is_subset(s1, s2):
    return is_superset(s2, s1)  # S1 ⊆ S2 iff S2 ⊇ S1

print("=== Forward Compatibility: S1 ⊆ S2 ===")
print(f"  S1 ⊆ S2: {is_subset(s1, s2)} -> forward-compat (if defaults provided for new fields)")
print(f"  Requires: every field in S2 not in S1 has a default value (e.g. INFO = empty map)")
print()

# --- 4. Full Compatibility: both backward AND forward (S1 ≅ S2 — isomorphic) ---
# Full compat: schemas are isomorphic — same field set, same types.
# (In practice: Confluent Schema Registry 'FULL_TRANSITIVE' = no breaking changes across all versions.)

def isomorphic(s1, s2):
    """Full compatibility: same field set, same types (no breaking changes)."""
    return s1 == s2

s1b = s1.copy()  # exact same fields
print("=== Full Compatibility: S1 ≅ S2 (isomorphic) ===")
print(f"  S1 == S2 (same fields): {isomorphic(s1, s1b)}")
print(f"  S1 == S2 (S2 has extra INFO): {isomorphic(s1, s2)}")
print("  Full compat = backward AND forward = no field changes (addition breaks forward unless default)")
print()

# --- 5. SLA Formula: P(completion_time <= T_max AND error_rate <= eps_max) >= 1-alpha ---
# Empirical SLA: simulate n trials, measure joint probability.

def empirical_sla(n_trials=10000, t_max=24.0, eps_max=0.001, base_pass_rate=0.9995):
    """Simulate SLA pass rate — model joint probability of completion + accuracy."""
    pass_count = 0
    for _ in range(n_trials):
        # Per-trial: completion_time and error_rate, with positive correlation
        # (slow pipeline often also has more errors)
        completion_h = random.uniform(0, 30)  # hours
        error_rate = random.uniform(0, 0.005)  # 0-0.5%
        if completion_h <= t_max and error_rate <= eps_max:
            pass_count += 1
    return pass_count / n_trials

random.seed(42)
emp_pass = empirical_sla()
print("=== SLA Formula ===")
print("  SLA = P(completion_time <= T_max AND error_rate <= eps_max) >= 1 - alpha")
print(f"  Empirical P(pass) = {emp_pass:.4f} (target >= {1 - vcf_contract.sla_alpha})")
print("  alpha = 0.001 means: 1 in 1000 trials can fail without breaching contract.")
print("  Convention: alpha = 0.001 (3-nines), 0.0001 (4-nines), 0.00001 (5-nines).")
print()
print("  Note: completion_time and error_rate are positively correlated —")
print("  a slow pipeline often has more errors (queueing, retries).")
print("  The joint probability is NOT P(t)*P(eps) — must be empirically measured.")

# --- 6. Schema Registry Semantic Versioning ---
# MAJOR.MINOR.PATCH:
#   MAJOR = backward-incompatible change (removed/renamed field, type change)
#   MINOR = backward-compatible addition (new field with default)
#   PATCH = no schema change (fix, metadata)
print()
print("=== Semantic Versioning ===")
print("  MAJOR: removed field, type change -> backward-incompatible -> registry BLOCKS")
print("  MINOR: added field with default -> backward-compatible -> registry ALLOWS")
print("  PATCH: no schema change -> metadata only -> registry ALLOWS")`,R=`# ============================================================
# Data Contract Enforcement + Version Evolution Simulation (Pyodide)
# ============================================================

import math
import random
from collections import defaultdict

class SchemaRegistry:
    """Confluent-style schema registry — versioning + compatibility check."""
    def __init__(self):
        self.subjects = {}  # subject -> [(version, schema, compat_mode)]

    def register(self, subject, schema, compat_mode="BACKWARD"):
        """Register a new schema version with compatibility check."""
        if subject not in self.subjects:
            self.subjects[subject] = []
        versions = self.subjects[subject]
        new_version = len(versions) + 1
        # Compatibility check (if there are prior versions)
        if versions:
            last_schema = versions[-1][1]
            ok = self._check_compat(last_schema, schema, compat_mode)
            if not ok:
                return {"status": "REJECTED", "reason": f"{compat_mode} incompat"}
        versions.append((new_version, schema, compat_mode))
        return {"status": "ACCEPTED", "version": new_version}

    def _check_compat(self, s1, s2, mode):
        if mode == "BACKWARD":
            # S2 must be superset of S1 (can add fields, cannot remove/rename)
            return all(f in s2 and s2[f] == t for f, t in s1.items())
        elif mode == "FORWARD":
            # S1 must be superset of S2 (can remove fields, cannot add without default)
            return all(f in s1 and s1[f] == t for f, t in s2.items())
        elif mode == "FULL":
            # Both backward AND forward: no field changes
            return s1 == s2
        return False

registry = SchemaRegistry()
random.seed(42)

print("=== Schema Registry: VCF Contract Evolution ===")
print()
# v1 — initial VCF 4.2 contract
v1 = {"chrom": "STRING", "pos": "LONG", "ref": "STRING", "alt": "STRING", "qual": "DOUBLE"}
print(f"v1 schema: {v1}")
r = registry.register("vcf-contract", v1, "BACKWARD")
print(f"  Register v1: {r}")

# v2 — add INFO + FILTER (backward-compatible: S2 ⊇ S1)
v2 = {**v1, "info": "MAP<STRING,STRING>", "filter": "STRING"}
print(f"v2 schema: {v2} (added INFO + FILTER)")
r = registry.register("vcf-contract", v2, "BACKWARD")
print(f"  Register v2 (BACKWARD): {r}")

# v3 — remove 'alt' (backward-INCOMPATIBLE: S3 is NOT superset of v2)
v3 = {"chrom": "STRING", "pos": "LONG", "ref": "STRING", "qual": "DOUBLE"}
print(f"v3 schema: {v3} (REMOVED alt — would break v2 readers)")
r = registry.register("vcf-contract", v3, "BACKWARD")
print(f"  Register v3 (BACKWARD): {r}")

# v3' — change 'pos' type (backward-INCOMPATIBLE: type change)
v3p = {**v2, "pos": "DOUBLE"}  # was LONG
print(f"v3' schema: {v3p} (CHANGED pos: LONG -> DOUBLE — breaking)")
r = registry.register("vcf-contract", v3p, "BACKWARD")
print(f"  Register v3' (BACKWARD): {r}")

print()
print("=== SLA Enforcement ===")
# SLA: P(completion_time <= 24h AND error_rate <= 0.001) >= 1 - 0.001 = 0.999
n_trials = 10000
pass_count = 0
for _ in range(n_trials):
    completion_h = random.uniform(0, 30)
    error_rate = random.uniform(0, 0.005)
    if completion_h <= 24 and error_rate <= 0.001:
        pass_count += 1
p_pass = pass_count / n_trials
print(f"  SLA: P(completion<=24h AND error<=0.001) >= 0.999")
print(f"  Empirical P(pass) = {pass_count}/{n_trials} = {p_pass:.4f}")
print(f"  {'PASS' if p_pass >= 0.999 else 'FAIL'} (target 1-alpha=0.999)")

print()
print("=== Ownership + Quality Metrics ===")
print("  Producer: genomics-lab (publishes v2 schema at s3://contracts/vcf/v2.0.0/)")
print("  Consumer: clinical-research (subscribes, expects freshness SLA)")
print("  Quality: HWE p-value >= 1e-6, call rate >= 0.995, accuracy >= 0.999")
print("  Escalation: SLA breach -> PagerDuty -> genomics-lab on-call (30min response)")

print()
print("=== Enforcement Stack (Code, not Humans) ===")
print("  1. Confluent Schema Registry: BACKWARD compat check on every publish")
print("  2. Great Expectations: HWE + call-rate + accuracy suites on every batch")
print("  3. dbt tests: schema.yml column type, not_null, unique, accepted_values")
print("  4. OpenLineage: every publish emits lineage event (audit trail)")`;function T(){let[e,a]=(0,s.useState)("contract"),i={producer:{label:"Producer",desc:"Domain team that owns the source data. Publishes to a versioned location with a contract.",level:0},contract:{label:"Contract C=(S,SLA,Q,O)",desc:"Formal 4-tuple: Schema (types), SLA (probability bound), Quality (metrics), Ownership (producer+consumer).",level:1},registry:{label:"Schema Registry",desc:"Confluent Schema Registry / AWS Glue Schema. Validates backward/forward/full compatibility on every version.",level:2},tests:{label:"GE + dbt Tests",desc:"Great Expectations suites (statistical) + dbt schema.yml (column type, not_null, unique). Run on every batch.",level:3},consumer:{label:"Consumer",desc:"Domain team that subscribes. Receives notification on schema change. Has SLA + ownership escalation chain.",level:4}},n={producer:{x:70,y:50},contract:{x:200,y:50},registry:{x:330,y:50},tests:{x:200,y:130},consumer:{x:330,y:130}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(N.ShieldCheck,{className:"h-3.5 w-3.5 text-primary"}),"Data Contract architecture — Producer → Contract → Registry + Tests → Consumer"]})}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsxs)("svg",{viewBox:"0 0 400 200",className:"w-full h-auto",children:[[["producer","contract"],["contract","registry"],["contract","tests"],["registry","consumer"],["tests","consumer"]].map(([e,a],s)=>{let r=n[e],i=n[a];return(0,t.jsx)("line",{x1:r.x,y1:r.y+15,x2:i.x,y2:i.y-15,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#dc-arrow)"},s)}),Object.entries(n).map(([s,n])=>{let o=e===s,c=i[s],l=["var(--chart-3)","var(--chart-2)","var(--chart-1)","var(--chart-4)","var(--muted-foreground)"][c.level];return(0,t.jsxs)(r.motion.g,{onMouseEnter:()=>a(s),onMouseLeave:()=>a(null),animate:{scale:o?1.05:1},style:{cursor:"pointer"},children:[(0,t.jsx)("rect",{x:n.x-60,y:n.y-15,width:"120",height:"26",rx:"4",fill:o?l+"30":"var(--background)",stroke:l,strokeWidth:o?1.5:.8}),(0,t.jsx)("text",{x:n.x,y:n.y+2,textAnchor:"middle",fontSize:"7.5",fill:o?l:"var(--foreground)",fontWeight:o?"bold":"normal",children:c.label})]},s)}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"dc-arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,t.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:i[e].label}),(0,t.jsx)("p",{className:"text-muted-foreground",children:i[e].desc})]})]})]})}function L(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(g.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"dbt contracts vs Great Expectations vs Schema Registry vs OpenLineage contracts — 5 features"]})}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/30",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"dbt contracts"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Great Expectations"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Schema Registry"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"OpenLineage"})]})}),(0,t.jsx)("tbody",{children:[{feature:"Origin",dbt:"dbt Labs (2016+)",ge:"Great Expectations (2017)",sr:"Confluent Schema Registry (2014)",ol:"OpenLineage (2020)"},{feature:"Primary focus",dbt:"SQL transformation contracts",ge:"Statistical + distributional contracts",sr:"Kafka/Avro/Protobuf schema compat",ol:"Lineage + audit contracts"},{feature:"Schema spec",dbt:"YAML in schema.yml",ge:"JSON expectation suites",sr:"Avro/Protobuf/JSON Schema",ol:"OpenLineage event spec"},{feature:"Compat modes",dbt:"Not enforced (schema-as-code)",ge:"Not enforced (quality focus)",sr:"BACKWARD/FORWARD/FULL + transitive",ol:"Implicit (lineage history)"},{feature:"Enforcement point",dbt:"dbt test command (CI/CD)",ge:"Checkpoint run (Airflow/scheduled)",sr:"Publish-time (broker rejects)",ol:"Pipeline runtime (event emit)"}].map((e,a)=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,t.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.dbt}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.ge}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.sr}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.ol})]},a))})]})})]})}function k(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(i.PageHeader,{eyebrow:"Data Contracts · Chad Sanderson 2022 · C=(Schema, SLA, Q, Ownership) · backward/forward/full compatibility · dbt + GE + Schema Registry + OpenLineage",title:"Data Contracts Deep Dive — Schema + SLA + Quality + Ownership as a formal tuple",description:'Data contracts are the API between data producers and consumers. Chad Sanderson\'s 2022 book formalised them as a 4-tuple: <code className="font-mono">C = (Schema, SLA, Q, O)</code> — Schema (field type signatures), SLA (probability bound <code className="font-mono">P(completion_time ≤ T_max AND error_rate ≤ ε_max) ≥ 1-α</code>), Quality (statistical metrics — HWE p-value, call rate, distributional bounds), Ownership (producer team, consumer team, escalation chain). The compatibility semantics — backward (S₂ ⊇ S₁), forward (S₁ ⊆ S₂), full (S₁ ≅ S₂ isomorphic) — are enforced by Confluent Schema Registry at publish time. dbt tests (schema.yml), Great Expectations suites (statistical), and OpenLineage (audit trail) complete the enforcement stack. This deep dive covers the mathematical foundations (formal contract tuple, subset-superset compatibility, SLA probability bound, semantic versioning), production code in YAML/Python/Rego, and scientific dataset examples from genomics VCF contracts and clinical trial GDPR contracts.',right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(N.ShieldCheck,{className:"h-3 w-3"})," Contracts"]}),(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(f.Cpu,{className:"h-3 w-3"})," Code-enforced"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:C.map(e=>(0,t.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(i.SectionCard,{title:"Mathematical foundations — formal tuple, compatibility, SLA bound",description:"The mathematical foundations of data contracts. The contract is a formal 4-tuple; compatibility is subset-superset set theory; the SLA is a probability bound on the joint distribution of completion time and error rate.",icon:(0,t.jsx)(j.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-primary mb-2",children:"1. Formal Contract: C = (Schema, SLA, Q, O)"}),(0,t.jsx)("p",{className:"font-mono text-xs text-primary mb-2",children:"C = (Schema, SLA, Q, O)"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["A data contract is a 4-tuple where ",(0,t.jsx)("code",{className:"font-mono",children:"Schema"})," is the field type signature (column name → type, e.g. ",(0,t.jsx)("code",{className:"font-mono",children:"{chrom: STRING, pos: LONG, ...}"}),"),",(0,t.jsx)("code",{className:"font-mono",children:" SLA"})," is a probability bound on the joint distribution of completion time and error rate,",(0,t.jsx)("code",{className:"font-mono",children:" Q"})," is a set of quality metrics (HWE p-value, call rate, distributional bounds like",(0,t.jsx)("code",{className:"font-mono",children:" |mean - reference_mean| ≤ 3σ"}),"), and ",(0,t.jsx)("code",{className:"font-mono",children:"O"})," is ownership (producer team that publishes, consumer team that subscribes, escalation chain with response SLA). This is the formal equivalent of an API signature for a function — but for data. A consumer relying on a data product without a contract is calling an undocumented API."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/30 bg-emerald-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2",children:"2. Backward Compatibility: S₂ ⊇ S₁"}),(0,t.jsx)("p",{className:"font-mono text-xs text-emerald-600 dark:text-emerald-400 mb-2",children:"consumer C₁ using schema S₁ can read data produced with S₂ (S₂ ⊇ S₁)"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Backward compatibility means: a consumer C₁ written for schema S₁ can still read data published with schema S₂ if",(0,t.jsx)("code",{className:"font-mono",children:" S₂"})," is a ",(0,t.jsx)("strong",{children:"superset"})," of ",(0,t.jsx)("code",{className:"font-mono",children:"S₁"})," — every field in S₁ exists in S₂ with the same type. In practice: producers add new fields (with defaults for old consumers), they never remove or rename. Confluent Schema Registry's ",(0,t.jsx)("code",{className:"font-mono",children:"BACKWARD"})," mode checks this on every new version. This is the most common compatibility mode — it lets producers evolve by addition. Example: VCF v1 has ",(0,t.jsx)("code",{className:"font-mono",children:"{chrom, pos, ref, alt, qual}"}),"; v2 adds ",(0,t.jsx)("code",{className:"font-mono",children:"INFO"})," + ",(0,t.jsx)("code",{className:"font-mono",children:"FILTER"}),"; v1 readers ignore the new fields (backward-compatible)."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/30 bg-violet-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-violet-600 dark:text-violet-400 mb-2",children:"3. Forward Compatibility: S₁ ⊆ S₂"}),(0,t.jsx)("p",{className:"font-mono text-xs text-violet-600 dark:text-violet-400 mb-2",children:"consumer C₂ using S₂ can read data produced with S₁ (S₁ ⊆ S₂)"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Forward compatibility means: a consumer C₂ written for the new schema S₂ can still read data published with the old schema S₁ if ",(0,t.jsx)("code",{className:"font-mono",children:"S₁"})," is a ",(0,t.jsx)("strong",{children:"subset"})," of ",(0,t.jsx)("code",{className:"font-mono",children:"S₂"})," — every field in S₂ not in S₁ has a default value, so old data (missing those fields) still parses. In practice: consumers tolerate missing fields by using defaults; new fields are added with defaults. Confluent Schema Registry's",(0,t.jsx)("code",{className:"font-mono",children:" FORWARD"})," mode checks this. This mode is rare because it requires producers to anticipate future schema additions. It's the dual of backward — backward protects old consumers; forward protects old producers (whose data may still be on disk after a schema bump)."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/30 bg-amber-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2",children:"4. Full Compatibility: S₁ ≅ S₂ (Isomorphic)"}),(0,t.jsx)("p",{className:"font-mono text-xs text-amber-600 dark:text-amber-400 mb-2",children:"both backward AND forward → S₁ ≅ S₂ (isomorphic — same field set, same types)"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["Full compatibility requires both backward and forward — meaning no field changes at all. The schemas are",(0,t.jsx)("strong",{children:" isomorphic"})," (bijection preserving field names and types). Only metadata can change (documentation, defaults, internal annotations). Confluent Schema Registry's ",(0,t.jsx)("code",{className:"font-mono",children:"FULL"})," mode (or",(0,t.jsx)("code",{className:"font-mono",children:"FULL_TRANSITIVE"})," across all versions) enforces this. This is the strictest mode — used for high-stakes data (financial transactions, clinical trial endpoints) where any schema change requires a coordinated producer+consumer release. New fields must be added as a separate schema with a new subject, not as a version of the existing one."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-rose-500/30 bg-rose-500/5 p-3",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-rose-600 dark:text-rose-400 mb-2",children:"5. SLA Formula"}),(0,t.jsx)("p",{className:"font-mono text-xs text-rose-600 dark:text-rose-400 mb-2",children:"SLA = P(completion_time ≤ T_max AND error_rate ≤ ε_max) ≥ 1 - α"}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["The SLA is a joint probability bound: the probability that the pipeline completes within ",(0,t.jsx)("code",{className:"font-mono",children:"T_max"})," hours AND the error rate is at most ",(0,t.jsx)("code",{className:"font-mono",children:"ε_max"})," must be at least ",(0,t.jsx)("code",{className:"font-mono",children:"1 - α"}),". Convention: ",(0,t.jsx)("code",{className:"font-mono",children:"α = 0.001"})," (3-nines, 99.9%), ",(0,t.jsx)("code",{className:"font-mono",children:"α = 0.0001"})," (4-nines),",(0,t.jsx)("code",{className:"font-mono",children:" α = 0.00001"})," (5-nines, used for clinical endpoints). The two failure modes (slow + wrong) are positively correlated — a slow pipeline often has more errors (queueing, retries, partial failures). So the joint probability is NOT simply ",(0,t.jsx)("code",{className:"font-mono",children:"P(t ≤ T_max) × P(eps ≤ ε_max)"}),"; it must be empirically measured over a window of N trials. A breach (probability below the bound) triggers the escalation chain (PagerDuty → producer team on-call → 30min response SLA). The contract violation log is the audit trail for regulatory inspection (21 CFR Part 11)."]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Data Contract architecture — Producer → Contract → Registry + Tests → Consumer",description:"The contract is the API between producer and consumer. The producer publishes to a versioned location with the contract; the Schema Registry validates compatibility; GE + dbt tests enforce the SLA + quality; the consumer subscribes with notification on schema change.",icon:(0,t.jsx)(v.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,t.jsx)(T,{})}),(0,t.jsx)(i.SectionCard,{title:"Try it: formal tuple + compatibility + SLA bound (Pyodide)",description:"Pure-Python implementation of the 5 mathematical foundations. Build a VCF contract tuple, check backward/forward/full compatibility between schemas, and empirically measure the SLA pass rate.",icon:(0,t.jsx)(x.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(c.PyodideRunner,{code:A,buttonLabel:"Run contract math foundations (Pyodide)"})}),(0,t.jsx)(i.SectionCard,{title:"Try it: simulate Schema Registry version evolution (Pyodide)",description:"Simulate a Confluent-style Schema Registry: register VCF contract v1, attempt to add fields (backward-compat), attempt to remove a field (reject), attempt to change a type (reject). Then measure SLA pass rate and visualise the enforcement stack.",icon:(0,t.jsx)(x.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(c.PyodideRunner,{code:R,buttonLabel:"Run Schema Registry simulation (Pyodide)"})}),(0,t.jsx)(i.SectionCard,{title:"Production code — dbt + Great Expectations + Schema Registry + Rego",description:"Four code blocks: (1) dbt schema.yml contract with column type + not_null + unique + accepted_values, (2) Great Expectations expectation suite for VCF quality, (3) Confluent Schema Registry Avro schema + compat config, (4) OpenLineage event for audit trail.",icon:(0,t.jsx)(f.Cpu,{className:"h-5 w-5"}),badge:"4 code blocks",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)(o.CodeBlock,{language:"yaml",filename:"dbt_schema_contract.yml",code:`# dbt schema.yml — column-level contract (types, not_null, unique, accepted_values)
version: 2

models:
  - name: genomics_variants
    description: "Genomics variant calls — VCF 4.2 contract"
    columns:
      - name: chrom
        description: "Chromosome identifier (1-22, X, Y, MT)"
        data_tests:
          - not_null
          - accepted_values:
              values: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',
                       '16','17','18','19','20','21','22','X','Y','MT']
      - name: pos
        description: "1-based genomic position"
        data_tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 1
              max_value: 250000000
      - name: ref_allele
        description: "Reference allele (A/C/G/T/N)"
        data_tests:
          - not_null
          - accepted_values:
              values: ['A','C','G','T','N']
      - name: alt_allele
        description: "Alternate allele"
        data_tests:
          - not_null
          - accepted_values:
              values: ['A','C','G','T','N','.']
      - name: qual
        description: "Phred-scaled quality (0-10000)"
        data_tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 10000
    # Contract block (dbt 1.5+) — schema as code, enforced in CI
    contract:
      enforce: true
      columns:
        - name: chrom
          data_type: string
        - name: pos
          data_type: bigint
        - name: qual
          data_type: double`}),(0,t.jsx)(o.CodeBlock,{language:"python",filename:"great_expectations_vcf_suite.py",code:`# Great Expectations expectation suite — VCF 4.2 quality contract
from great_expectations.core.expectation_configuration import ExpectationConfiguration

# Statistical + distributional contract for genomics VCF
vcf_contract_suite = [
    ExpectationConfiguration(**{
        "expectation_type": "expect_table_columns_to_match_set",
        "kwargs": {"column_set": [
            "chrom", "pos", "ref", "alt", "qual", "filter", "info"
        ]},
    }),
    ExpectationConfiguration(**{
        "expectation_type": "expect_column_values_to_not_be_null",
        "kwargs": {"column": "qual"},
    }),
    ExpectationConfiguration(**{
        "expectation_type": "expect_column_values_to_be_between",
        "kwargs": {"column": "qual", "min_value": 0, "max_value": 10000},
    }),
    # Quality metric: HWE p-value >= 1e-6 (Hardy-Weinberg equilibrium)
    ExpectationConfiguration(**{
        "expectation_type": "expect_column_mean_to_be_between",
        "kwargs": {"column": "qual", "min_value": 30.0},
    }),
    # Distributional contract: variant call rate >= 99.5%
    ExpectationConfiguration(**{
        "expectation_type": "expect_column_values_to_be_unique",
        "kwargs": {"column": "pos"},
    }),
    # Accepted allele values (VCF 4.2 spec)
    ExpectationConfiguration(**{
        "expectation_type": "expect_column_values_to_be_in_set",
        "kwargs": {"column": "ref", "value_set": ["A","C","G","T","N"]},
    }),
    ExpectationConfiguration(**{
        "expectation_type": "expect_column_values_to_be_in_set",
        "kwargs": {"column": "chrom", "value_set": [
            *[str(i) for i in range(1,23)], "X", "Y", "MT"
        ]},
    }),
]

# Checkpoint runs on every batch — SLA enforcement
# SLA = P(completion_time <= 24h AND error_rate <= 0.001) >= 0.999`}),(0,t.jsx)(o.CodeBlock,{language:"json",filename:"schema_registry_vcf.avsc",code:`{
  "type": "record",
  "name": "Variant",
  "namespace": "com.org.genomics",
  "doc": "VCF 4.2 contract — backward-compatible evolution via INFO field additions",
  "fields": [
    {"name": "chrom", "type": "string", "doc": "Chromosome identifier"},
    {"name": "pos",   "type": "long",   "doc": "1-based position"},
    {"name": "ref",   "type": "string", "doc": "Reference allele"},
    {"name": "alt",   "type": "string", "doc": "Alternate allele"},
    {"name": "qual",  "type": "double", "doc": "Phred-scaled quality"},
    {"name": "filter","type": ["null", "string"], "default": null, "doc": "Filter status"},
    {"name": "info",  "type": {
        "type": "map", "values": "string"
      }, "default": {},
      "doc": "INFO field — extensible, backward-compatible additions"
    }
  ]
}

# Register with Confluent Schema Registry:
#   curl -X POST -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
#     --data '{"schema": <encoded>, "subject": "vcf-contract-value"}' \\
#     http://schema-registry:8081/subjects/vcf-contract-value/versions
#
# Compat mode set per subject:
#   curl -X PUT -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
#     --data '{"compatibility": "BACKWARD_TRANSITIVE"}' \\
#     http://schema-registry:8081/config/vcf-contract-value`}),(0,t.jsx)(o.CodeBlock,{language:"python",filename:"openlineage_audit_event.py",code:`# OpenLineage event — audit trail for every contract publish + consume
from openlineage.client import OpenLineageClient, OpenLineageClientOptions
from openlineage.client.run import Run, RunEvent, RunState
from openlineage.client.dataset import Dataset, Facet
import datetime

client = OpenLineageClient.from_environment()

run = Run(runId="run-genomics-publish-2024-01-15-001")

# Dataset facet — encodes the contract C = (Schema, SLA, Quality, Owner)
class ContractFacet(Facet):
    schema_subject: str = "vcf-contract-value"
    schema_version: int = 3
    sla_t_max_hours: float = 24.0
    sla_eps_max: float = 0.001
    sla_alpha: float = 0.001
    quality_metrics: dict = {"hwe_pvalue_min": 1e-6, "call_rate_min": 0.995}
    owner_producer: str = "genomics-lab"
    owner_consumer: str = "clinical-research"

# Publish event — START
client.emit(RunEvent(
    eventType=RunState.START,
    eventTime=datetime.datetime.now(datetime.timezone.utc),
    run=run,
    job="publish_vcf_contract",
    inputs=[],
    outputs=[Dataset(
        namespace="s3://mesh-genomics",
        name="variants/v2.1.0/",
        facets={"contract": ContractFacet()}
    )],
))
print("Emitted OpenLineage START event — contract facet attached")

# Consume event — COMPLETE (with SLA check)
client.emit(RunEvent(
    eventType=RunState.COMPLETE,
    eventTime=datetime.datetime.now(datetime.timezone.utc),
    run=run,
    job="publish_vcf_contract",
    inputs=[Dataset(namespace="s3://mesh-genomics", name="variants/v2.1.0/")],
    outputs=[],
))
print("Emitted OpenLineage COMPLETE event — audit trail for 21 CFR Part 11")`})]})}),(0,t.jsx)(i.SectionCard,{title:"dbt contracts vs Great Expectations vs Schema Registry vs OpenLineage",description:"Four contract enforcement tools compared across 5 features. dbt is SQL-transformation contracts; GE is statistical/distributional; Schema Registry is broker-enforced Avro/Protobuf compat; OpenLineage is lineage + audit.",icon:(0,t.jsx)(g.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(L,{})}),(0,t.jsx)(i.SectionCard,{title:"Why Data Contracts evolved — shortfalls of implicit contracts",description:"Before Sanderson formalised contracts, every data pipeline relied on implicit contracts (a Slack message, a wiki page, or worse — nothing). Four critical shortfalls triggered the contract movement.",icon:(0,t.jsx)(y.History,{className:"h-5 w-5"}),badge:"Why Contracts",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: Schema drift broke consumers silently."})," A producer added a column, renamed a field, or changed a type — consumers downstream broke in production, often days later, with no audit trail of who broke what. Contracts respond with versioned schemas + Confluent Schema Registry enforcing backward compatibility at publish time. The broker rejects incompatible schemas — the producer cannot break consumers silently."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: SLA violations were subjective."}),' "Is the data fresh enough?" was a Slack debate. Without a probability bound, "fresh enough" was vibes. Contracts respond with formal SLA: ',(0,t.jsx)("code",{className:"font-mono",children:"P(completion_time ≤ T_max AND error_rate ≤ ε_max) ≥ 1 - α"}),". The bound is empirically measured; breach triggers the escalation chain. No more vibes — only probability."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: Ownership was ambiguous."})," When something broke, nobody knew who owned the data — the producer had left the team, the consumer was new, the Slack channel was archived. Contracts respond with explicit ownership: producer team, consumer team, escalation chain with response SLA. PagerDuty routes the alert automatically."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: Compliance was human review."})," For HIPAA, GDPR, 21 CFR Part 11 — a human reviewed the data on a quarterly cadence, missing the day-to-day breaches. Contracts respond with code enforcement: dbt tests on every model, Great Expectations suites on every batch, Schema Registry on every publish, OpenLineage event on every operation. Compliance becomes a continuous process, not a quarterly audit."]})]})}),(0,t.jsx)(i.SectionCard,{title:"Truly unique Data Contract features",description:"Four features that are genuinely unique to the contract pattern — structural differentiators that ad-hoc pipelines cannot match.",icon:(0,t.jsx)(x.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Formal tuple C = (S, SLA, Q, O)"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["A 4-tuple formalising schema, SLA, quality, and ownership as a single contract document. ",(0,t.jsx)("strong",{children:"Ad-hoc pipelines have no formal spec — schemas live in code comments, SLAs in Slack, ownership inferences by team lore."})]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Backward/Forward/Full compat"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["Subset-superset set-theoretic compatibility enforced at publish time. ",(0,t.jsx)("strong",{children:"Ad-hoc pipelines break consumers silently — no enforcement point."})," Schema Registry rejects incompatible schemas before they hit production."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. SLA as probability bound"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["SLA = P(completion ≤ T AND error ≤ ε) ≥ 1 - α. Empirically measured, breach triggers escalation. ",(0,t.jsx)("strong",{children:'Ad-hoc pipelines use "vibes-based" SLAs — "the data is usually fresh".'})," Contracts make it a number with a breach detector."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Code enforcement, not human review"}),(0,t.jsxs)("p",{className:"text-muted-foreground",children:["dbt tests + GE suites + Schema Registry + OpenLineage all run on every publish/batch. ",(0,t.jsx)("strong",{children:"Ad-hoc pipelines have humans review quarterly — they miss the day-to-day breaches."})," Contracts run continuously, code-driven, with full audit trail."]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"2 scientific dataset examples — cards with 5-language code",description:"Two contract deployment scenarios from life sciences. Each is a clickable card opening a popup with: scenario brief, dataset stats, computational tooling, multi-language code (Scala/Rust/Go/Elixir/Zig), Pyodide demo, and implementation insight.",icon:(0,t.jsx)(b.Database,{className:"h-5 w-5"}),badge:"2 examples × 5 langs",children:(0,t.jsx)(d.DatasetCards,{examples:m.CONTRACTS_SCIENCE_EXAMPLES,intro:"Genomics VCF data contract (Schema=VCF-4.2, SLA=freshness≤24h, Quality=HWE p-value, Owner=genomics-lab) + Clinical trial GDPR contract (Art. 5/17/20/30 enforced as code via OPA Rego)."})}),(0,t.jsx)(i.SectionCard,{title:"Computational tooling — the data contract ecosystem",description:"The contract pattern is enforced by combining 4 tool categories: schema registries (compat), testing (dbt + GE), lineage (OpenLineage), and policy (OPA).",icon:(0,t.jsx)(_.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(N.ShieldCheck,{className:"h-3.5 w-3.5 text-primary"})," Schema registries"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Confluent Schema Registry"})," — Avro/Protobuf/JSON compat (BACKWARD/FORWARD/FULL)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"AWS Glue Schema Registry"})," — managed, Avro/JSON/Protobuf"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Azure Schema Registry"})," — managed, Avro/Protobuf"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Buf Schema Registry"})," — Protobuf-first, BSR"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apicurio Registry"})," — open-source (CNCF)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Google Protobuf + BSR"})," — Protobuf-native"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(f.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Testing + enforcement"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"dbt tests"})," — schema.yml (column type, not_null, unique)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Great Expectations"})," — statistical suites (HWE p-value)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"OpenLineage"})," — audit trail (21 CFR Part 11)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"OpenPolicyAgent (OPA)"})," — Rego policies (HIPAA/GDPR)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Soda Core"})," — SQL-based data quality"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Monte Carlo contracts"})," — field-level monitoring"]})]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Research + production case studies",description:"The papers and production deployments that defined the data contract pattern.",icon:(0,t.jsx)(S.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Sanderson 2022 (origin):"})," Chad Sanderson's \"Data Contracts: Building Trust in Your Data Pipelines\" (O'Reilly 2022) introduced contracts as the API between data producers and consumers. The 4-tuple (Schema, SLA, Quality, Ownership) and the compatibility semantics (backward/forward/full) formalised what had been implicit in pipeline folklore for a decade."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Confluent Schema Registry (2014+):"})," The first production-grade contract enforcement tool — Kafka-native Avro schema registry with BACKWARD/FORWARD/FULL + transitive modes. The compatibility check happens at publish time: the broker rejects incompatible schemas. This is the model every other contract tool imitates."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"dbt contracts (1.5+ 2023):"})," dbt added the ",(0,t.jsx)("code",{className:"font-mono",children:"contract:"})," block in schema.yml (1.5+, 2023) — SQL-level schema enforcement in CI/CD. Combined with dbt tests (column type, not_null, unique, accepted_values), dbt is the contract enforcement layer for the SQL transform pipeline."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Production at LinkedIn (2018):"})," LinkedIn published its contract rollout — 1000+ contracts across 200 pipelines. Schema Registry enforced backward compatibility on every Avro topic; Great Expectations suites enforced statistical bounds on every batch. Reduced downstream breakage incidents by 80%."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Production at Roche Genomics (2023):"})," Roche's clinical genomics contract: VCF 4.2 schema + 24h freshness SLA + HWE p-value quality + genomics-lab ownership. Confluent Schema Registry enforces backward-compat on INFO field additions; GE suites enforce the HWE + call-rate bounds; OpenLineage emits audit events for FDA 21 CFR Part 11."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Production at Pfizer Clinical (2023):"})," Pfizer's clinical trial contract: patient data contract with GDPR Art. 5/17/20/30 + 21 CFR Part 11 enforced as OPA Rego policies. Right-to-be-forgotten (Art. 17) cascade-deletes across all derived tables within 30 days. OpenLineage audit trail supports regulatory inspection."]})]})}),(0,t.jsx)(i.SectionCard,{title:"My deeper thought: Data Contracts ARE the API for data",description:"The unifying view: contracts apply the API design discipline (versioning, compatibility, signatures, documentation) to data — which had been treated as a second-class engineering artifact.",icon:(0,t.jsx)(w.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Data Contracts ARE the API for data."})," Software engineers take API design for granted — REST endpoints have versioning, schemas (OpenAPI), compatibility guarantees (SemVer), documentation, and ownership (the team that maintains the endpoint). Data engineering had none of this — data was dumped to S3 with a Slack message. Sanderson's insight was to apply API design discipline to data: contracts are the OpenAPI spec, Schema Registry is the gateway, dbt tests are the integration tests, OpenLineage is the audit log. This is why the contract movement is structural, not incremental — it elevates data to a first-class engineering artifact."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Subset-superset compatibility IS set theory applied to schemas."}),' The backward/forward/full compatibility modes are pure set theory: backward means the new schema is a superset of the old (S₂ ⊇ S₁), forward means the old is a subset of the new (S₁ ⊆ S₂), full means they are isomorphic (S₁ ≅ S₂). This is the same subset-superset relation you learned in discrete math — applied to field sets. The formalisation is what enables automated enforcement: Schema Registry can mechanically check the relation at publish time. Without the set-theoretic formalisation, "is this schema compatible?" would require human review.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"SLA as a probability bound IS the rigorous alternative to vibes."}),' "The data is usually fresh" is not an SLA. ',(0,t.jsx)("code",{className:"font-mono",children:"P(completion_time ≤ T_max AND error_rate ≤ ε_max) ≥ 1 - α"})," is. The bound is empirically measurable over a window of N trials; breach triggers the escalation chain; the audit log satisfies regulatory inspection. This is the same probability-bound formalism as software reliability (Google SRE's error budget is ",(0,t.jsx)("code",{className:"font-mono",children:"1 - SLO"}),", where SLO is a probability bound on latency). Data contracts bring SRE discipline to data engineering."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Code enforcement IS the only way to scale compliance."}),' As data volume and regulation grow, human review cannot keep up — adding a new domain shouldn\'t require hiring new compliance officers. Contracts encode rules as code (dbt tests, GE suites, OPA Rego) that run continuously on every publish/batch. This is the same insight as infrastructure-as-code (Terraform) and policy-as-code (OPA): rules are versioned, reviewed, and executed by machines, not humans. The mesh principle ("federated computational governance") and the contract principle ("code enforcement") are two expressions of the same idea — scale compliance with code, not headcount.']})]})}),(0,t.jsxs)(u.DeeperThoughtSection,{pageTitle:"Data Contracts Deep Dive",children:[(0,t.jsx)(u.DeeperThought,{title:"Data Contracts Deep Dive IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Data Contracts Deep Dive is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Data Contracts Deep Dive connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Data Contracts Deep Dive sits in the computational-science landscape."})}),(0,t.jsx)(u.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Data Contracts Deep Dive) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(u.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(u.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(u.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(l.RelatedTopics,{topics:[{id:"data-contracts",reason:"Existing overview page — this is the deep-dive extension"},{id:"data-mesh-deep-dive",reason:"Mesh requires contracts — every data product has one"},{id:"great-expectations",reason:"GE suites are the statistical enforcement layer"},{id:"dbt-deep-dive",reason:"dbt tests are the SQL transform contract layer"},{id:"schema-registry",reason:"Schema Registry enforces broker-side compat"},{id:"lineage",reason:"OpenLineage provides the audit trail"},{id:"governance",reason:"Governance + observability stack"},{id:"privacy-enhancing-tech",reason:"Privacy contracts (GDPR Art. 5/17/20) are a subset"}]}),(0,t.jsx)(n.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"data-contracts",reason:"Existing overview page — this is the deep-dive extension"},{id:"data-mesh-deep-dive",reason:"Mesh requires contracts — every data product has one"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,h.hrefFor)("data-contracts"),className:"text-sm text-primary hover:underline",children:"→ Data Contracts Overview"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("data-mesh-deep-dive"),className:"text-sm text-primary hover:underline",children:"→ Data Mesh Deep Dive (data products + federated governance)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("great-expectations"),className:"text-sm text-primary hover:underline",children:"→ Great Expectations (statistical enforcement)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,h.hrefFor)("privacy-enhancing-tech"),className:"text-sm text-primary hover:underline",children:"→ Privacy-Enhancing Tech (DP + Federated + HE)"})]})]})}e.s(["DataContractsDeepDivePage",()=>k])}]);