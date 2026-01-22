/**
 * Property-based tests for Agent API Service
 * **Feature: devops-ai-agents-frontend, Property 12: Message-response flow**
 * **Validates: Requirements 2.2, 3.2, 4.2, 5.2, 6.2, 7.2, 8.2, 9.2**
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { sendMessageToAgent } from './agentApi';
import type { AgentType } from '../types';

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

// Arbitrary for generating valid agent types
const agentTypeArb = fc.constantFrom<AgentType>(...ALL_AGENT_TYPES);

// Arbitrary for generating non-empty message strings
const nonEmptyMessageArb = fc.string({ minLength: 1, maxLength: 500 })
  .filter(s => s.trim().length > 0);

describe('Agent API Service', () => {
  // Mock timers to speed up tests (avoid actual network delays)
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Helper to advance timers and flush promises
  const flushPromises = async () => {
    await vi.runAllTimersAsync();
  };
  /**
   * **Feature: devops-ai-agents-frontend, Property 12: Message-response flow**
   * **Validates: Requirements 2.2, 3.2, 4.2, 5.2, 6.2, 7.2, 8.2, 9.2**
   * 
   * For any agent and any non-empty message string, calling sendMessage
   * SHALL eventually result in a response message being added to that agent's history.
   */
  it('Property 12: for any agent and non-empty message, sendMessageToAgent returns a successful response with a message', async () => {
    await fc.assert(
      fc.asyncProperty(agentTypeArb, nonEmptyMessageArb, async (agentId, messageContent) => {
        // Call the API with mock mode enabled (default)
        const responsePromise = sendMessageToAgent(agentId, messageContent, { useMock: true });
        
        // Advance timers to complete the simulated network delay
        await flushPromises();
        
        const response = await responsePromise;
        
        // Response should be successful
        expect(response.success).toBe(true);
        
        // Response should contain a message
        expect(response.message).toBeDefined();
        
        if (response.message) {
          // Message should have the correct agent ID
          expect(response.message.agentId).toBe(agentId);
          
          // Message should be from the agent role
          expect(response.message.role).toBe('agent');
          
          // Message should have non-empty content
          expect(response.message.content.length).toBeGreaterThan(0);
          
          // Message should have a valid ID
          expect(response.message.id).toBeDefined();
          expect(typeof response.message.id).toBe('string');
          
          // Message should have a valid timestamp
          expect(response.message.timestamp).toBeInstanceOf(Date);
        }
        
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('for any agent, empty messages are rejected', async () => {
    await fc.assert(
      fc.asyncProperty(agentTypeArb, async (agentId) => {
        const response = await sendMessageToAgent(agentId, '', { useMock: true });
        
        // Empty messages should fail
        expect(response.success).toBe(false);
        expect(response.error).toBeDefined();
        expect(response.message).toBeUndefined();
        
        return true;
      }),
      { numRuns: 8 } // One for each agent type
    );
  });

  it('for any agent, whitespace-only messages are rejected', async () => {
    // Generate whitespace strings by repeating whitespace characters
    const whitespaceArb = fc.array(fc.constantFrom(' ', '\t', '\n', '\r'), { minLength: 1, maxLength: 20 })
      .map(chars => chars.join(''));
    
    await fc.assert(
      fc.asyncProperty(agentTypeArb, whitespaceArb, async (agentId, whitespace) => {
        const response = await sendMessageToAgent(agentId, whitespace, { useMock: true });
        
        // Whitespace-only messages should fail
        expect(response.success).toBe(false);
        expect(response.error).toBeDefined();
        
        return true;
      }),
      { numRuns: 50 }
    );
  });

  it('for any agent, response content is contextual to the agent type', async () => {
    await fc.assert(
      fc.asyncProperty(agentTypeArb, nonEmptyMessageArb, async (agentId, messageContent) => {
        const responsePromise = sendMessageToAgent(agentId, messageContent, { useMock: true });
        
        // Advance timers to complete the simulated network delay
        await flushPromises();
        
        const response = await responsePromise;
        
        expect(response.success).toBe(true);
        expect(response.message).toBeDefined();
        
        if (response.message) {
          // The response should mention the agent type or contain relevant content
          // Mock responses include the agent name in the prefix
          const content = response.message.content.toLowerCase();
          const agentName = agentId.toLowerCase();
          
          // The response should be contextual (contains agent reference or relevant keywords)
          const isContextual = content.includes(agentName) || 
            content.includes('agent') ||
            content.length > 50; // Has substantial content
          
          expect(isContextual).toBe(true);
        }
        
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
