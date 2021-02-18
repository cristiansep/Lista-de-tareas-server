const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config');

const app = express();

// Database 
dbConnection();


// CORS 
app.use(cors());


// Directorio publico
app.use(express.static('public'));


// lectura y parseo del body
app.use(express.json());


// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tareas', require('./routes/tareas'));



app.listen(process.env.PORT, () => {
    console.log(`Sevidor corriendo en el puerto ${process.env.PORT}`)
});