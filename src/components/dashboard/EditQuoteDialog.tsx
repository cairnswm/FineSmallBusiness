import React, { useState, useContext } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { DashboardContext } from '@/context/DashboardContext';

interface EditQuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quoteId: number | null;
}

const EditQuoteDialog: React.FC<EditQuoteDialogProps> = ({ isOpen, onClose, quoteId }) => {
  const { quotes, updateQuote } = useContext(DashboardContext);
  const [formData, setFormData] = useState({ title: '', description: '', amount: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteId !== null) {
      updateQuote(quoteId, { ...formData, id: quoteId });
      onClose();
    }
  };

  React.useEffect(() => {
    if (quoteId !== null) {
      const quote = quotes.find((q) => q.id === quoteId);
      if (quote) {
        setFormData({
          title: quote.title || '',
          description: quote.description || '',
          amount: quote.amount || '',
        });
      }
    }
  }, [quoteId, quotes]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Quote</DialogTitle>
        </DialogHeader>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            <FormLabel htmlFor="title">Title</FormLabel>
            <FormControl>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter quote title"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormControl>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter quote description"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <FormControl>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter quote amount"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuoteDialog;
