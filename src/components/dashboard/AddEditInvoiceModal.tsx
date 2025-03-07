import React, { useState, useContext, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { DashboardContext } from '@/context/DashboardContext';

interface AddEditInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId?: number | null;
}

const AddEditInvoiceModal: React.FC<AddEditInvoiceModalProps> = ({ isOpen, onClose, invoiceId }) => {
  const { clients, invoices, addClient, updateInvoice } = useContext(DashboardContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    clientId: '',
  status: '',
  });

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [isAddingClient, setIsAddingClient] = useState(false);

  useEffect(() => {
    if (invoiceId !== null && invoiceId !== undefined) {
      const invoice = invoices.find((i) => i.id === invoiceId);
      if (invoice) {
        setFormData({
          title: invoice.title || '',
          description: invoice.description || '',
          amount: invoice.amount || '',
          clientId: '',
          status: invoice.status || '',
        });
      }
    }
  }, [invoiceId, invoices]);

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
    if (invoiceId !== null && invoiceId !== undefined) {
      updateInvoice(invoiceId, { ...formData, id: invoiceId });
    } else {
      console.log('New invoice data:', formData);
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
          <DialogTitle>{invoiceId ? 'Edit Invoice' : 'Add Invoice'}</DialogTitle>
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
                placeholder="Enter invoice title"
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
                placeholder="Enter invoice description"
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
                placeholder="Enter invoice amount"
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
                value={formData.status}
                onValueChange={(value) => setFormData((prevData) => ({ ...prevData, status: value }))}
              >
                <SelectTrigger>
                  {formData.status || 'Select a status'}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{invoiceId ? 'Update Invoice' : 'Add Invoice'}</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditInvoiceModal;