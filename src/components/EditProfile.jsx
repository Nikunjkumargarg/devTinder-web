import React from 'react'
import { useState } from 'react'
import UserCard from './UserCard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../Utils/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../Utils/userSlice'

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState(user.firstname || '')
  const [lastName, setLastName] = useState(user.lastname || '')
  const [age, setAge] = useState(user.age || '' || null)
  const [gender, setGender] = useState(user.gender || '' || null)
  const [about, setAbout] = useState(user.about || '' || null)
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '' || null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try{
      const response = await axios.patch(BASE_URL + "/profile/edit", {
        firstname: firstName,
        lastname: lastName,
        age: age.toString(),
        gender: gender,
        about: about,
        photoUrl: photoUrl
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("response", response.data);
      if (response.data) {
        dispatch(addUser(response.data.data));
        setErrorMessage(''); // Clear any previous errors
        setSuccessMessage('Profile updated successfully');
      }
    }
    catch(error){
      console.log("error", error);
      setErrorMessage(error.response?.data?.error || error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <>
    <div className='flex justify-center my-10'>
    <div className="flex justify-center mx-10">
      {/* Using <form> with onSubmit - BEST PRACTICE */}
      <form onSubmit={saveProfile}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-center text-lg font-bold">Edit Profile</legend>

          <label className="label">First Name</label>
          <input 
            value={firstName} 
            type="text" 
            className="input input-bordered w-full" 
            placeholder="First Name" 
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input 
            value={lastName} 
            type="text" 
            className="input input-bordered w-full" 
            placeholder="Last Name" 
            onChange={(e) => setLastName(e.target.value)}
          />

        <label className="label">Age</label>
          <input 
            value={age} 
            type="number" 
            className="input input-bordered w-full" 
            placeholder="Age" 
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Gender</label>
          <input 
            value={gender} 
            type="text" 
            className="input input-bordered w-full" 
            placeholder="Gender" 
            onChange={(e) => setGender(e.target.value)}
          />

          <label className="label">About</label>
          <input 
            value={about} 
            type="text" 
            className="input input-bordered w-full" 
            placeholder="About" 
            onChange={(e) => setAbout(e.target.value)}
          />

          <label className="label">Photo URL</label>
          <input 
            value={photoUrl} 
            type="text" 
            className="input input-bordered w-full" 
            placeholder="Photo URL" 
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          {errorMessage && <p className='text-red-500 text-sm'>Error: {errorMessage}</p>}
          {successMessage && <p className='text-green-500 text-sm'>Success: {successMessage}</p>}
          {/* type="submit" triggers form onSubmit when clicked OR when Enter is pressed */}
          <button type="submit" className="btn btn-neutral mt-4 w-full">Save Profile</button>
        </fieldset>
      </form>
    </div> 
    <UserCard user={{
      ...user,
      firstname: firstName,
      lastname: lastName,
      age: age,
      gender: gender,
      about: about,
      photoUrl: photoUrl
    }}/>
    </div>
    </>
  )
}

export default EditProfile