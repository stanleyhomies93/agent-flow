import React from 'react';
import { XIcon, FileSpreadsheetIcon, UploadIcon, BarChart2Icon, AlertCircleIcon, CheckCircleIcon, ArrowRightIcon, ClipboardIcon, DownloadIcon, TableIcon, InfoIcon, FileIcon, PlusIcon, LayersIcon } from 'lucide-react';
export const HowToUseModal = ({
  agent,
  onClose
}) => {
  // For now, we'll only implement the Excel Comparison Agent how-to guide
  // In a real app, this would be dynamic based on the agent type
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <InfoIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                How to Use: {agent.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Step-by-step guide to comparing Excel files and analyzing
                discrepancies
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-2">Overview</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The Excel Comparison Analyst helps you identify and understand why
              data isn't tallying between different Excel files. It compares
              spreadsheets, finds discrepancies, analyzes patterns, and suggests
              potential fixes.
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <h4 className="text-sm font-medium text-orange-800 dark:text-orange-300 mb-2 flex items-center">
                <AlertCircleIcon className="h-4 w-4 mr-2" />
                When to Use This Agent
              </h4>
              <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1 list-disc ml-5">
                <li>
                  When financial reports from different sources don't match
                </li>
                <li>When reconciling data between systems</li>
                <li>When validating data migrations or exports</li>
                <li>When investigating calculation discrepancies</li>
                <li>When consolidating data from multiple sources</li>
              </ul>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Step-by-Step Guide</h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mr-4">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="text-md font-medium mb-2">
                    Prepare Your Excel Files
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Make sure your Excel files (.xlsx, .xls) or CSV files are
                    ready for comparison. For best results:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc ml-5 mb-3">
                    <li>Use similar column structures in all files</li>
                    <li>Ensure column headers are present</li>
                    <li>Remove any password protection</li>
                    <li>Save any unsaved changes</li>
                  </ul>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md flex items-center">
                    <FileSpreadsheetIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Supported formats: .xlsx, .xls, .csv
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mr-4">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="text-md font-medium mb-2">
                    Upload Files for Comparison
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Click the "Compare" button on the Excel Comparison Analyst
                    card, then upload at least two files.
                  </p>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-3">
                    <div className="flex items-center mb-3">
                      <button className="px-4 py-2 bg-orange-600 text-white rounded-md flex items-center space-x-2">
                        <UploadIcon className="h-4 w-4" />
                        <span>Upload Files</span>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      You can upload multiple files at once. The first file will
                      be considered the primary file for comparison.
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <InfoIcon className="h-4 w-4 mr-2" />
                    <span>
                      You need at least 2 files to perform a comparison
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mr-4">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="text-md font-medium mb-2">
                    Analyze Discrepancies
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Click the "Analyze Discrepancies" button to start the
                    comparison process.
                  </p>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-3">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2">
                      <BarChart2Icon className="h-4 w-4" />
                      <span>Analyze Discrepancies</span>
                    </button>
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      The AI will analyze your files and identify:
                      <ul className="list-disc ml-5 mt-1 space-y-1">
                        <li>Missing rows or columns</li>
                        <li>Data value mismatches</li>
                        <li>Formula differences</li>
                        <li>Format inconsistencies</li>
                        <li>Calculation errors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mr-4">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="text-md font-medium mb-2">Review Results</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Once analysis is complete, review the results in three tabs:
                  </p>
                  <div className="space-y-3 mb-3">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex items-center">
                        <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                        <h5 className="font-medium">Discrepancies</h5>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Detailed list of all identified differences between
                        files, with severity ratings and suggested fixes
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex items-center">
                        <TableIcon className="h-5 w-5 text-blue-500 mr-2" />
                        <h5 className="font-medium">Patterns</h5>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Identified patterns in the discrepancies that may
                        explain systematic issues
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                        <h5 className="font-medium">Summary</h5>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Overall analysis with key findings, root causes, and
                        recommendations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mr-4">
                  5
                </div>
                <div className="flex-1">
                  <h4 className="text-md font-medium mb-2">
                    Export or Copy Results
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    Save the analysis for reference or sharing:
                  </p>
                  <div className="flex space-x-3 mb-3">
                    <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm flex items-center space-x-1">
                      <ClipboardIcon className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm flex items-center space-x-1">
                      <DownloadIcon className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Using in Workflows</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You can add the Excel Comparison Analyst to your workflows for
              automated data reconciliation:
            </p>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-md font-medium mb-3">
                Sample Workflow: Automated Data Reconciliation
              </h4>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <FileIcon className="h-6 w-6 text-gray-500" />
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 mx-3" />
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <TableIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 mx-3" />
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <BarChart2Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 mx-3" />
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-start">
                  <span className="font-medium w-32">Step 1:</span>
                  <span>
                    File Trigger - When new Excel files are uploaded to a
                    specified location
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium w-32">Step 2:</span>
                  <span>
                    Excel Comparison - Automatically compare files to identify
                    discrepancies
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium w-32">Step 3:</span>
                  <span>
                    Data Analysis - Generate detailed report with findings and
                    recommendations
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium w-32">Step 4:</span>
                  <span>
                    Notification - Send results to relevant team members
                  </span>
                </div>
              </div>
              <div className="mt-4 flex">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2 mx-auto">
                  <PlusIcon className="h-4 w-4" />
                  <span>Add to Workflow</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Tips for Best Results</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>
                    Ensure all files have consistent column headers for more
                    accurate comparison
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>
                    For large files, consider focusing on specific sheets or
                    data ranges
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>
                    Standardize date formats across files before comparison
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>
                    Remove any filters or hidden rows/columns before uploading
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>
                    For financial data, ensure consistent decimal precision and
                    currency formats
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
            Close
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center space-x-2" onClick={() => {
          onClose();
          // In a real app, this would open the agent directly
        }}>
            <TableIcon className="h-4 w-4" />
            <span>Try It Now</span>
          </button>
        </div>
      </div>
    </div>;
};