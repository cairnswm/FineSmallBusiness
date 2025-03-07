import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useQuoteContext } from "@/context/QuoteContext";
import { useDashboardContext } from "@/context/DashboardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AddClientModal from "@/components/dashboard/AddClientModal";

const AddQuotePage: React.FC = () => {
  const navigate = useNavigate();
  const { quotes, addQuote, updateQuote } = useQuoteContext();
  const { clients } = useDashboardContext();
  const [formData, setFormData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const quoteId = params.get("id");
    if (quoteId) {
      const existingQuote = quotes.find(
        (quote) => quote.id === Number(quoteId)
      );
      if (existingQuote) {
        return {
          title: existingQuote.title,
          description: existingQuote.description,
          clientId: String(existingQuote.clientId),
          lineItems: existingQuote.lineItems.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            price: item.unitPrice,
          })),
        };
      }
    }
    return {
      title: "",
      description: "",
      clientId: "",
      lineItems: [{ description: "", quantity: 1, price: 0 }],
    };
  });
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const [lineItems, setLineItems] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const quoteId = params.get("id");
    if (quoteId) {
      const existingQuote = quotes.find(
        (quote) => quote.id === Number(quoteId)
      );
      if (existingQuote) {
        return existingQuote.lineItems.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          price: item.unitPrice,
        }));
      }
    }
    return [{ description: "", quantity: 1, price: 0 }];
  });

  const handleLineItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setLineItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddLineItem = () => {
    setLineItems((prevItems) => [
      ...prevItems,
      { description: "", quantity: 1, price: 0 },
    ]);
  };

  const handleRemoveLineItem = (index: number) => {
    setLineItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const calculateTotalAmount = () => {
    return lineItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const handleSaveQuote = () => {
    if (formData.title && formData.description && formData.clientId) {
      const params = new URLSearchParams(window.location.search);
      const quoteId = params.get("id");
      const quotePayload = {
        title: formData.title,
        description: formData.description,
        clientId: Number(formData.clientId),
        lineItems: lineItems.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
        totalAmount: calculateTotalAmount(),
      };

      if (quoteId) {
        updateQuote(Number(quoteId), quotePayload);
      } else {
        addQuote(quotePayload);
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
        <h1 className="text-2xl font-bold">
          {new URLSearchParams(window.location.search).get("id")
            ? "Edit Quote"
            : "Add New Quote"}
        </h1>
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
              placeholder="Enter quote title"
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
              onChange={(e) =>
                handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
              }
              placeholder="Enter quote description"
              required
              className="textarea h-32 border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel htmlFor="client">Client</FormLabel>
          <FormControl>
            <Select
              value={formData.clientId}
              onValueChange={handleClientSelect}
            >
              <SelectTrigger>
                {formData.clientId
                  ? clients.find(
                      (client) => client.id === Number(formData.clientId)
                    )?.name || "Select a client"
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

        <FormItem>
          <FormLabel>Line Items</FormLabel>
          <div className="space-y-4">
            {lineItems.map((item, index) => (
              <div key={index} className="flex space-x-4 items-center">
                <Input
                  name={`description-${index}`}
                  value={item.description}
                  onChange={(e) =>
                    handleLineItemChange(index, "description", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleLineItemChange(index, "price", Number(e.target.value))
                  }
                  placeholder="Price"
                  required
                />
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveLineItem(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddLineItem}>
              Add Line Item
            </Button>
          </div>
        </FormItem>

        <div className="space-y-4">
          <div className="text-right text-lg font-semibold">
            Total: ${calculateTotalAmount().toFixed(2)}
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveQuote}>
              {new URLSearchParams(window.location.search).get("id")
                ? "Update Quote"
                : "Add Quote"}
            </Button>
          </div>
        </div>
      </Form>

      <AddClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
      />
    </div>
  );
};

export default AddQuotePage;
