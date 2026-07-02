import { Link } from "react-router-dom";

function AdminPage() {
    // MODIFICADO: Ahora el destino es "/" (Página principal / Home)
    const cerrarSesion = () => {
        localStorage.removeItem("token"); // Borra el token de seguridad
        window.location.href = "/";       // ◄ Redirección a la raíz de la web
    };

    return (
        <div className="min-vh-100 bg-light">
            {/* Barra Superior / Navbar */}
            <nav className="navbar navbar-dark bg-dark shadow-sm mb-5">
                <div className="container">
                    <span className="navbar-brand mb-0 h1 fw-bold text-uppercase tracking-wider">
                        ⚡ Panel Administrativo
                    </span>
                    <button
                        className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 fw-semibold"
                        onClick={cerrarSesion}
                    >
                        <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                    </button>
                </div>
            </nav>

            {/* Contenido Principal */}
            <div className="container">
                <div className="row justify-content-center text-center mb-4">
                    <div className="col-md-8">
                        <h2 className="fw-extrabold text-secondary">Bienvenido Administrador</h2>
                        <p className="text-muted">Selecciona una de las opciones para gestionar los servicios.</p>
                    </div>
                </div>

                {/* Grid de Tarjetas */}
                <div className="row g-4 justify-content-center">
                    {/* Tarjeta Excursiones */}
                    <div className="col-md-5 col-lg-4">
                        <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                            <div className="card-body d-flex flex-column align-items-center text-center p-4">
                                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle mb-3">
                                    <span style={{ fontSize: "2rem" }}>✈️</span>
                                </div>
                                <h4 className="card-title fw-bold mb-2">Excursiones</h4>
                                <p className="card-text text-muted small flex-grow-1">
                                    Crea, edita, elimina y visualiza los paquetes turísticos y aventuras disponibles.
                                </p>
                                <Link
                                    to="/admin/excursiones"
                                    className="btn btn-primary w-100 py-2 fw-semibold shadow-sm"
                                >
                                    Gestionar Excursiones
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta Reservas */}
                    <div className="col-md-5 col-lg-4">
                        <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                            <div className="card-body d-flex flex-column align-items-center text-center p-4">
                                <div className="p-3 bg-success bg-opacity-10 text-success rounded-circle mb-3">
                                    <span style={{ fontSize: "2rem" }}>📅</span>
                                </div>
                                <h4 className="card-title fw-bold mb-2">Reservas</h4>
                                <p className="card-text text-muted small flex-grow-1">
                                    Controla las solicitudes de los clientes, estados de pago y fechas reservadas.
                                </p>
                                <Link
                                    to="/admin/reservas"
                                    className="btn btn-success w-100 py-2 fw-semibold shadow-sm"
                                >
                                    Gestionar Reservas
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;