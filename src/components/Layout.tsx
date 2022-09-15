import { ReactElement } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/Context";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Logo from "../assets/logo.png";
import Home from "../assets/home.png";
import HomeActive from "../assets/home-active.png";
import Menu from "../assets/menu.png";
import MenuActive from "../assets/menu-active.png";

export default function Layout({ header }: { header?: ReactElement }) {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {header ?? (
        <header className="sticky top-0 z-20 border-b bg-white">
          <div className="flex min-h-[3.5rem] items-center justify-between space-x-3.5 px-3.5 2xl:min-h-[4rem] 2xl:space-x-4 2xl:px-4">
            <img
              className="h-12 w-auto 2xl:h-14"
              alt="Logo Technopartner"
              src={Logo}
            />
            <button
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-red-500 transition duration-300 hover:bg-red-500/5 focus:outline-none 2xl:p-3"
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
          </div>
        </header>
      )}
      <main className="grow pb-8 md:pb-10 2xl:pb-12">
        <Outlet />
      </main>
      <footer className="sticky bottom-0 z-20 overflow-hidden border-t bg-white shadow-xl">
        <div className="grid min-h-[4rem] auto-cols-fr grid-flow-col place-content-stretch md:min-h-[4.5rem] 2xl:min-h-[5rem]">
          <NavLink
            className={({ isActive }) =>
              clsx(
                isActive
                  ? "text-gray-600"
                  : "text-gray-400 hover:bg-gray-500/5",
                "flex flex-col items-center justify-center text-xs font-medium focus:outline-none md:text-sm 2xl:text-base"
              )
            }
            to="/"
            end
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <img
                    className="mb-1 h-5 w-auto 2xl:mb-1.5 2xl:h-6"
                    alt="Home Active"
                    src={HomeActive}
                  />
                  Home
                </>
              ) : (
                <>
                  <img
                    className="mb-1 h-5 w-auto 2xl:mb-1.5 2xl:h-6"
                    alt="Home"
                    src={Home}
                  />
                  Home
                </>
              )
            }
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              clsx(
                isActive
                  ? "text-gray-600"
                  : "text-gray-400 hover:bg-gray-500/5",
                "flex flex-col items-center justify-center text-xs font-medium focus:outline-none md:text-sm 2xl:text-base"
              )
            }
            to="/menu"
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <img
                    className="mb-1 h-5 w-auto 2xl:mb-1.5 2xl:h-6"
                    alt="Menu Active"
                    src={MenuActive}
                  />
                  Menu
                </>
              ) : (
                <>
                  <img
                    className="mb-1 h-5 w-auto 2xl:mb-1.5 2xl:h-6"
                    alt="Menu"
                    src={Menu}
                  />
                  Menu
                </>
              )
            }
          </NavLink>
        </div>
      </footer>
    </>
  );
}
