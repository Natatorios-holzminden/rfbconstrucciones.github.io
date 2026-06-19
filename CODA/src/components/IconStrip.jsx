import React from 'react';
import { Armchair, ChefHat, Zap, Wifi, Sparkles, Wrench, Headphones } from 'lucide-react';
import './IconStrip.css';

const IconStrip = () => {
    const features = [
        { icon: <Armchair size={32} strokeWidth={1.5} />, label: "Muebles de\ndiseño" },
        { icon: <ChefHat size={32} strokeWidth={1.5} />, label: "Cocinas\nequipadas" },
        { icon: <Zap size={32} strokeWidth={1.5} />, label: "Suministros\nincluidos" },
        { icon: <Wifi size={32} strokeWidth={1.5} />, label: "WiFi ultrarrápido" },
        { icon: <Sparkles size={32} strokeWidth={1.5} />, label: "Limpieza\nsemanal" },
        { icon: <Wrench size={32} strokeWidth={1.5} />, label: "Mantenimiento\nincluido" },
        { icon: <Headphones size={32} strokeWidth={1.5} />, label: "Asistencia 24\nhoras" },
    ];

    return (
        <section className="icon-strip">
            <div className="container">
                <h2>Todo incluido.<br />Sin complicaciones</h2>
                <p className="icon-strip-subtitle">
                    Todo lo necesario para llegar y empezar, <strong>con<br />servicios incluidos y un equipo que te acompaña<br />durante tu estancia.</strong>
                </p>

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
            </div>
        </section>
    );
};

export default IconStrip;
