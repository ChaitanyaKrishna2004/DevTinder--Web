import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Heart,
  X,
  Star,
  Sparkles,
  RotateCcw,
  GitBranch,
  Award,
  Flame,
  CheckCircle2,
  Code2,
  ExternalLink,
  MessageSquare,
  Zap,
  Globe2,
  Radio,
  Keyboard,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Activity,
  Layers,
} from "lucide-react";
import { GithubIcon } from "./DevIcons";

const showcaseDevelopers = [
  {
    id: 1,
    name: "Sophia Sterling",
    role: "Staff Frontend Architect",
    company: "Ex-Airbnb • Open Source Creator",
    location: "San Francisco, CA (PST)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    bio: "Building high-performance design systems, WebGL canvas experiences, and reactive state engines. Seeking an infrastructure engineer for a real-time developer canvas SaaS.",
    skills: ["React 19", "Next.js", "WebGL", "TypeScript", "Tailwind", "Three.js"],
    synergyScore: 99.4,
    stats: { repos: 64, stars: "12.4k", commitsThisYear: 1840 },
    verified: true,
    github: "sophiadev",
    seeking: "Distributed Systems & Go Architect",
    matchBadge: "Top 0.1% Architecture",
    themeColor: "from-pink-500 to-purple-600",
  },
  {
    id: 2,
    name: "Elena Rostova",
    role: "AI & Neural Systems Engineer",
    company: "AI Research Lab • OSS Maintainer",
    location: "Zurich, Switzerland (CET)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
    bio: "Obsessed with low-latency LLM inference pipelines, Rust tokenizers, and autonomous developer agents. Looking for a fullstack partner for upcoming global AI hackathons.",
    skills: ["Rust", "PyTorch", "Python", "CUDA", "FastAPI", "WASM"],
    synergyScore: 98.8,
    stats: { repos: 42, stars: "18.9k", commitsThisYear: 2310 },
    verified: true,
    github: "elenarostova",
    seeking: "Frontend/UI Product Engineer",
    matchBadge: "Global AI Finalist",
    themeColor: "from-cyan-400 to-blue-600",
  },
  {
    id: 3,
    name: "Alex Rivera",
    role: "Distributed Cloud Architect",
    company: "CloudScale Systems",
    location: "Austin, TX (CST)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    bio: "High-throughput microservices, Kubernetes operators, and Raft consensus engines. Want to team up with frontend & AI builders to launch developer tooling startups.",
    skills: ["Go", "Kubernetes", "gRPC", "Docker", "Kafka", "PostgreSQL"],
    synergyScore: 97.5,
    stats: { repos: 78, stars: "8.6k", commitsThisYear: 1980 },
    verified: true,
    github: "alexrivera_ops",
    seeking: "Fullstack Product Specialist",
    matchBadge: "K8s Core Contributor",
    themeColor: "from-emerald-400 to-cyan-500",
  },
  {
    id: 4,
    name: "Kai Takahashi",
    role: "Web3 & Zero-Knowledge Cryptographer",
    company: "ZeroChain Labs",
    location: "Tokyo, Japan (JST)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    bio: "Specializing in zk-SNARK circuits, smart contracts, and decentralized state synchronizers. Looking for a TypeScript/Rust engineer to build a decentralized verification protocol.",
    skills: ["Solidity", "Rust", "ZK-Proofs", "TypeScript", "Hardhat"],
    synergyScore: 96.9,
    stats: { repos: 36, stars: "6.2k", commitsThisYear: 1450 },
    verified: true,
    github: "kaicrypto",
    seeking: "Frontend & Fullstack Wizard",
    matchBadge: "Ethereum Dev Grantee",
    themeColor: "from-purple-500 to-indigo-600",
  },
];

const liveMatchFeed = [
  { id: 1, text: "🔥 Liam (Go/K8s) matched with Sophia (React/WebGL)", time: "2s ago", location: "San Francisco" },
  { id: 2, text: "⚡ Vikram & Elena connected on Rust AI inference", time: "8s ago", location: "Zurich" },
  { id: 3, text: "🚀 Sarah accepted invite for Decentralized Protocol", time: "14s ago", location: "Tokyo" },
  { id: 4, text: "✨ Chloe & Marcus formed a 1st-place Hackathon squad", time: "22s ago", location: "Austin" },
];

const InteractiveDeckSection = ({ playTone, playChord }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTicker, setActiveTicker] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  // Rotate global live match ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTicker((prev) => (prev + 1) % liveMatchFeed.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#8b5cf6", "#06b6d4", "#f59e0b", "#10b981"],
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSwipe = (direction) => {
    if (currentIndex >= showcaseDevelopers.length) return;

    const currentDev = showcaseDevelopers[currentIndex];
    setSwipeDirection(direction);

    if (direction === "right" || direction === "super") {
      if (playChord) {
        playChord([523.25, 659.25, 783.99], 0.3);
      } else if (playTone) {
        playTone(direction === "super" ? 1050 : 880, "sine", 0.15);
      }
      triggerConfetti();
      setMatchedProfile(currentDev);
    } else {
      if (playTone) playTone(300, "triangle", 0.08);
    }

    setHistory((prev) => [...prev, { dev: currentDev, action: direction }]);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setDragOffset({ x: 0, y: 0 });
    }, 320);
  };

  const handleUndo = () => {
    if (currentIndex === 0 || history.length === 0) return;
    if (playTone) playTone(550, "sine", 0.08);
    setCurrentIndex((prev) => prev - 1);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    if (playTone) playTone(650, "sine", 0.1);
    setCurrentIndex(0);
    setHistory([]);
    setMatchedProfile(null);
    setDragOffset({ x: 0, y: 0 });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowLeft") handleSwipe("left");
      else if (e.key === "ArrowRight") handleSwipe("right");
      else if (e.key === "ArrowUp") handleSwipe("super");
      else if (e.key === "r" || e.key === "R") handleReset();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Touch & Pointer Drag mechanics
  const handlePointerDown = (e) => {
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset.x > 120) {
      handleSwipe("right");
    } else if (dragOffset.x < -120) {
      handleSwipe("left");
    } else if (dragOffset.y < -100) {
      handleSwipe("super");
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const currentDev = showcaseDevelopers[currentIndex];

  return (
    <section id="deck" className="relative py-28 bg-[#040714] overflow-hidden border-t border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-pink-600/15 via-purple-600/15 to-cyan-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Global Real-time Live Match Ticker Banner */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="p-3 rounded-2xl bg-[#090e24]/80 border border-white/10 backdrop-blur-xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="flex h-2.5 w-2.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="text-xs font-mono text-slate-300 truncate">
                <span className="text-pink-400 font-bold mr-2">LIVE MATCH RADAR:</span>
                {liveMatchFeed[activeTicker].text}
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 shrink-0 hidden sm:inline-block">
              {liveMatchFeed[activeTicker].location}
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono text-xs uppercase tracking-wider mb-4">
            <Radio className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>Interactive Match Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Swipe Through Verified Devs.
            <span className="block mt-1 gradient-text-pink-orange">
              Match Stacks &amp; Ship In Real-Time.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-6">
            Drag the 3D card or use the action controls below. Experience instant matching telemetry and smart compatibility scoring.
          </p>

          {/* Keyboard shortcut guide badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <Keyboard className="w-4 h-4 text-cyan-400" />
            <span><kbd className="px-1.5 py-0.5 rounded bg-black/40 text-slate-200 border border-white/10">←</kbd> Pass</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-black/40 text-slate-200 border border-white/10">↑</kbd> Super Match</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-black/40 text-slate-200 border border-white/10">→</kbd> Connect</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-black/40 text-slate-200 border border-white/10">R</kbd> Reset</span>
          </div>
        </div>

        {/* 3D Stack Deck Workspace */}
        <div className="max-w-xl mx-auto perspective-1200">
          
          {currentIndex < showcaseDevelopers.length ? (
            <div className="relative min-h-[620px] flex items-center justify-center select-none">
              
              {/* Back Card 2 (Layer 2) */}
              {currentIndex + 2 < showcaseDevelopers.length && (
                <div
                  className="absolute w-full rounded-3xl bg-[#090e24]/70 border border-white/5 p-6 transform scale-[0.88] translate-y-10 opacity-30 shadow-2xl pointer-events-none transition-all duration-300"
                  style={{ zIndex: 10 }}
                />
              )}

              {/* Back Card 1 (Layer 1) */}
              {currentIndex + 1 < showcaseDevelopers.length && (
                <div
                  className="absolute w-full rounded-3xl bg-[#0b1233]/90 border border-white/10 p-6 transform scale-[0.94] translate-y-5 opacity-60 shadow-2xl pointer-events-none transition-all duration-300"
                  style={{ zIndex: 20 }}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={showcaseDevelopers[currentIndex + 1].avatar}
                      alt="Next dev"
                      className="w-14 h-14 rounded-2xl object-cover opacity-70"
                    />
                    <div>
                      <h4 className="text-white font-bold">{showcaseDevelopers[currentIndex + 1].name}</h4>
                      <p className="text-xs text-slate-400">{showcaseDevelopers[currentIndex + 1].role}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Front Card (Top 3D Interactive Card) */}
              <div
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className={`relative w-full rounded-3xl glass-panel-glow border border-white/20 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-grab active:cursor-grabbing transform-gpu transition-all ${
                  isDragging ? "transition-none" : "duration-300"
                } ${
                  swipeDirection === "right"
                    ? "translate-x-96 rotate-12 opacity-0"
                    : swipeDirection === "left"
                    ? "-translate-x-96 -rotate-12 opacity-0"
                    : swipeDirection === "super"
                    ? "-translate-y-96 scale-110 opacity-0"
                    : ""
                }`}
                style={{
                  zIndex: 30,
                  transform: !swipeDirection && isDragging
                    ? `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0px) rotate(${dragOffset.x * 0.06}deg)`
                    : undefined,
                }}
              >
                
                {/* Dynamic Drag Stamp Badges */}
                {dragOffset.x > 40 && (
                  <div className="absolute top-8 left-8 px-4 py-2 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-mono font-black text-sm uppercase rotate-[-12deg] z-40 shadow-lg animate-pulse">
                    CONNECT 🚀
                  </div>
                )}
                {dragOffset.x < -40 && (
                  <div className="absolute top-8 right-8 px-4 py-2 rounded-xl bg-rose-500/20 border-2 border-rose-400 text-rose-300 font-mono font-black text-sm uppercase rotate-[12deg] z-40 shadow-lg animate-pulse">
                    PASS ✕
                  </div>
                )}
                {dragOffset.y < -40 && Math.abs(dragOffset.x) < 40 && (
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-amber-500/20 border-2 border-amber-400 text-amber-300 font-mono font-black text-sm uppercase z-40 shadow-lg animate-pulse">
                    SUPER MATCH ⭐
                  </div>
                )}

                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={currentDev.avatar}
                      alt={currentDev.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-pink-500 shadow-lg"
                    />
                    {currentDev.verified && (
                      <span
                        className="absolute -bottom-1 -right-1 p-1 rounded-full bg-cyan-500 text-black shadow-md"
                        title="Verified GitHub Developer"
                      >
                        <CheckCircle2 className="w-4 h-4 fill-cyan-400 text-black" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {currentDev.name}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        <span>{currentDev.synergyScore}% Match</span>
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-pink-400 mt-0.5">
                      {currentDev.role}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {currentDev.company} • {currentDev.location}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[11px] font-mono text-amber-300 border border-white/10 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-400" />
                        <span>{currentDev.matchBadge}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 bg-white/[0.03] p-3.5 rounded-2xl border border-white/5">
                  "{currentDev.bio}"
                </p>

                {/* Looking For Mission Banner */}
                <div className="mb-6 px-3.5 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-mono flex items-center justify-between">
                  <span className="text-purple-300 font-bold">LOOKING FOR:</span>
                  <span className="text-white font-medium">{currentDev.seeking}</span>
                </div>

                {/* Verified GitHub Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mb-6 p-3 rounded-2xl bg-[#030611] border border-white/10 text-center font-mono">
                  <div>
                    <div className="text-xs text-slate-400">Repositories</div>
                    <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                      {currentDev.stats.repos}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">OSS Stars</div>
                    <div className="text-sm sm:text-base font-bold text-cyan-300 mt-0.5">
                      {currentDev.stats.stars}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">2026 Commits</div>
                    <div className="text-sm sm:text-base font-bold text-emerald-400 mt-0.5">
                      {currentDev.stats.commitsThisYear}
                    </div>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="mb-8">
                  <div className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
                    Core Technologies:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentDev.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Button Controls */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                  
                  {/* Undo Button */}
                  <button
                    type="button"
                    onClick={handleUndo}
                    disabled={currentIndex === 0}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 text-slate-400 hover:text-white transition-all shadow-md active:scale-95"
                    title="Undo last swipe"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  {/* Pass / Ignore (Left) */}
                  <button
                    type="button"
                    onClick={() => handleSwipe("left")}
                    className="flex-1 py-3.5 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-md"
                  >
                    <X className="w-5 h-5" />
                    <span>Pass</span>
                  </button>

                  {/* Super Match (Up) */}
                  <button
                    type="button"
                    onClick={() => handleSwipe("super")}
                    className="p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:scale-105 active:scale-95 transition-all shadow-md"
                    title="Super Match & Priority Connect"
                  >
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </button>

                  {/* Connect / Interested (Right) */}
                  <button
                    type="button"
                    onClick={() => handleSwipe("right")}
                    className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Heart className="w-5 h-5 fill-white" />
                    <span>Connect</span>
                  </button>

                </div>

              </div>
            </div>
          ) : (
            /* End of Deck State */
            <div className="p-10 rounded-3xl glass-panel-glow border border-white/20 text-center shadow-2xl">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                You've Reviewed All Curated Developers!
              </h3>
              <p className="text-sm text-slate-300 mb-8 max-w-md mx-auto">
                Our AI matching engine scans 50,000+ developer profiles hourly. Reset the deck to simulate again or join now to access the live feed.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                Reset &amp; Swipe Again 🔄
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Cinematic Match Modal */}
      {matchedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl glass-panel-glow border-2 border-pink-500/50 p-8 text-center shadow-[0_0_80px_rgba(236,72,153,0.35)]">
            
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setMatchedProfile(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Pill */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 font-mono text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4" />
              <span>It's A Synergistic Match!</span>
            </div>

            {/* Avatar Collision Presentation */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                  alt="You"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-400 shadow-xl"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-cyan-900/90 text-[10px] font-mono text-cyan-200">
                  You
                </span>
              </div>

              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg animate-pulse">
                <Heart className="w-5 h-5 fill-white" />
              </div>

              <div className="relative">
                <img
                  src={matchedProfile.avatar}
                  alt={matchedProfile.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-pink-400 shadow-xl"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-pink-900/90 text-[10px] font-mono text-pink-200">
                  {matchedProfile.name.split(" ")[0]}
                </span>
              </div>
            </div>

            <h4 className="text-2xl font-black text-white mb-2">
              You and {matchedProfile.name} Connected!
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              Both of you have complementary stacks ({matchedProfile.skills.slice(0, 3).join(", ")}) and verified Git synergy.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="#chat-preview"
                onClick={() => {
                  setMatchedProfile(null);
                  if (playTone) playTone(750, "sine", 0.1);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open In-App Code Chat</span>
              </a>

              <button
                type="button"
                onClick={() => setMatchedProfile(null)}
                className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-colors"
              >
                Keep Exploring Developers
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default InteractiveDeckSection;
