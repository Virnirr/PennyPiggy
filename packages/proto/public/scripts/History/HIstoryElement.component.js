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
    .history {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      gap: var(--size-padding);
      width: 100%;
    }
  `;

  constructor() {
    super();
    shadow(this).template(HistoryElement.template).styles(HistoryElement.styles);
  }
}