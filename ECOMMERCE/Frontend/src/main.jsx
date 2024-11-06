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
import { ProductoDetail } from './pages/VistaProducto/ProductoDetail';
import { Route } from 'react-router-dom';
import { LoginModal } from './pages/Login/LoginModal/loginModal';
import { PrivateRoute } from './Routes/PrivatesRoute';
import { AgregarProducto } from './pages/PaginasPrivadas/AgregarProducto/AgregarProducto';
import { AppContextProviders } from './Context/Providers';

ReactDOM.createRoot(document.getElementById('root')).render(
  
<Router>
  <AppContextProviders>
          <HeaderA />
          <HeaderB />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productoDetail" element={<ProductoDetail />} />
            <Route path="/infocompra" element={<InfoCompra />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route element={<PrivateRoute />}>
              <Route path="/AgregarProducto" element={<AgregarProducto />} />
            </Route>
          </Routes>
          <LoginModal/>     
        <Footer />
      </AppContextProviders>
</Router>

);


