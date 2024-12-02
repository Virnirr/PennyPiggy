import { Schema, model } from "mongoose";
import { IUser } from "models/IUsers";

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    avatar: { type: String },
    goal: { type: String },
    nickname: { type: String },
    color: { type: String }
  }
);

export const UserModel = model<IUser>("User", UserSchema);

function index(): Promise<IUser[]> {
  return UserModel.find();
}

function getByEmail(email: string): Promise<IUser> {
  return UserModel.findOne({ email })    
    .then((user: unknown) => user as IUser)
    .catch((error: Error) => {
      throw `${email} Not Found`;
    });
}

function create(user: IUser): Promise<IUser> {
  const newUser = new UserModel(user);
  return newUser.save();
}

function update(email: string, user: IUser): Promise<IUser> {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate({ email }, user, { new: true })
      .then((user) => {
        if (user) {
          resolve(user);
        } else {
          reject("User Not Found");
        }
      })
  })
}

function remove(email: String): Promise<void> {
  return UserModel
    .findOneAndDelete({ email })
    .then((deleted) => {
      if (!deleted) throw `${email} not deleted`;
    });
}

export default {
  index,
  getByEmail,
  create,
  update,
  remove
}