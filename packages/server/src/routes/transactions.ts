import express, { Request, Response } from "express";
import { ITransactions } from "models/ITransactions";

import usersSvc from "../services/users-svc";
import credentialSvc from "services/credential-svc";

import transactionsSvc from "../services/transactions-svc";

import { Schema } from "mongoose";
import assetaccountSvc from "../services/assetaccount-svc";
import expenseaccountSvc from "../services/expenseaccount-svc";
import categorySvc from "../services/category-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  transactionsSvc
    .index()
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(500).send(err));
});

router.get("/:userEmail", (req: Request, res: Response) => {
  const { userEmail } = req.params;

  usersSvc
    .getByEmail(userEmail)
    .then((user) => {
      const userId = user._id as Schema.Types.ObjectId;
      return transactionsSvc.getTransacitonWithUserId(userId);
    })
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

router.get("/:userEmail/:transactionType", (req: Request, res: Response) => {
  const { userEmail, transactionType } = req.params;

  usersSvc
    .getByEmail(userEmail)
    .then((user) => {
      const userId = user._id as Schema.Types.ObjectId;
      return transactionsSvc.getTransacitonWithUserIdAndType(
        userId,
        transactionType
      );
    })
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

router.post("/", (req: Request, res: Response) => {
  const newTransaction = req.body;
  const { user, sourceAccount, destinationAccount, category } = newTransaction;

  console.log("this is the new transactions", newTransaction);

  Promise.all([
    usersSvc.getByEmail(user),
    assetaccountSvc.get(sourceAccount),
    expenseaccountSvc.get(destinationAccount),
    categorySvc.get(category),
  ]).then(([user, sourceAccount, destinationAccount, category]) => {
    transactionsSvc
      .create({
        ...newTransaction,
        tags: newTransaction.tags.split(" "),
        user: user._id,
        sourceAccount: sourceAccount._id,
        destinationAccount: destinationAccount._id,
        category: category._id,
        date: new Date(),
      })
      .then((transaction) => res.status(201).json(transaction))
      .catch((err) => res.status(500).send(err));
  });
});

router.put("/:transactionId", (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const updatedTransaction = req.body as ITransactions;

  transactionsSvc
    .update(transactionId, updatedTransaction)
    .then((transaction) => res.json(transaction))
    .catch((err) => res.status(404).end());
});

router.delete("/:transactionId", (req: Request, res: Response) => {
  const { transactionId } = req.params;

  transactionsSvc
    .remove(transactionId)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).end());
});

export default router;
