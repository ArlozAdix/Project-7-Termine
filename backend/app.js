const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const auth = require('./middleware/auth')

 // Connexion a MongooseDB
 mongoose.connect('mongodb+srv://MasterUser:adix1234@cluster0.cw4tcgi.mongodb.net/test',
 { useNewUrlParser: true,
   useUnifiedTopology: true })
 .then(() => console.log('Connexion à MongoDB réussie !'))
 .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Gestion CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// lecture formulaire et stockage en objet accessible via req.body
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes); 

// Dossier statique pour le dossier image
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
