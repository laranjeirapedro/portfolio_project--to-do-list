export {};

declare global {
  let _mongoClientPromise: Promise<import("mongodb").MongoClient> | undefined;
}