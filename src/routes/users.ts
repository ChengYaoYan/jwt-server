import { RequestHandler } from "express-serve-static-core";
import * as db from "../database";

const users: RequestHandler = async (req, res) => {
  const result = await db.users();
  res.json(result);
};

export default users;
