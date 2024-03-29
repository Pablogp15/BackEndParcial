const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require ("multer");
const cloudinary = require("cloudinary");
const streamifier = require("streamifier");


router.use(express.json());
const fileUpload = multer();


cloudinary.config({ 
  cloud_name: 'dmipwi9rx', 
  api_key: '382832142727888', 
  api_secret: '7JsGypjZkyyKHG7IPWnRnEMOOU4' 
});


router.post('/subir', fileUpload.single('imagen'), function (req, res, next) {
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


module.exports = router;