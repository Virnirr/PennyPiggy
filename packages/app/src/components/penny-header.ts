import { LitElement, css, html } from "lit";
import { Dropdown, Events, Observer, define, Auth } from "@calpoly/mustang";

import { IUser } from "server/models";
import { state } from "lit/decorators.js";

function toggleDarkMode(ev: InputEvent) {
  const target = ev.target as HTMLInputElement;
  const checked = target.checked;
  Events.relay(ev, "dark-mode", { checked });
}

function signOut(ev: MouseEvent) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}

export class PennyHeaderElement extends LitElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element,
  });

  @state()
  userid: string = "anonymous";

  @state()
  email?: string;

  @state()
  authenticated: boolean = false;

  render() {
    return html`
      <header>
        <nav class="navbarnav-container">
          <li class="navbar-item">
            <a href="/" style="vertical-align: middle;">
              <img
                src="/static/pennypiggylogo.svg"
                alt="pennypiggylogo"
                style="width: 50px; border-radius: 50%"
              />
              PennyPiggy
            </a>
          </li>
          <div style="display:flex">
            <ul class="navbar-container">
              ${this.authenticated ? html `              
                <li class="navbar-item">
                <a href="/app/dashboard/${this.email}">Dashboard</a>
              </li>
              <!-- Dropdown for Transactions -->
              <li class="navbar-item">
                <a href="/app/transactions/${this.email}" class="dropbtn">Transactions</a>
              </li>

              <li class="navbar-item"><a href="/budget.html">Budget</a></li>
              <li class="navbar-item"><a href="/bills.html">Bills</a></li>
              <li class="navbar-item">
                <a href="/asset_account.html">Asset Account</a>
              </li>
              <li class="navbar-item">
                <a href="/app/users/${this.email}">Profile</a>
              </li>
              `
               : null}
              
              ${!this.authenticated ? html`
                <li class="navbar-item"><a href="/app/login">Login</a></li>
                <li class="navbar-item"><a href="/app/register">SignUp</a></li>
                ` : null}
              <mu-dropdown class="navbar-item">
                <a slot="actuator">
                  Hello,
                  <span id="userid">${this.userid}</span>
                </a>
                <menu>
                  <li class="when-signed-in">
                    <a id="signout" @click=${(e: MouseEvent) => this.handleSignOut(e)}>Sign Out</a>
                  </li>
                  <li class="when-signed-out">
                    <a href="/app/login">Sign In</a>
                  </li>
                </menu>
              </mu-dropdown>

              <label class="dark-mode-switch" @change=${toggleDarkMode}>
                <input type="checkbox" />
                Dark Mode
              </label>
            </ul>
          </div>
        </nav>
      </header>
    `;
  }

  // handles the signout
  handleSignOut(event: MouseEvent) {
    signOut(event);
    this.userid = "anonymous";
    this.email = undefined;
    this.authenticated = false;
  }

  static styles = css`
    /* TODO: Style the header here */

    .navbarnav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1em;
    }

    .navbar-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .navbar-item {
      margin-right: 2rem;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .navbar-container .dropdown-content {
      display: none;
      position: absolute;
      background-color: var(--color-background-page);
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }

    .navbar-container .dropdown-content a {
      color: var(--color-text);
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }

    .navbar-container .dropdown-content a:hover {
      background-color: var(--color-background-gray);
    }

    .navbar-container .dropdown:hover .dropdown-content {
      display: block;
    }

    .navbar-container .dropdown:hover .dropbtn {
      background-color: var(--color-background-gray);
    }

    .dark-mode-switch {
      line-height: 100px;
    }

    li {
      list-style-type: none;
      margin-right: 10px;
    }

    li > a {
      color: var(--color-links);
      text-decoration: none;
    }

    li > a:hover {
      color: var(--color-link-hover);
    }
  `;

  _authObserver = new Observer<Auth.Model>(this, "pennypiggy:auth");

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.userid) {
        console.log("authenticated", user);
        const { username, email } = user.username as unknown as IUser;
        this.userid = username;
        this.email = email;
      }
      this.authenticated = user ? user.authenticated : false;
    });
  }

  static initializeOnce() {
    function toggleDarkMode(page: HTMLElement, checked: boolean) {
      page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) =>
      toggleDarkMode(
        event.currentTarget as HTMLElement,
        (event as CustomEvent).detail?.checked
      )
    );
  }
}
