const express =
require("express");

const router =
express.Router();

const upload =
require("../middleware/upload");

const {

    subirFoto,
    obtenerFotos

} = require(
"../controllers/excursionesFotosController"
);

router.post(
    "/",
    upload.single("imagen"),
    subirFoto
);

router.get(
    "/:id",
    obtenerFotos
);

module.exports =
router;