/**
 * Property-based tests for Navigation link routing
 * **Feature: devops-ai-agents-frontend, Property 8: Navigation link routing**
 * **Validates: Requirements 11.2**
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
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

// Component to capture and display current location for testing
function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="current-location">{location.pathname}</div>;
}

// Helper to render Navigation with router context and location tracking
function renderNavigationWithRouting(initialRoute: string = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navigation />
      <Routes>
        <Route path="/" element={<LocationDisplay />} />
        <Route path="/agent/:agentId" element={<LocationDisplay />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Property 8: Navigation link routing', () => {
  it('for any agent link click, the resulting route matches /agent/{agentId}', () => {
    fc.assert(
      fc.property(fc.constantFrom(...ALL_AGENT_TYPES), (agentId) => {
        const { unmount } = renderNavigationWithRouting('/');
        
        // Find and click the agent link
        const agentLink = screen.getByTestId(`nav-link-${agentId}`);
        fireEvent.click(agentLink);
        
        // Verify the route changed to the expected agent page
        const locationDisplay = screen.getByTestId('current-location');
        const expectedRoute = `/agent/${agentId}`;
        const routeMatches = locationDisplay.textContent === expectedRoute;
        
        unmount();
        return routeMatches;
      }),
      { numRuns: 50 }
    );
  }, 30000);

  it('dashboard link routes to root path', () => {
    const { unmount } = renderNavigationWithRouting('/agent/cicd');
    
    // Click dashboard link
    const dashboardLink = screen.getByTestId('nav-link-dashboard');
    fireEvent.click(dashboardLink);
    
    // Verify route changed to dashboard
    const locationDisplay = screen.getByTestId('current-location');
    expect(locationDisplay.textContent).toBe('/');
    
    unmount();
  });

  it('agent link href attribute matches expected route pattern', () => {
    fc.assert(
      fc.property(fc.constantFrom(...ALL_AGENT_TYPES), (agentId) => {
        const { unmount } = renderNavigationWithRouting('/');
        
        const agentLink = screen.getByTestId(`nav-link-${agentId}`);
        const href = agentLink.getAttribute('href');
        const expectedHref = `/agent/${agentId}`;
        
        unmount();
        return href === expectedHref;
      }),
      { numRuns: 50 }
    );
  }, 30000);

  it('clicking any agent link from any starting route navigates correctly', () => {
    // Test navigation from different starting points
    fc.assert(
      fc.property(
        fc.constantFrom(...ALL_AGENT_TYPES),
        fc.constantFrom('/', '/agent/cicd', '/agent/monitoring'),
        (targetAgentId, startingRoute) => {
          const { unmount } = renderNavigationWithRouting(startingRoute);
          
          // Click the target agent link
          const agentLink = screen.getByTestId(`nav-link-${targetAgentId}`);
          fireEvent.click(agentLink);
          
          // Verify navigation
          const locationDisplay = screen.getByTestId('current-location');
          const expectedRoute = `/agent/${targetAgentId}`;
          const routeMatches = locationDisplay.textContent === expectedRoute;
          
          unmount();
          return routeMatches;
        }
      ),
      { numRuns: 50 }
    );
  }, 30000);
});
