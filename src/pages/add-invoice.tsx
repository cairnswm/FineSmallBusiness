import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { DashboardContext } from "@/context/DashboardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import AddClientModal from "@/components/dashboard/AddClientModal";

const AddInvoicePage: React.FC = () => {
  const navigate = useNavigate();
  const { clients, invoices, updateInvoice } = useContext(DashboardContext);
  const [formData, setFormData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const invoiceId = params.get("id");
    if (invoiceId) {
      const existingInvoice = invoices.find((invoice) => invoice.id === Number(invoiceId));
      if (existingInvoice) {
        return {
          title: existingInvoice.title,
          description: existingInvoice.description,
          amount: existingInvoice.amount,
          clientId: String(existingInvoice.clientId),
        };
      }
    }
    return {
      title: "",
      description: "",
      amount: "",
      clientId: "",
    };
  });
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSaveInvoice = () => {
    if (formData.title && formData.description && formData.amount && formData.clientId) {
      const params = new URLSearchParams(window.location.search);
      const invoiceId = params.get("id");
      const invoicePayload = {
        title: formData.title,
        description: formData.description,
        amount: formData.amount,
        clientId: Number(formData.clientId),
        date: new Date().toISOString().split("T")[0],
      };

      if (invoiceId) {
        updateInvoice(Number(invoiceId), invoicePayload);
      } else {
        addInvoice(invoicePayload);
        toast({
          title: "Success",
          description: "Invoice added successfully.",
          variant: "success",
        });
      }
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6 pb-40">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{new URLSearchParams(window.location.search).get("id") ? "Edit Invoice" : "Add New Invoice"}</h1>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back
        </Button>
      </header>

      <Form>
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
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
              placeholder="Enter invoice description"
              required
              className="textarea h-32 border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
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
          <Button
            type="button"
            onClick={handleSaveInvoice}
          >
            {new URLSearchParams(window.location.search).get("id") ? "Update Invoice" : "Add Invoice"}
          </Button>
        </div>
      </Form>

      <AddClientModal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} />
    </div>
  );
};

export default AddInvoicePage;