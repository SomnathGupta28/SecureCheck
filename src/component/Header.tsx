import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface HeaderProps {
  scanResult?: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    riskScore: number;
  };
}

const Header: React.FC<HeaderProps> = ({ scanResult }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-6 h-6" />;
      case 'medium': return <AlertTriangle className="w-6 h-6" />;
      case 'high': return <AlertTriangle className="w-6 h-6" />;
      case 'critical': return <XCircle className="w-6 h-6" />;
      default: return <Shield className="w-6 h-6" />;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SecureCheck</h1>
              <p className="text-sm text-gray-500">URL Security Scanner</p>
            </div>
          </div>
          
          {scanResult && (
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 ${getRiskColor(scanResult.riskLevel)}`}>
                {getRiskIcon(scanResult.riskLevel)}
                <span className="font-medium capitalize">{scanResult.riskLevel} Risk</span>
              </div>
              <div className="text-sm text-gray-500">
                Score: {scanResult.riskScore}/100
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;