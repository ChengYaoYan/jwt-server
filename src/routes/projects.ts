import { RequestHandler } from "express-serve-static-core";
import * as db from "../database";

const projects: RequestHandler = async (req, res) => {
  const { username, name } = req.query;

  const result = await db.projects(
    name as string | undefined,
    username as string | undefined
  );

  res.json(result);
};

export default projects;
