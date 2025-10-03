import React, { useState } from 'react';
import { PlusIcon, SearchIcon, FilterIcon, SlidersIcon, GlobeIcon, CheckCircleIcon, XCircleIcon, ExternalLinkIcon, SettingsIcon, RefreshCwIcon } from 'lucide-react';
import { ConnectModal } from './ConnectModal';
export const Connectors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState(null);
  // Sample connectors data
  const [connectors, setConnectors] = useState([{
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
  }, {
    id: 'gmail',
    name: 'Gmail',
    description: 'Process emails and automate responses',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
    category: 'Communication',
    connected: false,
    lastSynced: null,
    status: null
  }, {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Connect to your CRM data',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
    category: 'CRM',
    connected: false,
    lastSynced: null,
    status: null
  }, {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Access marketing and sales data',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/82/HubSpot_Logo.svg',
    category: 'CRM',
    connected: true,
    lastSynced: '2023-09-20T09:15:30Z',
    status: 'healthy'
  }, {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Integrate with customer support tickets',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Zendesk_logo.svg',
    category: 'Support',
    connected: false,
    lastSynced: null,
    status: null
  }, {
    id: 'stripe',
    name: 'Stripe',
    description: 'Process payments and access transaction data',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    category: 'Payment',
    connected: true,
    lastSynced: '2023-09-25T14:30:10Z',
    status: 'healthy'
  }]);
  const categories = ['all', ...new Set(connectors.map(connector => connector.category))];
  const filteredConnectors = activeCategory === 'all' ? connectors : connectors.filter(connector => connector.category === activeCategory);
  const searchedConnectors = filteredConnectors.filter(connector => connector.name.toLowerCase().includes(searchQuery.toLowerCase()) || connector.description.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleConnect = connector => {
    setSelectedConnector(connector);
    setShowConnectModal(true);
  };
  const handleDisconnect = connectorId => {
    // In a real app, this would call an API to disconnect
    setConnectors(connectors.map(connector => connector.id === connectorId ? {
      ...connector,
      connected: false,
      lastSynced: null,
      status: null
    } : connector));
  };
  const handleSubmitConnection = apiKey => {
    // In a real app, this would validate and store the API key
    if (!apiKey.trim() || !selectedConnector) return;
    setConnectors(connectors.map(connector => connector.id === selectedConnector.id ? {
      ...connector,
      connected: true,
      lastSynced: new Date().toISOString(),
      status: 'healthy'
    } : connector));
    setShowConnectModal(false);
    setSelectedConnector(null);
  };
  const handleRefreshConnection = connectorId => {
    // In a real app, this would test the connection
    setConnectors(connectors.map(connector => connector.id === connectorId ? {
      ...connector,
      lastSynced: new Date().toISOString(),
      status: Math.random() > 0.8 ? 'warning' : 'healthy',
      statusMessage: Math.random() > 0.8 ? 'API rate limit approaching' : null
    } : connector));
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
  return <div className="h-full">
      {showConnectModal && selectedConnector && <ConnectModal connector={selectedConnector} onClose={() => {
      setShowConnectModal(false);
      setSelectedConnector(null);
    }} onSubmit={handleSubmitConnection} />}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Connectors</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Connect your AI workflows to external services and data sources
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 hover:bg-indigo-700" onClick={() => {
        // This would typically open a modal to browse the connector marketplace
        // For now, we'll just focus on connecting existing connectors
      }}>
          <PlusIcon size={16} />
          <span>Add Connector</span>
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input type="text" placeholder="Search connectors..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700">
            <FilterIcon size={16} />
            <span>Filter</span>
          </button>
          <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700">
            <SlidersIcon size={16} />
            <span>Sort</span>
          </button>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${activeCategory === category ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}>
              {category === 'all' ? 'All Connectors' : category}
            </button>)}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {searchedConnectors.map(connector => <div key={connector.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {connector.icon ? <img src={connector.icon} alt={`${connector.name} logo`} className="w-10 h-10 object-contain" /> : <GlobeIcon className="w-6 h-6 text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{connector.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {connector.description}
                    </p>
                  </div>
                  {connector.connected ? <div className="flex items-center space-x-1">
                      {connector.status === 'healthy' && <span className="flex items-center text-green-600 dark:text-green-400 text-xs">
                          <CheckCircleIcon size={14} className="mr-1" />
                          Connected
                        </span>}
                      {connector.status === 'warning' && <span className="flex items-center text-yellow-600 dark:text-yellow-400 text-xs">
                          <CheckCircleIcon size={14} className="mr-1" />
                          Warning
                        </span>}
                      {connector.status === 'error' && <span className="flex items-center text-red-600 dark:text-red-400 text-xs">
                          <XCircleIcon size={14} className="mr-1" />
                          Error
                        </span>}
                    </div> : <span className="text-xs text-gray-500 dark:text-gray-400">
                      Not connected
                    </span>}
                </div>
                {connector.connected && <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Last synced: {formatDate(connector.lastSynced)}
                    {connector.statusMessage && <div className="mt-1 text-yellow-600 dark:text-yellow-400">
                        {connector.statusMessage}
                      </div>}
                  </div>}
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
              {connector.connected ? <div className="flex space-x-2">
                  <button className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
                    <SettingsIcon size={12} className="mr-1" />
                    Configure
                  </button>
                  <button onClick={() => handleRefreshConnection(connector.id)} className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center">
                    <RefreshCwIcon size={12} className="mr-1" />
                    Refresh
                  </button>
                </div> : <div className="text-xs text-gray-500 dark:text-gray-400">
                  <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center" onClick={e => {
              e.preventDefault();
              window.open(`https://${connector.id}.com`, '_blank');
            }}>
                    Learn more <ExternalLinkIcon size={12} className="ml-1" />
                  </a>
                </div>}
              {connector.connected ? <button onClick={() => handleDisconnect(connector.id)} className="px-2 py-1 text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                  Disconnect
                </button> : <button onClick={() => handleConnect(connector)} className="px-2 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  Connect
                </button>}
            </div>
          </div>)}
      </div>
    </div>;
};