import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { faqsData } from '../data/faqsData';
import './Faqs.css';

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button className="faq-question" onClick={onClick}>
                <span>{question}</span>
                <span className="faq-icon">{isOpen ? '−' : '+'}</span>
            </button>
            <div className="faq-answer-container" style={{ maxHeight: isOpen ? '1000px' : '0' }}>
                <p className="faq-answer">{answer}</p>
            </div>
        </div>
    );
};

const Faqs = () => {
    const [activeCategory, setActiveCategory] = useState(faqsData[0].category);
    const [searchQuery, setSearchQuery] = useState('');
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (categoryIndex, itemIndex) => {
        const key = `${categoryIndex}-${itemIndex}`;
        setOpenItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const filteredData = searchQuery
        ? faqsData.map(cat => ({
            ...cat,
            items: cat.items.filter(item =>
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(cat => cat.items.length > 0)
        : faqsData;

    const currentCategoryData = filteredData.find(cat => cat.category === activeCategory) || filteredData[0];

    return (
        <div className="faqs-page">
            <div className="faqs-hero">
                <div className="container">
                    <h1 className="faqs-title">FAQs</h1>
                    <h2 className="faqs-subtitle">¿Tienes preguntas?</h2>
                    <p className="faqs-description">
                        Nosotros te las resolvemos. Aquí encontrarás respuestas claras sobre cómo funciona Coda®, nuestras estancias y los servicios incluidos.
                    </p>

                    <div className="faqs-search-container">
                        <div className="search-input-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="¿Buscas algo?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="faqs-search-input"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container faqs-layout">
                <div className="faqs-tabs">
                    {/* Show tabs only if no search query, or show all if search query is present but we want to navigate? 
                Actually, usually search results override tabs. If search is empty, show tabs. 
            */}
                    {!searchQuery && (
                        <div className="tabs-scroll-container">
                            {faqsData.map((cat) => (
                                <button
                                    key={cat.category}
                                    className={`tab-button ${activeCategory === cat.category ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat.category)}
                                >
                                    {cat.category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="faqs-content">
                    {searchQuery ? (
                        <div className="search-results">
                            {filteredData.map((cat, catIndex) => (
                                <div key={cat.category} className="category-section">
                                    <h3 className="category-title">{cat.category}</h3>
                                    <div className="faqs-list">
                                        {cat.items.map((item, itemIndex) => (
                                            <AccordionItem
                                                key={itemIndex}
                                                question={item.question}
                                                answer={item.answer}
                                                isOpen={openItems[`search-${catIndex}-${itemIndex}`]}
                                                onClick={() => toggleItem(`search-${catIndex}`, itemIndex)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {filteredData.length === 0 && (
                                <div className="no-results">No se encontraron resultados para "{searchQuery}"</div>
                            )}
                        </div>
                    ) : (
                        <div className="category-section">
                            {/* <h3 className="category-title">{currentCategoryData?.category}</h3> */}
                            <div className="faqs-list">
                                {currentCategoryData?.items.map((item, index) => (
                                    <AccordionItem
                                        key={index}
                                        question={item.question}
                                        answer={item.answer}
                                        isOpen={openItems[`${activeCategory}-${index}`]}
                                        onClick={() => toggleItem(activeCategory, index)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Faqs;
