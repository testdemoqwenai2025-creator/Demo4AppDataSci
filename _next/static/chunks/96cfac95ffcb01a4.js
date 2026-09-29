(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,852008,e=>{"use strict";var t=e.i(113625);e.s(["Layers",()=>t.default])},862824,515288,e=>{"use strict";var t=e.i(843476),a=e.i(975157);function s({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card",className:(0,a.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",e),...s})}function r({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-header",className:(0,a.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",e),...s})}function i({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-title",className:(0,a.cn)("leading-none font-semibold",e),...s})}function n({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-description",className:(0,a.cn)("text-muted-foreground text-sm",e),...s})}function o({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-content",className:(0,a.cn)("px-6",e),...s})}e.s(["Card",()=>s,"CardContent",()=>o,"CardDescription",()=>n,"CardHeader",()=>r,"CardTitle",()=>i],515288);var d=e.i(487486);function l({title:e,description:a,icon:l,badge:c,badgeVariant:p="outline",children:h,className:u,contentClassName:m}){return(0,t.jsxs)(s,{className:["border-border/60",u].filter(Boolean).join(" "),children:[(e||a)&&(0,t.jsxs)(r,{className:"flex flex-row items-start gap-3 space-y-0 border-b border-border/60 bg-muted/30",children:[l&&(0,t.jsx)("div",{className:"mt-0.5 text-primary",children:l}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[e&&(0,t.jsx)(i,{className:"text-base",children:e}),c&&(0,t.jsx)(d.Badge,{variant:p,className:"text-[10px]",children:c})]}),a&&(0,t.jsx)(n,{className:"mt-1 text-xs",children:a})]})]}),(0,t.jsx)(o,{className:["p-4 md:p-5",m].filter(Boolean).join(" "),children:h})]})}function c({eyebrow:e,title:a,description:s,right:r}){return(0,t.jsxs)("div",{className:"mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4",children:[(0,t.jsxs)("div",{children:[e&&(0,t.jsx)("p",{className:"text-[11px] font-semibold uppercase tracking-widest text-primary/80 mb-1.5",children:e}),(0,t.jsx)("h1",{className:"text-2xl md:text-3xl font-semibold tracking-tight text-balance",children:a}),s&&(0,t.jsx)("p",{className:"mt-2 text-sm md:text-base text-muted-foreground max-w-3xl text-pretty",children:s})]}),r&&(0,t.jsx)("div",{className:"shrink-0",children:r})]})}function p({label:e,value:a,delta:r,deltaTone:i="flat",hint:n}){return(0,t.jsx)(s,{className:"border-border/60",children:(0,t.jsxs)(o,{className:"p-4",children:[(0,t.jsx)("p",{className:"text-[11px] uppercase tracking-wider text-muted-foreground",children:e}),(0,t.jsx)("p",{className:"mt-1 text-2xl font-semibold tabular-nums",children:a}),(0,t.jsxs)("div",{className:"mt-1 flex items-center gap-2",children:[r&&(0,t.jsx)("span",{className:`text-xs ${"up"===i?"text-emerald-600 dark:text-emerald-400":"down"===i?"text-rose-600 dark:text-rose-400":"text-muted-foreground"}`,children:r}),n&&(0,t.jsx)("span",{className:"text-[11px] text-muted-foreground",children:n})]})]})})}e.s(["KpiCard",()=>p,"PageHeader",()=>c,"SectionCard",()=>l],862824)},342046,518550,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(522016),r=e.i(901752);let i=[{cardIndex:0,name:"SVD",equation:"A = UΣV^T",sciences:["genomics","audio","finance"],insightShort:"SVD IS the Fourier transform for data",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["SVD IS NumPy's universal decomposer — np.linalg.svd → PCA for genomics, audio compression, Fama-French risk factors.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:1,name:"Attention",equation:"softmax(QK^T/√d_k) × V",sciences:["protein folding","NLP"],insightShort:"Attention IS natural selection",hostPages:["transformer-deep-dive","analytics-outputs"],hostReasons:["DNA IS a language — softmax(QK^T/√d_k)×V parses both proteins (AlphaFold2) and English (GPT-4) because both are correlation detection.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:2,name:"Poisson",equation:"P(k) = λ^k e^(-λ) / k!",sciences:["sequencing","networks","decay"],insightShort:"Poisson IS the law of rare events",hostPages:["bioinformatics-pipelines","analytics-outputs"],hostReasons:["GATK variant calling depth IS Poisson(λ=mean coverage) — same distribution that sizes server clusters and radioactive sources.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:3,name:"FFT",equation:"X[k] = Σ x[n] e^(-2πikn/N)",sciences:["mass spec","audio","cryo-EM"],insightShort:"FFT IS the change of basis",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["np.fft.fft is the SAME operation whether you're finding the m/z of a compound, the C-note in a chord, or the 3D structure of a ribosome.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:4,name:"Verlet",equation:"r(t+Δt) = 2r(t) - r(t-Δt) + F/m·Δt²",sciences:["MD","games","orbits"],insightShort:"Verlet IS time-reversal symmetry",hostPages:["computational-biology","analytics-outputs"],hostReasons:["AMBER, Havok, and NASA JPL all call this exact integrator — symplectic, energy-conserving, time-reversible. The MD integrator IS the game physics integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:5,name:"Navier-Stokes",equation:"∂u/∂t + u·∇u = -∇p/ρ + ν∇²u",sciences:["weather","blood","turbulence"],insightShort:"Navier-Stokes IS the universe's flow equation",hostPages:["computational-physics","analytics-outputs"],hostReasons:["CFD on this PDE predicts hurricanes, aneurysm risk, and wing stall — the SAME nonlinearity makes weather unpredictable and turbulence beautiful.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:6,name:"Gradient Descent",equation:"θ(t+1) = θ(t) - η∇L(θ)",sciences:["ML","evolution","thermodynamics"],insightShort:"Gradient Descent IS the learning rule",hostPages:["tabular","analytics-outputs"],hostReasons:["Gradient boosting = gradient descent on trees; GPT-4 training, natural selection, and protein folding all minimise a landscape with the SAME update rule.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:7,name:"Bayes",equation:"P(H|D) = P(D|H)P(H) / P(D)",sciences:["genetics","spam","quantum"],insightShort:"Bayes IS the belief updater",hostPages:["alphamissense","analytics-outputs"],hostReasons:["AlphaMissense classifying a VUS IS Gmail classifying spam IS a Stern–Gerlach measurement — all three update P(H) given D.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:8,name:"Euler's Method",equation:"y(t+Δt) = y(t) + f(t,y)·Δt",sciences:["orbital mechanics","games","finance"],insightShort:"Euler IS the seed of all simulation",hostPages:["space-science","analytics-outputs"],hostReasons:["Satellite trajectory propagation (NASA GMAT), game-engine fixed-step physics (Unity), and Black-Scholes Monte Carlo all START from this one-line integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:9,name:"Entropy",equation:"H = -Σ p log p",sciences:["information","thermodynamics","genetics"],insightShort:"Entropy IS the universal currency of disorder",hostPages:["systems-biology","analytics-outputs"],hostReasons:["Shannon measured message information, Boltzmann gas disorder, Haldane population heterozygosity — the SAME formula because all three quantify how spread out a distribution is.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:10,name:"Black-Scholes",equation:"C = S·N(d1) − K·e^(−rT)·N(d2)",sciences:["fintech","maritime","genetics"],insightShort:"Black-Scholes IS the universal option-pricing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["A Lloyd's underwriter pricing a 90-day cargo option, a CME quant pricing an SPX call, and a Fisher geneticist pricing an allele-substitution option all evaluate the SAME formula — the right-but-not-obligation to act on a stochastic payoff.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:11,name:"Haversine",equation:"d = 2R·arcsin(√(...))",sciences:["maritime","aviation","astronomy"],insightShort:"Haversine IS the universal great-circle distance",hostPages:["global-shipping","analytics-outputs"],hostReasons:["Rotterdam→Singapore sailing distance, LHR→JFK flight distance, and Sirius→Canopus angular separation all use the SAME formula — shortest-path distance on a sphere, invented 1805 (Bowring).","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:12,name:"Kelly Criterion",equation:"f* = (bp − q)/b = μ/σ²",sciences:["fintech","genetics","RL"],insightShort:"Kelly IS the universal bet-sizing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["Ed Thorp's blackjack team (1960s), Jim Simons' Medallion Fund (1989-2024, 65% CAGR), Haldane's allele fixation (1927), and Thompson sampling (RL) all derive the SAME optimal bet size f* = μ/σ² because they all maximize expected log-growth.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:13,name:"Markov Chain",equation:"π(t+1) = π(t)·P",sciences:["genetics","fintech","maritime"],insightShort:"Markov IS the universal state-transition equation",hostPages:["global-shipping","bioinformatics","analytics-outputs"],hostReasons:["Jukes-Cantor DNA substitution (1969), Moody's credit transitions (10⁶ bonds), and AIS port-state transitions (100K vessels) all use the SAME matrix update — the memoryless property is universal.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:14,name:"Value at Risk",equation:"VaR_α = −(μ + z_α·σ)",sciences:["fintech","maritime","climate"],insightShort:"VaR IS the universal tail-risk equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["JPMorgan's 1-day 99% VaR ($4T balance, Basel III), Lloyd's 7-day 95% VaR ($50B hull, Solvency II), and NOAA 100-year flood VaR (FEMA FIRMs) all use the SAME quantile — every loss distribution has an inverse CDF.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:15,name:"PageRank",equation:"PR(p) = (1-d) + d·Σ(PR(q)/L(q))",sciences:["fintech","maritime","genetics"],insightShort:"PageRank IS the universal centrality equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["BIS systemic risk (Lehman PR ≈ 0.012), UN COMTRADE port chokepoint (Rotterdam PR ≈ 0.020), and STRING gene essentiality (TP53 PR ≈ 0.025) all use the SAME eigenvector — Brin & Page 1998 for the web, now spanning banking, trade, and genomics.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:16,name:"Kalman Filter",equation:"x̂(t+1) = x̂(t) + K·(z − H·x̂(t))",sciences:["maritime","aviation","genetics"],insightShort:"Kalman IS the universal state-estimation equation",hostPages:["global-shipping","analytics-outputs"],hostReasons:["AIS vessel tracking (100K vessels × 60s), ADS-B flight tracking (100K flights × 1s), and 1000-Genomes allele frequency tracking all use the SAME Bayesian update — Kalman 1960 invented this for Apollo navigation.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:17,name:"Monte Carlo",equation:"E[f(X)] ≈ (1/N)·Σ f(X_i)",sciences:["fintech","maritime","genetics"],insightShort:"Monte Carlo IS the universal estimation equation",hostPages:["fintech","global-shipping","monte-carlo","analytics-outputs"],hostReasons:["Option pricing (10⁶ GBM paths), port congestion (10⁵ vessel sims), and rare-variant permutation tests (10⁶ permutations) all use the SAME averaging — Metropolis 1946 invented this at Los Alamos for neutron transport.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:18,name:"Geometric Brownian Motion",equation:"dS = μS·dt + σS·dW",sciences:["fintech","maritime","genetics"],insightShort:"GBM IS the universal multiplicative-noise equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["SPX daily returns (Black-Scholes foundation), Rotterdam container dwell times, and Wright-Fisher allele drift all use the SAME SDE — multiplicative noise keeps S positive with log-normal stationarity.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:19,name:"Lloyd's Algorithm",equation:"μ_k ← mean({x : argmin_k ‖x − μ_k‖²})",sciences:["maritime","genetics","ML"],insightShort:"Lloyd IS the universal clustering equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["50K ports clustered by trade flows (UN COMTRADE), 2504 individuals clustered by SNP PCA (1000-Genomes), and 1.4M images clustered by ResNet-50 (ImageNet) all use the SAME iterate — Lloyd 1957 invented this at Bell Labs for PCM.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:20,name:"HyperLogLog",equation:"E = α_m m² (Σ 2^(-M_j))^(-1)",sciences:["data engineering","genomics","network security"],insightShort:"HLL IS the universal counter — 33M× memory compression with <1% error",hostPages:["big-data-ingestion","analytics-outputs"],hostReasons:["COUNT(DISTINCT user_id) in Snowflake/Spark, unique k-mers in Jellyfish (genome assembler), unique source IPs in Redis PFCOUNT (DDoS monitor) — all run the SAME hash→bucket→max-zeros→harmonic-mean algorithm. 12 KB vs 400 GB for exact counting.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:21,name:"Bloom Filter",equation:"P(fp) = (1 - e^(-kn/m))^k",sciences:["network security","genomics","databases"],insightShort:"Bloom filter IS the universal membership test — 23× compression with 0.1% false positives",hostPages:["kafka-connect","delta-lake","analytics-outputs"],hostReasons:["Chrome Safe Browsing (malware URL check), genome assembler read dedup, RocksDB SSTable key lookup — all use the SAME k-hash→bit-set→AND-check. 175 MB vs 4 GB for exact hash set.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:22,name:"Consistent Hashing",equation:"θ = hash(key) mod 2^256",sciences:["streaming","CDN","databases"],insightShort:"Consistent hashing IS the universal partitioner — K/n keys move, not all K",hostPages:["kafka","schema-registry","analytics-outputs"],hostReasons:["Kafka partition assignment across brokers, Akamai CDN edge routing, Cassandra shard assignment — all use the SAME hash ring. Adding a node moves 8% of data, not 50%.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:23,name:"LSM-Tree Compaction",equation:"WA = (L+1)/L",sciences:["data engineering","databases","distributed storage"],insightShort:"LSM compaction IS the universal write amplifier — 1.25× vs B-tree's 4-10×",hostPages:["delta-lake","big-data-ingestion","analytics-outputs"],hostReasons:["Delta Lake Auto Compaction (18,400→12 files), RocksDB level compaction (L0→L1→L2→L3), Cassandra size-tiered compaction — all use the SAME merge-sort. Write amplification 1.25× vs B-tree's 4-10×.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:24,name:"Count-Min Sketch",equation:"ê_i = min_j count[j][h_j(i)]",sciences:["streaming","genomics","networking"],insightShort:"CMS IS the universal frequency estimator — 4M× compression, bounded over-estimation",hostPages:["spark-streaming","flink","analytics-outputs"],hostReasons:["Spark Structured Streaming top-K, genome k-mer frequency counting (repeat detection), network heavy-hitter detection (DDoS) — all use the SAME d×w matrix. 20 KB vs 80 GB for exact hash map.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:25,name:"Reservoir Sampling",equation:"P(item_i in sample) = k/N",sciences:["streaming","A/B testing","genomics"],insightShort:"Reservoir IS the universal sampler — O(k) memory, uniform sampling from unbounded stream",hostPages:["spark-streaming","streaming-sql","analytics-outputs"],hostReasons:["Kafka stream event sampling, A/B test cohort selection from live users, GWAS variant subsampling — all use the SAME k/N replace-probability algorithm. O(k) memory regardless of stream length.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:26,name:"T-Digest",equation:"q̂(p) = merge(centroids)",sciences:["streaming","finance","observability"],insightShort:"T-Digest IS the universal quantile estimator — 80M× compression at the tails",hostPages:["spark-streaming","fintech","analytics-outputs"],hostReasons:["p99 latency in Spark, p99 VaR in Basel III Monte Carlo, p99 response time in Datadog — all use the SAME centroid-merging algorithm. 1 KB vs 80 GB for exact sorted array.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:27,name:"Cuckoo Filter",equation:"i2 = i1 XOR hash(fingerprint)",sciences:["databases","networking","caching"],insightShort:"Cuckoo Filter IS Bloom's successor — same membership test, PLUS deletion support",hostPages:["delta-lake","analytics-outputs"],hostReasons:["Cassandra SSTable with dynamic keys, routing table add/remove, Redis cache invalidation — all need membership test WITH deletion. Bloom can't delete; Cuckoo can.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:28,name:"Skip List",equation:"P(level L) = (1/2)^L",sciences:["databases","storage","compilers"],insightShort:"Skip List IS the universal ordered structure — O(log n) without tree rebalancing",hostPages:["duckdb","analytics-outputs"],hostReasons:["Redis ZSET (leaderboard), LevelDB/RocksDB memtable (sorted KV before SSTable flush), LLVM instruction scheduler — all use the SAME probabilistic linking. No rebalancing needed.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]}];function n(e){return i.filter(t=>t.hostPages.includes(e))}let o={0:[3,9,19],1:[0,6,7],2:[7,9,13],3:[0,2,8],4:[8,5,16],5:[4,18,8],6:[7,12,1],7:[6,2,16],8:[4,18,16],9:[0,2,19],10:[18,14,12],11:[15,16,17],12:[6,10,7],13:[2,16,15],14:[10,18,17],15:[13,0,11],16:[13,4,7],17:[18,14,9],18:[10,8,17],19:[0,9,6]};function d(e){return o[e]??[]}e.s(["ELEGANT_CODE_MAP",0,i,"cardsOnHostPage",()=>n,"recommendedCards",()=>d],518550);var l=e.i(487486),c=e.i(394908),p=e.i(972520);let h="discovery-path-visited";function u({relatedPages:e=[]}){let[n,o]=(0,a.useState)(()=>{try{let e=localStorage.getItem(h);return e?JSON.parse(e):[]}catch{return[]}});(0,a.useEffect)(()=>{try{let e=localStorage.getItem(h);if(e){let t=JSON.parse(e);setTimeout(()=>o(t),0)}}catch{}},[]);let u=(0,a.useMemo)(()=>{let t=[];if(n.length>0){let e={};for(let t of n)for(let a of d(t))n.includes(a)||(e[a]=(e[a]??0)+1);for(let[a,s]of Object.entries(e).sort((e,t)=>t[1]-e[1]).slice(0,3)){let e=i[Number(a)];e&&t.push({id:"elegant-code",reason:`Explore ${e.name} — recommended by ${s} of your visited cards`,isCousin:!0})}}for(let a of e){if(t.length>=3)break;t.find(e=>e.id===a.id)||t.push({...a,isCousin:!1})}return 0===t.length&&(t.push({id:"elegant-code",reason:"Start with the 20 elegant-code cards",isCousin:!1}),t.push({id:"connections",reason:"See the card → card graph",isCousin:!1}),t.push({id:"resources",reason:"Browse datasets, papers, libraries",isCousin:!1})),t.slice(0,3)},[n,e]);return 0===u.length?null:(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsxs)("p",{className:"text-xs font-semibold text-primary mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(c.Compass,{className:"h-3.5 w-3.5"}),"Next steps — where to go from here",n.length>0&&(0,t.jsxs)("span",{className:"text-[9px] text-muted-foreground ml-1",children:["(",n.length," cards explored)"]})]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:u.map((e,a)=>(0,t.jsxs)(s.default,{href:(0,r.hrefFor)(e.id),className:"text-xs text-primary hover:underline flex items-center gap-1",children:[(0,t.jsx)(p.ArrowRight,{className:"h-3 w-3"}),e.reason,e.isCousin&&(0,t.jsx)(l.Badge,{variant:"outline",className:"text-[8px] px-1 py-0 ml-1",children:"cousin"})]},a))})]})}e.s(["NextSteps",()=>u],342046)},332017,e=>{"use strict";var t=e.i(843476),a=e.i(522016),s=e.i(25652),r=e.i(810980),i=e.i(901752);function n({title:e,connectedTo:n,researchHref:o,children:d}){return(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-4 space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-start gap-2",children:[(0,t.jsx)(s.TrendingUp,{className:"h-4 w-4 text-primary mt-0.5 shrink-0"}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-foreground/90 leading-tight",children:e}),n&&(0,t.jsxs)("div",{className:"flex items-center gap-1.5 mt-1",children:[(0,t.jsx)(r.BookOpen,{className:"h-3 w-3 text-muted-foreground"}),(0,t.jsxs)(a.default,{href:o??(0,i.hrefFor)("research"),className:"text-[10px] text-muted-foreground hover:text-primary hover:underline",children:["Connected to: ",n," →"]})]})]})]}),(0,t.jsx)("div",{className:"text-xs text-muted-foreground leading-relaxed space-y-2 pl-6",children:d})]})}function o({pageTitle:e,children:a}){return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 border-b border-border/60 pb-2",children:[(0,t.jsx)(s.TrendingUp,{className:"h-5 w-5 text-primary"}),(0,t.jsxs)("h2",{className:"text-base font-bold text-foreground/90",children:["My deeper thoughts — ",e]})]}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground italic leading-relaxed",children:"These are not summaries. They are arguments — the kind of connections a reader with serious grey matter would make after living with the material for years. Each thought connects to the platform's research section (ADRs, papers, decision records) so it's traceable, not just opinionated."}),(0,t.jsx)("div",{className:"space-y-3",children:a})]})}e.s(["DeeperThought",()=>n,"DeeperThoughtSection",()=>o])},431343,63209,595468,868054,e=>{"use strict";var t=e.i(451477);e.s(["Play",()=>t.default],431343);var a=e.i(361653);e.s(["AlertCircle",()=>a.default],63209);var s=e.i(123287);e.s(["CheckCircle2",()=>s.default],595468);var r=e.i(249988);e.s(["Terminal",()=>r.default],868054)},716675,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(846932),r=e.i(88653),i=e.i(519455),n=e.i(487486),o=e.i(431343),d=e.i(531278),l=e.i(63209),c=e.i(595468),p=e.i(868054);let h=null,u="0.26.2",m=`https://cdn.jsdelivr.net/pyodide/v${u}/full/`;async function g(){return h||(h=(async()=>(await new Promise((e,t)=>{if(window.loadPyodide)return void e();let a=document.createElement("script");a.src=`${m}pyodide.js`,a.onload=()=>e(),a.onerror=()=>t(Error("Failed to load Pyodide bootstrap")),document.head.appendChild(a)}),await window.loadPyodide({indexURL:m})))())}function f({code:e,buttonLabel:h="Run in browser",preamble:m,compact:f=!1,onOutput:x,hideTextOutput:b=!1}){let[y,v]=(0,a.useState)("idle"),[_,S]=(0,a.useState)(""),[w,T]=(0,a.useState)(null),[j,k]=(0,a.useState)(null),N=(0,a.useRef)(null),P=(0,a.useCallback)(async()=>{v("loading"),T(null),S("Loading Pyodide runtime (~10MB)…\n");let t=performance.now();try{let a=await g(),s=Math.round(performance.now()-t);k(s);let r=[],i=e=>{r.push(e)};try{a.setStdout({batched:i}),a.setStderr({batched:i})}catch{try{a.setStdout(i),a.setStderr(i)}catch{}}let n=(m??"")+"\n"+e,o=[];if(/\bnumpy\b|\bnp\./.test(n)&&o.push("numpy"),/\bscipy\b|\bsp\./.test(n)&&o.push("scipy"),/\bsklearn\b|\bGradientBoosting\b|\bRandomForest\b|\btrain_test_split\b|\bKMeans\b|\bSVC\b|\bLogisticRegression\b/.test(n)&&o.push("scikit-learn"),/\bpandas\b|\bpd\./.test(n)&&o.push("pandas"),/\bpyarrow\b|\bpq\./.test(n)&&o.push("pyarrow"),o.length>0)try{await a.loadPackage(o)}catch{}v("running"),S(`Pyodide loaded in ${s}ms. Running…

`),m&&await a.runPythonAsync(m),await a.runPythonAsync(e);let d=r.join("");S(e=>e+(d||"(no output)")),v("done"),x&&x(d)}catch(t){let e=t instanceof Error?t.message:String(t);T(e),v("error"),S(t=>t+`
Error: ${e}`)}},[e,m,x]);return(0,a.useEffect)(()=>{N.current&&(N.current.scrollTop=N.current.scrollHeight)},[_]),(0,t.jsxs)("div",{className:`mt-3 ${f?"":"rounded-md border border-primary/30 bg-primary/3 p-3"}`,children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)(i.Button,{size:f?"sm":"default",variant:"running"===y||"loading"===y?"outline":"default",className:"gap-1.5",onClick:P,disabled:"loading"===y||"running"===y,children:["loading"===y||"running"===y?(0,t.jsx)(d.Loader2,{className:"h-3.5 w-3.5 animate-spin"}):"done"===y?(0,t.jsx)(c.CheckCircle2,{className:"h-3.5 w-3.5"}):"error"===y?(0,t.jsx)(l.AlertCircle,{className:"h-3.5 w-3.5"}):(0,t.jsx)(o.Play,{className:"h-3.5 w-3.5"}),h]}),!f&&(0,t.jsxs)(n.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,t.jsx)(p.Terminal,{className:"h-2.5 w-2.5"}),"Pyodide v",u]}),null!==j&&"done"===y&&(0,t.jsxs)("span",{className:"text-[10px] text-muted-foreground",children:["Runtime: ",j,"ms load + execution"]})]}),(0,t.jsx)(r.AnimatePresence,{children:("idle"!==y||_)&&!b&&(0,t.jsx)(s.motion.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-2",children:(0,t.jsx)("div",{ref:N,className:`rounded-md bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] p-2.5 text-[11px] font-mono leading-relaxed overflow-x-auto code-scroll max-h-64 overflow-y-auto ${w?"border border-rose-500/40":"border border-emerald-500/30"}`,children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap",children:_})})})})]})}e.s(["PyodideRunner",()=>f])},643531,e=>{"use strict";var t=e.i(678745);e.s(["Check",()=>t.default])},174886,e=>{"use strict";var t=e.i(991124);e.s(["Copy",()=>t.default])},122836,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(643531),r=e.i(174886),i=e.i(519455);function n({code:e,language:n="sql",filename:o,highlight:d=[]}){let[l,c]=(0,a.useState)(!1),p=e.replace(/\n$/,"").split("\n"),h=async()=>{try{await navigator.clipboard.writeText(e),c(!0),setTimeout(()=>c(!1),1500)}catch{}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-white/5",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[11px] text-white/60 font-mono",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-rose-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-amber-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-emerald-400"}),(0,t.jsx)("span",{className:"ml-2 uppercase tracking-wider",children:n}),o&&(0,t.jsxs)("span",{className:"text-white/40",children:["· ",o]})]}),(0,t.jsxs)(i.Button,{variant:"ghost",size:"sm",className:"h-6 px-2 text-[11px] text-white/70 hover:text-white hover:bg-white/10",onClick:h,"aria-label":"Copy code",children:[l?(0,t.jsx)(s.Check,{className:"h-3 w-3 mr-1"}):(0,t.jsx)(r.Copy,{className:"h-3 w-3 mr-1"}),l?"Copied":"Copy"]})]}),(0,t.jsx)("pre",{className:"code-scroll overflow-x-auto p-3 text-[12.5px] leading-relaxed font-mono",children:(0,t.jsx)("code",{children:p.map((e,a)=>{let s=a+1,r=d.includes(s);return(0,t.jsxs)("div",{className:["flex",r?"bg-primary/20 -mx-3 px-3 border-l-2 border-primary":""].join(" "),children:[(0,t.jsx)("span",{className:"select-none text-white/30 w-8 inline-block text-right pr-3 shrink-0",children:s}),(0,t.jsx)("span",{className:"whitespace-pre",children:e||" "})]},s)})})})]})}function o({children:e}){return(0,t.jsx)("code",{className:"rounded bg-muted px-1.5 py-0.5 text-[12px] font-mono text-foreground/90 border border-border/60",children:e})}e.s(["CodeBlock",()=>n,"InlineCode",()=>o])},975664,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(846932),r=e.i(522016),i=e.i(862824),n=e.i(342046),o=e.i(122836),d=e.i(716675),l=e.i(901752),c=e.i(487486),p=e.i(332017),h=e.i(21218),u=e.i(852008),m=e.i(39312),g=e.i(25652),f=e.i(868054),x=e.i(455711),b=e.i(966992),y=e.i(78094),v=e.i(581418);let _=[{label:"Span shape",value:"(trace_id, span_id, parent_id, t, dur, attrs)",hint:"OTLP wire format — 1 span = 1 unit of work",deltaTone:"flat"},{label:"Trace",value:"DAG of spans",hint:"Tree (mostly) sharing trace_id — parent_id forms edges",deltaTone:"flat"},{label:"Critical path",value:"O(V+E)",hint:"Topo sort + DP — longest path through span DAG",deltaTone:"flat"},{label:"SLO",value:"P99(trace_duration) < T",hint:"99% of traces complete within T seconds",deltaTone:"flat"}];function S(){let[e,r]=(0,a.useState)(0);(0,a.useEffect)(()=>{let e=setInterval(()=>r(e=>(e+1)%5),1200);return()=>clearInterval(e)},[]);let i=[{id:"root",parent:null,label:"root",dur:1450,x:50,y:30,level:0},{id:"ingest",parent:"root",label:"ingest",dur:200,x:150,y:100,level:1},{id:"validate",parent:"ingest",label:"validate",dur:80,x:150,y:170,level:2},{id:"train",parent:"root",label:"train",dur:1100,x:270,y:100,level:1},{id:"ddp0",parent:"train",label:"DDP-rank0",dur:950,x:220,y:170,level:2},{id:"ddp1",parent:"train",label:"DDP-rank1",dur:950,x:270,y:170,level:2},{id:"ar0",parent:"ddp0",label:"AllReduce",dur:280,x:200,y:240,level:3},{id:"ar1",parent:"ddp1",label:"AllReduce",dur:280,x:280,y:240,level:3},{id:"eval",parent:"root",label:"evaluate",dur:130,x:360,y:100,level:1},{id:"deploy",parent:"eval",label:"deploy",dur:100,x:360,y:170,level:2}],n=new Set(["root","train","ddp0","ar0"]);return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("style",{children:`
        .td-3d { perspective: 700px; }
        .td-stage { transform: rotateX(12deg); transform-style: preserve-3d; }
      `}),(0,t.jsxs)("p",{className:"text-sm font-semibold mb-3 flex items-center gap-2",children:[(0,t.jsx)(h.Activity,{className:"h-4 w-4 text-primary"}),"Trace DAG + critical path",(0,t.jsx)("span",{className:"text-[10px] font-mono text-muted-foreground ml-auto",children:["1. Spans emitted","2. Build span DAG","3. Topo sort","4. DP: longest path","5. Critical path"][e]})]}),(0,t.jsx)("div",{className:"td-3d",children:(0,t.jsx)("div",{className:"td-stage",children:(0,t.jsxs)("svg",{width:"450",height:"290",viewBox:"0 0 450 290",children:[i.filter(e=>e.parent).map(a=>{let r=i.find(e=>e.id===a.parent),o=e>=4&&n.has(a.id)&&n.has(a.parent);return(0,t.jsx)(s.motion.line,{x1:r.x+25,y1:r.y+10,x2:a.x+25,y2:a.y-10,stroke:o?"var(--primary)":"var(--border)",strokeWidth:o?2.5:1,initial:{opacity:0},animate:{opacity:e>=1?o?1:.5:0,strokeDasharray:e>=3&&o?"0":e>=1?"4 2":"0"}},`e-${a.id}`)}),i.map(a=>{let r=e>=4&&n.has(a.id);return(0,t.jsxs)(s.motion.g,{children:[(0,t.jsx)(s.motion.rect,{x:a.x,y:a.y,width:50,height:20,rx:4,fill:r?"var(--primary)":"var(--muted)",animate:{scale:0===e?0:r?1.05:1,opacity:1},transition:{duration:.4}}),(0,t.jsx)("text",{x:a.x+25,y:a.y+13,textAnchor:"middle",fontSize:9,fill:r?"var(--primary-foreground)":"var(--muted-foreground)",fontWeight:r?"bold":"normal",children:a.label}),e>=2&&(0,t.jsxs)(s.motion.text,{x:a.x+25,y:a.y+32,textAnchor:"middle",fontSize:8,fill:"var(--muted-foreground)",initial:{opacity:0},animate:{opacity:1},transition:{delay:.2},children:[a.dur,"ms"]})]},a.id)})]})})}),(0,t.jsxs)("div",{className:"grid grid-cols-2 gap-2 mt-3 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"Critical path"}),(0,t.jsxs)("p",{className:"text-muted-foreground text-[11px]",children:["root (1450) → train (1100) → ddp0 (950) → AllReduce (280) = ",(0,t.jsx)("span",{className:"font-mono font-bold",children:"1450ms total"}),". Train dominates — this is the SLI to optimise."]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"Optimisation target"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"ddp0 AllReduce is 280ms out of 950ms train (29%). Moving it off the critical path (overlap with backward) saves up to 280ms."})]})]}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground text-center mt-3",children:"Critical path = longest-duration path through span DAG. Computed via topo sort + DP: dist[v] = max(dist[u] + dur[v]) for all edges (u→v). Reveals which spans to optimise for end-to-end latency."})]})}let w=`# Distributed Tracing — span DAG, critical path, SLO (Pyodide)
# Implements: trace reconstruction, topo sort, critical path, p99 SLO check

import math, random

# ============================================================
# Span model — OTLP wire format (simplified)
# ============================================================
# span = {
#     trace_id, span_id, parent_span_id,
#     name, start_time_ns, end_time_ns,
#     attributes: {service, http.method, ml.framework, ...},
#     status: OK / ERROR
# }

# ============================================================
# Build span DAG from a list of spans
# ============================================================

def build_span_graph(spans):
    "Build adjacency list from parent->child edges."
    graph = {s["span_id"]: [] for s in spans}
    span_by_id = {s["span_id"]: s for s in spans}
    for s in spans:
        if s["parent_span_id"]:
            graph[s["parent_span_id"]].append(s["span_id"])
    return graph, span_by_id

def topo_sort(graph):
    "Kahn's algorithm: O(V+E). Returns nodes in dependency order."
    in_degree = {n: 0 for n in graph}
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1
    queue = [n for n in in_degree if in_degree[n] == 0]
    order = []
    while queue:
        u = queue.pop(0)
        order.append(u)
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    return order

def critical_path(spans):
    """
    Longest-duration path through span DAG.
    DP: dist[v] = dist[u] + dur[v] for edge (u->v).
    Track parent for path reconstruction.
    """
    graph, span_by_id = build_span_graph(spans)
    order = topo_sort(graph)
    dist = {n: 0 for n in graph}
    parent = {n: None for n in graph}
    for v in order:
        for u in graph:
            if v in graph[u]:
                # edge u -> v: relax
                if dist[u] + span_by_id[v]["duration_ms"] > dist[v]:
                    dist[v] = dist[u] + span_by_id[v]["duration_ms"]
                    parent[v] = u
    # Find max-distance node
    end_node = max(dist, key=dist.get)
    # Reconstruct path
    path = []
    n = end_node
    while n is not None:
        path.append(n)
        n = parent[n]
    path.reverse()
    return path, dist[end_node]

# ============================================================
# Demo trace: data pipeline → ML training → deploy
# ============================================================
trace_id = "abc123"
spans = [
    {"trace_id": trace_id, "span_id": "root",     "parent_span_id": None,    "name": "pipeline.root",     "duration_ms": 1450},
    {"trace_id": trace_id, "span_id": "ingest",   "parent_span_id": "root",  "name": "data.ingest",       "duration_ms": 200},
    {"trace_id": trace_id, "span_id": "validate", "parent_span_id": "ingest","name": "data.validate",     "duration_ms": 80},
    {"trace_id": trace_id, "span_id": "train",    "parent_span_id": "root",  "name": "ml.train",          "duration_ms": 1100},
    {"trace_id": trace_id, "span_id": "ddp0",     "parent_span_id": "train", "name": "ml.train.rank0",    "duration_ms": 950},
    {"trace_id": trace_id, "span_id": "ddp1",     "parent_span_id": "train", "name": "ml.train.rank1",    "duration_ms": 950},
    {"trace_id": trace_id, "span_id": "ar0",      "parent_span_id": "ddp0",  "name": "ml.allreduce.r0",   "duration_ms": 280},
    {"trace_id": trace_id, "span_id": "ar1",      "parent_span_id": "ddp1",  "name": "ml.allreduce.r1",   "duration_ms": 280},
    {"trace_id": trace_id, "span_id": "eval",     "parent_span_id": "root",  "name": "ml.evaluate",       "duration_ms": 130},
    {"trace_id": trace_id, "span_id": "deploy",   "parent_span_id": "eval",  "name": "ml.deploy",         "duration_ms": 100},
]

print("=" * 60)
print("Distributed Tracing — Critical Path Analysis")
print("=" * 60)

path, total_dur = critical_path(spans)
print(f"\\nTrace: {trace_id} ({len(spans)} spans)")
print(f"Critical path ({len(path)} spans): {' → '.join(path)}")
print(f"Critical path duration: {total_dur} ms")

# Span breakdown
print(f"\\nSpan durations:")
for s in spans:
    is_critical = s["span_id"] in path
    pct = (s["duration_ms"] / total_dur) * 100
    marker = " *" if is_critical else "  "
    print(f"  {marker}{s['name']:30s} {s['duration_ms']:5d} ms  ({pct:5.1f}% of trace)")

# ============================================================
# SLO check: 99% of traces should complete within 2000ms
# ============================================================
slo_target_ms = 2000
slo_status = "PASS" if total_dur < slo_target_ms else "FAIL"
burn_rate = total_dur / slo_target_ms
print(f"\\n{'=' * 60}")
print(f"SLO check (target: p99 < {slo_target_ms}ms)")
print(f"  This trace: {total_dur}ms → {slo_status}")
print(f"  Error budget burn rate: {burn_rate:.2f}x (1.0 = budget-neutral)")
print(f"  If burn > 1.0 sustained: SLO violated → page SRE")

# ============================================================
# Percentile simulation — multiple traces
# ============================================================
print(f"\\n{'=' * 60}")
print(f"Trace duration distribution (1000 simulated traces):")
random.seed(42)
durations = []
for _ in range(1000):
    # Random trace: pick a critical path length with some noise
    base = 1450
    noise = random.gauss(0, 200)  # +/- 200ms variation
    # Occasionally a slow trace (AllReduce takes longer)
    if random.random() < 0.05:
        noise += 800  # 5% of traces have +800ms (network blip)
    durations.append(max(500, base + noise))

durations.sort()
p50 = durations[500]
p95 = durations[950]
p99 = durations[990]
p999 = durations[999]

print(f"  p50:  {p50:.0f} ms")
print(f"  p95:  {p95:.0f} ms")
print(f"  p99:  {p99:.0f} ms  ← SLO threshold (target: <2000ms)")
print(f"  p999: {p999:.0f} ms  ← alert threshold")
print(f"\\n  SLO: {p99:.0f} < 2000 = {'PASS' if p99 < 2000 else 'FAIL'}")
print(f"  Burn rate: {p99 / 2000:.2f}x")

print(f"\\n{'=' * 60}")
print("KEY MATH:")
print("  - Critical path = longest path in span DAG")
print("  - Computed via Kahn's topo sort + DP relaxation: O(V+E)")
print("  - SLO: P99(trace_duration) < T  → 99% of traces complete within T")
print("  - Burn rate = observed_p99 / target  → >1.0 = SLO violation")
print("  - Error budget: (1 - 1/SLO_target) of requests can fail per quarter")
print("=" * 60)`,T=`┌─────────────────────────────────────────────────────────────────────┐
│  OPENTELEMETRY (OTLP) WIRE PROTOCOL                                      │
│                                                                            │
│  Span (one unit of work):                                                 │
│  ┌──────────────────────────────────────────────────────────────┐         │
│  │ trace_id      : 16 bytes (W3C Trace Context)                  │         │
│  │ span_id       : 8 bytes                                       │         │
│  │ parent_span_id: 8 bytes (or empty for root)                  │         │
│  │ name          : string (e.g. "ml.train.step")                │         │
│  │ start_time    : uint64 nanoseconds since epoch               │         │
│  │ end_time      : uint64 nanoseconds                           │         │
│  │ duration      : end - start (derived)                        │         │
│  │ status        : OK / ERROR / UNSET                            │         │
│  │ attributes    : map<string, Value>                            │         │
│  │   service.name      = "training-worker"                       │         │
│  │   ml.framework      = "pytorch"                               │         │
│  │   ml.model_id       = "llama-7b-lora-v3"                      │         │
│  │   ml.world_size     = 8                                       │         │
│  │   gpus.rank          = 0                                      │         │
│  │   ml.train.step      = 1234                                   │         │
│  │   ml.train.loss      = 0.4532                                 │         │
│  │   ml.allreduce_bytes = 573_000_000                            │         │
│  │ events        : [{name, ts, attrs}, ...]                      │         │
│  │ links         : [other_span_ids related]                      │         │
│  └──────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  Trace (DAG of spans sharing trace_id):                                   │
│  ┌──────────────────────────────────────────────────────────────┐         │
│  │ trace_id: 16 bytes shared by all spans in a trace             │         │
│  │ Spans form a tree (mostly) via parent_span_id edges           │         │
│  │ Distributed across services — propagated via W3C headers     │         │
│  └──────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  Propagation (HTTP/gRPC):                                                 │
│    traceparent: 00-<trace_id>-<span_id>-<flags>                          │
│    Example: traceparent: 00-0af7651916cd43dd8448eb211c80319c-b7ad...-01│
│                                                                            │
│  Collector pipeline:                                                      │
│    [SDK] → OTLP/gRPC → [Collector] → processors → [Exporters]            │
│                            ├── sampling                                    │
│                            ├── batch (10s / 1024 spans)                   │
│                            ├── tail-based sampling (errors + p99)          │
│                            └── attribute enrichment (add k8s.pod)         │
│                                                                            │
│  Exporters:                                                               │
│    traces  → Tempo (Grafana) / Jaeger / Datadog                            │
│    metrics → Mimir / Prometheus / InfluxDB                                 │
│    logs    → Loki / Elasticsearch / Splunk                                  │
└─────────────────────────────────────────────────────────────────────────────┘`,j=`import os
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.resources import Resource, SERVICE_NAME
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.trace import Status, StatusCode
import contextlib
import time

# ============================================================
# 1. Initialise OpenTelemetry — once per process
# ============================================================

def setup_telemetry(service_name: str, otlp_endpoint: str = "http://otel-collector:4317"):
    """Configure the OTel SDK to emit spans to a collector.
    
    Wire format: OTLP over gRPC (also supports HTTP).
    Sampling: 10% in production, 100% in staging (env var).
    """
    # Resource identifies this service — every span carries it
    resource = Resource.create({
        SERVICE_NAME: service_name,
        # Kubernetes metadata (auto-detected via env vars)
        "k8s.pod.name": os.environ.get("POD_NAME", "unknown"),
        "k8s.namespace": os.environ.get("POD_NAMESPACE", "default"),
        # Custom attributes for ML context
        "service.version": os.environ.get("IMAGE_TAG", "latest"),
    })
    
    provider = TracerProvider(resource=resource)
    
    # OTLP exporter — sends spans to the collector
    exporter = OTLPSpanExporter(endpoint=otlp_endpoint, insecure=True)
    
    # Batch processor — buffers spans, flushes every 5s or 1024 spans
    processor = BatchSpanProcessor(
        exporter,
        max_queue_size=8192,
        schedule_delay_millis=5000,
        max_export_batch_size=512,
    )
    provider.add_span_processor(processor)
    
    # Set as global tracer provider — every tracer shares it
    trace.set_tracer_provider(provider)
    return trace.get_tracer(service_name)

# ============================================================
# 2. Manual span creation — explicit instrumentation
# ============================================================

tracer = setup_telemetry("training-worker")

def train_step(model, batch, optimizer, step_num):
    """One training step, fully traced.
    
    Creates a parent span (train.step) and child spans for forward,
    backward, optimizer.step, and the AllReduce if DDP/FSDP.
    """
    # context manager: span starts on __enter__, ends on __exit__
    with tracer.start_as_current_span(
        "ml.train.step",
        attributes={
            "ml.framework": "pytorch",
            "ml.train.step": step_num,
            "ml.world_size": dist.get_world_size() if dist.is_initialized() else 1,
            "gpus.rank": dist.get_rank() if dist.is_initialized() else 0,
            "ml.batch_size": batch[0].shape[0],
        },
    ) as step_span:
        t0 = time.perf_counter()
        
        # Child span: forward
        with tracer.start_as_current_span("ml.train.forward") as fwd_span:
            loss = model(batch)
            fwd_span.set_attribute("ml.train.loss", float(loss.item()))
            fwd_span.set_attribute("ml.train.seq_len", batch[0].shape[1])
        
        # Child span: backward
        with tracer.start_as_current_span("ml.train.backward"):
            loss.backward()
            # DDP AllReduce happens INSIDE backward (DDP hooks fire on .grad access)
            # This makes the AllReduce visible as part of the backward span.
        
        # Child span: optimizer step
        with tracer.start_as_current_span("ml.train.optimizer_step"):
            optimizer.step()
            optimizer.zero_grad()
        
        # Record the loss as a span event (timestamped log entry)
        step_span.add_event(
            name="step_complete",
            attributes={
                "ml.train.loss": float(loss.item()),
                "ml.train.lr": optimizer.param_groups[0]["lr"],
                "duration_ms": (time.perf_counter() - t0) * 1000,
            },
        )
        
        # Mark errors (exceptions auto-record via __exit__ but we can be explicit)
        if torch.isnan(loss):
            step_span.set_status(Status(StatusCode.ERROR, "NaN loss detected"))
            step_span.set_attribute("error.type", "nan_loss")

# ============================================================
# 3. Custom AllReduce span (for distributed training)
# ============================================================

@contextlib.contextmanager
def trace_allreduce(tensor_size_bytes: int):
    """Manually wrap NCCL AllReduce in a span.
    
    Default DDP doesn't expose AllReduce as a span — we add it
    by hooking into torch.distributed's _allreduce_base.
    """
    rank = dist.get_rank() if dist.is_initialized() else 0
    with tracer.start_as_current_span(
        "ml.allreduce",
        attributes={
            "gpus.rank": rank,
            "ml.allreduce.bytes": tensor_size_bytes,
            "ml.allreduce.world_size": dist.get_world_size() if dist.is_initialized() else 1,
        },
    ) as ar_span:
        t0 = time.perf_counter()
        yield
        duration_ms = (time.perf_counter() - t0) * 1000
        # Compute achieved bandwidth (algebraic, like the distributed-training page)
        achieved_gbps = (tensor_size_bytes * 2) / (duration_ms / 1000) / 1e9  # 2x for send+recv
        ar_span.set_attribute("ml.allreduce.duration_ms", duration_ms)
        ar_span.set_attribute("ml.allreduce.achieved_gbps", achieved_gbps)

# ============================================================
# 4. Context propagation across services
# ============================================================

def call_data_pipeline(dataset_id: str):
    """HTTP call to the data pipeline service.
    
    Propagates the current trace context via W3C Trace Context headers.
    The downstream service will create child spans under this trace.
    """
    import requests
    from opentelemetry.propagate import inject
    
    headers = {"Content-Type": "application/json"}
    # inject() adds traceparent + tracestate headers from the current context
    inject(headers)
    
    # The data pipeline receives the headers, extracts the context,
    # and any spans it creates become children of THIS service's span.
    with tracer.start_as_current_span("http.client.data_pipeline") as http_span:
        http_span.set_attribute("http.method", "POST")
        http_span.set_attribute("http.url", f"http://data-pipeline/api/v1/datasets/{dataset_id}")
        response = requests.post(
            f"http://data-pipeline/api/v1/datasets/{dataset_id}",
            headers=headers,
            json={"action": "validate"},
        )
        http_span.set_attribute("http.status_code", response.status_code)
        if response.status_code != 200:
            http_span.set_status(Status(StatusCode.ERROR, f"HTTP {response.status_code}"))

# ============================================================
# 5. Critical path computation (post-hoc analysis on stored traces)
# ============================================================

import networkx as nx
from collections import deque

def compute_critical_path(spans: list[dict]) -> tuple[list[str], float]:
    """
    Critical path = longest-duration path through span DAG.
    
    Args:
        spans: list of {span_id, parent_span_id, duration_ms}
    
    Returns:
        (path of span_ids, total_duration_ms)
    
    Algorithm: O(V+E) via Kahn's topo sort + DP relaxation.
    """
    # Build graph
    span_by_id = {s["span_id"]: s for s in spans}
    children = {s["span_id"]: [] for s in spans}
    in_degree = {s["span_id"]: 0 for s in spans}
    for s in spans:
        if s["parent_span_id"] and s["parent_span_id"] in span_by_id:
            children[s["parent_span_id"]].append(s["span_id"])
            in_degree[s["span_id"]] += 1
    
    # Topo sort (Kahn)
    queue = deque([n for n in in_degree if in_degree[n] == 0])
    topo = []
    while queue:
        u = queue.popleft()
        topo.append(u)
        for v in children[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    # DP: dist[v] = max(dist[u] + dur[v]) over parents
    dist = {n: 0.0 for n in span_by_id}
    parent = {n: None for n in span_by_id}
    for v in topo:
        for u in span_by_id:
            if v in children.get(u, []):
                candidate = dist[u] + span_by_id[v]["duration_ms"]
                if candidate > dist[v]:
                    dist[v] = candidate
                    parent[v] = u
    
    # Find max-distance node
    end_node = max(dist, key=dist.get)
    
    # Reconstruct path
    path = []
    n = end_node
    while n is not None:
        path.append(n)
        n = parent[n]
    path.reverse()
    return path, dist[end_node]

# ============================================================
# 6. SLO computation (error budget, burn rate)
# ============================================================

def slo_status(observed_p99_ms: float, target_p99_ms: float = 2000) -> dict:
    """
    Compute SLO burn rate and error budget.
    
    SLO: 99% of traces complete within target_p99_ms.
    Burn rate > 1.0 means we're consuming error budget faster than allowed.
    """
    # Burn rate = observed / target
    burn_rate = observed_p99_ms / target_p99_ms
    # Error budget = (1 - SLO_target) = 1% of traces can be slow
    # If burn_rate > 1, we're losing budget faster than it's replenished
    # At burn_rate 2.0, we exhaust a quarter's budget in 1.5 months
    return {
        "observed_p99_ms": observed_p99_ms,
        "target_p99_ms": target_p99_ms,
        "burn_rate": burn_rate,
        "status": "PASS" if burn_rate < 1.0 else "FAIL",
        "alert_threshold": burn_rate > 2.0,  # page SRE if > 2x for 1h
    }

# Sanity check
if __name__ == "__main__":
    # Test the critical path
    spans = [
        {"span_id": "root",     "parent_span_id": None,    "duration_ms": 1450},
        {"span_id": "ingest",   "parent_span_id": "root",  "duration_ms": 200},
        {"span_id": "validate", "parent_span_id": "ingest","duration_ms": 80},
        {"span_id": "train",    "parent_span_id": "root",  "duration_ms": 1100},
        {"span_id": "ddp0",     "parent_span_id": "train", "duration_ms": 950},
        {"span_id": "ar0",      "parent_span_id": "ddp0",  "duration_ms": 280},
        {"span_id": "eval",     "parent_span_id": "root",  "duration_ms": 130},
    ]
    path, total = compute_critical_path(spans)
    print(f"Critical path: {' -> '.join(path)}")
    print(f"Total duration: {total} ms")
    print(f"SLO check: {slo_status(total)}")`;function k(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(i.PageHeader,{eyebrow:"MLOps · OpenTelemetry · distributed tracing",title:"MLOps & Tracing — Unified Observability for Data + ML",description:"The math behind distributed tracing: span DAGs (each span = (trace_id, span_id, parent_id, t, dur, attrs)), critical-path computation via Kahn's topo sort + DP relaxation (O(V+E)), SLO math (P99 < target, error budget, burn rate). With low-level PyTorch code showing OpenTelemetry instrumentation for ML training (manual spans for forward/backward/AllReduce), W3C Trace Context propagation across services, and the post-hoc critical-path + SLO analysis. Code-oriented, mathematical, scientific.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(h.Activity,{className:"h-3 w-3"})," OTel + spans"]}),(0,t.jsxs)(c.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(m.Zap,{className:"h-3 w-3"})," Pyodide"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:_.map(e=>(0,t.jsx)(i.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(i.SectionCard,{title:"Trace DAG with critical path — animated",description:"A trace is a DAG of spans sharing trace_id, with parent_id forming edges. The critical path is the longest-duration path through this DAG — it identifies which spans dominate end-to-end latency. Animation phases: (1) spans emitted, (2) build DAG via parent_id edges, (3) Kahn's topo sort, (4) DP relaxation dist[v]=max(dist[u]+dur[v]), (5) reconstruct longest path.",icon:(0,t.jsx)(h.Activity,{className:"h-5 w-5"}),badge:"3D animation",children:(0,t.jsx)(S,{})}),(0,t.jsx)(i.SectionCard,{title:"The OTLP wire format — what a span actually contains",description:"OpenTelemetry Protocol (OTLP) is the CNCF standard wire format. A span is a typed record: trace_id (16B W3C), span_id (8B), parent_span_id (8B), start/end times in nanoseconds, status (OK/ERROR/UNSET), attributes (semantic conventions), events (timestamped logs), links (related spans). Traces propagate via W3C traceparent HTTP/gRPC header.",icon:(0,t.jsx)(y.Network,{className:"h-5 w-5"}),children:(0,t.jsx)(o.CodeBlock,{language:"text",filename:"otlp_protocol.txt",code:T})}),(0,t.jsx)(i.SectionCard,{title:"Critical path — the longest-duration path through the span DAG",description:"Given a trace (DAG of spans), the critical path is the longest-duration path. It reveals which spans dominate end-to-end latency. Computed in O(V+E) via Kahn's topological sort + DP relaxation. The dist[] table tracks the longest distance to each node; reconstruct by walking parents backward.",icon:(0,t.jsx)(x.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsxs)("p",{className:"font-mono text-sm text-primary",children:["dist[v] = max",(0,t.jsx)("sub",{children:"u: (u→v) ∈ E"}),"(dist[u] + dur[v])"]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"DP relaxation: for each edge u→v in topo order, relax v's distance with u's distance + v's duration. O(V+E)."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"Algorithm (Kahn + DP):"}),(0,t.jsxs)("ol",{className:"text-xs space-y-1 ml-3 list-decimal",children:[(0,t.jsx)("li",{children:"Build adjacency list from parent_id edges"}),(0,t.jsx)("li",{children:"Compute in-degree[v] for each node v"}),(0,t.jsx)("li",{children:"Initialise queue with nodes where in_degree = 0 (roots)"}),(0,t.jsx)("li",{children:"Pop u from queue; append to topo order; decrement in_degree of u's children; enqueue any that hit 0"}),(0,t.jsx)("li",{children:"For each v in topo order, relax: dist[v] = max over parents of (dist[parent] + dur[v])"}),(0,t.jsx)("li",{children:"end_node = argmax(dist); walk parents backward to reconstruct path"})]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2",children:"Kahn's algorithm is O(V+E) — same complexity as BFS/DFS. For a 1000-span trace, this is microseconds — feasible to compute on every query."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"Why this matters for ML:"}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground",children:"In a distributed training step (DDP), the critical path usually goes: train → backward → AllReduce. The AllReduce is on the critical path because it's synchronous — every GPU waits for it. Overlapping backward with AllReduce (using torch.cuda.Stream) moves AllReduce off the critical path, saving up to 30% per step. Critical-path analysis is how this is measured in production."})]})]})}),(0,t.jsx)(i.SectionCard,{title:"SLO math — percentiles, error budgets, burn rate",description:"Service Level Objective (SLO): 99% of traces complete within T ms. The 1% slack is the error budget. Burn rate = observed_p99 / target — if >1.0, we're consuming budget faster than replenished, alerting threshold is typically 2× for 1 hour.",icon:(0,t.jsx)(v.ShieldCheck,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsxs)("p",{className:"font-mono text-sm text-primary",children:["SLO: P",(0,t.jsx)("sub",{children:"99"}),"(trace_duration) < T   ·   Burn = observed_p99 / T"]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"P99 = 99th percentile of trace durations. Error budget = (1 - 0.99) × total_traces per quarter."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"Burn < 1.0"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"Healthy. Error budget replenishes faster than consumed. No alerts."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-amber-600 dark:text-amber-400 mb-1",children:"1.0 ≤ Burn < 2.0"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"At-risk. Slack notification. Trending toward violation if sustained."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-rose-500/40 bg-rose-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-rose-600 dark:text-rose-400 mb-1",children:"Burn ≥ 2.0 (1h)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px]",children:"Page SRE. Error budget being consumed 2× faster than allowed. Action required."})]})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"Error budget arithmetic:"}),(0,t.jsx)("p",{className:"font-mono text-xs ml-2",children:"Quarter budget = (1 - 0.99) × total_traces = 0.01 × N"}),(0,t.jsx)("p",{className:"font-mono text-xs ml-2",children:"Burn rate × time → budget consumed = burn × elapsed_time"}),(0,t.jsx)("p",{className:"font-mono text-xs ml-2",children:"At burn = 2.0 for 1 hour → 2 × 1/2160 of quarter budget consumed (quarter = 2160h)"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2",children:"If budget consumed > 100% before quarter-end → SLO violation → freeze feature releases (Google SRE practice)."})]})]})}),(0,t.jsx)(i.SectionCard,{title:"Try it: Critical path + SLO analysis on a real trace (Pyodide)",description:"Builds a span DAG for a data-pipeline + ML-training + deploy trace. Computes the critical path via Kahn's topo sort + DP relaxation. Reports per-span duration as % of trace. Simulates 1000 traces to compute p50/p95/p99/p999 and checks the SLO. Shows burn-rate computation.",icon:(0,t.jsx)(f.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(d.PyodideRunner,{code:w,buttonLabel:"Run trace analysis (Pyodide)"})}),(0,t.jsx)(i.SectionCard,{title:"Low-level PyTorch + OpenTelemetry — manual spans, propagation, critical path, SLO",description:"The actual production code. setup_telemetry() configures the OTel SDK with a Resource (service.name + k8s metadata), OTLPSpanExporter to the collector, BatchSpanProcessor (5s/1024 spans flush). train_step() shows manual span creation with attributes (ml.framework, ml.world_size, gpus.rank, ml.train.loss). trace_allreduce() wraps NCCL AllReduce in a span with bandwidth computation. call_data_pipeline() shows W3C Trace Context propagation via inject(). compute_critical_path() implements Kahn's topo sort + DP. slo_status() computes burn rate.",icon:(0,t.jsx)(b.Cpu,{className:"h-5 w-5"}),badge:"low-level",children:(0,t.jsx)(o.CodeBlock,{language:"python",filename:"mlops_tracing.py",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301],code:j})}),(0,t.jsx)(i.SectionCard,{title:"The unified observability stack — data + ML under one trace store",description:"Before ADR-029: dual stacks (OpenLineage for data, MLflow for ML). After: one OTel pipeline — every service emits spans, the collector samples + batches + enriches, then exports to Tempo (traces), Loki (logs), Mimir (metrics). Grafana queries all three. The model-monitoring page can now trace a degradation back to the specific training run that produced the model, then to the pipeline that produced the training data.",icon:(0,t.jsx)(u.Layers,{className:"h-5 w-5"}),children:(0,t.jsx)(o.CodeBlock,{language:"text",filename:"observability_arch.txt",code:`┌──────────────────────────────────────────────────────────────────────┐
│  UNIFIED OBSERVABILITY STACK (post ADR-029)                              │
│                                                                            │
│  PRODUCERS (each emits OTel spans):                                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│  │ Airflow / Dagster│  │ Spark / DuckDB   │  │ PyTorch (DDP/FSDP)│       │
│  │ (data pipelines) │  │ (data processing)│  │ (training)       │       │
│  │ OTel auto-instr  │  │ OTel native SDK  │  │ manual spans      │       │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│  │ /api/agent-triage│  │ Model serving    │  │ GenAI pipelines  │       │
│  │ (ISR Stage 3)    │  │ (Triton/PyTorch) │  │ (RAG, diffusion) │       │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘       │
│         │                  │                      │                       │
│         └──── OTLP/gRPC ──┴──────────────────────┘                      │
│                              │                                            │
│                              ▼                                            │
│                  ┌───────────────────────┐                                │
│                  │  OTel Collector        │                                │
│                  │  - receive OTLP       │                                │
│                  │  - batch (5s/1024)     │                                │
│                  │  - tail sampling       │                                │
│                  │    (errors + p99)      │                                │
│                  │  - k8s enrichment      │                                │
│                  └───────────────────────┘                                │
│                              │                                            │
│                              ▼                                            │
│         ┌────────────────────┼────────────────────┐                       │
│         ▼                    ▼                    ▼                       │
│  ┌────────────┐      ┌────────────┐      ┌────────────┐                  │
│  │   Tempo     │      │   Loki     │      │   Mimir    │                  │
│  │   (traces)  │      │   (logs)   │      │  (metrics) │                  │
│  │  30-day ret │      │ 14-day ret │      │ 90-day ret │                  │
│  └────────────┘      └────────────┘      └────────────┘                  │
│         │                    │                    │                       │
│         └────────────────────┼────────────────────┘                      │
│                              │                                            │
│                              ▼                                            │
│                    ┌────────────────┐                                    │
│                    │     Grafana     │                                    │
│                    │  - TraceQL      │                                    │
│                    │  - LogQL        │                                    │
│                    │  - PromQL       │                                    │
│                    │  - Critical path│                                    │
│                    │    plugin       │                                    │
│                    └────────────────┘                                    │
│                                                                            │
│  CORRELATION (the unification value):                                    │
│    model degrades → find training trace → find data pipeline trace        │
│    → find upstream dataset → identify drift source                        │
│                                                                            │
│  ALL OSS — no vendor lock-in (Tempo/Loki/Mimir/Grafana)                  │
└────────────────────────────────────────────────────────────────────────────┘`})}),(0,t.jsx)(i.SectionCard,{title:"My deeper thought: traces ARE distributed backpropagation",description:"The structure of a trace (DAG of causal dependencies) is mathematically identical to the computational graph in PyTorch autograd. Critical-path analysis is the dual of backward propagation — both compute the longest path through a DAG, just for different reasons (latency vs gradient).",icon:(0,t.jsx)(g.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:["The structural isomorphism between an OpenTelemetry trace and a PyTorch computational graph is exact, not metaphorical. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"Both are DAGs of typed operations with parent-child edges."}),' A trace\'s spans correspond to autograd\'s nodes; parent_span_id corresponds to the gradient-input edges in autograd. The critical-path algorithm (Kahn topo sort + DP) is the same algorithm used to determine operation ordering in Just-In-Time compilers (TorchDynamo, XLA). The dist[] table that tracks "longest path to this node" in critical-path analysis is the same DP table that tracks "gradient w.r.t. this node" in chain-rule backpropagation. The recurrence dist[v] = max(dist[u] + dur[v]) is the "max" version of autograd\'s grad[v] = Σ(grad[u] · ∂v/∂u) — both propagate information backward through a DAG.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"This unification explains why distributed tracing and distributed training hit the same fundamental trade-offs."}),' The DDP AllReduce is on the critical path of a training trace because it\'s a synchronous barrier — every GPU waits. The analogous operation in autograd is the gradient accumulation across branches of the DAG — every consumer waits for every producer. The "overlap AllReduce with backward" optimisation (use a separate CUDA stream) is the same idea as "fused operations in autograd" (use a custom kernel) — both move work off the critical path. The roofline model (compute-bound vs comm-bound, see the comp-sci page) is the same model whether applied to GPU throughput or trace latency. The mathematics of "where is the bottleneck" is invariant to the substrate.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"This connects ADR-029 (OpenTelemetry) to ADR-028 (FSDP) to ADR-019 (bandit) to ADR-027 (diffusion)."}),' The bandit is a 1-step decision process — a 1-span trace. The LLM generation is a T-step autoregressive process — a chain of T spans. The diffusion reverse process is a T-step stochastic process — a chain of T spans (one per denoising step). The FSDP training loop is an N-step iterative process with per-step sub-traces (forward → AllReduce → backward → optimiser). All four are temporal DAGs, and OpenTelemetry gives a single language to describe all of them. When the model-monitoring page reports "drift detected on model X trained at T", the trace_id from T is the key that joins ML telemetry back to data telemetry back to the pipeline that produced the data. The platform\'s three loops — data engineering loop, ML training loop, model monitoring loop — become one continuous observability loop. The deeper insight: observability is to operations what autograd is to learning — both make DAGs debuggable by computing their duals.']})]})}),(0,t.jsxs)(p.DeeperThoughtSection,{pageTitle:"MLOps & Tracing",children:[(0,t.jsx)(p.DeeperThought,{title:"MLOps & Tracing IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about MLOps & Tracing is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. MLOps & Tracing connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where MLOps & Tracing sits in the computational-science landscape."})}),(0,t.jsx)(p.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (MLOps & Tracing) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(p.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(p.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(p.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(n.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"distributed-training",reason:"Continue to distributed training — see also from this page"},{id:"model-monitoring",reason:"Continue to model monitoring — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(r.default,{href:(0,l.hrefFor)("distributed-training"),className:"text-sm text-primary hover:underline",children:"→ Distributed Training (FSDP — what we trace)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,l.hrefFor)("model-monitoring"),className:"text-sm text-primary hover:underline",children:"→ Model Monitoring (the trigger for trace investigation)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,l.hrefFor)("governance"),className:"text-sm text-primary hover:underline",children:"→ Governance (OpenLineage → OTel bridge)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,l.hrefFor)("dashboard"),className:"text-sm text-primary hover:underline",children:"→ Live Dashboard (where traces surface)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(r.default,{href:(0,l.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ ADR-029 (OpenTelemetry adoption)"})]})]})}e.s(["MlopsTracingPage",()=>k])}]);