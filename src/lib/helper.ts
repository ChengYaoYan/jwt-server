import { RequestHandler } from "express-serve-static-core";
import * as jwt from "jsonwebtoken";
import * as db from "../database";

import { User } from "../routes/register";

interface JwtPayload extends jwt.JwtPayload {
  user: User;
}

// const privateKey = process.env.PRIVATE_KEY as string;
const privateKey = "2021 lpl win the championship";

export const verifyToken: RequestHandler = async (req, res, next) => {
  let isAuthenticated: boolean = false;
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];

    const payload = jwt.verify(bearerToken, privateKey) as JwtPayload;
    const loginResult = await db.login(payload.user);

    loginResult.isAcknowledged
      ? (isAuthenticated = true)
      : (isAuthenticated = false);
  } else {
    res.status(403).send("Unauthenticated");
  }

  isAuthenticated ? next() : res.status(403).send("Unauthenticated");
};
