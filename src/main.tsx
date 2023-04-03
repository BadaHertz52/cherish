import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'reset-css';

const container = document.getElementById('root') as HTMLElement;

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
