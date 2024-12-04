// src/index.ts
import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "path";


const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

console.log("staticDir", staticDir);

import { ITransactions } from "models/ITransactions";
import { TransactionsData } from "./pages/transactionData";
import { TransactionPage } from "./pages/transactions";
import { PennyProfilePage } from "./pages/pennyProfile";

import { connect } from "./services/mongo";

import transactionsSvc from "./services/transactions-svc";
import usersSvc from "./services/users-svc";
import assetaccountSvc from "./services/assetaccount-svc";
import expenseaccountSvc from "./services/expenseaccount-svc";
import categorySvc from "./services/category-svc";

import { Schema } from "mongoose";
import transactions from "./routes/transactions";
import users from "./routes/users";
import auth, { authenticateUser } from "./routes/auth";

import { LoginPage } from "./pages/auth";

connect("PennyPiggy"); // use your own db name here

app.use(express.static(staticDir));
app.use(express.json());

// express routes
app.use("/api/transactions", authenticateUser, transactions);
app.use("/api/users", authenticateUser, users);
app.use("/auth", auth);


app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});

// SPA Routes: /app/...
app.use("/app", (_: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.get(
  "/transactions/:email",
  (req: Request, res: Response) => {
    const { email } = req.params;

    usersSvc
      .getByEmail(email)
      .then((user) => {
        const userId = user._id as Schema.Types.ObjectId;
        return transactionsSvc.getTransacitonWithUserId(userId);
      })
      .then((transactions) => {
        const page = new TransactionPage(transactions, email);
        res.set("Content-Type", "text/html").send(page.render());
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  }
);

app.get("/users/:email", (req: Request, res: Response) => {
  const { email } = req.params;

  usersSvc
    .getByEmail(email)
    .then((userData) => {
      if (!userData) throw "User not found";
      const page = new PennyProfilePage(userData, "view");
      res.set("Content-Type", "text/html").send(page.render()); // send the rendered page
    })
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});