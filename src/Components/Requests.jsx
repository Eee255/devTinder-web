import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequestsData, removeRequest } from "../Utils/RequestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.Requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials: true});
      
      dispatch(addRequestsData(res.data.data));
    } catch(err) {
      console.error(err);
    }
  }

  const handleReview = async (status, _id) => {
    try {
       await axios.post(BASE_URL + '/request/review/' + status + "/" + _id, {}, {withCredentials: true} );
      
      dispatch(removeRequest(_id));
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if(!requests) return;
  if(requests.length === 0) return <h1 className="text-center my-4">No requests found!</h1>;

  return (
    <div className="my-6 flex flex-col items-center">
      <div className="font-bold text-3xl text-center mb-6">
        <h1>Requests</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 w-full max-w-screen-lg">
        {requests.map((request) => {
          const {firstName, lastName, age, gender, photoUrl, about, _id} = request.fromUserId;
          return (
            <div className="w-full md:w-96 mx-auto" key={_id}>
              <div className="card bg-neutral text-neutral-content shadow-xl rounded-lg">
                <div className="card-body">
                  <div className="flex items-center gap-4">
                    <div>
                      <img className="h-20 w-20 rounded-full object-cover" src={photoUrl} alt={firstName + " " + lastName}/>
                    </div>
                    <div>
                      <h1 className="font-bold text-xl">{firstName + " " + lastName}</h1>
                      {age && gender && <p>{gender}, {age} years old</p>}
                      <p className="text-sm text-gray-300">{about}</p>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button 
                      onClick={() => handleReview("accepted", request._id)}
                      className="btn btn-primary">
                          Accept</button>
                    <button 
                    onClick={() => handleReview("rejected", request._id)}
                      className="btn btn-secondary">
                          Reject</button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Requests;
