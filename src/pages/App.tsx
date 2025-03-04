import React from 'react';
import DashboardProvider from '../context/DashboardContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import BusinessInfo from '../components/dashboard/BusinessInfo';
import ClientCard from '../components/dashboard/ClientCard';
import QuoteCard from '../components/dashboard/QuoteCard';

const App = () => {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
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
                {/* Example Client Cards */}
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

            {/* Quotes/Invoices Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Quotes & Invoices</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Example Quote/Invoice Cards */}
                {quotes.map((quote) => (
                  <QuoteCard
                    key={quote.id}
                    id={quote.id}
                    title={quote.title}
                    description={quote.description}
                    amount={quote.amount}
                    date={quote.date}
                    onEdit={(id) => console.log(`Edit quote ${id}`)}
                    onDelete={(id) => console.log(`Delete quote ${id}`)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default App;