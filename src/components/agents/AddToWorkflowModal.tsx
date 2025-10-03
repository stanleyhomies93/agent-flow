import React from 'react';
import { XIcon, PlusCircleIcon, PlusIcon } from 'lucide-react';
interface AddToWorkflowModalProps {
  agent: any;
  onClose: () => void;
  onConfirm: (action: 'new' | 'existing') => void;
}
export const AddToWorkflowModal = ({
  agent,
  onClose,
  onConfirm
}: AddToWorkflowModalProps) => {
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium">Add Agent to Workflow</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <PlusCircleIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h4 className="font-medium">{agent.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {agent.type} · {agent.category}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            How would you like to add this agent to your workflows?
          </p>
          <div className="space-y-3">
            <button onClick={() => onConfirm('existing')} className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start">
                <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400">
                  <PlusIcon size={20} />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Add to Current Workflow</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Add this agent to your currently open workflow
                  </p>
                </div>
              </div>
            </button>
            <button onClick={() => onConfirm('new')} className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start">
                <div className="p-2 rounded-md bg-green-50 dark:bg-green-900/20 text-green-500 dark:text-green-400">
                  <PlusCircleIcon size={20} />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Create New Workflow</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Start a new workflow with this agent
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>;
};