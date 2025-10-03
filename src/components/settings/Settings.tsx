import React, { useState } from 'react';
import { SaveIcon, KeyIcon, UserIcon, BellIcon, GlobeIcon, ShieldIcon } from 'lucide-react';
import { AccountSettings } from './AccountSettings';
import { ApiKeysSettings } from './ApiKeysSettings';
import { IntegrationsSettings } from './IntegrationsSettings';
export const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />;
      case 'api-keys':
        return <ApiKeysSettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      default:
        return <div className="p-6">Content not available yet</div>;
    }
  };
  return <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Configure your AI orchestration platform
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-4">
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('account')} className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'account' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'}`}>
              <UserIcon className="mr-3 h-5 w-5" />
              <span>Account</span>
            </button>
            <button onClick={() => setActiveTab('api-keys')} className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'api-keys' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'}`}>
              <KeyIcon className="mr-3 h-5 w-5" />
              <span>API Keys</span>
            </button>
            <button onClick={() => setActiveTab('integrations')} className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'integrations' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'}`}>
              <GlobeIcon className="mr-3 h-5 w-5" />
              <span>Integrations</span>
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
              <BellIcon className="mr-3 h-5 w-5" />
              <span>Notifications</span>
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
              <ShieldIcon className="mr-3 h-5 w-5" />
              <span>Security</span>
            </button>
          </nav>
        </div>
        <div className="col-span-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          {renderTabContent()}
        </div>
      </div>
    </div>;
};