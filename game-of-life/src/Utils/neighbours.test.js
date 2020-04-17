import { getNumberOfNeighbours } from "./neighbours";

test("checks", () => {
  const result = getNumberOfNeighbours(5, 4);
  expect(result).toEqual(1);
});
