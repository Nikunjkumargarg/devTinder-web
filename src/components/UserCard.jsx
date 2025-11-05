const UserCard = ({user}) => {
  const {firstname, lastname, photoUrl, age, gender, about} = user;
  const handleIgnore = async() => {
    console.log("ignore");
  }
  const handleSendRequest = () => {
    console.log("send request");
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
        <button onClick={handleIgnore} className="btn btn-secondary">Ignore</button>
        <button onClick={handleSendRequest} className="btn btn-primary">Send Request</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard