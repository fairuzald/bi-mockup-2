import type { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export type RiskLevel = string;
export type AlertCategory = string;
export type TransactionStatus = string;
export type AccountStatus = string;
export type ReportStatus = string;
export type CaseStatus = string;
export type Currency = string;

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
  channel: string;
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
  type: string;
  kycLevel: string;
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
    type: string;
    uploadedAt: string;
  }[];
  log: { timestamp: string; user: string; action: string; notes: string }[];
};

export type AccountDetail = SuspiciousAccount & {
  address: string;
  linkedEntities: {
    id: string;
    type: string;
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
  type: string;
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
