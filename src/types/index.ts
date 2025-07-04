export interface ScanResult {
  url: string;
  isSecure: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number;
  threats: string[];
  recommendations: string[];
  scannedAt: Date;
  scanDuration: number;
}

export interface SecurityCheck {
  name: string;
  status: 'passed' | 'warning' | 'failed';
  description: string;
}