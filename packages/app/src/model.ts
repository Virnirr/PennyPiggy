import { IUser, ITransactions } from "server/models";

export interface Model {
  transactions?: ITransactions[];
  profile?: IUser ;
}

export const init: Model = {};