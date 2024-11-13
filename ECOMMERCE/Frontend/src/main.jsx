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
import { PrivateRouteAdmin } from './Routes/PrivatesRouteAdmin';
import { PrivateRouteClient } from './Routes/PrivatesRouteClient';
import { AgregarProducto } from './pages/PaginasPrivadas/AgregarProducto/AgregarProducto';
import { AppContextProviders } from './Context/Providers';
import { Publicaciones } from './pages/PaginasPrivadas/Publicaciones/Publicaciones';
import { MiPerfil } from './pages/PaginasPrivadas/Cliente/MiPerfil/MiPerfil';


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
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/AgregarProducto" element={<AgregarProducto />} />
              <Route path="/Publicaciones" element={<Publicaciones />} />
            </Route>
            <Route element={<PrivateRouteClient />}>
              <Route path="/Miperfil" element={<MiPerfil />} />
             
            </Route>
          </Routes>
          <LoginModal/>     
        <Footer />
      </AppContextProviders>
</Router>

);


