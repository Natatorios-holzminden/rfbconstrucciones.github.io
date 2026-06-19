import React from 'react';
import './AnnouncementBar.css';

const AnnouncementBar = () => {
    return (
        <div className="announcement-bar">
            <div className="marquee-content">
                {/* Repeating the content multiple times to ensure continuous scroll */}
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="marquee-item">
                        <span className="tree-icon">🌲</span>
                        Plantamos un árbol por cada mes de estancia con nosotros.
                    </span>
                ))}
            </div>
        </div>
    );
};

export default AnnouncementBar;
