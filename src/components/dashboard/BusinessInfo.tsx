import React from 'react';
import { useDashboardContext } from '@/context/DashboardContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const BusinessInfo: React.FC = () => {
  const { businessInfo } = useDashboardContext();

  if (!businessInfo) {
    return (
      <div className="text-center text-muted-foreground">
        Loading business information...
      </div>
    );
  }

  return (
    <Card className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{businessInfo.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {businessInfo.email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-md font-medium text-primary">
          Phone: {businessInfo.phone}
        </div>
        <div className="text-sm text-muted-foreground">
          Address: {businessInfo.address}
        </div>
        <div className="text-sm text-muted-foreground">
          Website: <a href={businessInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary underline">{businessInfo.website}</a>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessInfo;
