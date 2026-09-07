import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {
  Code2,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    if (e) e.preventDefault();

    if (!firstName || !lastName || !emailId || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (firstName.trim().length < 4) {
      setErrorMsg("First name must be at least 4 characters long.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      // 1. Create account
      const res = await axios({
        method: "post",
        url: BASE_URL + "/signup",
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          emailId: emailId.trim().toLowerCase(),
          password,
        },
        withCredentials: true,
      });

      setSuccessMsg("Account created! Authenticating session...");

      // 2. Auto-login immediately after signup to obtain session cookie
      try {
        const loginRes = await axios({
          method: "post",
          url: BASE_URL + "/login",
          data: {
            emailId: emailId.trim().toLowerCase(),
            password,
          },
          withCredentials: true,
        });

        dispatch(addUser(loginRes.data));
        navigate("/feed");
      } catch (loginErr) {
        // Fallback: redirect to login page
        setSuccessMsg("Account created successfully! Redirecting to Sign In...");
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }
    } catch (error) {
      console.error("Signup error:", error);
      const rawError =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Failed to create developer profile.";
      
      const cleanError = typeof rawError === "string" 
        ? rawError.replace(/^Error:\s*/i, "").replace(/^Error occured when saving the user data/i, "") 
        : "Failed to create developer profile.";

      setErrorMsg(cleanError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-[#030614] relative overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[500px] bg-gradient-to-tr from-purple-600/15 via-pink-600/15 to-cyan-500/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">
        <div className="rounded-3xl glass-panel-glow border border-white/15 p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-500 p-[1.5px] shadow-lg shadow-pink-500/25 mx-auto mb-4 flex items-center justify-center">
              <div className="w-full h-full bg-[#070b1e] rounded-[14px] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-pink-400" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Create Dev Passport
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Join thousands of verified builders, hackers &amp; founders
            </p>
          </div>

          {/* Success / Error Alerts */}
          {successMsg && (
            <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                  First Name <span className="text-[10px] text-slate-500 font-normal">(min 4 chars)</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Marcus"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 text-white placeholder-slate-600 text-xs font-mono outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Vance"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 text-white placeholder-slate-600 text-xs font-mono outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                Work / GitHub Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="marcus@kernel.dev"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 text-white placeholder-slate-600 text-xs font-mono outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono font-bold text-slate-300">
                  Strong Password
                </label>
                <span className="text-[10px] font-mono text-slate-500">
                  (Uppercase, number &amp; symbol e.g. Pass@123)
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g. DevTinder@123"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 text-white placeholder-slate-600 text-xs font-mono outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 active:scale-98 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>INITIALIZING PASSPORT...</span>
              ) : (
                <>
                  <span>Create Account &amp; Discover Stacks</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-xs text-slate-400 font-mono">
            Already have a Dev Passport?{" "}
            <Link
              to="/login"
              className="text-pink-400 font-bold hover:underline"
            >
              Sign In Instead →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;