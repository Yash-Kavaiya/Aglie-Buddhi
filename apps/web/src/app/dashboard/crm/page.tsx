'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail, 
  Phone, 
  Building2,
  Star,
  ChevronDown,
  Grid3X3,
  List
} from 'lucide-react';
import { Button, Card, Input, Badge, Avatar, AIInsightCard } from '@/components/ui';

const leads = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    company: 'Acme Corp', 
    email: 'sarah@acme.com',
    phone: '+1 (555) 123-4567',
    stage: 'new',
    score: 92,
    aiAnalysis: 'High conversion probability - recently expanded to new markets',
    avatar: ''
  },
  { 
    id: '2', 
    name: 'Michael Chen', 
    company: 'TechStart Inc', 
    email: 'mchen@techstart.io',
    phone: '+1 (555) 234-5678',
    stage: 'qualified',
    score: 87,
    aiAnalysis: 'Budget approved, decision maker. Schedule demo.',
    avatar: ''
  },
  { 
    id: '3', 
    name: 'Emily Davis', 
    company: 'GlobalTech', 
    email: 'emily.d@globaltech.com',
    phone: '+1 (555) 345-6789',
    stage: 'proposal',
    score: 78,
    aiAnalysis: 'Submitted proposal, awaiting feedback',
    avatar: ''
  },
  { 
    id: '4', 
    name: 'James Wilson', 
    company: 'StartupHub', 
    email: 'jwilson@startuphub.co',
    phone: '+1 (555) 456-7890',
    stage: 'negotiation',
    score: 81,
    aiAnalysis: 'In negotiation stage - offer 15% discount',
    avatar: ''
  },
  { 
    id: '5', 
    name: 'Lisa Anderson', 
    company: 'Enterprise Co', 
    email: 'lisa@enterprise.com',
    phone: '+1 (555) 567-8901',
    stage: 'new',
    score: 65,
    aiAnalysis: 'Cold lead - requires nurturing',
    avatar: ''
  },
];

const stages = [
  { id: 'new', name: 'New', color: 'bg-gray-500' },
  { id: 'qualified', name: 'Qualified', color: 'bg-accent-blue' },
  { id: 'proposal', name: 'Proposal', color: 'bg-accent-purple' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-accent-amber' },
  { id: 'won', name: 'Won', color: 'bg-neon-green' },
];

export default function CRMPage() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">CRM</h1>
          <p className="text-gray-400 mt-1">Manage your leads and customers</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ai">
            <Plus className="w-4 h-4 mr-2" />
            AI Generate Lead
          </Button>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* AI Summary Card */}
      <Card className="card-ai">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent-purple text-sm font-semibold uppercase tracking-wide">AI Summary</span>
              <Badge variant="ai">Today</Badge>
            </div>
            <h3 className="text-white font-semibold mb-1">Weekly Lead Analysis</h3>
            <p className="text-gray-400 text-sm">
              You have <span className="text-neon-green font-semibold">5 high-priority leads</span> that need immediate attention. 
              Based on engagement patterns, <span className="text-neon-green font-semibold">3 leads</span> are ready for the next step.
              Focus on Enterprise accounts for maximum ROI.
            </p>
          </div>
        </div>
      </Card>

      {/* Filters & View Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>
          <Button variant="secondary" size="md">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="flex items-center gap-1 px-1 py-1 bg-surface-graphite rounded-lg border border-surface-gunmetal">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-nvidia-green/20 text-nvidia-green' : 'text-gray-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded ${viewMode === 'kanban' ? 'bg-nvidia-green/20 text-nvidia-green' : 'text-gray-400 hover:text-white'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Stage:</span>
          <select className="input-field py-2 text-sm">
            <option value="">All Stages</option>
            {stages.map(stage => (
              <option key={stage.id} value={stage.id}>{stage.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-gunmetal bg-surface-carbon">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Lead
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Stage
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  AI Score
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  AI Analysis
                </th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => {
                const stageInfo = stages.find(s => s.id === lead.stage);
                return (
                  <tr 
                    key={lead.id} 
                    className="border-b border-surface-gunmetal/50 hover:bg-surface-gunmetal/30 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar name={lead.name} size="md" />
                        <div>
                          <p className="text-white font-medium">{lead.name}</p>
                          <p className="text-gray-500 text-sm">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Building2 className="w-4 h-4 text-gray-500" />
                        {lead.company}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant={
                          lead.stage === 'won' ? 'success' : 
                          lead.stage === 'negotiation' ? 'warning' :
                          lead.stage === 'proposal' ? 'ai' :
                          'default'
                        }
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${stageInfo?.color}`} />
                        {stageInfo?.name}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-surface-gunmetal rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              lead.score >= 80 ? 'bg-neon-green' :
                              lead.score >= 60 ? 'bg-accent-amber' :
                              'bg-accent-red'
                            }`}
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold ${
                          lead.score >= 80 ? 'text-neon-green' :
                          lead.score >= 60 ? 'text-accent-amber' :
                          'text-accent-red'
                        }`}>
                          {lead.score}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-400 text-sm max-w-xs truncate" title={lead.aiAnalysis}>
                        {lead.aiAnalysis}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-nvidia-green hover:bg-nvidia-green/10 rounded-lg transition-colors">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-nvidia-green hover:bg-nvidia-green/10 rounded-lg transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-surface-gunmetal rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
