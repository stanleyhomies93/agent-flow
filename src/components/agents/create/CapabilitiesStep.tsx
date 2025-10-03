import React, { useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
export const CapabilitiesStep = ({
  data,
  updateData,
  onNext,
  onBack
}) => {
  const [newCapability, setNewCapability] = useState('');
  const capabilities = data.capabilities || [];
  const handleAddCapability = () => {
    if (newCapability.trim() && !capabilities.includes(newCapability.trim())) {
      updateData({
        capabilities: [...capabilities, newCapability.trim()]
      });
      setNewCapability('');
    }
  };
  const handleRemoveCapability = index => {
    const updatedCapabilities = [...capabilities];
    updatedCapabilities.splice(index, 1);
    updateData({
      capabilities: updatedCapabilities
    });
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCapability();
    }
  };
  return <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Agent Capabilities</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Define what your agent can do and its limitations.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="capabilities" className="block text-sm font-medium mb-1">
            Add Capabilities
          </label>
          <div className="flex">
            <input id="capabilities" type="text" value={newCapability} onChange={e => setNewCapability(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="e.g. Can classify emails by priority" />
            <button type="button" onClick={handleAddCapability} className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700">
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Current Capabilities
          </label>
          {capabilities.length === 0 ? <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              No capabilities added yet. Add some capabilities to define what
              your agent can do.
            </div> : <ul className="space-y-2">
              {capabilities.map((capability, index) => <li key={index} className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <span className="text-sm">{capability}</span>
                  <button type="button" onClick={() => handleRemoveCapability(index)} className="text-gray-400 hover:text-red-500">
                    <XIcon className="h-4 w-4" />
                  </button>
                </li>)}
            </ul>}
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
          <h4 className="text-sm font-medium mb-2">Suggested Capabilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {['Can classify text by sentiment', 'Can summarize long documents', 'Can extract key information from text', 'Can translate between languages', 'Can generate creative content', 'Can answer questions based on context'].map((suggestion, index) => <button key={index} type="button" onClick={() => {
            if (!capabilities.includes(suggestion)) {
              updateData({
                capabilities: [...capabilities, suggestion]
              });
            }
          }} disabled={capabilities.includes(suggestion)} className={`text-left px-3 py-2 text-sm rounded-md border ${capabilities.includes(suggestion) ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400' : 'border-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600'}`}>
                {suggestion}
              </button>)}
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <button type="button" onClick={onBack} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
          Back
        </button>
        <button type="button" onClick={onNext} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Continue
        </button>
      </div>
    </div>;
};