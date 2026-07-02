import { useEffect, useState } from "react";
import api from "../services/api";

function AdminFotos() {

    const [excursiones, setExcursiones] = useState([]);
    const [excursionId, setExcursionId] = useState("");
    const [imagen, setImagen] = useState(null);

    useEffect(() => {

        cargarExcursiones();

    }, []);

    const cargarExcursiones = async () => {

        try {

            const respuesta =
                await api.get("/excursiones");

            setExcursiones(
                respuesta.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    const subirFoto = async (e) => {

        e.preventDefault();

        const datos = new FormData();

        datos.append(
            "excursion_id",
            excursionId
        );

        datos.append(
            "imagen",
            imagen
        );

        try {

            await api.post(
                "/excursiones-fotos",
                datos
            );

            alert(
                "Foto agregada correctamente"
            );

        } catch (error) {

            console.error(error);

            alert(
                "Error al subir foto"
            );

        }

    };

    return (

        <div className="container py-5">

            <h1>
                Fotos de Excursiones
            </h1>

            <form
                onSubmit={subirFoto}
            >

                <select
                    className="form-control mb-3"
                    onChange={(e) =>
                        setExcursionId(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Seleccione excursión
                    </option>

                    {excursiones.map(
                        (excursion) => (

                            <option
                                key={excursion.id}
                                value={excursion.id}
                            >
                                {excursion.nombre}
                            </option>

                        )
                    )}

                </select>

                <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) =>
                        setImagen(
                            e.target.files[0]
                        )
                    }
                />

                <button
                    className="btn btn-primary"
                >
                    Subir Foto
                </button>

            </form>

        </div>

    );

}

export default AdminFotos;