import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedSlice.js";
import Card from "../utils/card.jsx";
import {
  Compass,
  RefreshCw,
  Sparkles,
  Users,
  Search,
  Zap,
} from "lucide-react";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFeed = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "get",
        url: BASE_URL + "/user/feed",
        withCredentials: true,
      });
      dispatch(addfeed(res.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-4 px-4 sm:px-6 bg-[#030614] relative flex flex-col items-center justify-center">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-pink-600/15 via-purple-600/15 to-cyan-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl">
        


        {/* Card Display or Empty State */}
        {feed && feed.length > 0 ? (
          <Card user={feed[0]} />
        ) : (
          <div className="rounded-3xl glass-panel-glow border border-white/15 p-10 sm:p-12 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            
            {/* Animated Radar Pulse Visualizer */}
            <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-pink-500/30 animate-radar" />
              <div className="absolute inset-2 rounded-full border border-cyan-500/40 animate-ping opacity-30" />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-500 p-[1.5px] shadow-xl flex items-center justify-center">
                <div className="w-full h-full bg-[#080d24] rounded-[14px] flex items-center justify-center">
                  <Compass className="w-8 h-8 text-pink-400 animate-spin-slow" />
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight mb-2">
              Radar Queue Exhausted
            </h3>
            <p className="text-xs font-mono text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
              You've evaluated all developers matching your current vector radius. We're indexing new GitHub pull requests &amp; profiles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={fetchFeed}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 active:scale-95 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Re-scan Proximity</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Feed;