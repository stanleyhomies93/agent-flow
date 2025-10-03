import React from 'react';
import { SaveIcon } from 'lucide-react';
export const AccountSettings = () => {
  return <>
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium">Account Settings</h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" defaultValue="John Doe" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" defaultValue="john.doe@example.com" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company
            </label>
            <input type="text" id="company" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" defaultValue="Acme Inc." />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role
            </label>
            <select id="role" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" defaultValue="admin">
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="pt-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 hover:bg-indigo-700">
              <SaveIcon size={16} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </>;
};