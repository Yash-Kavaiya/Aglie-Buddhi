'use client';

import { useState } from 'react';
import { Search, Bell, Sparkles, Command, Plus, ChevronDown } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

interface TopbarProps {
  onAIChatToggle?: () => void;
}

export function Topbar({ onAIChatToggle }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'New lead assigned', message: 'Acme Corp assigned to you', time: '2m ago', unread: true },
    { id: 2, title: 'Order #1234 shipped', message: 'Tracking: ABC123', time: '15m ago', unread: true },
    { id: 3, title: 'AI Insight', message: '3 leads have high conversion probability', time: '1h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-14 bg-surface-carbon/80 backdrop-blur-md border-b border-surface-gunmetal flex items-center justify-between px-4 sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-nvidia-green transition-colors" />
          <input
            type="text"
            placeholder="Search anything... (Ctrl+K)"
            className="w-full bg-surface-void border border-surface-gunmetal rounded-lg pl-10 pr-20 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-nvidia-green focus:shadow-[0_0_0_3px_rgba(118,185,0,0.1)] transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500">
            <kbd className="px-1.5 py-0.5 bg-surface-gunmetal rounded text-gray-400">⌘</kbd>
            <kbd className="px-1.5 py-0.5 bg-surface-gunmetal rounded text-gray-400">K</kbd>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 ml-4">
        {/* Quick Add */}
        <Button variant="primary" size="sm" className="hidden md:flex">
          <Plus className="w-4 h-4 mr-1" />
          New
        </Button>

        {/* AI Chat Toggle */}
        <button
          onClick={onAIChatToggle}
          className="relative p-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-white hover:shadow-ai-glow transition-all group"
        >
          <Sparkles className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-neon-green rounded-full animate-pulse" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-gunmetal transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-accent-red rounded-full text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-surface-graphite border border-surface-gunmetal rounded-xl shadow-2xl overflow-hidden">
              <div className="p-3 border-b border-surface-gunmetal flex items-center justify-between">
                <h3 className="font-semibold text-white">Notifications</h3>
                <button className="text-xs text-nvidia-green hover:underline">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 border-b border-surface-gunmetal/50 hover:bg-surface-gunmetal/50 cursor-pointer transition-colors ${notif.unread ? 'bg-nvidia-green/5' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      {notif.unread && <span className="w-2 h-2 mt-1.5 rounded-full bg-nvidia-green flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{notif.title}</p>
                        <p className="text-xs text-gray-400 truncate">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-surface-gunmetal">
                <button className="w-full text-center text-sm text-nvidia-green hover:underline py-1">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative ml-2">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-gunmetal transition-colors"
          >
            <Avatar name="John Doe" size="sm" status="online" />
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-surface-graphite border border-surface-gunmetal rounded-xl shadow-2xl overflow-hidden">
              <div className="p-3 border-b border-surface-gunmetal">
                <p className="font-semibold text-white">John Doe</p>
                <p className="text-xs text-gray-400">john@company.com</p>
              </div>
              <div className="p-1">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-surface-gunmetal rounded-lg transition-colors">
                  Profile Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-surface-gunmetal rounded-lg transition-colors">
                  Billing
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-surface-gunmetal rounded-lg transition-colors">
                  Help & Support
                </button>
              </div>
              <div className="p-1 border-t border-surface-gunmetal">
                <button className="w-full text-left px-3 py-2 text-sm text-accent-red hover:bg-accent-red/10 rounded-lg transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
