import room1 from './assets/room1.png';
import room2 from './assets/room2.png';
import sa1 from './assets/sant_andreu_1.png';
import sa2 from './assets/sant_andreu_2.png';
import sa3 from './assets/sant_andreu_3.png';
import sa4 from './assets/sant_andreu_4.png';
import roomPalermo from './assets/room_palermo.png';
import roomRecoleta from './assets/room_recoleta.png';
import roomBelgrano from './assets/room_belgrano.png';
import roomSanTelmo from './assets/room_santelmo.png';
import roomMadero from './assets/room_madero.png';
import roomCaballito from './assets/room_caballito.png';
import roomNunez from './assets/room_nunez.png';
import roomVillaCrespo from './assets/room_villacrespo.png';
import roomScandi from './assets/room_scandi.png';
import roomIndustrial from './assets/room_industrial.png';
import roomBoho from './assets/room_boho.png';
import roomDark from './assets/room_dark.png';
import ownersInterior from './assets/owners_interior_1.png';

// Apartment Images
import baRecoleta from './assets/ba_recoleta.png';
import baPalermo from './assets/ba_palermo.png';
import ownersHeroBa from './assets/owners_hero_buenos_aires.png';
import ownersBuilding from './assets/owners_building_final.png';
import ownersHero from './assets/owners_hero.png';
import ownersHeroV2 from './assets/owners_hero_v2.png';
import ownersMeeting from './assets/owners_meeting.png';
import ownersBuildingClean from './assets/owners_building_clean_v3.png';
import baNunez from './assets/ba_nunez_river.png';
import baCaballito from './assets/ba_caballito_center.png';
import baColegiales from './assets/ba_colegiales_house.png';

// Default amenities
const defaultAmenities = [
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

export const apartments = [
    {
        id: 'torre-palermo',
        ref: 'DEP-001',
        title: 'Torre Palermo View',
        location: 'Palermo Hollywood',
        price: 590,
        image: ownersBuilding,
        tour3d: true,
        features: ['Piscina Infinita', 'Gimnasio', 'Seguridad 24h'],
        description: "Torre moderna con piscina, gimnasio y seguridad 24hs.",
        specs: { size: 120, bedrooms: 3, bathrooms: 2 },
        images: [ownersBuilding, sa1, sa2, sa3],
        rooms: [
            {
                id: '1a',
                ref: 'PAL-001a',
                title: "Acogedora habitación en Palermo (1a)",
                price: 740,
                unit: "€/mes",
                image: roomPalermo,
                type: "Individual",
                area: 12,
                availableFrom: "16 de enero de 2026",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            },
            {
                id: '1b',
                ref: 'PAL-001b',
                title: "Gran Habitación Palermo (1b)",
                price: 880,
                unit: "€/mes",
                image: roomBelgrano, // Using reused image
                type: "Doble",
                area: 15,
                availableFrom: "20 de marzo 2026",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            }
        ]
    },
    {
        id: 'recoleta-class',
        ref: 'DEP-002',
        title: 'Residencia Alvear',
        location: 'Recoleta',
        price: 665,
        image: baRecoleta,
        tour3d: false,
        features: ['Lounge Clásico', 'Terraza', 'Conserje'],
        description: "Edificio de estilo francés con zonas comunes elegantes.",
        specs: { size: 150, bedrooms: 4, bathrooms: 2 },
        images: [baRecoleta, ownersInterior, roomRecoleta],
        rooms: [
            {
                id: '2a',
                ref: 'REC-002a',
                title: "Habitación Clásica en Recoleta (2a)",
                price: 990,
                unit: "€/mes",
                image: roomRecoleta,
                type: "Doble",
                area: 18,
                availableFrom: "20 de enero de 2026",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            },
            {
                id: '2b',
                ref: 'REC-002b',
                title: "Suite Histórica en Recoleta (2b)",
                price: 1300,
                unit: "€/mes",
                image: roomDark,
                type: "Suite",
                area: 45,
                availableFrom: "15 de abril de 2026",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            }
        ]
    },
    {
        id: 'madero-harbour',
        ref: 'DEP-003',
        title: 'Madero Harbour',
        location: 'Puerto Madero',
        price: 850,
        image: ownersHeroV2,
        tour3d: true,
        features: ['Vistas al Río', 'Smart Building', 'Spa'],
        description: "Lujo y exclusividad frente al río.",
        specs: { size: 90, bedrooms: 2, bathrooms: 2 },
        images: [ownersHeroV2, roomMadero, sa1],
        rooms: [
            {
                id: '3a',
                ref: 'MAD-003a',
                title: "Suite Premium Puerto Madero (3a)",
                price: 1500,
                unit: "€/mes",
                image: roomMadero,
                type: "Suite",
                area: 40,
                availableFrom: "15 de febrero de 2026",
                tour3d: true,
                suppliesIncluded: false,
                amenities: defaultAmenities
            },
            {
                id: '3b',
                ref: 'MAD-003b',
                title: "Suite en Torre de Lujo (3b)",
                price: 1600,
                unit: "€/mes",
                image: sa1,
                type: "Suite",
                area: 60,
                availableFrom: "01 de mayo 2026",
                tour3d: true,
                suppliesIncluded: false,
                amenities: defaultAmenities
            }
        ]
    },
    {
        id: 'san-telmo-hub',
        ref: 'DEP-004',
        title: 'San Telmo Creative Hub',
        location: 'San Telmo',
        price: 500,
        image: ownersMeeting,
        tour3d: true,
        features: ['Coworking', 'Patio Interno', 'Cafetería'],
        description: "Ideal para nómadas digitales, con coworking integrado.",
        specs: { size: 100, bedrooms: 3, bathrooms: 2 },
        images: [ownersMeeting, roomSanTelmo, roomIndustrial],
        rooms: [
            {
                id: '4a',
                ref: 'SAN-004a',
                title: "Estudio Loft en San Telmo (4a)",
                price: 850,
                unit: "€/mes",
                image: roomSanTelmo,
                type: "Estudio",
                area: 30,
                availableFrom: "01 de febrero de 2026",
                tour3d: false,
                suppliesIncluded: true,
                amenities: defaultAmenities
            },
            {
                id: '4b',
                ref: 'SAN-004b',
                title: "Suite en Calle Tranquila (4b)",
                price: 1200,
                unit: "€/mes",
                image: roomIndustrial,
                type: "Suite",
                area: 50,
                availableFrom: "01 de abril de 2026",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            }
        ]
    },
    {
        id: 'belgrano-green',
        ref: 'DEP-005',
        title: 'Belgrano Green Spaces',
        location: 'Belgrano',
        price: 620,
        image: ownersBuildingClean,
        tour3d: true,
        features: ['Jardín Zen', 'Bicicletero', 'Parrilla'],
        description: "Rodeado de parques, perfecto para una vida tranquila.",
        specs: { size: 110, bedrooms: 3, bathrooms: 2 },
        images: [ownersBuildingClean, roomBelgrano, roomScandi],
        rooms: [
            {
                id: '5a',
                ref: 'BEL-005a',
                title: "Habitación Moderna con Vistas (5a)",
                price: 940,
                unit: "€/mes",
                image: roomBelgrano,
                type: "Doble",
                area: 16,
                availableFrom: "18 de enero de 2026",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            },
            {
                id: '5b',
                ref: 'BEL-005b',
                title: "Estudio Minimalista Belgrano (5b)",
                price: 1100,
                unit: "€/mes",
                image: roomScandi,
                type: "Estudio",
                area: 25,
                availableFrom: "Immediate",
                tour3d: false,
                suppliesIncluded: true,
                amenities: defaultAmenities
            }
        ]
    },
    {
        id: 'crespo-loft',
        ref: 'DEP-006',
        title: 'Lofts Villa Crespo',
        location: 'Villa Crespo',
        price: 550,
        image: ownersInterior,
        tour3d: true,
        features: ['Techos Altos', 'Estudio de Arte', 'Terraza'],
        description: "Diseño industrial y ambiente joven.",
        specs: { size: 85, bedrooms: 2, bathrooms: 1 },
        images: [ownersInterior, roomVillaCrespo, sa3],
        rooms: [
            {
                id: '6a',
                ref: 'CRE-006a',
                title: "Habitación Eclectica Villa Crespo (6a)",
                price: 700,
                unit: "€/mes",
                image: roomVillaCrespo,
                type: "Doble",
                area: 14,
                availableFrom: "05 de marzo de 2026",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            },
            {
                id: '6b',
                ref: 'CRE-006b',
                title: "Habitación Coliving (6b)",
                price: 850,
                unit: "€/mes",
                image: sa3,
                type: "Doble",
                area: 20,
                availableFrom: "15 de marzo 2026",
                tour3d: false,
                suppliesIncluded: true,
                amenities: defaultAmenities
            }
        ]
    },
    {
        id: 'palermo-soho',
        ref: 'DEP-007',
        title: 'Soho Vibes',
        location: 'Palermo Soho',
        price: 700,
        image: baPalermo,
        tour3d: true,
        features: ['Rooftop Bar', 'Diseño Boutique', 'Ubicación Prime'],
        description: "En el centro de la moda y el diseño.",
        specs: { size: 100, bedrooms: 3, bathrooms: 2 },
        images: [baPalermo, roomBoho, sa2],
        rooms: [
            {
                id: '7a',
                ref: 'SOH-007a',
                title: "Habitación Boho Palermo Soho (7a)",
                price: 890,
                unit: "€/mes",
                image: roomBoho,
                type: "Doble",
                area: 12,
                availableFrom: "01 de marzo de 2026",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            },
            {
                id: '7b',
                ref: 'SOH-007b',
                title: "Master Suite en Penthouse (7b)",
                price: 2000,
                unit: "€/mes",
                image: sa2,
                type: "Suite",
                area: 80,
                availableFrom: "Immediate",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            }
        ]
    },
    // Adding more apartments with empty lists or single rooms if needed to match previous listing count
    {
        id: 'recoleta-art',
        ref: 'DEP-008',
        title: 'Recoleta Art District',
        location: 'Recoleta',
        price: 720,
        image: ownersHero,
        tour3d: true,
        features: ['Galería de Arte', 'Biblioteca', 'Balcón Francés'],
        description: "Cerca de museos y centros culturales.",
        specs: { size: 90, bedrooms: 2, bathrooms: 1 },
        images: [ownersHero, sa4, ownersInterior],
        rooms: [
            {
                id: '8a',
                ref: 'ART-008a',
                title: "Estudio Boutique Recoleta (8a)",
                price: 1050,
                unit: "€/mes",
                image: sa4,
                type: "Estudio",
                area: 40,
                availableFrom: "01 de abril 2026",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            },
            {
                id: '8b',
                ref: 'ART-008b',
                title: "Habitación Universitaria (8b)",
                price: 600,
                unit: "€/mes",
                image: ownersInterior,
                type: "Individual",
                area: 15,
                availableFrom: "01 de marzo 2026",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            }
        ]
    },
    {
        id: 'nuñez-river',
        ref: 'DEP-009',
        title: 'Nuñez River View',
        location: 'Nuñez',
        price: 650,
        image: baNunez,
        tour3d: true,
        features: ['Piscina', 'SUM', 'Vistas Abiertas'],
        description: "Tranquilidad y vistas abiertas.",
        specs: { size: 95, bedrooms: 2, bathrooms: 1 },
        images: [baNunez, roomNunez],
        rooms: [
            {
                id: '9a',
                ref: 'NUN-009a',
                title: "Habitación Luminosa Nuñez (9a)",
                price: 800,
                unit: "€/mes",
                image: roomNunez,
                type: "Doble",
                area: 15,
                availableFrom: "10 de febrero de 2026",
                tour3d: false,
                suppliesIncluded: true,
                amenities: defaultAmenities
            }
        ]
    },
    {
        id: 'caballito-center',
        ref: 'DEP-010',
        title: 'Caballito Central',
        location: 'Caballito',
        price: 480,
        image: baCaballito,
        tour3d: true,
        features: ['Patio', 'Quincho', 'Lavandería'],
        description: "El verdadero corazón geográfico de la ciudad.",
        specs: { size: 80, bedrooms: 3, bathrooms: 1 },
        images: [baCaballito, roomCaballito],
        rooms: [
            {
                id: '10a',
                ref: 'CAB-010a',
                title: "Habitación Estudiante Caballito (10a)",
                price: 550,
                unit: "€/mes",
                image: roomCaballito,
                type: "Individual",
                area: 10,
                availableFrom: "Now",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            }
        ]
    },
    {
        id: 'centro-historico',
        ref: 'DEP-011',
        title: 'Edificio de Mayo',
        location: 'Microcentro',
        price: 520,
        image: ownersHeroBa,
        tour3d: false,
        features: ['Arquitectura Clásica', 'Cerca Subte', 'Seguridad'],
        description: "Vivir la historia de Buenos Aires desde adentro.",
        specs: { size: 130, bedrooms: 3, bathrooms: 2 },
        images: [ownersHeroBa, room1],
        rooms: [
            {
                id: '11a',
                ref: 'CEN-011a',
                title: "Estudio con Vista Urbana (11a)",
                price: 950,
                unit: "€/mes",
                image: room1,
                type: "Estudio",
                area: 35,
                availableFrom: "10 de marzo 2026",
                tour3d: false,
                suppliesIncluded: true,
                amenities: defaultAmenities
            }
        ]
    },
    {
        id: 'colegas-belgrano',
        ref: 'DEP-012',
        title: 'Colegiales House',
        location: 'Colegiales',
        price: 600,
        image: baColegiales,
        tour3d: true,
        features: ['Terraza Verde', 'Huerta Urbana', 'Eco-Friendly'],
        description: "Barrio residencial con onda y tranquilidad.",
        specs: { size: 100, bedrooms: 2, bathrooms: 1 },
        images: [baColegiales, room2],
        rooms: [
            {
                id: '12a',
                ref: 'COL-012a',
                title: "Habitación en Casa Antigua (12a)",
                price: 780,
                unit: "€/mes",
                image: room2,
                type: "Doble",
                area: 18,
                availableFrom: "20 de febrero 2026",
                tour3d: true,
                suppliesIncluded: true,
                amenities: defaultAmenities
            }
        ]
    }
];

// Helper to flatten listeners for backward compatibility with 'listings'
// This ensures that pages expecting a simple list of rooms still work
export const listings = apartments.flatMap(dept =>
    dept.rooms.map(room => ({
        ...room,
        location: dept.location,
        descriptionApartment: dept.description,
        apartmentImages: dept.images,
        // Ensure properties needed for ListingCard/Details are present
        // If the room doesn't have specific fields, inherit or default
    }))
);
