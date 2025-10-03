import React, { useCallback, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { WorkflowBuilder } from './components/workflow/WorkflowBuilder';
import { WorkflowList } from './components/workflow/WorkflowList';
import { AgentLibrary } from './components/agents/AgentLibrary';
import { MonitoringDashboard } from './components/monitoring/MonitoringDashboard';
import { Settings } from './components/settings/Settings';
import { KnowledgeBase } from './components/knowledge/KnowledgeBase';
import { Connectors } from './components/connectors/Connectors';
import { AgentApprovalQueue } from './components/agents/AgentApprovalQueue';
export function App() {
  const [activeView, setActiveView] = useState('workflows');
  const [pendingAgentNode, setPendingAgentNode] = useState(null);
  const [createNewWorkflow, setCreateNewWorkflow] = useState(false);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState(null);
  // Sample workflows data
  const [workflows, setWorkflows] = useState([{
    id: 'workflow-1',
    name: 'Email Processing Workflow',
    description: 'Automatically classify and respond to incoming emails',
    created: '2023-09-15T10:30:00Z',
    lastEdited: '2023-10-01T14:22:10Z',
    isActive: true,
    nodeCount: 4
  }, {
    id: 'workflow-2',
    name: 'Customer Support Bot',
    description: 'Handle common customer queries automatically',
    created: '2023-09-20T09:15:30Z',
    lastEdited: '2023-09-28T16:45:20Z',
    isActive: true,
    nodeCount: 5
  }, {
    id: 'workflow-3',
    name: 'Data Processing Pipeline',
    description: 'Extract and transform data from multiple sources',
    created: '2023-08-10T11:45:00Z',
    lastEdited: '2023-09-05T13:20:15Z',
    isActive: false,
    nodeCount: 7
  }]);
  // Function to navigate to workflow view
  const navigateToWorkflow = useCallback(() => {
    setActiveView('workflows');
  }, []);
  // Function to handle adding an agent to workflow
  const handleAddAgentToWorkflow = useCallback((agentNode, isNewWorkflow) => {
    setPendingAgentNode(agentNode);
    setCreateNewWorkflow(isNewWorkflow);
    // If creating a new workflow, deselect any currently selected workflow
    if (isNewWorkflow) {
      setSelectedWorkflowId(null);
    }
  }, []);
  // Function to clear pending agent after it's been added
  const clearPendingAgent = useCallback(() => {
    setPendingAgentNode(null);
    setCreateNewWorkflow(false);
  }, []);
  // Function to select a workflow to view/edit
  const handleSelectWorkflow = useCallback(workflowId => {
    setSelectedWorkflowId(workflowId);
  }, []);
  // Function to go back to workflow list
  const handleBackToWorkflows = useCallback(() => {
    setSelectedWorkflowId(null);
  }, []);
  // Function to create a new workflow
  const handleCreateWorkflow = useCallback(workflowData => {
    const newWorkflow = {
      ...workflowData,
      id: `workflow-${Date.now()}`
    };
    setWorkflows(prevWorkflows => [...prevWorkflows, newWorkflow]);
    // Optionally, select the new workflow to edit it
    setSelectedWorkflowId(newWorkflow.id);
  }, []);
  const renderView = () => {
    switch (activeView) {
      case 'workflows':
        return selectedWorkflowId ? <WorkflowBuilder workflowId={selectedWorkflowId} onBackToList={handleBackToWorkflows} pendingAgentNode={pendingAgentNode} createNewWorkflow={createNewWorkflow} onAgentNodeAdded={clearPendingAgent} /> : <WorkflowList workflows={workflows} onSelectWorkflow={handleSelectWorkflow} onCreateWorkflow={handleCreateWorkflow} />;
      case 'agents':
        return <AgentLibrary onNavigateToWorkflow={navigateToWorkflow} onAddAgentToWorkflow={handleAddAgentToWorkflow} setActiveView={setActiveView} />;
      case 'agent-approvals':
        return <AgentApprovalQueue />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'connectors':
        return <Connectors />;
      case 'monitoring':
        return <MonitoringDashboard />;
      case 'settings':
        return <Settings />;
      default:
        return <WorkflowList workflows={workflows} onSelectWorkflow={handleSelectWorkflow} />;
    }
  };
  return <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-4">{renderView()}</main>
      </div>
    </div>;
}