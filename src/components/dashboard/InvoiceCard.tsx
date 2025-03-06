import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceCardProps {
  id: number;
  title: string;
  description: string;
  lineItems: LineItem[];
  date: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ id, title, description, lineItems, date, onEdit, onDelete }) => {
  const totalAmount = lineItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0).toFixed(2);

  return (
    <Card className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-md font-medium text-primary">Total Amount: ${totalAmount}</div>
        <div className="text-sm text-muted-foreground">Date Issued: {date}</div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          aria-label={`Edit ${title}`}
        >
          <Link to={`/add-invoice?id=${id}`}>Edit</Link>
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(id)} aria-label={`Delete ${title}`}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InvoiceCard;
