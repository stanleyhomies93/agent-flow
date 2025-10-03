import React from 'react';
import { SearchIcon, AlertCircleIcon, InfoIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
export const LogViewer = () => {
  const logs = [{
    id: 1,
    timestamp: '2023-06-15T14:32:45Z',
    level: 'error',
    workflow: 'Email Processing',
    agent: 'Text Classifier',
    message: 'Failed to classify email: API rate limit exceeded'
  }, {
    id: 2,
    timestamp: '2023-06-15T14:30:22Z',
    level: 'info',
    workflow: 'Customer Onboarding',
    agent: 'Document Processor',
    message: 'Successfully processed customer documents'
  }, {
    id: 3,
    timestamp: '2023-06-15T14:28:10Z',
    level: 'warning',
    workflow: 'Email Processing',
    agent: 'Response Generator',
    message: 'Low confidence score (0.62) for generated response'
  }, {
    id: 4,
    timestamp: '2023-06-15T14:25:33Z',
    level: 'info',
    workflow: 'Customer Onboarding',
    agent: 'Identity Verification',
    message: 'Customer identity verified successfully'
  }, {
    id: 5,
    timestamp: '2023-06-15T14:22:18Z',
    level: 'info',
    workflow: 'Data Processing',
    agent: 'Data Transformer',
    message: 'Transformed 245 records successfully'
  }, {
    id: 6,
    timestamp: '2023-06-15T14:20:05Z',
    level: 'error',
    workflow: 'Data Processing',
    agent: 'Database Connector',
    message: 'Failed to connect to database: timeout after 30s'
  }];
  const getLevelIcon = level => {
    switch (level) {
      case 'error':
        return <AlertCircleIcon className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <ClockIcon className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <InfoIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  return <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input type="text" placeholder="Search logs..." className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/30">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Level
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Workflow
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Agent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {logs.map(log => <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatTimestamp(log.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getLevelIcon(log.level)}
                    <span className="ml-2 text-sm capitalize">{log.level}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {log.workflow}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {log.agent}
                </td>
                <td className="px-6 py-4 text-sm">{log.message}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};