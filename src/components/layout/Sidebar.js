import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  UserIcon, 
  RectangleStackIcon as CollectionIcon, 
  CodeBracketIcon as CodeIcon, 
  ClipboardDocumentCheckIcon as ClipboardCheckIcon, 
  CalendarIcon, 
  Cog6ToothIcon as CogIcon 
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Projects', href: '/projects', icon: CollectionIcon },
  { name: 'Code Repository', href: '/code', icon: CodeIcon },
  { name: 'Tasks', href: '/tasks', icon: ClipboardCheckIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 md:hidden bg-gray-600 bg-opacity-75 transition-opacity"
          onClick={() => setOpen(false)}
        ></div>
      )}
      
      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 flex flex-col z-50 w-72 bg-white dark:bg-gray-800 shadow-xl transform transition-transform md:hidden ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-16 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Portfolio
          </span>
          <button
            type="button"
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            onClick={() => setOpen(false)}
            >
            <span className="sr-only">Close sidebar</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
        
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => `
                group flex items-center px-2 py-3 rounded-md text-sm font-medium mb-1
                ${isActive
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }
              `}
              onClick={() => setOpen(false)}
            >
              <item.icon 
                className={({ isActive }) => `
                  mr-3 h-5 w-5 flex-shrink-0
                  ${isActive
                    ? 'text-primary-600 dark:text-primary-300'
                    : 'text-gray-500 dark:text-gray-400'
                  }
                `}
                aria-hidden="true" 
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="h-16 flex items-center border-b border-gray-200 dark:border-gray-700 px-4">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              Portfolio
            </span>
          </div>
          
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => `
                  group flex items-center px-2 py-3 rounded-md text-sm font-medium mb-1
                  ${isActive
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                `}
              >
                <item.icon 
                  className={({ isActive }) => `
                    mr-3 h-5 w-5 flex-shrink-0
                    ${isActive
                      ? 'text-primary-600 dark:text-primary-300'
                      : 'text-gray-500 dark:text-gray-400'
                    }
                  `}
                  aria-hidden="true" 
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;