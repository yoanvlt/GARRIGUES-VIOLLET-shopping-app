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


function displayFilteredItems() {
  var container = document.getElementById("container");
  container.innerHTML = "";

  fetch("http://localhost:3000/stussy")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        if (activeFilters.includes(item.class)) {
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
          p.textContent = item.price + " €";

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
        p.textContent = item.price + " €";

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
