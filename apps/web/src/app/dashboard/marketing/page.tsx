'use client';

import { useState } from 'react';
import {
    Megaphone, Mail, MousePointerClick, Eye, Users, TrendingUp,
    ArrowRight, Plus, Search, MoreHorizontal, ExternalLink,
    BarChart3, Target, Zap
} from 'lucide-react';
import { KPICard, Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const campaignPerformance = [
    { week: 'W1', impressions: 45000, clicks: 2800, conversions: 120 },
    { week: 'W2', impressions: 52000, clicks: 3200, conversions: 145 },
    { week: 'W3', impressions: 48000, clicks: 3500, conversions: 160 },
    { week: 'W4', impressions: 61000, clicks: 4100, conversions: 185 },
];

const channelMetrics = [
    { channel: 'Google Ads', spend: 8500, leads: 245, cpl: 34.7, roi: 320 },
    { channel: 'LinkedIn', spend: 5200, leads: 128, cpl: 40.6, roi: 280 },
    { channel: 'Email', spend: 1200, leads: 312, cpl: 3.8, roi: 890 },
    { channel: 'Social Media', spend: 3800, leads: 189, cpl: 20.1, roi: 410 },
    { channel: 'Content/SEO', spend: 2400, leads: 420, cpl: 5.7, roi: 750 },
];

const campaigns = [
    { id: 1, name: 'Spring Product Launch', status: 'active', budget: 15000, spent: 8200, leads: 342, startDate: 'Feb 15', endDate: 'Mar 31' },
    { id: 2, name: 'Enterprise Webinar Series', status: 'active', budget: 5000, spent: 3100, leads: 128, startDate: 'Mar 1', endDate: 'Apr 15' },
    { id: 3, name: 'Brand Awareness Q1', status: 'completed', budget: 10000, spent: 9800, leads: 520, startDate: 'Jan 1', endDate: 'Mar 1' },
    { id: 4, name: 'Retargeting Campaign', status: 'active', budget: 3000, spent: 1800, leads: 95, startDate: 'Feb 20', endDate: 'Mar 20' },
    { id: 5, name: 'Partner Co-Marketing', status: 'draft', budget: 8000, spent: 0, leads: 0, startDate: 'Apr 1', endDate: 'May 31' },
];

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'info' | 'default'; label: string }> = {
    active: { variant: 'success', label: 'Active' },
    completed: { variant: 'info', label: 'Completed' },
    draft: { variant: 'default', label: 'Draft' },
    paused: { variant: 'warning', label: 'Paused' },
};

export default function MarketingPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCampaigns = campaigns.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Marketing</h1>
                    <p className="text-gray-400 mt-1">Campaign performance, lead generation, and channel analytics</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ai"><Zap className="w-4 h-4 mr-2" />AI Optimize</Button>
                    <Button variant="primary"><Plus className="w-4 h-4 mr-2" />New Campaign</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard title="Total Impressions" value="206K" change={22.5} icon={Eye} progress={78} progressLabel="of monthly goal" />
                <KPICard title="Click-Through Rate" value="6.8%" change={1.2} icon={MousePointerClick} iconColor="text-accent-blue" progress={85} progressLabel="vs benchmark" />
                <KPICard title="Leads Generated" value="1,294" change={15.8} icon={Users} iconColor="text-accent-purple" progress={72} progressLabel="of quarterly target" />
                <KPICard title="Cost per Lead" value="$18.40" change={-12.3} icon={Target} iconColor="text-neon-green" progress={92} progressLabel="under budget" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Campaign Performance</CardTitle>
                        <Badge variant="success">+22.5% impressions</Badge>
                    </CardHeader>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={campaignPerformance}>
                                <defs>
                                    <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#76B900" stopOpacity={0.3} /><stop offset="95%" stopColor="#76B900" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                                <XAxis dataKey="week" stroke="#4D4D4D" fontSize={12} />
                                <YAxis stroke="#4D4D4D" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: '8px', color: '#fff' }} />
                                <Area type="monotone" dataKey="impressions" stroke="#76B900" strokeWidth={2} fillOpacity={1} fill="url(#colorImpressions)" />
                                <Area type="monotone" dataKey="clicks" stroke="#00D4FF" strokeWidth={2} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Channel ROI</CardTitle></CardHeader>
                    <div className="space-y-4">
                        {channelMetrics.map((ch) => (
                            <div key={ch.channel}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-300">{ch.channel}</span>
                                    <span className="text-neon-green font-semibold">{ch.roi}%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                                    <span>${ch.spend.toLocaleString()} spent</span>
                                    <span>{ch.leads} leads</span>
                                </div>
                                <div className="h-1.5 bg-surface-gunmetal rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-nvidia-green to-neon-green rounded-full" style={{ width: `${Math.min(ch.roi / 10, 100)}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card className="overflow-hidden p-0">
                <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-4">
                        <CardTitle>Campaigns</CardTitle>
                        <div className="relative max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input type="text" placeholder="Search campaigns..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field w-full pl-10 py-2 text-sm" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-surface-gunmetal bg-surface-carbon">
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Campaign</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Budget</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Leads</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Period</th>
                                <th className="text-right py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCampaigns.map((c) => {
                                const status = statusConfig[c.status];
                                const spentPercent = c.budget ? Math.round((c.spent / c.budget) * 100) : 0;
                                return (
                                    <tr key={c.id} className="border-b border-surface-gunmetal/50 hover:bg-surface-gunmetal/30 transition-colors group">
                                        <td className="py-3 px-6"><span className="text-sm text-white font-medium">{c.name}</span></td>
                                        <td className="py-3 px-6"><Badge variant={status.variant}>{status.label}</Badge></td>
                                        <td className="py-3 px-6">
                                            <div>
                                                <span className="text-sm text-white">${c.spent.toLocaleString()} / ${c.budget.toLocaleString()}</span>
                                                <div className="h-1 bg-surface-gunmetal rounded-full overflow-hidden mt-1 w-20">
                                                    <div className={`h-full rounded-full ${spentPercent > 90 ? 'bg-accent-red' : 'bg-neon-green'}`} style={{ width: `${spentPercent}%` }} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6"><span className="text-sm text-white font-semibold">{c.leads.toLocaleString()}</span></td>
                                        <td className="py-3 px-6"><span className="text-sm text-gray-400">{c.startDate} — {c.endDate}</span></td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-nvidia-green hover:bg-nvidia-green/10 rounded-lg transition-colors"><BarChart3 className="w-4 h-4" /></button>
                                                <button className="p-2 text-gray-400 hover:text-white hover:bg-surface-gunmetal rounded-lg transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
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
