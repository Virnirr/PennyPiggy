  import { Schema, model } from "mongoose";
import { ITransactions } from "../models/ITransactions";




const TransactionsSchema = new Schema<ITransactions>(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true, trim: true },
    date: { type: Date, required: true },
    tags: { type: [String] },
    sourceAccount: { type: Schema.Types.ObjectId, ref: "AssetAccount" },
    destinationAccount: { type: Schema.Types.ObjectId, ref: "AssetAccount" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },   
  { collection: "transactions" }
);

const TransactionsModel = model<ITransactions>("Transactions", TransactionsSchema);

