import { useState } from 'react'
import Body from './components/Body'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Feed from './components/Feed'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from './Utils/appStore'

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="feed" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  ) 
}
export default App
