import { ArrowLeft, Building, User } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import EgoNetworkGraph from '../components/common/EgoNetworkGraph'; // <-- IMPORT BARU
import PageTitle from '../components/common/PageTitle';
import { formatCurrency, formatTimestamp } from '../utils/formatters';
import { mockAccountDetails } from '../utils/mockData';
import type { SuspiciousTransaction } from '../utils/types';

const AccountDetailPage: React.FC = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const acc = mockAccountDetails.find(a => a.id === accountId);

  if (!acc) return <div>Account not found.</div>;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-light-text_secondary dark:text-dark-text_secondary mb-4 hover:text-brand-green-light"
      >
        <ArrowLeft className="w-4 h-4" /> Back to list
      </button>
      <PageTitle
        title={acc.name}
        subtitle={`Full profile and transaction history for ${acc.id}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                {acc.type === 'Individual' ? (
                  <User className="w-8 h-8 text-brand-green-light" />
                ) : (
                  <Building className="w-8 h-8 text-brand-green-light" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-xl">{acc.name}</h3>
                <p className="text-sm text-light-text_secondary dark:text-dark-text_secondary">
                  {acc.type} | {acc.bank}
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm border-t border-light-border dark:border-dark-border pt-4">
              <div className="flex justify-between">
                <span>Risk Score:</span>
                <span className="font-bold text-red-500">{acc.riskScore}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-bold">{acc.status}</span>
              </div>
              <div className="flex justify-between">
                <span>KYC Level:</span>
                <span>{acc.kycLevel}</span>
              </div>
              <div className="flex justify-between">
                <span>Balance:</span>
                <span>{formatCurrency(acc.balance, acc.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Country:</span>
                <span>{acc.country}</span>
              </div>
              <div className="flex justify-between">
                <span>Account Opened:</span>
                <span>{acc.openDate}</span>
              </div>
            </div>
          </Card>

          {/* VISUALISASI JARINGAN BARU DI SINI */}
          <Card title="Entity Network Visualization" bodyClassName="h-64">
            <EgoNetworkGraph
              centerNodeId={acc.id}
              linkedEntities={acc.linkedEntities}
            />
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title="Related Transactions" bodyClassName="!p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100/50 dark:bg-slate-800/50 text-light-text_secondary dark:text-dark-text_secondary text-xs">
                  <tr>
                    <th className="p-3 text-left">TXN ID</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-right">Amount</th>
                    <th className="p-3 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {acc.transactions.map((tx: SuspiciousTransaction) => (
                    <tr
                      key={tx.id}
                      onClick={() => navigate(`/transactions/${tx.id}`)}
                      className="border-b border-light-border dark:border-dark-border hover:bg-brand-green/5 dark:hover:bg-brand-green/5 cursor-pointer transition-colors"
                    >
                      <td className="p-3 font-mono">{tx.id}</td>
                      <td className="p-3">{tx.category}</td>
                      <td className="p-3 text-right font-semibold">
                        {formatCurrency(tx.amount, tx.currency)}
                      </td>
                      <td className="p-3 text-right text-light-text_secondary dark:text-dark-text_secondary">
                        {formatTimestamp(tx.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AccountDetailPage;
