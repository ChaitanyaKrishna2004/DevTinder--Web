import React, { useState } from "react";
import {
  Star,
  Quote,
  CheckCircle2,
  GitBranch,
  Trophy,
  Heart,
  TrendingUp,
  Award,
  Layers,
} from "lucide-react";
import { GithubIcon } from "./DevIcons";

const testimonials = [
  {
    name: "Liam Kendrick",
    category: "founders",
    role: "Co-Founder & CEO @ VectorMesh",
    matchStory: "Found Technical Co-Founder in 48 hours",
    badge: "Raised $2.8M Seed",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    quote: "I was looking for a systems engineer with deep Rust and Raft consensus experience for 6 months. On DevTinder, I matched with Elena on my second swipe. We built our MVP in 3 weeks and closed our seed round 4 months later.",
    stack: ["Rust", "Raft", "Distributed Systems", "Go"],
    stars: "5.2k OSS Stars",
    commitStreak: [1, 3, 2, 4, 3, 5, 4, 2, 5, 4, 3, 5, 4, 5],
  },
  {
    name: "Chloe Zhang",
    category: "hackathons",
    role: "AI Lead & Hackathon 1st Place Winner",
    matchStory: "Formed Global Hackathon Squad",
    badge: "Won $50,000 Grand Prize",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    quote: "We needed a WebGL and Three.js frontend wizard to bring our neural diffusion project to life before the deadline. DevTinder's stack matcher paired us with Sophia instantly. We shipped 120fps visuals and won 1st place!",
    stack: ["PyTorch", "WebGL", "Next.js", "FastAPI"],
    stars: "8.9k OSS Stars",
    commitStreak: [3, 4, 5, 5, 4, 5, 5, 3, 4, 5, 4, 5, 5, 5],
  },
  {
    name: "Marcus Vance",
    category: "oss",
    role: "Staff Engineer @ OpenTelemetry Contributor",
    matchStory: "Recruited 5 Core Open-Source Maintainers",
    badge: "Top 1% Contributor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    quote: "DevTinder cuts through all the spam of LinkedIn and Twitter. You only match with developers who have verified GitHub commits and genuine technical passion. It's how developer networking was always meant to be.",
    stack: ["Go", "Kubernetes", "GraphQL", "eBPF"],
    stars: "14.2k OSS Stars",
    commitStreak: [2, 3, 4, 3, 5, 4, 5, 4, 3, 5, 4, 5, 4, 4],
  },
  {
    name: "Aisha Morales",
    category: "founders",
    role: "Fullstack Creator & Indie Hacker",
    matchStory: "Built Micro-SaaS to $18k MRR",
    badge: "Indie Hacker Featured",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    quote: "The in-app code chat is unmatched. Sharing syntax-highlighted snippets and PR diffs right inside our direct messages made our pair programming sessions feel like second nature. 10/10 recommended for all devs.",
    stack: ["React 19", "Tailwind", "Node.js", "PostgreSQL"],
    stars: "3.1k OSS Stars",
    commitStreak: [4, 5, 3, 4, 5, 4, 5, 5, 4, 3, 5, 4, 5, 3],
  },
];

const categories = [
  { id: "all", label: "All Match Stories" },
  { id: "founders", label: "Startup Founders" },
  { id: "hackathons", label: "Hackathon Squads" },
  { id: "oss", label: "OSS Maintainers" },
];

const TestimonialsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredList =
    activeCategory === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  return (
    <section id="testimonials" className="relative py-28 bg-[#040714] overflow-hidden border-t border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono text-xs uppercase tracking-wider mb-4">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span>Verified Developer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Real Matches. Real Startups.
            <span className="block mt-1 gradient-text-pink-orange">
              Shipped By DevTinder Connections.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-8">
            Discover how visionary software engineers met their co-founders, won prestigious hackathons, and built thriving open-source projects on DevTinder.
          </p>

          {/* Category Tabs */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#0a0f28] border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredList.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-panel-glow border border-white/15 hover:border-pink-500/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between group"
            >
              <div>
                {/* Header: Avatar, Name, Badge */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/15 group-hover:ring-pink-500 transition-all shadow-md"
                      />
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20 absolute -bottom-1 -right-1" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-400">{item.role}</p>
                      <span className="text-[11px] font-mono text-pink-400 font-semibold">
                        {item.matchStory}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold shrink-0">
                    {item.badge}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {"★".repeat(5)}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>

                {/* GitHub Heatmap Mini-Visualizer */}
                <div className="p-3 rounded-2xl bg-[#030611] border border-white/5 mb-6 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">Verified Git Activity:</span>
                  <div className="flex items-center gap-1">
                    {item.commitStreak.map((level, cIdx) => (
                      <span
                        key={cIdx}
                        className={`w-2.5 h-2.5 rounded-sm ${
                          level >= 5
                            ? "bg-emerald-400"
                            : level >= 3
                            ? "bg-emerald-600"
                            : "bg-emerald-900/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer: Tech Stack Chips & OSS Stars */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-cyan-300">
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>{item.stars}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
