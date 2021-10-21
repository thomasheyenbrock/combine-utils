export type Options = {
  minimumLength?: number;
  maximumLength?: number;
  storeNumberOfCallsIn?: { calls: number };
};
export type Identifier = number | string;
export type GetIdentifiersFromItem<Item> = (item: Item) => Identifier[];
export type GetWeightForCollection<Item> = (collection: Item[]) => number;

type AdditionalOptions<Item> = {
  includeIncompleteCombinations: boolean;
  orderByWeight?: GetWeightForCollection<Item>;
};

function internalCreate<Item>(
  collection: Item[],
  allIdentifiers: Identifier[],
  getAllIdentifiersForCollection: (collection: Item[]) => Identifier[],
  currentCombination: Item[],
  options: Options & AdditionalOptions<Item>
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

  // Step 2: Calculate the possible combinations from all the rest items that don't contain any
  // identifiers that we already have in our current combination.
  const restItemsWithoutCurrentCombination = restItems.filter(item =>
    getAllIdentifiersForCollection([item]).every(
      idenfitier =>
        !getAllIdentifiersForCollection(currentCombination).includes(idenfitier)
    )
  );
  const restCombinations = internalCreate(
    restItemsWithoutCurrentCombination,
    allIdentifiers,
    getAllIdentifiersForCollection,
    currentCombination,
    options
  );

  // Step 3: Create a new combination form the current one and add the first item.
  const newCombination = [...currentCombination, firstItem];
  const newCombinationWithLengthRestrictions =
    (maximumLength && newCombination.length > maximumLength) ||
    (minimumLength && newCombination.length < minimumLength)
      ? []
      : [newCombination];

  // Step 4: Check if the new combination contains all identifiers.
  if (
    getAllIdentifiersForCollection(newCombination).length ===
    allIdentifiers.length
  ) {
    // Step 5: Add the new combination to the array of all combinations.
    // We can return since we don't have to search for more items.
    return [...newCombinationWithLengthRestrictions, ...restCombinations];
  }

  // Step 6: Filter all combinations from the restItems that contain the identifiers from the first item.
  const restItemsWithoutCurrentCombinationAndFirstItem = restItemsWithoutCurrentCombination.filter(
    item =>
      getAllIdentifiersForCollection([item]).every(
        identifier =>
          !getAllIdentifiersForCollection([firstItem]).includes(identifier)
      )
  );

  // Step 7: Continue the recursion with the new combination. Only try those items that haven't been looked at yet.
  // We can then return the result of this together with the result from step 2.
  const incompleteCombination = includeIncompleteCombinations
    ? newCombinationWithLengthRestrictions
    : [];
  return [
    ...incompleteCombination,
    ...internalCreate(
      restItemsWithoutCurrentCombinationAndFirstItem,
      allIdentifiers,
      getAllIdentifiersForCollection,
      newCombination,
      options
    ),
    ...restCombinations
  ];
}

export function create<Item>(
  collection: Item[],
  getIdentifiersFromItem: GetIdentifiersFromItem<Item>,
  options: Options & AdditionalOptions<Item>
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
          if (
            typeof identifier !== "number" &&
            typeof identifier !== "string"
          ) {
            throw new Error(
              `Identifiers have to be either a number or a string. Identifier of type "${typeof identifier}" was found.`
            );
          }
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
