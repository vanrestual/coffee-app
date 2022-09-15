import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/Context";

export function Header() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white">
      <div className="flex min-h-[3.5rem] items-center justify-center space-x-3.5 px-3.5 2xl:min-h-[4rem] 2xl:space-x-4 2xl:px-4">
        <button
          className="absolute right-2.5 inline-flex items-center justify-center rounded-xl p-2.5 text-red-500 transition duration-300 hover:bg-red-500/5 focus:outline-none md:right-3 2xl:right-3.5 2xl:p-3"
          onClick={() => {
            auth.signout(() => navigate("/"));
          }}
          title="Sign out"
        >
          <ArrowLeftOnRectangleIcon
            aria-hidden="true"
            className="h-5 w-5 shrink-0 2xl:h-6 2xl:w-6"
          />
        </button>
        <h1 className="text-center text-lg font-semibold text-gray-600 md:text-xl 2xl:text-2xl">
          Menu
        </h1>
      </div>
    </header>
  );
}

export default function Menu() {
  return <div>Menu</div>;
}
