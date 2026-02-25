import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addfeed } from '../utils/feedSlice.js'
import Card from '../utils/card.jsx'
import { Outlet } from 'react-router'

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);
    console.log(feed);
    const fechfeed = async () => {
        try {
            const res = await axios({
                method: "get",
                url: BASE_URL + "/user/feed",
                withCredentials: true,
            })
            dispatch(addfeed(res.data));
            // console.log(res.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fechfeed();
    }, []);

    return (
        <div>
            <Card feed={feed} />
        </div>
    )
}

export default Feed