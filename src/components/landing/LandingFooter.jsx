import React, { useState } from "react";
import { Link } from "react-router";
import {
  Code2,
  Heart,
  CheckCircle2,
  Terminal,
  Globe2,
  Sparkles,
  Radio,
} from "lucide-react";
import { GithubIcon, TwitterIcon, DiscordIcon, LinkedinIcon } from "./DevIcons";

const LandingFooter = ({ playTone }) => {
  const [cliCommand, setCliCommand] = useState("");
  const [cliFeedback, setCliFeedback] = useState("Type 'help' or 'status' in CLI");

  const handleCliSubmit = (e) => {
    e.preventDefault();
    const cmd = cliCommand.trim().toLowerCase();
    if (playTone) playTone(700, "sine", 0.05);

    if (cmd === "help" || cmd === "devtinder --help") {
      setCliFeedback("Commands: status, join, match, ping, clear");
    } else if (cmd === "status" || cmd === "devtinder --status") {
      setCliFeedback("All Systems Operational • 52,180 active devs online");
    } else if (cmd === "ping") {
      setCliFeedback("pong: latency 11ms (edge cluster us-east)");
    } else if (cmd === "join") {
      setCliFeedback("Opening signup portal... Redirecting!");
      window.location.href = "/signup";
    } else if (cmd === "clear") {
      setCliFeedback("Type 'help' or 'status' in CLI");
    } else {
      setCliFeedback(`Unknown command: '${cmd}'. Try 'help'`);
    }
    setCliCommand("");
  };

  return (
    <footer className="relative bg-[#02040a] border-t border-white/10 pt-20 pb-12 overflow-hidden text-slate-400 text-sm">
      
      {/* 3D Perspective Ground Floor Grid */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-grid-pattern opacity-15 grid-perspective-floor pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Interactive Developer CLI Bar */}
        <div className="mb-16 p-6 rounded-3xl glass-panel-glow border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                DevTinder Embedded Shell
              </div>
              <div className="text-xs font-mono text-cyan-300">
                {cliFeedback}
              </div>
            </div>
          </div>

          <form
            onSubmit={handleCliSubmit}
            className="flex items-center gap-2 w-full md:w-80 bg-[#040714] border border-white/10 rounded-xl px-3 py-2 font-mono text-xs"
          >
            <span className="text-pink-400 font-bold">$</span>
            <input
              type="text"
              value={cliCommand}
              onChange={(e) => setCliCommand(e.target.value)}
              placeholder="help | status | ping"
              className="w-full bg-transparent text-white placeholder-slate-600 focus:outline-none text-xs"
            />
          </form>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              onClick={() => playTone && playTone(600, "sine", 0.08)}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 p-[1.5px] shadow-lg shadow-pink-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-[#080c1d] rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-pink-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Dev<span className="text-pink-500">Tinder</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier developer matchmaking ecosystem. Connect with peer engineers, build visionary open-source software, and win hackathons together.
            </p>

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational • 99.99% Uptime</span>
            </div>
          </div>

          {/* Col 3: Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#deck" className="hover:text-pink-400 transition-colors">
                  Match Deck
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-pink-400 transition-colors">
                  AI Synergy Matrix
                </a>
              </li>
              <li>
                <a href="#chat-preview" className="hover:text-pink-400 transition-colors">
                  IDE Code Chat
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-pink-400 transition-colors">
                  DevTinder Gold
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-pink-400 transition-colors">
                  Member Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-cyan-400 transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <span className="hover:text-cyan-400 transition-colors cursor-pointer">
                  API Documentation
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Community Code of Conduct
                </span>
              </li>
              <li>
                <span className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Security &amp; Encryption
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Community & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Community
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-400 transition-all"
                title="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-purple-400 transition-all"
                title="Discord"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-blue-400 transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Join 50,000+ developers shipping modern software daily.
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} DevTinder Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 inline mx-0.5" />
            <span>for engineers who build the future.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default LandingFooter;
