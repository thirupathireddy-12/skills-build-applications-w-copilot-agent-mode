import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Vite exposes client-side env variables prefixed with VITE_ via import.meta.env.
// For example, VITE_CODESPACE_NAME is available as import.meta.env.VITE_CODESPACE_NAME.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
