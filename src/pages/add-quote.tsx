import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "@/context/DashboardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import AddClientModal from "@/components/dashboard/AddClientModal";

const AddQuotePage: React.FC = () => {
  const navigate = useNavigate();
  const { clients, addQuote } = useContext(DashboardContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    clientId: "",
  });
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClientSelect = (value: string) => {
    if (value === "add-new") {
      setIsClientModalOpen(true);
    } else {
      setFormData((prevData) => ({ ...prevData, clientId: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.amount && formData.clientId) {
      const newQuote = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        amount: formData.amount,
        date: new Date().toISOString().split("T")[0],
        clientId: Number(formData.clientId),
      };
      addQuote(newQuote);
      navigate("/dashboard");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Quote</h1>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back
        </Button>
      </header>

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
            <Select value={formData.clientId} onValueChange={handleClientSelect}>
              <SelectTrigger>
                {formData.clientId
                  ? clients.find((client) => client.id === Number(formData.clientId))?.name || "Select a client"
                  : "Select a client"}
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={String(client.id)}>
                    {client.name}
                  </SelectItem>
                ))}
                <SelectItem value="add-new">Add New Client</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
          <Button type="submit">Add Quote</Button>
        </div>
      </Form>

      <AddClientModal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} />
    </div>
  );
};

export default AddQuotePage;
