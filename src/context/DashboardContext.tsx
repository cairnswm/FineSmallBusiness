import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

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
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
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
  lineItems?: LineItem[];
}
const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(() => {
    const storedBusinessInfo = localStorage.getItem("businessInfo");
    return storedBusinessInfo ? JSON.parse(storedBusinessInfo) : {
      name: "Mock Business",
      email: "mock@business.com",
      phone: "123-456-7890",
      address: "123 Mock Street, Mock City",
      website: "https://mockbusiness.com",
    };
  });
  const [clients, setClients] = useState<Client[]>(() => {
    const storedClients = localStorage.getItem("clients");
    return storedClients ? JSON.parse(storedClients) : [
      { id: 1, name: "John Doe", email: "john@example.com", phone: "555-1234", address: "123 Elm St" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "555-5678", address: "456 Oak St" },
    ];
  });
  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const storedQuotes = localStorage.getItem("quotes");
    return storedQuotes ? JSON.parse(storedQuotes) : [
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
    ];
  });
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const storedInvoices = localStorage.getItem("invoices");
    return storedInvoices ? JSON.parse(storedInvoices) : [
      { id: 1, title: "Invoice 1", description: "Description for Invoice 1", amount: "150.00", date: "2023-03-01" },
      { id: 2, title: "Invoice 2", description: "Description for Invoice 2", amount: "250.00", date: "2023-04-01" },
    ];
  });

  // Removed API fetch calls and lazy loading to prevent data reset on mount

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("businessInfo", JSON.stringify(businessInfo));
  }, [businessInfo]);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  // Function to add a new client
  const addClient = (client: Client) => {
    setClients((prevClients) => [...prevClients, client]);
  };

  // Function to add a new quote
  const addQuote = (quote: Omit<Quote, 'id' | 'date'>) => {
    const totalAmount = quote.lineItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const newQuote = {
      ...quote,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      lineItems: quote.lineItems.map((item, index) => ({
        id: index + 1,
        ...item,
      })),
      totalAmount,
    };

    setQuotes((prevQuotes) => [...prevQuotes, newQuote]);
  };

  // Function to update a quote
  const updateQuote = (id: number, updatedQuote: Omit<Quote, 'id' | 'date'>) => {
    const totalAmount = updatedQuote.lineItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.id === id
          ? {
              ...quote,
              ...updatedQuote,
              lineItems: updatedQuote.lineItems.map((item, index) => ({
                id: quote.lineItems[index]?.id || index + 1,
                ...item,
              })),
              totalAmount,
            }
          : quote
      )
    );

    toast({
      title: "Quote Updated",
      description: "The quote has been successfully updated.",
      variant: "success",
    });
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

  // Function to add a new invoice
  const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    const newInvoice = {
      ...invoice,
      id: Date.now(),
      lineItems: invoice.lineItems || [],
    };
    setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
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
        addInvoice,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardProvider };