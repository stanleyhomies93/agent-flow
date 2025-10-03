import '@xyflow/react/dist/style.css';
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { ZapIcon } from 'lucide-react';
export const TriggerNode = ({
  data
}) => {
  return <div className="min-w-[200px] bg-white dark:bg-gray-800 border-2 border-amber-500 dark:border-amber-400 rounded-lg shadow-md">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
        <ZapIcon className="w-5 h-5 text-amber-500 dark:text-amber-400" />
        <div className="font-medium">{data.label}</div>
      </div>
      <div className="px-4 py-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {data.description}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-amber-500" />
    </div>;
};