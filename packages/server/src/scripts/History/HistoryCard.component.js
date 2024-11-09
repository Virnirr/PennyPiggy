import { css, html, shadow } from "@calpoly/mustang";

export class HistoryCard extends HTMLElement {
  static template = html`
    <template>
      <div class="history-card">
        <div class="history-card-item">
          <h3 class="date"></h3>
        </div>
        <div class="history-card-item">
          <span>Transactions:</span>
          <span class="transactions"></span>
        </div>
        <div class="history-card-item">
          <span>Spent:</span>
          <span class="spent"></span>
        </div>
      </div>
    </template>
  `;

  static styles = css`
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
  `;

  static get observedAttributes() {
    return ['date', 'transactions', 'spent'];
  }

  constructor() {
    super();
    shadow(this)
      .template(HistoryCard.template)
      .styles(HistoryCard.styles);
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const date = this.getAttribute('date') || 'Unmatched Date';
    const transactions = this.getAttribute('transactions') || 'Unmatched Transactions';
    const spent = this.getAttribute('spent') || 'Unmatched Spent';

    this.shadowRoot.querySelector('.date').textContent = date;
    this.shadowRoot.querySelector('.transactions').textContent = transactions;
    this.shadowRoot.querySelector('.spent').textContent = spent;
  }
}
