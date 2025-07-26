import {
  ArrowLeft,
  DollarSign,
  Download,
  Paperclip,
  Send,
  User,
  Users,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/common/Card';
import PageTitle from '../components/common/PageTitle';
import TransactionFlow from '../components/common/TransactionFlow';
import { formatCurrency, formatTimestamp } from '../utils/formatters';
import { mockCaseFiles, mockTransactions } from '../utils/mockData';
import type { SuspiciousTransaction } from '../utils/types';

const CaseDetailPage: React.FC = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [caseFile, setCaseFile] = useState(
    mockCaseFiles.find(c => c.id === caseId)
  );
  const [newNote, setNewNote] = useState('');

  const transactionChain = useMemo(() => {
    if (!caseFile || caseFile.relatedTransactions.length === 0) return [];
    const buildChain = (txId: string): SuspiciousTransaction[] => {
      const chain: SuspiciousTransaction[] = [];
      let currentTx = mockTransactions.find(t => t.id === txId);
      while (currentTx?.previousTxId) {
        const prevTx = mockTransactions.find(
          t => t.id === currentTx!.previousTxId
        );
        if (prevTx) {
          chain.unshift(prevTx);
          currentTx = prevTx;
        } else {
          break;
        }
      }
      currentTx = mockTransactions.find(t => t.id === txId);
      while (currentTx) {
        if (!chain.find(c => c.id === currentTx!.id)) chain.push(currentTx);
        const nextTx = mockTransactions.find(
          t => t.previousTxId === currentTx!.id
        );
        currentTx = nextTx;
      }
      return chain;
    };
    return buildChain(caseFile.relatedTransactions[0]);
  }, [caseFile]);

  if (!caseFile) return <div>Case not found.</div>;

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const newLogEntry = {
      timestamp: new Date().toISOString(),
      user: 'Current User',
      action: 'Added Note',
      notes: newNote,
    };
    setCaseFile(prev =>
      prev ? { ...prev, log: [...prev.log, newLogEntry] } : undefined
    );
    setNewNote('');
  };

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-light-text_secondary dark:text-dark-text_secondary mb-4 hover:text-brand-green-light"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cases
      </button>
      <PageTitle
        title={caseFile.title}
        subtitle={`Investigating case file ${caseFile.id}`}
      />

      {transactionChain.length > 0 && (
        <Card title="Primary Transaction Flow" className="mb-8">
          <TransactionFlow transactionChain={transactionChain} />
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card title="Investigation Log">
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {caseFile.log.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-brand-green-light" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-bold">{log.user}</span>{' '}
                      <span className="text-light-text_secondary dark:text-dark-text_secondary">
                        {log.action} at {formatTimestamp(log.timestamp)}
                      </span>
                    </p>
                    <p className="text-sm p-2 bg-light-background dark:bg-dark-background rounded-md mt-1">
                      {log.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleAddLog}
              className="mt-4 pt-4 border-t border-light-border dark:border-dark-border"
            >
              <textarea
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Add new note, action, or finding..."
                rows={3}
                className="w-full bg-transparent border border-light-border dark:border-dark-border rounded-lg p-2 text-sm focus:ring-2 focus:ring-brand-green"
              ></textarea>
              <button
                type="submit"
                className="btn-primary mt-2 flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Add Log
              </button>
            </form>
          </Card>
        </div>
        <div className="space-y-8">
          <Card title="Case Details">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Priority:</span>
                <span className="font-bold text-red-500">
                  {caseFile.priority}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-bold">{caseFile.status}</span>
              </div>
              <div className="flex justify-between">
                <span>Investigator:</span>
                <span>{caseFile.investigator}</span>
              </div>
              <div className="flex justify-between items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>Potential Loss:</span>
                <span>{formatCurrency(caseFile.potentialLoss, 'IDR')}</span>
              </div>
              <div className="flex justify-between items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>Threat Actors:</span>
                <span>{caseFile.threatActors.join(', ')}</span>
              </div>
            </div>
          </Card>
          <Card title="Evidence Locker">
            <div className="space-y-2">
              {caseFile.evidence.map(ev => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between p-2 bg-light-background dark:bg-dark-background rounded-md"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Paperclip className="w-4 h-4" /> {ev.name}
                  </div>
                  <button className="p-1 hover:bg-brand-green/10 rounded-full text-brand-green-light">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CaseDetailPage;
