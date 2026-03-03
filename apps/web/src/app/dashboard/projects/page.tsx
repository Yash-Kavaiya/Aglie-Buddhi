'use client';

import { useState } from 'react';
import {
    FolderKanban,
    Clock,
    CheckCircle2,
    AlertCircle,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Calendar,
    Users,
    ArrowRight,
    ExternalLink,
    Flame,
    Target
} from 'lucide-react';
import { KPICard, Card, CardHeader, CardTitle, Button, Badge, Avatar } from '@/components/ui';

const projects = [
    {
        id: '1',
        name: 'Website Redesign',
        description: 'Complete overhaul of company website with new branding',
        status: 'in-progress',
        priority: 'high',
        progress: 72,
        dueDate: 'Mar 15, 2026',
        team: ['Alice Chen', 'Bob Smith', 'Carol Davis'],
        tasks: { total: 48, completed: 35 },
        budget: { spent: 45000, total: 60000 },
    },
    {
        id: '2',
        name: 'Mobile App v2.0',
        description: 'Cross-platform mobile application with new features',
        status: 'in-progress',
        priority: 'high',
        progress: 45,
        dueDate: 'Apr 20, 2026',
        team: ['Dan Lee', 'Eve Martin', 'Frank Wilson', 'Grace Kim'],
        tasks: { total: 86, completed: 39 },
        budget: { spent: 82000, total: 120000 },
    },
    {
        id: '3',
        name: 'API Gateway Migration',
        description: 'Migrate existing APIs to new gateway infrastructure',
        status: 'on-track',
        priority: 'medium',
        progress: 88,
        dueDate: 'Feb 28, 2026',
        team: ['Hank Brown', 'Ivy Patel'],
        tasks: { total: 32, completed: 28 },
        budget: { spent: 18000, total: 25000 },
    },
    {
        id: '4',
        name: 'Customer Portal',
        description: 'Self-service portal for enterprise customers',
        status: 'at-risk',
        priority: 'high',
        progress: 34,
        dueDate: 'Mar 01, 2026',
        team: ['Jack Zhou', 'Kate Lee', 'Leo Nguyen'],
        tasks: { total: 64, completed: 22 },
        budget: { spent: 55000, total: 50000 },
    },
    {
        id: '5',
        name: 'Data Pipeline Optimization',
        description: 'Improve ETL performance and reduce processing time',
        status: 'completed',
        priority: 'low',
        progress: 100,
        dueDate: 'Jan 31, 2026',
        team: ['Mike Jones', 'Nina Rao'],
        tasks: { total: 24, completed: 24 },
        budget: { spent: 12000, total: 15000 },
    },
    {
        id: '6',
        name: 'Security Audit 2026',
        description: 'Annual security review and compliance certification',
        status: 'planning',
        priority: 'medium',
        progress: 10,
        dueDate: 'May 30, 2026',
        team: ['Oscar Diaz'],
        tasks: { total: 18, completed: 2 },
        budget: { spent: 3000, total: 35000 },
    },
];

const milestones = [
    { id: 1, name: 'Website Redesign — Beta Launch', project: 'Website Redesign', date: 'Mar 5', status: 'upcoming' },
    { id: 2, name: 'API Migration — Phase 2 Complete', project: 'API Gateway Migration', date: 'Feb 28', status: 'upcoming' },
    { id: 3, name: 'Mobile App — Design Review', project: 'Mobile App v2.0', date: 'Mar 10', status: 'upcoming' },
    { id: 4, name: 'Customer Portal — Wireframes', project: 'Customer Portal', date: 'Feb 15', status: 'overdue' },
    { id: 5, name: 'Data Pipeline — Final Report', project: 'Data Pipeline Optimization', date: 'Jan 31', status: 'completed' },
];

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'default'; label: string }> = {
    'in-progress': { variant: 'info', label: 'In Progress' },
    'on-track': { variant: 'success', label: 'On Track' },
    'at-risk': { variant: 'error', label: 'At Risk' },
    'completed': { variant: 'success', label: 'Completed' },
    'planning': { variant: 'default', label: 'Planning' },
};

const priorityConfig: Record<string, { color: string; label: string }> = {
    high: { color: 'text-accent-red', label: 'High' },
    medium: { color: 'text-accent-amber', label: 'Medium' },
    low: { color: 'text-neon-green', label: 'Low' },
};

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = !statusFilter || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const activeProjects = projects.filter(p => p.status !== 'completed').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const atRiskProjects = projects.filter(p => p.status === 'at-risk').length;
    const avgProgress = Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length);

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Projects</h1>
                    <p className="text-gray-400 mt-1">Track project progress, milestones, and team allocation</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="ai">
                        <Flame className="w-4 h-4 mr-2" />
                        AI Project Insights
                    </Button>
                    <Button variant="primary">
                        <Plus className="w-4 h-4 mr-2" />
                        New Project
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="Active Projects"
                    value={activeProjects.toString()}
                    change={20}
                    icon={FolderKanban}
                    progress={80}
                    progressLabel="of capacity"
                />
                <KPICard
                    title="Avg Progress"
                    value={`${avgProgress}%`}
                    change={8.5}
                    icon={Target}
                    iconColor="text-accent-blue"
                    progress={avgProgress}
                    progressLabel="overall completion"
                />
                <KPICard
                    title="At Risk"
                    value={atRiskProjects.toString()}
                    change={-50}
                    icon={AlertCircle}
                    iconColor="text-accent-red"
                    progress={atRiskProjects > 0 ? 20 : 100}
                    progressLabel="need attention"
                />
                <KPICard
                    title="Completed"
                    value={completedProjects.toString()}
                    change={100}
                    icon={CheckCircle2}
                    iconColor="text-neon-green"
                    progress={100}
                    progressLabel="this quarter"
                />
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field w-full pl-10"
                        />
                    </div>
                    <select
                        className="input-field py-2 text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="in-progress">In Progress</option>
                        <option value="on-track">On Track</option>
                        <option value="at-risk">At Risk</option>
                        <option value="planning">Planning</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredProjects.map((project) => {
                    const status = statusConfig[project.status];
                    const priority = priorityConfig[project.priority];
                    const budgetPercent = Math.round((project.budget.spent / project.budget.total) * 100);
                    const overBudget = project.budget.spent > project.budget.total;

                    return (
                        <Card key={project.id} variant="interactive" className="group">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-white font-semibold truncate">{project.name}</h3>
                                        <Badge variant={status.variant}>{status.label}</Badge>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{project.description}</p>
                                </div>
                                <button className="p-1.5 text-gray-500 hover:text-white hover:bg-surface-gunmetal rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Progress */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-1.5">
                                    <span className="text-gray-400">Progress</span>
                                    <span className="text-white font-medium">{project.progress}%</span>
                                </div>
                                <div className="h-2 bg-surface-gunmetal rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${project.progress >= 80 ? 'bg-gradient-to-r from-nvidia-green to-neon-green' :
                                                project.progress >= 50 ? 'bg-accent-blue' :
                                                    'bg-accent-amber'
                                            }`}
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Details Row */}
                            <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs mb-0.5">Tasks</p>
                                    <p className="text-white font-medium">{project.tasks.completed}/{project.tasks.total}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs mb-0.5">Budget</p>
                                    <p className={`font-medium ${overBudget ? 'text-accent-red' : 'text-white'}`}>
                                        ${(project.budget.spent / 1000).toFixed(0)}K / ${(project.budget.total / 1000).toFixed(0)}K
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs mb-0.5">Priority</p>
                                    <p className={`font-medium ${priority.color}`}>{priority.label}</p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-surface-gunmetal/60">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {project.team.slice(0, 3).map((member) => (
                                            <Avatar key={member} name={member} size="sm" />
                                        ))}
                                        {project.team.length > 3 && (
                                            <div className="w-7 h-7 rounded-full bg-surface-gunmetal border-2 border-surface-graphite flex items-center justify-center text-xs text-gray-400">
                                                +{project.team.length - 3}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500">{project.team.length} members</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {project.dueDate}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Milestones */}
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Milestones</CardTitle>
                    <Button variant="ghost" size="sm">
                        View All <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                </CardHeader>
                <div className="space-y-3">
                    {milestones.map((ms) => (
                        <div
                            key={ms.id}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-gunmetal/30 transition-colors"
                        >
                            <div className={`p-2 rounded-lg ${ms.status === 'completed' ? 'bg-neon-green/10' :
                                    ms.status === 'overdue' ? 'bg-accent-red/10' :
                                        'bg-surface-gunmetal'
                                }`}>
                                {ms.status === 'completed' ? (
                                    <CheckCircle2 className="w-4 h-4 text-neon-green" />
                                ) : ms.status === 'overdue' ? (
                                    <AlertCircle className="w-4 h-4 text-accent-red" />
                                ) : (
                                    <Clock className="w-4 h-4 text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${ms.status === 'completed' ? 'text-gray-500 line-through' : 'text-white'}`}>
                                    {ms.name}
                                </p>
                                <p className="text-xs text-gray-500">{ms.project}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={
                                    ms.status === 'completed' ? 'success' :
                                        ms.status === 'overdue' ? 'error' :
                                            'default'
                                }>
                                    {ms.date}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
