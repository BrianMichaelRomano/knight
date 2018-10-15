import { rollOff, diceRoll, randomNumber } from './dice.js';
import { divideBy, multiplyBy } from './utils.js';
import { bleedEffectInit, healEffectInit } from './statusEffects.js';
import state from './state.js';
import { logActionResults } from './log.js';

function basicAttack(attacker, defender) {
  const gameState = state.getState();
  const attackerObj = gameState[attacker];
  const defenderObj = gameState[defender];
  const attackDidHit = attackRoll(attackerObj, defenderObj);
  const fatigueCost = 0;
  const fatigueLost = 1;
  let damage = null;
  let logMessage;

  let canPerform = checkFatigue(attackerObj, fatigueCost);

  if (canPerform) {
    if (attackDidHit) {
      damage = damageRoll(attackerObj, defenderObj);
      if (damage > 0) {
        defenderObj.health = applyDamage(defenderObj, damage);
      }
      logMessage = `${attackerObj.name} makes a Basic Attack on ${
        defenderObj.name
      } and hits for ${damage} damage!`;
    } else {
      logMessage = `${attackerObj.name} makes a Basic Attack on ${
        defenderObj.name
      } and misses!`;
    }
    decreaseFatigue(attackerObj, fatigueLost);
  } else {
    logMessage = `${
      attackerObj.name
    } is too fatigued to perform Basic Attack...`;
  }

  logActionResults(logMessage);
  state.setState(gameState);
}

function feignAttack(attacker, defender) {
  const gameState = state.getState();
  const attackerObj = gameState[attacker];
  const defenderObj = gameState[defender];
  const attack1DidHit = attackRoll(attackerObj, defenderObj);
  const attack2DidHit = attackRoll(attackerObj, defenderObj);
  const attackDidHit = attack1DidHit && attack2DidHit;
  const fatigueCost = 3;
  let damage = null;
  let logMessage;

  let canPerform = checkFatigue(attackerObj, fatigueCost);

  if (canPerform) {
    if (attackDidHit) {
      damage = damageRoll(attackerObj, defenderObj);
      damage = multiplyBy(damage, 2);
      if (damage > 0) {
        defenderObj.health = applyDamage(defenderObj, damage);
      }
      logMessage = `${attackerObj.name} makes a Feign Attack on ${
        defenderObj.name
      } and hits for ${damage} damage!`;
    } else {
      logMessage = `${attackerObj.name} makes a Feign Attack on ${
        defenderObj.name
      } and misses!`;
    }
    increaseFatigue(attackerObj, fatigueCost);
  } else {
    logMessage = `${
      attackerObj.name
    } was too fatigued to perform Feign Attack...`;
    basicAttack(attacker, defender);
  }

  logActionResults(logMessage);
  state.setState(gameState);
}

function exploitArmorAttack(attacker, defender) {
  const gameState = state.getState();
  let attackerObj = gameState[attacker];
  let defenderObj = gameState[defender];

  const attack1DidHit = attackRoll(attackerObj, defenderObj);
  const attack2DidHit = attackRoll(attackerObj, defenderObj);
  const attackDidHit = attack1DidHit && attack2DidHit;
  const fatigueCost = 4;
  let damage = null;
  let logMessage;

  let canPerform = checkFatigue(attackerObj, fatigueCost);

  if (canPerform) {
    if (attackDidHit) {
      damage = damageRoll(attackerObj, defenderObj, true);
      damage = multiplyBy(damage, 2);
      if (damage > 0) {
        defenderObj.health = applyDamage(defenderObj, damage);
      }
      logMessage = `${attackerObj.name} makes a Exploit Armor Attack on ${
        defenderObj.name
      } and hits for ${damage} damage!`;
    } else {
      logMessage = `${attackerObj.name} makes a Exploit Armor Attack on ${
        defenderObj.name
      } and misses!`;
    }
    increaseFatigue(attackerObj, fatigueCost);
  } else {
    logMessage = `${
      attackerObj.name
    } was too fatigued to perform Exploit Armor Attack...`;
    basicAttack(attacker, defender);
  }

  logActionResults(logMessage);
  state.setState(gameState);
}

function bleedAttack(attacker, defender) {
  const gameState = state.getState();
  const gameTurn = gameState.gameTurn;
  const attackerObj = gameState[attacker];
  const defenderObj = gameState[defender];
  const attackDidHit = attackRoll(attackerObj, defenderObj);
  const fatigueCost = 2;
  let damage = null;
  let logMessage;

  let canPerform = checkFatigue(attackerObj, fatigueCost);

  if (canPerform) {
    if (attackDidHit) {
      let divisor = 2;
      let duration = 2;

      damage = damageRoll(attackerObj, defenderObj);
      damage = divideBy(damage, divisor);

      if (damage > 0) {
        defenderObj.health = applyDamage(defenderObj, damage);
      }
      defenderObj.statusEffects.push(
        bleedEffectInit(duration, damage, defenderObj, gameTurn)
      );
      logMessage = `${attackerObj.name} makes a Bleed Attack on ${
        defenderObj.name
      } and hits for ${damage} damage!`;
    } else {
      logMessage = `${attackerObj.name} makes a Bleed Attack on ${
        defenderObj.name
      } and misses!`;
    }
    increaseFatigue(attackerObj, fatigueCost);
  } else {
    logMessage = `${
      attackerObj.name
    } was too fatigued to perform Bleed Attack...`;
    basicAttack(attacker, defender);
  }

  logActionResults(logMessage);
  state.setState(gameState);
}

function healPotion(target) {
  const gameState = state.getState();
  const gameTurn = gameState.gameTurn;
  const targetObj = gameState[target];

  const healEffect = 10;

  targetObj.health = applyHealing(targetObj, healEffect);

  targetObj.statusEffects.push(
    healEffectInit(null, healEffect, targetObj, gameTurn)
  );

  const logMessage = `${targetObj.name} healed for ${healEffect}!`;

  logActionResults(logMessage);
  state.setState(gameState);
}

function attackRoll(attacker, defender) {
  return rollOff(attacker.attack, defender.defense);
}

function checkFatigue(entity, cost) {
  const totalFatigue = entity.currentFatigue + cost;
  if (totalFatigue <= entity.fatigueLimit) {
    return true;
  } else {
    false;
  }
}

function increaseFatigue(entity, cost) {
  entity.currentFatigue += cost;
}

function decreaseFatigue(entity, fatigueLost) {
  const totalFatigue = entity.currentFatigue - fatigueLost;
  if (!(totalFatigue <= 0)) {
    entity.currentFatigue -= fatigueLost;
  }
}

function damageRoll(attacker, defender, ignoreArmor) {
  let numDiceToRoll = 1;
  let damageResult = diceRoll(
    numDiceToRoll,
    attacker.weapon.minDamage,
    attacker.weapon.maxDamage
  );
  if (ignoreArmor) {
    return damageResult;
  } else {
    return damageResult - defender.armor;
  }
}

function applyDamage(defender, damage) {
  return defender.health - damage;
}

function applyHealing(target, health) {
  return target.health + health;
}

function enemyActionPhase(attacker, defender) {
  randomEnemyAction(attacker, defender);
}

function randomEnemyAction(attacker, defender) {
  const enemy = state.getState().enemy;
  const numEnemyActions = enemy.actionsAvailable.length - 1;

  const randomNum = randomNumber(0, numEnemyActions);
  actions[enemy.actionsAvailable[randomNum]](attacker, defender);
}

function fatigueRecovery() {
  console.log('Recovered from some fatigue...');
}

const actions = {
  basicAttack,
  feignAttack,
  exploitArmorAttack,
  bleedAttack,
  healPotion,
  enemyActionPhase,
  fatigueRecovery
};

export default actions;
