import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/HomePage/home';
import { InfoCompra } from './pages/InfoCompra/infoCompra';
import { HeaderA } from './pages/HomePage/components/header/headerSeccionA/headerA';
import { HeaderB } from './pages/HomePage/components/header/headerSeccionB/headerB';
import { Footer } from './pages/HomePage/components/footer/Footer';
import { Contacto } from './pages/Contacto/Contacto';
import { Productos } from './pages/Productos/Productos';
import { SearchProvider } from './hooks/searchContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  
<>
  

    <Router>
      <HeaderA />
      <SearchProvider>
        <HeaderB />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/InfoCompra" element={<InfoCompra />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Productos" element={<Productos />} />
          </Routes>
      <Footer />
      </SearchProvider>
    </Router>
 
     

 
  </>
);


