import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import {
  IUser,
  ITransactions,
  IExpenseAccount,
  ICategory,
  IAssetAccount,
} from "server/models";
import { Model } from "../model";
import { Msg } from "../messages";

import { TransactionTableElement } from "../components/transactions-table";
import { TransactionsHistoryElement } from "../components/history-col-component";

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

  @state()
  get transactions(): ITransactions[] | undefined {
    return this.model.transactions;
  }

  render() {
    return html`
      <main class="transactions">
        <section class="transactions-graph">Some Graph</section>
        <section class="transactions-graph">Some Graph</section>
        <section class="transactions-graph">Some Graph</section>
        <transactions-table class="transactions-history"></transactions-table>
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
    const historyGroupByDate = this.transactions?.reduce(
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
      }

      .transactions {
        display: grid;
        grid-template-columns: [start] repeat(var(--page-grid), 1fr) [end];
        column-gap: calc(var(--size-padding));
      }

      .transactions > .transactions-graph {
        grid-column: span 2; /* Makes the transactions-graph span 2 columns */
        padding: 5em;
      }

      .transactions-history {
        grid-column: span 5;
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
