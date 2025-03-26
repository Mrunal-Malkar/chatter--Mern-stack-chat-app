import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Navbar = (props) => {

  const handleLogout = async () => {
    const remove = await axios.get(`${import.meta.env.VITE_Base_Url}/auth/logout`, {
      withCredentials: true,
    });
    if (remove.status == 200) {
      toast.success("successfully loged out!");
      setTimeout(() => {
        return window.location.href = "/";
      }, 1000);
    } else {
      toast.error("unable to logout");
    }
  };

  return (
    <div className="flex justify-between p-2 items-center bg-[#AB2346] shadow-md">
      <a className="p-0 navbar-start btn-ghost inline text-xl">ChAtTeR</a>

      <div className="flex justify-between navbar-center items-center">
        <div className="h-10">
          <div className="min-w-10 h-full rounded-[50%] bg-black">
            <img
              className="w-full h-full"
              src={`https://robohash.org/${props.avatarno}`}
              alt=""
            />
          </div>
        </div>
        <div className="text-md h-5 text-xl md:min-w-40 flex flex-wrap">
          <p>{props.username}</p>
        </div>
      </div>

      <div className="navbar-end mr-2">
        <button onClick={handleLogout} className="btn text-md">
          logout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
