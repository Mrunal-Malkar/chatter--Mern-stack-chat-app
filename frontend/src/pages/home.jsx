import React from 'react'
import Navbar from '../components/navbar'
import "./../stylesheets/home.css"

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="w-full h-[92vh] flex bg-[#288C9B] justify-center items-center">
        <div className='h-full md:h-11/12 2xl:w-10/12 w-full bg-teal-500 flex'>
          {/* the start of inner divs */}
          <div className="w-full min-w-[23rem] md:w-2/6 bg-[#25283D] flex flex-col overflow-auto scrollbardiv">

            {/* connect person div */}
            <div className='min-h-[80px] bg-gray-700 m-2 flex justify-start items-center p-1'>
            
              <div className='min-w-[70px] bg-blue-500 min-h-[70px] max-w-[70px] max-h-[70px] border-2 connectprofilepicdiv'></div> {/* profile pic div */}
             
              <div className='flex flex-col p-2 gap-y-1 w-full h-full'> {/* name and message div */}
                <div className='flex justify-between items-center w-full h-1/2'>
                  <h1 className='text-xl md:text-2xl'>Mrunal Malkar</h1>
                  <p>5:00pm</p>
                </div>
                <div>
                  <p>Recent Message</p>
                </div>
              </div>
           
            </div>
            {/* end of connect person div */}

          </div>
          {/* end of first inner div */}
          <div className='w-4/6 bg-[#2D3047] hidden md:block'>s</div>
          {/* the end of inner divs */}
        </div>
      </div>

    </>
  )
}

export default Home