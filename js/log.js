function logActionResults(attackResults) {
  if (attackResults.attackDidHit) {
    console.log(
      `${attackResults.attacker.name} made a ${attackResults.attackType} on ${
        attackResults.defender.name
      } with a ${attackResults.attacker.weapon.name} and hit for ${
        attackResults.damage
      } damage!`
    );
  } else {
    console.log(
      `${attackResults.attacker.name} made a ${attackResults.attackType} on ${
        attackResults.defender.name
      } with a ${attackResults.attacker.weapon.name} and missed!`
    );
  }
}

export { logActionResults };
