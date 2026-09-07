import React from "react";
import { Code2, Zap, Rocket } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-[#030614] p-8 sm:p-12 text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            Dev<span className="text-pink-500">Tinder</span> Blogs
          </h1>
          <p className="text-slate-400 text-lg">
            Insights, engineering deep dives, and product updates from our team.
          </p>
        </div>
        
        <div className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-3xl p-8 glass-panel-glow">
          <div className="flex items-center gap-3 mb-4 text-pink-400 text-sm font-mono font-bold">
            <Zap className="w-5 h-5" />
            <span>Engineering</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Mastering React 19: The New Era of UI</h2>
          <p className="text-slate-400 mb-6 text-sm">Published on Aug 9, 2026</p>
          <p className="text-slate-300 leading-relaxed mb-6">
            React 19 introduces concurrent rendering features that fundamentally change how we build UI. In this post, we explore the new `use()` hook and Server Components, showing you how to migrate your existing DevTinder components for maximum performance.
          </p>
          <button className="text-pink-400 font-bold hover:underline">Read full article →</button>
        </div>

        <div className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-3xl p-8 glass-panel-glow">
          <div className="flex items-center gap-3 mb-4 text-cyan-400 text-sm font-mono font-bold">
            <Rocket className="w-5 h-5" />
            <span>Architecture</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Why Rust is the Future of Web Tooling</h2>
          <p className="text-slate-400 mb-6 text-sm">Published on Aug 1, 2026</p>
          <p className="text-slate-300 leading-relaxed mb-6">
            From turbopack to swc, Rust is eating the JavaScript ecosystem. Let's dive into why memory safety and performance matter for developer tools and how we are slowly migrating our core matchmaking services from Node.js to Rust.
          </p>
          <button className="text-cyan-400 font-bold hover:underline">Read full article →</button>
        </div>

        <div className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-3xl p-8 glass-panel-glow">
          <div className="flex items-center gap-3 mb-4 text-emerald-400 text-sm font-mono font-bold">
            <Code2 className="w-5 h-5" />
            <span>Community</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">How to find the perfect Co-Founder</h2>
          <p className="text-slate-400 mb-6 text-sm">Published on Jul 24, 2026</p>
          <p className="text-slate-300 leading-relaxed mb-6">
            Finding a technical co-founder is hard. It’s a marriage without the romance. In this post, we’ll outline the 5 red flags to watch out for, and the 3 green flags that indicate you’ve found the one.
          </p>
          <button className="text-emerald-400 font-bold hover:underline">Read full article →</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
