import React from 'react';
import { MapPin, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ListingCard.css';

const ListingCard = ({ listing }) => {
    return (
        <Link to={`/habitaciones/${listing.id}`} className="listing-card-link">
            <div className="listing-card">
                <div className="card-image-container">
                    <img src={listing.image} alt={listing.title} className="card-image" />
                    {listing.tour3d && (
                        <div
                            className="card-badge-top interactive"
                            onClick={(e) => {
                                e.preventDefault(); // Evitar entrar al detalle
                                e.stopPropagation();
                                const link = listing.tour3dLink || 'https://my.matterport.com/show/?m=WasCHuMsbQQ&cloudEdit=1&ss=5&sr=-.06,-1.31';
                                window.open(link, '_blank');
                            }}
                        >
                            Tour 3D
                        </div>
                    )}
                    <div className="card-badge-bottom">
                        <Box size={14} /> {listing.area} m²
                    </div>
                </div>

                <div className="card-content">
                    {listing.suppliesIncluded && (
                        <div className="supplies-tag">Suministros incluidos</div>
                    )}

                    <div className="card-header">
                        <h3 className="card-title">{listing.title}</h3>
                        <div className="card-price">
                            ${listing.price}
                            <span className="price-unit">/mes</span>
                        </div>
                    </div>

                    <div className="card-location">
                        <MapPin size={16} />
                        <span>{listing.location}</span>
                    </div>

                    <div className="card-footer">
                        <div>
                            <div className="availability-label">Desde</div>
                            <div className="availability-date">{listing.availableFrom}</div>
                        </div>
                        <button className="btn-book">Reservar</button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ListingCard;
