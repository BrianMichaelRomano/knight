import equipment from './equipment.js';

const knight = {
  name: 'Firecore',
  id: 'knight',
  health: 100,
  attack: 1,
  defense: 1,
  weapon: equipment.axe,
  armor: 1,
  statusEffects: []
};

const skeleton = {
  name: 'Skeleton',
  id: 'skeleton',
  health: 100,
  attack: 1,
  defense: 1,
  weapon: equipment.sword,
  armor: 1,
  statusEffects: []
};

const rat = {
  name: 'Rat',
  id: 'rat',
  health: 10,
  attack: 1,
  defense: 1,
  weapon: equipment.unarmed,
  armor: 0,
  statusEffects: []
};

export { knight, skeleton, rat };
