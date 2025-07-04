import React from 'react';
import { Shield, Eye, Globe, Lock, AlertTriangle } from 'lucide-react';

interface ScanProgressProps {
  progress: number;
  currentStep: string;
}

const ScanProgress: React.FC<ScanProgressProps> = ({ progress, currentStep }) => {
  const steps = [
    { id: 'analyzing', name: 'Analyzing URL', icon: Eye },
    { id: 'domain', name: 'Checking Domain', icon: Globe },
    { id: 'security', name: 'Security Scan', icon: Lock },
    { id: 'threats', name: 'Threat Detection', icon: AlertTriangle },
    { id: 'complete', name: 'Generating Report', icon: Shield }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Scanning in Progress
        </h2>
        <p className="text-gray-600">
          Analyzing URL for security threats and vulnerabilities
        </p>
      </div>

      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-2 text-sm font-medium text-gray-700">
            {progress}% Complete
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            
            return (
              <div key={step.id} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isActive 
                      ? 'bg-blue-500 text-white animate-pulse' 
                      : 'bg-gray-200 text-gray-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`font-medium ${
                  isActive 
                    ? 'text-blue-600' 
                    : isCompleted 
                      ? 'text-green-600' 
                      : 'text-gray-400'
                }`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            This process typically takes 2-4 seconds to complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanProgress;