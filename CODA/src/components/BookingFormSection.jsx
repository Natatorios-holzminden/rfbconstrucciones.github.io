import React, { useState } from 'react';
import contactWoman from '../assets/contact_woman_phone.png';
import CustomDatePicker from './CustomDatePicker';
import '../components/ContactForm.css';

const BookingFormSection = ({ property, isDepartment = true }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        motivo: '',
        pais: '',
        detalles: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        try {
            await fetch('https://formsubmit.co/ajax/maxi.flores.mp@gmail.com', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
        } finally {
            setSubmitted(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section id="booking-form-section" className={!isDepartment ? "container" : ""} style={isDepartment ? {
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: 0,
            marginTop: '60px',
            backgroundColor: '#f9fafb'
        } : { marginTop: '60px', marginBottom: '80px' }}>
            <div style={isDepartment ? { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minHeight: '100vh', width: '100%' } : { display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                {/* Image Side */}
                {isDepartment && (
                    <div className="contact-image-side" style={{ flex: '1 1 50%', position: 'relative', minHeight: '500px' }}>
                        <img
                            src={contactWoman}
                            alt="Atención al cliente"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                left: 0
                            }}
                        />
                    </div>
                )}

                {/* Form Side */}
                <div className="contact-form-side" style={isDepartment ? {
                    flex: '1 1 50%',
                    backgroundColor: '#00C365',
                    padding: '80px 8%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                } : {
                    width: '100%',
                    maxWidth: '600px',
                    padding: '40px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{ maxWidth: '480px', width: '100%' }}>
                        <div style={{ marginBottom: '32px', textAlign: isDepartment ? 'left' : 'center' }}>
                            <h2 style={{
                                fontSize: '36px',
                                fontWeight: '800',
                                marginBottom: '16px',
                                color: isDepartment ? '#1f2937' : '#1a1a1a',
                                lineHeight: '1.1',
                                letterSpacing: '-1px',
                                fontFamily: 'inherit'
                            }}>
                                ¿Todavía tienes dudas?
                            </h2>
                            <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px', color: isDepartment ? 'white' : '#4b5563' }}>
                                Explícanos quién eres, cuál es el motivo de tu estancia en Buenos Aires y qué necesitas. Uno de nuestros especialistas se encargará de ayudarte con todo el proceso.
                            </p>
                            <p style={{ fontSize: '16px', color: isDepartment ? 'white' : '#4b5563', fontWeight: '500' }}>
                                O envíanos un WhatsApp directamente al <br />
                                <a
                                    href="https://wa.me/5491154932199"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: isDepartment ? 'white' : '#00C365', textDecoration: 'underline' }}
                                >
                                    <strong>+54 9 11 5493 2199</strong>
                                </a>.
                            </p>
                        </div>

                        {/* White Form Card - Using ContactForm styles */}
                        <div className="form-container">
                            {submitted ? (
                                <div className="form-success">
                                    <div className="form-success-icon">✓</div>
                                    <p className="form-success-title">¡Gracias por escribirnos!</p>
                                    <p className="form-success-text">Tu consulta fue enviada correctamente. Te contactaremos a la brevedad.</p>
                                </div>
                            ) : (
                            <form onSubmit={handleSubmit} className="homy-form">

                                <input type="hidden" name="_subject" value={`Nueva consulta: ${property.title}`} />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="propiedad_interes" value={property.title} />
                                <input type="hidden" name="fecha_entrada" value={startDate ? startDate.toLocaleDateString() : ''} />
                                <input type="hidden" name="fecha_salida" value={endDate ? endDate.toLocaleDateString() : ''} />

                                <div className="form-group">
                                    <input
                                        name="nombre"
                                        type="text"
                                        placeholder="Nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        name="apellidos"
                                        type="text"
                                        placeholder="Apellido/s"
                                        value={formData.apellidos || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <select
                                        name="motivo"
                                        value={formData.motivo}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Motivo de tu estancia</option>
                                        <option value="estudios">Estudios</option>
                                        <option value="trabajo">Trabajo</option>
                                        <option value="turismo">Turismo</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <CustomDatePicker
                                        placeholder="Necesito la habitación desde..."
                                        selectedDate={startDate}
                                        onChange={setStartDate}
                                    />
                                </div>

                                <div className="form-group">
                                    <CustomDatePicker
                                        placeholder="Necesito la habitación hasta..."
                                        selectedDate={endDate}
                                        onChange={setEndDate}
                                    />
                                </div>

                                <div className="form-group">
                                    <select
                                        name="pais"
                                        value={formData.pais || ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">País de procedencia</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Chile">Chile</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="España">España</option>
                                        <option value="Francia">Francia</option>
                                        <option value="Italia">Italia</option>
                                        <option value="Mexico">México</option>
                                        <option value="Perú">Perú</option>
                                        <option value="Uruguay">Uruguay</option>
                                        <option value="USA">USA</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="detalles"
                                        placeholder="¿Cómo podemos ayudarte?"
                                        value={formData.detalles}
                                        onChange={handleInputChange}
                                        rows={3}
                                    ></textarea>
                                </div>

                                <div className="text-small-legal">
                                    Haaus Coliving, S.L. es responsable del tratamiento de los datos que nos proporcionas con la finalidad de ofrecerte nuestros servicios.
                                </div>

                                <button type="submit" className="btn-submit">
                                    Enviar
                                </button>
                            </form>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingFormSection;
