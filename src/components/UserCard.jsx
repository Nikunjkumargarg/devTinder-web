const UserCard = ({feedData}) => {
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
        src={feedData.data[0].photoUrl}
        alt="user profile picture"
        className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{feedData.data[0].firstname} {feedData.data[0].lastname}</h2>
      {feedData.data[0].age && feedData.data[0].gender && <p>{feedData.data[0].age} {feedData.data[0].gender}</p>}
      <p>{feedData.data[0].about}</p>
      <div className="card-actions">
        <button onClick={handleIgnore} className="btn btn-secondary">Ignore</button>
        <button onClick={handleSendRequest} className="btn btn-primary">Send Request</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard