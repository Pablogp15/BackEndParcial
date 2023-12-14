const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config({ path: "./config.env" });
const app = express();


const port = process.env.PORT;
app.use(express.json());

const usuarioRoutes = require("./routes/usuarioRoutes.js")
app.use('/usuarios', usuarioRoutes);

const eventosRoutes = require("./routes/eventosRoutes.js")
app.use('/eventos', eventosRoutes);

const maparoutes = require("./routes/mapRouter.js")
app.use('/mapa', maparoutes);

const cloudinaryroutes = require("./routes/cloudinaryroutes.js")
app.use('/cloudinary', cloudinaryroutes);

mongoose.connect(
  process.env.ATLAS_URI).then(()=>
    console.log("Hemos conectado con mongoDB")
  ).catch((error)=>
    console.error(error)
  )

app.get("/",(req,res) =>{
  res.send("Esta es la API")}
)
app.listen(port, console.log("Servidor de Productos escuchando en el puerto ", port))