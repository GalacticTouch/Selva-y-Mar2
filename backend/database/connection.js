const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    port: process.env.DB_PORT

});

connection.connect((error) => {

    if (error) {

        console.log(
            "Error de conexión:"
        );

        console.log(error);

        return;
    }

    console.log(
        "Conectado a MySQL correctamente"
    );

});

module.exports = connection;