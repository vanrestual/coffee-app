import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../authentication/Context";
import Logo from "../assets/logo.png";
import { useEffect } from "react";

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
      if (!auth.credentials) {
        navigate("/login");
      }
      navigate(location.state?.from?.pathname || "/", { replace: true });
    });
  };

  useEffect(() => {
    if (auth.credentials) {
      navigate(location.state?.from?.pathname || "/", { replace: true });
    }
  }, [auth.credentials, location.state?.from?.pathname, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <img
        alt="Logo Technopartner"
        className="h-auto w-full max-w-sm px-8 pt-24 md:pt-14 md:pb-8"
        src={Logo}
      />
      <form
        className="flex max-w-[15rem] grow flex-col items-center justify-center px-4 md:justify-start"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className="mb-2 block text-center font-medium text-gray-400"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="w-full rounded-xl border border-transparent py-2 text-sm text-gray-500 shadow transition duration-300 focus:border-gray-500 focus:shadow-none focus:outline-none focus:ring-2 focus:ring-gray-500"
            id="username"
            name="username"
            required
            type="email"
          />
        </div>
        <div className="mt-5">
          <label
            className="mb-2 block text-center font-medium text-gray-400"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full rounded-xl border border-transparent py-2 text-sm text-gray-500 shadow transition duration-300 focus:border-gray-500 focus:shadow-none focus:outline-none focus:ring-2 focus:ring-gray-500"
            id="password"
            name="password"
            required
            type="password"
          />
        </div>
        <button
          className="mt-10 inline-flex items-center justify-center truncate rounded-xl border-t border-gray-100 bg-white px-14 py-2 font-semibold text-gray-600 shadow-md transition duration-300 hover:bg-gray-600/5 hover:text-gray-700 hover:shadow-none focus:outline-none focus-visible:bg-gray-600/5 focus-visible:text-gray-700 focus-visible:shadow-none"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
