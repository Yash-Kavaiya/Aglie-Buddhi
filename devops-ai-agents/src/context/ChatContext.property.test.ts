/**
 * Property-based tests for ChatContext persistence
 * **Feature: devops-ai-agents-frontend, Property 6: Chat history persistence round-trip**
 * **Validates: Requirements 10.5**
 */

import { describe, it, expect } from 'vitest';
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

// Arbitrary for generating valid Message with valid dates only
const validDateArb = fc.integer({ min: 1577836800000, max: 1893456000000 }).map(ts => new Date(ts));

const messageArb = (agentId: AgentType): fc.Arbitrary<Message> =>
  fc.record({
    id: fc.uuid(),
    role: fc.constantFrom<'user' | 'agent'>('user', 'agent'),
    content: fc.string({ minLength: 0, maxLength: 500 }),
    timestamp: validDateArb,
    agentId: fc.constant(agentId),
  });

// Arbitrary for generating valid ChatState
const chatStateArb: fc.Arbitrary<ChatState> = fc.record({
  messages: fc.tuple(
    fc.array(messageArb('cicd'), { minLength: 0, maxLength: 10 }),
    fc.array(messageArb('infrastructure'), { minLength: 0, maxLength: 10 }),
    fc.array(messageArb('monitoring'), { minLength: 0, maxLength: 10 }),
    fc.array(messageArb('security'), { minLength: 0, maxLength: 10 }),
    fc.array(messageArb('container'), { minLength: 0, maxLength: 10 }),
    fc.array(messageArb('cloud'), { minLength: 0, maxLength: 10 }),
    fc.array(messageArb('config'), { minLength: 0, maxLength: 10 }),
    fc.array(messageArb('incident'), { minLength: 0, maxLength: 10 }),
  ).map(([cicd, infrastructure, monitoring, security, container, cloud, config, incident]) => ({
    cicd,
    infrastructure,
    monitoring,
    security,
    container,
    cloud,
    config,
    incident,
  })),
  isLoading: fc.record({
    cicd: fc.boolean(),
    infrastructure: fc.boolean(),
    monitoring: fc.boolean(),
    security: fc.boolean(),
    container: fc.boolean(),
    cloud: fc.boolean(),
    config: fc.boolean(),
    incident: fc.boolean(),
  }),
});


describe('ChatContext Persistence', () => {
  /**
   * **Feature: devops-ai-agents-frontend, Property 6: Chat history persistence round-trip**
   * **Validates: Requirements 10.5**
   * 
   * For any chat history state, serializing to session storage and deserializing
   * SHALL produce an equivalent state object.
   */
  it('Property 6: serializing and deserializing chat state produces equivalent state', () => {
    fc.assert(
      fc.property(chatStateArb, (originalState) => {
        // Serialize the state
        const serialized = serializeChatState(originalState);
        
        // Deserialize the state
        const deserialized = deserializeChatState(serialized);
        
        // Should not be null
        expect(deserialized).not.toBeNull();
        
        if (deserialized === null) return false;
        
        // Check isLoading is preserved
        for (const agentType of ALL_AGENT_TYPES) {
          expect(deserialized.isLoading[agentType]).toBe(originalState.isLoading[agentType]);
        }
        
        // Check messages are preserved
        for (const agentType of ALL_AGENT_TYPES) {
          const originalMessages = originalState.messages[agentType];
          const deserializedMessages = deserialized.messages[agentType];
          
          expect(deserializedMessages.length).toBe(originalMessages.length);
          
          for (let i = 0; i < originalMessages.length; i++) {
            const original = originalMessages[i];
            const restored = deserializedMessages[i];
            
            expect(restored.id).toBe(original.id);
            expect(restored.role).toBe(original.role);
            expect(restored.content).toBe(original.content);
            expect(restored.agentId).toBe(original.agentId);
            // Timestamps should be equivalent (comparing ISO strings to handle Date precision)
            expect(restored.timestamp.toISOString()).toBe(original.timestamp.toISOString());
          }
        }
        
        return true;
      }),
      { numRuns: 50 }
    );
  }, 30000);

  it('deserializeChatState returns null for invalid JSON', () => {
    expect(deserializeChatState('not valid json')).toBeNull();
    expect(deserializeChatState('{}')).toBeNull();
    expect(deserializeChatState('{"messages": {}}')).toBeNull();
  });

  it('deserializeChatState handles missing agent arrays gracefully', () => {
    const partialState = {
      messages: {
        cicd: [],
        // Missing other agents
      },
      isLoading: {
        cicd: false,
        infrastructure: false,
        monitoring: false,
        security: false,
        container: false,
        cloud: false,
        config: false,
        incident: false,
      },
    };
    
    const result = deserializeChatState(JSON.stringify(partialState));
    expect(result).not.toBeNull();
    
    if (result) {
      // Missing agents should have empty arrays
      for (const agentType of ALL_AGENT_TYPES) {
        expect(Array.isArray(result.messages[agentType])).toBe(true);
      }
    }
  });
});
