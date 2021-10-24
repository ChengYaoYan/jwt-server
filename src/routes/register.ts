import { RequestHandler } from "express-serve-static-core";
import * as jwt from "jsonwebtoken";

export interface User {
  name: string;
  password: string;
}

export interface ResponseData {
  name: string;
  token: string;
}

const register: RequestHandler = (req, res) => {
  const user: User = {
    name: req.body.name,
    password: req.body.password,
  };

  const token = jwt.sign({ user: user }, "2021 lpl win the championship");

  const data: ResponseData = {
    token,
    name: user.name,
  };

  res.json(data);
};

export default register;
