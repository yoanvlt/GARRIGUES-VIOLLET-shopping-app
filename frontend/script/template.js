/* Recupere l'id dans l'url */
const pathname = window.location.pathname;
const match = pathname.match(/\/stussy\/(\d+)/);
const id = match ? match[1] : null; 

/* Recupere les données de l'api et affiche la première partie des détails des vêtements */
fetch (`http://localhost:3000/shop/${id}`)
.then(response => response.json())
.then(data => {
  const itemsDetails = document.getElementById('items-details1')

  if (data.promo !== 0) {
    const nouveauPrix = data.promo;
    
    itemsDetails.innerHTML = `
      <h1>${data.name}</h1>
      <p><del>${data.price}€</del> ${nouveauPrix}€</p>
    `
  } else {
    itemsDetails.innerHTML = `
      <h1>${data.name}</h1>
      <p>${data.price}€</p>
    `
  }
})
.catch(error => console.log(error))

/* Recupere les données de l'api et affiche la deuxième partie des détails des vêtements */


fetch (`http://localhost:3000/shop/${id}`)
.then(response => response.json())
.then(data => {
  const itemsDetails = document.getElementById('items-details2')
  itemsDetails.innerHTML = `
    <p>${data.materials}</p>
    <p>${data.color}</p>
    <p>${data.description}</p>
  `
})
.catch(error => console.log(error))


/* Recupere les données de l'api et affiche les images des vêtements */

fetch(`http://localhost:3000/shop/${id}`)
.then(response => response.json())
.then(data => {
const pictureDetails = document.getElementById('picture-details')
pictureDetails.innerHTML = `
  <img id="main-image" src="${data.img_1}" alt="${data.name}" />
  <div class="thumbnail">
    <img src="${data.img_1}" alt="${data.name}" class="active" />
    <img src="${data.img_2}" alt="${data.name}" />
  </div>
`
/*  Permet l'utilisation du carousel */
const thumbnails = document.querySelectorAll('.thumbnail img');
thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', (event) => {
    thumbnails.forEach(thumb => {
      thumb.classList.remove('active');
    });
    event.target.classList.add('active');
    document.getElementById('main-image').src = event.target.src;
  });
});
})
.catch(error => console.log(error))

