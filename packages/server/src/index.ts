// src/index.ts
import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

import { ITransactions } from "models/ITransactions";
import { TransactionsData } from "./pages/transactionData";
import { TransactionPage } from "./pages/transactions";

import { connect } from "./services/mongo";

import transactionsSvc from "./services/transactions-svc";
import usersSvc from "./services/users-svc";
import assetaccountSvc from "services/assetaccount-svc";
import expenseaccountSvc from "services/expenseaccount-svc";
import categorySvc from "services/category-svc";

import { Schema } from "mongoose";

connect("PennyPiggy"); // use your own db name here

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get(
  "/transactions/:userEmail",
  (req: Request, res: Response) => {
    const { userEmail } = req.params;

    usersSvc
      .getByEmail(userEmail)
      .then((user) => {
        const userId = user._id as Schema.Types.ObjectId;
        return transactionsSvc.getTransacitonWithUserId(userId);
      })
      .then((transactions) => {
        const page = new TransactionPage(transactions);
        res.set("Content-Type", "text/html").send(page.render());
      })
      .catch((error) => {
        res.status(404).send(error);
      });
    
    // const data: ITransactions[] = TransactionsData;
    // const page = new TransactionPage(data);

    // res.set("Content-Type", "text/html").send(page.render());
  }
);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});