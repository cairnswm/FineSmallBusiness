import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useQuoteContext } from '@/context/QuoteContext';

interface LineItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface QuoteCardProps {
  id: number;
  title: string;
  description: string;
  lineItems: LineItem[];
  date: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ id, title, description, lineItems, date }) => {
  const { deleteQuote } = useQuoteContext();
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
          <Link to={`/add-quote?id=${id}`}>Edit</Link>
        </Button>
        <Button variant="destructive" size="sm" onClick={() => deleteQuote(id)} aria-label={`Delete ${title}`}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuoteCard;