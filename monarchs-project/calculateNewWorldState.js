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
  const newWorld = initWorld(INHERIT);

  const rules = [
    // 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    {
      name: "Loneliness",
      matcher: (currState, numberOfNeighbours) => currState === ON && numberOfNeighbours < 2,
      evaluator: () => OFF
    },
    // 2. Any live cell with two or three live neighbours lives on to the next generation.
    {
      name: "Survival",
      matcher: (currState, numberOfNeighbours) => currState === ON && (numberOfNeighbours === 2 || numberOfNeighbours === 3),
      evaluator: () => ON
    },
    // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
    {
      name: "Overpopulation",
      matcher: (currState, numberOfNeighbours) => currState === ON && numberOfNeighbours > 3,
      evaluator: () => OFF
    },
    // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    {
      name: "Reproduction",
      matcher: (currState, numberOfNeighbours) => currState === OFF && numberOfNeighbours === 2,
      evaluator: () => ON
    }
  ];

  // process the rules
  times(ROW_SIZE, row => {
    times(COL_SIZE, col => {
      const currState = getCurrState(row, col);
      const numberOfNeighbours = getNumberOfNeighbours(oldWorld, row, col);

      let rulesAlreadyMatched = [];
      rules.forEach(rule => {
        const isMatch = rule.matcher(currState, numberOfNeighbours);

        if (isMatch) {
          rulesAlreadyMatched.push(rule.name);

          // error check
          if (rulesAlreadyMatched.length > 1) {
            console.error("RULES ALREADY MATCHED", rulesAlreadyMatched)
            throw new Error('Multiple rulematches detected')
          }

          newWorld[row][col] = rule.evaluator();
        }
      });
    });
  });

  // collapse the worlds
  times(ROW_SIZE, row => {
    times(COL_SIZE, col => {
      if (newWorld[row][col] === INHERIT) {
        newWorld[row][col] = oldWorld[row][col];
      }
    })
  })

  return newWorld;
}

exports.calculateNewWorldState = calculateNewWorldState;