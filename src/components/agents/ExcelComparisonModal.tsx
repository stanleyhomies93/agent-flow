import React, { useState, useRef } from 'react';
import { XIcon, UploadIcon, FileSpreadsheetIcon, TrashIcon, RefreshCwIcon, AlertCircleIcon, CheckCircleIcon, DownloadIcon, ClipboardIcon, BarChart2Icon, TableIcon, ArrowRightIcon, InfoIcon, HelpCircleIcon } from 'lucide-react';
export const ExcelComparisonModal = ({
  agent,
  onClose
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('discrepancies');
  const fileInputRef = useRef(null);
  const handleFileUpload = e => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    // Check if files are Excel files
    const invalidFiles = files.filter(file => !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv'));
    if (invalidFiles.length > 0) {
      alert('Please upload only Excel files (.xlsx, .xls) or CSV files.');
      return;
    }
    // Add files to state
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      type: file.type,
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };
  const removeFile = fileId => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    // Reset analysis if files are removed
    if (analysisResult) {
      setAnalysisResult(null);
    }
  };
  const analyzeFiles = () => {
    if (uploadedFiles.length < 2) {
      alert('Please upload at least 2 Excel files to compare.');
      return;
    }
    setIsAnalyzing(true);
    // Simulate analysis with a timeout
    setTimeout(() => {
      setAnalysisResult(generateMockAnalysis(uploadedFiles));
      setIsAnalyzing(false);
    }, 3000);
  };
  const clearAll = () => {
    setUploadedFiles([]);
    setAnalysisResult(null);
    setActiveTab('discrepancies');
  };
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Analysis copied to clipboard!');
    }, err => {
      console.error('Could not copy text: ', err);
    });
  };
  const generateMockAnalysis = files => {
    const fileNames = files.map(f => f.name);
    // Generate mock discrepancies based on file names
    const discrepancies = [{
      id: 1,
      type: 'Missing Rows',
      description: `${fileNames[0]} contains 143 rows while ${fileNames[1]} contains 139 rows`,
      severity: 'high',
      location: 'Rows 24, 56, 87, 112 are missing in the second file',
      suggestion: 'Check if rows were intentionally deleted or if data was filtered differently'
    }, {
      id: 2,
      type: 'Data Mismatch',
      description: 'Total values in column "Revenue" don\'t match between files',
      severity: 'high',
      location: `${fileNames[0]}: $1,245,678 vs ${fileNames[1]}: $1,195,430`,
      suggestion: 'Check for formula errors or missing entries in revenue calculations'
    }, {
      id: 3,
      type: 'Format Inconsistency',
      description: 'Date formats differ between files',
      severity: 'medium',
      location: `Column F in ${fileNames[0]} uses MM/DD/YYYY while ${fileNames[1]} uses DD/MM/YYYY`,
      suggestion: 'Standardize date formats to prevent calculation errors'
    }, {
      id: 4,
      type: 'Column Name Difference',
      description: 'Column headers have different naming conventions',
      severity: 'low',
      location: `"Total_Revenue" in ${fileNames[0]} vs "Revenue_Total" in ${fileNames[1]}`,
      suggestion: 'Standardize column naming for consistency'
    }, {
      id: 5,
      type: 'Formula Difference',
      description: 'Different formulas used for the same calculation',
      severity: 'medium',
      location: `"Profit Margin" calculation in ${fileNames[0]} uses different formula than in ${fileNames[1]}`,
      suggestion: 'Verify which formula is correct and standardize across files'
    }];
    // Generate mock summary
    const summary = `# Excel Comparison Analysis Summary
## Files Compared
- ${fileNames[0]} (Primary file)
- ${fileNames[1]} (Secondary file)
${files.length > 2 ? `- ${files.length - 2} additional file(s)` : ''}
## Key Findings
- **5 discrepancies** found between the files
- **2 high severity** issues that likely explain the data inconsistencies
- **Missing data** detected in the secondary file (4 rows missing)
- **Calculation differences** identified in revenue totals
- **Format inconsistencies** that may affect data interpretation
## Root Causes
The primary reasons for data discrepancies appear to be:
1. Missing rows in the secondary file
2. Different formulas used for calculating revenue totals
3. Inconsistent date formats causing calculation errors
## Recommendations
1. Reconcile the missing rows (24, 56, 87, 112) between files
2. Standardize the formula used for revenue calculations
3. Adopt a consistent date format across all files
4. Implement naming conventions for column headers
5. Consider using a template for future data entry`;
    // Generate mock patterns
    const patterns = [{
      id: 1,
      pattern: 'Systematic Row Deletion',
      description: 'The missing rows appear to follow a pattern - all related to Q3 transactions',
      impact: 'This explains the revenue discrepancy of approximately $50,000'
    }, {
      id: 2,
      pattern: 'Date-Related Calculations',
      description: 'Calculations involving dates show consistent errors due to format differences',
      impact: 'Affects all time-based analysis, particularly in growth calculations'
    }, {
      id: 3,
      pattern: 'Regional Data Inconsistency',
      description: 'European region data shows more discrepancies than other regions',
      impact: 'May indicate different regional reporting standards being applied'
    }];
    return {
      discrepancies,
      summary,
      patterns,
      timestamp: new Date().toISOString()
    };
  };
  const getSeverityBadge = severity => {
    switch (severity) {
      case 'high':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            High
          </span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            Medium
          </span>;
      case 'low':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            Low
          </span>;
      default:
        return null;
    }
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <TableIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{agent.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Compare Excel files to identify and analyze discrepancies
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        {!analysisResult ? <div className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                Upload Excel Files to Compare
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Upload two or more Excel files (.xlsx, .xls) or CSV files to
                identify discrepancies and analyze why data isn't tallying.
              </p>
              <div className="flex items-center space-x-3 mb-6">
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".xlsx,.xls,.csv" multiple />
                <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center space-x-2">
                  <UploadIcon className="h-4 w-4" />
                  <span>Upload Files</span>
                </button>
                {uploadedFiles.length > 0 && <button onClick={clearAll} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <TrashIcon className="h-4 w-4" />
                    <span>Clear All</span>
                  </button>}
                {uploadedFiles.length >= 2 && <button onClick={analyzeFiles} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2 ml-auto">
                    <BarChart2Icon className="h-4 w-4" />
                    <span>Analyze Discrepancies</span>
                  </button>}
              </div>
              {uploadedFiles.length > 0 ? <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-3">
                    Uploaded Files ({uploadedFiles.length})
                  </h4>
                  <div className="space-y-3">
                    {uploadedFiles.map((file, index) => <div key={file.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center">
                          <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg mr-3">
                            <FileSpreadsheetIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {file.size} MB •{' '}
                              {index === 0 ? 'Primary File' : `File ${index + 1}`}
                            </p>
                          </div>
                        </div>
                        <button onClick={() => removeFile(file.id)} className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>)}
                  </div>
                </div> : <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <FileSpreadsheetIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-2">
                    No files uploaded yet
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Upload at least two Excel files to compare
                  </p>
                  <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 inline-flex items-center space-x-2">
                    <UploadIcon className="h-4 w-4" />
                    <span>Select Files</span>
                  </button>
                </div>}
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start">
                <InfoIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                    How the Excel Comparison Works
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-disc ml-4">
                    <li>Upload two or more Excel files to compare</li>
                    <li>
                      The AI will analyze structural differences (missing rows,
                      columns)
                    </li>
                    <li>
                      Identify data inconsistencies and calculation
                      discrepancies
                    </li>
                    <li>Detect patterns in mismatched data</li>
                    <li>
                      Provide recommendations to reconcile the differences
                    </li>
                  </ul>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-2">
                    For best results, ensure your files have similar structures
                    and column names.
                  </p>
                </div>
              </div>
            </div>
          </div> : <div className="flex-1 overflow-auto">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex px-6 -mb-px">
                <button className={`mr-6 py-4 border-b-2 font-medium text-sm ${activeTab === 'discrepancies' ? 'border-orange-500 text-orange-600 dark:text-orange-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('discrepancies')}>
                  Discrepancies
                </button>
                <button className={`mr-6 py-4 border-b-2 font-medium text-sm ${activeTab === 'patterns' ? 'border-orange-500 text-orange-600 dark:text-orange-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('patterns')}>
                  Patterns
                </button>
                <button className={`mr-6 py-4 border-b-2 font-medium text-sm ${activeTab === 'summary' ? 'border-orange-500 text-orange-600 dark:text-orange-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'}`} onClick={() => setActiveTab('summary')}>
                  Summary
                </button>
              </div>
            </div>
            <div className="p-6">
              {activeTab === 'discrepancies' && <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      Identified Discrepancies
                    </h3>
                    <div className="flex space-x-2">
                      <button onClick={() => setAnalysisResult(null)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm flex items-center space-x-1">
                        <ArrowRightIcon className="h-4 w-4" />
                        <span>Back to Files</span>
                      </button>
                      <button onClick={() => copyToClipboard(JSON.stringify(analysisResult.discrepancies, null, 2))} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm flex items-center space-x-1">
                        <ClipboardIcon className="h-4 w-4" />
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {analysisResult.discrepancies.map(discrepancy => <div key={discrepancy.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{discrepancy.type}</h4>
                          {getSeverityBadge(discrepancy.severity)}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                          {discrepancy.description}
                        </p>
                        <div className="mt-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-medium">Location:</span>{' '}
                            {discrepancy.location}
                          </p>
                        </div>
                        <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                          <p className="text-sm text-blue-700 dark:text-blue-400">
                            <span className="font-medium">Suggestion:</span>{' '}
                            {discrepancy.suggestion}
                          </p>
                        </div>
                      </div>)}
                  </div>
                </div>}
              {activeTab === 'patterns' && <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Detected Patterns</h3>
                    <button onClick={() => copyToClipboard(JSON.stringify(analysisResult.patterns, null, 2))} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm flex items-center space-x-1">
                      <ClipboardIcon className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {analysisResult.patterns.map(pattern => <div key={pattern.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-medium">{pattern.pattern}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                          {pattern.description}
                        </p>
                        <div className="mt-3 bg-orange-50 dark:bg-orange-900/20 p-3 rounded-md">
                          <p className="text-sm text-orange-700 dark:text-orange-400">
                            <span className="font-medium">Impact:</span>{' '}
                            {pattern.impact}
                          </p>
                        </div>
                      </div>)}
                  </div>
                </div>}
              {activeTab === 'summary' && <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Analysis Summary</h3>
                    <div className="flex space-x-2">
                      <button onClick={() => copyToClipboard(analysisResult.summary)} className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm flex items-center space-x-1">
                        <ClipboardIcon className="h-4 w-4" />
                        <span>Copy</span>
                      </button>
                      <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm flex items-center space-x-1">
                        <DownloadIcon className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <div className="prose dark:prose-invert prose-sm max-w-none">
                      {analysisResult.summary.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={i} className="text-xl font-bold mt-1 mb-3">
                              {line.substring(2)}
                            </h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={i} className="text-lg font-semibold mt-4 mb-2">
                              {line.substring(3)}
                            </h2>;
                  } else if (line.startsWith('- ')) {
                    return <li key={i} className="ml-4">
                              {line.substring(2)}
                            </li>;
                  } else if (line.startsWith('**')) {
                    const content = line.replace(/\*\*/g, '');
                    return <strong key={i}>{content}</strong>;
                  } else if (line.match(/^\d+\./)) {
                    return <div key={i} className="ml-4 my-1">
                              {line}
                            </div>;
                  } else if (line === '') {
                    return <br key={i} />;
                  } else {
                    return <p key={i} className="my-1">
                              {line}
                            </p>;
                  }
                })}
                    </div>
                  </div>
                </div>}
            </div>
          </div>}
        {isAnalyzing && <div className="absolute inset-0 bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75 flex items-center justify-center z-10">
            <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-xl">
              <RefreshCwIcon className="h-10 w-10 text-orange-500 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Analyzing Excel Files
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Comparing files and identifying discrepancies...
              </p>
            </div>
          </div>}
      </div>
    </div>;
};