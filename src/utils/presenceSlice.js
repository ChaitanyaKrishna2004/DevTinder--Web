import { createSlice } from "@reduxjs/toolkit";

// Ids of connections who currently have DevTinder open
const presenceSlice = createSlice({
    name: "presence",
    initialState: [],
    reducers: {
        setOnlineUsers: (state, action) => {
            return action.payload;
        },
        setUserOnline: (state, action) => {
            const { userId, online } = action.payload;
            const others = state.filter((id) => id !== userId);
            return online ? [...others, userId] : others;
        },
    },
});

export const { setOnlineUsers, setUserOnline } = presenceSlice.actions;
export default presenceSlice.reducer;
