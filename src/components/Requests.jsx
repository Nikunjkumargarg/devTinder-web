import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../Utils/constant'
import { useEffect, useState } from 'react'

const Requests = () => {
  const [requests, setRequests] = useState([])

    const getRequests = async () => {
        try{
            const response = await axios.get(BASE_URL + "/user/requests/received", {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            console.log("requests response", response);
            setRequests(response?.data?.data);
        }
        catch(error){
            console.log("error", error);
        }
    }

    const reviewRequest = async (requestId, status) => {
        try{
            const response = await axios.post(BASE_URL + "/request/review/"+status+"/"+requestId, {}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log("review request response", response);
            if(response.status === 200){
            setRequests(requests.filter((request) => request._id !== requestId));
            }
        }
        catch(error){
            console.log("error", error);
        }
    }

    useEffect(() => {
        getRequests();
    }, []);

    if(!requests){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(requests.length === 0){
        return (
            <div>
                <h1>No requests found</h1>
            </div>
        )
    }
  return (
    <div className="flex flex-col items-center gap-4 my-10">
        <h1 className="text-2xl font-bold">Connection Requests</h1>
        {requests.map((request) => (
            <div key={request._id} className="card card-side bg-base-300 shadow-md w-full max-w-2xl">
                <figure className="px-6 py-4">
                    <img 
                        src={request?.fromUserId?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                        alt={`${request?.fromUserId?.firstname} ${request?.fromUserId?.lastname}`} 
                        className="w-20 h-20 rounded-full object-cover" 
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-xl">{request?.fromUserId?.firstname} {request?.fromUserId?.lastname}</h2>
                    {(request?.fromUserId?.age || request?.fromUserId?.gender) && (
                        <p className="text-sm text-base-content/70">
                            {request?.fromUserId?.age && request?.fromUserId?.gender && `${request.fromUserId.age}, ${request.fromUserId.gender}`}
                        </p>
                    )}
                    <p className="text-base-content/80">{request?.fromUserId?.about || "This is a default about of the user!"}</p>
                    <div className="card-actions justify-end mt-2">
                        <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => reviewRequest(request._id, "accepted")}
                        >
                            Accept
                        </button>
                        <button 
                            className="btn btn-secondary btn-sm" 
                            onClick={() => reviewRequest(request._id, "rejected")}
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Requests