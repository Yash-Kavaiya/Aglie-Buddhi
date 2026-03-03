'use client';

import { useState } from 'react';
import {
    Package,
    AlertTriangle,
    TrendingUp,
    Warehouse,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    ArrowRight,
    ArrowUpDown,
    Eye,
    Edit,
    Download,
    BarChart3
} from 'lucide-react';
import { KPICard, Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const inventoryItems = [
    { id: 'SKU-001', name: 'Enterprise Suite License', category: 'Software', stock: 248, reorder: 50, price: 1299, status: 'in-stock', trend: 12 },
    { id: 'SKU-002', name: 'Pro License (Annual)', category: 'Software', stock: 89, reorder: 100, price: 499, status: 'low-stock', trend: -8 },
    { id: 'SKU-003', name: 'API Access Token (1M calls)', category: 'Services', stock: 1520, reorder: 200, price: 149, status: 'in-stock', trend: 24 },
    { id: 'SKU-004', name: 'Custom Integration Package', category: 'Services', stock: 15, reorder: 20, price: 2499, status: 'low-stock', trend: 45 },
    { id: 'SKU-005', name: 'Starter Pack (Monthly)', category: 'Software', stock: 0, reorder: 50, price: 29, status: 'out-of-stock', trend: -15 },
    { id: 'SKU-006', name: 'Data Analytics Add-on', category: 'Add-ons', stock: 342, reorder: 80, price: 199, status: 'in-stock', trend: 18 },
    { id: 'SKU-007', name: 'Priority Support Plan', category: 'Services', stock: 67, reorder: 30, price: 599, status: 'in-stock', trend: 5 },
    { id: 'SKU-008', name: 'Training & Onboarding', category: 'Services', stock: 8, reorder: 10, price: 3999, status: 'low-stock', trend: 32 },
];

const categoryBreakdown = [
    { name: 'Software', value: 45, color: '#76B900' },
    { name: 'Services', value: 30, color: '#00D4FF' },
    { name: 'Add-ons', value: 15, color: '#9D4EDD' },
    { name: 'Hardware', value: 10, color: '#F59E0B' },
];

const stockMovement = [
    { month: 'Jan', inbound: 320, outbound: 280 },
    { month: 'Feb', inbound: 380, outbound: 310 },
    { month: 'Mar', inbound: 290, outbound: 340 },
    { month: 'Apr', inbound: 420, outbound: 360 },
    { month: 'May', inbound: 380, outbound: 400 },
    { month: 'Jun', inbound: 450, outbound: 390 },
    { month: 'Jul', inbound: 510, outbound: 420 },
];

const warehouseData = [
    { name: 'Warehouse A', capacity: 85, items: 1240, location: 'US East' },
    { name: 'Warehouse B', capacity: 62, items: 890, location: 'US West' },
    { name: 'Warehouse C', capacity: 94, items: 520, location: 'EU Central' },
    { name: 'Warehouse D', capacity: 41, items: 340, location: 'AP South' },
];

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'error'; label: string }> = {
    'in-stock': { variant: 'success', label: 'In Stock' },
    'low-stock': { variant: 'warning', label: 'Low Stock' },
    'out-of-stock': { variant: 'error', label: 'Out of Stock' },
};

export default function InventoryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const filteredItems = inventoryItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const lowStockCount = inventoryItems.filter(i => i.status === 'low-stock').length;
    const outOfStockCount = inventoryItems.filter(i => i.status === 'out-of-stock').length;
    const totalValue = inventoryItems.reduce((sum, i) => sum + i.stock * i.price, 0);

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Inventory</h1>
                    <p className="text-gray-400 mt-1">Manage stock levels, products, and warehouse operations</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Button variant="primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="Total Products"
                    value={inventoryItems.length.toString()}
                    change={6.2}
                    icon={Package}
                    progress={78}
                    progressLabel="cataloged"
                />
                <KPICard
                    title="Total Stock Value"
                    value={`$${(totalValue / 1000).toFixed(0)}K`}
                    change={11.4}
                    icon={BarChart3}
                    iconColor="text-accent-blue"
                    progress={85}
                    progressLabel="vs last quarter"
                />
                <KPICard
                    title="Low Stock Alerts"
                    value={lowStockCount.toString()}
                    change={-25}
                    icon={AlertTriangle}
                    iconColor="text-accent-amber"
                    progress={30}
                    progressLabel="items below reorder"
                />
                <KPICard
                    title="Warehouse Utilization"
                    value="72%"
                    change={3.8}
                    icon={Warehouse}
                    iconColor="text-accent-purple"
                    progress={72}
                    progressLabel="average capacity"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stock Movement */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Stock Movement</CardTitle>
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-nvidia-green" />
                                <span className="text-gray-400">Inbound</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                                <span className="text-gray-400">Outbound</span>
                            </div>
                        </div>
                    </CardHeader>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stockMovement}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" vertical={false} />
                                <XAxis dataKey="month" stroke="#4D4D4D" fontSize={12} />
                                <YAxis stroke="#4D4D4D" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1A1A1A',
                                        border: '1px solid #2D2D2D',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                                <Bar dataKey="inbound" fill="#76B900" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="outbound" fill="#00D4FF" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Category Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>By Category</CardTitle>
                    </CardHeader>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={75}
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {categoryBreakdown.map((entry, index) => (
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
                        {categoryBreakdown.map((cat) => (
                            <div key={cat.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                                    <span className="text-gray-300">{cat.name}</span>
                                </div>
                                <span className="text-white font-medium">{cat.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Warehouse Cards */}
            <div>
                <h2 className="text-lg font-display font-semibold text-white mb-4">Warehouse Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {warehouseData.map((wh) => (
                        <Card key={wh.name} variant="interactive">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-semibold text-sm">{wh.name}</h3>
                                <Badge variant={wh.capacity > 90 ? 'error' : wh.capacity > 70 ? 'warning' : 'success'}>
                                    {wh.capacity}%
                                </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mb-3">{wh.location}</p>
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-400">Capacity</span>
                                <span className="text-white font-medium">{wh.items} items</span>
                            </div>
                            <div className="h-2 bg-surface-gunmetal rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${wh.capacity > 90 ? 'bg-accent-red' :
                                            wh.capacity > 70 ? 'bg-accent-amber' :
                                                'bg-gradient-to-r from-nvidia-green to-neon-green'
                                        }`}
                                    style={{ width: `${wh.capacity}%` }}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Inventory Table */}
            <Card className="overflow-hidden p-0">
                <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-4">
                        <CardTitle>All Products</CardTitle>
                        <div className="flex items-center gap-3">
                            <div className="relative max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input-field w-full pl-10 py-2 text-sm"
                                />
                            </div>
                            <select
                                className="input-field py-2 text-sm"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                <option value="Software">Software</option>
                                <option value="Services">Services</option>
                                <option value="Add-ons">Add-ons</option>
                            </select>
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
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">SKU</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    <div className="flex items-center gap-1 cursor-pointer hover:text-gray-200">
                                        Stock <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Trend</th>
                                <th className="text-right py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item) => {
                                const status = statusConfig[item.status];
                                const stockPercent = Math.min((item.stock / (item.reorder * 3)) * 100, 100);
                                return (
                                    <tr
                                        key={item.id}
                                        className="border-b border-surface-gunmetal/50 hover:bg-surface-gunmetal/30 transition-colors group"
                                    >
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-surface-gunmetal">
                                                    <Package className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <span className="text-sm text-white font-medium">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="text-sm text-accent-blue font-mono">{item.id}</span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="text-sm text-gray-300">{item.category}</span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-16 h-1.5 bg-surface-gunmetal rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${item.status === 'out-of-stock' ? 'bg-accent-red' :
                                                                item.status === 'low-stock' ? 'bg-accent-amber' :
                                                                    'bg-neon-green'
                                                            }`}
                                                        style={{ width: `${stockPercent}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-white font-medium">{item.stock.toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className="text-sm text-white">${item.price.toLocaleString()}</span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <Badge variant={status.variant}>
                                                {status.label}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-1">
                                                <TrendingUp className={`w-3.5 h-3.5 ${item.trend > 0 ? 'text-neon-green' : 'text-accent-red rotate-180'}`} />
                                                <span className={`text-xs font-semibold ${item.trend > 0 ? 'text-neon-green' : 'text-accent-red'}`}>
                                                    {item.trend > 0 ? '+' : ''}{item.trend}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-nvidia-green hover:bg-nvidia-green/10 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
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
                    <span className="text-sm text-gray-400">Showing {filteredItems.length} of {inventoryItems.length} products</span>
                    <Button variant="ghost" size="sm">
                        View All Products <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                </div>
            </Card>
        </div>
    );
}
