/**
 * Layout component - Responsive layout wrapper with sidebar/header
 * Requirements: 12.1, 12.2, 12.3
 * 
 * Responsive breakpoints:
 * - Mobile (<768px): Hamburger menu with slide-out drawer
 * - Tablet (768-1024px): Collapsible sidebar with toggle button
 * - Desktop (>1024px): Full sidebar navigation always visible
 */

import { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTabletSidebarCollapsed, setIsTabletSidebarCollapsed] = useState(false);

  // Close mobile menu on window resize to tablet/desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleTabletSidebar = () => {
    setIsTabletSidebarCollapsed(!isTabletSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-white" data-testid="layout">
      {/* Mobile Header - Google Material Design */}
      <header 
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#dadce0] px-4 py-3 shadow-soft"
        data-testid="mobile-header"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#4285f4] flex items-center justify-center">
              <span className="text-white font-medium text-base">AI</span>
            </div>
            <h1 className="text-lg font-normal text-[#202124]">
              DevOps Agents
            </h1>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full text-[#5f6368] hover:bg-gray-100 transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-200"
          onClick={closeMobileMenu}
          data-testid="mobile-overlay"
        />
      )}

      {/* Mobile Navigation Drawer - Google Material Design */}
      <nav
        className={`md:hidden fixed top-14 left-0 bottom-0 z-40 w-72 bg-white border-r border-[#dadce0] shadow-elevated transform transition-transform duration-200 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-testid="mobile-drawer"
      >
        <Navigation isMobile onNavigate={closeMobileMenu} />
      </nav>

      {/* Tablet/Desktop Sidebar - Google Material Design */}
      <aside 
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 bg-white border-r border-[#dadce0] shadow-soft transition-all duration-200 ease-out ${
          isTabletSidebarCollapsed 
            ? 'md:w-16' 
            : 'md:w-64 lg:w-72'
        }`}
        data-testid="desktop-sidebar"
      >
        {/* Sidebar Header - Google style */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#e8eaed]">
          {!isTabletSidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#4285f4] flex items-center justify-center">
                <span className="text-white font-medium text-base">AI</span>
              </div>
              <h1 className="text-lg font-normal text-[#202124] truncate">
                DevOps Agents
              </h1>
            </div>
          )}
          {isTabletSidebarCollapsed && (
            <div className="w-9 h-9 rounded-lg bg-[#4285f4] flex items-center justify-center mx-auto">
              <span className="text-white font-medium text-base">AI</span>
            </div>
          )}
          {/* Tablet collapse toggle */}
          <button
            onClick={toggleTabletSidebar}
            className="hidden md:flex lg:hidden p-2 rounded-full text-[#5f6368] hover:bg-gray-100 transition-all ml-auto"
            aria-label={isTabletSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            data-testid="tablet-sidebar-toggle"
          >
            {isTabletSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        {/* Navigation */}
        <Navigation isCollapsed={isTabletSidebarCollapsed} />
      </aside>

      {/* Main Content Area - adjusts margin based on sidebar state */}
      <main 
        className={`pt-14 md:pt-0 min-h-screen transition-all duration-300 ease-in-out ${
          isTabletSidebarCollapsed 
            ? 'md:ml-16' 
            : 'md:ml-64 lg:ml-72'
        }`}
        data-testid="main-content"
      >
        {children}
      </main>
    </div>
  );
}
