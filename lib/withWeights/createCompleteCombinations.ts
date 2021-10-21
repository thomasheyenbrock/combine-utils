import {
  create,
  GetIdentifiersFromItem,
  GetWeightForCollection,
  Options
} from "../create";

export function createCompleteCombinations<Item>(
  collection: Item[],
  getIdentifiersFromItem: GetIdentifiersFromItem<Item>,
  getWeightForCollection: GetWeightForCollection<Item>,
  options?: Options
) {
  return create(collection, getIdentifiersFromItem, {
    ...options,
    includeIncompleteCombinations: false,
    orderByWeight: getWeightForCollection
  });
}
