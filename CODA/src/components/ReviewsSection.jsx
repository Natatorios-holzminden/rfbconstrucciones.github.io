
import React from 'react';
import './ReviewsSection.css';
import { Star } from 'lucide-react';

const reviews = [
    {
        name: "Lou Sallé",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        text: "Great Experience with Coda Coliving! Everything is thought and done to make our life easier! The two managers are always ready to help...",
    },
    {
        name: "José C. Moreno",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        text: "Super convenient, awesome location, and great environment in the flat! Also all the Coda folks made the experience a positive one...",
    },
    {
        name: "Isaac Murray",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        text: "I stayed with Coda for a year and the flexibility, quality and service provided by Joaquin, Marc and Ignasi is unparalleled...",
    },
    {
        name: "Yamiled Guzmán",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        text: "My experience at Coda Co-living was spectacular since we had the first distance contact from my country of origin...",
    },
    {
        name: "Adrián Rodgon",
        avatar: "https://ui-avatars.com/api/?name=Adrian+Rodgon&background=0D8ABC&color=fff",
        text: "Ha sido un auténtico placer dar con el equipo de Coda. He pasado 5 meses maravillosos en uno de sus colivings, tranquilo, cómodo...",
    },
    {
        name: "Ellen Frank",
        avatar: "https://ui-avatars.com/api/?name=Ellen+Frank&background=C30052&color=fff",
        text: "I've had a great experience living with Coda! I lived in a super nice apartment and with cool roommates...",
    }
];

const ReviewsSection = () => {
    return (
        <section className="reviews-section">
            <h2>Lo que opinan de nosotros.</h2>
            <div className="reviews-grid">
                {reviews.map((review, i) => (
                    <div className="review-card" key={i}>
                        <div className="review-header">
                            <div className="review-avatar">
                                <img src={review.avatar} alt={review.name} />
                            </div>
                            <div className="review-info">
                                <h4>{review.name}</h4>
                                <div className="review-stars">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#ffd700" strokeWidth={0} />)}
                                </div>
                            </div>
                        </div>
                        <p className="review-text">{review.text}</p>
                        <a href="#" className="review-link">Leer más</a>

                        <div className="google-badge">
                            {/* Simple Google G SVG representation */}
                            <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </g>
                            </svg>
                            <span>Posted on <strong>Google</strong></span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ReviewsSection;
