export interface IAssetAccount {
  accountName: string,
  role: Role,
  accountNumber: number,
  currentBalance: number,
  isActive: boolean,
  lastActivity: Date
}

type Role = "personal" | "business"