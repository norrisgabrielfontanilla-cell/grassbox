import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/main.css';

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (measurementId && /^G-[A-Z0-9]+$/.test(measurementId)) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
