import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { handleUserErrorResponse } from "../controllers/helpers/errors/handleUserError";

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
    const response = handleUserErrorResponse(err);

    res.status(response.status).send(response.body);
  }
};
