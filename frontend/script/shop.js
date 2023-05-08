document.addEventListener("DOMContentLoaded", () => {
  afficherItems();
});

function afficherItems() {
  const url = "http://localhost:3000/stussy";
  const container = document.getElementById("container");

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données.");
      }
      return response.json();
    })
    .then(data => {
      data.forEach(item => {
        const element = document.createElement("div");
        element.innerHTML = `
          <h2>${item.name}</h2>
          <img src="${item.img_1}" alt="${item.name}">
          <img src="${item.img_2}" alt="${item.name}">
          <p>${item.description}</p>
          <p>${item.price} €</p>
          <button onclick="ajouterAuPanier('${item.name}', ${item.price})">Ajouter au panier</button>
        `;
        container.appendChild(element);
      });
    })
    .catch(error => console.log(error.message));
}

// Fonction pour ajouter un article au panier
function ajouterAuPanier(nom, prix) {
  // Récupérer le panier depuis localStorage
  const panier = JSON.parse(localStorage.getItem('panier')) || [];

  // Ajouter l'article au panier
  panier.push({ nom: nom, prix: prix });

  // Enregistrer le panier dans localStorage
  localStorage.setItem('panier', JSON.stringify(panier));

  // Mettre à jour l'affichage du panier
  afficherPanier();
}

function afficherPanier() {
  const panier = JSON.parse(localStorage.getItem('panier')) || [];

  const listePanier = document.getElementById('liste-panier');
  listePanier.innerHTML = '';
  panier.forEach(item => {
    const element = document.createElement('li');
    element.innerText = item.nom + ' - ' + item.prix;
    listePanier.appendChild(element);
  });

  const nbElementsPanier = document.getElementById('nb-elements-panier');
  nbElementsPanier.innerText = panier.length.toString();
  ajouterBoutonViderPanier();
}

function ajouterBoutonViderPanier() {
  const container = document.getElementById("container");

  const boutonViderPanier = document.createElement("button");
  boutonViderPanier.innerText = "Vider le panier";
  boutonViderPanier.addEventListener("click", () => {
    localStorage.removeItem("panier");
    afficherPanier();
  });

  container.appendChild(boutonViderPanier);
}


window.addEventListener('load', afficherPanier);
