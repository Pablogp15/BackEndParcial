const mongoose = require("mongoose")

// codLinea Entero. Número de línea. Ejemplo: 11
// nombreLinea String. Nombre de la línea.
// Ejemplo: Universidad - Alameda Principal - El Palo (P. Virginia)
// sentido Entero (1/2). Sentido del recorrido (ida/vuelta)
// orden Entero. Secuencia de la parada en la línea (no relevante)
// codParada Entero. Identificador de la parada (no relevante)
// nombreParada String. Nombre de la parada. Ejemplo: Louis Pasteur
// direccion String. Dirección de la parada. No relevante
// lon Doble. Longitud GPS de la parada. Ejemplo: -4.4222507
// lat Doble. Latitud GPS de la parada. Ejemplo: 36.737835

const paradasSchema = new mongoose.Schema({
   codLinea:{
        type: Number,
        required: true
     },
        nombreLinea:{
            type: String,
            required: true
        },
        sentido:{
            type: Number,
            required: true
        },
        orden:{
            type: Number,
            required: false
        },
        codParada:{
            type: Number,
            required: false
        },
        nombreParada:{
            type: String,
            required: true
        },
        direccion:{
            type: String,
            required: false
        },
        lon:{
            type: Number,
            required: true
        },
        lat:{
            type: Number,
            required: true        
   }
});

module.exports = mongoose.model("paradas", paradasSchema);
