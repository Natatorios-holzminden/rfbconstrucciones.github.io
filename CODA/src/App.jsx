import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Habitaciones from './pages/Habitaciones';
import SalesBar from './components/SalesBar';
import AnnouncementBar from './components/AnnouncementBar';

import PropertyDetails from './pages/PropertyDetails';
import Propietarios from './pages/Propietarios';
import Apartamentos from './pages/Apartamentos';
import Faqs from './pages/Faqs';
import Comunidad from './pages/Comunidad';
import PorqueCoda from './pages/PorqueCoda';
import Admin from './pages/Admin';
import WhatsAppButton from './components/WhatsAppButton';


function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/porque-coda" element={<PorqueCoda />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/habitaciones/:id" element={<PropertyDetails />} />
          <Route path="/propietarios" element={<Propietarios />} />
          <Route path="/departamentos" element={<Apartamentos />} />
          <Route path="/departamentos/:id" element={<PropertyDetails />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="/admin" element={<Admin />} />
          {/* Fallback? */}

        </Routes >
      </main >
      <Footer />
      <WhatsAppButton />
    </div >
  )
}

export default App;
