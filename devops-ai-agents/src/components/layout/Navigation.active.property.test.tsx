/**
 * Property-based tests for Navigation active agent highlighting
 * **Feature: devops-ai-agents-frontend, Property 10: Active agent highlighting**
 * **Validates: Requirements 11.4**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from './Navigation';
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

// Helper to render Navigation at a specific route
function renderNavigationAtRoute(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Navigation />
    </MemoryRouter>
  );
}

// Helper to check if element has active styling (not just hover:bg-gray-100)
// Active class pattern: "bg-gray-100 text-gray-900" without "hover:" prefix
function hasActiveClass(className: string): boolean {
  // Split by spaces and check for standalone bg-gray-100 (not hover:bg-gray-100)
  const classes = className.split(' ');
  return classes.some(cls => cls === 'bg-gray-100');
}

describe('Property 10: Active agent highlighting', () => {
  it('for any agent page, only that agent link has active styling', () => {
    fc.assert(
      fc.property(fc.constantFrom(...ALL_AGENT_TYPES), (activeAgentId) => {
        const { unmount } = renderNavigationAtRoute(`/agent/${activeAgentId}`);
        
        const activeLink = screen.getByTestId(`nav-link-${activeAgentId}`);
        const isActive = hasActiveClass(activeLink.className);
        
        // Check that other agent links don't have active styling
        const otherAgentsInactive = ALL_AGENT_TYPES
          .filter((id) => id !== activeAgentId)
          .every((id) => {
            const link = screen.getByTestId(`nav-link-${id}`);
            return !hasActiveClass(link.className);
          });
        
        unmount();
        return isActive && otherAgentsInactive;
      }),
      { numRuns: 50 }
    );
  }, 30000);

  it('dashboard link is active only on dashboard route', () => {
    // Test dashboard route
    const { unmount: unmount1 } = renderNavigationAtRoute('/');
    const dashboardLink = screen.getByTestId('nav-link-dashboard');
    expect(hasActiveClass(dashboardLink.className)).toBe(true);
    unmount1();

    // Test agent route - dashboard should not be active
    const { unmount: unmount2 } = renderNavigationAtRoute('/agent/cicd');
    const dashboardLinkOnAgent = screen.getByTestId('nav-link-dashboard');
    expect(hasActiveClass(dashboardLinkOnAgent.className)).toBe(false);
    unmount2();
  });

  it('for any agent, navigating to that agent page highlights only that agent', () => {
    fc.assert(
      fc.property(fc.constantFrom(...ALL_AGENT_TYPES), (agentId) => {
        const { unmount } = renderNavigationAtRoute(`/agent/${agentId}`);
        
        // Dashboard should not be active
        const dashboardLink = screen.getByTestId('nav-link-dashboard');
        const dashboardInactive = !hasActiveClass(dashboardLink.className);
        
        // Only the current agent should be active
        const currentAgentActive = hasActiveClass(screen.getByTestId(`nav-link-${agentId}`).className);
        
        unmount();
        return dashboardInactive && currentAgentActive;
      }),
      { numRuns: 50 }
    );
  }, 30000);
});
