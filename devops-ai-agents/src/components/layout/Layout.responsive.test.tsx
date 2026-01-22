/**
 * Layout responsive tests
 * Requirements: 12.1, 12.2, 12.3, 12.4
 * 
 * Tests verify:
 * - Mobile header and hamburger menu are rendered
 * - Desktop sidebar is rendered
 * - Tablet sidebar collapse toggle is present
 * - Layout transitions work correctly
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';

// Helper to render Layout with router context
const renderLayout = () => {
  return render(
    <BrowserRouter>
      <Layout>
        <div data-testid="test-content">Test Content</div>
      </Layout>
    </BrowserRouter>
  );
};

describe('Layout Responsive Design', () => {
  describe('Mobile Layout (<768px)', () => {
    it('renders mobile header with hamburger menu button', () => {
      renderLayout();
      
      const mobileHeader = screen.getByTestId('mobile-header');
      expect(mobileHeader).toBeInTheDocument();
      
      const menuToggle = screen.getByTestId('mobile-menu-toggle');
      expect(menuToggle).toBeInTheDocument();
    });

    it('mobile drawer is initially hidden (translated off-screen)', () => {
      renderLayout();
      
      const mobileDrawer = screen.getByTestId('mobile-drawer');
      expect(mobileDrawer).toHaveClass('-translate-x-full');
    });

    it('clicking hamburger menu opens mobile drawer', () => {
      renderLayout();
      
      const menuToggle = screen.getByTestId('mobile-menu-toggle');
      fireEvent.click(menuToggle);
      
      const mobileDrawer = screen.getByTestId('mobile-drawer');
      expect(mobileDrawer).toHaveClass('translate-x-0');
      expect(mobileDrawer).not.toHaveClass('-translate-x-full');
    });

    it('clicking hamburger menu again closes mobile drawer', () => {
      renderLayout();
      
      const menuToggle = screen.getByTestId('mobile-menu-toggle');
      
      // Open
      fireEvent.click(menuToggle);
      expect(screen.getByTestId('mobile-drawer')).toHaveClass('translate-x-0');
      
      // Close
      fireEvent.click(menuToggle);
      expect(screen.getByTestId('mobile-drawer')).toHaveClass('-translate-x-full');
    });

    it('clicking overlay closes mobile drawer', () => {
      renderLayout();
      
      const menuToggle = screen.getByTestId('mobile-menu-toggle');
      fireEvent.click(menuToggle);
      
      const overlay = screen.getByTestId('mobile-overlay');
      fireEvent.click(overlay);
      
      expect(screen.getByTestId('mobile-drawer')).toHaveClass('-translate-x-full');
    });

    it('overlay is only visible when mobile menu is open', () => {
      renderLayout();
      
      // Initially no overlay
      expect(screen.queryByTestId('mobile-overlay')).not.toBeInTheDocument();
      
      // Open menu - overlay appears
      const menuToggle = screen.getByTestId('mobile-menu-toggle');
      fireEvent.click(menuToggle);
      expect(screen.getByTestId('mobile-overlay')).toBeInTheDocument();
      
      // Close menu - overlay disappears
      fireEvent.click(menuToggle);
      expect(screen.queryByTestId('mobile-overlay')).not.toBeInTheDocument();
    });
  });

  describe('Desktop/Tablet Layout (>=768px)', () => {
    it('renders desktop sidebar', () => {
      renderLayout();
      
      const desktopSidebar = screen.getByTestId('desktop-sidebar');
      expect(desktopSidebar).toBeInTheDocument();
    });

    it('desktop sidebar has correct initial width classes', () => {
      renderLayout();
      
      const desktopSidebar = screen.getByTestId('desktop-sidebar');
      expect(desktopSidebar).toHaveClass('md:w-64');
      expect(desktopSidebar).toHaveClass('lg:w-72');
    });

    it('renders tablet sidebar toggle button', () => {
      renderLayout();
      
      const tabletToggle = screen.getByTestId('tablet-sidebar-toggle');
      expect(tabletToggle).toBeInTheDocument();
    });

    it('clicking tablet toggle collapses sidebar', () => {
      renderLayout();
      
      const tabletToggle = screen.getByTestId('tablet-sidebar-toggle');
      fireEvent.click(tabletToggle);
      
      const desktopSidebar = screen.getByTestId('desktop-sidebar');
      expect(desktopSidebar).toHaveClass('md:w-16');
    });

    it('clicking tablet toggle again expands sidebar', () => {
      renderLayout();
      
      const tabletToggle = screen.getByTestId('tablet-sidebar-toggle');
      
      // Collapse
      fireEvent.click(tabletToggle);
      expect(screen.getByTestId('desktop-sidebar')).toHaveClass('md:w-16');
      
      // Expand
      fireEvent.click(tabletToggle);
      expect(screen.getByTestId('desktop-sidebar')).toHaveClass('md:w-64');
    });
  });

  describe('Main Content Area', () => {
    it('renders main content area', () => {
      renderLayout();
      
      const mainContent = screen.getByTestId('main-content');
      expect(mainContent).toBeInTheDocument();
    });

    it('main content has correct margin classes for expanded sidebar', () => {
      renderLayout();
      
      const mainContent = screen.getByTestId('main-content');
      expect(mainContent).toHaveClass('md:ml-64');
      expect(mainContent).toHaveClass('lg:ml-72');
    });

    it('main content margin adjusts when sidebar is collapsed', () => {
      renderLayout();
      
      const tabletToggle = screen.getByTestId('tablet-sidebar-toggle');
      fireEvent.click(tabletToggle);
      
      const mainContent = screen.getByTestId('main-content');
      expect(mainContent).toHaveClass('md:ml-16');
    });

    it('renders children content', () => {
      renderLayout();
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Layout Transitions', () => {
    it('sidebar has transition classes for smooth animation', () => {
      renderLayout();
      
      const desktopSidebar = screen.getByTestId('desktop-sidebar');
      expect(desktopSidebar).toHaveClass('transition-all');
      expect(desktopSidebar).toHaveClass('duration-300');
      expect(desktopSidebar).toHaveClass('ease-in-out');
    });

    it('main content has transition classes for smooth animation', () => {
      renderLayout();
      
      const mainContent = screen.getByTestId('main-content');
      expect(mainContent).toHaveClass('transition-all');
      expect(mainContent).toHaveClass('duration-300');
      expect(mainContent).toHaveClass('ease-in-out');
    });

    it('mobile drawer has transition classes for smooth animation', () => {
      renderLayout();
      
      const mobileDrawer = screen.getByTestId('mobile-drawer');
      expect(mobileDrawer).toHaveClass('transition-transform');
      expect(mobileDrawer).toHaveClass('duration-200');
      expect(mobileDrawer).toHaveClass('ease-in-out');
    });
  });

  describe('Accessibility', () => {
    it('mobile menu toggle has accessible label when closed', () => {
      renderLayout();
      
      const menuToggle = screen.getByTestId('mobile-menu-toggle');
      expect(menuToggle).toHaveAttribute('aria-label', 'Open menu');
    });

    it('mobile menu toggle has accessible label when open', () => {
      renderLayout();
      
      const menuToggle = screen.getByTestId('mobile-menu-toggle');
      fireEvent.click(menuToggle);
      
      expect(menuToggle).toHaveAttribute('aria-label', 'Close menu');
    });

    it('tablet sidebar toggle has accessible label when expanded', () => {
      renderLayout();
      
      const tabletToggle = screen.getByTestId('tablet-sidebar-toggle');
      expect(tabletToggle).toHaveAttribute('aria-label', 'Collapse sidebar');
    });

    it('tablet sidebar toggle has accessible label when collapsed', () => {
      renderLayout();
      
      const tabletToggle = screen.getByTestId('tablet-sidebar-toggle');
      fireEvent.click(tabletToggle);
      
      expect(tabletToggle).toHaveAttribute('aria-label', 'Expand sidebar');
    });
  });
});
