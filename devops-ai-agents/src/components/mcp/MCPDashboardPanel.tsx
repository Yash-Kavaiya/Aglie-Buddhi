/**
 * Global MCP Settings Panel for Dashboard
 * Shows all MCP connections across all agents
 */

import { useState, useMemo } from 'react';
import {
  Plug,
  Settings,
  ChevronRight,
  Zap,
  Github,
  GitBranch,
  Cloud,
  Activity,
  Shield,
  Box,
  Database,
  MessageSquare,
  Bell,
  FileText,
  BookOpen,
  Layers,
  KeyRound,
  BarChart3,
} from 'lucide-react';
import { useMCP } from '../../context/MCPContext';
import type { AgentType } from '../../types';
import { agents } from '../../data/agents';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Github,
  GitBranch,
  Cloud,
  Activity,
  Shield,
  Box,
  Database,
  MessageSquare,
  Bell,
  FileText,
  BookOpen,
  Layers,
  KeyRound,
  Settings,
  BarChart3,
  Container: Box,
};

// Agent color gradients
const agentGradients: Record<string, string> = {
  cicd: 'from-blue-500 to-blue-600',
  infrastructure: 'from-emerald-500 to-emerald-600',
  monitoring: 'from-amber-500 to-amber-600',
  security: 'from-red-500 to-red-600',
  container: 'from-cyan-500 to-cyan-600',
  cloud: 'from-purple-500 to-purple-600',
  config: 'from-orange-500 to-orange-600',
  incident: 'from-pink-500 to-pink-600',
};

interface MCPDashboardPanelProps {
  onAgentClick?: (agentId: AgentType) => void;
}

export function MCPDashboardPanel({ onAgentClick }: MCPDashboardPanelProps) {
  const { servers, connections, getConnectedServers } = useMCP();
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate stats
  const totalConnections = connections.length;
  const activeServers = servers.filter(s => s.status === 'connected').length;

  // Get connections grouped by agent
  const connectionsByAgent = useMemo(() => {
    const grouped: Record<AgentType, typeof servers> = {} as Record<AgentType, typeof servers>;
    agents.forEach(agent => {
      grouped[agent.id] = getConnectedServers(agent.id);
    });
    return grouped;
  }, [getConnectedServers]);

  const agentsWithConnections = agents.filter(agent => connectionsByAgent[agent.id].length > 0);

  const getServerIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Settings;
    return Icon;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-soft overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Plug className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold">MCP Connections</h3>
            <p className="text-sm text-white/80">
              {activeServers} server{activeServers !== 1 ? 's' : ''} connected • {totalConnections} agent connection{totalConnections !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <ChevronRight 
          className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
        />
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-6">
          {agentsWithConnections.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">No MCPs Connected</h4>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Visit any agent page and click the MCP badge to connect external tools and enhance agent capabilities.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {agentsWithConnections.map(agent => {
                const connectedServers = connectionsByAgent[agent.id];
                const gradient = agentGradients[agent.id];

                return (
                  <div
                    key={agent.id}
                    className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                    onClick={() => onAgentClick?.(agent.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                          <span className="text-white text-xs font-bold">
                            {agent.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{agent.name}</h4>
                          <p className="text-xs text-gray-500">{connectedServers.length} MCP{connectedServers.length !== 1 ? 's' : ''} connected</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {connectedServers.map(server => {
                        const Icon = getServerIcon(server.icon);
                        return (
                          <div
                            key={server.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium"
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {server.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
