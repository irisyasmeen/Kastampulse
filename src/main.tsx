import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fix for "process is not defined" in some browser/deployment environments
if (typeof window !== 'undefined' && !window.process) {
  (window as any).process = { env: {} };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
