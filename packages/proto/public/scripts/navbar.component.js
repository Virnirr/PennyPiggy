import {
  css,
  html,
  shadow,
  Dropdown,
  Events,
  Observer,
  define
} from "@calpoly/mustang";

export class NavigationBarElement extends HTMLElement {
  static uses = define({
    "mu-dropdown": Dropdown.Element,
  });
  static template = html`
    <template>
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
          </ul>

            <li>
            <label class="dark-mode-switch">
              <input type="checkbox" />
              Dark Mode
            </label>
          </li>
        </div>
      </nav>
    </template>
  `;

  static styles = css`

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

  get userid() {
    return this._userid.textContent;
  }

  set userid(id) {
    if (id === "anonymous") {
      this._userid.textContent = "";
      this._signout.disabled = true;
    } else {
      this._userid.textContent = id;
      this._signout.disabled = false;
    }
  }

  constructor() {
    super();
    shadow(this)
      .template(NavigationBarElement.template)
      .styles(NavigationBarElement.styles);

    const dm = this.shadowRoot.querySelector(".dark-mode-switch");

    dm.addEventListener("click", (event) =>
      Events.relay(event, "dark-mode", {
        checked: event.target.checked,
      })
    );
  }

  static initializeOnce() {
    function toggleDarkMode(page, checked) {
      page.classList.toggle("dark-mode", checked);
    }

    document.body.addEventListener("dark-mode", (event) =>
      toggleDarkMode(event.currentTarget, event.detail.checked)
    );
  }

  _authObserver = new Observer(this, "pennypiggy:auth");

  connectedCallback() {
    this._authObserver.observe(({ user }) => {

      if (user && user.authenticated) {
        
        const navbar = this.shadowRoot.querySelector(".navbar-container");
        const { username, email } = user.username;

        console.log("this is the email", email)

        const authenticatedNavbar = html`
          <li class="navbar-item"><a href="dashboard.html">Dashboard</a></li>
          <!-- Dropdown for Transactions -->
          <li class="navbar-item dropdown">
            <a href="transactions.html" class="dropbtn">Transactions</a>
            <div class="dropdown-content">
              <a href="/transactions/${email}">Withdrawal</a>
              <a href="/transactions/${email}">Deposit</a>
            </div>
          </li>

          <li class="navbar-item"><a href="/budget.html">Budget</a></li>
          <li class="navbar-item"><a href="/bills.html">Bills</a></li>
          <li class="navbar-item">
            <a href="/asset_account.html">Asset Account</a>
          </li>

          <mu-dropdown class="navbar-item">
            <a slot="actuator">
              Hello,
              <span id="userid"></span>
            </a>
            <menu>
              <li class="when-signed-in">
                <a id="signout">Sign Out</a>
              </li>
              <li class="when-signed-out">
                <a href="/login">Sign In</a>
              </li>
            </menu>
          </mu-dropdown>
        `
        
        navbar.replaceChildren(authenticatedNavbar);

        this._userid = this.shadowRoot.querySelector("#userid");
        this._signout = this.shadowRoot.querySelector("#signout");
    
        this._signout.addEventListener("click", (event) =>
          Events.relay(event, "auth:message", ["auth/signout"])
        );

        this.userid = username;

      } else {
        const navbar = this.shadowRoot.querySelector(".navbar-container");
        
        const unauthenticatedNavbar = html`
          <li class="navbar-item"><a href="/login">Login</a></li>
          <li class="navbar-item"><a href="/signup">SignUp</a></li>
        `
        console.log(unauthenticatedNavbar)
        
        navbar.replaceChildren(unauthenticatedNavbar);
      }
    });
  }
}