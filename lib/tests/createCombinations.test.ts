import { createCombinations } from "../";

const collection = [1, 2, 3, 4];
const expectedCombinations = [
  [],
  [1],
  [1, 2],
  [1, 2, 3],
  [1, 2, 3, 4],
  [1, 2, 4],
  [1, 3],
  [1, 3, 4],
  [1, 4],
  [2],
  [2, 3],
  [2, 3, 4],
  [2, 4],
  [3],
  [3, 4],
  [4]
];
it("should return a list of all possible combinations", () => {
  expect(createCombinations(collection)).toEqual(expectedCombinations);
});
describe("when the collection is empty", () => {
  it("should return an empty array as only combination", () => {
    expect(createCombinations([])).toEqual([[]]);
  });
});
describe("when there is only one item in the combination", () => {
  it("should return an array with two collections", () => {
    expect(createCombinations([1])).toEqual([[], [1]]);
  });
});
describe("with minimum length", () => {
  it("should only return combinations that are bigger than the minimum length", () => {
    expect(
      createCombinations(collection, {
        minimumLength: 2
      })
    ).toEqual(
      expectedCombinations.filter(combination => combination.length >= 2)
    );
  });
});
describe("with maximum length", () => {
  it("should only return combinations that are smaller than the maximum length", () => {
    expect(
      createCombinations(collection, {
        maximumLength: 2
      })
    ).toEqual(
      expectedCombinations.filter(combination => combination.length <= 2)
    );
  });
});
describe("with minimum length and maximum length", () => {
  it("should only return combinations that are bigger than the minimum length and that are smaller than the maximum length", () => {
    expect(
      createCombinations(collection, {
        minimumLength: 2,
        maximumLength: 2
      })
    ).toEqual(
      expectedCombinations.filter(combination => combination.length === 2)
    );
  });
});
