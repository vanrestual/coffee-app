import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../authentication/Context';

export function Header() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
      <div className="min-h-[3.5rem] 2xl:min-h-[4rem] flex items-center justify-center space-x-3.5 2xl:space-x-4 px-3.5 2xl:px-4">
        <button
          className="absolute right-2.5 md:right-3 2xl:right-3.5 inline-flex justify-center items-center focus:outline-none transition duration-300 hover:bg-red-500/5 text-red-500 p-2.5 2xl:p-3 rounded-xl"
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
          title="Sign out"
        >
          <ArrowLeftOnRectangleIcon aria-hidden="true" className="w-5 h-5 2xl:w-6 2xl:h-6 shrink-0" />
        </button>
        <h1 className="text-lg md:text-xl 2xl:text-2xl text-center font-semibold text-gray-600">Menu</h1>
      </div>
    </header>
  )
}

export default function Menu() {
  return (
      <div>Menu</div>
  )
}
