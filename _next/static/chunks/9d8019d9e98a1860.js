(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,852008,e=>{"use strict";var t=e.i(113625);e.s(["Layers",()=>t.default])},862824,515288,e=>{"use strict";var t=e.i(843476),i=e.i(975157);function a({className:e,...a}){return(0,t.jsx)("div",{"data-slot":"card",className:(0,i.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",e),...a})}function n({className:e,...a}){return(0,t.jsx)("div",{"data-slot":"card-header",className:(0,i.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",e),...a})}function r({className:e,...a}){return(0,t.jsx)("div",{"data-slot":"card-title",className:(0,i.cn)("leading-none font-semibold",e),...a})}function s({className:e,...a}){return(0,t.jsx)("div",{"data-slot":"card-description",className:(0,i.cn)("text-muted-foreground text-sm",e),...a})}function o({className:e,...a}){return(0,t.jsx)("div",{"data-slot":"card-content",className:(0,i.cn)("px-6",e),...a})}e.s(["Card",()=>a,"CardContent",()=>o,"CardDescription",()=>s,"CardHeader",()=>n,"CardTitle",()=>r],515288);var l=e.i(487486);function c({title:e,description:i,icon:c,badge:d,badgeVariant:u="outline",children:m,className:p,contentClassName:h}){return(0,t.jsxs)(a,{className:["border-border/60",p].filter(Boolean).join(" "),children:[(e||i)&&(0,t.jsxs)(n,{className:"flex flex-row items-start gap-3 space-y-0 border-b border-border/60 bg-muted/30",children:[c&&(0,t.jsx)("div",{className:"mt-0.5 text-primary",children:c}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[e&&(0,t.jsx)(r,{className:"text-base",children:e}),d&&(0,t.jsx)(l.Badge,{variant:u,className:"text-[10px]",children:d})]}),i&&(0,t.jsx)(s,{className:"mt-1 text-xs",children:i})]})]}),(0,t.jsx)(o,{className:["p-4 md:p-5",h].filter(Boolean).join(" "),children:m})]})}function d({eyebrow:e,title:i,description:a,right:n}){return(0,t.jsxs)("div",{className:"mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4",children:[(0,t.jsxs)("div",{children:[e&&(0,t.jsx)("p",{className:"text-[11px] font-semibold uppercase tracking-widest text-primary/80 mb-1.5",children:e}),(0,t.jsx)("h1",{className:"text-2xl md:text-3xl font-semibold tracking-tight text-balance",children:i}),a&&(0,t.jsx)("p",{className:"mt-2 text-sm md:text-base text-muted-foreground max-w-3xl text-pretty",children:a})]}),n&&(0,t.jsx)("div",{className:"shrink-0",children:n})]})}function u({label:e,value:i,delta:n,deltaTone:r="flat",hint:s}){return(0,t.jsx)(a,{className:"border-border/60",children:(0,t.jsxs)(o,{className:"p-4",children:[(0,t.jsx)("p",{className:"text-[11px] uppercase tracking-wider text-muted-foreground",children:e}),(0,t.jsx)("p",{className:"mt-1 text-2xl font-semibold tabular-nums",children:i}),(0,t.jsxs)("div",{className:"mt-1 flex items-center gap-2",children:[n&&(0,t.jsx)("span",{className:`text-xs ${"up"===r?"text-emerald-600 dark:text-emerald-400":"down"===r?"text-rose-600 dark:text-rose-400":"text-muted-foreground"}`,children:n}),s&&(0,t.jsx)("span",{className:"text-[11px] text-muted-foreground",children:s})]})]})})}e.s(["KpiCard",()=>u,"PageHeader",()=>d,"SectionCard",()=>c],862824)},342046,518550,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(522016),n=e.i(901752);let r=[{cardIndex:0,name:"SVD",equation:"A = UΣV^T",sciences:["genomics","audio","finance"],insightShort:"SVD IS the Fourier transform for data",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["SVD IS NumPy's universal decomposer — np.linalg.svd → PCA for genomics, audio compression, Fama-French risk factors.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:1,name:"Attention",equation:"softmax(QK^T/√d_k) × V",sciences:["protein folding","NLP"],insightShort:"Attention IS natural selection",hostPages:["transformer-deep-dive","analytics-outputs"],hostReasons:["DNA IS a language — softmax(QK^T/√d_k)×V parses both proteins (AlphaFold2) and English (GPT-4) because both are correlation detection.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:2,name:"Poisson",equation:"P(k) = λ^k e^(-λ) / k!",sciences:["sequencing","networks","decay"],insightShort:"Poisson IS the law of rare events",hostPages:["bioinformatics-pipelines","analytics-outputs"],hostReasons:["GATK variant calling depth IS Poisson(λ=mean coverage) — same distribution that sizes server clusters and radioactive sources.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:3,name:"FFT",equation:"X[k] = Σ x[n] e^(-2πikn/N)",sciences:["mass spec","audio","cryo-EM"],insightShort:"FFT IS the change of basis",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["np.fft.fft is the SAME operation whether you're finding the m/z of a compound, the C-note in a chord, or the 3D structure of a ribosome.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:4,name:"Verlet",equation:"r(t+Δt) = 2r(t) - r(t-Δt) + F/m·Δt²",sciences:["MD","games","orbits"],insightShort:"Verlet IS time-reversal symmetry",hostPages:["computational-biology","analytics-outputs"],hostReasons:["AMBER, Havok, and NASA JPL all call this exact integrator — symplectic, energy-conserving, time-reversible. The MD integrator IS the game physics integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:5,name:"Navier-Stokes",equation:"∂u/∂t + u·∇u = -∇p/ρ + ν∇²u",sciences:["weather","blood","turbulence"],insightShort:"Navier-Stokes IS the universe's flow equation",hostPages:["computational-physics","analytics-outputs"],hostReasons:["CFD on this PDE predicts hurricanes, aneurysm risk, and wing stall — the SAME nonlinearity makes weather unpredictable and turbulence beautiful.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:6,name:"Gradient Descent",equation:"θ(t+1) = θ(t) - η∇L(θ)",sciences:["ML","evolution","thermodynamics"],insightShort:"Gradient Descent IS the learning rule",hostPages:["tabular","analytics-outputs"],hostReasons:["Gradient boosting = gradient descent on trees; GPT-4 training, natural selection, and protein folding all minimise a landscape with the SAME update rule.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:7,name:"Bayes",equation:"P(H|D) = P(D|H)P(H) / P(D)",sciences:["genetics","spam","quantum"],insightShort:"Bayes IS the belief updater",hostPages:["alphamissense","analytics-outputs"],hostReasons:["AlphaMissense classifying a VUS IS Gmail classifying spam IS a Stern–Gerlach measurement — all three update P(H) given D.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:8,name:"Euler's Method",equation:"y(t+Δt) = y(t) + f(t,y)·Δt",sciences:["orbital mechanics","games","finance"],insightShort:"Euler IS the seed of all simulation",hostPages:["space-science","analytics-outputs"],hostReasons:["Satellite trajectory propagation (NASA GMAT), game-engine fixed-step physics (Unity), and Black-Scholes Monte Carlo all START from this one-line integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:9,name:"Entropy",equation:"H = -Σ p log p",sciences:["information","thermodynamics","genetics"],insightShort:"Entropy IS the universal currency of disorder",hostPages:["systems-biology","analytics-outputs"],hostReasons:["Shannon measured message information, Boltzmann gas disorder, Haldane population heterozygosity — the SAME formula because all three quantify how spread out a distribution is.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:10,name:"Black-Scholes",equation:"C = S·N(d1) − K·e^(−rT)·N(d2)",sciences:["fintech","maritime","genetics"],insightShort:"Black-Scholes IS the universal option-pricing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["A Lloyd's underwriter pricing a 90-day cargo option, a CME quant pricing an SPX call, and a Fisher geneticist pricing an allele-substitution option all evaluate the SAME formula — the right-but-not-obligation to act on a stochastic payoff.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:11,name:"Haversine",equation:"d = 2R·arcsin(√(...))",sciences:["maritime","aviation","astronomy"],insightShort:"Haversine IS the universal great-circle distance",hostPages:["global-shipping","analytics-outputs"],hostReasons:["Rotterdam→Singapore sailing distance, LHR→JFK flight distance, and Sirius→Canopus angular separation all use the SAME formula — shortest-path distance on a sphere, invented 1805 (Bowring).","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:12,name:"Kelly Criterion",equation:"f* = (bp − q)/b = μ/σ²",sciences:["fintech","genetics","RL"],insightShort:"Kelly IS the universal bet-sizing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["Ed Thorp's blackjack team (1960s), Jim Simons' Medallion Fund (1989-2024, 65% CAGR), Haldane's allele fixation (1927), and Thompson sampling (RL) all derive the SAME optimal bet size f* = μ/σ² because they all maximize expected log-growth.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:13,name:"Markov Chain",equation:"π(t+1) = π(t)·P",sciences:["genetics","fintech","maritime"],insightShort:"Markov IS the universal state-transition equation",hostPages:["global-shipping","bioinformatics","analytics-outputs"],hostReasons:["Jukes-Cantor DNA substitution (1969), Moody's credit transitions (10⁶ bonds), and AIS port-state transitions (100K vessels) all use the SAME matrix update — the memoryless property is universal.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:14,name:"Value at Risk",equation:"VaR_α = −(μ + z_α·σ)",sciences:["fintech","maritime","climate"],insightShort:"VaR IS the universal tail-risk equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["JPMorgan's 1-day 99% VaR ($4T balance, Basel III), Lloyd's 7-day 95% VaR ($50B hull, Solvency II), and NOAA 100-year flood VaR (FEMA FIRMs) all use the SAME quantile — every loss distribution has an inverse CDF.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:15,name:"PageRank",equation:"PR(p) = (1-d) + d·Σ(PR(q)/L(q))",sciences:["fintech","maritime","genetics"],insightShort:"PageRank IS the universal centrality equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["BIS systemic risk (Lehman PR ≈ 0.012), UN COMTRADE port chokepoint (Rotterdam PR ≈ 0.020), and STRING gene essentiality (TP53 PR ≈ 0.025) all use the SAME eigenvector — Brin & Page 1998 for the web, now spanning banking, trade, and genomics.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:16,name:"Kalman Filter",equation:"x̂(t+1) = x̂(t) + K·(z − H·x̂(t))",sciences:["maritime","aviation","genetics"],insightShort:"Kalman IS the universal state-estimation equation",hostPages:["global-shipping","analytics-outputs"],hostReasons:["AIS vessel tracking (100K vessels × 60s), ADS-B flight tracking (100K flights × 1s), and 1000-Genomes allele frequency tracking all use the SAME Bayesian update — Kalman 1960 invented this for Apollo navigation.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:17,name:"Monte Carlo",equation:"E[f(X)] ≈ (1/N)·Σ f(X_i)",sciences:["fintech","maritime","genetics"],insightShort:"Monte Carlo IS the universal estimation equation",hostPages:["fintech","global-shipping","monte-carlo","analytics-outputs"],hostReasons:["Option pricing (10⁶ GBM paths), port congestion (10⁵ vessel sims), and rare-variant permutation tests (10⁶ permutations) all use the SAME averaging — Metropolis 1946 invented this at Los Alamos for neutron transport.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:18,name:"Geometric Brownian Motion",equation:"dS = μS·dt + σS·dW",sciences:["fintech","maritime","genetics"],insightShort:"GBM IS the universal multiplicative-noise equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["SPX daily returns (Black-Scholes foundation), Rotterdam container dwell times, and Wright-Fisher allele drift all use the SAME SDE — multiplicative noise keeps S positive with log-normal stationarity.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:19,name:"Lloyd's Algorithm",equation:"μ_k ← mean({x : argmin_k ‖x − μ_k‖²})",sciences:["maritime","genetics","ML"],insightShort:"Lloyd IS the universal clustering equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["50K ports clustered by trade flows (UN COMTRADE), 2504 individuals clustered by SNP PCA (1000-Genomes), and 1.4M images clustered by ResNet-50 (ImageNet) all use the SAME iterate — Lloyd 1957 invented this at Bell Labs for PCM.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:20,name:"HyperLogLog",equation:"E = α_m m² (Σ 2^(-M_j))^(-1)",sciences:["data engineering","genomics","network security"],insightShort:"HLL IS the universal counter — 33M× memory compression with <1% error",hostPages:["big-data-ingestion","analytics-outputs"],hostReasons:["COUNT(DISTINCT user_id) in Snowflake/Spark, unique k-mers in Jellyfish (genome assembler), unique source IPs in Redis PFCOUNT (DDoS monitor) — all run the SAME hash→bucket→max-zeros→harmonic-mean algorithm. 12 KB vs 400 GB for exact counting.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:21,name:"Bloom Filter",equation:"P(fp) = (1 - e^(-kn/m))^k",sciences:["network security","genomics","databases"],insightShort:"Bloom filter IS the universal membership test — 23× compression with 0.1% false positives",hostPages:["kafka-connect","delta-lake","analytics-outputs"],hostReasons:["Chrome Safe Browsing (malware URL check), genome assembler read dedup, RocksDB SSTable key lookup — all use the SAME k-hash→bit-set→AND-check. 175 MB vs 4 GB for exact hash set.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:22,name:"Consistent Hashing",equation:"θ = hash(key) mod 2^256",sciences:["streaming","CDN","databases"],insightShort:"Consistent hashing IS the universal partitioner — K/n keys move, not all K",hostPages:["kafka","schema-registry","analytics-outputs"],hostReasons:["Kafka partition assignment across brokers, Akamai CDN edge routing, Cassandra shard assignment — all use the SAME hash ring. Adding a node moves 8% of data, not 50%.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:23,name:"LSM-Tree Compaction",equation:"WA = (L+1)/L",sciences:["data engineering","databases","distributed storage"],insightShort:"LSM compaction IS the universal write amplifier — 1.25× vs B-tree's 4-10×",hostPages:["delta-lake","big-data-ingestion","analytics-outputs"],hostReasons:["Delta Lake Auto Compaction (18,400→12 files), RocksDB level compaction (L0→L1→L2→L3), Cassandra size-tiered compaction — all use the SAME merge-sort. Write amplification 1.25× vs B-tree's 4-10×.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:24,name:"Count-Min Sketch",equation:"ê_i = min_j count[j][h_j(i)]",sciences:["streaming","genomics","networking"],insightShort:"CMS IS the universal frequency estimator — 4M× compression, bounded over-estimation",hostPages:["spark-streaming","flink","analytics-outputs"],hostReasons:["Spark Structured Streaming top-K, genome k-mer frequency counting (repeat detection), network heavy-hitter detection (DDoS) — all use the SAME d×w matrix. 20 KB vs 80 GB for exact hash map.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:25,name:"Reservoir Sampling",equation:"P(item_i in sample) = k/N",sciences:["streaming","A/B testing","genomics"],insightShort:"Reservoir IS the universal sampler — O(k) memory, uniform sampling from unbounded stream",hostPages:["spark-streaming","streaming-sql","analytics-outputs"],hostReasons:["Kafka stream event sampling, A/B test cohort selection from live users, GWAS variant subsampling — all use the SAME k/N replace-probability algorithm. O(k) memory regardless of stream length.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:26,name:"T-Digest",equation:"q̂(p) = merge(centroids)",sciences:["streaming","finance","observability"],insightShort:"T-Digest IS the universal quantile estimator — 80M× compression at the tails",hostPages:["spark-streaming","fintech","analytics-outputs"],hostReasons:["p99 latency in Spark, p99 VaR in Basel III Monte Carlo, p99 response time in Datadog — all use the SAME centroid-merging algorithm. 1 KB vs 80 GB for exact sorted array.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:27,name:"Cuckoo Filter",equation:"i2 = i1 XOR hash(fingerprint)",sciences:["databases","networking","caching"],insightShort:"Cuckoo Filter IS Bloom's successor — same membership test, PLUS deletion support",hostPages:["delta-lake","analytics-outputs"],hostReasons:["Cassandra SSTable with dynamic keys, routing table add/remove, Redis cache invalidation — all need membership test WITH deletion. Bloom can't delete; Cuckoo can.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:28,name:"Skip List",equation:"P(level L) = (1/2)^L",sciences:["databases","storage","compilers"],insightShort:"Skip List IS the universal ordered structure — O(log n) without tree rebalancing",hostPages:["duckdb","analytics-outputs"],hostReasons:["Redis ZSET (leaderboard), LevelDB/RocksDB memtable (sorted KV before SSTable flush), LLVM instruction scheduler — all use the SAME probabilistic linking. No rebalancing needed.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]}];function s(e){return r.filter(t=>t.hostPages.includes(e))}let o={0:[3,9,19],1:[0,6,7],2:[7,9,13],3:[0,2,8],4:[8,5,16],5:[4,18,8],6:[7,12,1],7:[6,2,16],8:[4,18,16],9:[0,2,19],10:[18,14,12],11:[15,16,17],12:[6,10,7],13:[2,16,15],14:[10,18,17],15:[13,0,11],16:[13,4,7],17:[18,14,9],18:[10,8,17],19:[0,9,6]};function l(e){return o[e]??[]}e.s(["ELEGANT_CODE_MAP",0,r,"cardsOnHostPage",()=>s,"recommendedCards",()=>l],518550);var c=e.i(487486),d=e.i(394908),u=e.i(972520);let m="discovery-path-visited";function p({relatedPages:e=[]}){let[s,o]=(0,i.useState)(()=>{try{let e=localStorage.getItem(m);return e?JSON.parse(e):[]}catch{return[]}});(0,i.useEffect)(()=>{try{let e=localStorage.getItem(m);if(e){let t=JSON.parse(e);setTimeout(()=>o(t),0)}}catch{}},[]);let p=(0,i.useMemo)(()=>{let t=[];if(s.length>0){let e={};for(let t of s)for(let i of l(t))s.includes(i)||(e[i]=(e[i]??0)+1);for(let[i,a]of Object.entries(e).sort((e,t)=>t[1]-e[1]).slice(0,3)){let e=r[Number(i)];e&&t.push({id:"elegant-code",reason:`Explore ${e.name} — recommended by ${a} of your visited cards`,isCousin:!0})}}for(let i of e){if(t.length>=3)break;t.find(e=>e.id===i.id)||t.push({...i,isCousin:!1})}return 0===t.length&&(t.push({id:"elegant-code",reason:"Start with the 20 elegant-code cards",isCousin:!1}),t.push({id:"connections",reason:"See the card → card graph",isCousin:!1}),t.push({id:"resources",reason:"Browse datasets, papers, libraries",isCousin:!1})),t.slice(0,3)},[s,e]);return 0===p.length?null:(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsxs)("p",{className:"text-xs font-semibold text-primary mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(d.Compass,{className:"h-3.5 w-3.5"}),"Next steps — where to go from here",s.length>0&&(0,t.jsxs)("span",{className:"text-[9px] text-muted-foreground ml-1",children:["(",s.length," cards explored)"]})]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:p.map((e,i)=>(0,t.jsxs)(a.default,{href:(0,n.hrefFor)(e.id),className:"text-xs text-primary hover:underline flex items-center gap-1",children:[(0,t.jsx)(u.ArrowRight,{className:"h-3 w-3"}),e.reason,e.isCousin&&(0,t.jsx)(c.Badge,{variant:"outline",className:"text-[8px] px-1 py-0 ml-1",children:"cousin"})]},i))})]})}e.s(["NextSteps",()=>p],342046)},332017,e=>{"use strict";var t=e.i(843476),i=e.i(522016),a=e.i(25652),n=e.i(810980),r=e.i(901752);function s({title:e,connectedTo:s,researchHref:o,children:l}){return(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-4 space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-start gap-2",children:[(0,t.jsx)(a.TrendingUp,{className:"h-4 w-4 text-primary mt-0.5 shrink-0"}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-foreground/90 leading-tight",children:e}),s&&(0,t.jsxs)("div",{className:"flex items-center gap-1.5 mt-1",children:[(0,t.jsx)(n.BookOpen,{className:"h-3 w-3 text-muted-foreground"}),(0,t.jsxs)(i.default,{href:o??(0,r.hrefFor)("research"),className:"text-[10px] text-muted-foreground hover:text-primary hover:underline",children:["Connected to: ",s," →"]})]})]})]}),(0,t.jsx)("div",{className:"text-xs text-muted-foreground leading-relaxed space-y-2 pl-6",children:l})]})}function o({pageTitle:e,children:i}){return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 border-b border-border/60 pb-2",children:[(0,t.jsx)(a.TrendingUp,{className:"h-5 w-5 text-primary"}),(0,t.jsxs)("h2",{className:"text-base font-bold text-foreground/90",children:["My deeper thoughts — ",e]})]}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground italic leading-relaxed",children:"These are not summaries. They are arguments — the kind of connections a reader with serious grey matter would make after living with the material for years. Each thought connects to the platform's research section (ADRs, papers, decision records) so it's traceable, not just opinionated."}),(0,t.jsx)("div",{className:"space-y-3",children:i})]})}e.s(["DeeperThought",()=>s,"DeeperThoughtSection",()=>o])},431343,63209,595468,868054,e=>{"use strict";var t=e.i(451477);e.s(["Play",()=>t.default],431343);var i=e.i(361653);e.s(["AlertCircle",()=>i.default],63209);var a=e.i(123287);e.s(["CheckCircle2",()=>a.default],595468);var n=e.i(249988);e.s(["Terminal",()=>n.default],868054)},716675,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(846932),n=e.i(88653),r=e.i(519455),s=e.i(487486),o=e.i(431343),l=e.i(531278),c=e.i(63209),d=e.i(595468),u=e.i(868054);let m=null,p="0.26.2",h=`https://cdn.jsdelivr.net/pyodide/v${p}/full/`;async function f(){return m||(m=(async()=>(await new Promise((e,t)=>{if(window.loadPyodide)return void e();let i=document.createElement("script");i.src=`${h}pyodide.js`,i.onload=()=>e(),i.onerror=()=>t(Error("Failed to load Pyodide bootstrap")),document.head.appendChild(i)}),await window.loadPyodide({indexURL:h})))())}function g({code:e,buttonLabel:m="Run in browser",preamble:h,compact:g=!1,onOutput:v,hideTextOutput:y=!1}){let[b,_]=(0,i.useState)("idle"),[x,S]=(0,i.useState)(""),[k,w]=(0,i.useState)(null),[C,M]=(0,i.useState)(null),P=(0,i.useRef)(null),L=(0,i.useCallback)(async()=>{_("loading"),w(null),S("Loading Pyodide runtime (~10MB)…\n");let t=performance.now();try{let i=await f(),a=Math.round(performance.now()-t);M(a);let n=[],r=e=>{n.push(e)};try{i.setStdout({batched:r}),i.setStderr({batched:r})}catch{try{i.setStdout(r),i.setStderr(r)}catch{}}let s=(h??"")+"\n"+e,o=[];if(/\bnumpy\b|\bnp\./.test(s)&&o.push("numpy"),/\bscipy\b|\bsp\./.test(s)&&o.push("scipy"),/\bsklearn\b|\bGradientBoosting\b|\bRandomForest\b|\btrain_test_split\b|\bKMeans\b|\bSVC\b|\bLogisticRegression\b/.test(s)&&o.push("scikit-learn"),/\bpandas\b|\bpd\./.test(s)&&o.push("pandas"),/\bpyarrow\b|\bpq\./.test(s)&&o.push("pyarrow"),o.length>0)try{await i.loadPackage(o)}catch{}_("running"),S(`Pyodide loaded in ${a}ms. Running…

`),h&&await i.runPythonAsync(h),await i.runPythonAsync(e);let l=n.join("");S(e=>e+(l||"(no output)")),_("done"),v&&v(l)}catch(t){let e=t instanceof Error?t.message:String(t);w(e),_("error"),S(t=>t+`
Error: ${e}`)}},[e,h,v]);return(0,i.useEffect)(()=>{P.current&&(P.current.scrollTop=P.current.scrollHeight)},[x]),(0,t.jsxs)("div",{className:`mt-3 ${g?"":"rounded-md border border-primary/30 bg-primary/3 p-3"}`,children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)(r.Button,{size:g?"sm":"default",variant:"running"===b||"loading"===b?"outline":"default",className:"gap-1.5",onClick:L,disabled:"loading"===b||"running"===b,children:["loading"===b||"running"===b?(0,t.jsx)(l.Loader2,{className:"h-3.5 w-3.5 animate-spin"}):"done"===b?(0,t.jsx)(d.CheckCircle2,{className:"h-3.5 w-3.5"}):"error"===b?(0,t.jsx)(c.AlertCircle,{className:"h-3.5 w-3.5"}):(0,t.jsx)(o.Play,{className:"h-3.5 w-3.5"}),m]}),!g&&(0,t.jsxs)(s.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,t.jsx)(u.Terminal,{className:"h-2.5 w-2.5"}),"Pyodide v",p]}),null!==C&&"done"===b&&(0,t.jsxs)("span",{className:"text-[10px] text-muted-foreground",children:["Runtime: ",C,"ms load + execution"]})]}),(0,t.jsx)(n.AnimatePresence,{children:("idle"!==b||x)&&!y&&(0,t.jsx)(a.motion.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-2",children:(0,t.jsx)("div",{ref:P,className:`rounded-md bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] p-2.5 text-[11px] font-mono leading-relaxed overflow-x-auto code-scroll max-h-64 overflow-y-auto ${k?"border border-rose-500/40":"border border-emerald-500/30"}`,children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap",children:x})})})})]})}e.s(["PyodideRunner",()=>g])},643531,e=>{"use strict";var t=e.i(678745);e.s(["Check",()=>t.default])},174886,e=>{"use strict";var t=e.i(991124);e.s(["Copy",()=>t.default])},122836,e=>{"use strict";var t=e.i(843476),i=e.i(271645),a=e.i(643531),n=e.i(174886),r=e.i(519455);function s({code:e,language:s="sql",filename:o,highlight:l=[]}){let[c,d]=(0,i.useState)(!1),u=e.replace(/\n$/,"").split("\n"),m=async()=>{try{await navigator.clipboard.writeText(e),d(!0),setTimeout(()=>d(!1),1500)}catch{}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-white/5",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[11px] text-white/60 font-mono",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-rose-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-amber-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-emerald-400"}),(0,t.jsx)("span",{className:"ml-2 uppercase tracking-wider",children:s}),o&&(0,t.jsxs)("span",{className:"text-white/40",children:["· ",o]})]}),(0,t.jsxs)(r.Button,{variant:"ghost",size:"sm",className:"h-6 px-2 text-[11px] text-white/70 hover:text-white hover:bg-white/10",onClick:m,"aria-label":"Copy code",children:[c?(0,t.jsx)(a.Check,{className:"h-3 w-3 mr-1"}):(0,t.jsx)(n.Copy,{className:"h-3 w-3 mr-1"}),c?"Copied":"Copy"]})]}),(0,t.jsx)("pre",{className:"code-scroll overflow-x-auto p-3 text-[12.5px] leading-relaxed font-mono",children:(0,t.jsx)("code",{children:u.map((e,i)=>{let a=i+1,n=l.includes(a);return(0,t.jsxs)("div",{className:["flex",n?"bg-primary/20 -mx-3 px-3 border-l-2 border-primary":""].join(" "),children:[(0,t.jsx)("span",{className:"select-none text-white/30 w-8 inline-block text-right pr-3 shrink-0",children:a}),(0,t.jsx)("span",{className:"whitespace-pre",children:e||" "})]},a)})})})]})}function o({children:e}){return(0,t.jsx)("code",{className:"rounded bg-muted px-1.5 py-0.5 text-[12px] font-mono text-foreground/90 border border-border/60",children:e})}e.s(["CodeBlock",()=>s,"InlineCode",()=>o])},254360,e=>{"use strict";var t=e.i(366344);e.s(["Sigma",()=>t.default])},59938,e=>{"use strict";var t=e.i(843476),i=e.i(522016),a=e.i(852008),n=e.i(901752);function r({topics:e}){return 0===e.length?null:(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-muted/20 p-4",children:[(0,t.jsxs)("p",{className:"text-xs font-semibold mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(a.Layers,{className:"h-3.5 w-3.5 text-primary"})," Related topics — cross-page navigation"]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2 text-sm",children:e.map((a,r)=>(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsxs)(i.default,{href:(0,n.hrefFor)(a.id),className:"text-primary hover:underline",children:["→ ",a.reason]}),r<e.length-1&&(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"})]},a.id))})]})}e.s(["RelatedTopics",()=>r])},664659,e=>{"use strict";var t=e.i(631171);e.s(["ChevronDown",()=>t.default])},243079,823731,77899,17983,547156,936534,848862,e=>{"use strict";var t=e.i(391889),i=e.i(560208);function a(e){return e.x}function n(e){return e.y}var r=Math.PI*(3-Math.sqrt(5));function s(e){return function(){return e}}function o(e){return(e()-.5)*1e-6}function l(e){return e.index}function c(e,t){var i=e.get(t);if(!i)throw Error("node not found: "+t);return i}function d(e,t,i,a){if(isNaN(t)||isNaN(i))return e;var n,r,s,o,l,c,d,u,m,p=e._root,h={data:a},f=e._x0,g=e._y0,v=e._x1,y=e._y1;if(!p)return e._root=h,e;for(;p.length;)if((c=t>=(r=(f+v)/2))?f=r:v=r,(d=i>=(s=(g+y)/2))?g=s:y=s,n=p,!(p=p[u=d<<1|c]))return n[u]=h,e;if(o=+e._x.call(null,p.data),l=+e._y.call(null,p.data),t===o&&i===l)return h.next=p,n?n[u]=h:e._root=h,e;do n=n?n[u]=[,,,,]:e._root=[,,,,],(c=t>=(r=(f+v)/2))?f=r:v=r,(d=i>=(s=(g+y)/2))?g=s:y=s;while((u=d<<1|c)==(m=(l>=s)<<1|o>=r))return n[m]=p,n[u]=h,e}function u(e,t,i,a,n){this.node=e,this.x0=t,this.y0=i,this.x1=a,this.y1=n}function m(e){return e[0]}function p(e){return e[1]}function h(e,t,i){var a=new f(null==t?m:t,null==i?p:i,NaN,NaN,NaN,NaN);return null==e?a:a.addAll(e)}function f(e,t,i,a,n,r){this._x=e,this._y=t,this._x0=i,this._y0=a,this._x1=n,this._y1=r,this._root=void 0}function g(e){for(var t={data:e.data},i=t;e=e.next;)i=i.next={data:e.data};return t}e.s(["forceSimulation",0,function(e){let a;var n,s=1,o=.001,l=1-Math.pow(.001,1/300),c=0,d=.6,u=new Map,m=(0,i.timer)(f),p=(0,t.dispatch)("tick","end"),h=(a=1,()=>(a=(1664525*a+0x3c6ef35f)%0x100000000)/0x100000000);function f(){g(),p.call("tick",n),s<o&&(m.stop(),p.call("end",n))}function g(t){var i,a,r=e.length;void 0===t&&(t=1);for(var o=0;o<t;++o)for(s+=(c-s)*l,u.forEach(function(e){e(s)}),i=0;i<r;++i)null==(a=e[i]).fx?a.x+=a.vx*=d:(a.x=a.fx,a.vx=0),null==a.fy?a.y+=a.vy*=d:(a.y=a.fy,a.vy=0);return n}function v(){for(var t,i=0,a=e.length;i<a;++i){if((t=e[i]).index=i,null!=t.fx&&(t.x=t.fx),null!=t.fy&&(t.y=t.fy),isNaN(t.x)||isNaN(t.y)){var n=10*Math.sqrt(.5+i),s=i*r;t.x=n*Math.cos(s),t.y=n*Math.sin(s)}(isNaN(t.vx)||isNaN(t.vy))&&(t.vx=t.vy=0)}}function y(t){return t.initialize&&t.initialize(e,h),t}return null==e&&(e=[]),v(),n={tick:g,restart:function(){return m.restart(f),n},stop:function(){return m.stop(),n},nodes:function(t){return arguments.length?(e=t,v(),u.forEach(y),n):e},alpha:function(e){return arguments.length?(s=+e,n):s},alphaMin:function(e){return arguments.length?(o=+e,n):o},alphaDecay:function(e){return arguments.length?(l=+e,n):+l},alphaTarget:function(e){return arguments.length?(c=+e,n):c},velocityDecay:function(e){return arguments.length?(d=1-e,n):1-d},randomSource:function(e){return arguments.length?(h=e,u.forEach(y),n):h},force:function(e,t){return arguments.length>1?(null==t?u.delete(e):u.set(e,y(t)),n):u.get(e)},find:function(t,i,a){var n,r,s,o,l,c=0,d=e.length;for(null==a?a=1/0:a*=a,c=0;c<d;++c)(s=(n=t-(o=e[c]).x)*n+(r=i-o.y)*r)<a&&(l=o,a=s);return l},on:function(e,t){return arguments.length>1?(p.on(e,t),n):p.on(e)}}}],243079),e.s(["default",0,s],823731),e.s(["forceLink",0,function(e){var t,i,a,n,r,d,u=l,m=function(e){return 1/Math.min(n[e.source.index],n[e.target.index])},p=s(30),h=1;function f(a){for(var n=0,s=e.length;n<h;++n)for(var l,c,u,m,p,f,g,v=0;v<s;++v)c=(l=e[v]).source,f=((f=Math.sqrt((m=(u=l.target).x+u.vx-c.x-c.vx||o(d))*m+(p=u.y+u.vy-c.y-c.vy||o(d))*p))-i[v])/f*a*t[v],m*=f,p*=f,u.vx-=m*(g=r[v]),u.vy-=p*g,c.vx+=m*(g=1-g),c.vy+=p*g}function g(){if(a){var s,o,l=a.length,d=e.length,m=new Map(a.map((e,t)=>[u(e,t,a),e]));for(s=0,n=Array(l);s<d;++s)(o=e[s]).index=s,"object"!=typeof o.source&&(o.source=c(m,o.source)),"object"!=typeof o.target&&(o.target=c(m,o.target)),n[o.source.index]=(n[o.source.index]||0)+1,n[o.target.index]=(n[o.target.index]||0)+1;for(s=0,r=Array(d);s<d;++s)o=e[s],r[s]=n[o.source.index]/(n[o.source.index]+n[o.target.index]);t=Array(d),v(),i=Array(d),y()}}function v(){if(a)for(var i=0,n=e.length;i<n;++i)t[i]=+m(e[i],i,e)}function y(){if(a)for(var t=0,n=e.length;t<n;++t)i[t]=+p(e[t],t,e)}return null==e&&(e=[]),f.initialize=function(e,t){a=e,d=t,g()},f.links=function(t){return arguments.length?(e=t,g(),f):e},f.id=function(e){return arguments.length?(u=e,f):u},f.iterations=function(e){return arguments.length?(h=+e,f):h},f.strength=function(e){return arguments.length?(m="function"==typeof e?e:s(+e),v(),f):m},f.distance=function(e){return arguments.length?(p="function"==typeof e?e:s(+e),y(),f):p},f}],77899);var v=h.prototype=f.prototype;function y(e){return e.x+e.vx}function b(e){return e.y+e.vy}v.copy=function(){var e,t,i=new f(this._x,this._y,this._x0,this._y0,this._x1,this._y1),a=this._root;if(!a)return i;if(!a.length)return i._root=g(a),i;for(e=[{source:a,target:i._root=[,,,,]}];a=e.pop();)for(var n=0;n<4;++n)(t=a.source[n])&&(t.length?e.push({source:t,target:a.target[n]=[,,,,]}):a.target[n]=g(t));return i},v.add=function(e){let t=+this._x.call(null,e),i=+this._y.call(null,e);return d(this.cover(t,i),t,i,e)},v.addAll=function(e){var t,i,a,n,r=e.length,s=Array(r),o=Array(r),l=1/0,c=1/0,u=-1/0,m=-1/0;for(i=0;i<r;++i)!(isNaN(a=+this._x.call(null,t=e[i]))||isNaN(n=+this._y.call(null,t)))&&(s[i]=a,o[i]=n,a<l&&(l=a),a>u&&(u=a),n<c&&(c=n),n>m&&(m=n));if(l>u||c>m)return this;for(this.cover(l,c).cover(u,m),i=0;i<r;++i)d(this,s[i],o[i],e[i]);return this},v.cover=function(e,t){if(isNaN(e*=1)||isNaN(t*=1))return this;var i=this._x0,a=this._y0,n=this._x1,r=this._y1;if(isNaN(i))n=(i=Math.floor(e))+1,r=(a=Math.floor(t))+1;else{for(var s,o,l=n-i||1,c=this._root;i>e||e>=n||a>t||t>=r;)switch(o=(t<a)<<1|e<i,(s=[,,,,])[o]=c,c=s,l*=2,o){case 0:n=i+l,r=a+l;break;case 1:i=n-l,r=a+l;break;case 2:n=i+l,a=r-l;break;case 3:i=n-l,a=r-l}this._root&&this._root.length&&(this._root=c)}return this._x0=i,this._y0=a,this._x1=n,this._y1=r,this},v.data=function(){var e=[];return this.visit(function(t){if(!t.length)do e.push(t.data);while(t=t.next)}),e},v.extent=function(e){return arguments.length?this.cover(+e[0][0],+e[0][1]).cover(+e[1][0],+e[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},v.find=function(e,t,i){var a,n,r,s,o,l,c,d=this._x0,m=this._y0,p=this._x1,h=this._y1,f=[],g=this._root;for(g&&f.push(new u(g,d,m,p,h)),null==i?i=1/0:(d=e-i,m=t-i,p=e+i,h=t+i,i*=i);l=f.pop();)if((g=l.node)&&!((n=l.x0)>p)&&!((r=l.y0)>h)&&!((s=l.x1)<d)&&!((o=l.y1)<m))if(g.length){var v=(n+s)/2,y=(r+o)/2;f.push(new u(g[3],v,y,s,o),new u(g[2],n,y,v,o),new u(g[1],v,r,s,y),new u(g[0],n,r,v,y)),(c=(t>=y)<<1|e>=v)&&(l=f[f.length-1],f[f.length-1]=f[f.length-1-c],f[f.length-1-c]=l)}else{var b=e-this._x.call(null,g.data),_=t-this._y.call(null,g.data),x=b*b+_*_;if(x<i){var S=Math.sqrt(i=x);d=e-S,m=t-S,p=e+S,h=t+S,a=g.data}}return a},v.remove=function(e){if(isNaN(r=+this._x.call(null,e))||isNaN(s=+this._y.call(null,e)))return this;var t,i,a,n,r,s,o,l,c,d,u,m,p=this._root,h=this._x0,f=this._y0,g=this._x1,v=this._y1;if(!p)return this;if(p.length)for(;;){if((c=r>=(o=(h+g)/2))?h=o:g=o,(d=s>=(l=(f+v)/2))?f=l:v=l,t=p,!(p=p[u=d<<1|c]))return this;if(!p.length)break;(t[u+1&3]||t[u+2&3]||t[u+3&3])&&(i=t,m=u)}for(;p.data!==e;)if(a=p,!(p=p.next))return this;return((n=p.next)&&delete p.next,a)?n?a.next=n:delete a.next:t?(n?t[u]=n:delete t[u],(p=t[0]||t[1]||t[2]||t[3])&&p===(t[3]||t[2]||t[1]||t[0])&&!p.length&&(i?i[m]=p:this._root=p)):this._root=n,this},v.removeAll=function(e){for(var t=0,i=e.length;t<i;++t)this.remove(e[t]);return this},v.root=function(){return this._root},v.size=function(){var e=0;return this.visit(function(t){if(!t.length)do++e;while(t=t.next)}),e},v.visit=function(e){var t,i,a,n,r,s,o=[],l=this._root;for(l&&o.push(new u(l,this._x0,this._y0,this._x1,this._y1));t=o.pop();)if(!e(l=t.node,a=t.x0,n=t.y0,r=t.x1,s=t.y1)&&l.length){var c=(a+r)/2,d=(n+s)/2;(i=l[3])&&o.push(new u(i,c,d,r,s)),(i=l[2])&&o.push(new u(i,a,d,c,s)),(i=l[1])&&o.push(new u(i,c,n,r,d)),(i=l[0])&&o.push(new u(i,a,n,c,d))}return this},v.visitAfter=function(e){var t,i=[],a=[];for(this._root&&i.push(new u(this._root,this._x0,this._y0,this._x1,this._y1));t=i.pop();){var n=t.node;if(n.length){var r,s=t.x0,o=t.y0,l=t.x1,c=t.y1,d=(s+l)/2,m=(o+c)/2;(r=n[0])&&i.push(new u(r,s,o,d,m)),(r=n[1])&&i.push(new u(r,d,o,l,m)),(r=n[2])&&i.push(new u(r,s,m,d,c)),(r=n[3])&&i.push(new u(r,d,m,l,c))}a.push(t)}for(;t=a.pop();)e(t.node,t.x0,t.y0,t.x1,t.y1);return this},v.x=function(e){return arguments.length?(this._x=e,this):this._x},v.y=function(e){return arguments.length?(this._y=e,this):this._y},e.s(["forceManyBody",0,function(){var e,t,i,r,l,c=s(-30),d=1,u=1/0,m=.81;function p(i){var s,o=e.length,l=h(e,a,n).visitAfter(g);for(r=i,s=0;s<o;++s)t=e[s],l.visit(v)}function f(){if(e){var t,i,a=e.length;for(t=0,l=Array(a);t<a;++t)l[(i=e[t]).index]=+c(i,t,e)}}function g(e){var t,i,a,n,r,s=0,o=0;if(e.length){for(a=n=r=0;r<4;++r)(t=e[r])&&(i=Math.abs(t.value))&&(s+=t.value,o+=i,a+=i*t.x,n+=i*t.y);e.x=a/o,e.y=n/o}else{(t=e).x=t.data.x,t.y=t.data.y;do s+=l[t.data.index];while(t=t.next)}e.value=s}function v(e,a,n,s){if(!e.value)return!0;var c=e.x-t.x,p=e.y-t.y,h=s-a,f=c*c+p*p;if(h*h/m<f)return f<u&&(0===c&&(f+=(c=o(i))*c),0===p&&(f+=(p=o(i))*p),f<d&&(f=Math.sqrt(d*f)),t.vx+=c*e.value*r/f,t.vy+=p*e.value*r/f),!0;if(!e.length&&!(f>=u)){(e.data!==t||e.next)&&(0===c&&(f+=(c=o(i))*c),0===p&&(f+=(p=o(i))*p),f<d&&(f=Math.sqrt(d*f)));do e.data!==t&&(h=l[e.data.index]*r/f,t.vx+=c*h,t.vy+=p*h);while(e=e.next)}}return p.initialize=function(t,a){e=t,i=a,f()},p.strength=function(e){return arguments.length?(c="function"==typeof e?e:s(+e),f(),p):c},p.distanceMin=function(e){return arguments.length?(d=e*e,p):Math.sqrt(d)},p.distanceMax=function(e){return arguments.length?(u=e*e,p):Math.sqrt(u)},p.theta=function(e){return arguments.length?(m=e*e,p):Math.sqrt(m)},p}],17983),e.s(["forceCenter",0,function(e,t){var i,a=1;function n(){var n,r,s=i.length,o=0,l=0;for(n=0;n<s;++n)o+=(r=i[n]).x,l+=r.y;for(o=(o/s-e)*a,l=(l/s-t)*a,n=0;n<s;++n)r=i[n],r.x-=o,r.y-=l}return null==e&&(e=0),null==t&&(t=0),n.initialize=function(e){i=e},n.x=function(t){return arguments.length?(e=+t,n):e},n.y=function(e){return arguments.length?(t=+e,n):t},n.strength=function(e){return arguments.length?(a=+e,n):a},n}],547156),e.s(["forceCollide",0,function(e){var t,i,a,n=1,r=1;function l(){for(var e,s,l,d,u,m,p,f=t.length,g=0;g<r;++g)for(e=0,s=h(t,y,b).visitAfter(c);e<f;++e)p=(m=i[(l=t[e]).index])*m,d=l.x+l.vx,u=l.y+l.vy,s.visit(v);function v(e,t,i,r,s){var c=e.data,h=e.r,f=m+h;if(c){if(c.index>l.index){var g=d-c.x-c.vx,v=u-c.y-c.vy,y=g*g+v*v;y<f*f&&(0===g&&(y+=(g=o(a))*g),0===v&&(y+=(v=o(a))*v),y=(f-(y=Math.sqrt(y)))/y*n,l.vx+=(g*=y)*(f=(h*=h)/(p+h)),l.vy+=(v*=y)*f,c.vx-=g*(f=1-f),c.vy-=v*f)}return}return t>d+f||r<d-f||i>u+f||s<u-f}}function c(e){if(e.data)return e.r=i[e.data.index];for(var t=e.r=0;t<4;++t)e[t]&&e[t].r>e.r&&(e.r=e[t].r)}function d(){if(t){var a,n,r=t.length;for(a=0,i=Array(r);a<r;++a)i[(n=t[a]).index]=+e(n,a,t)}}return"function"!=typeof e&&(e=s(null==e?1:+e)),l.initialize=function(e,i){t=e,a=i,d()},l.iterations=function(e){return arguments.length?(r=+e,l):r},l.strength=function(e){return arguments.length?(n=+e,l):n},l.radius=function(t){return arguments.length?(e="function"==typeof t?t:s(+t),d(),l):e},l}],936534);var _=e.i(723685),x=e.i(100561),S=e.i(990273),k=e.i(36377);let w=e=>()=>e;function C(e,{sourceEvent:t,subject:i,target:a,identifier:n,active:r,x:s,y:o,dx:l,dy:c,dispatch:d}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:t,enumerable:!0,configurable:!0},subject:{value:i,enumerable:!0,configurable:!0},target:{value:a,enumerable:!0,configurable:!0},identifier:{value:n,enumerable:!0,configurable:!0},active:{value:r,enumerable:!0,configurable:!0},x:{value:s,enumerable:!0,configurable:!0},y:{value:o,enumerable:!0,configurable:!0},dx:{value:l,enumerable:!0,configurable:!0},dy:{value:c,enumerable:!0,configurable:!0},_:{value:d}})}function M(e){return!e.ctrlKey&&!e.button}function P(){return this.parentNode}function L(e,t){return null==t?{x:e.x,y:e.y}:t}function N(){return navigator.maxTouchPoints||"ontouchstart"in this}C.prototype.on=function(){var e=this._.on.apply(this._,arguments);return e===this._?this:e},e.s(["drag",0,function(){var e,i,a,n,r=M,s=P,o=L,l=N,c={},d=(0,t.dispatch)("start","drag","end"),u=0,m=0;function p(e){e.on("mousedown.drag",h).filter(l).on("touchstart.drag",v).on("touchmove.drag",y,k.nonpassive).on("touchend.drag touchcancel.drag",b).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function h(t,o){if(!n&&r.call(this,t,o)){var l=T(this,s.call(this,t,o),t,o,"mouse");l&&((0,_.select)(t.view).on("mousemove.drag",f,k.nonpassivecapture).on("mouseup.drag",g,k.nonpassivecapture),(0,S.default)(t.view),(0,k.nopropagation)(t),a=!1,e=t.clientX,i=t.clientY,l("start",t))}}function f(t){if((0,k.default)(t),!a){var n=t.clientX-e,r=t.clientY-i;a=n*n+r*r>m}c.mouse("drag",t)}function g(e){(0,_.select)(e.view).on("mousemove.drag mouseup.drag",null),(0,S.yesdrag)(e.view,a),(0,k.default)(e),c.mouse("end",e)}function v(e,t){if(r.call(this,e,t)){var i,a,n=e.changedTouches,o=s.call(this,e,t),l=n.length;for(i=0;i<l;++i)(a=T(this,o,e,t,n[i].identifier,n[i]))&&((0,k.nopropagation)(e),a("start",e,n[i]))}}function y(e){var t,i,a=e.changedTouches,n=a.length;for(t=0;t<n;++t)(i=c[a[t].identifier])&&((0,k.default)(e),i("drag",e,a[t]))}function b(e){var t,i,a=e.changedTouches,r=a.length;for(n&&clearTimeout(n),n=setTimeout(function(){n=null},500),t=0;t<r;++t)(i=c[a[t].identifier])&&((0,k.nopropagation)(e),i("end",e,a[t]))}function T(e,t,i,a,n,r){var s,l,m,h=d.copy(),f=(0,x.pointer)(r||i,t);if(null!=(m=o.call(e,new C("beforestart",{sourceEvent:i,target:p,identifier:n,active:u,x:f[0],y:f[1],dx:0,dy:0,dispatch:h}),a)))return s=m.x-f[0]||0,l=m.y-f[1]||0,function i(r,o,d){var g,v=f;switch(r){case"start":c[n]=i,g=u++;break;case"end":delete c[n],--u;case"drag":f=(0,x.pointer)(d||o,t),g=u}h.call(r,e,new C(r,{sourceEvent:o,subject:m,target:p,identifier:n,active:g,x:f[0]+s,y:f[1]+l,dx:f[0]-v[0],dy:f[1]-v[1],dispatch:h}),a)}}return p.filter=function(e){return arguments.length?(r="function"==typeof e?e:w(!!e),p):r},p.container=function(e){return arguments.length?(s="function"==typeof e?e:w(e),p):s},p.subject=function(e){return arguments.length?(o="function"==typeof e?e:w(e),p):o},p.touchable=function(e){return arguments.length?(l="function"==typeof e?e:w(!!e),p):l},p.on=function(){var e=d.on.apply(d,arguments);return e===d?p:e},p.clickDistance=function(e){return arguments.length?(m=(e*=1)*e,p):Math.sqrt(m)},p}],848862)},618393,e=>{"use strict";var t=e.i(953651);e.s(["Server",()=>t.default])},227516,e=>{"use strict";var t=e.i(565123);e.s(["History",()=>t.default])},727927,e=>{"use strict";var t=e.i(651617);e.s(["Cloud",()=>t.default])},366140,e=>{"use strict";var t=e.i(843476),i=e.i(658041),a=e.i(691385),n=e.i(21218),r=e.i(455711),s=e.i(78094),o=e.i(581418);let l=[{id:"mlflow-genomics-variant-tracking",step:"1",title:"Genomics Variant Calling Model Tracking",subtitle:"Life Sciences — track GATK vs DeepVariant vs Strelka2 accuracy",accent:"oklch(0.65 0.16 30)",icon:(0,t.jsx)(i.Database,{className:"h-4 w-4"}),badge:"Life Sciences · Genomics",brief:{dataset:"1000 Genomes Project validation set — 2,504 individuals, ~3B SNPs. Track variant caller accuracy (F1, precision, recall, AUC) across GATK HaplotypeCaller, DeepVariant, Strelka2 via MLflow.",scale:"~3B SNPs · 2,504 individuals · 3 variant callers × 5 hyperparameter configs = 15 runs",why:"Shows MLflow Tracking for genomics: each variant caller is a model, each hyperparameter config is a run, AUC/F1/precision/recall are tracked. Model Registry promotes the best variant caller to Production."},stats:[{label:"SNPs",value:"3 billion"},{label:"Individuals",value:"2,504"},{label:"Runs",value:"15"},{label:"Best AUC",value:"0.95 (DeepVariant)"}],tools:["MLflow Tracking","MLflow Model Registry","GATK","DeepVariant","Strelka2","bcftools"],codeTabs:[{lang:"scala",filename:"GenomicsMLflowTracking.scala",code:`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

// Track genomics variant callers in MLflow via Spark
val spark = SparkSession.builder().getOrCreate()

// Evaluate 3 variant callers on 1000 Genomes truth set
val callers = Seq("GATK_HaplotypeCaller", "DeepVariant", "Strelka2")
val configs = Seq(Map("min_conf" -> 10), Map("min_conf" -> 20), Map("min_conf" -> 30))

for (caller <- callers; config <- configs) {
  val variants = spark.read.format("csv")
    .load(s"s3://genomics-results/$caller/")
    .filter($"QUAL" > config("min_conf"))

  val truthSet = spark.read.parquet("s3://genomics-truth/1000g/")
  val tp = variants.join(truthSet, Seq("chrom", "pos", "ref", "alt"), "inner").count()
  val fp = variants.join(truthSet, Seq("chrom", "pos", "ref", "alt"), "left_anti").count()
  val fn = truthSet.join(variants, Seq("chrom", "pos", "ref", "alt"), "left_anti").count()

  val precision = tp.toDouble / (tp + fp)
  val recall = tp.toDouble / (tp + fn)
  val f1 = 2 * precision * recall / (precision + recall)

  // Log to MLflow
  spark.sql(s"""
    SELECT mlflow_log_metric('precision', $precision),
           mlflow_log_metric('recall', $recall),
           mlflow_log_metric('f1', $f1),
           mlflow_log_param('caller', '$caller'),
           mlflow_log_param('min_conf', \${config("min_conf")})
  """)
}`},{lang:"rust",filename:"genomics_mlflow_tracking.rs",code:`use mlflow_rust::tracking::MlflowClient;

// Rust MLflow client — log variant caller metrics from outside Python.
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = MlflowClient::new("http://mlflow:5000")?;
    let experiment_id = client.create_experiment("genomics_variant_calling").await?;

    for caller in &["GATK", "DeepVariant", "Strelka2"] {
        let run = client.create_run(experiment_id, caller).await?;
        client.log_metric(run.run_id, "auc", 0.92 + (caller.len() as f64 * 0.01)).await?;
        client.log_metric(run.run_id, "f1", 0.88).await?;
        client.log_param(run.run_id, "caller", caller).await?;
    }
    Ok(())
}`},{lang:"go",filename:"genomics_mlflow_tracking.go",code:`package main

import (
    "context"
    "fmt"
    "github.com/mlflow/mlflow-go"
)

func main() {
    client := mlflow.NewClient("http://mlflow:5000")
    ctx := context.Background()
    expID, _ := client.CreateExperiment(ctx, "genomics_variant_calling")
    for _, caller := range []string{"GATK", "DeepVariant", "Strelka2"} {
        run, _ := client.CreateRun(ctx, expID, caller)
        client.LogMetric(ctx, run.ID, "auc", 0.92)
        client.LogMetric(ctx, run.ID, "f1", 0.88)
        client.LogParam(ctx, run.ID, "caller", caller)
        fmt.Printf("Logged run for %s\\n", caller)
    }
}`},{lang:"elixir",filename:"genomics_mlflow_tracking.ex",code:`defmodule Genomics.MLflowTracking do
  @moduledoc "Track variant callers in MLflow via HTTP API"
  use GenServer

  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)

  @impl true
  def init(:ok) do
    callers = ["GATK", "DeepVariant", "Strelka2"]
    Enum.each(callers, fn caller ->
      run_id = create_run(caller)
      log_metric(run_id, "auc", 0.92 + (String.length(caller) * 0.01))
      log_metric(run_id, "f1", 0.88)
      log_param(run_id, "caller", caller)
    end)
    {:ok, %{}}
  end

  defp create_run(caller) do
    {:ok, resp} = HTTPoison.post!("http://mlflow:5000/api/2.0/mlflow/runs/create",
      Jason.encode!(%{experiment_id => "genomics", run_name => caller}))
    resp.body["run"]["info"]["run_id"]
  end

  defp log_metric(run_id, key, value) do
    HTTPoison.post!("http://mlflow:5000/api/2.0/mlflow/runs/log-metric",
      Jason.encode!(%{run_id => run_id, metric => key, value => value}))
  end

  defp log_param(run_id, key, value) do
    HTTPoison.post!("http://mlflow:5000/api/2.0/mlflow/runs/log-batch",
      Jason.encode!(%{run_id => run_id, params => [%{key => key, value => value}]}))
  end
end`},{lang:"zig",filename:"genomics_mlflow_tracking.zig",code:`const std = @import("std");
const mlflow = @import("mlflow-zig");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var client = try mlflow.Client.init(allocator, .{.url = "http://mlflow:5000"});
    defer client.deinit();

    const callers = [_][]const u8{ "GATK", "DeepVariant", "Strelka2" };
    for (callers) |caller| {
        var run = try client.createRun(allocator, "genomics_variant_calling", caller);
        defer run.deinit();
        try client.logMetric(run.id, "auc", 0.92 + @as(f64, @floatFromInt(caller.len)) * 0.01);
        try client.logMetric(run.id, "f1", 0.88);
        try client.logParam(run.id, "caller", caller);
    }
}`}],runnablePython:`# Genomics MLflow tracking simulation — Pyodide
import random

print("=== MLflow Genomics Variant Calling Tracking ===")
print("3 callers x 5 configs = 15 runs tracked")
print()
callers = ["GATK_HaplotypeCaller", "DeepVariant", "Strelka2"]
random.seed(42)
print(f"{'Run':>4} | {'Caller':<25} | {'min_conf':>9} | {'AUC':>6} | {'F1':>6} | {'Precision':>10} | {'Recall':>7}")
print("-" * 85)
run_id = 0
best_auc = 0
best_run = 0
for caller in callers:
    for min_conf in [10, 20, 30]:
        run_id += 1
        auc = random.uniform(0.85, 0.97)
        f1 = random.uniform(0.80, 0.93)
        prec = random.uniform(0.85, 0.95)
        rec = random.uniform(0.75, 0.92)
        print(f"{run_id:>4} | {caller:<25} | {min_conf:>9} | {auc:.4f} | {f1:.4f} | {prec:>10.4f} | {rec:.4f}")
        if auc > best_auc:
            best_auc = auc
            best_run = run_id
            best_caller = caller
print(f"\\nBest: Run {best_run} ({best_caller}) AUC={best_auc:.4f} → promoted to Production")`,insight:"Genomics variant calling is the canonical ML model tracking use case — each variant caller (GATK, DeepVariant, Strelka2) is a different model architecture, and MLflow tracks which performs best on the 1000 Genomes truth set. Model Registry promotes the winner to Production with full audit trail."},{id:"mlflow-clinical-drug-response",step:"2",title:"Clinical Trial Drug Response Prediction",subtitle:"Life Sciences — track AUC-ROC across patient stratification models",accent:"oklch(0.65 0.16 165)",icon:(0,t.jsx)(o.ShieldCheck,{className:"h-4 w-4"}),badge:"Life Sciences · Clinical",brief:{dataset:"Synthetic clinical trial — 10,000 patients, 500 drugs, drug response labels (responder/non-responder). Track AUC-ROC across XGBoost, Random Forest, and neural network models with different patient stratifications.",scale:"~10,000 patients · 500 drugs · 200 features per patient · 3 model types × 4 stratifications = 12 runs",why:"Shows MLflow Tracking for clinical ML — AUC-ROC is the key metric (regulatory requirement), patient stratification (age, genotype, disease stage) changes which model wins. Model Registry ensures the FDA-compliant model is in Production."},stats:[{label:"Patients",value:"10,000"},{label:"Drugs",value:"500"},{label:"Features",value:"200"},{label:"Runs",value:"12"}],tools:["MLflow Tracking","XGBoost","Scikit-learn","PyTorch","SHAP","DVC"],codeTabs:[{lang:"scala",filename:"ClinicalDrugResponseMLflow.scala",code:`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

val spark = SparkSession.builder().getOrCreate()

// 3 models \xd7 4 stratifications = 12 runs
val models = Seq("XGBoost", "RandomForest", "NeuralNetwork")
val stratifications = Seq("all", "age_lt_65", "genotype_CYP2D6", "stage_III")

for (model <- models; strat <- stratifications) {
  val data = spark.table("clinical.drug_response")
    .filter(if (strat == "all") lit(true) else col(strat))
  // Train model (simplified — use Spark MLlib)
  // ... training code ...
  val auc = 0.75 + random.nextDouble() * 0.2  // simulated AUC
  // Log to MLflow
  spark.sql(s"CALL mlflow_log_metric('auc', $auc)")
  spark.sql(s"CALL mlflow_log_param('model', '$model')")
  spark.sql(s"CALL mlflow_log_param('stratification', '$strat')")
}`},{lang:"rust",filename:"clinical_drug_response.rs",code:`use mlflow_rust::tracking::MlflowClient;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = MlflowClient::new("http://mlflow:5000")?;
    let exp = client.create_experiment("clinical_drug_response").await?;
    for model in &["XGBoost", "RandomForest", "NeuralNetwork"] {
        for strat in &["all", "age_lt_65", "genotype_CYP2D6", "stage_III"] {
            let run = client.create_run(exp, &format!("{model}_{strat}")).await?;
            client.log_metric(run.run_id, "auc", 0.75 + rand::random::<f64>() * 0.2).await?;
            client.log_param(run.run_id, "model", model).await?;
            client.log_param(run.run_id, "stratification", strat).await?;
        }
    }
    Ok(())
}`},{lang:"go",filename:"clinical_drug_response.go",code:`package main
import ("context"; "fmt"; "github.com/mlflow/mlflow-go")
func main() {
    client := mlflow.NewClient("http://mlflow:5000")
    ctx := context.Background()
    expID, _ := client.CreateExperiment(ctx, "clinical_drug_response")
    for _, m := range []string{"XGBoost", "RandomForest", "NeuralNetwork"} {
        for _, s := range []string{"all", "age_lt_65", "genotype_CYP2D6", "stage_III"} {
            run, _ := client.CreateRun(ctx, expID, m+"_"+s)
            client.LogMetric(ctx, run.ID, "auc", 0.85)
            client.LogParam(ctx, run.ID, "model", m)
        }
    }
}`},{lang:"elixir",filename:"clinical_drug_response.ex",code:`defmodule Clinical.MLflowTracking do
  use GenServer
  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  @impl true
  def init(:ok) do
    models = ["XGBoost", "RandomForest", "NeuralNetwork"]
    strats = ["all", "age_lt_65", "genotype_CYP2D6", "stage_III"]
    for m <- models, s <- strats do
      run_id = create_run(m <> "_" <> s)
      log_metric(run_id, "auc", 0.75 + :rand.uniform() * 0.2)
      log_param(run_id, "model", m)
      log_param(run_id, "stratification", s)
    end
    {:ok, %{}}
  end
  defp create_run(name), do: "run_" <> Integer.to_string(:erlang.unique_integer([:positive]))
  defp log_metric(_, _, _), do: :ok
  defp log_param(_, _, _), do: :ok
end`},{lang:"zig",filename:"clinical_drug_response.zig",code:`const std = @import("std");
const mlflow = @import("mlflow-zig");
pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();
    var client = try mlflow.Client.init(allocator, .{.url = "http://mlflow:5000"});
    defer client.deinit();
    const models = [_][]const u8{ "XGBoost", "RandomForest", "NeuralNetwork" };
    const strats = [_][]const u8{ "all", "age_lt_65", "genotype_CYP2D6", "stage_III" };
    for (models) |m| {
        for (strats) |s| {
            var run = try client.createRun(allocator, "clinical_drug_response", m);
            defer run.deinit();
            try client.logMetric(run.id, "auc", 0.85);
            try client.logParam(run.id, "model", m);
        }
    }
}`}],runnablePython:`# Clinical drug response MLflow simulation — Pyodide
import random
print("=== MLflow Clinical Drug Response Tracking ===")
print("3 models x 4 stratifications = 12 runs")
print()
models = ["XGBoost", "RandomForest", "NeuralNetwork"]
strats = ["all", "age_lt_65", "genotype_CYP2D6", "stage_III"]
random.seed(42)
print(f"{'Run':>4} | {'Model':<15} | {'Stratification':<18} | {'AUC':>6}")
print("-" * 55)
run_id = 0
best_auc = 0
for m in models:
    for s in strats:
        run_id += 1
        auc = random.uniform(0.70, 0.95)
        print(f"{run_id:>4} | {m:<15} | {s:<18} | {auc:.4f}")
        if auc > best_auc:
            best_auc = auc
            best_run = (m, s)
print(f"\\nBest: {best_run[0]} + {best_run[1]} AUC={best_auc:.4f}")
print("→ Registered as model version 3 → transitioned to Production")`,insight:"Clinical drug response prediction is the canonical regulatory ML use case — AUC-ROC is the FDA-mandated metric. MLflow Model Registry ensures only the validated model is in Production, with full audit trail (who approved, when, for which patient stratification)."},{id:"mlflow-protein-structure",step:"3",title:"Protein Structure Prediction Tracking",subtitle:"Life Sciences — track AlphaFold-style pLDDT + RMSD scores",accent:"oklch(0.65 0.16 250)",icon:(0,t.jsx)(a.Atom,{className:"h-4 w-4"}),badge:"Life Sciences · Proteomics",brief:{dataset:"Synthetic protein structure prediction — 1,000 proteins from CASP14. Track pLDDT (predicted Local Distance Difference Test) + RMSD (Root Mean Square Deviation) across 5 model variants.",scale:"~1,000 proteins · 5 model variants · pLDDT + RMSD + GDT_TS metrics · CASP14 benchmark",why:"Shows MLflow Tracking for structural biology — pLDDT is the AlphaFold confidence metric (0-100), RMSD measures structural deviation from the experimental structure. Model Registry manages which protein structure predictor is in Production."},stats:[{label:"Proteins",value:"1,000"},{label:"Variants",value:"5"},{label:"Metrics",value:"3 (pLDDT+RMSD+GDT)"},{label:"Benchmark",value:"CASP14"}],tools:["MLflow Tracking","AlphaFold2","RoseTTAFold","ESMFold","ColabFold","TM-score"],codeTabs:[{lang:"scala",filename:"ProteinStructureMLflow.scala",code:`import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()
val models = Seq("AlphaFold2", "RoseTTAFold", "ESMFold", "ColabFold", "OmegaFold")
for (model <- models) {
  val results = spark.read.parquet(s"s3://protein-results/$model/")
  val avg_plddt = results.agg(mean("plddt")).head().getDouble(0)
  val avg_rmsd = results.agg(mean("rmsd")).head().getDouble(0)
  spark.sql(s"CALL mlflow_log_metric('plddt', $avg_plddt)")
  spark.sql(s"CALL mlflow_log_metric('rmsd', $avg_rmsd)")
  spark.sql(s"CALL mlflow_log_param('model', '$model')")
}`},{lang:"rust",filename:"protein_structure_mlflow.rs",code:`use mlflow_rust::tracking::MlflowClient;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = MlflowClient::new("http://mlflow:5000")?;
    let exp = client.create_experiment("protein_structure_prediction").await?;
    for model in &["AlphaFold2", "RoseTTAFold", "ESMFold", "ColabFold", "OmegaFold"] {
        let run = client.create_run(exp, model).await?;
        client.log_metric(run.run_id, "plddt", 85.0 + rand::random::<f64>() * 10.0).await?;
        client.log_metric(run.run_id, "rmsd", 1.5 + rand::random::<f64>() * 2.0).await?;
        client.log_param(run.run_id, "model", model).await?;
    }
    Ok(())
}`},{lang:"go",filename:"protein_structure_mlflow.go",code:`package main
import ("context"; "github.com/mlflow/mlflow-go")
func main() {
    client := mlflow.NewClient("http://mlflow:5000")
    ctx := context.Background()
    expID, _ := client.CreateExperiment(ctx, "protein_structure_prediction")
    for _, m := range []string{"AlphaFold2", "RoseTTAFold", "ESMFold", "ColabFold", "OmegaFold"} {
        run, _ := client.CreateRun(ctx, expID, m)
        client.LogMetric(ctx, run.ID, "plddt", 88.5)
        client.LogMetric(ctx, run.ID, "rmsd", 2.1)
        client.LogParam(ctx, run.ID, "model", m)
    }
}`},{lang:"elixir",filename:"protein_structure_mlflow.ex",code:`defmodule Protein.MLflowTracking do
  use GenServer
  def start_link(_), do: GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  @impl true
  def init(:ok) do
    for m <- ["AlphaFold2", "RoseTTAFold", "ESMFold", "ColabFold", "OmegaFold"] do
      run_id = create_run(m)
      log_metric(run_id, "plddt", 85.0 + :rand.uniform() * 10.0)
      log_metric(run_id, "rmsd", 1.5 + :rand.uniform() * 2.0)
      log_param(run_id, "model", m)
    end
    {:ok, %{}}
  end
  defp create_run(_), do: "run_simulated"
  defp log_metric(_, _, _), do: :ok
  defp log_param(_, _, _), do: :ok
end`},{lang:"zig",filename:"protein_structure_mlflow.zig",code:`const std = @import("std");
const mlflow = @import("mlflow-zig");
pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();
    var client = try mlflow.Client.init(allocator, .{.url = "http://mlflow:5000"});
    defer client.deinit();
    const models = [_][]const u8{ "AlphaFold2", "RoseTTAFold", "ESMFold", "ColabFold", "OmegaFold" };
    for (models) |m| {
        var run = try client.createRun(allocator, "protein_structure", m);
        defer run.deinit();
        try client.logMetric(run.id, "plddt", 88.5);
        try client.logMetric(run.id, "rmsd", 2.1);
    }
}`}],runnablePython:`# Protein structure MLflow tracking simulation — Pyodide
import random
print("=== MLflow Protein Structure Prediction Tracking ===")
print("5 model variants on CASP14 benchmark (1000 proteins)")
print()
models = ["AlphaFold2", "RoseTTAFold", "ESMFold", "ColabFold", "OmegaFold"]
random.seed(42)
print(f"{'Run':>4} | {'Model':<15} | {'pLDDT':>6} | {'RMSD':>6} | {'GDT_TS':>7}")
print("-" * 50)
run_id = 0
best_plddt = 0
for m in models:
    run_id += 1
    plddt = random.uniform(75, 95)
    rmsd = random.uniform(1.0, 4.0)
    gdt = random.uniform(60, 90)
    print(f"{run_id:>4} | {m:<15} | {plddt:.1f} | {rmsd:.2f} | {gdt:.1f}")
    if plddt > best_plddt:
        best_plddt = plddt
        best_model = m
print(f"\\nBest: {best_model} pLDDT={best_plddt:.1f} → Production")`,insight:"Protein structure prediction tracking shows MLflow for structural biology — pLDDT (AlphaFold's confidence score) + RMSD (structural deviation) are tracked across model variants. AlphaFold2 (pLDDT ~92) beats RoseTTAFold (pLDDT ~85) — MLflow Model Registry promotes AlphaFold2 to Production."}],c=[{id:"feature-store-genomics-snp",step:"1",title:"Genomics SNP Features for GWAS",subtitle:"Life Sciences — offline allele frequencies + online variant lookups",accent:"oklch(0.65 0.16 30)",icon:(0,t.jsx)(i.Database,{className:"h-4 w-4"}),badge:"Life Sciences · Genomics",brief:{dataset:"1000 Genomes SNP features — allele frequencies, LD scores, population labels. Offline: Iceberg on S3. Online: Redis for sub-ms variant lookups.",scale:"~3B SNPs × 26 populations = 78B feature rows · ~500GB offline · ~10GB online",why:"Shows the feature store pattern for genomics: offline features (allele frequencies computed via Spark batch) → online features (Redis for real-time variant lookups during GWAS). Point-in-time correctness prevents look-ahead bias."},stats:[{label:"SNPs",value:"3 billion"},{label:"Offline size",value:"500 GB"},{label:"Online size",value:"10 GB"},{label:"Lookup latency",value:"<1ms"}],tools:["Feast","Apache Spark","Redis","Iceberg","S3"],codeTabs:[{lang:"scala",filename:"GenomicsFeatureStore.scala",code:`import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()
// Write allele frequencies to offline store (Feast)
val features = spark.table("iceberg.gold.allele_frequencies")
features.write.format("parquet").save("s3://feast-offline/genomics/")`},{lang:"rust",filename:"genomics_feature_store.rs",code:`use feast_rust::FeatureStore;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let fs = FeatureStore::new("feast-offline")?;
    let features = fs.get_online_features(&["allele_freq", "ld_score"], &["rs12345"]).await?;
    Ok(())
}`},{lang:"go",filename:"genomics_feature_store.go",code:`package main
import ("github.com/feast/feast-go")
func main() {
    fs := feast.NewFeatureStore("feast-offline")
    features, _ := fs.GetOnlineFeatures([]string{"allele_freq"}, []string{"rs12345"})
    _ = features
}`},{lang:"elixir",filename:"genomics_feature_store.ex",code:`defmodule Genomics.FeatureStore do
  def get_snp_features(snp_id) do
    {:ok, features} = Feast.Client.get_online("genomics_features", [snp_id])
    features
  end
end`},{lang:"zig",filename:"genomics_feature_store.zig",code:`const std = @import("std");
const feast = @import("feast-zig");
pub fn main() !void {
    var fs = try feast.FeatureStore.init("feast-offline");
    defer fs.deinit();
    var features = try fs.getOnlineFeatures(&.{"allele_freq"}, &.{"rs12345"});
    defer features.deinit();
}`}],runnablePython:`# Genomics feature store simulation — Pyodide
import random
print("=== Genomics Feature Store (Feast) ===")
print("Offline: 3B SNPs x 26 populations on Iceberg (500GB)")
print("Online: Redis sub-ms lookup for GWAS")
print()
random.seed(42)
snps = [f"rs{random.randint(1, 999999)}" for _ in range(5)]
for snp in snps:
    freq = random.uniform(0.01, 0.99)
    print(f"  {snp}: allele_freq={freq:.4f} (online lookup <1ms)")
print("\\nPoint-in-time correctness: features valued at time T prevent look-ahead bias")`,insight:"Genomics SNP features are the canonical feature store use case for life sciences — offline computation (allele frequencies via Spark on Iceberg) feeds online lookups (Redis for sub-ms GWAS queries). Point-in-time correctness prevents data leakage in ML training."},{id:"feature-store-clinical-features",step:"2",title:"Clinical Trial Patient Features",subtitle:"Life Sciences — demographics + labs with point-in-time correctness",accent:"oklch(0.65 0.16 165)",icon:(0,t.jsx)(o.ShieldCheck,{className:"h-4 w-4"}),badge:"Life Sciences · Clinical",brief:{dataset:"Synthetic clinical trial — 10,000 patients, 200 features (demographics, lab values, treatment history). Feature store ensures point-in-time correctness — feature values as-of the prediction time, preventing look-ahead bias.",scale:"~10,000 patients · 200 features · 50 features per prediction · point-in-time joined",why:"Shows the CRITICAL feature store pattern: point-in-time correctness. Without it, training data would include lab values measured AFTER the prediction time → data leakage → over-optimistic model performance. Feature stores solve this via point-in-time joins."},stats:[{label:"Patients",value:"10,000"},{label:"Features",value:"200"},{label:"Point-in-time",value:"Correct"},{label:"Leakage",value:"Prevented"}],tools:["Feast","Tecton","SageMaker Feature Store","Redis","PostgreSQL"],codeTabs:[{lang:"scala",filename:"ClinicalFeatureStore.scala",code:`import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()
// Point-in-time join: get lab values as-of prediction time
val features = spark.sql("SELECT * FROM feast.clinical_features POINT_IN_TIME_AS_OF '2024-09-01'")`},{lang:"rust",filename:"clinical_feature_store.rs",code:`use feast_rust::FeatureStore;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let fs = FeatureStore::new("clinical_features")?;
    // Point-in-time: features as-of prediction time
    let features = fs.get_features_point_in_time(&["lab_values"], "2024-09-01T00:00:00Z").await?;
    Ok(())
}`},{lang:"go",filename:"clinical_feature_store.go",code:`package main
import ("github.com/feast/feast-go"; "time")
func main() {
    fs := feast.NewFeatureStore("clinical_features")
    t, _ := time.Parse(time.RFC3339, "2024-09-01T00:00:00Z")
    features, _ := fs.GetFeaturesPointInTime([]string{"lab_values"}, t)
    _ = features
}`},{lang:"elixir",filename:"clinical_feature_store.ex",code:`defmodule Clinical.FeatureStore do
  def get_features_point_in_time(patient_id, prediction_time) do
    {:ok, features} = Feast.Client.get_point_in_time(
      "clinical_features", [patient_id], prediction_time)
    features
  end
end`},{lang:"zig",filename:"clinical_feature_store.zig",code:`const std = @import("std");
const feast = @import("feast-zig");
pub fn main() !void {
    var fs = try feast.FeatureStore.init("clinical_features");
    defer fs.deinit();
    // Point-in-time: features as-of prediction time
    var features = try fs.getFeaturesPointInTime(&.{"lab_values"}, "2024-09-01T00:00:00Z");
    defer features.deinit();
}`}],runnablePython:`# Clinical feature store simulation — Pyodide
import random
from datetime import datetime, timedelta
print("=== Clinical Feature Store — Point-in-Time Correctness ===")
print("10,000 patients \xd7 200 features \xd7 point-in-time joined")
print()
random.seed(42)
patients = [f"PT{random.randint(1, 10000):05d}" for _ in range(5)]
prediction_time = datetime(2024, 9, 1, 12, 0, 0)
for pid in patients:
    # Simulate lab values at different times
    lab_time = prediction_time - timedelta(days=random.randint(1, 30))
    glucose = random.uniform(70, 200)
    print(f"  {pid}: prediction @ {prediction_time}, lab @ {lab_time.date()} → glucose={glucose:.1f}")
print("\\nPoint-in-time: features valued BEFORE prediction time only (no leakage)")`,insight:"Point-in-time correctness is the #1 reason feature stores exist — without it, ML models train on future information (data leakage), producing over-optimistic metrics that fail in production. The feature store guarantees that every feature value was known at the prediction time."},{id:"feature-store-sensor-features",step:"3",title:"Environmental Sensor Features",subtitle:"Sensors — rolling averages, anomalies, calibration offsets",accent:"oklch(0.65 0.16 60)",icon:(0,t.jsx)(n.Activity,{className:"h-4 w-4"}),badge:"Sensors · Environmental",brief:{dataset:"EPA AirNow sensor data — 50k sensors, 7 metrics. Feature store computes rolling averages (1h, 24h), anomaly scores, and calibration offsets for ML air quality models.",scale:"~50k sensors · 7 metrics · 3 feature windows (1h/24h/7d) · ~100GB offline",why:"Shows feature stores for time-series sensor data — rolling averages are computed offline (Spark on Iceberg) and materialised to online (Redis) for real-time ML inference. Feature drift (PSI) monitors when sensor calibration drifts."},stats:[{label:"Sensors",value:"50k"},{label:"Metrics",value:"7"},{label:"Windows",value:"3 (1h/24h/7d)"},{label:"Offline size",value:"100 GB"}],tools:["Feast","Apache Spark","Redis","Iceberg","PSI drift monitoring"],codeTabs:[{lang:"scala",filename:"SensorFeatureStore.scala",code:`import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
val spark = SparkSession.builder().getOrCreate()
val readings = spark.table("iceberg.silver.sensor_calibrated")
val features = readings.groupBy($"sensor_id", window($"sensor_ts", "1 hour"))
  .agg(mean("value_standard").as("avg_1h"), stddev("value_standard").as("std_1h"))
features.write.format("parquet").save("s3://feast-offline/sensor/")`},{lang:"rust",filename:"sensor_feature_store.rs",code:`use feast_rust::FeatureStore;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let fs = FeatureStore::new("sensor_features")?;
    let features = fs.get_online_features(&["avg_1h", "std_1h"], &["sensor_12345"]).await?;
    Ok(())
}`},{lang:"go",filename:"sensor_feature_store.go",code:`package main
import "github.com/feast/feast-go"
func main() {
    fs := feast.NewFeatureStore("sensor_features")
    features, _ := fs.GetOnlineFeatures([]string{"avg_1h"}, []string{"sensor_12345"})
    _ = features
}`},{lang:"elixir",filename:"sensor_feature_store.ex",code:`defmodule Sensor.FeatureStore do
  def get_sensor_features(sensor_id) do
    {:ok, features} = Feast.Client.get_online("sensor_features", [sensor_id])
    features
  end
end`},{lang:"zig",filename:"sensor_feature_store.zig",code:`const std = @import("std");
const feast = @import("feast-zig");
pub fn main() !void {
    var fs = try feast.FeatureStore.init("sensor_features");
    defer fs.deinit();
    var features = try fs.getOnlineFeatures(&.{"avg_1h"}, &.{"sensor_12345"});
    defer features.deinit();
}`}],runnablePython:`# Sensor feature store simulation — Pyodide
import random
print("=== Sensor Feature Store (Feast) ===")
print("50k sensors \xd7 7 metrics \xd7 3 windows (1h/24h/7d)")
print()
random.seed(42)
sensors = [f"sensor_{random.randint(1, 50000):05d}" for _ in range(5)]
for s in sensors:
    avg_1h = random.uniform(0, 50)
    avg_24h = random.uniform(0, 50)
    avg_7d = random.uniform(0, 50)
    print(f"  {s}: avg_1h={avg_1h:.2f}, avg_24h={avg_24h:.2f}, avg_7d={avg_7d:.2f}")
print("\\nPSI drift monitoring: alerts when sensor calibration drifts")`,insight:"Sensor feature stores show time-series windowing — rolling averages (1h, 24h, 7d) are computed offline (Spark on Iceberg) and materialised to Redis for real-time ML. PSI (Population Stability Index) monitors feature drift, alerting when sensor calibration degrades."}],d=[{id:"vector-db-protein-embeddings",step:"1",title:"Protein Embedding Search (ESM-2)",subtitle:"Life Sciences — find homologous proteins via HNSW vector search",accent:"oklch(0.65 0.16 30)",icon:(0,t.jsx)(a.Atom,{className:"h-4 w-4"}),badge:"Life Sciences · Proteomics",brief:{dataset:"ESM-2 protein embeddings — 250M proteins from UniProt, each embedded as a 1280-dim vector. Stored in Milvus (HNSW index) for sub-ms homology search.",scale:"~250M proteins · 1280-dim embeddings · ~600GB in Milvus · HNSW index",why:"Shows vector DB for structural biology — ESM-2 (Meta AI 2023) embeds protein sequences into 1280-dim vectors where homologous proteins are nearby. HNSW enables sub-ms nearest-neighbor search across 250M proteins. This is how AlphaFold finds template structures."},stats:[{label:"Proteins",value:"250M"},{label:"Dimensions",value:"1,280"},{label:"Index",value:"HNSW"},{label:"Search latency",value:"<1ms"}],tools:["Milvus","ESM-2 (Meta AI)","HNSW","UniProt","FAISS"],codeTabs:[{lang:"scala",filename:"ProteinEmbeddingSearch.scala",code:`import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()
val embeddings = spark.read.parquet("s3://protein-embeddings/esm2/")
embeddings.write.format("milvus").option("collection", "proteins").save()`},{lang:"rust",filename:"protein_embedding_search.rs",code:`use milvus_rust::MilvusClient;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = MilvusClient::new("http://milvus:19530").await?;
    let query = vec![0.1f32; 1280]; // ESM-2 embedding
    let results = client.search("proteins", &query, 10).await?;
    println!("Found {} homologous proteins", results.len());
    Ok(())
}`},{lang:"go",filename:"protein_embedding_search.go",code:`package main
import "github.com/milvus-io/milvus-sdk-go"
func main() {
    client, _ := milvus.NewClient(milvus.Config{Address: "milvus:19530"})
    query := make([]float32, 1280)
    results, _ := client.Search("proteins", query, 10)
    _ = results
}`},{lang:"elixir",filename:"protein_embedding_search.ex",code:`defmodule Protein.VectorSearch do
  def find_homologs(embedding) do
    {:ok, results} = Milvus.Client.search("proteins", embedding, 10)
    results
  end
end`},{lang:"zig",filename:"protein_embedding_search.zig",code:`const std = @import("std");
const milvus = @import("milvus-zig");
pub fn main() !void {
    var client = try milvus.Client.init("milvus:19530");
    defer client.deinit();
    var query: [1280]f32 = .{0.1} ** 1280;
    var results = try client.search("proteins", &query, 10);
    defer results.deinit();
}`}],runnablePython:`# Protein embedding search simulation — Pyodide
import math, random
print("=== Protein Embedding Search (ESM-2 + Milvus HNSW) ===")
print("250M proteins \xd7 1280-dim embeddings → HNSW → sub-ms search")
print()
random.seed(42)
# Simulate 5 protein embeddings (1280-dim)
proteins = [("P12345", "hemoglobin"), ("P69905", "hemoglobin alpha"),
            ("P68871", "hemoglobin beta"), ("P00398", "cytochrome c"),
            ("P0A3T5", "GFP")]
query = [random.gauss(0, 1) for _ in range(64)]  # simplified 64-dim
for pid, name in proteins:
    emb = [random.gauss(0, 1) for _ in range(64)]
    # Cosine similarity
    dot = sum(q*e for q, e in zip(query, emb))
    norm_q = math.sqrt(sum(q*q for q in query))
    norm_e = math.sqrt(sum(e*e for e in emb))
    cos_sim = dot / (norm_q * norm_e)
    print(f"  {pid} ({name}): cosine={cos_sim:.4f} {'<-- homolog' if cos_sim > 0.8 else ''}")
print("\\nHNSW: O(log n) search — sub-ms for 250M proteins")`,insight:"ESM-2 protein embeddings enable structural biology at scale — 250M proteins embedded as 1280-dim vectors, HNSW index in Milvus enables sub-ms homology search. This is how AlphaFold finds template structures for novel proteins. The cosine similarity in embedding space predicts structural similarity."},{id:"vector-db-molecular-similarity",step:"2",title:"Molecular Similarity (ECFP Fingerprints)",subtitle:"Chemistry — virtual screening via cosine similarity",accent:"oklch(0.65 0.16 165)",icon:(0,t.jsx)(i.Database,{className:"h-4 w-4"}),badge:"Chemistry · Drug Discovery",brief:{dataset:"ZINC database — 1B molecules, each as 2048-bit ECFP4 fingerprint. Stored in Milvus (IVF index) for sub-second virtual screening.",scale:"~1B molecules · 2048-dim ECFP4 fingerprints · ~200GB in Milvus · IVF index",why:"Shows vector DB for drug discovery — ECFP4 (Extended-Connectivity Fingerprints) encode molecular structure. Cosine similarity finds structurally similar molecules → potential drug candidates. IVF index enables sub-second search across 1B molecules."},stats:[{label:"Molecules",value:"1 billion"},{label:"Dimensions",value:"2,048"},{label:"Index",value:"IVF"},{label:"Search time",value:"<1s"}],tools:["Milvus","RDKit","ECFP4","IVF","ZINC database"],codeTabs:[{lang:"scala",filename:"MolecularSimilarity.scala",code:`import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()
val fingerprints = spark.read.parquet("s3://zinc-ecfp4/")
fingerprints.write.format("milvus").option("collection", "molecules").save()`},{lang:"rust",filename:"molecular_similarity.rs",code:`use milvus_rust::MilvusClient;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = MilvusClient::new("http://milvus:19530").await?;
    let query = vec![0.0f32; 2048]; // ECFP4 fingerprint
    let results = client.search("molecules", &query, 100).await?;
    println!("Found {} similar molecules", results.len());
    Ok(())
}`},{lang:"go",filename:"molecular_similarity.go",code:`package main
import "github.com/milvus-io/milvus-sdk-go"
func main() {
    client, _ := milvus.NewClient(milvus.Config{Address: "milvus:19530"})
    query := make([]float32, 2048)
    results, _ := client.Search("molecules", query, 100)
    _ = results
}`},{lang:"elixir",filename:"molecular_similarity.ex",code:`defmodule Molecule.VectorSearch do
  def find_similar(fingerprint) do
    {:ok, results} = Milvus.Client.search("molecules", fingerprint, 100)
    results
  end
end`},{lang:"zig",filename:"molecular_similarity.zig",code:`const std = @import("std");
const milvus = @import("milvus-zig");
pub fn main() !void {
    var client = try milvus.Client.init("milvus:19530");
    defer client.deinit();
    var query: [2048]f32 = .{0.0} ** 2048;
    var results = try client.search("molecules", &query, 100);
    defer results.deinit();
}`}],runnablePython:`# Molecular similarity simulation — Pyodide
import math, random
print("=== Molecular Similarity (ECFP4 + Milvus IVF) ===")
print("1B molecules \xd7 2048-dim ECFP4 → IVF → sub-second search")
print()
random.seed(42)
query_fp = [random.randint(0, 1) for _ in range(256)]  # simplified 256-dim
molecules = [("ZINC000123", "aspirin"), ("ZINC000456", "ibuprofen"),
             ("ZINC000789", "paracetamol"), ("ZINC000abc", "omeprazole")]
for zinc_id, name in molecules:
    mol_fp = [random.randint(0, 1) for _ in range(256)]
    # Tanimoto similarity (for binary fingerprints)
    intersection = sum(1 for a, b in zip(query_fp, mol_fp) if a == 1 and b == 1)
    union = sum(1 for a, b in zip(query_fp, mol_fp) if a == 1 or b == 1)
    tani = intersection / max(union, 1)
    print(f"  {zinc_id} ({name}): Tanimoto={tani:.4f} {'<-- hit' if tani > 0.7 else ''}")
print("\\nIVF: Voronoi partitioning → sub-second search across 1B molecules")`,insight:"ECFP4 fingerprints encode molecular structure as 2048-bit vectors. Cosine/Tanimoto similarity finds structurally similar molecules for virtual screening — 1B molecules searched in <1s via IVF index. This is how pharma companies find drug candidates from compound libraries."},{id:"vector-db-genomics-variants",step:"3",title:"Genomics Variant Clustering",subtitle:"Life Sciences — sequence embeddings → IVF → variant grouping",accent:"oklch(0.65 0.16 250)",icon:(0,t.jsx)(s.Network,{className:"h-4 w-4"}),badge:"Life Sciences · Genomics",brief:{dataset:"Genomics variant embeddings — 3B SNPs from 1000 Genomes, each embedded as a 768-dim vector via DNA-BERT. Stored in Pinecone for clustering analysis.",scale:"~3B variants · 768-dim DNA-BERT embeddings · ~500GB in Pinecone · HNSW + IVF hybrid",why:"Shows vector DB for genomics — DNA-BERT (2023) embeds genomic sequences so functional variants cluster together. Vector search finds variants with similar regulatory effects, enabling genotype-phenotype association discovery."},stats:[{label:"Variants",value:"3 billion"},{label:"Dimensions",value:"768"},{label:"Index",value:"HNSW+IVF"},{label:"Backend",value:"Pinecone"}],tools:["Pinecone","DNA-BERT","HNSW+IVF","1000 Genomes"],codeTabs:[{lang:"scala",filename:"GenomicsVariantClustering.scala",code:`import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()
val embeddings = spark.read.parquet("s3://genomics-embeddings/dna-bert/")
embeddings.write.format("pinecone").option("index", "genomic-variants").save()`},{lang:"rust",filename:"genomics_variant_clustering.rs",code:`use pinecone_rust::PineconeClient;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = PineconeClient::new("api_key").await?;
    let query = vec![0.1f32; 768];
    let results = client.query("genomic-variants", &query, 100).await?;
    Ok(())
}`},{lang:"go",filename:"genomics_variant_clustering.go",code:`package main
import "github.com/pinecone-io/pinecone-go"
func main() {
    client := pinecone.NewClient("api_key")
    query := make([]float32, 768)
    results, _ := client.Query("genomic-variants", query, 100)
    _ = results
}`},{lang:"elixir",filename:"genomics_variant_clustering.ex",code:`defmodule Genomics.VectorSearch do
  def find_similar_variants(embedding) do
    {:ok, results} = Pinecone.Client.query("genomic-variants", embedding, 100)
    results
  end
end`},{lang:"zig",filename:"genomics_variant_clustering.zig",code:`const std = @import("std");
const pinecone = @import("pinecone-zig");
pub fn main() !void {
    var client = try pinecone.Client.init("api_key");
    defer client.deinit();
    var query: [768]f32 = .{0.1} ** 768;
    var results = try client.query("genomic-variants", &query, 100);
    defer results.deinit();
}`}],runnablePython:`# Genomics variant clustering simulation — Pyodide
import math, random
print("=== Genomics Variant Clustering (DNA-BERT + Pinecone) ===")
print("3B variants \xd7 768-dim DNA-BERT → HNSW+IVF → similar-effect search")
print()
random.seed(42)
query_emb = [random.gauss(0, 1) for _ in range(64)]  # simplified 64-dim
variants = [("rs12345", "regulatory"), ("rs67890", "missense"),
            ("rs11111", "synonymous"), ("rs22222", "regulatory")]
for rsid, vtype in variants:
    emb = [random.gauss(0, 1) for _ in range(64)]
    dot = sum(q*e for q, e in zip(query_emb, emb))
    norm = math.sqrt(sum(q*q for q in query_emb)) * math.sqrt(sum(e*e for e in emb))
    cos_sim = dot / max(norm, 0.001)
    print(f"  {rsid} ({vtype}): cosine={cos_sim:.4f} {'<-- similar effect' if cos_sim > 0.8 else ''}")
print("\\nDNA-BERT: variants with similar regulatory effects cluster together in embedding space")`,insight:"DNA-BERT (2023) embeds genomic sequences so functionally similar variants are nearby in embedding space. Vector search finds variants with similar regulatory effects — enabling genotype-phenotype discovery without expensive functional assays. 3B variants searched in <1s via HNSW+IVF hybrid index."}],u=[{id:"llmops-biomedical-rag",step:"1",title:"Biomedical RAG (PubMed + BioBERT)",subtitle:"Life Sciences — hybrid retrieval → LLM generation → citations",accent:"oklch(0.65 0.16 30)",icon:(0,t.jsx)(r.Brain,{className:"h-4 w-4"}),badge:"Life Sciences · Biomedical NLP",brief:{dataset:"PubMed abstracts — 35M biomedical papers. BioBERT embeddings + BM25 hybrid retrieval → LLM (GPT-4) generates answers with citations from PubMed.",scale:"~35M PubMed abstracts · 768-dim BioBERT embeddings · BM25 + vector hybrid · GPT-4 generation",why:"Shows LLMOps for biomedical research — the RAG pipeline retrieves relevant PubMed papers (hybrid: BM25 for keyword + vector for semantic), generates answers with citations. Guardrails prevent hallucination (every claim must have a PubMed citation)."},stats:[{label:"Papers",value:"35M"},{label:"Dimensions",value:"768"},{label:"Retrieval",value:"Hybrid (BM25+vector)"},{label:"Generation",value:"GPT-4 + citations"}],tools:["LangChain","BioBERT","Pinecone","BM25","GPT-4","PubMed API"],codeTabs:[{lang:"scala",filename:"BiomedicalRAG.scala",code:`import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()
val pubmed = spark.read.parquet("s3://pubmed-embeddings/")
pubmed.write.format("pinecone").option("index", "pubmed").save()`},{lang:"rust",filename:"biomedical_rag.rs",code:`use pinecone_rust::PineconeClient;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = PineconeClient::new("api_key").await?;
    let query = vec![0.1f32; 768]; // BioBERT embedding
    let docs = client.query("pubmed", &query, 10).await?;
    // Generate answer with GPT-4 + citations
    let prompt = format!("Answer based on: {:?}\\nQuestion: What is the mechanism of action of aspirin?", docs);
    Ok(())
}`},{lang:"go",filename:"biomedical_rag.go",code:`package main
import ("github.com/pinecone-io/pinecone-go"; "fmt")
func main() {
    client := pinecone.NewClient("api_key")
    query := make([]float32, 768)
    docs, _ := client.Query("pubmed", query, 10)
    fmt.Printf("Retrieved %d PubMed papers for RAG generation\\n", len(docs))
}`},{lang:"elixir",filename:"biomedical_rag.ex",code:`defmodule Biomedical.RAG do
  def answer(question) do
    {:ok, docs} = Pinecone.Client.query("pubmed", embed_bert(question), 10)
    prompt = "Answer based on: " <> Enum.join(docs, "\\n") <> "\\nQ: " <> question
    {:ok, answer} = GPT.Client.chat(prompt)
    answer
  end
  defp embed_bert(_text), do: [0.1]  # simplified
end`},{lang:"zig",filename:"biomedical_rag.zig",code:`const std = @import("std");
const pinecone = @import("pinecone-zig");
pub fn main() !void {
    var client = try pinecone.Client.init("api_key");
    defer client.deinit();
    var query: [768]f32 = .{0.1} ** 768;
    var docs = try client.query("pubmed", &query, 10);
    defer docs.deinit();
}`}],runnablePython:`# Biomedical RAG simulation — Pyodide
import random
print("=== Biomedical RAG (PubMed + BioBERT + GPT-4) ===")
print("35M PubMed abstracts → hybrid retrieval (BM25 + vector) → GPT-4 + citations")
print()
random.seed(42)
question = "What is the mechanism of action of aspirin?"
print(f"Question: {question}")
print()
# Simulate retrieved papers
papers = [("PMID:12345", "Aspirin inhibits COX-1...", 0.92),
          ("PMID:67890", "Aspirin irreversibly acetylates COX-1...", 0.89),
          ("PMID:11111", "COX-1 inhibition reduces prostaglandin synthesis...", 0.85)]
print("Retrieved papers (hybrid BM25 + vector):")
for pmid, title, score in papers:
    print(f"  {pmid} (score={score:.2f}): {title[:60]}...")
print()
print("GPT-4 answer (with citations):")
print("  Aspirin irreversibly inhibits COX-1 (cyclooxygenase-1) by")
print("  acetylating a serine residue at position 529 [PMID:67890],")
print("  reducing prostaglandin synthesis [PMID:11111].")
print()
print("Guardrail: every claim has a PMID citation — no hallucination")`,insight:"Biomedical RAG is the canonical LLMOps use case for life sciences — 35M PubMed papers indexed via BioBERT + BM25 hybrid retrieval, GPT-4 generates answers with mandatory citations. The guardrail (every claim must cite a PMID) prevents hallucination — critical in medical applications where a fabricated citation could endanger patients."},{id:"llmops-chemistry-llm",step:"2",title:"Chemistry LLM (Molecule Generation)",subtitle:"Chemistry — SMILES generation with validation guardrails",accent:"oklch(0.65 0.16 165)",icon:(0,t.jsx)(a.Atom,{className:"h-4 w-4"}),badge:"Chemistry · Drug Discovery",brief:{dataset:"ZINC molecule database — 1B SMILES strings. LLM generates novel SMILES for drug candidates. Guardrail: RDKit validates every generated SMILES is chemically valid (no impossible bonds, valid valence).",scale:"~1B molecules in training set · generated SMILES validated by RDKit · ~20% rejection rate (invalid SMILES)",why:"Shows LLMOps for chemistry — LLM generates SMILES strings for novel drug candidates. Without the RDKit guardrail, ~20% of generated molecules would be chemically impossible (invalid valence, impossible bonds). The guardrail catches these before they reach the screening pipeline."},stats:[{label:"Training set",value:"1B SMILES"},{label:"Guardrail",value:"RDKit validation"},{label:"Rejection rate",value:"~20%"},{label:"Valid output",value:"~80%"}],tools:["LangChain","GPT-4","RDKit","SMILES","ZINC database"],codeTabs:[{lang:"scala",filename:"ChemistryLLM.scala",code:`import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()
val smiles = spark.read.text("s3://zinc/smiles/")
// Fine-tune LLM on SMILES strings
// Guardrail: validate generated SMILES via RDKit`},{lang:"rust",filename:"chemistry_llm.rs",code:`use rdkit_rust::SmilesParser;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let parser = SmilesParser::new();
    let generated = "CC(=O)Oc1ccccc1C(=O)O"; // aspirin SMILES
    match parser.parse(generated) {
        Ok(mol) => println!("Valid molecule: {} atoms", mol.n_atoms()),
        Err(e) => println!("INVALID SMILES: {}", e),
    }
    Ok(())
}`},{lang:"go",filename:"chemistry_llm.go",code:`package main
import "github.com/rdkit/rdkit-go"
func main() {
    parser := rdkit.NewSmilesParser()
    smiles := "CC(=O)Oc1ccccc1C(=O)O"
    if mol, err := parser.Parse(smiles); err == nil {
        println("Valid:", mol.NumAtoms())
    } else {
        println("INVALID SMILES")
    }
}`},{lang:"elixir",filename:"chemistry_llm.ex",code:`defmodule Chemistry.LLM do
  def generate_molecule(prompt) do
    {:ok, smiles} = GPT.Client.chat("Generate a SMILES for: " <> prompt)
    case validate_smiles(smiles) do
      {:ok, mol} -> {:ok, mol}
      {:error, reason} -> generate_molecule(prompt)  # retry
    end
  end
  defp validate_smiles(smiles), do: {:ok, smiles}
end`},{lang:"zig",filename:"chemistry_llm.zig",code:`const std = @import("std");
const rdkit = @import("rdkit-zig");
pub fn main() !void {
    var parser = try rdkit.SmilesParser.init();
    defer parser.deinit();
    const smiles = "CC(=O)Oc1ccccc1C(=O)O";
    var mol = parser.parse(smiles) catch {
        std.debug.print("INVALID SMILES\\n", .{});
        return;
    };
    defer mol.deinit();
    std.debug.print("Valid: {d} atoms\\n", .{mol.numAtoms()});
}`}],runnablePython:`# Chemistry LLM with SMILES guardrail — Pyodide
import random
print("=== Chemistry LLM (SMILES generation + RDKit guardrail) ===")
print("LLM generates SMILES → RDKit validates → ~20% rejected")
print()
random.seed(42)
valid_smiles = ["CC(=O)Oc1ccccc1C(=O)O", "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
                "CN1C=NC2=C1C(=O)N(C(=O)N2C)C", "INVALID_SMILES_123"]
for i, smiles in enumerate(valid_smiles):
    valid = all(c in "CNOPSFIclBr()=#-1234567890[]" for c in smiles)
    status = "VALID" if valid else "REJECTED"
    print(f"  Molecule {i+1}: {smiles[:40]}... → {status}")
print(f"\\nGuardrail: {sum(1 for s in valid_smiles if all(c in 'CNOPSFIclBr()=#-1234567890[]' for c in s))}/{len(valid_smiles)} valid")`,insight:"Chemistry LLMs need RDKit guardrails because ~20% of generated SMILES are chemically invalid — impossible valence, forbidden bonds. Without the guardrail, the drug discovery pipeline would waste screening time on impossible molecules. The LLM generates; RDKit validates; only valid SMILES reach the screening pipeline."},{id:"llmops-clinical-trial-nlp",step:"3",title:"Clinical Trial Matching via LLM",subtitle:"Life Sciences — patient-trial matching with hallucination prevention",accent:"oklch(0.65 0.16 250)",icon:(0,t.jsx)(o.ShieldCheck,{className:"h-4 w-4"}),badge:"Life Sciences · Clinical",brief:{dataset:"ClinicalTrials.gov — 500k+ clinical trials with eligibility criteria. LLM matches patient profiles to trials. Guardrail: every trial recommendation must cite specific eligibility criteria (hallucination prevention).",scale:"~500k clinical trials · 10k patient profiles · LLM matching with criteria citations",why:"Shows LLMOps for clinical trial matching — LLM reads patient profiles (diagnosis, biomarkers, treatment history) and matches to trial eligibility criteria. The guardrail ensures every recommendation cites the specific criterion — preventing hallucinated trial matches that could endanger patients."},stats:[{label:"Trials",value:"500k+"},{label:"Patients",value:"10k"},{label:"Guardrail",value:"Citation required"},{label:"Matching",value:"LLM + criteria"}],tools:["LangChain","GPT-4","ClinicalTrials.gov API","LlamaIndex"],codeTabs:[{lang:"scala",filename:"ClinicalTrialNLP.scala",code:`import org.apache.spark.sql.SparkSession
val spark = SparkSession.builder().getOrCreate()
val trials = spark.read.json("s3://clinical-trials-gov/")
// LLM matches patient profile to trial eligibility criteria`},{lang:"rust",filename:"clinical_trial_nlp.rs",code:`use llm_rust::LlmClient;
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = LlmClient::new("gpt-4")?;
    let prompt = "Match patient: 55yo male, NSCLC, EGFR+\\nTo trial: NCT12345 (criteria: EGFR+, age 18+)\\nCite specific criteria.";
    let answer = client.chat(prompt).await?;
    println!("{}", answer);
    Ok(())
}`},{lang:"go",filename:"clinical_trial_nlp.go",code:`package main
import "github.com/llm/llm-go"
func main() {
    client := llm.NewClient("gpt-4")
    answer, _ := client.Chat("Match patient to trial NCT12345. Cite criteria.")
    println(answer)
}`},{lang:"elixir",filename:"clinical_trial_nlp.ex",code:`defmodule Clinical.TrialMatching do
  def match_trial(patient, trial_nct) do
    prompt = "Match patient #{patient} to trial #{trial_nct}. Cite eligibility criteria."
    {:ok, answer} = GPT.Client.chat(prompt)
    # Guardrail: verify every claim cites a criterion
    answer
  end
end`},{lang:"zig",filename:"clinical_trial_nlp.zig",code:`const std = @import("std");
const llm = @import("llm-zig");
pub fn main() !void {
    var client = try llm.Client.init("gpt-4");
    defer client.deinit();
    var answer = try client.chat("Match patient to trial NCT12345. Cite criteria.");
    defer answer.deinit();
}`}],runnablePython:`# Clinical trial matching LLM — Pyodide
import random
print("=== Clinical Trial Matching via LLM (with guardrails) ===")
print("Patient profile → LLM → trial match with eligibility criteria citations")
print()
random.seed(42)
patient = {"age": 55, "diagnosis": "NSCLC", "biomarker": "EGFR+", "prior_tx": "carboplatin"}
trials = [("NCT12345", "EGFR+, age 18+"), ("NCT67890", "ALK+, age 18+"),
          ("NCT11111", "EGFR+, age 18-70, no prior TKI")]
print(f"Patient: {patient['age']}yo {patient['diagnosis']} {patient['biomarker']}")
print()
for nct, criteria in trials:
    match = patient['biomarker'] in criteria and str(patient['age']) in criteria.replace('+','')
    status = "MATCH" if match else "NO MATCH"
    print(f"  {nct}: criteria='{criteria}' → {status}")
print()
print("Guardrail: LLM must cite the specific criterion (e.g. 'EGFR+ matched')")
print("→ prevents hallucinated matches that could endanger patients")`,insight:"Clinical trial matching via LLM is the highest-stakes LLMOps use case — a hallucinated trial match could endanger a patient. The guardrail (every recommendation must cite the specific eligibility criterion) ensures the LLM grounds its answer in the actual trial protocol, not in a plausible-sounding fabrication."}];e.s(["FEATURE_STORE_SCIENCE_EXAMPLES",0,c,"LLMOPS_SCIENCE_EXAMPLES",0,u,"MLFLOW_SCIENCE_EXAMPLES",0,l,"VECTOR_DB_SCIENCE_EXAMPLES",0,d])},839484,e=>{e.v(t=>Promise.all(["static/chunks/18e23c06a777fcd6.js"].map(t=>e.l(t))).then(()=>t(716400)))}]);