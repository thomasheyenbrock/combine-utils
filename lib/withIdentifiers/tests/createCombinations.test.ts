import { createCombinationsWithIdentifiers } from "../../";

type Item = {
  itemId: number;
  identifiers: number[];
};

const getIdentifiers = (item: Item) => item.identifiers;
const collection = [
  { itemId: 0, identifiers: [1] },
  { itemId: 1, identifiers: [1] },
  { itemId: 2, identifiers: [2] },
  { itemId: 3, identifiers: [2] },
  { itemId: 4, identifiers: [3] },
  { itemId: 5, identifiers: [3] },
  { itemId: 6, identifiers: [1, 2] },
  { itemId: 7, identifiers: [1, 2] },
  { itemId: 8, identifiers: [1, 3] },
  { itemId: 9, identifiers: [1, 3] },
  { itemId: 10, identifiers: [2, 3] },
  { itemId: 11, identifiers: [2, 3] },
  { itemId: 12, identifiers: [1, 2, 3] },
  { itemId: 13, identifiers: [1, 2, 3] },
];
const expectedCombinations = [
  [],
  [collection[0]],
  [collection[0], collection[2]],
  [collection[0], collection[2], collection[4]],
  [collection[0], collection[2], collection[5]],
  [collection[0], collection[3]],
  [collection[0], collection[3], collection[4]],
  [collection[0], collection[3], collection[5]],
  [collection[0], collection[4]],
  [collection[0], collection[5]],
  [collection[0], collection[10]],
  [collection[0], collection[11]],
  [collection[1]],
  [collection[1], collection[2]],
  [collection[1], collection[2], collection[4]],
  [collection[1], collection[2], collection[5]],
  [collection[1], collection[3]],
  [collection[1], collection[3], collection[4]],
  [collection[1], collection[3], collection[5]],
  [collection[1], collection[4]],
  [collection[1], collection[5]],
  [collection[1], collection[10]],
  [collection[1], collection[11]],
  [collection[2]],
  [collection[2], collection[4]],
  [collection[2], collection[5]],
  [collection[2], collection[8]],
  [collection[2], collection[9]],
  [collection[3]],
  [collection[3], collection[4]],
  [collection[3], collection[5]],
  [collection[3], collection[8]],
  [collection[3], collection[9]],
  [collection[4]],
  [collection[4], collection[6]],
  [collection[4], collection[7]],
  [collection[5]],
  [collection[5], collection[6]],
  [collection[5], collection[7]],
  [collection[6]],
  [collection[7]],
  [collection[8]],
  [collection[9]],
  [collection[10]],
  [collection[11]],
  [collection[12]],
  [collection[13]],
];

it("should return all possible combinatons", () => {
  expect(createCombinationsWithIdentifiers(collection, getIdentifiers)).toEqual(
    expectedCombinations,
  );
});
it("should store the number of function calls", () => {
  const numberOfCalls = { calls: 0 };
  createCombinationsWithIdentifiers(collection, getIdentifiers, {
    storeNumberOfCallsIn: numberOfCalls,
  });
  expect(numberOfCalls).toEqual({ calls: 71 });
});
describe("when there are no items", () => {
  it("should return an empty array as only combination", () => {
    expect(createCombinationsWithIdentifiers([], getIdentifiers)).toEqual([[]]);
  });
});
describe("when there is only one identifier", () => {
  it("should return the list of items and an empty array", () => {
    const booringCollection = [
      { itemId: 0, identifiers: [1] },
      { itemId: 1, identifiers: [1] },
      { itemId: 2, identifiers: [1] },
      { itemId: 3, identifiers: [1] },
      { itemId: 4, identifiers: [1] },
    ];
    expect(
      createCombinationsWithIdentifiers(booringCollection, getIdentifiers),
    ).toEqual([[], ...booringCollection.map((item) => [item])]);
  });
});
describe("when there are no possible complete combinations", () => {
  it("should return the list of items and an empty array", () => {
    const impossibleCollection = [
      { itemId: 0, identifiers: [1, 2] },
      { itemId: 1, identifiers: [1, 3] },
      { itemId: 2, identifiers: [2, 3] },
    ];
    expect(
      createCombinationsWithIdentifiers(impossibleCollection, getIdentifiers),
    ).toEqual([[], ...impossibleCollection.map((item) => [item])]);
  });
});
describe("with minimum length", () => {
  it("should only return combinations that are bigger than the minimum length", () => {
    expect(
      createCombinationsWithIdentifiers(collection, getIdentifiers, {
        minimumLength: 2,
      }),
    ).toEqual(
      expectedCombinations.filter((combination) => combination.length >= 2),
    );
  });
});
describe("with maximum length", () => {
  it("should only return combinations that are smaller than the maximum length", () => {
    expect(
      createCombinationsWithIdentifiers(collection, getIdentifiers, {
        maximumLength: 2,
      }),
    ).toEqual(
      expectedCombinations.filter((combination) => combination.length <= 2),
    );
  });
});
describe("with minimum length and maximum length", () => {
  it("should only return combinations that are bigger than the minimum length and that are smaller than the maximum length", () => {
    expect(
      createCombinationsWithIdentifiers(collection, getIdentifiers, {
        minimumLength: 2,
        maximumLength: 2,
      }),
    ).toEqual(
      expectedCombinations.filter((combination) => combination.length === 2),
    );
  });
});
