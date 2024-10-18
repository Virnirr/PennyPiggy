import { css, html, shadow } from "@calpoly/mustang";

export class HistoryElement extends HTMLElement {
  static template = html`
    <template>
      <div class="history">
        <slot></slot>
      </div>
    </template>
  `;

  static styles = css`
    :host,
    .history {
      display: flex;
      flex-direction: column;
      gap: var(--size-padding);
      width: 100%;
    }
  `;

  constructor() {
    super();
    shadow(this).template(HistoryElement.template).styles(HistoryElement.styles);
  }
}

customElements.define('history-element', HistoryElement);
