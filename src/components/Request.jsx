import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Request = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request)
    console.log(requests)
    const [Res, setRes] = useState('');
    const fetchReceived = async () => {
        try {
            const res = await axios({
                method: "get",
                url: BASE_URL + '/user/requests/received',
                withCredentials: true
            });
            dispatch(addRequest(res?.data?.data));
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleRequest = async ({ status, requestId }) => {
        try {
            const res = await axios({
                method: "post",
                url: `${BASE_URL}/request/review/${status}/${requestId}`,
                withCredentials: true
            });
            setRes(res?.data);
            dispatch(removeRequest(requestId));
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchReceived();
    }, []);

    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-2xl'>Requests</h1>
            {requests && requests?.map((request) => {
                const { _id, firstName, lastName, photoUrl, about, age, gender } = request.fromUserId;
                return (
                    <div className='flex items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto' key={request._id}>
                        <div className='w-40 h-40 object-cover rounded-lg'>
                            <img
                                alt='photo'
                                className='w-full h-full object-cover rounded-lg'
                                src={photoUrl}
                            />
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className='font-bold text-lg'>
                                {firstName + ' ' + lastName}
                            </h2>
                            {age && gender && <p className='my-2 text-sm'>{age} {gender}</p>}
                            <p>{about}</p>
                        </div>
                        <button onClick={() => handleRequest({ status: 'Rejected', requestId: request._id })} className="btn btn-primary mx-2">Reject</button>
                        <button onClick={() => handleRequest({ status: 'Accepted', requestId: request._id })} className="btn btn-secondary">Accept</button>
                    </div>
                );
            })}
        </div>
    )
}

export default Request;