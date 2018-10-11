import { rollOff, diceRoll } from './dice.js';
import { divideBy, multiplyBy } from './utils.js';
import { bleedEffectInit } from './statusEffects.js';
import state from './state.js';
import { logActionResults } from './log.js';

function basicAttack(attacker, defender) {
  const gameState = state.getState();
  const attackerObj = gameState[attacker];
  const defenderObj = gameState[defender];
  const attackDidHit = attackRoll(attackerObj, defenderObj);
  let damage = null;

  if (attackDidHit) {
    damage = damageRoll(attackerObj, defenderObj);
    if (damage > 0) {
      defenderObj.health = applyDamage(defenderObj, damage);
    }
  }

  const actionResults = {
    attackDidHit,
    attacker: attackerObj,
    defender: defenderObj,
    damage,
    attackType: 'Basic Attack'
  };

  logActionResults(actionResults);
  state.setState(gameState);
}

function feignAttack(attacker, defender) {
  const gameState = state.getState();
  const attackerObj = gameState[attacker];
  const defenderObj = gameState[defender];
  const attack1DidHit = attackRoll(attackerObj, defenderObj);
  const attack2DidHit = attackRoll(attackerObj, defenderObj);
  const attackDidHit = attack1DidHit && attack2DidHit;
  let damage = null;

  if (attackDidHit) {
    damage = damageRoll(attackerObj, defenderObj);
    damage = multiplyBy(damage, 2);
    if (damage > 0) {
      defenderObj.health = applyDamage(defenderObj, damage);
    }
  }

  const actionResults = {
    attackDidHit,
    attacker: attackerObj,
    defender: defenderObj,
    damage,
    attackType: 'Feign Attack'
  };

  logActionResults(actionResults);
  state.setState(gameState);
}

function exploitArmorAttack(attacker, defender) {
  const gameState = state.getState();
  let attackerObj = gameState[attacker];
  let defenderObj = gameState[defender];

  const attack1DidHit = attackRoll(attackerObj, defenderObj);
  const attack2DidHit = attackRoll(attackerObj, defenderObj);
  const attackDidHit = attack1DidHit && attack2DidHit;
  let damage = null;

  if (attackDidHit) {
    damage = damageRoll(attackerObj, defenderObj, true);
    damage = multiplyBy(damage, 2);
    if (damage > 0) {
      defenderObj.health = applyDamage(defenderObj, damage);
    }
  }

  const actionResults = {
    attackDidHit,
    attacker: attackerObj,
    defender: defenderObj,
    damage,
    attackType: 'Exloit Armor Attack'
  };

  logActionResults(actionResults);
  state.setState(gameState);
}

function bleedAttack(attacker, defender) {
  const gameState = state.getState();
  const gameTurn = gameState.gameTurn;
  const attackerObj = gameState[attacker];
  const defenderObj = gameState[defender];
  const attackDidHit = attackRoll(attackerObj, defenderObj);
  let damage = null;

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
  }

  const actionResults = {
    attackDidHit,
    attacker: attackerObj,
    defender: defenderObj,
    damage,
    attackType: 'Bleed Attack'
  };

  logActionResults(actionResults);
  state.setState(gameState);
}

function attackRoll(attacker, defender) {
  return rollOff(attacker.attack, defender.defense);
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

export default { basicAttack, feignAttack, exploitArmorAttack, bleedAttack };
