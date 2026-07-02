const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
    obtenerExcursiones,
    obtenerExcursionPorId,
    crearExcursion,
    eliminarExcursion,
    actualizarExcursion
} = require("../controllers/excursionesController");

// Configuración unificada de campos para Multer
const cargarArchivosExcursion = upload.fields([
    {
        name: "imagen",
        maxCount: 1
    },
    {
        name: "fotos",
        maxCount: 10
    }
]);

// Rutas de lectura
router.get("/", obtenerExcursiones);
router.get("/:id", obtenerExcursionPorId);

// Ruta de creación (con subida de imagen principal y galería)
router.post("/", cargarArchivosExcursion, crearExcursion);

// CORREGIDO: Ruta de actualización ahora acepta los mismos campos para evitar el crash de Multer
router.put("/:id", cargarArchivosExcursion, actualizarExcursion);

// Ruta de eliminación
router.delete("/:id", eliminarExcursion);

module.exports = router;