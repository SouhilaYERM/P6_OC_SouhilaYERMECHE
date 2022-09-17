// Importations 
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require("body-parser");
const sauceRoute = require('./routes/sauceRoute')
const userRoute = require('./routes/userRoute.js')
require('dotenv').config()

//Connextion à MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Déclaration de l'application 
const app = express()
app.use(express.json())
app.use(helmet({
  crossOriginResourcePolicy: false,
}))

//CORS Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Enregistrement des Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/sauces', sauceRoute); 
app.use('/api/auth', userRoute);


//Exports 
module.exports = app;