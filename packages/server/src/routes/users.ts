import express, { Request, Response } from "express";
import { IUser } from "models";

import usersSvc from "../services/users-svc";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  usersSvc
    .index()
    .then((users) => res.json(users))
    .catch((error) => res.status(500).send(error));
});

router.get("/:email", (req: Request, res: Response) => {
  const { email } = req.params;

  usersSvc
    .getByEmail(email)
    .then((user) => res.json(user))
    .catch((error) => res.status(404).send(error));
});

router.put("/:email", (req: Request, res: Response) => {
  const { email } = req.params;
  const editedUser = req.body as IUser;
  console.log("editedUser", editedUser);

  console.log("Updating users")

  usersSvc
    .update(email, editedUser)
    .then((user) => res.json(user))
    .catch((error) => res.status(404).send(error));
});

router.delete("/:email", (req: Request, res: Response) => {
  const { email } = req.params;

  usersSvc
    .remove(email)
    .then(() => res.status(204).send())
    .catch((error) => res.status(404).send(error));
});

export default router;