import axios from "axios";
import { useState } from "react";
import { NavLink, useSearchParams } from "react-router";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let [searchparams] = useSearchParams();
  let errorAuth = searchparams.get("error");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_Base_Url}/auth/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (res.status == 200) {
        return (window.location.href = `/`);
      }

      return (window.location.href = `/login?error=${
        res.error || "Invalid login"
      }`);
    } catch (err) {
      window.location.href = `/login?error=${err.response.data.error || err.response.data || err.response || err}`;
    }
  };

  return (
    <div className="w-full min-h-[100vh] flex justify-center algin-middle bg-gray-900">
      <div className="w-[300px] md:w-[400px] flex flex-col justify-center items-center">
        {errorAuth && (
          <h1 className="text-red-700 text-[20px]">Error:{errorAuth}</h1>
        )}
        <h1 className="text-4xl font-bold text-blue-400 m-2">Log-in</h1>

        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col gap-y-4 p-4 bg-[#2D232E] text-white w-full text-xl rounded-xl border-2 border-gray-900"
        >
          <div className="flex flex-col m-1 w-full">
            <label htmlFor="email" className="text-gray-300">
              Email:
            </label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="text-xl md:text-2xl rounded-xl p-1 outline-none"
              name="email"
            />
          </div>

          <div className="flex flex-col m-1 w-full">
            <label htmlFor="password" className="text-gray-300">
              Password
            </label>
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              className="text-xl md:text-2xl rounded-xl p-1 outline-none"
              name="password"
            />
          </div>

          <div className="flex w-full justify-center items-center ">
            <input
              type="submit"
              className="p-3 bg-[#201A20] text-gray-200 rounded-2xl"
              value="Submit"
            />
          </div>
        </form>

        <p>
          <span className="text-xl text-zinc-200 ms-2">or </span>
          <span className="text-2xl text-blue-400 font-semibold">
            <NavLink to={"/signup"}>Sign-up </NavLink>
          </span>
          <span className="text-xl text-zinc-200">instead</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
