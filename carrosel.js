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

  // Evento de redimensionamento para atualizar o carrossel quando a largura da janela for alterada
  window.addEventListener('resize', debounce(updateSliderPosition, 200)); // Use debounce para evitar chamadas excessivas durante o redimensionamento

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
  const slider = document.getElementById('slickSlider'); // Adicionado para garantir a referência correta ao elemento slider
  const cardWidth = slider.firstElementChild.offsetWidth;
  const containerWidth = slider.offsetWidth;
  const numVisibleCards = Math.floor(containerWidth / cardWidth); // Calcula o número de cards visíveis

  const totalWidth = numCards * cardWidth;
  let translateValue = -currentIndex * (cardWidth / numVisibleCards) + (containerWidth - cardWidth) / 2;

  // Ajuste para garantir que todos os cards estejam visíveis em resoluções menores
  if (containerWidth < totalWidth) {
    slider.style.transition = 'none'; // Remover a transição para evitar problemas de animação
    translateValue = 0;
  } else {
    slider.style.transition = 'transform 0.6s ease-out'; // Adiciona uma transição suave
  }

  slider.style.transform = `translateX(${translateValue}px)`;
}

// Função de debounce para controlar a frequência das chamadas de redimensionamento
function debounce(func, wait) {
  let timeout;
  return function executedFunction() {
    const later = () => {
      clearTimeout(timeout);
      func();
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
