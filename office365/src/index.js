import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FpjsProvider
  loadOptions={{
    apiKey: "S6c80fC8NoRThVBKG6Sf"
  }}
>
  <App />
</FpjsProvider>,
);
