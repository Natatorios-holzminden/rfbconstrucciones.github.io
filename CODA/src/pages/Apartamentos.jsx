import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apartments as apartmentsData } from '../data';
import IconStrip from '../components/IconStrip';
import ApartmentCard from '../components/ApartmentCard';
import { ArrowRight, Armchair, ChefHat, Zap, Wifi, Sparkles, Wrench, Headphones } from 'lucide-react';
import mapBg from '../assets/map_bg.png';
import './Apartamentos.css';

import baRecoleta from '../assets/ba_recoleta.png';
import baPalermo from '../assets/ba_palermo.png';
import ownersHeroBa from '../assets/owners_hero_buenos_aires.png';
import ownersBuilding from '../assets/owners_building_final.png';
import ownersHero from '../assets/owners_hero.png';
import ownersHeroV2 from '../assets/owners_hero_v2.png';
import ownersMeeting from '../assets/owners_meeting.png';
import ownersBuildingClean from '../assets/owners_building_clean_v3.png';
import ownersInterior from '../assets/owners_interior_1.png';
import baNunez from '../assets/ba_nunez_river.png';
import baCaballito from '../assets/ba_caballito_center.png';
import baColegiales from '../assets/ba_colegiales_house.png';

const Apartamentos = () => {
    // Datos por defecto
    // Datos por defecto importados
    const defaultApartments = apartmentsData;

    // Estado para los apartamentos - lee desde localStorage o usa los por defecto
    const [apartments, setApartments] = useState(() => {
        const savedApartments = localStorage.getItem('codaApartments_v2');
        if (savedApartments) {
            try {
                const parsed = JSON.parse(savedApartments);
                // Si el array está vacío o no es válido, usar defaults (recuperación de errores)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
                return defaultApartments;
            } catch (e) {
                console.error('Error parsing apartments from localStorage:', e);
                return defaultApartments;
            }
        }
        return defaultApartments;
    });

    // Actualizar cuando cambie localStorage (por ejemplo, desde el panel admin)
    useEffect(() => {
        const handleStorageChange = () => {
            const savedApartments = localStorage.getItem('codaApartments_v2');
            if (savedApartments) {
                try {
                    setApartments(JSON.parse(savedApartments));
                } catch (e) {
                    console.error('Error parsing apartments:', e);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        // También escuchar evento personalizado (mismo tab)
        window.addEventListener('codaApartmentsUpdated_v2', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('codaApartmentsUpdated_v2', handleStorageChange);
        };
    }, []);


    return (
        <div className="apartamentos-page">
            <div className="container">
                {/* Hero Section */}
                <section className="apartamentos-hero">
                    <div className="hero-content-wrapper">
                        <div className="hero-left">
                            <div className="hero-overlay-text">
                                <h1>Bienvenido a tu <br />próximo hogar <span className="logo-text">Coda</span></h1>
                                <p>
                                    Define el piso o departamento compartido de Buenos Aires que más te
                                    convenga por características o ubicación, escoge la habitación más
                                    adecuada a tus necesidades, y haz una visita virtual hoy mismo.
                                </p>
                            </div>
                        </div>
                        <div className="hero-right">
                            <div className="step-card">
                                <span className="step-number">1</span>
                                <span className="step-text">Escoge tu departamento</span>
                            </div>
                            <div className="step-connector">
                                <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1) rotate(90deg)' }}>
                                    <path d="M10 5C10 5 10 25 30 25C50 25 50 45 50 45" stroke="#00d084" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M40 35L50 45L60 35" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {/* Simple curved arrow SVG - adjusted for positioning */}
                            </div>
                            <div className="step-card">
                                <span className="step-number">2</span>
                                <span className="step-text">Escoge la habitación</span>
                            </div>
                            <div className="step-connector">
                                <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1) rotate(90deg)' }}>
                                    <path d="M10 5C10 5 10 25 30 25C50 25 50 45 50 45" stroke="#00d084" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M40 35L50 45L60 35" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="step-card">
                                <span className="step-number">3</span>
                                <span className="step-text">Solicita la habitación</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="apartamentos-features">
                    <div className="features-header">
                        <h2>Departamentos con todo incluido.</h2>
                        <p>Los departamentos de Coda® Coliving vienen con</p>
                    </div>
                </section>
            </div>

            <CustomIconStrip />

            {/* Listings Grid */}
            <div className="container">
                <section className="listings-grid-section">
                    <div className="listings-grid">
                        {apartments.map(apt => (
                            <ApartmentCard key={apt.id} apartment={apt} />
                        ))}
                    </div>
                    <div className="view-all-container" style={{ flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '20px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0, color: '#1a1a1a' }}>O escoge directamente habitación</h2>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: '#9ca3af' }}>Más fácil, difícil.</h3>
                        <Link to="/habitaciones" className="btn-view-all" style={{ marginTop: '16px', textDecoration: 'none' }}>
                            Ver todas las habitaciones <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>
            </div>

            {/* Map Section - Full Width */}
            <section className="map-section">
                <div className="map-header">
                    <h2>Departamentos de media estancia. Donde tú elijas.</h2>
                    <p>Busca departamentos coliving cerca de tu trabajo o universidad.</p>
                </div>
                <div className="map-container">
                    {/* Placeholder using a background image and some UI elements to mimic logic */}
                    <div className="map-placeholder" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26245.55018751563!2d-58.4310574972166!3d-34.58784797076043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sPalermo%2C%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sar!4v1703649534062!5m2!1ses!2sar"
                            width="100%"
                            height="500"
                            style={{ border: 0, display: 'block' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa de Ubicaciones"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

const CustomIconStrip = () => {
    const features = [
        { icon: <Armchair size={40} strokeWidth={1} />, label: "Muebles de\ndiseño" },
        { icon: <ChefHat size={40} strokeWidth={1} />, label: "Cocinas\nequipadas" },
        { icon: <Zap size={40} strokeWidth={1} />, label: "Suministros\nincluidos" },
        { icon: <Wifi size={40} strokeWidth={1} />, label: "WiFi\nultrarrápido" },
        { icon: <Sparkles size={40} strokeWidth={1} />, label: "Limpieza\nsemanal" },
        { icon: <Wrench size={40} strokeWidth={1} />, label: "Mantenimiento\nincluido" },
        { icon: <Headphones size={40} strokeWidth={1} />, label: "Asistencia 24\nhoras" },
    ];

    return (
        <section className="custom-icon-strip">
            <div className="icon-grid">
                {features.map((feature, index) => (
                    <div key={index} className="icon-item">
                        <div className="icon-circle">
                            {feature.icon}
                        </div>
                        <div className="icon-label">
                            {feature.label.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < feature.label.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Apartamentos;
