import React from 'react';
import { Link } from 'react-router-dom';
import './HomeHero.css';

const HomeHero = () => {
    return (
        <section className="home-hero">
            <div className="home-hero-content">
                <h1>
                    Coliving en Buenos Aires<br />
                    con todo incluido.<br />
                    <span className="script-text">Hasta los amigos.</span>
                </h1>
                <p>
                    Si vas a quedarte una temporada en Buenos Aires, en Coda® lo tienes
                    todo pensado para sentirte cómodo desde el primer día.
                </p>
                <div className="hero-buttons">
                    <Link to="/departamentos" className="btn-outline">Ver departamentos</Link>
                    <Link to="/habitaciones" className="btn-green">Ver habitaciones</Link>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
