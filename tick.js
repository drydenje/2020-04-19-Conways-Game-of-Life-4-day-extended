const { ROW_SIZE, COL_SIZE, ON } = require("./ROW_SIZE");
const { times } = require('./utils');

function tick(world) {
  const rules = [
    (row, col) => {
      const currState = world[row][col];
      const newState = ON;
      world[row][col] = newState;
    }
  ];
  times(ROW_SIZE, row => {
    times(COL_SIZE, col => {
      rules.forEach(rule => rule(row, col));
    });
  });
}

exports.tick = tick;