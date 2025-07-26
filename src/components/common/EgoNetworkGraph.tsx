// src/components/common/EgoNetworkGraph.tsx
import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { mockNetworkNodes } from '../../utils/mockData'; // Untuk lookup data
import type { NetworkLink, NetworkNode } from '../../utils/types';

interface EgoNetworkGraphProps {
  centerNodeId: string;
  linkedEntities: { id: string; type: string }[];
}

const EgoNetworkGraph: React.FC<EgoNetworkGraphProps> = ({
  centerNodeId,
  linkedEntities,
}) => {
  const ref = React.useRef<SVGSVGElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;

    const centerNodeData = mockNetworkNodes.find(n => n.id === centerNodeId);
    if (!centerNodeData) return;

    const nodes: NetworkNode[] = [centerNodeData];
    const links: Omit<NetworkLink, 'type'>[] = [];

    linkedEntities.forEach(entity => {
      const linkedNodeData = mockNetworkNodes.find(n => n.id === entity.id) || {
        id: entity.id,
        name: entity.id,
        type: 'Individual',
        riskScore: 50,
      };
      if (!nodes.find(n => n.id === linkedNodeData.id)) {
        nodes.push(linkedNodeData);
      }
      links.push({ source: centerNodeId, target: entity.id });
    });

    const svg = d3.select(ref.current);
    const parent = svg.node()!.parentElement!;
    const width = parent.clientWidth;
    const height = parent.clientHeight || 250;

    svg.attr('viewBox', `0 0 ${width} ${height}`).selectAll('*').remove();

    const simulation = d3
      .forceSimulation<NetworkNode>(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(80)
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', theme === 'dark' ? '#2c3534' : '#e5e7eb')
      .attr('stroke-width', 1.5);

    const node = svg.append('g').selectAll('g').data(nodes).join('g');

    node
      .append('circle')
      .attr('r', d => (d.id === centerNodeId ? 15 : 10))
      .attr('fill', d =>
        d.id === centerNodeId
          ? '#2A9D8F'
          : d.riskScore > 80
          ? '#ef4444'
          : '#1A614F'
      )
      .attr('stroke', theme === 'dark' ? '#111816' : '#fff')
      .attr('stroke-width', 2);

    node
      .append('text')
      .text(d => d.name)
      .attr('x', d => (d.id === centerNodeId ? 20 : 15))
      .attr('y', 5)
      .style('font-size', '10px')
      .style('fill', theme === 'dark' ? '#e5e7eb' : '#111827');

    node.append('title').text(d => d.name);

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as NetworkNode).x!)
        .attr('y1', d => (d.source as NetworkNode).y!)
        .attr('x2', d => (d.target as NetworkNode).x!)
        .attr('y2', d => (d.target as NetworkNode).y!);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });
  }, [centerNodeId, linkedEntities, theme]);

  return <svg ref={ref} className="w-full h-full" />;
};

export default EgoNetworkGraph;
