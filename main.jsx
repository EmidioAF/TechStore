/**
 * Este arquivo é o ponto de entrada da aplicação React.
 * Responsabilidades:
 * - Renderiza o componente App no elemento HTML com id="root"
 * - Envolve a aplicação com BrowserRouter para habilitar roteamento
 * - Importa estilos globais
 * - Habilita StrictMode para detecção de problemas em desenvolvimento
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

// Renderiza a aplicação no elemento raiz do HTML
// BrowserRouter: Habilita roteamento baseado em URL
// StrictMode: Verifica avisos e comportamentos não recomendados durante desenvolvimento
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)