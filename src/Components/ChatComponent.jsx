import { useEffect, useState } from 'react';
import { joinRoom, sendMessage, onMessageReceived, messageRead } from '../services/socket';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import generateConversationId from '../Utils/generateConnectionId';
import { addMessages, updateMessages } from '../Utils/messageSlice';

const Chat = () => {
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState('');
    const { senderId, receiverId } = useParams();
    const messagesData = useSelector(store => store.Messages.conversations);
    const conversationId = generateConversationId(receiverId, senderId);

    const fetchMessages = async () => {
        const response = await fetch(`https://dev-tinder-backend-2-1wgd.onrender.com/getMessages/${receiverId}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' }
        });
        const data = await response.json();
        if (data.data.length > 0) {
            dispatch(addMessages({ conversationId, messages: data.data }));
            data.data.forEach(message => {
                if (message.status !== 'read' && message.toUserId === senderId) {
                    messageRead(message._id);
                }
            });
        }
    };

    useEffect(() => {
        joinRoom(senderId);
        fetchMessages();

        const handleNewMessage = (messageInfo) => {
            const { fromUserId, toUserId } = messageInfo.data;
            const newConversationId = generateConversationId(fromUserId, toUserId);
            dispatch(addMessages({ conversationId: newConversationId, messages: [messageInfo.data] }));
        };
        
        const unsubscribe = onMessageReceived(handleNewMessage);

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [senderId, receiverId, dispatch, conversationId]);

    const handleSendMessage = () => {
        const messageData = { senderId, receiverId, message: newMessage, status: 'sent' };
        sendMessage(messageData);
        dispatch(updateMessages({ conversationId, message: messageData }));
        setNewMessage('');
    };

    return messagesData && (
        <div className="flex flex-col h-screen max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
            {/* Chat messages area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                {messagesData[conversationId]?.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.fromUserId === senderId ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`${msg.fromUserId === senderId ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'} max-w-xs p-3 rounded-xl shadow-md break-words`}
                        >
                            <p className="text-sm leading-snug">{msg.message}</p>
                            <span className="text-xs text-gray-200 mt-1 block text-right">
                                {msg.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input area */}
            <div className="flex items-center p-3 border-t border-gray-300 bg-white">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-3 mr-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
