import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { listings, apartments } from '../data';
import ListingCard from '../components/ListingCard';
import {
    Wifi,
    Zap,
    Coffee,
    Utensils,
    Wrench,
    Clock,
    Calendar,
    Tag,
    Lock,
    Briefcase,
    Bed,
    Sofa,
    MapPin,
    ArrowRight,
    Box,
    Maximize2,
    Users,
    Droplet,
    Sun,
    Thermometer,
    DoorOpen,
    Sparkles,
    ChefHat,
    WashingMachine,
    Headphones,
    Armchair
} from 'lucide-react';
import './PropertyDetails.css';
import InteractiveGallery from '../components/InteractiveGallery';
import ownersMeeting from '../assets/owners_meeting.png';
import BookingFormSection from '../components/BookingFormSection';

// Map string icon names to Lucide components
const iconMap = {
    // Iconos originales
    wifi: Wifi,
    bolt: Zap,
    kitchen: Utensils,
    tools: Wrench,
    support: Clock,
    event: Calendar,
    discount: Tag,
    lock: Lock,
    laundry: Droplet,
    bed: Bed,
    furniture: Sofa,
    broom: Briefcase,
    balcony: DoorOpen,
    heater: Thermometer,
    sun: Sun,
    // Nuevos iconos de Haaus
    Wifi: Wifi,
    Sparkles: Sparkles,
    ChefHat: ChefHat,
    WashingMachine: WashingMachine,
    Wrench: Wrench,
    Headphones: Headphones,
    Calendar: Calendar,
    Tag: Tag,
    Lock: Lock,
    Bed: Bed,
    Armchair: Armchair,
    Zap: Zap
};

const PropertyDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const isDepartment = location.pathname.startsWith('/departamentos');

    const [property, setProperty] = useState(null);

    useEffect(() => {
        let found = null;

        if (isDepartment) {
            // Lógica para Departamentos
            const savedApartments = localStorage.getItem('codaApartments_v2');
            let allApartments = apartments;

            if (savedApartments) {
                try {
                    const parsed = JSON.parse(savedApartments);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        allApartments = parsed;
                    }
                } catch (e) {
                    console.error('Error parsing apartments:', e);
                }
            }

            found = allApartments.find(p => p.id === id);
        } else {
            // Lógica original para Habitaciones
            const savedRooms = localStorage.getItem('codaRooms_v2');
            let allRooms = listings;

            if (savedRooms) {
                try {
                    const parsed = JSON.parse(savedRooms);
                    if (Array.isArray(parsed)) {
                        allRooms = parsed;
                    }
                } catch (e) {
                    console.error('Error parsing rooms:', e);
                }
            }

            found = allRooms.find(p =>
                p.id === id ||
                p.id === parseInt(id) ||
                p.id === `room-${id}` ||
                p.id.toString() === id
            );
        }

        setProperty(found);
    }, [id, isDepartment]);

    if (!property) return <div className="loading">Cargando...</div>;

    // Use property images or fallbacks if array not fully present
    const galleryImages = (property.images && property.images.length > 0)
        ? property.images
        : [property.image]; // Fallback to cover image if array empty

    // Amenities por defecto para fallbacks (si localStorage tiene datos viejos)
    const fallbackAmenities = [
        { icon: 'Sparkles', label: 'Limpieza semanal', description: 'Servicio de limpieza profesional cada semana', enabled: true },
        { icon: 'ChefHat', label: 'Cocina equipada', description: 'Cocina completa con todos los electrodomésticos', enabled: true },
        { icon: 'Zap', label: 'Suministros incluidos', description: 'Agua, luz, gas y calefacción incluidos en el precio', enabled: true },
        { icon: 'Wifi', label: 'WiFi ultrarrápido', description: 'Conexión de fibra óptica de alta velocidad', enabled: true },
        { icon: 'Wrench', label: 'Servicio de mantenimiento', description: 'Reparaciones y mantenimiento sin costo adicional', enabled: true },
        { icon: 'Headphones', label: 'Asistencia 24 horas', description: 'Soporte disponible las 24 horas del día', enabled: true },
        { icon: 'Calendar', label: 'Acceso a eventos', description: 'Eventos exclusivos para la comunidad', enabled: true },
        { icon: 'Tag', label: 'Descuentos exclusivos', description: 'Descuentos en comercios y servicios locales', enabled: true },
        { icon: 'Lock', label: 'In-room locks', description: 'Cerradura individual en cada habitación', enabled: true },
        { icon: 'WashingMachine', label: 'Lavandería in-house', description: 'Lavadora y secadora en el edificio', enabled: true },
        { icon: 'Bed', label: 'Single bed', description: 'Cama individual de alta calidad', enabled: true },
        { icon: 'Armchair', label: 'Totalmente amueblado', description: 'Habitación completamente equipada y decorada', enabled: true }
    ];

    // Determinar qué amenities mostrar
    const displayedAmenities = (property.amenities && property.amenities.length > 0)
        ? property.amenities
        : fallbackAmenities;


    // Determinar link de tour 3d
    const tour3dLink = property.tour3dLink || 'https://my.matterport.com/show/?m=WasCHuMsbQQ&cloudEdit=1&ss=5&sr=-.06,-1.31';

    const openTour3D = () => {
        window.open(tour3dLink, '_blank');
    };

    // --- Logic to determine which rooms to show for this apartment ---
    const hardcodedRooms = property.rooms || [];
    let dynamicRooms = [];
    try {
        const savedRooms = localStorage.getItem('codaRooms_v2');
        if (savedRooms) {
            const allRooms = JSON.parse(savedRooms);
            if (Array.isArray(allRooms)) {
                dynamicRooms = allRooms.filter(r => r.apartmentId === property.id);
            }
        } else {
            dynamicRooms = listings.filter(r => r.apartmentId === property.id);
        }
    } catch (e) {
        console.error("Error loading dynamic rooms", e);
    }

    const roomsToShow = dynamicRooms.length > 0 ? dynamicRooms : hardcodedRooms;
    // ---------------------------------------------------------------

    return (
        <div className="property-details-page">
            {/* Gallery Section */}
            <InteractiveGallery images={galleryImages} />

            <div className="content-container container flex gap-large">
                {/* Main Content - Left Column */}
                <div className="main-content">
                    <header className="property-header">
                        <h1>{property.title}</h1>
                        <span className="property-ref">Ref. {property.ref || `Listing-${property.id}`}</span>
                    </header>

                    {!isDepartment && (
                        <section className="detail-section">
                            <h2>Sobre la habitación</h2>
                            <p>{property.descriptionRoom || "Información sobre la habitación próximamente."}</p>
                        </section>
                    )}

                    <section className="detail-section">
                        <h2>Sobre el departamento</h2>
                        {property.apartmentImages && property.apartmentImages.length > 0 && (
                            <div className="apartment-gallery-wrapper" style={{ marginBottom: '20px' }}>
                                <InteractiveGallery images={property.apartmentImages} />
                            </div>
                        )}
                        <p className="whitespace-pre-line">{property.descriptionApartment || property.descriptionRoom || "Información sobre el departamento próximamente."}</p>

                    </section>

                    <section className="detail-section">
                        <h2>Sobre el barrio</h2>

                        {property.neighborhoodImages && property.neighborhoodImages.length > 0 && (
                            <div className="neighborhood-static-grid" style={{
                                display: 'flex',
                                gap: '16px',
                                marginBottom: '24px',
                                marginTop: '16px',
                                flexWrap: 'wrap'
                            }}>
                                {property.neighborhoodImages.slice(0, 5).map((img, index) => (
                                    <div key={index} style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                        flexShrink: 0
                                    }}>
                                        <img
                                            src={img}
                                            alt={`Barrio ${index + 1}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'block'
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <h3>{property.location}</h3>
                        <p className="whitespace-pre-line">{property.descriptionNeighborhood || "Información sobre el barrio próximamente."}</p>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="sidebar sticky">
                    <div className="booking-card">
                        <div className="price" style={{ marginBottom: '16px' }}>
                            <span className="amount">${property.price}</span>
                            <span className="unit">/mes</span>
                        </div>

                        <div className="availability" style={{ marginBottom: '24px', fontSize: '14px', color: '#666' }}>
                            <span>Disponible desde:</span>
                            <strong style={{ color: '#000' }}>{property.availableFrom || 'Inmediata'}</strong>
                        </div>

                        <div className="action-buttons">
                            <Link to="/contacto" className="btn-primary-full" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                                Solicitar Visita
                            </Link>
                            <button className="btn-outline-full" onClick={openTour3D}>
                                <Box size={18} /> Tour 3D
                            </button>
                        </div>

                        <div className="amenities-section" style={{ marginTop: '24px', borderTop: 'none', paddingTop: '10px' }}>
                            <h3 style={{ fontSize: '16px', marginBottom: '16px', textAlign: 'center' }}>Qué incluye</h3>
                            <div className="amenities-grid-layout">
                                {displayedAmenities
                                    .filter(item => item.enabled !== false)
                                    .map((item, index) => {
                                        const Icon = iconMap[item.icon] || Sparkles;
                                        return (
                                            <div key={index} className="amenity-grid-item">
                                                <Icon strokeWidth={1.5} />
                                                <span>{item.label}</span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        {property.specs && (
                            <div className="specs-row flex justify-between" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #eee' }}>
                                <div className="spec-item" style={{ textAlign: 'center' }}>
                                    <span className="spec-label" style={{ display: 'block', fontSize: '12px', color: '#888' }}>Tamaño</span>
                                    <span className="spec-value" style={{ fontWeight: 600 }}>{property.specs.size} m²</span>
                                </div>
                                <div className="spec-item" style={{ textAlign: 'center' }}>
                                    <span className="spec-label" style={{ display: 'block', fontSize: '12px', color: '#888' }}>Hab.</span>
                                    <span className="spec-value" style={{ fontWeight: 600 }}>{property.specs.bedrooms}</span>
                                </div>
                                <div className="spec-item" style={{ textAlign: 'center' }}>
                                    <span className="spec-label" style={{ display: 'block', fontSize: '12px', color: '#888' }}>Baños</span>
                                    <span className="spec-value" style={{ fontWeight: 600 }}>{property.specs.bathrooms}</span>
                                </div>
                            </div>
                        )}

                        <div className="legal-text" style={{ marginTop: '24px' }}>
                            * Precios sujetos a cambios según temporada.<br />
                            * Estancia mínima de 3 meses.
                        </div>
                    </div>
                </div>
            </div>

            {/* FULL WIDTH ROOMS SECTION */}
            {isDepartment && roomsToShow.length > 0 && (
                <div className="container" id="rooms-section" style={{ marginTop: '60px', borderTop: '1px solid #eee', paddingTop: '40px' }}>
                    <h2 style={{ fontSize: '28px', color: '#1a1a1a', marginBottom: '32px', textAlign: 'center' }}>
                        Habitaciones disponibles en este piso
                    </h2>
                    <div className="property-rooms-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '32px'
                    }}>
                        {roomsToShow.map((room, index) => (
                            <ListingCard
                                key={index}
                                listing={{
                                    ...room,
                                    location: property.location,
                                    image: room.image || room.images?.[0] || property.image
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {isDepartment && (
                <>
                    <div className="container" style={{ marginTop: '40px', marginBottom: '80px' }}>
                        <section className="detail-section">
                            <h2>Sobre la ubicación</h2>
                            <h3>{property.address || `${property.location}, Buenos Aires, Argentina`}</h3>
                            <div className="map-container">
                                <iframe
                                    title="Property Location"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    style={{ border: 0 }}
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address || "Buenos Aires")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                    allowFullScreen
                                >
                                </iframe>
                            </div>
                        </section>
                    </div>

                    {/* Friends/Community Section */}
                    <div className="container" style={{ marginTop: '80px', marginBottom: '80px' }}>
                        <div className="friends-banner" style={{
                            position: 'relative',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            minHeight: '400px',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}>
                            <img
                                src={ownersMeeting}
                                alt="Comunidad Coda"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    zIndex: 1
                                }}
                            />
                            <div className="overlay" style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)',
                                zIndex: 2
                            }}></div>

                            <div className="content" style={{
                                position: 'relative',
                                zIndex: 3,
                                padding: '60px',
                                maxWidth: '650px',
                                color: 'white'
                            }}>
                                <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: '800', marginBottom: '24px', lineHeight: 1.1, color: 'white' }}>
                                    Amigos, también incluidos.
                                </h2>
                                <p style={{ fontSize: '18px', lineHeight: 1.6, marginBottom: '32px', opacity: 0.95, fontWeight: 400 }}>
                                    Un simple "Buenos días", apuntarte a una fiesta, ver una peli de miedo en Netflix, que te echen un cable con tu próximo proyecto, o construir relaciones para toda la vida.
                                    <br /><br />
                                    En Haaus® Coliving te ponemos muy fácil sacar el máximo provecho a la vida.
                                </p>
                                <Link
                                    to="/habitaciones"
                                    className="btn-friends-banner"
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid white',
                                        color: 'white',
                                        padding: '14px 28px',
                                        borderRadius: '100px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s ease',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Reserva ahora tu habitación <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* BookingFormSection */}
            <BookingFormSection property={property} isDepartment={isDepartment} />


        </div>
    );
};

export default PropertyDetails;
