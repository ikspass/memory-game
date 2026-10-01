export function createLayout() {
  // HEADER
  const pageHeader = document.createElement('header');
  pageHeader.classList = 'header';
  
  const logo = document.createElement('div');
  logo.textContent = 'Memory Game';
  
  const headerMainContainer = document.createElement('div');
  headerMainContainer.classList = 'flex-row header-container main-container';
  
  //HEADER BUTTONS
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList = 'flex-row gap-10';
  
  const newGameButton = document.createElement('button');
  newGameButton.classList = 'main-button';
  newGameButton.textContent = 'Новая игра';
  
  const leaderboardButton = document.createElement('button');
  leaderboardButton.classList = 'main-button';
  leaderboardButton.textContent = 'Таблица лидеров';
  
  buttonsContainer.append(newGameButton, leaderboardButton);
  
  pageHeader.append(headerMainContainer);
  headerMainContainer.append(logo, buttonsContainer);
  
  // MAIN
  const pageMain = document.createElement('main');
  pageMain.classList = 'main-container main';
  
  const fieldContainer = document.createElement('div');
  fieldContainer.classList = 'flex-col gap-30';
  
  const counterContainer = document.createElement('div');
  counterContainer.classList = 'flex-row gap-30';
  
  const movesCounterParagraph = document.createElement('p');
  movesCounterParagraph.textContent = 'Ходы: ';
  
  const movesSpan = document.createElement('span');
  
  const pairsCounterParagraph = document.createElement('p');
  pairsCounterParagraph.textContent = 'Пары: ';
  const pairsSpan = document.createElement('span');
  const totalPairs = document.createTextNode('/8')
  
  movesCounterParagraph.append(movesSpan);
  pairsCounterParagraph.append(pairsSpan, totalPairs);
  
  counterContainer.append(movesCounterParagraph, pairsCounterParagraph);
  
  const cardsContainer = document.createElement('div');
  cardsContainer.classList = 'cards-container'
  
  fieldContainer.append(counterContainer, cardsContainer);
  pageMain.append(fieldContainer);
  
  // FOOTER
  const pageFooter = document.createElement('footer');
  pageFooter.classList = 'footer';
  
  const footerMainContainer = document.createElement('div');
  footerMainContainer.classList = 'main-container';
  
  const footerInfo = document.createElement('a');
  footerInfo.textContent = 'Ikspass 2026';
  footerInfo.href = 'https://github.com/ikspass';
  
  footerMainContainer.append(footerInfo);
  pageFooter.append(footerMainContainer);
  
  document.body.append(pageHeader, pageMain, pageFooter);

  return {
    newGameButton,
    movesSpan,
    pairsSpan,
    leaderboardButton,
    fieldContainer,
    cardsContainer
  }
}

export function createCard(item) {
  const card = document.createElement('div');
  card.classList = 'card';
  card.id = 'card';
  card.dataset.image = item;
  card.dataset.isFound = false;

  const cardInner = document.createElement('div');
  cardInner.classList = 'card-inner';

  const cardFront = document.createElement('div');
  cardFront.classList = 'card-front';

  const cardBack = document.createElement('div');
  cardBack.classList = 'card-back';

  const cardImg = document.createElement('div');
  cardImg.textContent = card.dataset.image;

  cardFront.append(cardImg);
  cardInner.append(cardFront, cardBack);
  card.append(cardInner);

  return card;
}

export function createModalWindow() {
  const backdrop = document.createElement('div');
  backdrop.classList = 'backdrop';
  
  const modalWindow = document.createElement('div');
  modalWindow.id = 'modalWindow';
  modalWindow.classList = 'flex-col gap-20 modal-window';
  
  const modalTitle = document.createElement('p');
  modalTitle.id = 'modalTitle';
  modalTitle.classList = 'modal-title text-title';
  modalTitle.textContent = 'Заголовок';
  
  const modalCloseButton = document.createElement('button');
  modalCloseButton.id = 'modalCloseButton';
  modalCloseButton.textContent = 'Закрыть';
  modalCloseButton.classList = 'border-button';
  
  const modalContent = document.createElement('div');
  modalContent.classList = 'modal-content';
  
  modalWindow.append(modalTitle, modalContent, modalCloseButton);
  backdrop.append(modalWindow);
  document.body.prepend(backdrop);

  return {
    backdrop,
    modalWindow,
    modalTitle,
    modalContent,
    modalCloseButton
  }
}

export function createModalVictoryContent() {
  const modalContent = document.createElement('div');
  modalContent.classList = 'flex-col gap-20';

  const newGameButton = document.createElement('button');
  newGameButton.classList = 'main-button';
  newGameButton.textContent = 'Новая игра';

  const modalP = document.createElement('p');
  modalP.textContent = 'Игра завершена со следующим результатом:'
  
  const movesP = document.createElement('p');
  movesP.textContent = 'Всего ходов: ';
  const movesSpan = document.createElement('span');

  movesP.append(movesSpan);

  modalContent.append(modalP, movesP, newGameButton)

  return {
    modalContent,
    newGameButton,
    movesSpan
  };
}

export function createLeaderBoard(data = []) {
  const emptyTableP = document.createElement('p');
  emptyTableP.textContent = 'Пока нет результатов'
  emptyTableP.classList = 'empty-leaderboard'

  const leaderboardTable = document.createElement('div');
  if (data.length !== 0) {
    leaderboardTable.classList = 'table-wrapper';
    
    const leaderboard = document.createElement('table');
    leaderboard.classList = 'leaderboard';
    
    const headRow = document.createElement('tr');
    const placeHead = document.createElement('th');
    placeHead.textContent = '#';
    const movesHead = document.createElement('th');
    movesHead.textContent = 'Ходы';
    const dateHead = document.createElement('th');
    dateHead.textContent = 'Дата';


    
    headRow.append(placeHead, movesHead, dateHead);
    leaderboard.append(headRow);
    leaderboardTable.append(leaderboard);

    for (let i = 0; i < 10; i++) {
      if (data[i]) {
        const tableRow = document.createElement('tr');
        const placeColumn = document.createElement('td');
        placeColumn.textContent = i + 1;
        const movesColumn = document.createElement('td');
        console.log(data[i].moves)
        movesColumn.textContent = data[i].moves;
        const dateColumn = document.createElement('td');
        dateColumn.textContent = data[i].date;
      
        tableRow.append(placeColumn, movesColumn, dateColumn);
        leaderboard.append(tableRow);
      }
    }
  } 

  return {
    leaderboardTable,
    emptyTableP
  };
}