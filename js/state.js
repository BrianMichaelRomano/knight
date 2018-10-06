const localStateName = 'knightState';

function setState(state) {
  localStorage.setItem(localStateName, JSON.stringify(state));
}

function getState() {
  return JSON.parse(localStorage.getItem(localStateName));
}

export default {
  setState,
  getState
};
