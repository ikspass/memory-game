import { createLayout, createCard, createLeaderBoard, createModalWindow, createModalVictoryContent } from "./view.js";

const ui = createLayout();
const modal = createModalWindow();
const victoryModal = createModalVictoryContent();

function backdropOn() {
  modal.backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function backdropOff() {
  modal.backdrop.classList.remove('active');
  document.body.style.overflow = 'visible';
}

function openModalWindow(title, elem) {
  backdropOn();
  modal.modalWindow.classList.add('active');
  modal.modalTitle.textContent = title;
  modal.modalContent.append(elem);
}

function closeModalWindow() {
  backdropOff();
  modal.modalWindow.classList.remove('active');
  modal.modalContent.replaceChildren();
}



ui.newGameButton.addEventListener('click', startNewGame);
victoryModal.newGameButton.addEventListener('click', startNewGame);

ui.leaderboardButton.addEventListener('click', () => {
  openModalWindow('Таблица лидеров', fillLeaderboard());
})
modal.modalCloseButton.addEventListener('click', closeModalWindow)

function resetCardsField () {
  ui.cardsContainer.replaceChildren();

  let cards = shuffleCards();
  
  cards.map(item => {
    const card = createCard(item);
    ui.cardsContainer.append(card)
  })
}

let selectedCards = [];
let pairs = 0;
let moves = 0;

let isFieldBlocked = false;

function renderCounters() {
  ui.movesSpan.textContent = moves;
  ui.pairsSpan.textContent = pairs;
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (modal.modalWindow.classList.contains('active')) {
      closeModalWindow();
    }
  }
})

ui.cardsContainer.addEventListener('click', (event) => {
  if (isFieldBlocked) return;
  if (event.target.closest('.card')){

    const card = event.target.closest('[data-image]');

    if(card.dataset.isFound === true) return;
    if(card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    selectedCards.push(card);

    if (selectedCards.length == 2) {
      if (selectedCards[0].dataset.image == selectedCards[1].dataset.image) {
        pairs++;
        moves++;
        renderCounters();

        selectedCards.forEach(card => card.dataset.isFound = true)
        selectedCards = [];

        if (isGameEnd()) {
          gameEnding();
        }
      } else {
        moves++;
        renderCounters()
        isFieldBlocked = true;
        const cardsToFlipBack = [...selectedCards];
        selectedCards = [];

        setTimeout(() => {
          cardsToFlipBack.forEach(card => card.classList.remove('flipped'))
          isFieldBlocked = false;
        }, 700);
      }
    }
  }
})

function isGameEnd() {
  return pairs === 8 ? true : false;
}

const cards = ['🌺','🌺','🍓','🍓','🧸','🧸','💣','💣','👽','👽','🍰','🍰','🎀','🎀','🦥','🦥',];

function shuffleCards() {
  let shuffledCards = cards;
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  return shuffledCards;
}

function startNewGame() {
  if (modal.modalWindow.classList.contains('active')) {
    closeModalWindow();
  }
  pairs = 0;
  moves = 0;
  selectedCards = [];
  renderCounters();
  resetCardsField();
}

function gameEnding() {
  victoryModal.movesSpan.textContent = moves;
  openModalWindow('Победа', victoryModal.modalContent);
  storeResult(moves);
}

function storeResult(moves) { 
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;
  
  const result = {
    moves: moves,
    date: formattedDate
  }
  const data = JSON.parse(localStorage.getItem('result'));
  data.push(result);
  localStorage.setItem('result', JSON.stringify(data));
}
if (localStorage.getItem('result') === null) {
  localStorage.setItem('result', JSON.stringify([]));
} 

function fillLeaderboard() {
  console.log(JSON.parse(localStorage.getItem('result')))

  const data = JSON.parse(localStorage.getItem('result'))
  if (data.length !== 0) {
    data.sort((a, b) => {
      if (a.moves !== b.moves) {
        return a.moves - b.moves;
      } else {
        const parseDate = (dateStr) => {
          const [day, month, year] = dateStr.split('.');
          return new Date(year, month - 1, day);
        }
        return parseDate(a.date) - parseDate(b.date)
      }
    })
    
    const leaderboard = createLeaderBoard(data);
    return leaderboard.leaderboardTable;
  } else {
    const leaderboard = createLeaderBoard();
    return  leaderboard.emptyTableP
  }
}

startNewGame()