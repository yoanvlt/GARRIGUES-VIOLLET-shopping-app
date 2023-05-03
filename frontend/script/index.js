const url = "http://localhost:3000/"

const btn =   document.querySelector('button');

btn.addEventListener('click', getClothes);

function getClothes() {
    fetch(url + 'clothes')
    .then(response => {
        return response.json();
    })
    .then (data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
}