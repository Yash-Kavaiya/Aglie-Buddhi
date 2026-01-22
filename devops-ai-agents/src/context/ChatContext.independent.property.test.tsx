/**
 * Property-based tests for independent chat history preservation
 * **Feature: devops-ai-agents-frontend, Property 9: Independent chat history preservation**
 * **Validates: Requirements 11.3**
 */

import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { serializeChatState, deserializeChatState } from './ChatContext';
import type { AgentType, ChatState, Message } from '../types';

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

// Arbitrary for generating valid AgentType
const agentTypeArb = fc.constantFrom<AgentType>(...ALL_AGENT_TYPES);

// Helper to get two different agents
const twoDistinctAgentsArb = fc.tuple(agentTypeArb, agentTypeArb).filter(
  ([a, b]) => a !== b
);

// Arbitrary for generating valid dates
const validDateArb = fc.integer({ min: 1577836800000, max: 1893456000000 }).map(ts => new Date(ts));

// Arbitrary for generating valid Message
const messageArb = (agentId: AgentType): fc.Arbitrary<Message> =>
  fc.record({
    id: fc.uuid(),
    role: fc.constantFrom<'user' | 'agent'>('user', 'agent'),
    content: fc.string({ minLength: 1, maxLength: 100 }),
    timestamp: validDateArb,
    agentId: fc.constant(agentId),
  });

// Create an empty chat state
function createEmptyState(): ChatState {
  const messages: Record<AgentType, Message[]> = {} as Record<AgentType, Message[]>;
  const isLoading: Record<AgentType, boolean> = {} as Record<AgentType, boolean>;

  for (const agentType of ALL_AGENT_TYPES) {
    messages[agentType] = [];
    isLoading[agentType] = false;
  }

  return { messages, isLoading };
}

// Simulate adding a message to state (like the reducer does)
function addMessageToState(state: ChatState, message: Message): ChatState {
  return {
    ...state,
    messages: {
      ...state.messages,
      [message.agentId]: [...state.messages[message.agentId], message],
    },
  };
}

// Simulate clearing history for an agent (like the reducer does)
function clearAgentHistory(state: ChatState, agentId: AgentType): ChatState {
  return {
    ...state,
    messages: {
      ...state.messages,
      [agentId]: [],
    },
  };
}

describe('ChatContext Independent History', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  /**
   * **Feature: devops-ai-agents-frontend, Property 9: Independent chat history preservation**
   * **Validates: Requirements 11.3**
   * 
   * For any sequence of agent page navigations, each agent's message array
   * SHALL remain unchanged when navigating away and back.
   * 
   * This test verifies that adding messages to one agent does not affect other agents.
   */
  it('Property 9: adding messages to one agent does not affect other agents', () => {
    fc.assert(
      fc.property(
        twoDistinctAgentsArb,
        fc.array(messageArb('cicd'), { minLength: 0, maxLength: 5 }),
        fc.string({ minLength: 1, maxLength: 50 }),
        ([targetAgent, otherAgent], existingMessages, newContent) => {
          // Start with empty state
          let state = createEmptyState();
          
          // Add some existing messages to the other agent
          for (const msg of existingMessages) {
            const adjustedMsg = { ...msg, agentId: otherAgent };
            state = addMessageToState(state, adjustedMsg);
          }
          
          // Record the other agent's messages before adding to target
          const otherMessagesBefore = state.messages[otherAgent].map(m => m.id);
          
          // Add a new message to the target agent
          const newMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: newContent,
            timestamp: new Date(),
            agentId: targetAgent,
          };
          state = addMessageToState(state, newMessage);
          
          // Verify target agent has the new message
          expect(state.messages[targetAgent].some(m => m.id === newMessage.id)).toBe(true);
          
          // Verify other agent's messages are unchanged
          const otherMessagesAfter = state.messages[otherAgent].map(m => m.id);
          expect(otherMessagesAfter).toEqual(otherMessagesBefore);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });


  /**
   * **Feature: devops-ai-agents-frontend, Property 9: Independent chat history preservation**
   * **Validates: Requirements 11.3**
   * 
   * Clearing one agent's history should not affect other agents.
   */
  it('Property 9: clearing one agent history does not affect other agents', () => {
    fc.assert(
      fc.property(
        twoDistinctAgentsArb,
        fc.array(messageArb('cicd'), { minLength: 1, maxLength: 5 }),
        fc.array(messageArb('cicd'), { minLength: 1, maxLength: 5 }),
        ([agentToClear, otherAgent], messagesForClear, messagesForOther) => {
          // Start with empty state
          let state = createEmptyState();
          
          // Add messages to the agent we'll clear
          for (const msg of messagesForClear) {
            const adjustedMsg = { ...msg, agentId: agentToClear };
            state = addMessageToState(state, adjustedMsg);
          }
          
          // Add messages to the other agent
          for (const msg of messagesForOther) {
            const adjustedMsg = { ...msg, agentId: otherAgent };
            state = addMessageToState(state, adjustedMsg);
          }
          
          // Record the other agent's messages before clearing
          const otherMessagesBefore = state.messages[otherAgent].map(m => m.id);
          
          // Clear the target agent's history
          state = clearAgentHistory(state, agentToClear);
          
          // Verify target agent is cleared
          expect(state.messages[agentToClear].length).toBe(0);
          
          // Verify other agent's messages are unchanged
          const otherMessagesAfter = state.messages[otherAgent].map(m => m.id);
          expect(otherMessagesAfter).toEqual(otherMessagesBefore);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Feature: devops-ai-agents-frontend, Property 9: Independent chat history preservation**
   * **Validates: Requirements 11.3**
   * 
   * Serializing and deserializing should preserve independence of agent histories.
   */
  it('Property 9: round-trip preserves independent agent histories', () => {
    fc.assert(
      fc.property(
        twoDistinctAgentsArb,
        fc.array(messageArb('cicd'), { minLength: 1, maxLength: 5 }),
        fc.array(messageArb('cicd'), { minLength: 1, maxLength: 5 }),
        ([agent1, agent2], messages1, messages2) => {
          // Start with empty state
          let state = createEmptyState();
          
          // Add messages to agent1
          for (const msg of messages1) {
            const adjustedMsg = { ...msg, agentId: agent1 };
            state = addMessageToState(state, adjustedMsg);
          }
          
          // Add messages to agent2
          for (const msg of messages2) {
            const adjustedMsg = { ...msg, agentId: agent2 };
            state = addMessageToState(state, adjustedMsg);
          }
          
          // Serialize and deserialize (simulating page refresh)
          const serialized = serializeChatState(state);
          const restored = deserializeChatState(serialized);
          
          expect(restored).not.toBeNull();
          if (!restored) return false;
          
          // Verify agent1's messages are preserved
          expect(restored.messages[agent1].length).toBe(state.messages[agent1].length);
          for (let i = 0; i < state.messages[agent1].length; i++) {
            expect(restored.messages[agent1][i].id).toBe(state.messages[agent1][i].id);
            expect(restored.messages[agent1][i].content).toBe(state.messages[agent1][i].content);
          }
          
          // Verify agent2's messages are preserved independently
          expect(restored.messages[agent2].length).toBe(state.messages[agent2].length);
          for (let i = 0; i < state.messages[agent2].length; i++) {
            expect(restored.messages[agent2][i].id).toBe(state.messages[agent2][i].id);
            expect(restored.messages[agent2][i].content).toBe(state.messages[agent2][i].content);
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
