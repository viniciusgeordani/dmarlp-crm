import React from 'react';
import { Sidebar } from '../components/Sidebar';
import {
    Bell,
    TrendingUp,
    Users,
    CheckCircle2,
    DollarSign,
    ArrowUpRight,
    MapPin,
    Calendar,
    Search
} from 'lucide-react';
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

    // Mapping investment strings to average values
    const getInvestmentValue = (inv: string) => {
        switch (inv) {
            case '10k': return 5000;
            case '50k': return 30000;
            case '100k': return 75000;
            default: return 0;
        }
    };

    // Metrics
    const totalLeadsCount = leads.length;
    const closedLeads = leads.filter(l => l.status === 'fechado');
    const closedLeadsCount = closedLeads.length;
    const activeLeadsCount = leads.filter(l => l.status !== 'fechado' && l.status !== 'perdido').length;
    const conversionRate = totalLeadsCount ? ((closedLeadsCount / totalLeadsCount) * 100).toFixed(1) : '0';

    const potentialValue = leads.reduce((acc, lead) => acc + getInvestmentValue(lead.investment), 0);
    const realizedValue = closedLeads.reduce((acc, lead) => acc + getInvestmentValue(lead.investment), 0);

    // Funnel Data
    const funnelData = [
        { name: 'Novo', value: leads.filter(l => l.status === 'novo').length, fill: '#fcd34d' },
        { name: 'Contato', value: leads.filter(l => l.status === 'em_contato').length, fill: '#7dd3fc' },
        { name: 'Negociação', value: leads.filter(l => l.status === 'negociacao').length, fill: '#818cf8' },
        { name: 'Fechado', value: closedLeadsCount, fill: '#004243' },
    ];

    // Leads by Store
    const storeData = [
        { name: 'São Paulo', value: leads.filter(l => l.store === 'sp').length, fill: '#004243' },
        { name: 'Rio de Janeiro', value: leads.filter(l => l.store === 'rj').length, fill: '#10b981' },
    ];

    // Recent Leads (last 5)
    const recentLeads = [...leads].slice(0, 5);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'novo': return 'bg-amber-100 text-amber-700';
            case 'em_contato': return 'bg-sky-100 text-sky-700';
            case 'negociacao': return 'bg-indigo-100 text-indigo-700';
            case 'fechado': return 'bg-emerald-100 text-emerald-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 text-slate-800 font-sans flex overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 bg-white shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] rounded-tl-[2rem] my-3 mr-3 overflow-hidden">
                <header className="h-20 bg-white flex items-center justify-between pl-8 pr-10 flex-shrink-0 z-10 w-full pt-2">
                    <div className="flex items-center gap-4">
                        <div>
                            <h2 className="text-2xl font-black text-[#004243] tracking-tight">Performance Real-time</h2>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Painel de Controle de Vendas</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 w-64">
                            <Search size={16} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar análises..."
                                className="bg-transparent border-none text-sm ml-2 focus:ring-0 w-full placeholder:text-slate-400 font-medium"
                            />
                        </div>

                        <div className="flex items-center gap-4 border-l border-slate-100 pl-6">
                            <button className="p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-[#004243] transition-all hover:bg-slate-50">
                                <Bell size={20} strokeWidth={2} />
                            </button>
                            <div className="flex items-center gap-3 bg-slate-50/80 p-1 pr-4 rounded-full border border-slate-100/50">
                                <img src="https://ui-avatars.com/api/?name=Admin+DMar&background=004243&color=fff" className="w-10 h-10 rounded-full shadow-sm object-cover" />
                                <div className="hidden sm:block">
                                    <p className="text-xs font-black text-gray-800 leading-none">Equipe Comercial</p>
                                    <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tighter">Online agora</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-[#fdfdfd]">
                    {/* Top Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Potential Revenue */}
                        <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 group hover:border-[#004243]/20 transition-all duration-300">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2.5 bg-amber-50 rounded-2xl text-amber-600 group-hover:bg-amber-100 transition-colors">
                                    <DollarSign size={20} strokeWidth={2.5} />
                                </div>
                                <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded-lg text-slate-500 uppercase tracking-wider">Potencial</span>
                            </div>
                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Valor em Negociação</h3>
                            <div className="flex items-end gap-2 mt-1">
                                <p className="text-xl font-black text-slate-900">{formatCurrency(potentialValue)}</p>
                            </div>
                        </div>

                        {/* Realized Revenue */}
                        <div className="bg-[#004243] p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,66,67,0.15)] border border-[#004243] relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                                <TrendingUp size={100} />
                            </div>
                            <div className="flex items-center justify-between mb-3 relative z-10">
                                <div className="p-2.5 bg-white/10 rounded-2xl text-white">
                                    <CheckCircle2 size={20} strokeWidth={2.5} />
                                </div>
                                <span className="text-[10px] font-black bg-white/20 px-2 py-1 rounded-lg text-white uppercase tracking-wider">Realizado</span>
                            </div>
                            <h3 className="text-[11px] font-bold text-white/60 uppercase tracking-widest relative z-10">Vendas Fechadas</h3>
                            <p className="text-xl font-black text-white mt-1 relative z-10">{formatCurrency(realizedValue)}</p>
                        </div>

                        {/* Total Leads */}
                        <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 group hover:border-[#004243]/20 transition-all duration-300">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2.5 bg-sky-50 rounded-2xl text-sky-600 group-hover:bg-sky-100 transition-colors">
                                    <Users size={20} strokeWidth={2.5} />
                                </div>
                                <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600">
                                    <ArrowUpRight size={12} />
                                    +5%
                                </span>
                            </div>
                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total de Leads</h3>
                            <p className="text-xl font-black text-slate-900 mt-1">{totalLeadsCount}</p>
                        </div>

                        {/* Conversion Rate */}
                        <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 group hover:border-[#004243]/20 transition-all duration-300">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                                    <TrendingUp size={20} strokeWidth={2.5} />
                                </div>
                                <span className="text-[10px] font-black bg-emerald-50 px-2 py-1 rounded-lg text-emerald-600 uppercase tracking-wider">Eficiência</span>
                            </div>
                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Taxa de Conversão</h3>
                            <p className="text-xl font-black text-slate-900 mt-1">{conversionRate}%</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        {/* Main Charts Col */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            <div className="bg-white p-6 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.02)] border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 flex gap-2">
                                    <button className="px-3 py-1 rounded-full bg-slate-50 text-[10px] font-black text-slate-400 uppercase">Mensal</button>
                                    <button className="px-3 py-1 rounded-full bg-[#004243] text-[10px] font-black text-white uppercase">Semanal</button>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Fluxo do Funil</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Status atual dos leads no sistema</p>
                                </div>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={funnelData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800 }}
                                                dy={15}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 800 }}
                                            />
                                            <Tooltip
                                                cursor={{ fill: '#f8fafc', radius: 8 }}
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', fontWeight: 'black', padding: '12px', fontSize: '12px' }}
                                            />
                                            <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                                                {funnelData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Recent Activity Table */}
                            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
                                <div className="p-6 pb-2 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Leads Recentes</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Últimas entradas via Landing Page</p>
                                    </div>
                                    <button className="text-[10px] font-black text-[#004243] uppercase tracking-wider hover:underline">Ver todos</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-slate-50">
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Nome</th>
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Loja</th>
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Valor Est.</th>
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {recentLeads.map((lead) => (
                                                <tr key={lead.id} className="group hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-2.5">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-500">
                                                                {lead.name.charAt(0)}
                                                            </div>
                                                            <p className="text-xs font-bold text-slate-800">{lead.name}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-2.5">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin size={10} className="text-slate-400" />
                                                            <span className="text-[10px] font-bold text-slate-500 uppercase">{lead.store === 'sp' ? 'S. Paulo' : 'Rio'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-2.5">
                                                        <span className="text-[11px] font-black text-slate-900">{formatCurrency(getInvestmentValue(lead.investment))}</span>
                                                    </td>
                                                    <td className="px-6 py-2.5">
                                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${getStatusColor(lead.status)}`}>
                                                            {lead.status.replace('_', ' ')}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-2.5 text-right">
                                                        <button className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-[#004243] group-hover:text-white transition-all">
                                                            <ArrowUpRight size={12} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Analytics */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            <div className="bg-white p-6 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col items-center">
                                <div className="w-full mb-4">
                                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Por Loja</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Volume de leads por unidade</p>
                                </div>
                                <div className="h-48 w-full relative flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={storeData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={90}
                                                paddingAngle={8}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {storeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', fontWeight: 'black' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <div className="text-2xl font-black text-slate-900 leading-none">{totalLeadsCount}</div>
                                        <div className="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-widest">Total</div>
                                    </div>
                                </div>
                                <div className="w-full space-y-2 mt-4">
                                    {storeData.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 border border-slate-100/50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.fill }}></div>
                                                <span className="text-[11px] font-black text-slate-600 uppercase tracking-tighter">{item.name}</span>
                                            </div>
                                            <span className="text-[11px] font-black text-slate-900">{item.value} leads</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#004243] p-6 rounded-3xl shadow-[0_20px_40px_rgba(0,66,67,0.15)] text-white relative overflow-hidden">
                                <div className="p-3 bg-white/10 rounded-xl w-fit mb-4">
                                    <Calendar size={20} className="text-emerald-400" />
                                </div>
                                <h4 className="text-base font-black tracking-tight leading-tight mb-2">Próximos Passos</h4>
                                <p className="text-[11px] text-white/70 font-bold leading-relaxed mb-5 italic">"A organização é a chave do sucesso na D'Mar Planejados."</p>
                                <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-900/20">
                                    Agendar Follow-up
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
