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

// Map agent colors to Tailwind classes
const colorMap: Record<string, string> = {
  blue: 'text-blue-500',
  green: 'text-emerald-500',
  yellow: 'text-amber-500',
  red: 'text-red-500',
  cyan: 'text-cyan-500',
  purple: 'text-purple-500',
  orange: 'text-orange-500',
  pink: 'text-pink-500',
};

// Map agent colors to gradient backgrounds for active state
const activeGradientMap: Record<string, string> = {
  blue: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-blue-500',
  green: 'bg-gradient-to-r from-emerald-50 to-green-50 border-l-emerald-500',
  yellow: 'bg-gradient-to-r from-amber-50 to-yellow-50 border-l-amber-500',
  red: 'bg-gradient-to-r from-red-50 to-rose-50 border-l-red-500',
  cyan: 'bg-gradient-to-r from-cyan-50 to-sky-50 border-l-cyan-500',
  purple: 'bg-gradient-to-r from-purple-50 to-violet-50 border-l-purple-500',
  orange: 'bg-gradient-to-r from-orange-50 to-amber-50 border-l-orange-500',
  pink: 'bg-gradient-to-r from-pink-50 to-rose-50 border-l-pink-500',
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

  // Base classes for links
  const baseLinkClass = isCollapsed
    ? 'flex items-center justify-center p-3 rounded-xl transition-all duration-200 relative group'
    : 'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 border-l-3 border-transparent';
  
  const inactiveLinkClass = `${baseLinkClass} text-gray-600 hover:bg-gray-100/80 hover:text-gray-900`;
  const activeLinkClass = `${baseLinkClass} bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-900 border-l-indigo-500`;

  // Tooltip component for collapsed state
  const Tooltip = ({ children }: { children: React.ReactNode }) => (
    <span className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg z-50">
      {children}
      <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
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
        <LayoutDashboard size={20} className="text-gray-500 shrink-0" />
        {!isCollapsed && <span>Dashboard</span>}
        {isCollapsed && <Tooltip>Dashboard</Tooltip>}
      </NavLink>

      {/* Divider */}
      <div className="my-4 border-t border-gray-200" />

      {/* Agent Links */}
      <div className="space-y-1">
        {!isCollapsed && (
          <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
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
                  ? `${baseLinkClass} ${activeGradient} text-gray-900`
                  : inactiveLinkClass
              }
              data-testid={`nav-link-${agent.id}`}
              title={isCollapsed ? agent.name : undefined}
            >
              {IconComponent && (
                <div className={`${colorClass} shrink-0 transition-transform duration-200 group-hover:scale-110`}>
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
