import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Access from './Access';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FpjsProvider loadOptions={{ apiKey: 'hBaHBTSTwB9REZP8d5Fd'}}>
      <Access />
    </FpjsProvider>
  </React.StrictMode>
);
