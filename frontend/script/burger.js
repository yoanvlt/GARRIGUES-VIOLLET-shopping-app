const burger = document.querySelector('.DisplayBurger');
const menu = document.querySelector('.NavBurger');
const overlay = document.querySelector('#NavBurger2');


burger.addEventListener('mouseenter', () => {
    menu.classList.toggle('open');
    overlay.classList.toggle('open');
});

overlay.addEventListener('mouseenter', () => {
    menu.classList.remove('open');
    overlay.classList.remove('open');
});

menu.addEventListener('mouseleave', () => {
    menu.classList.remove('open');
    overlay.classList.remove('open');
});

document.addEventListener('DOMContentLoaded', function() {
    var closeButton = document.querySelector('.NavBurger-close');
    var nav = document.querySelector('.NavBurger');
    closeButton.addEventListener('click', function() {
        nav.classList.remove('open');
    });
});