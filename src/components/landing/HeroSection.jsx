import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Sparkles,
  ArrowRight,
  Heart,
  X,
  Code2,
  GitBranch,
  Star,
  Flame,
  CheckCircle2,
  Terminal,
  Zap,
  Users,
  Compass,
  Radio,
  Layers,
} from "lucide-react";
import { GithubIcon } from "./DevIcons";

const mockHeroProfiles = [
  {
    name: "Alex Rivera",
    role: "Senior Distributed Systems & Go",
    experience: "Staff Eng @ Ex-Stripe",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    matchScore: 99.4,
    skills: ["Go", "Kubernetes", "gRPC", "PostgreSQL", "Rust"],
    bio: "Building high-throughput microservices. Looking for frontend wizards to build an open-source observability tool.",
    stars: "4.8k",
    commits: "1,420+",
    status: "Looking for Co-founder",
  },
  {
    name: "Elena Rostova",
    role: "AI & Fullstack Engineer",
    experience: "AI Researcher @ SynthLabs",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    matchScore: 98.7,
    skills: ["Next.js 15", "PyTorch", "TypeScript", "Tailwind", "LangChain"],
    bio: "Obsessed with generative UI and autonomous agents. Ready to ship next-gen developer tooling.",
    stars: "7.2k",
    commits: "2,100+",
    status: "Hackathon Teammate",
  },
  {
    name: "Marcus Vance",
    role: "Rust & Blockchain Architect",
    experience: "Core Contributor @ ZeroKnowledge",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    matchScore: 97.5,
    skills: ["Rust", "Solana", "WebAssembly", "C++", "Docker"],
    bio: "Low-latency systems & cryptographic protocols. Let's build scalable peer-to-peer applications.",
    stars: "3.4k",
    commits: "980+",
    status: "Open Source Collab",
  },
];

const HeroSection = ({ playTone, playChord }) => {
  const [profileIndex, setProfileIndex] = useState(0);
  const [cardAction, setCardAction] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const [liveMatches, setLiveMatches] = useState([
    { id: 1, user1: "Vikram (Rust/WASM)", user2: "Sophia (React/WebGL)", time: "Just now" },
    { id: 2, user1: "Liam (Go/K8s)", user2: "Chloe (Python/ML)", time: "12s ago" },
  ]);

  const currentProfile = mockHeroProfiles[profileIndex];

  const handleHeroSwipe = (type) => {
    if (type === "connect") {
      if (playChord) playChord([523.25, 659.25, 783.99], 0.25);
      else if (playTone) playTone(880, "sine", 0.15);
    } else {
      if (playTone) playTone(320, "triangle", 0.08);
    }
    setCardAction(type);
    setTimeout(() => {
      setProfileIndex((prev) => (prev + 1) % mockHeroProfiles.length);
      setCardAction(null);
    }, 450);
  };

  // 3D Tilt on mouse move over card
  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 12,
      y: (x / (rect.width / 2)) * 12,
    });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const names = [
        ["Maya (FastAPI)", "Jordan (Next.js)"],
        ["Kai (Elixir/Phoenix)", "Amara (Vue3)"],
        ["David (GraphQL/Node)", "Zoe (Swift/iOS)"],
        ["Lucas (Solidity)", "Elena (PyTorch)"],
      ];
      const randomPair = names[Math.floor(Math.random() * names.length)];
      setLiveMatches((prev) => [
        { id: Date.now(), user1: randomPair[0], user2: randomPair[1], time: "Just now" },
        prev[0],
      ]);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden bg-grid-pattern">
      
      {/* Cinematic Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-cyan-500/20 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Bold Cyber Typography */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono text-xs uppercase tracking-wider backdrop-blur-md shadow-lg shadow-pink-500/10 hover:border-pink-500/60 transition-colors">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Developer Matchmaking v2.0 Live</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
              Where Builders
              <span className="block mt-1 gradient-text-pink-orange">
                Swipe, Match &amp; Ship.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              The premier developer networking network. Discover passionate co-founders, join elite hackathon squads, and pair-program on next-generation software with zero recruiter spam.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/signup"
                onClick={() => playChord && playChord([523.25, 659.25, 783.99], 0.25)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white font-black text-sm shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 group"
              >
                <span>Find Your Coding Partner</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#deck"
                onClick={() => playTone && playTone(600, "sine", 0.08)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-base backdrop-blur-md hover:border-white/30 transition-all flex items-center justify-center gap-2"
              >
                <Compass className="w-5 h-5 text-cyan-400" />
                <span>Interactive Deck</span>
              </a>
            </div>

            {/* Trust Metrics Pill */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Verified GitHub Devs</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Sub-20ms Code Chat</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>50,000+ Active Builders</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: 3D Holographic Card & Radar Preview */}
          <div className="lg:col-span-5 relative perspective-1200 flex items-center justify-center">
            
            {/* Pulsating Radar Background */}
            <div className="absolute w-[440px] h-[440px] rounded-full border border-pink-500/20 animate-radar pointer-events-none" />
            <div className="absolute w-[320px] h-[320px] rounded-full border border-cyan-500/20 animate-radar pointer-events-none [animation-delay:1s]" />

            {/* Orbiting Satellite Telemetry Badge 1 */}
            <div className="absolute -top-6 -left-6 p-3 rounded-2xl glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-2 shadow-xl animate-float z-30 hidden sm:flex">
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span>48 Repos Synced</span>
            </div>

            {/* Orbiting Satellite Telemetry Badge 2 */}
            <div className="absolute -bottom-6 -right-6 p-3 rounded-2xl glass-panel border border-pink-500/30 text-pink-300 text-xs font-mono flex items-center gap-2 shadow-xl animate-float-reverse z-30 hidden sm:flex">
              <Flame className="w-4 h-4 text-pink-400" />
              <span>120k+ Matches Made</span>
            </div>

            {/* Main 3D Tilted Interactive Card */}
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className={`relative w-full max-w-sm rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.8)] transform-gpu transition-transform duration-200 ${
                cardAction === "connect"
                  ? "translate-x-32 rotate-12 opacity-0 transition-all duration-300"
                  : cardAction === "ignore"
                  ? "-translate-x-32 -rotate-12 opacity-0 transition-all duration-300"
                  : ""
              }`}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              
              {/* Dynamic Action Stamp */}
              {cardAction === "connect" && (
                <div className="absolute top-8 left-8 px-4 py-2 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-mono font-black text-sm uppercase rotate-[-12deg] z-40 shadow-lg">
                  MATCHED! 🚀
                </div>
              )}
              {cardAction === "ignore" && (
                <div className="absolute top-8 right-8 px-4 py-2 rounded-xl bg-rose-500/20 border-2 border-rose-400 text-rose-300 font-mono font-black text-sm uppercase rotate-[12deg] z-40 shadow-lg">
                  PASSED ✕
                </div>
              )}

              {/* Profile Card Header */}
              <div className="relative mb-5">
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 ring-1 ring-white/10">
                  <img
                    src={currentProfile.avatar}
                    alt={currentProfile.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090d24] via-transparent to-transparent" />
                </div>

                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>{currentProfile.matchScore}% Match</span>
                </span>
              </div>

              {/* Developer Metadata */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">
                    {currentProfile.name}
                  </h3>
                  <span className="text-[11px] font-mono text-pink-400 font-bold px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
                    {currentProfile.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{currentProfile.role}</p>
                <p className="text-xs text-slate-400">{currentProfile.experience}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                "{currentProfile.bio}"
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {currentProfile.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Card Action Controls */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleHeroSwipe("ignore")}
                  className="flex-1 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <X className="w-4 h-4" />
                  <span>Pass</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleHeroSwipe("connect")}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-pink-500/30 active:scale-95 transition-all"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Connect</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
