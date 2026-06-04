import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import AdminProducts from './pages/AdminProducts'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'

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
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin-produtos"
            element={
              <PrivateRoute>
                <AdminProducts />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
