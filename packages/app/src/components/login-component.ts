import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";

export class LoginFormElement extends LitElement {
  @property()
  api: string = "/auth/login";

  render() {
    return html`
      <form @submit=${(e: Event) => this.submitLoginForm(e, this.api, "/app")}>
        <h3 class="title">
          Sign in with Username and Password
        </h3>
        <label>
          <span>Email:</span>
          <input name="email" type="email" autocomplete="off" required />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" name="password" required />
        </label>
        <button type="submit">Sign In</button>
        <p class="register">
            Or did you want to
            <a href="./register">
              register as a new user
            </a>
            ?
        </p>
      </form>
    `;
  }
  

  static styles = [
    css`
      form {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
        padding: 10rem;
      }

      label {
        display: contents;

        > span {
          grid-column: 0 / auto;
          justify-self: end;
        }
        > input {
          grid-column: auto / span 2;
          width: clamp(10rem, 50%, 75%);
        }
      }

      .title {
        grid-column: auto / span 3;
        text-align: center;
      }

      p {
        grid-column: auto / span 3;
        text-align: center;
      }

      button[type="submit"] {
        grid-column: 2 / -2;
        align-self: center;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
  }

  submitLoginForm(event: Event, endpoint: string, redirect: string): void {
    event.preventDefault();

    const target = event.target as HTMLFormElement | null; // Ensure the target is an HTMLFormElement
    if (!target) return;

    const form = target.closest("form") as HTMLFormElement | null; // Ensure closest returns an HTMLFormElement
    if (!form) return;

    const data = new FormData(form);
    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(Object.fromEntries(data.entries())); // Convert FormData to JSON

    console.log("POST login request:", body);

    fetch(endpoint, { method, headers, body })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Form submission failed: Status ${res.status}`);
        }
        return res.json();
      })
      .then((payload: { token: string }) => {
        const { token } = payload;

        form.dispatchEvent(
          new CustomEvent("auth:message", {
            bubbles: true,
            composed: true,
            detail: ["auth/signin", { token, redirect }],
          })
        );
      })
      .catch((err) => console.error("Error submitting form:", err));
  }
}
