import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice';


const Connection = () => {
    const dispathch = useDispatch();
    const connections = useSelector((store) => store.connection);
    console.log(connections);

    const handleConnection = async () => {
        try {
            const res = await axios({
                method: "get",
                url: BASE_URL + '/user/connection',
                withCredentials: true,
            });
            console.log(res);
            dispathch(addConnection(res?.data));
        }
        catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleConnection();
    }, []);

    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-2xl'>Connection</h1>
            {connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, about, age, gender } = connection;
                return (
                    <div className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto' key={connection._id}>
                        <div>
                            <img
                                alt='photo'
                                className='w-auto h-auto rounded-lg'
                                src={photoUrl}
                            />
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className='font-bold text-lg'>
                                {firstName + ' ' + lastName}
                            </h2>
                            {age && gender && <p className='my-2'>{age} {gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Connection