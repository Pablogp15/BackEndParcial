const mongoose = require("mongoose")

const pagosSchema = new mongoose.Schema({
    concepto: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    importe: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String, 
        required: true,
    },
    lugar: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    imagen:{
        type:String,
    }
});

module.exports = mongoose.model("pagos", pagosSchema);
