import Modal from "react-modal";
import { ModalCont } from "../pages/home";
import React, { useContext } from "react";

Modal.setAppElement("#root"); // Required for accessibility

const ConnectionModal = () => {
  const { isOpen, setIsOpen } = useContext(ModalCont);

  const handleClose=()=>{
    setIsOpen(false)
  };

  return (
    <Modal
      isOpen={isOpen}
      className="bg-transparent w-full h-full flex justify-center align-middle items-center p-2 self-center text-gray-100"
    >
      <div className="bg-gray-700 w-full md:w-2/4 lg:w-3/4 h-3/4 rounded-xl">
        <div className="w-full h-1/12 text-center font-semibold align-middle md:text-xl flex justify-between text-xl lg:text-2xl p-2 border-b-6 border-blue-400">
          <h1 className="w-11/12 text-center">Manage Connection's</h1>
          <button className="px-2 rounded-md bg-red-500 text-xl text-white" onClick={handleClose}>
          <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="w-full h-11/12 rounded-b-xl min-h-max flex flex-col">
          <div className="w-full text-lg text-gray-100 font-mono flex">
            <div className="w-1/2 p-2 text-center border-b-2 border-r-2 border-gray-500 hover:bg-gray-800">
              <button>Send request</button>
            </div>
            <div className="w-1/2 p-2 text-center border-b-2 border-l-2 border-gray-500 hover:bg-gray-800">
              <button>Request received</button>
            </div>
          </div>
          <div className="bg-amber-200"></div>
        </div>
      </div>
    </Modal>
    //   <button onClick={() => setIsOpen(!isOpen)}>click</button>
  );
};

export default ConnectionModal;
