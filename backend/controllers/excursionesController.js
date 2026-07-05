const connection = require("../database/connection");

const obtenerExcursiones = (req, res) => {
    const sql = "SELECT * FROM excursiones WHERE estado = 1";

    connection.query(sql, (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);

    });
};

const obtenerExcursionPorId = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM excursiones WHERE id = ?";

    connection.query(sql, [id], (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (resultados.length === 0) {

            return res.status(404).json({
                mensaje: "Excursión no encontrada"
            });

        }

        res.json(resultados[0]);

    });

};

const crearExcursion = (req, res) => {

    const {
        nombre,
        descripcion_corta,
        descripcion_larga,
        precio,
        ubicacion,
        duracion,
        incluye
    } = req.body;

    const imagen =
        req.files?.imagen
            ? req.files.imagen[0].path
            : null;

    const fotos =
        req.files?.fotos
            ? req.files.fotos
            : [];

    const sql = `
        INSERT INTO excursiones
        (
            nombre,
            descripcion_corta,
            descripcion_larga,
            precio,
            ubicacion,
            duracion,
            incluye,
            imagen
        )
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(

        sql,

        [
            nombre,
            descripcion_corta,
            descripcion_larga,
            precio,
            ubicacion,
            duracion,
            incluye,
            imagen
        ],

        (error, resultado) => {

            if (error) {

                return res.status(500).json(error);

            }

            const excursionId = resultado.insertId;

            if (fotos.length > 0) {

                const sqlFotos = `
                    INSERT INTO excursiones_fotos
                    (
                        excursion_id,
                        imagen
                    )
                    VALUES
                    (?, ?)
                `;

                fotos.forEach((foto) => {

                    connection.query(

                        sqlFotos,

                        [
                            excursionId,
                            foto.path
                        ]

                    );

                });

            }

            res.json({

                mensaje: "Excursión creada",

                id: excursionId

            });

        }

    );

};

const eliminarExcursion = (req, res) => {

    const { id } = req.params;

    const sqlReservas =
        "DELETE FROM reservas WHERE excursion_id = ?";

    connection.query(

        sqlReservas,

        [id],

        (error) => {

            if (error) {

                return res.status(500).json(error);

            }

            const sqlFotos =
                "DELETE FROM excursiones_fotos WHERE excursion_id = ?";

            connection.query(

                sqlFotos,

                [id],

                (error) => {

                    if (error) {

                        return res.status(500).json(error);

                    }

                    const sqlExcursion =
                        "DELETE FROM excursiones WHERE id = ?";

                    connection.query(

                        sqlExcursion,

                        [id],

                        (error) => {

                            if (error) {

                                return res.status(500).json(error);

                            }

                            res.json({

                                mensaje:
                                    "Excursión eliminada correctamente"

                            });

                        }

                    );

                }

            );

        }

    );

};

const actualizarExcursion = (req, res) => {

    const { id } = req.params;

    const {

        nombre,
        descripcion_corta,
        descripcion_larga,
        precio,
        ubicacion,
        duracion,
        incluye

    } = req.body;

    const imagen =
        req.files?.imagen
            ? req.files.imagen[0].path
            : null;

    const fotos =
        req.files?.fotos
            ? req.files.fotos
            : [];

    let sql;

    let params;

    if (imagen) {

        sql = `
            UPDATE excursiones
            SET
                nombre = ?,
                descripcion_corta = ?,
                descripcion_larga = ?,
                precio = ?,
                ubicacion = ?,
                duracion = ?,
                incluye = ?,
                imagen = ?
            WHERE id = ?
        `;

        params = [

            nombre,
            descripcion_corta,
            descripcion_larga,
            precio,
            ubicacion,
            duracion,
            incluye,
            imagen,
            id

        ];

    } else {

        sql = `
            UPDATE excursiones
            SET
                nombre = ?,
                descripcion_corta = ?,
                descripcion_larga = ?,
                precio = ?,
                ubicacion = ?,
                duracion = ?,
                incluye = ?
            WHERE id = ?
        `;

        params = [

            nombre,
            descripcion_corta,
            descripcion_larga,
            precio,
            ubicacion,
            duracion,
            incluye,
            id

        ];

    }

    connection.query(

        sql,

        params,

        (error) => {

            if (error) {

                return res.status(500).json(error);

            }

            if (fotos.length > 0) {

                const sqlFotos = `
                    INSERT INTO excursiones_fotos
                    (
                        excursion_id,
                        imagen
                    )
                    VALUES
                    (?, ?)
                `;

                fotos.forEach((foto) => {

                    connection.query(

                        sqlFotos,

                        [
                            id,
                            foto.path
                        ]

                    );

                });

            }

            res.json({

                mensaje:
                    "Excursión actualizada"

            });

        }

    );

};

module.exports = {

    obtenerExcursiones,
    obtenerExcursionPorId,
    crearExcursion,
    eliminarExcursion,
    actualizarExcursion

};