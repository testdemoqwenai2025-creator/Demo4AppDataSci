(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,777383,e=>{"use strict";var t=e.i(843476),r=e.i(271645),i=e.i(846932),s=e.i(522016),a=e.i(862824),n=e.i(342046),o=e.i(921371),l=e.i(580296),c=e.i(122836),d=e.i(716675),h=e.i(487486),m=e.i(691385),p=e.i(966992),x=e.i(21218),f=e.i(39312),u=e.i(691756),g=e.i(63639),y=e.i(248256),b=e.i(991799),j=e.i(218755);let k=[{id:"orbit",step:"1",title:"Draggable orbit (Kepler's 3rd law)",subtitle:"a, e, M sliders → orbital period",accent:"oklch(0.55 0.16 30)",icon:(0,t.jsx)(y.Globe,{className:"h-4 w-4"}),thumb:(0,t.jsx)(function(){return(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("ellipse",{cx:"50",cy:"65",rx:"32",ry:"20",fill:"none",stroke:"oklch(0.65 0.16 30 / 0.5)",strokeWidth:"0.5",strokeDasharray:"2 1"}),(0,t.jsx)("circle",{cx:"50",cy:"65",r:"8",fill:"oklch(0.85 0.20 60)"}),(0,t.jsx)(i.motion.circle,{cx:"80",cy:"65",r:"3",fill:"oklch(0.85 0.18 200)",animate:{cx:[80,50,20,50,80],cy:[65,50,65,80,65]},transition:{duration:4,repeat:1/0,ease:"linear"}}),(0,t.jsx)("text",{x:"50",y:"115",textAnchor:"middle",fontSize:"6",fill:"oklch(0.65 0.10 250)",children:"T² ∝ a³"}),(0,t.jsx)("text",{x:"50",y:"125",textAnchor:"middle",fontSize:"6",fill:"oklch(0.55 0.10 250)",children:"Kepler 3rd law"})]})},{}),content:(0,t.jsx)(j.DraggableOrbit,{})},{id:"transit",step:"2",title:"Exoplanet transit depth",subtitle:"ΔF/F = (Rp/Rs)² — JWST vs Kepler",accent:"oklch(0.55 0.16 200)",icon:(0,t.jsx)(m.Atom,{className:"h-4 w-4"}),thumb:(0,t.jsx)(function(){return(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("circle",{cx:"50",cy:"55",r:"22",fill:"oklch(0.85 0.20 60)",stroke:"oklch(0.65 0.20 30)",strokeWidth:"0.5"}),(0,t.jsx)(i.motion.circle,{cx:"50",cy:"55",r:"3",fill:"oklch(0.40 0.05 200)",animate:{cx:[30,50,70,50,30]},transition:{duration:5,repeat:1/0,ease:"linear"}}),(0,t.jsx)("line",{x1:"10",y1:"115",x2:"90",y2:"115",stroke:"oklch(0.55 0.10 250)",strokeWidth:"0.5"}),(0,t.jsx)(i.motion.path,{d:"M 10 115 L 30 115 L 35 110 L 45 105 L 50 108 L 55 105 L 65 110 L 70 115 L 90 115",fill:"none",stroke:"oklch(0.75 0.20 200)",strokeWidth:"1"}),(0,t.jsx)("text",{x:"50",y:"135",textAnchor:"middle",fontSize:"6",fill:"oklch(0.65 0.10 250)",children:"ΔF/F = (Rp/Rs)²"})]})},{}),content:(0,t.jsx)(j.TransitDepthCalculator,{})},{id:"gw",step:"3",title:"Gravitational wave strain",subtitle:"LIGO O4 + TianQin — m1, m2, D, f",accent:"oklch(0.55 0.16 165)",icon:(0,t.jsx)(g.Radio,{className:"h-4 w-4"}),thumb:(0,t.jsx)(function(){return(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("line",{x1:"10",y1:"70",x2:"90",y2:"70",stroke:"oklch(0.55 0.10 250 / 0.3)",strokeWidth:"0.5"}),(0,t.jsx)(i.motion.path,{d:"M 10 70 Q 20 50 30 70 T 50 70 T 70 70 T 90 70",fill:"none",stroke:"oklch(0.75 0.20 165)",strokeWidth:"1.5",animate:{d:["M 10 70 Q 20 50 30 70 T 50 70 T 70 70 T 90 70","M 10 70 Q 20 90 30 70 T 50 70 T 70 70 T 90 70","M 10 70 Q 20 50 30 70 T 50 70 T 70 70 T 90 70"]},transition:{duration:.5,repeat:1/0}}),(0,t.jsx)("text",{x:"50",y:"25",textAnchor:"middle",fontSize:"6",fill:"oklch(0.75 0.20 165)",fontWeight:"bold",children:"h ~ 10⁻²¹"}),(0,t.jsx)("text",{x:"50",y:"105",textAnchor:"middle",fontSize:"6",fill:"oklch(0.65 0.10 250)",children:"LIGO + TianQin"}),(0,t.jsx)("text",{x:"50",y:"115",textAnchor:"middle",fontSize:"6",fill:"oklch(0.55 0.10 250)",children:"GW detector"})]})},{}),content:(0,t.jsx)(j.GravitationalWaveStrain,{})},{id:"jet",step:"4",title:"LHC jet substructure (n-subjettiness)",subtitle:"τ21 tags W, τ32 tags top — 13.6 TeV",accent:"oklch(0.55 0.16 250)",icon:(0,t.jsx)(p.Cpu,{className:"h-4 w-4"}),thumb:(0,t.jsx)(function(){return(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("line",{x1:"10",y1:"70",x2:"90",y2:"70",stroke:"oklch(0.55 0.10 250 / 0.3)",strokeWidth:"0.5"}),(0,t.jsx)("line",{x1:"50",y1:"20",x2:"50",y2:"120",stroke:"oklch(0.55 0.10 250 / 0.3)",strokeWidth:"0.5"}),(0,t.jsx)("circle",{cx:"55",cy:"65",r:"6",fill:"oklch(0.75 0.20 30 / 0.5)",stroke:"oklch(0.75 0.20 30)",strokeWidth:"0.5"}),(0,t.jsx)("circle",{cx:"40",cy:"80",r:"4",fill:"oklch(0.75 0.20 165 / 0.5)",stroke:"oklch(0.75 0.20 165)",strokeWidth:"0.5"}),(0,t.jsx)("circle",{cx:"65",cy:"85",r:"3",fill:"oklch(0.75 0.20 250 / 0.5)",stroke:"oklch(0.75 0.20 250)",strokeWidth:"0.5"}),(0,t.jsx)("text",{x:"50",y:"125",textAnchor:"middle",fontSize:"6",fill:"oklch(0.65 0.10 250)",children:"τ_N n-subjettiness"}),(0,t.jsx)("text",{x:"50",y:"135",textAnchor:"middle",fontSize:"6",fill:"oklch(0.55 0.10 250)",children:"LHC Run 3"})]})},{}),content:(0,t.jsx)(j.JetSubstructure,{})},{id:"jwst",step:"5",title:"JWST vs Hubble resolution",subtitle:"6.5× collecting area, IR vs optical",accent:"oklch(0.55 0.16 60)",icon:(0,t.jsx)(u.Telescope,{className:"h-4 w-4"}),thumb:(0,t.jsx)(function(){return(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("radialGradient",{id:"jwst-thumb-grad",cx:"40%",cy:"35%",r:"65%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.95 0.20 60)"}),(0,t.jsx)("stop",{offset:"50%",stopColor:"oklch(0.65 0.20 30 / 0.7)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.40 0.20 250 / 0.0)"})]})}),(0,t.jsx)(i.motion.circle,{cx:"50",cy:"65",r:"25",fill:"url(#jwst-thumb-grad)",animate:{r:[25,18,25]},transition:{duration:3,repeat:1/0}}),[0,1,2,3,4,5].map(e=>{let r=e/6*2*Math.PI;return(0,t.jsx)(i.motion.polygon,{points:"50,65 53,60 58,65 53,70 50,65",fill:"none",stroke:"oklch(0.65 0.20 30 / 0.6)",strokeWidth:"0.5",animate:{opacity:[.4,1,.4]},transition:{duration:3,repeat:1/0,delay:.2*e},transform:`rotate(${180*r/Math.PI} 50 65) translate(0 -15)`},e)}),(0,t.jsx)("text",{x:"50",y:"115",textAnchor:"middle",fontSize:"6",fill:"oklch(0.65 0.10 250)",children:"JWST 6.5m mirror"}),(0,t.jsx)("text",{x:"50",y:"125",textAnchor:"middle",fontSize:"6",fill:"oklch(0.55 0.10 250)",children:"z > 14 galaxies"})]})},{}),content:(0,t.jsx)(j.JWSTvsHubble,{})},{id:"beidou",step:"6",title:"Beidou GNSS constellation",subtitle:"China's GPS — 3 GEO + 3 IGSO + 24 MEO",accent:"oklch(0.55 0.16 165)",icon:(0,t.jsx)(y.Globe,{className:"h-4 w-4"}),thumb:(0,t.jsx)(function(){return(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("circle",{cx:"50",cy:"65",r:"12",fill:"oklch(0.65 0.16 250)"}),(0,t.jsx)("ellipse",{cx:"50",cy:"65",rx:"22",ry:"22",fill:"none",stroke:"oklch(0.55 0.10 250 / 0.3)",strokeWidth:"0.5",strokeDasharray:"2 1"}),(0,t.jsx)("ellipse",{cx:"50",cy:"65",rx:"30",ry:"30",fill:"none",stroke:"oklch(0.55 0.10 250 / 0.3)",strokeWidth:"0.5",strokeDasharray:"2 1"}),Array.from({length:8}).map((e,r)=>{let s=r/8*2*Math.PI;return(0,t.jsx)(i.motion.circle,{cx:50+25*Math.cos(s),cy:65+25*Math.sin(s),r:"2",fill:"oklch(0.75 0.20 30)",animate:{angle:[s,s+Math.PI/4,s]},transition:{duration:8,repeat:1/0},style:{transformOrigin:"50px 65px"}},r)}),(0,t.jsx)("text",{x:"50",y:"115",textAnchor:"middle",fontSize:"6",fill:"oklch(0.65 0.10 250)",children:"30 sats"}),(0,t.jsx)("text",{x:"50",y:"125",textAnchor:"middle",fontSize:"6",fill:"oklch(0.55 0.10 250)",children:"BDS-3 (2020+)"})]})},{}),content:(0,t.jsx)(j.BeidouConstellation,{})},{id:"change",step:"7",title:"Chang'e lunar trajectory",subtitle:"CE-5 (2020), CE-6 (2024 far-side), Tianwen-1 (Mars)",accent:"oklch(0.55 0.16 0)",icon:(0,t.jsx)(b.Moon,{className:"h-4 w-4"}),thumb:(0,t.jsx)(function(){return(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("circle",{cx:"20",cy:"65",r:"8",fill:"oklch(0.65 0.16 250)"}),(0,t.jsx)("circle",{cx:"80",cy:"65",r:"6",fill:"oklch(0.50 0.05 250)"}),(0,t.jsx)(i.motion.path,{d:"M 20 65 Q 50 35 80 65",fill:"none",stroke:"oklch(0.65 0.16 30 / 0.5)",strokeWidth:"0.8",strokeDasharray:"2 1",animate:{opacity:[.4,1,.4]},transition:{duration:2,repeat:1/0}}),(0,t.jsx)(i.motion.circle,{cx:"50",cy:"35",r:"2",fill:"oklch(0.85 0.20 30)",animate:{cx:[20,50,80,50,20],cy:[65,35,65,95,65]},transition:{duration:5,repeat:1/0,ease:"linear"}}),(0,t.jsx)("text",{x:"20",y:"90",textAnchor:"middle",fontSize:"6",fill:"oklch(0.65 0.10 250)",children:"🌍"}),(0,t.jsx)("text",{x:"80",y:"80",textAnchor:"middle",fontSize:"6",fill:"oklch(0.65 0.10 250)",children:"🌑"}),(0,t.jsx)("text",{x:"50",y:"115",textAnchor:"middle",fontSize:"6",fill:"oklch(0.85 0.20 30)",fontWeight:"bold",children:"Chang'e 6"}),(0,t.jsx)("text",{x:"50",y:"125",textAnchor:"middle",fontSize:"6",fill:"oklch(0.55 0.10 250)",children:"far-side (2024)"})]})},{}),content:(0,t.jsx)(j.ChangeLunarTrajectory,{})},{id:"darkmatter",step:"8",title:"Dark matter rotation curve",subtitle:"NGC 3198 — flat curve, 85% invisible mass",accent:"oklch(0.55 0.16 320)",icon:(0,t.jsx)(x.Activity,{className:"h-4 w-4"}),thumb:(0,t.jsx)(function(){return(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("line",{x1:"10",y1:"115",x2:"90",y2:"115",stroke:"oklch(0.55 0.10 250)",strokeWidth:"0.5"}),(0,t.jsx)("line",{x1:"10",y1:"25",x2:"10",y2:"115",stroke:"oklch(0.55 0.10 250)",strokeWidth:"0.5"}),(0,t.jsx)(i.motion.path,{d:"M 10 30 Q 30 80 50 90 T 90 95",fill:"none",stroke:"oklch(0.75 0.20 165)",strokeWidth:"1.5"}),(0,t.jsx)(i.motion.path,{d:"M 10 30 Q 20 80 30 110 T 50 115",fill:"none",stroke:"oklch(0.65 0.16 30 / 0.6)",strokeWidth:"0.8",strokeDasharray:"2 1"}),[20,40,60,80].map((e,r)=>(0,t.jsx)("circle",{cx:e,cy:90-2*r,r:"1.5",fill:"oklch(0.85 0.18 25)"},r)),(0,t.jsx)("text",{x:"50",y:"135",textAnchor:"middle",fontSize:"6",fill:"oklch(0.65 0.10 250)",children:"NGC 3198 rotation"})]})},{}),content:(0,t.jsx)(j.DarkMatterRotationCurve,{})}];function v(){let[e,s]=(0,r.useState)(null),a=e?k.find(t=>t.id===e):null;return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5 flex-wrap",children:[(0,t.jsx)(f.Zap,{className:"h-3 w-3 text-amber-500"}),"Click any card to open an interactive visual in a lazy popup — drag orbits, slide exoplanet radii, watch GW waveforms, toggle Beidou vs GPS, fly Chang'e 6 to the far-side Moon, find dark matter in galaxy rotation curves…",(0,t.jsx)("span",{className:"text-[10px]",children:"Modal content only mounts on click."})]}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:k.map(e=>(0,t.jsxs)(i.motion.button,{type:"button",onClick:()=>s(e.id),className:"relative rounded-xl overflow-hidden border border-border/60 hover:border-primary/60 hover:shadow-lg transition-all bg-gradient-to-br from-card to-muted/30 group",whileHover:{y:-4},whileTap:{scale:.98},"aria-label":`Open interactive: ${e.title}`,children:[(0,t.jsxs)("div",{className:"relative w-full bg-gradient-to-br from-muted/40 to-card",style:{aspectRatio:"9 / 14",maxHeight:280},children:[(0,t.jsx)("div",{className:"absolute inset-0 p-2",children:e.thumb}),(0,t.jsx)("div",{className:"absolute top-2 left-2 z-10",children:(0,t.jsxs)(h.Badge,{variant:"secondary",className:"text-[10px] h-5 px-1.5 gap-0.5",style:{backgroundColor:e.accent+"20",color:e.accent},children:[e.icon," SPACE ",e.step]})}),(0,t.jsx)("div",{className:"absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center",children:(0,t.jsx)(i.motion.div,{initial:{opacity:0,scale:.8},whileHover:{opacity:1,scale:1},className:"opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur rounded-full p-2.5 border border-border shadow-md",children:(0,t.jsx)(m.Atom,{className:"h-4 w-4 text-primary"})})})]}),(0,t.jsxs)("div",{className:"p-2.5 border-t border-border/40 bg-background/80",children:[(0,t.jsx)("p",{className:"text-xs font-semibold leading-tight",style:{color:e.accent},children:e.title}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-0.5 font-mono",children:e.subtitle})]})]},e.id))}),(0,t.jsx)(j.LazyModal,{open:!!a,onClose:()=>s(null),title:a?.title??"",subtitle:a?.subtitle,accent:a?.accent??"oklch(0.55 0.16 250)",icon:a?.icon??(0,t.jsx)(m.Atom,{className:"h-4 w-4"}),children:a?.content})]})}var _=e.i(88653),N=e.i(37727),w=e.i(283086),T=e.i(810980);let S=`import math

H0 = 67.4
Omega_m = 0.315
Omega_Lambda = 0.685
c_kms = 299792.458
D_H = c_kms / H0

def comoving_distance(z):
    N = 100
    dz = z / N
    d = 0
    for i in range(N):
        zi = i * dz
        zf = (i + 1) * dz
        Ei = 1.0 / math.sqrt(Omega_m * (1 + zi)**3 + Omega_Lambda)
        Ef = 1.0 / math.sqrt(Omega_m * (1 + zf)**3 + Omega_Lambda)
        d += 0.5 * (Ei + Ef) * dz
    return D_H * d

def lookback_time(z):
    t_H = 1.0 / H0 * 9.778
    N = 100
    dz = z / N
    t = 0
    for i in range(N):
        zi = i * dz
        zf = (i + 1) * dz
        Ei = 1.0 / ((1 + zi) * math.sqrt(Omega_m * (1 + zi)**3 + Omega_Lambda))
        Ef = 1.0 / ((1 + zf) * math.sqrt(Omega_m * (1 + zf)**3 + Omega_Lambda))
        t += 0.5 * (Ei + Ef) * dz
    return t_H * t

print("=== JWST deep field - lookback time + redshift ===")
print(f"Cosmology: H0={H0}, Omega_m={Omega_m}, Omega_Lambda={Omega_Lambda}")
print(f"Hubble time t_H = {1/H0 * 9.778:.2f} Gyr")
print()
print(f"{'z':>6} {'D_comoving (Mpc)':>18} {'Lookback (Gyr)':>16} {'Age of Universe (Gyr)':>22}")
print(f"{'-'*6:>6} {'-'*18:>18} {'-'*16:>16} {'-'*22:>22}")
for z in [0.5, 1.0, 2.0, 5.0, 7.0, 10.0, 14.0, 20.0]:
    D = comoving_distance(z)
    t_lb = lookback_time(z)
    t_age = 13.8 - t_lb
    print(f"{z:>6.1f} {D:>18.1f} {t_lb:>16.2f} {t_age:>22.2f}")

print()
print("=== JADES-GS-z14-0 (Naidu et al. 2023, JWST NIRCam) ===")
z = 14.32
print(f"z = {z} -> lookback time {lookback_time(z):.2f} Gyr")
print(f"  -> observed ~300 Myr after Big Bang")
print(f"  -> galaxy mass ~5e8 M_sun (impossibly massive for early Universe)")
print(f"  -> challenges Lambda-CDM structure formation predictions")
print()
print("=== JWST vs Hubble deep field ===")
print(f"Hubble XDF (2012): z ~ 8-10, ~5500 galaxies, lookback ~13.2 Gyr")
print(f"JWST JADES (2023): z ~ 11-15, ~100,000 galaxies, lookback ~13.5 Gyr")
print(f"JWST sees 100x deeper in IR (2 um) than Hubble in optical (0.5 um)")`,M=`import math

G = 6.674e-11
c = 2.998e8
M_sun = 1.989e30
Mpc = 3.086e22

def chirp_mass(m1, m2):
    return (m1 * m2)**0.6 / (m1 + m2)**0.2

def gw_strain(m1_msun, m2_msun, freq_hz, distance_mpc):
    Mc = chirp_mass(m1_msun, m2_msun)
    h0 = 1e-21
    h = h0 * (Mc / 30)**(5/3) * (freq_hz / 100)**(2/3) * (500 / distance_mpc)
    return h, Mc

print("=== GW150914 (LIGO first detection, 2015) ===")
m1, m2, f, D = 36, 29, 100, 410
h, Mc = gw_strain(m1, m2, f, D)
print(f"  m1 = {m1} Msun, m2 = {m2} Msun")
print(f"  Chirp mass Mc = {Mc:.1f} Msun")
print(f"  Frequency f = {f} Hz (peak)")
print(f"  Distance D = {D} Mpc")
print(f"  Strain h = {h:.2e}")
print(f"  -> LIGO measured length change ~1e-18 m in 4 km arm")
print(f"  -> about 1/10000 of a proton width!")

print()
print("=== Notable GW events (LIGO O1-O3, 2015-2020) ===")
events = [
    ("GW150914", 36, 29, 410, 100, "First detection (2015)"),
    ("GW170817", 1.46, 1.27, 40, 100, "Neutron star merger (2017)"),
    ("GW190521", 85, 66, 5300, 100, "IMBH formation (2019)"),
    ("GW190412", 30, 8, 2800, 100, "Asymmetric mass"),
    ("GW190814", 23, 2.6, 2400, 100, "2.6 Msun object - NS or BH?"),
]
print(f"  {'Event':<12} {'m1':>5} {'m2':>5} {'D(Mpc)':>8} {'f(Hz)':>6} {'h_strain':>12}  Notes")
for name, m1, m2, D, f, note in events:
    h, Mc = gw_strain(m1, m2, f, D)
    print(f"  {name:<12} {m1:>5} {m2:>5} {D:>8} {f:>6} {h:>12.2e}  {note}")

print()
print("=== LIGO O4 (May 2023 - present) ===")
print(f"  Sensitivity ~3x O3, ~70 new BBH candidates (late 2024)")
print(f"  Range: ~550 Mpc for BNS, ~2.5 Gpc for BBH")

print()
print("=== TianQin (China, 2030+) + LISA (ESA/NASA, 2035+) ===")
print(f"  Space-based, mHz band (not LIGO Hz band)")
print(f"  Detects supermassive BH mergers (10^6-10^9 Msun)")
print(f"  TianQin: 3 sats in geocentric orbit, 170,000 km separation")
print(f"  LISA: 3 sats in heliocentric orbit, 2.5 million km separation")
print(f"  Both will see ~10,000 sources over mission lifetime")`,A=`import math

rho_dm = 0.3
v_earth = 220
m_chi = 50
m_xenon = 131

def expected_events(sigma_SI_cm2, exposure_ton_year):
    N_A = 6.022e23
    n_xenon_per_kg = N_A / (m_xenon * 1.66e-27)
    n_xenon_per_ton = n_xenon_per_kg * 1000
    v_cm = v_earth * 1e5
    rho_cgs = rho_dm * 1e-3 * (1.783e-24)
    flux = rho_cgs / (m_chi * 1.783e-24) * v_cm
    rate_per_kg = flux * sigma_SI_cm2 * n_xenon_per_kg
    events = rate_per_kg * exposure_ton_year * 1000 * 3.15e7
    return events

print("=== Dark matter experiments status (2024-2025) ===")
experiments = [
    ("LZ (US)", 5.5, 5.5e-48, "2024 result, 60 live-days"),
    ("XENONnT (Italy)", 8.6, 6.0e-48, "2024 result"),
    ("PandaX-4T (China)", 4.0, 5.0e-48, "2024 result, Jinping lab"),
    ("DarkSide-50 (Italy)", 0.05, 1.0e-40, "Argon TPC, smaller"),
    ("DEAP-3600 (Canada)", 0.36, 1.0e-46, "Argon"),
]
print(f"  {'Experiment':<22} {'Exposure':>10} {'Best sigma_SI (cm^2)':>22}  Status")
for name, exp, sigma, note in experiments:
    events = expected_events(sigma, exp)
    print(f"  {name:<22} {exp:>6.2f} t*yr {sigma:>22.2e}  {note}  ({events:.4f} expected)")

print()
print("=== WIMP-nucleon cross section upper limits (90% CL) ===")
print(f"  2007: ~1e-7 cm^2 (XENON10)")
print(f"  2018: ~1e-47 cm^2 (XENON1T)")
print(f"  2024: ~5e-48 cm^2 (LZ, XENONnT, PandaX-4T) - 100x improvement in 17 years")
print(f"  -> No WIMPs found yet")
print(f"  -> Next: XLZD (xenon) + DARWIN (multi-target), 50 t*yr exposure")

print()
print("=== Dark matter alternatives (in contention) ===")
print(f"  1. Axion (pseudoscalar, QCD CP problem)")
print(f"  2. Hidden sector / dark photons")
print(f"  3. Primordial black holes (Hawking evaporation search)")
print(f"  4. Modified gravity (MOND - no DM needed for rotation curves)")
print(f"  5. Emergent gravity (Verlinde 2016 - DM is thermodynamic effect)")`,C=`import math

D_fast = 500
D_arecibo = 305
A_fast = math.pi * (D_fast / 2)**2
A_arecibo = math.pi * (D_arecibo / 2)**2

print("=== FAST vs Arecibo (decommissioned Dec 2020) ===")
print(f"  FAST aperture: {D_fast} m diameter, area = {A_fast:.0f} m^2")
print(f"  Arecibo aperture: {D_arecibo} m diameter, area = {A_arecibo:.0f} m^2")
print(f"  FAST collecting area: {A_fast / A_arecibo:.2f}x Arecibo")
print(f"  FAST sky coverage: -14 deg to +66 deg declination")
print(f"  FAST first light: 2016, full operation: 2020+")
print(f"  Located in Guizhou, China (Pingtang County)")

print()
print("=== FRB (Fast Radio Burst) basic properties ===")
print(f"  FRB duration: ~1 ms to ~30 ms")
print(f"  Energy released: ~10^38 - 10^41 erg (in radio band)")
print(f"  Distance: typically z > 0.1, host galaxies confirmed for ~20 FRBs")
print()
print("=== Dispersion measure (DM) and redshift ===")
print(f"  DM ~ 1000 pc/cm^3 -> z ~ 1")
print(f"  DM ~ 1200 pc/cm^3 -> z ~ 1.5")
print(f"  DM ~ 3000 pc/cm^3 -> z ~ 3 (highest known)")

def dm_delay_ms(dm, f1_ghz, f2_ghz):
    return 4.15e3 * dm * (1 / f1_ghz**2 - 1 / f2_ghz**2)

print()
print("=== FRB DM-induced delay (ms) for 1.0 GHz vs 1.5 GHz ===")
for dm in [100, 500, 1000, 1500, 3000]:
    delay = dm_delay_ms(dm, 1.0, 1.5)
    print(f"  DM = {dm:>5} pc/cm^3 -> delay = {delay:.1f} ms")

print()
print("=== FAST FRB discoveries (2024 update) ===")
print(f"  FAST detected 1000+ FRBs (2024), 5x all other telescopes combined")
print(f"  Repeaters: ~20 confirmed out of ~1000 sources (2%)")
print(f"  FRB 20190520B: persistent radio counterpart discovered (FAST 2022)")
print(f"  FRB 20201124A: complicated polarization angle swings (FAST 2022)")
print(f"  FRB 20240106: fastest repeating FRB, 1.5 ms (FAST 2024)")
print()
print("=== FRB origin theories (contention) ===")
print(f"  1. Magnetar flares (SGR 1935+2154 in 2020 confirmed link)")
print(f"  2. Merging neutron stars / black holes")
print(f"  3. Cosmic strings / primordial black holes")
print(f"  4. Exotic: warp drives, alien signals (mostly ruled out)")
print(f"  Best model: magnetar + B-field reconfiguration (Bochenek+2020)")`;function z({accent:e}){let[s,a]=(0,r.useState)(0);return(0,r.useEffect)(()=>{let e=setInterval(()=>a(e=>(e+.02)%(2*Math.PI)),50);return()=>clearInterval(e)},[]),(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("radialGradient",{id:"jwst-grad",cx:"50%",cy:"50%",r:"50%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:e,stopOpacity:"0.8"}),(0,t.jsx)("stop",{offset:"100%",stopColor:e,stopOpacity:"0"})]})}),(0,t.jsx)("rect",{width:"100",height:"140",fill:"oklch(0.10 0.05 250)"}),Array.from({length:12}).map((r,a)=>{let n=.3+.5*Math.abs(Math.sin(s+a));return(0,t.jsx)(i.motion.circle,{cx:37*a%90+5,cy:53*a%130+5,r:1+a%3,fill:e,opacity:n,animate:{opacity:[.5*n,n,.5*n]},transition:{duration:2,repeat:1/0,delay:.1*a}},a)}),(0,t.jsx)("circle",{cx:"50",cy:"70",r:"6",fill:"url(#jwst-grad)"}),(0,t.jsx)("text",{x:"50",y:"130",textAnchor:"middle",fontSize:"6",fill:e,fontWeight:"bold",children:"JWST deep field"})]})}function G({accent:e}){let[s,a]=(0,r.useState)(0);return(0,r.useEffect)(()=>{let e=setInterval(()=>a(e=>(e+.08)%(2*Math.PI)),50);return()=>clearInterval(e)},[]),(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("line",{x1:"10",y1:"70",x2:"90",y2:"70",stroke:"oklch(0.55 0.10 250 / 0.3)",strokeWidth:"0.5"}),(0,t.jsx)(i.motion.path,{d:`M 10 70 Q 20 ${70-15*Math.sin(s)} 30 70 T 50 70 T 70 70 T 90 70`,fill:"none",stroke:e,strokeWidth:"1.5",animate:{d:`M 10 70 Q 20 ${70-15*Math.sin(s)} 30 70 T 50 70 T 70 70 T 90 70`},transition:{duration:.05}}),(0,t.jsx)("text",{x:"50",y:"25",textAnchor:"middle",fontSize:"6",fill:e,fontWeight:"bold",children:"h ~ 10⁻²¹"}),(0,t.jsx)("text",{x:"50",y:"120",textAnchor:"middle",fontSize:"6",fill:"oklch(0.55 0.10 250)",children:"LIGO + TianQin"})]})}function B({accent:e}){return(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("line",{x1:"10",y1:"115",x2:"90",y2:"115",stroke:"oklch(0.55 0.10 250)",strokeWidth:"0.5"}),(0,t.jsx)("line",{x1:"10",y1:"25",x2:"10",y2:"115",stroke:"oklch(0.55 0.10 250)",strokeWidth:"0.5"}),(0,t.jsx)(i.motion.path,{d:"M 10 30 Q 25 75 50 90 T 90 100",fill:"none",stroke:e,strokeWidth:"1.5",animate:{opacity:[.6,1,.6]},transition:{duration:2,repeat:1/0}}),[20,35,50,65,80].map((e,r)=>(0,t.jsx)("circle",{cx:e,cy:90-3*r,r:"1.5",fill:"oklch(0.85 0.18 25)"},r)),(0,t.jsx)("text",{x:"50",y:"135",textAnchor:"middle",fontSize:"6",fill:e,fontWeight:"bold",children:"NGC 3198 rotation"})]})}function L({accent:e}){let[s,a]=(0,r.useState)(0);return(0,r.useEffect)(()=>{let e=setInterval(()=>a(e=>(e+.04)%(2*Math.PI)),50);return()=>clearInterval(e)},[]),(0,t.jsxs)("svg",{viewBox:"0 0 100 140",className:"w-full h-full",children:[(0,t.jsx)("ellipse",{cx:"50",cy:"80",rx:"35",ry:"20",fill:e,opacity:"0.3",stroke:e,strokeWidth:"1"}),[0,1,2,3].map(r=>(0,t.jsx)(i.motion.circle,{cx:"50",cy:"80",r:20+8*r,fill:"none",stroke:e,strokeWidth:"0.5",animate:{r:[20+8*r,28+8*r,20+8*r],opacity:[.5,.1,.5]},transition:{duration:1.5,repeat:1/0,delay:.2*r}},r)),(0,t.jsx)("text",{x:"50",y:"20",textAnchor:"middle",fontSize:"7",fill:e,fontWeight:"bold",children:"500m dish"}),(0,t.jsx)("text",{x:"50",y:"130",textAnchor:"middle",fontSize:"6",fill:"oklch(0.55 0.10 250)",children:"FAST (China)"})]})}let R=[{id:"jwst",step:"1",hookTitle:"Earliest light — 300 Myr after the Big Bang",subtitle:"z > 14 — JWST NIRCam deep field 2023",accent:"oklch(0.55 0.16 60)",thumbnail:(0,t.jsx)(z,{accent:"oklch(0.55 0.16 60)"}),detail:(0,t.jsx)(function(){return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)("div",{className:"w-48 h-64",children:(0,t.jsx)(z,{accent:"oklch(0.55 0.16 60)"})})}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground text-center mt-2",children:"JWST's NIRCam captures infrared light from galaxies that formed 300 million years after the Big Bang — the earliest light ever detected. The deep field is the “ultra-deep” survey (100+ hours of exposure)."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"z = (λ_obs - λ_emit) / λ_emit"}),(0,t.jsx)("p",{className:"font-mono text-xs mt-1",children:"v = H₀ · d  (Hubble's law for nearby galaxies)"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Redshift z encodes both distance and lookback time. JWST sees z>14 — light from when Universe was 2% of current age."})]}),(0,t.jsx)(d.PyodideRunner,{buttonLabel:"Run JWST lookback time + redshift (Pyodide)",code:S}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-3",children:[(0,t.jsxs)("p",{className:"text-[11px] text-amber-700 dark:text-amber-300 flex items-center gap-1.5 mb-1.5",children:[(0,t.jsx)(T.BookOpen,{className:"h-3 w-3"})," Recent research (2023-2024)"]}),(0,t.jsxs)("p",{className:"text-xs text-foreground/80 leading-relaxed",children:[(0,t.jsx)("strong",{children:"Naidu et al. (2023), “JWST NIRCam detection of JADES-GS-z14-0”"})," (Nature). This galaxy at z=14.32 was observed ~300 Myr after the Big Bang with stellar mass ~5×10⁸ M☉ — “impossibly massive” for ΛCDM structure formation predictions. JWST's JADES survey (Joint Array of Deep Extragalactic Surveys) has found ~100 galaxies at z>10 in 2023-2024, challenging the standard cosmological model. Hubble tension (Planck H₀=67.4 vs SH0ES H₀=73.04) intensifies — is ΛCDM wrong, or are our measurements?"]})]})]})},{})},{id:"gw",step:"2",hookTitle:"Spacetime ripples — 1/10,000 of a proton",subtitle:"h ~ 10⁻²¹ — LIGO O4 + TianQin + LISA",accent:"oklch(0.55 0.16 165)",thumbnail:(0,t.jsx)(G,{accent:"oklch(0.55 0.16 165)"}),detail:(0,t.jsx)(function(){return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)("div",{className:"w-48 h-64",children:(0,t.jsx)(G,{accent:"oklch(0.55 0.16 165)"})})}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground text-center mt-2",children:"LIGO measures spacetime strain h ~ 10⁻²¹ — length changes of 1/10,000 proton width across 4 km arms. The waveform encodes the binary's masses, spins, and merger physics."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"h = (4G/c⁴)·(d²I/dt²)/r"}),(0,t.jsx)("p",{className:"font-mono text-xs mt-1",children:"M_chirp = (m₁m₂)^(3/5) / (m₁+m₂)^(1/5)"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Strain scales as M_chirp^(5/3) × f^(2/3) / D. LIGO O4 range: 2.5 Gpc for BBH."})]}),(0,t.jsx)(d.PyodideRunner,{buttonLabel:"Run GW strain + binary catalogue (Pyodide)",code:M}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-3",children:[(0,t.jsxs)("p",{className:"text-[11px] text-amber-700 dark:text-amber-300 flex items-center gap-1.5 mb-1.5",children:[(0,t.jsx)(T.BookOpen,{className:"h-3 w-3"})," Recent research (2024)"]}),(0,t.jsxs)("p",{className:"text-xs text-foreground/80 leading-relaxed",children:[(0,t.jsx)("strong",{children:"LIGO O4 (May 2023+):"})," ~3× sensitivity vs O3, ~70 new BBH candidates by late 2024. Range: 550 Mpc for BNS, 2.5 Gpc for BBH. ",(0,t.jsx)("strong",{children:"China's TianQin (2030+)"}),": 3 satellites in geocentric orbit at 170,000 km separation — detects mHz GWs from supermassive BH mergers.",(0,t.jsx)("strong",{children:"LISA (ESA/NASA, 2035+):"})," 3 satellites in heliocentric orbit, 2.5M km separation — same mHz band, complementary to TianQin. Together LIGO + TianQin + LISA cover 6 decades of GW frequency."]})]})]})},{})},{id:"dm",step:"3",hookTitle:"85% invisible — where is the dark matter?",subtitle:"LZ/XENONnT/PandaX null 2024 — ΛCDM vs MOND",accent:"oklch(0.55 0.16 320)",thumbnail:(0,t.jsx)(B,{accent:"oklch(0.55 0.16 320)"}),detail:(0,t.jsx)(function(){return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)("div",{className:"w-48 h-64",children:(0,t.jsx)(B,{accent:"oklch(0.55 0.16 320)"})})}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground text-center mt-2",children:"The flat rotation curve of NGC 3198 (and thousands of other galaxies) is the strongest empirical evidence for dark matter. Visible matter alone predicts Keplerian fall-off (1/√r); observations stay flat."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"v_visible(r) = √(GM_visible/r)"}),(0,t.jsx)("p",{className:"font-mono text-xs mt-1",children:"v_halo(r) → const at large r"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Total: v_rot² = v_visible² + v_halo². Flat observed → ~85% of galaxy mass is dark."})]}),(0,t.jsx)(d.PyodideRunner,{buttonLabel:"Run DM direct detection + alternatives (Pyodide)",code:A}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-3",children:[(0,t.jsxs)("p",{className:"text-[11px] text-amber-700 dark:text-amber-300 flex items-center gap-1.5 mb-1.5",children:[(0,t.jsx)(T.BookOpen,{className:"h-3 w-3"})," Recent research (2024)"]}),(0,t.jsxs)("p",{className:"text-xs text-foreground/80 leading-relaxed",children:[(0,t.jsx)("strong",{children:"LZ (US, 2024):"})," 5.5t xenon TPC, 60 live-days, no WIMPs found. Best upper limit: σ_SI ~5×10⁻⁴⁸ cm².",(0,t.jsx)("strong",{children:"XENONnT (Italy, 2024):"})," 8.6t xenon, similar null result.",(0,t.jsx)("strong",{children:"PandaX-4T (China, 2024):"})," 4t xenon at Jinping Underground Laboratory, competitive null. 100× improvement in 17 years, but no WIMPs yet. Alternatives in contention: ",(0,t.jsx)("strong",{children:"axions"})," (ADMX-HF 2024),",(0,t.jsx)("strong",{children:"MOND"})," (Milgrom — modifies gravity at low acceleration), ",(0,t.jsx)("strong",{children:"emergent gravity"})," (Verlinde 2016)."]})]})]})},{})},{id:"fast",step:"4",hookTitle:"1000+ cosmic flashes — China&apos;s FAST dish",subtitle:"FRB discoveries 2020-2024 — magnetar origin",accent:"oklch(0.55 0.16 250)",thumbnail:(0,t.jsx)(L,{accent:"oklch(0.55 0.16 250)"}),detail:(0,t.jsx)(function(){return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)("div",{className:"w-48 h-64",children:(0,t.jsx)(L,{accent:"oklch(0.55 0.16 250)"})})}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground text-center mt-2",children:"FAST (Five-hundred-meter Aperture Spherical radio Telescope) in Guizhou, China — 2.7× Arecibo's collecting area. Discovered 1000+ FRBs since 2020, more than all other telescopes combined."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"t_delay = 4.15×10³ ms · DM · (f₁⁻² - f₂⁻²)"}),(0,t.jsx)("p",{className:"font-mono text-xs mt-1",children:"DM = ∫ n_e dl (pc/cm³) — electron column density"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"FRB at z=1 has DM~1000 pc/cm³, delay ~6200 ms between 1.0 and 1.5 GHz."})]}),(0,t.jsx)(d.PyodideRunner,{buttonLabel:"Run FAST FRB analysis (Pyodide)",code:C}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-3",children:[(0,t.jsxs)("p",{className:"text-[11px] text-amber-700 dark:text-amber-300 flex items-center gap-1.5 mb-1.5",children:[(0,t.jsx)(T.BookOpen,{className:"h-3 w-3"})," Recent research (2024)"]}),(0,t.jsxs)("p",{className:"text-xs text-foreground/80 leading-relaxed",children:[(0,t.jsx)("strong",{children:"FAST (China, 2024 update):"})," 1000+ FRBs detected, 5× all other telescopes combined. FRB 20240106 (FAST, 2024): fastest repeating FRB, 1.5 ms duration. FRB 20190520B (FAST, 2022): first persistent radio counterpart discovered. FRB origin: ",(0,t.jsx)("strong",{children:"magnetar flares"})," (SGR 1935+2154 confirmed link in 2020) is the leading model, but cosmic strings, primordial black holes, and exotic explanations remain in contention."]})]})]})},{})}];function W(){let[e,s]=(0,r.useState)(null),a=e?R.find(t=>t.id===e):null;return(0,r.useEffect)(()=>{if(!e)return;let t=e=>{"Escape"===e.key&&s(null)};return window.addEventListener("keydown",t),document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",t),document.body.style.overflow=""}},[e]),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5 flex-wrap",children:[(0,t.jsx)(f.Zap,{className:"h-3 w-3 text-amber-500"}),"Click any short to open a lazy popup — animated SVG + math equation + Pyodide-runnable Python code + 2024-2025 NASA/Chinese paper citation.",(0,t.jsx)("span",{className:"text-[10px]",children:"Modal content only mounts on click."})]}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:R.map(e=>(0,t.jsxs)(i.motion.button,{type:"button",onClick:()=>s(e.id),className:"relative rounded-xl overflow-hidden border border-border/60 hover:border-primary/60 hover:shadow-lg transition-all bg-gradient-to-br from-card to-muted/30 group",whileHover:{y:-4},whileTap:{scale:.98},"aria-label":`Open short: ${e.hookTitle}`,children:[(0,t.jsxs)("div",{className:"relative w-full bg-gradient-to-br from-muted/40 to-card",style:{aspectRatio:"9 / 16",maxHeight:320},children:[(0,t.jsx)("div",{className:"absolute inset-0 p-2",children:e.thumbnail}),(0,t.jsx)("div",{className:"absolute top-2 left-2 z-10",children:(0,t.jsxs)(h.Badge,{variant:"secondary",className:"text-[10px] h-5 px-1.5 gap-0.5",style:{backgroundColor:e.accent+"20",color:e.accent},children:[(0,t.jsx)(w.Sparkles,{className:"h-2.5 w-2.5"})," SPACE ",e.step]})}),(0,t.jsx)("div",{className:"absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center",children:(0,t.jsx)(i.motion.div,{initial:{opacity:0,scale:.8},whileHover:{opacity:1,scale:1},className:"opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur rounded-full p-2.5 border border-border shadow-md",children:(0,t.jsx)(u.Telescope,{className:"h-4 w-4 text-primary"})})})]}),(0,t.jsxs)("div",{className:"p-2.5 border-t border-border/40 bg-background/80",children:[(0,t.jsx)("p",{className:"text-xs font-semibold leading-tight",style:{color:e.accent},children:e.hookTitle}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-0.5 font-mono",children:e.subtitle})]})]},e.id))}),(0,t.jsx)(_.AnimatePresence,{children:a&&(0,t.jsxs)(i.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 md:p-6 overflow-y-auto",onClick:()=>s(null),children:[(0,t.jsx)("button",{type:"button",onClick:()=>s(null),className:"absolute top-3 right-3 z-30 p-2 rounded-full bg-background/90 border border-border hover:bg-accent transition-colors","aria-label":"Close",children:(0,t.jsx)(N.X,{className:"h-5 w-5"})}),(0,t.jsxs)("div",{className:"absolute top-3 left-3 z-30 px-3 py-1.5 rounded-full bg-background/90 border border-border flex items-center gap-2 text-xs font-semibold",children:[(0,t.jsx)(u.Telescope,{className:"h-3.5 w-3.5",style:{color:a.accent}}),(0,t.jsxs)("span",{style:{color:a.accent},children:["SPACE ",a.step," · ",a.hookTitle]})]}),(0,t.jsxs)(i.motion.div,{initial:{scale:.95,opacity:0,y:20},animate:{scale:1,opacity:1,y:0},exit:{scale:.95,opacity:0,y:20},transition:{duration:.25},className:"relative w-full max-w-3xl my-8 rounded-xl border border-border bg-background shadow-2xl overflow-hidden",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("div",{className:"p-4 md:p-6 max-h-[85vh] overflow-y-auto",children:a.detail}),(0,t.jsxs)("div",{className:"border-t border-border/40 bg-muted/20 px-4 md:px-6 py-2.5 flex items-center justify-between text-[10px] text-muted-foreground",children:[(0,t.jsx)("span",{children:"← click outside or press Esc to close"}),(0,t.jsxs)("span",{className:"font-mono",children:[R.findIndex(e=>e.id===a.id)+1," / ",R.length]})]})]})]})})]})}var E=e.i(72664),D=e.i(852008),I=e.i(78094);let P=["z = (λ_obs - λ_emit)/λ_emit","T² = (4π²/GM)·a³","h ~ 10⁻²¹","ΔF/F = (Rp/Rs)²","LIGO: 4 km arms","LHC: 13.6 TeV","FAST: 500 m dish","Beidou: 30 sats","λ_peak ∝ 1/T (Wien)","F = GMm/r²","v = H₀·d (Hubble)","Ω_m ≈ 0.31","Ω_Λ ≈ 0.69","t_age ≈ 13.8 Gyr","r_s = 2GM/c² (Schwarz.)","T_CMB = 2.725 K","z(CMB) ≈ 1100","M = (4π²/G)·(a³/T²)","v_orbit = √(GM/r)","ρ_c = 3H²/(8πG)","Δm/m = E/c²","H₀ ≈ 70 km/s/Mpc","v_esc = √(2GM/r)","L_Edd = 1.26×10³⁸ (M/M☉) erg/s"];function H({children:e,w:r=240,h:i=320}){return(0,t.jsxs)("div",{className:"sp-3d-scene relative",style:{width:r,height:i,perspective:"900px"},children:[(0,t.jsx)("style",{children:`
        .sp-3d-stage {
          transform-style: preserve-3d;
          transform: rotateX(15deg) rotateY(20deg);
          animation: sp-3d-rotate 8s linear infinite;
        }
        @keyframes sp-3d-rotate {
          from { transform: rotateX(15deg) rotateY(0deg); }
          to   { transform: rotateX(15deg) rotateY(360deg); }
        }
        .sp-bg-float {
          position: absolute;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          color: oklch(0.65 0.15 250 / 0.18);
          pointer-events: none;
          white-space: nowrap;
          font-size: 11px;
          line-height: 1.4;
          animation: sp-bg-drift linear infinite;
        }
        @keyframes sp-bg-drift {
          from { transform: translateY(0) translateX(0); opacity: 0.0; }
          10%  { opacity: 1.0; }
          90%  { opacity: 1.0; }
          to   { transform: translateY(-180px) translateX(40px); opacity: 0.0; }
        }
      `}),(0,t.jsx)("div",{className:"sp-3d-stage w-full h-full flex items-center justify-center",children:e})]})}function F(){let e=P.map((e,t)=>({text:e,x:53*t%95,y:37*t%90,delay:1.7*t%14,duration:14+t%7,size:10+3*t%5}));return(0,t.jsx)("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:e.map((e,r)=>(0,t.jsx)("div",{className:"sp-bg-float",style:{left:`${e.x}%`,bottom:`${e.y-50}%`,animationDelay:`${e.delay}s`,animationDuration:`${e.duration}s`,fontSize:`${e.size}px`},children:e.text},r))})}function O({dim:e=3}){let[s,a]=(0,r.useState)(0);(0,r.useEffect)(()=>{let e=setInterval(()=>a(e=>(e+1)%60),100);return()=>clearInterval(e)},[]);let n=[{x:180,y:160,size:22,phase:0},{x:80,y:70,size:9,phase:1.2},{x:290,y:100,size:11,phase:2.4},{x:90,y:250,size:10,phase:3.1},{x:270,y:240,size:8,phase:4},{x:50,y:160,size:6,phase:5.1},{x:320,y:180,size:7,phase:.7},{x:150,y:60,size:5,phase:2},{x:220,y:50,size:6,phase:3.4},{x:200,y:270,size:7,phase:4.6},{x:120,y:130,size:5,phase:1.5},{x:240,y:140,size:6,phase:2.8},{x:160,y:220,size:5,phase:5.5},{x:240,y:210,size:6,phase:.3}].slice(0,3===e?1:4===e?6:14);return(0,t.jsxs)("svg",{viewBox:"0 0 360 320",width:"100%",height:"100%",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("radialGradient",{id:"jwst-bg-grad",cx:"50%",cy:"50%",r:"70%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.10 0.05 250 / 0.95)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.05 0.02 250 / 1.0)"})]}),(0,t.jsxs)("radialGradient",{id:"jwst-galaxy-core",cx:"50%",cy:"50%",r:"50%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.95 0.18 60 / 0.95)"}),(0,t.jsx)("stop",{offset:"40%",stopColor:"oklch(0.75 0.20 30 / 0.6)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.40 0.15 25 / 0.0)"})]}),(0,t.jsxs)("radialGradient",{id:"jwst-galaxy-dim",cx:"50%",cy:"50%",r:"50%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.80 0.15 250 / 0.7)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.40 0.10 250 / 0.0)"})]})]}),(0,t.jsx)("rect",{x:"0",y:"0",width:"360",height:"320",fill:"url(#jwst-bg-grad)"}),Array.from({length:40}).map((e,r)=>{let i=.3+.7*Math.abs(Math.sin(s/8+r));return(0,t.jsx)("circle",{cx:47*r%360,cy:31*r%320,r:"0.6",fill:"oklch(0.95 0.05 250 / 0.7)",opacity:i},`star-${r}`)}),5===e&&(0,t.jsxs)("g",{stroke:"oklch(0.55 0.12 250 / 0.35)",strokeWidth:"0.6",strokeDasharray:"2 3",fill:"none",children:[(0,t.jsx)("path",{d:"M 80 70 L 180 160"}),(0,t.jsx)("path",{d:"M 180 160 L 290 100"}),(0,t.jsx)("path",{d:"M 180 160 L 90 250"}),(0,t.jsx)("path",{d:"M 180 160 L 270 240"}),(0,t.jsx)("path",{d:"M 50 160 L 180 160"}),(0,t.jsx)("path",{d:"M 180 160 L 320 180"})]}),99===e&&(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:"0",y:"0",width:"120",height:"320",fill:"oklch(0.65 0.18 60 / 0.15)"}),(0,t.jsx)("rect",{x:"120",y:"0",width:"120",height:"320",fill:"oklch(0.65 0.18 30 / 0.15)"}),(0,t.jsx)("rect",{x:"240",y:"0",width:"120",height:"320",fill:"oklch(0.65 0.18 165 / 0.15)"}),(0,t.jsx)("text",{x:"60",y:"20",textAnchor:"middle",fontSize:"8",fill:"oklch(0.85 0.18 60)",children:"optical"}),(0,t.jsx)("text",{x:"180",y:"20",textAnchor:"middle",fontSize:"8",fill:"oklch(0.85 0.18 30)",children:"IR (JWST)"}),(0,t.jsx)("text",{x:"300",y:"20",textAnchor:"middle",fontSize:"8",fill:"oklch(0.85 0.18 165)",children:"radio"})]}),n.map((e,r)=>{let a=0===r,n=.6+.4*Math.sin(s/10+e.phase),o=a?e.size*(1+.15*n):e.size*(.7+.5*n);return(0,t.jsx)(i.motion.g,{initial:{opacity:0},animate:{opacity:.4+.6*n},transition:{duration:.4,delay:.05*r},children:(0,t.jsxs)("g",{transform:`rotate(${23*r%180} ${e.x} ${e.y})`,children:[(0,t.jsx)(i.motion.ellipse,{cx:e.x,cy:e.y,rx:o,ry:.5*o,fill:a?"url(#jwst-galaxy-core)":"url(#jwst-galaxy-dim)",animate:{rx:o,ry:.5*o},transition:{duration:.1,ease:"linear"}}),(0,t.jsx)("circle",{cx:e.x,cy:e.y,r:.25*o,fill:a?"oklch(0.95 0.20 60)":"oklch(0.85 0.18 250 / 0.7)"})]})},`gal-${r}`)}),[{label:"z=14",x:60,y:60,color:"oklch(0.85 0.18 25)"},{label:"z=10",x:290,y:90,color:"oklch(0.80 0.16 60)"},{label:"z=7",x:80,y:260,color:"oklch(0.75 0.14 165)"}].map((e,r)=>(0,t.jsxs)("g",{children:[(0,t.jsx)("text",{x:e.x,y:e.y,fontSize:"9",fill:e.color,fontWeight:"bold",fontFamily:"monospace",children:e.label}),(0,t.jsx)("line",{x1:e.x+24,y1:e.y-3,x2:e.x+38,y2:e.y-3,stroke:e.color,strokeWidth:"0.6",opacity:"0.7"})]},`z-${r}`)),(0,t.jsx)("text",{x:"180",y:"305",textAnchor:"middle",fontSize:"9",fill:"oklch(0.65 0.10 250)",children:3===e?"single galaxy (JWST NIRCam)":4===e?"galaxy cluster":5===e?"cosmic web — galaxies + filaments":"multi-wavelength: optical · IR · radio"})]})}function q({dim:e=3}){let[s,a]=(0,r.useState)(0);(0,r.useEffect)(()=>{let e=setInterval(()=>a(e=>(e+1)%100),60);return()=>clearInterval(e)},[]);let n={x:300},o={y:106},l=s/8,c=e=>4*Math.sin(l+.4*e),d=240+c(0),h=144+c(1),m=Math.floor(s/5)%4!=3;return(0,t.jsxs)("svg",{viewBox:"0 0 360 320",width:"100%",height:"100%",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"ligo-arm-grad",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.85 0.18 165 / 0.95)"}),(0,t.jsx)("stop",{offset:"50%",stopColor:"oklch(0.65 0.16 165 / 0.6)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.40 0.10 165 / 0.0)"})]}),(0,t.jsxs)("radialGradient",{id:"ligo-bs-grad",cx:"50%",cy:"50%",r:"50%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.95 0.20 165)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.50 0.16 165 / 0.0)"})]})]}),(0,t.jsxs)("g",{opacity:"0.45",children:[Array.from({length:6}).map((e,r)=>{let s=20+8*r+4*Math.cos(l+.5*r),a=30+8*Math.sin(l+.5*r);return(0,t.jsx)(i.motion.ellipse,{cx:180,cy:150,rx:s+14*r,ry:a+5*r,fill:"none",stroke:"oklch(0.65 0.16 200 / 0.5)",strokeWidth:"0.6",animate:{rx:s+14*r,ry:a+5*r},transition:{duration:.06,ease:"linear"}},`gw-${r}`)}),(0,t.jsx)("text",{x:"180",y:"40",textAnchor:"middle",fontSize:"9",fill:"oklch(0.65 0.12 200)",fontFamily:"monospace",children:"h ~ 10⁻²¹  (GW strain)"})]}),(0,t.jsx)("line",{x1:60,y1:250,x2:n.x,y2:250,stroke:"oklch(0.50 0.10 250 / 0.4)",strokeWidth:"3"}),(0,t.jsx)(i.motion.line,{x1:60,y1:250,x2:60+d,y2:250,stroke:"url(#ligo-arm-grad)",strokeWidth:"2.5",animate:{x2:60+d},transition:{duration:.06,ease:"linear"}}),(0,t.jsx)("line",{x1:60,y1:250,x2:60,y2:o.y,stroke:"oklch(0.50 0.10 250 / 0.4)",strokeWidth:"3"}),(0,t.jsx)(i.motion.line,{x1:60,y1:250,x2:60,y2:250-h,stroke:"url(#ligo-arm-grad)",strokeWidth:"2.5",animate:{y2:250-h},transition:{duration:.06,ease:"linear"}}),(0,t.jsx)("rect",{x:n.x-4,y:244,width:"8",height:"12",fill:"oklch(0.75 0.18 165)",stroke:"oklch(0.55 0.10 250)",strokeWidth:"0.5"}),(0,t.jsx)("rect",{x:54,y:o.y-4,width:"12",height:"8",fill:"oklch(0.75 0.18 165)",stroke:"oklch(0.55 0.10 250)",strokeWidth:"0.5"}),(0,t.jsx)("circle",{cx:60,cy:250,r:"6",fill:"url(#ligo-bs-grad)",stroke:"oklch(0.55 0.10 250)",strokeWidth:"0.8"}),(0,t.jsx)("line",{x1:60,y1:280,x2:60,y2:256,stroke:"oklch(0.85 0.18 30)",strokeWidth:"2",opacity:m?.9:.25}),(0,t.jsx)("rect",{x:52,y:276,width:"16",height:"8",rx:"2",fill:"oklch(0.40 0.10 30)",stroke:"oklch(0.65 0.16 30)",strokeWidth:"0.6"}),(0,t.jsx)("text",{x:60,y:300,textAnchor:"middle",fontSize:"8",fill:"oklch(0.75 0.16 30)",children:"laser"}),(0,t.jsx)("line",{x1:30,y1:250,x2:54,y2:250,stroke:"oklch(0.85 0.18 165)",strokeWidth:"2",opacity:m?.9:.25}),(0,t.jsx)("rect",{x:22,y:245,width:"8",height:"10",rx:"1",fill:"oklch(0.40 0.10 165)",stroke:"oklch(0.65 0.16 165)",strokeWidth:"0.6"}),(0,t.jsx)("text",{x:26,y:268,textAnchor:"middle",fontSize:"8",fill:"oklch(0.75 0.16 165)",children:"PD"}),(0,t.jsx)("text",{x:(60+n.x)/2,y:264,textAnchor:"middle",fontSize:"8",fill:"oklch(0.65 0.10 250)",children:"4 km arm (X)"}),(0,t.jsx)("text",{x:46,y:(250+o.y)/2,textAnchor:"end",fontSize:"8",fill:"oklch(0.65 0.10 250)",children:"4 km arm (Y)"}),4===e&&(0,t.jsxs)("g",{opacity:"0.85",children:[(0,t.jsx)("circle",{cx:300,cy:70,r:"14",fill:"none",stroke:"oklch(0.65 0.16 165)",strokeWidth:"1"}),(0,t.jsx)("text",{x:300,y:73,textAnchor:"middle",fontSize:"8",fill:"oklch(0.75 0.16 165)",children:"Virgo"}),(0,t.jsx)("circle",{cx:330,cy:140,r:"12",fill:"none",stroke:"oklch(0.65 0.16 165)",strokeWidth:"1"}),(0,t.jsx)("text",{x:330,y:143,textAnchor:"middle",fontSize:"7",fill:"oklch(0.75 0.16 165)",children:"KAGRA"})]}),5===e&&(0,t.jsxs)("g",{opacity:"0.75",children:[(0,t.jsx)("ellipse",{cx:310,cy:100,rx:"35",ry:"18",fill:"none",stroke:"oklch(0.65 0.16 165)",strokeWidth:"0.8"}),(0,t.jsx)("ellipse",{cx:310,cy:100,rx:"18",ry:"9",fill:"oklch(0.65 0.16 165 / 0.4)",stroke:"none"}),(0,t.jsx)("text",{x:310,y:135,textAnchor:"middle",fontSize:"8",fill:"oklch(0.75 0.16 165)",children:"sky map"})]}),99===e&&(0,t.jsxs)("g",{opacity:"0.9",children:[(0,t.jsx)(i.motion.circle,{cx:310,cy:90,r:"8",fill:"oklch(0.85 0.20 60 / 0.8)",animate:{r:[6,10,6]},transition:{duration:1.6,repeat:1/0,ease:"easeInOut"}}),(0,t.jsx)("text",{x:310,y:120,textAnchor:"middle",fontSize:"8",fill:"oklch(0.75 0.16 60)",children:"EM (kilonova)"})]}),(0,t.jsx)("text",{x:"180",y:"305",textAnchor:"middle",fontSize:"9",fill:"oklch(0.65 0.10 250)",children:3===e?"LIGO Hanford — single interferometer":4===e?"LIGO + Virgo + KAGRA network":5===e?"GW sky localisation":"GW170817: GW + EM counterpart"})]})}function J({dim:e=3}){let[s,a]=(0,r.useState)(0);(0,r.useEffect)(()=>{let e=setInterval(()=>a(e=>(e+1)%100),80);return()=>clearInterval(e)},[]);let n=3===e?4:4===e?8:5===e?12:16,o=.5+.5*Math.sin(s/5),l=Array.from({length:n}).map((e,t)=>{let r=t/n*2*Math.PI+.005*s,i=70+30*Math.sin(s/7+t);return{x:180+i*Math.cos(r),y:160+i*Math.sin(r),angle:r,len:i,energy:50+17*t%80}}),c=s/100*2*Math.PI;return(0,t.jsxs)("svg",{viewBox:"0 0 360 320",width:"100%",height:"100%",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("radialGradient",{id:"lhc-collision-grad",cx:"50%",cy:"50%",r:"50%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.95 0.22 25)"}),(0,t.jsx)("stop",{offset:"40%",stopColor:"oklch(0.75 0.20 30 / 0.7)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.40 0.15 25 / 0.0)"})]}),(0,t.jsxs)("linearGradient",{id:"lhc-beam-grad",x1:"0%",y1:"0%",x2:"100%",y2:"0%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.40 0.18 30 / 0.0)"}),(0,t.jsx)("stop",{offset:"50%",stopColor:"oklch(0.85 0.20 30 / 0.95)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.40 0.18 30 / 0.0)"})]}),(0,t.jsxs)("radialGradient",{id:"lhc-det-ring",cx:"50%",cy:"50%",r:"50%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.30 0.10 250 / 0.0)"}),(0,t.jsx)("stop",{offset:"85%",stopColor:"oklch(0.55 0.12 250 / 0.25)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.65 0.16 250 / 0.6)"})]})]}),5===e&&(0,t.jsxs)("g",{opacity:"0.6",children:[(0,t.jsx)("circle",{cx:180,cy:160,r:"130",fill:"none",stroke:"oklch(0.55 0.12 250)",strokeWidth:"0.5"}),(0,t.jsx)("circle",{cx:180,cy:160,r:"110",fill:"none",stroke:"oklch(0.55 0.12 250)",strokeWidth:"0.5",strokeDasharray:"2 2"}),(0,t.jsx)("circle",{cx:180,cy:160,r:"90",fill:"none",stroke:"oklch(0.55 0.12 250)",strokeWidth:"0.5"}),(0,t.jsx)("circle",{cx:180,cy:160,r:"70",fill:"none",stroke:"oklch(0.55 0.12 250)",strokeWidth:"0.5",strokeDasharray:"1 2"}),(0,t.jsx)("circle",{cx:180,cy:160,r:"135",fill:"url(#lhc-det-ring)"})]}),(0,t.jsx)(i.motion.line,{x1:20,y1:160,x2:166,y2:160,stroke:"url(#lhc-beam-grad)",strokeWidth:"3",animate:{x1:20+4*Math.sin(c),x2:166+4*Math.sin(c)},transition:{duration:.06,ease:"linear"}}),(0,t.jsx)(i.motion.line,{x1:340,y1:160,x2:194,y2:160,stroke:"url(#lhc-beam-grad)",strokeWidth:"3",animate:{x1:340-4*Math.cos(c),x2:194-4*Math.cos(c)},transition:{duration:.06,ease:"linear"}}),(0,t.jsx)("text",{x:"14",y:154,textAnchor:"start",fontSize:"9",fill:"oklch(0.85 0.18 30)",fontWeight:"bold",children:"p⁺"}),(0,t.jsx)("text",{x:"346",y:154,textAnchor:"end",fontSize:"9",fill:"oklch(0.85 0.18 30)",fontWeight:"bold",children:"p⁺"}),l.map((r,s)=>{let a=99===e?s%3==0?"oklch(0.85 0.18 60)":s%3==1?"oklch(0.85 0.18 165)":"oklch(0.85 0.18 320)":"oklch(0.85 0.18 25)";return(0,t.jsxs)(i.motion.g,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.2,delay:.04*s},children:[(0,t.jsx)(i.motion.line,{x1:180,y1:160,x2:r.x,y2:r.y,stroke:a,strokeWidth:"2",strokeDasharray:"3 2",animate:{x2:r.x,y2:r.y},transition:{duration:.08,ease:"linear"}}),(0,t.jsx)("circle",{cx:r.x,cy:r.y,r:"3",fill:a,opacity:"0.85"}),s%2==0&&(0,t.jsxs)("text",{x:r.x+6,y:r.y+3,fontSize:"8",fill:a,fontFamily:"monospace",children:[r.energy," GeV"]})]},`jet-${s}`)}),(0,t.jsx)(i.motion.circle,{cx:180,cy:160,r:8+6*o,fill:"url(#lhc-collision-grad)",animate:{r:8+6*o},transition:{duration:.06}}),(0,t.jsx)("circle",{cx:180,cy:160,r:"4",fill:"oklch(0.95 0.22 25)"}),99===e&&(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:"8",y:"270",width:"344",height:"22",fill:"oklch(0.15 0.05 250 / 0.7)",rx:"3"}),(0,t.jsx)("circle",{cx:"22",cy:"281",r:"3",fill:"oklch(0.85 0.18 60)"}),(0,t.jsx)("text",{x:"30",y:"284",fontSize:"8",fill:"oklch(0.85 0.10 250)",children:"hadrons"}),(0,t.jsx)("circle",{cx:"100",cy:"281",r:"3",fill:"oklch(0.85 0.18 165)"}),(0,t.jsx)("text",{x:"108",y:"284",fontSize:"8",fill:"oklch(0.85 0.10 250)",children:"leptons"}),(0,t.jsx)("circle",{cx:"180",cy:"281",r:"3",fill:"oklch(0.85 0.18 320)"}),(0,t.jsx)("text",{x:"188",y:"284",fontSize:"8",fill:"oklch(0.85 0.10 250)",children:"photons"})]}),(0,t.jsx)("text",{x:"180",y:"24",textAnchor:"middle",fontSize:"9",fill:"oklch(0.85 0.18 25)",fontWeight:"bold",fontFamily:"monospace",children:"√s = 13.6 TeV"}),(0,t.jsx)("text",{x:"180",y:"305",textAnchor:"middle",fontSize:"9",fill:"oklch(0.65 0.10 250)",children:3===e?"single pp collision · 4 jets":4===e?"multi-event pileup":5===e?"ATLAS detector cross-section":"particle ID: hadrons · leptons · photons"})]})}function K({dim:e=3}){let[s,a]=(0,r.useState)(0);(0,r.useEffect)(()=>{let e=setInterval(()=>a(e=>(e+1)%120),60);return()=>clearInterval(e)},[]);let n=s/120*2*Math.PI,o=180+130*Math.cos(n),l=170+52*Math.sin(n),c=3===e?1:4===e?3:5;return(0,t.jsxs)("svg",{viewBox:"0 0 360 320",width:"100%",height:"100%",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("radialGradient",{id:"tg-earth-grad",cx:"35%",cy:"35%",r:"65%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.65 0.15 220 / 0.95)"}),(0,t.jsx)("stop",{offset:"55%",stopColor:"oklch(0.45 0.18 250 / 0.85)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.20 0.10 250 / 0.7)"})]}),(0,t.jsxs)("radialGradient",{id:"tg-station-grad",cx:"50%",cy:"50%",r:"50%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.90 0.15 60)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.55 0.10 30 / 0.0)"})]}),(0,t.jsxs)("linearGradient",{id:"tg-solar-grad",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.40 0.16 250)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.20 0.10 250)"})]})]}),Array.from({length:30}).map((e,r)=>{let i=.3+.7*Math.abs(Math.sin(s/10+r));return(0,t.jsx)("circle",{cx:53*r%360,cy:29*r%200,r:"0.6",fill:"oklch(0.95 0.05 60 / 0.6)",opacity:i},`tg-star-${r}`)}),(0,t.jsx)("circle",{cx:180,cy:170,r:80,fill:"url(#tg-earth-grad)",stroke:"oklch(0.55 0.16 250 / 0.7)",strokeWidth:"1"}),(0,t.jsxs)("g",{fill:"oklch(0.50 0.18 145 / 0.7)",children:[(0,t.jsx)("ellipse",{cx:160,cy:155,rx:"22",ry:"12",transform:"rotate(-15 160 155)"}),(0,t.jsx)("ellipse",{cx:205,cy:175,rx:"18",ry:"10",transform:"rotate(20 205 175)"}),(0,t.jsx)("ellipse",{cx:172,cy:195,rx:"14",ry:"8",transform:"rotate(10 172 195)"})]}),(0,t.jsx)("circle",{cx:180,cy:170,r:84,fill:"none",stroke:"oklch(0.65 0.18 220 / 0.25)",strokeWidth:"2"}),(0,t.jsx)("ellipse",{cx:180,cy:170,rx:130,ry:52,fill:"none",stroke:"oklch(0.65 0.12 250 / 0.4)",strokeWidth:"0.8",strokeDasharray:"3 3"}),(0,t.jsx)(i.motion.line,{x1:180,y1:170,x2:o,y2:l,stroke:"oklch(0.65 0.16 250 / 0.3)",strokeWidth:"0.6",strokeDasharray:"1 3",animate:{x2:o,y2:l},transition:{duration:.06,ease:"linear"}}),(0,t.jsxs)(i.motion.g,{animate:{x:o-180,y:l-170},transition:{duration:.06,ease:"linear"},children:[(0,t.jsx)("rect",{x:156,y:167,width:"14",height:"6",fill:"url(#tg-solar-grad)",stroke:"oklch(0.55 0.10 250)",strokeWidth:"0.4"}),(0,t.jsx)("rect",{x:190,y:167,width:"14",height:"6",fill:"url(#tg-solar-grad)",stroke:"oklch(0.55 0.10 250)",strokeWidth:"0.4"}),(0,t.jsx)("circle",{cx:180,cy:170,r:"5",fill:"url(#tg-station-grad)",stroke:"oklch(0.55 0.10 250)",strokeWidth:"0.5"}),c>=3&&(0,t.jsx)("rect",{x:178,y:175,width:"4",height:"8",fill:"oklch(0.65 0.18 30)",stroke:"oklch(0.45 0.10 30)",strokeWidth:"0.4"}),c>=5&&(0,t.jsx)("rect",{x:178,y:157,width:"4",height:"8",fill:"oklch(0.65 0.18 165)",stroke:"oklch(0.45 0.10 165)",strokeWidth:"0.4"}),(0,t.jsx)("text",{x:180,y:154,textAnchor:"middle",fontSize:"8",fill:"oklch(0.85 0.18 30)",fontWeight:"bold",children:"Tiangong"}),c>=3&&(0,t.jsx)("text",{x:190,y:186,textAnchor:"start",fontSize:"7",fill:"oklch(0.75 0.18 30)",children:"Shenzhou"})]}),5===e&&(0,t.jsxs)("g",{opacity:"0.75",children:[Array.from({length:3}).map((e,r)=>{let i=n+(r+1)*2.1,s=180+100*Math.cos(i),a=170+40*Math.sin(i);return(0,t.jsxs)("g",{children:[(0,t.jsx)("circle",{cx:s,cy:a,r:"2",fill:"oklch(0.85 0.18 165)"}),(0,t.jsxs)("text",{x:s+4,y:a-4,fontSize:"7",fill:"oklch(0.65 0.12 165)",children:["sat",r+1]})]},`sat-${r}`)}),(0,t.jsx)("text",{x:"180",y:"20",textAnchor:"middle",fontSize:"8",fill:"oklch(0.65 0.10 250)",children:"Beidou + Tiangong network"})]}),99===e&&(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:"0",y:"0",width:"120",height:"320",fill:"oklch(0.65 0.18 60 / 0.10)"}),(0,t.jsx)("rect",{x:"120",y:"0",width:"120",height:"320",fill:"oklch(0.65 0.18 165 / 0.10)"}),(0,t.jsx)("rect",{x:"240",y:"0",width:"120",height:"320",fill:"oklch(0.65 0.18 320 / 0.10)"}),(0,t.jsx)("text",{x:"60",y:"20",textAnchor:"middle",fontSize:"8",fill:"oklch(0.85 0.18 60)",children:"optical"}),(0,t.jsx)("text",{x:"180",y:"20",textAnchor:"middle",fontSize:"8",fill:"oklch(0.85 0.18 165)",children:"radar"}),(0,t.jsx)("text",{x:"300",y:"20",textAnchor:"middle",fontSize:"8",fill:"oklch(0.85 0.18 320)",children:"IR"})]}),(0,t.jsx)("text",{x:"180",y:"305",textAnchor:"middle",fontSize:"9",fill:"oklch(0.65 0.10 250)",children:3===e?"Tiangong (T-morph) · 340–450 km orbit":4===e?"Tiangong + Shenzhou docked":5===e?"Tiangong + Beidou navigation network":"multi-sensor: optical · radar · IR"})]})}function V({value:e,onChange:r}){return(0,t.jsxs)("div",{className:"flex flex-wrap gap-1.5 items-center justify-center bg-muted/30 rounded-md p-1.5 border border-border/40",children:[(0,t.jsxs)("span",{className:"text-[10px] text-muted-foreground px-1 flex items-center gap-1",children:[(0,t.jsx)(D.Layers,{className:"h-3 w-3"})," scale:"]}),[{d:3,label:"3D",hint:"single object"},{d:4,label:"4D",hint:"cluster / network"},{d:5,label:"5D",hint:"cosmic web / full system"},{d:99,label:"N-D",hint:"multi-wavelength"}].map(i=>(0,t.jsx)("button",{type:"button",onClick:()=>r(i.d),className:`text-[10px] px-2 py-1 rounded transition-colors ${e===i.d?"bg-primary text-primary-foreground font-semibold":"hover:bg-accent text-foreground/70"}`,title:i.hint,children:i.label},i.d))]})}let Q=`import math
H0 = 67.4; Omega_m = 0.315; Omega_Lambda = 0.685
D_H = 299792.458 / H0
def comoving_distance(z):
    N = 100; dz = z / N; d = 0
    for i in range(N):
        zi = i * dz; zf = (i+1) * dz
        Ei = 1.0 / math.sqrt(Omega_m * (1+zi)**3 + Omega_Lambda)
        Ef = 1.0 / math.sqrt(Omega_m * (1+zf)**3 + Omega_Lambda)
        d += 0.5 * (Ei + Ef) * dz
    return D_H * d
def lookback_time(z):
    t_H = 1.0 / H0 * 9.778; N = 100; dz = z / N; t = 0
    for i in range(N):
        zi = i * dz; zf = (i+1) * dz
        Ei = 1.0 / ((1+zi) * math.sqrt(Omega_m * (1+zi)**3 + Omega_Lambda))
        Ef = 1.0 / ((1+zf) * math.sqrt(Omega_m * (1+zf)**3 + Omega_Lambda))
        t += 0.5 * (Ei + Ef) * dz
    return t_H * t
print("=== JWST lookback time ===")
for z in [0.5, 1.0, 2.0, 5.0, 7.0, 10.0, 14.0]:
    D = comoving_distance(z); t = lookback_time(z)
    print(f"  z={z:>5.1f} -> D={D:>8.1f} Mpc, lookback={t:.2f} Gyr, age={13.8-t:.2f} Gyr")`,U=`import math
def chirp_mass(m1, m2):
    return (m1 * m2)**0.6 / (m1 + m2)**0.2
def gw_strain(m1, m2, freq, dist_mpc):
    Mc = chirp_mass(m1, m2)
    h = 1e-21 * (Mc / 30)**(5/3) * (freq / 100)**(2/3) * (500 / dist_mpc)
    return h, Mc
print("=== GW strain for notable events ===")
for name, m1, m2, f, D in [("GW150914", 36, 29, 100, 410), ("GW170817", 1.46, 1.27, 100, 40), ("GW190521", 85, 66, 100, 5300)]:
    h, Mc = gw_strain(m1, m2, f, D)
    print(f"  {name}: Mc={Mc:.1f} Msun, h={h:.2e}, D={D} Mpc")`,X=`print("=== LHC n-subjettiness for jet tagging ===")
print("  tau_21 = tau_2 / tau_1 < 0.45 -> W boson (2-prong)")
print("  tau_32 = tau_3 / tau_2 < 0.65 -> top quark (3-prong)")
print("  LHC Run 3: 13.6 TeV, 140/fb target, ParticleNet ML tagger")`,$=`import math
G = 6.674e-11; M_earth = 5.972e24; R_earth = 6.371e6
def orbital_period(altitude_km):
    a = (R_earth + altitude_km * 1000)
    T = 2 * math.pi * math.sqrt(a**3 / (G * M_earth))
    return T / 60
print("=== Orbital periods (Kepler 3rd law) ===")
for name, alt in [("ISS", 408), ("Tiangong", 389), ("Hubble", 540), ("GPS", 20200)]:
    T = orbital_period(alt)
    print(f"  {name:>12} at {alt:>5} km -> T = {T:.1f} min ({T/60:.2f} hr)")`,Z=[{id:"jwst",title:"JWST deep field",subtitle:"galaxies at z = 7…14",accent:"oklch(0.65 0.16 60)",icon:(0,t.jsx)(u.Telescope,{className:"h-4 w-4"}),thumb:(0,t.jsx)(O,{dim:3}),detail:(0,t.jsx)(O,{dim:3}),caption:"JWST deep field — near-infrared imaging reveals the earliest galaxies, formed only ~300 Myr after the Big Bang. Cosmological redshift z = (λ_obs - λ_emit)/λ_emit stretches light from ultraviolet into JWST's NIRCam band. Higher z = farther = earlier universe. The central bright galaxy is at z ≈ 7; the fainter z = 14 dots are photons emitted when the universe was 3% of its current age.",code:Q,mathExpr:"z = (lambda_obs - lambda_emit) / lambda_emit  ·  v = H0·d  ·  D_C = c/H0 * integral(dz/E(z))"},{id:"ligo",title:"LIGO interferometer",subtitle:"4 km arms · h ~ 10⁻²¹",accent:"oklch(0.65 0.16 165)",icon:(0,t.jsx)(g.Radio,{className:"h-4 w-4"}),thumb:(0,t.jsx)(q,{dim:3}),detail:(0,t.jsx)(q,{dim:3}),caption:"LIGO interferometer — two 4-km arms at right angles, laser light reflected back and forth ~280 times for an effective 1120 km path. A passing gravitational wave stretches one arm and compresses the other by ~10⁻²¹ m (1/10000 the width of a proton), detected as a phase shift at the photodetector. The 2015 detection GW150914 of two merging black holes confirmed Einstein's general relativity in the strong-field regime.",code:U,mathExpr:"h = (4G/c^4) * (d2I/dt2) / r  ·  M_chirp = (m1*m2)^(3/5) / (m1+m2)^(1/5)"},{id:"lhc",title:"LHC collision",subtitle:"pp at √s = 13.6 TeV",accent:"oklch(0.65 0.16 25)",icon:(0,t.jsx)(m.Atom,{className:"h-4 w-4"}),thumb:(0,t.jsx)(J,{dim:3}),detail:(0,t.jsx)(J,{dim:3}),caption:"LHC collision — counter-rotating proton beams collide at centre-of-mass energy √s = 13.6 TeV inside ATLAS / CMS. Quarks and gluons scatter into narrow jets of hadrons; energetic leptons (electrons, muons) and photons escape cleanly without strong-interaction noise. E = mc² governs the mass of new particles that can be created — the Higgs boson (125 GeV) was discovered here in 2012 by detecting its decay into 4 leptons / 2 photons.",code:X,mathExpr:"tau_N = (1/pT2) * sum_k min(pT_i * dR_ik)  ·  tau_21 = tau_2/tau_1  ·  tau_32 = tau_3/tau_2"},{id:"tiangong",title:"Tiangong space station",subtitle:"340–450 km LEO",accent:"oklch(0.65 0.16 250)",icon:(0,t.jsx)(y.Globe,{className:"h-4 w-4"}),thumb:(0,t.jsx)(K,{dim:3}),detail:(0,t.jsx)(K,{dim:3}),caption:"Tiangong ('heavenly palace') — China's modular space station in low Earth orbit (340–450 km altitude, ~92 min orbital period). Composed of the Tianhe core module + Wentian + Mengtian experiment modules, with Shenzhou crewed craft and Tianzhou cargo craft docking periodically at the axial and radial ports. The two large solar panel wings track the Sun to supply ~100 kW. T² = (4π²/GM)·a³ sets the orbital period from the semi-major axis a.",code:$,mathExpr:"T^2 = (4*pi^2/GM) * a^3  ·  v^2 = GM*(2/r - 1/a)  ·  F = GMm/r^2"}];function Y(){let[e,s]=(0,r.useState)(3),[a,n]=(0,r.useState)(null),o=a?Z.find(e=>e.id===a):null;return(0,r.useEffect)(()=>{if(!a)return;let e=e=>{"Escape"===e.key&&n(null)};return window.addEventListener("keydown",e),document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",e),document.body.style.overflow=""}},[a]),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("p",{className:"text-[11px] text-muted-foreground text-center flex items-center justify-center gap-1.5 flex-wrap",children:[(0,t.jsx)(f.Zap,{className:"h-3 w-3 text-amber-500"}),(0,t.jsx)(u.Telescope,{className:"h-3 w-3 text-sky-500/70"}),(0,t.jsx)(g.Radio,{className:"h-3 w-3 text-emerald-500/70"}),(0,t.jsx)(m.Atom,{className:"h-3 w-3 text-orange-500/70"}),(0,t.jsx)(y.Globe,{className:"h-3 w-3 text-blue-500/70"}),(0,t.jsx)(I.Network,{className:"h-3 w-3 text-purple-500/70"}),(0,t.jsx)(p.Cpu,{className:"h-3 w-3 text-rose-500/70"}),"Click any card to pop up an animated 3D scene with a scale toggle + floating math/code background.",(0,t.jsx)("span",{className:"text-[10px]",children:"Modal content is lazy-rendered — no SVG animations mount until the card is opened."})]}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:Z.map(e=>(0,t.jsxs)(i.motion.button,{type:"button",onClick:()=>n(e.id),className:"relative rounded-xl overflow-hidden border border-border/60 hover:border-primary/60 hover:shadow-lg transition-all bg-gradient-to-br from-card to-muted/30 group",whileHover:{y:-4},whileTap:{scale:.98},"aria-label":`Open 3D gallery: ${e.title}`,children:[(0,t.jsxs)("div",{className:"relative w-full bg-gradient-to-br from-muted/40 to-card",style:{aspectRatio:"9 / 14",maxHeight:280},children:[(0,t.jsx)("div",{className:"absolute inset-0 p-2",children:e.thumb}),(0,t.jsx)("div",{className:"absolute top-2 left-2 z-10",children:(0,t.jsxs)(h.Badge,{variant:"secondary",className:"text-[10px] h-5 px-1.5 gap-0.5",style:{backgroundColor:e.accent+"20",color:e.accent},children:[e.icon," 3D"]})}),(0,t.jsx)("div",{className:"absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center",children:(0,t.jsx)(i.motion.div,{initial:{opacity:0,scale:.8},whileHover:{opacity:1,scale:1},className:"opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur rounded-full p-2.5 border border-border shadow-md",children:(0,t.jsx)(E.Box,{className:"h-4 w-4 text-primary"})})})]}),(0,t.jsxs)("div",{className:"p-2.5 border-t border-border/40 bg-background/80",children:[(0,t.jsx)("p",{className:"text-xs font-semibold leading-tight",style:{color:e.accent},children:e.title}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-0.5 font-mono",children:e.subtitle})]})]},e.id))}),(0,t.jsx)(_.AnimatePresence,{children:o&&(0,t.jsxs)(i.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 md:p-6 overflow-y-auto",onClick:()=>n(null),children:[(0,t.jsx)("button",{type:"button",onClick:()=>n(null),className:"absolute top-3 right-3 z-30 p-2 rounded-full bg-background/90 border border-border hover:bg-accent transition-colors","aria-label":"Close",children:(0,t.jsx)(N.X,{className:"h-5 w-5"})}),(0,t.jsxs)("div",{className:"absolute top-3 left-3 z-30 px-3 py-1.5 rounded-full bg-background/90 border border-border flex items-center gap-2 text-xs font-semibold",children:[(0,t.jsx)("span",{style:{color:o.accent},children:o.icon}),(0,t.jsx)("span",{style:{color:o.accent},children:o.title}),(0,t.jsx)("span",{className:"text-muted-foreground font-normal",children:"· 3D animated · lazy-loaded"})]}),(0,t.jsxs)(i.motion.div,{initial:{scale:.95,opacity:0,y:20},animate:{scale:1,opacity:1,y:0},exit:{scale:.95,opacity:0,y:20},transition:{duration:.25},className:"relative w-full max-w-4xl my-8 rounded-xl border border-border bg-background shadow-2xl overflow-hidden",onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:"border-b border-border/40 bg-muted/20 px-4 md:px-6 py-3 flex items-center justify-between gap-3 flex-wrap",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"flex items-center justify-center w-9 h-9 rounded-lg shrink-0",style:{backgroundColor:o.accent+"20"},children:o.icon}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"text-base font-bold leading-tight",style:{color:o.accent},children:o.title}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground font-mono",children:o.subtitle})]})]}),(0,t.jsx)(V,{value:e,onChange:s})]}),(0,t.jsxs)("div",{className:"relative bg-gradient-to-br from-background to-muted/30 p-4 md:p-6",children:[(0,t.jsx)(F,{}),(0,t.jsx)("div",{className:"relative z-10 max-h-[70vh] overflow-hidden rounded-lg bg-card/40 backdrop-blur-sm",children:(0,t.jsxs)(H,{w:360,h:320,children:["jwst"===o.id&&(0,t.jsx)(O,{dim:e}),"ligo"===o.id&&(0,t.jsx)(q,{dim:e}),"lhc"===o.id&&(0,t.jsx)(J,{dim:e}),"tiangong"===o.id&&(0,t.jsx)(K,{dim:e})]})})]}),o.mathExpr&&(0,t.jsxs)("div",{className:"border-t border-border/40 bg-primary/5 px-4 md:px-6 py-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-1",children:"Math foundation"}),(0,t.jsx)("p",{className:"font-mono text-xs text-primary leading-relaxed",children:o.mathExpr})]}),o.code&&(0,t.jsxs)("div",{className:"border-t border-border/40 px-4 md:px-6 py-3",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-wider text-muted-foreground mb-2",children:"Code construct - run the computation"}),(0,t.jsx)(d.PyodideRunner,{buttonLabel:"Run computation (Pyodide)",code:o.code})]}),(0,t.jsxs)("div",{className:"border-t border-border/40 bg-muted/20 px-4 md:px-6 py-3",children:[(0,t.jsx)("p",{className:"text-xs text-muted-foreground leading-relaxed",children:o.caption}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground/70 mt-2",children:"Toggle scale above — 3D shows the simplest case (single object). Higher scales reveal how the same concept grows into clusters, cosmic webs, and multi-wavelength views. The drifting background shows the math + code that powers the visual."})]})]})]})})]})}var ee=e.i(901752),et=e.i(675450),er=e.i(25652),ei=e.i(868054),es=e.i(455711),ea=e.i(59938),en=e.i(158960),eo=e.i(237064),el=e.i(332017);let ec=[{label:"Kepler's 3rd law",value:"T² = (4π²/GM)·a³",hint:"Period T scales with semi-major axis a³ — Kepler 1619",deltaTone:"flat"},{label:"Transit depth",value:"ΔF/F = (Rp/Rs)²",hint:"Flux dip = area ratio of planet/star disc",deltaTone:"flat"},{label:"LHC data rate",value:"~1 PB/year",hint:"ATLAS + CMS after trigger zero-suppression (40 MHz × ~1 MB)",deltaTone:"up"},{label:"LIGO GW events",value:"90 (O1–O3)",hint:"BBH + BNS + NSBH mergers — Abbott et al. 2015-2020",deltaTone:"up"}];function ed(){let[e,s]=(0,r.useState)(0);(0,r.useEffect)(()=>{let e=setInterval(()=>s(e=>(e+1)%5),1500);return()=>clearInterval(e)},[]);let a=[340,180,100,60,320],n=[0,.4,1,1,0];return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("style",{children:".ss-3d { perspective: 800px; } .ss-stage { transform: rotateX(8deg); transform-style: preserve-3d; }"}),(0,t.jsxs)("p",{className:"text-sm font-semibold mb-3 flex items-center gap-2",children:[(0,t.jsx)(m.Atom,{className:"h-4 w-4 text-primary"})," Exoplanet transit detection (loop)"," ",(0,t.jsx)("span",{className:"text-[10px] font-mono text-muted-foreground ml-auto",children:["1. Star (steady flux F₀)","2. Planet transit begins (flux drops)","3. Light-curve dip ≈ (Rp/Rs)²","4. Exoplanet confirmed (≥3 dips)","5. JWST follow-up (atmosphere)"][e]})]}),(0,t.jsx)("div",{className:"ss-3d",children:(0,t.jsx)("div",{className:"ss-stage flex justify-center",children:(0,t.jsxs)("svg",{width:"380",height:"240",viewBox:"0 0 380 240",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("radialGradient",{id:"starGrad",cx:"40%",cy:"40%",r:"60%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"oklch(0.92 0.15 70)"}),(0,t.jsx)("stop",{offset:"60%",stopColor:"oklch(0.78 0.18 65)"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"oklch(0.6 0.18 60)"})]})}),(0,t.jsx)("circle",{cx:"200",cy:"80",r:"50",fill:"url(#starGrad)",stroke:"oklch(0.55 0.16 60)",strokeWidth:"1"}),(0,t.jsx)("circle",{cx:"195",cy:"75",r:"5",fill:"oklch(0.65 0.12 60 / 0.6)"}),(0,t.jsx)("circle",{cx:"210",cy:"90",r:"3",fill:"oklch(0.65 0.12 60 / 0.5)"}),[!1,!0,!0,!0,!1][e]&&(0,t.jsx)(i.motion.circle,{cx:a[e],cy:"80",r:"8",fill:"oklch(0.35 0.08 250)",stroke:"oklch(0.5 0.1 250)",strokeWidth:"0.5",initial:{opacity:0},animate:{opacity:1,cx:a[e]},transition:{duration:.8}}),0===e&&(0,t.jsx)(i.motion.g,{initial:{opacity:0},animate:{opacity:1},children:(0,t.jsx)("text",{x:"200",y:"20",textAnchor:"middle",fontSize:"10",fill:"oklch(0.55 0.16 60)",fontWeight:"bold",children:"Steady star — flux F₀ = 1.0"})}),1===e&&(0,t.jsx)(i.motion.g,{initial:{opacity:0},animate:{opacity:1},children:(0,t.jsx)("text",{x:"200",y:"20",textAnchor:"middle",fontSize:"10",fill:"oklch(0.55 0.16 250)",fontWeight:"bold",children:"Planet entering transit — flux dropping"})}),2===e&&(0,t.jsx)(i.motion.g,{initial:{opacity:0},animate:{opacity:1},children:(0,t.jsx)("text",{x:"200",y:"20",textAnchor:"middle",fontSize:"10",fill:"oklch(0.6 0.18 25)",fontWeight:"bold",children:"Full transit — ΔF/F ≈ (Rp/Rs)²"})}),3===e&&(0,t.jsx)(i.motion.g,{initial:{opacity:0},animate:{opacity:1},children:(0,t.jsx)("text",{x:"200",y:"20",textAnchor:"middle",fontSize:"10",fill:"oklch(0.55 0.16 150)",fontWeight:"bold",children:"3+ periodic dips → exoplanet confirmed"})}),4===e&&(0,t.jsx)(i.motion.g,{initial:{opacity:0},animate:{opacity:1},children:(0,t.jsx)("text",{x:"200",y:"20",textAnchor:"middle",fontSize:"10",fill:"oklch(0.55 0.16 200)",fontWeight:"bold",children:"JWST NIRSpec — atmospheric spectroscopy"})}),(0,t.jsx)("text",{x:"20",y:"155",textAnchor:"middle",fontSize:"9",fill:"var(--muted-foreground)",children:"F"}),(0,t.jsx)("text",{x:"360",y:"218",textAnchor:"middle",fontSize:"9",fill:"var(--muted-foreground)",children:"t"}),(0,t.jsx)("line",{x1:"30",y1:"160",x2:"360",y2:"160",stroke:"var(--border)",strokeWidth:"1"}),(0,t.jsx)("line",{x1:"30",y1:"160",x2:"30",y2:"220",stroke:"var(--border)",strokeWidth:"1"}),(()=>{let r=[];for(let t=0;t<=60;t++){let i=30+t/60*330,s=t/60,a=0;if(e>=2){if(.15>Math.abs(s-.5))a=35*n[e];else if(.2>Math.abs(s-.5)){let t=(.2-Math.abs(s-.5))/.05;a=35*n[e]*t}}else 1===e&&.15>Math.abs(s-.5)&&(a=20*n[e]);let o=160+a;r.push(`${0===t?"M":"L"}${i.toFixed(1)},${o.toFixed(1)}`)}return(0,t.jsx)("path",{d:r.join(" "),stroke:"oklch(0.55 0.16 25)",strokeWidth:"1.5",fill:"none"})})(),e>=2&&(0,t.jsxs)(i.motion.g,{initial:{opacity:0},animate:{opacity:1},children:[(0,t.jsx)("line",{x1:"200",y1:"160",x2:"200",y2:"195",stroke:"oklch(0.6 0.18 25)",strokeWidth:"0.8",strokeDasharray:"2,2"}),(0,t.jsx)("text",{x:"200",y:"210",textAnchor:"middle",fontSize:"9",fill:"oklch(0.6 0.18 25)",fontWeight:"bold",children:"ΔF/F"})]}),3===e&&(0,t.jsxs)(i.motion.g,{initial:{opacity:0},animate:{opacity:1},children:[[100,200,300].map((e,r)=>(0,t.jsxs)("g",{children:[(0,t.jsx)("circle",{cx:e,cy:"195",r:"2",fill:"oklch(0.55 0.16 150)"}),(0,t.jsxs)("text",{x:e,y:"215",textAnchor:"middle",fontSize:"8",fill:"var(--muted-foreground)",children:["t",r+1]})]},r)),(0,t.jsx)("line",{x1:"100",y1:"230",x2:"300",y2:"230",stroke:"oklch(0.55 0.16 150)",strokeWidth:"0.8",markerEnd:"url(#arr)"}),(0,t.jsx)("defs",{children:(0,t.jsx)("marker",{id:"arr",markerWidth:"6",markerHeight:"6",refX:"5",refY:"3",orient:"auto",children:(0,t.jsx)("path",{d:"M0,0 L6,3 L0,6 Z",fill:"oklch(0.55 0.16 150)"})})}),(0,t.jsx)("text",{x:"200",y:"240",textAnchor:"middle",fontSize:"8",fill:"oklch(0.55 0.16 150)",children:"orbital period T"})]}),4===e&&(0,t.jsxs)(i.motion.g,{initial:{opacity:0},animate:{opacity:1},children:[(0,t.jsx)("text",{x:"200",y:"195",textAnchor:"middle",fontSize:"9",fill:"oklch(0.55 0.16 200)",children:"H₂O, CO₂, CH₄ absorption bands"}),(0,t.jsx)("line",{x1:"60",y1:"210",x2:"340",y2:"210",stroke:"oklch(0.55 0.16 200)",strokeWidth:"0.8"}),(0,t.jsx)("path",{d:"M60,210 L100,210 L110,205 L130,205 L140,210 L180,210 L195,200 L220,200 L230,210 L280,210 L295,205 L320,205 L330,210 L340,210",stroke:"oklch(0.55 0.16 200)",strokeWidth:"1.2",fill:"none"}),(0,t.jsx)("text",{x:"200",y:"232",textAnchor:"middle",fontSize:"8",fill:"var(--muted-foreground)",children:"wavelength (μm)"})]})]})})}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground text-center mt-3",children:"Phase 1: steady star (flux F₀). Phase 2: planet enters disc — flux drops. Phase 3: full transit — ΔF/F = (Rp/Rs)² (Earth-Sun ≈ 84 ppm, Jupiter-Sun ≈ 1%). Phase 4: ≥3 periodic dips confirm an exoplanet via Kepler's 3rd law (T² ∝ a³). Phase 5: JWST NIRSpec follow-up — atmospheric spectroscopy reveals H₂O, CO₂, CH₄."})]})}let eh=`# Space Science — Kepler orbits, transit light curves, 3-body, jet 4-vectors
# Pure-Python simulation (no NumPy needed) — runs in Pyodide
import math

# ============================================================
# 1. Kepler's 3rd law:  T\xb2 = (4π\xb2/GM) \xb7 a\xb3
# ============================================================
# Newtonian gravity:   F = G\xb7M\xb7m/r\xb2
# Circular orbit:      F = m\xb7v\xb2/r   →  v = sqrt(GM/r)
# Orbital period:       T = 2π\xb7r/v = 2π\xb7sqrt(r\xb3/(GM))
#                       ⟹ T\xb2 = (4π\xb2/GM)\xb7r\xb3   ← Kepler 1619

G = 6.67430e-11   # gravitational constant (m\xb3 kg⁻\xb9 s⁻\xb2)
M_sun = 1.989e30   # solar mass (kg)
AU = 1.496e11      # astronomical unit (m)
day = 86400.0

def kepler_period(a_m, M_kg):
    """Orbital period from Kepler's 3rd law: T = 2π\xb7sqrt(a\xb3/GM)."""
    return 2 * math.pi * math.sqrt(a_m**3 / (G * M_kg))

# Earth (a = 1 AU) and Jupiter (a = 5.2 AU) orbits
T_earth = kepler_period(AU, M_sun) / day
T_jup   = kepler_period(5.2 * AU, M_sun) / day
print("=" * 64)
print("1. KEPLER'S 3RD LAW  —  T\xb2 = (4π\xb2/GM)\xb7a\xb3")
print("=" * 64)
print(f"  Earth  (a=1.0 AU):  T = {T_earth:.3f} days  (true = 365.25)")
print(f"  Jupiter(a=5.2 AU): T = {T_jup:.1f} days  (true = 4332.6)")
# Kepler ratio: T_jup/T_earth should equal 5.2^(3/2) = 11.86
print(f"  T_jup/T_earth = {T_jup/T_earth:.3f}   (Kepler: (5.2)^1.5 = {5.2**1.5:.3f})")

# ============================================================
# 2. Two-body orbit simulation (velocity-Verlet integrator)
# ============================================================
def kepler_orbit(a, e, M, n_steps=2000):
    """Integrate an elliptical orbit using velocity-Verlet.
    a = semi-major axis (m), e = eccentricity, M = central mass (kg).
    """
    r_peri = a * (1 - e)                    # perihelion distance
    # Vis-viva: v\xb2 = GM(2/r - 1/a) → v_peri = sqrt(GM(1+e)/(a(1-e)))
    v_peri = math.sqrt(G * M * (1 + e) / (a * (1 - e)))
    T = kepler_period(a, M)
    dt = T / n_steps
    x, y   = r_peri, 0.0
    vx, vy = 0.0, v_peri
    pts = []
    for i in range(n_steps):
        r = math.sqrt(x*x + y*y)
        ax = -G * M * x / r**3
        ay = -G * M * y / r**3
        x  += vx*dt + 0.5*ax*dt**2
        y  += vy*dt + 0.5*ay*dt**2
        r_new = math.sqrt(x*x + y*y)
        ax_new = -G * M * x / r_new**3
        ay_new = -G * M * y / r_new**3
        vx += 0.5*(ax+ax_new)*dt
        vy += 0.5*(ay+ay_new)*dt
        if i % 200 == 0:
            pts.append((x/AU, y/AU, r_new/AU))
    return pts, T

print(f"\\n{'=' * 64}")
print("2. TWO-BODY ORBIT  —  Earth (e=0.0167, ~circular)")
print("=" * 64)
pts, T = kepler_orbit(AU, 0.0167, M_sun, n_steps=1000)
print(f"  Simulated {len(pts)} sampled positions over T = {T/day:.2f} days")
for i in (0, len(pts)//4, len(pts)//2, len(pts)-1):
    print(f"  t={i*T/(day*len(pts)):.1f}d  →  r = {pts[i][2]:.4f} AU  (x,y)=({pts[i][0]:+.3f}, {pts[i][1]:+.3f})")
print("  (Earth's orbit is nearly circular — eccentricity 0.0167)")

# ============================================================
# 3. Transit light curve: ΔF/F = (Rp/Rs)\xb2
# ============================================================
R_sun     = 6.9634e8
R_earth   = 6.371e6
R_jupiter = 6.9911e7

def transit_depth(Rp, Rs):
    """Fractional flux drop during a full transit."""
    return (Rp / Rs) ** 2

print(f"\\n{'=' * 64}")
print("3. TRANSIT METHOD  —  ΔF/F = (Rp/Rs)\xb2")
print("=" * 64)
print(f"  Earth-Sun:   ΔF/F = {transit_depth(R_earth,   R_sun)*1e6:6.1f} ppm   (84 ppm — Kepler detection limit)")
print(f"  Jupiter-Sun: ΔF/F = {transit_depth(R_jupiter, R_sun)*1e2:6.2f} %     (~1% — trivial detection)")
print(f"  Hot Jupiter (HD 209458b, Rp=1.4 Rj): ΔF/F = {(1.4*R_jupiter/R_sun)**2*1e2:.2f}% (first transit 1999)")

# Simulate a light curve with a transit at t = T_mid
def light_curve(t, T_mid, dur, depth):
    """Box-shaped transit: dip of depth over duration dur around T_mid."""
    if abs(t - T_mid) < dur/2:
        return 1.0 - depth
    return 1.0

print("\\n  Simulated light curve for an Earth-Sun transit (T_mid=5.0 d, dur=13 h):")
T_mid, dur = 5.0, 13/24
depth_earth = transit_depth(R_earth, R_sun)
for t in [4.0, 4.5, 4.9, 5.0, 5.05, 5.5, 6.0]:
    f = light_curve(t, T_mid, dur, depth_earth)
    delta = (1 - f) * 1e6
    print(f"    t={t:.2f} d → F={f:.7f}  ΔF/F={delta:6.1f} ppm  {'← transit' if delta > 0 else ''}")

# ============================================================
# 4. Three-body simulation (leapfrog integrator)
# ============================================================
# Chenciner-Montgomery (2000) figure-8: three equal masses can orbit
# periodically in a figure-8 pattern. Here we demo a simple 3-body system.

def acceleration_3body(state, masses):
    """Compute gravitational acceleration on each body."""
    n = len(masses)
    accs = [[0.0, 0.0] for _ in range(n)]
    for i in range(n):
        for j in range(n):
            if i == j:
                continue
            dx = state[2*j]   - state[2*i]
            dy = state[2*j+1] - state[2*i+1]
            r2 = dx*dx + dy*dy + 1e-10
            r  = math.sqrt(r2)
            f  = G * masses[j] / r2
            accs[i][0] += f * dx / r
            accs[i][1] += f * dy / r
    return accs

# Three moon-mass bodies in a triangular configuration
m_body = 7.3e22  # Moon mass (kg)
state = [
    -1.0e8,  0.0,    # body 1 (x, y)
     1.0e8,  0.0,    # body 2
     0.0,    1.7e8,  # body 3
     0.0,   900.0,   # body 1 (vx, vy)
     0.0,  -900.0,   # body 2
    -1800.0, 0.0,    # body 3
]
masses = [m_body, m_body, m_body]

print(f"\\n{'=' * 64}")
print("4. THREE-BODY (LEAPFROG, 300 STEPS)")
print("=" * 64)
dt = 600.0  # 10 min/step
for step in range(300):
    accs = acceleration_3body(state, masses)
    for i in range(3):
        state[2*i]   += state[2*i+2]*dt + 0.5*accs[i][0]*dt**2
        state[2*i+1] += state[2*i+3]*dt + 0.5*accs[i][1]*dt**2
    new_accs = acceleration_3body(state, masses)
    for i in range(3):
        state[2*i+2] += 0.5*(accs[i][0]+new_accs[i][0])*dt
        state[2*i+3] += 0.5*(accs[i][1]+new_accs[i][1])*dt
for i in range(3):
    x, y = state[2*i]/1e8, state[2*i+1]/1e8
    print(f"  Body {i+1} final: (x={x:+.2f}, y={y:+.2f}) \xd7 10⁸ m")
print("  (Leapfrog conserves energy to ~10⁻⁴ over short runs — Verlet is more accurate.)")

# ============================================================
# 5. LHC jet 4-vector reconstruction + n-subjettiness
# ============================================================
# Each final-state particle has 4-momentum  p = (E, px, py, pz)
# Transverse momentum:  pT = sqrt(px\xb2 + py\xb2)
# Pseudorapidity:       η = -ln(tan(θ/2))   (θ = polar angle from beam)
# Azimuth:              φ = atan2(py, px)
# Angular distance:     ΔR = sqrt(Δη\xb2 + Δφ\xb2)
# Jet = cluster of particles, built by anti-kT algorithm with R0 = 0.4

class Particle4Vector:
    """LHC particle 4-momentum."""
    def __init__(self, E, px, py, pz, pdg_id=0):
        self.E, self.px, self.py, self.pz = E, px, py, pz
        self.pdg_id = pdg_id
    @property
    def pT(self):
        return math.sqrt(self.px**2 + self.py**2)
    @property
    def eta(self):
        p = math.sqrt(self.px**2 + self.py**2 + self.pz**2)
        if p == 0 or abs(self.pz/p) >= 1:
            return 0.0
        theta = math.acos(self.pz / p)
        return -math.log(math.tan(theta/2))
    @property
    def phi(self):
        return math.atan2(self.py, self.px)
    @property
    def mass(self):
        return math.sqrt(max(0.0, self.E**2 - (self.px**2 + self.py**2 + self.pz**2)))
    def __repr__(self):
        return f"Particle(pT={self.pT:6.1f} GeV, η={self.eta:+.2f}, φ={self.phi:+.2f})"

# A simple jet (cluster of 4 particles — e.g., from a W→qq' event)
jet = [
    Particle4Vector(100,  85,  20,  10),
    Particle4Vector( 50,  35,  10,   5),
    Particle4Vector( 30,  25,   8,   3),
    Particle4Vector( 20,  18,   5,   2),
]
print(f"\\n{'=' * 64}")
print("5. LHC JET 4-VECTOR  +  n-SUBJETTINESS")
print("=" * 64)
print(f"  {len(jet)} constituent particles:")
for p in jet:
    print(f"    {p}")
# Reconstruct the jet 4-vector by summing constituents
jet_E  = sum(p.E  for p in jet)
jet_px = sum(p.px for p in jet)
jet_py = sum(p.py for p in jet)
jet_pz = sum(p.pz for p in jet)
jet4v  = Particle4Vector(jet_E, jet_px, jet_py, jet_pz)
print(f"  Reconstructed jet: {jet4v}")
print(f"  → jet pT = {jet4v.pT:.1f} GeV, jet mass = {jet4v.mass:.1f} GeV")

# n-subjettiness:  τ_N = (1/ΣpT) \xb7 Σ_k min(pT_k^β, Σ_i pT_i^β \xb7 (ΔR_ik/R0)^β)
def n_subjettiness(particles, N=2, R0=0.4, beta=1.0):
    """τ_N discriminator: small τ_N/N means N-prong structure (W, top)."""
    total_pT = sum(p.pT for p in particles)
    axes = particles[:N]  # in production, use kt-cluster axes
    tau = 0.0
    for k, p in enumerate(particles):
        min_term = float('inf')
        for i in range(N):
            deta = p.eta - axes[i].eta
            dphi = p.phi - axes[i].phi
            dR   = math.sqrt(deta**2 + dphi**2)
            term = (axes[i].pT**beta) * (dR/R0)**beta
            if term < min_term:
                min_term = term
        tau += min(p.pT**beta, min_term)
    return tau / total_pT

tau_1 = n_subjettiness(jet, N=1)
tau_2 = n_subjettiness(jet, N=2)
tau_3 = n_subjettiness(jet, N=3)
print(f"\\n  τ_1 = {tau_1:.3f}    τ_2 = {tau_2:.3f}    τ_3 = {tau_3:.3f}")
print(f"  τ_21 = τ_2/τ_1 = {tau_2/tau_1:.3f}  (&lt; 0.45 → likely W/Z 2-prong jet)")
print(f"  τ_32 = τ_3/τ_2 = {tau_3/tau_2:.3f}  (&lt; 0.75 → likely top 3-prong jet)")
print("  These ratios are the standard jet-tagging discriminants at the LHC.")

print(f"\\n{'=' * 64}")
print("RECAP  —  space science IS the ultimate big-data problem")
print("=" * 64)
print("""
  \xb7 Kepler's 3rd law is a power law (T ∝ a^1.5) — same log-log scaling
    that pervades empirical science (Zipf, Pareto, allometry).
  \xb7 Transit depth is a quadratic area ratio — same form as a
    Bayesian probability ratio in any classifier.
  \xb7 LIGO's matched filtering IS a single-layer NN with the chirp
    template as the filter kernel.
  \xb7 JetGNN's EdgeConv on ΔR-graphs = the SAME GNN as PPI networks
    (systems-biology) and binder-target alphaproteo graphs.
  \xb7 LHC ~1 PB/year, TESS 200M light curves, LIGO 1 TB/day —
    all stored in Parquet/Arrow, queried by Spark (ADR-002).
  The universe is the largest dataset humanity has tried to analyse.
""")`,em=`import torch
import torch.nn as nn
import torch.nn.functional as F
import math
from typing import List, Tuple, Optional, Dict

# ============================================================
# 1. TransitCNN — 1D CNN for exoplanet transit detection
# ============================================================
# Kepler / TESS light curves:
#   ~65,000 cadences over 4 years (30-min integrations, ~1300 ppm/h noise)
# A transit creates a U-shaped dip ~2-13 hours wide.
# 1D CNN detects the dip pattern regardless of position (translation-invariant).
#
# Architecture: 4 conv blocks (7x1, 5x1, 5x1, 3x1) with BatchNorm + ReLU +
# MaxPool, then global avg pool + linear head. Receptive field grows ~8x per
# block — covers ~2048 cadences.

class LightCurveAugmentation(nn.Module):
    """Augment light curves to simulate stellar variability + detector noise.
    
    Real Kepler light curves contain:
        - Stellar variability (sinusoidal on hours-days timescales)
        - Detector drift (systematics, ~1 ppm/quarter)
        - Photon noise (~sqrt(N_photon))
    
    Augment: add Gaussian noise + random sinusoid + cosmic-ray spikes.
    """
    def __init__(self, noise_ppm: int = 200):
        super().__init__()
        self.noise_ppm = noise_ppm
    
    def forward(self, flux: torch.Tensor) -> torch.Tensor:
        # flux shape: (B, L) — in flux units (1.0 = no transit)
        B, L = flux.shape
        noise = torch.randn_like(flux) * (self.noise_ppm * 1e-6)
        # Stellar variability (slow sinusoid)
        t = torch.arange(L, device=flux.device, dtype=flux.dtype) / L
        amp = torch.rand(B, 1, device=flux.device, dtype=flux.dtype) * 200e-6
        freq = torch.rand(B, 1, device=flux.device, dtype=flux.dtype) * 5 + 1
        sinusoid = amp * torch.sin(2 * math.pi * freq * t.unsqueeze(0))
        return flux + noise + sinusoid

class TransitCNN(nn.Module):
    """1D CNN to detect exoplanet transits in light curves.
    
    Input:  (B, L) flux time series, L = 2048 cadences (~28 days @ 30-min)
    Output: (B, 2) logits  [no transit, transit]
    
    Architecture: 4 conv blocks with BatchNorm + ReLU + MaxPool, then global
    avg pool + linear head. Total params ~50k — small enough for inference
    on a single GPU.
    """
    def __init__(self, length: int = 2048, channels: int = 32, num_classes: int = 2):
        super().__init__()
        self.length = length
        self.features = nn.Sequential(
            self._block(1,         channels,    kernel=7, pool=4),  # 2048 → 512
            self._block(channels,  channels*2,  kernel=5, pool=4),  # 512  → 128
            self._block(channels*2,channels*4,  kernel=5, pool=4),  # 128  → 32
            self._block(channels*4,channels*8,  kernel=3, pool=2),  # 32   → 16
        )
        self.global_pool = nn.AdaptiveAvgPool1d(1)
        self.head = nn.Sequential(
            nn.Flatten(),
            nn.Linear(channels * 8, 64),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(64, num_classes),
        )
    
    @staticmethod
    def _block(in_c: int, out_c: int, kernel: int, pool: int) -> nn.Sequential:
        return nn.Sequential(
            nn.Conv1d(in_c, out_c, kernel_size=kernel, padding=kernel // 2),
            nn.BatchNorm1d(out_c),
            nn.ReLU(),
            nn.MaxPool1d(pool),
        )
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # x: (B, L) → (B, 1, L)
        x = x.unsqueeze(1)
        x = self.features(x)               # (B, C*8, L')
        x = self.global_pool(x)            # (B, C*8, 1)
        return self.head(x)                # (B, num_classes)
    
    def synthesize_transit(self, B: int, L: int, depth: float = 1e-4,
                            dur_frac: float = 0.03) -> torch.Tensor:
        """Build a synthetic transit light curve for testing."""
        flux = torch.ones(B, L)
        mid = L // 2
        dur = max(1, int(L * dur_frac))
        # Random transit center per sample
        centers = torch.randint(mid - dur, mid + dur, (B,))
        for b in range(B):
            c = centers[b].item()
            flux[b, max(0, c-dur//2):c+dur//2] -= depth
        return flux

# ============================================================
# 2. GravitationalWaveClassifier — 2D CNN on Q-transform spectrograms
# ============================================================
# LIGO strain data is 1D at 4096 Hz. Convert to 2D time-frequency
# representation via Q-transform (constant-Q — better than STFT for chirps).
# Each event: ~2 sec window → 64x64 spectrogram. 2D CNN detects the chirp.

class QTransform(nn.Module):
    """Differentiable Q-transform (constant-Q time-frequency transform).
    
    LIGO uses Morlet wavelets in production (gwpy / cuQwavelet on GPU).
    Here we approximate as STFT + log-frequency interpolation — same shape
    out, simpler to implement in pure PyTorch.
    """
    def __init__(self, n_freq: int = 64, n_time: int = 64, sample_rate: int = 4096):
        super().__init__()
        self.n_freq = n_freq
        self.n_time = n_time
        self.sr = sample_rate
        # Constant-Q log-spaced frequency bins (20 Hz to 1024 Hz — LIGO band)
        f_min, f_max = 20, 1024
        freqs = torch.logspace(math.log10(f_min), math.log10(f_max), n_freq)
        self.register_buffer('freqs', freqs)
    
    def forward(self, strain: torch.Tensor) -> torch.Tensor:
        # strain: (B, T) at sample_rate Hz
        B, T = strain.shape
        # STFT with 256-pt Hann window
        window = torch.hann_window(256, device=strain.device, dtype=strain.dtype)
        spec = torch.stft(strain, n_fft=256, hop_length=max(1, T // self.n_time),
                          win_length=256, window=window, return_complex=True)
        spec = spec.abs()  # (B, F, T')
        # Interpolate to fixed (F, T) shape
        spec = F.interpolate(spec.unsqueeze(1), size=(self.n_freq, self.n_time),
                            mode='bilinear', align_corners=False)
        return spec  # (B, 1, F, T)

class GravitationalWaveClassifier(nn.Module):
    """2D CNN to classify GW events: BBH / BNS / NSBH / Noise.
    
    Input:  (B, T) strain timeseries (T ~ 8192 samples at 4096 Hz = 2 s)
    Output: (B, 4) logits
    
    Architecture: 5 conv blocks (3x3 kernels) + global avg pool + linear head.
    ~1M params — lightweight enough for online inference at LHO/LLO.
    Inspired by Gravity Spy (Zevin et al. 2017) + DeepCW (George & Huerta 2018).
    """
    def __init__(self, n_freq: int = 64, n_time: int = 64, num_classes: int = 4):
        super().__init__()
        self.q_transform = QTransform(n_freq, n_time)
        c = 16
        self.backbone = nn.Sequential(
            self._conv_block(1,    c,    k=3),
            self._conv_block(c,    c*2,  k=3),
            self._conv_block(c*2,  c*4,  k=3),
            self._conv_block(c*4,  c*8,  k=3),
            self._conv_block(c*8,  c*16, k=3),
        )
        self.global_pool = nn.AdaptiveAvgPool2d(1)
        self.head = nn.Sequential(
            nn.Flatten(),
            nn.Linear(c*16, 128),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(128, num_classes),
        )
    
    @staticmethod
    def _conv_block(in_c: int, out_c: int, k: int) -> nn.Sequential:
        return nn.Sequential(
            nn.Conv2d(in_c, out_c, k, padding=k // 2),
            nn.BatchNorm2d(out_c),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )
    
    def forward(self, strain: torch.Tensor) -> torch.Tensor:
        spec = self.q_transform(strain)        # (B, 1, F, T)
        x = self.backbone(spec)                # (B, C*16, F', T')
        x = self.global_pool(x)               # (B, C*16, 1, 1)
        return self.head(x)                    # (B, num_classes)
    
    @staticmethod
    def synthesize_chirp(B: int = 1, T: int = 8192, sr: int = 4096,
                          f_start: float = 30.0, f_end: float = 250.0) -> torch.Tensor:
        """Build a synthetic BBH chirp for testing (f increases with t)."""
        t = torch.linspace(0, T / sr, T).unsqueeze(0)  # (1, T)
        # Linear chirp (real inspiral is power-law, but linear is enough for tests)
        f = f_start + (f_end - f_start) * t
        phase = 2 * math.pi * torch.cumsum(f, dim=-1) / sr
        amp = t / (T / sr)  # amplitude grows linearly (very rough approx)
        return 1e-21 * amp * torch.sin(phase).expand(B, -1).contiguous()

# ============================================================
# 3. JetGNN — graph neural network for jet classification
# ============================================================
# Jet = collimated spray of hadrons from quark/gluon hadronization.
# Each jet is a "point cloud" of particles with 4-momenta.
# Model as a graph: nodes = particles, edges = ΔR proximity.
# Task: classify jet as  quark / gluon / W-boson / top-quark.

class ParticleEmbedding(nn.Module):
    """Embed each particle's 4-momentum into a feature vector.
    
    Features per particle:
        log(pT), log(E), η (pseudorapidity), φ (azimuthal angle)
        + pdg_id (embedded, particle type)
    """
    def __init__(self, d_model: int = 64, n_pdg: int = 50):
        super().__init__()
        self.linear = nn.Linear(4, d_model)
        self.pdg_embed = nn.Embedding(n_pdg, d_model)
        self.combine = nn.Linear(d_model * 2, d_model)
    
    def forward(self, pT: torch.Tensor, eta: torch.Tensor, phi: torch.Tensor,
                E: torch.Tensor, pdg_id: torch.Tensor) -> torch.Tensor:
        # All inputs: (B, N)
        kin = torch.stack([torch.log(pT + 1), torch.log(E + 1), eta, phi], dim=-1)  # (B, N, 4)
        h_kin = self.linear(kin)              # (B, N, d)
        h_pdg = self.pdg_embed(pdg_id)         # (B, N, d)
        h = torch.cat([h_kin, h_pdg], dim=-1)  # (B, N, 2d)
        return F.relu(self.combine(h))         # (B, N, d)

class EdgeConvLayer(nn.Module):
    """EdgeConv layer — graph conv with messages as functions of edge features.
    
    For each node i and neighbor j:
        e_ij = h_i || (h_j - h_i)              (pairwise difference)
        m_ij = MLP(e_ij)                       (edge message)
        h_i' = max_k(m_ik for k in N(i))        (permutation-invariant aggregation)
    
    kNN graph built in ΔR = sqrt(Δη\xb2 + Δφ\xb2) space — recomputed at each layer.
    
    Reference: Dynamic Graph CNN (Wang et al. 2019) → ParticleNet (Qu & Gouskos 2020).
    """
    def __init__(self, d_in: int, d_out: int, k: int = 8):
        super().__init__()
        self.k = k
        self.mlp = nn.Sequential(
            nn.Linear(d_in * 2, d_out),
            nn.ReLU(),
            nn.Linear(d_out, d_out),
        )
    
    def forward(self, h: torch.Tensor, coords: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        # h: (B, N, d_in), coords: (B, N, 2)  (η, φ)
        B, N, D = h.shape
        # Pairwise ΔR = sqrt(Δη\xb2 + Δφ\xb2)
        diff = coords.unsqueeze(2) - coords.unsqueeze(1)    # (B, N, N, 2)
        dR = torch.sqrt((diff ** 2).sum(-1))                # (B, N, N)
        # kNN: k nearest neighbors (smallest ΔR)
        _, idx = torch.topk(dR, self.k, dim=-1, largest=False)  # (B, N, k)
        # Gather neighbor features
        idx_exp = idx.unsqueeze(-1).expand(-1, -1, -1, D)   # (B, N, k, D)
        h_neighbors = torch.gather(
            h.unsqueeze(1).expand(-1, N, -1, -1), 2, idx_exp
        )                                                   # (B, N, k, D)
        # Edge feature:  h_i || (h_j - h_i)
        h_i = h.unsqueeze(2).expand(-1, -1, self.k, -1)     # (B, N, k, D)
        edge = torch.cat([h_i, h_neighbors - h_i], dim=-1)  # (B, N, k, 2D)
        # MLP on edges
        m = self.mlp(edge)                                  # (B, N, k, d_out)
        # Aggregate via max (permutation-invariant)
        h_new, _ = m.max(dim=2)                             # (B, N, d_out)
        return h_new, dR

class JetGNN(nn.Module):
    """Graph neural network for jet classification (quark/gluon/W/top).
    
    Particles = nodes, ΔR = edges.  Stack of EdgeConv layers (recompute kNN at
    each layer) + global mean pool + linear head.
    
    Input (variable-length particle sets):
        pT:     (B, N)  transverse momenta (GeV)
        eta:    (B, N)  pseudorapidities
        phi:    (B, N)  azimuthal angles
        E:      (B, N)  energies (GeV)
        pdg_id: (B, N)  particle-type IDs (long)
    Output:
        logits: (B, 4)  [quark, gluon, W-boson, top-quark]
    
    Reference: ParticleNet (Qu & Gouskos 2020) — standard jet-GNN at the LHC.
    """
    def __init__(self, d_model: int = 64, n_layers: int = 3, k: int = 8,
                 num_classes: int = 4, n_pdg: int = 50):
        super().__init__()
        self.embed = ParticleEmbedding(d_model, n_pdg)
        self.layers = nn.ModuleList([
            EdgeConvLayer(d_model, d_model, k) for _ in range(n_layers)
        ])
        # Focal loss could be used for class imbalance (gluon vs top) — omitted for clarity
        self.head = nn.Sequential(
            nn.Linear(d_model, d_model),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(d_model, num_classes),
        )
    
    def forward(self, pT: torch.Tensor, eta: torch.Tensor, phi: torch.Tensor,
                E: torch.Tensor, pdg_id: torch.Tensor) -> torch.Tensor:
        h = self.embed(pT, eta, phi, E, pdg_id)             # (B, N, d)
        coords = torch.stack([eta, phi], dim=-1)            # (B, N, 2)
        for layer in self.layers:
            h_new, _ = layer(h, coords)
            h = h + h_new                                    # residual
        h = h.mean(dim=1)                                    # (B, d) — global mean pool
        return self.head(h)                                  # (B, num_classes)

# ============================================================
# 4. End-to-end inference examples
# ============================================================

def demo_transit_cnn() -> TransitCNN:
    """Detect a transit in a synthetic light curve."""
    torch.manual_seed(42)
    model = TransitCNN(length=2048, channels=16)
    # Synthetic transit: U-dip in the middle
    L = 2048
    flux = torch.ones(1, L)
    mid, dur = L // 2, 60
    flux[0, mid-dur:mid+dur] -= 0.0001  # 100 ppm dip
    # Augment + classify
    aug = LightCurveAugmentation(noise_ppm=200)
    flux_aug = aug(flux)
    logits = model(flux_aug)
    probs = F.softmax(logits, dim=-1)
    print(f"TransitCNN: transit prob = {probs[0, 1].item():.3f}")
    return model

def demo_gw_classifier() -> GravitationalWaveClassifier:
    """Classify a synthetic BBH chirp."""
    torch.manual_seed(0)
    model = GravitationalWaveClassifier()
    # Synthetic chirp
    strain = GravitationalWaveClassifier.synthesize_chirp(B=1, T=8192)
    logits = model(strain)
    probs = F.softmax(logits, dim=-1)
    print(f"GWClassifier: BBH prob = {probs[0, 0].item():.3f}  "
          f"BNS = {probs[0, 1].item():.3f}  noise = {probs[0, 3].item():.3f}")
    return model

def demo_jet_gnn() -> JetGNN:
    """Classify a synthetic 10-particle jet."""
    torch.manual_seed(123)
    model = JetGNN(d_model=32, n_layers=2, k=4)
    B, N = 1, 10
    pT   = torch.rand(B, N) * 100 + 10
    eta  = torch.randn(B, N) * 0.4
    phi  = torch.randn(B, N) * 0.4
    E    = pT * (1 + torch.rand(B, N))
    pdg  = torch.zeros(B, N, dtype=torch.long)
    logits = model(pT, eta, phi, E, pdg)
    probs = F.softmax(logits, dim=-1)
    print(f"JetGNN: quark = {probs[0, 0].item():.3f}  gluon = {probs[0, 1].item():.3f}  "
          f"W = {probs[0, 2].item():.3f}  top = {probs[0, 3].item():.3f}")
    return model

if __name__ == "__main__":
    transit_model = demo_transit_cnn()
    gw_model      = demo_gw_classifier()
    jet_model     = demo_jet_gnn()
    n_params = sum(p.numel() for p in transit_model.parameters())
    print(f"\\nTransitCNN  parameters: {n_params:,}")
    n_params = sum(p.numel() for p in gw_model.parameters())
    print(f"GWClassifier parameters: {n_params:,}")
    n_params = sum(p.numel() for p in jet_model.parameters())
    print(f"JetGNN      parameters: {n_params:,}")
    print("\\nAll three space-science deep-learning models instantiated successfully.")`,ep=`┌──────────────────────────────────────────────────────────────────────┐
│  SPACE-SCIENCE HPC PIPELINE  (multi-messenger astronomy)            │
│                                                                      │
│  Telescope / detector raw data                                       │
│    \xb7 Kepler/TESS  : 50 k stars \xd7 30 min cadence \xd7 4 yr  ≈ 10 TB     │
│    \xb7 LIGO strain   : 2 channels \xd7 4096 Hz \xd7 24/7      ≈ 1 TB/day    │
│    \xb7 LHC collisions: 40 MHz \xd7 ~1 MB/event             ≈ 1 PB/year   │
│    \xb7 JWST NIRCam   : ~10 GB/exposure \xd7 1000s/day      ≈ 10 TB/day   │
│         ↓                                                            │
│  ┌──────────────────────────────────────────────────────────┐        │
│  │ 1. Calibration + raw data reduction                     │        │
│  │    - Bias/dark/flat-field correction (optical)           │        │
│  │    - LIGO: Wiener filter, glitch veto                    │        │
│  │    - LHC: zero-suppression, pile-up mitigation          │        │
│  │    - Output: Apache Parquet + Arrow (ADR-003 columnar)   │        │
│  └──────────────────────────────────────────────────────────┘        │
│         ↓                                                            │
│  ┌──────────────────────────────────────────────────────────┐        │
│  │ 2. ML detection  (GPU cluster, distributed inference)   │        │
│  │    - TransitCNN on TESS light curves (Bonsai CNN)        │        │
│  │    - GW matched-filter + DL classifier (Gravity Spy)      │        │
│  │    - LHC jet tagging with JetGNN (ParticleNet)            │        │
│  │    - Apache Spark distributed inference (ADR-002)         │        │
│  └──────────────────────────────────────────────────────────┘        │
│         ↓                                                            │
│  ┌──────────────────────────────────────────────────────────┐        │
│  │ 3. Candidate selection + multi-messenger coincidence     │        │
│  │    - Group detections, deduplicate                        │        │
│  │    - GW + EM + neutrino cross-correlation (\xb15 s window)   │        │
│  │    - Statistical significance (FAP, p-values, σ)          │        │
│  └──────────────────────────────────────────────────────────┘        │
│         ↓                                                            │
│  ┌──────────────────────────────────────────────────────────┐        │
│  │ 4. Human validation  (eye-balling + interactive tools)    │        │
│  │    - Inspect light curves, spectrograms, event displays   │        │
│  │    - Confirm or reject ML candidates                       │        │
│  │    - TESS Objects of Interest (TOI), LIGO alerts circulated │        │
│  └──────────────────────────────────────────────────────────┘        │
│         ↓                                                            │
│  ┌──────────────────────────────────────────────────────────┐        │
│  │ 5. Publication + open-data archive                      │        │
│  │    - Submit to MAST (Mikulski Archive for Space Telesc.)  │        │
│  │    - DOI assignment, open data release                    │        │
│  │    - Paper to ApJ / PRD / Nature Astronomy                │        │
│  └──────────────────────────────────────────────────────────┘        │
│                                                                      │
│  Wall-clock: seconds (LIGO alerts) → years (final mission catalogues) │
│  Stack: Apache Spark, Parquet, Arrow  (same as ADR-002 Databricks)   │
│  The universe is the largest dataset humanity has tried to analyse.  │
└──────────────────────────────────────────────────────────────────────┘`;function ex(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(a.PageHeader,{eyebrow:"Space Science · Kepler/TESS · LIGO · LHC · JWST · multi-messenger astronomy",title:"Space Science — The Universe Is the Largest Dataset",description:"Space science IS the ultimate big-data problem. Kepler's 3rd law T² = (4π²/GM)a³ governs every orbit; the transit method ΔF/F = (Rp/Rs)² finds exoplanets from a 100-ppm flux dip; LIGO measures gravitational-wave strain h = (4G/c⁴)(d²I/dt²)/r from mergers 10⁹ light-years away; the LHC's n-subjettiness τ_N classifies quark/gluon/W/top jets. Four observatories generate petabytes per year — LHC ~1 PB/year, LIGO 1 TB/day, TESS 200M light curves, JWST 10 TB/day — all stored in Parquet/Arrow and queried by Spark (ADR-002). With 4 AI illustrations + a looping transit-detection 'short' + Pyodide orbit simulator + low-level PyTorch TransitCNN / GravitationalWaveClassifier / JetGNN.",right:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(m.Atom,{className:"h-3 w-3"})," Kepler + LIGO + LHC"]}),(0,t.jsxs)(h.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(f.Zap,{className:"h-3 w-3"})," Pyodide"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:ec.map(e=>(0,t.jsx)(a.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(a.SectionCard,{title:"Space concept gallery — 3D animated, click to expand (lazy popup)",description:"Replaces the previous AI-generated static image gallery. Each card opens a lazy modal with an animated 3D SVG, an n-D dimension toggle (3D single galaxy → 4D galaxy cluster → 5D cosmic web → N-D multi-wavelength), and a floating math/code background with space-science equations and Python snippets drifting subtly.",icon:(0,t.jsx)(m.Atom,{className:"h-5 w-5"}),badge:"3D gallery",children:(0,t.jsx)(Y,{})}),(0,t.jsx)(a.SectionCard,{title:"Space concept shorts — 4 lazy popups with Pyodide code + 2024-2025 NASA/Chinese papers",description:"Four 9:16 vertical cards inspired by YouTube Shorts format: JWST deep field (z>14, JADES 2023-2024), Gravitational waves (LIGO O4 + TianQin + LISA), Dark matter (LZ/XENONnT/PandaX-4T null 2024, ΛCDM vs MOND), FAST radio telescope (1000+ FRBs 2024, China). Each card opens a lazy popup with animated SVG + math equations + Pyodide-runnable Python code + recent paper citation.",icon:(0,t.jsx)(w.Sparkles,{className:"h-5 w-5"}),badge:"4 shorts",children:(0,t.jsx)(W,{})}),(0,t.jsx)(a.SectionCard,{title:"Transit detection short — star → planet transit → light-curve dip → exoplanet confirmed → JWST follow-up (loop)",icon:(0,t.jsx)(m.Atom,{className:"h-5 w-5"}),badge:"short",children:(0,t.jsx)(ed,{})}),(0,t.jsx)(a.SectionCard,{title:"Space interactives — 8 fully interactive visuals (drag, slide, click to explore)",description:"Eight interactive visuals in lazy popups spanning NASA + Chinese space sector + dark matter / dark energy / JWST / LIGO / LHC / FAST / Beidou / Chang'e / Tiangong. Topics in contention: dark matter particle vs MOND vs emergent gravity; Hubble tension (Planck H0=67.4 vs SH0ES H0=73.04); far-side Moon samples (Chang'e 6, 2024); Beidou vs GPS; TianQin vs LISA. Each card opens a lazy popup with: animated SVG visual, math equation, sliders/buttons to control parameters, and a 3-part InfoCallout (Design intent / Math foundation / Implementation insight).",icon:(0,t.jsx)(w.Sparkles,{className:"h-5 w-5"}),badge:"8 interactives",children:(0,t.jsx)(v,{})}),(0,t.jsx)(a.SectionCard,{title:"Kepler's laws + orbital mechanics",description:"Johannes Kepler (1619) derived three empirical laws from Tycho Brahe's naked-eye observations. Newton (1687) showed they all follow from F = G·M·m/r². Kepler's 3rd law T² = (4π²/GM)·a³ is the foundation of celestial mechanics — it lets you weigh any star from its planet's orbital period alone, and is the same power-law scaling (T ∝ a^1.5) that pervades empirical science (Zipf, Pareto, allometry).",icon:(0,t.jsx)(es.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"T² = (4π²/GM)·a³  ·  v² = GM·(2/r − 1/a)  ·  F = GMm/r²"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Kepler 3rd law (period vs semi-major axis) + vis-viva equation (orbital speed at radius r) + Newton's law of gravitation."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"1st law — orbits are ellipses"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"r(φ) = a(1−e²) / (1 + e·cos φ)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Star at one focus, not the centre. Eccentricity e ∈ [0, 1). Earth's e = 0.0167 (nearly circular)."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-amber-600 dark:text-amber-400 mb-1",children:"2nd law — equal areas in equal times"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"dA/dt = ½ r²(dφ/dt) = const"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Planets move faster at perihelion (close approach), slower at aphelion. Conservation of angular momentum."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/40 bg-violet-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-violet-600 dark:text-violet-400 mb-1",children:"3rd law — harmonic relation"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"T² / a³ = 4π² / (GM)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"The orbital period squared is proportional to the semi-major axis cubed. Lets you measure M_star from T_planet + a."})]})]})]})}),(0,t.jsx)(a.SectionCard,{title:"Transit method — ΔF/F = (Rp/Rs)²",description:"When a planet crosses its host star's disc (transit), it blocks a fraction (Rp/Rs)² of the starlight. Earth-Sun: (R_earth/R_sun)² ≈ 84 ppm — at the Kepler mission's detection limit. Jupiter-Sun: (R_jupiter/R_sun)² ≈ 1% — trivial. Three periodic dips → exoplanet confirmed; the period gives the semi-major axis via Kepler's 3rd law. JWST follow-up spectroscopy during transit reveals atmospheric composition (H₂O, CO₂, CH₄) — transmission spectroscopy.",icon:(0,t.jsx)(es.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"ΔF/F = (Rp/Rs)²  ·  transit_dur ≈ P·(Rs/a)·(1/π)  ·  a³ = GM·T²/(4π²)"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Flux dip = area ratio. Transit duration gives orbital inclination; period gives semi-major axis (Kepler 3rd law)."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"Detection limit"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"Earth-Sun: ΔF/F ≈ 84 ppm"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Kepler's photometric precision (20 ppm/hr) made Earth-size planet detection around Sun-like stars possible — first in 2009."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-amber-600 dark:text-amber-400 mb-1",children:"Hot Jupiter"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"HD 209458b: ΔF/F ≈ 1.5%"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"First transit detection (1999, Charbonneau). Large planet + short period = deep + frequent dips — easiest to find."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/40 bg-violet-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-violet-600 dark:text-violet-400 mb-1",children:"Atmospheric follow-up"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"F(λ) = F₀(λ)·(1 − δ_atm(λ))"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"JWST transmission spectroscopy: wavelength-dependent transit depth reveals atmospheric absorption bands (H₂O, CO₂, CH₄)."})]})]})]})}),(0,t.jsx)(a.SectionCard,{title:"Gravitational wave strain — h = (4G/c⁴)(d²I/dt²)/r",description:"General relativity predicts that accelerating mass quadrupoles radiate gravitational waves at the speed of light. The strain h ≈ (4G/c⁴)·(d²I/dt²)/r — for two black holes merging 1.3 billion light-years away (GW150914), the dimensionless strain at Earth was h ≈ 10⁻²¹, meaning a 4-km LIGO arm changed length by ~10⁻¹⁸ m (1/1000 of a proton diameter). LIGO measures this via laser interferometry — the most precise length measurement humanity has ever made.",icon:(0,t.jsx)(es.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"h ≈ (4G/c⁴)·(d²I/dt²)/r  ·  h_+ = ΔL/L"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Quadrupole formula — strain scales as the second time-derivative of the mass quadrupole I_ij, divided by distance r."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"Strain amplitude"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"h ~ 10⁻²¹"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"For GW150914 at 410 Mpc. A 4-km arm stretches by 4×10⁻¹⁸ m — 1/1000 of a proton's diameter."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-amber-600 dark:text-amber-400 mb-1",children:"Chirp signal"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"f(ḟ) = (1/π)·(5/256)^(3/8)·(GM_c/c³)^(-5/8)·f^(-11/8)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Frequency rises as BHs inspiral. The chirp mass M_c = (m1·m2)^(3/5)/(m1+m2)^(1/5) is the dominant measurable."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/40 bg-violet-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-violet-600 dark:text-violet-400 mb-1",children:"Matched filtering"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"SNR² = 4·∫|h̃(f)|²/S_n(f) df"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Template bank of ~300k chirps. Mathematically equivalent to a single-layer NN with the template as the filter kernel."})]})]})]})}),(0,t.jsx)(a.SectionCard,{title:"LHC jet substructure — n-subjettiness τ_N",description:"At the LHC, quarks and gluons produced in 13 TeV proton-proton collisions hadronise into collimated sprays called jets. Jet substructure observables like n-subjettiness discriminate N-prong jets: τ_N = (1/Σp_T)·Σ_k min(p_Tk^β, Σ_i p_Ti^β·(ΔR_ik/R0)^β). For a quark/gluon jet (1-prong), τ_1 ≈ 0; for W→qq' (2-prong), τ_21 = τ_2/τ_1 < 0.45; for top→qqq (3-prong), τ_32 = τ_3/τ_2 < 0.75. Modern taggers replace hand-crafted τ ratios with JetGNNs (ParticleNet) — the same graph-analytics paradigm as systems-biology PPI networks.",icon:(0,t.jsx)(I.Network,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsxs)("p",{className:"font-mono text-sm text-primary",children:["τ_N = (1/Σp_","{T}",")·Σ_k min(p_","{Tk}","^β, Σ_i p_","{Ti}","^β·(ΔR_","{ik}","/R0)^β)"]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"N-subjettiness — measures how well the jet's constituents align with N subjets. Smaller τ_N relative to τ_1 means N-prong structure."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"Quark/gluon jet (1-prong)"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"τ_1 ≈ 0, τ_2 ≈ τ_1"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Single hard particle carries most p_T. τ_21 ≈ 1 — no substructure. Hardest to tag — relies on radiation patterns."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-amber-600 dark:text-amber-400 mb-1",children:"W/Z jet (2-prong)"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"τ_21 = τ_2/τ_1 < 0.45"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"W→qq' produces two prongs. τ_2 small relative to τ_1 — constituents align with 2 subjets."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/40 bg-violet-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-violet-600 dark:text-violet-400 mb-1",children:"Top jet (3-prong)"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"τ_32 = τ_3/τ_2 < 0.75"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"t→bW→bqq' produces three prongs. τ_3 small relative to τ_2 — constituents align with 3 subjets."})]})]})]})}),(0,t.jsx)(a.SectionCard,{title:"Try it: Kepler orbit, transit light curve, 3-body, jet 4-vector (Pyodide)",icon:(0,t.jsx)(ei.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:eh,buttonLabel:"Run space-science simulator (Pyodide)"})}),(0,t.jsx)(a.SectionCard,{title:"Low-level PyTorch — TransitCNN, GravitationalWaveClassifier, JetGNN",icon:(0,t.jsx)(p.Cpu,{className:"h-5 w-5"}),badge:"low-level",children:(0,t.jsx)(c.CodeBlock,{language:"python",filename:"space_science_pytorch.py",code:em})}),(0,t.jsx)(a.SectionCard,{title:"Modern papers — Kepler, TESS, LIGO, LHC, JWST",icon:(0,t.jsx)(m.Atom,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Kepler Mission (Borucki et al. 2010, ApJL 713:L126):"})," The Kepler space telescope (2009–2018) monitored 150,000 stars for transits, discovering 2,778 confirmed exoplanets and ~4,000 candidates. Demonstrated that Earth-size planets around Sun-like stars are common (~10% occurrence rate). The mission's photometric precision (20 ppm/hr on a 12th-magnitude star) enabled the first rocky-planet detections. The Kepler Input Catalogue and TESS Input Catalogue together index 1.7 billion stars — the most extensive stellar database ever compiled."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"TESS Mission (Ricker et al. 2015, JATIS 1:014003):"})," The Transiting Exoplanet Survey Satellite (2018–) surveys the entire sky in 26-sectored 27-day pointings, focusing on bright (V < 12) stars for follow-up characterisation. TESS has discovered 400+ confirmed exoplanets and 6,000+ candidates (TOIs). The mission produces ~200M light curves in its prime survey — each ~30,000 cadences of 2-min or 20-sec integrations — all stored in the MAST archive as Parquet + FITS files."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"LIGO GW150914 (Abbott et al. 2016, PRL 116:061102):"})," First direct detection of gravitational waves — the inspiral and merger of two black holes (36 + 29 solar masses) 410 Mpc away. The signal, observed on 14 September 2015, swept through LIGO's two 4-km interferometers (Hanford + Livingston) with a 6.9 ms delay matching light-speed travel between sites. Strain amplitude h ≈ 10⁻²¹ — the most precise length measurement ever made. By the end of O3 (2020), LIGO/Virgo had catalogued 90 GW events (50 BBH, 2 BNS, 1 NSBH, 37 marginal)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"LHC Higgs Boson (ATLAS + CMS, 2012, PLB 716:1–29):"})," Discovery of the Higgs boson at m_H ≈ 125 GeV, confirming the Standard Model's last unverified prediction (Higgs 1964). The LHC produces 40 million collisions per second at 13 TeV — only ~1000 events/s survive the trigger. After zero-suppression, ATLAS + CMS together record ~1 PB/year. Jet substructure algorithms (anti-kT, n-subjettiness, JetGNNs) identify boosted H→bb̄, W→qq', top→bqq' — the LHC's biggest machine-learning pipeline."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"JWST Early Galaxies (Naidu et al. 2022, ApJL):"})," JWST's CEERS survey revealed galaxy candidates at z ≈ 10–17 (within 300 million years of the Big Bang) — far earlier than Hubble could see. The photometric redshift technique (Lyman-break dropout) plus NIRSpec follow-up spectroscopy confirmed Lyman-α emission. JWST produces ~10 TB/day of raw imaging — Cal pipeline outputs are stored at MAST as Parquet/Arrow tables for community querying. Early-galaxy observations challenge Λ-CDM cosmology — some galaxies appear too massive too soon."]})]})}),(0,t.jsx)(a.SectionCard,{title:"HPC pipeline — telescope data → calibration → ML detection → human validation → publication",description:"End-to-end space-science HPC pipeline. Raw detector data (LHC 1 PB/year, LIGO 1 TB/day, TESS 200M light curves, JWST 10 TB/day) is calibrated and stored in Apache Parquet/Arrow (ADR-003). ML models (TransitCNN, GravitationalWaveClassifier, JetGNN) run distributed inference on Spark clusters (ADR-002). Multi-messenger coincidence (GW + EM + neutrino) filters candidates; human validation confirms; results are archived at MAST / Zenodo with DOIs and published in ApJ / PRD / Nature Astronomy. Wall-clock ranges from seconds (LIGO alerts) to years (final mission catalogues).",icon:(0,t.jsx)(x.Activity,{className:"h-5 w-5"}),children:(0,t.jsx)(c.CodeBlock,{language:"text",filename:"space_science_pipeline.txt",code:ep})}),(0,t.jsx)(a.SectionCard,{title:"My deeper thought: space science IS the ultimate big-data problem",icon:(0,t.jsx)(er.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The numbers are unambiguous: LHC ~1 PB/year, LIGO ~1 TB/day, TESS 200M light curves, JWST 10 TB/day."})," The LHC's ATLAS + CMS experiments together produce roughly one petabyte of physics data per year after trigger zero-suppression — comparable to the entire compressed Wikipedia corpus, every year, from a single machine. LIGO's twin interferometers stream ~1 TB/day of strain data at 4096 Hz; the cross-correlation matched-filter bank against ~300,000 chirp templates multiplies this. TESS's prime mission generated ~200M light curves — each ~30,000 cadences of 30-min integrations. JWST's NIRCam alone produces ~10 TB/day of raw imaging. The universe is, in the literal sense, the largest dataset humanity has ever tried to analyse — and the same Apache Spark / Parquet / Arrow stack that powers ADR-002 (the Databricks Lakehouse) is the software stack the space-science community adopted decades ago. The platform's modern-big-data page (BigQuery / DuckDB / Spark Streaming / Flink / Kafka / Iceberg) is the same software, applied to terrestrial financial data instead of astrophysical data. The data engineering is identical; only the schema differs."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The mathematics unifies too."})," Kepler's 3rd law T² = (4π²/GM)·a³ is a power law — the same log-log scaling (T ∝ a^1.5) that pervades empirical science: Zipf's law of word frequencies, Pareto's law of wealth distribution, allometric scaling in biology (Kleiber's law: metabolic rate ∝ body_mass^0.75). The transit depth ΔF/F = (Rp/Rs)² is a quadratic area ratio — the same form as a Bayesian probability ratio in any classifier. LIGO's matched filtering is mathematically equivalent to a single-layer neural network with the chirp template as the filter kernel — the matched filter's SNR² = 4∫|h̃(f)|²/S_n(f) df is the same quadratic form as the χ² statistic and as the discriminant function of a Gaussian classifier. JetGNN's EdgeConv on ΔR-distance graphs is identical to the systems-biology PPI network's GNN (proteins as nodes, interaction edges — ADR-053) and the alphaproteo binder-target GNN (residues as nodes, distance edges). The n-subjettiness τ_N formula is a weighted-sum normalisation — the same form as a softmax attention score. Every page on this platform is, mathematically, an instance of the same few primitives: weighted sums over graphs, log-log power laws, quadratic discriminants."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"This unifies the entire platform under one analytical stack."})," ADR-049 (neural-network potentials — SO(3) irreps for equivariance) is the same mathematics that solves the orbital-mechanics angular-momentum conservation: SO(3) is the rotation group, and equivarient networks respect it for exactly the reason Kepler's 2nd law (equal areas in equal times) holds — angular momentum conservation is an SO(3) symmetry. ADR-053 (systems-biology — PPI networks + multi-omics graphs) uses the same graph analytics as JetGNN: nodes are entities (proteins or particles), edges are relationships (interactions or ΔR proximity), and the message-passing paradigm is identical. ADR-002 (Databricks Lakehouse — Spark + Parquet + Delta) is the same software stack that LIGO's Data Grid uses for matched-filter searches and that MAST uses for TESS archive queries. The progression — classical orbital mechanics (Kepler 1619) → relativistic gravity (Einstein 1916) → computational big-data astronomy (Borucki 2010, Abbott 2016) — is the same ladder of mathematical tools, scaling from analytic power laws to learned graph neural networks, applied to the same universe. The universe IS the largest dataset, and the platform's entire computational-science arc converges on its analysis: from SO(3) orbital symmetries (neural-network-potentials) to graph analytics (systems-biology) to petabyte-scale storage (databricks). Every data scientist working on this platform is, indirectly, doing space science."]})]})}),(0,t.jsx)(a.SectionCard,{title:"Cross-disciplinary elegance — Euler's Method bridges orbital mechanics, game physics, and financial modelling",description:"Euler's Method (y(t+Δt) = y(t) + f(t,y)×Δt) IS the seed of all simulation. The simplest ODE integrator powers satellite trajectory propagation (NASA GMAT), game-engine physics loops (Unity fixed step), and financial SDE simulation (Black-Scholes Monte Carlo) — because all three discretise a continuous-time equation into steps. Every numerical simulation you've ever seen is a fancier version of Euler.",icon:(0,t.jsx)(w.Sparkles,{className:"h-5 w-5"}),badge:"elegant code",children:(0,t.jsx)(en.DatasetCards,{examples:eo.ELEGANT_CODE_CARDS.filter((e,t)=>8===t),intro:"Euler's Method (orbital mechanics ↔ games ↔ finance): the SAME first-order integrator powers satellite propagation, game physics, and option pricing — because all three discretise continuous dynamics."})}),(0,t.jsx)(et.RelatedElegantCode,{hostPage:"space-science"}),(0,t.jsxs)(el.DeeperThoughtSection,{pageTitle:"Space Science",children:[(0,t.jsx)(el.DeeperThought,{title:"Space science IS the ultimate big-data problem — and it's multi-disciplinary by definition",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"JWST generates 50 GB/day of raw images. LHC produces 1 PB/second of collision data (reduced to 1 PB/year after filtering). Gaia DR3 has 1.8 billion stars × 30 parameters. Kepler/TESS found 5,000+ exoplanets from light curves. Each dataset requires a different mathematical tool: FFT (period detection in light curves), SVD (dimensionality reduction in spectra), Kalman (orbit estimation from noisy radar), Haversine (angular separation on the celestial sphere). Space science IS the platform's thesis in miniature: ONE dataset, MANY equations, ALL needed."})}),(0,t.jsx)(el.DeeperThought,{title:"Kepler's third law IS the power law — and it's universal",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"Kepler's T² = (4π²/GM)·a³ IS a power law: T ∝ a^(3/2). Power laws appear everywhere: in wealth (Pareto), in city sizes (Zipf), in earthquake magnitudes (Gutenberg-Richter), in internet topology (scale-free networks). The SAME mathematical form (y ∝ x^α) governs planetary orbits, wealth distribution, and network degree. Kepler discovered a power law in 1619 — 250 years before Pareto. The math IS the connection between 17th-century astronomy and 20th-century economics."})}),(0,t.jsx)(el.DeeperThought,{title:"Transit photometry IS FFT — detecting planets from periodic brightness dips",connectedTo:"ADR-051 (living-equation pages)",children:(0,t.jsx)("p",{children:"Kepler/TESS detect exoplanets by measuring star brightness over time. When a planet transits, brightness dips by ~0.01% (for Earth-sized planet around Sun-sized star). The transit IS periodic (orbital period). Detecting it IS FFT: the light curve's frequency spectrum has a peak at 1/orbital_period. The SAME FFT that separates C-major chord notes detects exoplanets. The math (FFT) IS the bridge between audio and astronomy."})}),(0,t.jsx)(el.DeeperThought,{title:"The Drake equation IS Bayesian — and it's the right framework for SETI",connectedTo:"ADR-007 (Bayesian methods)",children:(0,t.jsx)("p",{children:"Drake's equation N = R* · fp · ne · fl · fi · fc · L estimates the number of communicative civilisations. Each factor IS a prior probability. The equation IS Bayes' theorem applied to existential risk: P(civilisation | observation) = P(observation | civilisation) · P(civilisation) / P(observation). The factors are uncertain (priors range over orders of magnitude). The Bayesian framework IS the right one: it quantifies uncertainty, updates with new data (exoplanet counts from Kepler), and doesn't pretend to know more than it does."})}),(0,t.jsx)(el.DeeperThought,{title:"Gaia's 1.8 billion stars IS the largest PCA ever — and it found the Milky Way's history",connectedTo:"ADR-034 (ESM-2 + AlphaFold2)",children:(0,t.jsx)("p",{children:"Gaia DR3 measures positions, proper motions, and radial velocities for 1.8 billion stars. PCA on this 1.8B × 30 matrix reveals the Milky Way's structure: spiral arms, globular clusters, tidal streams from disrupted dwarf galaxies. The SAME PCA that recovers Out-of-Africa from 1000-Genomes recovers the Milky Way's merger history from Gaia. The top principal components ARE the galactic structure — just as the top PCs of genetic variation ARE the ancestral migrations. SVD IS the universal decomposer, from DNA to galaxies."})})]}),(0,t.jsx)(ea.RelatedTopics,{topics:[{id:"databricks",reason:"Spark for JWST/LIGO analysis"},{id:"streaming",reason:"Kafka for real-time event streams"},{id:"quantum-computing",reason:"LHC jet substructure + QEC"},{id:"arrow",reason:"Columnar format for telescope data"}]}),(0,t.jsx)(o.ResearchDemo,{pageId:"space-science"}),(0,t.jsx)(l.TrendAnticipation,{pageId:"space-science"}),(0,t.jsx)(n.NextSteps,{relatedPages:[{id:"connections",reason:"See Euler's Method's cousin cards in the cross-disciplinary graph"},{id:"computational-biology",reason:"Verlet (Verlet IS time-reversal symmetry) — same math, MD domain"},{id:"fintech",reason:"Geometric Brownian Motion (GBM IS the universal multiplicative-noise equation) — same math, fintech domain"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(s.default,{href:(0,ee.hrefFor)("neural-network-potentials"),className:"text-sm text-primary hover:underline",children:"→ Neural Network Potentials (SO(3) irreps — same symmetry as orbital mechanics)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,ee.hrefFor)("systems-biology"),className:"text-sm text-primary hover:underline",children:"→ Systems Biology (same graph analytics as JetGNN)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,ee.hrefFor)("databricks"),className:"text-sm text-primary hover:underline",children:"→ Databricks (Spark + Parquet for PB-scale space data)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(s.default,{href:(0,ee.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ Knowledge (ADR-053: graph analytics across domains)"})]})]})}e.s(["SpaceSciencePage",()=>ex],777383)}]);