const burger = document.querySelector('.header__burger');
          const menu = document.querySelector('.header__nav');
          const overlay = document.querySelector('#nav-div-2');
      
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