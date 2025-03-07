import React, { useState, useContext, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { DashboardContext } from '@/context/DashboardContext';

interface AddEditQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteId?: number | null;
}

const AddEditQuoteModal: React.FC<AddEditQuoteModalProps> = ({ isOpen, onClose, quoteId }) => {
  const { clients, quotes, addClient, updateQuote } = useContext(DashboardContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    clientId: '',
  });
  const [status, setStatus] = useState('');

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [isAddingClient, setIsAddingClient] = useState(false);

  useEffect(() => {
    if (quoteId !== null && quoteId !== undefined) {
      const quote = quotes.find((q) => q.id === quoteId);
      if (quote) {
        setFormData({
          title: quote.title || '',
          description: quote.description || '',
          amount: quote.amount || '',
          clientId: '',
        });
      }
    }
  }, [quoteId, quotes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClientInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteId !== null && quoteId !== undefined) {
      updateQuote(quoteId, { ...formData, id: quoteId });
    } else {
      console.log('New quote data:', formData);
    }
    onClose();
  };

  const handleAddClient = () => {
    if (newClient.name && newClient.email) {
      const newClientId = clients.length + 1; // Mock ID generation
      addClient({ ...newClient, id: newClientId });
      setFormData((prevData) => ({ ...prevData, clientId: String(newClientId) }));
      setNewClient({ name: '', email: '', phone: '', address: '' });
      setIsAddingClient(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{quoteId ? 'Edit Quote' : 'Add Quote'}</DialogTitle>
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
          <FormItem>
            <FormLabel htmlFor="client">Client</FormLabel>
            <FormControl>
              <Select
                value={formData.clientId}
                onValueChange={(value) => setFormData((prevData) => ({ ...prevData, clientId: value }))}
              >
                <SelectTrigger>
                  {formData.clientId
                    ? clients.find((client) => client.id === Number(formData.clientId))?.name || 'Select a client'
                    : 'Select a client'}
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={String(client.id)}>
                      {client.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="add-new" onClick={() => setIsAddingClient(true)}>
                    Add New Client
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
          {isAddingClient && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Add New Client</h3>
              <FormItem>
                <FormLabel htmlFor="client-name">Name</FormLabel>
                <FormControl>
                  <Input
                    id="client-name"
                    name="name"
                    value={newClient.name}
                    onChange={handleClientInputChange}
                    placeholder="Enter client name"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="client-email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="client-email"
                    name="email"
                    value={newClient.email}
                    onChange={handleClientInputChange}
                    placeholder="Enter client email"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="client-phone">Phone</FormLabel>
                <FormControl>
                  <Input
                    id="client-phone"
                    name="phone"
                    value={newClient.phone}
                    onChange={handleClientInputChange}
                    placeholder="Enter client phone"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel htmlFor="client-address">Address</FormLabel>
                <FormControl>
                  <Input
                    id="client-address"
                    name="address"
                    value={newClient.address}
                    onChange={handleClientInputChange}
                    placeholder="Enter client address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button type="button" onClick={handleAddClient}>
                Save Client
              </Button>
            </div>
          )}
          <FormItem>
            <FormLabel htmlFor="status">Status</FormLabel>
            <FormControl>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger>
                  {status || 'Select a status'}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{quoteId ? 'Update Quote' : 'Add Quote'}</Button>
         
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditQuoteModal;