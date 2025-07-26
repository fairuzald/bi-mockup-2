import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type AlertCategory =
  | 'Illegal Logging'
  | 'Illegal Mining'
  | 'Wildlife Trafficking'
  | 'Waste Trade'
  | 'Carbon Credit Fraud';
export type TransactionStatus =
  | 'Flagged'
  | 'Under Review'
  | 'Cleared'
  | 'Blocked';
export type AccountStatus = 'Active' | 'Suspicious' | 'Frozen' | 'Blocked';
export type ReportStatus = 'Draft' | 'Sent' | 'Acknowledged';
export type CaseStatus =
  | 'New'
  | 'Open'
  | 'Investigating'
  | 'Pending Review'
  | 'Closed';
export type Currency = 'IDR' | 'USD' | 'EUR' | 'SGD';

export type EntityInfo = {
  id: string;
  name: string;
  bank: string;
  type?: string;
  country: string;
};

export type SuspiciousTransaction = {
  id: string;
  timestamp: string;
  amount: number;
  currency: Currency;
  source: EntityInfo;
  destination: EntityInfo;
  riskScore: number;
  category: AlertCategory;
  reason: string;
  status: TransactionStatus;
  channel: 'SWIFT' | 'Mobile Banking' | 'ATM' | 'Cash Deposit' | 'Online'; // 'Online' ditambahkan
  device: { id: string; ip: string; location: string };
  previousTxId?: string;
};

export type SuspiciousAccount = {
  id: string;
  name: string;
  bank: string;
  riskScore: number;
  status: AccountStatus;
  balance: number;
  currency: Currency;
  transactionCount: { incoming: number; outgoing: number };
  lastActivity: string;
  type: 'Company' | 'Individual';
  kycLevel: 'Basic' | 'Enhanced' | 'Incomplete';
  openDate: string;
};

export type CaseFile = {
  id: string;
  title: string;
  priority: RiskLevel;
  status: CaseStatus;
  investigator: string;
  createdDate: string;
  lastUpdate: string;
  summary: string;
  potentialLoss: number;
  threatActors: string[];
  relatedTransactions: string[];
  relatedAccounts: string[];
  evidence: {
    id: string;
    name: string;
    type: 'Document' | 'Image' | 'STR';
    uploadedAt: string;
  }[];
  log: { timestamp: string; user: string; action: string; notes: string }[];
};

export type AccountDetail = SuspiciousAccount & {
  address: string;
  linkedEntities: {
    id: string;
    type: 'Device' | 'IP' | 'Related Account';
    relationship: string;
  }[];
  transactions: SuspiciousTransaction[];
};

export type ModelMetrics = {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
  modelVersion: string;
  lastTrained: string;
  featureImportance: { feature: string; importance: number }[];
  performanceOverTime: { date: string; accuracy: number; precision: number }[];
};

// PERBAIKAN D3: NetworkNode sekarang extends SimulationNodeDatum
export type NetworkNode = SimulationNodeDatum & {
  id: string;
  name: string;
  type: 'Company' | 'Individual' | 'Offshore';
  riskScore: number;
};

export type NetworkLink = SimulationLinkDatum<NetworkNode>;

export type CommunicationReport = {
  id: string;
  date: string;
  relatedCase: string;
  institution: string;
  subject: string;
  status: ReportStatus;
};
