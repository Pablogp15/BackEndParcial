const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")
const multer = require('multer');
const fileUpload = multer();
const cloudinary = require('cloudinary');

const app = express();
const port = 5001;
app.use(express.json());
app.use(cors());
cloudinary.config({ 
  cloud_name: 'dgqruvvjr', 
  api_key: '961825855861132', 
  api_secret: 'OMToah82AGwg_ZlI5FiSZ2IYQOU' 
});

const logConexionesRoutes = require("./routes/logConexionsRoutes");
const pardasRoutes = require("./routes/paradasRoutes");
app.use("/logConexiones", logConexionesRoutes);
app.use("/paradas", pardasRoutes);

app.post('/subir', fileUpload.single('imagen'), function (req, res, next) {
  let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (result, error) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
  };

  async function upload(req) {
    try {
      let result = await streamUpload(req);
      res.status(200).json({ message: 'Imagen subida correctamente', imageUrl: result.url});
    } catch (error) {
      console.log('Error al subir la imagen: ', error)
      res.status(500).json({ message: 'Error al subir la imagen:', error});
    }
  }

  upload(req);
});

mongoose.connect(
  "mongodb+srv://grupoWeb:grupoWeb@cluster0.1cxeafx.mongodb.net/examenWeb").then(()=>
    console.log("Hemos conectado con mongoDB")
  ).catch((error)=>
    console.error(error)
  )

app.get("/",(req,res) =>{
  res.send("Esta es la API prueba")}
)

app.listen(port, console.log("Servidor Backend escuchando en el puerto ", port))