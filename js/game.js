import { skeleton, knight, rat } from './entities.js';
import state from './state.js';
import {
  basicAttack,
  feignAttack,
  exploitArmorAttack,
  bleedAttack
} from './combat.js';
import { logAttackResults } from './log.js';
import { resolveStatusEffects } from './statusEffects.js';

function initGame(reset) {
  const defaultGameState = {
    knight: knight,
    enemy: rat,
    gameTurn: 0
  };

  if (reset) {
    state.setState(defaultGameState);
    console.log('New Game Initialized...');
  }

  if (!state.getState()) {
    state.setState(defaultGameState);
    console.log('New Game Initialized...');
  }
}

function onResetGameClicked() {
  initGame(true);
}

function onBasicAttackClicked() {
  console.log('Player Turn...');
  const gameState = state.getState();
  let attackResults = basicAttack(gameState.knight, gameState.enemy);
  state.setState(gameState);
  logAttackResults(attackResults);
  enemyTurn();
}

function onFeignAttackClicked() {
  console.log('Player Turn...');
  const gameState = state.getState();
  let attackResults = feignAttack(gameState.knight, gameState.enemy);
  state.setState(gameState);
  logAttackResults(attackResults);
  enemyTurn();
}

function onExploitArmorAttackClicked() {
  console.log('Player Turn...');
  const gameState = state.getState();
  let attackResults = exploitArmorAttack(gameState.knight, gameState.enemy);
  state.setState(gameState);
  logAttackResults(attackResults);
  enemyTurn();
}

function onbleedAttackClicked() {
  console.log('Player Turn...');
  const gameState = state.getState();
  let attackResults = bleedAttack(
    gameState.knight,
    gameState.enemy,
    gameState.gameTurn
  );
  state.setState(gameState);
  logAttackResults(attackResults);
  enemyTurn();
}

function statusEffectPhase(entity) {
  const gameState = state.getState();
  const gameTurn = gameState.gameTurn;

  if (gameState[entity].statusEffects.length > 0) {
    const updatedEntity = resolveStatusEffects(
      { ...gameState[entity] },
      gameTurn
    );
    gameState[entity] = updatedEntity;
    state.setState(gameState);
  }
}

function enemyTurn() {
  console.log('Enemy Turn...');
  const gameState = state.getState();
  let attackResults = basicAttack(gameState.enemy, gameState.knight);
  state.setState(gameState);
  logAttackResults(attackResults);
  endGameTurn();
}

function endGameTurn() {
  console.log('Game Turn end...');
  let gameState = state.getState();
  gameState.gameTurn++;
  state.setState(gameState);
  statusEffectPhase('knight');
  statusEffectPhase('enemy');
  gameState = state.getState();
  console.log('Game Turn', gameState.gameTurn);
  console.log(gameState.knight.name, gameState.knight.health);
  console.log(gameState.enemy.name, gameState.enemy.health);
}

export {
  initGame,
  onBasicAttackClicked,
  onFeignAttackClicked,
  onExploitArmorAttackClicked,
  onbleedAttackClicked,
  onResetGameClicked
};
