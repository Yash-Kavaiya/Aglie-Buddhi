/**
 * Dashboard page - Displays grid of all 8 AI Agent cards
 * Requirements: 1.1, 1.2
 */

import { useNavigate } from 'react-router-dom';
import { AgentCard } from '../components/dashboard/AgentCard';
import { MCPDashboardPanel } from '../components/mcp';
import { agents } from '../data/agents';
import { Sparkles, Zap, Shield, Plug } from 'lucide-react';
import type { AgentType } from '../types';

export function DashboardPage() {
  const navigate = useNavigate();

  const handleAgentClick = (agentId: AgentType) => {
    navigate(`/agent/${agentId}`);
  };

  return (
    <div className="p-6 lg:p-8" data-testid="dashboard-page">
      {/* Hero Section */}
      <div className="relative mb-10 p-8 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white/90 text-xs font-medium backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered DevOps
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            DevOps AI Agents
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Supercharge your DevOps workflow with specialized AI agents. Get expert assistance for CI/CD, infrastructure, security, and more.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-6">
            <div className="flex items-center gap-2 text-white/90">
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold">8 Agents</div>
                <div className="text-xs text-white/60">Specialized AI</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold">Secure</div>
                <div className="text-xs text-white/60">Enterprise Ready</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                <Plug className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold">MCP Ready</div>
                <div className="text-xs text-white/60">Connect External Tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MCP Dashboard Panel */}
      <div className="mb-8">
        <MCPDashboardPanel onAgentClick={handleAgentClick} />
      </div>

      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Select an Agent</h2>
        <p className="text-sm text-gray-500">Choose a specialized agent to help with your DevOps tasks</p>
      </div>

      {/* Agent Cards Grid - Responsive layout */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        data-testid="agent-cards-grid"
      >
        {agents.map((agent, index) => (
          <div 
            key={agent.id} 
            className="animate-fade-in opacity-0"
            style={{ animationDelay: `${index * 0.08}s`, animationFillMode: 'forwards' }}
          >
            <AgentCard agent={agent} />
          </div>
        ))}
      </div>
    </div>
  );
}
