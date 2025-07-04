import React, { useState } from 'react';
import Header from './components/Header';
import URLInput from './components/URLInput';
import ScanProgress from './components/ScanProgress';
import ScanResults from './components/ScanResults';
import { ScanResult, SecurityCheck } from './types';
import { analyzeUrl, performSecurityChecks } from './utils/securityAnalyzer';
import { isValidUrl } from './utils/urlValidator';

type AppState = 'input' | 'scanning' | 'results';

function App() {
  const [state, setState] = useState<AppState>('input');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([]);
  const [error, setError] = useState<string>('');
  const [scanProgress, setScanProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const handleScan = async (url: string) => {
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    setError('');
    setState('scanning');
    setScanProgress(0);
    setCurrentStep('analyzing');

    // Simulate scanning progress
    const steps = [
      { id: 'analyzing', duration: 500 },
      { id: 'domain', duration: 800 },
      { id: 'security', duration: 600 },
      { id: 'threats', duration: 700 },
      { id: 'complete', duration: 400 }
    ];

    let progress = 0;
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    
    for (const step of steps) {
      setCurrentStep(step.id);
      
      // Animate progress for this step
      const stepProgress = (step.duration / totalDuration) * 100;
      const startProgress = progress;
      const endProgress = progress + stepProgress;
      
      const animationDuration = step.duration;
      const stepInterval = 50; // Update every 50ms
      const steps = animationDuration / stepInterval;
      const progressIncrement = (endProgress - startProgress) / steps;
      
      for (let i = 0; i < steps; i++) {
        await new Promise(resolve => setTimeout(resolve, stepInterval));
        progress += progressIncrement;
        setScanProgress(Math.min(100, progress));
      }
    }

    try {
      const [result, checks] = await Promise.all([
        analyzeUrl(url),
        Promise.resolve(performSecurityChecks(url))
      ]);

      setScanResult(result);
      setSecurityChecks(checks);
      setState('results');
    } catch (err) {
      setError('Failed to scan URL. Please try again.');
      setState('input');
    }
  };

  const handleNewScan = () => {
    setState('input');
    setScanResult(null);
    setSecurityChecks([]);
    setError('');
    setScanProgress(0);
    setCurrentStep('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header scanResult={scanResult} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state === 'input' && (
          <URLInput
            onScan={handleScan}
            isScanning={false}
            error={error}
          />
        )}

        {state === 'scanning' && (
          <ScanProgress
            progress={scanProgress}
            currentStep={currentStep}
          />
        )}

        {state === 'results' && scanResult && (
          <ScanResults
            result={scanResult}
            securityChecks={securityChecks}
            onNewScan={handleNewScan}
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Protect yourself from phishing, malware, and other online threats
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span>🔒 Secure scanning</span>
              <span>⚡ Real-time analysis</span>
              <span>🛡️ Comprehensive protection</span>
              <span>📊 Detailed reporting</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;