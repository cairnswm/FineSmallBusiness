import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the DashboardContext
export const DashboardContext = createContext();

// Custom hook to use the DashboardContext<DashboardContextType | undefined>(undefined);
export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};
interface DashboardContextType {
  businessInfo: BusinessInfo | null;
  clients: Client[];
  quotes: Quote[];
  invoices: Invoice[];
  addClient: (client: Client) => void;
  updateQuote: (id: number, updatedQuote: Quote) => void;
  deleteQuote: (id: number) => void;
  updateInvoice: (id: number, updatedInvoice: Invoice) => void;
  deleteInvoice: (id: number) => void;
}
interface BusinessInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
}
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}
interface Quote {
  id: number;
  title: string;
  description: string;
  amount: string;
  date: string;
}
interface Invoice {
  id: number;
  title: string;
  description: string;
  amount: string;
  date: string;
}
const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Fetch data from APIs when the component mounts
  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await fetch('/api/business-info');
        if (response.ok) {
          const data = await response.json();
          setBusinessInfo(data);
        } else {
          console.error('Failed to fetch business info');
        }
      } catch (error) {
        console.error('Error fetching business info:', error);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          console.error('Failed to fetch clients');
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    const fetchQuotes = async () => {
      try {
        const response = await fetch('/api/quotes');
        if (response.ok) {
          const data = await response.json();
          setQuotes(data);
        } else {
          console.error('Failed to fetch quotes');
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    const fetchInvoices = async () => {
      try {
        const response = await fetch('/api/invoices');
        if (response.ok) {
          const data = await response.json();
          setInvoices(data);
        } else {
          console.error('Failed to fetch invoices');
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchBusinessInfo();
    fetchClients();
    fetchQuotes();
    fetchInvoices();
  }, []);

  // Function to add a new client
  const addClient = (client) => {
    setClients((prevClients) => [...prevClients, client]);
  };

  // Function to update a quote
  const updateQuote = (id, updatedQuote) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) => (quote.id === id ? updatedQuote : quote))
    );
  };

  // Function to update a quote
  const updateQuote = (id: number, updatedQuote: Quote) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) => (quote.id === id ? updatedQuote : quote))
    );
  };

  // Function to delete a quote
  const deleteQuote = (id: number) => {
    setQuotes((prevQuotes) =>
      prevQuotes.filter((quote) => quote.id !== id)
    );
  };

  // Function to update an invoice
  const updateInvoice = (id: number, updatedInvoice: Invoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) => (invoice.id === id ? updatedInvoice : invoice))
    );
  };

  // Function to delete an invoice
  const deleteInvoice = (id: number) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== id)
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        businessInfo,
        clients,
        quotes,
        invoices,
        addClient,
        updateQuote,
        deleteQuote,
        updateInvoice,
        deleteInvoice,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;