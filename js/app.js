import {
  initGame,
  onBasicAttackClicked,
  onFeignAttackClicked,
  onExploitArmorAttackClicked,
  onbleedAttackClicked,
  onResetGameClicked
} from './game.js';

initGame();

document
  .querySelector('#basicAttack')
  .addEventListener('click', onBasicAttackClicked);

document
  .querySelector('#feignAttack')
  .addEventListener('click', onFeignAttackClicked);

document
  .querySelector('#exploitArmorAttack')
  .addEventListener('click', onExploitArmorAttackClicked);

document
  .querySelector('#bleedAttack')
  .addEventListener('click', onbleedAttackClicked);

document
  .querySelector('#resetGame')
  .addEventListener('click', onResetGameClicked);
