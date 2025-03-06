import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboardContext } from "@/context/DashboardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const AddEditClientPage: React.FC = () => {
  const navigate = useNavigate();
  const { clients, addClient, updateClient } = useDashboardContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get("id");
    if (clientId) {
      const client = clients.find((c) => c.id === Number(clientId));
      if (client) {
        setFormData({
          name: client.name,
          email: client.email,
          phone: client.phone,
          address: client.address,
          status: client.status,
        });
      }
    }
  }, [clients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get("id");
    if (clientId) {
      updateClient(Number(clientId), formData);
    } else {
      const newClient = {
        id: Date.now(),
        ...formData,
      };
      addClient(newClient);
    }
    navigate("/clients");
  };

  return (
    <div className="p-6 space-y-6 pb-40">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {new URLSearchParams(window.location.search).get("id") ? "Edit Client" : "Add New Client"}
        </h1>
        <Button variant="outline" onClick={() => navigate("/clients")}>
          Back
        </Button>
      </header>

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
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate("/clients")}>
            Cancel
          </Button>
          <Button type="submit">
            {new URLSearchParams(window.location.search).get("id") ? "Save Changes" : "Add Client"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddEditClientPage;
