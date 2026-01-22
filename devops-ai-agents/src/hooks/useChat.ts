/**
 * Custom hook for accessing chat state and actions
 * Requirements: 10.2, 10.5
 */

import { useContext, useMemo } from 'react';
import { ChatContext } from '../context/ChatContext';
import type { AgentType, Message, ChatContextValue } from '../types';

interface UseChatResult {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearHistory: () => void;
  allMessages: ChatContextValue['state']['messages'];
}

/**
 * Hook to access chat functionality for a specific agent
 * @param agentId - The agent to get chat state for
 * @returns Chat state and actions filtered by the specified agent
 */
export function useChat(agentId: AgentType): UseChatResult {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  const { state, sendMessage: contextSendMessage, clearHistory: contextClearHistory } = context;

  const messages = useMemo(() => {
    return state.messages[agentId] ?? [];
  }, [state.messages, agentId]);

  const isLoading = state.isLoading[agentId] ?? false;

  const sendMessage = useMemo(() => {
    return (content: string) => contextSendMessage(agentId, content);
  }, [contextSendMessage, agentId]);

  const clearHistory = useMemo(() => {
    return () => contextClearHistory(agentId);
  }, [contextClearHistory, agentId]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearHistory,
    allMessages: state.messages,
  };
}

/**
 * Hook to access the full chat context
 * Useful for components that need access to all agents' state
 */
export function useChatContext(): ChatContextValue {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }

  return context;
}
