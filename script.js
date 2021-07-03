let selectedLi;
let target = '';
let ul = document.querySelector('.page__levels');
let button = document.querySelector('.page__button');
let startGame = document.querySelector('.page');
let pageGame = document.querySelector('.game');
let gameCards;
let gameCardInners;
let active = document.querySelector('.active');;


ul.onclick = function (event) {
  target = event.target;
  higthLight(target);
}


function higthLight(element) {
  if (selectedLi) selectedLi.classList.remove('page__levels_element-active');
  selectedLi = element;
  selectedLi.classList.add('page__levels_element-active');
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function createCard(array) {
  for (let i = 0; i < array.length; i++) {
    let card = document.createElement('div');
    let cardInner = document.createElement('div');
    let cardFront = document.createElement('div');
    let cardBack = document.createElement('div');
    let imageFront = new Image();
    let imageBack = new Image();

    card.className = 'game-card';
    pageGame.appendChild(card);

    cardInner.className = 'game-card__inner';
    card.appendChild(cardInner);

    cardFront.className = 'game-card__front';
    cardInner.appendChild(cardFront);
    imageFront.src = './img/card.png';
    imageFront.classList.add('game-card__image');
    cardFront.appendChild(imageFront);

    cardBack.className = 'game-card__back';
    cardInner.appendChild(cardBack);
    if (array[i] === 1) {
      imageBack.src = './img/bug.png';
    } else {
      imageBack.src = './img/end.png';
    }
    imageBack.classList.add('game-card__image');
    cardBack.appendChild(imageBack);
  }
}


button.addEventListener('click', () => {
  let array;
  let easy = [1, 0, 0];
  let middle = [1, 0, 0, 0, 0, 0];
  let hard = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (target.innerHTML === 'Простой' || target.innerHTML === undefined) {
    array = easy;
    pageGame.classList.add('easy');
    document.body.classList.add('body');
    pageGame.classList.remove('medium');
    pageGame.classList.remove('hard');
  }
  if (target.innerHTML === 'Средний') {
    array = middle;
    pageGame.classList.add('medium');
    document.body.classList.add('body');
    pageGame.classList.remove('easy');
    pageGame.classList.remove('hard');
  }
  if (target.innerHTML === 'Сложный') {
    array = hard;
    pageGame.classList.add('hard');
    document.body.classList.add('body');
    pageGame.classList.remove('easy');
    pageGame.classList.remove('medium');
  }
  shuffle(array);
  startGame.classList.add('visible');
  pageGame.classList.remove('visible');
  createCard(array);
  gameCards = document.querySelectorAll('.game-card');
  gameCardInners = document.querySelectorAll('.game-card__inner');
  for (let i = 0; i < gameCards.length; i++) {
    let gameCardInner = () => gameCardInners[i].classList.toggle('active');
    gameCards[i].addEventListener('click', gameCardInner, { once: true });
  }
});

document.onclick = function (event) {
  if (active !== null) {
    active.classList.toggle('active');
    startGame.classList.remove('visible');
    pageGame.classList.add('visible');



    while (pageGame.firstChild) {
      pageGame.removeChild(pageGame.firstChild);
      document.body.classList.remove('body');
    }
  }
  active = document.querySelector('.active');
}