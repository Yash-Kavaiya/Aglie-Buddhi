/**
 * MCP Context and Provider for managing MCP server connections
 */

import React, { createContext, useReducer, useEffect, useCallback, useContext } from 'react';
import type { MCPServer, MCPConnection, MCPContextValue, AgentType } from '../types';
import { mcpServers as initialServers } from '../data/mcpServers';

const MCP_STORAGE_KEY = 'devops-ai-agents-mcp-connections';

interface MCPState {
  servers: MCPServer[];
  connections: MCPConnection[];
}

type MCPAction =
  | { type: 'SET_SERVER_STATUS'; payload: { serverId: string; status: MCPServer['status'] } }
  | { type: 'ADD_CONNECTION'; payload: MCPConnection }
  | { type: 'REMOVE_CONNECTION'; payload: { serverId: string; agentId: AgentType } }
  | { type: 'LOAD_STATE'; payload: MCPState }
  | { type: 'UPDATE_SERVER_CONFIG'; payload: { serverId: string; config: Record<string, string> } };

function mcpReducer(state: MCPState, action: MCPAction): MCPState {
  switch (action.type) {
    case 'SET_SERVER_STATUS':
      return {
        ...state,
        servers: state.servers.map(server =>
          server.id === action.payload.serverId
            ? { ...server, status: action.payload.status }
            : server
        ),
      };

    case 'ADD_CONNECTION':
      return {
        ...state,
        connections: [...state.connections, action.payload],
      };

    case 'REMOVE_CONNECTION':
      return {
        ...state,
        connections: state.connections.filter(
          conn => !(conn.serverId === action.payload.serverId && conn.agentId === action.payload.agentId)
        ),
      };

    case 'UPDATE_SERVER_CONFIG':
      return {
        ...state,
        servers: state.servers.map(server =>
          server.id === action.payload.serverId
            ? { ...server, config: action.payload.config }
            : server
        ),
      };

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
}

function createInitialState(): MCPState {
  return {
    servers: initialServers,
    connections: [],
  };
}

export const MCPContext = createContext<MCPContextValue | null>(null);

interface MCPProviderProps {
  children: React.ReactNode;
}

export function MCPProvider({ children }: MCPProviderProps) {
  const [state, dispatch] = useReducer(mcpReducer, null, createInitialState);

  // Load saved connections from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MCP_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.connections) {
          // Restore connections with proper date parsing
          const connections = parsed.connections.map((conn: MCPConnection & { connectedAt: string }) => ({
            ...conn,
            connectedAt: new Date(conn.connectedAt),
          }));
          
          // Update server statuses based on connections
          const servers = initialServers.map(server => {
            const hasConnection = connections.some((c: MCPConnection) => c.serverId === server.id && c.isActive);
            return {
              ...server,
              status: hasConnection ? 'connected' as const : 'disconnected' as const,
              config: parsed.serverConfigs?.[server.id] || server.config,
            };
          });

          dispatch({ type: 'LOAD_STATE', payload: { servers, connections } });
        }
      }
    } catch (error) {
      console.error('Failed to load MCP state:', error);
    }
  }, []);

  // Save connections to localStorage
  useEffect(() => {
    try {
      const serverConfigs: Record<string, Record<string, string>> = {};
      state.servers.forEach(server => {
        if (server.config) {
          serverConfigs[server.id] = server.config;
        }
      });

      localStorage.setItem(MCP_STORAGE_KEY, JSON.stringify({
        connections: state.connections,
        serverConfigs,
      }));
    } catch (error) {
      console.error('Failed to save MCP state:', error);
    }
  }, [state.connections, state.servers]);

  const connectServer = useCallback(async (
    serverId: string,
    agentId: AgentType,
    config?: Record<string, string>
  ) => {
    // Set connecting status
    dispatch({ type: 'SET_SERVER_STATUS', payload: { serverId, status: 'connecting' } });

    // Update config if provided
    if (config) {
      dispatch({ type: 'UPDATE_SERVER_CONFIG', payload: { serverId, config } });
    }

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate connection (in real app, this would connect to actual MCP server)
    const success = Math.random() > 0.1; // 90% success rate for demo

    if (success) {
      dispatch({ type: 'SET_SERVER_STATUS', payload: { serverId, status: 'connected' } });
      dispatch({
        type: 'ADD_CONNECTION',
        payload: {
          serverId,
          agentId,
          connectedAt: new Date(),
          isActive: true,
        },
      });
    } else {
      dispatch({ type: 'SET_SERVER_STATUS', payload: { serverId, status: 'error' } });
      throw new Error('Failed to connect to MCP server');
    }
  }, []);

  const disconnectServer = useCallback((serverId: string, agentId: AgentType) => {
    dispatch({ type: 'REMOVE_CONNECTION', payload: { serverId, agentId } });
    
    // Check if any other agents are still connected to this server
    const remainingConnections = state.connections.filter(
      conn => conn.serverId === serverId && conn.agentId !== agentId
    );
    
    if (remainingConnections.length === 0) {
      dispatch({ type: 'SET_SERVER_STATUS', payload: { serverId, status: 'disconnected' } });
    }
  }, [state.connections]);

  const getConnectedServers = useCallback((agentId: AgentType): MCPServer[] => {
    const connectedIds = state.connections
      .filter(conn => conn.agentId === agentId && conn.isActive)
      .map(conn => conn.serverId);
    
    return state.servers.filter(server => connectedIds.includes(server.id));
  }, [state.servers, state.connections]);

  const getAvailableServers = useCallback((agentId: AgentType): MCPServer[] => {
    const connectedIds = state.connections
      .filter(conn => conn.agentId === agentId && conn.isActive)
      .map(conn => conn.serverId);
    
    return state.servers.filter(
      server => server.supportedAgents.includes(agentId) && !connectedIds.includes(server.id)
    );
  }, [state.servers, state.connections]);

  const value: MCPContextValue = {
    servers: state.servers,
    connections: state.connections,
    connectServer,
    disconnectServer,
    getConnectedServers,
    getAvailableServers,
  };

  return (
    <MCPContext.Provider value={value}>
      {children}
    </MCPContext.Provider>
  );
}

export function useMCP(): MCPContextValue {
  const context = useContext(MCPContext);
  if (!context) {
    throw new Error('useMCP must be used within an MCPProvider');
  }
  return context;
}
