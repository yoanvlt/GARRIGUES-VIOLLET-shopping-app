function Display(option) {
  if (option == 1) {
    displayAllItems();
}
  else if (option == "tee") {
    displayItems(option);
}
  else if (option == "longsleeve") {
    displayItems(option);
}
  else if (option == "hoodie") {
    displayItems(option);
}
  else if (option == "crewneck") {
    displayItems(option);
}
  else if (option == "jeans") {
    displayItems(option);
}
  else if (option == "shorts") {
    displayItems(option);
}
}

function displayAllItems() {
  var container = document.getElementById("container");

  fetch("http://localhost:3000/stussy")
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = "";
      data.forEach((item) => {
        var div = document.createElement("div");
        div.className = "item";

        var img = document.createElement("img");
        img.src = item.img_1; // Initially display img_2
        img.alt = item.name;

        // Switch to img_2 on mouseover
        img.addEventListener("mouseover", function() {
          img.src = item.img_2;
        });

        // Switch back to img_1 on mouseout
        img.addEventListener("mouseout", function() {
          img.src = item.img_1;
        });

        // Redirect to item details page on click
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

            
function displayItems(className) {
  var container = document.getElementById("container");
  container.innerHTML = ""; // Effacer le contenu précédent du conteneur

  fetch("http://localhost:3000/stussy")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        if (item.class === className) {
          var div = document.createElement("div");
          div.className = "item";
  
          var img = document.createElement("img");
          img.src = item.img_1; // Initially display img_2
          img.alt = item.name;
  
          // Switch to img_1 on mouseover
          img.addEventListener("mouseover", function() {
            img.src = item.img_2;
          });
  
          // Switch back to img_2 on mouseout
          img.addEventListener("mouseout", function() {
            img.src = item.img_1;
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




        

window.onload = function() {
  displayAllItems();
};



