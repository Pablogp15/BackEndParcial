
const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const pagosSchema = require("../models/pagos.js");

// Rutas de pagos
router.get("/", async (req, res) => {
    pagosSchema.find().then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

//Get by id
router.get("/:id", async (req, res) => {
    pagosSchema.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

router.post('/', (req, res) => {
    pagosSchema.create(req.body).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    pagosSchema
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
});

router.get("/ordenado/des", async (req, res) => {
    const data = await gastoSchema.find();
    // Ordenar los resultados en el lado del cliente
    const sortedData = data.sort((a, b) => b.timestamp - a.timestamp);
    res.json(sortedData);
}
);

router.get("/proximos/:lat/:lon", async (req, res) => {
    pagosSchema.find().then((data) => {
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
