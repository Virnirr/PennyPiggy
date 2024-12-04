import { html, LitElement } from "lit";

import reset from "../style/reset.css.ts"
import page from "../style/page.css.ts"

export class HomePageElement extends LitElement {

  render() {
    return html`
      <header>
        <section class="piggytitle">
          <img
            src="./static/pennypiggylogo.svg"
            alt="pennypiggylogo"
            style="width: 200px; border-radius: 50%"
          />
          <div>
            <h1>PennyPiggy</h1>
            <br />
            <h3 style="font-size: 1.5em">
              Keep track of your expenses and income
            </h3>
          </div>
          <button>Get Started</button>
        </section>
      </header>
      <main class="home">
        <section class="bg-light">
          <div class="section-flex-container" style="text-align: center">
            <div>
              <svg class="icon">
                <use href="./icons/browser.svg#icon-browser"></use>
              </svg>
              <h2>Full transaction management</h2>
              <p>
                PennyPiggy has a rich feature of entry bookkeeping. You can
                quickly organize your transactions in multiple currencies.
              </p>
            </div>
            <div>
              <svg class="icon">
                <use href="./icons/stack.svg#icon-stack"></use>
              </svg>
              <h2>Flexible and Sharable Components</h2>
              <p>
                Able to import and export any account information into a JSON
                and a PennyPiggy engine.
              </p>
            </div>
            <div>
              <svg class="icon">
                <use href="./icons/easy-to-use.svg#icon-easy-to-use"></use>
              </svg>
              <h2>Easy to use</h2>
              <p>Beginner friendly and easily scalable as you use along</p>
            </div>
          </div>
        </section>
        <section class="bg-pink">
          <div class="section-flex-container">
            <div>
              <h2>Budgets, categories and tags</h2>
              <p>
                Do you like working with tags? Need to budget your expenses?
                Want to categorize hobby expenses? PennyPiggy supports all that.
              </p>
            </div>
            <img src="./assets/budget.png" alt="budget" width="600px" />
          </div>
          <br />
          <br />
          <div class="section-flex-container">
            <img src="./assets/reports.png" alt="report" width="600px" />
            <div>
              <h2>Reports and Visualizations</h2>
              <p>
                PennyPiggy has advanced reporting capabilities, showing your
                expenses per week, month or year. But it can also help you audit
                your accounts with detailed list views. Or perhaps compare
                budgets or tags? It's all possible.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 PennyPiggy</p>
      </footer>
    `
  }

  static styles = [
    reset.styles,
    page.styles,
  ]

}