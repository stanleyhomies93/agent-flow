import React, { useState } from 'react';
import { XIcon, CheckIcon, XCircleIcon, AlertCircleIcon, ClockIcon, SearchIcon, FilterIcon, BuildingIcon } from 'lucide-react';
interface ApprovalQueueModalProps {
  onClose: () => void;
  pendingAgents: any[];
  onApprove: (agentId: number) => void;
  onReject: (agentId: number, reason: string) => void;
}
export const ApprovalQueueModal = ({
  onClose,
  pendingAgents,
  onApprove,
  onReject
}: ApprovalQueueModalProps) => {
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  // Extract unique departments for filtering
  const departments = ['all', ...new Set(pendingAgents.map(agent => agent.department).filter(Boolean))];
  // Filter agents by search query and department
  const filteredAgents = pendingAgents.filter(agent => {
    if (!searchQuery) return true;
    return agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || agent.description.toLowerCase().includes(searchQuery.toLowerCase()) || agent.department && agent.department.toLowerCase().includes(searchQuery.toLowerCase()) || agent.createdBy && agent.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
  }).filter(agent => {
    if (departmentFilter === 'all') return true;
    return agent.department === departmentFilter;
  });
  const selectedAgent = pendingAgents.find(agent => agent.id === selectedAgentId);
  const handleApprove = () => {
    if (selectedAgentId) {
      onApprove(selectedAgentId);
      setSelectedAgentId(null);
    }
  };
  const handleReject = () => {
    if (selectedAgentId && rejectionReason.trim()) {
      onReject(selectedAgentId, rejectionReason);
      setSelectedAgentId(null);
      setRejectionReason('');
      setShowRejectionForm(false);
    }
  };
  const handleStartRejection = () => {
    setShowRejectionForm(true);
  };
  const handleCancelRejection = () => {
    setShowRejectionForm(false);
    setRejectionReason('');
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Agent Approval Queue</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          {/* Left panel - list of agents */}
          <div className="w-2/5 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative mb-3">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search agents..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Department:</label>
                <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="all">All Departments</option>
                  {departments.filter(d => d !== 'all').map(dept => <option key={dept} value={dept}>
                        {dept}
                      </option>)}
                </select>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredAgents.length === 0 ? <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No pending agents found</p>
                </div> : <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAgents.map(agent => <li key={agent.id} className={`cursor-pointer ${selectedAgentId === agent.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`} onClick={() => setSelectedAgentId(agent.id)}>
                      <div className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium truncate">
                              {agent.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                              {agent.description}
                            </p>
                          </div>
                          <div className="flex items-center ml-2">
                            <ClockIcon className="h-4 w-4 text-amber-500" />
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-xs">
                          <BuildingIcon className="h-3.5 w-3.5 text-gray-400 mr-1" />
                          <span className="text-gray-500 dark:text-gray-400">
                            {agent.department}
                          </span>
                          <span className="mx-2 text-gray-300 dark:text-gray-600">
                            •
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            Requested {agent.requestedOn || '2 days ago'}
                          </span>
                        </div>
                      </div>
                    </li>)}
                </ul>}
            </div>
          </div>
          {/* Right panel - agent details and approval actions */}
          <div className="w-3/5 flex flex-col">
            {selectedAgent ? <>
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-medium">
                      {selectedAgent.name}
                    </h3>
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      Pending Approval
                    </span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 block">
                          Department
                        </span>
                        <div className="font-medium flex items-center">
                          <BuildingIcon className="h-4 w-4 mr-1 text-gray-500" />
                          {selectedAgent.department}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 block">
                          Requested By
                        </span>
                        <div className="font-medium">
                          {selectedAgent.createdBy || 'John Doe'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 block">
                          Type
                        </span>
                        <div className="font-medium">
                          {selectedAgent.type} ({selectedAgent.category})
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400 block">
                          Requested On
                        </span>
                        <div className="font-medium">
                          {selectedAgent.requestedOn || '2 days ago'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Description</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedAgent.description}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">System Prompt</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                      <pre className="text-sm whitespace-pre-wrap">
                        {selectedAgent.systemPrompt || 'No system prompt provided'}
                      </pre>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Capabilities</h4>
                    {selectedAgent.capabilities && selectedAgent.capabilities.length > 0 ? <ul className="list-disc pl-5 space-y-1 text-sm">
                        {selectedAgent.capabilities.map((capability, index) => <li key={index}>{capability}</li>)}
                      </ul> : <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        No capabilities specified
                      </p>}
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircleIcon className="h-5 w-5 text-amber-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                          Approval Considerations
                        </h3>
                        <div className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              Verify that the agent complies with company
                              policies
                            </li>
                            <li>
                              Check that the prompt doesn't contain harmful
                              instructions
                            </li>
                            <li>
                              Ensure the agent is appropriate for the specified
                              department
                            </li>
                            <li>
                              Confirm the agent doesn't duplicate existing
                              functionality
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {showRejectionForm ? <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <h4 className="text-sm font-medium mb-2">
                      Rejection Reason
                    </h4>
                    <textarea value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 mb-4" placeholder="Please provide a reason for rejecting this agent..." />
                    <div className="flex justify-end space-x-3">
                      <button onClick={handleCancelRejection} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600">
                        Cancel
                      </button>
                      <button onClick={handleReject} disabled={!rejectionReason.trim()} className={`px-4 py-2 rounded-md flex items-center ${!rejectionReason.trim() ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                        <XCircleIcon className="h-4 w-4 mr-2" />
                        Reject Agent
                      </button>
                    </div>
                  </div> : <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <div className="flex justify-end space-x-3">
                      <button onClick={handleStartRejection} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center">
                        <XCircleIcon className="h-4 w-4 mr-2" />
                        Reject
                      </button>
                      <button onClick={handleApprove} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center">
                        <CheckIcon className="h-4 w-4 mr-2" />
                        Approve
                      </button>
                    </div>
                  </div>}
              </> : <div className="flex-1 flex items-center justify-center p-6 text-center text-gray-500 dark:text-gray-400">
                <div>
                  <ClockIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">
                    No Agent Selected
                  </h3>
                  <p className="max-w-sm">
                    Select an agent from the list to review and approve or
                    reject it.
                  </p>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};