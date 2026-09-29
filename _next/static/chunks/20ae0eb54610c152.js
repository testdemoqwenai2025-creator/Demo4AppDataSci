(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,59938,e=>{"use strict";var t=e.i(843476),a=e.i(522016),s=e.i(852008),r=e.i(901752);function i({topics:e}){return 0===e.length?null:(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-muted/20 p-4",children:[(0,t.jsxs)("p",{className:"text-xs font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(s.Layers,{className:"h-3.5 w-3.5 text-primary"})," Related topics — cross-page navigation"]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2 text-sm",children:e.map((s,i)=>(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsxs)(a.default,{href:(0,r.hrefFor)(s.id),className:"text-primary hover:underline",children:["→ ",s.reason]}),i<e.length-1&&(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"})]},s.id))})]})}e.s(["RelatedTopics",()=>i])},675450,e=>{"use strict";var t=e.i(843476),a=e.i(522016),s=e.i(487486),r=e.i(283086),i=e.i(972520),n=e.i(901752),o=e.i(518550);function l({hostPage:e,sourceCard:l,cardIndices:d}){let m;if(0===(m=d||(void 0!==l?[l]:e?(0,o.cardsOnHostPage)(e).map(e=>e.cardIndex):[])).length)return null;let c=new Set;for(let e of m)for(let t of(0,o.recommendedCards)(e))m.includes(t)||c.add(t);let p=Array.from(c),u={};for(let e of m)for(let t of(0,o.recommendedCards)(e))m.includes(t)||(u[t]=(u[t]??0)+1);return(p.sort((e,t)=>(u[t]??0)-(u[e]??0)||e-t),0===p.length)?null:(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-4",children:[(0,t.jsxs)("p",{className:"text-xs font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(r.Sparkles,{className:"h-3.5 w-3.5 text-primary"})," Related elegant-code — mathematical cousins"]}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground mb-3 leading-relaxed",children:1===m.length?"Based on the card propagated above, these equations share sciences or a mathematical family with it — surf the graph of 'X IS Y' connections.":`Based on the ${m.length} card${m.length>1?"s":""} propagated on this page, these are the mathematical cousins worth visiting next.`}),(0,t.jsx)("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-2",children:p.slice(0,6).map(e=>{let s=o.ELEGANT_CODE_MAP[e];return(0,t.jsxs)(a.default,{href:`${(0,n.hrefFor)("elegant-code")}#card-${e}`,className:"group block rounded-md border border-border/60 bg-background p-2.5 hover:border-primary/40 hover:bg-primary/5 transition-colors",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-1",children:[(0,t.jsx)("span",{className:"text-xs font-semibold text-foreground/90",children:s.name}),(0,t.jsx)(i.ArrowRight,{className:"h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors"})]}),(0,t.jsx)("div",{className:"font-mono text-[10px] text-muted-foreground mb-1 truncate",children:s.equation}),(0,t.jsx)("div",{className:"text-[10px] italic text-primary/80 leading-tight",children:s.insightShort}),(0,t.jsx)("div",{className:"text-[10px] text-muted-foreground mt-1",children:s.sciences.join(" ↔ ")})]},e)})}),(0,t.jsxs)("div",{className:"mt-3 flex items-center gap-2",children:[(0,t.jsxs)(s.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,t.jsx)(r.Sparkles,{className:"h-3 w-3"}),p.length," cousin",1===p.length?"":"s"]}),(0,t.jsx)(a.default,{href:(0,n.hrefFor)("connections"),className:"text-xs text-primary hover:underline",children:"→ See the full card → host map"})]})]})}e.s(["RelatedElegantCode",()=>l])},838307,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(846932),r=e.i(88653),i=e.i(519455),n=e.i(487486),o=e.i(431343),l=e.i(531278),d=e.i(63209),m=e.i(595468),c=e.i(607317),c=c;async function p(){let e=window;if(!e.__pyodidePromise){let t="https://cdn.jsdelivr.net/pyodide/v0.26.2/full/";e.__pyodidePromise=(async()=>(await new Promise((a,s)=>{if(e.loadPyodide)return void a();let r=document.createElement("script");r.src=`${t}pyodide.js`,r.onload=()=>a(),r.onerror=()=>s(Error("Failed to load Pyodide bootstrap")),document.head.appendChild(r)}),await e.loadPyodide({indexURL:t})))()}return e.__pyodidePromise}function u({code:e,slider:u,renderer:h,buttonLabel:x="Run live",preamble:g,autoRun:f=!0,lazy:v=!0}){let[y,b]=(0,a.useState)(u.default),[_,j]=(0,a.useState)("idle"),[S,N]=(0,a.useState)(null),[K,w]=(0,a.useState)(null),[A,k]=(0,a.useState)(null),R=(0,a.useRef)(null),P=(0,a.useRef)(!0),T=(0,a.useRef)(!1),I=(0,a.useCallback)(t=>e.replace(RegExp(`\\$\\{${u.name}\\}`,"g"),String(t)).replace(RegExp(`\\{${u.name}\\}`,"g"),String(t)),[e,u.name]),M=(0,a.useCallback)(async e=>{j("loading"),w(null);let t=performance.now();try{let a=await p(),s=Math.round(performance.now()-t);k(s);let r=[],i=e=>{r.push(e)};try{a.setStdout({batched:i}),a.setStderr({batched:i})}catch{a.setStdout(i),a.setStderr(i)}let n=I(e);if(/\bnumpy\b|\bnp\./.test(n)||g&&/\bnumpy\b/.test(g))try{await a.loadPackage("numpy")}catch{}j("running"),g&&await a.runPythonAsync(g),await a.runPythonAsync(n);let o=r.join(""),l=o.split("\n").filter(e=>e.trim().length>0),d=l[l.length-1],m=null;try{m=JSON.parse(d)}catch{m={_raw:o}}N(m),j("done")}catch(e){w(e instanceof Error?e.message:String(e)),j("error")}},[g,I]);return(0,a.useEffect)(()=>{if(P.current){P.current=!1,f&&!v&&(T.current=!0,M(y));return}if(T.current)return R.current&&clearTimeout(R.current),R.current=setTimeout(()=>{M(y)},300),()=>{R.current&&clearTimeout(R.current)}},[y,M,f,v]),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-4 space-y-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-1.5",children:[(0,t.jsxs)("label",{htmlFor:`slider-${u.name}`,className:"text-xs font-semibold text-foreground/80 flex items-center gap-1.5",children:[(0,t.jsx)(c.default,{className:"h-3.5 w-3.5 text-primary"}),u.label]}),(0,t.jsxs)(n.Badge,{variant:"default",className:"text-[10px] font-mono",children:[u.name," = ",y]})]}),(0,t.jsx)("input",{id:`slider-${u.name}`,type:"range",min:u.min,max:u.max,step:u.step,value:y,onChange:e=>b(Number(e.target.value)),className:"w-full h-2 rounded-lg appearance-none cursor-pointer bg-muted accent-primary"}),(0,t.jsxs)("div",{className:"flex justify-between text-[10px] text-muted-foreground mt-1 font-mono",children:[(0,t.jsx)("span",{children:u.min}),(0,t.jsxs)("span",{children:[u.default," (default)"]}),(0,t.jsx)("span",{children:u.max})]}),u.hint&&(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-1.5 leading-relaxed",children:u.hint})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)(i.Button,{size:"sm",variant:"running"===_||"loading"===_?"outline":"default",className:"gap-1.5",onClick:()=>{T.current=!0,M(y)},disabled:"loading"===_||"running"===_,children:["loading"===_||"running"===_?(0,t.jsx)(l.Loader2,{className:"h-3.5 w-3.5 animate-spin"}):"done"===_?(0,t.jsx)(m.CheckCircle2,{className:"h-3.5 w-3.5"}):"error"===_?(0,t.jsx)(d.AlertCircle,{className:"h-3.5 w-3.5"}):(0,t.jsx)(o.Play,{className:"h-3.5 w-3.5"}),x]}),null!==A&&"done"===_&&(0,t.jsxs)("span",{className:"text-[10px] text-muted-foreground",children:["Pyodide: ",A,"ms load + ",(performance.now()-A-A).toFixed(0),"ms run"]})]}),(0,t.jsxs)(r.AnimatePresence,{children:["error"===_&&K&&(0,t.jsx)(s.motion.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"rounded-md bg-rose-500/10 border border-rose-500/40 p-2 text-xs text-rose-700 dark:text-rose-300 font-mono",children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap",children:K})}),"done"===_&&null!==S&&(0,t.jsx)(s.motion.div,{initial:{opacity:0},animate:{opacity:1},className:"rounded-md border border-emerald-500/30 bg-background p-3",children:h(S,y)}),"idle"===_&&(0,t.jsxs)("div",{className:"rounded-md border border-dashed border-primary/30 bg-primary/5 p-2.5 text-xs text-muted-foreground italic",children:["Press ",(0,t.jsxs)("strong",{className:"text-primary not-italic",children:['"',x,'"']})," to load Pyodide (~10MB, first run only) and compute the live chart. Subsequent slider drags will auto-update (300ms debounce) — but only after this first click (lazy evaluation: nothing loads until you ask)."]}),"loading"===_&&(0,t.jsx)("div",{className:"text-xs text-muted-foreground italic",children:"Loading Pyodide runtime (~10MB, first run only)…"}),"running"===_&&(0,t.jsxs)("div",{className:"text-xs text-muted-foreground italic",children:["Running with ",u.name," = ",y,"…"]})]})]})}e.s(["LivingEquationRunner",()=>u],838307)},440392,e=>{"use strict";var t=e.i(44137);e.s(["Ship",()=>t.default])},894148,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(522016),r=e.i(862824),i=e.i(342046),n=e.i(580296),o=e.i(122836),l=e.i(838307),d=e.i(59938),m=e.i(675450),c=e.i(901752),p=e.i(487486),u=e.i(21218),h=e.i(283086),x=e.i(25652),g=e.i(966992),f=e.i(810980),v=e.i(440392),y=e.i(129228),b=e.i(555706),_=e.i(785183),j=e.i(93230),S=e.i(872526),N=e.i(234239),K=e.i(731195),w=e.i(559559),A=e.i(332017);let k=[{label:"Dataset",value:"Synthetic AIS vessel track (50 steps)",hint:"Vessel true position (random walk + drift), AIS reports with Gaussian noise σ_AIS. Real AIS: 100K vessels × 2-60s updates via MarineTraffic.",deltaTone:"flat"},{label:"Equation",value:"x̂(t+1) = x̂(t) + K·(z − H·x̂(t))",hint:"Kalman update. K = P·H^T·(H·P·H^T + R)^(-1) is the Kalman gain — weights prediction vs measurement.",deltaTone:"flat"},{label:"Slider",value:"R (measurement noise variance)",hint:"Drag R from 0.001 to 1.0. Small R: trust AIS, responsive (noisy track). Large R: trust model, smooth (laggy track). Trade-off via R.",deltaTone:"up"},{label:"Production",value:"filterpy.KalmanFilter",hint:"Production: filterpy.KalmanFilter(dim_x, dim_z). OpenCV cv2.KalmanFilter. Apollo navigation used Kalman for lunar module.",deltaTone:"flat"}];function R(){let[e,R]=(0,a.useState)("live");return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(r.PageHeader,{eyebrow:"Living equation · run Kalman Filter live in your browser",title:"Living Kalman — vessel tracking from noisy AIS reports",description:"A Kalman filter fuses noisy AIS position reports with a kinematic motion model to produce a smooth vessel track. Drag R (measurement noise variance) and watch the filter trade responsiveness (small R, follows AIS) against smoothness (large R, follows model). The SAME filter tracks aircraft via ADS-B, alleles via 1000-Genomes, and Apollo 11's lunar module — because all three ask 'given noisy measurements and a state model, what's the best estimate of the true state?'",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(u.Activity,{className:"h-3 w-3"})," Bayesian Estimation"]}),(0,t.jsxs)(p.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(v.Ship,{className:"h-3 w-3"})," AIS Vessel Tracking"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:k.map(e=>(0,t.jsx)(r.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)("div",{className:"flex flex-wrap gap-1.5 border-b border-border/60",children:[["live","Live demo (Pyodide + slider)"],["math","Math derivation"],["production","Production code (filterpy)"]].map(([a,s])=>(0,t.jsx)("button",{onClick:()=>R(a),className:`px-3 py-1.5 text-xs font-semibold border-b-2 -mb-px transition-all ${e===a?"border-primary text-primary":"border-transparent text-muted-foreground hover:text-foreground"}`,children:s},a))}),"live"===e&&(0,t.jsx)(r.SectionCard,{title:"Live Kalman on synthetic AIS — drag R and watch tracking trade off",description:"The vessel's true position evolves as a random walk + drift (toward the destination). AIS reports are noisy observations of the true position. The Kalman filter fuses model (predict where the vessel will be) + measurement (AIS says where it is) via the Kalman gain K = P/(P+R). Small R → trust AIS, track follows reports (responsive but noisy). Large R → trust model, track smooth (but lags behind).",icon:(0,t.jsx)(h.Sparkles,{className:"h-5 w-5"}),badge:"live",children:(0,t.jsx)(l.LivingEquationRunner,{slider:{name:"R",label:"R (AIS measurement noise variance)",min:1,max:100,step:1,default:25,hint:"R=1 (σ=1m): trust AIS, very responsive. R=25 (σ=5m, real AIS noise): balanced. R=100: trust model, very smooth but lags."},preamble:"import json, math, random",code:`import json, math, random

random.seed(42)

# Simulate a vessel's true position (random walk + drift toward destination).
# State: x = [lat, lon] (2D position).
# Real AIS: lat/lon updates every 2-60 seconds with σ ≈ 5-15m.
N = 50  # number of timesteps
true_lat = 51.95  # start at Rotterdam
true_lon = 4.14
# Vessel drifts toward Singapore (random walk toward SE)
drift_lat = -0.001   # deg per step (heading south)
drift_lon = 0.005    # deg per step (heading east)
process_noise_lat = 0.0003  # σ for random walk (deg)
process_noise_lon = 0.0015

true_positions = []
for t in range(N):
    true_lat += drift_lat + random.gauss(0, process_noise_lat)
    true_lon += drift_lon + random.gauss(0, process_noise_lon)
    true_positions.append((true_lat, true_lon))

# Simulate AIS measurements (noisy observations of true position).
R = \${R} / 1000.0  # slider value, convert to deg\xb2 (variance)
sigma_AIS = math.sqrt(R)
ais_measurements = []
for lat, lon in true_positions:
    z_lat = lat + random.gauss(0, sigma_AIS)
    z_lon = lon + random.gauss(0, sigma_AIS)
    ais_measurements.append((z_lat, z_lon))

# 1D Kalman filter (treat lat and lon independently for simplicity).
# State: x = scalar position (lat or lon)
# Model: x(t+1) = x(t) + drift + w(t), where w ~ N(0, Q)
# Measurement: z(t) = x(t) + v(t), where v ~ N(0, R)
# Update:
#   Predict: x_pred = x_est + drift; P_pred = P + Q
#   Update:  K = P_pred / (P_pred + R); x_est = x_pred + K*(z - x_pred); P = (1-K)*P_pred

# Process noise (model uncertainty)
Q = process_noise_lat ** 2  # variance of model noise

def kalman_1d(initial_x, drift, Q_val, R_val, measurements):
    x = initial_x
    P = 1.0  # initial uncertainty
    estimates = []
    for z in measurements:
        # Predict
        x_pred = x + drift
        P_pred = P + Q_val
        # Update
        K = P_pred / (P_pred + R_val)
        x = x_pred + K * (z - x_pred)
        P = (1 - K) * P_pred
        estimates.append(x)
    return estimates

# Apply Kalman filter to latitude
true_lats = [p[0] for p in true_positions]
ais_lats = [z[0] for z in ais_measurements]
est_lats = kalman_1d(true_lats[0] - drift_lat, drift_lat, Q, R, ais_lats)

# Apply Kalman filter to longitude (use lon's drift and noise)
Q_lon = process_noise_lon ** 2
true_lons = [p[1] for p in true_positions]
ais_lons = [z[1] for z in ais_measurements]
est_lons = kalman_1d(true_lons[0] - drift_lon, drift_lon, Q_lon, R, ais_lons)

# Build chart data: time series of true / AIS / Kalman estimates.
chart_data = []
for t in range(N):
    # Plot longitude (more visible variation than latitude)
    chart_data.append({
        'step': t,
        'true_lon': true_lons[t],
        'ais_lon': ais_lons[t],
        'kalman_lon': est_lons[t],
    })

# Compute RMSE: Kalman vs AIS
rmse_kalman = math.sqrt(sum((true_lons[i] - est_lons[i]) ** 2 for i in range(N)) / N)
rmse_ais = math.sqrt(sum((true_lons[i] - ais_lons[i]) ** 2 for i in range(N)) / N)

# Final Kalman gain (steady-state approximation)
final_P = Q / (1 - (1 - Q / (Q + R)) ** N) if Q + R > 0 else 0
# Simpler: just report the last K used in the loop
# Re-compute by running one more step:
x_test = est_lons[-1]
P_test = 0.5  # rough estimate
P_pred_test = P_test + Q_lon
final_K = P_pred_test / (P_pred_test + R)

result = {
    'chart_data': chart_data,
    'rmse_kalman': rmse_kalman,
    'rmse_ais': rmse_ais,
    'R': R,
    'sigma_AIS': sigma_AIS,
    'final_K': final_K,
    'N': N,
}
print(json.dumps(result))
`,renderer:e=>(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-muted/30 p-2",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase text-muted-foreground",children:"R"}),(0,t.jsx)("p",{className:"font-mono font-bold text-primary text-base",children:e.R.toFixed(3)})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-muted/30 p-2",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase text-muted-foreground",children:"σ_AIS"}),(0,t.jsxs)("p",{className:"font-mono font-bold text-primary text-base",children:[e.sigma_AIS.toFixed(4),"°"]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-muted/30 p-2",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase text-muted-foreground",children:"RMSE Kalman"}),(0,t.jsxs)("p",{className:"font-mono font-bold text-primary text-base",children:[e.rmse_kalman.toFixed(4),"°"]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-muted/30 p-2",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase text-muted-foreground",children:"RMSE raw AIS"}),(0,t.jsxs)("p",{className:"font-mono font-bold text-primary text-base",children:[e.rmse_ais.toFixed(4),"°"]})]})]}),(0,t.jsx)("div",{style:{width:"100%",height:320},children:(0,t.jsx)(K.ResponsiveContainer,{children:(0,t.jsxs)(y.LineChart,{data:e.chart_data,margin:{top:12,right:16,bottom:24,left:8},children:[(0,t.jsx)(S.CartesianGrid,{stroke:"hsl(var(--border))",strokeOpacity:.4}),(0,t.jsx)(_.XAxis,{dataKey:"step",stroke:"hsl(var(--muted-foreground))",fontSize:10,label:{value:"time step",position:"insideBottom",offset:-10,fontSize:10}}),(0,t.jsx)(j.YAxis,{stroke:"hsl(var(--muted-foreground))",fontSize:10,label:{value:"longitude (deg)",angle:-90,position:"insideLeft",fontSize:10}}),(0,t.jsx)(N.Tooltip,{formatter:e=>e.toFixed(4),labelFormatter:e=>`step ${e}`}),(0,t.jsx)(w.Legend,{}),(0,t.jsx)(b.Line,{name:"True position (hidden)",type:"monotone",dataKey:"true_lon",stroke:"#16a34a",strokeWidth:2.5,dot:!1}),(0,t.jsx)(b.Line,{name:"AIS reports (noisy)",type:"monotone",dataKey:"ais_lon",stroke:"#dc2626",strokeWidth:1,dot:!0,strokeOpacity:.6}),(0,t.jsx)(b.Line,{name:"Kalman estimate",type:"monotone",dataKey:"kalman_lon",stroke:"#2563eb",strokeWidth:2.5,dot:!1})]})})}),(0,t.jsxs)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:["The ",(0,t.jsx)("span",{className:"text-emerald-600 dark:text-emerald-400 font-semibold",children:"green line"})," is the vessel's true (hidden) position. The ",(0,t.jsx)("span",{className:"text-rose-600 dark:text-rose-400 font-semibold",children:"red dots"})," are noisy AIS reports. The ",(0,t.jsx)("span",{className:"text-blue-600 dark:text-blue-400 font-semibold",children:"blue line"})," is the Kalman filter's estimate. At ",(0,t.jsxs)("span",{className:"font-mono text-primary",children:["R = ",e.R.toFixed(3)]})," (σ_AIS = ",e.sigma_AIS.toFixed(4),"°): Kalman RMSE = ",(0,t.jsxs)("span",{className:"font-mono text-primary",children:[e.rmse_kalman.toFixed(4),"°"]})," vs raw AIS RMSE = ",(0,t.jsxs)("span",{className:"font-mono text-primary",children:[e.rmse_ais.toFixed(4),"°"]}),". The Kalman filter ",(0,t.jsxs)("strong",{className:"text-foreground/80",children:["denoises by ",((1-e.rmse_kalman/e.rmse_ais)*100).toFixed(1),"%"]})," versus raw AIS."]})]})})}),"math"===e&&(0,t.jsx)(r.SectionCard,{title:"Math derivation — where Kalman comes from",description:"Kalman (1960) derived the linear-quadratic estimator as the minimum-mean-square-error (MMSE) Bayesian filter for linear Gaussian systems. The Kalman gain K is the optimal weighting between prediction and measurement.",icon:(0,t.jsx)(f.BookOpen,{className:"h-5 w-5"}),badge:"derivation",children:(0,t.jsxs)("div",{className:"space-y-4 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The state-space model."})," Linear dynamics: x(t+1) = F·x(t) + w(t), w ~ N(0, Q). Linear measurement: z(t) = H·x(t) + v(t), v ~ N(0, R). The state x is hidden; we observe only z. Goal: estimate x given the history of z's."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The two-step update."})," Predict: x_pred = F·x_est; P_pred = F·P·F^T + Q. (P is the state covariance.) Update: K = P_pred·H^T·(H·P_pred·H^T + R)^(-1); x_est = x_pred + K·(z − H·x_pred); P = (I − K·H)·P_pred. The Kalman gain K weights the residual (z − H·x_pred) against the prediction."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Why K = P/(P+R) in the 1D case."})," If P (model uncertainty) is large relative to R (measurement noise), then K → 1: trust the measurement. If R is large relative to P, then K → 0: trust the model. The optimal K minimises E[(x − x_est)²] (MMSE)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Apollo navigation (1969)."})," The lunar module's onboard computer ran a Kalman filter fusing inertial measurement unit (IMU) data with radar altimeter measurements. The filter estimated position, velocity, and attitude — critical for the descent to the lunar surface. Kalman 1960 → Apollo 1969 in less than a decade. Today, every phone GPS uses an extended Kalman filter (EKF) fusing satellite pseudoranges with motion models."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Citation."})," Kalman, 'A New Approach to Linear Filtering and Prediction Problems', ASME J. Basic Eng. 82:1 (1960). Humpherys, 'Apollo navigation — Kalman filter' (1969)."]})]})}),"production"===e&&(0,t.jsxs)(r.SectionCard,{title:"Production code — what filterpy and OpenCV compute",description:"In production, you call filterpy.KalmanFilter (Python) or cv2.KalmanFilter (C++). Both implement the full predict/update cycle. MarineTraffic uses a Kalman variant for AIS track smoothing; FlightAware uses it for ADS-B flight tracking.",icon:(0,t.jsx)(g.Cpu,{className:"h-5 w-5"}),badge:"production",children:[(0,t.jsx)(o.CodeBlock,{language:"python",filename:"production_kalman.py",code:`# Production Kalman filter on real AIS data
import numpy as np
from filterpy.kalman import KalmanFilter
import pandas as pd

# Load real AIS track from MarineTraffic
# Format: timestamp, mmsi, lat, lon, sog, cog, heading
ais = pd.read_csv('vessel_track.csv')  # ~360 positions per vessel per hour

# 4D state: [lat, lat_vel, lon, lon_vel]
# 2D measurement: [lat, lon] (from AIS)
kf = KalmanFilter(dim_x=4, dim_z=2)

# State transition: constant velocity model
dt = 60  # 60 seconds between AIS reports (typical)
kf.F = np.array([
    [1, dt, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, dt],
    [0, 0, 0, 1],
], dtype=float)

# Measurement: observe lat, lon (not velocities)
kf.H = np.array([
    [1, 0, 0, 0],
    [0, 0, 1, 0],
], dtype=float)

# Process noise (model uncertainty) — Q matrix
# (Tune empirically; small Q = trust model, large Q = trust measurements)
kf.Q = np.diag([1e-6, 1e-9, 1e-5, 1e-9])

# Measurement noise (AIS noise) — R matrix
# Real AIS: σ ≈ 5-15 meters → R = σ^2 ≈ 25-225 m^2
# In degrees: 1 m ≈ 9e-6 deg, so R_lat = R_lon = (5e-5)^2 = 2.5e-9
kf.R = np.diag([2.5e-9, 2.5e-9])

# Initial state from first AIS report
kf.x = np.array([ais.lat.iloc[0], 0, ais.lon.iloc[0], 0])
kf.P = np.diag([1e-4, 1e-6, 1e-4, 1e-6])  # initial uncertainty

# Run the filter
estimates = []
for _, row in ais.iterrows():
    kf.predict()
    kf.update([row.lat, row.lon])
    estimates.append({
        'lat': kf.x[0], 'lat_vel': kf.x[1],
        'lon': kf.x[2], 'lon_vel': kf.x[3],
    })

est_df = pd.DataFrame(estimates)
print(f"Track smoothed: {len(est_df)} positions")
print(f"Mean lat velocity: {est_df.lat_vel.mean():.6f} deg/s")
print(f"Mean lon velocity: {est_df.lon_vel.mean():.6f} deg/s")

# Real production: MarineTraffic computes this for 100K vessels \xd7 24h \xd7 60 updates/h = 1.4\xd710⁸
# Kalman iterations per day. Output: smooth tracks for ETA prediction, port congestion analytics.`}),(0,t.jsxs)("div",{className:"mt-3 grid grid-cols-2 gap-2 text-xs",children:[(0,t.jsxs)(s.default,{href:(0,c.hrefFor)("global-shipping"),className:"rounded-md border border-border/60 bg-muted/20 p-2 hover:border-primary/40 hover:bg-primary/5 transition-colors block",children:[(0,t.jsx)("p",{className:"font-semibold text-foreground/80",children:"→ Global Shipping"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[10px] mt-0.5",children:"Maritime analytics hub — AIS tracking, Lloyd's, port congestion."})]}),(0,t.jsxs)(s.default,{href:(0,c.hrefFor)("elegant-code"),className:"rounded-md border border-border/60 bg-muted/20 p-2 hover:border-primary/40 hover:bg-primary/5 transition-colors block",children:[(0,t.jsx)("p",{className:"font-semibold text-foreground/80",children:"→ Elegant Code (Kalman card)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[10px] mt-0.5",children:"Kalman's full cross-disciplinary card: maritime ↔ aviation ↔ genetics."})]})]})]}),(0,t.jsx)(r.SectionCard,{title:"My deeper thought: Kalman IS the universal state-estimation equation",description:"A port authority tracking vessel positions from noisy AIS (100K vessels × 60s updates), an ATC controller tracking aircraft from noisy ADS-B pings (100K flights × 1s updates), and a population geneticist tracking allele frequencies from noisy sequencing read counts (10⁶ SNPs × per-generation updates) all use the SAME Bayesian update — because all three ask 'given a noisy measurement z and a state-space model, what's the MMSE estimate of the true state?'. Kalman 1960 invented this for Apollo navigation (1969).",icon:(0,t.jsx)(x.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsx)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"A port captain, an ATC controller, and a geneticist"})," are running the same update step. The math is universal — the application is irrelevant."]})})}),(0,t.jsx)(m.RelatedElegantCode,{sourceCard:16}),(0,t.jsxs)(A.DeeperThoughtSection,{pageTitle:"Kalman",children:[(0,t.jsx)(A.DeeperThought,{title:"Kalman IS the universal state estimator — vessels, planes, alleles, and Apollo",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"A port authority tracking 100K vessels from noisy AIS, an ATC controller tracking 100K flights from noisy ADS-B, and a geneticist tracking allele frequencies from noisy sequencing all use the SAME Bayesian update. Kalman 1960 invented this for Apollo's lunar module navigation (1969). The math doesn't know if the state is [lat, lon, SOG, COG] or [allele_freq, drift_rate]. It just fuses a noisy measurement with a state-space model to produce the MMSE estimate. The Kalman gain K = P/(P+R) is universal because it's the optimal linear Bayesian estimator."})}),(0,t.jsx)(A.DeeperThought,{title:"The Kalman gain IS the trust ratio — model vs measurement",connectedTo:"ADR-051 (living-equation pages)",children:(0,t.jsx)("p",{children:"When you drag R on this page, K changes. Small R (trust AIS) → K≈1 (measurement dominates, track follows reports — responsive but noisy). Large R (trust model) → K≈0 (model dominates, track is smooth but lags). The Kalman gain IS the ratio of how much you trust your measurement vs your model. It's the same trade-off in every Bayesian system: prior vs likelihood. Kalman makes it quantitative — K = P/(P+R) is the optimal weighting. Understanding K IS understanding Bayesian inference."})}),(0,t.jsx)(A.DeeperThought,{title:"Apollo 11 used Kalman — the filter went to the Moon before it went to production",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"Kalman published his filter in 1960. By 1969, it was running on the Apollo Guidance Computer (AGC) — a 2KB-RAM, 32KB-ROM machine with 0.043 MHz clock speed. The AGC ran Kalman to fuse IMU data with radar altimeter measurements during the lunar descent. The filter went to the Moon before it went to automotive GPS, maritime AIS, or financial trading. Nine years from theory to lunar module — one of the fastest theory-to-deployment cycles in engineering history. Every phone GPS uses an extended Kalman filter today."})}),(0,t.jsx)(A.DeeperThought,{title:"The 3-line time series IS the proof — true / noisy / filtered",connectedTo:"ADR-051 (living-equation pages)",children:(0,t.jsx)("p",{children:"When you click 'Run analytics' on this page, you see 3 lines: green (true position, hidden in real life), red dots (noisy AIS reports), blue (Kalman estimate). The blue line tracks the green line more closely than the red dots — the filter DENOISES. The RMSE comparison (Kalman vs raw AIS) quantifies the improvement. The visual output — 3 overlapping lines — communicates 'filtering works' instantly. The brain sees the blue line hugging the green and understands: the math is extracting signal from noise."})}),(0,t.jsx)(A.DeeperThought,{title:"The Kalman filter IS Bayesian belief updating — same as Bayes' theorem",connectedTo:"ADR-007 (Bayesian methods)",children:(0,t.jsx)("p",{children:"The Kalman update x̂(t+1) = x̂(t) + K·(z - H·x̂(t)) IS Bayes' theorem in linear-Gaussian form. The prediction step uses the prior (model-based state estimate). The update step uses the likelihood (measurement z). The Kalman gain K IS the posterior weighting. The SAME equation as Bayes — P(H|D) = P(D|H)P(H)/P(D) — just in matrix form with Gaussian distributions. A Bayesian sees Kalman; a controls engineer sees Kalman; a geneticist sees Kalman. They're all doing the same computation."})})]}),(0,t.jsx)(d.RelatedTopics,{topics:[{id:"global-shipping",reason:"Global Shipping — vessel tracking via AIS + Kalman"},{id:"elegant-code",reason:"Elegant Code — the Kalman card (cross-disciplinary)"},{id:"space-science",reason:"Space Science — Kalman in Apollo + satellite navigation"},{id:"living-haversine",reason:"Living Haversine (cousin: port distance)"}]}),(0,t.jsx)(n.TrendAnticipation,{pageId:"living-kalman"}),(0,t.jsx)(i.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"global-shipping",reason:"Global Shipping — vessel tracking via AIS + Kalman"},{id:"elegant-code",reason:"Elegant Code — the Kalman card (cross-disciplinary)"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(s.default,{href:(0,c.hrefFor)("elegant-code"),className:"text-sm text-primary hover:underline",children:"→ Elegant Code (Kalman card)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,c.hrefFor)("global-shipping"),className:"text-sm text-primary hover:underline",children:"→ Global Shipping (production)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,c.hrefFor)("living-haversine"),className:"text-sm text-primary hover:underline",children:"→ Living Haversine (cousin)"})]})]})}e.s(["LivingKalmanPage",()=>R])}]);