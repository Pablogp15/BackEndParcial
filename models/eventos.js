const mongoose = require("mongoose")

const eventosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    lugar: {
        type: String,
        required: true,
        trim: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lon: {
        type: Number,
        required: true,
    },
    organizador: {
        type: String,
        required: true,
        trim: true,
    },
    imagen: {
        type: String, 
        trim: true,
    },
});

module.exports = mongoose.model("eventos", eventosSchema);
