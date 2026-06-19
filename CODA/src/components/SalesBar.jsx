import React from 'react';
import './SalesBar.css';

const SalesBar = () => {
    const text = "REBAJAS DE ENERO 🎁 1 SEMANA GRATIS reservando ahora y entrando antes del 31 de enero.";

    return (
        <div className="sales-bar">
            <div className="sales-content">
                {/* Repeat enough times to fill screen and scroll smoothly */}
                <span className="sales-text">{text}</span>
                <span className="sales-text">{text}</span>
                <span className="sales-text">{text}</span>
                <span className="sales-text">{text}</span>
                <span className="sales-text">{text}</span>
                <span className="sales-text">{text}</span>
                <span className="sales-text">{text}</span>
                <span className="sales-text">{text}</span>
            </div>
        </div>
    );
};

export default SalesBar;
