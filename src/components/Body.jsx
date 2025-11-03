import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Body = () => {
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