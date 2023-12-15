const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const eventosSchema = require("../models/eventos.js");

// Rutas de eventos
router.get('/', (req, res) => {
    eventosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post('/', (req, res) => {
    const evento = eventosSchema(req.body);
    evento
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    eventosSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

router.get('/eventos-cercanos/:codigoPostal', (req, res) => {
    const { codigoPostal } = req.params;
    eventosSchema
      .find({ codigoPostal: codigoPostal })
      .sort({ timestamp: 1 })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

module.exports = router;
