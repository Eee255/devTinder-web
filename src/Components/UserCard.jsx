import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../Utils/FeedSlice";


const UserCard = ({ user }) => {

    const dispatch = useDispatch();

    const handleUser = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, {withCredentials: true});
    
            dispatch(removeUser(_id));
        } catch(err) {
            console.error(err);
        }
    }
  return user && (
    <div>
        <div className="card bg-slate-900 w-96 shadow-xl text-white">
            <figure>
                <img
                src={user?.photoUrl}
                alt="user photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
                {user.age && user.gender && <p>{user.gender}, {user.age}</p>}
                <p>{user?.about}</p>
                <div className="card-actions justify-center p-2">
                    <button className="btn btn-primary" onClick={() => handleUser("ignored", user._id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleUser("interested", user._id)}>Intrested</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard