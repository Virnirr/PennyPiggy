import { define, View, History } from "@calpoly/mustang";
import { css, html, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { IUser, ITransactions, ICategory } from "server/models";
import { Model } from "../model";
import { Msg } from "../messages";

import { TransactionTableElement } from "../components/transactions-table";
import { TransactionsHistoryElement } from "../components/history-col-component";

import Chart from "chart.js/auto";

export class TransactionsViewElement extends View<Model, Msg> {
  static uses = define({
    "transactions-table": TransactionTableElement,
    "history-card": TransactionsHistoryElement,
  });

  @property({ type: String, reflect: true })
  email?: string;

  @state()
  get user(): IUser | undefined {
    return this.model.users;
  }

  @property()
  get transactions(): ITransactions[] {
    return this.model.transactions || [];
  }

  @state()
  chart: any | undefined;

  @property()
  category: string = "";

  @state()
  get filteredTransactions(): ITransactions[] | undefined {
    if (this.transactions) {
      return this.transactions.filter((transaction) => {
        if (this.category === "") {
          return true;
        }
        return (
          (transaction.category as ICategory).description === this.category
        );
      });
    }
  }

  firstUpdated() {
    const ctx = this.renderRoot.querySelector("#myChart") as HTMLCanvasElement;
    const ctx2 = this.renderRoot.querySelector(
      "#myChart2"
    ) as HTMLCanvasElement;
    const ctx3 = this.renderRoot.querySelector(
      "#myChart3"
    ) as HTMLCanvasElement;

    const data = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    new Chart(ctx, { type: "pie", data: data });
    new Chart(ctx2, { type: "pie", data: data });
    new Chart(ctx3, { type: "pie", data: data });
  }

  render() {
    return html`
      <main class="transactions">
        <canvas id="myChart" class="transactions-graph"></canvas>
        <canvas id="myChart2" class="transactions-graph"></canvas>
        <canvas id="myChart3" class="transactions-graph">Some Graph</canvas>
        <div class="transactions-history">
          <transactions-table category=${this.category}></transactions-table>
          <button
            style="width: 100%; margin-top: 50px;"
            @click=${() => {
              History.dispatch(this, "history/navigate", {
                href: `/app/transactions/${this.email}/edit`,
              });
            }}
          >
            +
          </button>
        </div>
        <section>${this.renderHistory()}</section>
      </main>
    `;
  }

  renderHistory() {
    interface IHistoryGroup extends Object {
      date: string;
      transactions: number;
      spent: number;
    }

    // Group by dates and calculate total spent. Load them into an object to be parsed and create history cards
    const historyGroupByDate = this.filteredTransactions?.reduce(
      (acc: Record<string, IHistoryGroup>, transaction: ITransactions) => {
        // Extract date and amount from transaction
        let { date, amount } = transaction;

        date = new Date(date);

        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const key = `${month}/${year}`;

        if (!acc[key]) {
          acc[key] = {
            date: key,
            transactions: 1,
            spent: amount,
          };
        } else {
          acc[key] = {
            ...acc[key],
            transactions: acc[key].transactions + 1,
            spent: acc[key].spent + amount,
          };
        }
        return acc;
      },
      {}
    );

    if (!historyGroupByDate) {
      return html``;
    }

    const sortedHistoryKey = Object.keys(historyGroupByDate).sort((a, b) => {
      const [aMonth, aYear] = a.split("/").map(Number);
      const [bMonth, bYear] = b.split("/").map(Number);
      const aDate = new Date(aYear, aMonth - 1).getTime(); // month is 0-indexed
      const bDate = new Date(bYear, bMonth - 1).getTime();
      return bDate - aDate;
    });

    const historyElements = sortedHistoryKey.map((key) => {
      const { date, transactions, spent } = historyGroupByDate[key];
      return html`
        <history-card
          date="${date}"
          numTransactions="${transactions}"
          spent="$${spent.toFixed(2)}"
        ></history-card>
      `;
    });

    return html` <div class="history">${historyElements}</div> `;
  }

  static styles = [
    css`
      .history {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: var(--size-padding);
        width: 100%;
        margin-bottom: 150px;
      }

      .transactions {
        display: grid;
        grid-template-columns: [start] repeat(var(--page-grid), 1fr) [end];
        column-gap: calc(var(--size-padding));
        row-gap: 100px;
      }

      .transactions > .transactions-graph {
        grid-column: span 2; /* Makes the transactions-graph span 2 columns */
      }

      .transactions-history {
        grid-column: span 5;
      }

      #myChart,
      #myChart2,
      #myChart3 {
        width: 100% !important;
        height: auto !important;
      }

      button {
        grid-column: 2 / span 3;
      }
    `,
  ];

  constructor() {
    super("pennypiggy:model");
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === "email" && oldValue !== newValue && newValue) {
      console.log("Message is dispatched");
      this.dispatchMessage([
        "transactions/select",
        {
          email: this.email as string,
          onSuccess: () => {
            console.log("Success");
          },
          onFailure: (err: Error) => {
            console.log(err);
          },
        },
      ]);
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
  }
}
