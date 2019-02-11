# combine-utils

This package provides you with some utility functions that can be used to combine a list of items into collections of those items.

## API Documentation

There are four functions that this package exposes.

### createCombinations

This function solves the classical combinatorial problem of finding all possible combinations of certain items. It takes in a list of items and it returns a list of lists of those items. Each element of the returned list represents a possible combination.

#### Type definition

```ts
createCombinations<Item>(
  collection: Item[],
  options?: Options
): Item[][]
```

#### Example

```js
const collection = [1, 2, 3];
const combinations = createCombinations(collection);
expect(combinations).toEqual([
  [],
  [1],
  [1, 2],
  [1, 2, 3],
  [1, 3],
  [2],
  [2, 3],
  [3]
]);
```

### createSets

This function solves the problem of how to distribute a list of items into different subsets of those items where each item belongs to exactly one subset.

In other words: We want to build a list of subsets of all the items in such a way that when we join together all subsets we end up with the original set of items without duplicates.

The function takes in a list of items and returns a list of sets. A set is a list of combinations of all items, i.e. a list of lists of items.

#### Type definition

```ts
createSets<Item>(
  collection: Item[],
  options?: Options
): Item[][][]
```

#### Example

```js
const collection = [1, 2, 3];
const sets = createSets(collection);
expect(sets).toEqual([
  [[1], [2], [3]],
  [[1], [2, 3]],
  [[1, 2], [3]],
  [[1, 2, 3]],
  [[1, 3], [2]]
]);
```

### createCombinationsWithIdentifiers

This function returns all possible combinations of items where each item contains a list of identifiers. The combinations are built in such a way that when you combine the identifiers of all items in the combination you don't get any duplicates.

The function takes a list of items and a function that maps one item to its identifiers. It returns a list of combinations of the given items, i.e. a list of lists of items.

#### Type definition

```ts
createCombinationsWithIdentifiers<Item>(
  collection: Item[],
  getIdentifiersFromItem: GetIdentifiersFromItem<Item>,
  options?: Options
): Item[][]

type GetIdentifiersFromItem<Item> = (item: Item) => Identifier[];
type Identifier = number | string;
```

#### Example

```js
const collection = [
  { itemId: 0, identifiers: [1] },
  { itemId: 1, identifiers: [2] },
  { itemId: 2, identifiers: [1, 2] }
];
const combinations = createCombinationsWithIdentifiers(
  collection,
  item => item.identifiers
);
expect(combinations).toEqual([
  [{ itemId: 0, identifiers: [1] }],
  [{ itemId: 0, identifiers: [1] }, { itemId: 1, identifiers: [2] }],
  [{ itemId: 1, identifiers: [2] }],
  [{ itemId: 2, identifiers: [1, 2] }]
]);
```

### createCompleteCombinationsWithIdentifiers

This function works similarly to the function `createCombinationsWithIdentifiers`, but it only returns those combinations, where each identifier is contained through an item exactly once.

The function takes a list of items and a function that maps one item to its identifiers. It returns a list of combinations of the given items, i.e. a list of lists of items.

#### Type definition

```ts
createCompleteCombinationsWithIdentifiers<Item>(
  collection: Item[],
  getIdentifiersFromItem: GetIdentifiersFromItem<Item>,
  options?: Options
): Item[][]

type GetIdentifiersFromItem<Item> = (item: Item) => Identifier[];
type Identifier = number | string;
```

#### Example

```js
const collection = [
  { itemId: 0, identifiers: [1] },
  { itemId: 1, identifiers: [2] },
  { itemId: 2, identifiers: [1, 2] }
];
const combinations = createCompleteCombinationsWithIdentifiers(
  collection,
  item => item.identifiers
);
expect(combinations).toEqual([
  [{ itemId: 0, identifiers: [1] }, { itemId: 1, identifiers: [2] }],
  [{ itemId: 2, identifiers: [1, 2] }]
]);
```

### Options

The last argument for each function is an object containing optional parameters. These options are the same for each function:

```ts
type Options = {
  minimumLength?: number;
  maximumLength?: number;
  storeNumberOfCallsIn?: { calls: number };
};
```

#### minimumLength

The minimum length defines a lower bound for the length of combinations or sets that should be included. All combinations that contain fewer elements are ignored.

#### maximumLength

The maximum length defines an upper bound for the length of combinations or sets that should be included. All combinations that contain more elements are ignored.

#### storeNumberOfCallsIn

All of the functions that this package exposes are implemented using recursion. The option `storeNumberOfCallsIn` allows you to track the number of recursive calls.
