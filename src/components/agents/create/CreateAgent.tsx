import React, { useState } from 'react';
import { ArrowLeftIcon, XIcon } from 'lucide-react';
import { Stepper } from '../../common/Stepper';
import { BasicInfoStep } from './BasicInfoStep';
import { CapabilitiesStep } from './CapabilitiesStep';
import { KnowledgeSourcesStep } from './KnowledgeSourcesStep';
import { ConnectorsStep } from './ConnectorsStep';
import { ModelConfigStep } from './ModelConfigStep';
import { TestStep } from './TestStep';
import { ReviewStep } from './ReviewStep';
interface CreateAgentProps {
  onClose: () => void;
}
export const CreateAgent = ({
  onClose
}: CreateAgentProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [agentData, setAgentData] = useState({
    name: '',
    description: '',
    category: 'Text',
    type: 'Classification',
    isPrivate: false,
    department: '',
    approvalRequired: true,
    approvalStatus: 'pending',
    capabilities: [],
    knowledgeSources: [],
    connectors: [],
    baseModel: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1024,
    systemPrompt: 'You are a helpful AI assistant specialized in classification tasks.',
    testResults: null
  });
  const steps = [{
    id: 'basic',
    label: 'Basic Info'
  }, {
    id: 'capabilities',
    label: 'Capabilities'
  }, {
    id: 'knowledge',
    label: 'Knowledge'
  }, {
    id: 'connectors',
    label: 'Connectors'
  }, {
    id: 'model',
    label: 'Model Config'
  }, {
    id: 'test',
    label: 'Test Agent'
  }, {
    id: 'review',
    label: 'Review & Create'
  }];
  const updateAgentData = data => {
    setAgentData(prev => ({
      ...prev,
      ...data
    }));
  };
  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  const handleSave = () => {
    // In a real app, this would save the agent to the backend
    console.log('Saving agent:', agentData);
    // Show success message based on approval status
    if (agentData.approvalRequired) {
      alert('Agent submitted for approval. You will be notified once it has been reviewed.');
    } else {
      alert('Agent created successfully!');
    }
    onClose();
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep data={agentData} updateData={updateAgentData} onNext={handleNext} />;
      case 1:
        return <CapabilitiesStep data={agentData} updateData={updateAgentData} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <KnowledgeSourcesStep data={agentData} updateData={updateAgentData} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <ConnectorsStep data={agentData} updateData={updateAgentData} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <ModelConfigStep data={agentData} updateData={updateAgentData} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <TestStep data={agentData} updateData={updateAgentData} onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <ReviewStep data={agentData} onSave={handleSave} onBack={handleBack} />;
      default:
        return null;
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
            </button>
            <h2 className="text-xl font-semibold">Create New Agent</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>
        <div className="flex-1 overflow-auto p-6">{renderStepContent()}</div>
      </div>
    </div>;
};