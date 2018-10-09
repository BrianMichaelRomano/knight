import { initGame, onResetGameClicked, onActionBtnClicked } from './game.js';

initGame();

document.addEventListener('click', onActionBtnClicked);

document
  .querySelector('#resetGame')
  .addEventListener('click', onResetGameClicked);
