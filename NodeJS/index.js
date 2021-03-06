const express = require('express')
const app = express()
const port = 3000
const redis = require('redis');
const mongoose = require('mongoose');
var fs = require('fs');
var ipConBD = '192.168.0.18';
var cloudinary = require('cloudinary').v2;
var ruteInCloudinary = "";


cloudinary.config({
  cloud_name: 'santiagososareyes',
  api_key: '862148536718167',
  api_secret: 'cxyfw959UDTjfsX9p89rjrST1Iw'
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://' + ipConBD + ':27017/mibasededatos', {useNewUrlParser: true, useUnifiedTopology: true});

var schema = mongoose.Schema({
  "Nombre": {type:String},
  "Ciudad": {type:String},
  "Cedula": {type:String}
});

var usuario = mongoose.model('usuarios',schema);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Se conecto a la base de datos en: ' + ipConBD);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/registrarPersona', (req, res) => {
  var nombreP = req.body.Nombre;
  var ciudadP = req.body.Ciudad;
  var cedulaP = req.body.Cedula;
  console.log("Nombre a registrar: " + nombreP);
  console.log("Ciudad a registrar: " + ciudadP);
  saveImage(cedulaP);
  sendImageToCloudinary().then(r => 
    {console.log(r);
    }).catch(()=>{
      console.log('Algo salio mal: no se envio imagen Cloudinary');
  });
  saveInBD(nombreP , ciudadP , ruteInCloudinary);
  res.send('Registrado!!');
});

function saveImage(cedulaP){
  var base64Data = cedulaP.replace(/^data:image\/png;base64,/, "");
    fs.writeFile('./subida/cedula.png', base64Data, 'base64', function(err) {
      if(err){
        console.log(err);
      }
    });
}


function sendImageToCloudinary(){
  return new Promise( function(resolve , reject){
    cloudinary.uploader.upload("./subida/cedula.png", function(error, result) {
      if(error){
        console.log('Imagen NO ENVIADA A CLOUDINARY');
        console.log(error);
      }else {
        ruteInCloudinary = result.url;
        console.log('Imagen enviada a cloudinary ' + ruteInCloudinary);
      }
    });
  });
  
}



function saveInBD(nombreP , ciudadP , cedulaP) {
  const ususariox = new usuario({ 
    Nombre: nombreP,
    Ciudad: ciudadP,
    Cedula: cedulaP 
  });
  ususariox.save(function (err, ususariox) {
    if (err) return console.error(err);
    console.log('Registrado en la BD: ' + ipConBD);
  });
}

function verUsuarios(){
  schema.find(function (err, usuarios) {
    if (err) return console.error(err);
    console.log(usuarios);
  });
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})