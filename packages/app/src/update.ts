import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { IUser, ITransactions } from "server/models";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "users/select":
      selectUsers(message[1], user).then((users) =>
        apply((model) => ({ ...model, users }))
      );
      break;
    case "users/save":
      saveUsers(message[1].users, user)
        .then((_) => {
          apply((model) => ({ ...model, users: message[1].users }));
        })
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "transactions/select":
      selectTransactions(message[1], user)
        .then((transactions) => {
          console.log("Transactions:", transactions);
          apply((model) => ({ ...model, transactions }));
        })
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "transactions/save":
      saveTransactions(message[1], user)
        ?.then((transactions) => {
          console.log("Transactions:", transactions);
        })
        .then(() => {
          const { onSuccess } = message[1];
          if (onSuccess) onSuccess();
        })
        .catch((error: Error) => {
          const { onFailure } = message[1];
          if (onFailure) onFailure(error);
        });
      break;
    case "transactions/delete":
      deleteTransaction(message[1], user).then(() => {
        apply((model) => ({
          ...model,
          transactions: model.transactions?.filter(
            (transaction) => transaction._id !== message[1].transactionId
          ),
        }));
      }).then(() => {
        const { onSuccess } = message[1];
        if (onSuccess) onSuccess();
      })
      .catch((error: Error) => {
        const { onFailure } = message[1];
        if (onFailure) onFailure(error);
      });
      break;
    // put the rest of your cases here
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function selectUsers(msg: { email: string }, user: Auth.User) {
  return fetch(`/api/users/${msg.email}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as IUser;
      }
    });
}

function saveUsers(msg: { email: string }, user: Auth.User) {
  return fetch(`/api/users/${msg.email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Profile:", json);
        return json as IUser;
      }
    });
}

function selectTransactions(msg: { email: string }, user: Auth.User) {
  return fetch(`/api/transactions/${msg.email}`, {
    headers: Auth.headers(user),
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .then((json: unknown) => {
      if (json) {
        console.log("Transactions:", json);
        return json as ITransactions[];
      }
    });
}

function saveTransactions(
  msg: { email: string; transactions: ITransactions },
  user: Auth.User
) {
  const transactionBody = {
    ...msg.transactions,
    user: msg.email,
  };

  return fetch(`/api/transactions`, {
    headers: { "Content-Type": "application/json", ...Auth.headers(user) },
    method: "POST",
    body: JSON.stringify(transactionBody),
  });
}

function deleteTransaction(msg: { transactionId: string }, user: Auth.User) {
  return fetch(`/api/transactions/${msg.transactionId}`, {
    headers: Auth.headers(user),
    method: "DELETE",
  })
    .then((response: Response) => {
      if (response.status === 200) {
        return response.json();
      }
      return undefined;
    })
    .catch((error: Error) => {
      console.error("Error deleting transaction:", error);
      throw error;
    });
}
