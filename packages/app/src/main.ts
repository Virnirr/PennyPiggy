import { Auth, History, Switch, define, Store } from "@calpoly/mustang";

import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";

import { html, LitElement } from "lit";
import { PennyHeaderElement } from "./components/penny-header";
import { PennyProfileElement } from "./views/pennyprofile-view";
import { HomePageElement } from "./views/home-view";
import { AuthViewElement } from "./views/auth-view";

const routes = [
  {
    path: "/app/users/:id",
    view: (params: Switch.Params) => html`
      <pennypiggy-profile email=${params.id}></pennypiggy-profile>
    `,
  },
  {
    path: "/app",
    view: () => html` <home-view></home-view> `,
  },
  {
    path: "/",
    redirect: "/app",
  },
  {
    path: "/app/auth",
    view: () => html` <pennypiggy-auth></pennypiggy-auth> `,
  },
];

class AppElement extends LitElement {
  static uses = define({
    "home-view": HomePageElement,
  });

  protected render() {
    return html`<mu-switch></mu-switch>`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    PennyHeaderElement.initializeOnce();
  }
}

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "pennypiggy:history", "pennypiggy:auth");
    }
  },
  "pennypiggy-app": AppElement,
  "pennypiggy-header": PennyHeaderElement,
  "pennypiggy-profile": PennyProfileElement,
  "pennypiggy-auth": AuthViewElement,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "blazing:auth");
    }
  },
});
