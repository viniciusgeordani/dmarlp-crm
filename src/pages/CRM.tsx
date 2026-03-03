import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useCRM, LeadStatus } from '../context/CRMContext';
import { Sidebar } from '../components/Sidebar';
import {
  Search,
  LayoutDashboard,
  Users,
  Phone,
  Target,
  Calendar,
  Activity,
  FileText,
  Bell,
  Mail,
  MoreVertical,
  Download,
  Filter,
  ChevronDown,
  X,
  Clock,
  MessageSquare,
  DollarSign,
  Briefcase,
  Layers,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const COLUMNS: { id: LeadStatus; title: string; dot: string; defaultBadge: string; defaultBadgeColor: string }[] = [
  { id: 'novo', title: 'Novo', dot: 'bg-orange-500', defaultBadge: 'Em Processo', defaultBadgeColor: 'bg-orange-100 text-orange-600' },
  { id: 'em_contato', title: 'Em Contato', dot: 'bg-blue-500', defaultBadge: 'Retomado', defaultBadgeColor: 'bg-cyan-100 text-cyan-600' },
  { id: 'negociacao', title: 'Em Negociação', dot: 'bg-yellow-500', defaultBadge: 'Em Processo', defaultBadgeColor: 'bg-orange-100 text-orange-600' },
  { id: 'fechado', title: 'Fechado/Ganho', dot: 'bg-cyan-500', defaultBadge: 'Ganho', defaultBadgeColor: 'bg-green-100 text-green-600' },
  { id: 'perdido', title: 'Perdido', dot: 'bg-[#004243]', defaultBadge: 'Perdido', defaultBadgeColor: 'bg-blue-50 text-blue-500' },
];

export default function CRM() {
  const { leads, updateLeadStatus, updateLeadDetails, deleteLead, addLead } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    store: 'sp',
    investment: '',
    environments: '',
    observations: ''
  });

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    updateLeadStatus(draggableId, destination.droppableId as LeadStatus);
  };

  const filteredLeads = (leads || []).filter(lead =>
    (lead?.name || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    (lead?.email || '').toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLeadId(null);
        setIsAddModalOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      // Close menu if clicking outside of any dropdown button/menu
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-menu-container') && !target.closest('.dropdown-button')) {
        setOpenMenuId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDeleteLead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Certeza que deseja excluir este lead?")) {
      deleteLead(id);
    }
    setOpenMenuId(null);
  };

  const handleEditLead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLeadId(id);
    setOpenMenuId(null);
  };

  const handleAddLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || (!newLeadForm.email && !newLeadForm.phone)) {
      alert("Oops! Preencha pelo menos o Nome e um Contato (Telefone/Email).");
      return;
    }

    try {
      addLead({
        name: newLeadForm.name,
        email: newLeadForm.email,
        phone: newLeadForm.phone,
        store: newLeadForm.store,
        investment: newLeadForm.investment,
        environments: newLeadForm.environments,
        observations: newLeadForm.observations
      });
      setIsAddModalOpen(false);
      setNewLeadForm({ name: '', email: '', phone: '', store: 'sp', investment: '', environments: '', observations: '' });
    } catch (err) {
      alert("Erro ao salvar lead.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 font-sans flex overflow-hidden">

      <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] rounded-tl-[2rem] my-3 mr-3 overflow-hidden">

        {/* Top Header */}
        <header className="h-20 bg-white flex items-center justify-between pl-8 pr-10 flex-shrink-0 z-10 w-full pt-2">
          <div className="flex-1 max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search size={18} strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Buscar em qualquer lugar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-xl text-sm focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-[#004243]/10 transition-all font-medium placeholder:font-normal placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-6 ml-4">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#004243] hover:bg-[#003031] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#004243]/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="bg-white/20 p-1 rounded-full"><Search size={14} className="opacity-0 w-0" /></div> {/* Hack visual pro ícone Plus se n importar nativamente */}
              <span className="flex items-center relative -left-4">+</span>
              Novo Lead
            </button>
            <div className="h-8 w-[1.5px] bg-gray-100 mx-1"></div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Mail size={22} strokeWidth={1.5} />
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
              <Bell size={22} strokeWidth={1.5} />
              <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1.5px] bg-gray-100 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-sm text-right hidden md:block">
                <p className="font-semibold text-gray-800">Hi, Comercial</p>
              </div>
              <img src="https://ui-avatars.com/api/?name=VD&background=004243&color=fff" alt="User" className="w-10 h-10 rounded-full object-cover" />
              <ChevronDown size={16} className="text-gray-400 ml-1" />
            </div>
          </div>
        </header>

        {/* Board Header & Title */}
        <div className="px-8 mt-5 flex items-center justify-between flex-shrink-0">
          <h1 className="text-[26px] font-bold text-[#111827]">Leads Kanban</h1>
          <button className="bg-white border text-gray-700 hover:bg-slate-50 border-gray-200/80 px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
            <Download size={18} />
            Exportar
          </button>
        </div>

        {/* Filters Row */}
        <div className="px-8 mt-6 pb-6 border-b border-gray-100/60 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="bg-white border text-gray-500 border-gray-200/80 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-4 hover:bg-gray-50 focus:border-gray-300 transition-colors shadow-sm">
              Status <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="bg-white border text-gray-500 border-gray-200/80 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-4 hover:bg-gray-50 focus:border-gray-300 transition-colors shadow-sm">
              Origens <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
          <button className="text-gray-500 hover:text-gray-800 flex items-center gap-2 text-[15px] font-medium transition-colors border-none bg-transparent">
            <Filter size={18} strokeWidth={2} /> Filtros
          </button>
        </div>

        {/* Kanban Board Container */}
        <main className="flex-1 overflow-x-auto overflow-y-hidden px-5 pt-8 pb-4 custom-scrollbar bg-slate-50/50">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6 h-full items-start min-w-max px-3">
              {COLUMNS.map(column => {
                const columnLeads = filteredLeads.filter(l => l.status === column.id);

                return (
                  <div key={column.id} className="w-[320px] flex flex-col h-full max-h-full shrink-0">

                    {/* Header Coluna */}
                    <div className="bg-transparent mb-5 flex justify-between items-center px-1">
                      <div className="flex items-center gap-3">
                        <span className={`w-[9px] h-[9px] rounded-full ${column.dot}`}></span>
                        <h3 className="font-semibold text-[15px] text-gray-600">{column.title}</h3>
                      </div>
                      <span className="bg-[#F1F3F5] text-gray-500 text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        {columnLeads.length} Leads
                      </span>
                    </div>

                    {/* Droppable Area */}
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex-1 overflow-y-auto flex flex-col gap-4 transition-all rounded-2xl ${snapshot.isDraggingOver ? 'bg-gray-50/80 border-2 border-dashed border-[#004243]/20 ring-4 ring-[#004243]/5' : 'bg-transparent'} scrollbar-hide pb-24`}
                        >
                          {columnLeads.map((lead, index) => {

                            // Define tags baseando no Lead ou default badge
                            const badgeText = lead.status === 'fechado' ? 'Ganho' : lead.status === 'perdido' ? 'Perdido' : column.defaultBadge;
                            let badgeColor = column.defaultBadgeColor;

                            if (badgeText === 'Perdido') { badgeColor = 'bg-blue-50 text-blue-500'; }
                            if (badgeText === 'Ganho') { badgeColor = 'bg-green-100 text-green-600'; }
                            if (badgeText === 'Retomado') { badgeColor = 'bg-cyan-50 text-cyan-600'; }

                            return (
                              // @ts-ignore
                              <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => setSelectedLeadId(lead.id)}
                                    className={`bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer border relative transition-all ${snapshot.isDragging ? 'shadow-xl border-[#004243]/30 scale-[1.02] z-50' : 'border-gray-100/60 hover:border-gray-200 hover:shadow-md'}`}
                                  >
                                    {/* Header do Card */}
                                    <div className="flex items-start justify-between mb-3 relative">
                                      <div className="flex items-center gap-3 w-full pr-6">
                                        <img src={`https://ui-avatars.com/api/?name=${(lead?.name || 'User').split(' ').join('+')}&background=random&color=fff&size=80`} className="w-10 h-10 rounded-full object-cover shadow-sm flex-shrink-0" alt={lead?.name} />
                                        <div className="flex flex-col min-w-0 flex-1">
                                          <h4 className="font-bold text-[14px] text-slate-800 truncate" title={lead?.name}>{lead?.name || 'Vazio'}</h4>
                                          <span className="text-[12px] font-medium text-slate-500 truncate mt-0.5">{lead.phone || 'Sem telefone'}</span>
                                        </div>
                                      </div>

                                      {/* Menu de Opções */}
                                      <div className="absolute top-0 right-0">
                                        <button
                                          className="dropdown-button text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-50 transition-colors"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === lead.id ? null : lead.id);
                                          }}
                                        >
                                          <MoreVertical size={16} />
                                        </button>

                                        {openMenuId === lead.id && (
                                          <div className="dropdown-menu-container absolute right-0 top-6 mt-1 w-32 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in zoom-in duration-150">
                                            <button
                                              className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-[#004243] transition-colors"
                                              onClick={(e) => handleEditLead(lead.id, e)}
                                            >
                                              Editar
                                            </button>
                                            <button
                                              className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                                              onClick={(e) => handleDeleteLead(lead.id, e)}
                                            >
                                              Excluir
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Linha Divisória */}
                                    <div className="h-px bg-slate-100/80 mb-3 w-full"></div>

                                    {/* Corpo do Card */}
                                    <div className="flex flex-col gap-2 mb-4">
                                      {lead.email && (
                                        <div className="flex items-center gap-2 text-slate-500">
                                          <Mail size={13} strokeWidth={2} className="flex-shrink-0" />
                                          <span className="text-[12px] font-medium truncate" title={lead.email}>{lead.email}</span>
                                        </div>
                                      )}
                                      {lead.investment && (
                                        <div className="flex items-center gap-2 text-slate-500">
                                          <DollarSign size={13} strokeWidth={2} className="flex-shrink-0" />
                                          <span className="text-[12px] font-bold text-emerald-600">{lead.investment}</span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Footer do Card */}
                                    <div>
                                      <span className={`inline-flex items-center px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
                                        {badgeText}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        </main>
      </div>

      {/* Lead Details Modal */}
      {selectedLeadId && (() => {
        const lead = leads.find(l => l.id === selectedLeadId);
        if (!lead) return null;
        return (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end transition-all" onClick={() => setSelectedLeadId(null)}>
            <div className="w-full max-w-[576px] bg-white h-full shadow-2xl flex flex-col animate-slideInRight" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="px-8 py-7 border-b border-gray-100 flex items-center justify-between pb-6 shrink-0">
                <div>
                  <h2 className="text-[22px] font-extrabold text-[#004243] leading-tight pr-4">{lead.name || 'Sem Nome'}</h2>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="bg-[#004243]/10 text-[#004243] px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                      {COLUMNS.find(c => c.id === lead.status)?.title}
                    </span>
                    <span className="text-sm text-gray-400 font-medium">Desde: {lead.createdAt || (lead as any).created_at ? new Date(lead.createdAt || (lead as any).created_at).toLocaleDateString('pt-BR') : 'Sem data'}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLeadId(null)}
                  className="p-2.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors shrink-0"
                >
                  <X size={24} strokeWidth={2} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar space-y-10">

                {/* Contact Actions */}
                <div className="flex gap-4">
                  <a href={`https://wa.me/55${lead.phone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg shadow-[#25D366]/20 text-[15px]">
                    <Phone size={20} strokeWidth={2.5} />
                    WhatsApp
                  </a>
                  <a href={`mailto:${lead.email}`} className="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-5 py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors text-[15px]">
                    <Mail size={20} strokeWidth={2.5} />
                    E-mail
                  </a>
                </div>

                {/* Descrição e Orçamento */}
                <div className="bg-slate-50/80 p-7 rounded-2xl border border-slate-100 space-y-6">
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FileText size={16} strokeWidth={2.5} /> Detalhes do Projeto / Ambientes
                    </h3>
                    <p className="text-slate-800 font-medium leading-relaxed text-[15px]">
                      {lead.environments || 'Nenhuma descrição fornecida.'}
                    </p>
                  </div>
                  <div className="w-full h-px bg-slate-200/60"></div>
                  <div>
                    <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <DollarSign size={16} strokeWidth={2.5} /> Orçamento Estimado
                    </h3>
                    <p className="text-[18px] font-bold text-[#004243]">
                      {lead.investment || 'Não estipulado'}
                    </p>
                  </div>
                </div>

                {/* Observações Internas */}
                <div>
                  <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <MessageSquare size={16} strokeWidth={2.5} /> Observações Internas da D'Mar
                  </h3>
                  <textarea
                    defaultValue={lead.observations || ''}
                    onBlur={(e) => updateLeadDetails(lead.id, { observations: e.target.value })}
                    placeholder="Anote aqui informações relevantes do atendimento, endereço, medidas, preferências do cliente..."
                    className="w-full h-[180px] p-5 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 font-medium text-[15px] focus:outline-none focus:border-[#004243] focus:ring-4 focus:ring-[#004243]/10 transition-all resize-none shadow-sm leading-relaxed"
                  ></textarea>
                  <p className="text-xs text-slate-400 mt-3 font-medium flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Suas anotações são salvas automaticamente.</p>
                </div>

                {/* Histórico/Timeline */}
                <div>
                  <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Clock size={16} strokeWidth={2.5} /> Histórico de Movimentação
                  </h3>
                  <div className="ml-3 relative border-l-2 border-slate-100 space-y-7 pb-4">
                    {(!lead.history || lead.history.length === 0) ? (
                      <p className="text-slate-400 font-medium italic pl-6 text-sm">Nenhuma movimentação de coluna registrada.</p>
                    ) : (
                      lead.history.map((h, i) => (
                        <div key={i} className="relative pl-7">
                          <div className="absolute w-3.5 h-3.5 bg-[#004243] rounded-full -left-[9px] top-1.5 ring-4 ring-white"></div>
                          <div className="font-bold text-slate-800 text-[15px]">
                            Caiu em "{COLUMNS.find(c => c.id === h.to)?.title}"
                          </div>
                          <div className="text-[13px] text-slate-400 mt-1.5 font-medium">
                            {new Date(h.date).toLocaleDateString('pt-BR')} às {new Date(h.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            {h.from && ` • Veio de: ${COLUMNS.find(c => c.id === h.from)?.title}`}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      })()}

      {/* Modal Add Lead Manual */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-slate-50/50">
              <h2 className="text-lg font-extrabold text-[#004243]">Adicionar Novo Lead</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-full transition-colors shrink-0">
                <X size={20} strokeWidth={2} />
              </button>
            </div>
            <form onSubmit={handleAddLeadSubmit} className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar shrink-0">
              <div className="space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5 ml-1">Nome Completo do Cliente *</label>
                  <input type="text" required value={newLeadForm.name} onChange={e => setNewLeadForm({ ...newLeadForm, name: e.target.value })} className="w-full h-[46px] px-4 bg-white border-2 border-slate-200/80 rounded-xl text-slate-700 font-medium text-[14px] focus:outline-none focus:border-[#004243] focus:ring-4 focus:ring-[#004243]/10 transition-all placeholder:font-normal placeholder-slate-400" placeholder="Ex: Roberto Castro" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5 ml-1">E-mail</label>
                    <input type="email" value={newLeadForm.email} onChange={e => setNewLeadForm({ ...newLeadForm, email: e.target.value })} className="w-full h-[46px] px-4 bg-white border-2 border-slate-200/80 rounded-xl text-slate-700 font-medium text-[14px] focus:outline-none focus:border-[#004243] focus:ring-4 focus:ring-[#004243]/10 transition-all placeholder:font-normal placeholder-slate-400" placeholder="cliente@email.com" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5 ml-1">WhatsApp / Telefone</label>
                    <input type="tel" value={newLeadForm.phone} onChange={e => setNewLeadForm({ ...newLeadForm, phone: e.target.value })} className="w-full h-[46px] px-4 bg-white border-2 border-slate-200/80 rounded-xl text-slate-700 font-medium text-[14px] focus:outline-none focus:border-[#004243] focus:ring-4 focus:ring-[#004243]/10 transition-all placeholder:font-normal placeholder-slate-400" placeholder="(11) 90000-0000" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5 ml-1">Unidade Preferida</label>
                    <select value={newLeadForm.store} onChange={e => setNewLeadForm({ ...newLeadForm, store: e.target.value })} className="w-full h-[46px] px-4 bg-white border-2 border-slate-200/80 rounded-xl text-slate-700 font-medium text-[14px] focus:outline-none focus:border-[#004243] focus:ring-4 focus:ring-[#004243]/10 transition-all appearance-none cursor-pointer">
                      <option value="sp">São Paulo (SP)</option>
                      <option value="rj">Rio de Janeiro (RJ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-1.5 ml-1">Investimento Estipulado</label>
                    <input type="text" value={newLeadForm.investment} onChange={e => setNewLeadForm({ ...newLeadForm, investment: e.target.value })} className="w-full h-[46px] px-4 bg-white border-2 border-slate-200/80 rounded-xl text-slate-700 font-medium text-[14px] focus:outline-none focus:border-[#004243] focus:ring-4 focus:ring-[#004243]/10 transition-all placeholder:font-normal placeholder-slate-400" placeholder="Ex: De R$ 20.000 a R$ 30.000" />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-slate-700 mb-1.5 ml-1">Ambientes e Observações Úteis</label>
                  <textarea rows={3} value={newLeadForm.environments} onChange={e => setNewLeadForm({ ...newLeadForm, environments: e.target.value })} className="w-full py-3 px-4 bg-white border-2 border-slate-200/80 rounded-xl text-slate-700 font-medium text-[14px] focus:outline-none focus:border-[#004243] focus:ring-4 focus:ring-[#004243]/10 transition-all resize-none shadow-sm leading-relaxed placeholder:font-normal placeholder-slate-400" placeholder="Descreva cômodos, intenções do projeto ou detalhes que ajudarão o comercial."></textarea>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 pb-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="w-full py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">Cancelar</button>
                <button type="submit" className="w-full py-3.5 px-4 bg-[#004243] hover:bg-[#003031] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#004243]/20 flex items-center justify-center gap-2">
                  <Target size={18} strokeWidth={2.5} /> Salvar Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideInRight {
          animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1; 
        }
      `}</style>
    </div>
  );
}
