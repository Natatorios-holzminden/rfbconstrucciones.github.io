import React from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle, Lock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-column">
                        <a href="#" className="footer-logo">Coda</a>
                        <div className="footer-info">
                            <p>Palermo, Buenos Aires<br />Argentina</p>
                            <br />
                            <p>community@coda.eu</p>
                            <p>+54 11 5493 2199</p>
                        </div>
                        <div className="footer-social">
                            <Instagram size={20} />
                            <Facebook size={20} />
                            <Linkedin size={20} />
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>Coliving</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/porque-coda">¿Por qué Coda?</Link></li>
                            <li><Link to="/departamentos">Departamentos</Link></li>
                            <li><Link to="/habitaciones">Habitaciones</Link></li>
                            <li><Link to="/comunidad">Comunidad</Link></li>
                            <li><Link to="/faqs">FAQs</Link></li>
                            {/* <li><a href="#">Blog</a></li> */}
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Propietarios</h4>
                        <ul className="footer-links">
                            <li><Link to="/propietarios">Propietarios</Link></li>
                        </ul>

                        <div className="certifications">
                            <div className="cert-badge">
                                <Lock size={16} strokeWidth={2.5} />
                                PAGO SEGURO
                            </div>
                            <div className="cert-badge">
                                <ShieldCheck size={16} strokeWidth={2.5} />
                                SITIO VERIFICADO
                            </div>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                            <span style={{ fontSize: '12px', opacity: 0.8, display: 'block', marginBottom: '8px' }}>Quiero cambiar de idioma:</span>
                            <div className="flags">
                                <img src="https://flagcdn.com/w40/es.png" alt="Español" className="flag-icon" title="Español" />
                                <img src="https://flagcdn.com/w40/de.png" alt="Deutsch" className="flag-icon" title="Deutsch" />
                                <img src="https://flagcdn.com/w40/us.png" alt="English" className="flag-icon" title="English" />
                                <img src="https://flagcdn.com/w40/fr.png" alt="Français" className="flag-icon" title="Français" />
                                <img src="https://flagcdn.com/w40/br.png" alt="Português" className="flag-icon" title="Português" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div>Copyright © Coda Coliving, S.L. Todos los derechos reservados.</div>
                    <div>Coda® Coliving es una marca registrada propiedad de Coda Coliving S.L. Política de Privacidad y Términos y condiciones</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
