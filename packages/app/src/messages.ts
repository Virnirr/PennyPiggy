import { ITransactions, IUser } from "server/models";

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
    ]
  | [
      "transactions/select",
      {
        email: string;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [
      "transactions/save",
      {
        email: string;
        transactions: ITransactions;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | [
    "transactions/delete",
    {
      transactionId: string;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }
  ];
