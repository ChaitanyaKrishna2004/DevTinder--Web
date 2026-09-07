import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "./constants";
import { useDispatch } from "react-redux";
import { removefeed } from "./feedSlice";
import {
  Sparkles,
  X,
  Heart,
  Star,
  MapPin,
  Briefcase,
  GitBranch,
  ShieldCheck,
  Zap,
  Code2,
} from "lucide-react";

const Card = ({ user }) => {
  if (!user) return null;
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    gender,
    age,
    about,
    skills,
  } = user;

  const dispatch = useDispatch();
  const [isActing, setIsActing] = useState(false);
  const [actionType, setActionType] = useState(null);

  const handleRequest = async (status, toUserId) => {
    try {
      setIsActing(true);
      setActionType(status);
      await axios({
        method: "post",
        url: `${BASE_URL}/request/send/${status}/${toUserId}`,
        withCredentials: true,
      });

      setTimeout(() => {
        dispatch(removefeed(toUserId));
        setIsActing(false);
      }, 250);
    } catch (error) {
      console.log(error);
      setIsActing(false);
    }
  };

  // Fallback skills if empty
  const devSkills = skills && skills.length > 0
    ? skills
    : [];

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`rounded-3xl glass-panel-glow border border-white/20 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)] transition-all duration-300 transform ${
          isActing && actionType === "Interested"
            ? "translate-x-32 rotate-6 opacity-0"
            : isActing && actionType === "Ignored"
            ? "-translate-x-32 -rotate-6 opacity-0"
            : "hover:-translate-y-1"
        }`}
      >
        
        {/* Photo Container with Cyber Overlay */}
        <div className="relative h-80 sm:h-96 w-full bg-[#070c22] overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={
              photoUrl ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
            }
            alt={`${firstName} ${lastName}`}
          />

          {/* Top Holographic Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Dev</span>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-pink-500/80 backdrop-blur-md text-white font-mono text-[11px] font-black flex items-center gap-1 shadow-lg shadow-pink-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>98.8% Match</span>
            </div>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#090d24] via-[#090d24]/80 to-transparent pointer-events-none" />

          {/* Name & Basic Info Overlay on Image */}
          <div className="absolute bottom-4 left-6 right-6 pointer-events-none">
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                {firstName} {lastName}
              </h2>
              {age && (
                <span className="text-lg font-mono font-bold text-slate-300">
                  {age}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-300 mt-1">
              {gender && (
                <span className="capitalize">{gender}</span>
              )}
              <span>•</span>
              <span className="text-cyan-300 flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                Senior Full Stack Engineer
              </span>
            </div>
          </div>

        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 bg-[#090d24] space-y-5">
          
          {/* About / Bio */}
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Architecture &amp; Bio
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {about}
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              Verified Tech Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {devSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 text-slate-300 hover:text-pink-300 font-mono text-xs transition-colors"
                >
                  #{skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tactile Action Buttons */}
          <div className="pt-2 flex items-center justify-center gap-4">
            
            {/* Pass / Ignore Button */}
            <button
              type="button"
              onClick={() => handleRequest("Ignored", _id)}
              className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer"
              title="Pass Profile"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Super Match Button */}
            <button
              type="button"
              onClick={() => handleRequest("Interested", _id)}
              className="w-12 h-12 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer"
              title="Super Connect"
            >
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </button>

            {/* Connect / Interested Button */}
            <button
              type="button"
              onClick={() => handleRequest("Interested", _id)}
              className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Connect Stack</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Card;