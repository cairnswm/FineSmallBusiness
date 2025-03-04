import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ClientCardProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ id, name, email, phone, address, onEdit, onDelete }) => {
  return (
    <Card className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-md font-medium text-primary">Phone: {phone}</div>
        <div className="text-sm text-muted-foreground">Address: {address}</div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClientCard;
