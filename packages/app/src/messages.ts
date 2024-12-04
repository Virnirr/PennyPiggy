import { ITransactions,  IUser } from "server/models";

export type Msg =
  | ["profile/select", { email: string }]
  | [
    "profile/save",
    {
      email: string;
      profile: IUser;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ];