const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();
const port = 5001;
app.use(express.json());
app.use(cors({   origin: '*',   methods: ['GET', 'POST', 'PUT', 'DELETE'],   credentials: true, }));


///Routes
const Cloudinary = require("./routes/cloudinaryRoutes.js")
const pagosRoutes = require("./routes/pagosRoutes.js")

app.use('/cloudinary', Cloudinary);
app.use('/pagos', pagosRoutes);

/////


mongoose.connect(
  "mongodb+srv://pablogp:pablogp@cluster0.kn0rtn5.mongodb.net/Parcial2").then(()=>
    console.log("Hemos conectado con mongoDB")
  ).catch((error)=>
    console.error(error)
  )

app.get("/",(req,res) =>{
  res.send("Esta es la API")}
)

app.listen(port, console.log("Servidor Backend escuchando en el puerto ", port))
