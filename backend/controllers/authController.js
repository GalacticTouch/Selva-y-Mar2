const connection =
require("../database/connection");

const jwt =
require("jsonwebtoken");

const login =
(req, res) => {

    const {
        usuario,
        password
    } = req.body;

    const sql =
    "SELECT * FROM usuarios WHERE usuario = ?";

    connection.query(

        sql,

        [usuario],

        (error, resultados) => {

            if (error) {

                return res
                .status(500)
                .json(error);

            }

            if (resultados.length === 0) {

                return res
                .status(401)
                .json({
                    mensaje:
                    "Usuario incorrecto"
                });

            }

            const usuarioDB =
            resultados[0];

            if (
                usuarioDB.password !==
                password
            ) {

                return res
                .status(401)
                .json({
                    mensaje:
                    "Contraseña incorrecta"
                });

            }

            const token =
            jwt.sign(

                {
                    id:
                    usuarioDB.id,

                    usuario:
                    usuarioDB.usuario
                },

                "TURISMORD_V2",

                {
                    expiresIn:
                    "8h"
                }

            );

            res.json({
                token
            });

        }

    );

};

module.exports = {
    login
};