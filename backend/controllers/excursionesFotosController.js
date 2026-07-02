const connection =
require("../database/connection");

const subirFoto = (req, res) => {

    const { excursion_id } =
    req.body;

    const imagen =
    req.file
    ? req.file.filename
    : null;

    if (!imagen) {

        return res.status(400).json({
            mensaje:
            "Debe seleccionar una imagen"
        });

    }

    const sql = `
    INSERT INTO excursiones_fotos
    (
        excursion_id,
        imagen
    )
    VALUES
    (?, ?)
    `;

    connection.query(

        sql,

        [
            excursion_id,
            imagen
        ],

        (error) => {

            if (error) {

                return res.status(500)
                .json(error);

            }

            res.json({

                mensaje:
                "Foto agregada"

            });

        }

    );

};

const obtenerFotos =
(req, res) => {

    const { id } =
    req.params;

    const sql = `
    SELECT *
    FROM excursiones_fotos
    WHERE excursion_id = ?
    `;

    connection.query(

        sql,

        [id],

        (error, resultados) => {

            if (error) {

                return res.status(500)
                .json(error);

            }

            res.json(
                resultados
            );

        }

    );

};

module.exports = {

    subirFoto,
    obtenerFotos

};