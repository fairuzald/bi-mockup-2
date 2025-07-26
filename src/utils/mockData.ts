import type {
  AccountDetail,
  CaseFile,
  CommunicationReport,
  ModelMetrics,
  NetworkLink,
  NetworkNode,
  SuspiciousAccount,
  SuspiciousTransaction,
} from './types';

export const mockTransactions: SuspiciousTransaction[] = [
  {
    id: 'TXN-CHAIN-A',
    timestamp: '2024-05-22T08:00:00Z',
    amount: 500000000,
    currency: 'IDR',
    source: {
      id: 'ACC-MINING-CO',
      name: 'PT Tambang Ilegal',
      bank: 'Bank F',
      country: 'IDN',
    },
    destination: {
      id: 'ACC-LAWYER-A',
      name: 'Law Firm ABC',
      bank: 'Bank E',
      country: 'IDN',
    },
    riskScore: 85,
    category: 'Illegal Mining',
    reason: 'Initial placement from high-risk mining company to a legal firm.',
    status: 'Blocked',
    channel: 'SWIFT',
    device: { id: 'DEV-CHAIN', ip: '202.1.2.3', location: 'Kalimantan, ID' },
  },
  {
    id: 'TXN-CHAIN-B',
    timestamp: '2024-05-22T08:30:00Z',
    amount: 495000000,
    currency: 'IDR',
    source: {
      id: 'ACC-LAWYER-A',
      name: 'Law Firm ABC',
      bank: 'Bank E',
      country: 'IDN',
    },
    destination: {
      id: 'ACC-PROPERTY-DEV',
      name: 'Properti Megah Corp',
      bank: 'Bank G',
      country: 'IDN',
    },
    riskScore: 88,
    category: 'Illegal Mining',
    reason: 'Layering: Funds moved from legal firm to property developer.',
    status: 'Blocked',
    channel: 'SWIFT',
    device: { id: 'DEV-CHAIN', ip: '103.5.6.7', location: 'Jakarta, ID' },
    previousTxId: 'TXN-CHAIN-A',
  },
  {
    id: 'TXN-CHAIN-C',
    timestamp: '2024-05-22T09:00:00Z',
    amount: 490000000,
    currency: 'IDR',
    source: {
      id: 'ACC-PROPERTY-DEV',
      name: 'Properti Megah Corp',
      bank: 'Bank G',
      country: 'IDN',
    },
    destination: {
      id: 'ACC-SHELL-CYM',
      name: 'Verdant Holdings Ltd.',
      bank: 'Global Trust Bank',
      country: 'CYM',
    },
    riskScore: 96,
    category: 'Illegal Mining',
    reason: 'Layering: Funds moved to offshore shell company.',
    status: 'Blocked',
    channel: 'SWIFT',
    device: { id: 'DEV-CHAIN', ip: '103.5.6.7', location: 'Jakarta, ID' },
    previousTxId: 'TXN-CHAIN-B',
  },
  {
    id: 'TXN-CHAIN-D',
    timestamp: '2024-05-22T10:00:00Z',
    amount: 30000,
    currency: 'USD',
    source: {
      id: 'ACC-SHELL-CYM',
      name: 'Verdant Holdings Ltd.',
      bank: 'Global Trust Bank',
      country: 'CYM',
    },
    destination: {
      id: 'ACC-POL-Z',
      name: 'Politician Z',
      bank: 'Bank C',
      country: 'IDN',
    },
    riskScore: 99,
    category: 'Illegal Mining',
    reason: 'Integration: Payment to Politically Exposed Person (PEP).',
    status: 'Blocked',
    channel: 'SWIFT',
    device: { id: 'DEV-OFFSHORE', ip: '5.5.5.5', location: 'Cayman Islands' },
    previousTxId: 'TXN-CHAIN-C',
  },
  {
    id: 'TXN-GFC-001',
    timestamp: '2024-05-21T10:30:00Z',
    amount: 1500000000,
    currency: 'IDR',
    source: {
      id: 'ACC-PT-KAYU',
      name: 'PT Kayu Makmur Abadi',
      bank: 'Bank A',
      country: 'IDN',
    },
    destination: {
      id: 'ACC-SHELL-CYM',
      name: 'Verdant Holdings Ltd.',
      bank: 'Global Trust Bank',
      country: 'CYM',
    },
    riskScore: 95,
    category: 'Illegal Logging',
    reason:
      'Large transfer to offshore high-risk jurisdiction from forestry sector.',
    status: 'Blocked',
    channel: 'SWIFT',
    device: { id: 'DEV-001', ip: '103.45.1.2', location: 'Jakarta, ID' },
  },
  {
    id: 'TXN-GFC-002',
    timestamp: '2024-05-21T09:15:00Z',
    amount: 50000000,
    currency: 'IDR',
    source: {
      id: 'ACC-INDIV-X',
      name: 'Bambang S.',
      bank: 'Bank B',
      country: 'IDN',
    },
    destination: {
      id: 'ACC-POL-Z',
      name: 'Politician Z',
      bank: 'Bank C',
      country: 'IDN',
    },
    riskScore: 88,
    category: 'Illegal Mining',
    reason:
      'Structuring: 5 transactions of 10M in 1 hour from an account in a known illegal mining area.',
    status: 'Under Review',
    channel: 'Mobile Banking',
    device: { id: 'DEV-002', ip: '202.150.3.4', location: 'Pontianak, ID' },
  },
  {
    id: 'TXN-GFC-003',
    timestamp: '2024-05-20T22:00:00Z',
    amount: 15000,
    currency: 'USD',
    source: {
      id: 'ACC-NGO-FUND',
      name: 'Global Nature Fund',
      bank: 'Citibank',
      country: 'USA',
    },
    destination: {
      id: 'ACC-WILDLIFE-EXP',
      name: 'Exotic Fauna Global',
      bank: 'Vietcombank',
      country: 'VNM',
    },
    riskScore: 98,
    category: 'Wildlife Trafficking',
    reason:
      'Transaction pattern matches known wildlife trafficking financing typology.',
    status: 'Blocked',
    channel: 'SWIFT',
    device: { id: 'DEV-003', ip: '1.55.2.3', location: 'Hanoi, VN' },
  },
  ...Array.from(
    { length: 20 },
    (_, i): SuspiciousTransaction => ({
      id: `TXN-GFC-0${i + 10}`,
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
      amount: Math.floor(Math.random() * 1e9) + 1e7,
      currency: 'IDR',
      source: {
        id: `ACC-SRC-${i}`,
        name: `Source Corp ${i}`,
        bank: 'Bank D',
        country: 'IDN',
      },
      destination: {
        id: `ACC-DST-${i}`,
        name: `Offshore Ltd ${i}`,
        bank: 'International Bank',
        country: 'HKG',
      },
      riskScore: Math.floor(Math.random() * 40) + 60,
      category: 'Illegal Logging',
      reason: 'Automated generation for testing.',
      status: 'Flagged',
      channel: 'Online',
      device: { id: `DEV-RAND-${i}`, ip: '127.0.0.1', location: 'Unknown' },
    })
  ),
];

export const mockAccounts: SuspiciousAccount[] = [
  {
    id: 'ACC-PT-KAYU',
    name: 'PT Kayu Makmur Abadi',
    bank: 'Bank A',
    riskScore: 95,
    status: 'Suspicious',
    balance: 25000000000,
    currency: 'IDR',
    transactionCount: { incoming: 5, outgoing: 7 },
    lastActivity: '2024-05-21',
    type: 'Company',
    kycLevel: 'Incomplete',
    openDate: '2022-01-15',
  },
  {
    id: 'ACC-SHELL-CYM',
    name: 'Verdant Holdings Ltd.',
    bank: 'Global Trust Bank',
    riskScore: 99,
    status: 'Suspicious',
    balance: 95000,
    currency: 'USD',
    transactionCount: { incoming: 2, outgoing: 1 },
    lastActivity: '2024-05-22',
    type: 'Company',
    kycLevel: 'Incomplete',
    openDate: '2024-05-20',
  },
  {
    id: 'ACC-WILDLIFE-EXP',
    name: 'Exotic Fauna Global',
    bank: 'Vietcombank',
    riskScore: 98,
    status: 'Blocked',
    balance: 50000000,
    currency: 'IDR',
    transactionCount: { incoming: 20, outgoing: 5 },
    lastActivity: '2024-05-20',
    type: 'Company',
    kycLevel: 'Basic',
    openDate: '2023-08-10',
  },
  {
    id: 'ACC-INDIV-X',
    name: 'Bambang S.',
    bank: 'Bank B',
    riskScore: 88,
    status: 'Frozen',
    balance: 120000000,
    currency: 'IDR',
    transactionCount: { incoming: 10, outgoing: 20 },
    lastActivity: '2024-05-21',
    type: 'Individual',
    kycLevel: 'Enhanced',
    openDate: '2021-03-20',
  },
  {
    id: 'ACC-POL-Z',
    name: 'Politician Z',
    bank: 'Bank C',
    riskScore: 85,
    status: 'Suspicious',
    balance: 5000000000,
    currency: 'IDR',
    transactionCount: { incoming: 30, outgoing: 2 },
    lastActivity: '2024-05-22',
    type: 'Individual',
    kycLevel: 'Enhanced',
    openDate: '2020-01-01',
  },
  {
    id: 'ACC-LAWYER-A',
    name: 'Law Firm ABC',
    bank: 'Bank E',
    riskScore: 75,
    status: 'Active',
    balance: 12000000000,
    currency: 'IDR',
    transactionCount: { incoming: 50, outgoing: 45 },
    lastActivity: '2024-05-22',
    type: 'Company',
    kycLevel: 'Enhanced',
    openDate: '2019-06-01',
  },
  {
    id: 'ACC-MINING-CO',
    name: 'PT Tambang Ilegal',
    bank: 'Bank F',
    riskScore: 96,
    status: 'Blocked',
    balance: 5000000,
    currency: 'IDR',
    transactionCount: { incoming: 2, outgoing: 15 },
    lastActivity: '2024-05-22',
    type: 'Company',
    kycLevel: 'Incomplete',
    openDate: '2023-11-05',
  },
  {
    id: 'ACC-PROPERTY-DEV',
    name: 'Properti Megah Corp',
    bank: 'Bank G',
    riskScore: 78,
    status: 'Active',
    balance: 150000000000,
    currency: 'IDR',
    transactionCount: { incoming: 100, outgoing: 95 },
    lastActivity: '2024-05-22',
    type: 'Company',
    kycLevel: 'Enhanced',
    openDate: '2018-02-14',
  },
  ...Array.from(
    { length: 15 },
    (_, i): SuspiciousAccount => ({
      id: `ACC-SUS-${i}`,
      name: `Suspicious Entity ${i + 1}`,
      bank: 'Bank C',
      riskScore: Math.floor(Math.random() * 30) + 70,
      status: 'Suspicious',
      balance: Math.random() * 1e10,
      currency: 'IDR',
      transactionCount: {
        incoming: Math.floor(Math.random() * 25),
        outgoing: Math.floor(Math.random() * 25),
      },
      lastActivity: new Date(Date.now() - i * 86400000)
        .toISOString()
        .split('T')[0],
      type: 'Company',
      kycLevel: 'Basic',
      openDate: '2023-01-01',
    })
  ),
].sort((a, b) => b.riskScore - a.riskScore);

export const mockCaseFiles: CaseFile[] = [
  {
    id: 'CASE-2024-052',
    title: 'Illegal Mining Money Laundering Chain',
    priority: 'Critical',
    status: 'Investigating',
    investigator: 'Team Charlie',
    createdDate: '2024-05-22',
    lastUpdate: '2024-05-23',
    summary:
      'A complex 4-hop transaction chain originating from an illegal mining operation, moving funds through a law firm, property developer, and finally to an offshore account linked to a PEP.',
    potentialLoss: 500000000,
    threatActors: ['Politician Z', 'PT Tambang Ilegal'],
    relatedTransactions: [
      'TXN-CHAIN-A',
      'TXN-CHAIN-B',
      'TXN-CHAIN-C',
      'TXN-CHAIN-D',
    ],
    relatedAccounts: [
      'ACC-MINING-CO',
      'ACC-LAWYER-A',
      'ACC-PROPERTY-DEV',
      'ACC-SHELL-CYM',
      'ACC-POL-Z',
    ],
    evidence: [
      {
        id: 'EV-003',
        name: 'STR_BankF.pdf',
        type: 'STR',
        uploadedAt: '2024-05-22',
      },
      {
        id: 'EV-004',
        name: 'Corporate_Registry_CYM.pdf',
        type: 'Document',
        uploadedAt: '2024-05-23',
      },
    ],
    log: [
      {
        timestamp: '2024-05-22T11:00:00Z',
        user: 'System',
        action: 'Case Created',
        notes:
          'New case automatically generated from high-risk transaction chain (TXN-CHAIN-D).',
      },
      {
        timestamp: '2024-05-22T11:05:00Z',
        user: 'Supervisor',
        action: 'Assigned Case',
        notes: 'Assigned to Team Charlie for immediate investigation.',
      },
      {
        timestamp: '2024-05-23T09:30:00Z',
        user: 'Analyst C1',
        action: 'Added Evidence',
        notes:
          'Uploaded STR from Bank F regarding initial placement from ACC-MINING-CO.',
      },
      {
        timestamp: '2024-05-23T14:00:00Z',
        user: 'Analyst C2',
        action: 'Sent RFI',
        notes:
          'Request for Information sent to Bank E regarding the role of ACC-LAWYER-A.',
      },
    ],
  },
  {
    id: 'CASE-2024-051',
    title: 'PT Kayu Gelap Export Ring',
    priority: 'Critical',
    status: 'Investigating',
    investigator: 'Team Alpha',
    createdDate: '2024-05-15',
    lastUpdate: '2024-05-21',
    summary:
      'Investigation into a suspected illegal logging operation using a complex network of shell companies to launder proceeds.',
    potentialLoss: 1500000000,
    threatActors: ['Bambang S.'],
    relatedTransactions: ['TXN-GFC-001'],
    relatedAccounts: ['ACC-PT-KAYU', 'ACC-SHELL-CYM', 'ACC-INDIV-X'],
    evidence: [
      {
        id: 'EV-001',
        name: 'STR_Report_BankA.pdf',
        type: 'STR',
        uploadedAt: '2024-05-15',
      },
      {
        id: 'EV-005',
        name: 'Shipping_Manifest_Discrepancy.pdf',
        type: 'Document',
        uploadedAt: '2024-05-18',
      },
    ],
    log: [
      {
        timestamp: '2024-05-21T14:00:00Z',
        user: 'Regulator A',
        action: 'Escalated to OJK',
        notes: 'Requesting transaction freeze on related accounts ACC-PT-KAYU.',
      },
      {
        timestamp: '2024-05-20T10:00:00Z',
        user: 'Analyst A1',
        action: 'Linked Account',
        notes: 'Linked ACC-INDIV-X to this case based on shared device ID.',
      },
    ],
  },
];

export const mockModelMetrics: ModelMetrics = {
  accuracy: 99.7,
  precision: 98.2,
  recall: 97.5,
  f1Score: 97.8,
  auc: 0.99,
  modelVersion: 'GFC-Det v3.1',
  lastTrained: '2024-05-01',
  featureImportance: [
    { feature: 'Transaction to High-Risk Jurisdiction', importance: 0.25 },
    { feature: 'Transaction Structuring Pattern', importance: 0.2 },
    { feature: 'Sender/Receiver in Watchlist', importance: 0.18 },
    { feature: 'Anomalous Transaction Volume', importance: 0.15 },
    { feature: 'Use of Shell Corporations', importance: 0.12 },
    { feature: 'Connection to PEP', importance: 0.1 },
  ],
  performanceOverTime: [
    { date: 'Jan', accuracy: 99.5, precision: 97.8 },
    { date: 'Feb', accuracy: 99.6, precision: 98.0 },
    { date: 'Mar', accuracy: 99.6, precision: 98.1 },
    { date: 'Apr', accuracy: 99.7, precision: 98.2 },
  ],
};

// === PERBAIKAN KRITIS UNTUK D3 ===
export const mockNetworkLinks: NetworkLink[] = [
  { source: 'ACC-PT-KAYU', target: 'ACC-SHELL-CYM' },
  { source: 'ACC-INDIV-X', target: 'ACC-PT-KAYU' },
  { source: 'ACC-PT-KAYU', target: 'ACC-POL-Z' },
  { source: 'ACC-WILDLIFE-EXP', target: 'ACC-SHELL-CYM' },
  { source: 'ACC-POL-Z', target: 'ACC-LAWYER-A' },
  { source: 'ACC-MINING-CO', target: 'ACC-LAWYER-A' },
  { source: 'ACC-LAWYER-A', target: 'ACC-PROPERTY-DEV' },
  { source: 'ACC-PROPERTY-DEV', target: 'ACC-SHELL-CYM' },
];

const allNodeIdsInLinks = new Set<string>();
mockNetworkLinks.forEach(link => {
  allNodeIdsInLinks.add(String(link.source));
  allNodeIdsInLinks.add(String(link.target));
});

export const mockNetworkNodes: NetworkNode[] = mockAccounts
  .filter(acc => allNodeIdsInLinks.has(acc.id))
  .map(acc => ({
    id: acc.id,
    name: acc.name,
    type: acc.type,
    riskScore: acc.riskScore,
  }));
// === AKHIR PERBAIKAN ===

export const mockCommunicationReports: CommunicationReport[] = [
  {
    id: 'REP-001',
    date: '2024-05-21',
    relatedCase: 'CASE-2024-051',
    institution: 'Bank Mandiri',
    subject: 'Request for Account Freezing - ACC-PT-KAYU',
    status: 'Sent',
  },
  {
    id: 'REP-002',
    date: '2024-05-20',
    relatedCase: 'CASE-2024-051',
    institution: 'OJK',
    subject: 'Suspicious Activity Report - PT Kayu Makmur Abadi',
    status: 'Acknowledged',
  },
];

export const mockAccountDetails: AccountDetail[] = mockAccounts.map(acc => ({
  ...acc,
  address: 'Jl. Jenderal Sudirman No. 52, Jakarta, Indonesia',
  country: acc.id.includes('CYM')
    ? 'Cayman Islands'
    : acc.id.includes('VNM')
    ? 'Vietnam'
    : 'Indonesia',
  firstSeen: acc.openDate,
  linkedEntities: [
    { id: 'DEV-98765', type: 'Device', relationship: 'Primary Device' },
    { id: '103.45.67.89', type: 'IP', relationship: 'Frequent IP' },
    ...(acc.riskScore > 90
      ? [
          {
            id: 'ACC-SHELL-CYM',
            type: 'Related Account' as const,
            relationship: 'Transferred Funds To',
          },
        ]
      : []),
  ],
  transactions: mockTransactions.filter(
    tx => tx.source.id === acc.id || tx.destination.id === acc.id
  ),
}));
