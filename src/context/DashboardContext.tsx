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
  addClient: (client: Client) => void;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  updateBusinessInfo: (info: BusinessInfo) => void;
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
  lineItems: LineItem[];
  date: string;
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

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("businessInfo", JSON.stringify(businessInfo));
  }, [businessInfo]);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);


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
    const totalAmount = invoice.lineItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const newInvoice = {
      ...invoice,
      id: Date.now(),
      lineItems: invoice.lineItems.map((item, index) => ({
        id: index + 1,
        ...item,
      })),
      date: new Date().toISOString().split('T')[0],
      totalAmount: totalAmount.toFixed(2),
    };

    setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
  };

  // Function to delete an invoice
  const deleteInvoice = (id: number) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== id)
    );
  };

  // Function to update business information
  const updateBusinessInfo = (info: BusinessInfo) => {
    setBusinessInfo(info);
    toast({
      title: "Business Information Updated",
      description: "Your business information has been successfully updated.",
      variant: "success",
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        businessInfo,
        clients,
        addClient,
        addInvoice,
        updateBusinessInfo,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardProvider };
