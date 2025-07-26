import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import PageTitle from '../components/common/PageTitle';
import { formatCurrency } from '../utils/formatters';
import { mockAccounts } from '../utils/mockData';
import type { SuspiciousAccount } from '../utils/types';

const ITEMS_PER_PAGE = 8;

const SuspiciousAccountsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAccounts = useMemo(() => {
    return mockAccounts.filter(
      acc =>
        acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginatedAccounts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAccounts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAccounts, currentPage]);

  const totalPages = Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE);

  return (
    <div>
      <PageTitle
        title="Suspicious Accounts"
        subtitle="High-risk entities identified by the system, prioritized for investigation."
      />
      <Card bodyClassName="!p-0">
        <div className="p-4 border-b border-light-border dark:border-dark-border">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-text_secondary dark:text-dark-text_secondary" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by account name or ID..."
              className="w-full pl-10 pr-4 py-2 bg-transparent border border-light-border dark:border-dark-border rounded-lg text-sm focus:ring-2 focus:ring-brand-green"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100/50 dark:bg-slate-800/50 text-light-text_secondary dark:text-dark-text_secondary uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Account Name / ID</th>
                <th className="p-4 text-left">Balance</th>
                <th className="p-4 text-center">Risk Score</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAccounts.map((acc: SuspiciousAccount) => (
                <tr
                  key={acc.id}
                  onClick={() => navigate(`/accounts/${acc.id}`)}
                  className="border-b border-light-border dark:border-dark-border hover:bg-brand-green/5 dark:hover:bg-brand-green/5 cursor-pointer transition-colors"
                >
                  <td className="p-4">
                    <p className="font-bold">{acc.name}</p>
                    <p className="font-mono text-xs text-light-text_secondary dark:text-dark-text_secondary">
                      {acc.id}
                    </p>
                  </td>
                  <td className="p-4 font-semibold">
                    {formatCurrency(acc.balance, acc.currency)}
                  </td>
                  <td className="p-4 text-center">
                    <span className="font-bold text-lg text-red-500">
                      {acc.riskScore}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        acc.status === 'Suspicious'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : acc.status === 'Frozen'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {acc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-between items-center text-sm">
          <span className="text-light-text_secondary dark:text-dark-text_secondary">
            Showing {paginatedAccounts.length} of {filteredAccounts.length}{' '}
            results
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
export default SuspiciousAccountsPage;
