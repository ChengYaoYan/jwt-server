import * as mongodb from "mongodb";

const url = "mongodb://localhost:27017";
const client = new mongodb.MongoClient(url);

export async function connect() {
  await client.connect();
  return client;
}
