import { rollOff, diceRoll } from './dice.js';

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
    damage = multiply(damage, 2);
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
    damage = multiply(damage, 2);
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

function multiply(value, multiplier) {
  return value * multiplier;
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

export { basicAttack, feignAttack, exploitArmorAttack };
