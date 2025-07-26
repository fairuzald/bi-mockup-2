import { Plus } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import PageTitle from '../components/common/PageTitle';
import { mockCaseFiles } from '../utils/mockData';

const CasesPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <PageTitle
          title="Case Management"
          subtitle="Consolidated view of all ongoing and closed investigations."
        />
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Case
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCaseFiles.map(caseFile => (
          <Card
            key={caseFile.id}
            className="cursor-pointer hover:shadow-glow-green hover:-translate-y-1 transition-all"
          >
            <div onClick={() => navigate(`/cases/${caseFile.id}`)}>
              <p
                className={`text-xs font-semibold ${
                  caseFile.priority === 'Critical'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`}
              >
                {caseFile.priority}
              </p>
              <h3 className="font-bold text-lg mt-1">{caseFile.title}</h3>
              <p className="text-sm font-mono text-light-text_secondary dark:text-dark-text_secondary">
                {caseFile.id}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border flex justify-between text-sm">
              <span className="font-semibold">{caseFile.status}</span>
              <span className="text-light-text_secondary dark:text-dark-text_secondary">
                {caseFile.investigator}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CasesPage;
