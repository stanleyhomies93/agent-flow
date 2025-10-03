import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
export const CreateWorkflowModal = ({
  onClose,
  onCreateWorkflow
}) => {
  const [workflowData, setWorkflowData] = useState({
    name: '',
    description: '',
    template: 'blank' // 'blank', 'email', 'customer-support', 'data-processing'
  });
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setWorkflowData({
      ...workflowData,
      [name]: value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onCreateWorkflow({
      ...workflowData,
      id: `workflow-${Date.now()}`,
      created: new Date().toISOString(),
      lastEdited: new Date().toISOString(),
      isActive: false,
      nodeCount: workflowData.template === 'blank' ? 0 : getTemplateNodeCount(workflowData.template)
    });
  };
  const getTemplateNodeCount = template => {
    switch (template) {
      case 'email':
        return 3;
      case 'customer-support':
        return 4;
      case 'data-processing':
        return 5;
      default:
        return 0;
    }
  };
  const templates = [{
    id: 'blank',
    name: 'Blank Workflow',
    description: 'Start from scratch with an empty workflow'
  }, {
    id: 'email',
    name: 'Email Processing',
    description: 'Classify and respond to incoming emails'
  }, {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Automate responses to common support queries'
  }, {
    id: 'data-processing',
    name: 'Data Processing',
    description: 'Extract and transform data from documents'
  }];
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium">Create New Workflow</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Workflow Name <span className="text-red-500">*</span>
              </label>
              <input id="name" name="name" type="text" required value={workflowData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="e.g. Customer Email Processor" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea id="description" name="description" value={workflowData.description} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="Briefly describe what this workflow does..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Template</label>
              <div className="grid grid-cols-1 gap-3">
                {templates.map(template => <label key={template.id} className={`relative border rounded-lg p-4 cursor-pointer ${workflowData.template === template.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                    <input type="radio" name="template" value={template.id} checked={workflowData.template === template.id} onChange={handleChange} className="sr-only" />
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {template.description}
                      </p>
                    </div>
                  </label>)}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              Cancel
            </button>
            <button type="submit" disabled={!workflowData.name.trim()} className={`px-3 py-2 rounded-md ${workflowData.name.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}>
              Create Workflow
            </button>
          </div>
        </form>
      </div>
    </div>;
};