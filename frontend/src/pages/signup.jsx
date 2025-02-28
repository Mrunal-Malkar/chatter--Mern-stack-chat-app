import React from 'react'

const Signup = () => {
  return (
    <div className='w-full min-h-[100vh] flex'>
        
        <div className='md:w-3/6 lg:w-2/6 min-h-full w-full flex  justify-center items-center bg-amber-300'>
        <div className='w-11/12 flex'>
        <form action="" className='w-full h-full flex flex-col justify-center items-center p-2 gap-10 border-2 border-gray-700'>
            <input type="text" className='w-full border-2 rounded-2xl'  />
            <input type="text" className='w-full border-2 rounded-2xl' />
            <input type="password"className='w-full border-2 rounded-2xl'  />
            <button className='p-2 text-xl md:text-2xl text-green-400 bg-gray-600 rounded-2xl'>Submit</button>
        </form>
        </div>
        </div>

        <div className='md:w-4/6 min-h-full hidden md:flex bg-blue-500'>
        <img src="/intro.png" className='w-full h-full' alt="" />
        </div>

    </div>
  )
}

export default Signup