import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Code2,
  Sparkles,
  Volume2,
  VolumeX,
  Menu,
  X,
  ArrowRight,
  Radio,
  Layers,
} from "lucide-react";

const navLinks = [
  { name: "Match Deck", href: "#deck" },
  { name: "AI Synergy", href: "#features" },
  { name: "Pipeline", href: "#how-it-works" },
  { name: "Code Chat", href: "#chat-preview" },
  { name: "Stories", href: "#testimonials" },
  { name: "Pricing", href: "#pricing" },
  { name: "Blogs", href: "/blogs" },
];

const Navbar = ({ soundEnabled, setSoundEnabled, playTone }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAudio = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState && playTone) {
      playTone(880, "sine", 0.15);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#030612]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Live Status Pill */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              onClick={() => playTone && playTone(650, "sine", 0.08)}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-500 p-[1.5px] shadow-lg shadow-pink-500/25 group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-[#080c1d] rounded-[14px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-pink-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                Dev<span className="text-pink-500">Tinder</span>
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>v2.4 Online</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-[#090d24]/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => playTone && playTone(500, "sine", 0.05)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all font-mono"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            


            {/* Login Link */}
            <Link
              to="/login"
              onClick={() => playTone && playTone(600, "sine", 0.08)}
              className="hidden sm:inline-block px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-white/5 transition-all font-mono"
            >
              Sign In
            </Link>

            {/* Join CTA Button */}
            <Link
              to="/signup"
              onClick={() => playTone && playTone(880, "sine", 0.12)}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs font-mono shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass-panel-glow border border-white/15 space-y-2 shadow-2xl animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (playTone) playTone(500, "sine", 0.05);
                }}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white font-mono transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-xl bg-white/5 text-slate-200 font-mono text-xs font-bold"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;
