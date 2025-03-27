import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import io from "socket.io-client";
import "./../stylesheets/home.css";
import { ToastContainer, toast } from "react-toastify";
import ConnectionModal from "../components/modal";

const ModalCont = createContext();
const socket = io(import.meta.env.VITE_Base_Url);

const Home = () => {
  const [username, setUsername] = useState("loading...");
  const [avatarno, setAvatarNo] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connections, setConnections] = useState([]);
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [receiver, setReceiver] = useState(null);

  const scrolldiv = useRef();

  useEffect(() => {
    scrolldiv.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    socket.on("error", (err) => {
      toast.error(err);
    });
    socket.on("success", (success) => {
      setMessages((msg) => [...msg, success]);
      console.log("message succed", success);
    });
    socket.on("failed", (f) => {
      setMessages((messages) =>
        messages.filter((msg) => msg.content !== f.content)
      );
      console.log("this are the messages");
    });
  }, []);

  const GetUser = async () => {
    try {
      const user = await axios.get(`${import.meta.env.VITE_Base_Url}/getuser`, {
        withCredentials: true,
      });
      setUsername(user.data.user.username);
      setEmail(user.data.user.email);
      setAvatarNo(user.data.user.avatarno);
      setConnections(user.data.user.connections);
    } catch {
      toast.error("please login or signup!:");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
  };

  const refresh = () => {
    GetUser();
  };

  const handleSend = () => {
    if (receiver?._id && message.trim() !== "") {
      const details = {
        sender: email,
        receiver: receiver.email,
        message: message,
      };
      socket.emit("msgsent", details);
    } else {
      toast.error("please enter message to send!");
    }
  };

  useEffect(() => {
    GetUser();

    return () => {
      socket.off("success");
      socket.off("error");
      socket.off("disconnect");
      socket.off("register");
      socket.off("failed");
    };
  }, []);

  const yo = () => {
    console.log(messages);
  };

  useEffect(() => {
    try {
      if (receiver) {
        socket.emit("register", email);
        let fetch = async () => {
          let response = await axios.post(
            `${import.meta.env.VITE_Base_Url}/getMessages`,
            { receiver: receiver },
            { withCredentials: true }
          );
          console.log("this is the receiver:", receiver);
          console.log("this is the messages:", response.data.messages);
          setMessages(response.data.messages);
        };
        fetch();
      } else {
        setMessages([]);
        socket.emit("disconnected", email);
        console.log("no receiver");
      }
    } catch {
      setMessages([]);
      socket.emit("disconnected", email);
      console.log("no receiver");
      console.log("error in fetching messages");
    }
  }, [receiver, email]);

  return (
    <>
      <ModalCont.Provider value={{ isOpen, setIsOpen }}>
        <Navbar username={username} email={email} avatarno={avatarno} />
        <ConnectionModal />
        <div className="w-full h-[92vh] flex bg-[#288C9B] justify-center items-center">
          <ToastContainer />
          <div className="h-full  w-full bg-teal-500 flex">
            {/* the start of inner divs */}

            {/* for pc */}
            <div className="w-full min-w-[23rem] md:w-2/6 bg-[#25283D] p-3 hidden md:flex flex-col overflow-auto scrollbardiv">
              {/* the start of search bar */}
              <div className="w-full flex overflow-auto p-1 min-h-[50px] max-h-[50x]">
                <div className="h-full rounded-l-md bg-gray-700 flex justify-center p-2 items-center">
                  <i className="fa-solid fa-magnifying-glass text-lg"></i>
                </div>
                <input
                  type="text"
                  placeholder="search here..."
                  className="w-full text-gray-300 ps-2 text-lg md:text-xl bg-gray-700 outline-none border-0 h-full"
                />
                <div className="h-full rounded-r-md bg-gray-700 flex justify-center p-2 items-center">
                  <i
                    onClick={refresh}
                    className="fa-solid fa-arrows-rotate"
                  ></i>
                </div>
              </div>
              {/* end of search bar */}

              {/* connect person div */}
              {connections.length > 0 ? (
                connections.map((val) => {
                  return (
                    <div
                      key={val._id}
                      onClick={() => setReceiver(val)}
                      className="min-h-[80px] bg-gray-700 m-2 flex justify-start items-center p-1"
                    >
                      <div className="min-w-[70px] bg-blue-500 min-h-[70px] max-w-[70px] max-h-[70px] circulardiv">
                        <img
                          src={`https://robohash.org/${val.avatarno}`}
                          className="w-full h-full"
                          alt=""
                        />
                      </div>
                      {/* profile pic div */}
                      <div className="flex flex-col p-2 gap-y-1 w-full h-full text-gray-200">
                        {" "}
                        {/* name and message div */}
                        <div className="flex justify-between items-center w-full h-1/2">
                          <h1 className="xl:text-2xl text-xl my-0.5">
                            {val.username}
                          </h1>
                          <p>5:00pm</p>
                        </div>
                        <div>
                          <p>Recent Message</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1>No connection, Click on manage connection to make one!</h1>
              )}
              {/* end of connect person div */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 md:pt-4 md:pb-4 md:text-xl text-lg w-3/4 rounded-md mx-auto font-semibold bg-gray-600 text-blue-400"
              >
                manage connections
              </button>
            </div>

            {/* for mobile */}
            {receiver ? (
              <div className="w-full h-full bg-[#2D3047] text-white flex flex-col md:hidden">
                {/* the div at top for info of person user is chatting with*/}
                <div className="min-h-[9%] bg-gray-700 gap-x-4 flex p-1 items-center justify-start">
                  <div onClick={() => setReceiver(null)} className="p-1">
                    <i className="fa-solid fa-arrow-left m-0.5"></i>Back
                  </div>
                  <div className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] circulardiv bg-gray-800 flex justify-center items-center">
                    <img
                      src={`https://robohash.org/${receiver.avatarno}`}
                      className="w-full h-full"
                      alt=""
                    />
                  </div>
                  <div className="h-full flex justify-start align-middle items-center">
                    <h1 className="text-xl text-gray-200">
                      {receiver.username}
                    </h1>
                  </div>
                </div>
                {/* end of top div for info */}

                {/* the middle div for messages */}
                <div className="min-h-[83%] max-h-[85%] text-white">
                  {messages.length > 0 ? (
                    <div className="flex flex-col gap-y-7 p-8 h-full overflow-auto w-full text-xl text-gray-50">
                    {messages.map((msg) => {
                      return (
                        <div
                          onClick={yo}
                          key={msg._id || msg.content}
                          className={
                            msg.sender.email
                              ? msg.sender.email == email
                                ? "w-full flex justify-end align-middle "
                                : "w-full flex justify-start align-middle"
                              : msg.sender == email
                              ? "w-full flex justify-end align-middle"
                              : "w-full flex justify-start align-middle"
                          }
                        >
                          <div
                            className={
                              msg.sender.email
                                ? msg.sender.email == email
                                  ? "max-w-[45%] bg-gray-900 h-min p-2 rounded-l-2xl rounded-tr-2xl "
                                  : "max-w-[45%] rounded-r-2xl rounded-tl-2xl bg-gray-700 h-min p-2"
                                : msg.sender == email
                                ? "rounded-l-2xl max-w-[45%] bg-gray-900 h-min p-2"
                                : "max-w-[45%] bg-gray-700 rounded-r-2xl rounded-tl-2xl h-min p-2"
                            }
                          >
                            {msg.content}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={scrolldiv} />
                  </div>
                  ) : (
                    <div className="flex justify-between align-middle items-center">
                      <h1>Start the Convo💬</h1>
                    </div>
                  )}
                </div>
                {/* end of middle div for messages */}

                {/* the div at the bottom for input */}
                <div className="min-h-[8%] bg-gray-700 text-white flex justify-start items-center p-2 text-xl">
                  <div className="min-w-[5%] max-w-[5%] flex justify-center items-center">
                    <i className="fa-solid fa-plus text-2xl"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Type a message"
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-w-[90%] ps-3 max-w-[90%] h-full rounded-xl outline-none m-0.5 border-2 border-gray-400"
                  />
                  <div
                    onClick={handleSend}
                    className="min-w-[5%] max-w-[5%] flex justify-center items-center"
                  >
                    <i className="fa-solid fa-arrow-up text-2xl"></i>
                  </div>
                </div>
                {/* end of bottom div for input */}
              </div>
            ) : (
              <div className="w-full min-w-[23rem] md:w-2/6 md:hidden bg-[#25283D] p-3 flex flex-col overflow-auto scrollbardiv">
                {/* the start of search bar */}
                <div className="w-full flex overflow-auto p-1 min-h-[50px] max-h-[50x]">
                  <div className="h-full rounded-l-md bg-gray-700 flex justify-center p-2 items-center">
                    <i className="fa-solid fa-magnifying-glass text-lg"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="search here..."
                    className="w-full text-gray-300 ps-2 text-lg md:text-xl bg-gray-700 outline-none border-0 h-full"
                  />
                  <div className="h-full rounded-r-md bg-gray-700 flex justify-center p-2 items-center">
                    <i
                      onClick={refresh}
                      className="fa-solid fa-arrows-rotate"
                    ></i>
                  </div>
                </div>
                {/* end of search bar */}

                {/* connect person div */}
                {connections.length > 0 ? (
                  connections.map((val) => {
                    return (
                      <div
                        key={val._id}
                        onClick={() => setReceiver(val)}
                        className="min-h-[80px] bg-gray-700 m-2 flex justify-start items-center p-1"
                      >
                        <div className="min-w-[70px] bg-blue-500 min-h-[70px] max-w-[70px] max-h-[70px] circulardiv">
                          <img
                            src={`https://robohash.org/${val.avatarno}`}
                            className="w-full h-full"
                            alt=""
                          />
                        </div>
                        {/* profile pic div */}
                        <div className="flex flex-col p-2 gap-y-1 w-full h-full text-gray-200">
                          {" "}
                          {/* name and message div */}
                          <div className="flex justify-between items-center w-full h-1/2">
                            <h1 className="xl:text-2xl text-xl my-0.5">
                              {val.username}
                            </h1>
                            <p>5:00pm</p>
                          </div>
                          <div>
                            <p>Recent Message</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h1>
                    No connection, Click on manage connection to make one!
                  </h1>
                )}
                {/* end of connect person div */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 md:pt-4 md:pb-4 md:text-xl text-lg w-3/4 rounded-md mx-auto font-semibold bg-gray-600 text-blue-400"
                >
                  manage connections
                </button>
              </div>
            )}
            {/* end of first inner div */}

            {/* start of second inner div for md+ */}
            {receiver ? (
              <div className="w-4/6 h-full bg-[#2D3047] text-white md:flex flex-col hidden">
                {/* the div at top for info of person user is chatting with*/}
                <div className="min-h-[9%] bg-gray-700 gap-x-4 flex p-1 items-center justify-start">
                  <div className="min-h-[60px] max-h-[60px] min-w-[60px] max-w-[60px] circulardiv bg-gray-800 flex justify-center items-center">
                    <img
                      src={`https://robohash.org/${receiver.avatarno}`}
                      className="w-full h-full"
                      alt=""
                    />
                  </div>
                  <div className="h-full flex justify-start align-middle items-center">
                    <h1 className="text-xl text-gray-200">
                      {receiver.username}
                    </h1>
                  </div>
                </div>
                {/* end of top div for info */}

                {/* the middle div for messages */}
                <div className="min-h-[83%] max-h-[85%] ">
                  {messages.length > 0 ? (
                    <div className="flex flex-col gap-y-7 p-8 h-full overflow-auto w-full text-xl text-gray-50">
                      {messages.map((msg) => {
                        return (
                          <div
                            onClick={yo}
                            key={msg._id || msg.content}
                            className={
                              msg.sender.email
                                ? msg.sender.email == email
                                  ? "w-full flex justify-end align-middle "
                                  : "w-full flex justify-start align-middle"
                                : msg.sender == email
                                ? "w-full flex justify-end align-middle"
                                : "w-full flex justify-start align-middle"
                            }
                          >
                            <div
                              className={
                                msg.sender.email
                                  ? msg.sender.email == email
                                    ? "max-w-[45%] bg-gray-900 h-min p-2 rounded-l-2xl rounded-tr-2xl "
                                    : "max-w-[45%] rounded-r-2xl rounded-tl-2xl bg-gray-700 h-min p-2"
                                  : msg.sender == email
                                  ? "rounded-l-2xl max-w-[45%] bg-gray-900 h-min p-2"
                                  : "max-w-[45%] bg-gray-700 rounded-r-2xl rounded-tl-2xl h-min p-2"
                              }
                            >
                              {msg.content}
                            </div>
                          </div>
                        );
                      })}
                      <div ref={scrolldiv} />
                    </div>
                  ) : (
                    <div className="flex justify-between align-middle items-center">
                      <h1>Start the Convo💬</h1>
                    </div>
                  )}
                </div>
                {/* end of middle div for messages */}

                {/* the div at the bottom for input */}
                <div className="min-h-[8%] bg-gray-700 flex justify-start items-center p-2 text-xl">
                  <div className="min-w-[5%] max-w-[5%] flex justify-center items-center">
                    <i className="fa-solid fa-plus text-3xl"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Type a message"
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-w-[90%] ps-3 max-w-[90%] h-full rounded-xl outline-none border-2 border-gray-400"
                  />
                  <div
                    onClick={handleSend}
                    className="min-w-[5%] max-w-[5%] flex justify-center items-center"
                  >
                    <i className="fa-solid fa-arrow-up text-3xl"></i>
                  </div>
                </div>
                {/* end of bottom div for input */}
              </div>
            ) : (
              <div className="w-4/6 h-full bg-[#2D3047] md:flex items-center text-4xl hidden justify-center align-middle">
                <div className="p-2 text-3xl font-mono">
                  Chat using ChAtTeR
                  <i className="fa-regular fa-comment text-2xl m-1 text-gray-300"></i>
                </div>
              </div>
            )}
            {/* the end of second inner div for md+*/}
          </div>
        </div>
      </ModalCont.Provider>
    </>
  );
};

export { ModalCont };
export default Home;
