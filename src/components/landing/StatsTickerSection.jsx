import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  Heart,
  Trophy,
  Zap,
  Globe2,
  GitBranch,
  ShieldCheck,
  Star,
  Activity,
} from "lucide-react";

const stats = [
  {
    label: "Active Verified Developers",
    target: 50,
    suffix: "k+",
    subtext: "100% verified GitHub profiles",
    icon: Users,
    glow: "from-pink-500 to-purple-600",
  },
  {
    label: "Connections Formed",
    target: 120,
    suffix: "k+",
    subtext: "Across 140+ countries globally",
    icon: Heart,
    glow: "from-purple-500 to-cyan-500",
  },
  {
    label: "Hackathon Squads Built",
    target: 4200,
    suffix: "+",
    subtext: "Winning $3.8M in prizes",
    icon: Trophy,
    glow: "from-amber-400 to-orange-500",
  },
  {
    label: "Average Match Time",
    target: 48,
    suffix: "s",
    subtext: "Sub-second AI compatibility",
    icon: Zap,
    glow: "from-cyan-400 to-emerald-400",
  },
];

const techStackRow1 = [
  "React 19", "Next.js", "TypeScript", "Node.js", "Rust", "Go", "Python",
  "PyTorch", "Kubernetes", "Docker", "GraphQL", "Tailwind CSS", "PostgreSQL", "MongoDB",
];

const techStackRow2 = [
  "Three.js", "WebGL", "Solidity", "FastAPI", "WASM", "Redis", "Kafka",
  "gRPC", "Swift", "Flutter", "Elixir", "Svelte", "AWS", "Supabase",
];

const StatsTickerSection = ({ playTone }) => {
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounts(
        stats.map((s) => {
          const progress = Math.min(step / steps, 1);
          // Ease-out cubic calculation
          const eased = 1 - Math.pow(1 - progress, 3);
          return Math.floor(eased * s.target);
        })
      );

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-[#030612] border-y border-white/10 overflow-hidden"
    >
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-3xl glass-panel-glow border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stat.glow} p-[1.5px] shadow-lg flex items-center justify-center`}
                  >
                    <div className="w-full h-full bg-[#080d22] rounded-[14px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight mb-1">
                  {counts[idx]}
                  {stat.suffix}
                </div>

                <div className="text-sm font-bold text-slate-200 mb-1">
                  {stat.label}
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Dual Infinite Tech Stack Marquee */}
      <div className="space-y-3 relative">
        
        {/* Left & Right Edge Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#030612] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#030612] to-transparent z-10 pointer-events-none" />

        {/* Row 1: Leftward Infinite Marquee */}
        <div className="overflow-hidden whitespace-nowrap flex">
          <div className="animate-marquee flex items-center gap-3">
            {[...techStackRow1, ...techStackRow1, ...techStackRow1].map((tech, i) => (
              <span
                key={i}
                onMouseEnter={() => playTone && playTone(600 + (i % 8) * 40, "sine", 0.03)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-pink-500/20 hover:border-pink-500/50 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-default shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Infinite Marquee */}
        <div className="overflow-hidden whitespace-nowrap flex">
          <div className="animate-marquee-reverse flex items-center gap-3">
            {[...techStackRow2, ...techStackRow2, ...techStackRow2].map((tech, i) => (
              <span
                key={i}
                onMouseEnter={() => playTone && playTone(700 + (i % 8) * 40, "sine", 0.03)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-500/50 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-default shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};

export default StatsTickerSection;
