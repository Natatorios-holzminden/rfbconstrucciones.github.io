import React from 'react';
import { MapPin, ArrowRight, Dog } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ApartmentCard.css';

const ApartmentCard = ({ apartment }) => {
    return (

        <Link to={`/departamentos/${apartment.id}`} className="apartment-card">
            <div className="apt-image-container">
                <img src={apartment.image} alt={apartment.title} className="apt-image" />
                {apartment.tour3d && <div className="apt-badge-tour">Tour 3D</div>}
            </div>

            <div className="apt-content">
                <div className="apt-header">
                    <div className="apt-title-row">
                        <h3 className="apt-title">{apartment.title}</h3>
                        <div className="apt-price-container">
                            <span className="apt-price-label">Desde</span>
                            <span className="apt-price-value">${apartment.price}</span>
                        </div>
                    </div>
                    <div className="apt-location">
                        <MapPin size={14} className="apt-location-icon" />
                        <span>{apartment.location}</span>
                    </div>
                </div>

                <div className="apt-features">
                    {(apartment.features || []).slice(0, 3).map((feature, index) => (
                        <div key={index} className="apt-feature-tag">
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="apt-explore-btn">
                    Explorar departamento <ArrowRight size={16} />
                </div>
            </div>
        </Link>
    );

};

export default ApartmentCard;
