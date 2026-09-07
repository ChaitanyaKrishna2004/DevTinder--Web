import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsTickerSection from "./StatsTickerSection";
import InteractiveDeckSection from "./InteractiveDeckSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import ChatPreviewSection from "./ChatPreviewSection";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
import CtaSection from "./CtaSection";
import LandingFooter from "./LandingFooter";
import { ArrowUp, Sparkles } from "lucide-react";

const LandingPage = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionGlow, setActiveSectionGlow] = useState("pink");
  const [clickRipples, setClickRipples] = useState([]);
  const audioCtxRef = useRef(null);

  // Advanced Polyphonic Web Audio Synthesizer
  const playTone = (freq = 600, type = "sine", duration = 0.1, gainVal = 0.04) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (!audioCtxRef.current) return;
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (err) {
      console.warn("Audio feedback context not available", err);
    }
  };

  // Play multi-voice harmonic chord
  const playChord = (frequencies = [523.25, 659.25, 783.99], duration = 0.3) => {
    if (!soundEnabled) return;
    frequencies.forEach((f) => playTone(f, "sine", duration, 0.025));
  };

  // Global interactive click ripple & spark effect
  const handleGlobalClick = (e) => {
    const newRipple = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      color: activeSectionGlow === "cyan" ? "#06b6d4" : activeSectionGlow === "gold" ? "#f59e0b" : "#ec4899",
    };

    setClickRipples((prev) => [...prev.slice(-8), newRipple]);
    setTimeout(() => {
      setClickRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  // Mouse tracking spotlight
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll tracking & Section Hue Shift
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 400);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((scrollY / totalScroll) * 100);
      }

      // Dynamic ambient hue shift based on scroll position
      if (scrollY < 900) setActiveSectionGlow("pink");
      else if (scrollY < 1800) setActiveSectionGlow("cyan");
      else if (scrollY < 2700) setActiveSectionGlow("purple");
      else if (scrollY < 3600) setActiveSectionGlow("gold");
      else setActiveSectionGlow("cosmic");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (playTone) playTone(750, "sine", 0.1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={handleGlobalClick}
      className="relative min-h-screen bg-[#03050d] text-slate-100 selection:bg-pink-500/30 selection:text-pink-200 overflow-x-hidden"
    >
      
      {/* Top Scroll Progress Glowing Line */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-black/40 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(236,72,153,0.8)] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Global Interactive Click Ripple Sparks */}
      {clickRipples.map((ripple) => (
        <span
          key={ripple.id}
          className="fixed pointer-events-none z-50 rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 animate-[ripple-ring_0.6s_ease-out_forwards]"
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: ripple.color,
            boxShadow: `0 0 20px ${ripple.color}`,
            width: "30px",
            height: "30px",
          }}
        />
      ))}

      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none fixed -inset-px z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(236, 72, 153, 0.07), transparent 80%)`,
        }}
      />

      {/* Dynamic Ambient Background Mesh */}
      <div
        className={`fixed inset-0 pointer-events-none transition-all duration-1000 opacity-30 ${
          activeSectionGlow === "cyan"
            ? "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-transparent"
            : activeSectionGlow === "purple"
            ? "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"
            : activeSectionGlow === "gold"
            ? "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-900/30 via-transparent to-transparent"
            : activeSectionGlow === "cosmic"
            ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/25 via-purple-950/20 to-transparent"
            : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/25 via-transparent to-transparent"
        }`}
      />

      {/* Floating Glass Navbar */}
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        playTone={playTone}
      />

      {/* Hero Section */}
      <HeroSection playTone={playTone} playChord={playChord} />

      {/* Stats Counters & Marquee Ticker */}
      <StatsTickerSection playTone={playTone} />

      {/* Interactive 3D Match Deck Simulator */}
      <InteractiveDeckSection playTone={playTone} playChord={playChord} />

      {/* Holographic Bento Features Grid with Synergy Matrix */}
      <FeaturesSection playTone={playTone} />

      {/* Laser Circuit How-It-Works 4-Stage Pipeline */}
      <HowItWorksSection playTone={playTone} />

      {/* Ultra-Luxurious Live IDE Chat & Audio Preview */}
      <ChatPreviewSection playTone={playTone} playChord={playChord} />

      {/* Verified Testimonials with Heatmap Visualizer */}
      <TestimonialsSection playTone={playTone} />

      {/* Cyber-Luxury Pricing Tier with Match Velocity Estimator */}
      <PricingSection playTone={playTone} />

      {/* Cosmic Vortex CTA & Live Handle Claimer */}
      <CtaSection playTone={playTone} playChord={playChord} />

      {/* Perspective 3D Grid Footer with CLI Prompt */}
      <LandingFooter playTone={playTone} />

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#0d132b]/95 border border-pink-500/50 text-slate-300 hover:text-white hover:border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:scale-110 active:scale-95 transition-all duration-200 backdrop-blur-xl"
          title="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5 text-pink-400" />
        </button>
      )}

    </div>
  );
};

export default LandingPage;
