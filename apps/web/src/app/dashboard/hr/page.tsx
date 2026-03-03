'use client';

import { useState } from 'react';
import {
    UsersRound,
    UserPlus,
    Briefcase,
    GraduationCap,
    Calendar,
    Clock,
    CheckCircle2,
    Star,
    TrendingUp,
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Phone,
    ArrowRight,
    Award,
    Heart
} from 'lucide-react';
import { KPICard, Card, CardHeader, CardTitle, Button, Badge, Avatar } from '@/components/ui';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const employees = [
    { id: 1, name: 'Alice Chen', role: 'Senior Engineer', department: 'Engineering', status: 'active', joinDate: 'Jan 2023', performance: 95, email: 'alice@agilebuddhi.com' },
    { id: 2, name: 'Bob Smith', role: 'Product Manager', department: 'Product', status: 'active', joinDate: 'Mar 2022', performance: 88, email: 'bob@agilebuddhi.com' },
    { id: 3, name: 'Carol Davis', role: 'UX Designer', department: 'Design', status: 'on-leave', joinDate: 'Jul 2023', performance: 92, email: 'carol@agilebuddhi.com' },
    { id: 4, name: 'Dan Lee', role: 'DevOps Lead', department: 'Engineering', status: 'active', joinDate: 'Nov 2021', performance: 90, email: 'dan@agilebuddhi.com' },
    { id: 5, name: 'Eve Martin', role: 'Marketing Specialist', department: 'Marketing', status: 'active', joinDate: 'Sep 2023', performance: 78, email: 'eve@agilebuddhi.com' },
    { id: 6, name: 'Frank Wilson', role: 'Sales Executive', department: 'Sales', status: 'active', joinDate: 'Feb 2024', performance: 85, email: 'frank@agilebuddhi.com' },
    { id: 7, name: 'Grace Kim', role: 'QA Engineer', department: 'Engineering', status: 'probation', joinDate: 'Dec 2025', performance: 72, email: 'grace@agilebuddhi.com' },
    { id: 8, name: 'Hank Brown', role: 'Data Analyst', department: 'Analytics', status: 'active', joinDate: 'May 2023', performance: 87, email: 'hank@agilebuddhi.com' },
];

const departmentData = [
    { name: 'Engineering', value: 35, color: '#76B900' },
    { name: 'Product', value: 15, color: '#00D4FF' },
    { name: 'Design', value: 12, color: '#9D4EDD' },
    { name: 'Marketing', value: 10, color: '#F59E0B' },
    { name: 'Sales', value: 18, color: '#EF4444' },
    { name: 'Analytics', value: 10, color: '#06B6D4' },
];

const hiringPipeline = [
    { stage: 'Applied', count: 124 },
    { stage: 'Screening', count: 48 },
    { stage: 'Interview', count: 22 },
    { stage: 'Offer', count: 8 },
    { stage: 'Hired', count: 5 },
];

const upcomingEvents = [
    { id: 1, title: 'Team All-Hands Meeting', date: 'Mar 3', type: 'meeting', time: '10:00 AM' },
    { id: 2, title: 'Carol Davis — Return from Leave', date: 'Mar 5', type: 'return', time: '' },
    { id: 3, title: 'Grace Kim — Probation Review', date: 'Mar 10', type: 'review', time: '2:00 PM' },
    { id: 4, title: 'Q1 Performance Reviews Due', date: 'Mar 31', type: 'deadline', time: '' },
    { id: 5, title: 'Company Anniversary Celebration', date: 'Apr 1', type: 'event', time: '5:00 PM' },
];

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'default'; label: string }> = {
    active: { variant: 'success', label: 'Active' },
    'on-leave': { variant: 'warning', label: 'On Leave' },
    probation: { variant: 'info', label: 'Probation' },
    terminated: { variant: 'error', label: 'Terminated' },
};

export default function HRPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [deptFilter, setDeptFilter] = useState('');

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = !deptFilter || emp.department === deptFilter;
        return matchesSearch && matchesDept;
    });

    const activeCount = employees.filter(e => e.status === 'active').length;
    const onLeaveCount = employees.filter(e => e.status === 'on-leave').length;
    const avgPerformance = Math.round(employees.reduce((s, e) => s + e.performance, 0) / employees.length);

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Human Resources</h1>
                    <p className="text-gray-400 mt-1">Manage employees, hiring, and organizational health</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Training
                    </Button>
                    <Button variant="primary">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Employee
                    </Button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard title="Total Employees" value={employees.length.toString()} change={12.5} icon={UsersRound} progress={82} progressLabel="of headcount goal" />
                <KPICard title="Active Now" value={activeCount.toString()} change={2.1} icon={CheckCircle2} iconColor="text-neon-green" progress={Math.round((activeCount / employees.length) * 100)} progressLabel="attendance" />
                <KPICard title="Avg Performance" value={`${avgPerformance}%`} change={5.3} icon={Star} iconColor="text-accent-amber" progress={avgPerformance} progressLabel="company avg" />
                <KPICard title="Open Positions" value="12" change={-8.3} icon={Briefcase} iconColor="text-accent-purple" progress={42} progressLabel="filled this quarter" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Hiring Pipeline */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Hiring Pipeline</CardTitle>
                        <Badge variant="info">This Quarter</Badge>
                    </CardHeader>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={hiringPipeline} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" horizontal={false} />
                                <XAxis type="number" stroke="#4D4D4D" fontSize={12} />
                                <YAxis dataKey="stage" type="category" stroke="#4D4D4D" fontSize={12} width={80} />
                                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: '8px', color: '#fff' }} />
                                <Bar dataKey="count" fill="#76B900" radius={[0, 6, 6, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Department Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>By Department</CardTitle>
                    </CardHeader>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                                    {departmentData.map((entry, i) => (<Cell key={`cell-${i}`} fill={entry.color} />))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: '8px', color: '#fff' }} formatter={(value: number) => [`${value}%`, 'Share']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-2">
                        {departmentData.map((d) => (
                            <div key={d.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                                    <span className="text-gray-300">{d.name}</span>
                                </div>
                                <span className="text-white font-medium">{d.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Upcoming Events + Employee Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Events */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming</CardTitle>
                        <Button variant="ghost" size="sm">View All <ArrowRight className="w-3 h-3 ml-1" /></Button>
                    </CardHeader>
                    <div className="space-y-3">
                        {upcomingEvents.map((evt) => (
                            <div key={evt.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface-gunmetal/30 transition-colors">
                                <div className={`p-2 rounded-lg ${evt.type === 'deadline' ? 'bg-accent-red/10' :
                                        evt.type === 'review' ? 'bg-accent-amber/10' :
                                            evt.type === 'event' ? 'bg-accent-purple/10' :
                                                'bg-surface-gunmetal'
                                    }`}>
                                    <Calendar className={`w-4 h-4 ${evt.type === 'deadline' ? 'text-accent-red' :
                                            evt.type === 'review' ? 'text-accent-amber' :
                                                evt.type === 'event' ? 'text-accent-purple' :
                                                    'text-gray-400'
                                        }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white truncate">{evt.title}</p>
                                    <p className="text-xs text-gray-500">{evt.date}{evt.time ? ` · ${evt.time}` : ''}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Employee Table */}
                <Card className="lg:col-span-2 overflow-hidden p-0">
                    <div className="p-6 pb-0">
                        <div className="flex items-center justify-between mb-4">
                            <CardTitle>Employees</CardTitle>
                            <div className="flex items-center gap-3">
                                <div className="relative max-w-xs">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field w-full pl-10 py-2 text-sm" />
                                </div>
                                <select className="input-field py-2 text-sm" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
                                    <option value="">All Depts</option>
                                    {departmentData.map(d => (<option key={d.name} value={d.name}>{d.name}</option>))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-surface-gunmetal bg-surface-carbon">
                                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Employee</th>
                                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Department</th>
                                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Performance</th>
                                    <th className="text-right py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((emp) => {
                                    const status = statusConfig[emp.status];
                                    return (
                                        <tr key={emp.id} className="border-b border-surface-gunmetal/50 hover:bg-surface-gunmetal/30 transition-colors group">
                                            <td className="py-3 px-6">
                                                <div className="flex items-center gap-3">
                                                    <Avatar name={emp.name} size="md" />
                                                    <div>
                                                        <p className="text-white text-sm font-medium">{emp.name}</p>
                                                        <p className="text-gray-500 text-xs">{emp.role}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6"><span className="text-sm text-gray-300">{emp.department}</span></td>
                                            <td className="py-3 px-6"><Badge variant={status.variant}>{status.label}</Badge></td>
                                            <td className="py-3 px-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-surface-gunmetal rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${emp.performance >= 85 ? 'bg-neon-green' : emp.performance >= 70 ? 'bg-accent-amber' : 'bg-accent-red'}`} style={{ width: `${emp.performance}%` }} />
                                                    </div>
                                                    <span className={`text-xs font-semibold ${emp.performance >= 85 ? 'text-neon-green' : emp.performance >= 70 ? 'text-accent-amber' : 'text-accent-red'}`}>{emp.performance}%</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-gray-400 hover:text-nvidia-green hover:bg-nvidia-green/10 rounded-lg transition-colors"><Mail className="w-4 h-4" /></button>
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
        </div>
    );
}
