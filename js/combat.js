import { rollOff, diceRoll } from './dice.js';
import { divideBy, multiplyBy } from './utils.js';
import { bleedEffectInit } from './statusEffects.js';

function basicAttack(attacker, defender) {
  const attackDidHit = attackRoll(attacker, defender);
  let damage = null;

  if (attackDidHit) {
    damage = damageRoll(attacker, defender);
    if (damage > 0) {
      applyDamage(defender, damage);
    }
  }

  return {
    attackDidHit,
    attacker,
    defender,
    damage,
    attackType: 'Basic Attack'
  };
}

function feignAttack(attacker, defender) {
  const attack1DidHit = attackRoll(attacker, defender);
  const attack2DidHit = attackRoll(attacker, defender);
  const attackDidHit = attack1DidHit && attack2DidHit;
  let damage = null;

  if (attackDidHit) {
    damage = damageRoll(attacker, defender);
    damage = multiplyBy(damage, 2);
    if (damage > 0) {
      applyDamage(defender, damage);
    }
  }

  return {
    attackDidHit,
    attacker,
    defender,
    damage,
    attackType: 'Feign Attack'
  };
}

function exploitArmorAttack(attacker, defender) {
  const attack1DidHit = attackRoll(attacker, defender);
  const attack2DidHit = attackRoll(attacker, defender);
  const attackDidHit = attack1DidHit && attack2DidHit;
  let damage = null;

  if (attackDidHit) {
    damage = damageRoll(attacker, defender, true);
    damage = multiplyBy(damage, 2);
    if (damage > 0) {
      applyDamage(defender, damage);
    }
  }

  return {
    attackDidHit,
    attacker,
    defender,
    damage,
    attackType: 'Exploit Armor Attack'
  };
}

function bleedAttack(attacker, defender, gameTurn) {
  const attackDidHit = attackRoll(attacker, defender);
  let damage = null;

  if (attackDidHit) {
    let divisor = 2;
    let duration = 3;

    damage = damageRoll(attacker, defender);
    damage = divideBy(damage, divisor);

    if (damage > 0) {
      applyDamage(defender, damage);
    }

    defender.statusEffects.push(
      bleedEffectInit(duration, damage, defender, gameTurn)
    );
  }

  return {
    attackDidHit,
    attacker,
    defender,
    damage,
    attackType: 'Bleed Attack'
  };
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
  defender.health -= damage;
}

export { basicAttack, feignAttack, exploitArmorAttack, bleedAttack };
