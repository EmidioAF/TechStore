import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'
import { AuthProvider } from './context/AuthContext'
import { ProductsProvider } from './context/ProductsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>
)