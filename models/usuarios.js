const mongoose = require("mongoose")

const usuariosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    contactos: {
        type: [String],
        default: []
    }
    
});
module.exports = mongoose.model("usuarios", usuariosSchema);
