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
    <div className="min-h-screen bg-gray-50" data-testid="layout">
      {/* Mobile Header - visible on screens < 768px */}
      <header 
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/80 px-4 py-3 shadow-sm"
        data-testid="mobile-header"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h1 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              DevOps Agents
            </h1>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
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

      {/* Mobile Navigation Drawer - screens < 768px */}
      <nav
        className={`md:hidden fixed top-14 left-0 bottom-0 z-40 w-72 bg-white/95 backdrop-blur-sm border-r border-gray-200/80 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-testid="mobile-drawer"
      >
        <Navigation isMobile onNavigate={closeMobileMenu} />
      </nav>

      {/* Tablet/Desktop Sidebar - visible on screens >= 768px */}
      <aside 
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 bg-white/95 backdrop-blur-sm border-r border-gray-200/80 shadow-sm transition-all duration-300 ease-in-out ${
          isTabletSidebarCollapsed 
            ? 'md:w-16' 
            : 'md:w-64 lg:w-72'
        }`}
        data-testid="desktop-sidebar"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200/80">
          {!isTabletSidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
                DevOps Agents
              </h1>
            </div>
          )}
          {isTabletSidebarCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm mx-auto">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
          )}
          {/* Tablet collapse toggle - visible between 768px and 1024px */}
          <button
            onClick={toggleTabletSidebar}
            className="hidden md:flex lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all ml-auto"
            aria-label={isTabletSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            data-testid="tablet-sidebar-toggle"
          >
            {isTabletSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        
        {/* Navigation - show full or collapsed version */}
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
