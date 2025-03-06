import jsPDF from "jspdf";

/**
 * Generates a PDF document for a given quote.
 * @param {Object} quote - The quote object containing details to be included in the PDF.
 * @param {string} quote.title - The title of the quote.
 * @param {string} quote.description - The description of the quote.
 * @param {Array} quote.lineItems - The line items of the quote.
 * @param {string} quote.date - The date of the quote.
 * @param {string} quote.clientName - The name of the client.
 * @param {string} quote.clientEmail - The email of the client.
 * @param {string} quote.clientAddress - The address of the client.
 */
export const generateQuotePdf = (quote) => {
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
