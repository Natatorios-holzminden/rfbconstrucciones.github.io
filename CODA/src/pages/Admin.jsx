import React, { useState, useEffect } from 'react';
import {
    Plus, Edit2, Trash2, Image as ImageIcon, Save, X, Eye, EyeOff, LogOut,
    Wifi, Sparkles, ChefHat, WashingMachine, Wrench, Headphones,
    Calendar, Tag, Lock, Bed, Armchair, Zap, Home, Power, CheckCircle, XCircle
} from 'lucide-react';
import { listings, apartments as apartmentsData } from '../data';
import './Admin.css';

// Importar los datos de departamentos desde data.js en lugar de harcodearlos
// Nota: images imports se mantienen si son usados por variables locales, pero data.js ya trae las imágenes.
import baRecoleta from '../assets/ba_recoleta.png';
import baPalermo from '../assets/ba_palermo.png';
import ownersHeroBa from '../assets/owners_hero_buenos_aires.png';
import ownersBuilding from '../assets/owners_building_final.png';
import ownersHero from '../assets/owners_hero.png';
import ownersHeroV2 from '../assets/owners_hero_v2.png';
import ownersMeeting from '../assets/owners_meeting.png';
import ownersBuildingClean from '../assets/owners_building_clean_v3.png';
import ownersInterior from '../assets/owners_interior_1.png';
import baNunez from '../assets/ba_nunez_river.png';
import baCaballito from '../assets/ba_caballito_center.png';
import baColegiales from '../assets/ba_colegiales_house.png';

/* Helper: Resize Image to avoid localStorage quota issues */
const resizeImage = (file, maxWidth = 1024, quality = 0.7) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
};

const resizeBase64 = (base64Str, maxWidth = 1024, quality = 0.7) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            let width = img.width;
            let height = img.height;
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
    });
};

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('habitaciones'); // 'habitaciones' o 'departamentos'
    const [rooms, setRooms] = useState([]); // Habitaciones individuales
    const [apartments, setApartments] = useState([]); // Departamentos completos
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    // Contraseña simple (en producción esto debería estar en el backend)
    const ADMIN_PASSWORD = 'coda2026';

    // Datos por defecto de departamentos importados de data.js
    const defaultApartments = apartmentsData;

    const defaultAmenities = [
        { icon: 'wifi', label: 'WiFi ultrarrápido', enabled: true },
        { icon: 'broom', label: 'Limpieza semanal', enabled: true },
        { icon: 'kitchen', label: 'Cocina equipada', enabled: true },
        { icon: 'laundry', label: 'Lavandería in-house', enabled: true },
        { icon: 'tools', label: 'Servicio de mantenimiento', enabled: true },
        { icon: 'support', label: 'Asistencia 24 horas', enabled: true },
        { icon: 'event', label: 'Acceso a eventos', enabled: false },
        { icon: 'discount', label: 'Descuentos exclusivos', enabled: false },
        { icon: 'lock', label: 'In-room locks', enabled: false },
        { icon: 'bed', label: 'Single bed', enabled: false },
        { icon: 'furniture', label: 'Totalmente amueblado', enabled: false }
    ];

    useEffect(() => {
        // Cargar habitaciones desde localStorage
        const savedRooms = localStorage.getItem('codaRooms_v2');

        // Cargar datos base actualizados
        const baseRooms = listings.map(listing => ({
            id: `room-${listing.id}`,
            title: listing.title,
            location: listing.location,
            price: listing.price,
            image: listing.image,
            images: listing.images || [listing.image],
            tour3d: listing.tour3d || false,
            tour3dLink: listing.tour3dLink || '',
            features: [
                listing.type || '',
                `${listing.area}m²` || '',
                listing.suppliesIncluded ? 'Suministros incluidos' : ''
            ].filter(f => f),
            description: listing.descriptionRoom || `Habitación ${listing.type} en ${listing.location}`,
            originalId: listing.id,
            availableFrom: listing.availableFrom,
            ref: listing.ref,
            type: listing.type,
            area: listing.area,
            amenities: listing.amenities,
            isActive: listing.isActive !== undefined ? listing.isActive : true,
            neighborhoodImages: listing.neighborhoodImages || []
        }));

        if (savedRooms) {
            let parsedRooms = JSON.parse(savedRooms);

            // INTENTAR SINCRONIZAR IMÁGENES:
            // Si el item guardado tiene menos imágenes que el original actualizado, usar el original
            // Esto recupera las imágenes que consolidamos en data.js sin borrar ediciones del usuario
            parsedRooms = parsedRooms.map(savedItem => {
                const originalItem = baseRooms.find(b => b.originalId === savedItem.originalId);
                if (originalItem) {
                    // Si faltan imágenes principales, sincronizar
                    if ((!savedItem.images || savedItem.images.length === 0) && originalItem.images.length > 0) {
                        savedItem.images = originalItem.images;
                    } else if (originalItem.images.length > (savedItem.images || []).length && originalItem.images.length > 1) {
                        // Solo actualizar si hay una diferencia significativa y el original tiene galería completa
                        // Esto es cuidadoso para no sobrescribir ediciones intencionales, pero ayuda a recuperar datos
                        // En este caso, priorizamos preservar lo que el usuario tiene si ya editó, 
                        // pero si solo tiene 1 y el original tiene más (recuperación), lo actualizamos.
                        // Para simplificar y asegurar que aparezcan las fotos de barrio:
                    }

                    // IMPORTANTE: Sincronizar imágenes del Barrio si faltan
                    if (!savedItem.neighborhoodImages || savedItem.neighborhoodImages.length === 0) {
                        savedItem.neighborhoodImages = originalItem.neighborhoodImages;
                    }

                    // Sincronizar Tour 3D Link si falta
                    if (!savedItem.tour3dLink) {
                        savedItem.tour3dLink = originalItem.tour3dLink;
                    }

                    // Sincronizar estado activo
                    if (savedItem.isActive === undefined) {
                        savedItem.isActive = true;
                    }
                }
                return savedItem;
            });

            setRooms(parsedRooms);
            localStorage.setItem('codaRooms_v2', JSON.stringify(parsedRooms)); // Guardar actualización
        } else {
            localStorage.setItem('codaRooms_v2', JSON.stringify(baseRooms));
            setRooms(baseRooms);
        }

        // Cargar departamentos desde localStorage
        const savedApartments = localStorage.getItem('codaApartments_v2');
        if (savedApartments) {
            try {
                const parsed = JSON.parse(savedApartments);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setApartments(parsed);
                } else {
                    // Si está vacío, cargar defaults
                    setApartments(defaultApartments);
                    localStorage.setItem('codaApartments_v2', JSON.stringify(defaultApartments));
                }
            } catch (e) {
                console.error("Error loading apartments", e);
                setApartments(defaultApartments);
            }
        } else {
            // Usar departamentos por defecto si no hay nada guardado
            localStorage.setItem('codaApartments_v2', JSON.stringify(defaultApartments));
            setApartments(defaultApartments);
        }

        // Verificar si ya está autenticado en esta sesión
        const authStatus = sessionStorage.getItem('codaAdminAuth');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('codaAdminAuth', 'true');
            setPassword('');
        } else {
            alert('Contraseña incorrecta');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('codaAdminAuth');
    };

    const getCurrentList = () => {
        return activeTab === 'habitaciones' ? rooms : apartments;
    };

    const saveCurrentList = (updatedList) => {
        if (activeTab === 'habitaciones') {
            localStorage.setItem('codaRooms_v2', JSON.stringify(updatedList));
            setRooms(updatedList);
            // Disparar evento personalizado para notificar cambios
            window.dispatchEvent(new Event('codaRoomsUpdated_v2'));
        } else {
            localStorage.setItem('codaApartments_v2', JSON.stringify(updatedList));
            setApartments(updatedList);
            // Disparar evento personalizado para notificar cambios
            window.dispatchEvent(new Event('codaApartmentsUpdated_v2'));
        }
    };

    const handleAddNew = () => {
        setCurrentItem({
            id: '',
            title: '',
            location: '',
            price: '',
            image: '', // Imagen de portada
            images: [], // Múltiples imágenes
            neighborhoodImages: [], // Fotos del barrio (4)
            tour3d: true, // Default true
            tour3dLink: 'https://my.matterport.com/show/?m=WasCHuMsbQQ&cloudEdit=1&ss=5&sr=-.06,-1.31',
            features: ['', '', ''],
            description: '',
            descriptionRoom: '', // Sobre la habitación
            descriptionApartment: '', // Sobre el departamento
            descriptionNeighborhood: '', // Sobre el barrio
            ref: '', // Referencia
            address: '', // Dirección completa
            availableFrom: '', // Disponible desde
            area: '', // Metros cuadrados
            type: '', // Tipo de habitación/departamento
            amenities: [ // Qué incluye
                { icon: 'Sparkles', label: 'Limpieza semanal', description: 'Servicio de limpieza profesional cada semana', enabled: true },
                { icon: 'ChefHat', label: 'Cocina equipada', description: 'Cocina completa con todos los electrodomésticos', enabled: true },
                { icon: 'Zap', label: 'Suministros incluidos', description: 'Agua, luz, gas y calefacción incluidos en el precio', enabled: true },
                { icon: 'Wifi', label: 'WiFi ultrarrápido', description: 'Conexión de fibra óptica de alta velocidad', enabled: true },
                { icon: 'Wrench', label: 'Servicio de mantenimiento', description: 'Reparaciones y mantenimiento sin costo adicional', enabled: true },
                { icon: 'Headphones', label: 'Asistencia 24 horas', description: 'Soporte disponible las 24 horas del día', enabled: true },
                { icon: 'Calendar', label: 'Acceso a eventos', description: 'Eventos exclusivos para la comunidad', enabled: false },
                { icon: 'Tag', label: 'Descuentos exclusivos', description: 'Descuentos en comercios y servicios locales', enabled: false },
                { icon: 'Lock', label: 'In-room locks', description: 'Cerradura individual en cada habitación', enabled: false },
                { icon: 'WashingMachine', label: 'Lavandería in-house', description: 'Lavadora y secadora en el edificio', enabled: false },
                { icon: 'Bed', label: 'Single bed', description: 'Cama individual de alta calidad', enabled: false },
                { icon: 'Armchair', label: 'Totalmente amueblado', description: 'Habitación completamente equipada y decorada', enabled: true }
            ]
        });
        setIsEditing(true);
    };

    const handleEdit = (item) => {

        setCurrentItem({
            ...item,
            images: (item.images && item.images.length > 0) ? item.images : [item.image],
            neighborhoodImages: item.neighborhoodImages || [],
            descriptionRoom: item.descriptionRoom || '',
            descriptionApartment: item.descriptionApartment || '',
            descriptionNeighborhood: item.descriptionNeighborhood || '',
            ref: item.ref || '',
            address: item.address || '',
            availableFrom: item.availableFrom || '',
            area: item.area || '',
            type: item.type || '',
            amenities: item.amenities || defaultAmenities
        });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        const itemType = activeTab === 'habitaciones' ? 'habitación' : 'departamento';
        if (window.confirm(`¿Estás seguro de eliminar esta ${itemType}?`)) {
            const currentList = getCurrentList();
            const updated = currentList.filter(item => item.id !== id);
            saveCurrentList(updated);
        }
    };

    const handleReimport = () => {
        if (activeTab === 'habitaciones') {
            if (window.confirm('¿Estás seguro? Esto reimportará TODAS las habitaciones desde data.js y reemplazará cualquier cambio que hayas hecho.')) {
                const importedRooms = listings.map(listing => {
                    // Combinar todas las imágenes disponibles
                    const allImages = [
                        listing.image,
                        ...(listing.apartmentImages || []),
                        ...(listing.neighborhoodImages || [])
                    ].filter(img => img); // Filtrar undefined/null

                    return {
                        id: `room-${listing.id}`,
                        title: listing.title,
                        location: listing.location,
                        price: listing.price,
                        image: listing.image, // Portada
                        images: allImages, // Todas las imágenes
                        tour3d: listing.tour3d || false,
                        features: [
                            listing.type || '',
                            `${listing.area}m²` || '',
                            listing.suppliesIncluded ? 'Suministros incluidos' : ''
                        ].filter(f => f),
                        description: listing.descriptionRoom || `Habitación ${listing.type} en ${listing.location}`,
                        descriptionRoom: listing.descriptionRoom || '',
                        descriptionApartment: listing.descriptionApartment || '',
                        descriptionNeighborhood: listing.descriptionNeighborhood || '',
                        originalId: listing.id,
                        availableFrom: listing.availableFrom || '',
                        ref: listing.ref || '',
                        type: listing.type || '',
                        area: listing.area || '',
                        address: listing.address || ''
                    };
                });

                saveCurrentList(importedRooms);
                alert('✅ Habitaciones reimportadas exitosamente!');
            }
        } else {
            if (window.confirm('¿Estás seguro? Esto reimportará TODOS los departamentos por defecto y reemplazará cualquier cambio que hayas hecho.')) {

                // Forzar actualización inmediata del estado
                setApartments(defaultApartments);

                // Guardar en localStorage
                localStorage.setItem('codaApartments_v2', JSON.stringify(defaultApartments));

                // IMPORTANTE: Disparar evento para que otras pestañas se enteren
                window.dispatchEvent(new Event('codaApartmentsUpdated_v2'));

                alert('✅ Departamentos reimportados exitosamente!');
            }
        }
    };

    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ ...notification, show: false }), 3000);
    };

    const handleSave = () => {
        if (!currentItem.id || !currentItem.title || !currentItem.price) {
            showNotification('Por favor completa al menos el ID, título y precio', 'error');
            return;
        }

        const currentList = getCurrentList();
        const existingIndex = currentList.findIndex(item => item.id === currentItem.id);
        let updated;

        if (existingIndex >= 0) {
            // Editar existente
            updated = [...currentList];
            updated[existingIndex] = currentItem;
        } else {
            // Agregar nuevo
            updated = [...currentList, currentItem];
        }

        let updatedCount = 0;
        // Si es departamento, propagar cambios a sus habitaciones vinculadas
        if (activeTab === 'departamentos') {
            const updatedRooms = rooms.map(room => {
                if (room.apartmentId === currentItem.id) {
                    updatedCount++;
                    return {
                        ...room,
                        location: currentItem.location,
                        address: currentItem.address,
                        descriptionApartment: currentItem.descriptionApartment || currentItem.description,
                        descriptionNeighborhood: currentItem.descriptionNeighborhood,
                        neighborhoodImages: currentItem.neighborhoodImages
                    };
                }
                return room;
            });

            // Solo si hubo cambios reales en las rooms
            if (updatedCount > 0) {
                setRooms(updatedRooms);
                localStorage.setItem('codaRooms_v2', JSON.stringify(updatedRooms));
            }
        }

        saveCurrentList(updated);
        setIsEditing(false);
        setCurrentItem(null);

        if (activeTab === 'departamentos' && updatedCount > 0) {
            showNotification(`✅ Guardado y actualizadas ${updatedCount} habitaciones vinculadas`);
        } else {
            showNotification('✅ Cambios guardados correctamente');
        }
    };

    const handleSaveSafe = async () => {
        try {
            if (!currentItem.id || !currentItem.title || !currentItem.price) {
                showNotification('❌ Faltan datos: ID, Título o Precio', 'error');
                return;
            }

            const currentList = getCurrentList();
            const existingIndex = currentList.findIndex(item => item.id === currentItem.id);
            let updatedList;

            if (existingIndex >= 0) {
                updatedList = [...currentList];
                updatedList[existingIndex] = currentItem;
            } else {
                updatedList = [...currentList, currentItem];
            }

            let updatedRoomsCount = 0;
            // Si es departamento, propagar cambios a sus habitaciones vinculadas
            if (activeTab === 'departamentos') {
                const updatedRooms = rooms.map(room => {
                    if (room.apartmentId === currentItem.id) {
                        updatedRoomsCount++;
                        return {
                            ...room,
                            location: currentItem.location,
                            address: currentItem.address,
                            descriptionApartment: currentItem.descriptionApartment || currentItem.description,
                            descriptionNeighborhood: currentItem.descriptionNeighborhood,
                            neighborhoodImages: currentItem.neighborhoodImages
                        };
                    }
                    return room;
                });

                if (updatedRoomsCount > 0) {
                    setRooms(updatedRooms);
                    localStorage.setItem('codaRooms_v2', JSON.stringify(updatedRooms));
                }
            }

            saveCurrentList(updatedList);
            // setIsEditing(false); // Mantener abierto
            // setCurrentItem(null); // Mantener estado

            if (activeTab === 'departamentos' && updatedRoomsCount > 0) {
                showNotification(`✅ Guardado y ${updatedRoomsCount} habitacion(es) sincronizada(s)!`);
            } else {
                showNotification('✅ Guardado correctamente');
            }

            // window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err) {
            console.error(err);
            if (err.name === 'QuotaExceededError' || err.message.includes('quota')) {
                const msg = "⚠️ MEMORIA LLENA. Intentando comprimir imágenes automáticamente...";
                showNotification(msg, 'warning');

                try {
                    // 1. Compress Main Image
                    let newItem = { ...currentItem };
                    let changed = false;

                    // Compress Main Image
                    if (newItem.image && newItem.image.length > 500000) {
                        newItem.image = await resizeBase64(newItem.image, 800, 0.6);
                        changed = true;
                    }

                    // 2. Compress Gallery
                    if (newItem.images && newItem.images.length > 0) {
                        const newGallery = await Promise.all(newItem.images.map(async (img) => {
                            if (img.length > 500000) {
                                changed = true;
                                return await resizeBase64(img, 800, 0.6);
                            }
                            return img;
                        }));
                        newItem.images = newGallery;
                    }

                    // 3. Compress Neighborhood
                    if (newItem.neighborhoodImages && newItem.neighborhoodImages.length > 0) {
                        const newNb = await Promise.all(newItem.neighborhoodImages.map(async (img) => {
                            if (img.length > 300000) {
                                changed = true;
                                return await resizeBase64(img, 600, 0.6);
                            }
                            return img;
                        }));
                        newItem.neighborhoodImages = newNb;
                    }

                    if (!changed) {
                        throw new Error("No se pudo comprimir más.");
                    }

                    setCurrentItem(newItem);

                    // --- RETRY SAVE LOGIC ---
                    const retryList = getCurrentList();
                    const retryIndex = retryList.findIndex(item => item.id === newItem.id);
                    let retryUpdated;
                    if (retryIndex >= 0) {
                        retryUpdated = [...retryList];
                        retryUpdated[retryIndex] = newItem;
                    } else {
                        retryUpdated = [...retryList, newItem];
                    }
                    saveCurrentList(retryUpdated);
                    // setIsEditing(false);
                    // setCurrentItem(null);
                    showNotification("✅ Guardado Exitosamente (Imágenes comprimidas)");
                    // window.scrollTo({ top: 0, behavior: 'smooth' });
                    // ------------------------

                } catch (retryErr) {
                    alert("❌ FALLO CRÍTICO: No hay espacio suficiente. \n\nPor favor, elimina la IMAGEN PRINCIPAL (arriba del todo) y vuélvela a subir.");
                }

            } else {
                alert("Error crítico al guardar: " + err.message);
            }
        }
    };

    // ... (rest of the component)

    // JSX for notification (insert this just before the last closing tag of the component return)
    // We will place this in the render method in the next step, for now just the logic.


    const handleCancel = () => {
        setIsEditing(false);
        setCurrentItem(null);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            resizeImage(file, 800, 0.7).then(resizedImage => {
                setCurrentItem({
                    ...currentItem,
                    image: resizedImage
                });
            });
        }
    };

    const handleMultipleImagesUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const processedImages = await Promise.all(
                files.map(file => resizeImage(file, 800, 0.7))
            );

            setCurrentItem({
                ...currentItem,
                images: [...(currentItem.images || []), ...processedImages]
            });
        }
    };

    const handleSetCoverImage = (imageUrl) => {
        setCurrentItem({
            ...currentItem,
            image: imageUrl
        });
    };

    const handleRemoveImage = (index) => {
        const newImages = currentItem.images.filter((_, i) => i !== index);
        setCurrentItem({
            ...currentItem,
            images: newImages
        });
    };

    // Funciones para Imágenes del Barrio
    const handleNeighborhoodImagesUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const processedImages = await Promise.all(
                files.map(file => resizeImage(file, 600, 0.7)) // Smaller for neighborhood thumbnails
            );

            const currentImages = currentItem.neighborhoodImages || [];
            setCurrentItem({
                ...currentItem,
                neighborhoodImages: [...currentImages, ...processedImages].slice(0, 4) // Max 4
            });
        }
    };

    const handleRemoveNeighborhoodImage = (index) => {
        const newImages = (currentItem.neighborhoodImages || []).filter((_, i) => i !== index);
        setCurrentItem({
            ...currentItem,
            neighborhoodImages: newImages
        });
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...currentItem.features];
        newFeatures[index] = value;
        setCurrentItem({
            ...currentItem,
            features: newFeatures
        });
    };

    const addFeature = () => {
        setCurrentItem({
            ...currentItem,
            features: [...currentItem.features, '']
        });
    };

    const removeFeature = (index) => {
        const newFeatures = currentItem.features.filter((_, i) => i !== index);
        setCurrentItem({
            ...currentItem,
            features: newFeatures
        });
    };

    const handleAmenityToggle = (index) => {
        const newAmenities = [...currentItem.amenities];
        newAmenities[index].enabled = !newAmenities[index].enabled;
        setCurrentItem({
            ...currentItem,
            amenities: newAmenities
        });
    };

    // Funciones para vincular/desvincular habitaciones desde la vista de Departamento
    const handleLinkRoom = (roomId) => {
        if (!currentItem.id) {
            alert("El departamento debe tener un ID para vincular habitaciones.");
            return;
        }
        const updatedRooms = rooms.map(r => {
            if (r.id === roomId) {
                return { ...r, apartmentId: currentItem.id };
            }
            return r;
        });
        setRooms(updatedRooms);
        localStorage.setItem('codaRooms_v2', JSON.stringify(updatedRooms));
    };

    const handleUnlinkRoom = (roomId) => {
        const updatedRooms = rooms.map(r => {
            if (r.id === roomId) {
                return { ...r, apartmentId: undefined };
            }
            return r;
        });
        setRooms(updatedRooms);
        localStorage.setItem('codaRooms_v2', JSON.stringify(updatedRooms));
    };

    const handleCreateLinkedRoom = () => {
        if (!currentItem.id) {
            alert("Primero debes establecer un ID para el departamento y guardarlo, o al menos definirlo.");
            return;
        }

        const roomNumber = rooms.filter(r => r.apartmentId === currentItem.id).length + 1;
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const suffix = alphabet[roomNumber - 1] || roomNumber;

        const newRoom = {
            id: `${currentItem.id}-room-${suffix}`,
            title: `Habitación ${roomNumber} en ${currentItem.title}`,
            apartmentId: currentItem.id,

            // Heredar datos del padre
            location: currentItem.location,
            address: currentItem.address,
            descriptionApartment: currentItem.description,
            descriptionNeighborhood: currentItem.descriptionNeighborhood,
            neighborhoodImages: currentItem.neighborhoodImages || [],
            image: currentItem.image, // Usa la foto del depto por defecto hasta que la cambien

            // Datos por defecto
            price: 500,
            type: 'Individual',
            amenities: defaultAmenities,
            matches: [],
            features: ['Smart TV', 'Escritorio'],
            isActive: true
        };

        const updatedRooms = [...rooms, newRoom];
        setRooms(updatedRooms);
        localStorage.setItem('codaRooms_v2', JSON.stringify(updatedRooms));

        // Notificar al usuario
        if (confirm(`✅ Habitación creada: "${newRoom.title}". \n¿Quieres ir a editarla ahora?`)) {
            setActiveTab('habitaciones');
            handleEdit(newRoom);
        }
    };

    // Pantalla de login
    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <div className="login-card">
                    <h1>🔐 Panel de Administración</h1>
                    <p>Ingresa la contraseña para continuar</p>
                    <form onSubmit={handleLogin}>
                        <div className="password-input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className="admin-input"
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <button type="submit" className="btn-login">
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Panel de edición
    if (isEditing) {
        const itemType = activeTab === 'habitaciones' ? 'Habitación' : 'Departamento';
        return (
            <div className="admin-page">
                <div className="admin-header">
                    <h1>✏️ {currentItem.id ? 'Editar' : 'Nuevo'} {itemType}</h1>
                </div>

                <div className="edit-container">
                    <div className="edit-form">
                        <div className="form-section">
                            <h3>📸 Imagen Principal</h3>
                            <div className="image-upload-area">
                                {currentItem.image ? (
                                    <div className="image-preview">
                                        <img src={currentItem.image} alt="Preview" />
                                        <button
                                            className="btn-remove-image"
                                            onClick={() => setCurrentItem({ ...currentItem, image: '' })}
                                        >
                                            <X size={16} /> Eliminar
                                        </button>
                                    </div>
                                ) : (
                                    <label className="upload-label">
                                        <ImageIcon size={48} />
                                        <span>Click para subir imagen</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>📝 Información Básica</h3>
                            <div className="form-group">
                                <label>ID único (sin espacios)</label>
                                <input
                                    type="text"
                                    value={currentItem.id}
                                    onChange={(e) => setCurrentItem({ ...currentItem, id: e.target.value.toLowerCase().replace(/\s/g, '-') })}
                                    placeholder="ej: palermo-soho-1"
                                    className="admin-input"
                                />
                            </div>

                            {activeTab === 'habitaciones' && (
                                <div className="form-group" style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                                    <label style={{ color: '#166534', fontWeight: '700' }}>🏙️ Vincular a Departamento (Edificio)</label>
                                    <p style={{ fontSize: '12px', color: '#166534', marginBottom: '8px' }}>
                                        Selecciona el departamento al que pertenece esta habitación para heredar ubicación y fotos.
                                    </p>
                                    <select
                                        className="admin-input"
                                        value={currentItem.apartmentId || ''}
                                        onChange={(e) => {
                                            const aptId = e.target.value;
                                            const parentApt = apartments.find(a => a.id === aptId);

                                            // Auto-fill data from parent if selected
                                            if (parentApt) {
                                                setCurrentItem({
                                                    ...currentItem,
                                                    apartmentId: aptId,
                                                    location: parentApt.location,
                                                    address: parentApt.address,
                                                    descriptionApartment: parentApt.description,
                                                    neighborhoodImages: parentApt.neighborhoodImages || [],
                                                    // Optional: inherit other fields
                                                });
                                                alert(`✅ Datos de ubicación heredados de: ${parentApt.title}`);
                                            } else {
                                                setCurrentItem({ ...currentItem, apartmentId: '' });
                                            }
                                        }}
                                    >
                                        <option value="">-- Seleccionar Departamento Padre --</option>
                                        {apartments.map(apt => (
                                            <option key={apt.id} value={apt.id}>{apt.title} ({apt.location})</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="form-group">
                                <label>Título</label>
                                <input
                                    type="text"
                                    value={currentItem.title}
                                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                                    placeholder="ej: Loft Moderno en Palermo"
                                    className="admin-input"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Ubicación</label>
                                    <input
                                        type="text"
                                        value={currentItem.location}
                                        onChange={(e) => setCurrentItem({ ...currentItem, location: e.target.value })}
                                        placeholder="ej: Palermo Soho"
                                        className="admin-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Precio (USD/mes)</label>
                                    <input
                                        type="number"
                                        value={currentItem.price}
                                        onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
                                        placeholder="590"
                                        className="admin-input"
                                    />
                                </div>
                            </div>

                            {activeTab !== 'departamentos' && (
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea
                                        value={currentItem.description}
                                        onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                                        placeholder="Describe la propiedad..."
                                        className="admin-textarea"
                                        rows="4"
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={currentItem.tour3d}
                                        onChange={(e) => setCurrentItem({ ...currentItem, tour3d: e.target.checked })}
                                    />
                                    <span>Tiene Tour 3D</span>
                                </label>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Referencia</label>
                                    <input
                                        type="text"
                                        value={currentItem.ref || ''}
                                        onChange={(e) => setCurrentItem({ ...currentItem, ref: e.target.value })}
                                        placeholder="ej: PH_001"
                                        className="admin-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Disponible desde</label>
                                    <input
                                        type="text"
                                        value={currentItem.availableFrom || ''}
                                        onChange={(e) => setCurrentItem({ ...currentItem, availableFrom: e.target.value })}
                                        placeholder="ej: 16 de enero"
                                        className="admin-input"
                                    />
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Link Tour 3D (Matterport)</label>
                                    <input
                                        type="text"
                                        value={currentItem.tour3dLink || ''}
                                        onChange={(e) => setCurrentItem({ ...currentItem, tour3dLink: e.target.value })}
                                        placeholder="Pegar link de Matterport aquí"
                                        className="admin-input"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Área (m²)</label>
                                    <input
                                        type="number"
                                        value={currentItem.area || ''}
                                        onChange={(e) => setCurrentItem({ ...currentItem, area: e.target.value })}
                                        placeholder="ej: 12"
                                        className="admin-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Tipo</label>
                                    <input
                                        type="text"
                                        value={currentItem.type || ''}
                                        onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
                                        placeholder="ej: Individual, Doble, Suite"
                                        className="admin-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Dirección completa</label>
                                <input
                                    type="text"
                                    value={currentItem.address || ''}
                                    onChange={(e) => setCurrentItem({ ...currentItem, address: e.target.value })}
                                    placeholder="ej: Av. Santa Fe 1234, Palermo, Buenos Aires"
                                    className="admin-input"
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>🖼️ Galería de Imágenes</h3>
                            <div className="form-group">
                                <label>Subir múltiples imágenes</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleMultipleImagesUpload}
                                    className="admin-input"
                                />
                                <small style={{ color: '#666', marginTop: '8px', display: 'block' }}>
                                    Puedes seleccionar múltiples imágenes a la vez
                                </small>
                            </div>

                            {currentItem.images && currentItem.images.length > 0 && (
                                <div className="images-gallery">
                                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: 600 }}>
                                        Imágenes cargadas ({currentItem.images.length})
                                    </label>
                                    <div className="images-grid">
                                        {currentItem.images.map((img, index) => (
                                            <div key={index} className="image-item">
                                                <img src={img} alt={`Imagen ${index + 1}`} />
                                                <div className="image-actions">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSetCoverImage(img)}
                                                        className={`btn-set-cover ${currentItem.image === img ? 'active' : ''}`}
                                                        title="Establecer como portada"
                                                    >
                                                        {currentItem.image === img ? '⭐ Portada' : '☆ Portada'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="btn-remove-img"
                                                        title="Eliminar imagen"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="form-section">
                            <h3>📄 Descripciones Detalladas</h3>

                            {activeTab !== 'departamentos' && (
                                <div className="form-group">
                                    <label>Sobre la habitación</label>
                                    <textarea
                                        value={currentItem.descriptionRoom || ''}
                                        onChange={(e) => setCurrentItem({ ...currentItem, descriptionRoom: e.target.value })}
                                        placeholder="Describe la habitación en detalle..."
                                        className="admin-textarea"
                                        rows="4"
                                    />
                                </div>
                            )}


                            <div className="form-group">
                                <label>Sobre el departamento</label>
                                <textarea
                                    value={currentItem.descriptionApartment || ''}
                                    onChange={(e) => setCurrentItem({ ...currentItem, descriptionApartment: e.target.value })}
                                    placeholder="Describe el departamento/edificio... (Si se deja vacío usará la descripción general)"
                                    className="admin-textarea"
                                    rows="4"
                                />
                            </div>


                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Fotos del Barrio (4 miniaturas)
                                    <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>(Recomendado: 4 fotos cuadradas)</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleNeighborhoodImagesUpload}
                                    className="admin-input"
                                    style={{ marginBottom: '12px' }}
                                />

                                {currentItem.neighborhoodImages && currentItem.neighborhoodImages.length > 0 && (
                                    <div className="images-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                                        {currentItem.neighborhoodImages.map((img, index) => (
                                            <div key={index} className="image-item" style={{ height: '100px' }}>
                                                <img src={img} alt={`Barrio ${index + 1}`} style={{ height: '100px' }} />
                                                <div className="image-actions" style={{ justifyContent: 'flex-end' }}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveNeighborhoodImage(index)}
                                                        className="btn-remove-img"
                                                        title="Eliminar imagen"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Sobre el barrio</label>
                                <textarea
                                    value={currentItem.descriptionNeighborhood || ''}
                                    onChange={(e) => setCurrentItem({ ...currentItem, descriptionNeighborhood: e.target.value })}
                                    placeholder="Describe el barrio y sus alrededores..."
                                    className="admin-textarea"
                                    rows="4"
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>✨ Características</h3>
                            {currentItem.features.map((feature, index) => (
                                <div key={index} className="feature-input-group">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        placeholder={`Característica ${index + 1}`}
                                        className="admin-input"
                                    />
                                    {currentItem.features.length > 1 && (
                                        <button
                                            onClick={() => removeFeature(index)}
                                            className="btn-remove-feature"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button onClick={addFeature} className="btn-add-feature">
                                <Plus size={16} /> Agregar característica
                            </button>
                        </div>

                        {activeTab === 'departamentos' && (
                            <div className="form-section">
                                <h3>🛏️ Habitaciones Vinculadas</h3>
                                <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                                    Gestiona las habitaciones que pertenecen a este departamento.
                                </p>

                                {/* Lista de habitaciones vinculadas */}
                                {rooms.filter(r => r.apartmentId === currentItem.id).length > 0 && (
                                    <div className="linked-rooms-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                                        {rooms.filter(r => r.apartmentId === currentItem.id).map((room, idx) => (
                                            <div key={idx} style={{
                                                padding: '12px',
                                                background: '#f0fdf4',
                                                borderRadius: '8px',
                                                border: '1px solid #bbf7d0',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <img src={room.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                                                    <div>
                                                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{room.title}</div>
                                                        <div style={{ fontSize: '12px', color: '#64748b' }}>ID: {room.id}</div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleUnlinkRoom(room.id)}
                                                    style={{
                                                        background: '#fee2e2', color: '#991b1b', border: 'none',
                                                        padding: '6px 10px', borderRadius: '4px', cursor: 'pointer',
                                                        fontSize: '12px', fontWeight: 'bold'
                                                    }}
                                                >
                                                    Desvincular
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Botón para CREAR NUEVA vinculada y Selector para vincular existentes */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <button
                                        className="btn-add"
                                        onClick={handleCreateLinkedRoom}
                                        style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '15px' }}
                                    >
                                        <Plus size={18} /> Crear Nueva Habitación Aquí
                                    </button>

                                    <div className="link-new-room" style={{
                                        padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1'
                                    }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>O vincular una existente:</label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <select
                                                id="room-selector"
                                                className="admin-input"
                                                style={{ flex: 1 }}
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        handleLinkRoom(e.target.value);
                                                        e.target.value = ""; // Reset selector
                                                    }
                                                }}
                                            >
                                                <option value="">-- Seleccionar habitación --</option>
                                                {rooms
                                                    .filter(r => r.apartmentId !== currentItem.id) // Mostrar solo las no vinculadas a este
                                                    .map(r => (
                                                        <option key={r.id} value={r.id}>
                                                            {r.title} ({r.apartmentId ? `Vinculada a: ${r.apartmentId}` : 'Sin vincular'})
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <small style={{ color: '#64748b', marginTop: '4px', display: 'block' }}>
                                            Al seleccionar una habitación, se vinculará automáticamente a este departamento.
                                        </small>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="form-section">
                            <h3>✨ Qué incluye (Amenities)</h3>
                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                                Selecciona qué amenidades están disponibles en esta propiedad
                            </p>
                            <div className="amenities-grid">
                                {currentItem.amenities && currentItem.amenities.map((amenity, index) => {
                                    // Mapeo de iconos
                                    const IconComponent = {
                                        'Wifi': Wifi,
                                        'Sparkles': Sparkles,
                                        'ChefHat': ChefHat,
                                        'WashingMachine': WashingMachine,
                                        'Wrench': Wrench,
                                        'Headphones': Headphones,
                                        'Calendar': Calendar,
                                        'Tag': Tag,
                                        'Lock': Lock,
                                        'Bed': Bed,
                                        'Armchair': Armchair,
                                        'Zap': Zap,
                                        'Home': Home
                                    }[amenity.icon] || Home;

                                    return (
                                        <div
                                            key={index}
                                            className={`amenity-card ${amenity.enabled ? 'enabled' : ''}`}
                                            onClick={() => handleAmenityToggle(index)}
                                        >
                                            <div className="amenity-header">
                                                <IconComponent size={24} className="amenity-icon" />
                                                <input
                                                    type="checkbox"
                                                    checked={amenity.enabled}
                                                    onChange={() => handleAmenityToggle(index)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            </div>
                                            <div className="amenity-content">
                                                <h4>{amenity.label}</h4>
                                                <p>{amenity.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="preview-panel">
                        <h3>👁️ Vista Previa</h3>
                        <div className="apartment-card-preview">
                            <div className="apt-image-container">
                                {currentItem.image ? (
                                    <img src={currentItem.image} alt={currentItem.title} className="apt-image" />
                                ) : (
                                    <div className="no-image">Sin imagen</div>
                                )}
                                {currentItem.tour3d && <div className="apt-badge-tour">Tour 3D</div>}
                            </div>
                            <div className="apt-content">
                                <div className="apt-header">
                                    <div className="apt-title-row">
                                        <h3 className="apt-title">{currentItem.title || 'Título'}</h3>
                                        <div className="apt-price-container">
                                            <span className="apt-price-label">Desde</span>
                                            <span className="apt-price-value">${currentItem.price || '0'}</span>
                                        </div>
                                    </div>
                                    <div className="apt-location">
                                        <span>📍 {currentItem.location || 'Ubicación'}</span>
                                    </div>
                                </div>
                                <div className="apt-features">
                                    {currentItem.features.filter(f => f).slice(0, 3).map((feature, index) => (
                                        <div key={index} className="apt-feature-tag">
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="preview-actions" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button onClick={handleSaveSafe} className="btn-save" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '16px' }}>
                                <Save size={20} /> Guardar Cambios
                            </button>
                            <button onClick={handleCancel} className="btn-cancel" style={{ width: '100%', justifyContent: 'center' }}>
                                <X size={20} /> Cancelar
                            </button>
                            {/* Feedback Inline */}
                            {notification.show && (
                                <div style={{
                                    textAlign: 'center',
                                    color: notification.type === 'error' || notification.type === 'warning' ? '#e53e3e' : '#047857',
                                    marginTop: '8px',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    padding: '8px',
                                    background: notification.type === 'error' ? '#fff5f5' : '#f0fdf4',
                                    borderRadius: '6px'
                                }}>
                                    {notification.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Toast Notification */}
                {
                    notification.show && (
                        <div className={`notification-toast ${notification.type}`}>
                            {notification.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                            <span>{notification.message}</span>
                        </div>
                    )
                }
            </div >
        );
    }

    // Lista principal con tabs
    const currentList = getCurrentList();
    const itemType = activeTab === 'habitaciones' ? 'habitaciones' : 'departamentos';

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <h1>🏠 Panel de Administración</h1>
                    <p>{currentList.length} {itemType} publicadas</p>
                </div>
                <div className="header-actions">
                    <button onClick={handleLogout} className="btn-logout">
                        <LogOut size={20} /> Cerrar Sesión
                    </button>
                    <button onClick={handleReimport} className="btn-reimport" title={`Reimportar todos los ${itemType}`}>
                        🔄 Reimportar {activeTab === 'habitaciones' ? 'Habitaciones' : 'Departamentos'}
                    </button>
                    <button onClick={handleAddNew} className="btn-add">
                        <Plus size={20} /> Nuevo {activeTab === 'habitaciones' ? 'Habitación' : 'Departamento'}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
                <button
                    className={`tab-button ${activeTab === 'habitaciones' ? 'active' : ''}`}
                    onClick={() => setActiveTab('habitaciones')}
                >
                    🛏️ Habitaciones ({rooms.length})
                </button>
                <button
                    className={`tab-button ${activeTab === 'departamentos' ? 'active' : ''}`}
                    onClick={() => setActiveTab('departamentos')}
                >
                    🏢 Departamentos ({apartments.length})
                </button>
            </div>

            <div className="apartments-grid">
                {currentList.length === 0 ? (
                    <div className="empty-state">
                        <ImageIcon size={64} />
                        <h3>No hay {itemType} todavía</h3>
                        <p>Comienza agregando tu primer {activeTab === 'habitaciones' ? 'habitación' : 'departamento'}</p>
                        <button onClick={handleAddNew} className="btn-add">
                            <Plus size={20} /> Agregar Primero
                        </button>
                    </div>
                ) : (
                    currentList.map((item, index) => (
                        <div
                            key={item.id || index}
                            className={`admin-apartment-card ${item.isActive === false ? 'is-disabled' : ''}`}
                            onClick={() => handleEdit(item)}
                            style={{ cursor: 'pointer', position: 'relative' }}
                            title="Click para editar detalles"
                        >
                            <div className="admin-card-image">
                                <img src={item.image} alt={item.title} />
                                {item.tour3d && <div className="badge-3d">Tour 3D</div>}
                                {item.isActive === false && (
                                    <div style={{
                                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 'bold', letterSpacing: '1px'
                                    }}>OFF</div>
                                )}
                            </div>
                            <div className="admin-card-content">
                                <h3>{item.title}</h3>
                                <p className="location">📍 {item.location}</p>
                                <p className="price">${item.price}/mes</p>
                                <div className="admin-card-actions">
                                    <button
                                        className={`btn-action ${item.isActive !== false ? 'btn-status-on' : 'btn-status-off'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const updatedList = [...currentList];
                                            updatedList[index] = {
                                                ...updatedList[index],
                                                isActive: !(updatedList[index].isActive !== false)
                                            };
                                            saveCurrentList(updatedList);
                                        }}
                                        style={{
                                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                            background: item.isActive !== false ? '#e6fffa' : '#fff5f5',
                                            color: item.isActive !== false ? '#00d084' : '#e53e3e',
                                            border: `1px solid ${item.isActive !== false ? '#00d084' : '#e53e3e'}`,
                                            borderRadius: '6px', padding: '8px', fontWeight: 'bold', cursor: 'pointer'
                                        }}
                                    >
                                        {item.isActive !== false ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                        {item.isActive !== false ? 'ON' : 'OFF'}
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(item.id);
                                        }}
                                    >
                                        <Trash2 size={16} /> Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Toast Notification */}
            {notification.show && (
                <div className={`notification-toast ${notification.type}`}>
                    {notification.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    <span>{notification.message}</span>
                </div>
            )}
        </div>
    );
};

export default Admin;
