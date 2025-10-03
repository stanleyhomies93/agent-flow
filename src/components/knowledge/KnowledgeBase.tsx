import React, { useState } from 'react';
import { PlusIcon, SearchIcon, FilterIcon, SlidersIcon, BookIcon, FileTextIcon, DatabaseIcon, UploadIcon, FolderIcon, MoreVerticalIcon, ClockIcon } from 'lucide-react';
import { CreateKnowledgeSourceModal } from './CreateKnowledgeSourceModal';
import { KnowledgeSourceDetailsModal } from './KnowledgeSourceDetailsModal';
export const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const knowledgeSources = [{
    id: 1,
    name: 'Product Documentation',
    description: 'Complete product documentation and user guides',
    type: 'Document Collection',
    sourceType: 'files',
    documentCount: 24,
    lastUpdated: '2023-10-15T14:22:10Z'
  }, {
    id: 2,
    name: 'Customer FAQs',
    description: 'Frequently asked questions from customers',
    type: 'Text Collection',
    sourceType: 'text',
    documentCount: 56,
    lastUpdated: '2023-10-10T09:15:30Z'
  }, {
    id: 3,
    name: 'Sales Database',
    description: 'Historical sales data and customer information',
    type: 'Database',
    sourceType: 'database',
    documentCount: 1,
    lastUpdated: '2023-10-05T11:45:22Z'
  }, {
    id: 4,
    name: 'Support Tickets',
    description: 'Archive of resolved support tickets',
    type: 'Document Collection',
    sourceType: 'files',
    documentCount: 342,
    lastUpdated: '2023-10-12T16:30:45Z'
  }, {
    id: 5,
    name: 'Company Wiki',
    description: 'Internal knowledge base for employees',
    type: 'Website',
    sourceType: 'website',
    documentCount: 128,
    lastUpdated: '2023-10-08T13:20:15Z'
  }, {
    id: 6,
    name: 'API Documentation',
    description: 'Technical documentation for developers',
    type: 'Document Collection',
    sourceType: 'files',
    documentCount: 18,
    lastUpdated: '2023-10-14T10:10:10Z'
  }];
  const getSourceTypeIcon = sourceType => {
    switch (sourceType) {
      case 'files':
        return <FileTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      case 'text':
        return <BookIcon className="h-6 w-6 text-green-600 dark:text-green-400" />;
      case 'database':
        return <DatabaseIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />;
      case 'website':
        return <FolderIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />;
      default:
        return <FileTextIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />;
    }
  };
  const filteredSources = filter === 'all' ? knowledgeSources : knowledgeSources.filter(source => source.sourceType === filter);
  const searchedSources = filteredSources.filter(source => source.name.toLowerCase().includes(searchQuery.toLowerCase()) || source.description.toLowerCase().includes(searchQuery.toLowerCase()));
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  const handleSourceClick = source => {
    setSelectedSource(source);
  };
  return <div className="h-full">
      {showCreateModal && <CreateKnowledgeSourceModal onClose={() => setShowCreateModal(false)} onCreateSource={sourceData => {
      // Handle creating new knowledge source
      setShowCreateModal(false);
    }} />}
      {selectedSource && <KnowledgeSourceDetailsModal source={selectedSource} onClose={() => setSelectedSource(null)} />}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Knowledge Base</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your organization's knowledge sources for AI agents
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 hover:bg-indigo-700" onClick={() => setShowCreateModal(true)}>
          <PlusIcon size={16} />
          <span>Add Source</span>
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input type="text" placeholder="Search knowledge sources..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
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
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex -mb-px">
          <button className={`mr-6 py-2 border-b-2 font-medium text-sm ${filter === 'all' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setFilter('all')}>
            All Sources
          </button>
          <button className={`mr-6 py-2 border-b-2 font-medium text-sm ${filter === 'files' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setFilter('files')}>
            Documents
          </button>
          <button className={`mr-6 py-2 border-b-2 font-medium text-sm ${filter === 'text' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setFilter('text')}>
            Text
          </button>
          <button className={`mr-6 py-2 border-b-2 font-medium text-sm ${filter === 'database' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setFilter('database')}>
            Databases
          </button>
          <button className={`mr-6 py-2 border-b-2 font-medium text-sm ${filter === 'website' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setFilter('website')}>
            Websites
          </button>
        </nav>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchedSources.map(source => <div key={source.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSourceClick(source)}>
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  {getSourceTypeIcon(source.sourceType)}
                </div>
                <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" onClick={e => {
              e.stopPropagation();
              // Add menu functionality here if needed
            }}>
                  <MoreVerticalIcon className="h-5 w-5" />
                </button>
              </div>
              <h3 className="mt-4 font-semibold text-lg">{source.name}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {source.description}
              </p>
              <div className="mt-4 flex items-center space-x-2">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  {source.type}
                </span>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  {source.documentCount}{' '}
                  {source.documentCount === 1 ? 'Document' : 'Documents'}
                </span>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-3 w-3" />
                <span>Updated {formatDate(source.lastUpdated)}</span>
              </div>
              <button className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm" onClick={e => {
            e.stopPropagation();
            // Add update functionality here
          }}>
                <UploadIcon className="h-4 w-4" />
                <span>Update</span>
              </button>
            </div>
          </div>)}
      </div>
    </div>;
};