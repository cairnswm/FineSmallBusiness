import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useDashboardContext } from "@/context/DashboardContext";

interface AddEditClientCardProps {
  isOpen: boolean;
  onClose: () => void;
  clientId?: number | null;
}

const AddEditClientCard: React.FC<AddEditClientCardProps> = ({ isOpen, onClose, clientId }) => {
  const { clients, addClient, updateClient } = useDashboardContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  });

  useEffect(() => {
    if (clientId !== null && clientId !== undefined) {
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
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "active",
      });
    }
  }, [clientId, clients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientId !== null && clientId !== undefined) {
      updateClient(clientId, formData);
    } else {
      const newClient = {
        id: Date.now(),
        ...formData,
      };
      addClient(newClient);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{clientId ? "Edit Client" : "Add Client"}</DialogTitle>
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
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{clientId ? "Save Changes" : "Add Client"}</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditClientCard;
