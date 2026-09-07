import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { Link } from "react-router";
import {
  UserPlus,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight,
  Zap,
} from "lucide-react";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request) || [];
  const [actingId, setActingId] = useState(null);

  const fetchReceived = async () => {
    try {
      const res = await axios({
        method: "get",
        url: BASE_URL + "/user/requests/received",
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async ({ status, requestId }) => {
    try {
      setActingId(requestId);
      await axios({
        method: "post",
        url: `${BASE_URL}/request/review/${status}/${requestId}`,
        withCredentials: true,
      });
      setTimeout(() => {
        dispatch(removeRequest(requestId));
        setActingId(null);
      }, 250);
    } catch (error) {
      console.log(error);
      setActingId(null);
    }
  };

  useEffect(() => {
    fetchReceived();
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-[#030614] relative">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-purple-600/15 via-pink-600/15 to-cyan-500/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs mb-2">
              <UserPlus className="w-3.5 h-3.5 text-purple-400" />
              <span>Inbound Connection Requests</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Pending Sync Invites
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Review and approve developers who requested to join your radar
              network
            </p>
          </div>

          {requests.length > 0 && (
            <div className="px-4 py-2 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold self-start">
              {requests.length} Pending
            </div>
          )}
        </div>

        {/* Requests List */}
        {requests && requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => {
              if (!request?.fromUserId) return null;
              const {
                _id,
                firstName,
                lastName,
                photoUrl,
                about,
                age,
                gender,
                skills,
              } = request.fromUserId;

              const devSkills =
                skills && skills.length > 0
                  ? skills
                  : ["React 19", "Go", "Kubernetes", "Postgres"];

              const isRemoving = actingId === request._id;

              return (
                <div
                  key={request._id}
                  className={`rounded-3xl glass-panel-glow border border-white/15 p-6 shadow-xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                    isRemoving
                      ? "opacity-0 scale-95"
                      : "hover:border-purple-500/40"
                  }`}>
                  {/* Left: Avatar + Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-purple-500/40 shrink-0">
                      <img
                        alt={`${firstName} ${lastName}`}
                        className="w-full h-full object-cover"
                        src={
                          photoUrl ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                        }
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-white text-base sm:text-lg">
                          {firstName} {lastName}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
                          99.2% Match
                        </span>
                      </div>

                      <div className="text-xs font-mono text-slate-400 mt-0.5">
                        {age && <span>{age} yrs • </span>}
                        {gender && (
                          <span className="capitalize">{gender} • </span>
                        )}
                        <span className="text-purple-300 font-semibold">
                          Wants to pair program
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 font-sans mt-2 line-clamp-2 leading-relaxed">
                        {about ||
                          "Hi! I saw your repository and stack alignment. Would love to connect and hack on high-performance backends."}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {devSkills.slice(0, 3).map((sk, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                            #{sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center sm:flex-col gap-2 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/10">
                    <button
                      type="button"
                      onClick={() =>
                        handleRequest({
                          status: "Accepted",
                          requestId: request._id,
                        })
                      }
                      className="flex-1 sm:w-36 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer">
                      <Check className="w-4 h-4" />
                      <span>Accept Invite</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleRequest({
                          status: "Rejected",
                          requestId: request._id,
                        })
                      }
                      className="flex-1 sm:w-36 py-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 font-mono font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer">
                      <X className="w-4 h-4" />
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl glass-panel-glow border border-white/15 p-12 text-center max-w-md mx-auto shadow-2xl">
            <UserPlus className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-1">
              All Caught Up!
            </h3>
            <p className="text-xs font-mono text-slate-400 mb-6">
              You have no pending connection requests at the moment. Keep
              swiping to discover peers.
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

export default Request;
