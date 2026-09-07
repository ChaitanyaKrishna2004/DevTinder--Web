import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Code2,
  Lock,
  QrCode,
  Check,
} from "lucide-react";
import { GithubIcon } from "./DevIcons";

const CtaSection = ({ playTone }) => {
  const [handle, setHandle] = useState("chaitanya");
  const navigate = useNavigate();

  const handleClaim = (e) => {
    e.preventDefault();
    if (playTone) playTone(950, "sine", 0.12);
    navigate("/signup");
  };

  return (
    <section className="relative py-28 bg-[#03050e] overflow-hidden">
      
      {/* Cinematic Cosmic Warp Mesh Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-pink-600/20 via-purple-600/25 to-cyan-500/20 rounded-full blur-[170px] pointer-events-none animate-pulse-glow" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Cosmic Container Box */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#10163a]/90 to-[#070b1f]/95 border border-white/20 p-8 sm:p-14 text-center backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden">
          
          {/* Top Radial Glow Bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 font-mono text-xs uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Join 50,000+ Verified Developers</span>
          </div>

          {/* Bold Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            Ready to Find Your Next
            <span className="block mt-2 font-black bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              10x Coding Partner?
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Whether you need a fullstack wizard, an AI researcher, or a systems architect, your next dream collaborator is one swipe away.
          </p>

          {/* Interactive Handle Claim Form */}
          <form
            onSubmit={handleClaim}
            className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3 p-2 rounded-2xl bg-[#030612]/95 border border-white/20 mb-10 shadow-2xl"
          >
            <div className="flex-1 flex items-center gap-2 px-4 w-full">
              <span className="text-slate-500 font-mono text-sm font-bold">devtinder.com/@</span>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourhandle"
                className="w-full bg-transparent text-white placeholder-slate-500 text-sm font-mono focus:outline-none py-2"
              />
            </div>

            <button
              type="submit"
              onClick={() => playTone && playTone(950, "sine", 0.12)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 group"
            >
              <span>Claim Handle</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Live Mini Dev Passport Card Preview */}
          <div className="max-w-sm mx-auto mb-10 p-4 rounded-2xl bg-[#060a1f] border border-cyan-500/30 text-left font-mono shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] text-slate-400">
              <span>DEV PASSPORT #8490</span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <Check className="w-3 h-3" /> AVAILABLE
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-cyan-400 flex items-center justify-center text-black font-black text-sm">
                {handle ? handle.charAt(0).toUpperCase() : "D"}
              </div>
              <div className="flex-1 truncate">
                <div className="text-white font-bold text-sm truncate">
                  devtinder.com/@{handle || "username"}
                </div>
                <div className="text-[11px] text-cyan-300">
                  Status: Priority Match Activated ⚡
                </div>
              </div>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-xs font-mono text-slate-300">
            <div className="flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free Tier Forever</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span>1-Click GitHub Sync</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>Zero Recruiter Spam</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant Matching</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CtaSection;
