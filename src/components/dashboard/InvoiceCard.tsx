import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useInvoiceContext } from '@/context/InvoiceContext';

interface InvoiceCardProps {
  id: number;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ id }) => {
  const { invoices, exportInvoiceToPdf } = useInvoiceContext();
  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <div className="text-center text-muted-foreground">
        Invoice not found.
      </div>
    );
  }

  const totalAmount = (invoice.lineItems?.reduce((total, item) => total + item.quantity * item.unitPrice, 0) || 0).toFixed(2);

  return (
    <Card className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{invoice.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{invoice.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-md font-medium text-primary">Total Amount: ${totalAmount}</div>
        <div className="text-sm text-muted-foreground">Date Issued: {invoice.date}</div>
        <div className="text-sm text-muted-foreground">Status: {invoice.status}</div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          aria-label={`Edit ${invoice.title}`}
        >
          <Link to={`/add-invoice?id=${invoice.id}`}>Edit</Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => exportInvoiceToPdf(invoice)}
          aria-label={`Export ${invoice.title} to PDF`}
        >
          Export PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InvoiceCard;