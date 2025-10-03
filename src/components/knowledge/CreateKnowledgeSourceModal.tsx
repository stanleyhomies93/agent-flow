import React, { useState } from 'react';
import { XIcon, UploadIcon, FileTextIcon, DatabaseIcon, GlobeIcon, BookIcon } from 'lucide-react';
export const CreateKnowledgeSourceModal = ({
  onClose,
  onCreateSource
}) => {
  const [step, setStep] = useState(1);
  const [sourceData, setSourceData] = useState({
    name: '',
    description: '',
    type: '',
    connection: {}
  });
  const sourceTypes = [{
    id: 'files',
    name: 'Document Collection',
    description: 'Upload PDFs, Word docs, or other files',
    icon: FileTextIcon,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  }, {
    id: 'text',
    name: 'Text Collection',
    description: 'Create a collection of text entries',
    icon: BookIcon,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  }, {
    id: 'database',
    name: 'Database',
    description: 'Connect to a database as a knowledge source',
    icon: DatabaseIcon,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  }, {
    id: 'website',
    name: 'Website',
    description: 'Crawl a website for information',
    icon: GlobeIcon,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20'
  }];
  const handleTypeSelect = typeId => {
    setSourceData({
      ...sourceData,
      type: typeId
    });
    setStep(2);
  };
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setSourceData({
      ...sourceData,
      [name]: value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onCreateSource({
      ...sourceData,
      id: `source-${Date.now()}`,
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    });
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium">
            {step === 1 ? 'Add Knowledge Source' : 'Configure Knowledge Source'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon size={20} />
          </button>
        </div>
        {step === 1 ? <div className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Select the type of knowledge source you want to add:
            </p>
            <div className="space-y-3">
              {sourceTypes.map(type => <button key={type.id} onClick={() => handleTypeSelect(type.id)} className={`w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${type.bgColor} hover:bg-opacity-70 transition-colors`}>
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
          </div> : <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Source Name <span className="text-red-500">*</span>
                </label>
                <input id="name" name="name" type="text" required value={sourceData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="e.g. Product Documentation" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea id="description" name="description" value={sourceData.description} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="Briefly describe this knowledge source..." />
              </div>
              {sourceData.type === 'files' && <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Drag and drop files, or click to browse
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Supports PDF, DOCX, TXT, CSV, and more
                    </p>
                  </div>
                  <input type="file" multiple className="hidden" id="file-upload" />
                  <button type="button" onClick={() => document.getElementById('file-upload').click()} className="mt-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Select Files
                  </button>
                </div>}
              {sourceData.type === 'website' && <div>
                  <label htmlFor="url" className="block text-sm font-medium mb-1">
                    Website URL <span className="text-red-500">*</span>
                  </label>
                  <input id="url" name="url" type="url" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="https://example.com" />
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center">
                      <input id="crawl-subpages" type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label htmlFor="crawl-subpages" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Crawl subpages
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="follow-links" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label htmlFor="follow-links" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Follow external links
                      </label>
                    </div>
                  </div>
                </div>}
              {sourceData.type === 'database' && <div className="space-y-3">
                  <div>
                    <label htmlFor="db-type" className="block text-sm font-medium mb-1">
                      Database Type <span className="text-red-500">*</span>
                    </label>
                    <select id="db-type" name="dbType" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700">
                      <option value="">Select database type...</option>
                      <option value="postgresql">PostgreSQL</option>
                      <option value="mysql">MySQL</option>
                      <option value="mongodb">MongoDB</option>
                      <option value="sqlserver">SQL Server</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="connection-string" className="block text-sm font-medium mb-1">
                      Connection String <span className="text-red-500">*</span>
                    </label>
                    <input id="connection-string" name="connectionString" type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="e.g. postgresql://user:password@localhost:5432/db" />
                  </div>
                </div>}
              {sourceData.type === 'text' && <div>
                  <label htmlFor="text-content" className="block text-sm font-medium mb-1">
                    Text Content <span className="text-red-500">*</span>
                  </label>
                  <textarea id="text-content" name="textContent" rows={6} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="Enter or paste text content here..." />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    You can also create structured entries later.
                  </p>
                </div>}
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" onClick={() => setStep(1)} className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                Back
              </button>
              <button type="submit" className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Create Source
              </button>
            </div>
          </form>}
      </div>
    </div>;
};