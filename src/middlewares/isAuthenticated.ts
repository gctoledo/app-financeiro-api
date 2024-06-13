import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ message: "The authorization is missing" });
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET as string);

    req.userId = sub as string;

    return next();
  } catch (err) {
    console.error(err);

    res.status(401).send({ message: "Authorization failed" });
  }
};
