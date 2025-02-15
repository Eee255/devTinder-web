import { io } from "socket.io-client";
import Cookies from "js-cookie";

const token = Cookies.get('token');

const socket = io('https://dev-tinder-backend-2-1wgd.onrender.com', {
    auth: {
        token: token
    }
});

const joinRoom = (userId) => {
    socket.emit('join', userId);
}

const sendMessage = (messageData) => {
    socket.emit('sendMessage', messageData);
}

const onMessageReceived = (callback) => {
    const handler = (messageInfo) => callback(messageInfo);
    socket.on('message', handler);

    // Unsubscribe function to remove listener
    return () => {
        socket.off('message', handler);
    };
}

const messageRead = (messageId) => {
    socket.emit("messageRead", messageId);
}

export { joinRoom, sendMessage, onMessageReceived, messageRead };
