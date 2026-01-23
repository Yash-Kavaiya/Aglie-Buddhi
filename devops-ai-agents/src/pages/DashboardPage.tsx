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
      {/* Hero Section - Google Material Design */}
      <div className="relative mb-10 p-8 rounded-3xl bg-white shadow-elevated overflow-hidden border border-gray-200">
        {/* Google color accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4285f4] via-[#ea4335] via-[#fbbc04] to-[#34a853]" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#4285f4] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-[#4285f4] text-xs font-medium">
              AI-Powered DevOps
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-normal text-[#202124] mb-3">
            DevOps AI Agents
          </h1>
          <p className="text-[#5f6368] text-base max-w-2xl leading-relaxed">
            Supercharge your DevOps workflow with specialized AI agents. Get expert assistance for CI/CD, infrastructure, security, and more.
          </p>
          
          {/* Stats - Google style */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#4285f4]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[#202124]">8 Agents</div>
                <div className="text-xs text-[#5f6368]">Specialized AI</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#ea4335]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[#202124]">Secure</div>
                <div className="text-xs text-[#5f6368]">Enterprise Ready</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Plug className="w-5 h-5 text-[#34a853]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[#202124]">MCP Ready</div>
                <div className="text-xs text-[#5f6368]">Connect External Tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MCP Dashboard Panel */}
      <div className="mb-8">
        <MCPDashboardPanel onAgentClick={handleAgentClick} />
      </div>

      {/* Feature Cards - 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Quick Start Card */}
        <div className="bg-white rounded-2xl border border-[#dadce0] p-6 hover:shadow-glow transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-[#4285f4]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-[#202124] mb-2">Quick Start</h3>
              <p className="text-sm text-[#5f6368] leading-relaxed mb-3">
                Get started with AI-powered DevOps automation in minutes. Select an agent and start chatting.
              </p>
              <button className="text-sm font-medium text-[#4285f4] hover:underline">
                Learn more →
              </button>
            </div>
          </div>
        </div>

        {/* Best Practices Card */}
        <div className="bg-white rounded-2xl border border-[#dadce0] p-6 hover:shadow-glow transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-[#34a853]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-[#202124] mb-2">Best Practices</h3>
              <p className="text-sm text-[#5f6368] leading-relaxed mb-3">
                Follow industry-standard DevOps practices with AI-guided recommendations and security checks.
              </p>
              <button className="text-sm font-medium text-[#34a853] hover:underline">
                View guide →
              </button>
            </div>
          </div>
        </div>

        {/* Integrations Card */}
        <div className="bg-white rounded-2xl border border-[#dadce0] p-6 hover:shadow-glow transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
              <Plug className="w-6 h-6 text-[#fbbc04]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-[#202124] mb-2">MCP Integrations</h3>
              <p className="text-sm text-[#5f6368] leading-relaxed mb-3">
                Connect external tools and services using Model Context Protocol for enhanced capabilities.
              </p>
              <button className="text-sm font-medium text-[#fbbc04] hover:underline">
                Configure →
              </button>
            </div>
          </div>
        </div>

        {/* Documentation Card */}
        <div className="bg-white rounded-2xl border border-[#dadce0] p-6 hover:shadow-glow transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#ea4335]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-[#202124] mb-2">Documentation</h3>
              <p className="text-sm text-[#5f6368] leading-relaxed mb-3">
                Explore comprehensive guides, API references, and examples to maximize your productivity.
              </p>
              <button className="text-sm font-medium text-[#ea4335] hover:underline">
                Read docs →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Title - Google style */}
      <div className="mb-6">
        <h2 className="text-xl font-normal text-[#202124] mb-1">Select an Agent</h2>
        <p className="text-sm text-[#5f6368]">Choose a specialized agent to help with your DevOps tasks</p>
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
