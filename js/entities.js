import equipment from './equipment.js';

const knight = {
  name: 'Firecore',
  id: 'knight',
  health: 100,
  maxHealth: 100,
  attack: 1,
  defense: 1,
  fatigueLimit: 10,
  currentFatigue: 0,
  weapon: equipment.axe,
  armor: 1,
  statusEffects: []
};

const skeleton = {
  name: 'Skeleton',
  id: 'skeleton',
  health: 100,
  maxHealth: 100,
  attack: 1,
  defense: 1,
  fatigueLimit: 5,
  currentFatigue: 0,
  weapon: equipment.sword,
  armor: 1,
  statusEffects: [],
  actionsAvailable: ['basicAttack', 'bleedAttack', 'exploitArmorAttack']
};

const rat = {
  name: 'Rat',
  id: 'rat',
  health: 10,
  maxHealth: 10,
  attack: 1,
  defense: 1,
  fatigueLimit: 2,
  currentFatigue: 0,
  weapon: equipment.unarmed,
  armor: 0,
  statusEffects: [],
  actionsAvailable: ['basicAttack', 'bleedAttack']
};

export { knight, skeleton, rat };
