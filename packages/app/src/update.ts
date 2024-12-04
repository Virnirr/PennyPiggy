import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { IUser } from "server/models";

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
    // put the rest of your cases here
    default:
      const unhandled: never = message[0];
      throw new Error(`Unhandled Auth message "${unhandled}"`);
  }
}

function selectUsers(
  msg: { email: string },
  user: Auth.User
) {
  return fetch(`/api/users/${msg.email}`, {
    headers: Auth.headers(user)
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

function saveUsers(
  msg: { email: string },
  user: Auth.User
) {
  return fetch(`/api/users/${msg.email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg)
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

