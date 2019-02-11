import { createSets } from "../";

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
it("should return a list of the expected possibilities to distribute the collection into sets", () => {
  expect(createSets(collection)).toEqual(expectedSets);
});
it("should store the number of function calls", () => {
  const numberOfCalls = { calls: 0 };
  createSets(collection, {
    storeNumberOfCallsIn: numberOfCalls
  });
  expect(numberOfCalls).toEqual({ calls: 118 });
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
describe("with minimum length", () => {
  it("should only return sets that are bigger than the minimum length", () => {
    expect(
      createSets(collection, {
        minimumLength: 2
      })
    ).toEqual(expectedSets.filter(set => set.length >= 2));
  });
});
describe("with maximum length", () => {
  it("should only return sets that are smaller than the maximum length", () => {
    expect(
      createSets(collection, {
        maximumLength: 2
      })
    ).toEqual(expectedSets.filter(set => set.length <= 2));
  });
});
describe("with minimum length and maximum length", () => {
  it("should only return sets that are bigger than the minimum length and that are smaller than the maximum length", () => {
    expect(
      createSets(collection, {
        minimumLength: 2,
        maximumLength: 2
      })
    ).toEqual(expectedSets.filter(set => set.length === 2));
  });
});
