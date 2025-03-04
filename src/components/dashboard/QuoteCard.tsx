import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
        <Button variant="outline" size="sm" onClick={() => onEdit(id)} aria-label={`Edit ${title}`}>
          Edit
        </Button>
        <Select
          onValueChange={(value) => console.log(`Status changed to ${value} for quote ${id}`)}
          defaultValue="pending"
        >
          <SelectTrigger className="w-[120px]">
            <span>Status</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </CardFooter>
    </Card>
  );
};

export default QuoteCard;