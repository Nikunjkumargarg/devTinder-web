import { useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../Utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../Utils/feedSlice"
import UserCard from "./UserCard"
import { removeUserFeed } from "../Utils/feedSlice"
import { useNavigate } from "react-router-dom"
const Feed = () => {
  const feed = useSelector((store)=>store.feed);
  const dispatch = useDispatch();

  const getFeed = async() => {
    if(feed){ 
      return;
    }
    try{
      const response = await axios.get(BASE_URL + "/user/feed", {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      dispatch(addFeed(response.data));
    }
    catch(error){
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  // Handle single user object
  if (!feed || !feed.data || feed.data.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <p>No users available</p>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed.data[0]}/>
    </div>
  )
}

export default Feed