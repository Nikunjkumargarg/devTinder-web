import { useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../Utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../Utils/feedSlice"
import UserCard from "./UserCard"

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
  return feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed.data[0]}/>
    </div>
  )
}

export default Feed