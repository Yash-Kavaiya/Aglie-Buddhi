/**
 * Property-based tests for AgentCard component
 * **Feature: devops-ai-agents-frontend, Property 2: Agent card contains required information**
 * **Validates: Requirements 1.2**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AgentCard } from './AgentCard';
import { agents } from '../../data/agents';

// Wrapper component for routing context
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}

describe('Property 2: Agent card contains required information', () => {
  it('for any agent, the rendered card contains the agent name', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(fc.constantFrom(...agents), (agent) => {
        const { unmount } = render(
          <TestWrapper>
            <AgentCard agent={agent} />
          </TestWrapper>
        );

        const nameElement = screen.getByTestId('agent-card-name');
        const containsName = nameElement.textContent === agent.name;

        unmount();
        return containsName;
      }),
      { numRuns: 100 }
    );
  });

  it('for any agent, the rendered card contains the agent description', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(fc.constantFrom(...agents), (agent) => {
        const { unmount } = render(
          <TestWrapper>
            <AgentCard agent={agent} />
          </TestWrapper>
        );

        const descElement = screen.getByTestId('agent-card-description');
        const containsDescription = descElement.textContent === agent.description;

        unmount();
        return containsDescription;
      }),
      { numRuns: 100 }
    );
  });

  it('for any agent, the rendered card has the correct agent id data attribute', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(fc.constantFrom(...agents), (agent) => {
        const { unmount } = render(
          <TestWrapper>
            <AgentCard agent={agent} />
          </TestWrapper>
        );

        const cardElement = screen.getByTestId(`agent-card-${agent.id}`);
        const hasCorrectId = cardElement.getAttribute('data-agent-id') === agent.id;

        unmount();
        return hasCorrectId;
      }),
      { numRuns: 100 }
    );
  });

  it('for any agent, the card is rendered as a clickable button', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(fc.constantFrom(...agents), (agent) => {
        const { unmount } = render(
          <TestWrapper>
            <AgentCard agent={agent} />
          </TestWrapper>
        );

        const cardElement = screen.getByTestId(`agent-card-${agent.id}`);
        const isButton = cardElement.tagName.toLowerCase() === 'button';

        unmount();
        return isButton;
      }),
      { numRuns: 100 }
    );
  });
});
