import React, { useState } from 'react';
import { PlusIcon, ClipboardIcon, EyeIcon, EyeOffIcon, TrashIcon, CheckIcon, AlertCircleIcon, InfoIcon } from 'lucide-react';
export const ApiKeysSettings = () => {
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyExpiration, setNewKeyExpiration] = useState('never');
  const [newKeyScopes, setNewKeyScopes] = useState(['read']);
  const [showNewKey, setShowNewKey] = useState(false);
  const [newKeyValue, setNewKeyValue] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  // Sample API keys data
  const [apiKeys, setApiKeys] = useState([{
    id: 'key_1',
    name: 'Production API Key',
    prefix: 'af_prod_',
    suffix: 'f8d92b',
    created: '2023-05-15T10:30:00Z',
    lastUsed: '2023-10-01T14:22:10Z',
    scopes: ['read', 'write'],
    expiresAt: null
  }, {
    id: 'key_2',
    name: 'Development API Key',
    prefix: 'af_dev_',
    suffix: 'a7c31e',
    created: '2023-08-22T09:15:30Z',
    lastUsed: '2023-09-30T11:45:22Z',
    scopes: ['read', 'write', 'delete'],
    expiresAt: '2024-08-22T09:15:30Z'
  }, {
    id: 'key_3',
    name: 'Testing API Key',
    prefix: 'af_test_',
    suffix: 'e5b19d',
    created: '2023-09-10T16:40:12Z',
    lastUsed: null,
    scopes: ['read'],
    expiresAt: null
  }]);
  const handleToggleScope = scope => {
    if (newKeyScopes.includes(scope)) {
      setNewKeyScopes(newKeyScopes.filter(s => s !== scope));
    } else {
      setNewKeyScopes([...newKeyScopes, scope]);
    }
  };
  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;
    // In a real app, this would call an API to create a new key
    const newKey = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      prefix: `af_${Math.random().toString(36).substring(2, 8)}_`,
      suffix: Math.random().toString(36).substring(2, 8),
      created: new Date().toISOString(),
      lastUsed: null,
      scopes: newKeyScopes,
      expiresAt: newKeyExpiration === 'never' ? null : new Date(Date.now() + parseInt(newKeyExpiration) * 24 * 60 * 60 * 1000).toISOString()
    };
    setApiKeys([newKey, ...apiKeys]);
    // Simulate receiving the full key from the server
    const fullKey = `${newKey.prefix}${Math.random().toString(36).substring(2, 30)}${newKey.suffix}`;
    setNewKeyValue(fullKey);
    setShowNewKey(true);
    setShowNewKeyForm(false);
    setNewKeyName('');
    setNewKeyExpiration('never');
    setNewKeyScopes(['read']);
  };
  const handleCopyKey = () => {
    navigator.clipboard.writeText(newKeyValue);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };
  const handleDeleteKey = keyId => {
    // In a real app, this would call an API to revoke the key
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
  };
  const formatDate = dateString => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  return <>
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium">API Keys</h3>
        <button onClick={() => setShowNewKeyForm(true)} className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-md flex items-center space-x-1 hover:bg-indigo-700">
          <PlusIcon size={16} />
          <span>Create New Key</span>
        </button>
      </div>
      <div className="p-6">
        {showNewKey && <div className="mb-6 p-4 border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20 rounded-md">
            <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">
              New API Key Created
            </h4>
            <p className="text-sm text-green-700 dark:text-green-400 mb-3">
              Make sure to copy your API key now. You won't be able to see it
              again!
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex-1 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded font-mono text-sm overflow-x-auto">
                {newKeyValue}
              </div>
              <button onClick={handleCopyKey} className="p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600" title="Copy to clipboard">
                {copiedKey ? <CheckIcon size={18} className="text-green-500" /> : <ClipboardIcon size={18} />}
              </button>
            </div>
            <button onClick={() => setShowNewKey(false)} className="text-sm text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
              I've copied my key
            </button>
          </div>}
        {showNewKeyForm && <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
            <h4 className="font-medium mb-4">Create New API Key</h4>
            <div className="space-y-4">
              <div>
                <label htmlFor="key-name" className="block text-sm font-medium mb-1">
                  Key Name <span className="text-red-500">*</span>
                </label>
                <input id="key-name" type="text" value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="e.g. Production API Key" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" required />
              </div>
              <div>
                <label htmlFor="key-expiration" className="block text-sm font-medium mb-1">
                  Expiration
                </label>
                <select id="key-expiration" value={newKeyExpiration} onChange={e => setNewKeyExpiration(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700">
                  <option value="never">Never expires</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>
              <div>
                <span className="block text-sm font-medium mb-2">
                  Permissions
                </span>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="scope-read" type="checkbox" checked={newKeyScopes.includes('read')} onChange={() => handleToggleScope('read')} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="scope-read" className="ml-2 block text-sm">
                      Read (View agents, workflows, and results)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="scope-write" type="checkbox" checked={newKeyScopes.includes('write')} onChange={() => handleToggleScope('write')} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="scope-write" className="ml-2 block text-sm">
                      Write (Create and modify agents and workflows)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="scope-execute" type="checkbox" checked={newKeyScopes.includes('execute')} onChange={() => handleToggleScope('execute')} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="scope-execute" className="ml-2 block text-sm">
                      Execute (Run agents and workflows)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="scope-delete" type="checkbox" checked={newKeyScopes.includes('delete')} onChange={() => handleToggleScope('delete')} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="scope-delete" className="ml-2 block text-sm">
                      Delete (Remove agents, workflows, and results)
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowNewKeyForm(false)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                  Cancel
                </button>
                <button type="button" onClick={handleCreateKey} disabled={!newKeyName.trim()} className={`px-3 py-2 rounded-md ${newKeyName.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}>
                  Create Key
                </button>
              </div>
            </div>
          </div>}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <InfoIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                API Key Security
              </h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                <p>
                  Your API keys carry many privileges. Keep them secure and
                  never share them in publicly accessible areas such as GitHub,
                  client-side code, or Slack.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 dark:ring-opacity-20 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Key
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Created
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Last Used
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Permissions
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {apiKeys.map(key => <tr key={key.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-200 sm:pl-6">
                    <div>{key.name}</div>
                    {key.expiresAt && <div className="text-xs text-gray-500 dark:text-gray-400">
                        Expires: {formatDate(key.expiresAt)}
                      </div>}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
                    {key.prefix}•••••••{key.suffix}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(key.created)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {key.lastUsed ? formatDate(key.lastUsed) : 'Never'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-wrap gap-1">
                      {key.scopes.map(scope => <span key={scope} className={`px-2 py-0.5 text-xs rounded-full ${scope === 'read' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : scope === 'write' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : scope === 'execute' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                          {scope}
                        </span>)}
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button onClick={() => handleDeleteKey(key.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      <TrashIcon size={18} />
                      <span className="sr-only">Delete {key.name}</span>
                    </button>
                  </td>
                </tr>)}
              {apiKeys.length === 0 && <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    No API keys found. Create one to get started.
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>;
};