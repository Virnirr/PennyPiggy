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

  connectedCallback() {
    const tableGrid = this.shadowRoot.querySelector('.table-grid');
    const headerCells = document.querySelectorAll('.table-row.header .cell').length;

    // console.log(this.shadowRoot.querySelectorAll('.table-row.header .cell'))
    if (tableGrid && headerCells) {
      tableGrid.style.gridTemplateColumns = `repeat(${headerCells}, 1fr)`;
    }
  }


  // attributeChangedCallback() {
  //   this._render();
  // }

  getData(type) {

    switch (type) {
      case "withdrawal":
        return {
          headers: ["Description", "Amount", "Date", "Source Account", "Destination Acccount", "Category"],
          data: [
            ["Groceries", "$50.00", "2021-09-01", "Checking", "Grocery", "Food"],
            ["Gas", "$40.00", "2021-09-02", "Checking", "Gas Station", "Transportation"],
            ["Rent", "$1000.00", "2021-09-03", "Checking", "Landlord", "Housing"],
            ["Utilities", "$150.00", "2021-09-04", "Checking", "Utility Company", "Utilities"],
            ["Dining Out", "$60.00", "2021-09-05", "Checking", "Restaurant", "Food"],
            ["Entertainment", "$80.00", "2021-09-06", "Checking", "Cinema", "Entertainment"],
            ["Insurance", "$200.00", "2021-09-07", "Checking", "Insurance Company", "Insurance"],
            ["Subscription", "$15.00", "2021-09-08", "Checking", "Streaming Service", "Entertainment"],
            ["Clothing", "$120.00", "2021-09-09", "Checking", "Clothing Store", "Apparel"],
            ["Medical", "$300.00", "2021-09-10", "Checking", "Pharmacy", "Health"],
            ["Travel", "$500.00", "2021-09-11", "Checking", "Airline", "Travel"]
          ]
        }
      case "deposit":
        return {
          headers: ["Description", "Amount", "Date", "Source Account", "Destination Acccount", "Category"],
          data: [
            ["Paycheck", "$2000.00", "2021-09-01", "Employer", "Checking", "Income"],
            ["Gift", "$100.00", "2021-09-02", "Family", "Checking", "Gift"],
            ["Refund", "$50.00", "2021-09-03", "Store", "Checking", "Refund"],
            ["Bonus", "$500.00", "2021-09-04", "Employer", "Checking", "Income"],
            ["Interest", "$10.00", "2021-09-05", "Bank", "Checking", "Income"],
            ["Sale", "$150.00", "2021-09-06", "Buyer", "Checking", "Sale"],
            ["Lottery", "$1000.00", "2021-09-07", "Lottery", "Checking", "Gambling"],
            ["Investment", "$300.00", "2021-09-08", "Broker", "Checking", "Investment"],
            ["Freelance", "$400.00", "2021-09-09", "Client", "Checking", "Income"],
            ["Reimbursement", "$200.00", "2021-09-10", "Company", "Checking", "Reimbursement"]
          ]
        }
      case "budget":
        return {
          headers: ["Budget Category", "Budgeted", "Spent (per month)", "Remaining"],
          data: [
            ["Food", "$200.00", "$150.00", "$50.00"],
            ["Transportation", "$100.00", "$60.00", "$40.00"],
            ["Housing", "$1000.00", "$1000.00", "$0.00"],
            ["Utilities", "$200.00", "$150.00", "$50.00"],
            ["Entertainment", "$100.00", "$80.00", "$20.00"],
            ["Insurance", "$200.00", "$200.00", "$0.00"],
            ["Apparel", "$150.00", "$120.00", "$30.00"],
            ["Health", "$300.00", "$300.00", "$0.00"],
            ["Travel", "$500.00", "$500.00", "$0.00"],
            ["Miscellaneous", "$100.00", "$50.00", "$50.00"]
          ]
        }
      case "account":
        return {
          headers: ["Account", "Role", "Account Number", "Current Balance", "Is Active", "Last Activity"],
          data: [
            ["Checking", "Primary", "1234567890", "$1000.00", "Yes", "2021-09-11"],
            ["Savings", "Secondary", "0987654321", "$5000.00", "Yes", "2021-09-11"],
            ["Credit Card", "Secondary", "5432167890", "$-1000.00", "Yes", "2021-09-11"],
            ["Investment", "Secondary", "6789054321", "$10000.00", "Yes", "2021-09-11"],
            ["Retirement", "Secondary", "2345678901", "$20000.00", "Yes", "2021-09-11"],
            ["Loan", "Secondary", "8901234567", "$-5000.00", "Yes", "2021-09-11"],
            ["Mortgage", "Secondary", "4567890123", "$-100000.00", "Yes", "2021-09-11"],
            ["Auto Loan", "Secondary", "3456789012", "$-20000.00", "Yes", "2021-09-11"],
            ["Student Loan", "Secondary", "5678901234", "$-10000.00", "Yes", "2021-09-11"],
            ["Personal Loan", "Secondary", "6789012345", "$-5000.00", "Yes", "2021-09-11"]
          ]
        }
    }
  }
}