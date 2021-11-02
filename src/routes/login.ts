import { RequestHandler } from "express-serve-static-core";
import * as jwt from "jsonwebtoken";
import * as db from "../database";
import { User, ResponseData } from "./register";

const login: RequestHandler = async (req, res) => {
  // const privateKey = process.env.PRIVATE_KEY as string;
  const privateKey = "2021 lpl win the championship";
  const user: User = {
    name: req.body.name,
    password: req.body.password,
  };
  let data: ResponseData | string;

  const loginResult = await db.login(user);

  if (loginResult.isAcknowledged) {
    const token = jwt.sign({ user: user }, privateKey);
    data = {
      token,
      name: user.name,
    };

    res.json(data);
  } else {
    data = loginResult.message;
    res.status(403).send(data);
  }
};

export default login;
