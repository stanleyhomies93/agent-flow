import React from 'react';
import { BrainCircuitIcon, MoreVerticalIcon, PlusIcon, BookIcon, LinkIcon, MessageCircleIcon, ImageIcon, ClockIcon, CheckCircleIcon, AlertCircleIcon, BuildingIcon, UploadIcon, FileTextIcon, HelpCircleIcon, DatabaseIcon } from 'lucide-react';
export const AgentCard = ({
  agent,
  onAddToWorkflow,
  onStartChat,
  onTestVisionAgent,
  onViewDetails,
  onShowHowToUse
}) => {
  const getCategoryColor = category => {
    switch (category) {
      case 'Text':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Vision':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Chat':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'Data':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };
  const getApprovalStatusBadge = () => {
    const status = agent.approvalStatus || 'approved';
    switch (status) {
      case 'pending':
        return <div className="flex items-center space-x-1 text-xs text-amber-600 dark:text-amber-400">
            <ClockIcon className="h-3 w-3" />
            <span>Pending Approval</span>
          </div>;
      case 'rejected':
        return <div className="flex items-center space-x-1 text-xs text-red-600 dark:text-red-400">
            <AlertCircleIcon className="h-3 w-3" />
            <span>Rejected</span>
          </div>;
      default:
        return null;
    }
  };
  const handleAddToWorkflow = e => {
    e.stopPropagation();
    if (onAddToWorkflow) {
      onAddToWorkflow(agent);
    }
  };
  const handleStartChat = e => {
    e.stopPropagation();
    if (onStartChat) {
      onStartChat(agent);
    }
  };
  const handleTestVisionAgent = e => {
    e.stopPropagation();
    if (onTestVisionAgent) {
      onTestVisionAgent(agent);
    }
  };
  const handleShowHowToUse = e => {
    e.stopPropagation();
    if (onShowHowToUse) {
      onShowHowToUse(agent);
    }
  };
  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(agent);
    }
  };
  // Mock data for knowledge sources and connectors
  const knowledgeSources = agent.knowledgeSources || [];
  const connectors = agent.connectors || [];
  // Check if this is a conversational agent
  const isConversational = agent.category === 'Chat' || agent.type === 'Conversation';
  // Check if this is a document agent (document summarizer, pdf summarizer, etc.)
  const isDocumentAgent = agent.documentAgent === true;
  // Check if this is a vision agent
  const isVisionAgent = agent.category === 'Vision' || agent.type === 'Recognition';
  // Check if this is the Excel Comparison agent
  const isExcelComparisonAgent = agent.id === 11;
  // Get the appropriate icon for the agent
  const getAgentIcon = () => {
    if (agent.category === 'Data') {
      return <DatabaseIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />;
    }
    return <BrainCircuitIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />;
  };
  return <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={handleCardClick}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className={`p-2 ${agent.category === 'Data' ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-indigo-50 dark:bg-indigo-900/20'} rounded-lg`}>
            {getAgentIcon()}
          </div>
          <div className="flex space-x-1">
            <button onClick={handleAddToWorkflow} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title="Add to Workflow">
              <PlusIcon className="h-5 w-5" />
            </button>
            {onShowHowToUse && <button onClick={handleShowHowToUse} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="How to Use">
                <HelpCircleIcon className="h-5 w-5" />
              </button>}
            <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <MoreVerticalIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <h3 className="mt-4 font-semibold text-lg">{agent.name}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {agent.description}
        </p>
        <div className="mt-4 flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(agent.category)}`}>
            {agent.category}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
            {agent.type}
          </span>
          {agent.isCustom && <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              Custom
            </span>}
        </div>
        {/* Department */}
        {agent.department && <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
            <BuildingIcon className="h-3.5 w-3.5 mr-1" />
            <span>{agent.department}</span>
          </div>}
        {/* Approval Status */}
        {agent.approvalStatus && agent.approvalStatus !== 'approved' && <div className="mt-2">{getApprovalStatusBadge()}</div>}
        {/* Show knowledge sources and connectors if available */}
        {(knowledgeSources.length > 0 || connectors.length > 0) && <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            {knowledgeSources.length > 0 && <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                <BookIcon className="h-3.5 w-3.5 mr-1" />
                <span>
                  {knowledgeSources.length} Knowledge Source
                  {knowledgeSources.length !== 1 ? 's' : ''}
                </span>
              </div>}
            {connectors.length > 0 && <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <LinkIcon className="h-3.5 w-3.5 mr-1" />
                <span>
                  {connectors.length} Connector
                  {connectors.length !== 1 ? 's' : ''}
                </span>
              </div>}
          </div>}
      </div>
      <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {agent.isCustom ? 'Created 2 days ago' : 'Updated 1 week ago'}
        </span>
        <div className="flex space-x-3">
          {isConversational && !isDocumentAgent && !isExcelComparisonAgent && <button className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm" onClick={handleStartChat}>
              <MessageCircleIcon className="h-4 w-4" />
              <span>Chat</span>
            </button>}
          {isDocumentAgent && !isExcelComparisonAgent && <button className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm" onClick={handleStartChat}>
              <UploadIcon className="h-4 w-4" />
              <span>Upload</span>
            </button>}
          {isExcelComparisonAgent && <button className="flex items-center space-x-1 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm" onClick={handleStartChat}>
              <UploadIcon className="h-4 w-4" />
              <span>Compare</span>
            </button>}
          {isVisionAgent && <button className="flex items-center space-x-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm" onClick={handleTestVisionAgent}>
              <ImageIcon className="h-4 w-4" />
              <span>Try it</span>
            </button>}
        </div>
      </div>
    </div>;
};