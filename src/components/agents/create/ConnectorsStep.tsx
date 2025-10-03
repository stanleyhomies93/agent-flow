import React, { useState } from 'react';
import { SearchIcon, InfoIcon, CheckIcon, XIcon, GlobeIcon } from 'lucide-react';
export const ConnectorsStep = ({
  data,
  updateData,
  onNext,
  onBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  // Mock connectors data (in a real app, this would come from an API)
  const connectors = [{
    id: 'openai',
    name: 'OpenAI',
    description: 'Connect to OpenAI models including GPT-4 and DALL-E',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'AI Models',
    connected: true
  }, {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Access Claude and other Anthropic AI models',
    icon: 'https://avatars.githubusercontent.com/u/51382740',
    category: 'AI Models',
    connected: true
  }, {
    id: 'pinecone',
    name: 'Pinecone',
    description: 'Vector database for AI applications',
    icon: 'https://avatars.githubusercontent.com/u/70762926',
    category: 'Databases',
    connected: true
  }, {
    id: 'slack',
    name: 'Slack',
    description: 'Deploy AI agents directly to your Slack workspace',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
    category: 'Communication',
    connected: true
  }, {
    id: 'discord',
    name: 'Discord',
    description: 'Add AI capabilities to your Discord server',
    icon: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png',
    category: 'Communication',
    connected: false
  }, {
    id: 'gmail',
    name: 'Gmail',
    description: 'Process emails and automate responses',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
    category: 'Communication',
    connected: false
  }, {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Access marketing and sales data',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/82/HubSpot_Logo.svg',
    category: 'CRM',
    connected: true
  }, {
    id: 'stripe',
    name: 'Stripe',
    description: 'Process payments and access transaction data',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    category: 'Payment',
    connected: true
  }];
  const categories = ['all', ...new Set(connectors.map(connector => connector.category))];
  // Filter by category and search query
  const filteredConnectors = connectors.filter(connector => activeCategory === 'all' || connector.category === activeCategory).filter(connector => connector.name.toLowerCase().includes(searchQuery.toLowerCase()) || connector.description.toLowerCase().includes(searchQuery.toLowerCase())).filter(connector => connector.connected); // Only show connected connectors
  const selectedConnectors = data.connectors || [];
  const toggleConnectorSelection = connector => {
    const isSelected = selectedConnectors.some(c => c.id === connector.id);
    if (isSelected) {
      updateData({
        connectors: selectedConnectors.filter(c => c.id !== connector.id)
      });
    } else {
      updateData({
        connectors: [...selectedConnectors, connector]
      });
    }
  };
  return <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Connectors</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select connectors that this agent should have access to for external
          integrations.
        </p>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InfoIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Why connect external services?
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
              <p>
                Connectors allow your agent to interact with external services
                and data sources. This enables actions like sending messages,
                accessing data, or triggering workflows in other systems.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input type="text" placeholder="Search connectors..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${activeCategory === category ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}>
              {category === 'all' ? 'All Connectors' : category}
            </button>)}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Available Connectors</h4>
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {filteredConnectors.map(connector => {
          const isSelected = selectedConnectors.some(c => c.id === connector.id);
          return <div key={connector.id} onClick={() => toggleConnectorSelection(connector)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-indigo-300 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-900/30' : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700'}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {connector.icon ? <img src={connector.icon} alt={`${connector.name} logo`} className="w-8 h-8 object-contain" /> : <GlobeIcon className="w-6 h-6 text-gray-400" />}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-medium">{connector.name}</h5>
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full ${isSelected ? 'bg-indigo-500 text-white' : 'border border-gray-300 dark:border-gray-600'}`}>
                        {isSelected && <CheckIcon className="h-3 w-3" />}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {connector.description}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        {connector.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>;
        })}
          {filteredConnectors.length === 0 && <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No connected services found matching your search.</p>
              <p className="mt-2 text-sm">
                Go to the Connectors section to connect more services.
              </p>
            </div>}
        </div>
      </div>
      {selectedConnectors.length > 0 && <div>
          <h4 className="text-sm font-medium mb-3">
            Selected Connectors ({selectedConnectors.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedConnectors.map(connector => <div key={connector.id} className="flex items-center px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 text-sm">
                {connector.name}
                <button onClick={e => {
            e.stopPropagation();
            toggleConnectorSelection(connector);
          }} className="ml-2 text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-200">
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </div>)}
          </div>
        </div>}
      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
          Back
        </button>
        <button type="button" onClick={onNext} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Continue
        </button>
      </div>
    </div>;
};