const express = require("express");
const router = express.Router();
const axios = require("axios");
const usuariosSchema = require("../models/usuarios.js");
const usuarios = require("../models/usuarios.js");
//LLAMADAS CRUD-------------------------------------------------------------------------------
// create
router.post("/", (req, res) => {
  const user = usuariosSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all
router.get("/", (req, res) => {
  usuariosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get
router.get("/:id", (req, res) => {
  const { id } = req.params;
  usuariosSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  usuariosSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update,
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email, contactos } = req.body;
  usuariosSchema
    .updateOne({ _id: id }, { $set: { nombre, email, contactos } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//getContactos
router.get("/:id/contactos", (req, res) => {
    const { id } = req.params;
    usuariosSchema
        .findById(id)
        .then((data) => res.json(data.contactos))
        .catch((error) => res.json({ message: error }));
});

// addContactoByEmail
router.post("/:id/:email", (req, res) => {
    const { id } = req.params;
    const { email } = req.params;
    usuariosSchema
        .findByIdAndUpdate(id, { $push: { contactos: email } }, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Servicios rest adicionales-------------------------------------------------------------------

//getcontactobypartedelemail
router.get("/:email/contactos/:nombre", (req, res) => {
    const { email, nombre } = req.params;
    usuariosSchema
        .findOne({ email: email })
        .then((data) => {
            const contactos = data.contactos.filter((contacto) =>
                contacto.includes(nombre)
            );
            res.json(contactos);
        })
        .catch((error) => res.json({ message: error }));
});

module.exports = router