import { css, html, shadow } from "@calpoly/mustang";

export class LoginForm extends HTMLElement {j
  static template = html`<template>
    <form onsubmit="false;">
      <slot name="title">
        <h3>Sign in with Username and Password</h3>
      </slot>
      <label>
        <span>
          <slot name="email">Email:</slot>
        </span>
        <input name="email" type="email" autocomplete="off" required />
      </label>
      <label>
        <span>
          <slot name="password">Password:</slot>
        </span>
        <input type="password" name="password" required />
      </label>
      <slot name="submit">
        <button type="submit">Sign In</button>
      </slot>
    </form>
  </template>`;

  static styles = css`
    form {
      display: grid;
      grid-column: 1/-1;
      grid-template-columns: subgrid;
      gap: 0.5rem;
    }

    label {
      display: contents;

      > span {
        grid-column: 0 / auto;
        justify-self: start;
      }
      > input {
        grid-column: auto / span 2;
      }
    }

    ::slotted(*[slot="title"]),
    slot[name="title"] > * {
      grid-column: auto / span 2;
      text-align: center;
    }

    ::slotted(button[slot="submit"]),
    button[type="submit"] {
      grid-column: 2 / -2;
      align-self: center;
      margin-top: 1rem;
      margin-bottom: 1rem;
    } 
  `;

  get form() {
    return this.shadowRoot.querySelector("form");
  }

  constructor() {
    super();

    shadow(this)
      .template(LoginForm.template)
      .styles(LoginForm.styles);

    this.form.addEventListener("submit", (event) =>
      submitLoginForm(
        event,
        this.getAttribute("api"),
        this.getAttribute("redirect") || "/"
      )
    );
  }
}

function submitLoginForm(event, endpoint, redirect) {
  event.preventDefault();
  const form = event.target.closest("form");
  const data = new FormData(form);
  const method = "POST";
  const headers = {
    "Content-Type": "application/json"
  };
  const body = JSON.stringify(Object.fromEntries(data));

  console.log("POST login request:", body);

  fetch(endpoint, { method, headers, body })
    .then((res) => {
      if (res.status !== 200)
        throw `Form submission failed: Status ${res.status}`;
      return res.json();
    })
    .then((payload) => {
      const { token } = payload;

      form.dispatchEvent(
        new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token, redirect }]
        })
      );
    })
    .catch((err) => console.log("Error submitting form:", err));
}