import React, { useState } from 'react';
import { Search, Link, AlertCircle } from 'lucide-react';

interface URLInputProps {
  onScan: (url: string) => void;
  isScanning: boolean;
  error?: string;
}

const URLInput: React.FC<URLInputProps> = ({ onScan, isScanning, error }) => {
  const [url, setUrl] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setInputError('Please enter a URL');
      return;
    }
    
    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
    if (!urlPattern.test(url.trim())) {
      setInputError('Please enter a valid URL');
      return;
    }
    
    setInputError('');
    onScan(url.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (inputError) setInputError('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Link className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Check URL Safety
        </h2>
        <p className="text-gray-600">
          Enter any URL to scan for phishing, malware, and other security threats
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={handleInputChange}
              placeholder="Enter URL (e.g., https://example.com)"
              className={`w-full px-4 py-4 pl-12 pr-32 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                inputError || error 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500'
              }`}
              disabled={isScanning}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <button
              type="submit"
              disabled={isScanning}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isScanning ? 'Scanning...' : 'Scan URL'}
            </button>
          </div>
          
          {(inputError || error) && (
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{inputError || error}</span>
            </div>
          )}
        </div>
      </form>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">What we check:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Phishing and malware patterns</li>
          <li>• Domain reputation and trustworthiness</li>
          <li>• SSL certificate and HTTPS security</li>
          <li>• Suspicious URL structure and redirects</li>
        </ul>
      </div>
    </div>
  );
};

export default URLInput;