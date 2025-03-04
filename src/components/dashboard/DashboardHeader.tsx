import React from 'react';
import { useDashboardContext } from '@/context/DashboardContext';

const DashboardHeader: React.FC = () => {
  const { businessInfo } = useDashboardContext();

  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {businessInfo ? businessInfo.name : 'Dashboard'}
        </h1>
        <div className="text-sm">
          {businessInfo ? (
            <span>
              Welcome, <strong>{businessInfo.ownerName || 'User'}</strong>
            </span>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
