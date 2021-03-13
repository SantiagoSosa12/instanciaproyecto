
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/registrarPersona', (req, res) => {
    console.log("Nombre a registrar: " + req.body.nombre);
    console.log("Nombre a registrar: " + req.body.ciudad);
    res.send('Registrado!!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})