import Modal from "react-modal";
import { ModalCont } from "../pages/home";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

Modal.setAppElement("#root"); // Required for accessibility

const ConnectionModal = () => {
  const { isOpen, setIsOpen } = useContext(ModalCont);
  const [send, setSend] = useState(true);
  const [availableSend, setAvailableSend] = useState([]);
  const [requestSent, setRequestSent] = useState([]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAvailable = async () => {
    try {
      const availableContacts = await axios.get(
        `${import.meta.env.VITE_Base_Url}/getAvailable`,
        { withCredentials: true }
      );
      if (availableContacts) {
        setAvailableSend(availableContacts.data.contacts);
      }
    } catch (err) {
      console.log(err);
      toast(err.data.message || err.data || err);
    }
  };

  const handleRequested = async () => {
    try {
      const getRequestedContacts = await axios.get(
        `${import.meta.env.VITE_Base_Url}/getRequested`
      ,{withCredentials:true});
      if (getRequestedContacts.status == 200) {
        setRequestSent(getRequestedContacts.data.contacts);
      }
    } catch (err) {
      console.log(err);
      toast(err.response.data.error);
    }
  };

  const handleConnect = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_Base_Url}/action/reqconnect`,
        { receiverId: id },
        { withCredentials: true }
      );
      if (response.status == 200) {
        toast("sucessfully request send!");
        handleAvailable();
      }
    } catch (err) {
      console.log("error at connecting:", err);
      toast("error:",err.message||err.response.data.message||err.data || err);
    }
  };

  const handleAccept=async(id)=>{
    try{
      let response=await axios.post(`${import.meta.env.VITE_Base_Url}/action/reqaccept`,{id:id},{withCredentials:true});
      if(response.status==200){
        toast("sucessfully accepted request!");
        handleRequested();
      }
    }catch(err){
      console.log("error for accepting request:",err)
      toast(err.data.message||err.data.error||"error in accepting request");
    }
  }

  useEffect(() => {
    if (send) {
      handleAvailable();
    } else if (!send) {
      handleRequested();
    } else {
      setSend("No connection available.");
    }
  }, [send]);

  return (
    <Modal
      isOpen={isOpen}
      className="bg-transparent w-full h-full flex justify-center align-middle items-center p-2 self-center text-gray-100"
    >
      <div className="bg-gray-700 w-full md:w-2/4 lg:w-3/4 h-3/4 rounded-xl">
        <ToastContainer />
        <div className="w-full h-1/12 text-center font-semibold align-middle md:text-xl flex justify-between text-xl lg:text-2xl p-2 border-b-6 border-blue-400">
          <h1 className="w-11/12 text-center">Manage Connection&apos;s</h1>
          <button
            className="px-2 rounded-md bg-red-500 text-xl text-white"
            onClick={handleClose}
          >
            <i className="fa-solid fa-xmark"></i>
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
            <div className="flex flex-col h-5/6">
              <div className="w-full p-2 md:block h-1/12 hidden lg:text-2xl text-lg">
                <h1>Connect with people's</h1>
              </div>
              <div className="w-full flex flex-col p-2 overflow-auto h-11/12 rounded-b-xl">
                {/* the person to send req div */}
                {availableSend.length > 0 ? (
                  availableSend.map((contact) => (
                    <div
                      key={contact._id}
                      className="min-h-[80px] mb-2 rounded-md bg-gray-800 w-full gap-x-4 flex p-1 items-center justify-between"
                    >
                      <div className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] bg-black circulardiv flex justify-center items-center">
                        <img
                          src={`https://robohash.org/${contact.avatarno}`}
                          className="w-full h-full"
                          alt="avatar"
                        />
                      </div>
                      <div className="h-full flex justify-start items-center">
                        <h1 className="text-xl text-gray-200">
                          {contact.username}
                        </h1>
                      </div>
                      <div className="p-2 bg-green-600 text-black flex justify-center items-center font-mono text-md md:text-lg rounded-xl px-4">
                        <button
                          className="text-center"
                          onClick={() => handleConnect(contact._id)}
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-gray-400 text-center">No contacts</h1>
                )}

                {/* the end of send request div */}
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-5/6">
              <div className="w-full p-2 md:block hidden lg:text-2xl text-lg h-1/12">
                <h1>Request received</h1>
              </div>
              <div className="w-full flex flex-col p-2 overflow-auto h-11/12 rounded-b-xl">
                {/* the person to send req div */}
                {requestSent.length > 0 ? (
                  requestSent.map((contact) => (
                    <div
                      key={contact._id}
                      className="min-h-[80px] mb-2 rounded-md bg-gray-800 w-full gap-x-4 flex p-1 items-center justify-between"
                    >
                      <div className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] bg-black circulardiv flex justify-center items-center">
                        <img
                          src={`https://robohash.org/${contact.avatarno}`}
                          className="w-full h-full"
                          alt="avatar"
                        />
                      </div>
                      <div className="h-full flex justify-start items-center">
                        <h1 className="text-xl text-gray-200">
                          {contact.username}
                        </h1>
                      </div>
                      <div className="p-2 bg-green-600 text-black flex justify-center items-center font-mono text-md md:text-lg rounded-xl px-4">
                        <button
                          className="text-center"
                          onClick={() => handleAccept(contact._id)}
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-gray-400 text-center">No contacts</h1>
                )}

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
