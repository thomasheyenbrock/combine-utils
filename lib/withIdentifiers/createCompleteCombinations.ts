import { create, GetIdentifiersFromItem, Options } from "./create";

export function createCompleteCombinations<Item>(
  collection: Item[],
  getIdentifiersFromItem: GetIdentifiersFromItem<Item>,
  options?: Options,
) {
  return create(collection, getIdentifiersFromItem, {
    ...options,
    includeIncompleteCombinations: false,
  });
}
