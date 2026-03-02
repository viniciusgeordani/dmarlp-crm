import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useCRM, Lead, LeadStatus } from '../context/CRMContext';
import { ArrowLeft, Search, Calendar, Phone, Mail, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const COLUMNS: { id: LeadStatus; title: string; color: string }[] = [
  { id: 'novo', title: 'Novos Leads', color: 'border-blue-500' },
  { id: 'em_contato', title: 'Em Contato', color: 'border-yellow-500' },
  { id: 'negociacao', title: 'Negociação', color: 'border-purple-500' },
  { id: 'fechado', title: 'Fechado (Ganho)', color: 'border-green-500' },
  { id: 'perdido', title: 'Perdido', color: 'border-red-500' },
];

export default function CRM() {
  const { leads, updateLeadStatus } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#111111] border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <ArrowLeft size={16} />
            Voltar ao site
          </Link>
          <div className="h-6 w-px bg-white/10"></div>
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-accent">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-lg tracking-[0.2em] font-light">CRM PAINEL</span>
          </div>
        </div>

        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar lead..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>
      </header>

      {/* Kanban Board */}
      <main className="flex-1 overflow-x-auto p-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 h-full items-start min-w-max">
            {COLUMNS.map(column => {
              const columnLeads = filteredLeads.filter(l => l.status === column.id);
              
              return (
                <div key={column.id} className="w-80 flex flex-col h-full max-h-[calc(100vh-120px)]">
                  <div className={`bg-[#111111] rounded-t-xl p-4 border-t-4 ${column.color} border-x border-white/5 flex justify-between items-center`}>
                    <h3 className="font-medium text-sm text-gray-200">{column.title}</h3>
                    <span className="bg-[#1A1A1A] text-gray-400 text-xs px-2 py-1 rounded-full">
                      {columnLeads.length}
                    </span>
                  </div>
                  
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 bg-[#111111]/50 border-x border-b border-white/5 rounded-b-xl p-3 overflow-y-auto flex flex-col gap-3 transition-colors ${snapshot.isDraggingOver ? 'bg-[#1A1A1A]/80' : ''}`}
                      >
                        {columnLeads.map((lead, index) => (
                          // @ts-ignore - key is a valid React prop but types are outdated
                          <Draggable key={lead.id} draggableId={lead.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-[#1A1A1A] p-4 rounded-lg border border-white/5 shadow-sm ${snapshot.isDragging ? 'shadow-xl border-brand-accent/50 rotate-2' : 'hover:border-white/20'} transition-all`}
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <h4 className="font-medium text-sm text-white">{lead.name}</h4>
                                  <span className="text-[10px] text-gray-500">
                                    {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                                  </span>
                                </div>
                                
                                <div className="space-y-2 text-xs text-gray-400">
                                  <div className="flex items-center gap-2">
                                    <Phone size={12} className="text-gray-500" />
                                    {lead.phone}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail size={12} className="text-gray-500" />
                                    <span className="truncate">{lead.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin size={12} className="text-gray-500" />
                                    <span className="uppercase text-[10px]">{lead.store === 'sp' ? 'São Paulo' : lead.store === 'rj' ? 'Rio de Janeiro' : lead.store}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <DollarSign size={12} className="text-gray-500" />
                                    <span className="uppercase text-[10px]">{lead.investment}</span>
                                  </div>
                                </div>
                                
                                <div className="mt-4 pt-3 border-t border-white/5">
                                  <p className="text-xs text-gray-500 line-clamp-2 italic">
                                    "{lead.environments}"
                                  </p>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
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
  );
}
