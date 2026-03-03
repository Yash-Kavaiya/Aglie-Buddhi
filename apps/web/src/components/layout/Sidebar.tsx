'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  Briefcase, 
  UsersRound, 
  Receipt, 
  Megaphone, 
  Headphones, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const mainModules = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'CRM', href: '/dashboard/crm', icon: Users },
  { name: 'Sales', href: '/dashboard/sales', icon: ShoppingCart },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
  { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  { name: 'Human Resources', href: '/dashboard/hr', icon: UsersRound },
  { name: 'Accounting', href: '/dashboard/accounting', icon: Receipt },
  { name: 'Marketing', href: '/dashboard/marketing', icon: Megaphone },
  { name: 'Helpdesk', href: '/dashboard/helpdesk', icon: Headphones },
];

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={clsx(
        'fixed left-0 top-0 h-full bg-surface-carbon border-r border-surface-gunmetal z-40 transition-all duration-300 flex flex-col',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-surface-gunmetal">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-nvidia-green rounded-md rotate-45 opacity-20" />
            <div className="absolute inset-0.5 bg-nvidia-green rounded-md flex items-center justify-center">
              <Zap className="w-4 h-4 text-surface-void" />
            </div>
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg text-white tracking-wide">
              Agile<span className="text-nvidia-green">Buddhi</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {mainModules.map((module) => {
          const isActive = pathname === module.href || pathname.startsWith(module.href + '/');
          const Icon = module.icon;

          return (
            <Link
              key={module.href}
              href={module.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive 
                  ? 'bg-nvidia-green/10 text-nvidia-green border-l-2 border-nvidia-green -ml-0.5 pl-3.5' 
                  : 'text-gray-400 hover:text-white hover:bg-surface-gunmetal'
              )}
            >
              <Icon className={clsx('w-5 h-5 flex-shrink-0', isActive && 'drop-shadow-[0_0_8px_rgba(118,185,0,0.5)]')} />
              {!collapsed && (
                <span className="text-sm font-medium truncate">{module.name}</span>
              )}
              {!collapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-nvidia-green shadow-glow-sm" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-2 border-t border-surface-gunmetal">
        <Link
          href="/dashboard/settings"
          className={clsx(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
            pathname.startsWith('/dashboard/settings')
              ? 'bg-nvidia-green/10 text-nvidia-green'
              : 'text-gray-400 hover:text-white hover:bg-surface-gunmetal'
          )}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 mt-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-gunmetal transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
