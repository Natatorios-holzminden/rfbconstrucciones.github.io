import React from 'react';
import { BedDouble, Utensils, Wifi, Sparkles, Zap, Wrench, Users, Percent, Headset, Plane, FileText, PlusCircle } from 'lucide-react';
import './PorqueCoda.css';

// Import local images
import cleaningImg from '../assets/cleaning_weekly.png';
import utilitiesImg from '../assets/utilities_included.png';
import maintenanceImg from '../assets/maintenance_included.png';

const PorqueCoda = () => {
    return (
        <div className="porque-coda-page">
            {/* Hero Section */}
            <section className="porque-hero">
                <div className="porque-hero-content">
                    <h1>
                        Habitaciones privadas<br />
                        con todo incluido.
                    </h1>
                    <h2 className="hero-italic">
                        Solo faltas tú.
                    </h2>
                    <p className="hero-subtitle">
                        Descubre por qué nuestro alquiler de habitaciones, apartamentos,
                        pisos o estudios en Buenos Aires con todo incluido es la mejor opción
                        para ti ya seas digital nomad, estudiante o nuevo en la ciudad.
                    </p>
                    <a href="/habitaciones" className="btn-hero-outline">
                        Ver habitaciones <span className="arrow">➔</span>
                    </a>
                </div>
            </section>

            {/* Savings Section */}
            <section className="savings-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Ahorra más de 500€ al mes.</h2>
                        <p>
                            Ahorra más de 500 € cada mes viviendo en uno de nuestros
                            <strong> departamentos coliving</strong> vs lo que te costaría un alquiler tradicional
                            de apartamento, piso o estudio. Además, te facilitamos la vida
                            agrupando todos los gastos bajo una única factura.
                        </p>
                    </div>

                    <div className="savings-card">
                        <div className="savings-table">
                            {/* Header row */}
                            <div className="s-row s-header">
                                <div className="s-col concept"></div>
                                <div className="s-col option">Piso compartido</div>
                                <div className="s-col brand">Coda</div>
                            </div>

                            {/* Content rows */}
                            <div className="s-row">
                                <div className="s-col concept">Alquiler medio</div>
                                <div className="s-col option">600 €</div>
                                <div className="s-col brand val">850 €</div>
                            </div>
                            <div className="s-row">
                                <div className="s-col concept">Suministros</div>
                                <div className="s-col option">100 €</div>
                                <div className="s-col brand inc">Incluido</div>
                            </div>
                            <div className="s-row">
                                <div className="s-col concept">WiFi</div>
                                <div className="s-col option">20 €</div>
                                <div className="s-col brand inc">Incluido</div>
                            </div>
                            <div className="s-row">
                                <div className="s-col concept">Limpieza semanal</div>
                                <div className="s-col option">80 €</div>
                                <div className="s-col brand inc">Incluido</div>
                            </div>
                            <div className="s-row">
                                <div className="s-col concept">Mobiliario</div>
                                <div className="s-col option">1500 €*</div>
                                <div className="s-col brand inc">Incluido</div>
                            </div>
                            <div className="s-row">
                                <div className="s-col concept">Equipamiento</div>
                                <div className="s-col option">175 €*</div>
                                <div className="s-col brand inc">Incluido</div>
                            </div>
                            <div className="s-row">
                                <div className="s-col concept">Mantenimiento</div>
                                <div className="s-col option lgt">no incluido</div>
                                <div className="s-col brand inc">Incluido</div>
                            </div>
                            <div className="s-row">
                                <div className="s-col concept">Atención 24/7</div>
                                <div className="s-col option lgt">no incluido</div>
                                <div className="s-col brand inc">Incluido</div>
                            </div>
                            <div className="s-row">
                                <div className="s-col concept">Gastos gestión</div>
                                <div className="s-col option">870 €***</div>
                                <div className="s-col brand val">375 €</div>
                            </div>

                            {/* Total row */}
                            <div className="s-row total">
                                <div className="s-col concept">Coste total 1r mes</div>
                                <div className="s-col option">3345 €</div>
                                <div className="s-col brand">
                                    <span className="pill">1225 €</span>
                                </div>
                            </div>
                        </div>

                        <div className="legal-text">
                            *El coste de mobiliario se ha calculado de forma aproximada en base al precio de mobiliario y menaje de IKEA más económico necesario para amueblar la parte proporcional de una casa de 3 habitaciones; **Los gastos de gestión estándar de una agencia inmobiliaria suelen ser el 10% de una anualidad más IVA. En Coda solo cobramos una vez en concepto de formalización del contrato, suministro de juego de toallas, almohadas, funda de colchón, sábanas y nórdica, así como cubrir parte del coste de la limpieza final de la habitación, despensa y estantes de la nevera.
                        </div>
                    </div>
                </div>
            </section>

            {/* Rest of the page... (Keep existing sections but simplified for now to ensure this build works) */}
            <section className="green-banner-section">
                <div className="container banner-grid">
                    <div className="banner-content">
                        <h2>Tu estancia en Buenos Aires,<br />sin dolores de cabeza.</h2>
                        <p>Nuestra misión es facilitarte la vida para que puedas centrarte en lo que realmente te importa.</p>
                    </div>
                    <div className="banner-image">
                        <img src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=800&q=80" alt="Relajación" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PorqueCoda;
