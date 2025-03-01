import React from 'react'

const Signup = () => {
  return (
    <div className='w-full min-h-[100vh] flex justify-center algin-middle'>

      <div className='w-[350px] flex flex-col justify-center items-center'>
        <h1 className='text-4xl font-bold text-zinc-100 m-2'>Sign-up</h1>
        <form action="" className='flex flex-col gap-y-4 p-4 bg-[#2D232E] w-full text-xl rounded-xl border-2 border-gray-900'>

          <div className='flex justify-end items-end flex-col'>
            <h3 className='text-2xl font-semibold self-center mb-2 text-gray-50'>Profile-Pic</h3>
            <div className='flex flex-col min-w-[300px] min-h-[300px] rounded-[50%] border-3 border-black bg-gray-500'>
              
            </div>
            <i class="fa-solid fa-camera relative text-2xl bottom-17 right-2 bg-gray-700 p-3 rounded-3xl border-2 border-gray-900"></i>
          </div>

          <div className='flex flex-col m-1 w-full'>
            <label htmlFor="username" className='text-gray-300'>Username:</label>
            <input type="text" className='text-xl md:text-2xl rounded-xl p-1 outline-none' name='username' />
          </div>

          <div className='flex flex-col m-1 w-full'>
            <label htmlFor="email" className='text-gray-300'>Email:</label>
            <input type="text" className='text-xl md:text-2xl rounded-xl p-1 outline-none' name='email' />
          </div>

          <div className='flex flex-col m-1 w-full'>
            <label htmlFor="password" className='text-gray-300'>Password</label>
            <input type="text" className='text-xl md:text-2xl rounded-xl p-1 outline-none' name='password' />
          </div>

          <div className='flex w-full justify-center items-center m-2'>
            <button className='p-3 bg-[#201A20] text-gray-200 rounded-2xl'>Submit</button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default Signup