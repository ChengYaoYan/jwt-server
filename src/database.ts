import * as mongodb from "mongodb";
import { User } from "./routes/register";

interface MongoResult {
  isAcknowledged: boolean;
  message: string;
}

const URL: string = process.env.MONGODB_URL as string,
  dbName = "jira";

const client = new mongodb.MongoClient(URL);

export async function register(user: User): Promise<MongoResult> {
  let result: MongoResult;

  await client.connect();
  const db = client.db(dbName);
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

export async function login(user: User): Promise<MongoResult> {
  let result: MongoResult;

  await client.connect();
  const db = client.db("jira");

  const collection = db.collection("register");
  const findResult = await collection.findOne({ name: `${user.name}` });

  if (!findResult) {
    result = {
      isAcknowledged: false,
      message: `${user.name} doesn't exist`,
    };
  } else {
    findResult.password === user.password
      ? (result = { isAcknowledged: true, message: "login successfully" })
      : (result = {
          isAcknowledged: false,
          message: "username or password is falsed",
        });
  }

  client.close();
  return result;
}

export async function users(): Promise<User[]> {
  let result: User[];

  await client.connect();
  const db = client.db("jira");

  const collection = db.collection("users");
  result = (await collection
    .find({}, { projection: { _id: 0 } })
    .toArray()) as User[];

  client.close();
  return result;
}
