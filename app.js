const express = require('express');
const app = express();
const vetements = require('shop-stussy.json');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/html/index.html');
});

app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});