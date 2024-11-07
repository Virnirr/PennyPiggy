import { Schema } from "mongoose";
export interface IAssetAccount {
  _id?: Schema.Types.ObjectId,
  accountName: string,
  role: Role,
  accountNumber: number,
  currentBalance: number,
  isActive: boolean,
  lastActivity: Date
}

export type Role = "personal" | "business"