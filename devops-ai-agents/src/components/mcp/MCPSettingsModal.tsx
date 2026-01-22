/**
 * MCP Settings Modal - Manage MCP server connections for agents
 */

import { useState, useMemo } from 'react';
import {
  X,
  Settings,
  Check,
  Loader2,
  AlertCircle,
  Plug,
  Unplug,
  ChevronDown,
  ChevronUp,
  Search,
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
import type { AgentType, MCPServer } from '../../types';
import { useMCP } from '../../context/MCPContext';
import { getCategoryDisplayName } from '../../data/mcpServers';

interface MCPSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentId: AgentType;
  agentName: string;
  agentColor: string;
}

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

// Gradient map for agent colors
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

// Status colors
const statusColors: Record<string, string> = {
  connected: 'bg-emerald-500',
  disconnected: 'bg-gray-300',
  connecting: 'bg-amber-500',
  error: 'bg-red-500',
};

export function MCPSettingsModal({
  isOpen,
  onClose,
  agentId,
  agentName,
  agentColor,
}: MCPSettingsModalProps) {
  const { getConnectedServers, getAvailableServers, connectServer, disconnectServer } = useMCP();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['version-control', 'cloud-provider']));
  const [connectingServer, setConnectingServer] = useState<string | null>(null);

  const gradient = gradientMap[agentColor] || gradientMap.blue;

  const connectedServers = useMemo(() => getConnectedServers(agentId), [getConnectedServers, agentId]);
  const availableServers = useMemo(() => getAvailableServers(agentId), [getAvailableServers, agentId]);

  // Filter servers by search
  const filteredAvailable = useMemo(() => {
    if (!searchQuery) return availableServers;
    const query = searchQuery.toLowerCase();
    return availableServers.filter(
      server =>
        server.name.toLowerCase().includes(query) ||
        server.description.toLowerCase().includes(query)
    );
  }, [availableServers, searchQuery]);

  // Group available servers by category
  const serversByCategory = useMemo(() => {
    const groups: Record<string, MCPServer[]> = {};
    filteredAvailable.forEach(server => {
      if (!groups[server.category]) {
        groups[server.category] = [];
      }
      groups[server.category].push(server);
    });
    return groups;
  }, [filteredAvailable]);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleConnect = async (serverId: string) => {
    setConnectingServer(serverId);
    try {
      await connectServer(serverId, agentId);
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setConnectingServer(null);
    }
  };

  const handleDisconnect = (serverId: string) => {
    disconnectServer(serverId, agentId);
  };

  const getServerIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Settings;
    return Icon;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in">
        {/* Header */}
        <div className={`relative px-6 py-5 bg-gradient-to-r ${gradient} overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Plug className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">MCP Settings</h2>
                <p className="text-sm text-white/80">{agentName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Connected MCPs Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Connected MCPs ({connectedServers.length})
              </h3>
            </div>

            {connectedServers.length === 0 ? (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <Unplug className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No MCPs connected yet</p>
                <p className="text-xs text-gray-400 mt-1">Connect MCPs below to enhance this agent's capabilities</p>
              </div>
            ) : (
              <div className="space-y-2">
                {connectedServers.map(server => {
                  const Icon = getServerIcon(server.icon);
                  return (
                    <div
                      key={server.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900">{server.name}</h4>
                          <span className={`w-2 h-2 rounded-full ${statusColors[server.status]}`} />
                        </div>
                        <p className="text-xs text-gray-500 truncate">{server.capabilities.join(', ')}</p>
                      </div>
                      <button
                        onClick={() => handleDisconnect(server.id)}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
                      >
                        <Unplug className="w-4 h-4" />
                        Disconnect
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Available MCPs Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Available MCPs
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search MCPs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
              </div>
            </div>

            {Object.keys(serversByCategory).length === 0 ? (
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
                <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">All available MCPs are connected!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(serversByCategory).map(([category, categoryServers]) => (
                  <div key={category} className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {getCategoryDisplayName(category)} ({categoryServers.length})
                      </span>
                      {expandedCategories.has(category) ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>

                    {/* Category Servers */}
                    {expandedCategories.has(category) && (
                      <div className="divide-y divide-gray-100">
                        {categoryServers.map(server => {
                          const Icon = getServerIcon(server.icon);
                          const isConnecting = connectingServer === server.id;
                          const hasError = server.status === 'error';

                          return (
                            <div
                              key={server.id}
                              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Icon className="w-5 h-5 text-gray-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-gray-900">{server.name}</h4>
                                  {hasError && (
                                    <span className="text-xs text-red-500 flex items-center gap-1">
                                      <AlertCircle className="w-3 h-3" />
                                      Error
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 truncate">{server.description}</p>
                              </div>
                              <button
                                onClick={() => handleConnect(server.id)}
                                disabled={isConnecting}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                                  isConnecting
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : `bg-gradient-to-r ${gradient} text-white shadow-sm hover:shadow-md hover:scale-105`
                                }`}
                              >
                                {isConnecting ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Connecting...
                                  </>
                                ) : (
                                  <>
                                    <Plug className="w-4 h-4" />
                                    Connect
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>MCPs extend agent capabilities with external tools</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
