// src/components/common/TransactionFlow.tsx
import { ArrowRight, Building, Globe, User } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import type { SuspiciousTransaction } from '../../utils/types';

interface EntityCardProps {
  entity: SuspiciousTransaction['source'];
  onClick: () => void;
}

const EntityCard: React.FC<EntityCardProps> = ({ entity, onClick }) => (
  <div
    className="w-full sm:w-48 text-center p-3 bg-light-background dark:bg-dark-background rounded-lg border border-light-border dark:border-dark-border cursor-pointer hover:border-brand-green-light"
    onClick={onClick}
  >
    <div className="flex items-center justify-center gap-2">
      {entity.type === 'Individual' ? (
        <User className="w-4 h-4" />
      ) : (
        <Building className="w-4 h-4" />
      )}
      <p className="font-bold truncate">{entity.name}</p>
    </div>
    <p className="text-sm font-mono truncate">{entity.bank}</p>
    <p className="text-xs flex items-center justify-center gap-1 text-light-text_secondary dark:text-dark-text_secondary">
      <Globe className="w-3 h-3" />
      {entity.country}
    </p>
  </div>
);

interface FlowArrowProps {
  tx: SuspiciousTransaction;
}

const FlowArrow: React.FC<FlowArrowProps> = ({ tx }) => (
  <div className="w-full sm:w-auto flex flex-col items-center my-2 sm:my-0 sm:mx-4">
    <p className="font-bold text-sm text-brand-green-light">
      {formatCurrency(tx.amount, tx.currency)}
    </p>
    <ArrowRight className="w-8 h-8 text-light-text_secondary dark:text-dark-text_secondary my-1 sm:my-0 transform sm:rotate-0 rotate-90" />
    <p className="text-xs bg-brand-green/10 text-brand-green-light px-2 py-1 rounded-full">
      {tx.channel}
    </p>
  </div>
);

interface TransactionFlowProps {
  transactionChain: SuspiciousTransaction[];
}

const TransactionFlow: React.FC<TransactionFlowProps> = ({
  transactionChain,
}) => {
  const navigate = useNavigate();

  if (!transactionChain || transactionChain.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center flex-wrap gap-7">
      {transactionChain.map((tx, index) => (
        <React.Fragment key={tx.id}>
          {index === 0 && (
            <EntityCard
              entity={tx.source}
              onClick={() => navigate(`/accounts/${tx.source.id}`)}
            />
          )}
          <FlowArrow tx={tx} />
          <EntityCard
            entity={tx.destination}
            onClick={() => navigate(`/accounts/${tx.destination.id}`)}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default TransactionFlow;
