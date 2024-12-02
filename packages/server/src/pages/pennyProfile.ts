import { css, html } from "@calpoly/mustang/server";
import { IUser } from "models";

import renderPage from "./renderPage";

type Mode = "view"  | "edit"

export class PennyProfilePage {
  data: IUser;
  mode: Mode;

  constructor(data: IUser, mode: Mode) {
    this.data = data;
    this.mode = mode;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
      scripts: [
        `
        import { define, Auth } from "@calpoly/mustang";
        import { PennyProfileElement } from "/scripts/profile.js";

        define({
          "mu-auth": Auth.Provider,
          "user-profile": PennyProfileElement
        });
        `
      ],
      styles: [
        css`
          .page > traveler-profile {
            grid-column: 2 / span 4;
          }
        `
      ]
    });
  }

  renderBody() {
    const base = "/api/users";
    const api = this.data
      ? `${base}/${this.data.email}`
      : base;

    return html`<body>
      <mu-auth provides="pennypiggy:auth">
        <nav-bar></nav-bar>
        <main class="page">
          <user-profile mode="${this.mode}" src="${api}">
          </user-profile>
        </main>
      </mu-auth>
    </body>`;
  }
}