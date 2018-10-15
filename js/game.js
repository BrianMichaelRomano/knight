import { skeleton, knight, rat } from './entities.js';
import state from './state.js';
import actions from './actions.js';
import { resolveStatusEffects } from './statusEffects.js';

function initGame(reset) {
  const defaultGameState = {
    knight: knight,
    enemy: skeleton,
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
    const playerActionPhase = actions[action];

    playerActionPhase('knight', 'enemy');
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
  actions.enemyActionPhase('enemy', 'knight');
  statusEffectPhase('enemy');
  endGameTurn();
}

function endGameTurn() {
  let gameState = state.getState();
  gameState.gameTurn++;
  state.setState(gameState);
  gameState = state.getState();
  console.log('Game Turn', gameState.gameTurn);
  console.log(`
    ${gameState.knight.name}
    HP: ${gameState.knight.health}/${gameState.knight.maxHealth}
    Fatigue: ${gameState.knight.currentFatigue}/${gameState.knight.fatigueLimit}
  `);
  console.log(`
    ${gameState.enemy.name}
    HP: ${gameState.enemy.health}/${gameState.enemy.maxHealth}
    Fatigue: ${gameState.enemy.currentFatigue}/${gameState.enemy.fatigueLimit}
  `);
}

export { initGame, onResetGameClicked, onActionBtnClicked };
