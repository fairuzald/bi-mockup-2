import React from 'react';
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from '../components/common/Card';
import PageTitle from '../components/common/PageTitle';
import { mockModelMetrics } from '../utils/mockData';

const MetricCard: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="glass-card p-4 rounded-lg text-center">
    <p className="text-sm text-light-text_secondary dark:text-dark-text_secondary">
      {label}
    </p>
    <p className="text-3xl font-bold text-brand-green-light">{value}</p>
  </div>
);

const ModelMetricsPage: React.FC = () => {
  const {
    accuracy,
    precision,
    recall,
    f1Score,
    auc,
    featureImportance,
    performanceOverTime,
  } = mockModelMetrics;

  return (
    <div>
      <PageTitle
        title="AI Model Metrics"
        subtitle="Performance and health monitoring for the GreenGuard detection model."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <MetricCard label="Accuracy" value={`${accuracy}%`} />
        <MetricCard label="Precision" value={`${precision}%`} />
        <MetricCard label="Recall" value={`${recall}%`} />
        <MetricCard label="F1-Score" value={`${f1Score}%`} />
        <MetricCard label="AUC" value={auc} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Feature Importance">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={featureImportance}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 100, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="feature"
                width={150}
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111816',
                  border: '1px solid #2c3534',
                  borderRadius: '0.5rem',
                }}
                cursor={{ fill: 'rgba(42, 157, 143, 0.1)' }}
              />
              <Bar dataKey="importance" fill="#2A9D8F" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Performance Over Time">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceOverTime}>
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111816',
                  border: '1px solid #2c3534',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#1A614F"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="precision"
                stroke="#E9C46A"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};
export default ModelMetricsPage;
