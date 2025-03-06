import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useDashboardContext } from "@/context/DashboardContext";

interface EditClientModalProps {
  clientId: number;
  isOpen: boolean;
  onClose: () => void;
}

const EditClientModal: React.FC<EditClientModalProps> = ({ clientId, isOpen, onClose }) => {
  const { clients, updateClient } = useDashboardContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  });

  useEffect(() => {
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
        status: client.status,
      });
    }
  }, [clientId, clients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, status: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateClient(clientId, formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Client</DialogTitle>
        </DialogHeader>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormControl>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter client name"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormControl>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter client email"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <FormControl>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter client phone"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="address">Address</FormLabel>
            <FormControl>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter client address"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="status">Status</FormLabel>
            <FormControl>
              <Select value={formData.status} onValueChange={handleStatusChange}>
                <SelectTrigger>{formData.status}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClientModal;
