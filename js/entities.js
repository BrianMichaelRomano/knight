import equipment from './equipment.js';

const knight = {
  name: 'Firecore',
  id: 'knight',
  health: 100,
  attack: 1,
  defense: 1,
  weapon: equipment.axe,
  armor: 1
};

const skeleton = {
  name: 'Skeleton',
  id: 'skeleton',
  health: 100,
  attack: 1,
  defense: 1,
  weapon: equipment.sword,
  armor: 1
};

export { knight, skeleton };
