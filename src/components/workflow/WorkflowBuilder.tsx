import React, { useEffect, useState } from 'react';
import { PlusIcon, SaveIcon, PlayIcon, PauseIcon, MoreHorizontalIcon, ZoomInIcon, ZoomOutIcon, ArrowLeftIcon } from 'lucide-react';
import { ReactFlow, Background, Controls, MiniMap, addEdge, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { AgentNode } from './AgentNode';
import { TriggerNode } from './TriggerNode';
import { ActionNode } from './ActionNode';
import { AddNodeModal } from './AddNodeModal';
// Import agents from AgentLibrary (in a real app, you'd pass this as a prop)
import { systemAgents } from '../agents/AgentLibrary';
const nodeTypes = {
  agent: AgentNode,
  trigger: TriggerNode,
  action: ActionNode
};
const initialNodes = [{
  id: '1',
  type: 'trigger',
  position: {
    x: 250,
    y: 100
  },
  data: {
    label: 'Email Received',
    description: 'Trigger on new email'
  }
}, {
  id: '2',
  type: 'agent',
  position: {
    x: 250,
    y: 250
  },
  data: {
    label: 'Email Classifier',
    description: 'Categorize email by priority',
    agentType: 'Classification'
  }
}, {
  id: '3',
  type: 'agent',
  position: {
    x: 100,
    y: 400
  },
  data: {
    label: 'Response Generator',
    description: 'Generate email response',
    agentType: 'Text Generation'
  }
}, {
  id: '4',
  type: 'action',
  position: {
    x: 400,
    y: 400
  },
  data: {
    label: 'Ticket Creator',
    description: 'Create ticket in helpdesk'
  }
}];
const initialEdges = [{
  id: 'e1-2',
  source: '1',
  target: '2'
}, {
  id: 'e2-3',
  source: '2',
  target: '3'
}, {
  id: 'e2-4',
  source: '2',
  target: '4'
}];
export const WorkflowBuilder = ({
  workflowId,
  onBackToList,
  pendingAgentNode,
  createNewWorkflow,
  onAgentNodeAdded
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isRunning, setIsRunning] = useState(false);
  const [isAddNodeModalOpen, setIsAddNodeModalOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState('Email Processing Workflow');
  // Load workflow data based on workflowId
  useEffect(() => {
    // In a real app, you would fetch the workflow data from an API
    // For now, we'll just use the sample data
    if (workflowId === 'workflow-1') {
      setWorkflowName('Email Processing Workflow');
    } else if (workflowId === 'workflow-2') {
      setWorkflowName('Customer Support Bot');
    } else if (workflowId === 'workflow-3') {
      setWorkflowName('Data Processing Pipeline');
    }
  }, [workflowId]);
  const onConnect = params => setEdges(eds => addEdge(params, eds));
  const handleAddNode = newNode => {
    setNodes(nds => [...nds, newNode]);
  };
  // Handle adding a pending agent node from the agent library
  useEffect(() => {
    if (pendingAgentNode) {
      // If creating a new workflow, clear existing nodes first
      if (createNewWorkflow) {
        setNodes([]);
        setEdges([]);
        setWorkflowName(`${pendingAgentNode.data.label} Workflow`);
      }
      // Calculate position for the new node
      let newPosition = {
        ...pendingAgentNode.position
      };
      if (nodes.length > 0 && !createNewWorkflow) {
        // Position the node below the lowest existing node
        const lowestNode = nodes.reduce((lowest, node) => node.position.y > lowest.position.y ? node : lowest, nodes[0]);
        newPosition = {
          x: lowestNode.position.x,
          y: lowestNode.position.y + 150
        };
      }
      // Add the node to the workflow
      const nodeToAdd = {
        ...pendingAgentNode,
        position: newPosition
      };
      setNodes(nds => [...nds, nodeToAdd]);
      // Clear the pending node
      if (onAgentNodeAdded) {
        onAgentNodeAdded();
      }
    }
  }, [pendingAgentNode, createNewWorkflow, nodes, setNodes, setEdges, onAgentNodeAdded]);
  return <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button onClick={onBackToList} className="mr-3 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <ArrowLeftIcon size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{workflowName}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Last edited 2 hours ago
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex items-center space-x-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
            <SaveIcon size={16} />
            <span>Save</span>
          </button>
          <button className={`px-3 py-2 rounded-md flex items-center space-x-2 text-sm ${isRunning ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800' : 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800'}`} onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
            <span>{isRunning ? 'Stop' : 'Run'}</span>
          </button>
          <button className="px-3 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 text-sm hover:bg-indigo-700" onClick={() => setIsAddNodeModalOpen(true)}>
            <PlusIcon size={16} />
            <span>Add Node</span>
          </button>
        </div>
      </div>
      <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} fitView>
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      <AddNodeModal isOpen={isAddNodeModalOpen} onClose={() => setIsAddNodeModalOpen(false)} onAddNode={handleAddNode} existingNodes={nodes} />
    </div>;
};