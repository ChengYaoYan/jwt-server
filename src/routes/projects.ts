import { RequestHandler } from "express-serve-static-core";
import * as db from "../database";

interface IPerson {
  personId: string;
  name: string;
}

const projects: RequestHandler = async (req, res) => {
  const { personId, name } = req.query;
  let personIdNum: number | undefined = undefined;

  if (typeof personId === "string") {
    personIdNum = parseInt(personId);
  }
  const result = await db.projects(name as string | undefined, personIdNum);

  res.json(result);
};

export default projects;
