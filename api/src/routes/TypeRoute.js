const { Router } = require("express");
const { Model } = require("sequelize");
const { getAllTypes } = require("../controllers/controller.js");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const types = await getAllTypes();
    res.status(202).send(types);
  } catch (error) {
    res.status(404).send("El error de Type es: " + error);
  }
});

module.exports = router;
