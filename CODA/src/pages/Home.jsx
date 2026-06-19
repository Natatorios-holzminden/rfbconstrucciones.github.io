import React from 'react';
import { Link } from 'react-router-dom';
import HomeHero from '../components/HomeHero';
import IconStrip from '../components/IconStrip';
import SplitSection from '../components/SplitSection';
import ListingSection from '../components/ListingSection';

import ContactForm from '../components/ContactForm';
import './Home.css';

// Import local assets for reliability where possible
import room1 from '../assets/room1.png'; // Use for Bedroom section

const Home = () => {
    return (
        <div className="home-page">
            <HomeHero />

            <IconStrip />

            <SplitSection
                subtitle="¿Qué ofrecemos?"
                title={<>Habitaciones privadas<br />con todo incluido.</>}
                imageSrc={room1}
                imageAlt="Habitación privada luminosa"
                buttonText="Ver habitaciones"
                buttonLink="/habitaciones"
                reverse={true}
            >
                <p>
                    Mucho mejor que un simple alquiler de habitaciones. En
                    Coda® accedes a <strong>habitaciones privadas dentro de espacios
                        de coliving gestionados</strong>, seguros y totalmente equipados, con
                    una amplia variedad de servicios incluidos y una <strong>comunidad
                        activa desde el primer día</strong>. Privacidad, comodidad y
                    comunidad. ¿Qué más se puede pedir?
                </p>
            </SplitSection>

            <SplitSection
                subtitle="¿Por qué Coda® Coliving?"
                title={<>Disfruta de Buenos Aires, sin<br />que te cueste un riñón.</>}
                imageSrc="https://images.unsplash.com/photo-1672588371953-2accc9eb0d01?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                imageAlt="Obelisco de Buenos Aires ciudad"
                buttonText="Descubre más"
                buttonLink="/porque-coda"
            >
                <p>
                    Hasta <strong>500 € menos al mes</strong> que un alquiler de habitación
                    tradicional, con todo incluido desde el primer día. Totalmente
                    amueblado y equipado, con un único pago mensual y sin
                    complicaciones, en un coliving en Buenos Aires pensado para
                    estancias por una temporada.
                </p>
            </SplitSection>

            <SplitSection
                subtitle="Eventos y Comunidad"
                title={<>Amigos,<br />también incluidos.</>}
                imageSrc="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                imageAlt="Grupo de amigos cocinando y riendo"
                buttonText="Inscríbete"
                buttonLink="/comunidad"
                reverse={true}
            >
                <p>
                    Cuidamos la comunidad para que la experiencia funcione
                    desde el primer día. Tenemos en cuenta afinidades, estilos de
                    vida y ritmos, <strong>facilitamos conexiones entre miembros y
                        organizamos actividades</strong> para que aterrices en Buenos Aires en
                    buena compañía, con normas claras y un equipo siempre
                    presente.
                </p>
            </SplitSection>

            {/* Empieza hoy mismo Section */}
            <section className="centered-text-block">
                <h2>
                    Empieza hoy mismo.<br />
                    Fácil, rápido y sin complicaciones.
                </h2>
                <p>
                    Reserva tu habitación y, si hay disponibilidad, <strong>puedes empezar tu nueva
                        etapa en Buenos Aires hoy mismo</strong>. Todo está pensado para que llegues y
                    funcione desde el primer día.
                </p>
                <div style={{ marginTop: '30px' }}>
                    <Link to="/habitaciones" className="btn-green-solid">
                        Reserva tu habitación
                    </Link>
                </div>
            </section>

            {/* Listings Section with Header */}
            <div className="listings-header centered-text-block" style={{ paddingBottom: 0, paddingTop: '10px', backgroundColor: '#fafafa' }}>
                <h2>Tú eliges.</h2>
                <p>
                    Nuestros espacios de <strong>coliving en Buenos Aires</strong>, con todo incluido desde el primer día.
                </p>
            </div>
            <div className="home-listings-container" style={{ backgroundColor: '#fafafa', paddingBottom: '60px' }}>
                <ListingSection limit={12} showFilters={false} />
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Link to="/habitaciones" className="btn-green-solid" style={{ padding: '16px 40px' }}>
                        Ver todas las habitaciones
                    </Link>
                </div>
            </div>

            {/* Descuentos Section */}
            <section className="centered-text-block">
                <h2>
                    Descuentos,<br />
                    también incluidos.
                </h2>
                <p>
                    Formar parte de Coda® te da acceso a una red de <strong>descuentos y ventajas
                        exclusivas en Buenos Aires</strong>. Gimnasios, transporte, servicios de delivery,
                    alquileres y e-commerce local. Beneficios pensados para ayudarte a ahorrar
                    dinero y simplificar tu día a día mientras disfrutas de la ciudad.
                </p>
                <div style={{ marginTop: '30px' }}>
                    <Link to="/habitaciones" className="btn-green-solid">
                        Ver descuentos
                    </Link>
                </div>
            </section>

            {/* Community Banner */}
            <section className="community-section">
                <div className="community-content">
                    <h2>
                        Una Comunidad con<br />
                        potencial.
                    </h2>
                    <p>
                        Nuestros colivers vienen de más de 40 países, formando una
                        <strong> comunidad internacional diversa</strong>, con perfiles activos,
                        inquietos y con recorrido personal y profesional.
                    </p>
                </div>

            </section>

            {/* Trabaja con foco Split Section */}
            <SplitSection
                subtitle="El Club Coda®"
                title={<>Trabaja con foco. Conecta<br />con talento.</>}
                imageSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                imageAlt="Mujer trabajando en espacio coworking"
                buttonText="Hazte miembro"
                buttonLink="/habitaciones"
            >
                <p>
                    Como miembro de Coda®, tienes <strong>acceso a un club pensado
                        para acompañarte durante tu estancia en Buenos Aires</strong>. Espacios
                    cómodos para concentrarte cuando lo necesitas, zonas
                    comunes para compartir y una comunidad cuidada con la que
                    conectar dentro y fuera del alojamiento.
                </p>
            </SplitSection>



            {/* FAQ CTA Section */}
            <section className="centered-text-block" style={{ backgroundColor: '#fff', paddingBottom: 60 }}>
                <h2>¿Preguntas? Respuestas.</h2>
                <p style={{ maxWidth: '600px' }}>
                    Encuentra de forma rápida y clara toda la información sobre
                    Coda® Coliving, nuestras habitaciones y los servicios
                    incluidos. Todo explicado de manera sencilla, para que puedas
                    decidir con tranquilidad.
                </p>
                <Link to="/faqs" className="btn-green-solid">
                    Consulta nuestras FAQs
                </Link>
            </section>

            {/* Sostenibilidad Section */}
            <SplitSection
                subtitle="Sostenibilidad"
                title="Un hogar que todos compartimos"
                imageSrc="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                imageAlt="Persona plantando un árbol"
                buttonText="Únete a nuestra misión"
                buttonLink="/habitaciones"
                variant="dark-theme"
            >
                <p>
                    Cada pequeño gesto, de forma conjunta, puede generar
                    un gran impacto. Por eso, <strong>por cada mes de estancia en
                        Coda®, plantamos un árbol.</strong> Este es nuestro
                    compromiso para contribuir a un planeta más verde y
                    saludable, garantizando que tu experiencia de coliving
                    no solo enriquece tu vida, sino también la del hogar que
                    todos compartimos.
                </p>
            </SplitSection>



            <ContactForm />
        </div>
    );
};

export default Home;
