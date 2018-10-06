import {
  initGame,
  onBasicAttackClicked,
  onFeignAttackClicked,
  onExploitArmorAttackClicked
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
