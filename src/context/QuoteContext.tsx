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
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
      setQuotes(JSON.parse(storedQuotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  const addQuote = (quote: Omit<Quote, 'id' | 'date'>) => {
    const newQuote = {
      ...quote,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setQuotes((prevQuotes) => [...prevQuotes, newQuote]);
  };

  const updateQuote = (id: number, updatedQuote: Omit<Quote, 'id' | 'date'>) => {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.id === id ? { ...quote, ...updatedQuote } : quote
      )
    );
  };

  const deleteQuote = (id: number) => {
    setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));
  };

  return (
    <QuoteContext.Provider value={{ quotes, addQuote, updateQuote, deleteQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};

export { QuoteProvider };