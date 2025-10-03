import React from 'react';
import { InfoIcon } from 'lucide-react';
export const BasicInfoStep = ({
  data,
  updateData,
  onNext
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    onNext();
  };
  // List of departments for the dropdown
  const departments = ['Customer Support', 'Sales', 'Marketing', 'Finance', 'Legal', 'Product', 'Engineering', 'Research', 'Human Resources', 'Operations', 'General'];
  return <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Basic Information</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Provide the essential details about your agent.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Agent Name <span className="text-red-500">*</span>
          </label>
          <input id="name" type="text" required value={data.name} onChange={e => updateData({
          name: e.target.value
        })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="e.g. Email Classifier" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea id="description" required value={data.description} onChange={e => updateData({
          description: e.target.value
        })} rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="Describe what your agent does and its purpose..." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select id="category" required value={data.category} onChange={e => updateData({
            category: e.target.value
          })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700">
              <option value="Text">Text</option>
              <option value="Vision">Vision</option>
              <option value="Chat">Chat</option>
              <option value="Data">Data</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-1">
              Agent Type <span className="text-red-500">*</span>
            </label>
            <select id="type" required value={data.type} onChange={e => updateData({
            type: e.target.value
          })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700">
              <option value="Classification">Classification</option>
              <option value="Generation">Generation</option>
              <option value="Analysis">Analysis</option>
              <option value="Summarization">Summarization</option>
              <option value="Conversation">Conversation</option>
              <option value="Recognition">Recognition</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="department" className="block text-sm font-medium mb-1">
              Department <span className="text-red-500">*</span>
            </label>
            <select id="department" required value={data.department || ''} onChange={e => updateData({
            department: e.target.value
          })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700">
              <option value="" disabled>
                Select department...
              </option>
              {departments.map(dept => <option key={dept} value={dept}>
                  {dept}
                </option>)}
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              The department that will primarily use this agent
            </p>
          </div>
          <div>
            <label htmlFor="approvalRequired" className="block text-sm font-medium mb-1">
              Approval Workflow
            </label>
            <select id="approvalRequired" value={data.approvalRequired ? 'yes' : 'no'} onChange={e => updateData({
            approvalRequired: e.target.value === 'yes',
            approvalStatus: e.target.value === 'yes' ? 'pending' : 'approved'
          })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700">
              <option value="yes">Requires approval</option>
              <option value="no">No approval needed</option>
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Whether this agent needs management approval before use
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <input id="private" type="checkbox" checked={data.isPrivate} onChange={e => updateData({
          isPrivate: e.target.checked
        })} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
          <label htmlFor="private" className="ml-2 block text-sm">
            Make this agent private (only visible to you)
          </label>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InfoIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                Tips for creating effective agents
              </h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Use clear, specific names and descriptions</li>
                  <li>Choose the most appropriate category and type</li>
                  <li>Consider making specialized agents for specific tasks</li>
                  <li>
                    Assign to the correct department for better organization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Continue
          </button>
        </div>
      </form>
    </div>;
};