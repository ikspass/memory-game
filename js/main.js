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

const leadersTableButton = document.createElement('button');
leadersTableButton.classList = 'main-button';
leadersTableButton.textContent = 'Таблица лидеров';

buttonsContainer.append(newGameButton, leadersTableButton);

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
movesSpan.textContent = '0';
movesSpan.id = 'moves';

const pairsCounterParagraph = document.createElement('p');
pairsCounterParagraph.textContent = 'Пары: ';
const pairsSpan = document.createElement('span');
pairsSpan.textContent = '0/0'
pairsSpan.id = 'pairs';

movesCounterParagraph.append(movesSpan);
pairsCounterParagraph.append(pairsSpan);

counterContainer.append(movesCounterParagraph, pairsCounterParagraph);

const cardsContainer = document.createElement('div');
cardsContainer.classList = 'cards-container'

for (let i = 0; i < 16; i++) {
  const card = document.createElement('div');
  card.classList = 'card';

  const cardInner = document.createElement('div');
  cardInner.classList = 'card-inner';

  const cardFront = document.createElement('div');
  cardFront.classList = 'card-front';

  const cardBack = document.createElement('div');
  cardBack.classList = 'card-back';

  const cardImg = document.createElement('div');
  cardImg.textContent = '🌺';

  cardFront.append(cardImg);
  cardInner.append(cardFront, cardBack);
  card.append(cardInner);
  cardsContainer.append(card);
}

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



document.body.append(pageHeader);

document.body.append(pageMain);
document.body.append(pageFooter);