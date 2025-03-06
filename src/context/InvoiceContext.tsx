import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDashboardContext } from './DashboardContext';

interface InvoiceContextType {
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice, 'id' | 'date'>) => void;
  updateInvoice: (id: number, updatedInvoice: Omit<Invoice, 'id' | 'date'>) => void;
  deleteInvoice: (id: number) => void;
  exportInvoiceToPdf: (invoice: Invoice) => void;
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
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const storedInvoices = localStorage.getItem("invoices");
    return storedInvoices
      ? JSON.parse(storedInvoices)
      : [
          {
            id: 1,
            title: "Mock Invoice 1",
            description: "Description for Mock Invoice 1",
            lineItems: Array.isArray([
              { id: 1, description: "Item 1", quantity: 2, unitPrice: 50 },
              { id: 2, description: "Item 2", quantity: 1, unitPrice: 100 },
            ])
              ? [
                  { id: 1, description: "Item 1", quantity: 2, unitPrice: 50 },
                  { id: 2, description: "Item 2", quantity: 1, unitPrice: 100 },
                ]
              : [],
            date: "2023-01-01",
          },
          {
            id: 2,
            title: "Mock Invoice 2",
            description: "Description for Mock Invoice 2",
            lineItems: Array.isArray([
              { id: 1, description: "Item A", quantity: 3, unitPrice: 30 },
              { id: 2, description: "Item B", quantity: 2, unitPrice: 40 },
            ])
              ? [
                  { id: 1, description: "Item A", quantity: 3, unitPrice: 30 },
                  { id: 2, description: "Item B", quantity: 2, unitPrice: 40 },
                ]
              : [],
            date: "2023-02-01",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  const addInvoice = (invoice: Omit<Invoice, 'id' | 'date'>) => {
    const newInvoice = {
      ...invoice,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setInvoices(prev => [...prev, newInvoice]);
  };

  const updateInvoice = (id: number, updatedInvoice: Omit<Invoice, 'id' | 'date'>) => {
    setInvoices(prev => prev.map(inv => (inv.id === id ? { ...inv, ...updatedInvoice } : inv)));
  };

  const deleteInvoice = (id: number) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const exportInvoiceToPdf = (invoice: Invoice) => {
    import('../utils/pdfGenerator').then(({ generateQuotePdf }) => {
      const invoiceData = {
        title: invoice.title,
        description: invoice.description,
        lineItems: invoice.lineItems,
        date: invoice.date,
        clientName: "Client Name Placeholder", // Replace with actual client data if available
        clientEmail: "client@example.com", // Replace with actual client data if available
        clientAddress: "Client Address Placeholder", // Replace with actual client data if available
      };
      generateQuotePdf(invoiceData);
    });
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, updateInvoice, deleteInvoice, exportInvoiceToPdf }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export { InvoiceProvider };