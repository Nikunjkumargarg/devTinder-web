import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../Utils/userSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../Utils/constant'

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('nikunj@gmail.com')
  const [password, setPassword] = useState('Niku@3232')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoginForm, setIsLoginForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response;
    try {
      if(isLoginForm){
        response = await axios.post(BASE_URL + "/login", { emailId: email, password: password }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        }
      else{
        response = await axios.post(BASE_URL + "/signup", { firstname: firstName, lastname: lastName, emailId: email, password: password }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
      }
      console.log("response",response)
      if (response.data) {
        dispatch(addUser(response.data));
        navigate('/');
      }
    } catch (error) {
      console.log("error",error)
      setErrorMessage(error.response?.data || "Something went wrong");
    }
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm)
    setErrorMessage('') // Clear error message when switching forms
  }

  return (
    <div className="flex justify-center items-center my-20">
      {/* Using <form> with onSubmit - BEST PRACTICE */}
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-center text-lg font-bold">{isLoginForm ? "Login" : "Sign Up"}</legend>

        {!isLoginForm && (<><label className="label">First Name</label>
        <input 
          value={firstName} 
          onChange={handleFirstNameChange} 
          type="text" 
          className="input input-bordered w-full" 
          placeholder="First Name" 
        /></>)}

          {!isLoginForm && (<><label className="label">Last Name</label>
          <input 
            value={lastName} 
            onChange={handleLastNameChange} 
            type="text" 
            className="input input-bordered w-full" 
            placeholder="Last Name" 
          /></>)}

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
          {errorMessage && <p className='text-red-500 text-sm'>Error: {errorMessage}</p>}
          {/* type="submit" triggers form onSubmit when clicked OR when Enter is pressed */}
          <button type="submit" className="btn btn-neutral mt-4 w-full">{isLoginForm ? "Login" : "Sign Up"}</button>
          
          <div className="text-center mt-4">
            <p className="text-sm">
              {isLoginForm ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                onClick={toggleForm}
                className="link link-primary"
              >
                {isLoginForm ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default Login