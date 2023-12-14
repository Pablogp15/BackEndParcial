const mongoose = require("mongoose")


const eventosSchema = new mongoose.Schema({
    anfitrion: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        require: true
    },
    inicio: {
        type: Date,
        require: true
    },
    duracion: {
        type: Number,
        require: true
    },
    invitados: {
        type: [String],
        default: []
    }
    
});
module.exports = mongoose.model("eventos", eventosSchema);
