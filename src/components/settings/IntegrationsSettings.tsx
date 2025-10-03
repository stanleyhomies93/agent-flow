import React, { useState } from 'react';
import { PlusIcon, CheckCircleIcon, XCircleIcon, ExternalLinkIcon, SettingsIcon, RefreshCwIcon } from 'lucide-react';
export const IntegrationsSettings = () => {
  // Sample integrations data
  const [integrations, setIntegrations] = useState([{
    id: 'openai',
    name: 'OpenAI',
    description: 'Connect to OpenAI models including GPT-4 and DALL-E',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'AI Models',
    connected: true,
    lastSynced: '2023-10-01T14:22:10Z',
    status: 'healthy'
  }, {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Access Claude and other Anthropic AI models',
    icon: 'https://avatars.githubusercontent.com/u/51382740',
    category: 'AI Models',
    connected: true,
    lastSynced: '2023-09-28T10:15:30Z',
    status: 'healthy'
  }, {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'Access thousands of open-source AI models',
    icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
    category: 'AI Models',
    connected: false,
    lastSynced: null,
    status: null
  }, {
    id: 'pinecone',
    name: 'Pinecone',
    description: 'Vector database for AI applications',
    icon: 'https://avatars.githubusercontent.com/u/70762926',
    category: 'Databases',
    connected: true,
    lastSynced: '2023-09-15T08:30:45Z',
    status: 'warning',
    statusMessage: 'API rate limit approaching'
  }, {
    id: 'mongodb',
    name: 'MongoDB',
    description: 'Document database for storing application data',
    icon: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg',
    category: 'Databases',
    connected: false,
    lastSynced: null,
    status: null
  }, {
    id: 'slack',
    name: 'Slack',
    description: 'Deploy AI agents directly to your Slack workspace',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
    category: 'Communication',
    connected: true,
    lastSynced: '2023-09-29T16:40:12Z',
    status: 'error',
    statusMessage: 'Authentication token expired'
  }, {
    id: 'discord',
    name: 'Discord',
    description: 'Add AI capabilities to your Discord server',
    icon: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png',
    category: 'Communication',
    connected: false,
    lastSynced: null,
    status: null
  }]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [configureModalOpen, setConfigureModalOpen] = useState(false);
  const [configureIntegration, setConfigureIntegration] = useState(null);
  const categories = ['all', ...new Set(integrations.map(integration => integration.category))];
  const filteredIntegrations = activeCategory === 'all' ? integrations : integrations.filter(integration => integration.category === activeCategory);
  const handleConnect = integration => {
    setSelectedIntegration(integration);
    setShowConnectModal(true);
  };
  const handleDisconnect = integrationId => {
    // In a real app, this would call an API to disconnect
    setIntegrations(integrations.map(integration => integration.id === integrationId ? {
      ...integration,
      connected: false,
      lastSynced: null,
      status: null
    } : integration));
  };
  const handleSubmitConnection = () => {
    // In a real app, this would validate and store the API key
    if (!apiKey.trim()) return;
    setIntegrations(integrations.map(integration => integration.id === selectedIntegration.id ? {
      ...integration,
      connected: true,
      lastSynced: new Date().toISOString(),
      status: 'healthy'
    } : integration));
    setShowConnectModal(false);
    setApiKey('');
    setSelectedIntegration(null);
  };
  const handleOpenConfigure = integration => {
    setConfigureIntegration(integration);
    setConfigureModalOpen(true);
  };
  const handleRefreshConnection = integrationId => {
    // In a real app, this would test the connection
    setIntegrations(integrations.map(integration => integration.id === integrationId ? {
      ...integration,
      lastSynced: new Date().toISOString(),
      status: Math.random() > 0.8 ? 'warning' : 'healthy',
      statusMessage: Math.random() > 0.8 ? 'API rate limit approaching' : null
    } : integration));
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
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium">Integrations</h3>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${activeCategory === category ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}>
                {category === 'all' ? 'All Integrations' : category}
              </button>)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIntegrations.map(integration => <div key={integration.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  {integration.icon ? <img src={integration.icon} alt={`${integration.name} logo`} className="w-10 h-10 object-contain" /> : <div className="text-gray-400 text-xl font-bold">
                      {integration.name.charAt(0)}
                    </div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{integration.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {integration.description}
                      </p>
                    </div>
                    {integration.connected ? <div className="flex items-center space-x-1">
                        {integration.status === 'healthy' && <span className="flex items-center text-green-600 dark:text-green-400 text-xs">
                            <CheckCircleIcon size={14} className="mr-1" />
                            Connected
                          </span>}
                        {integration.status === 'warning' && <span className="flex items-center text-yellow-600 dark:text-yellow-400 text-xs">
                            <CheckCircleIcon size={14} className="mr-1" />
                            Warning
                          </span>}
                        {integration.status === 'error' && <span className="flex items-center text-red-600 dark:text-red-400 text-xs">
                            <XCircleIcon size={14} className="mr-1" />
                            Error
                          </span>}
                      </div> : <span className="text-xs text-gray-500 dark:text-gray-400">
                        Not connected
                      </span>}
                  </div>
                  {integration.connected && <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Last synced: {formatDate(integration.lastSynced)}
                      {integration.statusMessage && <div className="mt-1 text-yellow-600 dark:text-yellow-400">
                          {integration.statusMessage}
                        </div>}
                    </div>}
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
                {integration.connected ? <div className="flex space-x-2">
                    <button onClick={() => handleOpenConfigure(integration)} className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
                      <SettingsIcon size={12} className="mr-1" />
                      Configure
                    </button>
                    <button onClick={() => handleRefreshConnection(integration.id)} className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
                      <RefreshCwIcon size={12} className="mr-1" />
                      Refresh
                    </button>
                  </div> : <div className="text-xs text-gray-500 dark:text-gray-400">
                    <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center" onClick={e => {
                e.preventDefault();
                window.open(`https://${integration.id}.com`, '_blank');
              }}>
                      Learn more <ExternalLinkIcon size={12} className="ml-1" />
                    </a>
                  </div>}
                {integration.connected ? <button onClick={() => handleDisconnect(integration.id)} className="px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                    Disconnect
                  </button> : <button onClick={() => handleConnect(integration)} className="px-2 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    Connect
                  </button>}
              </div>
            </div>)}
        </div>
        {/* Connect Modal */}
        {showConnectModal && selectedIntegration && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Connect to {selectedIntegration.name}
                </h3>
                <button onClick={() => {
              setShowConnectModal(false);
              setApiKey('');
              setSelectedIntegration(null);
            }} className="text-gray-400 hover:text-gray-500">
                  <XCircleIcon size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    To connect with {selectedIntegration.name}, you'll need to
                    provide your API key. You can find this in your{' '}
                    {selectedIntegration.name} dashboard.
                  </p>
                </div>
                <div className="mb-4">
                  <label htmlFor="api-key" className="block text-sm font-medium mb-1">
                    {selectedIntegration.name} API Key
                  </label>
                  <input id="api-key" type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="sk_..." />
                </div>
                <div className="flex justify-end space-x-3">
                  <button onClick={() => {
                setShowConnectModal(false);
                setApiKey('');
                setSelectedIntegration(null);
              }} className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                    Cancel
                  </button>
                  <button onClick={handleSubmitConnection} disabled={!apiKey.trim()} className={`px-3 py-2 rounded-md ${apiKey.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}>
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>}
        {/* Configure Modal */}
        {configureModalOpen && configureIntegration && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Configure {configureIntegration.name}
                </h3>
                <button onClick={() => {
              setConfigureModalOpen(false);
              setConfigureIntegration(null);
            }} className="text-gray-400 hover:text-gray-500">
                  <XCircleIcon size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="model-version" className="block text-sm font-medium mb-1">
                      Default Model Version
                    </label>
                    <select id="model-version" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" defaultValue="latest">
                      <option value="latest">Latest Available</option>
                      <option value="gpt-4">GPT-4 (if OpenAI)</option>
                      <option value="gpt-3.5-turbo">
                        GPT-3.5 Turbo (if OpenAI)
                      </option>
                      <option value="claude-2">Claude 2 (if Anthropic)</option>
                      <option value="stable">Stable Version</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="request-timeout" className="block text-sm font-medium mb-1">
                      Request Timeout (seconds)
                    </label>
                    <input id="request-timeout" type="number" min="1" max="300" defaultValue="60" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="max-tokens" className="block text-sm font-medium mb-1">
                        Maximum Tokens Per Request
                      </label>
                      <span className="text-xs text-gray-500">
                        Default: 1024
                      </span>
                    </div>
                    <input id="max-tokens" type="range" min="256" max="8192" step="256" defaultValue="1024" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>256</span>
                      <span>8192</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input id="cache-responses" type="checkbox" defaultChecked={true} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="cache-responses" className="ml-2 block text-sm">
                      Cache API responses (reduces costs for duplicate requests)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="fallback" type="checkbox" defaultChecked={true} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label htmlFor="fallback" className="ml-2 block text-sm">
                      Enable fallback to alternative models on failure
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button onClick={() => {
                setConfigureModalOpen(false);
                setConfigureIntegration(null);
              }} className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                    Cancel
                  </button>
                  <button onClick={() => {
                setConfigureModalOpen(false);
                setConfigureIntegration(null);
              }} className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Save Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </>;
};