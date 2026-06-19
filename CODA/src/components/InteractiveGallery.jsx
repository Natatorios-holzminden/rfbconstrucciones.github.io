import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './InteractiveGallery.css';

// SLOTS: The container for each image that handles the entry/exit animation individually
// This creates the "Conveyor Belt" effect where images flow through the grid
const GallerySlot = ({ src, direction, className = "", alt = "", duration = 1200 }) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [prevSrc, setPrevSrc] = useState(src);
    const [animating, setAnimating] = useState(false);
    const [animKey, setAnimKey] = useState(0); // Force re-render of animation

    useEffect(() => {
        if (src !== currentSrc) {
            setPrevSrc(currentSrc);
            setCurrentSrc(src);
            setAnimating(true);
            setAnimKey(k => k + 1); // Trigger new animation cycle

            const timer = setTimeout(() => {
                setAnimating(false);
                setPrevSrc(null);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [src, currentSrc, duration]);

    return (
        <div className={`gallery-slot relative ${className}`}>
            {/* Outgoing Image */}
            {prevSrc && animating && (
                <img
                    key={`prev-${animKey}`}
                    src={prevSrc}
                    alt={alt}
                    className={`gallery-img absolute inset-0 z-0 exit-${direction}`}
                    style={{ animationDuration: `${duration}ms` }}
                />
            )}

            {/* Incoming Image */}
            <img
                key={`curr-${animKey}`} // Key change restarts animation
                src={currentSrc}
                alt={alt}
                className={`gallery-img absolute inset-0 z-10 ${animating ? `enter-${direction}` : ''}`}
                style={{ animationDuration: `${duration}ms` }}
            />
        </div>
    );
};

const InteractiveGallery = ({ images = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('next');

    if (!images || images.length === 0) return null;

    // Pad images significantly for safety
    const safeImages = images.length < 4
        ? [...images, ...images, ...images, ...images].slice(0, 16)
        : images;

    // Using a longer list ensures we don't run out of unique "next" images for the animation logic

    const nextSlide = () => {
        setDirection('next');
        setCurrentIndex((prev) => (prev + 1) % safeImages.length);
    };

    const prevSlide = () => {
        setDirection('prev');
        setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
    };

    const imgLeft = safeImages[currentIndex % safeImages.length];
    const imgMidTop = safeImages[(currentIndex + 1) % safeImages.length];
    const imgMidBot = safeImages[(currentIndex + 2) % safeImages.length];
    const imgRight = safeImages[(currentIndex + 3) % safeImages.length];

    return (
        <div className="interactive-gallery container">
            <div className="gallery-grid-slider relative">

                <button className="nav-btn prev" onClick={prevSlide} aria-label="Imagen anterior">
                    <ChevronLeft size={24} />
                </button>
                <button className="nav-btn next" onClick={nextSlide} aria-label="Siguiente imagen">
                    <ChevronRight size={24} />
                </button>

                {/* Left Column: Big Image */}
                <div className="gallery-col big-col">
                    <GallerySlot
                        src={imgLeft}
                        direction={direction}
                        alt="Vista principal izquierda"
                        className="h-full w-full"
                    />
                </div>

                {/* Middle Column: Two Stacked Images */}
                <div className="gallery-col mid-col">
                    <div className="mid-item">
                        <GallerySlot
                            src={imgMidTop}
                            direction={direction}
                            alt="Vista detalle superior"
                            className="h-full w-full"
                        />
                    </div>
                    <div className="mid-item">
                        <GallerySlot
                            src={imgMidBot}
                            direction={direction}
                            alt="Vista detalle inferior"
                            className="h-full w-full"
                        />
                    </div>
                </div>

                {/* Right Column: Big Image */}
                <div className="gallery-col big-col relative pb-0">
                    <GallerySlot
                        src={imgRight}
                        direction={direction}
                        alt="Vista principal derecha"
                        className="h-full w-full"
                    />


                </div>
            </div>
        </div>
    );
};

export default InteractiveGallery;
