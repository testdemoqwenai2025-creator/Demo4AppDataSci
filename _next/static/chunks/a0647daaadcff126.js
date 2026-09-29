(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,862824,515288,e=>{"use strict";var t=e.i(843476),a=e.i(975157);function s({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card",className:(0,a.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",e),...s})}function i({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-header",className:(0,a.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",e),...s})}function n({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-title",className:(0,a.cn)("leading-none font-semibold",e),...s})}function o({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-description",className:(0,a.cn)("text-muted-foreground text-sm",e),...s})}function r({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"card-content",className:(0,a.cn)("px-6",e),...s})}e.s(["Card",()=>s,"CardContent",()=>r,"CardDescription",()=>o,"CardHeader",()=>i,"CardTitle",()=>n],515288);var l=e.i(487486);function d({title:e,description:a,icon:d,badge:c,badgeVariant:m="outline",children:h,className:p,contentClassName:u}){return(0,t.jsxs)(s,{className:["border-border/60",p].filter(Boolean).join(" "),children:[(e||a)&&(0,t.jsxs)(i,{className:"flex flex-row items-start gap-3 space-y-0 border-b border-border/60 bg-muted/30",children:[d&&(0,t.jsx)("div",{className:"mt-0.5 text-primary",children:d}),(0,t.jsxs)("div",{className:"flex-1",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 flex-wrap",children:[e&&(0,t.jsx)(n,{className:"text-base",children:e}),c&&(0,t.jsx)(l.Badge,{variant:m,className:"text-[10px]",children:c})]}),a&&(0,t.jsx)(o,{className:"mt-1 text-xs",children:a})]})]}),(0,t.jsx)(r,{className:["p-4 md:p-5",u].filter(Boolean).join(" "),children:h})]})}function c({eyebrow:e,title:a,description:s,right:i}){return(0,t.jsxs)("div",{className:"mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4",children:[(0,t.jsxs)("div",{children:[e&&(0,t.jsx)("p",{className:"text-[11px] font-semibold uppercase tracking-widest text-primary/80 mb-1.5",children:e}),(0,t.jsx)("h1",{className:"text-2xl md:text-3xl font-semibold tracking-tight text-balance",children:a}),s&&(0,t.jsx)("p",{className:"mt-2 text-sm md:text-base text-muted-foreground max-w-3xl text-pretty",children:s})]}),i&&(0,t.jsx)("div",{className:"shrink-0",children:i})]})}function m({label:e,value:a,delta:i,deltaTone:n="flat",hint:o}){return(0,t.jsx)(s,{className:"border-border/60",children:(0,t.jsxs)(r,{className:"p-4",children:[(0,t.jsx)("p",{className:"text-[11px] uppercase tracking-wider text-muted-foreground",children:e}),(0,t.jsx)("p",{className:"mt-1 text-2xl font-semibold tabular-nums",children:a}),(0,t.jsxs)("div",{className:"mt-1 flex items-center gap-2",children:[i&&(0,t.jsx)("span",{className:`text-xs ${"up"===n?"text-emerald-600 dark:text-emerald-400":"down"===n?"text-rose-600 dark:text-rose-400":"text-muted-foreground"}`,children:i}),o&&(0,t.jsx)("span",{className:"text-[11px] text-muted-foreground",children:o})]})]})})}e.s(["KpiCard",()=>m,"PageHeader",()=>c,"SectionCard",()=>d],862824)},342046,518550,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(522016),i=e.i(901752);let n=[{cardIndex:0,name:"SVD",equation:"A = UΣV^T",sciences:["genomics","audio","finance"],insightShort:"SVD IS the Fourier transform for data",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["SVD IS NumPy's universal decomposer — np.linalg.svd → PCA for genomics, audio compression, Fama-French risk factors.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:1,name:"Attention",equation:"softmax(QK^T/√d_k) × V",sciences:["protein folding","NLP"],insightShort:"Attention IS natural selection",hostPages:["transformer-deep-dive","analytics-outputs"],hostReasons:["DNA IS a language — softmax(QK^T/√d_k)×V parses both proteins (AlphaFold2) and English (GPT-4) because both are correlation detection.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:2,name:"Poisson",equation:"P(k) = λ^k e^(-λ) / k!",sciences:["sequencing","networks","decay"],insightShort:"Poisson IS the law of rare events",hostPages:["bioinformatics-pipelines","analytics-outputs"],hostReasons:["GATK variant calling depth IS Poisson(λ=mean coverage) — same distribution that sizes server clusters and radioactive sources.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:3,name:"FFT",equation:"X[k] = Σ x[n] e^(-2πikn/N)",sciences:["mass spec","audio","cryo-EM"],insightShort:"FFT IS the change of basis",hostPages:["numpy-scipy","analytics-outputs"],hostReasons:["np.fft.fft is the SAME operation whether you're finding the m/z of a compound, the C-note in a chord, or the 3D structure of a ribosome.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:4,name:"Verlet",equation:"r(t+Δt) = 2r(t) - r(t-Δt) + F/m·Δt²",sciences:["MD","games","orbits"],insightShort:"Verlet IS time-reversal symmetry",hostPages:["computational-biology","analytics-outputs"],hostReasons:["AMBER, Havok, and NASA JPL all call this exact integrator — symplectic, energy-conserving, time-reversible. The MD integrator IS the game physics integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:5,name:"Navier-Stokes",equation:"∂u/∂t + u·∇u = -∇p/ρ + ν∇²u",sciences:["weather","blood","turbulence"],insightShort:"Navier-Stokes IS the universe's flow equation",hostPages:["computational-physics","analytics-outputs"],hostReasons:["CFD on this PDE predicts hurricanes, aneurysm risk, and wing stall — the SAME nonlinearity makes weather unpredictable and turbulence beautiful.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:6,name:"Gradient Descent",equation:"θ(t+1) = θ(t) - η∇L(θ)",sciences:["ML","evolution","thermodynamics"],insightShort:"Gradient Descent IS the learning rule",hostPages:["tabular","analytics-outputs"],hostReasons:["Gradient boosting = gradient descent on trees; GPT-4 training, natural selection, and protein folding all minimise a landscape with the SAME update rule.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:7,name:"Bayes",equation:"P(H|D) = P(D|H)P(H) / P(D)",sciences:["genetics","spam","quantum"],insightShort:"Bayes IS the belief updater",hostPages:["alphamissense","analytics-outputs"],hostReasons:["AlphaMissense classifying a VUS IS Gmail classifying spam IS a Stern–Gerlach measurement — all three update P(H) given D.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:8,name:"Euler's Method",equation:"y(t+Δt) = y(t) + f(t,y)·Δt",sciences:["orbital mechanics","games","finance"],insightShort:"Euler IS the seed of all simulation",hostPages:["space-science","analytics-outputs"],hostReasons:["Satellite trajectory propagation (NASA GMAT), game-engine fixed-step physics (Unity), and Black-Scholes Monte Carlo all START from this one-line integrator.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:9,name:"Entropy",equation:"H = -Σ p log p",sciences:["information","thermodynamics","genetics"],insightShort:"Entropy IS the universal currency of disorder",hostPages:["systems-biology","analytics-outputs"],hostReasons:["Shannon measured message information, Boltzmann gas disorder, Haldane population heterozygosity — the SAME formula because all three quantify how spread out a distribution is.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:10,name:"Black-Scholes",equation:"C = S·N(d1) − K·e^(−rT)·N(d2)",sciences:["fintech","maritime","genetics"],insightShort:"Black-Scholes IS the universal option-pricing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["A Lloyd's underwriter pricing a 90-day cargo option, a CME quant pricing an SPX call, and a Fisher geneticist pricing an allele-substitution option all evaluate the SAME formula — the right-but-not-obligation to act on a stochastic payoff.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:11,name:"Haversine",equation:"d = 2R·arcsin(√(...))",sciences:["maritime","aviation","astronomy"],insightShort:"Haversine IS the universal great-circle distance",hostPages:["global-shipping","analytics-outputs"],hostReasons:["Rotterdam→Singapore sailing distance, LHR→JFK flight distance, and Sirius→Canopus angular separation all use the SAME formula — shortest-path distance on a sphere, invented 1805 (Bowring).","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:12,name:"Kelly Criterion",equation:"f* = (bp − q)/b = μ/σ²",sciences:["fintech","genetics","RL"],insightShort:"Kelly IS the universal bet-sizing equation",hostPages:["fintech","analytics-outputs"],hostReasons:["Ed Thorp's blackjack team (1960s), Jim Simons' Medallion Fund (1989-2024, 65% CAGR), Haldane's allele fixation (1927), and Thompson sampling (RL) all derive the SAME optimal bet size f* = μ/σ² because they all maximize expected log-growth.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:13,name:"Markov Chain",equation:"π(t+1) = π(t)·P",sciences:["genetics","fintech","maritime"],insightShort:"Markov IS the universal state-transition equation",hostPages:["global-shipping","bioinformatics","analytics-outputs"],hostReasons:["Jukes-Cantor DNA substitution (1969), Moody's credit transitions (10⁶ bonds), and AIS port-state transitions (100K vessels) all use the SAME matrix update — the memoryless property is universal.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:14,name:"Value at Risk",equation:"VaR_α = −(μ + z_α·σ)",sciences:["fintech","maritime","climate"],insightShort:"VaR IS the universal tail-risk equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["JPMorgan's 1-day 99% VaR ($4T balance, Basel III), Lloyd's 7-day 95% VaR ($50B hull, Solvency II), and NOAA 100-year flood VaR (FEMA FIRMs) all use the SAME quantile — every loss distribution has an inverse CDF.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:15,name:"PageRank",equation:"PR(p) = (1-d) + d·Σ(PR(q)/L(q))",sciences:["fintech","maritime","genetics"],insightShort:"PageRank IS the universal centrality equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["BIS systemic risk (Lehman PR ≈ 0.012), UN COMTRADE port chokepoint (Rotterdam PR ≈ 0.020), and STRING gene essentiality (TP53 PR ≈ 0.025) all use the SAME eigenvector — Brin & Page 1998 for the web, now spanning banking, trade, and genomics.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:16,name:"Kalman Filter",equation:"x̂(t+1) = x̂(t) + K·(z − H·x̂(t))",sciences:["maritime","aviation","genetics"],insightShort:"Kalman IS the universal state-estimation equation",hostPages:["global-shipping","analytics-outputs"],hostReasons:["AIS vessel tracking (100K vessels × 60s), ADS-B flight tracking (100K flights × 1s), and 1000-Genomes allele frequency tracking all use the SAME Bayesian update — Kalman 1960 invented this for Apollo navigation.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:17,name:"Monte Carlo",equation:"E[f(X)] ≈ (1/N)·Σ f(X_i)",sciences:["fintech","maritime","genetics"],insightShort:"Monte Carlo IS the universal estimation equation",hostPages:["fintech","global-shipping","monte-carlo","analytics-outputs"],hostReasons:["Option pricing (10⁶ GBM paths), port congestion (10⁵ vessel sims), and rare-variant permutation tests (10⁶ permutations) all use the SAME averaging — Metropolis 1946 invented this at Los Alamos for neutron transport.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:18,name:"Geometric Brownian Motion",equation:"dS = μS·dt + σS·dW",sciences:["fintech","maritime","genetics"],insightShort:"GBM IS the universal multiplicative-noise equation",hostPages:["fintech","global-shipping","analytics-outputs"],hostReasons:["SPX daily returns (Black-Scholes foundation), Rotterdam container dwell times, and Wright-Fisher allele drift all use the SAME SDE — multiplicative noise keeps S positive with log-normal stationarity.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:19,name:"Lloyd's Algorithm",equation:"μ_k ← mean({x : argmin_k ‖x − μ_k‖²})",sciences:["maritime","genetics","ML"],insightShort:"Lloyd IS the universal clustering equation",hostPages:["global-shipping","systems-biology","analytics-outputs"],hostReasons:["50K ports clustered by trade flows (UN COMTRADE), 2504 individuals clustered by SNP PCA (1000-Genomes), and 1.4M images clustered by ResNet-50 (ImageNet) all use the SAME iterate — Lloyd 1957 invented this at Bell Labs for PCM.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:20,name:"HyperLogLog",equation:"E = α_m m² (Σ 2^(-M_j))^(-1)",sciences:["data engineering","genomics","network security"],insightShort:"HLL IS the universal counter — 33M× memory compression with <1% error",hostPages:["big-data-ingestion","analytics-outputs"],hostReasons:["COUNT(DISTINCT user_id) in Snowflake/Spark, unique k-mers in Jellyfish (genome assembler), unique source IPs in Redis PFCOUNT (DDoS monitor) — all run the SAME hash→bucket→max-zeros→harmonic-mean algorithm. 12 KB vs 400 GB for exact counting.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:21,name:"Bloom Filter",equation:"P(fp) = (1 - e^(-kn/m))^k",sciences:["network security","genomics","databases"],insightShort:"Bloom filter IS the universal membership test — 23× compression with 0.1% false positives",hostPages:["kafka-connect","delta-lake","analytics-outputs"],hostReasons:["Chrome Safe Browsing (malware URL check), genome assembler read dedup, RocksDB SSTable key lookup — all use the SAME k-hash→bit-set→AND-check. 175 MB vs 4 GB for exact hash set.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:22,name:"Consistent Hashing",equation:"θ = hash(key) mod 2^256",sciences:["streaming","CDN","databases"],insightShort:"Consistent hashing IS the universal partitioner — K/n keys move, not all K",hostPages:["kafka","schema-registry","analytics-outputs"],hostReasons:["Kafka partition assignment across brokers, Akamai CDN edge routing, Cassandra shard assignment — all use the SAME hash ring. Adding a node moves 8% of data, not 50%.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:23,name:"LSM-Tree Compaction",equation:"WA = (L+1)/L",sciences:["data engineering","databases","distributed storage"],insightShort:"LSM compaction IS the universal write amplifier — 1.25× vs B-tree's 4-10×",hostPages:["delta-lake","big-data-ingestion","analytics-outputs"],hostReasons:["Delta Lake Auto Compaction (18,400→12 files), RocksDB level compaction (L0→L1→L2→L3), Cassandra size-tiered compaction — all use the SAME merge-sort. Write amplification 1.25× vs B-tree's 4-10×.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:24,name:"Count-Min Sketch",equation:"ê_i = min_j count[j][h_j(i)]",sciences:["streaming","genomics","networking"],insightShort:"CMS IS the universal frequency estimator — 4M× compression, bounded over-estimation",hostPages:["spark-streaming","flink","analytics-outputs"],hostReasons:["Spark Structured Streaming top-K, genome k-mer frequency counting (repeat detection), network heavy-hitter detection (DDoS) — all use the SAME d×w matrix. 20 KB vs 80 GB for exact hash map.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:25,name:"Reservoir Sampling",equation:"P(item_i in sample) = k/N",sciences:["streaming","A/B testing","genomics"],insightShort:"Reservoir IS the universal sampler — O(k) memory, uniform sampling from unbounded stream",hostPages:["spark-streaming","streaming-sql","analytics-outputs"],hostReasons:["Kafka stream event sampling, A/B test cohort selection from live users, GWAS variant subsampling — all use the SAME k/N replace-probability algorithm. O(k) memory regardless of stream length.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:26,name:"T-Digest",equation:"q̂(p) = merge(centroids)",sciences:["streaming","finance","observability"],insightShort:"T-Digest IS the universal quantile estimator — 80M× compression at the tails",hostPages:["spark-streaming","fintech","analytics-outputs"],hostReasons:["p99 latency in Spark, p99 VaR in Basel III Monte Carlo, p99 response time in Datadog — all use the SAME centroid-merging algorithm. 1 KB vs 80 GB for exact sorted array.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:27,name:"Cuckoo Filter",equation:"i2 = i1 XOR hash(fingerprint)",sciences:["databases","networking","caching"],insightShort:"Cuckoo Filter IS Bloom's successor — same membership test, PLUS deletion support",hostPages:["delta-lake","analytics-outputs"],hostReasons:["Cassandra SSTable with dynamic keys, routing table add/remove, Redis cache invalidation — all need membership test WITH deletion. Bloom can't delete; Cuckoo can.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]},{cardIndex:28,name:"Skip List",equation:"P(level L) = (1/2)^L",sciences:["databases","storage","compilers"],insightShort:"Skip List IS the universal ordered structure — O(log n) without tree rebalancing",hostPages:["duckdb","analytics-outputs"],hostReasons:["Redis ZSET (leaderboard), LevelDB/RocksDB memtable (sorted KV before SSTable flush), LLVM instruction scheduler — all use the SAME probabilistic linking. No rebalancing needed.","Layer 5 visualization on /analytics-outputs — the chart/heatmap/3D companion to this card's math, code, tools, and analysis."]}];function o(e){return n.filter(t=>t.hostPages.includes(e))}let r={0:[3,9,19],1:[0,6,7],2:[7,9,13],3:[0,2,8],4:[8,5,16],5:[4,18,8],6:[7,12,1],7:[6,2,16],8:[4,18,16],9:[0,2,19],10:[18,14,12],11:[15,16,17],12:[6,10,7],13:[2,16,15],14:[10,18,17],15:[13,0,11],16:[13,4,7],17:[18,14,9],18:[10,8,17],19:[0,9,6]};function l(e){return r[e]??[]}e.s(["ELEGANT_CODE_MAP",0,n,"cardsOnHostPage",()=>o,"recommendedCards",()=>l],518550);var d=e.i(487486),c=e.i(394908),m=e.i(972520);let h="discovery-path-visited";function p({relatedPages:e=[]}){let[o,r]=(0,a.useState)(()=>{try{let e=localStorage.getItem(h);return e?JSON.parse(e):[]}catch{return[]}});(0,a.useEffect)(()=>{try{let e=localStorage.getItem(h);if(e){let t=JSON.parse(e);setTimeout(()=>r(t),0)}}catch{}},[]);let p=(0,a.useMemo)(()=>{let t=[];if(o.length>0){let e={};for(let t of o)for(let a of l(t))o.includes(a)||(e[a]=(e[a]??0)+1);for(let[a,s]of Object.entries(e).sort((e,t)=>t[1]-e[1]).slice(0,3)){let e=n[Number(a)];e&&t.push({id:"elegant-code",reason:`Explore ${e.name} — recommended by ${s} of your visited cards`,isCousin:!0})}}for(let a of e){if(t.length>=3)break;t.find(e=>e.id===a.id)||t.push({...a,isCousin:!1})}return 0===t.length&&(t.push({id:"elegant-code",reason:"Start with the 20 elegant-code cards",isCousin:!1}),t.push({id:"connections",reason:"See the card → card graph",isCousin:!1}),t.push({id:"resources",reason:"Browse datasets, papers, libraries",isCousin:!1})),t.slice(0,3)},[o,e]);return 0===p.length?null:(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3",children:[(0,t.jsxs)("p",{className:"text-xs font-semibold text-primary mb-2 flex items-center gap-1.5",children:[(0,t.jsx)(c.Compass,{className:"h-3.5 w-3.5"}),"Next steps — where to go from here",o.length>0&&(0,t.jsxs)("span",{className:"text-[9px] text-muted-foreground ml-1",children:["(",o.length," cards explored)"]})]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-2",children:p.map((e,a)=>(0,t.jsxs)(s.default,{href:(0,i.hrefFor)(e.id),className:"text-xs text-primary hover:underline flex items-center gap-1",children:[(0,t.jsx)(m.ArrowRight,{className:"h-3 w-3"}),e.reason,e.isCousin&&(0,t.jsx)(d.Badge,{variant:"outline",className:"text-[8px] px-1 py-0 ml-1",children:"cousin"})]},a))})]})}e.s(["NextSteps",()=>p],342046)},332017,e=>{"use strict";var t=e.i(843476),a=e.i(522016),s=e.i(25652),i=e.i(810980),n=e.i(901752);function o({title:e,connectedTo:o,researchHref:r,children:l}){return(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-4 space-y-2",children:[(0,t.jsxs)("div",{className:"flex items-start gap-2",children:[(0,t.jsx)(s.TrendingUp,{className:"h-4 w-4 text-primary mt-0.5 shrink-0"}),(0,t.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,t.jsx)("p",{className:"text-sm font-semibold text-foreground/90 leading-tight",children:e}),o&&(0,t.jsxs)("div",{className:"flex items-center gap-1.5 mt-1",children:[(0,t.jsx)(i.BookOpen,{className:"h-3 w-3 text-muted-foreground"}),(0,t.jsxs)(a.default,{href:r??(0,n.hrefFor)("research"),className:"text-[10px] text-muted-foreground hover:text-primary hover:underline",children:["Connected to: ",o," →"]})]})]})]}),(0,t.jsx)("div",{className:"text-xs text-muted-foreground leading-relaxed space-y-2 pl-6",children:l})]})}function r({pageTitle:e,children:a}){return(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 border-b border-border/60 pb-2",children:[(0,t.jsx)(s.TrendingUp,{className:"h-5 w-5 text-primary"}),(0,t.jsxs)("h2",{className:"text-base font-bold text-foreground/90",children:["My deeper thoughts — ",e]})]}),(0,t.jsx)("p",{className:"text-xs text-muted-foreground italic leading-relaxed",children:"These are not summaries. They are arguments — the kind of connections a reader with serious grey matter would make after living with the material for years. Each thought connects to the platform's research section (ADRs, papers, decision records) so it's traceable, not just opinionated."}),(0,t.jsx)("div",{className:"space-y-3",children:a})]})}e.s(["DeeperThought",()=>o,"DeeperThoughtSection",()=>r])},431343,63209,595468,868054,e=>{"use strict";var t=e.i(451477);e.s(["Play",()=>t.default],431343);var a=e.i(361653);e.s(["AlertCircle",()=>a.default],63209);var s=e.i(123287);e.s(["CheckCircle2",()=>s.default],595468);var i=e.i(249988);e.s(["Terminal",()=>i.default],868054)},716675,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(846932),i=e.i(88653),n=e.i(519455),o=e.i(487486),r=e.i(431343),l=e.i(531278),d=e.i(63209),c=e.i(595468),m=e.i(868054);let h=null,p="0.26.2",u=`https://cdn.jsdelivr.net/pyodide/v${p}/full/`;async function f(){return h||(h=(async()=>(await new Promise((e,t)=>{if(window.loadPyodide)return void e();let a=document.createElement("script");a.src=`${u}pyodide.js`,a.onload=()=>e(),a.onerror=()=>t(Error("Failed to load Pyodide bootstrap")),document.head.appendChild(a)}),await window.loadPyodide({indexURL:u})))())}function g({code:e,buttonLabel:h="Run in browser",preamble:u,compact:g=!1,onOutput:x,hideTextOutput:y=!1}){let[b,v]=(0,a.useState)("idle"),[_,w]=(0,a.useState)(""),[j,S]=(0,a.useState)(null),[k,D]=(0,a.useState)(null),N=(0,a.useRef)(null),T=(0,a.useCallback)(async()=>{v("loading"),S(null),w("Loading Pyodide runtime (~10MB)…\n");let t=performance.now();try{let a=await f(),s=Math.round(performance.now()-t);D(s);let i=[],n=e=>{i.push(e)};try{a.setStdout({batched:n}),a.setStderr({batched:n})}catch{try{a.setStdout(n),a.setStderr(n)}catch{}}let o=(u??"")+"\n"+e,r=[];if(/\bnumpy\b|\bnp\./.test(o)&&r.push("numpy"),/\bscipy\b|\bsp\./.test(o)&&r.push("scipy"),/\bsklearn\b|\bGradientBoosting\b|\bRandomForest\b|\btrain_test_split\b|\bKMeans\b|\bSVC\b|\bLogisticRegression\b/.test(o)&&r.push("scikit-learn"),/\bpandas\b|\bpd\./.test(o)&&r.push("pandas"),/\bpyarrow\b|\bpq\./.test(o)&&r.push("pyarrow"),r.length>0)try{await a.loadPackage(r)}catch{}v("running"),w(`Pyodide loaded in ${s}ms. Running…

`),u&&await a.runPythonAsync(u),await a.runPythonAsync(e);let l=i.join("");w(e=>e+(l||"(no output)")),v("done"),x&&x(l)}catch(t){let e=t instanceof Error?t.message:String(t);S(e),v("error"),w(t=>t+`
Error: ${e}`)}},[e,u,x]);return(0,a.useEffect)(()=>{N.current&&(N.current.scrollTop=N.current.scrollHeight)},[_]),(0,t.jsxs)("div",{className:`mt-3 ${g?"":"rounded-md border border-primary/30 bg-primary/3 p-3"}`,children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsxs)(n.Button,{size:g?"sm":"default",variant:"running"===b||"loading"===b?"outline":"default",className:"gap-1.5",onClick:T,disabled:"loading"===b||"running"===b,children:["loading"===b||"running"===b?(0,t.jsx)(l.Loader2,{className:"h-3.5 w-3.5 animate-spin"}):"done"===b?(0,t.jsx)(c.CheckCircle2,{className:"h-3.5 w-3.5"}):"error"===b?(0,t.jsx)(d.AlertCircle,{className:"h-3.5 w-3.5"}):(0,t.jsx)(r.Play,{className:"h-3.5 w-3.5"}),h]}),!g&&(0,t.jsxs)(o.Badge,{variant:"outline",className:"text-[10px] gap-1",children:[(0,t.jsx)(m.Terminal,{className:"h-2.5 w-2.5"}),"Pyodide v",p]}),null!==k&&"done"===b&&(0,t.jsxs)("span",{className:"text-[10px] text-muted-foreground",children:["Runtime: ",k,"ms load + execution"]})]}),(0,t.jsx)(i.AnimatePresence,{children:("idle"!==b||_)&&!y&&(0,t.jsx)(s.motion.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},className:"mt-2",children:(0,t.jsx)("div",{ref:N,className:`rounded-md bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] p-2.5 text-[11px] font-mono leading-relaxed overflow-x-auto code-scroll max-h-64 overflow-y-auto ${j?"border border-rose-500/40":"border border-emerald-500/30"}`,children:(0,t.jsx)("pre",{className:"whitespace-pre-wrap",children:_})})})})]})}e.s(["PyodideRunner",()=>g])},643531,e=>{"use strict";var t=e.i(678745);e.s(["Check",()=>t.default])},174886,e=>{"use strict";var t=e.i(991124);e.s(["Copy",()=>t.default])},122836,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(643531),i=e.i(174886),n=e.i(519455);function o({code:e,language:o="sql",filename:r,highlight:l=[]}){let[d,c]=(0,a.useState)(!1),m=e.replace(/\n$/,"").split("\n"),h=async()=>{try{await navigator.clipboard.writeText(e),c(!0),setTimeout(()=>c(!1),1500)}catch{}};return(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-[oklch(0.16_0.005_240)] text-[oklch(0.97_0.005_60)] overflow-hidden",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-white/5",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-[11px] text-white/60 font-mono",children:[(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-rose-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-amber-400"}),(0,t.jsx)("span",{className:"h-2 w-2 rounded-full bg-emerald-400"}),(0,t.jsx)("span",{className:"ml-2 uppercase tracking-wider",children:o}),r&&(0,t.jsxs)("span",{className:"text-white/40",children:["· ",r]})]}),(0,t.jsxs)(n.Button,{variant:"ghost",size:"sm",className:"h-6 px-2 text-[11px] text-white/70 hover:text-white hover:bg-white/10",onClick:h,"aria-label":"Copy code",children:[d?(0,t.jsx)(s.Check,{className:"h-3 w-3 mr-1"}):(0,t.jsx)(i.Copy,{className:"h-3 w-3 mr-1"}),d?"Copied":"Copy"]})]}),(0,t.jsx)("pre",{className:"code-scroll overflow-x-auto p-3 text-[12.5px] leading-relaxed font-mono",children:(0,t.jsx)("code",{children:m.map((e,a)=>{let s=a+1,i=l.includes(s);return(0,t.jsxs)("div",{className:["flex",i?"bg-primary/20 -mx-3 px-3 border-l-2 border-primary":""].join(" "),children:[(0,t.jsx)("span",{className:"select-none text-white/30 w-8 inline-block text-right pr-3 shrink-0",children:s}),(0,t.jsx)("span",{className:"whitespace-pre",children:e||" "})]},s)})})})]})}function r({children:e}){return(0,t.jsx)("code",{className:"rounded bg-muted px-1.5 py-0.5 text-[12px] font-mono text-foreground/90 border border-border/60",children:e})}e.s(["CodeBlock",()=>o,"InlineCode",()=>r])},167174,e=>{"use strict";e.i(247167);var t=e.i(843476),a=e.i(271645),s=e.i(846932),i=e.i(88653),n=e.i(37727),o=e.i(778917),r=e.i(500187),r=r;function l(e){let t="/Demo4AppDataSci";return e.startsWith("/")&&t?`${t}${e}`:e}function d({src:e,alt:d,caption:c,thumbWidth:m=280,allowNewTab:h=!0,float:p}){let[u,f]=(0,a.useState)(!1);(0,a.useEffect)(()=>{if(!u)return;let e=e=>{"Escape"===e.key&&f(!1)};return window.addEventListener("keydown",e),document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",e),document.body.style.overflow=""}},[u]);let g=(0,a.useCallback)(()=>{window.open(l(e),"_blank","noopener,noreferrer")},[e]);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s.motion.button,{type:"button",onClick:()=>f(!0),className:"relative group rounded-md overflow-hidden border border-border/60 hover:border-primary/60 transition-colors shadow-sm",style:{width:m,..."left"===p?{float:"left",marginRight:"1rem",marginBottom:"0.5rem"}:"right"===p?{float:"right",marginLeft:"1rem",marginBottom:"0.5rem"}:{}},whileHover:{scale:1.02},whileTap:{scale:.98},children:[(0,t.jsx)("img",{src:l(e),alt:d,width:m,className:"w-full h-auto block",loading:"lazy"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center",children:(0,t.jsx)(s.motion.div,{initial:{opacity:0,scale:.8},whileHover:{opacity:1,scale:1},className:"opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-full p-2 border border-border",children:(0,t.jsx)(r.default,{className:"h-4 w-4 text-primary"})})})]}),(0,t.jsx)(i.AnimatePresence,{children:u&&(0,t.jsxs)(s.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8",onClick:()=>f(!1),children:[(0,t.jsx)("button",{type:"button",onClick:()=>f(!1),className:"absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 border border-border hover:bg-accent transition-colors","aria-label":"Close",children:(0,t.jsx)(n.X,{className:"h-5 w-5"})}),h&&(0,t.jsxs)("button",{type:"button",onClick:e=>{e.stopPropagation(),g()},className:"absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-background/80 border border-border hover:bg-accent transition-colors text-xs font-medium flex items-center gap-1.5",children:[(0,t.jsx)(o.ExternalLink,{className:"h-3.5 w-3.5"}),"Open in new tab"]}),(0,t.jsxs)(s.motion.div,{initial:{scale:.95,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.95,opacity:0},transition:{duration:.25},className:"relative max-w-[95vw] max-h-[90vh] flex flex-col items-center",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("img",{src:l(e),alt:d,className:"max-w-full max-h-[80vh] object-contain rounded-lg border-2 border-border/60 shadow-2xl"}),c&&(0,t.jsx)("p",{className:"mt-3 text-sm text-foreground/90 text-center max-w-2xl",children:c})]})]})})]})}e.s(["ImageModal",()=>d],167174)},38982,e=>{"use strict";var t=e.i(240250);e.s(["FlaskConical",()=>t.default])},422972,e=>{"use strict";var t=e.i(843476),a=e.i(271645),s=e.i(846932),i=e.i(522016),n=e.i(862824),o=e.i(342046),r=e.i(122836),l=e.i(716675),d=e.i(167174),c=e.i(901752),m=e.i(487486),h=e.i(966992),p=e.i(39312),u=e.i(25652),f=e.i(868054),g=e.i(455711),x=e.i(38982),y=e.i(332017);let b=[{label:"EDM",value:"DDPM on R^(N×3)",hint:"SE(3)-equivariant 3D molecule diffusion",deltaTone:"flat"},{label:"DiffDock",value:"20%+ vs AutoDock",hint:"Diffusion over binding poses (Corso 2023)",deltaTone:"flat"},{label:"GFlowNet",value:"Match reward dist.",hint:"Diverse candidates (not mode-collapsed)",deltaTone:"flat"},{label:"Sinkhorn",value:"W_ε = min⟨T,C⟩+εH(T)",hint:"Geometry-aware molecular similarity",deltaTone:"flat"}];function v(){let[e,i]=(0,a.useState)(0);return(0,a.useEffect)(()=>{let e=setInterval(()=>i(e=>(e+1)%5),900);return()=>clearInterval(e)},[]),(0,t.jsxs)("div",{className:"rounded-md border border-border/60 bg-card p-4",children:[(0,t.jsx)("style",{children:".sk-3d { perspective: 800px; } .sk-stage { transform: rotateX(15deg); transform-style: preserve-3d; }"}),(0,t.jsxs)("p",{className:"text-sm font-semibold mb-3 flex items-center gap-2",children:[(0,t.jsx)(x.FlaskConical,{className:"h-4 w-4 text-primary"})," Sinkhorn optimal transport — molecular similarity (loop) ",(0,t.jsx)("span",{className:"text-[10px] font-mono text-muted-foreground ml-auto",children:["1. Two molecule distributions (atoms)","2. Cost matrix C_ij = |x_i - y_j|²","3. Sinkhorn iterations: T_ij ← K_ij · u_i · v_j","4. Transport plan converges","5. Wasserstein distance = ⟨T*, C⟩"][e]})]}),(0,t.jsx)("div",{className:"sk-3d",children:(0,t.jsx)("div",{className:"sk-stage flex justify-center",children:(0,t.jsxs)("svg",{width:"340",height:"200",viewBox:"0 0 340 200",children:[0===e&&(0,t.jsxs)(s.motion.g,{initial:{opacity:0},animate:{opacity:1},children:[[[60,50],[80,70],[40,80]].map(([e,a],s)=>(0,t.jsx)("circle",{cx:e,cy:a,r:"5",fill:"oklch(0.55 0.16 250)"},`a${s}`)),[[260,50],[280,80],[240,90]].map(([e,a],s)=>(0,t.jsx)("circle",{cx:e,cy:a,r:"5",fill:"oklch(0.55 0.16 165)"},`b${s}`)),(0,t.jsx)("text",{x:"80",y:"120",textAnchor:"middle",fontSize:"9",fill:"oklch(0.55 0.16 250)",children:"Molecule A"}),(0,t.jsx)("text",{x:"260",y:"120",textAnchor:"middle",fontSize:"9",fill:"oklch(0.55 0.16 165)",children:"Molecule B"})]}),1===e&&(0,t.jsxs)(s.motion.g,{initial:{opacity:0},animate:{opacity:1},children:[[[60,50],[80,70],[40,80]].map(function(e,a){return[[260,50],[280,80],[240,90]].map(function(s,i){return(0,t.jsx)("line",{x1:e[0],y1:e[1],x2:s[0],y2:s[1],stroke:"var(--muted)",strokeWidth:.5,opacity:.3},"c-"+a+"-"+i)})}),(0,t.jsx)("text",{x:"170",y:"150",textAnchor:"middle",fontSize:"9",fill:"var(--muted-foreground)",children:"Cost matrix C_ij"})]}),e>=2&&e<=3&&(0,t.jsxs)(s.motion.g,{initial:{opacity:0},animate:{opacity:1},children:[[[60,50],[80,70],[40,80]].map(function(a,i){return[[260,50],[280,80],[240,90]].map(function(n,o){var r=2===e?.3:.5;return(0,t.jsx)(s.motion.line,{x1:a[0],y1:a[1],x2:n[0],y2:n[1],stroke:"oklch(0.6 0.15 75)",strokeWidth:r,initial:{opacity:0},animate:{opacity:r}},"t-"+i+"-"+o)})}),(0,t.jsx)("text",{x:"170",y:"150",textAnchor:"middle",fontSize:"9",fill:"oklch(0.6 0.15 75)",children:2===e?"Sinkhorn iterations...":"Transport plan converged"})]}),4===e&&(0,t.jsxs)(s.motion.g,{initial:{opacity:0},animate:{opacity:1},children:[[[60,50],[80,70],[40,80]].map(function(e,a){return[[260,50],[280,80],[240,90]].map(function(s,i){var n=[.5,.1,.4][i];return(0,t.jsx)("line",{x1:e[0],y1:e[1],x2:s[0],y2:s[1],stroke:"oklch(0.55 0.16 165)",strokeWidth:3*n},"w-"+a+"-"+i)})}),(0,t.jsx)("rect",{x:"100",y:"160",width:"140",height:"25",rx:"4",fill:"oklch(0.55 0.16 165 / 0.1)",stroke:"oklch(0.55 0.16 165)",strokeWidth:"1"}),(0,t.jsx)("text",{x:"170",y:"177",textAnchor:"middle",fontSize:"10",fill:"oklch(0.55 0.16 165)",fontWeight:"bold",children:"W = 2.3"})]})]})})}),(0,t.jsx)("p",{className:"text-[10px] text-muted-foreground text-center mt-3",children:"Phase 1: two molecule distributions. Phase 2: cost matrix. Phase 3-4: Sinkhorn iterations converge. Phase 5: Wasserstein distance = transport cost."})]})}let _=`# Generative Chemistry 2.0 — EDM + DiffDock + GFlowNet + Sinkhorn (Pyodide)
import math, random

# ============================================================
# 1. Sinkhorn optimal transport — geometry-aware molecular similarity
# ============================================================
# W_ε(μ, ν) = min_T ⟨T, C⟩ + ε\xb7H(T)
# where C_ij = |x_i - y_j|\xb2, H(T) = -Σ T_ij\xb7log(T_ij)
# Sinkhorn: T_ij = K_ij \xb7 u_i \xb7 v_j (alternating scaling)

def sinkhorn(x, y, eps=0.1, n_iter=50):
    """Sinkhorn algorithm for entropic OT.
    
    Args:
        x: (n, d) source points (atoms of molecule A)
        y: (m, d) target points (atoms of molecule B)
        eps: regularization parameter
    
    Returns: (transport_plan, wasserstein_distance)
    """
    n, m = len(x), len(y)
    # Cost matrix
    C = [[sum((x[i][k]-y[j][k])**2 for k in range(len(x[0]))) for j in range(m)] for i in range(n)]
    # Kernel K_ij = exp(-C_ij / eps)
    K = [[math.exp(-C[i][j] / eps) for j in range(m)] for i in range(n)]
    # Sinkhorn iterations
    u = [1.0/n]*n
    v = [1.0/m]*m
    for _ in range(n_iter):
        # u ← 1 / (K @ v)
        for i in range(n):
            s = sum(K[i][j] * v[j] for j in range(m))
            u[i] = 1.0 / s if s > 0 else 1e-10
        # v ← 1 / (K^T @ u)
        for j in range(m):
            s = sum(K[i][j] * u[i] for i in range(n))
            v[j] = 1.0 / s if s > 0 else 1e-10
    # Transport plan
    T = [[K[i][j] * u[i] * v[j] for j in range(m)] for i in range(n)]
    # Wasserstein distance
    W = sum(T[i][j] * C[i][j] for i in range(n) for j in range(m))
    return T, W

print("=" * 60)
print("Sinkhorn Optimal Transport — Molecular Similarity")
print("=" * 60)
random.seed(42)
# Molecule A: 3 atoms
mol_A = [[random.gauss(0, 1) for _ in range(3)] for _ in range(3)]
# Molecule B: 3 atoms (similar to A)
mol_B = [[a + random.gauss(0, 0.3) for a in atom] for atom in mol_A]
# Molecule C: 3 atoms (different from A)
mol_C = [[random.gauss(5, 1) for _ in range(3)] for _ in range(3)]

T_AB, W_AB = sinkhorn(mol_A, mol_B, eps=0.1)
T_AC, W_AC = sinkhorn(mol_A, mol_C, eps=0.1)

print(f"\\nMolecule A: {[[f'{v:.2f}' for v in a] for a in mol_A]}")
print(f"Molecule B: {[[f'{v:.2f}' for v in a] for a in mol_B]} (similar to A)")
print(f"Molecule C: {[[f'{v:.2f}' for v in a] for a in mol_C]} (different from A)")
print(f"\\nWasserstein distance:")
print(f"  W(A, B) = {W_AB:.4f} (similar — small distance)")
print(f"  W(A, C) = {W_AC:.4f} (different — large distance)")
print(f"  Ratio: W(A,C)/W(A,B) = {W_AC/W_AB:.1f}\xd7")

# Compare to Tanimoto (ADR-035 — 2D-only, no geometry)
print(f"\\n  → Tanimoto (ADR-035) ignores 3D geometry")
print(f"    Sinkhorn respects spatial shape — more informative")
print(f"    Geometry-aware: W measures 'work' to transform A into B")

# ============================================================
# 2. EDM diffusion — 3D molecule generation
# ============================================================
print(f"\\n{'=' * 60}")
print("EDM — Equivariant Diffusion Model (Hoogeboom 2022)")
print("=" * 60)
print("""
Architecture:
  - Data: x = (positions ∈ R^{N\xd73}, atom_types ∈ Z^N)
  - Forward: q(x_t | x_0) = N(√ᾱ_t \xb7 x_0, (1-ᾱ_t) \xb7 I)
    (same DDPM as ADR-027, but on R^{N\xd73} coordinates)
  - Reverse: p_θ(x_{t-1} | x_t) = N(μ_θ, σ_t \xb7 I)
    where θ = SE(3)-equivariant denoising network
  
Key: the noise is E(3)-equivariant — rotating input rotates output.
Same math as RFdiffusion (ADR-044) but on small molecules, not proteins.

Training: predict noise ε_θ(x_t, t, atom_types)
Sampling: reverse diffusion from x_T ~ N(0, I) → x_0 = new molecule

Production: generates novel 3D molecules not in training set.
Explores 10^60 chemical space via learned latent manifold.
""")

# ============================================================
# 3. GFlowNet — reward-matched generation
# ============================================================
print(f"{'=' * 60}")
print("GFlowNet — Generative Flow Network (Bengio 2023)")
print("=" * 60)
print("""
GFlowNet frames molecular design as an MDP:
  - States: partial molecules (atoms + bonds added sequentially)
  - Actions: add atom / add bond / terminate
  - Reward: R(x) = property score (e.g. binding affinity)
  - Objective: match the reward DISTRIBUTION (not maximise)

Key difference from RL (ADR-019):
  - RL: maximize E[R(x)] → mode collapse (all samples near optimum)
  - GFlowNet: match P(x) ∝ R(x) → diverse samples matching reward

Training: trajectory balance loss
  L = (log Z \xb7 Π_t P_F(s_{t+1}|s_t) - R(x) \xb7 Π_t P_B(s_t|s_{t+1}))\xb2

The flow network learns P_F (forward policy) and P_B (backward).
At inference: sample from P_F → diverse high-reward molecules.

Connection to ADR-019 (bandit): 
  - Bandit: 1-step decision, Thompson sampling
  - GFlowNet: multi-step MDP, flow matching
  - Both: sample from posterior/reward, not maximise
""")

# ============================================================
# 4. DiffDock — diffusion-based docking
# ============================================================
print(f"{'=' * 60}")
print("DiffDock — Diffusion-Based Docking (Corso 2023)")
print("=" * 60)
print("""
DiffDock replaces AutoDock Vina (ADR-036) with learned diffusion:

  Input: protein structure + ligand SMILES
  Output: binding pose (translation + rotation + torsion)

  Method: reverse diffusion over SE(3) manifold
  - Translation: R^3 diffusion (standard DDPM)
  - Rotation: SO(3) diffusion (on the manifold, not Euclidean)
  - Torsion: torus diffusion (periodic angles)

  Performance:
    - Top-1 RMSD &lt; 2\xc5: 38% (DiffDock) vs 23% (Vina)
    - 20%+ improvement over all baselines
    - 60\xd7 faster than Vina at inference

  Key: the SE(3) manifold IS the configuration space of docking.
  Diffusion on manifolds (not Euclidean) preserves geometry.
""")

# ============================================================
# 5. Sinkhorn vs Tanimoto comparison
# ============================================================
print(f"\\n{'=' * 60}")
print("Comparison: Sinkhorn (3D) vs Tanimoto (2D)")
print("=" * 60)
print("""
  Metric         | Modality | Geometry-aware? | Complexity
  ---------------|----------|-----------------|------------
  Tanimoto       | 2D graph | No              | O(n) per pair
  Sinkhorn       | 3D coords| Yes             | O(n\xb2\xb7k) per pair
  Wasserstein-p  | 3D dist  | Yes             | O(n\xb3) exact
  
  Trade-off: Sinkhorn is more informative but more expensive.
  For 100M compound library: Tanimoto (HNSW) is ms per query.
  Sinkhorn: ~100ms per pair (100\xd7 slower).
  
  Hybrid: use Tanimoto for fast pre-filter, Sinkhorn for top-100 rerank.
""")
print("=" * 60)`,w=`import torch
import torch.nn as nn
import torch.nn.functional as F
import math
from typing import Dict, Tuple, List, Optional

# ============================================================
# 1. Sinkhorn optimal transport (entropic regularisation)
# ============================================================

class SinkhornDistance(nn.Module):
    """Sinkhorn distance with entropic regularisation.
    
    W_ε(μ, ν) = min_T ⟨T, C⟩ + ε\xb7H(T)
    
    where C_ij = |x_i - y_j|\xb2, H(T) = -Σ T_ij\xb7log(T_ij)
    
    Production: used for 3D molecular similarity (replaces Tanimoto for 3D).
    """
    def __init__(self, eps: float = 0.1, n_iter: int = 50, 
                 reduction: str = 'mean'):
        super().__init__()
        self.eps = eps
        self.n_iter = n_iter
        self.reduction = reduction
    
    def forward(self, x: torch.Tensor, y: torch.Tensor) -> torch.Tensor:
        """Compute Sinkhorn distance.
        
        Args:
            x: (B, N, D) source atoms (molecule A)
            y: (B, M, D) target atoms (molecule B)
        
        Returns: (B,) Sinkhorn distance per batch
        """
        B, N, D = x.shape
        M = y.shape[1]
        
        # Cost matrix: C_ij = |x_i - y_j|\xb2
        # (B, N, M) — pairwise squared distances
        C = torch.cdist(x, y, p=2) ** 2  # (B, N, M)
        
        # Kernel: K_ij = exp(-C_ij / eps)
        K = torch.exp(-C / self.eps)
        
        # Sinkhorn iterations (log-domain for stability)
        log_K = torch.log(K + 1e-30)
        log_u = torch.zeros(B, N, device=x.device)
        log_v = torch.zeros(B, M, device=x.device)
        
        for _ in range(self.n_iter):
            # log_u ← log(1) - logsumexp(log_K + log_v)
            log_u = -torch.logsumexp(log_K + log_v.unsqueeze(1), dim=-1)
            # log_v ← log(1) - logsumexp(log_K + log_u.unsqueeze(2)
            log_v = -torch.logsumexp(log_K + log_u.unsqueeze(2), dim=-2)
        
        # Transport plan: T_ij = K_ij \xb7 u_i \xb7 v_j
        log_T = log_K + log_u.unsqueeze(2) + log_v.unsqueeze(1)
        T = torch.exp(log_T)
        
        # Wasserstein distance: W = ⟨T, C⟩
        W = (T * C).sum(dim=(-2, -1))  # (B,)
        
        if self.reduction == 'mean':
            return W.mean()
        return W

# ============================================================
# 2. Equivariant Diffusion Model (EDM) for 3D molecule generation
# ============================================================

class EDMDenoiser(nn.Module):
    """Equivariant Diffusion Model denoising network (Hoogeboom 2022).
    
    Predicts noise ε_θ(x_t, t, atom_types) where x_t ∈ R^{N\xd73}.
    
    Architecture:
        - Atom embedding (per element)
        - Time embedding (sinusoidal)
        - SE(3)-equivariant message passing (E(n)-equivariant, like ADR-036)
        - Noise prediction head (per-atom 3D vector)
    
    Production: trained on QM9 (130K molecules) or GEOM (5M conformers).
    """
    def __init__(self, n_atom_types: int = 20, hidden_dim: int = 128,
                 n_layers: int = 4, n_heads: int = 4,
                 n_diffusion_steps: int = 1000):
        super().__init__()
        self.n_diffusion_steps = n_diffusion_steps
        
        # Atom embedding
        self.atom_embed = nn.Embedding(n_atom_types, hidden_dim)
        
        # Time embedding (sinusoidal, like ADR-034 ESM-2)
        self.time_embed = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, hidden_dim),
        )
        
        # SE(3)-equivariant message passing layers
        # (simplified — production uses e3nn or similar)
        self.layers = nn.ModuleList([
            nn.TransformerEncoderLayer(
                d_model=hidden_dim, nhead=n_heads, batch_first=True,
                dim_feedforward=4*hidden_dim, activation='gelu',
                norm_first=True,
            ) for _ in range(n_layers)
        ])
        
        # Noise prediction head (per-atom 3D vector)
        self.noise_head = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.SiLU(),
            nn.Linear(hidden_dim // 2, 3),
        )
        
        # Noise schedule (cosine)
        betas = torch.linspace(1e-4, 0.02, n_diffusion_steps)
        alphas = 1 - betas
        alpha_bars = torch.cumprod(alphas, dim=0)
        self.register_buffer('betas', betas)
        self.register_buffer('alphas', alphas)
        self.register_buffer('alpha_bars', alpha_bars)
    
    def forward(self, x_t: torch.Tensor, atom_types: torch.Tensor,
               t: int) -> torch.Tensor:
        """Predict noise ε_θ(x_t, t, atom_types).
        
        Args:
            x_t: (B, N, 3) noisy atom coordinates at step t
            atom_types: (B, N) atom type IDs
            t: int diffusion timestep
        
        Returns: (B, N, 3) predicted noise
        """
        B, N, _ = x_t.shape
        
        # Atom embedding
        h = self.atom_embed(atom_types)  # (B, N, hidden)
        
        # Time embedding
        t_emb = self._time_embedding(t, h.shape[-1], x_t.device)
        h = h + t_emb.unsqueeze(1)  # broadcast over atoms
        
        # Message passing (simplified — production uses E(n)-equivariant)
        for layer in self.layers:
            h = layer(h)
        
        # Predict noise (per-atom 3D vector)
        noise = self.noise_head(h)  # (B, N, 3)
        return noise
    
    def _time_embedding(self, t: int, dim: int, device: torch.device) -> torch.Tensor:
        """Sinusoidal time embedding."""
        half = dim // 2
        freqs = torch.exp(-math.log(10000) * torch.arange(half) / half).to(device)
        args = torch.tensor([t], dtype=torch.float, device=device) * freqs
        emb = torch.cat([torch.sin(args), torch.cos(args)], dim=-1)
        return emb
    
    @torch.no_grad()
    def sample(self, atom_types: torch.Tensor, n_steps: int = 50) -> torch.Tensor:
        """Reverse diffusion: generate 3D molecule from noise.
        
        Args:
            atom_types: (B, N) atom type IDs (conditioning)
            n_steps: number of denoising steps (DDIM-style)
        
        Returns: (B, N, 3) generated atom coordinates
        """
        B, N = atom_types.shape
        device = atom_types.device
        
        # Start from noise
        x = torch.randn(B, N, 3, device=device)
        
        # DDIM-style reverse diffusion
        timesteps = list(range(0, self.n_diffusion_steps, 
                               self.n_diffusion_steps // n_steps))
        timesteps = list(reversed(timesteps))
        
        for t in timesteps:
            # Predict noise
            eps = self.forward(x, atom_types, t)
            # DDIM update
            alpha_bar_t = self.alpha_bars[t]
            x0_pred = (x - torch.sqrt(1 - alpha_bar_t) * eps) / torch.sqrt(alpha_bar_t)
            if t > 0:
                alpha_bar_prev = self.alpha_bars[timesteps[-1] if t == timesteps[0] else timesteps[timesteps.index(t)+1]]
            else:
                alpha_bar_prev = torch.tensor(1.0, device=device)
            x = torch.sqrt(alpha_bar_prev) * x0_pred + torch.sqrt(1 - alpha_bar_prev) * eps
        
        return x

# ============================================================
# 3. GFlowNet — reward-matched molecular design
# ============================================================

class GFlowNet(nn.Module):
    """GFlowNet (Bengio 2023) for molecular design.
    
    Learns to sample from P(x) ∝ R(x) (reward distribution).
    
    Architecture:
        - Forward policy P_F(s_{t+1}|s_t): add atom/bond
        - Backward policy P_B(s_t|s_{t+1}): remove atom/bond
        - Trajectory balance: Z\xb7Π P_F = R\xb7Π P_B
    """
    def __init__(self, n_atom_types: int = 20, hidden_dim: int = 128):
        super().__init__()
        # Forward policy: (state, action) → probability
        self.forward_policy = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, n_atom_types + 1),  # +1 for terminate
        )
        # Backward policy
        self.backward_policy = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, n_atom_types),
        )
        # State encoder
        self.state_encoder = nn.Embedding(n_atom_types, hidden_dim)
        # Log partition function (learnable)
        self.log_Z = nn.Parameter(torch.zeros(1))
    
    def forward(self, states: torch.Tensor, 
                rewards: torch.Tensor = None) -> Dict[str, torch.Tensor]:
        """Compute forward/backward policies.
        
        Args:
            states: (B, L) state sequences (atom type IDs)
            rewards: (B,) reward values for terminal states
        
        Returns: dict with forward_logits, backward_logits, loss
        """
        B, L = states.shape
        h = self.state_encoder(states)  # (B, L, hidden)
        h_pooled = h.mean(dim=1)  # (B, hidden) — graph-level
        
        forward_logits = self.forward_policy(h_pooled)  # (B, n_actions)
        backward_logits = self.backward_policy(h_pooled)
        
        # Trajectory balance loss (if rewards provided)
        if rewards is not None:
            # log Z + Σ log P_F = log R + Σ log P_B
            # (simplified — production computes full trajectory)
            log_Z = self.log_Z
            log_R = torch.log(rewards + 1e-8)
            # Simple loss: match log_Z to log_R
            loss = F.mse_loss(log_Z, log_R.mean())
        else:
            loss = torch.tensor(0.0)
        
        return {
            'forward_logits': forward_logits,
            'backward_logits': backward_logits,
            'loss': loss,
        }
    
    @torch.no_grad()
    def sample(self, n_samples: int = 1, max_len: int = 20) -> torch.Tensor:
        """Sample molecules from forward policy.
        
        Returns: (n_samples, max_len) generated atom type sequences.
        """
        samples = []
        for _ in range(n_samples):
            state = torch.zeros(1, 1, dtype=torch.long)
            for step in range(max_len):
                h = self.state_encoder(state).mean(dim=1)
                logits = self.forward_policy(h)
                probs = F.softmax(logits, dim=-1)
                # Sample action
                action = torch.multinomial(probs, 1)
                if action.item() == self.forward_policy[-1].out_features - 1:
                    break  # terminate
                state = torch.cat([state, action.unsqueeze(0)], dim=1)
            samples.append(state)
        return torch.nn.utils.rnn.pad_sequence(samples, batch_first=True)

# Sanity check
if __name__ == "__main__":
    # Sinkhorn
    sinkhorn = SinkhornDistance(eps=0.1, n_iter=30)
    x = torch.randn(2, 5, 3)  # 2 batches, 5 atoms, 3D
    y = torch.randn(2, 5, 3)
    dist = sinkhorn(x, y)
    print(f"Sinkhorn distance: {dist.item():.4f}")
    
    # Same molecule (should be ~0)
    dist_self = sinkhorn(x, x)
    print(f"Self-distance: {dist_self.item():.4f}")
    
    # EDM
    edm = EDMDenoiser(n_atom_types=10, hidden_dim=32, n_layers=2, n_heads=4, n_diffusion_steps=100)
    n_params = sum(p.numel() for p in edm.parameters())
    print(f"\\nEDM denoiser: {n_params:,} params")
    x_t = torch.randn(2, 8, 3)  # 2 batches, 8 atoms, 3D
    atom_types = torch.randint(0, 10, (2, 8))
    noise = edm(x_t, atom_types, t=50)
    print(f"  Predicted noise: {tuple(noise.shape)}")
    
    # Sample
    samples = edm.sample(atom_types, n_steps=20)
    print(f"  Generated molecules: {tuple(samples.shape)}")
    
    # GFlowNet
    gfn = GFlowNet(n_atom_types=10, hidden_dim=32)
    n_params = sum(p.numel() for p in gfn.parameters())
    print(f"\\nGFlowNet: {n_params:,} params")
    states = torch.randint(0, 10, (4, 5))
    rewards = torch.rand(4) * 10  # random rewards
    out = gfn(states, rewards)
    print(f"  Forward logits: {tuple(out['forward_logits'].shape)}")
    print(f"  Loss: {out['loss'].item():.4f}")
    
    # Sample
    samples = gfn.sample(n_samples=3, max_len=10)
    print(f"  Sampled molecules: {samples.shape}")`;function j(){return(0,t.jsxs)("div",{className:"space-y-8",children:[(0,t.jsx)(n.PageHeader,{eyebrow:"Generative Chemistry 2.0 · EDM · DiffDock · GFlowNet · Sinkhorn · optimal transport",title:"Generative Chemistry 2.0 — 3D Diffusion, Flow Networks, Optimal Transport",description:"The next frontier of molecular design: 3D molecule generation via Equivariant Diffusion Models (EDM, Hoogeboom 2022 — DDPM on R^(N×3) with SE(3)-equivariance), diffusion-based protein-ligand docking (DiffDock, Corso 2023 — replaces AutoDock Vina, 20%+ improvement), generative flow networks (GFlowNet, Bengio 2023 — matches reward distribution for diverse candidates), and geometry-aware molecular similarity via Sinkhorn optimal transport (Cuturi 2013 — Wasserstein distance replaces Tanimoto for 3D). With 4 AI illustrations + looping Sinkhorn 'short'. Low-level PyTorch: SinkhornDistance, EDMDenoiser, GFlowNet.",right:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(x.FlaskConical,{className:"h-3 w-3"})," EDM + DiffDock + GFlowNet"]}),(0,t.jsxs)(m.Badge,{variant:"outline",className:"gap-1.5",children:[(0,t.jsx)(p.Zap,{className:"h-3 w-3"})," Pyodide"]})]})}),(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:b.map(e=>(0,t.jsx)(n.KpiCard,{label:e.label,value:e.value,hint:e.hint,deltaTone:e.deltaTone},e.label))}),(0,t.jsx)(n.SectionCard,{title:"AI-generated illustrations — click to expand",icon:(0,t.jsx)(x.FlaskConical,{className:"h-5 w-5"}),badge:"AI gallery",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)(d.ImageModal,{src:"/images/genchem2/edm-diffusion.png",alt:"EDM diffusion",caption:"Equivariant Diffusion Model (EDM) — noise-to-structure denoising on 3D molecular graphs. Same DDPM math as ADR-027 (image diffusion) but on R^(N×3) atom coordinates with SE(3)-equivariance. Generates novel 3D molecules not in training set."}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2 text-center",children:"EDM diffusion — 3D molecule generation"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)(d.ImageModal,{src:"/images/genchem2/diffdock.png",alt:"DiffDock",caption:"DiffDock — diffusion-based protein-ligand docking. Replaces AutoDock Vina (ADR-036) with learned diffusion over SE(3) binding poses. Translation (R³) + rotation (SO(3)) + torsion (torus) diffusion. 20%+ improvement over Vina, 60× faster. Corso et al. 2023, ICLR."}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2 text-center",children:"DiffDock — diffusion-based docking"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)(d.ImageModal,{src:"/images/genchem2/gflownet.png",alt:"GFlowNet",caption:"GFlowNet — generative flow network for molecular design. Directed acyclic graph of molecule construction steps (add atom → add bond → terminate). Matches reward distribution (not maximise) for diverse candidates. Bengio et al. 2023. The RL alternative to VAE (ADR-046)."}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2 text-center",children:"GFlowNet — reward-matched generation"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)(d.ImageModal,{src:"/images/genchem2/optimal-transport.png",alt:"Optimal transport",caption:"Optimal transport — Wasserstein distance between two molecular electron density distributions. The transport plan (arrows) shows how to transform molecule A into molecule B with minimum 'work'. Geometry-aware: respects 3D shape, unlike Tanimoto (ADR-035) which is 2D-only."}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-2 text-center",children:"Optimal transport — geometry-aware similarity"})]})]})}),(0,t.jsx)(n.SectionCard,{title:"Sinkhorn short — optimal transport molecular similarity (loop)",icon:(0,t.jsx)(x.FlaskConical,{className:"h-5 w-5"}),badge:"short",children:(0,t.jsx)(v,{})}),(0,t.jsx)(n.SectionCard,{title:"EDM math — SE(3)-equivariant diffusion on 3D coordinates",description:"EDM applies the DDPM framework (ADR-027) to molecular coordinates x ∈ R^(N×3). Forward: q(x_t|x_0) = N(√ᾱ_t·x_0, (1-ᾱ_t)·I) — same Gaussian noise injection. Reverse: p_θ(x_{t-1}|x_t) = N(μ_θ, σ_t·I) where θ is SE(3)-equivariant. The noise prediction ε_θ must be equivariant — rotating input rotates output. This IS the same inductive bias as ADR-036 (AlphaFold2 IPA) and ADR-044 (RFdiffusion).",icon:(0,t.jsx)(g.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsxs)("p",{className:"font-mono text-sm text-primary",children:["q(x_t|x_0) = N(√ᾱ_t·x_0, (1-ᾱ_t)·I)  ·  p_θ(x_","{t-1}","|x_t) = N(μ_θ, σ_t·I)"]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Same DDPM as ADR-027 but on R^(N×3) atom coordinates. SE(3)-equivariance ensures rotation-correct sampling."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"Same as image diffusion"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"ADR-027 but on coordinates"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"The DDPM math is invariant to modality — pixels, protein backbones, or molecular coordinates."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-amber-600 dark:text-amber-400 mb-1",children:"SE(3)-equivariance"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"f(Rx) = Rf(x)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Same constraint as ADR-036 AlphaFold2 and ADR-044 RFdiffusion. Rotational symmetry is inductive bias."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/40 bg-violet-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-violet-600 dark:text-violet-400 mb-1",children:"Atom types"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"conditioning on Z^N"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Atom type IDs (C, N, O, S) are conditioning — the model generates positions given the molecular graph."})]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"Sinkhorn optimal transport — geometry-aware molecular similarity",description:"The Wasserstein distance W_p(μ,ν) between two molecular distributions IS the minimum 'work' to transform one into the other. Entropic regularisation (Cuturi 2013) makes it tractable: W_ε = min_T ⟨T,C⟩ + ε·H(T). Sinkhorn iteration: T_ij = K_ij·u_i·v_j (alternating scaling), converges in O(n²) per iteration. This gives a geometry-aware metric that respects 3D shape — fundamentally more informative than Tanimoto on 2D fingerprints.",icon:(0,t.jsx)(g.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsx)("p",{className:"font-mono text-sm text-primary",children:"W_ε(μ,ν) = min_T ⟨T, C⟩ + ε·H(T)  ·  T_ij = K_ij·u_i·v_j"}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"C_ij = |x_i - y_j|² (cost), K_ij = exp(-C/ε) (kernel), H(T) = entropy. Sinkhorn: alternate u, v scaling until convergence."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-3 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"Geometry-aware"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Respects 3D molecular shape. Tanimoto (ADR-035) ignores geometry — two molecules with same graph but different 3D shape have Tanimoto=1 but W>0."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-amber-500/40 bg-amber-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-amber-600 dark:text-amber-400 mb-1",children:"Sinkhorn iteration"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"T_ij = K_ij · u_i · v_j"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Alternating matrix balancing. Same algorithm as attention normalisation in transformers — Sinkhorn IS softmax without normalisation."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/40 bg-violet-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-violet-600 dark:text-violet-400 mb-1",children:"Hybrid pipeline"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Tanimoto for fast pre-filter (HNSW, ms), Sinkhorn for top-100 re-rank (100ms). Best of both worlds for 100M compound libraries."})]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"GFlowNet — reward-matched generation (not maximisation)",description:"GFlowNet (Bengio 2023) frames molecular design as a sequential MDP where each step adds an atom/bond. The objective is to match the reward distribution P(x) ∝ R(x) — not to maximise R(x). This produces diverse candidates matching the reward, unlike RL's mode collapse. The trajectory balance loss: L = (log Z · Π P_F - R · Π P_B)². The flow network learns forward policy P_F (generation) and backward policy P_B (inference).",icon:(0,t.jsx)(g.Brain,{className:"h-5 w-5"}),badge:"mathematics",children:(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsxs)("div",{className:"rounded-md border border-primary/30 bg-primary/5 p-3 text-center",children:[(0,t.jsxs)("p",{className:"font-mono text-sm text-primary",children:["L = (log Z · Π_t P_F(s_","{t+1}","|s_t) - R(x) · Π_t P_B(s_t|s_","{t+1}","))²"]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground mt-1",children:"Trajectory balance loss. Z = partition function. P_F = forward (generation), P_B = backward (inference). At equilibrium: Z · Π P_F = R · Π P_B."})]}),(0,t.jsxs)("div",{className:"grid md:grid-cols-2 gap-2 text-xs",children:[(0,t.jsxs)("div",{className:"rounded-md border border-emerald-500/40 bg-emerald-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-emerald-600 dark:text-emerald-400 mb-1",children:"RL (ADR-019 bandit)"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"maximise E[R(x)]"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Mode collapse — all samples cluster near optimum. Good for exploitation, bad for diversity."})]}),(0,t.jsxs)("div",{className:"rounded-md border border-violet-500/40 bg-violet-500/5 p-2.5",children:[(0,t.jsx)("p",{className:"font-semibold text-sm text-violet-600 dark:text-violet-400 mb-1",children:"GFlowNet"}),(0,t.jsx)("p",{className:"font-mono text-[11px]",children:"match P(x) ∝ R(x)"}),(0,t.jsx)("p",{className:"text-muted-foreground text-[11px] mt-1",children:"Diverse samples matching reward distribution. Good for drug discovery — need diverse candidates, not just the best one."})]})]})]})}),(0,t.jsx)(n.SectionCard,{title:"Try it: Sinkhorn + EDM + DiffDock + GFlowNet (Pyodide)",icon:(0,t.jsx)(f.Terminal,{className:"h-5 w-5"}),badge:"executable",children:(0,t.jsx)(l.PyodideRunner,{code:_,buttonLabel:"Run generative chemistry 2.0 (Pyodide)"})}),(0,t.jsx)(n.SectionCard,{title:"Modern papers — EDM, DiffDock, GFlowNet, Sinkhorn",icon:(0,t.jsx)(x.FlaskConical,{className:"h-5 w-5"}),children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"EDM (Hoogeboom et al. 2022, ICML W):"})," Equivariant Diffusion Model for 3D molecule generation. DDPM on R^(N×3) with SE(3)-equivariance. Same math as ADR-027 (image) and ADR-044 (RFdiffusion). Generates novel 3D molecules exploring 10^60 chemical space. Trained on QM9 (130K) or GEOM (5M conformers)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"DiffDock (Corso et al. 2023, ICLR):"})," Diffusion-based protein-ligand docking. Replaces AutoDock Vina (ADR-036). Diffusion on SE(3) manifold: translation (R³) + rotation (SO(3)) + torsion (torus). 20%+ improvement over Vina, 60× faster. The standard for AI-based docking."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"GFlowNet (Bengio et al. 2023, JMLR):"})," Generative flow networks that match the reward distribution. Frames molecular design as sequential MDP. Trajectory balance loss. Produces diverse candidates (vs RL's mode collapse). The RL alternative to VAE (ADR-046 Insilico)."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Sinkhorn (Cuturi 2013, NeurIPS):"})," Sinkhorn distances — entropic optimal transport for fast Wasserstein computation. O(n²) per iteration. The same algorithm as attention normalisation in transformers. Applied to molecular similarity: 3D-aware metric replacing Tanimoto (ADR-035) for shape-sensitive applications."]})]})}),(0,t.jsx)(n.SectionCard,{title:"Low-level PyTorch — SinkhornDistance, EDMDenoiser, GFlowNet",icon:(0,t.jsx)(h.Cpu,{className:"h-5 w-5"}),badge:"low-level",children:(0,t.jsx)(r.CodeBlock,{language:"python",filename:"genchem2.py",code:w})}),(0,t.jsx)(n.SectionCard,{title:"My deeper thought: diffusion IS the universal generative primitive",icon:(0,t.jsx)(u.TrendingUp,{className:"h-5 w-5"}),badge:"Insight",children:(0,t.jsxs)("div",{className:"space-y-3 text-sm text-muted-foreground leading-relaxed",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"The same DDPM equation powers image generation, protein design, and molecule generation."})," ADR-027 (image diffusion): q(x_t|x_0) = N(√ᾱ_t·x_0, (1-ᾱ_t)·I) on R^(H×W×C). ADR-044 (RFdiffusion): same equation on R^(N_protein×3). ADR-051 (EDM): same equation on R^(N_atoms×3). The modality changes (pixels vs protein backbone vs molecular coordinates) but the mathematical skeleton is identical. The diffusion process IS the universal generative primitive — it works on any differentiable manifold where you can define a Gaussian noise process. The SE(3)-equivariance constraint (same for RFdiffusion, EDM, AlphaFold2, Boltz-1) is the specific inductive bias for 3D spatial data. The platform now has 5 instances of the same diffusion equation: images (ADR-027), proteins (ADR-044 RFdiffusion), molecules (ADR-051 EDM), protein complexes (ADR-045 Boltz-1), and molecular dynamics (ADR-050 Neural ODEs — continuous diffusion). Five modalities, one equation. The unification is mathematical, not metaphorical."]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"Sinkhorn IS attention normalisation."}),' The Sinkhorn iteration T_ij = K_ij · u_i · v_j (alternating matrix balancing) IS the same operation as softmax normalisation in attention. In attention, we compute softmax(QK^T/√d) — which IS one step of Sinkhorn with uniform marginals. The Sinkhorn algorithm IS iterated softmax with marginal constraints. This means: molecular similarity via Sinkhorn IS the same mathematical operation as the attention mechanism in transformers. The connection: attention computes a "soft matching" between query and key positions — Sinkhorn computes a "soft matching" between source and target atoms. Both are optimal transport problems, regularised differently (entropy for Sinkhorn, softmax for attention). The platform\'s pgvector (ADR-022) uses HNSW for fast retrieval — Sinkhorn adds a geometry-aware re-ranking layer on top.']}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{className:"text-foreground/80",children:"GFlowNet IS the Bayesian alternative to maximum likelihood."})," VAE (ADR-046 Insilico) maximises likelihood: learn P(x|z) to reconstruct data. GFlowNet matches the reward distribution: learn P_F to sample from P(x) ∝ R(x). The difference: VAE is likelihood-based (needs data), GFlowNet is reward-based (needs a scoring function). For drug discovery, the scoring function (binding affinity, ADMET) is more informative than the data distribution (what molecules exist). GFlowNet explores the reward landscape, VAE explores the data landscape. The connection to ADR-019 (bandit): the bandit samples from a Beta posterior (1-step), GFlowNet samples from a trajectory posterior (multi-step). Both match a distribution, not maximise. The platform's drug discovery stack now has three generative paradigms: VAE (ADR-046, 1D SMILES), EDM (ADR-051, 3D coordinates), GFlowNet (ADR-051, graph-structured). Three modalities, three generative approaches, all feeding into the same pgvector (ADR-022) for downstream RAG (ADR-032) and LLM summary (ADR-031). The platform IS a multi-paradigm generative engine for molecular design."]})]})}),(0,t.jsxs)(y.DeeperThoughtSection,{pageTitle:"Generative Chemistry 2.0",children:[(0,t.jsx)(y.DeeperThought,{title:"Generative Chemistry 2.0 IS part of a larger system — no page stands alone",connectedTo:"ADR-001 (platform architecture)",children:(0,t.jsx)("p",{children:"This page about Generative Chemistry 2.0 is not an isolated reference — it's a node in a graph. The platform's thesis is that the same math appears across genomics, fintech, maritime, and audio. Generative Chemistry 2.0 connects to the elegant-code cards via shared equations, and to the living-equation pages via live demos. The reader who arrives here looking for facts leaves with a map of where Generative Chemistry 2.0 sits in the computational-science landscape."})}),(0,t.jsx)(y.DeeperThought,{title:"The technology will change; the math won't",connectedTo:"ADR-055 (cross-disciplinary scope)",children:(0,t.jsx)("p",{children:"In a decade, the specific tools on this page (Generative Chemistry 2.0) may be replaced. But the underlying mathematics — the equations, the distributions, the optimisation rules — will be the same. SVD was invented in 1873 and still runs on NumPy today. Attention was described in 2017 and will run on whatever replaces PyTorch. The platform invests in the MATH, not the tools, because the math is the part that survives technology turnover."})}),(0,t.jsx)(y.DeeperThought,{title:"The fold pattern respects the reader's attention",connectedTo:"ADR-050 (fold-section architecture)",children:(0,t.jsx)("p",{children:"This page has fold sections (collapsed by default) that reveal deeper content on demand — equation family comparisons, LaTeX derivations, production patterns, expected outputs, and citations. The basic content is visible immediately; the deeper phases are there when the reader is ready. Progressive disclosure isn't just UX — it's epistemological. A reader who wants the summary gets it; a reader who wants the derivation clicks to expand. Both are served by the same page."})}),(0,t.jsx)(y.DeeperThought,{title:"The output IS the proof — not just the equation",connectedTo:"ADR-034 (ESM-2 + AlphaFold2 adoption)",children:(0,t.jsx)("p",{children:"Where this page has interactive demos (Pyodide + sliders + charts), the visual output IS the argument. Seeing a chart update as you drag a slider communicates the math in a way no formula can. The brain's pattern-recognition system processes the visual output faster than the verbal/analytical pathway. That's why the platform pairs every equation with a live demo — the output plays to a different level of the brain than the prose."})}),(0,t.jsx)(y.DeeperThought,{title:"In a decade, this page will evolve — and that's the point",connectedTo:"ADR-022 (pgvector for variant embeddings)",children:(0,t.jsx)("p",{children:"The datasets, libraries, and tools on this page will be updated as technology evolves. The 1000-Genomes Project will become the 10M-Genomes Project. NumPy may be replaced by a WebGPU-native array library. PyTorch may give way to a successor. But the math — SVD, Attention, Poisson, FFT, Bayes, Kalman, GBM — will be the same. The platform is designed for this evolution: the equations are the anchor, the tools are the amplifier, and the fold sections let us update the tools without rewriting the page."})})]}),(0,t.jsx)(o.NextSteps,{relatedPages:[{id:"connections",reason:"Trace this topic's connections across the platform's math graph"},{id:"cheminformatics",reason:"Continue to cheminformatics — see also from this page"},{id:"ai-drug-discovery",reason:"Continue to ai drug discovery — see also from this page"}]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)(i.default,{href:(0,c.hrefFor)("cheminformatics"),className:"text-sm text-primary hover:underline",children:"→ Cheminformatics (ECFP + Tanimoto — the 2D baseline)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(i.default,{href:(0,c.hrefFor)("ai-drug-discovery"),className:"text-sm text-primary hover:underline",children:"→ AI Drug Discovery (Insilico VAE — the 1D predecessor)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(i.default,{href:(0,c.hrefFor)("diffusion-models"),className:"text-sm text-primary hover:underline",children:"→ Diffusion Models (same DDPM math)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(i.default,{href:(0,c.hrefFor)("alphaproteo"),className:"text-sm text-primary hover:underline",children:"→ AlphaProteo (RFdiffusion — same DDPM on proteins)"}),(0,t.jsx)("span",{className:"text-muted-foreground",children:"·"}),(0,t.jsx)(i.default,{href:(0,c.hrefFor)("knowledge"),className:"text-sm text-primary hover:underline",children:"→ ADR-051 (EDM + DiffDock + GFlowNet)"})]})]})}e.s(["GenerativeChemistry2Page",()=>j])}]);