import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        conversations: {}
    },
    reducers: {
        addMessages: (state, action) => {
            const { conversationId, messages } = action.payload;
            const existingMessages = state.conversations[conversationId] || [];
            const newMessages = messages.filter(
                (msg) => !existingMessages.some((existing) => existing._id === msg._id)
            );
            state.conversations[conversationId] = [...existingMessages, ...newMessages];
        },
        updateMessages: (state, action) => {
            const { conversationId, message } = action.payload;
            if (!state.conversations[conversationId]) {
                // Initialize the conversation if it doesn't exist
                state.conversations[conversationId] = [];
            }
            state.conversations[conversationId].push(message);
        }
        
    }
});

export const { addMessages, updateMessages } = messageSlice.actions;
export default messageSlice.reducer;
