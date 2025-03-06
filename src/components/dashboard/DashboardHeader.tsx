import React from 'react';
import { Link } from 'react-router-dom';
import { useDashboardContext } from '@/context/DashboardContext';
import { Button } from '@/components/ui/button';

const DashboardHeader: React.FC = () => {
  const { businessInfo } = useDashboardContext();

  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {businessInfo ? businessInfo.name : 'Dashboard'}
        </h1>
        <div className="flex items-center space-x-4">
          {businessInfo ? (
            <span>
              Welcome, <strong>{businessInfo.name || 'User'}</strong>
            </span>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
      <div className="menu p-2">
        <div className="container mx-auto flex justify-center items-center space-x-8">
          <Link to="/settings" className="font-medium text-white hover:text-white/80 transition-colors">Settings</Link>
          <Link to="/clients" className="font-medium text-white hover:text-white/80 transition-colors">Clients</Link>
          <Link to="/quotes" className="font-medium text-white hover:text-white/80 transition-colors">Quotes</Link>
          <Link to="/invoices" className="font-medium text-white hover:text-white/80 transition-colors">Invoices</Link>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
