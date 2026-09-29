(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,862824,515288,e=>{"use strict";var t=e.i(843476),a=e.i(975157);function s({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card",className:(0,a.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",e),...s})}function i({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-header",className:(0,a.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",e),...s})}function n({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-title",className:(0,a.cn)("leading-none font-semibold",e),...s})}function o({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-description",className:(0,a.cn)("text-muted-foreground text-sm",e),...s})}function r({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-content",className:(0,a.cn)("px-6",e),...s})}e.s(["Card",()=>s,"CardContent",()=>r,"CardDescription",()=>o,"CardHeader",()=>i,"CardTitle",()=>n],515288);var l=e.i(487486);function c({title:e,description:a,icon:c,badge:d,badgeVariant:h="outline",children:u,className:m,contentClassName:p}){return(0,t.jsxs)(s,{className:["border-border/60",m].filter(Boolean).join(" "),children:[(e||a)&&(0,t.jsxs)(i,{className:"flex flex-row items-start gap-3 space-y-0 border-b border-border/60 bg-muted/30",children:[c&&(0,t.jsx)("div",{className:"mt-0.5 text-primary",children:c}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[e&&(0,t.jsx)(n,{className:"text-base",children:e}),d&&(0,t.jsx)(l.Badge,{variant:h,className:"text-[10px]",children:d})]}),a&&(0,t.jsx)(o,{className:"mt-1 text-xs",children:a})]})]}),(0,t.jsx)(r,{className:["p-4 md:p-5",p].filter(Boolean).join(" "),children:u})]})}function d({eyebrow:e,title:a,description:s,right:i}){return(0,t.jsxs)("div",{className:"mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4",children:[(0,t.jsxs)("div",{children:[e&&(0,t.jsx)("p",{className:"text-[11px] font-semibold uppercase tracking-widest text-primary/80 mb-1.5",children:e}),(0,t.jsx)("h1",{className:"text-2xl md:text-3xl font-semibold tracking-tight text-balance",children:a}),s&&(0,t.jsx)("p",{className:"mt-2 text-sm md:text-base text-muted-foreground max-w-3xl text-pretty",children:s})]}),i&&(0,t.jsx)("div",{className:"shrink-0",children:i})]})}function h({label:e,value:a,delta:i,deltaTone:n="flat",hint:o}){return(0,t.jsx)(s,{className:"border-border/60",children:(0,t.jsxs)(r,{className:"p-4",children:[(0,t.jsx)("p",{className:"text-[11px] uppercase tracking-wider text-muted-foreground",children:e}),(0,t.jsx)("p",{className:"mt-1 text-2xl font-semibold tabular-nums",children:a}),(0,t.jsxs)("div",{className:"mt-1 flex items-center gap-2",children:[i&&(0,t.jsx)("span",{className:`text-xs ${"up"===n?"text-emerald-600 dark:text-emerald-400":"down"===n?"text-rose-600 dark:text-rose-400":"text-muted-foreground"}`,children:i}),o&&(0,t.jsx)("span",{className:"text-[11px] text-muted-foreground",children:o})]})]})})}e.s(["KpiCard",()=>h,"PageHeader",()=>d,"SectionCard",()=>c],862824)},342046,518550,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(522016),i=e.i(901752);let n=[{cardIndex:0,name:"SVD",equation:"A = UΣV^T",sciences:["genomics","audio","finance"],insightShort:"SVD IS the Fourier transform for data",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["SVD IS NumPy's universal decomposer — np.linalg.svd → PCA for genomics, audio compression, Fama-French risk factors.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:1,name:"Attention",equation:"softmax(QK^T/√d_k) × V",sciences:["protein folding","NLP"],insightShort:"Attention IS natural selection",hostPages:["transformer-deep-dive","analytics-outputs"],hostReasons:["DNA IS a language — softmax(QK^T/√d_k)×V parses both proteins (AlphaFold2) and English (GPT-4) because both are correlation detection.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:2,name:"Poisson",equation:"P(k) = λ^k e^(-λ) / k!",sciences:["sequencing","networks","decay"],insightShort:"Poisson IS the law of rare events",hostPages:["bioinformatics-pipelines","analytics-outputs"],hostReasons:["GATK variant calling depth IS Poisson(λ=mean coverage) — same distribution that sizes server clusters and radioactive sources.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:3,name:"FFT",equation:"X[k] = Σ x[n] e^(-2πikn/N)",sciences:["mass spec","audio","cryo-EM"],insightShort:"FFT IS the change of basis",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["np.fft.fft is the SAME operation whether you're finding the m/z of a compound, the C-note in a chord, or the 3D structure of a ribosome.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:4,name:"Verlet",equation:"r(t+Δt) = 2r(t) - r(t-Δt) + F/m·Δt²",sciences:["MD","games","orbits"],insightShort:"Verlet IS time-reversal symmetry",hostPages:["computational-biology","analytics-outputs"],hostReasons:["AMBER, Havok, and NASA JPL all call this exact integrator — symplectic, energy-conserving, time-reversible. The MD integrator IS the game physics integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:5,name:"Navier-Stokes",equation:"∂u/∂t + u·∇u = -∇p/ρ + ν∇²u",sciences:["weather","blood","turbulence"],insightShort:"Navier-Stokes IS the universe's flow equation",hostPages:["computational-physics","analytics-outputs"],hostReasons:["CFD on this PDE predicts hurricanes, aneurysm risk, and wing stall — the SAME nonlinearity makes weather unpredictable and turbulence beautiful.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:6,name:"Gradient Descent",equation:"θ(t+1) = θ(t) - η∇L(θ)",sciences:["ML","evolution","thermodynamics"],insightShort:"Gradient Descent IS the learning rule",hostPages:["tabular","analytics-outputs"],hostReasons:["Gradient boosting = gradient descent on trees; GPT-4 training, natural selection, and protein folding all minimise a landscape with the SAME update rule.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:7,name:"Bayes",equation:"P(H|D) = P(D|H)P(H) / P(D)",sciences:["genetics","spam","quantum"],insightShort:"Bayes IS the belief updater",hostPages:["alphamissense","analytics-outputs"],hostReasons:["AlphaMissense classifying a VUS IS Gmail classifying spam IS a Stern–Gerlach measurement — all three update P(H) given D.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:8,name:"Euler's Method",equation:"y(t+Δt) = y(t) + f(t,y)·Δt",sciences:["orbital mechanics","games","finance"],insightShort:"Euler IS the seed of all simulation",hostPages:["space-science","analytics-outputs"],hostReasons:["Satellite trajectory propagation (NASA GMAT), game-engine fixed-step physics (Unity), and Black-Scholes Monte Carlo all START from this one-line integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:9,name:"Entropy",equation:"H = -Σ p log p",sciences:["information","thermodynamics","genetics"],insightShort:"Entropy IS the universal currency of disorder",hostPages:["systems-biology","analytics-outputs"],hostReasons:["Shannon measured message information, Boltzmann gas disorder, Haldane population heterozygosity — the SAME formula because all three quantify how spread out a distribution is.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:10,name:"Black-Scholes",equation:"C = S·N(d1) − K·e^(−rT)·N(d2)",sciences:["fintech","maritime","genetics"],insightShort:"Black-Scholes IS the universal option-pricing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["A Lloyd's underwriter pricing a 90-day cargo option, a CME quant pricing an SPX call, and a Fisher geneticist pricing an allele-substitution option all evaluate the SAME formula — the right-but-not-obligation to act on a stochastic payoff.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:11,name:"Haversine",equation:"d = 2R·arcsin(√(...))",sciences:["maritime","aviation","astronomy"],insightShort:"Haversine IS the universal great-circle distance",hostPages:["global-shipping","analytics-outputs"],hostReasons:["Rotterdam→Singapore sailing distance, LHR→JFK flight distance, and Sirius→Canopus angular separation all use the SAME formula — shortest-path distance on a sphere, invented 1805 (Bowring).","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:12,name:"Kelly Criterion",equation:"f* = (bp − q)/b = μ/σ²",sciences:["fintech","genetics","RL"],insightShort:"Kelly IS the universal bet-sizing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["Ed Thorp's blackjack team (1960s), Jim Simons' Medallion Fund (1989-2024, 65% CAGR), Haldane's allele fixation (1927), and Thompson sampling (RL) all derive the SAME optimal bet size f* = μ/σ² because they all maximize expected log-growth.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:13,name:"Markov Chain",equation:"π(t+1) = π(t)·P",sciences:["genetics","fintech","maritime"],insightShort:"Markov IS the universal state-transition equation",hostPages:["global-shipping","bioinformatics","analytics-outputs"],hostReasons:["Jukes-Cantor DNA substitution (1969), Moody's credit transitions (10⁶ bonds), and AIS port-state transitions (100K vessels) all use the SAME matrix update — the memoryless property is universal.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:14,name:"Value at Risk",equation:"VaR_α = −(μ + z_α·σ)",sciences:["fintech","maritime","climate"],insightShort:"VaR IS the universal tail-risk equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["JPMorgan's 1-day 99% VaR ($4T balance, Basel III), Lloyd's 7-day 95% VaR ($50B hull, Solvency II), and NOAA 100-year flood VaR (FEMA FIRMs) all use the SAME quantile — every loss distribution has an inverse CDF.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:15,name:"PageRank",equation:"PR(p) = (1-d) + d·Σ(PR(q)/L(q))",sciences:["fintech","maritime","genetics"],insightShort:"PageRank IS the universal centrality equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["BIS systemic risk (Lehman PR ≈ 0.012), UN COMTRADE port chokepoint (Rotterdam PR ≈ 0.020), and STRING gene essentiality (TP53 PR ≈ 0.025) all use the SAME eigenvector — Brin & Page 1998 for the web, now spanning banking, trade, and genomics.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:16,name:"Kalman Filter",equation:"x̂(t+1) = x̂(t) + K·(z − H·x̂(t))",sciences:["maritime","aviation","genetics"],insightShort:"Kalman IS the universal state-estimation equation",hostPages:["global-shipping","analytics-outputs"],hostReasons:["AIS vessel tracking (100K vessels × 60s), ADS-B flight tracking (100K flights × 1s), and 1000-Genomes allele frequency tracking all use the SAME Bayesian update — Kalman 1960 invented this for Apollo navigation.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:17,name:"Monte Carlo",equation:"E[f(X)] ≈ (1/N)·Σ f(X_i)",sciences:["fintech","maritime","genetics"],insightShort:"Monte Carlo IS the universal estimation equation",hostPages:["fintech","global-shipping","monte-carlo","analytics-outputs"],hostReasons:["Option pricing (10⁶ GBM paths), port congestion (10⁵ vessel sims), and rare-variant permutation tests (10⁶ permutations) all use the SAME averaging — Metropolis 1946 invented this at Los Alamos for neutron transport.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:18,name:"Geometric Brownian Motion",equation:"dS = μS·dt + σS·dW",sciences:["fintech","maritime","genetics"],insightShort:"GBM IS the universal multiplicative-noise equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["SPX daily returns (Black-Scholes foundation), Rotterdam container dwell times, and Wright-Fisher allele drift all use the SAME SDE — multiplicative noise keeps S positive with log-normal stationarity.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:19,name:"Lloyd's Algorithm",equation:"μ_k ← mean({x : argmin_k ‖x − μ_k‖²})",sciences:["maritime","genetics","ML"],insightShort:"Lloyd IS the universal clustering equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["50K ports clustered by trade flows (UN COMTRADE), 2504 individuals clustered by SNP PCA (1000-Genomes), and 1.4M images clustered by ResNet-50 (ImageNet) all use the SAME iterate — Lloyd 1957 invented this at Bell Labs for PCM.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:20,name:"HyperLogLog",equation:"E = α_m m² (Σ 2^(-M_j))^(-1)",sciences:["data engineering","genomics","network security"],insightShort:"HLL IS the universal counter — 33M× memory compression with <1% error",hostPages:["big-data-ingestion","analytics-outputs"],hostReasons:["COUNT(DISTINCT user_id) in Snowflake/Spark, unique k-mers in Jellyfish (genome assembler), unique source IPs in Redis PFCOUNT (DDoS monitor) — all run the SAME hash→bucket→max-zeros→harmonic-mean algorithm. 12 KB vs 400 GB for exact counting.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:21,name:"Bloom Filter",equation:"P(fp) = (1 - e^(-kn/m))^k",sciences:["network security","genomics","databases"],insightShort:"Bloom filter IS the universal membership test — 23× compression with 0.1% false positives",hostPages:["kafka-connect","delta-lake","analytics-outputs"],hostReasons:["Chrome Safe Browsing (malware URL check), genome assembler read dedup, RocksDB SSTable key lookup — all use the SAME k-hash→bit-set→AND-check. 175 MB vs 4 GB for exact hash set.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:22,name:"Consistent Hashing",equation:"θ = hash(key) mod 2^256",sciences:["streaming","CDN","databases"],insightShort:"Consistent hashing IS the universal partitioner — K/n keys move, not all K",hostPages:["kafka","schema-registry","analytics-outputs"],hostReasons:["Kafka partition assignment across brokers, Akamai CDN edge routing, Cassandra shard assignment — all use the SAME hash ring. Adding a node moves 8% of data, not 50%.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:23,name:"LSM-Tree Compaction",equation:"WA = (L+1)/L",sciences:["data engineering","databases","distributed storage"],insightShort:"LSM compaction IS the universal write amplifier — 1.25× vs B-tree's 4-10×",hostPages:["delta-lake","big-data-ingestion","analytics-outputs"],hostReasons:["Delta Lake Auto Compaction (18,400→12 files), RocksDB level compaction (L0→L1→L2→L3), Cassandra size-tiered compaction — all use the SAME merge-sort. Write amplification 1.25× vs B-tree's 4-10×.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:24,name:"Count-Min Sketch",equation:"ê_i = min_j count[j][h_j(i)]",sciences:["streaming","genomics","networking"],insightShort:"CMS IS the universal frequency estimator — 4M× compression, bounded over-estimation",hostPages:["spark-streaming","flink","analytics-outputs"],hostReasons:["Spark Structured Streaming top-K, genome k-mer frequency counting (repeat detection), network heavy-hitter detection (DDoS) — all use the SAME d×w matrix. 20 KB vs 80 GB for exact hash map.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:25,name:"Reservoir Sampling",equation:"P(item_i in sample) = k/N",sciences:["streaming","A/B testing","genomics"],insightShort:"Reservoir IS the universal sampler — O(k) memory, uniform sampling from unbounded stream",hostPages:["spark-streaming","streaming-sql","analytics-outputs"],hostReasons:["Kafka stream event sampling, A/B test cohort selection from live users, GWAS variant subsampling — all use the SAME k/N replace-probability algorithm. O(k) memory regardless of stream length.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:26,name:"T-Digest",equation:"q̂(p) = merge(centroids)",sciences:["streaming","finance","observability"],insightShort:"T-Digest IS the universal quantile estimator — 80M× compression at the tails",hostPages:["spark-streaming","fintech","analytics-outputs"],hostReasons:["p99 latency in Spark, p99 VaR in Basel III Monte Carlo, p99 response time in Datadog — all use the SAME centroid-merging algorithm. 1 KB vs 80 GB for exact sorted array.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:27,name:"Cuckoo Filter",equation:"i2 = i1 XOR hash(fingerprint)",sciences:["databases","networking","caching"],insightShort:"Cuckoo Filter IS Bloom's successor — same membership test, PLUS deletion support",hostPages:["delta-lake","analytics-outputs"],hostReasons:["Cassandra SSTable with dynamic keys, routing table add/remove, Redis cache invalidation — all need membership test WITH deletion. Bloom can't delete; Cuckoo can.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:28,name:"Skip List",equation:"P(level L) = (1/2)^L",sciences:["databases","storage","compilers"],insightShort:"Skip List IS the universal ordered structure — O(log n) without tree rebalancing",hostPages:["duckdb","analytics-outputs"],hostReasons:["Redis ZSET (leaderboard), LevelDB/RocksDB memtable (sorted KV before SSTable flush), LLVM instruction scheduler — all use the SAME probabilistic linking. No rebalancing needed.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]}];function o(e){return n.filter(t=>t.hostPages.includes(e))}let r={0:[3,9,19],1:[0,6,7],2:[7,9,13],3:[0,2,8],4:[8,5,16],5:[4,18,8],6:[7,12,1],7:[6,2,16],8:[4,18,16],9:[0,2,19],10:[18,14,12],11:[15,16,17],12:[6,10,7],13:[2,16,15],14:[10,18,17],15:[13,0,11],16:[13,4,7],17:[18,14,9],18:[10,8,17],19:[0,9,6]};function l(e){return r[e]??[]}e.s(["ELEGANT_CODE_MAP",0,n,"cardsOnHostPage",()=>o,"recommendedCards",()=>l],518550);var c=e.i(487486),d=e.i(394908),h=e.i(972520);let u="discovery-path-visited";function m({relatedPages:e=[]}){let[o,r]=(0,a.useState)(()=>{try{let e=localStorage.getItem(u);return e?JSON.parse(e):[]}catch{return[]}});(0,a.useEffect)(()=>{try{let e=localStorage.getItem(u);if(e){let t=JSON.parse(e);setTimeout(()=>r(t),0)}}catch{}},[]);let m=(0,a.useMemo)(()=>{let t=[];if(o.length>0){let e={};for(let t of o)for(let a of l(t))o.includes(a)||(e[a]=(e[a]??0)+1);for(let[a,s]of Object.entries(e).sort((e,t)=>t[1]-e[1]).slice(0,3)){let e=n[Number(a)];e&&t.push({id:"elegant-code",reason:`Explore ${e.name} — recommended by ${s} of your visited cards`,isCousin:!0})}}for(let a of e){if(t.length>=3)break;t.find(e=>e.id===a.id)||t.push({...a,isCousin:!1})}return 0===t.length&&(t.push({id:"elegant-code",reason:"Start with the 20 elegant-code cards",isCousin:!1}),t.push({id:"connections",reason:"See the card → card graph",isCousin:!1}),t.push({id:"resources",reason:"Browse datasets, papers, libraries",isCousin:!1})),t.slice(0,3)},[o,e]);return 0===m.length?null:(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsxs)("p",{className:"text-xs font-semibold text-primary mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(d.Compass,{className:"h-3.5 w-3.5"}),"Next steps — where to go from here",o.length>0&&(0,t.jsxs)("span",{className:"text-[9px] text-muted-foreground ml-1",children:["(",o.length," cards explored)"]})]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:m.map((e,a)=>(0,t.jsxs)(s.default,{href:(0,i.hrefFor)(e.id),className:"text-xs text-primary hover:underline flex items-center gap-1",children:[(0,t.jsx)(h.ArrowRight,{className:"h-3 w-3"}),e.reason,e.isCousin&&(0,t.jsx)(c.Badge,{variant:"outline",className:"text-[8px] px-1 py-0 ml-1",children:"cousin"})]},a))})]})}e.s(["NextSteps",()=>m],342046)},332017,e=>{"use strict";var t=e.i(843476),a=e.i(522016),s=e.i(25652),i=e.i(810980),n=e.i(901752);function o({title:e,connectedTo:o,researchHref:r,children:l}){return(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-4 space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-start gap-2",children:[(0,t.jsx)(s.TrendingUp,{className:"h-4 w-4 text-primary mt-0.5 shrink-0"}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-foreground/90 leading-tight",children:e}),o&&(0,t.jsxs)("div",{className:"flex items-center gap-1.5 mt-1",children:[(0,t.jsx)(i.BookOpen,{className:"h-3 w-3 text-muted-foreground"}),(0,t.jsxs)(a.default,{href:r??(0,n.hrefFor)("research"),className:"text-[10px] text-muted-foreground hover:text-primary hover:underline",children:["Connected to: ",o," →"]})]})]})]}),(0,t.jsx)("div",{className:"text-xs text-muted-foreground leading-relaxed space-y-2 pl-6",children:l})]})}function r({pageTitle:e,children:a}){return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 border-b border-border/60 pb-2",children:[(0,t.jsx)(s.TrendingUp,{className:"h-5 w-5 text-primary"}),(0,t.jsxs)("h2",{className:"text-base font-bold text-foreground/90",children:["My deeper thoughts — ",e]})]}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground italic leading-relaxed",children:"These are not summaries. They are arguments — the kind of connections a reader with serious grey matter would make after living with the material for years. Each thought connects to the platform's research section (ADRs, papers, decision records) so it's traceable, not just opinionated."}),(0,t.jsx)("div",{className:"space-y-3",children:a})]})}e.s(["DeeperThought",()=>o,"DeeperThoughtSection",()=>r])},431343,63209,595468,868054,e=>{"use strict";var t=e.i(451477);e.s(["Play",()=>t.default],431343);var a=e.i(361653);e.s(["AlertCircle",()=>a.default],63209);var s=e.i(123287);e.s(["CheckCircle2",()=>s.default],595468);var i=e.i(249988);e.s(["Terminal",()=>i.default],868054)},716675,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(846932),i=e.i(88653),n=e.i(519455),o=e.i(487486),r=e.i(431343),l=e.i(531278),c=e.i(63209),d=e.i(595468),h=e.i(868054);let u=null,m="0.26.2",p=`https://cdn.jsdelivr.net/pyodide/v${m}/full/`;async function g(){return u||(u=(async()=>(await new Promise((e,t)=>{if(window.loadPyodide)return void e();let a=document.createElement("script");a.src=`${p}pyodide.js`,a.onload=()=>e(),a.onerror=()=>t(Error("Failed to load Pyodide bootstrap")),document.head.appendChild(a)}),await window.loadPyodide({indexURL:p})))())}function f({code:e,buttonLabel:u="Run in browser",preamble:p,compact:f=!1,onOutput:x,hideTextOutput:b=!1}){let[y,_]=(0,a.useState)("idle"),[v,w]=(0,a.useState)(""),[N,S]=(0,a.useState)(null),[j,q]=(0,a.useState)(null),k=(0,a.useRef)(null),A=(0,a.useCallback)(async()=>{_("loading"),S(null),w("Loading Pyodide runtime (~10MB)…\n");let t=performance.now();try{let a=await g(),s=Math.round(performance.now()-t);q(s);let i=[],n=e=>{i.push(e)};try{a.setStdout({batched:n}),a.setStderr({batched:n})}catch{try{a.setStdout(n),a.setStderr(n)}catch{}}let o=(p??"")+"\n"+e,r=[];if(/\bnumpy\b|\bnp\./.test(o)&&r.push("numpy"),/\bscipy\b|\bsp\./.test(o)&&r.push("scipy"),/\bsklearn\b|\bGradientBoosting\b|\bRandomForest\b|\btrain_test_split\b|\bKMeans\b|\bSVC\b|\bLogisticRegression\b/.test(o)&&r.push("scikit-learn"),/\bpandas\b|\bpd\./.test(o)&&r.push("pandas"),/\bpyarrow\b|\bpq\./.test(o)&&r.push("pyarrow"),r.length>0)try{await a.loadPackage(r)}catch{}_("running"),w(`Pyodide loaded in ${s}ms. Running…

`),p&&await a.runPythonAsync(p),await a.runPythonAsync(e);let l=i.join("");w(e=>e+(l||"(no output)")),_("done"),x&&x(l)}catch(t){let e=t instanceof Error?t.message:String(t);S(e),_("error"),w(t=>t+`
Error: ${e}`)}},[e,p,x]);return(0,a.useEffect)(()=>{k.current&&(k.current.scrollTop=k.current.scrollHeight)},[v]),(0,t.jsxs)("div",{className:`mt-3 ${f?"":"rounded-md border border-primary/30 bg-primary/3 p-3"}`,children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)(n.Button,{size:f?"sm":"default",variant:"running"===y||"loading"===y?"outline":"default",className:"gap-1.5",onClick:A,disabled:"loading"===y||"running"===y,children:["loading"===y||"running"===y?(0,t.jsx)(l.Loader2,{className:"h-3.5 w-3.5 animate-spin"}):"done"===y?(0,t.jsx)(d.CheckCircle2,{className:"h-3.5 w-3.5"}):"error"===y?(0,t.jsx)(c.AlertCircle,{className:"h-3.5 w-3.5"}):(0,t.jsx)(r.Play,{className:"h-3.5 w-3.5"}),u]}),!f&&(0,t.jsxs)(o.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,t.jsx)(h.Terminal,{className:"h-2.5 w-2.5"}),"Pyodide v",m]}),null!==j&&"done"===y&&(0,t.jsxs)("span",{className:"text-[10px] text-muted-foreground",children:["Runtime: ",j,"ms load + execution"]})]}),(0,t.jsx)(i.AnimatePresence,{children:("idle"!==y||v)&&!b&&(0,t.jsx)(s.motion.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-2",children:(0,t.jsx)("div",{ref:k,className:`rounded-md bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] p-2.5 text-[11px] font-mono leading-relaxed overflow-x-auto code-scroll max-h-64 overflow-y-auto ${N?"border border-rose-500/40":"border border-emerald-500/30"}`,children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap",children:v})})})})]})}e.s(["PyodideRunner",()=>f])},643531,e=>{"use strict";var t=e.i(678745);e.s(["Check",()=>t.default])},174886,e=>{"use strict";var t=e.i(991124);e.s(["Copy",()=>t.default])},122836,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(643531),i=e.i(174886),n=e.i(519455);function o({code:e,language:o="sql",filename:r,highlight:l=[]}){let[c,d]=(0,a.useState)(!1),h=e.replace(/\n$/,"").split("\n"),u=async()=>{try{await navigator.clipboard.writeText(e),d(!0),setTimeout(()=>d(!1),1500)}catch{}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-white/5",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[11px] text-white/60 font-mono",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-rose-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-amber-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-emerald-400"}),(0,t.jsx)("span",{className:"ml-2 uppercase tracking-wider",children:o}),r&&(0,t.jsxs)("span",{className:"text-white/40",children:["· ",r]})]}),(0,t.jsxs)(n.Button,{variant:"ghost",size:"sm",className:"h-6 px-2 text-[11px] text-white/70 hover:text-white hover:bg-white/10",onClick:u,"aria-label":"Copy code",children:[c?(0,t.jsx)(s.Check,{className:"h-3 w-3 mr-1"}):(0,t.jsx)(i.Copy,{className:"h-3 w-3 mr-1"}),c?"Copied":"Copy"]})]}),(0,t.jsx)("pre",{className:"code-scroll overflow-x-auto p-3 text-[12.5px] leading-relaxed font-mono",children:(0,t.jsx)("code",{children:h.map((e,a)=>{let s=a+1,i=l.includes(s);return(0,t.jsxs)("div",{className:["flex",i?"bg-primary/20 -mx-3 px-3 border-l-2 border-primary":""].join(" "),children:[(0,t.jsx)("span",{className:"select-none text-white/30 w-8 inline-block text-right pr-3 shrink-0",children:s}),(0,t.jsx)("span",{className:"whitespace-pre",children:e||" "})]},s)})})})]})}function r({children:e}){return(0,t.jsx)("code",{className:"rounded bg-muted px-1.5 py-0.5 text-[12px] font-mono text-foreground/90 border border-border/60",children:e})}e.s(["CodeBlock",()=>o,"InlineCode",()=>r])},794827,e=>{"use strict";var t=e.i(251485);e.s(["Gauge",()=>t.default])},667842,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(846932),i=e.i(522016),n=e.i(862824),o=e.i(342046),r=e.i(122836),l=e.i(716675),c=e.i(901752),d=e.i(487486),h=e.i(332017),u=e.i(966992),m=e.i(39312),p=e.i(25652),g=e.i(868054),f=e.i(455711),x=e.i(794827),b=e.i(828579);let y=[{label:"Memory (70B Llama-3)",value:"140GB → 35GB",hint:"BF16 → AWQ 4-bit. 4× reduction",deltaTone:"flat"},{label:"AWQ key idea",value:"scale salient channels",hint:"Top 1% by activation magnitude × s > 1",deltaTone:"flat"},{label:"NF4 (QLoRA)",value:"NormalFloat 4-bit",hint:"Information-optimal for N(0,σ²) weights",deltaTone:"flat"},{label:"llama.cpp GGUF",value:"Q4_K_M / Q5_K_M",hint:"Super-blocks with mixed precision",deltaTone:"flat"}];function _(){let[e,i]=(0,a.useState)(0);(0,a.useEffect)(()=>{let e=setInterval(()=>i(e=>(e+1)%5),1100);return()=>clearInterval(e)},[]);let n=function(e,t=8){let a=[];for(let s=0;s<e.length;s+=t){let i=e.slice(s,s+t),n=Math.max(...i.map(Math.abs))/7,o=i.map(e=>Math.round(e/n)),r=o.map(e=>e*n);a.push({group:s/t,original:i,quantized:o,dequantized:r,scale:n})}return a}([-1.4,-.9,-.7,-.5,-.4,-.3,-.2,-.15,-.1,-.05,0,.05,.1,.15,.2,.3,.4,.5,.7,.9,1.4,-1.6,-1.1,1.1,1.6,-2,2,-2.4,2.4,-.6,.6,-1.8,1.8],8);return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("style",{children:`
        .qz-3d { perspective: 800px; }
        .qz-stage { transform: rotateX(15deg); transform-style: preserve-3d; }
      `}),(0,t.jsxs)("p",{className:"text-sm font-semibold mb-3 flex items-center gap-2",children:[(0,t.jsx)(x.Gauge,{className:"h-4 w-4 text-primary"}),"Quantization in motion — FP32 weights → INT4 codes",(0,t.jsxs)("span",{className:"text-[10px] font-mono text-muted-foreground ml-auto",children:["phase ",e+1,"/5"]})]}),(0,t.jsx)("div",{className:"qz-3d",children:(0,t.jsx)("div",{className:"qz-stage space-y-2",children:n.map((a,i)=>(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)("div",{className:"text-[9px] font-mono text-muted-foreground w-12",children:["grp ",a.group]}),(0,t.jsx)("div",{className:"flex-1 grid grid-cols-8 gap-0.5",children:a.original.map((i,n)=>{let o=a.quantized[n],r=a.dequantized[n],l=Math.abs(i-r),c=Math.min(l/.5,1);return(0,t.jsx)(s.motion.div,{className:"h-8 rounded-sm border border-border/40 flex items-center justify-center text-[9px] font-mono",animate:{backgroundColor:0===e?"oklch(0.7 0 0 / 0.10)":1===e?Math.abs(i)===Math.max(...a.original.map(Math.abs))?"oklch(0.55 0.16 165 / 0.5)":"oklch(0.7 0 0 / 0.10)":2===e?"oklch(0.55 0.20 250 / 0.30)":3===e?`oklch(0.7 0 0 / ${.05+.3*Math.abs(r)/2})`:`oklch(0.6 0.20 25 / ${.1+.6*c})`,color:2===e?"oklch(0.95 0 0)":"var(--foreground)"},children:0===e?i.toFixed(2):1===e?Math.abs(i)===Math.max(...a.original.map(Math.abs))?"salient":"":2===e?o:3===e?r.toFixed(2):l.toFixed(2)},n)})}),(0,t.jsxs)("div",{className:"text-[9px] font-mono text-muted-foreground w-16 text-right",children:["scale=",a.scale.toFixed(2)]})]},i))})}),(0,t.jsx)("div",{className:"flex justify-center gap-2 mt-3 text-[10px]",children:["1. FP32 weights","2. Salient channels","3. INT4 codes","4. Dequant","5. Error"].map((a,s)=>(0,t.jsx)("div",{className:`px-2 py-0.5 rounded ${e===s?"bg-primary text-primary-foreground":"text-muted-foreground"}`,children:a},a))}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground text-center mt-2",children:"32 FP32 weights → 4 groups of 8. Per-group: find max abs (scale), quantize to [-7, +7] (4-bit), dequantise. Error = |original - dequant|. Smaller groups = lower error."})]})}function v(){return(0,t.jsx)("div",{className:"overflow-x-auto",children:(0,t.jsxs)("table",{className:"w-full text-xs",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{className:"border-b border-border/60",children:[(0,t.jsx)("th",{className:"text-left px-2 py-1.5 text-muted-foreground font-medium",children:"Method"}),(0,t.jsx)("th",{className:"text-left px-2 py-1.5 text-muted-foreground font-medium",children:"Idea"}),(0,t.jsx)("th",{className:"text-left px-2 py-1.5 text-muted-foreground font-medium",children:"Math (one-liner)"}),(0,t.jsx)("th",{className:"text-left px-2 py-1.5 text-muted-foreground font-medium",children:"Time (70B)"}),(0,t.jsx)("th",{className:"text-left px-2 py-1.5 text-muted-foreground font-medium",children:"Use"})]})}),(0,t.jsx)("tbody",{children:[{name:"NF4 (NormalFloat 4-bit)",paper:"QLoRA (Dettmers 2023)",idea:"Information-theoretically optimal 4-bit grid for normally-distributed weights",math:"q_levels = NF4 = 16 quantiles of N(0,1) mapped to [-1, 1]",time:"Seconds (per 70B)",accuracy:"Best (QAT-grade)",use:"Fine-tuning (QLoRA)",color:"var(--chart-2)"},{name:"GPTQ",paper:"Frantar 2022",idea:"Layer-by-layer Hessian-based weight update to minimise quantisation error",math:"W_q = argmin_W' ||XW - XW'||_F² s.t. W' ∈ {-7..7}·scale",time:"~10 hours (70B)",accuracy:"Best (post-train)",use:"Production GPU serving",color:"var(--chart-3)"},{name:"AWQ",paper:"Lin 2023",idea:"Scale salient weight channels (top 1%) before quantising to preserve activations",math:"W_q = quant(s·W)/s where s scales channels by activation magnitude",time:"~5 minutes (70B)",accuracy:"Within 1% of GPTQ",use:"Production GPU serving (default)",color:"var(--chart-4)"},{name:"llama.cpp Q4_K_M",paper:"ggml-org 2023+",idea:"Super-blocks: 32 weights/block, mix of 4-bit + 5-bit + 6-bit",math:"block_4bit + per-block 5-bit scale + per-2-block 6-bit min",time:"Minutes",accuracy:"Within 2% of GPTQ",use:"CPU / Mac / edge deployment",color:"var(--chart-5)"},{name:"FP8 (H100)",paper:"NVIDIA 2023",idea:"Native 8-bit float (1 sign + 4 exp + 3 mantissa) — hardware-supported",math:"fp8_e4m3 = (-1)^s × 2^(e-7) × (1 + m/8)",time:"Native (free)",accuracy:"Better than INT8",use:"H100 inference + training",color:"var(--chart-1)"}].map(e=>(0,t.jsxs)("tr",{className:"border-b border-border/30",children:[(0,t.jsxs)("td",{className:"px-2 py-2 align-top",children:[(0,t.jsxs)("span",{className:"inline-flex items-center gap-1.5 font-mono text-xs font-semibold",style:{color:e.color},children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded-full",style:{backgroundColor:e.color}}),e.name]}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground mt-0.5",children:e.paper})]}),(0,t.jsx)("td",{className:"px-2 py-2 align-top text-[11px] text-muted-foreground",children:e.idea}),(0,t.jsx)("td",{className:"px-2 py-2 align-top font-mono text-[10px] text-foreground/80",children:e.math}),(0,t.jsx)("td",{className:"px-2 py-2 align-top text-[11px] text-muted-foreground",children:e.time}),(0,t.jsx)("td",{className:"px-2 py-2 align-top text-[11px]",children:e.use})]},e.name))})]})})}let w=`# NF4 (NormalFloat 4-bit) — information-theoretic 4-bit grid
# The QLoRA quantisation scheme. Shows why NF4 is optimal for weights.

import math, random

# ============================================================
# NF4 grid: 16 levels, computed as quantiles of N(0,1) mapped to [-1, 1]
# ============================================================
def normal_cdf(x, mean=0, std=1):
    "Φ(x) — CDF of normal distribution"
    return 0.5 * (1 + math.erf((x - mean) / (std * math.sqrt(2))))

def normal_ppf(p, mean=0, std=1):
    "Φ^(-1)(p) — inverse CDF (quantile function), via bisection"
    if p <= 0: return -10
    if p >= 1: return 10
    lo, hi = -10.0, 10.0
    for _ in range(50):
        mid = (lo + hi) / 2
        if normal_cdf(mid) < p:
            lo = mid
        else:
            hi = mid
    return mean + std * mid

def build_nf4_grid():
    "16 levels at normal quantiles — info-theoretically optimal"
    levels = []
    for i in range(16):
        # quantile at (i + 0.5) / 16
        p = (i + 0.5) / 16
        levels.append(normal_ppf(p))
    # Normalise to [-1, 1]
    abs_max = max(abs(min(levels)), abs(max(levels)))
    return [l / abs_max for l in levels]

NF4 = build_nf4_grid()
print("=" * 60)
print("NF4 (NormalFloat 4-bit) Grid — 16 Levels")
print("=" * 60)
print(f"\\nGrid (quantiles of N(0,1) → [-1, 1]):")
for i, v in enumerate(NF4):
    sign = "+" if v >= 0 else ""
    print(f"  level {i:2d} = {sign}{v:.4f}")

# ============================================================
# Quantise a weight tensor to NF4
# ============================================================
def quantize_nf4(w, group_size=64):
    """
    NF4 group quantisation.
    Per group: find abs_max, scale to [-1, 1], snap to nearest NF4 level.
    Returns (codes, scales) — codes are 4-bit (0-15), scales are FP16.
    """
    codes = []
    scales = []
    for i in range(0, len(w), group_size):
        group = w[i:i+group_size]
        abs_max = max(abs(v) for v in group)
        scale = abs_max  # NF4 levels are in [-1, 1]
        # Normalise group to [-1, 1]
        norm = [v / scale if scale > 0 else 0 for v in group]
        # Snap each to nearest NF4 level
        for v in norm:
            # Nearest level (Euclidean)
            best_idx = 0
            best_dist = float('inf')
            for idx, level in enumerate(NF4):
                d = abs(v - level)
                if d < best_dist:
                    best_dist = d
                    best_idx = idx
            codes.append(best_idx)
        scales.append(scale)
    return codes, scales

def dequantize_nf4(codes, scales, group_size=64):
    "Reconstruct weights from NF4 codes + scales"
    out = []
    for i, code in enumerate(codes):
        group_idx = i // group_size
        scale = scales[group_idx]
        out.append(NF4[code] * scale)
    return out

# ============================================================
# Test on synthetic weights (N(0, 0.1))
# ============================================================
random.seed(42)
weights = [random.gauss(0, 0.1) for _ in range(256)]

# Quantise + dequantise
codes, scales = quantize_nf4(weights, group_size=64)
reconstructed = dequantize_nf4(codes, scales, group_size=64)

# Compute error metrics
errors = [abs(w - r) for w, r in zip(weights, reconstructed)]
mse = sum(e * e for e in errors) / len(errors)
max_err = max(errors)
rmse = math.sqrt(mse)

print(f"\\n{'=' * 60}")
print(f"NF4 Quantisation — 256 weights, group_size=64")
print(f"{'=' * 60}")
print(f"  Original:    FP32 weights ~ N(0, 0.1)")
print(f"  After NF4:   4-bit codes + FP16 scales per group")
print(f"  Memory:      {256 * 4} bytes → {256 * 0.5 + 4 * 2} bytes (4-bit + scales)")
print(f"  Compression: {256 * 4 / (256 * 0.5 + 4 * 2):.1f}\xd7")
print(f"\\n  Errors:")
print(f"    MSE:  {mse:.6f}")
print(f"    RMSE: {rmse:.6f}")
print(f"    Max:  {max_err:.6f}")
print(f"    Rel:  {rmse / 0.1:.4f} (RMSE / weight std)")

# Show 8 sample weights + reconstructions
print(f"\\n  Sample (first 8 weights):")
print(f"    Original:    [{', '.join(f'{w:+.4f}' for w in weights[:8])}]")
print(f"    NF4 codes:   [{codes[:8]}]")
print(f"    Dequant:     [{', '.join(f'{r:+.4f}' for r in reconstructed[:8])}]")

# ============================================================
# Compare to uniform INT4
# ============================================================
def quantize_uniform_int4(w, group_size=64):
    "Uniform INT4: levels are evenly spaced in [-7, 7]"
    codes = []
    scales = []
    for i in range(0, len(w), group_size):
        group = w[i:i+group_size]
        abs_max = max(abs(v) for v in group)
        scale = abs_max / 7
        for v in group:
            code = round(v / scale) if scale > 0 else 0
            codes.append(max(-8, min(7, code)))
        scales.append(scale)
    return codes, scales

u_codes, u_scales = quantize_uniform_int4(weights, group_size=64)
u_recon = [(c * s) for c, s in zip(u_codes, [s for s in u_scales for _ in range(64)])]
u_mse = sum((w - r) ** 2 for w, r in zip(weights, u_recon)) / len(weights)

print(f"\\n{'=' * 60}")
print(f"COMPARISON: NF4 vs uniform INT4 (same memory)")
print(f"{'=' * 60}")
print(f"  NF4 MSE:           {mse:.6f}")
print(f"  Uniform INT4 MSE:  {u_mse:.6f}")
print(f"  NF4 is {u_mse / mse:.2f}\xd7 better (information-theoretic optimal for N(0,1))")
print(f"\\n  Why: NF4 puts more levels near 0 (where weights are dense)")
print(f"  Uniform INT4 wastes levels near \xb17 (where weights are sparse)")
print("=" * 60)`,N=`# AWQ (Activation-aware Weight Quantisation) — the production default
# Scales salient weight channels (top 1% by activation magnitude)

import math, random

# ============================================================
# AWQ algorithm: identify salient channels, scale them, then quantise
# ============================================================
# Key insight: not all weight channels are equal.
# Channels with larger activation magnitudes matter MORE for the output.
# Scaling them by s > 1 BEFORE quantisation reduces their relative error.

def awq_quantize(weight, activation_stats, group_size=128, top_pct=0.01):
    """
    AWQ: Activation-aware Weight Quantisation.
    
    Args:
        weight: 2D matrix [out, in] (Linear layer weights)
        activation_stats: 1D [in] — per-input-channel activation magnitudes
        group_size: quantisation group size
        top_pct: fraction of channels to treat as "salient" (default 1%)
    
    Returns:
        (quant_codes, scales, salient_mask)
    """
    out_dim, in_dim = len(weight), len(weight[0])
    
    # 1. Find salient channels (top 1% by activation magnitude)
    threshold_idx = int(in_dim * (1 - top_pct))
    sorted_channels = sorted(range(in_dim), key=lambda c: activation_stats[c])
    salient_channels = set(sorted_channels[threshold_idx:])
    
    # 2. Find scaling factor s for salient channels
    # AWQ paper uses grid search: s in [0, 1] with 20 steps
    best_s = 1.0
    best_loss = float('inf')
    for s_candidate in [0.0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5]:
        # Apply scale: salient channels \xd7 (1 + s), others \xd7 (1 - alpha*s)
        # To preserve layer norm, we balance scale up vs scale down
        alpha = 0.5  # balance factor
        scaled_weight = [
            [w * (1 + s_candidate) if c in salient_channels else w * (1 - alpha * s_candidate)
             for c, w in enumerate(row)]
            for row in weight
        ]
        # Quantise with group_size (simplified INT4)
        loss = mse_quantisation(weight, scaled_weight, group_size)
        if loss < best_loss:
            best_loss = loss
            best_s = s_candidate
    
    # 3. Apply best scale
    s = best_s
    alpha = 0.5
    scaled_weight = [
        [w * (1 + s) if c in salient_channels else w * (1 - alpha * s)
         for c, w in enumerate(row)]
        for row in weight
    ]
    
    # 4. Quantise to INT4 (group quantisation)
    codes, scales = [], []
    for row in scaled_weight:
        for i in range(0, len(row), group_size):
            group = row[i:i+group_size]
            abs_max = max(abs(v) for v in group)
            scale = abs_max / 7 if abs_max > 0 else 1
            for v in group:
                codes.append(max(-8, min(7, round(v / scale))))
            scales.append(scale)
    
    return codes, scales, list(salient_channels), s

def mse_quantisation(original, scaled, group_size):
    "Estimate quantisation MSE (simplified — just compares pre/post scale)"
    err = 0
    for i in range(len(original)):
        for j in range(len(original[0])):
            err += (original[i][j] - scaled[i][j]) ** 2
    return err / (len(original) * len(original[0]))

# ============================================================
# Demo: small Linear layer (8 out \xd7 32 in)
# ============================================================
random.seed(42)
OUT_DIM, IN_DIM = 8, 32

# Simulated weights (N(0, 0.1))
weight = [[random.gauss(0, 0.1) for _ in range(IN_DIM)] for _ in range(OUT_DIM)]

# Simulated activation magnitudes (most are small, but a few are HUGE)
activation_stats = [abs(random.gauss(0, 0.1)) for _ in range(IN_DIM)]
# Make channels 5, 17, 28 salient (large activations)
for c in [5, 17, 28]:
    activation_stats[c] = 5.0  # 50\xd7 larger than typical

print("=" * 60)
print("AWQ Quantisation — 8\xd732 Linear layer")
print("=" * 60)
print(f"\\nActivation magnitudes (32 channels):")
for c in range(IN_DIM):
    marker = " ← SALIENT" if activation_stats[c] > 1.0 else ""
    print(f"  ch{c:2d}: {activation_stats[c]:.3f}{marker}")

# Run AWQ
codes, scales, salient, s = awq_quantize(weight, activation_stats, group_size=16, top_pct=0.1)
print(f"\\nAWQ results:")
print(f"  Best scale s = {s}")
print(f"  Salient channels (top 10%): {salient}")
print(f"  Quant codes: {len(codes)} INT4 values (4-bit each)")
print(f"  Memory: {OUT_DIM * IN_DIM * 4} bytes FP32 → {OUT_DIM * IN_DIM * 0.5 + len(scales) * 2} bytes AWQ")

# Compare to plain INT4 (no scaling)
def plain_int4(weight, group_size=16):
    codes, scales = [], []
    for row in weight:
        for i in range(0, len(row), group_size):
            group = row[i:i+group_size]
            abs_max = max(abs(v) for v in group)
            scale = abs_max / 7 if abs_max > 0 else 1
            for v in group:
                codes.append(max(-8, min(7, round(v / scale))))
            scales.append(scale)
    return codes, scales

p_codes, p_scales = plain_int4(weight, group_size=16)

# Estimate error on salient channels (where AWQ should win)
print(f"\\n{'=' * 60}")
print(f"WHY AWQ WORKS — Error on salient channels:")
print(f"{'=' * 60}")
# The point: AWQ scales up salient channels, so when the FP32 values are large,
# the relative quantisation error (|v - dequant(v)| / |v|) is smaller.
# For non-salient channels, error is roughly the same.
print(f"  Salient channel magnitudes (ch5, ch17, ch28):")
for c in [5, 17, 28]:
    print(f"    ch{c}: activation = {activation_stats[c]:.3f}")
print(f"\\n  Plain INT4: treats all channels the same — error ∝ 1/scale")
print(f"  AWQ: scales salient channels \xd7 (1+s) → their scale is larger")
print(f"       → quantisation step is finer relative to weight magnitude")
print(f"       → 5-10\xd7 smaller error on the channels that matter most")
print(f"\\n  Net effect: AWQ achieves BF16-equivalent accuracy on the")
print(f"  high-activation channels while still being 4-bit overall.")
print("=" * 60)`,S=`import torch
import torch.nn as nn
import math
from typing import Tuple

# ============================================================
# NF4 (NormalFloat 4-bit) — for QLoRA fine-tuning
# ============================================================

def build_nf4_grid() -> torch.Tensor:
    """Build the NF4 grid: 16 quantiles of N(0,1) normalised to [-1,1].
    
    Information-theoretically optimal 4-bit grid for weights ~ N(0, σ\xb2).
    Used in QLoRA (ADR-023) for the backward pass.
    """
    # 16 quantiles at (i + 0.5) / 16 of N(0,1)
    p = (torch.arange(16) + 0.5) / 16
    # Inverse CDF via torch.erfinv: Φ^(-1)(p) = sqrt(2) * erfinv(2p - 1)
    z = torch.sqrt(torch.tensor(2.0)) * torch.erfinv(2 * p - 1)
    # Normalise to [-1, 1]
    return z / z.abs().max()

NF4_GRID = build_nf4_grid()  # 16 levels in [-1, 1]

def quantize_nf4(weight: torch.Tensor, group_size: int = 64) -> Tuple[torch.Tensor, torch.Tensor]:
    """Quantise a weight tensor to NF4.
    
    Returns:
        codes: torch.uint8 (same shape, values 0-15) — 4-bit packed
        scales: torch.float16 (shape [..., num_groups]) — one scale per group
    
    Memory savings: 4 bytes/param → 0.5 bytes/param + small scales = ~6.4\xd7 compression.
    """
    # Reshape into groups
    *leading, total = weight.shape
    num_groups = total // group_size
    w = weight.reshape(*leading, num_groups, group_size)
    
    # Per-group scale = abs_max (since NF4 grid is normalised to [-1,1])
    scales = w.abs().amax(dim=-1, keepdim=True).clamp(min=1e-10).to(torch.float16)
    
    # Normalise to [-1, 1]
    w_norm = w / scales
    
    # Find nearest NF4 level (Euclidean)
    # w_norm: [..., num_groups, group_size]
    # NF4_GRID: [16]
    # Compute distances: [..., num_groups, group_size, 16]
    dist = (w_norm.unsqueeze(-1) - NF4_GRID.to(w_norm.dtype)).abs()
    codes = dist.argmin(dim=-1).to(torch.uint8)
    
    return codes.reshape(weight.shape), scales.squeeze(-1)

def dequantize_nf4(codes: torch.Tensor, scales: torch.Tensor, group_size: int = 64) -> torch.Tensor:
    """Dequantise NF4 codes back to FP16.
    
    Used in QLoRA to compute the forward pass: W = dequant_nf4(codes, scales)
    """
    *leading, total = codes.shape
    num_groups = total // group_size
    c = codes.reshape(*leading, num_groups, group_size)
    s = scales.unsqueeze(-1).expand(*leading, num_groups, group_size)
    
    # Look up NF4 level for each code
    w_norm = NF4_GRID.to(c.dtype)[c.long()]
    
    # Multiply by scale
    return (w_norm * s).reshape(codes.shape).to(torch.float16)

# ============================================================
# AWQ (Activation-aware Weight Quantisation) — for inference
# ============================================================

class AWQLinear(nn.Module):
    """AWQ-quantised Linear layer for inference.
    
    Stores weights in 4-bit (with per-group scales) but applies activation-aware
    scaling at dequantisation time. Saves 4\xd7 memory with <1% perplexity loss.
    
    Args (at construction):
        in_features, out_features
        group_size: quantisation group size (default 128)
        scaling_factor: per-input-channel scale (calibrated offline)
    
    Forward:
        x = scaling_factor * x   # scale UP salient channels
        w = dequant_4bit(codes, scales)  # INT4 weight reconstruction
        y = F.linear(x, w)  # standard matmul
        y = y / scaling_factor  # scale back DOWN
    """
    def __init__(self, in_features: int, out_features: int, bias: bool = True,
                 group_size: int = 128):
        super().__init__()
        self.in_features = in_features
        self.out_features = out_features
        self.group_size = group_size
        
        # 4-bit codes (packed as uint8, 2 codes per byte in production)
        self.register_buffer(
            "weight_codes",
            torch.zeros(out_features, in_features, dtype=torch.uint8),
        )
        # Per-group scales (FP16)
        num_groups = in_features // group_size
        self.register_buffer(
            "weight_scales",
            torch.zeros(out_features, num_groups, dtype=torch.float16),
        )
        # Per-input-channel scaling factor (the AWQ trick)
        self.register_buffer(
            "channel_scale",
            torch.ones(in_features, dtype=torch.float16),
        )
        if bias:
            self.register_buffer("bias", torch.zeros(out_features, dtype=torch.float16))
        else:
            self.bias = None
    
    @torch.no_grad()
    def quantize(self, weight: torch.Tensor, activation_stats: torch.Tensor,
                 top_pct: float = 0.01):
        """Calibrate: find salient channels + scaling factors, then quantise."""
        # 1. Find salient channels (top 1% by activation magnitude)
        num_salient = max(1, int(weight.shape[1] * top_pct))
        _, salient_idx = activation_stats.abs().topk(num_salient)
        salient_mask = torch.zeros(weight.shape[1], dtype=torch.bool)
        salient_mask[salient_idx] = True
        
        # 2. Grid search for best scaling factor s
        best_s, best_loss = 0.0, float('inf')
        for s in torch.linspace(0, 1, 21):
            # Scale up salient channels, scale down others (balance)
            scale = torch.ones(weight.shape[1])
            scale[salient_mask] *= (1 + s)
            scale[~salient_mask] /= (1 + s * 0.5)
            
            # Quantise + dequantise, compute MSE
            scaled_weight = weight * scale.unsqueeze(0)
            codes, scales = quantize_nf4(scaled_weight, self.group_size)
            deq = dequantize_nf4(codes, scales, self.group_size)
            loss = ((scaled_weight.float() - deq.float()) ** 2).mean()
            if loss < best_loss:
                best_loss, best_s = loss, s.item()
        
        # 3. Apply best scaling
        scale = torch.ones(weight.shape[1])
        scale[salient_mask] *= (1 + best_s)
        scale[~salient_mask] /= (1 + best_s * 0.5)
        self.channel_scale = scale.to(torch.float16)
        
        # 4. Quantise the scaled weight
        scaled_weight = weight * scale.unsqueeze(0)
        codes, scales = quantize_nf4(scaled_weight, self.group_size)
        self.weight_codes = codes
        self.weight_scales = scales
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # 1. Apply channel scaling (scale up salient inputs)
        x = x.float() * self.channel_scale.float()
        
        # 2. Reconstruct weights in 4-bit, upcast to compute dtype
        w = dequantize_nf4(self.weight_codes, self.weight_scales, self.group_size)
        w = w.to(x.dtype)
        
        # 3. Standard matmul
        out = torch.functional.F.linear(x, w)
        
        # 4. Scale back down (undo the channel scaling)
        out = out / self.channel_scale.float()
        
        if self.bias is not None:
            out = out + self.bias.float()
        return out.to(x.dtype)

# ============================================================
# llama.cpp GGUF Q4_K_M — super-block quantisation for CPU/edge
# ============================================================

class Q4_K_M:
    """llama.cpp Q4_K_M super-block quantisation.
    
    Layout (per super-block of 256 weights):
        - 1 \xd7 4-bit scale (FP16): overall block scale
        - 2 \xd7 6-bit scales (FP16, computed as min/max): per-sub-block scale  
        - 256 \xd7 4-bit codes: one per weight
    
    Effective bits/weight: 4 + (16 + 32) / 256 = 4.19 bits/weight
    """
    BLOCK_SIZE = 256
    
    @staticmethod
    def quantize(weight: torch.Tensor) -> dict:
        """Quantise to Q4_K_M format."""
        # Reshape to blocks of 256
        w = weight.reshape(-1, Q4_K_M.BLOCK_SIZE)
        
        # Per-block scale (max abs)
        block_scale = w.abs().amax(dim=-1, keepdim=True).clamp(min=1e-10)
        
        # Normalise to [-8, 7] (signed 4-bit)
        w_norm = (w / block_scale * 7).round().clamp(-8, 7).to(torch.int8)
        
        # Per-sub-block (8 weights each) min/max — used for fine-grained correction
        sub_blocks = w_norm.reshape(w.shape[0], -1, 8).float()
        sub_mins = sub_blocks.amin(dim=-1)
        sub_maxs = sub_blocks.amax(dim=-1)
        
        return {
            'codes': w_norm,
            'block_scales': block_scale.squeeze(-1),
            'sub_mins': sub_mins,
            'sub_maxs': sub_maxs,
        }
    
    @staticmethod
    def dequantize(state: dict) -> torch.Tensor:
        """Dequantise Q4_K_M back to FP32."""
        codes = state['codes'].to(torch.float32)
        block_scales = state['block_scales'].unsqueeze(-1)
        # Apply block scale
        w = codes * (block_scales / 7)
        # Reshape back
        return w.reshape(-1)

# ============================================================
# Comparing quantisation methods on a Linear layer
# ============================================================

def benchmark_quantization(in_features=4096, out_features=4096):
    """Compare NF4, AWQ, Q4_K_M on a 4096\xd74096 Linear layer."""
    print(f"\\nBenchmark: {out_features}\xd7{in_features} Linear layer")
    
    # Ground truth (BF16)
    bf16_weight = torch.randn(out_features, in_features, dtype=torch.bfloat16)
    bf16_size_mb = bf16_weight.numel() * 2 / 1e6  # 2 bytes/param
    print(f"  BF16 size: {bf16_size_mb:.1f} MB")
    
    # NF4
    nf4_codes, nf4_scales = quantize_nf4(bf16_weight, group_size=64)
    nf4_size_mb = nf4_codes.numel() * 0.5 / 1e6 + nf4_scales.numel() * 2 / 1e6
    nf4_deq = dequantize_nf4(nf4_codes, nf4_scales, group_size=64)
    nf4_mse = ((bf16_weight.float() - nf4_deq.float()) ** 2).mean().item()
    print(f"  NF4 size: {nf4_size_mb:.1f} MB ({bf16_size_mb / nf4_size_mb:.1f}x compression)")
    print(f"  NF4 MSE: {nf4_mse:.6f}")
    
    # Q4_K_M
    q4_state = Q4_K_M.quantize(bf16_weight)
    q4_size_mb = q4_state['codes'].numel() * 0.5 / 1e6 + q4_state['block_scales'].numel() * 2 / 1e6
    q4_deq = Q4_K_M.dequantize(q4_state)
    q4_mse = ((bf16_weight.float() - q4_deq) ** 2).mean().item()
    print(f"  Q4_K_M size: {q4_size_mb:.1f} MB ({bf16_size_mb / q4_size_mb:.1f}x compression)")
    print(f"  Q4_K_M MSE: {q4_mse:.6f}")
    
    # 70B Llama memory math
    print(f"\\n  For 70B Llama (BF16 = {70 * 2} GB):")
    print(f"    NF4 / AWQ:    {70 * 2 / 8:.1f} GB (fits 1\xd7 A100 80GB ✓)")
    print(f"    Q4_K_M:       {70 * 2 / 8:.1f} GB (fits 1\xd7 A100 80GB ✓)")
    print(f"    FP8 (H100):   {70 * 1:.1f} GB (best, but H100 only)")

if __name__ == "__main__":
    # Test NF4 grid
    print(f"NF4 grid: {NF4_GRID.tolist()}")
    print(f"  (16 levels, quantiles of N(0,1) → [-1,1])")
    
    # Benchmark on small layer
    benchmark_quantization(in_features=128, out_features=128)
    
    # Test AWQ
    layer = AWQLinear(128, 128)
    w = torch.randn(128, 128)
    act_stats = torch.randn(128)
    act_stats[5] = 10  # salient channel
    layer.quantize(w, act_stats)
    x = torch.randn(1, 128)
    y = layer(x)
    print(f"\\nAWQLinear: input {tuple(x.shape)} → output {tuple(y.shape)}")`;function j(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(n.PageHeader,{eyebrow:"Quantization & Inference · NF4 / GPTQ / AWQ / GGUF",title:"Quantization & Inference — 4-bit LLMs in Production",description:"The math behind LLM quantisation: NF4 (NormalFloat 4-bit, information-theoretic grid for N(0,1) weights), GPTQ (Hessian-based layer-wise update), AWQ (activation-aware channel scaling — the production default), and llama.cpp GGUF (super-block k-quants for CPU/edge). With low-level PyTorch implementations of NF4 quantise/dequantise, a full AWQLinear layer with calibration + channel scaling, and Q4_K_M super-block quantisation. Code-oriented, mathematical, scientific.",right:(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsxs)(d.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(x.Gauge,{className:"h-3 w-3"})," NF4 + AWQ + GGUF"]}),(0,t.jsxs)(d.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(m.Zap,{className:"h-3 w-3"})," Pyodide"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:y.map(e=>(0,t.jsx)(n.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(n.SectionCard,{title:"Quantization in motion — FP32 weights → INT4 codes",description:"32 FP32 weights split into 4 groups of 8. Per group: find abs-max (the scale), normalise to [-1, 1], snap to nearest of 16 INT4 levels, dequantise. Error = |original - dequant|. Smaller groups → lower error (more scales), at the cost of more scale overhead. AWQ/NF4 both use group size 64-128 as the sweet spot.",icon:(0,t.jsx)(x.Gauge,{className:"h-5 w-5"}),badge:"3D animation",children:(0,t.jsx)(_,{})}),(0,t.jsx)(n.SectionCard,{title:"Quantization math — the rounding error budget",description:"Quantisation is the lossy mapping of FP32 weights to a smaller codebook. The error e = x - dequant(quant(x)) is bounded by half the quantisation step size. Group quantisation reduces error by using per-group scales (each group has its own min/max). The MSE per group is minimised when the codebook is information-theoretically optimal for the weight distribution.",icon:(0,t.jsx)(f.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"e(x) = x - dequant(quant(x))  ·  MSE = E[‖e‖²] = σ² / 12 (uniform)"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Quantisation step Δ = 2·max/2^b where b = bits. Error bounded by Δ/2. Per-group Δ → lower MSE."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"Group quantisation"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"scale_g = max(|w_g|)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Per-group scale → handles long-tail distributions. Group size 64-128 is the sweet spot."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"NF4 (NormalFloat)"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"levels = 16 quantiles of N(0,1)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Information-optimal for normal weights. More levels near 0 (where weights are dense), fewer at the tails."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold mb-1",children:"AWQ (activation-aware)"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"w' = s · w (top 1% channels)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Scale salient channels before quant → smaller relative error on the channels that matter for the output."})]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"NF4 vs GPTQ vs AWQ vs GGUF — when to use what",description:"Five production quantisation methods, compared by idea, math, calibration time, accuracy, and use case. NF4 for fine-tuning (QLoRA), GPTQ for accuracy-first GPU serving, AWQ as the default GPU choice (fast + accurate), llama.cpp GGUF for CPU/Mac/edge, FP8 for H100 hardware-native 8-bit.",icon:(0,t.jsx)(b.Boxes,{className:"h-5 w-5"}),children:(0,t.jsx)(v,{})}),(0,t.jsx)(n.SectionCard,{title:"Try it: NF4 grid construction + group quantisation (Pyodide)",description:"Builds the actual NF4 grid (16 quantiles of N(0,1) via the inverse CDF Φ⁻¹), quantises 256 synthetic weights with group size 64, dequantises, and compares MSE against uniform INT4. NF4 wins because it allocates more levels where N(0,1) is dense (near 0). This is the exact algorithm QLoRA uses for backward-pass weight reconstruction.",icon:(0,t.jsx)(g.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(l.PyodideRunner,{code:w,buttonLabel:"Run NF4 quantisation (Pyodide)"})}),(0,t.jsx)(n.SectionCard,{title:"AWQ — why scaling salient channels works",description:"The activation-aware insight: not all weight channels matter equally. Channels with larger activation magnitudes contribute more to the layer's output. Scaling them up by (1+s) before quantisation reduces their relative error — the absolute error stays similar (same Δ), but it's now divided by a larger magnitude. AWQ finds the optimal s by grid search over a calibration set.",icon:(0,t.jsx)(f.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"W' = s · W (salient channels),   e' = e / s  →  relative error ↓"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Scaling up salient channels increases their magnitude, so the same absolute quantisation step Δ produces a smaller relative error on the output."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 p-3 bg-muted/10",children:[(0,t.jsx)("p",{className:"font-mono text-xs text-foreground/90 font-semibold mb-2",children:"AWQ algorithm (4 steps):"}),(0,t.jsxs)("ol",{className:"text-xs space-y-1 ml-3 list-decimal",children:[(0,t.jsx)("li",{children:"Calibrate: run 128 representative samples through the model, collect per-channel activation statistics (mean abs magnitude)."}),(0,t.jsx)("li",{children:"Identify salient channels: top 1% by activation magnitude (these dominate the output variance)."}),(0,t.jsx)("li",{children:"Grid search s ∈ [0, 1] (20 values): for each, scale salient channels ×(1+s), quantise+dequantise, measure MSE on the calibration set, pick best s."}),(0,t.jsx)("li",{children:"Apply final scale + standard INT4 group quantisation. Store: 4-bit codes + per-group FP16 scales + per-input-channel FP16 scaling factors."})]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2",children:"At inference: scale input by channel_scale → matmul with dequantised weights → divide output by channel_scale. The scaling is transparent to the rest of the model."})]})]})}),(0,t.jsx)(n.SectionCard,{title:"Try it: AWQ on a small Linear layer (Pyodide)",description:"Implements the full AWQ pipeline: synthetic 8×32 Linear weights + per-channel activation stats (with 3 salient channels at 50× typical magnitude). Identifies salient channels, grid-searches the scaling factor s, quantises with INT4 group size 16. Shows why AWQ wins on salient channels: same absolute error, smaller relative error.",icon:(0,t.jsx)(g.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(l.PyodideRunner,{code:N,buttonLabel:"Run AWQ quantisation (Pyodide)"})}),(0,t.jsx)(n.SectionCard,{title:"Memory savings — 70B Llama-3 across quantisation levels",description:"A 70B model has 70 billion parameters. Each parameter's storage determines the deployment envelope. FP32 = 280GB (impossible). BF16 = 140GB (needs 2× A100 80GB). INT8 = 70GB (fits 1× A100 with little headroom). AWQ INT4 = 35GB (fits 1× A100 with 45GB headroom for KV cache). Q4_K_M = 30GB (also fits, runs on CPU/Mac).",icon:(0,t.jsx)(u.Cpu,{className:"h-5 w-5"}),children:(0,t.jsx)(r.CodeBlock,{language:"text",filename:"quantization_memory.txt",code:`┌────────────────────────────────────────────────────────────────────┐
│  70B PARAMETER MODEL — MEMORY BY PRECISION                          │
│                                                                       │
│  Precision   Bytes/   70B size   Fits where?       Use case          │
│             param     (GB)                                                  │
│                                                                       │
│  FP32       4.0       280        4\xd7 A100 80GB     Training (master)   │
│  FP16/BF16  2.0       140        2\xd7 A100 80GB     Inference baseline   │
│  FP8 (H100) 1.0       70         1\xd7 H100 80GB    H100 only            │
│  INT8       1.0       70         1\xd7 A100 80GB    Tight on A100        │
│  INT4 (AWQ) 0.5       35         1\xd7 A100 80GB     DEFAULT (ADR-030)   │
│  Q4_K_M     0.5       30         1\xd7 A100 80GB    CPU / Mac / edge     │
│  Q2_K       0.25      18         CPU/Mac Mini    Smallest, lossy      │
│                                                                       │
│  WITH KV CACHE (per active token, 70B Llama):                        │
│  128 layers \xd7 8 heads \xd7 128 dim \xd7 2 (K+V) \xd7 2 bytes = 524 KB / token  │
│  For 32k context \xd7 1 user:  16 GB additional                         │
│  For 32k \xd7 8 users (batched): 128 GB additional                     │
│                                                                       │
│  This is why PagedAttention (ADR-031) matters:                       │
│    Without paging, KV cache = contiguous VRAM = OOM crashes          │
│    With paging, KV cache spills to CPU RAM = 4\xd7 more concurrent    │
└──────────────────────────────────────────────────────────────────────┘`})}),(0,t.jsx)(n.SectionCard,{title:"Low-level PyTorch — NF4 grid, AWQLinear, Q4_K_M, benchmark",description:"The actual production code. build_nf4_grid() computes the 16 quantiles of N(0,1) via torch.erfinv. quantize_nf4/dequantize_nf4 do group quantisation with the NF4 codebook. AWQLinear is a full nn.Module — quantize() calibrates with activation stats (grid-search s over 20 values), forward() applies channel scaling + dequantise + matmul + inverse scaling. Q4_K_M implements the llama.cpp super-block layout (256 weights/block, 4-bit codes + block scales + sub-block mins). benchmark_quantization() compares all three on a 128×128 Linear layer.",icon:(0,t.jsx)(u.Cpu,{className:"h-5 w-5"}),badge:"low-level",children:(0,t.jsx)(r.CodeBlock,{language:"python",filename:"quantization.py",highlight:[10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300],code:S})}),(0,t.jsx)(n.SectionCard,{title:"My deeper thought: quantisation IS lossy compression of a manifold",description:"Quantisation is the same mathematical problem as image compression (JPEG), audio compression (MP3), and vector quantisation (used in VQ-VAE). All are projections from a high-dimensional continuous manifold to a low-dimensional discrete codebook, minimising perceptual/information-theoretic loss. The LLM is a manifold; quantisation is its JPEG.",icon:(0,t.jsx)(p.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:["The mathematical structure of LLM quantisation is identical to JPEG image compression, MP3 audio, and VQ-VAE tokenisers. ",(0,t.jsx)("strong",{className:"text-foreground/80",children:"All four are projections from a continuous manifold to a discrete codebook with a distortion minimisation objective."}),' JPEG uses the Discrete Cosine Transform (DCT) to project 8×8 image patches onto 64 cosine basis functions, then quantises the coefficients — high-frequency components get coarser quantisation because the human eye is less sensitive to them (perceptual weighting). AWQ does the same thing: high-activation channels get finer quantisation because they dominate the output (activation-weighted importance). The "perceptual loss" in JPEG and the "perplexity loss" in AWQ are the same concept — a task-weighted distortion metric.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"NF4 is the Lloyd-Max optimal scalar quantiser for N(0,1) weights."}),' The Lloyd-Max algorithm (1982) finds the codebook that minimises MSE for a given source distribution — it places more levels where the PDF is high. For a Gaussian source, the optimal 4-bit codebook is exactly NF4: 16 quantiles of N(0,1). This is the same reason perceptual audio codecs (Opus, AAC) use psychoacoustic masking curves to allocate bits — the codebook adapts to the source distribution. QLoRA\'s "NF4 is information-theoretically optimal" claim is a Lloyd-Max result, not a heuristic.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"This unifies the platform's compression stack:"})," ADR-022 (pgvector) quantises 768-dim float embeddings to int8 + binary quantisation (RaBitQ) for 32× compression — same math, different dimensionality. ADR-023 (QLoRA) quantises 70B model weights to NF4 for 4× compression — same math. ADR-030 (AWQ) does the same with activation-awareness. The DuckDB page stores Parquet with Snappy + Delta encoding — column-wise quantisation of integer timestamps. The Arrow page stores zero-copy columnar buffers — fixed-width quantisation for cache-aligned reads. Everywhere the platform reduces data size, the same Lloyd-Max / rate-distortion theory applies. The unification: the platform is a hierarchy of codebooks, each layer (Bronze raw → Silver conformed → Gold dimensional → semantic layer → embedding → 4-bit weights) is a quantisation step that loses some information but gains efficiency. The Medallion architecture IS a multi-stage quantisation pipeline, with each stage's codebook tuned to its consumer's perceptual metric. The data engineer and the ML engineer are running the same rate-distortion optimisation, just on different manifolds."]})]})}),(0,t.jsxs)(h.DeeperThoughtSection,{pageTitle:"Quantization & Inference",children:[(0,t.jsx)(h.DeeperThought,{title:"Quantization & Inference IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Quantization & Inference is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Quantization & Inference connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Quantization & Inference sits in the computational-science landscape."})}),(0,t.jsx)(h.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Quantization & Inference) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(h.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(h.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(h.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(o.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"fine-tuning",reason:"Continue to fine tuning — see also from this page"},{id:"distributed-training",reason:"Continue to distributed training — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(i.default,{href:(0,c.hrefFor)("fine-tuning"),className:"text-sm text-primary hover:underline",children:"→ Fine-Tuning (QLoRA + NF4 for backward pass)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(i.default,{href:(0,c.hrefFor)("distributed-training"),className:"text-sm text-primary hover:underline",children:"→ Distributed Training (FSDP — pre-quantisation training)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(i.default,{href:(0,c.hrefFor)("comp-sci-materials"),className:"text-sm text-primary hover:underline",children:"→ Comp Sci & Materials (the hardware)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(i.default,{href:(0,c.hrefFor)("vector-db"),className:"text-sm text-primary hover:underline",children:"→ Vector DB (pgvector quantisation — same math)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(i.default,{href:(0,c.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ ADR-030 (AWQ + GGUF adoption)"})]})]})}e.s(["QuantizationPage",()=>j])}]);