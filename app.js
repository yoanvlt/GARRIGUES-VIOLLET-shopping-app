const express = require('express');
const app = express();
const port = 3000;
const data = require('./data.json');

app.use(express.static('frontend'));

app.listen(port, () => {
  console.log('Serveur en écoute sur le port '+ port,'!');
});


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

app.use((req, res, next) => {
  res.status(404).send("Désolé, cette page n'existe pas.");
});