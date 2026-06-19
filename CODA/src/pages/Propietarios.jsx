import React from 'react';
import { ArrowRight, TrendingUp, ShieldCheck, CalendarClock, FileCog, Home, Headset } from 'lucide-react';
import heroBg from '../assets/owners_hero_buenos_aires.png';
import interiorImg from '../assets/owners_interior_1.png';
import meetingImg from '../assets/owners_meeting.png';
import peopleImg from '../assets/owners_people_hero.png';
import './Propietarios.css';

const Propietarios = () => {
    return (
        <div className="propietarios-page">
            {/* Hero Section */}
            <section className="propietarios-hero">
                <div className="hero-background">
                    <img src={heroBg} alt="Buenos Aires Architecture" />
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-content container">
                    <span className="hero-subtitle">Property Management</span>
                    <h1 className="hero-title">
                        Mejoramos y <br />
                        garantizamos tu <br />
                        rentabilidad.
                    </h1>
                    <p className="hero-description">
                        Somos el aliado de Propietarios particulares, Patrimoniales, Empresas
                        e Instituciones que buscan mejorar la rentabilidad de sus activos con la
                        tranquilidad de un alquiler garantizado.
                    </p>
                    <button className="btn-hero-outline">
                        Alquila tu piso ahora
                        <ArrowRight size={20} className="ml-2" />
                    </button>
                </div>

                {/* Stats Bar */}
                <div className="hero-stats">
                    <div className="stat-item">
                        <h3>+200 años</h3>
                        <p>En noches vendidas</p>
                    </div>
                    <div className="stat-item">
                        <h3>+4000m²</h3>
                        <p>Superficie activos</p>
                    </div>
                    <div className="stat-item">
                        <h3>+20M€</h3>
                        <p>Valor de los activos</p>
                    </div>
                    <div className="stat-item">
                        <h3>+150 uds.</h3>
                        <p>En gestión</p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <div className="benefits-container container">
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <TrendingUp size={40} strokeWidth={1} />
                            </div>
                            <h3>Aumentamos tu rentabilidad</h3>
                            <p>Hasta un <strong>+24%</strong>. Reducimos la rotación, carencias, los costes de mantenimiento, administrativos y comisiones.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <ShieldCheck size={40} strokeWidth={1} />
                            </div>
                            <h3>Renta garantizada</h3>
                            <p>En Coda <strong>aseguramos el pago puntual</strong>, constante y garantizado <strong>de la renta</strong> durante todo el periodo de contrato.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <CalendarClock size={40} strokeWidth={1} />
                            </div>
                            <h3>Contrato de larga duración</h3>
                            <p>Si la propiedad nos encaja, <strong>formalizamos un único contrato de subarriendo o gestión</strong> durante el tiempo que pactemos.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <FileCog size={40} strokeWidth={1} />
                            </div>
                            <h3>Property Management</h3>
                            <p><strong>Nos ocupamos de todo.</strong> Buscar inquilinos de calidad, gestionar la relación con ellos y mantener tu propiedad al día.</p>
                        </div>
                    </div>

                    <div className="benefits-grid-centered">
                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <Home size={40} strokeWidth={1} />
                            </div>
                            <h3>En perfectas condiciones</h3>
                            <p>Incluimos en todas las propiedades servicio de limpieza semanal y mantenimiento. <strong>Como los chorros del oro.</strong></p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon-wrapper">
                                <Headset size={40} strokeWidth={1} />
                            </div>
                            <h3>Un único interlocutor</h3>
                            <p>Como integramos toda la gestión y operativa, <strong>solo tendrás que hablar con nosotros</strong> durante nuestro contrato.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Section 1 - Gestión Completa */}
            <section className="feature-section">
                <div className="feature-background">
                    <img src={interiorImg} alt="Interior" />
                </div>
                <div className="container feature-container">
                    <div className="feature-card left">
                        <h2>Gestión completa.</h2>
                        <p>
                            Nos encargamos de mejorar, adecuar, mantener tu propiedad,
                            buscar los inquilinos y gestionar la relación con ellos mientras
                            tú firmas únicamente un contrato de larga duración con nosotros.
                        </p>
                        <button className="btn-feature">
                            Solicita más información <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Feature Section 2 - Rentabilidad */}
            <section className="feature-section">
                <div className="feature-background">
                    <img src={meetingImg} alt="Meeting" />
                </div>
                <div className="container feature-container">
                    <div className="feature-card right">
                        <h2>Hasta <br /> <span className="text-highlight">+24% de <br /> rentabilidad.</span></h2>
                        <p>
                            Eliminamos prácticamente todos los costes de alquilar una
                            propiedad ya sea por cuenta propia o a través de terceros...
                            Y te dejamos una rentabilidad garantizada a largo plazo.
                        </p>
                        <button className="btn-feature">
                            Descubre cómo <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="comparison-section container">
                <h2>Maximiza los ingresos de tu inmueble</h2>

                <div className="comparison-card">
                    <div className="table-header-row">
                        <div className="col-label desc"></div>
                        <div className="col-header">Alquiler tradicional</div>
                        <div className="col-header brand">Coda</div>
                    </div>

                    <div className="table-row">
                        <div className="col-label">Alquiler 9 años</div>
                        <div className="col-value">108.000 €</div>
                        <div className="col-value brand">108.000 €</div>
                    </div>
                    <div className="table-row">
                        <div className="col-label">Carencias</div>
                        <div className="col-value">-3.750 €</div>
                        <div className="col-value brand">0 €</div>
                    </div>
                    <div className="table-row">
                        <div className="col-label">Rotaciones</div>
                        <div className="col-value">-4.500 €</div>
                        <div className="col-value brand">0 €</div>
                    </div>
                    <div className="table-row">
                        <div className="col-label">Fees agencia</div>
                        <div className="col-value">-4.608 €</div>
                        <div className="col-value brand">0 €</div>
                    </div>
                    <div className="table-row">
                        <div className="col-label">Costes admin.</div>
                        <div className="col-value">-3.240 €</div>
                        <div className="col-value brand">0 €</div>
                    </div>
                    <div className="table-row">
                        <div className="col-label">Seguro</div>
                        <div className="col-value">-1.800 €</div>
                        <div className="col-value brand">0 €</div>
                    </div>
                    <div className="table-row">
                        <div className="col-label">Morosidad</div>
                        <div className="col-value">-3.179 €</div>
                        <div className="col-value brand">0 €</div>
                    </div>

                    <div className="table-splitter"></div>

                    <div className="table-row total-row">
                        <div className="col-label">Ingresos totales</div>
                        <div className="col-value">86.923 €</div>
                        <div className="col-value brand-pill">
                            108.000 €
                        </div>
                    </div>

                    <p className="legal-note">
                        Duración de Contrato: 9 años. Rotación media inquilinos en España 2021: 3 años según Idealista. Dinamismo Alquiler Buenos Aires: medio 1,35 meses según Idealista. Carencias: DGR/PDA = 3,75 meses en total. Costes adecuación tras rotación: 10% de una anualidad. Fees agencia: 14,5% (10% de una anualidad + IVA). Costes administrativos: 3% en caso de que se externalice. Coste medio seguro hogar: 150€. Morosidad: 4% (no se tiene en cuenta COVID). Coste medio morosidad: 3179 €.
                    </p>
                </div>

                <div className="btn-cta-section">
                    <button className="btn-primary-outline-dark">
                        Alquila ahora tu inmueble <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="contact-image-wrapper">
                    <img src={peopleImg} alt="Consultants" />
                </div>
                <div className="contact-form-wrapper">
                    <div className="contact-card">
                        <h2>Cuéntanos más</h2>
                        <p className="contact-desc">Déjanos tus datos y te contactaremos en menos de 24 horas para conocer más sobre tu vivienda y hacerte la mejor propuesta.</p>

                        <form className="owners-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <input type="text" placeholder="Nombre" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Apellido/s" className="form-input" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <input type="email" placeholder="Email" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <input type="tel" placeholder="Teléfono" className="form-input" />
                                </div>
                            </div>
                            <div className="form-group">
                                <select className="form-select" defaultValue="">
                                    <option value="" disabled>Metodo de contacto preferente</option>
                                    <option value="email">Email</option>
                                    <option value="phone">Teléfono</option>
                                    <option value="whatsapp">WhatsApp</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <select className="form-select" defaultValue="">
                                    <option value="" disabled>Ciudad donde se encuentra la propiedad</option>
                                    <option value="buenos-aires">Buenos Aires</option>
                                    <option value="madrid">Madrid</option>
                                    <option value="other">Otra</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <textarea placeholder="Cuéntanos cómo podemos colaborar" className="form-textarea" rows="2"></textarea>
                            </div>

                            <p className="legal-small">
                                Aspas Living, S.L. es responsable del tratamiento de los datos que nos proporcionas con la finalidad de ofrecerte nuestros servicios. Puedes ejercer tus derechos de acceso, rectificación y supresión de datos, así como otros derechos como se explica en la <a href="#">política de privacidad</a>.
                            </p>

                            <div className="form-checkbox">
                                <input type="checkbox" id="privacy" />
                                <label htmlFor="privacy">He leído y acepto la política de privacidad</label>
                            </div>

                            <button type="submit" className="btn-submit">Enviar</button>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Propietarios;
