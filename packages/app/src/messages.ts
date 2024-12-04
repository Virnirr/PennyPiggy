import { ITransactions,  IUser } from "server/models";

export type Msg =
  | ["users/select", { email: string }]
  | [
    "users/save",
    {
      email: string;
      users: IUser;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ];