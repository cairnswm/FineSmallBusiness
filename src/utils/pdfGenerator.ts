import { jsPDF } from "jspdf";

/**
 * Generates a PDF document for a given quote.
 * @param {Object} quote - The quote object containing details to be included in the PDF.
 * @param {string} quote.title - The title of the quote.
 * @param {string} quote.description - The description of the quote.
 * @param {Array<{ description: string, quantity: number, unitPrice: number }>} quote.lineItems - The line items of the quote.
 * @param {string} quote.date - The date of the quote.
 * @param {string} quote.clientName - The name of the client.
 * @param {string} quote.clientEmail - The email of the client.
 * @param {string} quote.clientAddress - The address of the client.
 */
export const generateQuotePdf = (quote: {
  title: string;
  description: string;
  lineItems: { description: string; quantity: number; unitPrice: number }[];
  date: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
}) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text("Quote", 105, 20, { align: "center" });

  // Add quote details
  doc.setFontSize(12);
  doc.text(`Title: ${quote.title}`, 10, 40);
  doc.text(`Description: ${quote.description}`, 10, 50);
  doc.text(`Date: ${quote.date}`, 10, 60);

  // Add client details
  doc.text("Client Details:", 10, 80);
  doc.text(`Name: ${quote.clientName}`, 10, 90);
  doc.text(`Email: ${quote.clientEmail}`, 10, 100);
  doc.text(`Address: ${quote.clientAddress}`, 10, 110);

  // Add line items
  doc.text("Line Items:", 10, 130);
  let yPosition = 140;
  quote.lineItems.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.description} - Quantity: ${item.quantity}, Unit Price: $${item.unitPrice.toFixed(
        2
      )}, Total: $${(item.quantity * item.unitPrice).toFixed(2)}`,
      10,
      yPosition
    );
    yPosition += 10;
  });

  // Add total amount
  const totalAmount = quote.lineItems.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0
  );
  doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 10, yPosition + 10);

  // Save the PDF
  doc.save(`${quote.title.replace(/\s+/g, "_")}_Quote.pdf`);
};

/**
 * Generates a PDF document for a given invoice.
 * @param {Object} invoice - The invoice object containing details to be included in the PDF.
 * @param {string} invoice.title - The title of the invoice.
 * @param {string} invoice.description - The description of the invoice.
 * @param {Array<{ description: string, quantity: number, unitPrice: number }>} invoice.lineItems - The line items of the invoice.
 * @param {string} invoice.date - The date of the invoice.
 * @param {string} invoice.clientName - The name of the client.
 * @param {string} invoice.clientEmail - The email of the client.
 * @param {string} invoice.clientAddress - The address of the client.
 * @param {Object} businessDetails - The business details to include in the header.
 * @param {string} businessDetails.name - The name of the business.
 * @param {string} businessDetails.email - The email of the business.
 * @param {string} businessDetails.phone - The phone number of the business.
 * @param {string} businessDetails.address - The address of the business.
 */
export const generateInvoicePdf = (
  invoice: {
    title: string;
    description: string;
    lineItems: { description: string; quantity: number; unitPrice: number }[];
    date: string;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
  },
  businessDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }
) => {
  const doc = new jsPDF();

  // Add business details in the header
  doc.setFontSize(12);
  doc.text(`Business Name: ${businessDetails.name}`, 10, 10);
  doc.text(`Email: ${businessDetails.email}`, 10, 20);
  doc.text(`Phone: ${businessDetails.phone}`, 10, 30);
  doc.text(`Address: ${businessDetails.address}`, 10, 40);

  // Add title
  doc.setFontSize(18);
  doc.text("Invoice", 105, 60, { align: "center" });

  // Add invoice details
  doc.setFontSize(12);
  doc.text(`Title: ${invoice.title}`, 10, 80);
  doc.text(`Description: ${invoice.description}`, 10, 90);
  doc.text(`Date: ${invoice.date}`, 10, 100);

  // Add client details
  doc.text("Client Details:", 10, 120);
  doc.text(`Name: ${invoice.clientName}`, 10, 130);
  doc.text(`Email: ${invoice.clientEmail}`, 10, 140);
  doc.text(`Address: ${invoice.clientAddress}`, 10, 150);

  // Add line items
  doc.text("Line Items:", 10, 170);
  let yPosition = 180;
  invoice.lineItems.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.description} - Quantity: ${item.quantity}, Unit Price: $${item.unitPrice.toFixed(
        2
      )}, Total: $${(item.quantity * item.unitPrice).toFixed(2)}`,
      10,
      yPosition
    );
    yPosition += 10;
  });

  // Add total amount
  const totalAmount = invoice.lineItems.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0
  );
  doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 10, yPosition + 10);

  // Add payment details in the footer
  doc.text("Payment Details:", 10, yPosition + 30);
  doc.text("Please make payment to the above business details.", 10, yPosition + 40);

  // Save the PDF
  doc.save(`${invoice.title.replace(/\s+/g, "_")}_Invoice.pdf`);
};