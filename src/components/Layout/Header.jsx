import React, { useState, useRef, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const cookies = new Cookies();
  const navigator = useNavigate();

  const token = cookies.get("token");
  const dropdownRef = useRef(null);

  const logoutHandler = () => {
    logout();
    navigator("/");
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white relative font-normal w-full h-fit px-[12%] border-b-2 border-gray-300 rounded-3xl">
      <div className="flex flex-wrap relative justify-between items-center h-full py-2">
        <Toaster />
        <div className="px-3 py-2.5 z-0  relative text-black text-xl  font-bold ">
          <NavLink
            to="/"
            className="block whitespace-nowrap md:p-0 hover:text-black hover:opacity-100"
          >
            VirugamaCoder APP
          </NavLink>
        </div>
        <button
          ref={dropdownRef}
          onClick={toggleMobileMenu}
          className="left-[50%] flex items-center w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-primaryl focus:outline-none focus:ring-2 focus:ring-gray-200 hover:text-white hover:font-semibold"
          aria-expanded={isMobileMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Toggle mobile menu</span>
          <svg
            className="w-5 h-5 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto absolute md:static top-[105%] z-10`}
        >
          <ul className="flex flex-col md:p-0 font-normal border-gray-100 rounded-lg bg-gray-200 md:flex-row md:mt-0 md:border-0 md:bg-white gap-6">
            {/* Login dropdown */}
            {token ? (
              <>
                <li
                  className="px-4 py-2.5 z-0 relative text-lg   md:rounded-3xl md:ring-2 ring-primaryl md:bg-primaryl hover:bg-primaryl md:hover:bg-white cursor-pointer md:text-white md:hover:text-primaryl font-semibold"
                  onClick={logoutHandler}
                >
                  Logout
                </li>
                <li className="px-4 py-2.5 z-0 relative text-lg   md:rounded-3xl md:ring-2 ring-primaryl md:bg-primaryl hover:bg-primaryl md:hover:bg-white cursor-pointer md:text-white md:hover:text-primaryl font-semibold">
                  <NavLink
                    to="/profile"
                    className="block whitespace-nowrap md:p-0  "
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="px-4 py-2.5 z-0 relative text-lg   md:rounded-3xl md:ring-2 ring-primaryl md:bg-primaryl hover:bg-primaryl md:hover:bg-white cursor-pointer md:text-white md:hover:text-primaryl font-semibold">
                  <NavLink
                    to="/signup"
                    className="block whitespace-nowrap md:p-0  "
                  >
                    Sign Up
                  </NavLink>
                </li>

                <li className="px-4 py-2.5 z-0 relative text-lg  md:rounded-3xl md:ring-2 ring-primaryl md:bg-primaryl hover:bg-primaryl md:hover:bg-white cursor-pointer md:text-white md:hover:text-primaryl font-semibold">
                  <NavLink
                    to="/login"
                    className="block whitespace-nowrap md:p-0  "
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
