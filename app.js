const express = require('express');
const app = express();
const port = 3000;
const data = require('./data.json');

app.use(express.static('frontend'));

app.listen(port, () => {
  console.log('Serveur en écoute sur le port ${port}');
});

app.get('/sneaker/:id', (req, res) => {
  const id = req.params.id;
  const sneakers = data.sneakers;

  const sneaker = sneakers.find((sneaker) => {
    return sneaker.id == id;
  }
  );
  res.json(sneaker);
});

app.get('/sneakers', (req, res) => {
  const sneakers = data.sneakers;
  res.json(sneakers);
}

);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/index.html');
});

app.use((req, res, next) => {
  res.status(404).send("Désolé, cette page n'existe pas.");
});