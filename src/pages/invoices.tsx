import React, { useState } from "react";
import { useInvoiceContext } from "@/context/InvoiceContext";
import { Button } from "@/components/ui/button";
import InvoiceCard from "@/components/dashboard/InvoiceCard";
import AddEditInvoiceModal from "@/components/dashboard/AddEditInvoiceModal";

const InvoicesPage: React.FC = () => {
  const { invoices } = useInvoiceContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleAddInvoice = () => {
    setSelectedInvoiceId(null);
    setIsModalOpen(true);
  };

  const handleEditInvoice = (id: number) => {
    setSelectedInvoiceId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoiceId(null);
  };

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Button variant="outline" onClick={() => window.history.back()}>Back</Button>
      </header>
      <div className="flex justify-between items-center">
        <div>
          <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter || ""}
            onChange={(e) => setStatusFilter(e.target.value || null)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">All</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <Button onClick={handleAddInvoice}>Add Invoice</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {invoices
          .filter((invoice) => !statusFilter || invoice.status === statusFilter)
          .map((invoice) => (
          <InvoiceCard key={invoice.id} id={invoice.id} />
        ))}
      </div>
      {isModalOpen && (
        <AddEditInvoiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          invoiceId={selectedInvoiceId}
        />
      )}
    </div>
  );
};

export default InvoicesPage;