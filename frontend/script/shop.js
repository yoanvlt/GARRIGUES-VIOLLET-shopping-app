
let activeFilters = [];
let allOptions = ['tee', 'longsleeve', 'hoodie', 'crewneck', 'jeans', 'shorts'];

function Display(option) {
  let allCheckbox = document.getElementById("all");

  if (option == 1) {
    activeFilters = [];
    allCheckbox.checked = true;
    allOptions.forEach(opt => document.getElementById(opt).checked = false);
    displayAllItems();
  } else {
    let index = activeFilters.indexOf(option);
    let optionCheckbox = document.getElementById(option);

    if (index > -1) {
      activeFilters.splice(index, 1);
      optionCheckbox.checked = false;
    } else {
      activeFilters.push(option);
      optionCheckbox.checked = true;
    }
    if (activeFilters.length === 0) {
      allCheckbox.checked = true;
      displayAllItems();
    } else {  
      allCheckbox.checked = false;
    }

    displayFilteredItems();
  }
}


let activeColorFilters = [];

function DisplayColor(color) {
  let index = activeColorFilters.indexOf(color);

  if (index > -1) {
    activeColorFilters.splice(index, 1);
    document.getElementById(color).checked = false;
  } else {
    activeColorFilters.push(color);
    document.getElementById(color).checked = true;
  }

  displayFilteredItems();
}

let priceSort = null;  // 'croissant' or 'decroissant'

function DisplayPrice(sortOrder) {
  if (sortOrder == 'croissant' || sortOrder == 'decroissant') {
    priceSort = sortOrder;
    document.getElementById(sortOrder).checked = true;
    document.getElementById(sortOrder == 'croissant' ? 'decroissant' : 'croissant').checked = false;
  } else {
    priceSort = null;
  }

  displayFilteredItems();
}

// Add an event listener to the '+' button to toggle the display of the color and price options
document.getElementById("toggleFilters").addEventListener("click", function() {
  let extraFilters = document.getElementById("extraFilters");
  if (extraFilters.classList.contains("hidden")) {
    extraFilters.classList.remove("hidden");
  } else {
    extraFilters.classList.add("hidden");
  }
});

// Other JS code...


function displayFilteredItems() {
  var container = document.getElementById("container");
  container.innerHTML = "";

  fetch("http://localhost:3000/stussy")
    .then((response) => response.json())
    .then((data) => {
      if (priceSort == 'croissant') {
        data.sort((a, b) => a.price - b.price);
      } else if (priceSort == 'decroissant') {
        data.sort((a, b) => b.price - a.price);
      }

      data.forEach((item) => {
        if ((activeFilters.includes(item.class) || activeFilters.length == 0) &&
            (activeColorFilters.includes(item.color) || activeColorFilters.length == 0)) {
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
            var oldPrice = document.createElement("span");
            oldPrice.style.textDecoration = "line-through";
            oldPrice.textContent = item.price + " € ";
            oldPrice.style.marginRight = "10px";
            
            var newPrice = document.createElement("span");
            newPrice.style.color = "red";
            newPrice.textContent = item.promo + " €";

            p.appendChild(oldPrice);
            p.appendChild(newPrice);
          } else {
            p.textContent = item.price + " €";
          }

          div.appendChild(img);
          div.appendChild(h2);
          div.appendChild(p);

          container.appendChild(div);
        }
      });
    });
}



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
          var oldPrice = document.createElement("span");
          oldPrice.style.textDecoration = "line-through";
          oldPrice.textContent = item.price + " € ";
          oldPrice.style.marginRight = "10px";

          var newPrice = document.createElement("span");
          newPrice.style.color = "red";
          newPrice.textContent = item.promo + " €";

          p.appendChild(oldPrice);
          p.appendChild(newPrice);
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
