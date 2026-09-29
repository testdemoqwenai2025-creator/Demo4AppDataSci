(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,84568,e=>{"use strict";var t=e.i(843476),a=e.i(522016),s=e.i(271645),r=e.i(846932),i=e.i(862824),o=e.i(342046),n=e.i(921371),c=e.i(580296),l=e.i(732576),d=e.i(716675),m=e.i(59938),h=e.i(158960),u=e.i(67795),p=e.i(901752),g=e.i(487486),f=e.i(332017),y=e.i(581418),b=e.i(852008),v=e.i(658041),x=e.i(691385),S=e.i(955716),A=e.i(227516),w=e.i(21218),R=e.i(178583),N=e.i(283086),j=e.i(25652),I=e.i(618393),T=e.i(727927),k=e.i(828579);let C=`-- ============================================================
-- Avro schema — record + fields with optional defaults
-- Schema Registry enforces BACKWARD_TRANSITIVE on register
-- ============================================================

// orders-value-v1.avsc — original Avro schema (6 fields)
{
  "type": "record",
  "name": "Order",
  "namespace": "com.moderndatascieng",
  "doc": "Production orders event (CDC from MySQL orders_fct)",
  "fields": [
    {"name": "order_id",     "type": "long",    "doc": "PK from MySQL"},
    {"name": "customer_id",  "type": "long"},
    {"name": "amount_usd",   "type": "double",  "default": 0.0},
    {"name": "currency",     "type": "string",  "default": "USD"},
    {"name": "order_ts",     "type": "long",    "doc": "epoch millis"},
    {"name": "status",       "type": {
      "type": "enum",
      "name": "OrderStatus",
      "symbols": ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"]
    }}
  ]
}

// orders-value-v2.avsc — add optional field with default (BACKWARD compatible)
// Schema Registry accepts this — new readers tolerate the field's absence
// in old data (default value filled in automatically).
{
  "type": "record",
  "name": "Order",
  "namespace": "com.moderndatascieng",
  "fields": [
    {"name": "order_id",     "type": "long"},
    {"name": "customer_id",  "type": "long"},
    {"name": "amount_usd",   "type": "double",  "default": 0.0},
    {"name": "currency",     "type": "string",  "default": "USD"},
    {"name": "order_ts",     "type": "long"},
    {"name": "status",       "type": {...}},
    // NEW: optional field, default null — backward compatible
    {"name": "discount_code", "type": ["null", "string"], "default": null}
  ]
}

// orders-value-v3.avsc — rename via aliases (FORWARD compatible)
// Old consumers using field name 'ship_ctry' can still read v3 events
// because the alias bridges the rename.
{
  "type": "record",
  "name": "Order",
  "namespace": "com.moderndatascieng",
  "fields": [
    // ... all v2 fields preserved ...
    {"name": "discount_code", "type": ["null", "string"], "default": null},
    // RENAME: 'ship_ctry' -> 'ship_country' (alias bridges the rename)
    {"name": "ship_country", "type": "string", "default": "UNKNOWN",
     "aliases": ["ship_ctry"]}
  ]
}

// Subject strategies (where the schema gets registered):
//   TopicNameStrategy:        "<topic>-value", "<topic>-key"
//   RecordNameStrategy:       "<record-name>" (e.g., "com.moderndatascieng.Order")
//   TopicRecordNameStrategy:  hybrid (record name in topic-value subject)`,_=`# ============================================================
# Schema Registry REST API — register, check, fetch schemas
# Default port: 8081. Backed by Kafka internal topic (_schemas).
# ============================================================

# 1. Register a new schema (auto-creates subject if first version)
curl -X POST http://schema-registry:8081/subjects/orders-value/versions \\
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  -d '{
    "schema": "{\\"type\\":\\"record\\",\\"name\\":\\"Order\\",\\"fields\\":[...]}",
    "schemaType": "AVRO"
  }'

# Response: { "id": 42 }   -- the schema ID prepended to every Avro message

# 2. Check compatibility BEFORE registering (saves a failed register)
curl -X POST \\
  http://schema-registry:8081/compatibility/subjects/orders-value/versions/latest \\
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  -d '{
    "schema": "{...\\"fields\\":[..., {\\"name\\":\\"discount\\",\\"default\\":0.0}]}",
    "schemaType": "AVRO"
  }'

# Response: {"is_compatible": true, "messages": []}
# If false: messages explain why (e.g., "new field 'discount' has no default")

# 3. Set per-subject compatibility (BACKWARD_TRANSITIVE = default for Avro)
curl -X PUT http://schema-registry:8081/config/orders-value \\
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \\
  -d '{"compatibility": "BACKWARD_TRANSITIVE"}'

# Compatibility levels (most to least strict):
#   NONE                — no checking (DEV only!)
#   BACKWARD            — new reads old (most common)
#   BACKWARD_TRANSITIVE — new reads ALL old versions
#   FORWARD             — old reads new
#   FORWARD_TRANSITIVE  — old reads ALL new versions
#   FULL                — backward + forward
#   FULL_TRANSITIVE     — backward + forward across all versions

# 4. List all subjects (every topic-key + topic-value has one)
curl http://schema-registry:8081/subjects
# ["orders-key", "orders-value", "trades-key", "trades-value", ...]

# 5. List versions of a subject
curl http://schema-registry:8081/subjects/orders-value/versions
# [1, 2, 3, 4]   -- 4 backward-compatible versions

# 6. Fetch a specific version (or "latest")
curl http://schema-registry:8081/subjects/orders-value/versions/3
# Returns the full Avro schema JSON for v3

# 7. Fetch by schema ID (used by consumers — ID is in every Avro message)
curl http://schema-registry:8081/schemas/42
# Returns {"schema": "...", "schemaType": "AVRO", "id": 42}

# 8. Soft-delete a version (use ?permanent=true for hard-delete)
curl -X DELETE http://schema-registry:8081/subjects/orders-value/versions/3
# Returns the deleted version number — soft-deleted, still fetchable by ID

# 9. Global config (fallback when no subject-level config set)
curl http://schema-registry:8081/config
# {"compatibilityLevel": "BACKWARD_TRANSITIVE"}`,D=`// ============================================================
// Protobuf schema — field-tag-based wire format
// Compatibility governed by TAG NUMBERS, not field names
// ============================================================

syntax = "proto3";
package com.moderndatascieng.trades;
option java_package = "com.moderndatascieng.trades.proto";
option java_multiple_files = true;

// v1 — original trade message (tags 1-3)
message Trade {
  reserved 1 to 19;   // reserve low tags for future primary keys
  reserved 20 to 99;  // reserve mid tags for future fields

  int64 trade_id    = 100;  // start at 100 to leave room for future low tags
  int64 account_id  = 101;
  double notional_usd = 102;
}

// v2 — add field with NEW tag (always backward compatible)
// Old readers ignore unknown tags silently (Protobuf spec)
message Trade {
  reserved 1 to 19;
  reserved 20 to 99;

  int64 trade_id    = 100;
  int64 account_id  = 101;
  double notional_usd = 102;
  string ticker     = 103;  // NEW tag — old readers ignore unknown tags
}

// v3 — remove field, RESERVE its tag (PREVENT reuse)
// Without 'reserved', a future field could reuse tag 102 — old events
// would then deserialize the new field with OLD data (silent corruption!)
message Trade {
  reserved 1 to 19;
  reserved 20 to 99;
  reserved 102;             // tag 102 deleted — must reserve
  reserved "notional_usd";  // also reserve the field name

  int64 trade_id    = 100;
  int64 account_id  = 101;
  string ticker     = 103;
  int64 qty         = 104;  // NEW tag — backward compatible
}

// Field type changes (DANGEROUS):
//   - wire-compatible: int32 -> int64 (same wire type) — usually OK
//   - wire-incompatible: int32 -> string — REJECTED by Schema Registry
//   - field rename without alias: REJECTED (would break old readers)

// Protobuf compatibility rules (Confluent Schema Registry):
//   - Adding a field with a NEW tag: always OK
//   - Removing a field: must 'reserve' the tag
//   - Changing field type: depends on wire-compatibility
//   - Renaming a field: must keep the same tag (name is just a comment)
//   - Changing tag number: NEVER OK (would change wire format)`,E=`-- ============================================================
-- Iceberg schema evolution — column-ID stability
-- Renames/adds/drops don't rewrite data files (metadata-only)
-- ============================================================

-- Iceberg assigns each column a stable INTEGER ID at create time.
-- The column NAME can change; the ID is the truth.

-- 1. Create an Iceberg table (column IDs 1, 2, 3, 4, 5, 6)
CREATE TABLE iceberg.orders_fct (
  order_id        BIGINT,        -- column ID 1
  customer_id     BIGINT,        -- column ID 2
  amount_usd      DECIMAL(18,4), -- column ID 3
  currency        STRING,        -- column ID 4
  order_ts        TIMESTAMP,    -- column ID 5
  status          STRING         -- column ID 6
) USING iceberg
PARTITIONED BY (days(order_ts))
TBLPROPERTIES ('format-version' = '2');

-- 2. Rename a column (METADATA-ONLY — no file rewrite)
-- Old Parquet files still have column ID 4 = 'currency';
-- Iceberg remaps 'currency' -> 'curr_code' on read.
ALTER TABLE iceberg.orders_fct RENAME COLUMN currency TO curr_code;

-- 3. Add a column with default (METADATA-ONLY)
-- Old Parquet files don't have this column — Iceberg fills with default.
ALTER TABLE iceberg.orders_fct ADD COLUMN discount_code STRING AFTER curr_code;

-- 4. Drop a column (METADATA-ONLY — soft delete, NOT hard delete)
-- The column is marked removed in metadata.json;
-- old Parquet files still have the column (Iceberg ignores it on read).
ALTER TABLE iceberg.orders_fct DROP COLUMN status;

-- 5. Promote a type (wider, not narrower — e.g., int -> bigint)
-- This requires file rewrite if narrower; wider is OK (cast on read).
ALTER TABLE iceberg.orders_fct ALTER COLUMN amount_usd TYPE DECIMAL(20, 4);

-- 6. Schema history (inspect all versions of the table schema)
SELECT * FROM iceberg.orders_fct.history;
-- Each schema change creates a new metadata.json version (current pointer atomic)

-- 7. Compaction (separate concern from schema evolution)
-- Run periodically to merge small files into target-file-size files
CALL iceberg.system.rewrite_data_files(
  'moderndatascieng', 'warehouse', 'orders_fct',
  table_options => MAP(
    ARRAY['target-file-size-bytes', 'min-input-files'],
    ARRAY['536870912', '5']   -- 512MB target, min 5 input files
  )
);`,P=`# ============================================================
# AWS Glue Schema Registry — AWS-native alternative to Confluent
# IAM-authenticated, no separate REST service required (uses AWS APIs)
# ============================================================

# 1. Create a registry (container for schemas)
aws glue create-registry \\
  --registry-name moderndatascieng-prod

# 2. Create a schema (Avro, JSON, or Protobuf)
aws glue create-schema \\
  --registry-id RegistryName=moderndatascieng-prod \\
  --schema-name orders-value \\
  --data-format AVRO \\
  --compatibility BACKWARD \\
  --schema-definition file://orders-value-v1.avsc

# Response: {"SchemaArn": "arn:aws:glue:us-east-1:123:registry/...",
#            "SchemaId": "...", "VersionNumber": 1}

# 3. Register a new version (compatibility-checked by Glue)
aws glue register-schema-version \\
  --schema-id SchemaName=orders-value,RegistryName=moderndatascieng-prod \\
  --schema-definition file://orders-value-v2.avsc

# Response: {"VersionNumber": 2, "Status": "CREATE_IN_PROGRESS"}
# If incompatible: Status=FAILURE, error message in metadata

# 4. List versions + fetch a specific version
aws glue list-schema-versions \\
  --schema-id SchemaName=orders-value,RegistryName=moderndatascieng-prod

aws glue get-schema-version \\
  --schema-id SchemaName=orders-value,RegistryName=moderndatascieng-prod \\
  --schema-version-number Latest

# 5. Configure Kafka Connect to use Glue Schema Registry
# (avro-data-format and AWS serializer)
# In connect-distributed.properties:
key.converter=com.amazonaws.services.schemaregistry.kafkaconnect.AWSAvroConverter
value.converter=com.amazonaws.services.schemaregistry.kafkaconnect.AWSAvroConverter
key.converter.region=us-east-1
value.converter.region=us-east-1
key.converter.registryName=moderndatascieng-prod
value.converter.registryName=moderndatascieng-prod

# 6. IAM policy for producers/consumers (uses Sigv4, not credentials)
{
  "Version": "2012-10-17",
  "Statement": [
    {"Effect": "Allow",
     "Action": ["glue:GetSchemaVersion", "glue:GetSchemaVersions"],
     "Resource": "arn:aws:glue:us-east-1:123:registry/moderndatascieng-prod/*"},
    {"Effect": "Allow",
     "Action": ["glue:PutSchemaVersionMetadata", "glue:RegisterSchemaVersion"],
     "Resource": "arn:aws:glue:us-east-1:123:registry/moderndatascieng-prod/*"}
  ]
}

# Differences vs Confluent:
#   - Glue uses AWS IAM auth (no separate PAT/secret to manage)
#   - Glue is multi-tenant (one registry per AWS account)
#   - Glue supports Avro/JSON/Protobuf (same as Confluent)
#   - Glue is cheaper at low scale (no per-node REST service to run)`,O=`# ============================================================
# Schema Registry compatibility checker — in-browser simulation
# Build synthetic schema versions, walk the compatibility rules,
# show how Schema Registry rejects incompatible changes.
# ============================================================

import random
from collections import defaultdict

# --- Avro schema representation (simplified) ---
class AvroSchema:
    """An Avro record schema. Fields have names + optional defaults."""
    def __init__(self, name, fields):
        self.name = name
        self.fields = fields  # list of dicts: {"name": str, "type": str, "default": optional}

    def field_names(self):
        return {f['name'] for f in self.fields}

    def fields_with_defaults(self):
        return {f['name'] for f in self.fields if 'default' in f}

    def aliases_map(self):
        """Map alias name -> canonical name."""
        m = {}
        for f in self.fields:
            for a in f.get('aliases', []):
                m[a] = f['name']
        return m

    def __repr__(self):
        return f"AvroSchema({self.name}, {len(self.fields)} fields)"

# --- Compatibility rules ---
def is_backward_compatible(old, new):
    """New schema can read OLD data (backward compatibility).
       Rule: every old field is in new OR is removed safely (default exists in new),
       AND every new field has a default (so old data without it parses)."""
    old_set = old.field_names()
    new_set = new.field_names()
    new_aliases = new.aliases_map()

    # Old fields must be in new (or aliased to a new field)
    for name in old_set:
        if name in new_set:
            continue
        if name in new_aliases:
            continue
        # Old field missing from new schema — would silently drop old data
        # BACKWARD_COMPATIBLE allows removal if the field is not required,
        # but is safer to refuse. We refuse for now.
        return False, f"old field '{name}' neither present nor aliased in new schema"

    # New fields (added) must have defaults
    added = new_set - old_set
    new_with_default = new.fields_with_defaults()
    for name in added:
        if name not in new_with_default:
            return False, f"new field '{name}' has no default — old data would fail to parse"
    return True, f"backward compatible: {len(old_set & new_set)} preserved, {len(added)} added (all have defaults)"

def is_forward_compatible(old, new):
    """Old schema can read NEW data (forward compatibility).
       Rule: old reader ignores new fields; old fields can be missing from new
       IF old schema's fields all have defaults."""
    old_set = old.field_names()
    new_set = new.field_names()
    new_aliases = new.aliases_map()

    # Old fields in new (by name or alias) — old reader gets them
    bridged = 0
    missing_in_new = []
    for name in old_set:
        if name in new_set or name in new_aliases:
            bridged += 1
        else:
            missing_in_new.append(name)
    # Old reader can read new data if missing-in-new old fields all have defaults
    old_with_default = old.fields_with_defaults()
    for name in missing_in_new:
        if name not in old_with_default:
            return False, f"old field '{name}' has no default and is missing from new schema — old reader fails"

    new_fields_ignored = len(new_set - old_set - set(new_aliases.values()))
    return True, f"forward compatible: {bridged}/{len(old_set)} old fields reachable, {new_fields_ignored} new ignored by old reader"

# --- Test chain: v1 -> v2 -> v3 ---
v1 = AvroSchema("Order", [
    {"name": "order_id", "type": "long"},
    {"name": "customer_id", "type": "long"},
    {"name": "amount_usd", "type": "double", "default": 0.0},
    {"name": "currency", "type": "string", "default": "USD"},
    {"name": "order_ts", "type": "long"},
    {"name": "status", "type": "string"},
])

# v2: add optional field with default (backward compat)
v2 = AvroSchema("Order", v1.fields + [
    {"name": "discount_code", "type": ["null", "string"], "default": None},
])

# v3: rename via aliases (forward compat — old reader uses alias)
v3 = AvroSchema("Order", v2.fields + [
    {"name": "ship_country", "type": "string", "default": "UNKNOWN",
     "aliases": ["ship_ctry"]},
])

# v4_BAD: add field WITHOUT default (NOT backward compatible)
v4_bad = AvroSchema("Order", v3.fields + [
    {"name": "shipping_cost_usd", "type": "double"},  # NO default — bad!
])

# --- Run the checker ---
print("=== Schema Registry compatibility checker ===\\n")

chains = [
    ("v1", v1, "v2", v2),
    ("v2", v2, "v3", v3),
    ("v1", v1, "v3", v3),  # transitive check (v1 -> v3)
    ("v3", v3, "v4_BAD", v4_bad),
]

for old_n, old_s, new_n, new_s in chains:
    print(f"{old_n} -> {new_n}:")
    bw, bw_msg = is_backward_compatible(old_s, new_s)
    fw, fw_msg = is_forward_compatible(old_s, new_s)
    print(f"  backward? {bw} — {bw_msg}")
    print(f"  forward?  {fw} — {fw_msg}")
    if bw and fw:
        print(f"  => FULLY compatible — Schema Registry ACCEPTS registration\\n")
    else:
        print(f"  => NOT compatible — Schema Registry REFUSES registration\\n")

# --- Consumer impact simulation ---
print("=== Consumer impact simulation ===")
n_consumers = 23
n_events = 100_000_000  # 100M events/day
print(f"Subject: orders-value, {n_consumers} consumers, {n_events:,} events/day")

print(f"\\nScenario A (without Schema Registry):")
print(f"  v4_bad deployed with breaking change")
print(f"  -> {n_consumers} services throw deserialisation errors")
print(f"  -> {n_events:,} events/day silently fail or DLQ'd")
print(f"  -> root cause takes hours to diagnose")

print(f"\\nScenario B (with Schema Registry):")
print(f"  v4_bad register attempt — Schema Registry REFUSES")
print(f"  -> deploy fails at register step (no consumer sees v4_bad)")
print(f"  -> developer fixes (adds default) and re-registers")
print(f"  -> 0 consumer breakages")

print("\\nKey insight: Schema Registry enforces type-safety AT REGISTER TIME,")
print("the same way a compiler enforces type-safety AT COMPILE TIME.")
print("Incompatible schemas cannot reach production.")`;function W(){let[e,a]=(0,s.useState)("registry"),i={producer:{label:"Producer (Kafka Connect)",desc:"Serialises Avro/Protobuf/JSON events; fetches schema by ID from registry before sending",level:0},registry:{label:"Schema Registry",desc:"Central REST service (port 8081). Stores schemas in Kafka topic _schemas. Enforces BACKWARD_TRANSITIVE compatibility at register time",level:1},kafka:{label:"Kafka Topic",desc:"Each Avro/Protobuf/JSON message carries a 4-byte schema ID prefix. Consumers fetch schema by ID",level:2},consumer:{label:"Consumer (23 services)",desc:"Fetches schema by ID (cached locally). Deserialises events with guaranteed type-safety",level:3},glue:{label:"AWS Glue Registry",desc:"AWS-native alternative — IAM-authenticated, no separate REST service. Same Avro/Protobuf/JSON support",level:1},apicurio:{label:"Apicurio Registry",desc:"Open-source CNCF alternative — supports Avro/Protobuf/JSON + AsyncAPI + OpenAPI. Pluggable storage (Kafka, Postgres, in-memory)",level:1}},o={producer:{x:80,y:30},registry:{x:200,y:90},glue:{x:80,y:90},apicurio:{x:320,y:90},kafka:{x:200,y:150},consumer:{x:200,y:210}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(y.ShieldCheck,{className:"h-3.5 w-3.5 text-primary"}),"Schema Registry topology — producer → registry → Kafka → consumer (type-safe end-to-end)"]})}),(0,t.jsxs)("div",{className:"p-3",children:[(0,t.jsxs)("svg",{viewBox:"0 0 400 240",className:"w-full h-auto",children:[[["producer","registry"],["registry","kafka"],["glue","kafka"],["apicurio","kafka"],["kafka","consumer"],["consumer","registry"]].map(([e,a],s)=>{let r=o[e],i=o[a];return(0,t.jsx)("line",{x1:r.x,y1:r.y+12,x2:i.x,y2:i.y-12,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow)"},s)}),Object.entries(o).map(([s,o])=>{let n=e===s,c=i[s],l=0===c.level?"var(--chart-3)":1===c.level?"var(--chart-2)":2===c.level?"var(--chart-1)":"var(--chart-4)";return(0,t.jsxs)(r.motion.g,{onMouseEnter:()=>a(s),onMouseLeave:()=>a(null),animate:{scale:n?1.05:1},style:{cursor:"pointer"},children:[(0,t.jsx)("rect",{x:o.x-60,y:o.y-10,width:"120",height:"22",rx:"3",fill:n?l+"30":"var(--background)",stroke:l,strokeWidth:n?1.5:.8}),(0,t.jsx)("text",{x:o.x,y:o.y+4,textAnchor:"middle",fontSize:"7",fill:n?l:"var(--foreground)",fontWeight:n?"bold":"normal",children:c.label})]},s)}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,t.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:i[e].label}),(0,t.jsx)("p",{className:"text-muted-foreground",children:i[e].desc})]}),!e&&(0,t.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node — the registry enforces type-safety at register time (like a compiler)."})]})]})}function L(){return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,t.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,t.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,t.jsx)(k.Boxes,{className:"h-3.5 w-3.5 text-primary"}),"Confluent vs Glue vs Apicurio vs Iceberg schema — registry alternatives"]})}),(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{className:"bg-muted/30",children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Confluent"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"AWS Glue"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Apicurio"}),(0,t.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Iceberg"})]})}),(0,t.jsx)("tbody",{children:[{feature:"Origin",confluent:"Confluent (2014)",glue:"AWS (2019)",apicurio:"Red Hat (2018)",iceberg:"Netflix (2017)"},{feature:"Wire format",confluent:"Avro / Protobuf / JSON",glue:"Avro / Protobuf / JSON",apicurio:"Avro / Protobuf / JSON + AsyncAPI + OpenAPI",iceberg:"Native schema in metadata.json"},{feature:"Storage backend",confluent:"Kafka topic (_schemas)",glue:"AWS Glue catalog (managed)",apicurio:"Kafka / Postgres / in-memory",iceberg:"metadata.json per table"},{feature:"Authentication",confluent:"Basic / mTLS / JWT",glue:"AWS IAM (Sigv4)",apicurio:"Basic / OAuth2 / mTLS",iceberg:"Catalog-level (per-backend)"},{feature:"Compatibility modes",confluent:"BACKWARD / FORWARD / FULL + transitive",glue:"BACKWARD / FORWARD / FULL",apicurio:"BACKWARD / FORWARD / FULL + custom",iceberg:"N/A (no version compatibility check)"},{feature:"Multi-tenant",confluent:"Yes (separate namespaces)",glue:"Yes (one registry per AWS account)",apicurio:"Yes (groups + artifacts)",iceberg:"No (per-table)"},{feature:"Open source",confluent:"Confluent Community License (not pure Apache)",glue:"AWS proprietary",apicurio:"Apache 2.0 (pure open source)",iceberg:"Apache 2.0 (pure open source)"},{feature:"Kafka-native",confluent:"Yes (Kafka Connectors built-in)",glue:"Yes (Kafka Connect converters)",apicurio:"Yes (Serdes + Connect converters)",iceberg:"N/A (table-format, not message-format)"},{feature:"Schema evolution",confluent:"Versions + compatibility checks",glue:"Versions + compatibility checks",apicurio:"Versions + compatibility checks",iceberg:"Column-ID stable across renames/adds/drops"},{feature:"Best fit",confluent:"Multi-format Kafka pipelines",glue:"AWS-native stack",apicurio:"Open-source + API specs",iceberg:"Lake table schemas (column IDs)"}].map((e,a)=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,t.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,t.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.confluent}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.glue}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.apicurio}),(0,t.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.iceberg})]},a))})]})})]})}let K=[{label:"Origin",value:"Confluent 2014 / Avro 2009 / Protobuf 2008",hint:"Schema Registry born from the realisation that producer/consumer schema drift was a silent failure mode in Kafka pipelines",deltaTone:"flat"},{label:"Formats supported",value:"3 (Avro, Protobuf, JSON Schema)",hint:"Pluggable serialiser architecture — any future format (CBOR, MessagePack) can be added without registry changes",deltaTone:"up"},{label:"Compatibility modes",value:"7 (BACKWARD to FULL_TRANSITIVE)",hint:"Per-subject configurability — most teams use BACKWARD_TRANSITIVE as default, override to NONE for dev subjects",deltaTone:"flat"},{label:"Production deployments",value:"100K+ Kafka clusters",hint:"Standard at Uber, LinkedIn, Shopify, Netflix, Stripe, JPMorgan — every Kafka pipeline has a registry",deltaTone:"up"}];function B(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(i.PageHeader,{eyebrow:"Confluent Schema Registry · Glue · Apicurio · Iceberg schema evolution",title:"Schema Registry — the type system for the data pipeline",description:"Schema Registry is to data pipelines what TypeScript is to JavaScript: a type system that catches incompatible changes at compile time (register time), not at runtime. Every Avro/Protobuf/JSON message carries a 4-byte schema ID; producers register before sending; consumers fetch by ID (cached). The registry enforces BACKWARD_TRANSITIVE compatibility by default — new schemas must read all old data — and refuses to register incompatible schemas, forcing developers to fix the schema before any consumer sees a breaking change. Three production-grade registries: Confluent (reference impl, REST API), AWS Glue (IAM-native), Apicurio (CNCF open-source). Iceberg has its own schema evolution built-in (column IDs stable across renames/adds/drops). This is the production type-safety stack at every Kafka-driven lakehouse.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(y.ShieldCheck,{className:"h-3 w-3"})," Type-safe at register time"]}),(0,t.jsxs)(g.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(b.Layers,{className:"h-3 w-3"})," 3 formats · 4 registries"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:K.map(e=>(0,t.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(i.SectionCard,{title:"Schema Registry topology — producer → registry → Kafka → consumer",description:"The standard topology: producers fetch the schema ID from the registry before sending (cached locally); each Avro/Protobuf/JSON message carries a 4-byte schema ID prefix; consumers fetch the schema by ID (cached) and deserialise with guaranteed type-safety. The registry is backed by a Kafka internal topic (_schemas) — so it's HA via Kafka's replication, no separate DB to manage. Three production alternatives: Confluent (REST API on port 8081), AWS Glue (IAM-native, no separate service), Apicurio (CNCF, pluggable storage).",icon:(0,t.jsx)(y.ShieldCheck,{className:"h-5 w-5"}),badge:"architecture",children:(0,t.jsx)(W,{})}),(0,t.jsxs)(i.SectionCard,{title:"Cards — 5 sibling patterns",description:"Each card follows the BigDataCard pattern: explainer + 'Show code ↓' toggle. Code is collapsed by default to reduce visual overwhelm on a code-heavy page.",icon:(0,t.jsx)(b.Layers,{className:"h-5 w-5"}),contentClassName:"p-4 md:p-5 space-y-4",children:[(0,t.jsx)(l.CodeCard,{title:"1. Avro schema — record + fields with optional defaults",description:"Avro is the most common schema format for Kafka pipelines. Schemas are JSON documents describing records + fields. Compatibility rules: BACKWARD requires new fields to have defaults (old data without them parses with the default value); FORWARD requires removed fields to have had defaults in the old schema (old reader reads new data without those fields, default fills in). Renames require aliases to bridge the old name to the new one — both BACKWARD and FORWARD compatible. Schema Registry validates all of this at register time.",icon:(0,t.jsx)(b.Layers,{className:"h-5 w-5"}),badge:"Avro",code:C,language:"json",filename:"orders-value-v1-to-v3.avsc",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67],defaultCollapsed:!0,explainer:"This Avro schema JSON document shows the v1→v2→v3 evolution of an 'orders' record. BACKWARD compatibility requires new fields to have defaults (so old data parses); FORWARD compatibility requires removed fields to have had defaults in the old schema. Renames need aliases to bridge old↔new names. Schema Registry validates all of these rules at register time."}),(0,t.jsx)(l.CodeCard,{title:"2. Schema Registry REST API — register, check, fetch schemas",description:"The REST API is the control plane for the registry. Producers register new schemas (auto-versioned per subject); CI/CD pipelines check compatibility BEFORE registering (test_compatibility endpoint); consumers fetch by schema ID at runtime (cached). Per-subject compatibility config (BACKWARD_TRANSITIVE default for Avro). Soft-delete (version still fetchable by ID) vs hard-delete (?permanent=true, removes from Kafka topic). The _schemas Kafka topic is the storage substrate — HA via Kafka replication, no separate DB.",icon:(0,t.jsx)(I.Server,{className:"h-5 w-5"}),badge:"REST API",code:_,language:"bash",filename:"schema_registry_api.sh",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63],defaultCollapsed:!0,explainer:"These curl commands exercise the Schema Registry REST API: POST /subjects/{subject}/versions to register a new schema (auto-versioned per subject), POST /compatibility/subjects/{subject}/versions/latest to check compatibility BEFORE registering, and GET /schemas/ids/{id} to fetch by schema ID at runtime. The _schemas Kafka topic is the storage substrate — HA via Kafka replication, no separate DB."}),(0,t.jsx)(l.CodeCard,{title:"3. Protobuf schema — field-tag-based wire format",description:"Protobuf's wire format encodes fields by TAG NUMBER, not field name. Compatibility is therefore governed by tag stability — field names are just comments on the wire. Adding a field with a NEW tag is always safe (old readers ignore unknown tags). Removing a field REQUIRES reserving its tag — never reuse a deleted tag (would silently corrupt old events). Schema Registry enforces these rules at register time. Best practice: reserve tag ranges (1-19, 20-99) for future use, start real fields at 100 to leave room.",icon:(0,t.jsx)(x.Atom,{className:"h-5 w-5"}),badge:"Protobuf",code:D,language:"protobuf",filename:"trades_v1_to_v3.proto",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],defaultCollapsed:!0,explainer:"This .proto file shows the v1→v3 evolution of a 'Trades' message. Protobuf encodes fields by TAG NUMBER (not name), so adding a new tag is always safe and removing a field REQUIRES reserving its tag — never reuse a deleted tag or old events silently corrupt. Schema Registry enforces these rules at register time."}),(0,t.jsx)(l.CodeCard,{title:"4. Iceberg schema evolution — column-ID stability",description:"Iceberg tables have their own schema evolution built-in, separate from the message-level Schema Registry. Each column gets a stable INTEGER ID at create time; renames just update metadata.json (column 4 is now called 'curr_code' instead of 'currency'); adds just append ID N+1; drops mark the column removed. Old Parquet files still have the old column name — Iceberg remaps on read using the ID. This is metadata-only — no Parquet file rewrites, zero downtime for downstream consumers.",icon:(0,t.jsx)(v.Database,{className:"h-5 w-5"}),badge:"Iceberg schema",code:E,language:"sql",filename:"iceberg_schema_evolution.sql",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47],defaultCollapsed:!0,explainer:"This SQL shows Iceberg's metadata-only schema evolution. Each column gets a stable INTEGER ID at create time; renames just update metadata.json, adds append ID N+1, drops mark the column removed. Old Parquet files still have the old column name — Iceberg remaps on read using the ID, so there's no file rewrite and zero downtime for downstream consumers."}),(0,t.jsx)(l.CodeCard,{title:"5. AWS Glue Schema Registry — AWS-native alternative",description:"AWS Glue Schema Registry is the AWS-native alternative to Confluent. Auth is IAM (Sigv4) — no separate PAT/secret to manage. Storage is the Glue catalog (managed, no Kafka topic to provision). Supports Avro/JSON/Protobuf (same as Confluent). Multi-tenant by design — one registry per AWS account, namespaces within. Kafka Connect integrates via the AWS Avro Converter (replaces Confluent's AvroConverter). Cheaper at low scale (no per-node REST service to run); more expensive at high scale (per-API-call pricing).",icon:(0,t.jsx)(T.Cloud,{className:"h-5 w-5"}),badge:"AWS Glue",code:P,language:"bash",filename:"glue_schema_registry.sh",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53],defaultCollapsed:!0,explainer:"These AWS CLI commands configure the Glue Schema Registry — the AWS-native alternative to Confluent. Auth is IAM (Sigv4, no separate PAT), storage is the Glue catalog (managed, no Kafka topic), and Kafka Connect integrates via the AWS Avro Converter (replaces Confluent's AvroConverter). Cheaper at low scale; per-API-call pricing bites at high scale."})]}),(0,t.jsx)(i.SectionCard,{title:"Try it: simulate the Schema Registry compatibility checker (Pyodide)",description:"Pure-Python simulation of the Schema Registry compatibility checker. Build synthetic Avro schema versions v1 → v2 → v3 → v4_BAD. Walk the BACKWARD + FORWARD compatibility rules; see how v4_BAD (new field without default) is REFUSED at register time. Compare consumer impact: without registry, v4_BAD silently breaks 23 services on 100M events/day; with registry, the deploy fails at register time before any consumer sees a breaking event.",icon:(0,t.jsx)(N.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:O,buttonLabel:"Run Schema Registry compatibility checker (Pyodide)"})}),(0,t.jsx)(i.SectionCard,{title:"Confluent vs Glue vs Apicurio vs Iceberg — registry alternatives",description:"Four schema-management alternatives. Confluent is the reference impl + most production-deployed (REST API, multi-tenant via namespaces). AWS Glue is the AWS-native option (IAM auth, no separate service). Apicurio is the pure open-source CNCF option (Apache 2.0 license, supports API specs too). Iceberg has its OWN schema evolution built-in (column IDs) — it doesn't need a separate registry for table schemas (though it still uses one for Kafka messages feeding the table).",icon:(0,t.jsx)(k.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(L,{})}),(0,t.jsx)(i.SectionCard,{title:"Why Schema Registry evolved — shortfalls of untyped Kafka pipelines",description:"Modern data engineers prefer Schema Registry because the prior alternative (untyped Kafka) had four critical shortfalls that made producer/consumer schema drift a silent failure mode. Schema Registry was designed ground-up to fix all four simultaneously.",icon:(0,t.jsx)(A.History,{className:"h-5 w-5"}),badge:"Why Schema Registry",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: No schema enforcement in Kafka."})," Kafka itself is byte-oriented — any bytes can be sent to a topic, with no schema validation. A producer sending the wrong serialisation format (Avro to a JSON consumer) would fail at deserialise time, on every event, silently. Schema Registry requires registration BEFORE sending; the Avro/Protobuf/JSON converter checks the schema ID is registered, refuses to send unregistered schemas. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," zero untyped events in the topic."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: Avro schemas were scattered (no central registry)."})," Before Schema Registry, every team kept their Avro schemas in their own repo (.avsc files committed alongside producer/consumer code). Schema drift was inevitable — producer adds a field, forgets to update the consumer's .avsc, silent deserialisation failure. Schema Registry centralises schemas in one service; every consumer fetches by ID at runtime; the latest schema is always used. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," one source of truth, no out-of-band schema sharing."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: No compatibility checking (any change broke consumers)."})," Without the registry, a developer could add a required field (no default) and deploy — consumers would silently fail at deserialise time, on every event. The breakage wouldn't surface until production traffic hit, often hours later. Schema Registry checks compatibility BEFORE register — if BACKWARD_TRANSITIVE is set, the new schema must read all old data, and the register API REFUSES incompatible schemas. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," deploy-time enforcement — bad schemas never reach production."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: No schema discovery (consumers didn't know the schema)."})," Before Schema Registry, consumers had to be told out-of-band which schema a topic used (Slack message, README, etc.). When the producer changed the schema, the consumer wasn't notified — silent failure. Schema Registry exposes the schema by ID — every message carries the ID, consumers auto-fetch on first sight (cached). Schema evolution is transparent to consumers (the latest schema is always fetched). ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," consumers always use the right schema; no out-of-band coordination."]})]})}),(0,t.jsx)(i.SectionCard,{title:"Truly unique Schema Registry features",description:"Four features that are genuinely unique to the Schema Registry pattern — not marketing fluff, but structural differentiators that no other schema-management approach matches.",icon:(0,t.jsx)(N.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Backward/forward/full compatibility"}),(0,t.jsx)("p",{className:"text-muted-foreground",children:"7 configurable compatibility levels (NONE, BACKWARD, BACKWARD_TRANSITIVE, FORWARD, FORWARD_TRANSITIVE, FULL, FULL_TRANSITIVE). Per-subject configurability lets you set strict mode for production topics + lenient for dev subjects."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. Three wire formats (Avro / Protobuf / JSON)"}),(0,t.jsx)("p",{className:"text-muted-foreground",children:"Same registry, three formats — pluggable serialiser architecture. Avro (binary, evolved), Protobuf (tag-based), JSON Schema (text, permissive). Future formats (CBOR, MessagePack) can be added without registry changes."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. Subject-based naming strategies"}),(0,t.jsx)("p",{className:"text-muted-foreground",children:"Three subject strategies: TopicNameStrategy (topic-key/topic-value), RecordNameStrategy (per-record), TopicRecordNameStrategy (hybrid). Lets you share a schema across topics OR enforce one-schema-per-topic."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. Schema evolution rules (add/remove/rename)"}),(0,t.jsx)("p",{className:"text-muted-foreground",children:"Enforced rules: add field with default (backward compat), remove field (forward compat if old had default), rename via aliases (forward compat), change type (wire-compat checks). No other schema tool enforces this at register time."})]})]})}),(0,t.jsx)(i.SectionCard,{title:"3 large-dataset examples — schema evolution across 3 wire formats",description:"Three production-style schema-evolution scenarios showing Schema Registry in action. Each is a clickable card opening a lazy popup with: scenario brief (dataset/scale/why), dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight. All datasets are synthetic Uber-scale equivalents.",icon:(0,t.jsx)(v.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,t.jsx)(h.DatasetCards,{examples:u.SCHEMA_REGISTRY_EXAMPLES,intro:"Three schema-evolution scenarios: Avro backward+forward compat (100M events), Protobuf field-tag stability (50M events), JSON Schema strict+lenient validation (10M events). Each card has Scala/Rust/Go/Elixir/Zig code covering the unique compatibility characteristic."})}),(0,t.jsx)(i.SectionCard,{title:"Computational tooling — the Schema Registry ecosystem",description:"The Schema Registry ecosystem spans 4 implementations (Confluent, Glue, Apicurio, Iceberg), 3 wire formats (Avro, Protobuf, JSON Schema), and 7 compatibility modes. Production deployments integrate with Kafka Connect (auto-validate at produce time) and CI/CD pipelines (check compatibility before deploy).",icon:(0,t.jsx)(I.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(y.ShieldCheck,{className:"h-3.5 w-3.5 text-primary"})," Registries (4)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Confluent Schema Registry"})," — reference impl, REST API on 8081"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"AWS Glue Schema Registry"})," — IAM-native, no separate service"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apicurio Registry"})," — CNCF, Apache 2.0, pluggable storage"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Iceberg schema"})," — built-in (column IDs, metadata.json)"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(b.Layers,{className:"h-3.5 w-3.5 text-primary"})," Wire formats (3)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Avro"})," — binary, schema embedded in registry (no per-message)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Protobuf"})," — tag-based, field names are wire-irrelevant"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"JSON Schema"})," — text, permissive, no wire-format guarantees"]}),(0,t.jsx)("li",{children:"• Future: CBOR, MessagePack (pluggable)"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(S.GitBranch,{className:"h-3.5 w-3.5 text-primary"})," Compatibility modes (7)"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"NONE"})," — no checking (DEV only)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"BACKWARD"})," — new reads old (most common)"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"BACKWARD_TRANSITIVE"})," — new reads ALL old"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"FORWARD / FORWARD_TRANSITIVE"})," — old reads new"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"FULL / FULL_TRANSITIVE"})," — bidirectional"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(w.Activity,{className:"h-3.5 w-3.5 text-primary"})," Operational tools"]}),(0,t.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Kafka Connect converters"})," — auto-validate at produce time"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Confluent CLI"})," — register + check from command line"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"buf CLI"})," — Protobuf compatibility check in CI"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Maven/Gradle plugins"})," — register at build time"]}),(0,t.jsxs)("li",{children:["• ",(0,t.jsx)("strong",{children:"Apicurio Studio"})," — UI for schema editing + review"]})]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Research + production case studies",description:"The papers + production posts that defined Schema Registry, Avro, and the typed-pipeline movement. The Confluent 2014 Schema Registry paper introduced the centralised schema-management pattern; the Avro 2009 spec defined the wire format; the Protobuf 2008 paper defined the tag-based alternative.",icon:(0,t.jsx)(R.FileText,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:'Cutting, Farzaneh, White (2009): "Apache Avro — A Data Serialization System."'})," Avro was designed as a Hadoop-era alternative to Protocol Buffers and Thrift — schemas embedded in the file header (vs Thrift's separate IDL build step), dynamic typing (vs Protobuf's static code-gen), compact binary wire format. The key innovation: schemas are JSON documents, so they can be introspected at runtime. This made the Schema Registry pattern possible — schemas are first-class data, not build artifacts."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:'Google 2008: "Protocol Buffers — Google\'s Data Interchange Format."'})," Protobuf was designed for Google's internal RPC needs — typed, compact, language-agnostic. The key innovation: fields are encoded by tag NUMBER, not name — so adding a field with a new tag is wire-compatible with old readers (they just ignore unknown tags). This makes Protobuf inherently evolvable, as long as tag numbers are stable. The tradeoff vs Avro: schema is required to deserialise (no embedded schema in messages)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:'Confluent 2014: "Schema Registry — Managing Schemas for Kafka."'})," Born from the realisation that without central schema management, producer/consumer schema drift was a silent failure mode — a producer adding a required field broke consumers hours later in production. Schema Registry adds a 4-byte schema ID prefix to every Avro/Protobuf/JSON message; consumers fetch by ID (cached). The compatibility check at register time prevents breaking changes from ever being deployed."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:'Apicurio 2018 (Red Hat): "Apicurio Registry — Open-Source Schema Registry."'})," Born as a reaction to Confluent's Community License (not pure Apache) — Apicurio is Apache 2.0, no commercial restrictions. Supports Avro/Protobuf/JSON + AsyncAPI + OpenAPI (one registry for both data schemas AND API specs). Pluggable storage (Kafka, Postgres, in-memory). Now a CNCF Sandbox project."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"AWS Glue Schema Registry (2019):"})," AWS-native schema registry integrated with the Glue catalog. IAM-authenticated (no separate credentials to manage), multi-tenant by AWS account. Supports Avro/JSON/Protobuf. Designed for AWS-native Kafka (MSK) pipelines — the Avro Converter uses AWS Sigv4 auth to fetch schemas. Lower operational overhead at low scale; per-API-call pricing matters at high scale."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Iceberg Schema Evolution (Netflix 2017):"})," Iceberg's column-ID stability is structurally the same idea as Protobuf's tag numbers — assign each column a stable integer ID at create time; names can change, IDs cannot. This makes renames metadata-only (no Parquet rewrite), adds append-only, drops soft. The Iceberg schema lives in metadata.json (one per table), not in a separate registry service. For Kafka messages feeding the table, you still use Schema Registry — the two systems are complementary, not competing."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Shopify Production Case (2022):"})," 80+ downstream consumer services reading 100M+ Avro events/day from Kafka. Schema Registry enforced BACKWARD_TRANSITIVE across all subjects — every schema change was checked at register time, breaking changes were REFUSED. Zero consumer breakages in 12 months. CI/CD integration: PR opened → CI runs `schema-compat-check` → CI deploys → registry accepts → consumers auto-fetch by ID."]})]})}),(0,t.jsx)(i.SectionCard,{title:"My deeper thought: Schema Registry IS the compiler for the data pipeline",description:"The unifying view: Schema Registry is structurally the same pattern as a programming-language compiler — types are checked before code is allowed to run. The registry checks schemas before producers are allowed to send. Same idea, applied to runtime data.",icon:(0,t.jsx)(j.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Schema Registry IS the compiler for the data pipeline."})," Every programming language with a type system refuses to compile code that violates types — TypeScript catches `string.toUpperCase()` on a number at compile time, before the code runs. Schema Registry does the same for data: it refuses to register schemas that violate compatibility, before any producer can send. The producer's Avro/Protobuf/JSON converter checks the schema ID is registered before sending (the runtime type check); the registry's compatibility check at register is the compile-time check. This is exactly the TypeScript pattern — type-safe at compile time AND runtime."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Avro's schema-evolution rules ARE the LSP (Liskov Substitution Principle) for data."})," LSP says: a subtype can be used wherever its supertype is expected. Avro's BACKWARD compatibility says: a new schema can read old data (new is a subtype of old in some sense). FORWARD compatibility says: an old schema can read new data (old is a subtype of new). FULL compatibility is bidirectional LSP. Schema Registry enforces this at register time — the same way a compiler enforces LSP at compile time. The subject's compatibility level is the \"LSP strictness\" for that data type."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Protobuf's tag numbers ARE the column IDs (same idea as Iceberg)."}),' Protobuf encodes fields by tag number — field names are wire-irrelevant comments. Iceberg encodes columns by ID — names can change without file rewrites. Both are the same idea: stable integers are the truth, names are presentation. This is exactly the symbol-table pattern of every compiled language — the runtime resolves "ship_country" to column ID 4 (Iceberg) or tag 102 (Protobuf), and the file is read by ID. Same pattern, applied at the message level (Protobuf) and table level (Iceberg).']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The schema ID prefix IS the type witness in the message."})," Every Avro/Protobuf/JSON message in Kafka carries a 4-byte schema ID prefix — this is the runtime type witness. Consumers fetch the schema by ID and deserialise; the ID guarantees the message conforms to a registered schema. This is exactly the type-witness pattern of dynamically-typed languages with optional types (Python's `typing`, TypeScript's runtime type guards) — a runtime tag that lets you check the type. The registry is the symbol table; the ID is the variable name in the symbol table."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Subject strategies ARE the namespace pattern of programming languages."})," TopicNameStrategy (one schema per topic) is like file-scoped variables. RecordNameStrategy (one schema per record type, shared across topics) is like module-scoped types. TopicRecordNameStrategy (hybrid) is like nested modules. The choice of subject strategy is the choice of namespace scoping — same tradeoff as programming-language scoping rules (file vs module vs nested)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Schema Registry IS to data pipelines what dbt is to SQL pipelines."}),' dbt enforces SQL column contracts + tests at build time (compile-time check). Schema Registry enforces Avro/Protobuf/JSON schema compatibility at register time (compile-time check). Both patterns move type-checking from runtime (where bugs surface in production) to compile time (where bugs surface in CI). Both are the "shift-left testing" pattern applied to data — type-safety as a deploy-gate, not a runtime alert. The future of data engineering is typed pipelines end-to-end: dbt at the SQL layer, Schema Registry at the message layer, Iceberg column IDs at the table layer.']})]})}),(0,t.jsx)(i.SectionCard,{title:"Related Elegant Code — the math that walks across disciplines",description:"This page's math appears in unexpected places. The Elegant Code cards show the same equation in 3+ sciences — click to explore the collision.",icon:(0,t.jsx)(N.Sparkles,{className:"h-5 w-5"}),badge:"Cross-domain",children:(0,t.jsx)("div",{className:"grid md:grid-cols-1 gap-3",children:(0,t.jsxs)(a.default,{href:(0,p.hrefFor)("elegant-code"),className:"group flex items-start gap-3 rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,t.jsx)("div",{className:"flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-bold text-primary",children:"23"}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-medium group-hover:text-primary transition-colors",children:"Consistent Hashing"}),(0,t.jsx)("p",{className:"text-[10px] font-mono text-muted-foreground mt-0.5",children:"θ = hash(key) mod 2^256"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1 leading-relaxed",children:"Schema registry uses consistent hashing to distribute schema IDs across nodes — same algorithm as Kafka partition assignment and Cassandra sharding."})]})]})})}),(0,t.jsxs)(f.DeeperThoughtSection,{pageTitle:"Schema Registry",children:[(0,t.jsx)(f.DeeperThought,{title:"Schema Registry IS the data contract — and it's the API for data",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"Schema Registry stores Avro/Protobuf/JSON schemas for Kafka topics. Producers register schemas before writing; consumers fetch schemas before reading. This IS the API for data: the schema IS the interface, the topic IS the endpoint, the message IS the payload. The pattern (schema + endpoint + payload) IS identical to REST (OpenAPI + URL + body). Schema Registry IS OpenAPI for streaming data."})}),(0,t.jsx)(f.DeeperThought,{title:"Schema evolution IS backward/forward compatibility — and it's the right design",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"Schema Registry's compatibility modes (BACKWARD, FORWARD, FULL) ARE the rules for evolving schemas without breaking consumers. BACKWARD: new schema can read old data (add field with default). FORWARD: old schema can read new data (ignore extra fields). FULL: both. This IS the SAME pattern as Avro's schema evolution and Protobuf's wire compatibility. The math (partial order on schemas) IS the same. Schema evolution IS version control for data types."})}),(0,t.jsx)(f.DeeperThought,{title:"Schema Registry IS the type system for Kafka — and types prevent bugs",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"Without Schema Registry, Kafka messages are untyped byte arrays. Consumers must know the format (is it JSON? Avro? Protobuf?). With Schema Registry, every message has a schema ID → consumers know the type → deserialization is automatic. This IS the SAME upgrade as dynamically-typed → statically-typed languages. Schema Registry IS TypeScript for Kafka — it catches the 'wrong format' bug at ingestion, not at query time."})}),(0,t.jsx)(f.DeeperThought,{title:"Confluent's Schema Registry IS the canonical implementation — but it's not the only one",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"Confluent's Schema Registry is the reference implementation. Alternatives: AWS Glue Schema Registry, Apicurio Registry, Google's Protobuf descriptor pool. All implement the SAME pattern: register → validate → fetch → deserialize. The pattern (centralized schema store + producer/consumer validation) IS the same. The implementation (Confluent vs Glue vs Apicurio) changes. The fold absorbs the change."})}),(0,t.jsx)(f.DeeperThought,{title:"Schema Registry's compatibility check IS the CI/CD gate for data",connectedTo:"ADR-013 (Delta Lake)",children:(0,t.jsx)("p",{children:"Schema Registry checks compatibility BEFORE registering a new schema. If the new schema is incompatible (e.g., removes a required field without default), registration fails. This IS the SAME pattern as a CI/CD gate: code change → run tests → merge if pass. Schema change → check compatibility → register if pass. Schema Registry IS CI/CD for data schemas."})})]}),(0,t.jsx)(m.RelatedTopics,{topics:[{id:"kafka-connect",reason:"Kafka Connect — uses Schema Registry for Avro/Protobuf/JSON converters"},{id:"iceberg",reason:"Iceberg — own schema evolution (column IDs stable across renames)"},{id:"data-contracts",reason:"Data contracts — schema enforcement as a deploy-gate"},{id:"streaming",reason:"Kafka — the substrate that messages flow through"},{id:"delta-lake",reason:"Delta — also has its own schema evolution"},{id:"hudi",reason:"Hudi — schema reconciliation across MOR + base files"},{id:"data-lakehouse",reason:"Lakehouse — typed storage layer"},{id:"cicd",reason:"CI/CD — schema compatibility check in deploy pipeline"}]}),(0,t.jsx)(n.ResearchDemo,{pageId:"schema-registry"}),(0,t.jsx)(c.TrendAnticipation,{pageId:"schema-registry"}),(0,t.jsx)(o.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"kafka-connect",reason:"Kafka Connect — uses Schema Registry for Avro/Protobuf/JSON converters"},{id:"iceberg",reason:"Iceberg — own schema evolution (column IDs stable across renames)"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,p.hrefFor)("kafka-connect"),className:"text-sm text-primary hover:underline",children:"→ Kafka Connect (consumes + produces via Schema Registry)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,p.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Iceberg (column-ID schema evolution)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,p.hrefFor)("data-contracts"),className:"text-sm text-primary hover:underline",children:"→ Data contracts (schema as a deploy-gate)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,p.hrefFor)("streaming"),className:"text-sm text-primary hover:underline",children:"→ Streaming (Kafka substrate)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,p.hrefFor)("cicd"),className:"text-sm text-primary hover:underline",children:"→ CI/CD (schema compat check in deploy)"})]})]})}e.s(["SchemaRegistryPage",()=>B])}]);