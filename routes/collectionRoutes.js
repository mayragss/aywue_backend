const express = require("express");
const CollectionController = require("../controller/collectionController");

const router = express.Router();

router.get("/:id", CollectionController.getById);
router.post("/", CollectionController.create);

module.exports = router;
