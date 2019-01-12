import './index.scss';

const nav = document.querySelector('.nav');
const nav__items = document.querySelectorAll('.nav__item');
const pages = document.querySelectorAll('.article > .article__item');
nav.addEventListener('click', function (event) {
  var target = event.target;
  event.target.className === '.nav__item';
  Array.prototype.slice.call(nav__items).forEach((item, index) => {
    if(item === target) {
      nav__items[index].classList.add('nav__item--selected');
      pages[index].classList.add('article__item--selected');
    } else {
      nav__items[index].classList.remove('nav__item--selected');
      pages[index].classList.remove('article__item--selected');
    }
  })
});
