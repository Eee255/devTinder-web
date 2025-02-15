import { createSlice } from "@reduxjs/toolkit";

const RequestsSlice = createSlice({
    name: 'Requests',
    initialState: null,
    reducers: {
        addRequestsData: (state, action) => {
            return action.payload;
        },
        removeRequestsData: () => {
            return null;
        },
        removeRequest: (state, action) => {
            console.log(state);
            const requestArray = state.filter((req) => req._id!=action.payload);
            return requestArray;
        }
    }
});

export const {addRequestsData, removeRequestsData, removeRequest} = RequestsSlice.actions;
export default RequestsSlice.reducer;