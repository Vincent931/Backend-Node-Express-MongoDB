
const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/Thing');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();
const path = require('path');

/*add your mongoDB connection here*/
mongoose.connect('mongodb+srv://...')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// (req, res, next) => {} est le middleware
//construit les requetes en json pour express
//souvent on peut rencontrer body.parse()
app.use(express.json());

//middleware de header pour toutes origines
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //to add origin to url whitelist
    //res.setHeader('Content-Security-Policy-Report-Only', "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'");
    res.setHeader('Content-Security-Policy', "script-src 'self'; connect-src https://infragrid.v.network/wallet/getnodeinfo; default-src https://infragrid.v.network/wallet/getnodeinfo; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'");
    next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

//export app express
module.exports = app;
