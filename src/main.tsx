import React from 'react';

import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import App from '@/App';
import { AuthProvider } from '@/contexts/AuthContext';
import 'reset-css';

const container = document.getElementById('root') as HTMLElement;

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
);
