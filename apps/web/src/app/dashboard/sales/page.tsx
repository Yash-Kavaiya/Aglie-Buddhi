'use client';

import { useState } from 'react';
import {
    DollarSign,
    TrendingUp,
    ShoppingCart,
    Package,
    ArrowRight,
    Search,
    Filter,
    MoreHorizontal,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    Eye,
    Download
} from 'lucide-react';
import { KPICard, Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const monthlySalesData = [
    { month: 'Jan', sales: 32000, orders: 145 },
    { month: 'Feb', sales: 38000, orders: 162 },
    { month: 'Mar', sales: 35000, orders: 158 },
    { month: 'Apr', sales: 42000, orders: 189 },
    { month: 'May', sales: 48000, orders: 210 },
    { month: 'Jun', sales: 52000, orders: 235 },
    { month: 'Jul', sales: 58000, orders: 248 },
];

const topProducts = [
    { name: 'Enterprise Suite', revenue: 45200, units: 12, growth: 18.5 },
    { name: 'Pro License', revenue: 32100, units: 89, growth: 12.3 },
    { name: 'Starter Pack', revenue: 18500, units: 245, growth: -2.1 },
    { name: 'API Access', revenue: 15800, units: 156, growth: 24.7 },
    { name: 'Custom Integration', revenue: 12400, units: 8, growth: 45.0 },
];

const channelData = [
    { name: 'Direct Sales', value: 42, color: '#76B900' },
    { name: 'Partner', value: 28, color: '#00D4FF' },
    { name: 'Online', value: 20, color: '#9D4EDD' },
    { name: 'Referral', value: 10, color: '#F59E0B' },
];

const recentOrders = [
    { id: 'ORD-2847', customer: 'Acme Corp', product: 'Enterprise Suite', amount: 12500, status: 'completed', date: '2 hours ago' },
    { id: 'ORD-2846', customer: 'TechStart Inc', product: 'Pro License', amount: 4200, status: 'processing', date: '3 hours ago' },
    { id: 'ORD-2845', customer: 'GlobalTech', product: 'API Access', amount: 890, status: 'completed', date: '5 hours ago' },
    { id: 'ORD-2844', customer: 'StartupHub', product: 'Starter Pack', amount: 299, status: 'pending', date: '6 hours ago' },
    { id: 'ORD-2843', customer: 'Enterprise Co', product: 'Custom Integration', amount: 18900, status: 'completed', date: '1 day ago' },
    { id: 'ORD-2842', customer: 'DataFlow Ltd', product: 'Enterprise Suite', amount: 12500, status: 'cancelled', date: '1 day ago' },
];

const weeklyPerformance = [
    { day: 'Mon', sales: 8200, target: 9000 },
    { day: 'Tue', sales: 9500, target: 9000 },
    { day: 'Wed', sales: 7800, target: 9000 },
    { day: 'Thu', sales: 11200, target: 9000 },
    { day: 'Fri', sales: 10100, target: 9000 },
    { day: 'Sat', sales: 5400, target: 4000 },
    { day: 'Sun', sales: 3200, target: 4000 },
];

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'default'; icon: React.ElementType }> = {
    completed: { variant: 'success', icon: CheckCircle2 },
    processing: { variant: 'info', icon: Clock },
    pending: { variant: 'warning', icon: Clock },
    cancelled: { variant: 'error', icon: XCircle },
};

export default function SalesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [timeRange, setTimeRange] = useState('7d');

    const filteredOrders = recentOrders.filter(order =>
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Sales</h1>
                    <p className="text-gray-400 mt-1">Track revenue, orders, and sales performance</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 px-1 py-1 bg-surface-graphite rounded-lg border border-surface-gunmetal">
                        {[
                            { label: '7D', value: '7d' },
                            { label: '30D', value: '30d' },
                            { label: '90D', value: '90d' },
                            { label: '1Y', value: '1y' },
                        ].map(range => (
                            <button
                                key={range.value}
                                onClick={() => setTimeRange(range.value)}
                                className={`px-3 py-1.5 text-sm rounded transition-colors ${timeRange === range.value
                                        ? 'bg-nvidia-green/20 text-nvidia-green font-medium'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                    <Button variant="primary">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="Total Revenue"
                    value="$305,000"
                    change={14.2}
                    icon={DollarSign}
                    progress={82}
                    progressLabel="of quarterly target"
                />
                <KPICard
                    title="Total Orders"
                    value="1,247"
                    change={9.8}
                    icon={ShoppingCart}
                    iconColor="text-accent-blue"
                    progress={71}
                    progressLabel="of quarterly target"
                />
                <KPICard
                    title="Avg Order Value"
                    value="$244.50"
                    change={4.3}
                    icon={TrendingUp}
                    iconColor="text-accent-purple"
                    progress={88}
                    progressLabel="vs benchmark"
                />
                <KPICard
                    title="Products Sold"
                    value="510"
                    change={-1.5}
                    icon={Package}
                    iconColor="text-accent-amber"
                    progress={65}
                    progressLabel="of monthly target"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Trend */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Sales Trend</CardTitle>
                        <Badge variant="success">+14.2%</Badge>
                    </CardHeader>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlySalesData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#76B900" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#76B900" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                                <XAxis dataKey="month" stroke="#4D4D4D" fontSize={12} />
                                <YAxis stroke="#4D4D4D" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1A1A1A',
                                        border: '1px solid #2D2D2D',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    formatter={(value: number, name: string) => [
                                        name === 'sales' ? `$${value.toLocaleString()}` : value.toLocaleString(),
                                        name === 'sales' ? 'Revenue' : 'Orders'
                                    ]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#76B900"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Sales by Channel */}
                <Card>
                    <CardHeader>
                        <CardTitle>By Channel</CardTitle>
                    </CardHeader>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={channelData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={75}
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {channelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1A1A1A',
                                        border: '1px solid #2D2D2D',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    formatter={(value: number) => [`${value}%`, 'Share']}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-2">
                        {channelData.map((channel) => (
                            <div key={channel.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.color }} />
                                    <span className="text-gray-300">{channel.name}</span>
                                </div>
                                <span className="text-white font-medium">{channel.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Weekly Performance + Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Performance</CardTitle>
                        <Badge variant="info">This Week</Badge>
                    </CardHeader>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyPerformance}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" vertical={false} />
                                <XAxis dataKey="day" stroke="#4D4D4D" fontSize={12} />
                                <YAxis stroke="#4D4D4D" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1A1A1A',
                                        border: '1px solid #2D2D2D',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                                />
                                <Bar dataKey="target" fill="#2D2D2D" radius={[4, 4, 0, 0]} barSize={24} />
                                <Bar dataKey="sales" fill="#76B900" radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Top Products */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Products</CardTitle>
                        <Button variant="ghost" size="sm">
                            View All <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                    </CardHeader>
                    <div className="space-y-4">
                        {topProducts.map((product, index) => (
                            <div key={product.name} className="flex items-center gap-4 group">
                                <span className="text-xs text-gray-500 w-5 font-medium">#{index + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm text-white font-medium truncate">{product.name}</p>
                                        <span className="text-sm text-white font-semibold">${product.revenue.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">{product.units} units sold</span>
                                        <span className={`text-xs font-medium ${product.growth > 0 ? 'text-neon-green' : 'text-accent-red'}`}>
                                            {product.growth > 0 ? '+' : ''}{product.growth}%
                                        </span>
                                    </div>
                                    <div className="mt-1.5 h-1 bg-surface-gunmetal rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-nvidia-green to-neon-green rounded-full"
                                            style={{ width: `${(product.revenue / topProducts[0].revenue) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card className="overflow-hidden p-0">
                <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-4">
                        <CardTitle>Recent Orders</CardTitle>
                        <div className="flex items-center gap-3">
                            <div className="relative max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input-field w-full pl-10 py-2 text-sm"
                                />
                            </div>
                            <Button variant="secondary" size="sm">
                                <Filter className="w-4 h-4 mr-1" />
                                Filter
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-surface-gunmetal bg-surface-carbon">
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Order ID</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="text-right py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => {
                                const status = statusConfig[order.status];
                                const StatusIcon = status.icon;
                                return (
                                    <tr
                                        key={order.id}
                                        className="border-b border-surface-gunmetal/50 hover:bg-surface-gunmetal/30 transition-colors group"
                                    >
                                        <td className="py-3 px-6">
                                            <span className="text-sm text-accent-blue font-mono font-medium">{order.id}</span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="text-sm text-white">{order.customer}</span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="text-sm text-gray-300">{order.product}</span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="text-sm text-white font-semibold">${order.amount.toLocaleString()}</span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <Badge variant={status.variant}>
                                                <StatusIcon className="w-3 h-3 mr-1" />
                                                {order.status}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="text-sm text-gray-400">{order.date}</span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-nvidia-green hover:bg-nvidia-green/10 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
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
                <div className="p-4 flex items-center justify-between border-t border-surface-gunmetal">
                    <span className="text-sm text-gray-400">Showing {filteredOrders.length} of {recentOrders.length} orders</span>
                    <Button variant="ghost" size="sm">
                        View All Orders <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                </div>
            </Card>
        </div>
    );
}
