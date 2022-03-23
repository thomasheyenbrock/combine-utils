import { createCombinations as createAllCombinationsWithIdenfifiers } from "./withIdentifiers/createCombinations";
import { Options } from "./withIdentifiers/create";

export function createCombinations<Item>(
  collection: Item[],
  options?: Options
) {
  type ItemObject = {
    value: Item;
    identifers: number[];
  };
  const collectionWithIdentifiers = collection.map((item, index) => ({
    value: item,
    identifers: [index],
  }));
  const getIdentifiersFromItem = (item: ItemObject) => item.identifers;
  const combinations = createAllCombinationsWithIdenfifiers(
    collectionWithIdentifiers,
    getIdentifiersFromItem,
    options
  );
  return combinations.map((combination) =>
    combination.map((item) => item.value)
  );
}
