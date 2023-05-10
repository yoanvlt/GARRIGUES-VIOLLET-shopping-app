const pathname = window.location.pathname;
  const match = pathname.match(/\/stussy\/(\d+)/);
  const id = match ? match[1] : null; 
  
      fetch (`http://localhost:3000/shop/${id}`)
        .then(response => response.json())
        .then(data => {
          const pictureDetails = document.getElementById('picture-details')
          pictureDetails.innerHTML = `
            <img src="${data.img_1}" alt="${data.name}" />
            <img src="${data.img_2}" alt="${data.name}" />
          `
        })
        .catch(error => console.log(error))

        fetch (`http://localhost:3000/shop/${id}`)
        .then(response => response.json())
        .then(data => {
          const itemsDetails = document.getElementById('items-details')
          itemsDetails.innerHTML = `
          <h1>${data.name}</h1>
            <p>${data.price}€</p> 
            <p>${data.materials}</p>
            <p>${data.color}</p>
            <p>${data.description}</p>
          `
        })
        .catch(error => console.log(error))

