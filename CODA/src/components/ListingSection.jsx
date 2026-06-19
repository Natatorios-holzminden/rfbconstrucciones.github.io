import React, { useState, useMemo, useEffect } from 'react';
import ListingCard from './ListingCard';
import { listings } from '../data';
import './ListingSection.css';

const ListingSection = ({ limit = null, showFilters = true }) => {
    const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [rooms, setRooms] = useState(listings); // Inicializar con listings por defecto

    // Cargar habitaciones desde localStorage si existen
    useEffect(() => {
        const savedRooms = localStorage.getItem('codaRooms_v2');
        if (savedRooms) {
            try {
                const parsedRooms = JSON.parse(savedRooms);
                setRooms(parsedRooms);
            } catch (e) {
                console.error('Error parsing rooms from localStorage:', e);
                setRooms(listings);
            }
        }

        // Escuchar cambios en localStorage (cuando editas desde el admin)
        const handleStorageChange = () => {
            const savedRooms = localStorage.getItem('codaRooms_v2');
            if (savedRooms) {
                try {
                    setRooms(JSON.parse(savedRooms));
                } catch (e) {
                    console.error('Error parsing rooms:', e);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // También escuchar cambios personalizados (mismo tab)
        window.addEventListener('codaRoomsUpdated_v2', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('codaRoomsUpdated_v2', handleStorageChange);
        };
    }, []);

    const neighborhoods = [
        "Palermo", "Recoleta", "Belgrano", "San Telmo", "Villa Crespo", "Puerto Madero"
    ];

    const types = [
        "Doble", "Estudio", "Individual", "Suite", "Twin"
    ];

    const filteredListings = useMemo(() => {
        const filtered = rooms.filter(item => {
            const matchNeighborhood = selectedNeighborhood ? item.location === selectedNeighborhood : true;
            const matchType = selectedType ? item.type === selectedType : true;
            return matchNeighborhood && matchType;
        });

        return limit ? filtered.slice(0, limit) : filtered;
    }, [selectedNeighborhood, selectedType, rooms, limit]);

    const toggleNeighborhood = (n) => {
        setSelectedNeighborhood(prev => prev === n ? null : n);
    };

    const toggleType = (t) => {
        setSelectedType(prev => prev === t ? null : t);
    };

    return (
        <section className="listing-section">
            <div className="container">

                {showFilters && (
                    <div className="filters-container">
                        <div className="filter-row">
                            <div className="filter-group-title">Filtrar por Barrio</div>
                            <div className="filter-pills">
                                {neighborhoods.map(n => (
                                    <button
                                        key={n}
                                        className={`filter-pill ${selectedNeighborhood === n ? 'active' : ''}`}
                                        onClick={() => toggleNeighborhood(n)}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>


                    </div>
                )}

                <div className="listings-grid">
                    {filteredListings.length > 0 ? (
                        filteredListings.map(listing => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#666' }}>
                            No se encontraron resultados con estos filtros.
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default ListingSection;
