import { create, GetIdentifiersFromItem, Options } from "./create";

export function createCombinations<Item>(
  items: Item[],
  getIdentifiersFromItem: GetIdentifiersFromItem<Item>,
  options?: Options
) {
  return create(items, getIdentifiersFromItem, {
    ...options,
    includeIncompleteCombinations: true
  });
}
