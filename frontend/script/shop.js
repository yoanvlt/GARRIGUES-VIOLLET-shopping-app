
/* Création des constantes pour les filtres sur les vêtements */
let FiltreStart = [];
let Options = ['tee', 'longsleeve', 'hoodie', 'crewneck', 'jeans', 'shorts'];

/* Fonction qui permet de cocher ou décocher tous les filtres */
function Display(option) {
  let Checkbox = document.getElementById("all");

  if (option == 1) {
    FiltreStart = [];
    Checkbox.checked = true;
    Options.forEach(opt => document.getElementById(opt).checked = false);
    displayAllItems();
  } else {
    let index = FiltreStart.indexOf(option);
    let optionCheckbox = document.getElementById(option);

    if (index > -1) {
      FiltreStart.splice(index, 1);
      optionCheckbox.checked = false;
    } else {
      FiltreStart.push(option);
      optionCheckbox.checked = true;
    }
    if (FiltreStart.length === 0) {
      Checkbox.checked = true;
      displayAllItems();
    } else {  
      Checkbox.checked = false;
    }

    displayFiltreItems();
  }
}

let FiltreCouleurs = [];


/* Fonction qui filtres les couleurs et coche et décoche */

function DisplayColor(color) {
  let index = FiltreCouleurs.indexOf(color);

  if (index > -1) {
    FiltreCouleurs.splice(index, 1);
    document.getElementById(color).checked = false;
  } else {
    FiltreCouleurs.push(color);
    document.getElementById(color).checked = true;
  }

  displayFiltreItems();
}

let prix = null;  

/* Fonction qui permet de trier les prix par ordre croissant ou décroissant */

function DisplayPrice(sortOrder) {
  if (sortOrder == 'croissant' || sortOrder == 'decroissant') {
    prix = sortOrder;
    document.getElementById(sortOrder).checked = true;
    document.getElementById(sortOrder == 'croissant' ? 'decroissant' : 'croissant').checked = false;
  } else {
    prix = null;
  }

  displayFiltreItems();
}

/* Fonction qui permet d'afficher tout les filtres avec le + */
document.getElementById("toggleFilters").addEventListener("click", function() {
  let FiltreSup = document.getElementById("FiltreSup");
  let Boutton = document.getElementById("toggleFilters");
  
  if (FiltreSup.classList.contains("hidden")) {
    FiltreSup.classList.remove("hidden");
    Boutton.textContent = "-";
    Boutton.style.padding = "0 6px";
  } else {
    FiltreSup.classList.add("hidden");
    Boutton.textContent = "+";
    Boutton.style.padding = "0 5px";
  }
});


/* Fonction qui permet d'afficher les items filtrés */

function displayFiltreItems() {
  var container = document.getElementById("container");
  container.innerHTML = "";

  fetch("http://localhost:3000/stussy")
    .then((response) => response.json())
    .then((data) => {
      if (prix == 'croissant') {
        data.sort((a, b) => a.price - b.price);
      } else if (prix == 'decroissant') {
        data.sort((a, b) => b.price - a.price);
      }

      var FiltreItems = data.filter((item) => {
        return (FiltreStart.includes(item.class) || FiltreStart.length == 0) &&(FiltreCouleurs.includes(item.color) || FiltreCouleurs.length == 0);
      });

      if (FiltreItems.length === 0) {
        var texte = document.createElement("div");
        texte.textContent = "No results found";
        texte.style.textAlign = "center";
        container.appendChild(texte);
      } else {
        FiltreItems.forEach((item) => {
          var div = document.createElement("div");
          div.className = "item";

          var img = document.createElement("img");
          img.src = item.img_1;
          img.alt = item.name;

          img.addEventListener("mouseover", function() {
            img.src = item.img_2;
          });

          img.addEventListener("mouseout", function() {
            img.src = item.img_1;
          });

          img.addEventListener("click", function() {
            window.location.href = "http://localhost:3000/stussy/" + item.id;
          });

          var h2 = document.createElement("h2");
          h2.textContent = item.name;

          var p = document.createElement("p");
          if (item.promo && item.promo != 0) {
            var ancienPrix = document.createElement("span");
            ancienPrix.style.textDecoration = "line-through";
            ancienPrix.textContent = item.price + " € ";
            ancienPrix.style.marginRight = "10px";
            
            var nouveauPrix = document.createElement("span");
            nouveauPrix.style.color = "red";
            nouveauPrix.textContent = item.promo + " €";

            p.appendChild(ancienPrix);
            p.appendChild(nouveauPrix);
          } else {
            p.textContent = item.price + " €";
          }

          div.appendChild(img);
          div.appendChild(h2);
          div.appendChild(p);

          container.appendChild(div);
        });
      }
    });
}


/* Fonction qui permet d'afficher tout les items */

function displayAllItems() {
  var container = document.getElementById("container");
  container.innerHTML = "";

  fetch("http://localhost:3000/stussy")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        var div = document.createElement("div");
        div.className = "item";

        var img = document.createElement("img");
        img.src = item.img_1;
        img.alt = item.name;

        img.addEventListener("mouseover", function() {
          img.src = item.img_2;
        });

        img.addEventListener("mouseout", function() {
          img.src = item.img_1;
        });

        img.addEventListener("click", function() {
          window.location.href = "http://localhost:3000/stussy/" + item.id;
        });

        var h2 = document.createElement("h2");
        h2.textContent = item.name;

        var p = document.createElement("p");
        if (item.promo && item.promo != 0) {
          var ancienPrix = document.createElement("span");
          ancienPrix.style.textDecoration = "line-through";
          ancienPrix.textContent = item.price + " € ";
          ancienPrix.style.marginRight = "10px";

          var nouveauPrix = document.createElement("span");
          nouveauPrix.style.color = "red";
          nouveauPrix.textContent = item.promo + " €";

          p.appendChild(ancienPrix);
          p.appendChild(nouveauPrix);
        } else {
          p.textContent = item.price + " €";
        }

        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        container.appendChild(div);
      });
    });
}


window.onload = function() {
  displayAllItems();
};
