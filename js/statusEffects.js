const statusEffects = {
  bleed: {
    apply: (entity, effect) => {
      console.log(`Bleed damage of ${effect.damage} applied to ${entity.name}`);
      entity.health -= effect.damage;
    }
  }
};

function bleedEffectInit(duration, damage, defender, gameTurn) {
  return {
    target: defender.id,
    name: 'bleed',
    duration,
    damage,
    gameTurn,
    isActive: false,
    hasExpired: false,
    recurring: true,
    reversable: false,
    reversed: false
  };
}

function resolveStatusEffects(entity, gameTurn) {
  let effects = entity.statusEffects;

  effects = markExpiredEffects([...effects], gameTurn);
  effects = reverseExpiredEffects([...effects], entity);
  effects = removeExpiredEffects([...effects]);
  entity = applyCurrentEffects(effects, entity);

  entity.statusEffects = effects;
  return entity;
}

function markExpiredEffects(effects, gameTurn) {
  effects.forEach(effect => {
    if (effect.gameTurn + effect.duration <= gameTurn) {
      effect.hasExpired = true;
    }
  });
  return effects;
}

function reverseExpiredEffects(effects, entity) {
  effects.forEach(effect => {
    if (effect.reversable) {
      // effect.reverse(entity); TODO: Figure that out lol
    }
  });
  return effects;
}

function removeExpiredEffects(effects) {
  let remainingEffects = effects.filter(effect => {
    return !effect.hasExpired;
  });
  return remainingEffects;
}

function applyCurrentEffects(effects, entity) {
  effects.forEach(effect => {
    if (!effect.isActive || effect.recurring) {
      effect.isActive = true;
      statusEffects[effect.name].apply(entity, effect);
    }
  });
  return entity;
}

export { bleedEffectInit, resolveStatusEffects };
