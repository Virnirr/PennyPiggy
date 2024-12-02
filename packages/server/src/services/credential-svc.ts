import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { Credential } from "../models/credential";
import usersSvc from "./users-svc";

const credentialSchema = new Schema<Credential>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { collection: "user_credentials" }
);

const credentialModel = model<Credential>("Credential", credentialSchema);

export interface ICreateArgs {
  username: string;
  password: string;
  email: string;
}

export interface IVerifyArgs {
  email: string;
  password: string;
}

function create({
  username,
  password,
  email,
}: ICreateArgs): Promise<Credential> {
  return new Promise<Credential>((resolve, reject) => {
    if (!email || !username || !password) {
      reject("Username, email, and password are required");
    }
    console.log(email, username, password);
    credentialModel
      .find({ email })
      .then((found: Credential[]) => {
        if (found.length) reject("usernmae already exists");
      })
      .then(() => {
        // create user profile when creating credentials
        usersSvc.create({ username, email });

        // then return the bcrypt promise
        bcrypt
          .genSalt(10)
          .then((salt: string) => bcrypt.hash(password, salt))
          .then((hashedPassword: string) => {
            const creds = new credentialModel({
              username,
              hashedPassword,
              email,
            });
            creds.save().then((created: Credential) => {
              if (created) resolve(created);
            });
          });
      });
  });
}

function verify({ email, password}: IVerifyArgs): Promise<Record<string, string>> {
  return new Promise<Record<string, string>>((resolve, reject) => {
    credentialModel
      .find({ email })
      .then((found) => {
        if (found && found.length === 1) return found[0];
        else reject("Invalid email or password");
      })
      .then((credsOnFile) => {
        if (credsOnFile) {
          bcrypt.compare(password, credsOnFile.hashedPassword, (_, result) => {
            console.log("Verfied", result, credsOnFile.email);
            if (result) resolve({email: credsOnFile.email, username: credsOnFile.username});
            else reject("Invalid email or password");
          });
        } else reject("Invalid email or password");
      });
  });
}

export default { create, verify };
