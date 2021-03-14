const express = require('express')
const app = express()
const port = 3000

var fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/registrarPersona', (req, res) => {
    console.log("Nombre a registrar: " + req.body.Nombre);
    console.log("Ciudad a registrar: " + req.body.Ciudad);
    var base64Data = req.body.Cedula.replace(/^data:image\/png;base64,/, "");
    fs.writeFile('./subida/cedula_'+req.body.Nombre+'_'+req.body.Ciudad+'.png', base64Data, 'base64', function(err) {
      if(err){
        console.log(err);
      }
      });
    res.send('Registrado!!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})