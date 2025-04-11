import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MenuIcon, XIcon, SunIcon, MoonIcon, 
  BellIcon, UserCircleIcon, SearchIcon
} from '@heroicons/react/outline';

const Navbar = ({ toggleSidebar, toggleTheme, theme }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu button and logo */}
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            
            <Link to="/" className="flex-shrink-0 flex items-center ml-4">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                Portfolio
              </span>
            </Link>
          </div>
          
          {/* Center - Search bar */}
          <div className="hidden md:block flex-1 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-md text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Search..."
              />
            </div>
          </div>
          
          {/* Mobile - Search button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <span className="sr-only">Search</span>
              <SearchIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          {/* Right side - Theme toggle, notifications, profile */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              onClick={toggleTheme}
            >
              <span className="sr-only">Toggle theme</span>
              {theme === 'dark' ? (
                <SunIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MoonIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            
            <div className="relative">
              <button
                type="button"
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <span className="sr-only">Notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
                {/* Notification badge */}
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              {/* Notifications dropdown */}
              {notificationsOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium">Notifications</h3>
                    </div>
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      <p>No new notifications</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <span className="sr-only">User menu</span>
                <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
              </button>
              
              {/* Profile dropdown */}
              {profileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileOpen(false)}
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile search bar (shown when search button is clicked) */}
      {searchOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 md:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 rounded-md text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Search..."
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;