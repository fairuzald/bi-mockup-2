import { Download } from 'lucide-react';
import React from 'react';
import Card from '../components/common/Card';
import PageTitle from '../components/common/PageTitle';
import { mockCommunicationReports } from '../utils/mockData';

const ReportsPage: React.FC = () => {
  return (
    <div>
      <PageTitle
        title="Communication Reports"
        subtitle="Audit trail of communications and actions taken with external institutions."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-4 text-center">
          <h3 className="font-bold text-3xl text-brand-green-light">
            {mockCommunicationReports.length}
          </h3>
          <p className="text-sm text-light-text_secondary dark:text-dark-text_secondary">
            Reports Sent (Last 30 days)
          </p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="font-bold text-3xl text-green-500">
            {
              mockCommunicationReports.filter(r => r.status === 'Acknowledged')
                .length
            }
          </h3>
          <p className="text-sm text-light-text_secondary dark:text-dark-text_secondary">
            Reports Acknowledged
          </p>
        </Card>
        <Card className="p-4 text-center">
          <h3 className="font-bold text-3xl text-blue-500">
            {mockCommunicationReports.filter(r => r.status === 'Sent').length}
          </h3>
          <p className="text-sm text-light-text_secondary dark:text-dark-text_secondary">
            Pending Acknowledgement
          </p>
        </Card>
      </div>
      <Card bodyClassName="!p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100/50 dark:bg-slate-800/50 text-light-text_secondary dark:text-dark-text_secondary uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Report ID</th>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Recipient Institution</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Download</th>
              </tr>
            </thead>
            <tbody>
              {mockCommunicationReports.map(rep => (
                <tr
                  key={rep.id}
                  className="border-b border-light-border dark:border-dark-border"
                >
                  <td className="p-4 font-mono">{rep.id}</td>
                  <td className="p-4 font-semibold">{rep.subject}</td>
                  <td className="p-4">{rep.institution}</td>
                  <td className="p-4">{rep.date}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        rep.status === 'Sent'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-green-500/10 text-green-500'
                      }`}
                    >
                      {rep.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 rounded-full hover:bg-brand-green/10 text-brand-green">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
export default ReportsPage;
