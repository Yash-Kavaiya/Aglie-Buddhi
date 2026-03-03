'use client';

import { useState } from 'react';
import {
    DollarSign, Receipt, CreditCard, TrendingUp, TrendingDown,
    ArrowRight, Download, Filter, Search, MoreHorizontal, Eye,
    ArrowUpRight, ArrowDownRight, Wallet, PiggyBank
} from 'lucide-react';
import { KPICard, Card, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const cashFlowData = [
    { month: 'Jan', income: 85000, expenses: 62000 },
    { month: 'Feb', income: 92000, expenses: 68000 },
    { month: 'Mar', income: 78000, expenses: 71000 },
    { month: 'Apr', income: 105000, expenses: 75000 },
    { month: 'May', income: 98000, expenses: 80000 },
    { month: 'Jun', income: 115000, expenses: 78000 },
    { month: 'Jul', income: 125000, expenses: 82000 },
];

const expenseCategories = [
    { category: 'Payroll', amount: 45000, percent: 55 },
    { category: 'Infrastructure', amount: 12000, percent: 15 },
    { category: 'Marketing', amount: 8500, percent: 10 },
    { category: 'Software', amount: 6800, percent: 8 },
    { category: 'Office', amount: 5200, percent: 6 },
    { category: 'Other', amount: 4500, percent: 6 },
];

const recentTransactions = [
    { id: 'TXN-4821', description: 'Client Payment — Acme Corp', amount: 12500, type: 'income', date: '2 hours ago', category: 'Revenue' },
    { id: 'TXN-4820', description: 'AWS Monthly Invoice', amount: -4200, type: 'expense', date: '5 hours ago', category: 'Infrastructure' },
    { id: 'TXN-4819', description: 'Employee Payroll — March', amount: -45000, type: 'expense', date: '1 day ago', category: 'Payroll' },
    { id: 'TXN-4818', description: 'Client Payment — TechStart', amount: 8900, type: 'income', date: '1 day ago', category: 'Revenue' },
    { id: 'TXN-4817', description: 'Google Ads Campaign', amount: -2300, type: 'expense', date: '2 days ago', category: 'Marketing' },
    { id: 'TXN-4816', description: 'Office Rent — Q1', amount: -5200, type: 'expense', date: '3 days ago', category: 'Office' },
];

export default function AccountingPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTxns = recentTransactions.filter(t =>
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Accounting</h1>
                    <p className="text-gray-400 mt-1">Financial overview, cash flow, and transactions</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary"><Download className="w-4 h-4 mr-2" />Export Report</Button>
                    <Button variant="primary"><Receipt className="w-4 h-4 mr-2" />New Invoice</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard title="Total Revenue" value="$698K" change={18.2} icon={DollarSign} progress={88} progressLabel="of annual target" />
                <KPICard title="Net Profit" value="$215K" change={12.5} icon={TrendingUp} iconColor="text-neon-green" progress={72} progressLabel="profit margin" />
                <KPICard title="Total Expenses" value="$483K" change={-5.3} icon={CreditCard} iconColor="text-accent-red" progress={65} progressLabel="of budget" />
                <KPICard title="Accounts Receivable" value="$42K" change={-15} icon={Wallet} iconColor="text-accent-amber" progress={38} progressLabel="outstanding" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Cash Flow</CardTitle>
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-nvidia-green" /><span className="text-gray-400">Income</span></div>
                            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-accent-red" /><span className="text-gray-400">Expenses</span></div>
                        </div>
                    </CardHeader>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={cashFlowData}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#76B900" stopOpacity={0.3} /><stop offset="95%" stopColor="#76B900" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} /><stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                                <XAxis dataKey="month" stroke="#4D4D4D" fontSize={12} />
                                <YAxis stroke="#4D4D4D" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                                <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: '8px', color: '#fff' }} formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                                <Area type="monotone" dataKey="income" stroke="#76B900" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                                <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Expense Breakdown</CardTitle></CardHeader>
                    <div className="space-y-3">
                        {expenseCategories.map((cat) => (
                            <div key={cat.category}>
                                <div className="flex items-center justify-between text-sm mb-1">
                                    <span className="text-gray-300">{cat.category}</span>
                                    <span className="text-white font-medium">${(cat.amount / 1000).toFixed(1)}K</span>
                                </div>
                                <div className="h-1.5 bg-surface-gunmetal rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-nvidia-green to-neon-green rounded-full" style={{ width: `${cat.percent}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <Card className="overflow-hidden p-0">
                <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-4">
                        <CardTitle>Recent Transactions</CardTitle>
                        <div className="flex items-center gap-3">
                            <div className="relative max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input type="text" placeholder="Search transactions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field w-full pl-10 py-2 text-sm" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-surface-gunmetal bg-surface-carbon">
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Transaction</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                                <th className="text-left py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="text-right py-3 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTxns.map((txn) => (
                                <tr key={txn.id} className="border-b border-surface-gunmetal/50 hover:bg-surface-gunmetal/30 transition-colors group">
                                    <td className="py-3 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${txn.type === 'income' ? 'bg-neon-green/10' : 'bg-accent-red/10'}`}>
                                                {txn.type === 'income' ? <ArrowUpRight className="w-4 h-4 text-neon-green" /> : <ArrowDownRight className="w-4 h-4 text-accent-red" />}
                                            </div>
                                            <div>
                                                <p className="text-sm text-white font-medium">{txn.description}</p>
                                                <p className="text-xs text-gray-500">{txn.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6"><Badge variant="default">{txn.category}</Badge></td>
                                    <td className="py-3 px-6">
                                        <span className={`text-sm font-semibold ${txn.type === 'income' ? 'text-neon-green' : 'text-accent-red'}`}>
                                            {txn.type === 'income' ? '+' : ''}${Math.abs(txn.amount).toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6"><span className="text-sm text-gray-400">{txn.date}</span></td>
                                    <td className="py-3 px-6">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-nvidia-green hover:bg-nvidia-green/10 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-surface-gunmetal rounded-lg transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 flex items-center justify-between border-t border-surface-gunmetal">
                    <span className="text-sm text-gray-400">Showing {filteredTxns.length} transactions</span>
                    <Button variant="ghost" size="sm">View All <ArrowRight className="w-3 h-3 ml-1" /></Button>
                </div>
            </Card>
        </div>
    );
}
