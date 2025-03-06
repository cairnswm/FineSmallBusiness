import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDashboardContext } from './DashboardContext';

interface InvoiceContextType {
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id' | 'date'>) => void;
  updateInvoice: (id: number, updatedInvoice: Omit<Invoice, 'id' | 'date'>) => void;
  deleteInvoice: (id: number) => void;
}

interface Invoice {
  id: number;
  title: string;
  description: string;
  lineItems: LineItem[];
  date: string;
}

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoiceContext = (): InvoiceContextType => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoiceContext must be used within an InvoiceProvider');
  }
  return context;
};

const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    fetch('/api/invoices')
      .then(response => response.json())
      .then(data => setInvoices(data))
      .catch(error => console.error('Error fetching invoices:', error));
  }, []);

  const addInvoice = (invoice: Omit<Invoice, 'id' | 'date'>) => {
    fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice),
    })
      .then(response => response.json())
      .then(newInvoice => setInvoices(prev => [...prev, newInvoice]))
      .catch(error => console.error('Error adding invoice:', error));
  };

  const updateInvoice = (id: number, updatedInvoice: Omit<Invoice, 'id' | 'date'>) => {
    fetch(`/api/invoices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedInvoice),
    })
      .then(() => setInvoices(prev => prev.map(inv => (inv.id === id ? { ...inv, ...updatedInvoice } : inv))))
      .catch(error => console.error('Error updating invoice:', error));
  };

  const deleteInvoice = (id: number) => {
    fetch(`/api/invoices/${id}`, { method: 'DELETE' })
      .then(() => setInvoices(prev => prev.filter(inv => inv.id !== id)))
      .catch(error => console.error('Error deleting invoice:', error));
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, updateInvoice, deleteInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export { InvoiceProvider };