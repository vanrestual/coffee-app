import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../authentication/Context';
import Logo from "../assets/logo.png"
import { useEffect } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    auth.signin({ username, password }, () => {
      if(!auth.credentials) {
        navigate("/login");
      }
      navigate(location.state?.from?.pathname || "/", { replace: true });
    });
  }

  useEffect(() => {
    if(auth.credentials) {
      navigate(location.state?.from?.pathname || "/", { replace: true });
    }
  }, [auth.credentials, location.state?.from?.pathname, navigate])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <img alt="Logo Technopartner" className="max-w-sm w-full h-auto px-8 pt-24 md:pt-14 md:pb-8" src={Logo} />
      <form className="flex flex-col items-center justify-center md:justify-start grow px-4 max-w-[15rem]" onSubmit={handleSubmit}>
        <div>
          <label className="block text-center text-gray-400 font-medium mb-2" htmlFor="username">Email</label>
          <input className="shadow border border-transparent w-full rounded-xl focus:outline-none focus:shadow-none focus:ring-2 text-sm focus:ring-gray-500 py-2 focus:border-gray-500 text-gray-500 transition duration-300" id="username" name="username" required type="email" />
        </div>
        <div className="mt-5">
          <label className="block text-center text-gray-400 font-medium mb-2" htmlFor="password">Password</label>
          <input className="shadow border border-transparent w-full rounded-xl focus:outline-none focus:shadow-none focus:ring-2 text-sm py-2 focus:ring-gray-500 focus:border-gray-500 text-gray-500 transition duration-300" id="password" name="password" required type="password" />
        </div>
        <button className="mt-10 border-t px-14 py-2 truncate font-semibold text-gray-600 hover:text-gray-700 focus-visible:text-gray-700 bg-white hover:bg-gray-600/5 focus-visible:bg-gray-600/5 shadow-md rounded-xl border-gray-100 inline-flex justify-center hover:shadow-none focus-visible:shadow-none items-center focus:outline-none transition duration-300" type="submit">Login</button>
      </form>
    </div>
  );
}