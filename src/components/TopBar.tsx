import React from 'react';
import { BellIcon, SearchIcon, HelpCircleIcon, MoonIcon } from 'lucide-react';
export const TopBar = () => {
  return <header className="h-16 px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between">
      <div className="flex items-center w-96">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <HelpCircleIcon className="h-5 w-5 text-gray-500" />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 relative">
          <BellIcon className="h-5 w-5 text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          <MoonIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </header>;
};