import React, { useState } from 'react';
import { SearchIcon, InfoIcon, PlusIcon, CheckIcon, BookIcon, FileTextIcon, DatabaseIcon, FolderIcon } from 'lucide-react';
export const KnowledgeSourcesStep = ({
  data,
  updateData,
  onNext,
  onBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  // Mock knowledge sources data (in a real app, this would come from an API)
  const knowledgeSources = [{
    id: 1,
    name: 'Product Documentation',
    description: 'Complete product documentation and user guides',
    type: 'Document Collection',
    sourceType: 'files',
    documentCount: 24
  }, {
    id: 2,
    name: 'Customer FAQs',
    description: 'Frequently asked questions from customers',
    type: 'Text Collection',
    sourceType: 'text',
    documentCount: 56
  }, {
    id: 3,
    name: 'Sales Database',
    description: 'Historical sales data and customer information',
    type: 'Database',
    sourceType: 'database',
    documentCount: 1
  }, {
    id: 4,
    name: 'Support Tickets',
    description: 'Archive of resolved support tickets',
    type: 'Document Collection',
    sourceType: 'files',
    documentCount: 342
  }, {
    id: 5,
    name: 'Company Wiki',
    description: 'Internal knowledge base for employees',
    type: 'Website',
    sourceType: 'website',
    documentCount: 128
  }, {
    id: 6,
    name: 'API Documentation',
    description: 'Technical documentation for developers',
    type: 'Document Collection',
    sourceType: 'files',
    documentCount: 18
  }];
  const filteredSources = knowledgeSources.filter(source => source.name.toLowerCase().includes(searchQuery.toLowerCase()) || source.description.toLowerCase().includes(searchQuery.toLowerCase()));
  const selectedSources = data.knowledgeSources || [];
  const getSourceTypeIcon = sourceType => {
    switch (sourceType) {
      case 'files':
        return <FileTextIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'text':
        return <BookIcon className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'database':
        return <DatabaseIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case 'website':
        return <FolderIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <FileTextIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };
  const toggleSourceSelection = source => {
    const isSelected = selectedSources.some(s => s.id === source.id);
    if (isSelected) {
      updateData({
        knowledgeSources: selectedSources.filter(s => s.id !== source.id)
      });
    } else {
      updateData({
        knowledgeSources: [...selectedSources, source]
      });
    }
  };
  return <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Knowledge Sources</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select knowledge sources that this agent can access to enhance its
          capabilities.
        </p>
      </div>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input type="text" placeholder="Search knowledge sources..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InfoIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Why connect knowledge sources?
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
              <p>
                Knowledge sources provide your agent with information it can
                reference when responding to queries. This helps the agent
                provide more accurate and relevant answers based on your
                organization's data.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">
          Available Knowledge Sources
        </h4>
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {filteredSources.map(source => {
          const isSelected = selectedSources.some(s => s.id === source.id);
          return <div key={source.id} onClick={() => toggleSourceSelection(source)} className={`p-4 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'border-indigo-300 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-900/30' : 'border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700'}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    {getSourceTypeIcon(source.sourceType)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-medium">{source.name}</h5>
                      <div className={`flex items-center justify-center w-5 h-5 rounded-full ${isSelected ? 'bg-indigo-500 text-white' : 'border border-gray-300 dark:border-gray-600'}`}>
                        {isSelected && <CheckIcon className="h-3 w-3" />}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {source.description}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        {source.type}
                      </span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                        {source.documentCount}{' '}
                        {source.documentCount === 1 ? 'Document' : 'Documents'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>;
        })}
          {filteredSources.length === 0 && <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No knowledge sources found matching your search.</p>
            </div>}
        </div>
      </div>
      {selectedSources.length > 0 && <div>
          <h4 className="text-sm font-medium mb-3">
            Selected Sources ({selectedSources.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedSources.map(source => <div key={source.id} className="flex items-center px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 text-sm">
                {source.name}
                <button onClick={e => {
            e.stopPropagation();
            toggleSourceSelection(source);
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