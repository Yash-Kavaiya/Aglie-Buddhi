/**
 * Property-based tests for agent data
 * **Feature: devops-ai-agents-frontend, Property 1: Dashboard displays all agents**
 * **Validates: Requirements 1.1**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { agents } from './agents';
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

describe('Property 1: Dashboard displays all agents', () => {
  it('agents array contains exactly 8 agents', () => {
    expect(agents.length).toBe(8);
  });

  it('all agent ids are unique', () => {
    const ids = agents.map((agent) => agent.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(agents.length);
  });

  it('agents array contains all required agent types', () => {
    const agentIds = agents.map((agent) => agent.id);
    ALL_AGENT_TYPES.forEach((type) => {
      expect(agentIds).toContain(type);
    });
  });

  it('for any agent type, there exists exactly one agent with that id', () => {
    fc.assert(
      fc.property(fc.constantFrom(...ALL_AGENT_TYPES), (agentType) => {
        const matchingAgents = agents.filter((agent) => agent.id === agentType);
        return matchingAgents.length === 1;
      }),
      { numRuns: 100 }
    );
  });

  it('for any agent, all required fields are non-empty strings', () => {
    fc.assert(
      fc.property(fc.constantFrom(...agents), (agent) => {
        return (
          typeof agent.id === 'string' &&
          agent.id.length > 0 &&
          typeof agent.name === 'string' &&
          agent.name.length > 0 &&
          typeof agent.description === 'string' &&
          agent.description.length > 0 &&
          typeof agent.icon === 'string' &&
          agent.icon.length > 0 &&
          typeof agent.color === 'string' &&
          agent.color.length > 0 &&
          typeof agent.specialization === 'string' &&
          agent.specialization.length > 0 &&
          Array.isArray(agent.examplePrompts) &&
          agent.examplePrompts.length > 0
        );
      }),
      { numRuns: 100 }
    );
  });
});
