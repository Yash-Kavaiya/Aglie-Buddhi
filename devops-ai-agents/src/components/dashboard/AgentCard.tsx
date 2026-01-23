/**
 * AgentCard component - Displays agent info in a clickable card
 * Requirements: 1.2, 1.3
 */

import { useNavigate } from 'react-router-dom';
import {
  GitBranch,
  Server,
  Activity,
  Shield,
  Box,
  Cloud,
  Settings,
  AlertTriangle,
  ArrowRight,
  Plug,
} from 'lucide-react';
import type { Agent } from '../../types';
import { useMCP } from '../../context/MCPContext';

interface AgentCardProps {
  agent: Agent;
}

// Map agent icon strings to Lucide components
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GitBranch,
  Server,
  Activity,
  Shield,
  Box,
  Cloud,
  Settings,
  AlertTriangle,
};

// Map agent colors to gradient classes - Google colors
const gradientMap: Record<string, string> = {
  blue: 'from-[#4285f4] to-[#1967d2]',
  green: 'from-[#34a853] to-[#188038]',
  yellow: 'from-[#fbbc04] to-[#f29900]',
  red: 'from-[#ea4335] to-[#c5221f]',
  cyan: 'from-[#4285f4] to-[#1967d2]',
  purple: 'from-[#4285f4] to-[#1967d2]',
  orange: 'from-[#fbbc04] to-[#f29900]',
  pink: 'from-[#ea4335] to-[#c5221f]',
};

// Map agent colors to light background classes - Google colors
const bgLightMap: Record<string, string> = {
  blue: 'bg-blue-50 group-hover:bg-blue-100',
  green: 'bg-green-50 group-hover:bg-green-100',
  yellow: 'bg-yellow-50 group-hover:bg-yellow-100',
  red: 'bg-red-50 group-hover:bg-red-100',
  cyan: 'bg-blue-50 group-hover:bg-blue-100',
  purple: 'bg-blue-50 group-hover:bg-blue-100',
  orange: 'bg-yellow-50 group-hover:bg-yellow-100',
  pink: 'bg-red-50 group-hover:bg-red-100',
};

// Map agent colors to text classes - Google colors
const textColorMap: Record<string, string> = {
  blue: 'text-[#4285f4]',
  green: 'text-[#34a853]',
  yellow: 'text-[#fbbc04]',
  red: 'text-[#ea4335]',
  cyan: 'text-[#4285f4]',
  purple: 'text-[#4285f4]',
  orange: 'text-[#fbbc04]',
  pink: 'text-[#ea4335]',
};

// Map agent colors to ring classes - Google colors
const ringColorMap: Record<string, string> = {
  blue: 'focus:ring-[#4285f4]/20',
  green: 'focus:ring-[#34a853]/20',
  yellow: 'focus:ring-[#fbbc04]/20',
  red: 'focus:ring-[#ea4335]/20',
  cyan: 'focus:ring-[#4285f4]/20',
  purple: 'focus:ring-[#4285f4]/20',
  orange: 'focus:ring-[#fbbc04]/20',
  pink: 'focus:ring-[#ea4335]/20',
};

export function AgentCard({ agent }: AgentCardProps) {
  const navigate = useNavigate();
  const { getConnectedServers } = useMCP();
  const IconComponent = iconMap[agent.icon];
  const gradient = gradientMap[agent.color] || 'from-gray-500 to-gray-600';
  const bgLight = bgLightMap[agent.color] || 'bg-gray-50';
  const textColor = textColorMap[agent.color] || 'text-gray-600';
  const ringColor = ringColorMap[agent.color] || 'focus:ring-gray-500/30';
  
  const connectedMCPs = getConnectedServers(agent.id);
  const mcpCount = connectedMCPs.length;

  const handleClick = () => {
    navigate(`/agent/${agent.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`group w-full text-left p-6 bg-white rounded-2xl border border-[#dadce0] hover:shadow-glow transition-all duration-200 focus:outline-none focus:ring-2 ${ringColor}`}
      data-testid={`agent-card-${agent.id}`}
      data-agent-id={agent.id}
    >
      {/* Top row with icon and arrow */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon with gradient background - Google style */}
        <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} transition-transform duration-200 group-hover:scale-105`}>
          {IconComponent && <IconComponent size={24} className="text-white" />}
          {/* MCP indicator badge */}
          {mcpCount > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#34a853] text-white text-xs font-medium flex items-center justify-center ring-2 ring-white">
              {mcpCount}
            </div>
          )}
        </div>
        
        {/* Arrow indicator */}
        <div className={`p-2 rounded-full ${bgLight} transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0`}>
          <ArrowRight size={18} className={textColor} />
        </div>
      </div>

      {/* Name - Google typography */}
      <h3 className="text-base font-medium text-[#202124] mb-2" data-testid="agent-card-name">
        {agent.name}
      </h3>

      {/* Description - Google typography */}
      <p className="text-sm text-[#5f6368] leading-relaxed line-clamp-2" data-testid="agent-card-description">
        {agent.description}
      </p>

      {/* Bottom indicator bar */}
      <div className="mt-5 pt-4 border-t border-[#e8eaed]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`} />
            <span className="text-xs text-[#5f6368] font-normal">Ready to assist</span>
          </div>
          {mcpCount > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-[#34a853] font-medium">
              <Plug size={13} />
              <span>{mcpCount} MCP{mcpCount !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
