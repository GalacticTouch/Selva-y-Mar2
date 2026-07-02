import { Link } from "react-router-dom";

function TarjetaExcursion({ excursion }) {

    const imagenUrl = excursion.imagen
        ? `http://localhost:5000/uploads/${excursion.imagen}`
        : "https://placehold.co/600x400";

    return (

        <div className="col-md-4 mb-4">

            <div className="card h-100">

                <img
                    src={imagenUrl}
                    className="card-img-top"
                    alt={excursion.nombre}
                />

                <div className="card-body">

                    <h5>
                        {excursion.nombre}
                    </h5>

                    <p>
                        {excursion.descripcion_corta}
                    </p>

                    <h4 className="text-success">
                        USD {excursion.precio}
                    </h4>

                    <Link
                        to={`/excursion/${excursion.id}`}
                        className="btn btn-primary"
                    >
                        Ver Detalles
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default TarjetaExcursion;