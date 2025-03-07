// start the app always with '/' route
import Banner from "@/components/layout/Banner";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TooltipProvider } from "./components/ui/tooltip";

import AddInvoicePage from "./pages/add-invoice";
import AddEditClientPage from "./pages/add-edit-client";
import SettingsPage from "./pages/settings";
import { ThemeProvider } from "./components/layout/theme-provider";
import { DashboardProvider } from "./context/DashboardContext";
import { QuoteProvider } from "./context/QuoteContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/dashboard";
import AddQuotePage from "./pages/add-quote";
import ClientManagement from "./pages/client-management";
import QuotesPage from "./pages/quotes";
import InvoicePage from "./pages/invoices";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <DashboardProvider>
            <QuoteProvider>
              <InvoiceProvider>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/add-quote" element={<AddQuotePage />} />
                  <Route path="/edit-quote/:id" element={<AddQuotePage />} />
                  <Route path="/add-invoice" element={<AddInvoicePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/clients" element={<ClientManagement />} />
                  <Route path="/add-edit-client" element={<AddEditClientPage />} />
                  <Route path="/quotes" element={<QuotesPage />} />
                  <Route path="/invoices" element={<InvoicesPage />} />
                </Routes>
              </InvoiceProvider>
            </QuoteProvider>
          </DashboardProvider>
          <Sonner />
          <Toaster />
          <Banner />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);