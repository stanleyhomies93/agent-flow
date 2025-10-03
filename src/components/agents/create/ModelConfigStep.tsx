import React from 'react';
import { HelpCircleIcon } from 'lucide-react';
export const ModelConfigStep = ({
  data,
  updateData,
  onNext,
  onBack
}) => {
  return <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Model Configuration</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Configure the AI model settings for your agent.
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="baseModel" className="block text-sm font-medium mb-1">
            Base Model
          </label>
          <select id="baseModel" value={data.baseModel} onChange={e => updateData({
          baseModel: e.target.value
        })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700">
            <option value="gpt-4">GPT-4 (Most capable)</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
            <option value="claude-2">Claude 2</option>
            <option value="llama-2">Llama 2</option>
            <option value="mistral-7b">Mistral 7B</option>
            <option value="palm-2">PaLM 2</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="temperature" className="block text-sm font-medium mb-1">
                Temperature: {data.temperature}
              </label>
              <button type="button" className="inline-flex text-gray-500 hover:text-gray-700" title="Controls randomness: lower values are more deterministic, higher values more creative">
                <HelpCircleIcon className="h-4 w-4" />
              </button>
            </div>
            <input id="temperature" type="range" min="0" max="2" step="0.1" value={data.temperature} onChange={e => updateData({
            temperature: parseFloat(e.target.value)
          })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Precise</span>
              <span>Balanced</span>
              <span>Creative</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="maxTokens" className="block text-sm font-medium mb-1">
                Max Tokens: {data.maxTokens}
              </label>
              <button type="button" className="inline-flex text-gray-500 hover:text-gray-700" title="Maximum length of the model's output">
                <HelpCircleIcon className="h-4 w-4" />
              </button>
            </div>
            <input id="maxTokens" type="range" min="256" max="4096" step="256" value={data.maxTokens} onChange={e => updateData({
            maxTokens: parseInt(e.target.value)
          })} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Shorter</span>
              <span>Medium</span>
              <span>Longer</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="systemPrompt" className="block text-sm font-medium mb-1">
              System Prompt
            </label>
            <button type="button" className="inline-flex text-gray-500 hover:text-gray-700" title="Instructions that define how the AI behaves">
              <HelpCircleIcon className="h-4 w-4" />
            </button>
          </div>
          <textarea id="systemPrompt" value={data.systemPrompt} onChange={e => updateData({
          systemPrompt: e.target.value
        })} rows={5} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700" placeholder="Instructions for the AI model..." />
          <p className="mt-1 text-xs text-gray-500">
            This prompt guides the model's behavior. Be specific about the
            agent's role, tone, and limitations.
          </p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4">
          <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-2">
            Model Cost Considerations
          </h4>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            More powerful models and higher token limits increase costs. For
            this agent with the current settings, estimated cost per 1,000 runs:{' '}
            <span className="font-medium">$2.50 - $5.00</span>
          </p>
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