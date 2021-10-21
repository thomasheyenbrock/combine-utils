import {
  createCompleteCombinationsWithIdentifiers,
  createCombinations
} from "../lib";

const getCollectionWithNumberOfIdentifiers = (length: number) =>
  createCombinations(Array.from({ length }).map((_, index) => index)).map(
    (identifiers, index) => ({
      identifiers,
      itemId: index
    })
  );

const numberOfCalls = { calls: 0 };

type Data = {
  "Number of identifiers": number;
  "Length of collection": number;
  "Number of combinations found": number;
  "Number of recursive function calls": number;
  "Time spent": number;
};

const data: Data[] = [];

Array.from({ length: 11 }).forEach((_, index) => {
  const collection = getCollectionWithNumberOfIdentifiers(index);
  const startTime = Date.now();
  const combinatons = createCompleteCombinationsWithIdentifiers(
    collection,
    item => item.identifiers,
    {
      storeNumberOfCallsIn: numberOfCalls
    }
  );
  const endTime = Date.now();
  data.push({
    "Number of identifiers": index,
    "Length of collection": collection.length,
    "Number of combinations found": combinatons.length,
    "Number of recursive function calls": numberOfCalls.calls,
    "Time spent": endTime - startTime
  });
});

console.table(data);

console.log("\n---\n");

const collection = [
  ...Array.from({ length: 100 }).map((_, index) => ({
    identifiers: [1],
    weight: Math.random() * 100,
    id: `identifier-1-index-${index}`
  })),
  ...Array.from({ length: 70 }).map((_, index) => ({
    identifiers: [2],
    weight: Math.random() * 100,
    id: `identifier-2-index-${index}`
  })),
  ...Array.from({ length: 50 }).map((_, index) => ({
    identifiers: [3],
    weight: Math.random() * 100,
    id: `identifier-3-index-${index}`
  })),
  ...Array.from({ length: 30 }).map((_, index) => ({
    identifiers: [4],
    weight: Math.random() * 100,
    id: `identifier-4-index-${index}`
  }))
];

const startTime = Date.now();
const combinations = createCompleteCombinationsWithIdentifiers(
  collection,
  item => item.identifiers,
  { storeNumberOfCallsIn: numberOfCalls }
);
const endTime = Date.now();

console.log("100 items with identifier 1");
console.log("70 items with identifier 2");
console.log("50 items with identifier 3");
console.log("30 items with identifier 4");
console.log("  Number of combinations found:", combinations.length);
console.log("  Number of recursive function calls:", numberOfCalls.calls);
console.log("  Time spent:", endTime - startTime);
