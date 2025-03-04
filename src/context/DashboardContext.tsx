import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the DashboardContext
export const DashboardContext = createContext();

// Custom hook to use the DashboardContext
export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

// Define the DashboardProvider component
const DashboardProvider = ({ children }) => {
  const [businessInfo, setBusinessInfo] = useState(null);
  const [clients, setClients] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [invoices, setInvoices] = useState([]);

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

  // Function to delete an invoice
  const deleteInvoice = (id) => {
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
        deleteInvoice,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
