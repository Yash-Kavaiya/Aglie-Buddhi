/**
 * MCP Status Badge - Shows connected MCP count and opens settings
 */

import { Plug, Settings } from 'lucide-react';
import type { AgentType } from '../../types';
import { useMCP } from '../../context/MCPContext';

interface MCPStatusBadgeProps {
  agentId: AgentType;
  onClick: () => void;
  variant?: 'light' | 'dark';
}

export function MCPStatusBadge({ agentId, onClick, variant = 'light' }: MCPStatusBadgeProps) {
  const { getConnectedServers } = useMCP();
  const connectedServers = getConnectedServers(agentId);
  const count = connectedServers.length;

  const baseClasses = 'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer';
  const variantClasses = variant === 'light' 
    ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
    : 'bg-gray-100 hover:bg-gray-200 text-gray-700';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
      title="MCP Settings"
    >
      <Plug className="w-4 h-4" />
      <span>{count} MCP{count !== 1 ? 's' : ''}</span>
      {count > 0 && (
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      )}
      <Settings className="w-3.5 h-3.5 opacity-60" />
    </button>
  );
}
