import React, { useEffect, useState } from 'react'
import Card from '../utils/card';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [age, setage] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [about, setabout] = useState(user.about);
  const [msg, setmsg] = useState("");
  const dispatch = useDispatch();
  var data = {
    firstName, lastName, photoUrl, age, gender, about
  }
  const editprofile = async () => {
    try {
      const res = await axios({
        method: 'patch',
        url: BASE_URL + '/profile/edit',
        data: { firstName, lastName, photoUrl, age, gender, about },
        withCredentials: true
      })
      dispatch(addUser(res.data?.data))
      setmsg(res);
      setTimeout(() => {
        setmsg(null)
      }, 3000);
    }
    catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   fetchUser()
  // }, []);

  return (
    < div className='flex justify-center'>
      <div className='flex justify-center my-20'>
        <div className="card card-border bg-base-200 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" value={firstName} placeholder="" className="input input-neutral" onChange={(e) => setfirstName(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" value={lastName} placeholder="" className="input input-neutral" onChange={(e) => setlastName(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL</legend>
              <input type="text" value={photoUrl} placeholder="" className="input input-neutral" onChange={(e) => setphotoUrl(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">age</legend>
              <input type="text" value={age} placeholder="" className="input input-neutral" onChange={(e) => setage(e.target.value)} />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input type="text" value={gender} placeholder="" className="input input-neutral" onChange={(e) => setgender(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              {/* <input type="text" value={about} placeholder="" className="input input-neutral" onChange={(e) => setabout(e.target.value)} /> */}
              <textarea placeholder="" value={about} className="textarea textarea-neutral" onChange={(e) => setabout(e.target.value)}></textarea>
            </fieldset>
            <div className="card-actions justify-center m-3">
              <button className="btn btn-primary" onClick={editprofile}>Save Profile</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {
          user &&
          <Card user={data} />
        }
      </div>
      {msg &&
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Edit successfully.</span>
          </div>
        </div>
      }
    </div >
  )
}

export default Profile