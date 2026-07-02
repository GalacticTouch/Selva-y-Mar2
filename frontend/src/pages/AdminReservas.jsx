import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminReservas() {
    const [reservas, setReservas] = useState([]);

    const cargarReservas = async () => {
        try {
            const respuesta = await api.get("/reservas");
            setReservas(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarReservas();
    }, []);

    return (
        <div className="bg-light min-vh-100 pb-5">
            {/* Encabezado / Navbar de Gestión */}
            <div className="bg-white border-bottom py-3 mb-4 shadow-sm">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>
                        <span className="text-muted small text-uppercase fw-bold">Módulo de control</span>
                        <h1 className="h3 fw-extrabold text-dark m-0 d-flex align-items-center gap-2">
                            📬 Reservas Recibidas
                            {reservas.length > 0 && (
                                <span className="badge bg-primary fs-6 rounded-pill">{reservas.length}</span>
                            )}
                        </h1>
                    </div>
                    <Link to="/admin" className="btn btn-outline-secondary btn-sm fw-semibold">
                        ← Volver al Panel
                    </Link>
                </div>
            </div>

            <div className="container">
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        
                        {/* Tabla Responsiva */}
                        <div className="table-responsive">
                            <table className="table table-hover align-middle m-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="text-muted small fw-bold" style={{ width: "80px" }}>ID</th>
                                        <th className="text-muted small fw-bold">Cliente / Contacto</th>
                                        <th className="text-muted small fw-bold">Excursión contratada</th>
                                        <th className="text-muted small fw-bold text-center">Fecha del Tour</th>
                                        <th className="text-muted small fw-bold text-center">Pasajeros</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservas.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-5 text-muted">
                                                <span className="fs-3 d-block mb-2">📭</span>
                                                No se han recibido reservas en el sistema todavía.
                                            </td>
                                        </tr>
                                    ) : (
                                        reservas.map((reserva) => (
                                            <tr key={reserva.id}>
                                                {/* ID */}
                                                <td className="text-secondary small fw-semibold">
                                                    #{reserva.id}
                                                </td>
                                                
                                                {/* Cliente & Teléfono */}
                                                <td>
                                                    <span className="fw-bold text-dark d-block">
                                                        {reserva.nombre}
                                                    </span>
                                                    <span className="text-muted small d-block">
                                                        📞 {reserva.telefono || "Sin teléfono"}
                                                    </span>
                                                </td>
                                                
                                                {/* Excursión */}
                                                <td>
                                                    <span className="badge bg-info bg-opacity-10 text-info fw-semibold px-3 py-2 rounded-2">
                                                        🗺️ {reserva.excursion}
                                                    </span>
                                                </td>
                                                
                                                {/* Fecha */}
                                                <td className="text-center text-secondary small fw-medium">
                                                    🗓️ {reserva.fecha_tour}
                                                </td>
                                                
                                                {/* Cantidad de personas */}
                                                <td className="text-center">
                                                    <span className="badge bg-secondary px-2.5 py-1.5 rounded-pill fw-bold">
                                                        {reserva.personas} {reserva.personas === 1 ? "persona" : "personas"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminReservas;