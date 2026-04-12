import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { SuccessAlert, ErrorAlert } from '../utils/Alert.jsx'

const Signup = () => {
    const [FisrtName, setFirstName] = useState('Virat');
    const [LastName, setLastName] = useState('Kohli');
    const [Email, setEmail] = useState('Virat@gmail.com');
    const [Password, setPassword] = useState('Virat@123');
    const [SuccessAlertMsg, setSuccessAlertMsg] = useState(null);
    const [ErrorAlertMsg, setErrorAlertMsg] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios({
                method: "post",
                url: BASE_URL + '/signup',
                data: {
                    firstName: FisrtName,
                    lastName: LastName,
                    emailId: Email,
                    password: Password
                },
                withCredentials: true
            })
            setSuccessAlertMsg("Sucessfully SignUp");
            setTimeout(() => {
                dispatch(addUser(res.data));
                navigate('/login');
            }, 3000);
        }
        catch (error) {
            console.log(error);
            setErrorAlertMsg("Failed to SignUp")
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setSuccessAlertMsg(null);
            setErrorAlertMsg(null);
        }, 3000)
    }, [SuccessAlertMsg, ErrorAlertMsg])
    return (
        <>
            {!!SuccessAlertMsg && <SuccessAlert Msg={SuccessAlertMsg} />}
            {!!ErrorAlertMsg && <ErrorAlert Msg={ErrorAlertMsg} />}
            < div className='flex justify-center mt-20' >
                <form onSubmit={handleSignup} className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <h1 className='text-2xl m-3'>Sign Up</h1>
                    <fieldset className="fieldset">
                        <label className="label">First Name</label>
                        <input
                            type="text" className="input validator"
                            required placeholder="First Name" pattern="[A-Za-z][A-Za-z0-9\-]*"
                            minLength="3" maxLength="30" title="Only letters, numbers or dash"
                            value={FisrtName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <p className="validator-hint hidden">
                            Must be 3 to 30 characters
                            <br />containing only letters, numbers or dash
                        </p>
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Last Name</label>
                        <input
                            type="text" className="input validator"
                            required placeholder="Last Name" pattern="[A-Za-z][A-Za-z0-9\-]*"
                            minLength="3" maxLength="30" title="Only letters, numbers or dash"
                            value={LastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <p className="validator-hint hidden">
                            Must be 3 to 30 characters
                            <br />containing only letters, numbers or dash
                        </p>
                    </fieldset>

                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input
                            type="email" className="input validator"
                            placeholder="Email" required
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="validator-hint hidden">Required</p>
                    </fieldset>

                    <label className="fieldset">
                        <span className="label">Password</span>
                        <input
                            type="password" className="input validator"
                            placeholder="Password" required
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="validator-hint hidden">Required</span>
                    </label>
                    <button className="btn btn-neutral mt-4" type="submit">Signup</button>
                    <div>
                        <Link to='/login' className="link link-info">Login</Link>
                    </div>
                </form>
            </div >
        </>
    )
}

export default Signup