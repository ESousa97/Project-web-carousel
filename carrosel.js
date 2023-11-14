const numCards = 8; // Número total de cards
const slider = document.getElementById('slickSlider');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

// Clonar os cards dinamicamente
for (let i = 1; i < numCards; i++) {
  const originalCards = Array.from(slider.children);
  originalCards.forEach(originalCard => {
    const clonedCard = originalCard.cloneNode(true);
    slider.appendChild(clonedCard);
  });
}

let currentIndex = numCards - 1; // Iniciar com o último card para centralizar o card 1

function handleMouseOver(card) {
  const index = Array.from(card.parentNode.children).indexOf(card);
  const offset = index - currentIndex;
  rotateSlider(offset);
}

function rotateSlider(offset) {
  currentIndex += offset;
  const maxIndex = slider.childElementCount / numCards; // Total de cards originais
  if (currentIndex < 0) {
    currentIndex = maxIndex - 1;
  } else if (currentIndex >= maxIndex) {
    currentIndex = 0;
  }
  updateSliderPosition();
}

function updateSliderPosition() {
  const cardWidth = slider.firstElementChild.offsetWidth;
  const translateValue = -currentIndex * cardWidth;
  slider.style.transform = `translateX(${translateValue}px)`;
}

function navigateSlider(direction) {
  rotateSlider(direction);
}

// Adicionando lógica de rotação automática
function rotateSliderAutomatically() {
  rotateSlider(1); // Rotacionar para o próximo card
}

// Adicionando eventos de clique para os botões de navegação
arrowLeft.addEventListener('click', () => navigateSlider(-1));
arrowRight.addEventListener('click', () => navigateSlider(1));

if (window.innerWidth <= 768) {
  arrowLeft.style.cursor = 'default';
  arrowRight.style.cursor = 'default';
}

// Centralizando o card 1
updateSliderPosition();
