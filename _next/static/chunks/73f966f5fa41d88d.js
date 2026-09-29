(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,866429,e=>{"use strict";var a=e.i(843476),t=e.i(522016),r=e.i(271645),s=e.i(846932),n=e.i(862824),o=e.i(342046),i=e.i(122836),l=e.i(716675),c=e.i(59938),d=e.i(158960),u=e.i(12665),p=e.i(901752),m=e.i(487486),g=e.i(332017),h=e.i(581418),f=e.i(658041),b=e.i(691385),v=e.i(227516),L=e.i(270756),S=e.i(966992),y=e.i(178583),A=e.i(283086),x=e.i(25652),T=e.i(618393),F=e.i(727927),w=e.i(607486);let k=`-- ============================================================
-- AWS Lake Formation — register S3 data + govern access
-- Step 1: register S3 location (LF becomes the data plane)
-- Step 2: tag with LF-tags (env, tier, domain, pii)
-- Step 3: grant principals access via LF-tags (not per-resource)
-- ============================================================

-- Run in AWS CLI or boto3 (Lake Formation has no SQL — uses API)
-- Equivalent AWS CLI commands shown as SQL-style pseudocode

-- 1. REGISTER S3 location — LF now manages access to s3://moderndatascieng-prod
REGISTER RESOURCE 'arn:aws:s3:::moderndatascieng-prod-warehouse'
  WITH (use_service_linked_role = true);

-- 2. CREATE LF-TAG DIMENSIONS — governance via tags, not paths
CREATE LF_TAG (tag_key = 'env',    tag_values = ['prod', 'staging', 'dev']);
CREATE LF_TAG (tag_key = 'tier',   tag_values = ['sensitive', 'internal', 'non-sensitive', 'public']);
CREATE LF_TAG (tag_key = 'domain', tag_values = ['customer', 'finance', 'ml', 'ops']);
CREATE LF_TAG (tag_key = 'pii',    tag_values = ['mask', 'anonymize', 'allow']);

-- 3. TAG TABLES — LF-tags apply at table, column, and database level
ALTER TABLE warehouse.customer_events
  ADD LF_TAGS (
    env = 'prod',
    tier = 'sensitive',
    domain = 'customer',
    pii = 'mask'
  );

-- Tag specific columns (PII) — column-level LF-tags
ALTER TABLE warehouse.customer_events ALTER COLUMN email
  ADD LF_TAGS (pii = 'mask');
ALTER TABLE warehouse.customer_events ALTER COLUMN phone
  ADD LF_TAGS (pii = 'mask');

-- 4. GRANT PRINCIPALS by LF-tag (not by table) — O(m) not O(n*m)
-- Analysts get SELECT on internal + non-sensitive + non-PII tables
GRANT SELECT
  ON LF_TAG (tier = 'internal') TO "arn:aws:iam::111111111111:group/analysts";
GRANT SELECT
  ON LF_TAG (tier = 'non-sensitive') TO "arn:aws:iam::111111111111:group/analysts";
GRANT SELECT
  ON LF_TAG (tier = 'public') TO "arn:aws:iam::111111111111:group/analysts";

-- Data scientists get SELECT on ML domain
GRANT SELECT
  ON LF_TAG (domain = 'ml') TO "arn:aws:iam::111111111111:group/data-scientists";

-- Finance team gets SELECT on finance domain
GRANT SELECT
  ON LF_TAG (domain = 'finance') TO "arn:aws:iam::111111111111:group/finance-team";`,_=`-- ============================================================
-- AWS Lake Formation cell-level RLS — partner data sharing
-- Row filters + column masks enforced at query time
-- ============================================================

-- Partner A reads customer orders — only their co-sold orders
-- Lake Formation rewrites partner's SQL at query time

-- 1. CREATE LF-TAG for partner-tagged rows
CREATE LF_TAG (tag_key = 'partner',
  tag_values = ['partner_a', 'partner_b', 'partner_c']);

-- 2. TAG COLUMNS for masking (PII) — email + phone
ALTER TABLE warehouse.orders ALTER COLUMN email
  ADD LF_TAGS (pii = 'mask');
ALTER TABLE warehouse.orders ALTER COLUMN phone
  ADD LF_TAGS (pii = 'mask');

-- 3. CREATE CELL-LEVEL FILTER — row filter per partner principal
-- Partner A sees only rows where partner_id = 'partner_a'
CREATE DATA CELLS FILTER partner_a_filter
  ON TABLE warehouse.orders
  WITH (
    row_filter = "partner_id = 'partner_a'",     -- enforced at query time
    column_wildcard = {
      excluded_column_names = ['email', 'phone']  -- mask PII for partner
    }
  );

-- Same for partner B + C
CREATE DATA CELLS FILTER partner_b_filter
  ON TABLE warehouse.orders
  WITH (
    row_filter = "partner_id = 'partner_b'",
    column_wildcard = {excluded_column_names = ['email', 'phone']}
  );

CREATE DATA CELLS FILTER partner_c_filter
  ON TABLE warehouse.orders
  WITH (
    row_filter = "partner_id = 'partner_c'",
    column_wildcard = {excluded_column_names = ['email', 'phone']}
  );

-- 4. GRANT partners access to their filtered view
GRANT SELECT
  ON DATA CELLS FILTER partner_a_filter
  TO "arn:aws:iam::444444444444:role/partner_a";

-- 5. PARTNER A runs Athena query — LF rewrites SQL at query time
-- Partner A's Athena query:
--   SELECT order_id, customer_id, amount, email, phone
--   FROM warehouse.orders
--   WHERE order_date >= '2024-09-01';
--
-- LF rewrites to (transparently):
--   SELECT order_id, customer_id, amount,
--          '***' AS email, '***' AS phone,
--          partner_id, order_date
--   FROM warehouse.orders
--   WHERE order_date >= '2024-09-01'
--     AND partner_id = 'partner_a'         -- row filter enforced
--   -- email + phone masked                  -- column mask enforced`,C=`-- ============================================================
-- AWS Lake Formation cross-account grants
-- Production account owns data; analytics + sandbox accounts read
-- ============================================================

-- Production account (111111111111) owns 10TB on S3
-- Analytics account (222222222222) reads via LF cross-account grant
-- Sandbox account (333333333333) reads non-sensitive tier only

-- 1. PRODUCTION ACCOUNT — grant cross-account access to analytics role
GRANT SELECT
  ON LF_TAG (env = 'prod')
  TO "arn:aws:iam::222222222222:role/analytics-lf-reader";

-- Sandbox account gets SELECT on non-sensitive tier only
GRANT SELECT
  ON LF_TAG (tier = 'non-sensitive')
  TO "arn:aws:iam::333333333333:role/sandbox-lf-reader";

-- Sandbox also gets public tier
GRANT SELECT
  ON LF_TAG (tier = 'public')
  TO "arn:aws:iam::333333333333:role/sandbox-lf-reader";

-- 2. ANALYTICS ACCOUNT — assume role, query via Athena
-- In analytics account (222222222222):
--   aws sts assume-role --role-arn arn:aws:iam::111111111111:role/cross-account-lf-reader
--   -- returns temp credentials (1h TTL)
--   -- Athena uses temp creds + LF grant to read S3

-- Athena query in analytics account:
--   SELECT * FROM warehouse.customer_events
--   WHERE event_date = '2024-09-25';
--   -- LF grants SELECT on env=prod tables to analytics-lf-reader role
--   -- Athena uses STS temp creds to read S3 — no direct bucket policy needed

-- 3. CROSS-ACCOUNT AUDIT — CloudTrail logs every LF grant + access
-- Production account CloudTrail:
--   eventSource: lakeformation.amazonaws.com
--   eventName: GrantPermissions | GetResourceLFTags | GetDataAccess
--   userIdentity.arn: who granted/accessed
--   resourceARN: which table/S3 path

-- 4. RESOURCE LINK — share catalog table to other accounts
-- (alternative to LF cross-account grants — link the table)
CREATE RESOURCE LINK warehouse.customer_events_link
  FROM PROD_ACCOUNT (111111111111).warehouse.customer_events
  TO ANALYTICS_ACCOUNT (222222222222);

-- 5. AUTOMATE WITH AWS LAMBDA — auto-grant on table-create
-- Lambda triggers on glue:CreateTable event
-- Reads table schema + applies LF-tags based on patterns
-- Grants standard principal accesses based on tags
-- Zero-touch governance — every new table tagged + granted automatically`,R=`# ============================================================
# AWS Lake Formation audit — every access logged in CloudTrail
# Python boto3 — query audit log for compliance + breach detection
# ============================================================

import boto3
import json
from datetime import datetime, timedelta

# CloudTrail client (production account)
ct = boto3.client('cloudtrail', region_name='us-east-1')
lf = boto3.client('lakeformation', region_name='us-east-1')

# 1. Get every LF event in last 90 days for SEC subpoena
end_time = datetime.utcnow()
start_time = end_time - timedelta(days=90)

events = []
paginator = ct.lookup_events(PaginationConfig={'PageSize': 1000})
for page in paginator.paginate(
    LookupAttributes=[{
        'AttributeKey': 'EventName',
        'AttributeValue': 'GrantPermissions',
    }],
    StartTime=start_time,
    EndTime=end_time,
):
    events.extend(page['Events'])

print(f"LF GrantPermissions events (last 90 days): {len(events)}")
for event in events[:5]:
    print(f"  {event['EventTime']}  principal={event['Username']}"
          f"  table={event.get('ResourceName', 'N/A')}")

# 2. Get every GetResourceLFTags call (catalog reads)
tag_reads = ct.lookup_events(
    LookupAttributes=[{
        'AttributeKey': 'EventName',
        'AttributeValue': 'GetResourceLFTags',
    }],
    StartTime=start_time,
    EndTime=end_time,
)
print(f"\\nLF-tag read events: {len(tag_reads.get('Events', []))}")

# 3. Get every GetDataAccess call (actual data access)
data_access = ct.lookup_events(
    LookupAttributes=[{
        'AttributeKey': 'EventName',
        'AttributeValue': 'GetDataAccess',
    }],
    StartTime=start_time,
    EndTime=end_time,
)
print(f"\\nData access events: {len(data_access.get('Events', []))}")

# 4. Detect MNPI violations — public team accessing MNPI columns
print(f"\\n=== MNPI violation detection ===")
violations = []
for event in events:
    if 'partner' in str(event).lower() and 'public' in str(event).lower():
        violations.append(event)
print(f"  Violations: {len(violations)} (auto-escalated to compliance)")

# 5. Get LF-tag assignments (governance state)
print(f"\\n=== LF-tag governance state ===")
tables = lf.list_resources(MaxResults=100)
print(f"  Registered S3 locations: {len(tables.get('ResourceInfoList', []))}")
for resource in tables.get('ResourceInfoList', [])[:3]:
    print(f"  {resource['ResourceArn']}")
    tags = lf.get_resource_lftags(
        Resource={'Database': {'Name': 'warehouse'}})
    print(f"    LF-tags: {tags}")`,N=`# ============================================================
# AWS Lake Formation — governs data access via credentials API
# Engine requests data access -> LF grants temp credentials
# ============================================================

import boto3
import json

lf = boto3.client('lakeformation', region_name='us-east-1')

# 1. GET TEMP CREDENTIALS for S3 data access
# Engine (Athena/Spark/EMR) calls LF to get temp creds scoped to the LF grants
response = lf.get_data_access(
    TableCatalogId='111111111111',
    DatabaseName='warehouse',
    TableName='customer_events',
    Columns=['event_id', 'customer_id', 'amount'],  # only allowed cols
    Duration='3600',  # 1 hour TTL
)

print(f"Temp credentials (TTL: 1 hour):")
print(f"  Access key: {response['AccessKey']}")
print(f"  Secret key: {response['SecretAccessKey'][:10]}...")
print(f"  Session token: {response['SessionToken'][:20]}...")
print(f"  S3 path (scoped): {response['Path']}")
print(f"  Expiry: {response['ExpiryTime']}")

# 2. ENFORCED — engine reads only what LF granted
# Engine (e.g. Athena) uses temp creds to read S3
# S3 sees: temp creds + scoped path + expiry
# Without LF grant: S3 access denied
# With LF grant but wrong cols: S3 sees partial file (columnar projection)

# 3. CELL-LEVEL RLS — LF rewrites SQL at engine query time
# Partner A queries via Athena:
#   SELECT * FROM warehouse.orders
# LF (via Athena connector) rewrites to:
#   SELECT * FROM warehouse.orders WHERE partner_id = 'partner_a'
# Athena sends rewritten SQL + LF temp creds to S3
# S3 returns only partner A's rows

# 4. COLUMN MASKING — LF replaces PII values at query time
# Email column tagged pii=mask:
#   SELECT email FROM warehouse.orders
# LF rewrites to:
#   SELECT '***' AS email FROM warehouse.orders
# Partner sees '***' instead of actual PII

# 5. AUDIT — every GetDataAccess call logged
# CloudTrail events:
#   eventName: GetDataAccess
#   userIdentity: principal ARN
#   resourceARN: table + columns accessed
#   responseElements.path: scoped S3 path (proves LF enforced scoping)
#   responseElements.accessKey: temp creds issued
#   responseElements.expiryTime: when creds expire

print(f"\\nKey insight: LF credentials API is the structural enforcement.")
print(f"Without LF grant -> S3 returns AccessDenied.")
print(f"With LF grant -> S3 sees scoped temp creds, returns only granted data.")
print(f"Engines cannot bypass LF — they have no direct S3 access.")`,j=`# ============================================================
# AWS Lake Formation — in-browser simulation
# Cell-level RLS + LF-tags + cross-account grants on synthetic data
# ============================================================

import math
import random
from collections import defaultdict, deque

# --- Synthetic AWS Lake Formation ---
class LakeFormation:
    """Simulated AWS Lake Formation — IAM for data on S3."""
    def __init__(self):
        self.s3_locations = []           # registered S3 paths
        self.lf_tags = defaultdict(set)  # tag_key -> {tag_values}
        self.table_tags = defaultdict(dict)  # table -> {tag_key: tag_value}
        self.column_tags = defaultdict(lambda: defaultdict(dict))  # (table, col) -> tags
        self.grants = defaultdict(list)  # principal -> [(lf_tag, perm)]
        self.cell_filters = defaultdict(list)  # table -> [filter]
        self.audit_log = []              # CloudTrail-equivalent
    def register_s3(self, s3_path):
        self.s3_locations.append(s3_path)
        self._log('RegisterResource', s3_path)
    def create_lf_tag(self, key, values):
        self.lf_tags[key].update(values)
        self._log('CreateLFTag', f"{key}={values}")
    def tag_table(self, table, key, value):
        self.table_tags[table][key] = value
        self._log('AddLFTagsToResource', f"{table}:{key}={value}")
    def tag_column(self, table, col, key, value):
        self.column_tags[(table, col)][key] = value
    def grant(self, principal, lf_tag_key, lf_tag_value, perm):
        self.grants[principal].append({
            'lf_tag': (lf_tag_key, lf_tag_value), 'perm': perm,
        })
        self._log('GrantPermissions', f"{principal}->{lf_tag_key}={lf_tag_value}")
    def create_cell_filter(self, table, name, row_filter, excluded_cols):
        self.cell_filters[table].append({
            'name': name, 'row_filter': row_filter,
            'excluded_cols': excluded_cols,
        })
        self._log('CreateDataCellsFilter', f"{table}:{name}")
    def check_access(self, principal, table, cols):
        """LF enforces RBAC at query time."""
        # Check column-level LF-tags (PII)
        for col in cols:
            ct = self.column_tags.get((table, col), {})
            if ct.get('pii') == 'mask':
                return False, f"Column {col} tagged pii=mask — masked"
        # Check LF-tag grants
        table_tags = self.table_tags.get(table, {})
        for grant in self.grants.get(principal, []):
            tag_key, tag_value = grant['lf_tag']
            if table_tags.get(tag_key) == tag_value:
                return True, "GRANTED"
        # Check cell-level RLS
        for f in self.cell_filters.get(table, []):
            if principal.endswith(f['name'].replace('_filter', '')):
                return True, f"GRANTED (RLS: {f['row_filter']})"
        return False, "DENIED"
    def _log(self, action, resource):
        self.audit_log.append({
            'action': action, 'resource': resource,
            'timestamp': len(self.audit_log) + 1,
        })

# --- Simulate multi-account governance + partner sharing ---
random.seed(42)
print("=== AWS Lake Formation — multi-account + cell-level RLS simulation ===\\n")

lf = LakeFormation()

# 1. REGISTER S3 location (production account owns 10TB)
lf.register_s3('s3://moderndatascieng-prod-warehouse')
print(f"1. Registered S3: s3://moderndatascieng-prod-warehouse (10TB)")

# 2. CREATE LF-TAG DIMENSIONS
print(f"\\n2. LF-tag dimensions:")
lf.create_lf_tag('env', ['prod', 'staging', 'dev'])
lf.create_lf_tag('tier', ['sensitive', 'internal', 'non-sensitive', 'public'])
lf.create_lf_tag('domain', ['customer', 'finance', 'ml', 'ops'])
lf.create_lf_tag('pii', ['mask', 'anonymize', 'allow'])
lf.create_lf_tag('partner', ['partner_a', 'partner_b', 'partner_c'])
for key, values in lf.lf_tags.items():
    print(f"  {key:8s}: {', '.join(sorted(values))}")

# 3. TAG 100 TABLES with 4 dims (simulating Lambda auto-tagger)
print(f"\\n3. Auto-tagging 100 tables (Lambda on glue:CreateTable):")
tables = []
for t_idx in range(100):
    table_name = f"warehouse.table_{t_idx:03d}"
    domain = random.choice(list(lf.lf_tags['domain']))
    tier = random.choice(list(lf.lf_tags['tier']))
    pii = 'mask' if t_idx % 5 == 0 else 'allow'
    lf.tag_table(table_name, 'env', 'prod')
    lf.tag_table(table_name, 'domain', domain)
    lf.tag_table(table_name, 'tier', tier)
    lf.tag_table(table_name, 'pii', pii)
    tables.append({'name': table_name, 'domain': domain, 'tier': tier, 'pii': pii})

# Tag PII columns (subset)
for t in tables[:20]:  # 20 tables have PII columns
    lf.tag_column(t['name'], 'email', 'pii', 'mask')
    lf.tag_column(t['name'], 'phone', 'pii', 'mask')

print(f"  Tagged {len(tables)} tables with 4 dims each")
print(f"  {20} tables have PII column masks (email, phone)")

# 4. GRANT PRINCIPALS by LF-tag (5 principal groups, 5 grants)
print(f"\\n4. Principal grants (by LF-tag, not by table):")
grants = [
    ('arn:aws:iam::111111111111:group/analysts', 'tier', 'internal'),
    ('arn:aws:iam::111111111111:group/analysts', 'tier', 'non-sensitive'),
    ('arn:aws:iam::111111111111:group/data-scientists', 'domain', 'ml'),
    ('arn:aws:iam::111111111111:group/finance-team', 'domain', 'finance'),
    ('arn:aws:iam::222222222222:role/analytics-lf-reader', 'env', 'prod'),
    ('arn:aws:iam::333333333333:role/sandbox-lf-reader', 'tier', 'non-sensitive'),
]
for principal, tag_key, tag_value in grants:
    lf.grant(principal, tag_key, tag_value, 'SELECT')
    print(f"  GRANT SELECT ON LF_TAG({tag_key}={tag_value}) TO {principal.split('/')[-1]}")

# 5. EFFECTIVE ACCESS — what each principal sees
print(f"\\n5. Effective access (principal -> # tables visible):")
for principal, tag_key, tag_value in grants:
    visible = sum(1 for t in tables
                  if t[tag_key] == tag_value)
    pct = visible / len(tables) * 100
    name = principal.split('/')[-1]
    print(f"  {name:35s}: {visible}/{len(tables)} tables ({pct:.0f}%)")

# 6. RE-TAG SCENARIO — promote table_042 from staging to prod (instant re-route)
print(f"\\n6. Re-tag scenario (table_042 env staging -> prod):")
table_042 = next(t for t in tables if t['name'] == 'table_042')
print(f"  Before: {table_042}")
old_env = table_042['env']
table_042['env'] = 'prod'
lf.tag_table(table_042['name'], 'env', 'prod')
print(f"  After:  {table_042}")
print(f"  Re-route time: <1s (single LF API call)")
print(f"  No per-resource grants to update (would be 50 GRANT statements)")

# 7. CELL-LEVEL RLS — partner data sharing
print(f"\\n7. Cell-level RLS for partner data sharing:")
partners = ['partner_a', 'partner_b', 'partner_c']
for partner in partners:
    lf.create_cell_filter(
        'warehouse.orders', f"{partner}_filter",
        f"partner_id = '{partner}'",
        ['email', 'phone'])
    print(f"  {partner}: filter '{partner}_filter' "
          f"(row: partner_id='{partner}', masked: email, phone)")

# 8. AUDIT LOG — CloudTrail-equivalent
print(f"\\n8. Audit log (CloudTrail): {len(lf.audit_log)} events")
print(f"  Sample (first 5):")
for event in lf.audit_log[:5]:
    print(f"  ts={event['timestamp']} action={event['action']:30s} "
          f"resource={event['resource']}")
print(f"  ... ({len(lf.audit_log)-5} more)")

# 9. CROSS-ACCOUNT — STS AssumeRole flow
print(f"\\n9. Cross-account STS AssumeRole flow:")
print(f"  1. Analytics account: sts:AssumeRole on arn:aws:iam::")
print(f"     111111111111:role/cross-account-lf-reader")
print(f"  2. Returns temp credentials (1h TTL)")
print(f"  3. Athena uses temp creds + LF grant to read S3")
print(f"  4. No direct S3 bucket policy needed (LF authorises)")

# 10. COMPARISON — LF vs S3 bucket policies (pre-LF)
print(f"\\n=== Comparison: LF vs S3 bucket policies ===")
print(f"  LF-tags (100 tables, 5 principal groups):")
print(f"    Total GRANT statements: 5 (one per principal group, by tag)")
print(f"    Add new table: 0 GRANTs (just tag it)")
print(f"    Audit: 1 CloudTrail stream (lakeformation.amazonaws.com)")
print(f"  S3 bucket policies (pre-LF):")
print(f"    Total GRANT statements: ~500 (100 tables x 5 groups)")
print(f"    Add new table: 5 GRANTs (one per group)")
print(f"    Audit: 1 CloudTrail stream (s3.amazonaws.com) — hard to correlate")
print(f"\\nKey insight: Lake Formation is IAM for data — it centralises")
print(f"access control for S3-backed data lakes in one governance plane.")
print(f"LF-tags invert governance from grant-per-resource (O(n*m)) to")
print(f"grant-per-tag-value (O(m)). Cell-level RLS is the only structural")
print(f"answer for partner data sharing (no app-layer or 3x data duplication).")`;function E(){let[e,t]=(0,r.useState)("lf"),n={s3:{label:"S3 (production)",desc:"Customer's S3 bucket in production account (111111111111). LF registers the S3 location — data stays in customer account, LF never sees bytes",level:0},lf:{label:"Lake Formation",desc:"Centralised data governance plane — registers S3, tags tables with LF-tags (env/tier/domain/pii), grants access by tag (not per-resource), enforces cell-level RLS + column masking",level:1},glue:{label:"Glue Data Catalog",desc:"Metadata layer — table schemas, partitions, locations. LF integrates with Glue for table metadata",level:1},athena:{label:"Athena (analytics)",desc:"Serverless SQL — calls LF to get temp creds scoped to LF grants, reads S3 directly. LF rewrites SQL with row filters + column masks",level:2},redshift:{label:"Redshift Spectrum",desc:"Redshift reads external S3 tables via LF grants — same governance plane as Athena",level:2},partner:{label:"Partner (external account)",desc:"Partner account (444444444444) assumes role + queries via Athena — LF cell-level RLS enforces row filter + column mask",level:2},cloudtrail:{label:"CloudTrail audit",desc:"Every LF API call logged — eventSource=lakeformation.amazonaws.com. Used for SEC compliance, breach detection, MNPI violation alerts",level:3}},o={s3:{x:60,y:40},lf:{x:200,y:100},glue:{x:200,y:40},athena:{x:340,y:40},redshift:{x:340,y:100},partner:{x:340,y:160},cloudtrail:{x:60,y:160}};return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(h.ShieldCheck,{className:"h-3.5 w-3.5 text-primary"}),"Lake Formation architecture — central governance plane for S3-backed data lakes (multi-account + cell-level RLS + LF-tags)"]})}),(0,a.jsxs)("div",{className:"p-3",children:[(0,a.jsxs)("svg",{viewBox:"0 0 420 220",className:"w-full h-auto",children:[[["s3","lf"],["glue","lf"],["lf","athena"],["lf","redshift"],["lf","partner"],["lf","cloudtrail"],["athena","s3"],["redshift","s3"],["partner","s3"]].map(([e,t],r)=>{let s=o[e],n=o[t];return(0,a.jsx)("line",{x1:s.x,y1:s.y,x2:n.x,y2:n.y,stroke:"var(--border)",strokeWidth:"0.8",markerEnd:"url(#arrow)"},r)}),Object.entries(o).map(([r,o])=>{let i=e===r,l=n[r],c=0===l.level?"var(--chart-3)":1===l.level?"var(--chart-2)":2===l.level?"var(--chart-1)":"var(--chart-4)";return(0,a.jsxs)(s.motion.g,{onMouseEnter:()=>t(r),onMouseLeave:()=>t(null),animate:{scale:i?1.05:1},style:{cursor:"pointer"},children:[(0,a.jsx)("rect",{x:o.x-60,y:o.y-12,width:"120",height:"24",rx:"3",fill:i?c+"30":"var(--background)",stroke:c,strokeWidth:i?1.5:.8}),(0,a.jsx)("text",{x:o.x,y:o.y+4,textAnchor:"middle",fontSize:"7",fill:i?c:"var(--foreground)",fontWeight:i?"bold":"normal",children:l.label})]},r)}),(0,a.jsx)("defs",{children:(0,a.jsx)("marker",{id:"arrow",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,a.jsx)("path",{d:"M0,0 L6,3 L0,6",fill:"var(--muted-foreground)",opacity:"0.5"})})})]}),e&&(0,a.jsxs)("div",{className:"mt-2 rounded-md border border-primary/30 bg-primary/5 p-2 text-xs",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-0.5",children:n[e].label}),(0,a.jsx)("p",{className:"text-muted-foreground",children:n[e].desc})]}),!e&&(0,a.jsx)("p",{className:"mt-2 text-[10px] text-muted-foreground text-center",children:"Hover any node — LF sits between S3 (storage) + Glue (catalog) and compute engines (Athena + Redshift + Partner) — centralised governance plane."})]})]})}function I(){return(0,a.jsxs)("div",{className:"rounded-md border border-border/60 bg-card overflow-hidden",children:[(0,a.jsx)("div",{className:"px-3 py-2 bg-muted/40 border-b border-border/60",children:(0,a.jsxs)("p",{className:"text-xs font-semibold flex items-center gap-1.5",children:[(0,a.jsx)(h.ShieldCheck,{className:"h-3.5 w-3.5 text-primary"}),"Lake Formation vs Unity vs Polaris vs Ranger — lakehouse governance comparison"]})}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-xs",children:[(0,a.jsx)("thead",{className:"bg-muted/30",children:(0,a.jsxs)("tr",{className:"border-b border-border/60",children:[(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Feature"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold text-primary",children:"Lake Formation"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Unity Catalog"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Polaris"}),(0,a.jsx)("th",{className:"text-left px-3 py-2 font-semibold",children:"Apache Ranger"})]})}),(0,a.jsx)("tbody",{children:[{feature:"Origin",lf:"AWS 2017 (re:Invent)",unity:"Databricks 2021",polaris:"Snowflake 2024",ranger:"Apache (Hortonworks 2014)"},{feature:"Vendor",lf:"AWS (managed)",unity:"Databricks",polaris:"Snowflake (Apache)",ranger:"Apache (self-hosted)"},{feature:"Open-source",lf:"No (AWS)",unity:"No (Databricks)",polaris:"Yes (Apache)",ranger:"Yes (Apache)"},{feature:"Storage backend",lf:"S3 only",unity:"S3 + ADLS + GCS",polaris:"S3 + ADLS + GCS",ranger:"HDFS + S3"},{feature:"Cell-level RLS",lf:"Yes (LF Data Cells)",unity:"Yes (dynamic views)",polaris:"Limited (via Iceberg)",ranger:"Yes (Ranger policies)"},{feature:"Column masking",lf:"Yes (LF-tags + wildcard)",unity:"Yes (dynamic views)",polaris:"Limited",ranger:"Yes (mask + obfuscate)"},{feature:"Cross-account",lf:"Yes (STS AssumeRole)",unity:"No (Databricks-bound)",polaris:"Yes (multi-cloud)",ranger:"Yes (Kerberos)"},{feature:"Tag-based governance",lf:"Yes (LF-tags)",unity:"Yes (Unity tags)",polaris:"Yes (Polaris RBAC)",ranger:"Yes (Ranger tags)"},{feature:"Native compute",lf:"Athena + Redshift Spectrum",unity:"Databricks Photon + SQL",polaris:"Snowflake + Spark + Trino",ranger:"Hive + Impala + Spark"},{feature:"Audit log",lf:"CloudTrail",unity:"system.access.audit",polaris:"Polaris audit",ranger:"Ranger audit (custom)"},{feature:"Best fit",lf:"AWS-only lakes",unity:"Databricks ecosystem",polaris:"Cross-engine open lakehouse",ranger:"Self-hosted Hadoop"},{feature:"Production use",lf:"All AWS customers with S3 lakes",unity:"All Databricks customers",polaris:"Snowflake + Tabular team",ranger:"Cloudera customers"}].map((e,t)=>(0,a.jsxs)("tr",{className:"border-b border-border/40 last:border-0 hover:bg-muted/20",children:[(0,a.jsx)("td",{className:"px-3 py-2 font-medium",children:e.feature}),(0,a.jsx)("td",{className:"px-3 py-2 text-primary/80",children:e.lf}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.unity}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.polaris}),(0,a.jsx)("td",{className:"px-3 py-2 text-muted-foreground",children:e.ranger})]},t))})]})})]})}let P=[{label:"Origin",value:"AWS re:Invent 2017",hint:"Lake Formation launched 2017 as the AWS-native governance layer for S3-backed data lakes — extends IAM to data (table, column, row, cell-level)",deltaTone:"flat"},{label:"Cell-level RLS",value:"Yes (LF Data Cells)",hint:"Row filters + column masks enforced at query time — LF rewrites partner's SQL transparently. Only AWS-native way to share data at row + column granularity",deltaTone:"up"},{label:"LF-tags governance",value:"Tag-based grants",hint:"Inverts governance from grant-per-resource (O(n*m)) to grant-per-tag-value (O(m)). At 100 tables × 5 groups: 5 grants vs 500 per-resource grants",deltaTone:"up"},{label:"Cross-account grants",value:"STS AssumeRole",hint:"Multi-account pattern (prod + analytics + sandbox) via STS temp creds. Production owns data, others read via LF grants — no direct S3 bucket policies needed",deltaTone:"up"}];function G(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(n.PageHeader,{eyebrow:"AWS Lake Formation · IAM for data · cell-level RLS + LF-tags + cross-account governance",title:"AWS Lake Formation — the most production-deployed lakehouse governance on AWS",description:"AWS Lake Formation (launched re:Invent 2017) is the AWS-native governance layer for S3-backed data lakes — it extends IAM to data, providing table, column, row, and cell-level access control that pure IAM/S3 bucket policies cannot. Three killer features: (1) cell-level row-level security (RLS) + column masking — LF rewrites partner's SQL at query time to append AND partner_id='X' (row filter) and replace email with '***' (column mask), only AWS-native way to share data with partners at row + column granularity without 3× data duplication; (2) LF-tags governance — tag tables by 4 dimensions (env/tier/domain/pii), grant by tag (not per-resource), reducing 100 tables × 5 principal groups from 500 grants to 5 grants; (3) cross-account grants via STS AssumeRole — multi-account pattern (production owns data, analytics + sandbox read via LF grants) with temp credentials (1h TTL) audited in CloudTrail. The most production-deployed lakehouse governance on AWS — every AWS customer with a S3 data lake of meaningful size uses Lake Formation as their governance spine. Integrates with Glue Data Catalog (table metadata), Athena (serverless SQL), Redshift Spectrum (federated query), and 3rd-party engines (Spark on EMR, Trino) via LF credentials API.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(h.ShieldCheck,{className:"h-3 w-3"})," Cell-level RLS"]}),(0,a.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(L.Lock,{className:"h-3 w-3"})," LF-tags"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:P.map(e=>(0,a.jsx)(n.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsx)(n.SectionCard,{title:"Lake Formation architecture — central governance plane for S3-backed data lakes",description:"Lake Formation sits between S3 (storage) + Glue Data Catalog (metadata) and compute engines (Athena, Redshift Spectrum, partner accounts). Customer registers their S3 location with LF — LF now manages access to that bucket. Tables are tagged with LF-tags (env/tier/domain/pii). Principal grants are by LF-tag (not per-resource) — at 100 tables × 5 groups, 5 grants vs 500 per-resource. Compute engines call LF's get_data_access API to get temp credentials scoped to LF grants — engine uses temp creds to read S3, no direct bucket policy needed. Cell-level RLS rewrites partner SQL at query time (row filter + column mask). Every LF API call logged in CloudTrail for SEC compliance + breach detection.",icon:(0,a.jsx)(b.Atom,{className:"h-5 w-5"}),badge:"architecture",children:(0,a.jsx)(E,{})}),(0,a.jsx)(n.SectionCard,{title:"Register S3 + LF-tags + grant by tag — production account setup",description:"Step 1: register S3 location (LF now manages access). Step 2: create LF-tag dimensions (env, tier, domain, pii — 4 tag dimensions cover most governance use cases). Step 3: tag tables with LF-tags (Lambda auto-tagger on glue:CreateTable event applies tags based on table name + schema patterns). Step 4: tag PII columns (email, phone) for masking. Step 5: grant principals by LF-tag (not per-resource) — analysts get SELECT on internal+non-sensitive+public tiers; data scientists get SELECT on ML domain; finance team gets SELECT on finance domain.",icon:(0,a.jsx)(h.ShieldCheck,{className:"h-5 w-5"}),badge:"LF-tags SQL",children:(0,a.jsx)(i.CodeBlock,{code:k,language:"sql",filename:"lf_register_s3.sql",highlight:[10,14,15,16,17,19,20,21,22,25,26,27,28,29,30,31,32,33,34,35,38,39,40,43,44,45,49,50,51,53,54,55,58,59,60]})}),(0,a.jsx)(n.SectionCard,{title:"Cell-level RLS — partner data sharing with row filters + column masks",description:"Partner A reads customer orders — only their co-sold orders (row filter partner_id='partner_a'), with PII columns masked (email='***', phone='***'). LF creates Data Cells Filters per partner principal, then grants partners access to their filter. Partner A runs Athena query — LF rewrites the SQL transparently to append AND partner_id='partner_a' (row filter) and replace email+phone with '***' (column mask). Partner cannot bypass — enforcement is at the LF credentials API level. The only AWS-native way to share data with partners at row + column granularity.",icon:(0,a.jsx)(L.Lock,{className:"h-5 w-5"}),badge:"Cell-level RLS SQL",children:(0,a.jsx)(i.CodeBlock,{code:_,language:"sql",filename:"lf_cell_rls.sql",highlight:[8,9,13,14,15,16,21,22,23,24,25,26,30,31,32,33,34,38,39,40,41,47,48,49,50,53,54,55,56,57,58,59,60,61]})}),(0,a.jsx)(n.SectionCard,{title:"Cross-account grants — multi-account pattern via STS AssumeRole",description:"Production account (111111111111) owns 10TB on S3. Analytics account (222222222222) reads via LF cross-account grant on LF_TAG(env=prod). Sandbox account (333333333333) reads non-sensitive tier only (LF_TAG(tier=non-sensitive)). Analytics account assumes role via STS AssumeRole (temp creds, 1h TTL), then Athena uses those temp creds + LF grant to read S3 — no direct S3 bucket policy needed. CloudTrail logs every LF grant + access event in the production account (eventSource=lakeformation.amazonaws.com). Lambda auto-tagger triggers on glue:CreateTable event — applies LF-tags based on patterns + grants standard principal accesses automatically (zero-touch governance).",icon:(0,a.jsx)(w.Building2,{className:"h-5 w-5"}),badge:"Cross-account SQL",children:(0,a.jsx)(i.CodeBlock,{code:C,language:"sql",filename:"lf_cross_account.sql",highlight:[10,11,12,15,16,17,20,21,22,26,27,28,31,32,33,34,38,39,40,41,42,43,44]})}),(0,a.jsx)(n.SectionCard,{title:"Audit + MNPI violation detection — CloudTrail + boto3",description:"Python boto3 queries CloudTrail for LF events (GrantPermissions, GetResourceLFTags, GetDataAccess) — every LF API call logged for SEC subpoena compliance. Detect MNPI violations (public team accessing MNPI columns). Get LF-tag assignments (governance state). Every event includes: eventTime, principal (userIdentity.arn), action, table/columns accessed. Used by JPMorgan + Goldman Sachs for SEC Rule 17a-4 (7-year retention) + MNPI separation enforcement.",icon:(0,a.jsx)(y.FileText,{className:"h-5 w-5"}),badge:"Python audit",children:(0,a.jsx)(i.CodeBlock,{code:R,language:"python",filename:"lf_audit.py",highlight:[12,13,17,18,19,20,21,22,23,24,28,29,30,31,32,36,37,38,42,43,44,45,49,50,51,52,53,54,55,56]})}),(0,a.jsx)(n.SectionCard,{title:"LF credentials API — engine requests data access, LF grants temp creds",description:"Engine (Athena, Spark on EMR, Trino) calls LF's get_data_access API with table + columns + duration — LF returns temp credentials scoped to the LF grants. Engine uses temp creds to read S3 directly. S3 sees: temp creds + scoped path + expiry. Without LF grant: S3 access denied. With LF grant but wrong cols: S3 sees partial file (columnar projection). Cell-level RLS + column masking happens BEFORE the engine sees the SQL — LF rewrites the SQL at query time. Engines cannot bypass LF — they have no direct S3 access.",icon:(0,a.jsx)(S.Cpu,{className:"h-5 w-5"}),badge:"Python data API",children:(0,a.jsx)(i.CodeBlock,{code:N,language:"python",filename:"lf_data_api.py",highlight:[10,11,12,13,14,15,19,20,21,22,23,24,25,28,29,30,31,32,33,34,35,36,37,38,41,42,43,44,45,46,47,51,52,53,54]})}),(0,a.jsx)(n.SectionCard,{title:"Try it: simulate AWS Lake Formation in your browser (Pyodide)",description:"Pure-Python simulation of AWS Lake Formation — multi-account governance + cell-level RLS + LF-tags on synthetic 10TB. Register S3, create 5 LF-tag dimensions (env/tier/domain/pii/partner), auto-tag 100 tables (Lambda pattern), grant 5 principal groups by LF-tag (5 grants vs 500 per-resource), re-tag scenario (instant re-route, <1s), cell-level RLS for 3 partner filters (row filter + column mask), audit log of every event, cross-account STS AssumeRole flow simulation.",icon:(0,a.jsx)(A.Sparkles,{className:"h-5 w-5"}),badge:"executable",children:(0,a.jsx)(l.PyodideRunner,{code:j,buttonLabel:"Run Lake Formation simulation (Pyodide)"})}),(0,a.jsx)(n.SectionCard,{title:"Lake Formation vs Unity vs Polaris vs Ranger — lakehouse governance comparison",description:"Four lakehouse governance systems compared. Lake Formation (AWS, managed, S3-only) is the most production-deployed AWS-native. Unity (Databricks, closed, Databricks-bound) is the closed competitor. Polaris (Snowflake, Apache, multi-cloud) is the open challenger. Ranger (Apache, self-hosted, Hadoop-first) is the legacy. The choice depends on cloud (AWS-only → LF; multi-cloud → Polaris; Databricks ecosystem → Unity; self-hosted Hadoop → Ranger).",icon:(0,a.jsx)(h.ShieldCheck,{className:"h-5 w-5"}),children:(0,a.jsx)(I,{})}),(0,a.jsx)(n.SectionCard,{title:"Why Lake Formation evolved — shortfalls of S3 bucket policies + IAM (Era 2)",description:"AWS launched Lake Formation (2017) to fix four structural shortfalls of the prior governance model — S3 bucket policies + IAM roles — that became visible as customers built large S3 data lakes with multiple teams and partners.",icon:(0,a.jsx)(v.History,{className:"h-5 w-5"}),badge:"Why Lake Formation",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 1: S3 bucket policies didn't scale."})," Pre-LF, data access on S3 meant bucket policies (~200 lines of JSON per bucket) + per-principal IAM roles. At 100 buckets × 50 principals, drift was inevitable — policies became unreadable, security reviews took weeks, breaches hid in the complexity. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Lake Formation centralises access control in one governance plane — LF-tags invert the model from grant-per-resource (O(n×m)) to grant-per-tag-value (O(m)). 5 grants vs 500 per-resource at 100 tables × 5 groups."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 2: S3 was object-level, no row + column RBAC."})," S3 bucket policies grant at the object level — you can't say 'principal can read table X but only rows where partner_id=Y and email is masked.' Partner data sharing required either bespoke app-layer enforcement (bug-prone — one bad commit leaks partner data) or 3× data duplication (one copy per partner, drift between copies, expensive). ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Lake Formation cell-level RLS — LF rewrites partner's SQL at query time: appends AND partner_id='X' (row filter), replaces email+phone with '***' (column mask). 1 copy of data, 1 governance plane, 1 audit log."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 3: Cross-account was hard to debug."})," Pre-LF, cross-account S3 access required bucket policies with cross-account principal ARNs — multiple accounts in the same JSON, hard to debug (which principal accessed which object?), prone to over-grant (wildcards in the wrong place). ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Lake Formation cross-account grants via STS AssumeRole — temp credentials (1h TTL), audited in CloudTrail. Production owns data, analytics + sandbox accounts assume roles. No direct bucket policies — LF authorises."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Shortfall 4: Audit was scattered."})," Pre-LF, audit logs were split across CloudTrail (S3 API calls), Glue (table metadata changes), bespoke app logs (per-app enforcement). Correlating a security incident required manual log stitching. ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"Result:"})," Lake Formation centralises audit — eventSource=lakeformation.amazonaws.com logs every GrantPermissions, GetResourceLFTags, GetDataAccess call with principal + table + columns. SEC subpoenas answered in minutes (one CloudTrail query) vs weeks (manual log stitching)."]})]})}),(0,a.jsx)(n.SectionCard,{title:"Truly unique Lake Formation features",description:"Four features that distinguish Lake Formation from every other lakehouse governance system — each is structural, not marketing fluff.",icon:(0,a.jsx)(A.Sparkles,{className:"h-5 w-5"}),badge:"Unique features",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-3 text-xs",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"1. Cell-level RLS (AWS-native)"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Only AWS-native way to share data with partners at row + column granularity. LF rewrites SQL at query time — partner cannot bypass. ",(0,a.jsx)("strong",{children:"Unity has dynamic views (similar). Polaris has limited. Ranger has policies. LF's enforcement is at the credentials API level."})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"2. LF-tags governance (O(m) not O(n*m))"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Inverts governance from grant-per-resource to grant-per-tag-value. At 100 tables × 5 groups: 5 grants vs 500 per-resource. ",(0,a.jsx)("strong",{children:"Unity has tags. Polaris has tags. Ranger has tags. LF's Lambda auto-tagger makes it self-driving."})]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"3. STS cross-account (1h temp creds)"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Multi-account pattern via STS AssumeRole — temp credentials (1h TTL), no direct S3 bucket policies. ",(0,a.jsx)("strong",{children:"Unity is Databricks-bound (no cross-account). Polaris has OAuth2 (different model). Ranger has Kerberos (legacy)."})," LF + STS is the AWS-native way."]})]}),(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsx)("p",{className:"font-semibold text-primary mb-1",children:"4. CloudTrail audit (single stream)"}),(0,a.jsxs)("p",{className:"text-muted-foreground",children:["Every LF API call logged in one CloudTrail stream (eventSource=lakeformation.amazonaws.com). SEC subpoena answered in minutes. ",(0,a.jsx)("strong",{children:"Unity has system.access.audit (similar). Polaris has audit. Ranger has custom logs."})," LF's CloudTrail integration is the most production-proven for compliance."]})]})]})}),(0,a.jsx)(n.SectionCard,{title:"3 large-dataset examples — cards with 5-language code popups",description:"Three production-style AWS Lake Formation scenarios: multi-account governance on 10TB across 3 AWS accounts, partner data sharing with cell-level RLS on 5TB, LF-tags governance on 100 tables with tag-based policy enforcement. Each is a clickable card opening a lazy popup with: scenario brief, dataset stats grid, computational tooling, multi-language code in Scala + Rust + Go + Elixir + Zig, and an implementation insight.",icon:(0,a.jsx)(f.Database,{className:"h-5 w-5"}),badge:"3 examples × 5 langs",children:(0,a.jsx)(d.DatasetCards,{examples:u.AWS_LAKE_FORMATION_EXAMPLES,intro:"Production-style AWS Lake Formation scenarios showing the governance spine: multi-account grants via STS AssumeRole on 10TB, partner data sharing with cell-level RLS on 5TB, LF-tags tag-based governance on 100 tables. Each card has Scala/Rust/Go/Elixir/Zig code with Lake Formation-specific primitives (cell-level RLS, LF-tags, cross-account grants)."})}),(0,a.jsx)(n.SectionCard,{title:"Computational tooling — Lake Formation ecosystem",description:"Lake Formation's ecosystem includes the compute engines that read via LF (Athena, Redshift Spectrum, Spark on EMR, Trino) + the storage it governs (S3) + the catalog it integrates with (Glue Data Catalog) + the audit plane (CloudTrail) + the auto-tagger pattern (Lambda on glue:CreateTable).",icon:(0,a.jsx)(T.Server,{className:"h-5 w-5"}),badge:"ecosystem",children:(0,a.jsxs)("div",{className:"grid md:grid-cols-2 gap-4 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(S.Cpu,{className:"h-3.5 w-3.5 text-primary"})," Compute engines (LF-integrated)"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Athena"})," — serverless SQL, calls LF for temp creds"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Redshift Spectrum"})," — federated query, same LF grants"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Apache Spark on EMR"})," — reads via LF credentials API"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Trino on EMR"})," — federated SQL via LF"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Glue ETL"})," — serverless Spark, uses LF grants"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"3rd-party engines"})," — via LF credentials API (boto3)"]})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("p",{className:"font-semibold mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(F.Cloud,{className:"h-3.5 w-3.5 text-primary"})," Storage + integration"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS S3"})," — only storage backend LF governs (AWS-native)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Glue Data Catalog"})," — table metadata (schemas, partitions)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"CloudTrail"})," — audit log (eventSource=lakeformation.amazonaws.com)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS STS"})," — cross-account AssumeRole + temp creds"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS Lambda"})," — auto-tagger on glue:CreateTable event"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"AWS IAM"})," — principals (users, groups, roles)"]})]}),(0,a.jsxs)("p",{className:"font-semibold mt-3 mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(b.Atom,{className:"h-3.5 w-3.5 text-primary"})," Production adopters"]}),(0,a.jsxs)("ul",{className:"space-y-1 text-muted-foreground",children:[(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"JPMorgan"})," — risk + regulatory (MNPI RBAC for SEC)"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Capital One"})," — customer data governance"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"BYD"})," — IoT analytics on S3"]}),(0,a.jsxs)("li",{children:["• ",(0,a.jsx)("strong",{children:"Most Fortune 500 on AWS"})," — S3 data lake governance"]})]})]})]})}),(0,a.jsx)(n.SectionCard,{title:"Research + production case studies",description:"AWS Lake Formation (2017) is the most production-deployed lakehouse governance on AWS. These are the strategic moves + production case studies that established it.",icon:(0,a.jsx)(y.FileText,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"AWS re:Invent 2017 launch:"})," Lake Formation launched as the AWS-native governance layer for S3 data lakes. Pre-LF, S3 access meant bucket policies (~200 lines JSON per bucket) + per-principal IAM roles — didn't scale, no row/column RBAC, no centralised audit. LF introduced: centralised governance plane, LF-tags (tag-based grants), cell-level RLS + column masking, cross-account grants via STS AssumeRole."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"LF-tags release (2019):"})," Tag-based governance — grant by tag (env=prod, tier=sensitive), not per-resource. Inverts the model from O(n×m) grants to O(m) grants. At 100 tables × 5 principal groups: 5 grants vs 500 per-resource. Re-tagging a table instantly re-routes access across all principals — single LF API call, sub-1s, no per-resource grants to update. Lambda auto-tagger on glue:CreateTable event makes it self-driving."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Cell-level RLS release (2020):"})," Data Cells Filters — row filter expressions + column wildcard exclusions per principal. LF rewrites partner's SQL at query time: appends AND partner_id='X' (row filter), replaces email+phone with '***' (column mask). The only AWS-native way to share data with partners at row + column granularity without 3× data duplication."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"JPMorgan risk platform (2022+):"})," 100M trades/day on Lake Formation. MNPI separation (counterparty_id, trader_id, strategy = MNPI; trade_id, date, asset_class = public) enforced via LF-tags + column-level RBAC. CloudTrail audit for SEC Rule 17a-4 (7-year retention). Regulatory reports (CCAR, Basel III, FRTB) read from LF-governed S3 — auditors can reconstruct any past day's risk numbers."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Capital One customer data (2018+):"})," Customer PII on S3 in production account, analytics + ML teams in separate accounts. LF cross-account grants via STS AssumeRole. Cell-level RLS for partner data sharing (marketing partners see only their co-sold customers, PII masked). CloudTrail audit for compliance team."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Most Fortune 500 on AWS:"})," Every AWS customer with a S3 data lake of meaningful size uses Lake Formation as their governance spine. The pattern: production account owns S3 + LF, analytics/sandbox/ML accounts assume roles + read via LF grants, partners get cell-level RLS filters, CloudTrail streams to Splunk/Datadog for compliance dashboards."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"LF + Iceberg integration (2023+):"})," Lake Formation added support for Iceberg tables registered in Glue Data Catalog. Same LF-tags + grants + cell-level RLS apply. Customers can use open table format (Iceberg) with AWS-native governance (LF). The strategic pivot: LF now supports both proprietary formats (Parquet/ORC/Avro) and open formats (Iceberg) — making LF the governance spine for both AWS-native and open lakehouses."]})]})}),(0,a.jsx)(n.SectionCard,{title:"My deeper thought: Lake Formation is IAM for data",description:"The unifying view: Lake Formation is structurally IAM for data — same patterns (principals, roles, grants, audit) but applied to tables/columns/rows instead of buckets/objects.",icon:(0,a.jsx)(x.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,a.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Lake Formation IS IAM for data."})," AWS IAM (2006) governs access to AWS services — principals (users/roles), policies (JSON grants), audit (CloudTrail). Lake Formation (2017) applies the same patterns to data on S3 — principals (IAM roles/groups), grants (LF-tags + RBAC), audit (CloudTrail). The structural innovation: LF grants at table + column + row + cell granularity, not bucket + object. IAM is too coarse for partner data sharing; LF fills the gap. Same patterns, applied to data instead of infrastructure."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"LF-tags invert governance from per-resource to per-tag-value."})," Traditional governance is grant-per-resource: GRANT SELECT ON table_1 TO user, GRANT SELECT ON table_2 TO user, ... — at 100 tables × 50 principals, that's 5,000 grants to manage, drift inevitable. LF-tags invert: tag tables by dimensions (env=prod, tier=sensitive), grant by tag (GRANT SELECT ON LF_TAG(tier=internal) TO group). At 100 tables × 5 groups, 5 grants. Re-tagging instantly re-routes access — single LF API call, no per-resource grants to update. New tables inherit existing grants by being tagged (Lambda auto-tagger). This is the only scalable governance pattern for 100+ tables."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Cell-level RLS is the structural answer for partner data sharing."})," Partner data sharing requires row + column RBAC — Partner A sees only rows where partner_id=A, with PII columns masked. Without LF cell-level RLS: app-layer enforcement (bug-prone — one bad commit leaks partner data to wrong partner) or 3× data duplication (one copy per partner, drift between copies, expensive). With LF: 1 copy of data, 1 governance plane, 1 audit log. LF rewrites partner's SQL at query time: appends AND partner_id='X' (row filter), replaces email+phone with '***' (column mask). Partner cannot bypass — enforcement is at the LF credentials API level (engine has no direct S3 access)."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Cross-account grants via STS AssumeRole IS the multi-account pattern."})," AWS recommends multi-account pattern (one account per environment, blast radius isolation). Pre-LF, cross-account S3 access required bucket policies with cross-account principal ARNs — multiple accounts in same JSON, hard to debug, prone to over-grant. LF cross-account grants use STS AssumeRole: temp credentials (1h TTL), audited in CloudTrail. Production owns data, analytics + sandbox assume roles. No direct bucket policies — LF authorises. This is the only structurally correct multi-account pattern on AWS for S3 data lakes."]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"LF + CloudTrail IS the SEC compliance stack."})," SEC Rule 17a-4 (banks) requires 7-year retention + audit of every access to trade data. Pre-LF, compliance teams manually stitched S3 access logs (per-bucket) + IAM events + bespoke app logs — weeks of work per subpoena. LF centralises audit: eventSource=lakeformation.amazonaws.com logs every GrantPermissions, GetResourceLFTags, GetDataAccess call with principal + table + columns. SEC subpoena answered in minutes (one CloudTrail query). This is why JPMorgan + Goldman Sachs + Morgan Stanley chose LF for risk workloads — the audit compliance is structurally built-in."]})]})}),(0,a.jsxs)(g.DeeperThoughtSection,{pageTitle:"AWS Lake Formation",children:[(0,a.jsx)(g.DeeperThought,{title:"AWS Lake Formation IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,a.jsx)("p",{children:"This page about AWS Lake Formation is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. AWS Lake Formation connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where AWS Lake Formation sits in the computational-science landscape."})}),(0,a.jsx)(g.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,a.jsx)("p",{children:"In a decade, the specific tools on this page (AWS Lake Formation) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,a.jsx)(g.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,a.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,a.jsx)(g.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,a.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,a.jsx)(g.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,a.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,a.jsx)(c.RelatedTopics,{topics:[{id:"glue",reason:"AWS Glue Data Catalog — table metadata layer that LF integrates with"},{id:"iceberg",reason:"Apache Iceberg — LF supports Iceberg tables registered in Glue Catalog"},{id:"snowflake-polaris",reason:"Snowflake Polaris — multi-cloud open catalog (vs LF AWS-only)"},{id:"databricks-lakehouse",reason:"Databricks Unity Catalog — closed competitor to LF (column RBAC)"},{id:"tabular",reason:"Tabular SaaS — managed Iceberg, integrates with LF for governance"},{id:"catalogs",reason:"6-catalog comparison — LF + Glue are AWS-native options"},{id:"data-lakehouse",reason:"Anchor concept — lake→lakehouse evolution"},{id:"governance",reason:"Governance page — Unity + LF + Ranger overview"}]}),(0,a.jsx)(o.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"glue",reason:"AWS Glue Data Catalog — table metadata layer that LF integrates with"},{id:"iceberg",reason:"Apache Iceberg — LF supports Iceberg tables registered in Glue Catalog"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(t.default,{href:(0,p.hrefFor)("glue"),className:"text-sm text-primary hover:underline",children:"→ AWS Glue (Data Catalog that LF integrates with)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("iceberg"),className:"text-sm text-primary hover:underline",children:"→ Apache Iceberg (open table format LF supports)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("snowflake-polaris"),className:"text-sm text-primary hover:underline",children:"→ Snowflake Polaris (multi-cloud open alternative)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("databricks-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Databricks Lakehouse (Unity Catalog competitor)"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,p.hrefFor)("data-lakehouse"),className:"text-sm text-primary hover:underline",children:"→ Data Lakehouse (concept anchor)"})]})]})}e.s(["AwsLakeFormationPage",()=>G])}]);