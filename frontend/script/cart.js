function addToCart() {
    const sizeInputs = document.getElementsByName('size');
    let size = '';
    for (let i = 0; i < sizeInputs.length; i++) {
      if (sizeInputs[i].checked) {
        size = sizeInputs[i].value;
        break;
      }
    }
    const addToCartButton = document.querySelector('.addToCart');
    if (size) {
      addToCartButton.textContent = `ADD TO BAG (${size})`;
      console.log(id, size);
      addToCartItems(id, size);
    } else {
      addToCartButton.textContent = 'PLEASE SELECT A SIZE';
    }
    setTimeout(() => {
      addToCartButton.textContent = 'ADD TO BAG';
    }, 2000);
  }

  function addToCartItems(id, size) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const item = cartItems.find(item => item.id === id && item.size === size);
    if (item) {
      item.quantity++;
    } else {
      cartItems.push({ id, size, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const listItems = document.querySelector('.list_items');
    listItems.innerHTML = '';
    cartItems.forEach(item => {
      const listItem = document.createElement('div');
      listItem.textContent = `${item.quantity} x ${item.size} - ${item.id}`;
      listItems.appendChild(listItem);
    });
  }