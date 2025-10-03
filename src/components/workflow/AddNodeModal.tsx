import React, { useState } from 'react';
import { XIcon, ZapIcon, BrainCircuitIcon, PlayIcon, SearchIcon } from 'lucide-react';
const NODE_TYPES = [{
  id: 'trigger',
  name: 'Trigger',
  description: 'Start your workflow with an event trigger',
  icon: ZapIcon,
  color: 'text-amber-500 dark:text-amber-400',
  bgColor: 'bg-amber-50 dark:bg-amber-900/20',
  borderColor: 'border-amber-200 dark:border-amber-800',
  examples: ['Email Received', 'Scheduled Event', 'Webhook', 'Form Submission', 'API Request']
}, {
  id: 'agent',
  name: 'Agent',
  description: 'Add an AI agent to process data in your workflow',
  icon: BrainCircuitIcon,
  color: 'text-indigo-500 dark:text-indigo-400',
  bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
  borderColor: 'border-indigo-200 dark:border-indigo-800',
  examples: ['Text Classifier', 'Content Generator', 'Sentiment Analyzer', 'Data Extractor', 'Summarizer']
}, {
  id: 'action',
  name: 'Action',
  description: 'Perform an operation or integrate with external services',
  icon: PlayIcon,
  color: 'text-green-500 dark:text-green-400',
  bgColor: 'bg-green-50 dark:bg-green-900/20',
  borderColor: 'border-green-200 dark:border-green-800',
  examples: ['Send Email', 'Create Ticket', 'Update Database', 'Call API', 'Notify User']
}];
const DEFAULT_NODE_POSITION = {
  x: 250,
  y: 250
};
// Mock agents data - in a real implementation, this would be passed from the parent component
const systemAgents = [{
  id: 1,
  name: 'Text Classifier',
  description: 'Categorizes text into predefined classes',
  type: 'Classification',
  category: 'Text',
  isCustom: false
}, {
  id: 2,
  name: 'Sentiment Analyzer',
  description: 'Determines sentiment of text content',
  type: 'Analysis',
  category: 'Text',
  isCustom: false
}, {
  id: 3,
  name: 'Image Recognizer',
  description: 'Identifies objects in images',
  type: 'Recognition',
  category: 'Vision',
  isCustom: false
}, {
  id: 4,
  name: 'Email Responder',
  description: 'Generates contextual email responses',
  type: 'Generation',
  category: 'Text',
  isCustom: true
}, {
  id: 5,
  name: 'Document Summarizer',
  description: 'Creates concise document summaries',
  type: 'Summarization',
  category: 'Text',
  isCustom: false
}, {
  id: 6,
  name: 'Customer Support Bot',
  description: 'Handles common support requests',
  type: 'Conversation',
  category: 'Chat',
  isCustom: true
}, {
  id: 7,
  name: 'PDF Summarizer',
  description: 'Extracts and summarizes key information from PDF documents',
  type: 'Summarization',
  category: 'Text',
  isCustom: false
}, {
  id: 8,
  name: 'Annual Report Summarizer',
  description: 'Analyzes and summarizes financial annual reports',
  type: 'Summarization',
  category: 'Text',
  isCustom: false
}, {
  id: 9,
  name: 'Contract Writer',
  description: 'Generates legal contracts based on specified terms',
  type: 'Generation',
  category: 'Text',
  isCustom: false
}, {
  id: 10,
  name: 'Financial Market Analyzer',
  description: 'Analyzes market trends and provides investment insights',
  type: 'Analysis',
  category: 'Text',
  isCustom: false
}];
interface AddNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNode: (nodeData: any) => void;
  existingNodes: any[];
}
export const AddNodeModal = ({
  isOpen,
  onClose,
  onAddNode,
  existingNodes
}: AddNodeModalProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [nodeData, setNodeData] = useState({
    label: '',
    description: '',
    agentType: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  if (!isOpen) return null;
  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    if (typeId === 'agent') {
      setStep(2); // Go to agent selection step
    } else {
      setStep(3); // Go directly to node configuration
    }
  };
  const handleAgentSelect = agent => {
    setSelectedAgent(agent);
    setNodeData({
      label: agent.name,
      description: agent.description,
      agentType: agent.type
    });
    setStep(3);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setNodeData({
      ...nodeData,
      [name]: value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a unique ID for the new node
    const newId = `node_${Date.now()}`;
    // Calculate a position that doesn't overlap with existing nodes
    // Simple algorithm: place new node below the lowest existing node
    let newPosition = {
      ...DEFAULT_NODE_POSITION
    };
    if (existingNodes.length > 0) {
      const lowestNode = existingNodes.reduce((lowest, node) => node.position.y > lowest.position.y ? node : lowest, existingNodes[0]);
      newPosition = {
        x: lowestNode.position.x,
        y: lowestNode.position.y + 150
      };
    }
    const newNode = {
      id: newId,
      type: selectedType,
      position: newPosition,
      data: {
        ...nodeData,
        agentId: selectedAgent?.id // Include the agent ID if an agent was selected
      }
    };
    onAddNode(newNode);
    // Reset state
    setSelectedType(null);
    setStep(1);
    setNodeData({
      label: '',
      description: '',
      agentType: ''
    });
    setSelectedAgent(null);
    setSearchQuery('');
    onClose();
  };
  const handleBack = () => {
    if (step === 3 && selectedType === 'agent') {
      setStep(2); // Go back to agent selection
    } else {
      setStep(1); // Go back to node type selection
      setSelectedType(null);
    }
  };
  const filteredAgents = systemAgents.filter(agent => agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || agent.description.toLowerCase().includes(searchQuery.toLowerCase()) || agent.type.toLowerCase().includes(searchQuery.toLowerCase()) || agent.category.toLowerCase().includes(searchQuery.toLowerCase()));
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
  const selectedTypeInfo = NODE_TYPES.find(type => type.id === selectedType);
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {step === 1 ? 'Add Node to Workflow' : step === 2 ? 'Select Agent' : `Configure ${selectedTypeInfo?.name} Node`}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon size={20} />
          </button>
        </div>
        {step === 1 && <div className="p-6 overflow-auto">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Select the type of node you want to add to your workflow:
            </p>
            <div className="space-y-3">
              {NODE_TYPES.map(type => <button key={type.id} onClick={() => handleTypeSelect(type.id)} className={`w-full text-left p-4 rounded-lg border ${type.borderColor} ${type.bgColor} hover:bg-opacity-70 transition-colors`}>
                  <div className="flex items-start">
                    <div className={`p-2 rounded-md ${type.bgColor} ${type.color}`}>
                      <type.icon size={20} />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </button>)}
            </div>
          </div>}
        {step === 2 && <div className="p-6 flex flex-col h-full">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Select an agent from the library:
            </p>
            <div className="relative mb-4">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input type="text" placeholder="Search agents..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" />
            </div>
            <div className="overflow-y-auto flex-grow space-y-3">
              {filteredAgents.length === 0 ? <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No agents found matching your search.
                </p> : filteredAgents.map(agent => <button key={agent.id} onClick={() => handleAgentSelect(agent)} className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <BrainCircuitIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="ml-3 flex-1">
                        <h4 className="font-medium">{agent.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {agent.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
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
                      </div>
                    </div>
                  </button>)}
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button type="button" onClick={handleBack} className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                Back
              </button>
              <button type="button" onClick={() => setStep(3)} className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Create Custom Agent
              </button>
            </div>
          </div>}
        {step === 3 && <form onSubmit={handleSubmit} className="p-6 overflow-auto">
            <div className="space-y-4">
              <div>
                <label htmlFor="label" className="block text-sm font-medium mb-1">
                  Node Name <span className="text-red-500">*</span>
                </label>
                <input id="label" name="label" type="text" required value={nodeData.label} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder={`e.g. ${selectedTypeInfo?.examples[0]}`} />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea id="description" name="description" required value={nodeData.description} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="Briefly describe what this node does..." />
              </div>
              {selectedType === 'agent' && !selectedAgent && <div>
                  <label htmlFor="agentType" className="block text-sm font-medium mb-1">
                    Agent Type <span className="text-red-500">*</span>
                  </label>
                  <select id="agentType" name="agentType" required value={nodeData.agentType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700">
                    <option value="" disabled>
                      Select agent type...
                    </option>
                    <option value="Classification">Classification</option>
                    <option value="Text Generation">Text Generation</option>
                    <option value="Sentiment Analysis">
                      Sentiment Analysis
                    </option>
                    <option value="Data Extraction">Data Extraction</option>
                    <option value="Summarization">Summarization</option>
                    <option value="Translation">Translation</option>
                    <option value="Q&A">Q&A</option>
                  </select>
                </div>}
              {selectedAgent && <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Selected Agent</h4>
                  <div className="flex items-center">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg">
                      <BrainCircuitIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{selectedAgent.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedAgent.type} · {selectedAgent.category}
                      </p>
                    </div>
                  </div>
                </div>}
              {!selectedAgent && selectedType === 'agent' && <div className="pt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Example {selectedTypeInfo?.name} nodes:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTypeInfo?.examples.map((example, index) => <button key={index} type="button" onClick={() => setNodeData({
                ...nodeData,
                label: example,
                description: `${example} ${selectedTypeInfo.id === 'trigger' ? 'trigger' : 'node'}`
              })} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                        {example}
                      </button>)}
                  </div>
                </div>}
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" onClick={handleBack} className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                Back
              </button>
              <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Add to Workflow
              </button>
            </div>
          </form>}
      </div>
    </div>;
};