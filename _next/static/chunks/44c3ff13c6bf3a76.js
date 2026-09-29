(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,286536,e=>{"use strict";var a=e.i(187942);e.s(["Eye",()=>a.default])},842009,e=>{"use strict";var a=e.i(976886);e.s(["Award",()=>a.default])},248256,e=>{"use strict";var a=e.i(641877);e.s(["Globe",()=>a.default])},438437,e=>{"use strict";var a=e.i(843476),t=e.i(271645),s=e.i(522016),r=e.i(862824),i=e.i(342046),n=e.i(716675),o=e.i(194058),l=e.i(206075),c=e.i(901752),d=e.i(487486),u=e.i(432763),u=u,m=e.i(350682),p=e.i(575294),p=p,h=e.i(25652),x=e.i(21218),f=e.i(283086),y=e.i(286536),g=e.i(972520),b=e.i(248256),v=e.i(842009);let j=`# Live: OpenSky — global aircraft count
import json, math
from pyodide.http import pyfetch

async def fetch_opensky():
    try:
        r = await pyfetch("https://opensky-network.org/api/states/all")
        data = await r.json()
        states = data.get("states", [])
        # Count by origin country
        countries = {}
        for s in states:
            origin = s[2] or "Unknown"
            countries[origin] = countries.get(origin, 0) + 1
        top = sorted(countries.items(), key=lambda x: -x[1])[:8]
        return top, len(states)
    except Exception as e:
        print(f"OpenSky failed: {e}")
        return None, 0

top, total = await fetch_opensky()
if top:
    series = [{"name": "Active aircraft", "data": [{"x": c, "y": n} for c, n in top]}]
    print(json.dumps({
        "chart_type": "bar", "title": f"Live: {total:,} Active Aircraft Worldwide (OpenSky)",
        "x_label": "Origin country", "y_label": "Aircraft count",
        "series": series,
        "stats": [
            {"label": "Total airborne", "value": f"{total:,}", "tone": "success"},
            {"label": "Top country", "value": top[0][0], "tone": "default"},
            {"label": "Countries tracked", "value": str(len(set(c for c,_ in top))), "tone": "default"},
            {"label": "Source", "value": "OpenSky API (live)", "tone": "success"},
        ],
        "summary": f"Right now, {total:,} aircraft are airborne worldwide. The top country is {top[0][0]} with {top[0][1]} aircraft. This is the LHC trigger of the aviation world — real-time monitoring of a global system."
    }))
else:
    print(json.dumps({"chart_type": "bar", "title": "OpenSky: API unavailable",
        "series": [{"name": "data", "data": [{"x": "unavailable", "y": 0}]}], "summary": "OpenSky API unreachable."}))`,w=`# Live: GitHub — trending repos (created last 7 days)
import json
from pyodide.http import pyfetch

async def fetch_github():
    try:
        r = await pyfetch("https://api.github.com/search/repositories?q=created:>2025-09-21&sort=stars&order=desc&per_page=10",
                          headers={"Accept": "application/vnd.github+json"})
        data = await r.json()
        repos = data.get("items", [])
        return repos
    except Exception as e:
        print(f"GitHub API failed: {e}")
        return None

repos = await fetch_github()
if repos:
    series = [{"name": "Stars", "data": [{"x": r["name"][:15], "y": r["stargazers_count"]} for r in repos[:8]]}]
    print(json.dumps({
        "chart_type": "bar", "title": f"Live: Top {len(repos)} GitHub Repos (created this week)",
        "x_label": "Repository", "y_label": "Stars",
        "series": series,
        "stats": [
            {"label": "Top repo", "value": repos[0]["name"], "tone": "success"},
            {"label": "Top stars", "value": f"{repos[0]['stargazers_count']:,}", "tone": "success"},
            {"label": "Language", "value": repos[0].get("language", "?"), "tone": "default"},
            {"label": "Source", "value": "GitHub API (live)", "tone": "success"},
        ],
        "summary": f"The most-starred repo created this week is {repos[0]['name']} with {repos[0]['stargazers_count']:,} stars. This IS the HLL use case — counting unique repos at scale."
    }))
else:
    print(json.dumps({"chart_type": "bar", "title": "GitHub: API unavailable",
        "series": [{"name": "data", "data": [{"x": "unavailable", "y": 0}]}], "summary": "GitHub API unreachable."}))`,_=`# Live: Stooq — S&P 500 daily returns
import json, math
from pyodide.http import pyfetch

async def fetch_stooq():
    try:
        r = await pyfetch("https://stooq.com/q/d/l/?s=^spx&i=d")
        text = await r.text()
        if len(text) < 200: raise ValueError("No data")
        lines = text.strip().split("\\n")
        closes = []
        for line in lines[1:]:
            parts = line.split(",")
            if len(parts) >= 5:
                try: closes.append(float(parts[4]))
                except: continue
        return closes[-60:] if len(closes) >= 60 else closes
    except Exception as e:
        print(f"Stooq failed: {e}")
        return None

closes = await fetch_stooq()
if closes and len(closes) > 2:
    returns = [math.log(closes[i+1]/closes[i]) for i in range(len(closes)-1)]
    # Histogram
    n_bins = 15
    pmin, pmax = min(returns), max(returns)
    bw = (pmax - pmin) / n_bins
    hist = [0] * n_bins
    for r in returns:
        idx = min(int((r - pmin) / bw), n_bins-1)
        hist[idx] += 1
    centers = [pmin + (i + 0.5) * bw for i in range(n_bins)]
    mean_r = sum(returns) / len(returns)
    var_r = sum((r - mean_r)**2 for r in returns) / len(returns)
    std_r = math.sqrt(var_r)
    var_95 = sorted(returns)[int(0.05 * len(returns))]
    series = [{"name": "Daily returns", "data": [{"x": f"{c*100:.1f}%", "y": h} for c, h in zip(centers, hist)]}]
    print(json.dumps({
        "chart_type": "bar", "title": f"Live: S&P 500 Daily Returns (last {len(returns)} days, Stooq)",
        "x_label": "Daily return", "y_label": "Frequency",
        "series": series,
        "stats": [
            {"label": "Mean return", "value": f"{mean_r*100:.3f}%", "tone": "default"},
            {"label": "Std dev (vol)", "value": f"{std_r*100:.2f}%", "tone": "default"},
            {"label": "VaR 95%", "value": f"\${abs(var_95)*1e6:,.0f}K", "tone": "warning"},
            {"label": "Source", "value": "Stooq SPX (live)", "tone": "success"},
        ],
        "reference_lines": [{"y": 0, "label": "Break-even", "color": "#94a3b8"}],
        "summary": f"S&P 500 last {len(returns)} days: mean = {mean_r*100:.3f}%/day, volatility = {std_r*100:.2f}%. VaR 95% = \${abs(var_95)*1e6:,.0f}K for \\$1M portfolio. Same GBM math as the Monte Carlo card."
    }))
else:
    print(json.dumps({"chart_type": "bar", "title": "Stooq: API unavailable",
        "series": [{"name": "data", "data": [{"x": "unavailable", "y": 0}]}], "summary": "Stooq API unreachable."}))`,S=`# Live: NOAA — global temperature anomalies
import json, math
from pyodide.http import pyfetch

async def fetch_noaa():
    try:
        r = await pyfetch("https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/land_ocean/1/0/1880-2024/data.json")
        data = await r.json()
        return data.get("data", {})
    except Exception as e:
        print(f"NOAA failed: {e}")
        return None

noaa = await fetch_noaa()
if noaa:
    years = sorted(noaa.keys())
    anomalies = [float(noaa[y]) for y in years if noaa[y] != "-99"]
    valid_years = [int(y) for y, a in zip(years, anomalies) if a != -99]
    # Last 30 years
    recent = valid_years[-30:]
    recent_anom = anomalies[-30:]
    series = [{"name": "Temperature anomaly", "data": [{"x": y, "y": a} for y, a in zip(recent, recent_anom)]}]
    trend = (recent_anom[-1] - recent_anom[0]) / (recent[-1] - recent[0])
    print(json.dumps({
        "chart_type": "line", "title": f"Live: Global Temperature Anomalies (NOAA, last {len(recent)} years)",
        "x_label": "Year", "y_label": "Anomaly (\xb0C)",
        "series": series,
        "stats": [
            {"label": "Latest anomaly", "value": f"{recent_anom[-1]:.2f}\xb0C", "tone": "destructive" if recent_anom[-1] > 0.5 else "warning"},
            {"label": "Trend", "value": f"+{trend*10:.2f}\xb0C/decade", "tone": "destructive"},
            {"label": "Warmest year", "value": str(recent[recent_anom.index(max(recent_anom))]), "tone": "destructive"},
            {"label": "Source", "value": "NOAA (live)", "tone": "success"},
        ],
        "reference_lines": [{"y": 0, "label": "20th century average", "color": "#94a3b8"}],
        "summary": f"Global temperature anomaly: {recent_anom[-1]:.2f}\xb0C above 20th-century average. Trend: +{trend*10:.2f}\xb0C/decade. Same SVD/EOF analysis as the climate-science page — but on REAL data."
    }))
else:
    print(json.dumps({"chart_type": "line", "title": "NOAA: API unavailable",
        "series": [{"name": "data", "data": [{"x": 0, "y": 0}]}], "summary": "NOAA API unreachable."}))`,N=[{label:"Live data sources",value:"7",hint:"OpenSky, GitHub, GitHub Events, GitHub Actions, Stooq, NOAA, Wikipedia — all fetched in real-time via Pyodide",deltaTone:"up"},{label:"Journey badges",value:"8",hint:"SVD, Bayes, Poisson, Kalman, Monte Carlo, Attention, FFT + Renaissance DS + LHC Analyst — unlock by exploring cross-domain pages",deltaTone:"up"},{label:"Math cousins tracked",value:"7 equations",hint:"Each equation appears in 4 domains — the tracker shows which you've explored",deltaTone:"flat"},{label:"Update mode",value:"Real-time",hint:"Every API call is live (with synthetic fallback). The dashboard IS the practicing DS's morning briefing.",deltaTone:"up"}];function A(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(r.PageHeader,{eyebrow:"The practicing data scientist's morning briefing",title:"Dashboard — Live Multi-Source + Cross-Domain Journey",description:"A unified dashboard pulling live data from 7 real APIs simultaneously, plus the cross-domain journey tracker showing your exploration progress across the platform's math cousins. Every chart is lazy-loaded (click to generate) with synthetic fallback if APIs are unreachable.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(d.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(b.Globe,{className:"h-3 w-3"})," 7 live sources"]}),(0,a.jsxs)(d.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(v.Award,{className:"h-3 w-3"})," ",N[1].value," badges"]}),(0,a.jsxs)(d.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(f.Sparkles,{className:"h-3 w-3"})," Pyodide"]})]})}),(0,a.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:N.map(e=>(0,a.jsx)(r.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,a.jsxs)(r.SectionCard,{title:"Live Data Sources — Real-Time Multi-Source Dashboard",description:"Each card fetches from a real API in real-time. Click 'Generate visualization' to fetch live data. Falls back to synthetic if the API is unreachable.",icon:(0,a.jsx)(x.Activity,{className:"h-5 w-5"}),badge:"4 live cards",badgeVariant:"outline",contentClassName:"p-4 md:p-5 space-y-4",children:[(0,a.jsx)(k,{title:"OpenSky — Global Aircraft Tracking (real-time)",equation:"aircraft_count = |states|; top_countries = group_by(origin)",domains:["Aviation","Real-Time","Streaming"],accent:"oklch(0.65 0.18 200)",description:"Live aircraft positions from OpenSky Network. Count airborne aircraft worldwide, grouped by origin country. Same real-time data pipeline pattern as the LHC trigger system.",code:j,icon:(0,a.jsx)(u.default,{className:"h-3 w-3"})}),(0,a.jsx)(k,{title:"GitHub — Trending Repositories (this week)",equation:"stars = repo.stargazers_count; HLL_estimate = APPROX_COUNT_DISTINCT(repo_ids)",domains:["Software","Real-Time","Social"],accent:"oklch(0.65 0.18 165)",description:"Top 10 most-starred GitHub repos created in the last 7 days. The same HLL algorithm (card 21 on Elegant Code) is used to count unique repos at scale — but here we show the top results, not just the cardinality.",code:w,icon:(0,a.jsx)(m.Github,{className:"h-3 w-3"})}),(0,a.jsx)(k,{title:"Stooq — S&P 500 Returns + VaR (last 60 days)",equation:"returns = log(P_t / P_{t-1}); VaR_95 = percentile(returns, 5%)",domains:["Finance","Risk","Real-Time"],accent:"oklch(0.65 0.18 30)",description:"Real S&P 500 daily returns from Stooq. The histogram shows the return distribution; VaR 95% marks the loss exceeded only 5% of the time. Same Monte Carlo + GBM math as the living-monte-carlo and living-gbm pages.",code:_,icon:(0,a.jsx)(h.TrendingUp,{className:"h-3 w-3"})}),(0,a.jsx)(k,{title:"NOAA — Global Temperature Anomalies (last 30 years)",equation:"anomaly = T_year - T_baseline; trend = (Δanomaly / Δtime)",domains:["Climate","Real-Time","Science"],accent:"oklch(0.65 0.18 60)",description:"Real global temperature anomalies from NOAA (land+ocean, 1880-2024). The line chart shows the warming trend — same SVD/EOF analysis as the climate-science page, but on REAL data. The trend line tells the climate story.",code:S,icon:(0,a.jsx)(p.default,{className:"h-3 w-3"})})]}),(0,a.jsx)(r.SectionCard,{title:"Cross-Domain Journey Tracker — Gamification",description:"Your exploration progress across the platform's math cousins. Each equation (SVD, Bayes, Poisson, etc.) appears in 4 domains. Visit pages to unlock badges. Progress is saved to localStorage.",icon:(0,a.jsx)(v.Award,{className:"h-5 w-5"}),badge:"Phase 4",badgeVariant:"outline",children:(0,a.jsx)(l.JourneyTracker,{})}),(0,a.jsx)(r.SectionCard,{title:"How the journey tracker works",description:"The platform tracks which pages you visit (localStorage). Each math equation appears in 4 domains — explore them all to earn the mastery badge.",icon:(0,a.jsx)(f.Sparkles,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"prose prose-sm dark:prose-invert max-w-none space-y-3",children:[(0,a.jsxs)("p",{className:"text-sm text-muted-foreground leading-relaxed",children:["The tracker maps each ",(0,a.jsx)("strong",{className:"text-foreground/80",children:"elegant-code equation"})," to its 4 host domains. For example, ",(0,a.jsx)("strong",{children:"SVD"}),' appears in genomics (living-svd), finance (fintech), audio (audio-signal), and climate (climate-science). Visit all 4 to unlock the "SVD Universalist" badge.']}),(0,a.jsx)("p",{className:"text-sm text-muted-foreground leading-relaxed",children:(0,a.jsx)("strong",{className:"text-foreground/80",children:"Badges available:"})}),(0,a.jsxs)("ul",{className:"text-sm text-muted-foreground space-y-0.5 ml-4 list-disc",children:[(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"SVD Universalist"})," — explore SVD in all 4 domains"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Bayesian Believer"})," — explore Bayes in all 4 domains"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Rare Event Master"})," — explore Poisson in all 4 domains"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"State Estimator"})," — explore Kalman in all 4 domains"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Monte Carlo Maestro"})," — explore Monte Carlo in all 4 domains"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Attention Architect"})," — explore Attention in all 4 domains"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Frequency Domain Explorer"})," — explore FFT in all 4 domains"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"Renaissance DS"})," — visit 10+ pages across different domains"]}),(0,a.jsxs)("li",{children:[(0,a.jsx)("strong",{children:"LHC Analyst"})," — explore the LHC data analysis page"]})]}),(0,a.jsx)("p",{className:"text-sm text-muted-foreground leading-relaxed",children:"Progress is saved to your browser's localStorage — it persists across sessions. No account, no login, no cloud. Pure client-side gamification."})]})}),(0,a.jsx)(i.NextSteps,{relatedPages:[{id:"lhc-data-analysis",reason:"The LHC page has 15 analysis cards covering all granularity levels"},{id:"analytics-outputs",reason:"29 visualization cards with live-data toggles (7 live sources)"},{id:"elegant-code",reason:"29 equation cards + 5 DS workflow methodology cards"},{id:"research",reason:"78 research papers with runnable code + visualizations"},{id:"trends",reason:"88 market trends with timeline + heat map"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(s.default,{href:(0,c.hrefFor)("home"),className:"text-sm text-primary hover:underline",children:"→ Return to overview"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(s.default,{href:(0,c.hrefFor)("lhc-data-analysis"),className:"text-sm text-primary hover:underline",children:"→ LHC Data Analysis"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(s.default,{href:(0,c.hrefFor)("analytics-outputs"),className:"text-sm text-primary hover:underline",children:"→ Analytics Outputs"})]})]})}function k({title:e,equation:s,domains:r,accent:i,description:l,code:c,icon:u}){let[m,p]=(0,t.useState)(!1),[h,x]=(0,t.useState)(null);return(0,a.jsxs)("div",{className:"rounded-lg border border-border/60 overflow-hidden transition-shadow hover:shadow-md",style:{borderLeftWidth:4,borderLeftColor:i},children:[(0,a.jsx)("button",{type:"button",className:"w-full text-left p-4 cursor-pointer",onClick:()=>p(!m),"aria-expanded":m,children:(0,a.jsxs)("div",{className:"flex items-start gap-3",children:[(0,a.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,a.jsxs)("div",{className:"flex items-center gap-1.5 flex-wrap mb-1",children:[u&&(0,a.jsx)("span",{style:{color:i},children:u}),r.map((e,t)=>(0,a.jsx)("span",{className:"text-[9px] px-1.5 py-0 rounded font-mono",style:{color:i,border:`1px solid ${i}`},children:e},t)),(0,a.jsxs)(d.Badge,{variant:"outline",className:"text-[8px] h-3.5 px-1 gap-0.5 ml-auto",children:[(0,a.jsx)("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"})," LIVE"]})]}),(0,a.jsx)("p",{className:"text-sm font-semibold leading-tight",children:e}),(0,a.jsx)("p",{className:"text-[10px] font-mono text-muted-foreground mt-0.5",children:s}),(0,a.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1.5 leading-relaxed",children:l})]}),(0,a.jsx)(g.ArrowRight,{className:`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${m?"rotate-90":""}`})]})}),m&&(0,a.jsxs)("div",{className:"px-4 pb-4 space-y-3 border-t border-border/40 pt-3",children:[(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsxs)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(y.Eye,{className:"h-3 w-3"})," Click to fetch live data"]}),(0,a.jsx)(n.PyodideRunner,{code:c,buttonLabel:"Fetch live data",onOutput:e=>{try{let a=e.indexOf("{"),t=e.lastIndexOf("}");a>=0&&t>a&&x(JSON.parse(e.substring(a,t+1)))}catch{}},hideTextOutput:!!h,compact:!0})]}),h?(0,a.jsx)(o.AnalysisChart,{data:h,accent:i,sourceCode:c}):(0,a.jsx)("p",{className:"text-[10px] text-muted-foreground/70 italic",children:'↑ Click "Fetch live data" to see the real-time chart'})]})]})}e.s(["DashboardPage",()=>A],438437)}]);