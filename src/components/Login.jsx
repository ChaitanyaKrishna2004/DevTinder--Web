import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import {
  Code2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Zap,
} from "lucide-react";
import { GithubIcon, GoogleIcon } from "./landing/DevIcons";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!emailId || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios({
        method: "POST",
        url: BASE_URL + "/login",
        data: {
          emailId: emailId.trim().toLowerCase(),
          password,
        },
        withCredentials: true,
      });

      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      console.error("Login error:", err);
      const rawError =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Invalid credentials. Please verify your email and password.";

      const cleanError =
        typeof rawError === "string"
          ? rawError.replace(/^Error:\s*/i, "")
          : "Invalid credentials. Please verify your email and password.";

      setError(cleanError);
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmailId("elon.musk@x.com");
    setPassword("Elon@123");
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-[#030614] relative overflow-hidden">
      
      {/* Ambient Cyber Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-gradient-to-tr from-pink-600/15 via-purple-600/15 to-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Main Card */}
        <div className="rounded-3xl glass-panel-glow border border-white/15 p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-500 p-[1.5px] shadow-lg shadow-pink-500/25 mx-auto mb-4 flex items-center justify-center">
              <div className="w-full h-full bg-[#070b1e] rounded-[14px] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-pink-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Sign in to sync your developer radar &amp; matches
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                Developer Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="alex.chen@github.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/50 text-white placeholder-slate-600 text-xs font-mono transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">
                  Password
                </label>
                <span className="text-[11px] font-mono text-pink-400 hover:underline cursor-pointer">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 focus:ring-1 focus:ring-pink-500/50 text-white placeholder-slate-600 text-xs font-mono transition-all outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>Authenticate &amp; Launch</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick Demo Login Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono text-[11px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Fill Demo Credentials</span>
            </button>
          </div>

          {/* Social Auth Mockups */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <GoogleIcon className="w-4 h-4 text-rose-400" />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center text-xs text-slate-400 font-mono">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-pink-400 font-bold hover:underline"
            >
              Sign Up Now →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;