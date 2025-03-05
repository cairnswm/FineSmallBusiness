// start the app always with '/' route
import Banner from "@/components/layout/Banner";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TooltipProvider } from "./components/ui/tooltip";

import { ThemeProvider } from "./components/layout/theme-provider";
import { DashboardProvider } from "./context/DashboardContext";
import "./index.css";
import Index from "./pages";
import Dashboard from "./pages/dashboard";
import AddQuotePage from "./pages/add-quote";
import AddInvoicePage from "./pages/add-invoice";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <DashboardProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-quote" element={<AddQuotePage />} />
              <Route path="/edit-quote/:id" element={<AddQuotePage />} />
              <Route path="/add-invoice" element={<AddInvoicePage />} />
              <Route path="/edit-invoice/:id" element={<AddInvoicePage />} />
            </Routes>
          </DashboardProvider>
          <Sonner />
          <Toaster />
          <Banner />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);