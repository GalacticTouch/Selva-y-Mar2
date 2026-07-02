const express = require("express");
const router = express.Router();

// Importamos ambas funciones desde el controlador de reservas
const {
    crearReserva,
    obtenerReservas
} = require("../controllers/reservasController");

// Ruta para crear una nueva reserva (POST)
router.post("/", crearReserva);

// Ruta para obtener el listado de todas las reservas (GET)
router.get("/", obtenerReservas);

module.exports = router;