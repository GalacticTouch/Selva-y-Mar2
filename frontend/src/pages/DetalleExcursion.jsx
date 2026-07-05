import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function DetalleExcursion() {
    const { id } = useParams();

    const [excursion, setExcursion] = useState(null);
    const [fotos, setFotos] = useState([]);

    const cargarExcursion = async () => {
        try {
            const respuesta = await api.get(`/excursiones/${id}`);
            setExcursion(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarFotos = async () => {
        try {
            const respuesta = await api.get(`/excursiones-fotos/${id}`);
            setFotos(respuesta.data);
        } catch (error) {
            console.error("Error al cargar las fotos:", error);
        }
    };

    useEffect(() => {
        cargarExcursion();
        cargarFotos();
    }, []);

    if (!excursion) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status"></div>
                    <p className="text-muted fw-semibold">Cargando los detalles de tu próxima aventura...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100">
            {/* Navbar superior */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
                <div className="container">
                    <Link className="navbar-brand fw-extrabold text-uppercase tracking-wide" to="/">
                        🌴 Selva y Mar
                    </Link>
                    <Link to="/" className="btn btn-sm btn-outline-light fw-semibold">
                        ← Volver al Inicio
                    </Link>
                </div>
            </nav>

            <div className="container py-5">
                {/* Imagen de Portada Principal Estilo Banner */}
                {excursion.imagen && (
                    <div className="position-relative mb-5 shadow rounded-4 overflow-hidden" style={{ height: "450px" }}>
                        <img
    src={
        excursion.imagen.startsWith("http")
            ? excursion.imagen
            : `http://localhost:5000/uploads/${excursion.imagen}`
    }
    alt={excursion.nombre}
    className="w-100 h-100"
    style={{ objectFit: "cover" }}
/>
                        {/* Capa de degradado oscuro sobre la imagen para legibilidad */}
                        <div className="position-absolute bottom-0 start-0 w-100 p-4 p-md-5 text-white" 
                             style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
                            <span className="badge bg-warning text-dark fw-bold px-3 py-2 text-uppercase mb-2">Aventura Disponible</span>
                            <h1 className="fw-extrabold display-5 m-0">{excursion.nombre}</h1>
                        </div>
                    </div>
                )}

                {/* Grid de Contenido (Dos columnas) */}
                <div className="row g-4">
                    
                    {/* Columna Izquierda: Información de la Excursión */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white">
                            <h3 className="fw-bold text-dark mb-3">Acerca de esta experiencia</h3>
                            <p className="text-secondary lh-lg fs-5 mb-4">
                                {excursion.descripcion_larga}
                            </p>

                            <hr className="my-4 text-muted opacity-25" />

                            {/* Detalles clave en rejilla interna */}
                            <h4 className="fw-bold text-dark mb-4">Detalles del itinerario</h4>
                            <div className="row g-4">
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle fs-4">📍</div>
                                        <div>
                                            <span className="text-muted small d-block">Ubicación</span>
                                            <strong className="text-dark">{excursion.ubicacion}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle fs-4">⏱️</div>
                                        <div>
                                            <span className="text-muted small d-block">Duración</span>
                                            <strong className="text-dark">{excursion.duracion}</strong>
                                        </div>
                                    </div>
                                </div>
                                {excursion.incluye && (
                                    <div className="col-12">
                                        <div className="p-3 bg-light rounded-3 d-flex align-items-start gap-3">
                                            <span className="fs-4">✅</span>
                                            <div>
                                                <h6 className="fw-bold text-dark mb-1">Servicios Incluidos</h6>
                                                <p className="text-secondary small mb-0">{excursion.incluye}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Galería de fotos complementarias */}
                        {fotos.length > 0 && (
                            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
                                <h3 className="fw-bold text-dark mb-4">📸 Momentos de viajeros anteriores</h3>
                                <div className="row g-3">
                                    {fotos.map((foto) => (
                                        <div className="col-sm-6 col-md-4" key={foto.id}>
                                            <div className="overflow-hidden rounded-3 shadow-sm border" style={{ height: "180px" }}>
                                                <img
    src={
        foto.imagen.startsWith("http")
            ? foto.imagen
            : `http://localhost:5000/uploads/${foto.imagen}`
    }
    alt="Excursión anterior"
    className="w-100 h-100 img-fluid transition-all"
    style={{ objectFit: "cover" }}
/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Columna Derecha: Tarjeta Lateral de Precio y Reserva */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: "6rem", zIndex: 10 }}>
                            <span className="text-muted small text-uppercase fw-bold d-block mb-1">Precio total por persona</span>
                            <div className="d-flex align-items-baseline gap-1 mb-4">
                                <h2 className="display-6 fw-extrabold text-success m-0">USD {excursion.precio}</h2>
                            </div>

                            <div className="alert alert-warning border-0 small mb-4 d-flex align-items-center gap-2">
                                ⚡ <span><strong>¡Reserva inmediata!</strong> Asegura tu cupo antes de que se agoten.</span>
                            </div>

                            <Link
                                to={`/reserva/${excursion.id}`}
                                className="btn btn-success btn-lg w-100 py-3 fw-bold text-uppercase tracking-wider shadow-sm"
                            >
                                Reservar Ahora
                            </Link>

                            <ul className="list-unstyled text-muted small mt-4 pt-3 border-top m-0">
                                <li className="mb-2">✓ Confirmación instantánea por correo</li>
                                <li className="mb-2">✓ Guía turístico bilingüe incluido</li>
                                <li>✓ Cancelación flexible disponible</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DetalleExcursion;