import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDashboardContext } from './DashboardContext';

interface QuoteContextType {
  quotes: Quote[];
  addQuote: (quote: Omit<Quote, 'id' | 'date'>) => void;
  updateQuote: (id: number, updatedQuote: Omit<Quote, 'id' | 'date'>) => void;
  deleteQuote: (id: number) => void;
}
import { generateQuotePdf } from "../utils/pdfGenerator";

const exportQuoteToPdf = (quote: Quote) => {
  if (quote) {
    generateQuotePdf(quote);
  } else {
    console.error("Invalid quote object provided.");
  }
};

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
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: 1,
      title: 'Website Development',
      description: 'Development of a company website',
      lineItems: [
        { id: 1, description: 'Design', quantity: 1, unitPrice: 500 },
        { id: 2, description: 'Development', quantity: 1, unitPrice: 1500 },
      ],
      date: '2023-01-01',
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'Development of a mobile application',
      lineItems: [
        { id: 1, description: 'Design', quantity: 1, unitPrice: 700 },
        { id: 2, description: 'Development', quantity: 1, unitPrice: 2000 },
      ],
      date: '2023-02-01',
    },
    {
      id: 3,
      title: 'SEO Optimization',
      description: 'SEO services for the company website',
      lineItems: [
        { id: 1, description: 'Initial Audit', quantity: 1, unitPrice: 300 },
        { id: 2, description: 'Monthly Optimization', quantity: 6, unitPrice: 200 },
      ],
      date: '2023-03-01',
    }
  ]);

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
    <QuoteContext.Provider value={{ quotes, addQuote, updateQuote, deleteQuote, exportQuoteToPdf }}>
      {children}
    </QuoteContext.Provider>
  );
};

export { QuoteProvider };