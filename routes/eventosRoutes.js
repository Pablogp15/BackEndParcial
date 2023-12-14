const express = require("express");
const router = express.Router();
const axios = require("axios");
const eventosSchema = require("../models/eventos.js");
const usuarios = require("../models/eventos.js");
//LLAMADAS CRUD-------------------------------------------------------------------------------
// create
router.post("/", (req, res) => {
  const user = eventosSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all
router.get("/", (req, res) => {
  eventosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get
router.get("/:id", (req, res) => {
  const { id } = req.params;
  eventosSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  eventosSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { anfitrion, descripcion, inicio, duracion, invitados } = req.body;
  eventosSchema
    .updateOne({ _id: id }, { $set: { anfitrion, descripcion, inicio, duracion, invitados } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router