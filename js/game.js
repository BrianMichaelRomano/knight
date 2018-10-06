import { skeleton, knight } from './entities.js';
import state from './state.js';
import { basicAttack, feignAttack, exploitArmorAttack } from './combat.js';
import { logAttackResults } from './log.js';

function initGame() {
  const defaultGameState = {
    knight,
    skeleton
  };

  if (!state.getState()) {
    state.setState(defaultGameState);
    console.log('New Game Initialized...');
  }
}

function onBasicAttackClicked() {
  console.log('Player Turn...');
  const gameState = state.getState();
  let attackResults = basicAttack(gameState.knight, gameState.skeleton);
  state.setState(gameState);
  logAttackResults(attackResults);
  enemyTurn();
}

function onFeignAttackClicked() {
  console.log('Player Turn...');
  const gameState = state.getState();
  let attackResults = feignAttack(gameState.knight, gameState.skeleton);
  state.setState(gameState);
  logAttackResults(attackResults);
  enemyTurn();
}

function onExploitArmorAttackClicked() {
  console.log('Player Turn...');
  const gameState = state.getState();
  let attackResults = exploitArmorAttack(gameState.knight, gameState.skeleton);
  state.setState(gameState);
  logAttackResults(attackResults);
  enemyTurn();
}

function enemyTurn() {
  console.log('Enemy Turn...');
  const gameState = state.getState();
  let attackResults = basicAttack(gameState.skeleton, gameState.knight);
  state.setState(gameState);
  logAttackResults(attackResults);
  endGameTurn();
}

function endGameTurn() {
  console.log('Game Turn end...');
  const gameState = state.getState();
  console.log('Player', gameState.knight.health);
  console.log('Enemy', gameState.skeleton.health);
}

export {
  initGame,
  onBasicAttackClicked,
  onFeignAttackClicked,
  onExploitArmorAttackClicked
};
