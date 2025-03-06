import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDashboardContext } from './DashboardContext';

interface QuoteContextType {
  quotes: Quote[];
  addQuote: (quote: Omit<Quote, 'id' | 'date'>) => void;
  updateQuote: (id: number, updatedQuote: Omit<Quote, 'id' | 'date'>) => void;
  deleteQuote: (id: number) => void;
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

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const useQuoteContext = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuoteContext must be used within a QuoteProvider');
  }
  return context;
};

const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { quotes: dashboardQuotes, addQuote: dashboardAddQuote, updateQuote: dashboardUpdateQuote, deleteQuote: dashboardDeleteQuote } = useDashboardContext();
  const [quotes, setQuotes] = useState<Quote[]>(dashboardQuotes || []);

  useEffect(() => {
    setQuotes(dashboardQuotes);
  }, [dashboardQuotes]);

  const addQuote = (quote: Omit<Quote, 'id' | 'date'>) => {
    dashboardAddQuote(quote);
  };

  const updateQuote = (id: number, updatedQuote: Omit<Quote, 'id' | 'date'>) => {
    dashboardUpdateQuote(id, updatedQuote);
  };

  const deleteQuote = (id: number) => {
    dashboardDeleteQuote(id);
  };

  return (
    <QuoteContext.Provider value={{ quotes, addQuote, updateQuote, deleteQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};

export { QuoteProvider };