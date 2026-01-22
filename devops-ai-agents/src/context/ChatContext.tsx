/**
 * Chat Context and Provider for managing chat state across all agents
 * Requirements: 10.2, 11.3
 */

import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import type { AgentType, ChatState, ChatContextValue, Message } from '../types';
import { sendMessageToAgent } from '../services/agentApi';

const STORAGE_KEY = 'devops-ai-agents-chat-state';

const ALL_AGENT_TYPES: AgentType[] = [
  'cicd',
  'infrastructure',
  'monitoring',
  'security',
  'container',
  'cloud',
  'config',
  'incident',
];

function createInitialState(): ChatState {
  const messages: Record<AgentType, Message[]> = {} as Record<AgentType, Message[]>;
  const isLoading: Record<AgentType, boolean> = {} as Record<AgentType, boolean>;

  for (const agentType of ALL_AGENT_TYPES) {
    messages[agentType] = [];
    isLoading[agentType] = false;
  }

  return { messages, isLoading };
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: { agentId: AgentType; isLoading: boolean } }
  | { type: 'CLEAR_HISTORY'; payload: AgentType }
  | { type: 'LOAD_STATE'; payload: ChatState };

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.agentId]: [
            ...state.messages[action.payload.agentId],
            action.payload,
          ],
        },
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.agentId]: action.payload.isLoading,
        },
      };

    case 'CLEAR_HISTORY':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload]: [],
        },
      };

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
}

interface SerializedMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  agentId: AgentType;
}

interface SerializedChatState {
  messages: Record<AgentType, SerializedMessage[]>;
  isLoading: Record<AgentType, boolean>;
}

export function serializeChatState(state: ChatState): string {
  const serialized: SerializedChatState = {
    messages: {} as Record<AgentType, SerializedMessage[]>,
    isLoading: state.isLoading,
  };

  for (const agentType of ALL_AGENT_TYPES) {
    serialized.messages[agentType] = state.messages[agentType].map((msg) => ({
      ...msg,
      timestamp: msg.timestamp.toISOString(),
    }));
  }

  return JSON.stringify(serialized);
}

export function deserializeChatState(json: string): ChatState | null {
  try {
    const parsed: SerializedChatState = JSON.parse(json);

    if (!parsed.messages || !parsed.isLoading) {
      return null;
    }

    const state: ChatState = {
      messages: {} as Record<AgentType, Message[]>,
      isLoading: parsed.isLoading,
    };

    for (const agentType of ALL_AGENT_TYPES) {
      const agentMessages = parsed.messages[agentType];
      if (!Array.isArray(agentMessages)) {
        state.messages[agentType] = [];
      } else {
        state.messages[agentType] = agentMessages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
    }

    return state;
  } catch {
    return null;
  }
}


function loadStateFromStorage(): ChatState {
  if (typeof window === 'undefined') {
    return createInitialState();
  }

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return createInitialState();
    }

    const deserialized = deserializeChatState(stored);
    return deserialized ?? createInitialState();
  } catch {
    return createInitialState();
  }
}

function saveStateToStorage(state: ChatState): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, serializeChatState(state));
  } catch {
    // Silently fail if storage is full or unavailable
  }
}

export const ChatContext = createContext<ChatContextValue | null>(null);

interface ChatProviderProps {
  children: React.ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, null, loadStateFromStorage);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  const sendMessage = useCallback(
    async (agentId: AgentType, content: string): Promise<void> => {
      // Add user message immediately
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        timestamp: new Date(),
        agentId,
      };

      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
      dispatch({ type: 'SET_LOADING', payload: { agentId, isLoading: true } });

      try {
        // Call the agent API service
        const response = await sendMessageToAgent(agentId, content);

        if (response.success && response.message) {
          dispatch({ type: 'ADD_MESSAGE', payload: response.message });
        } else {
          // Handle error by adding an error message
          const errorMessage: Message = {
            id: crypto.randomUUID(),
            role: 'agent',
            content: `Error: ${response.error || 'Failed to get response from agent. Please try again.'}`,
            timestamp: new Date(),
            agentId,
          };
          dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: { agentId, isLoading: false } });
      }
    },
    []
  );

  const clearHistory = useCallback((agentId: AgentType): void => {
    dispatch({ type: 'CLEAR_HISTORY', payload: agentId });
  }, []);

  const value: ChatContextValue = {
    state,
    sendMessage,
    clearHistory,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export { ALL_AGENT_TYPES };
