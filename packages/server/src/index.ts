// src/index.ts
import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

import { ITransactions } from "models/transactions";
import { TransactionsData } from "./pages/transactionData";
import { TransactionPage } from "./pages/transactions";

import { connect } from "./services/mongo";

connect("pennypigger"); // use your own db name here


app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get(
  "/transactions",
  (req: Request, res: Response) => {
    const { destId } = req.params;
    const data: ITransactions[] = TransactionsData;
    const page = new TransactionPage(data);

    res.set("Content-Type", "text/html").send(page.render());
  }
);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});