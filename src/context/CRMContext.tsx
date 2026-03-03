import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type LeadStatus = 'novo' | 'em_contato' | 'negociacao' | 'fechado' | 'perdido';

export interface LeadHistory {
  from?: LeadStatus;
  to: LeadStatus;
  date: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  store: string;
  investment: string;
  environments: string;
  status: LeadStatus;
  createdAt: string;
  observations?: string;
  history?: LeadHistory[];
}

interface CRMContextType {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLeadDetails: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetchLeads();

    // Inscrever-se para escutar novos leads do banco em tempo real
    const channel = supabase
      .channel('public:leads')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, (payload) => {
        // Quando um lead for inserido via Landing Page, ele cai aqui na hora para o Admin
        setLeads((prevLeads) => {
          if (prevLeads.some(l => l.id === payload.new.id)) return prevLeads;
          const mappedNewLead = {
            ...payload.new,
            createdAt: (payload.new as any).created_at
          } as unknown as Lead;
          return [mappedNewLead, ...prevLeads];
        });
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'leads' }, (payload) => {
        setLeads((prevLeads) =>
          prevLeads.map(lead => lead.id === payload.new.id ? { ...lead, ...payload.new } : lead)
        );
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
    } else {
      // Mapear created_at do banco para createdAt da interface
      const mappedLeads = (data || []).map(lead => ({
        ...lead,
        createdAt: (lead as any).created_at
      }));
      setLeads(mappedLeads as unknown as Lead[]);
    }
  };

  const addLead = async (leadData: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    const newLead = {
      ...leadData,
      status: 'novo',
    };

    const { data, error } = await supabase
      .from('leads')
      .insert([newLead])
      .select()
      .single();

    if (error) {
      console.error('Error adding lead:', error);
      throw error;
    } else if (data) {
      const mappedLead = {
        ...data,
        createdAt: (data as any).created_at
      } as unknown as Lead;
      setLeads((prev) => [mappedLead, ...prev]);
    }
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    const lead = leads.find((l) => l.id === id);
    if (!lead || lead.status === status) return;

    const newHistoryEntry: LeadHistory = {
      from: lead.status,
      to: status,
      date: new Date().toISOString()
    };

    const updatedHistory = [...(lead.history || []), newHistoryEntry];

    // Opportunistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, history: updatedHistory } : l))
    );

    const { error } = await supabase
      .from('leads')
      .update({ status, history: updatedHistory })
      .eq('id', id);

    if (error) {
      console.error('Error updating lead status:', error);
      // Ideally revert the opportunistic update here in a real app
      fetchLeads();
    }
  };

  const updateLeadDetails = async (id: string, updates: Partial<Lead>) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
    );

    const { error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating lead details:', error);
      fetchLeads();
    }
  };

  const deleteLead = async (id: string) => {
    // Opportunistic UI update
    setLeads((prev) => prev.filter((lead) => lead.id !== id));

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting lead:', error);
      fetchLeads();
    }
  };

  return (
    <CRMContext.Provider value={{ leads, addLead, updateLeadStatus, updateLeadDetails, deleteLead }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
