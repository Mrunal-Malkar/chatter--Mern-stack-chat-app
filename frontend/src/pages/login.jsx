import React from 'react'
import { NavLink } from 'react-router'

const Login = () => {
  return (
    <div className='w-full min-h-[100vh] flex justify-center algin-middle'>

      <div className='w-[300px] md:w-[400px] flex flex-col justify-center items-center'>

        <h1 className='text-4xl font-bold text-blue-400 m-2'>
          Log-in
        </h1>

        <form action="" className='flex flex-col gap-y-4 p-4 bg-[#2D232E] w-full text-xl rounded-xl border-2 border-gray-900'>

          <div className='flex flex-col m-1 w-full'>
            <label htmlFor="email" className='text-gray-300'>Email:</label>
            <input type="text" className='text-xl md:text-2xl rounded-xl p-1 outline-none' name='email' />
          </div>

          <div className='flex flex-col m-1 w-full'>
            <label htmlFor="password" className='text-gray-300'>Password</label>
            <input type="text" className='text-xl md:text-2xl rounded-xl p-1 outline-none' name='password' />
          </div>

          <div className='flex w-full justify-center items-center '>
            <button className='p-3 bg-[#201A20] text-gray-200 rounded-2xl'>Submit</button>
          </div>

        </form>

        <p>
          <span className='text-xl text-zinc-200 ms-2'>or </span>
          <span className='text-xl text-blue-400'><NavLink to={"/signup"}>Sign-up</NavLink></span>
          <span className='text-xl text-zinc-200'>instead</span>
        </p>

      </div>

    </div>
  )
}

export default Login