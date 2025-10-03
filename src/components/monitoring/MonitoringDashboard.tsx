import React, { useState } from 'react';
import { BarChart3Icon, ListIcon, AlertTriangleIcon, RefreshCwIcon, FilterIcon, DownloadIcon } from 'lucide-react';
import { LogViewer } from './LogViewer';
export const MonitoringDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  return <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Monitoring & Logs</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track and analyze agent performance
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700">
            <RefreshCwIcon size={16} />
            <span>Refresh</span>
          </button>
          <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700">
            <FilterIcon size={16} />
            <span>Filter</span>
          </button>
          <button className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700">
            <DownloadIcon size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">Active Workflows</h3>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              12
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            4 currently running
          </p>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full" style={{
            width: '33%'
          }}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">Agent Executions</h3>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              1,254
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Today</p>
          <div className="mt-2 text-sm text-green-600 dark:text-green-400">
            ↑ 12% from yesterday
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">Errors</h3>
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              7
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Last 24 hours
          </p>
          <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
            <AlertTriangleIcon size={14} className="mr-1" />
            <span>3 require attention</span>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex -mb-px">
          <button className={`mr-6 py-2 border-b-2 font-medium text-sm flex items-center ${activeTab === 'overview' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('overview')}>
            <BarChart3Icon size={16} className="mr-2" />
            Overview
          </button>
          <button className={`mr-6 py-2 border-b-2 font-medium text-sm flex items-center ${activeTab === 'logs' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('logs')}>
            <ListIcon size={16} className="mr-2" />
            Logs
          </button>
          <button className={`mr-6 py-2 border-b-2 font-medium text-sm flex items-center ${activeTab === 'alerts' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('alerts')}>
            <AlertTriangleIcon size={16} className="mr-2" />
            Alerts
          </button>
        </nav>
      </div>
      {activeTab === 'logs' ? <LogViewer /> : <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="text-center py-10">
            <BarChart3Icon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">Performance Overview</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Visualizations and metrics for your AI workflow performance
            </p>
            <div className="mt-6 max-w-md mx-auto">
              <div className="grid grid-cols-3 gap-5 text-center">
                <div>
                  <p className="text-2xl font-bold">98.2%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Success Rate
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold">245ms</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Avg Response
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold">5,280</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Calls
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};