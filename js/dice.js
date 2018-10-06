function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function diceRoll(numDice, min, max) {
  let diceRollResults = [];

  for (let i = 0; i < numDice; i++) {
    let roll = randomNumber(min, max);
    diceRollResults.push(roll);
  }

  if (diceRollResults.length < 2) {
    return diceRollResults[0];
  }
  return diceRollResults;
}

function returnHighest(arr) {
  if (typeof arr !== 'array') {
    return arr;
  }

  let highest = 0;
  arr.forEach(num => {
    highest = num > highest ? num : highest;
  });
  return highest;
}

function rollOff(attr1, attr2) {
  let attr1Result = returnHighest(diceRoll(attr1, 1, 6));
  let attr2Result = returnHighest(diceRoll(attr2, 1, 6));
  return attr1Result >= attr2Result ? true : false;
}

export { rollOff, diceRoll };
