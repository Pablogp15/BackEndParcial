const mongoose = require("mongoose")

const usuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        },
    nombre: {
        type: String,
        required: false,
        },
});

module.exports = mongoose.model("usuarios", usuariosSchema);
