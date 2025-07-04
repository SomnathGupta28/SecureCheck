import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, ExternalLink, Info } from 'lucide-react';
import { ScanResult, SecurityCheck } from '../types';

interface ScanResultsProps {
  result: ScanResult;
  securityChecks: SecurityCheck[];
  onNewScan: () => void;
}

const ScanResults: React.FC<ScanResultsProps> = ({ result, securityChecks, onNewScan }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-50 border-green-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      case 'critical': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-8 h-8" />;
      case 'medium': return <AlertTriangle className="w-8 h-8" />;
      case 'high': return <AlertTriangle className="w-8 h-8" />;
      case 'critical': return <XCircle className="w-8 h-8" />;
      default: return <Shield className="w-8 h-8" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDuration = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getRiskDescription = (level: string) => {
    switch (level) {
      case 'low': return 'This URL appears to be safe to visit';
      case 'medium': return 'This URL shows some warning signs - proceed with caution';
      case 'high': return 'This URL has multiple risk factors - avoid if possible';
      case 'critical': return 'This URL is likely dangerous - do not visit';
      default: return 'Unknown risk level';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className={`bg-white rounded-2xl shadow-lg p-8 border ${getRiskBgColor(result.riskLevel)}`}>
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getRiskColor(result.riskLevel)}`}>
            {getRiskIcon(result.riskLevel)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Scan Complete
          </h2>
          <p className="text-gray-600 mb-4">
            {getRiskDescription(result.riskLevel)}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Scanned in {formatDuration(result.scanDuration)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ExternalLink className="w-4 h-4" />
              <span className="truncate max-w-xs">{result.url}</span>
            </div>
          </div>
        </div>

        {/* Risk Score */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Risk Score</span>
            <span className={`text-sm font-bold ${getRiskColor(result.riskLevel)}`}>
              {result.riskScore}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${
                result.riskLevel === 'low' ? 'bg-green-500' :
                result.riskLevel === 'medium' ? 'bg-yellow-500' :
                result.riskLevel === 'high' ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${result.riskScore}%` }}
            />
          </div>
        </div>

        {/* Threats */}
        {result.threats.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detected Threats</h3>
            <div className="space-y-3">
              {result.threats.map((threat, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-red-800">{threat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {result.recommendations.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-blue-800">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onNewScan}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Scan Another URL
        </button>
      </div>

      {/* Security Checks */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Security Checks</h3>
        <div className="space-y-4">
          {securityChecks.map((check, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200">
              {getStatusIcon(check.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{check.name}</h4>
                  <span className={`text-sm font-medium capitalize ${
                    check.status === 'passed' ? 'text-green-600' :
                    check.status === 'warning' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {check.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{check.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Stay Safe Online</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Red Flags to Watch For</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Urgent or threatening language</li>
              <li>• Requests for personal information</li>
              <li>• Suspicious domain names</li>
              <li>• Poor grammar or spelling</li>
              <li>• Unexpected attachments</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Best Practices</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Always verify the sender</li>
              <li>• Check URLs before clicking</li>
              <li>• Use secure HTTPS connections</li>
              <li>• Keep software updated</li>
              <li>• Trust your instincts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanResults;