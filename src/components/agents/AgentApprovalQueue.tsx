import React, { useState } from 'react';
import { ClockIcon, CheckIcon, XIcon, SearchIcon, FilterIcon, SlidersIcon, BuildingIcon, AlertCircleIcon, CheckCircleIcon, ArrowLeftIcon, UserIcon, CalendarIcon } from 'lucide-react';
import { ApprovalQueueModal } from './ApprovalQueueModal';
// Mock data for pending agents
const pendingAgentsMock = [{
  id: 101,
  name: 'Customer Feedback Analyzer',
  description: 'Analyzes customer feedback and categorizes it by sentiment and topic',
  type: 'Analysis',
  category: 'Text',
  department: 'Customer Support',
  createdBy: 'Jane Smith',
  createdByEmail: 'jane.smith@company.com',
  requestedOn: '2023-10-25T14:30:00Z',
  systemPrompt: 'You are a customer feedback analysis assistant. Your task is to analyze customer feedback and categorize it by sentiment (positive, negative, neutral) and identify key topics mentioned. Provide a structured output with the sentiment classification, confidence score, and list of topics found.',
  capabilities: ['Sentiment analysis of customer feedback', 'Topic identification and categorization', 'Structured output with confidence scores', 'Handling of multiple languages'],
  baseModel: 'GPT-4',
  temperature: 0.3,
  maxTokens: 1024
}, {
  id: 102,
  name: 'Product Description Generator',
  description: 'Creates compelling product descriptions based on features and specifications',
  type: 'Generation',
  category: 'Text',
  department: 'Marketing',
  createdBy: 'Michael Johnson',
  createdByEmail: 'michael.johnson@company.com',
  requestedOn: '2023-10-26T09:15:00Z',
  systemPrompt: 'You are a product description writing assistant. Your task is to create compelling, accurate, and SEO-friendly product descriptions based on the provided features and specifications. Focus on benefits to the customer while maintaining a professional tone.',
  capabilities: ['Creating engaging product descriptions', 'Highlighting key product features and benefits', 'SEO-optimized content generation', 'Adapting tone for different product categories'],
  baseModel: 'GPT-4',
  temperature: 0.7,
  maxTokens: 2048
}, {
  id: 103,
  name: 'Legal Document Analyzer',
  description: 'Extracts key information and clauses from legal documents',
  type: 'Analysis',
  category: 'Text',
  department: 'Legal',
  createdBy: 'Sarah Williams',
  createdByEmail: 'sarah.williams@company.com',
  requestedOn: '2023-10-24T11:00:00Z',
  systemPrompt: 'You are a legal document analysis assistant. Your task is to analyze legal documents and extract key information such as parties involved, important clauses, obligations, deadlines, and potential risks. Provide a structured summary that highlights the most important aspects of the document.',
  capabilities: ['Extracting key clauses from legal documents', 'Identifying parties and their obligations', 'Highlighting important dates and deadlines', 'Flagging potential risks or unusual terms'],
  baseModel: 'GPT-4',
  temperature: 0.2,
  maxTokens: 4096
}, {
  id: 104,
  name: 'Sales Call Summarizer',
  description: 'Creates concise summaries of sales call transcripts with action items',
  type: 'Summarization',
  category: 'Text',
  department: 'Sales',
  createdBy: 'David Brown',
  createdByEmail: 'david.brown@company.com',
  requestedOn: '2023-10-27T15:45:00Z',
  systemPrompt: 'You are a sales call summary assistant. Your task is to analyze sales call transcripts and create concise summaries that include key discussion points, customer needs, objections raised, solutions proposed, and clearly defined action items with owners and deadlines when specified.',
  capabilities: ['Summarizing sales call transcripts', 'Extracting key customer needs and pain points', 'Identifying objections and proposed solutions', 'Creating clear action item lists with owners'],
  baseModel: 'GPT-4',
  temperature: 0.4,
  maxTokens: 2048
}, {
  id: 105,
  name: 'Financial Report Analyzer',
  description: 'Extracts and analyzes key metrics from financial reports',
  type: 'Analysis',
  category: 'Text',
  department: 'Finance',
  createdBy: 'Robert Chen',
  createdByEmail: 'robert.chen@company.com',
  requestedOn: '2023-10-23T10:30:00Z',
  systemPrompt: 'You are a financial report analysis assistant. Your task is to analyze financial reports and extract key metrics such as revenue, profit margins, growth rates, and other important financial indicators. Compare current figures with previous periods and highlight significant changes or trends.',
  capabilities: ['Extracting key financial metrics', 'Calculating growth rates and trends', 'Comparing performance across periods', 'Highlighting significant financial changes'],
  baseModel: 'GPT-4',
  temperature: 0.2,
  maxTokens: 3072
}];
export const AgentApprovalQueue = () => {
  const [pendingAgents, setPendingAgents] = useState(pendingAgentsMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  // Extract unique departments for filtering
  const departments = ['all', ...new Set(pendingAgents.map(agent => agent.department).filter(Boolean))];
  // Filter agents by search query, department, and date
  const filteredAgents = pendingAgents.filter(agent => {
    if (!searchQuery) return true;
    return agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || agent.description.toLowerCase().includes(searchQuery.toLowerCase()) || agent.type.toLowerCase().includes(searchQuery.toLowerCase()) || agent.department && agent.department.toLowerCase().includes(searchQuery.toLowerCase()) || agent.createdBy && agent.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
  }).filter(agent => {
    if (departmentFilter === 'all') return true;
    return agent.department === departmentFilter;
  }).filter(agent => {
    if (dateFilter === 'all') return true;
    const requestDate = new Date(agent.requestedOn);
    const now = new Date();
    if (dateFilter === 'today') {
      return requestDate.toDateString() === now.toDateString();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return requestDate >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(now.getMonth() - 1);
      return requestDate >= monthAgo;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' ? new Date(b.requestedOn).getTime() - new Date(a.requestedOn).getTime() : new Date(a.requestedOn).getTime() - new Date(b.requestedOn).getTime();
    } else if (sortBy === 'name') {
      return sortOrder === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
    } else if (sortBy === 'department') {
      return sortOrder === 'desc' ? b.department.localeCompare(a.department) : a.department.localeCompare(b.department);
    }
    return 0;
  });
  const handleApprove = agentId => {
    // In a real app, this would call an API to approve the agent
    setPendingAgents(pendingAgents.filter(agent => agent.id !== agentId));
    setShowApprovalModal(false);
  };
  const handleReject = (agentId, reason) => {
    // In a real app, this would call an API to reject the agent with the given reason
    setPendingAgents(pendingAgents.filter(agent => agent.id !== agentId));
    setShowApprovalModal(false);
  };
  const handleViewDetails = agent => {
    setSelectedAgent(agent);
    setShowApprovalModal(true);
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const formatTime = dateString => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <div className="h-full">
      {showApprovalModal && <ApprovalQueueModal onClose={() => setShowApprovalModal(false)} pendingAgents={[selectedAgent]} onApprove={handleApprove} onReject={handleReject} />}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Agent Approval Queue</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Review and approve agent creation requests
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredAgents.length} pending requests
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-4 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input type="text" placeholder="Search agents by name, description, or creator..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
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
            <label className="text-sm font-medium">Requested:</label>
            <select value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
            </select>
          </div>
          <div className="flex items-center space-x-2 ml-auto">
            <label className="text-sm font-medium">Sort by:</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-1.5 text-sm rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="date">Request Date</option>
              <option value="name">Agent Name</option>
              <option value="department">Department</option>
            </select>
            <button onClick={toggleSortOrder} className="p-1.5 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700" title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}>
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
      {filteredAgents.length === 0 ? <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <ClockIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">
            No pending approval requests
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            There are no agents waiting for your approval at this time. Check
            back later or adjust your filters.
          </p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" onClick={() => {
        setDepartmentFilter('all');
        setDateFilter('all');
        setSearchQuery('');
      }}>
            Clear Filters
          </button>
        </div> : <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAgents.map(agent => <tr key={agent.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => handleViewDetails(agent)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mr-3">
                        <ClockIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {agent.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BuildingIcon className="h-4 w-4 mr-1.5 text-gray-500 dark:text-gray-400" />
                      <span>{agent.department}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-1.5 text-gray-500 dark:text-gray-400" />
                      <span>{agent.createdBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1.5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div>{formatDate(agent.requestedOn)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(agent.requestedOn)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button onClick={e => {
                  e.stopPropagation();
                  handleReject(agent.id, 'Rejected by admin');
                }} className="p-1 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" title="Reject">
                        <XIcon className="h-5 w-5" />
                      </button>
                      <button onClick={e => {
                  e.stopPropagation();
                  handleApprove(agent.id);
                }} className="p-1 rounded-md text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20" title="Approve">
                        <CheckIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredAgents.length} of {pendingAgents.length} pending
          requests
        </div>
        {filteredAgents.length > 0 && <div className="flex space-x-2">
            <button onClick={() => {
          // In a real app, this would handle batch approvals
          const confirmed = window.confirm(`Approve all ${filteredAgents.length} displayed agents?`);
          if (confirmed) {
            const idsToApprove = filteredAgents.map(agent => agent.id);
            setPendingAgents(pendingAgents.filter(agent => !idsToApprove.includes(agent.id)));
          }
        }} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
              <CheckIcon className="h-4 w-4 mr-2" />
              <span>Approve All</span>
            </button>
          </div>}
      </div>
    </div>;
};