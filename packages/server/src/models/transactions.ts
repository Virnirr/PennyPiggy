import { IAssetAccount } from "./assetAccount"
import { Currency } from "./currency"
import { IExpenseAccount } from "./expenseAccount"
import { IUser } from "./users"

export interface ITransactions {
  transactionId: number,
  userId: IUser, // going to be reference id in MongoDB
  transactionType: TransactionType,
  description: string,
  amount: number,
  date: Date,
  sourceAccount: IAssetAccount, // going to be reference id in MongoDB
  destinationAccount: IExpenseAccount, // going to be reference id in MongoDB
  category: ICategory // going to be reference id in MongoDB
  tags?: string[],
  notes?: string  
}

export interface ICategory {
  categoryId: number,
  description: string,
}

export interface IBudget {
  budgetId: number,
  description: string,
  amount: number
}

export type TransactionType = "deposit" | "withdrawal" | "transfer"