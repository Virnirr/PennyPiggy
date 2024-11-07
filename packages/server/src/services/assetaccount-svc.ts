import { Schema, model } from "mongoose";
import { IAssetAccount } from "models/IAssetAccount";

const AssetSchema = new Schema<IAssetAccount>(
  {
    accountName: { type: String, required: true, unique: true },
    accountNumber: { type: Number, required: true, unique: true },
    currentBalance: { type: Number, required: true },
    role: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    lastActivity: { type: Date, required: true },
  }
);

export const AssetAccountModel = model<IAssetAccount>("AssetAccount", AssetSchema);

function index(): Promise<IAssetAccount[]> {
  return AssetAccountModel.find();
}

function create(assetAccount: IAssetAccount): Promise<IAssetAccount> {
  const newUser = new AssetAccountModel(assetAccount);
  return newUser.save();
}

function update(assetAccountId: string, assetAccount: IAssetAccount): Promise<IAssetAccount> {
  return new Promise((resolve, reject) => {
    AssetAccountModel.findByIdAndUpdate(assetAccountId, assetAccount, { new: true })
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
  create,
  update
}