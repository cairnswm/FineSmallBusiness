import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

interface QuoteCardProps {
  id: number;
  title: string;
  description: string;
  amount: string;
  date: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ id, title, description, amount, date, onEdit, onDelete }) => {
  return (
    <Card className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-md font-medium text-primary">Amount: {amount}</div>
        <div className="text-sm text-muted-foreground">Date: {date}</div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          asChild
          aria-label={`Edit ${title}`}
        >
          <a href={`/add-quote?id=${id}`}>Edit</a>
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(id)} aria-label={`Delete ${title}`}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuoteCard;