import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the DashboardContext
export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

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
  addQuote: (quote: Omit<Quote, 'id' | 'date'>) => void;
  updateQuote: (id: number, updatedQuote: Omit<Quote, 'id' | 'date'>) => void;
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
  lineItems: LineItem[];
  date: string;
}

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
}
interface Invoice {
  id: number;
  title: string;
  description: string;
  amount: string;
  date: string;
}
const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>({
    name: "Mock Business",
    email: "mock@business.com",
    phone: "123-456-7890",
    address: "123 Mock Street, Mock City",
    website: "https://mockbusiness.com",
  });
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "555-1234", address: "123 Elm St" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "555-5678", address: "456 Oak St" },
  ]);
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: 1,
      title: "Quote 1",
      description: "Description for Quote 1",
      lineItems: [
        { id: 1, description: "Item 1", quantity: 2, unitPrice: 50 },
        { id: 2, description: "Item 2", quantity: 1, unitPrice: 100 },
      ],
      date: "2023-01-01",
    },
    {
      id: 2,
      title: "Quote 2",
      description: "Description for Quote 2",
      lineItems: [
        { id: 1, description: "Item A", quantity: 3, unitPrice: 30 },
        { id: 2, description: "Item B", quantity: 2, unitPrice: 40 },
      ],
      date: "2023-02-01",
    },
  ]);
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, title: "Invoice 1", description: "Description for Invoice 1", amount: "150.00", date: "2023-03-01" },
    { id: 2, title: "Invoice 2", description: "Description for Invoice 2", amount: "250.00", date: "2023-04-01" },
  ]);

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
  const addClient = (client: Client) => {
    setClients((prevClients) => [...prevClients, client]);
  };

  // Function to add a new quote
  const addQuote = async (quote: Omit<Quote, 'id' | 'date'>) => {
    try {
      const totalAmount = quote.lineItems.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );

      const newQuote = {
        ...quote,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        totalAmount,
      };

      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuote),
      });

      if (response.ok) {
        const savedQuote = await response.json();
        setQuotes((prevQuotes) => [...prevQuotes, savedQuote]);
      } else {
        console.error('Failed to save the quote');
      }
    } catch (error) {
      console.error('Error saving the quote:', error);
    }
  };

  // Function to update a quote
  const updateQuote = async (id: number, updatedQuote: Omit<Quote, 'id' | 'date'>) => {
    try {
      const totalAmount = updatedQuote.lineItems.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );

      const updatedQuoteWithTotal = {
        ...updatedQuote,
        totalAmount,
      };

      const response = await fetch(`/api/quotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuoteWithTotal),
      });

      if (response.ok) {
        const savedQuote = await response.json();
        setQuotes((prevQuotes) =>
          prevQuotes.map((quote) =>
            quote.id === id ? savedQuote : quote
          )
        );
        window.location.href = '/dashboard';
      } else {
        console.error('Failed to update the quote');
      }
    } catch (error) {
      console.error('Error updating the quote:', error);
    }
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
        addQuote,
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

export { DashboardProvider };