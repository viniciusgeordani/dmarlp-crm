import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('artisano_crm_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('artisano_crm_leads', JSON.stringify(leads));
  }, [leads]);

  const addLead = (leadData: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: crypto.randomUUID(),
      status: 'novo',
      createdAt: new Date().toISOString(),
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
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
