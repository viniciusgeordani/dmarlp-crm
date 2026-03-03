import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, LayoutDashboard, Users, Settings } from 'lucide-react';

interface SidebarProps {
    searchTerm?: string;
    setSearchTerm?: (val: string) => void;
}

export function Sidebar({ searchTerm, setSearchTerm }: SidebarProps) {
    const location = useLocation();
    const isDashboard = location.pathname.includes('/dashboard');
    const isLeads = !isDashboard && location.pathname.includes('/admin-painel-crm-dmar');

    return (
        <aside className="w-72 bg-white border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-10 transition-all duration-300">
            <div className="p-8 pb-6 bg-gradient-to-b from-white to-gray-50/30">
                <Link to="/" className="flex items-center gap-3 mb-8 hover:opacity-90 transition-opacity">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#004243] to-[#002b2c] flex items-center justify-center shadow-lg shadow-[#004243]/20">
                        <span className="text-white font-bold text-xl tracking-wider">D</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">D'Mar</h1>
                        <p className="text-[11px] font-bold text-[#004243] tracking-widest uppercase mt-0.5 opacity-80">Planejados</p>
                    </div>
                </Link>

                {setSearchTerm && (
                    <div className="relative group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#004243] transition-colors" size={18} strokeWidth={2.5} />
                        <input
                            type="text"
                            placeholder="Buscar no CRM..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-[14px] text-sm focus:bg-white focus:border-[#004243]/20 focus:ring-4 focus:ring-[#004243]/5 transition-all outline-none font-medium placeholder:text-gray-400"
                        />
                    </div>
                )}
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {/* Dashboard Link */}
                <Link
                    to="/admin-painel-crm-dmar/dashboard"
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-[14px] font-medium transition-all group relative overflow-hidden ${isDashboard ? 'bg-[#004243] text-white shadow-md shadow-[#004243]/20 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                    {isDashboard && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />}
                    <LayoutDashboard size={20} className={`relative z-10 ${isDashboard ? 'text-white' : 'group-hover:text-[#004243] transition-colors'}`} strokeWidth={2.5} />
                    <span className="relative z-10 tracking-wide">Dashboard</span>
                </Link>

                {/* Leads Link */}
                <Link
                    to="/admin-painel-crm-dmar"
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-[14px] font-medium transition-all group relative overflow-hidden ${isLeads ? 'bg-[#004243] text-white shadow-md shadow-[#004243]/20 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                    {isLeads && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />}
                    <Users size={20} className={`relative z-10 ${isLeads ? 'text-white' : 'group-hover:text-[#004243] transition-colors'}`} strokeWidth={2.5} />
                    <span className="relative z-10 tracking-wide">Leads (Funil)</span>
                </Link>
            </nav>

            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <button className="flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
                    <Settings size={18} strokeWidth={2.5} />
                    <span className="tracking-wide">Ajustes da Conta</span>
                </button>
            </div>
        </aside>
    );
}
