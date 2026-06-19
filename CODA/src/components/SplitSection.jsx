import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './SplitSection.css';

const SplitSection = ({
    subtitle,
    title,
    children,
    imageSrc,
    imageAlt,
    reverse = false,
    variant = '',
    buttonText,
    buttonLink = "#"
}) => {
    return (
        <section className={`split-section ${reverse ? 'reverse' : ''} ${variant}`}>
            <div className="split-image-container">
                <img src={imageSrc} alt={imageAlt} className="split-image" />
            </div>
            <div className="split-content-container">
                <div className="split-content">
                    {subtitle && <div className="split-subtitle">{subtitle}</div>}
                    <h2 className="split-title">{title}</h2>
                    <div className="split-text">
                        {children}
                    </div>
                    {buttonText && (
                        <Link to={buttonLink} className="btn-split">
                            {buttonText} <ArrowRight size={18} />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SplitSection;
