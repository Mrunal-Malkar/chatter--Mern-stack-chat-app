import React, { useState } from 'react'
import { NavLink, useSearchParams } from 'react-router'
import { Cloudinary } from '@cloudinary/url-gen';

const Signup = () => {
  const [avatarNo,setAvatarNo]=useState(1);

  let [searchparams]=useSearchParams();
  let errorAuth=searchparams.get("error");

  const handleImage=async()=>{
    try{
      let no=Math.round(Math.random()*100);
      setAvatarNo(no);
    }catch(err){
      return "error in uploading image"
    }
  }

  return (
    <div className='w-full min-h-[100vh] flex justify-center algin-middle items-center md:flex-row flex-col'>

      <div className='w-[300px] md:w-[400px] flex flex-col justify-center items-center'>

        <h1 className='text-4xl font-bold text-blue-400 m-2'>
          Sign-up
          {errorAuth && <h1 className='text-red-700 text-[20px]'>Error:{errorAuth}</h1>}
        </h1>

        <form action="http://localhost:3000/auth/signup" method="POST" className='flex flex-col gap-y-4 p-4 bg-[#2D232E] w-full text-xl rounded-xl border-2 drop-shadow-2xl border-gray-700'>

          <div className='flex justify-end items-end flex-col'>
            
            <h3 className='text-2xl font-semibold self-center mb-2 text-gray-50'>Profile-Pic</h3>
            <div className='flex flex-col self-center w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-[50%] border-3 border-black bg-gray-800 overflow-hidden'>
              <img src={`https://avatar.iran.liara.run/public/${avatarNo}`} className="w-full h-full" alt="" />
            </div>
            
            <label className="md:bottom-18 md:right-10 relative bottom-15 right-6 p-3 flex flex-start rounded-3xl border-2 bg-gray-900 border-gray-900 cursor-pointer">
            <i onClick={handleImage} className="fa-solid fa-shuffle text-2xl"></i>
            <input type="hidden" name='avatarno' defaultValue={avatarNo} className='hidden' />
            </label>

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
            <input type="password" className='text-xl md:text-2xl rounded-xl p-1 outline-none' name='password' />
          </div>

          <div className='flex w-full justify-center items-center '>
            <button className='p-3 bg-[#201A20] text-gray-200 rounded-2xl'>Submit</button>
          </div>

        </form>


      </div>
        <p>
          <span className='md:text-2xl text-xl text-zinc-200 ms-2'>or </span>
          <span className='md:text-2xl text-blue-400 font-semibold'><NavLink to={"/login"}>Log-in</NavLink> </span>
          <span className='md:text-2xl text-xl text-zinc-200'>instead</span>
        </p>

    </div>
  )
}

export default Signup