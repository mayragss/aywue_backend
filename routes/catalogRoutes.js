const express = require("express");
const CatalogController = require("../controller/catalogController");
const upload = require("../services/multerConfig"); // Arquivo de configuração do multer

const router = express.Router();

router.get("/", CatalogController.getAll);
router.get("/:id", CatalogController.getById);
router.post("/",upload.single("image"), CatalogController.create);
router.put("/:id", CatalogController.update);
router.delete("/:id", CatalogController.delete);

module.exports = router;
