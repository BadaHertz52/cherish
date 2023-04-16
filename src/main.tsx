import React from 'react';

import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

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
