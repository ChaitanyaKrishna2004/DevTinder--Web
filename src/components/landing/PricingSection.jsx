import React, { useState } from "react";
import { Link } from "react-router";
import {
  Check,
  Sparkles,
  Zap,
  Crown,
  Flame,
  ShieldCheck,
  ArrowRight,
  Star,
  Activity,
  Sliders,
} from "lucide-react";

const PricingSection = ({ playTone }) => {
  const [billingCycle, setBillingCycle] = useState("annual");
  const [matchVelocity, setMatchVelocity] = useState(25);

  const toggleBilling = () => {
    if (playTone) playTone(650, "sine", 0.08);
    setBillingCycle((prev) => (prev === "annual" ? "monthly" : "annual"));
  };

  return (
    <section id="pricing" className="relative py-28 bg-[#050713] border-t border-white/10 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-wider mb-4">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Developer-First Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Level Up Your Developer Network.
            <span className="block mt-1 gradient-text-gold">
              Simple, Fair, Engineer-First Pricing.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-8">
            Start completely free with zero credit card required. Upgrade anytime to unlock unlimited matches, direct intro pitches, and see who liked your stack.
          </p>

          {/* Billing Switch */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-[#090e24] border border-white/10">
            <button
              type="button"
              onClick={() => {
                if (billingCycle !== "monthly") toggleBilling();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                billingCycle === "monthly"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => {
                if (billingCycle !== "annual") toggleBilling();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-amber-200">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* Interactive Match Velocity Estimator Card */}
        <div className="max-w-3xl mx-auto mb-16 p-6 rounded-3xl glass-panel-glow border border-white/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white font-mono">
                Interactive Match Velocity Calculator:
              </span>
            </div>
            <span className="text-xs font-mono text-cyan-300">
              {matchVelocity} Swipes / Day
            </span>
          </div>

          <input
            type="range"
            min="5"
            max="50"
            value={matchVelocity}
            onChange={(e) => setMatchVelocity(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500 mb-4"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center font-mono">
            <div className="p-3 rounded-xl bg-[#030612] border border-white/5">
              <div className="text-[10px] text-slate-400">EST. WEEKLY MATCHES</div>
              <div className="text-base font-bold text-pink-400 mt-0.5">
                ~{Math.round(matchVelocity * 0.4 * 7)} Connections
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#030612] border border-white/5">
              <div className="text-[10px] text-slate-400">TIME TO CO-FOUNDER</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">
                {matchVelocity > 25 ? "Under 7 Days" : "14 - 21 Days"}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#030612] border border-white/5">
              <div className="text-[10px] text-slate-400">OPTIMAL TIER</div>
              <div className="text-base font-bold text-amber-400 mt-0.5">
                {matchVelocity > 30 ? "DevTinder Gold 👑" : "Community Free 🚀"}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Card 1: Community Free */}
          <div className="p-8 sm:p-10 rounded-3xl glass-panel-glow border border-white/15 backdrop-blur-xl flex flex-col justify-between hover:border-white/30 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 font-bold">
                  COMMUNITY
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">100% Free Forever</span>
              </div>

              <h3 className="text-2xl font-black text-white mb-2">Dev Free</h3>
              <p className="text-xs text-slate-400 mb-6">
                Everything essential to discover awesome peer developers and collaborate on side projects.
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">$0</span>
                <span className="text-slate-400 text-xs font-mono">/ forever</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>30 Profile Swipes</strong> per day</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct in-app chat upon mutual match</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>GitHub &amp; GitLab profile sync</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standard AI stack compatibility scoring</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Syntax-highlighted code chat</span>
                </li>
              </ul>
            </div>

            <Link
              to="/signup"
              onClick={() => playTone && playTone(600, "sine", 0.08)}
              className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm text-center block transition-all hover:scale-[1.01]"
            >
              Get Started Free
            </Link>
          </div>

          {/* Card 2: DevTinder Gold (Pro Tier) */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#161c3c] to-[#0a0f28] border-2 border-amber-400/70 shadow-[0_0_60px_rgba(245,158,11,0.25)] backdrop-blur-xl flex flex-col justify-between transform lg:-translate-y-2">
            
            {/* Top Ribbon */}
            <div className="absolute -top-3.5 right-8 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-mono text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-black text-black" />
              <span>MOST POPULAR FOR FOUNDERS</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-mono text-amber-300 font-bold flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5" />
                  <span>DEVTINDER GOLD</span>
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">Priority Status</span>
              </div>

              <h3 className="text-2xl font-black text-white mb-2">DevTinder Gold</h3>
              <p className="text-xs text-slate-300 mb-6">
                Maximum visibility, unlimited matching, direct pitch messaging, and co-founder priority.
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl sm:text-5xl font-black text-amber-300 font-mono">
                  {billingCycle === "annual" ? "$12" : "$16"}
                </span>
                <span className="text-slate-400 text-xs font-mono">
                  / month {billingCycle === "annual" && "(billed annually)"}
                </span>
              </div>

              <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-slate-200">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong className="text-white">Unlimited Swipes &amp; Requests</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span><strong className="text-white">See Who Liked Your Stack</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>5 Instant Direct Super-Connects / month</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Verified Gold Developer Badge on Profile</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>AI Co-Founder Matchmaker &amp; Hackathon VIP Radar</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Access to Dev Audio Huddles &amp; Pair Coding</span>
                </li>
              </ul>
            </div>

            <Link
              to="/signup"
              onClick={() => playTone && playTone(980, "sine", 0.12)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-black font-black text-sm text-center shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Unlock DevTinder Gold</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PricingSection;
