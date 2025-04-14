import React, { useState, useContext } from "react";
import { BoxInfo } from "../App";
import logo from "../assets/logo.png";
import user from '../assets/user.png' // Adjust the path as necessary

export default function Nav(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };


  const { userName, userEmail,handleLogout } = useContext(BoxInfo) || {};

  return (
    <div>
      <nav className="bg-gray-100 border-gray-100 dark:bg-black">
        <div className="max-w-screen-xl relative flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center justify-between w-full md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a
              href="#"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo || "https://via.placeholder.com/150"} 
                className="h-8"
                alt="TaskMate Logo"
              />
              <span className="self-center text-2xl font-bold whitespace-nowrap text-teal-500">
                Flash<span className="">Cards</span>
              </span>
            </a>
            <div className="dark:text-white flex gap-2 text-lg font-semibold cursor-pointer">
              <div className="text-sm font-semibold flex items-center">
                {userName || "User"} 
              </div>
              <button
                type="button"
                className="flex text-sm rounded-full"
                onClick={toggleDropdown}
                aria-label="Open user menu"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={user} 
                  alt="User Profile"
                  referrerPolicy="no-referrer"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-10 right-2 bg-white divide-y rounded-lg shadow-lg dark:bg-gray-900">
                  <div className="px-4 py-3 text-sm text-gray-900 flex flex-col gap-4 dark:text-white">
                    <div className="font-bold">{userName || "User"}</div> 
                    <div className="font-light truncate">{userEmail || 'User@gmail.com'}</div>
                    <button
                      className="text-teal-500 hover:text-teal-600"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
