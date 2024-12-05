import { IAssetAccount } from "./IAssetAccount"
import { IExpenseAccount } from "./IExpenseAccount"
import { IUser } from "./IUsers"
import { Schema } from "mongoose"

export interface ITransactions {
  _id?: Schema.Types.ObjectId | string,
  user: IUser | Schema.Types.ObjectId, // going to be reference id in MongoDB
  transactionType: TransactionType,
  description: string,
  amount: number,
  date: Date,
  sourceAccount: IAssetAccount | Schema.Types.ObjectId, // going to be reference id in MongoDB
  destinationAccount: IExpenseAccount | Schema.Types.ObjectId, // going to be reference id in MongoDB
  category: ICategory | Schema.Types.ObjectId // going to be reference id in MongoDB
  tags?: string[],
  notes?: string  
}

export interface ICategory {
  _id?: Schema.Types.ObjectId,
  description: string,
}

export interface IBudget {
  budgetId: number,
  description: string,
  amount: number
}

export type TransactionType = "deposit" | "withdrawal" | "transfer"