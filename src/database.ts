import * as mongodb from "mongodb";
import { User } from "./routes/register";

interface MongoResult {
  isAcknowledged: boolean;
  message: string;
}

const URL = "mongodb://localhost:27017",
  dbName = "jira";

const client = new mongodb.MongoClient(URL);

export async function register(user: User): Promise<MongoResult> {
  let result: MongoResult;

  await client.connect();
  const db = client.db("jira");
  const collections = (await db.listCollections().toArray()).map(
    (collection) => collection.name
  );

  if (!collections.includes("register")) {
    const collection = db.collection("register");
    await collection.insertOne(user);

    result = {
      isAcknowledged: true,
      message: "register successfully",
    };
  } else {
    const collection = db.collection("register");
    const userIsExist: boolean = (await collection.findOne({
      name: `${user.name}`,
    }))
      ? true
      : false;

    if (userIsExist) {
      result = {
        isAcknowledged: false,
        message: `${user.name} has been registered!`,
      };
    } else {
      await collection.insertOne(user);
      result = {
        isAcknowledged: true,
        message: "register successfully",
      };
    }
  }

  client.close();
  return result;
}
