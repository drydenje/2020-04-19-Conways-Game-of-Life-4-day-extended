const { times } = require('./utils');
const { ROW_SIZE, COL_SIZE, ON, OFF } = require('./constants');

const FONT = {
  [ON]: "# ",
  [OFF]: ". ",
  default: "? "
}

function renderer(world) {
  /*
    . . . . . . . . . .
    . . . . . . . . . .
    . . . . . . . . . .
    . . . . . . . . . .
    . . . . # . . . . .
    . . . . . # . . . .
    . . . # # # . . . .
    . . . . . . . . . .
    . . . . . . . . . .
    . . . . . . . . . .
  */

  let string = '';

  times(ROW_SIZE, row => {
    times(COL_SIZE, col => {
      const value = world[row][col];
      const font = FONT[value] || FONT.default;
      string += font;
    });

    string += '\n';
  });

  // render
  console.log(string);
}

exports.renderer = renderer;