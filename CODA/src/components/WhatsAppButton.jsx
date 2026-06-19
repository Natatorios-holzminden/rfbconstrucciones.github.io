import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
    const phoneNumber = "541154932199";
    const message = encodeURIComponent("quiero covivir");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chatea con nosotros en WhatsApp"
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="whatsapp-icon"
            />
        </a>
    );
};

export default WhatsAppButton;
