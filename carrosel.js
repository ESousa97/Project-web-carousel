document.addEventListener('DOMContentLoaded', function () {
  const numCards = 8; // Número total de cards
  const slider = document.getElementById('slickSlider');
  const arrowLeft = document.querySelector('.arrow-left');
  const arrowRight = document.querySelector('.arrow-right');

  // Adicionar eventos de mouse para os cards
  const cards = document.querySelectorAll('.icon-cards__item');
  cards.forEach(card => {
    card.addEventListener('mouseover', () => bringCardToFront(card));
  });

  function bringCardToFront(selectedCard) {
    cards.forEach(card => {
      card.style.zIndex = 1; // Coloca todos os cards no fundo
    });
    selectedCard.style.zIndex = 2; // Coloca o card selecionado na frente
  }

  // Adicionando eventos de clique para os botões de navegação
  arrowLeft.addEventListener('click', () => rotateSlider(-1));
  arrowRight.addEventListener('click', () => rotateSlider(1));

  // Inicializar o carrossel centralizando o card 1
  updateSliderPosition();
});

let currentIndex = 0;

function rotateSlider(offset) {
  currentIndex += offset;
  const maxIndex = Math.ceil(currentIndex / numCards); // Arredonda para cima o total de grupos de cards
  if (currentIndex < 0) {
    currentIndex = maxIndex * numCards - 1;
  } else if (currentIndex >= maxIndex * numCards) {
    currentIndex = 0;
  }
  updateSliderPosition();
}

function updateSliderPosition() {
  const cardWidth = slider.firstElementChild.offsetWidth;
  const containerWidth = slider.offsetWidth;
  const translateValue = -(currentIndex % numCards) * (cardWidth / 2) + (containerWidth / 2 - cardWidth / 2);
  slider.style.transition = 'transform 0.6s ease-out'; // Adiciona uma transição suave
  slider.style.transform = `translateX(${translateValue}px)`;
}
