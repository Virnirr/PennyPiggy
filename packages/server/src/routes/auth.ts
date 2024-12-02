import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import credentials from "../services/credential-svc";

const router = express.Router();

dotenv.config();
const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "NOT_A_SECRET";

type generateAccessTokenArgs = {
  email: string;
  username: string;
};

function generateAccessToken({email, username} : generateAccessTokenArgs): Promise<String> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: { username, email } },
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token as string);
      }
    );
  });
}

router.post("/register", (req: Request, res: Response) => {
  const { username, password, email } = req.body; // from form

  if (!email || !username || !password) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .create({ username, password, email })
      .then((creds) => generateAccessToken({email: creds.email, username: creds.username}))
      .then((token) => {
        res.status(201).send({ token: token });
      });
  }
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body; // from form

  if (!email || !password) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .verify({ email, password })
      .then(({email, username}: Record<string, string>) => generateAccessToken({email, username}))
      .then((token) => res.status(200).send({ token: token }))
      .catch((error) => res.status(401).send("Unauthorized"));
  }
});

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  // Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).end();
  } else {
    jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
      if (decoded) next();
      else res.status(403).end();
    });
  }
}

export default router;
