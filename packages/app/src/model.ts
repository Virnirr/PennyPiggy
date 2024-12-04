import { IUser, ITransactions } from "server/models";

export interface Model {
  transactions?: ITransactions[];
  users?: IUser ;
}

export const init: Model = {};