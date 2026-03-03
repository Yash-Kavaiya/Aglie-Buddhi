'use client';

import { useState, ReactNode } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { AIChatPanel } from '@/components/ui/AIComponents';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-void">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div 
        className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}
      >
        <Topbar onAIChatToggle={() => setAiChatOpen(!aiChatOpen)} />
        
        <main className="p-6">
          {children}
        </main>
      </div>

      <AIChatPanel 
        isOpen={aiChatOpen} 
        onClose={() => setAiChatOpen(false)} 
      />
      
      {/* Overlay when AI chat is open */}
      {aiChatOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setAiChatOpen(false)}
        />
      )}
    </div>
  );
}
