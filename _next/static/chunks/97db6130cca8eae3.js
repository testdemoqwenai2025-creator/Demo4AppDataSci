(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,862824,515288,e=>{"use strict";var t=e.i(843476),s=e.i(975157);function a({className:e,...a}){return(0,t.jsx)("div",{"data-slot":"card",className:(0,s.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",e),...a})}function n({className:e,...a}){return(0,t.jsx)("div",{"data-slot":"card-header",className:(0,s.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",e),...a})}function i({className:e,...a}){return(0,t.jsx)("div",{"data-slot":"card-title",className:(0,s.cn)("leading-none font-semibold",e),...a})}function o({className:e,...a}){return(0,t.jsx)("div",{"data-slot":"card-description",className:(0,s.cn)("text-muted-foreground text-sm",e),...a})}function r({className:e,...a}){return(0,t.jsx)("div",{"data-slot":"card-content",className:(0,s.cn)("px-6",e),...a})}e.s(["Card",()=>a,"CardContent",()=>r,"CardDescription",()=>o,"CardHeader",()=>n,"CardTitle",()=>i],515288);var l=e.i(487486);function c({title:e,description:s,icon:c,badge:d,badgeVariant:h="outline",children:u,className:m,contentClassName:p}){return(0,t.jsxs)(a,{className:["border-border/60",m].filter(Boolean).join(" "),children:[(e||s)&&(0,t.jsxs)(n,{className:"flex flex-row items-start gap-3 space-y-0 border-b border-border/60 bg-muted/30",children:[c&&(0,t.jsx)("div",{className:"mt-0.5 text-primary",children:c}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[e&&(0,t.jsx)(i,{className:"text-base",children:e}),d&&(0,t.jsx)(l.Badge,{variant:h,className:"text-[10px]",children:d})]}),s&&(0,t.jsx)(o,{className:"mt-1 text-xs",children:s})]})]}),(0,t.jsx)(r,{className:["p-4 md:p-5",p].filter(Boolean).join(" "),children:u})]})}function d({eyebrow:e,title:s,description:a,right:n}){return(0,t.jsxs)("div",{className:"mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4",children:[(0,t.jsxs)("div",{children:[e&&(0,t.jsx)("p",{className:"text-[11px] font-semibold uppercase tracking-widest text-primary/80 mb-1.5",children:e}),(0,t.jsx)("h1",{className:"text-2xl md:text-3xl font-semibold tracking-tight text-balance",children:s}),a&&(0,t.jsx)("p",{className:"mt-2 text-sm md:text-base text-muted-foreground max-w-3xl text-pretty",children:a})]}),n&&(0,t.jsx)("div",{className:"shrink-0",children:n})]})}function h({label:e,value:s,delta:n,deltaTone:i="flat",hint:o}){return(0,t.jsx)(a,{className:"border-border/60",children:(0,t.jsxs)(r,{className:"p-4",children:[(0,t.jsx)("p",{className:"text-[11px] uppercase tracking-wider text-muted-foreground",children:e}),(0,t.jsx)("p",{className:"mt-1 text-2xl font-semibold tabular-nums",children:s}),(0,t.jsxs)("div",{className:"mt-1 flex items-center gap-2",children:[n&&(0,t.jsx)("span",{className:`text-xs ${"up"===i?"text-emerald-600 dark:text-emerald-400":"down"===i?"text-rose-600 dark:text-rose-400":"text-muted-foreground"}`,children:n}),o&&(0,t.jsx)("span",{className:"text-[11px] text-muted-foreground",children:o})]})]})})}e.s(["KpiCard",()=>h,"PageHeader",()=>d,"SectionCard",()=>c],862824)},342046,518550,e=>{"use strict";var t=e.i(843476),s=e.i(271645),a=e.i(522016),n=e.i(901752);let i=[{cardIndex:0,name:"SVD",equation:"A = UΣV^T",sciences:["genomics","audio","finance"],insightShort:"SVD IS the Fourier transform for data",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["SVD IS NumPy's universal decomposer — np.linalg.svd → PCA for genomics, audio compression, Fama-French risk factors.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:1,name:"Attention",equation:"softmax(QK^T/√d_k) × V",sciences:["protein folding","NLP"],insightShort:"Attention IS natural selection",hostPages:["transformer-deep-dive","analytics-outputs"],hostReasons:["DNA IS a language — softmax(QK^T/√d_k)×V parses both proteins (AlphaFold2) and English (GPT-4) because both are correlation detection.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:2,name:"Poisson",equation:"P(k) = λ^k e^(-λ) / k!",sciences:["sequencing","networks","decay"],insightShort:"Poisson IS the law of rare events",hostPages:["bioinformatics-pipelines","analytics-outputs"],hostReasons:["GATK variant calling depth IS Poisson(λ=mean coverage) — same distribution that sizes server clusters and radioactive sources.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:3,name:"FFT",equation:"X[k] = Σ x[n] e^(-2πikn/N)",sciences:["mass spec","audio","cryo-EM"],insightShort:"FFT IS the change of basis",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["np.fft.fft is the SAME operation whether you're finding the m/z of a compound, the C-note in a chord, or the 3D structure of a ribosome.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:4,name:"Verlet",equation:"r(t+Δt) = 2r(t) - r(t-Δt) + F/m·Δt²",sciences:["MD","games","orbits"],insightShort:"Verlet IS time-reversal symmetry",hostPages:["computational-biology","analytics-outputs"],hostReasons:["AMBER, Havok, and NASA JPL all call this exact integrator — symplectic, energy-conserving, time-reversible. The MD integrator IS the game physics integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:5,name:"Navier-Stokes",equation:"∂u/∂t + u·∇u = -∇p/ρ + ν∇²u",sciences:["weather","blood","turbulence"],insightShort:"Navier-Stokes IS the universe's flow equation",hostPages:["computational-physics","analytics-outputs"],hostReasons:["CFD on this PDE predicts hurricanes, aneurysm risk, and wing stall — the SAME nonlinearity makes weather unpredictable and turbulence beautiful.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:6,name:"Gradient Descent",equation:"θ(t+1) = θ(t) - η∇L(θ)",sciences:["ML","evolution","thermodynamics"],insightShort:"Gradient Descent IS the learning rule",hostPages:["tabular","analytics-outputs"],hostReasons:["Gradient boosting = gradient descent on trees; GPT-4 training, natural selection, and protein folding all minimise a landscape with the SAME update rule.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:7,name:"Bayes",equation:"P(H|D) = P(D|H)P(H) / P(D)",sciences:["genetics","spam","quantum"],insightShort:"Bayes IS the belief updater",hostPages:["alphamissense","analytics-outputs"],hostReasons:["AlphaMissense classifying a VUS IS Gmail classifying spam IS a Stern–Gerlach measurement — all three update P(H) given D.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:8,name:"Euler's Method",equation:"y(t+Δt) = y(t) + f(t,y)·Δt",sciences:["orbital mechanics","games","finance"],insightShort:"Euler IS the seed of all simulation",hostPages:["space-science","analytics-outputs"],hostReasons:["Satellite trajectory propagation (NASA GMAT), game-engine fixed-step physics (Unity), and Black-Scholes Monte Carlo all START from this one-line integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:9,name:"Entropy",equation:"H = -Σ p log p",sciences:["information","thermodynamics","genetics"],insightShort:"Entropy IS the universal currency of disorder",hostPages:["systems-biology","analytics-outputs"],hostReasons:["Shannon measured message information, Boltzmann gas disorder, Haldane population heterozygosity — the SAME formula because all three quantify how spread out a distribution is.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:10,name:"Black-Scholes",equation:"C = S·N(d1) − K·e^(−rT)·N(d2)",sciences:["fintech","maritime","genetics"],insightShort:"Black-Scholes IS the universal option-pricing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["A Lloyd's underwriter pricing a 90-day cargo option, a CME quant pricing an SPX call, and a Fisher geneticist pricing an allele-substitution option all evaluate the SAME formula — the right-but-not-obligation to act on a stochastic payoff.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:11,name:"Haversine",equation:"d = 2R·arcsin(√(...))",sciences:["maritime","aviation","astronomy"],insightShort:"Haversine IS the universal great-circle distance",hostPages:["global-shipping","analytics-outputs"],hostReasons:["Rotterdam→Singapore sailing distance, LHR→JFK flight distance, and Sirius→Canopus angular separation all use the SAME formula — shortest-path distance on a sphere, invented 1805 (Bowring).","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:12,name:"Kelly Criterion",equation:"f* = (bp − q)/b = μ/σ²",sciences:["fintech","genetics","RL"],insightShort:"Kelly IS the universal bet-sizing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["Ed Thorp's blackjack team (1960s), Jim Simons' Medallion Fund (1989-2024, 65% CAGR), Haldane's allele fixation (1927), and Thompson sampling (RL) all derive the SAME optimal bet size f* = μ/σ² because they all maximize expected log-growth.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:13,name:"Markov Chain",equation:"π(t+1) = π(t)·P",sciences:["genetics","fintech","maritime"],insightShort:"Markov IS the universal state-transition equation",hostPages:["global-shipping","bioinformatics","analytics-outputs"],hostReasons:["Jukes-Cantor DNA substitution (1969), Moody's credit transitions (10⁶ bonds), and AIS port-state transitions (100K vessels) all use the SAME matrix update — the memoryless property is universal.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:14,name:"Value at Risk",equation:"VaR_α = −(μ + z_α·σ)",sciences:["fintech","maritime","climate"],insightShort:"VaR IS the universal tail-risk equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["JPMorgan's 1-day 99% VaR ($4T balance, Basel III), Lloyd's 7-day 95% VaR ($50B hull, Solvency II), and NOAA 100-year flood VaR (FEMA FIRMs) all use the SAME quantile — every loss distribution has an inverse CDF.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:15,name:"PageRank",equation:"PR(p) = (1-d) + d·Σ(PR(q)/L(q))",sciences:["fintech","maritime","genetics"],insightShort:"PageRank IS the universal centrality equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["BIS systemic risk (Lehman PR ≈ 0.012), UN COMTRADE port chokepoint (Rotterdam PR ≈ 0.020), and STRING gene essentiality (TP53 PR ≈ 0.025) all use the SAME eigenvector — Brin & Page 1998 for the web, now spanning banking, trade, and genomics.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:16,name:"Kalman Filter",equation:"x̂(t+1) = x̂(t) + K·(z − H·x̂(t))",sciences:["maritime","aviation","genetics"],insightShort:"Kalman IS the universal state-estimation equation",hostPages:["global-shipping","analytics-outputs"],hostReasons:["AIS vessel tracking (100K vessels × 60s), ADS-B flight tracking (100K flights × 1s), and 1000-Genomes allele frequency tracking all use the SAME Bayesian update — Kalman 1960 invented this for Apollo navigation.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:17,name:"Monte Carlo",equation:"E[f(X)] ≈ (1/N)·Σ f(X_i)",sciences:["fintech","maritime","genetics"],insightShort:"Monte Carlo IS the universal estimation equation",hostPages:["fintech","global-shipping","monte-carlo","analytics-outputs"],hostReasons:["Option pricing (10⁶ GBM paths), port congestion (10⁵ vessel sims), and rare-variant permutation tests (10⁶ permutations) all use the SAME averaging — Metropolis 1946 invented this at Los Alamos for neutron transport.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:18,name:"Geometric Brownian Motion",equation:"dS = μS·dt + σS·dW",sciences:["fintech","maritime","genetics"],insightShort:"GBM IS the universal multiplicative-noise equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["SPX daily returns (Black-Scholes foundation), Rotterdam container dwell times, and Wright-Fisher allele drift all use the SAME SDE — multiplicative noise keeps S positive with log-normal stationarity.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:19,name:"Lloyd's Algorithm",equation:"μ_k ← mean({x : argmin_k ‖x − μ_k‖²})",sciences:["maritime","genetics","ML"],insightShort:"Lloyd IS the universal clustering equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["50K ports clustered by trade flows (UN COMTRADE), 2504 individuals clustered by SNP PCA (1000-Genomes), and 1.4M images clustered by ResNet-50 (ImageNet) all use the SAME iterate — Lloyd 1957 invented this at Bell Labs for PCM.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:20,name:"HyperLogLog",equation:"E = α_m m² (Σ 2^(-M_j))^(-1)",sciences:["data engineering","genomics","network security"],insightShort:"HLL IS the universal counter — 33M× memory compression with <1% error",hostPages:["big-data-ingestion","analytics-outputs"],hostReasons:["COUNT(DISTINCT user_id) in Snowflake/Spark, unique k-mers in Jellyfish (genome assembler), unique source IPs in Redis PFCOUNT (DDoS monitor) — all run the SAME hash→bucket→max-zeros→harmonic-mean algorithm. 12 KB vs 400 GB for exact counting.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:21,name:"Bloom Filter",equation:"P(fp) = (1 - e^(-kn/m))^k",sciences:["network security","genomics","databases"],insightShort:"Bloom filter IS the universal membership test — 23× compression with 0.1% false positives",hostPages:["kafka-connect","delta-lake","analytics-outputs"],hostReasons:["Chrome Safe Browsing (malware URL check), genome assembler read dedup, RocksDB SSTable key lookup — all use the SAME k-hash→bit-set→AND-check. 175 MB vs 4 GB for exact hash set.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:22,name:"Consistent Hashing",equation:"θ = hash(key) mod 2^256",sciences:["streaming","CDN","databases"],insightShort:"Consistent hashing IS the universal partitioner — K/n keys move, not all K",hostPages:["kafka","schema-registry","analytics-outputs"],hostReasons:["Kafka partition assignment across brokers, Akamai CDN edge routing, Cassandra shard assignment — all use the SAME hash ring. Adding a node moves 8% of data, not 50%.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:23,name:"LSM-Tree Compaction",equation:"WA = (L+1)/L",sciences:["data engineering","databases","distributed storage"],insightShort:"LSM compaction IS the universal write amplifier — 1.25× vs B-tree's 4-10×",hostPages:["delta-lake","big-data-ingestion","analytics-outputs"],hostReasons:["Delta Lake Auto Compaction (18,400→12 files), RocksDB level compaction (L0→L1→L2→L3), Cassandra size-tiered compaction — all use the SAME merge-sort. Write amplification 1.25× vs B-tree's 4-10×.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:24,name:"Count-Min Sketch",equation:"ê_i = min_j count[j][h_j(i)]",sciences:["streaming","genomics","networking"],insightShort:"CMS IS the universal frequency estimator — 4M× compression, bounded over-estimation",hostPages:["spark-streaming","flink","analytics-outputs"],hostReasons:["Spark Structured Streaming top-K, genome k-mer frequency counting (repeat detection), network heavy-hitter detection (DDoS) — all use the SAME d×w matrix. 20 KB vs 80 GB for exact hash map.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:25,name:"Reservoir Sampling",equation:"P(item_i in sample) = k/N",sciences:["streaming","A/B testing","genomics"],insightShort:"Reservoir IS the universal sampler — O(k) memory, uniform sampling from unbounded stream",hostPages:["spark-streaming","streaming-sql","analytics-outputs"],hostReasons:["Kafka stream event sampling, A/B test cohort selection from live users, GWAS variant subsampling — all use the SAME k/N replace-probability algorithm. O(k) memory regardless of stream length.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:26,name:"T-Digest",equation:"q̂(p) = merge(centroids)",sciences:["streaming","finance","observability"],insightShort:"T-Digest IS the universal quantile estimator — 80M× compression at the tails",hostPages:["spark-streaming","fintech","analytics-outputs"],hostReasons:["p99 latency in Spark, p99 VaR in Basel III Monte Carlo, p99 response time in Datadog — all use the SAME centroid-merging algorithm. 1 KB vs 80 GB for exact sorted array.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:27,name:"Cuckoo Filter",equation:"i2 = i1 XOR hash(fingerprint)",sciences:["databases","networking","caching"],insightShort:"Cuckoo Filter IS Bloom's successor — same membership test, PLUS deletion support",hostPages:["delta-lake","analytics-outputs"],hostReasons:["Cassandra SSTable with dynamic keys, routing table add/remove, Redis cache invalidation — all need membership test WITH deletion. Bloom can't delete; Cuckoo can.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:28,name:"Skip List",equation:"P(level L) = (1/2)^L",sciences:["databases","storage","compilers"],insightShort:"Skip List IS the universal ordered structure — O(log n) without tree rebalancing",hostPages:["duckdb","analytics-outputs"],hostReasons:["Redis ZSET (leaderboard), LevelDB/RocksDB memtable (sorted KV before SSTable flush), LLVM instruction scheduler — all use the SAME probabilistic linking. No rebalancing needed.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]}];function o(e){return i.filter(t=>t.hostPages.includes(e))}let r={0:[3,9,19],1:[0,6,7],2:[7,9,13],3:[0,2,8],4:[8,5,16],5:[4,18,8],6:[7,12,1],7:[6,2,16],8:[4,18,16],9:[0,2,19],10:[18,14,12],11:[15,16,17],12:[6,10,7],13:[2,16,15],14:[10,18,17],15:[13,0,11],16:[13,4,7],17:[18,14,9],18:[10,8,17],19:[0,9,6]};function l(e){return r[e]??[]}e.s(["ELEGANT_CODE_MAP",0,i,"cardsOnHostPage",()=>o,"recommendedCards",()=>l],518550);var c=e.i(487486),d=e.i(394908),h=e.i(972520);let u="discovery-path-visited";function m({relatedPages:e=[]}){let[o,r]=(0,s.useState)(()=>{try{let e=localStorage.getItem(u);return e?JSON.parse(e):[]}catch{return[]}});(0,s.useEffect)(()=>{try{let e=localStorage.getItem(u);if(e){let t=JSON.parse(e);setTimeout(()=>r(t),0)}}catch{}},[]);let m=(0,s.useMemo)(()=>{let t=[];if(o.length>0){let e={};for(let t of o)for(let s of l(t))o.includes(s)||(e[s]=(e[s]??0)+1);for(let[s,a]of Object.entries(e).sort((e,t)=>t[1]-e[1]).slice(0,3)){let e=i[Number(s)];e&&t.push({id:"elegant-code",reason:`Explore ${e.name} — recommended by ${a} of your visited cards`,isCousin:!0})}}for(let s of e){if(t.length>=3)break;t.find(e=>e.id===s.id)||t.push({...s,isCousin:!1})}return 0===t.length&&(t.push({id:"elegant-code",reason:"Start with the 20 elegant-code cards",isCousin:!1}),t.push({id:"connections",reason:"See the card → card graph",isCousin:!1}),t.push({id:"resources",reason:"Browse datasets, papers, libraries",isCousin:!1})),t.slice(0,3)},[o,e]);return 0===m.length?null:(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsxs)("p",{className:"text-xs font-semibold text-primary mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(d.Compass,{className:"h-3.5 w-3.5"}),"Next steps — where to go from here",o.length>0&&(0,t.jsxs)("span",{className:"text-[9px] text-muted-foreground ml-1",children:["(",o.length," cards explored)"]})]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:m.map((e,s)=>(0,t.jsxs)(a.default,{href:(0,n.hrefFor)(e.id),className:"text-xs text-primary hover:underline flex items-center gap-1",children:[(0,t.jsx)(h.ArrowRight,{className:"h-3 w-3"}),e.reason,e.isCousin&&(0,t.jsx)(c.Badge,{variant:"outline",className:"text-[8px] px-1 py-0 ml-1",children:"cousin"})]},s))})]})}e.s(["NextSteps",()=>m],342046)},332017,e=>{"use strict";var t=e.i(843476),s=e.i(522016),a=e.i(25652),n=e.i(810980),i=e.i(901752);function o({title:e,connectedTo:o,researchHref:r,children:l}){return(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-4 space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-start gap-2",children:[(0,t.jsx)(a.TrendingUp,{className:"h-4 w-4 text-primary mt-0.5 shrink-0"}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-foreground/90 leading-tight",children:e}),o&&(0,t.jsxs)("div",{className:"flex items-center gap-1.5 mt-1",children:[(0,t.jsx)(n.BookOpen,{className:"h-3 w-3 text-muted-foreground"}),(0,t.jsxs)(s.default,{href:r??(0,i.hrefFor)("research"),className:"text-[10px] text-muted-foreground hover:text-primary hover:underline",children:["Connected to: ",o," →"]})]})]})]}),(0,t.jsx)("div",{className:"text-xs text-muted-foreground leading-relaxed space-y-2 pl-6",children:l})]})}function r({pageTitle:e,children:s}){return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 border-b border-border/60 pb-2",children:[(0,t.jsx)(a.TrendingUp,{className:"h-5 w-5 text-primary"}),(0,t.jsxs)("h2",{className:"text-base font-bold text-foreground/90",children:["My deeper thoughts — ",e]})]}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground italic leading-relaxed",children:"These are not summaries. They are arguments — the kind of connections a reader with serious grey matter would make after living with the material for years. Each thought connects to the platform's research section (ADRs, papers, decision records) so it's traceable, not just opinionated."}),(0,t.jsx)("div",{className:"space-y-3",children:s})]})}e.s(["DeeperThought",()=>o,"DeeperThoughtSection",()=>r])},431343,63209,595468,868054,e=>{"use strict";var t=e.i(451477);e.s(["Play",()=>t.default],431343);var s=e.i(361653);e.s(["AlertCircle",()=>s.default],63209);var a=e.i(123287);e.s(["CheckCircle2",()=>a.default],595468);var n=e.i(249988);e.s(["Terminal",()=>n.default],868054)},716675,e=>{"use strict";var t=e.i(843476),s=e.i(271645),a=e.i(846932),n=e.i(88653),i=e.i(519455),o=e.i(487486),r=e.i(431343),l=e.i(531278),c=e.i(63209),d=e.i(595468),h=e.i(868054);let u=null,m="0.26.2",p=`https://cdn.jsdelivr.net/pyodide/v${m}/full/`;async function g(){return u||(u=(async()=>(await new Promise((e,t)=>{if(window.loadPyodide)return void e();let s=document.createElement("script");s.src=`${p}pyodide.js`,s.onload=()=>e(),s.onerror=()=>t(Error("Failed to load Pyodide bootstrap")),document.head.appendChild(s)}),await window.loadPyodide({indexURL:p})))())}function f({code:e,buttonLabel:u="Run in browser",preamble:p,compact:f=!1,onOutput:x,hideTextOutput:b=!1}){let[y,_]=(0,s.useState)("idle"),[k,v]=(0,s.useState)(""),[q,w]=(0,s.useState)(null),[S,j]=(0,s.useState)(null),N=(0,s.useRef)(null),A=(0,s.useCallback)(async()=>{_("loading"),w(null),v("Loading Pyodide runtime (~10MB)…\n");let t=performance.now();try{let s=await g(),a=Math.round(performance.now()-t);j(a);let n=[],i=e=>{n.push(e)};try{s.setStdout({batched:i}),s.setStderr({batched:i})}catch{try{s.setStdout(i),s.setStderr(i)}catch{}}let o=(p??"")+"\n"+e,r=[];if(/\bnumpy\b|\bnp\./.test(o)&&r.push("numpy"),/\bscipy\b|\bsp\./.test(o)&&r.push("scipy"),/\bsklearn\b|\bGradientBoosting\b|\bRandomForest\b|\btrain_test_split\b|\bKMeans\b|\bSVC\b|\bLogisticRegression\b/.test(o)&&r.push("scikit-learn"),/\bpandas\b|\bpd\./.test(o)&&r.push("pandas"),/\bpyarrow\b|\bpq\./.test(o)&&r.push("pyarrow"),r.length>0)try{await s.loadPackage(r)}catch{}_("running"),v(`Pyodide loaded in ${a}ms. Running…

`),p&&await s.runPythonAsync(p),await s.runPythonAsync(e);let l=n.join("");v(e=>e+(l||"(no output)")),_("done"),x&&x(l)}catch(t){let e=t instanceof Error?t.message:String(t);w(e),_("error"),v(t=>t+`
Error: ${e}`)}},[e,p,x]);return(0,s.useEffect)(()=>{N.current&&(N.current.scrollTop=N.current.scrollHeight)},[k]),(0,t.jsxs)("div",{className:`mt-3 ${f?"":"rounded-md border border-primary/30 bg-primary/3 p-3"}`,children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)(i.Button,{size:f?"sm":"default",variant:"running"===y||"loading"===y?"outline":"default",className:"gap-1.5",onClick:A,disabled:"loading"===y||"running"===y,children:["loading"===y||"running"===y?(0,t.jsx)(l.Loader2,{className:"h-3.5 w-3.5 animate-spin"}):"done"===y?(0,t.jsx)(d.CheckCircle2,{className:"h-3.5 w-3.5"}):"error"===y?(0,t.jsx)(c.AlertCircle,{className:"h-3.5 w-3.5"}):(0,t.jsx)(r.Play,{className:"h-3.5 w-3.5"}),u]}),!f&&(0,t.jsxs)(o.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,t.jsx)(h.Terminal,{className:"h-2.5 w-2.5"}),"Pyodide v",m]}),null!==S&&"done"===y&&(0,t.jsxs)("span",{className:"text-[10px] text-muted-foreground",children:["Runtime: ",S,"ms load + execution"]})]}),(0,t.jsx)(n.AnimatePresence,{children:("idle"!==y||k)&&!b&&(0,t.jsx)(a.motion.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-2",children:(0,t.jsx)("div",{ref:N,className:`rounded-md bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] p-2.5 text-[11px] font-mono leading-relaxed overflow-x-auto code-scroll max-h-64 overflow-y-auto ${q?"border border-rose-500/40":"border border-emerald-500/30"}`,children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap",children:k})})})})]})}e.s(["PyodideRunner",()=>f])},643531,e=>{"use strict";var t=e.i(678745);e.s(["Check",()=>t.default])},174886,e=>{"use strict";var t=e.i(991124);e.s(["Copy",()=>t.default])},122836,e=>{"use strict";var t=e.i(843476),s=e.i(271645),a=e.i(643531),n=e.i(174886),i=e.i(519455);function o({code:e,language:o="sql",filename:r,highlight:l=[]}){let[c,d]=(0,s.useState)(!1),h=e.replace(/\n$/,"").split("\n"),u=async()=>{try{await navigator.clipboard.writeText(e),d(!0),setTimeout(()=>d(!1),1500)}catch{}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-white/5",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[11px] text-white/60 font-mono",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-rose-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-amber-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-emerald-400"}),(0,t.jsx)("span",{className:"ml-2 uppercase tracking-wider",children:o}),r&&(0,t.jsxs)("span",{className:"text-white/40",children:["· ",r]})]}),(0,t.jsxs)(i.Button,{variant:"ghost",size:"sm",className:"h-6 px-2 text-[11px] text-white/70 hover:text-white hover:bg-white/10",onClick:u,"aria-label":"Copy code",children:[c?(0,t.jsx)(a.Check,{className:"h-3 w-3 mr-1"}):(0,t.jsx)(n.Copy,{className:"h-3 w-3 mr-1"}),c?"Copied":"Copy"]})]}),(0,t.jsx)("pre",{className:"code-scroll overflow-x-auto p-3 text-[12.5px] leading-relaxed font-mono",children:(0,t.jsx)("code",{children:h.map((e,s)=>{let a=s+1,n=l.includes(a);return(0,t.jsxs)("div",{className:["flex",n?"bg-primary/20 -mx-3 px-3 border-l-2 border-primary":""].join(" "),children:[(0,t.jsx)("span",{className:"select-none text-white/30 w-8 inline-block text-right pr-3 shrink-0",children:a}),(0,t.jsx)("span",{className:"whitespace-pre",children:e||" "})]},a)})})})]})}function r({children:e}){return(0,t.jsx)("code",{className:"rounded bg-muted px-1.5 py-0.5 text-[12px] font-mono text-foreground/90 border border-border/60",children:e})}e.s(["CodeBlock",()=>o,"InlineCode",()=>r])},618393,e=>{"use strict";var t=e.i(953651);e.s(["Server",()=>t.default])},519386,e=>{"use strict";var t=e.i(843476),s=e.i(271645),a=e.i(846932),n=e.i(522016),i=e.i(862824),o=e.i(342046),r=e.i(122836),l=e.i(716675),c=e.i(901752),d=e.i(487486),h=e.i(332017),u=e.i(966992),m=e.i(39312),p=e.i(25652),g=e.i(868054),f=e.i(455711),x=e.i(618393),b=e.i(658041);let y=[{label:"KV cache / token (70B)",value:"2.6 MB",hint:"2 · 80 layers · 8192 dim · 2 bytes (BF16)",deltaTone:"flat"},{label:"32k ctx × 8 users",value:"670 GB",hint:"Contiguous KV → OOM. Paged → fits",deltaTone:"flat"},{label:"Throughput (HF)",value:"~50 tok/s",hint:"Sequential, no batching",deltaTone:"flat"},{label:"Throughput (vLLM)",value:"~3000 tok/s",hint:"PagedAttention + continuous batching",deltaTone:"flat"}];function _(){let[e,n]=(0,s.useState)(0);(0,s.useEffect)(()=>{let e=setInterval(()=>n(e=>(e+1)%6),900);return()=>clearInterval(e)},[]);let i=function(e){let t=Array(32).fill("free"),s=0;for(let a=0;a<e.seqA;a++)t[s++]="A";for(let a=0;a<e.seqB;a++)t[s++]="B";for(let a=0;a<e.seqC;a++)t[s++]="C";for(let a=0;a<e.seqD;a++)t[s++]="D";return t}([{seqA:2,seqB:0,seqC:0,seqD:0},{seqA:2,seqB:2,seqC:0,seqD:0},{seqA:3,seqB:2,seqC:0,seqD:0},{seqA:3,seqB:2,seqC:2,seqD:0},{seqA:0,seqB:2,seqC:2,seqD:0},{seqA:0,seqB:2,seqC:2,seqD:3}][e]),o={A:"oklch(0.55 0.16 250 / 0.7)",B:"oklch(0.55 0.16 165 / 0.7)",C:"oklch(0.6 0.15 75 / 0.7)",D:"oklch(0.6 0.20 25 / 0.7)",free:"oklch(0.7 0 0 / 0.08)"};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("style",{children:`
        .pa-3d { perspective: 800px; }
        .pa-stage { transform: rotateX(15deg); transform-style: preserve-3d; }
      `}),(0,t.jsxs)("p",{className:"text-sm font-semibold mb-3 flex items-center gap-2",children:[(0,t.jsx)(b.Database,{className:"h-4 w-4 text-primary"}),"PagedAttention — KV cache as virtual memory",(0,t.jsx)("span",{className:"text-[10px] font-mono text-muted-foreground ml-auto",children:["1. seqA arrives","2. seqB joins","3. seqA grows (paged)","4. seqC joins","5. seqA finishes → pages freed","6. seqD reuses freed pages"][e]})]}),(0,t.jsx)("div",{className:"pa-3d",children:(0,t.jsx)("div",{className:"pa-stage",children:(0,t.jsxs)("div",{className:"inline-block p-3 rounded border border-border/60 bg-background/60 mx-auto",children:[(0,t.jsx)("p",{className:"text-[9px] font-mono text-muted-foreground mb-1.5 text-center",children:"GPU VRAM (80 GB) · 16KB pages · 32 shown"}),(0,t.jsx)("div",{className:"grid grid-cols-8 gap-1",children:i.map((s,n)=>(0,t.jsx)(a.motion.div,{className:"w-9 h-9 rounded flex items-center justify-center text-[9px] font-mono font-bold border border-border/40",animate:{backgroundColor:o[s],color:"free"===s?"var(--muted-foreground)":"white",scale:4===e&&"free"===s?1.05:1},transition:{duration:.3},children:"free"===s?"·":s},n))})]})})}),(0,t.jsxs)("div",{className:"flex justify-center gap-3 mt-3 text-[10px] flex-wrap",children:[(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded",style:{backgroundColor:o.A}})," seqA"]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded",style:{backgroundColor:o.B}})," seqB"]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded",style:{backgroundColor:o.C}})," seqC"]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded",style:{backgroundColor:o.D}})," seqD"]}),(0,t.jsxs)("span",{className:"flex items-center gap-1",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded",style:{backgroundColor:o.free}})," free"]})]}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground text-center mt-3",children:"No contiguous allocation needed. Each sequence's KV lives in arbitrary pages, joined by a per-sequence page table. When seqA finishes, its pages are immediately reusable — no defrag, no OOM."})]})}function k(){return(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-rose-500/40 bg-rose-500/5 p-3",children:[(0,t.jsxs)("p",{className:"font-semibold text-sm text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(x.Server,{className:"h-4 w-4"})," Static batching (HF / Triton)"]}),(0,t.jsx)(r.CodeBlock,{language:"text",filename:"static_batch.txt",code:`Time →  0----5----10---15---20---25---30---35
        ┌──────────────────────────┐
seqA   │ gen gen gen gen END      │   wait
seqB   │ gen gen gen gen gen END  │   wait
seqC   │ gen gen gen END          │   wait
seqD   │                          │   gen gen gen gen END
        └──────────────────────────┘
        ↑ batch starts at t=0, must wait for ALL to finish
        ↑ seqD waits 20 units before it can start
        ↑ GPU idle while seqA, seqC finish early
        ↑ padding wastes compute (sequences have diff lengths)`}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2",children:"Whole batch starts together, ends together. Short sequences waste GPU. New requests wait for the next batch."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-3",children:[(0,t.jsxs)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(x.Server,{className:"h-4 w-4"})," Continuous batching (vLLM)"]}),(0,t.jsx)(r.CodeBlock,{language:"text",filename:"continuous_batch.txt",code:`Time →  0----5----10---15---20---25---30---35
seqA   gen gen gen END
seqB   gen gen gen gen gen END
seqC   gen gen END
seqD            gen gen gen gen END
seqE                  gen gen gen gen END
seqF                        gen END
        ↑ seqD joins at t=10 (slot freed when seqA ended)
        ↑ seqE joins at t=15 (slot freed when seqC ended)
        ↑ GPU never idle, no padding waste
        ↑ slot joins/leaves mid-decode, no barrier`}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2",children:"Every iteration, the scheduler picks the next token for every active sequence. New sequences join the moment a slot frees."})]})]})}let v=`# KV Cache + PagedAttention memory math (Pyodide)
# Shows why contiguous KV cache OOMs and how paging fixes it

import math

# ============================================================
# KV cache size per token
# ============================================================
def kv_cache_per_token(num_layers, d_model, num_kv_heads, head_dim, dtype_bytes=2):
    """
    KV cache per token = 2 (K+V) \xd7 layers \xd7 num_kv_heads \xd7 head_dim \xd7 dtype_bytes
    
    For Llama-3 70B:
      80 layers, 64 KV heads (GQA), 128 head_dim, BF16
      = 2 \xd7 80 \xd7 64 \xd7 128 \xd7 2 = 2,621,440 bytes = 2.5 MB / token
    
    For Llama-3 8B:
      32 layers, 8 KV heads, 128 head_dim, BF16
      = 2 \xd7 32 \xd7 8 \xd7 128 \xd7 2 = 131,072 bytes = 128 KB / token
    """
    return 2 * num_layers * num_kv_heads * head_dim * dtype_bytes

# ============================================================
# Per-sequence KV cache size
# ============================================================
def kv_cache_per_sequence(seq_len, num_layers, num_kv_heads, head_dim, dtype_bytes=2):
    "Total KV cache for a single sequence of given length"
    per_token = kv_cache_per_token(num_layers, 0, num_kv_heads, head_dim, dtype_bytes)
    # Actually: per_token already includes num_layers, so just multiply by seq_len
    per_token = 2 * num_layers * num_kv_heads * head_dim * dtype_bytes
    return per_token * seq_len

# ============================================================
# Memory scenarios
# ============================================================
print("=" * 60)
print("KV Cache Memory Math")
print("=" * 60)

models = [
    ("Llama-3 8B",  32, 8,   128),
    ("Llama-3 70B", 80, 64,  128),
    ("GPT-4 (est)", 120, 96, 128),
]

for name, L, kv_heads, hd in models:
    per_token = kv_cache_per_token(L, 0, kv_heads, hd)
    print(f"\\n{name}: {L} layers, {kv_heads} KV heads, {hd} head_dim")
    print(f"  Per token: {per_token / 1024:.0f} KB ({per_token / 1e6:.2f} MB)")
    
    for seq_len in [1024, 8192, 32768]:
        per_seq = per_token * seq_len
        for n_users in [1, 8, 32]:
            total = per_seq * n_users
            fits_a100 = total < 80 * 1e9  # 80GB
            print(f"    {seq_len:5d} ctx \xd7 {n_users:2d} users = {total / 1e9:.2f} GB  {'✓ A100' if fits_a100 else '✗ OOM'}")

# ============================================================
# PagedAttention: how it solves the OOM
# ============================================================
print(f"\\n{'=' * 60}")
print("PagedAttention Solution")
print("=" * 60)

block_size_tokens = 16  # tokens per block
block_size_bytes = block_size_tokens * 2 * 80 * 64 * 128 * 2  # for 70B
print(f"\\nBlock size: {block_size_tokens} tokens = {block_size_bytes / 1024:.0f} KB")
print(f"  Pages allocated on-demand, freed when sequence ends")
print(f"  Page table per sequence: maps logical → physical page")

# Fragmentation analysis
total_vram = 80 * 1e9  # 80GB A100
weights = 35 * 1e9    # AWQ 70B
free_vram = total_vram - weights
print(f"\\nFor 70B AWQ on 1\xd7 A100 80GB:")
print(f"  Weights:      35 GB")
print(f"  Free for KV:  {free_vram / 1e9:.0f} GB")

# Without paging: contiguous allocation
# Smallest request limits batch
per_token_70b = 2 * 80 * 64 * 128 * 2  # 2.6MB
max_contig_tokens = free_vram / per_token_70b
print(f"\\n  Without paging (contiguous):")
print(f"    Max tokens fit contiguously: {max_contig_tokens:.0f}")
print(f"    = 1 user @ {max_contig_tokens:.0f} tokens, OR")
print(f"    = 8 users @ {max_contig_tokens / 8:.0f} tokens each (must all fit)")
print(f"    Problem: if 1 user finishes, slot is wasted (no reuse)")

# With paging: pages allocated per token
tokens_per_page = 16
num_pages = free_vram / (tokens_per_page * per_token_70b)
print(f"\\n  With paging (block_size=16):")
print(f"    Num pages: {num_pages:.0f}")
print(f"    Total tokens storable: {num_pages * tokens_per_page:.0f}")
print(f"    = same total, but allocation is per-block, freed immediately")
print(f"    Throughput: 8-23\xd7 higher (PagedAttention paper)")

# ============================================================
# Continuous batching throughput math
# ============================================================
print(f"\\n{'=' * 60}")
print("Throughput Comparison")
print("=" * 60)

# HF: 50 tok/s, batch=1
# vLLM: 3000 tok/s at high concurrency
# Why: continuous batching fills GPU every step

hf_throughput = 50  # tokens/sec/GPU
vllm_throughput = 3000
print(f"\\nHuggingFace Transformers (no batching, no paging):")
print(f"  Throughput: ~{hf_throughput} tok/s/GPU")
print(f"  1 A100 → {hf_throughput * 60:.0f} tok/min → {hf_throughput * 3600:.0f} tok/hour")
print(f"  To serve 1M tokens/day: needs {1e6 / (hf_throughput * 86400):.1f} GPUs")

print(f"\\nvLLM (PagedAttention + continuous batching):")
print(f"  Throughput: ~{vllm_throughput} tok/s/GPU  ({vllm_throughput / hf_throughput:.0f}\xd7 faster)")
print(f"  1 A100 → {vllm_throughput * 60:.0f} tok/min → {vllm_throughput * 3600:.0f} tok/hour")
print(f"  To serve 1M tokens/day: needs {1e6 / (vllm_throughput * 86400):.3f} GPUs")
print(f"  Cost savings: \${(1 - vllm_throughput / (vllm_throughput / hf_throughput) / vllm_throughput) * 100:.0f}% vs HF")

print(f"\\n{'=' * 60}")
print("KEY MATH:")
print("  KV per token = 2 \xb7 L \xb7 H_kv \xb7 D_head \xb7 bytes")
print("  PagedAttention: allocates in blocks of 16 tokens (16MB blocks)")
print("  Continuous batching: iteration-level scheduler, slots freed immediately")
print("  Net: 8-23\xd7 throughput, no OOM, no padding waste")
print("=" * 60)`,q=`import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import List, Optional, Tuple
import time
from dataclasses import dataclass, field

# ============================================================
# 1. KV Cache — the core abstraction
# ============================================================

@dataclass
class KVCache:
    """Per-layer KV cache for a single sequence.
    
    Shape:
        K: [batch, num_kv_heads, seq_len, head_dim]
        V: [batch, num_kv_heads, seq_len, head_dim]
    
    For GQA (Llama-3): num_kv_heads < num_heads (e.g. 64 vs 96).
    For MHA (BERT): num_kv_heads == num_heads.
    """
    K: torch.Tensor
    V: torch.Tensor
    
    def append(self, new_K: torch.Tensor, new_V: torch.Tensor):
        """Append new tokens' K, V to the cache (autoregressive)."""
        # new_K, new_V: [batch, num_kv_heads, 1, head_dim] (one token)
        self.K = torch.cat([self.K, new_K], dim=2)
        self.V = torch.cat([self.V, new_V], dim=2)
    
    @property
    def seq_len(self) -> int:
        return self.K.shape[2]
    
    @classmethod
    def empty(cls, batch: int, num_kv_heads: int, head_dim: int,
              dtype=torch.bfloat16, device='cuda'):
        return cls(
            K=torch.empty(batch, num_kv_heads, 0, head_dim, dtype=dtype, device=device),
            V=torch.empty(batch, num_kv_heads, 0, head_dim, dtype=dtype, device=device),
        )

# ============================================================
# 2. Paged KV Cache — vLLM's PagedAttention
# ============================================================

@dataclass
class PagedKVCache:
    """Paged KV cache — non-contiguous allocation, OS-style page table.
    
    Memory layout:
        - kv_blocks: [num_blocks, num_kv_heads, block_size, head_dim, 2]
          (last dim = 2 for K and V, packed for cache locality)
        - block_table: [batch, max_num_blocks_per_seq] — maps logical → physical block
    
    Free blocks are tracked in a free_list. When a sequence finishes,
    its blocks are returned to the free_list for immediate reuse.
    """
    num_blocks: int          # total physical blocks
    block_size: int          # tokens per block (typically 16)
    num_kv_heads: int
    head_dim: int
    dtype: torch.dtype
    device: str
    
    # The physical KV tensor — flat, no per-sequence allocation
    kv_blocks: torch.Tensor  # [num_blocks, num_kv_heads, block_size, head_dim, 2]
    
    # Per-sequence block tables (logical → physical mapping)
    block_tables: dict = field(default_factory=dict)  # seq_id -> list[int]
    
    # Per-sequence context lengths (tokens written so far)
    context_lens: dict = field(default_factory=dict)
    
    # Free list of physical block indices
    free_blocks: List[int] = field(default_factory=list)
    
    @classmethod
    def create(cls, num_blocks: int, block_size: int = 16,
               num_kv_heads: int = 64, head_dim: int = 128,
               dtype=torch.bfloat16, device='cuda'):
        kv = torch.zeros(
            num_blocks, num_kv_heads, block_size, head_dim, 2,
            dtype=dtype, device=device,
        )
        cache = cls(
            num_blocks=num_blocks,
            block_size=block_size,
            num_kv_heads=num_kv_heads,
            head_dim=head_dim,
            dtype=dtype,
            device=device,
            kv_blocks=kv,
            free_blocks=list(range(num_blocks)),
        )
        return cache
    
    def allocate_sequence(self, seq_id: int, num_tokens: int) -> bool:
        """Allocate blocks for a new sequence. Returns False if OOM."""
        num_blocks_needed = (num_tokens + self.block_size - 1) // self.block_size
        if len(self.free_blocks) < num_blocks_needed:
            return False  # OOM
        blocks = [self.free_blocks.pop() for _ in range(num_blocks_needed)]
        self.block_tables[seq_id] = blocks
        self.context_lens[seq_id] = num_tokens
        return True
    
    def free_sequence(self, seq_id: int):
        """Free all blocks used by a sequence (immediate reuse)."""
        if seq_id in self.block_tables:
            self.free_blocks.extend(self.block_tables[seq_id])
            del self.block_tables[seq_id]
            del self.context_lens[seq_id]
    
    def write_kv(self, seq_id: int, new_K: torch.Tensor, new_V: torch.Tensor,
                 start_pos: int):
        """Write new K, V tokens to the paged cache.
        
        new_K, new_V: [num_kv_heads, num_new_tokens, head_dim]
        """
        block_table = self.block_tables[seq_id]
        num_new = new_K.shape[1]
        
        for i in range(num_new):
            # Logical position
            logical_pos = start_pos + i
            block_idx = logical_pos // self.block_size
            offset = logical_pos % self.block_size
            
            # Physical block
            phys_block = block_table[block_idx]
            
            # Write to physical block
            self.kv_blocks[phys_block, :, offset, :, 0] = new_K[:, i, :]
            self.kv_blocks[phys_block, :, offset, :, 1] = new_V[:, i, :]
    
    def read_kv(self, seq_id: int) -> Tuple[torch.Tensor, torch.Tensor]:
        """Read all K, V for a sequence (reconstruct contiguous view).
        
        Returns: K, V of shape [num_kv_heads, seq_len, head_dim]
        """
        block_table = self.block_tables[seq_id]
        context_len = self.context_lens[seq_id]
        
        # Gather blocks (non-contiguous → contiguous via indexing)
        gathered = self.kv_blocks[block_table]  # [num_blocks, num_kv_heads, block_size, head_dim, 2]
        gathered = gathered.reshape(-1, self.num_kv_heads, self.block_size, self.head_dim, 2)
        gathered = gathered[:context_len]  # truncate to actual context
        
        # Split into K, V
        K = gathered[:, :, :, :, 0].permute(1, 0, 2, 3)  # [num_kv_heads, seq_len, block_size, head_dim]
        V = gathered[:, :, :, :, 1].permute(1, 0, 2, 3)
        
        # Reshape to flatten block_size
        K = K.reshape(self.num_kv_heads, -1, self.head_dim)
        V = V.reshape(self.num_kv_heads, -1, self.head_dim)
        
        return K, V

# ============================================================
# 3. Continuous Batching Scheduler
# ============================================================

@dataclass
class SequenceRequest:
    """One inference request in the scheduler."""
    request_id: int
    prompt_token_ids: List[int]
    max_tokens: int
    output_token_ids: List[int] = field(default_factory=list)
    is_finished: bool = False
    
    @property
    def context_len(self) -> int:
        return len(self.prompt_token_ids) + len(self.output_token_ids)

class ContinuousBatchingScheduler:
    """vLLM-style continuous batching scheduler.
    
    Key idea: at every decode step, pick the next token for ALL active
    sequences. New sequences join when a slot frees. No batch barrier.
    """
    def __init__(self, max_batch_size: int = 32, max_seq_len: int = 32768):
        self.max_batch_size = max_batch_size
        self.max_seq_len = max_seq_len
        self.running: List[SequenceRequest] = []  # currently running
        self.waiting: List[SequenceRequest] = []  # waiting to start
        self.next_request_id = 0
    
    def add_request(self, prompt: List[int], max_tokens: int = 256) -> int:
        """Add a new inference request."""
        req = SequenceRequest(
            request_id=self.next_request_id,
            prompt_token_ids=prompt,
            max_tokens=max_tokens,
        )
        self.next_request_id += 1
        
        if len(self.running) < self.max_batch_size:
            self.running.append(req)
        else:
            self.waiting.append(req)
        
        return req.request_id
    
    def schedule(self) -> List[SequenceRequest]:
        """Return the batch to run for THIS decode step.
        
        - Drop finished sequences.
        - Promote waiting sequences to running if slots freed.
        - Return the active batch.
        """
        # 1. Drop finished
        self.running = [r for r in self.running if not r.is_finished]
        
        # 2. Promote from waiting (up to max_batch_size)
        while self.waiting and len(self.running) < self.max_batch_size:
            self.running.append(self.waiting.pop(0))
        
        # 3. Return the current batch
        return self.running
    
    def step(self, next_tokens: dict):
        """Apply the next token to each request.
        
        next_tokens: {request_id: token_id}
        """
        for req in self.running:
            if req.request_id in next_tokens:
                token = next_tokens[req.request_id]
                req.output_token_ids.append(token)
                # Check stop conditions
                if (len(req.output_token_ids) >= req.max_tokens
                    or token == 2):  # EOS
                    req.is_finished = True

# ============================================================
# 4. Single-step decode with KV cache (vLLM-style)
# ============================================================

def decode_step(model, scheduler: ContinuousBatchingScheduler,
               kv_cache: PagedKVCache, step_num: int) -> dict:
    """One continuous-batching decode step.
    
    Returns: {request_id: next_token_id}
    """
    batch = scheduler.schedule()
    if not batch:
        return {}
    
    # For each running sequence, get the last token
    input_ids = torch.tensor([[r.context_len - 1] for r in batch])
    # Actually we use the LAST token of each sequence as input
    
    # Forward pass (simplified — assumes model returns logits + new KV)
    # In vLLM: custom CUDA kernel that reads/writes paged KV directly
    next_tokens = {}
    for req in batch:
        # Real impl: forward pass with attention reading paged KV
        # Here: simulate by picking a random token
        next_tokens[req.request_id] = torch.randint(0, 32000, (1,)).item()
    
    scheduler.step(next_tokens)
    return next_tokens

# ============================================================
# 5. OpenAI-compatible API (production server)
# ============================================================

class VLLMServer:
    """vLLM-style server with OpenAI-compatible API.
    
    Endpoints:
        POST /v1/completions     — text completion
        POST /v1/chat/completions — chat format (with roles)
        POST /v1/embeddings     — embedding extraction
    
    Streaming: SSE (Server-Sent Events) for chat completions.
    """
    def __init__(self, model, max_batch_size=32):
        self.model = model
        self.scheduler = ContinuousBatchingScheduler(max_batch_size)
        self.kv_cache = PagedKVCache.create(num_blocks=1024)  # 16K tokens
    
    async def completions(self, prompt: str, max_tokens: int = 256,
                          temperature: float = 1.0, stream: bool = False):
        """OpenAI /v1/completions endpoint."""
        # Tokenise prompt
        prompt_ids = self.tokenizer.encode(prompt)
        request_id = self.scheduler.add_request(prompt_ids, max_tokens)
        
        if stream:
            # SSE stream: yield tokens as they generate
            async for token in self._stream_tokens(request_id):
                yield f"data: {token}\\n\\n"
            yield "data: [DONE]\\n\\n"
        else:
            # Wait for completion, return full text
            tokens = await self._wait_for_completion(request_id)
            return {"choices": [{"text": self.tokenizer.decode(tokens)}]}
    
    async def _stream_tokens(self, request_id: int):
        """Yield tokens as they're generated."""
        while True:
            batch = self.scheduler.schedule()
            for req in batch:
                if req.request_id == request_id and req.output_token_ids:
                    yield self.tokenizer.decode([req.output_token_ids[-1]])
                    if req.is_finished:
                        return

# Sanity check
if __name__ == "__main__":
    # KV cache math
    print("KV Cache per token (Llama-3 70B, BF16):")
    per_tok = 2 * 80 * 64 * 128 * 2  # 2 (K+V) \xd7 80 layers \xd7 64 KV heads \xd7 128 head_dim \xd7 2 bytes
    print(f"  {per_tok / 1024:.0f} KB = {per_tok / 1e6:.2f} MB")
    print(f"  32k ctx \xd7 8 users = {per_tok * 32768 * 8 / 1e9:.2f} GB")
    print(f"  Without paging: OOM on 80GB A100")
    print(f"  With PagedAttention: blocks allocated on-demand, freed when seq ends")
    
    # Scheduler test
    scheduler = ContinuousBatchingScheduler(max_batch_size=4)
    ids = [scheduler.add_request([1, 2, 3], max_tokens=10) for _ in range(6)]
    print(f"\\nScheduler: 6 requests, max_batch=4")
    print(f"  Running: {len(scheduler.running)}, Waiting: {len(scheduler.waiting)}")
    
    batch = scheduler.schedule()
    print(f"  First batch: {len(batch)} sequences")
    
    # Simulate one finishing
    batch[0].is_finished = True
    batch = scheduler.schedule()
    print(f"  After 1 finishes: Running={len(batch)}, Waiting={len(scheduler.waiting)}")
    print(f"  (one waiting request promoted to running)")`;function w(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(i.PageHeader,{eyebrow:"Inference Serving · vLLM · PagedAttention",title:"Inference Serving — PagedAttention, Continuous Batching, vLLM",description:"The math behind LLM serving: KV cache memory per token (2·L·H_kv·D·b), why contiguous allocation OOMs (32k × 8 users = 670GB), and how PagedAttention solves it via OS-style virtual memory (16-token blocks, per-seq page tables, immediate reuse). Continuous batching: iteration-level scheduler, sequences join/leave mid-step, 8-23× throughput vs HuggingFace. With low-level PyTorch implementations of KVCache, PagedKVCache, ContinuousBatchingScheduler, and a vLLM-style OpenAI-compatible server. Code-oriented, mathematical, scientific.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(d.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(x.Server,{className:"h-3 w-3"})," vLLM + PagedAttn"]}),(0,t.jsxs)(d.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(m.Zap,{className:"h-3 w-3"})," Pyodide"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:y.map(e=>(0,t.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(i.SectionCard,{title:"PagedAttention — KV cache as OS virtual memory",description:"Top: 32 GPU VRAM pages (8×4). Sequences A, B, C, D join and finish. Pages are non-contiguous — allocated on demand, freed immediately when a sequence ends. seqD reuses pages freed by seqA without any defrag. This is the OS virtual-memory trick applied to GPU memory: per-sequence page table maps logical positions to physical pages.",icon:(0,t.jsx)(b.Database,{className:"h-5 w-5"}),badge:"3D animation",children:(0,t.jsx)(_,{})}),(0,t.jsx)(i.SectionCard,{title:"KV cache math — why contiguous allocation OOMs",description:"Per-token KV cache = 2 (K+V) × layers × num_kv_heads × head_dim × bytes. For 70B Llama-3 (80 layers, 64 GQA KV heads, 128 head dim, BF16): 2.6 MB/token. For 32k context × 8 concurrent users = 670 GB — far exceeds 80GB A100. PagedAttention stores these in 16-token blocks (≈42KB each), allocated on demand from a free list.",icon:(0,t.jsx)(f.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"KV_per_token = 2 · L · H_kv · D_head · bytes  ·  Total = KV_per_token · seq_len · batch"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"For 70B Llama-3 BF16: 2·80·64·128·2 = 2.6 MB/token. 32k ctx × 8 users = 670 GB."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-rose-500/40 bg-rose-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-rose-600 dark:text-rose-400 mb-1",children:"Contiguous allocation (HF)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"Each sequence's KV must be a contiguous tensor. Allocation is per-sequence, max-length. When one sequence finishes, its slot is wasted (no reuse) until the whole batch ends. Result: OOM at moderate concurrency, padding waste."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"Paged allocation (vLLM)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"Each sequence's KV lives in 16-token blocks scattered across a flat pool. A per-sequence page table maps logical positions to physical blocks. When a sequence finishes, its blocks return to the free list for immediate reuse. No defrag, no padding, no OOM."})]})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Try it: KV cache memory math + PagedAttention (Pyodide)",description:"Computes KV per token for Llama-3 8B, 70B, GPT-4 (est). Shows the OOM arithmetic: 32k context × 8 users × 2.6MB = 670GB contiguous. Then shows how PagedAttention solves it: 16-token blocks, free list, immediate reuse. Plus the throughput math: HF 50 tok/s vs vLLM 3000 tok/s — 60× throughput.",icon:(0,t.jsx)(g.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(l.PyodideRunner,{code:v,buttonLabel:"Run KV cache math (Pyodide)"})}),(0,t.jsx)(i.SectionCard,{title:"Continuous batching — sequences join/leave mid-step",description:"Static batching (HF, Triton): the whole batch starts together, ends together — short sequences waste GPU, new requests wait for the next batch. Continuous batching (vLLM): every iteration, the scheduler picks the next token for ALL active sequences. New sequences join the moment a slot frees. No batch barrier, no padding waste.",icon:(0,t.jsx)(x.Server,{className:"h-5 w-5"}),children:(0,t.jsx)(k,{})}),(0,t.jsx)(i.SectionCard,{title:"AWQ Marlin kernels — 2× faster than dequantise-then-matmul",description:"Naive INT4 inference: dequantise weights to BF16 → matmul → 2× memory. vLLM's Marlin kernel: fuses dequantise + matmul into one CUDA kernel — INT4 weights stay 4-bit in registers, dequantised on-the-fly per tile. Connects to ADR-030: AWQ-quantised weights run at near-BF16 throughput on A100, with 4× less memory.",icon:(0,t.jsx)(u.Cpu,{className:"h-5 w-5"}),children:(0,t.jsx)(r.CodeBlock,{language:"text",filename:"marlin_kernel.txt",code:`┌────────────────────────────────────────────────────────────────────┐
│  INT4 INFERENCE: NAIVE vs MARLIN KERNEL                              │
│                                                                        │
│  Naive (dequantise-then-matmul):                                       │
│    1. Load 4-bit weights from VRAM                                     │
│    2. Dequantise to BF16 in registers (4x memory blowup)               │
│    3. Matmul: y = x @ W_bf16                                           │
│    4. Write BF16 output                                                │
│    Cost: 2\xd7 memory traffic, 2\xd7 register pressure                       │
│                                                                        │
│  Marlin kernel (vLLM, Frantar 2024):                                  │
│    1. Load 4-bit weights from VRAM (1 tile = 16\xd716 = 256 weights)     │
│    2. For each output element:                                         │
│         - Load 4-bit weight + scale                                     │
│         - Dequantise IN REGISTER (no VRAM writeback)                  │
│         - FMA: y += x * dequant                                        │
│    3. Write BF16 output                                                │
│    Cost: 1\xd7 memory traffic, 4\xd7 effective bandwidth                    │
│                                                                        │
│  RESULT:                                                              │
│    Naive:  ~1500 tok/s on A100 (memory-bound by dequant blowup)      │
│    Marlin: ~3000 tok/s on A100 (same throughput as BF16)              │
│                                                                        │
│  INSIGHT:                                                              │
│    Quantisation only wins if the kernel fuses dequant + matmul.       │
│    A naive "dequantise then call cuBLAS" is SLOWER than BF16.         │
│    Marlin is what makes AWQ actually faster.                          │
└────────────────────────────────────────────────────────────────────────┘`})}),(0,t.jsx)(i.SectionCard,{title:"Low-level PyTorch — KVCache, PagedKVCache, ContinuousBatchingScheduler, vLLM server",description:"The actual production code. KVCache is a simple per-sequence tensor with append(). PagedKVCache stores KV in a flat tensor of [num_blocks, num_kv_heads, block_size, head_dim, 2], with per-sequence block_tables (logical→physical mapping) and a free_blocks list. allocate_sequence pops from free list; free_sequence returns blocks immediately. write_kv/read_kv do the page table indirection. ContinuousBatchingScheduler runs the iteration-level loop: drop finished → promote waiting → run batch. VLLMServer wraps it in an OpenAI-compatible API with SSE streaming.",icon:(0,t.jsx)(u.Cpu,{className:"h-5 w-5"}),badge:"low-level",children:(0,t.jsx)(r.CodeBlock,{language:"python",filename:"inference_serving.py",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290],code:q})}),(0,t.jsx)(i.SectionCard,{title:"My deeper thought: LLM serving IS the OS process scheduler",description:"vLLM's PagedAttention + continuous batching is the OS process scheduler reborn in CUDA. The KV cache is virtual memory (per-sequence page table → physical blocks). The scheduler is the round-robin CPU scheduler (per-iteration time slice). The free list is the buddy allocator. The 'batch' is the runqueue. vLLM did not invent new ideas — it ported 50 years of OS research to GPUs.",icon:(0,t.jsx)(p.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:["The architectural isomorphism between vLLM and a 1970s OS kernel is exact, not metaphorical. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"PagedAttention is paged virtual memory (IBM System/370, 1972)."})," The KV cache is the process address space — per-sequence logical addresses (token positions 0..N) map to physical blocks via a per-sequence page table. The free list is the page-frame allocator. When a sequence finishes, its blocks are released to the free list — exactly how Unix releases a process's pages on exit(). Copy-on-write for beam search is how fork() shares pages until the child writes. The 16-token block size corresponds to the 4KB page size — a trade-off between allocation overhead (smaller = less internal fragmentation) and table-lookup overhead (larger = fewer page-table entries)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Continuous batching is the round-robin CPU scheduler with preemption."})," Each decode step is a time slice — the scheduler picks the next token (instruction) for every active sequence (process) in the runqueue. When a sequence emits EOS, it exits — its slot is immediately given to the next waiting sequence. There's no batch barrier, just as there's no \"process batch\" in Unix. The max_batch_size is the maximum runqueue length. The waiting queue is the wait() queue. This is why vLLM's throughput graph as a function of concurrency looks identical to Linux's throughput vs process count — both saturate at the same point (compute-bound when the GPU/CPU is busy, latency-bound when not)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"This unifies the platform's three scheduling layers:"})," Airflow/Dagster schedules data pipelines (DAG of tasks), vLLM schedules inference requests (queue of sequences), the FSDP trainer schedules gradient updates (batch of mini-batches). All three are scheduling problems on the same substrate (GPU/cluster resources). All three benefit from the same techniques: queuing theory (Little's law: throughput = concurrency / latency), backpressure (rate-limit submissions when queue grows), preemption (cancel long sequences / kill slow queries). The ADR-029 OpenTelemetry standard makes this isomorphism concrete — every Airflow task, every vLLM sequence, every FSDP step emits spans with the same shape; every trace's critical path is computed by the same algorithm. The data engineer's \"pipeline backpressure\" and the ML engineer's \"request queue depth\" are the same metric, just different labels. vLLM did to LLM serving what Linux did to time-sharing: it democratised a scarce resource by giving every request a fair time slice and a virtual address space."]})]})}),(0,t.jsxs)(h.DeeperThoughtSection,{pageTitle:"Inference Serving",children:[(0,t.jsx)(h.DeeperThought,{title:"Inference Serving IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Inference Serving is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Inference Serving connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Inference Serving sits in the computational-science landscape."})}),(0,t.jsx)(h.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Inference Serving) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(h.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(h.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(h.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(o.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"quantization-inference",reason:"Continue to quantization inference — see also from this page"},{id:"transformer",reason:"Continue to transformer — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(n.default,{href:(0,c.hrefFor)("quantization-inference"),className:"text-sm text-primary hover:underline",children:"→ Quantization (AWQ + Marlin kernel)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(n.default,{href:(0,c.hrefFor)("transformer"),className:"text-sm text-primary hover:underline",children:"→ Transformer (the model being served)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(n.default,{href:(0,c.hrefFor)("mlops-tracing"),className:"text-sm text-primary hover:underline",children:"→ MLOps & Tracing (per-token spans)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(n.default,{href:(0,c.hrefFor)("rag-llms"),className:"text-sm text-primary hover:underline",children:"→ RAG (serving the LLM that powers RAG)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(n.default,{href:(0,c.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ ADR-031 (vLLM adoption)"})]})]})}e.s(["InferenceServingPage",()=>w])}]);