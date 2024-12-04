import { html, LitElement } from "lit";

import {
  define,
} from "@calpoly/mustang";

import { LoginFormElement } from "../components/login-component";
import { RegisterFormElement } from "../components/register-component";
import { property } from "lit/decorators.js";

export class AuthViewElement extends LitElement {

  @property({ type: String, reflect: true })
  view: string = "login";

  static uses = define({
    "login-form": LoginFormElement,
    "register-form": RegisterFormElement,
  });


  render() {
    return html`
      <article>
        <main class="page">
          ${this.view === "login" ? 
            html`<login-form api="/auth/login"></login-form>`:
            html`<register-form api="/auth/register"></register-form>`}
        </main>
      </article>
    `
  }
}