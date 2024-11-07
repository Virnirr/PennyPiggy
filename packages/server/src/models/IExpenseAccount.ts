import { Schema } from 'mongoose';
export interface IExpenseAccount {
  _id?: Schema.Types.ObjectId,
  accountName: string,
  accountNumber: number,
  currentBalance: number,
  isActive: boolean,
  lastActivity: Date
}