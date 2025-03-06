import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import AppPage from './pages/App';
import Dashboard from './pages/dashboard';
import AddQuotePage from './pages/add-quote';
import AddInvoicePage from './pages/add-invoice';
import SettingsPage from './pages/settings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/clients" element={<Dashboard />} />
        <Route path="/quotes" element={<Dashboard />} />
        <Route path="/invoices" element={<Dashboard />} />
        <Route path="/add-quote" element={<AddQuotePage />} />
        <Route path="/add-invoice" element={<AddInvoicePage />} />
      </Routes>
    </Router>
  );
};

export default App;
