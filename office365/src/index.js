import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Access from './Access';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FpjsProvider loadOptions={{ apiKey: 'S6c80fC8NoRThVBKG6Sf'}}>
      <Access />
    </FpjsProvider>
  </React.StrictMode>
);
