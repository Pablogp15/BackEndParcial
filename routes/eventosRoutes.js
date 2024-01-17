const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const eventosSchema = require("../models/eventos.js");

// Rutas de eventos
router.get("/", async (req, res) => {
    eventoSchema.find().then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Get by id
router.get("/:id", async (req, res) => {
    eventoSchema.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

router.post('/', (req, res) => {
    eventoSchema.create(req.body).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    eventosSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

router.get("/proximos/:lat/:lon", async (req, res) => {
    eventoSchema.find().then((data) => {
        let lista = [];
        data.forEach(element => {
            if (Math.abs(element.lat - req.params.lat) < 0.2 && Math.abs(element.lon - req.params.lon) < 0.2) {
                lista.push(element);
            }
        });
        lista.sort((a, b) => a.timestamp - b.timestamp);
        res.json(lista);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});
module.exports = router;
