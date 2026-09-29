(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,640524,e=>{"use strict";var t=e.i(808554);e.s(["Workflow",()=>t.default])},643531,e=>{"use strict";var t=e.i(678745);e.s(["Check",()=>t.default])},174886,e=>{"use strict";var t=e.i(991124);e.s(["Copy",()=>t.default])},122836,e=>{"use strict";var t=e.i(843476),a=e.i(271645),r=e.i(643531),s=e.i(174886),i=e.i(519455);function n({code:e,language:n="sql",filename:o,highlight:l=[]}){let[d,c]=(0,a.useState)(!1),h=e.replace(/\n$/,"").split("\n"),u=async()=>{try{await navigator.clipboard.writeText(e),c(!0),setTimeout(()=>c(!1),1500)}catch{}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-white/5",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[11px] text-white/60 font-mono",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-rose-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-amber-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-emerald-400"}),(0,t.jsx)("span",{className:"ml-2 uppercase tracking-wider",children:n}),o&&(0,t.jsxs)("span",{className:"text-white/40",children:["· ",o]})]}),(0,t.jsxs)(i.Button,{variant:"ghost",size:"sm",className:"h-6 px-2 text-[11px] text-white/70 hover:text-white hover:bg-white/10",onClick:u,"aria-label":"Copy code",children:[d?(0,t.jsx)(r.Check,{className:"h-3 w-3 mr-1"}):(0,t.jsx)(s.Copy,{className:"h-3 w-3 mr-1"}),d?"Copied":"Copy"]})]}),(0,t.jsx)("pre",{className:"code-scroll overflow-x-auto p-3 text-[12.5px] leading-relaxed font-mono",children:(0,t.jsx)("code",{children:h.map((e,a)=>{let r=a+1,s=l.includes(r);return(0,t.jsxs)("div",{className:["flex",s?"bg-primary/20 -mx-3 px-3 border-l-2 border-primary":""].join(" "),children:[(0,t.jsx)("span",{className:"select-none text-white/30 w-8 inline-block text-right pr-3 shrink-0",children:r}),(0,t.jsx)("span",{className:"whitespace-pre",children:e||" "})]},r)})})})]})}function o({children:e}){return(0,t.jsx)("code",{className:"rounded bg-muted px-1.5 py-0.5 text-[12px] font-mono text-foreground/90 border border-border/60",children:e})}e.s(["CodeBlock",()=>n,"InlineCode",()=>o])},618393,e=>{"use strict";var t=e.i(953651);e.s(["Server",()=>t.default])},727927,e=>{"use strict";var t=e.i(651617);e.s(["Cloud",()=>t.default])},366101,763639,e=>{"use strict";var t=e.i(843476),a=e.i(271645),r=e.i(980376),s=e.i(122836),i=e.i(487486),n=e.i(519455),o=e.i(444609);e.s(["Languages",()=>o.default],763639);var o=o,l=e.i(463059);let d={python:"Python",scala:"Scala",go:"Go",rust:"Rust",java:"Java",sql:"SQL",yaml:"YAML",hcl:"Terraform",bash:"Bash",elixir:"Elixir",c:"C",typescript:"TypeScript"};function c({samples:e}){let[r,i]=(0,a.useState)(0),n=e[r];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"flex flex-wrap gap-1 border-b border-border/60 bg-muted/20 px-2 py-2",children:e.map((e,a)=>(0,t.jsx)("button",{onClick:()=>i(a),className:`text-[11px] px-2.5 py-1 rounded border transition-colors font-mono ${a===r?"bg-primary text-primary-foreground border-primary":"border-border/60 hover:bg-accent"}`,children:d[e.language]??e.language},e.language+e.filename))}),(0,t.jsxs)("div",{className:"p-3 bg-card",children:[n.note&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground mb-2 italic",children:n.note}),(0,t.jsx)(s.CodeBlock,{code:n.code,language:n.language,filename:n.filename,highlight:n.highlight})]})]})}function h({title:e,description:a,samples:s,drawerMode:d=!1,drawerButtonLabel:h}){return d?(0,t.jsxs)(r.Sheet,{children:[(0,t.jsx)(r.SheetTrigger,{asChild:!0,children:(0,t.jsxs)(n.Button,{variant:"outline",className:"gap-2 w-full justify-between h-auto py-3",children:[(0,t.jsxs)("span",{className:"flex items-center gap-2",children:[(0,t.jsx)(o.default,{className:"h-4 w-4 text-primary"}),(0,t.jsx)("span",{className:"font-semibold text-sm",children:h??e}),(0,t.jsxs)(i.Badge,{variant:"outline",className:"text-[10px]",children:[s.length," languages"]})]}),(0,t.jsx)(l.ChevronRight,{className:"h-4 w-4 text-muted-foreground"})]})}),(0,t.jsxs)(r.SheetContent,{side:"right",className:"w-[min(680px,100vw)] sm:max-w-[680px] p-0 overflow-y-auto",children:[(0,t.jsxs)(r.SheetHeader,{className:"px-5 pt-5 pb-3 border-b border-border/60 bg-muted/30",children:[(0,t.jsxs)(r.SheetTitle,{className:"text-base flex items-center gap-2",children:[(0,t.jsx)(o.default,{className:"h-4 w-4 text-primary"}),e]}),a&&(0,t.jsx)(r.SheetDescription,{className:"text-xs",children:a})]}),(0,t.jsx)("div",{className:"border-b border-border/60",children:(0,t.jsx)(c,{samples:s})}),(0,t.jsx)("div",{className:"px-5 py-3 border-t border-border/60 bg-muted/20 text-[11px] text-muted-foreground",children:(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"File types commonly deployed:"})," ",Array.from(new Set(s.map(e=>e.filename.split(".").pop()||""))).join(", ")," — each compiles to a portable artefact (binary, .so, .beam, .jar, or interpreter-bound source)."]})})]})]}):(0,t.jsxs)("div",{className:"rounded-md border border-border/60 overflow-hidden",children:[(0,t.jsxs)("div",{className:"bg-muted/30 px-4 py-3 border-b border-border/60",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(o.default,{className:"h-4 w-4 text-primary"}),(0,t.jsx)("p",{className:"text-sm font-semibold",children:e}),(0,t.jsxs)(i.Badge,{variant:"outline",className:"ml-auto text-[10px]",children:[s.length," languages"]})]}),a&&(0,t.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:a})]}),(0,t.jsx)(c,{samples:s})]})}e.s(["MultiLangSamples",()=>h],366101)},161735,e=>{"use strict";var t=e.i(626805);e.s(["GitMerge",()=>t.default])},42561,e=>{"use strict";var t=e.i(843476),a=e.i(271645),r=e.i(846932),s=e.i(88653),i=e.i(519455),n=e.i(487486),o=e.i(431343),l=e.i(531278),d=e.i(63209),c=e.i(595468),h=e.i(966992);let u=new Uint8Array([0,97,115,109,1,0,0,0,1,7,1,96,2,127,127,1,127,3,2,1,0,7,7,1,3,97,100,100,0,0,10,9,1,7,0,32,0,32,1,106,11]);function m({buttonLabel:e="Run in browser (Wasm)",description:m="Loads a hand-assembled WebAssembly binary (41 bytes) and calls the exported `add(i32, i32) -> i32` function. In production, this would be a Rust/C binary compiled via `cargo build --target wasm32-wasi` or `emcc`.",sourceLanguage:p="Rust/C"}){let[g,f]=(0,a.useState)("idle"),[x,b]=(0,a.useState)(""),[y,w]=(0,a.useState)(null),_=(0,a.useCallback)(async()=>{f("running"),b("Instantiating WebAssembly module (41 bytes)…\n");let e=performance.now();try{let{instance:t}=await WebAssembly.instantiate(u),a=t.exports.add;if(!a)throw Error("Exported function 'add' not found in Wasm module");let r=Math.round(performance.now()-e);w(r);let s=[];for(let[e,t]of(s.push(`✓ Wasm module instantiated in ${r}ms (41 bytes)`),s.push(`  Source language: ${p} (compiled to wasm32)`),s.push("  Exported function: add(i32, i32) -> i32"),s.push(""),s.push("Test cases:"),[[2,3],[100,200],[42,58],[-10,20],[1e6,1]])){let r=a(e,t);s.push(`  add(${e}, ${t}) = ${r}`)}s.push(""),s.push("✓ All calls successful. The same .wasm binary would run in"),s.push("  any browser, any OS, any Wasm runtime — portable native code."),b(s.join("\n")),f("done")}catch(t){let e=t instanceof Error?t.message:String(t);b(t=>t+`
Error: ${e}`),f("error")}},[p]);return(0,t.jsxs)("div",{className:"mt-3 rounded-md border border-primary/30 bg-primary/3 p-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)(i.Button,{size:"sm",variant:"running"===g?"outline":"default",className:"gap-1.5",onClick:_,disabled:"running"===g,children:["running"===g?(0,t.jsx)(l.Loader2,{className:"h-3.5 w-3.5 animate-spin"}):"done"===g?(0,t.jsx)(c.CheckCircle2,{className:"h-3.5 w-3.5"}):"error"===g?(0,t.jsx)(d.AlertCircle,{className:"h-3.5 w-3.5"}):(0,t.jsx)(o.Play,{className:"h-3.5 w-3.5"}),e]}),(0,t.jsxs)(n.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,t.jsx)(h.Cpu,{className:"h-2.5 w-2.5"}),"WebAssembly · 41 bytes"]}),null!==y&&"done"===g&&(0,t.jsxs)("span",{className:"text-[10px] text-muted-foreground",children:["Instantiated in ",y,"ms"]})]}),m&&(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2 leading-relaxed",children:m}),(0,t.jsx)(s.AnimatePresence,{children:"idle"!==g&&x&&(0,t.jsx)(r.motion.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-2",children:(0,t.jsx)("div",{className:`rounded-md bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] p-2.5 text-[11px] font-mono leading-relaxed overflow-x-auto code-scroll max-h-64 overflow-y-auto ${"error"===g?"border border-rose-500/40":"border border-emerald-500/30"}`,children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap",children:x})})})})]})}e.s(["WasmRunner",()=>m])},109964,e=>{"use strict";var t=e.i(93393);e.s(["GitCommit",()=>t.default])},519544,e=>{"use strict";var t=e.i(843476),a=e.i(522016),r=e.i(342046),s=e.i(862824),i=e.i(122836),n=e.i(366101),o=e.i(42561),l=e.i(868054),d=e.i(90441),c=e.i(901752),h=e.i(487486),u=e.i(332017),m=e.i(161735),p=e.i(955716),g=e.i(109964),f=e.i(581418),x=e.i(727927),b=e.i(852008),y=e.i(618393),w=e.i(406321),w=w,_=e.i(640524),v=e.i(763639),k=e.i(509694),j=e.i(475225),S=e.i(872526),N=e.i(785183),C=e.i(93230),T=e.i(731195),A=e.i(234239),R=e.i(559559);let D=`# ============================================================
# terraform/snowflake/main.tf — Snowflake as code
# ============================================================
terraform {
  required_version = ">= 1.6"
  backend "s3" {
    bucket = "moderndatascieng-tfstate"
    key    = "snowflake/prod/terraform.tfstate"
    region = "eu-west-1"
  }
}

provider "snowflake" {
  account  = data.aws_secretsmanager_secret_version.snowflake.account
  user     = "TERRAFORM_SVC"
  role     = "SYSADMIN"
  authenticator = "snowflake_jwt"
  private_key  = data.aws_secretsmanager_secret_version.snowflake.private_key
}

# Databases
resource "snowflake_database" "prod" {
  name = "MODERNDATASCIENG_PROD"
  comment = "Production analytics database"
}

# Schemas (one per business domain)
resource "snowflake_schema" "gold" {
  database = snowflake_database.prod.name
  name     = "GOLD"
  comment  = "Certified Gold marts"
}

# Warehouses — see Snowflake page for the sizing matrix
resource "snowflake_warehouse" "transform" {
  name           = "WH_DBT_TRANSFORM"
  warehouse_size = "MEDIUM"
  auto_suspend   = 30
  auto_resume    = true
  min_cluster_count = 1
  max_cluster_count = 8
  scaling_policy    = "STANDARD"
}

# Roles + grants — fully version-controlled
resource "snowflake_role" "transformer" {
  name = "TRANSFORMER"
}

resource "snowflake_grant_privileges_to_role" "transformer_dbt" {
  role = snowflake_role.transformer.name
  privileges = ["USAGE", "CREATE TABLE", "CREATE VIEW"]
  on_schema {
    schema = "\${snowflake_schema.gold.fully_qualified_name}"
  }
}

# Resource monitor — cap monthly credit burn
resource "snowflake_resource_monitor" "platform" {
  name           = "RM_PLATFORM"
  credit_quota  = 12000
  frequency     = "MONTHLY"
  start_timestamp = "IMMEDIATELY"
  notify_users   = ["DATA_PLATFORM@MODERNDATASCIENG.COM"]
  triggers {
    on_80_percent  = "NOTIFY"
    on_90_percent  = "SUSPEND"
    on_95_percent  = "SUSPEND_IMMEDIATE"
  }
}
`,E=`# .github/workflows/promote-dbt-prod.yml
name: Promote dbt → prod
on:
  workflow_dispatch:
    inputs:
      commit_sha:
        description: "Commit SHA to promote"
        required: true
permissions:
  idem-token: write
  contents: read

jobs:
  promote:
    runs-on: ubuntu-latest
    environment:
      name: production          # gated, manual approval
      url: https://github.com/moderndatascieng/data-platform
    env:
      DBT_PROFILES_DIR: transform/dbt
    steps:
      - uses: actions/checkout@v4
        with:
          ref: \${{ inputs.commit_sha }}

      - name: OIDC → Snowflake
        uses: snowflake-actions/login@v1
        with:
          role: TRANSFORMER
          authenticator: oidc

      - name: Install dbt
        run: pip install dbt-snowflake==1.7.0

      - name: dbt deps
        run: cd transform/dbt && dbt deps

      - name: dbt build — production target
        run: |
          cd transform/dbt
          dbt build --target prod \\
            --state ./target \\
            --select state:modified+ \\
            --defer --state ./target

      - name: dbt docs generate
        run: cd transform/dbt && dbt docs generate

      - name: Publish docs to internal site
        run: aws s3 sync target/ s3://docs.moderndatascieng.data/dbt/ --delete

      - name: Notify Slack
        run: |
          curl -X POST -H 'Content-type: application/json' \\
            --data "{"text": "✅ dbt promoted to prod @ \${{ inputs.commit_sha }}"}" \\
            \${SLACK_WEBHOOK}
`,P=`Git workflow — trunk-based with short-lived branches

  main (always green)
   │
   │ ▲ PR (signed commit + 2 reviews + dbt slim CI)
   │ │
   │ │ ▲ feature/data-platform/new-source-sap-ariba
   │ │ │   - 1 dbt staging model
   │ │ │   - 1 silver conform
   │ │ │   - 2 dbt tests
   │ │ │   - 1 schema-registry PR
   │ │ ▼
   │ ▼ merge → main
   │
   │   ┌────────────────────────────────────────────┐
   │   │  Daily 02:00 UTC — staging full dbt run    │
   │   └────────────────────────────────────────────┘
   │
   │   Manual approval gate (workflow_dispatch)
   ▼   ─────────────────────────────────────►  prod
                                              (dbt build --target prod)
                                              + Snowflake migrate apply
                                              + Databricks asset bundle deploy
`,G=d.FINOPS.map(e=>({area:e.area,fy24:e.fy24,fy25:e.fy25,trend:e.trend}));function O(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(s.PageHeader,{eyebrow:"Delivery — CI/CD & DevOps",title:"Git, GitHub Actions, Terraform, dbt slim CI",description:"Every change is shipped via PR with state-aware dbt CI, Terraform plan, schema-registry PR for drift, and OIDC-based workload identity (no long-lived secrets). Production promotion is gated by a manual approval and idempotent — re-runs are safe.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(g.GitCommit,{className:"h-3 w-3"})," Trunk-based"]}),(0,t.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(x.Cloud,{className:"h-3 w-3"})," IaC"]})]})}),(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:[(0,t.jsx)(s.KpiCard,{label:"PR merge → prod (median)",value:"2h 11m",delta:"−43%",deltaTone:"up",hint:"state-aware CI"}),(0,t.jsx)(s.KpiCard,{label:"CI runtime (dbt slim)",value:"4m 18s",delta:"−67%",deltaTone:"up",hint:"vs full run"}),(0,t.jsx)(s.KpiCard,{label:"Production deploys / wk",value:"14",delta:"+6 YoY",deltaTone:"up",hint:"with rollback runbook"}),(0,t.jsx)(s.KpiCard,{label:"Mean rollback time",value:"6 min",delta:"P95",deltaTone:"flat",hint:"git revert + dbt build"})]}),(0,t.jsx)(s.SectionCard,{title:"Git workflow — trunk-based with short-lived branches",description:"Long-lived branches are forbidden. Every PR is a single feature, slim CI runs only changed models + downstream, and a daily staging run keeps the staging environment warm.",icon:(0,t.jsx)(p.GitBranch,{className:"h-5 w-5"}),children:(0,t.jsx)(i.CodeBlock,{code:P,language:"text",filename:"git_flow.txt"})}),(0,t.jsx)(s.SectionCard,{title:"Pipelines — at a glance",description:"Six pipelines cover the entire delivery surface: dbt CI, Terraform plan/apply, Snowflake migrate, Databricks asset bundle deploy, and prod promotion.",icon:(0,t.jsx)(_.Workflow,{className:"h-5 w-5"}),contentClassName:"p-0",children:(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-sm",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60 bg-muted/40",children:[(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Pipeline"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Trigger"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Steps"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Duration"}),(0,t.jsx)("th",{className:"text-left px-4 py-2.5 text-xs uppercase tracking-wider text-muted-foreground",children:"Env"})]})}),(0,t.jsx)("tbody",{children:d.PIPELINES.map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/40 last:border-0",children:[(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs font-semibold",children:e.name}),(0,t.jsx)("td",{className:"px-4 py-2.5 text-xs text-muted-foreground",children:e.trigger}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-[11px]",children:e.steps}),(0,t.jsx)("td",{className:"px-4 py-2.5 font-mono text-xs tabular-nums",children:e.duration}),(0,t.jsx)("td",{className:"px-4 py-2.5",children:(0,t.jsx)(h.Badge,{variant:"outline",className:"text-[10px]",children:e.env})})]},e.name))})]})})}),(0,t.jsx)(s.SectionCard,{title:"Terraform — Snowflake as code",description:"Every Snowflake object (databases, schemas, warehouses, roles, grants, resource monitors) is provisioned via Terraform. Manual SQL changes are forbidden.",icon:(0,t.jsx)(x.Cloud,{className:"h-5 w-5"}),children:(0,t.jsx)(i.CodeBlock,{code:D,language:"hcl",filename:"terraform/snowflake/main.tf",highlight:[15,16,17,18,24,25,26,27,33,34,35,36,37,38,39,40,41,54,55,56,57,58,59,60,61,62]})}),(0,t.jsx)(s.SectionCard,{title:"Production promotion — gated workflow",description:"OIDC for auth (no long-lived secrets), state-aware build, docs published to internal site, Slack notification on success.",icon:(0,t.jsx)(m.GitMerge,{className:"h-5 w-5"}),children:(0,t.jsx)(i.CodeBlock,{code:E,language:"yaml",filename:".github/workflows/promote-dbt-prod.yml",highlight:[10,11,12,13,14,15,16,17,18,35,36,37,38,39,40]})}),(0,t.jsxs)("div",{className:"grid lg:grid-cols-2 gap-4",children:[(0,t.jsx)(s.SectionCard,{title:"FinOps — FY24 vs FY25 (synthetic)",description:"Platform cost tracking is fully attributed to workload. Photon, Z-ORDER and cluster pools drove a 19% cost-per-TB reduction YoY.",icon:(0,t.jsx)(y.Server,{className:"h-5 w-5"}),badge:"Synthetic",children:(0,t.jsx)("div",{className:"h-56",children:(0,t.jsx)(T.ResponsiveContainer,{width:"100%",height:"100%",children:(0,t.jsxs)(k.BarChart,{data:G,margin:{top:10,right:8,left:-10,bottom:5},children:[(0,t.jsx)(S.CartesianGrid,{strokeDasharray:"3 3",stroke:"oklch(0.85 0 0 / 0.3)"}),(0,t.jsx)(N.XAxis,{dataKey:"area",tick:{fontSize:10},stroke:"oklch(0.5 0 0)",angle:-15,textAnchor:"end",height:50}),(0,t.jsx)(C.YAxis,{tick:{fontSize:11},stroke:"oklch(0.5 0 0)"}),(0,t.jsx)(A.Tooltip,{formatter:e=>`\xa3${e}M`,contentStyle:{background:"var(--popover)",border:"1px solid var(--border)",borderRadius:6,fontSize:12}}),(0,t.jsx)(R.Legend,{wrapperStyle:{fontSize:11}}),(0,t.jsx)(j.Bar,{dataKey:"fy24",fill:"var(--chart-2)",name:"FY24",radius:[4,4,0,0]}),(0,t.jsx)(j.Bar,{dataKey:"fy25",fill:"var(--chart-1)",name:"FY25",radius:[4,4,0,0]})]})})})}),(0,t.jsx)(s.SectionCard,{title:"DevOps practices",icon:(0,t.jsx)(w.default,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-2 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• Trunk-based Git with short-lived feature branches"}),(0,t.jsx)("li",{children:"• Conventional commits + signed commits (GPG / Sigstore)"}),(0,t.jsx)("li",{children:"• 2-reviewer approval required on every PR"}),(0,t.jsx)("li",{children:"• CODEOWNERS per folder (dbt models, Terraform, Spark)"}),(0,t.jsx)("li",{children:"• Renovate for automated dependency bumps"}),(0,t.jsx)("li",{children:"• Pre-commit hooks: sqlfluff, tflint, ruff, prettier"}),(0,t.jsx)("li",{children:"• Runbooks in repo + status page (internal)"}),(0,t.jsx)("li",{children:"• Game days quarterly — chaos engineering on the pipeline"})]})})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-4",children:[(0,t.jsx)(s.SectionCard,{title:"Secrets & identity",icon:(0,t.jsx)(f.ShieldCheck,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• OIDC for GitHub Actions → Snowflake / Databricks / AWS"}),(0,t.jsx)("li",{children:"• Workload identity, no long-lived keys"}),(0,t.jsx)("li",{children:"• Secrets in Azure Key Vault + AWS Secrets Manager"}),(0,t.jsx)("li",{children:"• Secret rotation automated via Lambda"}),(0,t.jsx)("li",{children:"• Audit log to Datadog + Splunk"})]})}),(0,t.jsx)(s.SectionCard,{title:"Reproducibility",icon:(0,t.jsx)(b.Layers,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• Every environment is reproducible from Git"}),(0,t.jsx)("li",{children:"• Terraform state in S3 with DynamoDB lock"}),(0,t.jsx)("li",{children:"• dbt state artefact shared via S3 (slim CI)"}),(0,t.jsx)("li",{children:"• Container images tagged with Git SHA"}),(0,t.jsx)("li",{children:"• Databricks asset bundles versioned"})]})}),(0,t.jsx)(s.SectionCard,{title:"Reliability",icon:(0,t.jsx)(y.Server,{className:"h-5 w-5"}),children:(0,t.jsxs)("ul",{className:"text-sm space-y-1.5 text-muted-foreground",children:[(0,t.jsx)("li",{children:"• Blue/green for dbt model changes (view swap)"}),(0,t.jsx)("li",{children:"• Snowflake time-travel 90d for instant rollback"}),(0,t.jsx)("li",{children:"• Delta time-travel 30d for Bronze/Silver"}),(0,t.jsx)("li",{children:"• Cross-region DR (Azure primary, AWS DR)"}),(0,t.jsx)("li",{children:"• Monthly DR drill — automated failover test"})]})})]}),(0,t.jsx)(s.SectionCard,{title:"Multi-language: 5 idioms for Snowflake grant audit",description:"Bash (ops) · Go (single binary, ~30× faster) · Python (ecosystem) · Elixir (BEAM supervision tree, self-healing) · C (librdkafka, max perf). Click to open the drawer — keeps the page lightweight.",icon:(0,t.jsx)(v.Languages,{className:"h-5 w-5"}),badge:"5 languages · drawer",children:(0,t.jsx)(n.MultiLangSamples,{drawerMode:!0,drawerButtonLabel:"View 5-language grant audit implementations",title:"Snowflake grant audit — 5 idiomatic implementations",description:"Same audit step in 5 languages. Bash = ops default. Go = single binary, type-safe. Python = ecosystem access. Elixir = BEAM-supervised, self-healing. C = librdkafka-backed, max perf.",samples:[{language:"bash",filename:"audit_grants.sh",note:"Bash + jq — the ops-friendly default. Runs everywhere, easy to read, but no type safety. File types: .sh (source), no compilation.",code:`#!/usr/bin/env bash
# Audit all Snowflake grants — flag any new grants since last run
set -euo pipefail

LAST_HASH=\${1:-$(cat .last_audit_hash 2>/dev/null || echo "")}
NEW_HASH=$(snowsql -q "SHOW GRANTS" -o csv | sort | sha256sum | cut -d' ' -f1)
echo "Current grant hash: $NEW_HASH"

if [[ "$LAST_HASH" != "$NEW_HASH" && -n "$LAST_HASH" ]]; then
  echo "⚠ Grant drift detected — diffing"
  diff <(echo "$LAST_HASH") <(echo "$NEW_HASH") || true
  # Page on-call
  curl -X POST "$PAGERDUTY_URL" -d "{\\"alert\\": \\"snowflake grant drift\\"}"
fi
echo "$NEW_HASH" > .last_audit_hash`,highlight:[4,5,6,8,9,10,11,12,13]},{language:"go",filename:"audit_grants.go",note:"Go — single binary, type-safe, fast. Compiled and shipped to CI as a static binary. ~30× faster than the bash version on large accounts. File types: .go (source), single static binary output.",code:`package main

import (
        "context"
        "crypto/sha256"
        "encoding/hex"
        "fmt"
        "os"
        "sort"
        "strings"

        "github.com/snowflakedb/gosnowflake"
)

type Grant struct {
        Role      string
        Privilege string
        Object    string
        Grantee   string
}

func auditGrants(ctx context.Context, dsn string) (string, error) {
        db, err := sql.Open("snowflake", dsn)
        if err != nil { return "", err }
        defer db.Close()

        rows, err := db.QueryContext(ctx, "SHOW GRANTS")
        if err != nil { return "", err }
        defer rows.Close()

        var grants []Grant
        for rows.Next() {
                var g Grant
                if err := rows.Scan(&g.Role, &g.Privilege, &g.Object, &g.Grantee); err != nil {
                        return "", err
                }
                grants = append(grants, g)
        }
        // Sort for deterministic hash
        sort.Slice(grants, func(i, j int) bool {
                return grants[i].Role < grants[j].Role
        })
        h := sha256.New()
        for _, g := range grants {
                h.Write([]byte(fmt.Sprintf("%s|%s|%s|%s", g.Role, g.Privilege, g.Object, g.Grantee)))
        }
        return hex.EncodeToString(h.Sum(nil)), nil
}

func main() {
        hash, err := auditGrants(context.Background(), os.Getenv("SNOWFLAKE_DSN"))
        if err != nil { fmt.Fprintln(os.Stderr, err); os.Exit(1) }
        fmt.Println(hash)
}`,highlight:[21,22,23,24,25,26,27,28,29,30,33,34,35,36,37]},{language:"python",filename:"audit_grants.py",note:"Python — when you need snowflake-connector + pandas + great_expectations in one script. The team's default for ad-hoc audits. File types: .py (source), interpreted.",code:`#!/usr/bin/env python3
"""Audit Snowflake grants; flag drift since last run."""
import hashlib, json, sys
from snowflake.connector import connect
from datetime import datetime, timezone

def audit_grants() -> str:
    with connect(
        user=os.environ["SNOWFLAKE_USER"],
        account=os.environ["SNOWFLAKE_ACCOUNT"],
        private_key_file=os.environ["SNOWFLAKE_KEY_PATH"],
    ) as conn:
        cur = conn.cursor()
        cur.execute("SHOW GRANTS")
        rows = sorted([tuple(r) for r in cur.fetchall()])
        h = hashlib.sha256()
        for r in rows:
            h.update("|".join(str(x) for x in r).encode())
        return h.hexdigest()

if __name__ == "__main__":
    current = audit_grants()
    last_path = ".last_audit_hash"
    try:
        last = open(last_path).read().strip()
    except FileNotFoundError:
        last = ""
    if last and last != current:
        print(f"⚠ Drift detected at {datetime.now(timezone.utc).isoformat()}", file=sys.stderr)
        # Page on-call via PagerDuty
        # requests.post(...)
    with open(last_path, "w") as f:
        f.write(current)
    print(f"Hash: {current}")`,highlight:[10,11,12,13,14,15,16,17,18,19]},{language:"elixir",filename:"audit_grants.ex",note:"Elixir + GenServer — self-healing via BEAM supervision tree. If the audit process crashes, the supervisor restarts it. ~1M concurrent lightweight processes per node. File types: .ex (source), .beam (compiled bytecode), .ez (release).",code:`defmodule ModernDataSciEng.Audit.Grants do
  @moduledoc """
  Audits Snowflake grants by querying via Postgres-wire-compatible endpoint.
  Idempotent — produces a stable SHA256 hash for drift detection.
  Self-healing: supervised by BEAM, auto-restarts on crash.
  """
  use GenServer

  require Logger

  @table :grant_audit_state

  def start_link(_opts), do: GenServer.start_link(__MODULE__, [], name: __MODULE__)

  @impl true
  def init(_) do
    :ets.new(@table, [:named_table, :public, :set])
    schedule_tick()
    {:ok, %{last_hash: load_last_hash()}}
  end

  @impl true
  def handle_info(:tick, state) do
    {:noreply, run_audit(state), 10_000}
  end

  @impl true
  def handle_call(:current_hash, _from, state) do
    {:reply, state.last_hash, state}
  end

  defp run_audit(state) do
    # Query via Postgres-wire protocol (Snowflake supports this)
    {:ok, rows} = Postgrex.query!(conn(), "SHOW GRANTS", [])

    hash =
      rows.rows
      |> Enum.map(&Tuple.to_list/1)
      |> Enum.sort()
      |> :erlang.term_to_binary()
      |> then(&:crypto.hash(:sha256, &1))
      |> Base.encode16(case: :lower)

    if state.last_hash && state.last_hash != hash do
      Logger.warn("Snowflake grant drift detected at #{DateTime.utc_now()}")
      # Page on-call via HTTP — async, doesn't block the audit loop
      Task.start(fn ->
        Finch.build(:post, System.get_env("PAGERDUTY_URL"),
          [{"content-type", "application/json"}],
          ~s({"alert": "snowflake grant drift"})
        ) |> Finch.request()
      end)
    end

    :ets.insert(@table, {:last_hash, hash})
    %{state | last_hash: hash}
  end

  defp load_last_hash, do: :ets.lookup(@table, :last_hash)[:last_hash] || ""
  defp conn, do: System.get_env("SNOWFLAKE_PG_CONN")
  defp schedule_tick, do: Process.send_after(self(), :tick, 10_000)
end

# File types: .ex (source), .beam (compiled bytecode), .ez (release archive)
# Run as a release: MIX_ENV=prod mix release; _build/prod/rel/audit/bin/audit start`,highlight:[11,12,13,14,15,16,24,25,26,27,32,33,34,35,36,37,38,49,50,51,52]},{language:"c",filename:"lag_audit.c",note:"C + librdkafka — high-perf Kafka topic-lag monitor. Compiles to single static binary; ~30× faster than Python equivalent. The lingua-franca of native systems programming. File types: .c/.h (source), .so (shared lib), single static binary output.",code:`// ============================================================
// librdkafka audit — high-perf Kafka topic-lag monitor
// Compiles to single binary; ~30x faster than Python equivalent
// Foundation for many high-level Kafka clients (confluent-kafka-python
// wraps librdkafka)
// ============================================================
#include <librdkafka/rdkafka.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

int audit_lag(const char* brokers, const char* group_id) {
    rd_kafka_conf_t* conf = rd_kafka_conf_new();
    rd_kafka_conf_set(conf, "bootstrap.servers", brokers);
    rd_kafka_conf_set(conf, "group.id", group_id);
    rd_kafka_conf_set(conf, "enable.auto.commit", "false");

    rd_kafka_t* rk = rd_kafka_new(RD_KAFKA_CONSUMER, conf, NULL, 0);
    if (!rk) {
        fprintf(stderr, "Failed to create consumer: %s\\n",
                rd_kafka_err2str(rd_kafka_last_error()));
        return 1;
    }

    rd_kafka_topic_partition_list_t* topics = rd_kafka_topic_partition_list_new(1);
    rd_kafka_topic_partition_list_add(topics, "moderndatascieng.orders", -1);
    rd_kafka_assign(rk, topics);

    // Sample 1000 messages; measure latency
    int n = 0;
    int64_t total_lag = 0;
    time_t start = time(NULL);

    while (n < 1000 && difftime(time(NULL), start) < 60.0) {
        rd_kafka_message_t* msg = rd_kafka_consumer_poll(rk, 1000);
        if (msg) {
            int64_t ts = rd_kafka_message_timestamp(msg, NULL, NULL);
            int64_t lag = (int64_t)time(NULL) * 1000 - ts;
            total_lag += lag;
            n++;
            rd_kafka_message_destroy(msg);
        }
    }

    int64_t avg_lag = n > 0 ? total_lag / n : 0;
    printf("{\\"samples\\": %d, \\"avg_lag_ms\\": %lld}\\n", n, avg_lag);

    rd_kafka_destroy(rk);
    return avg_lag > 60000 ? 2 : 0;  // exit 2 = lag > 60s
}

int main(int argc, char** argv) {
    if (argc < 3) {
        fprintf(stderr, "Usage: %s <brokers> <group_id>\\n", argv[0]);
        return 1;
    }
    return audit_lag(argv[1], argv[2]);
}

// Compile: gcc -O2 -o lag_audit lag_audit.c -lrdkafka
// Run:     ./lag_audit broker-1:9092 moderndatascieng-silver-service`,highlight:[13,14,15,16,18,19,20,21,22,24,25,26,32,33,34,35,36,37,45,47,48,49]}]})}),(0,t.jsx)(s.SectionCard,{title:"Try it: C/Rust audit tool compiled to WebAssembly",description:"The C (librdkafka lag audit) + Rust samples above, compiled to Wasm, would run in your browser. Demo uses a hand-assembled 41-byte Wasm binary — the pattern is the same for real C code compiled via emcc or Rust via wasm32-wasi.",icon:(0,t.jsx)(l.Terminal,{className:"h-5 w-5"}),badge:"Wasm · ADR-016",children:(0,t.jsx)(o.WasmRunner,{sourceLanguage:"C/Rust → wasm32-wasi",buttonLabel:"Run Wasm module (41 bytes)",description:"In production: compile the C librdkafka audit above with `emcc -o audit.wasm audit.c -lrdkafka` and host the .wasm binary. The WasmRunner loads it, calls the exported function — same pattern as the Rust/C UDFs on the Databricks page."})}),(0,t.jsxs)(u.DeeperThoughtSection,{pageTitle:"Git, CI/CD & DevOps",children:[(0,t.jsx)(u.DeeperThought,{title:"Git, CI/CD & DevOps IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Git, CI/CD & DevOps is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Git, CI/CD & DevOps connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Git, CI/CD & DevOps sits in the computational-science landscape."})}),(0,t.jsx)(u.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Git, CI/CD & DevOps) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(u.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(u.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(u.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(r.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"home",reason:"Continue to home — see also from this page"},{id:"architecture",reason:"Continue to architecture — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(a.default,{href:(0,c.hrefFor)("home"),className:"text-sm text-primary hover:underline",children:"→ Back to overview"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(a.default,{href:(0,c.hrefFor)("architecture"),className:"text-sm text-primary hover:underline",children:"→ Revisit the architecture"})]})]})}e.s(["CicdPage",()=>O],519544)}]);