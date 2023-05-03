const url = "http://localhost:3000/"

const btn =   document.querySelector('button');

btn.addEventListener('click', getSneakers);

function getSneakers() {
    fetch(url + 'sneakers')
    .then(response => {
        return response.json();
    })
}