import React, { useEffect } from 'react'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import { Outlet, useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL } from '../utils/constants.js'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice.js'

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    if (user) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true
      })
      dispatch(addUser(res.data));
    }
    catch (error) {
      if (
        error.response?.status === 401 ||
        error.status === 401
      ) {
        if (
          location.pathname !== '/signup' &&
          location.pathname !== '/login' &&
          location.pathname !== '/' &&
          location.pathname !== '/landing' &&
          location.pathname !== '/blogs'
        ) {
          navigate("/login");
        }
      }
    }
  }

  useEffect(() => {
    if (
      location.pathname !== '/signup' &&
      location.pathname !== '/login' &&
      location.pathname !== '/landing'
    ) {
      fetchUser();
    }
  }, [location.pathname]);

  const isLanding = location.pathname === '/landing' || (location.pathname === '/' && !user);

  if (isLanding) {
    return (
      <div className="bg-[#030614] min-h-screen text-slate-100">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#030614] text-slate-100 selection:bg-pink-500 selection:text-white">
      <NavBar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body