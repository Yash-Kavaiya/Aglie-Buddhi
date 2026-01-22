/**
 * Property-based tests for Navigation component
 * **Feature: devops-ai-agents-frontend, Property 7: Navigation shows all agents**
 * **Validates: Requirements 11.1**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation, getNavigationAgentIds } from './Navigation';
import { agents } from '../../data/agents';
import type { AgentType } from '../../types';

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

// Helper to render Navigation with router context
function renderNavigation() {
  return render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}

describe('Property 7: Navigation shows all agents', () => {
  it('navigation contains links to all 8 agents', () => {
    renderNavigation();
    
    // Verify all agent links are present
    ALL_AGENT_TYPES.forEach((agentType) => {
      const link = screen.getByTestId(`nav-link-${agentType}`);
      expect(link).toBeInTheDocument();
    });
  });

  it('navigation contains dashboard link', () => {
    renderNavigation();
    
    const dashboardLink = screen.getByTestId('nav-link-dashboard');
    expect(dashboardLink).toBeInTheDocument();
  });

  it('for any agent type, navigation contains a link to that agent', () => {
    renderNavigation();
    
    fc.assert(
      fc.property(fc.constantFrom(...ALL_AGENT_TYPES), (agentType) => {
        const link = screen.getByTestId(`nav-link-${agentType}`);
        return link !== null && link.getAttribute('href') === `/agent/${agentType}`;
      }),
      { numRuns: 100 }
    );
  });

  it('getNavigationAgentIds returns all agent IDs', () => {
    const navAgentIds = getNavigationAgentIds();
    
    fc.assert(
      fc.property(fc.constantFrom(...ALL_AGENT_TYPES), (agentType) => {
        return navAgentIds.includes(agentType);
      }),
      { numRuns: 100 }
    );
  });

  it('navigation agent count matches agents data', () => {
    renderNavigation();
    
    const navAgentIds = getNavigationAgentIds();
    expect(navAgentIds.length).toBe(agents.length);
    expect(navAgentIds.length).toBe(8);
  });
});
