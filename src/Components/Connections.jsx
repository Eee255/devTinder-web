import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../Utils/constants";
import axios from "axios";
import { addConnectionsData } from "../Utils/ConnectionsSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import generateConversationId from "../Utils/generateConnectionId";
import { addMessages } from "../Utils/messageSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store => store.Connections);
  const userData = useSelector(store => store.User);
  
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
      dispatch(addConnectionsData(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  const handleChat = async (receiverId) => {
    
    try {
      const res = await fetch(`http://localhost:5000/getMessages/${receiverId}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json'},
        credentials: 'include'
      });
      const data = await res.json();
      const conversationId = generateConversationId(receiverId,userData._id);
      dispatch(addMessages({conversationId, messages: data.data}));
      navigate(`/chat/${userData._id}/${receiverId}`);
    } catch(err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0) return <h1 className="text-center text-lg font-semibold mt-10">No connections found</h1>;

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-3xl font-bold text-center mb-10">Connections</h1>
      
      <div className="flex flex-col space-y-8 w-full max-w-md">
        {connections.map((connection) => {
          const { firstName, lastName, age, gender, photoUrl, about, _id } = connection;

          return (
            <div onClick={() => handleChat(_id) } key={connection._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="flex items-center p-5">
                <img
                  className="w-24 h-24 rounded-full border-4 border-gray-200"
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                />
                <div className="ml-5">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-gray-600">
                      {gender + ", " + age}
                    </p>
                  )}
                  <p className="text-gray-700 mt-2">{about}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
