/**
 * Property-based tests for AgentCard navigation
 * **Feature: devops-ai-agents-frontend, Property 3: Agent card navigation**
 * **Validates: Requirements 1.3**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { AgentCard } from './AgentCard';
import { agents } from '../../data/agents';

// Component to capture the current location
function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
}

// Test wrapper with MemoryRouter to track navigation
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter initialEntries={['/']}>
      {children}
      <LocationDisplay />
    </MemoryRouter>
  );
}

describe('Property 3: Agent card navigation', () => {
  it('for any agent card click, navigation routes to /agent/{agentId}', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(fc.constantFrom(...agents), (agent) => {
        const { unmount } = render(
          <TestWrapper>
            <AgentCard agent={agent} />
          </TestWrapper>
        );

        // Click the agent card
        const cardElement = screen.getByTestId(`agent-card-${agent.id}`);
        fireEvent.click(cardElement);

        // Verify navigation occurred to correct path
        const locationDisplay = screen.getByTestId('location-display');
        const expectedPath = `/agent/${agent.id}`;
        const navigatedCorrectly = locationDisplay.textContent === expectedPath;

        unmount();
        return navigatedCorrectly;
      }),
      { numRuns: 100 }
    );
  });

  it('for any agent, the card click handler is properly bound', { timeout: 30000 }, () => {
    fc.assert(
      fc.property(fc.constantFrom(...agents), (agent) => {
        const { unmount } = render(
          <TestWrapper>
            <AgentCard agent={agent} />
          </TestWrapper>
        );

        const cardElement = screen.getByTestId(`agent-card-${agent.id}`);
        
        // Verify the card has an onClick handler (is interactive)
        const hasClickHandler = typeof cardElement.onclick === 'function' || 
                                cardElement.tagName.toLowerCase() === 'button';

        unmount();
        return hasClickHandler;
      }),
      { numRuns: 100 }
    );
  });
});
