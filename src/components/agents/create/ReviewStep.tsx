import React from 'react';
import { CheckCircleIcon, AlertCircleIcon, BookIcon, LinkIcon, ClockIcon, BuildingIcon } from 'lucide-react';
export const ReviewStep = ({
  data,
  onSave,
  onBack
}) => {
  // Check if all required fields are filled
  const isComplete = data.name && data.description && data.category && data.type && data.systemPrompt && data.department;
  // Check if test was successful
  const testCompleted = data.testResults && data.testResults.status === 'success';
  // Get approval status badge
  const getApprovalStatusBadge = () => {
    if (!data.approvalRequired) {
      return <div className="flex items-center">
          <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" />
          <span className="text-green-600 dark:text-green-400">
            Auto-approved
          </span>
        </div>;
    }
    return <div className="flex items-center">
        <ClockIcon className="h-4 w-4 mr-1 text-amber-500" />
        <span className="text-amber-600 dark:text-amber-400">
          Will require approval
        </span>
      </div>;
  };
  return <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Review & Create</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Review your agent configuration before creating it.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-medium">Agent Summary</h4>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Name
              </h5>
              <p>{data.name || 'Not specified'}</p>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Type
              </h5>
              <div className="flex items-center">
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  {data.type}
                </span>
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  {data.category}
                </span>
                {data.isPrivate && <span className="ml-2 px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    Private
                  </span>}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Department
              </h5>
              <div className="flex items-center">
                <BuildingIcon className="h-4 w-4 mr-1 text-gray-500" />
                <span>{data.department || 'Not specified'}</span>
              </div>
            </div>
            <div>
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Approval Status
              </h5>
              {getApprovalStatusBadge()}
            </div>
            <div className="col-span-1 md:col-span-2">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Description
              </h5>
              <p className="text-sm">{data.description || 'Not specified'}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Capabilities
              </h5>
              {data.capabilities && data.capabilities.length > 0 ? <ul className="text-sm space-y-1 list-disc pl-5">
                  {data.capabilities.map((capability, index) => <li key={index}>{capability}</li>)}
                </ul> : <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  No capabilities specified
                </p>}
            </div>
          </div>
          {/* Knowledge Sources Section */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <BookIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Knowledge Sources
              </h5>
            </div>
            {data.knowledgeSources && data.knowledgeSources.length > 0 ? <div className="flex flex-wrap gap-2">
                {data.knowledgeSources.map(source => <span key={source.id} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {source.name}
                  </span>)}
              </div> : <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No knowledge sources connected
              </p>}
          </div>
          {/* Connectors Section */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <LinkIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Connectors
              </h5>
            </div>
            {data.connectors && data.connectors.length > 0 ? <div className="flex flex-wrap gap-2">
                {data.connectors.map(connector => <span key={connector.id} className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                    {connector.name}
                  </span>)}
              </div> : <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No connectors configured
              </p>}
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Model Configuration
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Base Model
                </span>
                <p className="text-sm font-medium">{data.baseModel}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Temperature
                </span>
                <p className="text-sm font-medium">{data.temperature}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Max Tokens
                </span>
                <p className="text-sm font-medium">{data.maxTokens}</p>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              System Prompt
            </h5>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md text-sm">
              <pre className="whitespace-pre-wrap">
                {data.systemPrompt || 'Not specified'}
              </pre>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Testing Status
            </h5>
            {testCompleted ? <div className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                <span>Agent tested successfully</span>
              </div> : <div className="flex items-center text-amber-600 dark:text-amber-400">
                <AlertCircleIcon className="h-5 w-5 mr-2" />
                <span>Agent not tested yet (recommended but optional)</span>
              </div>}
          </div>
        </div>
      </div>
      {data.approvalRequired && <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ClockIcon className="h-5 w-5 text-amber-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Approval Required
              </h3>
              <div className="mt-2 text-sm text-amber-700 dark:text-amber-400">
                <p>
                  This agent will require approval from a manager before it can
                  be used in workflows. You'll be notified once it's approved.
                </p>
              </div>
            </div>
          </div>
        </div>}
      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
          Back
        </button>
        <button type="button" onClick={onSave} disabled={!isComplete} className={`px-4 py-2 rounded-md ${isComplete ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}`}>
          Create Agent
        </button>
      </div>
    </div>;
};