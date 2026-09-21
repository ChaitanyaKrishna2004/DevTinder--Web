import React from "react";
import { BASE_URL } from "../utils/constants";
import { GithubIcon } from "./landing/DevIcons";

// A full page navigation: the backend redirects to GitHub and back to /feed
const GithubAuthButton = ({ label = "GitHub", className = "" }) => (
  <a
    href={`${BASE_URL}/auth/github`}
    className={`py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer ${className}`}
  >
    <GithubIcon className="w-4 h-4" />
    <span>{label}</span>
  </a>
);

export default GithubAuthButton;
