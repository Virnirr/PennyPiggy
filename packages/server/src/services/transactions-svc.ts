import { Schema, model } from "mongoose";
import { ITransactions } from "../models/ITransactions";
import "../services/assetaccount-svc";
import "../services/expenseaccount-svc";
import "../services/category-svc";
import "../services/users-svc";

const TransactionsSchema = new Schema<ITransactions>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    transactionType: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true, trim: true },
    date: { type: Date, required: true },
    sourceAccount: { type: Schema.Types.ObjectId, ref: "AssetAccount" },
    destinationAccount: { type: Schema.Types.ObjectId, ref: "ExpenseAccount" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    tags: { type: [String] },
    notes: { type: String },
  },   
  { collection: "transactions" }
);

export const TransactionsModel = model<ITransactions>("Transactions", TransactionsSchema);

function index(): Promise<ITransactions[]> {
  return TransactionsModel.find();
}

function getTransacitonWithUserId(userId: Schema.Types.ObjectId): Promise<ITransactions[]> {
  console.log("This is the userId")
  console.log(userId);
  return TransactionsModel
    .find({ user: userId })
    .populate("user")
    .populate("sourceAccount")
    .populate("destinationAccount")
    .populate("category")
    .then((doc: unknown) => doc as ITransactions[])
    .catch((error: Error) => {
      console.log(error);
      throw `${userId} Not Found`;
    });
}

function create(transaction: ITransactions): Promise<ITransactions> {
  const newTransaction = new TransactionsModel(transaction);
  return newTransaction.save();
}

function update(
  transactionId: string,
  transaction: ITransactions
): Promise<ITransactions> {
  return new Promise((resolve, reject) => {
    TransactionsModel.findByIdAndUpdate(transactionId, transaction, {
      new: true
    })
    .then((transaction) => {
      if (transaction) {
        resolve(transaction);
      } else {
        reject("Transaction Not Found");
      }
    })
  });
}

export default {
  index,
  getTransacitonWithUserId,
  create,
  update,
  Schema: TransactionsSchema,
}
