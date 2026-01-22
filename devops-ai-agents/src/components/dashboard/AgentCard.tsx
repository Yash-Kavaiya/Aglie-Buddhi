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

// Map agent colors to gradient classes
const gradientMap: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-emerald-500 to-emerald-600',
  yellow: 'from-amber-500 to-amber-600',
  red: 'from-red-500 to-red-600',
  cyan: 'from-cyan-500 to-cyan-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
  pink: 'from-pink-500 to-pink-600',
};

// Map agent colors to light background classes
const bgLightMap: Record<string, string> = {
  blue: 'bg-blue-50 group-hover:bg-blue-100',
  green: 'bg-emerald-50 group-hover:bg-emerald-100',
  yellow: 'bg-amber-50 group-hover:bg-amber-100',
  red: 'bg-red-50 group-hover:bg-red-100',
  cyan: 'bg-cyan-50 group-hover:bg-cyan-100',
  purple: 'bg-purple-50 group-hover:bg-purple-100',
  orange: 'bg-orange-50 group-hover:bg-orange-100',
  pink: 'bg-pink-50 group-hover:bg-pink-100',
};

// Map agent colors to text classes
const textColorMap: Record<string, string> = {
  blue: 'text-blue-600',
  green: 'text-emerald-600',
  yellow: 'text-amber-600',
  red: 'text-red-600',
  cyan: 'text-cyan-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600',
  pink: 'text-pink-600',
};

// Map agent colors to ring classes
const ringColorMap: Record<string, string> = {
  blue: 'focus:ring-blue-500/30',
  green: 'focus:ring-emerald-500/30',
  yellow: 'focus:ring-amber-500/30',
  red: 'focus:ring-red-500/30',
  cyan: 'focus:ring-cyan-500/30',
  purple: 'focus:ring-purple-500/30',
  orange: 'focus:ring-orange-500/30',
  pink: 'focus:ring-pink-500/30',
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
      className={`group w-full text-left p-5 bg-white rounded-2xl border border-gray-200/80 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 ${ringColor}`}
      data-testid={`agent-card-${agent.id}`}
      data-agent-id={agent.id}
    >
      {/* Top row with icon and arrow */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon with gradient background */}
        <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-${agent.color}-500/25 transition-transform duration-300 group-hover:scale-110`}>
          {IconComponent && <IconComponent size={22} className="text-white" />}
          {/* MCP indicator badge */}
          {mcpCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white">
              {mcpCount}
            </div>
          )}
        </div>
        
        {/* Arrow indicator */}
        <div className={`p-2 rounded-full ${bgLight} transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0`}>
          <ArrowRight size={16} className={textColor} />
        </div>
      </div>

      {/* Name */}
      <h3 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-gray-800" data-testid="agent-card-name">
        {agent.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2" data-testid="agent-card-description">
        {agent.description}
      </p>

      {/* Bottom indicator bar */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient} animate-pulse`} />
            <span className="text-xs text-gray-400 font-medium">Ready to assist</span>
          </div>
          {mcpCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
              <Plug size={12} />
              <span>{mcpCount} MCP{mcpCount !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
