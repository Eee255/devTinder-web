import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { addUser } from "../Utils/UserSlice";


const Profile = () => {
  const userData = useSelector(store => store.User);
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [age, setAge] = useState(userData.age || "");
  const [gender, setGender] = useState(userData.gender || "");
  const [about, setAbout] = useState(userData?.about);
  const [photoUrl, setPhotUrl] = useState(userData?.photoUrl);
  const [saveToast , setSaveToast] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {

      const res = await axios.patch(BASE_URL + "/profile/edit", 
        {firstName, lastName, age, gender, photoUrl, about}, {withCredentials: true});

        dispatch(addUser(res.data.Data));
        setSaveToast(true);
        const timeoutId = setTimeout(()=>{
          setSaveToast(false)
        },3000);
        () => {
          clearTimeout(timeoutId);
        }
    } catch(err) {
      console.error(err);
    }
  }
  return userData && (
    <div className="flex">
      <div className=" mt-20 ml-36">
          <div className="card bg-base-300 w-96 shadow-xl">
              <div className="card-body">
                  <h2 className="card-title">Edit Profile</h2>
                  <div>
                      <label className="form-control w-full max-w-xs">
                      <div className="label">
                          <span className="label-text">First Name</span>
                      </div>
                      <input 
                          type="text" 
                          placeholder="Type here" 
                          value={firstName} 
                          onChange={(e)=> setFirstName(e.target.value)}
                          className="input input-bordered w-full max-w-xs" />
                      <div className="label">
                          <span className="label-text">Last Name</span>
                      </div>
                      <input 
                          type="text" 
                          placeholder="Type here"
                          value={lastName} 
                          onChange={(e)=> setLastName(e.target.value)}
                          className="input input-bordered w-full max-w-xs" />
                      </label>
                      <div className="label">
                          <span className="label-text">Age</span>
                      </div>
                      <input 
                          type="text" 
                          placeholder="Type here" 
                          value={age} 
                          onChange={(e)=> setAge(e.target.value)}
                          className="input input-bordered w-full max-w-xs" />
                      <div className="label">
                          <span className="label-text">Gender</span>
                      </div>
                      <input 
                          type="text" 
                          placeholder="Type here" 
                          value={gender} 
                          onChange={(e)=> setGender(e.target.value)}
                          className="input input-bordered w-full max-w-xs" />
                      <div className="label">
                          <span className="label-text">PhotoUrl</span>
                      </div>
                      <input 
                          type="text" 
                          placeholder="Type here" 
                          value={photoUrl} 
                          onChange={(e)=> setPhotUrl(e.target.value)}
                          className="input input-bordered w-full max-w-xs" />
                      <div className="label">
                          <span className="label-text">About</span>
                      </div>
                      <textarea
                          placeholder="Type here" 
                          value={about} 
                          onChange={(e)=> setAbout(e.target.value)}
                          className="input input-bordered w-full max-w-xs" />
                  </div>
                  <div className="card-actions justify-end mt-2">
                      <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
                  </div>
              </div>
          </div>
      </div>
      <div className="ml-8 mt-20">
        <UserCard user={{firstName, lastName, age, gender, photoUrl, about}}/>
      </div>
      {saveToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile updated successfully.</span>
        </div>
      </div>}
    </div>
  )
}

export default Profile