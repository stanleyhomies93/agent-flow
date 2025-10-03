import React, { useEffect, useState, useRef } from 'react';
import { XIcon, SendIcon, RefreshCwIcon, TrashIcon, DownloadIcon } from 'lucide-react';
export const ChatWithAgentModal = ({
  agent,
  onClose
}) => {
  const [messages, setMessages] = useState([{
    id: 1,
    role: 'system',
    content: 'Conversation started. How can I help you today?',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // Focus input field when modal opens
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!input.trim()) return;
    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    // Simulate agent response after a delay
    setTimeout(() => {
      const agentResponse = getAgentResponse(input, agent);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: agentResponse,
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }, 1500);
  };
  const getAgentResponse = (userInput, agent) => {
    // In a real app, this would call an API to get a response from the agent
    // For now, we'll simulate different responses based on agent type and user input
    const input = userInput.toLowerCase();
    if (agent.name === 'Customer Support Bot') {
      if (input.includes('refund') || input.includes('return')) {
        return "I understand you're interested in a refund. Our return policy allows returns within 30 days of purchase. Would you like me to help you initiate a return?";
      } else if (input.includes('order') || input.includes('shipping')) {
        return 'I can help you track your order. Could you please provide your order number? It should be in your confirmation email.';
      } else if (input.includes('password') || input.includes('login')) {
        return "If you're having trouble logging in, I can help you reset your password. Would you like me to send a password reset link to your email?";
      } else {
        return 'Thank you for contacting customer support. How can I assist you with your question today?';
      }
    } else {
      // Generic conversation responses
      if (input.includes('hello') || input.includes('hi')) {
        return `Hello! I'm ${agent.name}, a ${agent.type} agent. How can I assist you today?`;
      } else if (input.includes('help')) {
        return `I'd be happy to help. I can ${agent.description.toLowerCase()}. What specifically do you need assistance with?`;
      } else if (input.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with today?";
      } else if (input.includes('bye') || input.includes('goodbye')) {
        return 'Thank you for chatting with me today. Feel free to come back if you have more questions!';
      } else {
        return `I've processed your message. As a ${agent.type} agent, I'm designed to ${agent.description.toLowerCase()}. Can you provide more details about what you need?`;
      }
    }
  };
  const clearConversation = () => {
    setMessages([{
      id: Date.now(),
      role: 'system',
      content: 'Conversation cleared. How can I help you today?',
      timestamp: new Date()
    }]);
  };
  const formatTime = date => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold">Chat with {agent.name}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-lg ${message.role === 'user' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100' : message.role === 'system' ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 italic' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200'}`}>
                <div className="text-sm">{message.content}</div>
                <div className="text-xs text-right mt-1 opacity-70">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>)}
          {isLoading && <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2">
                  <RefreshCwIcon className="h-4 w-4 text-gray-400 animate-spin" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {agent.name} is typing...
                  </span>
                </div>
              </div>
            </div>}
          <div ref={messagesEndRef} />
        </div>
        {/* Actions bar */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex space-x-2">
            <button onClick={clearConversation} className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" title="Clear conversation">
              <TrashIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" title="Download conversation">
              <DownloadIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {agent.type} · {agent.category}
          </div>
        </div>
        {/* Input area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" disabled={isLoading} />
            <button type="submit" disabled={!input.trim() || isLoading} className={`p-2 rounded-md ${!input.trim() || isLoading ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
              <SendIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>;
};