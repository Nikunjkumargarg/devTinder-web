import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../Utils/constant'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Connections = () => {
    const [connections, setConnections] = useState([])

    const getConnections = async () => {
        try{
            const response = await axios.get(BASE_URL + "/user/connections", {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            console.log("response", response);
            setConnections(response?.data?.data);
        }
        catch(error){
            console.log("error", error);
        }
    }

    useEffect(() => {
        getConnections();
    }, []);

    if(!connections){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(connections.length === 0){
        return (
            <div>
                <h1>No connections found</h1>
            </div>
        )
    }

  return (
    <div className="flex flex-col items-center gap-4 my-10">
        <h1 className="text-2xl font-bold">Connections</h1>
        {connections.map((connection) => (
            <div key={connection._id} className="card card-side bg-base-300 shadow-md w-full max-w-2xl">
                <figure className="px-6 py-4">
                    <img 
                        src={connection.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                        alt={`${connection.firstname} ${connection.lastname}`} 
                        className="w-20 h-20 rounded-full object-cover" 
                    />
                </figure>
                <div className="card-body flex-row items-center gap-6">
                    <div className="flex-1 space-y-1">
                        <h2 className="card-title text-xl">{connection.firstname} {connection.lastname}</h2>
                        {(connection.age || connection.gender) && (
                            <p className="text-sm text-base-content/70">
                                {connection.age && connection.gender && `${connection.age}, ${connection.gender}`
                                }
                            </p>
                        )}
                        <p className="text-base-content/80">{connection.about || "This is a default about of the user!"}</p>
                    </div>
                    <Link 
                        to={`/chat/${connection._id}`} 
                        className="btn btn-sm btn-circle bg-neutral-900 text-white border-0 shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:bg-black"
                        aria-label={`Chat with ${connection.firstname}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6m0 0v6m0-6L10 16" />
                        </svg>
                    </Link>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Connections