import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Cpu,
  Shield,
  Zap,
  Sparkles,
  Layers,
  Terminal,
  Activity,
  Mic,
  MicOff,
  Volume2,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  GitPullRequest,
  Check,
  Flame,
  Radio,
  Share2,
  RefreshCw,
} from "lucide-react";
import {
  ReactIcon,
  NodeIcon,
  GoIcon,
  RustIcon,
  PythonIcon,
  ThreejsIcon,
} from "./DevIcons";

// 6 Interactive Neural Orbit Nodes
const neuralNodes = [
  { id: "react", name: "React 19 / Next.js", icon: ReactIcon, category: "Frontend", color: "#38bdf8", speed: "120 FPS", coords: { x: 50, y: 15 } },
  { id: "rust", name: "Rust / WASM", icon: RustIcon, category: "Systems", color: "#f97316", speed: "0.2ms Latency", coords: { x: 85, y: 35 } },
  { id: "go", name: "Go / Kubernetes", icon: GoIcon, category: "Backend", color: "#06b6d4", speed: "2.4M req/s", coords: { x: 80, y: 80 } },
  { id: "python", name: "PyTorch / LLMs", icon: PythonIcon, category: "AI / ML", color: "#eab308", speed: "94.2 TFLOPS", coords: { x: 20, y: 80 } },
  { id: "three", name: "Three.js / WebGL", icon: ThreejsIcon, category: "Graphics", color: "#ec4899", speed: "4K Shaders", coords: { x: 15, y: 35 } },
  { id: "node", name: "Node.js / GraphQL", icon: NodeIcon, category: "APIs", color: "#10b981", speed: "Sub-10ms SSR", coords: { x: 50, y: 50 } },
];

const benchmarkTabs = [
  {
    id: "rust",
    title: "Rust Engine (WASM)",
    code: `// Multi-threaded matrix multiplication
pub fn compute_synergy_matrix(a: &[f32], b: &[f32]) -> f32 {
    a.par_iter().zip(b.par_iter()).map(|(x, y)| x * y).sum()
}
// Benchmark: 0.18ms • 0 bytes memory leak`,
    speed: "0.18ms",
    throughput: "4,820,000 ops/sec",
    memory: "1.2 MB RAM",
  },
  {
    id: "typescript",
    title: "TypeScript / Bun API",
    code: `// Sub-millisecond WebSocket handshake
export const handleMatch = async (req: Request): Promise<Response> => {
  const { devA, devB } = await req.json();
  return Response.json({ status: "MATCH_APPROVED", latency: "4ms" });
};`,
    speed: "3.8ms",
    throughput: "1,240,000 req/sec",
    memory: "8.4 MB RAM",
  },
  {
    id: "python",
    title: "PyTorch / Vector Search",
    code: `# Cosine similarity across 1536-dim embeddings
with torch.inference_mode():
    similarity = F.cosine_similarity(dev_vector_a, dev_vector_b)
    print(f"Neural alignment score: {similarity.item():.4f}")`,
    speed: "12.4ms",
    throughput: "98,400 embeddings/s",
    memory: "340 MB VRAM",
  },
];

const FeaturesSection = ({ playTone }) => {
  // 1. Neural Synergy Matrix State
  const [selectedNodes, setSelectedNodes] = useState(["react", "rust"]);
  const [synergyScore, setSynergyScore] = useState(99.4);
  const [isCalibrating, setIsCalibrating] = useState(false);

  // 2. Recruiter Spam Firewall State
  const [spamCount, setSpamCount] = useState(1420);
  const [shieldActive, setShieldActive] = useState(true);
  const [deflectingPackets, setDeflectingPackets] = useState([]);
  const [firewallLogs, setFirewallLogs] = useState([
    "🟢 [FIREWALL] Cold pitch from 'TechRecruit' blocked (Score: 0.02)",
    "🟢 [FIREWALL] Verified GitHub engineer @marcus_vance permitted",
  ]);

  // 3. Audio Lounge State
  const [isAudioLive, setIsAudioLive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [equalizerLevels, setEqualizerLevels] = useState(
    Array.from({ length: 20 }, () => Math.random() * 80 + 20)
  );

  // 4. Benchmark IDE State
  const [activeBenchmark, setActiveBenchmark] = useState("rust");
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkCompleted, setBenchmarkCompleted] = useState(false);

  // Equalizer loop
  useEffect(() => {
    if (!isAudioLive) return;
    const interval = setInterval(() => {
      setEqualizerLevels(
        Array.from({ length: 20 }, () => Math.random() * 75 + 25)
      );
    }, 120);
    return () => clearInterval(interval);
  }, [isAudioLive]);

  // Node Selection in Synergy Orbit
  const handleNodeClick = (nodeId) => {
    if (playTone) playTone(600 + Math.random() * 300, "sine", 0.08);
    setIsCalibrating(true);

    if (selectedNodes.includes(nodeId)) {
      if (selectedNodes.length > 1) {
        setSelectedNodes(selectedNodes.filter((id) => id !== nodeId));
      }
    } else {
      if (selectedNodes.length >= 2) {
        setSelectedNodes([selectedNodes[1], nodeId]);
      } else {
        setSelectedNodes([...selectedNodes, nodeId]);
      }
    }

    setTimeout(() => {
      const randomScore = (96.5 + Math.random() * 3.4).toFixed(1);
      setSynergyScore(randomScore);
      setIsCalibrating(false);
    }, 300);
  };

  // Trigger Recruiter Influx Simulation
  const simulateRecruiterSpam = () => {
    if (playTone) playTone(400, "sawtooth", 0.1);
    const newPackets = [
      { id: Date.now() + 1, text: "🚨 'Looking for rockstar ninjas!'", x: 10 },
      { id: Date.now() + 2, text: "🚨 'Quick 15 min coffee chat?'", x: 60 },
    ];
    setDeflectingPackets((prev) => [...prev, ...newPackets]);

    setTimeout(() => {
      if (playTone) playTone(950, "sine", 0.12);
      setSpamCount((prev) => prev + 2);
      setFirewallLogs((prev) => [
        `🛡️ [VAPORIZED] 2 recruiter spam packets deflected • 0% Noise maintained`,
        prev[0],
      ]);
      setDeflectingPackets([]);
    }, 800);
  };

  // Run Compilation Benchmark
  const runBenchmark = () => {
    if (playTone) playTone(720, "sine", 0.1);
    setIsBenchmarking(true);
    setBenchmarkCompleted(false);

    setTimeout(() => {
      if (playTone) playTone(1050, "sine", 0.15);
      setIsBenchmarking(false);
      setBenchmarkCompleted(true);
    }, 600);
  };

  const currentBenchmarkData =
    benchmarkTabs.find((t) => t.id === activeBenchmark) || benchmarkTabs[0];

  return (
    <section id="features" className="relative py-32 bg-[#020510] border-t border-white/10 overflow-hidden">
      
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-tr from-pink-600/15 via-purple-600/15 to-cyan-500/15 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono text-xs uppercase tracking-wider mb-4 shadow-lg shadow-pink-500/10">
            <Cpu className="w-4 h-4 text-pink-400" />
            <span>Neural Infrastructure &amp; Tooling</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Architected For
            <span className="block mt-1 gradient-text-brand">
              10x Engineering Squads.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Everything built from the ground up for high-velocity software engineers. Experience true cryptographic developer matchmaking.
          </p>
        </div>

        {/* 4-Bento Shock-Level Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ========================================================================= */}
          {/* BENTO 1: Holographic Neural Synergy Orbit HUD (7 Cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between group">
            
            {/* Top Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 p-[1.5px] shadow-lg flex items-center justify-center">
                  <div className="w-full h-full bg-[#080d22] rounded-[14px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-pink-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Neural Stack Synergy Matrix
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Click any 2 tech nodes to compute instant vector cosine alignment
                  </p>
                </div>
              </div>

              {/* Live Synergy Score Badge */}
              <div className="px-4 py-2 rounded-2xl bg-pink-500/15 border border-pink-500/40 text-pink-300 font-mono font-black text-sm flex items-center gap-2 shadow-lg shadow-pink-500/20">
                <Zap className="w-4 h-4 text-pink-400" />
                <span>{isCalibrating ? "CALIBRATING..." : `${synergyScore}% SYNERGY`}</span>
              </div>
            </div>

            {/* Orbit HUD Interactive Area */}
            <div className="relative w-full h-[320px] rounded-2xl bg-[#04081c] border border-white/10 overflow-hidden flex items-center justify-center p-4 my-2">
              
              {/* Radial Radar Rings */}
              <div className="absolute w-[260px] h-[260px] rounded-full border border-pink-500/20 animate-pulse pointer-events-none" />
              <div className="absolute w-[180px] h-[180px] rounded-full border border-cyan-500/20 pointer-events-none" />
              <div className="absolute w-[100px] h-[100px] rounded-full border border-white/10 pointer-events-none" />

              {/* Dynamic SVG Laser Connecting Line Between Selected Nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {selectedNodes.length === 2 && (() => {
                  const n1 = neuralNodes.find((n) => n.id === selectedNodes[0]);
                  const n2 = neuralNodes.find((n) => n.id === selectedNodes[1]);
                  if (!n1 || !n2) return null;
                  return (
                    <g>
                      <line
                        x1={`${n1.coords.x}%`}
                        y1={`${n1.coords.y}%`}
                        x2={`${n2.coords.x}%`}
                        y2={`${n2.coords.y}%`}
                        stroke="url(#laserGrad)"
                        strokeWidth="3"
                        className="animate-laser-dash"
                      />
                      <defs>
                        <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ec4899" />
                          <stop offset="50%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </g>
                  );
                })()}
              </svg>

              {/* Central AI Matrix Core */}
              <div className="absolute z-20 flex flex-col items-center justify-center p-4 rounded-2xl bg-[#090f2b]/95 border border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.35)] backdrop-blur-md text-center">
                <Cpu className="w-6 h-6 text-pink-400 animate-spin-conic" />
                <span className="text-[10px] font-mono font-bold text-white uppercase mt-1 tracking-wider">
                  AI Core v2.4
                </span>
                <span className="text-[9px] font-mono text-cyan-300">
                  {selectedNodes.length}/2 Active Stacks
                </span>
              </div>

              {/* 6 Orbiting Tech Stack Nodes */}
              {neuralNodes.map((node) => {
                const isSelected = selectedNodes.includes(node.id);
                const IconComponent = node.icon;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => handleNodeClick(node.id)}
                    className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl border transition-all duration-300 flex items-center gap-2 group/node cursor-pointer ${
                      isSelected
                        ? "bg-[#0f1738] border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.6)] scale-110"
                        : "bg-[#060a1f]/80 border-white/10 hover:border-white/30 hover:scale-105"
                    }`}
                    style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
                  >
                    <IconComponent className="w-5 h-5 shrink-0" />
                    <div className="text-left hidden sm:block">
                      <div className="text-xs font-bold text-white truncate max-w-[90px]">
                        {node.name.split("/")[0]}
                      </div>
                      <div className="text-[9px] font-mono text-slate-400">
                        {node.speed}
                      </div>
                    </div>
                  </button>
                );
              })}

            </div>

            {/* Neural Matrix Telemetry Footer */}
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400">Vector Distance</div>
                <div className="text-xs font-bold text-emerald-400">0.008 (Optimal)</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400">Latency Overhead</div>
                <div className="text-xs font-bold text-cyan-300">Sub-0.2ms</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-slate-400">Sprint Velocity</div>
                <div className="text-xs font-bold text-pink-400">14.8 PRs/wk</div>
              </div>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* BENTO 2: Recruiter Anti-Spam Defense Matrix (5 Cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between">
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-600 p-[1.5px] shadow-lg flex items-center justify-center">
                    <div className="w-full h-full bg-[#080d22] rounded-[14px] flex items-center justify-center">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Zero-Recruiter Spam Firewall
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      100% Cryptographic GitHub Proof
                    </p>
                  </div>
                </div>

                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Interactive Defense Shield HUD */}
              <div className="relative rounded-2xl bg-[#04081c] border border-emerald-500/30 p-5 my-3 flex flex-col items-center justify-center text-center overflow-hidden animate-shield-flash">
                
                {/* Floating Deflecting Packets */}
                {deflectingPackets.map((pkt) => (
                  <div
                    key={pkt.id}
                    className="absolute top-2 px-3 py-1 rounded-lg bg-rose-500/30 border border-rose-500 text-rose-300 font-mono text-[11px] font-bold animate-bounce z-30"
                    style={{ left: `${pkt.x}%` }}
                  >
                    {pkt.text}
                  </div>
                ))}

                <Shield className="w-12 h-12 text-emerald-400 my-2 drop-shadow-[0_0_20px_rgba(16,185,129,0.7)]" />
                
                <div className="text-2xl font-black text-white font-mono mt-1">
                  {spamCount.toLocaleString()}
                </div>
                <div className="text-xs font-mono text-emerald-300 font-bold uppercase tracking-wider">
                  Recruiter Influx Packets Deflected
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  0 Cold InMails • 100% Signal
                </div>
              </div>

              {/* Live Security Log Stream */}
              <div className="space-y-1.5 font-mono text-[11px] text-slate-300 mt-4">
                {firewallLogs.map((log, i) => (
                  <div key={i} className="p-2 rounded-xl bg-black/40 border border-white/5 truncate">
                    {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Attack Simulator Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={simulateRecruiterSpam}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Simulate Inbound Recruiter Spam 🚨</span>
              </button>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* BENTO 3: Spatial WebRTC Audio Frequency Lounge (5 Cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between">
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 p-[1.5px] shadow-lg flex items-center justify-center">
                    <div className="w-full h-full bg-[#080d22] rounded-[14px] flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      WebRTC Spatial Audio Lounge
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Sub-14ms Pair-Programming Voice
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-xl border text-xs font-mono transition-all ${
                    isMuted
                      ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                      : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  }`}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>

              {/* 20-Band Live Animated Audio Equalizer */}
              <div className="rounded-2xl bg-[#04081c] border border-white/10 p-5 my-3 h-28 flex items-end justify-between gap-1 shadow-inner">
                {equalizerLevels.map((lvl, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-pink-500 via-purple-500 to-cyan-400 rounded-t-md transition-all duration-100"
                    style={{ height: isAudioLive ? `${lvl}%` : "10%" }}
                  />
                ))}
              </div>

              {/* Connected Active Avatars in Room */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 text-xs font-mono mt-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <span className="w-6 h-6 rounded-full bg-pink-500 border border-black flex items-center justify-center text-[10px] font-bold">A</span>
                    <span className="w-6 h-6 rounded-full bg-cyan-500 border border-black flex items-center justify-center text-[10px] font-bold">E</span>
                    <span className="w-6 h-6 rounded-full bg-purple-500 border border-black flex items-center justify-center text-[10px] font-bold">M</span>
                  </div>
                  <span className="text-slate-300">3 Devs Live in Huddle</span>
                </div>
                <span className="text-cyan-300 font-bold">11ms latency</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Opus Codec 48kHz HD</span>
              <button
                type="button"
                onClick={() => {
                  setIsAudioLive(!isAudioLive);
                  if (playTone) playTone(700, "sine", 0.08);
                }}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white font-mono"
              >
                {isAudioLive ? "Disconnect" : "Join Huddle"}
              </button>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* BENTO 4: Live Multi-Language Execution & Benchmark IDE (7 Cols) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden flex flex-col justify-between">
            
            <div>
              {/* Header & Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px] shadow-lg flex items-center justify-center">
                    <div className="w-full h-full bg-[#080d22] rounded-[14px] flex items-center justify-center">
                      <Terminal className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Live Benchmark &amp; Execution IDE
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Sub-millisecond Stack Verification
                    </p>
                  </div>
                </div>

                {/* Language Switcher */}
                <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10">
                  {benchmarkTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveBenchmark(tab.id);
                        if (playTone) playTone(600, "sine", 0.05);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        activeBenchmark === tab.id
                          ? "bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tab.title.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Snippet Window */}
              <div className="rounded-2xl bg-[#030614] border border-white/10 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
                <pre className="text-cyan-300/90 whitespace-pre-wrap leading-relaxed">
                  {currentBenchmarkData.code}
                </pre>
              </div>

              {/* Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-3 mt-4 font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400">Execution Speed</div>
                  <div className="text-sm font-bold text-emerald-400">
                    {currentBenchmarkData.speed}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400">Throughput</div>
                  <div className="text-sm font-bold text-cyan-300">
                    {currentBenchmarkData.throughput}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-slate-400">Heap Footprint</div>
                  <div className="text-sm font-bold text-pink-400">
                    {currentBenchmarkData.memory}
                  </div>
                </div>
              </div>
            </div>

            {/* Benchmark Action Bar */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                {benchmarkCompleted ? "✓ Benchmark Verified" : "Ready to execute"}
              </span>
              <button
                type="button"
                onClick={runBenchmark}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-pink-500/25 active:scale-95 transition-all"
              >
                <Zap className="w-4 h-4 text-white" />
                <span>{isBenchmarking ? "BENCHMARKING..." : "Run Compilation Benchmark ⚡"}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
