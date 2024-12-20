import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import {Home} from './pages/PaginasPublicas/HomePage/home'
import { InfoCompra } from  './pages/PaginasPublicas/InfoCompra/infoCompra'
import { HeaderA } from './pages/PaginasPublicas/HomePage/components/header/headerSeccionA/headerA';
import { HeaderB } from './pages/PaginasPublicas/HomePage/components/header/headerSeccionB/headerB';
import { Footer } from './pages/PaginasPublicas/HomePage/components/footer/Footer';
import { Contacto } from './pages/PaginasPublicas/Contacto/Contacto';
import { Productos } from './pages/PaginasPublicas/Productos/Productos';
import { ProductoDetail } from './pages/PaginasPublicas/VistaProducto/ProductoDetail';
import { LoginModal } from './pages/PaginasPublicas/Login/LoginModal/loginModal';
import { PrivateRouteAdmin } from './Routes/PrivatesRouteAdmin';
import { PrivateRouteClient } from './Routes/PrivatesRouteClient';
import { AgregarProducto } from './pages/PaginasPrivadas/AgregarProducto/AgregarProducto';
import { AppContextProviders } from './Context/Providers';
import { Publicaciones } from './pages/PaginasPrivadas/Publicaciones/Publicaciones';
import { MiPerfil } from './pages/PaginasPrivadas/Cliente/MiPerfil/MiPerfil';
import { PageCarrito } from './pages/PaginasPublicas/PageCarrito/PageCarrito';
import { Compras } from './pages/PaginasPrivadas/Compras/Compras';
import { CompraExitosa } from './pages/PaginasPrivadas/CompraExitosa/CompraExitosa';
import { DetalleCompra } from './pages/PaginasPrivadas/DetalleCompra/DetalleCompra';
import { Ventas } from './pages/PaginasPrivadas/Ventas/Ventas';
import { DetalleVenta } from './pages/PaginasPrivadas/DetalleVenta/DetalleVenta';


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
            <Route path="/carrito" element={<PageCarrito />} />
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/AgregarProducto" element={<AgregarProducto />} />
              <Route path="/Publicaciones" element={<Publicaciones />} />
              <Route path="/Ventas" element={<Ventas />}/>
              <Route path="Ventas/Detalle" element={<DetalleVenta />} />
            </Route>
            <Route element={<PrivateRouteClient />}>
              <Route path="/Miperfil" element={<MiPerfil />} />    
              <Route path="/compras" element={<Compras />}/>
              <Route path="compras/detalle" element={<DetalleCompra />} />               
              <Route path="/CompraExitosa" element={<CompraExitosa />} />        
            </Route>
          </Routes>
          <LoginModal/>     
        <Footer />
      </AppContextProviders>
</Router>

);


