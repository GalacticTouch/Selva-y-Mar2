const connection =
require("../database/connection");

const crearReserva =
(req, res) => {

    const {

        excursion_id,
        nombre,
        correo,
        telefono,
        fecha_tour,
        personas

    } = req.body;

    const sql = `
    INSERT INTO reservas
    (
        excursion_id,
        nombre,
        correo,
        telefono,
        fecha_tour,
        personas
    )
    VALUES
    (?, ?, ?, ?, ?, ?)
    `;

    connection.query(

        sql,

        [
            excursion_id,
            nombre,
            correo,
            telefono,
            fecha_tour,
            personas
        ],

        (error, resultado) => {

            if (error) {

                return res
                .status(500)
                .json(error);

            }

            res.json({

                mensaje:
                "Reserva creada correctamente",

                id:
                resultado.insertId

            });

        }

    );

};

const obtenerReservas = (req, res) => {

    const sql = `
    SELECT
        reservas.id,
        reservas.nombre,
        reservas.correo,
        reservas.telefono,
        reservas.fecha_tour,
        reservas.personas,
        excursiones.nombre AS excursion
    FROM reservas
    INNER JOIN excursiones
        ON excursiones.id = reservas.excursion_id
    ORDER BY reservas.id DESC
    `;

    connection.query(

        sql,

        (error, resultados) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json(resultados);

        }

    );

};

module.exports = {
    crearReserva,
    obtenerReservas
};