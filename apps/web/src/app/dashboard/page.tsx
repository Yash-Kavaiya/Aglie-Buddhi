'use client';

import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { KPICard, Card, CardHeader, CardTitle, AIInsightCard, Button, Badge } from '@/components/ui';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000, target: 50000 },
  { month: 'Feb', revenue: 52000, target: 50000 },
  { month: 'Mar', revenue: 48000, target: 55000 },
  { month: 'Apr', revenue: 61000, target: 55000 },
  { month: 'May', revenue: 55000, target: 60000 },
  { month: 'Jun', revenue: 67000, target: 60000 },
  { month: 'Jul', revenue: 72000, target: 65000 },
];

const salesData = [
  { name: 'Enterprise', value: 45, color: '#76B900' },
  { name: 'SMB', value: 30, color: '#00D4FF' },
  { name: 'Startup', value: 25, color: '#9D4EDD' },
];

const aiInsights = [
  {
    id: '1',
    type: 'recommendation' as const,
    title: 'High-Conversion Leads',
    description: '3 leads have over 85% conversion probability. Focus your follow-ups here.',
    action: { label: 'View Leads', href: '/dashboard/crm?score=high' }
  },
  {
    id: '2',
    type: 'prediction' as const,
    title: 'Revenue Forecast',
    description: 'Based on current pipeline, expect 15% revenue growth next month.',
  },
  {
    id: '3',
    type: 'alert' as const,
    title: 'Low Stock Warning',
    description: '5 products are below reorder point. Consider restocking soon.',
    action: { label: 'Review Inventory', href: '/dashboard/inventory?low=true' }
  },
];

const recentActivities = [
  { id: 1, type: 'lead', title: 'New lead created', company: 'Acme Corp', time: '5 min ago', icon: Users },
  { id: 2, type: 'order', title: 'Order #1245 shipped', company: 'TechStart Inc', time: '23 min ago', icon: ShoppingCart },
  { id: 3, type: 'task', title: 'Task completed', company: 'Website Redesign', time: '1 hour ago', icon: CheckCircle2 },
  { id: 4, type: 'alert', title: 'Payment overdue', company: 'GlobalTech', time: '2 hours ago', icon: AlertCircle },
];

const upcomingTasks = [
  { id: 1, title: 'Follow up with Acme Corp', due: 'Today', priority: 'high' },
  { id: 2, title: 'Review Q2 financial report', due: 'Tomorrow', priority: 'medium' },
  { id: 3, title: 'Approve pending orders', due: 'Today', priority: 'low' },
  { id: 4, title: 'Team standup meeting', due: '9:00 AM', priority: 'medium' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Welcome back, John!</h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-graphite rounded-lg border border-surface-gunmetal">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">Last 7 days</span>
          </div>
          <Button variant="primary">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value="$124,500"
          change={12.5}
          icon={DollarSign}
          progress={75}
          progressLabel="of monthly target"
        />
        <KPICard
          title="Active Leads"
          value="248"
          change={8.2}
          icon={Users}
          iconColor="text-accent-blue"
          progress={62}
          progressLabel="of quarterly target"
        />
        <KPICard
          title="Orders This Month"
          value="1,847"
          change={-3.1}
          icon={ShoppingCart}
          iconColor="text-accent-purple"
          progress={89}
          progressLabel="vs last month"
        />
        <KPICard
          title="Conversion Rate"
          value="24.8%"
          change={5.4}
          icon={TrendingUp}
          progress={92}
          progressLabel="of target rate"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <Badge variant="success">+12.5%</Badge>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#76B900" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#76B900" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                <XAxis dataKey="month" stroke="#4D4D4D" fontSize={12} />
                <YAxis stroke="#4D4D4D" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    border: '1px solid #2D2D2D',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#76B900" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#00D4FF" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sales by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Type</CardTitle>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" horizontal={false} />
                <XAxis type="number" stroke="#4D4D4D" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#4D4D4D" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    border: '1px solid #2D2D2D',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {salesData.map((entry, index) => (
                    <Bar key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* AI Insights & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-semibold text-white">AI Insights</h2>
            <Badge variant="ai">✨ AI Powered</Badge>
          </div>
          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <AIInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </CardHeader>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-surface-gunmetal">
                  <activity.icon className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.company}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Tasks</CardTitle>
          <Button variant="secondary" size="sm">Add Task</Button>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-gunmetal">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Task</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Due</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingTasks.map((task) => (
                <tr key={task.id} className="border-b border-surface-gunmetal/50 hover:bg-surface-gunmetal/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-surface-slate bg-surface-void text-nvidia-green focus:ring-nvidia-green focus:ring-offset-0"
                      />
                      <span className="text-sm text-white">{task.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      {task.due}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge 
                      variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default'}
                    >
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
