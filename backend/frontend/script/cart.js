/* Fonction afficher le boutton pour ajouter les items au panier */
function AjoutCart() {
  const sizeItems = document.getElementsByName('size');
  let size = '';
  for (let i = 0; i < sizeItems.length; i++) {
    if (sizeItems[i].checked) {
      size = sizeItems[i].value;
      break;
    }
  }
  const AjoutCartBouton = document.querySelector('.AjoutCart');
  if (size) {
    AjoutCartBouton.textContent = `ADD TO BAG (${size})`;
    AjoutCartItems(id, size);
  } else {
    AjoutCartBouton.textContent = 'PLEASE SELECT A SIZE';
  }
  setTimeout(() => {
    AjoutCartBouton.textContent = 'ADD TO BAG';
  }, 2000);
}

/* Fonction qui permet d'ajouter les items au panier */

function AjoutCartItems(id, size) {
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const item = cartItems.find(item => item.id === id && item.size === size);
if (item) {
  item.quantity++;
} else {
  cartItems.push({ id, size, quantity: 1 });
}
localStorage.setItem('cartItems', JSON.stringify(cartItems));

displayCartItems();
}

/* Fonction qui permet d'afficher les items dans le panier */

function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-price');
  cartItemsContainer.innerHTML = '';
  cartItems.forEach(item => {
    fetch(`http://localhost:3000/shop/${item.id}`)
      .then(response => response.json())
      .then(data => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('cart-item');
        itemContainer.innerHTML = `
          <img src="${data.img_1}" alt="${data.name}" />
          <div class="cart-item-details">
            <p>${data.name}</p>
            <p>${item.size}</p>
            <p>${item.quantity}</p>
            <p>${data.price}€</p>
          </div>
        `;
        cartItemsContainer.appendChild(itemContainer);

        const totalPrice = cartItems.reduce((acc, item) => {
          return acc + item.quantity * data.price;
        }
        , 0);
        cartTotal.innerHTML = `<h2> Total: ${totalPrice}€ </h2>`;
        const deleteItem = document.createElement('button');
        deleteItem.classList.add('delete-item');
        deleteItem.textContent = 'X';
        deleteItem.addEventListener('click', () => {
          const newCartItems = cartItems.filter(cartItem => {
            return cartItem.id !== item.id || cartItem.size !== item.size;
          });
          localStorage.setItem('cartItems', JSON.stringify(newCartItems));
          displayCartItems();
        }
        );
        itemContainer.appendChild(deleteItem);
      })
      .catch(error => console.log(error));
  });
}

displayCartItems();

