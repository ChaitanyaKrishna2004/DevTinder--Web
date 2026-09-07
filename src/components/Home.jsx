import React from "react";
import { useSelector } from "react-redux";
import Feed from "./Feed.jsx";
import LandingPage from "./landing/LandingPage.jsx";

const Home = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <LandingPage />;
  }

  return <Feed />;
};

export default Home;
