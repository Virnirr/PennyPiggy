import { css, html, shadow } from "@calpoly/mustang";

export class NavigationBarElement extends HTMLElement {
  static template = html`
    <template>
      <nav>
        <ul class="navbar-container">
          <li class="navbar-item">
            <a href="/" style="vertical-align: middle;">
              <img
                src="./static/pennypiggylogo.svg"
                alt="pennypiggylogo"
                style="width: 50px; border-radius: 50%"
              />
              PennyPiggy
            </a>
          </li>
          <li class="navbar-item"><a href="dashboard.html">Dashboard</a></li>
      
          <!-- Dropdown for Transactions -->
          <li class="navbar-item dropdown">
            <a href="transactions.html" class="dropbtn">Transactions</a>
            <div class="dropdown-content">
              <a href="withdrawal.html">Withdrawal</a>
              <a href="deposit.html">Deposit</a>
            </div>
          </li>
      
          <li class="navbar-item"><a href="budget.html">Budget</a></li>
          <li class="navbar-item"><a href="bills.html">Bills</a></li>
          <li class="navbar-item"><a href="login.html">Login</a></li>
          <li class="navbar-item"><a href="signup.html">SignUp</a></li>
          <li class="navbar-item"><a href="asset_account.html">Asset Account</a></li>
        </ul>
      </nav>
    </template>
  `;


  static styles = css`

  .navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
  }

    .navbar-container .dropdown {
      position: relative;
      display: inline-block;
    }

    .navbar-container .dropdown-content {
      display: none;
      position: absolute;
      background-color: var(--color-background-page);
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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

    ul > li {
      list-style-type: none;
    }

    li > a {
      color: var(--color-links);
      text-decoration: none;
    }

    li > a:hover {
      color: var(--color-link-hover);
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(NavigationBarElement.template)
      .styles(NavigationBarElement.styles);
  }
}