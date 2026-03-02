import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export type LeadStatus = 'novo' | 'em_contato' | 'negociacao' | 'fechado' | 'perdido';

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
}

interface CRMContextType {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  deleteLead: (id: string) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
    } else {
      // Map database snake_case to camelCase just in case or use them as is if they match
      setLeads(data as unknown as Lead[]);
    }
  };

  const addLead = async (leadData: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    const newLead = {
      ...leadData,
      status: 'novo',
      // The database will generate id and created_at
    };

    const { data, error } = await supabase
      .from('leads')
      .insert([newLead])
      .select()
      .single();

    if (error) {
      console.error('Error adding lead:', error);
    } else if (data) {
      setLeads((prev) => [data as unknown as Lead, ...prev]);
    }
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    // Opportunistic UI update
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );

    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating lead status:', error);
      // Ideally revert the opportunistic update here in a real app
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
    <CRMContext.Provider value={{ leads, addLead, updateLeadStatus, deleteLead }}>
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
