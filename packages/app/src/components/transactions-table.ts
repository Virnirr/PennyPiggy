import { View, Observer } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";
import { css, html } from "lit";
import { state, property } from "lit/decorators.js";
import {
  IAssetAccount,
  ICategory,
  IExpenseAccount,
  ITransactions,
} from "server/models";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric", // Use 'numeric' or '2-digit'
  month: "long", // Use 'long', 'short', 'narrow', 'numeric', or '2-digit'
  day: "numeric", // Use 'numeric' or '2-digit'
  hour: "2-digit", // Use 'numeric' or '2-digit'
  minute: "2-digit", // Use 'numeric' or '2-digit'
};

type User = {
  username: {
    email: string;
    username: string;
  },
  token: string
}
export class TransactionTableElement extends View<Model, Msg> {
  @state()
  get transactions(): ITransactions[] | undefined {
    return this.model.transactions;
  }

  @property()
  category: string = "";

  @state()
  _user: User | undefined;

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

  _authObserver = new Observer(this, "pennypiggy:auth");

  render() {
    console.log("this is the user from the transaction table", this._user);
    return html`
      <section class="view">
        <table>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Source Account</th>
            <th>Destination Account</th>
            <th>Category</th>
            <th>Tags</th>
            <th></th>
          </tr>
          ${this.filteredTransactions?.map(
            (transaction) => html`
              <tr>
                <td>${transaction.description}</td>
                <td>${"$" + transaction.amount}</td>
                <td>
                  ${new Date(transaction.date).toLocaleString("en-US", options)}
                </td>
                <td>
                  ${(transaction.sourceAccount as IAssetAccount).accountName}
                </td>
                <td>
                  ${(transaction.destinationAccount as IExpenseAccount)
                    .accountName}
                </td>
                <td>
                  <a
                    href="/app/transactions/${this._user?.username?.email}/category/${(transaction.category as ICategory).description}"
                    >${(transaction.category as ICategory).description}</a
                  >
                </td>
                                <td>
                  ${(transaction.tags || []).join(", ")}
                </td>
                <td><button @click=${() => this._handleDelete(transaction?._id as any)}>Delete</button></td>
              </tr>
            `
          )}
        </table>
        </div>
      </section>
    `;
  }

  _handleDelete(transactionId: string) {
    this.dispatchMessage([
      "transactions/delete",
      {
        transactionId,
        onSuccess: () => {
          console.log("Success");
        },
        onFailure: (err: Error) => {
          console.log(err);
        },
      },
    ]);
  }

  constructor() {
    super("pennypiggy:model");
  }


  static styles = [
    css`
      table {
        width: 100%;
        border-collapse: collapse;
        margin: var(--table-margin);
        font-size: var(--font-size-sm);
      }

      th,
      td {
        padding: var(--table-cell-padding);
        text-align: left;
        border-bottom: var(--table-border-width) solid var(--color-table-border);
      }

      th {
        background-color: var(--color-table-header);
        color: var(--color-text);
        font-weight: bold;
      }

      tr:nth-child(even) {
        background-color: var(--color-table-row-even);
      }

      tr:hover {
        background-color: var(--color-table-row-hover);
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }: any) => {
      console.log("Authenticated user:", user);
      this._user = user;
    });
  }
}
