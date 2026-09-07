import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Card from "../utils/card";
import {
  User,
  ShieldCheck,
  Sparkles,
  Camera,
  Save,
  CheckCircle2,
  AlertCircle,
  Code2,
  Tag,
} from "lucide-react";

const Profile = () => {
  const user = useSelector((store) => store.user) || {};
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "Male");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(
    user.skills && user.skills.length > 0
      ? user.skills.join(", ")
      : "React 19, TypeScript, Rust, Node.js, GraphQL"
  );
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      if (user.firstName) setFirstName(user.firstName);
      if (user.lastName) setLastName(user.lastName);
      if (user.photoUrl) setPhotoUrl(user.photoUrl);
      if (user.age) setAge(user.age);
      if (user.gender) setGender(user.gender);
      if (user.about) setAbout(user.about);
      if (user.skills) setSkills(user.skills.join(", "));
    }
  }, [user]);

  const editProfile = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);

    const parsedSkills = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await axios({
        method: "patch",
        url: BASE_URL + "/profile/edit",
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          photoUrl: photoUrl.trim(),
          age: Number(age) || 24,
          gender: gender || "Male",
          about: about.trim(),
          skills: parsedSkills,
        },
        withCredentials: true,
      });

      dispatch(addUser(res.data?.data || res.data));
      setToastMsg("Dev Passport updated successfully!");
      setTimeout(() => setToastMsg(null), 4000);
    } catch (error) {
      console.error(error);
      const rawError =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Failed to update profile.";
      setErrorMsg(typeof rawError === "string" ? rawError.replace(/^Error:\s*/i, "") : "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  // Preview user object for live sync
  const previewUser = {
    _id: user._id || "preview-id",
    firstName: firstName || "Alex",
    lastName: lastName || "Chen",
    photoUrl:
      photoUrl ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    age: age || 26,
    gender: gender || "Male",
    about:
      about ||
      "Building resilient distributed systems and next-gen developer tooling. Open to collaborating on high-throughput backend services.",
    skills: skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-[#030614] relative">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-pink-600/15 via-purple-600/15 to-cyan-500/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono text-xs mb-2">
            <User className="w-3.5 h-3.5 text-pink-400" />
            <span>Developer Identity &amp; Calibration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Dev Passport Calibration
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Real-time live preview of how you appear on the developer radar
          </p>
        </div>

        {/* Success / Error Toasts */}
        {toastMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-3 animate-fade-in shadow-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-xs flex items-center gap-3 animate-fade-in shadow-xl">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Dual-Pane Grid: Left Live Preview, Right Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Preview Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full mb-3 flex items-center justify-between px-2 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-pink-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Live Radar Preview
              </span>
              <span className="text-[11px] text-slate-500">Auto-synced</span>
            </div>
            <Card user={previewUser} />
          </div>

          {/* RIGHT: Profile Editor Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl glass-panel-glow border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>Developer Attributes</span>
            </h2>

            <form onSubmit={editProfile} className="space-y-4 font-mono text-xs">
              
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Marcus"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 text-white outline-none text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Vance"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 text-white outline-none text-xs"
                    required
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Avatar Photo URL
                </label>
                <div className="relative">
                  <Camera className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 text-white outline-none text-xs"
                  />
                </div>
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="26"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 text-white outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Gender Identity
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 text-white outline-none text-xs"
                  >
                    <option value="Male" className="bg-[#080d24]">Male</option>
                    <option value="Female" className="bg-[#080d24]">Female</option>
                    <option value="Other" className="bg-[#080d24]">Non-Binary / Other</option>
                  </select>
                </div>
              </div>

              {/* Skills Comma Separated */}
              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Verified Tech Skills (comma-separated)
                </label>
                <div className="relative">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="React 19, Rust, TypeScript, Docker, Go"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 text-white outline-none text-xs"
                  />
                </div>
              </div>

              {/* About / Bio */}
              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Developer Bio &amp; Architecture Focus
                </label>
                <textarea
                  rows={4}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Describe your current focus, favorite architectures, and ideal engineering peers..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-pink-500/60 text-white outline-none text-xs leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-400 hover:to-cyan-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "SAVING CHANGES..." : "Broadcast & Save Passport"}</span>
                </button>
              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;