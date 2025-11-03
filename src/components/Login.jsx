import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../Utils/userSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('nikunj@gmail.com')
  const [password, setPassword] = useState('Niku@3232')
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(BASE_URL + "/login", { emailId: email, password: password }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (response.data) {
        dispatch(addUser(response.data));
        navigate('/');
      }
    } catch (error) {
      console.log('Error:', error.response?.data || error.message);
    }
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="flex justify-center items-center my-20">
      {/* Using <form> with onSubmit - BEST PRACTICE */}
      <form onSubmit={handleLogin}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-center text-lg font-bold">Login</legend>

          <label className="label">Email</label>
          <input 
            value={email} 
            onChange={handleEmailChange} 
            type="email" 
            className="input input-bordered w-full" 
            placeholder="Email" 
          />

          <label className="label">Password</label>
          <input 
            value={password} 
            onChange={handlePasswordChange} 
            type="password" 
            className="input input-bordered w-full" 
            placeholder="Password" 
          />

          {/* type="submit" triggers form onSubmit when clicked OR when Enter is pressed */}
          <button type="submit" className="btn btn-neutral mt-4 w-full">Login</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Login