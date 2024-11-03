import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/HomePage/home';
import { InfoCompra } from './pages/InfoCompra/infoCompra';
import { HeaderA } from './pages/HomePage/components/header/headerSeccionA/headerA';
import { HeaderB } from './pages/HomePage/components/header/headerSeccionB/headerB';
import { Footer } from './pages/HomePage/components/footer/Footer';
import { Contacto } from './pages/Contacto/Contacto';
import { Productos } from './pages/Productos/Productos';
import { SearchProvider } from './Context/searchContext';
import { ContextProductProvider } from './Context/productDetailContext';
import { AuthProvider } from './Context/authContext';
import { ProductoDetail } from './pages/VistaProducto/ProductoDetail';
import { Route } from 'react-router-dom';
import { LoginModal } from './pages/Login/LoginModal/loginModal';
import { LoginModalProvider } from './Context/LoginPopContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <AuthProvider>
  <LoginModalProvider> 
    <Router>
      <HeaderA />
      <SearchProvider>
        <ContextProductProvider>
          <HeaderB />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productoDetail" element={<ProductoDetail />} />
            <Route path="/infocompra" element={<InfoCompra />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
          <LoginModal></LoginModal>
        </ContextProductProvider>
      </SearchProvider>
      <Footer />
    </Router>
  </LoginModalProvider>
</AuthProvider>
);


