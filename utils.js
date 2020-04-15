const { ROW_SIZE, COL_SIZE, ON, OFF } = require('./constants');

function times(iterations = 1, callback) {
  for (let i = 0; i < iterations; i++) {
    callback(i);
  }
}

function getNumberOfNeighbours(world, cellRow, cellCol) {

  // scan the neighbourhood
  const startingRow = cellRow - 1;
  const endingRow = cellRow + 1;

  const startingCol = cellCol - 1;
  const endingCol = cellCol + 1; // R.I.P. Bug, you were called cellRow once. goddammit.

  let numberOfNeighbours = 0;

  for (var row = startingRow; row < endingRow; row++) {
    // EDGE CASE 1: don't work with out-of-bound rows
    if (row < 0 || row > (ROW_SIZE - 1)) {
      continue;
    }

    for (var col = startingCol; col < endingCol; col++) {
      // EDGE CASE 2: don't work with out-of-bound cols
      if (col < 0 || col > (ROW_SIZE - 1)) {
        continue;
      }

      // EDGE CASE 3: don't scan yourself!
      if (row === cellRow && col === cellCol) {
        continue;
      }

      // scanning the neighbour now
      if (world[row][col] === ON) {
        numberOfNeighbours++;
      }
    }
  }

  return numberOfNeighbours;
}

function initWorld(valueToSet = OFF) {
  const world = [];

  times(ROW_SIZE, row => {
    world[row] = [];

    times(COL_SIZE, col => {
      world[row][col] = valueToSet;
    })
  });

  return world;
}

function draw(world, row, col) {
  world[row][col] = ON;
}

module.exports = {
  times,
  getNumberOfNeighbours,
  initWorld,
  draw
}
