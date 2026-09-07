import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import {
  Crown,
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  Radio,
  Lock,
  ArrowRight,
  Flame,
} from "lucide-react";

const Payment = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly");

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/payment/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium || res.data.success) {
        setIsPremiumUser(true);
      }
    } catch (error) {
      console.error("Error verifying premium user:", error);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handleSubscribe = async (plan) => {
    try {
      const order = await axios({
        method: "post",
        url: BASE_URL + "/payment/create",
        data: {
          plan: plan,
        },
        withCredentials: true,
      });

      const { paymentId, amount, currency, notes } = order.data.data;
      const { key_id } = order.data;

      const options = {
        key: key_id,
        amount: amount * 100,
        currency: currency,
        name: "DevTinder",
        description: "Connect to other developers and share your projects",
        order_id: paymentId,
        handler: async () => {
          await verifyPremiumUser();
        },
        prefill: {
          name: notes?.name || "DevTinder Engineer",
          email: notes?.email || "dev@devtinder.io",
        },
        theme: {
          color: "#ec4899",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-16 px-4 sm:px-6 lg:px-8 bg-[#030614] relative">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-amber-600/15 via-purple-600/15 to-pink-500/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Active Premium Banner */}
        {isPremiumUser && (
          <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-cyan-500/20 border border-amber-500/40 text-center shadow-2xl backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold mb-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>DevTinder VIP Active</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              You Have Unlocked DevTinder Gold
            </h2>
            <p className="text-xs font-mono text-slate-300 mt-1">
              Unlimited swipes, zero-latency radar priority &amp; verified GitHub badge enabled.
            </p>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs mb-3 shadow-lg shadow-amber-500/10">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>DevTinder Gold Membership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Accelerate Your <br />
            <span className="gradient-text-gold">Engineering Network.</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-3">
            Unlock infinite developer radar searches, verified gold badges, and instant pair programming channels.
          </p>
        </div>

        {/* 2-Tier Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* SILVER TIER */}
          <div className="rounded-3xl glass-panel-glow border border-white/15 p-8 flex flex-col justify-between hover:border-white/30 transition-all shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 font-mono text-xs font-bold">
                  Developer Silver
                </span>
                <span className="text-xs font-mono text-slate-500">Standard</span>
              </div>

              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl font-black text-white font-mono">₹5,000</span>
                <span className="text-xs font-mono text-slate-400">/ month</span>
              </div>

              <p className="text-xs text-slate-400 font-mono mb-6">
                Essential tools for solo developers seeking hackathon partners.
              </p>

              <div className="space-y-3 font-mono text-xs text-slate-300 mb-8">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>50 Daily Developer Swipes</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified GitHub Contributor Badge</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct WebRTC Code Chat</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-500">
                  <Check className="w-4 h-4 text-slate-600 shrink-0" />
                  <span>Priority Neural Radar Placement</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSubscribe("silver")}
              className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Activate Silver Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* GOLD VIP TIER */}
          <div className="rounded-3xl glass-panel-glow border-2 border-amber-500/50 p-8 flex flex-col justify-between hover:border-amber-400 transition-all shadow-[0_20px_60px_rgba(245,158,11,0.2)] relative">
            
            {/* Top Pill */}
            <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-black font-mono text-[10px] font-black uppercase tracking-wider shadow-lg">
              Most Popular • VIP
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>DevTinder Gold VIP</span>
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">10x Speed</span>
              </div>

              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl font-black text-amber-300 font-mono">₹10,000</span>
                <span className="text-xs font-mono text-slate-400">/ month</span>
              </div>

              <p className="text-xs text-slate-400 font-mono mb-6">
                Unlimited access for engineering leaders, CTOs &amp; serial founders.
              </p>

              <div className="space-y-3 font-mono text-xs text-slate-200 mb-8">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold text-white">Unlimited Daily Swipes &amp; Radar</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Gold Holographic Border Badge</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Direct Co-Founder Direct Invites</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Zero-Recruiter Spam Shield Protection</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Priority Inbound Synchronization</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSubscribe("gold")}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 active:scale-98 transition-all cursor-pointer"
            >
              <Crown className="w-4 h-4 text-white" />
              <span>Unlock Gold VIP Now</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Payment;
