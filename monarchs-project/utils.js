const { ROW_SIZE, COL_SIZE, ON, OFF } = require('./constants');

function times(iterations = 1, callback) {
  for (let i = 0; i < iterations; i++) {
    callback(i);
  }
}

function getNumberOfNeighbours(world, homeRow, homeCol) {

  // scan the neighbourhood
  const startingRow = homeRow - 1;
  const endingRow = homeRow + 1;

  const startingCol = homeCol - 1;
  const endingCol = homeCol + 1; // R.I.P. Bug, you were called cellRow once. goddammit.

  let numberOfNeighbours = 0;

  for (var currentRow = startingRow; currentRow <= endingRow; currentRow++) {
    // EDGE CASE 1: don't work with out-of-bound rows
    if (currentRow < 0 || currentRow > (ROW_SIZE - 1)) {
      continue;
    }

    for (var currentCol = startingCol; currentCol <= endingCol; currentCol++) {
      // EDGE CASE 2: don't work with out-of-bound cols
      if (currentCol < 0 || currentCol > (ROW_SIZE - 1)) {
        continue;
      }

      // EDGE CASE 3: don't scan yourself!
      if (currentRow === homeRow && currentCol === homeCol) {
        continue;
      }

      // scanning the neighbour now
      if (world[currentRow][currentCol] === ON) {
        numberOfNeighbours++;
      }
    }
  }

  return numberOfNeighbours;
}

function initWorld(valueToSet) {
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
