import { skeleton, knight } from './entities.js';
import state from './state.js';
import {
  basicAttack,
  feignAttack,
  exploitArmorAttack,
  bleedAttack
} from './combat.js';
import { logAttackResults } from './log.js';
import { resolveStatusEffects } from './statusEffects.js';

function initGame() {
  const defaultGameState = {
    knight,
    skeleton,
    gameTurn: 0
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

function onbleedAttackClicked() {
  console.log('Player Turn...');
  const gameState = state.getState();
  let attackResults = bleedAttack(
    gameState.knight,
    gameState.skeleton,
    gameState.gameTurn
  );
  state.setState(gameState);
  logAttackResults(attackResults);
  enemyTurn();
}

function statusEffectPhase(entity) {
  const gameState = state.getState();
  const gameTurn = gameState.gameTurn;

  if (!gameState[entity].statusEffects.length > 0) {
    console.log(`${entity} has no effects...`);
  } else {
    console.log(`${entity} has some effects...`);
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
  let attackResults = basicAttack(gameState.skeleton, gameState.knight);
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
  statusEffectPhase('skeleton');
  gameState = state.getState();
  console.log('Game Turn', gameState.gameTurn);
  console.log('Player', gameState.knight.health);
  console.log('Enemy', gameState.skeleton.health);
}

export {
  initGame,
  onBasicAttackClicked,
  onFeignAttackClicked,
  onExploitArmorAttackClicked,
  onbleedAttackClicked
};
