import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function Reserva() {
    const { id } = useParams();
    const [excursion, setExcursion] = useState(null);
    const [formulario, setFormulario] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        fecha_tour: "",
        personas: 1,
        excursion_id: Number(id)
    });

    useEffect(() => {
        const cargarExcursion = async () => {
            try {
                const respuesta = await api.get(`/excursiones/${id}`);
                setExcursion(respuesta.data);
            } catch (error) {
                console.error("Error al cargar la excursión:", error);
            }
        };

        cargarExcursion();
    }, [id]);

    const cambiarValor = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const guardarReserva = async (e) => {
        e.preventDefault();
        try {
            await api.post("/reservas", formulario);

            const mensaje = `Hola.\n\nNueva reserva recibida.\n\nExcursión: ${excursion.nombre}\nNombre: ${formulario.nombre}\nTeléfono: ${formulario.telefono}\nCorreo: ${formulario.correo}\nFecha: ${formulario.fecha_tour}\nPersonas: ${formulario.personas}`;
            const telefonoAdmin = "18492038401";

            window.open(
                `https://wa.me/${telefonoAdmin}?text=${encodeURIComponent(mensaje)}`,
                "_blank"
            );

            alert("¡Reserva enviada correctamente! Redirigiendo a WhatsApp...");
        } catch (error) {
            console.error(error);
            alert("Error al procesar la reserva");
        }
    };

    if (!excursion) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="spinner-border text-success" role="status"></div>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100 py-5 px-3 d-flex align-items-center justify-content-center">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "600px", width: "100%" }}>
                
                {/* Encabezado de la Tarjeta */}
                <div className="bg-dark text-white p-4 text-center position-relative" style={{ background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" }}>
                    <Link to={`/excursion/${id}`} className="btn btn-sm btn-link text-white position-absolute top-0 start-0 m-3 text-decoration-none fw-bold">
                        ← Atrás
                    </Link>
                    <span className="fs-3 d-block mb-1">📝</span>
                    <h2 className="fw-extrabold m-0 h4 text-uppercase tracking-wide">Formulario de Reserva</h2>
                </div>

                <div className="card-body p-4 p-md-5 bg-white">
                    {/* Resumen del Servicio Seleccionado */}
                    <div className="p-3 bg-light rounded-3 border-start border-success border-4 mb-4">
                        <span className="text-muted extra-small text-uppercase fw-bold d-block">Estás reservando:</span>
                        <h5 className="fw-bold text-dark m-0 mb-1">{excursion.nombre}</h5>
                        <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-2 border-white">
                            <span className="text-secondary small">Precio por persona:</span>
                            <span className="fw-bold text-success">USD {excursion.precio}</span>
                        </div>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={guardarReserva}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold text-secondary">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Ej: Juan Pérez"
                                value={formulario.nombre}
                                className="form-control py-2"
                                onChange={cambiarValor}
                                required
                            />
                        </div>

                        <div className="row g-3 mb-3">
                            <div className="col-sm-6">
                                <label className="form-label small fw-semibold text-secondary">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="correo"
                                    placeholder="ejemplo@correo.com"
                                    value={formulario.correo}
                                    className="form-control py-2"
                                    onChange={cambiarValor}
                                    required
                                />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label small fw-semibold text-secondary">Teléfono de Contacto</label>
                                <input
                                    type="text"
                                    name="telefono"
                                    placeholder="Ej: +1 809-555-5555"
                                    value={formulario.telefono}
                                    className="form-control py-2"
                                    onChange={cambiarValor}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row g-3 mb-4">
                            <div className="col-sm-6">
                                <label className="form-label small fw-semibold text-secondary">Fecha del Tour</label>
                                <input
                                    type="date"
                                    name="fecha_tour"
                                    value={formulario.fecha_tour}
                                    className="form-control py-2"
                                    onChange={cambiarValor}
                                    required
                                />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label small fw-semibold text-secondary">Cantidad de Personas</label>
                                <input
                                    type="number"
                                    name="personas"
                                    min="1"
                                    className="form-control py-2"
                                    value={formulario.personas}
                                    onChange={cambiarValor}
                                    required
                                />
                            </div>
                        </div>

                        {/* Indicador Dinámico de Monto Estimado */}
                        <div className="d-flex justify-content-between align-items-center bg-success bg-opacity-10 p-3 rounded-3 mb-4 text-success border border-success border-opacity-20">
                            <span className="fw-semibold small">Monto Total Estimado:</span>
                            <span className="fs-4 fw-extrabold">
                                USD {excursion.precio * (Number(formulario.personas) || 1)}
                            </span>
                        </div>

                        {/* Botón de envío */}
                        <button type="submit" className="btn btn-success btn-lg w-100 py-2.5 fw-bold text-uppercase tracking-wider shadow-sm d-flex align-items-center justify-content-center gap-2">
                            <span>💬</span> Completar por WhatsApp
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Reserva;