import React, { useState } from 'react';
import { XIcon, BookIcon, FileTextIcon, DatabaseIcon, FolderIcon, ClockIcon, CheckCircleIcon, UploadIcon, TrashIcon, FileIcon, UsersIcon, LinkIcon, InfoIcon, BarChartIcon, SearchIcon, PlusIcon, RefreshCwIcon, DownloadIcon, EditIcon, SettingsIcon, AlertCircleIcon, ShieldIcon, LockIcon, UnlockIcon, UserIcon, UserPlusIcon, KeyIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
interface KnowledgeSourceDetailsModalProps {
  source: any;
  onClose: () => void;
}
export const KnowledgeSourceDetailsModal = ({
  source,
  onClose
}: KnowledgeSourceDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [accessRules, setAccessRules] = useState([{
    id: 1,
    topic: 'Salary Information',
    description: 'Questions about compensation, bonuses, and salary reviews',
    allowedRoles: ['HR Manager', 'Executive'],
    restrictedTo: 'specific',
    status: 'active'
  }, {
    id: 2,
    topic: 'Performance Reviews',
    description: 'Information about employee performance evaluations',
    allowedRoles: ['HR Staff', 'Manager', 'Executive'],
    restrictedTo: 'specific',
    status: 'active'
  }, {
    id: 3,
    topic: 'Company Policies',
    description: 'General company policies and procedures',
    allowedRoles: ['All Employees'],
    restrictedTo: 'none',
    status: 'active'
  }, {
    id: 4,
    topic: 'Benefits and PTO',
    description: 'Information about employee benefits and time off',
    allowedRoles: ['All Employees'],
    restrictedTo: 'none',
    status: 'active'
  }, {
    id: 5,
    topic: 'Hiring Plans',
    description: 'Information about upcoming hiring and department growth',
    allowedRoles: ['HR Manager', 'Manager', 'Executive'],
    restrictedTo: 'specific',
    status: 'active'
  }, {
    id: 6,
    topic: 'Employee Personal Data',
    description: 'Access to personal information about employees',
    allowedRoles: ['HR Staff', 'HR Manager'],
    restrictedTo: 'specific',
    status: 'active'
  }]);
  const [newRule, setNewRule] = useState({
    topic: '',
    description: '',
    allowedRoles: [],
    restrictedTo: 'specific'
  });
  const [editingRuleId, setEditingRuleId] = useState(null);
  const [showAddRuleForm, setShowAddRuleForm] = useState(false);
  const [availableRoles, setAvailableRoles] = useState(['All Employees', 'HR Staff', 'HR Manager', 'Manager', 'Executive', 'IT Admin', 'Finance']);
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
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
  // Mock data for documents in this knowledge source
  const mockDocuments = [{
    id: 1,
    name: 'Product_Manual_v2.1.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedAt: '2023-10-10T09:15:30Z',
    status: 'processed'
  }, {
    id: 2,
    name: 'Technical_Specifications.docx',
    type: 'DOCX',
    size: '1.8 MB',
    uploadedAt: '2023-10-12T14:22:10Z',
    status: 'processed'
  }, {
    id: 3,
    name: 'User_Guide_2023.pdf',
    type: 'PDF',
    size: '5.2 MB',
    uploadedAt: '2023-10-14T11:30:45Z',
    status: 'processed'
  }, {
    id: 4,
    name: 'API_Documentation.md',
    type: 'Markdown',
    size: '342 KB',
    uploadedAt: '2023-10-15T08:45:20Z',
    status: 'processed'
  }, {
    id: 5,
    name: 'Release_Notes_Q3.txt',
    type: 'Text',
    size: '128 KB',
    uploadedAt: '2023-10-08T16:10:15Z',
    status: 'processed'
  }, {
    id: 6,
    name: 'Installation_Guide.pdf',
    type: 'PDF',
    size: '1.5 MB',
    uploadedAt: '2023-10-11T10:20:30Z',
    status: 'processing'
  }];
  // Mock data for agents using this knowledge source
  const mockAgentsUsingSource = [{
    id: 1,
    name: 'Product Support Bot',
    type: 'Conversation',
    department: 'Customer Support'
  }, {
    id: 9,
    name: 'Technical Documentation Assistant',
    type: 'Conversation',
    department: 'Engineering'
  }, {
    id: 12,
    name: 'Installation Guide Bot',
    type: 'Conversation',
    department: 'Customer Support'
  }];
  // Filter documents based on search query
  const filteredDocuments = mockDocuments.filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.type.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleAddRule = () => {
    if (newRule.topic.trim() === '') return;
    const rule = {
      id: Date.now(),
      ...newRule,
      status: 'active'
    };
    setAccessRules([...accessRules, rule]);
    setNewRule({
      topic: '',
      description: '',
      allowedRoles: [],
      restrictedTo: 'specific'
    });
    setShowAddRuleForm(false);
  };
  const handleUpdateRule = () => {
    if (!editingRuleId) return;
    const updatedRules = accessRules.map(rule => rule.id === editingRuleId ? {
      ...rule,
      ...newRule
    } : rule);
    setAccessRules(updatedRules);
    setEditingRuleId(null);
    setNewRule({
      topic: '',
      description: '',
      allowedRoles: [],
      restrictedTo: 'specific'
    });
    setShowAddRuleForm(false);
  };
  const handleEditRule = rule => {
    setEditingRuleId(rule.id);
    setNewRule({
      topic: rule.topic,
      description: rule.description,
      allowedRoles: [...rule.allowedRoles],
      restrictedTo: rule.restrictedTo
    });
    setShowAddRuleForm(true);
  };
  const handleDeleteRule = ruleId => {
    setAccessRules(accessRules.filter(rule => rule.id !== ruleId));
  };
  const handleToggleRuleStatus = ruleId => {
    setAccessRules(accessRules.map(rule => rule.id === ruleId ? {
      ...rule,
      status: rule.status === 'active' ? 'inactive' : 'active'
    } : rule));
  };
  const handleRoleToggle = role => {
    if (newRule.allowedRoles.includes(role)) {
      setNewRule({
        ...newRule,
        allowedRoles: newRule.allowedRoles.filter(r => r !== role)
      });
    } else {
      setNewRule({
        ...newRule,
        allowedRoles: [...newRule.allowedRoles, role]
      });
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              {getSourceTypeIcon(source.sourceType)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{source.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {source.type} • {source.documentCount} documents
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex px-6 -mb-px">
            <button className={`mr-6 py-4 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('overview')}>
              Overview
            </button>
            <button className={`mr-6 py-4 border-b-2 font-medium text-sm ${activeTab === 'documents' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('documents')}>
              Documents
            </button>
            <button className={`mr-6 py-4 border-b-2 font-medium text-sm ${activeTab === 'access-control' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('access-control')}>
              Access Control
            </button>
            <button className={`mr-6 py-4 border-b-2 font-medium text-sm ${activeTab === 'usage' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('usage')}>
              Usage & Analytics
            </button>
            <button className={`mr-6 py-4 border-b-2 font-medium text-sm ${activeTab === 'settings' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('settings')}>
              Settings
            </button>
          </nav>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'overview' && <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {source.description}
                  </p>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Details</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">
                            Source Type
                          </span>
                          <p className="text-sm font-medium mt-1">
                            {source.type}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">
                            Document Count
                          </span>
                          <p className="text-sm font-medium mt-1">
                            {source.documentCount}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">
                            Created On
                          </span>
                          <p className="text-sm font-medium mt-1">
                            {formatDate(source.lastUpdated)}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">
                            Last Updated
                          </span>
                          <p className="text-sm font-medium mt-1">
                            {formatDate(source.lastUpdated)} at{' '}
                            {formatTime(source.lastUpdated)}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">
                            Status
                          </span>
                          <div className="flex items-center mt-1">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm">Active</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 block">
                            Total Size
                          </span>
                          <p className="text-sm font-medium mt-1">
                            {source.sourceType === 'files' ? '42.8 MB' : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">
                      Agents Using This Source
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-600">
                      {mockAgentsUsingSource.map(agent => <div key={agent.id} className="p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mr-3">
                              <FileIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <p className="font-medium">{agent.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {agent.type} • {agent.department}
                              </p>
                            </div>
                          </div>
                          <button className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
                            View
                          </button>
                        </div>)}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3">Quick Stats</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                          Agent Queries (Last 30 days)
                        </span>
                        <p className="text-2xl font-bold mt-1">1,482</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                          Successful Retrievals
                        </span>
                        <p className="text-2xl font-bold mt-1">94%</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                          Avg. Retrieval Time
                        </span>
                        <p className="text-2xl font-bold mt-1">128ms</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="p-1 bg-blue-50 dark:bg-blue-900/20 rounded-md mr-2">
                          <UploadIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">
                              Installation_Guide.pdf
                            </span>{' '}
                            was uploaded
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            2 days ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-1 bg-green-50 dark:bg-green-900/20 rounded-md mr-2">
                          <RefreshCwIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">
                              Knowledge source
                            </span>{' '}
                            was refreshed
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            3 days ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="p-1 bg-red-50 dark:bg-red-900/20 rounded-md mr-2">
                          <TrashIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">
                              Outdated_Manual.pdf
                            </span>{' '}
                            was removed
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            5 days ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                          About Knowledge Sources
                        </h3>
                        <p className="text-xs text-blue-700 dark:text-blue-400">
                          Knowledge sources provide agents with relevant
                          information to enhance their responses. Keep your
                          sources up-to-date for best results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium mb-4">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 hover:bg-indigo-700">
                    <UploadIcon className="h-4 w-4" />
                    <span>Upload Documents</span>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-2 hover:bg-blue-700">
                    <RefreshCwIcon className="h-4 w-4" />
                    <span>Refresh Source</span>
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-md flex items-center space-x-2 hover:bg-gray-700">
                    <EditIcon className="h-4 w-4" />
                    <span>Edit Details</span>
                  </button>
                </div>
              </div>
            </div>}
          {activeTab === 'documents' && <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Documents ({filteredDocuments.length})
                </h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 hover:bg-indigo-700">
                    <UploadIcon className="h-4 w-4" />
                    <span>Upload</span>
                  </button>
                </div>
              </div>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search documents..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Uploaded
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredDocuments.map(doc => <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="font-medium">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            {doc.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {doc.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(doc.uploadedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {doc.status === 'processed' ? <div className="flex items-center text-green-600 dark:text-green-400">
                              <CheckCircleIcon className="h-4 w-4 mr-1" />
                              <span className="text-sm">Processed</span>
                            </div> : <div className="flex items-center text-amber-600 dark:text-amber-400">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              <span className="text-sm">Processing</span>
                            </div>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300" title="Download">
                              <DownloadIcon className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300" title="View">
                              <SearchIcon className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300" title="Delete">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
                {filteredDocuments.length === 0 && <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">
                      No documents found matching your search.
                    </p>
                  </div>}
              </div>
            </div>}
          {activeTab === 'access-control' && <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">
                    Role-Based Access Control
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Control what information your chatbot can provide based on
                    user roles
                  </p>
                </div>
                <button onClick={() => setShowAddRuleForm(true)} className="px-3 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 hover:bg-indigo-700" disabled={showAddRuleForm}>
                  <PlusIcon className="h-4 w-4" />
                  <span>Add Access Rule</span>
                </button>
              </div>
              {showAddRuleForm && <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <h4 className="text-md font-medium mb-4">
                    {editingRuleId ? 'Edit Access Rule' : 'Create Access Rule'}
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="topic" className="block text-sm font-medium mb-1">
                        Topic/Category
                      </label>
                      <input type="text" id="topic" placeholder="e.g., Salary Information, Performance Reviews" value={newRule.topic} onChange={e => setNewRule({
                  ...newRule,
                  topic: e.target.value
                })} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <textarea id="description" rows={2} placeholder="Describe what kind of information this topic includes" value={newRule.description} onChange={e => setNewRule({
                  ...newRule,
                  description: e.target.value
                })} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Access Restriction
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name="restrictedTo" checked={newRule.restrictedTo === 'none'} onChange={() => setNewRule({
                      ...newRule,
                      restrictedTo: 'none',
                      allowedRoles: ['All Employees']
                    })} className="mr-2" />
                          <span className="text-sm">Available to everyone</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="restrictedTo" checked={newRule.restrictedTo === 'specific'} onChange={() => setNewRule({
                      ...newRule,
                      restrictedTo: 'specific',
                      allowedRoles: newRule.allowedRoles.includes('All Employees') ? [] : newRule.allowedRoles
                    })} className="mr-2" />
                          <span className="text-sm">
                            Restrict to specific roles
                          </span>
                        </label>
                      </div>
                    </div>
                    {newRule.restrictedTo === 'specific' && <div>
                        <label className="block text-sm font-medium mb-2">
                          Allowed Roles
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {availableRoles.filter(role => role !== 'All Employees').map(role => <label key={role} className="flex items-center space-x-2 p-2 rounded border border-gray-200 dark:border-gray-600">
                                <input type="checkbox" checked={newRule.allowedRoles.includes(role)} onChange={() => handleRoleToggle(role)} className="rounded text-indigo-600 focus:ring-indigo-500" />
                                <span className="text-sm">{role}</span>
                              </label>)}
                        </div>
                        {newRule.allowedRoles.length === 0 && <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                            Please select at least one role
                          </p>}
                      </div>}
                    <div className="flex justify-end space-x-3 pt-2">
                      <button onClick={() => {
                  setShowAddRuleForm(false);
                  setEditingRuleId(null);
                  setNewRule({
                    topic: '',
                    description: '',
                    allowedRoles: [],
                    restrictedTo: 'specific'
                  });
                }} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                        Cancel
                      </button>
                      <button onClick={editingRuleId ? handleUpdateRule : handleAddRule} disabled={!newRule.topic || newRule.restrictedTo === 'specific' && newRule.allowedRoles.length === 0} className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 ${(!newRule.topic || newRule.restrictedTo === 'specific' && newRule.allowedRoles.length === 0) && 'opacity-50 cursor-not-allowed'}`}>
                        {editingRuleId ? 'Update Rule' : 'Add Rule'}
                      </button>
                    </div>
                  </div>
                </div>}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Topic
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Allowed Roles
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {accessRules.map(rule => <tr key={rule.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {rule.restrictedTo === 'specific' ? <LockIcon className="h-4 w-4 text-amber-500 mr-2" /> : <UnlockIcon className="h-4 w-4 text-green-500 mr-2" />}
                            <span className="font-medium">{rule.topic}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {rule.description}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {rule.allowedRoles.map(role => <span key={role} className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                {role}
                              </span>)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {rule.status === 'active' ? <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                              Active
                            </span> : <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                              Inactive
                            </span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button onClick={() => handleToggleRuleStatus(rule.id)} className={`${rule.status === 'active' ? 'text-amber-600 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300' : 'text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300'}`} title={rule.status === 'active' ? 'Deactivate' : 'Activate'}>
                              {rule.status === 'active' ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                            </button>
                            <button onClick={() => handleEditRule(rule)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300" title="Edit">
                              <EditIcon className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDeleteRule(rule.id)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300" title="Delete">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
                {accessRules.length === 0 && <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">
                      No access rules defined yet
                    </p>
                    <button onClick={() => setShowAddRuleForm(true)} className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-flex items-center">
                      <PlusIcon className="h-4 w-4 mr-1" />
                      <span>Add Your First Rule</span>
                    </button>
                  </div>}
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start">
                  <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                      How Role-Based Access Works
                    </h3>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mb-2">
                      When a user asks a question, the chatbot will:
                    </p>
                    <ol className="list-decimal text-xs text-blue-700 dark:text-blue-400 ml-4 space-y-1">
                      <li>Identify the topic category of the question</li>
                      <li>Check if the user's role has access to that topic</li>
                      <li>
                        Provide information only if the user has appropriate
                        access
                      </li>
                      <li>
                        Politely decline to answer if the user lacks permission
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Testing & Preview</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-3 mb-4">
                    <div>
                      <label htmlFor="test-role" className="block text-sm font-medium mb-1">
                        Test as Role
                      </label>
                      <select id="test-role" className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="Employee">
                        <option value="Employee">Employee</option>
                        <option value="HR Staff">HR Staff</option>
                        <option value="HR Manager">HR Manager</option>
                        <option value="Manager">Manager</option>
                        <option value="Executive">Executive</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="test-question" className="block text-sm font-medium mb-1">
                        Sample Question
                      </label>
                      <select id="test-question" className="px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="salary">
                        <option value="salary">
                          What is the salary range for Software Engineers?
                        </option>
                        <option value="performance">
                          How are performance reviews conducted?
                        </option>
                        <option value="pto">
                          How many vacation days do employees get?
                        </option>
                        <option value="hiring">
                          What are the hiring plans for next quarter?
                        </option>
                      </select>
                    </div>
                    <button className="mt-6 px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                      Test Access
                    </button>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start space-x-2">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
                        <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Employee</p>
                        <p className="text-sm mt-1">
                          What is the salary range for Software Engineers?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 mt-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <ShieldIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">HR Chatbot</p>
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded p-2 mt-1">
                          <p className="text-sm text-red-800 dark:text-red-300 flex items-center">
                            <LockIcon className="h-4 w-4 mr-2 text-red-500" />
                            Access Denied
                          </p>
                          <p className="text-sm mt-1">
                            I'm sorry, but information about salary ranges is
                            only available to HR Staff, HR Managers, and
                            Executives. Please contact your HR representative
                            for this information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {activeTab === 'usage' && <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Usage Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Total Queries
                    </span>
                    <p className="text-2xl font-bold mt-1">4,286</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +18.2% from last month
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Successful Retrievals
                    </span>
                    <p className="text-2xl font-bold mt-1">94%</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +2.5% from last month
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Avg. Latency
                    </span>
                    <p className="text-2xl font-bold mt-1">128ms</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      -15ms from last month
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">
                    Queries Over Time
                  </h4>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm h-64 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Usage chart would be displayed here
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Top Agents Using This Source
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="space-y-4">
                    {mockAgentsUsingSource.map((agent, index) => <div key={agent.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-medium mr-3">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{agent.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {agent.department}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {1200 - index * 350} queries
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Last 30 days
                          </p>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Most Accessed Documents
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="space-y-4">
                    {mockDocuments.slice(0, 3).sort(() => Math.random() - 0.5).map((doc, index) => <div key={doc.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium mr-3">
                              {index + 1}
                            </div>
                            <div className="flex items-center">
                              <FileTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {doc.type} • {doc.size}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {850 - index * 280} retrievals
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Last 30 days
                            </p>
                          </div>
                        </div>)}
                  </div>
                </div>
              </div>
            </div>}
          {activeTab === 'settings' && <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">General Settings</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="source-name" className="block text-sm font-medium mb-1">
                        Knowledge Source Name
                      </label>
                      <input type="text" id="source-name" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" defaultValue={source.name} />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <textarea id="description" rows={3} className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" defaultValue={source.description} />
                    </div>
                    <div>
                      <label htmlFor="source-type" className="block text-sm font-medium mb-1">
                        Source Type
                      </label>
                      <select id="source-type" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" defaultValue={source.sourceType}>
                        <option value="files">Document Collection</option>
                        <option value="text">Text Collection</option>
                        <option value="database">Database</option>
                        <option value="website">Website</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Indexing & Retrieval
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="chunking-strategy" className="block text-sm font-medium mb-1">
                        Chunking Strategy
                      </label>
                      <select id="chunking-strategy" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" defaultValue="paragraph">
                        <option value="paragraph">Paragraph</option>
                        <option value="fixed">Fixed Size (1000 tokens)</option>
                        <option value="semantic">Semantic Boundaries</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="embedding-model" className="block text-sm font-medium mb-1">
                        Embedding Model
                      </label>
                      <select id="embedding-model" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" defaultValue="text-embedding-ada-002">
                        <option value="text-embedding-ada-002">
                          text-embedding-ada-002
                        </option>
                        <option value="text-embedding-3-small">
                          text-embedding-3-small
                        </option>
                        <option value="text-embedding-3-large">
                          text-embedding-3-large
                        </option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="retrieval-method" className="block text-sm font-medium mb-1">
                        Retrieval Method
                      </label>
                      <select id="retrieval-method" className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" defaultValue="similarity">
                        <option value="similarity">
                          Similarity Search (Default)
                        </option>
                        <option value="mmr">
                          Maximum Marginal Relevance (MMR)
                        </option>
                        <option value="hybrid">
                          Hybrid Search (BM25 + Vector)
                        </option>
                      </select>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="top-k" className="block text-sm font-medium">
                          Top K Results
                        </label>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          5
                        </span>
                      </div>
                      <input type="range" id="top-k" min="1" max="20" defaultValue="5" className="w-full mt-2" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>Fewer, more relevant</span>
                        <span>More, less relevant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Access Control</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">
                          Restrict Access by Department
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Limit which departments can use this knowledge source
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                        <input type="checkbox" id="department-access" className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer border-gray-300 dark:border-gray-600 peer checked:translate-x-6 checked:border-indigo-500 dark:checked:border-indigo-400" />
                        <label htmlFor="department-access" className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 dark:bg-gray-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-600"></label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">
                          Make Source Public
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Allow all agents to access this knowledge source
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                        <input type="checkbox" id="public-access" className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer border-gray-300 dark:border-gray-600 peer checked:translate-x-6 checked:border-indigo-500 dark:checked:border-indigo-400" defaultChecked />
                        <label htmlFor="public-access" className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-gray-300 dark:bg-gray-600 peer-checked:bg-indigo-500 dark:peer-checked:bg-indigo-600"></label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Authorized Users
                      </label>
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm">
                            JD
                          </div>
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">
                            AS
                          </div>
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">
                            TK
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 text-sm">
                            +3
                          </div>
                        </div>
                        <button className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline flex items-center">
                          <UsersIcon className="h-3.5 w-3.5 mr-1" />
                          Manage Users
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-red-600 dark:text-red-400">
                  Danger Zone
                </h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-red-800 dark:text-red-300">
                          Reset Knowledge Source
                        </h4>
                        <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                          Clear all documents and reset the index. This action
                          cannot be undone.
                        </p>
                      </div>
                      <button className="px-3 py-1.5 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-sm">
                        Reset
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium text-red-800 dark:text-red-300">
                          Delete Knowledge Source
                        </h4>
                        <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                          Permanently delete this knowledge source and all its
                          documents. This action cannot be undone.
                        </p>
                      </div>
                      <button className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  Save Changes
                </button>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};