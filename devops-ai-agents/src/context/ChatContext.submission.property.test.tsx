/**
 * Property Test for Message Submission
 * **Feature: devops-ai-agents-frontend, Property 4: Message submission adds to history**
 * **Validates: Requirements 10.2**
 * 
 * Property 4: For any valid message string submitted to any agent, 
 * the chat state SHALL contain that message in the corresponding agent's message array 
 * immediately after submission.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import * as fc from 'fast-check';
import { ChatProvider, ChatContext } from './ChatContext';
import { useContext, useState, useEffect } from 'react';
import type { AgentType, ChatContextValue } from '../types';

// All agent types for property testing
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

// Mock the agentApi to avoid network delays in tests
vi.mock('../services/agentApi', () => ({
  sendMessageToAgent: vi.fn().mockImplementation(async (agentId: AgentType, content: string) => {
    return {
      success: true,
      message: {
        id: 'mock-response-id',
        role: 'agent' as const,
        content: `Mock response to: ${content}`,
        timestamp: new Date(),
        agentId,
      },
    };
  }),
}));

// Test component that captures chat state after sending a message
interface TestComponentProps {
  agentId: AgentType;
  messageToSend: string;
  onStateCapture: (state: ChatContextValue['state']) => void;
}

function TestComponent({ agentId, messageToSend, onStateCapture }: TestComponentProps) {
  const context = useContext(ChatContext);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    if (context && !messageSent && messageToSend) {
      // Send the message
      context.sendMessage(agentId, messageToSend);
      setMessageSent(true);
    }
  }, [context, agentId, messageToSend, messageSent]);

  useEffect(() => {
    if (context && messageSent) {
      // Capture state after message is sent
      onStateCapture(context.state);
    }
  }, [context, messageSent, onStateCapture]);

  if (!context) return null;

  return (
    <div data-testid="test-component">
      <span data-testid="message-count">
        {context.state.messages[agentId]?.length ?? 0}
      </span>
    </div>
  );
}

describe('Property 4: Message submission adds to history', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  /**
   * **Feature: devops-ai-agents-frontend, Property 4: Message submission adds to history**
   * 
   * For any valid (non-empty, trimmed) message string and any agent type,
   * after calling sendMessage, the user message should appear in that agent's message array.
   */
  it('for any valid message submitted to any agent, the message appears in that agent\'s history', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...ALL_AGENT_TYPES),
        fc.string({ minLength: 1, maxLength: 200 }).filter(s => s.trim().length > 0),
        async (agentId, messageContent) => {
          let capturedState: ChatContextValue['state'] | null = null;

          const handleStateCapture = (state: ChatContextValue['state']) => {
            capturedState = state;
          };

          const { unmount } = render(
            <ChatProvider>
              <TestComponent
                agentId={agentId}
                messageToSend={messageContent}
                onStateCapture={handleStateCapture}
              />
            </ChatProvider>
          );

          // Wait for the message to be added to state
          await waitFor(() => {
            expect(capturedState).not.toBeNull();
            expect(capturedState!.messages[agentId].length).toBeGreaterThan(0);
          }, { timeout: 2000 });

          // Verify the user message is in the history
          const agentMessages = capturedState!.messages[agentId];
          const userMessages = agentMessages.filter(m => m.role === 'user');
          
          // There should be at least one user message
          expect(userMessages.length).toBeGreaterThanOrEqual(1);
          
          // The user message content should match what was sent
          const sentMessage = userMessages.find(m => m.content === messageContent);
          expect(sentMessage).toBeDefined();
          expect(sentMessage!.agentId).toBe(agentId);
          expect(sentMessage!.role).toBe('user');

          unmount();
          sessionStorage.clear();
        }
      ),
      { numRuns: 50 } // Reduced for faster test execution
    );
  });

  /**
   * Verify that message submission is immediate (synchronous addition to state)
   */
  it('for any agent and message, the user message is added to history immediately (before API response)', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...ALL_AGENT_TYPES),
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        async (agentId, messageContent) => {
          let stateSnapshots: ChatContextValue['state'][] = [];

          // Component that captures state changes
          function StateTracker() {
            const context = useContext(ChatContext);
            const [sent, setSent] = useState(false);

            useEffect(() => {
              if (context && !sent) {
                // Capture initial state
                stateSnapshots.push(JSON.parse(JSON.stringify({
                  messages: Object.fromEntries(
                    Object.entries(context.state.messages).map(([k, v]) => [k, v.map(m => ({ ...m, timestamp: m.timestamp.toISOString() }))])
                  ),
                  isLoading: context.state.isLoading
                })));
                
                // Send message
                context.sendMessage(agentId, messageContent);
                setSent(true);
              }
            }, [context, sent]);

            useEffect(() => {
              if (context && sent) {
                // Capture state after send
                stateSnapshots.push(JSON.parse(JSON.stringify({
                  messages: Object.fromEntries(
                    Object.entries(context.state.messages).map(([k, v]) => [k, v.map(m => ({ ...m, timestamp: m.timestamp.toISOString() }))])
                  ),
                  isLoading: context.state.isLoading
                })));
              }
            }, [context, sent, context?.state]);

            return <div data-testid="tracker" />;
          }

          const { unmount } = render(
            <ChatProvider>
              <StateTracker />
            </ChatProvider>
          );

          // Wait for state updates
          await waitFor(() => {
            expect(stateSnapshots.length).toBeGreaterThanOrEqual(2);
          }, { timeout: 2000 });

          // The second snapshot should have the user message
          const afterSendState = stateSnapshots[1];
          const messages = afterSendState.messages[agentId];
          const userMessage = messages.find((m: { role: string; content: string }) => 
            m.role === 'user' && m.content === messageContent
          );
          
          expect(userMessage).toBeDefined();

          unmount();
          sessionStorage.clear();
          stateSnapshots = [];
        }
      ),
      { numRuns: 30 }
    );
  });

  /**
   * Verify that messages are added to the correct agent's history only
   */
  it('for any message sent to agent X, only agent X\'s history is modified', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...ALL_AGENT_TYPES),
        fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
        async (targetAgentId, messageContent) => {
          let initialCounts: Record<AgentType, number> = {} as Record<AgentType, number>;
          let finalCounts: Record<AgentType, number> = {} as Record<AgentType, number>;

          function CountTracker() {
            const context = useContext(ChatContext);
            const [sent, setSent] = useState(false);
            const [captured, setCaptured] = useState(false);

            useEffect(() => {
              if (context && !sent) {
                // Capture initial counts
                for (const agentId of ALL_AGENT_TYPES) {
                  initialCounts[agentId] = context.state.messages[agentId]?.length ?? 0;
                }
                context.sendMessage(targetAgentId, messageContent);
                setSent(true);
              }
            }, [context, sent]);

            useEffect(() => {
              if (context && sent && !captured) {
                // Capture final counts after a tick
                for (const agentId of ALL_AGENT_TYPES) {
                  finalCounts[agentId] = context.state.messages[agentId]?.length ?? 0;
                }
                setCaptured(true);
              }
            }, [context, sent, captured, context?.state]);

            return <div data-testid="count-tracker" />;
          }

          const { unmount } = render(
            <ChatProvider>
              <CountTracker />
            </ChatProvider>
          );

          await waitFor(() => {
            expect(finalCounts[targetAgentId]).toBeGreaterThan(initialCounts[targetAgentId] ?? 0);
          }, { timeout: 2000 });

          // Verify only target agent's count increased
          for (const agentId of ALL_AGENT_TYPES) {
            if (agentId === targetAgentId) {
              // Target agent should have more messages
              expect(finalCounts[agentId]).toBeGreaterThan(initialCounts[agentId]);
            } else {
              // Other agents should be unchanged
              expect(finalCounts[agentId]).toBe(initialCounts[agentId]);
            }
          }

          unmount();
          sessionStorage.clear();
          initialCounts = {} as Record<AgentType, number>;
          finalCounts = {} as Record<AgentType, number>;
        }
      ),
      { numRuns: 30 }
    );
  });
});
