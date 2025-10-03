import React, { useState } from 'react';
import { PlusIcon, SearchIcon, FilterIcon, SlidersIcon, ClockIcon } from 'lucide-react';
import { AgentCard } from './AgentCard';
import { CreateAgent } from './create/CreateAgent';
import { AddToWorkflowModal } from './AddToWorkflowModal';
import { ChatWithAgentModal } from './ChatWithAgentModal';
import { TestImageRecognizerModal } from './TestImageRecognizerModal';
import { AgentDetailsModal } from './AgentDetailsModal';
import { DocumentChatModal } from './DocumentChatModal';
import { ExcelComparisonModal } from './ExcelComparisonModal';
import { HowToUseModal } from './HowToUseModal';
// Export agents so they can be used in other components
export const systemAgents = [{
  id: 1,
  name: 'Text Classifier',
  description: 'Categorizes text into predefined classes',
  type: 'Classification',
  category: 'Text',
  isCustom: false,
  department: 'Customer Support',
  approvalStatus: 'approved',
  baseModel: 'GPT-4',
  temperature: 0.7,
  maxTokens: 1024,
  systemPrompt: `You are a text classification assistant that categorizes text into predefined classes. 
Your task is to analyze the input text and determine the most appropriate category.
Always provide your classification along with a confidence score and brief reasoning.
Output format:
{
  "category": "string",
  "confidence": float,
  "reasoning": "string"
}`
}, {
  id: 2,
  name: 'Sentiment Analyzer',
  description: 'Determines sentiment of text content',
  type: 'Analysis',
  category: 'Text',
  isCustom: false,
  department: 'Marketing',
  approvalStatus: 'approved'
}, {
  id: 3,
  name: 'Image Recognizer',
  description: 'Identifies objects in images',
  type: 'Recognition',
  category: 'Vision',
  isCustom: false,
  department: 'Product',
  approvalStatus: 'approved'
}, {
  id: 4,
  name: 'Email Responder',
  description: 'Generates contextual email responses',
  type: 'Generation',
  category: 'Text',
  isCustom: true,
  department: 'Sales',
  approvalStatus: 'pending'
}, {
  id: 5,
  name: 'Document Summarizer',
  description: 'Creates concise document summaries',
  type: 'Conversation',
  category: 'Chat',
  isCustom: false,
  department: 'Legal',
  approvalStatus: 'approved',
  documentAgent: true
}, {
  id: 6,
  name: 'Customer Support Bot',
  description: 'Handles common support requests',
  type: 'Conversation',
  category: 'Chat',
  isCustom: true,
  department: 'Customer Support',
  approvalStatus: 'approved'
}, {
  id: 7,
  name: 'PDF Summarizer',
  description: 'Extracts and summarizes key information from PDF documents',
  type: 'Conversation',
  category: 'Chat',
  isCustom: false,
  department: 'Research',
  approvalStatus: 'approved',
  documentAgent: true
}, {
  id: 8,
  name: 'Annual Report Summarizer',
  description: 'Analyzes and summarizes financial annual reports',
  type: 'Conversation',
  category: 'Chat',
  isCustom: false,
  department: 'Finance',
  approvalStatus: 'rejected',
  documentAgent: true,
  knowledgeSources: [{
    id: 1,
    name: 'Financial Terms Database'
  }]
}, {
  id: 9,
  name: 'Contract Writer',
  description: 'Generates legal contracts based on specified terms',
  type: 'Generation',
  category: 'Text',
  isCustom: false,
  department: 'Legal',
  approvalStatus: 'approved',
  knowledgeSources: [{
    id: 2,
    name: 'Legal Templates'
  }]
}, {
  id: 10,
  name: 'Financial Market Analyzer',
  description: 'Analyzes market trends and provides investment insights',
  type: 'Analysis',
  category: 'Text',
  isCustom: false,
  department: 'Finance',
  approvalStatus: 'approved',
  connectors: [{
    id: 'market-data',
    name: 'Market Data API'
  }]
}, {
  id: 11,
  name: 'Excel Comparison Analyst',
  description: 'Compares Excel sheets to identify and analyze data discrepancies',
  type: 'Analysis',
  category: 'Data',
  isCustom: false,
  department: 'Finance',
  approvalStatus: 'approved',
  documentAgent: true,
  capabilities: ['Compare multiple Excel sheets to identify discrepancies', 'Analyze why data is not tallying across sheets', 'Identify patterns in mismatched data', 'Suggest potential fixes for reconciliation', 'Generate detailed comparison reports'],
  systemPrompt: `You are an Excel comparison specialist that helps users identify and understand discrepancies between Excel sheets.
Your task is to analyze the uploaded Excel files, identify mismatches, and provide insights on why data might not be tallying.
Always provide detailed analysis along with potential causes and suggested fixes.
Focus on common issues like formula errors, data format inconsistencies, missing entries, and calculation discrepancies.`
}];
interface AgentLibraryProps {
  onNavigateToWorkflow: () => void;
  onAddAgentToWorkflow: (agent: any, isNewWorkflow: boolean) => void;
  setActiveView: (view: string) => void;
}
export const AgentLibrary = ({
  onNavigateToWorkflow,
  onAddAgentToWorkflow,
  setActiveView
}: AgentLibraryProps) => {
  const [filter, setFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [approvalFilter, setApprovalFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateAgent, setShowCreateAgent] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAddToWorkflowModal, setShowAddToWorkflowModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatAgent, setChatAgent] = useState(null);
  const [showVisionModal, setShowVisionModal] = useState(false);
  const [visionAgent, setVisionAgent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsAgent, setDetailsAgent] = useState(null);
  const [showDocumentChatModal, setShowDocumentChatModal] = useState(false);
  const [documentChatAgent, setDocumentChatAgent] = useState(null);
  const [showExcelComparisonModal, setShowExcelComparisonModal] = useState(false);
  const [excelComparisonAgent, setExcelComparisonAgent] = useState(null);
  const [showHowToUseModal, setShowHowToUseModal] = useState(false);
  const [howToUseAgent, setHowToUseAgent] = useState(null);
  const agents = systemAgents;
  // Extract unique departments for filtering
  const departments = ['all', ...new Set(agents.map(agent => agent.department).filter(Boolean))];
  // Filter agents by type, department, approval status, and search query
  const filteredAgents = agents.filter(agent => {
    if (filter === 'all') return true;
    if (filter === 'custom') return agent.isCustom;
    return !agent.isCustom;
  }).filter(agent => {
    if (departmentFilter === 'all') return true;
    return agent.department === departmentFilter;
  }).filter(agent => {
    if (approvalFilter === 'all') return true;
    return agent.approvalStatus === approvalFilter;
  }).filter(agent => {
    if (!searchQuery) return true;
    return agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || agent.description.toLowerCase().includes(searchQuery.toLowerCase()) || agent.type.toLowerCase().includes(searchQuery.toLowerCase()) || agent.department && agent.department.toLowerCase().includes(searchQuery.toLowerCase());
  });
  // In a real app, this would be determined by the user's role
  const isAdmin = true;
  const handleAddToWorkflow = agent => {
    setSelectedAgent(agent);
    setShowAddToWorkflowModal(true);
  };
  const handleConfirmAddToWorkflow = workflowAction => {
    if (workflowAction === 'new') {
      // Create a new workflow with this agent
      const agentNode = createAgentNodeFromAgent(selectedAgent);
      onAddAgentToWorkflow(agentNode, true); // true indicates to create a new workflow
      onNavigateToWorkflow();
    } else {
      // Add to existing workflow
      const agentNode = createAgentNodeFromAgent(selectedAgent);
      onAddAgentToWorkflow(agentNode, false); // false indicates to add to current workflow
      onNavigateToWorkflow();
    }
    setShowAddToWorkflowModal(false);
  };
  const handleStartChat = agent => {
    if (agent.id === 11) {
      // Excel Comparison Analyst
      setExcelComparisonAgent(agent);
      setShowExcelComparisonModal(true);
    } else if (agent.documentAgent) {
      setDocumentChatAgent(agent);
      setShowDocumentChatModal(true);
    } else {
      setChatAgent(agent);
      setShowChatModal(true);
    }
  };
  const handleTestVisionAgent = agent => {
    setVisionAgent(agent);
    setShowVisionModal(true);
  };
  const handleViewDetails = agent => {
    setDetailsAgent(agent);
    setShowDetailsModal(true);
  };
  const handleShowHowToUse = agent => {
    setHowToUseAgent(agent);
    setShowHowToUseModal(true);
  };
  // Helper function to convert an agent to a workflow node
  const createAgentNodeFromAgent = agent => {
    return {
      id: `node_agent_${agent.id}_${Date.now()}`,
      type: 'agent',
      position: {
        x: 250,
        y: 250
      },
      data: {
        label: agent.name,
        description: agent.description,
        agentType: agent.type,
        agentId: agent.id
      }
    };
  };
  return <div className="h-full">
      {showCreateAgent && <CreateAgent onClose={() => setShowCreateAgent(false)} />}
      {showAddToWorkflowModal && selectedAgent && <AddToWorkflowModal agent={selectedAgent} onClose={() => setShowAddToWorkflowModal(false)} onConfirm={handleConfirmAddToWorkflow} />}
      {showChatModal && chatAgent && <ChatWithAgentModal agent={chatAgent} onClose={() => {
      setShowChatModal(false);
      setChatAgent(null);
    }} />}
      {showVisionModal && visionAgent && <TestImageRecognizerModal agent={visionAgent} onClose={() => {
      setShowVisionModal(false);
      setVisionAgent(null);
    }} />}
      {showDetailsModal && detailsAgent && <AgentDetailsModal agent={detailsAgent} onClose={() => {
      setShowDetailsModal(false);
      setDetailsAgent(null);
    }} onAddToWorkflow={handleAddToWorkflow} onStartChat={handleStartChat} onTestVisionAgent={handleTestVisionAgent} />}
      {showDocumentChatModal && documentChatAgent && <DocumentChatModal agent={documentChatAgent} onClose={() => {
      setShowDocumentChatModal(false);
      setDocumentChatAgent(null);
    }} />}
      {showExcelComparisonModal && excelComparisonAgent && <ExcelComparisonModal agent={excelComparisonAgent} onClose={() => {
      setShowExcelComparisonModal(false);
      setExcelComparisonAgent(null);
    }} />}
      {showHowToUseModal && howToUseAgent && <HowToUseModal agent={howToUseAgent} onClose={() => {
      setShowHowToUseModal(false);
      setHowToUseAgent(null);
    }} />}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Agent Library</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Browse, create, and manage AI agents
          </p>
        </div>
        <div className="flex space-x-3">
          {isAdmin && <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => setActiveView('agent-approvals')}>
              <ClockIcon size={16} />
              <span>Approval Queue</span>
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                5
              </span>
            </button>}
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 hover:bg-indigo-700" onClick={() => setShowCreateAgent(true)}>
            <PlusIcon size={16} />
            <span>Create Agent</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input type="text" placeholder="Search agents..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Department:</label>
            <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">All Departments</option>
              {departments.filter(d => d !== 'all').map(dept => <option key={dept} value={dept}>
                    {dept}
                  </option>)}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Status:</label>
            <select value={approvalFilter} onChange={e => setApprovalFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Approval</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700">
              <FilterIcon size={16} />
              <span>More Filters</span>
            </button>
            <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700">
              <SlidersIcon size={16} />
              <span>Sort</span>
            </button>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex -mb-px">
          <button className={`mr-6 py-2 border-b-2 font-medium text-sm ${filter === 'all' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setFilter('all')}>
            All Agents
          </button>
          <button className={`mr-6 py-2 border-b-2 font-medium text-sm ${filter === 'prebuilt' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setFilter('prebuilt')}>
            Pre-built
          </button>
          <button className={`mr-6 py-2 border-b-2 font-medium text-sm ${filter === 'custom' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setFilter('custom')}>
            Custom
          </button>
        </nav>
      </div>
      {filteredAgents.length === 0 ? <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">
            No agents found matching your filters
          </p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" onClick={() => {
        setFilter('all');
        setDepartmentFilter('all');
        setApprovalFilter('all');
        setSearchQuery('');
      }}>
            Clear Filters
          </button>
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map(agent => <AgentCard key={agent.id} agent={agent} onAddToWorkflow={handleAddToWorkflow} onStartChat={handleStartChat} onTestVisionAgent={handleTestVisionAgent} onViewDetails={handleViewDetails} onShowHowToUse={agent.id === 11 ? handleShowHowToUse : null} />)}
        </div>}
    </div>;
};