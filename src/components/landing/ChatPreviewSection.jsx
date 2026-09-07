import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  Code2,
  CheckCheck,
  Sparkles,
  Terminal,
  Paperclip,
  Smile,
  Copy,
  Check,
  GitPullRequest,
  CheckCircle2,
  Clock,
  UserCheck,
  Volume2,
  Play,
  Pause,
  Radio,
  Share2,
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    sender: "Elena (AI Systems)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    isSelf: false,
    text: "Hey! Loved your Next.js 15 animation architecture repo. Are you open to collaborating on an autonomous agent dashboard for the hackathon?",
    time: "10:42 PM",
  },
  {
    id: 2,
    sender: "You",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    isSelf: true,
    text: "Absolutely! I already have the WebSocket stream and canvas pipeline ready. Here is how we can integrate your Rust inference engine:",
    code: `// Stream Inference Handler
export async function streamAgentEvents(req: Request) {
  const stream = await rustInferenceCore.subscribe({
    model: "devtinder-agent-v1",
    temperature: 0.2
  });
  return new Response(stream.toReadableStream());
}`,
    time: "10:43 PM",
  },
  {
    id: 3,
    sender: "Elena (AI Systems)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    isSelf: false,
    isVoice: true,
    voiceDuration: "0:24",
    text: "Listen to the architecture breakdown note:",
    time: "10:44 PM",
  },
];

const mockRequests = [
  {
    id: 1,
    name: "Vikram Mehta",
    role: "Senior Fullstack & WebGL",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    stack: ["Three.js", "React 19", "Rust"],
    status: "Interested in your Profile",
    synergy: "98.9%",
    time: "5m ago",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "DevOps & Cloud Architect",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    stack: ["Kubernetes", "Go", "Terraform"],
    status: "Sent Connection Request",
    synergy: "97.4%",
    time: "18m ago",
  },
];

const ChatPreviewSection = ({ playTone }) => {
  const [activeTab, setActiveTab] = useState("chat"); // "chat" | "requests" | "audio"
  const [messages, setMessages] = useState(initialMessages);
  const [inputVal, setInputVal] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    if (playTone) playTone(750, "sine", 0.08);

    const newMsg = {
      id: Date.now(),
      sender: "You",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      isSelf: true,
      text: text,
      time: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");

    // Simulate animated Elena reply after 1.2s
    setTimeout(() => {
      if (playTone) playTone(900, "sine", 0.08);
      const replyMsg = {
        id: Date.now() + 1,
        sender: "Elena (AI Systems)",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
        isSelf: false,
        text: "Merged into branch `collab/elena-squad`! Running automated test suite on CI now 🚀",
        time: "Just now",
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1200);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    if (playTone) playTone(950, "sine", 0.05);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="chat-preview" className="relative py-28 bg-[#050713] overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-pink-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-4">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Developer-First Chat Environment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Collaborate Like You're in an IDE.
            <span className="block mt-1 gradient-text-cyan-purple">
              Syntax Highlighting, Audio Notes &amp; PR Diffs.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            No plain text walls. Exchange runnable code snippets, listen to async voice huddles, and review mutual connection requests in real-time.
          </p>
        </div>

        {/* Linear/VS Code Themed Container */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel-glow border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Top Bar with Window Controls & Tabs */}
          <div className="bg-[#080d22] border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left: Active Peer Metadata */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80"
                  alt="Elena"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-500"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-[#080d22]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Elena Rostova</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                    Online &amp; Active
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">AI Systems • 98.8% Neural Synergy</p>
              </div>
            </div>

            {/* Right: Tab Switcher */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("chat");
                  if (playTone) playTone(500, "sine", 0.05);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                  activeTab === "chat"
                    ? "bg-pink-500 text-white shadow-md shadow-pink-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Code Chat
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("requests");
                  if (playTone) playTone(600, "sine", 0.05);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                  activeTab === "requests"
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Requests (2)
              </button>
            </div>

          </div>

          {/* Main Content Area */}
          {activeTab === "chat" ? (
            <div className="flex flex-col bg-[#050818] min-h-[460px] max-h-[520px]">
              
              {/* Message Stream */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                
                {/* System Match Pill */}
                <div className="flex items-center justify-center my-2">
                  <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span>Neural Match Confirmed: 98.8% Stack Alignment</span>
                  </div>
                </div>

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.isSelf ? "justify-end" : "justify-start"}`}
                  >
                    {!msg.isSelf && (
                      <img
                        src={msg.avatar}
                        alt={msg.sender}
                        className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
                      />
                    )}

                    <div
                      className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm ${
                        msg.isSelf
                          ? "bg-gradient-to-br from-pink-600/90 to-purple-600/90 text-white rounded-tr-none shadow-lg shadow-pink-600/20"
                          : "bg-[#0f1738] border border-white/10 text-slate-200 rounded-tl-none"
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>

                      {/* Code Snippet Card */}
                      {msg.code && (
                        <div className="mt-3 rounded-xl bg-[#030611] border border-white/15 p-3 font-mono text-xs text-cyan-300 relative">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-2 pb-1 border-b border-white/10">
                            <span>stream-handler.ts</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(msg.code)}
                              className="text-pink-400 hover:text-pink-300 flex items-center gap-1"
                            >
                              {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedCode ? "Copied" : "Copy"}</span>
                            </button>
                          </div>
                          <pre className="overflow-x-auto text-[11px] leading-relaxed">
                            {msg.code}
                          </pre>
                        </div>
                      )}

                      {/* Voice Note Audio Bar */}
                      {msg.isVoice && (
                        <div className="mt-3 p-3 rounded-xl bg-[#030611] border border-white/15 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setIsPlayingVoice(!isPlayingVoice);
                              if (playTone) playTone(isPlayingVoice ? 400 : 700, "sine", 0.05);
                            }}
                            className="p-2 rounded-lg bg-pink-500 text-white shadow-md"
                          >
                            {isPlayingVoice ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                          <div className="flex-1 flex items-center gap-1 h-6">
                            {[30, 80, 50, 95, 40, 75, 90, 60, 85, 45, 90, 35, 70].map((h, idx) => (
                              <span
                                key={idx}
                                className="w-1 bg-pink-400 rounded-full transition-all duration-200"
                                style={{
                                  height: isPlayingVoice ? `${h}%` : "30%",
                                  opacity: isPlayingVoice ? 0.9 : 0.4,
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            {msg.voiceDuration}
                          </span>
                        </div>
                      )}

                      <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] opacity-75 font-mono">
                        <span>{msg.time}</span>
                        {msg.isSelf && <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />}
                      </div>
                    </div>

                    {msg.isSelf && (
                      <img
                        src={msg.avatar}
                        alt={msg.sender}
                        className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Interactive Presets Bar */}
              <div className="px-6 py-2.5 bg-[#080d22] border-t border-white/5 flex items-center gap-2 overflow-x-auto">
                <span className="text-[10px] font-mono text-slate-500 uppercase shrink-0">Quick Code:</span>
                <button
                  type="button"
                  onClick={() => handleSendMessage("Let's spin up a Git repo and start shipping! 🚀")}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-pink-300 shrink-0 transition-colors"
                >
                  🚀 Spin up Git repo
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage("Reviewing your pull request on the auth pipeline 💻")}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-cyan-300 shrink-0 transition-colors"
                >
                  💻 Review PR diff
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage("Let's jump on a 15-min audio huddle to pair! ⚡")}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-purple-300 shrink-0 transition-colors"
                >
                  ⚡ Audio pair session
                </button>
              </div>

              {/* Bottom Interactive Message Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-4 bg-[#070b1e] border-t border-white/10 flex items-center gap-3"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Type a message, paste code snippet, or send markdown..."
                    className="w-full bg-[#030612] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="p-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          ) : (
            /* Connection Requests Review Tab */
            <div className="p-6 bg-[#050818] min-h-[460px] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                  Pending Developer Requests (2)
                </span>
                <span className="text-[11px] text-pink-400 font-mono">Verified Stack Overlaps</span>
              </div>

              {mockRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl bg-[#0b1029] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={req.avatar}
                      alt={req.name}
                      className="w-13 h-13 rounded-2xl object-cover ring-1 ring-white/20"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{req.name}</h4>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-mono font-bold">
                          {req.synergy} Match
                        </span>
                      </div>
                      <p className="text-xs text-pink-300 mt-0.5">{req.role}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        {req.stack.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-cyan-300 border border-white/5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-950/40 border border-white/10 text-xs font-semibold text-slate-300 hover:text-rose-400 transition-colors"
                    >
                      Ignore
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("chat");
                        if (playTone) playTone(880, "sine", 0.1);
                      }}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-xs font-bold text-white shadow-lg shadow-pink-500/30 hover:scale-105 transition-all"
                    >
                      Accept &amp; Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default ChatPreviewSection;
