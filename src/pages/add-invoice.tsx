import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useInvoiceContext } from "@/context/InvoiceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import AddClientModal from "@/components/dashboard/AddClientModal";

const AddInvoicePage: React.FC = () => {
  const navigate = useNavigate();
  const { clients, invoices, addInvoice, updateInvoice } = useInvoiceContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    clientId: "",
  });
  const [lineItems, setLineItems] = useState(() => []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invoiceId = params.get("id");
    if (invoiceId) {
      const existingInvoice = invoices.find((invoice) => invoice.id === Number(invoiceId));
      if (existingInvoice) {
        setFormData({
          title: existingInvoice.title,
          description: existingInvoice.description,
          amount: existingInvoice.amount,
          clientId: String(existingInvoice.clientId),
        });
        setLineItems(
          Array.isArray(existingInvoice.lineItems)
            ? existingInvoice.lineItems.map((item) => ({
                description: item.description || "",
                quantity: item.quantity || 1,
                price: item.unitPrice || 0,
              }))
            : []
        );
      }
    }
  }, [invoices]);

  const handleLineItemChange = (index: number, field: string, value: string | number) => {
    setLineItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddLineItem = () => {
    setLineItems((prevItems) => [...prevItems, { description: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveLineItem = (index: number) => {
    setLineItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const calculateTotalAmount = () => {
    return lineItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const handleClientSelect = (value: string) => {
    if (value === "add-new") {
      setIsClientModalOpen(true);
    } else {
      setFormData((prevData) => ({ ...prevData, clientId: value }));
    }
  };

  const handleSaveInvoice = () => {
    if (formData.title && formData.description && formData.clientId) {
      const params = new URLSearchParams(window.location.search);
      const invoiceId = params.get("id");
      const invoicePayload = {
        title: formData.title,
        description: formData.description,
        lineItems: lineItems.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        totalAmount: calculateTotalAmount(),
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
          <FormLabel>Line Items</FormLabel>
          <div className="space-y-4">
            {Array.isArray(lineItems) && lineItems.map((item, index) => (
              <div key={index} className="flex space-x-4 items-center">
                <Input
                  name={`description-${index}`}
                  value={item.description}
                  onChange={(e) => handleLineItemChange(index, "description", e.target.value)}
                  placeholder="Description"
                  required
                />
                <Input
                  name={`quantity-${index}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const updatedQuantity = Number(e.target.value);
                    handleLineItemChange(index, "quantity", updatedQuantity);
                  }}
                  placeholder="Quantity"
                  required
                />
                <Input
                  name={`price-${index}`}
                  type="number"
                  value={item.price}
                  onChange={(e) => handleLineItemChange(index, "price", Number(e.target.value))}
                  placeholder="Price"
                  required
                />
                <Button variant="destructive" onClick={() => handleRemoveLineItem(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddLineItem}>
              Add Line Item
            </Button>
          </div>
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
                {clients && clients.map((client) => (
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

        <div className="space-y-4">
          <div className="text-right text-lg font-semibold">
            Total: ${calculateTotalAmount().toFixed(2)}
          </div>
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
        </div>
        <div className="text-right text-sm text-muted-foreground">
          Note: Ensure all line items are accurate before saving.
        </div>
      </Form>

      <AddClientModal isOpen={isClientModalOpen} onClose={() => setIsClientModalOpen(false)} />
    </div>
  );
};

export default AddInvoicePage;