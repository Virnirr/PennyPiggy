import { css, html, shadow } from "@calpoly/mustang";

export class TableElement extends HTMLElement {
  static template = html`
  <template>
    <div class="table-grid">
      <!-- Header Row -->
      <slot name="header"></slot>
    
      <!-- Data Rows -->
      <slot name="data"></slot>
      <!-- Add more rows as needed -->
    </div>
  </template>
  `;

  static styles = css`
.table-grid {
  display: grid;
  width: 100%;
  margin: var(--table-margin);
  font-size: var(--font-size-sm);

  grid-auto-rows: max-content; /* Rows will size based on content */
}

.table-row {
  display: contents; /* Allows cells to participate in the grid */
}

.cell {
  padding: var(--table-cell-padding);
  text-align: left;
  border-bottom: var(--table-border-width) solid var(--color-table-border);
  width: 150px;
}

.header .cell {
  background-color: var(--color-table-header);
  color: var(--color-text);
  font-weight: bold;
}

.table-row:nth-of-type(even) .cell {
  background-color: var(--color-table-row-even);
}

.table-row:hover .cell {
  background-color: var(--color-table-row-hover);
}
  `;

  constructor() {
    super();
    shadow(this)
      .template(TableElement.template)
      .styles(TableElement.styles);
  }

  fixTable() {
    const tableGrid = this.shadowRoot.querySelector('.table-grid');
    const headerCells = document.querySelectorAll('.table-row.header .cell').length;

    // console.log(this.shadowRoot.querySelectorAll('.table-row.header .cell'))
    if (tableGrid && headerCells) {
      tableGrid.style.gridTemplateColumns = `repeat(${headerCells}, 1fr)`;
    }
  }

  connectedCallback() {
    if (this.src) this.hydrate(this.src);
  }

  get src() {
    return this.getAttribute("src");
  }

  hydrate(url) {
    fetch(url)
      .then((res)  => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => this.renderTransactions(json))
      .catch((error) => 
        console.error(`Error fetching JSON data: ${error}`)
      );
  }

  renderTransactions(json) {
    const headers = ["Description", "Amount", "Date", "SourceAccount", "DestinationAccount", "Category"].map(header => {
      return html`
        <div class="cell">${header}</div>
      `
    })

    const transactionHeaders = html`
      <div slot="header" class="table-row header">
        ${headers}
      </div>
    `

    const rowData = json.map(transaction => {
      const { description, amount, date, sourceAccount, destinationAccount, category } = transaction;
      
      const { accountName : sourceAccountName } = sourceAccount;
      const { accountName: destinationAccountName } = destinationAccount;
      const { description: categoryName } = category;

      const strAmount = "$" + amount.toFixed(2);
      

      return html`
        <div slot="data" class="table-row">
          <div class="cell">${description}</div>
          <div class="cell">${strAmount}</div>
          <div class="cell">${date}</div>
          <div class="cell">${sourceAccountName}</div>
          <div class="cell">${destinationAccountName}</div>
          <div class="cell">${categoryName}</div>
        </div>
      `
    });

    this.replaceChildren(transactionHeaders, ...rowData);
    this.fixTable();
  }
  // attributeChangedCallback() {
  //   this._render();
  // }
}