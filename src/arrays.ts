import { Primitive } from './types';

type BatchFunction<Argument, Result> = (arg: Argument[]) => Result[];

const batchOperations = <Argument, Result>(items: Argument[], fn: BatchFunction<Argument, Result>, batchSize = 10) => {
  const allResults: Result[] = [];
  while (items.length) {
    const toProcess = items.splice(0, batchSize);
    const results = fn(toProcess);
    allResults.push(...results);
  }
  return allResults;
};

const unique = <T extends Primitive>(arr: T[]) => {
  const index = new Set();
  return arr.filter(x => (index.has(x) ? false : index.add(x)));
};

function uniqueByField<T, K extends keyof T>(arr: T[], key: K): T[] {
  const index = new Set();
  return arr.filter(x => (index.has(x[key]) ? false : index.add(x[key])));
}

function uniqueByFunction<T>(arr: T[], fn: (arg: T) => string | number): T[] {
  const index = new Set();
  return arr.filter((x) => {
    const k = fn(x);
    return index.has(k) ? false : index.add(k);
  });
}

/**
 * Creates arrayCount arrays of items as evenly as possibly
 * Handy for splitting large jobs for Promise.all(), e.g:
 * await Promise.all(chunkArray(items).map((jobs, i) => doAThingWithTheJobs(jobs, i)));
 * Will create 8 threads, each will run through all their items until complete
 * @param items The items to chunk
 * @param arrayCount The number of arrays to chunk the items into
 */
 function chunkArray<T>(items: T[], arrayCount = 8): T[][] {
  const baseChunkSize = Math.floor(items.length / arrayCount);
  const remainder = items.length % arrayCount;

  const chunkSizes: number[] = new Array(arrayCount);
  for (let i = 0; i < arrayCount; i++) {
    chunkSizes[i] = baseChunkSize + (i < remainder ? 1 : 0); // remainders distributed as evenly as possible
  }

  const chunkedJobs: T[][] = new Array(arrayCount); // a (potentially jagged) array of arrays of items
  for (let i = 0; i < arrayCount; i++) {
    chunkedJobs[i] = items.splice(0, chunkSizes[i]);
  }

  return chunkedJobs;
}

function batchArray<T>(items: T[], batchSize = 8): T[][] {
  const result: T[][] = [];
  while (items.length > batchSize) {
    result.push(items.splice(0, batchSize));
  }
  if (items.length) result.push(items);
  return result;
}

// TODO: Does this execute everything at once?
async function unlimitedPromiseAll<T>(promises: Promise<T>[], batchSize = 8): Promise<T[]> {
  const batchedPromises = batchArray(promises, batchSize);
  const result: T[] = [];
  for (const batch of batchedPromises) {
    result.push(...await Promise.all(batch));
  }
  return result;
}

function ensureArray<T>(obj?: T | T[]): T[] {
  if (!obj) return [] as T[];
  if (Array.isArray(obj)) return obj;
  return [obj];
}

export default {
  batchArray,
  batchOperations,
  chunkArray,
  ensureArray,
  unique,
  uniqueByField,
  uniqueByFunction,
  unlimitedPromiseAll,
};
