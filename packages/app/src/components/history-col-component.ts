import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";
import { css, html } from "lit";
import { property } from "lit/decorators.js";

export class TransactionsHistoryElement extends View<Model, Msg> {

  @property()
  date?: string;
  
  @property()
  numTransactions?: number;

  @property()
  spent?: string;

  render() {
    return html`
      <div class="history">
        <div class="history-card">
          <div class="history-card-item">
            <h3 class="date">${this.date}</h3>
          </div>
          <div class="history-card-item">
            <span>Transactions:</span>
            <span class="transactions">${this.numTransactions}</span>
          </div>
          <div class="history-card-item">
            <span>Spent:</span>
            <span class="spent">${this.spent}</span>
          </div>
        </div>
      </div>
    `;
  }

  constructor() {
    super("pennypiggy:model");
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
    .history-card {
    background-color: var(--color-background-gray);
    padding: var(--size-padding);
    border-radius: var(--size-border);
    margin-right: var(--size-padding);
  }

  .history-card-item {
    display: flex;
    justify-content: space-between;
    text-align: left;
  }
  `
  ];

  connectedCallback() {
    super.connectedCallback();
  }
}
