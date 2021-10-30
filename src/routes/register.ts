import { RequestHandler } from "express-serve-static-core";
import * as jwt from "jsonwebtoken";
import * as db from "../database";

export interface User {
  name: string;
  password: string;
}

export interface ResponseData {
  name: string;
  token: string;
}

const register: RequestHandler = async (req, res) => {
  // const privateKey = process.env.PRIVATE_KEY as string;
  const privateKey = "2021 lpl win the championship";
  const user: User = {
    name: req.body.name,
    password: req.body.password,
  };
  let data: ResponseData | string;

  const registerResult = await db.register(user);

  if (registerResult.isAcknowledged) {
    const token = jwt.sign({ user: user }, privateKey);
    data = {
      token,
      name: user.name,
    };

    res.json(data);
  } else {
    data = registerResult.message;
    res.send(data);
  }
};

export default register;
