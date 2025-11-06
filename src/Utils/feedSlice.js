import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeUserFeed: (state, action) => {
            if (!state || !state.data) {
                return state;
            }
            const newFeed = state.data.filter((user) => user._id !== action.payload);
            return { ...state, data: newFeed };
        },
        removeFeed: (state, action) => null,
    }
});

export const { addFeed, removeUserFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;