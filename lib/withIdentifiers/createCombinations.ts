import { create, GetIdentifiersFromItem, Options } from "../create";

export function createCombinations<Item>(
  collection: Item[],
  getIdentifiersFromItem: GetIdentifiersFromItem<Item>,
  options?: Options
) {
  return create(collection, getIdentifiersFromItem, {
    ...options,
    includeIncompleteCombinations: true
  });
}
