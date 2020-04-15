const { ROW_SIZE, COL_SIZE, OFF, } = require("./constants");
const { calculateNewWorldState } = require('./calculateNewWorldState');
const { times, initWorld, draw } = require('./utils');
const { renderer } = require('./renderer');

// The world
let world = initWorld(OFF);

// draw a glider
draw(world, 3, 4);
draw(world, 4, 5);
draw(world, 5, 5);
draw(world, 5, 4);
draw(world, 5, 3);

// CALCULATE
const tick = () => {
  world = calculateNewWorldState(world);
  renderer(world);
}

for (var i = 0; i < 10; i++) {
  tick();
}
