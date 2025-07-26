/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Files,
  Siren,
  Users,
} from 'lucide-react';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from '../components/common/Card';
import PageTitle from '../components/common/PageTitle';
import { useTheme } from '../hooks/useTheme';
import {
  mockAccounts,
  mockCaseFiles,
  mockNetworkLinks,
  mockNetworkNodes,
  mockTransactions,
} from '../utils/mockData';
import type { NetworkLink, NetworkNode } from '../utils/types';

const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ElementType;
}> = ({ title, value, icon: Icon }) => (
  <Card className="p-4">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-brand-green/10 text-brand-green-light rounded-lg">
        {' '}
        <Icon className="w-6 h-6" />{' '}
      </div>
      <div>
        <p className="text-sm text-light-text_secondary dark:text-dark-text_secondary">
          {title}
        </p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </Card>
);

const NetworkGraph = () => {
  const ref = React.useRef<SVGSVGElement>(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  React.useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    const parent = svg.node()!.parentElement!;
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    svg.attr('viewBox', `0 0 ${width} ${height}`).selectAll('*').remove();

    const simulation = d3
      .forceSimulation<NetworkNode>(mockNetworkNodes)
      .force(
        'link',
        d3
          .forceLink<NetworkNode, NetworkLink>(mockNetworkLinks)
          .id(d => d.id)
          .distance(120)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const g = svg.append('g');

    const link = g
      .append('g')
      .selectAll('line')
      .data(mockNetworkLinks)
      .join('line')
      .attr('stroke', theme === 'dark' ? '#2c3534' : '#e5e7eb');

    // === PERBAIKAN UTAMA TIPE D3 DI SINI ===
    const node: d3.Selection<SVGGElement, NetworkNode, SVGGElement, unknown> = g
      .append('g')
      .selectAll<SVGGElement, NetworkNode>('g')
      .data(mockNetworkNodes)
      .join('g')
      .style('cursor', 'pointer')
      .on('click', (event, d) => navigate(`/accounts/${d.id}`))
      .call(drag(simulation));
    // === AKHIR PERBAIKAN TIPE D3 ===

    node
      .append('circle')
      .attr('r', d => (d.riskScore > 90 ? 12 : 8))
      .attr('fill', d => (d.riskScore > 90 ? '#ef4444' : '#1A614F'));

    node
      .append('text')
      .text(d => d.name)
      .attr('x', 15)
      .attr('y', 5)
      .style('font-size', '10px')
      .style('fill', theme === 'dark' ? '#e5e7eb' : '#111827');

    node.append('title').text(d => `${d.name}\nRisk: ${d.riskScore}`);

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as NetworkNode).x!)
        .attr('y1', d => (d.source as NetworkNode).y!)
        .attr('x2', d => (d.target as NetworkNode).x!)
        .attr('y2', d => (d.target as NetworkNode).y!);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .on('zoom', event => g.attr('transform', event.transform))
    );

    function drag(simulation: d3.Simulation<NetworkNode, undefined>) {
      function dragstarted(event: any, d: NetworkNode) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(event: any, d: NetworkNode) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event: any, d: NetworkNode) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      return d3
        .drag<SVGGElement, NetworkNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  }, [navigate, theme]);

  return <svg ref={ref} className="w-full h-full"></svg>;
};

const alertTrendData = [
  {
    name: 'Jan',
    'Illegal Logging': 20,
    'Illegal Mining': 15,
    'Wildlife Trafficking': 10,
  },
  {
    name: 'Feb',
    'Illegal Logging': 25,
    'Illegal Mining': 18,
    'Wildlife Trafficking': 12,
  },
  {
    name: 'Mar',
    'Illegal Logging': 30,
    'Illegal Mining': 22,
    'Wildlife Trafficking': 18,
  },
  {
    name: 'Apr',
    'Illegal Logging': 28,
    'Illegal Mining': 25,
    'Wildlife Trafficking': 20,
  },
  {
    name: 'May',
    'Illegal Logging': 35,
    'Illegal Mining': 28,
    'Wildlife Trafficking': 25,
  },
];

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const criticalAlerts = useMemo(
    () =>
      mockTransactions
        .filter(tx => tx.riskScore > 90 && tx.status === 'Flagged')
        .slice(0, 3),
    []
  );

  return (
    <div>
      <PageTitle
        title="Regulator Dashboard"
        subtitle="Real-time overview of green financial crime threats and system status."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Flagged Transactions (24h)"
          value={mockTransactions.filter(t => t.status === 'Flagged').length}
          icon={Siren}
        />
        <StatCard
          title="Active Cases"
          value={mockCaseFiles.filter(c => c.status === 'Investigating').length}
          icon={Files}
        />
        <StatCard
          title="High-Risk Accounts"
          value={mockAccounts.filter(a => a.riskScore > 90).length}
          icon={Users}
        />
        <StatCard title="Model Accuracy" value="99.7%" icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card title="Critical Alerts - Immediate Action Required">
            <div className="space-y-4">
              {criticalAlerts.map(tx => (
                <div
                  key={tx.id}
                  className="p-4 rounded-lg bg-red-500/5 border border-red-500/20"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <p className="font-bold">{tx.category}</p>
                      </div>
                      <p className="text-sm text-light-text_secondary dark:text-dark-text_secondary mt-1">
                        {tx.reason}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-bold text-red-500 text-lg">
                        {tx.riskScore}
                      </p>
                      <button
                        onClick={() => navigate(`/transactions/${tx.id}`)}
                        className="text-sm font-semibold text-brand-green-light hover:underline flex items-center gap-1"
                      >
                        Investigate <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Alert Trends by Category (YTD)">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={alertTrendData}>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111816',
                    border: '1px solid #2c3534',
                    borderRadius: '0.5rem',
                  }}
                />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="Illegal Logging"
                  stackId="1"
                  stroke="#1A614F"
                  fill="#1A614F"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Illegal Mining"
                  stackId="1"
                  stroke="#2A9D8F"
                  fill="#2A9D8F"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Wildlife Trafficking"
                  stackId="1"
                  stroke="#E9C46A"
                  fill="#E9C46A"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="lg:col-span-1 h-[500px]">
          <Card
            title="Live Fraud Network"
            className="h-full"
            bodyClassName="p-0 h-full"
          >
            <NetworkGraph />
          </Card>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
