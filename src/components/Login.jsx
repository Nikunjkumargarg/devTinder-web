import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(email, password)
    try {
      const response = await axios.post("http://localhost:7777/login", { emailId: email, password: password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
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