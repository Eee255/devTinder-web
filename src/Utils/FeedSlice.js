import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeedData: (state, action) => {
            return action.payload;
        },
        removeFeedDate: () => {
            return null;
        },
        removeUser: (state, action) => {
            const newFeed = state.filter(user => user._id != action.payload);
            return newFeed;
        }
    }
});

export const {addFeedData, removeFeedDate, removeUser} = feedSlice.actions
export default feedSlice.reducer;