import { Model, Schema, model } from "mongoose";
import { IUser } from "models/IUsers";
import { error } from "console";

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    avatar: { type: String }
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

function update(userid: string, user: IUser): Promise<IUser> {
  return new Promise((resolve, reject) => {
    UserModel.findByIdAndUpdate(userid, user, { new: true })
      .then((user) => {
        if (user) {
          resolve(user);
        } else {
          reject("User Not Found");
        }
      })
  })
}

export default {
  index,
  getByEmail,
  create,
  update
}