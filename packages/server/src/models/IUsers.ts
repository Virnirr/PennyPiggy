import { Schema } from 'mongoose';

export interface IUser {
  _id?: Schema.Types.ObjectId;
  username: string;
  email: string;
  nickname?: string | undefined;
  color?: string | undefined;
  avatar?: string | undefined;
  goal?: string | undefined;
}