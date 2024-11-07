import { Schema, model } from "mongoose";
import { ICategory } from "models";

const CategorySchema = new Schema<ICategory>(
  {
    description: { type: String, required: true, unique: true},
  }
);

export const CategoryModel = model<ICategory>("Category", CategorySchema);

function index(): Promise<ICategory[]> {
  return CategoryModel.find();
}

function get(description: string): Promise<ICategory> {
  return CategoryModel.findOne({ description })
    .then((category: unknown) => category as ICategory)
    .catch((error: Error) => {
      throw `${description} Not Found`;
    });
}

function create(assetAccount: ICategory): Promise<ICategory> {
  const newExpenseAccount = new CategoryModel(assetAccount);
  return newExpenseAccount.save();
}

function update(assetAccountId: string, assetAccount: ICategory): Promise<ICategory> {
  return new Promise((resolve, reject) => {
    CategoryModel.findByIdAndUpdate(assetAccountId, assetAccount, { new: true })
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