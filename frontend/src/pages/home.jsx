import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import "./../stylesheets/home.css";
import { ToastContainer, toast } from "react-toastify";
import ConnectionModal from "../components/modal";

const ModalCont = createContext();

const Home = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("loading...");
  const [avatarno, setAvatarNo] = useState(null);
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState("loading...");
  const [isOpen, setIsOpen] = useState(false);

  const GetUser = async () => {
    try {
      console.log("thiss is the username:", import.meta.env.VITE_Base_Url);
      const user = await axios.get(`${import.meta.env.VITE_Base_Url}/getuser`, {
        withCredentials: true,
      });
      console.log(user);
      setUsername(user.data.user.username);
      setEmail(user.data.user.email);
      setAvatarNo(user.data.user.avatarno);

      setIsAuthenticated(true);
    } catch (err) {
      toast.error("please login or signup!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
  };

  const GetUsers = async () => {
    try {
      const allusers = await axios.get(`${import.meta.env.BASE_URL}/getusers`, {
        withCredentials: true,
      });
    } catch (err) {}
  };

  useEffect(() => {
    GetUser();
    // GetUsers();
  }, [window.location.href]);

  return (
    <>
      <ModalCont.Provider value={{isOpen,setIsOpen}}>
        <Navbar username={username} email={email} avatarno={avatarno} />
        <ConnectionModal />
        <div className="w-full h-[92vh] flex bg-[#288C9B] justify-center items-center">
          <ToastContainer />
          <div className="h-full  w-full bg-teal-500 flex">
            {/* the start of inner divs */}
            <div className="w-full min-w-[23rem] md:w-2/6 bg-[#25283D] p-3 flex flex-col overflow-auto scrollbardiv">
              {/* the start of search bar */}
              <div className="w-full flex overflow-auto p-1 min-h-[50px] max-h-[50x]">
                <div className="h-full rounded-l-md bg-gray-700 flex justify-center p-2 items-center">
                  <i class="fa-solid fa-magnifying-glass text-lg"></i>
                </div>
                <input
                  type="text"
                  placeholder="search here..."
                  className="w-full text-gray-300 ps-2 text-lg md:text-xl bg-gray-700 outline-none border-0 rounded-r-md h-full"
                />
              </div>
              {/* end of search bar */}

              {/* connect person div */}
              <div className="min-h-[80px] bg-gray-700 m-2 flex justify-start items-center p-1">
                <div className="min-w-[70px] bg-blue-500 min-h-[70px] max-w-[70px] max-h-[70px] circulardiv"></div>{" "}
                {/* profile pic div */}
                <div className="flex flex-col p-2 gap-y-1 w-full h-full text-gray-200">
                  {" "}
                  {/* name and message div */}
                  <div className="flex justify-between items-center w-full h-1/2">
                    <h1 className="xl:text-2xl text-xl my-0.5">
                      Connected person
                    </h1>
                    <p>5:00pm</p>
                  </div>
                  <div>
                    <p>Recent Message</p>
                  </div>
                </div>
              </div>
              {/* end of connect person div */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 md:pt-4 md:pb-4 md:text-xl text-lg w-3/4 rounded-md mx-auto font-semibold bg-gray-600 text-blue-400"
              >
                manage connections
              </button>
            </div>
            {/* end of first inner div */}

            {/* start of second inner div */}
            <div className="w-4/6 h-full bg-[#2D3047] md:flex flex-col hidden">
              {/* the div at top for info of person user is chatting with*/}
              <div className="min-h-[9%] bg-gray-700 gap-x-4 flex p-1 items-center justify-start">
                <div className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] circulardiv bg-gray-800 flex justify-center items-center"></div>
                <div className="h-full flex justify-start align-middle items-center">
                  <h1 className="text-xl text-gray-200">
                    The person connected
                  </h1>
                </div>
              </div>
              {/* end of top div for info */}

              {/* the middle div for messages */}
              <div className="min-h-[83%] max-h-[85%]"></div>
              {/* end of middle div for messages */}

              {/* the div at the bottom for input */}
              <div className="min-h-[8%] bg-gray-700 flex justify-start items-center p-2 text-xl">
                <div className="min-w-[5%] max-w-[5%] flex justify-center items-center">
                  <i class="fa-solid fa-plus text-3xl"></i>
                </div>
                <input
                  type="text"
                  placeholder="Type a message"
                  className="min-w-[90%] ps-3 max-w-[90%] h-full rounded-xl outline-none border-2 border-gray-400"
                />
                <div className="min-w-[5%] max-w-[5%] flex justify-center items-center">
                  <i class="fa-solid fa-arrow-up text-3xl"></i>
                </div>
              </div>
              {/* end of bottom div for input */}
            </div>
            {/* the end of second inner div */}
          </div>
        </div>
      </ModalCont.Provider>
    </>
  );
};

export {ModalCont};
export default Home;
