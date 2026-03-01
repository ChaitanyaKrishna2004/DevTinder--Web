import React, { useEffect } from 'react'
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import { Outlet, useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL } from '../utils/constants.js'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice.js'


const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
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
      if (error.status === 401) {
        // console.log("enter to the error status 401")
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body