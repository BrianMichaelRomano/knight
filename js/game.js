import { skeleton, knight, rat } from './entities.js';
import state from './state.js';
import actions from './actions.js';
import { logActionResults } from './log.js';
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

function onActionBtnClicked(e) {
  const action = e.target.dataset.id;
  if (actions[action]) {
    const actionPhase = actions[action];

    actionPhase('knight', 'enemy');
    statusEffectPhase('knight');
    enemyTurn();
  }
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
  const actionPhase = actions.basicAttack;

  actionPhase('enemy', 'knight');
  statusEffectPhase('enemy');
  endGameTurn();
}

function endGameTurn() {
  let gameState = state.getState();
  gameState.gameTurn++;
  state.setState(gameState);
  gameState = state.getState();
  console.log('Game Turn', gameState.gameTurn);
  console.log(gameState.knight.name, gameState.knight.health);
  console.log(gameState.enemy.name, gameState.enemy.health);
}

export { initGame, onResetGameClicked, onActionBtnClicked };
