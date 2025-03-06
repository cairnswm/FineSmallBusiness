import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BusinessInfo from "@/components/dashboard/BusinessInfo";
import ClientCard from "@/components/dashboard/ClientCard";
import QuoteCard from "@/components/dashboard/QuoteCard";
import AddEditQuoteModal from "@/components/dashboard/AddEditQuoteModal";
import { DashboardContext } from "@/context/DashboardContext";

const Dashboard = () => {
  const { clients, quotes, deleteQuote } = useContext(DashboardContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddQuoteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            {clients.map((client) => (
              <ClientCard
                key={client.id}
                id={client.id}
                name={client.name}
                email={client.email}
                phone={client.phone}
                address={client.address}
                onEdit={(id) => console.log(`Edit client ${id}`)}
                onDelete={(id) => console.log(`Delete client ${id}`)}
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
                onEdit={(id) => console.log(`Edit quote ${id}`)}
                onDelete={(id) => deleteQuote(id)}
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
            {invoices.map((invoice) => (
              <InvoiceCard
                key={invoice.id}
                id={invoice.id}
                title={invoice.title}
                description={invoice.description}
                lineItems={invoice.lineItems}
                date={invoice.date}
                onEdit={(id) => console.log(`Edit invoice ${id}`)}
                onDelete={(id) => deleteInvoice(id)}
              />
            ))}
          </div>
        </section>
      </div>

    </div>
  );
};

export default Dashboard;