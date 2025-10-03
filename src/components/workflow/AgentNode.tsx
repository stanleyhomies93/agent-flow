import '@xyflow/react/dist/style.css';
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { BrainCircuitIcon } from 'lucide-react';
export const AgentNode = ({
  data
}) => {
  return <div className="min-w-[200px] bg-white dark:bg-gray-800 border-2 border-indigo-500 dark:border-indigo-400 rounded-lg shadow-md">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-indigo-500" />
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
        <BrainCircuitIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
        <div className="font-medium">{data.label}</div>
      </div>
      <div className="px-4 py-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {data.description}
        </div>
        <div className="mt-2 inline-block px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
          {data.agentType}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-indigo-500" />
    </div>;
};