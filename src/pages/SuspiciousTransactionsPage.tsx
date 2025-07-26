import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import PageTitle from '../components/common/PageTitle';
import { formatCurrency, formatTimestamp } from '../utils/formatters';
import { mockTransactions } from '../utils/mockData';
import type { SuspiciousTransaction } from '../utils/types';

const ITEMS_PER_PAGE = 8;

const SuspiciousTransactionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(
      tx =>
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  return (
    <div>
      <PageTitle
        title="Suspicious Transactions"
        subtitle="Flagged transactions by the AI model, prioritized by risk score."
      />
      <Card bodyClassName="!p-0">
        <div className="p-4 border-b border-light-border dark:border-dark-border">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-text_secondary dark:text-dark-text_secondary" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by ID, name, or reason..."
              className="w-full pl-10 pr-4 py-2 bg-transparent border border-light-border dark:border-dark-border rounded-lg text-sm focus:ring-2 focus:ring-brand-green"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100/50 dark:bg-slate-800/50 text-light-text_secondary dark:text-dark-text_secondary uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Timestamp</th>
                <th className="p-4 text-left">Source</th>
                <th className="p-4 text-left">Destination</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((tx: SuspiciousTransaction) => (
                <tr
                  key={tx.id}
                  onClick={() => navigate(`/transactions/${tx.id}`)}
                  className="border-b border-light-border dark:border-dark-border hover:bg-brand-green/5 dark:hover:bg-brand-green/5 cursor-pointer transition-colors"
                >
                  <td className="p-4 text-light-text_secondary dark:text-dark-text_secondary">
                    {formatTimestamp(tx.timestamp)}
                  </td>
                  <td className="p-4">
                    <div className="font-semibold">{tx.source.name}</div>
                    <div className="text-xs font-mono">
                      {tx.source.bank} - {tx.source.country}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold">{tx.destination.name}</div>
                    <div className="text-xs font-mono">
                      {tx.destination.bank} - {tx.destination.country}
                    </div>
                  </td>
                  <td className="p-4 text-right font-semibold">
                    {formatCurrency(tx.amount, tx.currency)}
                  </td>
                  <td className="p-4 text-center">
                    <span className="font-bold text-lg text-red-500">
                      {tx.riskScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-between items-center text-sm">
          <span className="text-light-text_secondary dark:text-dark-text_secondary">
            Showing {paginatedTransactions.length} of{' '}
            {filteredTransactions.length} results
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default SuspiciousTransactionsPage;
