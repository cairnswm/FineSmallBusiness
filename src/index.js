import React from 'react';
import ReactDOM from 'react-dom/client';
import AppProvider from './context/AppContext';
import WaitingListProvider from './context/WaitingListContext';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppProvider>
      <WaitingListProvider>
        <App />
      </WaitingListProvider>
    </AppProvider>
  </React.StrictMode>
);
