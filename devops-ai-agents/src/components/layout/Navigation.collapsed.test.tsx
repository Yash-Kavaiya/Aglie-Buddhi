/**
 * Navigation collapsed state tests
 * Requirements: 12.2 (Tablet collapsible sidebar)
 * 
 * Tests verify:
 * - Navigation renders correctly in collapsed state
 * - Icons are visible in collapsed state
 * - Text labels are hidden in collapsed state
 * - Tooltips are present for accessibility
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './Navigation';
import { agents } from '../../data/agents';

// Helper to render Navigation with router context
const renderNavigation = (props: { isCollapsed?: boolean } = {}) => {
  return render(
    <BrowserRouter>
      <Navigation {...props} />
    </BrowserRouter>
  );
};

describe('Navigation Collapsed State', () => {
  describe('Expanded State (default)', () => {
    it('renders agent names in expanded state', () => {
      renderNavigation({ isCollapsed: false });
      
      agents.forEach((agent) => {
        expect(screen.getByText(agent.name)).toBeInTheDocument();
      });
    });

    it('renders Dashboard text in expanded state', () => {
      renderNavigation({ isCollapsed: false });
      
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('renders Agents section header in expanded state', () => {
      renderNavigation({ isCollapsed: false });
      
      expect(screen.getByText('Agents')).toBeInTheDocument();
    });

    it('navigation links have gap for icon and text spacing', () => {
      renderNavigation({ isCollapsed: false });
      
      const dashboardLink = screen.getByTestId('nav-link-dashboard');
      expect(dashboardLink).toHaveClass('gap-3');
    });
  });

  describe('Collapsed State', () => {
    it('hides agent names in collapsed state', () => {
      renderNavigation({ isCollapsed: true });
      
      // Agent names should not be directly visible (they're in tooltips)
      agents.forEach((agent) => {
        // The name should only appear in the tooltip span, not as direct text
        const link = screen.getByTestId(`nav-link-${agent.id}`);
        // Check that the link doesn't have a direct span child with the agent name
        const directSpans = link.querySelectorAll(':scope > span:not(.absolute)');
        directSpans.forEach((span) => {
          expect(span.textContent).not.toBe(agent.name);
        });
      });
    });

    it('hides Dashboard text in collapsed state', () => {
      renderNavigation({ isCollapsed: true });
      
      const dashboardLink = screen.getByTestId('nav-link-dashboard');
      // Dashboard text should only be in tooltip
      const directSpans = dashboardLink.querySelectorAll(':scope > span:not(.absolute)');
      directSpans.forEach((span) => {
        expect(span.textContent).not.toBe('Dashboard');
      });
    });

    it('hides Agents section header in collapsed state', () => {
      renderNavigation({ isCollapsed: true });
      
      expect(screen.queryByText('Agents')).not.toBeInTheDocument();
    });

    it('navigation links are centered in collapsed state', () => {
      renderNavigation({ isCollapsed: true });
      
      const dashboardLink = screen.getByTestId('nav-link-dashboard');
      expect(dashboardLink).toHaveClass('justify-center');
    });

    it('all agent links are still present and clickable', () => {
      renderNavigation({ isCollapsed: true });
      
      agents.forEach((agent) => {
        const link = screen.getByTestId(`nav-link-${agent.id}`);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', `/agent/${agent.id}`);
      });
    });

    it('dashboard link is still present and clickable', () => {
      renderNavigation({ isCollapsed: true });
      
      const dashboardLink = screen.getByTestId('nav-link-dashboard');
      expect(dashboardLink).toBeInTheDocument();
      expect(dashboardLink).toHaveAttribute('href', '/');
    });

    it('links have title attribute for accessibility in collapsed state', () => {
      renderNavigation({ isCollapsed: true });
      
      const dashboardLink = screen.getByTestId('nav-link-dashboard');
      expect(dashboardLink).toHaveAttribute('title', 'Dashboard');
      
      agents.forEach((agent) => {
        const link = screen.getByTestId(`nav-link-${agent.id}`);
        expect(link).toHaveAttribute('title', agent.name);
      });
    });

    it('links do not have title attribute in expanded state', () => {
      renderNavigation({ isCollapsed: false });
      
      const dashboardLink = screen.getByTestId('nav-link-dashboard');
      expect(dashboardLink).not.toHaveAttribute('title');
      
      agents.forEach((agent) => {
        const link = screen.getByTestId(`nav-link-${agent.id}`);
        expect(link).not.toHaveAttribute('title');
      });
    });
  });

  describe('Navigation Container', () => {
    it('has narrower padding in collapsed state', () => {
      renderNavigation({ isCollapsed: true });
      
      const nav = screen.getByTestId('navigation');
      expect(nav).toHaveClass('px-2');
    });

    it('has wider padding in expanded state', () => {
      renderNavigation({ isCollapsed: false });
      
      const nav = screen.getByTestId('navigation');
      expect(nav).toHaveClass('px-3');
    });
  });
});
