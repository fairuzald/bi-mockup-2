import {
  ArrowLeft,
  Ban,
  FileWarning,
  MapPin,
  MessageSquare,
} from 'lucide-react';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import PageTitle from '../components/common/PageTitle';
import TransactionFlow from '../components/common/TransactionFlow';
import { formatTimestamp } from '../utils/formatters';
import { mockTransactions } from '../utils/mockData';
import type { SuspiciousTransaction } from '../utils/types';

// Helper function untuk membangun rantai transaksi
const buildTransactionChain = (
  transactionId: string
): SuspiciousTransaction[] => {
  const chain: SuspiciousTransaction[] = [];
  let currentTx = mockTransactions.find(t => t.id === transactionId);

  // Telusuri ke depan (jika ada transaksi setelahnya)
  while (currentTx) {
    chain.push(currentTx);
    const nextTx = mockTransactions.find(t => t.previousTxId === currentTx!.id);
    currentTx = nextTx;
  }

  // Telusuri ke belakang untuk menemukan awal rantai
  currentTx = mockTransactions.find(t => t.id === transactionId);
  while (currentTx?.previousTxId) {
    const prevTx = mockTransactions.find(t => t.id === currentTx!.previousTxId);
    if (prevTx) {
      chain.unshift(prevTx);
      currentTx = prevTx;
    } else {
      break;
    }
  }

  return chain;
};

const TransactionDetailPage: React.FC = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const transactionChain = useMemo(() => {
    if (!transactionId) return [];
    return buildTransactionChain(transactionId);
  }, [transactionId]);

  const currentTx = transactionChain.find(tx => tx.id === transactionId);

  if (!currentTx) return <div>Transaction not found.</div>;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-light-text_secondary dark:text-dark-text_secondary mb-4 hover:text-brand-green-light"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <PageTitle
        title={`Transaction ${currentTx.id}`}
        subtitle={currentTx.reason}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card title="Transaction Flow">
            <TransactionFlow transactionChain={transactionChain} />
          </Card>
          <Card title="Metadata for this Hop">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-light-text_secondary dark:text-dark-text_secondary">
                  Device ID
                </p>
                <p className="font-mono">{currentTx.device.id}</p>
              </div>
              <div>
                <p className="text-light-text_secondary dark:text-dark-text_secondary">
                  IP Address
                </p>
                <p className="font-mono">{currentTx.device.ip}</p>
              </div>
              <div>
                <p className="text-light-text_secondary dark:text-dark-text_secondary">
                  Geo-location
                </p>
                <p className="font-mono flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {currentTx.device.location}
                </p>
              </div>
              <div>
                <p className="text-light-text_secondary dark:text-dark-text_secondary">
                  Timestamp
                </p>
                <p className="font-mono">
                  {formatTimestamp(currentTx.timestamp)}
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-8">
          <Card title="Risk Assessment">
            <div className="text-center">
              <p className="text-light-text_secondary dark:text-dark-text_secondary">
                AI Risk Score
              </p>
              <p className="font-extrabold text-5xl text-red-500 my-2">
                {currentTx.riskScore}
              </p>
              <p className="px-3 py-1 text-sm font-semibold rounded-full bg-red-500/10 text-red-500 inline-block">
                {currentTx.category}
              </p>
            </div>
          </Card>
          <Card title="Actions">
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-semibold transition-all duration-300">
                <Ban className="w-4 h-4" /> Block Related Accounts
              </button>
              <button
                onClick={() => navigate(`/cases/${caseFileId}`)}
                className="w-full flex items-center justify-center gap-2 py-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg text-sm font-semibold transition-all duration-300"
              >
                <FileWarning className="w-4 h-4" /> Go to Case File
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg text-sm font-semibold transition-all duration-300">
                <MessageSquare className="w-4 h-4" /> Report to Institution
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default TransactionDetailPage;
