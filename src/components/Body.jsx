import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios'
import { useEffect } from 'react'
import { BASE_URL } from '../Utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../Utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);

  const fetchUser = async() => {
    if(userData){
      return;
    }
    try{
      const response = await axios.get(BASE_URL + "/profile/view", {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      dispatch(addUser(response.data));
    }
    catch(error){
      if(error.response?.status === 401){
        navigate('/login');
        console.log('Error:', error.response?.data || error.message);
      }
      else{
        console.log('Error:', error.response?.data || error.message);
        navigate('/login');
      }
    }
  }

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
        <NavBar />  
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Body