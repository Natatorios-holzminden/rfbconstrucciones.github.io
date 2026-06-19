import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container">
                <h1>
                    Habitaciones en alquiler<br />en Buenos Aires
                </h1>
                <p>
                    Solicita la habitación privada que más te encaje por fechas y barrio, y <br className="desktop-br" />
                    <span>prepárate para tu nueva vida en alguno de los mejores departamentos de
                        temporada o Coliving en Buenos Aires con servicios incluidos.</span>
                </p>
            </div>
        </section>
    );
};

export default Hero;
