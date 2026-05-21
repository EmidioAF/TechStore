import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import AdminProducts from './pages/AdminProducts'
import ProductDetails from './pages/ProductDetails'

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="container main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/:id" element={<ProductDetails />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/admin-produtos" element={<AdminProducts />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}