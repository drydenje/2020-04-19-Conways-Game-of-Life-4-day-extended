const { ROW_SIZE, COL_SIZE, OFF, } = require("./ROW_SIZE");
const { tick } = require('./tick');
const { times } = require('./utils');

// The world
const world = [];

// Initialize the world
times(ROW_SIZE, row => {
  world[row] = [];

  times(COL_SIZE, col => {
    world[row][col] = OFF;
  })
});

// Start
console.log(world);
tick(world);
console.log(world);
