export type Options = {
  minimumLength?: number;
  maximumLength?: number;
  storeNumberOfCallsIn?: { calls: number };
};
export type Identifier = number | string;
export type GetIdentifiersFromItem<Item> = (item: Item) => Identifier[];

function internalCreate<Item>(
  collection: Item[],
  allIdentifiers: Identifier[],
  getAllIdentifiersForCollection: (collection: Item[]) => Identifier[],
  currentCombination: Item[],
  options: Options & { includeIncompleteCombinations: boolean }
): Item[][] {
  const {
    includeIncompleteCombinations,
    minimumLength,
    maximumLength,
    storeNumberOfCallsIn
  } = options;
  if (storeNumberOfCallsIn) {
    storeNumberOfCallsIn.calls += 1;
  }

  // Step 0: Check if there are any items.
  // If not then return since there is nothing left to do.
  if (collection.length === 0) {
    return [];
  }

  // Step 1: Separate the first item from the rest of the items.
  const [firstItem, ...restItems] = collection;

  // Step 2: Calculate the possible combinations from all the rest items.
  const restCombinations = internalCreate(
    restItems,
    allIdentifiers,
    getAllIdentifiersForCollection,
    currentCombination,
    options
  );

  // Step 3: Check if every identifier of the first item is still missing in the current combination
  if (
    getAllIdentifiersForCollection([firstItem]).every(
      identifier =>
        getAllIdentifiersForCollection(currentCombination).indexOf(identifier) <
        0
    )
  ) {
    // Step 3.1: Create a new combination form the current one and add the first item.
    const newCombination = [...currentCombination, firstItem];
    const newCombinationWithLengthRestrictions =
      (maximumLength && newCombination.length > maximumLength) ||
      (minimumLength && newCombination.length < minimumLength)
        ? []
        : [newCombination];
    const incompleteCombination = includeIncompleteCombinations
      ? newCombinationWithLengthRestrictions
      : [];

    // Step 3.2: Check if the new combination contains all identifiers.
    if (
      getAllIdentifiersForCollection(newCombination).length ===
      allIdentifiers.length
    ) {
      // Step 3.3: Add the new combination to the array of all combinations.
      // We can return since we don't have to search for more items.
      return [...newCombinationWithLengthRestrictions, ...restCombinations];
    }

    // Step 3.4: Continue the recursion with the new combination. Only try those items that haven't been looked at yet.
    // We can then return the result of this together with the result from step 2.
    return [
      ...incompleteCombination,
      ...internalCreate(
        restItems,
        allIdentifiers,
        getAllIdentifiersForCollection,
        newCombination,
        options
      ),
      ...restCombinations
    ];
  }

  // Step 4: We could not find any combinations by going deeper from the current combination.
  // Therefore we can return the combinations which we found in step 2.
  return restCombinations;
}

export function create<Item>(
  collection: Item[],
  getIdentifiersFromItem: GetIdentifiersFromItem<Item>,
  options: Options & { includeIncompleteCombinations: boolean }
) {
  const createCombinationOptions = { ...options };
  const { storeNumberOfCallsIn } = createCombinationOptions;

  if (
    typeof storeNumberOfCallsIn === "object" &&
    storeNumberOfCallsIn !== null
  ) {
    storeNumberOfCallsIn.calls = 0;
  }
  function getAllIdentifiersForCollection(itemList: Item[]) {
    return itemList.reduce(
      (acc, item) => {
        getIdentifiersFromItem(item).forEach(identifier => {
          if (acc.indexOf(identifier) < 0) {
            acc.push(identifier);
          }
        });
        return acc;
      },
      [] as Identifier[]
    );
  }
  const emptyCollection =
    options.includeIncompleteCombinations &&
    (!options.minimumLength || options.minimumLength < 1)
      ? [[]]
      : [];
  return [
    ...emptyCollection,
    ...internalCreate(
      collection,
      getAllIdentifiersForCollection(collection),
      getAllIdentifiersForCollection,
      [],
      options
    )
  ];
}
