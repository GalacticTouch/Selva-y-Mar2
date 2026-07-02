import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function AdminExcursiones() {
    // 1. Estados unificados
    const [formulario, setFormulario] = useState({
        nombre: "",
        descripcion_corta: "",
        descripcion_larga: "",
        precio: "",
        ubicacion: "",
        duracion: "",
        incluye: ""
    });

    const [excursiones, setExcursiones] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [idEditar, setIdEditar] = useState(null);
    const [imagen, setImagen] = useState(null);
    const [fotos, setFotos] = useState([]);
    
    // 2. Manejadores de eventos
    const cambiarValor = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    const cambiarImagen = (e) => {
        if (e.target.files[0]) {
            setImagen(e.target.files[0]);
        }
    };

    const cambiarFotos = (e) => {
        setFotos([...e.target.files]);
    };

    const cargarExcursiones = async () => {
        try {
            const respuesta = await api.get("/excursiones");
            setExcursiones(respuesta.data);
        } catch (error) {
            console.error("Error al cargar:", error);
        }
    };

    useEffect(() => {
        cargarExcursiones();
    }, []);

    // 3. Función para limpiar absolutamente todo el formulario
    const cancelarEdicion = () => {
        setFormulario({
            nombre: "",
            descripcion_corta: "",
            descripcion_larga: "",
            precio: "",
            ubicacion: "",
            duracion: "",
            incluye: ""
        });
        setModoEdicion(false);
        setIdEditar(null);
        setImagen(null);
        setFotos([]);
        
        // Resetear visualmente los inputs de tipo file
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => input.value = "");
    };

    // 4. Guardar / Actualizar (CORREGIDO)
    const guardarExcursion = async (e) => {
        e.preventDefault();
        try {
            const datos = new FormData();
            datos.append("nombre", formulario.nombre);
            datos.append("descripcion_corta", formulario.descripcion_corta);
            datos.append("descripcion_larga", formulario.descripcion_larga);
            datos.append("precio", formulario.precio);
            datos.append("ubicacion", formulario.ubicacion);
            datos.append("duracion", formulario.duracion);
            datos.append("incluye", formulario.incluye);

            // Solo adjuntar si el usuario seleccionó un archivo nuevo
            if (imagen) {
                datos.append("imagen", imagen);
            }
            
            fotos.forEach((foto) => {
                datos.append("fotos", foto);
            });

            if (modoEdicion) {
                // Si tu backend falla con PUT, cambia aquí a api.post(`/excursiones/${idEditar}`, datos)
                await api.put(`/excursiones/${idEditar}`, datos);
                alert("¡Excursión actualizada con éxito! ✨");
            } else {
                await api.post("/excursiones", datos);
                alert("¡Excursión creada con éxito! 🎉");
            }

            await cargarExcursiones(); // Esperar a que recargue la lista
            cancelarEdicion();         // Limpiar todo el estado
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Hubo un problema al procesar la solicitud en el servidor.");
        }
    };

    // 5. Eliminar (CORREGIDO)
    const eliminarExcursion = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar esta excursión? Esta acción borrará permanentemente sus fotos.")) {
            return;
        }
        try {
            await api.delete(`/excursiones/${id}`);
            
            // Si estabas editando justo la que eliminaste, cancelamos la edición
            if (modoEdicion && idEditar === id) {
                cancelarEdicion();
            }
            
            await cargarExcursiones();
            alert("Excursión eliminada.");
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("No se pudo eliminar. Verifica si tiene reservas asociadas.");
        }
    };

    // 6. Cargar datos en el formulario para editar
    const editarExcursion = (excursion) => {
        setFormulario({
            nombre: excursion.nombre || "",
            descripcion_corta: excursion.descripcion_corta || "",
            descripcion_larga: excursion.descripcion_larga || "",
            precio: excursion.precio || "",
            ubicacion: excursion.ubicacion || "",
            duracion: excursion.duracion || "",
            incluye: excursion.incluye || ""
        });

        setModoEdicion(true);
        setIdEditar(excursion.id);
        setImagen(null); // No sobreescribir la imagen actual a menos que elija una nueva
        setFotos([]);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="bg-light min-vh-100 pb-5">
            {/* Navbar */}
            <div className="bg-white border-bottom py-3 mb-4 shadow-sm">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>
                        <span className="text-muted small text-uppercase fw-bold">Módulo de control</span>
                        <h1 className="h3 fw-extrabold text-dark m-0">Gestión de Excursiones</h1>
                    </div>
                    <Link to="/admin" className="btn btn-outline-secondary btn-sm fw-semibold">
                        ← Volver al Panel
                    </Link>
                </div>
            </div>

            <div className="container">
                <div className="row g-4">
                    
                    {/* COLUMNA DEL FORMULARIO */}
                    <div className="col-lg-5">
                        <div className={`card border-0 shadow-sm rounded-4 transition-all ${modoEdicion ? 'border-top border-warning border-4' : ''}`}>
                            <div className="card-body p-4">
                                <h4 className="fw-bold text-dark mb-3">
                                    {modoEdicion ? "✏️ Editar Excursión" : "➕ Nueva Excursión"}
                                </h4>
                                
                                <form onSubmit={guardarExcursion}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">Nombre</label>
                                        <input type="text" name="nombre" className="form-control" value={formulario.nombre} onChange={cambiarValor} required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">Descripción Corta</label>
                                        <input type="text" name="descripcion_corta" className="form-control" value={formulario.descripcion_corta} onChange={cambiarValor} required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">Descripción Larga</label>
                                        <textarea name="descripcion_larga" rows="3" className="form-control" value={formulario.descripcion_larga} onChange={cambiarValor} required />
                                    </div>

                                    <div className="row g-2 mb-3">
                                        <div className="col-6">
                                            <label className="form-label small fw-semibold text-secondary">Precio (USD)</label>
                                            <input type="number" name="precio" className="form-control" value={formulario.precio} onChange={cambiarValor} required />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label small fw-semibold text-secondary">Duración</label>
                                            <input type="text" name="duracion" className="form-control" value={formulario.duracion} onChange={cambiarValor} required />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">Ubicación</label>
                                        <input type="text" name="ubicacion" className="form-control" value={formulario.ubicacion} onChange={cambiarValor} required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">¿Qué incluye?</label>
                                        <textarea name="incluye" rows="2" className="form-control" value={formulario.incluye} onChange={cambiarValor} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-semibold text-secondary">{modoEdicion ? "Cambiar Imagen de portada (Opcional)" : "Imagen de portada principal"}</label>
                                        <input type="file" className="form-control" accept="image/*" onChange={cambiarImagen} />
                                        {imagen && (
                                            <div className="mt-2">
                                                <img src={URL.createObjectURL(imagen)} alt="preview" style={{ height: "70px", objectFit: "cover" }} className="rounded border" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label small fw-semibold text-secondary">{modoEdicion ? "Añadir más fotos a la galería (Opcional)" : "Fotos de la galería"}</label>
                                        <input type="file" multiple className="form-control" accept="image/*" onChange={cambiarFotos} />
                                        {fotos.length > 0 && (
                                            <div className="d-flex flex-wrap gap-2 mt-2 p-2 bg-light rounded border">
                                                {fotos.map((foto, index) => (
                                                    <img key={index} src={URL.createObjectURL(foto)} alt="preview" style={{ width: "45px", height: "45px", objectFit: "cover" }} className="rounded" />
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button type="submit" className={`btn flex-grow-1 fw-bold ${modoEdicion ? "btn-warning" : "btn-primary"}`}>
                                            {modoEdicion ? "🔄 Guardar Cambios" : "💾 Crear Excursión"}
                                        </button>
                                        <button type="button" className="btn btn-outline-secondary" onClick={cancelarEdicion}>
                                            {modoEdicion ? "Cancelar" : "Limpiar"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DE LA TABLA */}
                    <div className="col-lg-7">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <h4 className="fw-bold text-dark mb-1">📋 Listado Activo</h4>
                                <p className="text-muted small mb-4">Gestiona las excursiones visibles en el catálogo.</p>
                                
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle m-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th style={{ width: "60px" }}>ID</th>
                                                <th>Nombre</th>
                                                <th>Ubicación</th>
                                                <th className="text-end">Precio</th>
                                                <th className="text-center">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {excursiones.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="text-center py-4 text-muted">No hay excursiones registradas.</td>
                                                </tr>
                                            ) : (
                                                excursiones.map((excursion) => (
                                                    <tr key={excursion.id} className={idEditar === excursion.id ? "table-warning bg-opacity-10" : ""}>
                                                        <td className="text-secondary small fw-semibold">#{excursion.id}</td>
                                                        <td className="fw-bold text-dark">{excursion.nombre}</td>
                                                        <td className="text-secondary small">📍 {excursion.ubicacion}</td>
                                                        <td className="fw-bold text-success text-end">USD {excursion.precio}</td>
                                                        <td className="text-center">
                                                            <div className="d-inline-flex gap-1">
                                                                <button className="btn btn-sm btn-light border" title="Editar" onClick={() => editarExcursion(excursion)}>
                                                                    ✏️
                                                                </button>
                                                                <button className="btn btn-sm btn-light border text-danger" title="Eliminar" onClick={() => eliminarExcursion(excursion.id)}>
                                                                    🗑️
                                                                </button>
                                                            </div>
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
            </div>
        </div>
    );
}

export default AdminExcursiones;