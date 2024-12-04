import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { IAssetAccount, ICategory, IExpenseAccount, ITransactions } from "server/models";


const options: Intl.DateTimeFormatOptions = {
  year: 'numeric', // Use 'numeric' or '2-digit'
  month: 'long',   // Use 'long', 'short', 'narrow', 'numeric', or '2-digit'
  day: 'numeric',  // Use 'numeric' or '2-digit'
  hour: '2-digit', // Use 'numeric' or '2-digit'
  minute: '2-digit', // Use 'numeric' or '2-digit'
};

export class TransactionTableElement extends View<Model, Msg> {

  @state()
  get transactions(): ITransactions[] | undefined {
    return this.model.transactions;
  }

  render() {
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
          </tr>
          ${this.transactions?.map(
            (transaction) => html`
              <tr>
                <td>${transaction.description}</td>
                <td>${"$"+transaction.amount}</td>
                <td>${(new Date(transaction.date).toLocaleString('en-US', options))}</td>
                <td>${(transaction.sourceAccount as IAssetAccount).accountName}</td>
                <td>${(transaction.destinationAccount as IExpenseAccount).accountName}</td>
                <td>${(transaction.category as ICategory).description}</td>
              </tr>
            `
          )}
        </table>
        </div>
      </section>
    `;
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

th, td {
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
  `
  ];

  connectedCallback() {
    super.connectedCallback();
  }
}
