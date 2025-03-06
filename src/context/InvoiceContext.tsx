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
  const {
    invoices: dashboardInvoices,
    addInvoice: dashboardAddInvoice,
    updateInvoice: dashboardUpdateInvoice,
    deleteInvoice: dashboardDeleteInvoice,
  } = useDashboardContext();

  const [invoices, setInvoices] = useState<Invoice[]>(dashboardInvoices ? dashboardInvoices.map(invoice => ({
    ...invoice,
    lineItems: invoice.lineItems || [],
  })) : [
    { id: 1, title: "Invoice 1", description: "Description for Invoice 1", lineItems: [], date: "2023-03-01" },
    { id: 2, title: "Invoice 2", description: "Description for Invoice 2", lineItems: [], date: "2023-04-01" },
  ]);

  useEffect(() => {
    setInvoices(dashboardInvoices);
  }, [dashboardInvoices]);

  const addInvoice = (invoice: Omit<Invoice, 'id' | 'date'>) => {
    dashboardAddInvoice(invoice);
  };

  const updateInvoice = (id: number, updatedInvoice: Omit<Invoice, 'id' | 'date'>) => {
    dashboardUpdateInvoice(id, updatedInvoice);
  };

  const deleteInvoice = (id: number) => {
    dashboardDeleteInvoice(id);
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, updateInvoice, deleteInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export { InvoiceProvider };