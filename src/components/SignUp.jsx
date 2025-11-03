import React from 'react'

const SignUp = () => {
  return (
    <div className="flex justify-center items-center my-20"><fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    <legend className="fieldset-legend text-center text-lg font-bold">Sign Up</legend>

    <label className="label">First Name</label>
    <input type="input" className="input" placeholder="First Name" />

    <label className="label">Last Name</label>
    <input type="input" className="input" placeholder="Last Name" />
  
    <label className="label">Email</label>
    <input type="email" className="input" placeholder="Email" />
  
    <label className="label">Password</label>
    <input type="password" className="input" placeholder="Password" />
  
    <button className="btn btn-neutral mt-4">Sign up</button>
  </fieldset></div>
  )
}

export default SignUp
