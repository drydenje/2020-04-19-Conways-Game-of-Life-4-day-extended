const { ROW_SIZE, COL_SIZE, ON, OFF, INHERIT } = require("./constants");
const { times, getNumberOfNeighbours, initWorld } = require('./utils');

/*
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

SIMPLY PUT:
Any live cell with two or three live neighbors survives.
Any dead cell with three live neighbors becomes a live cell.
*/

// TODO: you're writing to the same game map. we need to write to a new game map. this can be done later.
function calculateNewWorldState(oldWorld) {
  const getCurrState = (row, col) => oldWorld[row][col];

  /*
    newWorld looks like: [
      [null, null, null, null ....],
      [null, null, null, null ....],
      [null, null, null, null ....]
    ]
  */
  const newWorld = initWorld(null);

  const ruleBuilder = ({ matcher = currState => true, evaluator = (row, col, numberOfNeighbours) => 0 }) => {
    return {
      matcher,
      evaluator
    }
  }

  const rules = [
    // 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    ruleBuilder({
      matcher: currState => currState === ON,
      evaluator: numberOfNeighbours => {
        if (numberOfNeighbours < 2) {
          return OFF;
        }
      }
    }),
    // 2. Any live cell with two or three live neighbours lives on to the next generation.
    ruleBuilder({
      matcher: currState => currState === ON,
      evaluator: numberOfNeighbours => {
        if (numberOfNeighbours === 2 || numberOfNeighbours === 3) {
          return ON;
        }
      }
    }),
    // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
    ruleBuilder({
      matcher: currState => currState === ON,
      evaluator: numberOfNeighbours => {
        if (numberOfNeighbours > 3) {
          return OFF;
        }
      }
    }),
    // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    ruleBuilder({
      matcher: currState => currState === OFF,
      evaluator: numberOfNeighbours => {
        if (numberOfNeighbours === 2) {
          return ON;
        }
      }
    })
  ];

  // const rules = [
  //   ruleBuilder({
  //     matcher: currState => currState === ON,
  //     evaluator: numberOfNeighbours => {
  //       if (numberOfNeighbours === 2 || numberOfNeighbours === 3) {
  //         return ON;
  //       }
  //     }
  //   }),
  //   ruleBuilder({
  //     matcher: currState => currState === OFF,
  //     evaluator: numberOfNeighbours => {
  //       if (numberOfNeighbours === 3) {
  //         return ON;
  //       };
  //     }
  //   }),
  //   // DEBUG RULE
  //   ruleBuilder({
  //     matcher: () => true,
  //     evaluator: _ => {
  //       return OFF;
  //     }
  //   }),
  // ];

  // process the rules
  times(ROW_SIZE, row => {
    times(COL_SIZE, col => {
      rules.forEach(rule => {
        const currState = getCurrState(row, col);
        const isMatch = rule.matcher(currState);

        if (isMatch) {
          const numberOfNeighbours = getNumberOfNeighbours(oldWorld, row, col);
          let newValue = rule.evaluator(numberOfNeighbours);

          if (newValue !== ON && newValue !== OFF) {
            newValue = oldWorld[row][col];
          }

          newWorld[row][col] = newValue;
        }
      });
    });
  });

  return newWorld;
}

//   // write the map
//   for (var row = 0; row < ROW_SIZE; row++) {
//     for (var col = 0; col < COL_SIZE; col++) {
//       const newValue = newWorld[row][col];

//       if (newValue === INHERIT) {
//         // if we didn't change the cell, then we import it as-is from the old world
//         newWorld[row][col] = oldWorld[row][col];
//       }
//     }
//   }

//   return newWorld;
// }

exports.calculateNewWorldState = calculateNewWorldState;