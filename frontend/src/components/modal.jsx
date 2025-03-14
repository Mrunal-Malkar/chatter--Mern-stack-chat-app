import Modal from "react-modal";
import { ModalCont } from "../pages/home";
import React, { useContext, useState } from "react";

Modal.setAppElement("#root"); // Required for accessibility

const ConnectionModal = () => {
  const { isOpen, setIsOpen } = useContext(ModalCont);
  const [send, setSend] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      className="bg-transparent w-full h-full flex justify-center align-middle items-center p-2 self-center text-gray-100"
    >
      <div className="bg-gray-700 w-full md:w-2/4 lg:w-3/4 h-3/4 rounded-xl">
        <div className="w-full h-1/12 text-center font-semibold align-middle md:text-xl flex justify-between text-xl lg:text-2xl p-2 border-b-6 border-blue-400">
          <h1 className="w-11/12 text-center">Manage Connection's</h1>
          <button
            className="px-2 rounded-md bg-red-500 text-xl text-white"
            onClick={handleClose}
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="w-full h-11/12 rounded-b-xl min-h-max flex flex-col">
          <div className="w-full text-lg text-gray-100 font-mono flex">
            <div
              className={
                send
                  ? "w-1/2 p-2 text-center border-b-2 border-r-2 border-gray-500 bg-gray-900 hover:bg-gray-800"
                  : "w-1/2 p-2 text-center border-b-2 border-r-2 border-gray-500 hover:bg-gray-800"
              }
            >
              <button className="w-full h-full" onClick={() => setSend(true)}>
                Send request
              </button>
            </div>
            <div
              className={
                send
                  ? "w-1/2 p-2 text-center border-b-2 border-r-2 border-gray-500 hover:bg-gray-800"
                  : "w-1/2 p-2 text-center border-b-2 border-r-2 border-gray-500 bg-gray-900 hover:bg-gray-800"
              }
            >
              <button className="w-full h-full" onClick={() => setSend(false)}>
                Request received
              </button>
            </div>
          </div>

          {send ? (
            <div className="flex flex-col">
              <div className="w-full p-2 md:block hidden lg:text-2xl text-lg">
                <h1>Connect with people's</h1>
              </div>
              <div className="w-full flex flex-col p-2 overflow-auto h-[520px] rounded-b-xl">
                {/* the person to send req div */}
                <div className="min-h-[80px] mb-2 rounded-md bg-gray-800 w-full gap-x-4 flex p-1 items-center justify-between">
                  <div className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] circulardiv bg-gray-00 flex justify-center items-center"></div>
                  <div className="h-full flex justify-start align-middle items-center">
                    <h1 className="text-xl text-gray-200">
                      The person connected
                    </h1>
                  </div>
                  <div className="p-2 bg-green-600 text-black flex justify-center align-middle items-center font-mono text-md md:text-lg rounded-xl px-4">
                    <button className="text-center">Connect</button>
                  </div>
                </div>
                {/* the end of send request div */}
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="w-full p-2 md:block hidden lg:text-2xl text-lg">
                <h1>Request received</h1>
              </div>
              <div className="w-full flex flex-col p-2 overflow-auto h-[520px] rounded-b-xl">
                {/* the person to send req div */}
                <div className="min-h-[80px] mb-2 rounded-md bg-gray-800 w-full gap-x-4 flex p-1 items-center justify-between">
                  <div className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] circulardiv bg-gray-00 flex justify-center items-center"></div>
                  <div className="h-full flex justify-start align-middle items-center">
                    <h1 className="text-xl text-gray-200">
                      The person connected
                    </h1>
                  </div>
                  <div className="p-2 bg-green-600 text-black flex justify-center align-middle items-center font-mono text-md md:text-lg rounded-xl px-4">
                    <button className="text-center">Connect</button>
                  </div>
                </div>
                {/* the end of send request div */}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
    //   <button onClick={() => setIsOpen(!isOpen)}>click</button>
  );
};

export default ConnectionModal;
