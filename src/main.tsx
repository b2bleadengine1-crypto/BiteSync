import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Registo Resiliente do Service Worker (PWA Offline)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('Service Worker do BiteSync ativo:', reg.scope);
      })
      .catch((err) => {
        // Ignora silenciosamente restrições de sandbox em ambiente de desenvolvimento
        console.info('Aviso: Service Worker em sandbox ou modo restrito:', err.message);
      });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
