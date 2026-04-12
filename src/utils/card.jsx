import axios from 'axios';
import React from 'react'
import { BASE_URL } from './constants';
import { useDispatch } from 'react-redux';
import { removefeed } from './feedSlice';

const Card = ({ user }) => {
    if (!user) return
    const { _id, firstName, lastName, photoUrl, gender, age, about, skills } = user;

    const dispatch = useDispatch();

    const handleRequest = async (status, toUserId) => {
        try {
            const res = await axios({
                method: 'post',
                url: `${BASE_URL}/request/send/${status}/${toUserId}`,
                withCredentials: true
            });
            dispatch(removefeed(toUserId));
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex justify-center m-20">
            <div className="card bg-base-300 w-95 h-130 pb-3 shadow-sm">
                <figure>
                    <img className=''
                        src={photoUrl}
                        alt="Photo URL" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-bold">{firstName + " " + lastName}</h2>
                    <h3 className='my-1 font-semibold'>{age + " " + gender} </h3>
                    <h3 className='my-1 font-semibold'>{about}</h3>
                    <div className='card-actions justify-between mt-5'>
                        <button
                            className="btn  btn-primary"
                            onClick={() => handleRequest('Ignored', _id)}
                        >
                            Ignored
                        </button>
                        <button
                            className="btn btn-secondary "
                            onClick={() => handleRequest('Interested', _id)}
                        >
                            Interested
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;