import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import {
  Code2,
  Compass,
  Users,
  UserPlus,
  Crown,
  LogOut,
  User,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const NavBar = () => {
  const [them, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const Logouthandler = async () => {
    try {
      const res = await axios({
        method: "post",
        url: BASE_URL + "/logout",
        withCredentials: true,
      });
      if (res.data === "User Successfully Logout" || res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      dispatch(removeUser());
      navigate("/login");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", them);
    localStorage.setItem("theme", them);
  }, [them]);

  const toggleThem = () => {
    setTheme(them === "dark" ? "light" : "dark");
  };

  const navItems = [
    { label: "Discovery Feed", path: "/feed", icon: Compass },
    { label: "Connections", path: "/connections", icon: Users },
    {
      label: "Requests",
      path: "/requests",
      icon: UserPlus,
      badge: requests?.length > 0 ? requests.length : null,
    },
    { label: "Gold VIP", path: "/payment", icon: Crown, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#060a1f]/90 backdrop-blur-xl border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Brand Logo */}
          <div className="flex items-center gap-6">
            <Link
              to={user ? "/feed" : "/"}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-500 p-[1.5px] shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-[#080c1d] rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-pink-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Dev<span className="text-pink-500">Tinder</span>
              </span>
            </Link>

            {/* In-App Route Tabs (when logged in) */}
            {user && (
              <nav className="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/10">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        isActive
                          ? "bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-sm"
                          : item.highlight
                          ? "text-amber-300 hover:bg-amber-500/10"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${item.highlight ? "text-amber-400" : ""}`} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded-full bg-pink-500 text-white text-[10px] font-black">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right Action Bar & User Profile */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleThem}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all hidden sm:block"
              title="Toggle Theme"
            >
              {them === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            {user && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                >
                  <div className="relative w-8 h-8 rounded-xl overflow-hidden ring-1 ring-pink-500/50">
                    <img
                      src={user.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                      alt={user.firstName}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-black" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-bold text-white leading-tight">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-[10px] font-mono text-pink-400">
                      Verified Dev
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <ul
                  tabIndex="-1"
                  className="menu dropdown-content z-50 mt-3 w-56 p-2 rounded-2xl glass-panel-glow border border-white/15 shadow-2xl space-y-1 font-mono text-xs text-slate-200"
                >
                  <li className="px-3 py-2 border-b border-white/10 text-[11px] text-slate-400 font-sans">
                    Signed in as <br />
                    <span className="font-mono text-white font-bold">{user.emailId || user.firstName}</span>
                  </li>
                  <li>
                    <Link to="/profile" className="flex items-center gap-2 py-2 rounded-xl hover:bg-white/10 hover:text-white">
                      <User className="w-4 h-4 text-pink-400" />
                      <span>Edit Profile</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/payment" className="flex items-center gap-2 py-2 rounded-xl hover:bg-white/10 hover:text-amber-300">
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span>DevTinder Gold VIP</span>
                    </Link>
                  </li>
                  <li className="pt-1 border-t border-white/10">
                    <button
                      type="button"
                      onClick={Logouthandler}
                      className="flex items-center gap-2 py-2 rounded-xl text-rose-300 hover:bg-rose-500/20 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-200 hover:text-white hover:bg-white/5 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-mono font-bold shadow-md shadow-pink-500/25 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>

        </div>
        
        {/* Mobile Nav Menu */}
        {user && mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass-panel-glow border border-white/15 space-y-2 shadow-2xl animate-fade-in mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono font-bold transition-all ${
                    isActive
                      ? "bg-pink-500/20 text-pink-300 border border-pink-500/40"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${item.highlight ? "text-amber-400" : ""}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-pink-500 text-white text-[10px] font-black">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
