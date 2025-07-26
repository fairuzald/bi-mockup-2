import {
  ArrowLeft,
  Ban,
  FileWarning,
  MapPin,
  MessageSquare,
} from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import PageTitle from '../components/common/PageTitle';
import { formatTimestamp } from '../utils/formatters';
import { mockCaseFiles, mockTransactions } from '../utils/mockData';

const TransactionDetailPage: React.FC = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const tx = mockTransactions.find(t => t.id === transactionId);

  if (!tx) return <div>Transaction not found.</div>;

  // Temukan kasus yang relevan (jika ada)
  const relevantCase = mockCaseFiles.find(c =>
    c.relatedTransactions.includes(tx.id)
  );

  const handleEscalate = () => {
    // Jika sudah ada kasus, navigasi ke sana. Jika tidak, bisa ke halaman pembuatan kasus baru.
    if (relevantCase) {
      navigate(`/cases/${relevantCase.id}`);
    } else {
      // Logika untuk membuat kasus baru bisa ditambahkan di sini
      alert('No existing case file. Logic to create a new case would be here.');
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-light-text_secondary dark:text-dark-text_secondary mb-4 hover:text-brand-green-light"
      >
        <ArrowLeft className="w-4 h-4" /> Back to list
      </button>
      <PageTitle title={`Transaction ${tx.id}`} subtitle={tx.reason} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* ... Transaction Flow Card (tidak berubah) ... */}
          <Card title="Metadata for this Hop">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-light-text_secondary dark:text-dark-text_secondary">
                  Device ID
                </p>
                <p className="font-mono">{tx.device.id}</p>
              </div>
              <div>
                <p className="text-light-text_secondary dark:text-dark-text_secondary">
                  IP Address
                </p>
                <p className="font-mono">{tx.device.ip}</p>
              </div>
              <div>
                <p className="text-light-text_secondary dark:text-dark-text_secondary">
                  Geo-location
                </p>
                <p className="font-mono flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {tx.device.location}
                </p>
              </div>
              <div>
                <p className="text-light-text_secondary dark:text-dark-text_secondary">
                  Timestamp
                </p>
                <p className="font-mono">{formatTimestamp(tx.timestamp)}</p>
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
                {tx.riskScore}
              </p>
              <p className="px-3 py-1 text-sm font-semibold rounded-full bg-red-500/10 text-red-500 inline-block">
                {tx.category}
              </p>
            </div>
          </Card>
          <Card title="Actions">
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-semibold transition-all duration-300">
                <Ban className="w-4 h-4" /> Block Related Accounts
              </button>
              <button
                onClick={handleEscalate}
                className="w-full flex items-center justify-center gap-2 py-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg text-sm font-semibold transition-all duration-300"
              >
                <FileWarning className="w-4 h-4" />
                {relevantCase ? 'Go to Case File' : 'Create Case File'}
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
