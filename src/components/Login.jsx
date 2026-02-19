import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setemalId] = useState("friend2@gmail.com");
  const [password, setpassword] = useState("Friend2@#123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogin = async () => {
    try {
      // console.log(`${emailId} ${password}`)
      const res = await axios({
        method: 'POST',
        url: BASE_URL + '/login',
        data: {
          emailId,
          password
        },
        withCredentials: true
      });
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex justify-center m-20'>
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input type="text" value={emailId} placeholder="" className="input input-neutral" onChange={(e) => setemalId(e.target.value)} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input type="text" value={password} placeholder="" className="input input-neutral" onChange={(e) => setpassword(e.target.value)} />
          </fieldset>
          <div className="card-actions justify-center m-3">
            <button className="btn btn-primary" onClick={handlelogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login