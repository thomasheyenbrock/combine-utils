import { createCombinations } from "./createCombinations";
import { Options } from "./withIdentifiers/create";
import { createCompleteCombinations } from "./withIdentifiers/createCompleteCombinations";

export function createSets<Item>(collection: Item[], options?: Options) {
  const collectionWithIdentifiers = collection.map((item, index) => ({
    item,
    index
  }));
  const numberOfCalls = { calls: 0 };
  const allCombinations = createCombinations(collectionWithIdentifiers, {
    minimumLength: 1,
    storeNumberOfCallsIn: numberOfCalls
  });
  const sets = createCompleteCombinations<{ item: Item; index: number }[]>(
    allCombinations,
    item => item.map(i => i.index),
    options
  );
  if (options && options.storeNumberOfCallsIn) {
    options.storeNumberOfCallsIn.calls += numberOfCalls.calls;
  }
  return sets.map(set => set.map(coll => coll.map(({ item }) => item)));
}
