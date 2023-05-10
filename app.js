/* Création des constantes pour créer le serveur express */
const express = require('express');
const app = express();
const port = 3000;
const data = require('./data.json');

/* Permet de lier l'htm avec le css et js */
app.use(express.static('frontend'));

app.listen(port, () => {
  console.log('Serveur en écoute sur le port '+ port,'!');
});

/* Création des routes pour accèder au page html */
app.get('/shop', (req, res) => {
  res.sendFile(__dirname + '/frontend/shop.html');
});

app.get('/shop/:id', (req, res) => {
  const id = req.params.id;
  const clothes = data.clothes;

  const stussy = clothes.find((stussy) => {
    return stussy.id == id;
  }
  );
  res.json(stussy);
});

app.get('/stussy', (req, res) => {
  const stussy = data.clothes;
  res.json(stussy);
});


app.get('/cart', (req, res) => {
  res.sendFile(__dirname + '/frontend/cart.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

app.get('/stussy/:id', (req, res) => {
  res.sendFile(__dirname + '/frontend/template.html');
});

/* Gestion d'érreur 404 */

app.use((req, res, next) => {
  res.status(404).send("Désolé, cette page n'existe pas.");
});

