import { createSets } from "../";

it("should return a list of the expected possibilities to distribute the collection into sets", () => {
  const collection = [1, 2, 3, 4];
  const expectedSets = [
    [[1], [2], [3], [4]],
    [[1], [2], [3, 4]],
    [[1], [2, 3], [4]],
    [[1], [2, 3, 4]],
    [[1], [2, 4], [3]],
    [[1, 2], [3], [4]],
    [[1, 2], [3, 4]],
    [[1, 2, 3], [4]],
    [[1, 2, 3, 4]],
    [[1, 2, 4], [3]],
    [[1, 3], [2], [4]],
    [[1, 3], [2, 4]],
    [[1, 3, 4], [2]],
    [[1, 4], [2], [3]],
    [[1, 4], [2, 3]]
  ];
  expect(createSets(collection)).toEqual(expectedSets);
});
describe("when there are no items in the collection", () => {
  it("should return an empty array", () => {
    expect(createSets([])).toEqual([]);
  });
});
describe("when there is only one item in the collection", () => {
  it("should return an array containing only one element", () => {
    expect(createSets([1])).toEqual([[[1]]]);
  });
});
