import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import './ContactForm.css';
import CustomDatePicker from './CustomDatePicker';

const ContactForm = ({ subject }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        contexto: '',
        pais: '',
        mensaje: ''
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section className="contact-section">
            <div className="contact-intro">
                <h2>¿Todavía tienes dudas?</h2>
                <p>
                    Cuéntanos quién eres, qué te trae a Buenos Aires y qué estás buscando. <strong>Nuestro
                        equipo te acompañará para ayudarte a encontrar el coliving que mejor encaje
                        contigo.</strong>
                </p>
            </div>

            <div className="form-container">
                {submitted ? (
                    <div className="form-success">
                        <div className="form-success-icon">✓</div>
                        <p className="form-success-title">¡Gracias por escribirnos!</p>
                        <p className="form-success-text">Tu mensaje fue enviado correctamente. Te contactaremos a la brevedad.</p>
                    </div>
                ) : (
                    <form className="homy-form" onSubmit={handleSubmit}>
                        {/* Configuración de Formsubmit */}
                        <input type="hidden" name="_subject" value={subject || "Nuevo contacto desde Web Coda"} />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_template" value="table" />

                        {/* Campos ocultos para fechas */}
                        <input type="hidden" name="fecha_entrada" value={startDate ? startDate.toLocaleDateString() : ''} />
                        <input type="hidden" name="fecha_salida" value={endDate ? endDate.toLocaleDateString() : ''} />
                        <div className="form-group">
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="apellidos"
                                placeholder="Apellido/s"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <select
                                name="contexto"
                                value={formData.contexto}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Contexto de tu estancia (opcional)</option>
                                <option value="estudios">Estudios</option>
                                <option value="trabajo">Trabajo</option>
                                <option value="otros">Otros</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <CustomDatePicker
                                placeholder="Necesito la habitación desde..."
                                selectedDate={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </div>
                        <div className="form-group">
                            <CustomDatePicker
                                placeholder="Necesito la habitación hasta..."
                                selectedDate={endDate}
                                onChange={(date) => setEndDate(date)}
                            />
                        </div>

                        <div className="form-group">
                            <select
                                name="pais"
                                value={formData.pais}
                                onChange={handleChange}
                            >
                                <option value="" disabled>País de procedencia</option>
                                <option value="espana">España</option>
                                <option value="francia">Francia</option>
                                <option value="alemania">Alemania</option>
                                <option value="otros">Otros</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <textarea
                                name="mensaje"
                                placeholder="¿Cómo podemos ayudarte?"
                                rows="4"
                                value={formData.mensaje}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="text-small-legal">
                            <p>
                                Coda Coliving, S.L. es responsable del tratamiento de los datos que nos proporcionas con la finalidad de
                                ofrecerte nuestros servicios. Puedes ejercitar tus derechos de acceso, rectificación y supresión de datos, así
                                como otros derechos como se explica en la <a href="#">política de privacidad</a>.
                            </p>
                        </div>



                        <button type="submit" className="btn-submit">Enviar</button>
                    </form>
                )}
            </div>

        </section>
    );
};

export default ContactForm;
