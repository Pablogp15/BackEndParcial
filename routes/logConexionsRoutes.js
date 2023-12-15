//CRUD DE LOG CONEXIONES
const express = require('express');
const router = express.Router();
const LogConexiones = require('../models/logConexiones');
// GET ALL
router.get('/', async (req, res) => {
    try {
        const logConexiones = await LogConexiones.find();
        res.json(logConexiones);
    }
    catch (err) {
        res.json({ message: err });
    }
});
// GET ONE
router.get('/:id', async (req, res) => {
    try {
        const logConexiones = await LogConexiones.findById(req.params.id);
        res.json(logConexiones);
    }
    catch (err) {
        res.json({ message: err });
    }
});
// POST
router.post('/', async (req, res) => {
    const logConexiones = new LogConexiones({
        timestamp: req.body.timestamp,
        usuario: req.body.usuario,
        caducidad: req.body.caducidad,
        token: req.body.token
    });
    try {
        const savedLogConexiones = await logConexiones.save();
        res.json(savedLogConexiones);
    }
    catch (err) {
        res.json({ message: err });
    }
});
// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const removedLogConexiones = await LogConexiones.remove({ _id: req.params.id });
        res.json(removedLogConexiones);
    }
    catch (err) {
        res.json({ message: err });
    }
});
// PUT
router.put('/:id', async (req, res) => {
    try {
        const updatedLogConexiones = await LogConexiones.updateOne({ _id: req.params.id }, {
            $set: {
                timestamp: req.body.timestamp,
                usuario: req.body.usuario,
                caducidad: req.body.caducidad,
                token: req.body.token
            }
        });
        res.json(updatedLogConexiones);
    }
    catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;