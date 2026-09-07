import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router";
import {
  Users,
  Search,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Code2,
  Briefcase,
  Compass,
} from "lucide-react";
import { GithubIcon } from "./landing/DevIcons";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection) || [];
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConnection = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "get",
        url: BASE_URL + "/user/connection",
        withCredentials: true,
      });
      dispatch(addConnection(res?.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleConnection();
  }, []);

  const filteredConnections = connections.filter((c) => {
    const fullName = `${c.firstName || ""} ${c.lastName || ""}`.toLowerCase();
    const about = (c.about || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || about.includes(query);
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-[#030614] relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-purple-600/10 to-pink-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-2">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>Verified Developer Network</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Active Connections
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Engineers you've mutually matched and opened direct channels with
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or stack..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-500/60 text-white placeholder-slate-500 text-xs font-mono outline-none transition-all"
            />
          </div>
        </div>

        {/* Grid of Connections */}
        {filteredConnections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConnections.map((connection) => {
              const {
                _id,
                firstName,
                lastName,
                photoUrl,
                about,
                age,
                gender,
                skills,
              } = connection;

              const devSkills =
                skills && skills.length > 0
                  ? skills
                  : ["TypeScript", "React", "Node.js", "Docker"];

              return (
                <div
                  key={_id}
                  className="rounded-3xl glass-panel-glow border border-white/15 p-6 shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
                  <div>
                    {/* Top Avatar & Name */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-cyan-500/40 shrink-0">
                        <img
                          alt={`${firstName} ${lastName}`}
                          className="w-full h-full object-cover"
                          src={
                            photoUrl ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                          }
                        />
                        <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-black" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-base truncate group-hover:text-cyan-300 transition-colors">
                          {firstName} {lastName}
                        </h3>
                        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                          {age && <span>{age} yrs</span>}
                          {gender && (
                            <span>
                              • <span className="capitalize">{gender}</span>
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-cyan-400 mt-1 flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          <span>Full Stack Dev</span>
                        </div>
                      </div>
                    </div>

                    {/* About snippet */}
                    <p className="text-xs text-slate-300 line-clamp-2 font-sans mb-4 leading-relaxed">
                      {about ||
                        "Full stack engineer passionate about clean code architectures and rapid execution."}
                    </p>

                    {/* Skill chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {devSkills.slice(0, 4).map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                          #{sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                    <Link
                      to={`/chat/${_id}`}
                      className="flex-1 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Code Chat
                    </Link>

                    <button
                      type="button"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
                      title="GitHub Profile">
                      <GithubIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl glass-panel-glow border border-white/15 p-12 text-center max-w-md mx-auto shadow-2xl">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">
              No Connections Found
            </h3>
            <p className="text-xs font-mono text-slate-400 mb-6">
              {searchQuery
                ? "No developers match your current search criteria."
                : "You haven't matched with any developers yet. Jump into the discovery radar to find peers!"}
            </p>
            <Link
              to="/feed"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono font-bold text-xs shadow-lg shadow-pink-500/25">
              <Compass className="w-4 h-4" />
              <span>Explore Discovery Feed</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connection;
