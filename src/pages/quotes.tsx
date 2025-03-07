import React, { useState } from "react";
import { useQuoteContext } from "@/context/QuoteContext";
import { Button } from "@/components/ui/button";
import QuoteCard from "@/components/dashboard/QuoteCard";
import AddEditQuoteModal from "@/components/dashboard/AddEditQuoteModal";

const QuotesPage: React.FC = () => {
  const { quotes } = useQuoteContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleAddQuote = () => {
    setSelectedQuoteId(null);
    setIsModalOpen(true);
  };

  const handleEditQuote = (id: number) => {
    setSelectedQuoteId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuoteId(null);
  };

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quotes</h1>
        <Button variant="outline" onClick={() => window.history.back()}>Back</Button>
      </header>
      <div className="flex justify-start mt-4">
        <Button onClick={handleAddQuote}>Add Quote</Button>
      </div>
      <div className="flex justify-start mt-4">
        <select
          className="border border-gray-300 rounded-md p-2"
          value={statusFilter || ""}
          onChange={(e) => setStatusFilter(e.target.value || null)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quotes
          .filter((quote) => !statusFilter || quote.status === statusFilter)
          .map((quote) => (
          <QuoteCard
            key={quote.id}
            id={quote.id}
            title={quote.title}
            description={quote.description}
            lineItems={quote.lineItems}
            date={quote.date}
          />
        ))}
      </div>
      {isModalOpen && (
        <AddEditQuoteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          quoteId={selectedQuoteId}
        />
      )}
    </div>
  );
};

export default QuotesPage;