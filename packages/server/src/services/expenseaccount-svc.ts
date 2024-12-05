import { Schema, model } from "mongoose";
import { IExpenseAccount } from "models/IExpenseAccount";

const ExpenseSchema = new Schema<IExpenseAccount>(
  {
    accountName: { type: String, required: true, unique: true},
    accountNumber: { type: Number, required: true, unique: true},
    currentBalance: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
    lastActivity: { type: Date, required: true },
  }
);

export const ExpenseAccountModel = model<IExpenseAccount>("ExpenseAccount", ExpenseSchema);

function index(): Promise<IExpenseAccount[]> {
  return ExpenseAccountModel.find();
}

function get(expenseAccount: string): Promise<IExpenseAccount> {
  return ExpenseAccountModel.findOne({ accountName: expenseAccount })
    .then((doc: unknown) => doc as IExpenseAccount)
    .catch((error: Error) => {
      console.log(error);
      throw `${expenseAccount} Not Found`;
    });
}

function create(assetAccount: IExpenseAccount): Promise<IExpenseAccount> {
  const newExpenseAccount = new ExpenseAccountModel(assetAccount);
  return newExpenseAccount.save();
}

function update(assetAccountId: string, assetAccount: IExpenseAccount): Promise<IExpenseAccount> {
  return new Promise((resolve, reject) => {
    ExpenseAccountModel.findByIdAndUpdate(assetAccountId, assetAccount, { new: true })
      .then((assetAccount) => {
        if (assetAccount) {
          resolve(assetAccount);
        } else {
          reject("User Not Found");
        }
      })
  })
}

export default {
  index,
  get,
  create,
  update
}