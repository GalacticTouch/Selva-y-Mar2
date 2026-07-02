require("dotenv").config();
const express = require("express");
const cors = require("cors");
const excursionesFotosRoutes =
require(
"./routes/excursionesFotosRoutes"
);
const path =
require("path");

const authRoutes =
require(
"./routes/authRoutes"
);

const app = express();
const reservasRoutes =
require(
"./routes/reservasRoutes"
);
app.use(cors());
require("./database/connection");
const excursionesRoutes =
require(
"./routes/excursionesRoutes"
);
app.use(express.json());
app.use(
    "/uploads",
    express.static(
        path.join(
            __dirname,
            "uploads"
        )
    )
);

app.use(
"/api/excursiones",
excursionesRoutes
);
app.use(
"/api/reservas",
reservasRoutes
);
app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/excursiones-fotos",
excursionesFotosRoutes
);

app.get("/", (req, res) => {

    res.json({
        mensaje: "API TurismoRD V2"
    });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Servidor ejecutándose en puerto ${PORT}`
    );

});