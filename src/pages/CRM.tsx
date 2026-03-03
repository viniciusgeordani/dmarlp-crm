import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useCRM, LeadStatus } from '../context/CRMContext';
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
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const COLUMNS: { id: LeadStatus; title: string; dot: string; defaultBadge: string; defaultBadgeColor: string }[] = [
  { id: 'novo', title: 'New', dot: 'bg-orange-500', defaultBadge: 'In Process', defaultBadgeColor: 'bg-orange-100 text-orange-600' },
  { id: 'em_contato', title: 'Open', dot: 'bg-blue-500', defaultBadge: 'Recycled', defaultBadgeColor: 'bg-cyan-100 text-cyan-600' },
  { id: 'negociacao', title: 'In Progress', dot: 'bg-yellow-500', defaultBadge: 'In Process', defaultBadgeColor: 'bg-orange-100 text-orange-600' },
  { id: 'fechado', title: 'Open deal', dot: 'bg-cyan-500', defaultBadge: 'In Process', defaultBadgeColor: 'bg-orange-100 text-orange-600' },
  { id: 'perdido', title: 'Dead', dot: 'bg-[#004243]', defaultBadge: 'Dead', defaultBadgeColor: 'bg-blue-50 text-blue-500' },
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

  const filteredLeads = (leads || []).filter(lead =>
    (lead?.name || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    (lead?.email || '').toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 font-sans flex overflow-hidden">

      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-20">
        {/* Brand */}
        <div className="h-20 flex items-center px-8">
          <Link to="/" className="flex items-center gap-3 text-[#004243]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-2xl font-extrabold tracking-wide">CRM</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <a href="#" className="flex items-center justify-between px-5 py-3.5 rounded-xl text-gray-500 hover:text-gray-900 transition-colors">
            <div className="flex items-center gap-4">
              <LayoutDashboard size={20} strokeWidth={2} />
              <span className="font-medium">Dashboard</span>
            </div>
            <ChevronDown size={16} />
          </a>

          <a href="#" className="flex items-center justify-between px-5 py-3.5 rounded-xl text-gray-500 hover:text-gray-900 transition-colors">
            <div className="flex items-center gap-4">
              <Users size={20} strokeWidth={2} />
              <span className="font-medium">Accounts</span>
            </div>
            <ChevronDown size={16} />
          </a>

          <a href="#" className="flex items-center justify-between px-5 py-3.5 rounded-xl text-gray-500 hover:text-gray-900 transition-colors">
            <div className="flex items-center gap-4">
              <Phone size={20} strokeWidth={2} />
              <span className="font-medium">Contacts</span>
            </div>
            <ChevronDown size={16} />
          </a>

          <div className="pt-2 pb-1">
            <a href="#" className="flex items-center justify-between px-5 py-3.5 rounded-xl" style={{ backgroundColor: '#004243', color: '#fff' }}>
              <div className="flex items-center gap-4">
                <Target size={20} strokeWidth={2} />
                <span className="font-medium">Leads</span>
              </div>
              <ChevronDown size={16} strokeWidth={2} />
            </a>
            <div className="pl-[3.5rem] py-3">
              <a href="#" className="flex items-center gap-3 text-[13px] text-gray-400 hover:text-gray-600 py-2 font-medium transition-colors">
                <span className="w-4 h-4 rounded-[4px] border-2 border-gray-300"></span>
                Privacy Settings
              </a>
            </div>
          </div>

          <a href="#" className="flex items-center justify-between px-5 py-3.5 rounded-xl text-gray-500 hover:text-gray-900 transition-colors">
            <div className="flex items-center gap-4">
              <Calendar size={20} strokeWidth={2} />
              <span className="font-medium">Calendar</span>
            </div>
            <ChevronDown size={16} />
          </a>

          <a href="#" className="flex items-center justify-between px-5 py-3.5 rounded-xl text-gray-500 hover:text-gray-900 transition-colors">
            <div className="flex items-center gap-4">
              <Activity size={20} strokeWidth={2} />
              <span className="font-medium">Activates</span>
            </div>
            <ChevronDown size={16} />
          </a>

          <a href="#" className="flex items-center justify-between px-5 py-3.5 rounded-xl text-gray-500 hover:text-gray-900 transition-colors">
            <div className="flex items-center gap-4">
              <FileText size={20} strokeWidth={2} />
              <span className="font-medium">Reports</span>
            </div>
            <ChevronDown size={16} />
          </a>
        </nav>
      </aside>

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
              placeholder="Search Anything..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-xl text-sm focus:outline-none focus:border-gray-200 focus:ring-2 focus:ring-[#004243]/10 transition-all font-medium placeholder:font-normal placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-6 ml-4">
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
          <h1 className="text-[26px] font-bold text-[#111827]">Leads</h1>
          <button className="bg-[#004243] hover:bg-[#003031] text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-md shadow-[#004243]/20">
            <Download size={18} />
            Export
          </button>
        </div>

        {/* Filters Row */}
        <div className="px-8 mt-6 pb-6 border-b border-gray-100/60 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="bg-white border text-gray-500 border-gray-200/80 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-4 hover:bg-gray-50 focus:border-gray-300 transition-colors shadow-sm">
              All Status <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="bg-white border text-gray-500 border-gray-200/80 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-4 hover:bg-gray-50 focus:border-gray-300 transition-colors shadow-sm">
              All Sources <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
          <button className="text-gray-500 hover:text-gray-800 flex items-center gap-2 text-[15px] font-medium transition-colors border-none bg-transparent">
            <Filter size={18} strokeWidth={2} /> Filter
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
                            const badgeText = lead.status === 'fechado' ? 'Won' : lead.status === 'perdido' ? 'Dead' : column.defaultBadge;
                            let badgeColor = column.defaultBadgeColor;

                            if (badgeText === 'Dead') { badgeColor = 'bg-blue-50 text-blue-500'; }
                            if (badgeText === 'Won') { badgeColor = 'bg-green-100 text-green-600'; }
                            if (badgeText === 'Recycled') { badgeColor = 'bg-cyan-50 text-cyan-600'; }

                            return (
                              // @ts-ignore
                              <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`bg-white p-[22px] rounded-[20px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border ${snapshot.isDragging ? 'shadow-2xl border-[#004243]/40 rotate-2 z-50 ring-[6px] ring-[#004243]/5' : 'border-gray-100/50 hover:border-gray-200 hover:shadow-lg'} transition-all`}
                                  >
                                    <div className="flex justify-between items-start mb-5">
                                      <div className="flex items-center gap-3">
                                        <img src={`https://ui-avatars.com/api/?name=${(lead?.name || 'User').split(' ').join('+')}&background=random&color=fff&size=100`} className="w-11 h-11 rounded-full object-cover shadow-sm bg-gray-50" />
                                        <div className="flex flex-col gap-1.5">
                                          <h4 className="font-bold text-[15px] text-gray-900 leading-none">{lead?.name || 'Sem Nome'}</h4>
                                          <span className="text-[12px] font-medium text-gray-400 leading-none">
                                            Today 10:30PM
                                          </span>
                                        </div>
                                      </div>
                                      <button className="text-gray-400 hover:text-gray-600 pt-1">
                                        <MoreVertical size={20} />
                                      </button>
                                    </div>

                                    <div className="space-y-[14px]">
                                      <div className="flex items-center gap-3 text-gray-400">
                                        <Phone size={16} strokeWidth={2.5} />
                                        <span className="text-[14px] font-medium">{lead.phone || 'N/A'}</span>
                                      </div>
                                      <div className="flex items-center gap-3 text-gray-400">
                                        <Mail size={16} strokeWidth={2.5} />
                                        <span className="text-[14px] font-medium truncate pr-2">{lead.email}</span>
                                      </div>
                                    </div>

                                    <div className="mt-6">
                                      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold ${badgeColor}`}>
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

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
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
