import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo1 from "../assets/mainLogo1.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest("#user-menu-button")
      ) {
        setIsDropdownOpen(false);
      }

      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.closest("#hamburger-btn")
      ) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen, isSidebarOpen]);

  const closeAllMenus = () => {
    setIsDropdownOpen(false);
    setIsSidebarOpen(false);
  };

  const handleSignOut = () => {
    localStorage.clear();
    toast.success("Logged Out");
    closeAllMenus();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={logo1}
            alt="ShortNScan logo"
            className="h-10 w-30 object-cover"
          />
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {token && (
            <>
              <button
                id="user-menu-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded={isDropdownOpen}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-14 right-4 z-50 w-44 text-base bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white capitalize">
                      {name}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {email}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        // to="/settings"
                        onClick={closeAllMenus}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}

          {!token && (
            <>
              <Link
                to="/login"
                className="hidden md:block py-2 px-3 rounded-sm text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="hidden md:block py-2 px-3 rounded-sm bg-cyan-600 text-white"
              >
                Sign Up for free
              </Link>
            </>
          )}

          <button
            id="hamburger-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-800 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isSidebarOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 17 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          ref={sidebarRef}
          id="navbar-user"
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:flex items-center w-full md:w-auto md:order-1`}
        >
          <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                onClick={closeAllMenus}
                className="block py-2 px-3 rounded-sm text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                onClick={closeAllMenus}
                className="block py-2 px-3 rounded-sm text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                // to="/contact"
                onClick={closeAllMenus}
                className="block py-2 px-3 rounded-sm text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Contact
              </Link>
            </li>

            {!token && (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={closeAllMenus}
                    className="mt-4 block py-2 px-3 mb-2 rounded-sm bg-cyan-600 text-white text-center md:hidden"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={closeAllMenus}
                    className="block py-2 px-3 rounded-sm bg-cyan-600 text-white text-center md:hidden"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
