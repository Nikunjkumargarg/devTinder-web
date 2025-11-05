import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../Utils/constant'
import { useEffect, useState } from 'react'

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
                <div className="card-body">
                    <h2 className="card-title text-xl">{connection.firstname} {connection.lastname}</h2>
                    {(connection.age || connection.gender) && (
                        <p className="text-sm text-base-content/70">
                            {connection.age && connection.gender && `${connection.age}, ${connection.gender}`
                            }
                        </p>
                    )}
                    <p className="text-base-content/80">{connection.about || "This is a default about of the user!"}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Connections