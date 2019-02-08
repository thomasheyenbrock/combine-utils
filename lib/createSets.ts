import { createCombinations } from "./createCombinations";
import { createCompleteCombinations } from "./withIdentifiers/createCompleteCombinations";

export function createSets<Item>(collection: Item[]) {
  const collectionWithIdentifiers = collection.map((item, index) => ({
    item,
    index
  }));
  const allCombinations = createCombinations(collectionWithIdentifiers);
  const filteredCombinations = allCombinations.filter(
    combination => combination.length > 0
  );
  const sets = createCompleteCombinations<{ item: Item; index: number }[]>(
    filteredCombinations,
    item => item.map(i => i.index)
  );
  return sets.map(set => set.map(coll => coll.map(({ item }) => item)));
}
