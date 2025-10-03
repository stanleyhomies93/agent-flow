import React, { useEffect, useState, useRef } from 'react';
import { XIcon, SendIcon, RefreshCwIcon, TrashIcon, DownloadIcon, UploadIcon, FileTextIcon, FileIcon, CheckCircleIcon, PlusIcon, ClipboardIcon, MessageSquareIcon, BoxIcon } from 'lucide-react';
export const DocumentChatModal = ({
  agent,
  onClose
}) => {
  const [messages, setMessages] = useState([{
    id: 1,
    role: 'system',
    content: `Welcome to ${agent.name}. Please upload a document to get started.`,
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [processingDocument, setProcessingDocument] = useState(false);
  const [documentSummary, setDocumentSummary] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // Focus input field when modal opens
  useEffect(() => {
    if (inputRef.current && uploadedDocument) {
      inputRef.current.focus();
    }
  }, [uploadedDocument]);
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
      const agentResponse = getAgentResponse(input, agent, documentSummary);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: agentResponse,
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }, 1500);
  };
  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    const fileType = file.type;
    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2); // in MB
    // Check if file type is supported
    if (!fileType.includes('pdf') && !fileType.includes('document') && !fileType.includes('text/plain') && !fileType.includes('sheet')) {
      alert('Please upload a PDF, Word document, or text file.');
      return;
    }
    // Check file size (max 10MB)
    if (fileSize > 10) {
      alert('File size should be less than 10MB.');
      return;
    }
    setUploadedDocument({
      name: fileName,
      type: fileType,
      size: fileSize
    });
    // Add message about document upload
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'user',
      content: `Uploaded document: ${fileName}`,
      timestamp: new Date(),
      isDocumentUpload: true
    }]);
    // Process document
    setProcessingDocument(true);
    // Simulate document processing
    setTimeout(() => {
      setProcessingDocument(false);
      // Generate document summary based on agent type
      const summary = generateDocumentSummary(agent, fileName);
      setDocumentSummary(summary);
      // Add agent response with document summary
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: summary,
        timestamp: new Date(),
        isDocumentSummary: true
      }]);
    }, 3000);
  };
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const getAgentResponse = (userInput, agent, documentSummary) => {
    // In a real app, this would call an API to get a response from the agent
    const input = userInput.toLowerCase();
    if (input.includes('key points') || input.includes('main points')) {
      return 'The key points from the document are:\n\n1. Revenue increased by 15% year-over-year\n2. New product launch exceeded expectations by 20%\n3. Market share grew in all regions except South America\n4. Cost reduction initiatives saved $2.3M\n5. The board approved a new sustainability initiative';
    } else if (input.includes('conclusion') || input.includes('summary')) {
      return "In conclusion, the document shows strong overall performance with positive growth indicators across most business areas. The financial outlook remains positive despite some challenges in specific markets. The strategic initiatives outlined are well-aligned with the company's long-term goals.";
    } else if (input.includes('recommendation') || input.includes('suggest')) {
      return 'Based on the document, I recommend:\n\n1. Increasing investment in the Asia-Pacific region where growth is strongest\n2. Addressing the declining performance in the South American market\n3. Accelerating the digital transformation initiatives mentioned on page 12\n4. Expanding the sustainability program to improve ESG ratings';
    } else if (input.includes('explain') || input.includes('clarify')) {
      return "The document discusses the company's financial and operational performance over the past fiscal year. It includes sections on revenue growth, market expansion, product development, and future outlook. The financial data shows positive trends in most areas, with some specific challenges in certain markets or product lines. The strategic section outlines the company's plans for continued growth and innovation.";
    } else if (input.includes('compare') || input.includes('difference')) {
      return "Comparing this year's results to last year:\n\n- Revenue: +15% (vs +8% last year)\n- Profit margin: 23% (vs 21% last year)\n- Market share: 18.5% (vs 16.2% last year)\n- Customer retention: 92% (vs 89% last year)\n- R&D spending: $45M (vs $38M last year)";
    } else {
      return `I've analyzed the document you uploaded. What specific information would you like to know about it? You can ask about key points, summaries, specific sections, or request clarification on any part of the content.`;
    }
  };
  const generateDocumentSummary = (agent, fileName) => {
    // In a real app, this would process the actual document content
    if (agent.name.includes('Annual Report')) {
      return `# Annual Report Summary: ${fileName}\n\n## Financial Highlights\n\n- **Revenue**: $245.8 million, up 15% year-over-year\n- **Gross Margin**: 68%, improved from 65% last year\n- **Operating Income**: $56.3 million, representing 23% of revenue\n- **Cash Flow**: $78.2 million from operations\n\n## Key Business Developments\n\n1. Successfully launched 3 new product lines generating $42M in new revenue\n2. Expanded into 5 new international markets\n3. Acquired CompanyX for $28M to strengthen our technology portfolio\n4. Implemented cost-saving initiatives resulting in $12M annual savings\n\n## Risk Factors\n\n- Increasing competition in European markets\n- Supply chain disruptions affecting production timelines\n- Regulatory changes in key markets\n\n## Outlook\n\nThe company projects 8-10% revenue growth for the next fiscal year with continued margin improvement. Strategic focus areas include digital transformation, sustainability initiatives, and further market expansion in Asia-Pacific region.\n\nI can provide more detailed information about specific sections. What would you like to know more about?`;
    } else if (agent.name.includes('PDF')) {
      return `# PDF Document Summary: ${fileName}\n\nThis document contains 24 pages covering the following main topics:\n\n## Main Topics\n\n1. Introduction to quantum computing principles\n2. Comparison of quantum vs. classical computing architectures\n3. Current state of quantum hardware development\n4. Potential applications in cryptography and optimization\n5. Challenges and limitations of current technology\n\n## Key Findings\n\n- Quantum computing shows promising results for specific problem domains\n- Error correction remains a significant technical challenge\n- Hybrid classical-quantum approaches show the most near-term potential\n- Industry investment has increased 250% in the past three years\n\n## Conclusion\n\nWhile quantum computing has made significant advances, practical applications remain limited to specialized use cases. The technology is expected to mature over the next 5-10 years.\n\nWhat specific aspects of this document would you like me to elaborate on?`;
    } else {
      return `# Document Summary: ${fileName}\n\n## Overview\n\nThis 15-page document outlines the company's strategic plan for the next fiscal year, focusing on market expansion, product development, and operational efficiency.\n\n## Key Sections\n\n1. **Executive Summary** (p.1-2): Outlines core objectives and expected outcomes\n2. **Market Analysis** (p.3-5): Evaluates current market position and competitive landscape\n3. **Strategic Initiatives** (p.6-10): Details specific projects and investments\n4. **Financial Projections** (p.11-13): Provides revenue and cost forecasts\n5. **Implementation Timeline** (p.14-15): Sets milestones and responsible teams\n\n## Critical Insights\n\n- The company aims to increase market share by 3-5% through targeted expansion\n- Three new product lines are scheduled for launch in Q2 and Q3\n- Cost reduction initiatives are expected to improve margins by 2 percentage points\n- Technology infrastructure upgrades will require $1.8M investment\n\nWhat specific information would you like me to provide about this document?`;
    }
  };
  const clearConversation = () => {
    setMessages([{
      id: Date.now(),
      role: 'system',
      content: `Welcome to ${agent.name}. Please upload a document to get started.`,
      timestamp: new Date()
    }]);
    setUploadedDocument(null);
    setDocumentSummary(null);
    setInput('');
  };
  const formatTime = date => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getDocumentIcon = () => {
    if (!uploadedDocument) return FileIcon;
    if (uploadedDocument.type.includes('pdf')) {
      return BoxIcon;
    } else if (uploadedDocument.type.includes('document') || uploadedDocument.type.includes('text')) {
      return FileTextIcon;
    } else {
      return FileIcon;
    }
  };
  const DocumentIcon = getDocumentIcon();
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Summary copied to clipboard!');
    }, err => {
      console.error('Could not copy text: ', err);
    });
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold">{agent.name}</h2>
            {uploadedDocument && <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <DocumentIcon className="h-4 w-4 mr-1" />
                <span className="truncate max-w-[200px]">
                  {uploadedDocument.name}
                </span>
                <span className="ml-1">({uploadedDocument.size} MB)</span>
              </div>}
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-2 rounded-lg ${message.role === 'user' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100' : message.role === 'system' ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 italic' : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200'}`}>
                {message.isDocumentUpload ? <div className="flex items-center">
                    <DocumentIcon className="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-400" />
                    <div className="text-sm">{message.content}</div>
                  </div> : message.isDocumentSummary ? <div>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center mb-2">
                        <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
                        <span className="font-medium">
                          Document Processed Successfully
                        </span>
                      </div>
                      <button onClick={() => copyToClipboard(message.content)} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title="Copy summary">
                        <ClipboardIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="prose dark:prose-invert prose-sm max-w-none">
                      {message.content.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={i} className="text-lg font-bold mt-1 mb-2">
                              {line.substring(2)}
                            </h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-base font-semibold mt-3 mb-1">
                              {line.substring(3)}
                            </h2>;
                  } else if (line.startsWith('- ')) {
                    return <li key={i} className="ml-4">
                              {line.substring(2)}
                            </li>;
                  } else if (line.startsWith('**')) {
                    const content = line.replace(/\*\*/g, '');
                    return <strong key={i}>{content}</strong>;
                  } else if (line === '') {
                    return <br key={i} />;
                  } else {
                    return <p key={i} className="my-1">
                              {line}
                            </p>;
                  }
                })}
                    </div>
                  </div> : <div className="text-sm whitespace-pre-line">
                    {message.content}
                  </div>}
                <div className="text-xs text-right mt-1 opacity-70">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>)}
          {processingDocument && <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2">
                  <RefreshCwIcon className="h-4 w-4 text-indigo-500 animate-spin" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Processing document...
                  </span>
                </div>
              </div>
            </div>}
          {isLoading && <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2">
                  <RefreshCwIcon className="h-4 w-4 text-gray-400 animate-spin" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {agent.name} is thinking...
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
        {!uploadedDocument ? <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.txt,.rtf,.xls,.xlsx" />
            <div className="text-center max-w-lg">
              <div className="mx-auto w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                <UploadIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                Upload a document to get started
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Upload a PDF, Word document, or text file to have {agent.name}{' '}
                analyze and summarize it for you.
              </p>
              <button onClick={handleUploadClick} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2 mx-auto">
                <UploadIcon className="h-4 w-4" />
                <span>Select Document</span>
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Supported formats: PDF, DOC, DOCX, TXT, RTF, XLS, XLSX (Max
                10MB)
              </p>
            </div>
          </div> : <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <button type="button" onClick={handleUploadClick} className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400" title="Upload a different document">
                <UploadIcon className="h-5 w-5" />
              </button>
              <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a question about the document..." className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700" disabled={isLoading || processingDocument} />
              <button type="submit" disabled={!input.trim() || isLoading || processingDocument} className={`p-2 rounded-md ${!input.trim() || isLoading || processingDocument ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                <SendIcon className="h-5 w-5" />
              </button>
            </div>
          </form>}
      </div>
    </div>;
};