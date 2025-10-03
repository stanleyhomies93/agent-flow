import React, { useState } from 'react';
import { PlayIcon, RotateCwIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from 'lucide-react';
export const TestStep = ({
  data,
  updateData,
  onNext,
  onBack
}) => {
  const [testInput, setTestInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testStatus, setTestStatus] = useState(null); // null, 'running', 'success', 'error'
  const [testResponse, setTestResponse] = useState('');
  const runTest = () => {
    if (!testInput.trim()) return;
    setIsRunning(true);
    setTestStatus('running');
    // Simulate API call with timeout
    setTimeout(() => {
      // This is a mock response - in a real app, this would come from the API
      let mockResponse;
      if (data.type === 'Classification') {
        mockResponse = {
          classification: 'High Priority',
          confidence: 0.89,
          reasoning: 'The message contains urgent language and is from a key stakeholder.'
        };
      } else if (data.type === 'Generation') {
        mockResponse = 'Thank you for your inquiry. Based on the information provided, I can help you resolve this issue. Please provide the following additional details so I can assist you better...';
      } else {
        mockResponse = 'Test completed successfully. The agent processed the input as expected.';
      }
      setTestResponse(JSON.stringify(mockResponse, null, 2));
      setTestStatus('success');
      setIsRunning(false);
      // Update the parent component with test results
      updateData({
        testResults: {
          input: testInput,
          output: mockResponse,
          status: 'success'
        }
      });
    }, 2000);
  };
  return <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Test Your Agent</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Try out your agent with sample inputs to ensure it works as expected.
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="testInput" className="block text-sm font-medium mb-1">
            Test Input
          </label>
          <textarea id="testInput" value={testInput} onChange={e => setTestInput(e.target.value)} rows={4} disabled={isRunning} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder={data.type === 'Classification' ? 'Enter text to classify...' : data.type === 'Generation' ? 'Enter a prompt for text generation...' : 'Enter sample input to test your agent...'} />
        </div>
        <div className="flex justify-center">
          <button type="button" onClick={runTest} disabled={isRunning || !testInput.trim()} className={`px-4 py-2 rounded-md flex items-center space-x-2 ${isRunning ? 'bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
            {isRunning ? <>
                <RotateCwIcon className="h-5 w-5 animate-spin" />
                <span>Running Test...</span>
              </> : <>
                <PlayIcon className="h-5 w-5" />
                <span>Run Test</span>
              </>}
          </button>
        </div>
        {testStatus && <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className={`px-4 py-3 flex items-center ${testStatus === 'running' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : testStatus === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
              {testStatus === 'running' ? <>
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span>Processing your request...</span>
                </> : testStatus === 'success' ? <>
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  <span>Test completed successfully</span>
                </> : <>
                  <XCircleIcon className="h-5 w-5 mr-2" />
                  <span>Test failed</span>
                </>}
            </div>
            {testStatus === 'success' && <div className="p-4">
                <h4 className="text-sm font-medium mb-2">Agent Response:</h4>
                <pre className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md overflow-auto text-sm">
                  {testResponse}
                </pre>
              </div>}
          </div>}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
          <h4 className="text-sm font-medium mb-2">Testing Tips</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc pl-5">
            <li>
              Try different types of inputs to ensure your agent handles them
              correctly
            </li>
            <li>
              Test edge cases and potential errors to make your agent more
              robust
            </li>
            <li>
              For classification agents, try inputs that should result in
              different categories
            </li>
            <li>
              For generation agents, vary the length and complexity of prompts
            </li>
          </ul>
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