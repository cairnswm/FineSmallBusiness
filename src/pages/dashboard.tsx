import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BusinessInfo from "@/components/dashboard/BusinessInfo";
import ClientCard from "@/components/dashboard/ClientCard";
import QuoteCard from "@/components/dashboard/QuoteCard";
import InvoiceCard from "@/components/dashboard/InvoiceCard";
import AddEditQuoteModal from "@/components/dashboard/AddEditQuoteModal";
import AddEditClientCard from "@/components/dashboard/AddEditClientCard";
import { useQuoteContext } from "@/context/QuoteContext";
import { useInvoiceContext } from "@/context/InvoiceContext";
import { useDashboardContext } from "@/context/DashboardContext";

const Dashboard = () => {
  const { clients } = useDashboardContext();
  const { quotes } = useQuoteContext();
  const { invoices } = useInvoiceContext();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const handleAddQuoteClick = () => {
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const handleEditClient = (id: number) => {
    navigate(`/add-edit-client?id=${id}`);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <DashboardHeader />

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Business Info Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Business Information</h2>
          <BusinessInfo />
        </section>

        {/* Clients Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Clients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients
              .filter((client) => client.status === "active")
              .map((client) => (
                <ClientCard
                  key={client.id}
                  id={client.id}
                  name={client.name}
                  email={client.email}
                  phone={client.phone}
                  address={client.address}
                  status={client.status}
                  onEdit={(id) => navigate(`/add-edit-client?id=${id}`)}
                />
              ))}
          </div>
        </section>

        {/* Quotes Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Quotes</h2>
            <Link
              to="/add-quote"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 text-center"
            >
              Add Quote
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quotes.map((quote) => (
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
        </section>

        {/* Invoices Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Invoices</h2>
            <Link
              to="/add-invoice"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 text-center"
            >
              Add Invoice
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(invoices) && invoices.length > 0 ? (
              invoices.map((invoice) => (
                <InvoiceCard
                  key={invoice.id}
                  id={invoice.id}
                />
              ))
            ) : (
              <div className="text-center text-muted-foreground">
                No invoices available.
              </div>
            )}
          </div>
        </section>
      </div>

      <AddEditClientCard
        isOpen={isClientModalOpen}
        onClose={handleCloseClientModal}
        clientId={selectedClientId}
      />
    </div>
  );
};

export default Dashboard;