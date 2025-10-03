import React, { useState, useRef } from 'react';
import { XIcon, UploadIcon, ImageIcon, RefreshCwIcon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
export const TestImageRecognizerModal = ({
  agent,
  onClose
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recognitionResults, setRecognitionResults] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const handleUrlChange = e => {
    setImageUrl(e.target.value);
    // Clear any previous results
    setRecognitionResults(null);
    setError(null);
    setUploadedImage(null);
  };
  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      // Clear any previous URL input
      setImageUrl('');
      setRecognitionResults(null);
      setError(null);
      // Create a URL for the uploaded image
      const imageObjectUrl = URL.createObjectURL(file);
      setUploadedImage({
        file,
        url: imageObjectUrl,
        name: file.name
      });
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  const handleRecognize = async () => {
    // Validate that we have either a URL or an uploaded image
    if (!imageUrl && !uploadedImage) {
      setError('Please provide an image URL or upload an image');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, we would call an API here
      // For now, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Simulate recognition results based on which image we're using
      const isUrl = !!imageUrl;
      const mockResults = generateMockResults(isUrl ? imageUrl : uploadedImage.name);
      setRecognitionResults(mockResults);
    } catch (err) {
      setError('An error occurred during image recognition. Please try again.');
      console.error('Recognition error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const generateMockResults = imageSource => {
    // Generate different mock results based on image source to make it more realistic
    // In a real app, this would come from the AI model
    // Check if the image might contain certain objects based on keywords in the URL or filename
    const source = imageSource.toLowerCase();
    if (source.includes('cat') || source.includes('kitten')) {
      return {
        objects: [{
          label: 'Cat',
          confidence: 0.98
        }, {
          label: 'Domestic animal',
          confidence: 0.95
        }, {
          label: 'Whiskers',
          confidence: 0.92
        }, {
          label: 'Mammal',
          confidence: 0.99
        }],
        scene: 'Indoor',
        colors: ['Orange', 'White', 'Black'],
        summary: 'A domestic cat, likely a tabby, in an indoor setting.'
      };
    } else if (source.includes('dog') || source.includes('puppy')) {
      return {
        objects: [{
          label: 'Dog',
          confidence: 0.97
        }, {
          label: 'Domestic animal',
          confidence: 0.96
        }, {
          label: 'Canine',
          confidence: 0.99
        }, {
          label: 'Mammal',
          confidence: 0.99
        }],
        scene: 'Outdoor',
        colors: ['Brown', 'White'],
        summary: 'A dog, possibly a mixed breed, in an outdoor environment.'
      };
    } else if (source.includes('car') || source.includes('vehicle')) {
      return {
        objects: [{
          label: 'Car',
          confidence: 0.99
        }, {
          label: 'Vehicle',
          confidence: 0.99
        }, {
          label: 'Wheel',
          confidence: 0.95
        }, {
          label: 'Headlight',
          confidence: 0.92
        }],
        scene: 'Outdoor',
        colors: ['Red', 'Black', 'Silver'],
        summary: 'A car, likely sedan or hatchback, parked on a street.'
      };
    } else if (source.includes('food') || source.includes('meal') || source.includes('dish')) {
      return {
        objects: [{
          label: 'Food',
          confidence: 0.99
        }, {
          label: 'Plate',
          confidence: 0.94
        }, {
          label: 'Vegetable',
          confidence: 0.87
        }, {
          label: 'Protein',
          confidence: 0.85
        }],
        scene: 'Indoor',
        colors: ['White', 'Green', 'Brown'],
        summary: 'A prepared meal on a plate, likely containing vegetables and protein.'
      };
    } else {
      // Default generic response
      return {
        objects: [{
          label: 'Person',
          confidence: 0.93
        }, {
          label: 'Building',
          confidence: 0.87
        }, {
          label: 'Tree',
          confidence: 0.82
        }, {
          label: 'Sky',
          confidence: 0.96
        }],
        scene: 'Outdoor',
        colors: ['Blue', 'Green', 'Gray'],
        summary: 'An outdoor scene with a person near a building and trees.'
      };
    }
  };
  const formatConfidence = confidence => {
    return (confidence * 100).toFixed(1) + '%';
  };
  return <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold">Test {agent.name}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <XIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">
                Upload an image or provide a URL
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                The {agent.name} will analyze the image and identify objects,
                scenes, and other elements.
              </p>
              {/* Image URL input */}
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <input id="imageUrl" type="text" value={imageUrl} onChange={handleUrlChange} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700" disabled={isLoading || uploadedImage !== null} />
              </div>
              {/* Upload divider */}
              <div className="relative flex items-center my-4">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              {/* File upload button */}
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30" onClick={triggerFileInput}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={isLoading || imageUrl !== ''} />
                <UploadIcon className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click to upload an image or drag and drop
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              {/* Display uploaded image */}
              {uploadedImage && <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Uploaded Image</span>
                    <button className="text-red-500 hover:text-red-700 text-sm" onClick={() => {
                  setUploadedImage(null);
                  setRecognitionResults(null);
                }}>
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 overflow-hidden rounded-md mr-3">
                      <img src={uploadedImage.url} alt="Uploaded" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{uploadedImage.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(uploadedImage.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                </div>}
              {/* Display image from URL */}
              {imageUrl && <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Image from URL</span>
                    <button className="text-red-500 hover:text-red-700 text-sm" onClick={() => {
                  setImageUrl('');
                  setRecognitionResults(null);
                }}>
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 overflow-hidden rounded-md mr-3 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{imageUrl}</p>
                    </div>
                  </div>
                </div>}
              {/* Error message */}
              {error && <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-red-700 dark:text-red-400 text-sm flex items-center">
                  <AlertCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </div>}
              {/* Recognize button */}
              <div className="mt-6 flex justify-center">
                <button onClick={handleRecognize} disabled={isLoading || !imageUrl && !uploadedImage} className={`px-4 py-2 rounded-md flex items-center space-x-2 ${isLoading || !imageUrl && !uploadedImage ? 'bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                  {isLoading ? <>
                      <RefreshCwIcon className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </> : <>
                      <ImageIcon className="h-5 w-5" />
                      <span>Recognize Image</span>
                    </>}
                </button>
              </div>
            </div>
            {/* Results section */}
            {recognitionResults && <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-green-50 dark:bg-green-900/20 px-4 py-3 border-b border-green-200 dark:border-green-800 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium text-green-700 dark:text-green-400">
                    Recognition Complete
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-medium mb-4">
                    Recognition Results
                  </h4>
                  <div className="space-y-6">
                    {/* Objects detected */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Objects Detected
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {recognitionResults.objects.map((object, index) => <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                            <span>{object.label}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {formatConfidence(object.confidence)}
                            </span>
                          </div>)}
                      </div>
                    </div>
                    {/* Scene and colors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                          Scene Type
                        </h5>
                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          {recognitionResults.scene}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                          Dominant Colors
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {recognitionResults.colors.map((color, index) => <span key={index} className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-sm rounded-md">
                              {color}
                            </span>)}
                        </div>
                      </div>
                    </div>
                    {/* Summary */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Image Summary
                      </h5>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                        {recognitionResults.summary}
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
        </div>
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
            Close
          </button>
        </div>
      </div>
    </div>;
};