/**
 * Navigation component - Display links to all 8 agents plus dashboard
 * Requirements: 11.1, 11.2, 11.4
 * 
 * Supports three modes:
 * - Full: Shows icons and text (desktop and mobile drawer)
 * - Collapsed: Shows only icons with tooltips (tablet collapsed state)
 */

import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GitBranch,
  Server,
  Activity,
  Shield,
  Box,
  Cloud,
  Settings,
  AlertTriangle,
} from 'lucide-react';
import { agents } from '../../data/agents';
import type { AgentType } from '../../types';

interface NavigationProps {
  isMobile?: boolean;
  isCollapsed?: boolean;
  onNavigate?: () => void;
}

// Map agent icon strings to Lucide components
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GitBranch,
  Server,
  Activity,
  Shield,
  Box,
  Cloud,
  Settings,
  AlertTriangle,
};

// Map agent colors to Tailwind classes - Google colors
const colorMap: Record<string, string> = {
  blue: 'text-[#4285f4]',
  green: 'text-[#34a853]',
  yellow: 'text-[#fbbc04]',
  red: 'text-[#ea4335]',
  cyan: 'text-[#4285f4]',
  purple: 'text-[#4285f4]',
  orange: 'text-[#fbbc04]',
  pink: 'text-[#ea4335]',
};

// Map agent colors to gradient backgrounds for active state - Google style
const activeGradientMap: Record<string, string> = {
  blue: 'bg-blue-50 border-l-[#4285f4]',
  green: 'bg-green-50 border-l-[#34a853]',
  yellow: 'bg-yellow-50 border-l-[#fbbc04]',
  red: 'bg-red-50 border-l-[#ea4335]',
  cyan: 'bg-blue-50 border-l-[#4285f4]',
  purple: 'bg-blue-50 border-l-[#4285f4]',
  orange: 'bg-yellow-50 border-l-[#fbbc04]',
  pink: 'bg-red-50 border-l-[#ea4335]',
};

export function Navigation({ 
  isMobile: _isMobile = false, 
  isCollapsed = false,
  onNavigate 
}: NavigationProps) {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  // Base classes for links - Google Material Design
  const baseLinkClass = isCollapsed
    ? 'flex items-center justify-center p-3 rounded-full transition-all duration-200 relative group'
    : 'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-full transition-all duration-200';
  
  const inactiveLinkClass = `${baseLinkClass} text-[#5f6368] hover:bg-gray-100`;
  const activeLinkClass = `${baseLinkClass} bg-blue-50 text-[#4285f4]`;

  // Tooltip component for collapsed state - Google style
  const Tooltip = ({ children }: { children: React.ReactNode }) => (
    <span className="absolute left-full ml-2 px-3 py-2 bg-[#202124] text-white text-xs font-normal rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 shadow-elevated z-50">
      {children}
      <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-[#202124]" />
    </span>
  );

  return (
    <nav 
      className={`flex-1 overflow-y-auto py-4 ${isCollapsed ? 'px-2' : 'px-3'}`} 
      data-testid="navigation"
    >
      {/* Dashboard Link */}
      <NavLink
        to="/"
        end
        onClick={handleClick}
        className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}
        data-testid="nav-link-dashboard"
        title={isCollapsed ? 'Dashboard' : undefined}
      >
        <LayoutDashboard size={20} className="text-[#5f6368] shrink-0" />
        {!isCollapsed && <span>Dashboard</span>}
        {isCollapsed && <Tooltip>Dashboard</Tooltip>}
      </NavLink>

      {/* Divider - Google style */}
      <div className="my-4 border-t border-[#e8eaed]" />

      {/* Agent Links */}
      <div className="space-y-1">
        {!isCollapsed && (
          <p className="px-4 py-2 text-xs font-medium text-[#5f6368] uppercase tracking-wide">
            AI Agents
          </p>
        )}
        {agents.map((agent) => {
          const IconComponent = iconMap[agent.icon];
          const colorClass = colorMap[agent.color] || 'text-gray-500';
          const activeGradient = activeGradientMap[agent.color] || 'bg-gray-100';

          return (
            <NavLink
              key={agent.id}
              to={`/agent/${agent.id}`}
              onClick={handleClick}
              className={({ isActive }) => 
                isActive 
                  ? `${baseLinkClass} ${activeGradient} text-[#202124]`
                  : inactiveLinkClass
              }
              data-testid={`nav-link-${agent.id}`}
              title={isCollapsed ? agent.name : undefined}
            >
              {IconComponent && (
                <div className={`${colorClass} shrink-0 transition-transform duration-150 group-hover:scale-105`}>
                  <IconComponent size={20} />
                </div>
              )}
              {!isCollapsed && <span>{agent.name}</span>}
              {isCollapsed && <Tooltip>{agent.name}</Tooltip>}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

/**
 * Helper function to get all agent IDs for testing
 * Used by property tests to verify navigation contains all agents
 */
export function getNavigationAgentIds(): AgentType[] {
  return agents.map((agent) => agent.id);
}
