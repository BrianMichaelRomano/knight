function bleedEffectInit(duration, damage, defender, gameTurn) {
  return {
    target: defender.id,
    name: 'bleed',
    duration,
    damage,
    gameTurn,
    isActive: false,
    hasExpired: false,
    reversable: true,
    reversed: false
  };
}

function removeExpiredEffects(entity, gameTurn) {
  const effects = [...entity.statusEffects];

  const effectsRemaining = effects.filter(effect => {
    return !(effect.duration + effect.gameTurn < gameTurn);
  });
  return effectsRemaining;
}
function applyNewEffects(entity) {}
function incrementExistingEffects(entity) {}

export {
  bleedEffectInit,
  removeExpiredEffects,
  applyNewEffects,
  incrementExistingEffects
};
