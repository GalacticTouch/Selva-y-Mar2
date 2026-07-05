import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
    const [excursiones, setExcursiones] = useState([]);

    const cargarExcursiones = async () => {
        try {
            const respuesta = await api.get("/excursiones");
            setExcursiones(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarExcursiones();
    }, []);

    return (
        <div className="bg-light min-vh-100">
            {/* Barra de Navegación integrada */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
                <div className="container">
                    <Link className="navbar-brand fw-extrabold tracking-wide text-uppercase" to="/">
                        🌴 Selva y Mar
                    </Link>
                    <div className="d-flex gap-2">
                        <Link to="/" className="btn btn-sm btn-link text-white text-decoration-none fw-semibold px-3">
                            Inicio
                        </Link>
                        <Link to="/login" className="btn btn-sm btn-warning fw-bold px-3 shadow-sm">
                            🔑 Área Admin
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Sección Hero / Banner de Bienvenida */}
            <div className="bg-dark text-white text-center py-5 mb-5 position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)" }}>
                <div className="container py-4 position-relative" style={{ zIndex: 2 }}>
                    <h1 className="display-4 fw-extrabold mb-3">Descubre la República Dominicana</h1>
                    <p className="lead text-white-50 max-w-2xl mx-auto mb-0">
                        Encuentra las mejores excursiones, aventuras inolvidables y destinos paradisíacos en un solo lugar.
                    </p>
                </div>
                <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10 bg-grid-pattern"></div>
            </div>

            {/* Contenedor Principal de Excursiones */}
            <div className="container pb-5">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h2 className="fw-bold text-dark m-0">Nuestras Experiencias</h2>
                        <p className="text-muted small m-0">Aventuras recomendadas para ti</p>
                    </div>
                    <span className="badge bg-secondary rounded-pill px-3 py-2 fw-semibold">
                        {excursiones.length} disponibles
                    </span>
                </div>

                {/* Grid de Tarjetas */}
                <div className="row g-4">
                    {excursiones.length === 0 ? (
                        <div className="col-100 text-center py-5">
                            <p className="text-muted fw-medium">No hay excursiones disponibles en este momento. ¡Vuelve pronto!</p>
                        </div>
                    ) : (
                        excursiones.map((excursion) => (
                            <div className="col-md-6 col-lg-4" key={excursion.id}>
                                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover transition-all bg-white">
                                    
                                    {/* Contenedor de la Imagen con ubicación flotante */}
                                    <div className="position-relative">
                                        {excursion.imagen ? (
                                            <img
    src={excursion.imagen}
    alt={excursion.nombre}
    className="card-img-top"
    style={{
        height: "240px",
        objectFit: "cover"
    }}
/>
                                        ) : (
                                            <div className="bg-secondary bg-opacity-20 d-flex align-items-center justify-content-center" style={{ height: "240px" }}>
                                                <span className="text-muted">🏝️ Sin imagen disponible</span>
                                            </div>
                                        )}
                                        {excursion.ubicacion && (
                                            <span className="position-absolute top-0 end-0 m-3 badge bg-dark bg-opacity-75 text-white backdrop-blur px-3 py-2 rounded-pill small fw-medium">
                                                📍 {excursion.ubicacion.split(",")[0]}
                                            </span>
                                        )}
                                    </div>

                                    {/* Cuerpo de la Tarjeta */}
                                    <div className="card-body p-4 d-flex flex-column">
                                        <h5 className="card-title fw-bold text-dark mb-2 lh-base">
                                            {excursion.nombre}
                                        </h5>
                                        
                                        <p className="card-text text-secondary small mb-4 flex-grow-1 line-clamp-3">
                                            {excursion.descripcion_corta}
                                        </p>
                                        
                                        <hr className="text-muted opacity-25 my-3" />

                                        {/* Fila de precio y CTA */}
                                        <div className="d-flex align-items-center justify-content-between mt-auto">
                                            <div>
                                                <span className="text-muted extra-small d-block text-uppercase fw-bold tracking-wider">Desde</span>
                                                <span className="fs-4 fw-extrabold text-success">USD {excursion.precio}</span>
                                            </div>
                                            
                                            <Link
                                                to={`/excursion/${excursion.id}`}
                                                className="btn btn-primary px-4 py-2 fw-bold rounded-3 shadow-sm text-sm"
                                            >
                                                Ver Detalles →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;