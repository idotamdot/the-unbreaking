import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Path relative to main.jsx
import './style/pallet.css'; // or './styles/pallet.css', depending on your naming

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
