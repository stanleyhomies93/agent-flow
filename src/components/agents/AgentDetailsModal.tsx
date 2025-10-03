import React, { useState } from 'react';
import { XIcon, BrainCircuitIcon, BookIcon, LinkIcon, CheckCircleIcon, AlertCircleIcon, ClockIcon, BuildingIcon, MessageCircleIcon, ImageIcon, PlusIcon, UploadIcon } from 'lucide-react';
interface AgentDetailsModalProps {
  agent: any;
  onClose: () => void;
  onAddToWorkflow?: (agent: any) => void;
  onStartChat?: (agent: any) => void;
  onTestVisionAgent?: (agent: any) => void;
}
export const AgentDetailsModal = ({
  agent,
  onClose,
  onAddToWorkflow,
  onStartChat,
  onTestVisionAgent
}: AgentDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const getCategoryColor = category => {
    switch (category) {
      case 'Text':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Vision':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Chat':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };
  const getApprovalStatusBadge = () => {
    const status = agent.approvalStatus || 'approved';
    switch (status) {
      case 'pending':
        return <div className="flex items-center px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <ClockIcon className="h-3 w-3 mr-1" />
            <span>Pending Approval</span>
          </div>;
      case 'rejected':
        return <div className="flex items-center px-2 py-1 text-xs rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            <span>Rejected</span>
          </div>;
      case 'approved':
      default:
        return <div className="flex items-center px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            <span>Approved</span>
          </div>;
    }
  };
  // Check if this is a conversational agent
  const isConversational = agent.category === 'Chat' || agent.type === 'Conversation';
  // Check if this is a document agent
  const isDocumentAgent = agent.documentAgent === true;
  // Check if this is a vision agent
  const isVisionAgent = agent.category === 'Vision' || agent.type === 'Recognition';
  // Sample prompt and output data (in a real app, this would come from the agent's configuration)
  const samplePrompt = agent.systemPrompt || `You are a helpful AI assistant specialized in ${agent.type.toLowerCase()}. 
Your task is to ${agent.description.toLowerCase()}.
Always be concise, accurate, and helpful in your responses.
If you're unsure about something, acknowledge the uncertainty rather than making up information.`;
  const sampleOutput = (() => {
    switch (agent.type) {
      case 'Classification':
        return `{
  "category": "Urgent",
  "confidence": 0.92,
  "reasoning": "The email contains language indicating time sensitivity and is from a key stakeholder."
}`;
      case 'Summarization':
        return `The document outlines the company's Q3 financial performance, highlighting a 15% revenue increase year-over-year. Key achievements include the successful launch of Product X, which exceeded sales projections by 20%. Challenges mentioned include supply chain disruptions and increased competition in the European market. The outlook for Q4 remains positive with projected growth of 8-10%.`;
      case 'Generation':
        return `Dear [Customer],
Thank you for your inquiry about our premium subscription service. Based on your specific needs, I recommend our Business Pro plan, which includes all the features you mentioned.
The plan offers unlimited access to our analytics dashboard, priority customer support, and the ability to create up to 10 team workspaces. Additionally, you'll receive monthly strategy sessions with our experts.
I've attached a detailed comparison of all our plans for your review. If you have any questions or would like a personalized demo, please let me know.
Best regards,
[Agent Name]`;
      case 'Analysis':
        return `Sentiment Analysis Results:
- Overall Sentiment: Positive (0.78)
- Key Positive Themes: Product quality, customer service, ease of use
- Key Negative Themes: Price point, mobile app performance
- Recommendations: Address app performance issues, consider pricing tier options`;
      case 'Recognition':
        return `{
  "objects": [
    {"label": "person", "confidence": 0.96, "position": [45, 120, 210, 380]},
    {"label": "car", "confidence": 0.88, "position": [300, 200, 450, 320]},
    {"label": "tree", "confidence": 0.72, "position": [500, 50, 580, 300]}
  ],
  "scene_type": "outdoor",
  "weather_condition": "sunny",
  "time_of_day": "daytime"
}`;
      case 'Conversation':
        return `Customer: I'm having trouble logging into my account.
Agent: I'm sorry to hear you're having login issues. Let me help you with that. Could you please tell me what happens when you try to log in? Do you receive any error messages?
Customer: It says "invalid credentials" but I'm sure my password is correct.
Agent: Thank you for that information. There are a few possible reasons for this error. Let's try a password reset first. I can send a reset link to your registered email address. Would you like to proceed with that?
Customer: Yes, please send the reset link.
Agent: I've sent a password reset link to your email. Please check your inbox (and spam folder just in case) and follow the instructions. The link will expire in 24 hours. After resetting your password, please try logging in again. If you continue to experience issues, please let me know.`;
      default:
        return `Sample output will be displayed here based on the agent's configuration and type.`;
    }
  })();
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <BrainCircuitIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{agent.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {agent.type} · {agent.category}
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
            <button className={`mr-6 py-4 border-b-2 font-medium text-sm ${activeTab === 'prompt' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('prompt')}>
              Prompt & Output
            </button>
            <button className={`mr-6 py-4 border-b-2 font-medium text-sm ${activeTab === 'configuration' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('configuration')}>
              Configuration
            </button>
            <button className={`mr-6 py-4 border-b-2 font-medium text-sm ${activeTab === 'usage' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('usage')}>
              Usage & Analytics
            </button>
          </nav>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'overview' && <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {agent.description}
                  </p>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Capabilities</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                      {(agent.capabilities || [`Can perform ${agent.type.toLowerCase()} tasks`, `Processes ${agent.category.toLowerCase()} data efficiently`, 'Provides detailed analysis and explanations', 'Handles complex inputs with high accuracy']).map((capability, index) => <li key={index}>{capability}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h3 className="text-sm font-medium mb-3">Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                          Status
                        </span>
                        <div className="mt-1">{getApprovalStatusBadge()}</div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                          Category
                        </span>
                        <span className={`mt-1 inline-block px-2 py-1 text-xs rounded-full ${getCategoryColor(agent.category)}`}>
                          {agent.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                          Type
                        </span>
                        <span className="mt-1 inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                          {agent.type}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                          Department
                        </span>
                        <div className="mt-1 flex items-center">
                          <BuildingIcon className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                          <span>{agent.department || 'General'}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                          Created By
                        </span>
                        <div className="mt-1 flex items-center">
                          <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-medium mr-1">
                            {agent.createdBy?.initials || 'JD'}
                          </div>
                          <span>{agent.createdBy?.name || 'John Doe'}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 block">
                          Created On
                        </span>
                        <span>{agent.createdOn || '2 days ago'}</span>
                      </div>
                    </div>
                  </div>
                  {/* Knowledge Sources */}
                  {agent.knowledgeSources && agent.knowledgeSources.length > 0 && <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <BookIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                          <h3 className="text-sm font-medium">
                            Knowledge Sources
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {agent.knowledgeSources.map(source => <div key={source.id} className="text-sm px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded">
                              {source.name}
                            </div>)}
                        </div>
                      </div>}
                  {/* Connectors */}
                  {agent.connectors && agent.connectors.length > 0 && <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <LinkIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium">Connectors</h3>
                      </div>
                      <div className="space-y-2">
                        {agent.connectors.map(connector => <div key={connector.id} className="text-sm px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded">
                            {connector.name}
                          </div>)}
                      </div>
                    </div>}
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium mb-4">Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => onAddToWorkflow && onAddToWorkflow(agent)} className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 hover:bg-indigo-700">
                    <PlusIcon className="h-4 w-4" />
                    <span>Add to Workflow</span>
                  </button>
                  {isConversational && !isDocumentAgent && <button onClick={() => onStartChat && onStartChat(agent)} className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center space-x-2 hover:bg-green-700">
                      <MessageCircleIcon className="h-4 w-4" />
                      <span>Chat</span>
                    </button>}
                  {isDocumentAgent && <button onClick={() => onStartChat && onStartChat(agent)} className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center space-x-2 hover:bg-blue-700">
                      <UploadIcon className="h-4 w-4" />
                      <span>Upload Document</span>
                    </button>}
                  {isVisionAgent && <button onClick={() => onTestVisionAgent && onTestVisionAgent(agent)} className="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center space-x-2 hover:bg-purple-700">
                      <ImageIcon className="h-4 w-4" />
                      <span>Try It</span>
                    </button>}
                </div>
              </div>
            </div>}
          {activeTab === 'prompt' && <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">System Prompt</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  This is the prompt that defines how the agent behaves and
                  processes information.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">
                    {samplePrompt}
                  </pre>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Sample Output</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Example of the type of output this agent generates based on
                  its configuration.
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">
                    {sampleOutput}
                  </pre>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                  Prompt Engineering Tips
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700 dark:text-blue-400">
                  <li>
                    Be specific about the agent's role and responsibilities
                  </li>
                  <li>Include examples of desired outputs when possible</li>
                  <li>
                    Define the format for structured outputs (JSON, CSV, etc.)
                  </li>
                  <li>
                    Set clear guidelines for handling edge cases or ambiguity
                  </li>
                </ul>
              </div>
            </div>}
          {activeTab === 'configuration' && <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Model Configuration
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block">
                        Base Model
                      </span>
                      <p className="text-sm font-medium">
                        {agent.baseModel || 'GPT-4'}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block">
                        Temperature
                      </span>
                      <p className="text-sm font-medium">
                        {agent.temperature || '0.7'}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block">
                        Max Tokens
                      </span>
                      <p className="text-sm font-medium">
                        {agent.maxTokens || '1024'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Access Control</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block">
                        Visibility
                      </span>
                      <p className="text-sm font-medium">
                        {agent.isPrivate ? 'Private (Creator only)' : 'Organization-wide'}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block">
                        Department Access
                      </span>
                      <p className="text-sm font-medium">
                        {agent.department ? `${agent.department} Department Only` : 'All Departments'}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block">
                        User Roles with Access
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {(agent.accessRoles || ['Admin', 'Developer', 'Analyst']).map((role, index) => <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                            {role}
                          </span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Cost & Usage Limits
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block">
                        Estimated Cost per 1,000 Runs
                      </span>
                      <p className="text-sm font-medium">
                        ${agent.costEstimate || '2.50 - 5.00'}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block">
                        Monthly Usage Cap
                      </span>
                      <p className="text-sm font-medium">
                        {agent.usageCap || 'Unlimited'}
                      </p>
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
                      Total Runs
                    </span>
                    <p className="text-2xl font-bold mt-1">
                      {agent.stats?.totalRuns || '1,246'}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Average Response Time
                    </span>
                    <p className="text-2xl font-bold mt-1">
                      {agent.stats?.avgResponseTime || '1.8s'}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      -0.3s from last month
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Total Cost (MTD)
                    </span>
                    <p className="text-2xl font-bold mt-1">
                      ${agent.stats?.totalCost || '28.50'}
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                      +5.2% from last month
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Usage Over Time</h4>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm h-64 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Usage chart would be displayed here
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Top Workflows Using This Agent
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-600">
                  {[{
                id: 1,
                name: 'Email Processing Workflow',
                runs: 532
              }, {
                id: 2,
                name: 'Customer Support Bot',
                runs: 328
              }, {
                id: 3,
                name: 'Data Processing Pipeline',
                runs: 184
              }].map(workflow => <div key={workflow.id} className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{workflow.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {workflow.runs} runs
                        </p>
                      </div>
                      <button className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
                        View
                      </button>
                    </div>)}
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};