import React from 'react'
import Navbar from '../components/navbar'

const Home = () => {
  return (
    <>
    <Navbar/>

    <div className="w-full h-[54rem] flex justify-center items-center bg-[rgb(13, 31, 45)] p-2 md:p-0">
        <div className="md:w-3/4 md:h-11/12 w-full h-full flex justify-start bg-base-300">
            
            <div className="w-2/6 bg-green-400">s</div>
            <div className="w-4/6 bg-green-200">ss</div>

        </div>
    </div>

    </>
  )
}

export default Home