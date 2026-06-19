import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className="promo-banner">
                <div className="promo-content">
                    {[1, 2, 3].map((_, i) => (
                        <React.Fragment key={i}>
                            <span>REBAJAS DE ENERO 🎁 1 SEMANA GRATIS reservando ahora y entrando antes del 31 de enero.</span>
                            {i < 2 && <span className="separator">•</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <header className="header">
                <div className="header-container">
                    <Link to="/" className="logo" onClick={closeMenu}>Coda</Link>

                    {/* DESKTOP NAV */}
                    <nav className="desktop-nav">
                        <Link to="/porque-coda">Por qué Coda</Link>
                        <Link to="/departamentos">Departamentos</Link>
                        <Link to="/habitaciones">Habitaciones</Link>
                        <Link to="/comunidad">Comunidad</Link>
                        <Link to="/propietarios">Propietarios</Link>
                        <Link to="/faqs">FAQs</Link>
                    </nav>

                    <div className="header-actions desktop-only">
                        <div className="flags">
                            <img src="https://flagcdn.com/w40/es.png" alt="Español" className="flag-icon" title="Español" />
                            <img src="https://flagcdn.com/w40/de.png" alt="Deutsch" className="flag-icon" title="Deutsch" />
                            <img src="https://flagcdn.com/w40/us.png" alt="English" className="flag-icon" title="English" />
                            <img src="https://flagcdn.com/w40/fr.png" alt="Français" className="flag-icon" title="Français" />
                            <img src="https://flagcdn.com/w40/br.png" alt="Português" className="flag-icon" title="Português" />
                        </div>
                        <Link to="/habitaciones" className="btn-primary">Reserva ahora</Link>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    {/* MOBILE OVERLAY MENU */}
                    <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="/porque-coda" onClick={closeMenu}>Por qué Coda</Link>
                        <Link to="/departamentos" onClick={closeMenu}>Departamentos</Link>
                        <Link to="/habitaciones" onClick={closeMenu}>Habitaciones</Link>
                        <Link to="/comunidad" onClick={closeMenu}>Comunidad</Link>
                        <Link to="/propietarios" onClick={closeMenu}>Propietarios</Link>
                        <Link to="/faqs" onClick={closeMenu}>FAQs</Link>

                        <div className="mobile-menu-footer">
                            <div className="flags">
                                <img src="https://flagcdn.com/w40/es.png" alt="Español" className="flag-icon" />
                                <img src="https://flagcdn.com/w40/de.png" alt="Deutsch" className="flag-icon" />
                                <img src="https://flagcdn.com/w40/us.png" alt="English" className="flag-icon" />
                                <img src="https://flagcdn.com/w40/fr.png" alt="Français" className="flag-icon" />
                                <img src="https://flagcdn.com/w40/br.png" alt="Português" className="flag-icon" />
                            </div>
                            <Link to="/habitaciones" className="btn-primary" onClick={closeMenu}>Reserva ahora</Link>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
