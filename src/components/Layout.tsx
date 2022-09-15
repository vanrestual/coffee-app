import { ReactElement } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/Context";
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import Logo from "../assets/logo.png"
import Home from "../assets/home.png"
import HomeActive from "../assets/home-active.png"
import Menu from "../assets/menu.png"
import MenuActive from "../assets/menu-active.png"

export default function Layout({ header }: { header?: ReactElement}) {
  const auth = useAuth();
  const navigate = useNavigate();
  
  return (
    <>
      {header ?? (
        <header className="bg-white border-b sticky top-0 z-20">
          <div className="min-h-[3.5rem] 2xl:min-h-[4rem] flex items-center justify-between space-x-3.5 2xl:space-x-4 px-3.5 2xl:px-4">
            <img className="h-12 2xl:h-14 w-auto" alt="Logo Technopartner" src={Logo} />
            <button
              className="inline-flex justify-center items-center focus:outline-none transition duration-300 hover:bg-red-500/5 text-red-500 p-2.5 2xl:p-3 rounded-xl"
              onClick={() => {
                auth.signout(() => navigate("/"));
              }}
              title="Sign out"
            >
              <ArrowLeftOnRectangleIcon aria-hidden="true" className="w-5 h-5 2xl:w-6 2xl:h-6 shrink-0" />
            </button>
          </div>
        </header>
      )}
      <main className="grow pb-8 md:pb-10 2xl:pb-12"><Outlet /></main>
      <footer className="bg-white border-t sticky bottom-0 z-20 overflow-hidden shadow-xl">
        <div className="min-h-[4rem] md:min-h-[4.5rem] 2xl:min-h-[5rem] grid grid-flow-col auto-cols-fr place-content-stretch">
          <NavLink className={({ isActive }) => clsx(isActive ? "text-gray-600" : "hover:bg-gray-500/5 text-gray-400", "flex flex-col justify-center items-center text-xs md:text-sm 2xl:text-base font-medium focus:outline-none")} to="/" end>
            {({ isActive }) => isActive ? (
              <>
                <img className="h-5 2xl:h-6 w-auto mb-1 2xl:mb-1.5" alt="Home Active" src={HomeActive} />
                Home
              </>
            ) : (
              <>
                <img className="h-5 2xl:h-6 w-auto mb-1 2xl:mb-1.5" alt="Home" src={Home} />
                Home
              </>
            )}
          </NavLink>
          <NavLink className={({isActive}) => clsx(isActive ? "text-gray-600" : "hover:bg-gray-500/5 text-gray-400", "flex flex-col justify-center items-center text-xs md:text-sm 2xl:text-base font-medium focus:outline-none")} to="/menu">
          {({ isActive }) => isActive ? (
              <>
                <img className="h-5 2xl:h-6 w-auto mb-1 2xl:mb-1.5" alt="Menu Active" src={MenuActive} />
                Menu
              </>
            ) : (
              <>
                <img className="h-5 2xl:h-6 w-auto mb-1 2xl:mb-1.5" alt="Menu" src={Menu} />
                Menu
              </>
            )}
          </NavLink>
        </div>
      </footer>
    </>
  );
}