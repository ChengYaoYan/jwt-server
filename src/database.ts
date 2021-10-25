import * as mongodb from "mongodb";
import { User } from "./routes/register";

export interface IUser {
  id: number;
  name: string;
}

export interface IProject {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

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
  const db = client.db(dbName);

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

export async function users(): Promise<IUser[]> {
  let result: IUser[];

  await client.connect();
  const db = client.db(dbName);

  const collection = db.collection("users");
  result = (await collection
    .find({}, { projection: { _id: 0 } })
    .toArray()) as IUser[];

  client.close();
  return result;
}

export async function projects(
  name?: string,
  personId?: number
): Promise<IProject[]> {
  let result: IProject[];

  await client.connect();
  const db = client.db(dbName);

  const collection = db.collection("projects");

  if (!personId && !name) {
    result = (await collection
      .find({}, { projection: { _id: 0 } })
      .toArray()) as IProject[];
  } else if (personId && !name) {
    result = (await collection
      .find({ personId: personId }, { projection: { _id: 0 } })
      .toArray()) as IProject[];
  } else if (name && !personId) {
    result = (await collection
      .find({ name: `${name}` }, { projection: { _id: 0 } })
      .toArray()) as IProject[];
  } else {
    result = (await collection
      .find({ name: `${name}`, personId: personId }, { projection: { _id: 0 } })
      .toArray()) as IProject[];
  }

  client.close();
  return result;
}
