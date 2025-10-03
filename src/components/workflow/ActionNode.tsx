import '@xyflow/react/dist/style.css';
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { PlayIcon } from 'lucide-react';
export const ActionNode = ({
  data
}) => {
  return <div className="min-w-[200px] bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-green-400 rounded-lg shadow-md">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-green-500" />
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
        <PlayIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
        <div className="font-medium">{data.label}</div>
      </div>
      <div className="px-4 py-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {data.description}
        </div>
      </div>
    </div>;
};