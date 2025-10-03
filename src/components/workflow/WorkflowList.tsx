import React, { useState } from 'react';
import { PlusIcon, SearchIcon, ClockIcon, CalendarIcon, StarIcon, MoreHorizontalIcon, PlayIcon } from 'lucide-react';
import { CreateWorkflowModal } from './CreateWorkflowModal';
export const WorkflowList = ({
  workflows,
  onSelectWorkflow,
  onCreateWorkflow
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'name', 'status'
  const filteredWorkflows = workflows.filter(workflow => workflow.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const sortedWorkflows = [...filteredWorkflows].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.lastEdited) - new Date(a.lastEdited);
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'status') {
      return (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0);
    }
    return 0;
  });
  const handleCreateWorkflow = workflowData => {
    onCreateWorkflow(workflowData);
    setShowCreateModal(false);
  };
  return <div className="h-full">
      {showCreateModal && <CreateWorkflowModal onClose={() => setShowCreateModal(false)} onCreateWorkflow={handleCreateWorkflow} />}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Workflows</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Orchestrate AI agents to automate complex tasks
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 hover:bg-indigo-700" onClick={() => setShowCreateModal(true)}>
          <PlusIcon size={16} />
          <span>Create Workflow</span>
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input type="text" placeholder="Search workflows..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button onClick={() => setSortBy('recent')} className={`mr-6 py-2 border-b-2 font-medium text-sm ${sortBy === 'recent' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                Recent
              </button>
              <button onClick={() => setSortBy('name')} className={`mr-6 py-2 border-b-2 font-medium text-sm ${sortBy === 'name' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                Name
              </button>
              <button onClick={() => setSortBy('status')} className={`mr-6 py-2 border-b-2 font-medium text-sm ${sortBy === 'status' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`}>
                Status
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedWorkflows.map(workflow => <div key={workflow.id} onClick={() => onSelectWorkflow(workflow.id)} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${workflow.isActive ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
                  <PlayIcon className={`h-6 w-6 ${workflow.isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`} />
                </div>
                <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" onClick={e => {
              e.stopPropagation();
              // Handle more actions
            }}>
                  <MoreHorizontalIcon className="h-5 w-5" />
                </button>
              </div>
              <h3 className="mt-4 font-semibold text-lg">{workflow.name}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {workflow.description}
              </p>
              <div className="mt-4 flex items-center space-x-2">
                {workflow.isActive ? <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    Active
                  </span> : <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    Inactive
                  </span>}
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  {workflow.nodeCount} Nodes
                </span>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <ClockIcon className="h-3 w-3" />
                <span>Edited {formatTimeAgo(workflow.lastEdited)}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <CalendarIcon className="h-3 w-3" />
                <span>Created {formatDate(workflow.created)}</span>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};
// Helper function to format dates as "time ago"
function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
}
// Helper function to format dates as "MMM D, YYYY"
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}