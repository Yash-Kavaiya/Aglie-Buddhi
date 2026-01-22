/**
 * Core type definitions for DevOps AI Agents Frontend
 * Requirements: 1.2, 10.1
 */

export type AgentType =
  | 'cicd'
  | 'infrastructure'
  | 'monitoring'
  | 'security'
  | 'container'
  | 'cloud'
  | 'config'
  | 'incident';

export interface Agent {
  id: AgentType;
  name: string;
  description: string;
  icon: string;
  color: string;
  examplePrompts: string[];
  specialization: string;
}

export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  agentId: AgentType;
}

export interface ChatState {
  messages: Record<AgentType, Message[]>;
  isLoading: Record<AgentType, boolean>;
}

export interface ChatContextValue {
  state: ChatState;
  sendMessage: (agentId: AgentType, content: string) => Promise<void>;
  clearHistory: (agentId: AgentType) => void;
}

/**
 * MCP (Model Context Protocol) Types
 */
export type MCPCategory = 
  | 'version-control'
  | 'cloud-provider'
  | 'monitoring'
  | 'security'
  | 'container'
  | 'database'
  | 'notification'
  | 'documentation';

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: MCPCategory;
  endpoint?: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  capabilities: string[];
  supportedAgents: AgentType[];
  config?: Record<string, string>;
}

export interface MCPConnection {
  serverId: string;
  agentId: AgentType;
  connectedAt: Date;
  isActive: boolean;
}

export interface MCPContextValue {
  servers: MCPServer[];
  connections: MCPConnection[];
  connectServer: (serverId: string, agentId: AgentType, config?: Record<string, string>) => Promise<void>;
  disconnectServer: (serverId: string, agentId: AgentType) => void;
  getConnectedServers: (agentId: AgentType) => MCPServer[];
  getAvailableServers: (agentId: AgentType) => MCPServer[];
}
