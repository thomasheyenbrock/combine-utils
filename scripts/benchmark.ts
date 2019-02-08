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
