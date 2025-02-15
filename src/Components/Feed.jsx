import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData } from "../Utils/FeedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";


const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector(store => store.Feed);
  const getFeed = async () => {
    if(feedData) return;
    try {
      const res = await axios.get(BASE_URL + '/feed',{withCredentials: true});

      dispatch(addFeedData(res.data.data));
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getFeed();
  },[]);

  if(!feedData) return;
  if(feedData.length === 0) return <h1 className="flex justify-center my-5">No, new users found!</h1>
  
  return feedData && (
    <div className="flex justify-center mt-12">
      <UserCard user={feedData[0]}/>;
    </div>
  )
}

export default Feed;