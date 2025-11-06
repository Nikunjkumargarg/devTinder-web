import axios from 'axios'
import { BASE_URL } from '../Utils/constant'
import { useDispatch } from 'react-redux'
import { removeUserFeed } from '../Utils/feedSlice'

const UserCard = ({user}) => {
  const dispatch = useDispatch();
  const handleSendRequest = async(status, userId) => {
    try{
      const response = await axios.post(BASE_URL + "/request/send/"+status+"/"+userId, {}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("send request response", response);
      if(response.status === 200){
        dispatch(removeUserFeed(userId));
      }
    }
    
    catch(error){
      console.log("error", error);
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
    <figure className="px-10 pt-10">
      <img
        src={user.photoUrl}
        alt="user profile picture"
        className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{user.firstname} {user.lastname}</h2>
      {user.age && user.gender && <p>{user.age} {user.gender}</p>}
      <p>{user.about}</p>
      <div className="card-actions">
        <button onClick={() => handleSendRequest("ignored", user._id)} className="btn btn-secondary">Ignore</button>
        <button onClick={() => handleSendRequest("interested", user._id)} className="btn btn-primary">Send Request</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard