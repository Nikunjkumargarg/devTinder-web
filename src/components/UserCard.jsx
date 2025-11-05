const UserCard = ({feedData}) => {
  {console.log("feedData",feedData)}
  return (
    
    <div className="card bg-base-300 w-96 shadow-sm">
    <figure className="px-10 pt-10">
      <img
        src={feedData.data[0].photoUrl}
        alt="Shoes"
        className="rounded-xl" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{feedData.data[0].firstname} {feedData.data[0].lastname}</h2>
      <p>{feedData.data[0].about}</p>
      <div className="card-actions">
        <button className="btn btn-secondary">Ignore</button>
        <button className="btn btn-primary">Send Request</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard