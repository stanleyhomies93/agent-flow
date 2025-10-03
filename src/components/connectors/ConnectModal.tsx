import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
export const ConnectModal = ({
  connector,
  onClose,
  onSubmit
}) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit(apiKey);
      setIsLoading(false);
    }, 1000);
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium">Connect to {connector.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              {connector.icon ? <img src={connector.icon} alt={`${connector.name} logo`} className="w-8 h-8 object-contain" /> : <div className="text-gray-400 text-xl font-bold">
                  {connector.name.charAt(0)}
                </div>}
            </div>
            <div>
              <h4 className="font-medium">{connector.name}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {connector.category}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              To connect with {connector.name}, you'll need to provide your API
              key. You can find this in your {connector.name} dashboard.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="api-key" className="block text-sm font-medium mb-1">
                {connector.name} API Key
              </label>
              <input id="api-key" type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="sk_..." />
            </div>
            <div className="flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button type="submit" disabled={!apiKey.trim() || isLoading} className={`px-3 py-2 rounded-md ${apiKey.trim() && !isLoading ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}>
                {isLoading ? 'Connecting...' : 'Connect'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};