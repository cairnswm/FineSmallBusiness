import React from "react";

const Dashboard = () => {
  return (
    <main className="w-full min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Welcome to the Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Manage your quotes and invoices efficiently.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
