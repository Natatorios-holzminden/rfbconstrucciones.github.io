
import React from 'react';
import './Comunidad.css';

const Comunidad = () => {
    return (
        <div className="comunidad-page">
            <div className="comunidad-hero">
                <h1 className="hero-title">Una Comunidad con potencial.</h1>
                <p className="hero-description">
                    Nuestros colivers vienen de más de 40 países, formando una <strong>comunidad internacional diversa</strong>, con perfiles activos, inquietos y con recorrido personal y profesional.
                </p>
            </div>
            
            <div className="comunidad-container">
                <div className="close-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </div>

                <h1 className="comunidad-title">Iniciar sesión</h1>
                <p className="comunidad-subtitle">
                    ¿Eres nuevo en este sitio? <a href="#" className="register-link">Regístrate</a>
                </p>

                <form className="comunidad-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="form-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" className="form-input" />
                    </div>

                    <div className="forgot-password">
                        <a href="#">¿Olvidaste la contraseña?</a>
                    </div>

                    <button type="button" className="submit-btn">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Comunidad;
