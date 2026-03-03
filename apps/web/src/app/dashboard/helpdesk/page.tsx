'use client';

import { useState } from 'react';
import {
    Headphones, MessageSquare, Clock, CheckCircle2, AlertCircle,
    Search, Filter, MoreHorizontal, ArrowRight, Plus,
    ThumbsUp, Timer, TrendingUp, BarChart3, Flame
} from 'lucide-react';
import { KPICard, Card, CardHeader, CardTitle, Button, Badge, Avatar } from '@/components/ui';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const ticketsByDay = [
    { day: 'Mon', opened: 24, resolved: 20 },
    { day: 'Tue', opened: 18, resolved: 22 },
    { day: 'Wed', opened: 32, resolved: 28 },
    { day: 'Thu', opened: 22, resolved: 25 },
    { day: 'Fri', opened: 28, resolved: 30 },
    { day: 'Sat', opened: 8, resolved: 10 },
    { day: 'Sun', opened: 5, resolved: 6 },
];

const ticketsByCategory = [
    { name: 'Technical', value: 38, color: '#76B900' },
    { name: 'Billing', value: 22, color: '#00D4FF' },
    { name: 'Feature Request', value: 18, color: '#9D4EDD' },
    { name: 'Account', value: 12, color: '#F59E0B' },
    { name: 'Other', value: 10, color: '#6B7280' },
];

const tickets = [
    { id: 'TKT-1892', subject: 'Cannot access dashboard after update', customer: 'Sarah Johnson', priority: 'high', status: 'open', assignee: 'Dan Lee', time: '15 min ago', sla: 'critical' },
    { id: 'TKT-1891', subject: 'Billing discrepancy on March invoice', customer: 'Michael Chen', priority: 'medium', status: 'in-progress', assignee: 'Eve Martin', time: '1 hour ago', sla: 'normal' },
    { id: 'TKT-1890', subject: 'Feature request: Export to PDF', customer: 'Emily Davis', priority: 'low', status: 'open', assignee: '', time: '2 hours ago', sla: 'normal' },
    { id: 'TKT-1889', subject: 'API rate limit exceeded', customer: 'James Wilson', priority: 'high', status: 'in-progress', assignee: 'Alice Chen', time: '3 hours ago', sla: 'warning' },
    { id: 'TKT-1888', subject: 'Password reset not working', customer: 'Lisa Anderson', priority: 'medium', status: 'resolved', assignee: 'Bob Smith', time: '5 hours ago', sla: 'met' },
    { id: 'TKT-1887', subject: 'Integration setup help needed', customer: 'Tom Harris', priority: 'low', status: 'open', assignee: '', time: '6 hours ago', sla: 'normal' },
];

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'default'; label: string }> = {
    open: { variant: 'warning', label: 'Open' },
    'in-progress': { variant: 'info', label: 'In Progress' },
    resolved: { variant: 'success', label: 'Resolved' },
    closed: { variant: 'default', label: 'Closed' },
};

const priorityConfig: Record<string, { color: string }> = {
    high: { color: 'text-accent-red' },
    medium: { color: 'text-accent-amber' },
    low: { color: 'text-gray-400' },
};

const slaConfig: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'default' }> = {
    met: { variant: 'success' },
    normal: { variant: 'default' },
    warning: { variant: 'warning' },
    critical: { variant: 'error' },
};

export default function HelpdeskPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const filteredTickets = tickets.filter(t => {
        const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = !statusFilter || t.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const openCount = tickets.filter(t => t.status === 'open').length;
    const inProgressCount = tickets.filter(t => t.status === 'in-progress').length;

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Helpdesk</h1>
                    <p className="text-gray-400 mt-1">Support tickets, SLA tracking, and customer satisfaction</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ai"><Flame className="w-4 h-4 mr-2" />AI Auto-Assign</Button>
                    <Button variant="primary"><Plus className="w-4 h-4 mr-2" />New Ticket</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard title="Open Tickets" value={openCount.toString()} change={-15.2} icon={MessageSquare} progress={30} progressLabel="of queue" />
                <KPICard title="Avg Resolution Time" value="2.4h" change={-22.5} icon={Timer} iconColor="text-accent-blue" progress={88} progressLabel="SLA compliance" />
                <KPICard title="Satisfaction Score" value="4.7/5" change={3.2} icon={ThumbsUp} iconColor="text-neon-green" progress={94} progressLabel="customer rating" />
                <KPICard title="First Response" value="12m" change={-30} icon={Clock} iconColor="text-accent-purple" progress={95} progressLabel="under SLA target" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Ticket Volume</CardTitle>
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-accent-amber" /><span className="text-gray-400">Opened</span></div>
                            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-neon-green" /><span className="text-gray-400">Resolved</span></div>
                        </div>
                    </CardHeader>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ticketsByDay}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" vertical={false} />
                                <XAxis dataKey="day" stroke="#4D4D4D" fontSize={12} />
                                <YAxis stroke="#4D4D4D" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: '8px', color: '#fff' }} />
                                <Bar dataKey="opened" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={16} />
                                <Bar dataKey="resolved" fill="#76B900" radius={[4, 4, 0, 0]} barSize={16} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <CardHeader><CardTitle>By Category</CardTitle></CardHeader>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={ticketsByCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                                    {ticketsByCategory.map((entry, i) => (<Cell key={`cell-${i}`} fill={entry.color} />))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: '8px', color: '#fff' }} formatter={(v: number) => [`${v}%`, 'Share']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-2">
                        {ticketsByCategory.map((c) => (
                            <div key={c.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                                    <span className="text-gray-300">{c.name}</span>
                                </div>
                                <span className="text-white font-medium">{c.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card className="overflow-hidden p-0">
                <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-4">
                        <CardTitle>Support Tickets</CardTitle>
                        <div className="flex items-center gap-3">
                            <div className="relative max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input type="text" placeholder="Search tickets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field w-full pl-10 py-2 text-sm" />
                            </div>
                            <select className="input-field py-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="">All Status</option>
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-surface-gunmetal bg-surface-carbon">
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ticket</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Priority</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Assignee</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">SLA</th>
                                <th className="text-right py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map((ticket) => {
                                const status = statusConfig[ticket.status];
                                const priority = priorityConfig[ticket.priority];
                                const sla = slaConfig[ticket.sla];
                                return (
                                    <tr key={ticket.id} className="border-b border-surface-gunmetal/50 hover:bg-surface-gunmetal/30 transition-colors group">
                                        <td className="py-3 px-6">
                                            <div>
                                                <p className="text-sm text-white font-medium">{ticket.subject}</p>
                                                <p className="text-xs text-gray-500">{ticket.id} · {ticket.time}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6"><span className="text-sm text-gray-300">{ticket.customer}</span></td>
                                        <td className="py-3 px-6"><span className={`text-sm font-semibold capitalize ${priority.color}`}>{ticket.priority}</span></td>
                                        <td className="py-3 px-6"><Badge variant={status.variant}>{status.label}</Badge></td>
                                        <td className="py-3 px-6">
                                            {ticket.assignee ? (
                                                <div className="flex items-center gap-2">
                                                    <Avatar name={ticket.assignee} size="sm" />
                                                    <span className="text-sm text-gray-300">{ticket.assignee}</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500 italic">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-6"><Badge variant={sla.variant}>{ticket.sla === 'met' ? '✓ Met' : ticket.sla.toUpperCase()}</Badge></td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-nvidia-green hover:bg-nvidia-green/10 rounded-lg transition-colors"><MessageSquare className="w-4 h-4" /></button>
                                                <button className="p-2 text-gray-400 hover:text-white hover:bg-surface-gunmetal rounded-lg transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 flex items-center justify-between border-t border-surface-gunmetal">
                    <span className="text-sm text-gray-400">Showing {filteredTickets.length} of {tickets.length} tickets</span>
                    <Button variant="ghost" size="sm">View All Tickets <ArrowRight className="w-3 h-3 ml-1" /></Button>
                </div>
            </Card>
        </div>
    );
}
