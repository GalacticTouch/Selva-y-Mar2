import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();
    const [datos, setDatos] = useState({
        usuario: "",
        password: ""
    });

    const cambiarValor = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await api.post("/auth/login", datos);
            localStorage.setItem("token", respuesta.data.token);
            navigate("/admin");
        } catch (error) {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
            <div className="card border-0 shadow-lg" style={{ maxWidth: "450px", width: "100%", borderRadius: "12px" }}>
                <div className="card-body p-5">
                    
                    {/* Encabezado del Formulario */}
                    <div className="text-center mb-4">
                        <div className="d-inline-block p-3 bg-primary bg-opacity-10 text-primary rounded-circle mb-3">
                            <span style={{ fontSize: "2rem" }}>🔒</span>
                        </div>
                        <h2 className="fw-bold text-dark mb-1">Iniciar Sesión</h2>
                        <p className="text-muted small">Acceso exclusivo para administradores</p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={iniciarSesion}>
                        
                        {/* Campo Usuario */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold text-secondary small">Usuario</label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0 text-muted">
                                    👤
                                </span>
                                <input
                                    type="text"
                                    name="usuario"
                                    placeholder="Introduce tu usuario"
                                    className="form-control border-start-0 ps-0 py-2"
                                    onChange={cambiarValor}
                                    required
                                />
                            </div>
                        </div>

                        {/* Campo Contraseña */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold text-secondary small">Contraseña</label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0 text-muted">
                                    🔑
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="form-control border-start-0 ps-0 py-2"
                                    onChange={cambiarValor}
                                    required
                                />
                            </div>
                        </div>

                        {/* Botón de Ingreso */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 fw-bold shadow-sm text-uppercase tracking-wider"
                        >
                            Ingresar al Panel
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;