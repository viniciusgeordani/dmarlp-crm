import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Bell } from 'lucide-react';
import { useCRM } from '../context/CRMContext';
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

export default function Dashboard() {
    const { leads } = useCRM();

    // Basic Metrics
    const totalLeads = leads.length;
    const closedLeads = leads.filter(l => l.status === 'fechado').length;
    const activeLeads = leads.filter(l => l.status !== 'fechado' && l.status !== 'perdido').length;
    const conversionRate = totalLeads ? ((closedLeads / totalLeads) * 100).toFixed(1) : '0';

    // Money mapping simplified for chart (assuming "10k" to 10000 format parsing or simple count)
    // For the chart, we'll show leads by status
    const data = [
        { name: 'Novo', value: leads.filter(l => l.status === 'pendente').length, fill: '#fcd34d' }, // amber-300
        { name: 'Atendendo', value: leads.filter(l => l.status === 'em_atendimento').length, fill: '#7dd3fc' }, // sky-300
        { name: 'Proposta', value: leads.filter(l => l.status === 'apresentacao').length, fill: '#818cf8' }, // indigo-400
        { name: 'Vendido', value: closedLeads, fill: '#004243' }, // DMar green
    ];

    return (
        <div className="min-h-screen w-full bg-slate-50 text-slate-800 font-sans flex overflow-hidden">
            <Sidebar />
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-white shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] rounded-tl-[2rem] my-3 mr-3 overflow-hidden">
                <header className="h-20 bg-white flex items-center justify-between pl-8 pr-10 flex-shrink-0 z-10 w-full pt-2">
                    <div>
                        <h2 className="text-[22px] font-extrabold text-[#004243] leading-tight">Dashboard</h2>
                        <p className="text-sm font-medium text-gray-400 mt-1">Visão Geral de Vendas D'Mar</p>
                    </div>
                    <div className="flex items-center gap-6 ml-4">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
                            <Bell size={22} strokeWidth={1.5} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-px h-8 bg-gray-100"></div>
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800 tracking-wide group-hover:text-[#004243] transition-colors">Equipe Comercial</p>
                                <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">Online</p>
                            </div>
                            <img src="https://ui-avatars.com/api/?name=D+M&background=004243&color=fff" className="w-10 h-10 rounded-full shadow-sm group-hover:shadow-md transition-shadow object-cover" />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 pb-20 bg-slate-50/50">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100/50 flex flex-col justify-between hover:shadow-lg transition-all cursor-default hover:-translate-y-1">
                            <h3 className="text-sm font-bold tracking-wide text-gray-500 uppercase">Total de Leads</h3>
                            <p className="text-4xl font-black text-gray-900 mt-4">{totalLeads}</p>
                        </div>
                        <div className="bg-white p-6 rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100/50 flex flex-col justify-between hover:shadow-lg transition-all cursor-default hover:-translate-y-1">
                            <h3 className="text-sm font-bold tracking-wide text-amber-500 uppercase">Leads Ativos</h3>
                            <p className="text-4xl font-black text-gray-900 mt-4">{activeLeads}</p>
                        </div>
                        <div className="bg-[#004243] p-6 rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-[#004243] flex flex-col justify-between hover:shadow-lg transition-all cursor-default hover:-translate-y-1">
                            <h3 className="text-sm font-bold tracking-wide text-[#004243] filter brightness-150 uppercase">Vendas Fechadas</h3>
                            <p className="text-4xl font-black text-white mt-4">{closedLeads}</p>
                        </div>
                        <div className="bg-white p-6 rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100/50 flex flex-col justify-between hover:shadow-lg transition-all cursor-default hover:-translate-y-1">
                            <h3 className="text-sm font-bold tracking-wide text-emerald-500 uppercase">Taxa de Conversão</h3>
                            <p className="text-4xl font-black text-gray-900 mt-4">{conversionRate}%</p>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100/50">
                            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Leads por Etapa do Funil</h3>
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} />
                                        <Tooltip
                                            cursor={{ fill: '#f8fafc' }}
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                                        />
                                        <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100/50">
                            <h3 className="text-lg font-black text-gray-900 mb-6 tracking-tight">Distribuição de Status</h3>
                            <div className="h-80 w-full flex items-center justify-center relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={120}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>

                                {/* Center text for donut chart */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <div className="text-4xl font-black text-gray-900 leading-none">{totalLeads}</div>
                                    <div className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Leads</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
