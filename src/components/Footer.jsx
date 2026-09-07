import React from "react";
import { Link } from "react-router";
import { Code2, Heart, Shield, Terminal } from "lucide-react";
import { GithubIcon, TwitterIcon, DiscordIcon } from "./landing/DevIcons";

const Footer = () => {
  return (
    <footer className="w-full bg-[#030614] border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand + Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-pink-500/20 border border-pink-500/40 flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-pink-400" />
            </div>
            <span className="font-bold text-white">DevTinder Core</span>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Systems Operational</span>
          </div>
        </div>

        {/* Center: Message */}
        <div className="text-center text-slate-500">
          Crafted for 10x Engineers &amp; Open-Source Builders
        </div>

        {/* Right: Socials & Copyright */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-400 transition-colors"
          >
            <DiscordIcon className="w-4 h-4" />
          </a>
          <span className="text-slate-600">© {new Date().getFullYear()}</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;