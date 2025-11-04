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
      const response = await axios.get(BASE_URL + "/feed", {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log('Feed response:', response.data);
      dispatch(addFeed(response.data));
    }
    catch(error){
      console.log('Error:', error.response?.data || error.message);
    }
  }

  useEffect(() => {
    getFeed();
  }, [feed]);

  // console.log('Feed state:', feed);

  // if (!feed) {
  //   return (
  //     <div className="flex justify-center items-center my-20">
  //       <span className="loading loading-spinner loading-lg"></span>
  //     </div>
  //   )
  // }

  // // Handle array of users
  // if (Array.isArray(feed)) {
  //   return (
  //     <div className="flex flex-wrap justify-center gap-4 my-10">
  //       {feed.map((user, index) => (
  //         <UserCard key={user._id || index} user={user} />
  //       ))}
  //     </div>
  //   )
  // }

  // Handle single user object
  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed} />
    </div>
  )
}

export default Feed