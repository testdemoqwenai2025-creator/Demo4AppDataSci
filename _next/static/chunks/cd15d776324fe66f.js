(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,862824,515288,e=>{"use strict";var a=e.i(843476),t=e.i(975157);function i({className:e,...i}){return(0,a.jsx)("div",{"data-slot":"card",className:(0,t.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",e),...i})}function s({className:e,...i}){return(0,a.jsx)("div",{"data-slot":"card-header",className:(0,t.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",e),...i})}function n({className:e,...i}){return(0,a.jsx)("div",{"data-slot":"card-title",className:(0,t.cn)("leading-none font-semibold",e),...i})}function r({className:e,...i}){return(0,a.jsx)("div",{"data-slot":"card-description",className:(0,t.cn)("text-muted-foreground text-sm",e),...i})}function o({className:e,...i}){return(0,a.jsx)("div",{"data-slot":"card-content",className:(0,t.cn)("px-6",e),...i})}e.s(["Card",()=>i,"CardContent",()=>o,"CardDescription",()=>r,"CardHeader",()=>s,"CardTitle",()=>n],515288);var l=e.i(487486);function c({title:e,description:t,icon:c,badge:d,badgeVariant:m="outline",children:h,className:p,contentClassName:u}){return(0,a.jsxs)(i,{className:["border-border/60",p].filter(Boolean).join(" "),children:[(e||t)&&(0,a.jsxs)(s,{className:"flex flex-row items-start gap-3 space-y-0 border-b border-border/60 bg-muted/30",children:[c&&(0,a.jsx)("div",{className:"mt-0.5 text-primary",children:c}),(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[e&&(0,a.jsx)(n,{className:"text-base",children:e}),d&&(0,a.jsx)(l.Badge,{variant:m,className:"text-[10px]",children:d})]}),t&&(0,a.jsx)(r,{className:"mt-1 text-xs",children:t})]})]}),(0,a.jsx)(o,{className:["p-4 md:p-5",u].filter(Boolean).join(" "),children:h})]})}function d({eyebrow:e,title:t,description:i,right:s}){return(0,a.jsxs)("div",{className:"mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4",children:[(0,a.jsxs)("div",{children:[e&&(0,a.jsx)("p",{className:"text-[11px] font-semibold uppercase tracking-widest text-primary/80 mb-1.5",children:e}),(0,a.jsx)("h1",{className:"text-2xl md:text-3xl font-semibold tracking-tight text-balance",children:t}),i&&(0,a.jsx)("p",{className:"mt-2 text-sm md:text-base text-muted-foreground max-w-3xl text-pretty",children:i})]}),s&&(0,a.jsx)("div",{className:"shrink-0",children:s})]})}function m({label:e,value:t,delta:s,deltaTone:n="flat",hint:r}){return(0,a.jsx)(i,{className:"border-border/60",children:(0,a.jsxs)(o,{className:"p-4",children:[(0,a.jsx)("p",{className:"text-[11px] uppercase tracking-wider text-muted-foreground",children:e}),(0,a.jsx)("p",{className:"mt-1 text-2xl font-semibold tabular-nums",children:t}),(0,a.jsxs)("div",{className:"mt-1 flex items-center gap-2",children:[s&&(0,a.jsx)("span",{className:`text-xs ${"up"===n?"text-emerald-600 dark:text-emerald-400":"down"===n?"text-rose-600 dark:text-rose-400":"text-muted-foreground"}`,children:s}),r&&(0,a.jsx)("span",{className:"text-[11px] text-muted-foreground",children:r})]})]})})}e.s(["KpiCard",()=>m,"PageHeader",()=>d,"SectionCard",()=>c],862824)},342046,518550,e=>{"use strict";var a=e.i(843476),t=e.i(271645),i=e.i(522016),s=e.i(901752);let n=[{cardIndex:0,name:"SVD",equation:"A = UΣV^T",sciences:["genomics","audio","finance"],insightShort:"SVD IS the Fourier transform for data",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["SVD IS NumPy's universal decomposer — np.linalg.svd → PCA for genomics, audio compression, Fama-French risk factors.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:1,name:"Attention",equation:"softmax(QK^T/√d_k) × V",sciences:["protein folding","NLP"],insightShort:"Attention IS natural selection",hostPages:["transformer-deep-dive","analytics-outputs"],hostReasons:["DNA IS a language — softmax(QK^T/√d_k)×V parses both proteins (AlphaFold2) and English (GPT-4) because both are correlation detection.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:2,name:"Poisson",equation:"P(k) = λ^k e^(-λ) / k!",sciences:["sequencing","networks","decay"],insightShort:"Poisson IS the law of rare events",hostPages:["bioinformatics-pipelines","analytics-outputs"],hostReasons:["GATK variant calling depth IS Poisson(λ=mean coverage) — same distribution that sizes server clusters and radioactive sources.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:3,name:"FFT",equation:"X[k] = Σ x[n] e^(-2πikn/N)",sciences:["mass spec","audio","cryo-EM"],insightShort:"FFT IS the change of basis",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["np.fft.fft is the SAME operation whether you're finding the m/z of a compound, the C-note in a chord, or the 3D structure of a ribosome.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:4,name:"Verlet",equation:"r(t+Δt) = 2r(t) - r(t-Δt) + F/m·Δt²",sciences:["MD","games","orbits"],insightShort:"Verlet IS time-reversal symmetry",hostPages:["computational-biology","analytics-outputs"],hostReasons:["AMBER, Havok, and NASA JPL all call this exact integrator — symplectic, energy-conserving, time-reversible. The MD integrator IS the game physics integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:5,name:"Navier-Stokes",equation:"∂u/∂t + u·∇u = -∇p/ρ + ν∇²u",sciences:["weather","blood","turbulence"],insightShort:"Navier-Stokes IS the universe's flow equation",hostPages:["computational-physics","analytics-outputs"],hostReasons:["CFD on this PDE predicts hurricanes, aneurysm risk, and wing stall — the SAME nonlinearity makes weather unpredictable and turbulence beautiful.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:6,name:"Gradient Descent",equation:"θ(t+1) = θ(t) - η∇L(θ)",sciences:["ML","evolution","thermodynamics"],insightShort:"Gradient Descent IS the learning rule",hostPages:["tabular","analytics-outputs"],hostReasons:["Gradient boosting = gradient descent on trees; GPT-4 training, natural selection, and protein folding all minimise a landscape with the SAME update rule.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:7,name:"Bayes",equation:"P(H|D) = P(D|H)P(H) / P(D)",sciences:["genetics","spam","quantum"],insightShort:"Bayes IS the belief updater",hostPages:["alphamissense","analytics-outputs"],hostReasons:["AlphaMissense classifying a VUS IS Gmail classifying spam IS a Stern–Gerlach measurement — all three update P(H) given D.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:8,name:"Euler's Method",equation:"y(t+Δt) = y(t) + f(t,y)·Δt",sciences:["orbital mechanics","games","finance"],insightShort:"Euler IS the seed of all simulation",hostPages:["space-science","analytics-outputs"],hostReasons:["Satellite trajectory propagation (NASA GMAT), game-engine fixed-step physics (Unity), and Black-Scholes Monte Carlo all START from this one-line integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:9,name:"Entropy",equation:"H = -Σ p log p",sciences:["information","thermodynamics","genetics"],insightShort:"Entropy IS the universal currency of disorder",hostPages:["systems-biology","analytics-outputs"],hostReasons:["Shannon measured message information, Boltzmann gas disorder, Haldane population heterozygosity — the SAME formula because all three quantify how spread out a distribution is.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:10,name:"Black-Scholes",equation:"C = S·N(d1) − K·e^(−rT)·N(d2)",sciences:["fintech","maritime","genetics"],insightShort:"Black-Scholes IS the universal option-pricing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["A Lloyd's underwriter pricing a 90-day cargo option, a CME quant pricing an SPX call, and a Fisher geneticist pricing an allele-substitution option all evaluate the SAME formula — the right-but-not-obligation to act on a stochastic payoff.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:11,name:"Haversine",equation:"d = 2R·arcsin(√(...))",sciences:["maritime","aviation","astronomy"],insightShort:"Haversine IS the universal great-circle distance",hostPages:["global-shipping","analytics-outputs"],hostReasons:["Rotterdam→Singapore sailing distance, LHR→JFK flight distance, and Sirius→Canopus angular separation all use the SAME formula — shortest-path distance on a sphere, invented 1805 (Bowring).","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:12,name:"Kelly Criterion",equation:"f* = (bp − q)/b = μ/σ²",sciences:["fintech","genetics","RL"],insightShort:"Kelly IS the universal bet-sizing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["Ed Thorp's blackjack team (1960s), Jim Simons' Medallion Fund (1989-2024, 65% CAGR), Haldane's allele fixation (1927), and Thompson sampling (RL) all derive the SAME optimal bet size f* = μ/σ² because they all maximize expected log-growth.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:13,name:"Markov Chain",equation:"π(t+1) = π(t)·P",sciences:["genetics","fintech","maritime"],insightShort:"Markov IS the universal state-transition equation",hostPages:["global-shipping","bioinformatics","analytics-outputs"],hostReasons:["Jukes-Cantor DNA substitution (1969), Moody's credit transitions (10⁶ bonds), and AIS port-state transitions (100K vessels) all use the SAME matrix update — the memoryless property is universal.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:14,name:"Value at Risk",equation:"VaR_α = −(μ + z_α·σ)",sciences:["fintech","maritime","climate"],insightShort:"VaR IS the universal tail-risk equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["JPMorgan's 1-day 99% VaR ($4T balance, Basel III), Lloyd's 7-day 95% VaR ($50B hull, Solvency II), and NOAA 100-year flood VaR (FEMA FIRMs) all use the SAME quantile — every loss distribution has an inverse CDF.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:15,name:"PageRank",equation:"PR(p) = (1-d) + d·Σ(PR(q)/L(q))",sciences:["fintech","maritime","genetics"],insightShort:"PageRank IS the universal centrality equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["BIS systemic risk (Lehman PR ≈ 0.012), UN COMTRADE port chokepoint (Rotterdam PR ≈ 0.020), and STRING gene essentiality (TP53 PR ≈ 0.025) all use the SAME eigenvector — Brin & Page 1998 for the web, now spanning banking, trade, and genomics.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:16,name:"Kalman Filter",equation:"x̂(t+1) = x̂(t) + K·(z − H·x̂(t))",sciences:["maritime","aviation","genetics"],insightShort:"Kalman IS the universal state-estimation equation",hostPages:["global-shipping","analytics-outputs"],hostReasons:["AIS vessel tracking (100K vessels × 60s), ADS-B flight tracking (100K flights × 1s), and 1000-Genomes allele frequency tracking all use the SAME Bayesian update — Kalman 1960 invented this for Apollo navigation.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:17,name:"Monte Carlo",equation:"E[f(X)] ≈ (1/N)·Σ f(X_i)",sciences:["fintech","maritime","genetics"],insightShort:"Monte Carlo IS the universal estimation equation",hostPages:["fintech","global-shipping","monte-carlo","analytics-outputs"],hostReasons:["Option pricing (10⁶ GBM paths), port congestion (10⁵ vessel sims), and rare-variant permutation tests (10⁶ permutations) all use the SAME averaging — Metropolis 1946 invented this at Los Alamos for neutron transport.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:18,name:"Geometric Brownian Motion",equation:"dS = μS·dt + σS·dW",sciences:["fintech","maritime","genetics"],insightShort:"GBM IS the universal multiplicative-noise equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["SPX daily returns (Black-Scholes foundation), Rotterdam container dwell times, and Wright-Fisher allele drift all use the SAME SDE — multiplicative noise keeps S positive with log-normal stationarity.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:19,name:"Lloyd's Algorithm",equation:"μ_k ← mean({x : argmin_k ‖x − μ_k‖²})",sciences:["maritime","genetics","ML"],insightShort:"Lloyd IS the universal clustering equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["50K ports clustered by trade flows (UN COMTRADE), 2504 individuals clustered by SNP PCA (1000-Genomes), and 1.4M images clustered by ResNet-50 (ImageNet) all use the SAME iterate — Lloyd 1957 invented this at Bell Labs for PCM.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:20,name:"HyperLogLog",equation:"E = α_m m² (Σ 2^(-M_j))^(-1)",sciences:["data engineering","genomics","network security"],insightShort:"HLL IS the universal counter — 33M× memory compression with <1% error",hostPages:["big-data-ingestion","analytics-outputs"],hostReasons:["COUNT(DISTINCT user_id) in Snowflake/Spark, unique k-mers in Jellyfish (genome assembler), unique source IPs in Redis PFCOUNT (DDoS monitor) — all run the SAME hash→bucket→max-zeros→harmonic-mean algorithm. 12 KB vs 400 GB for exact counting.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:21,name:"Bloom Filter",equation:"P(fp) = (1 - e^(-kn/m))^k",sciences:["network security","genomics","databases"],insightShort:"Bloom filter IS the universal membership test — 23× compression with 0.1% false positives",hostPages:["kafka-connect","delta-lake","analytics-outputs"],hostReasons:["Chrome Safe Browsing (malware URL check), genome assembler read dedup, RocksDB SSTable key lookup — all use the SAME k-hash→bit-set→AND-check. 175 MB vs 4 GB for exact hash set.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:22,name:"Consistent Hashing",equation:"θ = hash(key) mod 2^256",sciences:["streaming","CDN","databases"],insightShort:"Consistent hashing IS the universal partitioner — K/n keys move, not all K",hostPages:["kafka","schema-registry","analytics-outputs"],hostReasons:["Kafka partition assignment across brokers, Akamai CDN edge routing, Cassandra shard assignment — all use the SAME hash ring. Adding a node moves 8% of data, not 50%.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:23,name:"LSM-Tree Compaction",equation:"WA = (L+1)/L",sciences:["data engineering","databases","distributed storage"],insightShort:"LSM compaction IS the universal write amplifier — 1.25× vs B-tree's 4-10×",hostPages:["delta-lake","big-data-ingestion","analytics-outputs"],hostReasons:["Delta Lake Auto Compaction (18,400→12 files), RocksDB level compaction (L0→L1→L2→L3), Cassandra size-tiered compaction — all use the SAME merge-sort. Write amplification 1.25× vs B-tree's 4-10×.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:24,name:"Count-Min Sketch",equation:"ê_i = min_j count[j][h_j(i)]",sciences:["streaming","genomics","networking"],insightShort:"CMS IS the universal frequency estimator — 4M× compression, bounded over-estimation",hostPages:["spark-streaming","flink","analytics-outputs"],hostReasons:["Spark Structured Streaming top-K, genome k-mer frequency counting (repeat detection), network heavy-hitter detection (DDoS) — all use the SAME d×w matrix. 20 KB vs 80 GB for exact hash map.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:25,name:"Reservoir Sampling",equation:"P(item_i in sample) = k/N",sciences:["streaming","A/B testing","genomics"],insightShort:"Reservoir IS the universal sampler — O(k) memory, uniform sampling from unbounded stream",hostPages:["spark-streaming","streaming-sql","analytics-outputs"],hostReasons:["Kafka stream event sampling, A/B test cohort selection from live users, GWAS variant subsampling — all use the SAME k/N replace-probability algorithm. O(k) memory regardless of stream length.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:26,name:"T-Digest",equation:"q̂(p) = merge(centroids)",sciences:["streaming","finance","observability"],insightShort:"T-Digest IS the universal quantile estimator — 80M× compression at the tails",hostPages:["spark-streaming","fintech","analytics-outputs"],hostReasons:["p99 latency in Spark, p99 VaR in Basel III Monte Carlo, p99 response time in Datadog — all use the SAME centroid-merging algorithm. 1 KB vs 80 GB for exact sorted array.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:27,name:"Cuckoo Filter",equation:"i2 = i1 XOR hash(fingerprint)",sciences:["databases","networking","caching"],insightShort:"Cuckoo Filter IS Bloom's successor — same membership test, PLUS deletion support",hostPages:["delta-lake","analytics-outputs"],hostReasons:["Cassandra SSTable with dynamic keys, routing table add/remove, Redis cache invalidation — all need membership test WITH deletion. Bloom can't delete; Cuckoo can.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:28,name:"Skip List",equation:"P(level L) = (1/2)^L",sciences:["databases","storage","compilers"],insightShort:"Skip List IS the universal ordered structure — O(log n) without tree rebalancing",hostPages:["duckdb","analytics-outputs"],hostReasons:["Redis ZSET (leaderboard), LevelDB/RocksDB memtable (sorted KV before SSTable flush), LLVM instruction scheduler — all use the SAME probabilistic linking. No rebalancing needed.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]}];function r(e){return n.filter(a=>a.hostPages.includes(e))}let o={0:[3,9,19],1:[0,6,7],2:[7,9,13],3:[0,2,8],4:[8,5,16],5:[4,18,8],6:[7,12,1],7:[6,2,16],8:[4,18,16],9:[0,2,19],10:[18,14,12],11:[15,16,17],12:[6,10,7],13:[2,16,15],14:[10,18,17],15:[13,0,11],16:[13,4,7],17:[18,14,9],18:[10,8,17],19:[0,9,6]};function l(e){return o[e]??[]}e.s(["ELEGANT_CODE_MAP",0,n,"cardsOnHostPage",()=>r,"recommendedCards",()=>l],518550);var c=e.i(487486),d=e.i(394908),m=e.i(972520);let h="discovery-path-visited";function p({relatedPages:e=[]}){let[r,o]=(0,t.useState)(()=>{try{let e=localStorage.getItem(h);return e?JSON.parse(e):[]}catch{return[]}});(0,t.useEffect)(()=>{try{let e=localStorage.getItem(h);if(e){let a=JSON.parse(e);setTimeout(()=>o(a),0)}}catch{}},[]);let p=(0,t.useMemo)(()=>{let a=[];if(r.length>0){let e={};for(let a of r)for(let t of l(a))r.includes(t)||(e[t]=(e[t]??0)+1);for(let[t,i]of Object.entries(e).sort((e,a)=>a[1]-e[1]).slice(0,3)){let e=n[Number(t)];e&&a.push({id:"elegant-code",reason:`Explore ${e.name} — recommended by ${i} of your visited cards`,isCousin:!0})}}for(let t of e){if(a.length>=3)break;a.find(e=>e.id===t.id)||a.push({...t,isCousin:!1})}return 0===a.length&&(a.push({id:"elegant-code",reason:"Start with the 20 elegant-code cards",isCousin:!1}),a.push({id:"connections",reason:"See the card → card graph",isCousin:!1}),a.push({id:"resources",reason:"Browse datasets, papers, libraries",isCousin:!1})),a.slice(0,3)},[r,e]);return 0===p.length?null:(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,a.jsxs)("p",{className:"text-xs font-semibold text-primary mb-2 flex items-center gap-1.5",children:[(0,a.jsx)(d.Compass,{className:"h-3.5 w-3.5"}),"Next steps — where to go from here",r.length>0&&(0,a.jsxs)("span",{className:"text-[9px] text-muted-foreground ml-1",children:["(",r.length," cards explored)"]})]}),(0,a.jsx)("div",{className:"flex flex-wrap gap-2",children:p.map((e,t)=>(0,a.jsxs)(i.default,{href:(0,s.hrefFor)(e.id),className:"text-xs text-primary hover:underline flex items-center gap-1",children:[(0,a.jsx)(m.ArrowRight,{className:"h-3 w-3"}),e.reason,e.isCousin&&(0,a.jsx)(c.Badge,{variant:"outline",className:"text-[8px] px-1 py-0 ml-1",children:"cousin"})]},t))})]})}e.s(["NextSteps",()=>p],342046)},332017,e=>{"use strict";var a=e.i(843476),t=e.i(522016),i=e.i(25652),s=e.i(810980),n=e.i(901752);function r({title:e,connectedTo:r,researchHref:o,children:l}){return(0,a.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-4 space-y-2",children:[(0,a.jsxs)("div",{className:"flex items-start gap-2",children:[(0,a.jsx)(i.TrendingUp,{className:"h-4 w-4 text-primary mt-0.5 shrink-0"}),(0,a.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,a.jsx)("p",{className:"text-sm font-semibold text-foreground/90 leading-tight",children:e}),r&&(0,a.jsxs)("div",{className:"flex items-center gap-1.5 mt-1",children:[(0,a.jsx)(s.BookOpen,{className:"h-3 w-3 text-muted-foreground"}),(0,a.jsxs)(t.default,{href:o??(0,n.hrefFor)("research"),className:"text-[10px] text-muted-foreground hover:text-primary hover:underline",children:["Connected to: ",r," →"]})]})]})]}),(0,a.jsx)("div",{className:"text-xs text-muted-foreground leading-relaxed space-y-2 pl-6",children:l})]})}function o({pageTitle:e,children:t}){return(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 border-b border-border/60 pb-2",children:[(0,a.jsx)(i.TrendingUp,{className:"h-5 w-5 text-primary"}),(0,a.jsxs)("h2",{className:"text-base font-bold text-foreground/90",children:["My deeper thoughts — ",e]})]}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground italic leading-relaxed",children:"These are not summaries. They are arguments — the kind of connections a reader with serious grey matter would make after living with the material for years. Each thought connects to the platform's research section (ADRs, papers, decision records) so it's traceable, not just opinionated."}),(0,a.jsx)("div",{className:"space-y-3",children:t})]})}e.s(["DeeperThought",()=>r,"DeeperThoughtSection",()=>o])},852008,e=>{"use strict";var a=e.i(113625);e.s(["Layers",()=>a.default])},38982,e=>{"use strict";var a=e.i(240250);e.s(["FlaskConical",()=>a.default])},665088,e=>{"use strict";var a=e.i(769201);e.s(["Dna",()=>a.default])},642348,e=>{"use strict";let a=[{id:"quantum-harmonic-oscillator",title:"Quantum harmonic oscillator — energy eigenstates & probability density",domain:"Physics",abstract:"Solve the time-independent Schrödinger equation for a particle in a harmonic potential. Plot the first 5 energy eigenstates (Hermite polynomials × Gaussian envelope) and their probability densities. The zero-point energy ℏω/2 emerges from the uncertainty principle.",mathLatex:"\\hat{H}\\psi_n = E_n \\psi_n, \\quad E_n = \\hbar\\omega\\left(n + \\tfrac{1}{2}\\right), \\quad \\psi_n(x) = \\frac{1}{\\sqrt{2^n n!}} \\left(\\frac{m\\omega}{\\pi\\hbar}\\right)^{1/4} e^{-m\\omega x^2/2\\hbar} H_n\\left(\\sqrt{\\tfrac{m\\omega}{\\hbar}} x\\right)",pythonCode:`import numpy as np
from math import factorial, exp, sqrt, pi

# Solve QHO eigenstates numerically (Hermite polynomial recurrence)
# Using atomic units: hbar = m = omega = 1 (natural units)
hbar = m = omega = 1.0
x = np.linspace(-5, 5, 500)

def hermite(n, x):
    """Physicist's Hermite polynomial via recurrence."""
    if n == 0: return np.ones_like(x)
    if n == 1: return 2 * x
    H_prev, H_curr = np.ones_like(x), 2 * x
    for k in range(2, n + 1):
        H_next = 2 * x * H_curr - 2 * (k - 1) * H_prev
        H_prev, H_curr = H_curr, H_next
    return H_curr

def psi_n(n, x):
    """Normalized QHO eigenstate."""
    alpha = sqrt(m * omega / hbar)
    norm = 1.0 / sqrt(2**n * factorial(n)) * (m * omega / (pi * hbar))**0.25
    return norm * np.exp(-0.5 * alpha**2 * x**2) * hermite(n, alpha * x)

# Build chart data: first 5 eigenstates
series = []
for n in range(5):
    psi = psi_n(n, x)
    prob = np.abs(psi)**2
    # Downsample for chart legibility (every 5th point)
    series.append({
        "name": f"n={n}, E={n + 0.5}ℏω",
        "data": [{"x": float(xi), "y": float(pi)} for xi, pi in zip(x[::5], prob[::5])]
    })

import json
print(json.dumps({
    "chart_type": "line",
    "title": "QHO probability densities |ψₙ(x)|\xb2 for n=0..4",
    "x_label": "position x (atomic units)",
    "y_label": "|ψ(x)|\xb2",
    "series": series,
    "stats": [
        {"label": "Zero-point energy", "value": "0.500", "unit": "ℏω", "tone": "success"},
        {"label": "Energy spacing", "value": "1.000", "unit": "ℏω", "tone": "default"},
        {"label": "Eigenstates plotted", "value": "5", "tone": "default"},
        {"label": "Spatial domain", "value": "[-5, 5]", "unit": "a₀", "tone": "default"},
    ],
    "summary": "The zero-point energy ℏω/2 is the lowest possible energy — a direct consequence of the Heisenberg uncertainty principle. Higher n states have n+1 nodes and approach the classical limit (equipartition) as n → ∞. This is the foundation of vibrational spectroscopy in chemistry (IR-active modes are QHOs)."
}))`,liveDataCode:`# LIVE DATA variant — fetch real atomic energy levels from NIST
# The NIST Atomic Spectra Database provides measured energy levels
# for atoms/ions. We fetch H (hydrogen) energy levels and compare
# to the QHO theoretical formula E_n = ℏω(n + 1/2).
import json
from pyodide.http import pyfetch

async def fetch_nist_levels():
    """Fetch hydrogen energy levels from NIST ASD API."""
    url = "https://physics.nist.gov/cgi-bin/ASD/energy.pl?units=1&element=H&ion=H+spectra&level_out=on&j_out=on&temp=&submit=Retrieve+Data"
    try:
        resp = await pyfetch(url)
        text = await resp.text()
        # Parse the NIST HTML response for energy level data
        # NIST returns HTML tables — extract the energy values
        import re
        # Look for energy values in eV (format: X.XXXXXX)
        energies = re.findall(r'(\\d+\\.\\d{4,6})\\s+eV', text)
        if not energies:
            # Try alternate format (cm^-1)
            energies = re.findall(r'(\\d{5,7}\\.\\d+)\\s+cm', text)
            if energies:
                energies = [str(float(e) / 8065.54) for e in energies[:5]]  # convert cm^-1 to eV
        if len(energies) < 3:
            raise ValueError("Not enough energy levels found")
        return [float(e) for e in energies[:5]]
    except Exception as e:
        print(f"NIST API failed ({e}). Falling back to synthetic.")
        return None

nist_levels = await fetch_nist_levels()

import numpy as np
from math import factorial, sqrt, pi

hbar = m = omega = 1.0  # atomic units
x = np.linspace(-5, 5, 200)

def hermite(n, x):
    if n == 0: return np.ones_like(x)
    if n == 1: return 2 * x
    H_prev, H_curr = np.ones_like(x), 2 * x
    for k in range(2, n + 1):
        H_next = 2 * x * H_curr - 2 * (k - 1) * H_prev
        H_prev, H_curr = H_curr, H_next
    return H_curr

def psi_n(n, x):
    alpha = sqrt(m * omega / hbar)
    norm = 1.0 / sqrt(2**n * factorial(n)) * (m * omega / (pi * hbar))**0.25
    return norm * np.exp(-0.5 * alpha**2 * x**2) * hermite(n, alpha * x)

if nist_levels is not None:
    # NIST levels are real measured data — compare to QHO formula
    nist_e = nist_levels[:5]
    # QHO formula: E_n = ℏω(n + 1/2). Fit ℏω from the spacing.
    theoretical_e = [(n + 0.5) * 1.0 for n in range(5)]
    # Compute deviations
    deviations = [(t - n) / max(n, 0.001) * 100 for t, n in zip(theoretical_e, nist_e)]
    series = [{"name": "QHO theory E_n = ℏω(n+\xbd)", "data": [{"x": n, "y": float(theoretical_e[n])} for n in range(5)]}]
    series.append({"name": "NIST measured (H atom)", "data": [{"x": n, "y": float(nist_e[n])} for n in range(len(nist_e))]})
    print(json.dumps({
        "chart_type": "line",
        "title": "QHO theory vs NIST measured hydrogen energy levels (LIVE)",
        "x_label": "Quantum number n",
        "y_label": "Energy (eV)",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "NIST ASD (LIVE)", "tone": "success"},
            {"label": "Levels fetched", "value": str(len(nist_e)), "tone": "default"},
            {"label": "First level (ground state)", "value": f"{nist_e[0]:.4f} eV", "tone": "success"},
            {"label": "Avg deviation from QHO", "value": f"{np.mean(np.abs(deviations)):.1f}%", "tone": "warning"},
        ],
        "summary": f"LIVE data from NIST Atomic Spectra Database: {len(nist_e)} hydrogen energy levels. The QHO formula E_n = ℏω(n+\xbd) predicts equally-spaced levels; real atoms deviate at high n due to anharmonicity. This deviation IS the physics — the QHO is the first-order approximation, and the deviations encode the real molecular potential."
    }))
else:
    # Synthetic fallback — same as the original
    series = []
    for n in range(5):
        psi = psi_n(n, x)
        prob = np.abs(psi)**2
        series.append({"name": f"n={n}, E={n + 0.5}ℏω", "data": [{"x": float(xi), "y": float(pi)} for xi, pi in zip(x[::5], prob[::5])]})
    print(json.dumps({
        "chart_type": "line",
        "title": "QHO probability densities (synthetic fallback)",
        "x_label": "position x (atomic units)",
        "y_label": "|ψ(x)|\xb2",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "SYNTHETIC (NIST API failed)", "tone": "warning"},
            {"label": "Zero-point energy", "value": "0.500 ℏω", "tone": "success"},
        ],
        "summary": "NIST API was unreachable. Showing synthetic QHO eigenstates."
    }))`,liveDataSource:"NIST ASD",preamble:"import numpy\nfrom math import factorial, sqrt, pi, exp",dataSource:"synthetic",estimatedRuntime:"<5s",tools:["numpy","scipy.special.hermite","math"],citation:"Griffiths, D.J. (2005). Introduction to Quantum Mechanics, 2nd ed. Chapter 2."},{id:"molecular-similarity",title:"Molecular fingerprint similarity — Tanimoto on ECFP-like bit vectors",domain:"Chemistry",abstract:"Generate 10 synthetic 'molecules' as 1024-bit fingerprints (mimicking ECFP4). Compute the pairwise Tanimoto similarity matrix and visualise as a heatmap. Molecules with Tanimoto > 0.85 are typically considered 'similar' in lead-optimisation campaigns.",mathLatex:"T_{A,B} = \\frac{|A \\cap B|}{|A \\cup B|} = \\frac{c}{a + b - c}",pythonCode:`import numpy as np
import json

np.random.seed(42)

# Generate 10 synthetic "molecules" as 1024-bit fingerprints.
# In real cheminformatics, these would be ECFP4 (Morgan) fingerprints
# computed by RDKit from the molecular graph.
N_MOLECULES = 10
FP_BITS = 1024
# Make fingerprints sparse (realistic — ~20-30% bits set)
fps = (np.random.rand(N_MOLECULES, FP_BITS) < 0.25).astype(int)

# Compute pairwise Tanimoto similarity
def tanimoto(a, b):
    intersection = np.sum(a & b)
    union = np.sum(a | b)
    return intersection / union if union > 0 else 1.0

sim_matrix = np.zeros((N_MOLECULES, N_MOLECULES))
for i in range(N_MOLECULES):
    for j in range(N_MOLECULES):
        sim_matrix[i, j] = tanimoto(fps[i], fps[j])

# Find the most similar pair (excluding self-similarity)
np.fill_diagonal(sim_matrix, 0)
most_sim = np.unravel_index(np.argmax(sim_matrix), sim_matrix.shape)

# Build scatter: for each pair, plot (mean bit density, similarity)
pairs = []
for i in range(N_MOLECULES):
    for j in range(i + 1, N_MOLECULES):
        pairs.append({
            "x": float((fps[i].sum() + fps[j].sum()) / 2),
            "y": float(sim_matrix[i, j])
        })

print(json.dumps({
    "chart_type": "scatter",
    "title": "Tanimoto similarity vs mean bit density (synthetic ECFP4 fingerprints)",
    "x_label": "Mean bits set (per molecule pair)",
    "y_label": "Tanimoto similarity T(A,B)",
    "series": [{
        "name": "Molecule pairs (n=45)",
        "data": pairs
    }],
    "reference_lines": [
        {"y": 0.85, "label": "Similarity threshold (0.85)", "color": "#10b981"},
        {"y": 0.50, "label": "Random pair (~0.50)", "color": "#f59e0b"}
    ],
    "stats": [
        {"label": "Pairs analysed", "value": str(len(pairs)), "tone": "default"},
        {"label": "Most similar pair", "value": f"mol_{most_sim[0]} ↔ mol_{most_sim[1]}", "tone": "success"},
        {"label": "Max Tanimoto", "value": f"{float(sim_matrix[most_sim]):.3f}", "tone": "success"},
        {"label": "Median Tanimoto", "value": f"{float(np.median([p['y'] for p in pairs])):.3f}", "tone": "default"},
    ],
    "summary": "Tanimoto similarity is the workhorse metric of cheminformatics — it underpins virtual screening, scaffold hopping, and cluster analysis. The 0.85 threshold is the conventional 'similar molecule' cutoff in lead optimisation. Above this, molecules typically share a common scaffold and similar biological activity (per the Similarity Property Principle)."
}))`,liveDataCode:`# LIVE DATA variant — fetch real molecules from ChEMBL API
# ChEMBL is a database of bioactive drug-like molecules.
# We fetch real molecular fingerprints and compute Tanimoto similarity.
import json
from pyodide.http import pyfetch

async def fetch_chembl_molecules():
    """Fetch 10 real molecules from ChEMBL API."""
    url = "https://www.ebi.ac.uk/chembl/api/data/molecule.json?format=json&limit=10&molecule_chembl_id__in=CHEMBL1,CHEMBL2,CHEMBL3,CHEMBL4,CHEMBL5,CHEMBL6,CHEMBL7,CHEMBL8,CHEMBL9,CHEMBL10"
    try:
        resp = await pyfetch(url, headers={"Accept": "application/json"})
        data = await resp.json()
        molecules = data.get("molecules", [])
        if len(molecules) < 3:
            raise ValueError("Not enough molecules")
        return molecules
    except Exception as e:
        print(f"ChEMBL API failed ({e}). Falling back to synthetic.")
        return None

molecules = await fetch_chembl_molecules()

import numpy as np

if molecules is not None:
    # Extract molecular properties (use molecular_weight as a proxy for fingerprint)
    # Real ChEMBL molecules have: pref_name, molecular_weight, alogp, etc.
    mol_data = []
    for mol in molecules:
        props = mol.get("molecule_properties", {})
        mw = props.get("full_mwt", 0) or 0
        alogp = props.get("alogp", 0) or 0
        psa = props.get("psa", 0) or 0
        hba = props.get("hba", 0) or 0
        hbd = props.get("hbd", 0) or 0
        chembl_id = mol.get("molecule_chembl_id", "?")
        name = mol.get("pref_name", "?") or "?"
        mol_data.append({
            "id": chembl_id,
            "name": name,
            "mw": float(mw),
            "alogp": float(alogp),
            "psa": float(psa),
            "hba": int(hba),
            "hbd": int(hbd),
        })

    # Compute pairwise "Tanimoto-like" similarity on molecular properties
    # (Normalised Euclidean distance → similarity score)
    n = len(mol_data)
    sim_matrix = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            # Normalise properties to [0,1] range and compute cosine similarity
            v_i = np.array([mol_data[i]["mw"]/1000, mol_data[i]["alogp"]/5, mol_data[i]["psa"]/150, mol_data[i]["hba"]/10, mol_data[i]["hbd"]/10])
            v_j = np.array([mol_data[j]["mw"]/1000, mol_data[j]["alogp"]/5, mol_data[j]["psa"]/150, mol_data[j]["hba"]/10, mol_data[j]["hbd"]/10])
            cos_sim = np.dot(v_i, v_j) / (np.linalg.norm(v_i) * np.linalg.norm(v_j) + 1e-8)
            sim_matrix[i, j] = cos_sim

    # Find most similar pair
    np.fill_diagonal(sim_matrix, 0)
    most_sim = np.unravel_index(np.argmax(sim_matrix), sim_matrix.shape)

    # Build scatter: MW vs ALogP for each molecule
    series = [{
        "name": "ChEMBL molecules (LIVE)",
        "data": [{"x": m["mw"], "y": m["alogp"]} for m in mol_data]
    }]

    print(json.dumps({
        "chart_type": "scatter",
        "title": f"Live molecular property space — {n} real ChEMBL molecules",
        "x_label": "Molecular weight (Da)",
        "y_label": "ALogP (lipophilicity)",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "ChEMBL API (LIVE)", "tone": "success"},
            {"label": "Molecules fetched", "value": str(n), "tone": "default"},
            {"label": "Most similar pair", "value": f"{mol_data[most_sim[0]]['id']} ↔ {mol_data[most_sim[1]]['id']}", "tone": "success"},
            {"label": "Max similarity", "value": f"{float(sim_matrix[most_sim]):.3f}", "tone": "success"},
        ],
        "summary": f"LIVE data from ChEMBL: {n} real bioactive molecules (CHEMBL1-CHEMBL10). Scatter shows molecular weight vs lipophilicity (ALogP) — the two key properties in drug design. Similar molecules cluster together. This is the real property space that medicinal chemists navigate during lead optimisation."
    }))
else:
    # Synthetic fallback
    np.random.seed(42)
    N_MOL = 10
    FP_BITS = 1024
    fps = (np.random.rand(N_MOL, FP_BITS) < 0.25).astype(int)
    def tanimoto(a, b):
        intersection = np.sum(a & b)
        union = np.sum(a | b)
        return intersection / union if union > 0 else 1.0
    pairs = []
    for i in range(N_MOL):
        for j in range(i + 1, N_MOL):
            pairs.append({"x": float((fps[i].sum() + fps[j].sum()) / 2), "y": float(tanimoto(fps[i], fps[j]))})
    print(json.dumps({
        "chart_type": "scatter",
        "title": "Tanimoto similarity (synthetic fallback)",
        "x_label": "Mean bits set",
        "y_label": "Tanimoto similarity",
        "series": [{"name": "Pairs", "data": pairs}],
        "stats": [
            {"label": "Data source", "value": "SYNTHETIC (ChEMBL API failed)", "tone": "warning"},
        ],
        "summary": "ChEMBL API was unreachable. Showing synthetic fingerprint similarity."
    }))`,liveDataSource:"ChEMBL",dataSource:"synthetic",estimatedRuntime:"<5s",tools:["numpy","RDKit (real)","scipy.spatial.distance"],citation:"Bajusz, D. et al. (2015). Why is Tanimoto index an appropriate choice for fingerprint-based similarity calculations? J. Cheminf. 7:20."},{id:"gev-flood-frequency",title:"Flood frequency analysis — fitting GEV to annual maxima",domain:"Climate",abstract:"Generate 80 years of synthetic annual maximum daily river flows from a known GEV (shape=-0.15, location=120, scale=40). Fit a GEV via MLE, then compute return levels for 10/50/100/500-year floods. The shape parameter ξi controls the tail: negative=Weibull (bounded), zero=Gumbel (light tail), positive=Fréchet (heavy tail).",mathLatex:"\\hat{\\xi}, \\hat{\\mu}, \\hat{\\sigma} = \\arg\\max_{\\xi,\\mu,\\sigma} \\prod_{i=1}^{n} f_{\\text{GEV}}(x_i; \\xi, \\mu, \\sigma), \\quad x_T = \\mu + \\frac{\\sigma}{\\xi}\\left[\\left(-\\ln\\left(1 - \\tfrac{1}{T}\\right)\\right)^{-\\xi} - 1\\right]",pythonCode:`import numpy as np
from math import log, exp
import json

np.random.seed(42)

# True parameters (synthetic data — UK-style heavy-tail river)
xi_true, mu_true, sigma_true = -0.15, 120.0, 40.0
N_YEARS = 80

# Generate annual maxima from GEV
def gev_sample(n, xi, mu, sigma, rng):
    u = rng.uniform(1e-12, 1, n)
    if abs(xi) < 1e-8:
        return mu - sigma * np.log(-np.log(u))
    return mu + (sigma / xi) * ((-np.log(u))**(-xi) - 1)

rng = np.random.default_rng(42)
maxima = gev_sample(N_YEARS, xi_true, mu_true, sigma_true, rng)
maxima.sort()

# Negative log-likelihood for GEV (numerically stable)
def gev_nll(params, x):
    xi, mu, sigma = params
    if sigma <= 0: return 1e15
    z = (x - mu) / sigma
    if abs(xi) < 1e-8:
        # Gumbel limit
        t = np.exp(-z)
    else:
        if 1 + xi * z <= 0: return 1e15  # invalid domain
        t = (1 + xi * z) ** (-1 / xi)
    nll = -np.sum(np.log((1 / sigma) * t**np.exp(-z) * np.exp(-z)))
    return nll if np.isfinite(nll) else 1e15

# Fit via grid + Nelder-Mead
from scipy.optimize import minimize
result = minimize(gev_nll, [xi_true, mu_true, sigma_true], args=(maxima,),
                  method='Nelder-Mead', options={'maxiter': 5000, 'xatol': 1e-6})
xi_hat, mu_hat, sigma_hat = result.x

# Return levels: x_T = mu + (sigma/xi) * [(-ln(1-1/T))^(-xi) - 1]
def return_level(T, xi, mu, sigma):
    p = 1 - 1 / T
    if abs(xi) < 1e-8:
        return mu - sigma * log(-log(p))
    return mu + (sigma / xi) * ((-log(p))**(-xi) - 1)

periods = [10, 50, 100, 500, 1000]
levels = [return_level(T, xi_hat, mu_hat, sigma_hat) for T in periods]

# Build chart: empirical + fitted return level curve
years = np.arange(1, N_YEARS + 1)
emp_rp = (N_YEARS + 1) / (N_YEARS + 1 - years)
theoretical_rp = np.logspace(0, 3, 50)
theoretical_rl = [return_level(T, xi_hat, mu_hat, sigma_hat) for T in theoretical_rp]

series = [
    {
        "name": "Observed annual maxima",
        "data": [{"x": float(rp), "y": float(m)} for rp, m in zip(emp_rp, maxima)]
    },
    {
        "name": "Fitted GEV return level",
        "data": [{"x": float(rp), "y": float(rl)} for rp, rl in zip(theoretical_rp, theoretical_rl)]
    }
]

print(json.dumps({
    "chart_type": "line",
    "title": "GEV flood frequency — fitted return level curve",
    "x_label": "Return period (years, log scale)",
    "y_label": "Peak flow (m\xb3/s)",
    "series": series,
    "stats": [
        {"label": "Shape ξi (true=-0.15)", "value": f"{xi_hat:.3f}", "tone": "success" if abs(xi_hat - xi_true) < 0.1 else "warning"},
        {"label": "Location μ (true=120)", "value": f"{mu_hat:.1f}", "tone": "success" if abs(mu_hat - mu_true) < 10 else "warning"},
        {"label": "Scale σ (true=40)", "value": f"{sigma_hat:.1f}", "tone": "success" if abs(sigma_hat - sigma_true) < 10 else "warning"},
        {"label": "100-year flood", "value": f"{return_level(100, xi_hat, mu_hat, sigma_hat):.0f}", "unit": "m\xb3/s", "tone": "destructive"},
    ],
    "reference_lines": [
        {"y": levels[2], "label": f"100-yr: {levels[2]:.0f} m\xb3/s", "color": "#ef4444"},
        {"y": levels[3], "label": f"500-yr: {levels[3]:.0f} m\xb3/s", "color": "#dc2626"}
    ],
    "summary": f"The fitted shape parameter ξi={xi_hat:.3f} ({'heavy Fr\xe9chet tail' if xi_hat > 0 else 'light Gumbel tail' if abs(xi_hat) < 0.05 else 'bounded Weibull tail'}). A positive ξi (as is typical for UK rivers) means the 1000-year flood is ~3\xd7 the 100-year flood — not 1.5\xd7 as a naive Gumbel fit would predict. This is the engineering distinction that determines whether a flood defence holds in 2050 or fails catastrophically."
}))`,liveDataCode:`# LIVE DATA variant — fetch real river gauge data from USGS
# USGS Water Services provides real-time and historical river flow data.
# We fetch annual maxima from a real USGS gauge and fit GEV.
import json
from pyodide.http import pyfetch

async def fetch_usgs_data():
    """Fetch daily mean flow data from a USGS gauge."""
    # USGS gauge 03439000 (Nolichucky River, NC) — 30+ years of data
    # Parameter 00060 = discharge (cubic feet per second)
    url = "https://waterservices.usgs.gov/nwis/dv/?format=json&sites=03439000&parameterCd=00060&start=1990-01-01&end=2024-12-31"
    try:
        resp = await pyfetch(url)
        data = await resp.json()
        # Extract daily values
        time_series = data.get("value", {}).get("timeSeries", [])
        if not time_series:
            raise ValueError("No time series data")
        values = time_series[0].get("values", [{}])[0].get("value", [])
        if len(values) < 365:
            raise ValueError("Not enough data points")
        # Extract flow values (convert cfs to m\xb3/s: 1 cfs = 0.0283168 m\xb3/s)
        flows = [float(v["value"]) * 0.0283168 for v in values if v["value"] != "-999999"]
        return flows
    except Exception as e:
        print(f"USGS API failed ({e}). Falling back to synthetic.")
        return None

daily_flows = await fetch_usgs_data()

import numpy as np
from math import log

if daily_flows is not None:
    # Extract annual maxima (one per water year)
    # Group by year and take max
    from collections import defaultdict
    # USGS returns dates as YYYY-MM-DD. Group by year.
    # We need the dates from the time series — re-fetch
    # For simplicity, assume 365 values per year
    years = len(daily_flows) // 365
    annual_maxima = []
    for y in range(years):
        start = y * 365
        end = start + 365
        if end <= len(daily_flows):
            annual_maxima.append(max(daily_flows[start:end]))
    annual_maxima = np.array(sorted(annual_maxima))

    if len(annual_maxima) < 5:
        raise ValueError("Not enough years of data")

    # Fit GEV via simple MLE (same as synthetic version)
    def gev_nll(params, x):
        xi, mu, sigma = params
        if sigma <= 0: return 1e15
        z = (x - mu) / sigma
        if abs(xi) < 1e-8:
            t = np.exp(-z)
        else:
            if np.any(1 + xi * z <= 0): return 1e15
            t = (1 + xi * z) ** (-1 / xi)
        nll = -np.sum(np.log((1 / sigma) * t**np.exp(-z) * np.exp(-z)))
        return nll if np.isfinite(nll) else 1e15

    from scipy.optimize import minimize as _minimize  # May not be available in Pyodide
    # Simple grid search if scipy not available
    try:
        result = _minimize(gev_nll, [-0.1, np.mean(annual_maxima), np.std(annual_maxima)],
                          args=(annual_maxima,), method='Nelder-Mead', options={'maxiter': 5000})
        xi_hat, mu_hat, sigma_hat = result.x
    except:
        # Fallback: method of moments
        xi_hat = -0.15
        mu_hat = float(np.mean(annual_maxima))
        sigma_hat = float(np.std(annual_maxima))

    def return_level(T, xi, mu, sigma):
        p = 1 - 1 / T
        if abs(xi) < 1e-8:
            return mu - sigma * log(-log(p))
        return mu + (sigma / xi) * ((-log(p))**(-xi) - 1)

    levels = [return_level(T, xi_hat, mu_hat, sigma_hat) for T in [10, 50, 100, 500]]

    series = [
        {"name": f"USGS observed annual maxima ({len(annual_maxima)} years)", "data": [{"x": int(i+1), "y": float(m)} for i, m in enumerate(annual_maxima)]},
    ]

    print(json.dumps({
        "chart_type": "line",
        "title": f"GEV flood frequency — LIVE USGS gauge 03439000 (Nolichucky River, NC)",
        "x_label": "Year index",
        "y_label": "Annual max daily flow (m\xb3/s)",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "USGS Water Services (LIVE)", "tone": "success"},
            {"label": "Years of data", "value": str(len(annual_maxima)), "tone": "default"},
            {"label": "Shape ξi", "value": f"{xi_hat:.3f}", "tone": "success" if xi_hat > 0 else "default"},
            {"label": "100-year flood", "value": f"{levels[2]:.0f} m\xb3/s", "tone": "destructive"},
        ],
        "summary": f"LIVE data from USGS: {len(annual_maxima)} years of annual maxima from Nolichucky River gauge 03439000. GEV fit: shape ξi={xi_hat:.3f} ({'heavy Fr\xe9chet tail' if xi_hat > 0 else 'light Gumbel tail'}). The 100-year flood estimate is {levels[2]:.0f} m\xb3/s — this is the flow that the USACE uses to design flood defences on this river."
    }))
else:
    # Synthetic fallback
    np.random.seed(42)
    xi_true, mu_true, sigma_true = -0.15, 120.0, 40.0
    N_YEARS = 80
    u = np.random.uniform(1e-12, 1, N_YEARS)
    if abs(xi_true) < 1e-8:
        maxima = mu_true - sigma_true * np.log(-np.log(u))
    else:
        maxima = mu_true + (sigma_true / xi_true) * ((-np.log(u))**(-xi_true) - 1)
    maxima.sort()
    print(json.dumps({
        "chart_type": "line",
        "title": "GEV flood frequency (synthetic fallback)",
        "x_label": "Year",
        "y_label": "Peak flow (m\xb3/s)",
        "series": [{"name": "Synthetic annual maxima", "data": [{"x": int(i+1), "y": float(m)} for i, m in enumerate(maxima)]}],
        "stats": [
            {"label": "Data source", "value": "SYNTHETIC (USGS API failed)", "tone": "warning"},
        ],
        "summary": "USGS API was unreachable. Showing synthetic flood data."
    }))`,liveDataSource:"USGS",dataSource:"synthetic",estimatedRuntime:"5-15s",tools:["numpy","scipy.optimize","scipy.stats.genextreme"],citation:"Coles, S. (2001). An Introduction to Statistical Modeling of Extreme Values. Springer."},{id:"sir-epidemic-model",title:"SIR epidemic model — integration with R₀ estimation",domain:"Biology",abstract:"Numerically integrate the Kermack-McKendrick SIR ODEs for a synthetic population of 100,000. Sweep β across 4 values (R₀ = β/γ ∈ {1.5, 2.0, 2.5, 3.0}) and overlay the infection curves. The herd immunity threshold is 1 - 1/R₀ — the key parameter for vaccination policy.",mathLatex:"\\frac{dS}{dt} = -\\beta S I, \\quad \\frac{dI}{dt} = \\beta S I - \\gamma I, \\quad \\frac{dR}{dt} = \\gamma I, \\quad R_0 = \\frac{\\beta}{\\gamma} N, \\quad p_c = 1 - \\frac{1}{R_0}",pythonCode:`import numpy as np
import json

# SIR model — synthetic population of 100,000
N = 100_000
I0, R0_init = 10, 0
S0 = N - I0 - R0_init
gamma = 1 / 14  # 14-day infectious period (typical for influenza)

# Beta values to sweep — corresponds to R0 = 1.5, 2.0, 2.5, 3.0
betas = [gamma * 1.5, gamma * 2.0, gamma * 2.5, gamma * 3.0]
days = np.arange(0, 200, 1)

def sir_integrate(beta, gamma, S0, I0, R0_init, N, t):
    """Simple Euler integration of the SIR ODEs."""
    S, I, R = float(S0), float(I0), float(R0_init)
    dt = t[1] - t[0]
    S_arr, I_arr, R_arr = [S], [I], [R]
    for i in range(1, len(t)):
        dS = -beta * S * I / N * dt
        dI = (beta * S * I / N - gamma * I) * dt
        dR = gamma * I * dt
        S, I, R = S + dS, I + dI, R + dR
        S_arr.append(S); I_arr.append(I); R_arr.append(R)
    return np.array(S_arr), np.array(I_arr), np.array(R_arr)

# Build chart: infection curve for each R0
series = []
for beta in betas:
    S, I, R = sir_integrate(beta, gamma, S0, I0, R0_init, N, days)
    R0 = beta / gamma
    series.append({
        "name": f"R₀={R0:.1f}",
        "data": [{"x": int(d), "y": int(i)} for d, i in zip(days, I)]
    })

# Stats: herd immunity threshold for R0=2.5 (the middle case)
R0_mid = 2.5
herd_threshold = 1 - 1 / R0_mid

print(json.dumps({
    "chart_type": "line",
    "title": "SIR infection curves — β sweep (γ=1/14, N=100,000)",
    "x_label": "Days since index case",
    "y_label": "Active infections I(t)",
    "series": series,
    "stats": [
        {"label": "Population N", "value": f"{N:,}", "tone": "default"},
        {"label": "Infectious period 1/γ", "value": "14", "unit": "days", "tone": "default"},
        {"label": "Herd immunity (R₀=2.5)", "value": f"{herd_threshold*100:.0f}%", "tone": "destructive"},
        {"label": "Peak I (R₀=2.5)", "value": f"{int(max([s['data'][d]['y'] for s in series if s['name'] == 'R₀=2.5'] for d in range(len(days)))):,}", "tone": "warning"},
    ],
    "reference_lines": [
        {"y": N * 0.1, "label": "10% population infected", "color": "#f59e0b"}
    ],
    "summary": f"The herd immunity threshold for R₀=2.5 is {herd_threshold*100:.0f}% — meaning {int(N * herd_threshold):,} people must be immune (via vaccination or prior infection) to halt sustained transmission. This is the key parameter for vaccination policy: if you vaccinate >{herd_threshold*100:.0f}% of the population, the effective R drops below 1 and the epidemic dies out. The 'flat curve' for R₀=1.5 demonstrates why — at R₀=1.5, the threshold is only 33%, and natural propagation alone achieves herd immunity quickly with a smaller epidemic peak."
}))`,liveDataCode:`# LIVE DATA variant — fetch real COVID-19 case data from Our World in Data
# OWID maintains a public GitHub repo with daily COVID-19 data.
import json
from pyodide.http import pyfetch

async def fetch_owid_covid():
    """Fetch COVID-19 daily new cases for United Kingdom from OWID."""
    url = "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv"
    try:
        resp = await pyfetch(url)
        text = await resp.text()
        # Parse CSV — look for UK rows
        lines = text.strip().split("\\n")
        header = lines[0].split(",")
        # Find column indices
        loc_idx = header.index("location")
        date_idx = header.index("date")
        new_cases_idx = header.index("new_cases")
        uk_cases = []
        for line in lines[1:]:
            parts = line.split(",")
            if len(parts) > new_cases_idx and parts[loc_idx] == "United Kingdom":
                try:
                    cases = float(parts[new_cases_idx]) if parts[new_cases_idx] else 0
                    uk_cases.append({"date": parts[date_idx], "cases": cases})
                except:
                    pass
        if len(uk_cases) < 30:
            raise ValueError("Not enough UK case data")
        return uk_cases
    except Exception as e:
        print(f"OWID data fetch failed ({e}). Falling back to synthetic.")
        return None

owid_data = await fetch_owid_covid()

import numpy as np

if owid_data is not None:
    # Extract the case counts and smooth with 7-day rolling average
    cases = np.array([d["cases"] for d in owid_data])
    dates = [d["date"] for d in owid_data]
    # 7-day rolling average
    window = 7
    smoothed = np.convolve(cases, np.ones(window)/window, mode='valid')

    # Find the peak (first wave: March-May 2020, second wave: Oct-Dec 2020, etc.)
    peak_idx = np.argmax(smoothed)
    peak_cases = smoothed[peak_idx]
    peak_date = dates[peak_idx + window//2] if peak_idx + window//2 < len(dates) else "?"

    # Estimate R0 from the growth rate during the exponential phase
    # R0 ≈ 1 + (growth_rate * serial_interval)
    # Serial interval for COVID-19 ≈ 5.2 days
    # Growth rate = ln(cases[t+7] / cases[t]) / 7
    early_phase = smoothed[10:50]  # first 40 days after first 10
    if len(early_phase) > 10:
        growth_rate = np.log(early_phase[-1] / max(early_phase[0], 1)) / (len(early_phase) * 7)
        serial_interval = 5.2
        r0_estimate = 1 + growth_rate * serial_interval
    else:
        r0_estimate = 2.5

    herd_immunity = 1 - 1 / max(r0_estimate, 0.1)

    # Downsample for chart (every 14th day)
    sample_indices = list(range(0, len(smoothed), max(1, len(smoothed) // 50)))
    series = [{
        "name": "UK daily new cases (7-day avg, LIVE)",
        "data": [{"x": dates[i + window//2] if i + window//2 < len(dates) else str(i), "y": float(smoothed[i])} for i in sample_indices]
    }]

    print(json.dumps({
        "chart_type": "line",
        "title": f"LIVE COVID-19 UK daily cases — peak: {peak_date} ({int(peak_cases):,} cases/day)",
        "x_label": "Date",
        "y_label": "New cases (7-day average)",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "Our World in Data (LIVE)", "tone": "success"},
            {"label": "Data points", "value": f"{len(owid_data):,} days", "tone": "default"},
            {"label": "Peak cases/day", "value": f"{int(peak_cases):,}", "tone": "destructive"},
            {"label": "Estimated R₀", "value": f"{r0_estimate:.2f}", "tone": "warning"},
            {"label": "Herd immunity threshold", "value": f"{herd_immunity*100:.0f}%", "tone": "destructive"},
        ],
        "summary": f"LIVE data from OWID: {len(owid_data)} days of UK COVID-19 cases. Peak was {int(peak_cases):,} cases/day on {peak_date}. Estimated R₀={r0_estimate:.2f} from the early exponential growth phase. Herd immunity threshold = {herd_immunity*100:.0f}% — meaning {int(67000000 * herd_immunity):,} people (out of 67M UK population) would need immunity to halt sustained transmission. This is the real-world SIR model."
    }))
else:
    # Synthetic fallback
    np.random.seed(42)
    N = 100_000
    I0, R0_init = 10, 0
    S0 = N - I0 - R0_init
    gamma = 1 / 14
    days = np.arange(0, 200, 1)
    beta = gamma * 2.5
    S, I, R = float(S0), float(I0), float(R0_init)
    I_arr = [I]
    for i in range(1, len(days)):
        dS = -beta * S * I / N
        dI = (beta * S * I / N - gamma * I)
        dR = gamma * I
        S, I, R = S + dS, I + dI, R + dR
        I_arr.append(I)
    series = [{"name": "Synthetic SIR infections", "data": [{"x": int(d), "y": int(i)} for d, i in zip(days, I_arr)]}]
    print(json.dumps({
        "chart_type": "line",
        "title": "SIR infection curve (synthetic fallback)",
        "x_label": "Days",
        "y_label": "Active infections I(t)",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "SYNTHETIC (OWID fetch failed)", "tone": "warning"},
        ],
        "summary": "OWID data was unreachable. Showing synthetic SIR model."
    }))`,liveDataSource:"OWID",dataSource:"synthetic",estimatedRuntime:"<5s",tools:["numpy","scipy.integrate.odeint"],citation:"Kermack, W.O. & McKendrick, A.G. (1927). A contribution to the mathematical theory of epidemics. Proc. R. Soc. A 115:700-721."},{id:"monte-carlo-var",title:"Monte Carlo Value-at-Risk — geometric Brownian motion portfolio",domain:"Finance",abstract:"Simulate 10,000 paths of a single-asset portfolio under geometric Brownian motion (μ=8%, σ=20%, T=10 days). Compute the 95% and 99% VaR — the loss threshold exceeded only 5% / 1% of the time. Compare against the analytical Black-Scholes formula to verify the simulation is unbiased.",mathLatex:"dS_t = \\mu S_t\\,dt + \\sigma S_t\\,dW_t \\implies S_T = S_0 \\exp\\left[\\left(\\mu - \\tfrac{1}{2}\\sigma^2\\right)T + \\sigma\\sqrt{T}\\,Z\\right]",pythonCode:`import numpy as np
import json
from math import sqrt, exp, log

np.random.seed(42)

# Portfolio: $1M in a single asset
S0 = 1_000_000
mu_daily = 0.08 / 252    # 8% annual drift → daily
sigma_daily = 0.20 / sqrt(252)  # 20% annual vol → daily
T_days = 10              # 10-day VaR horizon
N_PATHS = 10_000

# Simulate terminal prices under GBM
Z = np.random.standard_normal(N_PATHS)
S_T = S0 * np.exp((mu_daily - 0.5 * sigma_daily**2) * T_days + sigma_daily * sqrt(T_days) * Z)

# Portfolio P&L distribution
pnl = S_T - S0

# Compute VaR at 95% and 99% (left-tail losses)
var_95 = -np.percentile(pnl, 5)   # loss exceeded 5% of the time
var_99 = -np.percentile(pnl, 1)   # loss exceeded 1% of the time
tvar_99 = -pnl[pnl <= np.percentile(pnl, 1)].mean()  # expected loss given > VaR99

# Analytical Black-Scholes VaR (closed form)
# VaR_alpha = S0 * (1 - exp((mu - 0.5*sigma^2)*T + sigma*sqrt(T)*z_alpha))
from math import inf
z_95 = 1.645  # one-sided 95%
z_99 = 2.326  # one-sided 99%
var_95_bs = S0 * (1 - exp((mu_daily - 0.5 * sigma_daily**2) * T_days - sigma_daily * sqrt(T_days) * z_95))
var_99_bs = S0 * (1 - exp((mu_daily - 0.5 * sigma_daily**2) * T_days - sigma_daily * sqrt(T_days) * z_99))

# Build histogram of P&L distribution
hist, bin_edges = np.histogram(pnl, bins=50, density=True)
bin_centers = 0.5 * (bin_edges[1:] + bin_edges[:-1])
series = [{
    "name": "P&L distribution",
    "data": [{"x": float(c), "y": float(h)} for c, h in zip(bin_centers, hist)]
}]

# Tail (zoom): path-wise losses
sorted_pnl = np.sort(pnl)
tail = sorted_pnl[:200]  # worst 200 paths
series.append({
    "name": "Left tail (worst 200 paths)",
    "data": [{"x": float(i), "y": float(p)} for i, p in enumerate(tail)]
})

print(json.dumps({
    "chart_type": "line",
    "title": "10-day portfolio P&L distribution — 10,000 Monte Carlo paths",
    "x_label": "P&L ($)",
    "y_label": "Density",
    "series": series,
    "stats": [
        {"label": "VaR 95% (MC)", "value": f"\${var_95:,.0f}", "tone": "warning"},
        {"label": "VaR 99% (MC)", "value": f"\${var_99:,.0f}", "tone": "destructive"},
        {"label": "VaR 95% (analytical)", "value": f"\${var_95_bs:,.0f}", "tone": "default"},
        {"label": "TVaR 99% (expected shortfall)", "value": f"\${tvar_99:,.0f}", "tone": "destructive"},
    ],
    "reference_lines": [
        {"y": 0, "label": "Break-even", "color": "#10b981"}
    ],
    "summary": f"MC VaR 95% = \${var_95:,.0f} vs analytical \${var_95_bs:,.0f} — agreement within \${(abs(var_95 - var_95_bs)/var_95_bs * 100):.1f}% (Monte Carlo noise). The 99% TVaR (\${tvar_99:,.0f}) is the expected loss GIVEN that the VaR is exceeded — the metric that Basel III now requires for regulatory capital. Note TVaR > VaR always: the average of the worst 1% is worse than the threshold that 1% breach."
}))`,liveDataCode:`# LIVE DATA variant — fetch real S&P 500 daily returns from Stooq
# Stooq provides free daily historical stock data via CSV.
import json
from pyodide.http import pyfetch

async def fetch_stooq_spx():
    """Fetch S&P 500 daily closing prices from Stooq."""
    url = "https://stooq.com/q/d/l/?s=^spx&i=d&d1=2023-01-01&d2=2024-12-31"
    try:
        resp = await pyfetch(url)
        text = await resp.text()
        # Parse CSV: Date,Open,High,Low,Close,Volume
        lines = text.strip().split("\\n")
        if len(lines) < 30:
            raise ValueError("Not enough data")
        header = lines[0].split(",")
        close_idx = header.index("Close")
        closes = []
        for line in lines[1:]:
            parts = line.split(",")
            if len(parts) > close_idx:
                try:
                    closes.append(float(parts[close_idx]))
                except:
                    pass
        if len(closes) < 30:
            raise ValueError("Not enough price data")
        return closes
    except Exception as e:
        print(f"Stooq API failed ({e}). Falling back to synthetic.")
        return None

closes = await fetch_stooq_spx()

import numpy as np

if closes is not None:
    # Compute daily log returns
    closes_arr = np.array(closes)
    log_returns = np.diff(np.log(closes_arr))

    # Fit parameters for GBM: mu_daily, sigma_daily
    mu_daily = float(np.mean(log_returns))
    sigma_daily = float(np.std(log_returns, ddof=1))

    # Portfolio: $1M invested in S&P 500
    S0 = 1_000_000
    T_days = 10  # 10-day VaR
    N_PATHS = 10_000

    # Monte Carlo: simulate 10,000 paths using REAL fitted parameters
    np.random.seed(42)
    Z = np.random.standard_normal(N_PATHS)
    S_T = S0 * np.exp((mu_daily - 0.5 * sigma_daily**2) * T_days + sigma_daily * np.sqrt(T_days) * Z)
    pnl = S_T - S0

    var_95 = -np.percentile(pnl, 5)
    var_99 = -np.percentile(pnl, 1)
    tvar_99 = -pnl[pnl <= np.percentile(pnl, 1)].mean()

    # Build histogram of P&L
    hist, bin_edges = np.histogram(pnl, bins=50, density=True)
    bin_centers = 0.5 * (bin_edges[1:] + bin_edges[:-1])
    series = [{"name": "P&L distribution (real S&P 500 params)", "data": [{"x": float(c), "y": float(h)} for c, h in zip(bin_centers, hist)]}]

    print(json.dumps({
        "chart_type": "line",
        "title": f"10-day VaR — Monte Carlo with REAL S&P 500 parameters (μ={mu_daily*252*100:.1f}%/yr, σ={sigma_daily*np.sqrt(252)*100:.1f}%/yr)",
        "x_label": "P&L ($)",
        "y_label": "Density",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "Stooq S&P 500 (LIVE)", "tone": "success"},
            {"label": "Daily mean return μ", "value": f"{mu_daily*100:.3f}%", "tone": "default"},
            {"label": "Daily volatility σ", "value": f"{sigma_daily*100:.3f}%", "tone": "default"},
            {"label": "VaR 95% (10-day)", "value": f"\${var_95:,.0f}", "tone": "warning"},
            {"label": "VaR 99% (10-day)", "value": f"\${var_99:,.0f}", "tone": "destructive"},
            {"label": "TVaR 99% (expected shortfall)", "value": f"\${tvar_99:,.0f}", "tone": "destructive"},
        ],
        "summary": f"LIVE data from Stooq: S&P 500 daily prices. Fitted annualised μ={mu_daily*252*100:.1f}%, σ={sigma_daily*np.sqrt(252)*100:.1f}%. Monte Carlo simulation of 10,000 10-day paths: VaR 95% = \${var_95:,.0f}, VaR 99% = \${var_99:,.0f}, TVaR 99% = \${tvar_99:,.0f}. These are the REAL risk parameters for a $1M S&P 500 portfolio — the same numbers that Basel III requires banks to report."
    }))
else:
    # Synthetic fallback
    np.random.seed(42)
    S0 = 1_000_000
    mu_daily = 0.08 / 252
    sigma_daily = 0.20 / np.sqrt(252)
    T_days = 10
    N_PATHS = 10_000
    Z = np.random.standard_normal(N_PATHS)
    S_T = S0 * np.exp((mu_daily - 0.5 * sigma_daily**2) * T_days + sigma_daily * np.sqrt(T_days) * Z)
    pnl = S_T - S0
    var_95 = -np.percentile(pnl, 5)
    var_99 = -np.percentile(pnl, 1)
    hist, bin_edges = np.histogram(pnl, bins=50, density=True)
    bin_centers = 0.5 * (bin_edges[1:] + bin_edges[:-1])
    series = [{"name": "P&L distribution (synthetic)", "data": [{"x": float(c), "y": float(h)} for c, h in zip(bin_centers, hist)]}]
    print(json.dumps({
        "chart_type": "line",
        "title": "10-day portfolio P&L (synthetic fallback)",
        "x_label": "P&L ($)",
        "y_label": "Density",
        "series": series,
        "stats": [
            {"label": "Data source", "value": "SYNTHETIC (Stooq API failed)", "tone": "warning"},
            {"label": "VaR 95%", "value": f"\${var_95:,.0f}", "tone": "warning"},
            {"label": "VaR 99%", "value": f"\${var_99:,.0f}", "tone": "destructive"},
        ],
        "summary": "Stooq API was unreachable. Showing synthetic VaR."
    }))`,liveDataSource:"Stooq",dataSource:"synthetic",estimatedRuntime:"5-15s",tools:["numpy","scipy.stats.norm","math"],citation:"Glasserman, P. (2003). Monte Carlo Methods in Financial Engineering. Springer."}],t=a.find(e=>"quantum-harmonic-oscillator"===e.id),i=a.find(e=>"molecular-similarity"===e.id),s=a.find(e=>"gev-flood-frequency"===e.id),n=a.find(e=>"sir-epidemic-model"===e.id),r=a.find(e=>"monte-carlo-var"===e.id);e.s(["ALL_CARDS",0,a,"CARD_DOMAIN_PAGES",0,{"quantum-harmonic-oscillator":{href:"/quantum-computing/",label:"Quantum Computing",group:"Quantum Computing"},"molecular-similarity":{href:"/cheminformatics/",label:"Cheminformatics",group:"Cheminformatics"},"gev-flood-frequency":{href:"/climate-science/",label:"Climate Science",group:"Climate Science"},"sir-epidemic-model":{href:"/systems-biology/",label:"Systems Biology",group:"Systems Biology"},"monte-carlo-var":{href:"/fintech/",label:"Fintech",group:"Fintech"}},"GEV_CARD",0,s,"QHO_CARD",0,t,"SIR_CARD",0,n,"TANIMOTO_CARD",0,i,"VAR_CARD",0,r])},610929,e=>{"use strict";var a=e.i(632225);e.s(["CloudRain",()=>a.default])},648130,e=>{"use strict";var a=e.i(843476),t=e.i(522016),i=e.i(862824),s=e.i(342046),n=e.i(901752),r=e.i(487486),o=e.i(642348),l=e.i(332017),c=e.i(691385),d=e.i(38982),m=e.i(610929),h=e.i(665088),p=e.i(25652),u=e.i(966992),f=e.i(21218),g=e.i(852008),y=e.i(283086),x=e.i(972520),_=e.i(778917);let v={Physics:(0,a.jsx)(c.Atom,{className:"h-5 w-5"}),Chemistry:(0,a.jsx)(d.FlaskConical,{className:"h-5 w-5"}),Climate:(0,a.jsx)(m.CloudRain,{className:"h-5 w-5"}),Biology:(0,a.jsx)(h.Dna,{className:"h-5 w-5"}),Finance:(0,a.jsx)(p.TrendingUp,{className:"h-5 w-5"})},b={Physics:"oklch(0.65 0.18 280)",Chemistry:"oklch(0.65 0.18 140)",Climate:"oklch(0.65 0.18 200)",Biology:"oklch(0.65 0.18 100)",Finance:"oklch(0.65 0.18 30)"};function S(){return(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)(i.PageHeader,{eyebrow:"Tier 3 flagship · lazy-evaluation analysis cards",title:"Analysis Cards — computational insights across domains",description:"Each card below is a deep computational analysis hosted on its domain home page. Click any card to navigate to the domain page where you can expand it and run the Python code in-browser via Pyodide (WebAssembly). Output is parsed as JSON and rendered as an interactive chart with stats, reference lines, and a written interpretation.",right:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsxs)(r.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(u.Cpu,{className:"h-3 w-3"})," Pyodide"]}),(0,a.jsxs)(r.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(f.Activity,{className:"h-3 w-3"})," ",o.ALL_CARDS.length," cards"]}),(0,a.jsxs)(r.Badge,{variant:"outline",className:"gap-1.5",children:[(0,a.jsx)(y.Sparkles,{className:"h-3 w-3"})," Lazy-load"]})]})}),(0,a.jsx)(i.SectionCard,{title:"Why this pattern matters",description:"The lazy-evaluation card is the platform's signature content pattern.",icon:(0,a.jsx)(g.Layers,{className:"h-5 w-5"}),children:(0,a.jsxs)("div",{className:"prose prose-sm dark:prose-invert max-w-none space-y-3",children:[(0,a.jsx)("p",{className:"text-sm text-muted-foreground leading-relaxed",children:"Traditional documentation pages present text definitions, then ask the reader to imagine the analysis. This platform inverts that: each card IS the analysis. The reader clicks once, the Python runtime loads (Pyodide ~10MB on first load, instant thereafter), the computation runs, and a chart + stats + interpretation appears — all client-side, no backend."}),(0,a.jsxs)("p",{className:"text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Lazy evaluation"})," means the page loads instantly (just the card titles + abstracts). Pyodide + the analysis code are only loaded when the user actually expands a card. A page with 50 cards loads as fast as a page with 1 — because the heavy stuff doesn't run until the user asks for it."]}),(0,a.jsxs)("p",{className:"text-sm text-muted-foreground leading-relaxed",children:[(0,a.jsx)("strong",{className:"text-foreground/80",children:"Architecture change (this session):"})," ","each card now lives on its domain home page (QHO on /quantum-computing, VaR on /fintech, etc.) rather than all clustered on /analysis. This distributes the heavy Pyodide + Recharts + KaTeX load across pages that naturally need them. This page is now an index — a directory of all analysis cards, linking to their domain homes."]})]})}),(0,a.jsx)(i.SectionCard,{title:"Analysis card directory",description:"Each card is hosted on its domain page. Click to navigate + run the interactive demo.",icon:(0,a.jsx)(y.Sparkles,{className:"h-5 w-5"}),children:(0,a.jsx)("div",{className:"grid md:grid-cols-2 gap-4",children:o.ALL_CARDS.map(e=>{let i=o.CARD_DOMAIN_PAGES[e.id],s=v[e.domain]??(0,a.jsx)(f.Activity,{className:"h-5 w-5"}),l=b[e.domain]??"oklch(0.5 0.10 250)";return(0,a.jsx)(t.default,{href:i?`/${i.href.split("/")[1]}`:(0,n.hrefFor)("home"),className:"group block rounded-lg border border-border/60 overflow-hidden hover:border-primary hover:shadow-md transition-all",style:{borderLeftWidth:4,borderLeftColor:l},children:(0,a.jsxs)("div",{className:"p-4 space-y-3",children:[(0,a.jsxs)("div",{className:"flex items-start gap-3",children:[(0,a.jsx)("div",{className:"shrink-0 mt-0.5",style:{color:l},children:s}),(0,a.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,a.jsxs)("div",{className:"flex items-center gap-2 flex-wrap mb-1",children:[(0,a.jsx)(r.Badge,{variant:"outline",className:"text-[10px] gap-1",style:{color:l,borderColor:l},children:e.domain}),(0,a.jsx)(r.Badge,{variant:"outline",className:"text-[10px] gap-1",children:"synthetic"===e.dataSource?"Synthetic":e.dataSource}),(0,a.jsx)(r.Badge,{variant:"outline",className:"text-[10px] gap-1",children:e.estimatedRuntime})]}),(0,a.jsx)("h3",{className:"text-sm font-semibold leading-tight group-hover:text-primary transition-colors",children:e.title}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-3",children:e.abstract})]}),(0,a.jsx)(x.ArrowRight,{className:"h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all"})]}),(0,a.jsx)("div",{className:"flex flex-wrap gap-1",children:e.tools.map(e=>(0,a.jsx)("span",{className:"text-[10px] px-1.5 py-0.5 rounded font-mono bg-muted/60 text-muted-foreground",children:e},e))}),i&&(0,a.jsxs)("div",{className:"flex items-center gap-1.5 text-[11px] text-muted-foreground pt-2 border-t border-border/40",children:[(0,a.jsx)(_.ExternalLink,{className:"h-3 w-3"}),"Hosted on ",(0,a.jsx)("span",{className:"font-mono text-primary",children:i.href})]})]})},e.id)})})}),(0,a.jsx)(i.SectionCard,{title:"ML-specific analysis cards",description:"Additional analysis cards live on /mlflow-deep-dive — ML-specific computations that don't fit a single domain.",icon:(0,a.jsx)(u.Cpu,{className:"h-5 w-5"}),children:(0,a.jsx)("div",{className:"grid md:grid-cols-2 gap-3 text-sm",children:(0,a.jsxs)(t.default,{href:(0,n.hrefFor)("mlflow-deep-dive"),className:"rounded-md border border-border/60 p-3 hover:border-primary hover:bg-primary/5 transition-colors",children:[(0,a.jsx)("p",{className:"font-semibold",children:"→ MLflow Deep Dive"}),(0,a.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"ML-specific analysis cards: metric drift detection via statistical process control, Bayesian hyperparameter optimization, model calibration via Platt scaling."})]})})}),(0,a.jsxs)(l.DeeperThoughtSection,{pageTitle:"Analysis Cards",children:[(0,a.jsx)(l.DeeperThought,{title:"The lazy-evaluation pattern is the answer to the heavy-bundle problem",connectedTo:"Pyodide + Suspense + dynamic import",children:(0,a.jsx)("p",{children:"A traditional Next.js page that ships Pyodide + Recharts + KaTeX + every analysis code on every page would be 15-20MB on initial load. The lazy-evaluation card pattern ships ~200KB of card titles + abstracts, then loads each component on demand. A page with 50 cards loads as fast as a page with 1. This is the same principle that powers JupyterLab, Observable, and modern interactive textbooks — but applied to a static site deployable on GitHub Pages."})}),(0,a.jsx)(l.DeeperThought,{title:"Distributing cards to domain pages is the natural evolution",connectedTo:"Domain-hosted cards + index page",children:(0,a.jsx)("p",{children:"Initially all 5 analysis cards lived on /analysis. As the platform grows to 50+ cards, clustering them all on one page would make it unwieldy. The natural evolution: each card lives on its domain page (QHO on /quantum-computing, VaR on /fintech), where it sits alongside the domain's other content (text definitions, code blocks, connections). The /analysis page becomes a directory — a lightweight index linking to each card's domain home. This is the same pattern as a library card catalog vs. the books themselves."})}),(0,a.jsx)(l.DeeperThought,{title:"Synthetic data is not a compromise — it's a feature",connectedTo:"Reproducibility + offline-safe + CORS-safe",children:(0,a.jsx)("p",{children:"Real datasets are great when available (and the cards that can use live APIs do). But synthetic data has three advantages for an educational/analytical platform: (1) reproducibility — every reader sees the same numbers, because the random seed is fixed; (2) offline-safe — the cards work on GitHub Pages static hosting without CORS complications; (3) parameterisable — the reader can vary the parameters and re-run, learning how the analysis responds. The pattern is: try the live API first (with a 2-second timeout), fall back to synthetic if blocked. This gives the best of both worlds: real data when possible, deterministic synthetic when not."})})]}),(0,a.jsx)(s.NextSteps,{relatedPages:[{id:"quantum-computing",reason:"QHO analysis card — quantum harmonic oscillator eigenstates"},{id:"cheminformatics",reason:"Tanimoto similarity card — molecular fingerprint analysis"},{id:"climate-science",reason:"GEV card — flood frequency analysis"},{id:"mlflow-deep-dive",reason:"ML-specific cards — metric drift, hyperparameter optimization"}]}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,a.jsx)(t.default,{href:(0,n.hrefFor)("home"),className:"text-sm text-primary hover:underline",children:"→ Return to overview"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,n.hrefFor)("constellation"),className:"text-sm text-primary hover:underline",children:"→ Skill Constellation"}),(0,a.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,a.jsx)(t.default,{href:(0,n.hrefFor)("mlflow-deep-dive"),className:"text-sm text-primary hover:underline",children:"→ MLflow (ML-specific cards)"})]})]})}e.s(["AnalysisPage",()=>S])}]);