import { createSlice } from "@reduxjs/toolkit";

const ConnectionsSlice = createSlice({
    name: 'Connections',
    initialState: null,
    reducers: {
        addConnectionsData: (state, action) => {
            return action.payload;
        },
        removeConnectionsData: () => {
            return null;
        } 
    }
});

export const {addConnectionsData, removeConnectionsData} = ConnectionsSlice.actions;
export default ConnectionsSlice.reducer;